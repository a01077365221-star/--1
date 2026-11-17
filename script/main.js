
/* 1. 4가지 기준 슬라이드 */
const prevValueButton = document.querySelector(".value_slide .prev_btn");
const nextValueButton = document.querySelector(".value_slide .next_btn");
const valueButtons = document.querySelectorAll(".content_control button");
const valueList = document.querySelector(".value_list");
const valueView = document.querySelector(".value_view");

if (valueList && valueView) {
  const valueItems = valueList.querySelectorAll(".value_item");
  let mobileValueIndex = 0;
  let mobileValueTimer;

  // 카드 슬라이드 이동
  function moveValueSlide(index) {
    if (!valueItems[index]) return;

    let moveDistance;

    // 태블릿: 두 장씩 표시
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      moveDistance =
        index === 0
          ? 0
          : valueItems[2].offsetLeft - valueItems[0].offsetLeft;
    } else {
      // PC와 모바일: 기존 방식 유지
      moveDistance =
        valueItems[index].offsetLeft - valueItems[0].offsetLeft;
    }

    valueList.style.transform =
      "translateX(-" + moveDistance + "px)";
  }

  // 현재 컨트롤 버튼 표시
  function setActiveButton(index) {
    valueButtons.forEach(function(button) {
      button.classList.remove("active");
    });

    if (valueButtons[index]) {
      valueButtons[index].classList.add("active");
    }
  }

  // 모바일 슬라이드 이동
  function moveMobileSlide(index) {
    mobileValueIndex = index;
    moveValueSlide(mobileValueIndex);
    setActiveButton(mobileValueIndex);
  }

  // 모바일 자동 슬라이드
  function startMobileSlide() {
    clearInterval(mobileValueTimer);

    mobileValueTimer = setInterval(function() {
      mobileValueIndex++;

      if (mobileValueIndex >= valueItems.length) {
        mobileValueIndex = 0;
      }

      moveMobileSlide(mobileValueIndex);
    }, 3000);
  }

  // PC 및 태블릿 버튼
  if (window.innerWidth > 767) {
    if (prevValueButton) {
      prevValueButton.addEventListener("click", function() {
        moveValueSlide(0);
        setActiveButton(0);
      });
    }

    if (nextValueButton) {
      nextValueButton.addEventListener("click", function() {
        moveValueSlide(2);
        setActiveButton(1);
      });
    }

    if (valueButtons[0]) {
      valueButtons[0].addEventListener("click", function() {
        moveValueSlide(0);
        setActiveButton(0);
      });
    }

    if (valueButtons[1]) {
      valueButtons[1].addEventListener("click", function() {
        moveValueSlide(2);
        setActiveButton(1);
      });
    }
  }

  // 모바일 버튼 및 자동 슬라이드
  if (window.innerWidth <= 767) {
    valueButtons.forEach(function(button, index) {
      button.addEventListener("click", function() {
        if (index < valueItems.length) {
          moveMobileSlide(index);
          startMobileSlide();
        }
      });
    });

    startMobileSlide();
  }

  // 마우스 드래그 및 터치 스와이프
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  valueView.addEventListener("pointerdown", function(e) {
    startX = e.clientX;
    currentX = e.clientX;
    isDragging = true;

    valueView.setPointerCapture(e.pointerId);
  });

  valueView.addEventListener("pointermove", function(e) {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  function endValueDrag() {
    if (!isDragging) return;

    isDragging = false;

    const distance = currentX - startX;

    // 40px 미만 이동은 무시
    if (Math.abs(distance) < 40) return;

    // 모바일: 한 장씩 이동
    if (window.innerWidth <= 767) {
      let nextIndex = mobileValueIndex;

      if (distance < 0) {
        nextIndex++;
      } else {
        nextIndex--;
      }

      if (nextIndex >= valueItems.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = valueItems.length - 1;

      moveMobileSlide(nextIndex);
      startMobileSlide();


} else {
  // PC 및 태블릿: 두 화면 사이에서만 이동
  const currentTransform = valueList.style.transform;
  const isSecondPage =
    currentTransform !== "" &&
    currentTransform !== "translateX(0px)" &&
    currentTransform !== "translateX(-0px)";

  if (distance < 0) {
    // 오른쪽에서 왼쪽으로 드래그
    if (!isSecondPage) {
      moveValueSlide(2);
      setActiveButton(1);
    }
  } else {
    // 왼쪽에서 오른쪽으로 드래그
    if (isSecondPage) {
      moveValueSlide(0);
      setActiveButton(0);
    }
  }
}

  }

  valueView.addEventListener("pointerup", endValueDrag);
  valueView.addEventListener("pointercancel", endValueDrag);
}


/* 2. 메인 비주얼 슬라이드 */

const visualButtons = document.querySelectorAll(".visual_control button");

const swiper = new Swiper(".visual .swiper", {
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },

  // 마우스 및 터치 스와이프
  allowTouchMove: true,
  simulateTouch: true,
  grabCursor: true,
  touchStartPreventDefault: false,

  navigation: {
    prevEl: ".visual .prev_btn",
    nextEl: ".visual .next_btn"
  },

  on: {
    slideChange: function() {
      visualButtons.forEach(function(button, index) {
        button.classList.toggle(
          "active",
          index === this.realIndex
        );
      }, this);
    }
  }
});

// 하단 컨트롤 버튼
visualButtons.forEach(function(button, index) {
  button.addEventListener("click", function() {
    swiper.slideToLoop(index);
  });
});


/* ==============================
   3. 모바일 메뉴 아코디언
============================== */

const menuItems = document.querySelectorAll(".gnb > ul > li");

menuItems.forEach(function(item) {

  const menu = item.querySelector(":scope > a");

  if (menu) {
    menu.addEventListener("click", function(e) {

      if (window.innerWidth <= 767) {

        e.preventDefault();

        menuItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove("open");
          }
        });

        item.classList.toggle("open");
      }
    });
  }
});


const topBtn = document.querySelector(".top_btn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});
