Package.describe({
  summary: "SASS for meteor"
});
// meteor test-packages ./
Package._transitional_registerBuildPlugin({
  name: "compileSass",
  use: [],
  sources: [
    'plugin/compile-sass.js'
  ],
  npmDependencies: {"node-sass": "0.9.3"}
});

Package.on_test(function (api) {
  api.use(['test-helpers', 'tinytest', 'jquery', 'templating', 'sass']);

  api.add_files([
    'test/oscreenDiv.js',

    'test/presence/template.html',
    'test/presence/style.scss',
    'test/presence/test.js',

    'test/extend/template.html',
    'test/extend/style.scss',
    'test/extend/test.js',

    'test/operators/template.html',
    'test/operators/style.scss',
    'test/operators/test.js',

    'test/mixin/template.html',
    'test/mixin/style.scss',
    'test/mixin/test.js',

    'test/import/template.html',
    'test/import/style.scss',
    'test/import/test.js',

  ], 'client');
});