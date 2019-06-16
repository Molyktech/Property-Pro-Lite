console.log("connected");

const rangeSlider = document.querySelector("#range-line");
let rangePoint = document.querySelector("#range-span");
const tabIcons = document.querySelectorAll(".list-tab");
const tabContent = document.querySelectorAll(".tab-text");

const navSlider = () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  hamburgerMenu.addEventListener("click", () => {
    //Toggle Nav
    nav.classList.toggle("nav-active");

    //Animate the links
    navLinks.forEach((link, index) => {
      //check if the link has animation
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.3}s`;
      }
    });

    //Hamburger style
    hamburgerMenu.classList.toggle("hamburger-toggle");
  });
};

navSlider();

//function for the slider in the hero form

const showSliderValue = () => {
  rangePoint.textContent = rangeSlider.value;
  let rangePosition = rangeSlider.value / rangeSlider.max;
  rangePoint.style.left = rangePosition * 180 + "px";
};

rangeSlider.addEventListener("input", showSliderValue, false);

//for the tabs
const tabSwitch = () => {
  const removeBorder = () => {
    tabIcons.forEach(item => item.classList.remove("tab-border"));
  };

  const removeShowClass = () => {
    tabContent.forEach(item => item.classList.remove("show"));
  };
  tabIcons.forEach((item, index) => {
    item.addEventListener("click", () => {
      removeBorder();
      removeShowClass();
      item.classList.add("tab-border");
      // console.log(item.id);
      const tabContentItem = document.querySelector(`#${item.id}-content`);
      //Add show class
      tabContentItem.classList.add("show");
    });
  });
};
tabSwitch();
