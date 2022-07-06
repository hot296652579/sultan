"use strict";
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