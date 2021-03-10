(() => {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {

        const screenWidth = document.documentElement.clientWidth;

        if (screenWidth >= 767) return;

        const activeMenuItem = () => {
            const sections = document.querySelectorAll('[data-section]');
            const menuItems = document.querySelectorAll('.nav__link');

            const activeSection = () => {
                sections.forEach((item, i) => {
                    item.addEventListener('mouseover', () => {
                            activeMenu(i);
                        
                    });
                });
            };

            const activeMenu = (index) => {
                menuItems.forEach((item, i) => {
                    item.classList.remove('active-item');
                    if (index === i) {
                        item.classList.add('active-item');
                    }
                });
            }
            
            activeSection();
        };

        activeMenuItem();
    });
})();
