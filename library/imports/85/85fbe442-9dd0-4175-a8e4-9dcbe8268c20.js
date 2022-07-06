"use strict";
cc._RF.push(module, '85fbeRCndBBdajkncvoJowg', 'RecordView');
// script/rank/RecordView.ts

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
exports.rankType = void 0;
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
var rankType;
(function (rankType) {
    rankType[rankType["Friends"] = 1] = "Friends";
    rankType[rankType["Wealth"] = 2] = "Wealth";
    rankType[rankType["DayEarn"] = 3] = "DayEarn";
})(rankType = exports.rankType || (exports.rankType = {}));
let RecordView = class RecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this.noRecords = null;
        this.boxNode = null;
        this.boxTime = null;
        this.draw = null;
        this._rankingList = [];
        this.timeInterval = null;
    }
    static getPrefabUrl() {
        return "rank/prefabs/RecordView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingRecord), this.updateList);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingReceive), this.newRankingReceiveRes);
    }
    updateList(data) {
        cc.log(data, "newRankingRecord");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.newRankingRecordP.length > 0) {
                    this._rankingList = data.newRankingRecordP;
                    this.rankView();
                }
                this._receiveStatus = data.receiveStatus;
                this._isWin = data.isWin;
                this._contDown = data.contDown;
                this.showBox();
                this.noRecords.active = !this._rankingList.length;
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    rankView() {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = this._rankingList;
            yield scroViewCtrlCom.framingLoad(this._rankingList.length);
            PanelHelp_1.default.hideLoading();
        });
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "boxBtn":
                this.reqReceive();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqReceive() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingReceive, null);
    }
    refreshRank() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingRecord, null);
    }
    start() {
        this.refreshRank();
    }
    newRankingReceiveRes(data) {
        if (data.statusMsg.status == 0) {
            this.boxNode.getComponent(sp.Skeleton).setAnimation(0, "kaixiang", false);
            this.boxNode.getComponent(sp.Skeleton).setCompleteListener(() => {
                this.boxNode.active = false;
                this.refreshRank();
            });
            dispatch("OpenBox");
            PanelHelp_1.default.showMsgBox("", Manager_1.Manager.makeLanguage(["RANK.Receive", UtilMgr_1.UtilMgr.changeMoney(data.reward)]), null, "btn_OK");
        }
        else {
            PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }
    showBox() {
        if (this._isWin == 1 && this._receiveStatus == 0) {
            this.boxNode.active = true;
            this.boxNode.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
        }
        else {
            this.boxNode.active = false;
        }
        this.draw.active = this._isWin == 1 ? (this._receiveStatus ? true : false) : true;
        this.updateBoxTime(this._contDown);
        if (this._contDown <= 0) {
            this.boxTime.node.active = false;
            this.draw.active = false;
        }
        this.boxTime.node.active = this.draw.active;
    }
    updateBoxTime(time) {
        this.timeInterval = () => {
            time -= 1000;
            this.conversionTime(time);
            if (time == 0) {
                this.unschedule(this.timeInterval);
                this.timeInterval = null;
                this.refreshRank();
            }
        };
        if (time > 0) {
            this.schedule(this.timeInterval, 1);
        }
        else if (time == 0) {
            this.unscheduleAllCallbacks();
            if (this.timeInterval) {
                this.unschedule(this.timeInterval);
                this.timeInterval = null;
            }
            this.refreshRank();
        }
    }
    conversionTime(data) {
        let hours = parseInt(data) / (1000 * 60 * 60);
        let h = parseInt(hours.toString());
        let minutes = (data % (1000 * 60 * 60)) / (1000 * 60);
        let m = parseInt(minutes.toString());
        let seconds = (data % (1000 * 60)) / 1000;
        let s = parseInt(seconds.toString());
        let time = (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
        this.boxTime.string = time;
    }
    onDestroy() {
        super.onDestroy();
        this.unscheduleAllCallbacks();
        if (this.timeInterval) {
            this.unschedule(this.timeInterval);
            this.timeInterval = null;
        }
    }
};
__decorate([
    property(cc.ScrollView)
], RecordView.prototype, "scrollView", void 0);
__decorate([
    property(cc.Node)
], RecordView.prototype, "noRecords", void 0);
__decorate([
    property(cc.Node)
], RecordView.prototype, "boxNode", void 0);
__decorate([
    property(cc.Label)
], RecordView.prototype, "boxTime", void 0);
__decorate([
    property(cc.Node)
], RecordView.prototype, "draw", void 0);
RecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RecordView);
exports.default = RecordView;

cc._RF.pop();