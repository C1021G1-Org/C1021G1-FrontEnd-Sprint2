(function ($) {

    "use strict";

    let fullHeight = function () {

        $('.js-fullHeight').css('width', $(window).width());
        $(window).resize(function () {
            $('.js-fullHeight').css('width', $(window).width());
        });

    };
    fullHeight();

    if ($('sidebar').hasClass('active'))
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('deactivate');
        });
    else
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });


})(jQuery);
