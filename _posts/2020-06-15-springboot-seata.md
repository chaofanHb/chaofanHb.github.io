---
layout: post
title: seata的设计原理（原fescar）
categories: springboot seata
---

看完seata官网介绍后整理的理解笔记


TM 请求 TC 开启一个全局事务。TC 会生成一个 XID 作为该全局事务的编号。

XID，会在微服务的调用链路中传播，保证将多个微服务的子事务关联在一起。

RM 请求 TC 将本地事务注册为全局事务的分支事务，通过全局事务的 XID 进行关联。

TM 请求 TC 告诉 XID 对应的全局事务是进行提交还是回滚。

TC 驱动 RM 们将 XID 对应的自己的本地事务进行提交还是回滚。