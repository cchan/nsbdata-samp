// http://stackoverflow.com/a/2897510/1181387
(function($) {
    $.fn.cursorPos = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
})(jQuery);



var queue = [];

function msg(connotation, str){
  $('#msg').html(str);
  $('#msg').css('color',connotation<0 ? 'red' : connotation>0 ? 'green' : '#cc0');
}

function update(){
  if(queue.length == 0){
    msg(1, 'Saved');
    setTimeout(update, 1000);
    return;
  }
  
  msg(0, 'Saving...');
  $.post({
    url: 'process.php',
    data: queue[0]
  }).done(function(res){
    console.log(res);
    queue.shift();
    update(); //no call stack problems because async! yay
  }).fail(function(res){
    console.log(res);
    msg(-1, 'Failed. Do not reload the page. Trying again in <span id="countdown">5</span>s...');
    for(var i = 1; i <= 4; i++)
      (function(i){ //capture the value of i
        setTimeout(function(){$('#countdown').text(5-i);}, 1000 * i);
      })(i);
    setTimeout(update, 5000);
  });
}

function setHandlers(){
  $('input.datum').keydown(function(e){
    var colIndex = cols.indexOf($(this).data('col'));
    
    if(e.which == 38 && $(this).data('row') > 0) //UP
      $('input.datum[data-row='+($(this).data('row')-1)+'][data-col='+$(this).data('col')+']').focus();
    else if(e.which == 40) //DOWN
      $('input.datum[data-row='+($(this).data('row')+1)+'][data-col='+$(this).data('col')+']').focus();
    else if(e.which == 39 && $(this).cursorPos() == $(this).val().length && colIndex < cols.length - 1) //RIGHT
      $('input.datum[data-row='+$(this).data('row')+'][data-col='+cols[colIndex + 1]+']').focus();
    else if(e.which == 37 && $(this).cursorPos() == 0 && colIndex > 0) //LEFT
      $('input.datum[data-row='+$(this).data('row')+'][data-col='+cols[colIndex - 1]+']').focus();
  });
  
  $('input.datum').focus(function(){
    var self = this;
    setTimeout(function(){$(self).select();}, 10); //because the key event is annoying
    if($(this).data('row') == rows){
      $('#question-table tr:last').after(rowtemplate.replace(new RegExp('XXXXX','g'), ++rows));
      setHandlers();
    }
  });
  
  $('input.datum').change(function(){
    queue.push({
      row: $(this).data('row'),
      col: $(this).data('col'),
      val: $(this).val()
    });
  });
}

$(function(){
  setHandlers();
  update();
});
