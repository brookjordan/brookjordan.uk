module.exports = function(grunt) {

	var __tasks = {};





	grunt.registerTask( 'dev', [
			'copy:svgs', 'copy:devDump',

			'sass:dev', 'autoprefixer:dev',

			'copy:devJS',

			'relativeRoot',

			'newer:imagemin',
		]);

	grunt.registerTask( 'prod', [
			'copy:prodImages', 'copy:prodDump',

			'processhtml',

			'useminPrepare',
			'concat:generated', 'cssmin:generated', 'uglify:generated',
			'usemin',

			'htmlmin:prod',
		]);

	grunt.registerTask( 'RESET', [
			'clean:created',
		]);

	grunt.registerTask('build', [
			'RESET',
			'dev', 'prod',
		]);

	grunt.registerTask( 'default', [
			'dev',
			'watch',
		]);

	//grunt.registerTask( 'refresh', ['clean'], 'default' );





	grunt.initConfig({

		//	HTML Templating
		processhtml: {

			options: {
				recursive: true,
				process: true,
				commentMarker: 'process',
			},

			prod: {
				files: [{
					expand: true,

					cwd: 'project/dev',
					src: '**/*.html',
					dest: 'project/prod',
					ext: '.html',
				},],
			},

		},





		useminPrepare: {
			html: 'project/dev/index.html',

			options: {
				dest: 'project/prod',
			},
		},





		usemin: {
			html: 'project/prod/index.html',
		},







		//	Change root URLs to be relative URLs
		relativeRoot: {
			yourTarget: {
				options: {
					root: 'project/src/pages'
				},

				files: [{
					expand: true,
					cwd:  'project/src/pages',
					src: [ '**/*.html' ],
					dest: 'project/dev',
				},],
			},
		},







		css_url_relative: {
			styles: {
				options: {
					staticRoot: 'project',
				},

				files: [{
					expand: true,
					cwd:  'project/dev/styles',
					src: [ '**/*.css' ],
					dest: 'project/dev/styles_rel',
				},],
			},
		},







		//	Minify the HTML
		htmlmin: {
			options: {
				removeComments:                true,
				removeCommentsFromCDATA:       false,
				removeCDATASectionsFromCDATA:  false,
				collapseWhitespace:            true,
				conservativeCollapse:          true,
				preserveLineBreaks:            false,
				collapseBooleanAttributes:     false,
				removeAttributeQuotes:         false,
				removeRedundantAttributes:     false,
				preventAttributesEscaping:     false,
				useShortDoctype:               false,
				removeEmptyAttributes:         false,
				removeScriptTypeAttributes:    false,
				removeStyleLinkTypeAttributes: false,
				removeOptionalTags:            false,
				removeIgnored:                 false,
				removeEmptyElements:           false,
				lint:                          false,
				keepClosingSlash:              false,
				caseSensitive:                 false,
				minifyJS:                      true,	// (could be true, false, Object (options))
				minifyCSS:                     true,	// (could be true, false, Object (options))
				minifyURLs:                    false,	// (could be Object (options))
				ignoreCustomComments:          [ ],
				processScripts:                [ ],
				ustomAttrAssign:               [ ],
				customAttrSurround:            [ ],
				//	maxLineLength: ,
				//	customAttrCollapse:,
			},

			prod: {
				files: [{
					expand: true,

					cwd: 'project/prod',
					src: '**/*.html',
					dest: 'project/prod',
					ext: '.html',
				},],
			},
		},







		//	Minify the images
		imagemin: {
			options: {
				progressive: true,
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'project/src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'project/dev/images',
				},],
			},
		},







		//	Render the css
		sass: {
			options: {
				//file: null,
				//data: null,
				//importer: undefined,
				//includePaths: [],
				//indentedSyntax: false,
				//omitSourceMapUrl: false,
				//outFile: null,
				outputStyle: 'nested', //compressed
				precision: 5,
				//sourceComments: false,
				sourceMap: true,
				//sourceMapEmbed: false,
				sourceMapContents: true,
			},

			dev: {
				files: [{
					expand: true,

					cwd: 'project/src/styles',
					src: '**/*.scss',
					dest: 'project/dev-temp/styles/compiled',
					ext: '.css',
				},],
			},
		},







		//	Make the CSS work with older browsers
		autoprefixer: {
			options: {
				browsers: ['last 10 versions', 'ie 8', 'ie 9'],
				map: true
			},

			dev: {
				files: [{
					expand: true,

					cwd: 'project/dev-temp/styles/compiled',
					src: '**/*.css',
					dest: 'project/dev/styles',
					ext: '.css',
				},],
			},
		},







		uglify: {
			options: {
				sourceMap: true,
				sourceMapIncludeSources: true,
			},

			dev: {
				files: [{
					expand: true,
					cwd: 'project/src/scripts',
					src: '**/*.js',
					dest: 'project/dev/scripts',
					ext: '.js',
				},],
			},

			generated: {},
		},







		cssmin: {
			options: {
				sourceMap: true,
			},

			generated: {},
		},







		concat: {
			options: {
				sourceMap: true,
				sourceMapStyle: 'embed',
			},

			generated: {},
		},







		//	Start fresh
		clean: {
			dump: [ "project/dev-temp/", "project/dev/", ],

			created: [ "project/dev-temp/", "project/dev/", "project/prod/", ],
		},







		//	Copy files that aren't processed
		copy: {
			prodHTML: {
				files: [
					{
						expand: true,
						cwd: 'project/dev',
						src: ['**/*.html'],
						dest: 'project/prod',
					},
				],
			},

			prodImages: {
				files: [
					{
						expand: true,
						cwd: 'project/dev/',
						src: ['images/**/*.*'],
						dest: 'project/prod',
					},
				],
			},

			devJS: {
				files: [
					{
						expand: true,
						cwd: 'project/src/scripts',
						src: ['**/*.js'],
						dest: 'project/dev/scripts',
					},
				],
			},

			devDump: {
				files: [
					{
						expand: true,
						cwd: 'project/src/dump/',
						src: ['**/*.*'],
						dest: 'project/dev',
					},
				],
			},

			prodDump: {
				files: [
					{
						expand: true,
						cwd: 'project/src/dump/',
						src: ['**/*.*'],
						dest: 'project/prod',
					},
				],
			},

			svgs: {
				files: [
					{
						expand: true,
						cwd: 'project/src/images/',
						src: ['**/*.svg'],
						dest: 'images',
					},
				],
			},
		},







		//	Update the above when required
		watch: {
			options: {
				reload: true,
				spawn: false,
			},

			html: {
				files: [ 'project/src/pages/**/*.html' ],
				tasks: [ 'processhtml', 'relativeRoot', 'htmlmin', ]
			},

			styles: {
				files: [ 'project/src/styles/**/*.scss' ],
				tasks: [
					'sass:dev', 'autoprefixer:dev',
					'processhtml', 'relativeRoot', 'htmlmin',
				]
			},

			scripts: {
				files: [ 'project/src/scripts/**/*.js' ],
				tasks: [
					'uglify',
					'processhtml', 'relativeRoot', 'htmlmin',
				]
			},

			images: {
				files: [ 'project/src/images/**/*.*' ],
				tasks: [ 'newer:imagemin', ]
			},

			dump: {
				files: [ 'project/src/dump/**/*.*' ],
				tasks: [ 'copy:dump', ]
			},
		},





	});



	require('load-grunt-tasks')(grunt);

};