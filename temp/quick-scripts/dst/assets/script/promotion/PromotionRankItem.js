
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/promotion/PromotionRankItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c688e1v7ppLPKbWtEtymmhv', 'PromotionRankItem');
// script/promotion/PromotionRankItem.ts

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
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let PromotionRankItem = class PromotionRankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgRank = null;
        this.labRank = null;
        this.imgAvatar = null;
        this.labNick = null;
        this.labIncome = null;
        this.spfRankList = [];
        this._data = null;
        // update (dt) {}
    }
    onLoad() {
        this.initData();
        this.initUI();
    }
    start() {
    }
    initData() {
        this._data = null;
    }
    initUI() {
        this.imgRank.node.active = false;
        this.labRank.string = "";
        this.imgAvatar.spriteFrame = null;
        this.labNick.string = "";
        this.labIncome.string = "";
    }
    refreshRank() {
        if (this._data.rank <= 3) {
            this.labRank.string = "";
            this.imgRank.spriteFrame = this.spfRankList[this._data.rank - 1];
            this.imgRank.node.active = true;
        }
        else {
            this.imgRank.node.active = false;
            this.labRank.string = this._data.rank.toString();
        }
    }
    refreshPlayer() {
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, this._data.data.userInfo.HeaderUrl, this._data.data.userInfo.UnitId, this);
        this.labNick.string = this._data.data.userInfo.Nick;
    }
    refreshIncome() {
        this.labIncome.string = NumberUtils_1.default.converToC(this._data.data.incomeGold);
    }
    onShow(data) {
        this._data = data;
        this.initUI();
        this.refreshRank();
        this.refreshPlayer();
        this.refreshIncome();
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Sprite)
], PromotionRankItem.prototype, "imgRank", void 0);
__decorate([
    property(cc.Label)
], PromotionRankItem.prototype, "labRank", void 0);
__decorate([
    property(cc.Sprite)
], PromotionRankItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], PromotionRankItem.prototype, "labNick", void 0);
__decorate([
    property(cc.Label)
], PromotionRankItem.prototype, "labIncome", void 0);
__decorate([
    property([cc.SpriteFrame])
], PromotionRankItem.prototype, "spfRankList", void 0);
PromotionRankItem = __decorate([
    ccclass
], PromotionRankItem);
exports.default = PromotionRankItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcHJvbW90aW9uL1Byb21vdGlvblJhbmtJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQXNEO0FBRXRELG9FQUE0QztBQUM1QywrQ0FBNEM7QUFHNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxnQkFBTTtJQUFyRDs7UUFHWSxZQUFPLEdBQWMsSUFBSSxDQUFDO1FBRzFCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsY0FBUyxHQUFjLElBQUksQ0FBQztRQUc1QixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsZ0JBQVcsR0FBcUIsRUFBRSxDQUFDO1FBRW5DLFVBQUssR0FBMkMsSUFBSSxDQUFDO1FBeUQ3RCxpQkFBaUI7SUFDckIsQ0FBQztJQXhERyxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVPLE1BQU07UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sV0FBVztRQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDbkM7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBRU8sYUFBYTtRQUNqQixpQkFBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3hELENBQUM7SUFFTyxhQUFhO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHFCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBNEM7UUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FHSixDQUFBO0FBM0VHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ2M7QUFHbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDYztBQUdqQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNnQjtBQUdwQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ2dCO0FBR25DO0lBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3NEQUNnQjtBQWxCMUIsaUJBQWlCO0lBRHJDLE9BQU87R0FDYSxpQkFBaUIsQ0E4RXJDO2tCQTlFb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgeyBQcm9tb3Rpb25JbnRlcmZhY2UgfSBmcm9tIFwiLi9Qcm9tb3Rpb25JbnRlcmZhY2VcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb21vdGlvblJhbmtJdGVtIGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdSYW5rOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUmFuazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0F2YXRhcjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYk5pY2s6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkluY29tZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgcHJpdmF0ZSBzcGZSYW5rTGlzdDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfZGF0YTogUHJvbW90aW9uSW50ZXJmYWNlLlBsYXllckJyb2tlcmFnZVJhbmsgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRVSSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWdSYW5rLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGFiUmFuay5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmltZ0F2YXRhci5zcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFiTmljay5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkluY29tZS5zdHJpbmcgPSBcIlwiO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFJhbmsoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhLnJhbmsgPD0gMykge1xuICAgICAgICAgICAgdGhpcy5sYWJSYW5rLnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmltZ1Jhbmsuc3ByaXRlRnJhbWUgPSB0aGlzLnNwZlJhbmtMaXN0W3RoaXMuX2RhdGEucmFuayAtIDFdO1xuICAgICAgICAgICAgdGhpcy5pbWdSYW5rLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW1nUmFuay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sYWJSYW5rLnN0cmluZyA9IHRoaXMuX2RhdGEucmFuay50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoUGxheWVyKCk6IHZvaWQge1xuICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKHRoaXMuaW1nQXZhdGFyLCB0aGlzLl9kYXRhLmRhdGEudXNlckluZm8uSGVhZGVyVXJsLCB0aGlzLl9kYXRhLmRhdGEudXNlckluZm8uVW5pdElkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5sYWJOaWNrLnN0cmluZyA9IHRoaXMuX2RhdGEuZGF0YS51c2VySW5mby5OaWNrO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEluY29tZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJJbmNvbWUuc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKHRoaXMuX2RhdGEuZGF0YS5pbmNvbWVHb2xkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KGRhdGE6IFByb21vdGlvbkludGVyZmFjZS5QbGF5ZXJCcm9rZXJhZ2VSYW5rKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaFJhbmsoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUGxheWVyKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEluY29tZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=