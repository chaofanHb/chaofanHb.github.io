---
layout: post
title: windows安装docker环境
categories: docker
---

在windows上安装docker环境（Oracle VM VirtualBox + boot2docker ）

## 1.下载 docker 工具 docker ToolBox

[阿里云下载](http://mirrors.aliyun.com/docker-toolbox/windows/docker-toolbox/)

![图片1]({{ site.url }}/assets/images/docker-down.png)

## 2.安装 docker ToolBox

采用管理员方式安装

![图片2]({{ site.url }}/assets/images/docker-install1.png)

然后下一步，选择安装路径

![图片3]({{ site.url }}/assets/images/docker-install2.png)

然后下一步，如果安装了 git 的话，把 git 去掉

![图片4]({{ site.url }}/assets/images/docker-install3.png)

下一步

![图片5]({{ site.url }}/assets/images/docker-install4.png)

下一步

![图片6]({{ site.url }}/assets/images/docker-install5.png)

安装

![图片7]({{ site.url }}/assets/images/docker-install6.png)

完成

![图片8]({{ site.url }}/assets/images/docker-install7.png)

桌面上会多这么几个东西

![图片9]({{ site.url }}/assets/images/docker-install8.png)

## 3.初始化 docker 并配置阿里云镜像

### 3.1创建虚拟机并配置镜像仓库

进入到 docker toolbox 安装目录下,执行下面命令

    //<your accelerate address>为你的阿里云镜像加速器地址
    docker-machine create --engine-registry-mirror=<your accelerate address> -d virtualbox default

安装成功

![图片10]({{ site.url }}/assets/images/docker-install9.png)

### 3.2初始化 docker

通过 Docker 客户端访问 Docker 服务
以管理员方式打开 Docker Quickstart Terminal
提示去找 bash.exe

![图片11]({{ site.url }}/assets/images/docker-install10.png)

bash.exe 这个位于 /git/bin/ 目录下，选中就行了

![图片12]({{ site.url }}/assets/images/docker-install11.png)

进来是这个样子滴，默认的 ip 是 192.168.99.100

![图片13]({{ site.url }}/assets/images/docker-install12.png)

接着要配置一下

    docker-machine env default

![图片14]({{ site.url }}/assets/images/docker-install13.png)

执行

    eval "$(docker-machine env default)"
    docker info

镜像配置好了
![图片15]({{ site.url }}/assets/images/docker-install14.png)

镜像地址参考: [阿里云 docker hub](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)
执行下面两个命令

    docker ps #查看镜像
    docekr version #查看版本


<div id="gitalk-container-docker-windows-install"></div>

<script>
  $(document).ready(function() {
    window.initDockerWindowsInstallComment();
  })
</script>






