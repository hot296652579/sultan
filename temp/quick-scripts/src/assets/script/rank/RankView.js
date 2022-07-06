"use strict";
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