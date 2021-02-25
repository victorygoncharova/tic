(() => {
    'use strict';
    document.addEventListener("DOMContentLoaded", () => {
      const burgerMenu = (wrapperSelector, menuSelector, activeClass) => {
        const wrapper = document.querySelector(wrapperSelector),
          menu = wrapper.querySelector(menuSelector),
          active = activeClass;
  
        menu.addEventListener("click", () => {
          wrapper.classList.toggle(active);
          if (wrapper.classList.contains(active)) {
            window.document.body.style.overflow = "hidden";
          } else {
            window.document.body.style.overflow = "";
          }
        });
      };
  
      burgerMenu(".header", ".burger-menu", "open");
    });
  })();