---
layout: post
title: Yummy-Jekyll踩坑日记
category: jekyll 
tags: [jekyll]
---

在使用jeckyll+githubPages+gitalk搭建完个人博客后，多多少少踩了些坑，其中有个本地环境问题折磨了我一天半。

## Yummy-Jekyll的项目环境搭建

### 1.安装ruby
[下载ruby2.2.6](https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.2.6-x64.exe)
[下载DevKit](https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe)

为什么下载2.2.6版本的呢，因为[Yummy-Jekyll](https://github.com/DONGChuan/Yummy-Jekyll)项目里的依赖有一个nokogiri 1.6.7-x64-mingw32包，该包需要ruby version < 2.3, >= 1.9.2。

gems版本依赖关系可以[去这查询](https://rubygems.org)

直接安装exe。

![注意勾选图示的两个选项。]({{ site.url }}/assets/images/install-ruby.png)

安装完成后，在powershell里面运行 ruby -v显示当前的安装版本。

### 2.安装DevKit

在Windows上，没有在Linux上非常方便的Tool chain，比如gcc, make, sh,可以编译很多以源代码发布的Gem包。但是，对于初次在Windows上使用Ruby的用户来说，安装一个只有源代码的gem包，门槛还是不低的。

所以Ruby社区发布了DevKit（基于MSYS，MINGW）。

下载后，双击后，会解压到文件所在目录，这里随便选择（c:\DevKit）：
![DevKit图片1]({{ site.url }}/assets/images/install-ruby-1.png)

cd到这个目录，执行安装，同样使用powershell：
{% highlight ruby %}
ruby dk.rb init
{% endhighlight %}

这一步会在当前目录生成 config.yml，在里面加入以下配置，也就是步骤1安装ruby的路径
{% highlight ruby %}
---
 - D:\rudy\Ruby22-x64
 {% endhighlight %}


 修改完后 继续执行
{% highlight ruby %}
 ruby dk.rb install
{% endhighlight %}

安装就完成了

### 3.下载Yummy-Jekyll并配置测试环境

[Yummy-Jekyll源码]({{ site.url }}/assets/files/Yummy-Jekyll-master.zip)

安装bower，bundle。
{% highlight ruby %}
gem install bower
{% endhighlight %}

{% highlight ruby %}
gem install bundle -v '1.17.0'
{% endhighlight %}

这里的bundle最好带上版本，不然默认安装最新的，最新的bundle要求ruby version >= 2.3.0。

{% highlight ruby %}
gem install jekyll
{% endhighlight %}

这里安装jekyll，[jekyll指南](http://jekyllcn.com/docs/home/)

由于Yummy-Jekyll用到了github的api，所以还需要配置个人github的令牌.
[获取令牌指南](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
添加系统环境变量(值为上面获取的个人令牌)
{% highlight ruby %}
JEKYLL_GITHUB_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
{% endhighlight %}

[获取密钥](https://curl.haxx.se/ca/cacert.pem)
添加系统环境变量(值为密钥完整的路径，如D:\java\demo\cacert.pem)
{% highlight ruby %}
SSL_CERT_FILE=D:\java\demo\cacert.pem
{% endhighlight %}

重启计算机。

### 3.启动Yummy-Jekyll
修改Yummy-Jekyll源码根目录下的_config.yml文件。
![图片2]({{ site.url }}/assets/images/install-ruby-2.png)
repository：填写自己的githubPages地址
url：本地测试时填写：http://localhost:4000，提交到git仓库时填写githubPages地址

启动项目
{% highlight ruby %}
jekyll serve
{% endhighlight %}
看到如下提示就表示启动成功了
![图片3]({{ site.url }}/assets/images/install-ruby-3.png)

直接访问[http://localhost:4000](http://localhost:4000)就行了
