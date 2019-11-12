---
layout: post
title: Bookmarks
subtitle: <span class="mega-octicon octicon-repo"></span>&nbsp;&nbsp; To mark useful libs - tools - books
menu: Bookmark
---

## Spring
　　Spring大约分为20个模块，这些模块分为核心容器、数据访问/集成、Web、AOP、Instrumentation、消息和测试，如下图所示：
![spring模块图]({{ site.url }}/assets/images/spring-module.png)

## Maven
- 使用maven下载jar包，经常会遇到下载失败的情况,如果失败的jar包过多,或是不清楚到底有那些jar包在下载过程中出现了问题.可通过maven命令重新批量下载未成功的jar包.

        mvn clean install -U 

- [greenDAO](http://greendao-orm.com/) - greenDAO is a light and fast ORM solution that maps objects to SQLite databases
- [EventBus](http://greenrobot.github.io/EventBus/) - Android optimized event bus that simplifies communication

## jdk
- 生成密钥

		keytool -genkey -alias cas -keyalg RSA -keysize 2048 -keypass changeit -storepass changeit -keystore casexample.keystore -dname "CN=cas.example.org,OU=casexample.com,O=casexample,L=casexample,ST=casexample,C=CN" -deststoretype pkcs12

- 导出公钥

		keytool -export -keystore d:\zlex.keystore -alias www.zlex.org -file d:\zlex.cer -rfc

- 导入公钥

		keytool -import -v -trustcacerts -alias taobao -file taobao.cer -storepass changeit -keystore %JAVA_HOME%/jre/lib/security/cacerts

- 查看密钥

		keytool -list -v -keystore d:\zlex.keystore -storepass changeit
		keytool -list -v -alias cas -keystore %JAVA_HOME%/jre/lib/security/cacerts -storepass changeit


### Symfony
- [NelmioApiDocBundle](https://github.com/nelmio/NelmioApiDocBundle) - Generate a decent documentation for your APIs
- [FOSRestBundle](http://symfony.com/doc/current/bundles/FOSRestBundle/index.html) - Creat a REST API with Symfony2

## Javascript
- [fullPage.js](http://alvarotrigo.com/fullPage/) - To create fullscreen scrolling websites / single page websites
- [lunr.js](http://lunrjs.com/) - Simple full-text search
- [Trip.js](http://eragonj.github.io/Trip.js/index.html) - Help you customize a tutorial trip easily with more flexibilities
- [Moment.js](http://momentjs.com/) - Parse, validate, manipulate, and display dates in JavaScript.
- [Underscore.js](http://underscorejs.org/) - It provides a whole mess of useful functional programming helpers without extending any built-in objects.

### AngularJs
- [Protractor](http://angular.github.io/protractor) - End-to-end test framework for AngularJS applications
- [angular-media-player](https://github.com/colthreepv/angular-media-player) - Directive for audio and video
- [Smart table](http://lorenzofox3.github.io/smart-table-website/) - Module to easily display data in a table
- [ng-table](http://esvit.github.io/ng-table/#/) - Module to easily display data in a table
- [ngToast](https://github.com/tameraydin/ngToast) - AngularJS toast
- [ANGM-GENERATOR](http://newaeonweb.com.br/generator-angm/) - AngularJS Yeoman Generator

### Node.js
- [utility](https://github.com/node-modules/utility) - A collection of useful utilities
- [cheerio](https://github.com/cheeriojs/cheerio) - Implementation of core jQuery designed specifically for the server
- [mongoose](http://mongoosejs.com/) - elegant mongodb object modeling for node.js
- [SuperAgent](http://visionmedia.github.io/superagent/) - Super Agent is light-weight progressive ajax API
- [connect-mongo](https://github.com/kcbanner/connect-mongo) - MongoDB session store for Express and Connect
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js

## CSS
- [loaders.css](https://connoratherton.com/loaders) - Delightful and performance-focused pure css loading animations
- [Load Awesome](http://github.danielcardoso.net/load-awesome/animations.html) - Pure CSS Loaders and Spinners 
- [Hover.css](http://ianlunn.github.io/Hover/) - Collection of CSS3 powered hover effects
- [Animate.css](https://github.com/daneden/animate.css) - Bunch of cool, fun, and cross-browser animation. 

## Front-end web UI/Framework
- [Bootstrap](http://getbootstrap.com/) - HTML, CSS, and JS framework for developing responsive, mobile first projects on the web
- [Angular-Material](https://material.angularjs.org/latest/) - Implementation of Google's Material Design Specification

## Fonts
- [Google Fonts](https://www.google.com/fonts) - So it's google fonts :D

## Icons
- [Github-Octicons](https://octicons.github.com/) - GitHub's icons
- [Font-Awesome](https://fortawesome.github.io/Font-Awesome/) - Scalable vector icons that can instantly be customized
- [Iconfont](http://www.iconfont.cn/) - Alibaba Icon Library (Chinese)
- [flag-icon-css](http://lipis.github.io/flag-icon-css/) - Country Flags
- [weloveiconfonts](http://weloveiconfonts.com/) - Icon fonts
- [Material Icon](https://design.google.com/icons/#ic_accessibility) - Material icons

## Color
- [Minimalist-Color-Palettes](https://www.behance.net/gallery/32154055/Minimalist-Color-Palettes-2015) - Minimalist Color Palettes

## Tool
- [ProcessOn](https://www.processon.com/) - UML web app for team (Chinese)
- [draw.io](https://www.draw.io/) - UML web app for team
- [WinSCP](https://winscp.net/eng/download.php) - SFTP, SCP and FTP client for Windows

## Books
- [GitHub Cheat Sheet](https://github.com/tiimgreen/github-cheat-sheet) - GitHub Practical Tips
- [Git Quick Reference](http://jonas.nitro.dk/git/quick-reference.html) - Git Quick Reference
- [HTTP API Design Guide](https://geemus.gitbooks.io/http-api-design/content/en/index.html) - HTTP+JSON API design practices
