<?php
// php/students/add_student.php
// adds student to data/students.json (JSON-first)
$config = include __DIR__ . '/../config.php';
$dataDir = $config['data_dir'];
if(!is_dir($dataDir)) mkdir($dataDir,0755,true);

$student_id = trim($_POST['student_id'] ?? '');
$last = trim($_POST['last_name'] ?? '');
$first = trim($_POST['first_name'] ?? '');
$email = trim($_POST['email'] ?? '');

if(!$student_id || !$last || !$first || !$email){
  echo "Tous les champs sont requis.";
  exit;
}

$studentsFile = $dataDir . '/students.json';
$students = [];
if(file_exists($studentsFile)){
  $students = json_decode(file_get_contents($studentsFile), true);
}

// avoid duplicates
foreach($students as $s){
  if($s['student_id'] === $student_id){
    echo "Étudiant déjà existant.";
    exit;
  }
}

$new = ['student_id'=>$student_id,'last_name'=>$last,'first_name'=>$first,'email'=>$email];
$students[] = $new;
file_put_contents($studentsFile, json_encode($students, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
echo "Étudiant ajouté avec succès.";
?>
