
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/turntable/AwardWinningView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6fd8djJ9BZLZbFUQbeiEecx', 'AwardWinningView');
// script/turntable/AwardWinningView.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const Framework_1 = require("../framework/Framework");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const android_1 = require("../platform/android");
const AddressView_1 = __importDefault(require("./AddressView"));
const { ccclass, property } = cc._decorator;
let AwardWinningView = class AwardWinningView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btn_share = null;
        this.btn_spinAgain = null;
        this.btn_address = null;
        this.spr_Prize = null;
        this.winNode = null;
        this.loseNode = null;
        this.prizeName = null;
        this.awardData = null;
        this.prizeData = null;
    }
    static getPrefabUrl() {
        return "turntable/prefab/AwardWinningView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    start() {
        this.updateView();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.awardData = args[0];
        }
        if (args && args[1]) {
            this.prizeData = args[1];
        }
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("UPDATE_PRIZE_RECORD", this.changeBtnStuate);
    }
    onClick(name, node) {
        switch (name) {
            case "mask":
            case "close":
                this.closeWithAction();
                break;
            case "btn_share":
                this.shareToFacebook();
                break;
            case "btn_spinAgain":
                this.closeWithAction();
                break;
            case "btn_address":
                Framework_1.Manager.uiManager.open({ type: AddressView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this.awardData.id] });
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    shareToFacebook() {
        window['platformUtil'].shareToFacebook(android_1.shareType.PHOTO, User_1.User._promoteUrl, User_1.User._shareImgUrl);
    }
    updateView() {
        if (this.awardData) {
            this.btn_address.active = false;
            this.btn_share.active = false;
            this.btn_spinAgain.active = false;
            switch (this.awardData.rewardType) { // 奖励类型 1=实物,2=筹码,3=未中奖
                case 1:
                    this.btn_address.active = true;
                    this.btn_share.active = true;
                    break;
                case 2:
                    this.btn_share.active = true;
                    break;
                case 4:
                    this.btn_spinAgain.active = true;
                    break;
                default:
                    break;
            }
            this.spr_Prize.loadRemoteImage({ url: this.prizeData.picUrl, view: this, defaultSpriteFrame: "turntable/image/10", bundle: Defines_1.BUNDLE_RESOURCES });
            this.prizeName.string = this.prizeData.goodsName;
            this.loseNode.active = this.awardData.rewardType == 3;
            this.winNode.active = !this.loseNode.active;
        }
    }
    changeBtnStuate() {
        this.btn_address.active = false;
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "btn_share", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "btn_spinAgain", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "btn_address", void 0);
__decorate([
    property(cc.Sprite)
], AwardWinningView.prototype, "spr_Prize", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "winNode", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "loseNode", void 0);
__decorate([
    property(cc.Label)
], AwardWinningView.prototype, "prizeName", void 0);
AwardWinningView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AwardWinningView);
exports.default = AwardWinningView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdHVybnRhYmxlL0F3YXJkV2lubmluZ1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2REFBMEQ7QUFDMUQsdURBQTZEO0FBRTdELGtFQUFrRTtBQUVsRSxzREFBaUQ7QUFDakQsb0VBQTRDO0FBQzVDLHlDQUFzQztBQUN0QyxpREFBZ0Q7QUFDaEQsZ0VBQXdDO0FBRXhDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsZ0JBQU07SUFBcEQ7O1FBTUksY0FBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLGNBQVMsR0FBNkMsSUFBSSxDQUFDO1FBQzNELGNBQVMsR0FBOEMsSUFBSSxDQUFDO0lBOEVoRSxDQUFDO0lBNUVVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sbUNBQW1DLENBQUM7SUFDL0MsQ0FBQztJQUNELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXZELENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FB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QUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDL0M7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRUQsU0FBUztRQUNMLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBQ0osQ0FBQTtBQW5HRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNRO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1k7QUFHOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtBQUc1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0FBRzVCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ007QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTztBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNRO0FBeEJWLGdCQUFnQjtJQUZwQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixnQkFBZ0IsQ0F5R3BDO2tCQXpHb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9GcmFtZXdvcmtcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IHNoYXJlVHlwZSB9IGZyb20gXCIuLi9wbGF0Zm9ybS9hbmRyb2lkXCI7XG5pbXBvcnQgQWRkcmVzc1ZpZXcgZnJvbSBcIi4vQWRkcmVzc1ZpZXdcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF3YXJkV2lubmluZ1ZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuX3NoYXJlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9zcGluQWdhaW46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuX2FkZHJlc3M6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzcHJfUHJpemU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aW5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvc2VOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml6ZU5hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIGF3YXJkRGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUGxheVR1cm50YWJsZVJlcyA9IG51bGw7XG4gICAgcHJpemVEYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklBY3Rpdml0eVR1cm50YWJsZSA9IG51bGw7XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInR1cm50YWJsZS9wcmVmYWIvQXdhcmRXaW5uaW5nVmlld1wiO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgaWYgKGFyZ3MgJiYgYXJnc1swXSkge1xuICAgICAgICAgICAgdGhpcy5hd2FyZERhdGEgPSBhcmdzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3NbMV0pIHtcbiAgICAgICAgICAgIHRoaXMucHJpemVEYXRhID0gYXJnc1sxXTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJVUERBVEVfUFJJWkVfUkVDT1JEXCIsIHRoaXMuY2hhbmdlQnRuU3R1YXRlKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwibWFza1wiOlxuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bl9zaGFyZVwiOiB0aGlzLnNoYXJlVG9GYWNlYm9vaygpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5fc3BpbkFnYWluXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bl9hZGRyZXNzXCI6IE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBBZGRyZXNzVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbdGhpcy5hd2FyZERhdGEuaWRdIH0pOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IEcuTG9nZ2VyLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHNoYXJlVG9GYWNlYm9vaygpIHtcbiAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5zaGFyZVRvRmFjZWJvb2soc2hhcmVUeXBlLlBIT1RPLCBVc2VyLl9wcm9tb3RlVXJsLCBVc2VyLl9zaGFyZUltZ1VybCk7XG4gICAgfVxuICAgIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGlmICh0aGlzLmF3YXJkRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5idG5fYWRkcmVzcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYnRuX3NoYXJlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5idG5fc3BpbkFnYWluLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmF3YXJkRGF0YS5yZXdhcmRUeXBlKSB7Ly8g5aWW5Yqx57G75Z6LIDE95a6e54mpLDI9562556CBLDM95pyq5Lit5aWWXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9hZGRyZXNzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuX3NoYXJlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5fc2hhcmUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9zcGluQWdhaW4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNwcl9Qcml6ZS5sb2FkUmVtb3RlSW1hZ2UoeyB1cmw6IHRoaXMucHJpemVEYXRhLnBpY1VybCwgdmlldzogdGhpcywgZGVmYXVsdFNwcml0ZUZyYW1lOiBcInR1cm50YWJsZS9pbWFnZS8xMFwiLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSlcbiAgICAgICAgICAgIHRoaXMucHJpemVOYW1lLnN0cmluZyA9IHRoaXMucHJpemVEYXRhLmdvb2RzTmFtZTtcbiAgICAgICAgICAgIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdGhpcy5hd2FyZERhdGEucmV3YXJkVHlwZSA9PSAzO1xuICAgICAgICAgICAgdGhpcy53aW5Ob2RlLmFjdGl2ZSA9ICF0aGlzLmxvc2VOb2RlLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZUJ0blN0dWF0ZSgpIHtcbiAgICAgICAgdGhpcy5idG5fYWRkcmVzcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==