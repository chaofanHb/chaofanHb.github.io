---
layout: post
title: 【搬运】Java虚拟机知识点【方法调用】
categories: JVM java
---

Java虚拟机知识点【方法调用】

## 解析调用
  方法调用的目标方法在Class文件里是一个常量池中的符号引用，在类加载的解析阶段，将其中一部分符号引用转化为直接引用，这种解析的前提是：方法在程序真正运行之前就有一个可确定的调用版本，并且这个方法的调用版本在运行期不可变（编译期可知，运行器不可变）。这类方法的调用称为解析。

  Java虚拟机有5条方法调用的字节码指令：

- invokestatic：调用静态方法。

- invokespecial：调用实例初始化方法、私有方法和父类方法。

- invokevirtual：调用对象的实例方法。

- invokeinterface：调用接口方法。

- invokedynamic：调用以绑定invokedynamic指令的调用点对象作为目标的方法。

  前4条指令，分派逻辑固化在Java虚拟机内部的，而invokedynamic的分派逻辑由用户所设定的引导方法决定。

  invokestatic和invokespecial调用的方法称非虚方法，其他为虚方法（final方法除外）。因为final虽是invokevirtual调用的，但是它不能被覆盖修改，所以它也是非虚方法。

## 分派调用
  解析调用一定是静态过程，在编译期间就完全确定，不会延迟到运行期再去完成。而分派调用则可能是静态的也可能是动态的，可分为单分派和多分派，两两组合构成静态单分派、静态多分派、动态单分派、动态多分派。

### 1、静态分派（多分派）

  依赖静态类型来定位方法执行版本的分派称为静态分派。典型应用就是重载。静态分派发生在编译阶段，分派动作不是虚拟机执行的。编译期能确定一个”更加合适的“版本。

    public class StaticDispatch {
        static abstract class Human{
        }
        static class Man extends Human{
        }
        static class Woman extends Human{
        }
        public static void sayHello(Human guy){
            System.out.println("hello,guy!");
        }
        public static void sayHello(Man guy){
            System.out.println("hello,gentlemen!");
        }
        public static void sayHello(Woman guy){
            System.out.println("hello,lady!");
        }
        public static void main(String[] args) {
            Human man=new Man();
            Human woman=new Woman();
            sayHello(man);
            sayHello(woman);
        }
    }

输出

    hello,guy!
    hello,guy!

### 2、动态分派（单分派）

  运行期根据实际类型确定方法执行版本的分派称为动态分派。典型应用就是重写。invokevirtual指令第一步就是在运行期确定接收者的实际类型，invokevirtual把常量池中的类方法符号引用解析到直接引用上。

    public class DynamicDispatch {
        static abstract class Human{
            protected abstract void sayHello();
        }
        static class Man extends Human{ 
            @Override
            protected void sayHello() { 
                System.out.println("man say hello!");
            }
        }
        static class Woman extends Human{ 
            @Override
            protected void sayHello() { 
                System.out.println("woman say hello!");
            }
        } 
        public static void main(String[] args) {
            
            Human man=new Man();
            Human woman=new Woman();
            man.sayHello();
            woman.sayHello();
            man=new Woman();
            man.sayHello(); 
        }
    }

输出：

    man say hello!
    woman say hello!
    woman say hello!

### 3、单分派和多分派

  方法的接收者和方法的参数统称为方法的宗量。单分派是根据一个宗量对目标方法进行选择，多分派则是根据多于一个宗量对目标方法进行选择。

    public class Dispatcher {
        static class QQ {}
        static class _360 {}

        public static class Father {
            public void hardChoice(QQ arg) {
                System.out.println("father choose QQ");
            }

            public void hardChoice(_360 arg) {
                System.out.println("father choose _360");
            }
        }

        public static class Son extends Father {
            @Override
            public void hardChoice(QQ arg) {
                System.out.println("son choose QQ");
            }

            @Override
            public void hardChoice(_360 arg) {
                System.out.println("son choose 360");
            }
        }

        public static void main(String[] args) {
            Father father = new Father();
            Father son = new Son();
            father.hardChoice(new _360());
            son.hardChoice(new QQ());
        }
    }

输出

    father choose _360
    son choose QQ

### 4、虚拟机动态分派的实现

  基于性能的考虑，最常用的”稳定优化“手段就是为类在方法区建立一个虚方法表（Vritual Method Table，vtable，与此对应，接口中-Interface Method Table，itable），使用虚方法表索引来代替元数据查找以提高性能。

  虚方法表存放着各个方法的实际入口地址。如果某个方法在子类中没有被重写，那子类的虚方法表里面的地址入口和父类相同方法的地址入口是一致的，都指向父类的实现入口。如果子类中重写了这个方法，子类方法表中的地址将会替换为指向子类实现版本的入口地址。

  为了程序实现上的方便，具有相同签名的方法，在父类、子类的虚方法表中都应当具有一样的索引序号，这样当类型转换时，仅需要变更查找的方法表，就可以从不同的虚方法表中按索引转换出所需的入口地址。

  方法表一般在类加载的连接阶段初始化，准备了类的变量初始值后，虚拟机会把该类的方法表也初始化完毕。

  虚拟机除了使用方法表外，还会使用内联缓存和基于类型继承关系分析技术的守护内联两种非稳定的激进优化手段来回去更高的性能，可参考晚期（运行期）优化。

参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》


<div id="gitalk-container-jvm-g"></div>

<script>
  $(document).ready(function() {
    window.initJVMGComment();
  })
</script>
