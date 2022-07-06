"use strict";
cc._RF.push(module, '6b06dGyv3BOq7yvytiBg0EP', 'RechargeNewView');
// script/wallet/RechargeNewView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const protoc_1 = require("../framework/external/protoc");
const RechargeData_1 = __importDefault(require("../data/RechargeData"));
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const ScroViewPlus_1 = __importDefault(require("../common/component/ScroViewPlus"));
const BankItemView_1 = __importDefault(require("./BankItemView"));
const BindPhoneView_1 = __importDefault(require("../common/bindItemView/BindPhoneView"));
const UserData_1 = __importDefault(require("../data/UserData"));
const { ccclass, property } = cc._decorator;
let RechargeNewView = class RechargeNewView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.webViewNode = null;
        this.refilableNode = null;
        this.successNode = null;
        this.layStore0 = null;
        this.layStore1 = null;
        this.layStore2 = null;
        this.labPrice = null;
        this.labGift = null;
        this.labBtnPrice = null;
        this.labTelephone = null;
        this.bankScrollView = null;
        this.rpEditBox = null;
        this.bankListNode = null;
        this.bankInfoListView = null;
        this.chooseIndex = null;
        this.rechargeMoney = null;
        this._bankList = null;
        this.m_rechargeStr = "";
        this._clickBankItemId = null;
    }
    static getPrefabUrl() {
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
            let common = item.getComponent(BankItemView_1.default);
            item.active = false;
            if (index < bankInfo.length) {
                let data = bankInfo[index];
                item.active = true;
                common.updateItem(data, index, this.onClickBankItem, this);
            }
        }
    }
    bankListView() {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.bankListNode.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = this._bankList;
            scroViewCtrlCom.onItemClickCallback = this.onClickBankItem.bind(this);
            yield scroViewCtrlCom.framingLoad(this._bankList.length);
        });
    }
    onClickBankItem(_itemId, parent) {
        let self = parent;
        self._clickBankItemId = _itemId;
        let bankTotal = 5;
        for (let index = 0; index < bankTotal; index++) {
            let item = self.bankInfoListView.getChildByName('BankItemView' + index);
            let bankItemCom = item.getComponent(BankItemView_1.default);
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
                Manager_1.Manager.uiManager.open({ type: BindPhoneView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnCloseWebView':
                this.webViewNode.active = false;
                break;
        }
    }
    refreshEditBox() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        if (!rechargeData.maxDepAmount || !rechargeData.minDepAmount)
            return;
        let minAmount = rechargeData.minDepAmount;
        let maxAmount = rechargeData.maxDepAmount;
        this.rpEditBox.getComponent(cc.EditBox).placeholder = `Minimal ${minAmount} - ${maxAmount}`;
    }
    refreshPhoneNo() {
        let userData = G.DataMgr.get(UserData_1.default);
        let phone = userData.BindPhone;
        if (phone)
            this.labTelephone.string = phone;
    }
    requestDepLimit() {
        let req = protoc_1.MST.C2L_GetDepositLimit_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
        });
        let buffer = protoc_1.MST.C2L_GetDepositLimit_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetDepositLimit_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetDepositLimit_Req, buffer);
    }
    requestGetStoreList() {
        let req = protoc_1.MST.C2L_GetStoreList_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
        });
        let buffer = protoc_1.MST.C2L_GetStoreList_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetStoreList_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetStoreList_Req, buffer);
    }
    requestGetBankList() {
        let req = protoc_1.MST.C2L_GetBankList_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            index: 0,
            limit: 6
        });
        let buffer = protoc_1.MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetBankList_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
    }
    onRechargeHandler() {
        let recharge = this.m_rechargeStr;
        let choosedIndex = this.chooseIndex;
        if (recharge == null && choosedIndex == null) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.ENTERRECHARGE);
            return;
        }
        let platType = 0;
        let depositType = choosedIndex != null ? 0 : 1;
        // let idOrMoney = 88888888;
        let idOrMoney = choosedIndex ? choosedIndex : Number(recharge);
        let req = protoc_1.MST.C2L_Deposit_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            platType,
            depositType,
            idOrMoney
        });
        let buffer = protoc_1.MST.C2L_Deposit_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_Deposit_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_Deposit_Req, buffer);
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOADING);
    }
    onL2C_Deposit_Res() {
        this.webViewNode.active = true;
        this.refilableNode.active = true;
        this.successNode.active = false;
        let webView = this.webViewNode.getChildByName('webView').getComponent(cc.WebView);
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        if (!rechargeData.paymentUrl)
            return;
        webView.url = rechargeData.paymentUrl;
    }
    onL2C_ChipsChange_Mes(data) {
        this.webViewNode.active = false;
        this.successNode.active = this.refilableNode.active;
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.RECHARGESUCCESS);
    }
    onL2C_GetStoreList_Res() {
        let self = this;
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let storeInfoList = rechargeData.storeInfoList;
        // let storeInfoList = [1, 1, 1, 1];
        let total = storeInfoList.length;
        let num = 0;
        let maxRow = Math.ceil(storeInfoList.length / 3);
        for (let index = 0; index < 3; index++) {
            const layStoreItem = this[`layStore${index}`];
            layStoreItem.active = index < maxRow;
            for (let k = 0; k < 3; k++) {
                const btnStoreItem = layStoreItem.getChildByName('btnChoose' + k);
                btnStoreItem.active = false;
                if (num < total) {
                    let _i = num;
                    let info = storeInfoList[_i];
                    if (!info)
                        return;
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
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        this._bankList = rechargeData.bankInfoList;
        // this.bankListView();
        this.refreshBankListView();
    }
    onEvent_S2C_BindPhone() {
        this.refreshPhoneNo();
    }
    onDidBegan(target) {
        this.rpEditBox.string = this.m_rechargeStr;
        this.hideChoosedHanlder();
        this.chooseIndex = null;
    }
    onDidEnded(target) {
        if (this.m_rechargeStr.length <= 0) {
            return;
        }
        this.rpEditBox.string = this.m_rechargeStr;
        this.chooseIndex = null;
        this.refreshWillGet();
    }
    onTextChanged(content) {
        this.m_rechargeStr = content.string;
    }
    refreshWillGet() {
        let chooseIndex = this.chooseIndex;
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let storeInfo = rechargeData.storeInfoList;
        if (!storeInfo)
            return;
        this.labGift.node.active = false;
        if (chooseIndex != null && chooseIndex >= 0) {
            let info = storeInfo[chooseIndex];
            this.labGift.node.active = true;
            this.labPrice.string = `Rp ${info.price}`;
            this.labGift.string = `+${info.giftChips}bons`;
            this.labBtnPrice.string = `${info.price}`;
        }
        else {
            let price = this.m_rechargeStr;
            if (!price)
                return;
            this.labPrice.string = `Rp ${price}`;
            this.labBtnPrice.string = `${price}`;
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "webViewNode", void 0);
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "refilableNode", void 0);
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "successNode", void 0);
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "layStore0", void 0);
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "layStore1", void 0);
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "layStore2", void 0);
__decorate([
    property(cc.Label)
], RechargeNewView.prototype, "labPrice", void 0);
__decorate([
    property(cc.Label)
], RechargeNewView.prototype, "labGift", void 0);
__decorate([
    property(cc.Label)
], RechargeNewView.prototype, "labBtnPrice", void 0);
__decorate([
    property(cc.Label)
], RechargeNewView.prototype, "labTelephone", void 0);
__decorate([
    property(ScroViewPlus_1.default)
], RechargeNewView.prototype, "bankScrollView", void 0);
__decorate([
    property(cc.EditBox)
], RechargeNewView.prototype, "rpEditBox", void 0);
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "bankListNode", void 0);
__decorate([
    property(cc.Node)
], RechargeNewView.prototype, "bankInfoListView", void 0);
RechargeNewView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RechargeNewView);
exports.default = RechargeNewView;

cc._RF.pop();