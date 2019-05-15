$(document).ready(function() {
  var animation = true;
  $('.mini-background').on('click', function() {
    if (animation) {
      $('body').css('background-image', 'url('+$(this).data('img')+')');
      animation = false;
    }
    setTimeout(function() {animation = true}, 1000);
  });

  $('.start, .start-window_list-item').on('click', function() {
    $('.start').toggleClass('active');
    $('.start-window').toggleClass('active');
  });

  // $('.window_top-menu-link').on('click', function() {
  //   $('.window_top-menu-link').removeClass('active');
  //   $(this).addClass('active');
  //   $('.checkout-window_part').hide();
  //   $('.'+$(this).data('window')).show();
  // });

  $('.window_close').mouseup(function () {
    var startToHide = $(this).parent().parent().attr('class').split(' ')[1];
    //$('.start-line.'+startToHide).remove();
    $(this).parent().parent().hide();
  });

  $('.open-window').on('click', function() {
    openWindow (this);
  });

  $('.open-paint-window').on('click', function() {
    var cooldown = -900;

    $.each($('.paint'), function(i, el) {
      cooldown += 900;
      $(el).addClass('active');

      setTimeout(function() {
        $(el).show();
      }, cooldown);
    });
  });

  function openWindow (obj) {
    $('.'+$(obj).data('link')).show();
    $('.window').removeClass('active');
    $('.window.'+$(obj).data('link')).addClass('active');

    if(!$('.window.active .shirt-body .shirt-img-thumbnails').hasClass('slick-initialized')) {
      $('.window.active .shirt-body .shirt-img-thumbnails').slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev button">Prev</button>',
        nextArrow: '<button type="button" class="slick-next button">Next</button>'
      });
    }

    //$('.start-line').removeClass('active-line');

    // if(!$('.start-line').hasClass($(obj).data('link'))) {
    //   $('.start-lines').append('<div class="start-line '+$(obj).data('link')+' active-line">'+$(obj).text()+'</div>');
    // } else {
    //   $('.start-line.'+$(obj).data('link')).addClass('active-line');
    // }
  }

  $('.button').mousedown(function () {
    $('.button').removeClass('current');
    $(this).addClass('current');
  })

  $('.shirt_img-thumbnail').on('click', function() {
    $('.window.active .shirt-body .shirt_img').attr('src', $(this).attr('src'));
  });

  $('.pictures_img').on('click', function() {
    openWindow (this);
    if(!$('.window.active .main_images').hasClass('slick-initialized')) {
      $('.window.active .main_images').slick({
        infinite: true,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev button">Prev</button>',
        nextArrow: '<button type="button" class="slick-next button">Next</button>'
      });
    }
    $('.main_images').slick('slickGoTo', $(this).data('photo'), true);
  });

  var timer = 0;
  $('.desktop_icon').on('click', function() {
    if(timer == 0) {
      timer = 1;
      timer = setTimeout(function(){
        timer = 0;
      }, 600);
    } else {
      openWindow (this);
      timer = 0;
    }
  });

  $('.shipping-part').submit(function(e) {
     $('.window_top-menu-link').removeClass('active');
     $('.payment-link').addClass('active');
     $('.shipping-part').hide();
     $('.payment-part').show();
     e.preventDefault();
  });

  $('.place').on('click', function() {
    if($('#diffplace').prop("checked")) {
      $('.diffplace').show();
      $('.diffplace input, .diffplace select').prop('disabled', false);
    } else {
      $('.diffplace').hide();
      $('.diffplace input, .diffplace select').prop('disabled', true);
    }
  });

  $('.payment-part').submit(function(e) {
     $('.window_top-menu-link').removeClass('active');
     $('.review-link').addClass('active');
     $('.payment-part').hide();
     $('.review-part').show();
     e.preventDefault();
  });

  $('.mini-background').on('click', function() {
    $('.desktop_icon').removeClass('select');
    $('.desktop_icon.'+$(this).data('icon')).addClass('select');
  });

  function checkboxLock (checkbox) {
    checkbox.change(function() {
      if(this.checked) {
        $('.checkout-window_button').removeAttr('disabled');
      } else {
        $('.checkout-window_button').prop('disabled', true);
      }
    });
  }

  checkboxLock ($('#delivery'));
  checkboxLock ($('#shippingpolicy'));

  $('img').each(function(){
    $(this).attr('src', $(this).data('delayedsrc'));
  });
});
