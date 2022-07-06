"use strict";
cc._RF.push(module, '6ed53RvR5ZNSprTJKWAQk60', 'WingoLinkItem');
// games/wingo/script/view/WingoLinkItem.ts

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
let WingoLinkItem = class WingoLinkItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labIssue = null;
        this.latNum = null;
        this.spfNum = [];
        this.spfDarkNum = null;
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
        this.initColor();
    }
    initColor() {
        for (let v of this.latNum.node.children) {
            v.getComponent(cc.Sprite).spriteFrame = this.spfDarkNum;
        }
    }
    setIssue(issue) {
        this.labIssue.string = issue.toString();
    }
    setColor(num) {
        let imgNum = this.latNum.node.getChildByName(`imgNum${num}`).getComponent(cc.Sprite);
        imgNum.spriteFrame = this.spfNum[num];
    }
    onShow(data) {
        this._data = data;
        this.initUI();
        this.setIssue(Number(data.Issue));
        this.setColor(data.Num);
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Label)
], WingoLinkItem.prototype, "labIssue", void 0);
__decorate([
    property(cc.Layout)
], WingoLinkItem.prototype, "latNum", void 0);
__decorate([
    property([cc.SpriteFrame])
], WingoLinkItem.prototype, "spfNum", void 0);
__decorate([
    property(cc.SpriteFrame)
], WingoLinkItem.prototype, "spfDarkNum", void 0);
WingoLinkItem = __decorate([
    ccclass
], WingoLinkItem);
exports.default = WingoLinkItem;

cc._RF.pop();