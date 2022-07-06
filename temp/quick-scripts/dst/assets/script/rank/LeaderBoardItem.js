
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/rank/LeaderBoardItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '15747K2ICBK2bNN9K+nPBUV', 'LeaderBoardItem');
// script/rank/LeaderBoardItem.ts

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
const ScroViewBaseItem_1 = __importDefault(require("../common/component/ScroViewBaseItem"));
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let LeaderBoardItem = class LeaderBoardItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.index = null;
        this.uname = null;
        this.reward = null;
        this.gold = null;
        this.head = null;
        this.icon1 = null;
        this.icon2 = null;
        this.icon3 = null;
        this.bg = null;
        this.bg2 = null;
        this.view = null;
    }
    onLoad() {
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.index.string = "";
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            if (data.rank == 1) {
                this.icon1.active = true;
                this.index.string = "";
            }
            else if (data.rank == 2) {
                this.icon2.active = true;
                this.index.string = "";
            }
            else if (data.rank == 3) {
                this.icon3.active = true;
                this.index.string = "";
            }
            else {
                this.icon1.active = false;
                this.icon2.active = false;
                this.icon3.active = false;
                this.index.string = data.rank;
            }
            this.bg.active = data.userId === User_1.User._userID;
            this.bg2.active = !this.bg.active;
            this.uname.string = UtilMgr_1.UtilMgr.setString(data.nickname);
            this.gold.string = UtilMgr_1.UtilMgr.changeMoney(data.winGold, true, true);
            this.reward.string = UtilMgr_1.UtilMgr.changeMoney(data.reward);
            this.reward.node.color = new cc.Color().fromHEX(data.rank <= 3 ? "#7DFFFD" : "#00FF66");
            this.reward.fontSize = data.rank <= 3 ? 30 : 24;
            UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImg, data.userId, this.view);
        }
    }
};
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "index", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "reward", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardItem.prototype, "gold", void 0);
__decorate([
    property(cc.Sprite)
], LeaderBoardItem.prototype, "head", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "icon3", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "bg", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardItem.prototype, "bg2", void 0);
__decorate([
    property(UIView_1.default)
], LeaderBoardItem.prototype, "view", void 0);
LeaderBoardItem = __decorate([
    ccclass
], LeaderBoardItem);
exports.default = LeaderBoardItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmFuay9MZWFkZXJCb2FyZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RkFBb0U7QUFDcEUsb0VBQTRDO0FBQzVDLHlDQUFzQztBQUN0QywrQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZ0IsU0FBUSwwQkFBZ0I7SUFBN0Q7O1FBRUksVUFBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLFdBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsU0FBSSxHQUFhLElBQUksQ0FBQztRQUd0QixTQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUd0QixVQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLE9BQUUsR0FBWSxJQUFJLENBQUM7UUFHbkIsUUFBRyxHQUFZLElBQUksQ0FBQztRQUdwQixTQUFJLEdBQVcsSUFBSSxDQUFDO0lBdUN4QixDQUFDO0lBckNHLE1BQU07UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUMsTUFBTTtRQUNsQixLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFHLElBQUksRUFBQztZQUNKLElBQUksSUFBSSxD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Qzs4Q0FDSTtBQUd0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNDO0FBR25CO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0U7QUFHcEI7SUFEQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQzs2Q0FDRztBQWhDSCxlQUFlO0lBRG5DLE9BQU87R0FDYSxlQUFlLENBdUVuQztrQkF2RW9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2Nyb1ZpZXdCYXNlSXRlbSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0Jhc2VJdGVtXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFkZXJCb2FyZEl0ZW0gZXh0ZW5kcyBTY3JvVmlld0Jhc2VJdGVtIHtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaW5kZXg6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB1bmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHJld2FyZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGljb24xOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGljb24yOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGljb24zOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJnOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJnMjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoVUlWaWV3KVxuICAgIHZpZXc6IFVJVmlldyA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuaWNvbjEuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvbjIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvbjMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5kZXguc3RyaW5nID0gXCJcIjtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGRhdGEsaXRlbUlkKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKTtcbiAgICAgICAgaWYoZGF0YSl7XG4gICAgICAgICAgICBpZiAoZGF0YS5yYW5rID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb24xLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJhbmsgPT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbjIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4LnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmFuayA9PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uMy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXguc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uMS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmljb24yLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbjMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleC5zdHJpbmcgPSBkYXRhLnJhbms7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLmJnLmFjdGl2ZSA9IGRhdGEudXNlcklkID09PSBVc2VyLl91c2VySUQ7XG4gICAgICAgICAgICB0aGlzLmJnMi5hY3RpdmUgPSAhdGhpcy5iZy5hY3RpdmU7IFxuICAgICAgICAgICAgdGhpcy51bmFtZS5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhkYXRhLm5pY2tuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZ29sZC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEud2luR29sZCx0cnVlLHRydWUpO1xuICAgICAgICAgICAgdGhpcy5yZXdhcmQuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShkYXRhLnJld2FyZCk7XG4gICAgICAgICAgICB0aGlzLnJld2FyZC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChkYXRhLnJhbmsgPD0gMyA/IFwiIzdERkZGRFwiIDogXCIjMDBGRjY2XCIpO1xuICAgICAgICAgICAgdGhpcy5yZXdhcmQuZm9udFNpemUgPSBkYXRhLnJhbmsgPD0gMyA/IDMwIDogMjQ7XG4gICAgICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKHRoaXMuaGVhZCwgZGF0YS5oZWFkSW1nLCBkYXRhLnVzZXJJZCwgdGhpcy52aWV3KVxuICAgICAgICB9XG4gICAgICBcbiAgICB9XG59XG4iXX0=