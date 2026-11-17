
const mainSwiper = new Swiper(".visual .swiper", {
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // 마우스 및 터치 스와이프 허용
  allowTouchMove: true,
  simulateTouch: true,
  grabCursor: true,

  // 세로 스크롤은 유지하면서 가로 스와이프 허용
  touchStartPreventDefault: false,

  navigation: {
    prevEl: ".visual .prev_btn",
    nextEl: ".visual .next_btn",
  },
});
