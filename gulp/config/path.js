// Получем имя папки проэкта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // Папка с результатом текущего проэкта
const srcFolder = `./src`;    // Папка с исходниками текущего проэкта

// Переенная "path" которая содержит в себе все пути
export const path = {
	build: { // Расположение результатов
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
	},
	src: { // Расположение необходимых исходников
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	watch: { // Файлы за которыми наблюдаем
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,icon,webp}`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `test`, // Вписать имя папки на уделенном сервере (сервер/test/Имя папи проэкта/результат)
}