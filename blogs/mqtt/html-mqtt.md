---
title: HTML 使用MQTT
layout: doc
---
# HTML 使用MQTT
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>mqtt</el-tag>
</div>


## 什么是Mqtt
 [百度百科介绍](https://baike.baidu.com/item/MQTT/3618851)

## 安装Mqtt

 [EMQX 下载](https://www.emqx.io/zh) 
> 在页面中引入Mqtt
```html
<script src="https://unpkg.com/mqtt/dist/mqtt.js"></script>
```
## 配置连接信息
```js
// 连接选项
const options = {
    clean: true, // true: 清除会话, false: 保留会话
    connectTimeout: 4000, // 超时时间
    // 认证信息
    clientId: 'html',	//客户端ID
    username: 'admin', //连接用户名
    password: 'public',//连接密码，有的密码默认为public
    // 心跳时间
    keepalive: 60,
}
```
> Mqtt服务地址并且连接Mqtt
```js
const connectUrl = 'ws://localhost:8083/mqtt' //连接服务端地址，注意查看ws协议对应的端口号
const client = mqtt.connect(connectUrl, options)
```
> mqtt的一些监听函数
```js
let topices = ["topic1","topic2"];
client.on('connect', () => {
  console.log('连接成功')
  // 订阅多个主题
  client.subscribe(
      topices, //主题
      { qos: 1 },  
      (err) => {
          console.log(err || '订阅成功')
      },
  );
  // 发布消息
  client.publish(topic, msg, (err) => {
      console.log(err || '发布成功')
    })
  })
  //失败重连
  client.on('reconnect', (error) => {
    console.log('正在重连:', error)
  })
  //连接失败
  client.on('error', (error) => {
    console.log('连接失败:', error)
  })
  //接收消息
  client.on('message', (topic, message) => {
    console.log('收到消息:', topic, message.toString())
  })
```
