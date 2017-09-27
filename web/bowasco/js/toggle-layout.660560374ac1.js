$('.grid-toggle').on('click', function(e){
    e.stopPropagation();
    var closestParent = $(this).closest('.layout-toggle-wrap')
    var productGrid = closestParent.children('.layout-wrap');
    var target = $(e.target);

    if(target.hasClass('grid-layout')) {
        if(productGrid.hasClass('list')) {
            productGrid.removeClass('list');
            productGrid.addClass('grid');
        }
    } else if(target.hasClass('list-layout')) {
        if(productGrid.hasClass('grid')) {
            productGrid.removeClass('grid');
            productGrid.addClass('list');
        }
    }
});
