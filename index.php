<style>
table{
  table-layout: fixed;
  margin: 0 auto;
  font-size: 2em;
}
input{
  font-size: 1em;
  border: solid 1px #000;
  width: 2em;
  text-align: center;
}
#msg{
  text-align: center;
  font-weight: bold;
}
</style>
<div id="msg">[status messages to appear here]</div>
<table id="question-table">
<?php
require_once 'db.php';

$data = DB::query('SELECT * from nsbdata'); //all htmlentities()'d before insertion
$cols = DB::columnList('nsbdata');
array_shift($cols);
$cols = array_map('htmlentities', $cols);

echo "<tr><th>Q</th>";
foreach($cols as $col)
  echo "<th>".$col."</th>";
echo "</tr>";

foreach($data as $index => $row){
  echo "<tr><th>$index</th>";
  foreach($cols as $col)
    echo "<td><input type='text' class='datum' data-col='$col' data-row='$index' value='".$row[$col]."'></td>";
  echo "</tr>";
}

echo "<tr><th>".count($data)."</th>";
foreach($cols as $col)
  echo "<td><input type='text' class='datum' data-col='$col' data-row='".count($data)."' value=''></td>";
echo "</tr>";

$rowtemplate = "<tr><th>XXXXX</th>";
foreach($cols as $col)
  $rowtemplate .= "<td><input type='text' class='datum' data-col='$col' data-row='XXXXX' value=''></td>";
$rowtemplate .= "</tr>";

?>
</table>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script>
  var rows = <?=count($data)?>;
  var cols = ['<?=implode("','",$cols)?>'];
  var rowtemplate = "<?=$rowtemplate?>";
</script>
<script src="script.js"></script>
