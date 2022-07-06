"use strict";
cc._RF.push(module, '3ca05kz1qlI6ZpkP1zuNzxu', 'RouletteMyRecordItem');
// games/roulette/script/view/RouletteMyRecordItem.ts

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
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RouletteMyRecordItem = class RouletteMyRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.iconSp = null;
        this.imgAvatar = null;
        this.uname = null;
        this.labRp = null;
        this.colorIcon0 = null;
        this.colorIcon1 = null;
        this.colorIcon2 = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
    }
    initView() {
    }
    updateItem(data, idx) {
        let betInfo = data.betInfo;
        this.uname.string = betInfo.player.Nick;
        this.labRp.string = NumberUtils_1.default.converToC(betInfo.BetGold);
        for (let index = 0; index < 3; index++) {
            const colorIcon = this[`colorIcon${index}`];
            colorIcon.active = false;
            if (index == betInfo.Color)
                colorIcon.active = true;
        }
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, betInfo.player.HeaderUrl, betInfo.player.UnitId, this);
    }
    clear() {
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], RouletteMyRecordItem.prototype, "iconSp", void 0);
__decorate([
    property(cc.Sprite)
], RouletteMyRecordItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], RouletteMyRecordItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], RouletteMyRecordItem.prototype, "labRp", void 0);
__decorate([
    property(cc.Node)
], RouletteMyRecordItem.prototype, "colorIcon0", void 0);
__decorate([
    property(cc.Node)
], RouletteMyRecordItem.prototype, "colorIcon1", void 0);
__decorate([
    property(cc.Node)
], RouletteMyRecordItem.prototype, "colorIcon2", void 0);
RouletteMyRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteMyRecordItem);
exports.default = RouletteMyRecordItem;

cc._RF.pop();