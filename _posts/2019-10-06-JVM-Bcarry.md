---
layout: post
title: 【搬运】配置 jvisualvm 监控Java虚拟机
categories: JVM java
---

配置 jvisualvm 监控Java虚拟机

## 配置JMX远程连接

### 1. 配置启动参数

启动jar时，添加如下配置

    -Dcom.sun.management.jmxremote.port=5050 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Djava.rmi.server.hostname=192.168.94.23

启动参数说明

    -Dcom.sun.management.jmxremote.port：配置一个远程服务器上未被占用的端口
    -Dcom.sun.management.jmxremote.ssl=false：配置 JMX 是否启用 ssl
    -Dcom.sun.management.jmxremote.authenticate=false：配置 JXM 是否启动鉴权
    -Djava.rmi.server.hostname：配置服务器 IP

### 2. 配置 jvisualvm

添加远程主机信息，填写主机名，端口。端口就是上面启动参数中配置的端口。

![jvm-info8]({{ site.url }}/assets/images/jvm-info8.png)

添加 JXM 连接，点击确认。

![jvm-info9]({{ site.url }}/assets/images/jvm-info9.png)

添加成功后，便可以开始监控虚拟机了。

注意：JMX 不支持查看 visual GC，需要用 jstatd 来监控。

## 配置jstatd远程连接

### 1. 创建文件 jstatd.all.policy

    grant codebase "file:/usr/local/jdk1.8.0_161/lib/tools.jar" {  
    permission java.security.AllPermission;  
    }; 

### 2. 启动 jstatd

    jstatd -J-Djava.security.policy=jstatd.all.policy -J-Djava.rmi.server.hostname=192.168.94.23 -J-Djava.rmi.server.logCalls=true -J-Djava.net.preferIPv4Stack=true -p 5056

启动参数说明

    -J-Djava.security.policy=jstatd.all.policy 指jstatd.all.policy文件的定路径
    -J-Djava.rmi.server.logCalls=true：是否打印日志
    -J-Djava.rmi.server.hostname=192.168.19.114：配置服务器地址
    -p：指定端口

### 3. 配置 jvisualvm

选择远程服务器，右键添加 jstatd 连接，填写端口号，端口号为上面启动 jstatd 指定的端口。

![jvm-info10]({{ site.url }}/assets/images/jvm-info10.png)

添加成功后，在服务器列表会展示出服务器上所有的 Java 虚拟机应用。根据应用名称或者端口号选择需要监控的服务即可开始监控。此时发现 visual GC 页面已经可以查看了。

<div id="gitalk-container-jvm-b"></div>

<script>
  $(document).ready(function() {
    window.initJVMBComment();
  })
</script>