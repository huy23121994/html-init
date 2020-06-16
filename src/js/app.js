$(document).ready(function () {
  if ($(".swiper-wrapper").html() == "") {
    $(".swiper-wrapper").html("");
    $(".features-left, .features-right").each(function () {
      $(".swiper-wrapper").append($(this).html());
    });
    $(".swiper-wrapper .features-item").addClass("swiper-slide");
  }

  makeSwipe();
  $(window).resize(function () {
    makeSwipe();
  });

  $('.features-item').click(function() {
    showImg(this)
  })
});

var makeSwipe = (function () {
  var sw;
  return function () {
    if (window.innerWidth < 1120) {
      $(".features .row").hide();
      $(".swiper-container").show();
      if (!sw) {
        sw = new Swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination",
          },
        });
      }
    } else {
      $(".swiper-container").hide();
      $(".features .row").show();
    }
  };
})();

var showImg = function (context) {
  if (window.innerWidth >= 1120) {
    var url = $(context).find('.features-item-img').attr('src')
    $('.features-img img').hide().attr('src', url).fadeIn()
  }
};
