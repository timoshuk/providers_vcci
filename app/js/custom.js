"use strict";

window.onload = function () {
  var gItem = document.querySelectorAll(".green-services__item");

  $(".green-services__slider").slick({
    mobileFirst: true,
    infinite: false,
    arrows: false,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 600,
      settings: {
        dots: true,
        slidesToShow: 2
      }
    }, {
      breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 3
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  function blockSize() {
    var size = 0;
    for (var i = 0; i < gItem.length; i++) {
      var colSize = gItem[i].offsetHeight;
      if (size < colSize) {
        size = colSize;
      }
    }
    for (var k = 0; k < gItem.length; k++) {
      gItem[k].style.height = size + "px";
    }
  }
  blockSize();

  window.addEventListener("resize", function () {
    blockSize();
  }, false);
};