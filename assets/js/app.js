import './menu';

import '../css/app.css';

import $ from 'jquery';
import 'bootstrap';

$(document).ready(function() {
    $("a[href*=\\#]:not([href=\\#])").click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {
                var navBarHeight = $('#navbar').outerHeight() ?? 0;
                var arianeHeight = $('#ariane').outerHeight() ?? 0;
                var searchBarHeight = $('#searchbar').outerHeight() ?? 0;

                $('html,body').animate({
                    scrollTop: target.offset().top - (navBarHeight + arianeHeight + searchBarHeight)
                }, 0);

                return false;
            }
        }
    });

    showWhenInView();

    $(window).scroll(function() {
        showWhenInView();
    });

    $(window).resize(function() {
        calculeNavBarHeight();
        showWhenInView();
    });

    $('#navbarSupportedContent').on('hidden.bs.collapse', function() {
        calculeNavBarHeight();
    });
});

function calculeNavBarHeight() {
    var navBarHeight = $('#navbar').outerHeight() ?? 0;
    var arianeHeight = $('#ariane').outerHeight() ?? 0;
    var searchBarHeight = $('#searchbar').outerHeight() ?? 0;

    $('.padding-navbar').css('padding-bottom', navBarHeight + 'px');
    $('.padding-ariane').css('padding-bottom', arianeHeight + 'px');
    $('.padding-searchbar').css('padding-bottom', searchBarHeight + 'px');

    $('.all-height-remain').css('min-height', 'calc(100vh - ' + (navBarHeight + arianeHeight + searchBarHeight) + 'px');
}

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

    var arianeItems = $('.show-in-ariane').toArray().reverse()

    $.each(arianeItems, function () {
        if (isShowInView(window, this)) {
            $('#ariane > .ariane-bar > .sd-ariane-title > .sd-text').html($('.sd-title > h5', $(this)).html());
        }
    });
}

function isShowInView(window, element) {
    var $window = $(window);
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position  = (window_top_position + window_height);

    var $element = $(element);

    if ($element.data('related-to') !== undefined) {
        $element = $('#' + $element.data('related-to'));
    }

    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    var navBarHeight = $('#navbar').outerHeight() ?? 0;
    var arianeHeight = $('#ariane').outerHeight() ?? 0;
    var searchBarHeight = $('#searchbar').outerHeight() ?? 0;

    if ((element_bottom_position >= window_top_position + navBarHeight + arianeHeight + searchBarHeight) &&
        (element_top_position <= window_bottom_position)
    ) {
        return true;
    }

    return false;
}

