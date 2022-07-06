"use strict";
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