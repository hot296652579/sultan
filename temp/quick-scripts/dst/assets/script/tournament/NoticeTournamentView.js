
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/NoticeTournamentView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Ob3RpY2VUb3VybmFtZW50Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUF1RDtBQUN2RCx1REFBb0Q7QUFDcEQsNkRBQTBEO0FBRTFELGtFQUFrRTtBQUVsRSxvRUFBNEM7QUFDNUMsb0VBQTRDO0FBQzVDLHNFQUE4QztBQUc5QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLGdCQUFNO0lBQXhEOztRQUdJLGVBQVUsR0FBZ0IsSUFBSSxDQUFDO1FBRy9CLGFBQVEsR0FBWSxJQUFJLENBQUM7SUF3RTdCLENBQUM7SUFsRVUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyx5Q0FBeUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUdELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFFMUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUNkLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDbkIsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtvQkFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQzVCO2dCQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixtQkFBUyxDQUFDLFdBQVcsQ0FBQyxtQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDN0Msd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3JELHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNuRSx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0Qsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQy9ELFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRyxNQUFNO1lBQ1YsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDckMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEdBQUcsSUFBSyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDakMsQ0FBQyxFQUFFLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGlDQUFpQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNSLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxTQUFTO1FBQ0wsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUEzRUc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3REFDUztBQUcvQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNPO0FBTlIsb0JBQW9CO0lBRnhDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLG9CQUFvQixDQThFeEM7a0JBOUVvQixvQkFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCBUb3VybmFtZW50RGF0YSBmcm9tIFwiLi9Ub3VybmFtZW50RGF0YVwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpY2VUb3VybmFtZW50VmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxuICAgIG5vdGljZVRleHQ6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGpvaW5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIHByaXZhdGUgZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JTm90aWNlVG91cm5hbWVudFN0YXJ0O1xuICAgIHRpbWVJbnRlcnZhbDogYW55O1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJ0b3VybmFtZW50L3ByZWZhYnMvTm90aWNlVG91cm5hbWVudFZpZXdcIjtcbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmpvaW5Ob2RlLmFjdGl2ZSA9IE1hbmFnZXIudWlNYW5hZ2VyLmlzSW5IYWxsKCkgJiYgIU1hbmFnZXIudWlNYW5hZ2VyLmlzSW5HYW1lKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICBpZiAoYXJncyAmJiBhcmdzWzBdKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBhcmdzWzBdO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiam9pbkJ0blwiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZUludGVydmFsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0xvYWRpbmcoaTE4bi5XYWl0aW5nLkVudGVyR2FtZSlcbiAgICAgICAgICAgICAgICBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLmlzVG91cm5hbWVudEdhbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCkudG91cm5hbWVudElEID0gdGhpcy5kYXRhLnRvdXJuYW1lbnRJZDtcbiAgICAgICAgICAgICAgICBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLnRvU2VydmVySWQgPSB0aGlzLmRhdGEuc2VydmVySWQ7XG4gICAgICAgICAgICAgICAgVG91cm5hbWVudERhdGEuZ2V0SW5zdGFuY2UoKS5zZXJ2ZXJUeXBlID0gdGhpcy5kYXRhLnNlcnZlclR5cGU7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goXCJKb2luVG91cm5hbWVudFwiLCB7IHNlcnZpY2VUeXBlOiB0aGlzLmRhdGEuc2VydmVyVHlwZSwgdG9TZXJ2ZXJJZDogdGhpcy5kYXRhLnNlcnZlcklkIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzLmRhdGEuZ2FtZVN0YXJ0Q291bnREb3duO1xuICAgICAgICBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLmlzQ291bnREb3duRGF0ZSA9IG5ldyAgRGF0ZSgpLmdldFRpbWUoKSArIHQgKiAxMDAwO1xuICAgICAgICB0aGlzLm5vdGljZVRleHQuc3RyaW5nID0gTWFuYWdlci5nZXRMYW5ndWFnZShbXCJUb3VybmFtZW50Lk5vdGljZVRvdXJuYW1lbnRUZXh0XCIsIHRdKTtcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0LS07XG4gICAgICAgICAgICB0aGlzLm5vdGljZVRleHQuc3RyaW5nID0gTWFuYWdlci5nZXRMYW5ndWFnZShbXCJUb3VybmFtZW50Lk5vdGljZVRvdXJuYW1lbnRUZXh0XCIsIHRdKTtcbiAgICAgICAgICAgIGlmICh0IDw9IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZUludGVydmFsKVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMudGltZUludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZUludGVydmFsKVxuICAgICAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19