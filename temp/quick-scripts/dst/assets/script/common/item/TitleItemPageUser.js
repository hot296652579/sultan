
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/item/TitleItemPageUser.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1dac0fmqHtNApsWicOqgsQj', 'TitleItemPageUser');
// script/common/item/TitleItemPageUser.ts

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
const Defines_1 = require("../../framework/base/Defines");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const UtilMgr_1 = require("../../global/UtilMgr");
const LoginNewView_1 = __importDefault(require("../../login/LoginNewView"));
const RechargeNewView_1 = __importDefault(require("../../wallet/RechargeNewView"));
const Manager_1 = require("../manager/Manager");
const NumberUtils_1 = __importDefault(require("../utils/NumberUtils"));
const { ccclass, property } = cc._decorator;
let TitleItemPageUser = class TitleItemPageUser extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labPageName = null;
        this.btnLogin = null;
        this.nodUserInfo = null;
        this.imgAvatar = null;
        this.labUserName = null;
        this.imgGold = null;
        this.labGold = null;
        // 用户数据
        this._userData = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initUI();
        this.refreshUser();
    }
    start() {
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("Event_M2C_GoldChange_Mes", this.onEvent_M2C_GoldChange_Mes);
        this.registerEvent('Event_S2C_ModifyAvartar', this.onRefreshUserInfo);
        this.registerEvent("updateUserInfo", this.onRefreshUserInfo);
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    initUI() {
        this.labPageName.string = "";
        this.btnLogin.node.active = false;
        this.nodUserInfo.active = false;
        this.imgAvatar.spriteFrame = null;
        this.labGold.string = "";
    }
    onRefreshUserInfo() {
        this.refreshUser();
    }
    setPageName(name) {
        this.labPageName.string = name;
    }
    languagePageName(i18n) {
        this.labPageName.language = i18n;
    }
    refreshUser() {
        this.btnLogin.node.active = false;
        this.nodUserInfo.active = false;
        if (this._userData.isLogined()) {
            this.nodUserInfo.active = true;
            this.refreshAvatar();
            this.refreshGold();
            this.refreshNick();
        }
        else {
            this.btnLogin.node.active = true;
        }
    }
    refreshAvatar() {
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, this._userData.info.HeaderUrl, this._userData.info.UnitId, this);
    }
    refreshGold() {
        this.labGold.string = NumberUtils_1.default.converToC(Number(this._userData.info.Gold));
    }
    refreshNick() {
        this.labUserName.string = UtilMgr_1.UtilMgr.setString(this._userData.info.Nick);
    }
    /**
     * 获取金币世界坐标
     * @returns {cc.Vec2}
     */
    getGoldWorldPos() {
        return this.imgGold.node.convertToWorldSpaceAR(cc.v2(0, 0));
    }
    onEvent_M2C_GoldChange_Mes(oldGold) {
        this.refreshGold();
    }
    onClick(name) {
        switch (name) {
            case "btnLogin":
                Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "btnBuyGold":
                Manager_1.Manager.uiManager.open({ type: RechargeNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
        }
    }
};
__decorate([
    property(cc.Label)
], TitleItemPageUser.prototype, "labPageName", void 0);
__decorate([
    property(cc.Button)
], TitleItemPageUser.prototype, "btnLogin", void 0);
__decorate([
    property(cc.Node)
], TitleItemPageUser.prototype, "nodUserInfo", void 0);
__decorate([
    property(cc.Sprite)
], TitleItemPageUser.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], TitleItemPageUser.prototype, "labUserName", void 0);
__decorate([
    property(cc.Sprite)
], TitleItemPageUser.prototype, "imgGold", void 0);
__decorate([
    property(cc.Label)
], TitleItemPageUser.prototype, "labGold", void 0);
TitleItemPageUser = __decorate([
    ccclass
], TitleItemPageUser);
exports.default = TitleItemPageUser;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2l0ZW0vVGl0bGVJdGVtUGFnZVVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBMkM7QUFDM0MsMERBQWdFO0FBQ2hFLHVFQUErQztBQUMvQyxrREFBK0M7QUFDL0MsNEVBQW9EO0FBQ3BELG1GQUEyRDtBQUMzRCxnREFBNkM7QUFDN0MsdUVBQStDO0FBRS9DLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsZ0JBQU07SUFBckQ7O1FBR2MsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsYUFBUSxHQUFjLElBQUksQ0FBQztRQUczQixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLFlBQU8sR0FBYyxJQUFJLENBQUM7UUFHMUIsWUFBTyxHQUFhLElBQUksQ0FBQztRQUVuQyxPQUFPO1FBQ0csY0FBUyxHQUFhLElBQUksQ0FBQztRQThGckMsaUJBQWlCO0lBQ3JCLENBQUM7SUE3RkcsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDYixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUs7SUFFTCxDQUFDO0lBRVMsYUFBYTtRQUNuQixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLHlCQUF5QixFQUFFLElBQUks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QUUsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1lBQ1YsS0FBSyxZQUFZO2dCQUNiLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBZSxFQUFFLE1BQU0sRUFBRSwwQkFBZ0IsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FHSixDQUFBO0FBcEhHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ29CO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ2lCO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ29CO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ2tCO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ29CO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ2dCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ2dCO0FBckJsQixpQkFBaUI7SUFEckMsT0FBTztHQUNhLGlCQUFpQixDQXVIckM7a0JBdkhvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi8uLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IExvZ2luTmV3VmlldyBmcm9tIFwiLi4vLi4vbG9naW4vTG9naW5OZXdWaWV3XCI7XG5pbXBvcnQgUmVjaGFyZ2VOZXdWaWV3IGZyb20gXCIuLi8uLi93YWxsZXQvUmVjaGFyZ2VOZXdWaWV3XCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi91dGlscy9OdW1iZXJVdGlsc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGl0bGVJdGVtUGFnZVVzZXIgZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByb3RlY3RlZCBsYWJQYWdlTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcm90ZWN0ZWQgYnRuTG9naW46IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcm90ZWN0ZWQgbm9kVXNlckluZm86IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcm90ZWN0ZWQgaW1nQXZhdGFyOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByb3RlY3RlZCBsYWJVc2VyTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcm90ZWN0ZWQgaW1nR29sZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcm90ZWN0ZWQgbGFiR29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8g55So5oi35pWw5o2uXG4gICAgcHJvdGVjdGVkIF91c2VyRGF0YTogVXNlckRhdGEgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFVJKClcbiAgICAgICAgdGhpcy5yZWZyZXNoVXNlcigpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfR29sZENoYW5nZV9NZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19Hb2xkQ2hhbmdlX01lcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX01vZGlmeUF2YXJ0YXInLCB0aGlzLm9uUmVmcmVzaFVzZXJJbmZvKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwidXBkYXRlVXNlckluZm9cIiwgdGhpcy5vblJlZnJlc2hVc2VySW5mbylcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3VzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRVSSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJQYWdlTmFtZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmJ0bkxvZ2luLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kVXNlckluZm8uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1nQXZhdGFyLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYWJHb2xkLnN0cmluZyA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHVibGljIG9uUmVmcmVzaFVzZXJJbmZvKCkge1xuICAgICAgICB0aGlzLnJlZnJlc2hVc2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBhZ2VOYW1lKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYlBhZ2VOYW1lLnN0cmluZyA9IG5hbWU7XG4gICAgfVxuXG4gICAgcHVibGljIGxhbmd1YWdlUGFnZU5hbWUoaTE4bjogKHN0cmluZyB8IG51bWJlcilbXSB8IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYlBhZ2VOYW1lLmxhbmd1YWdlID0gaTE4bjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVmcmVzaFVzZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnRuTG9naW4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RVc2VySW5mby5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLmlzTG9naW5lZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZFVzZXJJbmZvLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hBdmF0YXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEdvbGQoKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaE5pY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnRuTG9naW4ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hBdmF0YXIoKTogdm9pZCB7XG4gICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcodGhpcy5pbWdBdmF0YXIsIHRoaXMuX3VzZXJEYXRhLmluZm8uSGVhZGVyVXJsLCB0aGlzLl91c2VyRGF0YS5pbmZvLlVuaXRJZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZnJlc2hHb2xkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkdvbGQuc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKE51bWJlcih0aGlzLl91c2VyRGF0YS5pbmZvLkdvbGQpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVmcmVzaE5pY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiVXNlck5hbWUuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcodGhpcy5fdXNlckRhdGEuaW5mby5OaWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bph5HluIHkuJbnlYzlnZDmoIdcbiAgICAgKiBAcmV0dXJucyB7Y2MuVmVjMn1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0R29sZFdvcmxkUG9zKCk6IGNjLlZlYzIge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWdHb2xkLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudF9NMkNfR29sZENoYW5nZV9NZXMob2xkR29sZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaEdvbGQoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidG5Mb2dpblwiOlxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBMb2dpbk5ld1ZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5CdXlHb2xkXCI6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFJlY2hhcmdlTmV3VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==