import * as fileFunction from "./modules/functions.js"; // Include functions.js
fileFunction.isWebp();                                  // From functions.js call function "isWebp"

/* Information about Swiper https://swiperjs.com/get-started */
//import Swiper, { Navigation, Pagination } from 'swiper'; // Подключаем Swiper (необходима установка $ npm i -D swiper)
//const swiper = new Swiper();

"use strict"
/* ----------------------------- Determining the type of device ------------------------- */
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

/* ---- 1. Adding subclass of _touch or _pc to BODY ------------------------- */
/* ---- 2. Bring together all arrows on the site to the menuArrow ----------- */
/* ---- 3. Add animation for all arrows ------------------------------------- */
if (isMobile.any()) {
	document.body.classList.add('--touch');

	let menuArrows = document.querySelectorAll('.menu__arrow'); // Собираем в переменную все стрелочки, которые есть на сайте
	if (menuArrows.length > 0) {                                // Проверяем есть ли хоть одна стрелочка в массиве
		for (let i = 0; i < menuArrows.length; i++) {                    //Пробегаем по всем элементам массива
			const menuArrow = menuArrows[i];                        // Создаем переменную с номером стрелки
			// Навешиваем функцию "click" c добавление модификатора к родительскому элементу:
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('--active');
			});
		}
	}
} else {
	document.body.classList.add('--pc');
}
/* ---- Activation of the Menu-Burger on click and --------------------------------
------- LOCK the SCROLL of web page whem sub menu opened ----------------------- */
// We need to get the Menu-Burger object
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
// Checking do we have such the object ".menu__icon"
if (iconMenu) {
	// If we have the ".menu__icon" object, we add the "--actve" moddifier to const menuBody
	// Create "click" event
	iconMenu.addEventListener("click", function (e) {
		iconMenu.classList.toggle('--active'); // for animation the menu_icon
		menuBody.classList.toggle('--active'); // for active sub__menu
		// add new modifier for BODY the "--lock" for disable scroll
		document.body.classList.toggle('--lock');
	})
}



/* ---- Creation of scroll on click to a section of the site ------------------ */
/* ---- 1. Bring together DATA-GOTO in to the variable ------------------------ */
/* Квадратные скобки говорят о том, что нужно собирать не все объекты с классом .menu_link, а только те, у которых есть атрибут data-goto */
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	/* Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве. */
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});
	function onMenuLinkClick(e) {
		const menuLink = e.target; // Создаем переменную, которой присваиваем значение целевого объекта, т.к. тот на кторый ма фактически кликнули
		// проверяем есть ли дата отрубут и существует ли объект на который он ссылается
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			// Если все ок в переменную получаем сам объект
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			// Нужно высчитать положение объекта с учетом высоты шапки
			// gotoBlock.getBoundingClientRect().top - получаем расстояние от верха до объекта в px
			// pageYOffset (Y потому что по вертикали) - добавляем количество прокрученных px
			// document.querySelector('header').offsetHeight - Отнимаем высоту шапки. Это нужно чтобы не скрыть часть контента по шапкой.
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			/* Close SUB MENU when we click on to MENU LIST */
			// Create function. If "menuIcon" contains modifier "--active" we must remove next modifiers: Body --lock, menuIcon --active, menuBody --active
			if (iconMenu.classList.contains('--active')) {
				document.body.classList.remove('--lock');
				iconMenu.classList.remove('--active');
				menuBody.classList.remove('--active');
			}

			// Сам код, который заставит скролл прокрутиться к нужному месту.
			// Обращаемся к окну браузера window, к встроенной функции которая занимается управлением прокруткой
			window.scrollTo({
				// указываем от куда прокрутиться top и на какое расстояние gotoBlockValue
				top: gotoBlockValue,
				// указываем параметр прокрутки, т.е. плавная
				behavior: "smooth"
			});
			// Отключаем работу ссылки, что бы она не переходила в HREF, а просто выполняла прокрутку.
			e.preventDefault();
		}
	}
}
