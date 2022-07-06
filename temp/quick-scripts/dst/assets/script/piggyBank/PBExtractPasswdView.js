
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PBExtractPasswdView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b1861msIH9JZ4RHTV7kew48', 'PBExtractPasswdView');
// script/piggyBank/PBExtractPasswdView.ts

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
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const PBPasswdComponent_1 = __importDefault(require("./PBPasswdComponent"));
const { ccclass, property } = cc._decorator;
const MAX_DIGIT = 6;
let PBExtractPasswdView = class PBExtractPasswdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.edbPasswd1 = null;
        this.edbComponent1 = null;
        this.m_data = null;
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBExtractPasswdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    bindingEvents() {
        this.registerEvent("EVENT_EXTRACT_SUCCEED", this.onExtractSucceed);
    }
    show(data) {
        super.show(data);
        this.init();
        this.showWithAction(true);
        this.m_data = data[0];
    }
    initView() {
        this.edbPasswd1.string = "";
        this.edbComponent1 = this.edbPasswd1.getComponent(PBPasswdComponent_1.default);
    }
    initData() {
        this.m_data = null;
    }
    init() {
        this.initData();
        this.initView();
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
    onClickConfirm() {
        this.playDefaultEffect();
        if (!this.isPasswordDigit()) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }
        let req = CommonService_1.protoPackage.hall.ExtractAmountReq.create({ id: this.m_data.id, passwd: this.edbComponent1.string });
        let buffer = CommonService_1.protoPackage.hall.ExtractAmountReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT, buffer);
    }
    onExtractSucceed() {
        this.init();
        this.onClickClose();
    }
    /**
     * 是否6满足位数
     */
    isPasswordDigit() {
        let str1 = this.edbComponent1.string;
        if (str1.length !== MAX_DIGIT) {
            return false;
        }
        return true;
    }
};
__decorate([
    property(cc.EditBox)
], PBExtractPasswdView.prototype, "edbPasswd1", void 0);
PBExtractPasswdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBExtractPasswdView);
exports.default = PBExtractPasswdView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BCRXh0cmFjdFBhc3N3ZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBdUQ7QUFDdkQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUMxRCxrRUFBa0U7QUFDbEUsb0VBQTRDO0FBQzVDLG9FQUE0QztBQUM1Qyw0RUFBb0Q7QUFFcEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLE1BQU0sU0FBUyxHQUFXLENBQUMsQ0FBQztBQUk1QixJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsZ0JBQU07SUFBdkQ7O1FBSVksZUFBVSxHQUFlLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFzQixJQUFJLENBQUM7UUFFeEMsV0FBTSxHQUFHLElBQUksQ0FBQztJQTZFMUIsQ0FBQztJQTNFVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLHVDQUF1QyxDQUFDO0lBQ25ELENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQUk7UUFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywyQkFBaUIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDekIsbUJBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN2RCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLEdBQUcsR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvRyxJQUFJLE1BQU0sR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQ2pDLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDNUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxlQUFlO1FBQ25CLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTtBQWpGRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3VEQUNpQjtBQUpyQixtQkFBbUI7SUFGdkMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsbUJBQW1CLENBcUZ2QztrQkFyRm9CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IFBCUGFzc3dkQ29tcG9uZW50IGZyb20gXCIuL1BCUGFzc3dkQ29tcG9uZW50XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmNvbnN0IE1BWF9ESUdJVDogbnVtYmVyID0gNjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBCRXh0cmFjdFBhc3N3ZFZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHByaXZhdGUgZWRiUGFzc3dkMTogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGVkYkNvbXBvbmVudDE6IFBCUGFzc3dkQ29tcG9uZW50ID0gbnVsbDtcblxuICAgIHByaXZhdGUgbV9kYXRhID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJwaWdneUJhbmsvcHJlZmFicy9QQkV4dHJhY3RQYXNzd2RWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbWdCZycpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRVZFTlRfRVhUUkFDVF9TVUNDRUVEXCIsIHRoaXMub25FeHRyYWN0U3VjY2VlZCk7XG4gICAgfVxuXG4gICAgc2hvdyhkYXRhKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNob3coZGF0YSk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuXG4gICAgICAgIHRoaXMubV9kYXRhID0gZGF0YVswXTtcbiAgICB9XG5cbiAgICBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lZGJQYXNzd2QxLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMuZWRiQ29tcG9uZW50MSA9IHRoaXMuZWRiUGFzc3dkMS5nZXRDb21wb25lbnQoUEJQYXNzd2RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fZGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgfVxuXG4gICAgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KFwiY2xvc2VcIik7XG4gICAgICAgIHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7XG4gICAgfVxuXG4gICAgb25DbGlja0NvbmZpcm0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoKTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNQYXNzd29yZERpZ2l0KCkpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uUElHR1lfQkFOSy5QQVNTV09SRF9JTkNPTVBMRVRFKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5FeHRyYWN0QW1vdW50UmVxLmNyZWF0ZSh7IGlkOiB0aGlzLm1fZGF0YS5pZCwgcGFzc3dkOiB0aGlzLmVkYkNvbXBvbmVudDEuc3RyaW5nIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuRXh0cmFjdEFtb3VudFJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0VYVFJBQ1RfQU1PVU5ULFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBvbkV4dHJhY3RTdWNjZWVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5vbkNsaWNrQ2xvc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKY25ruh6Laz5L2N5pWwXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1Bhc3N3b3JkRGlnaXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBzdHIxOiBzdHJpbmcgPSB0aGlzLmVkYkNvbXBvbmVudDEuc3RyaW5nO1xuICAgICAgICBpZiAoc3RyMS5sZW5ndGggIT09IE1BWF9ESUdJVCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIl19