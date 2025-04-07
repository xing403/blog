---
title: SpringBoot redis
layout: doc
tags: [redis, sptringboot, java]
---

## 下载 redis
> 小皮面板（Windows系统）

如果你是Linux系统 可以进入 [官网下载](https://redis.io/download/) 
![](https://cdn.jsdelivr.net/gh/xing403/iotblog@master/assets/website/20220424150932.png)

### SpringBoot 项目添加依赖
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```
### 添加配置信息
> application.properties

```properties
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.password=
```
### 创建实体对象
> 在model 包 或 domain 包下创建(规范)

```java
// Redis 缓存的键值名
@RedisHash("person")
public class Person {
  // 实体对象的唯一表示
  @Id
  private String id;
  // 标识对应属性在 Redis 中生成的二级索引
  @Indexed
  private String name;
  public Person(String name) {
    this.name = name;
  }
  @Override
  public String toString() {
    return "Person{" +
        "id='" + id + '\'' +
        ", name='" + name + '\'' +
        '}';
  }
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
}
```
### 创建 Repository
> 方便管理对应的CRUD方法

```java
// Person 的 Repository
public interface PersonRepository extends CrudRepository<Person, String> {
  // 查询所有的Person
  @Override
  List<Person> findAll();
  // 通过id 查找 Person
  List<Person> findPeopleById(String id);
  // 通过 name 查找 Person
  List<Person> findPeopleByName(String name);
}
```
### 创建测试类 RedisTest

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class RedisTest {

  @Autowired
  private PersonRepository personRepository;

  @Test
  public void savePerson() {
    // 创建两个 Person 实体
    Person person1 = new Person("张三");
    Person person2 = new Person("李四");
    // 保存两个实体
    Person save1 = personRepository.save(person1);
    Person save2 = personRepository.save(person2);
    // 输出保存对象
    System.out.println(save1);
    System.out.println(save2);
  }

  @Test
  public void selectPerson() {
    // 查询名叫张三的 Redis 缓存
    System.out.println(personRepository.findPeopleByName("张三"));
  }
  @Test
  public void updatePerson() {
    // 查询名叫 张三 的Redis 缓存对象
    Person person = personRepository.findPeopleByName("张三").get(0);
    // 修改对象的名字
    person.setName("ZhangSan");
    // 保存修改后的对象
    Person save = personRepository.save(person);
    System.out.println(save);
  }

  @Test
  public void deletePerson() {
    // 查找名叫李四的Person 对象， 确保一定存在
    Person person = personRepository.findPeopleByName("李四").get(0);
    // 删除对象
    personRepository.delete(person);
    try {
      // 尝试再次获取 李四对象
      Person del = personRepository.findPeopleByName("李四").get(0);
      System.out.println(del);
    } catch (Exception e) {
      // 没找到则会报错
      System.out.println("删除成功");
    }
  }
}
```
## 执行结果
### savePerson
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220424154245.png)
### updatePerson
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220424154346.png)
## deletePerson
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220424154449.png)


## 在数据库中执行创建数据库
> 以创建一个评论表为例
### 创建数据库
```sql
DROP DATABASE IF EXISTS `springbootdata`;
CREATE DATABASE `springbootdata`;
```
### 创建表
```sql
CREATE TABLE `t_comment` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `content` longtext COMMENT '评论内容',
  `author` varchar(200) DEFAULT NULL COMMENT '评论作者',
  `a_id` int(20) DEFAULT NULL COMMENT '关联的文章id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
```
### 添加部分数据
```sql
INSERT INTO `t_comment` VALUES 
('1', '1', '1', '1'),
('2', '赞一个', 'tom', '1'),
('3', '很详细', 'kitty', '1'),
('4', '很好，非常详细', '张三', '1'),
('5', '很不错', '张杨', '2');
```
## SpringBoot 部分
### 引入依赖
```xml
  <dependencies>
<!--  spring-boot-starter-web-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
<!--  核心：自动配置的支持、日志、yaml解析等-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
  </dependency>
<!--  阿里巴巴解析json依赖-->
  <dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
  </dependency>
<!--  httpclient请求依赖-->
  <dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
  </dependency>
<!--  爬虫+解析-->
  <dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.10.3</version>
  </dependency>
<!--  junit-->
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
  </dependency>
<!--  SpringBoot test-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
<!--  mysql-->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.27</version>
    <scope>runtime</scope>
  </dependency>
<!--  myBatis -->
  <dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
  </dependency>
<!--  alibaba 数据库池 -->
  <dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.22</version>
  </dependency>
<!--  jpa 依赖 -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
<!--  热部署-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
  </dependency>
<!--  lombok-->
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
  </dependency>
<!--  可视化接口API-->
  <dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.4.0</version>
  </dependency>
  <dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.4.0</version>
  </dependency>
<!--  thymeleaf 模板-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
  </dependency>
<!--  文件下载依赖-->
  <dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
  </dependency>
<!--  Tomcat依赖-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
  </dependency>
<!--  Redis依赖-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
  </dependency>
  </dependencies>
```
### 配置redis
```properties
# 配置MySQL数据库 数据库地址 用户名 密码
spring.datasource.url=jdbc:mysql://localhost:3306/springbootdata?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=123456
# 显示 jpa sql 语句 执行jpa 的时候会在控制台打印jpa 语句
spring.jpa.show-sql=true
# 配置第三方数据库源 druid
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.druid.initial-size=20
spring.datasource.druid.min-idle=10
spring.datasource.druid.max-active=100
# 配置 Redis
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.password=

```
### 创建 Discuss 实例
> `Discuss`
```java
// 使数据库数据映射到 对象
@Entity(name = "t_comment")
// 序列化，作用使数据不会出现乱码情况
public class Discuss implements Serializable {
  /**
   * @Id 表示 某属性 在数据表中是 主键
   * @GeneratedValue : 与 @Id 标注在同一个位置用于表示属性对应主键生成策略
   *    生成策略 :
   *    TABLE   (使用一个特定的数据库表来保存主键)
   *    SEQUENCE  (不支持主键自增的数据库主键生成策略)
   *    INDETITY  (主键自增)
   *    AUTO  (JPA 自动选择前面三个合适的策略，[默认选项])
   * */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String content;
  private String author;
  /**
   * @Column : 对于属性和表字段不同时，使用 name 属性 将类属性 与 表字段属性对应
   * */
  @Column(name = "a_id")
  private Integer aId;
  // 省略 getter，setter 和 toString 方法
}
```
### 创建 DiscussRepository 管理sql语句
```java
public interface DiscussRepository extends JpaRepository<Discuss, Integer> {
  // @Transactional 声明是一个事务，执行出错会回滚，控制事务
  @Transactional
  @Modifying
  @Query(value = "update t_comment c set c.author=?1 where c.id=?2")
  public int updateDiscuss(String author,Integer id);
}
```
### 创建 DiscussService 缓存一些数据
```java
@Service
public class DiscussService {
  // CommentRepository 继承自 JpaRepository 自带增删改查的方法
  @Autowired
  private DiscussRepository discussRepository;
  // 通过id 查找 评论
  // 缓存这个查询的结果，并以参数为缓存标识符（保证唯一）
  @Cacheable(cacheNames = "comment",unless = "#result==null")
  public Discuss findById(int id){
  Optional<Discuss> discuss = discussRepository.findById(id);
  // 判断查询的类是否存在 当类存在时 则为 true
  if (discuss.isPresent()){
    return discuss.get();
  }
  return null;
  }
  // 更新评论
//  更新缓存，标识符为 评论id， result 表示评论
  @CachePut(cacheNames = "comment",key = "#result.id")
  public Discuss updateDiscuss(Discuss discuss){
  // 根据评论的 id 修改 author
  discussRepository.updateDiscuss(discuss.getAuthor(),discuss.getaId());
  return discuss;
  }
  // 根据id 删除评论
  // 清除缓存注解
  @CacheEvict(cacheNames = "comment")
  public void deleteDiscuss(int discuss_id){
  discussRepository.deleteById(discuss_id);
  }
}
```
### 创建 DiscussController 控制页面访问
```java
// 返回json格式字符串
@RestController
public class DiscussController {
  // 注册组件 评论服务
  @Autowired
  private DiscussService commentService;
  // 访问/get/id 可根据评论id 查找相对应的评论
  // @PathVariable 自动映射 URL 绑定的占位符 {}
  @GetMapping("/get/{id}")
  public Discuss findById(@PathVariable("id") int comment_id){
  Discuss discuss = commentService.findById(comment_id);
  return discuss;
  }
  @GetMapping("/update/{id}/{author}")
  public Discuss updateDiscuss(@PathVariable("id") int commet_id,@PathVariable("author") String author){
  Discuss discuss = commentService.findById(commet_id);
  discuss.setAuthor(author);
  Discuss discuss1 = commentService.updateDiscuss(discuss);
  return discuss1;
  }
  @GetMapping("/delete/{id}")
  public void deleteDiscuss(@PathVariable("id") int comment_id){
  commentService.deleteDiscuss(comment_id);
  }
}
```
## 运行结果

{card-default label="提示" width="100%"}
在浏览器中已经访问过http://127.0.0.1:8088/update/1/jerry，所以数据和刚插入的有所不同
{/card-default}

> 在浏览器中访问路径 `http://127.0.0.1:8088/get/1`

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220424184854.png)
> 控制台会输出

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220424184942.png)
> redis 客户端也会进行缓存

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220424185053.png)
*  刷新浏览器，发现控制台不会再次输出sql语句
更改访问路径信息`http://127.0.0.1:8088/get/2`
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220424185333.png)
> redis 客户端会再次缓存数据




