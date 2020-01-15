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
});