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

$( document ).ready(function() {
    windowScroll();

    //为超链接加上target='_blank'属性
	$('a[href^="http"]').each(function() {
		$(this).attr('target', '_blank');
    });
    
    
});