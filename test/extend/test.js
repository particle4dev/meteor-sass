Tinytest.add("sass - extend", function(test) {
  var d = OnscreenDiv(Template.extend);
  d.node().css('display', 'block');

  var success = d.node().find('.successExtends');
  test.equal(success.css('border-color'), "rgb(0, 128, 0)", 'success fail');
  test.equal(success.css('border'), "1px solid rgb(0, 128, 0)");
  test.equal(success.css('padding'), "10px");
  test.equal(success.css('color'), "rgb(51, 51, 51)");

  var error = d.node().find('.errorExtends');
  test.equal(error.css('border-color'), "rgb(255, 0, 0)", 'error fail');

  var warning = d.node().find('.warningExtends');
  test.equal(warning.css('border-color'), "rgb(255, 255, 0)", 'warning fail');
  
  d.kill();
});