---
title: Spring Boot @Value
layout: doc
---
# Spring Boot @Value 为 null
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>issuse</el-tag>
  <el-tag>spring boot</el-tag>
  <el-tag>@Value</el-tag>
</div>

> 在 application.properties 或者 application.yml 中配置一些默认值时，通过@Value 注解可以获取到这些默认值 但结果为 `null`

原因: 使用 `static final` 修饰的字段，而此时的配置文件还没有加载，所以获取到的值为 `null`

## 解决方案
> 将从配置文件中获取的值，不通过 `static` 进行修饰
