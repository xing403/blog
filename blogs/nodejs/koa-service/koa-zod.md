---
title: koa 整合 zod
layout: doc
tags: [nodejs, koa, zod]
---

## Zod
[Zod](https://github.com/colinhacks/zod) 是一个用于 TypeScript 和 JavaScript 的数据验证库。

```bash
pnpm add zod
```
定义类型校验实体，并且通过 `zod` 的 `.parse()` 方法进行校验。

::: code-group
```ts [src/utils/schema.ts]

export const PageSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
})

export const BaseSchema = z.object({
  create_by: z.coerce.number().optional(),
  update_by: z.coerce.number().optional(),
  create_time: z.coerce.date().optional(),
  update_time: z.coerce.date().optional(),
  delete_time: z.coerce.date().optional().or(z.null()),
})

export const UserSchema = z.object({
  user_id: z.coerce.number({ message: "userId 必须为数字" }).optional(),
  username: z.string().default(""),
  role: z.string().default("user"),
  sex: z.string().default("保密"),
  birthday: z.coerce.date().optional().or(z.string()),
  phone: z.string().max(20),
  password: z.string(),
  status: z.coerce.boolean().default(true),
  ...BaseSchema.shape,
})
```
```ts [src/utils/schemaValidator.ts]

import type { ZodObject } from 'zod';

export function parseBySchema<T>(params: any, schema: ZodObject<any>): T {
  try {
    return schema.parse(params) as T
  } catch (error) {
    console.log(error.issues)
    throw new Error(`${error.issues[0].path} ${error.issues[0].message}`)
  }
}

```
