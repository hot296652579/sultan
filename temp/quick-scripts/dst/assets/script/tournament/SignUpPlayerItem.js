
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/SignUpPlayerItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0727918MJxB1Jg2i0fyFZuS', 'SignUpPlayerItem');
// script/tournament/SignUpPlayerItem.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let SignUpPlayerItem = class SignUpPlayerItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.id = null;
        this.nickname = null;
        this.signUpTime = null;
        this.signUpFee = null;
    }
    onLoad() {
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        let userData = data;
        this.id.string = userData.userId + "";
        this.nickname.string = UtilMgr_1.UtilMgr.setString(userData.nickname);
        this.signUpTime.string = new Date(+userData.signUpTime).format("yyyy-MM-dd hh:mm:ss");
        this.signUpFee.string = UtilMgr_1.UtilMgr.changeMoney(userData.signUpFee);
    }
};
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "id", void 0);
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "nickname", void 0);
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "signUpTime", void 0);
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "signUpFee", void 0);
SignUpPlayerItem = __decorate([
    ccclass
], SignUpPlayerItem);
exports.default = SignUpPlayerItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9TaWduVXBQbGF5ZXJJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQW9FO0FBRXBFLCtDQUE0QztBQUM1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFpQixTQUFRLDBCQUFnQjtJQUE5RDs7UUFHSSxPQUFFLEdBQWEsSUFBSSxDQUFDO1FBR3BCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsZUFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQWEsSUFBSSxDQUFDO0lBZS9CLENBQUM7SUFiRyxNQUFNO0lBRU4sQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTTtRQUNuQixLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBaUQsSUFBSSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUNyRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUVKLENBQUE7QUF4Qkc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0Q0FDQztBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNPO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1M7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUTtBQVpWLGdCQUFnQjtJQURwQyxPQUFPO0dBQ2EsZ0JBQWdCLENBMkJwQztrQkEzQm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvVmlld0Jhc2VJdGVtIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3QmFzZUl0ZW1cIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnblVwUGxheWVySXRlbSBleHRlbmRzIFNjcm9WaWV3QmFzZUl0ZW0ge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGlkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbmlja25hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzaWduVXBUaW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2lnblVwRmVlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGRhdGEsIGl0ZW1JZCkge1xuICAgICAgICBzdXBlci51cGRhdGVJdGVtKGRhdGEsIGl0ZW1JZCk7XG4gICAgICAgIGxldCB1c2VyRGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudFNpZ25VcFVzZXIgPSBkYXRhO1xuICAgICAgICB0aGlzLmlkLnN0cmluZyA9IHVzZXJEYXRhLnVzZXJJZCArIFwiXCI7XG4gICAgICAgIHRoaXMubmlja25hbWUuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcodXNlckRhdGEubmlja25hbWUpO1xuICAgICAgICB0aGlzLnNpZ25VcFRpbWUuc3RyaW5nID0gbmV3IERhdGUoK3VzZXJEYXRhLnNpZ25VcFRpbWUpLmZvcm1hdChcInl5eXktTU0tZGQgaGg6bW06c3NcIilcbiAgICAgICAgdGhpcy5zaWduVXBGZWUuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leSh1c2VyRGF0YS5zaWduVXBGZWUpO1xuICAgIH1cblxufVxuIl19