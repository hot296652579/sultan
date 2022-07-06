"use strict";
cc._RF.push(module, '26d7342Wk1K7bf58pS8KQAs', 'TournamentRoomView');
// script/tournament/TournamentRoomView.ts

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
const Config_1 = require("../common/config/Config");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const Framework_1 = require("../framework/Framework");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const CreateTournamentView_1 = __importDefault(require("./CreateTournamentView"));
const MyTournamentView_1 = __importDefault(require("./MyTournamentView"));
const TournamentData_1 = __importDefault(require("./TournamentData"));
const TournamentDetailView_1 = __importDefault(require("./TournamentDetailView"));
const TournamentEndDetailView_1 = __importDefault(require("./TournamentEndDetailView "));
const { ccclass, property } = cc._decorator;
let TournamentRoomView = class TournamentRoomView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.gameEditBox = null;
        this.lb_myTournamentTip = null;
        this.lb_myTournamentStep = null;
        this.lb_createTournamentTip = null;
        this.tournamentList = null;
        this.searchId = null;
    }
    static getPrefabUrl() {
        return "tournament/prefabs/TournamentRoomView";
    }
    onLoad() {
        super.onLoad();
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.reqTournamentList();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentList), this.onNetTournamentList);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentDetail), this.onNetTournamentDetailRes);
        this.registerEvent("UpdateTournamentList", this.reqTournamentList);
    }
    onClick(name, node) {
        switch (name) {
            case 'btnBack':
                // dispatch(LogicEvent.ENTER_HALL);
                this.close();
                break;
            case "createToutnamentBtn":
                Framework_1.Manager.uiManager.open({ type: CreateTournamentView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "myTournamentBtn":
                Framework_1.Manager.uiManager.open({ type: MyTournamentView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "searchTournamentBtn":
                let searchTournamentId = this.gameEditBox.string;
                if (searchTournamentId.length == 0) {
                    this.reqTournamentList();
                    return;
                }
                let tournamentItemData = this.tournamentList.find(item => { return item.tournamentId == +searchTournamentId; });
                if (tournamentItemData) {
                    this.getComponent(ScroViewCtrl_1.default).scroViewPlus.content.removeAllChildren();
                    this.tournamentListView([tournamentItemData]);
                }
                else {
                    PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.NotTournament);
                }
                this.searchId = tournamentItemData ? tournamentItemData.tournamentId : null;
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqTournamentList() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentList, null);
    }
    onNetTournamentList(data) {
        if (data.statusMsg.status == 0) {
            this.tournamentList = data.tournaments;
            this.tournamentListView(this.tournamentList);
            this.updateSelfTournament();
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
        PanelHelp_1.default.hideLoading();
    }
    tournamentListView(tournamentList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.searchId && TournamentData_1.default.getInstance().flushItmeID && this.searchId == TournamentData_1.default.getInstance().flushItmeID) {
                let index = tournamentList.findIndex(item => { return item.tournamentId == TournamentData_1.default.getInstance().flushItmeID; });
                if (index != -1)
                    tournamentList = tournamentList.splice(index, 1);
                TournamentData_1.default.getInstance().flushItmeID = null;
            }
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = tournamentList;
            yield scroViewCtrlCom.framingLoad(tournamentList.length);
            PanelHelp_1.default.hideLoading();
        });
    }
    updateSelfTournament() {
        //my tournament  找到自己报名的比赛
        let mytournament = this.tournamentList.find(t => { return t.signStatus == 1; });
        if (mytournament) {
            this.lb_myTournamentTip.string = "Rummy tournamenth created by " + mytournament.nickname;
            this.lb_myTournamentStep.string = mytournament.tournamentStatus == 0 ? "About to start" : "";
        }
        else {
            this.lb_myTournamentTip.string = "You are not participating in the tournament";
            this.lb_myTournamentStep.node.active = false;
        }
        //create tournament 找到自己创建的比赛
        let selfId = User_1.User._userID;
        let myCreateTournament = this.tournamentList.find(t => { return t.userId == selfId; });
        if (myCreateTournament) {
            this.lb_createTournamentTip.string = "You created a Rummy tournament " + Config_1.Config.games[myCreateTournament.gameId].disName;
        }
        else {
            this.lb_createTournamentTip.string = "You have not created a tournament";
        }
    }
    onNetTournamentDetailRes(data) {
        if (data.statusMsg.status == 0) {
            if (TournamentData_1.default.getInstance().tournamentStatus == 3) {
                Framework_1.Manager.uiManager.open({ type: TournamentEndDetailView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
            }
            else {
                Framework_1.Manager.uiManager.open({ type: TournamentDetailView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
            }
            TournamentData_1.default.getInstance().tournamentStatus = null;
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.EditBox)
], TournamentRoomView.prototype, "gameEditBox", void 0);
__decorate([
    property(cc.Label)
], TournamentRoomView.prototype, "lb_myTournamentTip", void 0);
__decorate([
    property(cc.Label)
], TournamentRoomView.prototype, "lb_myTournamentStep", void 0);
__decorate([
    property(cc.Label)
], TournamentRoomView.prototype, "lb_createTournamentTip", void 0);
TournamentRoomView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TournamentRoomView);
exports.default = TournamentRoomView;

cc._RF.pop();