<?php
// php/users/reset_users.php
$config = include __DIR__ . '/../config.php';
$dataDir = $config['data_dir'];
$usersFile = $dataDir . '/users.json';
if(file_exists($usersFile)) unlink($usersFile);
echo "Users reset.";
?>
