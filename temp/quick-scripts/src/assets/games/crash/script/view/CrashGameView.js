"use strict";
cc._RF.push(module, '50060xmZr9OHbOaeS8kPF9r', 'CrashGameView');
// games/crash/script/view/CrashGameView.ts

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
const LogicEvent_1 = require("../../../../script/common/event/LogicEvent");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const CrashRateDefine_1 = require("../define/CrashRateDefine");
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const CrashBetPlayerListView_1 = __importDefault(require("../component/CrashBetPlayerListView"));
const CrashGameData_1 = require("../data/CrashGameData");
const Operation_1 = __importDefault(require("../../../../script/framework/extentions/Operation"));
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const protoc_1 = require("../../../../script/framework/external/protoc");
const CrashColorDefine_1 = require("../define/CrashColorDefine");
const Manager_1 = require("../../../../script/common/manager/Manager");
const CrashConfig_1 = require("../config/CrashConfig");
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
const Config_1 = require("../../../../script/common/config/Config");
const CrashRecordItem_1 = __importDefault(require("./CrashRecordItem"));
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const CrashBetPlayerItem_1 = __importDefault(require("./CrashBetPlayerItem"));
const CrashData_1 = __importDefault(require("../data/CrashData"));
const CrashTotalRecordView_1 = __importDefault(require("./CrashTotalRecordView"));
const CrashMyRecordView_1 = __importDefault(require("./CrashMyRecordView"));
const TitleItemPageUser_1 = __importDefault(require("../../../../script/common/item/TitleItemPageUser"));
const CrashEscapePlayerItem_1 = __importDefault(require("./CrashEscapePlayerItem"));
const IndicatorView_1 = __importDefault(require("../../../../script/common/view/IndicatorView"));
// 最小下注金额
const MIN_BET_GOLD = 2000;
// 最大下注金额
const MAX_BET_GOLD = 440000;
// 最小倍数
const MIN_RATE = 1.01;
// 最大倍数
const MAX_RATE = 200;
// 最小自动下注圈数
const MIN_ROUND = 2;
// 最大自动下注圈数
const MAX_ROUND = 999999;
// 火箭冲刺时间（单位：毫秒）
const ROCKET_SPRINT_TIME = 1300;
// 火箭起点
const ROCKET_START_POS = cc.v2(-267, -523);
// 火箭 C1 贝塞尔
const ROCKET_C1_POS = cc.v2(-193.698, -568.591);
// 火箭 C2 贝塞尔
const ROCKET_C2_POS = cc.v2(318.892, -556.202);
// 火箭终点
const ROCKET_END_POS = cc.v2(294.267, -221.552);
// 背景移动时间（单位：毫秒）
const BG_MOVE_TIME = 1300;
// 移动到星空 y 坐标
const MOVE_TO_SKY_Y = -120;
// 移动到山体 y 坐标
const MOVE_TO_MOUNT_Y = 77;
// 静态星星渐显时间
const STATIC_STAR_FADE_IN_TIME = 500;
// 静态星星渐隐时间
const STATIC_STAR_FADE_OUT_TIME = 500;
// 动态星星渐显时间
const DYNAMIC_STAR_FADE_IN_TIME = 500;
// 动态星星渐隐时间
const DYNAMIC_STAR_FADE_OUT_TIME = 500;
// 降落终点 y
const DESCENT_Y = -780;
// 降落动画时间（单位：毫秒）
const DESCENT_ANIM_TIME = 1000;
// 处理 1 倍时不播放动画
const MIN_RATE_RETURN = 100;
// 初始逃跑玩家节点数量
const INIT_ESCAPE_PALYER_COUNT = 10;
// 逃跑玩家下落时间（单位：毫秒）
const ESCAPE_PLAYER_DROP_TIME = 3000;
const { ccclass, property } = cc._decorator;
let CrashGameView = class CrashGameView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgGameBg = null;
        this.speStaticStar = null;
        this.speDynamicStar = null;
        this.nodGameBet = null;
        this.labStartTips = null;
        this.labStopTips = null;
        this.labStartCountDown = null;
        this.pgbStartCountDown = null;
        this.nodGameStart = null;
        this.nodStartRocket = null;
        this.imgBackLight = null;
        this.speGameStart = null;
        this.mskTail = null;
        this.imgTail0 = null;
        this.imgTail1 = null;
        this.labRate = null;
        this.nodGameEnd = null;
        this.labBombRate = null;
        this.speBomb = null;
        this.speDescent = null;
        this.nodEscapeDrop = null;
        this.latRecord = null;
        this.labManual = null;
        this.labAuto = null;
        this.tggManual = null;
        this.tggAuto = null;
        this.latManual = null;
        this.edbBetGold = null;
        this.btnNextBet = null;
        this.btnCurrBet = null;
        this.tggSwitchRate = null;
        this.labSwitchRate = null;
        this.btnSub = null;
        this.btnAdd = null;
        this.edbChangeRate = null;
        this.latAuto = null;
        this.edbBetGoldAuto = null;
        this.labRoundTitle = null;
        this.btnAdd1 = null;
        this.btnSub1 = null;
        this.edbRound = null;
        this.tggSwitchRateAuto = null;
        this.labSwitchRateAuto = null;
        this.btnSubAuto = null;
        this.btnAddAuto = null;
        this.edbChangeRateAuto = null;
        this.labStopProfitTitle = null;
        this.edbStopProfit = null;
        this.labStopLossTitle = null;
        this.edbStopLess = null;
        this.btnAutoBet = null;
        this.btnCancelAutoBet = null;
        this.labBetListTitle = null;
        this.labTotalBetCount = null;
        this.labTotalBetGold = null;
        this.labPlayerTtile = null;
        this.labBetGoldTitle = null;
        this.labIncomeTitle = null;
        this.lsvBetPlayer = null;
        this.labGameNo = null;
        this.labHash1 = null;
        this.labSeed = null;
        this.labHash2 = null;
        this.labAcak = null;
        this.labPoint = null;
        this.titleItemPageUser = null;
        this.pfbCrashEscapePlayerItem = null;
        // 游戏数据
        this._crashData = null;
        // 应用数据
        this._appData = null;
        // 用户数据
        this._userData = null;
        // 火箭贝塞尔动画
        this._rocketBezierTween = null;
        // 火箭每帧移动轨迹列表
        this._rocketFramePos = null;
        // 背景移动动画
        this._bgMoveTween = null;
        // 静态星星显隐动画
        this._staticStarFadeTween = null;
        // 动态星星下落动画
        this._dynamicStarTween = null;
        // 自动下注数据
        this._autoBetReqData = null;
        // 拖尾原始宽高
        this._tailOriginSize = null;
        // 下降动画
        this._descentTween = null;
        // 是否提前爆炸
        this._isBomb = false;
        // 逃跑人员节点池
        this._escapePlayerNodePool = null;
    }
    static getPrefabUrl() {
        return "prefabs/CrashGameView";
    }
    onLoad() {
        super.onLoad();
        LogicEvent_1.dispatchEnterComplete({ type: LogicEvent_1.LogicType.GAME, views: [this] });
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
    initData() {
        this._crashData = G.DataMgr.get(CrashData_1.default);
        this._appData = G.DataMgr.get(AppData_1.default);
        this._userData = G.DataMgr.get(UserData_1.default);
        this._rocketBezierTween = null;
        this._rocketFramePos = [];
        this._autoBetReqData = null;
        this._tailOriginSize = this.mskTail.node.getContentSize();
        this._escapePlayerNodePool = new cc.NodePool();
    }
    initView() {
        this.initBg();
        this.initGame();
        this.initMode();
        this.initBet();
        this.initRate();
        this.initBetList();
        this.initHashInfo();
    }
    initPreload() {
        for (let i = 0; i < INIT_ESCAPE_PALYER_COUNT; ++i) {
            this.putEscapePlayerItem(cc.instantiate(this.pfbCrashEscapePlayerItem));
        }
    }
    initHashInfo() {
        this.labGameNo.string = "";
        this.labHash1.string = "";
        this.labSeed.string = "";
        this.labHash2.string = "";
        this.labAcak.string = "tersembunyi";
        this.labPoint.string = "tersembunyi";
    }
    initRoundHash() {
        this.labHash2.string = "";
        this.labAcak.string = "tersembunyi";
        this.labPoint.string = "tersembunyi";
    }
    nextView() {
        this.nextHashInfo();
        this.initBetList();
        this.refreshBetButton();
        this.refreshGame();
        this.playStaticStarFadeAnim(true);
        this.stopDescentAnim();
    }
    nextHashInfo() {
        this.labHash2.string = "";
        this.labAcak.string = "tersembunyi";
        this.labPoint.string = "tersembunyi";
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
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
        this.titleItemPageUser.languagePageName(Manager_1.Manager.makeLanguage("labPageName", true));
        this.labManual.language = Manager_1.Manager.makeLanguage("labManual", true);
        this.labAuto.language = Manager_1.Manager.makeLanguage("labAuto", true);
        this.labSwitchRate.language = Manager_1.Manager.makeLanguage("labSwitchRate", true);
        this.labRoundTitle.language = Manager_1.Manager.makeLanguage("labRoundTitle", true);
        this.labSwitchRateAuto.language = Manager_1.Manager.makeLanguage("labSwitchRate", true);
        this.labStopProfitTitle.language = Manager_1.Manager.makeLanguage("labStopProfitTitle", true);
        this.labStopLossTitle.language = Manager_1.Manager.makeLanguage("labStopLossTitle", true);
        this.labBetListTitle.language = Manager_1.Manager.makeLanguage("labBetListTitle", true);
        this.labTotalBetCount.language = Manager_1.Manager.makeLanguage("labTotalBetCount", true);
        this.labPlayerTtile.language = Manager_1.Manager.makeLanguage("labPlayerTtile", true);
        this.labBetGoldTitle.language = Manager_1.Manager.makeLanguage("labBetGoldTitle", true);
        this.labIncomeTitle.language = Manager_1.Manager.makeLanguage("labIncomeTitle", true);
        this.labStartTips.language = Manager_1.Manager.makeLanguage("labStartTips", true);
        this.labStopTips.language = Manager_1.Manager.makeLanguage("labStopTips", true);
    }
    /**
     * 刷新游戏倒计时
     */
    updateCountDonw() {
        let ms = this._crashData.stopBetTimestamp - this._appData.getServerTimestamp();
        if (ms <= 0) {
            ms = 0;
            this.labStartCountDown.string = DateUtils_1.default.getMsToS(ms);
            this.pgbStartCountDown.progress = ms;
            this.stopCountDown();
            return;
        }
        let stop2StartMs = this._crashData.stopBetTimestamp - this._crashData.startBetTimestamp;
        this.labStartCountDown.string = DateUtils_1.default.getMsToS(ms);
        this.pgbStartCountDown.progress = ms / stop2StartMs;
        this.pgbStartCountDown.node.active = true;
    }
    /**
     * 启动游戏倒计时
     */
    startCountDown() {
        this.stopCountDown();
        this.schedule(this.updateCountDonw);
    }
    /**
     * 停止游戏倒计时
     */
    stopCountDown() {
        this.unschedule(this.updateCountDonw);
    }
    updateTitalColor(rate) {
        let color = CrashColorDefine_1.CrashColorDefine.Tail.WHITE;
        if (rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.YEELOW) {
            color = CrashColorDefine_1.CrashColorDefine.Tail.YEELOW;
        }
        else if (rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.BLUE) {
            color = CrashColorDefine_1.CrashColorDefine.Tail.BLUE;
        }
        else if (rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.GREEN) {
            color = CrashColorDefine_1.CrashColorDefine.Tail.GREEN;
        }
        else if (rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.RED) {
            color = CrashColorDefine_1.CrashColorDefine.Tail.RED;
        }
        this.imgTail1.node.color = color;
        this.imgBackLight.node.color = color;
    }
    updateBetList(rate) {
        if (this._crashData.betPlayerMap.size <= 0 || this.lsvBetPlayer.getChildCount() < this._crashData.betPlayerMap.size) {
            return;
        }
        let delKeyList = [];
        this._crashData.betPlayerMap.forEach((value, key) => {
            if (rate >= value.betInfo.Multiple) {
                let betPlayerNode = this.lsvBetPlayer.getChildNodeByIndex(key);
                let betPlayerSrc = betPlayerNode.getComponent(CrashBetPlayerItem_1.default);
                betPlayerSrc.setIsWin(true);
                delKeyList.push(key);
            }
        });
        for (let v of delKeyList) {
            this._crashData.betPlayerMap.delete(v);
        }
    }
    updateRate() {
        let rate = this._crashData.getRate();
        if (rate === null) {
            this.labRate.string = "";
            return;
        }
        this.updateBetList(rate);
        // 需要做爆炸处理
        let bombRate = this._crashData.roundBombRate;
        if (rate >= bombRate) {
            this.updateTitalColor(bombRate);
            this.labRate.string = UtilMgr_1.UtilMgr.toPadding(NumberUtils_1.default.converToC(bombRate), 2) + "x";
            ;
            this.doBomb();
            return;
        }
        this.updateTitalColor(rate);
        this.labRate.string = UtilMgr_1.UtilMgr.toPadding(NumberUtils_1.default.converToC(rate), 2) + "x";
        ;
    }
    startRate() {
        this.stopRate();
        this.schedule(this.updateRate);
    }
    stopRate() {
        this.labRate.string = "";
        this.unschedule(this.updateRate);
    }
    putEscapePlayerItem(escapePlayerNode) {
        let escapePlayerSrc = escapePlayerNode.getComponent(CrashEscapePlayerItem_1.default);
        escapePlayerSrc.reset();
        escapePlayerNode.removeFromParent();
        this._escapePlayerNodePool.put(escapePlayerNode);
    }
    getEscapePlayerItem() {
        let escapePlayerNode = this._escapePlayerNodePool.get();
        if (!escapePlayerNode) {
            escapePlayerNode = cc.instantiate(this.pfbCrashEscapePlayerItem);
        }
        return escapePlayerNode;
    }
    getRocketToTailHeight() {
        let rocketWorldPos = this.nodStartRocket.convertToWorldSpaceAR(cc.v2(0, 0));
        let tailWorldPos = this.mskTail.node.convertToWorldSpaceAR(cc.v2(0, 0));
        return rocketWorldPos.sub(tailWorldPos).y;
    }
    /**
     * 获取角度通过 2 个点
     * @param p1 {number} 点1
     * @param p2 {number} 点2
     * @returns {number} 角度
     */
    getAngleByPoint2(p1, p2) {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let dir = cc.v2(dx, dy);
        let angle = dir.signAngle(cc.v2(1, 0));
        let degree = angle / Math.PI * 180;
        return -degree;
    }
    setRocketWaitStatus() {
        this.nodStartRocket.angle = 0;
        this.nodStartRocket.position = ROCKET_START_POS;
    }
    setRocketEndStatus() {
        this.nodStartRocket.angle = 90;
        this.nodStartRocket.position = ROCKET_END_POS;
    }
    updateRocketRotate() {
        let framePosLen = this._rocketFramePos.length;
        let lastPos = this._rocketFramePos[framePosLen - 1];
        let currRocketPos = this.nodStartRocket.position;
        if (lastPos !== undefined && lastPos.equals(currRocketPos)) {
            return;
        }
        this._rocketFramePos.push(currRocketPos);
        if (framePosLen >= 2) {
            this.nodStartRocket.angle = this.getAngleByPoint2(this._rocketFramePos[framePosLen - 2], this._rocketFramePos[framePosLen - 1]);
            this.mskTail.node.height = this.getRocketToTailHeight();
        }
    }
    startUpdateRocketRotate() {
        this.stopUpdateRocketRotate();
        this.schedule(this.updateRocketRotate);
    }
    stopUpdateRocketRotate() {
        this.unschedule(this.updateRocketRotate);
        this._rocketFramePos.length = 0;
    }
    playBombAnim() {
        this.speBomb.node.position = this.nodStartRocket.position;
        this.speBomb.setAnimation(0, "animation", false);
    }
    playEscapePlayerDropAnim(nick) {
        let escapePlayerNode = this.getEscapePlayerItem();
        this.nodEscapeDrop.addChild(escapePlayerNode);
        let escapePlayerSrc = escapePlayerNode.getComponent(CrashEscapePlayerItem_1.default);
        escapePlayerSrc.onShow(nick);
        let startPos = this.nodStartRocket.position;
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
    playDescentAnim() {
        this.stopDescentAnim();
        let rocketPos = this.nodStartRocket.position;
        this.speDescent.node.position = rocketPos;
        this._descentTween = cc.tween(this.speDescent.node)
            .to(DESCENT_ANIM_TIME / 1000, { y: DESCENT_Y })
            .start();
    }
    /**
     * 停止下降动画
     */
    stopDescentAnim() {
        if (this._descentTween) {
            this._descentTween.stop();
        }
    }
    playDynamicStarFadeAnim(isShow) {
        this.stopDynamicStarFadeAnim();
        this._dynamicStarTween = cc.tween(this.speDynamicStar.node);
        if (isShow) {
            this.speDynamicStar.setAnimation(0, "animation", true);
            this._dynamicStarTween
                .to(Operation_1.default.div(DYNAMIC_STAR_FADE_IN_TIME, 1000), { opacity: 255 })
                .start();
        }
        else {
            this._dynamicStarTween = cc.tween(this.speDynamicStar.node)
                .to(Operation_1.default.div(DYNAMIC_STAR_FADE_OUT_TIME, 1000), { opacity: 0 })
                .start();
        }
    }
    stopDynamicStarFadeAnim() {
        if (this._dynamicStarTween) {
            this._dynamicStarTween.stop();
            this._dynamicStarTween = null;
        }
    }
    playDynamicStarDropAnim() {
        this.speDynamicStar.paused = false;
        this.speDynamicStar.setAnimation(0, "animation", true);
    }
    pauseDynamicStarDropAnim() {
        this.speDynamicStar.paused = true;
    }
    playStaticStarFadeAnim(isShow) {
        this.stopStaticStarFadeAnim();
        if (isShow) {
            this._staticStarFadeTween = cc.tween(this.speStaticStar.node)
                .to(Operation_1.default.div(STATIC_STAR_FADE_IN_TIME, 1000), { opacity: 255 })
                .start();
        }
        else {
            this._staticStarFadeTween = cc.tween(this.speStaticStar.node)
                .to(Operation_1.default.div(STATIC_STAR_FADE_OUT_TIME, 1000), { opacity: 0 })
                .start();
        }
    }
    stopStaticStarFadeAnim() {
        if (this._staticStarFadeTween) {
            this._staticStarFadeTween.stop();
            this._staticStarFadeTween = null;
        }
    }
    playBgMoveAnim() {
        this.stopBgMoveAnim();
        this._bgMoveTween = cc.tween(this.imgGameBg.node)
            .to(Operation_1.default.div(BG_MOVE_TIME, 1000), { y: MOVE_TO_SKY_Y })
            .start();
    }
    stopBgMoveAnim() {
        if (this._bgMoveTween) {
            this._bgMoveTween.stop();
            this._bgMoveTween = null;
        }
    }
    playRocketAnim() {
        this.stopRocketAnim();
        this.setRocketWaitStatus();
        this.startUpdateRocketRotate();
        this._rocketBezierTween = cc.tween(this.nodStartRocket)
            .bezierTo(Operation_1.default.div(ROCKET_SPRINT_TIME, 1000), ROCKET_C1_POS, ROCKET_C2_POS, ROCKET_END_POS)
            .call(() => {
            this.stopUpdateRocketRotate();
            this.setRocketEndStatus();
        })
            .start();
    }
    stopRocketAnim() {
        this.stopUpdateRocketRotate();
        if (this._rocketBezierTween) {
            this._rocketBezierTween.stop();
            this._rocketBezierTween = null;
        }
    }
    initGameStartNode() {
        this.setRocketWaitStatus();
    }
    refreshGame() {
        this.initGame();
        switch (this._crashData.status) {
            case protoc_1.MST.CrashStatus.StartBet:
                {
                    this.audioHelper.playMusic(CrashGameData_1.Crash.SOUNDS.BGM, this.bundle);
                    this.initBg();
                    this.nodGameBet.active = true;
                    this.labStartTips.node.active = true;
                    this.labStopTips.node.active = false;
                    this.startCountDown();
                    this.playStaticStarFadeAnim(true);
                }
                break;
            case protoc_1.MST.CrashStatus.StopBet:
                {
                    this.initGameStartNode();
                    this.nodGameStart.active = true;
                    this.playStaticStarFadeAnim(true);
                }
                break;
            case protoc_1.MST.CrashStatus.GameBegin:
                {
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
            case protoc_1.MST.CrashStatus.GameOver:
                {
                    this.playBombAnim();
                    this.nodGameEnd.active = true;
                    this.labBombRate.string = "@" + NumberUtils_1.default.converToC(this._crashData.roundBombRate) + "x";
                    this.pauseDynamicStarDropAnim();
                    this.playDescentAnim();
                    this.initGameStartNode();
                }
                break;
        }
    }
    refreshRecord() {
        let recordCount = this._crashData.rateRecordList.length;
        let showRecordList = [];
        if (recordCount <= this.latRecord.node.childrenCount) {
            showRecordList = [].concat(this._crashData.rateRecordList);
        }
        else {
            showRecordList = this._crashData.rateRecordList.slice(-this.latRecord.node.childrenCount, recordCount);
        }
        let index = 0;
        for (let v of this.latRecord.node.children) {
            let rate = showRecordList[index++];
            let crashRecordItem = v.getComponent(CrashRecordItem_1.default);
            if (rate === undefined) {
                crashRecordItem.clear();
            }
            else {
                crashRecordItem.setRate(rate);
            }
        }
    }
    resumeBet() {
        this.refreshBetButton();
    }
    refreshAutoBetButton() {
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
        }
        else {
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
    refreshGameNo() {
        this.labGameNo.string = `Game No.${this._crashData.hashInfo.gameNo}`;
    }
    refreshSeed() {
        this.labHash1.string = this._crashData.hashInfo.serverSeed;
        this.labSeed.string = this._crashData.hashInfo.publicSeed;
    }
    refreshRoundHash() {
        this.labHash2.string = this._crashData.hashInfo.roundHash;
        this.labAcak.string = UtilMgr_1.UtilMgr.setString(this._crashData.hashInfo.acak, 5, true);
        this.labPoint.string = NumberUtils_1.default.converToC(this._crashData.hashInfo.point);
    }
    resumeBetList() {
        this.refreshTotalCount();
        this.refreshTotalGold();
        this.refreshBetPlayer();
    }
    resumeRate() {
        this.enableEditboxRate(this.edbChangeRate, this.tggSwitchRate.isChecked);
        this.enableEditboxRate(this.edbChangeRateAuto, this.tggSwitchRateAuto.isChecked);
    }
    resumeView() {
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
    initBg() {
        this.setGameBgMount();
        this.speStaticStar.node.opacity = 0;
        this.speDynamicStar.node.opacity = 0;
    }
    initGame() {
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
    initRecord() {
        for (let v of this.latRecord.node.children) {
            let crashRecordItem = v.getComponent(CrashRecordItem_1.default);
            crashRecordItem.clear();
        }
    }
    initMode() {
        this.latManual.node.active = this.tggManual.isChecked;
        this.latAuto.node.active = this.tggAuto.isChecked;
    }
    initBet() {
        this.edbBetGold.placeholder = `${MIN_BET_GOLD}-${MAX_BET_GOLD}`;
        this.edbBetGoldAuto.placeholder = `${MIN_BET_GOLD}-${MAX_BET_GOLD}`;
        this.btnCurrBet.node.active = false;
        this.btnNextBet.node.active = false;
    }
    initRate() {
        this.tggSwitchRate.isChecked = false;
        this.tggSwitchRateAuto.isChecked = false;
        this.enableEditboxRate(this.edbChangeRate, this.tggSwitchRate.isChecked);
        this.enableEditboxRate(this.edbChangeRateAuto, this.tggSwitchRateAuto.isChecked);
    }
    initBetList() {
        this.labTotalBetCount.language = Manager_1.Manager.makeLanguage(["labTotalBetCount", 0], true);
        this.labTotalBetGold.string = "0";
        this.lsvBetPlayer.clear();
    }
    addBetGold(gold, edbBetGold) {
        let numBetGold = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Operation_1.default.add(gold, numBetGold).toString();
        if (edbBetGold === this.edbBetGoldAuto) {
            this.onDidEndedAutoBetGold(edbBetGold);
        }
    }
    mulBetGold(gold, edbBetGold) {
        let numBetGold = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Math.floor(Operation_1.default.mul(gold, numBetGold)).toString();
    }
    getEditboxBetGold(edbBetGold) {
        let content = edbBetGold.string;
        let numBetGold = 0;
        if (content.length > 0) {
            numBetGold = Number(content);
        }
        return numBetGold;
    }
    addRate(rate, edbChangeRate) {
        let numRate = this.getEditboxRate(edbChangeRate);
        numRate = Operation_1.default.add(numRate, rate);
        if (numRate >= MAX_RATE) {
            numRate = MAX_RATE;
        }
        if (numRate < MIN_RATE) {
            numRate = MIN_RATE;
        }
        this.setEditboxRate(numRate, edbChangeRate);
        this.refreshRateButton(edbChangeRate);
    }
    subRate(rate, edbChangeRate) {
        let numRate = this.getEditboxRate(edbChangeRate);
        numRate = Operation_1.default.sub(numRate, rate);
        if (numRate <= MIN_RATE) {
            numRate = MIN_RATE;
        }
        this.setEditboxRate(numRate, edbChangeRate);
        this.refreshRateButton(edbChangeRate);
    }
    addRound(round) {
        let numRound = this.getEditboxRound();
        numRound = Operation_1.default.add(numRound, round);
        if (numRound >= MAX_ROUND) {
            numRound = MAX_ROUND;
        }
        if (numRound < MIN_ROUND) {
            numRound = MIN_ROUND;
        }
        this.setEditboxRound(numRound);
        this.refreshRoundButton();
    }
    subRound(round) {
        let numRound = this.getEditboxRound();
        numRound = Operation_1.default.sub(numRound, round);
        if (numRound <= MIN_ROUND) {
            numRound = MIN_ROUND;
        }
        this.setEditboxRound(numRound);
        this.refreshRoundButton();
    }
    enableEditboxRate(edbChangeRate, isEnable) {
        edbChangeRate.enabled = isEnable;
        let nodContent = edbChangeRate.node.getChildByName("TEXT_LABEL");
        let nodPlaceholder = edbChangeRate.node.getChildByName("PLACEHOLDER_LABEL");
        if (isEnable) {
            nodContent.color = CrashColorDefine_1.CrashColorDefine.EnableRate.ENABLE;
            nodPlaceholder.color = CrashColorDefine_1.CrashColorDefine.EnableRate.ENABLE;
        }
        else {
            nodContent.color = CrashColorDefine_1.CrashColorDefine.EnableRate.DISABLE;
            nodPlaceholder.color = CrashColorDefine_1.CrashColorDefine.EnableRate.DISABLE;
        }
    }
    setGameBgSky() {
        this.imgGameBg.node.y = MOVE_TO_SKY_Y;
    }
    setGameBgMount() {
        this.imgGameBg.node.y = MOVE_TO_MOUNT_Y;
    }
    setEditboxRate(rate, edbChangeRate) {
        edbChangeRate.string = rate.toString() + "x";
    }
    getEditboxRate(edbChangeRate) {
        let content = edbChangeRate.string;
        content = content.replace(/x/g, "");
        let numRate = 0;
        if (content.length > 0) {
            numRate = Number(content);
        }
        return numRate;
    }
    setEditboxRound(round) {
        this.edbRound.string = round.toString();
    }
    setEditboxStopProfit(value) {
        this.edbStopProfit.string = value.toString();
    }
    setEditboxStopLoss(value) {
        this.edbStopLess.string = value.toString();
    }
    getEditboxRound() {
        let content = this.edbRound.string;
        let numRound = 0;
        if (content.length > 0) {
            numRound = Number(content);
        }
        return numRound;
    }
    getEditboxProfit() {
        let content = this.edbStopProfit.string;
        let numProfit = 0;
        if (content.length > 0) {
            numProfit = Number(content);
        }
        return numProfit;
    }
    getEditboxLoss() {
        let content = this.edbStopLess.string;
        let numLoss = 0;
        if (content.length > 0) {
            numLoss = Number(content);
        }
        return numLoss;
    }
    refreshRateButton(edbChangeRate) {
        let btnSub = null;
        let btnAdd = null;
        let tggSwitchRate = null;
        switch (edbChangeRate) {
            case this.edbChangeRate:
                {
                    btnSub = this.btnSub;
                    btnAdd = this.btnAdd;
                    tggSwitchRate = this.tggSwitchRate;
                }
                break;
            case this.edbChangeRateAuto:
                {
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
        let numRate = this.getEditboxRate(edbChangeRate);
        if (numRate > MIN_RATE) {
            btnSub.interactable = true;
        }
        if (numRate < MAX_RATE) {
            btnAdd.interactable = true;
        }
    }
    refreshRoundButton() {
        let btnSub = this.btnSub1;
        let btnAdd = this.btnAdd1;
        btnSub.interactable = false;
        btnAdd.interactable = false;
        let numRound = this.getEditboxRound();
        if (numRound <= MIN_ROUND) {
            btnAdd.interactable = true;
        }
        else if (numRound >= MAX_ROUND) {
            btnSub.interactable = true;
        }
        else {
            btnAdd.interactable = true;
            btnSub.interactable = true;
        }
    }
    refreshBetButton() {
        this.btnCurrBet.node.active = false;
        this.btnNextBet.node.active = false;
        switch (this._crashData.status) {
            case protoc_1.MST.CrashStatus.StartBet:
                this.btnCurrBet.interactable = true;
                this.btnCurrBet.node.active = true;
                break;
            case protoc_1.MST.CrashStatus.StopBet:
                this.btnCurrBet.interactable = false;
                this.btnCurrBet.node.active = true;
                break;
            case protoc_1.MST.CrashStatus.GameBegin:
            case protoc_1.MST.CrashStatus.GameOver:
                this.btnNextBet.node.active = true;
                break;
            default:
                this.btnCurrBet.interactable = false;
                this.btnCurrBet.node.active = true;
                break;
        }
    }
    refreshTotalCount() {
        this.labTotalBetCount.language = Manager_1.Manager.makeLanguage(["labTotalBetCount", this._crashData.betTotalCount], true);
    }
    refreshTotalGold() {
        this.labTotalBetGold.string = NumberUtils_1.default.converToC(this._crashData.betTotalGold);
    }
    refreshBetPlayer() {
        // let betPlayerList: CrashInterface.BetPlayer[] = [];
        // betPlayerList = betPlayerList.concat(this._crashData.myBetList.reverse());
        // betPlayerList = betPlayerList.concat(this._crashData.betList.reverse());
        this.lsvBetPlayer.set(Array.from(this._crashData.betPlayerMap.values()));
    }
    clickIndicator(targetNode, makeLanguage) {
        let worldPos = targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        Manager_1.Manager.uiManager.open({ type: IndicatorView_1.default, bundle: this.bundle, args: [localPos, makeLanguage] });
    }
    onClickSwitchRate(target) {
        switch (target) {
            case this.tggSwitchRate:
                {
                    this.enableEditboxRate(this.edbChangeRate, target.isChecked);
                    this.refreshRateButton(this.edbChangeRate);
                }
                break;
            case this.tggSwitchRateAuto:
                {
                    this.enableEditboxRate(this.edbChangeRateAuto, target.isChecked);
                    this.refreshRateButton(this.edbChangeRateAuto);
                }
                break;
        }
    }
    onClickBetMode(target) {
        this.latManual.node.active = false;
        this.latAuto.node.active = false;
        this.labManual.node.color = CrashColorDefine_1.CrashColorDefine.BetMode.UN_SELECt;
        this.labAuto.node.color = CrashColorDefine_1.CrashColorDefine.BetMode.UN_SELECt;
        switch (target) {
            case this.tggManual:
                {
                    this.latManual.node.active = true;
                    this.labManual.node.color = CrashColorDefine_1.CrashColorDefine.BetMode.SELECTED;
                }
                break;
            case this.tggAuto:
                {
                    this.latAuto.node.active = true;
                    this.labAuto.node.color = CrashColorDefine_1.CrashColorDefine.BetMode.SELECTED;
                }
                break;
        }
    }
    onBeginBetRate(edb) {
        let content = edb.string;
        if (content === "x") {
            edb.string = "";
            return;
        }
        let numRate = this.getEditboxRate(edb);
        edb.string = numRate.toString();
    }
    onChangeRound(content, edb) {
        let arrContent = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }
        let legalContent = arrContent.join(",").replace(/,/g, "");
        let numContent = Number(legalContent);
        if (numContent < MIN_ROUND) {
            content = MIN_ROUND.toString();
        }
        else if (numContent > MAX_ROUND) {
            content = MAX_ROUND.toString();
        }
        else {
            content = numContent.toString();
        }
        edb.string = content;
        this.refreshRoundButton();
    }
    onChangeBetRate(content, edb) {
        let arrContent = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg = /[0-9.]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }
        let legalContent = arrContent.join(",").replace(/,/g, "");
        let numContent = Number(legalContent);
        if (isNaN(numContent)) {
            content = "";
        }
        else {
            if (numContent % 1 !== 0) {
                numContent = UtilMgr_1.UtilMgr.toFixed(numContent, 2);
            }
            content = numContent.toString();
        }
        edb.string = content;
    }
    onEndBetRate(edb) {
        let content = edb.string;
        if (content.length <= 0) {
            edb.string = "x";
            return;
        }
        let numRate = Number(content);
        if (numRate >= MAX_RATE) {
            numRate = MAX_RATE;
        }
        if (numRate < MIN_RATE) {
            numRate = MIN_RATE;
        }
        this.setEditboxRate(numRate, edb);
        this.refreshRateButton(edb);
    }
    onChangedBetGold(content, edb) {
        let arrContent = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }
        let legalContent = arrContent.join(",").replace(/,/g, "");
        let numContent = Number(legalContent);
        if (numContent <= 0) {
            content = "";
        }
        else {
            content = numContent.toString();
        }
        edb.string = content;
    }
    onDidEndedAutoBetGold(edb) {
        let stopProfitGold = this.getEditboxProfit();
        let stopLossGold = this.getEditboxLoss();
        let betGold = this.getEditboxBetGold(edb);
        // if (stopProfitGold < betGold) {
        //     this.setEditboxStopProfit(betGold);
        // }
        if (stopLossGold < betGold) {
            this.setEditboxStopLoss(betGold);
        }
    }
    onChangedProfitGold(content, edb) {
        let arrContent = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }
        let betGold = this.getEditboxBetGold(this.edbBetGoldAuto);
        let legalContent = arrContent.join(",").replace(/,/g, "");
        let numContent = Number(legalContent);
        let minBetGold = Math.floor(Operation_1.default.mul(MIN_BET_GOLD, (MIN_RATE - 1)));
        if (numContent <= minBetGold) {
            content = minBetGold.toString();
        }
        else {
            content = numContent.toString();
        }
        edb.string = content;
    }
    onChangedLossGold(content, edb) {
        let arrContent = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }
        let betGold = this.getEditboxBetGold(this.edbBetGoldAuto);
        let legalContent = arrContent.join(",").replace(/,/g, "");
        let numContent = Number(legalContent);
        let minBetGold = MIN_BET_GOLD;
        if (betGold > MIN_BET_GOLD) {
            minBetGold = betGold;
        }
        if (numContent <= minBetGold) {
            content = minBetGold.toString();
        }
        else {
            content = numContent.toString();
        }
        edb.string = content;
    }
    reqEnterLobby() {
        let req = protoc_1.MST.C2M_TransferMap_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            RoomName: Config_1.Config.GameId.Lobby,
        });
        let buffer = protoc_1.MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_TransferMap_Req, protoc_1.MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);
    }
    doBomb() {
        if (this._isBomb) {
            return;
        }
        this.audioHelper.stopEffectByPath(CrashGameData_1.Crash.SOUNDS.ROCKET_FLY);
        this.audioHelper.playEffect(CrashGameData_1.Crash.SOUNDS.ROCKET_BOMB, this.bundle);
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.status = protoc_1.MST.CrashStatus.GameOver;
        this._isBomb = true;
        this.refreshBetButton();
        this.refreshGame();
        this.refreshRoundHash();
        this.stopRocketAnim();
        this.stopBgMoveAnim();
        this.stopRate();
    }
    onClick(ButtonName, ButtonNode) {
        switch (ButtonName) {
            case "btnClose":
                this.reqEnterLobby();
                break;
            case "btnBet0":
                this.addBetGold(CrashConfig_1.CrashConfig.BetGoldButton[0], this.edbBetGold);
                break;
            case "btnBetAuto0":
                this.addBetGold(CrashConfig_1.CrashConfig.BetGoldButton[0], this.edbBetGoldAuto);
                break;
            case "btnBet1":
                this.addBetGold(CrashConfig_1.CrashConfig.BetGoldButton[1], this.edbBetGold);
                break;
            case "btnBetAuto1":
                this.addBetGold(CrashConfig_1.CrashConfig.BetGoldButton[1], this.edbBetGoldAuto);
                break;
            case "btnBet2":
                this.addBetGold(CrashConfig_1.CrashConfig.BetGoldButton[2], this.edbBetGold);
                break;
            case "btnBetAuto2":
                this.addBetGold(CrashConfig_1.CrashConfig.BetGoldButton[2], this.edbBetGoldAuto);
                break;
            case "btnBet3":
                this.mulBetGold(CrashConfig_1.CrashConfig.BetGoldButton[3], this.edbBetGold);
                break;
            case "btnBetAuto3":
                this.mulBetGold(CrashConfig_1.CrashConfig.BetGoldButton[3], this.edbBetGoldAuto);
                break;
            case "btnBet4":
                this.mulBetGold(CrashConfig_1.CrashConfig.BetGoldButton[4], this.edbBetGold);
                break;
            case "btnBetAuto4":
                this.mulBetGold(CrashConfig_1.CrashConfig.BetGoldButton[4], this.edbBetGoldAuto);
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
                Manager_1.Manager.uiManager.open({ type: CrashTotalRecordView_1.default, bundle: this.bundle });
                break;
            case "btnAutoBet":
                this.C2M_MyCrashAutoBet_Req();
                break;
            case "btnCancelAutoBet":
                this.C2M_CrashCancelAutoBet_Req();
                break;
            case "btnMyRecord":
                Manager_1.Manager.uiManager.open({ type: CrashMyRecordView_1.default, bundle: this.bundle });
                break;
            case "btnStopProfit":
                this.clickIndicator(ButtonNode, Manager_1.Manager.makeLanguage("stopProfitInvdicator", true));
                break;
            case "btnStopLoss":
                this.clickIndicator(ButtonNode, Manager_1.Manager.makeLanguage("stopLossInvdicator", true));
                break;
        }
    }
    C2M_GetCrashInfo_Req() {
        let req = protoc_1.MST.C2M_GetCrashInfo_Req.create({ RpcId: Manager_1.Manager.netManager.getNewSeqId() });
        let buffer = protoc_1.MST.C2M_GetCrashInfo_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_GetCrashInfo_Req, protoc_1.MST.OuterOpcode_CrashGame.C2M_GetCrashInfo_Req, buffer);
    }
    C2M_MyCrashBet_Req() {
        let betGold = this.getEditboxBetGold(this.edbBetGold);
        if (betGold < MIN_BET_GOLD || betGold > MAX_BET_GOLD) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage(["InputBetGold", MIN_BET_GOLD, MAX_BET_GOLD], true));
            return;
        }
        if (!this.tggSwitchRate.isChecked ||
            (this.tggSwitchRate.isChecked && (this.getEditboxRate(this.edbChangeRate) < MIN_RATE || this.getEditboxRate(this.edbChangeRate) > MAX_RATE))) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("InputRate", true));
            return;
        }
        let req = protoc_1.MST.C2M_MyCrashBet_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            BetMode: protoc_1.MST.CrashMode.Manual,
            BetGold: NumberUtils_1.default.converToS(betGold),
            BetMultiple: NumberUtils_1.default.converToS(this.getEditboxRate(this.edbChangeRate)),
        });
        let buffer = protoc_1.MST.C2M_MyCrashBet_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_MyCrashBet_Req, protoc_1.MST.OuterOpcode_CrashGame.C2M_MyCrashBet_Req, buffer);
    }
    C2M_MyCrashAutoBet_Req() {
        let betGold = this.getEditboxBetGold(this.edbBetGoldAuto);
        if (betGold < MIN_BET_GOLD || betGold > MAX_BET_GOLD) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage(["InputBetGold", MIN_BET_GOLD, MAX_BET_GOLD], true));
            return;
        }
        if (!this.tggSwitchRateAuto.isChecked ||
            (this.tggSwitchRateAuto.isChecked && (this.getEditboxRate(this.edbChangeRateAuto) < MIN_RATE || this.getEditboxRate(this.edbChangeRateAuto) > MAX_RATE))) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("InputRate", true));
            return;
        }
        let round = this.getEditboxRound();
        if (round <= 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("InputRound", true));
            return;
        }
        let profit = this.getEditboxProfit();
        if (profit <= 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("InputProfit", true));
            return;
        }
        let loss = this.getEditboxLoss();
        if (loss <= 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("InputLoss", true));
            return;
        }
        this._autoBetReqData = {
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            BetMode: protoc_1.MST.CrashMode.Auto,
            BetGold: NumberUtils_1.default.converToS(betGold),
            BetMultiple: NumberUtils_1.default.converToS(this.getEditboxRate(this.edbChangeRateAuto)),
            AutoRound: round,
            StopProfit: NumberUtils_1.default.converToS(profit),
            StopLoss: NumberUtils_1.default.converToS(loss),
        };
        let req = protoc_1.MST.C2M_MyCrashBet_Req.create(this._autoBetReqData);
        let buffer = protoc_1.MST.C2M_MyCrashBet_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_MyCrashBet_Req, protoc_1.MST.OuterOpcode_CrashGame.C2M_MyCrashBet_Req, buffer);
    }
    C2M_CrashCancelAutoBet_Req() {
        let req = protoc_1.MST.C2M_CrashCancelAutoBet_Req.create({});
        let buffer = protoc_1.MST.C2M_CrashCancelAutoBet_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_CrashCancelAutoBet_Req, protoc_1.MST.OuterOpcode_CrashGame.C2M_CrashCancelAutoBet_Req, buffer);
    }
    onEvent_M2C_GetCrashInfo_Res(data) {
        this.refreshGameNo();
        this.refreshSeed();
        this.resumeView();
    }
    onEvent_M2C_CrashStart_mes(data) {
        this.audioHelper.stopMusic();
        this.audioHelper.playEffect(CrashGameData_1.Crash.SOUNDS.ROCKET_FLY, this.bundle);
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
    onEvent_M2C_MyCrashBet_Res(data) {
        if (data.Error === 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage(["nextBetGoldSucceed", NumberUtils_1.default.converToC(data.Gold)], true));
        }
        else {
            PanelHelp_1.default.showErrTip(data.Error);
        }
        if (data.BetMode === protoc_1.MST.CrashMode.Auto) {
            if (data.Error === 0) {
                this._crashData.autoBetData = {
                    BetGold: this._autoBetReqData.BetGold,
                    BetMultiple: this._autoBetReqData.BetMultiple,
                    AutoRound: this._autoBetReqData.AutoRound,
                    StopProfit: this._autoBetReqData.StopProfit,
                    StopLoss: this._autoBetReqData.StopLoss,
                };
            }
            this._autoBetReqData = null;
            this.refreshAutoBetButton();
        }
    }
    onEvent_M2C_CrashBet_Mes(data) {
        this.initRoundHash();
        this.refreshGameNo();
        this.refreshTotalCount();
        this.refreshTotalGold();
        let insertMyList = [];
        let insertPlayerList = [];
        for (let v of data.Bets) {
            let betPlayer = {
                betInfo: v,
                isEscape: false,
            };
            if (v.player.UnitId === this._userData.id) {
                insertMyList.push(betPlayer);
            }
            else {
                insertPlayerList.push(betPlayer);
            }
        }
        this.lsvBetPlayer.insert(insertMyList.reverse(), 0);
        this.lsvBetPlayer.insert(insertPlayerList.reverse(), this._crashData.myBetList.length);
        // this.lsvBetPlayer.set(Array.from(this._crashData.betPlayerMap.values()));
    }
    onEvent_M2C_CrashStop_Mes(data) {
        this.doBomb();
        let betPlayerNodeList = this.lsvBetPlayer.getChildNode(0, 9);
        for (let v of betPlayerNodeList) {
            let betPlayerSrc = v.getComponent(CrashBetPlayerItem_1.default);
            if (!betPlayerSrc.getIsWin()) {
                betPlayerSrc.setIsWin(false);
            }
        }
        this.refreshRecord();
    }
    onEvent_M2C_CrashStartBet_Mes(data) {
        this.audioHelper.playMusic(CrashGameData_1.Crash.SOUNDS.BGM, this.bundle);
        this._isBomb = false;
        this.nextView();
        this.refreshGameNo();
    }
    onEvent_M2C_CrashEscape_Mes(data) {
        for (let v of data.Players) {
            this.playEscapePlayerDropAnim(v.Nick);
        }
    }
    onEvent_M2C_CrashStopBet_Mes(data) {
        this.refreshBetButton();
        this.labStartCountDown.string = "";
        this.pgbStartCountDown.node.active = false;
        this.labStartTips.node.active = false;
        this.labStopTips.node.active = true;
    }
    onEvent_M2C_CrashCancelAutoBet_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        this._autoBetReqData = null;
        this._crashData.autoBetData = null;
        this.refreshAutoBetButton();
    }
    onEvent_M2C_CrashCancelAutoBet_Mes(data) {
        PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("cancelAutoBet", true));
        this._autoBetReqData = null;
        this.refreshAutoBetButton();
    }
    onEvent_M2C_CrashHash_Mes(data) {
        this.refreshSeed();
    }
    onEvent_M2C_TransferMap_Res(data) {
        if (data.Error === 0) {
            dispatch(LogicEvent_1.LogicEvent.ENTER_HALL);
        }
        else {
            PanelHelp_1.default.showErrTip(data.Error);
        }
    }
    stopAllSound() {
        this.audioHelper.stopMusic();
        this.audioHelper.stopEffectByPath(CrashGameData_1.Crash.SOUNDS.ROCKET_BOMB);
        this.audioHelper.stopEffectByPath(CrashGameData_1.Crash.SOUNDS.ROCKET_FLY);
    }
    onDestroy() {
        super.onDestroy();
        this.stopAllSound();
    }
};
__decorate([
    property(cc.Sprite)
], CrashGameView.prototype, "imgGameBg", void 0);
__decorate([
    property(sp.Skeleton)
], CrashGameView.prototype, "speStaticStar", void 0);
__decorate([
    property(sp.Skeleton)
], CrashGameView.prototype, "speDynamicStar", void 0);
__decorate([
    property(cc.Node)
], CrashGameView.prototype, "nodGameBet", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labStartTips", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labStopTips", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labStartCountDown", void 0);
__decorate([
    property(cc.ProgressBar)
], CrashGameView.prototype, "pgbStartCountDown", void 0);
__decorate([
    property(cc.Node)
], CrashGameView.prototype, "nodGameStart", void 0);
__decorate([
    property(cc.Node)
], CrashGameView.prototype, "nodStartRocket", void 0);
__decorate([
    property(cc.Sprite)
], CrashGameView.prototype, "imgBackLight", void 0);
__decorate([
    property(sp.Skeleton)
], CrashGameView.prototype, "speGameStart", void 0);
__decorate([
    property(cc.Mask)
], CrashGameView.prototype, "mskTail", void 0);
__decorate([
    property(cc.Sprite)
], CrashGameView.prototype, "imgTail0", void 0);
__decorate([
    property(cc.Sprite)
], CrashGameView.prototype, "imgTail1", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labRate", void 0);
__decorate([
    property(cc.Node)
], CrashGameView.prototype, "nodGameEnd", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labBombRate", void 0);
__decorate([
    property(sp.Skeleton)
], CrashGameView.prototype, "speBomb", void 0);
__decorate([
    property(sp.Skeleton)
], CrashGameView.prototype, "speDescent", void 0);
__decorate([
    property(cc.Node)
], CrashGameView.prototype, "nodEscapeDrop", void 0);
__decorate([
    property(cc.Layout)
], CrashGameView.prototype, "latRecord", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labManual", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labAuto", void 0);
__decorate([
    property(cc.Toggle)
], CrashGameView.prototype, "tggManual", void 0);
__decorate([
    property(cc.Toggle)
], CrashGameView.prototype, "tggAuto", void 0);
__decorate([
    property(cc.Layout)
], CrashGameView.prototype, "latManual", void 0);
__decorate([
    property(cc.EditBox)
], CrashGameView.prototype, "edbBetGold", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnNextBet", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnCurrBet", void 0);
__decorate([
    property(cc.Toggle)
], CrashGameView.prototype, "tggSwitchRate", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labSwitchRate", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnSub", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnAdd", void 0);
__decorate([
    property(cc.EditBox)
], CrashGameView.prototype, "edbChangeRate", void 0);
__decorate([
    property(cc.Layout)
], CrashGameView.prototype, "latAuto", void 0);
__decorate([
    property(cc.EditBox)
], CrashGameView.prototype, "edbBetGoldAuto", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labRoundTitle", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnAdd1", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnSub1", void 0);
__decorate([
    property(cc.EditBox)
], CrashGameView.prototype, "edbRound", void 0);
__decorate([
    property(cc.Toggle)
], CrashGameView.prototype, "tggSwitchRateAuto", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labSwitchRateAuto", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnSubAuto", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnAddAuto", void 0);
__decorate([
    property(cc.EditBox)
], CrashGameView.prototype, "edbChangeRateAuto", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labStopProfitTitle", void 0);
__decorate([
    property(cc.EditBox)
], CrashGameView.prototype, "edbStopProfit", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labStopLossTitle", void 0);
__decorate([
    property(cc.EditBox)
], CrashGameView.prototype, "edbStopLess", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnAutoBet", void 0);
__decorate([
    property(cc.Button)
], CrashGameView.prototype, "btnCancelAutoBet", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labBetListTitle", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labTotalBetCount", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labTotalBetGold", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labPlayerTtile", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labBetGoldTitle", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labIncomeTitle", void 0);
__decorate([
    property(CrashBetPlayerListView_1.default)
], CrashGameView.prototype, "lsvBetPlayer", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labGameNo", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labHash1", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labSeed", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labHash2", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labAcak", void 0);
__decorate([
    property(cc.Label)
], CrashGameView.prototype, "labPoint", void 0);
__decorate([
    property(TitleItemPageUser_1.default)
], CrashGameView.prototype, "titleItemPageUser", void 0);
__decorate([
    property(cc.Prefab)
], CrashGameView.prototype, "pfbCrashEscapePlayerItem", void 0);
CrashGameView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashGameView);
exports.default = CrashGameView;

cc._RF.pop();