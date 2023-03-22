function choose_sponsor(){
    $("#student_apply_data").hide();
    $("#choose_sponsor").show();
}
function fill_student_application(){
    $("#choose_sponsor").hide();
    $("#student_apply_data").css('visibility','visible');
    $("#student_apply_data").show();
    document.getElementById('student_apply_data').scrollIntoView(true);
}
choose_sponsor();
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
content=readTextFile("static/data/store.txt").split('$&*(@#&$(*&$');
var store_list=[];
var render_html='';
var variable='';
var variable2=[];
var variable3=[];
var variable4=[];
var categorylist=['飲食','衣飾','娛樂','其他'];
var store_pic='';
var height=0;
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
    if(variable[5]=='0'){
        variable4='是';
        render_html+='<div style="width: 90vw;height:30vw;"><input type="checkbox" id="choose_'+i+'" name="choose_'+i+'" style="position:relative;left:1vw;top:0vh;width:20px;height: 20px;"><label for="choose_'+i+'" style="font-size: 3vh;position: relative;left:1vw;top:0vh;"><img src="https://github.com/allen2352/grin-catmels/raw/main/'+store_list[i][7]+'" style="width: 30vw;height: 30vw;position: relative;left: 1vw;"><p style="position:absolute;left: 33vw;top: 0vh; font-size:1.5vmax;width:45vw;height:30vw;overflow-y: scroll;">'+store_list[i][6]+'</p></label></div><br>';
        height+=32;
    }
    else{variable4='否';}
}
//$("#sponsor_box").html(render_html);
//$("#next_step").css('top',(30+height)+'vw');