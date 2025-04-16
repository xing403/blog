---
title: koa 整合 mysql
layout: doc
tags: [nodejs, koa, mysql]
---

## 安装mysql 所需依赖

```bash
pnpm add mysql2 sequelize
```

## 创建数据库
```sql
CREATE DATABASE IF NOT EXISTS `koa_mysql` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## 创建 sequelize 实例
::: code-group
```ts [src/config/databse.ts]
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost", // 数据库地址
  dialect: "mysql", // 数据库类型
  port: 3306, 
  timezone: "+08:00", // 时区
  logging: (sql: string) => { // 打印sql 日志
    if (!/SHOW|ALTER|INFORMATION_SCHEMA/.test(sql.toUpperCase())) { // 忽略一些sql
      console.log(sql.replace("Executing (default): ", ""))
    }
  }
});

export default sequelize;
```
```ts [src/models/user.model.ts]

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class UserModel extends Model { }

UserModel.init(
  {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      comment: "用户ID",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "用户名",
    },
    role: {
      type: DataTypes.ENUM("root", "user")
      defaultValue: "user",
      comment: "用户身份",
    },
    sex: {
      type: DataTypes.ENUM("保密", "男", "女"),
      allowNull: false,
      defaultValue: "保密",
      comment: "性别",
    },
    birthday: {
      type: DataTypes.DATE,
      comment: "出生年月日",
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "手机号",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "密码",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "用户账号状态",
    },
  },
  {
    createdAt: "create_time",
    updatedAt: "update_time",
    deletedAt: "delete_time",
    indexes: [{ unique: true, fields: ["username"] }],
    paranoid: true, // 是否为逻辑删除
    tableName: "t_user",
    sequelize,
  }
);

export default UserModel;
```
```ts [src/services/user.service.ts]
import UserModel from "../models/user.model";
import SecurityUtils from "../utils/SecurityUtils";
import TokenUtils from "../utils/TokenUtils";
import UUIDUtils from "../utils/UUIDUtils";
import db from "../config/database";
import { Op } from "sequelize";

const createUser = async (user: IUserEntity) => {
  try {
    const { username, password, phone } = user;
    const findUser = await getUserByUsernameOrPhone({ username, phone });

    if (findUser) {
      throw new Error("用户名 或 手机号已存在");
    }
    user.password = SecurityUtils.encryptPassword(password); // 密码加密
    return await UserModel.create(user as any);   
  } catch (err) {
    throw new Error(err.message);
  }
};
/**
 * 通过手机号创建用户
 * @param user 
 * @returns 
 */
const createUserByPhone = async (user: IUserEntity) => {
  try {
    const findUser = await getUserByPhone(user.phone);
    if (findUser) {
      throw new Error("手机号已存在");
    }
    user.username = UUIDUtils.generateSimpleUUID().slice(0, 10);
    user.password = SecurityUtils.encryptPassword(user.password);
    return await UserModel.create(user as any);
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * 通过用户ID查询用户
 * @param id 用户ID
 * @returns 用户
 */
const getUserById = async (id: number) => {
  return await UserModel.findByPk(id);
};
/**
 * 通过用户名查询用户
 * @param username 用户名
 * @returns 用户
 */
const getUserByUsername = async (username: string) => {
  return await UserModel.findOne({ where: { username }});
};
/**
 * 通过手机号查找用户
 * @param phone 手机号
 * @returns 用户
 */
const getUserByPhone = async (phone: string) => {
  return await UserModel.findOne({ where: { phone }});
};

/**
 * 分页查询用户
 * @param page 当前页
 * @param pageSize 页大小
 * @returns 列表
 */
const getUserList = (page: number, pageSize: number, filter = { username = ''; phone = '' }) => {
  const where = {
    username: { [Op.like]: `%${filter.username}%` },
    phone: { [Op.like]: `%${filter.phone}%` },
  };

  return UserModel.findAndCountAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    where,
  });
};

const getUserByUsernameOrPhone = (info: { username: string; phone: string }) => {
  return UserModel.findAll({
    where: {
      [Op.or]: [{ username: info.username }, { phone: info.phone }],
    },
  });
};
/**
 * 用户名登录
 * @param username 用户名
 * @param password 密码
 * @returns token token
 */
const login = async (username: string, password: string) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error(`用户 ${username} 不存在`);
    }
    if (!user.dataValues.status) {
      throw new Error("用户已被禁用");
    }
    const isPasswordValid = SecurityUtils.comparePassword(password, user.dataValues.password);
    if (!isPasswordValid) {
      throw new Error("用户名或密码错误");
    }
    const uuid = UUIDUtils.generateSimpleUUID();
    const token = await TokenUtils.generateUserLoginToken(uuid, { userId: user.dataValues.userId, username: user.dataValues.username });

    return { token, roles: user.dataValues.roles }
  } catch (err) {
    throw new Error(err.message);
  }
};

const loginByPhone = async (phone: string, password: string) => {
  try {
    const user = await getUserByPhone(phone);
    if (!user) {
      throw new Error(`用户 ${phone} 不存在`);
    }
    if (!user.dataValues.status) {
      throw new Error("用户已被禁用");
    }
    const isPasswordValid = SecurityUtils.comparePassword(password, user.dataValues.password);
    if (!isPasswordValid) {
      throw new Error("用户名或密码错误");
    }
    const uuid = UUIDUtils.generateSimpleUUID();
    const token = await TokenUtils.generateUserLoginToken(uuid, { userId: user.dataValues.userId, username: user.dataValues.username });
    return { token, roles: user.dataValues.roles }
  } catch (err) {
    throw new Error(err.message);
  }
};
const deleteUserByUserId = async (userId: number) => {
  try {
    return await UserModel.destroy({ where: { userId } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUserInfo = async (userId: number, user: Partial<IUserEntity>) => {
  try {
    try {
      const findUsers = await getUserByUsernameOrPhone({ username: user.username, phone: user.phone });

      if (findUsers) {
        findUsers.forEach((user) => {
          if (user.dataValues.userId !== userId) {
            throw new Error("用户名 或 手机号已存在");
          }
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
    return UserModel.update(user, { where: { userId } });
  } catch (err) {
    throw new Error(err.message);
  }
};
const updateUserPassword = async (userId: number, password: string) => {
  try {
    try {
      password = SecurityUtils.encryptPassword(password); // 密码加密
      return UserModel.update({ password }, { where: { userId } });
    } catch (err) {
      throw new Error(err.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUserStatusByUserId = (userId: number, user: { status?: boolean }) => {
  return UserModel.update(user, { where: { userId } });
};

function getSimpleSearch(search: string) {
  return UserModel.findAll({
    attributes: ['user_id', 'username', 'phone'],
    where: {
      [Op.or]: [
        { username: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ]
    },
  })
}
function getSimpleSearchByIds(ids: number[]) {
  return UserModel.findAll({
    attributes: ['user_id', 'username', 'phone'],
    where: {
      userId: {
        [Op.in]: ids
      }
    },
  })
}

export default {
  createUserByPhone,
  login,
  loginByPhone,
  getUserById,
  getUserByUsername,
  createUser,
  getUserList,
  deleteUserByUserId,
  updateUserInfo,
  updateUserPassword,
  updateUserStatusByUserId,
  getSimpleSearch,
  getSimpleSearchByIds,
};
```
:::

## 控制层实现
使用中间件 [authMiddleware](./koa-auth.html#创建鉴权中间件) 进行权限校验
使用 [zod](./koa-zod.html#zod) 进行参数类型转换 验证

::: code-group
```ts [src/controller/user.controller.ts]
import { Context } from "koa";
import userService from "../service/user.service";
import authMiddleware from "../middleware/auth.middleware";
import ResultUtils from "../utils/ResultUtils";
import { PageSchema, UserSchema } from "../utils/schema";

export default [
  {
    method: "get",
    path: "/user/list",
    description: "查询用户列表",
    middleware: [authMiddleware(["root"])],
    handler: async (ctx: Context) => {
      try {
        const schema = z.object({...PageSchema.shape,...UserSchema.partial().shape,}).pick({username: true, phone: true})
        const { page, pageSize, username, phone } = RequestUtils.getRequestQuery<Page<Pick<IUserEntity, 'username' | 'phone'>>>(ctx, schema)
        const res = await userService.getUserList(page, pageSize, { username, phone });
        ctx.body = ResultUtils.success(res, "查询成功");
      } catch (err) {
        ctx.body = ResultUtils.error(err.message);
      }
    },
  },
  // 其他接口....
] as ControllerType[];

```

:::