---
title: Spring Boot @Value 为 null
layout: doc
tags: [spring boot, '@Value', issuse]
---

> 在 application.properties 或者 application.yml 中配置一些默认值时，通过@Value 注解可以获取到这些默认值 但结果为 `null`

原因: 使用 `static final` 修饰的字段，而此时的配置文件还没有加载，所以获取到的值为 `null`

## 解决方案
> 将从配置文件中获取的值，不通过 `static` 进行修饰
