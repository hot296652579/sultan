"use strict";
cc._RF.push(module, '4de4cMxpsBDIplju7i+QCdq', 'RedPakgeRecord');
// script/redPakge/RedPakgeRecord.ts

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
const RedPakgeRecordDetail_1 = __importDefault(require("./RedPakgeRecordDetail"));
const { ccclass, property } = cc._decorator;
let RedPakgeRecord = class RedPakgeRecord extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noTipNode = null;
        this.listNode = null;
        this.eedPakgeRecordDetail = null;
        this.scroViewLogic = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketSendRecord), this.refreshList);
        this.registerEvent("showRedPakgeRecordDetail", this.showDetail);
    }
    onEnable() {
        this.initUI();
        let req = CommonService_1.protoPackage.hall.RedPacketSendRecordReq.create({ currentPage: 1 });
        let buffer = CommonService_1.protoPackage.hall.RedPacketSendRecordReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketSendRecord, buffer);
    }
    initUI() {
        this.eedPakgeRecordDetail.node.active = false;
        this.listNode.active = false;
        this.noTipNode.active = true;
    }
    refreshList(msg) {
        G.Logger.log(msg);
        if (msg && msg.statusMsg.status == 0) {
            if (msg.redPacket && msg.redPacket.length > 0) {
                this.listNode.active = true;
                this.noTipNode.active = false;
                this.scroViewLogic.initUI(msg.redPacket);
            }
        }
    }
    showDetail(data) {
        this.eedPakgeRecordDetail.init(data);
        this.eedPakgeRecordDetail.node.active = true;
    }
};
__decorate([
    property(cc.Node)
], RedPakgeRecord.prototype, "noTipNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecord.prototype, "listNode", void 0);
__decorate([
    property(RedPakgeRecordDetail_1.default)
], RedPakgeRecord.prototype, "eedPakgeRecordDetail", void 0);
__decorate([
    property(ScroViewLogic_1.default)
], RedPakgeRecord.prototype, "scroViewLogic", void 0);
RedPakgeRecord = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RedPakgeRecord);
exports.default = RedPakgeRecord;

cc._RF.pop();