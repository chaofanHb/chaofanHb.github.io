---
layout: post
title: maven统一指定spring包版本
categories: Spring maven
---

刚查看了Spring的官网，发现一个统一配置Spring的方法，记录下来

## 统一指定spring包版本
- [Maven](http://mvnrepository.com) - 确保你的所有Spring会使用同一个版本,以后增加Spring模块的时候就不需要再指定版本了.
{% highlight css %}
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-framework-bom</artifactId>
            <version>5.0.0.BUILD-SNAPSHOT</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
    </dependency>
<dependencies>
{% endhighlight %}

## 指定spring内置日志
在Spring中强制使用的日志是Jakarta Commons Logging API (JCL)，其他模块则是在编译时依赖.

- [Slf4j](https://www.jianshu.com/p/805a754053cf) - slf4j是一个好的日志门面框架，比commons-logging性能要高。并且是在编译时绑定。
{% highlight css %}
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.0.0.BUILD-SNAPSHOT</version>
        <exclusions>
            <exclusion>
                <groupId>commons-logging</groupId>
                <artifactId>commons-logging</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>jcl-over-slf4j</artifactId>
        <version>1.5.8</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>1.5.8</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.5.8</version>
    </dependency>
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.14</version>
    </dependency>
</dependencies>
{% endhighlight %}

- [log4j](http://x-stream.github.io/index.html) -  如果你就想使用log4j，也不需要上面那么复杂的依赖，可以简单的使用如下例子即可
{% highlight css %}
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.0.0.BUILD-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.14</version>
    </dependency>
</dependencies>
{% endhighlight %}

<div id="gitalk-container-maven-version"></div>

<script>
  $(document).ready(function() {
    window.initMavenVersionComment();
  })
</script>