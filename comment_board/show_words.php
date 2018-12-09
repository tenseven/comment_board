<?php
header('Content-Type:application/json');
$connect=mysqli_connect('localhost','root','','assignment2');
session_start();
$username=$_SESSION["username"];
$select_comments=mysqli_query($connect,"SELECT * FROM comments");
$all_rows=$select_comments->num_rows;
$all_array=array();
while($value = mysqli_fetch_object($select_comments)) {
    array_push($all_array,$value);
}
$all_info=[
    'all_array'=>$all_array,
    'all_rows'=>$all_rows,
    'user'=>$username
];
echo json_encode($all_info);
mysqli_close($connect);



