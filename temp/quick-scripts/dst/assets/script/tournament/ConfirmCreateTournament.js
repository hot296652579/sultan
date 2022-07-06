
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/ConfirmCreateTournament.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Db25maXJtQ3JlYXRlVG91cm5hbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFpRDtBQUNqRCxrRUFBdUQ7QUFDdkQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUcxRCxrRUFBMkU7QUFHM0Usb0VBQTRDO0FBQzVDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFDNUMsc0VBQThDO0FBRzlDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQix1QkFBdUIsR0FBNUMsTUFBcUIsdUJBQXdCLFNBQVEsZ0JBQU07SUFBM0Q7O1FBS0ksYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLFdBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsWUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixZQUFPLEdBQWUsRUFBRSxDQUFDO1FBR3pCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVUsR0FBYSxJQUFJLENBQUM7SUF5R2hDLENBQUM7SUF0R1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw0Q0FBNEMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFdkQsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFHRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUU5SCxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQ2QsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLFdBQVcsQ0FBQztZQUNqQixLQUFLLE9BQU87Z0JBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUFDLE1BQU07WUFDNUMsS0FBSyxZQUFZO2dCQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUFDLE1BQU07WUFDckQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2YsbUJBQVMsQ0FBQyxXQUFXLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxHQUFHLEdBQUcsNEJBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQ2pDLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFDOUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVPLHFCQUFxQixDQUFDLElBQWlEO1FBQzNFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtZQUN0Qyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzdELFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDOUM7YUFBTTtZQUNILElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFDO2dCQUM1QixtQkFBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsbUJBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtvQkFDdEQsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2pDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUN0QjtpQkFBSTtnQkFDRCxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDNUQ7U0FDSjtRQUNELG1CQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG1CQUFtQixDQUFDLFlBQVk7UUFDNUIsSUFBSSxRQUFRLEdBQUc7WUFDWCxZQUFZLEVBQUUsWUFBWTtTQUM3QixDQUFBO1FBQ0QsSUFBSSxHQUFHLEdBQUcsNEJBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLDRCQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4RSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFDakMsNEJBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUM5QyxNQUFNLENBQUMsQ0FBQztJQUVoQixDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMzRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFNBQVMsQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUM7UUFDOUYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BJO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNuSztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixTQUFTLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEc7WUFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsU0FBUztRQUNMLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBQ0osQ0FBQTtBQTlIRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNPO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ087QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDSztBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzREQUNVO0FBRzdCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ007QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDTTtBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNVO0FBRzVCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ1M7QUExQlgsdUJBQXVCO0lBRjNDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLHVCQUF1QixDQW1JM0M7a0JBbklvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgc2VydmVyVHlwZSwgcHJvdG9QYWNrYWdlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvRnJhbWV3b3JrXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgVG91cm5hbWVudERhdGEgZnJvbSBcIi4vVG91cm5hbWVudERhdGFcIjtcbmltcG9ydCBUb3VybmFtZW50RGV0YWlsVmlldyBmcm9tIFwiLi9Ub3VybmFtZW50RGV0YWlsVmlld1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybUNyZWF0ZVRvdXJuYW1lbnQgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBnYW1lTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBhc3N3b3JkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGVvcGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYm9udXNTb3VyY2U6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBqYWNrUG90OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcmV3YXJkczogY2MuTGFiZWxbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY29uZmlybU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNyZWF0ZUdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgZGF0YTtcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwidG91cm5hbWVudC9wcmVmYWJzL0NvbmZpcm1DcmVhdGVUb3VybmFtZW50XCI7XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuICAgICAgICBpZiAoYXJncyAmJiBhcmdzWzBdKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBhcmdzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlIHJvb20gaW5mb1wiLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9DcmVhdGVUb3VybmFtZW50KSwgdGhpcy5vbk5ldENyZWF0ZVRvdXJuYW1lbnQpO1xuXG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcInJldHVybkJ0blwiOlxuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNvbmZpcm1CdG5cIjogdGhpcy5yZXFDcmVhdGVUb3VybmFtZW50KCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVxQ3JlYXRlVG91cm5hbWVudCgpIHtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dMb2FkaW5nKGkxOG4uV0FJVC5MT0dJTik7XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5DcmVhdGVUb3VybmFtZW50UmVxLmNyZWF0ZSh0aGlzLmRhdGEpO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuQ3JlYXRlVG91cm5hbWVudFJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0NyZWF0ZVRvdXJuYW1lbnQsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25OZXRDcmVhdGVUb3VybmFtZW50KGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUNyZWF0ZVRvdXJuYW1lbnRSZXMpIHtcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJjbG9zZV9jcmVhdGVUb3VybmFtZW50Vmlld1wiKVxuICAgICAgICAgICAgVG91cm5hbWVudERhdGEuZ2V0SW5zdGFuY2UoKS5mbHVzaEl0bWVJRCA9IGRhdGEudG91cm5hbWVudElkO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJVcGRhdGVUb3VybmFtZW50TGlzdFwiKTtcbiAgICAgICAgICAgIHRoaXMucmVxVG91cm5hbWVudERldGFpbChkYXRhLnRvdXJuYW1lbnRJZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAyNTEpe1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KFwiXCIsIGkxOG4uRlJJRU5EUk9PTS5Ub1JlY2hhcmdlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKFwib3BlblJlY2hhcmdlVmlld1wiKTtcbiAgICAgICAgICAgICAgICB9LCBcImJ0bl9SZWNoYXJnZVwiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRVJST1JDT0RFW2RhdGEuc3RhdHVzTXNnLnN0YXR1c10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFBhbmVsSGVscC5oaWRlTG9hZGluZygpO1xuICAgIH1cblxuICAgIHJlcVRvdXJuYW1lbnREZXRhaWwodG91cm5hbWVudElkKSB7XG4gICAgICAgIGxldCBqc29uRGF0YSA9IHtcbiAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogdG91cm5hbWVudElkLFxuICAgICAgICB9XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5Ub3VybmFtZW50RGV0YWlsUmVxLmNyZWF0ZShqc29uRGF0YSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5Ub3VybmFtZW50RGV0YWlsUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVG91cm5hbWVudERldGFpbCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVWaWV3KCkge1xuICAgICAgICB0aGlzLmdhbWVOYW1lLnN0cmluZyA9IENvbmZpZy5nYW1lc1t0aGlzLmRhdGEuZ2FtZUlkXS5kaXNOYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkLnN0cmluZyA9IHRoaXMuZGF0YS5wYXNzd29yZC5sZW5ndGggPT0gMCA/IFwiTm8gUGFzc3dvcmRcIiA6IHRoaXMuZGF0YS5wYXNzd29yZDtcbiAgICAgICAgdGhpcy5wZW9wbGUuc3RyaW5nID0gdGhpcy5kYXRhLm51bWJlck9mUGFydGljaXBhbnRzICsgXCItcGVvcGxlXCI7XG4gICAgICAgIHRoaXMuYm9udXNTb3VyY2Uuc3RyaW5nID0gdGhpcy5kYXRhLmJvbnVzU291cmNlID09IDAgPyBcIlBheSBieSBteXNlbGZcIiA6IFwiUGF5IGJ5IHBhcnRpY2lwYW50XCI7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuYm9udXNTb3VyY2UgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5qYWNrUG90LnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoKHRoaXMuZGF0YS5jcmVhdGVGZWUgKiAoMTAwIC0gVG91cm5hbWVudERhdGEuZ2V0SW5zdGFuY2UoKS5zZXJ2aWNlRmVlKSAqIDAuMDEpLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmphY2tQb3Quc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leSgodGhpcy5kYXRhLmpvaW5GZWUgKiAoMTAwIC0gVG91cm5hbWVudERhdGEuZ2V0SW5zdGFuY2UoKS5zZXJ2aWNlRmVlKSAqIHRoaXMuZGF0YS5udW1iZXJPZlBhcnRpY2lwYW50cyAqIDAuMDEpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmVhdGVHb2xkLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkodGhpcy5kYXRhLmNyZWF0ZUZlZSk7XG4gICAgICAgIGxldCByZXdhcmRzID0gdGhpcy5kYXRhLnJld2FyZFBlcmNlbnQuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5yZXdhcmRzLmZvckVhY2goKHJld2FyZExhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXdhcmRzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHJld2FyZExhYi5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KCt0aGlzLmphY2tQb3Quc3RyaW5nICogcmV3YXJkc1tpbmRleF0gKiAwLjAxICogMTAwMDAsZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV3YXJkTGFiLm5vZGUucGFyZW50LmFjdGl2ZSA9IGluZGV4IDwgcmV3YXJkcy5sZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZUdvbGQubm9kZS5wYXJlbnQuYWN0aXZlID0gdGhpcy5kYXRhLmJvbnVzU291cmNlID09IDA7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=