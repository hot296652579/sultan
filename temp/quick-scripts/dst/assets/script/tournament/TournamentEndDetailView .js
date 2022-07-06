
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/TournamentEndDetailView .js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Ub3VybmFtZW50RW5kRGV0YWlsVmlldyAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRkFBOEQ7QUFDOUQsb0RBQWlEO0FBR2pELDZEQUEwRDtBQUcxRCxrRUFBMkU7QUFHM0Usb0VBQTRDO0FBRTVDLCtDQUE0QztBQUk1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsdUJBQXVCLEdBQTVDLE1BQXFCLHVCQUF3QixTQUFRLGdCQUFNO0lBQTNEOztRQUtJLFNBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsU0FBSSxHQUFhLElBQUksQ0FBQztRQUd0QixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7SUFvRGpDLENBQUM7SUFqRFUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw0Q0FBNEMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVO1FBQ04saUJBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDO1FBQ2pFLElBQUksVUFBVSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUEsRUFBRTtZQUNyQixVQUFVLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUM7UUFDOUYsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQ2QsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLE9BQU87Z0JBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUFDLE1BQU07WUFDNUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBQ0QsU0FBUztRQUNMLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBQ0osQ0FBQTtBQW5FRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNHO0FBR3ZCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NERBQ1U7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDRztBQUd0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNNO0FBR3pCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ007QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0REFDVTtBQXBCWix1QkFBdUI7SUFGM0MsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsdUJBQXVCLENBd0UzQztrQkF4RW9CLHVCQUF1QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvVmlld0xvZ2ljIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3TG9naWNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBzZXJ2ZXJUeXBlLCBwcm90b1BhY2thZ2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9GcmFtZXdvcmtcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCBTaWduVXBQbGF5ZXJzVmlldyBmcm9tIFwiLi9TaWduVXBQbGF5ZXJzVmlld1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91cm5hbWVudEVuZERldGFpbFZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjcmVhdG9yTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGdhbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwUGVvcGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgamFja3BvdDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGJvbnVzU291cmNlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVRvdXJuYW1lbnREZXRhaWxSZXNcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwidG91cm5hbWVudC9wcmVmYWJzL1RvdXJuYW1lbnRFbmREZXRhaWxWaWV3XCI7XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgaWYgKGFyZ3MgJiYgYXJnc1swXSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gYXJnc1swXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvdXJuYW1lbnRFbmREZXRhaWxWaWV3XCIsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcodGhpcy5oZWFkLCB0aGlzLmRhdGEuaGVhZEltZywgdGhpcy5kYXRhLnVzZXJJZCArIFwiXCIsIHRoaXMpO1xuICAgICAgICB0aGlzLmNyZWF0b3JOYW1lLnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKHRoaXMuZGF0YS5uaWNrbmFtZSk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdHJpbmcgPSBDb25maWcuZ2FtZXNbdGhpcy5kYXRhLmdhbWVJZF0uZGlzTmFtZTtcbiAgICAgICAgdGhpcy5wUGVvcGxlLnN0cmluZyA9IHRoaXMuZGF0YS5udW1iZXJPZlBhcnRpY2lwYW50cyArIFwiLXBlb3BsZVwiO1xuICAgICAgICBsZXQgamFja3BvdEFyciA9ICB0aGlzLmRhdGEucmV3YXJkLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgbGV0IGphY2twb3ROdW0gPSAwO1xuICAgICAgICBqYWNrcG90QXJyLmZvckVhY2goZGF0YT0+e1xuICAgICAgICAgICAgamFja3BvdE51bSArPSArZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuamFja3BvdC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGphY2twb3ROdW0pO1xuICAgICAgICB0aGlzLmJvbnVzU291cmNlLnN0cmluZyA9IHRoaXMuZGF0YS5ib251c1NvdXJjZSA9PSAwID8gXCJQYXkgYnkgbXlzZWxmXCIgOiBcIlBheSBieSBwYXJ0aWNpcGFudFwiO1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChTY3JvVmlld0xvZ2ljKS5pbml0VUkodGhpcy5kYXRhLnRvdXJuYW1lbnRTaWduVXBVc2VyKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=