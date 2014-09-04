Tinytest.add("sass - presence", function(test) {
  var d = OnscreenDiv(Template.presence);
  d.node().css('display', 'block');

  var p = d.node().find('.test-class');
  test.equal(p.css('color'), "rgb(204, 204, 204)");
  test.equal(p.css('padding'), '6px 12px');

  d.kill();
});
