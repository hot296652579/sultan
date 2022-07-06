
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeSend.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '560d2yR/kRBoKfX6XzipE8t', 'RedPakgeSend');
// script/redPakge/RedPakgeSend.ts

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
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const RedPakgeShareView_1 = __importDefault(require("./RedPakgeShareView"));
const NUM_MAX = 100;
const NUM_MIN = 1;
const VALI_MAX = 200;
const LabColor = {
    nomal: cc.color(198, 117, 49),
    red: cc.color(230, 23, 23)
};
const { ccclass, property } = cc._decorator;
let RedPakgeSend = class RedPakgeSend extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.typeTip = null;
        this.numTip = null;
        this.amountTip = null;
        this.validityTip = null;
        this.codeTip = null;
        this.redIconNum = null;
        this.redIconAmount = null;
        this.redIconValidity = null;
        this.typeEditBox = null;
        this.numEditBox = null;
        this.amountEditBox = null;
        this.validityEditBox = null;
        this.codeEditBox = null;
        this.typePanel = null;
        this.infoPanel = null;
        this.infoContentPanel = null;
        this.bgUp = null;
        this.upNode = null;
        this.title = null;
        this.infoTypeLab = null;
        this.infoNumLab = null;
        this.infoAmountLab = null;
        this.infoValidityLab = null;
        this.infoCodeLab = null;
        this.infoTypeTip = null;
        this.infoNumTip = null;
        this.infoAmountTip = null;
        this.infoValidityTip = null;
        this.infoCodeTip = null;
        this.labAverage = null;
        this.labRandom = null;
        this.maxAmountLab = null;
        this._issend = false;
        this._maxAmount = 0;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SendRedPacket), this.sendCallBack);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_PreSendRedPacket), this.preCallBack);
    }
    preCallBack(msg) {
        if (msg && msg.statusMsg.status == 0) {
            this._maxAmount = Math.floor(msg.maximumAmount / 10000);
            this.maxAmountLab.node.active = true;
            this.maxAmountLab.string = LanguageImpl_1.i18n.REDPAKGE.amountlabMaxTip + UtilMgr_1.UtilMgr.changeMoney(this._maxAmount * 10000);
        }
        else {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + msg.statusMsg.status));
        }
    }
    sendCallBack(msg) {
        if (msg && msg.statusMsg.status == 0) {
            this.resetData();
            this.infoContentPanel.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(0, -200)), cc.delayTime(0.2), cc.callFunc(() => {
                this.hideInfoPanel();
                if (msg.shareUrl) {
                    Manager_1.Manager.uiManager.open({ type: RedPakgeShareView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [msg.shareUrl] });
                }
            })));
            this.title.active = false;
            this.bgUp.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(() => {
                this.bgUp.zIndex = 2;
            }), cc.scaleTo(0.2, 1, -1)));
        }
        else {
            this._issend = false;
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + msg.statusMsg.status));
        }
    }
    onEnable() {
        this.initUI();
        this.reqPreSendRedPacket();
    }
    reqPreSendRedPacket() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_PreSendRedPacket, null);
    }
    initUI() {
        this.infoTypeTip.language = this.typeTip.language = Manager_1.Manager.makeLanguage("REDPAKGE.typelabTip");
        this.infoNumTip.language = this.numTip.language = Manager_1.Manager.makeLanguage("REDPAKGE.numlabTip");
        this.infoAmountTip.language = this.amountTip.language = Manager_1.Manager.makeLanguage("REDPAKGE.amountlabTip");
        this.infoValidityTip.language = this.validityTip.language = Manager_1.Manager.makeLanguage("REDPAKGE.validitylabTip");
        this.infoCodeTip.language = this.codeTip.language = Manager_1.Manager.makeLanguage("REDPAKGE.codelabTip");
        this.typeEditBox.enabled = false;
        this.typeEditBox.string = Manager_1.Manager.getLanguage("REDPAKGE.randomTypeTip");
        this.numEditBox.placeholder = Manager_1.Manager.getLanguage("REDPAKGE.numPlaceholderTip");
        this.amountEditBox.placeholder = Manager_1.Manager.getLanguage("REDPAKGE.amountPlaceholderTip");
        this.validityEditBox.placeholder = Manager_1.Manager.getLanguage("REDPAKGE.validityPlaceholderTip");
        this.codeEditBox.placeholder = Manager_1.Manager.getLanguage("REDPAKGE.codePlaceholderTip");
        this.labAverage.language = Manager_1.Manager.makeLanguage("REDPAKGE.averageTypeTip");
        this.labRandom.language = Manager_1.Manager.makeLanguage("REDPAKGE.randomTypeTip");
        this.typePanel.active = false;
        this.redType = 2;
        this.numEditBox.string = "";
        this.amountEditBox.string = "";
        this.validityEditBox.string = "24";
        this.codeEditBox.string = this.getRandomCode();
        this.resetRedTip();
        this.hideInfoPanel();
    }
    resetData() {
        this.numEditBox.string = "";
        this.amountEditBox.string = "";
        this.validityEditBox.string = "24";
        this.codeEditBox.string = this.getRandomCode();
    }
    resetRedTip() {
        this.redIconNum.active = false;
        this.redIconAmount.active = false;
        this.redIconValidity.active = false;
        this.numTip.node.color = LabColor.nomal;
        this.amountTip.node.color = LabColor.nomal;
        this.validityTip.node.color = LabColor.nomal;
        this.maxAmountLab.node.color = LabColor.nomal;
    }
    onClick(name, node) {
        switch (name) {
            case "confirm":
                this.onClickConfirm();
                break;
            case "typeEditbox":
                this.showType();
                break;
            case "infoClose":
                this.hideInfoPanel();
                break;
            case "infoConfirm":
                this.onClickInfoConfirm();
                break;
            case "infoCancel":
                this.hideInfoPanel();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    showInfoPanel() {
        this.infoContentPanel.y = 0;
        this.upNode.zIndex = 1;
        this.title.active = true;
        this.bgUp.stopAllActions();
        this.bgUp.zIndex = 0;
        this.bgUp.scaleY = 1;
        this.infoPanel.active = true;
    }
    hideInfoPanel() {
        this.infoPanel.active = false;
        this.infoContentPanel.y = 0;
        this.title.active = true;
        this.bgUp.stopAllActions();
        this.bgUp.zIndex = 0;
        this.bgUp.scaleY = 1;
        this._issend = false;
    }
    showType() {
        this.typePanel.active = !this.typePanel.active ? true : false;
    }
    onNumEditboxEnd(editbox, customEventData) {
        let input = editbox.string;
        if (input && input != parseInt(input)) {
            input = parseInt(input);
        }
        if (parseInt(input) < NUM_MIN) {
            editbox.string = NUM_MIN;
        }
        else if (parseInt(input) > NUM_MAX) {
            editbox.string = NUM_MAX;
        }
        else {
            editbox.string = input;
        }
        if (parseInt(editbox.string) > 0) {
            this.numTip.node.color = LabColor.nomal;
            this.redIconNum.active = false;
        }
    }
    onAmountEditboxEnd(editbox, customEventData) {
        let input = editbox.string;
        if (input && input != parseInt(input)) {
            input = parseInt(input);
        }
        let uMax = User_1.User._gold / 10000;
        let max = parseInt(uMax.toString());
        if (parseInt(input) < NUM_MIN) {
            if (uMax < NUM_MIN) {
                editbox.string = 0;
            }
            else {
                editbox.string = NUM_MIN;
            }
        }
        else if (parseInt(input) > max) {
            if (max >= NUM_MIN) {
                editbox.string = max;
            }
            else {
                editbox.string = 0;
            }
        }
        else {
            editbox.string = input;
        }
        if (parseInt(editbox.string) > 0) {
            this.amountTip.node.color = LabColor.nomal;
            this.redIconAmount.active = false;
        }
        if (parseInt(editbox.string) > this._maxAmount) {
            this.maxAmountLab.node.color = LabColor.red;
        }
        else {
            this.maxAmountLab.node.color = LabColor.nomal;
        }
    }
    onValiditEditboxEnd(editbox, customEventData) {
        let input = editbox.string;
        if (input && input != parseInt(input)) {
            input = parseInt(input);
        }
        if (parseInt(input) < NUM_MIN) {
            editbox.string = NUM_MIN;
        }
        else if (parseInt(input) > VALI_MAX) {
            editbox.string = VALI_MAX;
        }
        else {
            editbox.string = input;
        }
        if (parseInt(editbox.string) > 0) {
            this.validityTip.node.color = LabColor.nomal;
            this.redIconValidity.active = false;
        }
    }
    onCodeEditboxEnd(editbox, customEventData) {
        let input = editbox.string;
        if (input) {
            if (input.length < 6) {
                editbox.string = "";
                return;
            }
            if (input != parseInt(input)) {
                input = parseInt(input);
            }
        }
        editbox.string = input;
    }
    getRandomCode() {
        let code = "";
        for (var i = 1; i <= 6; i++) {
            const num = Math.floor(Math.random() * 10);
            code += num;
        }
        return code;
    }
    onClickNumSub() {
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        if (this.numEditBox.string) {
            let input = parseInt(this.numEditBox.string);
            input--;
            this.numEditBox.string = input.toString();
            this.onNumEditboxEnd(this.numEditBox, "");
        }
    }
    onClickNumAdd() {
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        if (this.numEditBox.string) {
            let input = parseInt(this.numEditBox.string);
            input++;
            this.numEditBox.string = input.toString();
            this.onNumEditboxEnd(this.numEditBox, "");
        }
    }
    onClickValiditAdd() {
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        if (this.validityEditBox.string) {
            let input = parseInt(this.validityEditBox.string);
            input++;
            this.validityEditBox.string = input.toString();
            this.onValiditEditboxEnd(this.validityEditBox, "");
        }
    }
    onClickValiditSub() {
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        if (this.validityEditBox.string) {
            let input = parseInt(this.validityEditBox.string);
            input--;
            this.validityEditBox.string = input.toString();
            this.onValiditEditboxEnd(this.validityEditBox, "");
        }
    }
    onClickRandomType() {
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        this.showType();
        this.typeEditBox.string = Manager_1.Manager.getLanguage("REDPAKGE.randomTypeTip");
        this.redType = 2; // 红包类型 1平均红包 2随机红包
    }
    onClickAverageType() {
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        this.showType();
        this.typeEditBox.string = Manager_1.Manager.getLanguage("REDPAKGE.averageTypeTip");
        this.redType = 1;
    }
    onClickConfirm() {
        if (this.numEditBox.string == "") {
            // PanelHelp.showTip(i18n.REDPAKGE.inputNum)
            this.numTip.node.color = LabColor.red;
            this.redIconNum.active = true;
            return;
        }
        if (this.amountEditBox.string == "" || parseInt(this.amountEditBox.string) == 0 || parseInt(this.amountEditBox.string) > this._maxAmount) {
            // PanelHelp.showTip(i18n.REDPAKGE.inputAmount)
            this.amountTip.node.color = LabColor.red;
            this.redIconAmount.active = true;
            return;
        }
        if (this.validityEditBox.string == "") {
            // PanelHelp.showTip(i18n.REDPAKGE.inputValidity)
            this.validityTip.node.color = LabColor.red;
            this.redIconValidity.active = true;
            return;
        }
        this.infoTypeLab.string = this.typeEditBox.string;
        this.infoNumLab.string = this.numEditBox.string;
        this.infoAmountLab.string = this.amountEditBox.string;
        this.infoValidityLab.string = this.validityEditBox.string;
        this.infoCodeLab.string = this.codeEditBox.string || "-";
        this.showInfoPanel();
    }
    onClickInfoConfirm() {
        if (parseInt(this.amountEditBox.string) == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[243]);
            return;
        }
        if (this._issend) {
            return;
        }
        this._issend = true;
        this.reqSendRedPakge();
    }
    reqSendRedPakge() {
        let data = {
            type: this.redType,
            number: parseInt(this.numEditBox.string),
            totalAmount: parseInt(this.amountEditBox.string) * 10000,
            validity: parseInt(this.validityEditBox.string),
            receiveCode: this.codeEditBox.string || "",
        };
        let req = CommonService_1.protoPackage.hall.SendRedPacketReq.create(data);
        let buffer = CommonService_1.protoPackage.hall.SendRedPacketReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SendRedPacket, buffer);
    }
};
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "typeTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "numTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "amountTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "validityTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "codeTip", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "redIconNum", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "redIconAmount", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "redIconValidity", void 0);
__decorate([
    property(cc.EditBox)
], RedPakgeSend.prototype, "typeEditBox", void 0);
__decorate([
    property(cc.EditBox)
], RedPakgeSend.prototype, "numEditBox", void 0);
__decorate([
    property(cc.EditBox)
], RedPakgeSend.prototype, "amountEditBox", void 0);
__decorate([
    property(cc.EditBox)
], RedPakgeSend.prototype, "validityEditBox", void 0);
__decorate([
    property(cc.EditBox)
], RedPakgeSend.prototype, "codeEditBox", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "typePanel", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "infoPanel", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "infoContentPanel", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "bgUp", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "upNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeSend.prototype, "title", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoTypeLab", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoNumLab", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoAmountLab", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoValidityLab", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoCodeLab", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoTypeTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoNumTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoAmountTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoValidityTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "infoCodeTip", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "labAverage", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "labRandom", void 0);
__decorate([
    property(cc.Label)
], RedPakgeSend.prototype, "maxAmountLab", void 0);
RedPakgeSend = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RedPakgeSend);
exports.default = RedPakgeSend;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VTZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQXVEO0FBQ3ZELHVEQUFvRDtBQUNwRCwrREFBdUU7QUFDdkUsNkRBQTBEO0FBQzFELHVEQUE2RDtBQUM3RCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBQzVDLHlDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsb0VBQTRDO0FBQzVDLDRFQUFvRDtBQUVwRCxNQUFNLE9BQU8sR0FBVyxHQUFHLENBQUM7QUFDNUIsTUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDO0FBQzFCLE1BQU0sUUFBUSxHQUFXLEdBQUcsQ0FBQztBQUU3QixNQUFNLFFBQVEsR0FBRztJQUNiLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQzdCLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0NBQzdCLENBQUE7QUFFRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFLNUMsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsZ0JBQU07SUFBaEQ7O1FBSUksWUFBTyxHQUFhLElBQUksQ0FBQTtRQUd4QixXQUFNLEdBQWEsSUFBSSxDQUFBO1FBR3ZCLGNBQVMsR0FBYSxJQUFJLENBQUE7UUFHMUIsZ0JBQVcsR0FBYSxJQUFJLENBQUE7UUFHNUIsWUFBTyxHQUFhLElBQUksQ0FBQTtRQUd4QixlQUFVLEdBQVksSUFBSSxDQUFBO1FBRTFCLGtCQUFhLEdBQVksSUFBSSxDQUFBO1FBRTdCLG9CQUFlLEdBQVksSUFBSSxDQUFBO1FBRy9CLGdCQUFXLEdBQWUsSUFBSSxDQUFBO1FBRzlCLGVBQVUsR0FBZSxJQUFJLENBQUE7UUFHN0Isa0JBQWEs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QUFFLENBQUMsSUFBSSxDQUFDOzRDQUNJO0FBR3RCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0c7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDUztBQUU1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNRO0FBRTNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ1c7QUFFOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDYTtBQUVoQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNTO0FBRzVCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ1M7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDUTtBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNXO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ2E7QUFHaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDUztBQUc1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNRO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ087QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDVTtBQTNGWixZQUFZO0lBRmhDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLFlBQVksQ0EwYmhDO2tCQTFib0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCBSZWRQYWtnZVNoYXJlVmlldyBmcm9tIFwiLi9SZWRQYWtnZVNoYXJlVmlld1wiO1xuXG5jb25zdCBOVU1fTUFYOiBudW1iZXIgPSAxMDA7XG5jb25zdCBOVU1fTUlOOiBudW1iZXIgPSAxO1xuY29uc3QgVkFMSV9NQVg6IG51bWJlciA9IDIwMDtcblxuY29uc3QgTGFiQ29sb3IgPSB7XG4gICAgbm9tYWw6IGNjLmNvbG9yKDE5OCwgMTE3LCA0OSksXG4gICAgcmVkOiBjYy5jb2xvcigyMzAsIDIzLCAyMylcbn1cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkUGFrZ2VTZW5kIGV4dGVuZHMgVUlWaWV3IHtcblxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHR5cGVUaXA6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG51bVRpcDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYW1vdW50VGlwOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB2YWxpZGl0eVRpcDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY29kZVRpcDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByZWRJY29uTnVtOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlZEljb25BbW91bnQ6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmVkSWNvblZhbGlkaXR5OiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgdHlwZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBudW1FZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgYW1vdW50RWRpdEJveDogY2MuRWRpdEJveCA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICB2YWxpZGl0eUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBjb2RlRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGxcblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdHlwZVBhbmVsOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaW5mb1BhbmVsOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaW5mb0NvbnRlbnRQYW5lbDogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJnVXA6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB1cE5vZGU6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aXRsZTogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmZvVHlwZUxhYjogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGluZm9OdW1MYWI6IGNjLkxhYmVsID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmZvQW1vdW50TGFiOiBjYy5MYWJlbCA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaW5mb1ZhbGlkaXR5TGFiOiBjYy5MYWJlbCA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaW5mb0NvZGVMYWI6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGluZm9UeXBlVGlwOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmZvTnVtVGlwOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmZvQW1vdW50VGlwOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmZvVmFsaWRpdHlUaXA6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGluZm9Db2RlVGlwOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJBdmVyYWdlOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJSYW5kb206IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG1heEFtb3VudExhYjogY2MuTGFiZWwgPSBudWxsXG5cblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICByZWRUeXBlOiBudW1iZXI7IC8vIOe6ouWMheexu+WeiyAx5bmz5Z2H57qi5YyFIDLpmo/mnLrnuqLljIVcbiAgICBwcml2YXRlIF9pc3NlbmQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX21heEFtb3VudCA9IDA7XG5cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9TZW5kUmVkUGFja2V0KSwgdGhpcy5zZW5kQ2FsbEJhY2spO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9QcmVTZW5kUmVkUGFja2V0KSwgdGhpcy5wcmVDYWxsQmFjayk7XG5cbiAgICB9XG4gICAgcHJpdmF0ZSBwcmVDYWxsQmFjayhtc2cpe1xuICAgICAgICBpZiAobXNnICYmIG1zZy5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21heEFtb3VudCA9IE1hdGguZmxvb3IobXNnLm1heGltdW1BbW91bnQvMTAwMDApIFxuICAgICAgICAgICAgdGhpcy5tYXhBbW91bnRMYWIubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tYXhBbW91bnRMYWIuc3RyaW5nID0gaTE4bi5SRURQQUtHRS5hbW91bnRsYWJNYXhUaXArVXRpbE1nci5jaGFuZ2VNb25leSh0aGlzLl9tYXhBbW91bnQqMTAwMDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIkVSUk9SQ09ERS5cIiArIG1zZy5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBzZW5kQ2FsbEJhY2sobXNnKSB7XG4gICAgICAgIGlmIChtc2cgJiYgbXNnLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuXG4gICAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgICB0aGlzLmluZm9Db250ZW50UGFuZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjIsIGNjLnYyKDAsIC0yMDApKSwgY2MuZGVsYXlUaW1lKDAuMiksIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVJbmZvUGFuZWwoKVxuICAgICAgICAgICAgICAgIGlmIChtc2cuc2hhcmVVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFJlZFBha2dlU2hhcmVWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IFttc2cuc2hhcmVVcmxdIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpKVxuICAgICAgICAgICAgdGhpcy50aXRsZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5iZ1VwLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC4yKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYmdVcC56SW5kZXggPSAyXG4gICAgICAgICAgICB9KSwgY2Muc2NhbGVUbygwLjIsIDEsIC0xKSkpXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzc2VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBtc2cuc3RhdHVzTXNnLnN0YXR1cykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLmluaXRVSSgpXG4gICAgICAgIHRoaXMucmVxUHJlU2VuZFJlZFBhY2tldCgpXG4gICAgfVxuICAgIHByaXZhdGUgcmVxUHJlU2VuZFJlZFBhY2tldCgpe1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUHJlU2VuZFJlZFBhY2tldCxcbiAgICAgICAgICAgIG51bGwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFVJKCkge1xuICAgICAgICB0aGlzLmluZm9UeXBlVGlwLmxhbmd1YWdlID0gdGhpcy50eXBlVGlwLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRURQQUtHRS50eXBlbGFiVGlwXCIpO1xuICAgICAgICB0aGlzLmluZm9OdW1UaXAubGFuZ3VhZ2UgPSB0aGlzLm51bVRpcC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUkVEUEFLR0UubnVtbGFiVGlwXCIpO1xuICAgICAgICB0aGlzLmluZm9BbW91bnRUaXAubGFuZ3VhZ2UgPSB0aGlzLmFtb3VudFRpcC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUkVEUEFLR0UuYW1vdW50bGFiVGlwXCIpO1xuICAgICAgICB0aGlzLmluZm9WYWxpZGl0eVRpcC5sYW5ndWFnZSA9IHRoaXMudmFsaWRpdHlUaXAubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlJFRFBBS0dFLnZhbGlkaXR5bGFiVGlwXCIpO1xuICAgICAgICB0aGlzLmluZm9Db2RlVGlwLmxhbmd1YWdlID0gdGhpcy5jb2RlVGlwLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRURQQUtHRS5jb2RlbGFiVGlwXCIpO1xuXG4gICAgICAgIHRoaXMudHlwZUVkaXRCb3guZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnR5cGVFZGl0Qm94LnN0cmluZyA9IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoXCJSRURQQUtHRS5yYW5kb21UeXBlVGlwXCIpO1xuICAgICAgICB0aGlzLm51bUVkaXRCb3gucGxhY2Vob2xkZXIgPSBNYW5hZ2VyLmdldExhbmd1YWdlKFwiUkVEUEFLR0UubnVtUGxhY2Vob2xkZXJUaXBcIik7XG4gICAgICAgIHRoaXMuYW1vdW50RWRpdEJveC5wbGFjZWhvbGRlciA9IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoXCJSRURQQUtHRS5hbW91bnRQbGFjZWhvbGRlclRpcFwiKTtcbiAgICAgICAgdGhpcy52YWxpZGl0eUVkaXRCb3gucGxhY2Vob2xkZXIgPSBNYW5hZ2VyLmdldExhbmd1YWdlKFwiUkVEUEFLR0UudmFsaWRpdHlQbGFjZWhvbGRlclRpcFwiKTtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5wbGFjZWhvbGRlciA9IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoXCJSRURQQUtHRS5jb2RlUGxhY2Vob2xkZXJUaXBcIik7XG5cbiAgICAgICAgdGhpcy5sYWJBdmVyYWdlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRURQQUtHRS5hdmVyYWdlVHlwZVRpcFwiKTtcbiAgICAgICAgdGhpcy5sYWJSYW5kb20ubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlJFRFBBS0dFLnJhbmRvbVR5cGVUaXBcIik7XG5cbiAgICAgICAgdGhpcy50eXBlUGFuZWwuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5yZWRUeXBlID0gMlxuICAgICAgICB0aGlzLm51bUVkaXRCb3guc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5hbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMudmFsaWRpdHlFZGl0Qm94LnN0cmluZyA9IFwiMjRcIjtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5zdHJpbmcgPSB0aGlzLmdldFJhbmRvbUNvZGUoKVxuXG4gICAgICAgIHRoaXMucmVzZXRSZWRUaXAoKVxuICAgICAgICB0aGlzLmhpZGVJbmZvUGFuZWwoKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXREYXRhKCkge1xuXG4gICAgICAgIHRoaXMubnVtRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy52YWxpZGl0eUVkaXRCb3guc3RyaW5nID0gXCIyNFwiO1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94LnN0cmluZyA9IHRoaXMuZ2V0UmFuZG9tQ29kZSgpXG4gICAgfVxuICAgIHByaXZhdGUgcmVzZXRSZWRUaXAoKSB7XG4gICAgICAgIHRoaXMucmVkSWNvbk51bS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLnJlZEljb25BbW91bnQuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5yZWRJY29uVmFsaWRpdHkuYWN0aXZlID0gZmFsc2VcblxuICAgICAgICB0aGlzLm51bVRpcC5ub2RlLmNvbG9yID0gTGFiQ29sb3Iubm9tYWxcbiAgICAgICAgdGhpcy5hbW91bnRUaXAubm9kZS5jb2xvciA9IExhYkNvbG9yLm5vbWFsXG4gICAgICAgIHRoaXMudmFsaWRpdHlUaXAubm9kZS5jb2xvciA9IExhYkNvbG9yLm5vbWFsXG5cbiAgICAgICAgdGhpcy5tYXhBbW91bnRMYWIubm9kZS5jb2xvciA9IExhYkNvbG9yLm5vbWFsO1xuICAgIH1cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY29uZmlybVwiOiB0aGlzLm9uQ2xpY2tDb25maXJtKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInR5cGVFZGl0Ym94XCI6IHRoaXMuc2hvd1R5cGUoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaW5mb0Nsb3NlXCI6IHRoaXMuaGlkZUluZm9QYW5lbCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpbmZvQ29uZmlybVwiOiB0aGlzLm9uQ2xpY2tJbmZvQ29uZmlybSgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpbmZvQ2FuY2VsXCI6IHRoaXMuaGlkZUluZm9QYW5lbCgpOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IEcuTG9nZ2VyLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0luZm9QYW5lbCgpIHtcbiAgICAgICAgdGhpcy5pbmZvQ29udGVudFBhbmVsLnkgPSAwXG4gICAgICAgIHRoaXMudXBOb2RlLnpJbmRleCA9IDFcbiAgICAgICAgdGhpcy50aXRsZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMuYmdVcC5zdG9wQWxsQWN0aW9ucygpXG4gICAgICAgIHRoaXMuYmdVcC56SW5kZXggPSAwXG4gICAgICAgIHRoaXMuYmdVcC5zY2FsZVkgPSAxXG4gICAgICAgIHRoaXMuaW5mb1BhbmVsLmFjdGl2ZSA9IHRydWVcblxuICAgIH1cbiAgICBwcml2YXRlIGhpZGVJbmZvUGFuZWwoKSB7XG4gICAgICAgIHRoaXMuaW5mb1BhbmVsLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuaW5mb0NvbnRlbnRQYW5lbC55ID0gMFxuICAgICAgICB0aGlzLnRpdGxlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5iZ1VwLnN0b3BBbGxBY3Rpb25zKClcbiAgICAgICAgdGhpcy5iZ1VwLnpJbmRleCA9IDBcbiAgICAgICAgdGhpcy5iZ1VwLnNjYWxlWSA9IDFcbiAgICAgICAgdGhpcy5faXNzZW5kID0gZmFsc2U7XG4gICAgfVxuICAgIHByaXZhdGUgc2hvd1R5cGUoKSB7XG4gICAgICAgIHRoaXMudHlwZVBhbmVsLmFjdGl2ZSA9ICF0aGlzLnR5cGVQYW5lbC5hY3RpdmUgPyB0cnVlIDogZmFsc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTnVtRWRpdGJveEVuZChlZGl0Ym94LCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWRpdGJveC5zdHJpbmc7XG5cbiAgICAgICAgaWYgKGlucHV0ICYmIGlucHV0ICE9IHBhcnNlSW50KGlucHV0KSkge1xuICAgICAgICAgICAgaW5wdXQgPSBwYXJzZUludChpbnB1dClcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyc2VJbnQoaW5wdXQpIDwgTlVNX01JTikge1xuICAgICAgICAgICAgZWRpdGJveC5zdHJpbmcgPSBOVU1fTUlOXG4gICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoaW5wdXQpID4gTlVNX01BWCkge1xuICAgICAgICAgICAgZWRpdGJveC5zdHJpbmcgPSBOVU1fTUFYXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZGl0Ym94LnN0cmluZyA9IGlucHV0XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChwYXJzZUludChlZGl0Ym94LnN0cmluZykgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm51bVRpcC5ub2RlLmNvbG9yID0gTGFiQ29sb3Iubm9tYWw7XG4gICAgICAgICAgICB0aGlzLnJlZEljb25OdW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkFtb3VudEVkaXRib3hFbmQoZWRpdGJveCwgY3VzdG9tRXZlbnREYXRhKSB7XG4gICAgICAgIGxldCBpbnB1dCA9IGVkaXRib3guc3RyaW5nO1xuXG4gICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dCAhPSBwYXJzZUludChpbnB1dCkpIHtcbiAgICAgICAgICAgIGlucHV0ID0gcGFyc2VJbnQoaW5wdXQpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHVNYXggPSBVc2VyLl9nb2xkIC8gMTAwMDBcbiAgICAgICAgbGV0IG1heCA9IHBhcnNlSW50KHVNYXgudG9TdHJpbmcoKSlcbiAgICAgICAgaWYgKHBhcnNlSW50KGlucHV0KSA8IE5VTV9NSU4pIHtcbiAgICAgICAgICAgIGlmICh1TWF4IDwgTlVNX01JTikge1xuICAgICAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gMFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlZGl0Ym94LnN0cmluZyA9IE5VTV9NSU5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChpbnB1dCkgPiBtYXgpIHtcbiAgICAgICAgICAgIGlmIChtYXggPj0gTlVNX01JTikge1xuICAgICAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gbWF4XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWRpdGJveC5zdHJpbmcgPSAwXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gaW5wdXRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZUludChlZGl0Ym94LnN0cmluZykgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmFtb3VudFRpcC5ub2RlLmNvbG9yID0gTGFiQ29sb3Iubm9tYWw7XG4gICAgICAgICAgICB0aGlzLnJlZEljb25BbW91bnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VJbnQoZWRpdGJveC5zdHJpbmcpID4gdGhpcy5fbWF4QW1vdW50KSB7XG4gICAgICAgICAgICB0aGlzLm1heEFtb3VudExhYi5ub2RlLmNvbG9yID0gTGFiQ29sb3IucmVkO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubWF4QW1vdW50TGFiLm5vZGUuY29sb3IgPSBMYWJDb2xvci5ub21hbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25WYWxpZGl0RWRpdGJveEVuZChlZGl0Ym94LCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWRpdGJveC5zdHJpbmc7XG5cbiAgICAgICAgaWYgKGlucHV0ICYmIGlucHV0ICE9IHBhcnNlSW50KGlucHV0KSkge1xuICAgICAgICAgICAgaW5wdXQgPSBwYXJzZUludChpbnB1dClcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyc2VJbnQoaW5wdXQpIDwgTlVNX01JTikge1xuICAgICAgICAgICAgZWRpdGJveC5zdHJpbmcgPSBOVU1fTUlOXG4gICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoaW5wdXQpID4gVkFMSV9NQVgpIHtcbiAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gVkFMSV9NQVhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gaW5wdXRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZUludChlZGl0Ym94LnN0cmluZykgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkaXR5VGlwLm5vZGUuY29sb3IgPSBMYWJDb2xvci5ub21hbDtcbiAgICAgICAgICAgIHRoaXMucmVkSWNvblZhbGlkaXR5LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgb25Db2RlRWRpdGJveEVuZChlZGl0Ym94LCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWRpdGJveC5zdHJpbmc7XG5cblxuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgZWRpdGJveC5zdHJpbmcgPSBcIlwiXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5wdXQgIT0gcGFyc2VJbnQoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBwYXJzZUludChpbnB1dClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVkaXRib3guc3RyaW5nID0gaW5wdXRcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmRvbUNvZGUoKSB7XG4gICAgICAgIGxldCBjb2RlID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICBjb2RlICs9IG51bTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvZGVcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNsaWNrTnVtU3ViKCkge1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUylcbiAgICAgICAgaWYgKHRoaXMubnVtRWRpdEJveC5zdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHBhcnNlSW50KHRoaXMubnVtRWRpdEJveC5zdHJpbmcpXG4gICAgICAgICAgICBpbnB1dC0tXG4gICAgICAgICAgICB0aGlzLm51bUVkaXRCb3guc3RyaW5nID0gaW5wdXQudG9TdHJpbmcoKVxuICAgICAgICAgICAgdGhpcy5vbk51bUVkaXRib3hFbmQodGhpcy5udW1FZGl0Qm94LCBcIlwiKVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNsaWNrTnVtQWRkKCkge1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUylcbiAgICAgICAgaWYgKHRoaXMubnVtRWRpdEJveC5zdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHBhcnNlSW50KHRoaXMubnVtRWRpdEJveC5zdHJpbmcpXG4gICAgICAgICAgICBpbnB1dCsrXG4gICAgICAgICAgICB0aGlzLm51bUVkaXRCb3guc3RyaW5nID0gaW5wdXQudG9TdHJpbmcoKVxuICAgICAgICAgICAgdGhpcy5vbk51bUVkaXRib3hFbmQodGhpcy5udW1FZGl0Qm94LCBcIlwiKVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNsaWNrVmFsaWRpdEFkZCgpIHtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5RWZmZWN0KFwiY29tbW9uL2F1ZGlvL2NsaWNrXCIsIEJVTkRMRV9SRVNPVVJDRVMpXG4gICAgICAgIGlmICh0aGlzLnZhbGlkaXR5RWRpdEJveC5zdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHBhcnNlSW50KHRoaXMudmFsaWRpdHlFZGl0Qm94LnN0cmluZylcbiAgICAgICAgICAgIGlucHV0KytcbiAgICAgICAgICAgIHRoaXMudmFsaWRpdHlFZGl0Qm94LnN0cmluZyA9IGlucHV0LnRvU3RyaW5nKClcbiAgICAgICAgICAgIHRoaXMub25WYWxpZGl0RWRpdGJveEVuZCh0aGlzLnZhbGlkaXR5RWRpdEJveCwgXCJcIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9uQ2xpY2tWYWxpZGl0U3ViKCkge1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUylcbiAgICAgICAgaWYgKHRoaXMudmFsaWRpdHlFZGl0Qm94LnN0cmluZykge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gcGFyc2VJbnQodGhpcy52YWxpZGl0eUVkaXRCb3guc3RyaW5nKVxuICAgICAgICAgICAgaW5wdXQtLVxuICAgICAgICAgICAgdGhpcy52YWxpZGl0eUVkaXRCb3guc3RyaW5nID0gaW5wdXQudG9TdHJpbmcoKVxuICAgICAgICAgICAgdGhpcy5vblZhbGlkaXRFZGl0Ym94RW5kKHRoaXMudmFsaWRpdHlFZGl0Qm94LCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrUmFuZG9tVHlwZSgpIHtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5RWZmZWN0KFwiY29tbW9uL2F1ZGlvL2NsaWNrXCIsIEJVTkRMRV9SRVNPVVJDRVMpXG4gICAgICAgIHRoaXMuc2hvd1R5cGUoKVxuICAgICAgICB0aGlzLnR5cGVFZGl0Qm94LnN0cmluZyA9IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoXCJSRURQQUtHRS5yYW5kb21UeXBlVGlwXCIpO1xuICAgICAgICB0aGlzLnJlZFR5cGUgPSAyOy8vIOe6ouWMheexu+WeiyAx5bmz5Z2H57qi5YyFIDLpmo/mnLrnuqLljIVcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tBdmVyYWdlVHlwZSgpIHtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5RWZmZWN0KFwiY29tbW9uL2F1ZGlvL2NsaWNrXCIsIEJVTkRMRV9SRVNPVVJDRVMpXG4gICAgICAgIHRoaXMuc2hvd1R5cGUoKVxuICAgICAgICB0aGlzLnR5cGVFZGl0Qm94LnN0cmluZyA9IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoXCJSRURQQUtHRS5hdmVyYWdlVHlwZVRpcFwiKTtcbiAgICAgICAgdGhpcy5yZWRUeXBlID0gMTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNsaWNrQ29uZmlybSgpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtRWRpdEJveC5zdHJpbmcgPT0gXCJcIikge1xuICAgICAgICAgICAgLy8gUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5SRURQQUtHRS5pbnB1dE51bSlcbiAgICAgICAgICAgIHRoaXMubnVtVGlwLm5vZGUuY29sb3IgPSBMYWJDb2xvci5yZWQ7XG4gICAgICAgICAgICB0aGlzLnJlZEljb25OdW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFtb3VudEVkaXRCb3guc3RyaW5nID09IFwiXCIgfHwgcGFyc2VJbnQodGhpcy5hbW91bnRFZGl0Qm94LnN0cmluZykgPT0gMCB8fCBwYXJzZUludCh0aGlzLmFtb3VudEVkaXRCb3guc3RyaW5nKSA+IHRoaXMuX21heEFtb3VudCkge1xuICAgICAgXG4gICAgICAgICAgICAvLyBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFRFBBS0dFLmlucHV0QW1vdW50KVxuICAgICAgICAgICAgdGhpcy5hbW91bnRUaXAubm9kZS5jb2xvciA9IExhYkNvbG9yLnJlZDtcbiAgICAgICAgICAgIHRoaXMucmVkSWNvbkFtb3VudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsaWRpdHlFZGl0Qm94LnN0cmluZyA9PSBcIlwiKSB7XG4gICAgICAgICAgICAvLyBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFRFBBS0dFLmlucHV0VmFsaWRpdHkpXG4gICAgICAgICAgICB0aGlzLnZhbGlkaXR5VGlwLm5vZGUuY29sb3IgPSBMYWJDb2xvci5yZWQ7XG4gICAgICAgICAgICB0aGlzLnJlZEljb25WYWxpZGl0eS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmZvVHlwZUxhYi5zdHJpbmcgPSB0aGlzLnR5cGVFZGl0Qm94LnN0cmluZ1xuICAgICAgICB0aGlzLmluZm9OdW1MYWIuc3RyaW5nID0gdGhpcy5udW1FZGl0Qm94LnN0cmluZ1xuICAgICAgICB0aGlzLmluZm9BbW91bnRMYWIuc3RyaW5nID0gdGhpcy5hbW91bnRFZGl0Qm94LnN0cmluZ1xuICAgICAgICB0aGlzLmluZm9WYWxpZGl0eUxhYi5zdHJpbmcgPSB0aGlzLnZhbGlkaXR5RWRpdEJveC5zdHJpbmdcbiAgICAgICAgdGhpcy5pbmZvQ29kZUxhYi5zdHJpbmcgPSB0aGlzLmNvZGVFZGl0Qm94LnN0cmluZyB8fCBcIi1cIlxuXG4gICAgICAgIHRoaXMuc2hvd0luZm9QYW5lbCgpXG4gICAgfVxuICAgIHByaXZhdGUgb25DbGlja0luZm9Db25maXJtKCkge1xuICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5hbW91bnRFZGl0Qm94LnN0cmluZykgPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FUlJPUkNPREVbMjQzXSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc3NlbmQpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzc2VuZCA9IHRydWVcbiAgICAgICAgdGhpcy5yZXFTZW5kUmVkUGFrZ2UoKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVxU2VuZFJlZFBha2dlKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHRoaXMucmVkVHlwZSxcbiAgICAgICAgICAgIG51bWJlcjogcGFyc2VJbnQodGhpcy5udW1FZGl0Qm94LnN0cmluZyksXG4gICAgICAgICAgICB0b3RhbEFtb3VudDogcGFyc2VJbnQodGhpcy5hbW91bnRFZGl0Qm94LnN0cmluZykgKiAxMDAwMCxcbiAgICAgICAgICAgIHZhbGlkaXR5OiBwYXJzZUludCh0aGlzLnZhbGlkaXR5RWRpdEJveC5zdHJpbmcpLFxuICAgICAgICAgICAgcmVjZWl2ZUNvZGU6IHRoaXMuY29kZUVkaXRCb3guc3RyaW5nIHx8IFwiXCIsXG5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuU2VuZFJlZFBhY2tldFJlcS5jcmVhdGUoZGF0YSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5TZW5kUmVkUGFja2V0UmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfU2VuZFJlZFBhY2tldCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=