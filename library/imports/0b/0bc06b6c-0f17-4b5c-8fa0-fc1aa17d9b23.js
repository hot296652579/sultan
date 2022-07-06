"use strict";
cc._RF.push(module, '0bc06tsDxdLXI+g/BqhfZsj', 'RecordItem');
// script/rank/RecordItem.ts

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
let RecordItem = class RecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.rankLabel = null;
        this.icon1 = null;
        this.icon2 = null;
        this.icon3 = null;
        this.periodLabel = null;
        this.winningChipLabel = null;
        this.operateLabel = null;
    }
    onLoad() {
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.rankLabel.string = "";
    }
    updateItem(data) {
        if (data.rank == 1) {
            this.icon1.active = true;
        }
        else if (data.rank == 2) {
            this.icon2.active = true;
        }
        else if (data.rank == 3) {
            this.icon3.active = true;
        }
        else {
            this.icon1.active = false;
            this.icon2.active = false;
            this.icon3.active = false;
            this.rankLabel.string = data.rank;
        }
        this.periodLabel.string = new Date(data.period).format("yy/MM/dd");
        this.winningChipLabel.string = UtilMgr_1.UtilMgr.changeMoney(data.winningChips);
        this.operateLabel.string = UtilMgr_1.UtilMgr.changeMoney(data.reward);
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
], RecordItem.prototype, "rankLabel", void 0);
__decorate([
    property(cc.Node)
], RecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RecordItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Node)
], RecordItem.prototype, "icon3", void 0);
__decorate([
    property(cc.Label)
], RecordItem.prototype, "periodLabel", void 0);
__decorate([
    property(cc.Label)
], RecordItem.prototype, "winningChipLabel", void 0);
__decorate([
    property(cc.Label)
], RecordItem.prototype, "operateLabel", void 0);
RecordItem = __decorate([
    ccclass
], RecordItem);
exports.default = RecordItem;

cc._RF.pop();