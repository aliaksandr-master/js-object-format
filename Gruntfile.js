"use strict";

module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');

	var nameCamelCase = pkg.name.replace(/-(\w)/g, function (w, $1) {
		return $1.toUpperCase();
	});

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		clean: {
			dist: ['dist']
		},

		template: {
			js: {
				options: {
					data: {
						name: nameCamelCase,
						content: grunt.file.read('src/js/module.js')
					}
				},
				files: [{
					src: 'src/js/template.ejs',
					dest: 'dist/' + pkg.name + '.js'
				}]
			}
		},

		uglify: {
			minify: {
				files: [{
					expand: true,
					cwd: 'dist',
					src: '**/*.js',
					dest: 'dist',
					ext: '.min.js'
				}]
			}
		},

		csscomb: {
			prepare: {
				options: {
					config: __dirname + '/.csscomb.json'
				},
				files: [{
					expand: true,
					overwrite: true,
					cwd: 'dist',
					src: '**/*.css',
					dest: 'dist'
				}]
			}
		},

		less: {
			minify: {
				options: {
					compress: true,
					cleancss: true,
					report: true
				},
				files: [{
					expand: true,
					cwd: 'dist',
					dest: 'dist',
					src: '**/*.css',
					ext: '.min.css'
				}]
			},

			styles: {
				options: {
					strictUnits: true,
					sourceMap: false,
					relativeUrls: true,
					report: false
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: 'src/styles',
					src: [
						'**/*.less',
						'!**/inc/**/*.less'
					],
					dest: 'dist',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			styles: {
				options: {
					browsers: ['last 3 version', 'ie 8'],
					diff: false,
					map: false
				},
				files: [{
					expand: true,
					overwrite: true,
					cwd: 'dist',
					dest: 'dist',
					src: '**/*.css'
				}]
			}
		}
	});

	grunt.registerTask('build', [
		'clean:dist',

		'less:styles',
		'autoprefixer:styles',
		'csscomb:prepare',
		'less:minify',

		'template:js',
		'uglify:minify'
	]);
};