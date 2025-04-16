---
title: koa 整合 router
layout: doc
tags: [nodejs, koa, router]
---

## 安装 koa router
在项目根目录下运行下面 pnpm  命令安装
```shell
pnpm add koa-router

pnpm add @types/koa-router -D
```
其中 `@types/koa-router` 是类型定义文件，用于 typescript 编译时识别 `koa-router` 的类型。


## 编写 router 配置文件
创建 `config/router.ts` 文件，用于配置路由，创建 `controller/index.ts` 文件用于管理路由。文件中代码如下：

::: code-group

```ts [src/controller/index.ts]
import path from "node:path";
import fs from "node:fs";
import { ControllerType } from "../types";

const root = path.join(__dirname);
const controller: ControllerType[] = []
const files = fs.readdirSync(root) // 读取当前目录的全部文件
for (const file of files) {
  if (file.endsWith('.controller.ts')) {  // 只保留 `.controller.ts` 结尾的文件作为路由访问文件
    const module = require(path.join(root, file)).default;
    controller.push(...module)
  }
}

export default controller

```


```ts [src/config/router.ts]
import Router from "koa-router";
import controller from "../controller"; // 项目路由总文件 

const router = new Router();

const routerTable = []
controller.forEach((item) => {
  routerTable.push({ description: item.description, method: item.method, path: item.path})
  if (item.middleware) {
    if (Array.isArray(item.middleware)) {
      router[item.method.toLocaleLowerCase()](item.path, ...item.middleware, item.handler);
    } else {
      router[item.method.toLocaleLowerCase()](item.path, item.middleware, item.handler);
    }
  } else {
    router[item.method.toLocaleLowerCase()](item.path, item.handler);
  }
});

export default router;
```

```ts [src/index.ts]
import Koa from "koa";
import router from "./config/router";  // [!code ++]

const app = new Koa();

app
  .use(router.routes())   // [!code ++]
  .use(router.allowedMethods())   // [!code ++]
  .listen(3000, async () => {
    console.log(`服务启动成功: http://localhost:3000`);
});

```

:::

## 编写 controller 文件
以编写 `login.controller.ts` 文件为例，文件内容如下：
```ts [src/controller/login.controller.ts]
import { Context } from "koa";
import ResultUtils from "../utils/ResultUtils";

export default [
  {
    path: "/login/username",
    method: "post",
    description: "用户名登录",
    handler: async (ctx: Context) => {
      try {
        const token = "this is login token";
        ctx.body = ResultUtils.success(token, "登录成功");
      } catch (err) {
        ctx.body = ResultUtils.error(err.message);
      }
    },
  }
] as ControllerType[];
```

通过浏览器 访问 `http://localhost:3000/login/username` 返回 `{"code":200,"message":"登录成功","data":"this is login token"}` 数据 表示router 配置成功。

::: details `ControllerType` 类型定义如下
```ts
interface ControllerType {
  path: string, //  路由路径
  method: 'get' | 'post' | 'put' | 'delete' | 'all' | 'options' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'ALL' | 'OPTIONS', // 路由方法
  tittle?: string, // 路由标题
  description?: string, // 路由描述
  handler: Function, // 路由处理函数
  middleware?: Function | Function[] // 中间件
}
```

