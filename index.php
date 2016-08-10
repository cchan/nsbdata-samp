<div id="msg">[status messages to appear here]</div>
<table>
<?php
require_once 'db.php';

$data = DB::query('SELECT * from nsbdata'); //all htmlentities()'d before insertion
$cols = array();

echo "<tr>";
foreach($data[0] as $col => $row){
  $cols[] = $col;
  echo "<th>"+$col+"</th>";
}
echo "</tr>";

echo "<tr>";
foreach($data as $index => $row)
  foreach($row as $col => $val)
    echo "<td><input type='text' class='datum' data-col='$col' data-row='$index' value='"+$val+"'></td>";
echo "</tr>";

echo "<tr>";
foreach($cols as $col)
  echo "<td><input type='text' class='datum' data-col='$col' data-row='"+count($data)+"' value=''></td>";
echo "</tr>";

$rowtemplate = "<tr>";
foreach($cols as $col)
  $rowtemplate .= "<td><input type='text' class='datum' data-col='$col' data-row='XXXXX' value=''></td>";
$rowtemplate .= "</tr>";

?>
</table>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script>
  var rows = <?=count($data)?>;
  var cols = ['<?=implode("','",$cols)?>'];
  var rowtemplate = "<?=rowtemplate?>";
</script>
<script src="script.js"></script>
