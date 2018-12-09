<?php
header('Content-Type:application/json');
session_start();
$username=$_SESSION['username'];
$connect=mysqli_connect('localhost','root','','assignment2');
$get_new_words=file_get_contents('php://input');
$decode_words=json_decode($get_new_words,true);
extract($decode_words);
$new_comments=htmlspecialchars($new_comment);
if($test_name==$username){
    $update_comment=$connect->prepare("UPDATE comments SET comments=? WHERE id=$id");
    $update_comment->bind_param("s",$new_comments);
    $update_comment->execute();
    $result=[
        'errcode'=>0,
        'errmsg'=>'修改成功'
    ];
    echo json_encode($result);
}else{
    $good_result=[
        'errcode'=>123,
        'errmsg'=>'你不能修改别人的留言'
    ];
    echo json_encode($good_result);
}
mysqli_close($connect);