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

    calculeSearchbarHeight();
    checkCreationsVisibility();

    $('#searchbar .big-type').click(function() {
        $(this).toggleClass('selected');

        var show = [];

        $('#searchbar .big-type').each(function() {
            var $bigType = $(this);

            if ($bigType.hasClass('selected')) {
                show.push($bigType.data('big-type'));
            }
        });

        window.history.pushState('','', window.location.pathname + '?bigTypesToShow=' + show.join(';'));

        closeAllDescriptions();
        checkCreationsVisibility();
        calculeNewItemPerRow();
    });

    var containerWidth = $('.list-realisations').outerWidth();
    var itemWidth = $('.list-realisations > #realisation-reference').outerWidth();

    itemsPerRow = Math.floor(containerWidth / itemWidth);

    $('.list-realisations > .one-realisation').on('click', function(){
        var $triggered = $(this);

        if (!$triggered.hasClass('active')) {
            closeAllDescriptions();

            var target = $triggered.data('target');
            var $triggeredElement = $('.list-realisations > .one-realisation-description[data-target="'+ target +'"]');

            positionExpandableElement($triggered, $triggeredElement);

            $triggered.addClass('active');
            $triggeredElement.slideDown();

            $('html, body').animate({scrollTop: $('#creation-'+ target).offset().top - 125}, 0);
        } else {
            closeAllDescriptions();
        }
    });
});

$(window).resize(function(){
    calculeSearchbarHeight();
    calculeNewItemPerRow();
});

function calculeSearchbarHeight() {
    var searchBarHeight = $('#searchbar').outerHeight();
    var navBarHeight = $('#navbar').outerHeight();

    $('.padding-searchbar').css('padding-bottom', searchBarHeight + 'px');
    $('.all-height-remain').css('min-height', 'calc(100vh - ' + (searchBarHeight + navBarHeight) + 'px');
}

function calculeNewItemPerRow() {
    var containerWidth = $('.list-realisations').outerWidth();
    var itemWidth = $('.list-realisations > #realisation-reference').outerWidth();

    var newItemsPerRow = Math.round(containerWidth / itemWidth);

    if (itemsPerRow !== newItemsPerRow) {
        itemsPerRow = newItemsPerRow;

        var $triggered = $('.list-realisations > .one-realisation.active');
        var target = $triggered.data('target');
        var $triggeredElement = $('.list-realisations > .one-realisation-description[data-target='+ target +']');

        positionExpandableElement($triggered, $triggeredElement);
    }
}

function positionExpandableElement(triggered, element) {
    var allFlexItems = $('.list-realisations > .one-realisation.use');
    var itemsData = [];

    $.each(allFlexItems, function(key, el){
        itemsData.push($(el).data('target'));
    });

    var elNumber = $.inArray($(triggered).data('target'), itemsData);
    var rowNumber = Math.floor(elNumber / itemsPerRow);
    var insertAfter = (itemsPerRow * rowNumber) + itemsPerRow - 1; //we add itemsPerRow because we always need to skip the first row, -1 because array starts at 0
    $(element).insertAfter($('.list-realisations > .one-realisation.use:not(.hide)')[insertAfter]);
}

function closeAllDescriptions(animation = true) {
    $('.list-realisations > .one-realisation').removeClass('active');
    $('.list-realisations > .one-realisation-description').slideUp();
}

function checkCreationsVisibility() {
    $('.list-realisations > .one-realisation.use').each(function() {
        var $creation = $(this);
        var bigTypes = $creation.data('big-types');
        var visibility = false;

        for (var i = 0; i < bigTypes.length; i++) {
            if ($('#searchbar .big-type[data-big-type="' + bigTypes[i] + '"]').hasClass('selected')) {
                visibility = true;
                break;
            }
        }

        if (visibility) {
            $creation.removeClass('hide');
        } else {
            $creation.addClass('hide');
        }
    });
}
