<?php
header('Content-Type:application/json');
session_start();
$username=$_SESSION['username'];
$connect=mysqli_connect('localhost','root','','assignment2');
$get_new_words=file_get_contents('php://input');
$decode_words=json_decode($get_new_words,true);
extract($decode_words);
$new_comments=htmlspecialchars($new_comment);
$update_comment=$connect->prepare("UPDATE comments SET comments=? WHERE id=$id");
$update_comment->bind_param("s",$new_comment);
$update_comment->execute();
mysqli_close($connect);