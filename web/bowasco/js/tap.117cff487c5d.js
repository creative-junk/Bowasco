////
//// Define 'tap' event
(function () {
    var touchStart = {};
    var touchEnd = {};
    var touchEvent;

    $('*').on('touchstart', function(e) {
        touchStart.x = e.originalEvent.changedTouches[0].screenX;
        touchStart.y = e.originalEvent.changedTouches[0].screenY;
        touchEvent = e;
    });
    $('*').on('touchend', function(e) {
        touchEnd.x = e.originalEvent.changedTouches[0].screenX;
        touchEnd.y = e.originalEvent.changedTouches[0].screenY;
        if(Math.abs(touchStart.x - touchEnd.x) < 10 && Math.abs(touchStart.y - touchEnd.y) < 10) { // Threshold can be set here.
            e.stopPropagation();
            $(e.target).trigger({
                type: 'tap',
                touchEvent: touchEvent
            });
        }
    });
})();

////
//// On Dekstop, click events will be 'click', on Mobile, 'tap'
window.clickAction = (isMobile.any()) ? 'tap' : 'click';
