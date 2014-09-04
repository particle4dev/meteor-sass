Tinytest.add("sass - sass", function(test) {
  var d = OnscreenDiv(Template.sass);
  d.node().css('display', 'block');

  var p = d.node().find('.test-sass');
  test.equal(p.css('color'), "rgb(204, 204, 204)");

  d.kill();
});
