import './app';
import './bubbles';

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

    $("a[href*=\\#]:not([href=\\#])").click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 0);

                return false;
            }
        }
    });
});