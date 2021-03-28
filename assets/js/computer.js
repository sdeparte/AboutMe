import $ from 'jquery';

import * as createjs from './createJs/createJs';
window.createjs = createjs;

$( document ).ready(function() {
    computer_init();
});

var computer_canvas, computer_stage, computer_exportRoot, computer_global_container, computer_anim_container, computer_dom_overlay_container, computer_fnStartAnimation;

function computer_init() {
    computer_global_container = document.getElementById("computer_global_container");
    computer_canvas = document.getElementById("computer_canvas");
    computer_anim_container = document.getElementById("computer_animation_container");
    computer_dom_overlay_container = document.getElementById("computer_dom_overlay_container");

    var comp = computer_AdobeAn.getComposition("D3CB6FFFDF67F64A8559800DB3246B17");
    var lib = comp.getLibrary();
    var loader = new createjs.LoadQueue(true);
    loader.addEventListener("fileload", function(evt){computer_handleFileLoad(evt,comp);});
    loader.addEventListener("complete", function(evt){computer_handleComplete(evt,comp);});

    loader.loadManifest(lib.properties.manifest);
}

function computer_handleFileLoad(evt, comp) {
    var images = comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}

function computer_handleComplete(evt,comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp.getLibrary();
    var ss = comp.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;

    for (var i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
    }

    computer_exportRoot = new lib.Moi_FullSize();
    computer_stage = new lib.Stage(computer_canvas);

    //Registers the "tick" event listener.
    computer_fnStartAnimation = function() {
        computer_stage.addChild(computer_exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", computer_stage);
    }

    //Code to support hidpi screens and responsive scaling.
    computer_AdobeAn.makeResponsive(false,'both',false,1,[computer_canvas,computer_anim_container,computer_dom_overlay_container],computer_stage);
    computer_AdobeAn.compositionLoaded(lib.properties.id);
    computer_fnStartAnimation();

    setTimeout(function(){
        $(computer_global_container).removeClass('wait-load');
    }, 250);
}

(function (cjs, an) {

    var p; // shortcut to reference prototypes
    var lib={};var ss={};var img={};
    lib.ssMetadata = [
        {name:"Moi_FullSize_atlas_", frames: [[1387,0,471,427],[1387,429,471,427],[1012,872,489,412],[1503,858,388,405],[637,857,373,870],[1012,0,373,870],[1012,1286,674,255],[0,857,635,601],[0,0,957,855],[1410,1543,399,386],[1012,1543,396,391],[0,1460,512,512]]},
        {name:"Moi_FullSize_atlas_2", frames: [[0,1778,596,240],[0,760,210,724],[680,758,210,662],[407,367,389,389],[1650,0,389,389],[1211,374,429,347],[0,1486,519,290],[892,738,485,286],[1082,1680,451,282],[598,1608,482,266],[1366,1406,479,272],[1379,771,475,278],[892,1321,472,285],[892,1026,469,293],[212,760,466,300],[404,0,418,365],[824,0,415,366],[798,368,411,368],[1241,0,407,372],[0,382,405,376],[0,0,402,380],[1642,391,388,378],[212,1062,380,365],[1366,1051,373,353],[1535,1680,367,341]]},
        {name:"Moi_FullSize_atlas_3", frames: [[0,0,483,250],[337,569,355,296],[318,1533,254,327],[1357,1063,268,350],[0,252,335,354],[0,1087,368,262],[847,0,418,278],[1623,313,384,274],[1621,791,350,270],[0,1351,316,266],[812,1718,401,164],[409,1862,401,165],[977,1551,401,164],[812,1884,400,164],[1623,589,421,165],[1627,1281,414,165],[0,1862,407,165],[574,1551,401,165],[485,0,360,330],[1267,0,354,320],[1623,0,348,311],[1155,569,466,220],[1155,791,464,219],[0,867,463,218],[465,867,462,217],[465,1086,460,217],[694,569,459,226],[337,332,458,235],[847,322,457,245],[929,1012,426,235],[370,1305,395,226],[1627,1063,363,216],[0,608,332,207],[0,1619,301,198],[1215,1717,256,256],[1380,1448,256,256],[1473,1706,256,256],[927,1249,300,300],[1638,1448,256,256],[1731,1706,256,256]]},
        {name:"Moi_FullSize_atlas_4", frames: [[1983,97,57,102],[111,783,106,91],[434,339,11,7],[219,783,47,13],[1390,1004,40,53],[819,507,10,7],[2019,655,11,9],[1214,429,11,11],[1597,440,12,13],[1597,345,12,15],[1597,362,12,15],[1018,407,194,33],[666,472,99,202],[275,487,97,202],[568,552,92,202],[1089,517,93,202],[473,552,93,201],[1734,616,92,201],[883,517,94,201],[374,487,97,201],[173,466,100,201],[1523,461,102,201],[558,349,106,201],[1627,461,105,194],[1322,483,106,185],[979,517,108,174],[0,544,110,170],[1430,664,111,164],[1184,596,113,164],[1903,498,114,166],[140,993,130,26],[1285,166,70,14],[653,799,106,91],[1615,0,179,248],[0,716,109,136],[847,261,169,188],[1796,0,185,205],[1356,106,15,18],[801,192,18,23],[1206,1013,31,42],[1499,830,40,56],[1983,0,65,95],[219,805,80,119],[301,805,80,118],[524,870,64,94],[1130,989,39,55],[2019,494,29,40],[1214,407,17,20],[1401,813,14,15],[210,1021,31,35],[1171,1013,33,40],[2000,742,44,61],[1322,261,51,76],[1326,842,72,116],[1430,483,85,141],[1543,777,85,141],[0,854,72,115],[112,544,51,74],[383,805,43,59],[1786,1013,32,38],[815,1025,30,33],[1208,488,23,18],[74,854,29,20],[824,685,51,27],[1430,626,67,33],[1065,940,111,47],[1004,835,139,56],[383,870,139,56],[951,940,112,47],[767,472,68,33],[471,928,51,27],[1996,916,29,20],[1401,793,24,18],[2010,1011,38,38],[1827,1012,38,38],[1867,1012,37,37],[1906,1012,37,37],[1146,721,36,36],[174,1021,34,34],[712,1025,33,32],[1326,1028,30,31],[876,901,28,28],[2019,599,26,26],[2025,234,23,23],[666,349,19,19],[633,967,12,12],[395,928,74,74],[1400,928,74,74],[876,932,73,73],[1178,940,71,71],[1251,940,69,69],[1246,842,66,66],[473,487,63,63],[1688,970,58,58],[600,1000,54,54],[1828,616,48,48],[1541,1004,42,42],[1734,461,35,35],[0,1030,28,28],[801,217,20,20],[2019,627,26,26],[1401,670,26,26],[1059,693,26,26],[1401,698,25,25],[1708,657,24,24],[2025,259,23,23],[434,267,22,22],[801,239,20,20],[666,412,18,18],[1356,126,16,16],[2027,916,14,14],[540,109,9,9],[747,1025,32,32],[781,1025,32,32],[600,967,31,31],[1293,1028,31,31],[1499,888,30,30],[30,1030,28,28],[2019,570,27,27],[1708,683,24,24],[1772,280,22,22],[1299,596,20,20],[666,432,17,17],[1597,379,13,13],[1772,352,10,10],[2042,97,6,6],[1356,144,16,16],[538,506,16,16],[538,524,16,16],[1710,761,16,15],[1710,778,15,15],[1710,795,15,15],[1791,917,14,14],[1476,928,14,14],[1597,394,13,13],[59,971,12,12],[160,620,11,11],[1784,352,10,10],[1710,819,96,96],[1401,830,96,96],[907,835,95,95],[1808,848,93,93],[1903,848,91,91],[74,876,88,88],[727,901,84,84],[458,109,80,80],[357,267,75,75],[1903,941,69,69],[471,966,63,63],[272,993,56,56],[164,876,48,48],[1251,1011,40,40],[1708,709,24,24],[1401,725,24,24],[1708,735,24,24],[2025,284,23,23],[2025,309,23,23],[434,291,22,22],[2025,334,21,21],[1878,616,20,20],[666,370,19,19],[666,451,17,17],[1299,640,16,16],[1476,944,14,14],[1610,973,12,12],[160,646,10,10],[1974,941,68,68],[1757,943,68,68],[1827,943,67,67],[1322,960,66,66],[74,966,64,64],[536,967,62,62],[1626,970,60,60],[0,971,57,57],[656,1000,54,54],[395,1004,50,50],[1432,1004,46,46],[2000,805,41,41],[1748,1013,36,36],[1358,1028,30,30],[1772,304,22,22],[434,315,22,22],[1772,328,22,22],[1208,442,21,21],[1208,465,21,21],[1299,618,20,20],[666,391,19,19],[538,487,17,17],[1499,646,16,16],[140,966,14,14],[1597,409,13,13],[160,633,11,11],[540,120,8,8],[2042,105,6,6],[1808,819,14,16],[1356,84,16,20],[2025,201,23,31],[435,690,35,49],[1991,666,51,74],[1523,345,72,106],[1146,762,98,146],[653,892,72,106],[1246,762,50,73],[1974,1011,34,47],[1772,250,22,28],[1357,162,15,17],[1597,424,12,14],[363,1023,30,34],[140,1021,32,37],[173,413,38,49],[1184,517,47,68],[813,901,61,94],[1959,364,78,128],[1299,670,100,170],[1630,777,78,128],[333,928,60,93],[1996,848,47,66],[1585,1004,37,47],[330,1023,31,35],[2019,536,29,32],[1878,638,21,18],[1401,751,26,19],[979,693,38,23],[761,799,59,30],[1041,989,87,39],[1630,917,125,51],[1828,780,170,66],[1499,920,125,51],[951,989,88,39],[1480,1004,59,30],[1019,693,38,23],[1401,772,26,19],[1499,626,22,18],[1612,250,158,209],[687,261,158,209],[1319,182,30,4],[1094,183,30,3],[1285,182,32,4],[1126,183,22,3],[1166,442,38,6],[1558,453,29,5],[1018,442,40,6],[1627,657,28,5],[1523,453,33,5],[2042,113,6,6],[2042,121,6,6],[2042,129,6,6],[2042,137,6,6],[2042,145,6,6],[2042,153,6,6],[2042,161,6,6],[2042,169,6,6],[2042,177,6,6],[2042,185,6,6],[2042,193,6,6],[2039,366,7,6],[2039,357,7,7],[1375,261,6,6],[540,159,8,7],[540,150,9,7],[540,168,8,7],[540,177,8,7],[447,339,8,7],[347,466,8,7],[540,130,8,8],[540,140,8,8],[595,756,56,209],[1004,910,320,28],[847,451,359,64],[164,962,161,29],[1757,917,32,17],[823,84,531,80],[823,0,549,82],[823,188,558,71],[1233,261,87,333],[0,0,549,107],[215,267,140,197],[987,166,105,18],[767,517,114,166],[859,1007,37,45],[687,192,112,62],[112,620,46,47],[761,834,144,65],[898,1007,37,45],[551,0,270,190],[1374,0,239,186],[1828,666,161,112],[112,669,160,112],[274,691,159,112],[435,756,158,112],[824,720,159,112],[985,721,159,112],[1322,345,199,136],[1018,261,213,144],[1383,188,227,155],[0,109,227,156],[229,109,227,156],[458,192,227,155],[1796,207,227,155],[0,267,213,144],[357,349,199,136],[1772,364,185,132],[0,413,171,129],[1734,498,167,116],[1543,664,163,111],[662,685,160,112],[164,926,167,34],[435,741,33,11],[1004,893,56,15],[1081,1030,32,11],[1214,166,69,16],[1688,1030,33,10],[275,466,70,14],[447,1031,34,9],[1096,442,33,7],[1060,442,34,7],[1094,166,118,15],[727,997,130,26],[1476,973,132,29],[823,166,162,17],[1184,587,32,7],[1630,907,49,8],[1131,442,33,7],[767,507,50,8],[662,676,32,7],[1062,893,69,10],[937,1030,70,9],[1009,1030,70,9]]}
    ];


// symbols:



    (lib.CachedBmp_1208 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1205 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1207 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1206 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1202 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1201 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1200 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1199 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1198 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1197 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1196 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1190 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1191 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1192 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1193 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1194 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1195 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1161 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1142 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1143 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1144 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1145 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1146 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1147 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1148 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1149 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1150 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1151 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(21);
    }).prototype = p= new cjs.Sprite();



    (lib.CachedBmp_1152 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(22);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1153 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(23);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1154 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(24);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1155 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(25);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1156 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(26);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1157 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(27);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1158 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(28);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1159 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(29);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1056 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(30);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1062 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(31);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_797 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_795 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(32);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_794 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(33);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_793 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(34);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_792 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(35);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_791 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_790 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_789 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_788 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(36);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_787 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_786 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_785 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_783 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(37);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_782 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(38);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_780 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(39);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_779 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(40);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_777 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(41);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_776 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(42);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_774 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(43);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_773 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(44);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_771 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(45);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_770 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(46);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_768 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(47);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_767 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(48);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_764 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(49);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_763 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(50);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_761 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(51);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_760 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(52);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_758 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(53);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_757 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(54);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_755 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(55);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_754 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(56);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_752 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(57);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_751 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(58);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_749 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(59);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_748 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(60);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_745 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(61);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_744 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(62);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_742 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(63);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_741 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(64);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_739 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(65);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_738 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(66);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_736 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(67);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_735 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(68);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_733 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(69);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_732 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(70);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_730 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(71);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_729 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(72);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_727 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(73);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_726 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(74);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_725 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(75);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_724 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(76);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_723 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(77);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_722 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(78);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_721 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(79);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_720 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(80);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_719 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(81);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_718 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(82);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_717 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(83);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_716 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(84);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_714 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(85);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_713 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(86);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_712 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(87);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_711 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(88);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_710 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(89);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_709 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(90);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_708 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(91);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_707 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(92);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_706 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(93);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_705 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(94);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_704 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(95);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_703 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(96);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_702 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(97);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_701 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(98);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_700 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(99);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_699 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(100);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_698 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(101);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_697 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(102);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_696 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(103);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_695 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(104);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_694 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(105);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_693 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(106);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_692 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(107);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_691 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(108);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_690 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(109);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_689 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(110);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_687 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(111);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_685 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(112);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_684 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(113);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_683 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(114);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_682 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(115);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_681 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(116);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_680 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(117);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_679 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(118);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_678 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(119);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_677 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(120);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_676 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(121);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_675 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(122);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_674 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(123);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_673 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(124);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_672 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(125);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_671 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(126);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_670 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(127);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_715 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(128);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_667 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(129);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_666 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(130);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_665 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(131);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_664 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(132);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_663 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(133);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_662 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(134);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_688 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(135);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_659 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(136);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_658 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(137);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_657 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(138);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_656 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(139);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_655 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(140);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_654 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(141);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_653 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(142);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_652 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(143);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_651 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(144);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_650 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(145);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_649 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(146);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_648 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(147);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_647 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(148);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_646 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(149);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_645 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(150);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_644 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(151);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_643 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(152);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_642 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(153);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_641 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(154);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_640 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(155);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_639 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(156);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_638 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(157);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_637 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(158);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_636 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(159);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_635 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(160);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_634 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(161);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_668 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(162);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_632 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(163);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_631 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(164);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_630 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(165);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_629 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(166);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_628 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(167);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_627 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(168);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_626 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(169);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_625 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(170);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_624 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(171);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_623 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(172);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_622 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(173);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_621 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(174);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_620 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(175);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_619 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(176);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_618 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(177);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_617 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(178);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_616 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(179);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_615 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(180);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_614 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(181);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_613 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(182);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_612 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(183);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_611 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(184);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_610 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(185);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_609 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(186);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_608 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(187);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_607 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(188);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_606 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(189);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_661 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(190);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_604 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(191);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_603 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(192);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_686 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(193);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_784 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(194);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_600 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(195);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_781 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(196);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_598 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(197);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_778 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(198);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_596 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(199);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_775 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(200);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_594 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(201);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_772 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(202);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_592 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(203);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_769 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(204);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_590 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(205);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_766 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(206);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_765 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(207);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_587 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(208);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_762 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(209);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_585 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(210);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_759 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(211);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_583 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(212);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_756 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(213);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_581 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(214);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_753 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(215);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_579 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(216);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_750 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(217);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_577 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(218);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_747 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(219);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_746 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(220);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_574 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(221);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_743 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(222);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_572 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(223);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_740 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(224);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_570 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(225);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_737 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(226);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_568 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(227);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_734 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(228);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_566 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(229);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_731 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(230);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_564 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(231);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_728 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(232);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_562 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_556 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_555 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_548 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_547 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(233);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_546 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(234);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1122 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(235);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1121 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(236);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1120 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(237);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1119 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(238);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1118 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(239);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1117 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(240);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1116 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(241);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1115 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(242);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1114 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(243);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1113 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(244);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1112 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(245);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1110 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(246);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1108 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(247);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1105 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(248);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1102 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(249);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1100 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(250);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1098 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(251);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1095 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(252);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1096 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(253);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1111 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(254);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1092 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(255);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1091 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(256);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1090 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(257);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1089 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(258);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1088 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(259);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1087 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(260);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1086 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(261);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1084 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(262);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1085 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(263);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1082 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(264);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1081 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(265);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1080 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(266);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1079 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1078 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(267);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1077 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(268);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1076 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(269);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1075 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(270);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1074 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(271);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1073 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(272);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1072 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(273);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1071 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1070 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(274);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1069 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(275);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_485 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_486 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_487 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_488 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_489 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_490 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_491 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_477 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_476 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1160 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(276);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_474 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(277);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_473 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(278);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_561 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(279);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_560 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(280);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_559 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(281);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_558 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(282);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_557 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(283);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_405 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_464 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_465 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_466 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_440 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_441 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_442 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_467 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_275 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_276 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_277 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_278 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_279 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_280 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_281 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_282 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_283 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_284 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_285 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_286 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_287 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_288 = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_289 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(21);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_290 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(22);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_291 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(23);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_292 = function() {
        this.initialize(ss["Moi_FullSize_atlas_2"]);
        this.gotoAndStop(24);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_293 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_294 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_295 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_549 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(21);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_240 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(22);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_241 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(23);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_242 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(24);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_243 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(25);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_244 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(26);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_245 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(27);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_246 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(28);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_247 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(29);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_248 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(30);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_249 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(31);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_250 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(32);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_251 = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(33);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_252 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(284);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_253 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(285);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_217 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(286);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_218 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(287);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_219 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(288);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_220 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(289);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_221 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(290);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_222 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(291);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_50 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(292);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_49 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(293);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_796 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(294);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_42 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(295);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_44 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(296);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_46 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(297);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_48 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(298);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_32 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(299);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_31 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(300);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_51 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(301);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_52 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(302);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_53 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(303);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_54 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(304);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_223 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(305);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1068 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(306);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1067 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(307);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1066 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(308);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1065 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(309);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1064 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(310);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1063 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(311);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_19 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(312);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1060 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(313);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1059 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(314);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1058 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(315);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1057 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(316);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_13 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(317);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1055 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(318);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1054 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(319);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1053 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(320);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1052 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(321);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1061 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(322);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1050 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(323);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1049 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(324);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1048 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(325);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1047 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(326);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1046 = function() {
        this.initialize(ss["Moi_FullSize_atlas_4"]);
        this.gotoAndStop(327);
    }).prototype = p = new cjs.Sprite();



    (lib.dotnet = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(34);
    }).prototype = p = new cjs.Sprite();



    (lib.flutter = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(35);
    }).prototype = p = new cjs.Sprite();



    (lib.java = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(36);
    }).prototype = p = new cjs.Sprite();



    (lib.mysql = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(37);
    }).prototype = p = new cjs.Sprite();



    (lib.php = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(38);
    }).prototype = p = new cjs.Sprite();



    (lib.swift = function() {
        this.initialize(ss["Moi_FullSize_atlas_"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.symfony = function() {
        this.initialize(ss["Moi_FullSize_atlas_3"]);
        this.gotoAndStop(39);
    }).prototype = p = new cjs.Sprite();
// helper functions:

    function mc_symbol_clone() {
        var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
        clone.gotoAndStop(this.currentFrame);
        clone.paused = this.paused;
        clone.framerate = this.framerate;
        return clone;
    }

    function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
        var prototype= new cjs.extend(symbol, cjs.MovieClip);
        prototype.clone = mc_symbol_clone;
        prototype.nominalBounds = nominalBounds;
        prototype.frameBounds = frameBounds;
        return prototype;
    }


    (lib.Surface = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_1161();
        this.instance.setTransform(0,0,0.0708,0.0708);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Surface, new cjs.Rectangle(0,0,13.8,2.4), null);


    (lib.Shaker = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_1160();
        this.instance.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Shaker, new cjs.Rectangle(0,0,18.4,25.9), null);


    (lib.Ombre = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_797();
        this.instance.setTransform(8.6,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Ombre, new cjs.Rectangle(8.6,0,78.30000000000001,31.5), null);


    (lib.Main = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_796();
        this.instance.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Main, new cjs.Rectangle(0,0,29.8,20.4), null);


    (lib.ClipGroup_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AgeEHIgRABIgMgBIgYgEIgtgDIgtgDIggAAQgVAAgJgGQgMgGgFgeQgEgbAEgPQAEgOApgpIAVgTQANgNAEgIQAYgrASg2QASg8ALgdQASgzAZgeQAdgkAqgTQAsgUAuADQAbACATAJQAQAJASATQArAvANAdQAUAvgMBDQgCANgDAEQgDAEgFAEIgJAIQgJAJABARQABAKAFAVQAFAUgBAOQgCAUgPAAIgHgBQgFAAgBABQgCACAAAEIgBAIQgBAGgJADQgOAHgEAcQgEAfgKAIQgLAKgdgDQgVgDgTgHIgKgEQgIgGgCAAIgHAJIgnA5QgBACgIADIgJADg");
        mask.setTransform(25.4529,26.63);

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(0,0,0,0), null);


    (lib.ClipGroup_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AiwDCQgigEgKgcQgUg7ANhlQAHguATgmQAVgqAigaQArggBAgIQAhgFAcADQBBAGA0AtQA1AuAPA/IAFAXQAEALAHAHQADABAHgHIgFAVQgHAZgPAIQgOAGgJgHQgJgHACgRQgMAhghAWIgTALQgKAHgGAHQgGAIgFAUQgMADgLgMQgKgJgFgPIgIgbQgGgPgKgGQgNgIgPAFQgQAFgKANQgJAKgGARIgKAeQgMAmgWAMQgIAEgSADQgfAGgTAAIgKAAg");
        mask.setTransform(23.253,19.4148);

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(0,0,0,0), null);


    (lib.ClipGroup_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AgeEHIgRABIgMgBIgYgEIgtgDIgtgDIggAAQgVAAgJgGQgMgGgFgeQgEgbAEgPQAEgOApgpIAVgTQANgNAEgIQAYgrASg2QASg8ALgdQASgzAZgeQAdgkAqgTQAsgUAuADQAbACATAJQAQAJASATQArAvANAdQAUAvgMBDQgCANgDAEQgDAEgFAEIgJAIQgJAJABARQABAKAFAVQAFAUgBAOQgCAUgPAAIgHgBQgFAAgBABQgCACAAAEIgBAIQgBAGgJADQgOAHgEAcQgEAfgKAIQgLAKgdgDQgVgDgTgHIgKgEQgIgGgCAAIgHAJIgnA5QgBACgIADIgJADg");
        mask.setTransform(30.5029,26.63);

        // Calque_3
        this.instance = new lib.CachedBmp_795();
        this.instance.setTransform(41.85,16.75,0.1313,0.1313);

        this.instance_1 = new lib.CachedBmp_794();
        this.instance_1.setTransform(0,20.8,0.1313,0.1313);

        this.instance_2 = new lib.CachedBmp_793();
        this.instance_2.setTransform(29.3,34.65,0.1313,0.1313);

        var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(5,16.8,50.8,36.5), null);


    (lib.ClipGroup_0 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AiwDCQgigEgKgcQgUg7ANhlQAHguATgmQAVgqAigaQArggBAgIQAhgFAcADQBBAGA0AtQA1AuAPA/IAFAXQAEALAHAHQADABAHgHIgFAVQgHAZgPAIQgOAGgJgHQgJgHACgRQgMAhghAWIgTALQgKAHgGAHQgGAIgFAUQgMADgLgMQgKgJgFgPIgIgbQgGgPgKgGQgNgIgPAFQgQAFgKANQgJAKgGARIgKAeQgMAmgWAMQgIAEgSADQggAGgSAAIgKAAg");
        mask.setTransform(34.953,22.5148);

        // Calque_3
        this.instance = new lib.CachedBmp_792();
        this.instance.setTransform(41.45,16.7,0.1313,0.1313);

        this.instance_1 = new lib.CachedBmp_791();
        this.instance_1.setTransform(0,0,0.1313,0.1313);

        var maskedShapeInstanceList = [this.instance,this.instance_1];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_0, new cjs.Rectangle(11.7,3.1,46.599999999999994,38.9), null);


    (lib.ClipGroup = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AgWAhQgGgJAEgRQAEgQAIgLQAHgHAJgDQAKgEAKACIADgCQgJAegSAYQgIAKgGADIgEACQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAgBgBAAg");
        mask.setTransform(2.645,3.5);

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0,0,0,0), null);


    (lib.Path_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_790();
        this.instance.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,49,114.3), null);


    (lib.Path = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_789();
        this.instance.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,27.6,95.1), null);


    (lib.Path_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_788();
        this.instance_1.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,24.3,26.9), null);


    (lib.Path_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_787();
        this.instance_2.setTransform(0,0,0.1263,0.1263);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,33.9,44.2), null);


    (lib.Path_1_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_786();
        this.instance_1.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,49,114.3), null);


    (lib.Path_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_785();
        this.instance_3.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0,27.6,87), null);


    (lib.Explosion_13f = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_728();
        this.instance.setTransform(77.05,141.65,0.5,0.5);

        this.instance_1 = new lib.CachedBmp_564();
        this.instance_1.setTransform(74.65,140.9,0.5,0.5);

        this.instance_2 = new lib.CachedBmp_731();
        this.instance_2.setTransform(67.45,138.55,0.5,0.5);

        this.instance_3 = new lib.CachedBmp_566();
        this.instance_3.setTransform(55.5,134.7,0.5,0.5);

        this.instance_4 = new lib.CachedBmp_734();
        this.instance_4.setTransform(38.7,129.25,0.5,0.5);

        this.instance_5 = new lib.CachedBmp_568();
        this.instance_5.setTransform(17.15,122.3,0.5,0.5);

        this.instance_6 = new lib.CachedBmp_737();
        this.instance_6.setTransform(-9.2,113.8,0.5,0.5);

        this.instance_7 = new lib.CachedBmp_570();
        this.instance_7.setTransform(-12.95,112.6,0.5,0.5);

        this.instance_8 = new lib.CachedBmp_740();
        this.instance_8.setTransform(-16,111.6,0.5,0.5);

        this.instance_9 = new lib.CachedBmp_572();
        this.instance_9.setTransform(-18.4,110.8,0.5,0.5);

        this.instance_10 = new lib.CachedBmp_743();
        this.instance_10.setTransform(-20.1,110.25,0.5,0.5);

        this.instance_11 = new lib.CachedBmp_574();
        this.instance_11.setTransform(-21.1,109.9,0.5,0.5);

        this.instance_12 = new lib.CachedBmp_746();
        this.instance_12.setTransform(-21.45,109.8,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).wait(1));

        // Calque_2
        this.instance_13 = new lib.CachedBmp_747();
        this.instance_13.setTransform(104.75,158.05,0.5,0.5);

        this.instance_14 = new lib.CachedBmp_577();
        this.instance_14.setTransform(104.9,158.35,0.5,0.5);

        this.instance_15 = new lib.CachedBmp_750();
        this.instance_15.setTransform(105.35,159.2,0.5,0.5);

        this.instance_16 = new lib.CachedBmp_579();
        this.instance_16.setTransform(106.1,160.6,0.5,0.5);

        this.instance_17 = new lib.CachedBmp_753();
        this.instance_17.setTransform(107.1,162.6,0.5,0.5);

        this.instance_18 = new lib.CachedBmp_581();
        this.instance_18.setTransform(108.45,165.15,0.5,0.5);

        this.instance_19 = new lib.CachedBmp_756();
        this.instance_19.setTransform(110.05,168.3,0.5,0.5);

        this.instance_20 = new lib.CachedBmp_583();
        this.instance_20.setTransform(122.3,192.2,0.5,0.5);

        this.instance_21 = new lib.CachedBmp_759();
        this.instance_21.setTransform(132.3,211.75,0.5,0.5);

        this.instance_22 = new lib.CachedBmp_585();
        this.instance_22.setTransform(140.1,226.95,0.5,0.5);

        this.instance_23 = new lib.CachedBmp_762();
        this.instance_23.setTransform(145.65,237.8,0.5,0.5);

        this.instance_24 = new lib.CachedBmp_587();
        this.instance_24.setTransform(149,244.35,0.5,0.5);

        this.instance_25 = new lib.CachedBmp_765();
        this.instance_25.setTransform(150.1,246.5,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13}]}).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).wait(1));

        // Eclatement
        this.instance_26 = new lib.CachedBmp_766();
        this.instance_26.setTransform(101,142.4,0.5,0.5);

        this.instance_27 = new lib.CachedBmp_590();
        this.instance_27.setTransform(101.25,140.2,0.5,0.5);

        this.instance_28 = new lib.CachedBmp_769();
        this.instance_28.setTransform(101.9,133.6,0.5,0.5);

        this.instance_29 = new lib.CachedBmp_592();
        this.instance_29.setTransform(103.1,122.65,0.5,0.5);

        this.instance_30 = new lib.CachedBmp_772();
        this.instance_30.setTransform(104.7,107.25,0.5,0.5);

        this.instance_31 = new lib.CachedBmp_594();
        this.instance_31.setTransform(106.75,87.45,0.5,0.5);

        this.instance_32 = new lib.CachedBmp_775();
        this.instance_32.setTransform(109.3,63.3,0.5,0.5);

        this.instance_33 = new lib.CachedBmp_596();
        this.instance_33.setTransform(123.5,61.1,0.5,0.5);

        this.instance_34 = new lib.CachedBmp_778();
        this.instance_34.setTransform(135.1,59.25,0.5,0.5);

        this.instance_35 = new lib.CachedBmp_598();
        this.instance_35.setTransform(144.15,57.85,0.5,0.5);

        this.instance_36 = new lib.CachedBmp_781();
        this.instance_36.setTransform(150.6,56.85,0.5,0.5);

        this.instance_37 = new lib.CachedBmp_600();
        this.instance_37.setTransform(154.45,56.25,0.5,0.5);

        this.instance_38 = new lib.CachedBmp_784();
        this.instance_38.setTransform(155.75,56.05,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_26}]}).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).wait(1));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.4,56.1,186.5,207.4);


    (lib.Capuchon = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_561();
        this.instance.setTransform(12.5,5.65,0.1313,0.1313);

        this.instance_1 = new lib.CachedBmp_560();
        this.instance_1.setTransform(11.75,0,0.1313,0.1313);

        this.instance_2 = new lib.CachedBmp_559();
        this.instance_2.setTransform(2.25,5.45,0.1313,0.1313);

        this.instance_3 = new lib.CachedBmp_558();
        this.instance_3.setTransform(0,7.35,0.1313,0.1313);

        this.instance_4 = new lib.CachedBmp_557();
        this.instance_4.setTransform(10.15,5.45,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Capuchon, new cjs.Rectangle(0,0,26.5,15.9), null);


    (lib.Bulle_symfony = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.symfony();
        this.instance.setTransform(0,0,0.7277,0.7277);

        this.instance_1 = new lib.CachedBmp_556();
        this.instance_1.setTransform(-4,-4,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Bulle_symfony, new cjs.Rectangle(-4,-4,194.5,194.5), null);


    (lib.Bulle_swift = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.swift();
        this.instance.setTransform(5,5,0.317,0.317);

        this.instance_1 = new lib.CachedBmp_555();
        this.instance_1.setTransform(-4,-4,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Bulle_swift, new cjs.Rectangle(-4,-4,194.5,194.5), null);


    (lib.Bulle_php = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.php();
        this.instance.setTransform(0,0,0.7277,0.7277);

        this.instance_1 = new lib.CachedBmp_556();
        this.instance_1.setTransform(-4,-4,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Bulle_php, new cjs.Rectangle(-4,-4,194.5,194.5), null);


    (lib.Bulle_mysql = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.mysql();
        this.instance.setTransform(0,0,0.621,0.621);

        this.instance_1 = new lib.CachedBmp_556();
        this.instance_1.setTransform(-4,-4,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Bulle_mysql, new cjs.Rectangle(-4,-4,194.5,194.5), null);


    (lib.Bulle_java = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.java();
        this.instance.setTransform(0,0,0.7277,0.7277);

        this.instance_1 = new lib.CachedBmp_555();
        this.instance_1.setTransform(-4,-4,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Bulle_java, new cjs.Rectangle(-4,-4,194.5,194.5), null);


    (lib.Bulle_flutter = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.flutter();
        this.instance.setTransform(0,0,0.7277,0.7277);

        this.instance_1 = new lib.CachedBmp_555();
        this.instance_1.setTransform(-4,-4,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Bulle_flutter, new cjs.Rectangle(-4,-4,194.5,194.5), null);


    (lib.Bulle_dotnet = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.dotnet();
        this.instance.setTransform(28,28,0.5077,0.5077);

        this.instance_1 = new lib.CachedBmp_555();
        this.instance_1.setTransform(-4,-4,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Bulle_dotnet, new cjs.Rectangle(-4,-4,194.5,194.5), null);


    (lib.Avantbras = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_549();
        this.instance.setTransform(0,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Avantbras, new cjs.Rectangle(0,0,61.2,28.9), null);


    (lib.ArriereBras = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#966B55").s().p("AA/DkQg3gLg3gmQgpgbg2g0QhJhFgigwQgPgXgGghQgEgXAAgmQAAgRADgKQAEgMANgRQANgQAOgLQAWgQAdgEQAbgEAcAHQAdAIAfAWQASAMAiAdIAsAjQAaAUARAQIAZAXQAPANANAGQAJAFAUAHQATAGAKAFQAaANAYAiQAUAdAJAhQAJAigEAiQgCAXgKAQQgaAsg/AGIgQAAQglAAg4gLg");
        this.shape.setTransform(27.4615,23.9577);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ArriereBras, new cjs.Rectangle(0,0,54.9,47.9), null);


    (lib.Allcodelines = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_1068();
        this.instance.setTransform(2.1,25.15,0.1313,0.1313);

        this.instance_1 = new lib.CachedBmp_1067();
        this.instance_1.setTransform(2.4,23.8,0.1313,0.1313);

        this.instance_2 = new lib.CachedBmp_1066();
        this.instance_2.setTransform(2.75,22.5,0.1313,0.1313);

        this.instance_3 = new lib.CachedBmp_1065();
        this.instance_3.setTransform(0,20.6,0.1313,0.1313);

        this.instance_4 = new lib.CachedBmp_1064();
        this.instance_4.setTransform(4.35,21.4,0.1313,0.1313);

        this.instance_5 = new lib.CachedBmp_1063();
        this.instance_5.setTransform(0.65,18.05,0.1313,0.1313);

        this.instance_6 = new lib.CachedBmp_19();
        this.instance_6.setTransform(4.2,17.15,0.1313,0.1313);

        this.instance_7 = new lib.CachedBmp_1061();
        this.instance_7.setTransform(3.7,6.4,0.1313,0.1313);

        this.instance_8 = new lib.CachedBmp_1060();
        this.instance_8.setTransform(4.85,14.4,0.1313,0.1313);

        this.instance_9 = new lib.CachedBmp_1059();
        this.instance_9.setTransform(5.85,10.4,0.1313,0.1313);

        this.instance_10 = new lib.CachedBmp_1058();
        this.instance_10.setTransform(4.6,2.6,0.1313,0.1313);

        this.instance_11 = new lib.CachedBmp_1057();
        this.instance_11.setTransform(8.45,13.35,0.1313,0.1313);

        this.instance_12 = new lib.CachedBmp_13();
        this.instance_12.setTransform(10.55,23.85,0.1313,0.1313);

        this.instance_13 = new lib.CachedBmp_1055();
        this.instance_13.setTransform(1.85,26.45,0.1313,0.1313);

        this.instance_14 = new lib.CachedBmp_1054();
        this.instance_14.setTransform(8.75,11.95,0.1313,0.1313);

        this.instance_15 = new lib.CachedBmp_1053();
        this.instance_15.setTransform(12.1,0.3,0.1313,0.1313);

        this.instance_16 = new lib.CachedBmp_1052();
        this.instance_16.setTransform(4.3,3.9,0.1313,0.1313);

        this.instance_17 = new lib.CachedBmp_1061();
        this.instance_17.setTransform(3.7,6.4,0.1313,0.1313);

        this.instance_18 = new lib.CachedBmp_1050();
        this.instance_18.setTransform(5.35,0,0.1313,0.1313);

        this.instance_19 = new lib.CachedBmp_1049();
        this.instance_19.setTransform(16.1,8.3,0.1313,0.1313);

        this.instance_20 = new lib.CachedBmp_1048();
        this.instance_20.setTransform(10.65,10.65,0.1313,0.1313);

        this.instance_21 = new lib.CachedBmp_1047();
        this.instance_21.setTransform(6.65,7.8,0.1313,0.1313);

        this.instance_22 = new lib.CachedBmp_1046();
        this.instance_22.setTransform(8.3,6.65,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Allcodelines, new cjs.Rectangle(0,0,30.1,30.3), null);


    (lib.Tete = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2
        this.instance = new lib.CachedBmp_1195();
        this.instance.setTransform(45.5,35.9,0.1313,0.1313);

        this.instance_1 = new lib.CachedBmp_1194();
        this.instance_1.setTransform(45.5,35.95,0.1313,0.1313);
        this.instance_1._off = true;

        this.instance_2 = new lib.CachedBmp_1193();
        this.instance_2.setTransform(45.5,36.2,0.1313,0.1313);
        this.instance_2._off = true;

        this.instance_3 = new lib.CachedBmp_1192();
        this.instance_3.setTransform(45.5,36.5,0.1313,0.1313);
        this.instance_3._off = true;

        this.instance_4 = new lib.CachedBmp_1191();
        this.instance_4.setTransform(45.45,36.75,0.1313,0.1313);
        this.instance_4._off = true;

        this.instance_5 = new lib.CachedBmp_1190();
        this.instance_5.setTransform(45.5,37,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},31).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_4}]},18).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},71).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},60).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).wait(52));
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(31).to({_off:true},1).wait(26).to({_off:false},0).wait(71).to({_off:true},1).wait(9).to({_off:false},0).wait(60).to({_off:true},1).wait(9).to({_off:false},0).wait(52));
        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(32).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(72).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(61).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(52));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(33).to({_off:false},0).to({_off:true},1).wait(22).to({_off:false},0).to({_off:true},1).wait(74).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(63).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(53));
        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(34).to({_off:false},0).to({_off:true},1).wait(20).to({_off:false},0).to({_off:true},1).wait(76).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(54));
        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(35).to({_off:false},0).to({_off:true},1).wait(18).to({_off:false},0).to({_off:true},1).wait(78).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(67).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(55));

        // flash0_ai
        this.instance_6 = new lib.ClipGroup_0();
        this.instance_6.setTransform(29.3,18.4,0.9999,0.9999,0,0,0,31.8,21.4);

        this.instance_7 = new lib.CachedBmp_1202();
        this.instance_7.setTransform(9.1,0,0.1313,0.1313);

        this.instance_8 = new lib.ClipGroup_1();
        this.instance_8.setTransform(22.95,36.85,0.9999,0.9999,0,0,0,27.9,26.7);

        this.instance_9 = new lib.ClipGroup_2();
        this.instance_9.setTransform(32.4,19.4,0.9999,0.9999,0,0,0,23.3,19.4);

        this.instance_10 = new lib.CachedBmp_1201();
        this.instance_10.setTransform(28.15,24.95,0.1313,0.1313);

        this.instance_11 = new lib.CachedBmp_1200();
        this.instance_11.setTransform(39.15,26,0.1313,0.1313);

        this.instance_12 = new lib.ClipGroup_3();
        this.instance_12.setTransform(25.5,36.85,0.9999,0.9999,0,0,0,25.5,26.7);

        this.instance_13 = new lib.CachedBmp_1199();
        this.instance_13.setTransform(45.9,46.05,0.1313,0.1313);

        this.instance_14 = new lib.CachedBmp_1198();
        this.instance_14.setTransform(0,10.2,0.1313,0.1313);

        this.instance_15 = new lib.CachedBmp_1197();
        this.instance_15.setTransform(46.6,35.05,0.1313,0.1313);

        this.instance_16 = new lib.ClipGroup();
        this.instance_16.setTransform(49.25,39.45,0.9999,0.9999,0,0,0,2.7,3.6);

        this.instance_17 = new lib.CachedBmp_1196();
        this.instance_17.setTransform(46.55,35.85,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]}).wait(261));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-4.9,-3,66.10000000000001,66.5);


    (lib.Prot = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2
        this.instance = new lib.Surface();
        this.instance.setTransform(7.6,1.55,1,1,0,0,0,6.9,1.2);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({regX:7,regY:1.1,scaleX:1.0505,rotation:17.3857,x:7.45,y:2.75},2).to({scaleX:1.1733,rotation:34.7716,y:3.9},2).to({regX:6.9,regY:0.8,scaleX:1.2348,scaleY:0.9999,rotation:43.4646,x:7.75,y:4.2},1).to({regY:1,scaleX:1.3516,rotation:52.1564,x:7.9,y:4.85},1).to({regY:0.9,scaleX:1.6383,rotation:69.5421,x:9,y:6.5},2).to({regX:6.8,regY:1.1,scaleX:1.8551,scaleY:1,rotation:78.2345,x:9.6,y:7.85},1).to({rotation:96.9501,x:10.55,y:8.55},8).wait(23).to({rotation:78.2345,x:9.6,y:7.85},8).to({regX:6.9,regY:0.9,scaleX:1.6383,scaleY:0.9999,rotation:69.5421,x:9,y:6.5},1).to({regY:1,scaleX:1.3516,rotation:52.1564,x:7.9,y:4.85},2).to({regY:0.8,scaleX:1.2348,rotation:43.4646,x:7.75,y:4.2},1).to({regX:7,regY:1.1,scaleX:1.1733,scaleY:1,rotation:34.7716,x:7.45,y:3.9},1).to({scaleX:1.0505,rotation:17.3857,y:2.75},2).to({regX:6.9,regY:1.2,scaleX:1,rotation:0,x:7.6,y:1.55},2).to({_off:true},191).wait(8));

        // Calque_1
        this.instance_1 = new lib.CachedBmp_1159();
        this.instance_1.setTransform(0,0,0.1313,0.1313);

        this.instance_2 = new lib.CachedBmp_1158();
        this.instance_2.setTransform(0,0.25,0.1313,0.1313);

        this.instance_3 = new lib.CachedBmp_1157();
        this.instance_3.setTransform(0,0.25,0.1313,0.1313);

        this.instance_4 = new lib.CachedBmp_1156();
        this.instance_4.setTransform(0,-0.4,0.1313,0.1313);

        this.instance_5 = new lib.CachedBmp_1155();
        this.instance_5.setTransform(0,-1.05,0.1313,0.1313);

        this.instance_6 = new lib.CachedBmp_1154();
        this.instance_6.setTransform(0,-2.4,0.1313,0.1313);

        this.instance_7 = new lib.CachedBmp_1153();
        this.instance_7.setTransform(-0.05,-3.65,0.1313,0.1313);

        this.instance_8 = new lib.CachedBmp_1152();
        this.instance_8.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_9 = new lib.CachedBmp_1151();
        this.instance_9.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_10 = new lib.CachedBmp_1150();
        this.instance_10.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_11 = new lib.CachedBmp_1149();
        this.instance_11.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_12 = new lib.CachedBmp_1148();
        this.instance_12.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_13 = new lib.CachedBmp_1147();
        this.instance_13.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_14 = new lib.CachedBmp_1146();
        this.instance_14.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_15 = new lib.CachedBmp_1145();
        this.instance_15.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_16 = new lib.CachedBmp_1144();
        this.instance_16.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_17 = new lib.CachedBmp_1143();
        this.instance_17.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.instance_18 = new lib.CachedBmp_1142();
        this.instance_18.setTransform(-0.3,-4.55,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},23).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1}]},1).wait(199));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-0.3,-4.7,15.3,26.7);


    (lib.PC = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_3 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AjwBjIBEkOIGdASIhKFFg");
        mask.setTransform(56.35,22.925);

        // Calque_29
        this.instance = new lib.CachedBmp_1050();
        this.instance.setTransform(49.9,7.2,0.1313,0.1313);

        this.instance_1 = new lib.CachedBmp_1053();
        this.instance_1.setTransform(56.65,7.55,0.1313,0.1313);

        this.instance_2 = new lib.CachedBmp_1058();
        this.instance_2.setTransform(49.2,9.8,0.1313,0.1313);

        this.instance_3 = new lib.CachedBmp_1052();
        this.instance_3.setTransform(48.9,11.1,0.1313,0.1313);

        this.instance_4 = new lib.CachedBmp_1061();
        this.instance_4.setTransform(48.3,13.65,0.1313,0.1313);

        this.instance_5 = new lib.CachedBmp_1061();
        this.instance_5.setTransform(48.3,13.65,0.1313,0.1313);

        this.instance_6 = new lib.CachedBmp_1046();
        this.instance_6.setTransform(52.85,13.85,0.1313,0.1313);

        this.instance_7 = new lib.CachedBmp_1047();
        this.instance_7.setTransform(51.25,15.05,0.1313,0.1313);

        this.instance_8 = new lib.CachedBmp_1049();
        this.instance_8.setTransform(60.65,15.5,0.1313,0.1313);

        this.instance_9 = new lib.CachedBmp_1059();
        this.instance_9.setTransform(50.45,17.6,0.1313,0.1313);

        this.instance_10 = new lib.CachedBmp_1048();
        this.instance_10.setTransform(55.2,17.85,0.1313,0.1313);

        this.instance_11 = new lib.CachedBmp_1054();
        this.instance_11.setTransform(53.35,19.15,0.1313,0.1313);

        this.instance_12 = new lib.CachedBmp_1057();
        this.instance_12.setTransform(53.05,20.6,0.1313,0.1313);

        this.instance_13 = new lib.CachedBmp_1060();
        this.instance_13.setTransform(49.4,21.6,0.1313,0.1313);

        this.instance_14 = new lib.CachedBmp_1062();
        this.instance_14.setTransform(48.75,24.35,0.1313,0.1313);

        this.instance_15 = new lib.CachedBmp_1063();
        this.instance_15.setTransform(45.2,25.25,0.1313,0.1313);

        this.instance_16 = new lib.CachedBmp_1065();
        this.instance_16.setTransform(44.55,27.85,0.1313,0.1313);

        this.instance_17 = new lib.CachedBmp_1064();
        this.instance_17.setTransform(48.95,28.65,0.1313,0.1313);

        this.instance_18 = new lib.CachedBmp_1066();
        this.instance_18.setTransform(47.35,29.75,0.1313,0.1313);

        this.instance_19 = new lib.CachedBmp_1056();
        this.instance_19.setTransform(55.1,31.1,0.1313,0.1313);

        this.instance_20 = new lib.CachedBmp_1067();
        this.instance_20.setTransform(47,31.05,0.1313,0.1313);

        this.instance_21 = new lib.CachedBmp_1068();
        this.instance_21.setTransform(46.65,32.4,0.1313,0.1313);

        this.instance_22 = new lib.CachedBmp_1055();
        this.instance_22.setTransform(46.4,33.7,0.1313,0.1313);

        this.instance_23 = new lib.Allcodelines();
        this.instance_23.setTransform(59.7,22.45,1,1,0,0,0,15.1,15.2);
        this.instance_23._off = true;

        var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.instance_7,this.instance_8,this.instance_9,this.instance_10,this.instance_11,this.instance_12,this.instance_13,this.instance_14,this.instance_15,this.instance_16,this.instance_17,this.instance_18,this.instance_19,this.instance_20,this.instance_21,this.instance_22,this.instance_23];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance},{t:this.instance_1}]},2).to({state:[{t:this.instance},{t:this.instance_1},{t:this.instance_2}]},2).to({state:[{t:this.instance},{t:this.instance_3},{t:this.instance_1},{t:this.instance_2}]},2).to({state:[{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_2},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_2},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_2},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_2},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_2},{t:this.instance_9},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_2},{t:this.instance_9},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_2},{t:this.instance_9},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15},{t:this.instance_16}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15},{t:this.instance_17},{t:this.instance_16}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15},{t:this.instance_17},{t:this.instance_16},{t:this.instance_18}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_19},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15},{t:this.instance_17},{t:this.instance_16},{t:this.instance_18}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_19},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15},{t:this.instance_17},{t:this.instance_16},{t:this.instance_18},{t:this.instance_20}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_19},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15},{t:this.instance_17},{t:this.instance_16},{t:this.instance_18},{t:this.instance_20},{t:this.instance_21}]},2).to({state:[{t:this.instance_6},{t:this.instance_7},{t:this.instance_10},{t:this.instance_8},{t:this.instance},{t:this.instance_5},{t:this.instance_3},{t:this.instance_1},{t:this.instance_11},{t:this.instance_22},{t:this.instance_19},{t:this.instance_12},{t:this.instance_2},{t:this.instance_9},{t:this.instance_13},{t:this.instance_4},{t:this.instance_14},{t:this.instance_15},{t:this.instance_17},{t:this.instance_16},{t:this.instance_18},{t:this.instance_20},{t:this.instance_21}]},2).to({state:[{t:this.instance_23}]},2).to({state:[{t:this.instance_23}]},9).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(46).to({_off:false},0).to({rotation:-5.231,x:67.1,y:-9.4},9,cjs.Ease.quadIn).wait(1));

        // Calque_28
        this.instance_24 = new lib.CachedBmp_1122();
        this.instance_24.setTransform(40.6,12.6,0.1313,0.1313);

        this.instance_25 = new lib.CachedBmp_1121();
        this.instance_25.setTransform(41.45,9.25,0.1313,0.1313);

        this.instance_26 = new lib.CachedBmp_1120();
        this.instance_26.setTransform(39.3,17.65,0.1313,0.1313);

        this.instance_27 = new lib.CachedBmp_1119();
        this.instance_27.setTransform(38.9,19.3,0.1313,0.1313);

        this.instance_28 = new lib.CachedBmp_1118();
        this.instance_28.setTransform(37.5,20.9,0.1313,0.1313);

        this.instance_29 = new lib.CachedBmp_1117();
        this.instance_29.setTransform(38.8,15.85,0.1313,0.1313);

        this.instance_30 = new lib.CachedBmp_1116();
        this.instance_30.setTransform(39.2,14.15,0.1313,0.1313);

        this.instance_31 = new lib.CachedBmp_1115();
        this.instance_31.setTransform(40.05,10.8,0.1313,0.1313);

        this.instance_32 = new lib.CachedBmp_1114();
        this.instance_32.setTransform(40.9,7.45,0.1313,0.1313);

        this.instance_33 = new lib.CachedBmp_1113();
        this.instance_33.setTransform(41.8,32.8,0.1313,0.1313);

        this.instance_34 = new lib.CachedBmp_1112();
        this.instance_34.setTransform(42.15,31.5,0.1313,0.1313);

        this.instance_35 = new lib.CachedBmp_1111();
        this.instance_35.setTransform(42.5,30.2,0.1313,0.1313);

        this.instance_36 = new lib.CachedBmp_1110();
        this.instance_36.setTransform(42.8,28.9,0.1313,0.1313);

        this.instance_37 = new lib.CachedBmp_1111();
        this.instance_37.setTransform(43.15,27.6,0.1313,0.1313);

        this.instance_38 = new lib.CachedBmp_1108();
        this.instance_38.setTransform(43.5,26.3,0.1313,0.1313);

        this.instance_39 = new lib.CachedBmp_1111();
        this.instance_39.setTransform(43.85,25.05,0.1313,0.1313);

        this.instance_40 = new lib.CachedBmp_1111();
        this.instance_40.setTransform(44.15,23.75,0.1313,0.1313);

        this.instance_41 = new lib.CachedBmp_1105();
        this.instance_41.setTransform(44.5,22.5,0.1313,0.1313);

        this.instance_42 = new lib.CachedBmp_1111();
        this.instance_42.setTransform(44.85,21.2,0.1313,0.1313);

        this.instance_43 = new lib.CachedBmp_1111();
        this.instance_43.setTransform(45.15,19.9,0.1313,0.1313);

        this.instance_44 = new lib.CachedBmp_1102();
        this.instance_44.setTransform(45.5,18.7,0.1313,0.1313);

        this.instance_45 = new lib.CachedBmp_1102();
        this.instance_45.setTransform(45.85,17.4,0.1313,0.1313);

        this.instance_46 = new lib.CachedBmp_1100();
        this.instance_46.setTransform(46.15,16.1,0.1313,0.1313);

        this.instance_47 = new lib.CachedBmp_1100();
        this.instance_47.setTransform(46.5,14.8,0.1313,0.1313);

        this.instance_48 = new lib.CachedBmp_1098();
        this.instance_48.setTransform(46.85,13.5,0.1313,0.1313);

        this.instance_49 = new lib.CachedBmp_1111();
        this.instance_49.setTransform(47.15,12.2,0.1313,0.1313);

        this.instance_50 = new lib.CachedBmp_1096();
        this.instance_50.setTransform(47.5,10.9,0.1313,0.1313);

        this.instance_51 = new lib.CachedBmp_1095();
        this.instance_51.setTransform(47.85,9.65,0.1313,0.1313);

        this.instance_52 = new lib.CachedBmp_1096();
        this.instance_52.setTransform(48.15,8.35,0.1313,0.1313);

        this.instance_53 = new lib.CachedBmp_1111();
        this.instance_53.setTransform(48.5,7.05,0.1313,0.1313);

        this.instance_54 = new lib.CachedBmp_1092();
        this.instance_54.setTransform(76.15,5.6,0.1313,0.1313);

        this.instance_55 = new lib.CachedBmp_1091();
        this.instance_55.setTransform(77.55,5.6,0.1313,0.1313);

        this.instance_56 = new lib.CachedBmp_1090();
        this.instance_56.setTransform(78.95,5.65,0.1313,0.1313);

        this.instance_57 = new lib.CachedBmp_1089();
        this.instance_57.setTransform(37.5,18.85,0.1313,0.1313);

        this.instance_58 = new lib.CachedBmp_1088();
        this.instance_58.setTransform(37.95,17.25,0.1313,0.1313);

        this.instance_59 = new lib.CachedBmp_1087();
        this.instance_59.setTransform(39.25,12.2,0.1313,0.1313);

        this.instance_60 = new lib.CachedBmp_1086();
        this.instance_60.setTransform(40.1,8.85,0.1313,0.1313);

        this.instance_61 = new lib.CachedBmp_1085();
        this.instance_61.setTransform(36.15,20.55,0.1313,0.1313);

        this.instance_62 = new lib.CachedBmp_1084();
        this.instance_62.setTransform(37.4,15.5,0.1313,0.1313);

        this.instance_63 = new lib.CachedBmp_1085();
        this.instance_63.setTransform(37.85,13.9,0.1313,0.1313);

        this.instance_64 = new lib.CachedBmp_1082();
        this.instance_64.setTransform(38.7,10.5,0.1313,0.1313);

        this.instance_65 = new lib.CachedBmp_1081();
        this.instance_65.setTransform(39.55,7.15,0.1313,0.1313);

        this.instance_66 = new lib.CachedBmp_1080();
        this.instance_66.setTransform(40.45,6.75,0.1313,0.1313);

        this.instance_67 = new lib.CachedBmp_1079();
        this.instance_67.setTransform(32.15,5.75,0.1313,0.1313);

        this.instance_68 = new lib.CachedBmp_1078();
        this.instance_68.setTransform(39,3.8,0.1313,0.1313);

        this.instance_69 = new lib.CachedBmp_1077();
        this.instance_69.setTransform(15.45,37.1,0.1313,0.1313);

        this.instance_70 = new lib.CachedBmp_1076();
        this.instance_70.setTransform(12.25,39.6,0.1313,0.1313);

        this.instance_71 = new lib.CachedBmp_1075();
        this.instance_71.setTransform(56.3,0.8,0.1313,0.1313);

        this.instance_72 = new lib.CachedBmp_1074();
        this.instance_72.setTransform(0,40,0.1313,0.1313);

        this.instance_73 = new lib.CachedBmp_1073();
        this.instance_73.setTransform(0,36.4,0.1313,0.1313);

        this.instance_74 = new lib.CachedBmp_1072();
        this.instance_74.setTransform(0,38.95,0.1313,0.1313);

        this.instance_75 = new lib.CachedBmp_1071();
        this.instance_75.setTransform(28.15,0,0.1313,0.1313);

        this.instance_76 = new lib.CachedBmp_1070();
        this.instance_76.setTransform(73.95,1.95,0.1313,0.1313);

        this.instance_77 = new lib.CachedBmp_1069();
        this.instance_77.setTransform(0,36.4,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24}]}).wait(56));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0,0,85.4,50.5);


    (lib.ClipGroup_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        mask_1.graphics.p("ACSIKIhXgDIh8ACQhKAAgygNQgUgFgIgKQgIgJgBgPIAAgaQAAgIgDgLIgGgSQgKgvgIgpQgQhWgTh5IgXiUQgTiHAMhaQAFggAbgrIAwhFQASgZAmgbQA4goAJgHQAPgNAagCIAvgBQAfAAAUAJQAUAIARAVIAcAmQALANApAJQAvALALAGQA9AjAhBNQAbBAAFBWQACAUgBA2QgCAlgLA1IgaB9QgJAmAAAaQAAAOAFAbQAEAaAAAOIABBjQAAAUACAJIAGAYQADASgFAQQgFASgMAKQgPAMgcADQgaADgkAAIgYAAg");
        mask_1.setTransform(47.597,58.7438);

        // Calque_3
        this.instance = new lib.Path();
        this.instance.setTransform(83.1,67.05,1,1,0,0,0,13.8,47.6);
        this.instance.alpha = 0.1016;

        this.instance_1 = new lib.Path_1();
        this.instance_1.setTransform(24.5,57.1,1,1,0,0,0,24.5,57.1);
        this.instance_1.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance,this.instance_1];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(15.2,6.6,64.8,104.4), null);


    (lib.ClipGroup_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_2 = new cjs.Shape();
        mask_2._off = true;
        mask_2.graphics.p("ACSIKIhXgDIh8ACQhKAAgygNQgUgFgIgKQgIgJgBgPIAAgaQAAgIgDgLIgGgSQgKgvgIgpQgQhWgTh5IgXiUQgTiHAMhaQAFggAbgrIAwhFQASgZAmgbQA4goAJgHQAPgNAagCIAvgBQAfAAAUAJQAUAIARAVIAcAmQALANApAJQAvALALAGQA9AjAhBNQAbBAAFBWQACAUgBA2QgCAlgLA1IgaB9QgJAmAAAaQAAAOAFAbQAEAaAAAOIABBjQAAAUACAJIAGAYQADASgFAQQgFASgMAKQgPAMgcADQgaADgkAAIgYAAg");
        mask_2.setTransform(47.597,58.7438);

        // Calque_3
        this.instance_2 = new lib.Path_4();
        this.instance_2.setTransform(83.1,62.95,1,1,0,0,0,13.8,43.5);
        this.instance_2.alpha = 0.1016;

        this.instance_3 = new lib.Path_1_1();
        this.instance_3.setTransform(24.5,57.1,1,1,0,0,0,24.5,57.1);
        this.instance_3.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_2,this.instance_3];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_5, new cjs.Rectangle(15.2,6.6,64.8,104.4), null);


    (lib.Explosion_28f = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_686();
        this.instance.setTransform(118.3,133.7,0.5,0.5);

        this.instance_1 = new lib.CachedBmp_603();
        this.instance_1.setTransform(125.2,126.3,0.5,0.5);

        this.instance_2 = new lib.CachedBmp_604();
        this.instance_2.setTransform(131.5,119.55,0.5,0.5);

        this.instance_3 = new lib.CachedBmp_661();
        this.instance_3.setTransform(137.3,113.35,0.5,0.5);

        this.instance_4 = new lib.CachedBmp_606();
        this.instance_4.setTransform(142.5,107.7,0.5,0.5);

        this.instance_5 = new lib.CachedBmp_607();
        this.instance_5.setTransform(147.2,102.7,0.5,0.5);

        this.instance_6 = new lib.CachedBmp_608();
        this.instance_6.setTransform(151.3,98.25,0.5,0.5);

        this.instance_7 = new lib.CachedBmp_609();
        this.instance_7.setTransform(154.9,94.45,0.5,0.5);

        this.instance_8 = new lib.CachedBmp_610();
        this.instance_8.setTransform(157.9,91.2,0.5,0.5);

        this.instance_9 = new lib.CachedBmp_611();
        this.instance_9.setTransform(160.4,88.5,0.5,0.5);

        this.instance_10 = new lib.CachedBmp_612();
        this.instance_10.setTransform(162.3,86.45,0.5,0.5);

        this.instance_11 = new lib.CachedBmp_613();
        this.instance_11.setTransform(163.7,85,0.5,0.5);

        this.instance_12 = new lib.CachedBmp_614();
        this.instance_12.setTransform(164.5,84.1,0.5,0.5);

        this.instance_13 = new lib.CachedBmp_615();
        this.instance_13.setTransform(164.8,83.8,0.5,0.5);

        this.instance_14 = new lib.Explosion_13f();
        this.instance_14.setTransform(169.15,87.9,0.1122,0.1579,45,0,0,75.7,158.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).wait(14));

        // Calque_2
        this.instance_15 = new lib.CachedBmp_616();
        this.instance_15.setTransform(112.25,141.95,0.5,0.5);

        this.instance_16 = new lib.CachedBmp_617();
        this.instance_16.setTransform(117.05,139.25,0.5,0.5);

        this.instance_17 = new lib.CachedBmp_618();
        this.instance_17.setTransform(121.5,136.8,0.5,0.5);

        this.instance_18 = new lib.CachedBmp_619();
        this.instance_18.setTransform(125.55,134.55,0.5,0.5);

        this.instance_19 = new lib.CachedBmp_620();
        this.instance_19.setTransform(129.2,132.5,0.5,0.5);

        this.instance_20 = new lib.CachedBmp_621();
        this.instance_20.setTransform(132.45,130.65,0.5,0.5);

        this.instance_21 = new lib.CachedBmp_622();
        this.instance_21.setTransform(135.35,129.05,0.5,0.5);

        this.instance_22 = new lib.CachedBmp_623();
        this.instance_22.setTransform(137.85,127.65,0.5,0.5);

        this.instance_23 = new lib.CachedBmp_624();
        this.instance_23.setTransform(140,126.5,0.5,0.5);

        this.instance_24 = new lib.CachedBmp_625();
        this.instance_24.setTransform(141.7,125.5,0.5,0.5);

        this.instance_25 = new lib.CachedBmp_626();
        this.instance_25.setTransform(143.05,124.75,0.5,0.5);

        this.instance_26 = new lib.CachedBmp_627();
        this.instance_26.setTransform(144.05,124.25,0.5,0.5);

        this.instance_27 = new lib.CachedBmp_628();
        this.instance_27.setTransform(144.6,123.9,0.5,0.5);

        this.instance_28 = new lib.CachedBmp_629();
        this.instance_28.setTransform(144.8,123.8,0.5,0.5);

        this.instance_29 = new lib.Explosion_13f();
        this.instance_29.setTransform(163.3,147.85,0.3164,0.4454,-90,0,0,75.4,158.4);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15}]}).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).wait(14));

        // Calque_3
        this.instance_30 = new lib.CachedBmp_630();
        this.instance_30.setTransform(127.25,160.35,0.5,0.5);

        this.instance_31 = new lib.CachedBmp_631();
        this.instance_31.setTransform(132.95,163.35,0.5,0.5);

        this.instance_32 = new lib.CachedBmp_632();
        this.instance_32.setTransform(138.2,166.15,0.5,0.5);

        this.instance_33 = new lib.CachedBmp_668();
        this.instance_33.setTransform(143,168.7,0.5,0.5);

        this.instance_34 = new lib.CachedBmp_634();
        this.instance_34.setTransform(147.3,171,0.5,0.5);

        this.instance_35 = new lib.CachedBmp_635();
        this.instance_35.setTransform(151.2,173.05,0.5,0.5);

        this.instance_36 = new lib.CachedBmp_636();
        this.instance_36.setTransform(154.6,174.85,0.5,0.5);

        this.instance_37 = new lib.CachedBmp_637();
        this.instance_37.setTransform(157.6,176.45,0.5,0.5);

        this.instance_38 = new lib.CachedBmp_638();
        this.instance_38.setTransform(160.1,177.75,0.5,0.5);

        this.instance_39 = new lib.CachedBmp_639();
        this.instance_39.setTransform(162.15,178.85,0.5,0.5);

        this.instance_40 = new lib.CachedBmp_640();
        this.instance_40.setTransform(163.75,179.7,0.5,0.5);

        this.instance_41 = new lib.CachedBmp_641();
        this.instance_41.setTransform(164.9,180.3,0.5,0.5);

        this.instance_42 = new lib.CachedBmp_642();
        this.instance_42.setTransform(165.55,180.7,0.5,0.5);

        this.instance_43 = new lib.CachedBmp_643();
        this.instance_43.setTransform(165.8,180.8,0.5,0.5);

        this.instance_44 = new lib.Explosion_13f();
        this.instance_44.setTransform(169.05,190.95,0.2318,0.3263,-45,0,0,75.7,158.7);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_30}]}).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).wait(14));

        // Calque_4
        this.instance_45 = new lib.CachedBmp_644();
        this.instance_45.setTransform(85.5,168.85,0.5,0.5);

        this.instance_46 = new lib.CachedBmp_645();
        this.instance_46.setTransform(80.95,174,0.5,0.5);

        this.instance_47 = new lib.CachedBmp_646();
        this.instance_47.setTransform(76.8,178.75,0.5,0.5);

        this.instance_48 = new lib.CachedBmp_647();
        this.instance_48.setTransform(73,183.1,0.5,0.5);

        this.instance_49 = new lib.CachedBmp_648();
        this.instance_49.setTransform(69.55,187,0.5,0.5);

        this.instance_50 = new lib.CachedBmp_649();
        this.instance_50.setTransform(66.45,190.55,0.5,0.5);

        this.instance_51 = new lib.CachedBmp_650();
        this.instance_51.setTransform(63.75,193.65,0.5,0.5);

        this.instance_52 = new lib.CachedBmp_651();
        this.instance_52.setTransform(61.4,196.3,0.5,0.5);

        this.instance_53 = new lib.CachedBmp_652();
        this.instance_53.setTransform(59.4,198.6,0.5,0.5);

        this.instance_54 = new lib.CachedBmp_653();
        this.instance_54.setTransform(57.75,200.45,0.5,0.5);

        this.instance_55 = new lib.CachedBmp_654();
        this.instance_55.setTransform(56.5,201.9,0.5,0.5);

        this.instance_56 = new lib.CachedBmp_655();
        this.instance_56.setTransform(55.6,202.9,0.5,0.5);

        this.instance_57 = new lib.CachedBmp_656();
        this.instance_57.setTransform(55.05,203.55,0.5,0.5);

        this.instance_58 = new lib.CachedBmp_657();
        this.instance_58.setTransform(54.85,203.75,0.5,0.5);

        this.instance_59 = new lib.Explosion_13f();
        this.instance_59.setTransform(75.95,236.65,0.4636,0.6526,-60.0001,0,0,75.4,158.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_45}]}).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_59}]},1).wait(14));

        // Calque_5
        this.instance_60 = new lib.CachedBmp_658();
        this.instance_60.setTransform(85.5,159.55,0.5,0.5);

        this.instance_61 = new lib.CachedBmp_659();
        this.instance_61.setTransform(75.95,165.2,0.5,0.5);

        this.instance_62 = new lib.CachedBmp_688();
        this.instance_62.setTransform(67.15,170.4,0.5,0.5);

        this.instance_63 = new lib.CachedBmp_661();
        this.instance_63.setTransform(59.1,175.15,0.5,0.5);

        this.instance_64 = new lib.CachedBmp_662();
        this.instance_64.setTransform(51.85,179.45,0.5,0.5);

        this.instance_65 = new lib.CachedBmp_663();
        this.instance_65.setTransform(45.35,183.3,0.5,0.5);

        this.instance_66 = new lib.CachedBmp_664();
        this.instance_66.setTransform(39.6,186.7,0.5,0.5);

        this.instance_67 = new lib.CachedBmp_665();
        this.instance_67.setTransform(34.6,189.65,0.5,0.5);

        this.instance_68 = new lib.CachedBmp_666();
        this.instance_68.setTransform(30.4,192.15,0.5,0.5);

        this.instance_69 = new lib.CachedBmp_667();
        this.instance_69.setTransform(26.95,194.2,0.5,0.5);

        this.instance_70 = new lib.CachedBmp_668();
        this.instance_70.setTransform(24.3,195.75,0.5,0.5);

        this.instance_71 = new lib.CachedBmp_715();
        this.instance_71.setTransform(22.4,196.9,0.5,0.5);

        this.instance_72 = new lib.CachedBmp_670();
        this.instance_72.setTransform(21.25,197.55,0.5,0.5);

        this.instance_73 = new lib.CachedBmp_671();
        this.instance_73.setTransform(20.85,197.8,0.5,0.5);

        this.instance_74 = new lib.Explosion_13f();
        this.instance_74.setTransform(25.9,202.45,0.0695,0.0979,-149.9981,0,0,75.3,159.1);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_60}]}).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_62}]},1).to({state:[{t:this.instance_63}]},1).to({state:[{t:this.instance_64}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_73}]},1).to({state:[{t:this.instance_74}]},1).wait(14));

        // Calque_6
        this.instance_75 = new lib.CachedBmp_672();
        this.instance_75.setTransform(72.85,156.3,0.5,0.5);

        this.instance_76 = new lib.CachedBmp_673();
        this.instance_76.setTransform(66.05,156.8,0.5,0.5);

        this.instance_77 = new lib.CachedBmp_674();
        this.instance_77.setTransform(59.8,157.3,0.5,0.5);

        this.instance_78 = new lib.CachedBmp_675();
        this.instance_78.setTransform(54.05,157.75,0.5,0.5);

        this.instance_79 = new lib.CachedBmp_676();
        this.instance_79.setTransform(48.9,158.1,0.5,0.5);

        this.instance_80 = new lib.CachedBmp_677();
        this.instance_80.setTransform(44.25,158.45,0.5,0.5);

        this.instance_81 = new lib.CachedBmp_678();
        this.instance_81.setTransform(40.2,158.8,0.5,0.5);

        this.instance_82 = new lib.CachedBmp_679();
        this.instance_82.setTransform(36.65,159.05,0.5,0.5);

        this.instance_83 = new lib.CachedBmp_680();
        this.instance_83.setTransform(33.65,159.3,0.5,0.5);

        this.instance_84 = new lib.CachedBmp_681();
        this.instance_84.setTransform(31.2,159.45,0.5,0.5);

        this.instance_85 = new lib.CachedBmp_682();
        this.instance_85.setTransform(29.3,159.6,0.5,0.5);

        this.instance_86 = new lib.CachedBmp_683();
        this.instance_86.setTransform(27.95,159.7,0.5,0.5);

        this.instance_87 = new lib.CachedBmp_684();
        this.instance_87.setTransform(27.1,159.8,0.5,0.5);

        this.instance_88 = new lib.CachedBmp_685();
        this.instance_88.setTransform(26.85,159.8,0.5,0.5);

        this.instance_89 = new lib.Explosion_13f();
        this.instance_89.setTransform(33.25,172.45,0.2318,0.3263,-59.9989,0,0,75.4,158.4);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_75}]}).to({state:[{t:this.instance_76}]},1).to({state:[{t:this.instance_77}]},1).to({state:[{t:this.instance_78}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_80}]},1).to({state:[{t:this.instance_81}]},1).to({state:[{t:this.instance_82}]},1).to({state:[{t:this.instance_83}]},1).to({state:[{t:this.instance_84}]},1).to({state:[{t:this.instance_85}]},1).to({state:[{t:this.instance_86}]},1).to({state:[{t:this.instance_87}]},1).to({state:[{t:this.instance_88}]},1).to({state:[{t:this.instance_89}]},1).wait(14));

        // Calque_7
        this.instance_90 = new lib.CachedBmp_686();
        this.instance_90.setTransform(81.85,133.3,0.5,0.5);

        this.instance_91 = new lib.CachedBmp_687();
        this.instance_91.setTransform(73.1,126,0.5,0.5);

        this.instance_92 = new lib.CachedBmp_688();
        this.instance_92.setTransform(65.1,119.25,0.5,0.5);

        this.instance_93 = new lib.CachedBmp_689();
        this.instance_93.setTransform(57.75,113.1,0.5,0.5);

        this.instance_94 = new lib.CachedBmp_690();
        this.instance_94.setTransform(51.15,107.55,0.5,0.5);

        this.instance_95 = new lib.CachedBmp_691();
        this.instance_95.setTransform(45.2,102.55,0.5,0.5);

        this.instance_96 = new lib.CachedBmp_692();
        this.instance_96.setTransform(39.95,98.15,0.5,0.5);

        this.instance_97 = new lib.CachedBmp_693();
        this.instance_97.setTransform(35.4,94.35,0.5,0.5);

        this.instance_98 = new lib.CachedBmp_694();
        this.instance_98.setTransform(31.6,91.1,0.5,0.5);

        this.instance_99 = new lib.CachedBmp_695();
        this.instance_99.setTransform(28.45,88.5,0.5,0.5);

        this.instance_100 = new lib.CachedBmp_696();
        this.instance_100.setTransform(26,86.45,0.5,0.5);

        this.instance_101 = new lib.CachedBmp_697();
        this.instance_101.setTransform(24.25,84.95,0.5,0.5);

        this.instance_102 = new lib.CachedBmp_698();
        this.instance_102.setTransform(23.2,84.1,0.5,0.5);

        this.instance_103 = new lib.CachedBmp_699();
        this.instance_103.setTransform(22.85,83.8,0.5,0.5);

        this.instance_104 = new lib.Explosion_13f();
        this.instance_104.setTransform(32.85,89.3,0.1623,0.2284,165.001,0,0,75.3,158.3);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_90}]}).to({state:[{t:this.instance_91}]},1).to({state:[{t:this.instance_92}]},1).to({state:[{t:this.instance_93}]},1).to({state:[{t:this.instance_94}]},1).to({state:[{t:this.instance_95}]},1).to({state:[{t:this.instance_96}]},1).to({state:[{t:this.instance_97}]},1).to({state:[{t:this.instance_98}]},1).to({state:[{t:this.instance_99}]},1).to({state:[{t:this.instance_100}]},1).to({state:[{t:this.instance_101}]},1).to({state:[{t:this.instance_102}]},1).to({state:[{t:this.instance_103}]},1).to({state:[{t:this.instance_104}]},1).wait(14));

        // Calque_8
        this.instance_105 = new lib.CachedBmp_700();
        this.instance_105.setTransform(95.5,126.3,0.5,0.5);

        this.instance_106 = new lib.CachedBmp_701();
        this.instance_106.setTransform(93.9,111.75,0.5,0.5);

        this.instance_107 = new lib.CachedBmp_702();
        this.instance_107.setTransform(92.5,98.3,0.5,0.5);

        this.instance_108 = new lib.CachedBmp_703();
        this.instance_108.setTransform(91.15,86.1,0.5,0.5);

        this.instance_109 = new lib.CachedBmp_704();
        this.instance_109.setTransform(89.95,75,0.5,0.5);

        this.instance_110 = new lib.CachedBmp_705();
        this.instance_110.setTransform(88.9,65.1,0.5,0.5);

        this.instance_111 = new lib.CachedBmp_706();
        this.instance_111.setTransform(87.95,56.35,0.5,0.5);

        this.instance_112 = new lib.CachedBmp_707();
        this.instance_112.setTransform(87.1,48.8,0.5,0.5);

        this.instance_113 = new lib.CachedBmp_708();
        this.instance_113.setTransform(86.45,42.35,0.5,0.5);

        this.instance_114 = new lib.CachedBmp_709();
        this.instance_114.setTransform(85.85,37.15,0.5,0.5);

        this.instance_115 = new lib.CachedBmp_710();
        this.instance_115.setTransform(85.4,33.05,0.5,0.5);

        this.instance_116 = new lib.CachedBmp_711();
        this.instance_116.setTransform(85.1,30.15,0.5,0.5);

        this.instance_117 = new lib.CachedBmp_712();
        this.instance_117.setTransform(84.9,28.4,0.5,0.5);

        this.instance_118 = new lib.CachedBmp_713();
        this.instance_118.setTransform(84.85,27.8,0.5,0.5);

        this.instance_119 = new lib.Explosion_13f();
        this.instance_119.setTransform(110.55,50.3,0.3477,0.4894,-134.9987,0,0,75.5,158.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_105}]}).to({state:[{t:this.instance_106}]},1).to({state:[{t:this.instance_107}]},1).to({state:[{t:this.instance_108}]},1).to({state:[{t:this.instance_109}]},1).to({state:[{t:this.instance_110}]},1).to({state:[{t:this.instance_111}]},1).to({state:[{t:this.instance_112}]},1).to({state:[{t:this.instance_113}]},1).to({state:[{t:this.instance_114}]},1).to({state:[{t:this.instance_115}]},1).to({state:[{t:this.instance_116}]},1).to({state:[{t:this.instance_117}]},1).to({state:[{t:this.instance_118}]},1).to({state:[{t:this.instance_119}]},1).wait(14));

        // Calque_9
        this.instance_120 = new lib.CachedBmp_714();
        this.instance_120.setTransform(85.5,118.8,0.5,0.5);

        this.instance_121 = new lib.CachedBmp_715();
        this.instance_121.setTransform(82.45,115.1,0.5,0.5);

        this.instance_122 = new lib.CachedBmp_716();
        this.instance_122.setTransform(79.65,111.7,0.5,0.5);

        this.instance_123 = new lib.CachedBmp_717();
        this.instance_123.setTransform(77.05,108.6,0.5,0.5);

        this.instance_124 = new lib.CachedBmp_718();
        this.instance_124.setTransform(74.75,105.8,0.5,0.5);

        this.instance_125 = new lib.CachedBmp_719();
        this.instance_125.setTransform(72.65,103.25,0.5,0.5);

        this.instance_126 = new lib.CachedBmp_720();
        this.instance_126.setTransform(70.85,101.05,0.5,0.5);

        this.instance_127 = new lib.CachedBmp_721();
        this.instance_127.setTransform(69.25,99.15,0.5,0.5);

        this.instance_128 = new lib.CachedBmp_722();
        this.instance_128.setTransform(67.9,97.5,0.5,0.5);

        this.instance_129 = new lib.CachedBmp_723();
        this.instance_129.setTransform(66.8,96.15,0.5,0.5);

        this.instance_130 = new lib.CachedBmp_724();
        this.instance_130.setTransform(65.95,95.15,0.5,0.5);

        this.instance_131 = new lib.CachedBmp_725();
        this.instance_131.setTransform(65.35,94.4,0.5,0.5);

        this.instance_132 = new lib.CachedBmp_726();
        this.instance_132.setTransform(64.95,93.95,0.5,0.5);

        this.instance_133 = new lib.CachedBmp_727();
        this.instance_133.setTransform(64.85,93.8,0.5,0.5);

        this.instance_134 = new lib.Explosion_13f();
        this.instance_134.setTransform(73.25,105.7,0.1623,0.2284,-59.9992,0,0,75.5,158.6);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_120}]}).to({state:[{t:this.instance_121}]},1).to({state:[{t:this.instance_122}]},1).to({state:[{t:this.instance_123}]},1).to({state:[{t:this.instance_124}]},1).to({state:[{t:this.instance_125}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_127}]},1).to({state:[{t:this.instance_128}]},1).to({state:[{t:this.instance_129}]},1).to({state:[{t:this.instance_130}]},1).to({state:[{t:this.instance_131}]},1).to({state:[{t:this.instance_132}]},1).to({state:[{t:this.instance_133}]},1).to({state:[{t:this.instance_134}]},1).wait(14));

        // Calque_10
        this.instance_135 = new lib.CachedBmp_728();
        this.instance_135.setTransform(77.05,141.65,0.5,0.5);

        this.instance_136 = new lib.CachedBmp_729();
        this.instance_136.setTransform(76,141.3,0.5,0.5);

        this.instance_137 = new lib.CachedBmp_730();
        this.instance_137.setTransform(72.8,140.25,0.5,0.5);

        this.instance_138 = new lib.CachedBmp_731();
        this.instance_138.setTransform(67.45,138.55,0.5,0.5);

        this.instance_139 = new lib.CachedBmp_732();
        this.instance_139.setTransform(60,136.15,0.5,0.5);

        this.instance_140 = new lib.CachedBmp_733();
        this.instance_140.setTransform(50.45,133.05,0.5,0.5);

        this.instance_141 = new lib.CachedBmp_734();
        this.instance_141.setTransform(38.7,129.25,0.5,0.5);

        this.instance_142 = new lib.CachedBmp_735();
        this.instance_142.setTransform(24.85,124.8,0.5,0.5);

        this.instance_143 = new lib.CachedBmp_736();
        this.instance_143.setTransform(8.9,119.65,0.5,0.5);

        this.instance_144 = new lib.CachedBmp_737();
        this.instance_144.setTransform(-9.2,113.8,0.5,0.5);

        this.instance_145 = new lib.CachedBmp_738();
        this.instance_145.setTransform(-11.75,112.95,0.5,0.5);

        this.instance_146 = new lib.CachedBmp_739();
        this.instance_146.setTransform(-14.05,112.2,0.5,0.5);

        this.instance_147 = new lib.CachedBmp_740();
        this.instance_147.setTransform(-16,111.6,0.5,0.5);

        this.instance_148 = new lib.CachedBmp_741();
        this.instance_148.setTransform(-17.65,111.05,0.5,0.5);

        this.instance_149 = new lib.CachedBmp_742();
        this.instance_149.setTransform(-19.05,110.6,0.5,0.5);

        this.instance_150 = new lib.CachedBmp_743();
        this.instance_150.setTransform(-20.1,110.25,0.5,0.5);

        this.instance_151 = new lib.CachedBmp_744();
        this.instance_151.setTransform(-20.85,110,0.5,0.5);

        this.instance_152 = new lib.CachedBmp_745();
        this.instance_152.setTransform(-21.3,109.85,0.5,0.5);

        this.instance_153 = new lib.CachedBmp_746();
        this.instance_153.setTransform(-21.45,109.8,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_135}]}).to({state:[{t:this.instance_136}]},1).to({state:[{t:this.instance_137}]},1).to({state:[{t:this.instance_138}]},1).to({state:[{t:this.instance_139}]},1).to({state:[{t:this.instance_140}]},1).to({state:[{t:this.instance_141}]},1).to({state:[{t:this.instance_142}]},1).to({state:[{t:this.instance_143}]},1).to({state:[{t:this.instance_144}]},1).to({state:[{t:this.instance_145}]},1).to({state:[{t:this.instance_146}]},1).to({state:[{t:this.instance_147}]},1).to({state:[{t:this.instance_148}]},1).to({state:[{t:this.instance_149}]},1).to({state:[{t:this.instance_150}]},1).to({state:[{t:this.instance_151}]},1).to({state:[{t:this.instance_152}]},1).to({state:[{t:this.instance_153}]},1).to({state:[]},1).wait(9));

        // Calque_11
        this.instance_154 = new lib.CachedBmp_747();
        this.instance_154.setTransform(104.75,158.05,0.5,0.5);

        this.instance_155 = new lib.CachedBmp_748();
        this.instance_155.setTransform(104.8,158.2,0.5,0.5);

        this.instance_156 = new lib.CachedBmp_749();
        this.instance_156.setTransform(105,158.55,0.5,0.5);

        this.instance_157 = new lib.CachedBmp_750();
        this.instance_157.setTransform(105.35,159.2,0.5,0.5);

        this.instance_158 = new lib.CachedBmp_751();
        this.instance_158.setTransform(105.8,160.05,0.5,0.5);

        this.instance_159 = new lib.CachedBmp_752();
        this.instance_159.setTransform(106.4,161.2,0.5,0.5);

        this.instance_160 = new lib.CachedBmp_753();
        this.instance_160.setTransform(107.1,162.6,0.5,0.5);

        this.instance_161 = new lib.CachedBmp_754();
        this.instance_161.setTransform(107.95,164.25,0.5,0.5);

        this.instance_162 = new lib.CachedBmp_755();
        this.instance_162.setTransform(108.95,166.15,0.5,0.5);

        this.instance_163 = new lib.CachedBmp_756();
        this.instance_163.setTransform(110.05,168.3,0.5,0.5);

        this.instance_164 = new lib.CachedBmp_757();
        this.instance_164.setTransform(118.45,184.7,0.5,0.5);

        this.instance_165 = new lib.CachedBmp_758();
        this.instance_165.setTransform(125.85,199.2,0.5,0.5);

        this.instance_166 = new lib.CachedBmp_759();
        this.instance_166.setTransform(132.3,211.75,0.5,0.5);

        this.instance_167 = new lib.CachedBmp_760();
        this.instance_167.setTransform(137.75,222.35,0.5,0.5);

        this.instance_168 = new lib.CachedBmp_761();
        this.instance_168.setTransform(142.2,231.05,0.5,0.5);

        this.instance_169 = new lib.CachedBmp_762();
        this.instance_169.setTransform(145.65,237.8,0.5,0.5);

        this.instance_170 = new lib.CachedBmp_763();
        this.instance_170.setTransform(148.1,242.65,0.5,0.5);

        this.instance_171 = new lib.CachedBmp_764();
        this.instance_171.setTransform(149.6,245.55,0.5,0.5);

        this.instance_172 = new lib.CachedBmp_765();
        this.instance_172.setTransform(150.1,246.5,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_154}]}).to({state:[{t:this.instance_155}]},1).to({state:[{t:this.instance_156}]},1).to({state:[{t:this.instance_157}]},1).to({state:[{t:this.instance_158}]},1).to({state:[{t:this.instance_159}]},1).to({state:[{t:this.instance_160}]},1).to({state:[{t:this.instance_161}]},1).to({state:[{t:this.instance_162}]},1).to({state:[{t:this.instance_163}]},1).to({state:[{t:this.instance_164}]},1).to({state:[{t:this.instance_165}]},1).to({state:[{t:this.instance_166}]},1).to({state:[{t:this.instance_167}]},1).to({state:[{t:this.instance_168}]},1).to({state:[{t:this.instance_169}]},1).to({state:[{t:this.instance_170}]},1).to({state:[{t:this.instance_171}]},1).to({state:[{t:this.instance_172}]},1).to({state:[]},1).wait(9));

        // Eclatement
        this.instance_173 = new lib.CachedBmp_766();
        this.instance_173.setTransform(101,142.4,0.5,0.5);

        this.instance_174 = new lib.CachedBmp_767();
        this.instance_174.setTransform(101.1,141.4,0.5,0.5);

        this.instance_175 = new lib.CachedBmp_768();
        this.instance_175.setTransform(101.4,138.5,0.5,0.5);

        this.instance_176 = new lib.CachedBmp_769();
        this.instance_176.setTransform(101.9,133.6,0.5,0.5);

        this.instance_177 = new lib.CachedBmp_770();
        this.instance_177.setTransform(102.65,126.8,0.5,0.5);

        this.instance_178 = new lib.CachedBmp_771();
        this.instance_178.setTransform(103.55,118,0.5,0.5);

        this.instance_179 = new lib.CachedBmp_772();
        this.instance_179.setTransform(104.7,107.25,0.5,0.5);

        this.instance_180 = new lib.CachedBmp_773();
        this.instance_180.setTransform(106,94.55,0.5,0.5);

        this.instance_181 = new lib.CachedBmp_774();
        this.instance_181.setTransform(107.55,79.9,0.5,0.5);

        this.instance_182 = new lib.CachedBmp_775();
        this.instance_182.setTransform(109.3,63.3,0.5,0.5);

        this.instance_183 = new lib.CachedBmp_776();
        this.instance_183.setTransform(119.05,61.8,0.5,0.5);

        this.instance_184 = new lib.CachedBmp_777();
        this.instance_184.setTransform(127.65,60.45,0.5,0.5);

        this.instance_185 = new lib.CachedBmp_778();
        this.instance_185.setTransform(135.1,59.25,0.5,0.5);

        this.instance_186 = new lib.CachedBmp_779();
        this.instance_186.setTransform(141.4,58.3,0.5,0.5);

        this.instance_187 = new lib.CachedBmp_780();
        this.instance_187.setTransform(146.55,57.5,0.5,0.5);

        this.instance_188 = new lib.CachedBmp_781();
        this.instance_188.setTransform(150.6,56.85,0.5,0.5);

        this.instance_189 = new lib.CachedBmp_782();
        this.instance_189.setTransform(153.45,56.4,0.5,0.5);

        this.instance_190 = new lib.CachedBmp_783();
        this.instance_190.setTransform(155.2,56.15,0.5,0.5);

        this.instance_191 = new lib.CachedBmp_784();
        this.instance_191.setTransform(155.75,56.05,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_173}]}).to({state:[{t:this.instance_174}]},1).to({state:[{t:this.instance_175}]},1).to({state:[{t:this.instance_176}]},1).to({state:[{t:this.instance_177}]},1).to({state:[{t:this.instance_178}]},1).to({state:[{t:this.instance_179}]},1).to({state:[{t:this.instance_180}]},1).to({state:[{t:this.instance_181}]},1).to({state:[{t:this.instance_182}]},1).to({state:[{t:this.instance_183}]},1).to({state:[{t:this.instance_184}]},1).to({state:[{t:this.instance_185}]},1).to({state:[{t:this.instance_186}]},1).to({state:[{t:this.instance_187}]},1).to({state:[{t:this.instance_188}]},1).to({state:[{t:this.instance_189}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_191}]},1).to({state:[]},1).wait(9));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.4,27.8,201.20000000000002,235.7);


    (lib.Epaule = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // flash0_ai
        this.instance = new lib.CachedBmp_562();
        this.instance.setTransform(0,0,0.1263,0.1263);

        this.instance_1 = new lib.Path_3();
        this.instance_1.setTransform(14.7,22.6,1,1,0,0,0,16.9,22.2);
        this.instance_1.alpha = 0.1016;

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Epaule, new cjs.Rectangle(-2.2,0,44.5,44.7), null);


    (lib.Bulle_symfony_animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Eclatement
        this.instance = new lib.Explosion_28f();
        this.instance.setTransform(138.2,-118.65,1,1,0,0,0,84.8,140.6);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(28));

        // Calque_2
        this.instance_1 = new lib.Bulle_symfony();
        this.instance_1.setTransform(110.05,167.85,0.4431,0.4431,0,0,0,92.9,92.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:93.3,regY:93.3,scaleX:0.6821,scaleY:0.518,x:125.05,y:147.95},0).wait(1).to({scaleX:0.7228,scaleY:0.5929,x:134.15,y:130.5},0).wait(1).to({scaleX:0.7389,scaleY:0.6679,x:138.3,y:115.5},0).wait(1).to({scaleX:0.7423,scaleY:0.7428,y:102.45},0).wait(1).to({scaleX:0.7422,x:134.8,y:90.9},0).wait(1).to({scaleX:0.7421,x:128.65,y:80.55},0).wait(1).to({scaleX:0.742,x:120.45,y:70.95},0).wait(1).to({scaleX:0.7419,x:111,y:61.8},0).wait(1).to({scaleX:0.7417,x:101,y:52.6},0).wait(1).to({scaleX:0.7416,x:91.25,y:43.05},0).wait(1).to({scaleX:0.7415,x:82.35,y:32.7},0).wait(1).to({scaleX:0.7414,x:75.1,y:21.2},0).wait(1).to({scaleX:0.7413,x:70.3,y:8.15},0).wait(1).to({scaleX:0.7412,x:68.6,y:-6.85},0).wait(1).to({scaleX:0.741,x:70.15,y:-23.25},0).wait(1).to({scaleX:0.7409,x:74.45,y:-37.1},0).wait(1).to({scaleX:0.7408,x:81,y:-48.7},0).wait(1).to({scaleX:0.7407,x:89.35,y:-58.3},0).wait(1).to({scaleX:0.7406,x:98.9,y:-66.15},0).wait(1).to({scaleX:0.7405,x:109.15,y:-72.6},0).wait(1).to({scaleX:0.7403,x:119.6,y:-77.85},0).wait(1).to({scaleX:0.7402,x:129.7,y:-82.2},0).wait(1).to({scaleX:0.7401,x:139,y:-85.95},0).wait(1).to({scaleX:0.74,x:147,y:-89.35},0).wait(1).to({scaleX:0.8261,scaleY:0.8257,x:153.05,y:-92.6},0).wait(1).to({scaleX:0.9105,scaleY:0.9087,x:156.8,y:-96.05},0).wait(1).to({scaleX:0.9918,scaleY:0.9916,x:157.65,y:-100},0).wait(1).to({scaleX:1.07,scaleY:1.0746,x:154.5,y:-104.65},0).to({_off:true},1).wait(28));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-3.5,-209.1,262,420.2);


    (lib.Bulle_swift_animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Eclatement
        this.instance = new lib.Explosion_28f();
        this.instance.setTransform(138.2,-118.65,1,1,0,0,0,84.8,140.6);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(28));

        // Calque_2
        this.instance_1 = new lib.Bulle_swift();
        this.instance_1.setTransform(110.05,167.85,0.4431,0.4431,0,0,0,92.9,92.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:93.3,regY:93.3,scaleX:0.6821,scaleY:0.518,x:125.05,y:147.95},0).wait(1).to({scaleX:0.7228,scaleY:0.5929,x:134.15,y:130.5},0).wait(1).to({scaleX:0.7389,scaleY:0.6679,x:138.3,y:115.5},0).wait(1).to({scaleX:0.7423,scaleY:0.7428,y:102.45},0).wait(1).to({scaleX:0.7422,x:134.8,y:90.9},0).wait(1).to({scaleX:0.7421,x:128.65,y:80.55},0).wait(1).to({scaleX:0.742,x:120.45,y:70.95},0).wait(1).to({scaleX:0.7419,x:111,y:61.8},0).wait(1).to({scaleX:0.7417,x:101,y:52.6},0).wait(1).to({scaleX:0.7416,x:91.25,y:43.05},0).wait(1).to({scaleX:0.7415,x:82.35,y:32.7},0).wait(1).to({scaleX:0.7414,x:75.1,y:21.2},0).wait(1).to({scaleX:0.7413,x:70.3,y:8.15},0).wait(1).to({scaleX:0.7412,x:68.6,y:-6.85},0).wait(1).to({scaleX:0.741,x:70.15,y:-23.25},0).wait(1).to({scaleX:0.7409,x:74.45,y:-37.1},0).wait(1).to({scaleX:0.7408,x:81,y:-48.7},0).wait(1).to({scaleX:0.7407,x:89.35,y:-58.3},0).wait(1).to({scaleX:0.7406,x:98.9,y:-66.15},0).wait(1).to({scaleX:0.7405,x:109.15,y:-72.6},0).wait(1).to({scaleX:0.7403,x:119.6,y:-77.85},0).wait(1).to({scaleX:0.7402,x:129.7,y:-82.2},0).wait(1).to({scaleX:0.7401,x:139,y:-85.95},0).wait(1).to({scaleX:0.74,x:147,y:-89.35},0).wait(1).to({scaleX:0.8261,scaleY:0.8257,x:153.05,y:-92.6},0).wait(1).to({scaleX:0.9105,scaleY:0.9087,x:156.8,y:-96.05},0).wait(1).to({scaleX:0.9918,scaleY:0.9916,x:157.65,y:-100},0).wait(1).to({scaleX:1.07,scaleY:1.0746,x:154.5,y:-104.65},0).to({_off:true},1).wait(28));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-3.5,-209.1,262,420.2);


    (lib.Bulle_php_animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Eclatement
        this.instance = new lib.Explosion_28f();
        this.instance.setTransform(138.2,-118.65,1,1,0,0,0,84.8,140.6);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(28));

        // Calque_2
        this.instance_1 = new lib.Bulle_php();
        this.instance_1.setTransform(110.05,167.85,0.4431,0.4431,0,0,0,92.9,92.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:93.3,regY:93.3,scaleX:0.6821,scaleY:0.518,x:125.05,y:147.95},0).wait(1).to({scaleX:0.7228,scaleY:0.5929,x:134.15,y:130.5},0).wait(1).to({scaleX:0.7389,scaleY:0.6679,x:138.3,y:115.5},0).wait(1).to({scaleX:0.7423,scaleY:0.7428,y:102.45},0).wait(1).to({scaleX:0.7422,x:134.8,y:90.9},0).wait(1).to({scaleX:0.7421,x:128.65,y:80.55},0).wait(1).to({scaleX:0.742,x:120.45,y:70.95},0).wait(1).to({scaleX:0.7419,x:111,y:61.8},0).wait(1).to({scaleX:0.7417,x:101,y:52.6},0).wait(1).to({scaleX:0.7416,x:91.25,y:43.05},0).wait(1).to({scaleX:0.7415,x:82.35,y:32.7},0).wait(1).to({scaleX:0.7414,x:75.1,y:21.2},0).wait(1).to({scaleX:0.7413,x:70.3,y:8.15},0).wait(1).to({scaleX:0.7412,x:68.6,y:-6.85},0).wait(1).to({scaleX:0.741,x:70.15,y:-23.25},0).wait(1).to({scaleX:0.7409,x:74.45,y:-37.1},0).wait(1).to({scaleX:0.7408,x:81,y:-48.7},0).wait(1).to({scaleX:0.7407,x:89.35,y:-58.3},0).wait(1).to({scaleX:0.7406,x:98.9,y:-66.15},0).wait(1).to({scaleX:0.7405,x:109.15,y:-72.6},0).wait(1).to({scaleX:0.7403,x:119.6,y:-77.85},0).wait(1).to({scaleX:0.7402,x:129.7,y:-82.2},0).wait(1).to({scaleX:0.7401,x:139,y:-85.95},0).wait(1).to({scaleX:0.74,x:147,y:-89.35},0).wait(1).to({scaleX:0.8261,scaleY:0.8257,x:153.05,y:-92.6},0).wait(1).to({scaleX:0.9105,scaleY:0.9087,x:156.8,y:-96.05},0).wait(1).to({scaleX:0.9918,scaleY:0.9916,x:157.65,y:-100},0).wait(1).to({scaleX:1.07,scaleY:1.0746,x:154.5,y:-104.65},0).to({_off:true},1).wait(28));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-3.5,-209.1,262,420.2);


    (lib.Bulle_mysql_animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Eclatement
        this.instance = new lib.Explosion_28f();
        this.instance.setTransform(138.2,-118.65,1,1,0,0,0,84.8,140.6);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(28));

        // Calque_2
        this.instance_1 = new lib.Bulle_mysql();
        this.instance_1.setTransform(110.05,167.85,0.4431,0.4431,0,0,0,92.9,92.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:93.3,regY:93.3,scaleX:0.6821,scaleY:0.518,x:125.05,y:147.95},0).wait(1).to({scaleX:0.7228,scaleY:0.5929,x:134.15,y:130.5},0).wait(1).to({scaleX:0.7389,scaleY:0.6679,x:138.3,y:115.5},0).wait(1).to({scaleX:0.7423,scaleY:0.7428,y:102.45},0).wait(1).to({scaleX:0.7422,x:134.8,y:90.9},0).wait(1).to({scaleX:0.7421,x:128.65,y:80.55},0).wait(1).to({scaleX:0.742,x:120.45,y:70.95},0).wait(1).to({scaleX:0.7419,x:111,y:61.8},0).wait(1).to({scaleX:0.7417,x:101,y:52.6},0).wait(1).to({scaleX:0.7416,x:91.25,y:43.05},0).wait(1).to({scaleX:0.7415,x:82.35,y:32.7},0).wait(1).to({scaleX:0.7414,x:75.1,y:21.2},0).wait(1).to({scaleX:0.7413,x:70.3,y:8.15},0).wait(1).to({scaleX:0.7412,x:68.6,y:-6.85},0).wait(1).to({scaleX:0.741,x:70.15,y:-23.25},0).wait(1).to({scaleX:0.7409,x:74.45,y:-37.1},0).wait(1).to({scaleX:0.7408,x:81,y:-48.7},0).wait(1).to({scaleX:0.7407,x:89.35,y:-58.3},0).wait(1).to({scaleX:0.7406,x:98.9,y:-66.15},0).wait(1).to({scaleX:0.7405,x:109.15,y:-72.6},0).wait(1).to({scaleX:0.7403,x:119.6,y:-77.85},0).wait(1).to({scaleX:0.7402,x:129.7,y:-82.2},0).wait(1).to({scaleX:0.7401,x:139,y:-85.95},0).wait(1).to({scaleX:0.74,x:147,y:-89.35},0).wait(1).to({scaleX:0.8261,scaleY:0.8257,x:153.05,y:-92.6},0).wait(1).to({scaleX:0.9105,scaleY:0.9087,x:156.8,y:-96.05},0).wait(1).to({scaleX:0.9918,scaleY:0.9916,x:157.65,y:-100},0).wait(1).to({scaleX:1.07,scaleY:1.0746,x:154.5,y:-104.65},0).to({_off:true},1).wait(28));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-3.5,-209.1,262,420.2);


    (lib.Bulle_java_animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Eclatement
        this.instance = new lib.Explosion_28f();
        this.instance.setTransform(138.2,-118.65,1,1,0,0,0,84.8,140.6);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(28));

        // Calque_2
        this.instance_1 = new lib.Bulle_java();
        this.instance_1.setTransform(110.05,167.85,0.4431,0.4431,0,0,0,92.9,92.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:93.3,regY:93.3,scaleX:0.6821,scaleY:0.518,x:125.05,y:147.95},0).wait(1).to({scaleX:0.7228,scaleY:0.5929,x:134.15,y:130.5},0).wait(1).to({scaleX:0.7389,scaleY:0.6679,x:138.3,y:115.5},0).wait(1).to({scaleX:0.7423,scaleY:0.7428,y:102.45},0).wait(1).to({scaleX:0.7422,x:134.8,y:90.9},0).wait(1).to({scaleX:0.7421,x:128.65,y:80.55},0).wait(1).to({scaleX:0.742,x:120.45,y:70.95},0).wait(1).to({scaleX:0.7419,x:111,y:61.8},0).wait(1).to({scaleX:0.7417,x:101,y:52.6},0).wait(1).to({scaleX:0.7416,x:91.25,y:43.05},0).wait(1).to({scaleX:0.7415,x:82.35,y:32.7},0).wait(1).to({scaleX:0.7414,x:75.1,y:21.2},0).wait(1).to({scaleX:0.7413,x:70.3,y:8.15},0).wait(1).to({scaleX:0.7412,x:68.6,y:-6.85},0).wait(1).to({scaleX:0.741,x:70.15,y:-23.25},0).wait(1).to({scaleX:0.7409,x:74.45,y:-37.1},0).wait(1).to({scaleX:0.7408,x:81,y:-48.7},0).wait(1).to({scaleX:0.7407,x:89.35,y:-58.3},0).wait(1).to({scaleX:0.7406,x:98.9,y:-66.15},0).wait(1).to({scaleX:0.7405,x:109.15,y:-72.6},0).wait(1).to({scaleX:0.7403,x:119.6,y:-77.85},0).wait(1).to({scaleX:0.7402,x:129.7,y:-82.2},0).wait(1).to({scaleX:0.7401,x:139,y:-85.95},0).wait(1).to({scaleX:0.74,x:147,y:-89.35},0).wait(1).to({scaleX:0.8261,scaleY:0.8257,x:153.05,y:-92.6},0).wait(1).to({scaleX:0.9105,scaleY:0.9087,x:156.8,y:-96.05},0).wait(1).to({scaleX:0.9918,scaleY:0.9916,x:157.65,y:-100},0).wait(1).to({scaleX:1.07,scaleY:1.0746,x:154.5,y:-104.65},0).to({_off:true},1).wait(28));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-3.5,-209.1,262,420.2);


    (lib.Bulle_flutter_animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Eclatement
        this.instance = new lib.Explosion_28f();
        this.instance.setTransform(138.2,-118.65,1,1,0,0,0,84.8,140.6);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(28));

        // Calque_2
        this.instance_1 = new lib.Bulle_flutter();
        this.instance_1.setTransform(110.05,167.85,0.4431,0.4431,0,0,0,92.9,92.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:93.3,regY:93.3,scaleX:0.6821,scaleY:0.518,x:125.05,y:147.95},0).wait(1).to({scaleX:0.7228,scaleY:0.5929,x:134.15,y:130.5},0).wait(1).to({scaleX:0.7389,scaleY:0.6679,x:138.3,y:115.5},0).wait(1).to({scaleX:0.7423,scaleY:0.7428,y:102.45},0).wait(1).to({scaleX:0.7422,x:134.8,y:90.9},0).wait(1).to({scaleX:0.7421,x:128.65,y:80.55},0).wait(1).to({scaleX:0.742,x:120.45,y:70.95},0).wait(1).to({scaleX:0.7419,x:111,y:61.8},0).wait(1).to({scaleX:0.7417,x:101,y:52.6},0).wait(1).to({scaleX:0.7416,x:91.25,y:43.05},0).wait(1).to({scaleX:0.7415,x:82.35,y:32.7},0).wait(1).to({scaleX:0.7414,x:75.1,y:21.2},0).wait(1).to({scaleX:0.7413,x:70.3,y:8.15},0).wait(1).to({scaleX:0.7412,x:68.6,y:-6.85},0).wait(1).to({scaleX:0.741,x:70.15,y:-23.25},0).wait(1).to({scaleX:0.7409,x:74.45,y:-37.1},0).wait(1).to({scaleX:0.7408,x:81,y:-48.7},0).wait(1).to({scaleX:0.7407,x:89.35,y:-58.3},0).wait(1).to({scaleX:0.7406,x:98.9,y:-66.15},0).wait(1).to({scaleX:0.7405,x:109.15,y:-72.6},0).wait(1).to({scaleX:0.7403,x:119.6,y:-77.85},0).wait(1).to({scaleX:0.7402,x:129.7,y:-82.2},0).wait(1).to({scaleX:0.7401,x:139,y:-85.95},0).wait(1).to({scaleX:0.74,x:147,y:-89.35},0).wait(1).to({scaleX:0.8261,scaleY:0.8257,x:153.05,y:-92.6},0).wait(1).to({scaleX:0.9105,scaleY:0.9087,x:156.8,y:-96.05},0).wait(1).to({scaleX:0.9918,scaleY:0.9916,x:157.65,y:-100},0).wait(1).to({scaleX:1.07,scaleY:1.0746,x:154.5,y:-104.65},0).to({_off:true},1).wait(28));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-3.5,-209.1,262,420.2);


    (lib.Bulle_dotnet_animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Eclatement
        this.instance = new lib.Explosion_28f();
        this.instance.setTransform(138.2,-118.65,1,1,0,0,0,84.8,140.6);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(28));

        // Calque_2
        this.instance_1 = new lib.Bulle_dotnet();
        this.instance_1.setTransform(110.05,167.85,0.4431,0.4431,0,0,0,92.9,92.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:93.3,regY:93.3,scaleX:0.6821,scaleY:0.518,x:125.05,y:147.95},0).wait(1).to({scaleX:0.7228,scaleY:0.5929,x:134.15,y:130.5},0).wait(1).to({scaleX:0.7389,scaleY:0.6679,x:138.3,y:115.5},0).wait(1).to({scaleX:0.7423,scaleY:0.7428,y:102.45},0).wait(1).to({scaleX:0.7422,x:134.8,y:90.9},0).wait(1).to({scaleX:0.7421,x:128.65,y:80.55},0).wait(1).to({scaleX:0.742,x:120.45,y:70.95},0).wait(1).to({scaleX:0.7419,x:111,y:61.8},0).wait(1).to({scaleX:0.7417,x:101,y:52.6},0).wait(1).to({scaleX:0.7416,x:91.25,y:43.05},0).wait(1).to({scaleX:0.7415,x:82.35,y:32.7},0).wait(1).to({scaleX:0.7414,x:75.1,y:21.2},0).wait(1).to({scaleX:0.7413,x:70.3,y:8.15},0).wait(1).to({scaleX:0.7412,x:68.6,y:-6.85},0).wait(1).to({scaleX:0.741,x:70.15,y:-23.25},0).wait(1).to({scaleX:0.7409,x:74.45,y:-37.1},0).wait(1).to({scaleX:0.7408,x:81,y:-48.7},0).wait(1).to({scaleX:0.7407,x:89.35,y:-58.3},0).wait(1).to({scaleX:0.7406,x:98.9,y:-66.15},0).wait(1).to({scaleX:0.7405,x:109.15,y:-72.6},0).wait(1).to({scaleX:0.7403,x:119.6,y:-77.85},0).wait(1).to({scaleX:0.7402,x:129.7,y:-82.2},0).wait(1).to({scaleX:0.7401,x:139,y:-85.95},0).wait(1).to({scaleX:0.74,x:147,y:-89.35},0).wait(1).to({scaleX:0.8261,scaleY:0.8257,x:153.05,y:-92.6},0).wait(1).to({scaleX:0.9105,scaleY:0.9087,x:156.8,y:-96.05},0).wait(1).to({scaleX:0.9918,scaleY:0.9916,x:157.65,y:-100},0).wait(1).to({scaleX:1.07,scaleY:1.0746,x:154.5,y:-104.65},0).to({_off:true},1).wait(28));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-3.5,-209.1,262,420.2);


    (lib.Torse = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_35
        this.instance = new lib.ClipGroup_4();
        this.instance.setTransform(33.25,50.8,0.9999,0.9999,0,0,0,48.4,57.3);

        this.instance_1 = new lib.CachedBmp_1205();
        this.instance_1.setTransform(1.15,48.35,0.1313,0.1313);

        this.instance_2 = new lib.CachedBmp_1207();
        this.instance_2.setTransform(0,25.35,0.1313,0.1313);

        this.instance_3 = new lib.CachedBmp_1206();
        this.instance_3.setTransform(0.5,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

        // flash0_ai
        this.instance_4 = new lib.ClipGroup_5();
        this.instance_4.setTransform(33.25,50.6,0.9999,0.9999,0,0,0,48.4,57.1);

        this.instance_5 = new lib.CachedBmp_1208();
        this.instance_5.setTransform(1.15,48.35,0.1313,0.1313);

        this.instance_6 = new lib.CachedBmp_1207();
        this.instance_6.setTransform(0,25.35,0.1313,0.1313);

        this.instance_7 = new lib.CachedBmp_1206();
        this.instance_7.setTransform(0.5,0,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Torse, new cjs.Rectangle(-15.1,-6.5,96.8,114.5), null);


    (lib.Animation = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Epaule
        this.instance = new lib.Epaule();
        this.instance.setTransform(-425.75,-238.45,1,1,0,0,0,21.2,22.4);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:21,rotation:8.1186,x:-430.45,y:-241.95},7).to({regX:21.2,rotation:0,x:-428.65,y:-242.15},7).to({regX:21.1,rotation:-2.5914,x:-428.1,y:-242.25},2).to({regY:22.3,rotation:-20.7316,x:-424.1,y:-243.35},10).to({regX:21,rotation:-26.0978,x:-423.4,y:-244.5},5).to({regX:20.9,regY:21.9,scaleX:1.0238,scaleY:1.0238,rotation:-31.4848,x:-425.05,y:-245.9},2).to({regY:22,scaleX:1.0398,scaleY:1.0398,rotation:-35.0735,x:-425.9,y:-246.75},3).wait(20).to({regY:21.9,scaleX:1.0238,scaleY:1.0238,rotation:-31.4848,x:-425.05,y:-245.9},3).to({regX:21,regY:22.3,scaleX:1,scaleY:1,rotation:-26.0978,x:-423.4,y:-244.5},2).to({regX:21.1,rotation:-20.7316,x:-424.1,y:-243.35},5).to({rotation:-2.5914,x:-428.1,y:-242.3},10).to({regX:21.2,regY:22.4,rotation:0,x:-428.65,y:-242.15},2).to({regX:21,rotation:8.1186,x:-430.45,y:-241.95},7).to({regX:21.2,rotation:0,x:-425.75,y:-238.45},7).wait(169));

        // Main_mouement
        this.instance_1 = new lib.Main();
        this.instance_1.setTransform(-334.4,-211,1,1,0,0,0,14.8,10.2);
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(14).to({_off:false},0).to({regX:14.7,regY:10.1,rotation:-6.3596,x:-336.7,y:-218.2},2).to({regX:14.8,regY:10.2,scaleX:0.9999,scaleY:0.9999,rotation:-26.6616,x:-342.05,y:-237.7},4).to({regX:14.9,regY:10.1,rotation:-39.7325,x:-345.25,y:-251.35},3).to({regX:14.8,regY:10.3,scaleX:1,scaleY:1,rotation:-60.7365,x:-352.7,y:-263.05},3).to({regX:14.9,regY:10.2,scaleX:0.9999,scaleY:0.9999,rotation:-72.4432,x:-361.1,y:-269.15},2).to({regX:14.8,scaleX:1,scaleY:1,rotation:-90,x:-375.35,y:-277.05},3).to({rotation:-96.6209,x:-385.7,y:-279.8},2).to({regY:10.3,rotation:-106.5557,x:-401.1,y:-283.3},3).wait(20).to({regY:10.2,rotation:-96.6209,x:-385.7,y:-279.8},3).to({rotation:-90,x:-375.35,y:-277.05},2).to({regX:14.9,scaleX:0.9999,scaleY:0.9999,rotation:-72.4432,x:-361.1,y:-269.15},3).to({regX:14.8,regY:10.3,scaleX:1,scaleY:1,rotation:-60.7365,x:-352.7,y:-263.05},2).to({scaleX:0.9999,scaleY:0.9999,rotation:-55.4859,x:-349.7,y:-262.1},1).to({regX:14.9,regY:10.1,rotation:-39.7325,x:-345.25,y:-251.35},2).to({regX:14.8,regY:10.2,rotation:-26.6616,x:-342.05,y:-237.7},3).to({regX:14.7,regY:10.1,scaleX:1,scaleY:1,rotation:-6.3596,x:-336.7,y:-218.2},4).to({regX:14.8,regY:10.2,rotation:0,x:-334.4,y:-211},2).to({_off:true},1).wait(182));

        // Main_forme
        this.instance_2 = new lib.CachedBmp_223();
        this.instance_2.setTransform(-378.7,-220.5,0.1313,0.1313);

        this.instance_3 = new lib.CachedBmp_54();
        this.instance_3.setTransform(-374.55,-221.35,0.1313,0.1313);

        this.instance_4 = new lib.CachedBmp_53();
        this.instance_4.setTransform(-370.35,-223,0.1313,0.1313);

        this.instance_5 = new lib.CachedBmp_52();
        this.instance_5.setTransform(-366.2,-224.65,0.1313,0.1313);

        this.instance_6 = new lib.CachedBmp_51();
        this.instance_6.setTransform(-364.4,-224.45,0.1313,0.1313);

        this.instance_7 = new lib.CachedBmp_31();
        this.instance_7.setTransform(-362.6,-224.25,0.1313,0.1313);

        this.instance_8 = new lib.CachedBmp_32();
        this.instance_8.setTransform(-360.85,-224.3,0.1313,0.1313);

        this.instance_9 = new lib.CachedBmp_48();
        this.instance_9.setTransform(-359.05,-224.9,0.1313,0.1313);

        this.instance_10 = new lib.CachedBmp_46();
        this.instance_10.setTransform(-356.2,-223.85,0.1313,0.1313);

        this.instance_11 = new lib.CachedBmp_44();
        this.instance_11.setTransform(-353.4,-222.75,0.1313,0.1313);

        this.instance_12 = new lib.CachedBmp_42();
        this.instance_12.setTransform(-350.55,-221.7,0.1313,0.1313);

        this.instance_13 = new lib.CachedBmp_796();
        this.instance_13.setTransform(-349.15,-221.15,0.1313,0.1313);

        this.instance_14 = new lib.CachedBmp_49();
        this.instance_14.setTransform(-360.85,-224.3,0.1313,0.1313);

        this.instance_15 = new lib.CachedBmp_50();
        this.instance_15.setTransform(-362.6,-224.25,0.1313,0.1313);

        this.instance_16 = new lib.CachedBmp_222();
        this.instance_16.setTransform(-378.7,-220.5,0.1313,0.1313);
        this.instance_16._off = true;

        this.instance_17 = new lib.CachedBmp_221();
        this.instance_17.setTransform(-378.7,-220.55,0.1313,0.1313);
        this.instance_17._off = true;

        this.instance_18 = new lib.CachedBmp_220();
        this.instance_18.setTransform(-378.7,-220.55,0.1313,0.1313);
        this.instance_18._off = true;

        this.instance_19 = new lib.CachedBmp_219();
        this.instance_19.setTransform(-378.7,-220.55,0.1313,0.1313);
        this.instance_19._off = true;

        this.instance_20 = new lib.CachedBmp_218();
        this.instance_20.setTransform(-378.7,-220.5,0.1313,0.1313);
        this.instance_20._off = true;

        this.instance_21 = new lib.CachedBmp_217();
        this.instance_21.setTransform(-378.7,-220.55,0.1313,0.1313);
        this.instance_21._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9,p:{x:-359.05,y:-224.9}}]},1).to({state:[{t:this.instance_9,p:{x:-357.65,y:-224.35}}]},1).to({state:[{t:this.instance_10,p:{x:-356.2,y:-223.85}}]},1).to({state:[{t:this.instance_10,p:{x:-354.8,y:-223.3}}]},1).to({state:[{t:this.instance_11,p:{x:-353.4,y:-222.75}}]},1).to({state:[{t:this.instance_11,p:{x:-352,y:-222.2}}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[]},1).to({state:[{t:this.instance_13}]},63).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_11,p:{x:-352,y:-222.2}}]},1).to({state:[{t:this.instance_11,p:{x:-353.4,y:-222.75}}]},1).to({state:[{t:this.instance_10,p:{x:-354.8,y:-223.3}}]},1).to({state:[{t:this.instance_10,p:{x:-356.2,y:-223.85}}]},1).to({state:[{t:this.instance_9,p:{x:-357.65,y:-224.35}}]},1).to({state:[{t:this.instance_9,p:{x:-359.05,y:-224.9}}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_2}]},1).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},1).wait(91).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(93).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(94).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(2));
        this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(95).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(3));
        this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(96).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(13).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(13).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(13).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(13).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4));
        this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(97).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(5));
        this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(98).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(17).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(17).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(17).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(17).to({_off:false},0).to({_off:true},1).wait(6));

        // AvantBras_louvement
        this.instance_22 = new lib.Avantbras();
        this.instance_22.setTransform(-373.8,-207.95,1,1,0,0,0,30.6,14.5);
        this.instance_22._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(14).to({_off:false},0).to({regY:14.4,rotation:-7.1958,x:-372.95,y:-211.45},2).to({regY:14.7,rotation:-57.5683,x:-367.1,y:-235.35},10).to({rotation:-87.5678,x:-374.2,y:-244.15},5).to({scaleX:0.9999,scaleY:0.9999,rotation:-110.542,x:-386.5,y:-248.85},5).wait(20).to({scaleX:1,scaleY:1,rotation:-87.5678,x:-374.2,y:-244.15},5).to({rotation:-57.5683,x:-367.1,y:-235.35},5).to({regY:14.4,rotation:-7.1958,x:-372.95,y:-211.45},10).to({regY:14.5,rotation:0,x:-373.8,y:-207.95},2).to({_off:true},1).wait(182));

        // AvantBras_forme
        this.instance_23 = new lib.CachedBmp_253();
        this.instance_23.setTransform(-396.55,-218.6,0.1313,0.1313);

        this.instance_24 = new lib.CachedBmp_252();
        this.instance_24.setTransform(-398,-218.8,0.1313,0.1313);

        this.instance_25 = new lib.CachedBmp_251();
        this.instance_25.setTransform(-399.45,-219.5,0.1313,0.1313);

        this.instance_26 = new lib.CachedBmp_250();
        this.instance_26.setTransform(-400.95,-220.25,0.1313,0.1313);

        this.instance_27 = new lib.CachedBmp_249();
        this.instance_27.setTransform(-402.4,-221.1,0.1313,0.1313);

        this.instance_28 = new lib.CachedBmp_248();
        this.instance_28.setTransform(-403.9,-221.9,0.1313,0.1313);

        this.instance_29 = new lib.CachedBmp_247();
        this.instance_29.setTransform(-405.35,-222.75,0.1313,0.1313);

        this.instance_30 = new lib.CachedBmp_246();
        this.instance_30.setTransform(-406.85,-223.55,0.1313,0.1313);

        this.instance_31 = new lib.CachedBmp_245();
        this.instance_31.setTransform(-406.5,-222.6,0.1313,0.1313);

        this.instance_32 = new lib.CachedBmp_244();
        this.instance_32.setTransform(-406.1,-221.7,0.1313,0.1313);

        this.instance_33 = new lib.CachedBmp_243();
        this.instance_33.setTransform(-405.75,-220.85,0.1313,0.1313);

        this.instance_34 = new lib.CachedBmp_242();
        this.instance_34.setTransform(-405.35,-221.2,0.1313,0.1313);

        this.instance_35 = new lib.CachedBmp_241();
        this.instance_35.setTransform(-405.05,-221.6,0.1313,0.1313);

        this.instance_36 = new lib.CachedBmp_240();
        this.instance_36.setTransform(-404.7,-222,0.1313,0.1313);

        this.instance_37 = new lib.CachedBmp_549();
        this.instance_37.setTransform(-404.35,-222.4,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_23}]}).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[]},1).to({state:[{t:this.instance_37}]},63).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_23}]},1).wait(169));

        // Masque1 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        var mask_graphics_14 = new cjs.Graphics().p("A8kriQg3gLg4gmQgpgbg2g0QhJhFgigxQgPgXgGghQgEgXAAgmQAAgRADgKQAEgMANgRQANgQAOgLQAWgQAdgEQAbgEAcAHQAdAIAfAWQASAMAiAdIAtAjQAaAUARAQIAZAXQAPANANAGQAJAFAUAHQATAGAKAFQAaANAYAjQAUAdAJAhQAJAigEAiQgCAXgKAQQgaAsg/AGIgQAAQglAAg4gLg");
        var mask_graphics_15 = new cjs.Graphics().p("A8ermQg3gKg5gmQgogag3g0QhJhEgjgxQgQgXgFghQgFgXAAgmQAAgRADgKQADgMAOgRQAMgQAOgLQAWgRAdgEQAbgEAcAHQAdAHAfAWQASAMAjAdIAtAiQAaAUARAQIAaAXQAOAMANAHQAJAEAVAHQATAGAKAFQAaANAYAjQAVAcAJAiQAJAigDAiQgDAXgJAPQgaAtg/AGIgSABQgkAAg3gLg");
        var mask_graphics_16 = new cjs.Graphics().p("A8XrpQg3gKg5glQgpgag4gzQhJhEgjgwQgQgXgGghQgFgXAAgmQgBgRADgKQADgNAOgQQAMgRAOgLQAVgRAdgEQAcgFAcAHQAdAHAfAWQASAMAjAcIAtAiQAbAUARAPIAaAXQAOAMAOAHQAJAEAUAHQATAGAKAEQAaANAZAjQAVAcAJAhQAKAigDAiQgCAXgKAQQgZAtg/AGIgUABQgkAAg1gJg");
        var mask_graphics_17 = new cjs.Graphics().p("A8LrxQg3gJg6gjQgqgZg5gyQhLhCgkgvQgQgXgHghQgFgWgCgmQgBgRADgKQADgNANgRQAMgRAOgMQAUgRAdgFQAcgFAcAGQAdAHAgAUQASAMAkAbIAuAhQAbAUASAOIAaAWQAPANANAGQAJAEAVAGQATAFAKAFQAaALAaAjQAVAcALAhQAKAhgCAiQgCAXgJAQQgYAug/AIQgMABgPAAQgiAAgwgHg");
        var mask_graphics_18 = new cjs.Graphics().p("A7/r5Qg3gHg7giQgrgZg5gwQhNhAglguQgRgWgIghQgGgXgCgmQgBgQACgLQADgMAMgSQAMgRANgMQAVgRAcgGQAbgGAdAGQAdAFAgAUQATALAkAaIAvAgQAcATASAOIAaAWQAQAMANAFQAJAEAVAGQAUAFAJAEQAbALAbAiQAWAbALAhQALAhgBAiQgBAYgJAQQgXAug/AJQgPADgUAAQgfAAgrgGg");
        var mask_graphics_19 = new cjs.Graphics().p("A7zsBQg4gGg7ghQgrgXg7gvQhPg+gmgtQgRgWgJggQgGgXgDgmQgCgRACgKQACgNAMgRQAMgSANgMQAUgSAcgHQAbgGAdAFQAdAFAhATQATALAlAZIAvAfQAcASATAOIAbAUQAPAMAOAFQAJAEAVAFQAUAFAKADQAbALAbAhQAXAbAMAgQAMAhgBAiQAAAXgIARQgWAug/AMQgTADgaAAQgcAAgkgEg");
        var mask_graphics_20 = new cjs.Graphics().p("A7nsJQg4gFg9gfQgrgWg8guQhQg8gngsQgSgWgKggQgGgWgFgmQgCgRACgKQACgNAMgSQALgSAMgMQAUgTAcgHQAbgHAdAEQAdAEAhATQAUAKAlAYIAwAeQAdARATAOIAbAUQAQALAOAFQAJADAVAFQAUAEAKAEQAbAKAdAgQAXAaANAgQANAhgBAiQABAXgIARQgVAvg+ANQgXAEghAAQgYAAgdgCg");
        var mask_graphics_21 = new cjs.Graphics().p("A7bsSQg4gDg+geQgsgVg9gsQhRg6gpgsQgSgUgKggQgHgWgGgmQgCgRACgKQABgNALgSQALgSAMgNQATgTAcgIQAbgIAdAEQAeADAhASQATAKAnAXIAxAcQAdARATANIAcATQAQALAOAFQAJADAVAEQAUAEAKADQAcAJAdAgQAYAZANAgQAOAhABAiQAAAXgHARQgTAvg/APQgbAGgpAAIgogCg");
        var mask_graphics_22 = new cjs.Graphics().p("A7QsaQg4gCg+gcQgsgUg/grQhSg4gqgrQgTgUgLgfQgHgXgHglQgCgRABgKQABgNALgTQAKgSAMgNQATgTAcgJQAagIAdACQAeADAhARQAUAJAnAXIAyAbQAdAQATAMIAdATQAQAKAOAFQAKADAVADQAUADAKADQAcAJAeAfQAYAZAPAfQAOAgACAjQABAXgHARQgSAwg+AQQggAHg0AAIgZAAg");
        var mask_graphics_23 = new cjs.Graphics().p("A7EsjQg5AAg+gbQgtgTg/gpQhUg2grgqQgUgUgLgfQgIgWgHglQgEgRABgKQACgNAKgTQAJgSAMgOQASgUAcgJQAagJAdACQAeACAiAQQAUAJAnAVIAzAaQAdAQAUAMIAdARQARALAOADQAJADAWADQAUADAKADQAcAIAeAeQAZAYAQAfQAPAgACAiQACAXgGARQgSAxg9ARQglAKhCAAIgFAAg");
        var mask_graphics_24 = new cjs.Graphics().p("A8wtEQgugShAgnQhVg0gsgpQgUgTgMgfQgJgWgIglQgEgRABgKQABgNAKgTQAJgTALgOQASgUAbgKQAagKAdACQAeABAjAPQAUAJAoAUIAyAZQAfAOAUAMIAdARQARAKAOADQAKADAVACQAUADAKACQAdAHAfAeQAaAXAPAfQAQAgAEAiQACAXgGARQgQAxg9ATQgmALhGABIgEAAQg2AAg9gYg");
        var mask_graphics_25 = new cjs.Graphics().p("A8mtKQgugRhBgmQhWgygtgnQgUgTgOgfQgJgVgJglQgEgRABgKQAAgNAJgTQAJgTALgOQARgVAcgLQAZgKAdABQAeAAAjAOQAVAIAoAUIAzAYQAfANAUALIAeARQARAJAOADQAKADAVACQAUABALADQAcAGAgAdQAaAXARAeQARAfAEAiQADAXgGARQgPAyg8AUQgmAMhGADIgKABQg0AAg6gWg");
        var mask_graphics_26 = new cjs.Graphics().p("A8ctQQgugQhCgkQhYgwgtgnQgVgSgOgeQgKgVgKglQgEgRAAgKQAAgNAJgTQAJgUAKgOQARgVAbgLQAZgLAdAAQAegBAjAOQAVAHApATIA0AWQAfANAUALIAeAPQASAJAOADQAKACAVACQAUABALACQAcAGAhAcQAbAWARAeQASAfAEAhQAEAXgFASQgOAxg8AWQgmANhFAFIgQABQgxAAg4gTg");
        var mask_graphics_27 = new cjs.Graphics().p("A8YtUQgugQhCgjQhYgvgugnQgVgSgOgeQgKgVgKglQgFgQAAgLQAAgNAJgTQAIgUALgOQAQgVAbgMQAagLAdAAQAdAAAkANQAUAHApASIA0AWQAfANAVAKIAeAQQASAJAOACQAKACAVACQAUABALACQAcAFAhAcQAbAWASAeQARAeAGAiQADAXgFASQgNAxg8AXQglANhGAFIgSABQgwAAg3gSg");
        var mask_graphics_28 = new cjs.Graphics().p("A8UtYQgugPhDgjQhYgvgugmQgVgSgPgeQgKgVgKgkQgFgRAAgKQAAgNAJgUQAIgTAKgPQARgVAagMQAagLAdAAQAegBAjANQAVAHApASIA0AVQAfANAVAKIAeAPQASAJAOADQAKACAVABQAUABALACQAcAFAiAbQAbAWARAeQASAeAGAiQAEAXgFASQgNAxg8AXQglAOhGAGIgUAAQgvAAg2gRg");
        var mask_graphics_29 = new cjs.Graphics().p("A8QtcQgugPhDgiQhZgugugmQgVgSgPgeQgKgVgLgkQgFgQAAgLQAAgNAJgTQAHgUALgOQAQgWAbgMQAZgLAdgBQAegBAjANQAVAHApARIA1AWQAfAMAVAKIAeAPQASAIAOADQAKACAVABQAUABALABQAcAGAiAbQAbAWASAdQASAeAGAiQAEAXgFASQgMAyg8AXQglAOhGAGIgVABQgvAAg1gRg");
        var mask_graphics_30 = new cjs.Graphics().p("A8MtgQgugOhDgiQhaguguglQgWgRgOgeQgLgVgLglQgFgQAAgKQAAgNAIgUQAIgUAKgOQAQgWAbgMQAZgMAdAAQAegCAkANQAVAHApARIA0AVQAgAMAUAKIAfAPQASAIAOACQAKACAVABQAVABAKABQAdAFAhAbQAcAWASAdQASAeAGAiQAEAXgEARQgNAzg7AXQglAOhGAHIgXABQguAAg0gQg");
        var mask_graphics_31 = new cjs.Graphics().p("A8ItjQgvgOhDgiQhagtgvgkQgVgSgPgeQgLgVgLgkQgFgQAAgLQAAgNAIgTQAHgUALgPQAPgVAbgNQAZgLAdgCQAegBAkAMQAUAHAqARIA1AUQAfAMAVAKIAeAPQASAIAOACQAKACAWABQAUAAALACQAcAEAiAbQAcAWASAdQATAeAGAhQAEAXgEASQgMAyg7AYQgmAOhFAIIgZABQgtAAgzgPg");
        var mask_graphics_61 = new cjs.Graphics().p("A8ItjQgvgOhDgiQhagtgvgkQgVgSgPgeQgLgVgLgkQgFgQAAgLQAAgNAIgTQAHgUALgPQAPgVAbgNQAZgLAdgCQAegBAkAMQAUAHAqARIA1AUQAfAMAVAKIAeAPQASAIAOACQAKACAWABQAUAAALACQAcAEAiAbQAcAWASAdQATAeAGAhQAEAXgEASQgMAyg7AYQgmAOhFAIIgZABQgtAAgzgPg");
        var mask_graphics_62 = new cjs.Graphics().p("A8MtfQgvgPhDgiQhZgtgvglQgVgSgPgeQgKgVgLgkQgFgRAAgKQAAgNAIgUQAIgTAKgPQAQgVAbgMQAZgMAdgBQAegBAjAMQAVAHApARIA1AVQAfAMAVAKIAfAPQARAIAOADQAKACAWAAQAUABALACQAcAFAiAbQAbAVASAeQATAeAGAiQAEAWgFASQgMAyg7AXQgmAPhFAGIgYACQgtAAg0gQg");
        var mask_graphics_63 = new cjs.Graphics().p("A8QtcQgugOhDgjQhZgugvglQgVgSgOgeQgLgVgKglQgFgQAAgKQAAgNAIgUQAIgUAKgOQARgVAagMQAagMAdgBQAeAAAjAMQAVAHApASIA0AVQAgAMAUAKIAfAPQARAJAOACQAKACAWABQAUABAKACQAdAFAiAbQAbAWASAeQASAeAGAiQAEAWgFASQgNAyg7AXQgmAOhFAGIgWABQguAAg1gRg");
        var mask_graphics_64 = new cjs.Graphics().p("A8UtYQgugPhDgjQhZgugugmQgVgSgOgeQgKgWgLgkQgEgQAAgLQAAgNAIgTQAIgUALgOQAQgWAbgLQAZgMAdAAQAegBAkANQAUAHApASIA1AWQAfAMAUALIAfAPQARAIAOADQAKACAWABQAUABAKACQAdAFAhAcQAbAWASAeQASAeAFAiQAEAWgFASQgNAyg7AWQgmAOhFAGIgUABQgvAAg2gSg");
        var mask_graphics_65 = new cjs.Graphics().p("A8YtUQgugPhDgkQhYgvgugmQgVgSgOgfQgKgVgKgkQgEgRAAgKQAAgNAJgUQAIgTAKgOQARgWAbgLQAZgLAdgBQAeAAAjANQAVAHApATIA0AWQAfAMAVALIAeAPQARAJAOADQAKACAWABQAUABAKACQAdAGAhAbQAbAXARAdQASAfAFAiQAEAXgFARQgNAyg8AWQgmAOhGAFIgRAAQgxAAg2gSg");
        var mask_graphics_66 = new cjs.Graphics().p("A8ctQQgugQhCgkQhYgwgtgnQgVgSgOgeQgKgVgKglQgEgRAAgKQAAgNAJgTQAJgUAKgOQARgVAbgLQAZgLAdAAQAegBAjAOQAVAHApATIA0AWQAfANAUALIAeAPQASAJAOADQAKACAVACQAUABALACQAcAGAhAcQAbAWARAeQASAfAEAhQAEAXgFASQgOAxg8AWQgmANhFAFIgQABQgxAAg4gTg");
        var mask_graphics_67 = new cjs.Graphics().p("A8mtKQgugRhBgmQhXgygsgnQgVgTgNgfQgJgVgJglQgEgRAAgKQABgNAJgTQAJgTALgOQARgVAbgLQAagKAdABQAeAAAjAOQAUAIApAUIAzAXQAfAOAUALIAdARQASAJAOADQAKACAVACQAUACAKACQAdAHAgAdQAaAXARAeQAQAfAFAiQACAXgFARQgPAyg8AUQgnAMhFADIgKAAQg0AAg6gVg");
        var mask_graphics_68 = new cjs.Graphics().p("A8xtEQgtgShAgnQhWg0grgpQgUgTgNgfQgIgWgIglQgEgRABgKQABgNAJgTQAJgTAMgOQARgUAcgKQAagKAdACQAeABAiAPQAVAIAnAVIAzAZQAeAOAUAMIAeARQARAKAOADQAJADAWACQAUADAKACQAcAHAgAeQAZAXAQAfQAQAfADAjQADAXgGARQgQAxg9ASQgnAMhFABIgEAAQg3AAg9gYg");
        var mask_graphics_69 = new cjs.Graphics().p("A7FsjQg4gBg+gaQgtgThAgpQhUg2gqgqQgUgUgLgfQgJgWgHglQgDgRABgKQABgNAKgTQAKgTAMgNQASgUAcgJQAagJAdACQAeACAiAQQAUAJAnAVIAyAaQAeAPAUAMIAdASQAQAKAOAEQAKADAVADQAUADAKADQAcAHAfAfQAZAYAPAfQAPAgADAiQACAXgHARQgRAxg9ARQglAKhCAAIgGAAg");
        var mask_graphics_70 = new cjs.Graphics().p("A7QsaQg4gCg+gcQgtgUg+grQhTg4gpgrQgTgUgLggQgIgWgGglQgDgRACgKQABgNALgTQAKgSAMgNQASgUAcgIQAbgJAdADQAeADAhARQAUAJAnAWIAxAcQAeAQATAMIAdATQAQAKAOAEQAJADAWAEQAUADAKADQAcAJAdAfQAZAZAOAfQAPAgABAiQACAYgHAQQgTAxg9APQggAIg1AAIgYAAg");
        var mask_graphics_71 = new cjs.Graphics().p("A7csSQg4gDg9geQgsgVg9gsQhRg6gpgsQgSgUgLggQgHgXgFglQgCgRABgKQACgNALgSQALgTAMgMQATgTAcgIQAbgIAdAEQAdADAiARQATAKAmAYIAxAcQAdARATANIAcATQAQALAOAFQAKADAVAEQAUAEAKADQAbAJAeAgQAXAZAOAgQAOAhAAAiQABAXgHARQgUAvg+APQgbAFgqAAIgogBg");
        var mask_graphics_72 = new cjs.Graphics().p("A7nsJQg4gFg9gfQgrgWg8guQhQg8gogtQgSgVgJggQgHgWgEgmQgCgRACgKQACgNALgSQAMgSAMgMQAUgTAcgHQAbgHAdAEQAdAEAhASQATALAmAYIAwAeQAdARASAOIAcAUQAQALAOAFQAJADAVAFQAUAEAKADQAbAKAcAhQAYAaAMAgQANAhAAAiQAAAXgHARQgVAvg+ANQgXAEghAAQgYAAgdgCg");
        var mask_graphics_73 = new cjs.Graphics().p("A7zsBQg4gGg8ghQgqgXg7gvQhPg+gmguQgSgVgIghQgGgWgEgmQgBgRACgKQACgNAMgSQAMgRAMgMQAUgSAdgHQAbgGAdAFQAdAEAgAUQAUAKAkAaIAwAeQAcASATAOIAbAVQAPAMAOAFQAJAEAVAFQAUAEAJAEQAcALAbAhQAXAaAMAhQAMAhgBAiQgBAXgIARQgVAug/ALQgTAEgaAAQgcAAgkgEg");
        var mask_graphics_74 = new cjs.Graphics().p("A7/r5Qg4gHg7gjQgqgYg6gwQhNhAglgvQgRgWgHggQgGgXgCgmQgCgRADgKQACgNANgRQAMgRANgMQAUgSAdgFQAbgGAdAFQAdAGAgAUQATALAkAaIAvAgQAbATASAOIAbAVQAPAMAOAGQAJAEAVAGQATAFAKAEQAbALAbAiQAWAbALAhQALAhgCAiQgBAXgIAQQgXAvg/AJQgQACgTAAQggAAgqgFg");
        var mask_graphics_75 = new cjs.Graphics().p("A8LrxQg3gJg7gjQgpgag5gxQhLhCgkgwQgRgWgHghQgEgXgCgmQgBgRADgKQADgMANgRQAMgRANgMQAVgRAdgFQAbgFAdAGQAdAGAfAVQATAMAjAbIAuAhQAcATARAPIAaAWQAPAMAOAGQAJAEAVAHQATAFAJAEQAbAMAaAjQAVAbALAhQAKAigDAiQgBAXgJAQQgYAug/AIQgMABgPAAQgiAAgwgHg");
        var mask_graphics_76 = new cjs.Graphics().p("A8XrpQg3gKg5glQgpgag4gzQhJhEgjgwQgQgXgGghQgFgXAAgmQgBgRADgKQADgNAOgQQAMgRAOgLQAVgRAdgEQAcgFAcAHQAdAHAfAWQASAMAjAcIAtAiQAbAUARAPIAaAXQAOAMAOAHQAJAEAUAHQATAGAKAEQAaANAZAjQAVAcAJAhQAKAigDAiQgCAXgKAQQgZAtg/AGIgUABQgkAAg1gJg");
        var mask_graphics_77 = new cjs.Graphics().p("A8drlQg3gLg5glQgpgbg3gzQhJhFgigwQgQgXgGghQgEgXAAgmQAAgRADgKQADgNANgQQANgRAOgLQAVgQAdgEQAcgFAcAIQAdAHAfAWQASAMAjAcIAsAjQAbAUARAPIAZAXQAPANANAGQAJAFAVAHQATAGAJAEQAaANAZAjQAUAdAKAhQAJAigEAiQgCAXgJAQQgaAsg/AGIgSABQgkAAg3gKg");
        var mask_graphics_78 = new cjs.Graphics().p("A8kriQg3gLg4gmQgpgbg2g0QhJhFgigxQgPgXgGghQgEgXAAgmQAAgRADgKQAEgMANgRQANgQAOgLQAWgQAdgEQAbgEAcAHQAdAIAfAWQASAMAiAdIAtAjQAaAUARAQIAZAXQAPANANAGQAJAFAUAHQATAGAKAFQAaANAYAjQAUAdAJAhQAJAigEAiQgCAXgKAQQgaAsg/AGIgQAAQglAAg4gLg");

        this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(14).to({graphics:mask_graphics_14,x:-216.675,y:-120.6446}).wait(1).to({graphics:mask_graphics_15,x:-216.3922,y:-120.8466}).wait(1).to({graphics:mask_graphics_16,x:-216.033,y:-120.9995}).wait(1).to({graphics:mask_graphics_17,x:-215.6981,y:-121.2127}).wait(1).to({graphics:mask_graphics_18,x:-215.3592,y:-121.4228}).wait(1).to({graphics:mask_graphics_19,x:-215.0156,y:-121.6302}).wait(1).to({graphics:mask_graphics_20,x:-214.6668,y:-121.835}).wait(1).to({graphics:mask_graphics_21,x:-214.3124,y:-122.0373}).wait(1).to({graphics:mask_graphics_22,x:-213.9518,y:-122.2375}).wait(1).to({graphics:mask_graphics_23,x:-213.5848,y:-122.4355}).wait(1).to({graphics:mask_graphics_24,x:-213.211,y:-122.6317}).wait(1).to({graphics:mask_graphics_25,x:-212.8301,y:-122.8261}).wait(1).to({graphics:mask_graphics_26,x:-212.4726,y:-123.0371}).wait(1).to({graphics:mask_graphics_27,x:-212.2686,y:-123.2908}).wait(1).to({graphics:mask_graphics_28,x:-212.0639,y:-123.5443}).wait(1).to({graphics:mask_graphics_29,x:-211.8585,y:-123.7976}).wait(1).to({graphics:mask_graphics_30,x:-211.6527,y:-124.0508}).wait(1).to({graphics:mask_graphics_31,x:-211.4865,y:-124.2652}).wait(30).to({graphics:mask_graphics_61,x:-211.4865,y:-124.2652}).wait(1).to({graphics:mask_graphics_62,x:-211.6934,y:-124.0125}).wait(1).to({graphics:mask_graphics_63,x:-211.8995,y:-123.7596}).wait(1).to({graphics:mask_graphics_64,x:-212.1052,y:-123.5066}).wait(1).to({graphics:mask_graphics_65,x:-212.3101,y:-123.2534}).wait(1).to({graphics:mask_graphics_66,x:-212.4726,y:-123.0371}).wait(1).to({graphics:mask_graphics_67,x:-212.8603,y:-122.8446}).wait(1).to({graphics:mask_graphics_68,x:-213.2407,y:-122.6508}).wait(1).to({graphics:mask_graphics_69,x:-213.614,y:-122.4554}).wait(1).to({graphics:mask_graphics_70,x:-213.9805,y:-122.258}).wait(1).to({graphics:mask_graphics_71,x:-214.3406,y:-122.0586}).wait(1).to({graphics:mask_graphics_72,x:-214.6945,y:-121.8569}).wait(1).to({graphics:mask_graphics_73,x:-215.0427,y:-121.6528}).wait(1).to({graphics:mask_graphics_74,x:-215.3858,y:-121.4461}).wait(1).to({graphics:mask_graphics_75,x:-215.7241,y:-121.2366}).wait(1).to({graphics:mask_graphics_76,x:-216.033,y:-120.9995}).wait(1).to({graphics:mask_graphics_77,x:-216.3167,y:-120.7973}).wait(1).to({graphics:mask_graphics_78,x:-216.675,y:-120.6446}).wait(1).to({graphics:null,x:0,y:0}).wait(182));

        // OmbreBrase1
        this.instance_38 = new lib.Path_2();
        this.instance_38.setTransform(-369.65,-231.9,1,1,29.9996,0,0,12.1,13.4);
        this.instance_38.alpha = 0.1016;
        this.instance_38._off = true;

        var maskedShapeInstanceList = [this.instance_38];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(26).to({_off:false},0).to({regX:12,regY:13.3,scaleX:0.9999,scaleY:0.9999,rotation:6.2761,x:-375.25,y:-237.9},5).wait(30).to({regX:12.1,regY:13.4,scaleX:1,scaleY:1,rotation:29.9996,x:-370.4,y:-231.9},5).to({_off:true},1).wait(194));

        // ArriereBras_copy
        this.instance_39 = new lib.ArriereBras();
        this.instance_39.setTransform(-405.95,-217.4,1,1,0,0,0,27.4,23.9);
        this.instance_39._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(14).to({_off:false},0).to({regX:27.3,rotation:-1.0204,x:-404.5,y:-218.4},2).to({regX:27.4,rotation:-14.9875,x:-394.6,y:-226.6},10).to({rotation:-17.0845,x:-392.35,y:-229.7},5).to({_off:true},1).wait(29).to({_off:false},0).to({rotation:-14.9875,x:-394.6,y:-226.6},5).to({regX:27.3,rotation:-1.0204,x:-404.5,y:-218.4},10).to({regX:27.4,rotation:0,x:-405.95,y:-217.4},2).to({_off:true},1).wait(182));

        // Masque2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        var mask_1_graphics_0 = new cjs.Graphics().p("A7qsEQgdgFgjgQQgOgHgtgZQglgVg2gnIhYhBQgygkgTgbQghgsAZgpQAPgYAqgWQAsgXAlgHQAzgJAdAOQAKAFAMAMIAUATIAwApQAcAYATATQAXAYAUANQAUANAIAdQAJAdAFAlIAFBEQACAXgBAIQgBAVgIAIQgHAHgUAAQgNAAgSgDg");
        var mask_1_graphics_1 = new cjs.Graphics().p("ACnDSQgXgCgbgJIgQgGQgRgHgsgXIgMgGQgjgUgugiIgHgFQg0gogegZIgBgBQgvgkgVgcQgOgTgEgTQgGgYAMgZQAKgTAXgUQAHgHAKgGIABAAIAYgOQARgJAOgFQANgEAMgCQALgDAKAAQAbgDAVAHIANAFQAKAFAMAMIAIAIIANAMIAeAaIASAQIASAQQASAQAMANIAEAEIAWAVQAJAIAJAGIAGAEQAJAIAIAMQAGAHADAIIACAFQAKAZAHAiIAAABQAEAWADAlIABAKQABAXgBAJQAAAKgDAIQgCAIgEAEQgFAGgLADQgKACgPAAIgPAAg");
        var mask_1_graphics_2 = new cjs.Graphics().p("AB5DRIgRgFQgTgGgsgVIgMgGQglgUgvgiIgHgGQgygmgggeIgBgBQgugngWgdQgOgUgGgSQgGgZAJgaQAIgUAUgWQAHgJAIgHIABAAQALgIANgJQAQgJAPgGQAMgEAMgDIAXgDQAbgCAVAHIAOAGQALAGAMALIAJAIIANAMIAeAcIATARIASAQIAfAfIAEAEIAWAVIASAPIAGAEQAJAHAKAMQAHAHAEAHIADAFQAMAXAJAjIAAABQAGAXAEAlIABAKQABAWgBALQAAAKgDAIQgCAIgEAFQgFAHgLADQgPAHgYAAIgDAAQgWAAgagIg");
        var mask_1_graphics_3 = new cjs.Graphics().p("AB9DbIgRgEQgWgGgrgUIgNgFQgogTgugjIgHgGQgwglgjgjIgBgBQgtgpgXgfQgOgUgHgTQgIgYAIgcQAGgVARgZQAFgLAIgHIABAAQAJgJAOgKQAQgLAOgGQANgFAMgCQAMgDALgBQAbgCAXAIIAPAGQALAHAOALIAIAIIANANIAfAdIATARIASARQATARANAPIAEAEIAWAWQAKAJAJAHIAFAEIAVASQAIAHAFAGIAEAFQAOAVAMAkIAAABQAIAYAEAlIABAKQABAVgBANQgBAKgCAIQgDAIgDAGQgFAIgKAEQgPAJgYACIgNABQgSAAgVgFg");
        var mask_1_graphics_4 = new cjs.Graphics().p("ACBDlIgRgDQgYgGgsgSIgNgFQgpgSgvgkIgIgGQgsgjgngpIgBgBQgsgrgXggQgPgWgHgTQgKgYAGgcIAAgBQAEgWANgcQAFgMAHgHIAAgBQAJgKAOgLQARgMANgGQANgGANgDQAMgDAMAAQAbgCAXAIIAQAHQAMAHANALIAKAIIANAOIAfAdIATASIATASIAhAhIAEAEIAWAXQAJAKAJAGIAGAEIAXARQAJAHAGAHIAEAEQARAUANAkIABABQAKAaAEAjIABAKQACAVgCAPQgBAKgCAIQgCAIgEAGQgFAKgJAFQgOAMgYAEQgLACgMAAQgPAAgQgDg");
        var mask_1_graphics_5 = new cjs.Graphics().p("ACGDuIgSgDQgagFgrgQIgOgFQgsgRgvglIgHgGQgqgigqgvIgBgBQgrgsgYgiQgPgWgIgTQgLgZADgdIAAgBQACgXALgfQAEgOAGgHIAAgBQAHgKAOgNQASgOANgGQAMgHAOgDQAMgDAMAAQAbgBAZAJIAQAHQANAHAOALIAJAJIAQAOIAdAeIAUASIATATQAUATAOAPIAEAEIAWAYQAJAKAKAHIAGAEIAYAQQALAHAGAGIAFAEQATASAQAlIABABQAMAbAEAjIABAKQACAVgCAQQgBAJgDAJQgCAJgDAGQgFALgIAGQgOAOgXAGQgQAFgTAAIgVgCg");
        var mask_1_graphics_6 = new cjs.Graphics().p("ACLD4IgTgCQgcgFgrgOIgOgFQgugQgvgmIgIgHQgogggtg0IgBgBQgpgvgZgjQgPgXgKgTQgLgYAAgfIAAgBQABgYAHghQADgQAFgIIAAgBQAGgLAPgOQARgPANgHQANgHANgDQANgDANgBQAbgBAaAKIAQAIQAOAHAOAMIAKAIIAQAPIAeAfIAUATIAUATIAiAjIAEAEIAWAZQAKALAJAHIAGAEIAaAPQAMAHAHAFIAGAEQAVAQASAmIABABQAOAcAFAjIABAKQACAUgCARQgBAKgDAJQgCAJgDAHQgFALgHAHQgPARgWAIQgTAHgYAAIgOAAg");
        var mask_1_graphics_7 = new cjs.Graphics().p("A75q4QgogBhDgVQg2gRgzgsQgmgggwg6QhBhOgbgzQgNgYgCgiQgBgYAEglQACgSAEgJQAFgLAPgQQASgQAMgIQAYgNAdgBQAbgBAbALQAcALAcAZQARAOAfAhIAoAnQAYAYAPARIAWAaQANAOANAIQAIAGATAJQATAJAJAFQAXAQAVAmQARAfAFAiQAFAjgIAhQgFAYgLANQgdAng7AAIgGAAg");
        var mask_1_graphics_8 = new cjs.Graphics().p("ACGD9QgrgDhBgXQgzgTg0gtQgqglgvg5Qg5hFgYgwQgMgYgBgjQgCgXAFghQACgRAFgKQAGgMAPgPQASgRAPgHQAYgMAdABQAcAAAbAMQAbAMAdAZQAQAOAeAfIApAnQAWAWAPAQIAXAZQAMANAOAIIAbAOQAUAKALAKQAXAQATAmQAQAfAEAiQAEAhgIAfQgJAbgSALQgeAhg3AAIgLAAg");
        var mask_1_graphics_9 = new cjs.Graphics().p("AB6D5QgsgEhAgaQgxgUg0guQgwgrgsg3Qgzg9gVguQgKgYgCgjQgBgWAEgdQADgRAHgLQAHgNAPgOQASgQARgHQAZgLAdACQAcACAcANQAZAMAeAaIAtArIAqAnIAjAjIAXAZQAMALAPAIIAcANQAVALANANQAWATASAlQAPAfACAiQADAggJAcQgLAegaALQgcAagzAAIgTgBg");
        var mask_1_graphics_10 = new cjs.Graphics().p("ABuD1QgugFg/gcQgvgWg0gvQg1gwgqg2Qgsg1gSgsQgJgXgBgkQgBgVAEgZQADgQAIgMQAIgOAPgNQATgRAUgGQAZgJAdADQAcADAcAPQAYAMAfAaIAtAqQATAQAXAWIAhAhIAYAXQALAKAQAIIAcANQAWALAQARQAWAVAPAkQAOAgABAiQACAegJAaQgOAhghAJQgbAUguAAIgcgCg");
        var mask_1_graphics_11 = new cjs.Graphics().p("ABjDyQgxgHg8gfQgugXg1gwQg6g2gog0QgkgugPgoQgIgYgBgkQAAgUADgWQADgPAJgNQAKgOAOgNQAUgQAWgGQAagIAcAEQAdAEAdARQAWAMAgAbIAtAoIAqAmIAfAeIAZAWQALAJARAIIAcAMQAXALARAWQAWAXAOAkQAMAgAAAiQABAcgJAXQgRAkgpAJQgZANgnAAQgSAAgUgCg");
        var mask_1_graphics_12 = new cjs.Graphics().p("ABXDuQgzgJg6ghQgsgYg2gyQg/g6gmg0QgdglgMgmQgHgYAAglQAAgTADgRQADgOALgPQAKgPAPgMQAUgQAZgFQAagHAcAFQAdAFAdATQAVAMAhAcIAsAmQAXATAUASIAdAcQAMAMAOAJQAKAIASAHQAQAGAMAGQAYAMAUAaQAVAZANAjQALAhgCAiQAAAagJAVQgUAmgwAIQgWAIggAAQgXAAgcgEg");
        var mask_1_graphics_13 = new cjs.Graphics().p("ABLDpQg0gJg5gkQgrgag2gyQhDhAgkgxQgXgfgJgkQgFgXAAglQAAgSADgOQADgOAMgPQAMgQAOgLQAVgQAbgFQAbgFAcAGQAdAGAeAVQATAMAiAcIAsAlQAYATATARIAbAaQANAMANAIQAKAGATAHIAdAMQAZAMAWAeQAUAbALAiQAKAigCAiQgCAYgJASQgXAqg4AHQgQADgVAAQgeAAgogHg");
        var mask_1_graphics_14 = new cjs.Graphics().p("A8kriQg3gLg4gmQgpgbg2g0QhJhFgigxQgPgXgGghQgEgXAAgmQAAgRADgKQAEgMANgRQANgQAOgLQAWgQAdgEQAbgEAcAHQAdAIAfAWQASAMAiAdIAtAjQAaAUARAQIAZAXQAPANANAGQAJAFAUAHQATAGAKAFQAaANAYAjQAUAdAJAhQAJAigEAiQgCAXgKAQQgaAsg/AGIgQAAQglAAg4gLg");
        var mask_1_graphics_31 = new cjs.Graphics().p("A8LtjQgugOhEgjQhbgwgrgkQgWgSgOgeQgKgVgLgkQgFgSAAgJQAAgNAJgUQAJgWAJgMQAQgVAbgMQAZgLAdgBQAegBAkANQAUAHApASQBVAiAUAJIAeAQQASAIAOACIAfADQAUABALACQAdAGAhAbQAbAVASAeQASAeAGAiQADAXgEARQgNAyg7AXQgmAOhGAGIgVABQguAAg1gRg");
        var mask_1_graphics_32 = new cjs.Graphics().p("AAKCyQgugNhFggQhcgtgtgjQgWgRgPgeQgLgTgLgkQgGgSAAgJQgBgNAIgUQAJgWAJgMQAPgWAagNQAZgLAdgCQAegCAkAMQAUAGAqARQBUAfAUAIIAfAPQASAHAOACQAKACAWAAQAUABAKABQAdAFAiAaQAcAUATAeQATAcAHAhQAEAYgEARQgLAyg7AZQglAPhFAIQgPACgPAAQgqAAgwgOg");
        var mask_1_graphics_33 = new cjs.Graphics().p("AAQCxQgvgMhFgeQhegqgtghQgXgQgQgeQgMgSgMgkQgGgSgBgIQgBgNAHgVQAIgWAJgMQAOgXAagNQAYgNAdgDQAegCAkAKQAVAFAqAQQBVAcAUAIIAgAOQASAHAOABIAfABQAUAAALABQAdAEAjAYQAcAUAUAdQAUAcAIAgQAFAYgDARQgKAyg5AbQglAQhFALQgSACgUAAQgmAAgsgKg");
        var mask_1_graphics_34 = new cjs.Graphics().p("AAVCuQgugKhGgcQhggngugfQgXgPgSgdQgLgUgOgiQgHgRgBgJQgBgNAHgVQAHgWAHgNQAOgXAagOQAXgOAdgDQAegDAkAIQAVAFArAOIBrAhIAgANQASAGAOABIAfAAIAfAAQAdACAkAYQAcATAVAcQAVAcAJAgQAGAWgCASQgJAyg4AdQglAShEAMQgXAFgZAAQgiAAgngJg");
        var mask_1_graphics_35 = new cjs.Graphics().p("AAbCsQgvgIhHgaQhhgkgvgeQgYgOgSgdQgNgTgPghQgHgSgBgIQgCgNAGgWQAGgWAIgNQANgXAZgPQAXgPAdgEQAegEAkAHQAVAEArANQBXAXAVAGIAhAMQASAGAOAAIAfgBQAUgBALAAQAdACAlAWQAdASAWAbQAWAcAKAfQAHAXgCARQgHAzg3AfQgkAShFAPQgaAGgeAAQgfAAghgGg");
        var mask_1_graphics_36 = new cjs.Graphics().p("A8OuhQgwgHhIgYQhigggxgdQgYgOgTgcQgNgSgQgiQgIgRgCgJQgCgNAFgVQAGgXAHgNQANgYAYgQQAXgPAdgGQAdgFAlAGQAWAEArALQBZAUAVAGIAhALQASAFAOAAIAggCQAUgDALABQAdAAAlAWQAeARAXAaQAXAbALAgQAHAXgBARQgFA0g3AgQgjAUhEARQgfAIgjAAQgaAAgdgEg");
        var mask_1_graphics_56 = new cjs.Graphics().p("A8OuhQgwgHhIgYQhigggxgdQgYgOgTgcQgNgSgQgiQgIgRgCgJQgCgNAFgVQAGgXAHgNQANgYAYgQQAXgPAdgGQAdgFAlAGQAWAEArALQBZAUAVAGIAhALQASAFAOAAIAggCQAUgDALABQAdAAAlAWQAeARAXAaQAXAbALAgQAHAXgBARQgFA0g3AgQgjAUhEARQgfAIgjAAQgaAAgdgEg");
        var mask_1_graphics_57 = new cjs.Graphics().p("AAbCsQgvgIhHgaQhhgkgvgeQgYgOgSgdQgNgTgPghQgHgSgBgIQgCgNAGgWQAGgWAIgNQANgXAZgPQAXgPAdgEQAegEAkAHQAVAEArANQBXAXAVAGIAhAMQASAGAOAAIAfgBQAUgBALAAQAdACAlAWQAdASAWAbQAWAcAKAfQAHAXgCARQgHAzg3AfQgkAShFAPQgaAGgeAAQgfAAghgGg");
        var mask_1_graphics_58 = new cjs.Graphics().p("AAVCuQgugKhGgcQhggngugfQgXgPgSgdQgLgUgOgiQgHgRgBgJQgBgNAHgVQAHgWAHgNQAOgXAagOQAXgOAdgDQAegDAkAIQAVAFArAOIBrAhIAgANQASAGAOABIAfAAIAfAAQAdACAkAYQAcATAVAcQAVAcAJAgQAGAWgCASQgJAyg4AdQglAShEAMQgXAFgZAAQgiAAgngJg");
        var mask_1_graphics_59 = new cjs.Graphics().p("AAQCxQgvgMhFgeQhegqgtghQgXgQgQgeQgMgSgMgkQgGgSgBgIQgBgNAHgVQAIgWAJgMQAOgXAagNQAYgNAdgDQAegCAkAKQAVAFAqAQQBVAcAUAIIAgAOQASAHAOABIAfABQAUAAALABQAdAEAjAYQAcAUAUAdQAUAcAIAgQAFAYgDARQgKAyg5AbQglAQhFALQgSACgUAAQgmAAgsgKg");
        var mask_1_graphics_60 = new cjs.Graphics().p("AAKCyQgugNhFggQhcgtgtgjQgWgRgPgeQgLgTgLgkQgGgSAAgJQgBgNAIgUQAJgWAJgMQAPgWAagNQAZgLAdgCQAegCAkAMQAUAGAqARQBUAfAUAIIAfAPQASAHAOACQAKACAWAAQAUABAKABQAdAFAiAaQAcAUATAeQATAcAHAhQAEAYgEARQgLAyg7AZQglAPhFAIQgPACgPAAQgqAAgwgOg");
        var mask_1_graphics_61 = new cjs.Graphics().p("A8LtjQgugOhEgjQhbgwgrgkQgWgSgOgeQgKgVgLgkQgFgSAAgJQAAgNAJgUQAJgWAJgMQAQgVAbgMQAZgLAdgBQAegBAkANQAUAHApASQBVAiAUAJIAeAQQASAIAOACIAfADQAUABALACQAdAGAhAbQAbAVASAeQASAeAGAiQADAXgEARQgNAyg7AXQgmAOhGAGIgVABQguAAg1gRg");
        var mask_1_graphics_78 = new cjs.Graphics().p("A8kriQg3gLg4gmQgpgbg2g0QhJhFgigxQgPgXgGghQgEgXAAgmQAAgRADgKQAEgMANgRQANgQAOgLQAWgQAdgEQAbgEAcAHQAdAIAfAWQASAMAiAdIAtAjQAaAUARAQIAZAXQAPANANAGQAJAFAUAHQATAGAKAFQAaANAYAjQAUAdAJAhQAJAigEAiQgCAXgKAQQgaAsg/AGIgQAAQglAAg4gLg");
        var mask_1_graphics_79 = new cjs.Graphics().p("ABLDpQg0gJg5gkQgrgag2gyQhDhAgkgxQgXgfgJgkQgFgXAAglQAAgSADgOQADgOAMgPQAMgQAOgLQAVgQAbgFQAbgFAcAGQAdAGAeAVQATAMAiAcIAsAlQAYATATARIAbAaQANAMANAIQAKAGATAHIAdAMQAZAMAWAeQAUAbALAiQAKAigCAiQgCAYgJASQgXAqg4AHQgQADgVAAQgeAAgogHg");
        var mask_1_graphics_80 = new cjs.Graphics().p("ABXDuQgzgJg6ghQgsgYg2gyQg/g6gmg0QgdglgMgmQgHgYAAglQAAgTADgRQADgOALgPQAKgPAPgMQAUgQAZgFQAagHAcAFQAdAFAdATQAVAMAhAcIAsAmQAXATAUASIAdAcQAMAMAOAJQAKAIASAHQAQAGAMAGQAYAMAUAaQAVAZANAjQALAhgCAiQAAAagJAVQgUAmgwAIQgWAIggAAQgXAAgcgEg");
        var mask_1_graphics_81 = new cjs.Graphics().p("ABjDyQgxgHg8gfQgugXg1gwQg6g2gog0QgkgugPgoQgIgYgBgkQAAgUADgWQADgPAJgNQAKgOAOgNQAUgQAWgGQAagIAcAEQAdAEAdARQAWAMAgAbIAtAoIAqAmIAfAeIAZAWQALAJARAIIAcAMQAXALARAWQAWAXAOAkQAMAgAAAiQABAcgJAXQgRAkgpAJQgZANgnAAQgSAAgUgCg");
        var mask_1_graphics_82 = new cjs.Graphics().p("ABuD1QgugFg/gcQgvgWg0gvQg1gwgqg2Qgsg1gSgsQgJgXgBgkQgBgVAEgZQADgQAIgMQAIgOAPgNQATgRAUgGQAZgJAdADQAcADAcAPQAYAMAfAaIAtAqQATAQAXAWIAhAhIAYAXQALAKAQAIIAcANQAWALAQARQAWAVAPAkQAOAgABAiQACAegJAaQgOAhghAJQgbAUguAAIgcgCg");
        var mask_1_graphics_83 = new cjs.Graphics().p("AB6D5QgsgEhAgaQgxgUg0guQgwgrgsg3Qgzg9gVguQgKgYgCgjQgBgWAEgdQADgRAHgLQAHgNAPgOQASgQARgHQAZgLAdACQAcACAcANQAZAMAeAaIAtArIAqAnIAjAjIAXAZQAMALAPAIIAcANQAVALANANQAWATASAlQAPAfACAiQADAggJAcQgLAegaALQgcAagzAAIgTgBg");
        var mask_1_graphics_84 = new cjs.Graphics().p("ACGD9QgrgDhBgXQgzgTg0gtQgqglgvg5Qg5hFgYgwQgMgYgBgjQgCgXAFghQACgRAFgKQAGgMAPgPQASgRAPgHQAYgMAdABQAcAAAbAMQAbAMAdAZQAQAOAeAfIApAnQAWAWAPAQIAXAZQAMANAOAIIAbAOQAUAKALAKQAXAQATAmQAQAfAEAiQAEAhgIAfQgJAbgSALQgeAhg3AAIgLAAg");
        var mask_1_graphics_85 = new cjs.Graphics().p("A75q4QgogBhDgVQg2gRgzgsQgmgggwg6QhBhOgbgzQgNgYgCgiQgBgYAEglQACgSAEgJQAFgLAPgQQASgQAMgIQAYgNAdgBQAbgBAbALQAcALAcAZQARAOAfAhIAoAnQAYAYAPARIAWAaQANAOANAIQAIAGATAJQATAJAJAFQAXAQAVAmQARAfAFAiQAFAjgIAhQgFAYgLANQgdAng7AAIgGAAg");
        var mask_1_graphics_86 = new cjs.Graphics().p("ACLD4IgTgCQgcgFgrgOIgOgFQgugQgvgmIgIgHQgogggtg0IgBgBQgpgvgZgjQgPgXgKgTQgLgYAAgfIAAgBQABgYAHghQADgQAFgIIAAgBQAGgLAPgOQARgPANgHQANgHANgDQANgDANgBQAbgBAaAKIAQAIQAOAHAOAMIAKAIIAQAPIAeAfIAUATIAUATIAiAjIAEAEIAWAZQAKALAJAHIAGAEIAaAPQAMAHAHAFIAGAEQAVAQASAmIABABQAOAcAFAjIABAKQACAUgCARQgBAKgDAJQgCAJgDAHQgFALgHAHQgPARgWAIQgTAHgYAAIgOAAg");
        var mask_1_graphics_87 = new cjs.Graphics().p("ACGDuIgSgDQgagFgrgQIgOgFQgsgRgvglIgHgGQgqgigqgvIgBgBQgrgsgYgiQgPgWgIgTQgLgZADgdIAAgBQACgXALgfQAEgOAGgHIAAgBQAHgKAOgNQASgOANgGQAMgHAOgDQAMgDAMAAQAbgBAZAJIAQAHQANAHAOALIAJAJIAQAOIAdAeIAUASIATATQAUATAOAPIAEAEIAWAYQAJAKAKAHIAGAEIAYAQQALAHAGAGIAFAEQATASAQAlIABABQAMAbAEAjIABAKQACAVgCAQQgBAJgDAJQgCAJgDAGQgFALgIAGQgOAOgXAGQgQAFgTAAIgVgCg");
        var mask_1_graphics_88 = new cjs.Graphics().p("ACBDlIgRgDQgYgGgsgSIgNgFQgpgSgvgkIgIgGQgsgjgngpIgBgBQgsgrgXggQgPgWgHgTQgKgYAGgcIAAgBQAEgWANgcQAFgMAHgHIAAgBQAJgKAOgLQARgMANgGQANgGANgDQAMgDAMAAQAbgCAXAIIAQAHQAMAHANALIAKAIIANAOIAfAdIATASIATASIAhAhIAEAEIAWAXQAJAKAJAGIAGAEIAXARQAJAHAGAHIAEAEQARAUANAkIABABQAKAaAEAjIABAKQACAVgCAPQgBAKgCAIQgCAIgEAGQgFAKgJAFQgOAMgYAEQgLACgMAAQgPAAgQgDg");
        var mask_1_graphics_89 = new cjs.Graphics().p("AB9DbIgRgEQgWgGgrgUIgNgFQgogTgugjIgHgGQgwglgjgjIgBgBQgtgpgXgfQgOgUgHgTQgIgYAIgcQAGgVARgZQAFgLAIgHIABAAQAJgJAOgKQAQgLAOgGQANgFAMgCQAMgDALgBQAbgCAXAIIAPAGQALAHAOALIAIAIIANANIAfAdIATARIASARQATARANAPIAEAEIAWAWQAKAJAJAHIAFAEIAVASQAIAHAFAGIAEAFQAOAVAMAkIAAABQAIAYAEAlIABAKQABAVgBANQgBAKgCAIQgDAIgDAGQgFAIgKAEQgPAJgYACIgNABQgSAAgVgFg");
        var mask_1_graphics_90 = new cjs.Graphics().p("AB5DRIgRgFQgTgGgsgVIgMgGQglgUgvgiIgHgGQgygmgggeIgBgBQgugngWgdQgOgUgGgSQgGgZAJgaQAIgUAUgWQAHgJAIgHIABAAQALgIANgJQAQgJAPgGQAMgEAMgDIAXgDQAbgCAVAHIAOAGQALAGAMALIAJAIIANAMIAeAcIATARIASAQIAfAfIAEAEIAWAVIASAPIAGAEQAJAHAKAMQAHAHAEAHIADAFQAMAXAJAjIAAABQAGAXAEAlIABAKQABAWgBALQAAAKgDAIQgCAIgEAFQgFAHgLADQgPAHgYAAIgDAAQgWAAgagIg");
        var mask_1_graphics_91 = new cjs.Graphics().p("ACnDSQgXgCgbgJIgQgGQgRgHgsgXIgMgGQgjgUgugiIgHgFQg0gogegZIgBgBQgvgkgVgcQgOgTgEgTQgGgYAMgZQAKgTAXgUQAHgHAKgGIABAAIAYgOQARgJAOgFQANgEAMgCQALgDAKAAQAbgDAVAHIANAFQAKAFAMAMIAIAIIANAMIAeAaIASAQIASAQQASAQAMANIAEAEIAWAVQAJAIAJAGIAGAEQAJAIAIAMQAGAHADAIIACAFQAKAZAHAiIAAABQAEAWADAlIABAKQABAXgBAJQAAAKgDAIQgCAIgEAEQgFAGgLADQgKACgPAAIgPAAg");
        var mask_1_graphics_92 = new cjs.Graphics().p("A7qsEQgdgFgjgQQgOgHgtgZQglgVg2gnIhYhBQgygkgTgbQghgsAZgpQAPgYAqgWQAsgXAlgHQAzgJAdAOQAKAFAMAMIAUATIAwApQAcAYATATQAXAYAUANQAUANAIAdQAJAdAFAlIAFBEQACAXgBAIQgBAVgIAIQgHAHgUAAQgNAAgSgDg");

        this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:-216.0685,y:-117.838}).wait(1).to({graphics:mask_1_graphics_1,x:-409.6523,y:-215.5514}).wait(1).to({graphics:mask_1_graphics_2,x:-410.012,y:-215.8208}).wait(1).to({graphics:mask_1_graphics_3,x:-410.394,y:-215.9853}).wait(1).to({graphics:mask_1_graphics_4,x:-410.7883,y:-216.1053}).wait(1).to({graphics:mask_1_graphics_5,x:-411.2101,y:-216.1995}).wait(1).to({graphics:mask_1_graphics_6,x:-411.6689,y:-216.3026}).wait(1).to({graphics:mask_1_graphics_7,x:-219.0937,y:-121.0043}).wait(1).to({graphics:mask_1_graphics_8,x:-411.3021,y:-216.5355}).wait(1).to({graphics:mask_1_graphics_9,x:-410.4316,y:-216.6984}).wait(1).to({graphics:mask_1_graphics_10,x:-409.5487,y:-216.8844}).wait(1).to({graphics:mask_1_graphics_11,x:-408.6481,y:-217.0126}).wait(1).to({graphics:mask_1_graphics_12,x:-407.7441,y:-217.1754}).wait(1).to({graphics:mask_1_graphics_13,x:-406.825,y:-217.2748}).wait(1).to({graphics:mask_1_graphics_14,x:-216.675,y:-120.6446}).wait(1).to({graphics:null,x:0,y:0}).wait(16).to({graphics:mask_1_graphics_31,x:-211.375,y:-124.526}).wait(1).to({graphics:mask_1_graphics_32,x:-393.6448,y:-230.9894}).wait(1).to({graphics:mask_1_graphics_33,x:-395.1454,y:-232.6555}).wait(1).to({graphics:mask_1_graphics_34,x:-396.6015,y:-234.2936}).wait(1).to({graphics:mask_1_graphics_35,x:-398.0928,y:-235.9477}).wait(1).to({graphics:mask_1_graphics_36,x:-215.6309,y:-127.527}).wait(20).to({graphics:mask_1_graphics_56,x:-215.6309,y:-127.527}).wait(1).to({graphics:mask_1_graphics_57,x:-398.0928,y:-235.9477}).wait(1).to({graphics:mask_1_graphics_58,x:-396.6015,y:-234.2936}).wait(1).to({graphics:mask_1_graphics_59,x:-395.1454,y:-232.6555}).wait(1).to({graphics:mask_1_graphics_60,x:-393.6448,y:-230.9894}).wait(1).to({graphics:mask_1_graphics_61,x:-211.375,y:-124.526}).wait(1).to({graphics:null,x:0,y:0}).wait(16).to({graphics:mask_1_graphics_78,x:-216.675,y:-120.6446}).wait(1).to({graphics:mask_1_graphics_79,x:-406.825,y:-217.2748}).wait(1).to({graphics:mask_1_graphics_80,x:-407.7441,y:-217.1754}).wait(1).to({graphics:mask_1_graphics_81,x:-408.6481,y:-217.0126}).wait(1).to({graphics:mask_1_graphics_82,x:-409.5487,y:-216.8844}).wait(1).to({graphics:mask_1_graphics_83,x:-410.4316,y:-216.6984}).wait(1).to({graphics:mask_1_graphics_84,x:-411.3021,y:-216.5355}).wait(1).to({graphics:mask_1_graphics_85,x:-219.0937,y:-121.0043}).wait(1).to({graphics:mask_1_graphics_86,x:-411.6689,y:-216.3026}).wait(1).to({graphics:mask_1_graphics_87,x:-411.2101,y:-216.1995}).wait(1).to({graphics:mask_1_graphics_88,x:-410.7883,y:-216.1053}).wait(1).to({graphics:mask_1_graphics_89,x:-410.394,y:-215.9853}).wait(1).to({graphics:mask_1_graphics_90,x:-410.012,y:-215.8208}).wait(1).to({graphics:mask_1_graphics_91,x:-409.6523,y:-215.5514}).wait(1).to({graphics:mask_1_graphics_92,x:-216.0685,y:-117.838}).wait(169));

        // OmbreBrase2
        this.instance_40 = new lib.Path_2();
        this.instance_40.setTransform(-375.25,-237.9,0.9999,0.9999,6.2761,0,0,12,13.3);
        this.instance_40.alpha = 0.1016;
        this.instance_40._off = true;

        var maskedShapeInstanceList = [this.instance_40];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(31).to({_off:false},0).to({rotation:-23.7228,x:-386.65,y:-252},5).wait(20).to({rotation:6.2761,x:-375.25,y:-237.9},5).to({_off:true},1).wait(199));

        // ArriereBras
        this.instance_41 = new lib.CachedBmp_295();
        this.instance_41.setTransform(-432.1,-235.6,0.1313,0.1313);

        this.instance_42 = new lib.CachedBmp_294();
        this.instance_42.setTransform(-432.85,-236.55,0.1313,0.1313);

        this.instance_43 = new lib.CachedBmp_293();
        this.instance_43.setTransform(-433.6,-237.45,0.1313,0.1313);

        this.instance_44 = new lib.CachedBmp_292();
        this.instance_44.setTransform(-434.4,-238.35,0.1313,0.1313);

        this.instance_45 = new lib.CachedBmp_291();
        this.instance_45.setTransform(-435.25,-239.25,0.1313,0.1313);

        this.instance_46 = new lib.CachedBmp_290();
        this.instance_46.setTransform(-436.1,-240.1,0.1313,0.1313);

        this.instance_47 = new lib.CachedBmp_289();
        this.instance_47.setTransform(-437.1,-241.05,0.1313,0.1313);

        this.instance_48 = new lib.CachedBmp_288();
        this.instance_48.setTransform(-438.15,-241.95,0.1313,0.1313);

        this.instance_49 = new lib.CachedBmp_287();
        this.instance_49.setTransform(-437.45,-241.8,0.1313,0.1313);

        this.instance_50 = new lib.CachedBmp_286();
        this.instance_50.setTransform(-436.75,-241.65,0.1313,0.1313);

        this.instance_51 = new lib.CachedBmp_285();
        this.instance_51.setTransform(-436.05,-241.55,0.1313,0.1313);

        this.instance_52 = new lib.CachedBmp_284();
        this.instance_52.setTransform(-435.35,-241.4,0.1313,0.1313);

        this.instance_53 = new lib.CachedBmp_283();
        this.instance_53.setTransform(-434.65,-241.3,0.1313,0.1313);

        this.instance_54 = new lib.CachedBmp_282();
        this.instance_54.setTransform(-434,-241.25,0.1313,0.1313);

        this.instance_55 = new lib.CachedBmp_281();
        this.instance_55.setTransform(-433.3,-241.25,0.1313,0.1313);

        this.instance_56 = new lib.CachedBmp_280();
        this.instance_56.setTransform(-422.7,-249,0.1313,0.1313);

        this.instance_57 = new lib.CachedBmp_279();
        this.instance_57.setTransform(-424.4,-250.2,0.1313,0.1313);

        this.instance_58 = new lib.CachedBmp_278();
        this.instance_58.setTransform(-426.1,-251.35,0.1313,0.1313);

        this.instance_59 = new lib.CachedBmp_277();
        this.instance_59.setTransform(-427.75,-252.55,0.1313,0.1313);

        this.instance_60 = new lib.CachedBmp_276();
        this.instance_60.setTransform(-429.45,-253.75,0.1313,0.1313);

        this.instance_61 = new lib.CachedBmp_275();
        this.instance_61.setTransform(-431.2,-255,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_41}]}).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[]},1).to({state:[{t:this.instance_56}]},16).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_59}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_61}]},20).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_59}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_56}]},1).to({state:[]},1).to({state:[{t:this.instance_55}]},16).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_41}]},1).wait(169));

        // Torse
        this.instance_62 = new lib.Torse();
        this.instance_62.setTransform(-449.5,-221.7,1,1,0,0,0,32.4,52.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(261));

        // BrasFond
        this.instance_63 = new lib.CachedBmp_467();
        this.instance_63.setTransform(-431.2,-224.25,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(56).to({_off:true},36).wait(169));

        // Tete
        this.instance_64 = new lib.Tete();
        this.instance_64.setTransform(-436.2,-288.85,1,1,0,0,0,27.9,31.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(19).to({regX:27.8,rotation:-14.9992,x:-442.5,y:-292.95},17).wait(20).to({regX:27.9,rotation:0,x:-436.2,y:-288.85},17).wait(188));

        // BrasFond
        this.instance_65 = new lib.CachedBmp_467();
        this.instance_65.setTransform(-431.2,-224.25,0.1313,0.1313);
        this.instance_65._off = true;

        this.instance_66 = new lib.CachedBmp_442();
        this.instance_66.setTransform(-431.2,-224.25,0.1313,0.1313);
        this.instance_66._off = true;

        this.instance_67 = new lib.CachedBmp_441();
        this.instance_67.setTransform(-431.2,-224.25,0.1313,0.1313);
        this.instance_67._off = true;

        this.instance_68 = new lib.CachedBmp_440();
        this.instance_68.setTransform(-431.2,-224.25,0.1313,0.1313);
        this.instance_68._off = true;

        this.instance_69 = new lib.CachedBmp_466();
        this.instance_69.setTransform(-431.2,-224.2,0.1313,0.1313);
        this.instance_69._off = true;

        this.instance_70 = new lib.CachedBmp_465();
        this.instance_70.setTransform(-431.2,-224.25,0.1313,0.1313);
        this.instance_70._off = true;

        this.instance_71 = new lib.CachedBmp_464();
        this.instance_71.setTransform(-431.2,-224.25,0.1313,0.1313);
        this.instance_71._off = true;

        this.instance_72 = new lib.CachedBmp_405();
        this.instance_72.setTransform(-431.2,-224.2,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_65}]},92).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_65}]},1).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(92).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).wait(3).to({_off:true},1).wait(5).to({_off:false},0).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(93).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(25).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(25).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(25).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(25));
        this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(94).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(27).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(27).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(27).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(26));
        this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(95).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(27));
        this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(99).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(100).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(2));
        this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(101).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},1).wait(3));

        // Capuchon
        this.instance_73 = new lib.CachedBmp_561();
        this.instance_73.setTransform(-326.05,-232.65,0.1313,0.1313);

        this.instance_74 = new lib.CachedBmp_560();
        this.instance_74.setTransform(-326.8,-238.35,0.1313,0.1313);

        this.instance_75 = new lib.CachedBmp_559();
        this.instance_75.setTransform(-336.35,-232.9,0.1313,0.1313);

        this.instance_76 = new lib.CachedBmp_558();
        this.instance_76.setTransform(-338.55,-230.95,0.1313,0.1313);

        this.instance_77 = new lib.CachedBmp_557();
        this.instance_77.setTransform(-328.45,-232.85,0.1313,0.1313);

        this.instance_78 = new lib.Capuchon();
        this.instance_78.setTransform(-325.35,-230.4,1,1,0,0,0,13.3,8);
        this.instance_78._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73}]}).to({state:[{t:this.instance_78}]},14).to({state:[{t:this.instance_78}]},2).to({state:[{t:this.instance_78}]},4).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},2).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},2).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},20).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},2).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},2).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_78}]},4).to({state:[{t:this.instance_78}]},2).wait(183));
        this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(14).to({_off:false},0).to({regY:7.9,rotation:-5.355,x:-330,y:-237.55},2).to({regX:13.2,rotation:-25.0971,x:-341.65,y:-258.05},4).to({scaleX:0.9999,scaleY:0.9999,rotation:-37.6451,x:-349.85,y:-270.65},3).to({regX:13.3,regY:8.1,scaleX:1,scaleY:1,rotation:-54.3939,x:-363.55,y:-281.75},3).to({regY:8,scaleX:0.9999,scaleY:0.9999,rotation:-67.8794,x:-375.15,y:-284.5},2).to({regY:8.2,rotation:-88.1076,x:-394.55,y:-286.6},3).to({rotation:-92.7412,x:-405.9,y:-287.6},2).to({regX:13.2,regY:8,scaleX:1,scaleY:1,rotation:-99.699,x:-422.8,y:-288.1},3).wait(20).to({regX:13.3,regY:8.2,scaleX:0.9999,scaleY:0.9999,rotation:-92.7412,x:-405.9,y:-287.6},3).to({rotation:-88.1076,x:-394.55,y:-286.6},2).to({regY:8,rotation:-67.8794,x:-375.15,y:-284.5},3).to({regY:8.1,scaleX:1,scaleY:1,rotation:-54.3939,x:-363.55,y:-281.75},2).to({regX:13.2,regY:7.9,scaleX:0.9999,scaleY:0.9999,rotation:-37.6451,x:-349.85,y:-270.65},3).to({scaleX:1,scaleY:1,rotation:-25.0971,x:-341.65,y:-258.05},3).to({regX:13.3,rotation:-5.355,x:-330,y:-237.55},4).to({regY:8,rotation:0,x:-325.35,y:-230.4},2).wait(183));

        // Liquide
        this.instance_79 = new lib.CachedBmp_474();
        this.instance_79.setTransform(-336.15,-221.7,0.1313,0.1313);

        this.instance_80 = new lib.CachedBmp_473();
        this.instance_80.setTransform(-336.8,-222.05,0.1313,0.1313);

        this.instance_81 = new lib.Prot();
        this.instance_81.setTransform(-329.4,-211.2,1,1,0,0,0,7.5,10.9);
        this.instance_81._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_80},{t:this.instance_79}]}).to({state:[{t:this.instance_81}]},14).to({state:[{t:this.instance_81}]},2).to({state:[{t:this.instance_81}]},4).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},2).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},2).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},20).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},2).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},2).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},3).to({state:[{t:this.instance_81}]},4).to({state:[{t:this.instance_81}]},2).wait(183));
        this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(14).to({_off:false},0).to({regX:7.4,regY:10.8,rotation:-5.355,x:-332.4,y:-219.4},2).to({rotation:-25.0971,x:-337.55,y:-240.7},4).to({scaleX:0.9999,scaleY:0.9999,rotation:-37.6451,x:-341.65,y:-254.3},3).to({regX:7.5,regY:11,scaleX:1,scaleY:1,rotation:-54.3939,x:-350.3,y:-267.25},3).to({regY:10.9,scaleX:0.9999,scaleY:0.9999,rotation:-67.8794,x:-359.55,y:-273.8},2).to({regX:7.2,regY:11,rotation:-88.1076,x:-375.5,y:-281.7},3).to({regX:7.3,rotation:-92.7412,x:-386.65,y:-284.5},2).to({regX:7.5,scaleX:1,scaleY:1,rotation:-99.699,x:-403.15,y:-287.45},3).wait(20).to({regX:7.3,scaleX:0.9999,scaleY:0.9999,rotation:-92.7412,x:-386.65,y:-284.5},3).to({regX:7.2,rotation:-88.1076,x:-375.5,y:-281.7},2).to({regX:7.5,regY:10.9,rotation:-67.8794,x:-359.55,y:-273.8},3).to({regY:11,scaleX:1,scaleY:1,rotation:-54.3939,x:-350.3,y:-267.25},2).to({regX:7.4,regY:10.8,scaleX:0.9999,scaleY:0.9999,rotation:-37.6451,x:-341.65,y:-254.3},3).to({scaleX:1,scaleY:1,rotation:-25.0971,x:-337.55,y:-240.7},3).to({rotation:-5.355,x:-332.4,y:-219.4},4).to({regX:7.5,regY:10.9,rotation:0,x:-329.4,y:-211.2},2).wait(183));

        // Shaker
        this.instance_82 = new lib.CachedBmp_1160();
        this.instance_82.setTransform(-338.3,-225.6,0.1313,0.1313);

        this.instance_83 = new lib.Shaker();
        this.instance_83.setTransform(-329.15,-212.65,1,1,0,0,0,9.2,13);
        this.instance_83._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_82}]}).to({state:[{t:this.instance_83}]},14).to({state:[{t:this.instance_83}]},2).to({state:[{t:this.instance_83}]},4).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},2).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},2).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},20).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},2).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},2).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},3).to({state:[{t:this.instance_83}]},4).to({state:[{t:this.instance_83}]},2).wait(183));
        this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(14).to({_off:false},0).to({regX:9.1,regY:12.9,rotation:-5.355,x:-332.25,y:-220.75},2).to({regX:9.2,regY:13,rotation:-25.0971,x:-337.85,y:-241.95},4).to({scaleX:0.9999,scaleY:0.9999,rotation:-37.6451,x:-342.3,y:-255.45},3).to({regX:9.1,regY:13.1,scaleX:1,scaleY:1,rotation:-54.3939,x:-351.45,y:-268.2},3).to({regX:9.2,scaleX:0.9999,scaleY:0.9999,rotation:-67.8794,x:-360.85,y:-274.65},2).to({regY:13,rotation:-88.1076,x:-377.1,y:-282.2},3).to({rotation:-92.7412,x:-388.15,y:-284.65},2).to({regX:9.1,scaleX:1,scaleY:1,rotation:-99.699,x:-404.75,y:-287.35},3).wait(20).to({regX:9.2,scaleX:0.9999,scaleY:0.9999,rotation:-92.7412,x:-388.15,y:-284.65},3).to({rotation:-88.1076,x:-377.1,y:-282.2},2).to({regY:13.1,rotation:-67.8794,x:-360.85,y:-274.65},3).to({regX:9.1,scaleX:1,scaleY:1,rotation:-54.3939,x:-351.45,y:-268.2},2).to({regX:9.2,regY:13,scaleX:0.9999,scaleY:0.9999,rotation:-37.6451,x:-342.3,y:-255.45},3).to({scaleX:1,scaleY:1,rotation:-25.0971,x:-337.85,y:-241.95},3).to({regX:9.1,regY:12.9,rotation:-5.355,x:-332.25,y:-220.75},4).to({regX:9.2,regY:13,rotation:0,x:-329.15,y:-212.65},2).wait(183));

        // Calque_32
        this.instance_84 = new lib.CachedBmp_477();
        this.instance_84.setTransform(-448.85,-294.45,0.1313,0.1313);

        this.instance_85 = new lib.CachedBmp_476();
        this.instance_85.setTransform(-449.6,-318.95,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_85},{t:this.instance_84}]}).wait(261));

        // Ombre_bras
        this.instance_86 = new lib.CachedBmp_491();
        this.instance_86.setTransform(-399.2,-212.6,0.1313,0.1313);

        this.instance_87 = new lib.CachedBmp_490();
        this.instance_87.setTransform(-399.6,-213.15,0.1313,0.1313);

        this.instance_88 = new lib.CachedBmp_489();
        this.instance_88.setTransform(-400,-213.65,0.1313,0.1313);

        this.instance_89 = new lib.CachedBmp_488();
        this.instance_89.setTransform(-400.4,-214.15,0.1313,0.1313);

        this.instance_90 = new lib.CachedBmp_487();
        this.instance_90.setTransform(-400.8,-214.7,0.1313,0.1313);

        this.instance_91 = new lib.CachedBmp_486();
        this.instance_91.setTransform(-401.2,-215.2,0.1313,0.1313);

        this.instance_92 = new lib.CachedBmp_485();
        this.instance_92.setTransform(-401.6,-215.75,0.1313,0.1313);

        this.instance_93 = new lib.Ombre();
        this.instance_93.setTransform(-366.85,-193.65,1,1,0,0,0,43.5,15.9);
        this.instance_93._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_86}]}).to({state:[{t:this.instance_87}]},1).to({state:[{t:this.instance_88}]},1).to({state:[{t:this.instance_89}]},1).to({state:[{t:this.instance_90}]},1).to({state:[{t:this.instance_91}]},1).to({state:[{t:this.instance_92}]},1).to({state:[{t:this.instance_93}]},1).to({state:[{t:this.instance_93}]},8).to({state:[{t:this.instance_93}]},11).to({state:[]},1).to({state:[{t:this.instance_93}]},39).to({state:[{t:this.instance_93}]},11).to({state:[{t:this.instance_92}]},9).to({state:[{t:this.instance_91}]},1).to({state:[{t:this.instance_90}]},1).to({state:[{t:this.instance_89}]},1).to({state:[{t:this.instance_88}]},1).to({state:[{t:this.instance_87}]},1).to({state:[{t:this.instance_86}]},1).wait(169));
        this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(7).to({_off:false},0).wait(8).to({x:-373,y:-185.45,alpha:0},11).to({_off:true},1).wait(39).to({_off:false},0).to({x:-366.85,y:-193.65,alpha:1},11).to({_off:true},9).wait(175));

        // Ordinateur
        this.instance_94 = new lib.CachedBmp_1122();
        this.instance_94.setTransform(-364.4,-240.8,0.1313,0.1313);

        this.instance_95 = new lib.CachedBmp_1121();
        this.instance_95.setTransform(-363.5,-244.15,0.1313,0.1313);

        this.instance_96 = new lib.CachedBmp_1120();
        this.instance_96.setTransform(-365.65,-235.8,0.1313,0.1313);

        this.instance_97 = new lib.CachedBmp_1119();
        this.instance_97.setTransform(-366.05,-234.1,0.1313,0.1313);

        this.instance_98 = new lib.CachedBmp_1118();
        this.instance_98.setTransform(-367.45,-232.55,0.1313,0.1313);

        this.instance_99 = new lib.CachedBmp_1117();
        this.instance_99.setTransform(-366.15,-237.55,0.1313,0.1313);

        this.instance_100 = new lib.CachedBmp_1116();
        this.instance_100.setTransform(-365.75,-239.25,0.1313,0.1313);

        this.instance_101 = new lib.CachedBmp_1115();
        this.instance_101.setTransform(-364.9,-242.6,0.1313,0.1313);

        this.instance_102 = new lib.CachedBmp_1114();
        this.instance_102.setTransform(-364.05,-245.95,0.1313,0.1313);

        this.instance_103 = new lib.CachedBmp_1113();
        this.instance_103.setTransform(-363.15,-220.65,0.1313,0.1313);

        this.instance_104 = new lib.CachedBmp_1112();
        this.instance_104.setTransform(-362.8,-221.95,0.1313,0.1313);

        this.instance_105 = new lib.CachedBmp_1111();
        this.instance_105.setTransform(-362.45,-223.2,0.1313,0.1313);

        this.instance_106 = new lib.CachedBmp_1110();
        this.instance_106.setTransform(-362.15,-224.5,0.1313,0.1313);

        this.instance_107 = new lib.CachedBmp_1111();
        this.instance_107.setTransform(-361.8,-225.8,0.1313,0.1313);

        this.instance_108 = new lib.CachedBmp_1108();
        this.instance_108.setTransform(-361.45,-227.1,0.1313,0.1313);

        this.instance_109 = new lib.CachedBmp_1111();
        this.instance_109.setTransform(-361.1,-228.35,0.1313,0.1313);

        this.instance_110 = new lib.CachedBmp_1111();
        this.instance_110.setTransform(-360.8,-229.65,0.1313,0.1313);

        this.instance_111 = new lib.CachedBmp_1105();
        this.instance_111.setTransform(-360.45,-230.9,0.1313,0.1313);

        this.instance_112 = new lib.CachedBmp_1111();
        this.instance_112.setTransform(-360.1,-232.2,0.1313,0.1313);

        this.instance_113 = new lib.CachedBmp_1111();
        this.instance_113.setTransform(-359.8,-233.5,0.1313,0.1313);

        this.instance_114 = new lib.CachedBmp_1102();
        this.instance_114.setTransform(-359.45,-234.75,0.1313,0.1313);

        this.instance_115 = new lib.CachedBmp_1102();
        this.instance_115.setTransform(-359.1,-236.05,0.1313,0.1313);

        this.instance_116 = new lib.CachedBmp_1100();
        this.instance_116.setTransform(-358.8,-237.35,0.1313,0.1313);

        this.instance_117 = new lib.CachedBmp_1100();
        this.instance_117.setTransform(-358.45,-238.65,0.1313,0.1313);

        this.instance_118 = new lib.CachedBmp_1098();
        this.instance_118.setTransform(-358.1,-239.9,0.1313,0.1313);

        this.instance_119 = new lib.CachedBmp_1111();
        this.instance_119.setTransform(-357.8,-241.2,0.1313,0.1313);

        this.instance_120 = new lib.CachedBmp_1096();
        this.instance_120.setTransform(-357.45,-242.5,0.1313,0.1313);

        this.instance_121 = new lib.CachedBmp_1095();
        this.instance_121.setTransform(-357.1,-243.75,0.1313,0.1313);

        this.instance_122 = new lib.CachedBmp_1096();
        this.instance_122.setTransform(-356.8,-245.05,0.1313,0.1313);

        this.instance_123 = new lib.CachedBmp_1111();
        this.instance_123.setTransform(-356.45,-246.35,0.1313,0.1313);

        this.instance_124 = new lib.CachedBmp_1092();
        this.instance_124.setTransform(-328.8,-247.85,0.1313,0.1313);

        this.instance_125 = new lib.CachedBmp_1091();
        this.instance_125.setTransform(-327.4,-247.8,0.1313,0.1313);

        this.instance_126 = new lib.CachedBmp_1090();
        this.instance_126.setTransform(-326,-247.75,0.1313,0.1313);

        this.instance_127 = new lib.CachedBmp_1089();
        this.instance_127.setTransform(-367.45,-234.55,0.1313,0.1313);

        this.instance_128 = new lib.CachedBmp_1088();
        this.instance_128.setTransform(-367,-236.2,0.1313,0.1313);

        this.instance_129 = new lib.CachedBmp_1087();
        this.instance_129.setTransform(-365.7,-241.25,0.1313,0.1313);

        this.instance_130 = new lib.CachedBmp_1086();
        this.instance_130.setTransform(-364.85,-244.6,0.1313,0.1313);

        this.instance_131 = new lib.CachedBmp_1085();
        this.instance_131.setTransform(-368.8,-232.85,0.1313,0.1313);

        this.instance_132 = new lib.CachedBmp_1084();
        this.instance_132.setTransform(-367.55,-237.9,0.1313,0.1313);

        this.instance_133 = new lib.CachedBmp_1085();
        this.instance_133.setTransform(-367.1,-239.55,0.1313,0.1313);

        this.instance_134 = new lib.CachedBmp_1082();
        this.instance_134.setTransform(-366.25,-242.95,0.1313,0.1313);

        this.instance_135 = new lib.CachedBmp_1081();
        this.instance_135.setTransform(-365.4,-246.3,0.1313,0.1313);

        this.instance_136 = new lib.CachedBmp_1080();
        this.instance_136.setTransform(-364.5,-246.65,0.1313,0.1313);

        this.instance_137 = new lib.CachedBmp_1079();
        this.instance_137.setTransform(-372.8,-247.7,0.1313,0.1313);

        this.instance_138 = new lib.CachedBmp_1078();
        this.instance_138.setTransform(-365.95,-249.6,0.1313,0.1313);

        this.instance_139 = new lib.CachedBmp_1077();
        this.instance_139.setTransform(-389.5,-216.3,0.1313,0.1313);

        this.instance_140 = new lib.CachedBmp_1076();
        this.instance_140.setTransform(-392.7,-213.8,0.1313,0.1313);

        this.instance_141 = new lib.CachedBmp_1075();
        this.instance_141.setTransform(-348.65,-252.65,0.1313,0.1313);

        this.instance_142 = new lib.CachedBmp_1074();
        this.instance_142.setTransform(-405,-213.4,0.1313,0.1313);

        this.instance_143 = new lib.CachedBmp_1073();
        this.instance_143.setTransform(-405,-217,0.1313,0.1313);

        this.instance_144 = new lib.CachedBmp_1072();
        this.instance_144.setTransform(-405,-214.45,0.1313,0.1313);

        this.instance_145 = new lib.CachedBmp_1071();
        this.instance_145.setTransform(-376.8,-253.45,0.1313,0.1313);

        this.instance_146 = new lib.CachedBmp_1070();
        this.instance_146.setTransform(-331,-251.5,0.1313,0.1313);

        this.instance_147 = new lib.CachedBmp_1069();
        this.instance_147.setTransform(-405,-217,0.1313,0.1313);

        this.instance_148 = new lib.PC();
        this.instance_148.setTransform(-362.45,-228.2,1,1,0,0,0,42.6,25.3);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94}]}).to({state:[{t:this.instance_148}]},92).wait(169));

        // Ombre_Shaker
        this.instance_149 = new lib.CachedBmp_546();
        this.instance_149.setTransform(-343.95,-205.5,0.1313,0.1313);

        this.instance_150 = new lib.CachedBmp_547();
        this.instance_150.setTransform(-343.95,-205.55,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_149}]}).to({state:[]},7).to({state:[{t:this.instance_150}]},79).wait(175));

        // Ombre_ordinateur
        this.instance_151 = new lib.CachedBmp_548();
        this.instance_151.setTransform(-418.7,-211.15,0.1313,0.1313);

        this.timeline.addTween(cjs.Tween.get(this.instance_151).wait(261));

        // Bulle_swift
        this.instance_152 = new lib.Bulle_swift_animation();
        this.instance_152.setTransform(-357.15,-247.95,0.1345,0.1345,14.9992,0,0,109.7,168);
        this.instance_152._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_152).wait(194).to({_off:false},0).to({_off:true},57).wait(10));

        // Bulle_flutter
        this.instance_153 = new lib.Bulle_flutter_animation();
        this.instance_153.setTransform(-327.55,-248,0.1345,0.1345,-14.9992,0,0,110.2,167.7);
        this.instance_153._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_153).wait(179).to({_off:false},0).to({_off:true},57).wait(25));

        // Bulle_java
        this.instance_154 = new lib.Bulle_java_animation();
        this.instance_154.setTransform(-339.55,-247.95,0.1345,0.1345,14.9992,0,0,109.7,168);
        this.instance_154._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_154).wait(163).to({_off:false},0).to({_off:true},57).wait(41));

        // Bulle_mysql
        this.instance_155 = new lib.Bulle_mysql_animation();
        this.instance_155.setTransform(-352.4,-248,0.1345,0.1345,14.9992,0,0,109.7,168);
        this.instance_155._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_155).wait(149).to({_off:false},0).to({_off:true},57).wait(55));

        // Bulle_symfony
        this.instance_156 = new lib.Bulle_symfony_animation();
        this.instance_156.setTransform(-348.2,-247.95,0.1345,0.1345,14.9992,0,0,105.8,167.9);
        this.instance_156._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_156).wait(134).to({_off:false},0).to({_off:true},57).wait(70));

        // Bulle_dotnet
        this.instance_157 = new lib.Bulle_dotnet_animation();
        this.instance_157.setTransform(-339.8,-273.6,0.1345,0.1345,14.9992);
        this.instance_157._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_157).wait(118).to({_off:false},0).to({_off:true},57).wait(86));

        // Bulle_php
        this.instance_158 = new lib.Bulle_php_animation();
        this.instance_158.setTransform(-355.1,-248,0.1345,0.1345,-15.0009,0,0,109.4,167.5);
        this.instance_158._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_158).wait(104).to({_off:false},0).to({_off:true},57).wait(100));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-497,-330.7,184.89999999999998,164.89999999999998);


// stage content:
    (lib.Moi_FullSize = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.Animation();
        this.instance.setTransform(400.4,312.2,3.8068,3.8068,0,0,0,-396.9,-245.1);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(419.1,313.5,304.1,300.29999999999995);
// library properties:
    lib.properties = {
        id: 'D3CB6FFFDF67F64A8559800DB3246B17',
        width: 800,
        height: 600,
        fps: 24,
        color: "#FFFFFF",
        opacity: 0.00,
        manifest: [
            {src:"/images/Moi_FullSize_atlas_.png?1598961538419", id:"Moi_FullSize_atlas_"},
            {src:"/images/Moi_FullSize_atlas_2.png?1598961538421", id:"Moi_FullSize_atlas_2"},
            {src:"/images/Moi_FullSize_atlas_3.png?1598961538424", id:"Moi_FullSize_atlas_3"},
            {src:"/images/Moi_FullSize_atlas_4.png?1598961538444", id:"Moi_FullSize_atlas_4"}
        ],
        preloads: []
    };



// bootstrap callback support:

    (lib.Stage = function(canvas) {
        createjs.Stage.call(this, canvas);
    }).prototype = p = new createjs.StageGL();

    p.setAutoPlay = function(autoPlay) {
        this.tickEnabled = autoPlay;
    }
    p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
    p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
    p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
    p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

    p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

    an.bootcompsLoaded = an.bootcompsLoaded || [];
    if(!an.bootstrapListeners) {
        an.bootstrapListeners=[];
    }

    an.bootstrapCallback=function(fnCallback) {
        an.bootstrapListeners.push(fnCallback);
        if(an.bootcompsLoaded.length > 0) {
            for(var i=0; i<an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i]);
            }
        }
    };

    an.compositions = an.compositions || {};
    an.compositions['D3CB6FFFDF67F64A8559800DB3246B17'] = {
        getStage: function() { return exportRoot.stage; },
        getLibrary: function() { return lib; },
        getSpriteSheet: function() { return ss; },
        getImages: function() { return img; }
    };

    an.compositionLoaded = function(id) {
        an.bootcompsLoaded.push(id);
        for(var j=0; j<an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id);
        }
    }

    an.getComposition = function(id) {
        return an.compositions[id];
    }


    an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers, stage) {
        var lastW, lastH, lastS=1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        function resizeCanvas() {
            var w = lib.properties.width, h = lib.properties.height;
            var iw = window.innerWidth, ih=window.innerHeight;
            var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
            if(isResp) {
                if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
                    sRatio = lastS;
                }
                else if(!isScale) {
                    if(iw<w || ih<h)
                        sRatio = Math.min(xRatio, yRatio);
                }
                else if(scaleType==1) {
                    sRatio = Math.min(xRatio, yRatio);
                }
                else if(scaleType==2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            domContainers[0].width = w * pRatio * sRatio;
            domContainers[0].height = h * pRatio * sRatio;
            domContainers.forEach(function(container) {
                container.style.width = w * sRatio + 'px';
                container.style.height = h * sRatio + 'px';
            });
            stage.scaleX = pRatio*sRatio;
            stage.scaleY = pRatio*sRatio;
            lastW = iw; lastH = ih; lastS = sRatio;
            stage.tickOnUpdate = false;
            stage.update();
            stage.tickOnUpdate = true;
        }
    }


})(createjs = createjs||{}, computer_AdobeAn = computer_AdobeAn||{});
var computer_AdobeAn;
