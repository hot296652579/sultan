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
import PhoneVerification from "./PhoneVerification";
import WalletView from "./WalletView";
import { MST } from "../framework/external/protoc";
import RechargeData from "../data/RechargeData";
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import ScroViewPlus from "../common/component/ScroViewPlus";
import BankItemView from "./BankItemView";
import BindPhoneView from "../common/bindItemView/BindPhoneView";
import UserData from "../data/UserData";


const { ccclass, property } = cc._decorator;
@ccclass
@injectService(LobbyService.instance)
export default class RechargeNewView extends UIView implements IController<LobbyService> {
    service: LobbyService;
    @property(cc.Node)
    webViewNode: cc.Node = null;
    @property(cc.Node)
    refilableNode: cc.Node = null;
    @property(cc.Node)
    successNode: cc.Node = null;

    @property(cc.Node)
    layStore0: cc.Node = null;
    @property(cc.Node)
    layStore1: cc.Node = null;
    @property(cc.Node)
    layStore2: cc.Node = null;

    @property(cc.Label)
    labPrice: cc.Label = null;
    @property(cc.Label)
    labGift: cc.Label = null;
    @property(cc.Label)
    labBtnPrice: cc.Label = null;
    @property(cc.Label)
    labTelephone: cc.Label = null;

    @property(ScroViewPlus)
    bankScrollView: ScroViewPlus = null;

    @property(cc.EditBox)
    rpEditBox: cc.EditBox = null;
    @property(cc.Node)
    bankListNode: cc.Node = null;
    @property(cc.Node)
    bankInfoListView: cc.Node = null;

    chooseIndex = null;
    rechargeMoney = null;

    _bankList = null;

    m_rechargeStr: string = "";
    _clickBankItemId: number = null;

    public static getPrefabUrl() {
        return "wallet/prefabes/RechargeNewView";
    }

    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        this.bindEvents();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('L2C_Deposit_Res', this.onL2C_Deposit_Res);
        this.registerEvent('L2C_ChipsChange_Mes', this.onL2C_ChipsChange_Mes);
        this.registerEvent('L2C_GetStoreList_Res', this.onL2C_GetStoreList_Res);
        this.registerEvent('L2C_GetBankList_Res', this.onL2C_GetBankList_Res);
        this.registerEvent('Event_S2C_BindPhone', this.onEvent_S2C_BindPhone);
    }

    initUI() {
        this.refilableNode.active = false;
        this.webViewNode.active = false;
    }

    bindEvents() {
        this.rpEditBox.node.on("editing-did-began", this.onDidBegan, this);
        this.rpEditBox.node.on("editing-did-ended", this.onDidEnded, this);
        this.rpEditBox.node.on("editing-return", this.onDidEnded, this);
        this.rpEditBox.node.on("text-changed", this.onTextChanged, this);
    }

    refreshBankListView() {
        let bankTotal = 5;
        let bankInfo = this._bankList;
        for (let index = 0; index < bankTotal; index++) {
            let item = this.bankInfoListView.getChildByName('BankItemView' + index);
            let common = item.getComponent(BankItemView);
            item.active = false;
            if (index < bankInfo.length) {
                let data = bankInfo[index];
                item.active = true;
                common.updateItem(data, index, this.onClickBankItem, this);
            }
        }
    }

    async bankListView() {
        let scroViewCtrlCom = this.bankListNode.getComponent(ScroViewCtrl);
        scroViewCtrlCom.dataList = this._bankList;
        scroViewCtrlCom.onItemClickCallback = this.onClickBankItem.bind(this)
        await scroViewCtrlCom.framingLoad(this._bankList.length);
    }

    onClickBankItem(_itemId, parent) {
        let self = parent
        self._clickBankItemId = _itemId
        let bankTotal = 5;
        for (let index = 0; index < bankTotal; index++) {
            let item = self.bankInfoListView.getChildByName('BankItemView' + index);
            let bankItemCom = item.getComponent(BankItemView)
            bankItemCom.choosed.active = false;
            bankItemCom.choosedImg.active = false;
            if (_itemId == index) {
                bankItemCom.choosed.active = true;
                bankItemCom.choosedImg.active = true;
            }
        }
        // this.bankScrollView.content.children.forEach((element) => {
        //     let bankItemCom = element.getComponent(BankItemView)
        //     let itemId = bankItemCom._itemId
        //     if (_itemId == itemId) {
        //         bankItemCom.choosed.active = true
        //     } else {
        //         bankItemCom.choosed.active = false
        //     }
        // })

    }

    show() {
        this.initUI();
        this.requestDepLimit();
        this.requestGetStoreList();
        this.requestGetBankList();
        this.refreshEditBox();
        this.refreshPhoneNo();
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.initUI();
                this.close();
                break;
            case 'btnMusk':
                this.onRechargeHandler();
                break;
            case 'btnUpdateTel':
                Manager.uiManager.open({ type: BindPhoneView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnCloseWebView':
                this.webViewNode.active = false;
                break;
        }
    }

    refreshEditBox() {
        let rechargeData = G.DataMgr.get(RechargeData);
        if (!rechargeData.maxDepAmount || !rechargeData.minDepAmount) return;

        let minAmount = rechargeData.minDepAmount;
        let maxAmount = rechargeData.maxDepAmount;
        this.rpEditBox.getComponent(cc.EditBox).placeholder = `Minimal ${minAmount} - ${maxAmount}`;
    }

    refreshPhoneNo() {
        let userData = G.DataMgr.get(UserData);
        let phone = userData.BindPhone;
        if (phone)
            this.labTelephone.string = phone;
    }

    requestDepLimit() {
        let req = MST.C2L_GetDepositLimit_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
        });
        let buffer = MST.C2L_GetDepositLimit_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetDepositLimit_Req, MST.OuterOpcode_Lobby.C2L_GetDepositLimit_Req, buffer);
    }

    requestGetStoreList() {
        let req = MST.C2L_GetStoreList_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
        });
        let buffer = MST.C2L_GetStoreList_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetStoreList_Req, MST.OuterOpcode_Lobby.C2L_GetStoreList_Req, buffer);
    }

    requestGetBankList() {
        let req = MST.C2L_GetBankList_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            index: 0,
            limit: 6
        });
        let buffer = MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetBankList_Req, MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
    }

    onRechargeHandler() {
        let recharge = this.m_rechargeStr;
        let choosedIndex = this.chooseIndex;

        if (recharge == null && choosedIndex == null) {
            PanelHelp.showTip(i18n.TIPS.ENTERRECHARGE);
            return;
        }

        let platType = 0;
        let depositType = choosedIndex != null ? 0 : 1;
        // let idOrMoney = 88888888;
        let idOrMoney = choosedIndex ? choosedIndex : Number(recharge);

        let req = MST.C2L_Deposit_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            platType,
            depositType,
            idOrMoney
        });
        let buffer = MST.C2L_Deposit_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_Deposit_Req, MST.OuterOpcode_Lobby.C2L_Deposit_Req, buffer);
        PanelHelp.showLoading(i18n.WAIT.LOADING)
    }

    onL2C_Deposit_Res() {
        this.webViewNode.active = true;
        this.refilableNode.active = true;
        this.successNode.active = false;

        let webView = this.webViewNode.getChildByName('webView').getComponent(cc.WebView);
        let rechargeData = G.DataMgr.get(RechargeData);
        if (!rechargeData.paymentUrl) return;
        webView.url = rechargeData.paymentUrl;
    }

    onL2C_ChipsChange_Mes(data) {
        this.webViewNode.active = false;
        this.successNode.active = this.refilableNode.active;
        PanelHelp.showTip(i18n.TIPS.RECHARGESUCCESS);
    }

    onL2C_GetStoreList_Res() {
        let self = this;
        let rechargeData = G.DataMgr.get(RechargeData);
        let storeInfoList = rechargeData.storeInfoList;
        // let storeInfoList = [1, 1, 1, 1];

        let total = storeInfoList.length;
        let num = 0;
        let maxRow = Math.ceil(storeInfoList.length / 3);
        for (let index = 0; index < 3; index++) {
            const layStoreItem = this[`layStore${index}`]
            layStoreItem.active = index < maxRow;

            for (let k = 0; k < 3; k++) {
                const btnStoreItem = layStoreItem.getChildByName('btnChoose' + k);
                btnStoreItem.active = false;
                if (num < total) {
                    let _i = num;
                    let info = storeInfoList[_i];
                    if (!info) return;

                    let labRp = btnStoreItem.getChildByName('labRp').getComponent(cc.Label);
                    let labZK = btnStoreItem.getChildByName('iconZK').getChildByName('labZK').getComponent(cc.Label);
                    let iconChoosed = btnStoreItem.getChildByName('choosed');
                    iconChoosed.active = false;
                    labRp.string = `Rp ${info.price}`;
                    labZK.string = `${info.giftChips}%`;

                    if (_i > 2) {
                        _i = 0;
                    }
                    btnStoreItem.active = true;
                    btnStoreItem.on(cc.Node.EventType.TOUCH_END, (evt) => {
                        self.chooseIndex = _i;
                        self.hideChoosedHanlder();
                        iconChoosed.active = true;
                        this.m_rechargeStr = '';
                        this.refreshWillGet();
                    });
                }
                num++;
            }
        }
    }

    hideChoosedHanlder() {
        for (let index = 0; index < 3; index++) {
            const layStoreItem = this[`layStore${index}`];
            for (let k = 0; k < 3; k++) {
                const btnStoreItem = layStoreItem.getChildByName('btnChoose' + k);
                let iconChoosed = btnStoreItem.getChildByName('choosed');
                iconChoosed.active = false;
            }
        }
    }

    onL2C_GetBankList_Res() {
        let rechargeData = G.DataMgr.get(RechargeData);
        this._bankList = rechargeData.bankInfoList;
        // this.bankListView();
        this.refreshBankListView();
    }

    onEvent_S2C_BindPhone() {
        this.refreshPhoneNo();
    }

    private onDidBegan(target: cc.EditBox): void {
        this.rpEditBox.string = this.m_rechargeStr;
        this.hideChoosedHanlder();
        this.chooseIndex = null;
    }

    private onDidEnded(target: cc.EditBox): void {
        if (this.m_rechargeStr.length <= 0) {
            return;
        }

        this.rpEditBox.string = this.m_rechargeStr;
        this.chooseIndex = null;
        this.refreshWillGet();
    }

    private onTextChanged(content: cc.EditBox): void {
        this.m_rechargeStr = content.string;
    }

    refreshWillGet() {
        let chooseIndex = this.chooseIndex;
        let rechargeData = G.DataMgr.get(RechargeData);
        let storeInfo = rechargeData.storeInfoList;
        if (!storeInfo) return;

        this.labGift.node.active = false;
        if (chooseIndex != null && chooseIndex >= 0) {
            let info = storeInfo[chooseIndex];
            this.labGift.node.active = true;
            this.labPrice.string = `Rp ${info.price}`;
            this.labGift.string = `+${info.giftChips}bons`;
            this.labBtnPrice.string = `${info.price}`;
        } else {
            let price = this.m_rechargeStr;
            if (!price) return;
            this.labPrice.string = `Rp ${price}`;
            this.labBtnPrice.string = `${price}`;
        }
    }

    onDestroy() {
        super.onDestroy();
    }

}
