
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/CreateAccountView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L0NyZWF0ZUFjY291bnRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0VBQXVEO0FBRXZELHVEQUFvRDtBQUVwRCw2REFBMEQ7QUFHMUQsa0VBQTJFO0FBRzNFLG9FQUE0QztBQUU1QyxvRUFBNEM7QUFRNUMseURBQW1EO0FBQ25ELHdFQUFnRDtBQUdoRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLGdCQUFNO0lBQXJEOztRQUlJLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixtQkFBYyxHQUFlLElBQUksQ0FBQztRQUVsQyxvQkFBZSxHQUFlLElBQUksQ0FBQztRQUduQyxnQkFBVyxHQUFhLElBQUksQ0FBQztRQUU3QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsSUFBSSxDQUFD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T0FBTyxDQUFDO3lEQUNhO0FBRWxDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7MERBQ2M7QUFHbkM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDVTtBQXpDWixpQkFBaUI7SUFGckMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsaUJBQWlCLENBZ1RyQztrQkFoVG9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2Jhc2UvSG90VXBkYXRlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGRpc3BhdGNoRW50ZXJDb21wbGV0ZSwgTG9naWNFdmVudCwgTG9naWNUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IGdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL0dhbWVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IENvbW1vbk1lc3NhZ2UsIHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBIdHRwRXJyb3JUeXBlLCBSZXF1ZXN0UGFja2dlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvSHR0cENsaWVudFwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgU2hhcmVUcmFjZUhlbHBkZXIgfSBmcm9tIFwiLi4vSGVscGRlci9zaGFyZVRyYWNlL1NoYXJlVHJhY2VIZWxwZGVyXCI7XG5pbXBvcnQgTGFuZ3VhZ2VDaGFuZ2UgZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUNoYW5nZVwiO1xuaW1wb3J0IFNlcnZpY2VWaWV3IGZyb20gXCIuLi9zZXJ2aWNlL1NlcnZpY2VWaWV3XCI7XG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvVUlNYW5hZ2VyXCI7XG5pbXBvcnQgQWt1blZpZXcgZnJvbSBcIi4uL2FrdW4vQWt1blZpZXdcIjtcbmltcG9ydCBIYWxsTmV3VmlldyBmcm9tIFwiLi4vaGFsbC9IYWxsTmV3Vmlld1wiO1xuaW1wb3J0IExvZ2luTmV3VmlldyBmcm9tIFwiLi4vbG9naW4vTG9naW5OZXdWaWV3XCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFJlY2hhcmdlRGF0YSBmcm9tIFwiLi4vZGF0YS9SZWNoYXJnZURhdGFcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUFjY291bnRWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9yZUJhbmtOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpY29uRG93bjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaWNvblVwOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiYW5rSXRlbVRvcDA6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtVG9wMTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYmFua0l0ZW1Ub3AyOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiYW5rSXRlbVRvcDM6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtVG9wNDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYmFua0l0ZW1Ub3A1OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtTW9yZTA6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtTW9yZTE6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtTW9yZTI6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtTW9yZTM6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtTW9yZTQ6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhbmtJdGVtTW9yZTU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgYmFua051bUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIGJhbmtOYW1lRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiQmFua0NvZGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIGJhbmtOdW1TdHI6IHN0cmluZyA9ICcnO1xuICAgIGJhbmtOYW1lU3RyOiBzdHJpbmcgPSAnJztcbiAgICBiYW5rQ29kZVN0cjogc3RyaW5nID0gbnVsbDtcblxuICAgIGJhbmtDaG9vc2VkSW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgICBjdXJyZW50TW9yZUluZGV4ID0gMDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJ3YWxsZXQvcHJlZmFiZXMvQ3JlYXRlQWNjb3VudFZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgLy8gdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoXCJjb21tb24vYXVkaW8vbG9naW5fYmdtXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuYmFua051bUVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWJlZ2FuXCIsIHRoaXMub25CYW5rTnVtQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLmJhbmtOdW1FZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1lbmRlZFwiLCB0aGlzLm9uQmFua0VudGVyRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5iYW5rTnVtRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1yZXR1cm5cIiwgdGhpcy5vbkJhbmtFbnRlckVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuYmFua051bUVkaXRCb3gubm9kZS5vbihcInRleHQtY2hhbmdlZFwiLCB0aGlzLm9uQmFua051bVR4dENoYW5nZWQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmFua05hbWVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uQmFua05hbWVCZWdhbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuYmFua05hbWVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1lbmRlZFwiLCB0aGlzLm9uQmFua05hbWVFbnRlckVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuYmFua05hbWVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLXJldHVyblwiLCB0aGlzLm9uQmFua05hbWVFbnRlckVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuYmFua05hbWVFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vbkJhbmtOYW1lVHh0Q2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0wyQ19CaW5kQmFua0NhcmRfUmVzJywgdGhpcy5vbkwyQ19CaW5kQmFua0NhcmRfUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdMMkNfR2V0QmFua0xpc3RfUmVzJywgdGhpcy5vbkwyQ19HZXRCYW5rTGlzdF9SZXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmFua1RvcEluZm8oKTtcbiAgICAgICAgLy8gdGhpcy5yZXF1ZXN0R2V0QmFua0xpc3QoMCwgNik7XG4gICAgfVxuXG4gICAgaW5pdERhdGEoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1vcmVJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgcmVxdWVzdEdldEJhbmtMaXN0KGluZGV4LCBsaW1pdCkge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyTF9HZXRCYW5rTGlzdF9SZXEuY3JlYXRlKHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJMX0dldEJhbmtMaXN0X1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTF9HZXRCYW5rTGlzdF9SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfR2V0QmFua0xpc3RfUmVxLCBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNsb3NlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5TYXZlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVCYW5rSGFubGRlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuTW9yZUJhbmsnOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tNb3JlQmFuaygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuTGFzdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkxhc3RIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5OZXh0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuTmV4dEhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrQnRuTGFzdEhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1vcmVJbmRleC0tO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9yZUluZGV4IDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vcmVJbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmN1cnJlbnRNb3JlSW5kZXhcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0QmFua0xpc3QoaW5kZXggKiA2LCA2KTtcbiAgICB9XG5cbiAgICBjbGlja0J0bk5leHRIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRNb3JlSW5kZXgrKztcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jdXJyZW50TW9yZUluZGV4O1xuICAgICAgICB0aGlzLnJlcXVlc3RHZXRCYW5rTGlzdChpbmRleCAqIDYsIDYpO1xuICAgIH1cblxuICAgIHNhdmVCYW5rSGFubGRlcigpIHtcbiAgICAgICAgbGV0IGNob29zZWRJbmRleCA9IHRoaXMuYmFua0Nob29zZWRJbmRleDtcbiAgICAgICAgaWYgKGNob29zZWRJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRJUFMuU0VMRUNUQkFOayk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICBsZXQgYmFua0luZm9MaXN0ID0gcmVjaGFyZ2VEYXRhLmJhbmtJbmZvTGlzdDtcbiAgICAgICAgbGV0IGJhbmtJbmZvID0gYmFua0luZm9MaXN0W2Nob29zZWRJbmRleF07XG4gICAgICAgIGlmICghYmFua0luZm8pIHJldHVybjtcblxuICAgICAgICBsZXQgbmFtZSA9IGJhbmtJbmZvLmJhbmtOYW1lO1xuICAgICAgICBsZXQgYmFua05vID0gdGhpcy5iYW5rTnVtU3RyO1xuICAgICAgICBsZXQgYmFua0NvZGUgPSBiYW5rSW5mby5iYW5rQ29kZTtcblxuICAgICAgICBpZiAoIW5hbWUgfHwgIWJhbmtObyB8fCAhYmFua0NvZGUpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5CQU5EQkFOS0lORk9GQUlMKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMkxfQmluZEJhbmtDYXJkX1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgYmFua05vLFxuICAgICAgICAgICAgYmFua0NvZGUsXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9CaW5kQmFua0NhcmRfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0JpbmRCYW5rQ2FyZF9SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfQmluZEJhbmtDYXJkX1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBvbkwyQ19CaW5kQmFua0NhcmRfUmVzKCkge1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRJUFMuQklOREJBTktTVUNDRVNTKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X0wyQ19CaW5kQmFua0NhcmRfUmVzXCIpO1xuICAgIH1cblxuICAgIGNsaWNrTW9yZUJhbmsoKSB7XG4gICAgICAgIGxldCBtb3JlQmFua05vZGUgPSB0aGlzLm1vcmVCYW5rTm9kZTtcbiAgICAgICAgbW9yZUJhbmtOb2RlLmFjdGl2ZSA9ICFtb3JlQmFua05vZGUuYWN0aXZlO1xuXG4gICAgICAgIHRoaXMuaWNvbkRvd24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvblVwLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaWNvbkRvd24uYWN0aXZlID0gbW9yZUJhbmtOb2RlLmFjdGl2ZTtcbiAgICAgICAgdGhpcy5pY29uVXAuYWN0aXZlID0gIW1vcmVCYW5rTm9kZS5hY3RpdmU7XG5cbiAgICAgICAgaWYgKG1vcmVCYW5rTm9kZS5hY3RpdmUpXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RHZXRCYW5rTGlzdCgwLCA2KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQmFua1RvcEluZm8oKSB7XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIGxldCBiYW5rSW5mb0xpc3QgPSByZWNoYXJnZURhdGEuYmFua0luZm9MaXN0O1xuICAgICAgICBpZiAoYmFua0luZm9MaXN0ICYmIGJhbmtJbmZvTGlzdC5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA2OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYmFua0luZm9MaXN0W2luZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGJhbmtJdGVtVG9wID0gdGhpc1tgYmFua0l0ZW1Ub3Ake2luZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgaWNvbkNob29zZWQgPSBiYW5rSXRlbVRvcC5nZXRDaGlsZEJ5TmFtZSgnY2hvb3NlZCcpO1xuICAgICAgICAgICAgYmFua0l0ZW1Ub3AuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPD0gYmFua0luZm9MaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJhbmtJdGVtVG9wLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGFiQmFuayA9IGJhbmtJdGVtVG9wLmdldENoaWxkQnlOYW1lKCdsYWJCYW5rJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgICAgICBsYWJCYW5rLnN0cmluZyA9IGVsZW1lbnQuYmFua0NvZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJhbmtJdGVtVG9wLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFua0Nob29zZWRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUNob29zZWRIYW5sZGVyKCk7XG4gICAgICAgICAgICAgICAgaWNvbkNob29zZWQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDaG9vc2VkSGFuZGxlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoQmFua01vcmVJbmZvKCkge1xuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICBsZXQgYmFua0luZm9MaXN0ID0gcmVjaGFyZ2VEYXRhLmJhbmtJbmZvTGlzdDtcbiAgICAgICAgaWYgKGJhbmtJbmZvTGlzdCAmJiBiYW5rSW5mb0xpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vcmVJbmRleC0tO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDY7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBiYW5rSW5mb0xpc3RbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgYmFua0l0ZW1Nb3JlID0gdGhpc1tgYmFua0l0ZW1Nb3JlJHtpbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IGljb25DaG9vc2VkID0gYmFua0l0ZW1Nb3JlLmdldENoaWxkQnlOYW1lKCdjaG9vc2VkJyk7XG4gICAgICAgICAgICBiYW5rSXRlbU1vcmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPD0gYmFua0luZm9MaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJhbmtJdGVtTW9yZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxhYkJhbmsgPSBiYW5rSXRlbU1vcmUuZ2V0Q2hpbGRCeU5hbWUoJ2xhYkJhbmsnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgICAgIGxhYkJhbmsuc3RyaW5nID0gZWxlbWVudC5iYW5rTmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmFua0l0ZW1Nb3JlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFua0Nob29zZWRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUNob29zZWRIYW5sZGVyKCk7XG4gICAgICAgICAgICAgICAgaWNvbkNob29zZWQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDaG9vc2VkSGFuZGxlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlQ2hvb3NlZEhhbmxkZXIoKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA2OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBiYW5rSXRlbVRvcCA9IHRoaXNbYGJhbmtJdGVtVG9wJHtpbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IGJhbmtJdGVtTW9yZSA9IHRoaXNbYGJhbmtJdGVtTW9yZSR7aW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCB0b3BDaG9vc2VkID0gYmFua0l0ZW1Ub3AuZ2V0Q2hpbGRCeU5hbWUoJ2Nob29zZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1vcmVDaG9vc2VkID0gYmFua0l0ZW1Nb3JlLmdldENoaWxkQnlOYW1lKCdjaG9vc2VkJyk7XG4gICAgICAgICAgICB0b3BDaG9vc2VkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgbW9yZUNob29zZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoQ2hvb3NlZEhhbmRsZXIoKSB7XG4gICAgICAgIGxldCBjaG9vc2VkSW5kZXggPSB0aGlzLmJhbmtDaG9vc2VkSW5kZXg7XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIGxldCBiYW5rSW5mb0xpc3QgPSByZWNoYXJnZURhdGEuYmFua0luZm9MaXN0O1xuICAgICAgICBsZXQgYmFua0NvZGUgPSBiYW5rSW5mb0xpc3RbY2hvb3NlZEluZGV4XS5iYW5rQ29kZTtcbiAgICAgICAgdGhpcy5sYWJCYW5rQ29kZS5zdHJpbmcgPSBiYW5rQ29kZTtcbiAgICB9XG5cbiAgICBvbkwyQ19HZXRCYW5rTGlzdF9SZXMoKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaEJhbmtNb3JlSW5mbygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CYW5rTnVtQmVnYW4odGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFua051bUVkaXRCb3guc3RyaW5nID0gdGhpcy5iYW5rTnVtU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CYW5rRW50ZXJFbmQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmJhbmtOdW1TdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmFua051bUVkaXRCb3guc3RyaW5nID0gdGhpcy5iYW5rTnVtU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CYW5rTnVtVHh0Q2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KSB7XG4gICAgICAgIHRoaXMuYmFua051bVN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CYW5rTmFtZUJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJhbmtOdW1FZGl0Qm94LnN0cmluZyA9IHRoaXMuYmFua05hbWVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJhbmtOYW1lRW50ZXJFbmQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmJhbmtOYW1lU3RyLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJhbmtOdW1FZGl0Qm94LnN0cmluZyA9IHRoaXMuYmFua05hbWVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJhbmtOYW1lVHh0Q2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KSB7XG4gICAgICAgIHRoaXMuYmFua05hbWVTdHIgPSBjb250ZW50LnN0cmluZztcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgIH1cblxufVxuIl19