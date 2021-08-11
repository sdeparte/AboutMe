import $ from "jquery";

export default class Statics {
    static isShowInView(element) {
        const $window = $(window);
        const window_height = $window.height();
        const window_top_position = $window.scrollTop();
        const window_bottom_position  = (window_top_position + window_height);

        let $element = $(element);

        if ($element.data('related-to') !== undefined) {
            $element = $('#' + $element.data('related-to'));
        }

        const element_height = $element.outerHeight();
        const element_top_position = $element.offset().top;
        const element_bottom_position = (element_top_position + element_height);

        const navBarHeight = $('#navbar').outerHeight() ?? 0;
        const arianeHeight = $('#ariane').outerHeight() ?? 0;
        const searchBarHeight = $('#searchbar').outerHeight() ?? 0;

        if ((element_bottom_position >= window_top_position + navBarHeight + arianeHeight + searchBarHeight) &&
            (element_top_position <= window_bottom_position)
        ) {
            return true;
        }

        return false;
    }
}