"use strict";
cc._RF.push(module, 'db2faLDLpZAkYwNkuo4Q/St', 'MyTournamentItem');
// script/tournament/MyTournamentItem.ts

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
const ScroViewBaseItem_1 = __importDefault(require("../common/component/ScroViewBaseItem"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UtilMgr_1 = require("../global/UtilMgr");
const TournamentData_1 = __importDefault(require("./TournamentData"));
const { ccclass, property } = cc._decorator;
let MyTournamentItem = class MyTournamentItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.creator = null;
        this.people = null;
        this.mode = null;
        this.signUpFee = null;
        this.championReward = null;
        this.time = null;
        this.startState = null;
        this.detailNode = null;
    }
    onLoad() {
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        this.creator.string = UtilMgr_1.UtilMgr.setString(data.nickname);
        this.people.string = data.totalNum + "";
        this.mode.string = data.type == 0 ? "SNG" : "MTT";
        this.signUpFee.string = UtilMgr_1.UtilMgr.changeMoney(data.signUpFee);
        this.championReward.string = UtilMgr_1.UtilMgr.changeMoney(data.championReward);
        switch (data.tournamentStatus) { //比赛状态  0比赛可报名 1报名结束等待游戏开始 2游戏已开始 3游戏已结束 4游戏已取消 5流局
            case 0:
            case 1:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager_1.Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = LanguageImpl_1.i18n.Tournament.MyTournamentTip1;
                this.startState.node.color = new cc.Color().fromHEX('#01e922');
                this.detailNode.active = true;
                this.detailNode.getChildByName("huang").active = false;
                break;
            case 2:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager_1.Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = LanguageImpl_1.i18n.Tournament.MyTournamentTip2;
                this.startState.node.color = new cc.Color().fromHEX('#c13958');
                this.detailNode.active = false;
                break;
            case 3:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager_1.Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = LanguageImpl_1.i18n.Tournament.MyTournamentTip3;
                this.startState.node.color = new cc.Color().fromHEX('#ff000c');
                this.detailNode.active = true;
                this.detailNode.getChildByName("huang").active = true;
                break;
            case 4:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager_1.Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = LanguageImpl_1.i18n.Tournament.MyTournamentTip4;
                this.startState.node.color = new cc.Color().fromHEX('#ff000c');
                this.detailNode.active = false;
                break;
            case 5:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager_1.Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = LanguageImpl_1.i18n.Tournament.MyTournamentTip5;
                this.startState.node.color = new cc.Color().fromHEX('#ff000c');
                this.detailNode.active = false;
                break;
            default:
                break;
        }
        if (data.giveUp) {
            this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager_1.Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
            this.startState.string = LanguageImpl_1.i18n.Tournament.MyTournamentTip6;
            this.startState.node.color = new cc.Color().fromHEX('#bb9fa6');
            this.detailNode.active = false;
        }
    }
    onClick(event) {
        let name = event.target.name;
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        switch (name) {
            case "detailBtn":
                TournamentData_1.default.getInstance().tournamentStatus = this._data.tournamentStatus;
                this.reqTournamentDetail();
                break;
            default:
                break;
        }
    }
    reqTournamentDetail() {
        let jsonData = {
            tournamentId: this._data.tournamentId,
        };
        let req = CommonService_1.protoPackage.hall.TournamentDetailReq.create(jsonData);
        let buffer = CommonService_1.protoPackage.hall.TournamentDetailReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentDetail, buffer);
    }
};
__decorate([
    property(cc.Label)
], MyTournamentItem.prototype, "creator", void 0);
__decorate([
    property(cc.Label)
], MyTournamentItem.prototype, "people", void 0);
__decorate([
    property(cc.Label)
], MyTournamentItem.prototype, "mode", void 0);
__decorate([
    property(cc.Label)
], MyTournamentItem.prototype, "signUpFee", void 0);
__decorate([
    property(cc.Label)
], MyTournamentItem.prototype, "championReward", void 0);
__decorate([
    property(cc.Label)
], MyTournamentItem.prototype, "time", void 0);
__decorate([
    property(cc.Label)
], MyTournamentItem.prototype, "startState", void 0);
__decorate([
    property(cc.Node)
], MyTournamentItem.prototype, "detailNode", void 0);
MyTournamentItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], MyTournamentItem);
exports.default = MyTournamentItem;

cc._RF.pop();