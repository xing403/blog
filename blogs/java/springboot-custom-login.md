---
title: Springboot 自定义登录
layout: doc
tags: [java, springboot]
---

## LoginController
```java
@Controller
public class LoginController {
  // 设置 login页面为get方式传参
  @GetMapping("/userLogin")
  public String login(Model model) {
    return "login/login";
  }
}
```

## login.html
```html
<div id="app">
  <div style="width: 275px;margin: 130px auto;">
    <h2>用户登录</h2>
    <el-form method="post" action="/userLogin">
      <el-form-item>
        <el-input v-model="username" type="text" name="name" placeholder="用户名" clearable
              autofocus="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="pwd" type="password" name="pwd" placeholder="密码" clearable show-password></el-input>
      </el-form-item>
      <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}">
      <el-form-item>
        <el-checkbox name="rememberme" v-model="rememberMe">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">登 录</el-button>
        <el-button type="primary" plain>注 册</el-button>
      </el-form-item>
    </el-form>
  </div>

</div>
<script src="https://fastly.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
  let vue = new Vue({
    el: "#app",
    type : "module",
    data: function () {
      return {
        username: "",
        pwd: "",
        rememberMe: false
      }
    },
    mounted: function () {
    },
  })
</script>
```

## SecurityConfig
```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  private DataSource dataSource;
  // UserDetailsService 安全认证
  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    auth.userDetailsService(userDetailsService).passwordEncoder(encoder);
  }

  @Bean
  public JdbcTokenRepositoryImpl tokenRepository(){
    JdbcTokenRepositoryImpl jr=new JdbcTokenRepositoryImpl();
    jr.setDataSource(dataSource);
    return jr;
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // 配置页面访问权限
    /**
     * "/"          根目录          resources/template/index.html 权限为所有人均可访问
     * "/detail/**"     /detail         下面的所有目录或页面vip权限用户均可访问
     * "/detail/common/**"  /detail/common/**     下面的所有页面 common 权限用户均可访问
     * anyRequest 所有的请求，必须通过身份认证 并且 开启用户登录机制
     */
    http.authorizeRequests()
        .antMatchers("/").permitAll()
        .antMatchers("/getUserBySession").permitAll()
        .antMatchers("/login/**").permitAll()
        .antMatchers("/detail/**").hasRole("vip")
        .antMatchers("/detail/common/**").hasRole("common")
        .anyRequest().authenticated().and().formLogin();
    /**
     * 自定义用户登录控制
     * 登录页面 /login
     * 需要参数为 name 用户名 pwd 用户密码
     * 默认成功路径 /
     * 错误路径 /login
     */
    http.formLogin()
        .loginPage("/userLogin").permitAll()
        .usernameParameter("name").passwordParameter("pwd")
        .defaultSuccessUrl("/")
        .failureUrl("/userLogin?res=error")
        .and().logout();
    /**
     * 退出登录
     */
    http.logout()
        .logoutUrl("/userLogout")
        .logoutSuccessUrl("/userLogin");
  }
}
```
