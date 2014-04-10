var OnscreenDiv = function(tmp){
  var div = document.createElement('div');
  UI.materialize(tmp, div);
  div.style.display = 'block';
  document.body.appendChild(div);
  return {
    kill: function(){
      document.body.removeChild(div);
    },
    node: function(){
      return $(div);
    }
  }
}

Tinytest.add("sass - presence", function(test) {
  var d = OnscreenDiv(Template.presence);
  d.node().css('display', 'block');

  var p = d.node().find('.test-class');
  test.equal(p.css('font'), "normal normal normal 14px/normal Helvetica, sans-serif");
  test.equal(p.css('color'), "rgb(204, 204, 204)");

  // test @import
  var i = p.find('.example');
  test.equal(i.css('color'), "rgb(0, 128, 0)");

  d.kill();
});

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
  
  d.kill();
});

Tinytest.add("sass - operators", function(test) {
  var d = OnscreenDiv(Template.operators);
  d.node().css('display', 'block');

  var i = d.node().find('.complimentary');
  test.equal(i.css('float'), "right", 'operators fail');
  test.equal(i.css('font-size'), "18px", 'operators fail');

  d.kill();
});

Tinytest.add("sass - sass files", function(test) {
  var d = OnscreenDiv(Template.sassFiles);
  d.node().css('display', 'block');

  var i = d.node().find('.child');
  test.equal(i.css('color'), "rgb(204, 204, 204)");
  d.kill();
});

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