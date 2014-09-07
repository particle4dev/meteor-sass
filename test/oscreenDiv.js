// issue with Firefox 
// http://stackoverflow.com/questions/15497246/jquery-csspadding-issue-with-firefox

OnscreenDiv = function(tmp){
  var div = document.createElement('div');
  Blaze.render(tmp, div);
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