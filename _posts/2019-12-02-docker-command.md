---
layout: post
title: docker常用命令
categories: docker
---

## docker容器操作的常用命令集合

    docker run --name 容器名字 --net=host(共享主机网络) -p 192.168.99.100:22122:22122 -v 宿主机文件夹:容器内文件夹 镜像名称 启动后的命令
    
    docker exec -it 容器名字 bash -c '多条命令'



<div id="gitalk-container-docker-command"></div>

<script>
  $(document).ready(function() {
    window.initDockerCommandComment();
  })
</script>