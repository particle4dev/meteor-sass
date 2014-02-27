Tinytest.add("sass - presence", function(test) {

  var d = OnscreenDiv(Meteor.render(function() {
    return '<p class="test-class"></p>'; }));
  d.node().style.display = 'block';

  var p = d.node().firstChild;
  test.equal(getStyleProperty(p, 'font'), "normal normal normal 14px/normal Helvetica, sans-serif");

  // test @import
  test.equal(getStyleProperty(p, 'color'), "rgb(204, 204, 204)");

  d.kill();
});