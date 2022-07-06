
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteMyRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3ca05kz1qlI6ZpkP1zuNzxu', 'RouletteMyRecordItem');
// games/roulette/script/view/RouletteMyRecordItem.ts

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
let RouletteMyRecordItem = class RouletteMyRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.iconSp = null;
        this.imgAvatar = null;
        this.uname = null;
        this.labRp = null;
        this.colorIcon0 = null;
        this.colorIcon1 = null;
        this.colorIcon2 = null;
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
        this.labRp.string = NumberUtils_1.default.converToC(betInfo.BetGold);
        for (let index = 0; index < 3; index++) {
            const colorIcon = this[`colorIcon${index}`];
            colorIcon.active = false;
            if (index == betInfo.Color)
                colorIcon.active = true;
        }
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, betInfo.player.HeaderUrl, betInfo.player.UnitId, this);
    }
    clear() {
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], RouletteMyRecordItem.prototype, "iconSp", void 0);
__decorate([
    property(cc.Sprite)
], RouletteMyRecordItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], RouletteMyRecordItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], RouletteMyRecordItem.prototype, "labRp", void 0);
__decorate([
    property(cc.Node)
], RouletteMyRecordItem.prototype, "colorIcon0", void 0);
__decorate([
    property(cc.Node)
], RouletteMyRecordItem.prototype, "colorIcon1", void 0);
__decorate([
    property(cc.Node)
], RouletteMyRecordItem.prototype, "colorIcon2", void 0);
RouletteMyRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteMyRecordItem);
exports.default = RouletteMyRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZU15UmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZFQUEwRTtBQUMxRSw4RkFBc0U7QUFHdEUsa0ZBQWtGO0FBQ2xGLG9GQUE0RDtBQUM1RCwrREFBNEQ7QUFFNUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxnQkFBTTtJQUF4RDs7UUFJWSxXQUFNLEdBQWMsSUFBSSxDQUFDO1FBR3pCLGNBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsVUFBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUczQixlQUFVLEdBQVksSUFBSSxDQUFDO0lBdUN2QyxDQUFDO0lBckNHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxLQUFLO0lBRWYsQ0FBQztJQUVPLFFBQVE7SUFFaEIsQ0FBQztJQUVPLFFBQVE7SUFDaEIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRztRQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLHFCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDNUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFekIsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUs7Z0JBQ3RCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQy9CO1FBRUQsaUJBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBQ00sS0FBSztRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBRUosQ0FBQTtBQXpERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNhO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ2dCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ1k7QUFHL0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDWTtBQUcvQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNpQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNpQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNpQjtBQXRCbEIsb0JBQW9CO0lBRnhDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLG9CQUFvQixDQTZEeEM7a0JBN0RvQixvQkFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9nbG9iYWwvVXRpbE1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91bGV0dGVNeVJlY29yZEl0ZW0gZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaWNvblNwOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0F2YXRhcjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIHVuYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJScDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBjb2xvckljb24wOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgY29sb3JJY29uMTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGNvbG9ySWNvbjI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlSXRlbShkYXRhLCBpZHgpIHtcbiAgICAgICAgbGV0IGJldEluZm8gPSBkYXRhLmJldEluZm87XG4gICAgICAgIHRoaXMudW5hbWUuc3RyaW5nID0gYmV0SW5mby5wbGF5ZXIuTmljaztcbiAgICAgICAgdGhpcy5sYWJScC5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoYmV0SW5mby5CZXRHb2xkKTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgY29sb3JJY29uID0gdGhpc1tgY29sb3JJY29uJHtpbmRleH1gXTtcbiAgICAgICAgICAgIGNvbG9ySWNvbi5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09IGJldEluZm8uQ29sb3IpXG4gICAgICAgICAgICAgICAgY29sb3JJY29uLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKHRoaXMuaW1nQXZhdGFyLCBiZXRJbmZvLnBsYXllci5IZWFkZXJVcmwsIGJldEluZm8ucGxheWVyLlVuaXRJZCwgdGhpcyk7XG4gICAgfVxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgIH1cblxufVxuIl19