---
title: SpringBoot 用户安全访问
layout: doc
tags: [java, springboot, security]
---

## 用户安全访问
> 区分用户权限，不同的用户赋予不同的访问管理权限，使管理更高效

SpringBoot中共有三种安全访问机制：
1. 内存安全认证
2. jdbc安全认证
3. UserDetailsService 安全认证
### 使用的依赖
```xml
<!--    安全管理-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```
数据库中一定要有三个数据库表:`t_customer`、`t_authority`、`t_customer_authority`
分别是用户表，用户权限表，用户与用户权限对应表
```sql
-- 用户表
DROP TABLE IF EXISTS `t_customer`;
CREATE TABLE `t_customer` (
  `id` INT(20) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(200) DEFAULT NULL,
  `password` VARCHAR(200) DEFAULT NULL,
  `valid` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
-- 权限表
DROP TABLE IF EXISTS `t_authority`;
CREATE TABLE `t_authority` (
  `id` INT(20) NOT NULL AUTO_INCREMENT,
  `authority` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
-- 用户与权限对应关系
DROP TABLE IF EXISTS `t_customer_authority`;
CREATE TABLE `t_customer_authority` (
  `id` INT(20) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(20) DEFAULT NULL,
  `authority_id` INT(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
-- 插入一些数据
INSERT INTO `t_customer` VALUES ('1', 'admin', '$2a$10$5ooQI8dir8jv0/gCa1Six.GpzAdIPf6pMqdminZ/3ijYzivCyPlfK', '1');
INSERT INTO `t_customer` VALUES ('2', 'shitou', '$2a$10$5ooQI8dir8jv0/gCa1Six.GpzAdIPf6pMqdminZ/3ijYzivCyPlfK', '1');
INSERT INTO `t_customer` VALUES ('3', '李四', '$2a$10$5ooQI8dir8jv0/gCa1Six.GpzAdIPf6pMqdminZ/3ijYzivCyPlfK', '1');

INSERT INTO `t_authority` VALUES ('1', 'common');
INSERT INTO `t_authority` VALUES ('2', 'vip');

INSERT INTO `t_customer_authority` VALUES ('1', '1', '1');
INSERT INTO `t_customer_authority` VALUES ('2', '2', '2');
```
## 创建实体类
> 客户实体类

```java
@Data
@Entity(name = "t_customer")
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  /**
   * 客户用户名
   */
  private String username;
  /**
   * 客户密码
   */
  private String password;
}
```
> 权限实体类

```java
@Entity(name = "t_authority")
@Data
public class Authority {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String authority ;

}
```
## 创建Repository 接口 管理业务语句
```java
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
  @Query(value = "select id from t_customer",nativeQuery = true)
  public List<Customer> getAllUser();
  public Customer findByUsername(String username);
  public boolean existsCustomerByIdAndUsername(Integer id,String username);

  public List<Customer> getCustomerByIdAndUsername(Integer id,String username);
}
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
  @Query(value = "select a.* from t_customer c,t_authority a,t_customer_authority ca where ca.customer_id=c.id and ca.authority_id=a.id and c.username =?1",nativeQuery = true)
  public List<Authority> findAuthoritiesByUsername(String username);
}
```
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220508001152.png)
> 客户信息管理CustomerService

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220508001454.png)
```java
@Service
public class CustomerService {
  @Autowired
  private CustomerRepository customerRepository;
  @Autowired
  private AuthorityRepository authorityRepository;
  @Autowired
  private RedisTemplate redisTemplate;

  public Customer getCustomer(String username) {

    Customer customer = null;
    Object o = redisTemplate.opsForValue().get("customer_" + username);
    if (o != null) {
      customer = (Customer) o;
    } else {
      customer = customerRepository.findByUsername(username);
      if (customer != null) {
        redisTemplate.opsForValue().set("customer_" + username, customer);
      }
    }
    return customer;
  }

  public List<Authority> getCustomerAuthority(String username) {
    List<Authority> authorities = null;
    Object o = redisTemplate.opsForValue().get("authorities_" + username);
    if (o != null) {
      authorities = (List<Authority>) o;
    } else {
      authorities = authorityRepository.findAuthoritiesByUsername(username);
      if (authorities.size() > 0) {
        redisTemplate.opsForValue().set("authorities_" + username, authorities);
      }
    }
    return authorities;
  }
}
```

## `@EnableWebSecurity` 开启安全模式

> 内存安全管理模式

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220508001752.png)

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  // 内存认证
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    //    加密方式
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    // 写死的账号密码，
    // 用户名 shitou 密码 123456 权限 为 common
    // 用户名 李四 密码 123456 权限为 vip
    auth.inMemoryAuthentication().passwordEncoder(bCryptPasswordEncoder)
        .withUser("li").password(bCryptPasswordEncoder.encode("111111")).roles("common")
        .and().withUser("李四").password(bCryptPasswordEncoder.encode("222222")).roles("vip");
  }
}
```
> JDBC 数据库安全身份认证模式
```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  private DataSource dataSource;

  // 数据库认证方式
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    // 查询用户的语句
    String us = "select username,password,valid from t_customer where username=?";
    // 查询 用户名以及用户权限的语句
    String as = "select c.username,a.authority from t_customer c, t_authority a, t_customer_authority ca " +
        "where ca.customer_id=c.id and ca.authority_id=a.id and c.username=?";
    // 设置 用户校验规则为 encoder 数据库源为 dataSource 设置查询用户语句，查询权限语句
    auth.jdbcAuthentication()
        .passwordEncoder(encoder)
        .dataSource(dataSource)
        .usersByUsernameQuery(us)
        .authoritiesByUsernameQuery(as);
  }
}
```
> UserDetailService 数据库安全身份认证模式
```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  // UserDetailsService 安全认证
  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    System.out.println("UserDetailService 身份验证");
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    auth.userDetailsService(userDetailsService).passwordEncoder(encoder);
  }
}
```
## 浏览器访问本地地址即可，自动跳转到login页面
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220507231215.png)
这里的login页面是身份安全认证自己默认的，并不是自己创建的使用`@Controller` 跳转的login.html页面
