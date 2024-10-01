"use strict";

const sliderContainer = document.querySelector(".slider_container");
const cardSlide = document.querySelector(".card_slide");
const items = Array.from(document.querySelectorAll(".card"));
const testimonial = document.querySelector(".testimonial");
const emailInput = document.querySelector("input");
const goButton = document.querySelector(".go");
const emailError = document.querySelector(".email_error");
const form = document.querySelector("form");
const mobileCarouselContainer = document.querySelector(".mobile_carousel_container");
const carouselTrack = document.querySelector(".carousel_track");
const nextButton = document.querySelector(".next_carousel_button");
const previousButton = document.querySelector(".previous_carousel_button");
const mobileSlides = Array.from(carouselTrack.children);
const mobileSlideSize = mobileSlides[0].getBoundingClientRect().width;
const mobileInputError = document.querySelector(".mobile_input");
const mobileGoButton = document.querySelector(".mobile_go");
const mobileEmailError = document.querySelector(".mobile_email_error");
console.log(mobileSlides);

let clonesWidth;
let sliderWidth;
const clones = [];
let disableScroll = false;
let scrollPosition;

const setMobileSlidePosition = (mobileSlide, index) => {
  mobileSlide.style.left = mobileSlideSize * index + "px";
};

mobileSlides.forEach(setMobileSlidePosition);

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
nextButton.addEventListener("click", (e) => {
  const currentMobileSlide = document.querySelector(".current_mobile_slide");
  const nextMobileSlide = currentMobileSlide.nextElementSibling;
  const amountToMove = nextMobileSlide.style.left;
  carouselTrack.style.transform = "translateX(-" + amountToMove + ")";
  currentMobileSlide.classList.remove("current_mobile_slide");
  nextMobileSlide.classList.add("current_mobile_slide");
});

previousButton.addEventListener("click", (e) => {
  const currentMobileSlide = document.querySelector(".current_mobile_slide");
  const previousMobileSlide = currentMobileSlide.previousElementSibling;
  const amountToMove = previousMobileSlide.style.left;
  carouselTrack.style.transform = "translateX(-" + amountToMove + ")";
  currentMobileSlide.classList.remove("current_mobile_slide");
  previousMobileSlide.classList.add("current_mobile_slide");
});
mobileGoButton.addEventListener("click", (e) => {
  const mobileInput = mobileInputError.value;
  if (mobileInput === "" || !mobileInput.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    mobileEmailError.classList.remove("hidden");
  } else {
    mobileEmailError.classList.add("hidden");
  }
});
