---
layout: post
title: 【搬运】配置 IDEA 远程连接应用服务器
categories: JVM java
---

当调试 Web 应用时，经常需要使用 ide 远程连接，来进行 debug 调试。使用 Springboot 内置服务器和使用 Tomcat 服务器是常见的应用部署方式，可以用不同的配置方式来启动远程 debug 模式。

## Springboot 应用

### 1. 配置启动参数
运行jar时加上debug参数，例如

    java -jar -Xdebug -Xrunjdwp:transport=dt_socket,address=60222,suspend=n,server=y -jar 包名.jar。

### 2. 配置 IDEA
如图，在配置弹窗页面，点击左上角的+号添加调试配置页面，配置Host为远程服务器地址，Port为调试端口60222，并选择需要调试的模块，点击OK完成即可。

![jvm-info11]({{ site.url }}/assets/images/jvm-info11.png)

### 3. 启动 debug
点击 IDEA 的 debug 按钮启动。

![jvm-info12]({{ site.url }}/assets/images/jvm-info12.png)

等待控制台打印出如下信息时，表示已经启动成功，此时，访问远程服务器上的应用时，便可以被 IDEA 中的断点拦截到。

    Connected to the target VM, address: '192.168.94.23:60222', transport: 'socket'

## Tomcat 应用
### 1. 配置启动参数
在tomcat/bin下的catalina.sh上边添加下边的一段设置

    CATALINA_OPTS="-Xdebug -Xrunjdwp:transport=dt_socket,address=60222,suspend=n,server=y"

### 2. 配置 IDEA
如图，在配置弹窗页面，点击左上角的+号添加Tomcat Server，选择Remote。

![jvm-info13]({{ site.url }}/assets/images/jvm-info13.png)

配置Server参数。

![jvm-info14]({{ site.url }}/assets/images/jvm-info14.png)

配置Startup/Connection参数，点击OK完成即可。

![jvm-info15]({{ site.url }}/assets/images/jvm-info15.png)

### 3. 启动 debug
点击 IDEA 的 debug 按钮启动。

![jvm-info16]({{ site.url }}/assets/images/jvm-info16.png)

等待控制台打印出如下信息时，表示已经启动成功，此时，访问远程服务器上的应用时，便可以被 IDEA 中的断点拦截到。
Connected to the target VM, address: '192.168.94.23:60222', transport: 'socket'

如果启动debug失败，有可能是debug端口被占用，通过命令netstat -anp | grep 60222查看端口占用情况。

<div id="gitalk-container-jvm-c"></div>

<script>
  $(document).ready(function() {
    window.initJVMCComment();
  })
</script>
