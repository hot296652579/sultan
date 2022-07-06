
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/TournamentItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '487fbZlpjtNQK7o2tbkS7/X', 'TournamentItem');
// script/tournament/TournamentItem.ts

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
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const TournamentData_1 = __importDefault(require("./TournamentData"));
const { ccclass, property } = cc._decorator;
let TournamentItem = class TournamentItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.head = null;
        this.creatorName = null;
        this.onlinePeople = null;
        this.championReward = null;
        this.needPassWordNode = null;
        this.detailNode = null;
        this.signUpNode = null;
        this.startTime = null;
        this.startTimeNode = null;
        this.tournamentType = null;
        this.tSprte = [];
        this._data = null;
    }
    onLoad() {
        this.signUpNode.active = false;
        this.detailNode.active = false;
    }
    updateItem(data) {
        this._data = data;
        this.creatorName.string = UtilMgr_1.UtilMgr.setString(data.nickname);
        this.onlinePeople.string = data.signNum + "/" + data.totalNum;
        this.championReward.string = UtilMgr_1.UtilMgr.changeMoney(data.championReward);
        UtilMgr_1.UtilMgr.loadHeadImg(this.head, this._data.headImg, data.userId + "", this);
        this.needPassWordNode.active = !!this._data.enterPassword;
        this.startTime.string = new Date(+this._data.startTime).format("yyyy-MM-dd hh:mm:ss");
        if (data.userId == 0) { //创房ID = 0 官方赛
            data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
            this.tournamentType.spriteFrame = this.tSprte[1];
            this.startTimeNode.active = true;
        }
        else { //自建赛 
            if (data.userId == User_1.User._userID) { //我创建的
                this.detailNode.active = true;
                this.tournamentType.spriteFrame = this.tSprte[0];
            }
            else { //别人创建的
                data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
                this.tournamentType.spriteFrame = null;
            }
            this.startTimeNode.active = false;
        }
    }
    onClick(event) {
        let name = event.target.name;
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        switch (name) {
            case "detailBtn":
            case "signupBtn":
                TournamentData_1.default.getInstance().signStatus = this._data.signStatus;
                this.reqTournamentDetail();
                break;
            default:
                break;
        }
    }
    reqTournamentDetail() {
        let jsonData = {
            tournamentId: this._data.tournamentId,
        };
        let req = CommonService_1.protoPackage.hall.TournamentDetailReq.create(jsonData);
        let buffer = CommonService_1.protoPackage.hall.TournamentDetailReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentDetail, buffer);
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
    property(cc.Sprite)
], TournamentItem.prototype, "head", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "creatorName", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "onlinePeople", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "championReward", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "needPassWordNode", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "detailNode", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "signUpNode", void 0);
__decorate([
    property(cc.Label)
], TournamentItem.prototype, "startTime", void 0);
__decorate([
    property(cc.Node)
], TournamentItem.prototype, "startTimeNode", void 0);
__decorate([
    property(cc.Sprite)
], TournamentItem.prototype, "tournamentType", void 0);
__decorate([
    property(cc.SpriteFrame)
], TournamentItem.prototype, "tSprte", void 0);
TournamentItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TournamentItem);
exports.default = TournamentItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Ub3VybmFtZW50SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUFvRDtBQUNwRCwrREFBdUU7QUFDdkUsNkRBQTBEO0FBQzFELHVEQUE2RDtBQUM3RCxrRUFBa0U7QUFFbEUsb0VBQTRDO0FBQzVDLHlDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsc0VBQThDO0FBRzlDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWUsU0FBUSxnQkFBTTtJQUFsRDs7UUFJSSxTQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUdqQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixtQkFBYyxHQUFjLElBQUksQ0FBQztRQUdqQyxXQUFNLEdBQXFCLEVBQUUsQ0FBQztRQUV2QixVQUFLLEdBQXdDLElBQUksQ0FBQztJQXVFN0QsQ0FBQztJQXRFRyxNQUFNO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQXlDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FB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QUNLO0FBbENiLGNBQWM7SUFGbEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsY0FBYyxDQTJHbEM7a0JBM0dvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjcm9WaWV3QmFzZUl0ZW0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdCYXNlSXRlbVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgVG91cm5hbWVudERhdGEgZnJvbSBcIi4vVG91cm5hbWVudERhdGFcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91cm5hbWVudEl0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjcmVhdG9yTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG9ubGluZVBlb3BsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNoYW1waW9uUmV3YXJkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBuZWVkUGFzc1dvcmROb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRldGFpbE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2lnblVwTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RhcnRUaW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzdGFydFRpbWVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgdG91cm5hbWVudFR5cGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgdFNwcnRlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwdWJsaWMgX2RhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVRvdXJuYW1lbnRQID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2lnblVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZXRhaWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW0oZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudFApIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuY3JlYXRvck5hbWUuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcoZGF0YS5uaWNrbmFtZSk7XG4gICAgICAgIHRoaXMub25saW5lUGVvcGxlLnN0cmluZyA9IGRhdGEuc2lnbk51bSArIFwiL1wiICsgZGF0YS50b3RhbE51bTtcbiAgICAgICAgdGhpcy5jaGFtcGlvblJld2FyZC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEuY2hhbXBpb25SZXdhcmQpO1xuICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKHRoaXMuaGVhZCwgdGhpcy5fZGF0YS5oZWFkSW1nLCBkYXRhLnVzZXJJZCArIFwiXCIsIHRoaXMpO1xuICAgICAgICB0aGlzLm5lZWRQYXNzV29yZE5vZGUuYWN0aXZlID0gISF0aGlzLl9kYXRhLmVudGVyUGFzc3dvcmQ7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lLnN0cmluZyA9IG5ldyBEYXRlKCt0aGlzLl9kYXRhLnN0YXJ0VGltZSkuZm9ybWF0KFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKTtcbiAgICAgICAgaWYgKGRhdGEudXNlcklkID09IDApIHsvL+WIm+aIv0lEID0gMCDlrpjmlrnotZtcbiAgICAgICAgICAgIGRhdGEuc2lnblN0YXR1cyA9PSAwID8gdGhpcy5zaWduVXBOb2RlLmFjdGl2ZSA9IHRydWUgOiB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudG91cm5hbWVudFR5cGUuc3ByaXRlRnJhbWUgPSB0aGlzLnRTcHJ0ZVsxXTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lTm9kZS5hY3RpdmU9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7Ly/oh6rlu7rotZsgXG4gICAgICAgICAgICBpZiAoZGF0YS51c2VySWQgPT0gVXNlci5fdXNlcklEKSB7Ly/miJHliJvlu7rnmoRcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnRUeXBlLnNwcml0ZUZyYW1lID0gdGhpcy50U3BydGVbMF07XG4gICAgICAgICAgICB9IGVsc2Ugey8v5Yir5Lq65Yib5bu655qEXG4gICAgICAgICAgICAgICAgZGF0YS5zaWduU3RhdHVzID09IDAgPyB0aGlzLnNpZ25VcE5vZGUuYWN0aXZlID0gdHJ1ZSA6IHRoaXMuZGV0YWlsTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudG91cm5hbWVudFR5cGUuc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVOb2RlLmFjdGl2ZT0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBsZXQgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgICAgICBNYW5hZ2VyLmdsb2JhbEF1ZGlvLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImRldGFpbEJ0blwiOlxuICAgICAgICAgICAgY2FzZSBcInNpZ251cEJ0blwiOlxuICAgICAgICAgICAgICAgIFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCkuc2lnblN0YXR1cyA9IHRoaXMuX2RhdGEuc2lnblN0YXR1cztcbiAgICAgICAgICAgICAgICB0aGlzLnJlcVRvdXJuYW1lbnREZXRhaWwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXFUb3VybmFtZW50RGV0YWlsKCkge1xuICAgICAgICBsZXQganNvbkRhdGEgPSB7XG4gICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRoaXMuX2RhdGEudG91cm5hbWVudElkLFxuICAgICAgICB9XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5Ub3VybmFtZW50RGV0YWlsUmVxLmNyZWF0ZShqc29uRGF0YSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5Ub3VybmFtZW50RGV0YWlsUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVG91cm5hbWVudERldGFpbCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICAgKiDmnKxJdGVt6L+b5YWlU2Nyb2xsVmlld+eahOaXtuWAmeWbnuiwg1xuICAgICAgICovXG4gICAgb25FbnRlclNyY29sbFZpZXcoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacrEl0ZW3nprvlvIBTY3JvbGxWaWV355qE5pe25YCZ5Zue6LCDXG4gICAgICovXG4gICAgb25FeGl0U2Nyb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgIH1cblxufVxuIl19