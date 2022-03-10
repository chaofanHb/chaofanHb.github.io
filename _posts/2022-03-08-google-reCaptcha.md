---
layout: post
title: Google 人机验证(reCaptcha)无法显示解决方案
categories: reCaptcha
---

(转自https://blog.azurezeng.com/)
前言：为了防止机器人攻击，国外很多网站都使用了 Google reCaptcha 验证码。reCaptcha 对于国外用户非常的友好，但是… 对于国内用户就不怎么友好了。究其原因，则是国内网络全线屏蔽 Google 服务，导致 reCaptcha 完全加载不出来。这样，国内玩家就无法在对应的网站进行下一步操作了。本方案可以解决 reCaptcha 无法加载的问题。

## 1.适用平台

    Chrome 电脑版

## 2.安装插件

下载[HeaderEditor]({{ site.url }}/assets/files/HeaderEditor.zip)，将解压的文件拖拽到谷歌浏览器的扩展程序页面安装。

## 2.配置插件

打开 Header Editor 插件的配置页面，选择 “导入和导出” 选项。本地导入：新建HE-GoogleRedirect.json文件，copy下方内容写入文件，导入该文件。

    {
        "request": [
            {
                "enable": true,
                "name": "Google APIs",
                "ruleType": "redirect",
                "matchType": "regexp",
                "pattern": "^http(s?)://ajax\\.googleapis\\.com/(.*)",
                "exclude": "",
                "isFunction": false,
                "action": "redirect",
                "to": "https://gapis.geekzu.org/ajax/$2",
                "group": "Google Redirect"
            },
            {
                "enable": true,
                "name": "reCaptcha",
                "ruleType": "redirect",
                "matchType": "regexp",
                "pattern": "^http(s?)://(?:www\\.|recaptcha\\.|)google\\.com/recaptcha/(.*)",
                "exclude": "",
                "isFunction": false,
                "action": "redirect",
                "to": "https://recaptcha.net/recaptcha/$2",
                "group": "Google Redirect"
            }
        ],
        "sendHeader": [],
        "receiveHeader": [
            {
                "enable": true,
                "name": "Content Security Policy Header Modification",
                "ruleType": "modifyReceiveHeader",
                "matchType": "all",
                "pattern": "",
                "exclude": "",
                "isFunction": true,
                "code": "let rt = detail.type;\nif (rt === 'script' || rt === 'stylesheet' || rt === 'main_frame' || rt === 'sub_frame') {\n  for (let i in val) {\n    if (val[i].name.toLowerCase() === 'content-security-policy') {\n      let s = val[i].value;\n      s = s.replace(/googleapis\\.com/g, '$& https://gapis.geekzu.org');\n      s = s.replace(/recaptcha\\.google\\.com/g, '$& https://recaptcha.net');\n      s = s.replace(/google\\.com/g, '$& https://recaptcha.net');\n      s = s.replace(/gstatic\\.com/g, '$& https://*.gstatic.cn');\n      val[i].value = s;\n    }\n  }\n}",
                "group": "Google Redirect"
            }
        ]
    }

    点击保存即可。
