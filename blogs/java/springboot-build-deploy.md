---
title: SpringBoot 构建 & 部署
layout: doc
---
# SpringBoot 构建 & 部署
## SpringBoot 构建 war
### pxm.xml 内容
~~~xml
<!--  修改打包方式: war -->
<packaging>war</packaging>
<!-- 控制打包的版本-->
<version>0.0.2-SNAPSHOT</version>
~~~
### 配置依赖使用外部Tomcat服务器
~~~xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-tomcat</artifactId>
  <scope>provided</scope>
</dependency>
~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220418150147.png)

## SpringBoot 构建 jar
```xml
<!--  添加简单的配置项：打包的形式-->
<packaging>jar</packaging>
<build>
  <plugins>
<!--      maven 打包插件-->
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```
## maven 打包插件
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417143014.png)
## 开始打包
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417143215.png)
> 控制台会显示打包信息

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417143332.png)

> 项目打包生成的jar包位置

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417143404.png)

## 部署(宝塔面板)
> 添加项目

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417150109.png)
> 例如：

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417150204.png)
填写之后点击提交等待项目部署
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417150303.png)

> `在浏览器中输入所绑定的域名即可查看项目情况`
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220417150507.png)
部署成功

