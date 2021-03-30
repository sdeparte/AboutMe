import $ from 'jquery';

import * as createjs from './createJs/createJs';
window.createjs = createjs;

$( document ).ready(function() {
    me360_init();
});

var me360_canvas, me360_stage, me360_exportRoot, me360_global_container, me360_anim_container, me360_dom_overlay_container, me360_fnStartAnimation;

function me360_init() {
    me360_global_container = document.getElementById("me360_global_container");
    me360_canvas = document.getElementById("me360_canvas");
    me360_anim_container = document.getElementById("me360_animation_container");
    me360_dom_overlay_container = document.getElementById("me360_dom_overlay_container");

    var comp = me360_AdobeAn.getComposition("0DC0512330095746904ADBBCC0C52CEA");
    var lib = comp.getLibrary();
    var loader = new createjs.LoadQueue(true);
    loader.addEventListener("fileload", function(evt){me360_handleFileLoad(evt,comp);});
    loader.addEventListener("complete", function(evt){me360_handleComplete(evt,comp);});

    loader.loadManifest(lib.properties.manifest);
}

function me360_handleFileLoad(evt, comp) {
    var images = comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}

function me360_handleComplete(evt,comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp.getLibrary();
    var ss = comp.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;

    for (var i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
    }

    me360_exportRoot = new lib.test();
    me360_stage = new lib.Stage(me360_canvas);

    //Registers the "tick" event listener.
    me360_fnStartAnimation = function() {
        me360_stage.addChild(me360_exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", me360_stage);
    }

    //Code to support hicodpi screens and responsive scaling.
    me360_AdobeAn.makeResponsive(false,'both',false,1,[me360_canvas,me360_anim_container,me360_dom_overlay_container],me360_stage);
    me360_AdobeAn.compositionLoaded(lib.properties.id);
    me360_fnStartAnimation();

    setTimeout(function(){
        var animationHandler = $(me360_global_container).data('animation-handler');

        if (animationHandler === undefined) {
            $(me360_global_container).removeClass('wait-load');
        } else {
            $('#' + animationHandler).removeClass('wait-load');
        }
    }, 250);
}

(function (cjs, an) {

    var p; // shortcut to reference prototypes
    var lib={};var ss={};var img={};
    lib.ssMetadata = [
        {name:"test_atlas_", frames: [[0,0,1210,436],[0,438,1081,429],[0,1300,1126,393],[0,869,1081,429]]},
        {name:"test_atlas_2", frames: [[997,1356,560,553],[1159,0,810,462],[0,1591,735,426],[0,763,995,412],[0,395,1157,366],[0,0,1126,393],[0,1177,995,412],[997,928,735,426],[1159,464,810,462]]},
        {name:"test_atlas_3", frames: [[945,1547,500,435],[1398,594,566,496],[974,866,415,589],[1391,1092,483,453],[0,866,511,503],[457,1417,486,487],[1398,0,495,592],[513,866,459,549],[1447,1547,472,457],[0,1371,455,553],[0,441,697,423],[0,0,684,439],[686,0,684,439],[699,441,697,423]]},
        {name:"test_atlas_4", frames: [[802,1393,405,469],[1326,465,356,522],[1209,1360,347,541],[0,966,433,486],[0,460,419,504],[434,1454,366,553],[0,1454,432,472],[421,465,441,462],[1558,989,435,426],[1392,0,454,463],[924,0,466,452],[864,465,446,446],[878,913,446,445],[0,0,464,458],[466,0,456,463],[1558,1417,435,426],[435,929,441,462]]},
        {name:"test_atlas_5", frames: [[367,0,426,427],[795,0,442,411],[0,1001,429,383],[1239,0,439,405],[0,507,345,492],[1591,503,402,423],[367,429,312,550],[1373,928,327,508],[0,0,365,505],[1702,928,300,526],[0,1386,330,471],[1708,1456,327,438],[1020,1403,342,431],[332,1386,342,434],[1680,0,350,501],[681,909,344,491],[795,413,349,494],[1027,910,344,491],[1239,407,350,501],[676,1402,342,434],[1364,1456,342,431]]},
        {name:"test_atlas_6", frames: [[0,1275,375,363],[1665,0,349,381],[1242,643,432,285],[0,0,377,378],[443,1609,328,393],[287,380,345,382],[0,1640,441,307],[1242,334,418,307],[1072,1381,247,476],[0,874,345,399],[0,380,285,492],[773,1381,297,404],[377,1187,309,420],[1703,1161,273,421],[634,334,302,425],[1676,383,309,387],[688,1071,412,308],[811,0,425,332],[1321,1254,363,322],[379,0,430,331],[1321,1578,380,306],[1238,0,425,332],[1102,930,364,322],[658,761,413,308],[1676,772,309,387],[1703,1584,273,421],[938,334,302,425],[347,764,309,421]]},
        {name:"test_atlas_7", frames: [[302,684,256,373],[994,1302,162,326],[1363,1162,162,314],[672,978,320,190],[674,1360,318,177],[213,1107,267,314],[961,1845,221,178],[1184,1747,194,202],[1166,1160,195,270],[674,1735,285,190],[1158,1432,184,267],[1344,1478,184,267],[235,1423,183,446],[835,775,378,201],[1837,1196,209,191],[0,1568,233,415],[1805,560,218,321],[0,1107,211,459],[420,1738,252,286],[1527,1215,263,183],[1255,557,273,290],[1645,883,190,330],[623,312,295,341],[674,1539,289,194],[420,1423,252,313],[965,1630,190,213],[1837,883,181,311],[672,1170,305,188],[0,780,300,325],[994,978,170,322],[1704,1400,227,181],[1704,1583,214,187],[1530,1400,172,251],[482,1059,188,353],[623,0,328,310],[1341,265,303,290],[1430,852,213,308],[1530,560,273,290],[0,0,290,388],[1380,1747,224,173],[920,512,333,261],[292,0,329,340],[1325,0,369,263],[953,267,386,243],[953,0,370,265],[1696,0,333,266],[292,342,329,340],[1606,1772,224,173],[0,390,290,388],[560,684,273,290],[1646,268,303,290],[1215,849,213,309]]},
        {name:"test_atlas_8", frames: [[1317,678,54,189],[434,157,110,211],[0,829,78,30],[171,600,130,95],[541,656,128,96],[294,1020,44,138],[226,387,89,211],[171,697,92,124],[1681,513,28,50],[1449,340,113,174],[1424,500,21,13],[1424,436,21,20],[1424,480,23,18],[265,697,36,29],[434,370,106,48],[1232,1075,60,92],[1996,0,50,150],[107,326,37,94],[1852,803,111,85],[237,0,204,149],[1294,1084,88,62],[595,213,20,7],[1731,710,182,61],[846,1114,61,69],[948,864,229,40],[340,1020,72,28],[1915,710,122,91],[671,663,126,95],[1770,243,101,205],[443,0,190,155],[1564,455,129,56],[434,537,105,128],[1250,917,130,62],[1996,229,43,13],[741,444,93,63],[714,760,65,37],[915,970,81,92],[1385,584,79,167],[1130,752,105,96],[546,226,113,199],[1880,1123,47,69],[546,157,86,54],[1770,469,187,32],[1655,0,123,215],[107,447,103,142],[1382,917,113,71],[948,849,31,12],[340,1050,75,21],[617,213,14,9],[1385,524,28,50],[1780,0,107,241],[1040,726,21,13],[1424,458,21,20],[1449,261,23,21],[330,865,23,18],[1525,828,36,29],[604,1077,60,92],[997,101,108,234],[616,509,180,91],[237,151,108,234],[1107,190,344,69],[1573,950,88,89],[765,0,123,232],[1458,828,65,37],[1250,981,81,92],[530,754,105,96],[183,994,67,107],[252,994,40,153],[1711,217,57,368],[915,1064,78,75],[512,1102,86,54],[890,0,283,99],[1564,440,38,12],[302,951,115,67],[1384,1084,170,32],[1512,1141,72,28],[1466,735,122,91],[402,667,126,95],[1129,906,46,157],[550,1038,179,37],[0,326,105,189],[1333,990,129,56],[1689,885,76,115],[1475,0,178,152],[1767,890,139,62],[1179,850,47,20],[1749,1023,93,63],[1453,190,10,48],[1889,0,105,243],[1731,649,210,59],[845,234,41,98],[890,101,105,243],[1075,451,119,143],[741,234,102,208],[1424,516,255,66],[1107,101,66,86],[1908,890,26,16],[1908,908,27,15],[1170,1135,32,95],[87,1018,67,92],[731,1014,59,109],[1064,596,86,146],[635,0,128,224],[1107,261,106,188],[434,427,180,108],[340,1136,166,20],[1449,284,10,48],[0,0,235,153],[714,802,94,101],[1564,340,41,98],[1976,507,72,189],[1939,1093,47,101],[1152,678,163,72],[1384,1118,203,21],[1996,152,47,75],[0,995,85,81],[999,522,63,202],[347,151,85,275],[948,667,43,42],[1475,154,135,184],[1663,1002,84,81],[1294,524,89,152],[147,155,77,290],[666,1077,61,84],[1839,450,27,16],[792,1081,52,93],[1093,1050,34,167],[0,689,82,138],[169,823,90,37],[317,428,115,163],[0,1078,61,84],[265,728,27,16],[355,828,160,58],[0,155,145,169],[1453,240,14,14],[887,667,59,197],[1936,890,26,16],[0,517,84,170],[1497,917,27,15],[909,1141,32,95],[1545,885,142,63],[810,802,69,135],[1612,154,38,48],[995,1115,77,59],[1466,584,87,148],[1590,738,78,134],[1984,949,54,142],[800,939,57,140],[1022,906,102,84],[1647,1122,83,51],[1965,803,61,144],[1770,507,204,86],[1177,1014,53,119],[1075,337,27,104],[541,537,60,61],[845,334,19,7],[86,591,83,152],[1731,595,242,52],[616,427,32,72],[799,663,86,137],[1215,261,115,173],[1461,315,11,9],[183,909,39,83],[226,155,8,8],[1908,949,74,107],[1461,284,11,29],[1175,0,148,188],[901,522,96,143],[1333,1059,262,23],[1670,738,54,25],[1363,1161,67,15],[798,522,101,139],[1817,1123,61,69],[1555,584,86,149],[1612,204,17,11],[0,867,229,40],[1770,450,67,16],[721,905,77,107],[402,593,30,29],[845,346,113,174],[1040,744,88,118],[1767,954,115,67],[948,711,35,12],[151,1159,91,20],[1237,752,75,131],[1647,1088,170,32],[317,408,28,18],[1943,690,27,18],[609,852,26,18],[1563,828,25,18],[84,745,83,120],[156,1103,86,54],[661,226,78,281],[580,905,139,62],[998,992,129,56],[798,509,44,10],[1670,773,89,110],[231,865,69,127],[998,1050,93,63],[340,1158,112,17],[107,422,28,18],[1943,669,26,19],[302,865,26,18],[1250,885,25,18],[1612,217,97,236],[302,888,143,61],[355,764,161,62],[546,213,47,11],[948,726,90,121],[1384,1141,126,18],[1681,565,28,18],[580,852,27,18],[881,866,26,18],[1277,885,25,18],[1597,1041,48,119],[447,888,68,126],[881,906,139,62],[419,1016,129,56],[1972,698,44,10],[1179,885,69,127],[1844,1058,93,63],[454,1158,112,17],[317,387,27,19],[909,866,26,18],[580,872,26,18],[881,886,25,18],[1761,773,89,110],[1873,245,91,222],[637,760,75,131],[580,969,115,67],[340,1102,170,32],[355,747,35,12],[1373,753,83,120],[244,1160,91,20],[63,1112,86,54],[1943,649,28,18],[1545,859,27,18],[608,872,26,18],[908,886,25,18],[1966,245,77,260],[729,1125,61,69],[1643,587,86,149],[1631,204,17,11],[1314,875,229,40],[104,909,77,107],[402,624,30,29],[1294,1148,67,16],[960,346,113,174],[265,747,88,116],[1196,524,96,143],[1129,1065,39,83],[226,165,8,8],[1497,950,74,107],[212,447,11,26],[1325,0,148,188],[340,1077,262,23],[1852,773,54,25],[1432,1161,67,15],[317,593,83,152],[541,602,242,52],[1152,596,31,72],[1332,261,115,173],[1461,326,11,9],[517,852,61,144],[1215,436,207,86],[943,1141,27,104],[1988,1093,60,61],[866,334,19,7],[859,970,54,142],[0,909,102,84],[1732,1122,83,51]]}
    ];


// symbols:



    (lib.CachedBmp_834 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_833 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_832 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_831 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_830 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_829 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_828 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_827 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_826 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_825 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_824 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_823 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_822 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_821 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_820 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_819 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_818 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_817 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_816 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_815 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_814 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_813 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_812 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_811 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_810 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_809 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_808 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_807 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_806 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_805 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_804 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_803 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_802 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_801 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_800 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_799 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_798 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_797 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(21);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_796 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(22);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_795 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(23);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_794 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(24);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_793 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_792 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(25);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_791 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_790 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(26);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_789 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(27);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_788 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_787 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_786 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_785 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(28);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_784 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_783 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(29);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_782 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(30);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_781 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(31);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_780 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_779 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(32);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_778 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(33);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_777 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(34);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_776 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(35);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_775 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(36);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_774 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(37);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_773 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(38);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_772 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_771 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(39);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_770 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(40);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_769 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_768 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_767 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_766 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(41);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_765 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(42);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_764 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(43);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_763 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(44);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_762 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_761 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(45);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_760 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(46);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_759 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(47);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_758 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(48);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_757 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(49);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_756 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(50);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_755 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(51);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_754 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(52);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_753 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(53);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_752 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(54);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_751 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(55);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_750 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(56);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_749copy = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(57);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_748 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_747 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_746 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(58);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_749 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(59);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_744 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_743 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(60);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_742 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(61);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_741 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(62);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_740 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_739 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_738 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(63);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_737 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(64);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_736 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_735 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(65);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_734 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(66);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_733 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(67);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_732 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(68);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_731 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_730 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_729 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_728 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(69);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_727 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(70);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_726 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(71);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_725 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_724 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(72);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_723 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(73);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_722 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(74);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_721 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(75);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_720 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(76);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_719 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(77);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_718 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_717 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_716 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(78);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_715 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_714 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_713 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(79);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_712 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(80);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_711 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(81);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_710 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(82);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_709 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(83);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_708 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(84);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_707 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(85);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_706 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(86);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_705 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(87);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_704copy = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(88);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_703 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(89);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_702 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(90);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_701 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_700 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_704 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(91);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_698 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(92);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_697 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(21);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_696 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(93);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_695 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(94);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_694 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_693 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(95);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_692 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(22);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_691 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(96);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_690 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(97);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_689 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(98);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_688 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(99);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_687 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(23);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_686 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(100);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_685 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_684 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(101);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_683 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(102);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_682 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(103);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_681 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(104);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_680 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(105);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_679 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_678 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(106);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_677 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(107);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_676 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(108);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_675 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(109);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_674 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(110);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_673 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(24);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_672 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(111);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_671 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(25);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_670 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(26);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_669 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(112);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_668 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(27);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_667 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(113);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_666 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(114);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_665 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_664 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(115);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_663 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(28);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_662 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_661 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(116);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_660 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(117);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_659 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(118);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_658 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(119);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_657 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_656 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(120);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_655 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_654 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_653 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(121);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_652 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(29);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_651 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(122);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_650 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_649 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(123);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_648 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(124);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_647 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(30);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_646 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(125);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_645 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_644 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(126);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_643 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(127);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_642 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(31);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_641 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(128);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_640 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(129);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_639 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_638 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(130);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_637 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(131);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_636 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(132);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_635 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_634 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(133);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_633 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(134);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_632 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_631 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(32);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_630 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(135);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_629 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_628 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(136);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_627 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(137);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_626 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(138);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_625 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(139);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_624 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(140);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_623 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_622 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_621 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(141);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_620 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(33);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_619 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(142);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_618 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(143);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_617 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_616 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1026 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1025 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(144);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1024 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(145);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1023 = function() {
        this.initialize(ss["test_atlas_"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1022 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(34);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1021 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(146);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1020 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1019 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(147);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1018 = function() {
        this.initialize(ss["test_atlas_"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1017 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(35);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1016 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(148);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1015 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(36);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1014 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(149);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1013 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(150);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1012 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(151);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1011 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1010 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1009 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(152);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1008 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(37);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1007 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1006 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(153);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1005 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(154);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1004 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(155);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1003 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(156);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1002 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(157);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1001 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(158);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_1000 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_999 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(159);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_998 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_997 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_996 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(160);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_995 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_994 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(161);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_993 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(162);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_992 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(163);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_991 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(164);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_990 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(165);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_989 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_988 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(166);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_987 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(167);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_986 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(168);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_985 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(169);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_984 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(170);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_983 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_982 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_981 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(171);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_980 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(38);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_979 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(172);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_978 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(173);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_977 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(174);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_976 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_974 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(175);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_973 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(176);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_975 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(177);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_971 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(178);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_970 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_969 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_968 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_967 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(179);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_966 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(39);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_965 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(180);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_964 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(181);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_963 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(182);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_962 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(183);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_961 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(184);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_960 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(185);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_959 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(186);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_958 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(187);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_957 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(188);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_956 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(189);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_955 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(40);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_954 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_953 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(190);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_952 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(191);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_951 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_950 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(41);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_949 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_948 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(192);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_947 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(193);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_946 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(194);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_945 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(195);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_944 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(196);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_943 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(197);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_942 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(198);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_941 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(199);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_940 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(200);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_939 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(201);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_938 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(202);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_937 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(203);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_936 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(42);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_935 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_934 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_933 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_932 = function() {
        this.initialize(ss["test_atlas_"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_931 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(204);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_930 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(205);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_929 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(206);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_928 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(207);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_927 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(208);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_926 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(209);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_925 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(210);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_924 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(211);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_923 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(212);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_922 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(213);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_921 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(43);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_920 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(214);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_919 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(215);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_918 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_917 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_916 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_915 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_914 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(216);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_913 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(217);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_912 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(218);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_911 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(219);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_910 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(220);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_909 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(221);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_908 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(222);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_907 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(223);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_906 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(224);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_905 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(225);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_904 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(44);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_903 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(21);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_902 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(226);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_901 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_900 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(22);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_899 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_898 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(227);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_897 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(228);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_896 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(229);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_895 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(230);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_894 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(231);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_893 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(232);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_892 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(233);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_891 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(234);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_890 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(235);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_889 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(236);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_888 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(237);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_887 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(238);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_886 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(45);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_885 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(23);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_884 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_883 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(46);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_882 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_881 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(239);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_880 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(240);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_879 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(241);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_878 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(242);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_877 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(243);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_876 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(244);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_875 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(245);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_874 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(246);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_873 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_872 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_871 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_870 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(24);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_869 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(247);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_868 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(47);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_867 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(248);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_866 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(249);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_865 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(250);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_864 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(251);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_863 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(252);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_862 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(253);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_861 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_860 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(254);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_859 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(255);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_858 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(256);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_857 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(257);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_856 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_855 = function() {
        this.initialize(ss["test_atlas_5"]);
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_854 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(48);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_853 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(258);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_852 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(259);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_851 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(260);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_850 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_849 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(25);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_848 = function() {
        this.initialize(ss["test_atlas_3"]);
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_847 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(261);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_846 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(26);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_845 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(262);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_844 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(263);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_843 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(264);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_842 = function() {
        this.initialize(ss["test_atlas_2"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_841 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_840 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(49);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_839 = function() {
        this.initialize(ss["test_atlas_6"]);
        this.gotoAndStop(27);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_838 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(265);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_837 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(266);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_836 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(267);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_424 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(268);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_423 = function() {
        this.initialize(ss["test_atlas_4"]);
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_422 = function() {
        this.initialize(ss["test_atlas_"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_421 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(50);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_420 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(269);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_419 = function() {
        this.initialize(ss["test_atlas_7"]);
        this.gotoAndStop(51);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedBmp_418 = function() {
        this.initialize(ss["test_atlas_8"]);
        this.gotoAndStop(270);
    }).prototype = p = new cjs.Sprite();



    (lib.background = function() {
        this.initialize(img.background);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0,0,4000,4000);// helper functions:

    function mc_symbol_clone() {
        var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
        clone.gotoAndStop(this.currentFrame);
        clone.paused = this.paused;
        clone.framerate = this.framerate;
        return clone;
    }

    function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
        var prototype = cjs.extend(symbol, cjs.MovieClip);
        prototype.clone = mc_symbol_clone;
        prototype.nominalBounds = nominalBounds;
        prototype.frameBounds = frameBounds;
        return prototype;
    }


    (lib.Path_1_0 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_834();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0, new cjs.Rectangle(0,0,177.6,154.5), null);


    (lib.Path_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_833();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,19.2,67.1), null);


    (lib.Path = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_832();
        this.instance.setTransform(0,0.2,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0.2,90.9,132.5), null);


    (lib.Path_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_829();
        this.instance.setTransform(-0.05,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,27.7,10.7), null);


    (lib.Path_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_828();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,133.2,128.9), null);


    (lib.Path_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_827();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0,46.2,33.8), null);


    (lib.Path_3_0 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_826();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_0, new cjs.Rectangle(0,0,45.5,34.1), null);


    (lib.Path_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_825();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,57.5,115.8), null);


    (lib.Path_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_824();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,15.6,49), null);


    (lib.Path_1_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_823();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,57.5,111.5), null);


    (lib.Path_0 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_822();
        this.instance.setTransform(0.05,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0.1,0,31.599999999999998,74.9), null);


    (lib.Path_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_821();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_7, new cjs.Rectangle(0,0,151.3,151.6), null);


    (lib.Path_20 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_815();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_20, new cjs.Rectangle(0,0,10,17.8), null);


    (lib.Path_17 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_814();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_17, new cjs.Rectangle(0,0,40.1,61.8), null);


    (lib.Path_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_813();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_14, new cjs.Rectangle(0,0,7.5,4.6), null);


    (lib.Path_13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_812();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_13, new cjs.Rectangle(0,0,7.5,7.1), null);


    (lib.Path_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_811();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_12, new cjs.Rectangle(0,0,8.2,6.4), null);


    (lib.Path_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_810();
        this.instance.setTransform(-0.05,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_9, new cjs.Rectangle(0,0,12.8,10.3), null);


    (lib.Path_3_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_809();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_1, new cjs.Rectangle(0,0,37.7,17.1), null);


    (lib.Path_2_0 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_808();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_0, new cjs.Rectangle(0,0,21.3,32.7), null);


    (lib.Path_2_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_807();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_1, new cjs.Rectangle(0,0,17.8,53.3), null);


    (lib.Path_1_1_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_806();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_1_1, new cjs.Rectangle(0,0,78.5,63.2), null);


    (lib.Path_1_0_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_805();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_1, new cjs.Rectangle(0,0,13.2,33.4), null);


    (lib.Path_1_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_804();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_2, new cjs.Rectangle(0,0,39.4,30.2), null);


    (lib.Path_0_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_803();
        this.instance_1.setTransform(0,0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_1, new cjs.Rectangle(0,0.1,72.5,52.9), null);


    (lib.Path_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_802();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_8, new cjs.Rectangle(0,0,124,135.3), null);


    (lib.ClipGroup_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AloJ/IAagQQAVgNAMghQAKgbAHgzQAFggABgaIABgGQAAgRgBgSQgDgxiFkmQiFkigBgqIPtmcQgRC9AKDDQAJC9AbA3QAXAvAoAcQgrAPiJBuQjLChgZASQhUA8gjAdIiLB0IiABUQhIAvg8AgIARgxg");
        mask.setTransform(54.875,68.775);

        // Calque_3
        this.instance = new lib.CachedBmp_801();
        this.instance.setTransform(6.7,31.9,0.3551,0.3551);

        this.instance_1 = new lib.CachedBmp_800();
        this.instance_1.setTransform(67.1,4.9,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance,this.instance_1];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_5, new cjs.Rectangle(6.7,4.9,103.1,98.8), null);


    (lib.ClipGroup_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AlVL/Qg2gCgagDQgsgHgSgaQgLgQgDgnQgCgqgCgQQgDgagNguQgMgugDgaQgBgFAFgTQAFgRgDgGQgCgGgPgGQgPgGgDgFQgMgTAEglQAIgqABgTQALiggXifQgDgVgTg6QgPgsADgiQADgoAYhAIAohmQArhqAZgzQAnhRAtg/IAWgfQCogzC0ANQCyANCfBLQCpBOBNB5QAuBIgEBrIgIBeQgFA9ABAoQACBIgDAXQgDAUgOBJQgFAcgdAsIgwBBQgeAqgTBkQgRBggnAtQhGBTg3AkQgqAbh0AuQi+BNi0AAQgoAAgngEg");
        mask.setTransform(70.9976,77.0605);

        // Calque_3
        this.instance = new lib.CachedBmp_799();
        this.instance.setTransform(0,88.75,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(10.2,88.8,21.1,22), null);


    (lib.Path_15 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_792();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_15, new cjs.Rectangle(0,0,25.6,10), null);


    (lib.Path_5_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_791();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_5_1, new cjs.Rectangle(0,0,65.4,94.8), null);


    (lib.Path_4_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_790();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_4_1, new cjs.Rectangle(0,0,43.3,32.3), null);


    (lib.Path_3_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_789();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_2, new cjs.Rectangle(0,0,44.8,33.8), null);


    (lib.Path_2_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_788();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_2, new cjs.Rectangle(0,0,65.4,94.8), null);


    (lib.Path_1_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_787();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_3, new cjs.Rectangle(0,0,153.4,101.2), null);


    (lib.Path_0_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_786();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_2, new cjs.Rectangle(0,0,152.4,136), null);


    (lib.Path_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_785();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_10, new cjs.Rectangle(0,0,35.9,72.8), null);


    (lib.ClipGroup_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AAPNnQhtgFh2hjQhhhShKh3QhWiAgjhAQg6hqgNhnQgTiagNkNQgHifAQhcQAXiKBPhOQBMhLCUgkQB4gdB8gBQB7gBB3AbIgTgeQCGgBBzBTQBzBSArB/QASA0gUCAIgcC4QgFBfgFCQQgGB5gSBwQgqD9iECiQhSBlhHAuQhTA0hhAAIgQAAg");
        mask.setTransform(69.0994,87.091);

        // Calque_3
        this.instance = new lib.CachedBmp_779();
        this.instance.setTransform(32.2,67.55,0.3551,0.3551);

        this.instance_1 = new lib.CachedBmp_778();
        this.instance_1.setTransform(76.6,73.9,0.3551,0.3551);

        this.instance_2 = new lib.CachedBmp_777();
        this.instance_2.setTransform(0,70.6,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(8.1,67.6,83.80000000000001,25.400000000000006), null);


    (lib.Path_9_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_776();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_9_1, new cjs.Rectangle(0,0,23.1,13.2), null);


    (lib.Path_8_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_775();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_8_1, new cjs.Rectangle(0,0,28.8,32.7), null);


    (lib.Path_3_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_774();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_3, new cjs.Rectangle(0,0,28.1,59.3), null);


    (lib.Path_2_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_773();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_3, new cjs.Rectangle(0,0,37.3,34.1), null);


    (lib.Path_1_0_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_772();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_2, new cjs.Rectangle(0,0,143.8,166.6), null);


    (lib.Path_1_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_4 = new lib.CachedBmp_771();
        this.instance_4.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_4, new cjs.Rectangle(0,0,40.1,70.7), null);


    (lib.Path_0_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_770();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_3, new cjs.Rectangle(0,0,16.7,24.5), null);


    (lib.Path_11 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_4 = new lib.CachedBmp_769();
        this.instance_4.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_11, new cjs.Rectangle(0,0,134.2,71.4), null);


    (lib.ClipGroup_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("ADdN5QhYgFiLgyQh5grhghYQhShKhGhwQgZgogpg1IhBhUQhFhggMhhQgTiTgNkUQgHifAQhcQAXiKBOhOQBMhLCVgkQB4gdB8gBQB7gBB3AbIgTgeQCBgBCICQQCDCLAQCKQAlExgPBrQgEAggMAYQgLAYgCALQgNBRALBoQAIBRggBfQgTA5gRBHIgaBsQgdBwg6BHQg8BKhzAAIgRAAg");
        mask.setTransform(62.2075,88.8957);

        // Calque_3
        this.instance = new lib.CachedBmp_766();
        this.instance.setTransform(102.5,80.45,0.3551,0.3551);

        this.instance_1 = new lib.CachedBmp_765();
        this.instance_1.setTransform(64.55,22.4,0.3551,0.3551);

        this.instance_2 = new lib.CachedBmp_764();
        this.instance_2.setTransform(16.5,17.8,0.3551,0.3551);

        this.instance_3 = new lib.CachedBmp_763();
        this.instance_3.setTransform(88.75,82.75,0.3551,0.3551);

        this.instance_4 = new lib.CachedBmp_762();
        this.instance_4.setTransform(68.2,39.3,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(16.5,17.8,107.9,160), null);


    (lib.ClipGroup_2_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        mask_1.graphics.p("ADdN5QhYgFiLgyQh5grhghYQhShKhGhwQgZgogpg1IhBhUQhFhggMhhQgTiTgNkUQgHifAQhcQAXiKBOhOQBMhLCVgkQB4gdB8gBQB7gBB3AbIgTgeQCBgBCICQQCDCLAQCKQAlExgPBrQgEAggMAYQgLAYgCALQgNBRALBoQAIBRggBfQgTA5gRBHIgaBsQgdBwg6BHQg8BKhzAAIgRAAg");
        mask_1.setTransform(68.8575,88.8957);

        // Calque_3
        this.instance_3 = new lib.CachedBmp_761();
        this.instance_3.setTransform(59.6,71.4,0.3551,0.3551);

        this.instance_4 = new lib.CachedBmp_760();
        this.instance_4.setTransform(98.35,82,0.3551,0.3551);

        this.instance_5 = new lib.CachedBmp_759();
        this.instance_5.setTransform(34.05,73,0.3551,0.3551);

        this.instance_6 = new lib.CachedBmp_758();
        this.instance_6.setTransform(0,77.75,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_3,this.instance_4,this.instance_5,this.instance_6];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_1, new cjs.Rectangle(6.7,71.4,102.7,25.19999999999999), null);


    (lib.Path_20_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_757();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_20_1, new cjs.Rectangle(0,0,10,17.8), null);


    (lib.Path_16 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_756();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_16, new cjs.Rectangle(0,0,38,85.6), null);


    (lib.Path_14_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_755();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_14_1, new cjs.Rectangle(0,0,7.5,4.6), null);


    (lib.Path_13_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_754();
        this.instance_1.setTransform(-0.05,-0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_13_1, new cjs.Rectangle(0,0,7.4,7.1), null);


    (lib.Path_12_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_753();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_12_1, new cjs.Rectangle(0,0,8.2,7.5), null);


    (lib.Path_11_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_752();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_11_1, new cjs.Rectangle(0,0,8.2,6.4), null);


    (lib.Path_6_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_751();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_6_1, new cjs.Rectangle(0,0,12.8,10.3), null);


    (lib.Path_3_0_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_750();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_0_1, new cjs.Rectangle(0,0,21.3,32.7), null);


    (lib.Path_3_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_4 = new lib.CachedBmp_749copy();
        this.instance_4.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_4, new cjs.Rectangle(0,0,38.4,83.1), null);


    (lib.Path_1_0_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_748();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_3, new cjs.Rectangle(0,0,155.9,143.8), null);


    (lib.Path_1_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_5 = new lib.CachedBmp_747();
        this.instance_5.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_5, new cjs.Rectangle(0,0,122.5,174.7), null);


    (lib.Path_0_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_4 = new lib.CachedBmp_746();
        this.instance_4.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_4, new cjs.Rectangle(0,0,63.9,32.3), null);


    (lib.Path_18 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_5 = new lib.CachedBmp_749();
        this.instance_5.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_18, new cjs.Rectangle(0,0,38.4,83.1), null);


    (lib.ClipGroup_4_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        mask_1.graphics.p("AD2JhIiAhUIiLh0QgjgdhUg8QgagTjKigQiKhugqgPQApgcAWgvQAbg3AJi9QAKjDgRi9IPtGcQgBAqiFEiQiGEmgCAxIgBAjIAAAGQADAjAEAXQAGAyALAcQALAgAVAOIAbAQQAIAVAJAcQg8gghIgvg");
        mask_1.setTransform(54.875,68.775);

        // Calque_3
        this.instance_1 = new lib.CachedBmp_744();
        this.instance_1.setTransform(42.35,31.5,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_1];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_1, new cjs.Rectangle(42.4,31.5,67.4,106.1), null);


    (lib.Path_15_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_738();
        this.instance_1.setTransform(-0.05,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_15_1, new cjs.Rectangle(0,0,23.1,13.2), null);


    (lib.Path_14_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_737();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_14_2, new cjs.Rectangle(0,0,28.8,32.7), null);


    (lib.Path_3_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_5 = new lib.CachedBmp_736();
        this.instance_5.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_5, new cjs.Rectangle(0,0,89.5,101.6), null);


    (lib.Path_2_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_4 = new lib.CachedBmp_735();
        this.instance_4.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_4, new cjs.Rectangle(0,0,37.3,34.1), null);


    (lib.Path_1_0_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_4 = new lib.CachedBmp_734();
        this.instance_4.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_4, new cjs.Rectangle(0,0,23.8,38), null);


    (lib.Path_1_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_6 = new lib.CachedBmp_733();
        this.instance_6.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_6, new cjs.Rectangle(0,0,14.2,54.4), null);


    (lib.Path_0_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_5 = new lib.CachedBmp_732();
        this.instance_5.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_5, new cjs.Rectangle(0,0,20.3,130.7), null);


    (lib.Path_19 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_6 = new lib.CachedBmp_731();
        this.instance_6.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_19, new cjs.Rectangle(0,0,122.5,135.7), null);


    (lib.ClipGroup_4_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_2 = new cjs.Shape();
        mask_2._off = true;
        mask_2.graphics.p("AnxIMIgoghQgSgQgLgdQgWg1AGgxQAJhHAHgcQAOg3AcggQAKgMAPgJIAWgNQAUgPgCgoQgDgvgljXQgjjRgBgtIN6icQgLCNAEBiQAGCTAmAkQAYAWBEAqQBNAvAKAIQAhAZgxBDQgxBDhiBGQi4CHhbA8QjOCHjOBeQgeANgfAAQhMAAhRhQg");
        mask_2.setTransform(64.829,71.5382);

        // Calque_3
        this.instance_2 = new lib.CachedBmp_729();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_2];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_2, new cjs.Rectangle(6.4,11.1,116.89999999999999,97.9), null);


    (lib.ClipGroup_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AmcMvQg6hHgdhwIgahsQgRhHgUg5QgghfAJhRQALhogNhRQgCgLgMgYQgLgYgFggQgPhrAlkxQARiKCDiLQCHiQCCABIgUAeQB4gbB7ABQB8ABB3AdQCVAkBMBLQBOBOAYCKQAQBcgICfQgMEUgTCTQgMBhhGBgIhABUQgpA0gZAoQhGBxhSBKQhhBYh4ArQiMAyhXAFIgSAAQhyAAg8hKg");
        mask.setTransform(62.2033,88.8957);

        // Calque_3
        this.instance = new lib.CachedBmp_724();
        this.instance.setTransform(21.65,81.95,0.3551,0.3551);

        this.instance_1 = new lib.CachedBmp_723();
        this.instance_1.setTransform(33.5,71.4,0.3551,0.3551);

        this.instance_2 = new lib.CachedBmp_722();
        this.instance_2.setTransform(73.25,73.5,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(21.7,71.4,102.7,23.799999999999997), null);


    (lib.Path_6_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_721();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_6_2, new cjs.Rectangle(0,0,25.6,10), null);


    (lib.Path_4_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_720();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_4_2, new cjs.Rectangle(0,0,43.3,32.3), null);


    (lib.Path_3_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_6 = new lib.CachedBmp_719();
        this.instance_6.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_6, new cjs.Rectangle(0,0,44.8,33.8), null);


    (lib.Path_1_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_7 = new lib.CachedBmp_718();
        this.instance_7.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_7, new cjs.Rectangle(0,0,142.8,150.2), null);


    (lib.Path_0_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_6 = new lib.CachedBmp_717();
        this.instance_6.setTransform(-0.05,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_6, new cjs.Rectangle(0,0,96.9,103), null);


    (lib.Path_21 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_7 = new lib.CachedBmp_716();
        this.instance_7.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_21, new cjs.Rectangle(0,0,16.4,55.8), null);


    (lib.ClipGroup_4_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_3 = new cjs.Shape();
        mask_3._off = true;
        mask_3.graphics.p("AjSI2QgagIgpgYQg6gjgsgZQhYgygPgLQgggWhJhIQgRgRgVg5QgWg6ADgXQAFgqARgOIAsgZQA/gfAQgMQAWgSgDgrQgDhDgFiqIgFjlIOWhUQgKCKAFB7QAICpAmAkQAYAVA4AiQBAAnAKAIQAfAXgHAjQgEAXgtBoQhqB9h9BXQi4CBjMAiQhVAPgzAAQggAAgSgGg");
        mask_3.setTransform(64.538,81.5016);

        // Calque_3
        this.instance_3 = new lib.CachedBmp_714();
        this.instance_3.setTransform(2.8,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_3];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_3, new cjs.Rectangle(2.8,24.3,126.3,84.7), null);


    (lib.ClipGroup_3_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        mask_1.graphics.p("AjSMzQhHguhShlQiFijgoj8QgThxgGh4QgEiQgFhfQAAgFgcizQgUiAARg0QArh/BzhSQB0hTCFABIgTAeQB4gbB7ABQB7ABB4AdQCVAkBMBLQBOBOAXCKQAQBcgHCfQgGCIgGBMQgHB0gMBfQgNBmg7BrQgjBAhVCAQhKB3hiBSQh2BjhtAFIgPAAQhiAAhTg0g");
        mask_1.setTransform(68.0363,87.091);

        // Calque_3
        this.instance_5 = new lib.CachedBmp_713();
        this.instance_5.setTransform(45,10.1,0.3551,0.3551);

        this.instance_6 = new lib.CachedBmp_712();
        this.instance_6.setTransform(4.3,14.35,0.3551,0.3551);

        this.instance_7 = new lib.CachedBmp_711();
        this.instance_7.setTransform(5.35,71.75,0.3551,0.3551);

        this.instance_8 = new lib.CachedBmp_710();
        this.instance_8.setTransform(44.4,74.6,0.3551,0.3551);

        this.instance_9 = new lib.CachedBmp_709();
        this.instance_9.setTransform(54.8,125.4,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_5,this.instance_6,this.instance_7,this.instance_8,this.instance_9];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_1, new cjs.Rectangle(7.1,10.1,110.9,164.1), null);


    (lib.ClipGroup_2_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_2 = new cjs.Shape();
        mask_2._off = true;
        mask_2.graphics.p("AjSMzQhHguhShlQiFijgoj8QgThxgGh4QgEiQgFhfQAAgFgcizQgUiAARg0QArh/BzhSQB0hTCFABIgTAeQB4gbB7ABQB7ABB4AdQCVAkBMBLQBOBOAXCKQAQBcgHCfQgNEUgSCTQgNBmg7BrQgjBAhVCAQhKB3hiBSQh2BjhtAFIgPAAQhiAAhTg0g");
        mask_2.setTransform(61.0363,87.091);

        // Calque_3
        this.instance_7 = new lib.CachedBmp_708();
        this.instance_7.setTransform(54.65,67.95,0.3551,0.3551);

        this.instance_8 = new lib.CachedBmp_707();
        this.instance_8.setTransform(40.85,73.45,0.3551,0.3551);

        this.instance_9 = new lib.CachedBmp_706();
        this.instance_9.setTransform(103.2,71.1,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_7,this.instance_8,this.instance_9];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_2, new cjs.Rectangle(40.9,68,81.19999999999999,25.5), null);


    (lib.Path_6_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_705();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_6_3, new cjs.Rectangle(0,0,3.6,17.1), null);


    (lib.Path_4_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_704copy();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_4_3, new cjs.Rectangle(0,0,37.3,86.3), null);


    (lib.Path_3_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_7 = new lib.CachedBmp_703();
        this.instance_7.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_7, new cjs.Rectangle(0,0,74.6,21), null);


    (lib.Path_2_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_5 = new lib.CachedBmp_702();
        this.instance_5.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_5, new cjs.Rectangle(0,0,14.6,34.8), null);


    (lib.Path_1_0_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_5 = new lib.CachedBmp_701();
        this.instance_5.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_5, new cjs.Rectangle(0,0,110.8,195.3), null);


    (lib.Path_1_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_8 = new lib.CachedBmp_700();
        this.instance_8.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_8, new cjs.Rectangle(0,0,126.4,185.4), null);


    (lib.Path_0_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_7 = new lib.CachedBmp_704();
        this.instance_7.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_7, new cjs.Rectangle(0,0,37.3,86.3), null);


    (lib.Path_22 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_8 = new lib.CachedBmp_698();
        this.instance_8.setTransform(0,0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_22, new cjs.Rectangle(0,0.1,42.3,50.8), null);


    (lib.Path_8_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_691();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_8_2, new cjs.Rectangle(0,0,9.3,5.7), null);


    (lib.Path_4_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_4 = new lib.CachedBmp_690();
        this.instance_4.setTransform(0,-0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_4_4, new cjs.Rectangle(0,0,9.6,5.3), null);


    (lib.Path_3_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_8 = new lib.CachedBmp_689();
        this.instance_8.setTransform(-0.05,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_8, new cjs.Rectangle(0,0,11.3,33.8), null);


    (lib.Path_2_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_6 = new lib.CachedBmp_688();
        this.instance_6.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_6, new cjs.Rectangle(0,0,23.8,32.7), null);


    (lib.Path_1_0_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_6 = new lib.CachedBmp_687();
        this.instance_6.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_6, new cjs.Rectangle(0,0,102.6,68.9), null);


    (lib.Path_1_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_9 = new lib.CachedBmp_686();
        this.instance_9.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_9, new cjs.Rectangle(0,0,21,38.7), null);


    (lib.Path_0_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_8 = new lib.CachedBmp_685();
        this.instance_8.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_8, new cjs.Rectangle(0,0,122.5,141.7), null);


    (lib.Path_23 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_9 = new lib.CachedBmp_684();
        this.instance_9.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_23, new cjs.Rectangle(0,0,30.6,51.9), null);


    (lib.ClipGroup_3_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_2 = new cjs.Shape();
        mask_2._off = true;
        mask_2.graphics.p("AlNLrQgEgEgWgCQgUgBgBgHQgEgcgEg0QgEg6gDgXQgGgxg3g4Qg/hAgKgXQgKgYAGgxQAGgzAQgVQACgDAKj5QALj5ADgCIKFlRIEZiTQAngTALEHQAKD1gNA6QgRBJgIBCQgRCPAQCIQASCRA4B8QgegPgogCQgfgBgrAGQiYAXi8BWIlCCjQgYAMgRAAQgNAAgJgHg");
        mask_2.setTransform(71.4774,75.3659);

        // Calque_3
        this.instance_10 = new lib.CachedBmp_683();
        this.instance_10.setTransform(0,91.15,0.3551,0.3551);

        this.instance_11 = new lib.CachedBmp_682();
        this.instance_11.setTransform(99.2,73.2,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_10,this.instance_11];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_2, new cjs.Rectangle(17.9,73.2,107.19999999999999,77.60000000000001), null);


    (lib.Path_5_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_678();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_5_2, new cjs.Rectangle(0,0,3.6,17.1), null);


    (lib.Path_2_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_7 = new lib.CachedBmp_677();
        this.instance_7.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_7, new cjs.Rectangle(0,0,83.5,54.4), null);


    (lib.Path_1_1_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_676();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_1_2, new cjs.Rectangle(0,0,33.4,35.9), null);


    (lib.Path_1_0_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_7 = new lib.CachedBmp_675();
        this.instance_7.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_7, new cjs.Rectangle(0,0,14.6,34.8), null);


    (lib.Path_1_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_10 = new lib.CachedBmp_674();
        this.instance_10.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_10, new cjs.Rectangle(0,0,25.6,67.1), null);


    (lib.Path_0_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_9 = new lib.CachedBmp_673();
        this.instance_9.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_9, new cjs.Rectangle(0,0,89.5,111.2), null);


    (lib.Path_24 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_10 = new lib.CachedBmp_672();
        this.instance_10.setTransform(0.05,0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_24, new cjs.Rectangle(0.1,0.1,16.7,35.8), null);


    (lib.ClipGroup_4_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_4 = new cjs.Shape();
        mask_4._off = true;
        mask_4.graphics.p("Am8KAQAFgCAKgNIAPgSQAVgWAzgvIA3gxIABgeQAAg+gLgdQgOgYgFgQQgVhGg1hPQg8hSgYgoQgnhCgBg9QAAhLA4hdIOdnCQgSDFAECyQAFC2AaA1QAKAXAVAXQgvgFhvAmQgeALhMA7QgaAUhIA8QiwCRgmAiQgvApgrAgQglAaggAfIgDACIhwBtIhvBuIgPAIg");
        mask_4.setTransform(64.7748,68.925);

        // Calque_3
        this.instance_4 = new lib.CachedBmp_671();
        this.instance_4.setTransform(85.6,24.9,0.3551,0.3551);

        this.instance_5 = new lib.CachedBmp_670();
        this.instance_5.setTransform(0,42.6,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_4,this.instance_5];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_4, new cjs.Rectangle(13.3,24.9,103,113), null);


    (lib.Path_8_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_664();
        this.instance_2.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_8_3, new cjs.Rectangle(0,0,30.2,28.8), null);


    (lib.Path_1_11 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_11 = new lib.CachedBmp_663();
        this.instance_11.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_11, new cjs.Rectangle(0,0,106.6,115.4), null);


    (lib.Path_0_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_10 = new lib.CachedBmp_662();
        this.instance_10.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_10, new cjs.Rectangle(0,0,198.9,196.4), null);


    (lib.Path_25 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_11 = new lib.CachedBmp_661();
        this.instance_11.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_25, new cjs.Rectangle(0,0,22.4,71.8), null);


    (lib.ClipGroup_3_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_3 = new cjs.Shape();
        mask_3._off = true;
        mask_3.graphics.p("AiqIdQgVgKgPgZQgLgSgKgfQg5ipgsi0QgOg6gGgjQgJgzACgrIAGhQQAEgwgHgfQgCgMgLgiQgKgdgBgSQgEgnAVgtQAOgdAhgvIAFgMQBBgfBLgJQBJgJBJAOQCPAbBzBmQA6A0AgA5QBFB7gZDJQgVCrhFBoQhrCij/BNQgcAIgSABIgKABQgTAAgOgHg");
        mask_3.setTransform(41.371,54.788);

        // Calque_3
        this.instance_12 = new lib.CachedBmp_660();
        this.instance_12.setTransform(15.15,24.9,0.3551,0.3551);

        this.instance_13 = new lib.CachedBmp_659();
        this.instance_13.setTransform(0,18.6,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_12,this.instance_13];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_3, new cjs.Rectangle(3.6,18.6,41.8,91), null);


    (lib.Path_7_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_656();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_7_1, new cjs.Rectangle(0,0,29.9,28.8), null);


    (lib.Path_1_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_12 = new lib.CachedBmp_655();
        this.instance_12.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_12, new cjs.Rectangle(0,0,175.8,210.2), null);


    (lib.Path_0_11 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_11 = new lib.CachedBmp_654();
        this.instance_11.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_11, new cjs.Rectangle(0,0,163,195), null);


    (lib.Path_26 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_12 = new lib.CachedBmp_653();
        this.instance_12.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_26, new cjs.Rectangle(0,0,31.6,54), null);


    (lib.ClipGroup_3_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_4 = new cjs.Shape();
        mask_4._off = true;
        mask_4.graphics.p("AB/IjQgRgBgcgIQj/hNhriiQhGhogVirQgYjJBFh7QAgg5A6g0QA3gxBCghQBDgiBGgNQBJgOBJAJQBLAJBBAfIAEAMQAiAvAOAdQAVAtgEAnQgBASgKAdQgLAjgDALQgGAfADAwIAHBQQACArgJAzQgGAjgOA6QgrCug6CvQgLAggKARQgPAZgVAKQgOAHgTAAIgLgBg");
        mask_4.setTransform(37.804,60.038);

        // Calque_3
        this.instance_14 = new lib.CachedBmp_652();
        this.instance_14.setTransform(47.4,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_14];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_4, new cjs.Rectangle(47.4,5.3,28.199999999999996,109.10000000000001), null);


    (lib.Path_10_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance = new lib.CachedBmp_649();
        this.instance.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_10_1, new cjs.Rectangle(0,0,21.7,29.9), null);


    (lib.Path_7_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_648();
        this.instance_1.setTransform(-0.05,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_7_2, new cjs.Rectangle(0,0,9.6,5.7), null);


    (lib.Path_2_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_8 = new lib.CachedBmp_647();
        this.instance_8.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_8, new cjs.Rectangle(0,0,80.6,64.3), null);


    (lib.Path_1_0_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_8 = new lib.CachedBmp_646();
        this.instance_8.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_8, new cjs.Rectangle(0,0,18.5,33), null);


    (lib.Path_1_13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_13 = new lib.CachedBmp_645();
        this.instance_13.setTransform(0.1,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_13, new cjs.Rectangle(0.1,0,148.8,179), null);


    (lib.Path_0_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_12 = new lib.CachedBmp_644();
        this.instance_12.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_12, new cjs.Rectangle(0,0,12.1,59.3), null);


    (lib.Path_27 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_13 = new lib.CachedBmp_643();
        this.instance_13.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_27, new cjs.Rectangle(0,0,29.1,49), null);


    (lib.Path_10_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_1 = new lib.CachedBmp_638();
        this.instance_1.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_10_2, new cjs.Rectangle(0,0,21.7,29.9), null);


    (lib.Path_7_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_2 = new lib.CachedBmp_637();
        this.instance_2.setTransform(0,-0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_7_3, new cjs.Rectangle(0,0,9.6,5.7), null);


    (lib.Path_2_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_9 = new lib.CachedBmp_636();
        this.instance_9.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_9, new cjs.Rectangle(0,0,56.8,20.6), null);


    (lib.Path_1_0_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_9 = new lib.CachedBmp_635();
        this.instance_9.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_0_9, new cjs.Rectangle(0,0,129.6,179.4), null);


    (lib.Path_1_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_14 = new lib.CachedBmp_634();
        this.instance_14.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_14, new cjs.Rectangle(0,0,51.5,60), null);


    (lib.Path_0_13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_13 = new lib.CachedBmp_633();
        this.instance_13.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_13, new cjs.Rectangle(0,0,5,5), null);


    (lib.Path_28 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_14 = new lib.CachedBmp_632();
        this.instance_14.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_28, new cjs.Rectangle(0,0,106.6,186.8), null);


    (lib.ClipGroup_3_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_5 = new cjs.Shape();
        mask_5._off = true;
        mask_5.graphics.p("ADrLqQgogHgrgMQgygPgdgQQklirjCl8QgvhbghhyQgih2gOh3QgJhJAEg1QAFhFAZgzQAYgvApgmQAngjAzgYQBSgnB9gNQETgeCmB0IAYgJQBQBLA7BfQA7BgAfBqQAXBOgcAnQgHAJgUARQgSAPgHALQgJAOgGAcQgjCjAiCjQALA1gBAdQgCAtgbAWIgOAKQgHAGgDAGQgEAIADATQAKBOgUBOQgNAwgXAZQgcAfglAVQgkAUgdAAIgLAAg");
        mask_5.setTransform(54.9176,74.6334);

        // Calque_3
        this.instance_15 = new lib.CachedBmp_631();
        this.instance_15.setTransform(74.4,12.1,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_15];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_5, new cjs.Rectangle(74.4,12.1,35.5,89.2), null);


    (lib.Path_7_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_628();
        this.instance_3.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_7_4, new cjs.Rectangle(0,0,9.3,5.7), null);


    (lib.Path_5_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_3 = new lib.CachedBmp_627();
        this.instance_3.setTransform(0,-0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_5_3, new cjs.Rectangle(0,0,29.9,60.3), null);


    (lib.Path_4_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_5 = new lib.CachedBmp_626();
        this.instance_5.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_4_5, new cjs.Rectangle(0,0,9.6,5.4), null);


    (lib.Path_3_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_9 = new lib.CachedBmp_625();
        this.instance_9.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_3_9, new cjs.Rectangle(0,0,11.4,33.8), null);


    (lib.Path_2_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_10 = new lib.CachedBmp_624();
        this.instance_10.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_2_10, new cjs.Rectangle(0,0,50.4,22.4), null);


    (lib.Path_1_15 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_15 = new lib.CachedBmp_623();
        this.instance_15.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_1_15, new cjs.Rectangle(0,0,161.6,196.4), null);


    (lib.Path_0_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_14 = new lib.CachedBmp_622();
        this.instance_14.setTransform(0.05,0.05,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_0_14, new cjs.Rectangle(0.1,0.1,101.2,174.70000000000002), null);


    (lib.Path_29 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_1
        this.instance_15 = new lib.CachedBmp_621();
        this.instance_15.setTransform(0,0,0.3551,0.3551);

        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.Path_29, new cjs.Rectangle(0,0,24.5,48), null);


    (lib.ClipGroup_3_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_6 = new cjs.Shape();
        mask_6._off = true;
        mask_6.graphics.p("ABHLcQhLgVhAgsQhAgsguhAQguhBgVhKQgLgmgNhdQgNhUgPgtQgMghgWgqIgohIQh5jeAIi3QADhAATg1QAVg8AngpQAtgvBYgkQBhgoBzgKQB9gMBZAfQBIBAArBWIAiBIQAUAsATAeQBVCHgxBOIgpAyQgUAZAFAWQAOA6A/BTQBABYAMAnQAQAzgSAbQgZAlhVgRIAJAUQAIAZgBAZQgBAbgHARQgKAbgXgDQAVARgEAgQgDAUgMAmQgFAZAAAmIABA/QgFBRgvAdQgWANgoAEQgTABgSAAQg7AAg6gPg");
        mask_6.setTransform(48.5617,74.7208);

        // Calque_3
        this.instance_16 = new lib.CachedBmp_619();
        this.instance_16.setTransform(39,47.65,0.3551,0.3551);

        this.instance_17 = new lib.CachedBmp_618();
        this.instance_17.setTransform(36.25,37.4,0.3551,0.3551);

        this.instance_18 = new lib.CachedBmp_617();
        this.instance_18.setTransform(20.55,1.75,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_16,this.instance_17,this.instance_18];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_18},{t:this.instance_17},{t:this.instance_16}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_6, new cjs.Rectangle(20.6,1.8,76.5,147.7), null);


    (lib.ClipGroup_2_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_3 = new cjs.Shape();
        mask_3._off = true;
        mask_3.graphics.p("ApGIJIAZhMQBCjrAKj1QAKj3gujwQCZgUFQALQE/ALCogdQAJB3gMDgQgNDrAGBsQAEBVAQBAQAPA/AhBJQAVAuAtBSg");
        mask_3.setTransform(62.475,55.025);

        // Calque_3
        this.instance_10 = new lib.CachedBmp_831();
        this.instance_10.setTransform(89.4,30.1,0.3551,0.3551);

        this.instance_11 = new lib.Path_1();
        this.instance_11.setTransform(9.6,62.8,1,1,0,0,0,9.6,33.5);
        this.instance_11.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_10,this.instance_11];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_3, new cjs.Rectangle(4.2,29.3,116.6,75.7), null);


    (lib.ClipGroup_1_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        mask_1.graphics.p("EghiAMGQASg7gIgqQgMhGAAgFQgBh3C0lqQAwhgCKiCQCbiUB9goQBqgiB/hLQCRhWBBgbQEeh1Bsg1QBMgkB9gSQBSgMCdgJQC9gKCDABQC2ACB4AWQBNAOEaBlQE2BvAuAtQBmBlDrBxICcBIQBGAgAIAJQBOBNBPB8QA5BaAXA0QAiBRBMBmQA9BRABAdQADBGgEA5QADArA4B3g");
        mask_1.setTransform(222.1997,85.0205);

        // Calque_3
        this.instance_3 = new lib.CachedBmp_830();
        this.instance_3.setTransform(264.95,0,0.3551,0.3551);

        this.instance_4 = new lib.Path_1_0();
        this.instance_4.setTransform(88.8,87.5,1,1,0,0,0,88.8,77.2);
        this.instance_4.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_3,this.instance_4];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_1, new cjs.Rectangle(7.3,7.7,429.8,154.70000000000002), null);


    (lib.ClipGroup = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("Ag8NFQhfgDhPgVQhZgXhIgvQhOgyguhHQgkg4gnh6Qgoh+ghg2IACAGQhQiEgTjVQgKhyAehfQAehjBJhUQBIhUBUhDQBQhABlg5QBCglBGgZQBPgdBBgGQBvgKC0A9QBJAZA7AdQA7AcBAArQCSBfA6CEQApBeABCAQAABXgWCPQgXCdgWBgQgfCKgsBrQgsBqg1A4QhGBLh3AmQhcAeiFAKQhNAGg9AAIglgBg");
        mask.setTransform(82.199,89.6593);

        // Calque_3
        this.instance = new lib.Path();
        this.instance.setTransform(45.4,66.5,1,1,0,0,0,45.4,66.5);
        this.instance.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(5.5,5.9,85.4,126.79999999999998), null);


    (lib.ClipGroup_5_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        mask_1.graphics.p("EggFAJ5QAjkPA2ihQBNjlCQiFQB8hxEDhdIDShKQB4gtBSgtQBig3BBgaQBqgrBCAIITpAKQArgLD5BuQEvCFBRAXIBgAbQA4AQAnAQQCBA1BrBxQBhBoBBCKQA5B5AlCbQAbB1AYCsg");
        mask_1.setTransform(212.775,80.1879);

        // Calque_3
        this.instance_2 = new lib.Path_7();
        this.instance_2.setTransform(75.6,75.9,1,1,0,0,0,75.6,75.9);
        this.instance_2.alpha = 0.0508;

        this.instance_3 = new lib.CachedBmp_820();
        this.instance_3.setTransform(273.2,6.2,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_2,this.instance_3];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_5_1, new cjs.Rectangle(7.4,15.3,410.8,129.89999999999998), null);


    (lib.ClipGroup_4_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_5 = new cjs.Shape();
        mask_5._off = true;
        mask_5.graphics.p("AhsICQhiggighbQhMgrg0gpQgvgmhShRQgXgWgLgPQgRgYAAgUQAAgpAGgUQAJgdAbgPQA1gdAmg5QAjg0ARhCQANg0AAh1IgEirIOQCRQADBUAmCrQAIAnAKAXQAPAgAWASQAXARA+AnQA0AnAHAoQAMAkgiBAQgiBBhEBCQinCjjWAlQguAHguAAQhaAAhdgdg");
        mask_5.setTransform(74.2082,67.489);

        // Calque_3
        this.instance_6 = new lib.Path_0();
        this.instance_6.setTransform(15.8,37.5,1,1,0,0,0,15.8,37.5);
        this.instance_6.alpha = 0.0508;

        this.instance_7 = new lib.CachedBmp_819();
        this.instance_7.setTransform(38.7,13.9,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_6,this.instance_7];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_5, new cjs.Rectangle(6.7,13.2,135,68.2), null);


    (lib.ClipGroup_3_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_7 = new cjs.Shape();
        mask_7._off = true;
        mask_7.graphics.p("AAANtQhzgBhsg3Qhtg3hEhdQg8hSgoh/QgVhDgjiiQg9kZgBkcQgBhTAHg4QAIhMAXg7QAxh9B3hMQB3hNCGAHIgVAdQB5gVB7AGQB7AHB2AjQCUAsBHBOQBLBSARCKQALBdgPCeQgZENgaCZQgdCmgVBLQglCHg9BXQhEBkhwA7QhvA7h2AAIgDAAg");
        mask_7.setTransform(83.3977,87.6425);

        // Calque_3
        this.instance_19 = new lib.CachedBmp_818();
        this.instance_19.setTransform(25.55,6.55,0.3551,0.3551);

        this.instance_20 = new lib.CachedBmp_817();
        this.instance_20.setTransform(77.1,73.8,0.3551,0.3551);

        this.instance_21 = new lib.CachedBmp_816();
        this.instance_21.setTransform(68.7,73.3,0.3551,0.3551);

        this.instance_22 = new lib.Path_3();
        this.instance_22.setTransform(28.8,114.7,1,1,0,0,0,28.8,57.8);
        this.instance_22.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_19,this.instance_20,this.instance_21,this.instance_22];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_7;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_7, new cjs.Rectangle(21.5,6.6,123.9,168.70000000000002), null);


    (lib.ClipGroup_2_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_4 = new cjs.Shape();
        mask_4._off = true;
        mask_4.graphics.p("AAtDOQgJgHgEgQQgEgTgDgJQgMgrhJhsQg9hZABg/QABgdALgQQATgcA0gBQAyAAAcAZIBRGTQgXAPgLACIgFAAQgRAAgVgRg");
        mask_4.setTransform(21.3492,48.3945);

        // Calque_3
        this.instance_12 = new lib.Path_1_1();
        this.instance_12.setTransform(28.8,55.8,1,1,0,0,0,28.8,55.8);
        this.instance_12.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_12];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_4, new cjs.Rectangle(9.2,26.1,24.3,44.6), null);


    (lib.ClipGroup_1_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_2 = new cjs.Shape();
        mask_2._off = true;
        mask_2.graphics.p("Ag8CyQgSgQgJgDQgIgCgJAEQgIAEgBAIQgBADACAFIACAIQACALgIADQgDABgEgBQgMgDgIgJQgIgJgDgMQgIggAGgWQAGgSARgYIAbgnQAcgwAThIQAQg9AHhDIBpAAQgCB7AzBxIAZA2QAPAiABAWQACAdgKAVQgMAYgYAAQgMABgFgFQgCgDABgCQACgSgPgCQgGgBgGAEIgLAJIgUAMQgNAIgHADQgFABgGAAQgbAAgrgkg");
        mask_2.setTransform(19.8131,24.0409);

        // Calque_3
        this.instance_5 = new lib.Path_2();
        this.instance_5.setTransform(7.7,24.4,1,1,0,0,0,7.7,24.4);
        this.instance_5.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_5];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_2, new cjs.Rectangle(3.9,2.6,11.7,42.9), null);


    (lib.ClipGroup_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_1 = new cjs.Shape();
        mask_1._off = true;
        mask_1.graphics.p("AJfJLQAAg0gmiNQgmiMgBg1QAAgSANhfQAJhEgNgoQgTg9hBglQg5gihJgFQgugEhYAHQhbAHgsgDQgYgBgjgFIg8gJQhngMhhAJQiKAMg4BDQgrAzgEBZQgBAcACAwIADBMQAABFgdBvQgcBrgiBBIhqAWQgahRgUiXQgTiPAAhdQAAhVAahWQAZhTAuhNQBciYCMhLQB2g/DGg0QAwgMAcgFQApgHAjADQAnADAtAQQAeALAyAYQBtAzBJArQBfA4BHA9QBRBHA1BTQA6BaASBgQAUBsgrCyQgcB3g9Cig");
        mask_1.setTransform(93.82,73.4921);

        // Calque_3
        this.instance_1 = new lib.Path_5();
        this.instance_1.setTransform(66.7,64.5,1,1,0,0,0,66.7,64.5);
        this.instance_1.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_1];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(17.5,14.8,115.69999999999999,114.10000000000001), null);


    (lib.ClipGroup_3_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_8 = new cjs.Shape();
        mask_8._off = true;
        mask_8.graphics.p("A0YL0QARiEAyhqQAkhMBEhaQA5hKBahcQBqhsAngvQBXhmB+hnQCTh4BFhHIAKgFIgFAmQhJBfg4BmQgXApgJAdQgNAnADAiICahrQBGgyA+g2IC6icQAjgdBTg7QAWgRDWipQCMhwAngIQA6gPDcCBQDdCCAyBQQANAVAzA4QA9BCAhArQB8CiAaC7QAVCggCB+QgBBDgFBJQABAuAGA8QAAAzglBDg");
        mask_8.setTransform(147.85,102.9267);

        // Calque_3
        this.instance_23 = new lib.Path_8();
        this.instance_23.setTransform(61.9,122.4,1,1,0,0,0,61.9,67.7);
        this.instance_23.alpha = 0.0508;

        this.instance_24 = new lib.CachedBmp_798();
        this.instance_24.setTransform(169.55,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_23,this.instance_24];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_8;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_24},{t:this.instance_23}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_8, new cjs.Rectangle(17.4,27.4,260.90000000000003,151.1), null);


    (lib.ClipGroup_2_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_5 = new cjs.Shape();
        mask_5._off = true;
        mask_5.graphics.p("AHpLNQgQgbgvhEQhPhxgRhnQgEgbAghgQAdhZgOgfQgEgHgDgRQgBgFgUgWQhBhGhKBGQg6A3gTBLQhAiUh/hhQhEg0gLgKQg3gvgaguQhOiFCKiKQhpgph1AJQh0AIhjA3IgmAWQgXAMgSAGQgXAHgVgDQgYgCgQgOQgdgZAAg1QgBg8Agg7QAeg2AzgpQBrhWB1gfQCpguCigKQCwgLCcAgQA4AMBDAlQAuAaBCAvQBXA+AcAXQBIA5AbArQB2C4AOCHQATCmhpDvIg1B3QgeBGgVBEQg2CzgCC6QgThAgjg6g");
        mask_5.setTransform(85.2637,84.3843);

        // Calque_3
        this.instance_13 = new lib.Path_0_1();
        this.instance_13.setTransform(36.1,26.4,1,1,0,0,0,36.1,26.4);
        this.instance_13.alpha = 0.1016;

        this.instance_14 = new lib.Path_1_2();
        this.instance_14.setTransform(71.9,56.05,1,1,0,0,0,19.7,15.2);
        this.instance_14.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_13,this.instance_14];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_5, new cjs.Rectangle(6.1,0.5,85.5,70.6), null);


    (lib.ClipGroup_1_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_3 = new cjs.Shape();
        mask_3._off = true;
        mask_3.graphics.p("AlVL/Qg2gCgagDQgsgHgSgaQgLgQgDgnQgCgqgCgQQgDgagNguQgMgugDgaQgBgFAFgTQAFgRgDgGQgCgGgPgGQgPgGgDgFQgMgTAEglQAIgqABgTQALiggXifQgDgVgTg6QgPgsADgiQADgoAYhAIAohmQArhqAZgzQAnhRAtg/IAWgfQCogzC0ANQCyANCfBLQCpBOBNB5QAuBIgEBrIgIBeQgFA9ABAoQACBIgDAXQgDAUgOBJQgFAcgdAsIgwBBQgeAqgTBkQgRBggnAtQhGBTg3AkQgqAbh0AuQi+BNi0AAQgoAAgngEg");
        mask_3.setTransform(64.8976,77.0605);

        // Calque_3
        this.instance_6 = new lib.Path_2_1();
        this.instance_6.setTransform(8.8,48.25,1,1,0,0,0,8.8,26.7);
        this.instance_6.alpha = 0.0508;

        this.instance_7 = new lib.CachedBmp_797();
        this.instance_7.setTransform(8,70.25,0.3551,0.3551);

        this.instance_8 = new lib.CachedBmp_796();
        this.instance_8.setTransform(14,5.2,0.3551,0.3551);

        this.instance_9 = new lib.CachedBmp_795();
        this.instance_9.setTransform(13.9,57.2,0.3551,0.3551);

        this.instance_10 = new lib.CachedBmp_794();
        this.instance_10.setTransform(33.55,58.15,0.3551,0.3551);

        this.instance_11 = new lib.CachedBmp_793();
        this.instance_11.setTransform(17,95,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_6,this.instance_7,this.instance_8,this.instance_9,this.instance_10,this.instance_11];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_3, new cjs.Rectangle(4.1,5.2,114.10000000000001,149), null);


    (lib.ClipGroup_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_2 = new cjs.Shape();
        mask_2._off = true;
        mask_2.graphics.p("AHwLIQgRgbgxg/QhUhrgQhnQgEgbAghgQAdhZgOgfQgEgHgDgRQgBgFgUgWQhBhGhKBGQg6A3gTBLQhAiUh/hiQhEgzgLgKQg3gvgaguQhOiFCKiKQhpgph1AJQh0AIhjA3IgmAWQgXAMgSAGQgXAHgVgDQgYgCgQgOQgdgZAAg1QgBg8Agg7QAeg2AzgpQBrhWB1gfQCpguCigKQCwgLCcAgQA4AMBDAlQAuAaBCAvQBXA+AcAXQBIA5AbArQB2C4AOCHQATCmhpDvIg1B3QgeBGgVBEQgtCWgDDLQgThAgkg5g");
        mask_2.setTransform(89.0637,91.2343);

        // Calque_3
        this.instance_2 = new lib.Path_3_1();
        this.instance_2.setTransform(79.3,57.2,1,1,0,0,0,18.8,8.4);
        this.instance_2.alpha = 0.1016;

        this.instance_3 = new lib.Path_1_1_1();
        this.instance_3.setTransform(39.1,31.6,1,1,0,0,0,39.1,31.6);
        this.instance_3.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_2,this.instance_3];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_7, new cjs.Rectangle(9.9,8,88.3,57.900000000000006), null);


    (lib.ClipGroup_5_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_2 = new cjs.Shape();
        mask_2._off = true;
        mask_2.graphics.p("A/NK5QAhhjATjmQAQjRAshdQA/iGCYiYQCcibCFg3QAigOA6gJQBEgKAZgHQBRgXEQh2QDbhfArALIStBXQA+AFCtBTQB2A4BuA+QBNAqBYAfICIAwQCcBADBDMQCOCWA9CtQA1CUANDvg");
        mask_2.setTransform(206.325,94.0225);

        // Calque_3
        this.instance_4 = new lib.CachedBmp_784();
        this.instance_4.setTransform(265.7,23.75,0.3551,0.3551);

        this.instance_5 = new lib.Path_1_3();
        this.instance_5.setTransform(76.6,50.7,1,1,0,0,0,76.6,50.7);
        this.instance_5.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_4,this.instance_5];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_5_2, new cjs.Rectangle(6.5,24.3,399.7,139.5), null);


    (lib.ClipGroup_4_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_6 = new cjs.Shape();
        mask_6._off = true;
        mask_6.graphics.p("AAZItQjMgii3iBQh+hXhph9QguhogEgXQgHgjAggXQAKgIBAgnQA3giAYgVQAngkAHipQAGh8gLiJIOWBUIgFDlQgECrgEBCQgCArAWASQAQAMA+AfIAtAZQAQAOAFAqQADAXgVA6QgWA5gRARQhJBIggAWQgPALhYAyIhmA8QgpAYgZAIQgTAGgfAAQg0AAhVgPg");
        mask_6.setTransform(66.9378,66.3516);

        // Calque_3
        this.instance_8 = new lib.Path_10();
        this.instance_8.setTransform(18,36.5,1,1,0,0,0,18,36.5);
        this.instance_8.alpha = 0.0508;

        this.instance_9 = new lib.CachedBmp_783();
        this.instance_9.setTransform(71.75,29.05,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_8,this.instance_9];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_6, new cjs.Rectangle(2.4,9.2,129.1,74.89999999999999), null);


    (lib.ClipGroup_3_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_9 = new cjs.Shape();
        mask_9._off = true;
        mask_9.graphics.p("AAPNnQhtgFh2hjQhhhShKh3QhWiAgjhAQg6hqgNhnQgTiagNkNQgHifAQhcQAXiKBPhOQBMhLCUgkQB4gdB8gBQB7gBB3AbIgTgeQCGgBBzBTQBzBSArB/QASA0gUCAIgcC4QgFBfgFCQQgGB5gSBwQgqD9iECiQhSBlhHAuQhTA0hhAAIgQAAg");
        mask_9.setTransform(86.3494,87.091);

        // Calque_3
        this.instance_25 = new lib.CachedBmp_782();
        this.instance_25.setTransform(109.15,72.75,0.3551,0.3551);

        this.instance_26 = new lib.CachedBmp_781();
        this.instance_26.setTransform(92.35,72.85,0.3551,0.3551);

        this.instance_27 = new lib.Path_2_2();
        this.instance_27.setTransform(32.6,122.1,1,1,0,0,0,32.6,47.4);
        this.instance_27.alpha = 0.0508;

        this.instance_28 = new lib.CachedBmp_780();
        this.instance_28.setTransform(91.65,19.15,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_25,this.instance_26,this.instance_27,this.instance_28];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_9, new cjs.Rectangle(25.4,19.2,122,155), null);


    (lib.ClipGroup_1_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_4 = new cjs.Shape();
        mask_4._off = true;
        mask_4.graphics.p("AofIbQgJABgzAWQgmARgYgQQghgYgXhdQghiEABiTQABipAzhgQAwhZCjiQQCeiMBgguQAdgNAxgOQA7gRAagKQAjgOBTgCQBRgDAnAKQBjAaAjAMQA7AUBDAkQBGAlA4A+QAvAzAxBQQAtBLAbBYQAcBYAFBWQAMDFgpA8QgEAGgtAyQglApgcA1IgHipQgDhIAAg6QAAgogIg6QgJg+gMglQgLglgggxQghgxgegXQghgahXAGQh/AIgGAAIhigGQg8gEgogHQgygIhTAFQhDAEgsARQgsARg1ArQgnAgACA1QACBOgJAdQgWBFgIAjQgNA5gBAyQAAA1gmBiQgmBjgBA1QgTgzgfABg");
        mask_4.setTransform(102.0995,75.075);

        // Calque_3
        this.instance_12 = new lib.Path_0_2();
        this.instance_12.setTransform(76.1,68,1,1,0,0,0,76.1,68);
        this.instance_12.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_12];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_4, new cjs.Rectangle(26.7,16.2,125.7,117.8), null);


    (lib.ClipGroup_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_3 = new cjs.Shape();
        mask_3._off = true;
        mask_3.graphics.p("AAjDRQgwglgNhJQgEgVgRgZQgXgcgMgRQgthBAGhkQABgWAIgQQANgdAaAAQApAAAtAnQA2AtATBEIAlEDQgWAmgcAAQgSAAgUgQg");
        mask_3.setTransform(23.7147,30.4805);

        // Calque_3
        this.instance_4 = new lib.Path_5_1();
        this.instance_4.setTransform(32.6,47.4,1,1,0,0,0,32.6,47.4);
        this.instance_4.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_4];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_8, new cjs.Rectangle(11.5,8,24.5,45), null);


    (lib.ClipGroup_5_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_3 = new cjs.Shape();
        mask_3._off = true;
        mask_3.graphics.p("A7kLbQgJiiAiihQAThYBFjcQAtiRCLipQCRizCCg2QAZgKBBgnQA3ghAkgKQBBgTEOhoQDHhOAsALIQCC/QBtAnDUCOQDPCJAnAMQA1AQBAAPQAuAMAdAVQAzAkDOD5QBEBTAxCiQA3C7gTCeg");
        mask_3.setTransform(176.6886,104.107);

        // Calque_3
        this.instance_6 = new lib.Path_11();
        this.instance_6.setTransform(81.5,35.7,1,1,0,0,0,67.2,35.7);
        this.instance_6.alpha = 0.0508;

        this.instance_7 = new lib.CachedBmp_768();
        this.instance_7.setTransform(245.4,49.45,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_6,this.instance_7];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_5_3, new cjs.Rectangle(14.3,31,339.09999999999997,146.3), null);


    (lib.ClipGroup_4_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_7 = new cjs.Shape();
        mask_7._off = true;
        mask_7.graphics.p("AEYJPQjOhejOiHQhbg8i4iHQhihGgwhDQgyhDAhgZQAKgIBNgvQBEgqAYgWQAmgkAGiTQAEhigLiNIN6CcQAAAtgkDRQglDYgDAuQgCAoAVAPIAVANQAPAJAKAMQAcAgAOA3QAIAeAIBFQAGAwgWA2QgLAdgSAQIgnAhQhSBQhMAAQgfAAgegNg");
        mask_7.setTransform(63.9952,72.6882);

        // Calque_3
        this.instance_10 = new lib.CachedBmp_767();
        this.instance_10.setTransform(55.15,29.35,0.3551,0.3551);

        this.instance_11 = new lib.Path_1_4();
        this.instance_11.setTransform(20.1,35.4,1,1,0,0,0,20.1,35.4);
        this.instance_11.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_10,this.instance_11];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_7;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_7, new cjs.Rectangle(5.6,12.3,116.9,84.9), null);


    (lib.ClipGroup_1_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_5 = new cjs.Shape();
        mask_5._off = true;
        mask_5.graphics.p("AlzIiQgphJg8gPQgpgKhAAQQhGASgQgCQglgEgHg3QgYi5gBhfQgDiuAxhaQA6htB3huQCMiBB8gXIBRgKQAzgGAwgOQApgLA9gGQBFgHAxAFICFAMQA7AKBAAiQBVAtAqAiQA5AtAoBCQBQCFAMDLQAHBxgCAhQgEBGgdB5IgGAMQgChGgIg/QgDgcgOhgQgNhcgqg/QgUgfg9gaQhAgbg3ACQhHADgjgEQgUgCg3gLQh/gZhuAIQg+AFgsArQgkAkALBVIAJBIQADAogHAcQgNAxg2A3Qg4A6gNApQgJAbgoA5QggAugBApg");
        mask_5.setTransform(93.5553,70.4208);

        // Calque_3
        this.instance_13 = new lib.Path_0_3();
        this.instance_13.setTransform(83.6,70.5,1,1,0,0,0,8.3,12.2);
        this.instance_13.alpha = 0.1016;

        this.instance_14 = new lib.Path_1_0_2();
        this.instance_14.setTransform(71.8,83.2,1,1,0,0,0,71.8,83.2);
        this.instance_14.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_13,this.instance_14];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_5, new cjs.Rectangle(20.3,15.8,123.50000000000001,109.3), null);


    (lib.ClipGroup_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_4 = new cjs.Shape();
        mask_4._off = true;
        mask_4.graphics.p("AAtDXQgpghgghOQgDgJgVgXQgYgcgNgVQgxhMAHhsQABgOAUgYQAXgcAYgDQA2gGAzAjQBHAuAUBoIAAD2QgWAlgcAAQgSAAgUgRg");
        mask_4.setTransform(18.2252,34.0811);

        // Calque_3
        this.instance_5 = new lib.Path_3_3();
        this.instance_5.setTransform(14.1,29.6,1,1,0,0,0,14.1,29.6);
        this.instance_5.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_5];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_9, new cjs.Rectangle(5,10.9,23.1,46.4), null);


    (lib.ClipGroup_3_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_10 = new cjs.Shape();
        mask_10._off = true;
        mask_10.graphics.p("AhrK2Qh0gugqgbQg3gjhGhTQgngugRhgQgShkgfgqQgggpgQgYQgcgrgFgdQgPhJgCgUQgDgXAChHQABgpgGg9QgHhNAAgRQgFhrAvhIQBMh4CphPQCfhLCygNQCzgNCpAzIAXAgQAtA+AnBSQAZA0AqBpIApBlQAYBAADAoQACAjgPAsQgTA4gDAWQgWCgALCfQABATAHAqQAFAlgNAUQgDAFgPAGQgOAGgDAFQgDAGAFARQAFAUAAAEQgDAbgNAtQgNAugDAaIgDA6QgDAngLAQQgSAbgtAGQg2ACgZADQgoAEgoAAQi0AAi+hNg");
        mask_10.setTransform(77.498,78.5345);

        // Calque_3
        this.instance_29 = new lib.CachedBmp_743();
        this.instance_29.setTransform(43.75,54,0.3551,0.3551);

        this.instance_30 = new lib.CachedBmp_742();
        this.instance_30.setTransform(120.4,92,0.3551,0.3551);

        this.instance_31 = new lib.CachedBmp_741();
        this.instance_31.setTransform(44.45,0,0.3551,0.3551);

        this.instance_32 = new lib.Path_3_4();
        this.instance_32.setTransform(19.2,91.45,1,1,0,0,0,19.2,41.6);
        this.instance_32.alpha = 0.0508;

        this.instance_33 = new lib.CachedBmp_740();
        this.instance_33.setTransform(79.45,0.85,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_29,this.instance_30,this.instance_31,this.instance_32,this.instance_33];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_10, new cjs.Rectangle(16.7,1.5,121.60000000000001,154.1), null);


    (lib.ClipGroup_2_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_6 = new cjs.Shape();
        mask_6._off = true;
        mask_6.graphics.p("AzxL0QgmhDAAgzQAGg8ABguQgEhJgChDQgCh+AWigQAZi7B8iiQAhgsA9hBQAzg4ANgVQAyhQDdiCQDdiBA5APQAnAICMBwQDWCpAWARQBTA7AjAdIC6CcQA/A2BEAyQAsAfBvBMQADghgNgoQgKgdgWgpQg4hmhJhfIgFgmIAKAFQBEBHCTB4QB/BnBXBmQAoAwBoBrQBcBdA3BJQBGBaAjBMQAyBqAQCEg");
        mask_6.setTransform(155.25,90.5267);

        // Calque_3
        this.instance_15 = new lib.CachedBmp_739();
        this.instance_15.setTransform(182.35,45.55,0.3551,0.3551);

        this.instance_16 = new lib.Path_1_5();
        this.instance_16.setTransform(61.4,87.4,1,1,0,0,0,61.4,87.4);
        this.instance_16.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_15,this.instance_16];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16},{t:this.instance_15}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_6, new cjs.Rectangle(24.8,15,260.9,151.1), null);


    (lib.ClipGroup_1_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_6 = new cjs.Shape();
        mask_6._off = true;
        mask_6.graphics.p("AAbD9QgygcgNg+QgFgWgdgmQgng0gMgVQg7hmA4h5QAOgfAegUQAegUAgABQA8ACArApQA8A4AHB5IgMEIQgkArgmAAQgTAAgUgLg");
        mask_6.setTransform(24.3365,32.8699);

        // Calque_3
        this.instance_15 = new lib.Path_18();
        this.instance_15.setTransform(19.2,41.6,1,1,0,0,0,19.2,41.6);
        this.instance_15.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_15];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_6, new cjs.Rectangle(9.1,6.5,29.299999999999997,52.8), null);


    (lib.ClipGroup_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_5 = new cjs.Shape();
        mask_5._off = true;
        mask_5.graphics.p("Ao1K8QgWiMgLgmQgVhEgehGIg1h3QhpjxASikQAPiHB2i4QAbgrBIg5QAfgZBUg8QBCgvAugaQBDglA4gMQCdggCvALQCiAKCpAuQB0AfBrBWQAzApAeA2QAhA7gBA8QgBA2gcAYQgQAOgYACQgVADgXgHQgSgGgXgMIgngWQhig3h0gIQh1gJhpApQCKCKhOCFQgaAug3AvQgLAKhEAzQh/BihACUQgThLg6g3QhKhGhBBGQgUAWgBAFQgEAQgDAIQgPAfAeBZQAgBggEAbQgWCHhDBnQg8BcgzAHQgWAAgOhbg");
        mask_5.setTransform(101.0681,86.8843);

        // Calque_3
        this.instance_6 = new lib.Path_0_4();
        this.instance_6.setTransform(138.65,61.45,1,1,0,0,0,31.9,16.1);
        this.instance_6.alpha = 0.1016;

        this.instance_7 = new lib.Path_1_0_3();
        this.instance_7.setTransform(77.9,71.9,1,1,0,0,0,77.9,71.9);
        this.instance_7.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_6,this.instance_7];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_10, new cjs.Rectangle(21.9,7.8,148.79999999999998,136), null);


    (lib.ClipGroup_5_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_4 = new cjs.Shape();
        mask_4._off = true;
        mask_4.graphics.p("A7hLbQgTieA4i7QAwiiBEhTQDOj5AzgkQAdgVAugMIB1gfQAngMDPiJQDUiOBtgnIQCi/QAsgLDHBOQEOBoBBATQAkAKA3AhQBBAnAZAKQCCA2CRCzQCLCpAtCRQBFDZATBbQAiChgJCig");
        mask_4.setTransform(190.4129,94.807);

        // Calque_3
        this.instance_8 = new lib.Path_19();
        this.instance_8.setTransform(61.2,106.15,1,1,0,0,0,61.2,67.8);
        this.instance_8.alpha = 0.0508;

        this.instance_9 = new lib.CachedBmp_730();
        this.instance_9.setTransform(204.85,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_8,this.instance_9];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_5_4, new cjs.Rectangle(13.8,21.7,353.3,146.3), null);


    (lib.ClipGroup_3_11 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_11 = new cjs.Shape();
        mask_11._off = true;
        mask_11.graphics.p("AmcMvQg6hHgdhwIgahsQgRhHgUg5QgghfAJhRQALhogNhRQgCgLgMgYQgLgYgFggQgPhrAlkxQARiKCDiLQCHiQCCABIgUAeQB4gbB7ABQB8ABB3AdQCVAkBMBLQBOBOAYCKQAQBcgICfQgGCIgFBMQgIB0gMBfQgMBhhGBgIhABUQgpA0gZAoQhGBxhSBKQhhBYh4ArQiMAyhXAFIgSAAQhyAAg8hKg");
        mask_11.setTransform(68.8033,88.8957);

        // Calque_3
        this.instance_34 = new lib.Path_0_5();
        this.instance_34.setTransform(10.8,94.6,1,1,0,0,0,10.2,65.3);
        this.instance_34.alpha = 0.0508;

        this.instance_35 = new lib.CachedBmp_728();
        this.instance_35.setTransform(22.35,96.65,0.3551,0.3551);

        this.instance_36 = new lib.CachedBmp_727();
        this.instance_36.setTransform(0,80.45,0.3551,0.3551);

        this.instance_37 = new lib.CachedBmp_726();
        this.instance_37.setTransform(6.6,9.35,0.3551,0.3551);

        this.instance_38 = new lib.CachedBmp_725();
        this.instance_38.setTransform(27.05,118.2,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_34,this.instance_35,this.instance_36,this.instance_37,this.instance_38];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_11;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_11, new cjs.Rectangle(6.6,9.4,113.9,168.4), null);


    (lib.ClipGroup_2_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_7 = new cjs.Shape();
        mask_7._off = true;
        mask_7.graphics.p("AhUDQQgmgNgOgWQgWghAZhDIA5iMQAkhdAJg0IBSAAQAHBvAKAyQAPBMAhAmIAPARQAJAJADAGQAFAMAAAPQgBANgFALQgKATgSAHQgKADgUgDQgHgBgJgGIgPgKQgYgKgpAYQgNAHgCAHQgCAEgCAIQgEAQgTACIgFAAQgJAAgQgFg");
        mask_7.setTransform(18.3996,33.44);

        // Calque_3
        this.instance_17 = new lib.Path_1_6();
        this.instance_17.setTransform(7.2,27.1,1,1,0,0,0,7.2,27.1);
        this.instance_17.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_17];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_7;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_7, new cjs.Rectangle(3.7,12.2,10.5,42.2), null);


    (lib.ClipGroup_11 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_6 = new cjs.Shape();
        mask_6._off = true;
        mask_6.graphics.p("AFfIiQAAgpghguQgog4gJgcQgNgpg4g6Qg2g3gNgxQgIgfANhtQALhVgkgkQgrgrg/gFQhugIh/AZQg3ALgUACQgjAEhHgDQg3gChAAbQg9AagUAfQgqA/gNBcIgSB1QgIA7gCBEQgfh8gFhCQgDgsAGhmQAMjLBQiFQAohCA5gtQAqgiBVgtQBAgiA7gKQAmgGBfgGQAygFBEAHQA9AGApALQAwAOAzAGIBRAKQB8AXCMCBQB3BuA6BtQAxBagDCuQgBBigYC2QgHA3glAEQgQAChFgSQhBgQgoAKQg9APgpBJg");
        mask_6.setTransform(79.5917,60.4708);

        // Calque_3
        this.instance_8 = new lib.Path_3_5();
        this.instance_8.setTransform(44.6,50.8,1,1,0,0,0,44.6,50.8);
        this.instance_8.alpha = 0.1016;

        this.instance_9 = new lib.Path_1_0_4();
        this.instance_9.setTransform(88.15,65.8,1,1,0,0,0,11.8,19.1);
        this.instance_9.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_8,this.instance_9];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_11, new cjs.Rectangle(6.4,5.9,93.8,95.69999999999999), null);


    (lib.ClipGroup_5_5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_5 = new cjs.Shape();
        mask_5._off = true;
        mask_5.graphics.p("A/NK5QANjvA1iUQA9itCOiWQDBjMCbhAICJgwQBYgfBNgqQBvg+B1g4QCthTA+gFISthXQArgLDbBfQEQB2BRAXQAZAHBEAKQA6AJAiAOQCFA3CcCbQCYCYA/CGQArBdARDRQATDmAhBjg");
        mask_5.setTransform(210.725,86.3225);

        // Calque_3
        this.instance_10 = new lib.CachedBmp_715();
        this.instance_10.setTransform(257.3,0,0.3551,0.3551);

        this.instance_11 = new lib.Path_1_7();
        this.instance_11.setTransform(71.4,91.5,1,1,0,0,0,71.4,75.1);
        this.instance_11.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_10,this.instance_11];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_5_5, new cjs.Rectangle(10.9,16.6,399.70000000000005,139.5), null);


    (lib.ClipGroup_1_7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_7 = new cjs.Shape();
        mask_7._off = true;
        mask_7.graphics.p("AhwDDQgVgFgLgNQgJgLgDgRQgDgQAFgNQAFgOAYgkQBFhiAbimIBaAJQACAoAJAjQAFAXARAzQANAlAJATIAPAbQAKAQAEALQAHAPAEARQAEAVgDANQgHAogYAEQgPADgIgEQgEgCgEgHIgGgLQgHgMgNgEQgNgEgMAFQgJAFgMAKIgVAQQgQANgggBQgNgBgQgLQgFgCgFgHQgEgFgFgCQgHgFgHAGQgHAFADAHIAIAIQAEAIgFADIgDABIgEgBg");
        mask_7.setTransform(19.8293,32.4);

        // Calque_3
        this.instance_16 = new lib.Path_21();
        this.instance_16.setTransform(8.1,27.9,1,1,0,0,0,8.1,27.9);
        this.instance_16.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_16];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_7;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_7, new cjs.Rectangle(4.1,12.9,12.299999999999999,39.1), null);


    (lib.ClipGroup_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_7 = new cjs.Shape();
        mask_7._off = true;
        mask_7.graphics.p("AHHG1QgmhjgBg0QAAgygNg5QgIgjgWhFQgJgdAChOQACg1gnggQg1grgsgRQgsgShDgDQhUgFgxAIQgpAHg7AEIhiAGQgGAAh/gIQhYgGghAaQgdAXghAxQggAxgMAlQgLAlgJA+QgIA7AAAnQAAA8gDBGIgHCpQgcg1glgpQgtgygEgGQgpg8AMjFQAFhWAbhYQAchYAthLQAxhQAvgzQA4g+BGglQBDgkA7gUQAjgMBjgaQAmgKBSADQBTACAjAOQAaAKA7ARQAxAOAdANQBgAuCdCMQCkCQAvBZQA0BgABCpQABCTghCEQgXBdghAYQgYAQgmgRQgzgWgJgBQgggBgSAzQgBg1gmhjg");
        mask_7.setTransform(88.5505,60.875);

        // Calque_3
        this.instance_10 = new lib.Path_0_6();
        this.instance_10.setTransform(48.4,51.5,1,1,0,0,0,48.4,51.5);
        this.instance_10.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_10];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_7;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_12, new cjs.Rectangle(13.1,2,83.80000000000001,101), null);


    (lib.ClipGroup_4_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_8 = new cjs.Shape();
        mask_8._off = true;
        mask_8.graphics.p("AG/KpIhvhuIhwhtIgCgCIgBAAQgggfglgaQgrghgvgoQgmgiiwiRIhjhQQhMg7gdgLQhugmgwAFQATgVAMgZQAag1AFi2QAFizgTjEIOdHCQA4BdAABLQgBA9gnBCIhTB6Qg2BPgVBGQgFAQgOAYQgLAdAAA+IABAeIA3AxQAzAvAVAWIAPASQALANAEACIALAdIAGAUg");
        mask_8.setTransform(77.4502,68.925);

        // Calque_3
        this.instance_12 = new lib.Path_22();
        this.instance_12.setTransform(21.2,52,1,1,0,0,0,21.2,25.4);
        this.instance_12.alpha = 0.0508;

        this.instance_13 = new lib.CachedBmp_697();
        this.instance_13.setTransform(77.65,44.1,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_12,this.instance_13];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_8;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_8, new cjs.Rectangle(26,26.7,103,111.2), null);


    (lib.ClipGroup_3_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_12 = new cjs.Shape();
        mask_12._off = true;
        mask_12.graphics.p("AByLsQhPgRiNgyQh4grgWgNQgogXhJhPQgogrgEiRQgDhLgEgeQgIg3gXgcIhBhGQgsgygGgbQgHgegZhIQgPgrgBg/QgCiHADgVQAGg8AphQQAghAAogdQAQgNBagvQCdhRCygUQCygVCqAsIBEAzQAuA6AiBEIA/CMQAiBNATBkQAJAugQA5QgVBNgBAMQgFAxAIBBIAMBzQASAAAQAMQAQALAEAMQAIAhhQgKIAFAhQACATAJApQAGAlgMAUQgDAFgPAHQgOAGgCAGQgCAGAFARQAGATgBAFQgBAagLAuQgLAugCAbIgBA6QgCAngKAQQgRAcgsAIQg2AEgaAEQgjAFglAAQhIAAhSgSg");
        mask_12.setTransform(72.2125,82.1745);

        // Calque_3
        this.instance_39 = new lib.CachedBmp_696();
        this.instance_39.setTransform(46.85,5.55,0.3551,0.3551);

        this.instance_40 = new lib.CachedBmp_695();
        this.instance_40.setTransform(52.65,57.05,0.3551,0.3551);

        this.instance_41 = new lib.CachedBmp_694();
        this.instance_41.setTransform(51.5,0,0.3551,0.3551);

        this.instance_42 = new lib.CachedBmp_693();
        this.instance_42.setTransform(115.4,99.1,0.3551,0.3551);

        this.instance_43 = new lib.Path_4_3();
        this.instance_43.setTransform(18.6,97.95,1,1,0,0,0,18.6,43.2);
        this.instance_43.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_39,this.instance_40,this.instance_41,this.instance_42,this.instance_43];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_12;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_12, new cjs.Rectangle(11.5,5.6,121.5,153.20000000000002), null);


    (lib.ClipGroup_2_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_8 = new cjs.Shape();
        mask_8._off = true;
        mask_8.graphics.p("AyqMMQgUhCAAglQAEgvAAguQABgXARhGQAYhdAUiSQAZi/BUjBQAag8AmhKIAuhbQA/iJCRhnQAmgbBIgvQA7gqAeglQAigbAggCQAxgCBoAlQAtAQCfCGQCzCUAiAeQAvApAtAhQAkAbAjAgICCCAQBXBUAgAhQAfAigCgOQgBgKgag6QBOBRBEAuQBDAuBdBiQBNBQAoAwQAjApBOBnQA+BQAaA3QAiBEAdB4g");
        mask_8.setTransform(160.725,95.4672);

        // Calque_3
        this.instance_18 = new lib.CachedBmp_692();
        this.instance_18.setTransform(190.7,65.85,0.3551,0.3551);

        this.instance_19 = new lib.Path_1_8();
        this.instance_19.setTransform(63.2,92.8,1,1,0,0,0,63.2,92.8);
        this.instance_19.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_18,this.instance_19];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_8;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.instance_18}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_8, new cjs.Rectangle(39.3,17.5,242.89999999999998,156), null);


    (lib.ClipGroup_1_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_8 = new cjs.Shape();
        mask_8._off = true;
        mask_8.graphics.p("ABAD5Qg4gTgWg7QgIgVgighQgwgtgOgSQhLhcAjiAQAJghAbgYQAagZAfgEQA9gIAwAhQBFAuAaB1IAfEHQghA4gsAAQgOAAgPgGg");
        mask_8.setTransform(24.6548,25.6544);

        // Calque_3
        this.instance_17 = new lib.Path_0_7();
        this.instance_17.setTransform(18.6,43.2,1,1,0,0,0,18.6,43.2);
        this.instance_17.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_17];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_8;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_8, new cjs.Rectangle(7.7,0.2,29.599999999999998,50.9), null);


    (lib.ClipGroup_13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_8 = new cjs.Shape();
        mask_8._off = true;
        mask_8.graphics.p("Ao7MsQgZgMgVhjQgjijgGgTIgfhoQgKgfgXg1Qhsj6AHi+QAHizBviuQAvhJC5iEQA2gmBTgmQBYgoA9gNQCTgeDDAYQCPASDGA1QA9AQBJAlQBLAlAwAnQAsAjAQA+QALAsAABNQgBAugeAaQgUARgVAIQgZAKgUgGQgPgEgQgWQgSgYgLgHQh8hFhhgLQiCgQhMBbQCLCLg0B3QgbA9hsBRQg3AqgvBUQgYArguBrQgiiOhXhMQhdhRhHBNQgWAYgFAtQgCATABAyQACApA8BMQA6BIgFAeQgVCEiYB6Qg8Avg6AbQgrAUgZAAQgIAAgGgCg");
        mask_8.setTransform(108.5548,81.7234);

        // Calque_3
        this.instance_11 = new lib.Path_3_7();
        this.instance_11.setTransform(139.7,49.6,1,1,0,0,0,37.2,10.5);
        this.instance_11.alpha = 0.1016;

        this.instance_12 = new lib.Path_1_0_5();
        this.instance_12.setTransform(55.5,97.6,1,1,0,0,0,55.5,97.6);
        this.instance_12.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_11,this.instance_12];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_8;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12},{t:this.instance_11}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_13, new cjs.Rectangle(26.2,0.4,150.9,162.7), null);


    (lib.ClipGroup_2_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_9 = new cjs.Shape();
        mask_9._off = true;
        mask_9.graphics.p("AjgLqQgogEgWgNQgvgdgFhRIABg/QAAgmgFgZQgMgmgDgUQgEggAVgRQgWADgLgbQgHgRgBgbQgBgZAIgZIAJgTQhVARgZglQgSgcAQgzQAMgnBAhYQA/hTAOg6QAFgWgUgZIgpgyQgxhOBViHQATgeAUgrIAihJQArhWBIhAQBZgeB8ALQB0AKBhAoQBZAkAsAvQBMBQAGCKQAIC4h5DdIgoBIQgWArgMAhQgPAtgNBUQgNBcgLAmQgVBKguBBQguBAhAAsQhAAshLAVQg6APg7AAQgTAAgSgBg");
        mask_9.setTransform(53.4192,74.7458);

        // Calque_3
        this.instance_20 = new lib.Path_23();
        this.instance_20.setTransform(22.45,28.15,1,1,0,0,0,15.2,25.9);
        this.instance_20.alpha = 0.0508;

        this.instance_21 = new lib.Path_1_9();
        this.instance_21.setTransform(10.6,80.4,1,1,0,0,0,10.6,19.4);
        this.instance_21.alpha = 0.0508;

        this.instance_22 = new lib.CachedBmp_681();
        this.instance_22.setTransform(19.15,112.5,0.3551,0.3551);

        this.instance_23 = new lib.CachedBmp_680();
        this.instance_23.setTransform(10.6,46.9,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_20,this.instance_21,this.instance_22,this.instance_23];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_9, new cjs.Rectangle(4.9,2.3,78.19999999999999,147.2), null);


    (lib.ClipGroup_1_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_9 = new cjs.Shape();
        mask_9._off = true;
        mask_9.graphics.p("AzULuQAThrBOiTQBeilAphNQAeg2AjhRQAnhaAVgrQBIifBThYQAtgvBEgsQAogbBWgvQBFgmAkgMQAYgHAogIIBCgPQA3gPA4giQAOgJBTg6QB/hcCPgcQA/gMBRAIQAyAEBeATQAcAFAgAbQARAPAiAhQAUARATAnQAKAVASArQAmBVByCHQB6CRAmBHQBiCyA0DgQATBSAXB+IAnDjg");
        mask_9.setTransform(145,85.0689);

        // Calque_3
        this.instance_18 = new lib.Path_0_8();
        this.instance_18.setTransform(61.4,97.55,1,1,0,0,0,61.4,70.8);
        this.instance_18.alpha = 0.0508;

        this.instance_19 = new lib.CachedBmp_679();
        this.instance_19.setTransform(181.8,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_18,this.instance_19];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.instance_18}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_9, new cjs.Rectangle(21.3,10.1,247.39999999999998,150), null);


    (lib.ClipGroup_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_9 = new cjs.Shape();
        mask_9._off = true;
        mask_9.graphics.p("AFSMyQiUgTiFhAQgvgXgHgbQgDgMADgQIAIgcQAXhEAChCQAChIgWg9QgWhCgygwQg0gyhBgOQhDgPhCAeQhDAfgbA9QgYhuhOhOIg2gwQgigegRgWQgyhAABhkQAChlA2g8QgbgZgoAoIgiAkQgUAWgQAIQgRAKgQgEQgIgCgJgNQgKgMgCgJQgLg2AIg8QAHhBAbgrQAagqA2gvQAygqAxgbQBhg1BugnQB1grBzgWQBYgRBsAFQBMAEB6ASQCnAaCyCiQB7BwA4C/QA0CwgTC2QgNCDhBCHQhlDUgjBlQgYBDgRAgQgdA5gmATQgiARg2AAQgYAAgdgEg");
        mask_9.setTransform(88.3772,88.3243);

        // Calque_3
        this.instance_13 = new lib.Path_2_6();
        this.instance_13.setTransform(29.8,70.65,1,1,0,0,0,11.9,16.4);
        this.instance_13.alpha = 0.1016;

        this.instance_14 = new lib.Path_1_0_6();
        this.instance_14.setTransform(51.3,34.5,1,1,0,0,0,51.3,34.5);
        this.instance_14.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_13,this.instance_14];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_14, new cjs.Rectangle(7.8,6.2,94.8,80.7), null);


    (lib.ClipGroup_3_13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_13 = new cjs.Shape();
        mask_13._off = true;
        mask_13.graphics.p("AlUL5Qg1gEgagEQgsgIgRgcQgKgQgCgnIgBg6QgCgbgLguQgLgugCgaQAAgFAGgTQAFgRgCgGQgCgGgPgGQgOgHgDgFQgMgUAGglQAJgpACgTQAEgSABgPQhRAKAJghQADgMAQgLQARgMASAAIAMhzQAHhBgFgxQgBgLgVhOQgPg5AJguQARhhAkhQQA5iBAGgLQAihDAug7IBEgzQCqgsCyAVQCyAUCcBRQBbAvAQANQAoAdAgBAQAoBQAHA8QADAXgCCFQgBA+gPAsQgZBGgHAgQgGAbgtAyQgyA1gPARQgWAcgIA3QgEAegDBLQgECRgpArQhJBPgnAXQgWANh5ArQiMAyhPARQhSAShIAAQgmAAgjgFg");
        mask_13.setTransform(62.3329,80.0745);

        // Calque_3
        this.instance_44 = new lib.CachedBmp_669();
        this.instance_44.setTransform(18.35,0,0.3551,0.3551);

        this.instance_45 = new lib.Path_1_10();
        this.instance_45.setTransform(12.8,37.8,1,1,0,0,0,12.8,33.5);
        this.instance_45.alpha = 0.0508;

        this.instance_46 = new lib.CachedBmp_668();
        this.instance_46.setTransform(8.2,94.75,0.3551,0.3551);

        this.instance_47 = new lib.CachedBmp_667();
        this.instance_47.setTransform(17.6,55.85,0.3551,0.3551);

        this.instance_48 = new lib.CachedBmp_666();
        this.instance_48.setTransform(2.8,96.05,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_44,this.instance_45,this.instance_46,this.instance_47,this.instance_48];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_13;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_13, new cjs.Rectangle(1.6,3.5,114.9,153.2), null);


    (lib.ClipGroup_2_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_10 = new cjs.Shape();
        mask_10._off = true;
        mask_10.graphics.p("AhPC8QgcgGgNgQQgMgRACghQADgeAMgWIBTiBQArhIgFgzIA/DBIAaAZQAPAPAHAMQAKAUADAJQADAPgFAPQgHARgIAHQgIAIgRAFQgRAEgVgLQgngWgWAGQg2APAMASQALASAzgBQgrAJgaAAQgLAAgIgBg");
        mask_10.setTransform(15.5215,18.9318);

        // Calque_3
        this.instance_24 = new lib.Path_24();
        this.instance_24.setTransform(8.4,20.35,1,1,0,0,0,8.4,18.1);
        this.instance_24.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_24];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_10, new cjs.Rectangle(2.4,2.3,14.4,35.6), null);


    (lib.ClipGroup_1_10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_10 = new cjs.Shape();
        mask_10._off = true;
        mask_10.graphics.p("Ay+MMQAeh4AhhEQAbg4A9hPQBOhmAjgqQAogvBNhRQBehiBCguQBEguBOhRQgaA7gBAJQgCAOAggiQAfghBXhUICCiAQAjggAkgbQAtghAugpQAkgfBIg7IBqhYQBDg4AggZQBMg6AegLQBnglAxACQAgACAiAbQAeAlA7AqIBuBKQCRBnA/CJIAuBbQAmBKAaA8QBUDBAaC/QATCSAXBdQASBGAAAXQACAuADAvQgBAkgSBDg");
        mask_10.setTransform(131.8,92.5172);

        // Calque_3
        this.instance_20 = new lib.Path_0_9();
        this.instance_20.setTransform(44.6,124.3,1,1,0,0,0,44.6,55.5);
        this.instance_20.alpha = 0.0508;

        this.instance_21 = new lib.CachedBmp_665();
        this.instance_21.setTransform(155.15,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_20,this.instance_21];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_21},{t:this.instance_20}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_10, new cjs.Rectangle(10.3,14.6,243,155.9), null);


    (lib.ClipGroup_15 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_10 = new cjs.Shape();
        mask_10._off = true;
        mask_10.graphics.p("AH3LiQgighhYhBQhTg8gjglQg2g7gLhBQgEgfA5hIQA9hMABgoQACgygCgTQgFgugWgYQhHhLhdBPQhXBMgjCOQgshpgZgtQgvhUg3gqQhshRgbg8Qg0h4CLiLQhMhaiCAPQhhAMh8BFQgMAGgRAZQgQAVgPAFQgUAGgZgLQgWgIgTgRQgfgZAAguQAAhNALgsQAQg+ArgjQAxgnBKgmQBKgkA9gRQDGg0CPgSQDDgZCTAfQA9AMBYAoQBUAnA1AmQC6CEAuBIQBvCvAGCzQAIC+hsD5QgZA5gWBBQgSA0gbBaQgaBWgLBFQgKBEgBBbQgThAg9g7g");
        mask_10.setTransform(89.5233,87.8793);

        // Calque_3
        this.instance_15 = new lib.Path_2_7();
        this.instance_15.setTransform(41.7,27.1,1,1,0,0,0,41.7,27.1);
        this.instance_15.alpha = 0.1016;

        this.instance_16 = new lib.Path_1_1_2();
        this.instance_16.setTransform(67.9,64.1,1,1,0,0,0,16.6,17.9);
        this.instance_16.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_15,this.instance_16];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16},{t:this.instance_15}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_15, new cjs.Rectangle(7.2,1.8,77.5,80.3), null);


    (lib.ClipGroup_2_11 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_11 = new cjs.Shape();
        mask_11._off = true;
        mask_11.graphics.p("AnyHqIgVgcQgQgWgBgGQgDgpANhxIAcjiQAmk4gehsIgJiUQHeAOG4AiQgUCPgKCRQgLCjABAkQAEBxAtBMQATAhAoA9QAiA3AOAqQAGASgHAJQgFAHgSAFQgxAMg8ADQgdAChRAAQleABlRA2QgWADgRAAQgxAAgPgZg");
        mask_11.setTransform(67.6774,51.4815);

        // Calque_3
        this.instance_25 = new lib.Path_25();
        this.instance_25.setTransform(11.2,59.35,1,1,0,0,0,11.2,35.9);
        this.instance_25.alpha = 0.0508;

        this.instance_26 = new lib.CachedBmp_658();
        this.instance_26.setTransform(91.75,42.2,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_25,this.instance_26];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_11;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_26},{t:this.instance_25}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_11, new cjs.Rectangle(14,23.5,107.5,79.5), null);


    (lib.ClipGroup_1_11 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_11 = new cjs.Shape();
        mask_11._off = true;
        mask_11.graphics.p("A9/L6QAWi8AqiMIBPjkQAchQBmiAQBviNBuhNQCBhbB2gyQBWgkCTgmQAugMCOhBQCfhJAsgQQAVgHCdhGQCphEBngFQCkgJBYgBQBtAACAAKQBdAHBDAOQAzALBOAZQAiAMA7ARQAuAPAVATQAXATCZBrQCUBnAeASQD6CWDTEFQDFDzAOCOQAIBWAjBaQAYA/gKBvg");
        mask_11.setTransform(208.7825,95.6488);

        // Calque_3
        this.instance_22 = new lib.Path_0_10();
        this.instance_22.setTransform(99.5,98.2,1,1,0,0,0,99.5,98.2);
        this.instance_22.alpha = 0.0508;

        this.instance_23 = new lib.CachedBmp_657();
        this.instance_23.setTransform(258.6,10.05,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_22,this.instance_23];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_11;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_23},{t:this.instance_22}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_11, new cjs.Rectangle(16.8,19.5,384,152.4), null);


    (lib.ClipGroup_16 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_11 = new cjs.Shape();
        mask_11._off = true;
        mask_11.graphics.p("AGuMxIiGgUQhAgEh6ADQhxADhLgHQg4gGglgLQgygQgdgfQgfgggVhEQghiBgUg/Qgjhug3g8QgYgagdgKQgigMgXATQgLAIgKAYQgdBEAABIQgghshBhbQgQgXgOgjQgOgogKgVQgQglgGgwQgGgrADgsQAJh1AihdQAlhmBGhTQAyg8BJg7QA4gtBTg4QA8goAqgWQA5geA0gPQBHgTBYAEQBCADBfASQBHAOBVAnQAjAQBxA8QBmA1AoAdQBIA0AgBBQAlBLANAkQAXBAgCA0QgJDyhDEEQgzDBhpEWQgNAigNATQgSAagZAHQgIACgMAAQgNAAgTgCg");
        mask_11.setTransform(90.6296,94.4718);

        // Calque_3
        this.instance_17 = new lib.Path_1_11();
        this.instance_17.setTransform(53.1,57.7,1,1,0,0,0,53.1,57.7);
        this.instance_17.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_17];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_11;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_16, new cjs.Rectangle(12.3,12.6,94.3,102.80000000000001), null);


    (lib.ClipGroup_2_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_12 = new cjs.Shape();
        mask_12._off = true;
        mask_12.graphics.p("AGNIAQlRg2legBQhSAAgdgCQg8gDgxgMQgSgFgFgHQgGgJAFgSQAOgrAig2QApg9ATghQAshMAEhxQABgmgLihQgJiKgViWQG6giHcgOIgJCUQgeBsAmE4IAcDiQANBxgDApQgBAGgQAWIgUAcQgQAZgwAAQgSAAgVgDg");
        mask_12.setTransform(55.4974,51.4912);

        // Calque_3
        this.instance_27 = new lib.Path_26();
        this.instance_27.setTransform(15.8,63.3,1,1,0,0,0,15.8,26.9);
        this.instance_27.alpha = 0.0508;

        this.instance_28 = new lib.CachedBmp_651();
        this.instance_28.setTransform(97.05,16.5,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_27,this.instance_28];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_12;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_28},{t:this.instance_27}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_12, new cjs.Rectangle(1.8,16.5,107.4,86.5), null);


    (lib.ClipGroup_1_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_12 = new cjs.Shape();
        mask_12._off = true;
        mask_12.graphics.p("A98L6QgKhvAYg/QAjhaAJhWQANiNDFj0QDTkFD6iWQAegSCVhnQCYhqAXgUQAVgTAugPIBdgdQBOgZAzgLQBEgOBcgHQCAgKBtAAQBYABCkAJQBnAFCpBEQBWAiBdArQArAQCfBJQCOBBAuAMQCTAmBWAkQB3AyCABbQBuBNBvCNQBmCAAcBQIBPDkQAqCMAWC8g");
        mask_12.setTransform(212.8175,98.7988);

        // Calque_3
        this.instance_24 = new lib.Path_0_11();
        this.instance_24.setTransform(81.4,97.5,1,1,0,0,0,81.4,97.5);
        this.instance_24.alpha = 0.0508;

        this.instance_25 = new lib.CachedBmp_650();
        this.instance_25.setTransform(260.9,32.45,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_24,this.instance_25];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_12;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_25},{t:this.instance_24}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_12, new cjs.Rectangle(20.9,22.6,383.90000000000003,152.4), null);


    (lib.ClipGroup_17 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_12 = new cjs.Shape();
        mask_12._off = true;
        mask_12.graphics.p("AniMxQgYgHgSgaQgNgSgNgjQhqkVgyjCQhEkEgIjyQgCg0AXhAQANgkAlhLQAghBBIg0QAogdBlg1QBwg8AlgQQBVgnBHgOQBegSBDgDQBXgEBHATQA0APA6AeQAqAXA8AnQBTA3A4AuQBIA7AzA8QBFBTAmBmQAiBeAJB0QADAsgGArQgGAwgRAlQgJAVgOAoQgOAjgQAXQhBBbghBsQABhKgdhCQgJgWgNgKQgWgTgiAMQgdAJgYAbQg3A8gjBuQgTA/giCBQgVBEgfAgQgeAfgxAQQglALg5AGQhKAHhxgDQh6gDhBAEIiGAUQgSACgOAAQgMAAgIgCg");
        mask_12.setTransform(102.6066,112.8718);

        // Calque_3
        this.instance_18 = new lib.Path_1_12();
        this.instance_18.setTransform(87.9,105.1,1,1,0,0,0,87.9,105.1);
        this.instance_18.alpha = 0.0586;

        var maskedShapeInstanceList = [this.instance_18];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_12;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_17, new cjs.Rectangle(24.3,31,151.5,163.8), null);


    (lib.ClipGroup_3_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_14 = new cjs.Shape();
        mask_14._off = true;
        mask_14.graphics.p("Ak2LWQglgVgcgfQgXgZgNgwQgUhMAKhQQACgUgDgHQgDgGgHgGIgOgKQgcgWgBgtQgBgcALg2QAhikgiiiQgGgbgJgPQgHgLgTgPQgTgRgHgJQgcgnAXhOQAfhqA7hgQA6hfBRhLIAYAJQCmh0ETAeQB9ANBSAnQAzAYAnAjQApAmAXAvQAaAzAFBFQAEA1gJBJQgOB3giB2QghBygvBbQjDF9kkCqQgcAQgzAPQgrAMgoAHIgLAAQgdAAgkgUg");
        mask_14.setTransform(61.3378,74.6334);

        // Calque_3
        this.instance_49 = new lib.Path_27();
        this.instance_49.setTransform(14.5,36.1,1,1,0,0,0,14.5,24.5);
        this.instance_49.alpha = 0.0508;

        this.instance_50 = new lib.CachedBmp_642();
        this.instance_50.setTransform(23.75,95,0.3551,0.3551);

        this.instance_51 = new lib.CachedBmp_641();
        this.instance_51.setTransform(7.45,49.6,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_49,this.instance_50,this.instance_51];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_14;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_51},{t:this.instance_50},{t:this.instance_49}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_3_14, new cjs.Rectangle(6.4,11.6,93.39999999999999,137.70000000000002), null);


    (lib.ClipGroup_2_13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_13 = new cjs.Shape();
        mask_13._off = true;
        mask_13.graphics.p("AnCHqIgSgcQgPgWAAgGQgDgqARhrIAkjWQAxkpgahrIgoi1QGOANGUAjQgSCPgJCRQgHB6AHBNQALBuApBPIA6BeQAjA4AMApQAFASgGAJQgEAHgQAFQgsAMg6ADQgbAChMAAQk5ABktA2QgUADgPAAQgsAAgNgZg");
        mask_13.setTransform(53.0161,51.4912);

        // Calque_3
        this.instance_29 = new lib.Path_0_12();
        this.instance_29.setTransform(6.1,63.7,1,1,0,0,0,6.1,29.7);
        this.instance_29.alpha = 0.0508;

        this.instance_30 = new lib.CachedBmp_640();
        this.instance_30.setTransform(67.55,31.6,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_29,this.instance_30];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_13;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_30},{t:this.instance_29}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_13, new cjs.Rectangle(4.6,31.6,96.9,61.699999999999996), null);


    (lib.ClipGroup_1_13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_13 = new cjs.Shape();
        mask_13._off = true;
        mask_13.graphics.p("A2dM0QAsiXAFiCIADhoQABg+AGgzQAGgrAWgiQAXgkAKhCQAOhdBciMQBViCBkhgQAiggB5hOQCSheBNgXQAVgGChgbQCogmBOhBQBjhSB9gdQBqgaDTgDQBEgBBUAcQAmAMBnArQAdAMAlAtQAwA6AGAFICkCMQCNB7APAXQB0C4AuBSQBdCnAZBxQATBUAhBqQAiBrAHAiQAfCEg3COg");
        mask_13.setTransform(158.5222,93.2982);

        // Calque_3
        this.instance_26 = new lib.Path_1_13();
        this.instance_26.setTransform(74.5,100.45,1,1,0,0,0,74.5,89.6);
        this.instance_26.alpha = 0.0508;

        this.instance_27 = new lib.CachedBmp_639();
        this.instance_27.setTransform(195.55,0,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_26,this.instance_27];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_13;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_27},{t:this.instance_26}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_13, new cjs.Rectangle(14.7,11.3,287.7,164), null);


    (lib.ClipGroup_18 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_13 = new cjs.Shape();
        mask_13._off = true;
        mask_13.graphics.p("AHRLrIg+gXQhNgbiBgPQi3gWgagFQgqgIgRgQQgOgNgGgXQgFgOgDgbIgMiOQgHhOgSg9IgLgvQgIgggKgLQgbgggTgMQgbgQgdAKQg2ASg2BAQhBBRgdBgQgZiHhWhuIgrg0QgYgegMgZQgUgrACgyQABgyAZgqQgWARgcgKQgZgJgTgZQgSgXgGgfQgGghAJgbQAJgaASgfQASgcATgXQB1iFCQhZQCchhCfgbQC2gfChAfQC6AjBwBvQA7A6A1BCQA7BJAhA8QAsBPAHBKQAHBGgXByQgoDKgNAxQgIAbhNDNQg6CYgFBfQgBAQgNAHQgFADgKABIgGAAQgWAAgfgKg");
        mask_13.setTransform(81.8028,75.6837);

        // Calque_3
        this.instance_19 = new lib.Path_2_8();
        this.instance_19.setTransform(40.2,32,1,1,0,0,0,40.2,32);
        this.instance_19.alpha = 0.1016;

        this.instance_20 = new lib.Path_1_0_8();
        this.instance_20.setTransform(18.35,68.55,1,1,0,0,0,9.2,16.6);
        this.instance_20.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_19,this.instance_20];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_13;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_20},{t:this.instance_19}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_18, new cjs.Rectangle(4.6,0,76,85), null);


    (lib.ClipGroup_2_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_14 = new cjs.Shape();
        mask_14._off = true;
        mask_14.graphics.p("AFnIAQkug2k4gBQhMAAgbgCQg6gDgsgMQgQgFgFgHQgFgJAFgSQALgpAkg4QAzhRAGgNQAqhPAKhuQAIhNgHh6QgJiRgSiPQGUgjGOgNIgoC1QgaBrAxEpIAkDWQARBrgDAqQAAAGgPAWIgSAcQgOAZgrAAQgQAAgTgDg");
        mask_14.setTransform(68.3285,51.4815);

        // Calque_3
        this.instance_31 = new lib.CachedBmp_630();
        this.instance_31.setTransform(106.05,23.7,0.3551,0.3551);

        this.instance_32 = new lib.Path_1_14();
        this.instance_32.setTransform(25.7,59.95,1,1,0,0,0,25.7,30);
        this.instance_32.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_31,this.instance_32];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_14;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_32},{t:this.instance_31}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_14, new cjs.Rectangle(19.9,23.7,96.9,70), null);


    (lib.ClipGroup_1_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_14 = new cjs.Shape();
        mask_14._off = true;
        mask_14.graphics.p("A16M0Qg3iOAfiEQAHgiAhhrQAhhpAThVQAahxBdinQAuhSB0i4QAPgXCNh7ICjiMQAHgGAwg5QAkgtAdgMQBqgsAkgLQBUgcBEABQDSADBrAaQB9AdBiBSQBPBBCoAmQBWATBgAOQBNAXCSBeQB5BOAiAgQBkBgBVCCQBcCMAOBdQAKBCAXAkQAWAiAFArQAHAzABA+IADBoQAFCCAsCXg");
        mask_14.setTransform(147.9278,92.8482);

        // Calque_3
        this.instance_28 = new lib.Path_28();
        this.instance_28.setTransform(53.2,93.5,1,1,0,0,0,53.2,93.5);
        this.instance_28.alpha = 0.0508;

        this.instance_29 = new lib.CachedBmp_629();
        this.instance_29.setTransform(199.35,28.95,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_28,this.instance_29];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_14;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_29},{t:this.instance_28}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_14, new cjs.Rectangle(4.1,10.9,287.7,164), null);


    (lib.ClipGroup_19 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_14 = new cjs.Shape();
        mask_14._off = true;
        mask_14.graphics.p("AoLL1QgLgBgEgDQgNgHgBgQQgFhfg6iYQhNjLgIgdQgLgpgRhVIgZh9QgXhxAHhHQAHhKAshPQAhg8A7hJQA1hCA7g6QBwhvC6gjQChgfC1AfQCgAbCcBhQCQBZB0CFQAUAWARAdQATAfAIAaQAKAbgGAhQgGAfgSAXQgTAZgZAJQgcAKgWgRQAYAqACAyQACAygUArQgMAZgYAeIgrA0QhVBtgaCIQgfhihAhPQg0hAg3gSQgdgKgbAQQgTAMgbAgQgKALgIAgIgLAvQgSA9gGBOIgNCOQgDAbgFAOQgGAXgOANQgRAQgrAIQgZAFi3AWQiBAPhNAbQgpAQgVAHQgfAKgWAAIgGAAg");
        mask_14.setTransform(101.1345,92.6337);

        // Calque_3
        this.instance_21 = new lib.Path_2_9();
        this.instance_21.setTransform(167.35,73.4,1,1,0,0,0,28.4,10.3);
        this.instance_21.alpha = 0.1016;

        this.instance_22 = new lib.Path_1_0_9();
        this.instance_22.setTransform(64.9,89.7,1,1,0,0,0,64.9,89.7);
        this.instance_22.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_21,this.instance_22];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_14;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_22},{t:this.instance_21}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_19, new cjs.Rectangle(24,17,154.4,151.3), null);


    (lib.ClipGroup_4_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_9 = new cjs.Shape();
        mask_9._off = true;
        mask_9.graphics.p("AEPLmQjWhxhsgyQi8hWiYgXQhdgOgzAaQA4h9ASiRQAQiHgRiPQgIhCgRhJQgNg6AKj1QALkIAnAUIEZCTIKFFRQADACALD5QAKD5ACADQAQAWAGAyQAGAxgKAYQgKAXg/BAQg3A4gGAxQgDAYgEA4QgEA2gEAbQgCAHgTABQgWACgEADQgJAIgNAAQgRAAgYgMg");
        mask_9.setTransform(56.8125,75.3548);

        // Calque_3
        this.instance_14 = new lib.Path_29();
        this.instance_14.setTransform(12.2,98.8,1,1,0,0,0,12.2,23.9);
        this.instance_14.alpha = 0.0508;

        this.instance_15 = new lib.CachedBmp_620();
        this.instance_15.setTransform(81.7,72.7,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_14,this.instance_15];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_4_9, new cjs.Rectangle(3.2,72.7,107.2,78.10000000000001), null);


    (lib.ClipGroup_2_15 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_15 = new cjs.Shape();
        mask_15._off = true;
        mask_15.graphics.p("AzULuIAojjQAWh+AThSQA1jgBhiyQAnhHB6iRQBxiHAnhVQARgrALgVQASgmAUgSQARgPAjghQAfgaAbgGQBggSAxgFQBRgIA/ANQCPAcB/BbIBhBDQA3AiA5AQQAQAEAxAKQApAIAXAIQAjALBGAmQBWAvApAbQBDAsAtAwQBTBXBICfQAVArAmBbQAlBRAcA2QAqBMBeClQBOCTATBrg");
        mask_15.setTransform(140.95,83.3344);

        // Calque_3
        this.instance_33 = new lib.Path_0_14();
        this.instance_33.setTransform(50.6,87.4,1,1,0,0,0,50.6,87.4);
        this.instance_33.alpha = 0.0508;

        this.instance_34 = new lib.CachedBmp_616();
        this.instance_34.setTransform(178.85,32.2,0.3551,0.3551);

        var maskedShapeInstanceList = [this.instance_33,this.instance_34];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_15;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_34},{t:this.instance_33}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_2_15, new cjs.Rectangle(17.3,8.3,247.39999999999998,150.1), null);


    (lib.ClipGroup_1_15 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_15 = new cjs.Shape();
        mask_15._off = true;
        mask_15.graphics.p("AnhMlQglgTgeg5QgRgggXhEQgkhlhljUQhAiGgOiDQgTi2A0iwQA5jAB6hvQCyijCngZQB5gSBNgEQBsgFBZARQBzAWB1ArQBuAnBhA1QAxAaAxArQA2AvAbAqQAfAyAHAqQAKA2gSBMQgCAIgJANQgKANgIACQgNAEgUgKQgPgIgVgWIgigkQgogogbAZQA2A8ACBlQACBkgzBAQgRAWghAdQgsAngKAKQhOBOgYBuQgcg+hDgeQhBgehEAPQhBAOg0AyQgyAwgWBCQgWA9ADBIQACBCAWBEQAHATABAJQAEAQgDAMQgFARgQANQgMAKgWAKQiEBAiVATQgcAEgZAAQg1AAgjgRg");
        mask_15.setTransform(122.0744,102.5654);

        // Calque_3
        this.instance_30 = new lib.Path_2_10();
        this.instance_30.setTransform(173.7,73,1,1,0,0,0,25.2,11.2);
        this.instance_30.alpha = 0.1016;

        this.instance_31 = new lib.Path_1_15();
        this.instance_31.setTransform(80.8,98.1,1,1,0,0,0,80.8,98.1);
        this.instance_31.alpha = 0.1016;

        var maskedShapeInstanceList = [this.instance_30,this.instance_31];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_15;
        }

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_31},{t:this.instance_30}]}).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_1_15, new cjs.Rectangle(41.2,20.4,157.7,164.4), null);


    (lib.ClipGroup_20 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_2 (mask)
        var mask_15 = new cjs.Shape();
        mask_15._off = true;
        mask_15.graphics.p("AAUEEQg9gagQgvQgIgWgXgmQgagqgKgZQgnhbAfiIQAIgkAdggQAfgiAfgBQA8gBAtApQA+A4ANB/IgBEZQgjAlgqAAQgXAAgagLg");
        mask_15.setTransform(21.9259,30.5584);

        // Calque_3
        this.instance_23 = new lib.Path_5_3();
        this.instance_23.setTransform(14.9,30.1,1,1,0,0,0,14.9,30.1);
        this.instance_23.alpha = 0.0508;

        var maskedShapeInstanceList = [this.instance_23];

        for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
            maskedShapeInstanceList[shapedInstanceItr].mask = mask_15;
        }

        this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.ClipGroup_20, new cjs.Rectangle(7.3,3.5,22.599999999999998,54.1), null);


// stage content:
    (lib.test = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque_8___copie_6
        this.instance = new lib.ClipGroup_17();
        this.instance.setTransform(235.95,130.25,1.4081,1.4081,0,0,0,90.6,105);

        this.instance_1 = new lib.ClipGroup_1_12();
        this.instance_1.setTransform(269.1,394.5,1.4081,1.4081,0,0,0,214.1,97.6);

        this.instance_2 = new lib.CachedBmp_424();
        this.instance_2.setTransform(309.7,163.75,0.5,0.5);

        this.instance_3 = new lib.CachedBmp_423();
        this.instance_3.setTransform(142.9,25.95,0.5,0.5);

        this.instance_4 = new lib.CachedBmp_422();
        this.instance_4.setTransform(-2.9,289.15,0.5,0.5);

        this.instance_5 = new lib.ClipGroup_2_12();
        this.instance_5.setTransform(249.75,263.7,1.4081,1.4081,0,0,0,62.2,59.9);

        this.instance_6 = new lib.CachedBmp_421();
        this.instance_6.setTransform(164.85,179.7,0.5,0.5);

        this.instance_7 = new lib.CachedBmp_420();
        this.instance_7.setTransform(325.9,169.15,0.5,0.5);

        this.instance_8 = new lib.ClipGroup_3_4();
        this.instance_8.setTransform(323.15,222.85,1.4081,1.4081,0,0,0,54,57.5);

        this.instance_9 = new lib.CachedBmp_419();
        this.instance_9.setTransform(247.4,149.65,0.5,0.5);

        this.instance_10 = new lib.CachedBmp_418();
        this.instance_10.setTransform(332.85,194.25,0.5,0.5);

        this.instance_11 = new lib.Path_7_1();
        this.instance_11.setTransform(353.55,215.55,1.4081,1.4081,0,0,0,15.2,14.5);
        this.instance_11.alpha = 0.25;

        this.instance_12 = new lib.ClipGroup_19();
        this.instance_12.setTransform(247.1,137.6,1.408,1.408,0,0,0,98,90);

        this.instance_13 = new lib.Path_0_13();
        this.instance_13.setTransform(353.35,127.4,1.408,1.408,0,0,0,2.8,2.8);
        this.instance_13.alpha = 0.1016;

        this.instance_14 = new lib.ClipGroup_1_14();
        this.instance_14.setTransform(267,395.6,1.408,1.408,0,0,0,158.6,98.4);

        this.instance_15 = new lib.CachedBmp_844();
        this.instance_15.setTransform(271.15,149.95,0.5,0.5);

        this.instance_16 = new lib.CachedBmp_843();
        this.instance_16.setTransform(280.05,155.15,0.5,0.5);

        this.instance_17 = new lib.CachedBmp_842();
        this.instance_17.setTransform(50.05,272.8,0.5,0.5);

        this.instance_18 = new lib.CachedBmp_841();
        this.instance_18.setTransform(143.3,35.2,0.5,0.5);

        this.instance_19 = new lib.ClipGroup_2_14();
        this.instance_19.setTransform(215.55,252.05,1.408,1.408,0,0,0,63.6,51.8);

        this.instance_20 = new lib.ClipGroup_3_5();
        this.instance_20.setTransform(304.6,202.1,1.408,1.408,0,0,0,68.1,74.9);

        this.instance_21 = new lib.CachedBmp_840();
        this.instance_21.setTransform(154.45,179.65,0.5,0.5);

        this.instance_22 = new lib.CachedBmp_839();
        this.instance_22.setTransform(209.2,97.1,0.5,0.5);

        this.instance_23 = new lib.Path_7_3();
        this.instance_23.setTransform(351.1,239.35,1.408,1.408,0,0,0,5,2.8);
        this.instance_23.alpha = 0.5;

        this.instance_24 = new lib.CachedBmp_838();
        this.instance_24.setTransform(348.1,193.25,0.5,0.5);

        this.instance_25 = new lib.CachedBmp_837();
        this.instance_25.setTransform(352.5,181.35,0.5,0.5);

        this.instance_26 = new lib.Path_10_2();
        this.instance_26.setTransform(367.65,203.2,1.408,1.408,0,0,0,11,15);
        this.instance_26.alpha = 0.5;

        this.instance_27 = new lib.CachedBmp_836();
        this.instance_27.setTransform(346.15,198.75,0.5,0.5);

        this.instance_28 = new lib.ClipGroup_20();
        this.instance_28.setTransform(263.8,188.8,1.4081,1.4081,0,0,0,18.4,30.3);

        this.instance_29 = new lib.ClipGroup_1_15();
        this.instance_29.setTransform(221.6,142.85,1.4081,1.4081,0,0,0,101.7,98.2);

        this.instance_30 = new lib.ClipGroup_2_15();
        this.instance_30.setTransform(264.4,405.2,1.4081,1.4081,0,0,0,142.3,88);

        this.instance_31 = new lib.CachedBmp_853();
        this.instance_31.setTransform(248.5,151.45,0.5,0.5);

        this.instance_32 = new lib.CachedBmp_852();
        this.instance_32.setTransform(267.05,157.75,0.5,0.5);

        this.instance_33 = new lib.CachedBmp_851();
        this.instance_33.setTransform(369.35,168.2,0.5,0.5);

        this.instance_34 = new lib.Path_3_9();
        this.instance_34.setTransform(377.7,193.3,1.4081,1.4081,0,0,0,5.8,17.2);
        this.instance_34.alpha = 0.25;

        this.instance_35 = new lib.Path_4_5();
        this.instance_35.setTransform(373.15,234.7,1.4081,1.4081,0,0,0,5,2.8);
        this.instance_35.alpha = 0.5;

        this.instance_36 = new lib.CachedBmp_850();
        this.instance_36.setTransform(136.85,33.5,0.5,0.5);

        this.instance_37 = new lib.ClipGroup_3_6();
        this.instance_37.setTransform(347.5,208.2,1.4081,1.4081,0,0,0,68.5,78.7);

        this.instance_38 = new lib.CachedBmp_849();
        this.instance_38.setTransform(251.5,97.75,0.5,0.5);

        this.instance_39 = new lib.Path_7_4();
        this.instance_39.setTransform(367.15,253.4,1.4081,1.4081,0,0,0,5,3);
        this.instance_39.alpha = 0.5;

        this.instance_40 = new lib.CachedBmp_848();
        this.instance_40.setTransform(88.7,293.4,0.5,0.5);

        this.instance_41 = new lib.ClipGroup_4_9();
        this.instance_41.setTransform(275.65,278.25,1.4081,1.4081,0,0,0,74.5,99.2);

        this.instance_42 = new lib.CachedBmp_847();
        this.instance_42.setTransform(357,374.7,0.5,0.5);

        this.instance_43 = new lib.CachedBmp_846();
        this.instance_43.setTransform(175.65,138.85,0.5,0.5);

        this.instance_44 = new lib.CachedBmp_845();
        this.instance_44.setTransform(365.7,189.85,0.5,0.5);

        this.instance_45 = new lib.ClipGroup_13();
        this.instance_45.setTransform(247.35,171.65,1.4081,1.4081,0,0,0,95.5,97.7);

        this.instance_46 = new lib.ClipGroup_1_8();
        this.instance_46.setTransform(230.5,214.7,1.4081,1.4081,0,0,0,21,43.3);

        this.instance_47 = new lib.CachedBmp_866();
        this.instance_47.setTransform(212.15,154.45,0.5,0.5);

        this.instance_48 = new lib.ClipGroup_2_8();
        this.instance_48.setTransform(226.35,391.1,1.4081,1.4081,0,0,0,147.8,93.7);

        this.instance_49 = new lib.CachedBmp_865();
        this.instance_49.setTransform(362.55,154.9,0.5,0.5);

        this.instance_50 = new lib.Path_2_5();
        this.instance_50.setTransform(370.5,182.4,1.4081,1.4081,0,0,0,7.4,17.6);
        this.instance_50.alpha = 0.25;

        this.instance_51 = new lib.CachedBmp_864();
        this.instance_51.setTransform(380.15,178.9,0.5,0.5);

        this.instance_52 = new lib.CachedBmp_863();
        this.instance_52.setTransform(361.2,174.25,0.5,0.5);

        this.instance_53 = new lib.CachedBmp_862();
        this.instance_53.setTransform(381.95,180.65,0.5,0.5);

        this.instance_54 = new lib.Path_6_3();
        this.instance_54.setTransform(384.1,193.6,1.4081,1.4081,0,0,0,2,8.6);
        this.instance_54.alpha = 0.25;

        this.instance_55 = new lib.CachedBmp_861();
        this.instance_55.setTransform(73.9,284.15,0.5,0.5);

        this.instance_56 = new lib.CachedBmp_860();
        this.instance_56.setTransform(260,335.05,0.5,0.5);

        this.instance_57 = new lib.CachedBmp_859();
        this.instance_57.setTransform(234,154.8,0.5,0.5);

        this.instance_58 = new lib.CachedBmp_858();
        this.instance_58.setTransform(363.4,213.55,0.5,0.5);

        this.instance_59 = new lib.CachedBmp_857();
        this.instance_59.setTransform(346.65,242.55,0.5,0.5);

        this.instance_60 = new lib.CachedBmp_856();
        this.instance_60.setTransform(150.1,35,0.5,0.5);

        this.instance_61 = new lib.ClipGroup_3_12();
        this.instance_61.setTransform(302.05,195.8,1.4081,1.4081,0,0,0,71.8,84.6);

        this.instance_62 = new lib.CachedBmp_855();
        this.instance_62.setTransform(217.45,85,0.5,0.5);

        this.instance_63 = new lib.ClipGroup_4_8();
        this.instance_63.setTransform(245.05,305,1.4081,1.4081,0,0,0,72.7,80.8);

        this.instance_64 = new lib.CachedBmp_854();
        this.instance_64.setTransform(179.6,191.55,0.5,0.5);

        this.instance_65 = new lib.ClipGroup_10();
        this.instance_65.setTransform(252.95,149.1,1.4081,1.4081,0,0,0,90.4,83.2);

        this.instance_66 = new lib.CachedBmp_880();
        this.instance_66.setTransform(339.25,155.9,0.5,0.5);

        this.instance_67 = new lib.ClipGroup_1_6();
        this.instance_67.setTransform(213.5,208.2,1.4081,1.4081,0,0,0,19.9,41.7);

        this.instance_68 = new lib.ClipGroup_2_6();
        this.instance_68.setTransform(231.7,399.8,1.4081,1.4081,0,0,0,149.7,92.8);

        this.instance_69 = new lib.CachedBmp_879();
        this.instance_69.setTransform(198.7,159.05,0.5,0.5);

        this.instance_70 = new lib.CachedBmp_878();
        this.instance_70.setTransform(367.7,175.15,0.5,0.5);

        this.instance_71 = new lib.Path_3_0_1();
        this.instance_71.setTransform(353.05,181.65,1.4081,1.4081,0,0,0,10.7,16.4);
        this.instance_71.alpha = 0.25;

        this.instance_72 = new lib.CachedBmp_877();
        this.instance_72.setTransform(227.2,157.3,0.5,0.5);

        this.instance_73 = new lib.CachedBmp_876();
        this.instance_73.setTransform(351.35,172.85,0.5,0.5);

        this.instance_74 = new lib.Path_6_1();
        this.instance_74.setTransform(366.05,219.2,1.4081,1.4081,0,0,0,6.5,5.4);
        this.instance_74.alpha = 0.5;

        this.instance_75 = new lib.CachedBmp_875();
        this.instance_75.setTransform(374.45,177.25,0.5,0.5);

        this.instance_76 = new lib.CachedBmp_874();
        this.instance_76.setTransform(341.65,239.3,0.5,0.5);

        this.instance_77 = new lib.CachedBmp_873();
        this.instance_77.setTransform(156.75,43.35,0.5,0.5);

        this.instance_78 = new lib.ClipGroup_3_10();
        this.instance_78.setTransform(302.65,194.75,1.4081,1.4081,0,0,0,83.2,82);

        this.instance_79 = new lib.CachedBmp_872();
        this.instance_79.setTransform(209.4,81.8,0.5,0.5);

        this.instance_80 = new lib.Path_11_1();
        this.instance_80.setTransform(330.25,397.7,1.4081,1.4081,0,0,0,4.2,3.4);
        this.instance_80.alpha = 0.5;

        this.instance_81 = new lib.ClipGroup_4_1();
        this.instance_81.setTransform(265,294.4,1.4081,1.4081,0,0,0,60,73);

        this.instance_82 = new lib.Path_12_1();
        this.instance_82.setTransform(356.15,440.4,1.4081,1.4081,0,0,0,4.1,4);
        this.instance_82.alpha = 0.5;

        this.instance_83 = new lib.Path_13_1();
        this.instance_83.setTransform(332.9,410.8,1.4081,1.4081,0,0,0,3.9,3.7);
        this.instance_83.alpha = 0.5;

        this.instance_84 = new lib.Path_14_1();
        this.instance_84.setTransform(324.7,381.3,1.4081,1.4081,0,0,0,3.9,2.6);
        this.instance_84.alpha = 0.5;

        this.instance_85 = new lib.CachedBmp_871();
        this.instance_85.setTransform(56.25,290.65,0.5,0.5);

        this.instance_86 = new lib.Path_16();
        this.instance_86.setTransform(181.7,241.7,1.4081,1.4081,0,0,0,19.2,43);
        this.instance_86.alpha = 0.0508;

        this.instance_87 = new lib.CachedBmp_870();
        this.instance_87.setTransform(180.85,192,0.5,0.5);

        this.instance_88 = new lib.CachedBmp_869();
        this.instance_88.setTransform(331.25,379.85,0.5,0.5);

        this.instance_89 = new lib.CachedBmp_868();
        this.instance_89.setTransform(221.85,333.45,0.5,0.5);

        this.instance_90 = new lib.Path_20_1();
        this.instance_90.setTransform(382,190.85,1.4081,1.4081,0,0,0,5.2,9.1);
        this.instance_90.alpha = 0.25;

        this.instance_91 = new lib.CachedBmp_867();
        this.instance_91.setTransform(276.05,346.3,0.5,0.5);

        this.instance_92 = new lib.ClipGroup_9();
        this.instance_92.setTransform(186.2,190.95,1.4081,1.4081,0,0,0,15.8,29.7);

        this.instance_93 = new lib.CachedBmp_897();
        this.instance_93.setTransform(171.35,164.9,0.5,0.5);

        this.instance_94 = new lib.ClipGroup_1_5();
        this.instance_94.setTransform(254.25,131.05,1.4081,1.4081,0,0,0,83.5,83.2);

        this.instance_95 = new lib.CachedBmp_896();
        this.instance_95.setTransform(266.2,151.2,0.5,0.5);

        this.instance_96 = new lib.Path_2_3();
        this.instance_96.setTransform(294.95,177.75,1.4081,1.4081,0,0,0,18.8,17.3);
        this.instance_96.alpha = 0.25;

        this.instance_97 = new lib.CachedBmp_895();
        this.instance_97.setTransform(182.7,154.2,0.5,0.5);

        this.instance_98 = new lib.CachedBmp_894();
        this.instance_98.setTransform(321.55,166.1,0.5,0.5);

        this.instance_99 = new lib.ClipGroup_2_1();
        this.instance_99.setTransform(274.05,179.75,1.4081,1.4081,0,0,0,65.6,89);

        this.instance_100 = new lib.CachedBmp_893();
        this.instance_100.setTransform(308.7,168,0.5,0.5);

        this.instance_101 = new lib.CachedBmp_892();
        this.instance_101.setTransform(297.35,241.35,0.5,0.5);

        this.instance_102 = new lib.CachedBmp_891();
        this.instance_102.setTransform(335.9,163.95,0.5,0.5);

        this.instance_103 = new lib.Path_8_1();
        this.instance_103.setTransform(357.3,189.35,1.4081,1.4081,0,0,0,14.7,16.6);
        this.instance_103.alpha = 0.25;

        this.instance_104 = new lib.Path_9_1();
        this.instance_104.setTransform(326.6,218.05,1.4081,1.4081,0,0,0,11.7,6.8);
        this.instance_104.alpha = 0.5;

        this.instance_105 = new lib.CachedBmp_890();
        this.instance_105.setTransform(284.55,437.55,0.5,0.5);

        this.instance_106 = new lib.CachedBmp_889();
        this.instance_106.setTransform(283.35,407.45,0.5,0.5);

        this.instance_107 = new lib.CachedBmp_888();
        this.instance_107.setTransform(312.85,392.4,0.5,0.5);

        this.instance_108 = new lib.CachedBmp_887();
        this.instance_108.setTransform(324.75,373.95,0.5,0.5);

        this.instance_109 = new lib.CachedBmp_886();
        this.instance_109.setTransform(160.35,297.65,0.5,0.5);

        this.instance_110 = new lib.CachedBmp_885();
        this.instance_110.setTransform(165.65,36.4,0.5,0.5);

        this.instance_111 = new lib.ClipGroup_3();
        this.instance_111.setTransform(297.65,186.1,1.4081,1.4081,0,0,0,75.7,93.5);

        this.instance_112 = new lib.CachedBmp_884();
        this.instance_112.setTransform(191.55,54.85,0.5,0.5);

        this.instance_113 = new lib.ClipGroup_4_7();
        this.instance_113.setTransform(243.6,297.65,1.4081,1.4081,0,0,0,64.9,66.7);

        this.instance_114 = new lib.CachedBmp_883();
        this.instance_114.setTransform(160.4,221.4,0.5,0.5);

        this.instance_115 = new lib.ClipGroup_5_3();
        this.instance_115.setTransform(241.3,383,1.4081,1.4081,0,0,0,189.6,92);

        this.instance_116 = new lib.CachedBmp_882();
        this.instance_116.setTransform(-25.45,297.45,0.5,0.5);

        this.instance_117 = new lib.CachedBmp_881();
        this.instance_117.setTransform(167.75,145.65,0.5,0.5);

        this.instance_118 = new lib.ClipGroup_8();
        this.instance_118.setTransform(189.4,226.8,1.4082,1.4082,0,0,0,32.7,47.5);

        this.instance_119 = new lib.CachedBmp_914();
        this.instance_119.setTransform(210.2,145.15,0.5,0.5);

        this.instance_120 = new lib.CachedBmp_913();
        this.instance_120.setTransform(294.5,153.15,0.5,0.5);

        this.instance_121 = new lib.CachedBmp_912();
        this.instance_121.setTransform(275.5,157.45,0.5,0.5);

        this.instance_122 = new lib.Path_3_2();
        this.instance_122.setTransform(245.25,171.15,1.4082,1.4082,0,0,0,22.4,16.9);
        this.instance_122.alpha = 0.25;

        this.instance_123 = new lib.Path_4_1();
        this.instance_123.setTransform(327.4,178.3,1.4082,1.4082,0,0,0,21.8,16.2);
        this.instance_123.alpha = 0.25;

        this.instance_124 = new lib.CachedBmp_911();
        this.instance_124.setTransform(159.65,171.3,0.5,0.5);

        this.instance_125 = new lib.ClipGroup_1_4();
        this.instance_125.setTransform(239.85,99.75,1.4082,1.4082,0,0,0,88.9,68);

        this.instance_126 = new lib.CachedBmp_910();
        this.instance_126.setTransform(164.85,149.4,0.5,0.5);

        this.instance_127 = new lib.CachedBmp_909();
        this.instance_127.setTransform(260.35,231.55,0.5,0.5);

        this.instance_128 = new lib.CachedBmp_908();
        this.instance_128.setTransform(258.35,437.55,0.5,0.5);

        this.instance_129 = new lib.CachedBmp_907();
        this.instance_129.setTransform(258.1,405.8,0.5,0.5);

        this.instance_130 = new lib.CachedBmp_906();
        this.instance_130.setTransform(297.95,389.9,0.5,0.5);

        this.instance_131 = new lib.CachedBmp_905();
        this.instance_131.setTransform(322.3,371.15,0.5,0.5);

        this.instance_132 = new lib.CachedBmp_904();
        this.instance_132.setTransform(157.2,307.25,0.5,0.5);

        this.instance_133 = new lib.CachedBmp_903();
        this.instance_133.setTransform(152.35,26.9,0.5,0.5);

        this.instance_134 = new lib.ClipGroup_2();
        this.instance_134.setTransform(259.35,177.5,1.4082,1.4082,0,0,0,65.1,87.2);

        this.instance_135 = new lib.CachedBmp_902();
        this.instance_135.setTransform(265.8,157.45,0.5,0.5);

        this.instance_136 = new lib.Path_15();
        this.instance_136.setTransform(287.75,205.75,1.4082,1.4082,0,0,0,12.9,5.1);
        this.instance_136.alpha = 0.75;

        this.instance_137 = new lib.ClipGroup_3_9();
        this.instance_137.setTransform(253.75,179.9,1.4082,1.4082,0,0,0,78.4,88.9);

        this.instance_138 = new lib.CachedBmp_901();
        this.instance_138.setTransform(179.25,54.85,0.5,0.5);

        this.instance_139 = new lib.ClipGroup_4_6();
        this.instance_139.setTransform(253.05,301.2,1.4082,1.4082,0,0,0,69.8,61.8);

        this.instance_140 = new lib.CachedBmp_900();
        this.instance_140.setTransform(158.25,227.3,0.5,0.5);

        this.instance_141 = new lib.ClipGroup_5_2();
        this.instance_141.setTransform(261.15,402.9,1.4082,1.4082,0,0,0,218.5,92.4);

        this.instance_142 = new lib.CachedBmp_899();
        this.instance_142.setTransform(-37.45,307.1,0.5,0.5);

        this.instance_143 = new lib.CachedBmp_898();
        this.instance_143.setTransform(159.75,167.8,0.5,0.5);

        this.instance_144 = new lib.ClipGroup_6();
        this.instance_144.setTransform(237.7,97.95,1.4082,1.4082,0,0,0,85.1,66);

        this.instance_145 = new lib.ClipGroup_1_2();
        this.instance_145.setTransform(254.7,186.45,1.4082,1.4082,0,0,0,17.9,24.4);

        this.instance_146 = new lib.ClipGroup_2_4();
        this.instance_146.setTransform(174.4,218.75,1.4082,1.4082,0,0,0,28.9,55.9);

        this.instance_147 = new lib.CachedBmp_930();
        this.instance_147.setTransform(267.6,152.8,0.5,0.5);

        this.instance_148 = new lib.CachedBmp_929();
        this.instance_148.setTransform(170.1,152.8,0.5,0.5);

        this.instance_149 = new lib.CachedBmp_928();
        this.instance_149.setTransform(247.7,160.9,0.5,0.5);

        this.instance_150 = new lib.Path_3_0();
        this.instance_150.setTransform(302.25,178.5,1.4082,1.4082,0,0,0,22.8,17.2);
        this.instance_150.alpha = 0.25;

        this.instance_151 = new lib.Path_4();
        this.instance_151.setTransform(214.95,179.25,1.4082,1.4082,0,0,0,23.2,17.1);
        this.instance_151.alpha = 0.25;

        this.instance_152 = new lib.CachedBmp_927();
        this.instance_152.setTransform(235.1,155.95,0.5,0.5);

        this.instance_153 = new lib.Path_6();
        this.instance_153.setTransform(257.45,208.3,1.4082,1.4082,0,0,0,13.8,5.4);
        this.instance_153.alpha = 0.75;

        this.instance_154 = new lib.CachedBmp_926();
        this.instance_154.setTransform(224.95,237.05,0.5,0.5);

        this.instance_155 = new lib.CachedBmp_925();
        this.instance_155.setTransform(251.55,442.05,0.5,0.5);

        this.instance_156 = new lib.CachedBmp_924();
        this.instance_156.setTransform(254.8,414.6,0.5,0.5);

        this.instance_157 = new lib.CachedBmp_923();
        this.instance_157.setTransform(212.75,394.4,0.5,0.5);

        this.instance_158 = new lib.CachedBmp_922();
        this.instance_158.setTransform(180.05,374.25,0.5,0.5);

        this.instance_159 = new lib.CachedBmp_921();
        this.instance_159.setTransform(154.85,320.7,0.5,0.5);

        this.instance_160 = new lib.CachedBmp_920();
        this.instance_160.setTransform(324,179.15,0.5,0.5);

        this.instance_161 = new lib.CachedBmp_919();
        this.instance_161.setTransform(146.8,176.95,0.5,0.5);

        this.instance_162 = new lib.CachedBmp_918();
        this.instance_162.setTransform(142.65,25.9,0.5,0.5);

        this.instance_163 = new lib.ClipGroup_3_7();
        this.instance_163.setTransform(249.5,187.9,1.4082,1.4082,0,0,0,81.9,92.4);

        this.instance_164 = new lib.CachedBmp_917();
        this.instance_164.setTransform(164.45,57.95,0.5,0.5);

        this.instance_165 = new lib.ClipGroup_4_5();
        this.instance_165.setTransform(255,310.4,1.4082,1.4082,0,0,0,76.2,61.1);

        this.instance_166 = new lib.CachedBmp_916();
        this.instance_166.setTransform(157.3,243.05,0.5,0.5);

        this.instance_167 = new lib.ClipGroup_5_1();
        this.instance_167.setTransform(249.6,406.2,1.4082,1.4082,0,0,0,215,76.2);

        this.instance_168 = new lib.CachedBmp_915();
        this.instance_168.setTransform(-42.7,320.55,0.5,0.5);

        this.instance_169 = new lib.ClipGroup_12();
        this.instance_169.setTransform(235.3,108.25,1.4082,1.4082,0,0,0,82,59.9);

        this.instance_170 = new lib.ClipGroup_1_7();
        this.instance_170.setTransform(212.35,178.45,1.4082,1.4082,0,0,0,17.9,27.9);

        this.instance_171 = new lib.CachedBmp_947();
        this.instance_171.setTransform(223.65,145.15,0.5,0.5);

        this.instance_172 = new lib.CachedBmp_946();
        this.instance_172.setTransform(144.35,153.15,0.5,0.5);

        this.instance_173 = new lib.CachedBmp_945();
        this.instance_173.setTransform(206,157.45,0.5,0.5);

        this.instance_174 = new lib.Path_3_6();
        this.instance_174.setTransform(257.9,171.15,1.4082,1.4082,0,0,0,22.5,16.9);
        this.instance_174.alpha = 0.25;

        this.instance_175 = new lib.Path_4_2();
        this.instance_175.setTransform(175.85,178.3,1.4082,1.4082,0,0,0,21.7,16.2);
        this.instance_175.alpha = 0.25;

        this.instance_176 = new lib.CachedBmp_944();
        this.instance_176.setTransform(193.05,157.45,0.5,0.5);

        this.instance_177 = new lib.Path_6_2();
        this.instance_177.setTransform(215.4,205.75,1.4082,1.4082,0,0,0,12.9,5.1);
        this.instance_177.alpha = 0.75;

        this.instance_178 = new lib.CachedBmp_943();
        this.instance_178.setTransform(309,171.3,0.5,0.5);

        this.instance_179 = new lib.CachedBmp_942();
        this.instance_179.setTransform(291.9,149.4,0.5,0.5);

        this.instance_180 = new lib.CachedBmp_941();
        this.instance_180.setTransform(187.15,231.55,0.5,0.5);

        this.instance_181 = new lib.CachedBmp_940();
        this.instance_181.setTransform(231.1,437.8,0.5,0.5);

        this.instance_182 = new lib.CachedBmp_939();
        this.instance_182.setTransform(232.3,405.65,0.5,0.5);

        this.instance_183 = new lib.CachedBmp_938();
        this.instance_183.setTransform(192.5,389.9,0.5,0.5);

        this.instance_184 = new lib.CachedBmp_937();
        this.instance_184.setTransform(168.5,371.15,0.5,0.5);

        this.instance_185 = new lib.CachedBmp_936();
        this.instance_185.setTransform(161.25,308.2,0.5,0.5);

        this.instance_186 = new lib.CachedBmp_935();
        this.instance_186.setTransform(138.5,26.9,0.5,0.5);

        this.instance_187 = new lib.ClipGroup_2_2();
        this.instance_187.setTransform(248.1,177.5,1.4082,1.4082,0,0,0,68.2,87.2);

        this.instance_188 = new lib.ClipGroup_3_1();
        this.instance_188.setTransform(236.25,181.15,1.4082,1.4082,0,0,0,66.8,89.8);

        this.instance_189 = new lib.CachedBmp_934();
        this.instance_189.setTransform(152.25,54.85,0.5,0.5);

        this.instance_190 = new lib.ClipGroup_4_3();
        this.instance_190.setTransform(269.55,290.65,1.4082,1.4082,0,0,0,75.6,69.4);

        this.instance_191 = new lib.CachedBmp_933();
        this.instance_191.setTransform(163.3,227.3,0.5,0.5);

        this.instance_192 = new lib.ClipGroup_5_5();
        this.instance_192.setTransform(265.5,405.65,1.4082,1.4082,0,0,0,215,86.7);

        this.instance_193 = new lib.CachedBmp_932();
        this.instance_193.setTransform(-21.95,307.1,0.5,0.5);

        this.instance_194 = new lib.CachedBmp_931();
        this.instance_194.setTransform(295.25,167.8,0.5,0.5);

        this.instance_195 = new lib.ClipGroup_11();
        this.instance_195.setTransform(242.15,109.2,1.4081,1.4081,0,0,0,76.5,57.8);

        this.instance_196 = new lib.CachedBmp_964();
        this.instance_196.setTransform(191.9,151.2,0.5,0.5);

        this.instance_197 = new lib.CachedBmp_963();
        this.instance_197.setTransform(176.35,166.1,0.5,0.5);

        this.instance_198 = new lib.Path_2_4();
        this.instance_198.setTransform(220.25,177.75,1.4081,1.4081,0,0,0,18.8,17.3);
        this.instance_198.alpha = 0.25;

        this.instance_199 = new lib.CachedBmp_962();
        this.instance_199.setTransform(172.7,241.35,0.5,0.5);

        this.instance_200 = new lib.CachedBmp_961();
        this.instance_200.setTransform(306.8,164.9,0.5,0.5);

        this.instance_201 = new lib.CachedBmp_960();
        this.instance_201.setTransform(247.9,154.2,0.5,0.5);

        this.instance_202 = new lib.CachedBmp_959();
        this.instance_202.setTransform(216.9,437.55,0.5,0.5);

        this.instance_203 = new lib.CachedBmp_958();
        this.instance_203.setTransform(218.95,407.45,0.5,0.5);

        this.instance_204 = new lib.CachedBmp_957();
        this.instance_204.setTransform(189.85,392.4,0.5,0.5);

        this.instance_205 = new lib.CachedBmp_956();
        this.instance_205.setTransform(178.3,373.95,0.5,0.5);

        this.instance_206 = new lib.CachedBmp_955();
        this.instance_206.setTransform(188.9,297.65,0.5,0.5);

        this.instance_207 = new lib.CachedBmp_954();
        this.instance_207.setTransform(143.8,36.4,0.5,0.5);

        this.instance_208 = new lib.ClipGroup_1();
        this.instance_208.setTransform(242.9,179.75,1.4081,1.4081,0,0,0,67.1,89);

        this.instance_209 = new lib.ClipGroup_2_7();
        this.instance_209.setTransform(183.45,189.3,1.4081,1.4081,0,0,0,16.8,27.6);

        this.instance_210 = new lib.CachedBmp_953();
        this.instance_210.setTransform(165.3,168,0.5,0.5);

        this.instance_211 = new lib.CachedBmp_952();
        this.instance_211.setTransform(136.8,163.95,0.5,0.5);

        this.instance_212 = new lib.Path_14_2();
        this.instance_212.setTransform(157.95,189.35,1.4081,1.4081,0,0,0,14.5,16.6);
        this.instance_212.alpha = 0.25;

        this.instance_213 = new lib.Path_15_1();
        this.instance_213.setTransform(188.8,218.05,1.4081,1.4081,0,0,0,11.7,6.8);
        this.instance_213.alpha = 0.5;

        this.instance_214 = new lib.ClipGroup_3_11();
        this.instance_214.setTransform(231.6,183.55,1.4081,1.4081,0,0,0,65.6,91.7);

        this.instance_215 = new lib.CachedBmp_951();
        this.instance_215.setTransform(148.9,54.85,0.5,0.5);

        this.instance_216 = new lib.ClipGroup_4_2();
        this.instance_216.setTransform(291.6,298.45,1.4081,1.4081,0,0,0,78.4,66.1);

        this.instance_217 = new lib.ClipGroup_5_4();
        this.instance_217.setTransform(296,392.55,1.4081,1.4081,0,0,0,193.4,89.5);

        this.instance_218 = new lib.CachedBmp_950();
        this.instance_218.setTransform(190.65,221.4,0.5,0.5);

        this.instance_219 = new lib.CachedBmp_949();
        this.instance_219.setTransform(43.5,297.45,0.5,0.5);

        this.instance_220 = new lib.CachedBmp_948();
        this.instance_220.setTransform(308.65,145.65,0.5,0.5);

        this.instance_221 = new lib.ClipGroup_7();
        this.instance_221.setTransform(253.8,154.8,1.4081,1.4081,0,0,0,84.4,87.4);

        this.instance_222 = new lib.CachedBmp_979();
        this.instance_222.setTransform(159.5,155.9,0.5,0.5);

        this.instance_223 = new lib.CachedBmp_978();
        this.instance_223.setTransform(287.6,159.05,0.5,0.5);

        this.instance_224 = new lib.Path_2_0();
        this.instance_224.setTransform(175.55,181.65,1.4081,1.4081,0,0,0,10.7,16.4);
        this.instance_224.alpha = 0.25;

        this.instance_225 = new lib.CachedBmp_977();
        this.instance_225.setTransform(152.85,175.15,0.5,0.5);

        this.instance_226 = new lib.CachedBmp_976();
        this.instance_226.setTransform(149.25,43.35,0.5,0.5);

        this.instance_227 = new lib.ClipGroup_1_3();
        this.instance_227.setTransform(231.2,193.8,1.4081,1.4081,0,0,0,63.1,81.5);

        this.instance_228 = new lib.CachedBmp_975();
        this.instance_228.setTransform(139.4,172.8,0.5,0.5);

        this.instance_229 = new lib.Path_1_0_1();
        this.instance_229.setTransform(145.95,201.2,1.408,1.408,0,0,0,6.9,17.1);
        this.instance_229.alpha = 0.0508;

        this.instance_230 = new lib.ClipGroup_2_5();
        this.instance_230.setTransform(256.45,161.05,1.4081,1.4081,0,0,0,82.5,84.4);

        this.instance_231 = new lib.ClipGroup_3_8();
        this.instance_231.setTransform(303.9,399.4,1.4081,1.4081,0,0,0,158.6,104.9);

        this.instance_232 = new lib.CachedBmp_974();
        this.instance_232.setTransform(187.25,157.3,0.5,0.5);

        this.instance_233 = new lib.CachedBmp_973();
        this.instance_233.setTransform(153.95,239.3,0.5,0.5);

        this.instance_234 = new lib.CachedBmp_975();
        this.instance_234.setTransform(139.4,172.85,0.5,0.5);

        this.instance_235 = new lib.Path_9();
        this.instance_235.setTransform(162.4,219.2,1.4081,1.4081,0,0,0,6.5,5.4);
        this.instance_235.alpha = 0.5;

        this.instance_236 = new lib.ClipGroup_4();
        this.instance_236.setTransform(226.8,187.9,1.4081,1.4081,0,0,0,66.1,77.3);

        this.instance_237 = new lib.CachedBmp_971();
        this.instance_237.setTransform(139.75,177.25,0.5,0.5);

        this.instance_238 = new lib.CachedBmp_970();
        this.instance_238.setTransform(148.55,79.55,0.5,0.5);

        this.instance_239 = new lib.ClipGroup_5();
        this.instance_239.setTransform(289.5,288.75,1.4081,1.4081,0,0,0,68.3,69);

        this.instance_240 = new lib.Path_12();
        this.instance_240.setTransform(198.35,397.7,1.4081,1.4081,0,0,0,4.1,3.4);
        this.instance_240.alpha = 0.5;

        this.instance_241 = new lib.Path_13();
        this.instance_241.setTransform(195.85,410.8,1.4081,1.4081,0,0,0,3.9,3.7);
        this.instance_241.alpha = 0.5;

        this.instance_242 = new lib.Path_14();
        this.instance_242.setTransform(204.3,381.3,1.4081,1.4081,0,0,0,3.8,2.6);
        this.instance_242.alpha = 0.5;

        this.instance_243 = new lib.CachedBmp_969();
        this.instance_243.setTransform(193.75,192,0.5,0.5);

        this.instance_244 = new lib.CachedBmp_968();
        this.instance_244.setTransform(105.55,290.65,0.5,0.5);

        this.instance_245 = new lib.Path_17();
        this.instance_245.setTransform(169.45,423.25,1.4081,1.4081,0,0,0,20.4,31.1);
        this.instance_245.alpha = 0.0508;

        this.instance_246 = new lib.CachedBmp_967();
        this.instance_246.setTransform(141.2,379.85,0.5,0.5);

        this.instance_247 = new lib.CachedBmp_966();
        this.instance_247.setTransform(195.3,333.45,0.5,0.5);

        this.instance_248 = new lib.Path_20();
        this.instance_248.setTransform(146.75,190.85,1.4081,1.4081,0,0,0,5.2,9.1);
        this.instance_248.alpha = 0.25;

        this.instance_249 = new lib.CachedBmp_965();
        this.instance_249.setTransform(209.2,345.2,0.5,0.5);

        this.instance_250 = new lib.ClipGroup_15();
        this.instance_250.setTransform(263.6,155,1.4081,1.4081,0,0,0,86.1,87.2);

        this.instance_251 = new lib.ClipGroup_1_10();
        this.instance_251.setTransform(300.3,398.8,1.4081,1.4081,0,0,0,139.4,96.2);

        this.instance_252 = new lib.CachedBmp_993();
        this.instance_252.setTransform(153.05,154.9,0.5,0.5);

        this.instance_253 = new lib.Path_1_0_7();
        this.instance_253.setTransform(163.9,182.4,1.4081,1.4081,0,0,0,7.4,17.6);
        this.instance_253.alpha = 0.25;

        this.instance_254 = new lib.CachedBmp_992();
        this.instance_254.setTransform(150.9,178.9,0.5,0.5);

        this.instance_255 = new lib.ClipGroup_2_10();
        this.instance_255.setTransform(153.45,201.1,1.4081,1.4081,0,0,0,14.5,19.3);

        this.instance_256 = new lib.CachedBmp_991();
        this.instance_256.setTransform(136.85,174.25,0.5,0.5);

        this.instance_257 = new lib.CachedBmp_990();
        this.instance_257.setTransform(147.7,180.65,0.5,0.5);

        this.instance_258 = new lib.Path_5_2();
        this.instance_258.setTransform(150.5,193.6,1.4081,1.4081,0,0,0,2,8.6);
        this.instance_258.alpha = 0.25;

        this.instance_259 = new lib.CachedBmp_989();
        this.instance_259.setTransform(118.9,284.15,0.5,0.5);

        this.instance_260 = new lib.CachedBmp_988();
        this.instance_260.setTransform(201.05,335.05,0.5,0.5);

        this.instance_261 = new lib.CachedBmp_987();
        this.instance_261.setTransform(275,154.45,0.5,0.5);

        this.instance_262 = new lib.CachedBmp_986();
        this.instance_262.setTransform(170,154.8,0.5,0.5);

        this.instance_263 = new lib.CachedBmp_985();
        this.instance_263.setTransform(144.5,213.55,0.5,0.5);

        this.instance_264 = new lib.CachedBmp_984();
        this.instance_264.setTransform(154.65,242.55,0.5,0.5);

        this.instance_265 = new lib.CachedBmp_983();
        this.instance_265.setTransform(151.7,35,0.5,0.5);

        this.instance_266 = new lib.ClipGroup_3_13();
        this.instance_266.setTransform(230.6,193.75,1.4081,1.4081,0,0,0,61.6,81);

        this.instance_267 = new lib.CachedBmp_982();
        this.instance_267.setTransform(146.4,85,0.5,0.5);

        this.instance_268 = new lib.CachedBmp_981();
        this.instance_268.setTransform(281.85,171.95,0.5,0.5);

        this.instance_269 = new lib.ClipGroup_4_4();
        this.instance_269.setTransform(299.35,299.25,1.4081,1.4081,0,0,0,76.8,76.7);

        this.instance_270 = new lib.CachedBmp_980();
        this.instance_270.setTransform(210.35,191.55,0.5,0.5);

        this.instance_271 = new lib.ClipGroup_14();
        this.instance_271.setTransform(269.6,143.75,1.4081,1.4081,0,0,0,84.6,85.4);

        this.instance_272 = new lib.ClipGroup_1_9();
        this.instance_272.setTransform(268.15,405.3,1.4081,1.4081,0,0,0,149.1,90.5);

        this.instance_273 = new lib.CachedBmp_1003();
        this.instance_273.setTransform(235.85,150.55,0.5,0.5);

        this.instance_274 = new lib.CachedBmp_1002();
        this.instance_274.setTransform(137.55,156.75,0.5,0.5);

        this.instance_275 = new lib.CachedBmp_1001();
        this.instance_275.setTransform(140.6,167.2,0.5,0.5);

        this.instance_276 = new lib.Path_3_8();
        this.instance_276.setTransform(147.5,192.25,1.4081,1.4081,0,0,0,5.6,17);
        this.instance_276.alpha = 0.25;

        this.instance_277 = new lib.Path_4_4();
        this.instance_277.setTransform(152.1,233.85,1.4081,1.4081,0,0,0,5,3);
        this.instance_277.alpha = 0.5;

        this.instance_278 = new lib.CachedBmp_1000();
        this.instance_278.setTransform(161.75,32.5,0.5,0.5);

        this.instance_279 = new lib.ClipGroup_2_9();
        this.instance_279.setTransform(202.1,202.9,1.4081,1.4081,0,0,0,51.1,75.7);

        this.instance_280 = new lib.CachedBmp_999();
        this.instance_280.setTransform(246.55,165.15,0.5,0.5);

        this.instance_281 = new lib.CachedBmp_998();
        this.instance_281.setTransform(137.45,96.85,0.5,0.5);

        this.instance_282 = new lib.Path_8_2();
        this.instance_282.setTransform(158.2,252.35,1.4081,1.4081,0,0,0,4.7,2.9);
        this.instance_282.alpha = 0.5;

        this.instance_283 = new lib.CachedBmp_997();
        this.instance_283.setTransform(88.65,292.45,0.5,0.5);

        this.instance_284 = new lib.ClipGroup_3_2();
        this.instance_284.setTransform(269.9,257.85,1.4081,1.4081,0,0,0,68.5,85.4);

        this.instance_285 = new lib.CachedBmp_996();
        this.instance_285.setTransform(111.1,373.7,0.5,0.5);

        this.instance_286 = new lib.CachedBmp_995();
        this.instance_286.setTransform(199.05,137.85,0.5,0.5);

        this.instance_287 = new lib.CachedBmp_994();
        this.instance_287.setTransform(154.55,188.9,0.5,0.5);

        this.instance_288 = new lib.ClipGroup_18();
        this.instance_288.setTransform(267.75,141.6,1.4081,1.4081,0,0,0,79.6,75.8);

        this.instance_289 = new lib.ClipGroup_1_13();
        this.instance_289.setTransform(276.65,395.1,1.4081,1.4081,0,0,0,163.1,98.4);

        this.instance_290 = new lib.CachedBmp_1013();
        this.instance_290.setTransform(221.55,149.95,0.5,0.5);

        this.instance_291 = new lib.CachedBmp_1012();
        this.instance_291.setTransform(139.8,155.15,0.5,0.5);

        this.instance_292 = new lib.CachedBmp_1011();
        this.instance_292.setTransform(68.15,272.8,0.5,0.5);

        this.instance_293 = new lib.CachedBmp_1010();
        this.instance_293.setTransform(162.5,35.2,0.5,0.5);

        this.instance_294 = new lib.CachedBmp_1009();
        this.instance_294.setTransform(234.1,164.95,0.5,0.5);

        this.instance_295 = new lib.ClipGroup_2_13();
        this.instance_295.setTransform(302.05,252.2,1.4081,1.4081,0,0,0,54.4,51.8);

        this.instance_296 = new lib.CachedBmp_1008();
        this.instance_296.setTransform(232.25,179.65,0.5,0.5);

        this.instance_297 = new lib.ClipGroup_3_14();
        this.instance_297.setTransform(231.9,210.85,1.4081,1.4081,0,0,0,58.2,81);

        this.instance_298 = new lib.CachedBmp_1007();
        this.instance_298.setTransform(159.3,97.15,0.5,0.5);

        this.instance_299 = new lib.Path_7_2();
        this.instance_299.setTransform(171.7,239.7,1.4081,1.4081,0,0,0,5,3);
        this.instance_299.alpha = 0.5;

        this.instance_300 = new lib.CachedBmp_1006();
        this.instance_300.setTransform(161.8,193.25,0.5,0.5);

        this.instance_301 = new lib.CachedBmp_1005();
        this.instance_301.setTransform(140.8,181.35,0.5,0.5);

        this.instance_302 = new lib.Path_10_1();
        this.instance_302.setTransform(154.95,203.3,1.4081,1.4081,0,0,0,10.8,15);
        this.instance_302.alpha = 0.5;

        this.instance_303 = new lib.CachedBmp_1004();
        this.instance_303.setTransform(167.3,198.75,0.5,0.5);

        this.instance_304 = new lib.ClipGroup_16();
        this.instance_304.setTransform(262.85,132.3,1.4081,1.4081,0,0,0,84.6,88.3);

        this.instance_305 = new lib.ClipGroup_1_11();
        this.instance_305.setTransform(253.5,399.85,1.4081,1.4081,0,0,0,206,98.3);

        this.instance_306 = new lib.CachedBmp_1021();
        this.instance_306.setTransform(188.1,163.75,0.5,0.5);

        this.instance_307 = new lib.CachedBmp_1020();
        this.instance_307.setTransform(161.4,25.95,0.5,0.5);

        this.instance_308 = new lib.CachedBmp_1019();
        this.instance_308.setTransform(199.15,164.15,0.5,0.5);

        this.instance_309 = new lib.CachedBmp_1018();
        this.instance_309.setTransform(-12.85,289.15,0.5,0.5);

        this.instance_310 = new lib.ClipGroup_2_11();
        this.instance_310.setTransform(287.25,255.3,1.4081,1.4081,0,0,0,70,54);

        this.instance_311 = new lib.CachedBmp_1017();
        this.instance_311.setTransform(208.7,179.65,0.5,0.5);

        this.instance_312 = new lib.CachedBmp_1016();
        this.instance_312.setTransform(147.9,169.1,0.5,0.5);

        this.instance_313 = new lib.ClipGroup_3_3();
        this.instance_313.setTransform(221.7,235.7,1.4081,1.4081,0,0,0,39.8,61.4);

        this.instance_314 = new lib.CachedBmp_1015();
        this.instance_314.setTransform(171.05,149.65,0.5,0.5);

        this.instance_315 = new lib.CachedBmp_1014();
        this.instance_315.setTransform(150.6,194.25,0.5,0.5);

        this.instance_316 = new lib.Path_8_3();
        this.instance_316.setTransform(171.2,215.45,1.4081,1.4081,0,0,0,15.2,14.5);
        this.instance_316.alpha = 0.25;

        this.instance_317 = new lib.ClipGroup();
        this.instance_317.setTransform(255.25,139.35,1.4081,1.4081,0,0,0,79.7,87);

        this.instance_318 = new lib.ClipGroup_1_1();
        this.instance_318.setTransform(277.5,410.15,1.4081,1.4081,0,0,0,232.8,88.2);

        this.instance_319 = new lib.CachedBmp_1026();
        this.instance_319.setTransform(151.15,25.45,0.5,0.5);

        this.instance_320 = new lib.CachedBmp_1025();
        this.instance_320.setTransform(320.05,169.55,0.5,0.5);

        this.instance_321 = new lib.CachedBmp_1024();
        this.instance_321.setTransform(160.95,177.05,0.5,0.5);

        this.instance_322 = new lib.CachedBmp_1023();
        this.instance_322.setTransform(-39.95,297.1,0.5,0.5);

        this.instance_323 = new lib.ClipGroup_2_3();
        this.instance_323.setTransform(265.95,256.7,1.4081,1.4081,0,0,0,64.5,55.1);

        this.instance_324 = new lib.CachedBmp_1022();
        this.instance_324.setTransform(181.5,179.45,0.5,0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12}]},1).to({state:[{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28}]},1).to({state:[{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45}]},1).to({state:[{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65}]},1).to({state:[{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92}]},1).to({state:[{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118}]},1).to({state:[{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144}]},1).to({state:[{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169}]},1).to({state:[{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195}]},1).to({state:[{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221}]},1).to({state:[{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250}]},1).to({state:[{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271}]},1).to({state:[{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288}]},1).to({state:[{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304}]},1).to({state:[{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317}]},1).wait(1));

        // Calque_11
        this.instance_325 = new lib.background();
        this.instance_325.setTransform(0,0,0.125,0.125);

        this.timeline.addTween(cjs.Tween.get(this.instance_325).wait(16));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(196.9,232.4,408.9,313.80000000000007);
// library properties:
    lib.properties = {
        id: '0DC0512330095746904ADBBCC0C52CEA',
        width: 500,
        height: 500,
        fps: 12,
        color: "#FFFFFF",
        opacity: 0.00,
        manifest: [
            {src:"/images/background.png?1616933831896", id:"background"},
            {src:"/images/test_atlas_.png?1616933830692", id:"test_atlas_"},
            {src:"/images/test_atlas_2.png?1616933830694", id:"test_atlas_2"},
            {src:"/images/test_atlas_3.png?1616933830696", id:"test_atlas_3"},
            {src:"/images/test_atlas_4.png?1616933830698", id:"test_atlas_4"},
            {src:"/images/test_atlas_5.png?1616933830700", id:"test_atlas_5"},
            {src:"/images/test_atlas_6.png?1616933830703", id:"test_atlas_6"},
            {src:"/images/test_atlas_7.png?1616933830708", id:"test_atlas_7"},
            {src:"/images/test_atlas_8.png?1616933830728", id:"test_atlas_8"}
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
    an.compositions['0DC0512330095746904ADBBCC0C52CEA'] = {
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
            stage.scaleX = pRatio*sRatio;
            stage.scaleY = pRatio*sRatio;
            lastW = iw; lastH = ih; lastS = sRatio;
            stage.tickOnUpdate = false;
            stage.update();
            stage.tickOnUpdate = true;
        }
    }


})(createjs = createjs||{}, me360_AdobeAn = me360_AdobeAn||{});
var me360_AdobeAn;
