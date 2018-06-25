window.onload = function() {
  // Skider
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
      if (size < colSize) {
        size = colSize;
      }
    }
    for (let k = 0; k < gItem.length; k++) {
      gItem[k].style.height = `${size}px`;
    }
  }
  blockSize();

  window.addEventListener(
    "resize",
    function() {
      setTimeout(blockSize, 600);
    },
    false
  );

  // End Slider

  let acordionBtn = document.querySelectorAll(".acordion__button");

  for (let i = 0; i < acordionBtn.length; i++) {
    acordionBtn[i].addEventListener("click", function(evt) {
      evt.preventDefault();
      let sib = this.nextElementSibling;
      if (sib.classList.contains("acordion--active")) {
        sib.classList.remove("acordion--active");
      } else {
        for (let k = 0; k < acordionBtn.length; k++) {
          let sibItem = acordionBtn[k].nextElementSibling;
          sibItem.classList.remove("acordion--active");
        }
        setTimeout(() => {
          sib.classList.add("acordion--active");
        }, 400);
      }
    });
  }
};
