$(document).ready(function(){

  $(document).keydown(function(e){
    if (e.keyCode == 39) { //right arrow
      if (e.ctrlKey) {
        $('#endBtn').click();
      } else {
        $('#forwardBtn').click();
      }
      return false;
    }
  });

  $(document).keydown(function(e){
    if (e.keyCode == 37) { //left arrow
      if (e.ctrlKey) {
        $('#startBtn').click();
      } else {
        $('#backBtn').click();
      }
    }
    return false;
  });

});

