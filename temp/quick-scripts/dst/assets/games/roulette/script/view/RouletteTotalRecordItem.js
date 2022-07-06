
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteTotalRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '118f3KSbUpE5Lw/qoxh4Zc7', 'RouletteTotalRecordItem');
// games/roulette/script/view/RouletteTotalRecordItem.ts

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
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RouletteTotalRecordItem = class RouletteTotalRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon0 = null;
        this.icon1 = null;
        this.icon2 = null;
        this.labGameNo = null;
        this.labRoundHash = null;
        this.labHashSalt = null;
        this.labRoundNo = null;
        this.labCheck = null;
        this.imgLine = null;
        // 数据
        this._data = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
        this._data = null;
    }
    initView() {
        this.labGameNo.string = "";
        this.labRoundHash.string = "";
        this.labHashSalt.string = "";
        this.labRoundNo.string = "";
        this.icon0.active = false;
        this.icon1.active = false;
        this.icon2.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.labRoundHash.language = Manager_1.Manager.makeLanguage("labRoundHash", true);
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labGameNo.language = Manager_1.Manager.makeLanguage(["labGameNo", data.round], true);
        this.labHashSalt.string = data.hashSalt;
        this.labRoundHash.string = data.roundHash;
        this.labRoundNo.string = String(data.randomNo);
        this[`icon${data.color}`].active = true;
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Node)
], RouletteTotalRecordItem.prototype, "icon0", void 0);
__decorate([
    property(cc.Node)
], RouletteTotalRecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RouletteTotalRecordItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labGameNo", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labRoundHash", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labHashSalt", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labRoundNo", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labCheck", void 0);
__decorate([
    property(cc.Sprite)
], RouletteTotalRecordItem.prototype, "imgLine", void 0);
RouletteTotalRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteTotalRecordItem);
exports.default = RouletteTotalRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZVRvdGFsUmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFFMUUsdUVBQW1GO0FBRW5GLGtGQUFrRjtBQUNsRiwwRUFBdUU7QUFHdkUsb0ZBQTREO0FBSTVELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQix1QkFBdUIsR0FBNUMsTUFBcUIsdUJBQXdCLFNBQVEsZ0JBQU07SUFBM0Q7O1FBSVksVUFBSyxHQUFZLElBQUksQ0FBQztRQUV0QixVQUFLLEdBQVksSUFBSSxDQUFDO1FBRXRCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixpQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixnQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixlQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsWUFBTyxHQUFhLElBQUksQ0FBQztRQUVqQyxLQUFLO1FBQ0csVUFBSyxHQUE0QixJQUFJLENBQUM7SUF5RGxELENBQUM7SUF2REcsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLEtBQUs7SUFFZixDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFUyxhQUFhO1FBQ25CLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV0QixJQUFJLGdDQUFzQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkU7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBNkI7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXBCLENBQUM7Q0FFSixDQUFBO0FBbEZHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1k7QUFFOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDWTtBQUU5QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNZO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ2dCO0FBR25DO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkRBQ21CO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NERBQ2tCO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ2lCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ2U7QUFHbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDYTtBQTFCaEIsdUJBQXVCO0lBRjNDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLHVCQUF1QixDQXNGM0M7a0JBdEZvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IENyYXNoQ29sb3JEZWZpbmUgfSBmcm9tIFwiLi4vLi4vLi4vY3Jhc2gvc2NyaXB0L2RlZmluZS9DcmFzaENvbG9yRGVmaW5lXCI7XG5pbXBvcnQgeyBDcmFzaFJhdGVEZWZpbmUgfSBmcm9tIFwiLi4vLi4vLi4vY3Jhc2gvc2NyaXB0L2RlZmluZS9DcmFzaFJhdGVEZWZpbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdWxldHRlVG90YWxSZWNvcmRJdGVtIGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBpY29uMDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBpY29uMTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBpY29uMjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJHYW1lTm86IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJvdW5kSGFzaDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiSGFzaFNhbHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJvdW5kTm86IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkNoZWNrOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nTGluZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8g5pWw5o2uXG4gICAgcHJpdmF0ZSBfZGF0YTogTVNULklSb3VsZXR0ZUdhbWVSZWNvcmQgPSBudWxsO1xuXG4gICAgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkdhbWVOby5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlJvdW5kSGFzaC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkhhc2hTYWx0LnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiUm91bmROby5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmljb24wLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmljb24xLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmljb24yLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmxhYlJvdW5kSGFzaC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiUm91bmRIYXNoXCIsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3coZGF0YTogTVNULklSb3VsZXR0ZUdhbWVSZWNvcmQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5sYWJHYW1lTm8ubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShbXCJsYWJHYW1lTm9cIiwgZGF0YS5yb3VuZF0sIHRydWUpO1xuICAgICAgICB0aGlzLmxhYkhhc2hTYWx0LnN0cmluZyA9IGRhdGEuaGFzaFNhbHQ7XG4gICAgICAgIHRoaXMubGFiUm91bmRIYXNoLnN0cmluZyA9IGRhdGEucm91bmRIYXNoO1xuICAgICAgICB0aGlzLmxhYlJvdW5kTm8uc3RyaW5nID0gU3RyaW5nKGRhdGEucmFuZG9tTm8pO1xuICAgICAgICB0aGlzW2BpY29uJHtkYXRhLmNvbG9yfWBdLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcblxuICAgIH1cblxufVxuIl19