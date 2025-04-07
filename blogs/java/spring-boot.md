---
title: spring boot 项目初始化
layout: doc
tags: [SpringBoot, java]
---

在 `Idea 社区版` 创建一个新的 `Spring Boot` 项目时，`Idea` 会让你更新到开发版

![原因](/images/spring/problem.png)

## 解决方案

1. 网络上大多让下载Idea 插件 但使用时并没有什么用 :angry:
2. 但是 `Idea` 虽然不能创建，可以运行已经存在的项目，所以可以先创建一个 `Spring Boot` 项目，然后再导入到 `Idea` 中 

## 官方创建模板
[https://start.spring.io](https://start.spring.io)

可以在Spring 官方中创建一个新的空白Spring Boot 项目, 还以选择一部分依赖包

![原因](/images/spring/initializer.png)

* 如果你是 jdk其他版本，在创建项目时，随机选择一个后，在项目生成后的文件中更改

之后点击 `GENERATE` 直接下载 或 `EXPLORE` 预览将要生成的文件
也可以点击 `SHARE` 将项目配置信息以链接方式分享给其他人

项目模板下载后在 `Idea` 中选择项目文件地址导入即可
