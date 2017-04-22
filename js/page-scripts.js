jQuery(document).ready(function($) {
    $('#nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 500,
        scrollOffset: 10,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing'
    });

    jQuery('a.scroll-link').click(function(){//$.scrollTo works EXACTLY the same way, but scrolls the whole screen
        jQuery.scrollTo( this.hash, 1000, { easing:'easeInOutBack' });
        return false;
    });
    jQuery(window).scroll(function(){
    if (jQuery(this).scrollTop() > 100) {
    jQuery('.backtotop').fadeIn();
    } else {
    jQuery('.backtotop').fadeOut();
    }
    });
    jQuery('.backtotop').click(function(){
    jQuery("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
    });
}); /* end of as page load scripts */