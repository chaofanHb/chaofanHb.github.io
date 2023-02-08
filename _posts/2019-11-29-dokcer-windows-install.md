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

双击桌面的Kitematic (Alpha)应用创建虚拟机


### 3.1初始化 docker

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

### 3.2配置阿里云镜像加速器
镜像配置在/etc/docker/daemon.json(可通过挂载目录传输进去),新建daemon.json

    {
  
        "registry-mirrors": ["https://fc1fnm21111z.mirror.aliyuncs.com"]

    }

镜像配置好了
![图片15]({{ site.url }}/assets/images/docker-install14.png)

镜像地址参考: [阿里云 docker hub](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)
执行下面两个命令

    docker ps #查看镜像
    docekr version #查看版本

## 4.优化docker存储占用c盘问题

这个问题主要是由于虚拟硬盘默认安装在C盘下导致的，因此需要在windows下移动 Oracle VM VirtualBox的虚拟硬盘，步骤如下：

- 1.默认虚拟盘在C:\Users\A\.docker\machine\machines\default\disk.vmdk

- 2.备份所有C:\Users\A\.docker的文件到D盘

- 3.启动Oracle VM VirtualBox在设置-存储删除存储介质下面的控制器（此操作会删除c盘虚拟机的存储文件，配置文件还在，.docker最好不要删除）

- 4.在Oracle VM VirtualBox的安装目录下执行：C:\Program Files\Oracle\VirtualBox>vboxmanage internalcommands sethduuid "D:\Users\A\.docker\machine\machines\default\disk.vmdk"，此举是修改disk.vmdk的UUID以免冲突

- 5.启动Oracle VM VirtualBox在设置-存储增加新的控件器，分别添加新虚拟光驱和虚拟硬盘，且分别指向备份到D盘下的ISO和vmdk文件


- 6.启动Oracle VM VirtualBox在管理-虚拟介质管理器里可以对原来C盘下的虚拟光驱和虚拟硬盘进行删除，这样可以节省C盘的磁盘空间

- 7.修改D:\.docker\machine\machines\default\config.json里的路径,重新启动docker一切OK

## 5.Kitematic  github下载

[Kitematic下载地址](https://github.com/docker/kitematic/releases)


<div id="gitalk-container-docker-windows-install"></div>

<script>
  $(document).ready(function() {
    window.initDockerWindowsInstallComment();
  })
</script>






