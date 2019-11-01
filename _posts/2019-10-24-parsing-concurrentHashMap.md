---
layout: post
title: jdk8版本的ConcurrentHashMap解析
categories: 源码阅读 java
---

今天是1024程序员节日！！！

最近借助网上的博客阅读了一下ConcurrentHashMap类，再加上自己的一些见解。
参考[sun.misc.Unsafe详解](https://blog.csdn.net/u012233832/article/details/79632749)
参考[红黑树详解](https://blog.csdn.net/chudelong1/article/details/82698010)

## ConcurrentHashMap简介
ConcurrentHashMap不同于HashMap,虽然都是Map的实现类，但是ConcurrentHashMap支持并发操作，也就是它的动作是具有原子性的。那么我们可以将它作为全局变量来使用，可以用来共享小规模的数据。
数据结构：
Node数组+链表 / 红黑树： 类似hashMap<jdk1.8>
Node数组使用来存放树或者链表的头结点，当一个链表中的数量到达一个数目时，会使查询速率降低，所以到达一定阈值时，会将一个链表转换为一个红黑二叉树，通告查询的速率。

![ConcurrentHashMap结构图]({{ site.url }}/assets/images/red-black-tree.jpg)

    ConcurrentHashMap<String, Object> concurrentHashMap = new ConcurrentHashMap<String, Object>();


## put方法

    public V put(K key, V value) {
        return putVal(key, value, false);
    }

    //onlyIfAbsent为true时，不会覆盖已有的key的value
    final V putVal(K key, V value, boolean onlyIfAbsent) {
        if (key == null || value == null) throw new NullPointerException();
        //spread方法将hash值进行二次散列  并且是正数
        int hash = spread(key.hashCode());
        //记录链表长度，用于自动扩容
        int binCount = 0;
        for (Node<K,V>[] tab = table;;) {
            Node<K,V> f; int n, i, fh;
            if (tab == null || (n = tab.length) == 0)
                //初始化相互独立的Node空数组(默认size：16)
                tab = initTable();
            //tabAt执行前根据hash值随机摇一个在Node数组长度范围内的下标i,tabAt返回根据下标在内存中获取到的Node对象,
            else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
                //获取不到Node对象就创建存入
                if (casTabAt(tab, i, null,
                             new Node<K,V>(hash, key, value, null)))
                    break;                   // no lock when adding to empty bin
            }
            else if ((fh = f.hash) == MOVED)
                tab = helpTransfer(tab, f);
            else {
                //如果摇到相同的下标会进入这里
                V oldVal = null;
                加锁
                synchronized (f) {
                    //再次验证数据没变
                    if (tabAt(tab, i) == f) {
                        //大于零表示是Node形成的链表，小于零表示可能是红黑树(TreeBin构造函数里默认将hash初始化为-2，hash特殊值的含义可以查看594行源码)
                        if (fh >= 0) {
                            binCount = 1;
                            //遍历Node链表，有就修改，没有就在链表末尾next一个Node对象存入
                            for (Node<K,V> e = f;; ++binCount) {
                                K ek;
                                if (e.hash == hash &&
                                    ((ek = e.key) == key ||
                                     (ek != null && key.equals(ek)))) {
                                    oldVal = e.val;
                                    if (!onlyIfAbsent)
                                        e.val = value;
                                    break;
                                }
                                Node<K,V> pred = e;
                                if ((e = e.next) == null) {
                                    pred.next = new Node<K,V>(hash, key,
                                                              value, null);
                                    break;
                                }
                            }
                        }
                        //hash值小于零判断是否是红黑树
                        else if (f instanceof TreeBin) {
                            Node<K,V> p;
                            binCount = 2;
                            //进行红黑树的put操作
                            if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                           value)) != null) {
                                oldVal = p.val;
                                if (!onlyIfAbsent)
                                    p.val = value;
                            }
                        }
                    }
                }
                if (binCount != 0) {
                    if (binCount >= TREEIFY_THRESHOLD)
                        //Node链表长度大于8就进行扩容或者链表转红黑树
                        treeifyBin(tab, i);
                    if (oldVal != null)
                        return oldVal;
                    break;
                }
            }
        }
        addCount(1L, binCount);
        return null;
    }

- initTable() -

        private final Node<K,V>[] initTable() {
            Node<K,V>[] tab; int sc;
            while ((tab = table) == null || tab.length == 0) {
                //sizeCtl小于零表示有其他线程执行到下面的else if,Thread.yield()表示线程让步
                if ((sc = sizeCtl) < 0)
                    Thread.yield(); // lost initialization race; just spin
                //成功将sizeCtl修改为-1后进入else if
                else if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) {
                    try {
                        if ((tab = table) == null || tab.length == 0) {
                            int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
                            @SuppressWarnings("unchecked")
                            Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                            table = tab = nt;
                            //sc=n*0.75
                            sc = n - (n >>> 2);
                        }
                    } finally {
                        //扩容阈值或者转红黑树阈值  0.75n
                        sizeCtl = sc;
                    }
                    break;
                }
            }
            return tab;
        }

- treeifyBin() -

        private final void treeifyBin(Node<K,V>[] tab, int index) {
            Node<K,V> b; int n, sc;
            if (tab != null) {
                //Node数组长度小于64就进行数组扩容
                if ((n = tab.length) < MIN_TREEIFY_CAPACITY)
                    tryPresize(n << 1);
                判断Node存在并且是链表，
                else if ((b = tabAt(tab, index)) != null && b.hash >= 0) {
                    synchronized (b) {
                        //验证数据是否改变
                        if (tabAt(tab, index) == b) {
                            TreeNode<K,V> hd = null, tl = null;
                            //遍历对应的链表，转化为红黑树覆盖存入
                            for (Node<K,V> e = b; e != null; e = e.next) {
                                TreeNode<K,V> p =
                                    new TreeNode<K,V>(e.hash, e.key, e.val,
                                                    null, null);
                                if ((p.prev = tl) == null)
                                    hd = p;
                                else
                                    tl.next = p;
                                tl = p;
                            }
                            setTabAt(tab, index, new TreeBin<K,V>(hd));
                        }
                    }
                }
            }
        }

- tryPresize() -

        //参数size=Node数组的两倍
        private final void tryPresize(int size) {
            //如果size大于或等于限定最大值的一半 c=限定最大值:(size的1.5倍，再加1，再往上取最近的2的n次方)
            int c = (size >= (MAXIMUM_CAPACITY >>> 1)) ? MAXIMUM_CAPACITY :
                tableSizeFor(size + (size >>> 1) + 1);
            int sc;
            while ((sc = sizeCtl) >= 0) {
                Node<K,V>[] tab = table; int n;
                //这里和initTable()代码块一样
                if (tab == null || (n = tab.length) == 0) {
                    n = (sc > c) ? sc : c;
                    if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) {
                        try {
                            if (table == tab) {
                                @SuppressWarnings("unchecked")
                                Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                                table = nt;
                                sc = n - (n >>> 2);
                            }
                        } finally {
                            sizeCtl = sc;
                        }
                    }
                }
                //如果不满足扩容条件就停止扩容（执行上面的if可能会出现）
                else if (c <= sc || n >= MAXIMUM_CAPACITY)
                    break;
                else if (tab == table) {
                    //resizeStamp方法返回 2的15次方+(n的二进制前置补零个数)
                    int rs = resizeStamp(n);
                    //当sizeCtl<0时 表示正在扩容
                    if (sc < 0) {
                        Node<K,V>[] nt;
                        //检查扩容的一些属性是否正常（是否在扩容中），参数不对或已完成扩容就break
                        if ((sc >>> RESIZE_STAMP_SHIFT) != rs || sc == rs + 1 ||
                            sc == rs + MAX_RESIZERS || (nt = nextTable) == null ||
                            transferIndex <= 0)
                            break;
                        //原子操作sizeCtl+1(扩容中的sizeCtl是一个非常大的负数，sizeCtl+1表示有一个线程加入扩容任务)
                        if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1))
                            //协助扩容
                            transfer(tab, nt);
                    }
                    //当sizeCtl>0时，修改sizeCtl值为一个非常大的负数
                    else if (U.compareAndSwapInt(this, SIZECTL, sc,
                                                (rs << RESIZE_STAMP_SHIFT) + 2))
                        transfer(tab, null);
                }
            }
        }

- transfer() -

        //迁移是从根据Node数组下标从后往前迁移,由原Node数组迁移至新Node数组，迁移任务会根据Node数组长度分成多段执行，每段长度是根据cpu计算出来的步进长度，最小步进值为16
        private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
            int n = tab.length, stride;
            //根据cpu线程数计算出一个步进长度，最小值为16
            if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
                stride = MIN_TRANSFER_STRIDE; // subdivide range
            //初次调用时会初始化2n长度的Node数组,扩容完后会重新置为null
            if (nextTab == null) {            // initiating
                try {
                    @SuppressWarnings("unchecked")
                    Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n << 1];
                    nextTab = nt;
                } catch (Throwable ex) {      // try to cope with OOME
                    sizeCtl = Integer.MAX_VALUE;
                    return;
                }
                nextTable = nextTab;
                transferIndex = n;
            }
            int nextn = nextTab.length;
            //在原Node数组每迁移完一个Node元素就用此元素覆盖，用于标记已完成迁移
            ForwardingNode<K,V> fwd = new ForwardingNode<K,V>(nextTab);
            迁移一个元素前advance=false,迁移完一个元素后advance=true
            boolean advance = true;
            boolean finishing = false; // to ensure sweep before committing nextTab
            for (int i = 0, bound = 0;;) {
                Node<K,V> f; int fh;
                while (advance) {
                    int nextIndex, nextBound;
                    //--i >= bound说明在迁移中
                    if (--i >= bound || finishing)
                        advance = false;
                    //transferIndex<=0表示迁移完成或终止
                    //transferIndex用于标记迁移进度
                    else if ((nextIndex = transferIndex) <= 0) {
                        i = -1;
                        advance = false;
                    }
                    //原子操作transferIndex减去一个步进长度或者置为0
                    else if (U.compareAndSwapInt
                            (this, TRANSFERINDEX, nextIndex,
                            nextBound = (nextIndex > stride ?
                                        nextIndex - stride : 0))) {
                        //bound表示当前迁移任务步进到哪个下标
                        bound = nextBound;
                        //i表示准备迁移的元素下标
                        i = nextIndex - 1;
                        advance = false;
                    }
                }
                //迁移完成或者i有问题时进入
                if (i < 0 || i >= n || i + n >= nextn) {
                    int sc;
                    if (finishing) {
                        nextTable = null;
                        table = nextTab;
                        //sizeCtl = 2n*0.75，修改sizeCtl为正数阈值
                        sizeCtl = (n << 1) - (n >>> 1);
                        return;
                    }
                    //原子操作更新sizeCtl--
                    if (U.compareAndSwapInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {
                        //不等于迁移前赋值的负数就直接return
                        //等于迁移前赋值的负数就表示迁移完成
                        if ((sc - 2) != resizeStamp(n) << RESIZE_STAMP_SHIFT)
                            return;
                        finishing = advance = true;
                        i = n; // recheck before commit
                    }
                }
                //跳过下标为i的Node，并标记为已迁移
                else if ((f = tabAt(tab, i)) == null)
                    advance = casTabAt(tab, i, null, fwd);
                //已经迁移的跳过
                else if ((fh = f.hash) == MOVED)
                    advance = true; // already processed
                else {
                    synchronized (f) {
                        if (tabAt(tab, i) == f) {
                            Node<K,V> ln, hn;
                            if (fh >= 0) {
                                int runBit = fh & n;
                                Node<K,V> lastRun = f;
                                //此for遍历链表所有元素
                                //lastRun记录链表在该Node后所有的Node的（hash & n）相同，没有相同则是最后一个Node
                                for (Node<K,V> p = f.next; p != null; p = p.next) {
                                    int b = p.hash & n;
                                    if (b != runBit) {
                                        runBit = b;
                                        lastRun = p;
                                    }
                                }
                                //不知道为啥要分为0和其他数
                                if (runBit == 0) {
                                    ln = lastRun;
                                    hn = null;
                                }
                                else {
                                    hn = lastRun;
                                    ln = null;
                                }
                                //此for遍历链表元素到lastRun元素
                                for (Node<K,V> p = f; p != lastRun; p = p.next) {
                                    int ph = p.hash; K pk = p.key; V pv = p.val;
                                    //把ph & n == 0的分为一个链表
                                    if ((ph & n) == 0)
                                        ln = new Node<K,V>(ph, pk, pv, ln);
                                    //把ph & n != 0的分为一个链表
                                    else
                                        hn = new Node<K,V>(ph, pk, pv, hn);
                                }
                                setTabAt(nextTab, i, ln);
                                setTabAt(nextTab, i + n, hn);
                                setTabAt(tab, i, fwd);
                                advance = true;
                            }
                            else if (f instanceof TreeBin) {
                                TreeBin<K,V> t = (TreeBin<K,V>)f;
                                TreeNode<K,V> lo = null, loTail = null;
                                TreeNode<K,V> hi = null, hiTail = null;
                                int lc = 0, hc = 0;
                                for (Node<K,V> e = t.first; e != null; e = e.next) {
                                    int h = e.hash;
                                    TreeNode<K,V> p = new TreeNode<K,V>
                                        (h, e.key, e.val, null, null);
                                    if ((h & n) == 0) {
                                        if ((p.prev = loTail) == null)
                                            lo = p;
                                        else
                                            loTail.next = p;
                                        loTail = p;
                                        ++lc;
                                    }
                                    else {
                                        if ((p.prev = hiTail) == null)
                                            hi = p;
                                        else
                                            hiTail.next = p;
                                        hiTail = p;
                                        ++hc;
                                    }
                                }
                                ln = (lc <= UNTREEIFY_THRESHOLD) ? untreeify(lo) :
                                    (hc != 0) ? new TreeBin<K,V>(lo) : t;
                                hn = (hc <= UNTREEIFY_THRESHOLD) ? untreeify(hi) :
                                    (lc != 0) ? new TreeBin<K,V>(hi) : t;
                                setTabAt(nextTab, i, ln);
                                setTabAt(nextTab, i + n, hn);
                                setTabAt(tab, i, fwd);
                                advance = true;
                            }
                        }
                    }
                }
            }
        }

<div id="gitalk-container-parsing-concurrentHashMap"></div>

<script>
  $(document).ready(function() {
    window.initParsingConcurrentHashMapComment();
  })
</script>