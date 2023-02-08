---
layout: post
title: Bookmarks
subtitle: <span class="mega-octicon octicon-repo"></span>&nbsp;&nbsp; To mark useful libs - tools - books
menu: Bookmark
---

## 开源镜像网站
	[eclipse1](http://mirrors.neusoft.edu.cn/eclipse/technology/epp/downloads/release)
	[eclipse2](https://mirrors.tuna.tsinghua.edu.cn/eclipse/technology/epp/downloads/release)
	[JDK](https://blog.lupf.cn/articles/2022/02/19/1645282073635.html)

## SpringBoot创建

[https://start.spring.io](https://start.spring.io)

## Spring
　　Spring大约分为20个模块，这些模块分为核心容器、数据访问/集成、Web、AOP、Instrumentation、消息和测试，如下图所示：
![spring模块图]({{ site.url }}/assets/images/spring-module.png)

## Maven
- 使用maven下载jar包，经常会遇到下载失败的情况,如果失败的jar包过多,或是不清楚到底有那些jar包在下载过程中出现了问题.可通过maven命令重新批量下载未成功的jar包.

        mvn clean install -U 

## jdk
- 生成密钥

		keytool -genkey -alias cas -keyalg RSA -keysize 2048 -keypass changeit -storepass changeit -keystore casexample.keystore -dname "CN=cas.example.org,OU=casexample.com,O=casexample,L=casexample,ST=casexample,C=CN" -deststoretype pkcs12

- 导出公钥

		keytool -export -keystore d:\zlex.keystore -alias www.zlex.org -file d:\zlex.cer -rfc

- 导入公钥

		keytool -import -v -trustcacerts -alias taobao -file taobao.cer -storepass changeit -keystore %JAVA_HOME%/jre/lib/security/cacerts

- 查看密钥

		keytool -list -v -keystore d:\zlex.keystore -storepass changeit
		keytool -list -v -alias cas -keystore %JAVA_HOME%/jre/lib/security/cacerts -storepass changeit

## URL传参问题

- 原因分析：参数在传递过程中经历的几次编码和解码标准不同，导致加号、空格等字符的错误websites
- 解决方案：将post请求的参数中 ，含有+号的，统统采用%2B 去替换，这是URL的协议问题。

例如：
okhttp3（3.8.0版本）

	String str ="a=123456&b=gjv++23";
	str.replaceAll("\\+", "%2B")  //将+号替换成%2B
	RequestBody body = RequestBody.create(FORM, str);

## Fiddler在java中抓包

下载[Fiddler](https://www.telerik.com/download/fiddler)
- okhttp抓包：

	System.setProperty("http.proxySet", "true");
	System.setProperty("http.proxyHost", "127.0.0.1");
	System.setProperty("http.proxyPort", "8888");

- HttpClient抓包：

	HttpHost proxy = new HttpHost("127.0.0.1", 8888);
	RequestConfig requestConfig = RequestConfig.custom().setProxy(proxy).build();
	HttpClient httpclient = HttpClients.custom().setDefaultRequestConfig(requestConfig).build();

## 中文排序

	Comparator<Object> CHINA_COMPARE = Collator.getInstance(java.util.Locale.CHINA);

## springboot监控器Actuator
	//依赖
	<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
		<version>2.1.3.RELEASE</version>
        <optional>true</optional>
    </dependency>
	//配置文件加入
	management.endpoints.web.exposure.include=*

访问：http://localhost:8082/actuator

## JRE/JDK/JVM是什么关系

JRE(JavaRuntimeEnvironment，Java运行环境)，也就是Java平台。所有的Java 程序都要在JRE下才能运行。普通用户只需要运行已开发好的java程序，安装JRE即可。

JDK(Java Development Kit)是程序开发者用来来编译、调试java程序用的开发工具包。JDK的工具也是Java程序，也需要JRE才能运行。为了保持JDK的独立性和完整性，在JDK的安装过程中，JRE也是 安装的一部分。所以，在JDK的安装目录下有一个名为jre的目录，用于存放JRE文件。

JVM(JavaVirtualMachine，Java虚拟机)是JRE的一部分。它是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。JVM有自己完善的硬件架构，如处理器、堆栈、寄存器等，还具有相应的指令系统。Java语言最重要的特点就是跨平台运行。使用JVM就是为了支持与操作系统无关，实现跨平台。

## oracle字符串形式的时间比较

可以直接使用大于等于号比较

