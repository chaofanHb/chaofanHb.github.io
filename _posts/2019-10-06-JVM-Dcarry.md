---
layout: post
title: 【搬运】Java虚拟机知识点【工具】
categories: JVM java
---

Java虚拟机知识点【工具】

## 命令行工具

1. jps
JVM Process Status Tool，显示虚拟机进程。

用法：jps [-q] [-mlvV]

参数说明

    -q：打印进程号
    -l：打印启动类的全限定名
    -m：打印启动类的 main 方法入参
    -v：打印指定的虚拟机参数
    -V：打印类名

例子：jps、jps -l

### 2、jstat
JVM statistics Monitoring，对Java虚拟机内存进行监控统计。

用法：jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]

参数说明

    option：操作，常用的就是gcutil，统计垃圾回收情况。
    -t：显示时间戳列
    -h：指定多少行显示标题
    -vmid：进程ID
    -interval：每行输出的时间间隔
    -count：指定输出行数

例子：jstat -gcutil -h2 -t 15754 100 5，表示监控进程号15754的垃圾收集统计值，每隔100ms输出一行，总共输出5次，每输出2次需要重新输出标题。

    [root@root ~]# jstat -gcutil -h2 -t 15754 100 5
    Timestamp         S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT   
        11296830.0   0.00 100.00  21.80  25.80  98.41  96.33 113648 2500.825     0    0.000 2500.825
        11296830.2   0.00 100.00  21.80  25.80  98.41  96.33 113648 2500.825     0    0.000 2500.825
    Timestamp         S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT   
        11296830.3   0.00 100.00  21.80  25.80  98.41  96.33 113648 2500.825     0    0.000 2500.825
        11296830.4   0.00 100.00  21.80  25.80  98.41  96.33 113648 2500.825     0    0.000 2500.825
    Timestamp         S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT   
        11296830.5   0.00 100.00  21.80  25.80  98.41  96.33 113648 2500.825     0    0.000 2500.825

输出的指标说明

S0：survivor 0 已用空间占比
S1：survivor 1 已用空间占比
E：Eden 区已用空间占比
O：老年代已用空间占比
M：元数据已用空间占比
CCS：压缩类空间占比
YGC：Mirror GC 次数
YGCT：Mirror GC 消耗时间
FGC：Full GC 次数
FGCT：Full GC 消耗时间
GCT：垃圾回收消耗总时间

### 3. jinfo

JVM Configuration info，可以实时查看和实时修改虚拟机参数。

用法：jinfo [option] <pid>

参数说明

option：操作

    -flag 打印指定的VM参数的值
    -flag [+|-] 启用或禁用指定的VM参数
    -flag = 修改VM参数
    -flags 打印VM参数
    -sysprops 打印Java系统配置

pid：进程ID

例子：jinfo 15754、jinfo -flags 15754

### 4. jmap

JVM Memory Map，用来生成堆栈dump文件。

用法：jmap [option] <pid>

参数说明

option：操作

    heap：打印Java堆摘要
    histo[:live]：打印java对象堆的直方图; 如果指定了“live”选项，则仅计算实时对象
    dump：生成dump快照

pid：进程ID

例子：jmap -heap 15754、jmap -histo:live 15754、jmap -dump:live,file=.\heap_dump.hprof 15754

### 5. jstack

用来生成Java虚拟机当前时刻的线程快照，方便定位线程长时间停顿的问题，比如死锁、死循环、长时间等待等。

用法：jstack -F [-m] [-l] <pid>

参数说明

    -F：强制打印堆栈
    -m：同时打印Java和本地方法的堆栈
    -l：打印关于锁的附件信息
    pid：进程ID

例子：jstack -l 15754

### 6. jhat
JVM Heap Analysis Tool，用来分析jmap生成的堆栈日志，生成HTML文件。一般会用可视化工具来分析堆栈日志，比如MAT。

### 7. jcmd
JDK建议使用 jcmd 替代 jstack、jinfo、jmap 等命令。

例子

jcmd -l：列出所有Java虚拟机。
jcmd 15754 help：列出该虚拟机支持的命令。
jcmd 15754 PerfCounter.print：获取所有性能相关的数据。
jcmd 15754 GC.class_histogram

## 可视化监控工具

常用的工具

jconsole：JDK自带监控工具
jvisualvm：JDK自带监控工具，比jconsole显示更多监控数据
jmc：也是JDK自带监控工具，比jvisualvm显示更多监控数据
MAT：Memory Analyzer Tool，Java虚拟机内存分析工具，能够快速的分析dump日志。

参考资料：[https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)


<div id="gitalk-container-jvm-d"></div>

<script>
  $(document).ready(function() {
    window.initJVMDComment();
  })
</script>