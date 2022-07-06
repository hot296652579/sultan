"use strict";
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