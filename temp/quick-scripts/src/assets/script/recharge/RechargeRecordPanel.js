"use strict";
cc._RF.push(module, 'a44caWV81dKyYHrUYwE9vAD', 'RechargeRecordPanel');
// script/recharge/RechargeRecordPanel.ts

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
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const CommonService_1 = require("../common/net/CommonService");
const Manager_1 = require("../common/manager/Manager");
const { ccclass, property } = cc._decorator;
let RechargeRecordPanel = class RechargeRecordPanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noRecord = null;
        this.labTime = null;
        this.labCommodity = null;
        this.labAmount = null;
        this.labState = null;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_ProductOrder), (res) => {
            this.noRecord.active = res.productOrder.length == 0;
            this.rankView(res.productOrder);
        });
    }
    onLoad() {
        super.onLoad();
    }
    start() {
        this.labTime.language = Manager_1.Manager.makeLanguage("RECHARGE.Time");
        this.labCommodity.language = Manager_1.Manager.makeLanguage("RECHARGE.Commodity");
        this.labAmount.language = Manager_1.Manager.makeLanguage("RECHARGE.Amount");
        this.labState.language = Manager_1.Manager.makeLanguage("RECHARGE.State");
    }
    onEnable() {
        this.requestRecordList();
    }
    requestRecordList() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_ProductOrder, null);
    }
    rankView(rankingList) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = rankingList;
            yield scroViewCtrlCom.framingLoad(rankingList.length, true);
        });
    }
};
__decorate([
    property(cc.Node)
], RechargeRecordPanel.prototype, "noRecord", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labTime", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labCommodity", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labAmount", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labState", void 0);
RechargeRecordPanel = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RechargeRecordPanel);
exports.default = RechargeRecordPanel;

cc._RF.pop();