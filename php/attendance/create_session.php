<?php
// php/attendance/create_session.php
// For demo: we will write a sessions.json file with session entries
$config = include __DIR__ . '/../config.php';
$dataDir = $config['data_dir'];
if(!is_dir($dataDir)) mkdir($dataDir,0755,true);

$date = $_POST['date'] ?? date('Y-m-d');
$sessionsFile = $dataDir . '/sessions.json';
$sessions = [];
if(file_exists($sessionsFile)) $sessions = json_decode(file_get_contents($sessionsFile), true);

// create session id
$session_id = uniqid('sess_');
$sessions[] = ['id'=>$session_id,'date'=>$date,'created_at'=>date('c'),'status'=>'open'];
file_put_contents($sessionsFile, json_encode($sessions, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
echo json_encode(['success'=>true,'session_id'=>$session_id]);
?>
