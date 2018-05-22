window.onload = function() {
  let gItem = document.querySelectorAll(".green-services__item");

  $(".green-services__slider").slick({
    mobileFirst: true,
    infinite: false,
    arrows: false,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  function blockSize() {
    let size = 0;
    for (let i = 0; i < gItem.length; i++) {
      let colSize = gItem[i].offsetHeight;
      size = size > colSize ? size : colSize;
    }
    for (let k = 0; k < gItem.length; k++) {
      gItem[k].style.height = size + "px";
    }
  }
  blockSize();

  window.addEventListener("resize", blockSize, false);
};
