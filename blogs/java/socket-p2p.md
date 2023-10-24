---
title: Socket 点对点通信
layout: doc
---
# Socket 点对点通信
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>java</el-tag>
  <el-tag>Socket</el-tag>
  <el-tag>p2p</el-tag>
</div>

## Socket 
Socket 套接字,就是对网络中不同主机上的应用进程之间进行双向通信的端点的抽象。一个套接字就是网络上进程通信的一端，提供了应用层进程利用网络协议交换数据的机制。从所处的地位来讲，套接字上联应用进程，下联网络协议栈，是应用程序通过网络协议进行通信的接口，是应用程序与网络协议栈进行交互的接口 [百度百科](https://baike.baidu.com/item/%E5%A5%97%E6%8E%A5%E5%AD%97/9637606) 
## 程序采用多线程方式进行数据发送与接受
### 主类
`Main.java`
```java
package UDPSocket;

public class Main {
  public static void main(String[] args) {
    new Receive().start();// 接受数据线程
    new Send().start();// 发送数据线程
  }
}
```
### 数据发送类
```java
class Send extends Thread {
  public void run() {
    try {
      DatagramSocket socket = new DatagramSocket();
      Scanner sc = new Scanner(System.in);

      while (true) {
        String str = sc.nextLine();
        // 输入 logout 退出循环发送消息
        if ("logout".equals(str))
          break;
        /**
         * IP   : 数据接收者的IP,
         * port : 数据接收着的端口
         */
        String IP = "127.0.0.1";
        int port = 6666;
        DatagramPacket packet = new DatagramPacket(
          str.getBytes(),
          str.getBytes().length,
          InetAddress.getByName(IP),
          port
        );
        socket.send(packet);
      }
      socket.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```
### 数据接受类
```java
public class Receive extends Thread {
  public void run() {
    try {
      // 监听端口是否有数据，初始化数据容量
      DatagramSocket socket = new DatagramSocket(6666);
      DatagramPacket packet = new DatagramPacket(new byte[1024], 1024);

      while(true) {
        socket.receive(packet);// 接收货物
        byte[] arr = packet.getData();
        int len = packet.getLength();
        String ip = packet.getAddress().getHostAddress();
        // 这个IP 为发送者的IP
        System.out.println("收到来自IP" + ip + "消息:" + new String(arr,0,len));
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```
> 本地测试

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220528132257.png)
