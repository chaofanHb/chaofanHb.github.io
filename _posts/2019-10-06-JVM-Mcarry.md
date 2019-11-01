---
layout: post
title: 【搬运】Java虚拟机知识点【引用】
categories: JVM java
---

Java虚拟机知识点【引用】

  Java虚拟机采用可达性分析算法来判断对象是否可以回收。可达性分析算法通过一系列的GC Roots对象作为起始点，向下搜索走过的路径称引用链，当一个对象到GC Roots没有任何的引用链时，证明对象是不可用的。

Java中，可作为GC Roots的对象：

- 虚拟机栈中引用的对象

- 本地方法栈的JNI引用的对象

- 方法区静态属性引用的对象

- 方法区常量引用的对象

- Java对引用进行了扩充，分为强引用、软引用、弱引用、虚引用四种。

- 强引用：（StrongReference）

强引用是使用最普遍的引用。如果一个对象具有强引用，那垃圾回收器绝不回收。当内存空间不足，Java虚拟机宁愿抛出OutOfMemoryError错误，使程序异常终止，也不会靠随意回收具有强引用的对象来解决内存不足的问题。

    // 强引用的示例
    String string = "hello";

- 软引用：（SoftReference）

如果一个对象只具有软引用，则只有在内存空间不足的时，才会回收。可以和一个引用队列联合使用，如果软引用所引用的对象被垃圾回收器回收，Java虚拟机就会把这个软引用加入到与之关联的引用队列中。

    // 软引用的示例
    SoftReference<String> softRefString = new SoftReference<>("hello", queue);

- 弱引用：（WeakReference）

弱引用与软引用的区别在于：弱引用的对象拥有更短暂的生命周期。垃圾回收线程一旦发现了具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。不过，由于垃圾回收器是一个优先级很低的线程，因此不一定会很快发现那些只具有弱引用的对象。可以和一个引用队列联合使用，如果软引用所引用的对象被垃圾回收器回收，Java虚拟机就会把这个软引用加入到与之关联的引用队列中。

    // 弱引用的示例
    WeakReference<String> weakRefString = new WeakReference<>("hello", queue);

- 虚引用：（PhantomReference）

虚引用并不会决定对象的生命周期。如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收。 必须和引用队列 联合使用。当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象的内存之前，把这个虚引用加入到与之关联的引用队列中。

    // 虚引用的示例
    ReferenceQueue<String> queue = new ReferenceQueue<>();
    PhantomReference<String> phanRefString = new PhantomReference<>("hello", queue);
    
参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》

<div id="gitalk-container-jvm-m"></div>

<script>
  $(document).ready(function() {
    window.initJVMMComment();
  })
</script>