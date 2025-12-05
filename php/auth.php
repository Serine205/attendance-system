<?php
// php/auth.php - simple session auth helpers
session_start();

function is_logged_in(){
  return isset($_SESSION['user']);
}

function require_login(){
  if(!is_logged_in()){
    header('Location: ../css/login.html');
    exit;
  }
}
?>
