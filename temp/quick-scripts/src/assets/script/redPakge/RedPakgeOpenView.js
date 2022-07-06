"use strict";
cc._RF.push(module, 'f2468u+7j5NC5y8axWOhl2z', 'RedPakgeOpenView');
// script/redPakge/RedPakgeOpenView.ts

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
const Defines_1 = require("../framework/base/Defines");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeOpenView = class RedPakgeOpenView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.amountLab = null;
        this.nameLab = null;
        this.head = null;
        this.head2 = null;
        this.headNode = null;
        this.hongbaoSpine = null;
        this.caidaiSpine = null;
        this._data = null;
        this.isEnabledTouch = true;
    }
    static getPrefabUrl() {
        return "redPakge/prefabs/RedPakgeOpenView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    bindingEvents() {
        super.bindingEvents();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args) {
            if (args[0])
                this._data = args[0];
        }
    }
    start() {
        this.hongbaoSpine.paused = true;
        this.caidaiSpine.paused = true;
        this.amountLab.node.parent.active = false;
        this.showContent();
    }
    showContent() {
        let data = this.getData();
        if (data) {
            G.Logger.log(data);
            this.isEnabledTouch = true;
            this.hongbaoSpine.setAnimation(0, "newAnimation", false);
            this.caidaiSpine.setAnimation(0, "newAnimation", false);
            this.hongbaoSpine.paused = true;
            this.caidaiSpine.paused = true;
            this.amountLab.node.parent.active = false;
            this.headNode.active = true;
            UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
            UtilMgr_1.UtilMgr.loadHeadImg(this.head2, data.headImgUrl, data.userId, this);
            this.amountLab.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.receiveAmount);
            this.nameLab.string = UtilMgr_1.UtilMgr.setString(data.nickname);
        }
    }
    getData() {
        if (!this._data || !this._data[0]) {
            return null;
        }
        return this._data[0];
    }
    removeData() {
        if (this._data[0])
            this._data.splice(0, 1);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "onClickNode":
                this.showRedPakge();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    showRedPakge() {
        let data = this.getData();
        if (data && this.isEnabledTouch) {
            this.isEnabledTouch = false;
            this.hongbaoSpine.paused = false;
            this.caidaiSpine.paused = false;
            this.hongbaoSpine.setAnimation(0, "newAnimation", false);
            this.caidaiSpine.setAnimation(0, "newAnimation", false);
            this.amountLab.node.parent.active = false;
            this.scheduleOnce(() => {
                this.audioHelper.playEffect("common/audio/openRedpackge", Defines_1.BUNDLE_RESOURCES);
                this.headNode.active = false;
                this.amountLab.node.parent.active = true;
            }, 0.6);
            this.scheduleOnce(() => {
                this.removeData();
                this.showContent();
            }, 1.5);
        }
    }
    onDestroy() {
        this.unscheduleAllCallbacks();
        super.onDestroy();
    }
};
__decorate([
    property(cc.Label)
], RedPakgeOpenView.prototype, "amountLab", void 0);
__decorate([
    property(cc.Label)
], RedPakgeOpenView.prototype, "nameLab", void 0);
__decorate([
    property(cc.Sprite)
], RedPakgeOpenView.prototype, "head", void 0);
__decorate([
    property(cc.Sprite)
], RedPakgeOpenView.prototype, "head2", void 0);
__decorate([
    property(cc.Node)
], RedPakgeOpenView.prototype, "headNode", void 0);
__decorate([
    property(sp.Skeleton)
], RedPakgeOpenView.prototype, "hongbaoSpine", void 0);
__decorate([
    property(sp.Skeleton)
], RedPakgeOpenView.prototype, "caidaiSpine", void 0);
RedPakgeOpenView = __decorate([
    ccclass
], RedPakgeOpenView);
exports.default = RedPakgeOpenView;

cc._RF.pop();