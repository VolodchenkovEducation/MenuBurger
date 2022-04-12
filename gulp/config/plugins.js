import replace from "gulp-replace"; // Плагин поиска и замены
import plumber from "gulp-plumber"; // Плагин обработки ошибок
import notify from "gulp-notify";   // Сообщения (подсказки)
import browsersync from "browser-sync";  // Локальный сервер
/* GULP-NEWER Проверяет есть ли в папке с результатом картинки и обновит только те, которых нет */
import newer from "gulp-newer"; // Проверка обновления картинок 
import ifPlugin from "gulp-if"; // Плагин ветевления на разаботчика и постпродакшн

// Экспортируем объект в который будем собирать общие плагины.
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}