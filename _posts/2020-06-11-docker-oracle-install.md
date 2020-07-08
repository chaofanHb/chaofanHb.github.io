---
layout: post
title: 基于docker安装oracle数据库
categories: docker oracle
---

介绍如何使用docker快速安装oracle 11g

## 1.官网下载oracle11g的安装包

[下载地址](https://www.linuxidc.com/Linux/2012-04/59064.htm)

## 2.docker镜像拉取以及启动

	docker pull jaspeen/oracle-11g
    REPOSITORY                     TAG                 IMAGE ID            CREATED             SIZE
    docker.io/jaspeen/oracle-11g   latest              0c8711fe4f0f        4 years ago         281 MB

### 2.1创建宿主机 oracle 安装目录以及数据目录

    mkdir -p /server/oracle
    mkdir -p /server/dpdump

将两个压缩包解压到/server/oracle下

### 2.2启动docker

    docker run -d --privileged -p 1521:1521 -v /server/oracle:/install -v /server/dpdump:/opt/oracle/dpdump --name=oracle11g jaspeen/oracle-11g

启动命令解析：

- -d ：后台运行容器，并返回容器ID；

- --privieged：开启特权模式；

- -p：宿主机与 docker 的端口映射；

- -v：绑定一个数据卷；

- --name：起一个容器名；

启动后安装需要15分钟左右，等日志出现100% complete表示安装完成。

启动后查看容器运行状况

    [root@centos7 oracle]# docker ps 
    CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                              NAMES
    c5e913b4e96b        jaspeen/oracle-11g   "/assets/entrypoin..."   3 days ago          Up 3 seconds        0.0.0.0:1521->1521/tcp, 8080/tcp   oracle11g

## 3.保存安装好后的镜像

启动 docker 后，需要创建一个自己的镜像以备使用

    [root@centos7 oracle]# docker commit oracle11g oracle11g-installed
    [root@centos7 oracle]# docker images
    REPOSITORY                     TAG                 IMAGE ID            CREATED             SIZE
    oracle11g-installed            latest              4a55732efad1        3 days ago          2.83 GB
    docker.io/jaspeen/oracle-11g   latest              0c8711fe4f0f        4 years ago         281 MB

进入 docker 容器内查看

    [root@centos7 oracle]# docker exec -it c5e913b4e96b bash
    [root@c5e913b4e96b /]# 
    [root@centos7 oracle]# docker exec -it oracle11g bash
    [root@c5e913b4e96b /]# 

保存制作好的镜像到本地储存

    docker save -o ./oracle11g_installed.tar oracle11g-installed

## 4.数据库连接
    数据库管理员：system/oracle
    sid：orcl


<div id="gitalk-container-docker-oracle-install"></div>

<script>
  $(document).ready(function() {
    window.initDockerOracleInstallComment();
  })
</script>