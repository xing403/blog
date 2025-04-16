---
title: koa 一些工具类
layout: doc
tags: [nodejs, koa, utils]
---

## 请求响应类

```ts [src/utils/ResultUtils.ts]

/**
 * 成功响应体内容
 * @param data 响应体数据
 * @param message 成功内容
 * @param code 成功码
 * @returns {Object}
 */
function success<T extends unknown>(data: null | T = null, message = "success", code = 200): IResult<T> {
  return {
    code,
    message,
    data,
  };
}
/**
 * 失败响应体内容
 * @param message 失败消息
 * @param code 失败码
 * @returns 失败内容
 */
function error(message = "error", code = 500): IResult<null> {
  if (message.includes(":")) {
    code = Number(message.split(":")[1]) || code;
    message = message.split(":")[0];
  }
  return {
    code,
    message,
  };
}

export default {
  success,
  error,
};
```
::: details  IResult 类型
```ts
interface IResult<T> {
  code: number;
  message: string;
  data?: T | null;
}
```
:::

## 安全工具类
安装 `bcryptjs` 用于密码加密 
```bash
pnpm add bcryptjs
```

```ts [src/utils/SecurityUtils.ts]
import bcrypt from "bcryptjs";
/**
 * 密码加密
 * @param password 原始密码
 * @returns 加密后密码
 */
export const encryptPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * 密码校验
 * @param password 原始密码
 * @param hash 加密后密码
 * @returns 校验结果
 */
export const comparePassword = (password: string, hash: string) => bcrypt.compareSync(password, hash);

export default {
  encryptPassword,
  comparePassword,
};
```

## UUID 工具类

安装 `uuid` 用于生成 UUID
```bash
pnpm add uuid
```
```ts [src/utils/UUIDUtils.ts]
import { v4 as uuidV4 } from "uuid";

/**
 * 创建UUID
 * @returns UUID 格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
function generateUUID() {
  return uuidV4();
}
/**
 * 简易 UUID
 * @returns 无 "-" 的 UUID
 */
function generateSimpleUUID() {
  return uuidV4().replace(/-/g, "");
}

export default { generateUUID, generateSimpleUUID };
```