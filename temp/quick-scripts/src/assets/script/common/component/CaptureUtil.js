"use strict";
cc._RF.push(module, '62514iiX+1P77Y8x+CP7v6o', 'CaptureUtil');
// script/common/component/CaptureUtil.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CaptureUtil_1;
Object.defineProperty(exports, "__esModule", { value: true });
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const { ccclass, property } = cc._decorator;
let CaptureUtil = CaptureUtil_1 = class CaptureUtil {
    constructor() {
        this.camera = null;
        this.texture = null;
        this._canvas = null;
    }
    static Instance() { return this._instance || (this._instance = new CaptureUtil_1()); }
    inint(sender) {
        if (!this.camera) {
            let node = new cc.Node();
            let rootScene = cc.director.getScene();
            let root = rootScene.getChildByName("Canvas");
            node.parent = root;
            node.zIndex = 10000;
            this.camera = node.addComponent(cc.Camera);
            this.camera.backgroundColor = cc.Color.TRANSPARENT;
            this.camera.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL || cc.Camera.ClearFlags.COLOR;
            // 设置你想要的截图内容的 cullingMask
            this.camera.cullingMask = -4;
            this.camera.alignWithScreen = false;
            // this.camera.orthoSize = sender.width/2;
            // this.camera.node.position = cc.v2(0, 0);
            this.camera.alignWithScreen = false;
            this.camera.orthoSize = sender.height / 2;
            this.camera.node.y = sender.y;
            let texture = new cc.RenderTexture();
            texture.initWithSize(sender.width, sender.height, cc.RenderTexture.DepthStencilFormat.RB_FMT_S8);
            this.camera.targetTexture = texture;
            this.texture = texture;
            this.camera.enabled = true;
        }
    }
    capture(node) {
        if (node) {
            this.inint(node);
            node.groupIndex = 2;
            if (cc.sys.isNative) { //原生
                setTimeout(() => {
                    let picData = this.initImage();
                    // this.createCanvas(picData);
                    this.saveFile(picData);
                    this.camera.enabled = false;
                    this.camera.node.destroy();
                    this.camera = null;
                }, 1000);
            }
            else if (cc.sys.isBrowser) { //web
                this.createCanvasWeb();
                let img = this.createImg();
                setTimeout(() => {
                    // this.showImage(img);
                    this.downloadFile_web('share_redPacke_image.png', img.src);
                    dispatch("handleSaveImageToLocal", true);
                }, 1000);
            }
        }
    }
    base64Img2Blob_web(code) {
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }
    downloadFile_web(fileName, content) {
        var aLink = document.createElement('a');
        var blob = this.base64Img2Blob_web(content);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REDPAKGE.saveSuccess);
        aLink.dispatchEvent(evt);
        this.camera.node.destroy();
        this.camera = null;
    }
    createCanvasWeb() {
        let width = this.texture.width;
        let height = this.texture.height;
        if (!this._canvas) {
            this._canvas = document.createElement('canvas');
            this._canvas.width = width;
            this._canvas.height = height;
        }
        else {
            this.clearCanvas();
        }
        let ctx = this._canvas.getContext('2d');
        this.camera.render();
        let data = this.texture.readPixels();
        // write the render data
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }
            ctx.putImageData(imageData, 0, row);
        }
        return this._canvas;
    }
    createImg() {
        // return the type and dataUrl
        var dataURL = this._canvas.toDataURL("share_redPacke_image/png");
        var img = document.createElement("img");
        img.src = dataURL;
        return img;
    }
    showImage(img) {
        let texture = new cc.Texture2D();
        texture.initWithElement(img);
        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        // set position
        let width = cc.winSize.width;
        let height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.parent = null;
            node.destroy();
        });
        this.captureAction(node, width, height);
    }
    clearCanvas() {
        let ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    initImage() {
        this.camera.render();
        let data = this.texture.readPixels();
        let picData = this.filpYImage(data, this.texture.width, this.texture.height);
        return picData;
    }
    createCanvas(picData) {
        let texture = new cc.Texture2D();
        texture.initWithData(picData, 32, this.texture.width, this.texture.height);
        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        // set position
        let width = cc.winSize.width;
        let height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.parent = null;
            node.destroy();
        });
        this.captureAction(node, width, height);
    }
    filpYImage(data, width, height) {
        // create the data array
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    }
    saveFile(picData) {
        if (CC_JSB) {
            let filePath = jsb.fileUtils.getWritablePath() + 'share_redPacke_image.png';
            // let success = jsb.fileUtils.writeDataToFile(picData, filePath)
            let success = jsb.saveImageData(picData, this.texture.width, this.texture.height, filePath);
            if (success) {
                cc.log("save image data success, file: " + filePath);
                window['platformUtil'].saveTextureToLocal(filePath);
                // PanelHelp.showTip(i18n.REDPAKGE.saveSuccess)
            }
            else {
                cc.error("save image data failed!");
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REDPAKGE.saveFailed);
            }
        }
    }
    captureAction(capture, width, height) {
        let scaleAction = cc.scaleTo(1, 0.3);
        let targetPos = cc.v2(width - width / 6, height / 4);
        let moveAction = cc.moveTo(1, targetPos);
        let spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
    }
};
CaptureUtil._instance = null;
CaptureUtil = CaptureUtil_1 = __decorate([
    ccclass
], CaptureUtil);
exports.default = CaptureUtil;

cc._RF.pop();