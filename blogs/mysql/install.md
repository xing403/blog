---
title: mysql 安装
layout: doc
---
# mysql 安装
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>mysql</el-tag>
  <el-tag>database</el-tag>
</div>


> 命令：`mysqld -install
~~~shell
mysqld -install
~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/Snipaste_2022-03-12_17-03-28.png)

> 初始化 mysql

~~~shell
mysqld --initialize --console
~~~

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220313105827.png)

> 启动mysql 服务 `net start mysql`
~~~shell
net start mysql
~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220313110122.png)

> 停止mysql 服务`net stop mysql`

~~~shell
net stop mysql
~~~

