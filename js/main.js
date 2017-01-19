/*
 *
 */
$(document).ready(function() {
    /*
     * 改变不同屏幕宽度下轮播图加载不同大小图片方法
     */
    function resize() {
        var isSmallScreen = $(window).width() < 768 ? true : false;
        $('#main_ad > .carousel-inner > .item').each(function(i, item) {
            var imgSrc = isSmallScreen ? $(this).data('img-xs') : $(this).data('img-lg');
            $(this).css('backgroundImage', 'url(' + imgSrc + ')');
            if (isSmallScreen) {
                console.log(11);
                $(this).html('<img src="' + imgSrc + '" alt="" />');
            } else {
                $(this).html('');
            }
        });
    }
    $(window).on('resize', function() {
        resize()
    }).triggerHandler('resize');
    /*
     * 想要使用bootstrap的tooltip功能，必须初始化该功能
     */
    $('[data-toggle="tooltip"]').tooltip()
        /*
         * 实现tabs选项卡在小屏幕上能够有横向滚动条
         */
    var $ul = $('.nav-tabs');
    /*因为bootstrap中设置了ul有默认的padding-left，但又设置了盒子为border-box，所以需要预留大一点空间*/
    var width = 30;
    $ul.children().each(function(index, ele) {
        width += this.clientWidth;
    });
    /*
     * 判断一下，如果算出来的宽度比屏幕宽度大才设置横向滚动
     */
    if (width > $(window).width()) {
        $ul.width(width).parent().css('overflow-x', 'scroll');
    }
    /*
     * 新闻点击切换标题
     */
    $('.nav-news>li>a').on('click', function() {
        $('.news-title').text($(this).data('title'));
    });
    /*
     * 轮播图手势切换
     */
    (function() {
        var temp = 30;
        var startX, endX;
        $('.carousel').on('touchstart', function(e) {
            // console.log(e.originalEvent.touches[0].clientX);
            startX = e.originalEvent.touches[0].clientX;
        }).on('touchmove', function(e) {
            // console.log(e);
            endX = e.originalEvent.touches[0].clientX;
        }).on('touchend', function() {
            if (startX - endX > temp) {
                $(this).carousel('next');
            } else if (startX - endX < -temp) {
                $(this).carousel('prev');
            }
        });
    })();
});