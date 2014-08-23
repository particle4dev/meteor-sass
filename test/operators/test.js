Tinytest.add("sass - operators", function(test) {
  var d = OnscreenDiv(Template.operators);
  d.node().css('display', 'block');

  var i = d.node().find('.complimentary');
  test.equal(i.css('float'), "right", 'operators fail');
  test.equal(i.css('font-size'), "18px", 'operators fail');

  d.kill();
});