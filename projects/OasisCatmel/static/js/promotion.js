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
var content=readTextFile("static/data/promotions.txt").split('$&*(@#&$(*&$');
var promotions_list=[];
var render_html=''
var variable;
var categorylist=['飲食','衣飾','娛樂','其他'];
var height=0;
for(i=0;i<content.length;i++)
{
    variable=content[i].split('@#(&^@*#');
    promotions_list.push(variable);
    render_html+='<div style="position:absolute;top:'+height+'vh;"><img src="https://github.com/allen2352/grin-catmels/raw/main/'+variable[0]+'" style="width:40vh;height: 40vh;position:absolute;"><div style="background-color: white;position:absolute;left: 25vw;width: 60vw;height: 40vh;"><h1 style="font-weight: bold;">'+variable[3]+'</h1><p style="position: relative;left: 3vw;font-size:1.5vmax;width:55vw;height:38vh;overflow-y: scroll;">'+variable[4]+'</p></div></div>'
    height+=50; 
}
$("#page_end").css('top',(20+height)+'vh')
$("#promotions_list").html(render_html);