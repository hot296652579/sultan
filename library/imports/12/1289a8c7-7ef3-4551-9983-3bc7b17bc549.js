"use strict";
cc._RF.push(module, '1289ajHfvNFUZmDO8exe8VJ', 'HintRechargePanel');
// script/MultiCurrency/HintRechargePanel.ts

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
const User_1 = require("../global/User");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Defines_1 = require("../framework/base/Defines");
const { ccclass, property } = cc._decorator;
let HintRechargePanel = class HintRechargePanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lbl_god = null;
        this.lbl_hit = null;
    }
    static getPrefabUrl() {
        return "MultiCurrency/prefabs/HintRechargePanel";
    }
    show(args) {
        let goldTypeExchange = args[0];
        this.scheduleOnce(this.close, 3);
        this.lbl_god.string = UtilMgr_1.UtilMgr.changeMoney(User_1.User._gold);
        this.lbl_hit.string = goldTypeExchange == 1 ? LanguageImpl_1.i18n.EXPERIENCE_FIELD.hintRecharge : LanguageImpl_1.i18n.EXPERIENCE_FIELD.hintChipCount;
    }
    playDefaultEffect(name = "") {
        switch (name) {
            case 'shop':
            case 'addGold':
                this.audioHelper.playEffect("common/audio/RechargeBtn", Defines_1.BUNDLE_RESOURCES);
                break;
            default:
                super.playDefaultEffect(name);
                break;
        }
    }
    onClick(name) {
        switch (name) {
            case "continue":
                break;
            case "addGold":
                dispatch("openRechargeView");
                break;
        }
        this.close();
    }
};
__decorate([
    property(cc.Label)
], HintRechargePanel.prototype, "lbl_god", void 0);
__decorate([
    property(cc.Label)
], HintRechargePanel.prototype, "lbl_hit", void 0);
HintRechargePanel = __decorate([
    ccclass
], HintRechargePanel);
exports.default = HintRechargePanel;

cc._RF.pop();