---
layout: post
title: 容器化部署FastDFS服务
categories: docker fastdfs
---

FastDFS是一个开源的轻量级分布式文件系统.

## 基础镜像

 选择season/fastdfs:1.2, season/fastdfs:latest不带nginx

    docker pull season/fastdfs:1.2

## 创建跟踪服务器(Tracker Server)

    docker run -it -d --name trakcer -v /fastdfs/tracker/data:/fastdfs/tracker/data --net=host season/fastdfs:1.2 tracker

默认启动22122端口，挂载文件目录，使用共享主机模式。

## 创建存储服务器(Storage Server)

    docker run -it --name storage -v /fastdfs/storage/data:/fastdfs/storage/data -v /fastdfs/store_path:/fastdfs/store_path --net=host -e TRACKER_SERVER:宿主机IP:22122 season/fastdfs:1.2 storage

启动后需要修改容器内的文件

    docker cp storage:/fdfs_conf/storage.conf ./

修改

    base_path=/fastdfs/storage
    store_path0=/fastdfs/store_path
    tracker_server=宿主机IP:22122

拷贝回去

    docker cp ./storage.conf storage:/fdfs_conf/storage.conf

重启容器，出现如下日志表示成功

![图片1]({{ site.url }}/assets/images/fastdfs_storage.png)

## 部署nginx

    docker run --name fastdfs-nginx -v /fastdfs/fastdfs-nginx/mod_fastdfs.conf:/fastdfs-nginx-module/src/mod_fastdfs.conf -v /fastdfs/fastdfs-nginx/nginx.conf:/etc/nginx/conf/nginx.conf -v /fastdfs/store_path:/fastdfs/store_path --net=host -e TRACKER_SERVER:宿主机IP:22122 season/fastdfs:1.2 nginx

出现如下提示

![图片2]({{ site.url }}/assets/images/fastfdfs_nginx.png)

### 修改nginx配置nginx.conf

    server {
        listen       8888;
        server_name  localhost;
 
        #charset koi8-r;
 
        #access_log  logs/host.access.log  main;
 
        location /group1/M00 {
            root /fastdfs/store_path/data;
            ngx_fastdfs_module;
        }
 
        #error_page  404              /404.html;
 
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

### 修改fastfdfs-nginx-module配置mod_fastdfs.conf

    tracker_server=宿主机IP:22122
    url_have_group_name=true
    store_path0=/fastdfs/store_path

### 重启nginx

    docker exec -it fastdfs-nginx bash -c 'cp /fastdfs-nginx-module/src/mod_fastdfs.conf /etc/fdfs/mod_fastdfs.conf && /etc/nginx/sbin/nginx -s reload'

出现如下日志表示成功

![图片3]({{ site.url }}/assets/images/fastfdfs-nginx1.png)

<div id="gitalk-container-docker-fastdfs-dev"></div>

<script>
  $(document).ready(function() {
    window.initDockerFastDFSDevComment();
  })
</script>