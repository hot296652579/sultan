"use strict";
cc._RF.push(module, '92056MyFo9C+b9f4JZHURdd', 'RankItem');
// script/rank/RankItem.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RankItem = class RankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.index = null;
        this.uname = null;
        this.userId = null;
        this.gold = null;
        this.head = null;
        this.icon1 = null;
        this.icon2 = null;
        this.icon3 = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.opacity = 0;
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.index.string = "";
    }
    updateItem(data, itemId) {
        if (data.id == 1) {
            this.icon1.active = true;
        }
        else if (data.id == 2) {
            this.icon2.active = true;
        }
        else if (data.id == 3) {
            this.icon3.active = true;
        }
        else {
            this.icon1.active = false;
            this.icon2.active = false;
            this.icon3.active = false;
            this.index.string = data.id;
        }
        this.uname.string = UtilMgr_1.UtilMgr.setString(data.nickName);
        this.userId.string = data.userId;
        this.gold.string = UtilMgr_1.UtilMgr.changeMoney(data.gold);
        UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Label)
], RankItem.prototype, "index", void 0);
__decorate([
    property(cc.Label)
], RankItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], RankItem.prototype, "userId", void 0);
__decorate([
    property(cc.Label)
], RankItem.prototype, "gold", void 0);
__decorate([
    property(cc.Sprite)
], RankItem.prototype, "head", void 0);
__decorate([
    property(cc.Node)
], RankItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RankItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Node)
], RankItem.prototype, "icon3", void 0);
RankItem = __decorate([
    ccclass
], RankItem);
exports.default = RankItem;

cc._RF.pop();