Tinytest.add("sass - import", function(test) {
  var d = OnscreenDiv(Template.import);
  d.node().css('display', 'block');

  var i = d.node().find('.example-import');
  test.equal(i.css('display'), "inline-block");
  test.equal(i.css('color'), "rgb(0, 0, 0)");
  d.kill();
});