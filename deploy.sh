#!/usr/bin/env sh

# 打包生成静态文件
echo start build
pnpm run docs:build
echo start build end

# 进入待发布的 dist/ 目录
cd .vitepress/dist/
echo commit build files to git


git init
git add .
git commit -m 'deploy'
echo git push -f git@github.com:xing403/xing403.github.io.git master
git push -f git@github.com:xing403/xing403.github.io.git master
echo finish
