
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/view/WingoTitleItemPageUser.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e2750cs7/JKALJhhKtmz8U5', 'WingoTitleItemPageUser');
// games/wingo/script/view/WingoTitleItemPageUser.ts

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
const TitleItemPageUser_1 = __importDefault(require("../../../../script/common/item/TitleItemPageUser"));
const WingoData_1 = __importDefault(require("../data/WingoData"));
const { ccclass, property } = cc._decorator;
let WingoTitleItemPageUser = class WingoTitleItemPageUser extends TitleItemPageUser_1.default {
    constructor() {
        super(...arguments);
        // Wingo 游戏数据
        this._wingoData = null;
    }
    onLoad() {
        super.onLoad();
    }
    initData() {
        super.initData();
        this._wingoData = G.DataMgr.get(WingoData_1.default);
    }
    onEvent_M2C_GoldChange_Mes(oldGold) {
        if (this._wingoData.isPlayingLotteryAnim) {
            return;
        }
        this.refreshGold();
    }
    manualRefreshGold() {
        if (!this._userData.isLogined()) {
            return;
        }
        this.refreshGold();
    }
};
WingoTitleItemPageUser = __decorate([
    ccclass
], WingoTitleItemPageUser);
exports.default = WingoTitleItemPageUser;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvdmlldy9XaW5nb1RpdGxlSXRlbVBhZ2VVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUdBQWlGO0FBRWpGLGtFQUEwQztBQUUxQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsc0JBQXNCLEdBQTNDLE1BQXFCLHNCQUF1QixTQUFRLDJCQUFpQjtJQUFyRTs7UUFFSSxhQUFhO1FBQ04sZUFBVSxHQUFjLElBQUksQ0FBQztJQTZCeEMsQ0FBQztJQTNCRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRW5CLENBQUM7SUFFUyxRQUFRO1FBQ2QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFUywwQkFBMEIsQ0FBQyxPQUFlO1FBQ2hELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRTtZQUN0QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLGlCQUFpQjtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM3QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUVKLENBQUE7QUFoQ29CLHNCQUFzQjtJQUQxQyxPQUFPO0dBQ2Esc0JBQXNCLENBZ0MxQztrQkFoQ29CLHNCQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaXRsZUl0ZW1QYWdlVXNlciBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9pdGVtL1RpdGxlSXRlbVBhZ2VVc2VyXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBXaW5nb0RhdGEgZnJvbSBcIi4uL2RhdGEvV2luZ29EYXRhXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5nb1RpdGxlSXRlbVBhZ2VVc2VyIGV4dGVuZHMgVGl0bGVJdGVtUGFnZVVzZXIge1xuXG4gICAgLy8gV2luZ28g5ri45oiP5pWw5o2uXG4gICAgcHVibGljIF93aW5nb0RhdGE6IFdpbmdvRGF0YSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5pbml0RGF0YSgpO1xuXG4gICAgICAgIHRoaXMuX3dpbmdvRGF0YSA9IEcuRGF0YU1nci5nZXQoV2luZ29EYXRhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudF9NMkNfR29sZENoYW5nZV9NZXMob2xkR29sZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl93aW5nb0RhdGEuaXNQbGF5aW5nTG90dGVyeUFuaW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEdvbGQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFudWFsUmVmcmVzaEdvbGQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fdXNlckRhdGEuaXNMb2dpbmVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEdvbGQoKTtcbiAgICB9XG5cbn0iXX0=