"use strict";
cc._RF.push(module, '07297ZAMlNHPLrhA+2VvaCP', 'PBSettingPasswdView');
// script/piggyBank/PBSettingPasswdView.ts

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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const PBPasswdComponent_1 = __importDefault(require("./PBPasswdComponent"));
const PiggyBankView_1 = __importDefault(require("./PiggyBankView"));
const { ccclass, property } = cc._decorator;
const MAX_DIGIT = 6;
let PBSettingPasswdView = class PBSettingPasswdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.edbPasswd1 = null;
        this.edbPasswd2 = null;
        this.edbComponent1 = null;
        this.edbComponent2 = null;
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBSettingPasswdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
        this.initView();
    }
    start() {
    }
    initView() {
        this.edbComponent1 = this.edbPasswd1.getComponent(PBPasswdComponent_1.default);
        this.edbComponent2 = this.edbPasswd2.getComponent(PBPasswdComponent_1.default);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SETTING_PASSWD), this.onSettingPasswd);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TOTAL_AMOUNT), this.onTotalAmount);
    }
    show() {
        super.show();
        this.showWithAction(true);
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
    onClickOK() {
        this.playDefaultEffect();
        if (!this.isPasswordSame()) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.INCONSISTENT_PASSWORD);
            return;
        }
        if (!this.isPasswordDigit()) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }
        let req = CommonService_1.protoPackage.hall.SettingPasswdReq.create({ passwd: this.edbComponent1.string });
        let buffer = CommonService_1.protoPackage.hall.SettingPasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SETTING_PASSWD, buffer);
    }
    onSettingPasswd(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        User_1.User.piggyBank = true;
        this.close();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TOTAL_AMOUNT, null);
    }
    onTotalAmount(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        Manager_1.Manager.uiManager.open({ type: PiggyBankView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: data });
    }
    /**
     * 是否密码一致
     * @return {boolean}
     */
    isPasswordSame() {
        return this.edbComponent1.string === this.edbComponent2.string;
    }
    /**
     * 是否6满足位数
     */
    isPasswordDigit() {
        let str1 = this.edbComponent1.string;
        if (str1.length !== MAX_DIGIT) {
            return false;
        }
        let str2 = this.edbComponent2.string;
        if (str2.length !== MAX_DIGIT) {
            return false;
        }
        return true;
    }
};
__decorate([
    property(cc.EditBox)
], PBSettingPasswdView.prototype, "edbPasswd1", void 0);
__decorate([
    property(cc.EditBox)
], PBSettingPasswdView.prototype, "edbPasswd2", void 0);
PBSettingPasswdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBSettingPasswdView);
exports.default = PBSettingPasswdView;

cc._RF.pop();