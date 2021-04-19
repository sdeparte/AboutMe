import '../css/curriculum.css';

import $ from 'jquery';

$( document ).ready(function() {
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
        $('#navbar').css('background-color', 'rgba(44, 62, 80)');
    } else {
        $('#navbar').css('background-color', 'rgba(44, 62, 80, ' + window.scrollY * 0.25 / 100 + ')');
    }

    if (window.innerWidth > 992) {
        $('#me-global').css('top', '');

        $('#me').css('background-position-y', (window.scrollY * 0.5) + 'px');
        $('#me-name').css('top', (window.scrollY * 0.4) + 'px');
        $('#me-infos').css('top', (window.scrollY * 0.3) + 'px');
        $('#me-text').css('top', (window.scrollY * 0.2) + 'px');
        $('#me-head').css('top', (window.scrollY * 0.2) + 'px');
        $('#top-sprite').css('transform', 'skewY(-5deg) translateY(' + (window.scrollY * 0.1) + 'px)');
    } else {
        $('#me-name').css('top', '');
        $('#me-infos').css('top', '');
        $('#me-text').css('top', '');
        $('#me-head').css('top', '');

        $('#me').css('background-position-y', 'calc(100% + ' + (window.scrollY * 0.2) + 'px)');
        $('#me-global').css('top', (window.scrollY * 0.1) + 'px');

        if (window.scrollY >= $('#top-sprite').get(0).getBoundingClientRect().top) {
            $('#top-sprite').css('transform', 'skewY(-5deg) translateY(' + ((window.scrollY - $('#top-sprite').get(0).getBoundingClientRect().top) * 0.05) + 'px)');
        }

    }
}
