---
title: koa 整合 jwt
layout: doc
tags: [nodejs, koa, jwt]
---

## 安装 JWT 依赖
```shell
pnpm add jsonwebtoken
pnpm add @types/jsonwebtoken -D
```

## 实现JWT 工具类 `TokenUtils`

```ts [src/utils/TokenUtils.ts]
import JWT from "jsonwebtoken";

import constant from "../config/constant";
import { Context } from "koa";
import RedisUtils from "./RedisUtils";
import { ILoginEntity, IUserEntity } from "../types";
import dayjs from "dayjs";

const secret = "abcdefghijklmnopqrstuvwxyz";

async function generateUserLoginToken(uuid: string, user: IUserEntity) {
  
  const token = JWT.sign({ uuid }, secret);
  const now = dayjs().valueOf()
  const loginUser: ILoginEntity = {
    uuid,
    userId: user.userId,
    username: user.username,
    role: '',
    loginTime: now,
    expire: now + 30 * 60 * 1000,
    user
  }
  await RedisUtils.set(uuid, JSON.stringify(loginUser), constant.security.login.login_token_expire);
  return token
}

async function parseToken(ctx: Context) {
  try {
    let authorization = ctx.headers.authorization || "";
    let token = "";
    if (authorization.includes("Bearer")) {
      token = authorization.replace("Bearer ", "");
    } else {
      token = authorization;
    }
    return JWT.decode(token) as { uuid: string };
  } catch (error) {
    throw new Error("token验证失败");
  }
}
async function getCurrentLoginUser(ctx: Context) {
  const tokenParseRes = await parseToken(ctx);
  const userStr = await RedisUtils.get(tokenParseRes.uuid) as any;
  if (userStr) {
    return JSON.parse(userStr as string) as ILoginEntity
  }
  return null;
}
async function getCurrentUser(ctx: Context) {
  const loginUser = await getCurrentLoginUser(ctx)
  return loginUser.user;
}

async function setLoginUserRole(ctx: Context, role: string) {
  const loginUser = await getCurrentLoginUser(ctx)
  loginUser.role = role || loginUser.role;
  await RedisUtils.set(loginUser.uuid, JSON.stringify(loginUser), constant.security.login.login_token_expire);
}
async function refreshToken(ctx: Context) {
  try {
    const loginUser = await getCurrentLoginUser(ctx)
    const now = dayjs().valueOf()
    if (loginUser.expire - now < constant.security.login.login_token_expire * 1000 * 2 / 3) {
      loginUser.expire = now + constant.security.login.login_token_expire * 1000
      await RedisUtils.set(loginUser.uuid, JSON.stringify(loginUser), constant.security.login.login_token_expire);
    }
  } catch (err) {

  }
}

export default {
  generateUserLoginToken,
  getCurrentUser,
  setLoginUserRole,
  getCurrentLoginUser,
  parseToken,
  refreshToken
};

```

::: details ILLoginEntity, IUserEntity, BaseEntity
::: code-group

```ts [ILoginEntity]
interface ILoginEntity {
  uuid: string,
  userId: number,
  username: string,
  role: string,
  loginTime: number,
  expire: number,
  user: IUserEntity,
}
```

```ts [IUserEntity]
interface IUserEntity extends BaseEntity {
  userId?: number,
  username?: string,
  password?: string,
  sex?: string,
  birthday?: Date | string,
  phone?: string,
  status?: boolean
}
```
```ts [BaseEntity]
interface BaseEntity {
  create_time?: Date;
  update_time?: Date;
  delete_time?: Date;
  create_by?: number;
  update_by?: number;
}
```
:::