---
title: 在安卓设备上运行demo
layout: doc
tags: [flutter, android]
---

## 根据 flutter 官方文档 安装环境
[https://docs.flutter.cn/get-started/install](https://docs.flutter.cn/get-started/install)

```shell
# 创建项目 命名格式: [a-zA-Z0-9_]
flutter create project_name
# 运行项目
flutter run
```
在运行中出现
```shell
adb: failed to install E:\...\{project_name}\build\app\outputs\flutter-apk\app-debug.apk: 
Failure [INSTALL_FAILED_USER_RESTRICTED: Install canceled by user]
```
* 检查移动设备是否连接电脑
* 检查手机是否开启USB调试模式
  * 设置 -> 关于手机 -> 系统版本 -> 找到版本号 -> 点击版本号 -> 显示开发者选项 -> 打开USB调试 
* 检查是否开启USB安装 (未开启会阻止通过 USB 安装应用)
* 重新运行项目
