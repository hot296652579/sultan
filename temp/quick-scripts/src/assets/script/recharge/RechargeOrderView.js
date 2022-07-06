"use strict";
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