
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/bindItemView/BindEmailView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3fb5g5RlVMYYq1sOvyyIyd', 'BindEmailView');
// script/common/bindItemView/BindEmailView.ts

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
let BindEmailView = class BindEmailView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.emailEditBox = null;
        this.m_emailStr = "";
        this.btnCountDown = null;
        this.codeEditBox = null;
        this.m_codeStr = "";
        // 用户数据
        this._userData = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "common/prefabs/BindEmailView";
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
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("Event_S2C_BindEmail", this.onEvent_S2C_BindEmail);
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
    clickGetCode() {
        let username = this.m_emailStr;
        let validator = new Validator_1.default();
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
    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode_1.default);
        common._doStartTime();
    }
    clickBtnBind() {
        let username = this.m_emailStr;
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
        validator.add(username, [{
                strategy: 'isEmail',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILWRONG
            }]);
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.requestBindEmail();
    }
    requestBindEmail() {
        let email = this.m_emailStr;
        let checkCode = this.m_codeStr;
        let req = protoc_1.MST.C2S_BindEmail.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            email,
            checkCode
        });
        let buffer = protoc_1.MST.C2S_BindEmail.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_BindEmail, protoc_1.MST.OuterOpcode_Lobby.C2S_BindEmail, buffer);
    }
    onEvent_S2C_BindEmail() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.BINDSUCCESS);
        this.close();
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SENDCHECK);
    }
};
__decorate([
    property(cc.EditBox)
], BindEmailView.prototype, "emailEditBox", void 0);
__decorate([
    property(cc.Node)
], BindEmailView.prototype, "btnCountDown", void 0);
__decorate([
    property(cc.EditBox)
], BindEmailView.prototype, "codeEditBox", void 0);
BindEmailView = __decorate([
    ccclass
], BindEmailView);
exports.default = BindEmailView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2JpbmRJdGVtVmlldy9CaW5kRW1haWxWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQTJDO0FBRzNDLDREQUFzRDtBQUN0RCx1RUFBK0M7QUFHL0Msc0VBQThDO0FBQzlDLHVFQUErQztBQUMvQywrRUFBdUQ7QUFDdkQsMkRBQWdEO0FBQ2hELGdEQUE2QztBQUM3QyxzREFBbUQ7QUFHbkQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLGdCQUFNO0lBQWpEOztRQU9JLGlCQUFZLEdBQWUsSUFBSSxDQUFDO1FBQ2hDLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFHeEIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsZ0JBQVcsR0FBZSxJQUFJLENBQUM7UUFDL0IsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixPQUFPO1FBQ0MsY0FBUyxHQUFhLElBQUksQ0FBQztRQStLbkMsaUJBQWlCO0lBQ3JCLENBQUM7SUEvTFUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw4QkFBOEIsQ0FBQztJQUMxQyxDQUFDO0lBZUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFZO1FBQ3BCLHNCQUFzQjtRQUN0Qix1REFBdUQ7UUFDdkQsdURBQXVEO1FBRXZELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxVQUFVO1FBQ04s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QUFhO0lBRGpDLE9BQU87R0FDYSxhQUFhLENBaU1qQztrQkFqTW9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBMb2dpbk5ld1ZpZXcgZnJvbSBcIi4uLy4uL2xvZ2luL0xvZ2luTmV3Vmlld1wiO1xuaW1wb3J0IFZhbGlkYXRvciBmcm9tIFwiLi4vLi4vbG9naW4vVmFsaWRhdG9yXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgQ291bnREb3duQ29kZSBmcm9tIFwiLi4vY29tcG9uZW50L0NvdW50RG93bkNvZGVcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vdXRpbHMvTnVtYmVyVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmRFbWFpbFZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiY29tbW9uL3ByZWZhYnMvQmluZEVtYWlsVmlld1wiO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIGVtYWlsRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgbV9lbWFpbFN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkNvdW50RG93bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBjb2RlRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgbV9jb2RlU3RyOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8vIOeUqOaIt+aVsOaNrlxuICAgIHByaXZhdGUgX3VzZXJEYXRhOiBVc2VyRGF0YSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuXG4gICAgICAgIHRoaXMuYnRuQ291bnREb3duLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHNob3coYXJncz86IGFueVtdKTogdm9pZCB7XG4gICAgICAgIC8vIGxldCB0eXBlID0gYXJnc1swXTtcbiAgICAgICAgLy8gdGhpcy5waG9uZUVkaXRCb3gubm9kZS5hY3RpdmUgPSB0eXBlID09ICdCaW5kUGhvbmUnO1xuICAgICAgICAvLyB0aGlzLmVtYWlsRWRpdEJveC5ub2RlLmFjdGl2ZSA9IHR5cGUgPT0gJ0JpbmRFbWFpbCc7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0UmV3YXJkQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWJlZ2FuXCIsIHRoaXMub25FbWFpbEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWVuZGVkXCIsIHRoaXMub25FbWFpbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25FbWFpbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3gubm9kZS5vbihcInRleHQtY2hhbmdlZFwiLCB0aGlzLm9uRW1haWxDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uQ29kZUJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbkNvZGVFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25Db2RlRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vbkNvZGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9TMkNfQmluZEVtYWlsXCIsIHRoaXMub25FdmVudF9TMkNfQmluZEVtYWlsKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfUzJDX0dldENoZWNrQ29kZVwiLCB0aGlzLm9uRXZlbnRfUzJDX0dldENoZWNrQ29kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0R2V0UmV3YXJkQ29uZmlnKCkge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19HZXRSZWdpc3RlclJld2FyZENvbmZpZy5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0UmVnaXN0ZXJSZXdhcmRDb25maWcuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMlNfR2V0UmVnaXN0ZXJSZXdhcmRDb25maWcsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfR2V0UmVnaXN0ZXJSZXdhcmRDb25maWcsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVtYWlsQmVnYW4odGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW1haWxFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRW1haWxFbmRlZCh0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9lbWFpbFN0ci5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2VtYWlsU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FbWFpbENoYW5nZWQoY29udGVudDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fZW1haWxTdHIgPSBjb250ZW50LnN0cmluZztcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNvZGVCZWdhbih0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fY29kZVN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29kZUVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tX2NvZGVTdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2NvZGVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvZGVDaGFuZ2VkKGNvbnRlbnQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX2NvZGVTdHIgPSBjb250ZW50LnN0cmluZztcbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidG5DbG9zZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5CaW5kXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkJpbmQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkdldENvZGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tHZXRDb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja0dldENvZGUoKSB7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHVzZXJuYW1lLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkVNQUlMSU5GT1JNQVRJT05FTVBUWVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgbGV0IGVycm9yTXNnID0gdmFsaWRhdG9yLnN0YXJ0KCk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoZXJyb3JNc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKTtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfR2V0Q2hlY2tDb2RlLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgdXNlcm5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX0dldENoZWNrQ29kZS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19HZXRDaGVja0NvZGUsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfR2V0Q2hlY2tDb2RlLCBidWZmZXIpO1xuICAgIH1cblxuICAgIHN0YXJ0Q291bnREb3duKCkge1xuICAgICAgICBsZXQgY29tbW9uID0gdGhpcy5idG5Db3VudERvd24uZ2V0Q29tcG9uZW50KENvdW50RG93bkNvZGUpO1xuICAgICAgICBjb21tb24uX2RvU3RhcnRUaW1lKCk7XG4gICAgfVxuXG5cbiAgICBjbGlja0J0bkJpbmQoKSB7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcblxuICAgICAgICBsZXQgQ29kZSA9IHRoaXMubV9jb2RlU3RyO1xuICAgICAgICB2YWxpZGF0b3IuYWRkKENvZGUsIFt7XG4gICAgICAgICAgICBzdHJhdGVneTogJ2lzTm9uRW1wdHknLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuQ09ERUlORk9STUFUSU9ORU1QVFlcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQodXNlcm5hbWUsIFt7XG4gICAgICAgICAgICBzdHJhdGVneTogJ2lzTm9uRW1wdHknLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuRU1BSUxJTkZPUk1BVElPTkVNUFRZXG4gICAgICAgIH1dKTtcbiAgICAgICAgdmFsaWRhdG9yLmFkZCh1c2VybmFtZSwgW3tcbiAgICAgICAgICAgIHN0cmF0ZWd5OiAnaXNFbWFpbCcsXG4gICAgICAgICAgICBlcnJvck1zZzogaTE4bi5SRUdJU1RFUi5FTUFJTFdST05HXG4gICAgICAgIH1dKTtcblxuICAgICAgICBsZXQgZXJyb3JNc2cgPSB2YWxpZGF0b3Iuc3RhcnQoKTtcbiAgICAgICAgaWYgKGVycm9yTXNnKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChlcnJvck1zZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVlc3RCaW5kRW1haWwoKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QmluZEVtYWlsKCkge1xuICAgICAgICBsZXQgZW1haWwgPSB0aGlzLm1fZW1haWxTdHI7XG4gICAgICAgIGxldCBjaGVja0NvZGUgPSB0aGlzLm1fY29kZVN0cjtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfQmluZEVtYWlsLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBjaGVja0NvZGVcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX0JpbmRFbWFpbC5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19CaW5kRW1haWwsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfQmluZEVtYWlsLCBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uRXZlbnRfUzJDX0JpbmRFbWFpbCgpIHtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5SRUdJU1RFUi5CSU5EU1VDQ0VTUyk7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBvbkV2ZW50X1MyQ19HZXRDaGVja0NvZGUoKSB7XG4gICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5TRU5EQ0hFQ0spO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=