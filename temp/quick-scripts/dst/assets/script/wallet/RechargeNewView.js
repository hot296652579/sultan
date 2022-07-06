
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/RechargeNewView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L1JlY2hhcmdlTmV3Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtFQUF1RDtBQUV2RCx1REFBb0Q7QUFFcEQsNkRBQTBEO0FBQzFELHVEQUE2RDtBQUU3RCxrRUFBMkU7QUFHM0Usb0VBQTRDO0FBRTVDLG9FQUE0QztBQVU1Qyx5REFBbUQ7QUFDbkQsd0VBQWdEO0FBQ2hELG9GQUE0RDtBQUM1RCxvRkFBNEQ7QUFDNUQsa0VBQTBDO0FBQzFDLHlGQUFpRTtBQUNqRSxnRUFBd0M7QUFHeEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZ0IsU0FBUSxnQkFBTTtJQUFuRDs7UUFHSSxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUcxQixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRTFCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFFekIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFFN0IsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsbUJBQWMsR0FBaUIsSUFBSSxDQUFDO1FBR3BDLGNBQVMsR0FBZSxJQUFJLENBQUM7UUFFN0IsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFFN0IscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXJCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFakIsa0JBQWEsR0FBVyxFQUFFLENBQUM7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O0FBRTlCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1U7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDUTtBQUUxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNRO0FBRTFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1E7QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDTztBQUUxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNNO0FBRXpCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1U7QUFFN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDVztBQUc5QjtJQURDLFFBQVEsQ0FBQyxzQkFBWSxDQUFDO3VEQUNhO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7a0RBQ1E7QUFFN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVztBQUU3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNlO0FBakNoQixlQUFlO0lBRm5DLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGVBQWUsQ0F1Vm5DO2tCQXZWb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2Jhc2UvSG90VXBkYXRlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGRpc3BhdGNoRW50ZXJDb21wbGV0ZSwgTG9naWNFdmVudCwgTG9naWNUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IGdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL0dhbWVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IENvbW1vbk1lc3NhZ2UsIHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBIdHRwRXJyb3JUeXBlLCBSZXF1ZXN0UGFja2dlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvSHR0cENsaWVudFwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgU2hhcmVUcmFjZUhlbHBkZXIgfSBmcm9tIFwiLi4vSGVscGRlci9zaGFyZVRyYWNlL1NoYXJlVHJhY2VIZWxwZGVyXCI7XG5pbXBvcnQgTGFuZ3VhZ2VDaGFuZ2UgZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUNoYW5nZVwiO1xuaW1wb3J0IFNlcnZpY2VWaWV3IGZyb20gXCIuLi9zZXJ2aWNlL1NlcnZpY2VWaWV3XCI7XG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvVUlNYW5hZ2VyXCI7XG5pbXBvcnQgQWt1blZpZXcgZnJvbSBcIi4uL2FrdW4vQWt1blZpZXdcIjtcbmltcG9ydCBIYWxsTmV3VmlldyBmcm9tIFwiLi4vaGFsbC9IYWxsTmV3Vmlld1wiO1xuaW1wb3J0IExvZ2luTmV3VmlldyBmcm9tIFwiLi4vbG9naW4vTG9naW5OZXdWaWV3XCI7XG5pbXBvcnQgUGhvbmVWZXJpZmljYXRpb24gZnJvbSBcIi4vUGhvbmVWZXJpZmljYXRpb25cIjtcbmltcG9ydCBXYWxsZXRWaWV3IGZyb20gXCIuL1dhbGxldFZpZXdcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgUmVjaGFyZ2VEYXRhIGZyb20gXCIuLi9kYXRhL1JlY2hhcmdlRGF0YVwiO1xuaW1wb3J0IFNjcm9WaWV3Q3RybCBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0N0cmxcIjtcbmltcG9ydCBTY3JvVmlld1BsdXMgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdQbHVzXCI7XG5pbXBvcnQgQmFua0l0ZW1WaWV3IGZyb20gXCIuL0JhbmtJdGVtVmlld1wiO1xuaW1wb3J0IEJpbmRQaG9uZVZpZXcgZnJvbSBcIi4uL2NvbW1vbi9iaW5kSXRlbVZpZXcvQmluZFBob25lVmlld1wiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNoYXJnZU5ld1ZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2ViVmlld05vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlZmlsYWJsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHN1Y2Nlc3NOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxheVN0b3JlMDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGF5U3RvcmUxOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYXlTdG9yZTI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYlByaWNlOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYkdpZnQ6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiQnRuUHJpY2U6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiVGVsZXBob25lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoU2Nyb1ZpZXdQbHVzKVxuICAgIGJhbmtTY3JvbGxWaWV3OiBTY3JvVmlld1BsdXMgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcnBFZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiYW5rTGlzdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJbmZvTGlzdFZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgY2hvb3NlSW5kZXggPSBudWxsO1xuICAgIHJlY2hhcmdlTW9uZXkgPSBudWxsO1xuXG4gICAgX2JhbmtMaXN0ID0gbnVsbDtcblxuICAgIG1fcmVjaGFyZ2VTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgX2NsaWNrQmFua0l0ZW1JZDogbnVtYmVyID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJ3YWxsZXQvcHJlZmFiZXMvUmVjaGFyZ2VOZXdWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgLy8gdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoXCJjb21tb24vYXVkaW8vbG9naW5fYmdtXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0wyQ19EZXBvc2l0X1JlcycsIHRoaXMub25MMkNfRGVwb3NpdF9SZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0wyQ19DaGlwc0NoYW5nZV9NZXMnLCB0aGlzLm9uTDJDX0NoaXBzQ2hhbmdlX01lcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTDJDX0dldFN0b3JlTGlzdF9SZXMnLCB0aGlzLm9uTDJDX0dldFN0b3JlTGlzdF9SZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0wyQ19HZXRCYW5rTGlzdF9SZXMnLCB0aGlzLm9uTDJDX0dldEJhbmtMaXN0X1Jlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX0JpbmRQaG9uZScsIHRoaXMub25FdmVudF9TMkNfQmluZFBob25lKTtcbiAgICB9XG5cbiAgICBpbml0VUkoKSB7XG4gICAgICAgIHRoaXMucmVmaWxhYmxlTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53ZWJWaWV3Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLnJwRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtYmVnYW5cIiwgdGhpcy5vbkRpZEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ycEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWVuZGVkXCIsIHRoaXMub25EaWRFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucnBFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLXJldHVyblwiLCB0aGlzLm9uRGlkRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLnJwRWRpdEJveC5ub2RlLm9uKFwidGV4dC1jaGFuZ2VkXCIsIHRoaXMub25UZXh0Q2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcmVmcmVzaEJhbmtMaXN0VmlldygpIHtcbiAgICAgICAgbGV0IGJhbmtUb3RhbCA9IDU7XG4gICAgICAgIGxldCBiYW5rSW5mbyA9IHRoaXMuX2JhbmtMaXN0O1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYmFua1RvdGFsOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuYmFua0luZm9MaXN0Vmlldy5nZXRDaGlsZEJ5TmFtZSgnQmFua0l0ZW1WaWV3JyArIGluZGV4KTtcbiAgICAgICAgICAgIGxldCBjb21tb24gPSBpdGVtLmdldENvbXBvbmVudChCYW5rSXRlbVZpZXcpO1xuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJhbmtJbmZvLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gYmFua0luZm9baW5kZXhdO1xuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb21tb24udXBkYXRlSXRlbShkYXRhLCBpbmRleCwgdGhpcy5vbkNsaWNrQmFua0l0ZW0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgYmFua0xpc3RWaWV3KCkge1xuICAgICAgICBsZXQgc2Nyb1ZpZXdDdHJsQ29tID0gdGhpcy5iYW5rTGlzdE5vZGUuZ2V0Q29tcG9uZW50KFNjcm9WaWV3Q3RybCk7XG4gICAgICAgIHNjcm9WaWV3Q3RybENvbS5kYXRhTGlzdCA9IHRoaXMuX2JhbmtMaXN0O1xuICAgICAgICBzY3JvVmlld0N0cmxDb20ub25JdGVtQ2xpY2tDYWxsYmFjayA9IHRoaXMub25DbGlja0JhbmtJdGVtLmJpbmQodGhpcylcbiAgICAgICAgYXdhaXQgc2Nyb1ZpZXdDdHJsQ29tLmZyYW1pbmdMb2FkKHRoaXMuX2JhbmtMaXN0Lmxlbmd0aCk7XG4gICAgfVxuXG4gICAgb25DbGlja0JhbmtJdGVtKF9pdGVtSWQsIHBhcmVudCkge1xuICAgICAgICBsZXQgc2VsZiA9IHBhcmVudFxuICAgICAgICBzZWxmLl9jbGlja0JhbmtJdGVtSWQgPSBfaXRlbUlkXG4gICAgICAgIGxldCBiYW5rVG90YWwgPSA1O1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYmFua1RvdGFsOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYuYmFua0luZm9MaXN0Vmlldy5nZXRDaGlsZEJ5TmFtZSgnQmFua0l0ZW1WaWV3JyArIGluZGV4KTtcbiAgICAgICAgICAgIGxldCBiYW5rSXRlbUNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KEJhbmtJdGVtVmlldylcbiAgICAgICAgICAgIGJhbmtJdGVtQ29tLmNob29zZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBiYW5rSXRlbUNvbS5jaG9vc2VkSW1nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKF9pdGVtSWQgPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBiYW5rSXRlbUNvbS5jaG9vc2VkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYmFua0l0ZW1Db20uY2hvb3NlZEltZy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuYmFua1Njcm9sbFZpZXcuY29udGVudC5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIC8vICAgICBsZXQgYmFua0l0ZW1Db20gPSBlbGVtZW50LmdldENvbXBvbmVudChCYW5rSXRlbVZpZXcpXG4gICAgICAgIC8vICAgICBsZXQgaXRlbUlkID0gYmFua0l0ZW1Db20uX2l0ZW1JZFxuICAgICAgICAvLyAgICAgaWYgKF9pdGVtSWQgPT0gaXRlbUlkKSB7XG4gICAgICAgIC8vICAgICAgICAgYmFua0l0ZW1Db20uY2hvb3NlZC5hY3RpdmUgPSB0cnVlXG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIGJhbmtJdGVtQ29tLmNob29zZWQuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcblxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XG4gICAgICAgIHRoaXMucmVxdWVzdERlcExpbWl0KCk7XG4gICAgICAgIHRoaXMucmVxdWVzdEdldFN0b3JlTGlzdCgpO1xuICAgICAgICB0aGlzLnJlcXVlc3RHZXRCYW5rTGlzdCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hFZGl0Qm94KCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFBob25lTm8oKTtcbiAgICB9XG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnYnRuQ2xvc2UnOlxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFVJKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuTXVzayc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlY2hhcmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuVXBkYXRlVGVsJzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQmluZFBob25lVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuQ2xvc2VXZWJWaWV3JzpcbiAgICAgICAgICAgICAgICB0aGlzLndlYlZpZXdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaEVkaXRCb3goKSB7XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIGlmICghcmVjaGFyZ2VEYXRhLm1heERlcEFtb3VudCB8fCAhcmVjaGFyZ2VEYXRhLm1pbkRlcEFtb3VudCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtaW5BbW91bnQgPSByZWNoYXJnZURhdGEubWluRGVwQW1vdW50O1xuICAgICAgICBsZXQgbWF4QW1vdW50ID0gcmVjaGFyZ2VEYXRhLm1heERlcEFtb3VudDtcbiAgICAgICAgdGhpcy5ycEVkaXRCb3guZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnBsYWNlaG9sZGVyID0gYE1pbmltYWwgJHttaW5BbW91bnR9IC0gJHttYXhBbW91bnR9YDtcbiAgICB9XG5cbiAgICByZWZyZXNoUGhvbmVObygpIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIGxldCBwaG9uZSA9IHVzZXJEYXRhLkJpbmRQaG9uZTtcbiAgICAgICAgaWYgKHBob25lKVxuICAgICAgICAgICAgdGhpcy5sYWJUZWxlcGhvbmUuc3RyaW5nID0gcGhvbmU7XG4gICAgfVxuXG4gICAgcmVxdWVzdERlcExpbWl0KCkge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyTF9HZXREZXBvc2l0TGltaXRfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9HZXREZXBvc2l0TGltaXRfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0dldERlcG9zaXRMaW1pdF9SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfR2V0RGVwb3NpdExpbWl0X1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0R2V0U3RvcmVMaXN0KCkge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyTF9HZXRTdG9yZUxpc3RfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9HZXRTdG9yZUxpc3RfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0dldFN0b3JlTGlzdF9SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfR2V0U3RvcmVMaXN0X1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0R2V0QmFua0xpc3QoKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJMX0dldEJhbmtMaXN0X1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBsaW1pdDogNlxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMkxfR2V0QmFua0xpc3RfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0dldEJhbmtMaXN0X1JlcSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyTF9HZXRCYW5rTGlzdF9SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25SZWNoYXJnZUhhbmRsZXIoKSB7XG4gICAgICAgIGxldCByZWNoYXJnZSA9IHRoaXMubV9yZWNoYXJnZVN0cjtcbiAgICAgICAgbGV0IGNob29zZWRJbmRleCA9IHRoaXMuY2hvb3NlSW5kZXg7XG5cbiAgICAgICAgaWYgKHJlY2hhcmdlID09IG51bGwgJiYgY2hvb3NlZEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5FTlRFUlJFQ0hBUkdFKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwbGF0VHlwZSA9IDA7XG4gICAgICAgIGxldCBkZXBvc2l0VHlwZSA9IGNob29zZWRJbmRleCAhPSBudWxsID8gMCA6IDE7XG4gICAgICAgIC8vIGxldCBpZE9yTW9uZXkgPSA4ODg4ODg4ODtcbiAgICAgICAgbGV0IGlkT3JNb25leSA9IGNob29zZWRJbmRleCA/IGNob29zZWRJbmRleCA6IE51bWJlcihyZWNoYXJnZSk7XG5cbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMkxfRGVwb3NpdF9SZXEuY3JlYXRlKHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIHBsYXRUeXBlLFxuICAgICAgICAgICAgZGVwb3NpdFR5cGUsXG4gICAgICAgICAgICBpZE9yTW9uZXlcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJMX0RlcG9zaXRfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0RlcG9zaXRfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuQzJMX0RlcG9zaXRfUmVxLCBidWZmZXIpO1xuICAgICAgICBQYW5lbEhlbHAuc2hvd0xvYWRpbmcoaTE4bi5XQUlULkxPQURJTkcpXG4gICAgfVxuXG4gICAgb25MMkNfRGVwb3NpdF9SZXMoKSB7XG4gICAgICAgIHRoaXMud2ViVmlld05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWZpbGFibGVOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHdlYlZpZXcgPSB0aGlzLndlYlZpZXdOb2RlLmdldENoaWxkQnlOYW1lKCd3ZWJWaWV3JykuZ2V0Q29tcG9uZW50KGNjLldlYlZpZXcpO1xuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICBpZiAoIXJlY2hhcmdlRGF0YS5wYXltZW50VXJsKSByZXR1cm47XG4gICAgICAgIHdlYlZpZXcudXJsID0gcmVjaGFyZ2VEYXRhLnBheW1lbnRVcmw7XG4gICAgfVxuXG4gICAgb25MMkNfQ2hpcHNDaGFuZ2VfTWVzKGRhdGEpIHtcbiAgICAgICAgdGhpcy53ZWJWaWV3Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5hY3RpdmUgPSB0aGlzLnJlZmlsYWJsZU5vZGUuYWN0aXZlO1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRJUFMuUkVDSEFSR0VTVUNDRVNTKTtcbiAgICB9XG5cbiAgICBvbkwyQ19HZXRTdG9yZUxpc3RfUmVzKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIGxldCBzdG9yZUluZm9MaXN0ID0gcmVjaGFyZ2VEYXRhLnN0b3JlSW5mb0xpc3Q7XG4gICAgICAgIC8vIGxldCBzdG9yZUluZm9MaXN0ID0gWzEsIDEsIDEsIDFdO1xuXG4gICAgICAgIGxldCB0b3RhbCA9IHN0b3JlSW5mb0xpc3QubGVuZ3RoO1xuICAgICAgICBsZXQgbnVtID0gMDtcbiAgICAgICAgbGV0IG1heFJvdyA9IE1hdGguY2VpbChzdG9yZUluZm9MaXN0Lmxlbmd0aCAvIDMpO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgbGF5U3RvcmVJdGVtID0gdGhpc1tgbGF5U3RvcmUke2luZGV4fWBdXG4gICAgICAgICAgICBsYXlTdG9yZUl0ZW0uYWN0aXZlID0gaW5kZXggPCBtYXhSb3c7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnRuU3RvcmVJdGVtID0gbGF5U3RvcmVJdGVtLmdldENoaWxkQnlOYW1lKCdidG5DaG9vc2UnICsgayk7XG4gICAgICAgICAgICAgICAgYnRuU3RvcmVJdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChudW0gPCB0b3RhbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgX2kgPSBudW07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gc3RvcmVJbmZvTGlzdFtfaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5mbykgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYWJScCA9IGJ0blN0b3JlSXRlbS5nZXRDaGlsZEJ5TmFtZSgnbGFiUnAnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGFiWksgPSBidG5TdG9yZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2ljb25aSycpLmdldENoaWxkQnlOYW1lKCdsYWJaSycpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpY29uQ2hvb3NlZCA9IGJ0blN0b3JlSXRlbS5nZXRDaGlsZEJ5TmFtZSgnY2hvb3NlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpY29uQ2hvb3NlZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGFiUnAuc3RyaW5nID0gYFJwICR7aW5mby5wcmljZX1gO1xuICAgICAgICAgICAgICAgICAgICBsYWJaSy5zdHJpbmcgPSBgJHtpbmZvLmdpZnRDaGlwc30lYDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnRuU3RvcmVJdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJ0blN0b3JlSXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIChldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hvb3NlSW5kZXggPSBfaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZUNob29zZWRIYW5sZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uQ2hvb3NlZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tX3JlY2hhcmdlU3RyID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hXaWxsR2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBudW0rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVDaG9vc2VkSGFubGRlcigpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxheVN0b3JlSXRlbSA9IHRoaXNbYGxheVN0b3JlJHtpbmRleH1gXTtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnRuU3RvcmVJdGVtID0gbGF5U3RvcmVJdGVtLmdldENoaWxkQnlOYW1lKCdidG5DaG9vc2UnICsgayk7XG4gICAgICAgICAgICAgICAgbGV0IGljb25DaG9vc2VkID0gYnRuU3RvcmVJdGVtLmdldENoaWxkQnlOYW1lKCdjaG9vc2VkJyk7XG4gICAgICAgICAgICAgICAgaWNvbkNob29zZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkwyQ19HZXRCYW5rTGlzdF9SZXMoKSB7XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIHRoaXMuX2JhbmtMaXN0ID0gcmVjaGFyZ2VEYXRhLmJhbmtJbmZvTGlzdDtcbiAgICAgICAgLy8gdGhpcy5iYW5rTGlzdFZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmFua0xpc3RWaWV3KCk7XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfQmluZFBob25lKCkge1xuICAgICAgICB0aGlzLnJlZnJlc2hQaG9uZU5vKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRpZEJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJwRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fcmVjaGFyZ2VTdHI7XG4gICAgICAgIHRoaXMuaGlkZUNob29zZWRIYW5sZGVyKCk7XG4gICAgICAgIHRoaXMuY2hvb3NlSW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25EaWRFbmRlZCh0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9yZWNoYXJnZVN0ci5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ycEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX3JlY2hhcmdlU3RyO1xuICAgICAgICB0aGlzLmNob29zZUluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWZyZXNoV2lsbEdldCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25UZXh0Q2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9yZWNoYXJnZVN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIHJlZnJlc2hXaWxsR2V0KCkge1xuICAgICAgICBsZXQgY2hvb3NlSW5kZXggPSB0aGlzLmNob29zZUluZGV4O1xuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICBsZXQgc3RvcmVJbmZvID0gcmVjaGFyZ2VEYXRhLnN0b3JlSW5mb0xpc3Q7XG4gICAgICAgIGlmICghc3RvcmVJbmZvKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5sYWJHaWZ0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChjaG9vc2VJbmRleCAhPSBudWxsICYmIGNob29zZUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBpbmZvID0gc3RvcmVJbmZvW2Nob29zZUluZGV4XTtcbiAgICAgICAgICAgIHRoaXMubGFiR2lmdC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhYlByaWNlLnN0cmluZyA9IGBScCAke2luZm8ucHJpY2V9YDtcbiAgICAgICAgICAgIHRoaXMubGFiR2lmdC5zdHJpbmcgPSBgKyR7aW5mby5naWZ0Q2hpcHN9Ym9uc2A7XG4gICAgICAgICAgICB0aGlzLmxhYkJ0blByaWNlLnN0cmluZyA9IGAke2luZm8ucHJpY2V9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwcmljZSA9IHRoaXMubV9yZWNoYXJnZVN0cjtcbiAgICAgICAgICAgIGlmICghcHJpY2UpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubGFiUHJpY2Uuc3RyaW5nID0gYFJwICR7cHJpY2V9YDtcbiAgICAgICAgICAgIHRoaXMubGFiQnRuUHJpY2Uuc3RyaW5nID0gYCR7cHJpY2V9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxuXG59XG4iXX0=