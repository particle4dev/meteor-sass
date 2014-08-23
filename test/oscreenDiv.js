OnscreenDiv = function(tmp){
  var div = document.createElement('div');
  Blaze.render(tmp).attach(div);
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
};