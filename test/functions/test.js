Tinytest.add("sass - functions", function(test) {
  var d = OnscreenDiv(Template.functions);
  d.node().css('display', 'block');

  var i = d.node().find('.function-test');
  test.equal(i.css('margin'), '140px');
  test.equal(i.css('font-size'), '20px');

  var i = d.node().find('.color-test');
  test.equal(i.css('border'), '1px solid rgb(153, 0, 0)');

  d.kill();
});