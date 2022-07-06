"use strict";
cc._RF.push(module, '15747K2ICBK2bNN9K+nPBUV', 'LeaderBoardItem');
// script/rank/LeaderBoardItem.ts

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
const ScroViewBaseItem_1 = __importDefault(require("../common/component/ScroViewBaseItem"));
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let LeaderBoardItem = class LeaderBoardItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.index = null;
        this.uname = null;
        this.reward = null;
        this.gold = null;
        this.head = null;
        this.icon1 = null;
        this.icon2 = null;
        this.icon3 = null;
        this.bg = null;
        this.bg2 = null;
        this.view = null;
    }
    onLoad() {
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.index.string = "";
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            if (data.rank == 1) {
                this.icon1.active = true;
                this.index.string = "";
            }
            else if (data.rank == 2) {
                this.icon2.active = true;
                this.index.string = "";
            }
            else if (data.rank == 3) {
                this.icon3.active = true;
                this.index.string = "";
            }
            else {
                this.icon1.active = false;
                this.icon2.active = false;
                this.icon3.active = false;
                this.index.string = data.rank;
            }
            this.bg.active = data.userId === User_1.User._userID;
            this.bg2.active = !this.bg.active;
            this.uname.string = UtilMgr_1.UtilMgr.setString(data.nickname);
            this.gold.string = UtilMgr_1.UtilMgr.changeMoney(data.winGold, true, true);
            this.reward.string = UtilMgr_1.UtilMgr.changeMoney(data.reward);
            this.reward.node.color = new cc.Color().fromHEX(data.rank <= 3 ? "#7DFFFD" : "#00FF66");
            this.reward.fontSize = data.rank <= 3 ? 30 : 24;
            UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImg, data.userId, this.view);
        }
    }
};
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "index", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "reward", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "gold", void 0);
__decorate([
    property(cc.Sprite)
], LeaderBoardItem.prototype, "head", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "icon3", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "bg", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "bg2", void 0);
__decorate([
    property(UIView_1.default)
], LeaderBoardItem.prototype, "view", void 0);
LeaderBoardItem = __decorate([
    ccclass
], LeaderBoardItem);
exports.default = LeaderBoardItem;

cc._RF.pop();