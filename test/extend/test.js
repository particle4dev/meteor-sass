Tinytest.add("sass - extend", function(test) {
  var d = OnscreenDiv(Template.extend);
  d.node().css('display', 'block');

  var message = d.node().find('.messageExtends');
  test.equal(message.css('border'), "1px solid rgb(204, 204, 204)");
  test.equal(message.css('padding'), "10px");
  test.equal(message.css('color'), "rgb(51, 51, 51)");

  var success = d.node().find('.successExtends');
  test.equal(success.css('border-color'), "rgb(0, 128, 0)", 'success fail');

  var error = d.node().find('.errorExtends');
  test.equal(error.css('border-color'), "rgb(255, 0, 0)", 'error fail');

  var warning = d.node().find('.warningExtends');
  test.equal(warning.css('border-color'), "rgb(255, 255, 0)", 'warning fail');
  
  // d.kill();
});