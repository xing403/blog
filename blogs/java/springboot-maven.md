---
title: SpringBoot 配置maven
layout: doc
tags: [ java, SpringBoot, maven]
---

## 什么是maven
 [maven 介绍](https://baike.baidu.com/item/Maven) 
## 下载 maven
 [maven 下载](https://maven.apache.org/download.cgi) 
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220317142218.png)

* 找到下载路径解压
  
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220317142453.png)

* 进入 `conf` 目录

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220317142619.png)

* 打开 `settings.xml`

> 配置资源包保存位置

~~~xml
<!-- F:\environments\Java\SpringBoot\repository -->
<localRepository>F:\environments\Java\SpringBoot\repository</localRepository>
~~~

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220317143722.png)

> 配置阿里云镜像

下面内容写在 `<mirrors></mirrors>` 中间
~~~xml
<!-- 两个公共仓库，选择一个就可以 -->
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>
<mirror>
  <id>alimaven</id>
  <mirrorOf>central</mirrorOf>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
</mirror>
~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220317144312.png)

## Idea 中使用Maven
> 打开 `setting`

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220317145017.png)

> 点击 Apply 应用


