<?php
header('Content-Type:application/json');
$connect=mysqli_connect('localhost','root','','assignment2');
$get_id=file_get_contents('php://input');
$decode_id=json_decode($get_id,true);
extract($decode_id);
mysqli_query($connect,"DELETE FROM comments WHERE id=$id");
mysqli_close($connect);