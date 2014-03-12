Tinytest.add("sass - presence", function(test) {

  var d = OnscreenDiv(Meteor.render(function() {
    return '<p class="test-class"><b class="example"></b></p>'; }));
  d.node().style.display = 'block';

  var p = d.node().firstChild;
  test.equal(getStyleProperty(p, 'font'), "normal normal normal 14px/normal Helvetica, sans-serif");

  test.equal(getStyleProperty(p, 'color'), "rgb(204, 204, 204)");

  // test @import
  var i = d.div.getElementsByClassName('example');
  test.equal(getStyleProperty(i[0], 'color'), "rgb(0, 128, 0)");

  d.kill();
});

Tinytest.add("sass - extend", function(test) {
  var d = OnscreenDiv(Meteor.render(function() {
    return '<p class="messageExtends"></p><p class="successExtends"></p><p class="errorExtends"></p><p class="warningExtends"></p>'; }));
  d.node().style.display = 'block';

  var message = d.div.getElementsByClassName('messageExtends');
  test.equal(getStyleProperty(message[0], 'border'), "1px solid rgb(204, 204, 204)");
  test.equal(getStyleProperty(message[0], 'padding'), "10px");
  test.equal(getStyleProperty(message[0], 'color'), "rgb(51, 51, 51)");

  var success = d.div.getElementsByClassName('successExtends');
  test.equal(getStyleProperty(success[0], 'border-color'), "rgb(0, 128, 0)", 'success fail');

  var error = d.div.getElementsByClassName('errorExtends');
  test.equal(getStyleProperty(error[0], 'border-color'), "rgb(255, 0, 0)", 'error fail');

  var warning = d.div.getElementsByClassName('warningExtends');
  test.equal(getStyleProperty(warning[0], 'border-color'), "rgb(255, 255, 0)", 'warning fail');
  
  d.kill();
});

Tinytest.add("sass - operators", function(test) {
  var d = OnscreenDiv(Meteor.render(function() {
    return '<div class="complimentary"></div>';
  }));
  d.node().style.display = 'block';
  var i = d.div.getElementsByClassName('complimentary');
  test.equal(getStyleProperty(i[0], 'float'), "right");
  test.equal(getStyleProperty(i[0], 'font-size'), "18px");
  d.kill();
});

Tinytest.add("sass - mixin", function(test) {
  var d = OnscreenDiv(Meteor.render(function() {
    return '<div class="boxMixin"></div>';
  }));
  d.node().style.display = 'block';
  var i = d.div.getElementsByClassName('boxMixin');
  //chrome
  //test.equal(getStyleProperty(i[0], '-webkit-border-radius'), "10px");
  test.equal(getStyleProperty(i[0], 'border-radius'), "10px");
  //test.equal(getStyleProperty(i[0], '-ms-border-radius'), "10px");
  //test.equal(getStyleProperty(i[0], '-moz-border-radius'), "10px");
  d.kill();
});
