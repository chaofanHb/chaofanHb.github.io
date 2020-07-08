---
layout: post
title: seata初体验（springboot+mybatis+seata测试案例）
categories: springboot seata
---

Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

[seata-samples源码](https://github.com/seata/seata-samples)
[TC下载（seata-server-1.0.0）]({{ site.url }}/assets/files/seata-server-1.0.0.zip)
[TM,RM下载（/seata-samples/springboot-mybatis-2020-01-15）]({{ site.url }}/assets/files/springboot-mybatis.zip)


## 1.部署mysql数据库

    docker pull mysql

初始密码123456，将数据目录挂载到外部

    docker run -p 3306:3306 --name mymysql -v /dockerOPT/mysql/conf:/etc/mysql/conf.d -v /dockerOPT/mysql/logs:/logs -v /dockerOPT/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql

### 1.1创建TC数据库seata

[sql文件]({{ site.url }}/assets/files/seata-server-sql.zip)

### 1.2创建TM，RM在业务端的数据库

执行/seata-samples/springboot-mybatis/sql/all_in_one.sql

## 2.部署 Seata Server

    docker pull seataio/seata-server

使用自定义配置文件

    docker run -d --name seata-server -p 8091:8091 -e SEATA_CONFIG_NAME=file:/root/seata-config/registry -v /dockerOPT/seata/conf:/root/seata-config  seataio/seata-server


## 3.启动springboot-mybatis下的四个微服务

使用eclipse导入springboot-mybatis项目，反键springboot-mybatis打包项目，依次启动四个jar包（sbm-business-service，sbm-account-service，sbm-order-service， sbm-storage-service），出现如下信息则表示启动成功

![启动成功]({{ site.url }}/assets/images/seata-demo-started.png)

模拟回滚：http://localhost:8084/api/business/purchase/rollback
模拟提交：http://localhost:8084/api/business/purchase/commit

<div id="gitalk-container-springboot-seata-demo"></div>

<script>
  $(document).ready(function() {
    window.initSpringbootSeataDemoComment();
  })
</script>