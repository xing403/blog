---
title: SpringBoot MVC
layout: doc
---
# SpringBoot MVC
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>java</el-tag>
  <el-tag>springboot</el-tag>
  <el-tag>Servlet</el-tag>
  <el-tag>Filter</el-tag>
  <el-tag>Interceptor</el-tag>
  <el-tag>Listener</el-tag>
</div>

* Servlet : 控制器，和controller 相似，用于页面控制等
* Filter : 过滤器，
* Interceptor : 拦截器
* Listener : 监听器

> 使用的依赖

![SpringMVC](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212516.png)
![SpringThymeleaf](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212607.png)

## SpringMVC

![SpringMvcInterceptor](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212555.png)
![SpringMVCConfig](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212556.png)

>在浏览器输入 localhost:8080/admin 将会跳转到 localhost:8080/login 来自于拦截器 Interceptor 的拦截

## 使用注册组件方式整合
![BeanServlet](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212608.png)
![BeanServletFilter](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212609.png)
![BeanServletListener](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212557.png)
![BeanServletConfig](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212558.png)
## 使用注解方式整合

![Servlet](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212559.png)
![ServletFilter](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212600.png)

![ServletListener](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212601.png)
![ServletConfig](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212602.png)
![ServletComponentScan](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212603.png)
## 输出结果
![localhost:8081/servlet](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212604.png)

![console ServletListener](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212605.png)

![console ServletListener](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212606.png)

![console ServletFilter](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220410212606.png)
