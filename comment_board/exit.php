<?php
header('Content-Type:application/json');
$connect=mysqli_connect('localhost','root','','assignment2');
session_start();
$usn=$_SESSION['username'];
mysqli_query($connect,"DELETE FROM comments WHERE name='$usn'");
mysqli_query($connect,"DELETE FROM user WHERE name='$usn'");

?>