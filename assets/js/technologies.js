import './app';
import './ariane';

import $ from 'jquery';

$( document ).ready(function() {
    $("a[href*=\\#]:not([href=\\#])").click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {
                var navBarHeight = $('#navbar').outerHeight();
                var arianeHeight = $('#ariane').outerHeight();

                $('html,body').animate({
                    scrollTop: target.offset().top - (navBarHeight + arianeHeight)
                }, 0);

                return false;
            }
        }
    });
});