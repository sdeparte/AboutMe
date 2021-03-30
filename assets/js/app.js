import './menu';

import '../css/app.css';

import $ from 'jquery';

$( document ).ready(function() {
    $(window).scroll(function() {
        showWhenInView();
    });

    $(window).resize(function() {
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
            $('#ariane>.ariane-bar>.sd-ariane-title>.sd-text').html($('.sd-section-title>.html-content', $(this)).html());
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

    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)
    ) {
        return true;
    }

    return false;
}

