import './app';
import './ariane';

import '../css/realisations.css';

import $ from 'jquery';

var itemsPerRow;

$( document ).ready(function() {
    $("a[href*=\\#]:not([href=\\#])").click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 150
                }, 0);

                return false;
            }
        }
    });

    var containerWidth = $('.list-realisations').outerWidth();
    var itemWidth = $('.list-realisations > .one-realisation').outerWidth();

    itemsPerRow = Math.floor(containerWidth / itemWidth);

    $('.list-realisations > .one-realisation').on('click', function(){
        var $triggered = $(this);

        if (!$triggered.hasClass('active')) {
            $('.list-realisations > .one-realisation').removeClass('active');
            $('.list-realisations > .one-realisation-description').slideUp();

            var target = $triggered.attr('data-target');
            var $triggeredElement = $('.list-realisations > .one-realisation-description[data-target='+ target +']');

            positionExpandableElement($triggered, $triggeredElement);

            $triggered.addClass('active');
            $triggeredElement.slideDown();

            $('html, body').animate({scrollTop: $('#creation-'+ target).offset().top - 125}, 0)
        } else {
            $('.list-realisations > .one-realisation').removeClass('active');
            $('.list-realisations > .one-realisation-description').slideUp();
        }
    });
});

$(window).resize(function(){
    var containerWidth = $('.list-realisations').outerWidth();
    var itemWidth = $('.list-realisations > .one-realisation').outerWidth();

    var newItemsPerRow = Math.round(containerWidth / itemWidth);

    if (itemsPerRow != newItemsPerRow) {
        itemsPerRow = newItemsPerRow;

        var $triggered = $('.list-realisations > .one-realisation.active');
        var target = $triggered.attr('data-target');
        var $triggeredElement = $('.list-realisations > .one-realisation-description[data-target='+ target +']');

        positionExpandableElement($triggered, $triggeredElement);
    }
});

function positionExpandableElement(triggered, element) {
    var allFlexItems = $('.list-realisations > .one-realisation');
    var itemsData = [];

    $.each(allFlexItems, function(key, el){
        itemsData.push($(el).attr('data-target'));
    });

    var elNumber = $.inArray($(triggered).attr('data-target'), itemsData);
    var rowNumber = Math.floor(elNumber / itemsPerRow);
    var insertAfter = (itemsPerRow * rowNumber) + itemsPerRow - 1; //we add itemsPerRow because we always need to skip the first row, -1 because array starts at 0

    $(element).insertAfter($('.list-realisations > .one-realisation')[insertAfter]);
}