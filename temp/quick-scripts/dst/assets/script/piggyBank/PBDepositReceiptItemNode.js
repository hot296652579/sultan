
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PBDepositReceiptItemNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '97fbexwxANJSI6epkb6mgni', 'PBDepositReceiptItemNode');
// script/piggyBank/PBDepositReceiptItemNode.ts

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
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const DateUtils_1 = __importDefault(require("../framework/extentions/DateUtils"));
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const { ccclass, property } = cc._decorator;
let DepositReceiptItemNode = class DepositReceiptItemNode extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labTime = null;
        this.labOperationAmount = null;
        this.labInterestRate = null;
        this.labExpectedReturn = null;
        this.labTimeLeft = null;
        this.labTransferredOut = null;
        this.labCancelled = null;
        this.btnTransferOut = null;
        this.btnCancel = null;
        this.m_data = null;
    }
    onLoad() {
        super.onLoad();
        this.initView();
        this.updateView();
    }
    start() {
        this.labCancelled.language = LanguageImpl_1.i18n.PIGGY_BANK.CANCELED;
        this.labTransferredOut.language = LanguageImpl_1.i18n.PIGGY_BANK.TRANSFERREDOUT;
    }
    get data() {
        return this.m_data;
    }
    setData(data) {
        this.m_data = data;
    }
    setStatus(status) {
        this.m_data.status = status;
        this.initStatus();
        this.updateStatus(status);
    }
    initView() {
        this.labTime.string = "";
        this.labOperationAmount.string = "";
        this.labInterestRate.string = "";
        this.labExpectedReturn.string = "";
        this.labTimeLeft.string = "";
        this.initStatus();
    }
    initStatus() {
        this.labTransferredOut.node.active = false;
        this.labCancelled.node.active = false;
        this.btnTransferOut.node.active = false;
        this.btnCancel.node.active = false;
    }
    updateView() {
        this.labTime.string = DateUtils_1.default.getMDHM(this.m_data.timestamp);
        this.labOperationAmount.string = UtilMgr_1.UtilMgr.changeMoney(Number(this.m_data.amount));
        this.labInterestRate.string = `${this.m_data.rate / 100}%`;
        this.labExpectedReturn.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.expectedIncome);
        this.labTimeLeft.string = DateUtils_1.default.getRemainTimeDH((new Date()).getTime(), Number(this.m_data.incomeDeadline));
        this.updateStatus(this.m_data.status);
    }
    updateStatus(status) {
        switch (status) {
            case protoc_1.com.bt.game.proto.hall.IncomeBreakdownStatus.CANCELABLE:
                this.btnCancel.node.active = true;
                break;
            case protoc_1.com.bt.game.proto.hall.IncomeBreakdownStatus.CANCELED:
                this.labCancelled.node.active = true;
                break;
            case protoc_1.com.bt.game.proto.hall.IncomeBreakdownStatus.EXTRACTABLE:
                this.btnTransferOut.node.active = true;
                break;
            case protoc_1.com.bt.game.proto.hall.IncomeBreakdownStatus.EXTRACED:
                this.labTransferredOut.node.active = true;
                break;
        }
    }
    onClick(name) {
        switch (name) {
            case "btnCancel":
                this.onClickCancel();
                break;
            case "btnTransferOut":
                this.onClickExtract();
                break;
        }
    }
    onClickCancel() {
        this.playDefaultEffect();
        let req = CommonService_1.protoPackage.hall.CancelStoredAmountReq.create({ id: this.m_data.id });
        let buffer = CommonService_1.protoPackage.hall.CancelStoredAmountReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CANCEL_STORED_AMOUNT, buffer);
    }
    onClickExtract() {
        this.playDefaultEffect();
        let req = CommonService_1.protoPackage.hall.ExtractAmountReq.create({ id: this.m_data.id, passwd: "" });
        let buffer = CommonService_1.protoPackage.hall.ExtractAmountReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT, buffer);
        // Manager.uiManager.open({ type: PBExtractPasswdView, bundle: BUNDLE_RESOURCES, args: [this.m_data] });
    }
};
__decorate([
    property(cc.Label)
], DepositReceiptItemNode.prototype, "labTime", void 0);
__decorate([
    property(cc.Label)
], DepositReceiptItemNode.prototype, "labOperationAmount", void 0);
__decorate([
    property(cc.Label)
], DepositReceiptItemNode.prototype, "labInterestRate", void 0);
__decorate([
    property(cc.Label)
], DepositReceiptItemNode.prototype, "labExpectedReturn", void 0);
__decorate([
    property(cc.Label)
], DepositReceiptItemNode.prototype, "labTimeLeft", void 0);
__decorate([
    property(cc.Label)
], DepositReceiptItemNode.prototype, "labTransferredOut", void 0);
__decorate([
    property(cc.Label)
], DepositReceiptItemNode.prototype, "labCancelled", void 0);
__decorate([
    property(cc.Button)
], DepositReceiptItemNode.prototype, "btnTransferOut", void 0);
__decorate([
    property(cc.Button)
], DepositReceiptItemNode.prototype, "btnCancel", void 0);
DepositReceiptItemNode = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], DepositReceiptItemNode);
exports.default = DepositReceiptItemNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BCRGVwb3NpdFJlY2VpcHRJdGVtTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFFMUQsa0VBQWtFO0FBQ2xFLGtGQUEwRDtBQUMxRCx5REFBbUQ7QUFDbkQsb0VBQTRDO0FBQzVDLCtDQUE0QztBQUU1QyxrRUFBdUQ7QUFFdkQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLHNCQUFzQixHQUEzQyxNQUFxQixzQkFBdUIsU0FBUSxnQkFBTTtJQUExRDs7UUFJSSxZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLHVCQUFrQixHQUFhLElBQUksQ0FBQztRQUdwQyxvQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxzQkFBaUIsR0FBYSxJQUFJLENBQUM7UUFHbkMsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0Isc0JBQWlCLEdBQWEsSUFBSSxDQUFDO1FBR25DLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLG1CQUFjLEdBQWMsSUFBSSxDQUFDO1FBR2pDLGNBQVMsR0FBYyxJQUFJLENBQUM7UUFFcEIsV0FBTSxHQUFnRCxJQUFJLENBQUM7SUFzR3ZFLENBQUM7SUFuR0csTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxtQkFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDdEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxtQkFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDckUsQ0FBQztJ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ZXNDb250ZW50IjpbImltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgRGF0ZVV0aWxzIGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgUEJFeHRyYWN0UGFzc3dkVmlldyBmcm9tIFwiLi9QQkV4dHJhY3RQYXNzd2RWaWV3XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcG9zaXRSZWNlaXB0SXRlbU5vZGUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJUaW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiT3BlcmF0aW9uQW1vdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiSW50ZXJlc3RSYXRlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiRXhwZWN0ZWRSZXR1cm46IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJUaW1lTGVmdDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYlRyYW5zZmVycmVkT3V0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiQ2FuY2VsbGVkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ0blRyYW5zZmVyT3V0OiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBidG5DYW5jZWw6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1fZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JSW5jb21lQnJlYWtkb3duSW5mbyA9IG51bGw7XG5cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubGFiQ2FuY2VsbGVkLmxhbmd1YWdlID0gaTE4bi5QSUdHWV9CQU5LLkNBTkNFTEVEO1xuICAgICAgICB0aGlzLmxhYlRyYW5zZmVycmVkT3V0Lmxhbmd1YWdlID0gaTE4bi5QSUdHWV9CQU5LLlRSQU5TRkVSUkVET1VUO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklJbmNvbWVCcmVha2Rvd25JbmZvIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubV9kYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREYXRhKGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUluY29tZUJyZWFrZG93bkluZm8pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX2RhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdGF0dXMoc3RhdHVzOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLkluY29tZUJyZWFrZG93blN0YXR1cyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fZGF0YS5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuaW5pdFN0YXR1cygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cyhzdGF0dXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiVGltZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYk9wZXJhdGlvbkFtb3VudC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkludGVyZXN0UmF0ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkV4cGVjdGVkUmV0dXJuLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiVGltZUxlZnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5pbml0U3RhdHVzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U3RhdHVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYlRyYW5zZmVycmVkT3V0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGFiQ2FuY2VsbGVkLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnRuVHJhbnNmZXJPdXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiVGltZS5zdHJpbmcgPSBEYXRlVXRpbHMuZ2V0TURITSh0aGlzLm1fZGF0YS50aW1lc3RhbXApO1xuICAgICAgICB0aGlzLmxhYk9wZXJhdGlvbkFtb3VudC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KE51bWJlcih0aGlzLm1fZGF0YS5hbW91bnQpKTtcbiAgICAgICAgdGhpcy5sYWJJbnRlcmVzdFJhdGUuc3RyaW5nID0gYCR7dGhpcy5tX2RhdGEucmF0ZSAvIDEwMH0lYDtcbiAgICAgICAgdGhpcy5sYWJFeHBlY3RlZFJldHVybi5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KHRoaXMubV9kYXRhLmV4cGVjdGVkSW5jb21lKTtcbiAgICAgICAgdGhpcy5sYWJUaW1lTGVmdC5zdHJpbmcgPSBEYXRlVXRpbHMuZ2V0UmVtYWluVGltZURIKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCksIE51bWJlcih0aGlzLm1fZGF0YS5pbmNvbWVEZWFkbGluZSkpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cyh0aGlzLm1fZGF0YS5zdGF0dXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU3RhdHVzKHN0YXR1czogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JbmNvbWVCcmVha2Rvd25TdGF0dXMpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JbmNvbWVCcmVha2Rvd25TdGF0dXMuQ0FOQ0VMQUJMRTpcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkNhbmNlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSW5jb21lQnJlYWtkb3duU3RhdHVzLkNBTkNFTEVEOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiQ2FuY2VsbGVkLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JbmNvbWVCcmVha2Rvd25TdGF0dXMuRVhUUkFDVEFCTEU6XG4gICAgICAgICAgICAgICAgdGhpcy5idG5UcmFuc2Zlck91dC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSW5jb21lQnJlYWtkb3duU3RhdHVzLkVYVFJBQ0VEOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiVHJhbnNmZXJyZWRPdXQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2FuY2VsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrQ2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuVHJhbnNmZXJPdXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tFeHRyYWN0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrQ2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KCk7XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5DYW5jZWxTdG9yZWRBbW91bnRSZXEuY3JlYXRlKHsgaWQ6IHRoaXMubV9kYXRhLmlkIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuQ2FuY2VsU3RvcmVkQW1vdW50UmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ0FOQ0VMX1NUT1JFRF9BTU9VTlQsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uQ2xpY2tFeHRyYWN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KCk7XG5cbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLkV4dHJhY3RBbW91bnRSZXEuY3JlYXRlKHsgaWQ6IHRoaXMubV9kYXRhLmlkLCBwYXNzd2Q6IFwiXCIgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5FeHRyYWN0QW1vdW50UmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfRVhUUkFDVF9BTU9VTlQsXG4gICAgICAgICAgICBidWZmZXIpO1xuXG4gICAgICAgIC8vIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBQQkV4dHJhY3RQYXNzd2RWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IFt0aGlzLm1fZGF0YV0gfSk7XG4gICAgfVxuXG59XG4iXX0=