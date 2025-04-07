---
title: SpringBoot 异步任务
layout: doc
tags: [java, SpringBoot,  task]
---

## 开启异步任务
启动类开启异步任务
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220520110255.png)
## 异步服务业务
```java
@Service
public class TaskService {
  /**
   * 异步服务，无返回值
   */
  @Async
  public void sendMsg() throws Exception {
    System.out.println("任务服务消息开启...");
    long sTime = System.currentTimeMillis();
    System.out.println("开始时间：" + sTime);
    Thread.sleep(5000);
    long eTime = System.currentTimeMillis();
    System.out.println("结束时间：" + eTime);
    System.out.println("总用时：" + (eTime - sTime));
  }

  /**
   * 异步服务，有返回值
   */
  @Async
  public Future<Integer> TaskA() throws InterruptedException {
    System.out.println("TaskA 开始执行");
    long sTime = System.currentTimeMillis();
    System.out.println("TaskA 开始时间：" + sTime);
    Thread.sleep(5000);
    Integer res = Math.toIntExact(Math.round(Math.random() * 1000000));
    long eTime = System.currentTimeMillis();
    System.out.println("TaskA 结束时间：" + eTime);
    System.out.println("TaskA 总用时：" + (eTime - sTime));
    return new AsyncResult<Integer>(res);
  }

  /**
   * 异步服务，有返回值
   */
  @Async
  public Future<Integer> TaskB() throws InterruptedException {
    System.out.println("TaskB 开始执行");
    long sTime = System.currentTimeMillis();
    System.out.println("TaskB 开始时间：" + sTime);
    Thread.sleep(5000);
    Integer res = Math.toIntExact(Math.round(Math.random() * 1000000));
    long eTime = System.currentTimeMillis();
    System.out.println("TaskB 结束时间：" + eTime);
    System.out.println("TaskB 总用时：" + (eTime - sTime));
    return new AsyncResult<Integer>(res);
  }
}
```
> 不要使用 测试单元运行，会出现异步业务没有执行结束，项目就停止运行了

## Controller 类
```java
@RestController
public class AsyncTaskController {
  @Autowired
  TaskService taskService;

  @GetMapping("/voidReturnTask")
  public String voidReturnTask() throws Exception {
    long sTime = System.currentTimeMillis();
    taskService.sendMsg();
    long eTime = System.currentTimeMillis();
    System.out.println("voidReturnTask run Time:" + (eTime - sTime) + "s");
    return "voidReturnTask success";
  }

  @GetMapping("/hasReturnTask")
  public String hasReturnTask() throws Exception {
    long sTime = System.currentTimeMillis();

    Future<Integer> taskA = taskService.TaskA();
    Future<Integer> taskB = taskService.TaskB();
    int i = taskA.get() + taskB.get();
    System.out.println("两个任务结果：" + i);
    long eTime = System.currentTimeMillis();
    System.out.println("hasReturnTask run Time:" + (eTime - sTime) + "s");
    return "hasReturnTask success";
  }
}
```
## 运行
在浏览器分别访问
* `localhost:8088/voidReturnTask`
* `localhost:8088/hasReturnTask`
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220520110841.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220520110912.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220520110951.png)




