---
title: vue3-ts-mqtt 封装
layout: doc
tags: ['vue3', 'mqtt', 'utils']
---

## 什么是MQTT
**MQTT** (消息队列遥测传输)是ISO 标准(ISO/IEC PRF 20922)下基于发布/订阅范式的消息协议。它工作在 TCP/IP协议族上，是为硬件性能低下的远程设备以及网络状况糟糕的情况下而设计的发布/订阅型消息协议，为此，它需要一个消息中间件。
[百度百科](https://baike.baidu.com/item/MQTT/3618851)

### 个人理解

> 订阅
好比报纸订购，用户选择报纸名称进行订阅，之后就可以查看这个名称的每一期的报纸。
MQTT，用户向MQTT服务器发送订阅某一个Topic，之后就能接收这个Topic的所有消息。

> 发布
由于每一期的报纸上面有文章，这个文章的作者只需要向报纸出版社进行投稿，然后出版社进行文章印刷之后将这一期的报纸发放到订阅者的手中。
MQTT 消息发送者发送携带Topic的消息到MQTT服务器，服务器将消息转发到所有订阅这个Topic的用户，当订阅者能连接到MQTT服务器时，就能收到消息。(但投稿文章会有酬金，但MQTT服务器不会)
## 使用MQTT
大致了解一下我也不清楚具体工作流程。计算机是真的 amazing
### 安装MQTT
```shell
pnpm install mqtt
```
等待片刻...

### 使用 Store 
> 目的
项目全局使用MQTT，我是使用 [`pinia`](https://pinia.web3doc.top/) (没错他的logo是个可爱的小菠萝，不要怀疑)
> 安装

```shell
pnpm install pinia
```
> 引用 pinia

[安装和使用 pinia](https://pinia.web3doc.top/getting-started.html#安装)

> 创建一个mqtt.ts 在 `src/store/` 下面

```typescript
import type { MqttClient } from 'mqtt'
import * as mqtt from 'mqtt/dist/mqtt.min.js'

interface MESSAGE {
  topic: string    // 消息的主题
  message: any     // 消息内容
}

const useMQTTStore = defineStore('mqtt', () => {
  const IS_Connect = ref(false)                // 判断是否连接成功
  const Topics = ref([] as string [])          // 订阅的所有Topic
  const client = ref({} as MqttClient)         // 连接MQTT后的实体
  const MQTT_HOST = ref('MQTT_HOST')
  const MQTT_USERNAME = ref('MQTT_USERNAME')   // 可以为空
  const MQTT_PASSWORD = ref('MQTT_PASSWORD')   // 可以为空
  const CLIENT_ID = ref('')                    // 连接MQTT的ID唯一标识
  const MQTT_MESSAGES = ref([] as MESSAGE[])   // MQTT订阅后收到的消息
  // 连接配置
  const options = {
    clientId: '',
    hostname: MQTT_HOST.value,
    protocol: 'ws',
    protocolVersion: 4,
    port: 8083,
    path: '/mqtt',
    keepalive: 60,
    reconnectPeriod: 5,
  }
  // 连接
  function connect(clientId: string) {
    CLIENT_ID.value = clientId
    return new Promise((resolve, reject) => {
      options.clientId = clientId
      try {
        if (IS_Connect.value)
          return
        client.value = mqtt.connect(options)  // mqtt 的连接方法
        client.value?.on('connect', () => {    // 连接上后执行方法
          IS_Connect.value = true
        })
      }
      catch (error) {
        reject(error)
      }
    })
  }
  // 订阅
  function subscribe(topics: string[] | string) {    // 订阅Topic 可以是多个，也可以是单个
    let new_topics = []
    topics.foreach(topic =>{    // 过滤一下已经订阅过的Topic
      if(!Topics.value.include(topic)){
        new_topics.push(topic)
        Topics.value.push(topic)
      }
    })
    client.value.subscribe(new_topics)  // 订阅新的Topic
    client.value.on('message', receive)  // 当消息抵达时
  }
  // 发布
  function sendPublic(topic: string, message: any) {
    client.value.publish(topic, JSON.stringify(message))
  }
  // 断开
  function disconnect() {
    client.value.end()
  }
  // 消息抵达
  function receive(topic: string, message: any) {
    MQTT_MESSAGES.value.push({    // 消息加入接收消息数组
      topic,
      message: JSON.parse(message),
    })
  }
  return {  // 暴露所有参数，可直接访问和修改
    IS_Connect,
    client,
    MQTT_HOST,
    MQTT_USERNAME,
    MQTT_PASSWORD,
    MQTT_MESSAGES,
    connect,
    subscribe,
    sendPublic,
    disconnect,
    receive,
  }
})
export default useMQTTStore
```
> 使用封装的mqtt

创建vue_test.vue 位置:`src/views` 或者 `src/components` 或者 `src/pages` 或者不创建直接在App.vue 下写也可以看自己心情(开心才是最重要的)

```html
<script lang="ts" setup>
import useMQTTStore from "@/store/mqtt"
const MQTTStore = useMQTTStore()
MQTTStore.connect("MQTT_CLIENTID")
MQTTStore.subscribe(["MQTT_TOPIC1", "MQTT_TOPIC2"])
MQTTStore.sendPublic("MQTT_TOPIC1",{
  msg: "Hello MQTT"
})
</script>
<template>
  <div v-for="item, index in MQTTStore.MQTT_MESSAGES" :key="index">
    <div>Topic:{{ item.topic }}，message:{{ item.message }}</div>
  </div>
</template>
```
> 后面可能还需要完善，就先这样
