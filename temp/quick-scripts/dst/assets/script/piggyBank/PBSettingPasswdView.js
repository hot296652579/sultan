
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PBSettingPasswdView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BCU2V0dGluZ1Bhc3N3ZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBdUQ7QUFDdkQsdURBQW9EO0FBQ3BELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsdURBQTZEO0FBQzdELGtFQUEyRTtBQUMzRSxvRUFBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLG9FQUE0QztBQUM1Qyw0RUFBb0Q7QUFDcEQsb0VBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUU1QyxNQUFNLFNBQVMsR0FBVyxDQUFDLENBQUM7QUFJNUIsSUFBcUIsbUJBQW1CLEdBQXhDLE1BQXFCLG1CQUFvQixTQUFRLGdCQUFNO0lBQXZEOztRQUlZLGVBQVUsR0FBZSxJQUFJLENBQUM7UUFHOUIsZUFBVSxHQUFlLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDeEMsa0JBQWEsR0FBc0IsSUFBSSxDQUFDO0lBd0dwRCxDQUFDO0lBdEdVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sdUNBQXVDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywyQkFBaUIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsMkJBQWlCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQUUsNEJBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xILElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEgsQ0FBQztJQUVELElBQUk7UUFDQSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDeEIsbUJBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN6RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLG1CQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdkQsT0FBTztTQUNWO1FBRUQsSUFBSSxHQUFHLEdBQUcsNEJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMzRixJQUFJLE1BQU0sR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQ2pDLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDNUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFJO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLG1CQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUUsT0FBTztTQUNWO1FBRUQsV0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQ2pDLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDMUMsSUFBSSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQUk7UUFDZCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM3QixtQkFBUyxDQUFDLE9BQU8sQ0FBQyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlFLE9BQU87U0FDVjtRQUVELGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx1QkFBYSxFQUFFLE1BQU0sRUFBRSwwQkFBZ0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssY0FBYztRQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ25FLENBQUM7SUFFRDs7T0FFRztJQUNLLGVBQWU7UUFDbkIsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTtBQTlHRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3VEQUNpQjtBQUd0QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3VEQUNpQjtBQVByQixtQkFBbUI7SUFGdkMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsbUJBQW1CLENBa0h2QztrQkFsSG9CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCBQQlBhc3N3ZENvbXBvbmVudCBmcm9tIFwiLi9QQlBhc3N3ZENvbXBvbmVudFwiO1xuaW1wb3J0IFBpZ2d5QmFua1ZpZXcgZnJvbSBcIi4vUGlnZ3lCYW5rVmlld1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5jb25zdCBNQVhfRElHSVQ6IG51bWJlciA9IDY7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQQlNldHRpbmdQYXNzd2RWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYlBhc3N3ZDE6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcHJpdmF0ZSBlZGJQYXNzd2QyOiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIHByaXZhdGUgZWRiQ29tcG9uZW50MTogUEJQYXNzd2RDb21wb25lbnQgPSBudWxsO1xuICAgIHByaXZhdGUgZWRiQ29tcG9uZW50MjogUEJQYXNzd2RDb21wb25lbnQgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInBpZ2d5QmFuay9wcmVmYWJzL1BCU2V0dGluZ1Bhc3N3ZFZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ltZ0JnJyk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVkYkNvbXBvbmVudDEgPSB0aGlzLmVkYlBhc3N3ZDEuZ2V0Q29tcG9uZW50KFBCUGFzc3dkQ29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5lZGJDb21wb25lbnQyID0gdGhpcy5lZGJQYXNzd2QyLmdldENvbXBvbmVudChQQlBhc3N3ZENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1NFVFRJTkdfUEFTU1dEKSwgdGhpcy5vblNldHRpbmdQYXNzd2QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9UT1RBTF9BTU9VTlQpLCB0aGlzLm9uVG90YWxBbW91bnQpO1xuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoXCJjbG9zZVwiKTtcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrT0soKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoKTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNQYXNzd29yZFNhbWUoKSkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5QSUdHWV9CQU5LLklOQ09OU0lTVEVOVF9QQVNTV09SRCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzUGFzc3dvcmREaWdpdCgpKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlBJR0dZX0JBTksuUEFTU1dPUkRfSU5DT01QTEVURSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuU2V0dGluZ1Bhc3N3ZFJlcS5jcmVhdGUoeyBwYXNzd2Q6IHRoaXMuZWRiQ29tcG9uZW50MS5zdHJpbmcgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5TZXR0aW5nUGFzc3dkUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfU0VUVElOR19QQVNTV0QsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uU2V0dGluZ1Bhc3N3ZChkYXRhKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBVc2VyLnBpZ2d5QmFuayA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcblxuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVE9UQUxfQU1PVU5ULFxuICAgICAgICAgICAgbnVsbCk7XG4gICAgfVxuXG4gICAgb25Ub3RhbEFtb3VudChkYXRhKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogUGlnZ3lCYW5rVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBkYXRhIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuWvhueggeS4gOiHtFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1Bhc3N3b3JkU2FtZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRiQ29tcG9uZW50MS5zdHJpbmcgPT09IHRoaXMuZWRiQ29tcG9uZW50Mi5zdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCmNua7oei2s+S9jeaVsFxuICAgICAqL1xuICAgIHByaXZhdGUgaXNQYXNzd29yZERpZ2l0KCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgc3RyMTogc3RyaW5nID0gdGhpcy5lZGJDb21wb25lbnQxLnN0cmluZztcbiAgICAgICAgaWYgKHN0cjEubGVuZ3RoICE9PSBNQVhfRElHSVQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdHIyOiBzdHJpbmcgPSB0aGlzLmVkYkNvbXBvbmVudDIuc3RyaW5nO1xuICAgICAgICBpZiAoc3RyMi5sZW5ndGggIT09IE1BWF9ESUdJVCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIl19