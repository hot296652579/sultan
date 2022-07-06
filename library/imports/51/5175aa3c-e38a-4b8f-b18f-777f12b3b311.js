"use strict";
cc._RF.push(module, '5175ao844pLj7GPd38Ss7MR', 'BankItemView');
// script/wallet/BankItemView.ts

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
let BankItemView = class BankItemView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.gouNode = null;
        this.BankIcon = null;
        this.BankName = null;
        this.choosed = null;
        this.choosedImg = null;
        this.iconHot = null;
        this._itemClickCallback = null;
        this._itemId = 0;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    updateItem(data, itemId, onClickCallback, parent) {
        // this.gold.string = UtilMgr.changeMoney(data.gold);
        // UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
        this._itemId = itemId;
        this.parent = parent;
        this._itemClickCallback = onClickCallback;
        this.updateData(data);
    }
    onItemClick(event, type) {
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId, this.parent);
        }
    }
    updateData(data) {
        this.BankName.string = data.bankCode;
    }
    onClick(event) {
        console.log(event);
    }
};
__decorate([
    property(cc.Node)
], BankItemView.prototype, "gouNode", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "BankIcon", void 0);
__decorate([
    property(cc.Label)
], BankItemView.prototype, "BankName", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "choosed", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "choosedImg", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "iconHot", void 0);
BankItemView = __decorate([
    ccclass
], BankItemView);
exports.default = BankItemView;

cc._RF.pop();