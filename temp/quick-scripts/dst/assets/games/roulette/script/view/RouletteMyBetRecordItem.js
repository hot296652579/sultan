
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteMyBetRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0af6bjfIfRIma8ArBlKoqOx', 'RouletteMyBetRecordItem');
// games/roulette/script/view/RouletteMyBetRecordItem.ts

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
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const RouletteColorDefine_1 = require("../define/RouletteColorDefine");
const { ccclass, property } = cc._decorator;
let RouletteMyBetRecordItem = class RouletteMyBetRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon0 = null;
        this.icon1 = null;
        this.icon2 = null;
        this.labGameNo = null;
        this.labBetChips = null;
        this.labWinChips = null;
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
        this.labBetChips.string = "";
        this.labWinChips.string = "";
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
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labGameNo.language = Manager_1.Manager.makeLanguage(["labGameNo", data.round], true);
        this[`icon${data.color}`].active = true;
        this.labBetChips.string = String(NumberUtils_1.default.converToC(data.betChips));
        this.labWinChips.string = String(NumberUtils_1.default.converToC(data.winChips));
        this.labWinChips.node.color = this.getIncomeColor(data.winChips);
    }
    getIncomeColor(incomeGold) {
        let color = null;
        if (incomeGold < 0) {
            color = RouletteColorDefine_1.RouletteColorDefine.ProfitLoss.RED;
        }
        else if (incomeGold > 0) {
            color = RouletteColorDefine_1.RouletteColorDefine.ProfitLoss.GREEN;
        }
        else {
            color = RouletteColorDefine_1.RouletteColorDefine.ProfitLoss.NORMAL;
        }
        return color;
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Node)
], RouletteMyBetRecordItem.prototype, "icon0", void 0);
__decorate([
    property(cc.Node)
], RouletteMyBetRecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RouletteMyBetRecordItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordItem.prototype, "labGameNo", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordItem.prototype, "labBetChips", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordItem.prototype, "labWinChips", void 0);
__decorate([
    property(cc.Sprite)
], RouletteMyBetRecordItem.prototype, "imgLine", void 0);
RouletteMyBetRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteMyBetRecordItem);
exports.default = RouletteMyBetRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZU15QmV0UmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFDMUUsOEZBQXNFO0FBQ3RFLHVFQUFtRjtBQUVuRixrRkFBa0Y7QUFDbEYsMEVBQXVFO0FBR3ZFLG9GQUE0RDtBQUc1RCx1RUFBb0U7QUFFcEUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLHVCQUF1QixHQUE1QyxNQUFxQix1QkFBd0IsU0FBUSxnQkFBTTtJQUEzRDs7UUFJWSxVQUFLLEdBQVksSUFBSSxDQUFDO1FBRXRCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFFdEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUd0QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFFakMsS0FBSztRQUNHLFVBQUssR0FBMkIsSUFBSSxDQUFDO0lBb0VqRCxDQUFDO0lBbEVHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxLQUFLO0lBRWYsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcs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cG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi91dGlscy9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IHsgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IERhdGVVdGlscyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlbnRpb25zL0RhdGVVdGlsc1wiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgQ3Jhc2hDb2xvckRlZmluZSB9IGZyb20gXCIuLi8uLi8uLi9jcmFzaC9zY3JpcHQvZGVmaW5lL0NyYXNoQ29sb3JEZWZpbmVcIjtcbmltcG9ydCB7IENyYXNoUmF0ZURlZmluZSB9IGZyb20gXCIuLi8uLi8uLi9jcmFzaC9zY3JpcHQvZGVmaW5lL0NyYXNoUmF0ZURlZmluZVwiO1xuaW1wb3J0IHsgUm91bGV0dGVDb2xvckRlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvUm91bGV0dGVDb2xvckRlZmluZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91bGV0dGVNeUJldFJlY29yZEl0ZW0gZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGljb24wOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGljb24xOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGljb24yOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkdhbWVObzogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQmV0Q2hpcHM6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJXaW5DaGlwczogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0xpbmU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIOaVsOaNrlxuICAgIHByaXZhdGUgX2RhdGE6IE1TVC5JUm91bGV0dGVCZXREZXRhaWwgPSBudWxsO1xuXG4gICAgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkdhbWVOby5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkJldENoaXBzLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiV2luQ2hpcHMuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5pY29uMC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pY29uMS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pY29uMi5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIGlmIChFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuQ0hBTkdFX0xBTkdVQUdFLCB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3coZGF0YTogTVNULklSb3VsZXR0ZUJldERldGFpbCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcblxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcblxuICAgICAgICB0aGlzLmxhYkdhbWVOby5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcImxhYkdhbWVOb1wiLCBkYXRhLnJvdW5kXSwgdHJ1ZSk7XG4gICAgICAgIHRoaXNbYGljb24ke2RhdGEuY29sb3J9YF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYWJCZXRDaGlwcy5zdHJpbmcgPSBTdHJpbmcoTnVtYmVyVXRpbHMuY29udmVyVG9DKGRhdGEuYmV0Q2hpcHMpKTtcbiAgICAgICAgdGhpcy5sYWJXaW5DaGlwcy5zdHJpbmcgPSBTdHJpbmcoTnVtYmVyVXRpbHMuY29udmVyVG9DKGRhdGEud2luQ2hpcHMpKTtcbiAgICAgICAgdGhpcy5sYWJXaW5DaGlwcy5ub2RlLmNvbG9yID0gdGhpcy5nZXRJbmNvbWVDb2xvcihkYXRhLndpbkNoaXBzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluY29tZUNvbG9yKGluY29tZUdvbGQ6IG51bWJlciB8IExvbmcpOiBjYy5Db2xvciB7XG4gICAgICAgIGxldCBjb2xvcjogY2MuQ29sb3IgPSBudWxsO1xuICAgICAgICBpZiAoaW5jb21lR29sZCA8IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gUm91bGV0dGVDb2xvckRlZmluZS5Qcm9maXRMb3NzLlJFRDtcbiAgICAgICAgfSBlbHNlIGlmIChpbmNvbWVHb2xkID4gMCkge1xuICAgICAgICAgICAgY29sb3IgPSBSb3VsZXR0ZUNvbG9yRGVmaW5lLlByb2ZpdExvc3MuR1JFRU47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xvciA9IFJvdWxldHRlQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5OT1JNQUw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG5cbiAgICB9XG5cbn1cbiJdfQ==