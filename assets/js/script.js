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

$( document ).ready(function() {
    windowScroll();

    //为超链接加上target='_blank'属性
	$('a[href^="http"]').each(function() {
		$(this).attr('target', '_blank');
    });
    
    var gitalk = new Gitalk({
        clientID: '9551248533449b4a4385', //Client ID
      
        clientSecret: '2df193c2832debdf6d5bea6e676690d0bc7f81e3', //Client Secret
      
        repo: 'blogtalk',//仓库名称
        owner: 'chaofanHb',//仓库拥有者
        admin: ['chaofanHb'],
        id: "vue-animation",      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
      })
    gitalk.render('gitalk-container')
});