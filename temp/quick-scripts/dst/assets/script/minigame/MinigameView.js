
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/minigame/MinigameView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1dbe34coYlP1ZSb9OzLS9iC', 'MinigameView');
// script/minigame/MinigameView.ts

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
const BindEmailView_1 = __importDefault(require("../common/bindItemView/BindEmailView"));
const TitleItemPageUser_1 = __importDefault(require("../common/item/TitleItemPageUser"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const TypeUtils_1 = __importDefault(require("../common/utils/TypeUtils"));
const UserData_1 = __importDefault(require("../data/UserData"));
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const MinigameDefine_1 = require("./MinigameDefine");
const MinigameGoldView_1 = __importDefault(require("./MinigameGoldView"));
const { ccclass, property } = cc._decorator;
let MinigameView = class MinigameView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.spfFinish = null;
        this.spfUnFinish = null;
        this.spnAwardBox = null;
        this.imgBoxShadow = [];
        this.labTaskTitle = null;
        this.nodTaskItem0 = null;
        this.btnBindEmail = null;
        this.labBindEmail = null;
        this.nodTaskItem1 = null;
        this.labBonusTitle = null;
        this.labBonusTips = null;
        this.labBonusGold = null;
        this.titleItemPageUser = null;
        // 用户数据
        this._userData = null;
        // 小游戏信息
        this._minigameInfo = null;
        // 小游戏开奖结果
        this._minigameLottery = null;
    }
    static getPrefabUrl() {
        return "minigame/prefabs/MinigameView";
    }
    onLoad() {
        super.onLoad();
        this.audioHelper.playMusic(MinigameDefine_1.MinigameDefine.BGM, this.bundle);
        this.initData();
        this.initUI();
        this.C2S_MinigameInfo();
    }
    start() {
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
        this._minigameInfo = null;
        this._minigameLottery = null;
    }
    initUI() {
        this.spnAwardBox.node.active = false;
        this.labTaskTitle.string = "";
        this.labBonusTitle.string = "";
        this.labBonusTips.string = "";
        this.labBonusGold.string = "";
        this.nodTaskItem0.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = this.spfUnFinish;
        this.nodTaskItem1.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = this.spfUnFinish;
        this.btnBindEmail.node.active = true;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_S2C_MinigameInfo", this.onEvent_S2C_MinigameInfo);
        this.registerEvent("Event_S2C_MinigameLottery", this.onEvent_S2C_MinigameLottery);
        this.registerEvent("Event_S2C_BindEmail", this.onEvent_S2C_BindEmail);
        this.registerEvent("updateUserInfo", this.onUpdateUserInfo);
    }
    onLanguageChange() {
        this.titleItemPageUser.languagePageName(Manager_1.Manager.makeLanguage("Minigame.labPageName"));
        this.labTaskTitle.language = Manager_1.Manager.makeLanguage("Minigame.labTaskTitle");
        this.nodTaskItem0.getChildByName("labTaskDesc").getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("Minigame.labTaskDesc0");
        this.labBindEmail.language = Manager_1.Manager.makeLanguage("Minigame.labBindEmail");
        this.nodTaskItem1.getChildByName("labTaskDesc").getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("Minigame.labTaskDesc1");
        this.labBonusTitle.language = Manager_1.Manager.makeLanguage("Minigame.labBonusTitle");
        this.labBonusTips.language = Manager_1.Manager.makeLanguage("Minigame.labBonusTips");
        if (this._minigameInfo && !TypeUtils_1.default.isNull(this._minigameInfo.todayBonus)) {
            this.labBonusGold.language = Manager_1.Manager.makeLanguage(["Minigame.RpGold", NumberUtils_1.default.converToC(this._minigameInfo.todayBonus)]);
        }
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    refreshTask() {
        let spfIsBindEmail = null;
        if (this.isBindEmail()) {
            spfIsBindEmail = this.spfFinish;
            this.btnBindEmail.node.active = false;
        }
        else {
            spfIsBindEmail = this.spfUnFinish;
            this.btnBindEmail.node.active = true;
        }
        this.nodTaskItem0.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = spfIsBindEmail;
        let spfIsFinish = null;
        if (this._minigameInfo.isFinishGame) {
            spfIsFinish = this.spfFinish;
        }
        else {
            spfIsFinish = this.spfUnFinish;
        }
        this.nodTaskItem1.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = spfIsFinish;
    }
    refreshBonus() {
        this.labBonusGold.language = Manager_1.Manager.makeLanguage(["Minigame.RpGold", NumberUtils_1.default.converToC(this._minigameInfo.todayBonus)]);
    }
    playLotteryAnim() {
        let btnAwardBox = this.imgBoxShadow[this._minigameLottery.boxIndex].node.getChildByName("btnAwardBox").getComponent(cc.Button);
        let awardBoxWorldPos = btnAwardBox.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let spnAwardBoxPos = this.spnAwardBox.node.parent.convertToNodeSpaceAR(awardBoxWorldPos);
        btnAwardBox.node.active = false;
        this.spnAwardBox.node.active = true;
        this.spnAwardBox.node.position = cc.v2(spnAwardBoxPos.x, spnAwardBoxPos.y - 5.5);
        let kaiAnim = this.spnAwardBox.setAnimation(0, "kai", false);
        this.spnAwardBox.setTrackCompleteListener(kaiAnim, this.onAnimOpenBoxFinish.bind(this));
    }
    clickBox(index) {
        if (!this.isBindEmail()) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tips.PleaseBindYourEmail);
            return;
        }
        if (!this._minigameInfo.isFinishGame) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tips.CompleteAnyGameToGetIt);
            return;
        }
        if (this._minigameInfo.isReceiveBonus) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tips.BonusAlreadyReceived);
            return;
        }
        this.C2S_MinigameLottery(index);
    }
    clickBindEmail() {
        Manager_1.Manager.uiManager.open({ type: BindEmailView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnAwardBox":
                this.clickBox(Number(data));
                break;
            case "btnBindEmail":
                this.clickBindEmail();
                break;
            case "btnClose":
                this.close();
                break;
        }
    }
    onAnimOpenBoxFinish(entry, loopCount) {
        let goldWorldPos = this.titleItemPageUser.getGoldWorldPos();
        let goldLocalPos = this.node.convertToNodeSpaceAR(goldWorldPos);
        Manager_1.Manager.uiManager.open({ type: MinigameGoldView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this._minigameLottery.award, goldLocalPos] });
        this.spnAwardBox.setAnimation(0, "daiji", true);
    }
    isBindEmail() {
        return !TypeUtils_1.default.isNull(this._userData.email) && this._userData.email.length > 0;
    }
    /**
     * 请求小游戏开奖
     * @param index {number} 盒子下标
     */
    C2S_MinigameLottery(index) {
        let req = protoc_1.MST.C2S_MinigameLottery.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            boxIndex: index,
        });
        let buffer = protoc_1.MST.C2S_MinigameLottery.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_MinigameLottery, protoc_1.MST.OuterOpcode_Lobby.C2S_MinigameLottery, buffer);
    }
    /**
     * 请求小游戏信息
     */
    C2S_MinigameInfo() {
        let req = protoc_1.MST.C2S_MinigameInfo.create({
            serial: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2S_MinigameInfo.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_MinigameInfo, protoc_1.MST.OuterOpcode_Lobby.C2S_MinigameInfo, buffer);
    }
    /**
     * 响应小游戏信息
     */
    onEvent_S2C_MinigameInfo(data) {
        this._minigameInfo = data;
        this.refreshTask();
        this.refreshBonus();
    }
    /**
     * 响应小游戏开奖
     * @param data {MST.IS2C_MinigameLottery} 数据
     */
    onEvent_S2C_MinigameLottery(data) {
        this.audioHelper.playEffect(MinigameDefine_1.MinigameDefine.Sound.OPEN_BOX, this.bundle);
        this._minigameInfo.isReceiveBonus = true;
        this._minigameLottery = data;
        this.playLotteryAnim();
    }
    /**
     * 绑定邮箱响应
     */
    onEvent_S2C_BindEmail() {
        this.refreshTask();
    }
    /**
     * 登陆成功响应
     */
    onUpdateUserInfo() {
        this.C2S_MinigameInfo();
    }
    onDestroy() {
        super.onDestroy();
        this.audioHelper.stopMusic();
    }
};
__decorate([
    property(cc.SpriteFrame)
], MinigameView.prototype, "spfFinish", void 0);
__decorate([
    property(cc.SpriteFrame)
], MinigameView.prototype, "spfUnFinish", void 0);
__decorate([
    property(sp.Skeleton)
], MinigameView.prototype, "spnAwardBox", void 0);
__decorate([
    property([cc.Sprite])
], MinigameView.prototype, "imgBoxShadow", void 0);
__decorate([
    property(cc.Label)
], MinigameView.prototype, "labTaskTitle", void 0);
__decorate([
    property(cc.Node)
], MinigameView.prototype, "nodTaskItem0", void 0);
__decorate([
    property(cc.Button)
], MinigameView.prototype, "btnBindEmail", void 0);
__decorate([
    property(cc.Label)
], MinigameView.prototype, "labBindEmail", void 0);
__decorate([
    property(cc.Node)
], MinigameView.prototype, "nodTaskItem1", void 0);
__decorate([
    property(cc.Label)
], MinigameView.prototype, "labBonusTitle", void 0);
__decorate([
    property(cc.Label)
], MinigameView.prototype, "labBonusTips", void 0);
__decorate([
    property(cc.Label)
], MinigameView.prototype, "labBonusGold", void 0);
__decorate([
    property(TitleItemPageUser_1.default)
], MinigameView.prototype, "titleItemPageUser", void 0);
MinigameView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], MinigameView);
exports.default = MinigameView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbWluaWdhbWUvTWluaWdhbWVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUZBQWlFO0FBQ2pFLHlGQUFpRTtBQUNqRSxrRUFBdUQ7QUFDdkQsdURBQW9EO0FBQ3BELDZEQUEwRDtBQUMxRCw4RUFBc0Q7QUFDdEQsMEVBQWtEO0FBQ2xELGdFQUF3QztBQUN4Qyx1REFBcUY7QUFFckYsa0VBQWtFO0FBQ2xFLDBEQUF1RDtBQUN2RCx5REFBbUQ7QUFDbkQsb0VBQTRDO0FBQzVDLG9FQUE0QztBQUM1QyxxREFBa0Q7QUFDbEQsMEVBQWtEO0FBRWxELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxnQkFBTTtJQUFoRDs7UUFJWSxjQUFTLEdBQW1CLElBQUksQ0FBQztRQUdqQyxnQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBR2hDLGlCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUcvQixpQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixpQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixpQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixpQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixzQkFBaUIsR0FBc0IsSUFBSSxDQUFDO1FBRXBELE9BQU87UUFDQyxjQUFTLEdBQWEsSUFBSSxDQUFDO1FBQ25DLFFBQVE7UUFDQSxrQkFBYSxHQUEwQixJQUFJLENBQUM7UUFDcEQsVUFBVTtRQUNGLHFCQUFnQixHQUE2QixJQUFJLENB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O2tEQUNtQjtBQUdyQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNvQjtBQUd2QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNtQjtBQUd0QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNtQjtBQUd0QztJQURDLFFBQVEsQ0FBQywyQkFBaUIsQ0FBQzt1REFDd0I7QUF4Q25DLFlBQVk7SUFGaEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsWUFBWSxDQTBRaEM7a0JBMVFvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpbmRFbWFpbFZpZXcgZnJvbSBcIi4uL2NvbW1vbi9iaW5kSXRlbVZpZXcvQmluZEVtYWlsVmlld1wiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2VVc2VyIGZyb20gXCIuLi9jb21tb24vaXRlbS9UaXRsZUl0ZW1QYWdlVXNlclwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBUeXBlVXRpbHMgZnJvbSBcIi4uL2NvbW1vbi91dGlscy9UeXBlVXRpbHNcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUywgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgTWluaWdhbWVEZWZpbmUgfSBmcm9tIFwiLi9NaW5pZ2FtZURlZmluZVwiO1xuaW1wb3J0IE1pbmlnYW1lR29sZFZpZXcgZnJvbSBcIi4vTWluaWdhbWVHb2xkVmlld1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWluaWdhbWVWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPntcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgcHJpdmF0ZSBzcGZGaW5pc2g6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBwcml2YXRlIHNwZlVuRmluaXNoOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgcHJpdmF0ZSBzcG5Bd2FyZEJveDogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxuICAgIHByaXZhdGUgaW1nQm94U2hhZG93OiBjYy5CdXR0b25bXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiVGFza1RpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIG5vZFRhc2tJdGVtMDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHByaXZhdGUgYnRuQmluZEVtYWlsOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQmluZEVtYWlsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIG5vZFRhc2tJdGVtMTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJCb251c1RpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJCb251c1RpcHM6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJvbnVzR29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFRpdGxlSXRlbVBhZ2VVc2VyKVxuICAgIHByaXZhdGUgdGl0bGVJdGVtUGFnZVVzZXI6IFRpdGxlSXRlbVBhZ2VVc2VyID0gbnVsbDtcblxuICAgIC8vIOeUqOaIt+aVsOaNrlxuICAgIHByaXZhdGUgX3VzZXJEYXRhOiBVc2VyRGF0YSA9IG51bGw7XG4gICAgLy8g5bCP5ri45oiP5L+h5oGvXG4gICAgcHJpdmF0ZSBfbWluaWdhbWVJbmZvOiBNU1QuSVMyQ19NaW5pZ2FtZUluZm8gPSBudWxsO1xuICAgIC8vIOWwj+a4uOaIj+W8gOWllue7k+aenFxuICAgIHByaXZhdGUgX21pbmlnYW1lTG90dGVyeTogTVNULklTMkNfTWluaWdhbWVMb3R0ZXJ5ID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJtaW5pZ2FtZS9wcmVmYWJzL01pbmlnYW1lVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG5cbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoTWluaWdhbWVEZWZpbmUuQkdNLCB0aGlzLmJ1bmRsZSk7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuXG4gICAgICAgIHRoaXMuQzJTX01pbmlnYW1lSW5mbygpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICAgICAgdGhpcy5fbWluaWdhbWVJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWluaWdhbWVMb3R0ZXJ5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRVSSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcG5Bd2FyZEJveC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhYlRhc2tUaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkJvbnVzVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCb251c1RpcHMuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCb251c0dvbGQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5ub2RUYXNrSXRlbTAuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdJc0ZpbmlzaFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BmVW5GaW5pc2g7XG4gICAgICAgIHRoaXMubm9kVGFza0l0ZW0xLmdldENoaWxkQnlOYW1lKFwiaW1nSXNGaW5pc2hcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwZlVuRmluaXNoO1xuICAgICAgICB0aGlzLmJ0bkJpbmRFbWFpbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1MyQ19NaW5pZ2FtZUluZm9cIiwgdGhpcy5vbkV2ZW50X1MyQ19NaW5pZ2FtZUluZm8pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9TMkNfTWluaWdhbWVMb3R0ZXJ5XCIsIHRoaXMub25FdmVudF9TMkNfTWluaWdhbWVMb3R0ZXJ5KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfUzJDX0JpbmRFbWFpbFwiLCB0aGlzLm9uRXZlbnRfUzJDX0JpbmRFbWFpbCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcInVwZGF0ZVVzZXJJbmZvXCIsIHRoaXMub25VcGRhdGVVc2VySW5mbylcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25MYW5ndWFnZUNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aXRsZUl0ZW1QYWdlVXNlci5sYW5ndWFnZVBhZ2VOYW1lKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiTWluaWdhbWUubGFiUGFnZU5hbWVcIikpO1xuICAgICAgICB0aGlzLmxhYlRhc2tUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiTWluaWdhbWUubGFiVGFza1RpdGxlXCIpO1xuICAgICAgICB0aGlzLm5vZFRhc2tJdGVtMC5nZXRDaGlsZEJ5TmFtZShcImxhYlRhc2tEZXNjXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIk1pbmlnYW1lLmxhYlRhc2tEZXNjMFwiKTtcbiAgICAgICAgdGhpcy5sYWJCaW5kRW1haWwubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIk1pbmlnYW1lLmxhYkJpbmRFbWFpbFwiKTtcbiAgICAgICAgdGhpcy5ub2RUYXNrSXRlbTEuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJUYXNrRGVzY1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJNaW5pZ2FtZS5sYWJUYXNrRGVzYzFcIik7XG4gICAgICAgIHRoaXMubGFiQm9udXNUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiTWluaWdhbWUubGFiQm9udXNUaXRsZVwiKTtcbiAgICAgICAgdGhpcy5sYWJCb251c1RpcHMubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIk1pbmlnYW1lLmxhYkJvbnVzVGlwc1wiKTtcblxuICAgICAgICBpZiAodGhpcy5fbWluaWdhbWVJbmZvICYmICFUeXBlVXRpbHMuaXNOdWxsKHRoaXMuX21pbmlnYW1lSW5mby50b2RheUJvbnVzKSkge1xuICAgICAgICAgICAgdGhpcy5sYWJCb251c0dvbGQubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShbXCJNaW5pZ2FtZS5ScEdvbGRcIiwgTnVtYmVyVXRpbHMuY29udmVyVG9DKHRoaXMuX21pbmlnYW1lSW5mby50b2RheUJvbnVzKV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3coYXJncz86IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG5cbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoVGFzaygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHNwZklzQmluZEVtYWlsOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmlzQmluZEVtYWlsKCkpIHtcbiAgICAgICAgICAgIHNwZklzQmluZEVtYWlsID0gdGhpcy5zcGZGaW5pc2g7XG4gICAgICAgICAgICB0aGlzLmJ0bkJpbmRFbWFpbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3BmSXNCaW5kRW1haWwgPSB0aGlzLnNwZlVuRmluaXNoO1xuICAgICAgICAgICAgdGhpcy5idG5CaW5kRW1haWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kVGFza0l0ZW0wLmdldENoaWxkQnlOYW1lKFwiaW1nSXNGaW5pc2hcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcGZJc0JpbmRFbWFpbDtcblxuICAgICAgICBsZXQgc3BmSXNGaW5pc2g6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX21pbmlnYW1lSW5mby5pc0ZpbmlzaEdhbWUpIHtcbiAgICAgICAgICAgIHNwZklzRmluaXNoID0gdGhpcy5zcGZGaW5pc2g7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGZJc0ZpbmlzaCA9IHRoaXMuc3BmVW5GaW5pc2g7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RUYXNrSXRlbTEuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdJc0ZpbmlzaFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwZklzRmluaXNoO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEJvbnVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkJvbnVzR29sZC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcIk1pbmlnYW1lLlJwR29sZFwiLCBOdW1iZXJVdGlscy5jb252ZXJUb0ModGhpcy5fbWluaWdhbWVJbmZvLnRvZGF5Qm9udXMpXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5TG90dGVyeUFuaW0oKTogdm9pZCB7XG4gICAgICAgIGxldCBidG5Bd2FyZEJveDogY2MuQnV0dG9uID0gdGhpcy5pbWdCb3hTaGFkb3dbdGhpcy5fbWluaWdhbWVMb3R0ZXJ5LmJveEluZGV4XS5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuQXdhcmRCb3hcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGxldCBhd2FyZEJveFdvcmxkUG9zOiBjYy5WZWMyID0gYnRuQXdhcmRCb3gubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpO1xuICAgICAgICBsZXQgc3BuQXdhcmRCb3hQb3M6IGNjLlZlYzIgPSB0aGlzLnNwbkF3YXJkQm94Lm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGF3YXJkQm94V29ybGRQb3MpXG5cbiAgICAgICAgYnRuQXdhcmRCb3gubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcG5Bd2FyZEJveC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3BuQXdhcmRCb3gubm9kZS5wb3NpdGlvbiA9IGNjLnYyKHNwbkF3YXJkQm94UG9zLngsIHNwbkF3YXJkQm94UG9zLnkgLSA1LjUpO1xuXG4gICAgICAgIGxldCBrYWlBbmltID0gdGhpcy5zcG5Bd2FyZEJveC5zZXRBbmltYXRpb24oMCwgXCJrYWlcIiwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNwbkF3YXJkQm94LnNldFRyYWNrQ29tcGxldGVMaXN0ZW5lcihrYWlBbmltLCB0aGlzLm9uQW5pbU9wZW5Cb3hGaW5pc2guYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGlja0JveChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0JpbmRFbWFpbCgpKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRpcHMuUGxlYXNlQmluZFlvdXJFbWFpbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX21pbmlnYW1lSW5mby5pc0ZpbmlzaEdhbWUpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVGlwcy5Db21wbGV0ZUFueUdhbWVUb0dldEl0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9taW5pZ2FtZUluZm8uaXNSZWNlaXZlQm9udXMpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVGlwcy5Cb251c0FscmVhZHlSZWNlaXZlZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLkMyU19NaW5pZ2FtZUxvdHRlcnkoaW5kZXgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xpY2tCaW5kRW1haWwoKTogdm9pZCB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBCaW5kRW1haWxWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQXdhcmRCb3hcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQm94KE51bWJlcihkYXRhKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmluZEVtYWlsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0JpbmRFbWFpbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkNsb3NlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkFuaW1PcGVuQm94RmluaXNoKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBsb29wQ291bnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgZ29sZFdvcmxkUG9zOiBjYy5WZWMyID0gdGhpcy50aXRsZUl0ZW1QYWdlVXNlci5nZXRHb2xkV29ybGRQb3MoKTtcbiAgICAgICAgbGV0IGdvbGRMb2NhbFBvczogY2MuVmVjMiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihnb2xkV29ybGRQb3MpO1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTWluaWdhbWVHb2xkVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbdGhpcy5fbWluaWdhbWVMb3R0ZXJ5LmF3YXJkLCBnb2xkTG9jYWxQb3NdIH0pO1xuICAgICAgICB0aGlzLnNwbkF3YXJkQm94LnNldEFuaW1hdGlvbigwLCBcImRhaWppXCIsIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNCaW5kRW1haWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl91c2VyRGF0YS5lbWFpbCkgJiYgdGhpcy5fdXNlckRhdGEuZW1haWwubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDor7fmsYLlsI/muLjmiI/lvIDlpZZcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn0g55uS5a2Q5LiL5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSBDMlNfTWluaWdhbWVMb3R0ZXJ5KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfTWluaWdhbWVMb3R0ZXJ5LmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgYm94SW5kZXg6IGluZGV4LFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfTWluaWdhbWVMb3R0ZXJ5LmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJTX01pbmlnYW1lTG90dGVyeSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19NaW5pZ2FtZUxvdHRlcnksIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K+35rGC5bCP5ri45oiP5L+h5oGvXG4gICAgICovXG4gICAgcHJpdmF0ZSBDMlNfTWluaWdhbWVJbmZvKCk6IHZvaWQge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19NaW5pZ2FtZUluZm8uY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcmlhbDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKClcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX01pbmlnYW1lSW5mby5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19NaW5pZ2FtZUluZm8sIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfTWluaWdhbWVJbmZvLCBidWZmZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWTjeW6lOWwj+a4uOaIj+S/oeaBr1xuICAgICAqL1xuICAgIHByaXZhdGUgb25FdmVudF9TMkNfTWluaWdhbWVJbmZvKGRhdGE6IE1TVC5JUzJDX01pbmlnYW1lSW5mbyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9taW5pZ2FtZUluZm8gPSBkYXRhO1xuICAgICAgICB0aGlzLnJlZnJlc2hUYXNrKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEJvbnVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ZON5bqU5bCP5ri45oiP5byA5aWWXG4gICAgICogQHBhcmFtIGRhdGEge01TVC5JUzJDX01pbmlnYW1lTG90dGVyeX0g5pWw5o2uXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkV2ZW50X1MyQ19NaW5pZ2FtZUxvdHRlcnkoZGF0YTogTVNULklTMkNfTWluaWdhbWVMb3R0ZXJ5KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChNaW5pZ2FtZURlZmluZS5Tb3VuZC5PUEVOX0JPWCwgdGhpcy5idW5kbGUpO1xuICAgICAgICB0aGlzLl9taW5pZ2FtZUluZm8uaXNSZWNlaXZlQm9udXMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9taW5pZ2FtZUxvdHRlcnkgPSBkYXRhO1xuICAgICAgICB0aGlzLnBsYXlMb3R0ZXJ5QW5pbSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOe7keWumumCrueuseWTjeW6lFxuICAgICAqL1xuICAgIHByaXZhdGUgb25FdmVudF9TMkNfQmluZEVtYWlsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZnJlc2hUYXNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55m76ZmG5oiQ5Yqf5ZON5bqUXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblVwZGF0ZVVzZXJJbmZvKCk6IHZvaWQge1xuICAgICAgICB0aGlzLkMyU19NaW5pZ2FtZUluZm8oKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnN0b3BNdXNpYygpO1xuICAgIH1cbn1cbiJdfQ==