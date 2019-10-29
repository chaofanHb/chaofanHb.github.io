---
layout: post
title: vant中List列表的条件搜索
categories: vue vant
---

今天测试程序时发现了一个页面bug，vant中添加搜索条件后的List列表滚动分页失效

## List列表滚动分页失效
![图片1]({{ site.url }}/assets/images/vue-vant-list.png)
搜索按钮事件

    //搜索按钮事件
    onSearch: function(){
      this.list=[]
      this.pageParm.pageNum = 0
      //this.finished = false
      //self.loading = true
      this.onLoad();
    }

在此处修改List列表的绑定属性finished会使List的分页功能混乱

    onLoad() {
          this.pageParm.pageNum++
          axios.post('/api/sy/list', this.pageParm).then((res)=>{
                        if(res.code === 'success'){
                            this.list.push.apply(this.list, res.data.datas)
                            this.loading = false
                            if(res.data.isEnd){
                              this.finished = true
                            }else{
                              this.finished = false
                            }
                        }else{
                            this.error = true
                            this.loading = false
                        }
                    });
    }

可以在请求后根据后台返回的数据isEnd判断List是否完成全部查询。

<div id="gitalk-container-vue-vant-list"></div>

<script>
  $(document).ready(function() {
    window.initVueVantListComment();
  })
</script>