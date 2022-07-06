"use strict";
cc._RF.push(module, '13536v22VlDupRHYmhYs8hU', 'WingoColorItem');
// games/wingo/script/view/WingoColorItem.ts

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
const { ccclass, property } = cc._decorator;
let WingoColorItem = class WingoColorItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labIssue = null;
        this.labHarga = null;
        this.labNum = null;
        this.nodColor = null;
        this.pfbWingoColorGroupItemList = [];
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
        this.labIssue.string = "";
        this.labHarga.string = "";
        this.labNum.string = "";
        this.initColor();
    }
    initColor() {
        this.nodColor.removeAllChildren();
    }
    setIssue(issue) {
        this.labIssue.string = issue.toString();
    }
    setNum(num) {
        this.labNum.string = num.toString();
    }
    setHarga(harga) {
        this.labHarga.string = harga.toString();
    }
    setColor(num) {
        this.nodColor.addChild(cc.instantiate(this.pfbWingoColorGroupItemList[num]));
    }
    onShow(data) {
        this._data = data;
        this.initUI();
        this.setIssue(Number(data.Issue));
        this.setHarga(data.Harga);
        this.setNum(data.Num);
        this.setColor(data.Num);
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Label)
], WingoColorItem.prototype, "labIssue", void 0);
__decorate([
    property(cc.Label)
], WingoColorItem.prototype, "labHarga", void 0);
__decorate([
    property(cc.Label)
], WingoColorItem.prototype, "labNum", void 0);
__decorate([
    property(cc.Node)
], WingoColorItem.prototype, "nodColor", void 0);
__decorate([
    property([cc.Prefab])
], WingoColorItem.prototype, "pfbWingoColorGroupItemList", void 0);
WingoColorItem = __decorate([
    ccclass
], WingoColorItem);
exports.default = WingoColorItem;

cc._RF.pop();