
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/bindItemView/BindPhoneView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e30aKf/u1MU5cUxtHqVG0t', 'BindPhoneView');
// script/common/bindItemView/BindPhoneView.ts

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
const UserData_1 = __importDefault(require("../../data/UserData"));
const protoc_1 = require("../../framework/external/protoc");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const Validator_1 = __importDefault(require("../../login/Validator"));
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const CountDownCode_1 = __importDefault(require("../component/CountDownCode"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const Manager_1 = require("../manager/Manager");
const LobbyService_1 = require("../net/LobbyService");
const { ccclass, property } = cc._decorator;
let BindPhoneView = class BindPhoneView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labRegister = null;
        this.labFirstRecharge = null;
        this.firstRecharIcon = null;
        this.btnCountDown = null;
        this.phoneEditBox = null;
        this.m_phoneStr = "";
        this.emailEditBox = null;
        this.m_emailStr = "";
        this.codeEditBox = null;
        this.m_codeStr = "";
        // 用户数据
        this._userData = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "common/prefabs/BindPhoneView";
    }
    onLoad() {
        super.onLoad();
        this.bindEvents();
        this.initData();
        this.btnCountDown.active = false;
    }
    start() {
    }
    show(args) {
        // let type = args[0];
        // this.phoneEditBox.node.active = type == 'BindPhone';
        // this.emailEditBox.node.active = type == 'BindEmail';
        this.requestGetRewardConfig();
    }
    bindEvents() {
        this.emailEditBox.node.on("editing-did-began", this.onEmailBegan, this);
        this.emailEditBox.node.on("editing-did-ended", this.onEmailEnded, this);
        this.emailEditBox.node.on("editing-return", this.onEmailEnded, this);
        this.emailEditBox.node.on("text-changed", this.onEmailChanged, this);
        this.codeEditBox.node.on("editing-did-began", this.onCodeBegan, this);
        this.codeEditBox.node.on("editing-did-ended", this.onCodeEnded, this);
        this.codeEditBox.node.on("editing-return", this.onCodeEnded, this);
        this.codeEditBox.node.on("text-changed", this.onCodeChanged, this);
        this.phoneEditBox.node.on("editing-did-began", this.onPhoneBegan, this);
        this.phoneEditBox.node.on("editing-did-ended", this.onPhoneEnded, this);
        this.phoneEditBox.node.on("editing-return", this.onPhoneEnded, this);
        this.phoneEditBox.node.on("text-changed", this.onPhoneChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("Event_S2C_BindPhone", this.onEvent_S2C_BindPhone);
        this.registerEvent("Event_S2C_GetRegisterRewordConfig", this.onEvent_S2C_GetRegisterRewordConfig);
        //Event_S2C_GetCheckCode
        this.registerEvent("Event_S2C_GetCheckCode", this.onEvent_S2C_GetCheckCode);
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    requestGetRewardConfig() {
        let req = protoc_1.MST.C2S_GetRegisterRewardConfig.create({
            serial: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2S_GetRegisterRewardConfig.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetRegisterRewardConfig, protoc_1.MST.OuterOpcode_Lobby.C2S_GetRegisterRewardConfig, buffer);
    }
    onEmailBegan(target) {
        this.emailEditBox.string = this.m_emailStr;
    }
    onEmailEnded(target) {
        if (this.m_emailStr.length <= 0) {
            return;
        }
        this.emailEditBox.string = this.m_emailStr;
    }
    onEmailChanged(content) {
        this.m_emailStr = content.string;
    }
    onCodeBegan(target) {
        this.codeEditBox.string = this.m_codeStr;
    }
    onCodeEnded(target) {
        if (this.m_codeStr.length <= 0) {
            return;
        }
        this.codeEditBox.string = this.m_codeStr;
    }
    onCodeChanged(content) {
        this.m_codeStr = content.string;
    }
    onPhoneBegan(target) {
        this.phoneEditBox.string = this.m_phoneStr;
    }
    onPhoneEnded(target) {
        if (this.m_phoneStr.length <= 0) {
            return;
        }
        this.phoneEditBox.string = this.m_phoneStr;
    }
    onPhoneChanged(content) {
        this.m_phoneStr = content.string;
    }
    onClick(name) {
        switch (name) {
            case "btnClose":
                this.close();
                break;
            case "btnBind":
                this.clickBtnBind();
                break;
            case 'btnGetCode':
                this.clickGetCode();
                break;
        }
    }
    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode_1.default);
        common._doStartTime();
    }
    clickGetCode() {
        let validator = new Validator_1.default();
        let username = this.m_phoneStr;
        validator.add(username, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILINFORMATIONEMPTY
            }]);
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.startCountDown();
        let req = protoc_1.MST.C2S_GetCheckCode.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = protoc_1.MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetCheckCode, protoc_1.MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }
    clickBtnBind() {
        let username = this.m_phoneStr;
        let validator = new Validator_1.default();
        let Code = this.m_codeStr;
        validator.add(Code, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.CODEINFORMATIONEMPTY
            }]);
        validator.add(username, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILINFORMATIONEMPTY
            }]);
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.requestBindPhone();
    }
    requestBindPhone() {
        let phoneNo = this.m_phoneStr;
        let checkCode = this.m_codeStr;
        let req = protoc_1.MST.C2S_BindPhone.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            phoneNo,
            checkCode
        });
        let buffer = protoc_1.MST.C2S_BindPhone.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_BindPhone, protoc_1.MST.OuterOpcode_Lobby.C2S_BindPhone, buffer);
    }
    onEvent_S2C_BindPhone() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.BINDSUCCESS);
        this.close();
    }
    onEvent_S2C_GetRegisterRewordConfig(data) {
        if (!data.firstDepositReward || !data.chips)
            return;
        this.labFirstRecharge.string = `+${data.chips}%`;
        this.labRegister.string = `+Rp ${data.firstDepositReward}`;
        let getFirstDeposit = data.isGetFirstDepositReward;
        let depositDone = this.firstRecharIcon.getChildByName('done');
        depositDone.active = getFirstDeposit;
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SENDCHECK);
    }
};
__decorate([
    property(cc.Label)
], BindPhoneView.prototype, "labRegister", void 0);
__decorate([
    property(cc.Label)
], BindPhoneView.prototype, "labFirstRecharge", void 0);
__decorate([
    property(cc.Node)
], BindPhoneView.prototype, "firstRecharIcon", void 0);
__decorate([
    property(cc.Node)
], BindPhoneView.prototype, "btnCountDown", void 0);
__decorate([
    property(cc.EditBox)
], BindPhoneView.prototype, "phoneEditBox", void 0);
__decorate([
    property(cc.EditBox)
], BindPhoneView.prototype, "emailEditBox", void 0);
__decorate([
    property(cc.EditBox)
], BindPhoneView.prototype, "codeEditBox", void 0);
BindPhoneView = __decorate([
    ccclass
], BindPhoneView);
exports.default = BindPhoneView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2JpbmRJdGVtVmlldy9CaW5kUGhvbmVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQTJDO0FBRzNDLDREQUFzRDtBQUN0RCx1RUFBK0M7QUFHL0Msc0VBQThDO0FBQzlDLHVFQUErQztBQUMvQywrRUFBdUQ7QUFDdkQsMkRBQWdEO0FBQ2hELGdEQUE2QztBQUM3QyxzREFBbUQ7QUFHbkQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLGdCQUFNO0lBQWpEOztRQU9JLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLHFCQUFnQixHQUFhLElBQUksQ0FBQztRQUVsQyxvQkFBZSxHQUFZLElBQUksQ0FBQztRQUdoQyxpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBWSxHQUFlLElBQUksQ0FBQztRQUNoQyxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBR3hCLGlCQUFZLEdBQWUsSUFBSSxDQUFDO1FBQ2hDLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFHeEIsZ0JBQVcsR0FBZSxJQUFJLENBQUM7UUFDL0IsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixPQUFPO1FBQ0MsY0FBUyxHQUFhLElBQUksQ0FBQztRQTRNbkMsaUJBQWlCO0lBQ3JCLENBQUM7SUF2T1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw4QkFBOEIsQ0FBQztJQUMxQyxDQUFDO0lBMEJELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lB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ZSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3QkFBd0I7UUFDcEIsbUJBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUdKLENBQUE7QUFsT0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDVTtBQUU3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUNlO0FBRWxDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ2M7QUFHaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDVztBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO21EQUNXO0FBSWhDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7bURBQ1c7QUFJaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztrREFDVTtBQXpCZCxhQUFhO0lBRGpDLE9BQU87R0FDYSxhQUFhLENBeU9qQztrQkF6T29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBMb2dpbk5ld1ZpZXcgZnJvbSBcIi4uLy4uL2xvZ2luL0xvZ2luTmV3Vmlld1wiO1xuaW1wb3J0IFZhbGlkYXRvciBmcm9tIFwiLi4vLi4vbG9naW4vVmFsaWRhdG9yXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgQ291bnREb3duQ29kZSBmcm9tIFwiLi4vY29tcG9uZW50L0NvdW50RG93bkNvZGVcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vdXRpbHMvTnVtYmVyVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmRQaG9uZVZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiY29tbW9uL3ByZWZhYnMvQmluZFBob25lVmlld1wiO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJSZWdpc3RlcjogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJGaXJzdFJlY2hhcmdlOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZmlyc3RSZWNoYXJJY29uOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkNvdW50RG93bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwaG9uZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIG1fcGhvbmVTdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBlbWFpbEVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIG1fZW1haWxTdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBjb2RlRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgbV9jb2RlU3RyOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8vIOeUqOaIt+aVsOaNrlxuICAgIHByaXZhdGUgX3VzZXJEYXRhOiBVc2VyRGF0YSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuXG4gICAgICAgIHRoaXMuYnRuQ291bnREb3duLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHNob3coYXJncz86IGFueVtdKTogdm9pZCB7XG4gICAgICAgIC8vIGxldCB0eXBlID0gYXJnc1swXTtcbiAgICAgICAgLy8gdGhpcy5waG9uZUVkaXRCb3gubm9kZS5hY3RpdmUgPSB0eXBlID09ICdCaW5kUGhvbmUnO1xuICAgICAgICAvLyB0aGlzLmVtYWlsRWRpdEJveC5ub2RlLmFjdGl2ZSA9IHR5cGUgPT0gJ0JpbmRFbWFpbCc7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0UmV3YXJkQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWJlZ2FuXCIsIHRoaXMub25FbWFpbEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWVuZGVkXCIsIHRoaXMub25FbWFpbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25FbWFpbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcInRleHQtY2hhbmdlZFwiLCB0aGlzLm9uRW1haWxDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uQ29kZUJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbkNvZGVFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25Db2RlRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vbkNvZGVDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtYmVnYW5cIiwgdGhpcy5vblBob25lQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vblBob25lRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1yZXR1cm5cIiwgdGhpcy5vblBob25lRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwidGV4dC1jaGFuZ2VkXCIsIHRoaXMub25QaG9uZUNoYW5nZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1MyQ19CaW5kUGhvbmVcIiwgdGhpcy5vbkV2ZW50X1MyQ19CaW5kUGhvbmUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9TMkNfR2V0UmVnaXN0ZXJSZXdvcmRDb25maWdcIiwgdGhpcy5vbkV2ZW50X1MyQ19HZXRSZWdpc3RlclJld29yZENvbmZpZyk7XG4gICAgICAgIC8vRXZlbnRfUzJDX0dldENoZWNrQ29kZVxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9TMkNfR2V0Q2hlY2tDb2RlXCIsIHRoaXMub25FdmVudF9TMkNfR2V0Q2hlY2tDb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl91c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgIH1cblxuICAgIHJlcXVlc3RHZXRSZXdhcmRDb25maWcoKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJTX0dldFJlZ2lzdGVyUmV3YXJkQ29uZmlnLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyU19HZXRSZWdpc3RlclJld2FyZENvbmZpZy5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19HZXRSZWdpc3RlclJld2FyZENvbmZpZywgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19HZXRSZWdpc3RlclJld2FyZENvbmZpZywgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRW1haWxCZWdhbih0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2VtYWlsU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FbWFpbEVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tX2VtYWlsU3RyLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtYWlsRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fZW1haWxTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVtYWlsQ2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9lbWFpbFN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQ29kZUJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9jb2RlU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Db2RlRW5kZWQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fY29kZVN0ci5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fY29kZVN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29kZUNoYW5nZWQoY29udGVudDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fY29kZVN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25QaG9uZUJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBob25lRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fcGhvbmVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblBob25lRW5kZWQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fcGhvbmVTdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGhvbmVFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9waG9uZVN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUGhvbmVDaGFuZ2VkKGNvbnRlbnQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX3Bob25lU3RyID0gY29udGVudC5zdHJpbmc7XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmluZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5CaW5kKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5HZXRDb2RlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrR2V0Q29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRDb3VudERvd24oKSB7XG4gICAgICAgIGxldCBjb21tb24gPSB0aGlzLmJ0bkNvdW50RG93bi5nZXRDb21wb25lbnQoQ291bnREb3duQ29kZSk7XG4gICAgICAgIGNvbW1vbi5fZG9TdGFydFRpbWUoKTtcbiAgICB9XG5cbiAgICBjbGlja0dldENvZGUoKSB7XG4gICAgICAgIGxldCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKCk7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHRoaXMubV9waG9uZVN0cjtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHVzZXJuYW1lLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkVNQUlMSU5GT1JNQVRJT05FTVBUWVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgbGV0IGVycm9yTXNnID0gdmFsaWRhdG9yLnN0YXJ0KCk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoZXJyb3JNc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKTtcblxuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19HZXRDaGVja0NvZGUuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcmlhbDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICB1c2VybmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0Q2hlY2tDb2RlLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJTX0dldENoZWNrQ29kZSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19HZXRDaGVja0NvZGUsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgY2xpY2tCdG5CaW5kKCkge1xuICAgICAgICBsZXQgdXNlcm5hbWUgPSB0aGlzLm1fcGhvbmVTdHI7XG4gICAgICAgIGxldCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgbGV0IENvZGUgPSB0aGlzLm1fY29kZVN0cjtcbiAgICAgICAgdmFsaWRhdG9yLmFkZChDb2RlLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkNPREVJTkZPUk1BVElPTkVNUFRZXG4gICAgICAgIH1dKTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHVzZXJuYW1lLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkVNQUlMSU5GT1JNQVRJT05FTVBUWVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgbGV0IGVycm9yTXNnID0gdmFsaWRhdG9yLnN0YXJ0KCk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoZXJyb3JNc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QmluZFBob25lKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEJpbmRQaG9uZSgpIHtcbiAgICAgICAgbGV0IHBob25lTm8gPSB0aGlzLm1fcGhvbmVTdHI7XG4gICAgICAgIGxldCBjaGVja0NvZGUgPSB0aGlzLm1fY29kZVN0cjtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfQmluZFBob25lLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgcGhvbmVObyxcbiAgICAgICAgICAgIGNoZWNrQ29kZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfQmluZFBob25lLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJTX0JpbmRQaG9uZSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19CaW5kUGhvbmUsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfQmluZFBob25lKCkge1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFR0lTVEVSLkJJTkRTVUNDRVNTKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIG9uRXZlbnRfUzJDX0dldFJlZ2lzdGVyUmV3b3JkQ29uZmlnKGRhdGE6IE1TVC5TMkNfR2V0UmVnaXN0ZXJSZXdvcmRDb25maWcpIHtcbiAgICAgICAgaWYgKCFkYXRhLmZpcnN0RGVwb3NpdFJld2FyZCB8fCAhZGF0YS5jaGlwcykgcmV0dXJuO1xuICAgICAgICB0aGlzLmxhYkZpcnN0UmVjaGFyZ2Uuc3RyaW5nID0gYCske2RhdGEuY2hpcHN9JWA7XG4gICAgICAgIHRoaXMubGFiUmVnaXN0ZXIuc3RyaW5nID0gYCtScCAke2RhdGEuZmlyc3REZXBvc2l0UmV3YXJkfWA7XG5cbiAgICAgICAgbGV0IGdldEZpcnN0RGVwb3NpdCA9IGRhdGEuaXNHZXRGaXJzdERlcG9zaXRSZXdhcmQ7XG4gICAgICAgIGxldCBkZXBvc2l0RG9uZSA9IHRoaXMuZmlyc3RSZWNoYXJJY29uLmdldENoaWxkQnlOYW1lKCdkb25lJyk7XG4gICAgICAgIGRlcG9zaXREb25lLmFjdGl2ZSA9IGdldEZpcnN0RGVwb3NpdDtcbiAgICB9XG5cbiAgICBvbkV2ZW50X1MyQ19HZXRDaGVja0NvZGUoKSB7XG4gICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5TRU5EQ0hFQ0spO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=