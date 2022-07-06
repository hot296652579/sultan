"use strict";
cc._RF.push(module, '083f42x3axB5JSWK8z00xwZ', 'LabelTip');
// script/msgbox/LabelTip.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let LabelTip = class LabelTip extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.item = null;
        this.imgBg = null;
        this.label = null;
        this.delayTime = 0.5;
        this.bgOriginSize = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "msgbox/prefabs/LabelTip";
    }
    onLoad() {
        super.onLoad();
        this.bgOriginSize = this.imgBg.node.getContentSize();
    }
    show(args) {
        super.show(args);
        // this.showTip(this.args[0]);
        if (this.args[0]) {
            this.label.language = this.args[0];
            this.label._forceUpdateRenderData();
            this.delayTime = this.args[1] ? this.args[1] : 0.5;
            this.doOpenAction();
        }
        if (this.label.node.width > this.bgOriginSize.width) {
            this.imgBg.node.width = this.label.node.width + 40;
        }
        this.imgBg.node.height = this.label.node.height + 40;
    }
    doOpenAction() {
        this.node.stopAllActions();
        this.node.opacity = 255;
        let t = cc.tween;
        t(this.node)
            .delay(this.delayTime)
            .parallel(t().by(0.5, { position: cc.v2(0, 100) }), t().to(0.5, { opacity: 0 }))
            .call(() => {
            this.close();
        })
            .start();
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], LabelTip.prototype, "item", void 0);
__decorate([
    property(cc.Sprite)
], LabelTip.prototype, "imgBg", void 0);
__decorate([
    property(cc.Label)
], LabelTip.prototype, "label", void 0);
LabelTip = __decorate([
    ccclass
], LabelTip);
exports.default = LabelTip;

cc._RF.pop();