---
layout: post
title: Vue的前端表单传参
categories: vue
---

vue项目在前后端分离的情况下如何正确的进行表单传参。

## 前端基础组件预装

    npm install axios -S

注册到vue全局组件，在main.js添加

    {% highlight ruby %}
    import Vue from 'vue'
    import App from './App.vue'
    import router from '../../router/wxfwdt.js'
    import store from '../../store'
    import axios from 'axios'
    axios.defaults.baseURL = '/wxfwdt';
    axios.defaults.withCredentials = true;
    Vue.prototype.$axios = axios
    new Vue({
    router,
    store,
    render: h => h(App)
    }).$mount('#app')
    {% endhighlight %}

## 提交表单

创建表单参数，直接请求

    var formData = new FormData();
    formData.append("dict", ['GRJKQK','YGLPT_TYSF']);
    this.$axios.post('/xxx.do', formData).then(res => {
        console.log(res.data);
    })

## 提交json

    this.$axios.post('/xxx.do', {wid: '111', name: '222'}).then(res => {
        console.log(res.data);
    })

## 踩坑笔记

    v-for循环里： 双向绑定的数据不会被watch函数监听，可以使用计算值代替监听，
    数组对象的监听可开启深度监听：deep:true