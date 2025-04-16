---
title: koa 鉴权中间件
layout: doc
tags: [nodejs, koa, auth]
---


## 创建鉴权中间件
需要使用到 一些工具类：
* [`TokenUtils`](./koa-jwt.html#实现jwt-工具类-tokenutils)
* [`ResultUtils`](./koa-utils.html#请求响应类)

```ts
import { Context, Next } from "koa";
import TokenUtils from "../utils/TokenUtils";
import ResultUtils from "../utils/ResultUtils";

/**
 * 鉴权中间件
 * @param roles 可访问的角色身份
 */
function authMiddleware(roles?: string | string[]) {
  return async (ctx: Context, next: Next) => {
    try {
      const user = await TokenUtils.getCurrentLoginUser(ctx);
      
      ctx.state.user = user;
      if (roles) {
        const { role } = user
        if ((Array.isArray(roles) && !roles.includes(role)) || (typeof roles === 'string' && roles !== role)) {
          console.log(`%s 身份 %s 无权访问 %s`, user.username, role, ctx.request.path)
          ctx.body = ResultUtils.error("无权限", 403);
        } else {
          await next();
        }
      } else {
        await next();
      }
    } catch (err) {
      ctx.body = ResultUtils.error(err.message, 401);
    }
  };
}

export default authMiddleware;
```