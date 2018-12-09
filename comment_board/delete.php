<?php
header('Content-Type:application/json');
$connect=mysqli_connect('localhost','root','','assignment2');
$get_id=file_get_contents('php://input');
session_start();
$username=$_SESSION['username'];
$decode_id=json_decode($get_id,true);
extract($decode_id);
if($testname==$username){
      mysqli_query($connect,"DELETE FROM comments WHERE id=$id");
      $message=[
          'errmsg'=>'删除成功'
      ];
      echo json_encode($message);
}else{
    $messa=[
        'errmsg'=>"不能删除别人的留言"
    ];
    echo json_encode($messa);
}
mysqli_close($connect);