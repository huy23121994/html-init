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

  // handle active combobox
  $('[data-type="combobox"]').click(function() {
    $(this).toggleClass('active');
  })

  // handle click out side combobox
  var comboboxs = $('[data-type="combobox"]');
  $(this).on('click', function ($event) {
    comboboxs.toArray().forEach(function (combobox) {
      if (
        !$(combobox).is($event.target) &&
        $(combobox).has($event.target).length === 0) {
        $(combobox).removeClass('active');
      }
    })
  })

  // handle range-slider changes value to update UI
  $('[data-type="rangeSlider"]').toArray().forEach(function(rangeSlider) {
    // progress element
    var rangeSliderProgress = $(rangeSlider).children('[data-type="rangeSliderProgress"]');
    
    // input element
    var rangeInput = $(rangeSlider).children('input[type="range"]');

    // update width rangeSliderProgress when input change 
    rangeInput.on('input', function ($event) {
      updateRangeSliderProgressData($event, rangeSliderProgress, rangeInput);
    });

    // init rangeSliderProgress width
    var initWidthEvent = {
      target: {
        value: rangeInput.attr('value'),
        attributes: {
          max: {
            value: rangeInput.attr('max')
          },
          min: {
            value: rangeInput.attr('min')
          }
        }
      }
    }
    updateRangeSliderProgressData(initWidthEvent, rangeSliderProgress, rangeInput);
  })

  // handle slideDown
  $('[data-name="slideDown"] [data-name="slideDownHeader"]').on('click', function ($event) {
    var slideDown = $(this).closest('[data-name="slideDown"]');
    var slideDownIcon = $(this).find('.slidedownIcon');

    if (slideDown.hasClass('active')) {
      slideDown.removeClass('active');
      slideDown.find('.slidedownIcon').removeClass('active');
      return;
    }

    var group = slideDown.attr('data-group');
    if (group) {
      var itemsHaveSameGroup = $('[data-name="slideDown"][data-group="' + group + '"]');
      itemsHaveSameGroup.toArray().forEach(function (item) {
        $(item).removeClass('active');
        $(item).find('.slidedownIcon').removeClass('active');
      })
    }
    slideDown.addClass('active');
    slideDownIcon.addClass('active');
  })

  // handle tab
  $('[data-name="tabNavItem"]').on('click', function () {
    console.log($(this).attr('data-tab'));
    var dataTab = $(this).attr('data-tab');

    var tabEle = $(this).closest('[data-name="tab"]');
    $(tabEle).find('[data-name="tabNavItem"]').removeClass('active');
    $(tabEle).find('[data-name="tabContentItem"]').removeClass('active');

    $(tabEle).find('[data-name="tabNavItem"][data-tab="' + dataTab + '"]').addClass('active');
    $(tabEle).find('[data-name="tabContentItem"][data-tab="' + dataTab + '"]').addClass('active');
  })

  // handle close filter box on mobile
  $('[data-name="closeFilter"]').on('click', function () {
    $('[data-name="filterBox"]').removeClass('active')
  })

  // handle open filter box on mobile
  $('[data-name="openFilter"]').on('click', function () {
    $('[data-name="filterBox"]').addClass('active')
  })
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

var updateRangeSliderProgressData = function ($event, rangeSliderProgress, rangeInput) {
  // get the current value
  var currentValue = $event.target.value;
  var max = $event.target.attributes.max.value;
  var min = $event.target.attributes.min.value;
  var rangeInputWidth = rangeInput.width();
  var circleWidth = 15;

  
  // var percent = Math.floor((currentValue - 30) / (max - min) * 10000) / 100 + '%';
  var percent = (currentValue / (max - min) * (1 - circleWidth/rangeInputWidth)) * 100 + '%';

  rangeSliderProgress
    .css('width', percent)
    .attr('data-value', currentValue);
}