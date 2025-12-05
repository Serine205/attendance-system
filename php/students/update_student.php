<?php
// php/students/update_student.php
$config = include __DIR__ . '/../config.php';
$studentsFile = $config['data_dir'] . '/students.json';
if(!file_exists($studentsFile)){ echo json_encode(['success'=>false,'message'=>'No file']); exit; }
$students = json_decode(file_get_contents($studentsFile), true);

$student_id = $_POST['student_id'] ?? '';
$last = $_POST['last_name'] ?? '';
$first = $_POST['first_name'] ?? '';
$email = $_POST['email'] ?? '';

$found=false;
foreach($students as &$s){
  if($s['student_id'] === $student_id){
    $s['last_name']=$last; $s['first_name']=$first; $s['email']=$email;
    $found=true;break;
  }
}
if(!$found){ echo json_encode(['success'=>false,'message'=>'Not found']); exit; }
file_put_contents($studentsFile, json_encode($students, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
echo json_encode(['success'=>true]);
?>
