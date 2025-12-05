<?php
// php/students/list_students.php
$config = include __DIR__ . '/../config.php';
$studentsFile = $config['data_dir'] . '/students.json';
if(!file_exists($studentsFile)){
  echo json_encode([]);
  exit;
}
echo file_get_contents($studentsFile);
?>
