import '../css/menu.css';

import $ from 'jquery';

$( document ).ready(function() {
    var shadow = $('#full-shadow');
    var items = $('.navbar .navbar-nav>.nav-item>.nav-link');

    items.click(function() {
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

    shadow.click(function() {
        $.each(items, function() {
            var element = $(this).parent('.nav-item')

            element.removeClass('active');
        });

        $(this).removeClass('shown');
    });
});
