"use strict";
cc._RF.push(module, '078cbr9UWlO8agc1uapT2ql', 'CreateAccountView');
// script/wallet/CreateAccountView.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const protoc_1 = require("../framework/external/protoc");
const RechargeData_1 = __importDefault(require("../data/RechargeData"));
const { ccclass, property } = cc._decorator;
let CreateAccountView = class CreateAccountView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.moreBankNode = null;
        this.iconDown = null;
        this.iconUp = null;
        this.bankItemTop0 = null;
        this.bankItemTop1 = null;
        this.bankItemTop2 = null;
        this.bankItemTop3 = null;
        this.bankItemTop4 = null;
        this.bankItemTop5 = null;
        this.bankItemMore0 = null;
        this.bankItemMore1 = null;
        this.bankItemMore2 = null;
        this.bankItemMore3 = null;
        this.bankItemMore4 = null;
        this.bankItemMore5 = null;
        this.bankNumEditBox = null;
        this.bankNameEditBox = null;
        this.labBankCode = null;
        this.bankNumStr = '';
        this.bankNameStr = '';
        this.bankCodeStr = null;
        this.bankChoosedIndex = null;
        this.currentMoreIndex = 0;
    }
    static getPrefabUrl() {
        return "wallet/prefabes/CreateAccountView";
    }
    onLoad() {
        super.onLoad();
        this.bindEvents();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
    }
    bindEvents() {
        this.bankNumEditBox.node.on("editing-did-began", this.onBankNumBegan, this);
        this.bankNumEditBox.node.on("editing-did-ended", this.onBankEnterEnd, this);
        this.bankNumEditBox.node.on("editing-return", this.onBankEnterEnd, this);
        this.bankNumEditBox.node.on("text-changed", this.onBankNumTxtChanged, this);
        this.bankNameEditBox.node.on("editing-did-began", this.onBankNameBegan, this);
        this.bankNameEditBox.node.on("editing-did-ended", this.onBankNameEnterEnd, this);
        this.bankNameEditBox.node.on("editing-return", this.onBankNameEnterEnd, this);
        this.bankNameEditBox.node.on("text-changed", this.onBankNameTxtChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('L2C_BindBankCard_Res', this.onL2C_BindBankCard_Res);
        this.registerEvent('L2C_GetBankList_Res', this.onL2C_GetBankList_Res);
    }
    show() {
        this.initData();
        this.refreshBankTopInfo();
        // this.requestGetBankList(0, 6);
    }
    initData() {
        this.currentMoreIndex = 0;
    }
    requestGetBankList(index, limit) {
        let req = protoc_1.MST.C2L_GetBankList_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            index,
            limit
        });
        let buffer = protoc_1.MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetBankList_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
                break;
            case 'btnSave':
                this.saveBankHanlder();
                break;
            case 'btnMoreBank':
                this.clickMoreBank();
                break;
            case 'btnLast':
                this.clickBtnLastHandler();
                break;
            case 'btnNext':
                this.clickBtnNextHandler();
                break;
        }
    }
    clickBtnLastHandler() {
        this.currentMoreIndex--;
        if (this.currentMoreIndex <= 0) {
            this.currentMoreIndex = 0;
            return;
        }
        let index = this.currentMoreIndex;
        this.requestGetBankList(index * 6, 6);
    }
    clickBtnNextHandler() {
        this.currentMoreIndex++;
        let index = this.currentMoreIndex;
        this.requestGetBankList(index * 6, 6);
    }
    saveBankHanlder() {
        let choosedIndex = this.bankChoosedIndex;
        if (choosedIndex == null) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SELECTBANk);
            return;
        }
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bankInfoList = rechargeData.bankInfoList;
        let bankInfo = bankInfoList[choosedIndex];
        if (!bankInfo)
            return;
        let name = bankInfo.bankName;
        let bankNo = this.bankNumStr;
        let bankCode = bankInfo.bankCode;
        if (!name || !bankNo || !bankCode) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.BANDBANKINFOFAIL);
            return;
        }
        let req = protoc_1.MST.C2L_BindBankCard_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            bankNo,
            bankCode,
            name
        });
        let buffer = protoc_1.MST.C2L_BindBankCard_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_BindBankCard_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_BindBankCard_Req, buffer);
    }
    onL2C_BindBankCard_Res() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.BINDBANKSUCCESS);
        this.close();
        dispatch("Event_L2C_BindBankCard_Res");
    }
    clickMoreBank() {
        let moreBankNode = this.moreBankNode;
        moreBankNode.active = !moreBankNode.active;
        this.iconDown.active = false;
        this.iconUp.active = false;
        this.iconDown.active = moreBankNode.active;
        this.iconUp.active = !moreBankNode.active;
        if (moreBankNode.active)
            this.requestGetBankList(0, 6);
    }
    refreshBankTopInfo() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bankInfoList = rechargeData.bankInfoList;
        if (bankInfoList && bankInfoList.length <= 0)
            return;
        for (let index = 0; index < 6; index++) {
            const element = bankInfoList[index];
            const bankItemTop = this[`bankItemTop${index}`];
            const iconChoosed = bankItemTop.getChildByName('choosed');
            bankItemTop.active = false;
            if (!element)
                continue;
            if (index <= bankInfoList.length) {
                bankItemTop.active = true;
                let labBank = bankItemTop.getChildByName('labBank').getComponent(cc.Label);
                labBank.string = element.bankCode;
            }
            bankItemTop.on(cc.Node.EventType.TOUCH_END, (evt) => {
                this.bankChoosedIndex = index;
                this.hideChoosedHanlder();
                iconChoosed.active = true;
                this.refreshChoosedHandler();
            });
        }
    }
    refreshBankMoreInfo() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bankInfoList = rechargeData.bankInfoList;
        if (bankInfoList && bankInfoList.length <= 0) {
            this.currentMoreIndex--;
            return;
        }
        for (let index = 0; index < 6; index++) {
            const element = bankInfoList[index];
            const bankItemMore = this[`bankItemMore${index}`];
            const iconChoosed = bankItemMore.getChildByName('choosed');
            bankItemMore.active = false;
            if (!element)
                continue;
            if (index <= bankInfoList.length) {
                bankItemMore.active = true;
                let labBank = bankItemMore.getChildByName('labBank').getComponent(cc.Label);
                labBank.string = element.bankName;
            }
            bankItemMore.on(cc.Node.EventType.TOUCH_END, (evt) => {
                this.bankChoosedIndex = index;
                this.hideChoosedHanlder();
                iconChoosed.active = true;
                this.refreshChoosedHandler();
            });
        }
    }
    hideChoosedHanlder() {
        for (let index = 0; index < 6; index++) {
            const bankItemTop = this[`bankItemTop${index}`];
            const bankItemMore = this[`bankItemMore${index}`];
            const topChoosed = bankItemTop.getChildByName('choosed');
            const moreChoosed = bankItemMore.getChildByName('choosed');
            topChoosed.active = false;
            moreChoosed.active = false;
        }
    }
    refreshChoosedHandler() {
        let choosedIndex = this.bankChoosedIndex;
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bankInfoList = rechargeData.bankInfoList;
        let bankCode = bankInfoList[choosedIndex].bankCode;
        this.labBankCode.string = bankCode;
    }
    onL2C_GetBankList_Res() {
        this.refreshBankMoreInfo();
    }
    onBankNumBegan(target) {
        this.bankNumEditBox.string = this.bankNumStr;
    }
    onBankEnterEnd(target) {
        if (this.bankNumStr.length <= 0) {
            return;
        }
        this.bankNumEditBox.string = this.bankNumStr;
    }
    onBankNumTxtChanged(content) {
        this.bankNumStr = content.string;
    }
    onBankNameBegan(target) {
        this.bankNumEditBox.string = this.bankNameStr;
    }
    onBankNameEnterEnd(target) {
        if (this.bankNameStr.length <= 0) {
            return;
        }
        this.bankNumEditBox.string = this.bankNameStr;
    }
    onBankNameTxtChanged(content) {
        this.bankNameStr = content.string;
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "moreBankNode", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "iconDown", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "iconUp", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemTop0", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemTop1", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemTop2", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemTop3", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemTop4", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemTop5", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemMore0", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemMore1", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemMore2", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemMore3", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemMore4", void 0);
__decorate([
    property(cc.Node)
], CreateAccountView.prototype, "bankItemMore5", void 0);
__decorate([
    property(cc.EditBox)
], CreateAccountView.prototype, "bankNumEditBox", void 0);
__decorate([
    property(cc.EditBox)
], CreateAccountView.prototype, "bankNameEditBox", void 0);
__decorate([
    property(cc.Label)
], CreateAccountView.prototype, "labBankCode", void 0);
CreateAccountView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CreateAccountView);
exports.default = CreateAccountView;

cc._RF.pop();