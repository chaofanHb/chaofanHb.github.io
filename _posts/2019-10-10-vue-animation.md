---
layout: post
title: vue横向切换动画
category: vue
tags: [vue]
---

应公司需求在写完一个后勤系统后，需要对其进行移动端的拓展。并学习了vue，接触到一个横向切换页面的过渡动画。

## CSS 动画（基于vue）

### 1.加入动画组件transition标签

    <transition :name='transitionName'>
      <keep-alive exclude='JdInfo'>
      </keep-alive>
    </transition>

并绑定一个动态属性名。

### 2.添加路由监听事件，确定向左向右滑动方向

    watch: {
      //使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > from.meta.index){
        //设置动画名称
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = 'slide-right';
        }
      }
    }

route.meta.index需要在路由设置好，规定好顺序层次。

    {
        path: '/sy',
        name: 'ShouYe',
        meta:{index:1},
        component: ShouYe
    }

### 3.添加css3的层叠样式\([translateX函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translateX)\)

    //向右滑动
    .slide-left-enter{
      opacity: 0;
      transform: translateX(100%);
    }
    .slide-left-leave-to{
      opacity:0 ;
      transform: translateX(-100%);
      position: absolute;
    }
    .slide-left-enter-active,.slide-left-leave-active{
      transition: all .3s ease
    }
    //向左滑动
    .slide-right-enter{
      opacity: 0;
      transform: translateX(-100%);
    }
    .slide-right-leave-to{
      opacity:0 ;
      transform: translateX(100%);
      position: absolute;
    }
    .slide-right-enter-active,.slide-right-leave-active{
      transition: all .3s ease
    }

npm run dev 运行即可。

<div id="gitalk-container-vue-animation"></div>

<script>
  $(document).ready(function() {
    window.initVueAnimationComment();
  })
</script>