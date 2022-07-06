import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";
import PBDepositReceiptItemNode from "./PBDepositReceiptItemNode";
import PiggyBankData from "./PiggyBankData";

const { ccclass, property } = cc._decorator;

// 默认每页请求行数
const DEFAULT_ROW: number = 30;
// 行间隔高度
const INTERVAL_ROW_HEIGHT: number = 10;


@ccclass
@injectService(LobbyService.instance)
export default class PBDepositReceiptView extends UIView {
    service: LobbyService;

    @property(cc.ScrollView)
    private scvList: cc.ScrollView = null;

    @property(cc.Sprite)
    private imgNoData: cc.Sprite = null;

    @property(cc.Prefab)
    private pfbPBDepositReceiptItemNode: cc.Prefab = null;

    @property(cc.Node)
    private imgBase: cc.Node = null;
    
    // 当前页
    private m_currPage: number = 1;
    // 总页
    private m_totalPage: number = 0;
    // 数据
    private m_data: com.bt.game.proto.hall.IIncomeBreakdownInfo[] = [];
    // 标记是否拼接完数据
    private m_mapTagList: Map<number, boolean> = new Map();
    // 是否分帧加载完成
    private m_isFrameLoadDone: boolean = false;
    // 单项宽高
    private m_itemSize: cc.Size = null;
    // 保存每条操作的脚本
    private m_mapOperateSrc: Map<string, PBDepositReceiptItemNode> = new Map();

    public static getPrefabUrl() {
        return "piggyBank/prefabs/PBDepositReceiptView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
        this.initView();
    }

    start() {
        if(this.imgBase){
            let labTime = this.imgBase.getChildByName('labTime');
            labTime.getComponent(cc.Label).language = i18n.PIGGY_BANK.TIME;

            let labOperationAmount,labInterestRate,labExpectedReturn,labTimeLeft,labOperate;
            labOperationAmount = this.imgBase.getChildByName('labOperationAmount');
            labOperationAmount.getComponent(cc.Label).language = i18n.PIGGY_BANK.OPERATION_AMOUNT;

            labInterestRate = this.imgBase.getChildByName('labInterestRate');
            labInterestRate.getComponent(cc.Label).language = i18n.PIGGY_BANK.INTERESRATE;

            labExpectedReturn = this.imgBase.getChildByName('labExpectedReturn');
            labExpectedReturn.getComponent(cc.Label).language = i18n.PIGGY_BANK.EXPECTEDRETURN;

            labTimeLeft = this.imgBase.getChildByName('labTimeLeft');
            labTimeLeft.getComponent(cc.Label).language = i18n.PIGGY_BANK.TIMELEFT;

            labOperate = this.imgBase.getChildByName('labOperate');
            labOperate.getComponent(cc.Label).language = i18n.PIGGY_BANK.OPERATE;

        }
    }

    bindingEvents() {
        this.scvList.node.on("scroll-to-bottom", this.onScrollToBottom, this);

        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_INCOME_BREAKDOWN), this.onIncomeBreakdown);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT), this.onExtractAmount);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CANCEL_STORED_AMOUNT), this.onCancelStoredAmount);
    }

    show(): void {
        super.show();
        this.showWithAction(true);
        this.reqPageData();
    }

    private initView(): void {
        this.imgNoData.node.active = false;
        let itemNode: cc.Node = cc.instantiate(this.pfbPBDepositReceiptItemNode);
        this.m_itemSize = itemNode.getContentSize();
    }

    private reqPageData(): void {
        let req = protoPackage.hall.IncomeBreakdownReq.create({ curPage: this.m_currPage, pageCount: DEFAULT_ROW });
        let buffer = protoPackage.hall.IncomeBreakdownReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_INCOME_BREAKDOWN,
            buffer);
    }

    private onScrollToBottom(): void {
        if (!this.m_isFrameLoadDone) {
            G.Logger.log("未加载完成 item 资源，无法获取最新数据");
            return;
        }

        if (this.m_currPage >= this.m_totalPage) {
            G.Logger.log("资源已加载完成，无法继续获取数据");
            return;
        }

        ++this.m_currPage;
        this.reqPageData();
    }

    private onIncomeBreakdown(data: com.bt.game.proto.hall.IncomeBreakdownRes): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }

        if (data.count <= 0) {
            this.imgNoData.node.active = true;
            return;
        }

        let isTag: boolean | undefined = this.m_mapTagList.get(data.page);

        if (isTag) {
            return;
        }

        this.setContentSize(this.m_data.length + data.info.length);

        this.pushRenderItem(data.info);

        this.m_currPage = data.page;
        this.m_totalPage = data.count;

        this.m_mapTagList.set(data.page, true);
    }

    private pushRenderItem(itemList: com.bt.game.proto.hall.IIncomeBreakdownInfo[]): void {
        this.m_isFrameLoadDone = false;

        let count: number = 0;
        for (let i: number = 0; i < itemList.length; ++i) {
            setTimeout(() => {
                this.appendItem(itemList[i]);
                if (++count >= itemList.length) {
                    this.m_isFrameLoadDone = true;
                }
            }, i * 16.67);
        }
    }

    private appendItem(itemData: com.bt.game.proto.hall.IIncomeBreakdownInfo): void {
        let itemNode: cc.Node = cc.instantiate(this.pfbPBDepositReceiptItemNode);
        let itemSrc: PBDepositReceiptItemNode = itemNode.getComponent(PBDepositReceiptItemNode);
        itemSrc.setData(itemData);

        itemNode.x = 0;
        itemNode.y = 0 - (itemNode.height * 0.5) - (this.m_data.length * itemNode.height) - (this.m_data.length * INTERVAL_ROW_HEIGHT);

        this.scvList.content.addChild(itemNode);

        this.m_data.push(itemData);
        this.m_mapOperateSrc.set(itemData.id, itemSrc);
    }

    private setContentSize(count: number): void {
        let contentHeight: number = (count * this.m_itemSize.height) + ((count - 1) * INTERVAL_ROW_HEIGHT);
        if (contentHeight < this.scvList.content.parent.height) {
            contentHeight = this.scvList.content.parent.height;
        }
        this.scvList.content.height = contentHeight;
    }


    private onExtractAmount(data: com.bt.game.proto.hall.ExtractAmountRes): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }

        let itemSrc: PBDepositReceiptItemNode | undefined = this.m_mapOperateSrc.get(data.id);
        if (!itemSrc) {
            return;
        }

        let extractAmount: number = Number(itemSrc.data.amount);
        let expectedIncomeAmount: number = itemSrc.data.expectedIncome;

        PiggyBankData.getInstance().data.amount = Number(PiggyBankData.getInstance().data.amount) - extractAmount - expectedIncomeAmount;
        itemSrc.setStatus(com.bt.game.proto.hall.IncomeBreakdownStatus.EXTRACED);

        dispatch("CMD_UPDATE_PIGGY_BANK_DATA");
        dispatch("EVENT_EXTRACT_SUCCEED");
    }

    private onCancelStoredAmount(data: com.bt.game.proto.hall.CancelStoredAmountRes): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }

        let itemSrc: PBDepositReceiptItemNode | undefined = this.m_mapOperateSrc.get(data.id);
        if (!itemSrc) {
            return;
        }

        PanelHelp.showTip(i18n.PIGGY_BANK.CANCEL_SUCCESS);

        let extractAmount: number = Number(itemSrc.data.amount);

        PiggyBankData.getInstance().data.amount = Number(PiggyBankData.getInstance().data.amount) - extractAmount;
        PiggyBankData.getInstance().data.maxTransferAmount = Number(PiggyBankData.getInstance().data.maxTransferAmount) + extractAmount;
        PiggyBankData.getInstance().data.confirmAmount = Number(PiggyBankData.getInstance().data.confirmAmount) - extractAmount;
        itemSrc.setStatus(com.bt.game.proto.hall.IncomeBreakdownStatus.CANCELED);

        dispatch("CMD_UPDATE_PIGGY_BANK_DATA");
    }

    onClickClose(): void {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
}
