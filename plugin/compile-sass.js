var fs = Npm.require('fs');
var path = Npm.require('path');
var sass = Npm.require('node-sass');

function compile(compileStep) {
  // XXX annoying that this is replicated in .css, .less, and .styl
  if (! compileStep.archMatches('web') && !compileStep.archMatches('brower')) {
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
  var source = compileStep.read().toString('utf8');
  var css;
  try {
    css = sass.renderSync({
      //data: source,
      file: compileStep._fullInputPath,
      outputStyle: 'compressed',
      includePaths: [ path.dirname(compileStep._fullInputPath) ],
      sourceComments: 'none'
    });
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
  var filename = compileStep.inputPath.replace(/\.[^\.]+$/, '.css');
  compileStep.addStylesheet({
    path: filename,
    data: css
  });
};

Plugin.registerSourceHandler("scss", compile);