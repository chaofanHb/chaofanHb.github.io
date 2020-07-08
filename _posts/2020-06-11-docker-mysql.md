---
layout: post
title: 基于docker安装mysql数据库
categories: docker mysql
---

介绍如何使用docker快速安装mysql

## 1.下载镜像

    docker pull mysql

## 2.创建容器并运行

    docker run -p 3306:3306 --name mymysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql

- -p 3306:3306：将容器的 3306 端口映射到主机的 3306 端口。

- -v -v $PWD/conf:/etc/mysql/conf.d：将主机当前目录下的 conf/my.cnf 挂载到容器的 /etc/mysql/my.cnf。

- -v $PWD/logs:/logs：将主机当前目录下的 logs 目录挂载到容器的 /logs。

- -v $PWD/data:/var/lib/mysql ：将主机当前目录下的data目录挂载到容器的 /var/lib/mysql 。

- -e MYSQL_ROOT_PASSWORD=123456：初始化 root 用户的密码。

## 3.安装图形化界面Navicat

### 3.1下载安装程序

链接：[https://pan.baidu.com/s/1acS37wGIFAHEaZlwOFqZMQ](https://pan.baidu.com/s/1acS37wGIFAHEaZlwOFqZMQ)
提取码：kxeg

### 3.2安装
- 1.解压缩nacicat premium 12.1.11，包括了32位和64位安装包，用户根据操作系统位数进行选择，双击进行安装，点击”下一步“

![1]({{ site.url }}/assets/images/mysql-install1.jpg)

- 2.看到如图所示，就代表安装成功了，点击”完成“

![2]({{ site.url }}/assets/images/mysql-install2.jpg)

## 4.破解

ps：先不要打开navicat premium 12，关闭、关闭、关闭，重要的事情说三遍

- 1.解压缩注册机安装包（解压密码：www.downcc.com），右键选择“以管理员身份运行”

![3]({{ site.url }}/assets/images/mysql-install3.jpg)

- 2.确认Backip、Host和Navicat v12都勾选了（如下图），点击“Patch”

![4]({{ site.url }}/assets/images/mysql-install4.jpg)

- 3.自动会有一个“navicat.exe - x64 -> Cracked！.”的弹窗提示，点击“确定”

![5]({{ site.url }}/assets/images/mysql-install5.jpg)

如果说没有自动弹出，需要选择文件的话，找到Navicat Premium 12安装路径下的navicat.exe，选中并点击打开，就会有上图的提示。

![6]({{ site.url }}/assets/images/mysql-install6.jpg)

- 4.勾选如下

![7]({{ site.url }}/assets/images/mysql-install7.jpg)

Your Name和Your Organization可以任意填写或者默认（这里小编填的是downcc）；
然后点击Generate，将自动生成Serial Keygen（即注册码），复制下来；
【重要：请不要关闭注册机，始终保持运行状态，后面还要用到的，直至破解完成。】

- 5.打开navicat premium 12，会有一个试用的提示，点击“注册”按钮（也可以进入主界面后，点击菜单栏的“帮助”，选择“注册”）

![8]({{ site.url }}/assets/images/mysql-install8.jpg)

- 6.将注册机中生成的注册码复制到软件注册界面去，点击“激活”按钮

![9]({{ site.url }}/assets/images/mysql-install9.jpg)

- 7.会提示激活服务器暂时不可使用，这个时候点击“手动激活”，会生成一个“请求码”

![10]({{ site.url }}/assets/images/mysql-install10.jpg)

- 8.将上图的请求码复制到注册机的“Activation Code”框中，然后点击“Generat”按钮，“Activation Code”处就会生成一串激活码

![11]({{ site.url }}/assets/images/mysql-install11.jpg)

- 9.将生成的激活码复制到软件界面去，点击“激活”按钮

![12]({{ site.url }}/assets/images/mysql-install12.jpg)

- 10.看到提示Navicat 现已激活，就代表破解成功了，并且是永久许可证

![13]({{ site.url }}/assets/images/mysql-install13.jpg)

<div id="gitalk-container-docker-mysql"></div>

<script>
  $(document).ready(function() {
    window.initDockerMysqlComment();
  })
</script>