"use strict";
cc._RF.push(module, 'a4a61EOYNRNLY0ZiLo+UdhU', 'TournamentEndDetailView ');
// script/tournament/TournamentEndDetailView .ts

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
const Config_1 = require("../common/config/Config");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let TournamentEndDetailView = class TournamentEndDetailView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.head = null;
        this.creatorName = null;
        this.game = null;
        this.pPeople = null;
        this.jackpot = null;
        this.bonusSource = null;
    }
    static getPrefabUrl() {
        return "tournament/prefabs/TournamentEndDetailView";
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
        console.log("TournamentEndDetailView", this.data);
    }
    bindingEvents() {
        super.bindingEvents();
    }
    updateView() {
        UtilMgr_1.UtilMgr.loadHeadImg(this.head, this.data.headImg, this.data.userId + "", this);
        this.creatorName.string = UtilMgr_1.UtilMgr.setString(this.data.nickname);
        this.game.string = Config_1.Config.games[this.data.gameId].disName;
        this.pPeople.string = this.data.numberOfParticipants + "-people";
        let jackpotArr = this.data.reward.split(",");
        let jackpotNum = 0;
        jackpotArr.forEach(data => {
            jackpotNum += +data;
        });
        this.jackpot.string = UtilMgr_1.UtilMgr.changeMoney(jackpotNum);
        this.bonusSource.string = this.data.bonusSource == 0 ? "Pay by myself" : "Pay by participant";
        this.getComponent(ScroViewLogic_1.default).initUI(this.data.tournamentSignUpUser);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Sprite)
], TournamentEndDetailView.prototype, "head", void 0);
__decorate([
    property(cc.Label)
], TournamentEndDetailView.prototype, "creatorName", void 0);
__decorate([
    property(cc.Label)
], TournamentEndDetailView.prototype, "game", void 0);
__decorate([
    property(cc.Label)
], TournamentEndDetailView.prototype, "pPeople", void 0);
__decorate([
    property(cc.Label)
], TournamentEndDetailView.prototype, "jackpot", void 0);
__decorate([
    property(cc.Label)
], TournamentEndDetailView.prototype, "bonusSource", void 0);
TournamentEndDetailView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TournamentEndDetailView);
exports.default = TournamentEndDetailView;

cc._RF.pop();