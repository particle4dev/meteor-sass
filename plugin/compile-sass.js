// FIXME: open source map when node sass is 0.9.4
// https://github.com/sass/node-sass/issues/337#issuecomment-45845480

var fs = Npm.require('fs');
var path = Npm.require('path');
var sass = Npm.require('node-sass');
var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');

function compile(compileStep) {
  // XXX annoying that this is replicated in .css, .less, and .styl
  if (! compileStep.archMatches('web')) {
    // XXX in the future, might be better to emit some kind of a
    // warning if a stylesheet is included on the server, rather than
    // silently ignoring it. but that would mean you can't stick .css
    // at the top level of your app, which is kind of silly.
    return;
  }
  // support import
  // The underscore lets Sass know that the file is only a partial file and that it should not be generated into a CSS file.
  // Sass partials are used with the @import directive.
  var fullFileName = compileStep.inputPath.replace(/^.*[\\\/]/, '');
  if(fullFileName.charAt(0) == "_")
    return;
  // var source = compileStep.read().toString('utf8');
  var css,
  fir = new Future(),
  sourceMap;
  try {
    sass.render({
      //data: source,
      file: compileStep._fullInputPath,
      outputStyle: 'compressed',
      includePaths: [ path.dirname(compileStep._fullInputPath) ], // for @import
      // sourceComments: 'map',
      // sourceMap: null,
      success: function(c, s){
        css = c.replace(/sourceMappingURL=null/g,'');
        // sourceMap = JSON.parse(s);
        fir.return();
      },
      error: function(err){
        fir.throw(err);
      }
    });
    fir.wait();
  } catch (e) {
    var message = e.message ? e.message : e.toString();
    compileStep.error({
      message: "Sass compiler error >> " + message,
      sourcePath: e.filename || compileStep.inputPath,
      line: e.line - 1,
      column: e.column + 1
    });
    return;
  }
  // source map
  // https://github.com/meteor/meteor/blob/devel/packages/less/plugin/compile-less.js#L54
  // https://github.com/sass/node-sass#sourcemap
  // sourceMap = JSON.stringify(sourceMap);
  compileStep.addStylesheet({
    path: compileStep.inputPath + ".css",
    data: css,
    // sourceMap: sourceMap
  });

}

Plugin.registerSourceHandler("scss", compile);
// https://github.com/sass/libsass/issues/16
Plugin.registerSourceHandler("sass", compile);
