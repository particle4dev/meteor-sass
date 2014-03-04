Tinytest.add("sass - presence", function(test) {

  var d = OnscreenDiv(Meteor.render(function() {
    return '<p class="test-class"><b class="example"></b></p>'; }));
  d.node().style.display = 'block';

  var p = d.node().firstChild;
  test.equal(getStyleProperty(p, 'font'), "normal normal normal 14px/normal Helvetica, sans-serif");

  test.equal(getStyleProperty(p, 'color'), "rgb(204, 204, 204)");

  // test @import
  var i = d.div.getElementsByClassName('example');
  test.equal(getStyleProperty(i[0], 'color'), "rgb(255, 0, 0)");

  d.kill();
});