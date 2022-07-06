"use strict";
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