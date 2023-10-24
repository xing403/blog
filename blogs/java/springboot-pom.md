---
title: SpringBoot 配置 pom.xml
layout: doc
---
# SpringBoot 配置 pom.xml
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>java</el-tag>
  <el-tag>springboot</el-tag>
  <el-tag>pom.xml</el-tag>
</div>

## pom文件各种标签
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
   <!-- pom模型版本 -->
  <modelVersion>4.0.0</modelVersion>
  <!-- 父级项目 -->
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.5</version>
    <relativePath/>
  </parent>
  <!-- 项目包名 -->
  <groupId>com.springboot</groupId>
  <!-- 工程名 -->
  <artifactId>blog</artifactId>
  <!-- 版本 -->
  <version>0.0.1-SNAPSHOT</version>
  <!--项目的名称-->  
  <name>blog</name>
  <!-- 项目的描述, Maven 产生的文档用 -->
  <description>Demo project for Spring Boot of blog</description>

  <!-- 属性设置 -->
  <properties>
    <!-- 编译字符编码为utf-8 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <!-- 输出字符编码为UTF-8  -->
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <!-- jdK版本 -->
    <java.version>11</java.version>
  </properties>
  <!-- 依赖关系 -->
  <dependencies>
    <!-- 项目中所使用的依赖 -->
  </dependencies>
  <!-- 编译 -->
  <build>
    <!-- 插件 -->
    <plugins>
      <!-- maven插件 -->
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

## SpringBoot 部分依赖
### SpringMVC
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### Spring 测试单元
```xml
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.12</version>
  <scope>test</scope>
</dependency>
```
### Spring 测试
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```
### mysql
```xml
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>8.0.27</version>
  <scope>runtime</scope>
</dependency>
```
### myBatis
```xml
<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
  <version>2.2.2</version>
</dependency>
```
### alibaba 数据库池
```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid-spring-boot-starter</artifactId>
  <version>1.1.22</version>
</dependency>
```
### SpringBoot jpa
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
### SpringBoot 热部署
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
```
### lombok
```xml
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
</dependency>
```
### 可视化接口API
```xml
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.4.0</version>
</dependency>
```
### swagger
```xml
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>2.4.0</version>
</dependency>
```
### SpringBoot thymeleaf模板
```xml
<!--    thymeleaf 模板-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```
### Json
```xml
<!--    Json -->
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>fastjson</artifactId>
  <version>1.2.47</version>
</dependency>
```
