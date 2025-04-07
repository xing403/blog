---
title: github & github 图床
layout: doc
tags: [github, gitee, tools]
---


## gitee图床

### 创建gitee账号

> 有账号密码可以直接进行图片仓库创建

打开gitee官网：[gitee官网]:https://gitee.com/

![picgoUpdateImg01](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg01.png)

点击右上角注册

**这个姓名是昵称**

![picgoUpdateImg02](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg02.png)

进行登录

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg03.png)

### 创建图片仓库

点击用户头像旁边的加号-----> 创建仓库

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg04.png)

填写仓库信息

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg05.png)

初始化readme.md文件

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg06.png)

创建仓库成功

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg07.png)

## 创建github图床

如果你没有 Github账号 可以在官网  [https://github.com/](https://github.com/) 注册。

下载 git [http://git-scm.com/downloads](http://git-scm.com/downloads) `安装` -> `打开`
### 输入命令
```shell
# 生成 SSH Key 备用
ssh-keygen -t rsa -C "youremail@example.com"
```
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328013908.png)

> 引号里面的为自己的邮箱

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014106.png)

> 生成成功,本地电脑找到这个目录

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014108.png)

### 进入到github官网 找到 `setting`
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014109.png)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014110.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014111.png)
此处的将ssh key 填入
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014112.png)


> 测试是否连接成功

```shell
ssh -T git@github.com
```
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014113.png)
### 创建 github 仓库
和 gitee 相似  [http://ilstudy.vip/index.php/archives/26/](http://ilstudy.vip/index.php/archives/26/) 

> 创建本地项目（github仓库中有资源）
~~~shell
git init
# clone github资源到本地
# git clone +GitHub上创建的仓库地址
git clone https://github.com/xing403/iotblog.git
~~~
![20220331135739.png](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220331135739.png)
> 创建本地项目（github仓库中没有资源）
~~~shell
git init

~~~
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014107.png)


## 安装picgo

官网下载：[https://molunerfinn.com/PicGo/](https://molunerfinn.com/PicGo/)

> 选择为谁安装该软件

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg08.png)

> 选择安装路径

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg09.png)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg10.png)

> 安装完成，点击打开

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg11.png)

> 下载gitee插件

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg12.png)

### 配置gitee图床信息

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg13.png)

> 获取token

打开gitee页面

> 点击右上角用户头像---->设置

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg14.png)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg15.png)

> 点击生成令牌

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg16.png)

> 填写令牌信息

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg17.png)

> 验证账号信息

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg18.png)

> 注意这里令牌（token）**只会出现一次**，请妥善保管

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg19.png)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg20.png)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg21.png)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg22.png)

将图片拖拽的上传区就可自动上传，可以多个图片一起上传，在PicGo中有快捷键设置上传，方便上传操作

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/tools/picgoUpdateImg23.png)



### 配置 GitHub 图床信息

#### 生成 github 的 token

settings -> Developer settings -> Personal access tokens

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014206.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014207.png)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014208.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014209.png)
保存好，token 忘记只能再次生成
配置 Picgo

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220328014210.png)


## 安装snipaste

snipaste是一个截图工具，配合picgo使用，截完图直接通过快捷键或者拖拽到上传区，之后将图片上传到图床

官网下载：https://www.snipaste.com/download.html

快捷键 **F1** 进行截屏，笔记本截屏可能需要使用 **Fn + F1**
