"use strict";
cc._RF.push(module, '7e378u8JLZDOrA5NwpmtstB', 'PBDepositReceiptView');
// script/piggyBank/PBDepositReceiptView.ts

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
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const PBDepositReceiptItemNode_1 = __importDefault(require("./PBDepositReceiptItemNode"));
const PiggyBankData_1 = __importDefault(require("./PiggyBankData"));
const { ccclass, property } = cc._decorator;
// 默认每页请求行数
const DEFAULT_ROW = 30;
// 行间隔高度
const INTERVAL_ROW_HEIGHT = 10;
let PBDepositReceiptView = class PBDepositReceiptView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scvList = null;
        this.imgNoData = null;
        this.pfbPBDepositReceiptItemNode = null;
        this.imgBase = null;
        // 当前页
        this.m_currPage = 1;
        // 总页
        this.m_totalPage = 0;
        // 数据
        this.m_data = [];
        // 标记是否拼接完数据
        this.m_mapTagList = new Map();
        // 是否分帧加载完成
        this.m_isFrameLoadDone = false;
        // 单项宽高
        this.m_itemSize = null;
        // 保存每条操作的脚本
        this.m_mapOperateSrc = new Map();
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBDepositReceiptView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
        this.initView();
    }
    start() {
        if (this.imgBase) {
            let labTime = this.imgBase.getChildByName('labTime');
            labTime.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.TIME;
            let labOperationAmount, labInterestRate, labExpectedReturn, labTimeLeft, labOperate;
            labOperationAmount = this.imgBase.getChildByName('labOperationAmount');
            labOperationAmount.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.OPERATION_AMOUNT;
            labInterestRate = this.imgBase.getChildByName('labInterestRate');
            labInterestRate.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.INTERESRATE;
            labExpectedReturn = this.imgBase.getChildByName('labExpectedReturn');
            labExpectedReturn.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.EXPECTEDRETURN;
            labTimeLeft = this.imgBase.getChildByName('labTimeLeft');
            labTimeLeft.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.TIMELEFT;
            labOperate = this.imgBase.getChildByName('labOperate');
            labOperate.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.OPERATE;
        }
    }
    bindingEvents() {
        this.scvList.node.on("scroll-to-bottom", this.onScrollToBottom, this);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_INCOME_BREAKDOWN), this.onIncomeBreakdown);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT), this.onExtractAmount);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CANCEL_STORED_AMOUNT), this.onCancelStoredAmount);
    }
    show() {
        super.show();
        this.showWithAction(true);
        this.reqPageData();
    }
    initView() {
        this.imgNoData.node.active = false;
        let itemNode = cc.instantiate(this.pfbPBDepositReceiptItemNode);
        this.m_itemSize = itemNode.getContentSize();
    }
    reqPageData() {
        let req = CommonService_1.protoPackage.hall.IncomeBreakdownReq.create({ curPage: this.m_currPage, pageCount: DEFAULT_ROW });
        let buffer = CommonService_1.protoPackage.hall.IncomeBreakdownReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_INCOME_BREAKDOWN, buffer);
    }
    onScrollToBottom() {
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
    onIncomeBreakdown(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        if (data.count <= 0) {
            this.imgNoData.node.active = true;
            return;
        }
        let isTag = this.m_mapTagList.get(data.page);
        if (isTag) {
            return;
        }
        this.setContentSize(this.m_data.length + data.info.length);
        this.pushRenderItem(data.info);
        this.m_currPage = data.page;
        this.m_totalPage = data.count;
        this.m_mapTagList.set(data.page, true);
    }
    pushRenderItem(itemList) {
        this.m_isFrameLoadDone = false;
        let count = 0;
        for (let i = 0; i < itemList.length; ++i) {
            setTimeout(() => {
                this.appendItem(itemList[i]);
                if (++count >= itemList.length) {
                    this.m_isFrameLoadDone = true;
                }
            }, i * 16.67);
        }
    }
    appendItem(itemData) {
        let itemNode = cc.instantiate(this.pfbPBDepositReceiptItemNode);
        let itemSrc = itemNode.getComponent(PBDepositReceiptItemNode_1.default);
        itemSrc.setData(itemData);
        itemNode.x = 0;
        itemNode.y = 0 - (itemNode.height * 0.5) - (this.m_data.length * itemNode.height) - (this.m_data.length * INTERVAL_ROW_HEIGHT);
        this.scvList.content.addChild(itemNode);
        this.m_data.push(itemData);
        this.m_mapOperateSrc.set(itemData.id, itemSrc);
    }
    setContentSize(count) {
        let contentHeight = (count * this.m_itemSize.height) + ((count - 1) * INTERVAL_ROW_HEIGHT);
        if (contentHeight < this.scvList.content.parent.height) {
            contentHeight = this.scvList.content.parent.height;
        }
        this.scvList.content.height = contentHeight;
    }
    onExtractAmount(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        let itemSrc = this.m_mapOperateSrc.get(data.id);
        if (!itemSrc) {
            return;
        }
        let extractAmount = Number(itemSrc.data.amount);
        let expectedIncomeAmount = itemSrc.data.expectedIncome;
        PiggyBankData_1.default.getInstance().data.amount = Number(PiggyBankData_1.default.getInstance().data.amount) - extractAmount - expectedIncomeAmount;
        itemSrc.setStatus(protoc_1.com.bt.game.proto.hall.IncomeBreakdownStatus.EXTRACED);
        dispatch("CMD_UPDATE_PIGGY_BANK_DATA");
        dispatch("EVENT_EXTRACT_SUCCEED");
    }
    onCancelStoredAmount(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        let itemSrc = this.m_mapOperateSrc.get(data.id);
        if (!itemSrc) {
            return;
        }
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.CANCEL_SUCCESS);
        let extractAmount = Number(itemSrc.data.amount);
        PiggyBankData_1.default.getInstance().data.amount = Number(PiggyBankData_1.default.getInstance().data.amount) - extractAmount;
        PiggyBankData_1.default.getInstance().data.maxTransferAmount = Number(PiggyBankData_1.default.getInstance().data.maxTransferAmount) + extractAmount;
        PiggyBankData_1.default.getInstance().data.confirmAmount = Number(PiggyBankData_1.default.getInstance().data.confirmAmount) - extractAmount;
        itemSrc.setStatus(protoc_1.com.bt.game.proto.hall.IncomeBreakdownStatus.CANCELED);
        dispatch("CMD_UPDATE_PIGGY_BANK_DATA");
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
};
__decorate([
    property(cc.ScrollView)
], PBDepositReceiptView.prototype, "scvList", void 0);
__decorate([
    property(cc.Sprite)
], PBDepositReceiptView.prototype, "imgNoData", void 0);
__decorate([
    property(cc.Prefab)
], PBDepositReceiptView.prototype, "pfbPBDepositReceiptItemNode", void 0);
__decorate([
    property(cc.Node)
], PBDepositReceiptView.prototype, "imgBase", void 0);
PBDepositReceiptView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBDepositReceiptView);
exports.default = PBDepositReceiptView;

cc._RF.pop();