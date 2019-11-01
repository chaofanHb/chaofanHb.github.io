---
layout: post
title: 【搬运】Java虚拟机知识点【类加载】
categories: JVM java
---

类加载机制：虚拟机把描述类的数据从class文件加载到内存，并对数据进行验证、准备、解析、初始化，最终形成可以被虚拟机直接使用的Java类型。验证、准备、解析这3个过程统称为连接。

## 类加载过程
### 1. 启动虚拟机
  虚拟机通过引导类加载器创建一个初始类来完成的，这个类是由虚拟机的具体实现指定的。接着Java虚拟机链接这个初始类，初始化它并调用方法public static void main(String[] args)，之后便开始执行整个流程。执行main方法中的Java虚拟机指令可能会导致Java虚拟机链接到其他的类、接口或者方法。

### 2. 加载
通过一个类的全限定名来获取定义此类的二进制字节流；
将这个字节流所代表的静态存储结构转化为运行时数据结构；
在内存中生成一个代表这个类的java.lang.Class对象，作为这个类的各种数据的访问入口；
  加载阶段和连接阶段的部分过程是交叉进行的，加载阶段尚未完成，连接阶段可能已经开始，但这些夹在加载阶段之中进行的动作，仍然属于连接阶段的内容，这两个阶段的开始时间仍然保持着固定的先后顺序。

### 3. 验证
  验证是连接阶段的第一步，目的是为了确保Class文件的字节流中包含的信息符合当前虚拟机的要求，并且不会危害虚拟机自身的安全。

  验证阶段是非必需的，它对程序运行期没有影响，如果所引用的类经过反复验证，那么可以考虑采用-Xverifynone参数来关闭大部分的类验证措施，以缩短虚拟机类加载的时间。

### 4. 准备
  准备阶段是正式为类变量分配内存并设置类变量初始值的阶段。这时候进行内存分配的仅包括类变量（static修饰的变量），不包括实例变量，实例变量将会在对象实例化时随着对象一起分配在堆中。这里所说的初始值“通常情况”下是数据类型的零值。

  例如，假设一个类变量的定义为：public static int value=123;那变量value在准备阶段过后的初始值为0而不是123。因为这时候尚未开始执行任何java方法，而把value赋值为123的putstatic指令是程序被编译后，存放于类构造器方法之中，所以把value赋值为123的动作将在初始化阶段才会执行。

  至于“特殊情况”是指：public static final int value=123，即当类字段的属性是ConstantValue时，会在准备阶段初始化为指定的值，所以标注为final之后，value的值在准备阶段初始化为123而非0。

### 5. 解析
  解析阶段是虚拟机将常量池内的符号引用替换为直接引用的过程。

### 6. 初始化
  初始化阶段是类加载过程的最后一步，此时才真正开始执行类中定义的java代码。在准备阶段，变量已经赋过一次系统要求的初始值，而在初始化阶段，则根据程序猿通过程序制定的主观计划去初始化类变量和其他资源，或者说：初始化阶段是执行类构造器<clinit>()方法的过程.

  <clinit>()方法是由编译器自动收集类中的所有类变量的赋值动作和静态语句块static{}中的语句合并产生的，编译器收集的顺序是由语句在源文件中出现的顺序所决定的，静态语句块只能访问到定义在静态语句块之前的变量，定义在它之后的变量，在前面的静态语句块可以赋值，但是不能访问。

### 类加载器
  把类加载阶段的“通过一个类的全限定名来获取描述此类的二进制字节流”这个动作放到Java虚拟机外部去实现，以便让应用程序自己决定如何去获取所需要的类，实现这个动作的代码模块叫“类加载器”。

 1.双亲委派模型

  类加载器在收到类加载的请求时，它首先不会自己去尝试加载这个类，而是把这个请求委派给父类加载器去完成，因此所有类加载请求最终都应该传递到顶层的启动类加载器中，只有当父类加载器反馈自己无法完成这个加载请求时，子加载器才会尝试自己去加载。

  双亲委派模型的好处：java类随类加载器一起具备了带有优先级的层次关系。保证一个类在各种类加载器环境中，都是同一个类。

- 启动类加载器：加载\lib目录

- 扩展类加载器：加载\lib\ext目录

- 应用程序类加载器：默认的类加载器

- 自定义类加载器

 2.破坏双亲委派模型

 如何破坏双亲委派模型？
  继承ClassLoader类，并重写loadClass和findClass方法，示例代码如下：

    public class TestClassLoader extends ClassLoader {
    
    private String name;
    
    public TestClassLoader(ClassLoader parent, String name) {
        super(parent);
        this.name = name;
    }
    
    @Override
    public String toString() {
        return this.name;
    }
    
    @Override
    public Class<?> loadClass(String name) throws ClassNotFoundException {
        ClassLoader system = getSystemClassLoader();
        Class<?> clazz = system.loadClass(name);
        if (clazz != null)
        return clazz;
        return findClass(name);
    }
    
    @Override
    public Class<?> findClass(String name) {
    
        InputStream is = null;
        byte[] data = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
        is = new FileInputStream(new File("d:/Test.class"));
        int c;
        while (-1 != (c = is.read())) {
            baos.write(c);
        }
        data = baos.toByteArray();
        } catch (Exception e) {
        //...
        } finally {
        try {
            is.close();
            baos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        }
        return this.defineClass(name, data, 0, data.length);
    }
    
    public static void main(String[] args) throws Exception {
        TestClassLoader loader = new TestClassLoader(TestClassLoader.class.getClassLoader(), "TestLoaderN");
        Class clazz = loader.loadClass("test.classloader.Test");
        clazz.newInstance();
    }
    
    }
    public class Test {
    public Test(){
        System.out.println(this.getClass().getClassLoader().toString());
    }
    }

    
参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》

<div id="gitalk-container-jvm-j"></div>

<script>
  $(document).ready(function() {
    window.initJVMJComment();
  })
</script>
