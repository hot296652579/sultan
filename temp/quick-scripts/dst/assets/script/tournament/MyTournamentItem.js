
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/MyTournamentItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9NeVRvdXJuYW1lbnRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQW9FO0FBQ3BFLGtFQUF1RDtBQUN2RCx1REFBb0Q7QUFDcEQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUMxRCx1REFBNkQ7QUFDN0Qsa0VBQWtFO0FBRWxFLCtDQUE0QztBQUM1QyxzRUFBOEM7QUFDOUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLGdCQUFnQixHQUFyQyxNQUFxQixnQkFBaUIsU0FBUSwwQkFBZ0I7SUFBOUQ7O1FBR0ksWUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixXQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFHdEIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixtQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsZUFBVSxHQUFZLElBQUksQ0FBQztJQXNGL0IsQ0FBQztJQXBGRyxNQUFNO0lBRU4sQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUF5QyxFQUFFLE1BQU07UUFDeEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FB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Q29udGVudCI6WyJpbXBvcnQgU2Nyb1ZpZXdCYXNlSXRlbSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0Jhc2VJdGVtXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFRvdXJuYW1lbnREYXRhIGZyb20gXCIuL1RvdXJuYW1lbnREYXRhXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlUb3VybmFtZW50SXRlbSBleHRlbmRzIFNjcm9WaWV3QmFzZUl0ZW0ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY3JlYXRvcjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBlb3BsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG1vZGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzaWduVXBGZWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjaGFtcGlvblJld2FyZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRpbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGFydFN0YXRlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkZXRhaWxOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW0oZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudFAsIGl0ZW1JZCkge1xuICAgICAgICBzdXBlci51cGRhdGVJdGVtKGRhdGEsIGl0ZW1JZCk7XG4gICAgICAgIHRoaXMuY3JlYXRvci5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhkYXRhLm5pY2tuYW1lKTtcbiAgICAgICAgdGhpcy5wZW9wbGUuc3RyaW5nID0gZGF0YS50b3RhbE51bSArIFwiXCI7XG4gICAgICAgIHRoaXMubW9kZS5zdHJpbmcgPSBkYXRhLnR5cGUgPT0gMCA/IFwiU05HXCIgOiBcIk1UVFwiO1xuICAgICAgICB0aGlzLnNpZ25VcEZlZS5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEuc2lnblVwRmVlKTtcbiAgICAgICAgdGhpcy5jaGFtcGlvblJld2FyZC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEuY2hhbXBpb25SZXdhcmQpO1xuICAgICAgICBzd2l0Y2ggKGRhdGEudG91cm5hbWVudFN0YXR1cykgey8v5q+U6LWb54q25oCBICAw5q+U6LWb5Y+v5oql5ZCNIDHmiqXlkI3nu5PmnZ/nrYnlvoXmuLjmiI/lvIDlp4sgMua4uOaIj+W3suW8gOWniyAz5ri45oiP5bey57uT5p2fIDTmuLjmiI/lt7Llj5bmtoggNea1geWxgFxuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zdHJpbmcgPSBkYXRhLnR5cGUgPT0gMSA/IG5ldyBEYXRlKCtkYXRhLnN0YXJ0VGltZSkuZm9ybWF0KFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKSA6IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoW1wiVG91cm5hbWVudC5NeVRvdXJuYW1lbnRQZW9wbGVcIiwgZGF0YS50b3RhbE51bV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTdGF0ZS5zdHJpbmcgPSBpMThuLlRvdXJuYW1lbnQuTXlUb3VybmFtZW50VGlwMTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3RhdGUubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoJyMwMWU5MjInKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJodWFuZ1wiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUuc3RyaW5nID0gZGF0YS50eXBlID09IDEgPyBuZXcgRGF0ZSgrZGF0YS5zdGFydFRpbWUpLmZvcm1hdChcInl5eXktTU0tZGQgaGg6bW06c3NcIikgOiBNYW5hZ2VyLmdldExhbmd1YWdlKFtcIlRvdXJuYW1lbnQuTXlUb3VybmFtZW50UGVvcGxlXCIsIGRhdGEudG90YWxOdW1dKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3RhdGUuc3RyaW5nID0gaTE4bi5Ub3VybmFtZW50Lk15VG91cm5hbWVudFRpcDI7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFN0YXRlLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKCcjYzEzOTU4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zdHJpbmcgPSBkYXRhLnR5cGUgPT0gMSA/IG5ldyBEYXRlKCtkYXRhLnN0YXJ0VGltZSkuZm9ybWF0KFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKSA6IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoW1wiVG91cm5hbWVudC5NeVRvdXJuYW1lbnRQZW9wbGVcIiwgZGF0YS50b3RhbE51bV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTdGF0ZS5zdHJpbmcgPSBpMThuLlRvdXJuYW1lbnQuTXlUb3VybmFtZW50VGlwMztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3RhdGUubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoJyNmZjAwMGMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJodWFuZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zdHJpbmcgPSBkYXRhLnR5cGUgPT0gMSA/IG5ldyBEYXRlKCtkYXRhLnN0YXJ0VGltZSkuZm9ybWF0KFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKSA6IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoW1wiVG91cm5hbWVudC5NeVRvdXJuYW1lbnRQZW9wbGVcIiwgZGF0YS50b3RhbE51bV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTdGF0ZS5zdHJpbmcgPSBpMThuLlRvdXJuYW1lbnQuTXlUb3VybmFtZW50VGlwNDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3RhdGUubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoJyNmZjAwMGMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLnN0cmluZyA9IGRhdGEudHlwZSA9PSAxID8gbmV3IERhdGUoK2RhdGEuc3RhcnRUaW1lKS5mb3JtYXQoXCJ5eXl5LU1NLWRkIGhoOm1tOnNzXCIpIDogTWFuYWdlci5nZXRMYW5ndWFnZShbXCJUb3VybmFtZW50Lk15VG91cm5hbWVudFBlb3BsZVwiLCBkYXRhLnRvdGFsTnVtXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFN0YXRlLnN0cmluZyA9IGkxOG4uVG91cm5hbWVudC5NeVRvdXJuYW1lbnRUaXA1O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTdGF0ZS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWCgnI2ZmMDAwYycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5naXZlVXApIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5zdHJpbmcgPSBkYXRhLnR5cGUgPT0gMSA/IG5ldyBEYXRlKCtkYXRhLnN0YXJ0VGltZSkuZm9ybWF0KFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKSA6IE1hbmFnZXIuZ2V0TGFuZ3VhZ2UoW1wiVG91cm5hbWVudC5NeVRvdXJuYW1lbnRQZW9wbGVcIiwgZGF0YS50b3RhbE51bV0pO1xuICAgICAgICAgICAgdGhpcy5zdGFydFN0YXRlLnN0cmluZyA9IGkxOG4uVG91cm5hbWVudC5NeVRvdXJuYW1lbnRUaXA2O1xuICAgICAgICAgICAgdGhpcy5zdGFydFN0YXRlLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKCcjYmI5ZmE2Jyk7XG4gICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBsZXQgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgICAgICBNYW5hZ2VyLmdsb2JhbEF1ZGlvLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImRldGFpbEJ0blwiOlxuICAgICAgICAgICAgICAgIFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCkudG91cm5hbWVudFN0YXR1cyA9IHRoaXMuX2RhdGEudG91cm5hbWVudFN0YXR1cztcbiAgICAgICAgICAgICAgICB0aGlzLnJlcVRvdXJuYW1lbnREZXRhaWwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXFUb3VybmFtZW50RGV0YWlsKCkge1xuICAgICAgICBsZXQganNvbkRhdGEgPSB7XG4gICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRoaXMuX2RhdGEudG91cm5hbWVudElkLFxuICAgICAgICB9XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5Ub3VybmFtZW50RGV0YWlsUmVxLmNyZWF0ZShqc29uRGF0YSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5Ub3VybmFtZW50RGV0YWlsUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVG91cm5hbWVudERldGFpbCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG5cbiAgICB9XG5cbn1cbiJdfQ==