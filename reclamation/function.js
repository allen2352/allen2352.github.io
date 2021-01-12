var gotomap = new classGotoMap();
var cdata=[['王世傑', 24.8043123, 120.969732972, 1698, '塹地區（新竹）,明鄭後人，竹塹地區早期開發者之一。這個地帶是明鄭時期軍隊屯墾的據點之一，算是早期漢人就有開發的地區。'], ['陳賴章', 25.05897079, 121.510699093, 1709, '加臘地區（台北、淡水河岸）,由閩南泉州陳逢春、賴永和、陳天章、陳憲伯、戴天樞五人合股的大墾號，向番社擺接庄借地，開墾臺北盆地的代表。'], ['林成祖', 25.02411589, 121.469659872, 1712, '接平原（板橋）,由福建漳州人林秀俊創立之墾號，其任職多個番社通事，在台中大甲，和台北地區有多筆開墾紀錄，範圍從板橋、興直、八里、芝連、內湖。宗族傳承力量很強，現在在內湖有一棟林秀俊基金會。「不是板橋林家」'], ['張振萬', 24.25405761, 120.695452178, 1723, '裏社地,由潮州客家人張達京創立之墾號，在北側台中盆地有大量土地，張達京為岸裏社的通事，與番人頭目的女兒通婚，深受番人信任。其後岸裏社在鎮壓雍正八～九年的熟番叛亂有功，地位進一步提升。此墾號又有六館墾號之稱，足見其在台中的影響力。'], ['藍張興', 24.1421319, 120.609048223, 1724, '霧拺社地,由武官藍廷珍、張國所創之墾號，開墾區域約為台中盆地南側、近濁水溪一帶。匿報土地，偷墾的問題嚴重，甚至在界外招佃開墾，留有後期被清朝懲處的紀錄。'], ['衛壽宗', 24.82609845, 121.074409518, 1794, '塹新社、新埔、關西,為舊竹塹社番業戶，開墾的時間跨度很長，金廣福以前，在新竹新埔、關西一帶主要開墾力量。番業戶的關係，開墾地在界外。竹塹社原先居住在新竹近海平地地帶（香山附近），由於淡水縣城設於竹塹，配合清朝遷往近山地區。「衛」為清朝賜姓。'], ['金廣福', 24.70078257, 121.057712551, 1835, '塹山區、北埔、寶山,閩粵合作的隘墾墾號，廣福是廣州和福州的意思。開墾的範圍被稱作「大隘」，是林爽文後，竹塹地區最大的開墾力量。代表人物有粵籍的姜秀鑾、閔籍的周邦正等，現在在新竹地區看到的有「隘」相關的地名，或多或少都和其有關係。'], ['周添福', 25.05167205, 121.287060613, 1739, '崁虎茅庄,和附近的番社坑仔社有過節，嘗試立名目騙走坑仔社土地。'], ['夏侯立', 25.07781471, 121.322592391, 1745, '竹坑仔社,番業戶，差點被附近虎茅庄的漢人周添福騙走土地。'], ['張和中', 23.79410812, 120.449321914, 1742, '螺社地荒埔,在大租調上留有紀錄。'], ['何周沈', 25.04799462, 121.580218551, 1752, '里錫口庄,在大租調上留有紀錄，向番社繳納社課，且報陞過的土地，坐址為中坡山腳，現在附近也有中坡路。該業主在內湖庄也有開墾紀錄，大概是三個姓的宗族合股。'], ['何士蘭', 25.07928219, 121.57685958, 1741, '湖庄,為附近何周沈三族的何家家祖，開墾了內雙溪、大直北勢湖、內湖附近土地。'], ['薛啟龍', 24.93153324, 121.264518225, 1757, '里社背,在大租調上留有紀錄。'], ['萃豐莊', 24.84563392, 120.957359479, 1754, '眩埔地,此地為眩眩社的舊地，墾號則由泉州人汪淇楚所創。此號在光緒年間轉手給了曾姓家族。'], ['郭奕榮', 24.86717227, 120.959171714, 1731, '兒錠莊,稀有的找不到招佃資料的墾戶，或許是自耕。郭奕榮為人名，福建惠安人，捐贈了附近的安南宮。'], ['黃南球', 24.61492944, 120.917386116, 1878, '栗三灣、大湖一帶,台灣通史所列台灣三大貨殖家，清末、日治早期的苗栗地方望族之祖。有相關墾號金萬成、金協成、廣泰成等，開墾範圍大約是苗栗北部山區、和靠近新竹北埔一帶。']]
var markbox=[];
function getdp(p1,p2){
    return Math.pow(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2),1/2)
}
var ccdata=[];
var basicmax=26;
for (i = 0; i < cdata.length;i++){
    var choose=0;
    var basic=0
    for (j = 0; j < cdata.length;j++){
        if((parseFloat(cdata[j][1])>basic && parseFloat(cdata[j][1])<basicmax)){
            basic=parseFloat(cdata[j][1]);
            choose=j;
        }
    }
    basicmax=basic;
    ccdata.push(cdata[choose]);
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
for (i = 0; i < ccdata.length;i++){
    ken+='\n<option id="searchinput'+i+'" value="'+ccdata[i][0]+'">';
    var pos=[parseFloat(ccdata[i][2]),parseFloat(ccdata[i][1])];
    var mark = new mapMark(pos,parseInt(ccdata[i][3]));
    mark.addEvtClick(function (coordinate) {
            var pos=ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
            for (j = 0; j <markbox.length;j++){
                if (getdp(markbox[j].pos,pos)<0.0001){
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