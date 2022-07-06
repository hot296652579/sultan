
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/rank/LeaderBoardView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3598aKvShNNvI8EhRuxspma', 'LeaderBoardView');
// script/rank/LeaderBoardView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankType = void 0;
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const ScroViewLogic_1 = __importDefault(require("../common/component/ScroViewLogic"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const RecordView_1 = __importDefault(require("./RecordView"));
const RuleView_1 = __importDefault(require("./RuleView"));
const { ccclass, property } = cc._decorator;
var rankType;
(function (rankType) {
    rankType[rankType["Friends"] = 1] = "Friends";
    rankType[rankType["Wealth"] = 2] = "Wealth";
    rankType[rankType["DayEarn"] = 3] = "DayEarn";
})(rankType = exports.rankType || (exports.rankType = {}));
let LeaderBoardView = class LeaderBoardView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this.myName = null;
        this.myReward = null;
        this.myRankIndex = null;
        this.myGold = null;
        this.myHead = null;
        this.noResult = null;
        this.redPoint = null;
        this._rankingList = [];
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "rank/prefabs/LeaderBoardView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingList), this.updateList);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FLUSH_RED_DOT), this.flushRedDot);
        this.registerEvent("updateUserInfo", this.updateUserInfo);
        this.registerEvent("OpenBox", this.reqFlushRedDot);
    }
    updateUserInfo() {
        this.myName.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        UtilMgr_1.UtilMgr.loadHeadImg(this.myHead, User_1.User._headImgUrl, User_1.User._userID, this);
    }
    updateList(data) {
        cc.log(data, "Rank");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.rankingPlayer.length > 0) {
                    this._rankingList = data.rankingPlayer;
                    this.getComponent(ScroViewLogic_1.default).initUI(this._rankingList);
                    this.moveToMe();
                    // this.rankView(data.rankingPlayer)
                }
                PanelHelp_1.default.hideLoading();
                let meRankInfo = this.getMeRankInfo();
                this.myRankIndex.string = meRankInfo.rankIndex ? meRankInfo.rankIndex : (data.winGold > 0 ? data.rankingSize + "+" : "none");
                this.myReward.string = meRankInfo.reward ? UtilMgr_1.UtilMgr.changeMoney(meRankInfo.reward) : "none";
                this.myGold.string = meRankInfo.winChips ? UtilMgr_1.UtilMgr.changeMoney(meRankInfo.winChips, true, true) : (data.winGold > 0 ? UtilMgr_1.UtilMgr.changeMoney(data.winGold, true, true) : "0");
                this.noResult.active = data.rankingPlayer.length == 0;
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    getMeRankInfo() {
        let rankIndex = null;
        let reward = null;
        let winChips = null;
        for (let i = 0; i < this._rankingList.length; i++) {
            let rankInfo = this._rankingList[i];
            if (rankInfo.userId == User_1.User._userID) {
                rankIndex = rankInfo.rank;
                reward = rankInfo.reward;
                winChips = rankInfo.winGold;
                break;
            }
        }
        return { rankIndex, reward, winChips };
    }
    rankView(rankingList) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = rankingList;
            yield scroViewCtrlCom.framingLoad(rankingList.length);
            PanelHelp_1.default.hideLoading();
            this.moveToMe();
        });
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "ruleBtn":
                Manager_1.Manager.uiManager.open({ type: RuleView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "recordBtn":
                Manager_1.Manager.uiManager.open({ type: RecordView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "backBtn":
                this.moveToMe();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    moveToMe() {
        let myRank = this.getMeRankInfo().rankIndex;
        let showLen = 6; //能显示的最多只有6条
        let maxLen = this._rankingList.length;
        let showPosY = 4; //要偏移的Item数
        let offLen = maxLen - showLen; //能最多偏移的Item数
        if (myRank) { //我存在 移动到我的位置
            //自己名次占比 
            if (maxLen < showLen) { //小于6位 直接滚动到顶层
                this.scrollView.scrollToTop(0.2);
            }
            else if ((myRank + showPosY - showLen) > maxLen) { // 我Item显示在中间 = 我的排名+ 需要偏移的Item - 不偏移的Item ,越界直接移动到底部
                this.scrollView.scrollToBottom(0.2);
            }
            else {
                if (offLen <= 3) {
                    if (myRank <= showPosY) { // 我是前四名 那么我不用偏移
                        this.scrollView.scrollToTop(0.2);
                    }
                    else { //正常偏移
                        let offY = myRank - showPosY;
                        let offEnd = 1 - offY / offLen;
                        this.scrollView.scrollTo(new cc.Vec2(0, offEnd), 0.2);
                    }
                }
                else { //正常偏移
                    let offY = myRank - showPosY;
                    let offEnd = 1 - offY / offLen;
                    this.scrollView.scrollTo(new cc.Vec2(0, offEnd), 0.2);
                }
            }
        }
        else { //移动到底部
            this.scrollView.scrollToBottom(0.2);
        }
    }
    refreshRank() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingList, null);
    }
    start() {
        this.myName.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        this.myGold.string = User_1.User.isRechargedPlayer ? "0" : LanguageImpl_1.i18n.EXPERIENCE_FIELD.NoGold;
        UtilMgr_1.UtilMgr.loadHeadImg(this.myHead, User_1.User._headImgUrl, User_1.User._userID, this);
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOADING);
        this.refreshRank();
        this.reqFlushRedDot();
    }
    flushRedDot(data) {
        cc.log(data, "rankRedPoint");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (this.redPoint) {
                    this.redPoint.active = data.rank && data.rank.redDot == 1;
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    reqFlushRedDot() {
        let req = CommonService_1.protoPackage.hall.base.FlushRedDot.create({ userId: User_1.User._userID });
        let buffer = CommonService_1.protoPackage.hall.base.FlushRedDot.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FLUSH_RED_DOT, buffer);
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.ScrollView)
], LeaderBoardView.prototype, "scrollView", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myName", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myReward", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myRankIndex", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myGold", void 0);
__decorate([
    property(cc.Sprite)
], LeaderBoardView.prototype, "myHead", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardView.prototype, "noResult", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardView.prototype, "redPoint", void 0);
LeaderBoardView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], LeaderBoardView);
exports.default = LeaderBoardView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmFuay9MZWFkZXJCb2FyZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0ZBQTREO0FBQzVELHNGQUE4RDtBQUM5RCxrRUFBdUQ7QUFDdkQsdURBQW9EO0FBQ3BELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsdURBQTZEO0FBRTdELGtFQUEyRTtBQUMzRSxvRUFBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFDNUMsOERBQXNDO0FBQ3RDLDBEQUFrQztBQUVsQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ2hCLDZDQUFXLENBQUE7SUFDWCwyQ0FBVSxDQUFBO0lBQ1YsNkNBQVcsQ0FBQTtBQUNmLENBQUMsRUFKVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUluQjtBQUlELElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZ0IsU0FBUSxnQkFBTTtJQUFuRDs7UUFHSSxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUdqQyxXQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsV0FBTSxHQUFhLElBQUksQ0FBQztRQUd4QixXQUFNLEdBQWMsSUFBSSxDQUFDO1FBR3pCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixpQkFBWSxHQUFRLEVBQUUsQ0FBQTtRQWdLdEIsaUJBQWlCO0lBQ3JCLENBQUM7SUE1SlUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw4QkFBOEIsQ0FBQztJQUMxQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FB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QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNPO0FBeEJSLGVBQWU7SUFGbkMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsZUFBZSxDQTJMbkM7a0JBM0xvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgU2Nyb1ZpZXdDdHJsIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3Q3RybFwiO1xuaW1wb3J0IFNjcm9WaWV3TG9naWMgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdMb2dpY1wiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IFJlY29yZFZpZXcgZnJvbSBcIi4vUmVjb3JkVmlld1wiO1xuaW1wb3J0IFJ1bGVWaWV3IGZyb20gXCIuL1J1bGVWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIHJhbmtUeXBlIHtcbiAgICBGcmllbmRzID0gMSwgIC8v5aW95Y+LXG4gICAgV2VhbHRoID0gMiwgICAvL+i0ouWvjFxuICAgIERheUVhcm4gPSAzLCAgLy/ml6XotZpcbn1cblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExlYWRlckJvYXJkVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT57XG5cbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldylcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBteU5hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBteVJld2FyZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG15UmFua0luZGV4OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbXlHb2xkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIG15SGVhZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG5vUmVzdWx0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlZFBvaW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIF9yYW5raW5nTGlzdDogYW55ID0gW11cblxuXG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInJhbmsvcHJlZmFicy9MZWFkZXJCb2FyZFZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05ld1JhbmtpbmdMaXN0KSwgdGhpcy51cGRhdGVMaXN0KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5GTFVTSF9SRURfRE9UKSwgdGhpcy5mbHVzaFJlZERvdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcInVwZGF0ZVVzZXJJbmZvXCIsIHRoaXMudXBkYXRlVXNlckluZm8pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJPcGVuQm94XCIsIHRoaXMucmVxRmx1c2hSZWREb3QpO1xuXG4gICAgfVxuICAgIHVwZGF0ZVVzZXJJbmZvKCkge1xuICAgICAgICB0aGlzLm15TmFtZS5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhVc2VyLl91c2VyTmFtZSk7XG4gICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcodGhpcy5teUhlYWQsIFVzZXIuX2hlYWRJbWdVcmwsIFVzZXIuX3VzZXJJRCwgdGhpcylcbiAgICB9XG4gICAgdXBkYXRlTGlzdChkYXRhKSB7XG4gICAgICAgIGNjLmxvZyhkYXRhLCBcIlJhbmtcIilcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJhbmtpbmdQbGF5ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYW5raW5nTGlzdCA9IGRhdGEucmFua2luZ1BsYXllcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoU2Nyb1ZpZXdMb2dpYykuaW5pdFVJKHRoaXMuX3JhbmtpbmdMaXN0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb01lKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmFua1ZpZXcoZGF0YS5yYW5raW5nUGxheWVyKVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICBsZXQgbWVSYW5rSW5mbyA9IHRoaXMuZ2V0TWVSYW5rSW5mbygpXG4gICAgICAgICAgICAgICAgdGhpcy5teVJhbmtJbmRleC5zdHJpbmcgPSBtZVJhbmtJbmZvLnJhbmtJbmRleCA/IG1lUmFua0luZm8ucmFua0luZGV4IDogKGRhdGEud2luR29sZCA+IDAgPyBkYXRhLnJhbmtpbmdTaXplICsgXCIrXCIgOiBcIm5vbmVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5teVJld2FyZC5zdHJpbmcgPSBtZVJhbmtJbmZvLnJld2FyZCA/IFV0aWxNZ3IuY2hhbmdlTW9uZXkobWVSYW5rSW5mby5yZXdhcmQpIDogXCJub25lXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5teUdvbGQuc3RyaW5nID0gbWVSYW5rSW5mby53aW5DaGlwcyA/IFV0aWxNZ3IuY2hhbmdlTW9uZXkobWVSYW5rSW5mby53aW5DaGlwcywgdHJ1ZSwgdHJ1ZSkgOiAoZGF0YS53aW5Hb2xkID4gMCA/IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS53aW5Hb2xkLCB0cnVlLCB0cnVlKSA6IFwiMFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vUmVzdWx0LmFjdGl2ZSA9IGRhdGEucmFua2luZ1BsYXllci5sZW5ndGggPT0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNZVJhbmtJbmZvKCkge1xuICAgICAgICBsZXQgcmFua0luZGV4ID0gbnVsbDtcbiAgICAgICAgbGV0IHJld2FyZCA9IG51bGxcbiAgICAgICAgbGV0IHdpbkNoaXBzID0gbnVsbFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3JhbmtpbmdMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmFua0luZm8gPSB0aGlzLl9yYW5raW5nTGlzdFtpXVxuICAgICAgICAgICAgaWYgKHJhbmtJbmZvLnVzZXJJZCA9PSBVc2VyLl91c2VySUQpIHtcbiAgICAgICAgICAgICAgICByYW5rSW5kZXggPSByYW5rSW5mby5yYW5rO1xuICAgICAgICAgICAgICAgIHJld2FyZCA9IHJhbmtJbmZvLnJld2FyZDtcbiAgICAgICAgICAgICAgICB3aW5DaGlwcyA9IHJhbmtJbmZvLndpbkdvbGQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcmFua0luZGV4LCByZXdhcmQsIHdpbkNoaXBzIH1cbiAgICB9XG5cbiAgICBhc3luYyByYW5rVmlldyhyYW5raW5nTGlzdCkge1xuICAgICAgICBsZXQgc2Nyb1ZpZXdDdHJsQ29tID0gdGhpcy5nZXRDb21wb25lbnQoU2Nyb1ZpZXdDdHJsKVxuICAgICAgICBzY3JvVmlld0N0cmxDb20uZGF0YUxpc3QgPSByYW5raW5nTGlzdFxuICAgICAgICBhd2FpdCBzY3JvVmlld0N0cmxDb20uZnJhbWluZ0xvYWQocmFua2luZ0xpc3QubGVuZ3RoKVxuICAgICAgICBQYW5lbEhlbHAuaGlkZUxvYWRpbmcoKVxuICAgICAgICB0aGlzLm1vdmVUb01lKCk7XG4gICAgfVxuXG5cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNsb3NlV2l0aEFjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJydWxlQnRuXCI6IE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBSdWxlVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyZWNvcmRCdG5cIjogTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFJlY29yZFZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYmFja0J0blwiOiB0aGlzLm1vdmVUb01lKCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVRvTWUoKSB7XG4gICAgICAgIGxldCBteVJhbmsgPSB0aGlzLmdldE1lUmFua0luZm8oKS5yYW5rSW5kZXg7XG4gICAgICAgIGxldCBzaG93TGVuID0gNjsvL+iDveaYvuekuueahOacgOWkmuWPquaciTbmnaFcbiAgICAgICAgbGV0IG1heExlbiA9IHRoaXMuX3JhbmtpbmdMaXN0Lmxlbmd0aDtcbiAgICAgICAgbGV0IHNob3dQb3NZID0gNDsvL+imgeWBj+enu+eahEl0ZW3mlbBcbiAgICAgICAgbGV0IG9mZkxlbiA9IG1heExlbiAtIHNob3dMZW47Ly/og73mnIDlpJrlgY/np7vnmoRJdGVt5pWwXG4gICAgICAgIGlmIChteVJhbmspIHsvL+aIkeWtmOWcqCDnp7vliqjliLDmiJHnmoTkvY3nva5cbiAgICAgICAgICAgIC8v6Ieq5bex5ZCN5qyh5Y2g5q+UIFxuICAgICAgICAgICAgaWYgKG1heExlbiA8IHNob3dMZW4pIHsgLy/lsI/kuo425L2NIOebtOaOpea7muWKqOWIsOmhtuWxglxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCgwLjIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgobXlSYW5rICsgc2hvd1Bvc1kgLSBzaG93TGVuKSA+IG1heExlbikgey8vIOaIkUl0ZW3mmL7npLrlnKjkuK3pl7QgPSDmiJHnmoTmjpLlkI0rIOmcgOimgeWBj+enu+eahEl0ZW0gLSDkuI3lgY/np7vnmoRJdGVtICzotornlYznm7TmjqXnp7vliqjliLDlupXpg6hcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oMC4yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9mZkxlbiA8PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChteVJhbmsgPD0gc2hvd1Bvc1kpIHsgLy8g5oiR5piv5YmN5Zub5ZCNIOmCo+S5iOaIkeS4jeeUqOWBj+enu1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvVG9wKDAuMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/mraPluLjlgY/np7tcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZZID0gbXlSYW5rIC0gc2hvd1Bvc1k7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2ZmRW5kID0gMSAtIG9mZlkgLyBvZmZMZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG8obmV3IGNjLlZlYzIoMCwgb2ZmRW5kKSwgMC4yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/mraPluLjlgY/np7tcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZlkgPSBteVJhbmsgLSBzaG93UG9zWTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZkVuZCA9IDEgLSBvZmZZIC8gb2ZmTGVuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG8obmV3IGNjLlZlYzIoMCwgb2ZmRW5kKSwgMC4yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7Ly/np7vliqjliLDlupXpg6hcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb0JvdHRvbSgwLjIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFJhbmsoKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9OZXdSYW5raW5nTGlzdCxcbiAgICAgICAgICAgIG51bGwpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLm15TmFtZS5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhVc2VyLl91c2VyTmFtZSk7XG4gICAgICAgIHRoaXMubXlHb2xkLnN0cmluZyA9IFVzZXIuaXNSZWNoYXJnZWRQbGF5ZXIgPyBcIjBcIiA6IGkxOG4uRVhQRVJJRU5DRV9GSUVMRC5Ob0dvbGQ7XG4gICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcodGhpcy5teUhlYWQsIFVzZXIuX2hlYWRJbWdVcmwsIFVzZXIuX3VzZXJJRCwgdGhpcylcbiAgICAgICAgUGFuZWxIZWxwLnNob3dMb2FkaW5nKGkxOG4uV0FJVC5MT0FESU5HKVxuICAgICAgICB0aGlzLnJlZnJlc2hSYW5rKClcbiAgICAgICAgdGhpcy5yZXFGbHVzaFJlZERvdCgpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBmbHVzaFJlZERvdChkYXRhKSB7XG4gICAgICAgIGNjLmxvZyhkYXRhLCBcInJhbmtSZWRQb2ludFwiKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVkUG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRQb2ludC5hY3RpdmUgPSBkYXRhLnJhbmsgJiYgZGF0YS5yYW5rLnJlZERvdCA9PSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVxRmx1c2hSZWREb3QoKSB7XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5iYXNlLkZsdXNoUmVkRG90LmNyZWF0ZSh7IHVzZXJJZDogVXNlci5fdXNlcklEIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuYmFzZS5GbHVzaFJlZERvdC5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuRkxVU0hfUkVEX0RPVCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==