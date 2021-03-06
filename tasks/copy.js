/**
 * 复制静态文件任务
 * @author lukezhu
 * @date 2016-03-28
 */

var combiner = require('stream-combiner2');
var mozRevAll = require('moz-rev-all');

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('copy:tmp', function() {
        return gulp.src(conf.parsePwd(conf.staticFiles), { base: conf.parsePwd(conf.app) })
            .pipe(gulp.dest(conf.parsePwd(conf.tmp)));
    });

    gulp.task('copy:dist', function() {
        var revAll = new mozRevAll({
            hashLength          : 4,
            fileNameManifest    : 'manifest.json',
            dontGlobal          : conf.revIgnore,
            dontRenameFile      : conf.revIgnoreRename,
            dontSearchFile      : conf.revIgnoreSearch,
            dontUpdateReference : conf.revIgnoreUpdate
        });

        return gulp.src(conf.parsePwd(conf.revFiles), { base: conf.parsePwd(conf.tmp) })
            .pipe($.if(conf.build.hash, revAll.revision()))
            .pipe(gulp.dest(conf.parsePwd(conf.dist)))
            .pipe($.if(conf.build.hash && revAll.revisioner.files.length > 0, revAll.versionFile()))
            .pipe($.if(conf.build.hash && revAll.revisioner.files.length > 0, gulp.dest(conf.parsePwd(conf.tmp))));
    });
}
