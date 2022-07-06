
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PiggyBankView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3c58cPIE2FKm5IsS+uR/dZN', 'PiggyBankView');
// script/piggyBank/PiggyBankView.ts

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
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PBChangePasswdView_1 = __importDefault(require("./PBChangePasswdView"));
const PBDepositReceiptView_1 = __importDefault(require("./PBDepositReceiptView"));
const PBHelpView_1 = __importDefault(require("./PBHelpView"));
const PBTransferInView_1 = __importDefault(require("./PBTransferInView"));
const PiggyBankData_1 = __importDefault(require("./PiggyBankData"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const User_1 = require("../global/User");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let PiggyBankView = class PiggyBankView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDepositAmountValue = null;
        this.labTotalRevenueValue = null;
        this.labRateValue = null;
        this.labConfirmedAmountValue = null;
        this.labAyerIncomeValue = null;
        this.imgGridding = null;
        this.m_data = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PiggyBankView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
        if (this.imgGridding) {
            let labTotalRevenue = cc.find('labTotalRevenue', this.imgGridding);
            labTotalRevenue.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.TOTAL_INCOME;
            let labRate = cc.find('labRate', this.imgGridding);
            labRate.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.RATE;
            let labConfirmedAmount = cc.find('labConfirmedAmount', this.imgGridding);
            labConfirmedAmount.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.COMFIRMED_AMOUNT;
            let labAyerIncome = cc.find('labAyerIncome', this.imgGridding);
            labAyerIncome.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.YESTERDAY_INCOME;
        }
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("CMD_UPDATE_PIGGY_BANK_DATA", this.onUpdatePiggyBank);
    }
    show(data) {
        super.show(data);
        this.showWithAction(true);
        PiggyBankData_1.default.getInstance().data = data;
        this.m_data = data;
        this.updateView();
    }
    onUpdatePiggyBank() {
        this.m_data = PiggyBankData_1.default.getInstance().data;
        this.updateView();
    }
    updateView() {
        this.labDepositAmountValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.amount);
        this.labTotalRevenueValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.income);
        this.labRateValue.string = `${this.m_data.rate / 100}%`;
        this.labConfirmedAmountValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.confirmAmount);
        this.labAyerIncomeValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.ayerIncome);
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
    onClickHelp() {
        this.playDefaultEffect();
        Manager_1.Manager.uiManager.open({ type: PBHelpView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClickTransferIn() {
        this.playDefaultEffect();
        if (!User_1.User.isRechargedPlayer)
            return PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EXPERIENCE_FIELD.hintRecharge);
        Manager_1.Manager.uiManager.open({ type: PBTransferInView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClickChangePasswd() {
        this.playDefaultEffect();
        Manager_1.Manager.uiManager.open({ type: PBChangePasswdView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClickDepositReceipt() {
        this.playDefaultEffect();
        Manager_1.Manager.uiManager.open({ type: PBDepositReceiptView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
};
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labDepositAmountValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labTotalRevenueValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labRateValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labConfirmedAmountValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labAyerIncomeValue", void 0);
__decorate([
    property(cc.Node)
], PiggyBankView.prototype, "imgGridding", void 0);
PiggyBankView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PiggyBankView);
exports.default = PiggyBankView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BpZ2d5QmFua1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBb0Q7QUFDcEQsNkRBQTBEO0FBQzFELHVEQUE2RDtBQUM3RCxrRUFBa0U7QUFDbEUsb0VBQTRDO0FBQzVDLCtDQUE0QztBQUM1Qyw4RUFBc0Q7QUFDdEQsa0ZBQTBEO0FBQzFELDhEQUFzQztBQUN0QywwRUFBa0Q7QUFDbEQsb0VBQTRDO0FBQzVDLGtFQUF1RDtBQUN2RCx5Q0FBc0M7QUFDdEMsb0VBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixhQUFhLEdBQWxDLE1BQXFCLGFBQWMsU0FBUSxnQkFBTTtJQUFqRDs7UUFHWSwwQkFBcUIsR0FBYSxJQUFJLENBQUM7UUFHdkMseUJBQW9CLEdBQWEsSUFBSSxDQUFDO1FBR3RDLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLDRCQUF1QixHQUFhLElBQUksQ0FBQztRQUd6Qyx1QkFBa0IsR0FBYSxJQUFJLENBQUM7UUFHNUMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFcEIsV0FBTSxHQUFRLElBQUksQ0FBQztRQWlGM0IsaUJBQWlCO0lBQ3JCLENBQUM7SUFoRlUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxpQ0FBaUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJ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QUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixhQUFhLENBc0dqQztrQkF0R29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBCQ2hhbmdlUGFzc3dkVmlldyBmcm9tIFwiLi9QQkNoYW5nZVBhc3N3ZFZpZXdcIjtcbmltcG9ydCBQQkRlcG9zaXRSZWNlaXB0VmlldyBmcm9tIFwiLi9QQkRlcG9zaXRSZWNlaXB0Vmlld1wiO1xuaW1wb3J0IFBCSGVscFZpZXcgZnJvbSBcIi4vUEJIZWxwVmlld1wiO1xuaW1wb3J0IFBCVHJhbnNmZXJJblZpZXcgZnJvbSBcIi4vUEJUcmFuc2ZlckluVmlld1wiO1xuaW1wb3J0IFBpZ2d5QmFua0RhdGEgZnJvbSBcIi4vUGlnZ3lCYW5rRGF0YVwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWdneUJhbmtWaWV3IGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkRlcG9zaXRBbW91bnRWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiVG90YWxSZXZlbnVlVmFsdWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJhdGVWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ29uZmlybWVkQW1vdW50VmFsdWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkF5ZXJJbmNvbWVWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaW1nR3JpZGRpbmc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtX2RhdGE6IGFueSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwicGlnZ3lCYW5rL3ByZWZhYnMvUGlnZ3lCYW5rVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW1nQmcnKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW1nR3JpZGRpbmcpIHtcbiAgICAgICAgICAgIGxldCBsYWJUb3RhbFJldmVudWUgPSBjYy5maW5kKCdsYWJUb3RhbFJldmVudWUnLCB0aGlzLmltZ0dyaWRkaW5nKVxuICAgICAgICAgICAgbGFiVG90YWxSZXZlbnVlLmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBpMThuLlBJR0dZX0JBTksuVE9UQUxfSU5DT01FO1xuXG4gICAgICAgICAgICBsZXQgbGFiUmF0ZSA9IGNjLmZpbmQoJ2xhYlJhdGUnLCB0aGlzLmltZ0dyaWRkaW5nKVxuICAgICAgICAgICAgbGFiUmF0ZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gaTE4bi5QSUdHWV9CQU5LLlJBVEU7XG5cbiAgICAgICAgICAgIGxldCBsYWJDb25maXJtZWRBbW91bnQgPSBjYy5maW5kKCdsYWJDb25maXJtZWRBbW91bnQnLCB0aGlzLmltZ0dyaWRkaW5nKVxuICAgICAgICAgICAgbGFiQ29uZmlybWVkQW1vdW50LmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBpMThuLlBJR0dZX0JBTksuQ09NRklSTUVEX0FNT1VOVDtcblxuICAgICAgICAgICAgbGV0IGxhYkF5ZXJJbmNvbWUgPSBjYy5maW5kKCdsYWJBeWVySW5jb21lJywgdGhpcy5pbWdHcmlkZGluZylcbiAgICAgICAgICAgIGxhYkF5ZXJJbmNvbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5sYW5ndWFnZSA9IGkxOG4uUElHR1lfQkFOSy5ZRVNURVJEQVlfSU5DT01FO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkNNRF9VUERBVEVfUElHR1lfQkFOS19EQVRBXCIsIHRoaXMub25VcGRhdGVQaWdneUJhbmspO1xuICAgIH1cblxuICAgIHNob3coZGF0YSk6IHZvaWQge1xuICAgICAgICBzdXBlci5zaG93KGRhdGEpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuICAgICAgICBQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5tX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBvblVwZGF0ZVBpZ2d5QmFuaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX2RhdGEgPSBQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YTtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJEZXBvc2l0QW1vdW50VmFsdWUuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leSh0aGlzLm1fZGF0YS5hbW91bnQpO1xuICAgICAgICB0aGlzLmxhYlRvdGFsUmV2ZW51ZVZhbHVlLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkodGhpcy5tX2RhdGEuaW5jb21lKTtcbiAgICAgICAgdGhpcy5sYWJSYXRlVmFsdWUuc3RyaW5nID0gYCR7dGhpcy5tX2RhdGEucmF0ZSAvIDEwMH0lYDtcbiAgICAgICAgdGhpcy5sYWJDb25maXJtZWRBbW91bnRWYWx1ZS5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KHRoaXMubV9kYXRhLmNvbmZpcm1BbW91bnQpO1xuICAgICAgICB0aGlzLmxhYkF5ZXJJbmNvbWVWYWx1ZS5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KHRoaXMubV9kYXRhLmF5ZXJJbmNvbWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbGF5RGVmYXVsdEVmZmVjdChcImNsb3NlXCIpO1xuICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgIH1cblxuICAgIG9uQ2xpY2tIZWxwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KCk7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBQQkhlbHBWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuXG4gICAgb25DbGlja1RyYW5zZmVySW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoKTtcbiAgICAgICAgaWYgKCFVc2VyLmlzUmVjaGFyZ2VkUGxheWVyKSByZXR1cm4gUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FWFBFUklFTkNFX0ZJRUxELmhpbnRSZWNoYXJnZSlcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFBCVHJhbnNmZXJJblZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICB9XG5cbiAgICBvbkNsaWNrQ2hhbmdlUGFzc3dkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KCk7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBQQkNoYW5nZVBhc3N3ZFZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICB9XG5cbiAgICBvbkNsaWNrRGVwb3NpdFJlY2VpcHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoKTtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFBCRGVwb3NpdFJlY2VpcHRWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==