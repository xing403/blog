---
title: koa 文件上传
layout: doc
tags: [nodejs, koa, file, upload]
---

## 安装依赖

```bash
pnpm add koa-static multer @koa/multer --save
pnpm add @types/koa-static @types/koa__multer -D
```

## 处理文件
创建文件处理中间件 file.middleware.ts 处理单文件 或多文件上传, 并在处理之后返回文件信息

::: code-group
```ts [src/middleware/file.middleware.ts]
import multer from "@koa/multer";
import UUIDUtils from "../utils/UUIDUtils";
import constant from "../config/constant";

export default function fileMiddleware(mode: "single" | "array" = "single", fieldname = "file") {
  const { max, prefix, path: fileUploadPath } = constant.file;
  const storage = multer.diskStorage({
    // multer调用diskStorage可控制磁盘存储引擎
    destination: function (req, file, cb) {
      cb(null, `${prefix}${fileUploadPath}`);
    },
    filename: function (req, file, cb) {
      const suffix = file.originalname.split(".").pop();
      cb(null, `${UUIDUtils.generateSimpleUUID()}.${suffix}`);
    },
  });
  const upload = multer({ storage });
  return mode === "single" ? upload.single(fieldname) : upload.array(fieldname, max);
}
```
```ts [src/controller/file.controller.ts]
import { Context } from "koa";

import fileMiddleware from "../middleware/file.middleware";
import ResultUtils from "../utils/ResultUtils";
import authMiddleware from "../middleware/auth.middleware";
import { File } from "@koa/multer";
import type { ControllerType } from "../types";

export default [
  {
    path: "/upload",
    method: "post",
    description: "上传文件",
    middleware: [authMiddleware(), fileMiddleware()],
    handler: async (ctx: Context) => {
      ctx.body = ResultUtils.success({ url: ctx.request.file.path });
    },
  },
  {
    path: "/uploads",
    method: "post",
    description: "上传多个文件",
    middleware: [authMiddleware(), fileMiddleware("array", "files")],
    handler: async (ctx: Context) => {
      ctx.body = ResultUtils.success({ urls: ((ctx.request.files || []) as File[]).map((file) => file.path) });
    },
  },
] as ControllerType[];
```
