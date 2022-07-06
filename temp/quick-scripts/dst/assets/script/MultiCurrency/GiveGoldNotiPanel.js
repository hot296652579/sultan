
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/MultiCurrency/GiveGoldNotiPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef66dGZ2uxBFYZIs+M6CEd9', 'GiveGoldNotiPanel');
// script/MultiCurrency/GiveGoldNotiPanel.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let GiveGoldNotiPanel = class GiveGoldNotiPanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lbl_content = null;
        this.lbl_count = null;
    }
    static getPrefabUrl() {
        return "MultiCurrency/prefabs/GiveGoldNotiPanel";
    }
    show(args) {
        let data = args[0];
        this.content = this.node.getChildByName("content");
        this.showWithAction(true);
        this.lbl_content.string = String.format(LanguageImpl_1.i18n.EXPERIENCE_FIELD.GiveGold, UtilMgr_1.UtilMgr.changeMoney(data.reliefGold));
        this.lbl_count.string = String.format(LanguageImpl_1.i18n.EXPERIENCE_FIELD.residueCount, data.remainCount);
    }
    onClick() {
        this.closeWithAction();
    }
};
__decorate([
    property(cc.Label)
], GiveGoldNotiPanel.prototype, "lbl_content", void 0);
__decorate([
    property(cc.Label)
], GiveGoldNotiPanel.prototype, "lbl_count", void 0);
GiveGoldNotiPanel = __decorate([
    ccclass
], GiveGoldNotiPanel);
exports.default = GiveGoldNotiPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvTXVsdGlDdXJyZW5jeS9HaXZlR29sZE5vdGlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUM1QyxrRUFBdUQ7QUFDdkQsK0NBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsZ0JBQU07SUFBckQ7O1FBR0ksZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFFN0IsY0FBUyxHQUFhLElBQUksQ0FBQztJQWdCL0IsQ0FBQztJQWRVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8seUNBQXlDLENBQUE7SUFDcEQsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ0wsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO1FBQzdHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFDRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FDSixDQUFBO0FBbEJHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ1U7QUFFN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUTtBQUxWLGlCQUFpQjtJQURyQyxPQUFPO0dBQ2EsaUJBQWlCLENBcUJyQztrQkFyQm9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2l2ZUdvbGROb3RpUGFuZWwgZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxibF9jb250ZW50OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxibF9jb3VudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcIk11bHRpQ3VycmVuY3kvcHJlZmFicy9HaXZlR29sZE5vdGlQYW5lbFwiXG4gICAgfVxuXG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXJnc1swXTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKVxuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpXG4gICAgICAgIHRoaXMubGJsX2NvbnRlbnQuc3RyaW5nID0gU3RyaW5nLmZvcm1hdChpMThuLkVYUEVSSUVOQ0VfRklFTEQuR2l2ZUdvbGQsIFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5yZWxpZWZHb2xkKSlcbiAgICAgICAgdGhpcy5sYmxfY291bnQuc3RyaW5nID0gU3RyaW5nLmZvcm1hdChpMThuLkVYUEVSSUVOQ0VfRklFTEQucmVzaWR1ZUNvdW50LCBkYXRhLnJlbWFpbkNvdW50KTtcbiAgICB9XG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICB9XG59XG4iXX0=