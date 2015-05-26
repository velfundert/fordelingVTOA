var gulp = require("gulp"),
	gulpcat = require("gulp-concat"),
	jshint = require("gulp-jshint");

gulp.task("default", function() {

});

gulp.task("build-tests", function() {
	return gulp.src(["csv_parse.js",
			"fordeling.js",
			"render.js",
			"saint_lague.js",
			"test/*js"] )
		.pipe(gulpcat("csv_parse.js"))
		.pipe(gulp.dest("test/built/"));
});

gulp.task("test", ["build-tests"], function() {
	var mocha = require("gulp-mocha");
	return gulp.src(["test/built/*.js"], { read: false })
		.pipe(mocha({
			reporter: "nyan",
		}));
});

gulp.task("clean", function(callback) {
	var del = require("del");
	del(["test/built/*"], callback);
});

gulp.task("lint", function(callback) {
	return gulp.src(["csv_parse.js",
			"render.js",
			"saint_lague.js",
			"fordeling.js",
			"app.js",
			"more.js" ])
		.pipe(jshint())
		.pipe(jshint.reporter("default"));
});

gulp.task("commit", ["lint", "test"]);
