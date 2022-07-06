"use strict";
cc._RF.push(module, 'a954655BgxCw4IwFZ2wjKJv', 'RedPakgeRecordDetail');
// script/redPakge/RedPakgeRecordDetail.ts

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
const ScroViewLogic_1 = __importDefault(require("../common/component/ScroViewLogic"));
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeRecordDetail = class RedPakgeRecordDetail extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scroViewLogic = null;
        this.numRichText = null;
        this.amountRichText = null;
        this.noTipNode = null;
        this.recordsNode = null;
        this.closeBtn = null;
        this.data = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketDetails), this.refreshList);
    }
    onEnable() {
        let req = CommonService_1.protoPackage.hall.RedPacketDetailsReq.create({ id: this.data.id, currentPage: 1 });
        let buffer = CommonService_1.protoPackage.hall.RedPacketDetailsReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketDetails, buffer);
        this.recordsNode.active = false;
        this.closeBtn.active = false;
    }
    onDisable() {
        this.closeBtn.active = true;
    }
    init(data) {
        this.data = data;
    }
    refreshList(msg) {
        // G.Logger.log(msg);
        if (msg && msg.statusMsg.status == 0) {
            if (msg.redPacket) {
                this.numRichText.string = "<color=#cc0202>" + msg.redPacket.receivedNumber + "</c><color=#805326>/" + msg.redPacket.number + "</color>";
                this.amountRichText.string = "<color=#cc0202>" + "₹" + UtilMgr_1.UtilMgr.changeMoney(msg.redPacket.receivedAmount) + "</c><color=#805326>/" + "₹" + UtilMgr_1.UtilMgr.changeMoney(msg.redPacket.totalAmount) + "</color>";
                this.scroViewLogic.resetData();
                if (msg.redPacketReceiveRecord.length > 0) {
                    this.noTipNode.active = false;
                    this.scroViewLogic.initUI(msg.redPacketReceiveRecord);
                }
                else {
                    this.noTipNode.active = true;
                }
            }
            else {
                this.noTipNode.active = true;
            }
        }
    }
    onClick(name) {
        switch (name) {
            case "detailClose":
                this.node.active = false;
                this.recordsNode.active = true;
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
};
__decorate([
    property(ScroViewLogic_1.default)
], RedPakgeRecordDetail.prototype, "scroViewLogic", void 0);
__decorate([
    property(cc.RichText)
], RedPakgeRecordDetail.prototype, "numRichText", void 0);
__decorate([
    property(cc.RichText)
], RedPakgeRecordDetail.prototype, "amountRichText", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetail.prototype, "noTipNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetail.prototype, "recordsNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetail.prototype, "closeBtn", void 0);
RedPakgeRecordDetail = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RedPakgeRecordDetail);
exports.default = RedPakgeRecordDetail;

cc._RF.pop();