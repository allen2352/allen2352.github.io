$('#introduction').on('click', introv);
var intro = 0;
$('#introcon').hide();
var systemlock = 1;
var temrec = ""
var nowcardpad = 1;
var nowcardback = 1;
var allbattlerecord = [];
var battlemission = 0;

function myrecord() {
    if (allbattlerecord.length == 0)
        document.getElementById("battleboard").innerHTML = "<p style='text-align: center;color:red;font-size:4vh;'>尚無紀錄</p>";
    else {
        recordtext = '<table class="table table-bordered"><thead><tr><th scope="col" style="color: black; font-size: 3vh;text-align: center;">時間</th><th scope="col" style="color: black; font-size: 3vh;">人數</th><th scope="col" style="color: black; font-size: 3vh;text-align: center;">完成度</th><th scope="col" style="color: black; font-size: 3vh;">備註</th></tr></thead><tbody>';
        for (i = 0; i < allbattlerecord.length; i++) {
            recordtext += '<tr><td style="color: black; font-size: 2.5vh;text-align: center;">' + allbattlerecord[i][0] + '</td><td style="color: black; font-size: 2.5vh;text-align: center;">' + allbattlerecord[i][1] + '</td>';
            if (allbattlerecord[i][2] == 0) {
                recordtext += '<td style="color: red; font-size: 2.5vh;text-align: center;">未完成</td><td type="button" class="btn btn-primary" data-dismiss="modal" onclick="continuegame(' + i + ')">繼續</td>'
            } else {
                recordtext += '<td style="color: black; font-size: 2.5vh;text-align: center;">完成</td><td type="button" class="btn btn-info" data-dismiss="modal" onclick="continuegame(' + i + ')">詳情</td>'
            }
        }
        recordtext += '</tbody></table>';
        document.getElementById("battleboard").innerHTML = recordtext;
    }
}

function continuegame(n) {
    battlemission = n;
    //document.getElementById("mytitle").innerHTML = 100;
    originalcard = allbattlerecord[n][3][0];
    everyonecard = allbattlerecord[n][3][1];
    order100 = allbattlerecord[n][3][2];
    cardrecord = allbattlerecord[n][3][3];
    var info = inspection(allbattlerecord[n][3][4]);
    win = allbattlerecord[n][3][5];
    $('#Layout').show();
    $('#board').hide();
    document.getElementById("centerdisplay").innerHTML = allbattlerecord[n][3][8];
    document.getElementById("centerdisplay2").innerHTML = '';
    if (allbattlerecord[n][2] == 0) {
        document.getElementById("centerdisplay2").innerHTML = info[0];
        cardtype100 = info[1];
    }
    thebox = [];
    score10 = countvalue(cardtype100, allbattlerecord[n][3][4]);
    pln = everyonecard.length;
    passn = allbattlerecord[n][3][6];
    total = pln;
    progress = 0;
    boardheight = allbattlerecord[n][3][7];
    $('#play').show();
    $('#main').hide();
    $('#seat1').show();
    $('#seat2').show();
    $('#seat3').show();
    if (pln == 2) {
        $('#seat1').hide();
        $('#seat3').hide();
    }
    if (pln == 3)
        $('#seat2').hide();
    typesetting()
    systemlock = 0;
}

function introv() {
    if (intro == 0) {
        $('#com').hide();
        $('#introcon').show();
        intro = 1;
        temrec = document.getElementById("background2").innerHTML;
        document.getElementById("background2").innerHTML = "";
        document.getElementById("mybackground").src = "image/Card_padm.png";
        document.getElementById("mybackground").style.height = "155vh";
    } else {
        $('#com').show();
        $('#introcon').hide();
        intro = 0;
        document.getElementById("background2").innerHTML = temrec;
        document.getElementById("mybackground").src = "image/Card_pad" + nowcardpad + ".png";
        document.getElementById("mybackground").style.height = "98vh";
    }
}

function changecardpad() {
    cardsound();
    nowcardpad += 1;
    if (nowcardpad > 8) {
        nowcardpad = 1
    }
    document.getElementById("mybackground").src = "image/Card_pad" + nowcardpad + ".png";
}

function changecardback() {
    cardsound();
    nowcardback += 1;
    if (nowcardback > 12) {
        nowcardback = 1;
    }
    document.getElementById("exhibitioncard").src = "image/Card_back" + nowcardback + ".png";
}
$('#entergame').on('click', start);
var seat = [];
$('#play').hide();
var everyonecard = [];
var card = [];
for (i = 0; i < 52; i++) {
    card.push(i + 1);
}
var thebox = [];
var cardtype100 = 0;
var score10 = 0;
var order100 = 0;
var pln = 0;
var passn = 0;
var total = 0;
var c3 = 0;
var win = [];
var progress = 0;
var playername = ["玩家&ensp;", "對手1", "對手2", "對手3"];
var cardrecord = "";
var originalcard = "";
var boardheight = 0;
var nowcard = [];

function menu() {
    clearInterval();
    $('#play').hide();
    $('#main').show();
    document.getElementById("background2").innerHTML = "";
    systemlock = 1;
}
var recc = 0;

function cardrec() {
    if (recc == 0) {
        $('#Layout').hide();
        $('#board').show();
        recc = 1;
        var text = ""
        for (i = 0; i < Math.floor(boardheight / 98) + 1; i++) {
            text += "<img style='height: 98vh;width: 212vh;' src='image/Card_pad" + nowcardpad + ".png'>";
        }
        if (progress == 2) {
            document.getElementById("background2").innerHTML = text + "<img style='height: 98vh;width: 212vh;' src='image/Card_pad" + nowcardpad + ".png'>";
            document.getElementById("board").innerHTML = cardrecord + originalcard;
        } else {
            document.getElementById("background2").innerHTML = text;
            document.getElementById("board").innerHTML = cardrecord;
        }
    } else {
        $('#Layout').show();
        $('#board').hide();
        document.getElementById("background2").innerHTML = "";
        recc = 0;
    }
}

function start() {
    battlemission = allbattlerecord.length;
    var battlerecord = [Date().split(' ')[3] + ' ' + Date().split(' ')[1] + ' ' + Date().split(' ')[2] + ' ' + Date().split(' ')[4]];
    $('#Layout').show();
    $('#board').hide();
    clearInterval();
    everyonecard = [];
    card = [];
    for (i = 0; i < 52; i++) {
        card.push(i + 1);
    }
    document.getElementById("centerdisplay").innerHTML = '牌局開始'
    document.getElementById("centerdisplay2").innerHTML = ''
    thebox = [];
    cardtype100 = 0;
    score10 = 0;
    order100 = 0;
    pln = 0;
    passn = 0;
    total = 0;
    c3 = 0;
    win = [];
    progress = 0;
    cardrecord = "<p style='color:white;font-size:6vh;'>牌局開始:&emsp;(" + battlerecord[0] + ")</p><hr noshade='noshade' />";
    originalcard = "";
    boardheight = 0;
    $('#play').show();
    $('#main').hide();
    var n = $("#playerNumber2").val();
    $('#seat1').show();
    $('#seat2').show();
    $('#seat3').show();
    if (n == 2) {
        $('#seat1').hide();
        $('#seat3').hide();
    }
    if (n == 3)
        $('#seat2').hide();
    pln = n;
    total = n;
    var box = [];
    var m = 0;
    for (i = 0; i < 52; i++) {
        m = Math.floor(Math.random() * card.length);
        box.push(card[m]);
        card.splice(m, 1);
        //everyonecard.push()
    }
    var count = 0;
    for (m3 = 0; m3 < n; m3++) {
        var box2 = [];
        var spades = [];
        var heart = [];
        var square = [];
        var clovers = [];
        for (j = 0; j < Math.floor(52 / n); j++) {
            if (Math.floor(box[count] / 13.1) == 0)
                spades.push(box[count] + 1);
            if (Math.floor(box[count] / 13.1) == 1)
                heart.push(box[count] % 13 + 1);
            if (Math.floor(box[count] / 13.1) == 2)
                square.push(box[count] % 13 + 1);
            if (Math.floor(box[count] / 13.1) == 3)
                clovers.push(box[count] % 13 + 1);
            count += 1;
        }
        spades.sort(function (a, b) {
            return a - b
        });
        heart.sort(function (a, b) {
            return a - b
        });
        square.sort(function (a, b) {
            return a - b
        });
        clovers.sort(function (a, b) {
            return a - b
        });
        box2.push(spades);
        box2.push(heart);
        box2.push(square);
        box2.push(clovers);
        var sequence = [];
        for (m = 0; m < 13; m++) {
            for (j = 0; j < 4; j++) {
                if (box2[j][0] == m + 1) {
                    sequence.push(m + 1 + 13 * j);
                    box2[j].splice(0, 1);
                }
            }
        }
        if (sequence.length < Math.floor(52 / n)) {
            var sequence2 = [1];
            for (m10 = 0; m10 < sequence.length; m10++) {
                sequence2.push(sequence[m10])
            }
            sequence = sequence2;
        }
        everyonecard.push(sequence);
    }
    originalcard += "<p style='color:white;font-size:6vh;'>初始牌:</p><hr noshade='noshade' /><p style='color:white;'>玩家:</p>";
    for (i = 0; i < everyonecard.length; i++) {
        if (i > 0)
            originalcard += "<p style='color:white;'>對手" + i + ":</p>";
        for (j = 0; j < everyonecard[i].length; j++) {
            originalcard += "<img src='image/" + everyonecard[i][j] + ".png' style='width: 14vh;height: 22vh;'>";
        }
    }
    typesetting()
    for (i = 0; i < everyonecard.length; i++) {
        for (j = 0; j < everyonecard[i].length; j++) {
            if (everyonecard[i][j] == 3) {
                order100 = i;
            }
        }
    }
    if (total == 2)
        document.getElementById("seat2").innerHTML = "對手(" + everyonecard[1].length + ")";
    if (total == 3) {
        document.getElementById("seat1").innerHTML = "對<br>手<br>1<br>(" + everyonecard[1].length + ")";
        document.getElementById("seat3").innerHTML = "對<br>手<br>2<br>(" + everyonecard[2].length + ")";
    }
    if (total == 4) {
        document.getElementById("seat1").innerHTML = "對<br>手<br>1<br>(" + everyonecard[1].length + ")";
        document.getElementById("seat2").innerHTML = "對手2(" + everyonecard[2].length + ")";
        document.getElementById("seat3").innerHTML = "對<br>手<br>3<br>(" + everyonecard[3].length + ")";
    }
    var method = 0;
    if (order100 != 0) {
        for (i = 1; i < 6; i++) {
            ski = findcard(6 - i, everyonecard[order100])
            for (j = 0; j < ski.length; j++) {
                if (inlist(3, tocard(ski[j], everyonecard[order100]))) {
                    method = 6 - i;
                    break
                }
            }
            if (method != 0) {
                break
            }
        }
    }
    battlerecord.push(pln);
    battlerecord.push(0);
    var detail = [originalcard, everyonecard, order100, cardrecord, nowcard, win, passn, boardheight];
    battlerecord.push(detail);
    allbattlerecord.push(battlerecord)
    if (order100 != 0)
        cardtype100 = method;
    score10 = 0;
    systemlock = 0;
}

function systemplay() {
    if (systemlock == 0) {
        if (progress == 0) {
            if (win.length == pln - 1)
                progress = 1;
            else {
                if (everyonecard[order100].length == 0) {
                    passn += 1;
                    order100 += 1;
                    if (order100 == pln)
                        order100 = 0;
                }
                if (order100 == 0 & everyonecard[0].length > 0) {
                    $('#launch').show();
                    $('#pass').show();
                } else {
                    if (everyonecard[order100].length > 0) {
                        $('#launch').hide();
                        $('#pass').hide();
                        auto()
                    }
                }
            }
        }
        if (progress == 1) {
            var text = "勝利: " + win[0]
            if (pln > 2) {
                for (i = 1; i < win.length; i++) {
                    text += "<br>第" + (i + 1) + ": " + win[i]
                }
            }
            document.getElementById("centerdisplay").innerHTML = text;
            document.getElementById("centerdisplay2").innerHTML = '';
            progress = 2;
            allbattlerecord[battlemission][2] = 1;
            allbattlerecord[battlemission][3][8] = text;
        }
    }
}

function auto() {
    if (passn == pln - 1) {
        cardtype100 = 0;
    }
    if (everyonecard[order100].length > 0) {
        if (cardtype100 == 0) {
            var ob = [1, 2, 2, 3, 5, 5, 6];
            var fcc = [];
            score10 = 0;
            var typee = ob[Math.floor(Math.random() * 7)];
            fcc = findcard(typee, everyonecard[order100])
            if (fcc.length == 0) {
                typee = 1;
                fcc = findcard(typee, everyonecard[order100])
            }
            cardtype100 = typee;
        }
        var k = playing(order100, score10, cardtype100);
        if (k == false) {
            var passs = 'PASS'
            if (passn > win.length)
                passs += "x" + (passn + 1 - win.length)
            cardrecord += "<p style='color:white;font-size:6vh;'>" + playername[order100] + ":&emsp;PASS</p>"
            document.getElementById("centerdisplay2").innerHTML = passs;
            passn += 1;
            boardheight += 10;
            var neworder = order100 + 1;
            if (neworder == pln)
                neworder = 0;
            allbattlerecord[battlemission][3][2] = neworder;
            allbattlerecord[battlemission][3][3] = cardrecord;
            allbattlerecord[battlemission][3][6] = passn;
            allbattlerecord[battlemission][3][7] = boardheight;
        } else {
            passn = 0;
        }
        document.getElementById("seat1").style.backgroundColor = "transparent";
        document.getElementById("seat2").style.backgroundColor = "transparent";
        document.getElementById("seat3").style.backgroundColor = "transparent";
        if (order100 != 0) {
            if (pln == 2) {
                document.getElementById("seat2").style.backgroundColor = "white";
            }
            if (pln == 3) {
                if (order100 == 1)
                    document.getElementById("seat1").style.backgroundColor = "white";
                if (order100 == 2)
                    document.getElementById("seat3").style.backgroundColor = "white";
            }
            if (pln == 4) {
                document.getElementById("seat" + order100).style.backgroundColor = "white";
            }
        }
        if (total == 2)
            document.getElementById("seat2").innerHTML = "對手(" + everyonecard[1].length + ")";
        if (total == 3) {
            document.getElementById("seat1").innerHTML = "對<br>手<br>1<br>(" + everyonecard[1].length + ")";
            document.getElementById("seat3").innerHTML = "對<br>手<br>2<br>(" + everyonecard[2].length + ")";

        }
        if (total == 4) {
            document.getElementById("seat1").innerHTML = "對<br>手<br>1<br>(" + everyonecard[1].length + ")";
            document.getElementById("seat2").innerHTML = "對手2(" + everyonecard[2].length + ")";
            document.getElementById("seat3").innerHTML = "對<br>手<br>3<br>(" + everyonecard[3].length + ")";
        }
        if (everyonecard[order100].length == 0) {
            score10 = 0;
            cardtype100 = 0;
        }
    } else {
        passn += 1;
    }
    if (everyonecard[order100].length == 0) {
        win.push(playername[order100]);
        cardrecord += "<p style='color:white;font-size:6vh;'>" + playername[order100] + "結束</p>"
    }
    order100 += 1;
    if (order100 == pln)
        order100 = 0;
}

function playing(order, score, cardtype) {
    var scc = findcard(cardtype, everyonecard[order]);
    if (scc.length == 0)
        return false
    var myscore = 100000;
    var out = 0;
    for (i1 = 0; i1 < scc.length; i1++) {
        var s = countvalue(cardtype, tocard(scc[i1], everyonecard[order]));
        if (s < myscore & s > score) {
            myscore = s;
            out = i1;
        }
    }
    if (myscore == 100000)
        return false;
    score10 = myscore;
    if (c3 == 0 & inlist(3, tocard(scc[out], everyonecard[order])) == false) {
        output(order, [3]);
    } else {
        output(order, tocard(scc[out], everyonecard[order]));
    }
    c3 = 1;
    return true;
}

function output(order, thecard) {
    cardsound();
    var text = "";
    var content = inspection(thecard)[0];
    cardrecord += "<p style='color:white;font-size:6vh;'>" + playername[order] + ":&emsp;" + content + "&emsp;&emsp;&emsp;&emsp;&emsp;";
    for (i = 0; i < thecard.length; i++) {
        text += "<img src='image/" + thecard[i] + ".png' style='width: 14vh;height: 22vh;'><b>&emsp;</b>";
        cardrecord += "<img src='image/" + thecard[i] + ".png' style='width: 14vh;height: 22vh;'>"
        boardheight += 26;
    }
    cardrecord += "</p>"
    document.getElementById("centerdisplay").innerHTML = text;
    document.getElementById("centerdisplay").style.left = 98 - 9 * thecard.length + "vh";
    document.getElementById("centerdisplay2").innerHTML = content;
    for (i = 0; i < thecard.length; i++) {
        for (j = 0; j < everyonecard[order].length; j++) {
            if (everyonecard[order][j] == thecard[i]) {
                everyonecard[order].splice(j, 1)
            }
        }
    }
    typesetting()
    nowcard = thecard;
    var neworder = order100 + 1;
    if (neworder == pln)
        neworder = 0;
    var detail = [originalcard, everyonecard, neworder, cardrecord, nowcard, win, passn, boardheight, text];
    allbattlerecord[battlemission][3] = detail;
    if (order == 0)
        thebox = [];
}

function tocard(pos, dec) {
    var inc = [];
    for (i = 0; i < pos.length; i++) {
        inc.push(dec[pos[i]])
    }
    return inc;
}

/*function print(ob) {
    document.getElementById("mytitle").innerHTML = (ob);
}*/

function ipass() {
    var passs = 'PASS'
    if (passn > win.length)
        passs += "x" + (passn + 1 - win.length)
    cardrecord += "<p style='color:white;font-size:6vh;'>" + playername[order100] + ":&emsp;PASS</p>"
    document.getElementById("centerdisplay2").innerHTML = passs;
    passn += 1;
    order100 += 1;
    boardheight += 10;
    allbattlerecord[battlemission][3][2] = order100;
    allbattlerecord[battlemission][3][3] = cardrecord;
    allbattlerecord[battlemission][3][6] = passn;
    allbattlerecord[battlemission][3][7] = boardheight;
}

function countvalue(cardtype, deckcard) {
    var value100 = 0;
    var inb = reduction(deckcard);
    var dec = deckcard;
    deckcard.sort(function (a, b) {
        return a - b
    });
    if (cardtype == 5) {
        dec = [];
        if (inb[0] == inb[1] & inb[1] == inb[2]) {
            for (i = 0; i < deckcard.length; i++) {
                var nr = deckcard[i] % 13;
                if (nr == 0)
                    nr = 13;
                if (inb[0] == nr)
                    dec.push(deckcard[i]);
            }
        }
        if (inb[2] == inb[3] & inb[3] == inb[4]) {
            for (i = 0; i < deckcard.length; i++) {
                var nr = deckcard[i] % 13;
                if (nr == 0)
                    nr = 13;
                if (inb[2] == nr)
                    dec.push(deckcard[i]);
            }
        }
    }
    if (cardtype == 6) {
        dec = [];
        if (inb[0] == inb[1] & inb[1] == inb[2] & inb[2] == inb[3]) {
            for (i = 0; i < deckcard.length; i++) {
                var nr = deckcard[i] % 13;
                if (nr == 0)
                    nr = 13;
                if (inb[0] == nr)
                    dec.push(deckcard[i]);
            }
        }
        if (inb[1] == inb[2] & inb[2] == inb[3] & inb[3] == inb[4]) {
            for (i = 0; i < deckcard.length; i++) {
                var nr = deckcard[i] % 13;
                if (nr == 0)
                    nr = 13;
                if (inb[1] == nr)
                    dec.push(deckcard[i]);
            }
        }
    }
    for (i = 0; i < dec.length; i++) {
        var val = dec[i] % 13 + 0.2 * Math.floor(dec[i] / 13);
        if (Math.floor(dec[i] / 13) == 3) {
            val += 0.2;
        }
        if (dec[i] % 13 < 3) {
            val += 13;
        }
        value100 += val;
    }
    if (cardtype == 6)
        value100 += 1000;
    if (cardtype == 7)
        value100 += 3000;
    return value100;
}

function changemusic(n) {
    document.getElementById("BGM").innerHTML = "BGM: " + n;
    $("#musicbox").html('<audio type="audio/mpeg" class="Music-content" src="music/' + n + '.mp3" loop="loop"preload="auto" controls="controls" autoplay="autoplay"></audio>');
    //   $("#BGM").innerHTML = "BGM: " + $(this).innerHTML
}

function cardsound() {
    setTimeout(function () {
        var sound = document.getElementById('cardsound');
        console.log(sound.play());
    }, 0);
}

function findcard(cardtype, deckcard) {
    var se = [];
    if (cardtype == 1) {
        for (i = 0; i < deckcard.length; i++) {
            var sn = [i];
            se.push(sn)
        }
    }
    if (cardtype == 2) {
        for (i = 0; i < deckcard.length - 1; i++) {
            if (deckcard[i] % 13 == deckcard[i + 1] % 13) {
                var sn = [i, i + 1];
                se.push(sn);
            }
        }
    }
    if (cardtype == 3) {
        for (i = 0; i < deckcard.length - 2; i++) {
            if (deckcard[i] % 13 == deckcard[i + 1] % 13 & deckcard[i + 1] % 13 == deckcard[i + 2] % 13) {
                var sn = [i, i + 1, i + 2];
                se.push(sn);
            }
        }
    }
    var inb = reduction(deckcard);
    var abc = [];
    var rec = 0;
    var ccc = [];
    for (i = 0; i < 13; i++) {
        var con = [];
        var con2 = [];
        while (inb[0] == i + 1) {
            con.push(rec);
            inb.splice(0, 1);
            rec += 1;
            con2.push(i + 1);
        }
        if (con.length > 0)
            abc.push(con);
        ccc.push(con2)
    }
    if (cardtype == 4) {
        for (i = 0; i < abc.length - 4; i++) {
            if (ccc[i][0] + 1 == ccc[i + 1][0] & ccc[i + 1][0] + 1 == ccc[i + 2][0] & ccc[i + 2][0] + 1 == ccc[i + 3][0] & ccc[i + 3][0] + 1 == ccc[i + 4][0]) {
                for (r1 = 0; r1 < abc[i].length; r1++) {
                    for (r2 = 0; r2 < abc[i + 1].length; r2++) {
                        for (r3 = 0; r3 < abc[i + 2].length; r3++) {
                            for (r4 = 0; r4 < abc[i + 3].length; r4++) {
                                for (r5 = 0; r5 < abc[i + 4].length; r5++) {
                                    var sequ = [abc[i][r1], abc[i + 1][r2], abc[i + 2][r3], abc[i + 3][r4], abc[i + 4][r5]];
                                    se.push(sequ);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (cardtype == 5) {
        var a1 = findcard(2, deckcard);
        var a2 = findcard(3, deckcard);
        for (r1 = 0; r1 < a1.length; r1++) {
            for (r2 = 0; r2 < a2.length; r2++) {
                var col20 = [];
                for (r3 = 0; r3 < a1[r1].length; r3++) {
                    col20.push(a1[r1][r3]);
                }
                for (r3 = 0; r3 < a2[r2].length; r3++) {
                    col20.push(a2[r2][r3]);
                }
                if (inb[col20[0]] != inb[col20[col20.length - 1]]) {
                    se.push(col20);
                }
            }
        }
    }
    if (cardtype == 6) {
        for (i = 0; i < deckcard.length - 3; i++) {
            if (deckcard[i] % 13 == deckcard[i + 1] % 13 & deckcard[i + 1] % 13 == deckcard[i + 2] % 13 & deckcard[i + 2] % 13 == deckcard[i + 3] % 13) {
                for (v = 0; v < deckcard.length; v++) {
                    if (deckcard[v] % 13 != deckcard[i] % 13) {
                        var sn = [i, i + 1, i + 2, i + 3, v];
                        se.push(sn);
                    }
                }
            }
        }
    }
    return se
}

function inlist(ob, thelist) {
    for (i = 0; i < thelist.length; i++) {
        if (thelist[i] == ob)
            return true;
    }
    return false
}

function typesetting() {
    var text = "";
    for (i = 0; i < everyonecard[0].length; i++) {
        text += "<img type='button' onclick='cardfunction" + everyonecard[0][i] + "()' src='image/" + everyonecard[0][i] + ".png' id='poker" + everyonecard[0][i] + "' style='width: 13vh;height: 20vh;'>";
        if (i == 12)
            text += "<br>";
    }
    document.getElementById("myseat").innerHTML = text;
}

function launch() {
    if (passn == pln - 1) {
        cardtype100 = 0;
    }
    var judgment = inspection(thebox);
    var tf = 0;
    if (judgment == false) {
        alert("無效的組合");
        tf = 1
    }
    if (tf == 0 & judgment.length == 1) {
        alert(judgment[0]);
        tf = 1;
    }
    if (c3 == 0 & inlist(3, thebox) == false) {
        tf = 1;
        alert("需要有梅花3")
    }
    if (cardtype100 == 0) {
        score10 = 0;
        cardtype100 = judgment[1];
    }
    if ((judgment[1] == 6 & cardtype100 < 6) | (judgment[1] == 7 & cardtype100 < 7)) {
        cardtype100 = judgment[1];
    }
    if (tf == 0 & judgment[1] != cardtype100) {
        alert('牌型不符');
        tf = 1;
    }
    if (tf == 0 & countvalue(judgment[1], thebox) < score10) {
        alert('牌不夠大');
        tf = 1
    }
    if (tf == 0) {
        c3 = 1;
        score10 = countvalue(cardtype100, thebox)
        output(0, thebox);
        passn = 0;
        if (everyonecard[0].length == 0) {
            score10 = 0;
            cardtype100 = 0;
            win.push(playername[0]);
            cardrecord += "<p style='color:white;font-size:6vh;'>" + playername[order100] + "結束</p>"
        }
        order100 += 1;
    }
    //document.getElementById("mytitle").innerHTML = judgment[0];
}

function reduction(orig) {
    var inb = []
    for (i = 0; i < orig.length; i++) {
        var nc = orig[i] % 13;
        if (nc == 0)
            nc = 13;
        inb.push(nc)
    }
    inb.sort(function (a, b) {
        return a - b
    });
    return inb;
}

function changeex() {
    cardsound()
    document.getElementById("displaycard").innerHTML = '<img type="button" onclick="changeex()" src="image/' + (Math.floor(Math.random() * 55) + 1) + '.png" id="exhibitioncard">';
}

function inspection(seq) {
    var flower = ['梅花', '方塊', '紅心', '黑桃'];
    if (seq.length < 1) {
        return ["請選擇要出的牌"];
    }
    if (seq.length == 1) {
        var nc = seq[0] % 13;
        if (nc == 0)
            nc = 13;
        return [flower[Math.floor(seq[0] / 13.1)] + nc + " 一張", 1];
    }
    if (seq.length == 2) {
        if (seq[0] % 13 == seq[1] % 13) {
            var nc = seq[0] % 13;
            if (nc == 0)
                nc = 13;
            return [nc + "一對", 2];
        } else {
            return false;
        }
    }
    if (seq.length == 3) {
        if (seq[0] % 13 == seq[1] % 13 & seq[1] % 13 == seq[2] % 13) {
            var nc = seq[0] % 13;
            if (nc == 0)
                nc = 13;
            return [nc + "條", 3];
        } else {
            return false;
        }
    }
    if (seq.length == 4) {
        return false;
    }
    if (seq.length == 5) {
        var inb = reduction(seq)
        if (inb[0] == inb[1] & inb[1] == inb[2] & inb[3] == inb[4]) {
            return [inb[0] + "葫蘆", 5];
        }
        if (inb[0] == inb[1] & inb[2] == inb[3] & inb[3] == inb[4]) {
            return [inb[2] + "葫蘆", 5];
        }
        if (inb[0] == inb[1] & inb[1] == inb[2] & inb[2] == inb[3]) {
            return [inb[0] + "鐵支", 6];
        }
        if (inb[1] == inb[2] & inb[2] == inb[3] & inb[3] == inb[4]) {
            return [inb[2] + "鐵支", 6];
        }
        if (inb[0] + 1 == inb[1] & inb[1] + 1 == inb[2] & inb[2] + 1 == inb[3] & inb[3] + 1 == inb[4]) {
            if (Math.floor(seq[0] / 13.1) == Math.floor(seq[1] / 13.1) & Math.floor(seq[1] / 13.1) == Math.floor(seq[2] / 13.1) & Math.floor(seq[2] / 13.1) == Math.floor(seq[3] / 13.1) & Math.floor(seq[3] / 13.1) == Math.floor(seq[4] / 13.1)) {
                return [flower[Math.floor(seq[0] / 13.1)] + '同花順' + inb, 7];
            } else {
                return ['順子' + inb, 4];
            }
        }
        if (inb[1] + 1 == inb[2] & inb[2] + 1 == inb[3] & inb[3] + 1 == inb[4] & inb[4] + 1 == inb[0] + 13) {
            if (Math.floor(seq[0] / 13.1) == Math.floor(seq[1] / 13.1) & Math.floor(seq[1] / 13.1) == Math.floor(seq[2] / 13.1) & Math.floor(seq[2] / 13.1) == Math.floor(seq[3] / 13.1) & Math.floor(seq[3] / 13.1) == Math.floor(seq[4] / 13.1)) {
                return [flower[Math.floor(seq[0] / 13.1)] + '同花順10,11,12,13,A', 7];
            } else {
                return ['順子10,11,12,13,A', 4];
            }
        }
        return false
    }
    if (seq.length > 5) {
        return false;
    }
}

function cardfunction1() {
    var f = 0;
    document.getElementById('poker1').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 1) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker1').style.opacity = '0.6';
        thebox.push(1);
    }
}

function cardfunction2() {
    var f = 0;
    document.getElementById('poker2').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 2) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker2').style.opacity = '0.6';
        thebox.push(2);
    }
}

function cardfunction3() {
    var f = 0;
    document.getElementById('poker3').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 3) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker3').style.opacity = '0.6';
        thebox.push(3);
    }
}

function cardfunction4() {
    var f = 0;
    document.getElementById('poker4').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 4) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker4').style.opacity = '0.6';
        thebox.push(4);
    }
}

function cardfunction5() {
    var f = 0;
    document.getElementById('poker5').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 5) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker5').style.opacity = '0.6';
        thebox.push(5);
    }
}

function cardfunction6() {
    var f = 0;
    document.getElementById('poker6').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 6) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker6').style.opacity = '0.6';
        thebox.push(6);
    }
}

function cardfunction7() {
    var f = 0;
    document.getElementById('poker7').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 7) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker7').style.opacity = '0.6';
        thebox.push(7);
    }
}

function cardfunction8() {
    var f = 0;
    document.getElementById('poker8').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 8) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker8').style.opacity = '0.6';
        thebox.push(8);
    }
}

function cardfunction9() {
    var f = 0;
    document.getElementById('poker9').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 9) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker9').style.opacity = '0.6';
        thebox.push(9);
    }
}

function cardfunction10() {
    var f = 0;
    document.getElementById('poker10').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 10) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker10').style.opacity = '0.6';
        thebox.push(10);
    }
}

function cardfunction11() {
    var f = 0;
    document.getElementById('poker11').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 11) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker11').style.opacity = '0.6';
        thebox.push(11);
    }
}

function cardfunction12() {
    var f = 0;
    document.getElementById('poker12').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 12) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker12').style.opacity = '0.6';
        thebox.push(12);
    }
}

function cardfunction13() {
    var f = 0;
    document.getElementById('poker13').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 13) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker13').style.opacity = '0.6';
        thebox.push(13);
    }
}

function cardfunction14() {
    var f = 0;
    document.getElementById('poker14').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 14) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker14').style.opacity = '0.6';
        thebox.push(14);
    }
}

function cardfunction15() {
    var f = 0;
    document.getElementById('poker15').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 15) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker15').style.opacity = '0.6';
        thebox.push(15);
    }
}

function cardfunction16() {
    var f = 0;
    document.getElementById('poker16').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 16) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker16').style.opacity = '0.6';
        thebox.push(16);
    }
}

function cardfunction17() {
    var f = 0;
    document.getElementById('poker17').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 17) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker17').style.opacity = '0.6';
        thebox.push(17);
    }
}

function cardfunction18() {
    var f = 0;
    document.getElementById('poker18').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 18) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker18').style.opacity = '0.6';
        thebox.push(18);
    }
}

function cardfunction19() {
    var f = 0;
    document.getElementById('poker19').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 19) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker19').style.opacity = '0.6';
        thebox.push(19);
    }
}

function cardfunction20() {
    var f = 0;
    document.getElementById('poker20').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 20) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker20').style.opacity = '0.6';
        thebox.push(20);
    }
}

function cardfunction21() {
    var f = 0;
    document.getElementById('poker21').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 21) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker21').style.opacity = '0.6';
        thebox.push(21);
    }
}

function cardfunction22() {
    var f = 0;
    document.getElementById('poker22').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 22) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker22').style.opacity = '0.6';
        thebox.push(22);
    }
}

function cardfunction23() {
    var f = 0;
    document.getElementById('poker23').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 23) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker23').style.opacity = '0.6';
        thebox.push(23);
    }
}

function cardfunction24() {
    var f = 0;
    document.getElementById('poker24').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 24) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker24').style.opacity = '0.6';
        thebox.push(24);
    }
}

function cardfunction25() {
    var f = 0;
    document.getElementById('poker25').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 25) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker25').style.opacity = '0.6';
        thebox.push(25);
    }
}

function cardfunction26() {
    var f = 0;
    document.getElementById('poker26').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 26) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker26').style.opacity = '0.6';
        thebox.push(26);
    }
}

function cardfunction27() {
    var f = 0;
    document.getElementById('poker27').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 27) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker27').style.opacity = '0.6';
        thebox.push(27);
    }
}

function cardfunction28() {
    var f = 0;
    document.getElementById('poker28').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 28) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker28').style.opacity = '0.6';
        thebox.push(28);
    }
}

function cardfunction29() {
    var f = 0;
    document.getElementById('poker29').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 29) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker29').style.opacity = '0.6';
        thebox.push(29);
    }
}

function cardfunction30() {
    var f = 0;
    document.getElementById('poker30').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 30) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker30').style.opacity = '0.6';
        thebox.push(30);
    }
}

function cardfunction31() {
    var f = 0;
    document.getElementById('poker31').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 31) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker31').style.opacity = '0.6';
        thebox.push(31);
    }
}

function cardfunction32() {
    var f = 0;
    document.getElementById('poker32').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 32) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker32').style.opacity = '0.6';
        thebox.push(32);
    }
}

function cardfunction33() {
    var f = 0;
    document.getElementById('poker33').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 33) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker33').style.opacity = '0.6';
        thebox.push(33);
    }
}

function cardfunction34() {
    var f = 0;
    document.getElementById('poker34').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 34) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker34').style.opacity = '0.6';
        thebox.push(34);
    }
}

function cardfunction35() {
    var f = 0;
    document.getElementById('poker35').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 35) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker35').style.opacity = '0.6';
        thebox.push(35);
    }
}

function cardfunction36() {
    var f = 0;
    document.getElementById('poker36').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 36) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker36').style.opacity = '0.6';
        thebox.push(36);
    }
}

function cardfunction37() {
    var f = 0;
    document.getElementById('poker37').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 37) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker37').style.opacity = '0.6';
        thebox.push(37);
    }
}

function cardfunction38() {
    var f = 0;
    document.getElementById('poker38').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 38) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker38').style.opacity = '0.6';
        thebox.push(38);
    }
}

function cardfunction39() {
    var f = 0;
    document.getElementById('poker39').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 39) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker39').style.opacity = '0.6';
        thebox.push(39);
    }
}

function cardfunction40() {
    var f = 0;
    document.getElementById('poker40').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 40) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker40').style.opacity = '0.6';
        thebox.push(40);
    }
}

function cardfunction41() {
    var f = 0;
    document.getElementById('poker41').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 41) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker41').style.opacity = '0.6';
        thebox.push(41);
    }
}

function cardfunction42() {
    var f = 0;
    document.getElementById('poker42').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 42) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker42').style.opacity = '0.6';
        thebox.push(42);
    }
}

function cardfunction43() {
    var f = 0;
    document.getElementById('poker43').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 43) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker43').style.opacity = '0.6';
        thebox.push(43);
    }
}

function cardfunction44() {
    var f = 0;
    document.getElementById('poker44').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 44) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker44').style.opacity = '0.6';
        thebox.push(44);
    }
}

function cardfunction45() {
    var f = 0;
    document.getElementById('poker45').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 45) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker45').style.opacity = '0.6';
        thebox.push(45);
    }
}

function cardfunction46() {
    var f = 0;
    document.getElementById('poker46').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 46) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker46').style.opacity = '0.6';
        thebox.push(46);
    }
}

function cardfunction47() {
    var f = 0;
    document.getElementById('poker47').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 47) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker47').style.opacity = '0.6';
        thebox.push(47);
    }
}

function cardfunction48() {
    var f = 0;
    document.getElementById('poker48').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 48) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker48').style.opacity = '0.6';
        thebox.push(48);
    }
}

function cardfunction49() {
    var f = 0;
    document.getElementById('poker49').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 49) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker49').style.opacity = '0.6';
        thebox.push(49);
    }
}

function cardfunction50() {
    var f = 0;
    document.getElementById('poker50').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 50) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker50').style.opacity = '0.6';
        thebox.push(50);
    }
}

function cardfunction51() {
    var f = 0;
    document.getElementById('poker51').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 51) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker51').style.opacity = '0.6';
        thebox.push(51);
    }
}

function cardfunction52() {
    var f = 0;
    document.getElementById('poker52').style.opacity = '1.0';
    for (i = 0; i < thebox.length; i++) {
        if (thebox[i] == 52) {
            f = 1;
            thebox.splice(i, 1);
        }
    }
    if (f == 0) {
        document.getElementById('poker52').style.opacity = '0.6';
        thebox.push(52);
    }
}
setInterval(systemplay, 2000);