import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";                                // Плагин переименоваия CSS файла (из SCSS в CSS)

import cleanCss from "gulp-clean-css";                           // Плагин сжатия CSS файла
/* Плагин вывода WEBP изображений, требует дополнительной установки webp-converter@2.2.3
Также плагин требует прописать доп.код в JS. */
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";                    // Плагин добавления вендорных префиксов (делет верстку кросс-браузерной)
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Плагин группировки медиа запросов (@media)


const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.replace(/@img\//g, '../img/')) // Обработка алиасов (псевдонимов) т.е. маска замены @img меняем на img
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss({
					webpClass: ".webp",
					noWebpClass: ".no-webp",
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,                                  // Подключаем поддержку GRID
					overrideBrowserslist: ["last 3 versions"],    // Количество версий браузера
					cascade: true,
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.css)) // Если нужет несжатый дубликат файла СSS. Т.е. будет 2 файла CSS и MIN.CSS
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream()); // Необходимо чтобы браузер постоянно обновллся сам.
}