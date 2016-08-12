<?php
require_once 'db.php';

DB::$success_handler = 'success_handler';
DB::$error_handler = 'error_handler';
DB::$connect_options = array(MYSQLI_OPT_CONNECT_TIMEOUT => 5);

function success_handler($params){
  die("success");
}
function error_handler($params){
  header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
  die("500 INTERNAL SERVER ERROR.");
}

if(array_key_exists('row',$_POST)
    && array_key_exists('col',$_POST)
    && array_key_exists('val',$_POST)){
  DB::insertUpdate('nsbdata', array(
    'ID' => intval($_POST['row']),
    htmlentities($_POST['col']) => htmlentities($_POST['val'])
  ));
}
?>