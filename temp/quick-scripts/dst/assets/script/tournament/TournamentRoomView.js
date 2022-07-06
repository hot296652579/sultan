
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/TournamentRoomView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Ub3VybmFtZW50Um9vbVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRkFBNEQ7QUFDNUQsb0RBQWlEO0FBQ2pELGtFQUF1RDtBQUN2RCwrREFBdUU7QUFDdkUsNkRBQTBEO0FBQzFELHVEQUE2RDtBQUU3RCxrRUFBMkU7QUFFM0Usc0RBQWlEO0FBQ2pELG9FQUE0QztBQUM1Qyx5Q0FBc0M7QUFDdEMsb0VBQTRDO0FBQzVDLGtGQUEwRDtBQUMxRCwwRUFBa0Q7QUFDbEQsc0VBQThDO0FBQzlDLGtGQUEwRDtBQUMxRCx5RkFBaUU7QUFHakUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLGtCQUFrQixHQUF2QyxNQUFxQixrQkFBbUIsU0FBUSxnQkFBTTtJQUF0RDs7UUFLSSxnQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQix1QkFBa0IsR0FBYSxJQUFJLENBQUM7UUFHcEMsd0JBQW1CLEdBQWEsSUFBSSxDQUFDO1FBR3JDLDJCQUFzQixHQUFhLElBQUksQ0FBQztRQUVoQyxtQkFBYyxHQUEwQyxJQUFJLENBQUM7UUFDN0QsYUFBUSxHQUFXLElBQUksQ0FBQztJQTRIcEMsQ0FBQztJQTNIVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLHVDQUF1QyxDQUFDO0lBQ25ELENBQUM7SUFDRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRW5CLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBR0QsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FB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U0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxpQ0FBdUIsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3JHO2lCQUFNO2dCQUNILG1CQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSw4QkFBb0IsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xHO1lBQ0Qsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDeEQ7YUFBTTtZQUNILG1CQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ0wsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDSixDQUFBO0FBeElHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7dURBQ1U7QUFHL0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4REFDaUI7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrREFDa0I7QUFHckM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrRUFDcUI7QUFkdkIsa0JBQWtCO0lBRnRDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGtCQUFrQixDQTZJdEM7a0JBN0lvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2Nyb1ZpZXdDdHJsIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3Q3RybFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IHNlcnZlclR5cGUsIHByb3RvUGFja2FnZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL0ZyYW1ld29ya1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IENyZWF0ZVRvdXJuYW1lbnRWaWV3IGZyb20gXCIuL0NyZWF0ZVRvdXJuYW1lbnRWaWV3XCI7XG5pbXBvcnQgTXlUb3VybmFtZW50VmlldyBmcm9tIFwiLi9NeVRvdXJuYW1lbnRWaWV3XCI7XG5pbXBvcnQgVG91cm5hbWVudERhdGEgZnJvbSBcIi4vVG91cm5hbWVudERhdGFcIjtcbmltcG9ydCBUb3VybmFtZW50RGV0YWlsVmlldyBmcm9tIFwiLi9Ub3VybmFtZW50RGV0YWlsVmlld1wiO1xuaW1wb3J0IFRvdXJuYW1lbnRFbmREZXRhaWxWaWV3IGZyb20gXCIuL1RvdXJuYW1lbnRFbmREZXRhaWxWaWV3IFwiO1xuaW1wb3J0IFRvdXJuYW1lbnRJdGVtIGZyb20gXCIuL1RvdXJuYW1lbnRJdGVtXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VybmFtZW50Um9vbVZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIGdhbWVFZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYl9teVRvdXJuYW1lbnRUaXA6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYl9teVRvdXJuYW1lbnRTdGVwOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJfY3JlYXRlVG91cm5hbWVudFRpcDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0b3VybmFtZW50TGlzdDogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudFBbXSA9IG51bGw7XG4gICAgcHJpdmF0ZSBzZWFyY2hJZDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwidG91cm5hbWVudC9wcmVmYWJzL1RvdXJuYW1lbnRSb29tVmlld1wiO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5yZXFUb3VybmFtZW50TGlzdCgpO1xuICAgIH1cblxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ub3VybmFtZW50TGlzdCksIHRoaXMub25OZXRUb3VybmFtZW50TGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1RvdXJuYW1lbnREZXRhaWwpLCB0aGlzLm9uTmV0VG91cm5hbWVudERldGFpbFJlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIlVwZGF0ZVRvdXJuYW1lbnRMaXN0XCIsIHRoaXMucmVxVG91cm5hbWVudExpc3QpO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J0bkJhY2snOlxuICAgICAgICAgICAgICAgIC8vIGRpc3BhdGNoKExvZ2ljRXZlbnQuRU5URVJfSEFMTCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNyZWF0ZVRvdXRuYW1lbnRCdG5cIjpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQ3JlYXRlVG91cm5hbWVudFZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJteVRvdXJuYW1lbnRCdG5cIjpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTXlUb3VybmFtZW50VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNlYXJjaFRvdXJuYW1lbnRCdG5cIjpcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoVG91cm5hbWVudElkID0gdGhpcy5nYW1lRWRpdEJveC5zdHJpbmc7XG4gICAgICAgICAgICAgICAgaWYoc2VhcmNoVG91cm5hbWVudElkLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXFUb3VybmFtZW50TGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0b3VybmFtZW50SXRlbURhdGEgPSB0aGlzLnRvdXJuYW1lbnRMaXN0LmZpbmQoaXRlbSA9PiB7IHJldHVybiBpdGVtLnRvdXJuYW1lbnRJZCA9PSArc2VhcmNoVG91cm5hbWVudElkIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0b3VybmFtZW50SXRlbURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoU2Nyb1ZpZXdDdHJsKS5zY3JvVmlld1BsdXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnRMaXN0VmlldyhbdG91cm5hbWVudEl0ZW1EYXRhXSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVG91cm5hbWVudC5Ob3RUb3VybmFtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJZCA9IHRvdXJuYW1lbnRJdGVtRGF0YSA/IHRvdXJuYW1lbnRJdGVtRGF0YS50b3VybmFtZW50SWQgOiBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVxVG91cm5hbWVudExpc3QoKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ub3VybmFtZW50TGlzdCxcbiAgICAgICAgICAgIG51bGwpO1xuICAgIH1cblxuICAgIG9uTmV0VG91cm5hbWVudExpc3QoZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudExpc3RSZXMpIHtcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnRMaXN0ID0gZGF0YS50b3VybmFtZW50cztcbiAgICAgICAgICAgIHRoaXMudG91cm5hbWVudExpc3RWaWV3KHRoaXMudG91cm5hbWVudExpc3QpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxmVG91cm5hbWVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FUlJPUkNPREVbZGF0YS5zdGF0dXNNc2cuc3RhdHVzXSk7XG4gICAgICAgIH1cbiAgICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdG91cm5hbWVudExpc3RWaWV3KHRvdXJuYW1lbnRMaXN0OiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklUb3VybmFtZW50UFtdKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaElkICYmIFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCkuZmx1c2hJdG1lSUQgJiYgdGhpcy5zZWFyY2hJZCA9PSBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLmZsdXNoSXRtZUlEKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0b3VybmFtZW50TGlzdC5maW5kSW5kZXgoaXRlbSA9PiB7IHJldHVybiBpdGVtLnRvdXJuYW1lbnRJZCA9PSBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLmZsdXNoSXRtZUlEIH0pO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB0b3VybmFtZW50TGlzdCA9IHRvdXJuYW1lbnRMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLmZsdXNoSXRtZUlEID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzY3JvVmlld0N0cmxDb20gPSB0aGlzLmdldENvbXBvbmVudChTY3JvVmlld0N0cmwpXG4gICAgICAgIHNjcm9WaWV3Q3RybENvbS5kYXRhTGlzdCA9IHRvdXJuYW1lbnRMaXN0XG4gICAgICAgIGF3YWl0IHNjcm9WaWV3Q3RybENvbS5mcmFtaW5nTG9hZCh0b3VybmFtZW50TGlzdC5sZW5ndGgpXG4gICAgICAgIFBhbmVsSGVscC5oaWRlTG9hZGluZygpXG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZlRvdXJuYW1lbnQoKSB7XG4gICAgICAgIC8vbXkgdG91cm5hbWVudCAg5om+5Yiw6Ieq5bex5oql5ZCN55qE5q+U6LWbXG4gICAgICAgIGxldCBteXRvdXJuYW1lbnQgPSB0aGlzLnRvdXJuYW1lbnRMaXN0LmZpbmQodCA9PiB7IHJldHVybiB0LnNpZ25TdGF0dXMgPT0gMSB9KTtcbiAgICAgICAgaWYgKG15dG91cm5hbWVudCkge1xuICAgICAgICAgICAgdGhpcy5sYl9teVRvdXJuYW1lbnRUaXAuc3RyaW5nID0gXCJSdW1teSB0b3VybmFtZW50aCBjcmVhdGVkIGJ5IFwiICsgbXl0b3VybmFtZW50Lm5pY2tuYW1lO1xuICAgICAgICAgICAgdGhpcy5sYl9teVRvdXJuYW1lbnRTdGVwLnN0cmluZyA9IG15dG91cm5hbWVudC50b3VybmFtZW50U3RhdHVzID09IDAgPyBcIkFib3V0IHRvIHN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYl9teVRvdXJuYW1lbnRUaXAuc3RyaW5nID0gXCJZb3UgYXJlIG5vdCBwYXJ0aWNpcGF0aW5nIGluIHRoZSB0b3VybmFtZW50XCI7XG4gICAgICAgICAgICB0aGlzLmxiX215VG91cm5hbWVudFN0ZXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY3JlYXRlIHRvdXJuYW1lbnQg5om+5Yiw6Ieq5bex5Yib5bu655qE5q+U6LWbXG4gICAgICAgIGxldCBzZWxmSWQgPSBVc2VyLl91c2VySUQ7XG4gICAgICAgIGxldCBteUNyZWF0ZVRvdXJuYW1lbnQgPSB0aGlzLnRvdXJuYW1lbnRMaXN0LmZpbmQodCA9PiB7IHJldHVybiB0LnVzZXJJZCA9PSBzZWxmSWQgfSk7XG4gICAgICAgIGlmIChteUNyZWF0ZVRvdXJuYW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubGJfY3JlYXRlVG91cm5hbWVudFRpcC5zdHJpbmcgPSBcIllvdSBjcmVhdGVkIGEgUnVtbXkgdG91cm5hbWVudCBcIiArIENvbmZpZy5nYW1lc1tteUNyZWF0ZVRvdXJuYW1lbnQuZ2FtZUlkXS5kaXNOYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYl9jcmVhdGVUb3VybmFtZW50VGlwLnN0cmluZyA9IFwiWW91IGhhdmUgbm90IGNyZWF0ZWQgYSB0b3VybmFtZW50XCI7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBvbk5ldFRvdXJuYW1lbnREZXRhaWxSZXMoZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudERldGFpbFJlcykge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIGlmIChUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLnRvdXJuYW1lbnRTdGF0dXMgPT0gMykge1xuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBUb3VybmFtZW50RW5kRGV0YWlsVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbZGF0YV0gfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBUb3VybmFtZW50RGV0YWlsVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbZGF0YV0gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLnRvdXJuYW1lbnRTdGF0dXMgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FUlJPUkNPREVbZGF0YS5zdGF0dXNNc2cuc3RhdHVzXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgIH1cbn1cblxuIl19