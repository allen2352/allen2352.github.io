function readTextFile(file) {                         //讀取txt檔案
    var rawFile = new XMLHttpRequest();
    var allText; // var declared in readTextFile scope
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText; // here you can return the data filled in above
};
function modify_promotions(num){
    $("#promotions_num").val(num);
    $("#promotions_id").val(promotions_list[num][0]);
    $("#main_store_name").val(promotions_list[num][1]);
    $("#promotions_date").val(promotions_list[num][2]);
    $("#promotions_title").val(promotions_list[num][3]);
    $("#promotions_content").val(promotions_list[num][4]);
    $("#promotions_submit").val('修改');
    $("#delete_promotions").show();
    $("#modify_promotions").click();
}
function Add_promotions_list(){
    $("#promotions_num").val('Add');
    $("#main_store_name").val('');
    $("#promotions_date").val('');
    $("#promotions_title").val('');
    $("#promotions_content").val('');
    $("#promotions_submit").val('新增');
    $("#delete_promotions").hide();
    $("#modify_promotions").click();
}
function modify(num){
    $("#store_num").val(num);
    $("#store_name").val(store_list[num][0]);
    $("#store_pos").val(store_list[num][1]);
    $("#store_address").val(store_list[num][2]);
    for(i=0;i<store_list[num][3].length;i++)
    {
        $("#category"+(parseInt(store_list[num][3][i])+1)).prop("checked",true);
    }
    $("#store_induction").val(store_list[num][4]);
    if(store_list[num][5]=='0'){$("#store_donate").prop("checked",true);}
    else{$("#store_donate").prop("checked",false);}
    $("#store_donate_content").val(store_list[num][6]);
    $("#store_id").val(store_list[num][7]);
    $("#modify_btn").html('修改');
    $("#delete_store").show();
    $("#modify").click();
}
function Add_list(){
    $("#store_num").val('Add');
    $("#store_name").val('');
    $("#store_pos").val('');
    $("#store_address").val('');
    $("#store_induction").val('');
    $("#store_id").val('none');
    $("#store_donate_content").val('');
    $("#modify_btn").html('新增');
    $("#delete_store").hide();
    $("#modify").click();
}
var promotions_html='<table  style="border:3px #cccccc solid;top:10vh;" cellpadding="10" border="1"><tr><td><button class="btn btn-outline-success" onclick="Add_promotions_list();">新增</button></td><td>主辦店家</td><td>活動圖片</td><td>活動日期</td><td>活動標題</td><td>活動內容</td></tr>';
var content=readTextFile("static/data/promotions.txt").split('$&*(@#&$(*&$');
var promotions_list=[];
for(i=0;i<content.length;i++)
{
    variable=content[i].split('@#(&^@*#');
    promotions_list.push(variable);
    promotions_html+='<tr><td><button class="btn btn-outline-secondary" onclick="modify_promotions('+i+');">變更</button></td><td>'+variable[1]+'</td><td><img src="https://github.com/allen2352/grin-catmels/raw/main/'+variable[0]+'" alt="未上傳" style="width:200px;"></td><td>'+variable[2]+'</td><td>'+variable[3]+'</td><td>'+variable[4]+'</td></tr>'
}
promotions_html+='</table>';
$("#store_promotions").html(promotions_html);
content=readTextFile("static/data/store.txt").split('$&*(@#&$(*&$');
var store_list=[];
var render_html='<table  style="border:3px #cccccc solid;top:10vh;" cellpadding="10" border="1"><tr><td><button  class="btn btn-outline-success" onclick="Add_list();">新增</button></td><td>名稱</td><td>商家圖片</td><td>座標</td><td>地址</td><td>分類</td><td>店家描述</td><td>贊助意願</td><td>贊助內容</td></tr>';
var variable='';
var variable2=[];
var variable3=[];
var variable4=[];
var categorylist=['飲食','衣飾','娛樂','其他'];
var store_pic='';
for(i=0;i<content.length;i++)
{
    variable=content[i].split('@#(&^@*#');
    variable2=[];
    for(j=0;j<variable.length;j++)
    {
        if(j==3)
        {
            variable4=variable[j].split(',');
            variable2.push(variable4);
            variable3=[];
            for (m=0;m<variable4.length;m++)
            {
                variable3.push(categorylist[parseInt(variable4[m])]);
            }
        }
        else{variable2.push(variable[j]);}
    }
    store_list.push(variable2);
    if(variable[5]=='0')variable4='是';
    else{variable4='否';}
    render_html+="<tr><td><button class='btn btn-outline-secondary' onclick='modify("+i+");'>變更</button></td><td>"+variable[0]+"</td><td><img src='https://github.com/allen2352/grin-catmels/raw/main/"+variable[7]+"' alt='未上傳' style='width:200px;'></td><td>"+variable[1]+"</td><td>"+variable[2]+"</td><td>"+variable3+"</td><td>"+variable[4]+"</td><td>"+variable4+"</td><td>"+variable[6]+"</td></tr>";
}
render_html+='</table>';
//alert(123);
//document.getElementById("store_list").innerHTML('rgnrgon');
$("#store_list").html(render_html);