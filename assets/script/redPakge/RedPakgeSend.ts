import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import RedPakgeShareView from "./RedPakgeShareView";

const NUM_MAX: number = 100;
const NUM_MIN: number = 1;
const VALI_MAX: number = 200;

const LabColor = {
    nomal: cc.color(198, 117, 49),
    red: cc.color(230, 23, 23)
}

const { ccclass, property } = cc._decorator;


@ccclass
@injectService(LobbyService.instance)
export default class RedPakgeSend extends UIView {


    @property(cc.Label)
    typeTip: cc.Label = null

    @property(cc.Label)
    numTip: cc.Label = null

    @property(cc.Label)
    amountTip: cc.Label = null

    @property(cc.Label)
    validityTip: cc.Label = null

    @property(cc.Label)
    codeTip: cc.Label = null

    @property(cc.Node)
    redIconNum: cc.Node = null
    @property(cc.Node)
    redIconAmount: cc.Node = null
    @property(cc.Node)
    redIconValidity: cc.Node = null

    @property(cc.EditBox)
    typeEditBox: cc.EditBox = null

    @property(cc.EditBox)
    numEditBox: cc.EditBox = null

    @property(cc.EditBox)
    amountEditBox: cc.EditBox = null
    @property(cc.EditBox)
    validityEditBox: cc.EditBox = null

    @property(cc.EditBox)
    codeEditBox: cc.EditBox = null


    @property(cc.Node)
    typePanel: cc.Node = null

    @property(cc.Node)
    infoPanel: cc.Node = null

    @property(cc.Node)
    infoContentPanel: cc.Node = null

    @property(cc.Node)
    bgUp: cc.Node = null

    @property(cc.Node)
    upNode: cc.Node = null

    @property(cc.Node)
    title: cc.Node = null

    @property(cc.Label)
    infoTypeLab: cc.Label = null
    @property(cc.Label)
    infoNumLab: cc.Label = null
    @property(cc.Label)
    infoAmountLab: cc.Label = null
    @property(cc.Label)
    infoValidityLab: cc.Label = null
    @property(cc.Label)
    infoCodeLab: cc.Label = null

    @property(cc.Label)
    infoTypeTip: cc.Label = null

    @property(cc.Label)
    infoNumTip: cc.Label = null

    @property(cc.Label)
    infoAmountTip: cc.Label = null

    @property(cc.Label)
    infoValidityTip: cc.Label = null

    @property(cc.Label)
    infoCodeTip: cc.Label = null

    @property(cc.Label)
    labAverage: cc.Label = null

    @property(cc.Label)
    labRandom: cc.Label = null

    @property(cc.Label)
    maxAmountLab: cc.Label = null


    service: LobbyService;
    redType: number; // 红包类型 1平均红包 2随机红包
    private _issend: boolean = false;

    private _maxAmount = 0;


    onLoad() {
        super.onLoad();
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_SendRedPacket), this.sendCallBack);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_PreSendRedPacket), this.preCallBack);

    }
    private preCallBack(msg){
        if (msg && msg.statusMsg.status == 0) {
            this._maxAmount = Math.floor(msg.maximumAmount/10000) 
            this.maxAmountLab.node.active = true;
            this.maxAmountLab.string = i18n.REDPAKGE.amountlabMaxTip+UtilMgr.changeMoney(this._maxAmount*10000)
        } else {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + msg.statusMsg.status));
        }
    }
    private sendCallBack(msg) {
        if (msg && msg.statusMsg.status == 0) {

            this.resetData()
            this.infoContentPanel.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(0, -200)), cc.delayTime(0.2), cc.callFunc(() => {
                this.hideInfoPanel()
                if (msg.shareUrl) {
                    Manager.uiManager.open({ type: RedPakgeShareView, bundle: BUNDLE_RESOURCES, args: [msg.shareUrl] })
                }
            })))
            this.title.active = false
            this.bgUp.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(() => {
                this.bgUp.zIndex = 2
            }), cc.scaleTo(0.2, 1, -1)))

        } else {
            this._issend = false;
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + msg.statusMsg.status));
        }
    }
    onEnable() {
        this.initUI()
        this.reqPreSendRedPacket()
    }
    private reqPreSendRedPacket(){
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_PreSendRedPacket,
            null);
    }

    private initUI() {
        this.infoTypeTip.language = this.typeTip.language = Manager.makeLanguage("REDPAKGE.typelabTip");
        this.infoNumTip.language = this.numTip.language = Manager.makeLanguage("REDPAKGE.numlabTip");
        this.infoAmountTip.language = this.amountTip.language = Manager.makeLanguage("REDPAKGE.amountlabTip");
        this.infoValidityTip.language = this.validityTip.language = Manager.makeLanguage("REDPAKGE.validitylabTip");
        this.infoCodeTip.language = this.codeTip.language = Manager.makeLanguage("REDPAKGE.codelabTip");

        this.typeEditBox.enabled = false;
        this.typeEditBox.string = Manager.getLanguage("REDPAKGE.randomTypeTip");
        this.numEditBox.placeholder = Manager.getLanguage("REDPAKGE.numPlaceholderTip");
        this.amountEditBox.placeholder = Manager.getLanguage("REDPAKGE.amountPlaceholderTip");
        this.validityEditBox.placeholder = Manager.getLanguage("REDPAKGE.validityPlaceholderTip");
        this.codeEditBox.placeholder = Manager.getLanguage("REDPAKGE.codePlaceholderTip");

        this.labAverage.language = Manager.makeLanguage("REDPAKGE.averageTypeTip");
        this.labRandom.language = Manager.makeLanguage("REDPAKGE.randomTypeTip");

        this.typePanel.active = false
        this.redType = 2
        this.numEditBox.string = "";
        this.amountEditBox.string = "";
        this.validityEditBox.string = "24";
        this.codeEditBox.string = this.getRandomCode()

        this.resetRedTip()
        this.hideInfoPanel()
    }

    private resetData() {

        this.numEditBox.string = "";
        this.amountEditBox.string = "";
        this.validityEditBox.string = "24";
        this.codeEditBox.string = this.getRandomCode()
    }
    private resetRedTip() {
        this.redIconNum.active = false
        this.redIconAmount.active = false
        this.redIconValidity.active = false

        this.numTip.node.color = LabColor.nomal
        this.amountTip.node.color = LabColor.nomal
        this.validityTip.node.color = LabColor.nomal

        this.maxAmountLab.node.color = LabColor.nomal;
    }
    onClick(name, node) {
        switch (name) {
            case "confirm": this.onClickConfirm(); break;
            case "typeEditbox": this.showType(); break;
            case "infoClose": this.hideInfoPanel(); break;
            case "infoConfirm": this.onClickInfoConfirm(); break;
            case "infoCancel": this.hideInfoPanel(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    private showInfoPanel() {
        this.infoContentPanel.y = 0
        this.upNode.zIndex = 1
        this.title.active = true
        this.bgUp.stopAllActions()
        this.bgUp.zIndex = 0
        this.bgUp.scaleY = 1
        this.infoPanel.active = true

    }
    private hideInfoPanel() {
        this.infoPanel.active = false
        this.infoContentPanel.y = 0
        this.title.active = true
        this.bgUp.stopAllActions()
        this.bgUp.zIndex = 0
        this.bgUp.scaleY = 1
        this._issend = false;
    }
    private showType() {
        this.typePanel.active = !this.typePanel.active ? true : false
    }

    private onNumEditboxEnd(editbox, customEventData) {
        let input = editbox.string;

        if (input && input != parseInt(input)) {
            input = parseInt(input)
        }
        if (parseInt(input) < NUM_MIN) {
            editbox.string = NUM_MIN
        } else if (parseInt(input) > NUM_MAX) {
            editbox.string = NUM_MAX
        } else {
            editbox.string = input
        }


        if (parseInt(editbox.string) > 0) {
            this.numTip.node.color = LabColor.nomal;
            this.redIconNum.active = false;
        }
    }
    private onAmountEditboxEnd(editbox, customEventData) {
        let input = editbox.string;

        if (input && input != parseInt(input)) {
            input = parseInt(input)
        }
        let uMax = User._gold / 10000
        let max = parseInt(uMax.toString())
        if (parseInt(input) < NUM_MIN) {
            if (uMax < NUM_MIN) {
                editbox.string = 0
            } else {
                editbox.string = NUM_MIN
            }
        } else if (parseInt(input) > max) {
            if (max >= NUM_MIN) {
                editbox.string = max

            } else {
                editbox.string = 0

            }
        } else {
            editbox.string = input
        }

        if (parseInt(editbox.string) > 0) {
            this.amountTip.node.color = LabColor.nomal;
            this.redIconAmount.active = false;
        }

        if (parseInt(editbox.string) > this._maxAmount) {
            this.maxAmountLab.node.color = LabColor.red;
        }else{
            this.maxAmountLab.node.color = LabColor.nomal;
        }
    }

    private onValiditEditboxEnd(editbox, customEventData) {
        let input = editbox.string;

        if (input && input != parseInt(input)) {
            input = parseInt(input)
        }
        if (parseInt(input) < NUM_MIN) {
            editbox.string = NUM_MIN
        } else if (parseInt(input) > VALI_MAX) {
            editbox.string = VALI_MAX
        } else {
            editbox.string = input
        }

        if (parseInt(editbox.string) > 0) {
            this.validityTip.node.color = LabColor.nomal;
            this.redIconValidity.active = false;
        }
    }
    private onCodeEditboxEnd(editbox, customEventData) {
        let input = editbox.string;


        if (input) {
            if (input.length < 6) {
                editbox.string = ""
                return
            }
            if (input != parseInt(input)) {
                input = parseInt(input)
            }

        }
        editbox.string = input
    }

    private getRandomCode() {
        let code = "";
        for (var i = 1; i <= 6; i++) {
            const num = Math.floor(Math.random() * 10);
            code += num;

        }

        return code
    }
    private onClickNumSub() {
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES)
        if (this.numEditBox.string) {
            let input = parseInt(this.numEditBox.string)
            input--
            this.numEditBox.string = input.toString()
            this.onNumEditboxEnd(this.numEditBox, "")
        }

    }
    private onClickNumAdd() {
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES)
        if (this.numEditBox.string) {
            let input = parseInt(this.numEditBox.string)
            input++
            this.numEditBox.string = input.toString()
            this.onNumEditboxEnd(this.numEditBox, "")
        }

    }
    private onClickValiditAdd() {
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES)
        if (this.validityEditBox.string) {
            let input = parseInt(this.validityEditBox.string)
            input++
            this.validityEditBox.string = input.toString()
            this.onValiditEditboxEnd(this.validityEditBox, "")
        }
    }
    private onClickValiditSub() {
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES)
        if (this.validityEditBox.string) {
            let input = parseInt(this.validityEditBox.string)
            input--
            this.validityEditBox.string = input.toString()
            this.onValiditEditboxEnd(this.validityEditBox, "")
        }
    }

    private onClickRandomType() {
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES)
        this.showType()
        this.typeEditBox.string = Manager.getLanguage("REDPAKGE.randomTypeTip");
        this.redType = 2;// 红包类型 1平均红包 2随机红包
    }

    private onClickAverageType() {
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES)
        this.showType()
        this.typeEditBox.string = Manager.getLanguage("REDPAKGE.averageTypeTip");
        this.redType = 1;
    }
    private onClickConfirm() {
        if (this.numEditBox.string == "") {
            // PanelHelp.showTip(i18n.REDPAKGE.inputNum)
            this.numTip.node.color = LabColor.red;
            this.redIconNum.active = true;
            return
        }
        if (this.amountEditBox.string == "" || parseInt(this.amountEditBox.string) == 0 || parseInt(this.amountEditBox.string) > this._maxAmount) {
      
            // PanelHelp.showTip(i18n.REDPAKGE.inputAmount)
            this.amountTip.node.color = LabColor.red;
            this.redIconAmount.active = true;
            return
        }
        if (this.validityEditBox.string == "") {
            // PanelHelp.showTip(i18n.REDPAKGE.inputValidity)
            this.validityTip.node.color = LabColor.red;
            this.redIconValidity.active = true;
            return
        }
        this.infoTypeLab.string = this.typeEditBox.string
        this.infoNumLab.string = this.numEditBox.string
        this.infoAmountLab.string = this.amountEditBox.string
        this.infoValidityLab.string = this.validityEditBox.string
        this.infoCodeLab.string = this.codeEditBox.string || "-"

        this.showInfoPanel()
    }
    private onClickInfoConfirm() {
        if (parseInt(this.amountEditBox.string) == 0) {
            PanelHelp.showTip(i18n.ERRORCODE[243])
            return
        }
        if (this._issend) {
            return
        }
        this._issend = true
        this.reqSendRedPakge()
    }

    private reqSendRedPakge() {
        let data = {
            type: this.redType,
            number: parseInt(this.numEditBox.string),
            totalAmount: parseInt(this.amountEditBox.string) * 10000,
            validity: parseInt(this.validityEditBox.string),
            receiveCode: this.codeEditBox.string || "",

        }
        let req = protoPackage.hall.SendRedPacketReq.create(data);
        let buffer = protoPackage.hall.SendRedPacketReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_SendRedPacket,
            buffer);
    }
    // update (dt) {}
}
