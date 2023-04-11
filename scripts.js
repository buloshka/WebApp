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
    document.querySelectorAll('button:not(#help, .center__chat__textarea-1__button)').forEach((button) => {
        button.setAttribute('type', 'submit');
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

// Всплывающая подсказка
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.left__left button:not(#help)');
    const tooltips = document.querySelectorAll('.left__left .tooltip');

    function showTooltip(button, tooltip) {
        const buttonRect = button.getBoundingClientRect();
        tooltip.style.top = `${buttonRect.top + window.scrollY + buttonRect.height / 2 - tooltip.offsetHeight / 2}px`;
        tooltip.style.left = `${buttonRect.right + 10}px`;
        tooltip.style.opacity = '1';
    }

    function hideTooltip(tooltip) {
        tooltip.style.opacity = '0';
    }

    buttons.forEach((button, index) => {
        const tooltip = tooltips[index];

        button.addEventListener('mouseenter', function () {
            showTooltip(button, tooltip);
        });

        button.addEventListener('mouseleave', function () {
            hideTooltip(tooltip);
        });
    });
});

// При нажатии на HELP
document.addEventListener("DOMContentLoaded", function () {
    const helpButton = document.getElementById("help");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    function closeOverlay() {
        overlay.style.display = "none";
    }

    function showOverlay() {
        overlay.style.display = "flex";
    }

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    helpButton.addEventListener("click", showOverlay);

    const helpZone = document.createElement("div");
    helpZone.classList.add("help-zone");
    overlay.appendChild(helpZone);

    const helpTitle = document.createElement("h2");
    helpTitle.classList.add("help-title");
    helpTitle.textContent = "Нужна помощь?";
    helpZone.appendChild(helpTitle);

    const createButton = (text, onClick) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add("help-button");
        button.addEventListener("click", onClick);
        return button;
    };

    const callManagerButton = createButton("Позвать менеджера", () => {
        showNotification("Менеджер скоро подойдет к вам!");
    });

    const sendRequestButton = createButton("Отослать заявку", () => {});

    const callAdminButton = createButton("Позвать администратора", () => {
        showNotification("Администратор скоро подойдет к вам!");
    });

    let notificationActive = false;

    const notification = document.createElement("div");
    notification.classList.add("notification");
    document.body.appendChild(notification);

    function showNotification(message, duration = 4000) {
        if (notificationActive) return;

        notificationActive = true;
        const notification = document.querySelector('.notification');
        notification.innerHTML = `<div class="in-notification"><span class="cancel-text">${message}</span><button class="cancel-button">Отмена</button><div class="timer-bar"></div></div>`;
        notification.style.display = 'block';

        const cancelButton = notification.querySelector('.cancel-button');
        cancelButton.addEventListener('click', () => {
            clearTimeout(notificationTimeout);
            hideNotification();
        });

        const timerBar = notification.querySelector('.timer-bar');
        timerBar.style.animationDuration = `${duration}ms`;
        timerBar.style.animationName = 'timer, gradient';

        const notificationTimeout = setTimeout(() => {
            hideNotification();
            // Выполнить действия после завершения таймера
        }, duration);
    }

    function hideNotification() {
        const notification = document.querySelector('.notification');
        notification.style.display = 'none';
        notification.innerHTML = '';
        notificationActive = false;
    }

    const cancelButton = createButton("Отмена", closeOverlay);
    cancelButton.classList.add("help-button-cancel");

    function showForm() {
        resetForm();
        helpTitle.textContent = "Отправка заявки";
        sendRequestButton.style.display = "none";
        callManagerButton.style.display = "none";
        callAdminButton.style.display = "none";
        formContainer.style.display = "flex";
        cancelButton.style.display = "none";
    }

    function hideForm() {
        helpTitle.textContent = "Нужна помощь?";
        sendRequestButton.style.display = "block";
        callManagerButton.style.display = "block";
        callAdminButton.style.display = "block";
        formContainer.style.display = "none";
        cancelButton.style.display = "block";
    }

    function resetForm() {
        roles.forEach((role) => {
            document.querySelector(`#recipient-${role}`).checked = false;
        });
        subjectInput.value = "";
        descriptionInput.value = "";
    }

    function validateForm() {
        const subjectFilled = subjectInput.value.trim() !== "";
        const descriptionFilled = descriptionInput.value.trim() !== "";
        const radioSelected = roles.some((role) => document.querySelector(`#recipient-${role}`).checked);

        return subjectFilled && descriptionFilled && radioSelected;
    }

    sendRequestButton.addEventListener("click", showForm);

    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");
    helpZone.appendChild(formContainer);

    const recipientLabel = document.createElement("label");
    recipientLabel.classList.add("form-label");
    recipientLabel.textContent = "Кому:";
    formContainer.appendChild(recipientLabel);

    const radioGroup = document.createElement("div");
    radioGroup.classList.add("form-radio-group");
    formContainer.appendChild(radioGroup);
    radioGroup.appendChild(recipientLabel);

    const roles = ["менеджер", "администратор", "директор"];
    roles.forEach((role) => {
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "recipient";
        radioInput.value = role;
        radioInput.id = `recipient-${role}`;
        radioGroup.appendChild(radioInput);

        const radioLabel = document.createElement("label");
        radioLabel.classList.add("form-radio-label");
        radioLabel.setAttribute("for", `recipient-${role}`);
        radioLabel.textContent = role;
        radioGroup.appendChild(radioLabel);
    });

    const subjectLabel = document.createElement("label");
    subjectLabel.classList.add("form-label");
    subjectLabel.textContent = "Тема:";
    formContainer.appendChild(subjectLabel);

    const subjectInput = document.createElement("input");
    subjectInput.classList.add("form-input");
    subjectInput.type = "text";
    formContainer.appendChild(subjectInput);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.classList.add("form-label");
    descriptionLabel.textContent = "Описание:";
    formContainer.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("form-input", "form-textarea");
    descriptionInput.rows = 5;
    formContainer.appendChild(descriptionInput);

    subjectInput.classList.add('custom-input');
    descriptionInput.classList.add('custom-textarea');

    const submitButton = createButton("Отправить", () => {
        if (validateForm()) {
            // Код для обработки данных формы и отправки заявки
        } else {
            showNotification("Нужно заполнить все поля!", 4000);
        }
    });
    formContainer.appendChild(submitButton);

    const backButton = createButton("Назад", hideForm);
    backButton.classList.add("help-button-cancel");
    formContainer.appendChild(backButton);

    helpZone.appendChild(callManagerButton);
    helpZone.appendChild(sendRequestButton);
    helpZone.appendChild(callAdminButton);
    helpZone.appendChild(cancelButton);
    
    /* ЗДЕСЬ ПОИСК ID */
    const plusButton = document.querySelector('.left__right__center__plus');
    const plusImg = document.querySelector('#img-plus');
    const idInput = document.querySelector('#id-input');
    const titleLabel = document.querySelector('.left__right__center__title');
    let inputVisible = false;

    plusButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (!inputVisible) {
            idInput.value = '';
            plusImg.classList.add('rotated');
            plusImg.classList.remove('rotatedBack');
            titleLabel.style.display = 'none';

            idInput.type = 'text';
            idInput.placeholder = 'Введите ID';
            inputVisible = true;

            idInput.focus();
            idInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();

                    // Здесь запрос на сервер и обработка ответа
                    const response = {}; // Пустой словарь для примера

                    if (Object.keys(response).length === 0) {
                        showNotification('Коллега не был найден :(', 1000);
                    } else {
                        // Создать диалог здесь
                    }
                }
            });
        } else {
            plusImg.classList.remove('rotated');
            plusImg.classList.add('rotatedBack');

            idInput.type = 'hidden';
            inputVisible = false;
            titleLabel.style.display = 'block';
        }
    });
});

// Убрать scroll-bar
document.addEventListener('DOMContentLoaded', function() {
    const leftGroup = document.querySelector('.left__left__group');
    const formTextarea = document.querySelector('.form-textarea');
    const buttonChats = document.querySelector('.left__right__center__chat-item');
    const groupChats = document.querySelector('#chat-block');
    const textareaChat = document.querySelector('.center__chat__textarea-1__text');
    const listChats = document.querySelector('.__info-list');

    [leftGroup,
        formTextarea,
        buttonChats,
        groupChats,
        textareaChat,
        listChats,].forEach((element, index) => {
        scrollbarNot(element, index);
    });

    function scrollbarNot(element, index) {
        if (element) {
            element.style.scrollbarWidth = 'none';
            element.style.msOverflowStyle = 'none';
            element.style.overflow = 'scroll';

            const style = document.createElement('style');
            const selector = `no-scrollbar-${index}`;
            element.classList.add(selector);

            style.innerHTML = `
            .${selector}::-webkit-scrollbar {
                display: none;
            }
        `;
            document.head.appendChild(style);
        }
    }
});

// Кнопки разных диалогов
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.left__right__center__men button');

    buttons[0].style.background = '#afafaf';
    buttons[0].style.transform = 'translateY(5px)';

    let activeButton = buttons[0];

    buttons.forEach(button => {
        button.addEventListener('mousedown', function () {
            buttons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.style.background = '';
                    otherButton.style.transform = '';
                }
            });

            button.style.background = '#AFAFAF';
            button.style.transform = 'translateY(5px)';
            activeButton = button;
        });

        button.addEventListener('mouseenter', function () {
            if (button !== activeButton) {
                activeButton.style.transform = '';
            }
        });

        button.addEventListener('mouseleave', function () {
            if (button !== activeButton) {
                activeButton.style.transform = 'translateY(5px)';
            }
        });
    });
});

// Картинка лупы для input
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input:not(.form-input)');

    inputs.forEach(input => {
        if (input.id === 'id-input') {
            input.style.backgroundImage = 'url("data:image/svg+xml;utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'%23D3D3D3\'%3E%3Ctext x=\'0\' y=\'15\' font-family=\'Arial\'%3E%23%3C/text%3E%3C/svg%3E")';
            input.addEventListener('keydown', function(e) {
                if (e.key.match(/[^0-9]/) && !e.ctrlKey && !e.metaKey && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                    e.preventDefault();
                }
            });
        } else {
            input.style.backgroundImage = 'url("./css/Icons/Search.svg")';
            input.addEventListener('keydown', function(e) {
                if (e.key.match(/[^A-Za-zА-Яа-яЁё\s]/) && !e.ctrlKey && !e.metaKey && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                    e.preventDefault();
                }
            });
        }
        input.style.backgroundPosition = '6px center';
        input.style.backgroundRepeat = 'no-repeat';
    });
});

// Для кнопок диалогов
document.addEventListener('DOMContentLoaded', function() {
    const chatButtons = document.querySelectorAll('.left__right__center__chat');

    chatButtons.forEach(chatButton => {
        chatButton.addEventListener('mouseover', () => {
            if (!chatButton.classList.contains('active')) {
                chatButton.style.backgroundColor = '#656565';
            }
        });

        chatButton.addEventListener('mouseout', () => {
            if (!chatButton.classList.contains('active')) {
                chatButton.style.backgroundColor = '';
            }
        });

        chatButton.addEventListener('click', (e) => {
            chatButtons.forEach(otherChatButton => {
                otherChatButton.classList.remove('active');
                otherChatButton.style.backgroundColor = '';
            });

            chatButton.classList.add('active');
            chatButton.style.backgroundColor = '#333333';

            // отправка формы
            //chatButton.closest('form').submit();
        });
    });
});

// Выпадающее иное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.center__header__other');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

// Отправка формы при нажатии li в меню
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dropdown-form');
    const selectedOption = document.getElementById('selectedOption');
    const menuItems = document.querySelectorAll('.dropdown-menu li');

    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', function(event) {
            selectedOption.value = event.target.getAttribute('data-value');
            form.submit();
        });
    });
});

// НЕ ЗАБЫТЬ СДЕЛАТЬ ОТПРАВКУ ФОРМЫ ДЛЯ ФАЙЛОВ И ИНОГО В ЦЕНТРЕ

// Для ввода сообщений и прокрутки вни вниз
function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    let maxHeight = parseInt(getComputedStyle(textarea).maxHeight);
    let newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';

    // Прокрутить вниз
    scrollToBottom(textarea);
}

// Изменение высот элементов
window.onresize = function() {
    const chatBlock = document.getElementById('chat-block');
    const centerChatTextarea = document.querySelector('.center__chat__textarea');

    // Измените высоту блоков в соответствии с вашими требованиями
    chatBlock.style.height = '...';
    centerChatTextarea.style.height = '...';
};
document.addEventListener('DOMContentLoaded', function() {
    let textarea = document.querySelector('.center__chat__textarea-1__text');
    autoResizeTextarea(textarea);
});

// Перенос строки или отправка сообщения
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('.center__chat__textarea-1__text');

    textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                // Если нажаты Shift + Enter, разрешить перенос строки
            } else {
                event.preventDefault(); // Отменить создание новой строки
                // Здесь будет отправка формы
                // ...
            }
        }
    });
});

