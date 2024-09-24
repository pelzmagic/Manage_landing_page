"use strict";

const sliderContainer = document.querySelector(".slider_container");
const cardSlide = document.querySelector(".card_slide");
const items = Array.from(document.querySelectorAll(".card"));
const testimonial = document.querySelector(".testimonial");
const emailInput = document.querySelector("input");
const goButton = document.querySelector(".go");
const emailError = document.querySelector(".email_error");
const form = document.querySelector("form");
let clonesWidth;
let sliderWidth;
const clones = [];
let disableScroll = false;
let scrollPosition;

items.forEach((item) => {
  let clone = item.cloneNode(true);
  clone.classList.add("clone");
  cardSlide.appendChild(clone);
  clones.push(clone);
});

function getCloneWidth() {
  let width = 0;
  clones.forEach((clone) => {
    width = width + clone.offSetWidth;
  });
  return width;
}

function getScrollPosition() {
  return testimonial.scrollY;
}
function scrollUpdate() {
  scrollPosition = getScrollPosition();
  if (clonesWidth + scrollPosition >= sliderWidth) {
    testimonial.scrollTo({ top: 1 });
  } else if (scrollPosition <= 0) {
    testimonial.scrollTo({ top: sliderWidth - clonesWidth - 1 });
  }

  cardSlide.style.transform = `translateX(${-window.scrollY}px)`;

  requestAnimationFrame(scrollUpdate);
}

function onLoad() {
  calculateDimensions();
  //   testimonial.style.height = `${sliderWidth}px`;
  testimonial.scrollTo({ top: 1 });
  scrollUpdate();
}

function calculateDimensions() {
  sliderWidth = cardSlide.getBoundingClientRect().width;
  clonesWidth = getCloneWidth();
}

onLoad();
goButton.addEventListener("click", () => {
  const email = emailInput.value;
  if (!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.classList.remove("hide");
  } else {
    emailError.classList.add("hide");
    form.reset();
  }
});
