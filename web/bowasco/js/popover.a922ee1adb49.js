$(document).on('mouseenter', '.popover-trigger, .popover', function(e){
    e.stopPropagation();
    var closestParent = $(this).closest('.popover-wrap');
    var closestPopover = closestParent.children('.popover');
    if(closestPopover.hasClass('show')) {
        closestPopover.removeClass('show');
    } else {
        $('.popover').removeClass('show');
        closestPopover.addClass('show');
    }
});
$(document).on('mouseleave', '.popover-trigger, .popover', function(e){
    e.stopPropagation();
    var closestParent = $(this).closest('.popover-wrap');
    var closestPopover = closestParent.children('.popover');
    if(closestPopover.hasClass('show')) {
        closestPopover.removeClass('show');
    } else {
        $('.popover').removeClass('show');
    }
});

$(document).on('click', '.popover', function(e){
    e.stopPropagation();
});

function closeAllPopovers() {
    $('.popover').removeClass('show');
}

$('body').on('click', function(){
    closeAllPopovers();
});

$('.popover-trigger').on('click', function(){
    var mobilePopoverWrap = $('.mobile-popovers');
    var mobilePopover = mobilePopoverWrap.children('.popover-mobile');
    var popoverType = $(this).data('popover');
    if(mobilePopover.hasClass('show')) {
        mobilePopover.removeClass('show');
    } else {
        mobilePopover.filter(function(){
            return $(this).data('popover') === popoverType;
        }).addClass('show');
    }
});
