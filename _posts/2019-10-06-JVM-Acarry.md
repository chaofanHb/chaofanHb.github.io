---
layout: post
title: 【搬运】通过字节码展示Java8 Lambda的实现
categories: JVM java
---

通过字节码展示Java8 Lambda的实现

Java8 增加了 Lambda 表达式，很大程度使代码变的更加简洁紧凑了，那么 Java8 是如何实现 Lambda 表达式的呢？

直接看一个简单的创建线程的例子。

    public class TestLambda {
        public static void main(String[] args) {
            new Thread(() -> System.out.print("thread"));
        }
    }

执行javac TestLambda.java编译生成文件TestLambda.class，然后用javap命令来分析这个class文件。
执行javap -p TestLambda显示所有类和成员。

    // javap -p TestLambda
    Compiled from "TestLambda.java"
    public class TestLambda {
    public TestLambda();
    public static void main(java.lang.String[]);
    private static void lambda$main$0(); // 编译后生成的
    }
由上面的代码可以看出编译器根据 Lambda 表达式生成了一个私有静态方法。

    private static void lambda$main$0(); 

使用命令javap -v -p TestLambda打印详细信息。

    public class TestLambda
    minor version: 0
    major version: 52
    flags: ACC_PUBLIC, ACC_SUPER
    Constant pool:
    #1 = Methodref          #9.#24         // java/lang/Object."<init>":()V
    #2 = Class              #25            // java/lang/Thread
    #3 = InvokeDynamic      #0:#30         // #0:run:()Ljava/lang/Runnable;
    #4 = Methodref          #2.#31         // java/lang/Thread."<init>":(Ljava/lang/Runnable;)V
    #5 = Fieldref           #32.#33        // java/lang/System.out:Ljava/io/PrintStream;
    #6 = String             #34            // thread
    #7 = Methodref          #35.#36        // java/io/PrintStream.print:(Ljava/lang/String;)V
    #8 = Class              #37            // TestLambda
    #9 = Class              #38            // java/lang/Object
    #10 = Utf8               <init>
    #11 = Utf8               ()V
    #12 = Utf8               Code
    #13 = Utf8               LineNumberTable
    #14 = Utf8               LocalVariableTable
    #15 = Utf8               this
    #16 = Utf8               LTestLambda;
    #17 = Utf8               main
    #18 = Utf8               ([Ljava/lang/String;)V
    #19 = Utf8               args
    #20 = Utf8               [Ljava/lang/String;
    #21 = Utf8               lambda$main$0
    #22 = Utf8               SourceFile
    #23 = Utf8               TestLambda.java
    #24 = NameAndType        #10:#11        // "<init>":()V
    #25 = Utf8               java/lang/Thread
    #26 = Utf8               BootstrapMethods
    #27 = MethodHandle       #6:#39         // invokestatic java/lang/invoke/LambdaMetafactory.metafactory:(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;
    #28 = MethodType         #11            //  ()V
    #29 = MethodHandle       #6:#40         // invokestatic TestLambda.lambda$main$0:()V
    #30 = NameAndType        #41:#42        // run:()Ljava/lang/Runnable;
    #31 = NameAndType        #10:#43        // "<init>":(Ljava/lang/Runnable;)V
    #32 = Class              #44            // java/lang/System
    #33 = NameAndType        #45:#46        // out:Ljava/io/PrintStream;
    #34 = Utf8               thread
    #35 = Class              #47            // java/io/PrintStream
    #36 = NameAndType        #48:#49        // print:(Ljava/lang/String;)V
    #37 = Utf8               TestLambda
    #38 = Utf8               java/lang/Object
    #39 = Methodref          #50.#51        // java/lang/invoke/LambdaMetafactory.metafactory:(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;
    #40 = Methodref          #8.#52         // TestLambda.lambda$main$0:()V
    #41 = Utf8               run
    #42 = Utf8               ()Ljava/lang/Runnable;
    #43 = Utf8               (Ljava/lang/Runnable;)V
    #44 = Utf8               java/lang/System
    #45 = Utf8               out
    #46 = Utf8               Ljava/io/PrintStream;
    #47 = Utf8               java/io/PrintStream
    #48 = Utf8               print
    #49 = Utf8               (Ljava/lang/String;)V
    #50 = Class              #53            // java/lang/invoke/LambdaMetafactory
    #51 = NameAndType        #54:#58        // metafactory:(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;
    #52 = NameAndType        #21:#11        // lambda$main$0:()V
    #53 = Utf8               java/lang/invoke/LambdaMetafactory
    #54 = Utf8               metafactory
    #55 = Class              #60            // java/lang/invoke/MethodHandles$Lookup
    #56 = Utf8               Lookup
    #57 = Utf8               InnerClasses
    #58 = Utf8               (Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;
    #59 = Class              #61            // java/lang/invoke/MethodHandles
    #60 = Utf8               java/lang/invoke/MethodHandles$Lookup
    #61 = Utf8               java/lang/invoke/MethodHandles
    {
    public TestLambda();
        descriptor: ()V
        flags: ACC_PUBLIC
        Code:
        stack=1, locals=1, args_size=1
            0: aload_0
            1: invokespecial #1                  // Method java/lang/Object."<init>":()V
            4: return
        LineNumberTable:
            line 1: 0
        LocalVariableTable:
            Start  Length  Slot  Name   Signature
                0       5     0  this   LTestLambda;

    public static void main(java.lang.String[]);
        descriptor: ([Ljava/lang/String;)V
        flags: ACC_PUBLIC, ACC_STATIC
        Code:
        stack=3, locals=1, args_size=1
            0: new           #2                  // class java/lang/Thread
            3: dup
            4: invokedynamic #3,  0              // InvokeDynamic #0:run:()Ljava/lang/Runnable;
            9: invokespecial #4                  // Method java/lang/Thread."<init>":(Ljava/lang/Runnable;)V
            12: pop
            13: return
        LineNumberTable:
            line 3: 0
            line 4: 13
        LocalVariableTable:
            Start  Length  Slot  Name   Signature
                0      14     0  args   [Ljava/lang/String;

    private static void lambda$main$0();
        descriptor: ()V
        flags: ACC_PRIVATE, ACC_STATIC, ACC_SYNTHETIC
        Code:
        stack=2, locals=0, args_size=0
            0: getstatic     #5                  // Field java/lang/System.out:Ljava/io/PrintStream;
            3: ldc           #6                  // String thread
            5: invokevirtual #7                  // Method java/io/PrintStream.print:(Ljava/lang/String;)V
            8: return
        LineNumberTable:
            line 3: 0
    }
    SourceFile: "TestLambda.java"
    InnerClasses:
        public static final #56= #55 of #59; //Lookup=class java/lang/invoke/MethodHandles$Lookup of class java/lang/invoke/MethodHandles
    BootstrapMethods:
    0: #27 invokestatic java/lang/invoke/LambdaMetafactory.metafactory:(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;
        Method arguments:
        #28 ()V
        #29 invokestatic TestLambda.lambda$main$0:()V
        #28 ()V

如上所示：main() 方法创建线程的一行代码反编译后的字节码是

    0: new           #2                  // class java/lang/Thread
    3: dup
    4: invokedynamic #3,  0              // InvokeDynamic #0:run:()Ljava/lang/Runnable;
    9: invokespecial #4                  // Method java/lang/Thread."<init>":(Ljava/lang/Runnable;)V
    12: pop
    13: return

根据4: invokedynamic #3找到常量池第三行

    #3 = InvokeDynamic      #0:#30         // #0:run:()Ljava/lang/Runnable;

其中，#0指向BootstrapMethods:的静态工厂方法LambdaMetafactory.metafactory

    BootstrapMethods:
    0: #27 invokestatic java/lang/invoke/LambdaMetafactory.metafactory:(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodType;Ljava/lang/invoke/MethodHandle;Ljava/lang/invoke/MethodType;)Ljava/lang/invoke/CallSite;
        Method arguments:
        #28 ()V
        #29 invokestatic TestLambda.lambda$main$0:()V
        #28 ()V
    LambdaMetafactory.metafactory会利用 asm 可以为 Lambda 表达式生成内部类，metafactory 方法源码如下

    public static CallSite metafactory(MethodHandles.Lookup caller,
                                    String invokedName,
                                    MethodType invokedType,
                                    MethodType samMethodType,
                                    MethodHandle implMethod,
                                    MethodType instantiatedMethodType)
            throws LambdaConversionException {
        AbstractValidatingLambdaMetafactory mf;
        mf = new InnerClassLambdaMetafactory(caller, invokedType,
                                            invokedName, samMethodType,
                                            implMethod, instantiatedMethodType,
                                            false, EMPTY_CLASS_ARRAY, EMPTY_MT_ARRAY);
        mf.validateMetafactoryArgs();
        return mf.buildCallSite();
    }

为了查看这个内部类，加上生成代理类的参数运行 TestLambda，即java -Djdk.internal.lambda.dumpProxyClasses TestLambda。运行结束后，发现在同级目录生成了一个class文件TestLambda$$Lambda$1.class。执行javap -v -p TestLambda$$Lambda$1反编译这个类。

    final class TestLambda$$Lambda$1 implements java.lang.Runnable
    minor version: 0
    major version: 52
    flags: ACC_FINAL, ACC_SUPER, ACC_SYNTHETIC
    Constant pool:
    #1 = Utf8               TestLambda$$Lambda$1
    #2 = Class              #1             // TestLambda$$Lambda$1
    #3 = Utf8               java/lang/Object
    #4 = Class              #3             // java/lang/Object
    #5 = Utf8               java/lang/Runnable
    #6 = Class              #5             // java/lang/Runnable
    #7 = Utf8               <init>
    #8 = Utf8               ()V
    #9 = NameAndType        #7:#8          // "<init>":()V
    #10 = Methodref          #4.#9          // java/lang/Object."<init>":()V
    #11 = Utf8               run
    #12 = Utf8               Ljava/lang/invoke/LambdaForm$Hidden;
    #13 = Utf8               TestLambda
    #14 = Class              #13            // TestLambda
    #15 = Utf8               lambda$main$0
    #16 = NameAndType        #15:#8         // lambda$main$0:()V
    #17 = Methodref          #14.#16        // TestLambda.lambda$main$0:()V
    #18 = Utf8               Code
    #19 = Utf8               RuntimeVisibleAnnotations
    {
    private TestLambda$$Lambda$1();
        descriptor: ()V
        flags: ACC_PRIVATE
        Code:
        stack=1, locals=1, args_size=1
            0: aload_0
            1: invokespecial #10                 // Method java/lang/Object."<init>":()V
            4: return

    public void run();
        descriptor: ()V
        flags: ACC_PUBLIC
        Code:
        stack=0, locals=1, args_size=1
            0: invokestatic  #17                 // Method TestLambda.lambda$main$0:()V
            3: return
        RuntimeVisibleAnnotations:
        0: #12()
    }
    
由上可见，内部类TestLambda$$Lambda$1实现了 java.lang.Runnable，run()方法即线程启动后执行的方法，它会触发执行TestLambda.lambda$main$0:()，即编译TestLambda时生成的私有静态方法。

总结
创建线程的 Lambda 表达式在编译后会在 class 文件新增一个私有静态方法，运行这个类的期间，会使用 asm 操作字节码的技术，动态生成内部类，此内部类实现了 Runnable 接口，真正执行线程，线程方法 run 内部实际上就是调用了编译后生成的私有静态方法，从而执行线程代码。

<div id="gitalk-container-jvm-a"></div>

<script>
  $(document).ready(function() {
    window.initJVMAComment();
  })
</script>