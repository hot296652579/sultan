
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/withdrawal/SetSecondaryPwdView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2fe468cuKBGbZEfWEhetJ27', 'SetSecondaryPwdView');
// script/withdrawal/SetSecondaryPwdView.ts

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
exports.SettSecondaryPwdType = void 0;
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const SendVerificationCodePlus_1 = __importDefault(require("../common/component/SendVerificationCodePlus"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const SendVerificationCode_1 = require("../common/component/SendVerificationCode");
const { ccclass, property } = cc._decorator;
var SettSecondaryPwdType;
(function (SettSecondaryPwdType) {
    SettSecondaryPwdType[SettSecondaryPwdType["set"] = 0] = "set";
    SettSecondaryPwdType[SettSecondaryPwdType["reset"] = 1] = "reset";
})(SettSecondaryPwdType = exports.SettSecondaryPwdType || (exports.SettSecondaryPwdType = {}));
let SetSecondaryPwdView = class SetSecondaryPwdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.service = null;
        this.verCodeEditbox = null;
        this.pwdEditbox = null;
        this.pwdEditboxConfirm = null;
        this.titlesNode = null;
        this.lbl_restPhoneTips = null;
        this.sendVerificationCode = null;
        this.passwordType = SettSecondaryPwdType.set;
    }
    static getPrefabUrl() {
        return "withdrawal/prefabs/SetSecondaryPwdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.initLanguage();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD), this.toSetPwdRes);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD), this.tochangePwdRes);
    }
    show(args) {
        let type = args[0];
        this.showWithAction(true);
        this.initView(type);
        this.lbl_restPhoneTips.string = LanguageImpl_1.i18n.ACCOUNT_LOGIN.SEND_CODE_TO_PHONE + " " + UtilMgr_1.UtilMgr.setStringCover(User_1.User._phone);
        this.sendVerificationCode.setVerificationCodeType(SendVerificationCode_1.VerificationCodeType.resetPwd);
    }
    initLanguage() {
        this.pwdEditbox.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD;
        this.verCodeEditbox.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.VER_CODE;
        this.pwdEditboxConfirm.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD_CONFIRM;
    }
    initView(type) {
        this.passwordType = type;
        var titleName = 'resetPwd';
        switch (type) {
            case SettSecondaryPwdType.set:
                titleName = 'setPwd';
                break;
            case SettSecondaryPwdType.reset:
                break;
        }
        this.titlesNode.children.forEach(nd => {
            nd.active = nd.name == titleName;
        });
    }
    onClick(name) {
        switch (name) {
            case "getCode":
                this.sendAccVerification();
                break;
            case "close":
                this.closeWithAction();
                break;
            case "conirm":
                if (this.passwordType == SettSecondaryPwdType.set) {
                    this.toSetPwd();
                }
                else {
                    this.toFoegetOrResetPwd();
                }
                break;
        }
    }
    toSetPwd() {
        let code = this.verCodeEditbox.string;
        if (!code)
            return PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.VERIFINULL);
        let passwd = this.checkPwd();
        if (!passwd)
            return;
        let req = CommonService_1.protoPackage.hall.SetSecondPasswdReq.create({ passwd: base64Encrypt(passwd), code: parseInt(code) });
        let buffer = CommonService_1.protoPackage.hall.SetSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD, buffer);
    }
    toFoegetOrResetPwd() {
        let code = this.verCodeEditbox.string;
        if (!code)
            return PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.VERIFINULL);
        let passwd = this.checkPwd();
        if (!passwd)
            return;
        let req = CommonService_1.protoPackage.hall.ChangeSecondPasswdReq.create({ passwd: base64Encrypt(passwd), code: parseInt(code) });
        let buffer = CommonService_1.protoPackage.hall.ChangeSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD, buffer);
    }
    toSetPwdRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.SUCCEEDED);
            this.close();
            User_1.User.piggyBank = true;
            // dispatch('openWithdrawalView')
        }
        else {
            G.Logger.warn("toSetPwdRes:", data);
            PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    tochangePwdRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.SUCCEEDED);
            this.close();
        }
        else {
            G.Logger.warn("tochangePwdRes:", data);
            PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    // 验证码检查
    checkVerification(verif) {
        if (!verif) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.VERIFINULL);
            return null;
        }
        return verif;
    }
    checkPwd() {
        let passwd = this.pwdEditbox.string;
        let passwdConfi = this.pwdEditboxConfirm.string;
        if (passwd == '' || passwdConfi == '') {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.ERROR.EMPTY_PWD);
            return "";
        }
        if (passwd != passwdConfi) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.ERROR.TWO_PWD_DISACCORD);
            return "";
        }
        return passwd;
    }
    checkPhone(phone) {
        if (!phone) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.PHONENULL);
            return null;
        }
        if (phone.length < 7) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.PHONETYPEERR);
            return null;
        }
        return phone;
    }
    sendAccVerification() {
        // this.sendVerificationCode.doSendVerificationCode({ phone: User._phone, areaCode: User._areaCode ,type:1});
        this.sendVerificationCode.doSendVerificationCode({ phone: User_1.User._phone, areaCode: User_1.User._areaCode });
    }
};
__decorate([
    property(cc.EditBox)
], SetSecondaryPwdView.prototype, "verCodeEditbox", void 0);
__decorate([
    property(cc.EditBox)
], SetSecondaryPwdView.prototype, "pwdEditbox", void 0);
__decorate([
    property(cc.EditBox)
], SetSecondaryPwdView.prototype, "pwdEditboxConfirm", void 0);
__decorate([
    property(cc.Node)
], SetSecondaryPwdView.prototype, "titlesNode", void 0);
__decorate([
    property(cc.Label)
], SetSecondaryPwdView.prototype, "lbl_restPhoneTips", void 0);
__decorate([
    property(SendVerificationCodePlus_1.default)
], SetSecondaryPwdView.prototype, "sendVerificationCode", void 0);
SetSecondaryPwdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], SetSecondaryPwdView);
exports.default = SetSecondaryPwdView;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2l0aGRyYXdhbC9TZXRTZWNvbmRhcnlQd2RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUE0QztBQUM1Qyw0R0FBb0Y7QUFDcEYsa0VBQXVEO0FBQ3ZELG9FQUE0QztBQUM1QywrREFBdUU7QUFDdkUsNkRBQTBEO0FBQzFELGtFQUEyRTtBQUUzRSx5Q0FBc0M7QUFDdEMsK0NBQTRDO0FBQzVDLG1GQUFnRjtBQUVoRixNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMsSUFBWSxvQkFHWDtBQUhELFdBQVksb0JBQW9CO0lBQzVCLDZEQUFHLENBQUE7SUFDSCxpRUFBSyxDQUFBO0FBQ1QsQ0FBQyxFQUhXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBRy9CO0FBSUQsSUFBcUIsbUJBQW1CLEdBQXhDLE1BQXFCLG1CQUFvQixTQUFRLGdCQUFNO0lBQXZEOztRQUNJLFlBQU8sR0FBaUIsSUFBSSxDQUFDO1FBRzdCLG1CQUFjLEdBQWUsSUFBSSxDQUFDO1FBR2xDLGVBQVUsR0FBZSxJQUFJLENBQUM7UUFHOUIsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBR3JDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0Isc0JBQWlCLEdBQWEsSUFBSSxDQUFDO1FBSW5DLHlCQUFvQixHQUE2QixJQUFJLENBQUM7UUFDdEQsaUJBQVksR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7SUE4STVDLENBQUM7SUE1SVUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyx3Q0FBd0MsQ0FBQztJQUNwRCxDQUFDO0lBQ0QsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7UUFD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LG1CQUFtQjtRQUNmLDZHQUE2RztRQUM3RyxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDdkcsQ0FBQztDQUVKLENBQUE7QUEvSkc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzsyREFDYTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3VEQUNTO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7OERBQ2dCO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1M7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4REFDZ0I7QUFJbkM7SUFEQyxRQUFRLENBQUMsa0NBQXdCLENBQUM7aUVBQ21CO0FBcEJyQyxtQkFBbUI7SUFGdkMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsbUJBQW1CLENBbUt2QztrQkFuS29CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IFNlbmRWZXJpZmljYXRpb25Db2RlUGx1cyBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TZW5kVmVyaWZpY2F0aW9uQ29kZVBsdXNcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IHsgVmVyaWZpY2F0aW9uQ29kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TZW5kVmVyaWZpY2F0aW9uQ29kZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBTZXR0U2Vjb25kYXJ5UHdkVHlwZSB7XG4gICAgc2V0LFxuICAgIHJlc2V0LFxufVxuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0U2Vjb25kYXJ5UHdkVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT57XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHZlckNvZGVFZGl0Ym94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHB3ZEVkaXRib3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcHdkRWRpdGJveENvbmZpcm06IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdGl0bGVzTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJsX3Jlc3RQaG9uZVRpcHM6IGNjLkxhYmVsID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KFNlbmRWZXJpZmljYXRpb25Db2RlUGx1cylcbiAgICBzZW5kVmVyaWZpY2F0aW9uQ29kZTogU2VuZFZlcmlmaWNhdGlvbkNvZGVQbHVzID0gbnVsbDtcbiAgICBwYXNzd29yZFR5cGUgPSBTZXR0U2Vjb25kYXJ5UHdkVHlwZS5zZXQ7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwid2l0aGRyYXdhbC9wcmVmYWJzL1NldFNlY29uZGFyeVB3ZFZpZXdcIjtcbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50JylcbiAgICAgICAgdGhpcy5pbml0TGFuZ3VhZ2UoKVxuICAgIH1cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1NFVF9TRUNPTkRfUEFTU1dPUkQpLCB0aGlzLnRvU2V0UHdkUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ0hBTkdFX1NFQ09ORF9QQVNTV0QpLCB0aGlzLnRvY2hhbmdlUHdkUmVzKTtcbiAgICB9XG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIGxldCB0eXBlID0gYXJnc1swXTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKVxuICAgICAgICB0aGlzLmluaXRWaWV3KHR5cGUpXG4gICAgICAgIHRoaXMubGJsX3Jlc3RQaG9uZVRpcHMuc3RyaW5nID0gaTE4bi5BQ0NPVU5UX0xPR0lOLlNFTkRfQ09ERV9UT19QSE9ORSArIFwiIFwiICsgVXRpbE1nci5zZXRTdHJpbmdDb3ZlcihVc2VyLl9waG9uZSk7XG4gICAgICAgIHRoaXMuc2VuZFZlcmlmaWNhdGlvbkNvZGUuc2V0VmVyaWZpY2F0aW9uQ29kZVR5cGUoVmVyaWZpY2F0aW9uQ29kZVR5cGUucmVzZXRQd2QpXG4gICAgfVxuICAgIGluaXRMYW5ndWFnZSgpIHtcbiAgICAgICAgdGhpcy5wd2RFZGl0Ym94LnBsYWNlaG9sZGVyID0gaTE4bi5BQ0NPVU5UX0xPR0lOLlBBTENFX0hPTERFUi5QQVNTV09SRDtcbiAgICAgICAgdGhpcy52ZXJDb2RlRWRpdGJveC5wbGFjZWhvbGRlciA9IGkxOG4uQUNDT1VOVF9MT0dJTi5QQUxDRV9IT0xERVIuVkVSX0NPREU7XG4gICAgICAgIHRoaXMucHdkRWRpdGJveENvbmZpcm0ucGxhY2Vob2xkZXIgPSBpMThuLkFDQ09VTlRfTE9HSU4uUEFMQ0VfSE9MREVSLlBBU1NXT1JEX0NPTkZJUk07XG4gICAgfVxuICAgIGluaXRWaWV3KHR5cGUpIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZFR5cGUgPSB0eXBlO1xuICAgICAgICB2YXIgdGl0bGVOYW1lID0gJ3Jlc2V0UHdkJztcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNldHRTZWNvbmRhcnlQd2RUeXBlLnNldDpcbiAgICAgICAgICAgICAgICB0aXRsZU5hbWUgPSAnc2V0UHdkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU2V0dFNlY29uZGFyeVB3ZFR5cGUucmVzZXQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aXRsZXNOb2RlLmNoaWxkcmVuLmZvckVhY2gobmQgPT4ge1xuICAgICAgICAgICAgbmQuYWN0aXZlID0gbmQubmFtZSA9PSB0aXRsZU5hbWU7XG4gICAgICAgIH0pXG4gICAgfVxuIFxuICAgIG9uQ2xpY2sobmFtZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJnZXRDb2RlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kQWNjVmVyaWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNvbmlybVwiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhc3N3b3JkVHlwZSA9PSBTZXR0U2Vjb25kYXJ5UHdkVHlwZS5zZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b1NldFB3ZCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9Gb2VnZXRPclJlc2V0UHdkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgdG9TZXRQd2QoKSB7XG4gICAgICAgIGxldCBjb2RlID0gdGhpcy52ZXJDb2RlRWRpdGJveC5zdHJpbmc7XG4gICAgICAgIGlmICghY29kZSkgcmV0dXJuIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRURJVEJPWC5WRVJJRklOVUxMKTtcbiAgICAgICAgbGV0IHBhc3N3ZCA9IHRoaXMuY2hlY2tQd2QoKTtcbiAgICAgICAgaWYgKCFwYXNzd2QpIHJldHVybjtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlNldFNlY29uZFBhc3N3ZFJlcS5jcmVhdGUoe3Bhc3N3ZDogYmFzZTY0RW5jcnlwdChwYXNzd2QpLGNvZGU6IHBhcnNlSW50KGNvZGUpIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuU2V0U2Vjb25kUGFzc3dkUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfU0VUX1NFQ09ORF9QQVNTV09SRCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuICAgIHRvRm9lZ2V0T3JSZXNldFB3ZCgpIHtcblxuICAgICAgICBsZXQgY29kZSA9IHRoaXMudmVyQ29kZUVkaXRib3guc3RyaW5nO1xuICAgICAgICBpZiAoIWNvZGUpIHJldHVybiBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVESVRCT1guVkVSSUZJTlVMTCk7XG4gICAgICAgIGxldCBwYXNzd2QgPSB0aGlzLmNoZWNrUHdkKCk7XG4gICAgICAgIGlmICghcGFzc3dkKSByZXR1cm47XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5DaGFuZ2VTZWNvbmRQYXNzd2RSZXEuY3JlYXRlKHtwYXNzd2Q6IGJhc2U2NEVuY3J5cHQocGFzc3dkKSxjb2RlOiBwYXJzZUludChjb2RlKSB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLkNoYW5nZVNlY29uZFBhc3N3ZFJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0NIQU5HRV9TRUNPTkRfUEFTU1dELFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG4gICAgdG9TZXRQd2RSZXMoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uQUNDT1VOVF9MT0dJTi5TVUNDRUVERUQpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpXG4gICAgICAgICAgICBVc2VyLnBpZ2d5QmFuayA9IHRydWVcbiAgICAgICAgICAgIC8vIGRpc3BhdGNoKCdvcGVuV2l0aGRyYXdhbFZpZXcnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRy5Mb2dnZXIud2FybihcInRvU2V0UHdkUmVzOlwiLCBkYXRhKVxuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIGkxOG4uRVJST1JDT0RFW2RhdGEuc3RhdHVzTXNnLnN0YXR1c10gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2NoYW5nZVB3ZFJlcyhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5BQ0NPVU5UX0xPR0lOLlNVQ0NFRURFRCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLndhcm4oXCJ0b2NoYW5nZVB3ZFJlczpcIiwgZGF0YSlcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBpMThuLkVSUk9SQ09ERVtkYXRhLnN0YXR1c01zZy5zdGF0dXNdICk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvLyDpqozor4HnoIHmo4Dmn6VcbiAgICBjaGVja1ZlcmlmaWNhdGlvbih2ZXJpZikge1xuICAgICAgICBpZiAoIXZlcmlmKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVESVRCT1guVkVSSUZJTlVMTCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVyaWY7XG4gICAgfVxuICAgIGNoZWNrUHdkKCkge1xuICAgICAgICBsZXQgcGFzc3dkID0gdGhpcy5wd2RFZGl0Ym94LnN0cmluZztcbiAgICAgICAgbGV0IHBhc3N3ZENvbmZpID0gdGhpcy5wd2RFZGl0Ym94Q29uZmlybS5zdHJpbmc7XG4gICAgICAgIGlmIChwYXNzd2QgPT0gJycgfHwgcGFzc3dkQ29uZmkgPT0gJycpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uQUNDT1VOVF9MT0dJTi5FUlJPUi5FTVBUWV9QV0QpXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXNzd2QgIT0gcGFzc3dkQ29uZmkpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uQUNDT1VOVF9MT0dJTi5FUlJPUi5UV09fUFdEX0RJU0FDQ09SRClcbiAgICAgICAgICAgIHJldHVybiBcIlwiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhc3N3ZFxuXG4gICAgfVxuICAgIGNoZWNrUGhvbmUocGhvbmUpIHtcbiAgICAgICAgaWYgKCFwaG9uZSkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FRElUQk9YLlBIT05FTlVMTCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGhvbmUubGVuZ3RoIDwgNykge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FRElUQk9YLlBIT05FVFlQRUVSUik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGhvbmU7XG4gICAgfVxuICAgIHNlbmRBY2NWZXJpZmljYXRpb24oKSB7XG4gICAgICAgIC8vIHRoaXMuc2VuZFZlcmlmaWNhdGlvbkNvZGUuZG9TZW5kVmVyaWZpY2F0aW9uQ29kZSh7IHBob25lOiBVc2VyLl9waG9uZSwgYXJlYUNvZGU6IFVzZXIuX2FyZWFDb2RlICx0eXBlOjF9KTtcbiAgICAgICAgdGhpcy5zZW5kVmVyaWZpY2F0aW9uQ29kZS5kb1NlbmRWZXJpZmljYXRpb25Db2RlKHsgcGhvbmU6IFVzZXIuX3Bob25lLCBhcmVhQ29kZTogVXNlci5fYXJlYUNvZGUgfSk7XG4gICAgfVxuICAgXG59XG4iXX0=