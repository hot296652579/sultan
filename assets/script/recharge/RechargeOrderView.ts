import { Config } from "../common/config/Config";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { HttpRequestType, RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import GoodsItem from "./GoodsItem";
import RechargeChannelItem from "./RechargeChannelItem";
import RechargePayView from "./RechargePayView";
import PanelHelp from "../msgbox/PanelHelp";

const { ccclass, property } = cc._decorator;

// 缩小时最小渠道数量
const MIN_CHANNEL_COUNT: number = 2;
// 扩大时最大渠道数量
const MAX_CHANNEL_COUNT: number = 3;

@ccclass
@injectService(LobbyService.instance)
export default class RechargeOrderView extends UIView {
    service: LobbyService;

    @property(cc.Prefab)
    private pfbRechargeChannelItem: cc.Prefab = null;

    @property(cc.Label)
    private labTextAmount: cc.Label = null;

    @property(cc.Label)
    private labCount: cc.Label = null;

    @property(cc.Label)
    private labTextSum: cc.Label = null;

    @property(cc.Label)
    private labSum: cc.Label = null;

    @property(cc.ScrollView)
    private scvPayChannel: cc.ScrollView = null;

    @property(cc.Button)
    private btnPlaceOrder: cc.Button = null;

    @property(cc.Label)
    private btnSum: cc.Label = null;

    @property(cc.Node)
    private GoodsItem: cc.Node = null;

    @property(cc.Button)
    private btnMoreChannel: cc.Button = null;

    @property(cc.Node)
    private nodRight: cc.Node = null;

    @property(cc.Label)
    private labTextEmptyCahnnel: cc.Label = null;

    @property(cc.Node)
    private fristPayNode: cc.Node = null;

    @property(cc.Label)
    private fristPayAmount: cc.Label = null;

    // 渠道列表
    private m_channelList: com.bt.game.proto.hall.IPayChannelInfo[] = null;
    // 商品信息
    private m_goodsInfo: any = null;
    // 选择数量
    private m_count: number = null;
    // 当前选中渠道数据
    private m_currSelectChannel: com.bt.game.proto.hall.IPayChannelInfo = null;
    // 商品索引
    private m_selectIndex: number = null;
    // 渠道节点大小
    private m_channelNodeSize: cc.Size = null;
    // 缩小后渠道列表高度
    private m_shrinkChannelListH: number = null;
    // 放大后渠道列表高度
    private m_expandChannelListH: number = null;
    // 是否查看更多渠道
    private isMoreChannel: boolean = null;
    private _isonClick: boolean = false;

    public static getPrefabUrl() {
        return "recharge/prefabs/RechargeOrderView";
    }

    bindingEvents() {
        super.bindingEvents();

        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID), this.onFetchHwPayRequestIdRes);
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

        this.m_channelList = this.m_channelList.sort((a: com.bt.game.proto.hall.IPayChannelInfo, b: com.bt.game.proto.hall.IPayChannelInfo) => {
            return a.sort - b.sort;
        })
        this.m_goodsInfo = data[1];
        this.m_selectIndex = data[2];

        this.m_currSelectChannel = this.m_channelList[0];

        if (data[3] && data[3] == "fristpay") {
            this.fristPayNode.active = true
            this.fristPayAmount.string = Math.floor((this.m_goodsInfo.gold + this.m_goodsInfo.give)/this.m_goodsInfo.nowPrice*100)+""
        }

        this.updateView();
    }

    private initData(): void {
        this.m_count = 1;
        this.m_channelNodeSize = this.pfbRechargeChannelItem.data.getContentSize();
        this.m_shrinkChannelListH = this.m_channelNodeSize.height * MIN_CHANNEL_COUNT;
        this.m_expandChannelListH = this.m_channelNodeSize.height * MAX_CHANNEL_COUNT;
        this.isMoreChannel = false;
    }

    private initView(): void {

    }

    private updateView(): void {
        this.GoodsItem.getComponent(GoodsItem).init(null, this.m_goodsInfo, this.m_selectIndex);
        this.setLabSum(this.m_count * this.m_goodsInfo.nowPrice);
        this.setLabCount(this.m_count);
        this.setScrollView(this.m_channelList);

        if (this.m_channelList.length > 0 && this.m_channelList.length <= MIN_CHANNEL_COUNT) {
            this.hideBtnMore();
            this.labTextEmptyCahnnel.node.active = false;
        } else if (this.m_channelList.length >= MAX_CHANNEL_COUNT) {
            this.showBtnMore();
            this.labTextEmptyCahnnel.node.active = false;
        } else {
            this.nodRight.active = false;
        }
    }

    private updateScrollViewHeight(): void {
        let height: number = 0;
        if (this.isMoreChannel) {
            height = this.m_expandChannelListH;
        } else {
            height = this.m_shrinkChannelListH;
        }
        this.scvPayChannel.node.getChildByName("view").height = height;
        this.scvPayChannel.node.height = height;
        this.btnMoreChannel.node.y = this.scvPayChannel.node.y - this.scvPayChannel.node.height - (this.btnMoreChannel.node.height / 2);
    }

    private setScrollView(channelList: com.bt.game.proto.hall.IPayChannelInfo[]): void {
        this.scvPayChannel.content.destroyAllChildren();

        this.updateScrollViewHeight();

        this.scvPayChannel.content.height = this.m_channelNodeSize.height * channelList.length;

        let originY: number = 0 - (this.m_channelNodeSize.height / 2);

        for (let i: number = 0; i < channelList.length; ++i) {
            let itemData: com.bt.game.proto.hall.IPayChannelInfo = channelList[i];
            let itemNode: cc.Node = cc.instantiate(this.pfbRechargeChannelItem);
            let itemSrc: RechargeChannelItem = itemNode.getComponent(RechargeChannelItem);
            itemSrc.setData(itemData);

            itemNode.y = originY - (this.m_channelNodeSize.height * i);
            itemNode.x = 0;

            this.scvPayChannel.content.addChild(itemNode);
        }
    }

    private hideBtnMore(): void {
        this.btnMoreChannel.node.active = false;
    }

    private showBtnMore(): void {
        this.btnMoreChannel.node.active = true;
    }

    private setLabCount(value: number): void {
        this.labCount.string = `x${value.toString()}`;
    }

    private setLabSum(value: number): void {
        this.labSum.string = `₹${UtilMgr.changeMoney(value)}`;
    }

    private reqRecharge(): void {
        let option: com.bt.game.proto.hall.IFetchHwPayRequestId = {
            productNo: this.m_goodsInfo.productNo,
            productNum: this.m_count,
        }
        let req = protoPackage.hall.FetchHwPayRequestId.create(option);
        let buffer = protoPackage.hall.FetchHwPayRequestId.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID,
            buffer);
    }

    private openWebView(url: string, compCallback: Function): void {
        Manager.uiManager.open({ type: RechargePayView, bundle: this.bundle, args: [url] }).then(() => {
            compCallback();
        });

    }

    private onFetchHwPayRequestIdRes(data: com.bt.game.proto.hall.IFetchHwPayRequestIdRes): void {
        if (data.statusMsg.status == 0) {
            let payURL: string = `${G.URLMgr.payURL}${this.m_currSelectChannel.url}?requestid=${data.requestId}`;
            if (this.m_currSelectChannel && this.m_currSelectChannel.type == 1) {
                this.openWebView(payURL, () => {
                    this.closeWithAction();
                });
            } else {
                window['platformUtil'].openURL(payURL)
                this._isonClick = false
            }
        } else {
            PanelHelp.showMsgBox("", Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            this._isonClick = false
        }

    }

    private onSelectChannelItem(data: com.bt.game.proto.hall.IPayChannelInfo): void {
        this.m_currSelectChannel = data;
    }

    private onClickMoreChannel(): void {
        this.isMoreChannel = true;
        this.updateScrollViewHeight();
        this.hideBtnMore();
    }

    private onClickPlaceOrder(): void {
        if (!this.m_currSelectChannel) {
            G.Logger.warn("没有支付渠道信息，不可支付");
            return;
        }
        if (this._isonClick) {
            return
        }
        this._isonClick = true
        this.reqRecharge();
    }

    private onClickClose(): void {
        this.closeWithAction();
    }

    // update (dt) {}
}
