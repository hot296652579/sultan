import { dispatchEnterComplete, LogicType, LogicEvent } from "../../../../script/common/event/LogicEvent";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService, makeKey } from "../../../../script/framework/decorator/Decorators";
import UIView from "../../../../script/framework/ui/UIView";
import AppData from "../../../../script/data/AppData";
import { CrashRateDefine } from "../define/CrashRateDefine";
import { CrashInterface } from "../interface/CrashInterface";
import UserData from "../../../../script/data/UserData";
import CrashBetPlayerListView from "../component/CrashBetPlayerListView";
import { Crash } from "../data/CrashGameData";
import Operation from "../../../../script/framework/extentions/Operation";
import { UtilMgr } from "../../../../script/global/UtilMgr";
import { MST } from "../../../../script/framework/external/protoc";
import { CrashColorDefine } from "../define/CrashColorDefine";
import { Manager } from "../../../../script/common/manager/Manager";
import { CrashConfig } from "../config/CrashConfig";
import DateUtils from "../../../../script/framework/extentions/DateUtils";
import { ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { EventApi } from "../../../../script/framework/event/EventApi";
import PanelHelp from "../../../../script/msgbox/PanelHelp";
import { Config } from "../../../../script/common/config/Config";
import CrashRecordItem from "./CrashRecordItem";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import CrashUtils from "../utils/CrashUtils";
import CrashBetPlayerItem from "./CrashBetPlayerItem";
import CrashData from "../data/CrashData";
import CrashTotalRecordView from "./CrashTotalRecordView";
import CrashMyRecordView from "./CrashMyRecordView";
import TitleItemPageUser from "../../../../script/common/item/TitleItemPageUser";
import CrashEscapePlayerItem from "./CrashEscapePlayerItem";
import { CrashDefine } from "../define/CrashDefine";
import IndicatorView from "../../../../script/common/view/IndicatorView";

// 最小下注金额
const MIN_BET_GOLD: number = 2000;
// 最大下注金额
const MAX_BET_GOLD: number = 440000;
// 最小倍数
const MIN_RATE: number = 1.01;
// 最大倍数
const MAX_RATE: number = 200;
// 最小自动下注圈数
const MIN_ROUND: number = 2;
// 最大自动下注圈数
const MAX_ROUND: number = 999999;
// 火箭冲刺时间（单位：毫秒）
const ROCKET_SPRINT_TIME: number = 1300;
// 火箭起点
const ROCKET_START_POS: cc.Vec2 = cc.v2(-267, -523);
// 火箭 C1 贝塞尔
const ROCKET_C1_POS: cc.Vec2 = cc.v2(-193.698, -568.591);
// 火箭 C2 贝塞尔
const ROCKET_C2_POS: cc.Vec2 = cc.v2(318.892, -556.202);
// 火箭终点
const ROCKET_END_POS: cc.Vec2 = cc.v2(294.267, -221.552);
// 背景移动时间（单位：毫秒）
const BG_MOVE_TIME: number = 1300;
// 移动到星空 y 坐标
const MOVE_TO_SKY_Y: number = -120;
// 移动到山体 y 坐标
const MOVE_TO_MOUNT_Y: number = 77;
// 静态星星渐显时间
const STATIC_STAR_FADE_IN_TIME: number = 500;
// 静态星星渐隐时间
const STATIC_STAR_FADE_OUT_TIME: number = 500;
// 动态星星渐显时间
const DYNAMIC_STAR_FADE_IN_TIME: number = 500;
// 动态星星渐隐时间
const DYNAMIC_STAR_FADE_OUT_TIME: number = 500;
// 降落终点 y
const DESCENT_Y: number = -780;
// 降落动画时间（单位：毫秒）
const DESCENT_ANIM_TIME: number = 1000;
// 处理 1 倍时不播放动画
const MIN_RATE_RETURN: number = 100;
// 初始逃跑玩家节点数量
const INIT_ESCAPE_PALYER_COUNT: number = 10;
// 逃跑玩家下落时间（单位：毫秒）
const ESCAPE_PLAYER_DROP_TIME: number = 3000;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashGameView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Sprite)
    private imgGameBg: cc.Sprite = null;

    @property(sp.Skeleton)
    private speStaticStar: sp.Skeleton = null;

    @property(sp.Skeleton)
    private speDynamicStar: sp.Skeleton = null;

    @property(cc.Node)
    private nodGameBet: cc.Node = null;

    @property(cc.Label)
    private labStartTips: cc.Label = null;

    @property(cc.Label)
    private labStopTips: cc.Label = null;

    @property(cc.Label)
    private labStartCountDown: cc.Label = null;

    @property(cc.ProgressBar)
    private pgbStartCountDown: cc.ProgressBar = null;

    @property(cc.Node)
    private nodGameStart: cc.Node = null;

    @property(cc.Node)
    private nodStartRocket: cc.Node = null;

    @property(cc.Sprite)
    private imgBackLight: cc.Sprite = null;

    @property(sp.Skeleton)
    private speGameStart: sp.Skeleton = null;

    @property(cc.Mask)
    private mskTail: cc.Mask = null;

    @property(cc.Sprite)
    private imgTail0: cc.Sprite = null;

    @property(cc.Sprite)
    private imgTail1: cc.Sprite = null;

    @property(cc.Label)
    private labRate: cc.Label = null;

    @property(cc.Node)
    private nodGameEnd: cc.Node = null;

    @property(cc.Label)
    private labBombRate: cc.Label = null;

    @property(sp.Skeleton)
    private speBomb: sp.Skeleton = null;

    @property(sp.Skeleton)
    private speDescent: sp.Skeleton = null;

    @property(cc.Node)
    private nodEscapeDrop: cc.Node = null;

    @property(cc.Layout)
    private latRecord: cc.Layout = null;

    @property(cc.Label)
    private labManual: cc.Label = null;

    @property(cc.Label)
    private labAuto: cc.Label = null;

    @property(cc.Toggle)
    private tggManual: cc.Toggle = null;

    @property(cc.Toggle)
    private tggAuto: cc.Toggle = null;

    @property(cc.Layout)
    private latManual: cc.Layout = null;

    @property(cc.EditBox)
    private edbBetGold: cc.EditBox = null;

    @property(cc.Button)
    private btnNextBet: cc.Button = null;

    @property(cc.Button)
    private btnCurrBet: cc.Button = null;

    @property(cc.Toggle)
    private tggSwitchRate: cc.Toggle = null;

    @property(cc.Label)
    private labSwitchRate: cc.Label = null;

    @property(cc.Button)
    private btnSub: cc.Button = null;

    @property(cc.Button)
    private btnAdd: cc.Button = null;

    @property(cc.EditBox)
    private edbChangeRate: cc.EditBox = null;

    @property(cc.Layout)
    private latAuto: cc.Layout = null;

    @property(cc.EditBox)
    private edbBetGoldAuto: cc.EditBox = null;

    @property(cc.Label)
    private labRoundTitle: cc.Label = null;

    @property(cc.Button)
    private btnAdd1: cc.Button = null;

    @property(cc.Button)
    private btnSub1: cc.Button = null;

    @property(cc.EditBox)
    private edbRound: cc.EditBox = null;

    @property(cc.Toggle)
    private tggSwitchRateAuto: cc.Toggle = null;

    @property(cc.Label)
    private labSwitchRateAuto: cc.Label = null;

    @property(cc.Button)
    private btnSubAuto: cc.Button = null;

    @property(cc.Button)
    private btnAddAuto: cc.Button = null;

    @property(cc.EditBox)
    private edbChangeRateAuto: cc.EditBox = null;

    @property(cc.Label)
    private labStopProfitTitle: cc.Label = null;

    @property(cc.EditBox)
    private edbStopProfit: cc.EditBox = null;

    @property(cc.Label)
    private labStopLossTitle: cc.Label = null;

    @property(cc.EditBox)
    private edbStopLess: cc.EditBox = null;

    @property(cc.Button)
    private btnAutoBet: cc.Button = null;

    @property(cc.Button)
    private btnCancelAutoBet: cc.Button = null;

    @property(cc.Label)
    private labBetListTitle: cc.Label = null;

    @property(cc.Label)
    private labTotalBetCount: cc.Label = null;

    @property(cc.Label)
    private labTotalBetGold: cc.Label = null;

    @property(cc.Label)
    private labPlayerTtile: cc.Label = null;

    @property(cc.Label)
    private labBetGoldTitle: cc.Label = null;

    @property(cc.Label)
    private labIncomeTitle: cc.Label = null;

    @property(CrashBetPlayerListView)
    private lsvBetPlayer: CrashBetPlayerListView = null;

    @property(cc.Label)
    private labGameNo: cc.Label = null;

    @property(cc.Label)
    private labHash1: cc.Label = null;

    @property(cc.Label)
    private labSeed: cc.Label = null;

    @property(cc.Label)
    private labHash2: cc.Label = null;

    @property(cc.Label)
    private labAcak: cc.Label = null;

    @property(cc.Label)
    private labPoint: cc.Label = null;

    @property(TitleItemPageUser)
    private titleItemPageUser: TitleItemPageUser = null;

    @property(cc.Prefab)
    private pfbCrashEscapePlayerItem: cc.Prefab = null;

    // 游戏数据
    private _crashData: CrashData = null;
    // 应用数据
    private _appData: AppData = null;
    // 用户数据
    private _userData: UserData = null;
    // 火箭贝塞尔动画
    private _rocketBezierTween: cc.Tween = null;
    // 火箭每帧移动轨迹列表
    private _rocketFramePos: cc.Vec2[] = null;
    // 背景移动动画
    private _bgMoveTween: cc.Tween = null;
    // 静态星星显隐动画
    private _staticStarFadeTween: cc.Tween = null;
    // 动态星星下落动画
    private _dynamicStarTween: cc.Tween = null;
    // 自动下注数据
    private _autoBetReqData: MST.IC2M_MyCrashBet_Req = null;
    // 拖尾原始宽高
    private _tailOriginSize: cc.Size = null;
    // 下降动画
    private _descentTween: cc.Tween = null;
    // 是否提前爆炸
    private _isBomb: boolean = false;
    // 逃跑人员节点池
    private _escapePlayerNodePool: cc.NodePool = null;

    public static getPrefabUrl() {
        return "prefabs/CrashGameView";
    }

    onLoad() {
        super.onLoad();
        dispatchEnterComplete({ type: LogicType.GAME, views: [this] });

        this.initData();
        this.initView();
        this.initPreload();
        this.C2M_GetCrashInfo_Req();
    }

    start() {

    }

    show(args) {
        super.show(args);

        this.onLanguageChange();
    }

    private initData(): void {
        this._crashData = G.DataMgr.get(CrashData);
        this._appData = G.DataMgr.get(AppData);
        this._userData = G.DataMgr.get(UserData);
        this._rocketBezierTween = null;
        this._rocketFramePos = [];
        this._autoBetReqData = null;
        this._tailOriginSize = this.mskTail.node.getContentSize();
        this._escapePlayerNodePool = new cc.NodePool();
    }

    private initView(): void {
        this.initBg();
        this.initGame();
        this.initMode();
        this.initBet();
        this.initRate();
        this.initBetList();
        this.initHashInfo();
    }

    private initPreload(): void {
        for (let i: number = 0; i < INIT_ESCAPE_PALYER_COUNT; ++i) {
            this.putEscapePlayerItem(cc.instantiate(this.pfbCrashEscapePlayerItem));
        }
    }

    private initHashInfo(): void {
        this.labGameNo.string = "";
        this.labHash1.string = "";
        this.labSeed.string = "";
        this.labHash2.string = "";
        this.labAcak.string = "tersembunyi";
        this.labPoint.string = "tersembunyi";
    }

    private initRoundHash(): void {
        this.labHash2.string = "";
        this.labAcak.string = "tersembunyi";
        this.labPoint.string = "tersembunyi";
    }

    private nextView(): void {
        this.nextHashInfo();
        this.initBetList();
        this.refreshBetButton();
        this.refreshGame();
        this.playStaticStarFadeAnim(true);
        this.stopDescentAnim();
    }

    private nextHashInfo(): void {
        this.labHash2.string = "";
        this.labAcak.string = "tersembunyi";
        this.labPoint.string = "tersembunyi";
    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_M2C_GetCrashInfo_Res", this.onEvent_M2C_GetCrashInfo_Res);
        this.registerEvent("Event_M2C_CrashStart_mes", this.onEvent_M2C_CrashStart_mes);
        this.registerEvent("Event_M2C_MyCrashBet_Res", this.onEvent_M2C_MyCrashBet_Res);
        this.registerEvent("Event_M2C_CrashBet_Mes", this.onEvent_M2C_CrashBet_Mes);
        this.registerEvent("Event_M2C_CrashStop_Mes", this.onEvent_M2C_CrashStop_Mes);
        this.registerEvent("Event_M2C_CrashStartBet_Mes", this.onEvent_M2C_CrashStartBet_Mes);
        this.registerEvent("Event_M2C_CrashEscape_Mes", this.onEvent_M2C_CrashEscape_Mes);
        this.registerEvent("Event_M2C_CrashStopBet_Mes", this.onEvent_M2C_CrashStopBet_Mes);
        this.registerEvent("Event_M2C_CrashCancelAutoBet_Res", this.onEvent_M2C_CrashCancelAutoBet_Res);
        this.registerEvent("Event_M2C_CrashCancelAutoBet_Mes", this.onEvent_M2C_CrashCancelAutoBet_Mes);
        this.registerEvent("Event_M2C_CrashHash_Mes", this.onEvent_M2C_CrashHash_Mes);
        this.registerEvent("Event_M2C_TransferMap_Res", this.onEvent_M2C_TransferMap_Res);

    }

    onLanguageChange() {
        this.titleItemPageUser.languagePageName(Manager.makeLanguage("labPageName", true));
        this.labManual.language = Manager.makeLanguage("labManual", true);
        this.labAuto.language = Manager.makeLanguage("labAuto", true);
        this.labSwitchRate.language = Manager.makeLanguage("labSwitchRate", true);
        this.labRoundTitle.language = Manager.makeLanguage("labRoundTitle", true);
        this.labSwitchRateAuto.language = Manager.makeLanguage("labSwitchRate", true);
        this.labStopProfitTitle.language = Manager.makeLanguage("labStopProfitTitle", true);
        this.labStopLossTitle.language = Manager.makeLanguage("labStopLossTitle", true);
        this.labBetListTitle.language = Manager.makeLanguage("labBetListTitle", true);
        this.labTotalBetCount.language = Manager.makeLanguage("labTotalBetCount", true);
        this.labPlayerTtile.language = Manager.makeLanguage("labPlayerTtile", true);
        this.labBetGoldTitle.language = Manager.makeLanguage("labBetGoldTitle", true);
        this.labIncomeTitle.language = Manager.makeLanguage("labIncomeTitle", true);
        this.labStartTips.language = Manager.makeLanguage("labStartTips", true);
        this.labStopTips.language = Manager.makeLanguage("labStopTips", true);
    }

    /**
     * 刷新游戏倒计时
     */
    private updateCountDonw(): void {
        let ms: number = this._crashData.stopBetTimestamp - this._appData.getServerTimestamp();
        if (ms <= 0) {
            ms = 0;
            this.labStartCountDown.string = DateUtils.getMsToS(ms);
            this.pgbStartCountDown.progress = ms;
            this.stopCountDown();
            return;
        }

        let stop2StartMs: number = this._crashData.stopBetTimestamp - this._crashData.startBetTimestamp;

        this.labStartCountDown.string = DateUtils.getMsToS(ms);
        this.pgbStartCountDown.progress = ms / stop2StartMs;
        this.pgbStartCountDown.node.active = true;
    }

    /**
     * 启动游戏倒计时
     */
    private startCountDown() {
        this.stopCountDown();
        this.schedule(this.updateCountDonw);
    }

    /**
     * 停止游戏倒计时
     */
    private stopCountDown() {
        this.unschedule(this.updateCountDonw);
    }

    private updateTitalColor(rate: number): void {
        let color: cc.Color = CrashColorDefine.Tail.WHITE;

        if (rate >= CrashRateDefine.ColorRate.YEELOW) {
            color = CrashColorDefine.Tail.YEELOW;
        } else if (rate >= CrashRateDefine.ColorRate.BLUE) {
            color = CrashColorDefine.Tail.BLUE;
        } else if (rate >= CrashRateDefine.ColorRate.GREEN) {
            color = CrashColorDefine.Tail.GREEN;
        } else if (rate >= CrashRateDefine.ColorRate.RED) {
            color = CrashColorDefine.Tail.RED;
        }

        this.imgTail1.node.color = color;
        this.imgBackLight.node.color = color;
    }

    private updateBetList(rate: number): void {
        if (this._crashData.betPlayerMap.size <= 0 || this.lsvBetPlayer.getChildCount() < this._crashData.betPlayerMap.size) {
            return;
        }

        let delKeyList: number[] = [];
        this._crashData.betPlayerMap.forEach((value: CrashInterface.BetPlayer, key: number) => {
            if (rate >= value.betInfo.Multiple) {
                let betPlayerNode: cc.Node = this.lsvBetPlayer.getChildNodeByIndex(key);
                let betPlayerSrc: CrashBetPlayerItem = betPlayerNode.getComponent(CrashBetPlayerItem);
                betPlayerSrc.setIsWin(true);
                delKeyList.push(key);
            }
        });

        for (let v of delKeyList) {
            this._crashData.betPlayerMap.delete(v);
        }
    }

    private updateRate(): void {
        let rate: number = this._crashData.getRate();
        if (rate === null) {
            this.labRate.string = "";
            return;
        }

        this.updateBetList(rate);

        // 需要做爆炸处理
        let bombRate: number = this._crashData.roundBombRate;
        if (rate >= bombRate) {
            this.updateTitalColor(bombRate);
            this.labRate.string = UtilMgr.toPadding(NumberUtils.converToC(bombRate), 2) + "x";;
            this.doBomb();
            return;
        }

        this.updateTitalColor(rate);

        this.labRate.string = UtilMgr.toPadding(NumberUtils.converToC(rate), 2) + "x";;
    }

    private startRate(): void {
        this.stopRate();
        this.schedule(this.updateRate);
    }

    private stopRate(): void {
        this.labRate.string = "";
        this.unschedule(this.updateRate);
    }

    private putEscapePlayerItem(escapePlayerNode: cc.Node): void {
        let escapePlayerSrc: CrashEscapePlayerItem = escapePlayerNode.getComponent(CrashEscapePlayerItem);
        escapePlayerSrc.reset();
        escapePlayerNode.removeFromParent();

        this._escapePlayerNodePool.put(escapePlayerNode);
    }

    private getEscapePlayerItem(): cc.Node {
        let escapePlayerNode: cc.Node = this._escapePlayerNodePool.get();
        if (!escapePlayerNode) {
            escapePlayerNode = cc.instantiate(this.pfbCrashEscapePlayerItem);
        }

        return escapePlayerNode;
    }

    private getRocketToTailHeight(): number {
        let rocketWorldPos: cc.Vec2 = this.nodStartRocket.convertToWorldSpaceAR(cc.v2(0, 0));
        let tailWorldPos: cc.Vec2 = this.mskTail.node.convertToWorldSpaceAR(cc.v2(0, 0));
        return rocketWorldPos.sub(tailWorldPos).y;
    }

    /**
     * 获取角度通过 2 个点
     * @param p1 {number} 点1
     * @param p2 {number} 点2
     * @returns {number} 角度
     */
    private getAngleByPoint2(p1: cc.Vec2, p2: cc.Vec2): number {
        let dx: number = p2.x - p1.x;
        let dy: number = p2.y - p1.y;
        let dir: cc.Vec2 = cc.v2(dx, dy);
        let angle: number = dir.signAngle(cc.v2(1, 0));
        let degree: number = angle / Math.PI * 180;
        return -degree;
    }

    private setRocketWaitStatus(): void {
        this.nodStartRocket.angle = 0;
        this.nodStartRocket.position = ROCKET_START_POS;
    }

    private setRocketEndStatus(): void {
        this.nodStartRocket.angle = 90;
        this.nodStartRocket.position = ROCKET_END_POS;
    }

    private updateRocketRotate(): void {
        let framePosLen: number = this._rocketFramePos.length;
        let lastPos: cc.Vec2 = this._rocketFramePos[framePosLen - 1];
        let currRocketPos: cc.Vec2 = this.nodStartRocket.position;

        if (lastPos !== undefined && lastPos.equals(currRocketPos)) {
            return;
        }

        this._rocketFramePos.push(currRocketPos);

        if (framePosLen >= 2) {
            this.nodStartRocket.angle = this.getAngleByPoint2(this._rocketFramePos[framePosLen - 2], this._rocketFramePos[framePosLen - 1]);
            this.mskTail.node.height = this.getRocketToTailHeight();
        }
    }

    private startUpdateRocketRotate(): void {
        this.stopUpdateRocketRotate();
        this.schedule(this.updateRocketRotate);
    }

    private stopUpdateRocketRotate(): void {
        this.unschedule(this.updateRocketRotate);
        this._rocketFramePos.length = 0;
    }

    private playBombAnim(): void {
        this.speBomb.node.position = this.nodStartRocket.position;
        this.speBomb.setAnimation(0, "animation", false);
    }

    private playEscapePlayerDropAnim(nick: string): void {
        let escapePlayerNode: cc.Node = this.getEscapePlayerItem();
        this.nodEscapeDrop.addChild(escapePlayerNode);
        let escapePlayerSrc: CrashEscapePlayerItem = escapePlayerNode.getComponent(CrashEscapePlayerItem);
        escapePlayerSrc.onShow(nick);

        let startPos: cc.Vec2 = this.nodStartRocket.position;

        cc.tween(escapePlayerNode)
            .set({ position: startPos })
            .to(ESCAPE_PLAYER_DROP_TIME / 1000, { position: cc.v2(startPos.x, DESCENT_Y) })
            .call(() => {
                this.putEscapePlayerItem(escapePlayerNode);
            })
            .start();
    }

    /**
     * 播放下降动画
     */
    private playDescentAnim(): void {
        this.stopDescentAnim();
        let rocketPos: cc.Vec2 = this.nodStartRocket.position;
        this.speDescent.node.position = rocketPos;
        this._descentTween = cc.tween(this.speDescent.node)
            .to(DESCENT_ANIM_TIME / 1000, { y: DESCENT_Y })
            .start();
    }

    /**
     * 停止下降动画
     */
    private stopDescentAnim(): void {
        if (this._descentTween) {
            this._descentTween.stop();
        }
    }

    private playDynamicStarFadeAnim(isShow: boolean): void {
        this.stopDynamicStarFadeAnim();

        this._dynamicStarTween = cc.tween(this.speDynamicStar.node)

        if (isShow) {
            this.speDynamicStar.setAnimation(0, "animation", true);
            this._dynamicStarTween
                .to(Operation.div(DYNAMIC_STAR_FADE_IN_TIME, 1000), { opacity: 255 })
                .start()
        } else {
            this._dynamicStarTween = cc.tween(this.speDynamicStar.node)
                .to(Operation.div(DYNAMIC_STAR_FADE_OUT_TIME, 1000), { opacity: 0 })
                .start()
        }
    }

    private stopDynamicStarFadeAnim(): void {
        if (this._dynamicStarTween) {
            this._dynamicStarTween.stop();
            this._dynamicStarTween = null;
        }
    }

    private playDynamicStarDropAnim(): void {
        this.speDynamicStar.paused = false;
        this.speDynamicStar.setAnimation(0, "animation", true);
    }

    private pauseDynamicStarDropAnim(): void {
        this.speDynamicStar.paused = true;
    }

    private playStaticStarFadeAnim(isShow: boolean): void {
        this.stopStaticStarFadeAnim();
        if (isShow) {
            this._staticStarFadeTween = cc.tween(this.speStaticStar.node)
                .to(Operation.div(STATIC_STAR_FADE_IN_TIME, 1000), { opacity: 255 })
                .start();
        } else {
            this._staticStarFadeTween = cc.tween(this.speStaticStar.node)
                .to(Operation.div(STATIC_STAR_FADE_OUT_TIME, 1000), { opacity: 0 })
                .start();
        }
    }

    private stopStaticStarFadeAnim(): void {
        if (this._staticStarFadeTween) {
            this._staticStarFadeTween.stop();
            this._staticStarFadeTween = null;
        }
    }

    private playBgMoveAnim(): void {
        this.stopBgMoveAnim();
        this._bgMoveTween = cc.tween(this.imgGameBg.node)
            .to(Operation.div(BG_MOVE_TIME, 1000), { y: MOVE_TO_SKY_Y })
            .start();
    }

    private stopBgMoveAnim(): void {
        if (this._bgMoveTween) {
            this._bgMoveTween.stop();
            this._bgMoveTween = null;
        }
    }

    private playRocketAnim(): void {
        this.stopRocketAnim();
        this.setRocketWaitStatus();
        this.startUpdateRocketRotate();
        this._rocketBezierTween = cc.tween(this.nodStartRocket)
            .bezierTo(Operation.div(ROCKET_SPRINT_TIME, 1000), ROCKET_C1_POS, ROCKET_C2_POS, ROCKET_END_POS)
            .call(() => {
                this.stopUpdateRocketRotate();
                this.setRocketEndStatus();
            })
            .start();
    }

    private stopRocketAnim(): void {
        this.stopUpdateRocketRotate();
        if (this._rocketBezierTween) {
            this._rocketBezierTween.stop();
            this._rocketBezierTween = null;
        }
    }

    private initGameStartNode(): void {
        this.setRocketWaitStatus();
    }

    private refreshGame(): void {
        this.initGame();
        switch (this._crashData.status) {
            case MST.CrashStatus.StartBet: {
                this.audioHelper.playMusic(Crash.SOUNDS.BGM, this.bundle);
                this.initBg();
                this.nodGameBet.active = true;
                this.labStartTips.node.active = true;
                this.labStopTips.node.active = false;
                this.startCountDown();
                this.playStaticStarFadeAnim(true);
            }
                break;
            case MST.CrashStatus.StopBet: {
                this.initGameStartNode();
                this.nodGameStart.active = true;
                this.playStaticStarFadeAnim(true);
            }
                break;
            case MST.CrashStatus.GameBegin: {
                this.audioHelper.stopMusic();
                this.nodGameStart.active = true;
                this.startRate();
                this.playDynamicStarDropAnim();
                this.playDynamicStarFadeAnim(true);
                this.setRocketEndStatus();
                this.setGameBgSky();
                this.mskTail.node.setContentSize(this._tailOriginSize);
            }
                break;
            case MST.CrashStatus.GameOver: {
                this.playBombAnim();
                this.nodGameEnd.active = true;
                this.labBombRate.string = "@" + NumberUtils.converToC(this._crashData.roundBombRate) + "x";
                this.pauseDynamicStarDropAnim()
                this.playDescentAnim();
                this.initGameStartNode();
            }
                break;
        }

    }

    private refreshRecord(): void {
        let recordCount: number = this._crashData.rateRecordList.length;
        let showRecordList: number[] = [];
        if (recordCount <= this.latRecord.node.childrenCount) {
            showRecordList = [].concat(this._crashData.rateRecordList);
        } else {
            showRecordList = this._crashData.rateRecordList.slice(-this.latRecord.node.childrenCount, recordCount);
        }

        let index: number = 0;
        for (let v of this.latRecord.node.children) {
            let rate: number = showRecordList[index++];
            let crashRecordItem = v.getComponent(CrashRecordItem);

            if (rate === undefined) {
                crashRecordItem.clear();
            } else {
                crashRecordItem.setRate(rate);
            }
        }
    }

    private resumeBet(): void {
        this.refreshBetButton();
    }

    private refreshAutoBetButton(): void {
        this.btnCancelAutoBet.node.active = false;
        this.btnAutoBet.node.active = false;

        if (this._crashData.autoBetData) {
            this.btnSubAuto.enabled = false;
            this.btnAddAuto.enabled = false;
            this.edbRound.enabled = false;
            this.btnAdd1.interactable = false;
            this.btnSub1.interactable = false;
            this.tggSwitchRateAuto.enabled = false;
            this.btnAddAuto.interactable = false;
            this.btnSubAuto.interactable = false;
            this.edbChangeRateAuto.enabled = false;
            this.edbStopProfit.enabled = false;
            this.edbStopLess.enabled = false;
            this.btnCancelAutoBet.node.active = true;
        } else {
            this.btnSubAuto.enabled = true;
            this.btnAddAuto.enabled = true;
            this.edbRound.enabled = true;
            this.refreshRoundButton();
            this.refreshRateButton(this.edbChangeRateAuto);
            this.tggSwitchRateAuto.enabled = true;
            this.edbChangeRateAuto.enabled = true;
            this.edbStopProfit.enabled = true;
            this.edbStopLess.enabled = true;
            this.btnAutoBet.node.active = true;
        }

        this.refreshRoundButton();
    }

    private refreshGameNo(): void {
        this.labGameNo.string = `Game No.${this._crashData.hashInfo.gameNo}`;
    }

    private refreshSeed(): void {
        this.labHash1.string = this._crashData.hashInfo.serverSeed;
        this.labSeed.string = this._crashData.hashInfo.publicSeed;
    }

    private refreshRoundHash(): void {
        this.labHash2.string = this._crashData.hashInfo.roundHash;
        this.labAcak.string = UtilMgr.setString(this._crashData.hashInfo.acak, 5, true);
        this.labPoint.string = NumberUtils.converToC(this._crashData.hashInfo.point);
    }

    private resumeBetList(): void {
        this.refreshTotalCount();
        this.refreshTotalGold();
        this.refreshBetPlayer();
    }

    private resumeRate(): void {
        this.enableEditboxRate(this.edbChangeRate, this.tggSwitchRate.isChecked);
        this.enableEditboxRate(this.edbChangeRateAuto, this.tggSwitchRateAuto.isChecked);
    }

    private resumeView(): void {
        if (this._crashData.status === null) {
            return;
        }

        this.refreshGame();
        this.refreshRecord();
        this.resumeBet();
        this.resumeBetList();
        this.resumeRate();
        this.refreshAutoBetButton();
    }

    private initBg(): void {
        this.setGameBgMount()
        this.speStaticStar.node.opacity = 0;
        this.speDynamicStar.node.opacity = 0;
    }

    private initGame(): void {
        this.labStartCountDown.string = "";
        this.labRate.string = "";
        this.labBombRate.string = "";
        this.labStartTips.node.active = false;
        this.labStopTips.node.active = false;
        this.nodGameBet.active = false;
        this.nodGameStart.active = false;
        this.nodGameEnd.active = false;
        this.mskTail.node.height = 0;
    }

    private initRecord(): void {
        for (let v of this.latRecord.node.children) {
            let crashRecordItem = v.getComponent(CrashRecordItem);
            crashRecordItem.clear();
        }
    }

    private initMode(): void {
        this.latManual.node.active = this.tggManual.isChecked;
        this.latAuto.node.active = this.tggAuto.isChecked;
    }

    private initBet(): void {
        this.edbBetGold.placeholder = `${MIN_BET_GOLD}-${MAX_BET_GOLD}`;
        this.edbBetGoldAuto.placeholder = `${MIN_BET_GOLD}-${MAX_BET_GOLD}`;
        this.btnCurrBet.node.active = false;
        this.btnNextBet.node.active = false;
    }

    private initRate(): void {
        this.tggSwitchRate.isChecked = false;
        this.tggSwitchRateAuto.isChecked = false;
        this.enableEditboxRate(this.edbChangeRate, this.tggSwitchRate.isChecked);
        this.enableEditboxRate(this.edbChangeRateAuto, this.tggSwitchRateAuto.isChecked);
    }

    private initBetList(): void {
        this.labTotalBetCount.language = Manager.makeLanguage(["labTotalBetCount", 0], true);
        this.labTotalBetGold.string = "0";
        this.lsvBetPlayer.clear();
    }

    private addBetGold(gold: number, edbBetGold: cc.EditBox): void {
        let numBetGold: number = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Operation.add(gold, numBetGold).toString();

        if (edbBetGold === this.edbBetGoldAuto) {
            this.onDidEndedAutoBetGold(edbBetGold);
        }
    }

    private mulBetGold(gold: number, edbBetGold: cc.EditBox): void {
        let numBetGold: number = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Math.floor(Operation.mul(gold, numBetGold)).toString();
    }

    private getEditboxBetGold(edbBetGold: cc.EditBox): number {
        let content: string = edbBetGold.string;
        let numBetGold: number = 0;
        if (content.length > 0) {
            numBetGold = Number(content);
        }
        return numBetGold;
    }

    private addRate(rate: number, edbChangeRate: cc.EditBox): void {
        let numRate: number = this.getEditboxRate(edbChangeRate);
        numRate = Operation.add(numRate, rate);
        if (numRate >= MAX_RATE) {
            numRate = MAX_RATE;
        }
        if (numRate < MIN_RATE) {
            numRate = MIN_RATE;
        }
        this.setEditboxRate(numRate, edbChangeRate);
        this.refreshRateButton(edbChangeRate);
    }

    private subRate(rate: number, edbChangeRate: cc.EditBox): void {
        let numRate: number = this.getEditboxRate(edbChangeRate);
        numRate = Operation.sub(numRate, rate);
        if (numRate <= MIN_RATE) {
            numRate = MIN_RATE;
        }
        this.setEditboxRate(numRate, edbChangeRate);
        this.refreshRateButton(edbChangeRate);
    }

    private addRound(round: number): void {
        let numRound: number = this.getEditboxRound();
        numRound = Operation.add(numRound, round);
        if (numRound >= MAX_ROUND) {
            numRound = MAX_ROUND;
        }
        if (numRound < MIN_ROUND) {
            numRound = MIN_ROUND;
        }
        this.setEditboxRound(numRound);
        this.refreshRoundButton();
    }

    private subRound(round: number): void {
        let numRound: number = this.getEditboxRound();
        numRound = Operation.sub(numRound, round);
        if (numRound <= MIN_ROUND) {
            numRound = MIN_ROUND;
        }
        this.setEditboxRound(numRound);
        this.refreshRoundButton();
    }

    private enableEditboxRate(edbChangeRate: cc.EditBox, isEnable: boolean): void {
        edbChangeRate.enabled = isEnable;
        let nodContent: cc.Node = edbChangeRate.node.getChildByName("TEXT_LABEL");
        let nodPlaceholder: cc.Node = edbChangeRate.node.getChildByName("PLACEHOLDER_LABEL");
        if (isEnable) {
            nodContent.color = CrashColorDefine.EnableRate.ENABLE;
            nodPlaceholder.color = CrashColorDefine.EnableRate.ENABLE;
        } else {
            nodContent.color = CrashColorDefine.EnableRate.DISABLE;
            nodPlaceholder.color = CrashColorDefine.EnableRate.DISABLE;
        }
    }

    private setGameBgSky(): void {
        this.imgGameBg.node.y = MOVE_TO_SKY_Y;
    }

    private setGameBgMount(): void {
        this.imgGameBg.node.y = MOVE_TO_MOUNT_Y;
    }

    private setEditboxRate(rate: number, edbChangeRate: cc.EditBox): void {
        edbChangeRate.string = rate.toString() + "x";
    }

    private getEditboxRate(edbChangeRate: cc.EditBox): number {
        let content: string = edbChangeRate.string;
        content = content.replace(/x/g, "");

        let numRate: number = 0;

        if (content.length > 0) {
            numRate = Number(content);
        }

        return numRate;
    }

    private setEditboxRound(round: number): void {
        this.edbRound.string = round.toString();
    }

    private setEditboxStopProfit(value: number): void {
        this.edbStopProfit.string = value.toString();
    }

    private setEditboxStopLoss(value: number): void {
        this.edbStopLess.string = value.toString();
    }

    private getEditboxRound(): number {
        let content: string = this.edbRound.string;

        let numRound: number = 0;

        if (content.length > 0) {
            numRound = Number(content);
        }

        return numRound;
    }

    private getEditboxProfit(): number {
        let content: string = this.edbStopProfit.string;

        let numProfit: number = 0;

        if (content.length > 0) {
            numProfit = Number(content);
        }

        return numProfit;
    }

    private getEditboxLoss(): number {
        let content: string = this.edbStopLess.string;

        let numLoss: number = 0;

        if (content.length > 0) {
            numLoss = Number(content);
        }

        return numLoss;
    }

    private refreshRateButton(edbChangeRate: cc.EditBox): void {
        let btnSub: cc.Button = null;
        let btnAdd: cc.Button = null;
        let tggSwitchRate: cc.Toggle = null;
        switch (edbChangeRate) {
            case this.edbChangeRate: {
                btnSub = this.btnSub;
                btnAdd = this.btnAdd;
                tggSwitchRate = this.tggSwitchRate;
            }
                break;
            case this.edbChangeRateAuto: {
                btnSub = this.btnSubAuto;
                btnAdd = this.btnAddAuto;
                tggSwitchRate = this.tggSwitchRateAuto;
            }
                break;
        }

        btnSub.interactable = false;
        btnAdd.interactable = false;
        if (!tggSwitchRate.isChecked) {
            return;
        }

        let numRate: number = this.getEditboxRate(edbChangeRate);

        if (numRate > MIN_RATE) {
            btnSub.interactable = true;
        }
        if (numRate < MAX_RATE) {
            btnAdd.interactable = true;
        }
    }

    private refreshRoundButton(): void {
        let btnSub: cc.Button = this.btnSub1;
        let btnAdd: cc.Button = this.btnAdd1;

        btnSub.interactable = false;
        btnAdd.interactable = false;

        let numRound: number = this.getEditboxRound();

        if (numRound <= MIN_ROUND) {
            btnAdd.interactable = true;
        } else if (numRound >= MAX_ROUND) {
            btnSub.interactable = true;
        } else {
            btnAdd.interactable = true;
            btnSub.interactable = true;
        }
    }

    private refreshBetButton(): void {
        this.btnCurrBet.node.active = false;
        this.btnNextBet.node.active = false;
        switch (this._crashData.status) {
            case MST.CrashStatus.StartBet:
                this.btnCurrBet.interactable = true;
                this.btnCurrBet.node.active = true;
                break;
            case MST.CrashStatus.StopBet:
                this.btnCurrBet.interactable = false;
                this.btnCurrBet.node.active = true;
                break;
            case MST.CrashStatus.GameBegin:
            case MST.CrashStatus.GameOver:
                this.btnNextBet.node.active = true;
                break;
            default:
                this.btnCurrBet.interactable = false;
                this.btnCurrBet.node.active = true;
                break;
        }
    }

    private refreshTotalCount(): void {
        this.labTotalBetCount.language = Manager.makeLanguage(["labTotalBetCount", this._crashData.betTotalCount], true);
    }

    private refreshTotalGold(): void {
        this.labTotalBetGold.string = NumberUtils.converToC(this._crashData.betTotalGold);
    }

    private refreshBetPlayer(): void {
        // let betPlayerList: CrashInterface.BetPlayer[] = [];
        // betPlayerList = betPlayerList.concat(this._crashData.myBetList.reverse());
        // betPlayerList = betPlayerList.concat(this._crashData.betList.reverse());
        this.lsvBetPlayer.set(Array.from(this._crashData.betPlayerMap.values()));
    }

    private clickIndicator(targetNode: cc.Node, makeLanguage: (string | number)[] | string): void {
        let worldPos: cc.Vec2 = targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        let localPos: cc.Vec2 = this.node.convertToNodeSpaceAR(worldPos);

        Manager.uiManager.open({ type: IndicatorView, bundle: this.bundle, args: [localPos, makeLanguage] });
    }

    private onClickSwitchRate(target: cc.Toggle): void {
        switch (target) {
            case this.tggSwitchRate: {
                this.enableEditboxRate(this.edbChangeRate, target.isChecked);
                this.refreshRateButton(this.edbChangeRate);
            }
                break;
            case this.tggSwitchRateAuto: {
                this.enableEditboxRate(this.edbChangeRateAuto, target.isChecked);
                this.refreshRateButton(this.edbChangeRateAuto);
            }
                break;
        }
    }

    private onClickBetMode(target: cc.Toggle): void {
        this.latManual.node.active = false;
        this.latAuto.node.active = false;
        this.labManual.node.color = CrashColorDefine.BetMode.UN_SELECt;
        this.labAuto.node.color = CrashColorDefine.BetMode.UN_SELECt;
        switch (target) {
            case this.tggManual: {
                this.latManual.node.active = true;
                this.labManual.node.color = CrashColorDefine.BetMode.SELECTED;
            }
                break;
            case this.tggAuto: {
                this.latAuto.node.active = true;
                this.labAuto.node.color = CrashColorDefine.BetMode.SELECTED;
            }
                break;
        }
    }

    private onBeginBetRate(edb: cc.EditBox): void {
        let content: string = edb.string;
        if (content === "x") {
            edb.string = "";
            return;
        }

        let numRate: number = this.getEditboxRate(edb);
        edb.string = numRate.toString();
    }

    private onChangeRound(content: string, edb: cc.EditBox): void {
        let arrContent: string[] = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg: RegExp = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }

        let legalContent: string = arrContent.join(",").replace(/,/g, "");
        let numContent: number = Number(legalContent);

        if (numContent < MIN_ROUND) {
            content = MIN_ROUND.toString();
        } else if (numContent > MAX_ROUND) {
            content = MAX_ROUND.toString();
        } else {
            content = numContent.toString();
        }
        edb.string = content;

        this.refreshRoundButton();
    }

    private onChangeBetRate(content: string, edb: cc.EditBox): void {
        let arrContent: string[] = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg: RegExp = /[0-9.]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }

        let legalContent: string = arrContent.join(",").replace(/,/g, "");
        let numContent: number = Number(legalContent);

        if (isNaN(numContent)) {
            content = "";
        } else {
            if (numContent % 1 !== 0) {
                numContent = UtilMgr.toFixed(numContent, 2);
            }
            content = numContent.toString();
        }
        edb.string = content;
    }

    private onEndBetRate(edb: cc.EditBox): void {
        let content: string = edb.string;
        if (content.length <= 0) {
            edb.string = "x";
            return;
        }

        let numRate: number = Number(content);

        if (numRate >= MAX_RATE) {
            numRate = MAX_RATE;
        }
        if (numRate < MIN_RATE) {
            numRate = MIN_RATE;
        }
        this.setEditboxRate(numRate, edb);
        this.refreshRateButton(edb);
    }

    private onChangedBetGold(content: string, edb: cc.EditBox): void {
        let arrContent: string[] = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg: RegExp = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }

        let legalContent: string = arrContent.join(",").replace(/,/g, "");
        let numContent: number = Number(legalContent);

        if (numContent <= 0) {
            content = "";
        } else {
            content = numContent.toString();
        }
        edb.string = content;
    }

    private onDidEndedAutoBetGold(edb: cc.EditBox): void {
        let stopProfitGold: number = this.getEditboxProfit();
        let stopLossGold: number = this.getEditboxLoss();

        let betGold: number = this.getEditboxBetGold(edb);
        // if (stopProfitGold < betGold) {
        //     this.setEditboxStopProfit(betGold);
        // }
        if (stopLossGold < betGold) {
            this.setEditboxStopLoss(betGold);
        }
    }

    private onChangedProfitGold(content: string, edb: cc.EditBox): void {
        let arrContent: string[] = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg: RegExp = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }

        let betGold: number = this.getEditboxBetGold(this.edbBetGoldAuto);

        let legalContent: string = arrContent.join(",").replace(/,/g, "");
        let numContent: number = Number(legalContent);

        let minBetGold: number = Math.floor(Operation.mul(MIN_BET_GOLD, (MIN_RATE - 1)));

        if (numContent <= minBetGold) {
            content = minBetGold.toString();
        } else {
            content = numContent.toString();
        }
        edb.string = content;
    }

    private onChangedLossGold(content: string, edb: cc.EditBox): void {
        let arrContent: string[] = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg: RegExp = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }

        let betGold: number = this.getEditboxBetGold(this.edbBetGoldAuto);

        let legalContent: string = arrContent.join(",").replace(/,/g, "");
        let numContent: number = Number(legalContent);

        let minBetGold: number = MIN_BET_GOLD;
        if (betGold > MIN_BET_GOLD) {
            minBetGold = betGold;
        }

        if (numContent <= minBetGold) {
            content = minBetGold.toString();
        } else {
            content = numContent.toString();
        }
        edb.string = content;
    }

    public reqEnterLobby(): void {
        let req = MST.C2M_TransferMap_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            RoomName: Config.GameId.Lobby,
        })
        let buffer = MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_TransferMap_Req, MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);
    }

    private doBomb(): void {
        if (this._isBomb) {
            return;
        }

        this.audioHelper.stopEffectByPath(Crash.SOUNDS.ROCKET_FLY);
        this.audioHelper.playEffect(Crash.SOUNDS.ROCKET_BOMB, this.bundle);

        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.status = MST.CrashStatus.GameOver;

        this._isBomb = true;
        this.refreshBetButton();
        this.refreshGame();
        this.refreshRoundHash();
        this.stopRocketAnim();
        this.stopBgMoveAnim();
        this.stopRate();
    }

    public onClick(ButtonName: string, ButtonNode: any): void {
        switch (ButtonName) {
            case "btnClose":
                this.reqEnterLobby();
                break;
            case "btnBet0":
                this.addBetGold(CrashConfig.BetGoldButton[0], this.edbBetGold);
                break;
            case "btnBetAuto0":
                this.addBetGold(CrashConfig.BetGoldButton[0], this.edbBetGoldAuto);
                break;
            case "btnBet1":
                this.addBetGold(CrashConfig.BetGoldButton[1], this.edbBetGold);
                break;
            case "btnBetAuto1":
                this.addBetGold(CrashConfig.BetGoldButton[1], this.edbBetGoldAuto);
                break;
            case "btnBet2":
                this.addBetGold(CrashConfig.BetGoldButton[2], this.edbBetGold);
                break;
            case "btnBetAuto2":
                this.addBetGold(CrashConfig.BetGoldButton[2], this.edbBetGoldAuto);
                break;
            case "btnBet3":
                this.mulBetGold(CrashConfig.BetGoldButton[3], this.edbBetGold);
                break;
            case "btnBetAuto3":
                this.mulBetGold(CrashConfig.BetGoldButton[3], this.edbBetGoldAuto);
                break;
            case "btnBet4":
                this.mulBetGold(CrashConfig.BetGoldButton[4], this.edbBetGold);
                break;
            case "btnBetAuto4":
                this.mulBetGold(CrashConfig.BetGoldButton[4], this.edbBetGoldAuto);
                break;
            case "btnSub":
                this.subRate(1, this.edbChangeRate);
                break;
            case "btnSubAuto":
                this.subRate(1, this.edbChangeRateAuto);
                break;
            case "btnAdd":
                this.addRate(1, this.edbChangeRate);
                break;
            case "btnAddAuto":
                this.addRate(1, this.edbChangeRateAuto);
                break;
            case "btnAdd1":
                this.addRound(1);
                break;
            case "btnSub1":
                this.subRound(1);
                break;
            case "btnNextBet":
            case "btnCurrBet":
                this.C2M_MyCrashBet_Req();
                break;
            case "btnCopyNo":
                window['platformUtil'].copyToClip(parseInt("FFFFFF", 16).toString());
                break;
            case "btnRecord":
            case "btnWorldRecord":
                Manager.uiManager.open({ type: CrashTotalRecordView, bundle: this.bundle })
                break;
            case "btnAutoBet":
                this.C2M_MyCrashAutoBet_Req();
                break;
            case "btnCancelAutoBet":
                this.C2M_CrashCancelAutoBet_Req();
                break;
            case "btnMyRecord":
                Manager.uiManager.open({ type: CrashMyRecordView, bundle: this.bundle })
                break;
            case "btnStopProfit":
                this.clickIndicator(ButtonNode, Manager.makeLanguage("stopProfitInvdicator", true));
                break;
            case "btnStopLoss":
                this.clickIndicator(ButtonNode, Manager.makeLanguage("stopLossInvdicator", true));
                break;
        }
    }

    private C2M_GetCrashInfo_Req(): void {
        let req = MST.C2M_GetCrashInfo_Req.create({ RpcId: Manager.netManager.getNewSeqId() });
        let buffer = MST.C2M_GetCrashInfo_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_GetCrashInfo_Req, MST.OuterOpcode_CrashGame.C2M_GetCrashInfo_Req, buffer);
    }

    private C2M_MyCrashBet_Req(): void {
        let betGold: number = this.getEditboxBetGold(this.edbBetGold);
        if (betGold < MIN_BET_GOLD || betGold > MAX_BET_GOLD) {
            PanelHelp.showTip(Manager.makeLanguage(["InputBetGold", MIN_BET_GOLD, MAX_BET_GOLD], true));
            return;
        }

        if (!this.tggSwitchRate.isChecked ||
            (this.tggSwitchRate.isChecked && (this.getEditboxRate(this.edbChangeRate) < MIN_RATE || this.getEditboxRate(this.edbChangeRate) > MAX_RATE))) {
            PanelHelp.showTip(Manager.makeLanguage("InputRate", true));
            return;
        }

        let req = MST.C2M_MyCrashBet_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            BetMode: MST.CrashMode.Manual,
            BetGold: NumberUtils.converToS(betGold),
            BetMultiple: NumberUtils.converToS(this.getEditboxRate(this.edbChangeRate)),
        });
        let buffer = MST.C2M_MyCrashBet_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_MyCrashBet_Req, MST.OuterOpcode_CrashGame.C2M_MyCrashBet_Req, buffer);
    }

    private C2M_MyCrashAutoBet_Req(): void {
        let betGold: number = this.getEditboxBetGold(this.edbBetGoldAuto);
        if (betGold < MIN_BET_GOLD || betGold > MAX_BET_GOLD) {
            PanelHelp.showTip(Manager.makeLanguage(["InputBetGold", MIN_BET_GOLD, MAX_BET_GOLD], true));
            return;
        }

        if (!this.tggSwitchRateAuto.isChecked ||
            (this.tggSwitchRateAuto.isChecked && (this.getEditboxRate(this.edbChangeRateAuto) < MIN_RATE || this.getEditboxRate(this.edbChangeRateAuto) > MAX_RATE))) {
            PanelHelp.showTip(Manager.makeLanguage("InputRate", true));
            return;
        }

        let round: number = this.getEditboxRound();
        if (round <= 0) {
            PanelHelp.showTip(Manager.makeLanguage("InputRound", true));
            return;
        }

        let profit: number = this.getEditboxProfit();
        if (profit <= 0) {
            PanelHelp.showTip(Manager.makeLanguage("InputProfit", true));
            return;
        }

        let loss: number = this.getEditboxLoss();
        if (loss <= 0) {
            PanelHelp.showTip(Manager.makeLanguage("InputLoss", true));
            return;
        }

        this._autoBetReqData = {
            RpcId: Manager.netManager.getNewSeqId(),
            BetMode: MST.CrashMode.Auto,
            BetGold: NumberUtils.converToS(betGold),
            BetMultiple: NumberUtils.converToS(this.getEditboxRate(this.edbChangeRateAuto)),
            AutoRound: round,
            StopProfit: NumberUtils.converToS(profit),
            StopLoss: NumberUtils.converToS(loss),
        }

        let req = MST.C2M_MyCrashBet_Req.create(this._autoBetReqData);
        let buffer = MST.C2M_MyCrashBet_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_MyCrashBet_Req, MST.OuterOpcode_CrashGame.C2M_MyCrashBet_Req, buffer);
    }

    private C2M_CrashCancelAutoBet_Req(): void {
        let req = MST.C2M_CrashCancelAutoBet_Req.create({});
        let buffer = MST.C2M_CrashCancelAutoBet_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_CrashCancelAutoBet_Req, MST.OuterOpcode_CrashGame.C2M_CrashCancelAutoBet_Req, buffer);
    }

    private onEvent_M2C_GetCrashInfo_Res(data: MST.IM2C_GetCrashInfo_Res): void {
        this.refreshGameNo();
        this.refreshSeed();
        this.resumeView();
    }

    private onEvent_M2C_CrashStart_mes(data: MST.IM2C_CrashStart_mes): void {
        this.audioHelper.stopMusic();
        this.audioHelper.playEffect(Crash.SOUNDS.ROCKET_FLY, this.bundle);

        this.refreshBetButton();
        this.initGame();
        this.nodGameStart.active = true;
        this.playDynamicStarDropAnim();

        if (data.Multi <= MIN_RATE_RETURN) {
            return;
        }

        this.playStaticStarFadeAnim(false);
        this.playDynamicStarFadeAnim(true);
        this.playRocketAnim();
        this.playBgMoveAnim();
        this.startRate();
    }

    private onEvent_M2C_MyCrashBet_Res(data: MST.IM2C_MyCrashBet_Res): void {
        if (data.Error === 0) {
            PanelHelp.showTip(Manager.makeLanguage(["nextBetGoldSucceed", NumberUtils.converToC(data.Gold)], true))
        } else {
            PanelHelp.showErrTip(data.Error);
        }

        if (data.BetMode === MST.CrashMode.Auto) {
            if (data.Error === 0) {
                this._crashData.autoBetData = {
                    BetGold: this._autoBetReqData.BetGold,
                    BetMultiple: this._autoBetReqData.BetMultiple,
                    AutoRound: this._autoBetReqData.AutoRound,
                    StopProfit: this._autoBetReqData.StopProfit,
                    StopLoss: this._autoBetReqData.StopLoss,
                }
            }
            this._autoBetReqData = null;
            this.refreshAutoBetButton();
        }
    }

    private onEvent_M2C_CrashBet_Mes(data: MST.IM2C_CrashBet_Mes): void {
        this.initRoundHash();
        this.refreshGameNo();
        this.refreshTotalCount();
        this.refreshTotalGold();

        let insertMyList: CrashInterface.BetPlayer[] = [];
        let insertPlayerList: CrashInterface.BetPlayer[] = [];

        for (let v of data.Bets) {
            let betPlayer: CrashInterface.BetPlayer = {
                betInfo: v,
                isEscape: false,
            }
            if (v.player.UnitId === this._userData.id) {
                insertMyList.push(betPlayer);
            } else {
                insertPlayerList.push(betPlayer);
            }
        }

        this.lsvBetPlayer.insert(insertMyList.reverse(), 0);
        this.lsvBetPlayer.insert(insertPlayerList.reverse(), this._crashData.myBetList.length);

        // this.lsvBetPlayer.set(Array.from(this._crashData.betPlayerMap.values()));
    }

    private onEvent_M2C_CrashStop_Mes(data: MST.IM2C_CrashStop_Mes): void {
        this.doBomb();

        let betPlayerNodeList: cc.Node[] = this.lsvBetPlayer.getChildNode(0, 9);
        for (let v of betPlayerNodeList) {
            let betPlayerSrc: CrashBetPlayerItem = v.getComponent(CrashBetPlayerItem);
            if (!betPlayerSrc.getIsWin()) {
                betPlayerSrc.setIsWin(false);
            }
        }

        this.refreshRecord();
    }

    private onEvent_M2C_CrashStartBet_Mes(data: MST.IM2C_CrashStartBet_Mes): void {
        this.audioHelper.playMusic(Crash.SOUNDS.BGM, this.bundle);
        this._isBomb = false;
        this.nextView();
        this.refreshGameNo();
    }

    private onEvent_M2C_CrashEscape_Mes(data: MST.IM2C_CrashEscape_Mes): void {
        for (let v of data.Players) {
            this.playEscapePlayerDropAnim(v.Nick);
        }
    }

    private onEvent_M2C_CrashStopBet_Mes(data: MST.IM2C_CrashEscape_Mes): void {
        this.refreshBetButton();
        this.labStartCountDown.string = "";
        this.pgbStartCountDown.node.active = false;
        this.labStartTips.node.active = false;
        this.labStopTips.node.active = true;
    }

    private onEvent_M2C_CrashCancelAutoBet_Res(data: MST.IM2C_CrashCancelAutoBet_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }

        this._autoBetReqData = null;
        this._crashData.autoBetData = null;
        this.refreshAutoBetButton();
    }

    private onEvent_M2C_CrashCancelAutoBet_Mes(data: MST.IM2C_CrashCancelAutoBet_Mes): void {
        PanelHelp.showTip(Manager.makeLanguage("cancelAutoBet", true));
        this._autoBetReqData = null;
        this.refreshAutoBetButton();
    }

    private onEvent_M2C_CrashHash_Mes(data: MST.IM2C_CrashHash_Mes): void {
        this.refreshSeed();
    }

    private onEvent_M2C_TransferMap_Res(data: MST.IM2C_TransferMap_Res): void {
        if (data.Error === 0) {
            dispatch(LogicEvent.ENTER_HALL);
        } else {
            PanelHelp.showErrTip(data.Error);
        }
    }

    private stopAllSound(): void {
        this.audioHelper.stopMusic();
        this.audioHelper.stopEffectByPath(Crash.SOUNDS.ROCKET_BOMB);
        this.audioHelper.stopEffectByPath(Crash.SOUNDS.ROCKET_FLY);

    }

    onDestroy(): void {
        super.onDestroy();
        this.stopAllSound();
    }

}
