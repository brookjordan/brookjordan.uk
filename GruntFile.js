module.exports = function(grunt) {

	var __tasks = {};



	addTask( 'default', [
			'copy:svgs', 'copy:dump', //'copy:baseHTML',

			'sass:referenced', 'autoprefixer:referenced',

			'uglify',

			'processhtml', 'relativeRoot', 'htmlmin',

			'newer:imagemin',
			'watch',
		]);

	//addTask( 'refresh', ['clean'], 'default' );





	grunt.initConfig({

		//	HTML Templating
		processhtml: {

			options: {
				includeBase: 'project/temp/includes',
				recursive: true,
				process: true,
			},

			dist: {
				files: [{
					expand: true,

					cwd: 'project/src/pages',
					src: '**/*.html',
					dest: 'project/temp/pages/compiled',
					ext: '.html',
				},],
			},

		},



		//	Change root URLs to be relative URLs
		relativeRoot: {
			yourTarget: {
				options: {
					root: 'project/temp/pages/compiled'
				},
				files: [{
					expand: true,
					cwd:  'project/temp/pages/compiled',
					src: [ '**/*.html' ],
					dest: 'project/temp/pages/relativeRoot'
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
				minifyJS:                      false,	// (could be true, false, Object (options))
				minifyCSS:                     false,	// (could be true, false, Object (options))
				minifyURLs:                    false,	// (could be Object (options))
				ignoreCustomComments:          [ ],
				processScripts:                [ ],
				ustomAttrAssign:               [ ],
				customAttrSurround:            [ ],
				//	maxLineLength: ,
				//	customAttrCollapse:,
			},

			dev: {
				files: [{
					expand: true,

					cwd: 'project/temp/pages/relativeRoot',
					src: '**/*.html',
					dest: 'project/build',
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
					dest: 'project/build/images',
				},],
			},
		},



		//	Render the css
		sass: {
			options: {
				//file: 'null',
				//data: 'null',
				//importer: 'undefined',
				//includePaths: '[]',
				//indentedSyntax: 'false',
				//omitSourceMapUrl: 'false',
				//outFile: 'null',
				outputStyle: 'compressed', //'nested'
				//precision: '5',
				//sourceComments: 'false',
				sourceMap: true,
				//sourceMapEmbed: 'false',
				sourceMapContents: true,
			},

			referenced: {
				files: [{
					expand: true,

					cwd: 'project/src/styles',
					src: '**/*.scss',
					dest: 'project/temp/styles/compiled',
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

			referenced: {
				files: [{
					expand: true,

					cwd: 'project/temp/styles/compiled',
					src: '**/*.css',
					dest: 'project/temp/includes/styles',
					ext: '.css',
				},],
			},
		},



		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: 'project/src/scripts',
					src: '**/*.js',
					dest: 'project/temp/includes/scripts',
					ext: '.js',
				},],
			},
		},



		//	Start fresh
		clean: {
			dump: [ "project/temp/", "project/build/", ],
		},



		//	Copy files that aren't processed
		copy: {
			baseHTML: {
				files: [
					{
						expand: true,
						cwd: 'project/src/pages/',
						src: ['**/*.*'],
						dest: 'project/temp/pages/base',
					},
				],
			},

			dump: {
				files: [
					{
						expand: true,
						cwd: 'project/src/dump/',
						src: ['**/*.*'],
						dest: 'project/build',
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
					'sass:referenced', 'autoprefixer:referenced',
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

	registerTasks();







	//	FUNCTIONS	//	FUNCTIONS	//

	function addTask ( taskName, prependTasks, appendTasks ) {

		var newTaskList = [];
		var i = 1;

		while ( !!arguments[i] ) {

			if ( typeof arguments[i] === 'string' && __tasks[ arguments[i] ] ) {
				newTaskList = newTaskList.concat( __tasks[ arguments[i] ] );
			} else {
				newTaskList = newTaskList.concat( arguments[i] );
			}

			i+=1;

		}

		__tasks[ taskName ] = newTaskList;

	}



	function registerTasks () {
		Object.keys( __tasks ).forEach ( function ( value, index, array ) {
			grunt.registerTask( value, __tasks[value] );
		});
	}

};