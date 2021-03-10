(() => {
  document.addEventListener("DOMContentLoaded", (e) => {
    const modals = () => {
      function bindModal(
        triggerSelector,
        modalSelector,
        closeSelector,
        activeClass
      ) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const scroll = calcScroll();
        const fixedHeader = document.querySelector('.header');
        const fixedHeaderWidth = fixedHeader.clientWidth;


        trigger.forEach((item) => {
          item.addEventListener("click", (e) => {
            if (e.target) {
              e.preventDefault();
            }
            modal.classList.add(activeClass);
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scroll}px`;
            fixedHeader.style.width = `${fixedHeaderWidth}px`;
          });
        });

        close.addEventListener("click", ({ target }) => {
          if (!target.closest(closeSelector)) return;
          modal.classList.remove(activeClass);
          document.body.style.overflow = "";
          document.body.style.marginRight = `0px`;
        });

        modal.addEventListener("click", ({ target }) => {
          if (target.closest(".popup__body")) return;

          modal.classList.remove(activeClass);
          document.body.style.overflow = "";
          document.body.style.marginRight = `0px`;
        });
      }

      function calcScroll() {
        let div = document.createElement("div");

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();

        return scrollWidth;
      }

      bindModal("[data-popup-trigger]", ".popup", ".popup__close", "open");
    };

    modals();
  });
})();
