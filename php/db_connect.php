<?php
// php/db_connect.php
$config = include __DIR__ . '/config.php';
$db = $config['db'];

function get_db_conn(){
  global $db;
  try {
    $dsn = "mysql:host={$db['host']};dbname={$db['database']};charset=utf8mb4";
    $pdo = new PDO($dsn, $db['username'], $db['password'], [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    return $pdo;
  } catch(PDOException $e){
    error_log("DB ERROR: ".$e->getMessage());
    return null;
  }
}
?>
