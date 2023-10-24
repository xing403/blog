---
title: RabbitMQ 消息服务
layout: doc
---
# RabbitMQ 消息服务
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>java</el-tag>
  <el-tag>SpringBoot</el-tag>
  <el-tag>RabbitMQ</el-tag>
</div>

## 安装 RabbitMQ 服务
由于 RabbitMQ 基于 erlang 语言，因此在安装的时需要先安装erlang
### 下载 erlang
 下载链接：[https://www.erlang.org/downloads](https://www.erlang.org/downloads) 
这个可能有点慢，毕竟是外国网站，要是不想要最新版选择 [百度网盘](https://pan.baidu.com/s/1c848j2odvZxwHvplJVsJ8A?p=b21g)

下载后双击.exe 文件安装即可，安装结束配置一下环境变量，检查环境变量是否配置成功
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513122457.png) 
### 下载 RabbitMQ
 下载链接：[https://www.rabbitmq.com/download.html](https://www.rabbitmq.com/download.html) 
这个也很慢，[百度网盘](https://pan.baidu.com/s/1sbaNeA3ofyCVncv-MxaKeQ?p=zgkj)

双击即可安装(注意安装目录中尽量不要有空格)，在安装的过程发现安装好之后就自动启动了
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513123209.png)
进入安装目录下的 `sbin` 目录 打开命令提示提示符窗口
```shell
# 安装rabbitmq插件
rabbitmq-plugins enable rabbitmq_managemen
# 若出现错误，需要重启服务，正常请忽略
Rabbitmq-service stop
rabbitmq-service
```
> 若停止服务失败，错误代码5。

说明权限不够，系统登录的是普通用户，需要管理员的权限执行该命令。用管理员打开cmd，之后执行
```shell
rabbitmq-service stop

rabbitmq-service remove

rabbitmq-service install

rabbitmq-service start

rabbitmq-plugins enable rabbitmq_management
```
插件安装完成在浏览器中输入：`http://localhost:15672` 查看
输入用户名：**guest**，密码：**guest**
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513125213.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513125314.png)
## SpringBoot 使用Rabbit 服务
### 使用依赖

这个依赖是SpringBoot 自己集成好的，引入直接用就可以了
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```
> 配置RabbitMQ

```yaml
spring:
  rabbitmq:
  host: 127.0.0.1
  port: 5672
  username: guest
  password: guest
  virtual-host: /
```
### API 方式整合 RabbitMQ
```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class RabbitMQTest {
  // API 方式
  @Autowired
  AmqpAdmin amqpAdmin;

  @Test
  public void amqpAdminTest() {
  // 定义信息
  String ExangeName = "fanout_exchange";
  List<String> MsgQueues = new LinkedList<>();
  MsgQueues.add("fanout_queue_email");
  MsgQueues.add("fanout_queue_sms");
  // 定义 fanout 类型交换器，（用户发送数据经交换机分发，进入不同的消息队列）
  amqpAdmin.declareExchange(new FanoutExchange(ExangeName));
  // 定义两个消息队列，用于接收交换机分发的数据
  for (String queue : MsgQueues) {
    amqpAdmin.declareQueue(new Queue(queue));
  }
  // 将消息队列绑定到交换机中
  for (String queue : MsgQueues) {
    amqpAdmin.declareBinding(new Binding(queue, Binding.DestinationType.QUEUE, ExangeName, "", null));
  }
  }
}
```
运行一下，打开浏览器访问可视化窗口，增加了一个交换器，也会增加两个消息队列
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513130858.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513130959.png)
> 创建一个发送的数据类
```java
public class RabbitUser {
  private Integer id;
  private String username;
  public RabbitUser() {}
  public RabbitUser(Integer id, String username) {
  this.id = id;
  this.username = username;
  }
  // 省去get/set 和 toString方法
}
```
> 测试消息
```java
@Autowired
private RabbitTemplate rabbitTemplate;

@Test
public void publishSubscribe() {
  // 发送消息
  RabbitUser rabbitUser = new RabbitUser(1, "admin");
  // rabbitmq 发送字符串或者 bite 类型
  rabbitTemplate.convertAndSend("fanout_exchange", "", rabbitUser.toString());
}
```
> 自定义类型消息类型，避免乱码
```java
@Configuration
public class RabbitMQConfig {
  @Bean
  public MessageConverter messageConverter() {
  return new Jackson2JsonMessageConverter();
  }
}
```
运行
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513135933.png)
> 获取发送的消息信息
```java
@Service
public class RabbitMQService {
  // 接收邮件
  @RabbitListener(queues = "fanout_queue_email")
  public void psubConsumerEmail(Message message) {
  System.out.println("MsgAllInfo:" + message);

  }

  // 接收短信
  @RabbitListener(queues = "fanout_queue_sms")
  public void psubConsumerSms(Message message) {

  String s = new String(message.getBody());
  System.out.println("Sms: " + s);
  }
}
```
### 运行
> 控制台打印结果
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513164607.png)
> 可视化面板结果
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220513164650.png)

### 基于注解
在RabbitConfig 类中添加配置

```java
@Bean
public Exchange fanout_exchange() {
  return ExchangeBuilder.fanoutExchange("fanout_exchange").build();
}

@Bean
public Queue fanout_queue_email() {
  return new Queue("fanout_queue_email");
}

@Bean
public Queue fanout_queue_sms() {
  return new Queue("fanout_queue_sms");
}

@Bean
public Binding bindingEmail() {
  return BindingBuilder.bind(fanout_queue_email()).to(fanout_exchange()).with("").noargs();
}
@Bean
public Binding bindingSms() {
  return BindingBuilder.bind(fanout_queue_sms()).to(fanout_exchange()).with("").noargs();
}
```
> 接受处理方法
```java
@RabbitListener(bindings = @QueueBinding(value = @Queue("fanout_queue_email"),
           exchange = @Exchange(value = "fanout_exchange", type = "fanout")))
public void psubConsumerEmail(RabbitUser user) {
  System.out.println("Email:" + user);
}

@RabbitListener(bindings = @QueueBinding(value = @Queue("fanout_queue_sms"),
           exchange = @Exchange(value = "fanout_exchange", type = "fanout")))
public void psubConsumerSms(RabbitUser user) {
  System.out.println("Sms:" + user);
}
```
