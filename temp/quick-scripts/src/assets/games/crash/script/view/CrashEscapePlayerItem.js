"use strict";
cc._RF.push(module, 'fd0e6aOR6xMup03aF9/zR4+', 'CrashEscapePlayerItem');
// games/crash/script/view/CrashEscapePlayerItem.ts

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
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const { ccclass, property } = cc._decorator;
let CrashEscapePlayerItem = class CrashEscapePlayerItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgBg = null;
        this.labNick = null;
        this._nick = null;
        // update (dt) {}
    }
    onLoad() {
        this.initData();
        this.initUI();
    }
    start() {
    }
    initData() {
        this._nick = null;
    }
    initUI() {
        this.labNick.string = "";
    }
    refreshNick() {
        this.labNick.string = UtilMgr_1.UtilMgr.setString(this._nick);
        this.labNick._forceUpdateRenderData();
        this.imgBg.node.width = this.labNick.node.width;
    }
    onShow(nick) {
        this._nick = nick;
        this.initUI();
        this.refreshNick();
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Sprite)
], CrashEscapePlayerItem.prototype, "imgBg", void 0);
__decorate([
    property(cc.Label)
], CrashEscapePlayerItem.prototype, "labNick", void 0);
CrashEscapePlayerItem = __decorate([
    ccclass
], CrashEscapePlayerItem);
exports.default = CrashEscapePlayerItem;

cc._RF.pop();