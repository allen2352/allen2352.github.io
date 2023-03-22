var gotomap = new classGotoMap();
var readget='';
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
var content=readTextFile("static/data/store.txt").split('$&*(@#&$(*&$');
var store_list=[];
var variable='';
var variable2=[];
var variable3=[];
var variable4=[];
var categorylist=['飲食','衣飾','娛樂','其他'];
for(i=0;i<content.length;i++)
{
    variable=content[i].split('@#(&^@*#');
    store_list.push(variable);
}
function getdp(p1,p2){
    return Math.pow(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2),1/2)
}
var markbox=[];
var pos_list;
var pos;
var mark;

//##################################################################
var categorylist=['飲食','衣飾','娛樂','其他'];
function store_induction(num){
    $("#store_list_map").hide();
    $("#store_img").html('<img onerror="this.src='+"static/image/picture.png"+'" src="https://github.com/allen2352/grin-catmels/raw/main/'+store_list[num][7]+'" style="width:90vmin;height:90vmin;">')
    $("#store_name").html(store_list[num][0]);
    if(store_list[num][3]!='')category=categorylist[parseInt(store_list[num][3])];
        else{category='無';}
    $("#category").html(category);
    $("#address").html(store_list[num][2]);
    $("#store_content").html(store_list[num][4]);
    $("#store_induction").show();
}
function back_map(){
    $("#store_induction").hide();
    $("#store_list_map").show();
}
var category;
var need_display;
var category_html;
function display_store(){
    var render_html='';
    for (i=0;i<markbox.length;i++)
    {
        markbox[i].delete();
    }
    markbox=[];
    for (i=0;i<store_list.length;i++)
    {
        need_display=(filter_btn[0]==filter_btn[1] && filter_btn[1]==filter_btn[2] && filter_btn[2]==filter_btn[3])
        if(store_list[i][3]!='')
        {
            category=store_list[i][3].split(',');
            for(j=0;j<category.length;j++){
                if (filter_btn[parseInt(category[j])]==1)need_display=true;
            }
        }
        if (need_display){
            pos_list=store_list[i][1].split(',');
            pos=[parseFloat(pos_list[1]),parseFloat(pos_list[0])];
            mark = new mapMark(pos,store_list[i][0],i);
            mark.addEvtClick(function (coordinate) {
                    var pos=ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
                    var distance=1;
                    var name='';
                    for (j = 0; j <markbox.length;j++){
                        if (getdp(markbox[j].pos,pos)<distance){
                            distance=getdp(markbox[j].pos,pos);  //點到即變更
                            name=markbox[j].name;
                            //$('#reclamationcontent').html(ccdata[j][4]);
                            //$("#staticBackdropLabel").html(ccdata[j][0]+"("+ccdata[j][3]+")")
                        }
                    }
                    alert(name);
                    //$("#launch").click();//顯示
            });
            mark.create();
            markbox.push(mark);
            //store----------------------
            if(store_list[i][3]!=''){
                category=store_list[i][3].split(',');category_html=[];
                for(j=0;j<category.length;j++){
                    category_html.push(categorylist[parseInt(category[j])])
                }
            }
            else{category='無';}
            render_html+='<div style="height:21vh"><img onerror="this.src='+"static/image/picture.png"+'" src="https://github.com/allen2352/grin-catmels/raw/main/'+store_list[i][7]+'" style="width:20vh;height:20vh;"><div style="position:relative;left:21vh;top:-18vh;width:80vh;"><h4>店名:'+store_list[i][0]+'</h4><h4>類別:'+category_html+'</h4><h4>地址:'+store_list[i][2]+'</h4></div></div>';
        }
    }  
    $("#store_box").html(render_html);
}
var filter_btn=[0,0,0,0];
function filter(num){
    if(filter_btn[num]==0)
    {filter_btn[num]=1;$("#filter"+num).css('background-color','#FFFFaa');}
    else{filter_btn[num]=0;$("#filter"+num).css('background-color','#FFFFFF');}
    display_store();
}
display_store();
$("#store_induction").hide();