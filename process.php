<?php
require_once 'db.php';

  var_dump($_POST);
if($_POST['row'] && $_POST['col'] && $_POST['val']){
  DB::insertUpdate(array(
    'ID' => intval($_POST['row']),
    htmlentities($_POST['col']) => htmlentities($_POST['val'])
  ));
}
?>