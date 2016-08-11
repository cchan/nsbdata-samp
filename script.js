var queue = [];

function msg(connotation, str){
  $('#msg').text(str);
  $('#msg').css('color',connotation<0?'red':connotation>0?'green':'#cc0');
}

function update(){
  if(queue.length == 0){
    setTimeout(update, 1000);
    return;
  }
  
  msg(0, 'Saving...');
  $.post({
    url: 'process.php',
    data: queue[0]
  }).done(function(res){
    console.log(res);
    msg(1, 'Saved');
    queue.shift();
    update(); //no call stack problems because async! yay
  }).fail(function(res){
    console.log(res);
    msg(-1, 'Failed. Do not reload the page. Trying again in <span id="countdown">5</span>s...');
    for(var i = 1; i <= 4; i++)
      (function(i){
      setTimeout(function(){$('#countdown').text(5-i);}, 1000 * i);
      })(i);
    setTimeout(update, 5000);
  });
}

$(function(){
  $('input.datum').blur(function(){
    queue.push({
      row: $(this).data('row'),
      col: $(this).data('col'),
      val: $(this).val()
    });
    if($(this).data('row') == rows)
      $('#myTable tr:last').after(rowtemplate.replace(new RegExp('XXXXX','g'), ++rows));
  });
  update();
});
