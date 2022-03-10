// Window Scroll
var windowScroll = function () {
    $(window).scroll(function () {

        var scrollPos = $(this).scrollTop();
        
        var system ={win : false,mac : false,xll : false};
        //���ƽ̨
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        //�ж�ƽ̨����
        if(system.win||system.mac||system.xll){
            if ($(window).scrollTop() > 70)
            {
                $('.site-header').addClass('site-header-nav-scrolled');
            } else {
                $('.site-header').removeClass('site-header-nav-scrolled');
            }
        }else{
            //������ֻ��򽫶����Ƴ�����
            if ($(window).scrollTop() > 40) 
            {
                $('.site-header').addClass('site-header-nav-scrolled-ph');
            } else {
                $('.site-header').removeClass('site-header-nav-scrolled-ph');
            }
        }
 });
};

var getGitalk = function(id){
    return new Gitalk({
        clientID: '9551248533449b4a4385', //Client ID
        clientSecret: '2df193c2832debdf6d5bea6e676690d0bc7f81e3', //Client Secret
        repo: 'blogtalk',//仓库名称
        owner: 'chaofanHb',//仓库拥有者
        admin: ['chaofanHb'],
        id: id,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
      })
}

window.initVueAnimationComment = function(){
    var gitalk = getGitalk("vue-animation");
    gitalk.render('gitalk-container-vue-animation')
}

window.initYummyJekyllCKRJComment = function(){
    var gitalk = getGitalk("Yummy-Jekyll-ckrj");
    gitalk.render('gitalk-container-yummy-jekyll-ckrj')
}
window.initVueVantListComment = function(){
    var gitalk = getGitalk("vue-vant-list");
    gitalk.render('gitalk-container-vue-vant-list')
}
window.initOperationComment = function(){
    var gitalk = getGitalk("java-operation");
    gitalk.render('gitalk-container-java-operation')
}
window.initParsingConcurrentHashMapComment = function(){
    var gitalk = getGitalk("parsing-concurrentHashMap");
    gitalk.render('gitalk-container-parsing-concurrentHashMap')
}
window.initMavenVersionComment = function(){
    var gitalk = getGitalk("maven-version");
    gitalk.render('gitalk-container-maven-version')
}

window.initJVMAComment = function(){
    var gitalk = getGitalk("jvm-a");
    gitalk.render('gitalk-container-jvm-a')
}
window.initJVMBComment = function(){
    var gitalk = getGitalk("jvm-b");
    gitalk.render('gitalk-container-jvm-b')
}
window.initJVMCComment = function(){
    var gitalk = getGitalk("jvm-c");
    gitalk.render('gitalk-container-jvm-c')
}
window.initJVMDComment = function(){
    var gitalk = getGitalk("jvm-d");
    gitalk.render('gitalk-container-jvm-d')
}
window.initJVMEComment = function(){
    var gitalk = getGitalk("jvm-e");
    gitalk.render('gitalk-container-jvm-e')
}
window.initJVMFComment = function(){
    var gitalk = getGitalk("jvm-f");
    gitalk.render('gitalk-container-jvm-f')
}
window.initJVMGComment = function(){
    var gitalk = getGitalk("jvm-g");
    gitalk.render('gitalk-container-jvm-g')
}
window.initJVMHComment = function(){
    var gitalk = getGitalk("jvm-h");
    gitalk.render('gitalk-container-jvm-h')
}
window.initJVMIComment = function(){
    var gitalk = getGitalk("jvm-i");
    gitalk.render('gitalk-container-jvm-i')
}
window.initJVMJComment = function(){
    var gitalk = getGitalk("jvm-j");
    gitalk.render('gitalk-container-jvm-j')
}
window.initJVMKComment = function(){
    var gitalk = getGitalk("jvm-k");
    gitalk.render('gitalk-container-jvm-k')
}
window.initJVMLComment = function(){
    var gitalk = getGitalk("jvm-l");
    gitalk.render('gitalk-container-jvm-l')
}
window.initJVMMComment = function(){
    var gitalk = getGitalk("jvm-m");
    gitalk.render('gitalk-container-jvm-m')
}
window.initJVMNComment = function(){
    var gitalk = getGitalk("jvm-n");
    gitalk.render('gitalk-container-jvm-n')
}
window.initJVMZComment = function(){
    var gitalk = getGitalk("jvm-z");
    gitalk.render('gitalk-container-jvm-z')
}
window.initJavaWordComment = function(){
    var gitalk = getGitalk("java-word");
    gitalk.render('gitalk-container-java-word')
}

window.initCasServerComment = function(){
    var gitalk = getGitalk("cas-server");
    gitalk.render('gitalk-container-cas-server')
}
window.initLibTransformComment = function(){
    var gitalk = getGitalk("lib-transform");
    gitalk.render('gitalk-container-lib-transform')
}
window.initHttpRpcComment = function(){
    var gitalk = getGitalk("http-rpc");
    gitalk.render('gitalk-container-http-rpc')
}
window.initOkhttp3RpcComment = function(){
    var gitalk = getGitalk("okhttp3-rpc");
    gitalk.render('gitalk-container-okhttp3-rpc')
}

window.initDockerWindowsInstallComment = function(){
    var gitalk = getGitalk("docker-windows-install");
    gitalk.render('gitalk-container-docker-windows-install')
}
window.initDockerCommandComment = function(){
    var gitalk = getGitalk("docker-command");
    gitalk.render('gitalk-container-docker-command')
}
window.initDockerFastDFSDevComment = function(){
    var gitalk = getGitalk("docker-fastdfs-dev");
    gitalk.render('gitalk-container-docker-fastdfs-dev')
}
window.initFastDFSSpringbootComment = function(){
    var gitalk = getGitalk("fastdfs-springboot");
    gitalk.render('gitalk-container-fastdfs-springboot')
}

window.initDingPiercedComment = function(){
    var gitalk = getGitalk("ding-pierced");
    gitalk.render('gitalk-container-ding-pierced')
}

window.initOracleOverComment = function(){
    var gitalk = getGitalk("oracle-over");
    gitalk.render('gitalk-container-oracle-over')
}

window.initDockerMysqlComment = function(){
    var gitalk = getGitalk("docker-mysql");
    gitalk.render('gitalk-container-docker-mysql')
}

window.initDockerOracleInstallComment = function(){
    var gitalk = getGitalk("docker-oracle-install");
    gitalk.render('gitalk-container-docker-oracle-install')
}

window.initSpringbootSeataDemoComment = function(){
    var gitalk = getGitalk("springboot-seata-demo");
    gitalk.render('gitalk-container-springboot-seata-demo')
}

//动态加载一个js/css文件
function loadjscssfile(filename, filetype, callback){
    if (filetype=="js"){
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src",filename)
    }
    else if (filetype=="css"){
    var fileref=document.createElement("link")
    fileref.setAttribute("rel","stylesheet")
    fileref.setAttribute("type","text/css")
    fileref.setAttribute("href",filename)
    }

    if (fileref.addEventListener) {
        fileref.addEventListener('load', function () {
          callback();
        }, false);
      } else if (fileref.attachEvent) {
        fileref.attachEvent('onreadystatechange', function () {
          var target = window.event.srcElement;
          if (target.readyState == 'loaded') {
            callback();
          }
        });
      }
    

    if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}
    

//移动已经加载过的js/css
function removejscssfile(filename,filetype){
    var targetelement=(filetype=="js")? "script" :(filetype=="css")? "link" : "none"
    var targetattr=(filetype=="js")?"src" : (filetype=="css")? "href" :"none"
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0;i--){
    if (allsuspects[i] &&allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
     allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}
    

//nva点击的伪路由
var hebin,hebin2;
function navClick(href, label){
    $(".raining").remove();
    var dev = $("#dev").val();
    var url = $("#baseUrl").val();
    $.ajax({
        url: (dev && dev === 'true')?href:(href === '/'?(url+'/index.html'):(url+href+'.html')),
        type: "GET",
        dataType: "html",
        success: function(data) {
                if(dev && dev === 'true'){
                    window.location.href='/#'+label;
                }
                removejscssfile('/assets/css/indexs.css','css')
                hebin = $(data.substring(data.indexOf('<body>'), data.indexOf('</body>')+7));
                //动态添加js
                $("#routeContent").html($(hebin.get(3)).html());
                $($(hebin.get(5)).children().get(3)).appendTo("#routeContent")
                //动态添加css
                hebin2 = $(data.substring(data.indexOf('<head>'), data.indexOf('</head>')+7));
                var dataSize = hebin2.length;
                for(var i=39; i<dataSize; i++){
                    var t = hebin2.get(i);
                    if(t.nodeName && t.nodeName === 'LINK'){
                        $(t).appendTo("#routeContent")
                    }
                }
    
                if(href === '/'){
                    var month = new Date().getMonth();
                    if(month == 0 || month == 1){
                        var t = $("#baseUrl").val()+"/assets/snowflakeBackground/images/snow_bk.jpg";
                        $(".jumbotron").css("background-image","url('"+t+"')");
                    }
                    $("#xuehua").show();
                    $(".site-header").css("background", "");
                    $(".site-header #site-header-brand").css("color","#fff")
                    $(".site-header .site-header-nav-item").css("color","#9acfea")
                }else{
                    $("#xuehua").hide();
                    $(".site-header").css("background", "#fff");
                    $(".site-header #site-header-brand").css("color","#000")
                    $(".site-header .site-header-nav-item").css("color","#000")
                }
    
                //为超链接加上target='_blank'属性
                $('a[href^="http"]').each(function() {
                    $(this).attr('target', '_blank');
                });

                $("#routeContent").animate({"opacity":"1"})
            
            
            
        }
    });
}

$( document ).ready(function() {
    windowScroll();

    //为超链接加上target='_blank'属性
	$('a[href^="http"]').each(function() {
		$(this).attr('target', '_blank');
    });


    // 小心心效果
    (function(window,document,undefined){
        var hearts = [];
        window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback){
        setTimeout(callback,1000/60);
        }
        })();
        init();
        function init(){
        css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        attachEvent();
        gameloop();
        }
        function gameloop(){
        for(var i=0;i<hearts.length;i++){
        if(hearts[i].alpha <=0){
        document.body.removeChild(hearts[i].el);
        hearts.splice(i,1);
        continue;
        }
        hearts[i].y--;
        hearts[i].scale += 0.004;
        hearts[i].alpha -= 0.013;
        hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
        }
        requestAnimationFrame(gameloop);
        }
        function attachEvent(){
        var old = typeof window.onclick==="function" && window.onclick;
        window.onclick = function(event){
        old && old();
        createHeart(event);
        }
        }
        function createHeart(event){
        var d = document.createElement("div");
        d.className = "heart";
        hearts.push({
        el : d,
        x : event.clientX - 5,
        y : event.clientY - 5,
        scale : 1,
        alpha : 1,
        color : randomColor()
        });
        document.body.appendChild(d);
        }
        function css(css){
        var style = document.createElement("style");
        style.type="text/css";
        try{
        style.appendChild(document.createTextNode(css));
        }catch(ex){
        style.styleSheet.cssText = css;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        }
        function randomColor(){
        return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
        }
        })(window,document);


        
        //定时雪花效果
        snowFallInit();
        
});

var snowFallInit = function(){
        var url = $("#baseUrl").val();
        var month = new Date().getMonth();
        if(month == 0 || month == 1){
            loadjscssfile(url+'/assets/snowflakeBackground/css/style.css','css', function(){
                loadjscssfile(url+'/assets/snowflakeBackground/js/ThreeCanvas.js','js', function(){
                    loadjscssfile(url+'/assets/snowflakeBackground/js/Snow.js','js', function(){
                        loadjscssfile(url+'/assets/snowflakeBackground/js/snowFall.js','js', function(){
                            $(".jumbotron").css("background-image","url('"+url+"/assets/snowflakeBackground/images/snow_bk.jpg')");
                            $.snowFall({
                                //创建粒子数量，密度
                                particleNo: 500,
                                //粒子下拉速度
                                particleSpeed:40,
                                //粒子在垂直（Y轴）方向运动范围
                                particleY_Range:1300,
                                //粒子在垂直（X轴）方向运动范围
                                particleX_Range:1000,
                                //是否绑定鼠标事件
                                bindMouse: false,
                                //相机离Z轴原点距离
                                zIndex:1000,
                                //摄像机视野角度
                                angle:55,
                                wind_weight:0
                                });
                        })
                    })
                })
            }) 
        }else if(month == 2 || month == 3){
            $(".jumbotron").css({"background-image":"url('"+url+"/assets/images/spring.jpg')", 'background-size': 'cover', 'background-position-y': 'bottom'});
            $(".raining").remove();
            var container = document.createElement('canvas');
            container.className="raining"
            container.style.width = "100%"
            container.style.position = "absolute"
            container.style.opacity = "0.2"
            container.style.top = "0px"
            container.style["pointer-events"] = "none"
            container.style.height = $(".jumbotron").outerHeight()+'px';
            document.body.appendChild(container);

            var canvas = document.querySelector(".raining");//获取class为.raning的控件
            var w, h;
            ~~ function setSize() { //定义canvas的宽高，让他跟浏览器的窗口的宽高相同
                window.onresize = arguments.callee;
                w = window.innerWidth;
                h = window.innerHeight;
                canvas.width = w;
                canvas.height = h;
            }();

            var canCon = canvas.getContext("2d"); //建立2d画板
            var arain = []; //新建数组,储存雨滴
            //
            function random(min, max) { //返回最小值到最大值之间的值
                return Math.random() * (max - min) + min;
            }

            function rain() {};
            rain.prototype = {
                init: function() { //变量初始化
                    this.x = random(0, w); //在0-w之间生成雨滴
                    this.vx = 0.5;
                    this.y = 0;
                    this.vy = random(5, 10);
                    this.h = random(0.9 * h, h); //地板高度
                    this.r = 1; //雨滴绽放的半径
                    this.vr = 1;
                },
                draw: function() {
                    if(this.y < this.h) {
                        canCon.beginPath(); //拿起一支笔
                        canCon.fillStyle = "#CCC"; //笔墨的颜色
                        canCon.fillRect(this.x, this.y, 1, 10); //想象画一个雨滴
                    } else {
                        canCon.beginPath(); //拿起一支笔
                        canCon.strokeStyle = "#CCC"; //笔墨的颜色
                        canCon.arc(this.x, this.y, this.r, 0, Math.PI,1); //想象画一个半圆
                        canCon.stroke(); //下笔作画
                    }
                },
                move: function() {
                    if(this.y < this.h) { //位置判断，让雨滴下落
                        this.y += this.vy;
                        this.x += this.vx;
                    } else {
                        if(this.r < 30) { //落下后绽放的大小
                            this.r += this.vr;
                        } else {
                            this.init(); //放完后回归变量原点
                        }

                    }
                    this.draw(); //开始作画

                }
            }

            function createrain(num) {
                for(var i = 0; i < num; i++) {
                    setTimeout(function() {
                        var raing = new rain(); //创建一滴雨
                        raing.init();
                        raing.draw();
                        arain.push(raing);
                    }, 150 * i) //每隔150ms下落一滴雨
                }
            }
            createrain(40); //雨滴数量
            setInterval(function() {
                canCon.fillStyle = "rgba(0,0,0,0.08)"; //拿起一支透明0.13的笔		
                canCon.fillRect(0, 0, w, h); //添加蒙版 控制雨滴长度
                for(var item of arain) {
                    //item of arain指的是数组里的每一个元素
                    //item in arain指的是数组里的每一个元素的下标（包括圆形连上的可遍历元素）
                    item.move(); //运行整个move事件
                }
            }, 500 / 60); //下落时间
        }
}