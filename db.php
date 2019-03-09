<?php
require_once 'meekrodb.2.3.class.php';

$dburl = parse_url(getenv('CLEARDB_DATABASE_URL'));

DB::$host = $dburl['host'];
DB::$user = $dburl['user'];
DB::$password = $dburl['pass'];
DB::$dbName = substr($dburl["path"], 1);
?>