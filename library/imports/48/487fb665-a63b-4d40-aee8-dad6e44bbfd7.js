"use strict";
cc._RF.push(module, '487fbZlpjtNQK7o2tbkS7/X', 'TournamentItem');
// script/tournament/TournamentItem.ts

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
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const TournamentData_1 = __importDefault(require("./TournamentData"));
const { ccclass, property } = cc._decorator;
let TournamentItem = class TournamentItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.head = null;
        this.creatorName = null;
        this.onlinePeople = null;
        this.championReward = null;
        this.needPassWordNode = null;
        this.detailNode = null;
        this.signUpNode = null;
        this.startTime = null;
        this.startTimeNode = null;
        this.tournamentType = null;
        this.tSprte = [];
        this._data = null;
    }
    onLoad() {
        this.signUpNode.active = false;
        this.detailNode.active = false;
    }
    updateItem(data) {
        this._data = data;
        this.creatorName.string = UtilMgr_1.UtilMgr.setString(data.nickname);
        this.onlinePeople.string = data.signNum + "/" + data.totalNum;
        this.championReward.string = UtilMgr_1.UtilMgr.changeMoney(data.championReward);
        UtilMgr_1.UtilMgr.loadHeadImg(this.head, this._data.headImg, data.userId + "", this);
        this.needPassWordNode.active = !!this._data.enterPassword;
        this.startTime.string = new Date(+this._data.startTime).format("yyyy-MM-dd hh:mm:ss");
        if (data.userId == 0) { //创房ID = 0 官方赛
            data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
            this.tournamentType.spriteFrame = this.tSprte[1];
            this.startTimeNode.active = true;
        }
        else { //自建赛 
            if (data.userId == User_1.User._userID) { //我创建的
                this.detailNode.active = true;
                this.tournamentType.spriteFrame = this.tSprte[0];
            }
            else { //别人创建的
                data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
                this.tournamentType.spriteFrame = null;
            }
            this.startTimeNode.active = false;
        }
    }
    onClick(event) {
        let name = event.target.name;
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        switch (name) {
            case "detailBtn":
            case "signupBtn":
                TournamentData_1.default.getInstance().signStatus = this._data.signStatus;
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
    /**
       * 本Item进入ScrollView的时候回调
       */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Sprite)
], TournamentItem.prototype, "head", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "creatorName", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "onlinePeople", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "championReward", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "needPassWordNode", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "detailNode", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "signUpNode", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "startTime", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "startTimeNode", void 0);
__decorate([
    property(cc.Sprite)
], TournamentItem.prototype, "tournamentType", void 0);
__decorate([
    property(cc.SpriteFrame)
], TournamentItem.prototype, "tSprte", void 0);
TournamentItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TournamentItem);
exports.default = TournamentItem;

cc._RF.pop();