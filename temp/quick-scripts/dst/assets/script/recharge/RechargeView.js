
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/recharge/RechargeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4fbff4WettKG4zmJGjap0rk', 'RechargeView');
// script/recharge/RechargeView.ts

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
const GoodsItem_1 = __importDefault(require("./GoodsItem"));
const Defines_1 = require("../framework/base/Defines");
const RechargeOrderView_1 = __importDefault(require("./RechargeOrderView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RechargeView = class RechargeView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this.goodsItem = null;
        this.rechargePanel = null;
        this.recordPanel = null;
        this._nodePool = null;
        this._insItemCount = 8;
        this._goodsList = [];
        this.selectIndex = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "recharge/prefabs/RechargeView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this._nodePool = new cc.NodePool();
        for (let i = 0; i < this._insItemCount; i++) {
            let goodsItem = cc.instantiate(this.goodsItem);
            this._nodePool.put(goodsItem);
        }
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FETCH_PROUCTS), this.refreshList);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_PAY_CHANNEL_LIST), this.onPayChannelListRes);
    }
    refreshList(data) {
        cc.log(data, "Recharge");
        if (data) {
            if (data.statusMsg.status == 0) {
                this.rechargeView(data);
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    rechargeView(data) {
        let goodsList = data.product;
        if (goodsList.length > 0) {
            this._goodsList = goodsList;
            this.scrollView.enabled = goodsList.length > this._insItemCount;
            for (let i = 0; i < goodsList.length; i++) {
                let goodsItem = this.getGoodsItem();
                goodsItem.parent = this.scrollView.content;
                goodsItem.getComponent(GoodsItem_1.default).init(this, goodsList[i], i);
            }
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.RECHARGE.NOGOODS);
        }
    }
    getGoodsItem() {
        let goodsItem = null;
        if (this._nodePool.size() > 0) {
            goodsItem = this._nodePool.get();
        }
        else {
            goodsItem = cc.instantiate(this.goodsItem);
        }
        return goodsItem;
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        this.changgePanel(false);
    }
    onClick(name, node) {
        switch (name) {
            case 'recharge': ;
            case 'rechargeRecord':
                this.changgePanel(name == 'rechargeRecord');
                break;
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    changgePanel(isRecord) {
        this.recordPanel.active = isRecord;
        this.rechargePanel.active = !this.recordPanel.active;
    }
    onClickGoodsItem(itemId) {
        if (User_1.User._phone.length > 0) {
            this.selectIndex = itemId;
            let productNo = this._goodsList[itemId].productNo;
            // this.reqRecharge(productNo)
            this.reqChannel();
            this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        }
        else {
            PanelHelp_1.default.showMsgBoxIcon("", LanguageImpl_1.i18n.WITHDRAWAL.NOBINDPHONETIP, () => {
            }, LanguageImpl_1.i18n.WITHDRAWAL.GOTOBINDPHONE);
        }
    }
    reqChannel() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_PAY_CHANNEL_LIST, null);
    }
    reqRecharge(productNo) {
        let req = CommonService_1.protoPackage.hall.FetchHwPayRequestId.create({ productNo: productNo });
        let buffer = CommonService_1.protoPackage.hall.FetchHwPayRequestId.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID, buffer);
    }
    refreshRecharge() {
        let req = CommonService_1.protoPackage.hall.FetchProducts.create({});
        let buffer = CommonService_1.protoPackage.hall.FetchProducts.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FETCH_PROUCTS, buffer);
    }
    start() {
        this.refreshRecharge();
    }
    onPayChannelListRes(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        Manager_1.Manager.uiManager.open({ type: RechargeOrderView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data.payChannelList, this._goodsList[this.selectIndex], this.selectIndex] });
    }
    onDestroy() {
        super.onDestroy();
        UtilMgr_1.UtilMgr.popWindows();
    }
};
__decorate([
    property(cc.ScrollView)
], RechargeView.prototype, "scrollView", void 0);
__decorate([
    property(cc.Prefab)
], RechargeView.prototype, "goodsItem", void 0);
__decorate([
    property(cc.Node)
], RechargeView.prototype, "rechargePanel", void 0);
__decorate([
    property(cc.Node)
], RechargeView.prototype, "recordPanel", void 0);
RechargeView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RechargeView);
exports.default = RechargeView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVjaGFyZ2UvUmVjaGFyZ2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0VBQXVEO0FBQ3ZELHVEQUFvRDtBQUNwRCwrREFBdUU7QUFDdkUsNkRBQTBEO0FBRTFELGtFQUEyRTtBQUMzRSxvRUFBNEM7QUFDNUMsb0VBQTRDO0FBQzVDLDREQUFvQztBQUNwQyx1REFBNkQ7QUFFN0QsNEVBQW9EO0FBQ3BELHlDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLGdCQUFNO0lBQWhEOztRQUdJLGVBQVUsR0FBa0IsSUFBSSxDQUFBO1FBR2hDLGNBQVMsR0FBYyxJQUFJLENBQUE7UUFHM0Isa0JBQWEsR0FBWSxJQUFJLENBQUE7UUFJN0IsZ0JBQVcsR0FBWSxJQUFJLENBQUE7UUFJM0IsY0FBUyxHQUFnQixJQUFJLENBQUE7UUFFN0Isa0JBQWEsR0FBVyxDQUFDLENBQUE7UUFFekIsZUFBVSxHQUFRLEVBQUUsQ0FBQTtRQUVaLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBMEluQyxpQkFBaUI7SUFDckIsQ0FBQztJQXZJVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLCtCQUErQixDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNO1FBRUYsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFB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QUFFO1lBQzdCLG1CQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxpQkFBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLE9BQU87U0FDVjtRQUVELGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSwyQkFBaUIsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BLLENBQUM7SUFDRCxTQUFTO1FBQ0wsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xCLGlCQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDekIsQ0FBQztDQUVKLENBQUE7QUEvSkc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnREFDUTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNPO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ1c7QUFJN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDUztBQWJWLFlBQVk7SUFGaEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsWUFBWSxDQWtLaEM7a0JBbEtvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IEdvb2RzSXRlbSBmcm9tIFwiLi9Hb29kc0l0ZW1cIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBSZWNoYXJnZU9yZGVyVmlldyBmcm9tIFwiLi9SZWNoYXJnZU9yZGVyVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2hhcmdlVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT57XG5cbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldylcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBnb29kc0l0ZW06IGNjLlByZWZhYiA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlY2hhcmdlUGFuZWw6IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlY29yZFBhbmVsOiBjYy5Ob2RlID0gbnVsbFxuXG5cblxuICAgIF9ub2RlUG9vbDogY2MuTm9kZVBvb2wgPSBudWxsXG5cbiAgICBfaW5zSXRlbUNvdW50OiBudW1iZXIgPSA4XG5cbiAgICBfZ29vZHNMaXN0OiBhbnkgPSBbXVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJyZWNoYXJnZS9wcmVmYWJzL1JlY2hhcmdlVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XG5cbiAgICAgICAgdGhpcy5fbm9kZVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2luc0l0ZW1Db3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZ29vZHNJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5nb29kc0l0ZW0pXG4gICAgICAgICAgICB0aGlzLl9ub2RlUG9vbC5wdXQoZ29vZHNJdGVtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkZFVENIX1BST1VDVFMpLCB0aGlzLnJlZnJlc2hMaXN0KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUEFZX0NIQU5ORUxfTElTVCksIHRoaXMub25QYXlDaGFubmVsTGlzdFJlcyk7XG5cblxuICAgIH1cblxuICAgIHJlZnJlc2hMaXN0KGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsIFwiUmVjaGFyZ2VcIilcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjaGFyZ2VWaWV3KGRhdGEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIkVSUk9SQ09ERS5cIiArIGRhdGEuc3RhdHVzTXNnLnN0YXR1cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjaGFyZ2VWaWV3KGRhdGEpIHtcbiAgICAgICAgbGV0IGdvb2RzTGlzdCA9IGRhdGEucHJvZHVjdFxuICAgICAgICBpZiAoZ29vZHNMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2dvb2RzTGlzdCA9IGdvb2RzTGlzdFxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmVuYWJsZWQgPSBnb29kc0xpc3QubGVuZ3RoID4gdGhpcy5faW5zSXRlbUNvdW50XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdvb2RzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBnb29kc0l0ZW0gPSB0aGlzLmdldEdvb2RzSXRlbSgpXG4gICAgICAgICAgICAgICAgZ29vZHNJdGVtLnBhcmVudCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50XG4gICAgICAgICAgICAgICAgZ29vZHNJdGVtLmdldENvbXBvbmVudChHb29kc0l0ZW0pLmluaXQodGhpcywgZ29vZHNMaXN0W2ldLCBpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5SRUNIQVJHRS5OT0dPT0RTKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0R29vZHNJdGVtKCkge1xuICAgICAgICBsZXQgZ29vZHNJdGVtID0gbnVsbFxuICAgICAgICBpZiAodGhpcy5fbm9kZVBvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgZ29vZHNJdGVtID0gdGhpcy5fbm9kZVBvb2wuZ2V0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdvb2RzSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ29vZHNJdGVtKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnb29kc0l0ZW1cbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2dlUGFuZWwoZmFsc2UpXG4gICAgfVxuXG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdyZWNoYXJnZSc6IDtcbiAgICAgICAgICAgIGNhc2UgJ3JlY2hhcmdlUmVjb3JkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZ2VQYW5lbChuYW1lID09ICdyZWNoYXJnZVJlY29yZCcpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdnZVBhbmVsKGlzUmVjb3JkKSB7XG4gICAgICAgIHRoaXMucmVjb3JkUGFuZWwuYWN0aXZlID0gaXNSZWNvcmQ7XG4gICAgICAgIHRoaXMucmVjaGFyZ2VQYW5lbC5hY3RpdmUgPSAhdGhpcy5yZWNvcmRQYW5lbC5hY3RpdmVcbiAgICB9XG5cbiAgICBvbkNsaWNrR29vZHNJdGVtKGl0ZW1JZCkge1xuICAgICAgICBpZiAoVXNlci5fcGhvbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbmRleCA9IGl0ZW1JZDtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0Tm8gPSB0aGlzLl9nb29kc0xpc3RbaXRlbUlkXS5wcm9kdWN0Tm9cbiAgICAgICAgICAgIC8vIHRoaXMucmVxUmVjaGFyZ2UocHJvZHVjdE5vKVxuICAgICAgICAgICAgdGhpcy5yZXFDaGFubmVsKCk7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveEljb24oXCJcIiwgaTE4bi5XSVRIRFJBV0FMLk5PQklORFBIT05FVElQLCAoKSA9PiB7XG4gICAgICAgICAgICB9LCBpMThuLldJVEhEUkFXQUwuR09UT0JJTkRQSE9ORSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXFDaGFubmVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUEFZX0NIQU5ORUxfTElTVCxcbiAgICAgICAgICAgIG51bGwpO1xuICAgIH1cblxuICAgIHJlcVJlY2hhcmdlKHByb2R1Y3RObykge1xuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuRmV0Y2hId1BheVJlcXVlc3RJZC5jcmVhdGUoeyBwcm9kdWN0Tm86IHByb2R1Y3RObyB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLkZldGNoSHdQYXlSZXF1ZXN0SWQuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkZFVENIX0hXX1BBWV9PUkRFUklELFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICByZWZyZXNoUmVjaGFyZ2UoKSB7XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5GZXRjaFByb2R1Y3RzLmNyZWF0ZSh7fSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5GZXRjaFByb2R1Y3RzLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5GRVRDSF9QUk9VQ1RTLFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoUmVjaGFyZ2UoKVxuICAgIH1cblxuICAgIHByaXZhdGUgb25QYXlDaGFubmVsTGlzdFJlcyhkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQYXlDaGFubmVsTGlzdFJlcyk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBSZWNoYXJnZU9yZGVyVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbZGF0YS5wYXlDaGFubmVsTGlzdCwgdGhpcy5fZ29vZHNMaXN0W3RoaXMuc2VsZWN0SW5kZXhdLCB0aGlzLnNlbGVjdEluZGV4XSB9KTtcbiAgICB9XG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICAgICAgVXRpbE1nci5wb3BXaW5kb3dzKCk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=