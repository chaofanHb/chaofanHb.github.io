---
layout: post
title: 【搬运】Java虚拟机知识点【GC】
categories: JVM java
---

Java虚拟机知识点【GC】

## 一、垃圾收集算法
1.标记-清除算法
  首先标记出所有需要回收的对象，然后统一回收所有被标记的对象。该算法的效率不高，而且存在内存碎片的问题。

### 2.复制算法
  将内存按容量划分为大小相等的两块，每次只使用其中一块进行内存分配，当这块内存用完了，就将还存活的对象全部复制到另一块内存，然后把使用过的内存空间一次清理掉。该算法能解决标记清除算法的效率问题。但是因为需要将内存分一半，代价更高。

### 3.标记-整理算法
  标记出所有需要回收的对象，让存活的对象向一端移动，然后直接清理掉端边界以外的内存。该算法能解决标记清除算法的内存碎片问题，以及复制算法在对象存活率高时，进行多次复制的效率变低的问题。

### 4.分代收集算法
  新生代中，每次垃圾收集时都有大批对象死去，只有少量存活，此时就得使用复制算法，这样只要付出少量存活对象的复制成本就可以完成收集；
  老年代中，对象成活率高、没有额外空间对他进行分配担保，就得使用标记清理或标记整理算法；
  分代收集算法将堆空间划分为年轻代yang与老年代old，年轻代又被分为Eden区和Survivor区，Survivor区又被分为From区与To区。 默认按8:1划分Eden区和Survivor区。Eden区是连续的内存空间，因此在Eden区分配内存极快。HotSpot虚拟机使用指针碰撞和TLAB来加快Eden区的内存分配，并保障线程安全。

![jvm-info17]({{ site.url }}/assets/images/jvm-info17.png)

分代收集算法的执行流程
1.新建的对象优先分配在Eden区；
2.当Eden区满了，就会触发Minor GC，Eden中的存活对象被移动到Survivor0，Eden被清空；
3.等Eden区再满了，再次触发Minor GC，Eden和Survivor0中的存活对象又会被复制到Survivor1，S0和Eden被清空，然后下一轮S0与S1交换角色，如此循环往复。
4.当两个Survivor区切换了几次（HotSpot虚拟机默认15次）之后，仍然存活的对象，将被复制到老年代。

    Minor GC：发生在新生代的GC，因为Java对象都具备朝生夕灭的特性，所以Minor GC非常频繁，一般回收速度也比较快。
    Major GC/Full GC：发生在老年代年的GC，出现Full GC经常伴随至少一次的Minor GC（非绝对，如Parallel Scavenge）。Full GC的速度一般会比Minor GC慢10倍以上，所以要合理设置年轻代与老年代的大小，尽量减少Full GC的操作。

Minor GC的触发条件：

- 当Eden区满时触发。

Full GC的触发条件：

- 调用System.gc时，系统会建议执行Full GC，但是不一定执行。

- 老年代空间不足时触发。 

- 方法区（永久代/元空间）空间不足时触发。 

- 通过Minor GC后进入老年代的平均大小大于老年代的可用连续内存时触发。 

- 由Eden区、From Space区向To Space区复制时，对象大小大于To Space可用内存，则把该对象转存到老年代，且老年代的可用连续内存小于该对象大小时触发。

## 二、内存分配和回收策略

- 对象优先在Eden区分配

  当Eden区没有足够的内存空间进行分配时，虚拟机将发起
一次Minor GC。

- 大对象直接进入老年代

  大量连续内存的Java对象，比如很长的字符串以及数组，会被直接分配到老年代，因此写程序时应该尽量避免。

- 长期存活的对象将进入老年代

  当两个Survivor区切换了几次（HotSpot虚拟机默认15次）之后，仍然存活的对象，将被复制到老年代。

- 动态对象年龄判定

  如果S0空间中相同年龄所有对象大小的总和大于S0空间的一半，年龄大于或等于该年龄的对象就可以直接进入老年代，无须达到阈值。

- 空间分配担保

  在发生Minor GC之前，虚拟机会先检查老年代最大可用的连续空间是否大于新生代所有对象总空间，如果这个条件成立，那么Minor GC 可以确保是安全的。如果不成立，则虚拟机会查看HandlePromotionFailure设置值是否允许担保失败。如果允许，那么会继续检查老年代最大可用的连续空间是否大于历次晋升到老年代对象的平均大小，如果大于，将尝试着进行一次Minor GC，尽管这次Minor GC是有风险的；如果小于，或者HandlePromotionFailure设置不允许冒险，那这时也要改为进行一次Full GC。

## 三、垃圾收集器

##### 1.Serial：单线程的收集器。==复制算法==

##### 2.ParNew：Serial 收集器的多线程版本。==复制算法==

##### 3.Parallel Scavenge：类似ParNew的收集器，其他收集器关注于尽可能缩短 Stop The World 的时间， 而Parallel 收集器更关注系统的吞吐量，支持自适应调节策略。==复制算法==

##### 4.Serial Old：Serial 收集器的老年代版本。==标记整理算法==

##### 5.Parallel Old：Parallel Scavenge 收集器的老年代版本。==标记整理算法==

##### 6.CMS：Concurrent Mark Sweep 收集器是一种以获取最短回收停顿时间为目标的收集器。==标记清除算法==

 CMS 的运作过程

- 初始标记(Initial Mark)：标记出老年代里面存活的对象，这些对象或者是从GC roots直接指向的，或者是被年轻代存活对象指向的。会导致 STW，速度最快。

![jvm-info18]({{ site.url }}/assets/images/jvm-info18.png)

- 并发标记(Concurrent Mark)：从上个阶段找到的所有根节点开始遍历整个老年代，标记存活的对象。速度慢，但是是和程序并发执行的。

![jvm-info19]({{ site.url }}/assets/images/jvm-info19.png)

- 重新标记(Final Remark)：由于之前的并发标记是并发过程，可能无法赶上应用程序的修改速度。所以需要重新标记来完成标记整个老生代存活对象的标记。会导致 STW，速度快。

- 并发清除(Concurrent Sweep)：并发清除死亡的对象。速度慢，但是是和程序并发执行的。

![jvm-info20]({{ site.url }}/assets/images/jvm-info20.png)

 CMS 的整体流程

![jvm-info21]({{ site.url }}/assets/images/jvm-info21.png)

CMS 的缺点

- 对CPU资源非常敏感。CMS默认回收线程数是(CPU数量+3)/4。

- 无法处理浮动垃圾，可能出现“Concurrent Mode Failure”失败而导致另一次Full GC的产生。CMS并发清理阶段用户线程还在运行，伴随程序运行自然有新的垃圾不断产生，这部分垃圾出现在标记过程之后，CMS无法在当次收集中处理掉它们，只好留到下次GC再清理。这部分垃圾就是浮动垃圾。因为垃圾收集阶段的用户线程还要运行，所以CMS不像其他收集器那样等老年代几乎填满了在收集，会预留一部分空间。-XX:CMSInitiatingOccupancyFraction可以设置触发的百分比。当预留的内存无法满足程序需要，就会出现出现“Concurrent Mode Failure”失败，此时，虚拟机启动后备方案：临时启用Serial Old。

- 标记-清除算法的缺陷。易产生内存碎片。解决方法：通过参数配置，用于CMS在Full GC 时开启内存碎片的合并整理过程，内存整理过程无法并发，会导致STW时间变长，因此有另一个参数配置，用于设置执行多少次不压缩的Full GC后，执行压缩会Full GC。

7.G1：面向服务端应用。
 G1 的特点

- 并发与并行：充分利用多CPU、多核环境的硬件优势，缩短STW。

- 分代收集：保留分代概念，能独立管理整个GC堆。

- 空间整理：基于“标记-整理“，局部（两个Region）上看基于“复制”算法。所以不会产生内存空间碎片。

- 可预知的停顿：这是G1相对于CMS的另一大优势，能让使用者明确指定一个长度为M毫秒的时间片段内，消耗在垃圾收集上的时间不得超过N毫秒。

 G1 的运作过程

- 初始标记(Initial Mark)：类似CMS

- 并发标记(Concurrent Mark)：类似CMS

- 最终标记(Remark)：类似CMS

- 筛选回收(cleanp)：在此阶段将对象从一个或多个区域复制到单一区域，同时整理和释放内存。

8.ZGC：JDK 11 引入的，号称具有更低延迟的垃圾收集器，利用有色指针、加载屏障等技术，将 STW 控制在一次，只做一次扫描就能实现垃圾收集。

## 四、垃圾收集器的组合方式
参数	功能

    -XX:+UseConcMarkSweepGC	自动启用-XX:+UseParNewGC
    -XX:+UseParallelGC	自动启用-XX:+UseParallelOldGC。Server模式下的默认值。
    -XX:+UseParallelOldGC	自动启用-XX:+UseParallelGC
    -XX:+UseParNewGC	JDK8不能单独启用
    -XX:+UseSerialGC	Serial + Serial Old。Client模式下的默认值。
    -XX:+UseG1GC	使用G1垃圾收集器

参考资料：《深入理解Java虚拟机(第二版)》、《Java虚拟机规范(Java SE 8版)》、[GC Algorithms: Implementations](https://plumbr.io/handbook/garbage-collection-algorithms-implementations)

<div id="gitalk-container-jvm-f"></div>

<script>
  $(document).ready(function() {
    window.initJVMFComment();
  })
</script>