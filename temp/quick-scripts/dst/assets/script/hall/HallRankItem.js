
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallRankItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '869cbP+eBtE3bSJmh+fcpAi', 'HallRankItem');
// script/hall/HallRankItem.ts

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
let HallRankItem = class HallRankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.index = null;
        this.uname = null;
        this.userId = null;
        this.gold = null;
        this.imgAvatar = null;
        this.icon = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.node.opacity = 0;
        this.index.string = "";
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            dispatch('openRankInfo', []);
        });
    }
    updateItem(data, itemId) {
        this.index.string = itemId + 3;
        this.uname.string = UtilMgr_1.UtilMgr.setString(data.Nick);
        this.userId.string = data.AccountId;
        this.gold.string = `Rp ${data.Score}`;
        let imgAvatar = this.imgAvatar.getComponent(cc.Sprite);
        if (data.headImgUrl)
            UtilMgr_1.UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this);
    }
    onClick(event) {
        console.log(event);
    }
};
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "index", void 0);
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "userId", void 0);
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "gold", void 0);
__decorate([
    property(cc.Node)
], HallRankItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Sprite)
], HallRankItem.prototype, "icon", void 0);
HallRankItem = __decorate([
    ccclass
], HallRankItem);
exports.default = HallRankItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsUmFua0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxvRUFBNEM7QUFDNUMsK0NBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxnQkFBTTtJQUFoRDs7UUFFSSxVQUFLLEdBQWEsSUFBSSxDQUFDO1FBSXZCLFVBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsV0FBTSxHQUFhLElBQUksQ0FBQztRQUd4QixTQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsU0FBSSxHQUFjLElBQUksQ0FBQztRQTJCdkIsaUJBQWlCO0lBQ3JCLENBQUM7SUExQkcsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUMzQyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTTtRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXRDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQ2YsaUJBQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM5RSxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUs7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3RCLENBQUM7Q0FHSixDQUFBO0FBNUNHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ0k7QUFJdkI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyQ0FDSTtBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzRDQUNLO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MENBQ0c7QUFHdEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBDQUNHO0FBbEJOLFlBQVk7SUFEaEMsT0FBTztHQUNhLFlBQVksQ0E4Q2hDO2tCQTlDb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsUmFua0l0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpbmRleDogY2MuTGFiZWwgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdW5hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB1c2VySWQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBnb2xkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpbWdBdmF0YXI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLmluZGV4LnN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goJ29wZW5SYW5rSW5mbycsIFtdKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGRhdGEsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmluZGV4LnN0cmluZyA9IGl0ZW1JZCArIDNcbiAgICAgICAgdGhpcy51bmFtZS5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhkYXRhLk5pY2spO1xuICAgICAgICB0aGlzLnVzZXJJZC5zdHJpbmcgPSBkYXRhLkFjY291bnRJZDtcbiAgICAgICAgdGhpcy5nb2xkLnN0cmluZyA9IGBScCAke2RhdGEuU2NvcmV9YDtcblxuICAgICAgICBsZXQgaW1nQXZhdGFyID0gdGhpcy5pbWdBdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGlmIChkYXRhLmhlYWRJbWdVcmwpXG4gICAgICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKGltZ0F2YXRhciwgZGF0YS5oZWFkSW1nVXJsLCBkYXRhLmhlYWRJbWdVcmwsIHRoaXMpXG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudClcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19