
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/AttractNewView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '02bccwn/tlOfYZQBAcGLTBc', 'AttractNewView');
// script/wallet/AttractNewView.ts

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
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const CreateAccountView_1 = __importDefault(require("./CreateAccountView"));
const protoc_1 = require("../framework/external/protoc");
const UserData_1 = __importDefault(require("../data/UserData"));
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const RechargeData_1 = __importDefault(require("../data/RechargeData"));
const BindPhoneView_1 = __importDefault(require("../common/bindItemView/BindPhoneView"));
const { ccclass, property } = cc._decorator;
let AttractNewView = class AttractNewView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noWithdrawal = null;
        this.bandInfoNode = null;
        this.labGold = null;
        this.labTelephone = null;
        this.labEmail = null;
        this.DocNode = null;
        this.btnWithdrawal = null;
        this.rpEditBox = null;
        this.codeEditBox = null;
        this.m_codeStr = "";
        this.m_attractStr = '';
        this.canAttract = false;
        this._2d_sprite_mat = '2d-sprite';
        this._2d_gray_mat = '2d-gray-sprite';
        // 用户数据
        this._userData = null;
        this._rechargeData = null;
    }
    static getPrefabUrl() {
        return "wallet/prefabes/AttractNewView";
    }
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        this.bindEvents();
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
        this._rechargeData = G.DataMgr.get(RechargeData_1.default);
    }
    bindEvents() {
        this.rpEditBox.node.on("editing-did-began", this.onDidBegan, this);
        this.rpEditBox.node.on("editing-did-ended", this.onDidEnded, this);
        this.rpEditBox.node.on("editing-return", this.onDidEnded, this);
        this.rpEditBox.node.on("text-changed", this.onTextChanged, this);
        this.codeEditBox.node.on("editing-did-began", this.onCodeBegan, this);
        this.codeEditBox.node.on("editing-did-ended", this.onCodeEnded, this);
        this.codeEditBox.node.on("editing-return", this.onCodeEnded, this);
        this.codeEditBox.node.on("text-changed", this.onCodeChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('L2C_Withdraw_Res', this.onL2C_Withdraw_Res);
        this.registerEvent('L2C_GetBankCardInfo_Res', this.onL2C_GetBankCardInfo_Res);
        this.registerEvent("Event_M2C_GoldChange_Mes", this.refreshUser);
        this.registerEvent("Event_L2C_BindBankCard_Res", this.requestBankInfo);
        this.registerEvent('Event_S2C_BindPhone', this.onEvent_S2C_BindPhone);
        this.registerEvent('Event_S2C_GetCheckCode', this.onEvent_S2C_GetCheckCode);
    }
    show() {
        this.initData();
        this.initView();
        this.requestBankInfo();
        this.requestGetBankList();
        this.refreshUser();
        this.refreshPhoneNo();
        this.refreshEmail();
    }
    initView() {
        this.btnWithdrawal.getComponent(cc.Button).enabled = false;
        let material = cc.Material.getBuiltinMaterial(this._2d_gray_mat);
        let sp = this.btnWithdrawal.getComponent(cc.Sprite);
        sp.setMaterial(0, material);
        let rechargeData = this._rechargeData;
        if (!rechargeData.minWithAmount || !rechargeData.maxWithAmount)
            return;
        let minWithAmount = rechargeData.minWithAmount;
        let maxWithAmount = rechargeData.maxWithAmount;
        this.rpEditBox.placeholder = `jarak:Rp${minWithAmount}-${maxWithAmount}`;
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
    requestBankInfo() {
        let req = protoc_1.MST.C2L_GetBankCardInfo_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
        });
        let buffer = protoc_1.MST.C2L_GetBankCardInfo_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetBankCardInfo_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetBankCardInfo_Req, buffer);
    }
    onEvent_S2C_BindPhone() {
        this.refreshPhoneNo();
    }
    refreshPhoneNo() {
        let userData = this._userData;
        let phone = userData.BindPhone;
        if (phone)
            this.labTelephone.string = phone;
    }
    refreshEmail() {
        let userData = this._userData;
        let email = userData.email;
        if (email)
            this.labEmail.string = email;
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
            case 'btnCloseDoc':
                this.DocNode.active = false;
                break;
            case 'btnArrange':
                Manager_1.Manager.uiManager.open({ type: CreateAccountView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnChange':
                Manager_1.Manager.uiManager.open({ type: CreateAccountView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnUpdateTel':
                Manager_1.Manager.uiManager.open({ type: BindPhoneView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnWithdrawal':
                this.withdrawHanlder();
                break;
            case 'btnGetCode':
                this.clickGetCode();
                break;
            case 'labNumberOfOpen':
                this.DocNode.active = true;
                break;
        }
    }
    clickGetCode() {
        let userdata = this._userData;
        let email = userdata.email;
        if (email) {
            this.requestGetCheckCode();
        }
        else {
            // NOTBINDEMAIL
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.NOTBINDEMAIL);
        }
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.PLEASECHECK);
    }
    onCodeBegan(target) {
        this.codeEditBox.string = this.m_codeStr;
    }
    onCodeEnded(target) {
        if (this.m_codeStr.length <= 0) {
            return;
        }
        this.codeEditBox.string = this.m_codeStr;
    }
    onCodeChanged(content) {
        this.m_codeStr = content.string;
    }
    requestGetCheckCode() {
        let userData = this._userData;
        let username = userData.email;
        let req = protoc_1.MST.C2S_GetCheckCode.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = protoc_1.MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetCheckCode, protoc_1.MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }
    withdrawHanlder() {
        if (this.canAttract) {
            let rechargeData = this._rechargeData;
            let bandBankCardInfo = rechargeData.bandBankCardInfo;
            if (!bandBankCardInfo)
                return;
            let attractNum = Number(this.m_attractStr);
            let bankNo = bandBankCardInfo.bankNo;
            let bankCode = bandBankCardInfo.bankCode;
            let name = bandBankCardInfo.bankUserName;
            let chips = attractNum * 100;
            let req = protoc_1.MST.C2L_Withdraw_Req.create({
                RpcId: Manager_1.Manager.netManager.getNewSeqId(),
                chips,
                bankNo,
                bankCode,
                name
            });
            let buffer = protoc_1.MST.C2L_Withdraw_Req.encode(req).finish();
            LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_Withdraw_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_Withdraw_Req, buffer);
        }
    }
    onL2C_Withdraw_Res() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.RECHARGESUCCESS);
    }
    refreshUser() {
        if (this._userData.isLogined()) {
            this.labGold.string = NumberUtils_1.default.converToC(Number(this._userData.info.Gold));
        }
    }
    onL2C_GetBankCardInfo_Res() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bandBankCardInfo = rechargeData.bandBankCardInfo;
        this.bandInfoNode.active = false;
        this.noWithdrawal.active = false;
        if (bandBankCardInfo) {
            this.bandInfoNode.active = true;
            this.refreshBandInfo();
        }
        else {
            this.noWithdrawal.active = true;
        }
    }
    refreshBandInfo() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bandBankCardInfo = rechargeData.bandBankCardInfo;
        let bandInfoNode = this.bandInfoNode;
        let bankNo = bandInfoNode.getChildByName('bankNo');
        let bankCode = bandInfoNode.getChildByName('bankCode');
        bankNo.getComponent(cc.Label).string = bandBankCardInfo.bankNo;
        bankCode.getComponent(cc.Label).string = bandBankCardInfo.bankCode;
    }
    onDidBegan(target) {
        this.rpEditBox.string = this.m_attractStr;
    }
    onDidEnded(target) {
        if (this.m_attractStr.length <= 0) {
            return;
        }
        this.rpEditBox.string = this.m_attractStr;
        this.checkIsAttract();
    }
    checkIsAttract() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        if (!rechargeData.minWithAmount || !rechargeData.maxWithAmount)
            return;
        let minWithAmount = rechargeData.minWithAmount;
        let maxWithAmount = rechargeData.maxWithAmount;
        let attractNum = Number(this.m_attractStr);
        if (attractNum) {
            if (attractNum >= minWithAmount && attractNum <= maxWithAmount) {
                this.btnWithdrawal.getComponent(cc.Button).enabled = true;
                let material = cc.Material.getBuiltinMaterial(this._2d_sprite_mat);
                let sp = this.btnWithdrawal.getComponent(cc.Sprite);
                sp.setMaterial(0, material);
                this.canAttract = true;
            }
        }
    }
    onTextChanged(content) {
        this.m_attractStr = content.string;
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "noWithdrawal", void 0);
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "bandInfoNode", void 0);
__decorate([
    property(cc.Label)
], AttractNewView.prototype, "labGold", void 0);
__decorate([
    property(cc.Label)
], AttractNewView.prototype, "labTelephone", void 0);
__decorate([
    property(cc.Label)
], AttractNewView.prototype, "labEmail", void 0);
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "DocNode", void 0);
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "btnWithdrawal", void 0);
__decorate([
    property(cc.EditBox)
], AttractNewView.prototype, "rpEditBox", void 0);
__decorate([
    property(cc.EditBox)
], AttractNewView.prototype, "codeEditBox", void 0);
AttractNewView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AttractNewView);
exports.default = AttractNewView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L0F0dHJhY3ROZXdWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0VBQXVEO0FBRXZELHVEQUFvRDtBQUVwRCw2REFBMEQ7QUFDMUQsdURBQTZEO0FBRTdELGtFQUEyRTtBQUczRSxvRUFBNEM7QUFFNUMsb0VBQTRDO0FBUTVDLDRFQUFvRDtBQUNwRCx5REFBbUQ7QUFDbkQsZ0VBQXdDO0FBQ3hDLDhFQUFzRDtBQUN0RCx3RUFBZ0Q7QUFDaEQseUZBQWlFO0FBR2pFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWUsU0FBUSxnQkFBTTtJQUFsRDs7UUFJSSxpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBRXpCLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRTlCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixjQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzdCLGdCQUFXLEdBQWUsSUFBSSxDQUFDO1FBQy9CLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFFdkIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixtQkFBYyxHQUFXLFdBQVcsQ0FBQztRQUNyQyxpQkFBWSxHQUFXLGdCQUFnQixDQUFDO1FBRXhDLE9BQU87UUFDQyxjQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCLGtCQUFhLEdBQWlCLElBQUksQ0FBQztJQTJRL0MsQ0FBQztJQXpRVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLGdDQUFnQyxDQUFDO0lBQzVDLENBQUM7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O0lBQ3RCLENBQUM7Q0FFSixDQUFBO0FBMVNHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1c7QUFFN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDVztBQUU3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNNO0FBRXpCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1c7QUFFOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDTztBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNNO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1k7QUFHOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztpREFDUTtBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO21EQUNVO0FBeEJkLGNBQWM7SUFGbEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsY0FBYyxDQThTbEM7a0JBOVNvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vYmFzZS9Ib3RVcGRhdGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgZGlzcGF0Y2hFbnRlckNvbXBsZXRlLCBMb2dpY0V2ZW50LCBMb2dpY1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgZ2FtZU1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvR2FtZU1hbmFnZXJcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgQ29tbW9uTWVzc2FnZSwgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCB7IEh0dHBFcnJvclR5cGUsIFJlcXVlc3RQYWNrZ2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBTaGFyZVRyYWNlSGVscGRlciB9IGZyb20gXCIuLi9IZWxwZGVyL3NoYXJlVHJhY2UvU2hhcmVUcmFjZUhlbHBkZXJcIjtcbmltcG9ydCBMYW5ndWFnZUNoYW5nZSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlQ2hhbmdlXCI7XG5pbXBvcnQgU2VydmljZVZpZXcgZnJvbSBcIi4uL3NlcnZpY2UvU2VydmljZVZpZXdcIjtcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9VSU1hbmFnZXJcIjtcbmltcG9ydCBBa3VuVmlldyBmcm9tIFwiLi4vYWt1bi9Ba3VuVmlld1wiO1xuaW1wb3J0IEhhbGxOZXdWaWV3IGZyb20gXCIuLi9oYWxsL0hhbGxOZXdWaWV3XCI7XG5pbXBvcnQgTG9naW5OZXdWaWV3IGZyb20gXCIuLi9sb2dpbi9Mb2dpbk5ld1ZpZXdcIjtcbmltcG9ydCBDcmVhdGVBY2NvdW50VmlldyBmcm9tIFwiLi9DcmVhdGVBY2NvdW50Vmlld1wiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBSZWNoYXJnZURhdGEgZnJvbSBcIi4uL2RhdGEvUmVjaGFyZ2VEYXRhXCI7XG5pbXBvcnQgQmluZFBob25lVmlldyBmcm9tIFwiLi4vY29tbW9uL2JpbmRJdGVtVmlldy9CaW5kUGhvbmVWaWV3XCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0TmV3VmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG5vV2l0aGRyYXdhbDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYmFuZEluZm9Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiR29sZDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJUZWxlcGhvbmU6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiRW1haWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIERvY05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuV2l0aGRyYXdhbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBycEVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgY29kZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIG1fY29kZVN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIG1fYXR0cmFjdFN0cjogc3RyaW5nID0gJyc7XG4gICAgY2FuQXR0cmFjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgXzJkX3Nwcml0ZV9tYXQ6IHN0cmluZyA9ICcyZC1zcHJpdGUnO1xuICAgIF8yZF9ncmF5X21hdDogc3RyaW5nID0gJzJkLWdyYXktc3ByaXRlJztcblxuICAgIC8vIOeUqOaIt+aVsOaNrlxuICAgIHByaXZhdGUgX3VzZXJEYXRhOiBVc2VyRGF0YSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfcmVjaGFyZ2VEYXRhOiBSZWNoYXJnZURhdGEgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcIndhbGxldC9wcmVmYWJlcy9BdHRyYWN0TmV3Vmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIC8vIHRoaXMuYXVkaW9IZWxwZXIucGxheU11c2ljKFwiY29tbW9uL2F1ZGlvL2xvZ2luX2JnbVwiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICAgICAgdGhpcy5fcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMucnBFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uRGlkQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLnJwRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbkRpZEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ycEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25EaWRFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucnBFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vblRleHRDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uQ29kZUJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbkNvZGVFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25Db2RlRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vbkNvZGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTDJDX1dpdGhkcmF3X1JlcycsIHRoaXMub25MMkNfV2l0aGRyYXdfUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdMMkNfR2V0QmFua0NhcmRJbmZvX1JlcycsIHRoaXMub25MMkNfR2V0QmFua0NhcmRJbmZvX1Jlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X00yQ19Hb2xkQ2hhbmdlX01lc1wiLCB0aGlzLnJlZnJlc2hVc2VyKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTDJDX0JpbmRCYW5rQ2FyZF9SZXNcIiwgdGhpcy5yZXF1ZXN0QmFua0luZm8pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0V2ZW50X1MyQ19CaW5kUGhvbmUnLCB0aGlzLm9uRXZlbnRfUzJDX0JpbmRQaG9uZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX0dldENoZWNrQ29kZScsIHRoaXMub25FdmVudF9TMkNfR2V0Q2hlY2tDb2RlKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0QmFua0luZm8oKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0QmFua0xpc3QoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVXNlcigpO1xuICAgICAgICB0aGlzLnJlZnJlc2hQaG9uZU5vKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEVtYWlsKCk7XG4gICAgfVxuXG4gICAgaW5pdFZpZXcoKSB7XG4gICAgICAgIHRoaXMuYnRuV2l0aGRyYXdhbC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGxldCBtYXRlcmlhbDogY2MuTWF0ZXJpYWwgPSBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwodGhpcy5fMmRfZ3JheV9tYXQpO1xuICAgICAgICBsZXQgc3AgPSB0aGlzLmJ0bldpdGhkcmF3YWwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwLnNldE1hdGVyaWFsKDAsIG1hdGVyaWFsKTtcblxuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gdGhpcy5fcmVjaGFyZ2VEYXRhO1xuICAgICAgICBpZiAoIXJlY2hhcmdlRGF0YS5taW5XaXRoQW1vdW50IHx8ICFyZWNoYXJnZURhdGEubWF4V2l0aEFtb3VudCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtaW5XaXRoQW1vdW50ID0gcmVjaGFyZ2VEYXRhLm1pbldpdGhBbW91bnQ7XG4gICAgICAgIGxldCBtYXhXaXRoQW1vdW50ID0gcmVjaGFyZ2VEYXRhLm1heFdpdGhBbW91bnQ7XG4gICAgICAgIHRoaXMucnBFZGl0Qm94LnBsYWNlaG9sZGVyID0gYGphcmFrOlJwJHttaW5XaXRoQW1vdW50fS0ke21heFdpdGhBbW91bnR9YDtcbiAgICB9XG5cbiAgICByZXF1ZXN0R2V0QmFua0xpc3QoKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJMX0dldEJhbmtMaXN0X1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBsaW1pdDogNlxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMkxfR2V0QmFua0xpc3RfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0dldEJhbmtMaXN0X1JlcSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyTF9HZXRCYW5rTGlzdF9SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcmVxdWVzdEJhbmtJbmZvKCkge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyTF9HZXRCYW5rQ2FyZEluZm9fUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9HZXRCYW5rQ2FyZEluZm9fUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0dldEJhbmtDYXJkSW5mb19SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfR2V0QmFua0NhcmRJbmZvX1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBvbkV2ZW50X1MyQ19CaW5kUGhvbmUoKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaFBob25lTm8oKTtcbiAgICB9XG5cbiAgICByZWZyZXNoUGhvbmVObygpIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIGxldCBwaG9uZSA9IHVzZXJEYXRhLkJpbmRQaG9uZTtcbiAgICAgICAgaWYgKHBob25lKVxuICAgICAgICAgICAgdGhpcy5sYWJUZWxlcGhvbmUuc3RyaW5nID0gcGhvbmU7XG4gICAgfVxuXG4gICAgcmVmcmVzaEVtYWlsKCkge1xuICAgICAgICBsZXQgdXNlckRhdGEgPSB0aGlzLl91c2VyRGF0YTtcbiAgICAgICAgbGV0IGVtYWlsID0gdXNlckRhdGEuZW1haWw7XG4gICAgICAgIGlmIChlbWFpbClcbiAgICAgICAgICAgIHRoaXMubGFiRW1haWwuc3RyaW5nID0gZW1haWw7XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnYnRuQ2xvc2UnOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNsb3NlRG9jJzpcbiAgICAgICAgICAgICAgICB0aGlzLkRvY05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5BcnJhbmdlJzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQ3JlYXRlQWNjb3VudFZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNoYW5nZSc6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IENyZWF0ZUFjY291bnRWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5VcGRhdGVUZWwnOlxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBCaW5kUGhvbmVWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5XaXRoZHJhd2FsJzpcbiAgICAgICAgICAgICAgICB0aGlzLndpdGhkcmF3SGFubGRlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuR2V0Q29kZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0dldENvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xhYk51bWJlck9mT3Blbic6XG4gICAgICAgICAgICAgICAgdGhpcy5Eb2NOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja0dldENvZGUoKSB7XG4gICAgICAgIGxldCB1c2VyZGF0YSA9IHRoaXMuX3VzZXJEYXRhO1xuICAgICAgICBsZXQgZW1haWwgPSB1c2VyZGF0YS5lbWFpbDtcbiAgICAgICAgaWYgKGVtYWlsKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RHZXRDaGVja0NvZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5PVEJJTkRFTUFJTFxuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5USVBTLk5PVEJJTkRFTUFJTCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkV2ZW50X1MyQ19HZXRDaGVja0NvZGUoKSB7XG4gICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uUkVHSVNURVIuUExFQVNFQ0hFQ0spO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Db2RlQmVnYW4odGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2NvZGVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvZGVFbmRlZCh0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9jb2RlU3RyLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9jb2RlU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Db2RlQ2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9jb2RlU3RyID0gY29udGVudC5zdHJpbmc7XG4gICAgfVxuXG4gICAgcmVxdWVzdEdldENoZWNrQ29kZSgpIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHVzZXJEYXRhLmVtYWlsO1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19HZXRDaGVja0NvZGUuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcmlhbDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICB1c2VybmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0Q2hlY2tDb2RlLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJTX0dldENoZWNrQ29kZSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19HZXRDaGVja0NvZGUsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgd2l0aGRyYXdIYW5sZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5jYW5BdHRyYWN0KSB7XG4gICAgICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gdGhpcy5fcmVjaGFyZ2VEYXRhO1xuICAgICAgICAgICAgbGV0IGJhbmRCYW5rQ2FyZEluZm8gPSByZWNoYXJnZURhdGEuYmFuZEJhbmtDYXJkSW5mbztcblxuICAgICAgICAgICAgaWYgKCFiYW5kQmFua0NhcmRJbmZvKSByZXR1cm47XG5cbiAgICAgICAgICAgIGxldCBhdHRyYWN0TnVtID0gTnVtYmVyKHRoaXMubV9hdHRyYWN0U3RyKTtcbiAgICAgICAgICAgIGxldCBiYW5rTm8gPSBiYW5kQmFua0NhcmRJbmZvLmJhbmtObztcbiAgICAgICAgICAgIGxldCBiYW5rQ29kZSA9IGJhbmRCYW5rQ2FyZEluZm8uYmFua0NvZGU7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGJhbmRCYW5rQ2FyZEluZm8uYmFua1VzZXJOYW1lO1xuICAgICAgICAgICAgbGV0IGNoaXBzID0gYXR0cmFjdE51bSAqIDEwMDtcblxuICAgICAgICAgICAgbGV0IHJlcSA9IE1TVC5DMkxfV2l0aGRyYXdfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgICAgIGNoaXBzLFxuICAgICAgICAgICAgICAgIGJhbmtObyxcbiAgICAgICAgICAgICAgICBiYW5rQ29kZSxcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJMX1dpdGhkcmF3X1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMkxfV2l0aGRyYXdfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuQzJMX1dpdGhkcmF3X1JlcSwgYnVmZmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTDJDX1dpdGhkcmF3X1JlcygpIHtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5USVBTLlJFQ0hBUkdFU1VDQ0VTUyk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFVzZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGF0YS5pc0xvZ2luZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sYWJHb2xkLnN0cmluZyA9IE51bWJlclV0aWxzLmNvbnZlclRvQyhOdW1iZXIodGhpcy5fdXNlckRhdGEuaW5mby5Hb2xkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkwyQ19HZXRCYW5rQ2FyZEluZm9fUmVzKCkge1xuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICBsZXQgYmFuZEJhbmtDYXJkSW5mbyA9IHJlY2hhcmdlRGF0YS5iYW5kQmFua0NhcmRJbmZvO1xuICAgICAgICB0aGlzLmJhbmRJbmZvTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub1dpdGhkcmF3YWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChiYW5kQmFua0NhcmRJbmZvKSB7XG4gICAgICAgICAgICB0aGlzLmJhbmRJbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQmFuZEluZm8oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9XaXRoZHJhd2FsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoQmFuZEluZm8oKSB7XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIGxldCBiYW5kQmFua0NhcmRJbmZvID0gcmVjaGFyZ2VEYXRhLmJhbmRCYW5rQ2FyZEluZm87XG4gICAgICAgIGxldCBiYW5kSW5mb05vZGUgPSB0aGlzLmJhbmRJbmZvTm9kZTtcbiAgICAgICAgbGV0IGJhbmtObyA9IGJhbmRJbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmFua05vJyk7XG4gICAgICAgIGxldCBiYW5rQ29kZSA9IGJhbmRJbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmFua0NvZGUnKTtcbiAgICAgICAgYmFua05vLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYmFuZEJhbmtDYXJkSW5mby5iYW5rTm87XG4gICAgICAgIGJhbmtDb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYmFuZEJhbmtDYXJkSW5mby5iYW5rQ29kZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRGlkQmVnYW4odGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMucnBFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9hdHRyYWN0U3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25EaWRFbmRlZCh0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9hdHRyYWN0U3RyLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJwRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fYXR0cmFjdFN0cjtcbiAgICAgICAgdGhpcy5jaGVja0lzQXR0cmFjdCgpO1xuICAgIH1cblxuICAgIGNoZWNrSXNBdHRyYWN0KCkge1xuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICBpZiAoIXJlY2hhcmdlRGF0YS5taW5XaXRoQW1vdW50IHx8ICFyZWNoYXJnZURhdGEubWF4V2l0aEFtb3VudCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtaW5XaXRoQW1vdW50ID0gcmVjaGFyZ2VEYXRhLm1pbldpdGhBbW91bnQ7XG4gICAgICAgIGxldCBtYXhXaXRoQW1vdW50ID0gcmVjaGFyZ2VEYXRhLm1heFdpdGhBbW91bnQ7XG4gICAgICAgIGxldCBhdHRyYWN0TnVtID0gTnVtYmVyKHRoaXMubV9hdHRyYWN0U3RyKTtcbiAgICAgICAgaWYgKGF0dHJhY3ROdW0pIHtcbiAgICAgICAgICAgIGlmIChhdHRyYWN0TnVtID49IG1pbldpdGhBbW91bnQgJiYgYXR0cmFjdE51bSA8PSBtYXhXaXRoQW1vdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5XaXRoZHJhd2FsLmdldENvbXBvbmVudChjYy5CdXR0b24pLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBtYXRlcmlhbDogY2MuTWF0ZXJpYWwgPSBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwodGhpcy5fMmRfc3ByaXRlX21hdCk7XG4gICAgICAgICAgICAgICAgbGV0IHNwID0gdGhpcy5idG5XaXRoZHJhd2FsLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgIHNwLnNldE1hdGVyaWFsKDAsIG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FuQXR0cmFjdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVGV4dENoYW5nZWQoY29udGVudDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fYXR0cmFjdFN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxuXG59XG4iXX0=