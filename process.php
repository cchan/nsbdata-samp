<?php
require_once 'db.php';

if(array_key_exists('row',$_POST)
    && array_key_exists('col',$_POST)
    && array_key_exists('val',$_POST)){
  DB::insertUpdate('nsbdata', array(
    'ID' => intval($_POST['row']),
    htmlentities($_POST['col']) => htmlentities($_POST['val'])
  ));
}
?>