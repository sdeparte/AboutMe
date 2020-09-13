import '../css/app.css';

import $ from 'jquery';

$( document ).ready(function() {
    var shadow = $('#full-shadow');
    var items = $('.navbar .navbar-nav>.nav-item>.nav-link');

    items.click(function(){
        var element = $(this).parent('.nav-item')
        var wasActive = element.hasClass('active');

        $.each(items, function(){
            var element = $(this).parent('.nav-item')

            element.removeClass('active');
        });

        if (!wasActive) {
            element.addClass('active');
        }

        if (element.hasClass('has-children')) {
            if (element.hasClass('active') && !shadow.hasClass('shown')) {
                shadow.addClass('shown');
            } else if (!element.hasClass('active') && shadow.hasClass('shown')) {
                shadow.removeClass('shown');
            }
        } else {
            shadow.removeClass('shown');
        }
    });

    shadow.click(function(){
        $.each(items, function(){
            var element = $(this).parent('.nav-item')

            element.removeClass('active');
        });

        $(this).removeClass('shown');
    });

    var arianeItems = $('#ariane>.ariane-bar');

    arianeItems.click(function(){
        $(this).toggleClass('active');
    });

    $(window).scroll(function(){
        var a = $(".js-plugin-block");
        var l = $(".js-plugin-blocks-container");

        l.scrollTop();

        $.each(a, function(){
            var e = $(window).scrollTop()-l.offset().top;
            var n = $(this).attr("data-intensity");
            var i = e / n - e + "px";

            $(this).css("transform","translateY(" + i + ")")
        });

        showWhenInView();
    });

    showWhenInView();
});

function showWhenInView() {
    var appearOnceItems = $('.animation-element.once');

    $.each(appearOnceItems, function () {
        if (isShowInView(window, this)) {
            $(this).addClass('in-view');
        }
    });

    var appearItems = $('.animation-element').not('.once');

    $.each(appearItems, function () {
        if (isShowInView(window, this)) {
            $(this).addClass('in-view');
        } else {
            $(this).removeClass('in-view');
        }
    });

    var arianeItems = $('.show-in-ariane');

    $.each(arianeItems, function () {
        if (isShowInView(window, this)) {
            $('#ariane>.ariane-bar>.sd-ariane-title>.sd-text').html($('h5', $(this)).html());
        }
    });
}

function isShowInView(window, element) {
    var $window = $(window);
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position  = (window_top_position + window_height);

    var $element = $(element);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)
    ) {
        return true;
    }

    return false;
}

