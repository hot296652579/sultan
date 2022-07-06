"use strict";
cc._RF.push(module, '6a193GeHARJW5t4+R9sL06w', 'MultiCurrencyIconSwitch');
// script/MultiCurrency/MultiCurrencyIconSwitch.ts

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
const Defines_1 = require("../framework/base/Defines");
const User_1 = require("../global/User");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
const _MultiCurrencyIconBaseUrl = 'MultiCurrency/images/icon/gold_';
var GOLD_IMG_TYPE;
(function (GOLD_IMG_TYPE) {
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_White"] = 2] = "Gold_White";
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_Red"] = 3] = "Gold_Red";
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_Hearts"] = 4] = "Gold_Hearts";
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_Tournament"] = 5] = "Gold_Tournament";
})(GOLD_IMG_TYPE || (GOLD_IMG_TYPE = {}));
let MultiCurrencyIconSwitch = class MultiCurrencyIconSwitch extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.real_Gold_Type = GOLD_IMG_TYPE.Gold_White;
        this.sprite = null;
    }
    onLoad() {
        super.onLoad();
        this.sprite = this.node.getComponent(cc.Sprite);
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.toUpdataMultiCurrencyIcon();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("updataMultiCurrencyIcon", this.toUpdataMultiCurrencyIcon);
    }
    toUpdataMultiCurrencyIcon(goldSpriteName = null) {
        this.sprite.spriteFrame = null;
        //icon  0 是筹码 1是金币
        let url;
        if (goldSpriteName == null) {
            url = _MultiCurrencyIconBaseUrl + (User_1.User.isRechargedPlayer ? this.real_Gold_Type : User_1.User._goldType);
        }
        else {
            url = _MultiCurrencyIconBaseUrl + goldSpriteName;
        }
        this.sprite.loadImage({ url: url, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
    }
};
__decorate([
    property({
        tooltip: "Gold_White:白色筹码，Gold_Red：红色筹码，Gold_Hearts：红心筹码",
        type: cc.Enum(GOLD_IMG_TYPE),
    })
], MultiCurrencyIconSwitch.prototype, "real_Gold_Type", void 0);
MultiCurrencyIconSwitch = __decorate([
    ccclass
], MultiCurrencyIconSwitch);
exports.default = MultiCurrencyIconSwitch;

cc._RF.pop();