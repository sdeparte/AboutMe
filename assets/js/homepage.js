import '../css/homepage.css';

import $ from 'jquery';

var sens = -1;
var wait = 20;

$( document ).ready(function() {
    setInterval(function() {
        if (wait > 0) {
            wait--;
        } else {
            var variable = $('#slider>.sd-rubrique .sd-header>.variable');

            if (variable.html() == '') {
                var rand = Math.floor(Math.random() * Math.floor(5));

                sens = 1;
                current = variables[rand];
                variable.html(current.slice(0, 1));
            } else if (variable.html() == current) {
                sens = -1;
                variable.html(current.slice(0, -1));
            } else {
                if (sens < 0) {
                    variable.html(variable.html().slice(0, -1));

                    if (variable.html() == '') {
                        wait = 5;
                    }
                } else {
                    var currentLength = variable.html().length;

                    variable.html(variable.html() + current.slice(currentLength, currentLength + 1));

                    if (variable.html() == current) {
                        wait = 20;
                    }
                }
            }
        }
    }, 100);


    parallax();

    $('#navbarSupportedContent').on('hide.bs.collapse', function() {
        $('#navbar').removeClass('expanded');
        parallax();
    });

    $('#navbarSupportedContent').on('show.bs.collapse', function() {
        $('#navbar').addClass('expanded');
        parallax();
    });

    $(window).scroll(function() {
        parallax();
    });

    $(window).resize(function() {
        parallax();
    });
});

function parallax() {
    if ($('#navbar').hasClass('expanded')) {
        $('#navbar').css('background-color', 'rgba(44, 62, 80, 1)');
    } else {
        if (window.innerWidth > 992) {
            $('#navbar').css('background-color', 'rgba(44, 62, 80, ' + (window.scrollY - 150) * 0.5 / 100 + ')');
        } else {
            $('#navbar').css('background-color', 'rgba(44, 62, 80, ' + window.scrollY * 0.25 / 100 + ')');
        }
    }

    if (window.innerWidth > 992) {
        $('#slider').css('background-position-y', (window.scrollY * 0.4) + 'px');
        $('#header-sprite').css('margin-top', (-15 + window.scrollY * 0.3) + 'px');
        $('#computer_animation_handler').css('top', (window.scrollY * 0.2) + 'px');
        $('#slider-text').css('top', 'calc(50% + ' + (-100 + window.scrollY * 0.1) + 'px)');
    } else {
        $('#slider').css('background-position-y', (window.scrollY * 0.4) + 'px');
        $('#header-sprite').css('margin-top', (-15 + window.scrollY * 0.3) + 'px');
        $('#computer_animation_handler').css('top', (window.scrollY * 0.2) + 'px');
        $('#slider-text').css('top', (window.scrollY * 0.1) + 'px');
    }
}
