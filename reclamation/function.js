var gotomap = new classGotoMap();
var readget='';
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                readget= rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}
readTextFile("reclamation/reclamation.txt")
var data=readget.split('\n');
var cdata=[];
for (i = 0; i < data.length;i++){
    c=data[i].split(',');
    var get=[c[0],parseFloat(c[1]),parseFloat(c[2]),parseInt(c[3]),data[i].substr(c[0].length+c[1].length+c[2].length+c[3].length+4)];
    cdata.push(get)
}
var markbox=[];
function getdp(p1,p2){
    return Math.pow(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2),1/2)
}
var ccdata=[];
var basicmax=26;
for (i = 0; i < cdata.length;i++){
    var choose=0;
    var basic=0;
    for (j = 0; j < cdata.length;j++){
        if((parseFloat(cdata[j][1])>basic && parseFloat(cdata[j][1])<basicmax)){
            basic=parseFloat(cdata[j][1]);
            choose=j;
        }
    }
    basicmax=basic;
    ccdata.push(cdata[choose]);
}
var timedata=[];
var basicmin=1600;
for (i = 0; i < cdata.length;i++){
    var choose=0;
    var basic=2000;
    for (j = 0; j < cdata.length;j++){
        if((parseInt(cdata[j][3])<basic && parseInt(cdata[j][3])>basicmin)){
            basic=parseInt(cdata[j][3]);
            choose=j;
        }
    }
    basicmin=basic;
    timedata.push(cdata[choose]);
}
function showVal(newVal){
    //var tf=document.getElementById("myCheck").checked;
    if (document.getElementById("flexCheckDefault").checked){
        var com=parseInt(newVal)+parseInt($("#inputyear").val());
        document.getElementById("valBox").innerHTML="建立時間:"+newVal+"~"+com;
        for (i = 0; i <markbox.length;i++){
            if ((markbox[i].year>com || markbox[i].year<newVal) && markbox[i].shown==1)
                markbox[i].delete();
            if (markbox[i].year>=newVal && markbox[i].year<=com && markbox[i].shown==0)
                markbox[i].create();
        }
    }else{
    document.getElementById("valBox").innerHTML="時間:至"+newVal;
    for (i = 0; i <markbox.length;i++){
        if (markbox[i].year>newVal && markbox[i].shown==1)
        markbox[i].delete();
    if (markbox[i].year<=newVal && markbox[i].shown==0)
    markbox[i].create();
    }
    }
}
$('#flexCheckDefault').change(function() {
    showVal($("#exslider").val())
});
$("#inputyear").on('input',function() {
    showVal($("#exslider").val())
});
$("#launch").hide()
var ken='<datalist id="datalistOptions">';
var namelist=['',''];
var bookkendata="";
var arrowtext="";
for (i = 0; i < timedata.length;i++){
    if(i<12)
    namelist[0]+='<a href="javascript:setPage('+(8+i)+')" style="font-size: 4vh;text-decoration:none;color:darkslategrey;">'+(i+1)+'.'+timedata[i][0]+'('+timedata[i][3]+')</a><br>';
    else{
        namelist[1]+='<a href="javascript:setPage('+(8+i)+')" style="font-size: 4vh;text-decoration:none;color:darkslategrey;">'+(i+1)+'.'+timedata[i][0]+'('+timedata[i][3]+')</a><br>';
    }
    bookkendata+='<div style="background-image:url(reclamation/paper.jpg)"><div class="fb7-cont-page-book"><div class="fb7-page-book"><h1 style="font-size: 8vh;">'+timedata[i][0]+'('+timedata[i][3]+')</h1><p style="font-size: 5vh;">'+timedata[i][4]+'</p></div><div class="fb7-meta"><span class="fb7-num">'+(8+i)+'</span></div></div></div>';
    if(i%2==0)
        arrowtext+='<li data-address="page'+(8+i)+'-page'+(9+i)+'" data-page="'+(8+i)+'"></li><li data-address="page'+(8+i)+'-page'+(9+i)+'" data-page="'+(9+i)+'"></li>';
}
arrowtext+='<li data-address="end" data-page="'+(8+timedata.length)+'"></li>';
$("#mapbookindexdata1").html(namelist[0]);
$("#mapbookindexdata2").html(namelist[1]);
var bookcontent=$("#navigationbook").html().split('<!--asdfghjkl-->');
$("#navigationbook").html(bookcontent[0]+bookkendata+bookcontent[1]);
var arrow=$("#mapbookindex").html().split('<!--qwertyuiop-->');
$("#mapbookindex").html(arrow[0]+arrowtext+arrow[1]);
for (i = 0; i < ccdata.length;i++){
    ken+='\n<option id="searchinput'+i+'" value="'+ccdata[i][0]+'">';
    var pos=[parseFloat(ccdata[i][2]),parseFloat(ccdata[i][1])];
    var mark = new mapMark(pos,parseInt(ccdata[i][3]));
    mark.addEvtClick(function (coordinate) {
            var pos=ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
            var distance=1;
            for (j = 0; j <markbox.length;j++){
                if (getdp(markbox[j].pos,pos)<distance){
                    distance=getdp(markbox[j].pos,pos);
                    $('#reclamationcontent').html(ccdata[j][4]);
                    $("#staticBackdropLabel").html(ccdata[j][0]+"("+ccdata[j][3]+")")
                }
            }
            $("#launch").click();
    });
    mark.create();
    markbox.push(mark)
    map.on('pointermove',function(evt){
        if (map.hasFeatureAtPixel(evt.pixel)){
            map.getTargetElement().style.cursor ='pointer';
            if (mark.hover==0){
                mark.hover=1;
                var coordinate=evt.coordinate;
                $("#popup").css("display", "block");
                var container = document.getElementById('popup');
                var closer = document.getElementById('popup-closer');
                var popOverlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
                    element: container,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250
                    },
                    offset: [10, -20]
                }));
                map.addOverlay(popOverlay);
                var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
                var pos=ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
                var mind=100;
                for (j = 0; j <markbox.length;j++){
                    var d=getdp(markbox[j].pos,pos);
                    if (d<mind){
                        $("#popup-content").html(ccdata[j][0]+"("+ccdata[j][3]+")");
                        mind=d;
                    }
                }
                popOverlay.setPosition(coordinate);
                closer.onclick = function() {
                    popOverlay.setPosition(undefined);
                    closer.blur();
                    return false;
                };
            }
        }else{
            mark.hover=0;
            //$("#hintbox").hide()
            $("#popup").hide();
            map.getTargetElement().style.cursor ='';
        }
    });
}
dragElement(document.getElementById("operation"));
$("#exampleDataList").html(ken+'\n</datalist>')
$("#exampleDataList").change(function(){
    for (i = 0; i < ccdata.length+1;i++){
        if(i==ccdata.length && $("#exampleDataList").val()!="")
            alert("搜查不到結果");
        else{
            if (ccdata[i][0]==$("#exampleDataList").val()){
                map.getView().animate({center:ol.proj.fromLonLat([parseFloat(ccdata[i][2]),parseFloat(ccdata[i][1])]), zoom: 15,duration: 2000})
                $('#reclamationcontent').html(ccdata[i][4]);
                $("#staticBackdropLabel").html(ccdata[i][0]+"("+ccdata[i][3]+")")
                $("#launch").click();
                break;
            }
        }
    }
  });
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("valBox")) {
    document.getElementById("valBox").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
var t=0;
$("#navigation").click(function(){
    t+=1
    if (t%2==0)
    $("#navigationbook").hide();
    else{
        $("#navigationbook").css("z-index",100);
        $("#navigationbook").show();
    }
})
$("#navigationbook").css("z-index",-100);