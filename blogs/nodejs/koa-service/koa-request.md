---
title: koa Request 请求解析
layout: doc
tags: [nodejs, koa, request]
---

## koa  post | put 请求 body 参数
对于 post | put 请求，需要使用 koa-bodyparser 解析后 会得到 `ctx.request.body`
```bash
pnpm add koa-bodyparser --save
pnpm add @types/koa-bodyparser -D
```

::: code-group
```ts [src/index.ts]
import Koa from "koa";
import BodyParser from "koa-bodyparser"; // [!code ++]
import router from "./config/router"; 

const app = new Koa();

app
  .use(BodyParser())        // [!code ++]
  .use(router.routes())  
  .use(router.allowedMethods()) 
  .listen(3000, async () => {
    console.log(`服务启动成功: http://localhost:3000`);
});

```

## 解析 body 处理

使用 [zod](./koa-zod.html#zod) 进行可进行参数校验，以及类型转换,并封装工具类 `src/utils/RequestUtils.ts`

```ts [src/utils/RequestUtils.ts]
import { Context } from "koa";
import { parseBySchema } from "./schemaValidator";
import { ZodObject } from "zod";

function getRequestParams<T extends unknown>(ctx: Context, schema: ZodObject<any>): T {
  return parseBySchema<T>(ctx.params, schema)
}
function getRequestQuery<T extends unknown>(ctx: Context, schema: ZodObject<any>): T {
  return parseBySchema<T>(ctx.query, schema)
}

function getRequestBody<T extends unknown>(ctx: Context, schema: ZodObject<any>): T {
  return parseBySchema<T>(ctx.request.body, schema)
}

function getRequestUser(ctx: Context) {
  try {
    if (ctx.state.user) {
      return ctx.state.user as ILoginUser
    }
    throw new Error('用户未登录:401')
  } catch (error) {
    throw new Error(error.message)
  }
}

export default {
  getRequestParams,
  getRequestQuery,
  getRequestBody,
  getRequestUser,
}
```
