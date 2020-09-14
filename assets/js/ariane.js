import '../css/ariane.css';

import $ from 'jquery';

$( document ).ready(function() {
    var arianeItems = $('#ariane>.ariane-bar');

    arianeItems.click(function(){
        $(this).toggleClass('active');
    });
});
