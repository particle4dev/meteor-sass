var fs = Npm.require('fs');
var path = Npm.require('path');
var sass = Npm.require('node-sass');
var Future = Npm.require('fibers/future');

function compile(compileStep) {
  
  if (! compileStep.archMatches('browser')) {
    return;
  }
  var source = compileStep.read().toString('utf8');
  var css;
  try {
    css = sass.renderSync({
      data: source,
      outputStyle: 'compressed',
      includePaths: [ path.dirname(compileStep._fullInputPath) ],
    });
  } catch (e) {
    compileStep.error({
      message: "Sass compiler error: " + e.message,
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