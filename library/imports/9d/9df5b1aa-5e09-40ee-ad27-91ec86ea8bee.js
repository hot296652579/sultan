"use strict";
cc._RF.push(module, '9df5bGqXglA7q0nkeyG6ovu', 'SecondaryPwdView');
// script/withdrawal/SecondaryPwdView.ts

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
exports.CheckSecondaryPwdType = void 0;
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const SetSecondaryPwdView_1 = require("./SetSecondaryPwdView");
const { ccclass, property } = cc._decorator;
var CheckSecondaryPwdType;
(function (CheckSecondaryPwdType) {
    CheckSecondaryPwdType[CheckSecondaryPwdType["getPwq"] = 0] = "getPwq";
    CheckSecondaryPwdType[CheckSecondaryPwdType["checkSuccCall"] = 1] = "checkSuccCall"; //验证成功后回调
})(CheckSecondaryPwdType = exports.CheckSecondaryPwdType || (exports.CheckSecondaryPwdType = {}));
let SecondaryPwdView = class SecondaryPwdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.service = null;
        this.pwdEditbox = null;
    }
    static getPrefabUrl() {
        return "withdrawal/prefabs/SecondaryPwdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.initLanguage();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD), this.toCheckPwdRes);
    }
    //args= [ [CheckPwdType,callfun] ]
    show(args) {
        super.show(args[0]);
        this.showWithAction(true);
    }
    initLanguage() {
        this.pwdEditbox.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD;
    }
    onClick(name) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "FoegetPassword":
                dispatch('openSetSecondaryPwdView', SetSecondaryPwdView_1.SettSecondaryPwdType.reset);
                break;
            case "confirm":
                this.toCheckPwd();
                break;
        }
    }
    toCheckPwd() {
        let passwd = this.checkPwd();
        if (!passwd)
            return;
        switch (this.args[0]) {
            case CheckSecondaryPwdType.getPwq:
                this.args[1] && this.args[1](passwd);
                this.close();
                break;
            case CheckSecondaryPwdType.checkSuccCall:
                this.toCheckReq(passwd);
                break;
        }
    }
    toCheckReq(passwd) {
        let req = CommonService_1.protoPackage.hall.CheckSecondPasswdReq.create({ passwd: passwd });
        let buffer = CommonService_1.protoPackage.hall.CheckSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD, buffer);
    }
    checkPwd() {
        let passwd = this.pwdEditbox.string;
        if (passwd == '') {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.ERROR.EMPTY_PWD);
            return "";
        }
        return passwd;
    }
    toCheckPwdRes(data) {
        if (data.statusMsg.status == 0) {
            this.close();
            this.args[1] && this.args[1]();
        }
        else {
            PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
};
__decorate([
    property(cc.EditBox)
], SecondaryPwdView.prototype, "pwdEditbox", void 0);
SecondaryPwdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], SecondaryPwdView);
exports.default = SecondaryPwdView;

cc._RF.pop();