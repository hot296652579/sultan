
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/SendVerificationCode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40b41aNgUpJTo5/QItI9R3Z', 'SendVerificationCode');
// script/common/component/SendVerificationCode.ts

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
exports.VerificationCodeType = void 0;
const Decorators_1 = require("../../framework/decorator/Decorators");
const HttpClient_1 = require("../../framework/net/HttpClient");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const Manager_1 = require("../manager/Manager");
const CommonService_1 = require("../net/CommonService");
const LobbyService_1 = require("../net/LobbyService");
var VerificationCodeType;
(function (VerificationCodeType) {
    VerificationCodeType[VerificationCodeType["none"] = 0] = "none";
    VerificationCodeType[VerificationCodeType["resetPwd"] = 1] = "resetPwd";
})(VerificationCodeType = exports.VerificationCodeType || (exports.VerificationCodeType = {}));
const { ccclass, property } = cc._decorator;
let SendVerificationCode = class SendVerificationCode extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.service = null;
        // onLoad () {}
        this.verificationCodeType = VerificationCodeType.none;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.SEND_PHONE_CODE), this.onPhoneCodeCall);
    }
    onPhoneCodeCall(netData) {
        if (netData.statusMsg.status == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
            this._doStartTime();
        }
        else {
            PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + netData.statusMsg.status));
        }
    }
    doSendVerificationCode(msg) {
        if (!!this.isSendOk) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
            return;
        }
        this.isSendOk = true;
        this.label.language = LanguageImpl_1.i18n.BIND.SEND;
        if (msg.type) { // webscoket
            let req = CommonService_1.protoPackage.hall.SendPhoneCode.create({ phone: msg.phone, area: msg.area });
            let buffer = CommonService_1.protoPackage.hall.SendPhoneCode.encode(req).finish();
            this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.SEND_PHONE_CODE, buffer);
        }
        else { //http
            let url = '';
            url += G.URLMgr.loginURL + 'sms?phone=' + encodeURIComponent(msg.phone) + '&area=' + encodeURIComponent(msg.areaCode) + "&type=" + this.verificationCodeType;
            // url += 'http://192.168.6.200:8088/' + 'sms?phone=' + msg.phone;
            let packge = new HttpClient_1.RequestPackge;
            packge.data.url = url;
            packge.send((netData) => {
                if (netData.state == 0) {
                    PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
                    this._doStartTime();
                }
                else {
                    PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[netData.state] || Manager_1.Manager.makeLanguage("ERRORCODE.SERVERERROR"));
                    this.sendFail();
                }
            }, (err) => {
                G.Logger.log('验证码 = ', err);
                this.sendFail();
            });
        }
    }
    _doStartTime() {
        this.verifiCD = 60;
        if (this.node.getComponent(cc.Button)) {
            this.node.getComponent(cc.Button).interactable = false;
        }
        this.label.string = this.verifiCD + 's';
        this.verifiCD -= 1;
        this.updateVerifiCD = setInterval(() => {
            if (this.verifiCD < 0) {
                clearInterval(this.updateVerifiCD);
                this.verifiCD = 60;
                this.label.language = LanguageImpl_1.i18n.BIND.SEND;
                this.isSendOk = null;
                this.countDownEnd();
                if (this.node.getComponent(cc.Button)) {
                    this.node.getComponent(cc.Button).interactable = true;
                }
            }
            else {
                if (this.label == null) {
                    clearInterval(this.updateVerifiCD);
                    if (cc.isValid(this.node)) {
                        this.onDestroy();
                    }
                }
                else {
                    this.label.string = this.verifiCD + 's';
                    this.verifiCD--;
                }
            }
        }, 1000);
    }
    countDownEnd() {
    }
    sendFail() {
        this.isSendOk = null;
    }
    setVerificationCodeType(type) {
        this.verificationCodeType = type;
    }
};
__decorate([
    property(cc.Label)
], SendVerificationCode.prototype, "label", void 0);
SendVerificationCode = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], SendVerificationCode);
exports.default = SendVerificationCode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9TZW5kVmVyaWZpY2F0aW9uQ29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxRUFBOEU7QUFDOUUsK0RBQStEO0FBQy9ELHVFQUErQztBQUMvQyx1RUFBK0M7QUFFL0MsMkRBQWdEO0FBQ2hELGdEQUE2QztBQUM3Qyx3REFBZ0U7QUFDaEUsc0RBQW1EO0FBR25ELElBQW1CLG9CQUdsQjtBQUhELFdBQW1CLG9CQUFvQjtJQUNuQywrREFBSSxDQUFBO0lBQ0osdUVBQVEsQ0FBQTtBQUNaLENBQUMsRUFIa0Isb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFHdEM7QUFDRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLGdCQUFNO0lBQXhEOztRQUdJLFVBQUssR0FBYSxJQUFJLENBQUM7UUFLdkIsWUFBTyxHQUFpQixJQUFJLENBQUM7UUFDN0IsZUFBZTtRQUNmLHlCQUFvQixHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztJQWlHckQsQ0FBQztJQS9GRyxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRCxlQUFlLENBQUMsT0FBTztRQUNuQixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMvQixtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FB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LENBQUM7aUJBQ25CO2FBRUo7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBQ0QsWUFBWTtJQUVaLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUNELHVCQUF1QixDQUFDLElBQTBCO1FBQzlDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7SUFDckMsQ0FBQztDQUNKLENBQUE7QUF4R0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDSTtBQUhOLG9CQUFvQjtJQUZ4QyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixvQkFBb0IsQ0EyR3hDO2tCQTNHb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IFJlcXVlc3RQYWNrZ2UgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcInByb3RvYnVmanNcIjtcblxuZXhwb3J0IGNvbnN0ICBlbnVtIFZlcmlmaWNhdGlvbkNvZGVUeXBlIHtcbiAgICBub25lLFxuICAgIHJlc2V0UHdkLFxufVxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbmRWZXJpZmljYXRpb25Db2RlIGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPntcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIGlzU2VuZE9rOiBhbnk7XG4gICAgdmVyaWZpQ0Q6IG51bWJlcjtcbiAgICB1cGRhdGVWZXJpZmlDRDogTm9kZUpTLlRpbWVvdXQ7XG5cbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2UgPSBudWxsO1xuICAgIC8vIG9uTG9hZCAoKSB7fVxuICAgIHZlcmlmaWNhdGlvbkNvZGVUeXBlID0gVmVyaWZpY2F0aW9uQ29kZVR5cGUubm9uZTtcblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5TRU5EX1BIT05FX0NPREUpLCB0aGlzLm9uUGhvbmVDb2RlQ2FsbCk7XG4gICAgfVxuXG4gICAgb25QaG9uZUNvZGVDYWxsKG5ldERhdGEpIHtcbiAgICAgICAgaWYgKG5ldERhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVSUk9SVElQUy5SRVFTRU5EQ0hFQ0tNRVNTQUdFKTtcbiAgICAgICAgICAgIHRoaXMuX2RvU3RhcnRUaW1lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBuZXREYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkb1NlbmRWZXJpZmljYXRpb25Db2RlKG1zZykge1xuICAgICAgICBpZiAoISF0aGlzLmlzU2VuZE9rKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVSUk9SVElQUy5SRVFTRU5EQ0hFQ0tNRVNTQUdFKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU2VuZE9rID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYWJlbC5sYW5ndWFnZSA9IGkxOG4uQklORC5TRU5EO1xuICAgICAgICBpZiAobXNnLnR5cGUpIHsgLy8gd2Vic2Nva2V0XG4gICAgICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuU2VuZFBob25lQ29kZS5jcmVhdGUoeyBwaG9uZTogbXNnLnBob25lLCBhcmVhOiBtc2cuYXJlYSB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5TZW5kUGhvbmVDb2RlLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlNFTkRfUEhPTkVfQ09ERSxcbiAgICAgICAgICAgICAgICBidWZmZXIpO1xuXG4gICAgICAgIH0gZWxzZSB7Ly9odHRwXG4gICAgICAgICAgICBsZXQgdXJsID0gJyc7XG4gICAgICAgICAgICB1cmwgKz0gRy5VUkxNZ3IubG9naW5VUkwgKyAnc21zP3Bob25lPScgKyBlbmNvZGVVUklDb21wb25lbnQobXNnLnBob25lKSArICcmYXJlYT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG1zZy5hcmVhQ29kZSkgKyBcIiZ0eXBlPVwiICsgdGhpcy52ZXJpZmljYXRpb25Db2RlVHlwZTtcbiAgICAgICAgICAgIC8vIHVybCArPSAnaHR0cDovLzE5Mi4xNjguNi4yMDA6ODA4OC8nICsgJ3Ntcz9waG9uZT0nICsgbXNnLnBob25lO1xuXG5cbiAgICAgICAgICAgIGxldCBwYWNrZ2UgPSBuZXcgUmVxdWVzdFBhY2tnZTtcbiAgICAgICAgICAgIHBhY2tnZS5kYXRhLnVybCA9IHVybDtcbiAgICAgICAgICAgIHBhY2tnZS5zZW5kKChuZXREYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5ldERhdGEuc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVSUk9SVElQUy5SRVFTRU5EQ0hFQ0tNRVNTQUdFKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9TdGFydFRpbWUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgaTE4bi5FUlJPUkNPREVbbmV0RGF0YS5zdGF0ZV0gfHwgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuU0VSVkVSRVJST1JcIikpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRGYWlsKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBHLkxvZ2dlci5sb2coJ+mqjOivgeeggSA9ICcsIGVycik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kRmFpbCgpXG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9kb1N0YXJ0VGltZSgpIHtcbiAgICAgICAgdGhpcy52ZXJpZmlDRCA9IDYwO1xuICAgICAgICBpZiAodGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSB0aGlzLnZlcmlmaUNEICsgJ3MnO1xuICAgICAgICB0aGlzLnZlcmlmaUNEIC09IDE7XG4gICAgICAgIHRoaXMudXBkYXRlVmVyaWZpQ0QgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZXJpZmlDRCA8IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudXBkYXRlVmVyaWZpQ0QpO1xuICAgICAgICAgICAgICAgIHRoaXMudmVyaWZpQ0QgPSA2MDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLmxhbmd1YWdlID0gaTE4bi5CSU5ELlNFTkQ7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlbmRPayA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudERvd25FbmQoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudXBkYXRlVmVyaWZpQ0QpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IHRoaXMudmVyaWZpQ0QgKyAncyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVyaWZpQ0QtLTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgY291bnREb3duRW5kKCkge1xuXG4gICAgfVxuICAgIHNlbmRGYWlsKCkge1xuICAgICAgICB0aGlzLmlzU2VuZE9rID0gbnVsbDtcbiAgICB9XG4gICAgc2V0VmVyaWZpY2F0aW9uQ29kZVR5cGUodHlwZTogVmVyaWZpY2F0aW9uQ29kZVR5cGUpIHtcbiAgICAgICAgdGhpcy52ZXJpZmljYXRpb25Db2RlVHlwZSA9IHR5cGU7XG4gICAgfVxufVxuIl19