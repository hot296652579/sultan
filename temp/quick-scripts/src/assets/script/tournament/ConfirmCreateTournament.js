"use strict";
cc._RF.push(module, '4afeeWYetZPmIY5xxh5E4D9', 'ConfirmCreateTournament');
// script/tournament/ConfirmCreateTournament.ts

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
const Config_1 = require("../common/config/Config");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const TournamentData_1 = __importDefault(require("./TournamentData"));
const { ccclass, property } = cc._decorator;
let ConfirmCreateTournament = class ConfirmCreateTournament extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.gameName = null;
        this.password = null;
        this.people = null;
        this.bonusSource = null;
        this.jackPot = null;
        this.rewards = [];
        this.confirmNode = null;
        this.createGold = null;
    }
    static getPrefabUrl() {
        return "tournament/prefabs/ConfirmCreateTournament";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    start() {
        this.updateView();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.data = args[0];
        }
        console.log("create room info", this.data);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CreateTournament), this.onNetCreateTournament);
    }
    onClick(name, node) {
        switch (name) {
            case "returnBtn":
            case "close":
                this.closeWithAction();
                break;
            case "confirmBtn":
                this.reqCreateTournament();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqCreateTournament() {
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOGIN);
        let req = CommonService_1.protoPackage.hall.CreateTournamentReq.create(this.data);
        let buffer = CommonService_1.protoPackage.hall.CreateTournamentReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CreateTournament, buffer);
    }
    onNetCreateTournament(data) {
        if (data.statusMsg.status == 0) {
            this.closeWithAction();
            dispatch("close_createTournamentView");
            TournamentData_1.default.getInstance().flushItmeID = data.tournamentId;
            dispatch("UpdateTournamentList");
            this.reqTournamentDetail(data.tournamentId);
        }
        else {
            if (data.statusMsg.status == 251) {
                PanelHelp_1.default.showMsgBox("", LanguageImpl_1.i18n.FRIENDROOM.ToRecharge, () => {
                    dispatch("openRechargeView");
                }, "btn_Recharge");
            }
            else {
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
            }
        }
        PanelHelp_1.default.hideLoading();
    }
    reqTournamentDetail(tournamentId) {
        let jsonData = {
            tournamentId: tournamentId,
        };
        let req = CommonService_1.protoPackage.hall.TournamentDetailReq.create(jsonData);
        let buffer = CommonService_1.protoPackage.hall.TournamentDetailReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentDetail, buffer);
    }
    updateView() {
        this.gameName.string = Config_1.Config.games[this.data.gameId].disName;
        this.password.string = this.data.password.length == 0 ? "No Password" : this.data.password;
        this.people.string = this.data.numberOfParticipants + "-people";
        this.bonusSource.string = this.data.bonusSource == 0 ? "Pay by myself" : "Pay by participant";
        if (this.data.bonusSource == 0) {
            this.jackPot.string = UtilMgr_1.UtilMgr.changeMoney((this.data.createFee * (100 - TournamentData_1.default.getInstance().serviceFee) * 0.01), false);
        }
        else {
            this.jackPot.string = UtilMgr_1.UtilMgr.changeMoney((this.data.joinFee * (100 - TournamentData_1.default.getInstance().serviceFee) * this.data.numberOfParticipants * 0.01), false);
        }
        this.createGold.string = UtilMgr_1.UtilMgr.changeMoney(this.data.createFee);
        let rewards = this.data.rewardPercent.split(',');
        this.rewards.forEach((rewardLab, index) => {
            if (rewards[index]) {
                rewardLab.string = UtilMgr_1.UtilMgr.changeMoney(+this.jackPot.string * rewards[index] * 0.01 * 10000, false);
            }
            rewardLab.node.parent.active = index < rewards.length;
        });
        this.createGold.node.parent.active = this.data.bonusSource == 0;
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Label)
], ConfirmCreateTournament.prototype, "gameName", void 0);
__decorate([
    property(cc.Label)
], ConfirmCreateTournament.prototype, "password", void 0);
__decorate([
    property(cc.Label)
], ConfirmCreateTournament.prototype, "people", void 0);
__decorate([
    property(cc.Label)
], ConfirmCreateTournament.prototype, "bonusSource", void 0);
__decorate([
    property(cc.Label)
], ConfirmCreateTournament.prototype, "jackPot", void 0);
__decorate([
    property(cc.Label)
], ConfirmCreateTournament.prototype, "rewards", void 0);
__decorate([
    property(cc.Node)
], ConfirmCreateTournament.prototype, "confirmNode", void 0);
__decorate([
    property(cc.Label)
], ConfirmCreateTournament.prototype, "createGold", void 0);
ConfirmCreateTournament = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], ConfirmCreateTournament);
exports.default = ConfirmCreateTournament;

cc._RF.pop();