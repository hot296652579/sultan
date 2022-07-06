import { Config } from "../common/config/Config";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";
import GoodsItem from "./GoodsItem";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { com } from "../framework/external/protoc";
import RechargeOrderView from "./RechargeOrderView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RechargeView extends UIView implements IController<LobbyService>{

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null

    @property(cc.Prefab)
    goodsItem: cc.Prefab = null

    @property(cc.Node)
    rechargePanel: cc.Node = null


    @property(cc.Node)
    recordPanel: cc.Node = null



    _nodePool: cc.NodePool = null

    _insItemCount: number = 8

    _goodsList: any = []

    private selectIndex: number = null;

    service: LobbyService;

    public static getPrefabUrl() {
        return "recharge/prefabs/RechargeView";
    }

    onLoad() {

        super.onLoad();
        this.content = this.node.getChildByName('content');

        this._nodePool = new cc.NodePool()
        for (let i = 0; i < this._insItemCount; i++) {
            let goodsItem = cc.instantiate(this.goodsItem)
            this._nodePool.put(goodsItem)
        }
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.FETCH_PROUCTS), this.refreshList);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_PAY_CHANNEL_LIST), this.onPayChannelListRes);


    }

    refreshList(data) {
        cc.log(data, "Recharge")
        if (data) {
            if (data.statusMsg.status == 0) {
                this.rechargeView(data)
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    rechargeView(data) {
        let goodsList = data.product
        if (goodsList.length > 0) {
            this._goodsList = goodsList
            this.scrollView.enabled = goodsList.length > this._insItemCount
            for (let i = 0; i < goodsList.length; i++) {
                let goodsItem = this.getGoodsItem()
                goodsItem.parent = this.scrollView.content
                goodsItem.getComponent(GoodsItem).init(this, goodsList[i], i)
            }
        } else {
            PanelHelp.showTip(i18n.RECHARGE.NOGOODS)
        }
    }

    getGoodsItem() {
        let goodsItem = null
        if (this._nodePool.size() > 0) {
            goodsItem = this._nodePool.get()
        } else {
            goodsItem = cc.instantiate(this.goodsItem)
        }
        return goodsItem
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        this.changgePanel(false)
    }


    onClick(name, node) {
        switch (name) {
            case 'recharge': ;
            case 'rechargeRecord':
                this.changgePanel(name == 'rechargeRecord')
                break;
            case "close": this.closeWithAction(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    changgePanel(isRecord) {
        this.recordPanel.active = isRecord;
        this.rechargePanel.active = !this.recordPanel.active
    }

    onClickGoodsItem(itemId) {
        if (User._phone.length > 0) {
            this.selectIndex = itemId;
            let productNo = this._goodsList[itemId].productNo
            // this.reqRecharge(productNo)
            this.reqChannel();
            this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES);
        } else {
            PanelHelp.showMsgBoxIcon("", i18n.WITHDRAWAL.NOBINDPHONETIP, () => {
            }, i18n.WITHDRAWAL.GOTOBINDPHONE)
        }

    }

    private reqChannel(): void {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_PAY_CHANNEL_LIST,
            null);
    }

    reqRecharge(productNo) {
        let req = protoPackage.hall.FetchHwPayRequestId.create({ productNo: productNo });
        let buffer = protoPackage.hall.FetchHwPayRequestId.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID,
            buffer);
    }

    refreshRecharge() {
        let req = protoPackage.hall.FetchProducts.create({});
        let buffer = protoPackage.hall.FetchProducts.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.FETCH_PROUCTS,
            buffer);
    }

    start() {
        this.refreshRecharge()
    }

    private onPayChannelListRes(data: com.bt.game.proto.hall.IPayChannelListRes): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }

        Manager.uiManager.open({ type: RechargeOrderView, bundle: BUNDLE_RESOURCES, args: [data.payChannelList, this._goodsList[this.selectIndex], this.selectIndex] });
    }
    onDestroy() {
        super.onDestroy();
        UtilMgr.popWindows();
    }
    // update (dt) {}
}
