$(document).ready(function () {
  if ($(".swiper-wrapper").html() == "") {
    $(".swiper-wrapper").html("");
    $(".swiper-wrapper").append($(".features-text .row").html());
    $(".swiper-wrapper .features-item").addClass("swiper-slide").removeClass("col-6");
  }

  makeSwipe();
  $(window).resize(function () {
    makeSwipe();
  });

  $('.features-item').click(function () {
    showImg(this)
  })

  $('.collapse').on('show.bs.collapse', function () {
    $(this).parent().addClass('active');
  })
  $('.collapse').on('hide.bs.collapse', function () {
    $(this).parent().removeClass('active');
  })

  $('#myModal').on('hidden.bs.modal', function (e) {
    $(this).find('iframe').removeAttr('src');
  })

  $('#myModal').on('show.bs.modal', function (e) {
    var src = $(this).data('video');
    $(this).find('iframe').attr('src', src);
  })

  new StarRating('.star-rating', {
    showText: false
  });

  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });

});

var makeSwipe = (function () {
  var sw;
  return function () {
    if (window.innerWidth < 1120) {
      $(".features .row").hide();
      $(".index-swiper").show();
      if (!sw) {
        sw = new Swiper(".index-swiper", {
          pagination: {
            el: ".swiper-pagination",
          },
        });
      }
    } else {
      $(".index-swiper").hide();
      $(".features .row").show();
    }
  };
})();

var showImg = function (context) {
  if (window.innerWidth >= 1120) {
    var url = $(context).find('.features-item-img').attr('src')
    $('.features-img img').fadeOut(function () {
      $(this).attr('src', url).fadeIn()
    })
  }
};

var handleMenu = (function () {
  var isOpenMenu = 'open';
  return function (open) {
    isOpenMenu = open;
    if (isOpenMenu == 'open') {
      $('.nav-left, .overlay').addClass('active');
    } else {
      $('.nav-left, .overlay').removeClass('active');
    }
  }
})();

var scrollx = function (element) {
  $([document.documentElement, document.body]).animate({
    scrollTop: $(element).offset().top
  }, 300);
}