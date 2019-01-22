"use strict";

window.onload = function () {
  var acordionBtn = document.querySelectorAll(".acordion__button");

  for (var i = 0; i < acordionBtn.length; i++) {
    acordionBtn[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      var sib = this.nextElementSibling;

      if (sib.classList.contains("acordion--active")) {
        sib.classList.remove("acordion--active");
      } else {
        //  Згортає всі активні блоки при розгортанні блоку акордиона
        // for (let k = 0; k < acordionBtn.length; k++) {
        //   let sibItem = acordionBtn[k].nextElementSibling;
        //   sibItem.classList.remove("acordion--active");
        // }
        setTimeout(function () {
          sib.classList.add("acordion--active");
        }, 400);
      }
    });
  }
};