---
layout: post
title: vue前端图片压缩上传
categories: vue image
---


## 1.vue Vant上传图片压缩图片

    <template>
    <div>
        <van-uploader :before-read="beforeRead" />
    </div>
    </template>
    <script>
    import {Uploader} from 'vant'
    export default {
        components:{
            [Uploader.name]: Uploader
        },
        data:function() {
            return {
                wfw: []
            };
        },
        methods: {
        beforeRead(file) {
            var self = this;
            // 创建一个reader
            let reader = new FileReader()
            // 将图片2将转成 base64 格式
            reader.readAsDataURL(file)
            // 读取成功后的回调
            reader.onloadend = function() {
                let result = this.result
                let img = new Image()
                img.src = result
                //判断图片是否大于500K,是就直接上传，反之压缩图片
                if (this.result.length <= 0 * 1024) {
                // 上传图片
                //self.postImg(this.result);
                } else {
                img.onload = function() {
                    let data = self.compress(img);
                    var a = document.createElement("a"); // 生成一个a元素
                    var event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = file.name || "photo"; // 设置图片名称
                    a.href = data; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                    // 上传图片
                    //self.postImg(data);
                }
                }
            }
        },

        // 压缩图片
        compress: function(img) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            // let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = (width * height) / 4000000) > 1) {
                // console.log("大于400万像素");
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //    铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = (width * height) / 1000000) > 1) {
                // console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //      计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(
                            img,
                            i * nw * ratio,
                            j * nh * ratio,
                            nw * ratio,
                            nh * ratio,
                            0,
                            0,
                            nw,
                            nh
                        );
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            let ndata = canvas.toDataURL("image/jpeg", 0.3);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
        }
        }
    };
    </script>


