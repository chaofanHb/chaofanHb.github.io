---
layout: post
title: 【搬运】Java虚拟机知识点【class文件】
categories: JVM java
---

Class文件是一组以8位字节为基础单位的二进制流，各个数据项目严格按照顺序紧凑排列在Class文件中，中间没有添加任何分隔符，这使得整个Class文件中存储的内容几乎全部是程序运行的必要数据，没有空隙。当遇到需要占用8位字节以上的数据项时，会按照高位在前的方式分割成若干个8位字节进行存储。

## ClassFile 结构说明

![jvm-info23]({{ site.url }}/assets/images/jvm-info23.png)

1.magic：魔数。唯一作用是确定这个文件是否为一个能被虚拟机所接收的class文件。固定值：0xCAFEBABE。

2.minor_version：class文件的副版本号。

3.major_version：class文件的主版本号。

4.constant_pool_count：常量池计数器。

5.constant_pool[constant_pool_count]：常量池。包含字符串常量、类或接口名、字段名和其他常量。常量池每一项都具备相同特征，即第一个字节作为类型标记，用来确定该项格式。

6.access_flags：访问标志。用于表示某个类或接口的访问权限及属性。

7.this_class：当前的类索引。

8.super_class：父类索引。

9.interfaces_count：接口计数器。当前类或接口的直接超的接口数量。

10.interfaces[interfaces_count]：接口表。

11.fields_count：字段计数器。当前class文件的字段成员个数。

12.fields[fields_count]：字段表。

13.methods_count：方法计数器。方法的个数。

14.methods[methods_count]：方法表。

15.attributes_count：属性计数器。属性个数。

16.attributes[attributes_count]：属性表。

## 一个例子

对下面的类进行编译生成Test2.class。

    public class Test2 {
        public static int i = 1;
        public static void main() {
            System.out.println(i);
        }
    }

通过十六进制查看工具打开Test2.class。

![jvm-info24]({{ site.url }}/assets/images/jvm-info24.png)

根据 ClassFile 结构说明，前面4个字节是魔数oxcafebabe。接下来是次版本号和主版本号ox0000和ox0034，十进制为0和52，52表示JDK1.8，所以JDK版本是1.8.0。

还可以使用java自带的反编译工具来解析字节码文件。命令javap -v Test2.class。

    Classfile /E:/CODE/JVM/Test2.class
    Last modified 2019-7-19; size 219 bytes
    MD5 checksum 841c66674d71005bc6a97fe6c3b0fb1d
    Compiled from "Test2.java"
    public class Test2
    minor version: 0
    major version: 52
    flags: ACC_PUBLIC, ACC_SUPER
    Constant pool:
    #1 = Methodref          #4.#13         // java/lang/Object."<init>":()V
    #2 = Fieldref           #3.#14         // Test2.i:I
    #3 = Class              #15            // Test2
    #4 = Class              #16            // java/lang/Object
    #5 = Utf8               i
    #6 = Utf8               I
    #7 = Utf8               <init>
    #8 = Utf8               ()V
    #9 = Utf8               Code
    #10 = Utf8               LineNumberTable
    #11 = Utf8               SourceFile
    #12 = Utf8               Test2.java
    #13 = NameAndType        #7:#8          // "<init>":()V
    #14 = NameAndType        #5:#6          // i:I
    #15 = Utf8               Test2
    #16 = Utf8               java/lang/Object
    {
    public int i;
        descriptor: I
        flags: ACC_PUBLIC

    public Test2();
        descriptor: ()V
        flags: ACC_PUBLIC
        Code:
        stack=2, locals=1, args_size=1
            0: aload_0
            1: invokespecial #1                  // Method java/lang/Object."<init>":()V
            4: aload_0
            5: iconst_1
            6: putfield      #2                  // Field i:I
            9: return
        LineNumberTable:
            line 1: 0
            line 2: 4
    }
    SourceFile: "Test2.java"

## Java虚拟机限制

- 每个类或接口的常量池最多65535个。
- 类或接口中可声明的字段数最多65535个。
- 类或接口中可声明的方法数最多65535个。
- 类或接口的直接父类接口最多65535个。
- 方法调用时创建的栈帧，其局部变量表中的最大局部变量数位65535个。
- 方法帧中操作数栈的最大深度为65535。
- 方法的参数最多255个。
- 字段和方法名称、字段和方法描述符以及其他常量字符串值的最大长度为65535个字符。
- 数组的维度最大为255维。

参考资料：《深入理解Java虚拟机(第二版)》《Java虚拟机规范(Java SE 8版)》

<div id="gitalk-container-jvm-i"></div>

<script>
  $(document).ready(function() {
    window.initJVMIComment();
  })
</script>

