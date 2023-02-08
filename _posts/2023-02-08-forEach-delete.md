---
layout: post
title: 循环删除 List 中的元素
categories: study 
---

循环删除 List 中的元素，这个问题是有需要的注意点的，如果是个新手，确实会遇到一点麻烦。


## 1.问题

比如有以下这个 List：
{% highlight ruby linenos %}
public List<String> initList = Arrays.asList("张三", "李四", "周一", "刘四", "李强", "李白");
{% endhighlight %}
怎么删除 List 中姓李的人？

## 2.方法

- 1、普通 for 循环删除（不可靠）

{% highlight ruby linenos %}
/**
 * 普通 for 循环删除
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove1() {
    List<String> list = new ArrayList(initList);
    for (int i = 0; i < list.size(); i++) {
        String str = list.get(i);
        if (str.startsWith("李")) {
            list.remove(i);
        }
    }
    System.out.println(list);
}
{% endhighlight %}

输出结果：

    [张三, 周一, 刘四, 李白]

问题就出在 list.size()，因为 list.size() 和 i 都是动态变化的，i 的值一直在累加，list.size() 一直在减少，所以 list 就会早早结束了循环。
所以这种方式虽然不会报错，但存在隐患，并且不容易被察觉，不建议使用

- 2、普通 for 循环提取变量删除（抛异常）

{% highlight ruby linenos %}
/**
 * 普通 for 循环删除（size提出变量）
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove2() {
    List<String> list = new ArrayList(initList);
    int size = list.size();
    for (int i = 0; i < size; i++) {
        String str = list.get(i);
        if (str.startsWith("李")) {
            list.remove(i);
        }
    }
    System.out.println(list);
}
{% endhighlight %}

输出结果：
![抛出异常]({{ site.url }}/assets/images/forEach-delete1.png)
这里也很明显，因为 size 变量是固定的，但 list 的实际大小是不断减小的，而 i 的大小是不断累加的，一旦 i >= list 的实际大小肯定就异常了。

- 3、普通 for 循环倒序删除（可靠）

{% highlight ruby linenos %}
/**
 * 普通 for 循环倒序删除
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove3() {
    List<String> list = new ArrayList(initList);
    for (int i = list.size() - 1; i > 0; i--) {
        String str = list.get(i);
        if (str.startsWith("李")) {
            list.remove(i);
        }
    }
    System.out.println(list);
}
{% endhighlight %}
输出结果：
    [张三, 周一, 刘四]
结果输出正常，这种删除方式就算把 list.size() 提出变量也是 OK 的，因为循环中只用到了一次。

- 4、增强 for 循环删除（抛异常）

{% highlight ruby linenos %}
/**
 * 增强 for 循环删除
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove3() {
    List<String> list = new ArrayList(initList);
    for (String element : list) {
        if (element.startsWith("李")) {
            list.remove(element);
        }
    }
    System.out.println(list);
}
{% endhighlight %}
输出结果：
![抛出异常]({{ site.url }}/assets/images/forEach-delete2.png)
又抛异常了。不过这次的异常和上面的下标异常不太一样，这次是：java.util.ConcurrentModificationException

for(xx in xx) 就是增强的 for循环，即迭代器 Iterator 的加强实现，其内部是调用的 Iterator 的方法
取下个元素的时候都会去判断要修改的数量（modCount）和期待修改的数量（expectedModCount）是否一致，不一致则会报错，而 ArrayList 中的 remove 方法并没有同步期待修改的数量（expectedModCount）值，所以会抛异常了。

- 5、迭代器循环迭代器删除（可靠）

{% highlight ruby linenos %}
/**
 * 迭代器循环删除（iterator.remove）
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove4() {
    List<String> list = new ArrayList(initList);
    for (Iterator<String> iterator = list.iterator(); iterator.hasNext(); ) {
        String str = iterator.next();
        if (str.contains("李")) {
            iterator.remove();
        }
    }
    System.out.println(list);
}
{% endhighlight %}
输出结果：
    [张三, 周一, 刘四]
结果输出正常，这是因为迭代器中的 remove 方法将期待修改的数量（expectedModCount）值进行了同步：

- 6、迭代器循环集合删除（抛异常）

{% highlight ruby linenos %}
/**
 * 迭代器循环删除（list.remove）
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove5() {
    List<String> list = new ArrayList(initList);
    for (Iterator<String> ite = list.iterator(); ite.hasNext(); ) {
        String str = ite.next();
        if (str.contains("李")) {
            list.remove(str);
        }
    }
    System.out.println(list);
}
{% endhighlight %}
输出结果：
![抛出异常]({{ site.url }}/assets/images/forEach-delete3.png)
又是那个并发修改异常，这个示例虽然使用了 Iterator 循环，但删除的时候却使用了 list.remove 方法，同样是有问题的，注意了，千万别用错了。

- 7、集合 forEach 方法循环删除（抛异常）

{% highlight ruby linenos %}
/**
 * list.forEach 删除
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove6() {
    List<String> list = new ArrayList(initList);
    list.forEach((e) -> {
        if (e.contains("李")) {
            list.remove(e);
        }
    });
    System.out.println(list);
}
{% endhighlight %}
输出结果：
![抛出异常]({{ site.url }}/assets/images/forEach-delete4.png)
forEach 方法的背后其实就是增强的 for 循环，底层即迭代器，所以使用 list.remove 同样抛出 ConcurrentModificationException 异常。

- 8、stream filter 过滤（可靠）

{% highlight ruby linenos %}
/**
 * stream filter 过滤
 * @author: 栈长
 * @from: 公众号Java技术栈
 */
@Test
public void remove7() {
    List<String> list = new ArrayList(initList);
    list = list.stream().filter(e -> !e.startsWith("李")).collect(Collectors.toList());
    System.out.println(list);
}
{% endhighlight %}
输出结果：
    [张三, 周一, 刘四]
这个方法即是利用了 Stream 的筛选功能，快速过滤所需要的元素，虽然不是进行集合删除，但达到了同样的目的，这种方法要更简洁吧。