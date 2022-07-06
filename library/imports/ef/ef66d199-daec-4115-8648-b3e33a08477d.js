"use strict";
cc._RF.push(module, 'ef66dGZ2uxBFYZIs+M6CEd9', 'GiveGoldNotiPanel');
// script/MultiCurrency/GiveGoldNotiPanel.ts

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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let GiveGoldNotiPanel = class GiveGoldNotiPanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lbl_content = null;
        this.lbl_count = null;
    }
    static getPrefabUrl() {
        return "MultiCurrency/prefabs/GiveGoldNotiPanel";
    }
    show(args) {
        let data = args[0];
        this.content = this.node.getChildByName("content");
        this.showWithAction(true);
        this.lbl_content.string = String.format(LanguageImpl_1.i18n.EXPERIENCE_FIELD.GiveGold, UtilMgr_1.UtilMgr.changeMoney(data.reliefGold));
        this.lbl_count.string = String.format(LanguageImpl_1.i18n.EXPERIENCE_FIELD.residueCount, data.remainCount);
    }
    onClick() {
        this.closeWithAction();
    }
};
__decorate([
    property(cc.Label)
], GiveGoldNotiPanel.prototype, "lbl_content", void 0);
__decorate([
    property(cc.Label)
], GiveGoldNotiPanel.prototype, "lbl_count", void 0);
GiveGoldNotiPanel = __decorate([
    ccclass
], GiveGoldNotiPanel);
exports.default = GiveGoldNotiPanel;

cc._RF.pop();