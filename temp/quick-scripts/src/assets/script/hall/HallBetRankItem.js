"use strict";
cc._RF.push(module, '488946P629MZ73FTUzhqVa+', 'HallBetRankItem');
// script/hall/HallBetRankItem.ts

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
const Config_1 = require("../common/config/Config");
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const Defines_1 = require("../framework/base/Defines");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let HallBetRankItem = class HallBetRankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.gold = null;
        this.gamesNode = null;
        this.playerNode = null;
        this.iconGame = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        // this.node.opacity = 0;
    }
    updateItem(data, itemId) {
        // this.gold.string = UtilMgr.changeMoney(data.gold);
        let labGame = this.gamesNode.getChildByName('labGame').getComponent(cc.Label);
        let nick = this.playerNode.getChildByName('nick').getComponent(cc.Label);
        let imgAvatar = this.playerNode.getChildByName('imgAvatar').getComponent(cc.Sprite);
        labGame.string = data.gameName;
        nick.string = data.Nick;
        // this.gold.string = `Rp ${data.Score}`;
        this.gold.string = NumberUtils_1.default.converToC(data.Score);
        this.refreshGameIcon(data);
        if (data.headImgUrl)
            UtilMgr_1.UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this);
    }
    refreshGameIcon(data) {
        let games = Config_1.Config.games;
        let gameName = data.gameName;
        let imgUrl = `hall/images/domino/icon_${games[gameName].disName}_new`;
        console.log(imgUrl);
        this.iconGame.loadImage({ url: imgUrl, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClick(event) {
        console.log(event);
    }
};
__decorate([
    property(cc.Label)
], HallBetRankItem.prototype, "gold", void 0);
__decorate([
    property(cc.Node)
], HallBetRankItem.prototype, "gamesNode", void 0);
__decorate([
    property(cc.Node)
], HallBetRankItem.prototype, "playerNode", void 0);
__decorate([
    property(cc.Sprite)
], HallBetRankItem.prototype, "iconGame", void 0);
HallBetRankItem = __decorate([
    ccclass
], HallBetRankItem);
exports.default = HallBetRankItem;

cc._RF.pop();