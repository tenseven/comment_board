var show_words=new XMLHttpRequest();
show_words.open("POST","show_words.php",true);
show_words.setRequestHeader('Content-type', "application/json");
show_words.onreadystatechange=function(){
    if(show_words.readyState==XMLHttpRequest.DONE && show_words.status==200){
        var get_all_info=JSON.parse(this.responseText);
        var all_info=get_all_info.all_array;
        var rows=get_all_info.all_rows;
        var username=get_all_info.user;
        document.getElementById("welcome").innerText="欢迎："+username+"!";
        for(x=0;x<=rows;x++){
            var true_id=all_info[x].id;
            var true_name=all_info[x].name;
            var build_table=document.createElement('p');
            build_table.innerHTML='<p id="total_'+true_id+'"'+'>'+'<table  border="1">'+'<tr>'+'<th>'+"序号"+'</th>'+'<th>'+"留言"+'</th>'+'<th>'+"发布者"+'</th>'+'<th>'+
            "留言时间"+'</th>'+'<th>'+"修改"+'</th>'+'<th>'+"删除"+'</th>'+'</tr>'+'<tr>'+'<td>'+(x+1)+"."+'</td>'+'<td style="text-align:left;word-wrap:break-word;word-break:break-all;whitespce:nomarl;max-width:90%;">'+
            '<span id="comment'+true_id+'"'+'>'+all_info[x].comments+'</span>'+'</td>'+'<td style="text-align:center">'+true_name+'</td>'+'<td>'+'&nbsp'+'&nbsp'+all_info[x].time+'</td>'+'<td style="text-align:center">'+'<button onclick=change_words('+true_id+','+x+','+'"'+true_name+'"'+')'+'>'+"修改"+'</button>'+'</td>'+
            '<td>'+'<button onclick=delete_words('+true_id+','+'"'+true_name+'"'+')'+'>'+"删除"+'</button>'+'</td>'+'</table>'+'</p>'+'<br>';
            var get_showplace=document.getElementById("box2");
            get_showplace.append(build_table);
        }
    }
}
show_words.send();

function change_words(user_id,x,testname){
    
         var total_tr=document.getElementById("total_"+user_id);
         total_tr.innerHTML='<tr>'+'<td>'+(x+1)+"."+'</td>'+'<td>'+'<input id="input">'+'</td>'+'<td>'+'<button id="confirm_submit">'+"提交修改"+'</button>'+'</td>'+'<td>'+'<button id="cancle">'+"取消修改"+'</button>'+'</td>'+'</tr>';
         document.getElementById("confirm_submit").onclick=function(){change_submit(user_id,testname)}
         document.getElementById("cancle").onclick=function(){cancle_submit()}
         }
        function change_submit(user__id,test_name){
        var changed_words=document.getElementById("input").value;
        var words_export={
            "new_comment":changed_words,
            "id":user__id,
            "test_name":test_name,
        }
        console.log(test_name);
        var new_words=new XMLHttpRequest();
        new_words.open("POST", "change_words.php", true);
        new_words.setRequestHeader('Content-type', "application/json");
        var new_encode_words=JSON.stringify(words_export);
        new_words.onreadystatechange=function(){
            if(new_words.readyState==XMLHttpRequest.DONE&&new_words.status==200){
                var get_result=JSON.parse(this.responseText);
                var errcode=get_result.errcode;
                var errmsg=get_result.errmsg;
                alert(errmsg);
            }
        }
        new_words.send(new_encode_words);
        location.reload("http://localhost/comment_board/board.html");
    
    
}
function cancle_submit(){
    location.reload("http://localhost/comment_board/board.html");
}
function delete_words(iid,test_del_name){
    var delete_w=new XMLHttpRequest();
    delete_w.open("POST", "delete.php", true);
    delete_w.setRequestHeader('Content-type', "application/json");
    var iid_export={
        "id":iid,
        "testname":test_del_name
    }
    var encode_id=JSON.stringify(iid_export);
    delete_w.onreadystatechange=function(){
        if(delete_w.readyState==XMLHttpRequest.DONE&&delete_w.status==200){
            var get_del_result=JSON.parse(this.responseText);
            var get_message=get_del_result.errmsg;
            alert(get_message);
        }
    }
    delete_w.send(encode_id);
    location.reload("http://localhost/comment_board/board.html");
}