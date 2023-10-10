---
title: GitHub pages
layout: doc
---
# GitHub pages

<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>github</el-tag>
  <el-tag>pages</el-tag>
  <el-tag>tools</el-tag>
  <el-tag>automation</el-tag>
</div>

## 关于 GitHub Pages
GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 文件，（可选）通过构建过程运行文件，然后发布网站。

## 将打包好的文件提交到github
* 首先要创建一个仓库
> 提交命令
```bash
git add .
git commit -m "commit"
git push
```

## 配置 GitHub Pages
![github-pages-config](/images/screenshot/github-pages-config.png)

## 配置工作流
> 无需本地打包，直接提交到仓库，把打包部署交给github
### 配置工作流
1. 在项目的 `.github/workflows` 下面创建一个 `release.yml` 文件
2. 配置文件如下
```yaml
name: Release

on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Install
        uses: actions/setup-node@v3
        with:
          node-version: 16.x
      - run: npm i pnpm -g
      - run: pnpm install
      
      - name: Build
        run: |
          pnpm run docs:build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.ACCESS_TOKEN }}
          publish_dir: .vitepress/dist
```
> 这里有个参数`secrets.ACCESS_TOKEN` 需要 github 授权
#### 创建 token
参照 [github token](./token)
权限选择 repo 即可
#### 配置 token
进入需要配置token 的仓库，点击 `Settings` 选择 `Secrets` 添加一个 `ACCESS_TOKEN`
![github-pages-token-config](/images/screenshot/github-pages-token-config.png)
## 结束
当每次仓库更新时，github 会自动打包部署
