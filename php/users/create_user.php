<?php
// php/users/create_user.php
// For demo: writes to data/users.json
$config = include __DIR__ . '/../config.php';
$dataDir = $config['data_dir'];
if(!is_dir($dataDir)) mkdir($dataDir,0755,true);

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
if(!$username || !$password){ echo json_encode(['success'=>false,'message'=>'Missing']); exit; }

$usersFile = $dataDir . '/users.json';
$users = [];
if(file_exists($usersFile)) $users = json_decode(file_get_contents($usersFile), true);

$users[] = ['username'=>$username,'password'=>password_hash($password,PASSWORD_DEFAULT)];
file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
echo json_encode(['success'=>true]);
?>
