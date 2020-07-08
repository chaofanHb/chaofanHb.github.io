---
layout: post
title: Oracle分析函数over
categories: sql oracle
---

聚合函数（如sum()、max()等）可以计算基于组的某种聚合值，但是聚合函数对于某个组只能返回一行记录。若想对于某组返回多行记录，则需要使用分析函数over()。

## 语法

分析函数带有一个开窗函数over()，包含三个分析子句:

分组(partition by)
排序(order by)
窗口(rows)

窗口函数语法：

第一行至当前行：
{% highlight ruby %}
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
{% endhighlight %}
当前行至最后一行：
{% highlight ruby %}
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
{% endhighlight %}
当前行的上一行(rownum-1)到当前行：
{% highlight ruby %}
ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
{% endhighlight %}
当前行的上一行(rownum-1)到当前行的下辆行(rownum+2)：
{% highlight ruby %}
ROWS BETWEEN 1 PRECEDING AND 2 FOLLOWING
{% endhighlight %}

## 示例

根据用户查询每个应用的消息数和每个应用的第一条消息的文本

{% highlight ruby %}
select * from (select T_HTHZ_XX_YDMX.*, T_HTHZ_XX_FSDL.clsj, temp1.*,T_HTHZ_XX_FSDL.xxwb, (select count(*) from T_HTHZ_XX_YDMX t 
where t.tzdx = ? and t.ydsj is null and t.ywxt = t_hthz_xx_ydmx.ywxt) num,ROW_NUMBER() over(partition by T_HTHZ_XX_YDMX.ywxt 
order by T_HTHZ_XX_FSDL.clsj desc) rn from T_HTHZ_XX_YDMX left join T_HTHZ_XX_FSDL on T_HTHZ_XX_FSDL.dlbm = T_HTHZ_XX_YDMX.dlbmleft 
join (select yymc, yyid, STORE_NAME from T_HTHZ_MH_FWDTYY, T_HTHZ_SYS_FILE_INDEX where T_HTHZ_MH_FWDTYY.YYTB = 
T_HTHZ_SYS_FILE_INDEX.STORE_TOKEN and T_HTHZ_MH_FWDTYY.YYZT='Y' and T_HTHZ_MH_FWDTYY.QYSJ <= sysdate and (T_HTHZ_MH_FWDTYY.TYSJ is 
null or T_HTHZ_MH_FWDTYY.TYSJ >= sysdate) ) temp1 on temp1.yyid = T_HTHZ_XX_YDMX.ywxtwhere T_HTHZ_XX_YDMX.tzdx = ?) temp2 where 
rn = 1 order by clsj desc
{% endhighlight %}


<div id="gitalk-container-oracle-over"></div>

<script>
  $(document).ready(function() {
    window.initOracleOverComment();
  })
</script>