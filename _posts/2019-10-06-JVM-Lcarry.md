---
layout: post
title: 【搬运】Java虚拟机知识点【栈帧】
categories: JVM java
---

栈帧是Java虚拟机栈的结构，每个栈帧都有自己的局部变量表、操作数栈、动态链接和方法返回地址等信息，还允许携带与JVM实现相关的附加信息，如，对程序调试提供支持的信息。

## 1 局部变量表
  局部变量表存储基本数据类型(8种)、对象引用、returnAddress类型。以变量槽Slot为最小单位，一个Slot可以存放一个32位以内的数据类型，因此，long和double需要两个Slot来保存。栈帧采用较小的索引值来定位，例如，double类型的索引值为n，实际上用了索引值n和n+1两个局部变量来存储这个值，访问的时候，通过索引值n来定位这个double类型。

  Java虚拟机使用局部变量表来完成方法调用时的参数传递。当调用类方法(静态类方法)时，参数依次传递到局部变量表从0开始的连续位置上。当调用实例方法(new)时，第0个局部变量一定用来存储该实例方法所在对象的引用(this关键字)。

  为节省空间，Slot是可以重用的，当PC计数器的值超过了某个变量的作用域，那这个变量对应的Slot就可以交给其他变量使用。不过这样的设计也会引起副作用，比如它会影响到GC行为。如下问题：

问题：通过设置null可以表示对象可回收？
  这种操作可做为极其特殊情况下的奇技(对象占用内存大、此方法的栈帧长时间不能被回收，方法调用次数达不到JIT的编译条件)。而通常经过JIT编译优化后会消除掉null的赋值操作，所以一般不需要赋值null。

long和double的非原子协定
  对于64位的数据类型，JMM定义了一条相对宽松的规定：允许虚拟机将没有被volatile修饰的64位数据的读写操作划分为两次32位的操作来进行，即允许虚拟机实现选择可以不保证64位数据类型的load、store、read、write操作的原子性，这就是long和double的非原子性协定。

  也就是说，如果有多个线程共享一个未声明为volatile的long或double的变量，并且同时对它们进行读取和修改操作，那么某些线程可能会读取到一个既非原值，也不是其他线程修改值的代表了“半个变量”的数值。

  不过目前商用虚拟机几乎都选择把64位数据的读写操作作为原子操作来对待，因此编写代码时一般不需要把用到的long和double专门声明为volatile。

## 2 操作数栈
  栈帧在刚刚创建时，操作数栈是空的。Java虚拟机提供一些字节码指令来从局部变量表或者对象实例的字段中复制常量或变量值到操作数栈中，也提供了一些指令用于从操作数栈取走数据、操作数据以及把操作结果重新入栈。在调用方法时，操作数栈也用来准备调用方法的参数以及接收方法返回结果。

  操作数栈的每个位置可以保存一个Java虚拟机定义的任意类型的值，包括long和double。操作数栈有个确定的栈深度，long或double占用两个单位的栈深度，其他数据类型占用一个单位的栈深度。

  操作数栈的数据必须正确地顺序操作，例如，不可以入栈两个int类型的数据，然后当作long类型去操作。有小部分Java虚拟机指令可以不关注操作数的具体数据类型，把所有在运行时数据区中的数据当作裸类型数据来操作，这些指令不可以用来修改数据，也不可以拆散原来不可拆分的数据，这些操作的正确性将会通过class文件的检验过程来强制保障。

  栈帧存在重叠区域，方便方法调用时公用一部分数据，无需进行额外的参数赋值传递。

## 3 动态链接
  每个栈帧内部包含一个指向当前方法所在类型的运行时常量池的引用，以便对当前方法的代码实现动态链接(在每一次运行期间转化为直接引用)。

## 4 方法调用

### 4.1 正常完成
  方法执行过程中，遇到方法返回的字节码指令时，表示方法正常完成。字节码指令类型取决于方法返回值的数据类型。此时，当前栈帧承担恢复调用者的责任，调用者的代码在被调用方法的返回值压入调用者栈帧的操作数栈后，继续正常执行。

### 4.2 异常完成
  方法执行过程中，如果虚拟机内部或遇到athrow字节码指令导致Java虚拟机抛出异常，表示异常完成。

参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》

<div id="gitalk-container-jvm-l"></div>

<script>
  $(document).ready(function() {
    window.initJVMLComment();
  })
</script>