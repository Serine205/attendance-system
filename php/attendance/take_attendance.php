<?php
// php/attendance/take_attendance.php
// Accepts date and attendance JSON array, saves to data/attendance_YYYY-MM-DD.json
$config = include __DIR__ . '/../config.php';
$dataDir = $config['data_dir'];
if(!is_dir($dataDir)) mkdir($dataDir,0755,true);

$date = $_POST['date'] ?? date('Y-m-d');
$attStr = $_POST['attendance'] ?? null;
if(!$attStr){ echo json_encode(['success'=>false,'message'=>'attendance missing']); exit; }

$attendance = json_decode($attStr, true);
if(!is_array($attendance)){ echo json_encode(['success'=>false,'message'=>'Invalid attendance']); exit; }

$filename = $dataDir . '/attendance_' . $date . '.json';
if(file_exists($filename)){
  echo json_encode(['success'=>false,'message'=>'Attendance for this date already exists']);
  exit;
}
file_put_contents($filename, json_encode($attendance, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
echo json_encode(['success'=>true,'file'=>basename($filename)]);
?>
