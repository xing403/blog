---
title: 创建Vue项目
layout: doc
---
# 创建Vue项目
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>vue</el-tag>
  <el-tag>nodejs</el-tag>
</div>

## Vue运行环境使用 Node.js

[Node.js官网下载](http://nodejs.cn/download/) 

```shell
# 配置源
npm config set registry https://registry.npm.taobao.org
# 查看源配置
npm config get registry
```
# 安装脚手架 Vue@cli

[Vue-Cli中文站点](https://cli.vuejs.org/zh/) 

> Win + R 输入cmd 打开命令终端安装脚手架
安装命令：`npm install -g @vue/cli` 全局安装，安装比较慢
~~~shell
npm install -g @vue/cli
~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220307232353.png)
> 查看Vue版本
~~~shell
vue --version
~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220307232511.png)
# 创建vue项目
> 选择项目的保存路径，在这个文件夹的路径栏输入`cmd`
命令：`vue create object_name`
* object_name: 为项目的名称，会自动创建一个和项目名称一样的目录
~~~shell
vue create iot
~~~
> 选择 Vue2 就可以了

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220307233922.png)

> 点击回车

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220307234124.png)
进入项目文件夹，运行服务
~~~shell
cd iot
npm run serve
~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220307234307.png)
此时我们的项目就已经建好了，只需要在浏览器中输入 `http://localhost:8080` 就可以访问了
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220307234459.png)





