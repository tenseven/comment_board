<?php
header('Content-Type: application/json');
$connect=mysqli_connect('localhost','root','','assignment2');
$json= file_get_contents('php://input');
$jdata=json_decode($json,true);
extract($jdata, EXTR_OVERWRITE);
$sql=$connect->prepare("SELECT name FROM user WHERE name=?");
$sql->bind_param("s",$username);
$sql->execute();
$result_array=$sql->get_result();
$infoarray=mysqli_fetch_array($result_array);
$password_length=strlen($password);
function json_data($errcode,$errmsg,$data){
    $json_format=[
        'errcode'=>$errcode,
        'errmsg'=>$errmsg,
        'data'=>$data
    ];
    echo json_encode($json_format);
}
if($infoarray==NULL){
    if($password_length>=6){ 
        if($password==$checkpwd){
            $insert_user=$connect->prepare("INSERT INTO user (name,password) VALUES(?,?)");
            $insert_user->bind_param("ss",$username,$password);
            $insert_user->execute();
            json_data(0,'',"succeed!");
            session_start();
            $_SESSION["username"]=$username;
        }else{
            json_data(122,"Password and checkword are different",'');
        }
    }else{
        json_data(122,"The password is too short.",'');
    }
}else{
    json_data(122,"The name has existed.Please change another one.",'');
}
mysqli_close($connect);