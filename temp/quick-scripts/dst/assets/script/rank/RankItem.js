
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/rank/RankItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92056MyFo9C+b9f4JZHURdd', 'RankItem');
// script/rank/RankItem.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RankItem = class RankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.index = null;
        this.uname = null;
        this.userId = null;
        this.gold = null;
        this.head = null;
        this.icon1 = null;
        this.icon2 = null;
        this.icon3 = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.opacity = 0;
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.index.string = "";
    }
    updateItem(data, itemId) {
        if (data.id == 1) {
            this.icon1.active = true;
        }
        else if (data.id == 2) {
            this.icon2.active = true;
        }
        else if (data.id == 3) {
            this.icon3.active = true;
        }
        else {
            this.icon1.active = false;
            this.icon2.active = false;
            this.icon3.active = false;
            this.index.string = data.id;
        }
        this.uname.string = UtilMgr_1.UtilMgr.setString(data.nickName);
        this.userId.string = data.userId;
        this.gold.string = UtilMgr_1.UtilMgr.changeMoney(data.gold);
        UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Label)
], RankItem.prototype, "index", void 0);
__decorate([
    property(cc.Label)
], RankItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], RankItem.prototype, "userId", void 0);
__decorate([
    property(cc.Label)
], RankItem.prototype, "gold", void 0);
__decorate([
    property(cc.Sprite)
], RankItem.prototype, "head", void 0);
__decorate([
    property(cc.Node)
], RankItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RankItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Node)
], RankItem.prototype, "icon3", void 0);
RankItem = __decorate([
    ccclass
], RankItem);
exports.default = RankItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmFuay9SYW5rSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9FQUE0QztBQUM1QywrQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLFFBQVEsR0FBN0IsTUFBcUIsUUFBUyxTQUFRLGdCQUFNO0lBQTVDOztRQUVJLFVBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsVUFBSyxHQUFhLElBQUksQ0FBQztRQUd2QixXQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFHdEIsU0FBSSxHQUFjLElBQUksQ0FBQztRQUd2QixVQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQTRDdEIsaUJBQWlCO0lBQ3JCLENBQUM7SUEzQ0csTUFBTTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTTtRQUNuQixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDNUI7YUFBTSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM1QjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUI7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FHSixDQUFBO0FBbEVHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dUNBQ0k7QUFHdkI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1Q0FDSTtBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dDQUNLO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0NBQ0c7QUFHdEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzQ0FDRztBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VDQUNJO0FBR3RCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dUNBQ0k7QUFHdEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1Q0FDSTtBQXZCTCxRQUFRO0lBRDVCLE9BQU87R0FDYSxRQUFRLENBb0U1QjtrQkFwRW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFua0l0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmRleDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHVuYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdXNlcklkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZ29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBoZWFkOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaWNvbjE6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaWNvbjI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaWNvbjM6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgIHRoaXMuaWNvbjEuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvbjIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvbjMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5kZXguc3RyaW5nID0gXCJcIjtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGRhdGEsIGl0ZW1JZCkge1xuICAgICAgICBpZiAoZGF0YS5pZCA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmljb24xLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pZCA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmljb24yLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pZCA9PSAzKSB7XG4gICAgICAgICAgICB0aGlzLmljb24zLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmljb24xLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pY29uMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaWNvbjMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluZGV4LnN0cmluZyA9IGRhdGEuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYW1lLnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKGRhdGEubmlja05hbWUpO1xuICAgICAgICB0aGlzLnVzZXJJZC5zdHJpbmcgPSBkYXRhLnVzZXJJZDtcbiAgICAgICAgdGhpcy5nb2xkLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5nb2xkKTtcbiAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLmhlYWQsIGRhdGEuaGVhZEltZ1VybCwgZGF0YS51c2VySWQsIHRoaXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbei/m+WFpVNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkVudGVyU3Jjb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbeemu+W8gFNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkV4aXRTY3JvbGxWaWV3KCkge1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==