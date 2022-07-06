"use strict";
cc._RF.push(module, 'f13fcZP0apDX6JD1Gh0qilv', 'NoticeTournamentView');
// script/tournament/NoticeTournamentView.ts

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
const TournamentData_1 = __importDefault(require("./TournamentData"));
const { ccclass, property } = cc._decorator;
let NoticeTournamentView = class NoticeTournamentView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noticeText = null;
        this.joinNode = null;
    }
    static getPrefabUrl() {
        return "tournament/prefabs/NoticeTournamentView";
    }
    onLoad() {
        super.onLoad();
    }
    start() {
        this.joinNode.active = Manager_1.Manager.uiManager.isInHall() && !Manager_1.Manager.uiManager.isInGame();
        this.updateView();
    }
    show(args) {
        super.show(args);
        if (args && args[0]) {
            this.data = args[0];
        }
    }
    bindingEvents() {
        super.bindingEvents();
    }
    onClick(name, node) {
        switch (name) {
            case "joinBtn":
                if (this.timeInterval) {
                    clearInterval(this.timeInterval);
                    this.timeInterval = null;
                }
                this.close();
                PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.Waiting.EnterGame);
                TournamentData_1.default.getInstance().isTournamentGame = true;
                TournamentData_1.default.getInstance().tournamentID = this.data.tournamentId;
                TournamentData_1.default.getInstance().toServerId = this.data.serverId;
                TournamentData_1.default.getInstance().serverType = this.data.serverType;
                dispatch("JoinTournament", { serviceType: this.data.serverType, toServerId: this.data.serverId });
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    updateView() {
        let t = this.data.gameStartCountDown;
        TournamentData_1.default.getInstance().isCountDownDate = new Date().getTime() + t * 1000;
        this.noticeText.string = Manager_1.Manager.getLanguage(["Tournament.NoticeTournamentText", t]);
        this.timeInterval = setInterval(() => {
            t--;
            this.noticeText.string = Manager_1.Manager.getLanguage(["Tournament.NoticeTournamentText", t]);
            if (t <= 0) {
                clearInterval(this.timeInterval);
                this.close();
            }
        }, 1000);
    }
    onDestroy() {
        super.onDestroy();
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        }
    }
};
__decorate([
    property(cc.RichText)
], NoticeTournamentView.prototype, "noticeText", void 0);
__decorate([
    property(cc.Node)
], NoticeTournamentView.prototype, "joinNode", void 0);
NoticeTournamentView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], NoticeTournamentView);
exports.default = NoticeTournamentView;

cc._RF.pop();