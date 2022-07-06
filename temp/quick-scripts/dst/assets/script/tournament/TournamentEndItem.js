
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/TournamentEndItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a32eeGG/INJ4K3SDsHgw5wg', 'TournamentEndItem');
// script/tournament/TournamentEndItem.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let TournamentEndItem = class TournamentEndItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.rank = null;
        this.userid = null;
        this.nickname = null;
        this.bonus = null;
    }
    onLoad() {
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        this.rank.string = data.rank.toString();
        this.userid.string = data.userId.toString();
        this.nickname.string = UtilMgr_1.UtilMgr.setString(data.nickname);
        this.bonus.string = UtilMgr_1.UtilMgr.changeMoney(data.bonus);
    }
};
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "rank", void 0);
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "userid", void 0);
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "nickname", void 0);
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "bonus", void 0);
TournamentEndItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TournamentEndItem);
exports.default = TournamentEndItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Ub3VybmFtZW50RW5kSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRGQUFvRTtBQUNwRSw2REFBMEQ7QUFDMUQsa0VBQWtFO0FBRWxFLCtDQUE0QztBQUM1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLDBCQUFnQjtJQUEvRDs7UUFHSSxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLFdBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixVQUFLLEdBQWEsSUFBSSxDQUFDO0lBYzNCLENBQUM7SUFaRyxNQUFNO0lBRU4sQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFrRCxFQUFFLE1BQU07UUFDakUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFeEQsQ0FBQztDQUNKLENBQUE7QUF2Qkc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDRztBQUd0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNLO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ087QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDSTtBQVpOLGlCQUFpQjtJQUZyQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixpQkFBaUIsQ0EwQnJDO2tCQTFCb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbCB9IGZyb20gXCJwcm90b2J1ZmpzXCI7XG5pbXBvcnQgU2Nyb1ZpZXdCYXNlSXRlbSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0Jhc2VJdGVtXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvdXJuYW1lbnRFbmRJdGVtIGV4dGVuZHMgU2Nyb1ZpZXdCYXNlSXRlbSB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByYW5rOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdXNlcmlkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbmlja25hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBib251czogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbShkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklUb3VybmFtZW50U2lnblVwVXNlciwgaXRlbUlkKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKTtcbiAgICAgICAgdGhpcy5yYW5rLnN0cmluZyA9IGRhdGEucmFuay50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnVzZXJpZC5zdHJpbmcgPSBkYXRhLnVzZXJJZC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLm5pY2tuYW1lLnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKGRhdGEubmlja25hbWUpO1xuICAgICAgICB0aGlzLmJvbnVzLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5ib251cyk7XG5cbiAgICB9XG59XG4iXX0=