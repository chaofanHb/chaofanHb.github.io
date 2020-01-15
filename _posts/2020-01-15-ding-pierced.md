---
layout: post
title: 钉钉内网穿透工具
categories: http other
---

ngrok 是一个反向代理，通过在公共的端点和本地运行的 Web 服务器之间建立一个安全的通道。ngrok 可捕获和分析所有通道上的流量，便于后期分析和重放。Sunny ngrok不太稳定，后台修改频繁。后来发现了钉钉内网穿透工具，通道流畅稳定。

## 下载工具


    git clone https://github.com/open-dingtalk/pierced.git 

或者

[钉钉内网穿透工具2020-01-15]({{ site.url }}/assets/my/ding/pierced-master.zip)


## 启动

\pierced-master\windows_64路径下创建启动脚本start.bat 

    ding.exe -config=ding.cfg -subdomain=hebin 6080
    % 启动后访问 hebin.vaiwan.com%

<div id="gitalk-container-ding-pierced"></div>

<script>
  $(document).ready(function() {
    window.initDingPiercedComment();
  })
</script>