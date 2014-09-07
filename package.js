Package.describe({
  summary: "SASS for meteor",
  version: "0.2.8", // when meteor is 1.0
  name: "particle4dev:sass",
  git: "https://github.com/particle4dev/meteor-sass.git"
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
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
  api.use(['test-helpers', 'tinytest', 'jquery', 'templating', 'blaze', 'ui', "particle4dev:sass"]);

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

    'test/functions/template.html',
    'test/functions/style.scss',
    'test/functions/test.js',

    'test/mixin/template.html',
    'test/mixin/style.scss',
    'test/mixin/test.js',

    'test/import/template.html',
    'test/import/style.scss',
    'test/import/test.js',

    'test/sass/template.html',
    'test/sass/style.sass',
    'test/sass/test.js',

  ], 'client');
});
