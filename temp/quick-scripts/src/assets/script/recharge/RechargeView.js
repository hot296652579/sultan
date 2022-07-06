"use strict";
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