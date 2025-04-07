---
title: flutter 起步
layout: doc
tags: [flutter]
---

## 环境安装

> 这里以开发 `Android` 为例
### 安装 `flutter` SDK
* 下载 `flutter` SDK ==> [官网](https://flutter.dev/docs/get-started/install/windows) [百度网盘](https://pan.baidu.com/s/12boN7xS0_WTPLGeiy61HjA?pwd=95r2 )
  * 下载后解压到自己需要安装的路径下{注意：`flutter` 的安装路径不能包含空格符}
* 配置系统 `path`

### 安装 `Android Studio`
下载 `Android Studio` ==> [百度网盘](https://pan.baidu.com/s/1MVWW9ZTwGqmWu2Jj7cYZ5Q?pwd=kdhs)
> 首次运行，安装以下组件
* Android SDK Platform, API 34.0.5
* Android SDK Command-line Tools
* Android SDK Build-Tools
* Android SDK Platform-Tools
* Android Emulator
> 插件安装
* Dart
### 下载编辑器
下载 `VSCode` ==> [官网](https://code.visualstudio.com/)
> 插件安装
* 搜索 `flutter` ==> 安装 `Flutter` 


## `flutter` 检查环境
* 打开 `cmd` 命令行
* 输入 `flutter doctor` 或 `flutter doctor -v`

::: info 
>Network resources
* X A network error occurred while checking "https://maven.google.com/": 信号灯超时时间已到
* X An HTTP error occurred while checking "https://github.com/": Connection closed before full header was received
:::
* 修改 `flutter` 配置文件 `~/packages/flutter_tools/lib/src/http_host_validator.dart`: `~` 为 `flutter` 安装根目录
```java
const String kMaven = 'https://maven.google.com/'; // [!code --]
const String kMaven = 'http://maven.aliyun.com/nexus/content/groups/public/'; // [!code ++]
```
> 缺少命令行工具
打开 `Android Studio`
 * 点击 `Settings` 
 * -> {`SDK Manager` | `Languages & Frameworks`}
 * -> `Android SDK` 
 * -> `SDK Tools` 
 * -> `Android SDK Command-line Tools` 
 * -> `Apply`
