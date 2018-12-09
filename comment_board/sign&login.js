
function myclick(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "sign_up.php", true);  
    xhr.setRequestHeader('Content-type', "application/json");
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    var checkpwd=document.getElementById('checkpwd').value;
    var datas={
       "username":username,
        "password":password,
        "checkpwd":checkpwd
   }
    var jdatas=JSON.stringify(datas);
    xhr.onreadystatechange = function() {
      if (xhr.readyState==XMLHttpRequest.DONE && xhr.status==200) {
          var myresponse=JSON.parse(this.responseText);
          var judge=myresponse.errcode;
          if(judge==0){
            document.getElementById("response_msg2").innerHTML=myresponse.data;
           location.href = "http://localhost/comment_board/board.html";
          }else{
              document.getElementById("response_msg2").innerHTML=myresponse.errmsg;
          }
      }
    }
    xhr.send(jdatas);
}
function login(){
    var xhrt=new XMLHttpRequest();
    xhrt.open("POST","login.php",true);
    xhrt.setRequestHeader('content-type','application/json');
    var username=document.getElementById("login_name").value;
    var password=document.getElementById("pwd").value;
    var datas={
        "username":username,
        "password":password
    }
    var jdatas=JSON.stringify(datas);
    xhrt.onreadystatechange=function(){
        if(xhrt.readyState==XMLHttpRequest.DONE && xhrt.status==200){
          var myresponse_ =JSON.parse(this.responseText);
           document.getElementById("response_msg").innerHTML = myresponse_.errmsg;
           if(myresponse_.errcode==0){
               document.getElementById("response_msg").innerHTML=myresponse_.data;
           location.href = "http://localhost/comment_board/board.html";
          }
        }
    }
    xhrt.send(jdatas);
}