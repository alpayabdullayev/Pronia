const dropdowns = document.querySelectorAll(".dropdown");
const USD_UL = document.querySelector(".USD__UL");
const english_ul = document.querySelector(".english__ul");
const englsih_btn = document.getElementById("englsih__btn");
const USD_btn = document.getElementById("USD__btn");
const body = document.querySelector("body");

function toggleDropdown(dropdown, otherDropdown) {
  if (otherDropdown.classList.contains("show")) {
    otherDropdown.classList.remove("show");
  }
  dropdown.classList.toggle("show");
}

USD_btn.addEventListener("click", (e) => {
  toggleDropdown(USD_UL, english_ul);
});

englsih_btn.addEventListener("click", (e) => {
  toggleDropdown(english_ul, USD_UL);
});

window.addEventListener("scroll", function () {
  let position = window.scrollY;
  let navbar2 = document.getElementById("navbar2");

  if (position > 170) {
    navbar2.style.display = "block";
    navbar2.style.position = "fixed";
    navbar2.style.top = "0";
    navbar2.style.left = "0";
    navbar2.style.width = "100%";
    navbar2.style.backgroundColor = "#fff";
  } else {
    navbar2.style.display = "none";
  }
});
const imageUrls = [
  "https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-1-524x617.png",
  "https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png",
];

const sliderImg = document.getElementById("slider__image");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const sliderHero = document.getElementById("sliderHero");
let currentIndex = 0;

function showImage(index) {
  sliderImg.src = imageUrls[index];
  AOS.refresh();
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
  showImage(currentIndex);

  AOS.refresh();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageUrls.length;
  showImage(currentIndex);

  AOS.refresh();
});

showImage(currentIndex);

document.body.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  sliderImg.style.transform = `translate(${-clientX / 100}px, ${
    -clientY / 100
  }px)`;
});

let searchIcon = document.getElementById("searchIcon");
let overlay = document.getElementById("overlay");
let closeXBtn = document.getElementById("closeXBtn");
searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.opacity = "1";
  overlay.style.visibility = "visible";
  overlay.style.transform = "translateY(0)";
  body.style.overflow = "hidden";
  closeXBtn.addEventListener("click", (e) => {
    overlay.style = "none";
    body.style.overflow = "initial";
  });
});


  const tabButtons = document.querySelectorAll(".tab-ul li a");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const category = button.parentElement.getAttribute("data-category");

      document.querySelectorAll(".cardData").forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        card.style.display = cardCategory === category ? "block" : "none";
      });
    });
  });
