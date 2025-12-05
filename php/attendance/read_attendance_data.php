<?php
// php/attendance/read_attendance_data.php
// Usage:
// ?date=YYYY-MM-DD -> returns attendance for that date
// ?list=true -> returns list of attendance files
// ?file=attendance_YYYY-MM-DD.json -> returns that file

$config = include __DIR__ . '/../config.php';
$dataDir = $config['data_dir'];

if(isset($_GET['list']) && $_GET['list']){
  $files = [];
  foreach(glob($dataDir . '/attendance_*.json') as $f){
    $files[] = basename($f);
  }
  echo json_encode(['success'=>true,'files'=>$files]);
  exit;
}

if(isset($_GET['file'])){
  $file = basename($_GET['file']);
  $path = $dataDir . '/' . $file;
  if(!file_exists($path)){ echo json_encode(['success'=>false,'message'=>'File not found']); exit; }
  $att = json_decode(file_get_contents($path), true);
  echo json_encode(['success'=>true,'attendance'=>$att]);
  exit;
}

$date = $_GET['date'] ?? date('Y-m-d');
$path = $dataDir . '/attendance_' . $date . '.json';
if(!file_exists($path)){ echo json_encode(['success'=>false,'message'=>'Not found']); exit; }
$att = json_decode(file_get_contents($path), true);
echo json_encode(['success'=>true,'attendance'=>$att]);
?>
