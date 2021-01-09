var gotomap = new classGotoMap();
var ccdata=[['王世傑',24.80431230,120.969732972,1698,'竹塹地區（新竹）,明鄭後人，竹塹地區早期開發者之一。這個地帶是明鄭時期軍隊屯墾的據點之一，算是早期漢人就有開發的地區。'],
    ['陳賴章',25.05897079,121.510699093,1709,'大加臘地區（台北、淡水河岸）,由閩南泉州陳逢春、賴永和、陳天章、陳憲伯、戴天樞五人合股的大墾號，向番社擺接庄借地，開墾臺北盆地的代表。'],
    ['林成祖',25.02411589,121.469659872,1712,'擺接平原（板橋），由福建漳州人林秀俊創立之墾號，其任職多個番社通事，在台北地區有多筆開墾紀錄，範圍從板橋、興直、八里、芝連、內湖。宗族傳承力量很強，現在在內湖有一棟林秀俊基金會。「不是板橋林家」'],
    ['張振萬',24.25405761,120.695452178,1723,'岸裏社地,由潮州客家人張達京創立之墾號，在北側台中盆地有大量土地，張達京為岸裏社的通事，與番人頭目的女兒通婚，深受番人信任。其後岸裏社在鎮壓雍正八～九年的熟番叛亂有功，地位進一步提升。此墾號又有六館墾號之稱，足見其在台中的影響力。'],
    ['藍張興',24.14213190,120.609048223,1724,'貓霧拺社地,由武官藍廷珍、張國所創之墾號，開墾區域約為台中盆地南側、近濁水溪一帶。匿報土地，偷墾的問題嚴重，甚至在界外招佃開墾，留有後期被清朝懲處的紀錄。'],
    ['衛壽宗',24.82609845,121.074409518,1794,'竹塹新社、新埔、關西,為舊竹塹社番業戶，開墾的時間跨度很長，金廣福以前，在新竹新埔、關西一帶主要開墾力量。番業戶的關係，開墾地在界外。竹塹社原先居住在新竹近海平地地帶（香山附近），由於淡水縣城設於竹塹，配合清朝遷往近山地區。「衛」為清朝賜姓。']]
var markbox=[];
function getdp(p1,p2){
    return Math.pow(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2),1/2)
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
for (i = 0; i < ccdata.length;i++){
    var pos=[parseFloat(ccdata[i][2]),parseFloat(ccdata[i][1])];
    let mark = new mapMark(pos,parseInt(ccdata[i][3]));
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
    markbox.push(mark)
}