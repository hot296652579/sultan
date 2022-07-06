
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/rank/RankView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '877e0EVuOdN953nayXCdKpZ', 'RankView');
// script/rank/RankView.ts

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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
var rankType;
(function (rankType) {
    rankType[rankType["Friends"] = 1] = "Friends";
    rankType[rankType["Wealth"] = 2] = "Wealth";
    rankType[rankType["DayEarn"] = 3] = "DayEarn";
})(rankType = exports.rankType || (exports.rankType = {}));
let RankView = class RankView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this.myName = null;
        this.myId = null;
        this.myRankIndex = null;
        this.myGold = null;
        this.myRank = null;
        this.myHead = null;
        this._rankingList = [];
        this._type = rankType.Wealth;
        this._page = 1;
        this._pageSize = 50;
        this._pageTotal = 0;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "rank/prefabs/RankView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        //暂时只显示50条  先不做分页  后面有需要再加
        //this.scrollView.node.on('bounce-bottom', this.onBounceBottom, this)
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.RANKING_LIST), this.updateList);
        this.registerEvent("updateUserInfo", this.updateUserInfo);
    }
    updateUserInfo() {
        this.myName.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        this.myId.string = User_1.User._userID || '';
        this.myGold.string = User_1.User.isRechargedPlayer ? UtilMgr_1.UtilMgr.changeMoney(User_1.User._gold) : LanguageImpl_1.i18n.EXPERIENCE_FIELD.NoGold;
        UtilMgr_1.UtilMgr.loadHeadImg(this.myHead, User_1.User._headImgUrl, User_1.User._userID, this);
    }
    updateList(data) {
        cc.log(data, "Rank");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.rankingList.length > 0) {
                    this._rankingList = data.rankingList;
                    this._page = data.currPage;
                    this._pageTotal = data.total;
                    let meRankIndex = this.getMeRankIndex();
                    this.myRankIndex.string = meRankIndex;
                    //处理分页排行id
                    data.rankingList.forEach((element) => {
                        element.id = this._pageSize * (this._page - 1) + element.id;
                    });
                    this.rankView(data.rankingList);
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    getMeRankIndex() {
        let rankIndex = "50+";
        for (let i = 0; i < this._rankingList.length; i++) {
            let rankInfo = this._rankingList[i];
            if (rankInfo.userId == User_1.User._userID) {
                rankIndex = this._pageSize * (this._page - 1) + rankInfo.id;
                break;
            }
        }
        return rankIndex;
    }
    rankView(rankingList) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = rankingList;
            yield scroViewCtrlCom.framingLoad(rankingList.length, false);
            PanelHelp_1.default.hideLoading();
        });
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    onBounceBottom() {
        if (this._pageTotal > this._page) {
            this._page = this._page + 1;
            this.refreshRank();
        }
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    refreshRank() {
        let req = CommonService_1.protoPackage.hall.base.RankingList.create({ userId: User_1.User._userID, type: this._type, page: this._page, size: this._pageSize });
        let buffer = CommonService_1.protoPackage.hall.base.RankingList.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.RANKING_LIST, buffer);
    }
    start() {
        this.myName.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        this.myId.string = User_1.User._userID || '';
        this.myGold.string = User_1.User.isRechargedPlayer ? UtilMgr_1.UtilMgr.changeMoney(User_1.User._gold) : LanguageImpl_1.i18n.EXPERIENCE_FIELD.NoGold;
        UtilMgr_1.UtilMgr.loadHeadImg(this.myHead, User_1.User._headImgUrl, User_1.User._userID, this);
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOADING);
        this.refreshRank();
        this.myRank.language = LanguageImpl_1.i18n.RANK.MYRANK;
    }
};
__decorate([
    property(cc.ScrollView)
], RankView.prototype, "scrollView", void 0);
__decorate([
    property(cc.Label)
], RankView.prototype, "myName", void 0);
__decorate([
    property(cc.Label)
], RankView.prototype, "myId", void 0);
__decorate([
    property(cc.Label)
], RankView.prototype, "myRankIndex", void 0);
__decorate([
    property(cc.Label)
], RankView.prototype, "myGold", void 0);
__decorate([
    property(cc.Label)
], RankView.prototype, "myRank", void 0);
__decorate([
    property(cc.Sprite)
], RankView.prototype, "myHead", void 0);
RankView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RankView);
exports.default = RankView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmFuay9SYW5rVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRkFBNEQ7QUFDNUQsa0VBQXVEO0FBQ3ZELHVEQUFvRDtBQUNwRCwrREFBdUU7QUFDdkUsNkRBQTBEO0FBRzFELGtFQUEyRTtBQUMzRSxvRUFBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLElBQVksUUFJWDtBQUpELFdBQVksUUFBUTtJQUNoQiw2Q0FBVyxDQUFBO0lBQ1gsMkNBQVUsQ0FBQTtJQUNWLDZDQUFXLENBQUE7QUFDZixDQUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkI7QUFJRCxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxnQkFBTTtJQUE1Qzs7UUFHSSxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUdqQyxXQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFHdEIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsV0FBTSxHQUFhLElBQUksQ0FBQztRQUd4QixXQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFdBQU0sR0FBYyxJQUFJLENBQUM7UUFFekIsaUJBQVksR0FBUSxFQUFFLENBQUE7UUFFdEIsVUFBSyxHQUFXLFFBQVEsQ0FBQyxNQUFNLENBQUE7UUFFL0IsVUFBSyxHQUFXLENBQUMsQ0FBQTtRQUVqQixjQUFTLEdBQVcsRUFBRSxDQUFBO1FBRXRCLGVBQVUsR0FBVyxDQUFDLENBQUE7UUE4R3RCLGlCQUFpQjtJQUNyQixDQUFDO0lBM0dVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sdUJBQXVCLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU07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QUFXLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLG1CQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxDQUFDO0NBR0osQ0FBQTtBQTNJRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDOzRDQUNTO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0NBQ0s7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzQ0FDRztBQUd0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzZDQUNVO0FBRzdCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0NBQ0s7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3Q0FDSztBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dDQUNLO0FBckJSLFFBQVE7SUFGNUIsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsUUFBUSxDQThJNUI7a0JBOUlvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgU2Nyb1ZpZXdDdHJsIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3Q3RybFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSByYW5rVHlwZSB7XG4gICAgRnJpZW5kcyA9IDEsICAvL+WlveWPi1xuICAgIFdlYWx0aCA9IDIsICAgLy/otKLlr4xcbiAgICBEYXlFYXJuID0gMywgIC8v5pel6LWaXG59XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT57XG5cbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldylcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBteU5hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBteUlkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbXlSYW5rSW5kZXg6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBteUdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBteVJhbms6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbXlIZWFkOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgX3JhbmtpbmdMaXN0OiBhbnkgPSBbXVxuXG4gICAgX3R5cGU6IG51bWJlciA9IHJhbmtUeXBlLldlYWx0aFxuXG4gICAgX3BhZ2U6IG51bWJlciA9IDFcblxuICAgIF9wYWdlU2l6ZTogbnVtYmVyID0gNTBcblxuICAgIF9wYWdlVG90YWw6IG51bWJlciA9IDBcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJyYW5rL3ByZWZhYnMvUmFua1ZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcbiAgICAgICAgLy/mmoLml7blj6rmmL7npLo1MOadoSAg5YWI5LiN5YGa5YiG6aG1ICDlkI7pnaLmnInpnIDopoHlho3liqBcbiAgICAgICAgLy90aGlzLnNjcm9sbFZpZXcubm9kZS5vbignYm91bmNlLWJvdHRvbScsIHRoaXMub25Cb3VuY2VCb3R0b20sIHRoaXMpXG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlJBTktJTkdfTElTVCksIHRoaXMudXBkYXRlTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcInVwZGF0ZVVzZXJJbmZvXCIsIHRoaXMudXBkYXRlVXNlckluZm8pO1xuXG4gICAgfVxuICAgIHVwZGF0ZVVzZXJJbmZvKCkge1xuICAgICAgICB0aGlzLm15TmFtZS5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhVc2VyLl91c2VyTmFtZSk7XG4gICAgICAgIHRoaXMubXlJZC5zdHJpbmcgPSBVc2VyLl91c2VySUQgfHwgJyc7XG4gICAgICAgIHRoaXMubXlHb2xkLnN0cmluZyA9IFVzZXIuaXNSZWNoYXJnZWRQbGF5ZXIgPyBVdGlsTWdyLmNoYW5nZU1vbmV5KFVzZXIuX2dvbGQpIDogaTE4bi5FWFBFUklFTkNFX0ZJRUxELk5vR29sZDtcbiAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLm15SGVhZCwgVXNlci5faGVhZEltZ1VybCwgVXNlci5fdXNlcklELCB0aGlzKVxuICAgIH1cbiAgICB1cGRhdGVMaXN0KGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsIFwiUmFua1wiKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucmFua2luZ0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYW5raW5nTGlzdCA9IGRhdGEucmFua2luZ0xpc3RcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZSA9IGRhdGEuY3VyclBhZ2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZVRvdGFsID0gZGF0YS50b3RhbFxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZVJhbmtJbmRleCA9IHRoaXMuZ2V0TWVSYW5rSW5kZXgoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15UmFua0luZGV4LnN0cmluZyA9IG1lUmFua0luZGV4O1xuXG4gICAgICAgICAgICAgICAgICAgIC8v5aSE55CG5YiG6aG15o6S6KGMaWRcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5yYW5raW5nTGlzdC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmlkID0gdGhpcy5fcGFnZVNpemUgKiAodGhpcy5fcGFnZSAtIDEpICsgZWxlbWVudC5pZFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmtWaWV3KGRhdGEucmFua2luZ0xpc3QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1lUmFua0luZGV4KCkge1xuICAgICAgICBsZXQgcmFua0luZGV4ID0gXCI1MCtcIlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3JhbmtpbmdMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmFua0luZm8gPSB0aGlzLl9yYW5raW5nTGlzdFtpXVxuICAgICAgICAgICAgaWYgKHJhbmtJbmZvLnVzZXJJZCA9PSBVc2VyLl91c2VySUQpIHtcbiAgICAgICAgICAgICAgICByYW5rSW5kZXggPSB0aGlzLl9wYWdlU2l6ZSAqICh0aGlzLl9wYWdlIC0gMSkgKyByYW5rSW5mby5pZFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYW5rSW5kZXhcbiAgICB9XG5cbiAgICBhc3luYyByYW5rVmlldyhyYW5raW5nTGlzdCkge1xuICAgICAgICBsZXQgc2Nyb1ZpZXdDdHJsQ29tID0gdGhpcy5nZXRDb21wb25lbnQoU2Nyb1ZpZXdDdHJsKVxuICAgICAgICBzY3JvVmlld0N0cmxDb20uZGF0YUxpc3QgPSByYW5raW5nTGlzdFxuICAgICAgICBhd2FpdCBzY3JvVmlld0N0cmxDb20uZnJhbWluZ0xvYWQocmFua2luZ0xpc3QubGVuZ3RoLCBmYWxzZSlcbiAgICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKClcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICB9XG5cbiAgICBvbkJvdW5jZUJvdHRvbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhZ2VUb3RhbCA+IHRoaXMuX3BhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhZ2UgPSB0aGlzLl9wYWdlICsgMVxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUmFuaygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTsgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IEcuTG9nZ2VyLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hSYW5rKCkge1xuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuYmFzZS5SYW5raW5nTGlzdC5jcmVhdGUoeyB1c2VySWQ6IFVzZXIuX3VzZXJJRCwgdHlwZTogdGhpcy5fdHlwZSwgcGFnZTogdGhpcy5fcGFnZSwgc2l6ZTogdGhpcy5fcGFnZVNpemUgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5iYXNlLlJhbmtpbmdMaXN0LmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5SQU5LSU5HX0xJU1QsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLm15TmFtZS5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhVc2VyLl91c2VyTmFtZSk7XG4gICAgICAgIHRoaXMubXlJZC5zdHJpbmcgPSBVc2VyLl91c2VySUQgfHwgJyc7XG4gICAgICAgIHRoaXMubXlHb2xkLnN0cmluZyA9IFVzZXIuaXNSZWNoYXJnZWRQbGF5ZXIgPyBVdGlsTWdyLmNoYW5nZU1vbmV5KFVzZXIuX2dvbGQpIDogaTE4bi5FWFBFUklFTkNFX0ZJRUxELk5vR29sZDtcbiAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLm15SGVhZCwgVXNlci5faGVhZEltZ1VybCwgVXNlci5fdXNlcklELCB0aGlzKVxuICAgICAgICBQYW5lbEhlbHAuc2hvd0xvYWRpbmcoaTE4bi5XQUlULkxPQURJTkcpXG4gICAgICAgIHRoaXMucmVmcmVzaFJhbmsoKVxuXG4gICAgICAgIHRoaXMubXlSYW5rLmxhbmd1YWdlID0gaTE4bi5SQU5LLk1ZUkFOSztcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19