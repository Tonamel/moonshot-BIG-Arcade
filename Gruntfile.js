module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			all: ["source/lib/*.js"],
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				laxcomma: true
			}
		},

		less: {
			development:{
				files:{
					"source/css/main.css": "source/css/style.less"
				}
			}
		},

		copy: {
			nw: {
				files: [{
					expand: true,
					cwd: "build/moonshot/win64",
					src: ['**'],
					dest: './'
				}]
			}
		},

		nodewebkit: {
			options: {
				platforms: ['win'],
				buildDir: './build' // Where the build version of my node-webkit app is saved
			},
			src: ['./source/**/*'] // Your node-webkit app
		},

		watch:{
			scripts: {
				files: ["source/lib/**/*.js", "!source/lib/vendor/**/*.js"],
				tasks: ["jshint"],
				options: {
					spawn: false,
					livereload: true
				}
			},
			css: {
				files: ["source/css/*less"],
				tasks: ["less:development"],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-node-webkit-builder');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['nodewebkit', 'copy:nw']);
};