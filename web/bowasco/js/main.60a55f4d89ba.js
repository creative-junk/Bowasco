// staging/local doesnt load GA
var ga = ga || function(){};

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var dispatchReactEvent = function(data) {
    if(!data) {
        console.log('No data supplied to external React Event dispatch!');
        return false;
    }
    var event = new CustomEvent('reactEvent', { 'detail': data });
    document.dispatchEvent(event);
}

$('a.nav-drop').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).closest('nav').removeClass('show-account-menu').toggleClass('show-mobile-menu');
    return false;
});

$('a#mobile-account-menu').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).closest('nav').removeClass('show-mobile-menu').toggleClass('show-account-menu');
    return false;
});

$('.tab-trigger').on('click', function(e) {
    var $this = $(this);
    var closestParent = $this.closest('.page-tabs-mobile');
    var closestNav = closestParent.children('ul.mobile-page-nav');
    if(closestNav.hasClass('show')) {
        closestNav.removeClass('show');
    } else {
        closestNav.addClass('show');
    }
});

////
//// Handle various custom selects
$('.select').on('click', function() {
  var options = $('ul', this),
      option = $('li', this),
      nativeSelect = $('select', this),
      value = $('.value', this);

  $(this).toggleClass('expand');
  options.toggleClass('expand');

  option.on(clickAction, function() {
    var optionValue = $(this).attr('value');

    value.html($(this).html());
    nativeSelect.attr('value', optionValue);
    nativeSelect.val(optionValue);
    nativeSelect.change();
  });
});

$('.select').each(function() {
    var nativeSelect = $('select', this),
    value = $('.value', this);

    if (nativeSelect) {
        var text = $('option[value="' + nativeSelect.val() + '"]', this).text();
        value.text(text);
    }
});

$('.onChangeSubmit').on('change', function(){
    var form = this.form;
    if (typeof form !== 'undefined'){
        $(form).submit();
    }
});


// Galleries
$('.episode-gallery').not('.homepage .episode-gallery').flickity({
    percentPosition: false,
    draggable: true,
    pageDots: false,
});

$(window).on('load resize orientationchange', function() {
    var galleryCellAlign = $(window).width() > 1023 ? 'left' : 'center';
    $('body.homepage .episode-gallery').flickity({
        percentPosition: false,
        draggable: true,
        pageDots: false,
        cellAlign: galleryCellAlign,
    });
});

$('.flickity-slider').addClass('no-transition');

// Read more
$('.read-more-trigger').on('click', function(){
    var readMore = $('.read-more-block');
    if(readMore.hasClass('show')){
        readMore.removeClass('show');
    } else {
        readMore.addClass('show');
    }
});

$('.subnav-trigger').hover(function(){
    var subNavigation = $('.sub-navigation');
    var subNavType = $(this).data('subnav');
    if(subNavigation.hasClass('show')) {
        subNavigation.removeClass('show');
    } else {
        subNavigation.filter(function(){
            return $(this).data('subnav') === subNavType;
        }).addClass('show');
        $('.sub-navigation').hover(
            function() {
                $(this).addClass('show');
            }, function() {
                $(this).removeClass('show');
            }
        );
    }
});

// Sign in hover
$('a.sign-up').hover(function(){
    var userDropdown = $(this).next('.user-dropdown');
    if(userDropdown.hasClass('show')) {
        userDropdown.removeClass('show');
    } else {
        userDropdown.addClass('show');
        userDropdown.hover(
            function() {
                $(this).addClass('show');
            }, function() {
                $(this).removeClass('show');
            }
        );
    }
});

// Checkbox group
$('body').on('click', '.check-radio-wrap.group', function(){
    var nearestParent = $(this).closest('.check-radio-wrap');
    var nearestInput = nearestParent.children('label input');
    if(!nearestParent.hasClass('checked')) {
        $('.check-radio-wrap.group').removeClass('checked');
        nearestParent.addClass('checked');
    }
});

// Smoothscrolling to anchors
$("a.anchor-scroll").click(function(e){
    e.preventDefault();
    //calculate destination place
    var dest=0,
        navHeight = $('nav').height();
     dest=$(this.hash).offset().top - navHeight;
    //go to destination
    $('html,body').animate({scrollTop:dest}, 1000,'swing');
});

// Enable drilldown on table rows
$('.table-drilldown tbody tr').click(function(e){
  var $row = $(this);
  var $table = $row.closest('table');
  window.location = $table.attr('data-url').replace('%id', $row.attr('data-id'));
});

// Humanize '.timeago' timestamps with Timeago
$('.timeago').timeago();

// Video settings toggles
$('.autoplay-wrapper, .autoplay-toggle').on('click', function() {
    $('.autoplay-wrapper').toggleClass('toggled');
    $(document).trigger('autoplayToggled');
});

$('body').on(clickAction, '.callout.product .callout--button', function() {
    var totalHeight = $('.section--video-products ul').height();
    $(this).toggleClass('show');
    if($('.section--video-products').hasClass('show')) {
        $('.section--video-products').height(0).removeClass('show');
    } else {
        $('.section--video-products').height(totalHeight).addClass('show');
    }
});

$('.mobile-search-trigger').on('click', function(){
    var $this = $(this);
    var navigation = $('nav');
    var mobileSearch = $('.mobile-search, .mobile-nav__search-field');
    var searchInput = $('.mobile-search-input');
    var mobileNav = $('ul.nav-links');
    var closeSearch = $('.close-mobile-search');
    if(mobileSearch.hasClass('show')){
        navigation.removeClass('focus-search');
        mobileSearch.removeClass('show');
        $this.removeClass('show');
    } else {
        if(mobileNav.hasClass('show')) {
            mobileNav.removeClass('show');
        }
        navigation.addClass('focus-search');
        mobileSearch.addClass('show');
        $(window).scrollTop(0);
        $this.addClass('show');
        searchInput.focus();
    }
    closeSearch.on('click', function(e){
        navigation.removeClass('focus-search');
        mobileSearch.removeClass('show');
        $('.icon-search').removeClass('show');
    });
});

// dont let clicking on the dark background pull the dropdown back up
$('body').on(clickAction, '.actions--mobile', function(e) {
    e.preventDefault();
    e.stopPropagation();
});

$('body').on('adjustParent', '.actions--mobile', function(e) {
    if ($('body').width() > 767) return;

    var action_height = parseInt($('a', this).css('line-height'));
    var container = $('.section--video-products');

    var initial_height = container.height();
    container.height(
        $(this).hasClass('show')
            ? initial_height + action_height
            : initial_height - action_height
    );
});

$('body').on(clickAction, '.product-grid li', function() {
    if ($(this).is('li')) {
        $('.actions--mobile', this)
            .toggleClass('show')
            .trigger('adjustParent')
    }
});

$('.mobile-product-trigger').on('click', function(){
    var sponsorProduct = $(this).closest('.sponsor-product');
    var productShare = sponsorProduct.next('.mobile-product-share');
    if(productShare.hasClass('show')) {
        productShare.removeClass('show');
    } else {
        $('.mobile-product-share').removeClass('show');
        productShare.addClass('show');
    }
});

$('.mobile-close-drawer').on('click', function(){
    var productShare = $(this).closest('.mobile-product-share');
    productShare.removeClass('show');
});

// Admin

// Center logo thumbnail
$('.logo-thumbnail').addClass('v-table');

// Create tags input
$('#id_tags').tagsInput({
    'width': '100%',
    'height': '175px',
    'delimiter': [','],
});

// checkbox counts
function postCheckCount() {
    var postCheckboxCount = $('.postroll ul input[type=checkbox]:checked').size();
    var postSpan = $('.postroll.count');
    postSpan.html(postCheckboxCount);
}

function preCheckCount() {
    var preCheckboxCount = $('.preroll ul input[type=checkbox]:checked').size();
    var preSpan = $('.preroll.count');
    preSpan.html(preCheckboxCount);
}


// Post roll
var postrollListChecks = $('.postroll-list ul input[type=checkbox]');
var postrollList = $('.postroll-list ul');

function postChecked() {
    postrollListChecks.prop('checked', true);
    postrollListChecks.prop('disabled', true);
    postrollList.css('overflow', 'hidden');
    postrollList.css('opacity', '.6');
}

function postUnchecked() {
    postrollListChecks.prop('checked', false);
    postrollListChecks.prop('disabled', false);
    postrollList.css('overflow', 'scroll');
    postrollList.css('opacity', '1');
}

// Preroll
var prerollListChecks = $('.preroll-list ul input[type=checkbox]');
var prerollList = $('.preroll-list ul');

function preChecked() {
    prerollListChecks.prop('checked', true);
    prerollListChecks.prop('disabled', true);
    prerollList.css('overflow', 'hidden');
    prerollList.css('opacity', '.6');
}

function preUnchecked() {
    prerollListChecks.prop('checked', false);
    prerollListChecks.prop('disabled', false);
    prerollList.css('overflow', 'scroll');
    prerollList.css('opacity', '1');
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return(false);
}

$(document).ready(function(e){
    postCheckCount();
    preCheckCount();
    var postCheckbox = $('.postroll input[type=checkbox]');
    var preCheckbox = $('.preroll input[type=checkbox]');
    postCheckbox.on('click', function(){
        postCheckCount();
    });
    preCheckbox.on('click', function(){
        preCheckCount();
    });
    if($('#id_preroll_videos_all').is(':checked')) {
        preChecked();
        preCheckCount();
    }
    if($('#id_postroll_videos_all').is(':checked')) {
        postChecked();
        postCheckCount();
    }

    $('[data-trigger-join]').on('click', function(){
        var joinBox = $('#join-box');
        var mobile = false;

        if (joinBox.css('position') === 'fixed') {
            joinBox.toggle();
        } else {
            joinBox.slideToggle();
            mobile = true;
        }

        // if on mobile, we can return true which will allow the page to
        // bounce to the top from a # anchor
        return mobile;
    });

    var searchButton = jQuery('.nav-search, .search-nav-mobile');
    var searchBox = jQuery('#search-box');

    searchButton.click(function () {
        if (searchBox.css('position') === 'absolute') {
            searchBox.css('left', jQuery('.nav-search').position().left);
            searchButton.toggleClass('active', 'fade');
            searchBox.fadeToggle();
        } else {
            searchButton.toggleClass('active');
            searchBox.slideToggle();
        }
    });

    var doGlobalSearch = function () {
        var loading = jQuery('<div class="loading-spinner" />');
        var results = jQuery('#search-box #search-box-results');
        results.html('');
        results.append(loading);
        results.slideDown();

        jQuery.ajax({
            type: 'POST',
            url: '/globalsearch/',
            data: { query: jQuery('#search-box #search-query').val() },
            success: function (data) {
                results.html(data);
            },
            error: function (err) {
                loading.detach();
                alert(err);
            }
        });
    };

    // wire up search handlers
    jQuery('#search-box #search-box-button').click(doGlobalSearch);
    jQuery('#search-box #search-query').on('keyup', function (e) {
        if (e.keyCode == 13) {
            // detect enter and perform search
            doGlobalSearch();
        }
    });

    $(document).on('click', '#search-box .media-result', function () {
        // toggle a click on the search button to hide it
        jQuery('.nav-search').click();
    });

    $('.phone').mask('000-000-0000');
    $('#id_phone_number').mask('000-000-0000');

    jQuery('#featured-shop-banner .close-button').click(function () {
        var banner = jQuery(this).closest('#featured-shop-banner');
        var bannerId = banner.attr('data-banner-id');
        banner.fadeOut('slow', function () {
            jQuery('#site-container').removeClass('with-banner');
        });

        // set the cookie and make it expire in 30 days - this will clear out old cookies that don't
        // apply anymore over time
        Cookies.set('featured_shop_banner_hidden_' + bannerId, 'true');
    });
});

$('input#id_preroll_videos_all').on('click', function(){
    if(this.checked) {
        preChecked();
    } else {
        preUnchecked();
    }
});

$('input#id_postroll_videos_all').on('click', function(){
    if(this.checked) {
        postChecked();
    } else {
        postUnchecked();
    }
});

$('.clear.preroll').on('click', function(){
    $('.check-group.preroll input[type=checkbox]').prop('checked', false);
    preUnchecked();
    preCheckCount();
});

$('.clear.postroll').on('click', function(){
    $('.check-group.postroll input[type=checkbox]').prop('checked', false);
    postUnchecked();
    postCheckCount();
});

$('.admin-video-upload').on('click', function(){
    var videoInput = $('.admin-video-input input');
    videoInput.click();
});

// Mobile drawer
$('.mob-drawer-trigger').on('click', function(){
    var mobDrawer = $(this).next('.mobile-drawer');
    if(mobDrawer.hasClass('show')) {
        $(this).removeClass('expanded');
        mobDrawer.removeClass('show');
    } else {
        $('.mobile-drawer').removeClass('show');
        $(this).addClass('expanded');
        mobDrawer.addClass('show');
    }
});

// Product drawer
// This needs to be different than the above code
// because we need to remove the product node itself
$('.product-drawer-trigger').on('click', function(){
    var product = $(this).closest('.product-node');
    var drawer = product.find('.mobile-drawer');
    if(drawer.hasClass('show')) {
        drawer.removeClass('show');
    } else {
        $('.mobile-drawer').removeClass('show');
        drawer.addClass('show');
    }
});

// Ecom accordion
$(document).on('click', '.accordion-group__target', function(e){
    var $accordion = $(this).closest('.accordion-group');
    var $groups = $('.accordion-group');
    if($groups.hasClass('is-open')) {
        $groups.removeClass('is-open');
        $groups.removeClass('is-closed');
        $accordion.addClass('is-open');
        $groups.not('.is-open').addClass('is-closed');
    } else {
        $accordion.addClass('is-open');
        $groups.not('.is-open').addClass('is-closed');
    }
});

$(document).on(clickAction, '.accordion-group__close', function(e){
    $('.accordion-group').removeClass('is-open');
    $('.accordion-group').removeClass('is-closed');
});

$('.cart-nav').on('click', function(e) {
    dispatchReactEvent({ 'type': 'REQUEST_TOGGLE_CART' });
    $('#cart-wrapper').addClass('darken');
});

$('.mobile-nav__cart').on('click', function(e) {
    dispatchReactEvent({ 'type': 'REQUEST_TOGGLE_CART' });
    $('#cart-wrapper').addClass('darken');
});

$(document).on('reactUpdateCart', function(e) {
    var count = e.originalEvent.detail;
    var $countElem = $('.cart-count');

    if (count > 0 && $countElem.text() != count) {
        if (!$countElem.hasClass('show')) {
            $countElem.addClass('show');
        }

        $countElem.addClass('item-added');
        $countElem.text(count);
        setTimeout(function() {
            $countElem.removeClass('item-added');
        }, 200);
    } else if (count === 0) {
        $countElem.removeClass('show');
        setTimeout(function() {
            $countElem.text(count);
        }, 200)
    }
});


function set_pricelogincta_cookie() {
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime()+(365*24*60*60*1000));
    document.cookie="pricelogincta=hide; expires=" + expireDate.toGMTString() + ";path=/";
}

function addRemoveNavShadow() {
    if($(window).scrollTop() > 0) {
        $('nav.new-nav').addClass('shadow');
    } else {
        $('nav.new-nav').removeClass('shadow');
    }
}

$(document).ready(function(){
    addRemoveNavShadow();
});

$(window).scroll(function(){
    addRemoveNavShadow();
});

$(document).on('click', '#cart-wrapper.darken', function(e){
    if(!$(e.target).closest('#cart').length) {
        dispatchReactEvent({ 'type': 'REQUEST_TOGGLE_CART' });
        $('#cart-wrapper').removeClass('darken');
    }
});

$(function () {
    jQuery('#designer-profile-toggle-wrapper').change(function () {
        var elm = jQuery(this);
        var check = jQuery('#designer-profile-toggle');
        var isPublic = check.is(':checked');

        jQuery.ajax({
            url: '/api/v1/designer_profile/current/',
            type: 'PATCH',
            data: {
                is_profile_public: isPublic
            },
            success: function () {
                var status = jQuery('#designer-profile-toggle-status');
                status.fadeOut(function () {
                    status.text(
                        isPublic ? 'Your profile is currently visible to the public.'
                                : 'Your profile is currently hidden to the public.');
                    status.fadeIn();
                });
            },
            error: function () {
                alert('There was a problem making your profile ' + (isPublic ? 'public' : 'hidden') + '. Please try again later.');
            }
        });
    });
});

function makeCropit(ele, options) {
    var onChangeExport = debounce(function(){
        ele.children('.data-export[type=hidden]').val(ele.cropit('export', {
            type: 'image/jpeg',
            quality: 1,
            originalSize: true
        }));
    }, 750);

    var $preview = ele.find('.preview-image');
    var $range = ele.find('.crop-range');
    var $rotate = ele.find('.rotate');

    options = Object.assign({
        '$preview': $preview,
        '$zoomSlider': $range,
        imageBackground: true,
        allowCrossOrigin: true,
        onImageLoading: function(e) {
            ele.find('.mask').addClass('transparent');
        },
        onImageLoaded: function(e) {
            onChangeExport();

            $preview.addClass('draggable');
            $range.slideDown();
            $rotate.slideDown();
        },
        onZoomChange: onChangeExport,
        onOffsetChange: onChangeExport,
    }, (options || {}));

    $rotate.click(function () {
        ele.cropit('rotateCW');
    });

    return ele.cropit(options);
}

function showLoginModal(action, cb) {
    // account_login_modal
    jQuery('#login-modal').load('/login-modal?' + jQuery.param({
        action: action
    }),
    function () {
        var modalElm = jQuery('#login-modal');
        modalElm.data('callback', cb);
        modalElm.modal('show');

        modalElm.on('hide.bs.modal', function () {
            var closeSource = modalElm.data('closeSource');
            if (closeSource !== 'loginCallback' && closeSource !== 'signupCallback') {
                if (cb) {
                    cb(false);
                }
            }

            modalElm.data('closeSource', null);
        });
    });
}

function hideLoginModal(modal, eventSource, callbackArgs) {
    modal.data('closeSource', 'loginCallback');

    var cb = modal.data('callback');
    if (cb) {
        cb.apply(modal, callbackArgs);
    }

    // close the login modal
    modal.modal('hide');
}

function signupModalTransition(from, to) {
    var modalContent = $('#login-modal .modal-content');
    var oldHeight = modalContent.height();
    var newHeight = oldHeight - $(from).height() + $(to).height();
    modalContent.css('min-height', oldHeight + 'px');
    $(from).effect('slide', { direction: 'left', mode: 'hide' }, function () {
        modalContent.animate({ height: newHeight }, 300);
        modalContent.css('min-height', 'initial');
        $(to).effect('slide', { direction: 'right', mode: 'show' }, function () {
            setTimeout(function () {
                if ($(window).width() <= 1024) {
                    window.scrollTo(0, 0);
                }
            }, 100);

            // remove the height attribute, otherwise if we gain elements in the modal
            // they will be hidden. it was only needed to keep the screen from jumping 
            // during the animation
            modalContent.css('height', 'auto');
        });
    });
}
$(document).on('click', '[data-signup-modal-continue]', function () {
    var button = jQuery(this);
    var buttonText = button.text();
    var modal = button.parents('#login-modal');
    var newType = button.attr('data-signup-modal-continue');

    button.attr('disabled', 'disabled')
        .text('')
        .append(jQuery('<div class="loading-spinner"></div>'));

    jQuery.ajax({
        type: 'POST',
        url: '/api/v1/user/self/user-type/',
        data: { user_type: newType },
        success: function () {
            hideLoginModal(modal, 'signupCallback', [true]);

            button.attr('disabled', null)
                .text(buttonText)
                .find('.loading-spinner').detach();
        },
        error: function () {
            // since the user has an account, they will be allowed to continue,
            // so let's just ignore the error here.
            hideLoginModal(modal, 'signupCallback', [true]);

            button.attr('disabled', null)
                .text(buttonText)
                .find('.loading-spinner').detach();
        }
    })

    return false;
});
$(document).on('click', '[data-signup-modal-login]', function () {
    var current = jQuery(this).parents('.modal-body');
    signupModalTransition(current, '#signup-modal-login');
    jQuery('#login-modal .modal-header h2 > span').text('Log In');
    return false;
});
$(document).on('click', '[data-signup-modal-signup]', function () {
    var current = jQuery(this).parents('.modal-body');
    signupModalTransition(current, '#signup-modal-account-details');
    jQuery('#login-modal .modal-header h2 > span').text('Sign up');
    return false;
});

$(document).on('submit', '#signup-modal-form', function (e) {
    e.preventDefault();

    var form = jQuery(this);
    var button = jQuery('button[type="submit"]', form);
    var buttonText = button.text();
    var currentModal = form.parents('.modal-body');

    // hack - we aren't requring password confirmation on the front end anymore, but to maintain
    // backwards compatability with the endpoint we will just set it automatically on submission
    jQuery('[name="password2"]', form).val(jQuery('[name="password1"]', form).val());
    
    button.attr('disabled', 'disabled')
        .text('')
        .append(jQuery('<div class="loading-spinner"></div>'));
    
    jQuery('.error-row', form).fadeOut();

    jQuery.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: form.serialize(),
        success: function () {
            // after signing up, the CSRF token will change in Django!
            window.refreshCsrfToken();

            signupModalTransition(currentModal, '#signup-modal-account-type-select');

            button.attr('disabled', null)
                .text(buttonText)
                .find('.loading-spinner').detach();
        },
        error: function () {
            window.scrollTo(0, 0);

            jQuery('.error-row', form).fadeIn();
            
            button.attr('disabled', null)
                .text(buttonText)
                .find('.loading-spinner').detach();
        }
    });

    return false;
});

$(document).on('submit', '#login-modal-form', function (e) {
    e.preventDefault();

    var form = jQuery(this);
    var button = jQuery('button[type="submit"]', form);
    var buttonText = button.text();
    var modal = button.parents('#login-modal');

    button.attr('disabled', 'disabled')
        .text('')
        .append(jQuery('<div class="loading-spinner"></div>'));

    jQuery('.error-row', form).fadeOut();

    jQuery.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: form.serialize(),
        success: function () {
            hideLoginModal(modal, 'loginCallback', [true]);

            button.attr('disabled', null)
                .text(buttonText)
                .find('.loading-spinner').detach();
        },
        error: function () {
            jQuery('.error-row', form).fadeIn();

            button.attr('disabled', null)
                .text(buttonText)
                .find('.loading-spinner').detach();
        }
    });

    return false;
});
