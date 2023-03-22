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
    render_html+='<div style="position:absolute;top:'+height+'vw;"><img src="https://github.com/allen2352/grin-catmels/raw/main/'+variable[0]+'" style="width:20vw;height: 20vw;position:absolute;"><div style="background-color: white;position:absolute;left: 25vw;width: 60vw;height: 20vw;"><h5 style="font-weight: bold;font-size:3vw;">'+variable[3]+'</h5><p style="position: relative;left: 3vw;font-size:2vw;width:55vw;height:16vw;overflow-y: scroll;">'+variable[4]+'</p></div></div>'
    height+=22;
}
$("#page_end").css('top',(50+height)+'vw')
$("#promotions_list").html(render_html);