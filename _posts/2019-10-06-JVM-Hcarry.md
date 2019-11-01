---
layout: post
title: 【搬运】Java虚拟机知识点【字节码】
categories: JVM java
---

Java虚拟机知识点【字节码】

## 字节码指令
  Java虚拟机的字节码指令由一个字节长度，代表着某种特定操作含义的操作码以及跟随其后的零至多个代表此操作所需参数的操作数所构成的。如果忽略异常，JVM的解释器通过下面的伪代码可有效工作：

    do {
    自动计算PC寄存器以及从PC寄存器的位置取出操作码；
    if (存在操作数) 取出操作数;
    执行操作码所定义的操作;
    } while (处理下一次循环);

## 操作字节码
  可以利用开源库直接操作字节码，如CGLib、ASM、Javassist等，他们可以在程序运行时，动态地创建字节码类或者编辑存在的字节码类。其中，CGLib是基于ASM实现的，是一个高效高性能的生成库；而ASM是一个轻量级的类库，但需要涉及到JVM的操作和指令；相比而言，Javassist要简单的多，完全是基于Java的API，但其性能相比前二者要差一些。

### 使用CGLib实现动态代理
  Java 编译完后不会立即生成代理类，而是在运行时动态生成代理类字节码，并加载到内存中。通过实现JDK的接口 InvocationHandler 就可以来实现动态代理。

    // 示例：JDK实现动态代理
    public class ProxyHandler implements InvocationHandler {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println("Start");
            Object o = method.invoke(this, args);
            System.out.println("End");
            return o;
        }
    }

  使用JDK实现动态代理的类必须要实现一个接口，在实际开发中有一定的局限性，反射的效率也并不是很高，因此可以利用操作字节码技术来实现动态代理。流行的开发框架 Spring 则同时实现了这两种方式，可以在实际开发中选择基于JDK的动态代理，或者基于CGLib的动态代理。

[CGLib 的 github地址](https://github.com/cglib/cglib/releases)

通过CGLib来实现动态代理需要引入CGLib和asm的依赖包

    <!-- cglib -->
    <dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.2.12</version>
    </dependency>
    <!-- asm -->
    <dependency>
    <groupId>asm</groupId>
    <artifactId>asm</artifactId>
    <version>3.3.1</version>
    </dependency>

需要被代理的类

    // 需要被代理的类
    public class HelloCGLib {

    public HelloCGLib() {
        System.out.println("HelloCGLib构造器");
    }

    public void sayHello(String name) {
        System.out.println("HelloCGLib:" + name);
    }
    }

实现CGLib的方法拦截器

    // 实现CGLib的方法拦截器
    public class ProxyInterceptor implements MethodInterceptor {

    /**
    * @param o           cglib生成的代理对象
    * @param method      被代理对象方法
    * @param objects     方法入参
    * @param methodProxy 代理方法
    */
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println("======前置通知======");
        Object object = methodProxy.invokeSuper(o, objects);
        System.out.println("======后者通知======");
        return object;
    }
    }
    
测试类

    public class Test {
        public static void main(String[] args) {
            // 代理类class文件存入本地磁盘方便我们反编译查看源码
            System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, "F:\\");
            // CGLIB 增强类
            Enhancer enhancer = new Enhancer();
            // 设置增强类对象的父类
            enhancer.setSuperclass(HelloCGLib.class);
            // 设置增强类的回调类
            enhancer.setCallback(new ProxyInterceptor());
            // 创建代理对象
            HelloCGLib proxy = (HelloCGLib) enhancer.create();
            // 通过代理对象调用目标方法
            proxy.sayHello("hehe");
        }
    }

运行结果

    HelloCGLib构造器
    ======前置通知======
    HelloCGLib:hehe
    ======后者通知======

F 盘下生成的代理类

![jvm-info22]({{ site.url }}/assets/images/jvm-info22.png)

由于CGlib是通过对需要增强的类生成一个子类，并覆盖其中的方法来实现动态代理的，所以CGlib可以为无接口的类直接做代理，但是不能为final类做代理。

参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》

<div id="gitalk-container-jvm-h"></div>

<script>
  $(document).ready(function() {
    window.initJVMHComment();
  })
</script>