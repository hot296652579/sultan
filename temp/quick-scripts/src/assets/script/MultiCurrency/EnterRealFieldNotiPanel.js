"use strict";
cc._RF.push(module, 'c95a6CwOV9G0Lls/wuqTq5O', 'EnterRealFieldNotiPanel');
// script/MultiCurrency/EnterRealFieldNotiPanel.ts

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
const Global_1 = require("../global/Global");
const Manager_1 = require("../common/manager/Manager");
const RechargePayView_1 = __importDefault(require("../recharge/RechargePayView"));
const { ccclass, property } = cc._decorator;
let EnterRealFieldNotiPanel = class EnterRealFieldNotiPanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lbl_content = null;
    }
    static getPrefabUrl() {
        return "MultiCurrency/prefabs/EnterRealFieldNotiPanel";
    }
    show() {
        this.content = this.node.getChildByName("content");
        this.showWithAction(true);
        this.lbl_content.string = LanguageImpl_1.i18n.EXPERIENCE_FIELD.enterRealField;
        Manager_1.Manager.uiManager.close(RechargePayView_1.default);
    }
    onClick() {
        // this.closeWithAction();
        Global_1.reStartGame();
    }
};
__decorate([
    property(cc.Label)
], EnterRealFieldNotiPanel.prototype, "lbl_content", void 0);
EnterRealFieldNotiPanel = __decorate([
    ccclass
], EnterRealFieldNotiPanel);
exports.default = EnterRealFieldNotiPanel;

cc._RF.pop();