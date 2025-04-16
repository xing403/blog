---
title: koa 整合 redis
layout: doc
tags: [nodejs, koa, redis]
---

## 安装依赖
项目根目录中安装 `ioredis`
```ts
pnpm add ioredis
```

## 创建实例 & 实现get set方法

::: code-group

```ts [src/config/redis.ts]
import Redis from "ioredis";

const redis = new Redis({
  port: 6379, // Redis端口，默认是6379
  host: "localhost", // Redis服务器地址，默认为localhost
  enableOfflineQueue: false, // 如果设置为true，则在Redis断开连接时，命令将排队等待重新连接
});

export default redis;
```

```ts [src/utils/RedisUtils.ts]
import redis from "../config/redis";

function get(key: string) {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function set(key: string, value: string, expire = 60 * 60 * 24) {
  return new Promise((resolve, reject) => {
    redis.set(key, value, "EX", expire, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export default { get, set };
:::
