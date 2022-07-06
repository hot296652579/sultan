import SendVerificationCode from "../common/component/SendVerificationCode";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import WithdrawalItem from "./WithdrawalItem";

const { ccclass, property } = cc._decorator;

//optional int32 drawingStatus =8; //提款状态(0等待处理,100审核通过,200提款中,300提款成功,-100审核失败,-300提款失败)

@ccclass
@injectService(LobbyService.instance)
export default class WithdrawalView extends UIView implements IController<LobbyService>{

    @property(cc.Node)
    managementTip: cc.Node = null

    @property(cc.Node)
    withdrawalTip: cc.Node = null

    @property(cc.Node)
    managementContent: cc.Node = null

    @property(cc.Node)
    withdrawalContent: cc.Node = null

    @property(cc.Node)
    withdrawalLogsContent: cc.Node = null

    @property(cc.Node)
    accountLayout: cc.Node = null

    @property(cc.Prefab)
    accountItem: cc.Prefab = null

    @property(cc.Button)
    nextBtn: cc.Button = null


    @property(cc.Button)
    withdrawalNext: cc.Button = null


    @property(cc.Label)
    carried: cc.Label = null

    @property(cc.Label)
    bank: cc.Label = null


    @property(cc.Label)
    witharawalRate: cc.Label = null

    @property(cc.Label)
    minWithdrawalAmount: cc.Label = null

    @property(cc.EditBox)
    amountEditbox: cc.EditBox = null

    @property(cc.Node)
    withdrawalLogsItem: cc.Node = null

    @property(cc.Node)
    withdrawalLogsLayout: cc.Node = null

    @property(cc.Label)
    pageText: cc.Label = null

    @property(cc.Node)
    addBankCard: cc.Node = null
    @property(cc.Label)
    addBankCardLabel: cc.Label = null

    @property(cc.Node)
    infoNode: cc.Node = null

    @property(cc.Label)
    infoAmountText: cc.Label = null
    @property(cc.Label)
    infoFeeText: cc.Label = null
    @property(cc.Label)
    infoBankText: cc.Label = null
    @property(cc.Label)
    infoAccountText: cc.Label = null
    @property(cc.EditBox)
    pwdEditbox: cc.EditBox = null

    @property(cc.Label)
    carriedLab: cc.Label = null;

    @property(cc.Label)
    bankLab: cc.Label = null;

    _userBankList: any = []

    _minWithdrawalAmount: number = 0

    _maxAccountCount: number = 3

    _clickItemId: number = 0

    _page: number = 1

    _pageTotal: number = 1

    _pageSize: number = 5

    service: LobbyService;
    withdrawalConfig: any;
    private _maxWithdrawalAmount: number = 0
    private _insufficientBetAmount: number = 0

    public static getPrefabUrl() {
        return "withdrawal/prefabs/WithdrawalView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.managementTip.active = true
        this.managementContent.active = true
        this.withdrawalTip.active = false
        this.withdrawalContent.active = false
        this.withdrawalLogsContent.active = false
        this.infoNode.active = false
        this.amountEditbox.node.on("text-changed", this.bankEditChanged, this)
        this.addBankCardLabel.string = i18n.WITHDRAWAL.ADDBANKCARD
        this.amountEditbox.placeholder = Manager.getLanguage("WITHDRAWAL.WITHDRAWALAMOUNT")
        this.carriedLab.string = i18n.BANK.CARRIED;
        this.bankLab.string = i18n.BANK.BANK;
        this.pwdEditbox.placeholder = Manager.getLanguage("WITHDRAWAL.SECONDARYPASSWORD")

    }

    bankEditChanged(editbox) {
        if (editbox.string && parseFloat(editbox.string) != parseInt(editbox.string)) {//显示输入整数
            editbox.string = parseInt(editbox.string)
        }
        let input = UtilMgr.formatFloat(UtilMgr.recoverMoney(editbox.string) * 10000)
        editbox.string = UtilMgr.changeMoney(input)
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_GetBankInfo), this.refreshManagement);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.REFRESH_SAFETY_BOX), this.refreshSafetyBox);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_WithdrawalConfig), this.refreshWithdrawalConfig);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_Withdrawal), this.withdrawalCallback);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_WithdrawalRecord), this.refreshWithdrawalRecord);
        this.registerEvent("reqBankList", this.reqBankList);
    }

    refreshWithdrawalRecord(data) {
        cc.log(data, "WithdrawalRecord")
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.recordList.length > 0) {
                    this._page = data.currPage
                    this._pageTotal = data.total
                    this.witharawalRecordView(data.recordList)
                } else {
                    this.pageText.string = this._page + "/" + this._pageTotal
                }
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    withdrawalCallback(data) {
        cc.log(data, "Withdrawal")
        if (data.status == 0) {
            this.reqSafetyBox()
            this.reqWithdrawalConfig()
            this.amountEditbox.string = ""
            this.withdrawalNext.interactable = false;
            PanelHelp.showTip(i18n.WITHDRAWAL.SUCCESS);
            this.infoNode.active = false
        } else {
            if (data.status == 309) {
                PanelHelp.showMsgBox('', Manager.makeLanguage("WITHDRAWAL.WithdrawalStatus." + data.status));
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.status));
            }

        }
    }

    refreshWithdrawalConfig(data) {
        cc.log(data, "WithdrawalConfig")
        if (data) {
            if (data.statusMsg.status == 0) {
                this.withdrawalConfig = data
                this._minWithdrawalAmount = data.minWithdrawalAmount
                if (data.chargeRate != 0) {
                    this.witharawalRate.language = String.format(i18n.WITHDRAWAL.RATE, data.chargeRate)
                } else {
                    this.witharawalRate.language = i18n.WITHDRAWAL.RATELimited
                }
                this._maxWithdrawalAmount = data.maxWithdrawalAmount
                this._insufficientBetAmount = data.insufficientBetAmount

                // let totalGold = UtilMgr.formatFloat(User._gold + User._bank)
                // let maxAmount = Math.floor(totalGold/10000  /  (1+this.withdrawalConfig.chargeRate/100))
                // if (maxAmount * 10000 < this._minWithdrawalAmount) {
                //     maxAmount = 0
                // }else{
                //     maxAmount = maxAmount * 10000
                // }
                this.minWithdrawalAmount.language = i18n.WITHDRAWAL.MINAMOUNT + UtilMgr.changeMoney(this._minWithdrawalAmount) + "/" + UtilMgr.changeMoney(this._maxWithdrawalAmount)
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    refreshSafetyBox(data) {
        cc.log(data, "SafetyBox")
        if (data) {
            if (data.statusMsg.status == 0) {
                User._gold = data.gold
                User._bank = data.safetyBoxGold
                this.carried.string = UtilMgr.changeMoney(data.gold)
                this.bank.string = UtilMgr.changeMoney(data.safetyBoxGold)
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    refreshManagement(data) {
        cc.log(data, "Withdrawal")
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.userBankInfoList.length > 0) {
                    this._userBankList = data.userBankInfoList
                    this.managementView()
                    this.nextBtn.node.active = true;
                    this.nextBtn.interactable = true;
                    // this.refreshBankItem()
                    // this.refreshWithdrawAccItem()
                } else {
                    this.nextBtn.node.active = true;
                    this.nextBtn.interactable = false;
                }
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    witharawalRecordView(recordList) {
        this.withdrawalLogsLayout.removeAllChildren()
        for (let i = 0; i < recordList.length; i++) {
            let withdrawalLogsItem = cc.instantiate(this.withdrawalLogsItem)
            withdrawalLogsItem.active = true
            withdrawalLogsItem.parent = this.withdrawalLogsLayout
            withdrawalLogsItem.getChildByName("account").getComponent(cc.Label).string = "****" + recordList[i].bankCard.substring(recordList[i].bankCard.length - 4)
            withdrawalLogsItem.getChildByName("amount").getComponent(cc.Label).string = UtilMgr.changeMoney(recordList[i].drawingGlod)
            withdrawalLogsItem.getChildByName("details").getComponent(cc.Label).string = i18n.WITHDRAWAL.WithdrawalStatus[recordList[i].drawingStatus]
            let tiem = new Date(recordList[i].applyTime).format("MM-dd hh:mm")
            withdrawalLogsItem.getChildByName("time").getComponent(cc.Label).string = tiem
        }

        this.pageText.string = this._page + "/" + this._pageTotal
    }

    getBankAccByName() {
        let bankAccList = {}
        for (let i = 0; i < this._userBankList.length; i++) {
            let bankName = this._userBankList[i].bankName
            if (!bankAccList[bankName]) {
                bankAccList[bankName] = []
            }
            bankAccList[bankName].push(this._userBankList[i])
        }
        return bankAccList
    }

    managementView() {
        this.accountLayout.removeAllChildren()
        for (let i = 0; i < this._userBankList.length; i++) {
            User._bankList[i] = this._userBankList[i].bankCard
            let accountItem = cc.instantiate(this.accountItem)
            accountItem.active = true
            accountItem.parent = this.accountLayout
            accountItem.getComponent(WithdrawalItem).init(this._userBankList[i], i, this.onClickAccountItemCallback.bind(this))
        }
        // this.accountLayout.y = this._userBankList.length < this._maxAccountCount ? 45 : 0
        this.addBankCard.active = this._userBankList.length < this._maxAccountCount

        let bankIndex = Manager.localStorage.getItem("selectBankIndex")
        this._clickItemId = bankIndex
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "infoClose":
                this.infoNode.active = false
                break;
            case "management": this.onClickToggle(name); break;
            case "withdrawal": this.onClickToggle(name); break;
            case "withdrawalLogs": this.onClickToggle(name); break;
            case "addCardBtn": this.onClickBindAccount(); break;
            case "managementNextBtn": this.onClickManagementNextBtn(); break;
            case "withdrawalNext": this.onClickWithdrawalNextBtn(); break;
            case "confirm": this.onClickConfirm(); break;
            case "lastPage": this.onClicklastPage(); break;
            case "nextPage": this.onClicknextPage(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    onClickWithdrawalNextBtn() {
        let input = this.amountEditbox.string

        if (input == "") {
            PanelHelp.showTip(i18n.BIND.INPUTAMOUNT)
            return
        }

        let amount = UtilMgr.formatFloat(UtilMgr.recoverMoney(input) * 10000)
        if (this._minWithdrawalAmount > amount) {
            // PanelHelp.showTip(i18n.WITHDRAWAL.MINAMOUNT + UtilMgr.formatFloat(this._minWithdrawalAmount / 10000))
            PanelHelp.showTip(i18n.WITHDRAWAL.INPUTMINAMOUNT)
            return
        }
        // let fee = amount * this.withdrawalConfig.chargeRate/100
        // let totalGold = UtilMgr.formatFloat(User._gold + User._bank)
        let totalGold = this._maxWithdrawalAmount
        if (totalGold < amount && amount <= this._insufficientBetAmount) {
            PanelHelp.showTip(i18n.WITHDRAWAL.IWBBET)
            return
        }
        if (amount > this._insufficientBetAmount) {
            PanelHelp.showTip(i18n.WITHDRAWAL.IWB)
            return
        }

        this.infoNode.active = true
        this.infoAmountText.string = input
        if (this.withdrawalConfig.chargeRate == 0) {
            // this.infoFeeText.node.parent.active = false;
            this.infoFeeText.language = i18n.WITHDRAWAL.Limitedfree
        } else {
            // this.infoFeeText.node.parent.active = true;
            this.infoFeeText.string = UtilMgr.changeMoney(amount * this.withdrawalConfig.chargeRate / 100)
        }
        // this.infoFeeText.string = UtilMgr.changeMoney(amount  * this.withdrawalConfig.chargeRate/100)
        this.infoBankText.string = this._userBankList[this._clickItemId].bankName
        this.infoAccountText.string = UtilMgr.setBankCardStringCover(this._userBankList[this._clickItemId].bankCard)
        this.pwdEditbox.string = ""
    }

    onEditboxEnd(editbox, customEventData) {
        let input = editbox.string
        if (input == "" || parseInt(input) == 0) {
            editbox.string = ""
            this.withdrawalNext.interactable = false;
        } else {
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
        this.resetVeiw()
        this.reqSafetyBox()
        this.reqWithdrawalConfig()
        this.withdrawalTip.active = true
        this.withdrawalContent.active = true
    }
    onClickCheck(node) {
        if (node.active) {
            cc.tween(node)
                .set({ scaleY: 1 })
                .to(0.1, { scaleY: 0 })
                .call(() => {
                    node.active = false
                })
                .start()
        } else {
            node.active = true
            cc.tween(node)
                .set({ scaleY: 0 })
                .to(0.1, { scaleY: 1 })
                .start()
        }
    }

    onClicknextPage() {
        if (this._page == this._pageTotal) {
            return
        }
        this._page = this._page + 1
        this.reqWithdrawalRecord()
    }

    onClicklastPage() {
        if (this._page == 1) {
            return
        }
        this._page = this._page - 1
        this.reqWithdrawalRecord()
    }

    onClickAccountItemCallback(itemId) {
        this._clickItemId = itemId
        this.accountLayout.children.forEach((element, index) => {
            element.getComponent(WithdrawalItem).checkToggle.isChecked = itemId == index
            //element.getComponent(WithdrawalItem).checkToggle.node.active = itemId == index
        })
    }

    onClickConfirm() {
        let input = this.amountEditbox.string

        if (input == "") {
            PanelHelp.showTip(i18n.BIND.INPUTACCOUNT)
            return
        }

        let amount = UtilMgr.formatFloat(UtilMgr.recoverMoney(input) * 10000)
        // if (this._minWithdrawalAmount > amount) {
        //     PanelHelp.showTip(i18n.WITHDRAWAL.MINAMOUNT + UtilMgr.formatFloat(this._minWithdrawalAmount / 10000))
        //     return
        // }
        // let totalGold = UtilMgr.formatFloat(User._gold + User._bank)
        // if (totalGold < amount) {
        //     PanelHelp.showTip(i18n.WITHDRAWAL.IWB)
        //     return
        // }

        let pwd = this.pwdEditbox.string
        if (pwd == "") {
            PanelHelp.showTip(i18n.WITHDRAWAL.ERROR.EMPTY_PWD)
            return
        }
        this.reqWithdrawal(amount, pwd)
    }


    onClickBindAccount() {
    }

    resetVeiw() {
        this.managementTip.active = false
        this.managementContent.active = false
        this.withdrawalTip.active = false
        this.withdrawalContent.active = false
        this.withdrawalLogsContent.active = false
    }

    onClickToggle(name) {
        this.resetVeiw()
        if (name == "management") {
            this.managementTip.active = true
            this.managementContent.active = true
        } else if (name == "withdrawal") {
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

            this.managementContent.active = true
        } else if (name == "withdrawalLogs") {
            this.withdrawalLogsContent.active = true
            this.reqWithdrawalRecord()
        }
    }

    reqWithdrawalRecord() {
        let req = protoPackage.hall.base.WithdrawalRecordReq.create({ userId: User._userID, page: this._page, size: this._pageSize });
        let buffer = protoPackage.hall.base.WithdrawalRecordReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_WithdrawalRecord,
            buffer);
    }

    reqWithdrawal(amount, pwd) {
        let bankInfoId = this._userBankList[this._clickItemId].id
        let req = protoPackage.hall.base.WithdrawalReq.create({ userId: User._userID, drawingGlod: amount, bankInfoId: bankInfoId, realName: bankInfoId.realName, phone: User._phone, passwd: base64Encrypt(pwd) });
        let buffer = protoPackage.hall.base.WithdrawalReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_Withdrawal,
            buffer);
    }

    reqWithdrawalConfig() {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_WithdrawalConfig,
            null);
    }

    reqSafetyBox() {
        let req = protoPackage.hall.RefreshSafetyBox.create({ userId: User._userID });
        let buffer = protoPackage.hall.RefreshSafetyBox.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.REFRESH_SAFETY_BOX,
            buffer);
    }

    reqBankList() {
        let req = protoPackage.hall.base.GetBankInfoReq.create({ userId: User._userID });
        let buffer = protoPackage.hall.base.GetBankInfoReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_GetBankInfo,
            buffer);
    }

    start() {
        this.reqBankList()
    }

    // update (dt) {}
}
