var fs = Npm.require('fs');
var path = Npm.require('path');
var sass = Npm.require('node-sass');

function compile(compileStep) {
  if (! compileStep.archMatches('browser')) {
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
      data: source,
      outputStyle: 'compressed',
      includePaths: [ path.dirname(compileStep._fullInputPath) ],
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
Plugin.registerSourceHandler("sass", compile);