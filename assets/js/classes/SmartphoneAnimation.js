import $ from 'jquery';

import * as createjs from '../createJs/createJs';
window.createjs = createjs;

export default class SmartphoneAnimation {
    adobeAn = {};

    canvas = null;
    stage = null;
    exportRoot = null;
    global_container = null;
    anim_container = null;
    dom_overlay_container = null;
    fnStartAnimation = null;

    constructor() {
        let p; // shortcut to reference prototypes
        
        let lib = {};
        let ss = {};
        let img = {};
        
        lib.ssMetadata = [
            {name:"smartphone_web_atlas_", frames: [[0,0,820,1202],[1453,679,454,541],[1044,1648,8,6],[0,2028,5,5],[1348,1110,14,14],[740,1742,24,24],[822,0,629,1108],[0,1883,19,143],[1823,0,16,90],[822,1110,13,63],[0,1204,368,677],[1453,0,368,677],[370,1204,368,677],[740,1204,302,536],[1044,1110,302,536],[1348,1222,302,536],[1652,1222,302,536]]}
        ];
        
        // symbols:
        (lib.CachedBmp_10 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(0);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_9 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(1);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_19 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(2);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_18 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(3);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_17 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(4);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_16 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(5);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_15 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(6);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_8 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(7);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_7 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(8);
        }).prototype = p = new createjs.Sprite();

        (lib.CachedBmp_6 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(9);
        }).prototype = p = new createjs.Sprite();

        (lib.Image = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(10);
        }).prototype = p = new createjs.Sprite();

        (lib.Image_1 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(11);
        }).prototype = p = new createjs.Sprite();

        (lib.Image_2 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(12);
        }).prototype = p = new createjs.Sprite();

        (lib.Bitmap2 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(13);
        }).prototype = p = new createjs.Sprite();

        (lib.Bitmap3 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(14);
        }).prototype = p = new createjs.Sprite();

        (lib.Bitmap4 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(15);
        }).prototype = p = new createjs.Sprite();

        (lib.Bitmap5 = function() {
            this.initialize(ss["smartphone_web_atlas_"]);
            this.gotoAndStop(16);
        }).prototype = p = new createjs.Sprite();

        (lib.Screen4 = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_18___copie
            this.instance = new lib.Bitmap5();
            this.instance.setTransform(6,19);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Screen4, new createjs.Rectangle(6,19,302,536), null);

        (lib.Screen3 = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_18___copie
            this.instance = new lib.Bitmap4();
            this.instance.setTransform(6,19);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Screen3, new createjs.Rectangle(6,19,302,536), null);

        (lib.Screen2 = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_18_copy
            this.instance = new lib.Bitmap2();
            this.instance.setTransform(6,19);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Screen2, new createjs.Rectangle(6,19,302,536), null);

        (lib.Screen1 = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_18_copy
            this.instance = new lib.Bitmap3();
            this.instance.setTransform(6,19);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Screen1, new createjs.Rectangle(6,19,302,536), null);

        (lib.Logo2 = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_8
            this.instance = new lib.Image_1();
            this.instance.setTransform(140,0);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Logo2, new createjs.Rectangle(140,0,368,677), null);

        (lib.Logo1 = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_9
            this.instance = new lib.Image();
            this.instance.setTransform(140,0);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Logo1, new createjs.Rectangle(140,0,368,677), null);

        (lib.Path = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_1
            this.instance = new lib.CachedBmp_10();
            this.instance.setTransform(0,0,0.5,0.5);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Path, new createjs.Rectangle(0,0,410,601), null);

        (lib.Path_1 = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_1
            this.instance_1 = new lib.CachedBmp_9();
            this.instance_1.setTransform(0,0,0.5,0.5);

            this.timeline.addTween(createjs.Tween.get(this.instance_1).wait(1));
            this._renderFirstFrame();
        }).prototype = this.getMCSymbolPrototype(lib.Path_1, new createjs.Rectangle(0,0,227,270.5), null);

        (lib.Animation = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // LogoFitness
            this.instance = new lib.Logo1();
            this.instance.setTransform(42,-55.5,1,1,0,0,0,184,338.5);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(124).to({alpha:0},25).to({_off:true},1).wait(124).to({_off:false},0).to({alpha:1},25).wait(1));

            // LogoCollection
            this.instance_1 = new lib.Logo2();
            this.instance_1.setTransform(42,-55.5,1,1,0,0,0,184,338.5);
            this.instance_1.alpha = 0;
            this.instance_1._off = true;

            this.timeline.addTween(createjs.Tween.get(this.instance_1).wait(124).to({_off:false},0).to({alpha:1},25).wait(125).to({alpha:0},25).wait(1));

            // Calque_13
            this.instance_2 = new lib.Image_2();
            this.instance_2.setTransform(-2,-394);

            this.timeline.addTween(createjs.Tween.get(this.instance_2).wait(300));

            // smartphone
            this.instance_3 = new lib.CachedBmp_19();
            this.instance_3.setTransform(36.1,-356.8,0.5,0.5);

            this.instance_4 = new lib.CachedBmp_18();
            this.instance_4.setTransform(35.1,-359.8,0.5,0.5);

            this.instance_5 = new lib.CachedBmp_17();
            this.instance_5.setTransform(34.15,-360.45,0.5,0.5);

            this.instance_6 = new lib.CachedBmp_16();
            this.instance_6.setTransform(31.5,-363.1,0.5,0.5);

            this.instance_7 = new lib.CachedBmp_15();
            this.instance_7.setTransform(-142,-384,0.5,0.5);

            this.instance_8 = new lib.CachedBmp_8();
            this.instance_8.setTransform(-121.2,-216.1,0.5,0.5);

            this.instance_9 = new lib.CachedBmp_7();
            this.instance_9.setTransform(152.3,-165.3,0.5,0.5);

            this.instance_10 = new lib.CachedBmp_6();
            this.instance_10.setTransform(162.6,-266.35,0.5,0.5);

            this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(300));

            // Screen1
            this.instance_11 = new lib.Screen1();
            this.instance_11.setTransform(42,-55.5,1,1,0,0,0,184,338.5);

            this.timeline.addTween(createjs.Tween.get(this.instance_11).wait(49).to({alpha:0},25).to({_off:true},1).wait(199).to({_off:false},0).to({alpha:1},25).wait(1));

            // Screen2
            this.instance_12 = new lib.Screen2();
            this.instance_12.setTransform(42,-55.5,1,1,0,0,0,184,338.5);
            this.instance_12.alpha = 0;
            this.instance_12._off = true;

            this.timeline.addTween(createjs.Tween.get(this.instance_12).wait(49).to({_off:false},0).to({alpha:1},25).wait(50).to({alpha:0},25).wait(151));

            // Screen3
            this.instance_13 = new lib.Screen3();
            this.instance_13.setTransform(42,-55.5,1,1,0,0,0,184,338.5);
            this.instance_13.alpha = 0;
            this.instance_13._off = true;

            this.timeline.addTween(createjs.Tween.get(this.instance_13).wait(124).to({_off:false},0).to({alpha:1},25).wait(50).to({alpha:0},25).to({_off:true},1).wait(75));

            // Screen4
            this.instance_14 = new lib.Screen4();
            this.instance_14.setTransform(42,-55.5,1,1,0,0,0,184,338.5);
            this.instance_14.alpha = 0;
            this.instance_14._off = true;

            this.timeline.addTween(createjs.Tween.get(this.instance_14).wait(199).to({_off:false},0).to({alpha:1},25).wait(50).to({alpha:0},25).wait(1));

            // Calque_10
            this.instance_15 = new lib.Path_1();
            this.instance_15.setTransform(72.3,242.65,1,1,0,0,0,112.4,135.2);
            this.instance_15.alpha = 0.1484;

            this.timeline.addTween(createjs.Tween.get(this.instance_15).wait(300));

            // Calque_11
            this.instance_16 = new lib.Path();
            this.instance_16.setTransform(-83.75,-65.65,1,1,0,0,0,204.9,300.4);
            this.instance_16.alpha = 0.1484;

            this.timeline.addTween(createjs.Tween.get(this.instance_16).wait(300));
            this._renderFirstFrame();
        }).prototype = p = new createjs.MovieClip();

        p.nominalBounds = new createjs.Rectangle(-288.6,-394,654.6,772);

        // stage content:
        (lib.smartphoneweb = function(mode,startPosition,loop) {
            this.initialize(mode,startPosition,loop,{});

            // Calque_11
            this.instance = new lib.Animation();
            this.instance.setTransform(327.25,383.9,1,1,0,0,0,38.6,-8.1);

            this.timeline.addTween(createjs.Tween.get(this.instance).wait(1));

            this._renderFirstFrame();

        }).prototype = p = new createjs.MovieClip();

        p.nominalBounds = new createjs.Rectangle(250,382,404.70000000000005,388);

        // library properties:
        lib.properties = {
            id: '7731A9CF9D05CB459615FE7121A37E9A',
            width: 500,
            height: 768,
            fps: 24,
            color: "#FFFFFF",
            opacity: 1.00,
            manifest: [
                {src:"/images/smartphone_web_atlas_.png?1599024404916", id:"smartphone_web_atlas_"}
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
        p.stop = function(ms) { if (ms) this.seek(ms); this.tickEnabled = false; }
        p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
        p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

        p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

        this.adobeAn.bootcompsLoaded = this.adobeAn.bootcompsLoaded || [];
        
        if (!this.adobeAn.bootstrapListeners) {
            this.adobeAn.bootstrapListeners = [];
        }

        this.adobeAn.bootstrapCallback = function(fnCallback) {
            this.adobeAn.bootstrapListeners.push(fnCallback);

            if (this.adobeAn.bootcompsLoaded.length > 0) {
                for (let i = 0; i < this.adobeAn.bootcompsLoaded.length; ++i) {
                    fnCallback(this.adobeAn.bootcompsLoaded[i]);
                }
            }
        }.bind(this);

        this.adobeAn.compositions = this.adobeAn.compositions || {};
        this.adobeAn.compositions['7731A9CF9D05CB459615FE7121A37E9A'] = {
            getStage: function() { return this.exportRoot.stage; }.bind(this),
            getLibrary: function() { return lib; },
            getSpriteSheet: function() { return ss; },
            getImages: function() { return img; }
        };

        this.adobeAn.compositionLoaded = function (id) {
            this.adobeAn.bootcompsLoaded.push(id);
            for (let j = 0; j < this.adobeAn.bootstrapListeners.length; j++) {
                this.adobeAn.bootstrapListeners[j](id);
            }
        }.bind(this);

        this.adobeAn.getComposition = function (id) {
            return this.adobeAn.compositions[id];
        }.bind(this);

        this.adobeAn.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers, stage) {
            let lastW, lastH, lastS = 1;
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            function resizeCanvas() {
                let w = lib.properties.width, h = lib.properties.height;
                let iw = window.innerWidth, ih=window.innerHeight;
                let pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;

                if (isResp) {
                    if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                        sRatio = lastS;
                    } else if (!isScale) {
                        if (iw < w || ih < h)
                            sRatio = Math.min(xRatio, yRatio);
                    }  else if (scaleType == 1) {
                        sRatio = Math.min(xRatio, yRatio);
                    } else if (scaleType == 2) {
                        sRatio = Math.max(xRatio, yRatio);
                    }
                }
                
                domContainers[0].width = w * pRatio * sRatio;
                domContainers[0].height = h * pRatio * sRatio;
                
                stage.scaleX = pRatio * sRatio;
                stage.scaleY = pRatio * sRatio;
                
                lastW = iw;
                lastH = ih;
                lastS = sRatio;
                
                stage.tickOnUpdate = false;
                stage.update();
                stage.tickOnUpdate = true;
            }
        }
    }

    mc_symbol_clone = function () {
        let clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));

        clone.gotoAndStop(this.currentFrame);
        clone.paused = this.paused;
        clone.framerate = this.framerate;

        return clone;
    }

    getMCSymbolPrototype = function (symbol, nominalBounds, frameBounds) {
        let prototype = new createjs.extend(symbol, createjs.MovieClip);

        prototype.clone = this.mc_symbol_clone;
        prototype.nominalBounds = nominalBounds;
        prototype.frameBounds = frameBounds;

        return prototype;
    }

    initAnimation = function () {
        this.global_container = document.getElementById("smartphone_global_container");
        this.canvas = document.getElementById("smartphone_canvas");
        this.anim_container = document.getElementById("smartphone_animation_container");
        this.dom_overlay_container = document.getElementById("smartphone_dom_overlay_container");

        let comp = this.adobeAn.getComposition("7731A9CF9D05CB459615FE7121A37E9A");
        let lib = comp.getLibrary();
        let loader = new createjs.LoadQueue(true);

        loader.addEventListener("fileload", function (evt) {
            this.handleFileLoad(evt, comp);
        }.bind(this));

        loader.addEventListener("complete", function (evt) {
            this.handleComplete(evt, comp);
        }.bind(this));

        loader.loadManifest(lib.properties.manifest);
    }

    handleFileLoad = function (evt, comp) {
        let images = comp.getImages();
        if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
    }

    handleComplete = function (evt, comp) {
        //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
        let lib = comp.getLibrary();
        let ss = comp.getSpriteSheet();
        let queue = evt.target;
        let ssMetadata = lib.ssMetadata;

        for (let i = 0; i < ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
        }

        this.exportRoot = new lib.smartphoneweb();
        this.stage = new lib.Stage(this.canvas);

        //Registers the "tick" event listener.
        this.fnStartAnimation = function() {
            this.stage.addChild(this.exportRoot);
            createjs.Ticker.framerate = lib.properties.fps;
            createjs.Ticker.addEventListener("tick", this.stage);
        }

        //Code to support hidpi screens and responsive scaling.
        this.adobeAn.makeResponsive(false,'both',false,1,[this.canvas, this.anim_container, this.dom_overlay_container], this.stage);
        this.adobeAn.compositionLoaded(lib.properties.id);
        this.fnStartAnimation();

        setTimeout(function(){
            let animationHandler = $(this.global_container).data('animation-handler');

            if (animationHandler === undefined) {
                $(this.global_container).removeClass('wait-load');
            } else {
                $('#' + animationHandler).removeClass('wait-load');
            }
        }.bind(this), 250);
    }
}