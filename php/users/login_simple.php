<?php
// php/users/login_simple.php
// Simple non-production login. For demo, allowed user: admin / password: admin
session_start();
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if($username === 'admin' && $password === 'admin'){
  $_SESSION['user'] = ['username'=>'admin','role'=>'admin'];
  header('Location: ../css/index.html');
  exit;
} else {
  echo "<p>Identifiants invalides. <a href='../css/login.html'>Retour</a></p>";
}
?>
