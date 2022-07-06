"use strict";
cc._RF.push(module, 'c688e1v7ppLPKbWtEtymmhv', 'PromotionRankItem');
// script/promotion/PromotionRankItem.ts

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
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let PromotionRankItem = class PromotionRankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgRank = null;
        this.labRank = null;
        this.imgAvatar = null;
        this.labNick = null;
        this.labIncome = null;
        this.spfRankList = [];
        this._data = null;
        // update (dt) {}
    }
    onLoad() {
        this.initData();
        this.initUI();
    }
    start() {
    }
    initData() {
        this._data = null;
    }
    initUI() {
        this.imgRank.node.active = false;
        this.labRank.string = "";
        this.imgAvatar.spriteFrame = null;
        this.labNick.string = "";
        this.labIncome.string = "";
    }
    refreshRank() {
        if (this._data.rank <= 3) {
            this.labRank.string = "";
            this.imgRank.spriteFrame = this.spfRankList[this._data.rank - 1];
            this.imgRank.node.active = true;
        }
        else {
            this.imgRank.node.active = false;
            this.labRank.string = this._data.rank.toString();
        }
    }
    refreshPlayer() {
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, this._data.data.userInfo.HeaderUrl, this._data.data.userInfo.UnitId, this);
        this.labNick.string = this._data.data.userInfo.Nick;
    }
    refreshIncome() {
        this.labIncome.string = NumberUtils_1.default.converToC(this._data.data.incomeGold);
    }
    onShow(data) {
        this._data = data;
        this.initUI();
        this.refreshRank();
        this.refreshPlayer();
        this.refreshIncome();
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Sprite)
], PromotionRankItem.prototype, "imgRank", void 0);
__decorate([
    property(cc.Label)
], PromotionRankItem.prototype, "labRank", void 0);
__decorate([
    property(cc.Sprite)
], PromotionRankItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], PromotionRankItem.prototype, "labNick", void 0);
__decorate([
    property(cc.Label)
], PromotionRankItem.prototype, "labIncome", void 0);
__decorate([
    property([cc.SpriteFrame])
], PromotionRankItem.prototype, "spfRankList", void 0);
PromotionRankItem = __decorate([
    ccclass
], PromotionRankItem);
exports.default = PromotionRankItem;

cc._RF.pop();