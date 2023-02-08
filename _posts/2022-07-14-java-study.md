---
layout: post
title: 开发环境热部署Jrebel
categories: study 
---

热部署就是正在运行状态的应用，修改了他的源码之后，在不重新启动的情况下能够自动把增量内容编译并部署到服务器上，修改代码后不需要重启应用就能看到效果，大大提升开发效率。

## 1.安装插件

- 1.通过eclipse的下载jrebel插件
- 2.[jrebel离线插件]({{ site.url }}/assets/files/plugins.zip)
    下载后解压到eclipse的plugins文件夹里

## 2.激活jrebel

- 1.[github开源破解程序](https://github.com/ilanyu/ReverseProxy/releases/tag/v1.4)
- 2.激活服务搭建
    a.下载镜像
    ![图片1]({{ site.url }}/assets/images/jrebel1.png)
    b.添加端口映射
    ![图片2]({{ site.url }}/assets/images/jrebel2.png)
    c.使用license激活
    ![图片3]({{ site.url }}/assets/images/jrebel3.png)
    关闭tomcat的自动部署,勾选要热部署的项目
    ![图片4]({{ site.url }}/assets/images/jrebel4.png)
    ![图片5]({{ site.url }}/assets/images/jrebel5.png)

- 3.OverView功能面板中打开Work offline

JRebel默认是联网使用得，一旦无网就启动不起来，但是可以通过修改配置来进行离线启动，只需要点击点击 OverView 功能面板中的，如下图：

![图片6]({{ site.url }}/assets/images/jrebel6.png)

![图片7]({{ site.url }}/assets/images/jrebel7.png)