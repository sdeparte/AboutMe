import '../css/bubbles.css';

import $ from 'jquery';

$( document ).ready(function() {
    $(window).scroll(function() {
        var a = $(".js-plugin-block");
        var l = $(".js-plugin-blocks-container");

        l.scrollTop();

        $.each(a, function(){
            var e = $(window).scrollTop()-l.offset().top;
            var n = $(this).attr("data-intensity");
            var i = e / n - e + "px";

            $(this).css("transform","translateY(" + i + ")")
        });
    });
});