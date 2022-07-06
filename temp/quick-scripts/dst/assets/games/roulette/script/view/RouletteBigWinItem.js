
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteBigWinItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7a8eHmdbhAQ4Zq8ONa+IkF', 'RouletteBigWinItem');
// games/roulette/script/view/RouletteBigWinItem.ts

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
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RouletteBigWinItem = class RouletteBigWinItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.iconSp = null;
        this.imgAvatar = null;
        this.uname = null;
        this.labRp = null;
        this.labNo = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
    }
    initView() {
    }
    updateItem(data, idx) {
        let betInfo = data.betInfo;
        this.uname.string = betInfo.player.Nick;
        this.labRp.string = String(NumberUtils_1.default.converToC(betInfo.BetGold));
        this.labNo.string = idx + 1;
        if (idx > 2) {
            this.iconSp.node.active = false;
        }
        else {
            this.labNo.node.active = false;
        }
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, betInfo.player.HeaderUrl, betInfo.player.UnitId, this);
    }
    clear() {
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], RouletteBigWinItem.prototype, "iconSp", void 0);
__decorate([
    property(cc.Sprite)
], RouletteBigWinItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], RouletteBigWinItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], RouletteBigWinItem.prototype, "labRp", void 0);
__decorate([
    property(cc.Label)
], RouletteBigWinItem.prototype, "labNo", void 0);
RouletteBigWinItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteBigWinItem);
exports.default = RouletteBigWinItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZUJpZ1dpbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2RUFBMEU7QUFDMUUsOEZBQXNFO0FBRXRFLGtGQUFrRjtBQUNsRixvRkFBNEQ7QUFDNUQsK0RBQTREO0FBRTVELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsZ0JBQU07SUFBdEQ7O1FBSVksV0FBTSxHQUFjLElBQUksQ0FBQztRQUd6QixjQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLFVBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsVUFBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFLLEdBQWEsSUFBSSxDQUFDO0lBc0NuQyxDQUFDO0lBcENHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxLQUFLO0lBRWYsQ0FBQztJQUVPLFFBQVE7SUFFaEIsQ0FBQztJQUVPLFFBQVE7SUFDaEIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRztRQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDbkM7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDbEM7UUFFRCxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFDTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FFSixDQUFBO0FBbERHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ2E7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDZ0I7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDWTtBQUcvQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNZO0FBRy9CO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ1k7QUFoQmQsa0JBQWtCO0lBRnRDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGtCQUFrQixDQXNEdEM7a0JBdERvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9nbG9iYWwvVXRpbE1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91bGV0dGVCaWdXaW5JdGVtIGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGljb25TcDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdBdmF0YXI6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSB1bmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUnA6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYk5vOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVJdGVtKGRhdGEsIGlkeCkge1xuICAgICAgICBsZXQgYmV0SW5mbyA9IGRhdGEuYmV0SW5mbztcbiAgICAgICAgdGhpcy51bmFtZS5zdHJpbmcgPSBiZXRJbmZvLnBsYXllci5OaWNrO1xuICAgICAgICB0aGlzLmxhYlJwLnN0cmluZyA9IFN0cmluZyhOdW1iZXJVdGlscy5jb252ZXJUb0MoYmV0SW5mby5CZXRHb2xkKSk7XG5cbiAgICAgICAgdGhpcy5sYWJOby5zdHJpbmcgPSBpZHggKyAxO1xuICAgICAgICBpZiAoaWR4ID4gMikge1xuICAgICAgICAgICAgdGhpcy5pY29uU3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFiTm8ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcodGhpcy5pbWdBdmF0YXIsIGJldEluZm8ucGxheWVyLkhlYWRlclVybCwgYmV0SW5mby5wbGF5ZXIuVW5pdElkLCB0aGlzKTtcbiAgICB9XG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgfVxuXG59XG4iXX0=