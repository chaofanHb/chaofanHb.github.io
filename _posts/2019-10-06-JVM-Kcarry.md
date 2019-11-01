---
layout: post
title: 【搬运】Java虚拟机知识点【异常】
categories: JVM java
---

Java虚拟机知识点【异常】

## 异常
  Java虚拟机异常使用Throwable或其子类的实例来表示，抛异常本质上是程序控制权的一种即时的、非局部的转换，即从抛出的地方转换至处理异常的地方。

  导致异常的原因

- 执行了athrow字节码指令。
- 虚拟机同步检测到程序发生了非正常的执行情况，这时的异常必将紧接着在发生非正常执行情况的字节码指令之后抛出。例如：
  由Java虚拟机执行的每个方法都会配有零至多个异常处理器。异常处理器描述了其在方法代码中的有效作用范围、能处理的异常类型以及处理异常的代码位置。

  如果当前方法中没有找到任何异常处理器，并且当前方法调用期间确实发生了异常，那当前方法的操作数栈和局部变量表都将被丢弃，随后它对应的栈帧出栈，并恢复到该方法调用者的栈帧中。未被处理的异常将在方法调用者的栈帧重新被抛出，并在整个方法调用链里不断重复进行前面描述的处理过程。如果已经达到方法调用链顶端，却还没有找到合适的异常处理器去处理这个异常，那整个执行线程都将被终止。

  搜索异常处理器时的搜索顺序很关键，在class文件里，每个方法的异常处理器都存储在一个表中。运行时，当有异常抛出后，Java虚拟机按照class文件中的异常处理器表所描述的异常处理器的先后顺序，从前至后进行搜索。

  Java虚拟机本身不会对方法的异常处理器表进行排序或者其他方式的强制处理，所以Java语言中对异常处理的语义，实际上是通过编译器适当安排异常处理器在表中的顺序来协助完成的。

## try-catch-finally 的例子

    public class Test {
        void testException(int i) {
            try {
            System.out.println(i);
            } catch (NullPointerException e) {
            throw new NullPointerException();
            } catch (RuntimeException e) {
            throw new RuntimeException();
            } finally {
            System.err.print(i);
            }
        }
    }

  对上面的例子进行编译javac Test.java和反编译javap -c Test.class，生成字节码命令。

    0: getstatic     #2 // 获取第一个静态方法 println：Field java/lang/System.out:Ljava/io/PrintStream;
    3: iload_1
    4: invokevirtual #3 // 执行第一个静态方法 println：Method java/io/PrintStream.println:(I)V
    7: getstatic     #4 // 获取finally的静态方法 print：Field java/lang/System.err:Ljava/io/PrintStream;
    10: iload_1
    11: invokevirtual #5 // 执行finally的静态方法 print：Method java/io/PrintStream.print:(I)V
    14: goto          45 // 跳到return指令结束程序
    ==========================
    17: astore_2
    18: new           #6 // class java/lang/NullPointerException
    21: dup
    22: invokespecial #7 // Method java/lang/NullPointerException."<init>":()V
    25: athrow
    26: astore_2
    27: new           #8 // class java/lang/RuntimeException
    30: dup
    31: invokespecial #9 // Method java/lang/RuntimeException."<init>":()V
    34: athrow
    35: astore_3
    36: getstatic     #4 // Field java/lang/System.err:Ljava/io/PrintStream;
    39: iload_1
    40: invokevirtual #5 // Method java/io/PrintStream.print:(I)V
    43: aload_3
    44: athrow
    ==========================
    45: return
    Exception table:        // 异常表，顺序和源码一致
    from    to    target    type
    0     7    17   Class java/lang/NullPointerException //如果0-7之间有NullPointerException异常，跳到17
    0     7    26   Class java/lang/RuntimeException  //如果0-7之间有RuntimeException异常，跳到26
    0     7    35   any      //0-7之间任意情况下都会到35行，即finally
    17    36    35   any      //17-36之间任意情况下都会到35行，即finally

    
参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》

<div id="gitalk-container-jvm-k"></div>

<script>
  $(document).ready(function() {
    window.initJVMKComment();
  })
</script>