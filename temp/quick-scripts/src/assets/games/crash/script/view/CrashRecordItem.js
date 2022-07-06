"use strict";
cc._RF.push(module, '6dd53mKcoVHY7AAwkFceOZW', 'CrashRecordItem');
// games/crash/script/view/CrashRecordItem.ts

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
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const CrashColorDefine_1 = require("../define/CrashColorDefine");
const CrashRateDefine_1 = require("../define/CrashRateDefine");
const { ccclass, property } = cc._decorator;
let CrashRecordItem = class CrashRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgBg = null;
        this.labRate = null;
        // 倍率
        this._rate = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
        this._rate = null;
    }
    initView() {
        this.imgBg.node.active = false;
        this.labRate.string = "";
    }
    refreshValue() {
        this.imgBg.node.active = this._rate !== null;
        ;
        this.labRate.string = NumberUtils_1.default.converToC(this._rate);
    }
    refreshColor() {
        if (isNaN(this._rate)) {
            return;
        }
        let color = CrashColorDefine_1.CrashColorDefine.Record.WHITE;
        if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.YEELOW) {
            color = CrashColorDefine_1.CrashColorDefine.Record.YEELOW;
        }
        else if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.BLUE) {
            color = CrashColorDefine_1.CrashColorDefine.Record.BLUE;
        }
        else if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.GREEN) {
            color = CrashColorDefine_1.CrashColorDefine.Record.GREEN;
        }
        else if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.RED) {
            color = CrashColorDefine_1.CrashColorDefine.Record.RED;
        }
        this.labRate.node.color = color;
    }
    setRate(rate) {
        this._rate = rate;
        this.refreshValue();
        this.refreshColor();
    }
    clear() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], CrashRecordItem.prototype, "imgBg", void 0);
__decorate([
    property(cc.Label)
], CrashRecordItem.prototype, "labRate", void 0);
CrashRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashRecordItem);
exports.default = CrashRecordItem;

cc._RF.pop();