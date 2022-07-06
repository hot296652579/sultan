
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/MultiCurrency/MultiCurrencyIconSwitch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a193GeHARJW5t4+R9sL06w', 'MultiCurrencyIconSwitch');
// script/MultiCurrency/MultiCurrencyIconSwitch.ts

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
const Defines_1 = require("../framework/base/Defines");
const User_1 = require("../global/User");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
const _MultiCurrencyIconBaseUrl = 'MultiCurrency/images/icon/gold_';
var GOLD_IMG_TYPE;
(function (GOLD_IMG_TYPE) {
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_White"] = 2] = "Gold_White";
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_Red"] = 3] = "Gold_Red";
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_Hearts"] = 4] = "Gold_Hearts";
    GOLD_IMG_TYPE[GOLD_IMG_TYPE["Gold_Tournament"] = 5] = "Gold_Tournament";
})(GOLD_IMG_TYPE || (GOLD_IMG_TYPE = {}));
let MultiCurrencyIconSwitch = class MultiCurrencyIconSwitch extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.real_Gold_Type = GOLD_IMG_TYPE.Gold_White;
        this.sprite = null;
    }
    onLoad() {
        super.onLoad();
        this.sprite = this.node.getComponent(cc.Sprite);
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.toUpdataMultiCurrencyIcon();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("updataMultiCurrencyIcon", this.toUpdataMultiCurrencyIcon);
    }
    toUpdataMultiCurrencyIcon(goldSpriteName = null) {
        this.sprite.spriteFrame = null;
        //icon  0 是筹码 1是金币
        let url;
        if (goldSpriteName == null) {
            url = _MultiCurrencyIconBaseUrl + (User_1.User.isRechargedPlayer ? this.real_Gold_Type : User_1.User._goldType);
        }
        else {
            url = _MultiCurrencyIconBaseUrl + goldSpriteName;
        }
        this.sprite.loadImage({ url: url, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
    }
};
__decorate([
    property({
        tooltip: "Gold_White:白色筹码，Gold_Red：红色筹码，Gold_Hearts：红心筹码",
        type: cc.Enum(GOLD_IMG_TYPE),
    })
], MultiCurrencyIconSwitch.prototype, "real_Gold_Type", void 0);
MultiCurrencyIconSwitch = __decorate([
    ccclass
], MultiCurrencyIconSwitch);
exports.default = MultiCurrencyIconSwitch;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvTXVsdGlDdXJyZW5jeS9NdWx0aUN1cnJlbmN5SWNvblN3aXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUE2RDtBQUM3RCx5Q0FBc0M7QUFDdEMsb0VBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUM1QyxNQUFNLHlCQUF5QixHQUFHLGlDQUFpQyxDQUFBO0FBQ25FLElBQUssYUFLSjtBQUxELFdBQUssYUFBYTtJQUNkLDZEQUFjLENBQUE7SUFDZCx5REFBWSxDQUFBO0lBQ1osK0RBQWUsQ0FBQTtJQUNmLHVFQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFMSSxhQUFhLEtBQWIsYUFBYSxRQUtqQjtBQUVELElBQXFCLHVCQUF1QixHQUE1QyxNQUFxQix1QkFBd0IsU0FBUSxnQkFBTTtJQUEzRDs7UUFNSSxtQkFBYyxHQUFrQixhQUFhLENBQUMsVUFBVSxDQUFDO1FBQ3pELFdBQU0sR0FBYyxJQUFJLENBQUE7SUF1QjVCLENBQUM7SUF0QkcsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNqRCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCx5QkFBeUIsQ0FBQyxjQUFjLEdBQUcsSUFBSTtRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDL0Isa0JBQWtCO1FBQ2xCLElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxjQUFjLElBQUksSUFBSSxFQUFFO1lBQ3hCLEdBQUcsR0FBRyx5QkFBeUIsR0FBRyxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JHO2FBQU07WUFDSCxHQUFHLEdBQUcseUJBQXlCLEdBQUcsY0FBYyxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0NBQ0osQ0FBQTtBQXhCRztJQUpDLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxnREFBZ0Q7UUFDekQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0tBQy9CLENBQUM7K0RBQ3VEO0FBTnhDLHVCQUF1QjtJQUQzQyxPQUFPO0dBQ2EsdUJBQXVCLENBOEIzQztrQkE5Qm9CLHVCQUF1QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudENvbXBvbmVudCBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRXZlbnRDb21wb25lbnRcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuY29uc3QgX011bHRpQ3VycmVuY3lJY29uQmFzZVVybCA9ICdNdWx0aUN1cnJlbmN5L2ltYWdlcy9pY29uL2dvbGRfJ1xuZW51bSBHT0xEX0lNR19UWVBFIHtcbiAgICBHb2xkX1doaXRlID0gMiwvL1xuICAgIEdvbGRfUmVkID0gMyxcbiAgICBHb2xkX0hlYXJ0cyA9IDQsXG4gICAgR29sZF9Ub3VybmFtZW50ID0gNSxcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aUN1cnJlbmN5SWNvblN3aXRjaCBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0b29sdGlwOiBcIkdvbGRfV2hpdGU655m96Imy562556CB77yMR29sZF9SZWTvvJrnuqLoibLnrbnnoIHvvIxHb2xkX0hlYXJ0c++8mue6ouW/g+etueeggVwiLFxuICAgICAgICB0eXBlOiBjYy5FbnVtKEdPTERfSU1HX1RZUEUpLFxuICAgIH0pXG4gICAgcmVhbF9Hb2xkX1R5cGU6IEdPTERfSU1HX1RZUEUgPSBHT0xEX0lNR19UWVBFLkdvbGRfV2hpdGU7XG4gICAgc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHRoaXMuc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgdGhpcy50b1VwZGF0YU11bHRpQ3VycmVuY3lJY29uKCk7XG4gICAgfVxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwidXBkYXRhTXVsdGlDdXJyZW5jeUljb25cIiwgdGhpcy50b1VwZGF0YU11bHRpQ3VycmVuY3lJY29uKTtcbiAgICB9XG4gICAgdG9VcGRhdGFNdWx0aUN1cnJlbmN5SWNvbihnb2xkU3ByaXRlTmFtZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICAvL2ljb24gIDAg5piv562556CBIDHmmK/ph5HluIFcbiAgICAgICAgbGV0IHVybDtcbiAgICAgICAgaWYgKGdvbGRTcHJpdGVOYW1lID09IG51bGwpIHtcbiAgICAgICAgICAgIHVybCA9IF9NdWx0aUN1cnJlbmN5SWNvbkJhc2VVcmwgKyAoVXNlci5pc1JlY2hhcmdlZFBsYXllciA/IHRoaXMucmVhbF9Hb2xkX1R5cGUgOiBVc2VyLl9nb2xkVHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwgPSBfTXVsdGlDdXJyZW5jeUljb25CYXNlVXJsICsgZ29sZFNwcml0ZU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwcml0ZS5sb2FkSW1hZ2UoeyB1cmw6IHVybCwgdmlldzogdGhpcywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pXG4gICAgfVxufVxuIl19