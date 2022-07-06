"use strict";
cc._RF.push(module, 'c3b94XY5h9IZJ+9qy81/Qjn', 'RechargeChannelItem');
// script/recharge/RechargeChannelItem.ts

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
let RechargeChannelItem = class RechargeChannelItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgIcon = null;
        this.labName = null;
        // 商品数据
        this.m_data = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.register();
    }
    start() {
        this.updateView();
    }
    initData() {
    }
    initView() {
        this.imgIcon.spriteFrame = null;
        this.labName.string = "";
    }
    register() {
    }
    updateView() {
        this.imgIcon.spriteFrame = null;
        this.labName.string = this.m_data.name;
        this.imgIcon.loadRemoteImage({ url: this.m_data.icon, view: this });
        // UtilMgr.downloadImg(this.m_data.icon, this.imgIcon, (spriteFrame: cc.SpriteFrame) => {
        //     this.imgIcon.spriteFrame = spriteFrame
        // }, this);
    }
    onClickSelect() {
        dispatch("SELECT_PAY_CHANNEL", this.m_data);
    }
    setData(data) {
        this.m_data = data;
    }
};
__decorate([
    property(cc.Sprite)
], RechargeChannelItem.prototype, "imgIcon", void 0);
__decorate([
    property(cc.Label)
], RechargeChannelItem.prototype, "labName", void 0);
RechargeChannelItem = __decorate([
    ccclass
], RechargeChannelItem);
exports.default = RechargeChannelItem;

cc._RF.pop();