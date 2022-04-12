import fileInclude from "gulp-file-include";      // Плагин (Пл-н) склеивания html страницы из кусков
import webpHtmlNosvg from "gulp-webp-html-nosvg"  // Плагин (Пл-н) приоритетного подключения фтормата .webp
import versionNumber from "gulp-version-number"   // Пл-н добавления ключи к файлам, заставляя обновлять кеш в браузере

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileInclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/')) // Маска замены @img меняем на img
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({                       // По сути к адресу css и js файлов добавляет текущую дату и время
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json' // Создастся файл в котором будет храниться данный ключ
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream()); // Необходимо чтобы браузер постоянно обновллся сам.
}