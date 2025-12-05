<?php
// php/config.php
// Configure database and file storage.
// For JSON-first mode just keep DB params empty or default.

return [
  'db' => [
    'host' => '127.0.0.1',
    'username' => 'root',
    'password' => '',
    'database' => 'attendance_system'
  ],
  'data_dir' => __DIR__ . '/../data'
];
?>
