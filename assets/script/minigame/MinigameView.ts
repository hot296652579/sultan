import BindEmailView from "../common/bindItemView/BindEmailView";
import TitleItemPageUser from "../common/item/TitleItemPageUser";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import NumberUtils from "../common/utils/NumberUtils";
import TypeUtils from "../common/utils/TypeUtils";
import UserData from "../data/UserData";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import { MST } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";
import { MinigameDefine } from "./MinigameDefine";
import MinigameGoldView from "./MinigameGoldView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class MinigameView extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.SpriteFrame)
    private spfFinish: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private spfUnFinish: cc.SpriteFrame = null;

    @property(sp.Skeleton)
    private spnAwardBox: sp.Skeleton = null;

    @property([cc.Sprite])
    private imgBoxShadow: cc.Button[] = [];

    @property(cc.Label)
    private labTaskTitle: cc.Label = null;

    @property(cc.Node)
    private nodTaskItem0: cc.Node = null;

    @property(cc.Button)
    private btnBindEmail: cc.Button = null;

    @property(cc.Label)
    private labBindEmail: cc.Label = null;

    @property(cc.Node)
    private nodTaskItem1: cc.Node = null;

    @property(cc.Label)
    private labBonusTitle: cc.Label = null;

    @property(cc.Label)
    private labBonusTips: cc.Label = null;

    @property(cc.Label)
    private labBonusGold: cc.Label = null;

    @property(TitleItemPageUser)
    private titleItemPageUser: TitleItemPageUser = null;

    // 用户数据
    private _userData: UserData = null;
    // 小游戏信息
    private _minigameInfo: MST.IS2C_MinigameInfo = null;
    // 小游戏开奖结果
    private _minigameLottery: MST.IS2C_MinigameLottery = null;

    public static getPrefabUrl() {
        return "minigame/prefabs/MinigameView";
    }

    onLoad() {
        super.onLoad();

        this.audioHelper.playMusic(MinigameDefine.BGM, this.bundle);

        this.initData();
        this.initUI();

        this.C2S_MinigameInfo();
    }

    start() {

    }

    private initData(): void {
        this._userData = G.DataMgr.get(UserData);
        this._minigameInfo = null;
        this._minigameLottery = null;
    }

    private initUI(): void {
        this.spnAwardBox.node.active = false;
        this.labTaskTitle.string = "";
        this.labBonusTitle.string = "";
        this.labBonusTips.string = "";
        this.labBonusGold.string = "";
        this.nodTaskItem0.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = this.spfUnFinish;
        this.nodTaskItem1.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = this.spfUnFinish;
        this.btnBindEmail.node.active = true;
    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_S2C_MinigameInfo", this.onEvent_S2C_MinigameInfo);
        this.registerEvent("Event_S2C_MinigameLottery", this.onEvent_S2C_MinigameLottery);
        this.registerEvent("Event_S2C_BindEmail", this.onEvent_S2C_BindEmail);
        this.registerEvent("updateUserInfo", this.onUpdateUserInfo)

    }

    private onLanguageChange(): void {
        this.titleItemPageUser.languagePageName(Manager.makeLanguage("Minigame.labPageName"));
        this.labTaskTitle.language = Manager.makeLanguage("Minigame.labTaskTitle");
        this.nodTaskItem0.getChildByName("labTaskDesc").getComponent(cc.Label).language = Manager.makeLanguage("Minigame.labTaskDesc0");
        this.labBindEmail.language = Manager.makeLanguage("Minigame.labBindEmail");
        this.nodTaskItem1.getChildByName("labTaskDesc").getComponent(cc.Label).language = Manager.makeLanguage("Minigame.labTaskDesc1");
        this.labBonusTitle.language = Manager.makeLanguage("Minigame.labBonusTitle");
        this.labBonusTips.language = Manager.makeLanguage("Minigame.labBonusTips");

        if (this._minigameInfo && !TypeUtils.isNull(this._minigameInfo.todayBonus)) {
            this.labBonusGold.language = Manager.makeLanguage(["Minigame.RpGold", NumberUtils.converToC(this._minigameInfo.todayBonus)]);
        }
    }

    public show(args?: any[]): void {
        super.show(args);

        this.onLanguageChange();
    }

    private refreshTask(): void {
        let spfIsBindEmail: cc.SpriteFrame = null;
        if (this.isBindEmail()) {
            spfIsBindEmail = this.spfFinish;
            this.btnBindEmail.node.active = false;
        } else {
            spfIsBindEmail = this.spfUnFinish;
            this.btnBindEmail.node.active = true;
        }
        this.nodTaskItem0.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = spfIsBindEmail;

        let spfIsFinish: cc.SpriteFrame = null;
        if (this._minigameInfo.isFinishGame) {
            spfIsFinish = this.spfFinish;
        } else {
            spfIsFinish = this.spfUnFinish;
        }
        this.nodTaskItem1.getChildByName("imgIsFinish").getComponent(cc.Sprite).spriteFrame = spfIsFinish;
    }

    private refreshBonus(): void {
        this.labBonusGold.language = Manager.makeLanguage(["Minigame.RpGold", NumberUtils.converToC(this._minigameInfo.todayBonus)]);
    }

    private playLotteryAnim(): void {
        let btnAwardBox: cc.Button = this.imgBoxShadow[this._minigameLottery.boxIndex].node.getChildByName("btnAwardBox").getComponent(cc.Button);
        let awardBoxWorldPos: cc.Vec2 = btnAwardBox.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let spnAwardBoxPos: cc.Vec2 = this.spnAwardBox.node.parent.convertToNodeSpaceAR(awardBoxWorldPos)

        btnAwardBox.node.active = false;
        this.spnAwardBox.node.active = true;
        this.spnAwardBox.node.position = cc.v2(spnAwardBoxPos.x, spnAwardBoxPos.y - 5.5);

        let kaiAnim = this.spnAwardBox.setAnimation(0, "kai", false);
        this.spnAwardBox.setTrackCompleteListener(kaiAnim, this.onAnimOpenBoxFinish.bind(this));
    }

    private clickBox(index: number): void {
        if (!this.isBindEmail()) {
            PanelHelp.showTip(i18n.Tips.PleaseBindYourEmail);
            return;
        }

        if (!this._minigameInfo.isFinishGame) {
            PanelHelp.showTip(i18n.Tips.CompleteAnyGameToGetIt);
            return;
        }

        if (this._minigameInfo.isReceiveBonus) {
            PanelHelp.showTip(i18n.Tips.BonusAlreadyReceived);
            return;
        }

        this.C2S_MinigameLottery(index);
    }

    private clickBindEmail(): void {
        Manager.uiManager.open({ type: BindEmailView, bundle: BUNDLE_RESOURCES });
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
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

    private onAnimOpenBoxFinish(entry: sp.spine.TrackEntry, loopCount: number): void {
        let goldWorldPos: cc.Vec2 = this.titleItemPageUser.getGoldWorldPos();
        let goldLocalPos: cc.Vec2 = this.node.convertToNodeSpaceAR(goldWorldPos);
        Manager.uiManager.open({ type: MinigameGoldView, bundle: BUNDLE_RESOURCES, args: [this._minigameLottery.award, goldLocalPos] });
        this.spnAwardBox.setAnimation(0, "daiji", true);
    }

    private isBindEmail(): boolean {
        return !TypeUtils.isNull(this._userData.email) && this._userData.email.length > 0;
    }

    /**
     * 请求小游戏开奖
     * @param index {number} 盒子下标
     */
    private C2S_MinigameLottery(index: number): void {
        let req = MST.C2S_MinigameLottery.create({
            serial: Manager.netManager.getNewSeqId(),
            boxIndex: index,
        });
        let buffer = MST.C2S_MinigameLottery.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_MinigameLottery, MST.OuterOpcode_Lobby.C2S_MinigameLottery, buffer);
    }

    /**
     * 请求小游戏信息
     */
    private C2S_MinigameInfo(): void {
        let req = MST.C2S_MinigameInfo.create({
            serial: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2S_MinigameInfo.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_MinigameInfo, MST.OuterOpcode_Lobby.C2S_MinigameInfo, buffer);
    }

    /**
     * 响应小游戏信息
     */
    private onEvent_S2C_MinigameInfo(data: MST.IS2C_MinigameInfo): void {
        this._minigameInfo = data;
        this.refreshTask();
        this.refreshBonus();
    }

    /**
     * 响应小游戏开奖
     * @param data {MST.IS2C_MinigameLottery} 数据
     */
    private onEvent_S2C_MinigameLottery(data: MST.IS2C_MinigameLottery): void {
        this.audioHelper.playEffect(MinigameDefine.Sound.OPEN_BOX, this.bundle);
        this._minigameInfo.isReceiveBonus = true;
        this._minigameLottery = data;
        this.playLotteryAnim();
    }

    /**
     * 绑定邮箱响应
     */
    private onEvent_S2C_BindEmail(): void {
        this.refreshTask();
    }

    /**
     * 登陆成功响应
     */
    private onUpdateUserInfo(): void {
        this.C2S_MinigameInfo();
    }

    onDestroy(): void {
        super.onDestroy();
        this.audioHelper.stopMusic();
    }
}
