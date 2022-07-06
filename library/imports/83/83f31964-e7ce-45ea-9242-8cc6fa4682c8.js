"use strict";
cc._RF.push(module, '83f31lk585F6pJCjMb6RoLI', 'MyTournamentView');
// script/tournament/MyTournamentView.ts

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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let MyTournamentView = class MyTournamentView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.myTournament = null;
        this.myCreation = null;
    }
    static getPrefabUrl() {
        return "tournament/prefabs/MyTournamentView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.showWithAction(true, () => {
            this.reqMyTournament();
        });
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_MyTournament), this.onNetMyTournament);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "myTournament":
                this.myTournament.color = new cc.Color().fromHEX('#FFFFFF');
                this.myCreation.color = new cc.Color().fromHEX('#AE9F96');
                this.reqMyTournament();
                break;
            case "myCreation":
                this.myTournament.color = new cc.Color().fromHEX('#AE9F96');
                this.myCreation.color = new cc.Color().fromHEX('#FFFFFF');
                this.reqMyTournament(1);
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqMyTournament(tournamentType = 0) {
        let jsonData = {
            type: tournamentType,
        };
        let req = CommonService_1.protoPackage.hall.MyTournamentReq.create(jsonData);
        let buffer = CommonService_1.protoPackage.hall.MyTournamentReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_MyTournament, buffer);
    }
    onNetMyTournament(data) {
        if (data.statusMsg.status == 0) {
            this.getComponent(ScroViewLogic_1.default).initUI(data.tournaments);
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
    property(cc.Node)
], MyTournamentView.prototype, "myTournament", void 0);
__decorate([
    property(cc.Node)
], MyTournamentView.prototype, "myCreation", void 0);
MyTournamentView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], MyTournamentView);
exports.default = MyTournamentView;

cc._RF.pop();