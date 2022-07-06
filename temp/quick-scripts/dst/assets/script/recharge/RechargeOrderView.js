
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/recharge/RechargeOrderView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08200MWL35B36C3bBpiXs6n', 'RechargeOrderView');
// script/recharge/RechargeOrderView.ts

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
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const GoodsItem_1 = __importDefault(require("./GoodsItem"));
const RechargeChannelItem_1 = __importDefault(require("./RechargeChannelItem"));
const RechargePayView_1 = __importDefault(require("./RechargePayView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
// 缩小时最小渠道数量
const MIN_CHANNEL_COUNT = 2;
// 扩大时最大渠道数量
const MAX_CHANNEL_COUNT = 3;
let RechargeOrderView = class RechargeOrderView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.pfbRechargeChannelItem = null;
        this.labTextAmount = null;
        this.labCount = null;
        this.labTextSum = null;
        this.labSum = null;
        this.scvPayChannel = null;
        this.btnPlaceOrder = null;
        this.btnSum = null;
        this.GoodsItem = null;
        this.btnMoreChannel = null;
        this.nodRight = null;
        this.labTextEmptyCahnnel = null;
        this.fristPayNode = null;
        this.fristPayAmount = null;
        // 渠道列表
        this.m_channelList = null;
        // 商品信息
        this.m_goodsInfo = null;
        // 选择数量
        this.m_count = null;
        // 当前选中渠道数据
        this.m_currSelectChannel = null;
        // 商品索引
        this.m_selectIndex = null;
        // 渠道节点大小
        this.m_channelNodeSize = null;
        // 缩小后渠道列表高度
        this.m_shrinkChannelListH = null;
        // 放大后渠道列表高度
        this.m_expandChannelListH = null;
        // 是否查看更多渠道
        this.isMoreChannel = null;
        this._isonClick = false;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "recharge/prefabs/RechargeOrderView";
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID), this.onFetchHwPayRequestIdRes);
        this.registerEvent("SELECT_PAY_CHANNEL", this.onSelectChannelItem);
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('nodRoot');
        this.initData();
        this.initView();
    }
    start() {
    }
    show(data) {
        super.show(data);
        this.showWithAction(true);
        this.m_channelList = data[0];
        this.m_channelList = this.m_channelList.sort((a, b) => {
            return a.sort - b.sort;
        });
        this.m_goodsInfo = data[1];
        this.m_selectIndex = data[2];
        this.m_currSelectChannel = this.m_channelList[0];
        if (data[3] && data[3] == "fristpay") {
            this.fristPayNode.active = true;
            this.fristPayAmount.string = Math.floor((this.m_goodsInfo.gold + this.m_goodsInfo.give) / this.m_goodsInfo.nowPrice * 100) + "";
        }
        this.updateView();
    }
    initData() {
        this.m_count = 1;
        this.m_channelNodeSize = this.pfbRechargeChannelItem.data.getContentSize();
        this.m_shrinkChannelListH = this.m_channelNodeSize.height * MIN_CHANNEL_COUNT;
        this.m_expandChannelListH = this.m_channelNodeSize.height * MAX_CHANNEL_COUNT;
        this.isMoreChannel = false;
    }
    initView() {
    }
    updateView() {
        this.GoodsItem.getComponent(GoodsItem_1.default).init(null, this.m_goodsInfo, this.m_selectIndex);
        this.setLabSum(this.m_count * this.m_goodsInfo.nowPrice);
        this.setLabCount(this.m_count);
        this.setScrollView(this.m_channelList);
        if (this.m_channelList.length > 0 && this.m_channelList.length <= MIN_CHANNEL_COUNT) {
            this.hideBtnMore();
            this.labTextEmptyCahnnel.node.active = false;
        }
        else if (this.m_channelList.length >= MAX_CHANNEL_COUNT) {
            this.showBtnMore();
            this.labTextEmptyCahnnel.node.active = false;
        }
        else {
            this.nodRight.active = false;
        }
    }
    updateScrollViewHeight() {
        let height = 0;
        if (this.isMoreChannel) {
            height = this.m_expandChannelListH;
        }
        else {
            height = this.m_shrinkChannelListH;
        }
        this.scvPayChannel.node.getChildByName("view").height = height;
        this.scvPayChannel.node.height = height;
        this.btnMoreChannel.node.y = this.scvPayChannel.node.y - this.scvPayChannel.node.height - (this.btnMoreChannel.node.height / 2);
    }
    setScrollView(channelList) {
        this.scvPayChannel.content.destroyAllChildren();
        this.updateScrollViewHeight();
        this.scvPayChannel.content.height = this.m_channelNodeSize.height * channelList.length;
        let originY = 0 - (this.m_channelNodeSize.height / 2);
        for (let i = 0; i < channelList.length; ++i) {
            let itemData = channelList[i];
            let itemNode = cc.instantiate(this.pfbRechargeChannelItem);
            let itemSrc = itemNode.getComponent(RechargeChannelItem_1.default);
            itemSrc.setData(itemData);
            itemNode.y = originY - (this.m_channelNodeSize.height * i);
            itemNode.x = 0;
            this.scvPayChannel.content.addChild(itemNode);
        }
    }
    hideBtnMore() {
        this.btnMoreChannel.node.active = false;
    }
    showBtnMore() {
        this.btnMoreChannel.node.active = true;
    }
    setLabCount(value) {
        this.labCount.string = `x${value.toString()}`;
    }
    setLabSum(value) {
        this.labSum.string = `₹${UtilMgr_1.UtilMgr.changeMoney(value)}`;
    }
    reqRecharge() {
        let option = {
            productNo: this.m_goodsInfo.productNo,
            productNum: this.m_count,
        };
        let req = CommonService_1.protoPackage.hall.FetchHwPayRequestId.create(option);
        let buffer = CommonService_1.protoPackage.hall.FetchHwPayRequestId.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID, buffer);
    }
    openWebView(url, compCallback) {
        Manager_1.Manager.uiManager.open({ type: RechargePayView_1.default, bundle: this.bundle, args: [url] }).then(() => {
            compCallback();
        });
    }
    onFetchHwPayRequestIdRes(data) {
        if (data.statusMsg.status == 0) {
            let payURL = `${G.URLMgr.payURL}${this.m_currSelectChannel.url}?requestid=${data.requestId}`;
            if (this.m_currSelectChannel && this.m_currSelectChannel.type == 1) {
                this.openWebView(payURL, () => {
                    this.closeWithAction();
                });
            }
            else {
                window['platformUtil'].openURL(payURL);
                this._isonClick = false;
            }
        }
        else {
            PanelHelp_1.default.showMsgBox("", Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            this._isonClick = false;
        }
    }
    onSelectChannelItem(data) {
        this.m_currSelectChannel = data;
    }
    onClickMoreChannel() {
        this.isMoreChannel = true;
        this.updateScrollViewHeight();
        this.hideBtnMore();
    }
    onClickPlaceOrder() {
        if (!this.m_currSelectChannel) {
            G.Logger.warn("没有支付渠道信息，不可支付");
            return;
        }
        if (this._isonClick) {
            return;
        }
        this._isonClick = true;
        this.reqRecharge();
    }
    onClickClose() {
        this.closeWithAction();
    }
};
__decorate([
    property(cc.Prefab)
], RechargeOrderView.prototype, "pfbRechargeChannelItem", void 0);
__decorate([
    property(cc.Label)
], RechargeOrderView.prototype, "labTextAmount", void 0);
__decorate([
    property(cc.Label)
], RechargeOrderView.prototype, "labCount", void 0);
__decorate([
    property(cc.Label)
], RechargeOrderView.prototype, "labTextSum", void 0);
__decorate([
    property(cc.Label)
], RechargeOrderView.prototype, "labSum", void 0);
__decorate([
    property(cc.ScrollView)
], RechargeOrderView.prototype, "scvPayChannel", void 0);
__decorate([
    property(cc.Button)
], RechargeOrderView.prototype, "btnPlaceOrder", void 0);
__decorate([
    property(cc.Label)
], RechargeOrderView.prototype, "btnSum", void 0);
__decorate([
    property(cc.Node)
], RechargeOrderView.prototype, "GoodsItem", void 0);
__decorate([
    property(cc.Button)
], RechargeOrderView.prototype, "btnMoreChannel", void 0);
__decorate([
    property(cc.Node)
], RechargeOrderView.prototype, "nodRight", void 0);
__decorate([
    property(cc.Label)
], RechargeOrderView.prototype, "labTextEmptyCahnnel", void 0);
__decorate([
    property(cc.Node)
], RechargeOrderView.prototype, "fristPayNode", void 0);
__decorate([
    property(cc.Label)
], RechargeOrderView.prototype, "fristPayAmount", void 0);
RechargeOrderView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RechargeOrderView);
exports.default = RechargeOrderView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVjaGFyZ2UvUmVjaGFyZ2VPcmRlclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1REFBb0Q7QUFDcEQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFHM0Usb0VBQTRDO0FBQzVDLCtDQUE0QztBQUM1Qyw0REFBb0M7QUFDcEMsZ0ZBQXdEO0FBQ3hELHdFQUFnRDtBQUNoRCxvRUFBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLFlBQVk7QUFDWixNQUFNLGlCQUFpQixHQUFXLENBQUMsQ0FBQztBQUNwQyxZQUFZO0FBQ1osTUFBTSxpQkFBaUIsR0FBVyxDQUFDLENBQUM7QUFJcEMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLGdCQUFNO0lBQXJEOztRQUlZLDJCQUFzQixHQUFjLElBQUksQ0FBQztRQUd6QyxrQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsV0FBTSxHQUFhLElBQUksQ0FBQztRQUd4QixrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFHcEMsa0JBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsV0FBTSxHQUFhLElBQUksQ0FBQztRQUd4QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLG1CQUFjLEdBQWMsSUFBSSxDQUFDO1FBR2pDLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsd0JBQW1CLEdBQWEsSUFBSSxDQUFDO1FBR3JDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBRXhDLE9BQU87UUFDQyxrQkFBYSxHQUE2QyxJQUFJLENBQUM7UUFDdkUsT0FBTztRQUNDLGdCQUFXLEdBQVEsSUFBSSxDQUFD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QUssQ0FBQztxREFDaUI7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDYTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO3dEQUNvQjtBQUc1QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNvQjtBQUd4QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNhO0FBR2hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2dCO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ3FCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ2U7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4REFDMEI7QUFHN0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDbUI7QUFHckM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDcUI7QUEzQ3ZCLGlCQUFpQjtJQUZyQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixpQkFBaUIsQ0E4UHJDO2tCQTlQb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdFR5cGUsIFJlcXVlc3RQYWNrZ2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgR29vZHNJdGVtIGZyb20gXCIuL0dvb2RzSXRlbVwiO1xuaW1wb3J0IFJlY2hhcmdlQ2hhbm5lbEl0ZW0gZnJvbSBcIi4vUmVjaGFyZ2VDaGFubmVsSXRlbVwiO1xuaW1wb3J0IFJlY2hhcmdlUGF5VmlldyBmcm9tIFwiLi9SZWNoYXJnZVBheVZpZXdcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLy8g57yp5bCP5pe25pyA5bCP5rig6YGT5pWw6YePXG5jb25zdCBNSU5fQ0hBTk5FTF9DT1VOVDogbnVtYmVyID0gMjtcbi8vIOaJqeWkp+aXtuacgOWkp+a4oOmBk+aVsOmHj1xuY29uc3QgTUFYX0NIQU5ORUxfQ09VTlQ6IG51bWJlciA9IDM7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNoYXJnZU9yZGVyVmlldyBleHRlbmRzIFVJVmlldyB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwcml2YXRlIHBmYlJlY2hhcmdlQ2hhbm5lbEl0ZW06IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJUZXh0QW1vdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJDb3VudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiVGV4dFN1bTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiU3VtOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldylcbiAgICBwcml2YXRlIHNjdlBheUNoYW5uZWw6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0blBsYWNlT3JkZXI6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBidG5TdW06IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgR29vZHNJdGVtOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5Nb3JlQ2hhbm5lbDogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kUmlnaHQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiVGV4dEVtcHR5Q2Fobm5lbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBmcmlzdFBheU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgZnJpc3RQYXlBbW91bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIOa4oOmBk+WIl+ihqFxuICAgIHByaXZhdGUgbV9jaGFubmVsTGlzdDogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUGF5Q2hhbm5lbEluZm9bXSA9IG51bGw7XG4gICAgLy8g5ZWG5ZOB5L+h5oGvXG4gICAgcHJpdmF0ZSBtX2dvb2RzSW5mbzogYW55ID0gbnVsbDtcbiAgICAvLyDpgInmi6nmlbDph49cbiAgICBwcml2YXRlIG1fY291bnQ6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5b2T5YmN6YCJ5Lit5rig6YGT5pWw5o2uXG4gICAgcHJpdmF0ZSBtX2N1cnJTZWxlY3RDaGFubmVsOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQYXlDaGFubmVsSW5mbyA9IG51bGw7XG4gICAgLy8g5ZWG5ZOB57Si5byVXG4gICAgcHJpdmF0ZSBtX3NlbGVjdEluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOa4oOmBk+iKgueCueWkp+Wwj1xuICAgIHByaXZhdGUgbV9jaGFubmVsTm9kZVNpemU6IGNjLlNpemUgPSBudWxsO1xuICAgIC8vIOe8qeWwj+WQjua4oOmBk+WIl+ihqOmrmOW6plxuICAgIHByaXZhdGUgbV9zaHJpbmtDaGFubmVsTGlzdEg6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5pS+5aSn5ZCO5rig6YGT5YiX6KGo6auY5bqmXG4gICAgcHJpdmF0ZSBtX2V4cGFuZENoYW5uZWxMaXN0SDogbnVtYmVyID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmn6XnnIvmm7TlpJrmuKDpgZNcbiAgICBwcml2YXRlIGlzTW9yZUNoYW5uZWw6IGJvb2xlYW4gPSBudWxsO1xuICAgIHByaXZhdGUgX2lzb25DbGljazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInJlY2hhcmdlL3ByZWZhYnMvUmVjaGFyZ2VPcmRlclZpZXdcIjtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5GRVRDSF9IV19QQVlfT1JERVJJRCksIHRoaXMub25GZXRjaEh3UGF5UmVxdWVzdElkUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiU0VMRUNUX1BBWV9DSEFOTkVMXCIsIHRoaXMub25TZWxlY3RDaGFubmVsSXRlbSk7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZFJvb3QnKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHNob3coZGF0YSkge1xuICAgICAgICBzdXBlci5zaG93KGRhdGEpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuXG4gICAgICAgIHRoaXMubV9jaGFubmVsTGlzdCA9IGRhdGFbMF07XG5cbiAgICAgICAgdGhpcy5tX2NoYW5uZWxMaXN0ID0gdGhpcy5tX2NoYW5uZWxMaXN0LnNvcnQoKGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVBheUNoYW5uZWxJbmZvLCBiOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQYXlDaGFubmVsSW5mbykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEuc29ydCAtIGIuc29ydDtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tX2dvb2RzSW5mbyA9IGRhdGFbMV07XG4gICAgICAgIHRoaXMubV9zZWxlY3RJbmRleCA9IGRhdGFbMl07XG5cbiAgICAgICAgdGhpcy5tX2N1cnJTZWxlY3RDaGFubmVsID0gdGhpcy5tX2NoYW5uZWxMaXN0WzBdO1xuXG4gICAgICAgIGlmIChkYXRhWzNdICYmIGRhdGFbM10gPT0gXCJmcmlzdHBheVwiKSB7XG4gICAgICAgICAgICB0aGlzLmZyaXN0UGF5Tm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLmZyaXN0UGF5QW1vdW50LnN0cmluZyA9IE1hdGguZmxvb3IoKHRoaXMubV9nb29kc0luZm8uZ29sZCArIHRoaXMubV9nb29kc0luZm8uZ2l2ZSkvdGhpcy5tX2dvb2RzSW5mby5ub3dQcmljZSoxMDApK1wiXCJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9jb3VudCA9IDE7XG4gICAgICAgIHRoaXMubV9jaGFubmVsTm9kZVNpemUgPSB0aGlzLnBmYlJlY2hhcmdlQ2hhbm5lbEl0ZW0uZGF0YS5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICB0aGlzLm1fc2hyaW5rQ2hhbm5lbExpc3RIID0gdGhpcy5tX2NoYW5uZWxOb2RlU2l6ZS5oZWlnaHQgKiBNSU5fQ0hBTk5FTF9DT1VOVDtcbiAgICAgICAgdGhpcy5tX2V4cGFuZENoYW5uZWxMaXN0SCA9IHRoaXMubV9jaGFubmVsTm9kZVNpemUuaGVpZ2h0ICogTUFYX0NIQU5ORUxfQ09VTlQ7XG4gICAgICAgIHRoaXMuaXNNb3JlQ2hhbm5lbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuR29vZHNJdGVtLmdldENvbXBvbmVudChHb29kc0l0ZW0pLmluaXQobnVsbCwgdGhpcy5tX2dvb2RzSW5mbywgdGhpcy5tX3NlbGVjdEluZGV4KTtcbiAgICAgICAgdGhpcy5zZXRMYWJTdW0odGhpcy5tX2NvdW50ICogdGhpcy5tX2dvb2RzSW5mby5ub3dQcmljZSk7XG4gICAgICAgIHRoaXMuc2V0TGFiQ291bnQodGhpcy5tX2NvdW50KTtcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxWaWV3KHRoaXMubV9jaGFubmVsTGlzdCk7XG5cbiAgICAgICAgaWYgKHRoaXMubV9jaGFubmVsTGlzdC5sZW5ndGggPiAwICYmIHRoaXMubV9jaGFubmVsTGlzdC5sZW5ndGggPD0gTUlOX0NIQU5ORUxfQ09VTlQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ0bk1vcmUoKTtcbiAgICAgICAgICAgIHRoaXMubGFiVGV4dEVtcHR5Q2Fobm5lbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubV9jaGFubmVsTGlzdC5sZW5ndGggPj0gTUFYX0NIQU5ORUxfQ09VTlQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0J0bk1vcmUoKTtcbiAgICAgICAgICAgIHRoaXMubGFiVGV4dEVtcHR5Q2Fobm5lbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub2RSaWdodC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2Nyb2xsVmlld0hlaWdodCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhlaWdodDogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3JlQ2hhbm5lbCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5tX2V4cGFuZENoYW5uZWxMaXN0SDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMubV9zaHJpbmtDaGFubmVsTGlzdEg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY3ZQYXlDaGFubmVsLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5zY3ZQYXlDaGFubmVsLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmJ0bk1vcmVDaGFubmVsLm5vZGUueSA9IHRoaXMuc2N2UGF5Q2hhbm5lbC5ub2RlLnkgLSB0aGlzLnNjdlBheUNoYW5uZWwubm9kZS5oZWlnaHQgLSAodGhpcy5idG5Nb3JlQ2hhbm5lbC5ub2RlLmhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U2Nyb2xsVmlldyhjaGFubmVsTGlzdDogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUGF5Q2hhbm5lbEluZm9bXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjdlBheUNoYW5uZWwuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbFZpZXdIZWlnaHQoKTtcblxuICAgICAgICB0aGlzLnNjdlBheUNoYW5uZWwuY29udGVudC5oZWlnaHQgPSB0aGlzLm1fY2hhbm5lbE5vZGVTaXplLmhlaWdodCAqIGNoYW5uZWxMaXN0Lmxlbmd0aDtcblxuICAgICAgICBsZXQgb3JpZ2luWTogbnVtYmVyID0gMCAtICh0aGlzLm1fY2hhbm5lbE5vZGVTaXplLmhlaWdodCAvIDIpO1xuXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBjaGFubmVsTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQYXlDaGFubmVsSW5mbyA9IGNoYW5uZWxMaXN0W2ldO1xuICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZmJSZWNoYXJnZUNoYW5uZWxJdGVtKTtcbiAgICAgICAgICAgIGxldCBpdGVtU3JjOiBSZWNoYXJnZUNoYW5uZWxJdGVtID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KFJlY2hhcmdlQ2hhbm5lbEl0ZW0pO1xuICAgICAgICAgICAgaXRlbVNyYy5zZXREYXRhKGl0ZW1EYXRhKTtcblxuICAgICAgICAgICAgaXRlbU5vZGUueSA9IG9yaWdpblkgLSAodGhpcy5tX2NoYW5uZWxOb2RlU2l6ZS5oZWlnaHQgKiBpKTtcbiAgICAgICAgICAgIGl0ZW1Ob2RlLnggPSAwO1xuXG4gICAgICAgICAgICB0aGlzLnNjdlBheUNoYW5uZWwuY29udGVudC5hZGRDaGlsZChpdGVtTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVCdG5Nb3JlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ0bk1vcmVDaGFubmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93QnRuTW9yZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idG5Nb3JlQ2hhbm5lbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRMYWJDb3VudCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiQ291bnQuc3RyaW5nID0gYHgke3ZhbHVlLnRvU3RyaW5nKCl9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldExhYlN1bSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiU3VtLnN0cmluZyA9IGDigrkke1V0aWxNZ3IuY2hhbmdlTW9uZXkodmFsdWUpfWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXFSZWNoYXJnZSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IG9wdGlvbjogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JRmV0Y2hId1BheVJlcXVlc3RJZCA9IHtcbiAgICAgICAgICAgIHByb2R1Y3RObzogdGhpcy5tX2dvb2RzSW5mby5wcm9kdWN0Tm8sXG4gICAgICAgICAgICBwcm9kdWN0TnVtOiB0aGlzLm1fY291bnQsXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLkZldGNoSHdQYXlSZXF1ZXN0SWQuY3JlYXRlKG9wdGlvbik7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5GZXRjaEh3UGF5UmVxdWVzdElkLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5GRVRDSF9IV19QQVlfT1JERVJJRCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuV2ViVmlldyh1cmw6IHN0cmluZywgY29tcENhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogUmVjaGFyZ2VQYXlWaWV3LCBidW5kbGU6IHRoaXMuYnVuZGxlLCBhcmdzOiBbdXJsXSB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbXBDYWxsYmFjaygpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25GZXRjaEh3UGF5UmVxdWVzdElkUmVzKGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUZldGNoSHdQYXlSZXF1ZXN0SWRSZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgcGF5VVJMOiBzdHJpbmcgPSBgJHtHLlVSTE1nci5wYXlVUkx9JHt0aGlzLm1fY3VyclNlbGVjdENoYW5uZWwudXJsfT9yZXF1ZXN0aWQ9JHtkYXRhLnJlcXVlc3RJZH1gO1xuICAgICAgICAgICAgaWYgKHRoaXMubV9jdXJyU2VsZWN0Q2hhbm5lbCAmJiB0aGlzLm1fY3VyclNlbGVjdENoYW5uZWwudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuV2ViVmlldyhwYXlVUkwsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5vcGVuVVJMKHBheVVSTClcbiAgICAgICAgICAgICAgICB0aGlzLl9pc29uQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goXCJcIiwgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIHRoaXMuX2lzb25DbGljayA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgb25TZWxlY3RDaGFubmVsSXRlbShkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQYXlDaGFubmVsSW5mbyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fY3VyclNlbGVjdENoYW5uZWwgPSBkYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja01vcmVDaGFubmVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzTW9yZUNoYW5uZWwgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbFZpZXdIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5oaWRlQnRuTW9yZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja1BsYWNlT3JkZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tX2N1cnJTZWxlY3RDaGFubmVsKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci53YXJuKFwi5rKh5pyJ5pSv5LuY5rig6YGT5L+h5oGv77yM5LiN5Y+v5pSv5LuYXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc29uQ2xpY2spIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzb25DbGljayA9IHRydWVcbiAgICAgICAgdGhpcy5yZXFSZWNoYXJnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=