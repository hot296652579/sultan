
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PBChangePasswdView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '504c3mQXoVJfqx5+tapFckG', 'PBChangePasswdView');
// script/piggyBank/PBChangePasswdView.ts

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
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const PBPasswdComponent_1 = __importDefault(require("./PBPasswdComponent"));
const { ccclass, property } = cc._decorator;
const MAX_DIGIT = 6;
let PBChangePasswdView = class PBChangePasswdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.edbPasswd1 = null;
        this.edbPasswd2 = null;
        this.edbPasswd3 = null;
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBChangePasswdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    bindingEvents() {
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD), this.onChangePasswd);
    }
    show() {
        this.showWithAction(true);
        super.show();
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
    onClickOK() {
        this.playDefaultEffect();
        let edbComponent1 = this.edbPasswd1.getComponent(PBPasswdComponent_1.default);
        let edbComponent2 = this.edbPasswd2.getComponent(PBPasswdComponent_1.default);
        let edbComponent3 = this.edbPasswd3.getComponent(PBPasswdComponent_1.default);
        if (this.isPasswordNull(edbComponent1.string) ||
            this.isPasswordNull(edbComponent2.string) ||
            this.isPasswordNull(edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.PLEASE_ENTER_PASSWORD);
            return;
        }
        if (!this.isPasswordDigit(edbComponent1.string) ||
            !this.isPasswordDigit(edbComponent2.string) ||
            !this.isPasswordDigit(edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }
        if (this.isPasswordSame(edbComponent1.string, edbComponent2.string, edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.OLD_NEW_PASSWD_SAME);
            return;
        }
        if (!this.isPasswordSame(edbComponent2.string, edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.NEW_PASSWD_DIFF);
            return;
        }
        let req = CommonService_1.protoPackage.hall.ChangePasswdReq.create({ oldPasswd: edbComponent1.string, newPasswd: edbComponent2.string });
        let buffer = CommonService_1.protoPackage.hall.ChangePasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD, buffer);
    }
    onChangePasswd(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.CHANGE_SUCCESS);
        this.closeWithAction();
    }
    /**
     * 是否密码一致
     * @return {boolean}
     */
    isPasswordSame(...args) {
        let isSame = true;
        let str = args[0];
        for (let i = 1; i < args.length; ++i) {
            if (args[i] !== str) {
                isSame = false;
                break;
            }
        }
        return isSame;
    }
    /**
     * 是否6满足位数
     */
    isPasswordDigit(str) {
        if (str.length !== MAX_DIGIT) {
            return false;
        }
        return true;
    }
    /**
     * 密码是否为空
     */
    isPasswordNull(str = "") {
        if (str.length <= 0) {
            return true;
        }
        return false;
    }
};
__decorate([
    property(cc.EditBox)
], PBChangePasswdView.prototype, "edbPasswd1", void 0);
__decorate([
    property(cc.EditBox)
], PBChangePasswdView.prototype, "edbPasswd2", void 0);
__decorate([
    property(cc.EditBox)
], PBChangePasswdView.prototype, "edbPasswd3", void 0);
PBChangePasswdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBChangePasswdView);
exports.default = PBChangePasswdView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BCQ2hhbmdlUGFzc3dkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUF1RDtBQUN2RCx1REFBb0Q7QUFDcEQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBQzVDLG9FQUE0QztBQUM1Qyw0RUFBb0Q7QUFFcEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLE1BQU0sU0FBUyxHQUFXLENBQUMsQ0FBQztBQUk1QixJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsZ0JBQU07SUFBdEQ7O1FBSVksZUFBVSxHQUFlLElBQUksQ0FBQztRQUc5QixlQUFVLEdBQWUsSUFBSSxDQUFDO1FBRzlCLGVBQVUsR0FBZSxJQUFJLENBQUM7SUFnSDFDLENBQUM7SUE5R1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxzQ0FBc0MsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELEtBQUs7SUFFTCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFD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Ozs7T0FHRztJQUNLLGNBQWMsQ0FBQyxHQUFHLElBQWM7UUFDcEMsSUFBSSxNQUFNLEdBQVksSUFBSSxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMxQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ2YsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxlQUFlLENBQUMsR0FBVztRQUMvQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzFCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssY0FBYyxDQUFDLE1BQWMsRUFBRTtRQUNuQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQTtBQXRIRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3NEQUNpQjtBQUd0QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3NEQUNpQjtBQUd0QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3NEQUNpQjtBQVZyQixrQkFBa0I7SUFGdEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsa0JBQWtCLENBMEh0QztrQkExSG9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgUEJQYXNzd2RDb21wb25lbnQgZnJvbSBcIi4vUEJQYXNzd2RDb21wb25lbnRcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuY29uc3QgTUFYX0RJR0lUOiBudW1iZXIgPSA2O1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUEJDaGFuZ2VQYXNzd2RWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYlBhc3N3ZDE6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcHJpdmF0ZSBlZGJQYXNzd2QyOiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHByaXZhdGUgZWRiUGFzc3dkMzogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwicGlnZ3lCYW5rL3ByZWZhYnMvUEJDaGFuZ2VQYXNzd2RWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbWdCZycpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ0hBTkdFX1BBU1NXRCksIHRoaXMub25DaGFuZ2VQYXNzd2QpO1xuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIHN1cGVyLnNob3coKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoXCJjbG9zZVwiKTtcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrT0soKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoKTtcblxuICAgICAgICBsZXQgZWRiQ29tcG9uZW50MTogUEJQYXNzd2RDb21wb25lbnQgPSB0aGlzLmVkYlBhc3N3ZDEuZ2V0Q29tcG9uZW50KFBCUGFzc3dkQ29tcG9uZW50KTtcbiAgICAgICAgbGV0IGVkYkNvbXBvbmVudDI6IFBCUGFzc3dkQ29tcG9uZW50ID0gdGhpcy5lZGJQYXNzd2QyLmdldENvbXBvbmVudChQQlBhc3N3ZENvbXBvbmVudCk7XG4gICAgICAgIGxldCBlZGJDb21wb25lbnQzOiBQQlBhc3N3ZENvbXBvbmVudCA9IHRoaXMuZWRiUGFzc3dkMy5nZXRDb21wb25lbnQoUEJQYXNzd2RDb21wb25lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUGFzc3dvcmROdWxsKGVkYkNvbXBvbmVudDEuc3RyaW5nKSB8fFxuICAgICAgICAgICAgdGhpcy5pc1Bhc3N3b3JkTnVsbChlZGJDb21wb25lbnQyLnN0cmluZykgfHxcbiAgICAgICAgICAgIHRoaXMuaXNQYXNzd29yZE51bGwoZWRiQ29tcG9uZW50My5zdHJpbmcpKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlBJR0dZX0JBTksuUExFQVNFX0VOVEVSX1BBU1NXT1JEKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pc1Bhc3N3b3JkRGlnaXQoZWRiQ29tcG9uZW50MS5zdHJpbmcpIHx8XG4gICAgICAgICAgICAhdGhpcy5pc1Bhc3N3b3JkRGlnaXQoZWRiQ29tcG9uZW50Mi5zdHJpbmcpIHx8XG4gICAgICAgICAgICAhdGhpcy5pc1Bhc3N3b3JkRGlnaXQoZWRiQ29tcG9uZW50My5zdHJpbmcpKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlBJR0dZX0JBTksuUEFTU1dPUkRfSU5DT01QTEVURSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1Bhc3N3b3JkU2FtZShlZGJDb21wb25lbnQxLnN0cmluZywgZWRiQ29tcG9uZW50Mi5zdHJpbmcsIGVkYkNvbXBvbmVudDMuc3RyaW5nKSkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5QSUdHWV9CQU5LLk9MRF9ORVdfUEFTU1dEX1NBTUUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzUGFzc3dvcmRTYW1lKGVkYkNvbXBvbmVudDIuc3RyaW5nLCBlZGJDb21wb25lbnQzLnN0cmluZykpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uUElHR1lfQkFOSy5ORVdfUEFTU1dEX0RJRkYpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLkNoYW5nZVBhc3N3ZFJlcS5jcmVhdGUoeyBvbGRQYXNzd2Q6IGVkYkNvbXBvbmVudDEuc3RyaW5nLCBuZXdQYXNzd2Q6IGVkYkNvbXBvbmVudDIuc3RyaW5nIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuQ2hhbmdlUGFzc3dkUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ0hBTkdFX1BBU1NXRCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZVBhc3N3ZChkYXRhKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5QSUdHWV9CQU5LLkNIQU5HRV9TVUNDRVNTKTtcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKblr4bnoIHkuIDoh7RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNQYXNzd29yZFNhbWUoLi4uYXJnczogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGlzU2FtZTogYm9vbGVhbiA9IHRydWU7XG4gICAgICAgIGxldCBzdHI6IHN0cmluZyA9IGFyZ3NbMF07XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1tpXSAhPT0gc3RyKSB7XG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzU2FtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKY25ruh6Laz5L2N5pWwXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1Bhc3N3b3JkRGlnaXQoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHN0ci5sZW5ndGggIT09IE1BWF9ESUdJVCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5a+G56CB5piv5ZCm5Li656m6XG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1Bhc3N3b3JkTnVsbChzdHI6IHN0cmluZyA9IFwiXCIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHN0ci5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==