
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/withdrawal/WithdrawalView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c6c1fpVKcVCub64Eumy/GnO', 'WithdrawalView');
// script/withdrawal/WithdrawalView.ts

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
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const WithdrawalItem_1 = __importDefault(require("./WithdrawalItem"));
const { ccclass, property } = cc._decorator;
//optional int32 drawingStatus =8; //提款状态(0等待处理,100审核通过,200提款中,300提款成功,-100审核失败,-300提款失败)
let WithdrawalView = class WithdrawalView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.managementTip = null;
        this.withdrawalTip = null;
        this.managementContent = null;
        this.withdrawalContent = null;
        this.withdrawalLogsContent = null;
        this.accountLayout = null;
        this.accountItem = null;
        this.nextBtn = null;
        this.withdrawalNext = null;
        this.carried = null;
        this.bank = null;
        this.witharawalRate = null;
        this.minWithdrawalAmount = null;
        this.amountEditbox = null;
        this.withdrawalLogsItem = null;
        this.withdrawalLogsLayout = null;
        this.pageText = null;
        this.addBankCard = null;
        this.addBankCardLabel = null;
        this.infoNode = null;
        this.infoAmountText = null;
        this.infoFeeText = null;
        this.infoBankText = null;
        this.infoAccountText = null;
        this.pwdEditbox = null;
        this.carriedLab = null;
        this.bankLab = null;
        this._userBankList = [];
        this._minWithdrawalAmount = 0;
        this._maxAccountCount = 3;
        this._clickItemId = 0;
        this._page = 1;
        this._pageTotal = 1;
        this._pageSize = 5;
        this._maxWithdrawalAmount = 0;
        this._insufficientBetAmount = 0;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "withdrawal/prefabs/WithdrawalView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.managementTip.active = true;
        this.managementContent.active = true;
        this.withdrawalTip.active = false;
        this.withdrawalContent.active = false;
        this.withdrawalLogsContent.active = false;
        this.infoNode.active = false;
        this.amountEditbox.node.on("text-changed", this.bankEditChanged, this);
        this.addBankCardLabel.string = LanguageImpl_1.i18n.WITHDRAWAL.ADDBANKCARD;
        this.amountEditbox.placeholder = Manager_1.Manager.getLanguage("WITHDRAWAL.WITHDRAWALAMOUNT");
        this.carriedLab.string = LanguageImpl_1.i18n.BANK.CARRIED;
        this.bankLab.string = LanguageImpl_1.i18n.BANK.BANK;
        this.pwdEditbox.placeholder = Manager_1.Manager.getLanguage("WITHDRAWAL.SECONDARYPASSWORD");
    }
    bankEditChanged(editbox) {
        if (editbox.string && parseFloat(editbox.string) != parseInt(editbox.string)) { //显示输入整数
            editbox.string = parseInt(editbox.string);
        }
        let input = UtilMgr_1.UtilMgr.formatFloat(UtilMgr_1.UtilMgr.recoverMoney(editbox.string) * 10000);
        editbox.string = UtilMgr_1.UtilMgr.changeMoney(input);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_GetBankInfo), this.refreshManagement);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.REFRESH_SAFETY_BOX), this.refreshSafetyBox);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_WithdrawalConfig), this.refreshWithdrawalConfig);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_Withdrawal), this.withdrawalCallback);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_WithdrawalRecord), this.refreshWithdrawalRecord);
        this.registerEvent("reqBankList", this.reqBankList);
    }
    refreshWithdrawalRecord(data) {
        cc.log(data, "WithdrawalRecord");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.recordList.length > 0) {
                    this._page = data.currPage;
                    this._pageTotal = data.total;
                    this.witharawalRecordView(data.recordList);
                }
                else {
                    this.pageText.string = this._page + "/" + this._pageTotal;
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    withdrawalCallback(data) {
        cc.log(data, "Withdrawal");
        if (data.status == 0) {
            this.reqSafetyBox();
            this.reqWithdrawalConfig();
            this.amountEditbox.string = "";
            this.withdrawalNext.interactable = false;
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.WITHDRAWAL.SUCCESS);
            this.infoNode.active = false;
        }
        else {
            if (data.status == 309) {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("WITHDRAWAL.WithdrawalStatus." + data.status));
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.status));
            }
        }
    }
    refreshWithdrawalConfig(data) {
        cc.log(data, "WithdrawalConfig");
        if (data) {
            if (data.statusMsg.status == 0) {
                this.withdrawalConfig = data;
                this._minWithdrawalAmount = data.minWithdrawalAmount;
                if (data.chargeRate != 0) {
                    this.witharawalRate.language = String.format(LanguageImpl_1.i18n.WITHDRAWAL.RATE, data.chargeRate);
                }
                else {
                    this.witharawalRate.language = LanguageImpl_1.i18n.WITHDRAWAL.RATELimited;
                }
                this._maxWithdrawalAmount = data.maxWithdrawalAmount;
                this._insufficientBetAmount = data.insufficientBetAmount;
                // let totalGold = UtilMgr.formatFloat(User._gold + User._bank)
                // let maxAmount = Math.floor(totalGold/10000  /  (1+this.withdrawalConfig.chargeRate/100))
                // if (maxAmount * 10000 < this._minWithdrawalAmount) {
                //     maxAmount = 0
                // }else{
                //     maxAmount = maxAmount * 10000
                // }
                this.minWithdrawalAmount.language = LanguageImpl_1.i18n.WITHDRAWAL.MINAMOUNT + UtilMgr_1.UtilMgr.changeMoney(this._minWithdrawalAmount) + "/" + UtilMgr_1.UtilMgr.changeMoney(this._maxWithdrawalAmount);
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    refreshSafetyBox(data) {
        cc.log(data, "SafetyBox");
        if (data) {
            if (data.statusMsg.status == 0) {
                User_1.User._gold = data.gold;
                User_1.User._bank = data.safetyBoxGold;
                this.carried.string = UtilMgr_1.UtilMgr.changeMoney(data.gold);
                this.bank.string = UtilMgr_1.UtilMgr.changeMoney(data.safetyBoxGold);
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    refreshManagement(data) {
        cc.log(data, "Withdrawal");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.userBankInfoList.length > 0) {
                    this._userBankList = data.userBankInfoList;
                    this.managementView();
                    this.nextBtn.node.active = true;
                    this.nextBtn.interactable = true;
                    // this.refreshBankItem()
                    // this.refreshWithdrawAccItem()
                }
                else {
                    this.nextBtn.node.active = true;
                    this.nextBtn.interactable = false;
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    witharawalRecordView(recordList) {
        this.withdrawalLogsLayout.removeAllChildren();
        for (let i = 0; i < recordList.length; i++) {
            let withdrawalLogsItem = cc.instantiate(this.withdrawalLogsItem);
            withdrawalLogsItem.active = true;
            withdrawalLogsItem.parent = this.withdrawalLogsLayout;
            withdrawalLogsItem.getChildByName("account").getComponent(cc.Label).string = "****" + recordList[i].bankCard.substring(recordList[i].bankCard.length - 4);
            withdrawalLogsItem.getChildByName("amount").getComponent(cc.Label).string = UtilMgr_1.UtilMgr.changeMoney(recordList[i].drawingGlod);
            withdrawalLogsItem.getChildByName("details").getComponent(cc.Label).string = LanguageImpl_1.i18n.WITHDRAWAL.WithdrawalStatus[recordList[i].drawingStatus];
            let tiem = new Date(recordList[i].applyTime).format("MM-dd hh:mm");
            withdrawalLogsItem.getChildByName("time").getComponent(cc.Label).string = tiem;
        }
        this.pageText.string = this._page + "/" + this._pageTotal;
    }
    getBankAccByName() {
        let bankAccList = {};
        for (let i = 0; i < this._userBankList.length; i++) {
            let bankName = this._userBankList[i].bankName;
            if (!bankAccList[bankName]) {
                bankAccList[bankName] = [];
            }
            bankAccList[bankName].push(this._userBankList[i]);
        }
        return bankAccList;
    }
    managementView() {
        this.accountLayout.removeAllChildren();
        for (let i = 0; i < this._userBankList.length; i++) {
            User_1.User._bankList[i] = this._userBankList[i].bankCard;
            let accountItem = cc.instantiate(this.accountItem);
            accountItem.active = true;
            accountItem.parent = this.accountLayout;
            accountItem.getComponent(WithdrawalItem_1.default).init(this._userBankList[i], i, this.onClickAccountItemCallback.bind(this));
        }
        // this.accountLayout.y = this._userBankList.length < this._maxAccountCount ? 45 : 0
        this.addBankCard.active = this._userBankList.length < this._maxAccountCount;
        let bankIndex = Manager_1.Manager.localStorage.getItem("selectBankIndex");
        this._clickItemId = bankIndex;
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "infoClose":
                this.infoNode.active = false;
                break;
            case "management":
                this.onClickToggle(name);
                break;
            case "withdrawal":
                this.onClickToggle(name);
                break;
            case "withdrawalLogs":
                this.onClickToggle(name);
                break;
            case "addCardBtn":
                this.onClickBindAccount();
                break;
            case "managementNextBtn":
                this.onClickManagementNextBtn();
                break;
            case "withdrawalNext":
                this.onClickWithdrawalNextBtn();
                break;
            case "confirm":
                this.onClickConfirm();
                break;
            case "lastPage":
                this.onClicklastPage();
                break;
            case "nextPage":
                this.onClicknextPage();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    onClickWithdrawalNextBtn() {
        let input = this.amountEditbox.string;
        if (input == "") {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.BIND.INPUTAMOUNT);
            return;
        }
        let amount = UtilMgr_1.UtilMgr.formatFloat(UtilMgr_1.UtilMgr.recoverMoney(input) * 10000);
        if (this._minWithdrawalAmount > amount) {
            // PanelHelp.showTip(i18n.WITHDRAWAL.MINAMOUNT + UtilMgr.formatFloat(this._minWithdrawalAmount / 10000))
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.WITHDRAWAL.INPUTMINAMOUNT);
            return;
        }
        // let fee = amount * this.withdrawalConfig.chargeRate/100
        // let totalGold = UtilMgr.formatFloat(User._gold + User._bank)
        let totalGold = this._maxWithdrawalAmount;
        if (totalGold < amount && amount <= this._insufficientBetAmount) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.WITHDRAWAL.IWBBET);
            return;
        }
        if (amount > this._insufficientBetAmount) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.WITHDRAWAL.IWB);
            return;
        }
        this.infoNode.active = true;
        this.infoAmountText.string = input;
        if (this.withdrawalConfig.chargeRate == 0) {
            // this.infoFeeText.node.parent.active = false;
            this.infoFeeText.language = LanguageImpl_1.i18n.WITHDRAWAL.Limitedfree;
        }
        else {
            // this.infoFeeText.node.parent.active = true;
            this.infoFeeText.string = UtilMgr_1.UtilMgr.changeMoney(amount * this.withdrawalConfig.chargeRate / 100);
        }
        // this.infoFeeText.string = UtilMgr.changeMoney(amount  * this.withdrawalConfig.chargeRate/100)
        this.infoBankText.string = this._userBankList[this._clickItemId].bankName;
        this.infoAccountText.string = UtilMgr_1.UtilMgr.setBankCardStringCover(this._userBankList[this._clickItemId].bankCard);
        this.pwdEditbox.string = "";
    }
    onEditboxEnd(editbox, customEventData) {
        let input = editbox.string;
        if (input == "" || parseInt(input) == 0) {
            editbox.string = "";
            this.withdrawalNext.interactable = false;
        }
        else {
            this.withdrawalNext.interactable = true;
        }
        // if (input == "" || parseInt(input) == 0 ) {
        //     editbox.string =""
        //     return
        // }
        // let amount = UtilMgr.formatFloat(UtilMgr.recoverMoney(input) * 10000)
        // if (this._minWithdrawalAmount > amount) {
        //     editbox.string = UtilMgr.changeMoney(this._minWithdrawalAmount)
        //     return
        // }
        // let fee = amount * this.withdrawalConfig.chargeRate/100
        // let totalGold = UtilMgr.formatFloat(User._gold + User._bank)
        // if (totalGold < amount+fee) {
        //     let am = Math.floor(totalGold/10000  /  (1+this.withdrawalConfig.chargeRate/100))
        //     editbox.string = UtilMgr.changeMoney(am * 10000)
        //     return
        // }
    }
    onClickManagementNextBtn() {
        this.resetVeiw();
        this.reqSafetyBox();
        this.reqWithdrawalConfig();
        this.withdrawalTip.active = true;
        this.withdrawalContent.active = true;
    }
    onClickCheck(node) {
        if (node.active) {
            cc.tween(node)
                .set({ scaleY: 1 })
                .to(0.1, { scaleY: 0 })
                .call(() => {
                node.active = false;
            })
                .start();
        }
        else {
            node.active = true;
            cc.tween(node)
                .set({ scaleY: 0 })
                .to(0.1, { scaleY: 1 })
                .start();
        }
    }
    onClicknextPage() {
        if (this._page == this._pageTotal) {
            return;
        }
        this._page = this._page + 1;
        this.reqWithdrawalRecord();
    }
    onClicklastPage() {
        if (this._page == 1) {
            return;
        }
        this._page = this._page - 1;
        this.reqWithdrawalRecord();
    }
    onClickAccountItemCallback(itemId) {
        this._clickItemId = itemId;
        this.accountLayout.children.forEach((element, index) => {
            element.getComponent(WithdrawalItem_1.default).checkToggle.isChecked = itemId == index;
            //element.getComponent(WithdrawalItem).checkToggle.node.active = itemId == index
        });
    }
    onClickConfirm() {
        let input = this.amountEditbox.string;
        if (input == "") {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.BIND.INPUTACCOUNT);
            return;
        }
        let amount = UtilMgr_1.UtilMgr.formatFloat(UtilMgr_1.UtilMgr.recoverMoney(input) * 10000);
        // if (this._minWithdrawalAmount > amount) {
        //     PanelHelp.showTip(i18n.WITHDRAWAL.MINAMOUNT + UtilMgr.formatFloat(this._minWithdrawalAmount / 10000))
        //     return
        // }
        // let totalGold = UtilMgr.formatFloat(User._gold + User._bank)
        // if (totalGold < amount) {
        //     PanelHelp.showTip(i18n.WITHDRAWAL.IWB)
        //     return
        // }
        let pwd = this.pwdEditbox.string;
        if (pwd == "") {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.WITHDRAWAL.ERROR.EMPTY_PWD);
            return;
        }
        this.reqWithdrawal(amount, pwd);
    }
    onClickBindAccount() {
    }
    resetVeiw() {
        this.managementTip.active = false;
        this.managementContent.active = false;
        this.withdrawalTip.active = false;
        this.withdrawalContent.active = false;
        this.withdrawalLogsContent.active = false;
    }
    onClickToggle(name) {
        this.resetVeiw();
        if (name == "management") {
            this.managementTip.active = true;
            this.managementContent.active = true;
        }
        else if (name == "withdrawal") {
            // if (this._userBankList.length > 0) {
            //     let bankIndex = Manager.localStorage.getItem("selectBankIndex")
            //     this.bankName.string = this._userBankList[bankIndex].bankName
            //     this.bankCard.string = UtilMgr.setStringCover(this._userBankList[bankIndex].bankCard)
            //     this.viewBg.active = true
            //     this.withdrawalTip.active = true
            //     this.withdrawalContent.active = true
            //     this.reqSafetyBox()
            //     this.reqWithdrawalConfig()
            // } else {
            //     PanelHelp.showTip(i18n.WITHDRAWAL.UNBOUNDBANK)
            // }
            this.managementContent.active = true;
        }
        else if (name == "withdrawalLogs") {
            this.withdrawalLogsContent.active = true;
            this.reqWithdrawalRecord();
        }
    }
    reqWithdrawalRecord() {
        let req = CommonService_1.protoPackage.hall.base.WithdrawalRecordReq.create({ userId: User_1.User._userID, page: this._page, size: this._pageSize });
        let buffer = CommonService_1.protoPackage.hall.base.WithdrawalRecordReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_WithdrawalRecord, buffer);
    }
    reqWithdrawal(amount, pwd) {
        let bankInfoId = this._userBankList[this._clickItemId].id;
        let req = CommonService_1.protoPackage.hall.base.WithdrawalReq.create({ userId: User_1.User._userID, drawingGlod: amount, bankInfoId: bankInfoId, realName: bankInfoId.realName, phone: User_1.User._phone, passwd: base64Encrypt(pwd) });
        let buffer = CommonService_1.protoPackage.hall.base.WithdrawalReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_Withdrawal, buffer);
    }
    reqWithdrawalConfig() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_WithdrawalConfig, null);
    }
    reqSafetyBox() {
        let req = CommonService_1.protoPackage.hall.RefreshSafetyBox.create({ userId: User_1.User._userID });
        let buffer = CommonService_1.protoPackage.hall.RefreshSafetyBox.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.REFRESH_SAFETY_BOX, buffer);
    }
    reqBankList() {
        let req = CommonService_1.protoPackage.hall.base.GetBankInfoReq.create({ userId: User_1.User._userID });
        let buffer = CommonService_1.protoPackage.hall.base.GetBankInfoReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_GetBankInfo, buffer);
    }
    start() {
        this.reqBankList();
    }
};
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "managementTip", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "withdrawalTip", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "managementContent", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "withdrawalContent", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "withdrawalLogsContent", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "accountLayout", void 0);
__decorate([
    property(cc.Prefab)
], WithdrawalView.prototype, "accountItem", void 0);
__decorate([
    property(cc.Button)
], WithdrawalView.prototype, "nextBtn", void 0);
__decorate([
    property(cc.Button)
], WithdrawalView.prototype, "withdrawalNext", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "carried", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "bank", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "witharawalRate", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "minWithdrawalAmount", void 0);
__decorate([
    property(cc.EditBox)
], WithdrawalView.prototype, "amountEditbox", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "withdrawalLogsItem", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "withdrawalLogsLayout", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "pageText", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "addBankCard", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "addBankCardLabel", void 0);
__decorate([
    property(cc.Node)
], WithdrawalView.prototype, "infoNode", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "infoAmountText", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "infoFeeText", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "infoBankText", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "infoAccountText", void 0);
__decorate([
    property(cc.EditBox)
], WithdrawalView.prototype, "pwdEditbox", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "carriedLab", void 0);
__decorate([
    property(cc.Label)
], WithdrawalView.prototype, "bankLab", void 0);
WithdrawalView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], WithdrawalView);
exports.default = WithdrawalView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2l0aGRyYXdhbC9XaXRoZHJhd2FsVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtFQUF1RDtBQUN2RCx1REFBb0Q7QUFDcEQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUUxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBQzVDLHlDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsb0VBQTRDO0FBQzVDLHNFQUE4QztBQUU5QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMseUZBQXlGO0FBSXpGLElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLGdCQUFNO0lBQWxEOztRQUdJLGtCQUFhLEdBQVksSUFBSSxDQUFBO1FBRzdCLGtCQUFhLEdBQVksSUFBSSxDQUFBO1FBRzdCLHNCQUFpQixHQUFZLElBQUksQ0FBQTtRQUdqQyxzQkFBaUIsR0FBWSxJQUFJLENBQUE7UUFHakMsMEJBQXFCLEdBQVksSUFBSSxDQUFBO1FBR3JDLGtCQUFhLEdBQVksSUFBSSxDQUFBO1FBRzdCLGdCQUFXLEdBQWMsSUFBSSxDQUFBO1FBRzdCLFlBQU8sR0FBYyxJQUFJLENBQUE7UUFJekIsbUJBQWMsR0FBYyxJQUFJLENBQUE7UUFJaEMsWUFBTyxHQUFhLElBQUksQ0FBQTtRQUd4QixTQUFJLEdBQWEsSUFBSSxDQUFBO1FBSXJCLG1CQUFjLEdBQWEsSUFBSSxDQUFBO1FBRy9CLHdCQUFtQixHQUFhLElBQUksQ0FBQTtRQUdwQyxrQkFBYSxHQUFlLElBQUksQ0FBQTtRQUdoQyx1QkFBa0IsR0FBWSxJQUFJLENBQUE7UUFHbEMseUJBQW9CLEdBQVksSUFBSSxDQUFBO1FBR3BDLGFBQVEsR0FBYSxJQUFJLENBQUE7UUFHekIsZ0JBQVcsR0FBWSxJQUFJLENBQUE7UUFFM0IscUJBQWdCLEdBQWEsSUFBSSxDQUFBO1FBR2pDLGFBQVEs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Q29udGVudCI6WyJpbXBvcnQgU2VuZFZlcmlmaWNhdGlvbkNvZGUgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2VuZFZlcmlmaWNhdGlvbkNvZGVcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgV2l0aGRyYXdhbEl0ZW0gZnJvbSBcIi4vV2l0aGRyYXdhbEl0ZW1cIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLy9vcHRpb25hbCBpbnQzMiBkcmF3aW5nU3RhdHVzID04OyAvL+aPkOasvueKtuaAgSgw562J5b6F5aSE55CGLDEwMOWuoeaguOmAmui/hywyMDDmj5DmrL7kuK0sMzAw5o+Q5qy+5oiQ5YqfLC0xMDDlrqHmoLjlpLHotKUsLTMwMOaPkOasvuWksei0pSlcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpdGhkcmF3YWxWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPntcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1hbmFnZW1lbnRUaXA6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aXRoZHJhd2FsVGlwOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbWFuYWdlbWVudENvbnRlbnQ6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aXRoZHJhd2FsQ29udGVudDogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHdpdGhkcmF3YWxMb2dzQ29udGVudDogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGFjY291bnRMYXlvdXQ6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGFjY291bnRJdGVtOiBjYy5QcmVmYWIgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIG5leHRCdG46IGNjLkJ1dHRvbiA9IG51bGxcblxuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICB3aXRoZHJhd2FsTmV4dDogY2MuQnV0dG9uID0gbnVsbFxuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY2FycmllZDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYmFuazogY2MuTGFiZWwgPSBudWxsXG5cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB3aXRoYXJhd2FsUmF0ZTogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbWluV2l0aGRyYXdhbEFtb3VudDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBhbW91bnRFZGl0Ym94OiBjYy5FZGl0Qm94ID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2l0aGRyYXdhbExvZ3NJdGVtOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2l0aGRyYXdhbExvZ3NMYXlvdXQ6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGFnZVRleHQ6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYWRkQmFua0NhcmQ6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGFkZEJhbmtDYXJkTGFiZWw6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaW5mb05vZGU6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaW5mb0Ftb3VudFRleHQ6IGNjLkxhYmVsID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmZvRmVlVGV4dDogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGluZm9CYW5rVGV4dDogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGluZm9BY2NvdW50VGV4dDogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcHdkRWRpdGJveDogY2MuRWRpdEJveCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjYXJyaWVkTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYmFua0xhYjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgX3VzZXJCYW5rTGlzdDogYW55ID0gW11cblxuICAgIF9taW5XaXRoZHJhd2FsQW1vdW50OiBudW1iZXIgPSAwXG5cbiAgICBfbWF4QWNjb3VudENvdW50OiBudW1iZXIgPSAzXG5cbiAgICBfY2xpY2tJdGVtSWQ6IG51bWJlciA9IDBcblxuICAgIF9wYWdlOiBudW1iZXIgPSAxXG5cbiAgICBfcGFnZVRvdGFsOiBudW1iZXIgPSAxXG5cbiAgICBfcGFnZVNpemU6IG51bWJlciA9IDVcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICB3aXRoZHJhd2FsQ29uZmlnOiBhbnk7XG4gICAgcHJpdmF0ZSBfbWF4V2l0aGRyYXdhbEFtb3VudDogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgX2luc3VmZmljaWVudEJldEFtb3VudDogbnVtYmVyID0gMFxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcIndpdGhkcmF3YWwvcHJlZmFicy9XaXRoZHJhd2FsVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuICAgICAgICB0aGlzLm1hbmFnZW1lbnRUaXAuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLm1hbmFnZW1lbnRDb250ZW50LmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy53aXRoZHJhd2FsVGlwLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMud2l0aGRyYXdhbENvbnRlbnQuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy53aXRoZHJhd2FsTG9nc0NvbnRlbnQuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5pbmZvTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLmFtb3VudEVkaXRib3gubm9kZS5vbihcInRleHQtY2hhbmdlZFwiLCB0aGlzLmJhbmtFZGl0Q2hhbmdlZCwgdGhpcylcbiAgICAgICAgdGhpcy5hZGRCYW5rQ2FyZExhYmVsLnN0cmluZyA9IGkxOG4uV0lUSERSQVdBTC5BRERCQU5LQ0FSRFxuICAgICAgICB0aGlzLmFtb3VudEVkaXRib3gucGxhY2Vob2xkZXIgPSBNYW5hZ2VyLmdldExhbmd1YWdlKFwiV0lUSERSQVdBTC5XSVRIRFJBV0FMQU1PVU5UXCIpXG4gICAgICAgIHRoaXMuY2FycmllZExhYi5zdHJpbmcgPSBpMThuLkJBTksuQ0FSUklFRDtcbiAgICAgICAgdGhpcy5iYW5rTGFiLnN0cmluZyA9IGkxOG4uQkFOSy5CQU5LO1xuICAgICAgICB0aGlzLnB3ZEVkaXRib3gucGxhY2Vob2xkZXIgPSBNYW5hZ2VyLmdldExhbmd1YWdlKFwiV0lUSERSQVdBTC5TRUNPTkRBUllQQVNTV09SRFwiKVxuXG4gICAgfVxuXG4gICAgYmFua0VkaXRDaGFuZ2VkKGVkaXRib3gpIHtcbiAgICAgICAgaWYgKGVkaXRib3guc3RyaW5nICYmIHBhcnNlRmxvYXQoZWRpdGJveC5zdHJpbmcpICE9IHBhcnNlSW50KGVkaXRib3guc3RyaW5nKSkgey8v5pi+56S66L6T5YWl5pW05pWwXG4gICAgICAgICAgICBlZGl0Ym94LnN0cmluZyA9IHBhcnNlSW50KGVkaXRib3guc3RyaW5nKVxuICAgICAgICB9XG4gICAgICAgIGxldCBpbnB1dCA9IFV0aWxNZ3IuZm9ybWF0RmxvYXQoVXRpbE1nci5yZWNvdmVyTW9uZXkoZWRpdGJveC5zdHJpbmcpICogMTAwMDApXG4gICAgICAgIGVkaXRib3guc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShpbnB1dClcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0dldEJhbmtJbmZvKSwgdGhpcy5yZWZyZXNoTWFuYWdlbWVudCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuUkVGUkVTSF9TQUZFVFlfQk9YKSwgdGhpcy5yZWZyZXNoU2FmZXR5Qm94KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfV2l0aGRyYXdhbENvbmZpZyksIHRoaXMucmVmcmVzaFdpdGhkcmF3YWxDb25maWcpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XaXRoZHJhd2FsKSwgdGhpcy53aXRoZHJhd2FsQ2FsbGJhY2spO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XaXRoZHJhd2FsUmVjb3JkKSwgdGhpcy5yZWZyZXNoV2l0aGRyYXdhbFJlY29yZCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcInJlcUJhbmtMaXN0XCIsIHRoaXMucmVxQmFua0xpc3QpO1xuICAgIH1cblxuICAgIHJlZnJlc2hXaXRoZHJhd2FsUmVjb3JkKGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsIFwiV2l0aGRyYXdhbFJlY29yZFwiKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucmVjb3JkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2UgPSBkYXRhLmN1cnJQYWdlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VUb3RhbCA9IGRhdGEudG90YWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aXRoYXJhd2FsUmVjb3JkVmlldyhkYXRhLnJlY29yZExpc3QpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlVGV4dC5zdHJpbmcgPSB0aGlzLl9wYWdlICsgXCIvXCIgKyB0aGlzLl9wYWdlVG90YWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIkVSUk9SQ09ERS5cIiArIGRhdGEuc3RhdHVzTXNnLnN0YXR1cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2l0aGRyYXdhbENhbGxiYWNrKGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsIFwiV2l0aGRyYXdhbFwiKVxuICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXFTYWZldHlCb3goKVxuICAgICAgICAgICAgdGhpcy5yZXFXaXRoZHJhd2FsQ29uZmlnKClcbiAgICAgICAgICAgIHRoaXMuYW1vdW50RWRpdGJveC5zdHJpbmcgPSBcIlwiXG4gICAgICAgICAgICB0aGlzLndpdGhkcmF3YWxOZXh0LmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5XSVRIRFJBV0FMLlNVQ0NFU1MpO1xuICAgICAgICAgICAgdGhpcy5pbmZvTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09IDMwOSkge1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIldJVEhEUkFXQUwuV2l0aGRyYXdhbFN0YXR1cy5cIiArIGRhdGEuc3RhdHVzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIkVSUk9SQ09ERS5cIiArIGRhdGEuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hXaXRoZHJhd2FsQ29uZmlnKGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsIFwiV2l0aGRyYXdhbENvbmZpZ1wiKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aXRoZHJhd2FsQ29uZmlnID0gZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldpdGhkcmF3YWxBbW91bnQgPSBkYXRhLm1pbldpdGhkcmF3YWxBbW91bnRcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jaGFyZ2VSYXRlICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aXRoYXJhd2FsUmF0ZS5sYW5ndWFnZSA9IFN0cmluZy5mb3JtYXQoaTE4bi5XSVRIRFJBV0FMLlJBVEUsIGRhdGEuY2hhcmdlUmF0ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndpdGhhcmF3YWxSYXRlLmxhbmd1YWdlID0gaTE4bi5XSVRIRFJBV0FMLlJBVEVMaW1pdGVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX21heFdpdGhkcmF3YWxBbW91bnQgPSBkYXRhLm1heFdpdGhkcmF3YWxBbW91bnRcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN1ZmZpY2llbnRCZXRBbW91bnQgPSBkYXRhLmluc3VmZmljaWVudEJldEFtb3VudFxuXG4gICAgICAgICAgICAgICAgLy8gbGV0IHRvdGFsR29sZCA9IFV0aWxNZ3IuZm9ybWF0RmxvYXQoVXNlci5fZ29sZCArIFVzZXIuX2JhbmspXG4gICAgICAgICAgICAgICAgLy8gbGV0IG1heEFtb3VudCA9IE1hdGguZmxvb3IodG90YWxHb2xkLzEwMDAwICAvICAoMSt0aGlzLndpdGhkcmF3YWxDb25maWcuY2hhcmdlUmF0ZS8xMDApKVxuICAgICAgICAgICAgICAgIC8vIGlmIChtYXhBbW91bnQgKiAxMDAwMCA8IHRoaXMuX21pbldpdGhkcmF3YWxBbW91bnQpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgbWF4QW1vdW50ID0gMFxuICAgICAgICAgICAgICAgIC8vIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vICAgICBtYXhBbW91bnQgPSBtYXhBbW91bnQgKiAxMDAwMFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1pbldpdGhkcmF3YWxBbW91bnQubGFuZ3VhZ2UgPSBpMThuLldJVEhEUkFXQUwuTUlOQU1PVU5UICsgVXRpbE1nci5jaGFuZ2VNb25leSh0aGlzLl9taW5XaXRoZHJhd2FsQW1vdW50KSArIFwiL1wiICsgVXRpbE1nci5jaGFuZ2VNb25leSh0aGlzLl9tYXhXaXRoZHJhd2FsQW1vdW50KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hTYWZldHlCb3goZGF0YSkge1xuICAgICAgICBjYy5sb2coZGF0YSwgXCJTYWZldHlCb3hcIilcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgIFVzZXIuX2dvbGQgPSBkYXRhLmdvbGRcbiAgICAgICAgICAgICAgICBVc2VyLl9iYW5rID0gZGF0YS5zYWZldHlCb3hHb2xkXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJyaWVkLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5nb2xkKVxuICAgICAgICAgICAgICAgIHRoaXMuYmFuay5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEuc2FmZXR5Qm94R29sZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoTWFuYWdlbWVudChkYXRhKSB7XG4gICAgICAgIGNjLmxvZyhkYXRhLCBcIldpdGhkcmF3YWxcIilcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnVzZXJCYW5rSW5mb0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyQmFua0xpc3QgPSBkYXRhLnVzZXJCYW5rSW5mb0xpc3RcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VtZW50VmlldygpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEJ0bi5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlZnJlc2hCYW5rSXRlbSgpXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmVmcmVzaFdpdGhkcmF3QWNjSXRlbSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0QnRuLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aXRoYXJhd2FsUmVjb3JkVmlldyhyZWNvcmRMaXN0KSB7XG4gICAgICAgIHRoaXMud2l0aGRyYXdhbExvZ3NMYXlvdXQucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3aXRoZHJhd2FsTG9nc0l0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndpdGhkcmF3YWxMb2dzSXRlbSlcbiAgICAgICAgICAgIHdpdGhkcmF3YWxMb2dzSXRlbS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICB3aXRoZHJhd2FsTG9nc0l0ZW0ucGFyZW50ID0gdGhpcy53aXRoZHJhd2FsTG9nc0xheW91dFxuICAgICAgICAgICAgd2l0aGRyYXdhbExvZ3NJdGVtLmdldENoaWxkQnlOYW1lKFwiYWNjb3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiKioqKlwiICsgcmVjb3JkTGlzdFtpXS5iYW5rQ2FyZC5zdWJzdHJpbmcocmVjb3JkTGlzdFtpXS5iYW5rQ2FyZC5sZW5ndGggLSA0KVxuICAgICAgICAgICAgd2l0aGRyYXdhbExvZ3NJdGVtLmdldENoaWxkQnlOYW1lKFwiYW1vdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShyZWNvcmRMaXN0W2ldLmRyYXdpbmdHbG9kKVxuICAgICAgICAgICAgd2l0aGRyYXdhbExvZ3NJdGVtLmdldENoaWxkQnlOYW1lKFwiZGV0YWlsc1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGkxOG4uV0lUSERSQVdBTC5XaXRoZHJhd2FsU3RhdHVzW3JlY29yZExpc3RbaV0uZHJhd2luZ1N0YXR1c11cbiAgICAgICAgICAgIGxldCB0aWVtID0gbmV3IERhdGUocmVjb3JkTGlzdFtpXS5hcHBseVRpbWUpLmZvcm1hdChcIk1NLWRkIGhoOm1tXCIpXG4gICAgICAgICAgICB3aXRoZHJhd2FsTG9nc0l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGllbVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYWdlVGV4dC5zdHJpbmcgPSB0aGlzLl9wYWdlICsgXCIvXCIgKyB0aGlzLl9wYWdlVG90YWxcbiAgICB9XG5cbiAgICBnZXRCYW5rQWNjQnlOYW1lKCkge1xuICAgICAgICBsZXQgYmFua0FjY0xpc3QgPSB7fVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3VzZXJCYW5rTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGJhbmtOYW1lID0gdGhpcy5fdXNlckJhbmtMaXN0W2ldLmJhbmtOYW1lXG4gICAgICAgICAgICBpZiAoIWJhbmtBY2NMaXN0W2JhbmtOYW1lXSkge1xuICAgICAgICAgICAgICAgIGJhbmtBY2NMaXN0W2JhbmtOYW1lXSA9IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiYW5rQWNjTGlzdFtiYW5rTmFtZV0ucHVzaCh0aGlzLl91c2VyQmFua0xpc3RbaV0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhbmtBY2NMaXN0XG4gICAgfVxuXG4gICAgbWFuYWdlbWVudFZpZXcoKSB7XG4gICAgICAgIHRoaXMuYWNjb3VudExheW91dC5yZW1vdmVBbGxDaGlsZHJlbigpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdXNlckJhbmtMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBVc2VyLl9iYW5rTGlzdFtpXSA9IHRoaXMuX3VzZXJCYW5rTGlzdFtpXS5iYW5rQ2FyZFxuICAgICAgICAgICAgbGV0IGFjY291bnRJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5hY2NvdW50SXRlbSlcbiAgICAgICAgICAgIGFjY291bnRJdGVtLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIGFjY291bnRJdGVtLnBhcmVudCA9IHRoaXMuYWNjb3VudExheW91dFxuICAgICAgICAgICAgYWNjb3VudEl0ZW0uZ2V0Q29tcG9uZW50KFdpdGhkcmF3YWxJdGVtKS5pbml0KHRoaXMuX3VzZXJCYW5rTGlzdFtpXSwgaSwgdGhpcy5vbkNsaWNrQWNjb3VudEl0ZW1DYWxsYmFjay5iaW5kKHRoaXMpKVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuYWNjb3VudExheW91dC55ID0gdGhpcy5fdXNlckJhbmtMaXN0Lmxlbmd0aCA8IHRoaXMuX21heEFjY291bnRDb3VudCA/IDQ1IDogMFxuICAgICAgICB0aGlzLmFkZEJhbmtDYXJkLmFjdGl2ZSA9IHRoaXMuX3VzZXJCYW5rTGlzdC5sZW5ndGggPCB0aGlzLl9tYXhBY2NvdW50Q291bnRcblxuICAgICAgICBsZXQgYmFua0luZGV4ID0gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNlbGVjdEJhbmtJbmRleFwiKVxuICAgICAgICB0aGlzLl9jbGlja0l0ZW1JZCA9IGJhbmtJbmRleFxuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNsb3NlV2l0aEFjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpbmZvQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmluZm9Ob2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWFuYWdlbWVudFwiOiB0aGlzLm9uQ2xpY2tUb2dnbGUobmFtZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIndpdGhkcmF3YWxcIjogdGhpcy5vbkNsaWNrVG9nZ2xlKG5hbWUpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3aXRoZHJhd2FsTG9nc1wiOiB0aGlzLm9uQ2xpY2tUb2dnbGUobmFtZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFkZENhcmRCdG5cIjogdGhpcy5vbkNsaWNrQmluZEFjY291bnQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWFuYWdlbWVudE5leHRCdG5cIjogdGhpcy5vbkNsaWNrTWFuYWdlbWVudE5leHRCdG4oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwid2l0aGRyYXdhbE5leHRcIjogdGhpcy5vbkNsaWNrV2l0aGRyYXdhbE5leHRCdG4oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY29uZmlybVwiOiB0aGlzLm9uQ2xpY2tDb25maXJtKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhc3RQYWdlXCI6IHRoaXMub25DbGlja2xhc3RQYWdlKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5leHRQYWdlXCI6IHRoaXMub25DbGlja25leHRQYWdlKCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2xpY2tXaXRoZHJhd2FsTmV4dEJ0bigpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5hbW91bnRFZGl0Ym94LnN0cmluZ1xuXG4gICAgICAgIGlmIChpbnB1dCA9PSBcIlwiKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkJJTkQuSU5QVVRBTU9VTlQpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbW91bnQgPSBVdGlsTWdyLmZvcm1hdEZsb2F0KFV0aWxNZ3IucmVjb3Zlck1vbmV5KGlucHV0KSAqIDEwMDAwKVxuICAgICAgICBpZiAodGhpcy5fbWluV2l0aGRyYXdhbEFtb3VudCA+IGFtb3VudCkge1xuICAgICAgICAgICAgLy8gUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5XSVRIRFJBV0FMLk1JTkFNT1VOVCArIFV0aWxNZ3IuZm9ybWF0RmxvYXQodGhpcy5fbWluV2l0aGRyYXdhbEFtb3VudCAvIDEwMDAwKSlcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uV0lUSERSQVdBTC5JTlBVVE1JTkFNT1VOVClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIC8vIGxldCBmZWUgPSBhbW91bnQgKiB0aGlzLndpdGhkcmF3YWxDb25maWcuY2hhcmdlUmF0ZS8xMDBcbiAgICAgICAgLy8gbGV0IHRvdGFsR29sZCA9IFV0aWxNZ3IuZm9ybWF0RmxvYXQoVXNlci5fZ29sZCArIFVzZXIuX2JhbmspXG4gICAgICAgIGxldCB0b3RhbEdvbGQgPSB0aGlzLl9tYXhXaXRoZHJhd2FsQW1vdW50XG4gICAgICAgIGlmICh0b3RhbEdvbGQgPCBhbW91bnQgJiYgYW1vdW50IDw9IHRoaXMuX2luc3VmZmljaWVudEJldEFtb3VudCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5XSVRIRFJBV0FMLklXQkJFVClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChhbW91bnQgPiB0aGlzLl9pbnN1ZmZpY2llbnRCZXRBbW91bnQpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uV0lUSERSQVdBTC5JV0IpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5mb05vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLmluZm9BbW91bnRUZXh0LnN0cmluZyA9IGlucHV0XG4gICAgICAgIGlmICh0aGlzLndpdGhkcmF3YWxDb25maWcuY2hhcmdlUmF0ZSA9PSAwKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmluZm9GZWVUZXh0Lm5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbmZvRmVlVGV4dC5sYW5ndWFnZSA9IGkxOG4uV0lUSERSQVdBTC5MaW1pdGVkZnJlZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcy5pbmZvRmVlVGV4dC5ub2RlLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pbmZvRmVlVGV4dC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGFtb3VudCAqIHRoaXMud2l0aGRyYXdhbENvbmZpZy5jaGFyZ2VSYXRlIC8gMTAwKVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuaW5mb0ZlZVRleHQuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShhbW91bnQgICogdGhpcy53aXRoZHJhd2FsQ29uZmlnLmNoYXJnZVJhdGUvMTAwKVxuICAgICAgICB0aGlzLmluZm9CYW5rVGV4dC5zdHJpbmcgPSB0aGlzLl91c2VyQmFua0xpc3RbdGhpcy5fY2xpY2tJdGVtSWRdLmJhbmtOYW1lXG4gICAgICAgIHRoaXMuaW5mb0FjY291bnRUZXh0LnN0cmluZyA9IFV0aWxNZ3Iuc2V0QmFua0NhcmRTdHJpbmdDb3Zlcih0aGlzLl91c2VyQmFua0xpc3RbdGhpcy5fY2xpY2tJdGVtSWRdLmJhbmtDYXJkKVxuICAgICAgICB0aGlzLnB3ZEVkaXRib3guc3RyaW5nID0gXCJcIlxuICAgIH1cblxuICAgIG9uRWRpdGJveEVuZChlZGl0Ym94LCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWRpdGJveC5zdHJpbmdcbiAgICAgICAgaWYgKGlucHV0ID09IFwiXCIgfHwgcGFyc2VJbnQoaW5wdXQpID09IDApIHtcbiAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gXCJcIlxuICAgICAgICAgICAgdGhpcy53aXRoZHJhd2FsTmV4dC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud2l0aGRyYXdhbE5leHQuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAoaW5wdXQgPT0gXCJcIiB8fCBwYXJzZUludChpbnB1dCkgPT0gMCApIHtcbiAgICAgICAgLy8gICAgIGVkaXRib3guc3RyaW5nID1cIlwiXG4gICAgICAgIC8vICAgICByZXR1cm5cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgYW1vdW50ID0gVXRpbE1nci5mb3JtYXRGbG9hdChVdGlsTWdyLnJlY292ZXJNb25leShpbnB1dCkgKiAxMDAwMClcbiAgICAgICAgLy8gaWYgKHRoaXMuX21pbldpdGhkcmF3YWxBbW91bnQgPiBhbW91bnQpIHtcbiAgICAgICAgLy8gICAgIGVkaXRib3guc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leSh0aGlzLl9taW5XaXRoZHJhd2FsQW1vdW50KVxuICAgICAgICAvLyAgICAgcmV0dXJuXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gbGV0IGZlZSA9IGFtb3VudCAqIHRoaXMud2l0aGRyYXdhbENvbmZpZy5jaGFyZ2VSYXRlLzEwMFxuICAgICAgICAvLyBsZXQgdG90YWxHb2xkID0gVXRpbE1nci5mb3JtYXRGbG9hdChVc2VyLl9nb2xkICsgVXNlci5fYmFuaylcbiAgICAgICAgLy8gaWYgKHRvdGFsR29sZCA8IGFtb3VudCtmZWUpIHtcbiAgICAgICAgLy8gICAgIGxldCBhbSA9IE1hdGguZmxvb3IodG90YWxHb2xkLzEwMDAwICAvICAoMSt0aGlzLndpdGhkcmF3YWxDb25maWcuY2hhcmdlUmF0ZS8xMDApKVxuICAgICAgICAvLyAgICAgZWRpdGJveC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGFtICogMTAwMDApXG4gICAgICAgIC8vICAgICByZXR1cm5cbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBvbkNsaWNrTWFuYWdlbWVudE5leHRCdG4oKSB7XG4gICAgICAgIHRoaXMucmVzZXRWZWl3KClcbiAgICAgICAgdGhpcy5yZXFTYWZldHlCb3goKVxuICAgICAgICB0aGlzLnJlcVdpdGhkcmF3YWxDb25maWcoKVxuICAgICAgICB0aGlzLndpdGhkcmF3YWxUaXAuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLndpdGhkcmF3YWxDb250ZW50LmFjdGl2ZSA9IHRydWVcbiAgICB9XG4gICAgb25DbGlja0NoZWNrKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuYWN0aXZlKSB7XG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxuICAgICAgICAgICAgICAgIC5zZXQoeyBzY2FsZVk6IDEgfSlcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IHNjYWxlWTogMCB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcbiAgICAgICAgICAgICAgICAuc2V0KHsgc2NhbGVZOiAwIH0pXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZVk6IDEgfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGlja25leHRQYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5fcGFnZSA9PSB0aGlzLl9wYWdlVG90YWwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BhZ2UgPSB0aGlzLl9wYWdlICsgMVxuICAgICAgICB0aGlzLnJlcVdpdGhkcmF3YWxSZWNvcmQoKVxuICAgIH1cblxuICAgIG9uQ2xpY2tsYXN0UGFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhZ2UgPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGFnZSA9IHRoaXMuX3BhZ2UgLSAxXG4gICAgICAgIHRoaXMucmVxV2l0aGRyYXdhbFJlY29yZCgpXG4gICAgfVxuXG4gICAgb25DbGlja0FjY291bnRJdGVtQ2FsbGJhY2soaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuX2NsaWNrSXRlbUlkID0gaXRlbUlkXG4gICAgICAgIHRoaXMuYWNjb3VudExheW91dC5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5nZXRDb21wb25lbnQoV2l0aGRyYXdhbEl0ZW0pLmNoZWNrVG9nZ2xlLmlzQ2hlY2tlZCA9IGl0ZW1JZCA9PSBpbmRleFxuICAgICAgICAgICAgLy9lbGVtZW50LmdldENvbXBvbmVudChXaXRoZHJhd2FsSXRlbSkuY2hlY2tUb2dnbGUubm9kZS5hY3RpdmUgPSBpdGVtSWQgPT0gaW5kZXhcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkNsaWNrQ29uZmlybSgpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5hbW91bnRFZGl0Ym94LnN0cmluZ1xuXG4gICAgICAgIGlmIChpbnB1dCA9PSBcIlwiKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkJJTkQuSU5QVVRBQ0NPVU5UKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYW1vdW50ID0gVXRpbE1nci5mb3JtYXRGbG9hdChVdGlsTWdyLnJlY292ZXJNb25leShpbnB1dCkgKiAxMDAwMClcbiAgICAgICAgLy8gaWYgKHRoaXMuX21pbldpdGhkcmF3YWxBbW91bnQgPiBhbW91bnQpIHtcbiAgICAgICAgLy8gICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uV0lUSERSQVdBTC5NSU5BTU9VTlQgKyBVdGlsTWdyLmZvcm1hdEZsb2F0KHRoaXMuX21pbldpdGhkcmF3YWxBbW91bnQgLyAxMDAwMCkpXG4gICAgICAgIC8vICAgICByZXR1cm5cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgdG90YWxHb2xkID0gVXRpbE1nci5mb3JtYXRGbG9hdChVc2VyLl9nb2xkICsgVXNlci5fYmFuaylcbiAgICAgICAgLy8gaWYgKHRvdGFsR29sZCA8IGFtb3VudCkge1xuICAgICAgICAvLyAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5XSVRIRFJBV0FMLklXQilcbiAgICAgICAgLy8gICAgIHJldHVyblxuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IHB3ZCA9IHRoaXMucHdkRWRpdGJveC5zdHJpbmdcbiAgICAgICAgaWYgKHB3ZCA9PSBcIlwiKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLldJVEhEUkFXQUwuRVJST1IuRU1QVFlfUFdEKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXFXaXRoZHJhd2FsKGFtb3VudCwgcHdkKVxuICAgIH1cblxuXG4gICAgb25DbGlja0JpbmRBY2NvdW50KCkge1xuICAgIH1cblxuICAgIHJlc2V0VmVpdygpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VtZW50VGlwLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWFuYWdlbWVudENvbnRlbnQuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy53aXRoZHJhd2FsVGlwLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMud2l0aGRyYXdhbENvbnRlbnQuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy53aXRoZHJhd2FsTG9nc0NvbnRlbnQuYWN0aXZlID0gZmFsc2VcbiAgICB9XG5cbiAgICBvbkNsaWNrVG9nZ2xlKG5hbWUpIHtcbiAgICAgICAgdGhpcy5yZXNldFZlaXcoKVxuICAgICAgICBpZiAobmFtZSA9PSBcIm1hbmFnZW1lbnRcIikge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VtZW50VGlwLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMubWFuYWdlbWVudENvbnRlbnQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJ3aXRoZHJhd2FsXCIpIHtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLl91c2VyQmFua0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIGxldCBiYW5rSW5kZXggPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2VsZWN0QmFua0luZGV4XCIpXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iYW5rTmFtZS5zdHJpbmcgPSB0aGlzLl91c2VyQmFua0xpc3RbYmFua0luZGV4XS5iYW5rTmFtZVxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmFua0NhcmQuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmdDb3Zlcih0aGlzLl91c2VyQmFua0xpc3RbYmFua0luZGV4XS5iYW5rQ2FyZClcblxuICAgICAgICAgICAgLy8gICAgIHRoaXMudmlld0JnLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIC8vICAgICB0aGlzLndpdGhkcmF3YWxUaXAuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgLy8gICAgIHRoaXMud2l0aGRyYXdhbENvbnRlbnQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgLy8gICAgIHRoaXMucmVxU2FmZXR5Qm94KClcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJlcVdpdGhkcmF3YWxDb25maWcoKVxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLldJVEhEUkFXQUwuVU5CT1VOREJBTkspXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHRoaXMubWFuYWdlbWVudENvbnRlbnQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJ3aXRoZHJhd2FsTG9nc1wiKSB7XG4gICAgICAgICAgICB0aGlzLndpdGhkcmF3YWxMb2dzQ29udGVudC5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLnJlcVdpdGhkcmF3YWxSZWNvcmQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVxV2l0aGRyYXdhbFJlY29yZCgpIHtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLmJhc2UuV2l0aGRyYXdhbFJlY29yZFJlcS5jcmVhdGUoeyB1c2VySWQ6IFVzZXIuX3VzZXJJRCwgcGFnZTogdGhpcy5fcGFnZSwgc2l6ZTogdGhpcy5fcGFnZVNpemUgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5iYXNlLldpdGhkcmF3YWxSZWNvcmRSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XaXRoZHJhd2FsUmVjb3JkLFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICByZXFXaXRoZHJhd2FsKGFtb3VudCwgcHdkKSB7XG4gICAgICAgIGxldCBiYW5rSW5mb0lkID0gdGhpcy5fdXNlckJhbmtMaXN0W3RoaXMuX2NsaWNrSXRlbUlkXS5pZFxuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuYmFzZS5XaXRoZHJhd2FsUmVxLmNyZWF0ZSh7IHVzZXJJZDogVXNlci5fdXNlcklELCBkcmF3aW5nR2xvZDogYW1vdW50LCBiYW5rSW5mb0lkOiBiYW5rSW5mb0lkLCByZWFsTmFtZTogYmFua0luZm9JZC5yZWFsTmFtZSwgcGhvbmU6IFVzZXIuX3Bob25lLCBwYXNzd2Q6IGJhc2U2NEVuY3J5cHQocHdkKSB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLmJhc2UuV2l0aGRyYXdhbFJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1dpdGhkcmF3YWwsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIHJlcVdpdGhkcmF3YWxDb25maWcoKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XaXRoZHJhd2FsQ29uZmlnLFxuICAgICAgICAgICAgbnVsbCk7XG4gICAgfVxuXG4gICAgcmVxU2FmZXR5Qm94KCkge1xuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuUmVmcmVzaFNhZmV0eUJveC5jcmVhdGUoeyB1c2VySWQ6IFVzZXIuX3VzZXJJRCB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLlJlZnJlc2hTYWZldHlCb3guZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlJFRlJFU0hfU0FGRVRZX0JPWCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcmVxQmFua0xpc3QoKSB7XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5iYXNlLkdldEJhbmtJbmZvUmVxLmNyZWF0ZSh7IHVzZXJJZDogVXNlci5fdXNlcklEIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuYmFzZS5HZXRCYW5rSW5mb1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0dldEJhbmtJbmZvLFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5yZXFCYW5rTGlzdCgpXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==