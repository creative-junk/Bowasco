function loadModal(url) {
    $('#modal-wrapper .modal-body').load(url, function(responseText, status, xhr){
        $('#modal-wrapper').addClass('show');
        setTimeout(function(){
            $('#modal-wrapper .modal-body').addClass('show');
        }, 100);
    });
}

function loadModalWithElement(elm) {
    var modal = $('#modal-wrapper');
    var modalBody = $('.modal-body', modal);

    // clear whatever is there already
    modalBody.html('');

    modalBody.append(elm);

    modal.addClass('show');
    setTimeout(function(){
        modalBody.addClass('show');
    }, 100);
}

function showModal(type) {
    var url = '/modals/' + type + '_login_required/';
    loadModal(url);
}

$('.modal').on('tap', function(e) {
    e.stopPropagation();
});

$('.modal').on('click', function(e){
    var target = $(e.target);
    if(target.closest('a').hasClass('dismiss-modal')){
        e.stopPropagation();
        e.preventDefault();
        $('div.modal').removeClass('show');
        setTimeout(function(){
            $('#modal-wrapper').removeClass('show');
        }, 300);
    }
});

$(document).on('click', '.modal-close-icon', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('.modal-body').removeClass('show');
    setTimeout(function(){
        $('#modal-wrapper').removeClass('show');
    }, 600);

    $('#modal-wrapper').trigger('modalClose');
});

$(document).on('click', '.modal-trigger', function(e){
    e.stopPropagation();
    e.preventDefault();
    var target = $(e.target).closest('a');
    var url = target.attr('href');
    loadModal(url);
});

$(document).on('click', '.modal-cancel', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('.modal-body').removeClass('show');
    setTimeout(function(){
        $('#modal-wrapper').removeClass('show');
    }, 600);
});

$(document).on('click', function(e){
    if($(e.target).is('.modal-body') === 'false') {
        $('.modal-body').removeClass('show');
        setTimeout(function(){
            $('#modal-wrapper').removeClass('show');
        }, 600);
    }
});

$(document).on('tap', function(){
    $('.modal-body').removeClass('show');
    $('#modal-wrapper').removeClass('show');
});

$(document).on('submit', '.modal-form', function(e){
     e.stopPropagation();
     e.preventDefault();
     var form = this;
     var displayErrors = $(form).data('display-errors');
     var url = window.location.protocol + "//" + window.location.host + $(form).attr('action');
     var formMethod = $(form).attr('method');
     var formData = $(form).serialize();
     $('.errorlist').addClass('hide');
     $('.errorlist').empty();
     $('.input-single').each(function (index, element) {
          $(element).removeClass('error');
     });
     $.ajax({
         method: formMethod,
         url: url,
         data: formData,
         dataType: 'json',
     }).done(function(data) {
       location.reload();
      }).fail(function(data){
          if ('errorList' in data.responseJSON){
              for (var key in data.responseJSON.errorList){
                $('[name=' + key + ']').closest('.input-single').addClass('error');
                if(displayErrors) {
                    $('.errorlist').removeClass('hide');
                    for (var error in data.responseJSON.errorList[key]) {
                        $('.errorlist').append('<li>' + data.responseJSON.errorList[key][error] + '</li>');
                    }
                }
              }
          }
      });
});
