export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}` // Папка от куда отслеживаем файл
		},
		notify: false, // Отключений собщений в браузере (по желанию можно включить)
		port: 3000,
	});
}