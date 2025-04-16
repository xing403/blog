---
title: koa 后端服务
layout: doc
tags: [nodejs, koa, serve]
---

> 搭建环境

* nodejs 18+
* typescript 5.0+


## 安装 koa

```shell
pnpm add koa 
pnpm add @types/node @types/koa typescript -D
```
## 使用了ts 进行编写
安装 `nodemon` `ts-node` 在 node 环境下运行 ts 文件

```shell
pnpm add nodemon ts-node -D
```
以后的文件都将在 src 目录下
在 创建 index.ts 作为项目的启动入口
在 `package.json` 文件中添加 `scripts` 配置项，用于在命令行中执行 `nodemon` 命令并运行 `src/index.ts` 文件

::: code-group

```ts [src/index.ts]
import Koa from "koa";
const app = new Koa();

app.listen(3000, async () => {
  console.log(`服务启动成功: http://localhost:3000`);
});

```

```json [package.json]
{
  "name": "serve",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon ./src/index.ts", // [!code highlight]
  },
  "packageManager": "pnpm@10.4.1",
  "devDependencies": {
    "@types/koa": "^2.15.0",
    "@types/node": "^22.13.5",
    "nodemon": "^3.1.9",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.3"
  },
  "dependencies": {
    "koa": "^2.16.0",
  }
}
```
:::

## 启动项目

终端中输入 `pnpm dev` 等待项目启动 当终端中输出 `服务启动成功: http://localhost:3000` 内容时表明项目启动成功
