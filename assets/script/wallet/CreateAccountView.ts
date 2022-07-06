import { GameConfig } from "../common/base/HotUpdate";
import { Config } from "../common/config/Config";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { gameManager } from "../common/manager/GameManager";
import { Manager } from "../common/manager/Manager";
import { CommonMessage, protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import { HttpErrorType, RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import { ShareTraceHelpder } from "../Helpder/shareTrace/ShareTraceHelpder";
import LanguageChange from "../common/language/LanguageChange";
import ServiceView from "../service/ServiceView";
import { UIManager } from "../framework/base/UIManager";
import AkunView from "../akun/AkunView";
import HallNewView from "../hall/HallNewView";
import LoginNewView from "../login/LoginNewView";
import { MST } from "../framework/external/protoc";
import RechargeData from "../data/RechargeData";


const { ccclass, property } = cc._decorator;
@ccclass
@injectService(LobbyService.instance)
export default class CreateAccountView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Node)
    moreBankNode: cc.Node = null;
    @property(cc.Node)
    iconDown: cc.Node = null;
    @property(cc.Node)
    iconUp: cc.Node = null;
    @property(cc.Node)
    bankItemTop0: cc.Node = null;
    @property(cc.Node)
    bankItemTop1: cc.Node = null;
    @property(cc.Node)
    bankItemTop2: cc.Node = null;
    @property(cc.Node)
    bankItemTop3: cc.Node = null;
    @property(cc.Node)
    bankItemTop4: cc.Node = null;
    @property(cc.Node)
    bankItemTop5: cc.Node = null;

    @property(cc.Node)
    bankItemMore0: cc.Node = null;
    @property(cc.Node)
    bankItemMore1: cc.Node = null;
    @property(cc.Node)
    bankItemMore2: cc.Node = null;
    @property(cc.Node)
    bankItemMore3: cc.Node = null;
    @property(cc.Node)
    bankItemMore4: cc.Node = null;
    @property(cc.Node)
    bankItemMore5: cc.Node = null;

    @property(cc.EditBox)
    bankNumEditBox: cc.EditBox = null;
    @property(cc.EditBox)
    bankNameEditBox: cc.EditBox = null;

    @property(cc.Label)
    labBankCode: cc.Label = null;

    bankNumStr: string = '';
    bankNameStr: string = '';
    bankCodeStr: string = null;

    bankChoosedIndex: number = null;

    currentMoreIndex = 0;

    public static getPrefabUrl() {
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
        let req = MST.C2L_GetBankList_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            index,
            limit
        });
        let buffer = MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetBankList_Req, MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
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

        let index = this.currentMoreIndex
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
            PanelHelp.showTip(i18n.TIPS.SELECTBANk);
            return
        }
        let rechargeData = G.DataMgr.get(RechargeData);
        let bankInfoList = rechargeData.bankInfoList;
        let bankInfo = bankInfoList[choosedIndex];
        if (!bankInfo) return;

        let name = bankInfo.bankName;
        let bankNo = this.bankNumStr;
        let bankCode = bankInfo.bankCode;

        if (!name || !bankNo || !bankCode) {
            PanelHelp.showTip(i18n.TIPS.BANDBANKINFOFAIL);
            return
        }

        let req = MST.C2L_BindBankCard_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            bankNo,
            bankCode,
            name
        });
        let buffer = MST.C2L_BindBankCard_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_BindBankCard_Req, MST.OuterOpcode_Lobby.C2L_BindBankCard_Req, buffer);
    }

    onL2C_BindBankCard_Res() {
        PanelHelp.showTip(i18n.TIPS.BINDBANKSUCCESS);
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
        let rechargeData = G.DataMgr.get(RechargeData);
        let bankInfoList = rechargeData.bankInfoList;
        if (bankInfoList && bankInfoList.length <= 0) return;

        for (let index = 0; index < 6; index++) {
            const element = bankInfoList[index];
            const bankItemTop = this[`bankItemTop${index}`];
            const iconChoosed = bankItemTop.getChildByName('choosed');
            bankItemTop.active = false;
            if (!element) continue;

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
        let rechargeData = G.DataMgr.get(RechargeData);
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
            if (!element) continue;

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
        let rechargeData = G.DataMgr.get(RechargeData);
        let bankInfoList = rechargeData.bankInfoList;
        let bankCode = bankInfoList[choosedIndex].bankCode;
        this.labBankCode.string = bankCode;
    }

    onL2C_GetBankList_Res() {
        this.refreshBankMoreInfo();
    }

    private onBankNumBegan(target: cc.EditBox): void {
        this.bankNumEditBox.string = this.bankNumStr;
    }

    private onBankEnterEnd(target: cc.EditBox): void {
        if (this.bankNumStr.length <= 0) {
            return;
        }

        this.bankNumEditBox.string = this.bankNumStr;
    }

    private onBankNumTxtChanged(content: cc.EditBox) {
        this.bankNumStr = content.string;
    }

    private onBankNameBegan(target: cc.EditBox): void {
        this.bankNumEditBox.string = this.bankNameStr;
    }

    private onBankNameEnterEnd(target: cc.EditBox): void {
        if (this.bankNameStr.length <= 0) {
            return;
        }

        this.bankNumEditBox.string = this.bankNameStr;
    }

    private onBankNameTxtChanged(content: cc.EditBox) {
        this.bankNameStr = content.string;
    }

    onDestroy() {
        super.onDestroy();
    }

}
