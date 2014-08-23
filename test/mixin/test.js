Tinytest.add("sass - mixin", function(test) {
  var d = OnscreenDiv(Template.mixin);
  d.node().css('display', 'block');

  var i = d.node().find('.boxMixin');
  //chrome only
  test.equal(i.css('border-radius'), "10px");
  //test.equal(i.css('-webkit-border-radius'), "10px");
  //test.equal(getStyleProperty(i[0], '-ms-border-radius'), "10px");
  //test.equal(getStyleProperty(i[0], '-moz-border-radius'), "10px");
  d.kill();
});