---
layout: post
title: 【搬运】Java虚拟机知识点【内存】
categories: JVM java
---

Java虚拟机知识点【内存】

## 运行时数据区

![jvm-info25]({{ site.url }}/assets/images/jvm-info25.png)

### 1.程序计数器（Program Counter）

  每个线程独占自己的程序计数器。如果当前执行的方式不是native的，那程序计数器保存JVM正在执行的字节码指令的地址，如果是native的，那程序计数器的值是undefined。
  此内存区域是唯一一个在Java虚拟机规范中没有规定任何OutOfMemoryError情况的区域。

### 2.Java虚拟机栈

  每个线程独占自己的Java虚拟机栈，这个栈与线程同时创建，用于存储栈帧。
  Java虚拟机栈所使用的内存不需要保证连续的。

- StackOverflowError：线程请求分配的栈容量超过Java虚拟机栈允许的最大容量。

- OutOfMemoryError：如果虚拟机栈可以动态扩展，在尝试扩展的时候无法申请到足够的内存，或者在创建新的线程时没有足够的内存去创建对应的虚拟机栈。

### 3.Java堆

  Java堆可供各个线程共享，是给对象分配内存的区域，也是需要自动回收垃圾的区域。
  堆的容量可以是固定的，也可以随着程序执行的需求动态扩展，并在不需要时自动收缩。Java堆所使用的内存不需要保证是连续的。

- OutOfMemoryError：实际所需的堆超过了自动内存管理系统能提供的最大容量。

### 4.方法区

  方法区可供各个线程共享。它存储每一个类的结构信息，例如：运行时常量池、字段和方法数据、构造函数和不同方法的字节码内容，还包括一些在类、实例、接口初始化时用到的特殊方法。
  方法区是Java堆的逻辑组成部分，虚拟机可以在这个区域不实现垃圾收集与压缩。JVM规范也不限定实现方法区的内存位置和编译代码的管理策略。
  方法区容量可以是固定的，也可以随着程序执行的需求动态扩展，并在不需要时自动收缩。方法区所使用的内存不需要保证是连续的。

- OutOfMemoryError：方法区的内存空间不能满足内存分配请求。

  关于永久代和元空间
  JDK 8引入了元空间的概念，它和JDK 8之前的永久代都是方法区的实现，区别是，永久代使用Java虚拟机内存，而元空间使用本地内存，将类的元数据移至元空间，而字符串和类静态变量移至Java堆。

  引入元空间的主要原因有两个

- 永久代内存容易发生内存泄露，即java.lang.OutOfMemoryError: PermGen

- 移除永久代可以促进HotSpot JVM与 JRockit VM的融合，因为JRockit没有永久代。

### 5.运行时常量池

  运行时常量池是class文件中每一个类或接口的常量池表的运行时表示形式。
  运行时常量池在方法区中分配，在加载类和接口到虚拟机后，就创建对应的运行时常量池。

- OutOfMemoryError：方法区的内存空间不能满足内存分配请求。

### 6.本地方法栈

  JVM用本地方法栈来支持native方法。如果需要支持native方法，这个栈与线程同时创建。

- StackOverflowError：线程请求分配的栈容量超过本地方法栈允许的最大容量。

- OutOfMemoryError：如果本地方法栈可以动态扩展，在尝试扩展的时候无法申请到足够的内存，或者在创建新的线程时没有足够的内存去创建对应的本地方法栈。

### 7.直接内存

  不是Java虚拟机规范定义的内存，不属于运行时数据区，JDK NIO中基于通道与缓冲的I/O方式，可以直接分配堆外内存。直接内存受本机总内存的限制。

- OutOfMemoryError：动态扩展导致总内存超过物理内存时。

## 分配内存的两种方式

### 1.指针碰撞：

内存是绝对规整的，用过的内存和空闲的内存分别放在堆的两边，中间放着一个指针作为分界点的指示器，分配内存就是指针往空闲区域移动与对象大小相等的距离。

### 2.空闲列表：

内存是不规整的，虚拟机维护一个列表，记录哪些内存是可以使用的，分配内存就是从列表中找到一块足够大的内存划分给对象实例。
选择哪种分配方式由Java堆内存是否规整来决定，而Java堆是否规整又由所用的垃圾收集器是否带有压缩整理功能决定。因此，Serial、ParNew等带压缩过程的收集器采用指针碰撞，而CMS这种基于Mark-Swap算法的收集器采用空闲列表。

 如何保障分配内存时的线程安全性？

1.使用CAS技术保证操作的原子性。
2.每个线程在堆中预先分配一小块内存称本地线程分配缓冲(TLAB)。哪个线程要分配内存，就在哪个线程的TLAB上分配。当TLAB用完，分配新的TLAB时加锁。

## 对象的内存布局和访问

  Java虚拟机在堆中给对象分配内存，对象在内存中的布局分为三块

对象头：存储了Mark Word、类型指针，如果是数组对象，还记录了数据长度。
实例数据：对象的真实数据。
对齐填充：由于对象大小必须是8字节的整数倍，所以需要占位符来对其填充。
 主流的对象访问方式

使用句柄访问：Java堆中划分一块内存作为句柄池，引用类型指向对象的句柄地址，句柄中包含对象实例数据与类型数据的地址。
使用直接指针访问：引用类型指向对象地址，堆中存储访问类型数据的信息。
  Hotspot虚拟机使用直接指针的方式来访问对象。节省了一次指针定位的时间开销。

如下图，展示了对象在内存的布局和访问方式。

![jvm-info26]({{ site.url }}/assets/images/jvm-info26.png)

参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》

<div id="gitalk-container-jvm-n"></div>

<script>
  $(document).ready(function() {
    window.initJVMNComment();
  })
</script>