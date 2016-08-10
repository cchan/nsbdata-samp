

$('input.datum').blur(function(){
  queue.push({
    row: $(this).data('row'),
    col: $(this).data('col'),
    val: $(this).val()
  });
  if(row == rows)
    $('#myTable tr:last').after(rowtemplate.replace(new RegExp('XXXXX','g'), ++rows));
});

function update(){
  if(queue.length == 0)
    setTimeout(update, 1000);
  
  msg(0, 'Saving...');
  $.post({
    url: 'process.php',
    data: queue[0]
  }).done(function(msg){
    msg(1, 'Saved');
    queue.shift();
    update(); //no call stack problems because async! yay
  }).fail(function(msg){
    msg(-1, 'Failed. Trying again in 5s...');
    setTimeout(update, 5000);
  });
}

function msg(connotation, str){
  $('#msg').text(str);
  $('#msg').css('color',connotation<0?'red':connotation>0?'green':'#cc0');
}
