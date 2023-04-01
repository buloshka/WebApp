// Состояние кнопок
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.left__left button');
    const buttonImages = document.querySelectorAll('.left__left .button__img');
    const logoButtons = document.querySelectorAll('.left__left__logo');
    const logoImages = document.querySelectorAll('.left__left__logo__img');
    const buttonHelp = document.getElementById('help');
    
    [logoButtons, logoImages].forEach((elements) => {
        elements.forEach((element) => {
            element.classList.add('button-focused');
            element.style.borderRadius = '30%';
        });
    });

    /* ВРЕМЕННО */
    document.querySelectorAll('button').forEach((button) => {
        button.setAttribute('type', 'button');
    });
    /* ВРЕМЕННО */

    function applyBorderRadius(elements, borderRadius) {
        elements.forEach((element) => {
            element.style.borderRadius = borderRadius;
        });
    }

    function clearButtonFocused() {
        buttons.forEach((button) => {
            button.classList.remove('button-focused');
        });
        applyBorderRadius(buttons, '50%');
        applyBorderRadius(buttonImages, '50%');
    }

    buttons.forEach((button) => {
        button.addEventListener('mouseenter', function () {
            applyBorderRadius([button, button.querySelector('.button__img')], '30%');
        });

        button.addEventListener('mouseleave', function () {
            if (!button.classList.contains('button-focused')) {
                applyBorderRadius([button, button.querySelector('.button__img')], '50%');
            }
        });

        button.addEventListener('mousedown', function () {
            applyBorderRadius([button, button.querySelector('.button__img')], '30%');
        });

        button.addEventListener('mouseup', function () {
            applyBorderRadius([button, button.querySelector('.button__img')], '30%');
        });

        button.addEventListener('click', function () {
            if (button !== buttonHelp) {
                clearButtonFocused();
                button.classList.add('button-focused');
                applyBorderRadius([button, button.querySelector('.button__img')], '30%');
            }
        });
    });
});

// Убрать scroll-bar
document.addEventListener('DOMContentLoaded', function() {
    const leftGroup = document.querySelector('.left__left__group');
    if (leftGroup) {
        leftGroup.style.scrollbarWidth = 'none'; // для Firefox
        leftGroup.style.msOverflowStyle = 'none'; // для IE 11
        leftGroup.style.overflow = 'scroll';

        // для Chrome, Safari и других браузеров на основе Webkit
        const style = document.createElement('style');
        style.innerHTML = `
            .left__left__group::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
});
