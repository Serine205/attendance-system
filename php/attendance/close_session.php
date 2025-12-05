<?php
// php/attendance/close_session.php
$config = include __DIR__ . '/../config.php';
$dataDir = $config['data_dir'];
$sessionsFile = $dataDir . '/sessions.json';
$session_id = $_POST['session_id'] ?? '';

if(!file_exists($sessionsFile)){ echo json_encode(['success'=>false,'message'=>'No sessions']); exit; }
$sessions = json_decode(file_get_contents($sessionsFile), true);
$found=false;
foreach($sessions as &$s){ if($s['id']===$session_id){ $s['status']='closed'; $found=true; break; } }
if(!$found){ echo json_encode(['success'=>false,'message'=>'Not found']); exit; }
file_put_contents($sessionsFile, json_encode($sessions, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
echo json_encode(['success'=>true]);
?>
