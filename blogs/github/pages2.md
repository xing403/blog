---
title: GitHub pages2
layout: doc
---
# GitHub pages2
第二种配置自动部署方式
## 1. 创建新仓库
1. 创建一个新的仓库放置打包的文件
> 将仓库命名为 `<username>.github.io` -username 为用户名
## 2. 配置脚本
在项目的根目录下 deploy.sh 文件中添加如下脚本
```sh
#!/usr/bin/env sh
# 打包项目
pnpm run docs:build
# 切换到dist目录
cd .vitepress/dist/
# 将打包文件提交到新仓库中
git init
git add .
git commit -m 'deploy'
git push -f git@github.com:xing403/xing403.github.io.git master
```
## 3. 配置script 命令
在 package.json 文件中添加如下命令
```json
{
  "scripts": {
    "deploy:github": "deploy.sh"
  }
}
```
## 4. 本地执行 
在项目根目录下执行
```sh
pnpm run deploy:github
```
