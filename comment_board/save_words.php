<?php
header('Content-Type:application/json');
session_start();
$username=$_SESSION['username'];
$connect=mysqli_connect('localhost','root','','assignment2');
$get_words=file_get_contents('php://input');
$decode_words=json_decode($get_words,true);
extract($decode_words);
$new_words=htmlspecialchars($words);
$sql_add=$connect->prepare("INSERT INTO comments VALUES (NULL,?,now(),?)");
$sql_add->bind_param("ss",$new_words,$username);
$sql_add->execute();
mysqli_close($connect);