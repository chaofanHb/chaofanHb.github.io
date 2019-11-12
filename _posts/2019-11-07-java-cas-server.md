---
layout: post
title: 搭建HTTPS的SSO SERVER端
categories: cas java
---

springboot实现CAS的server服务器端的搭建，并实现链接mysql数据库，自定义加密算法

## 1.下载源码

下载github项目[cas-overlay-template-5.3](https://github.com/apereo/cas-overlay-template)

![图片1]({{ site.url }}/assets/images/cas-server1.png)

（此处注意，一定要选择5.3版本的源码。超过5.3版本的cas取消了pom，使用gradle打包，暂时对gradle不是很熟练）

下载完后进入文件夹内执行命令

    mvn package

文件夹内没啥代码，全靠拉取远程jar合并成一个war包。
然后耐心等待。。。。（两个小时后）

命令执行完文件夹下会生成一个target文件夹

![图片2]({{ site.url }}/assets/images/cas-server2.png)

将生成的cas.war放入到tomcat的webapps下运行即可

![图片3]({{ site.url }}/assets/images/cas-server3.png)

默认用户密码：casuser/Mellon

## 将cas项目连接mysql，并实现自定义加密

重点来啦，就是如何将mysql连接进去.

首先需要将cas.war解析成新项目，我使用的是eclipse，打开import

![图片4]({{ site.url }}/assets/images/cas-server4.png)

导入后会在工作空间生成cas项目，找到application.properties，将默认的密码注销掉

    #cas.authn.accept.users=casuser::Mellon

添加mysql的配置

    #Query Database Authentication 数据库查询校验用户名开始
    #查询账号密码sql，必须包含密码字段
    cas.authn.jdbc.query[0].sql=select password from sys_user where username=?
    #指定上面的sql查询字段名（必须）
    cas.authn.jdbc.query[0].fieldPassword=password
    #指定过期字段，1为过期，若过期不可用（可选）
    #cas.authn.jdbc.query[0].fieldExpired=expired
    #为不可用字段段，1为不可用，需要修改密码（可选）
    #cas.authn.jdbc.query[0].fieldDisabled=disabled
    #数据库方言hibernate的
    #cas.authn.jdbc.query[0].dialect=org.hibernate.dialect.MySQLDialect
    #数据库驱动
    cas.authn.jdbc.query[0].driverClass=com.mysql.jdbc.Driver
    #数据库连接
    cas.authn.jdbc.query[0].url=jdbc:mysql://localhost:3306/cas?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF-8&useSSL=false
    #数据库用户名
    cas.authn.jdbc.query[0].user=root
    #数据库密码
    cas.authn.jdbc.query[0].password=123456
    #默认加密策略，通过encodingAlgorithm来指定算法，默认NONE不加密
    cas.authn.jdbc.query[0].passwordEncoder.type=com.hb.ucas.CustomPasswordEncoder
    cas.authn.jdbc.query[0].passwordEncoder.characterEncoding=UTF-8
    cas.authn.jdbc.query[0].passwordEncoder.encodingAlgorithm=MD5
    #Query Database Authentication 数据库查询校验用户名结束

新建CustomPasswordEncoder校验

![图片5]({{ site.url }}/assets/images/cas-server5.png)

CustomPasswordEncoder源码：

    package com.hb.ucas;

    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.util.DigestUtils;

    public class CustomPasswordEncoder implements PasswordEncoder {
        private static Logger log = LoggerFactory.getLogger(CustomPasswordEncoder.class);

        @Override
        public String encode(CharSequence arg0) {
            try {
                return DigestUtils.md5DigestAsHex(arg0.toString().getBytes());
            } catch (Exception e) {
                return null;
            }
        }

        @Override
        public boolean matches(CharSequence inputPwd, String dbPwd) {
            //通过md5加密后的密码
            String pass = null;
            // 判断密码是否存在
            if (inputPwd == null || (pass = this.encode(inputPwd)) == null) {
                return false;
            }
            //比较密码是否相等的问题
            return pass.equals(dbPwd);
        }

    }

最后需要添加相关依赖包（[搜索下载](https://mvnrepository.com)）

- cas-server-support-jdbc-5.3.14.jar
- cas-server-support-jdbc-authentication-5.3.14.jar
- cas-server-support-jdbc-drivers-5.3.14.jar

点击项目反键export导出成新的cas.war,放入tomcat运行即可。

## 实现https协议

科普下HTTPS，网站有HTTP和HTTPS两种协议。HTTP是浏览器到网站之间是明文传输，比如你输入帐号名和密码点击登录，那帐号名和密码在中间传输过程中有泄漏的风险。HTTPS是浏览器和网站之间加密传输，使用的非对称加密方式，所以非常安全。目前各大网站的登录基本都是用了HTTPS服务。

### 设置域名

SSL证书是基于域名的，如果您有自己的域名，请将域名指向到您的测试服务器。如果您没有自己的域名，那自己模拟个域名吧，暂且使用 cas.example.com 。在测试的电脑上，设置hosts将该域名指向到当前服务器。具体设置方式如下：

打开文件C:\Windows\System32\drivers\etc\hosts添加如下行

    127.0.0.1    cas.example.com

### 生成SSL证书

如果是正式对外的话，需要购买正式的SSL证书，阿里云和腾讯云都有。本文只是用于测试，只需要本地生成个SSL证书即可。购买的证书和自己生成证书的差别么，其一没那么的安全，其二浏览器不识别，访问时会有安全警告。

本地生成证书的命令是

    keytool -genkey -alias cas -keyalg RSA -keysize 2048 -keypass changeit -storepass changeit -keystore casexample.keystore -dname "CN=http://cas.example.org/,OU=casexample.com,O=casexample,L=casexample,ST=casexample,C=CN" -deststoretype pkcs12

![图片6]({{ site.url }}/assets/images/cas-server6.jpg)

### Tomcat开启HTTPS服务，导入证书

Tomcat默认情况下是打开HTTP服务的，HTTPS的服务是需要手动开发的，具体打开步骤如下：
打开文件apache-tomcat-8.5.31\conf\server.xml，增加如下配置

    <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
    maxThreads="150" SSLEnabled="true">
    　　<SSLHostConfig>
    　　　　<Certificate certificateKeystoreFile="D:/casoverlay/casexample.keystore"
    　　　　　　certificateKeystorePassword="changeit"
    　　　　　　type="RSA" />
    　　</SSLHostConfig>
    </Connector>

启动tomcat。

