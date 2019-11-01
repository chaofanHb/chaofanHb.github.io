---
layout: post
title: 【搬运】Java虚拟机知识点【参数】
categories: JVM java
---

Java虚拟机知识点【参数】

## 常见虚拟机参数

示例

    -server -Xms1024m -Xmx1024m -XX:NewSize=256m -XX:MaxNewSize=512m -XX:+PrintGCDetails -Xloggc:/logs/gc.$$.log

指的是，以 Server模式启动，初始堆1024m，最大堆1024m，初始新生代256m，最大新生代512m，打印详细的GC日志，并输出到gc.$$.log。

-client
  客户端模式。
-server
  服务端模式，Java8 64位默认这个模式。
-Dproperty=value
  设置系统属性值。
-jar filename
  执行JAR程序。
-version
  显示版本信息
-Xloggc:
  将 GC 状态记录在文件中 (带时间戳)，-Xloggc选项将覆盖-verbose:gc
-Xmnsize
  设置年轻代堆的初始和最大值。
  可以替换使用-XX:NewSize设置初始值，-XX:MaxNewSize设置最大值。一般建议设置为堆大小的一半到四分之一之间。
-Xms
  初始 Java 堆大小。该值必须是1024的倍数并且大于1 MB。
  如果不设置此选项，则初始大小将被设置为老年代和年轻代的大小总和。
-Xmx
  最大 Java 堆大小。该值必须是1024的倍数并且大于2 MB。
  默认值是在运行时根据系统配置选择的。对于服务器部署，-Xms和-Xmx通常设置为相同的值。
-Xss
  Java 线程堆栈大小。默认值取决于平台：

    Linux/ARM (32-bit): 320 KB
    Linux/i386 (32-bit): 320 KB
    Linux/x64 (64-bit): 1024 KB
    OS X (64-bit): 1024 KB
    Oracle Solaris/i386 (32-bit): 320 KB
    Oracle Solaris/x64 (64-bit): 1024 KB

-XX:ErrorFile=filename
  指定发生不可恢复错误时错误日志的路径。
-XX:MaxDirectMemorySize=size
  设置NIO直接缓冲区分配的最大值。
-XX:+HeapDumpOnOutOfMemory
  发生OutOfMemoryError异常时，生成dump文件。可以使用-XX:HeapDumpPath指定堆转储文件的路径和名称。
-XX:LogFile=路径
  设置写入日志数据的路径和文件名。
-XX:NewRatio=比率
  年轻代和老年代的比例。
-XX:+PrintGC
  GC时打印消息。
-XX:+PrintGCDetails
  GC时打印详细的消息。
-XX:+UseConcMarkSweepGC
  为老年代启用CMS垃圾收集器。
-XX:+UseG1GC
  启用G1收集器。
-XX:+UseParallelGC
  启用并行扫描垃圾收集器
-XX:+UseParallelOldGC
  启用老年代的并行扫描垃圾收集器
-XX:+UseParNewGC
  启用新生代的并行扫描垃圾收集器

参考资料：[https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)

<div id="gitalk-container-jvm-e"></div>

<script>
  $(document).ready(function() {
    window.initJVMEComment();
  })
</script>