
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashGameView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaEdhbWVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkVBQTBHO0FBQzFHLDZFQUEwRTtBQUUxRSxrRkFBMkY7QUFDM0Ysb0ZBQTREO0FBQzVELDhFQUFzRDtBQUN0RCwrREFBNEQ7QUFFNUQsZ0ZBQXdEO0FBQ3hELGlHQUF5RTtBQUN6RSx5REFBOEM7QUFDOUMsa0dBQTBFO0FBQzFFLCtEQUE0RDtBQUM1RCx5RUFBbUU7QUFDbkUsaUVBQThEO0FBQzlELHVFQUFvRTtBQUNwRSx1REFBb0Q7QUFDcEQsa0dBQTBFO0FBQzFFLHVFQUFtRjtBQUNuRiwwRUFBdUU7QUFDdkUsb0ZBQTREO0FBQzVELG9FQUFpRTtBQUNqRSx3RUFBZ0Q7QUFDaEQsOEZBQXNFO0FBRXRFLDhFQUFzRDtBQUN0RCxrRUFBMEM7QUFDMUMsa0ZBQTBEO0FBQzFELDRFQUFvRDtBQUNwRCx5R0FBaUY7QUFDakYsb0ZBQTREO0FBRTVELGlHQUF5RTtBQUV6RSxTQUFTO0FBQ1QsTUFBTSxZQUFZLEdBQVcsSUFBSSxDQUFDO0FBQ2xDLFNBQVM7QUFDVCxNQUFNLFlBQVksR0FBVyxNQUFNLENBQUM7QUFDcEMsT0FBTztBQUNQLE1BQU0sUUFBUSxHQUFXLElBQUksQ0FBQztBQUM5QixPQUFPO0FBQ1AsTUFBTSxRQUFRLEdBQVcsR0FBRyxDQUFDO0FBQzdCLFdBQVc7QUFDWCxNQUFNLFNBQVMsR0FBVyxDQUFDLENBQUM7QUFDNUIsV0FBVztBQUNYLE1BQU0sU0FBUyxHQUFXLE1BQU0sQ0FBQztBQUNqQyxnQkFBZ0I7QUFDaEIsTUFBTSxrQkFBa0IsR0FBVyxJQUFJLENBQUM7QUFDeEMsT0FBTztBQUNQLE1BQU0sZ0JBQWdCLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BELFlBQVk7QUFDWixNQUFN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LFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLGFBQWE7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLGFBQWE7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLGFBQWE7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLGFBQWE7Z0JB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QyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDYztBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOytDQUNlO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ3dCO0FBRzVDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ3dCO0FBRzNDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ2lCO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ2lCO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7d0RBQ3dCO0FBRzdDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ3lCO0FBRzVDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0RBQ29CO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ3VCO0FBRzFDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7a0RBQ2tCO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ2lCO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ3VCO0FBRzNDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ3VCO0FBRzFDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ3FCO0FBR3hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ3FCO0FBR3hDO0lBREMsUUFBUSxDQUFDLGdDQUFzQixDQUFDO21EQUNtQjtBQUdwRDtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNnQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNlO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7OENBQ2M7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDZTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ2U7QUFHbEM7SUFEQyxRQUFRLENBQUMsMkJBQWlCLENBQUM7d0RBQ3dCO0FBR3BEO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0RBQytCO0FBMU1sQyxhQUFhO0lBRmpDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGFBQWEsQ0F3bkRqQztrQkF4bkRvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2hFbnRlckNvbXBsZXRlLCBMb2dpY1R5cGUsIExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IEFwcERhdGEgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCB7IENyYXNoUmF0ZURlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvQ3Jhc2hSYXRlRGVmaW5lXCI7XG5pbXBvcnQgeyBDcmFzaEludGVyZmFjZSB9IGZyb20gXCIuLi9pbnRlcmZhY2UvQ3Jhc2hJbnRlcmZhY2VcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCBDcmFzaEJldFBsYXllckxpc3RWaWV3IGZyb20gXCIuLi9jb21wb25lbnQvQ3Jhc2hCZXRQbGF5ZXJMaXN0Vmlld1wiO1xuaW1wb3J0IHsgQ3Jhc2ggfSBmcm9tIFwiLi4vZGF0YS9DcmFzaEdhbWVEYXRhXCI7XG5pbXBvcnQgT3BlcmF0aW9uIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvT3BlcmF0aW9uXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBDcmFzaENvbG9yRGVmaW5lIH0gZnJvbSBcIi4uL2RlZmluZS9DcmFzaENvbG9yRGVmaW5lXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDcmFzaENvbmZpZyB9IGZyb20gXCIuLi9jb25maWcvQ3Jhc2hDb25maWdcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgQ3Jhc2hSZWNvcmRJdGVtIGZyb20gXCIuL0NyYXNoUmVjb3JkSXRlbVwiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL051bWJlclV0aWxzXCI7XG5pbXBvcnQgQ3Jhc2hVdGlscyBmcm9tIFwiLi4vdXRpbHMvQ3Jhc2hVdGlsc1wiO1xuaW1wb3J0IENyYXNoQmV0UGxheWVySXRlbSBmcm9tIFwiLi9DcmFzaEJldFBsYXllckl0ZW1cIjtcbmltcG9ydCBDcmFzaERhdGEgZnJvbSBcIi4uL2RhdGEvQ3Jhc2hEYXRhXCI7XG5pbXBvcnQgQ3Jhc2hUb3RhbFJlY29yZFZpZXcgZnJvbSBcIi4vQ3Jhc2hUb3RhbFJlY29yZFZpZXdcIjtcbmltcG9ydCBDcmFzaE15UmVjb3JkVmlldyBmcm9tIFwiLi9DcmFzaE15UmVjb3JkVmlld1wiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2VVc2VyIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2l0ZW0vVGl0bGVJdGVtUGFnZVVzZXJcIjtcbmltcG9ydCBDcmFzaEVzY2FwZVBsYXllckl0ZW0gZnJvbSBcIi4vQ3Jhc2hFc2NhcGVQbGF5ZXJJdGVtXCI7XG5pbXBvcnQgeyBDcmFzaERlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvQ3Jhc2hEZWZpbmVcIjtcbmltcG9ydCBJbmRpY2F0b3JWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3ZpZXcvSW5kaWNhdG9yVmlld1wiO1xuXG4vLyDmnIDlsI/kuIvms6jph5Hpop1cbmNvbnN0IE1JTl9CRVRfR09MRDogbnVtYmVyID0gMjAwMDtcbi8vIOacgOWkp+S4i+azqOmHkeminVxuY29uc3QgTUFYX0JFVF9HT0xEOiBudW1iZXIgPSA0NDAwMDA7XG4vLyDmnIDlsI/lgI3mlbBcbmNvbnN0IE1JTl9SQVRFOiBudW1iZXIgPSAxLjAxO1xuLy8g5pyA5aSn5YCN5pWwXG5jb25zdCBNQVhfUkFURTogbnVtYmVyID0gMjAwO1xuLy8g5pyA5bCP6Ieq5Yqo5LiL5rOo5ZyI5pWwXG5jb25zdCBNSU5fUk9VTkQ6IG51bWJlciA9IDI7XG4vLyDmnIDlpKfoh6rliqjkuIvms6jlnIjmlbBcbmNvbnN0IE1BWF9ST1VORDogbnVtYmVyID0gOTk5OTk5O1xuLy8g54Gr566t5Yay5Yi65pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG5jb25zdCBST0NLRVRfU1BSSU5UX1RJTUU6IG51bWJlciA9IDEzMDA7XG4vLyDngavnrq3otbfngrlcbmNvbnN0IFJPQ0tFVF9TVEFSVF9QT1M6IGNjLlZlYzIgPSBjYy52MigtMjY3LCAtNTIzKTtcbi8vIOeBq+eurSBDMSDotJ3loZ7lsJRcbmNvbnN0IFJPQ0tFVF9DMV9QT1M6IGNjLlZlYzIgPSBjYy52MigtMTkzLjY5OCwgLTU2OC41OTEpO1xuLy8g54Gr566tIEMyIOi0neWhnuWwlFxuY29uc3QgUk9DS0VUX0MyX1BPUzogY2MuVmVjMiA9IGNjLnYyKDMxOC44OTIsIC01NTYuMjAyKTtcbi8vIOeBq+euree7iOeCuVxuY29uc3QgUk9DS0VUX0VORF9QT1M6IGNjLlZlYzIgPSBjYy52MigyOTQuMjY3LCAtMjIxLjU1Mik7XG4vLyDog4zmma/np7vliqjml7bpl7TvvIjljZXkvY3vvJrmr6vnp5LvvIlcbmNvbnN0IEJHX01PVkVfVElNRTogbnVtYmVyID0gMTMwMDtcbi8vIOenu+WKqOWIsOaYn+epuiB5IOWdkOagh1xuY29uc3QgTU9WRV9UT19TS1lfWTogbnVtYmVyID0gLTEyMDtcbi8vIOenu+WKqOWIsOWxseS9kyB5IOWdkOagh1xuY29uc3QgTU9WRV9UT19NT1VOVF9ZOiBudW1iZXIgPSA3Nztcbi8vIOmdmeaAgeaYn+aYn+a4kOaYvuaXtumXtFxuY29uc3QgU1RBVElDX1NUQVJfRkFERV9JTl9USU1FOiBudW1iZXIgPSA1MDA7XG4vLyDpnZnmgIHmmJ/mmJ/muJDpmpDml7bpl7RcbmNvbnN0IFNUQVRJQ19TVEFSX0ZBREVfT1VUX1RJTUU6IG51bWJlciA9IDUwMDtcbi8vIOWKqOaAgeaYn+aYn+a4kOaYvuaXtumXtFxuY29uc3QgRFlOQU1JQ19TVEFSX0ZBREVfSU5fVElNRTogbnVtYmVyID0gNTAwO1xuLy8g5Yqo5oCB5pif5pif5riQ6ZqQ5pe26Ze0XG5jb25zdCBEWU5BTUlDX1NUQVJfRkFERV9PVVRfVElNRTogbnVtYmVyID0gNTAwO1xuLy8g6ZmN6JC957uI54K5IHlcbmNvbnN0IERFU0NFTlRfWTogbnVtYmVyID0gLTc4MDtcbi8vIOmZjeiQveWKqOeUu+aXtumXtO+8iOWNleS9je+8muavq+enku+8iVxuY29uc3QgREVTQ0VOVF9BTklNX1RJTUU6IG51bWJlciA9IDEwMDA7XG4vLyDlpITnkIYgMSDlgI3ml7bkuI3mkq3mlL7liqjnlLtcbmNvbnN0IE1JTl9SQVRFX1JFVFVSTjogbnVtYmVyID0gMTAwO1xuLy8g5Yid5aeL6YCD6LeR546p5a626IqC54K55pWw6YePXG5jb25zdCBJTklUX0VTQ0FQRV9QQUxZRVJfQ09VTlQ6IG51bWJlciA9IDEwO1xuLy8g6YCD6LeR546p5a625LiL6JC95pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG5jb25zdCBFU0NBUEVfUExBWUVSX0RST1BfVElNRTogbnVtYmVyID0gMzAwMDtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXNoR2FtZVZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nR2FtZUJnOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHByaXZhdGUgc3BlU3RhdGljU3Rhcjogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHByaXZhdGUgc3BlRHluYW1pY1N0YXI6IHNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kR2FtZUJldDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJTdGFydFRpcHM6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlN0b3BUaXBzOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJTdGFydENvdW50RG93bjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIHByaXZhdGUgcGdiU3RhcnRDb3VudERvd246IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kR2FtZVN0YXJ0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kU3RhcnRSb2NrZXQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0JhY2tMaWdodDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBwcml2YXRlIHNwZUdhbWVTdGFydDogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk1hc2spXG4gICAgcHJpdmF0ZSBtc2tUYWlsOiBjYy5NYXNrID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdUYWlsMDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdUYWlsMTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kR2FtZUVuZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJCb21iUmF0ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHByaXZhdGUgc3BlQm9tYjogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHByaXZhdGUgc3BlRGVzY2VudDogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RFc2NhcGVEcm9wOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYXlvdXQpXG4gICAgcHJpdmF0ZSBsYXRSZWNvcmQ6IGNjLkxheW91dCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJNYW51YWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkF1dG86IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXG4gICAgcHJpdmF0ZSB0Z2dNYW51YWw6IGNjLlRvZ2dsZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxuICAgIHByaXZhdGUgdGdnQXV0bzogY2MuVG9nZ2xlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYXlvdXQpXG4gICAgcHJpdmF0ZSBsYXRNYW51YWw6IGNjLkxheW91dCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYkJldEdvbGQ6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0bk5leHRCZXQ6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHByaXZhdGUgYnRuQ3VyckJldDogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXG4gICAgcHJpdmF0ZSB0Z2dTd2l0Y2hSYXRlOiBjYy5Ub2dnbGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiU3dpdGNoUmF0ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0blN1YjogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5BZGQ6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYkNoYW5nZVJhdGU6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxheW91dClcbiAgICBwcml2YXRlIGxhdEF1dG86IGNjLkxheW91dCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYkJldEdvbGRBdXRvOiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJvdW5kVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5BZGQxOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0blN1YjE6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYlJvdW5kOiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXG4gICAgcHJpdmF0ZSB0Z2dTd2l0Y2hSYXRlQXV0bzogY2MuVG9nZ2xlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlN3aXRjaFJhdGVBdXRvOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHByaXZhdGUgYnRuU3ViQXV0bzogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5BZGRBdXRvOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcHJpdmF0ZSBlZGJDaGFuZ2VSYXRlQXV0bzogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJTdG9wUHJvZml0VGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHByaXZhdGUgZWRiU3RvcFByb2ZpdDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJTdG9wTG9zc1RpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYlN0b3BMZXNzOiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5BdXRvQmV0OiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0bkNhbmNlbEF1dG9CZXQ6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJCZXRMaXN0VGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlRvdGFsQmV0Q291bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlRvdGFsQmV0R29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUGxheWVyVHRpbGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldEdvbGRUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiSW5jb21lVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShDcmFzaEJldFBsYXllckxpc3RWaWV3KVxuICAgIHByaXZhdGUgbHN2QmV0UGxheWVyOiBDcmFzaEJldFBsYXllckxpc3RWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkdhbWVObzogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiSGFzaDE6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlNlZWQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkhhc2gyOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJBY2FrOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJQb2ludDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFRpdGxlSXRlbVBhZ2VVc2VyKVxuICAgIHByaXZhdGUgdGl0bGVJdGVtUGFnZVVzZXI6IFRpdGxlSXRlbVBhZ2VVc2VyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcHJpdmF0ZSBwZmJDcmFzaEVzY2FwZVBsYXllckl0ZW06IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICAvLyDmuLjmiI/mlbDmja5cbiAgICBwcml2YXRlIF9jcmFzaERhdGE6IENyYXNoRGF0YSA9IG51bGw7XG4gICAgLy8g5bqU55So5pWw5o2uXG4gICAgcHJpdmF0ZSBfYXBwRGF0YTogQXBwRGF0YSA9IG51bGw7XG4gICAgLy8g55So5oi35pWw5o2uXG4gICAgcHJpdmF0ZSBfdXNlckRhdGE6IFVzZXJEYXRhID0gbnVsbDtcbiAgICAvLyDngavnrq3otJ3loZ7lsJTliqjnlLtcbiAgICBwcml2YXRlIF9yb2NrZXRCZXppZXJUd2VlbjogY2MuVHdlZW4gPSBudWxsO1xuICAgIC8vIOeBq+eureavj+W4p+enu+WKqOi9qOi/ueWIl+ihqFxuICAgIHByaXZhdGUgX3JvY2tldEZyYW1lUG9zOiBjYy5WZWMyW10gPSBudWxsO1xuICAgIC8vIOiDjOaZr+enu+WKqOWKqOeUu1xuICAgIHByaXZhdGUgX2JnTW92ZVR3ZWVuOiBjYy5Ud2VlbiA9IG51bGw7XG4gICAgLy8g6Z2Z5oCB5pif5pif5pi+6ZqQ5Yqo55S7XG4gICAgcHJpdmF0ZSBfc3RhdGljU3RhckZhZGVUd2VlbjogY2MuVHdlZW4gPSBudWxsO1xuICAgIC8vIOWKqOaAgeaYn+aYn+S4i+iQveWKqOeUu1xuICAgIHByaXZhdGUgX2R5bmFtaWNTdGFyVHdlZW46IGNjLlR3ZWVuID0gbnVsbDtcbiAgICAvLyDoh6rliqjkuIvms6jmlbDmja5cbiAgICBwcml2YXRlIF9hdXRvQmV0UmVxRGF0YTogTVNULklDMk1fTXlDcmFzaEJldF9SZXEgPSBudWxsO1xuICAgIC8vIOaLluWwvuWOn+Wni+WuvemrmFxuICAgIHByaXZhdGUgX3RhaWxPcmlnaW5TaXplOiBjYy5TaXplID0gbnVsbDtcbiAgICAvLyDkuIvpmY3liqjnlLtcbiAgICBwcml2YXRlIF9kZXNjZW50VHdlZW46IGNjLlR3ZWVuID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmj5DliY3niIbngrhcbiAgICBwcml2YXRlIF9pc0JvbWI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyDpgIPot5HkurrlkZjoioLngrnmsaBcbiAgICBwcml2YXRlIF9lc2NhcGVQbGF5ZXJOb2RlUG9vbDogY2MuTm9kZVBvb2wgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInByZWZhYnMvQ3Jhc2hHYW1lVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIGRpc3BhdGNoRW50ZXJDb21wbGV0ZSh7IHR5cGU6IExvZ2ljVHlwZS5HQU1FLCB2aWV3czogW3RoaXNdIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgICAgICB0aGlzLmluaXRQcmVsb2FkKCk7XG4gICAgICAgIHRoaXMuQzJNX0dldENyYXNoSW5mb19SZXEoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuXG4gICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NyYXNoRGF0YSA9IEcuRGF0YU1nci5nZXQoQ3Jhc2hEYXRhKTtcbiAgICAgICAgdGhpcy5fYXBwRGF0YSA9IEcuRGF0YU1nci5nZXQoQXBwRGF0YSk7XG4gICAgICAgIHRoaXMuX3VzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIHRoaXMuX3JvY2tldEJlemllclR3ZWVuID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcm9ja2V0RnJhbWVQb3MgPSBbXTtcbiAgICAgICAgdGhpcy5fYXV0b0JldFJlcURhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl90YWlsT3JpZ2luU2l6ZSA9IHRoaXMubXNrVGFpbC5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIHRoaXMuX2VzY2FwZVBsYXllck5vZGVQb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0QmcoKTtcbiAgICAgICAgdGhpcy5pbml0R2FtZSgpO1xuICAgICAgICB0aGlzLmluaXRNb2RlKCk7XG4gICAgICAgIHRoaXMuaW5pdEJldCgpO1xuICAgICAgICB0aGlzLmluaXRSYXRlKCk7XG4gICAgICAgIHRoaXMuaW5pdEJldExpc3QoKTtcbiAgICAgICAgdGhpcy5pbml0SGFzaEluZm8oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQcmVsb2FkKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgSU5JVF9FU0NBUEVfUEFMWUVSX0NPVU5UOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMucHV0RXNjYXBlUGxheWVySXRlbShjYy5pbnN0YW50aWF0ZSh0aGlzLnBmYkNyYXNoRXNjYXBlUGxheWVySXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0SGFzaEluZm8oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiR2FtZU5vLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSGFzaDEuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJTZWVkLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSGFzaDIuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJBY2FrLnN0cmluZyA9IFwidGVyc2VtYnVueWlcIjtcbiAgICAgICAgdGhpcy5sYWJQb2ludC5zdHJpbmcgPSBcInRlcnNlbWJ1bnlpXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Um91bmRIYXNoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkhhc2gyLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQWNhay5zdHJpbmcgPSBcInRlcnNlbWJ1bnlpXCI7XG4gICAgICAgIHRoaXMubGFiUG9pbnQuc3RyaW5nID0gXCJ0ZXJzZW1idW55aVwiO1xuICAgIH1cblxuICAgIHByaXZhdGUgbmV4dFZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmV4dEhhc2hJbmZvKCk7XG4gICAgICAgIHRoaXMuaW5pdEJldExpc3QoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmV0QnV0dG9uKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEdhbWUoKTtcbiAgICAgICAgdGhpcy5wbGF5U3RhdGljU3RhckZhZGVBbmltKHRydWUpO1xuICAgICAgICB0aGlzLnN0b3BEZXNjZW50QW5pbSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbmV4dEhhc2hJbmZvKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkhhc2gyLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQWNhay5zdHJpbmcgPSBcInRlcnNlbWJ1bnlpXCI7XG4gICAgICAgIHRoaXMubGFiUG9pbnQuc3RyaW5nID0gXCJ0ZXJzZW1idW55aVwiO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X00yQ19HZXRDcmFzaEluZm9fUmVzXCIsIHRoaXMub25FdmVudF9NMkNfR2V0Q3Jhc2hJbmZvX1Jlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X00yQ19DcmFzaFN0YXJ0X21lc1wiLCB0aGlzLm9uRXZlbnRfTTJDX0NyYXNoU3RhcnRfbWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX015Q3Jhc2hCZXRfUmVzXCIsIHRoaXMub25FdmVudF9NMkNfTXlDcmFzaEJldF9SZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfQ3Jhc2hCZXRfTWVzXCIsIHRoaXMub25FdmVudF9NMkNfQ3Jhc2hCZXRfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0NyYXNoU3RvcF9NZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19DcmFzaFN0b3BfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0NyYXNoU3RhcnRCZXRfTWVzXCIsIHRoaXMub25FdmVudF9NMkNfQ3Jhc2hTdGFydEJldF9NZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfQ3Jhc2hFc2NhcGVfTWVzXCIsIHRoaXMub25FdmVudF9NMkNfQ3Jhc2hFc2NhcGVfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0NyYXNoU3RvcEJldF9NZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19DcmFzaFN0b3BCZXRfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0NyYXNoQ2FuY2VsQXV0b0JldF9SZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19DcmFzaENhbmNlbEF1dG9CZXRfUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0NyYXNoQ2FuY2VsQXV0b0JldF9NZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19DcmFzaENhbmNlbEF1dG9CZXRfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0NyYXNoSGFzaF9NZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19DcmFzaEhhc2hfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX1RyYW5zZmVyTWFwX1Jlc1wiLCB0aGlzLm9uRXZlbnRfTTJDX1RyYW5zZmVyTWFwX1Jlcyk7XG5cbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnRpdGxlSXRlbVBhZ2VVc2VyLmxhbmd1YWdlUGFnZU5hbWUoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJQYWdlTmFtZVwiLCB0cnVlKSk7XG4gICAgICAgIHRoaXMubGFiTWFudWFsLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJNYW51YWxcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiQXV0by5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiQXV0b1wiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJTd2l0Y2hSYXRlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJTd2l0Y2hSYXRlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYlJvdW5kVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYlJvdW5kVGl0bGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiU3dpdGNoUmF0ZUF1dG8ubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYlN3aXRjaFJhdGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiU3RvcFByb2ZpdFRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJTdG9wUHJvZml0VGl0bGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiU3RvcExvc3NUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiU3RvcExvc3NUaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJCZXRMaXN0VGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkJldExpc3RUaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJUb3RhbEJldENvdW50Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJUb3RhbEJldENvdW50XCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYlBsYXllclR0aWxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJQbGF5ZXJUdGlsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJCZXRHb2xkVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkJldEdvbGRUaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJJbmNvbWVUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiSW5jb21lVGl0bGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiU3RhcnRUaXBzLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJTdGFydFRpcHNcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiU3RvcFRpcHMubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYlN0b3BUaXBzXCIsIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOa4uOaIj+WAkuiuoeaXtlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlQ291bnREb253KCk6IHZvaWQge1xuICAgICAgICBsZXQgbXM6IG51bWJlciA9IHRoaXMuX2NyYXNoRGF0YS5zdG9wQmV0VGltZXN0YW1wIC0gdGhpcy5fYXBwRGF0YS5nZXRTZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgICAgaWYgKG1zIDw9IDApIHtcbiAgICAgICAgICAgIG1zID0gMDtcbiAgICAgICAgICAgIHRoaXMubGFiU3RhcnRDb3VudERvd24uc3RyaW5nID0gRGF0ZVV0aWxzLmdldE1zVG9TKG1zKTtcbiAgICAgICAgICAgIHRoaXMucGdiU3RhcnRDb3VudERvd24ucHJvZ3Jlc3MgPSBtcztcbiAgICAgICAgICAgIHRoaXMuc3RvcENvdW50RG93bigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0b3AyU3RhcnRNczogbnVtYmVyID0gdGhpcy5fY3Jhc2hEYXRhLnN0b3BCZXRUaW1lc3RhbXAgLSB0aGlzLl9jcmFzaERhdGEuc3RhcnRCZXRUaW1lc3RhbXA7XG5cbiAgICAgICAgdGhpcy5sYWJTdGFydENvdW50RG93bi5zdHJpbmcgPSBEYXRlVXRpbHMuZ2V0TXNUb1MobXMpO1xuICAgICAgICB0aGlzLnBnYlN0YXJ0Q291bnREb3duLnByb2dyZXNzID0gbXMgLyBzdG9wMlN0YXJ0TXM7XG4gICAgICAgIHRoaXMucGdiU3RhcnRDb3VudERvd24ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWQr+WKqOa4uOaIj+WAkuiuoeaXtlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhcnRDb3VudERvd24oKSB7XG4gICAgICAgIHRoaXMuc3RvcENvdW50RG93bigpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMudXBkYXRlQ291bnREb253KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLmuLjmiI/lgJLorqHml7ZcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0b3BDb3VudERvd24oKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnVwZGF0ZUNvdW50RG9udyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUaXRhbENvbG9yKHJhdGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgY29sb3I6IGNjLkNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5UYWlsLldISVRFO1xuXG4gICAgICAgIGlmIChyYXRlID49IENyYXNoUmF0ZURlZmluZS5Db2xvclJhdGUuWUVFTE9XKSB7XG4gICAgICAgICAgICBjb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuVGFpbC5ZRUVMT1c7XG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA+PSBDcmFzaFJhdGVEZWZpbmUuQ29sb3JSYXRlLkJMVUUpIHtcbiAgICAgICAgICAgIGNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5UYWlsLkJMVUU7XG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA+PSBDcmFzaFJhdGVEZWZpbmUuQ29sb3JSYXRlLkdSRUVOKSB7XG4gICAgICAgICAgICBjb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuVGFpbC5HUkVFTjtcbiAgICAgICAgfSBlbHNlIGlmIChyYXRlID49IENyYXNoUmF0ZURlZmluZS5Db2xvclJhdGUuUkVEKSB7XG4gICAgICAgICAgICBjb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuVGFpbC5SRUQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmltZ1RhaWwxLm5vZGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5pbWdCYWNrTGlnaHQubm9kZS5jb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQmV0TGlzdChyYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2NyYXNoRGF0YS5iZXRQbGF5ZXJNYXAuc2l6ZSA8PSAwIHx8IHRoaXMubHN2QmV0UGxheWVyLmdldENoaWxkQ291bnQoKSA8IHRoaXMuX2NyYXNoRGF0YS5iZXRQbGF5ZXJNYXAuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlbEtleUxpc3Q6IG51bWJlcltdID0gW107XG4gICAgICAgIHRoaXMuX2NyYXNoRGF0YS5iZXRQbGF5ZXJNYXAuZm9yRWFjaCgodmFsdWU6IENyYXNoSW50ZXJmYWNlLkJldFBsYXllciwga2V5OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChyYXRlID49IHZhbHVlLmJldEluZm8uTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYmV0UGxheWVyTm9kZTogY2MuTm9kZSA9IHRoaXMubHN2QmV0UGxheWVyLmdldENoaWxkTm9kZUJ5SW5kZXgoa2V5KTtcbiAgICAgICAgICAgICAgICBsZXQgYmV0UGxheWVyU3JjOiBDcmFzaEJldFBsYXllckl0ZW0gPSBiZXRQbGF5ZXJOb2RlLmdldENvbXBvbmVudChDcmFzaEJldFBsYXllckl0ZW0pO1xuICAgICAgICAgICAgICAgIGJldFBsYXllclNyYy5zZXRJc1dpbih0cnVlKTtcbiAgICAgICAgICAgICAgICBkZWxLZXlMaXN0LnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgdiBvZiBkZWxLZXlMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jcmFzaERhdGEuYmV0UGxheWVyTWFwLmRlbGV0ZSh2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUmF0ZSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJhdGU6IG51bWJlciA9IHRoaXMuX2NyYXNoRGF0YS5nZXRSYXRlKCk7XG4gICAgICAgIGlmIChyYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxhYlJhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlQmV0TGlzdChyYXRlKTtcblxuICAgICAgICAvLyDpnIDopoHlgZrniIbngrjlpITnkIZcbiAgICAgICAgbGV0IGJvbWJSYXRlOiBudW1iZXIgPSB0aGlzLl9jcmFzaERhdGEucm91bmRCb21iUmF0ZTtcbiAgICAgICAgaWYgKHJhdGUgPj0gYm9tYlJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGl0YWxDb2xvcihib21iUmF0ZSk7XG4gICAgICAgICAgICB0aGlzLmxhYlJhdGUuc3RyaW5nID0gVXRpbE1nci50b1BhZGRpbmcoTnVtYmVyVXRpbHMuY29udmVyVG9DKGJvbWJSYXRlKSwgMikgKyBcInhcIjs7XG4gICAgICAgICAgICB0aGlzLmRvQm9tYigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVUaXRhbENvbG9yKHJhdGUpO1xuXG4gICAgICAgIHRoaXMubGFiUmF0ZS5zdHJpbmcgPSBVdGlsTWdyLnRvUGFkZGluZyhOdW1iZXJVdGlscy5jb252ZXJUb0MocmF0ZSksIDIpICsgXCJ4XCI7O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRSYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BSYXRlKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy51cGRhdGVSYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3BSYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYlJhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMudXBkYXRlUmF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwdXRFc2NhcGVQbGF5ZXJJdGVtKGVzY2FwZVBsYXllck5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGVzY2FwZVBsYXllclNyYzogQ3Jhc2hFc2NhcGVQbGF5ZXJJdGVtID0gZXNjYXBlUGxheWVyTm9kZS5nZXRDb21wb25lbnQoQ3Jhc2hFc2NhcGVQbGF5ZXJJdGVtKTtcbiAgICAgICAgZXNjYXBlUGxheWVyU3JjLnJlc2V0KCk7XG4gICAgICAgIGVzY2FwZVBsYXllck5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuXG4gICAgICAgIHRoaXMuX2VzY2FwZVBsYXllck5vZGVQb29sLnB1dChlc2NhcGVQbGF5ZXJOb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEVzY2FwZVBsYXllckl0ZW0oKTogY2MuTm9kZSB7XG4gICAgICAgIGxldCBlc2NhcGVQbGF5ZXJOb2RlOiBjYy5Ob2RlID0gdGhpcy5fZXNjYXBlUGxheWVyTm9kZVBvb2wuZ2V0KCk7XG4gICAgICAgIGlmICghZXNjYXBlUGxheWVyTm9kZSkge1xuICAgICAgICAgICAgZXNjYXBlUGxheWVyTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGZiQ3Jhc2hFc2NhcGVQbGF5ZXJJdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlc2NhcGVQbGF5ZXJOb2RlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Um9ja2V0VG9UYWlsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIGxldCByb2NrZXRXb3JsZFBvczogY2MuVmVjMiA9IHRoaXMubm9kU3RhcnRSb2NrZXQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgbGV0IHRhaWxXb3JsZFBvczogY2MuVmVjMiA9IHRoaXMubXNrVGFpbC5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgIHJldHVybiByb2NrZXRXb3JsZFBvcy5zdWIodGFpbFdvcmxkUG9zKS55O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluinkuW6pumAmui/hyAyIOS4queCuVxuICAgICAqIEBwYXJhbSBwMSB7bnVtYmVyfSDngrkxXG4gICAgICogQHBhcmFtIHAyIHtudW1iZXJ9IOeCuTJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDop5LluqZcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFuZ2xlQnlQb2ludDIocDE6IGNjLlZlYzIsIHAyOiBjYy5WZWMyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGR4OiBudW1iZXIgPSBwMi54IC0gcDEueDtcbiAgICAgICAgbGV0IGR5OiBudW1iZXIgPSBwMi55IC0gcDEueTtcbiAgICAgICAgbGV0IGRpcjogY2MuVmVjMiA9IGNjLnYyKGR4LCBkeSk7XG4gICAgICAgIGxldCBhbmdsZTogbnVtYmVyID0gZGlyLnNpZ25BbmdsZShjYy52MigxLCAwKSk7XG4gICAgICAgIGxldCBkZWdyZWU6IG51bWJlciA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MDtcbiAgICAgICAgcmV0dXJuIC1kZWdyZWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRSb2NrZXRXYWl0U3RhdHVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5vZFN0YXJ0Um9ja2V0LmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5ub2RTdGFydFJvY2tldC5wb3NpdGlvbiA9IFJPQ0tFVF9TVEFSVF9QT1M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRSb2NrZXRFbmRTdGF0dXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kU3RhcnRSb2NrZXQuYW5nbGUgPSA5MDtcbiAgICAgICAgdGhpcy5ub2RTdGFydFJvY2tldC5wb3NpdGlvbiA9IFJPQ0tFVF9FTkRfUE9TO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUm9ja2V0Um90YXRlKCk6IHZvaWQge1xuICAgICAgICBsZXQgZnJhbWVQb3NMZW46IG51bWJlciA9IHRoaXMuX3JvY2tldEZyYW1lUG9zLmxlbmd0aDtcbiAgICAgICAgbGV0IGxhc3RQb3M6IGNjLlZlYzIgPSB0aGlzLl9yb2NrZXRGcmFtZVBvc1tmcmFtZVBvc0xlbiAtIDFdO1xuICAgICAgICBsZXQgY3VyclJvY2tldFBvczogY2MuVmVjMiA9IHRoaXMubm9kU3RhcnRSb2NrZXQucG9zaXRpb247XG5cbiAgICAgICAgaWYgKGxhc3RQb3MgIT09IHVuZGVmaW5lZCAmJiBsYXN0UG9zLmVxdWFscyhjdXJyUm9ja2V0UG9zKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm9ja2V0RnJhbWVQb3MucHVzaChjdXJyUm9ja2V0UG9zKTtcblxuICAgICAgICBpZiAoZnJhbWVQb3NMZW4gPj0gMikge1xuICAgICAgICAgICAgdGhpcy5ub2RTdGFydFJvY2tldC5hbmdsZSA9IHRoaXMuZ2V0QW5nbGVCeVBvaW50Mih0aGlzLl9yb2NrZXRGcmFtZVBvc1tmcmFtZVBvc0xlbiAtIDJdLCB0aGlzLl9yb2NrZXRGcmFtZVBvc1tmcmFtZVBvc0xlbiAtIDFdKTtcbiAgICAgICAgICAgIHRoaXMubXNrVGFpbC5ub2RlLmhlaWdodCA9IHRoaXMuZ2V0Um9ja2V0VG9UYWlsSGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0VXBkYXRlUm9ja2V0Um90YXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BVcGRhdGVSb2NrZXRSb3RhdGUoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnVwZGF0ZVJvY2tldFJvdGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wVXBkYXRlUm9ja2V0Um90YXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy51cGRhdGVSb2NrZXRSb3RhdGUpO1xuICAgICAgICB0aGlzLl9yb2NrZXRGcmFtZVBvcy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGxheUJvbWJBbmltKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNwZUJvbWIubm9kZS5wb3NpdGlvbiA9IHRoaXMubm9kU3RhcnRSb2NrZXQucG9zaXRpb247XG4gICAgICAgIHRoaXMuc3BlQm9tYi5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGxheUVzY2FwZVBsYXllckRyb3BBbmltKG5pY2s6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgZXNjYXBlUGxheWVyTm9kZTogY2MuTm9kZSA9IHRoaXMuZ2V0RXNjYXBlUGxheWVySXRlbSgpO1xuICAgICAgICB0aGlzLm5vZEVzY2FwZURyb3AuYWRkQ2hpbGQoZXNjYXBlUGxheWVyTm9kZSk7XG4gICAgICAgIGxldCBlc2NhcGVQbGF5ZXJTcmM6IENyYXNoRXNjYXBlUGxheWVySXRlbSA9IGVzY2FwZVBsYXllck5vZGUuZ2V0Q29tcG9uZW50KENyYXNoRXNjYXBlUGxheWVySXRlbSk7XG4gICAgICAgIGVzY2FwZVBsYXllclNyYy5vblNob3cobmljayk7XG5cbiAgICAgICAgbGV0IHN0YXJ0UG9zOiBjYy5WZWMyID0gdGhpcy5ub2RTdGFydFJvY2tldC5wb3NpdGlvbjtcblxuICAgICAgICBjYy50d2Vlbihlc2NhcGVQbGF5ZXJOb2RlKVxuICAgICAgICAgICAgLnNldCh7IHBvc2l0aW9uOiBzdGFydFBvcyB9KVxuICAgICAgICAgICAgLnRvKEVTQ0FQRV9QTEFZRVJfRFJPUF9USU1FIC8gMTAwMCwgeyBwb3NpdGlvbjogY2MudjIoc3RhcnRQb3MueCwgREVTQ0VOVF9ZKSB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHV0RXNjYXBlUGxheWVySXRlbShlc2NhcGVQbGF5ZXJOb2RlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7kuIvpmY3liqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIHBsYXlEZXNjZW50QW5pbSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wRGVzY2VudEFuaW0oKTtcbiAgICAgICAgbGV0IHJvY2tldFBvczogY2MuVmVjMiA9IHRoaXMubm9kU3RhcnRSb2NrZXQucG9zaXRpb247XG4gICAgICAgIHRoaXMuc3BlRGVzY2VudC5ub2RlLnBvc2l0aW9uID0gcm9ja2V0UG9zO1xuICAgICAgICB0aGlzLl9kZXNjZW50VHdlZW4gPSBjYy50d2Vlbih0aGlzLnNwZURlc2NlbnQubm9kZSlcbiAgICAgICAgICAgIC50byhERVNDRU5UX0FOSU1fVElNRSAvIDEwMDAsIHsgeTogREVTQ0VOVF9ZIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLkuIvpmY3liqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0b3BEZXNjZW50QW5pbSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2Rlc2NlbnRUd2Vlbikge1xuICAgICAgICAgICAgdGhpcy5fZGVzY2VudFR3ZWVuLnN0b3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGxheUR5bmFtaWNTdGFyRmFkZUFuaW0oaXNTaG93OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcER5bmFtaWNTdGFyRmFkZUFuaW0oKTtcblxuICAgICAgICB0aGlzLl9keW5hbWljU3RhclR3ZWVuID0gY2MudHdlZW4odGhpcy5zcGVEeW5hbWljU3Rhci5ub2RlKVxuXG4gICAgICAgIGlmIChpc1Nob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlRHluYW1pY1N0YXIuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5fZHluYW1pY1N0YXJUd2VlblxuICAgICAgICAgICAgICAgIC50byhPcGVyYXRpb24uZGl2KERZTkFNSUNfU1RBUl9GQURFX0lOX1RJTUUsIDEwMDApLCB7IG9wYWNpdHk6IDI1NSB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9keW5hbWljU3RhclR3ZWVuID0gY2MudHdlZW4odGhpcy5zcGVEeW5hbWljU3Rhci5ub2RlKVxuICAgICAgICAgICAgICAgIC50byhPcGVyYXRpb24uZGl2KERZTkFNSUNfU1RBUl9GQURFX09VVF9USU1FLCAxMDAwKSwgeyBvcGFjaXR5OiAwIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcER5bmFtaWNTdGFyRmFkZUFuaW0oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9keW5hbWljU3RhclR3ZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9keW5hbWljU3RhclR3ZWVuLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuX2R5bmFtaWNTdGFyVHdlZW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5RHluYW1pY1N0YXJEcm9wQW5pbSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGVEeW5hbWljU3Rhci5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGVEeW5hbWljU3Rhci5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXVzZUR5bmFtaWNTdGFyRHJvcEFuaW0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BlRHluYW1pY1N0YXIucGF1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXlTdGF0aWNTdGFyRmFkZUFuaW0oaXNTaG93OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcFN0YXRpY1N0YXJGYWRlQW5pbSgpO1xuICAgICAgICBpZiAoaXNTaG93KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aWNTdGFyRmFkZVR3ZWVuID0gY2MudHdlZW4odGhpcy5zcGVTdGF0aWNTdGFyLm5vZGUpXG4gICAgICAgICAgICAgICAgLnRvKE9wZXJhdGlvbi5kaXYoU1RBVElDX1NUQVJfRkFERV9JTl9USU1FLCAxMDAwKSwgeyBvcGFjaXR5OiAyNTUgfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpY1N0YXJGYWRlVHdlZW4gPSBjYy50d2Vlbih0aGlzLnNwZVN0YXRpY1N0YXIubm9kZSlcbiAgICAgICAgICAgICAgICAudG8oT3BlcmF0aW9uLmRpdihTVEFUSUNfU1RBUl9GQURFX09VVF9USU1FLCAxMDAwKSwgeyBvcGFjaXR5OiAwIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3BTdGF0aWNTdGFyRmFkZUFuaW0oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0aWNTdGFyRmFkZVR3ZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aWNTdGFyRmFkZVR3ZWVuLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpY1N0YXJGYWRlVHdlZW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5QmdNb3ZlQW5pbSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wQmdNb3ZlQW5pbSgpO1xuICAgICAgICB0aGlzLl9iZ01vdmVUd2VlbiA9IGNjLnR3ZWVuKHRoaXMuaW1nR2FtZUJnLm5vZGUpXG4gICAgICAgICAgICAudG8oT3BlcmF0aW9uLmRpdihCR19NT1ZFX1RJTUUsIDEwMDApLCB7IHk6IE1PVkVfVE9fU0tZX1kgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcEJnTW92ZUFuaW0oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9iZ01vdmVUd2Vlbikge1xuICAgICAgICAgICAgdGhpcy5fYmdNb3ZlVHdlZW4uc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5fYmdNb3ZlVHdlZW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5Um9ja2V0QW5pbSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wUm9ja2V0QW5pbSgpO1xuICAgICAgICB0aGlzLnNldFJvY2tldFdhaXRTdGF0dXMoKTtcbiAgICAgICAgdGhpcy5zdGFydFVwZGF0ZVJvY2tldFJvdGF0ZSgpO1xuICAgICAgICB0aGlzLl9yb2NrZXRCZXppZXJUd2VlbiA9IGNjLnR3ZWVuKHRoaXMubm9kU3RhcnRSb2NrZXQpXG4gICAgICAgICAgICAuYmV6aWVyVG8oT3BlcmF0aW9uLmRpdihST0NLRVRfU1BSSU5UX1RJTUUsIDEwMDApLCBST0NLRVRfQzFfUE9TLCBST0NLRVRfQzJfUE9TLCBST0NLRVRfRU5EX1BPUylcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BVcGRhdGVSb2NrZXRSb3RhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvY2tldEVuZFN0YXR1cygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcFJvY2tldEFuaW0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcFVwZGF0ZVJvY2tldFJvdGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5fcm9ja2V0QmV6aWVyVHdlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3JvY2tldEJlemllclR3ZWVuLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuX3JvY2tldEJlemllclR3ZWVuID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVTdGFydE5vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0Um9ja2V0V2FpdFN0YXR1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEdhbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdEdhbWUoKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jcmFzaERhdGEuc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIE1TVC5DcmFzaFN0YXR1cy5TdGFydEJldDoge1xuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheU11c2ljKENyYXNoLlNPVU5EUy5CR00sIHRoaXMuYnVuZGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRCZygpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kR2FtZUJldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiU3RhcnRUaXBzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYlN0b3BUaXBzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydENvdW50RG93bigpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheVN0YXRpY1N0YXJGYWRlQW5pbSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTVNULkNyYXNoU3RhdHVzLlN0b3BCZXQ6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRHYW1lU3RhcnROb2RlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RHYW1lU3RhcnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTdGF0aWNTdGFyRmFkZUFuaW0odHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1TVC5DcmFzaFN0YXR1cy5HYW1lQmVnaW46IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnN0b3BNdXNpYygpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kR2FtZVN0YXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFJhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlEeW5hbWljU3RhckRyb3BBbmltKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RHluYW1pY1N0YXJGYWRlQW5pbSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvY2tldEVuZFN0YXR1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2FtZUJnU2t5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tc2tUYWlsLm5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fdGFpbE9yaWdpblNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNU1QuQ3Jhc2hTdGF0dXMuR2FtZU92ZXI6IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb21iQW5pbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kR2FtZUVuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiQm9tYlJhdGUuc3RyaW5nID0gXCJAXCIgKyBOdW1iZXJVdGlscy5jb252ZXJUb0ModGhpcy5fY3Jhc2hEYXRhLnJvdW5kQm9tYlJhdGUpICsgXCJ4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZUR5bmFtaWNTdGFyRHJvcEFuaW0oKVxuICAgICAgICAgICAgICAgIHRoaXMucGxheURlc2NlbnRBbmltKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0R2FtZVN0YXJ0Tm9kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hSZWNvcmQoKTogdm9pZCB7XG4gICAgICAgIGxldCByZWNvcmRDb3VudDogbnVtYmVyID0gdGhpcy5fY3Jhc2hEYXRhLnJhdGVSZWNvcmRMaXN0Lmxlbmd0aDtcbiAgICAgICAgbGV0IHNob3dSZWNvcmRMaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBpZiAocmVjb3JkQ291bnQgPD0gdGhpcy5sYXRSZWNvcmQubm9kZS5jaGlsZHJlbkNvdW50KSB7XG4gICAgICAgICAgICBzaG93UmVjb3JkTGlzdCA9IFtdLmNvbmNhdCh0aGlzLl9jcmFzaERhdGEucmF0ZVJlY29yZExpc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd1JlY29yZExpc3QgPSB0aGlzLl9jcmFzaERhdGEucmF0ZVJlY29yZExpc3Quc2xpY2UoLXRoaXMubGF0UmVjb3JkLm5vZGUuY2hpbGRyZW5Db3VudCwgcmVjb3JkQ291bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMubGF0UmVjb3JkLm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGxldCByYXRlOiBudW1iZXIgPSBzaG93UmVjb3JkTGlzdFtpbmRleCsrXTtcbiAgICAgICAgICAgIGxldCBjcmFzaFJlY29yZEl0ZW0gPSB2LmdldENvbXBvbmVudChDcmFzaFJlY29yZEl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAocmF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY3Jhc2hSZWNvcmRJdGVtLmNsZWFyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyYXNoUmVjb3JkSXRlbS5zZXRSYXRlKHJhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN1bWVCZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaEJldEJ1dHRvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEF1dG9CZXRCdXR0b24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsQXV0b0JldC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ0bkF1dG9CZXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5fY3Jhc2hEYXRhLmF1dG9CZXREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmJ0blN1YkF1dG8uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5idG5BZGRBdXRvLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZWRiUm91bmQuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5idG5BZGQxLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5idG5TdWIxLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50Z2dTd2l0Y2hSYXRlQXV0by5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmJ0bkFkZEF1dG8uaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmJ0blN1YkF1dG8uaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVkYkNoYW5nZVJhdGVBdXRvLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZWRiU3RvcFByb2ZpdC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVkYlN0b3BMZXNzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYnRuQ2FuY2VsQXV0b0JldC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ0blN1YkF1dG8uZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJ0bkFkZEF1dG8uZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVkYlJvdW5kLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUm91bmRCdXR0b24oKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFJhdGVCdXR0b24odGhpcy5lZGJDaGFuZ2VSYXRlQXV0byk7XG4gICAgICAgICAgICB0aGlzLnRnZ1N3aXRjaFJhdGVBdXRvLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lZGJDaGFuZ2VSYXRlQXV0by5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZWRiU3RvcFByb2ZpdC5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZWRiU3RvcExlc3MuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJ0bkF1dG9CZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoUm91bmRCdXR0b24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hHYW1lTm8oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiR2FtZU5vLnN0cmluZyA9IGBHYW1lIE5vLiR7dGhpcy5fY3Jhc2hEYXRhLmhhc2hJbmZvLmdhbWVOb31gO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFNlZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiSGFzaDEuc3RyaW5nID0gdGhpcy5fY3Jhc2hEYXRhLmhhc2hJbmZvLnNlcnZlclNlZWQ7XG4gICAgICAgIHRoaXMubGFiU2VlZC5zdHJpbmcgPSB0aGlzLl9jcmFzaERhdGEuaGFzaEluZm8ucHVibGljU2VlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hSb3VuZEhhc2goKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiSGFzaDIuc3RyaW5nID0gdGhpcy5fY3Jhc2hEYXRhLmhhc2hJbmZvLnJvdW5kSGFzaDtcbiAgICAgICAgdGhpcy5sYWJBY2FrLnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKHRoaXMuX2NyYXNoRGF0YS5oYXNoSW5mby5hY2FrLCA1LCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJQb2ludC5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0ModGhpcy5fY3Jhc2hEYXRhLmhhc2hJbmZvLnBvaW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3VtZUJldExpc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaFRvdGFsQ291bnQoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxHb2xkKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEJldFBsYXllcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzdW1lUmF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmFibGVFZGl0Ym94UmF0ZSh0aGlzLmVkYkNoYW5nZVJhdGUsIHRoaXMudGdnU3dpdGNoUmF0ZS5pc0NoZWNrZWQpO1xuICAgICAgICB0aGlzLmVuYWJsZUVkaXRib3hSYXRlKHRoaXMuZWRiQ2hhbmdlUmF0ZUF1dG8sIHRoaXMudGdnU3dpdGNoUmF0ZUF1dG8uaXNDaGVja2VkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3VtZVZpZXcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9jcmFzaERhdGEuc3RhdHVzID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hHYW1lKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFJlY29yZCgpO1xuICAgICAgICB0aGlzLnJlc3VtZUJldCgpO1xuICAgICAgICB0aGlzLnJlc3VtZUJldExpc3QoKTtcbiAgICAgICAgdGhpcy5yZXN1bWVSYXRlKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEF1dG9CZXRCdXR0b24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRCZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRHYW1lQmdNb3VudCgpXG4gICAgICAgIHRoaXMuc3BlU3RhdGljU3Rhci5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLnNwZUR5bmFtaWNTdGFyLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0R2FtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJTdGFydENvdW50RG93bi5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlJhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCb21iUmF0ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlN0YXJ0VGlwcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhYlN0b3BUaXBzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kR2FtZUJldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RHYW1lU3RhcnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kR2FtZUVuZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tc2tUYWlsLm5vZGUuaGVpZ2h0ID0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRSZWNvcmQoKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy5sYXRSZWNvcmQubm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgbGV0IGNyYXNoUmVjb3JkSXRlbSA9IHYuZ2V0Q29tcG9uZW50KENyYXNoUmVjb3JkSXRlbSk7XG4gICAgICAgICAgICBjcmFzaFJlY29yZEl0ZW0uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdE1vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGF0TWFudWFsLm5vZGUuYWN0aXZlID0gdGhpcy50Z2dNYW51YWwuaXNDaGVja2VkO1xuICAgICAgICB0aGlzLmxhdEF1dG8ubm9kZS5hY3RpdmUgPSB0aGlzLnRnZ0F1dG8uaXNDaGVja2VkO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEJldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lZGJCZXRHb2xkLnBsYWNlaG9sZGVyID0gYCR7TUlOX0JFVF9HT0xEfS0ke01BWF9CRVRfR09MRH1gO1xuICAgICAgICB0aGlzLmVkYkJldEdvbGRBdXRvLnBsYWNlaG9sZGVyID0gYCR7TUlOX0JFVF9HT0xEfS0ke01BWF9CRVRfR09MRH1gO1xuICAgICAgICB0aGlzLmJ0bkN1cnJCZXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idG5OZXh0QmV0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UmF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50Z2dTd2l0Y2hSYXRlLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRnZ1N3aXRjaFJhdGVBdXRvLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZUVkaXRib3hSYXRlKHRoaXMuZWRiQ2hhbmdlUmF0ZSwgdGhpcy50Z2dTd2l0Y2hSYXRlLmlzQ2hlY2tlZCk7XG4gICAgICAgIHRoaXMuZW5hYmxlRWRpdGJveFJhdGUodGhpcy5lZGJDaGFuZ2VSYXRlQXV0bywgdGhpcy50Z2dTd2l0Y2hSYXRlQXV0by5pc0NoZWNrZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEJldExpc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiVG90YWxCZXRDb3VudC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcImxhYlRvdGFsQmV0Q291bnRcIiwgMF0sIHRydWUpO1xuICAgICAgICB0aGlzLmxhYlRvdGFsQmV0R29sZC5zdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgdGhpcy5sc3ZCZXRQbGF5ZXIuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEJldEdvbGQoZ29sZDogbnVtYmVyLCBlZGJCZXRHb2xkOiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGxldCBudW1CZXRHb2xkOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAoZWRiQmV0R29sZC5zdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbnVtQmV0R29sZCA9IE51bWJlcihlZGJCZXRHb2xkLnN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWRiQmV0R29sZC5zdHJpbmcgPSBPcGVyYXRpb24uYWRkKGdvbGQsIG51bUJldEdvbGQpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgaWYgKGVkYkJldEdvbGQgPT09IHRoaXMuZWRiQmV0R29sZEF1dG8pIHtcbiAgICAgICAgICAgIHRoaXMub25EaWRFbmRlZEF1dG9CZXRHb2xkKGVkYkJldEdvbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtdWxCZXRHb2xkKGdvbGQ6IG51bWJlciwgZWRiQmV0R29sZDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgbnVtQmV0R29sZDogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKGVkYkJldEdvbGQuc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG51bUJldEdvbGQgPSBOdW1iZXIoZWRiQmV0R29sZC5zdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVkYkJldEdvbGQuc3RyaW5nID0gTWF0aC5mbG9vcihPcGVyYXRpb24ubXVsKGdvbGQsIG51bUJldEdvbGQpKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RWRpdGJveEJldEdvbGQoZWRiQmV0R29sZDogY2MuRWRpdEJveCk6IG51bWJlciB7XG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSBlZGJCZXRHb2xkLnN0cmluZztcbiAgICAgICAgbGV0IG51bUJldEdvbGQ6IG51bWJlciA9IDA7XG4gICAgICAgIGlmIChjb250ZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG51bUJldEdvbGQgPSBOdW1iZXIoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bUJldEdvbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRSYXRlKHJhdGU6IG51bWJlciwgZWRiQ2hhbmdlUmF0ZTogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgbnVtUmF0ZTogbnVtYmVyID0gdGhpcy5nZXRFZGl0Ym94UmF0ZShlZGJDaGFuZ2VSYXRlKTtcbiAgICAgICAgbnVtUmF0ZSA9IE9wZXJhdGlvbi5hZGQobnVtUmF0ZSwgcmF0ZSk7XG4gICAgICAgIGlmIChudW1SYXRlID49IE1BWF9SQVRFKSB7XG4gICAgICAgICAgICBudW1SYXRlID0gTUFYX1JBVEU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bVJhdGUgPCBNSU5fUkFURSkge1xuICAgICAgICAgICAgbnVtUmF0ZSA9IE1JTl9SQVRFO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RWRpdGJveFJhdGUobnVtUmF0ZSwgZWRiQ2hhbmdlUmF0ZSk7XG4gICAgICAgIHRoaXMucmVmcmVzaFJhdGVCdXR0b24oZWRiQ2hhbmdlUmF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJSYXRlKHJhdGU6IG51bWJlciwgZWRiQ2hhbmdlUmF0ZTogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgbnVtUmF0ZTogbnVtYmVyID0gdGhpcy5nZXRFZGl0Ym94UmF0ZShlZGJDaGFuZ2VSYXRlKTtcbiAgICAgICAgbnVtUmF0ZSA9IE9wZXJhdGlvbi5zdWIobnVtUmF0ZSwgcmF0ZSk7XG4gICAgICAgIGlmIChudW1SYXRlIDw9IE1JTl9SQVRFKSB7XG4gICAgICAgICAgICBudW1SYXRlID0gTUlOX1JBVEU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRFZGl0Ym94UmF0ZShudW1SYXRlLCBlZGJDaGFuZ2VSYXRlKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUmF0ZUJ1dHRvbihlZGJDaGFuZ2VSYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFJvdW5kKHJvdW5kOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IG51bVJvdW5kOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hSb3VuZCgpO1xuICAgICAgICBudW1Sb3VuZCA9IE9wZXJhdGlvbi5hZGQobnVtUm91bmQsIHJvdW5kKTtcbiAgICAgICAgaWYgKG51bVJvdW5kID49IE1BWF9ST1VORCkge1xuICAgICAgICAgICAgbnVtUm91bmQgPSBNQVhfUk9VTkQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bVJvdW5kIDwgTUlOX1JPVU5EKSB7XG4gICAgICAgICAgICBudW1Sb3VuZCA9IE1JTl9ST1VORDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEVkaXRib3hSb3VuZChudW1Sb3VuZCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFJvdW5kQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJSb3VuZChyb3VuZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBudW1Sb3VuZDogbnVtYmVyID0gdGhpcy5nZXRFZGl0Ym94Um91bmQoKTtcbiAgICAgICAgbnVtUm91bmQgPSBPcGVyYXRpb24uc3ViKG51bVJvdW5kLCByb3VuZCk7XG4gICAgICAgIGlmIChudW1Sb3VuZCA8PSBNSU5fUk9VTkQpIHtcbiAgICAgICAgICAgIG51bVJvdW5kID0gTUlOX1JPVU5EO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RWRpdGJveFJvdW5kKG51bVJvdW5kKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUm91bmRCdXR0b24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVuYWJsZUVkaXRib3hSYXRlKGVkYkNoYW5nZVJhdGU6IGNjLkVkaXRCb3gsIGlzRW5hYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGVkYkNoYW5nZVJhdGUuZW5hYmxlZCA9IGlzRW5hYmxlO1xuICAgICAgICBsZXQgbm9kQ29udGVudDogY2MuTm9kZSA9IGVkYkNoYW5nZVJhdGUubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlRFWFRfTEFCRUxcIik7XG4gICAgICAgIGxldCBub2RQbGFjZWhvbGRlcjogY2MuTm9kZSA9IGVkYkNoYW5nZVJhdGUubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBMQUNFSE9MREVSX0xBQkVMXCIpO1xuICAgICAgICBpZiAoaXNFbmFibGUpIHtcbiAgICAgICAgICAgIG5vZENvbnRlbnQuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLkVuYWJsZVJhdGUuRU5BQkxFO1xuICAgICAgICAgICAgbm9kUGxhY2Vob2xkZXIuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLkVuYWJsZVJhdGUuRU5BQkxFO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kQ29udGVudC5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuRW5hYmxlUmF0ZS5ESVNBQkxFO1xuICAgICAgICAgICAgbm9kUGxhY2Vob2xkZXIuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLkVuYWJsZVJhdGUuRElTQUJMRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0R2FtZUJnU2t5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmltZ0dhbWVCZy5ub2RlLnkgPSBNT1ZFX1RPX1NLWV9ZO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0R2FtZUJnTW91bnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1nR2FtZUJnLm5vZGUueSA9IE1PVkVfVE9fTU9VTlRfWTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEVkaXRib3hSYXRlKHJhdGU6IG51bWJlciwgZWRiQ2hhbmdlUmF0ZTogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBlZGJDaGFuZ2VSYXRlLnN0cmluZyA9IHJhdGUudG9TdHJpbmcoKSArIFwieFwiO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RWRpdGJveFJhdGUoZWRiQ2hhbmdlUmF0ZTogY2MuRWRpdEJveCk6IG51bWJlciB7XG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSBlZGJDaGFuZ2VSYXRlLnN0cmluZztcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgveC9nLCBcIlwiKTtcblxuICAgICAgICBsZXQgbnVtUmF0ZTogbnVtYmVyID0gMDtcblxuICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBudW1SYXRlID0gTnVtYmVyKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bVJhdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRFZGl0Ym94Um91bmQocm91bmQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmVkYlJvdW5kLnN0cmluZyA9IHJvdW5kLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRFZGl0Ym94U3RvcFByb2ZpdCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWRiU3RvcFByb2ZpdC5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RWRpdGJveFN0b3BMb3NzKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lZGJTdG9wTGVzcy5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RWRpdGJveFJvdW5kKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSB0aGlzLmVkYlJvdW5kLnN0cmluZztcblxuICAgICAgICBsZXQgbnVtUm91bmQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbnVtUm91bmQgPSBOdW1iZXIoY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtUm91bmQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFZGl0Ym94UHJvZml0KCk6IG51bWJlciB7XG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSB0aGlzLmVkYlN0b3BQcm9maXQuc3RyaW5nO1xuXG4gICAgICAgIGxldCBudW1Qcm9maXQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbnVtUHJvZml0ID0gTnVtYmVyKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bVByb2ZpdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEVkaXRib3hMb3NzKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSB0aGlzLmVkYlN0b3BMZXNzLnN0cmluZztcblxuICAgICAgICBsZXQgbnVtTG9zczogbnVtYmVyID0gMDtcblxuICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBudW1Mb3NzID0gTnVtYmVyKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bUxvc3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoUmF0ZUJ1dHRvbihlZGJDaGFuZ2VSYXRlOiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGxldCBidG5TdWI6IGNjLkJ1dHRvbiA9IG51bGw7XG4gICAgICAgIGxldCBidG5BZGQ6IGNjLkJ1dHRvbiA9IG51bGw7XG4gICAgICAgIGxldCB0Z2dTd2l0Y2hSYXRlOiBjYy5Ub2dnbGUgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGVkYkNoYW5nZVJhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5lZGJDaGFuZ2VSYXRlOiB7XG4gICAgICAgICAgICAgICAgYnRuU3ViID0gdGhpcy5idG5TdWI7XG4gICAgICAgICAgICAgICAgYnRuQWRkID0gdGhpcy5idG5BZGQ7XG4gICAgICAgICAgICAgICAgdGdnU3dpdGNoUmF0ZSA9IHRoaXMudGdnU3dpdGNoUmF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy5lZGJDaGFuZ2VSYXRlQXV0bzoge1xuICAgICAgICAgICAgICAgIGJ0blN1YiA9IHRoaXMuYnRuU3ViQXV0bztcbiAgICAgICAgICAgICAgICBidG5BZGQgPSB0aGlzLmJ0bkFkZEF1dG87XG4gICAgICAgICAgICAgICAgdGdnU3dpdGNoUmF0ZSA9IHRoaXMudGdnU3dpdGNoUmF0ZUF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBidG5TdWIuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIGJ0bkFkZC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0Z2dTd2l0Y2hSYXRlLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG51bVJhdGU6IG51bWJlciA9IHRoaXMuZ2V0RWRpdGJveFJhdGUoZWRiQ2hhbmdlUmF0ZSk7XG5cbiAgICAgICAgaWYgKG51bVJhdGUgPiBNSU5fUkFURSkge1xuICAgICAgICAgICAgYnRuU3ViLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bVJhdGUgPCBNQVhfUkFURSkge1xuICAgICAgICAgICAgYnRuQWRkLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hSb3VuZEJ1dHRvbigpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJ0blN1YjogY2MuQnV0dG9uID0gdGhpcy5idG5TdWIxO1xuICAgICAgICBsZXQgYnRuQWRkOiBjYy5CdXR0b24gPSB0aGlzLmJ0bkFkZDE7XG5cbiAgICAgICAgYnRuU3ViLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICBidG5BZGQuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IG51bVJvdW5kOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hSb3VuZCgpO1xuXG4gICAgICAgIGlmIChudW1Sb3VuZCA8PSBNSU5fUk9VTkQpIHtcbiAgICAgICAgICAgIGJ0bkFkZC5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG51bVJvdW5kID49IE1BWF9ST1VORCkge1xuICAgICAgICAgICAgYnRuU3ViLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidG5BZGQuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJ0blN1Yi5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoQmV0QnV0dG9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ0bkN1cnJCZXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idG5OZXh0QmV0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fY3Jhc2hEYXRhLnN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSBNU1QuQ3Jhc2hTdGF0dXMuU3RhcnRCZXQ6XG4gICAgICAgICAgICAgICAgdGhpcy5idG5DdXJyQmV0LmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5DdXJyQmV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTVNULkNyYXNoU3RhdHVzLlN0b3BCZXQ6XG4gICAgICAgICAgICAgICAgdGhpcy5idG5DdXJyQmV0LmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuQ3VyckJldC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1TVC5DcmFzaFN0YXR1cy5HYW1lQmVnaW46XG4gICAgICAgICAgICBjYXNlIE1TVC5DcmFzaFN0YXR1cy5HYW1lT3ZlcjpcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk5leHRCZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkN1cnJCZXQuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5DdXJyQmV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFRvdGFsQ291bnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiVG90YWxCZXRDb3VudC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcImxhYlRvdGFsQmV0Q291bnRcIiwgdGhpcy5fY3Jhc2hEYXRhLmJldFRvdGFsQ291bnRdLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hUb3RhbEdvbGQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiVG90YWxCZXRHb2xkLnN0cmluZyA9IE51bWJlclV0aWxzLmNvbnZlclRvQyh0aGlzLl9jcmFzaERhdGEuYmV0VG90YWxHb2xkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hCZXRQbGF5ZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIGxldCBiZXRQbGF5ZXJMaXN0OiBDcmFzaEludGVyZmFjZS5CZXRQbGF5ZXJbXSA9IFtdO1xuICAgICAgICAvLyBiZXRQbGF5ZXJMaXN0ID0gYmV0UGxheWVyTGlzdC5jb25jYXQodGhpcy5fY3Jhc2hEYXRhLm15QmV0TGlzdC5yZXZlcnNlKCkpO1xuICAgICAgICAvLyBiZXRQbGF5ZXJMaXN0ID0gYmV0UGxheWVyTGlzdC5jb25jYXQodGhpcy5fY3Jhc2hEYXRhLmJldExpc3QucmV2ZXJzZSgpKTtcbiAgICAgICAgdGhpcy5sc3ZCZXRQbGF5ZXIuc2V0KEFycmF5LmZyb20odGhpcy5fY3Jhc2hEYXRhLmJldFBsYXllck1hcC52YWx1ZXMoKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xpY2tJbmRpY2F0b3IodGFyZ2V0Tm9kZTogY2MuTm9kZSwgbWFrZUxhbmd1YWdlOiAoc3RyaW5nIHwgbnVtYmVyKVtdIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCB3b3JsZFBvczogY2MuVmVjMiA9IHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgbGV0IGxvY2FsUG9zOiBjYy5WZWMyID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcblxuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogSW5kaWNhdG9yVmlldywgYnVuZGxlOiB0aGlzLmJ1bmRsZSwgYXJnczogW2xvY2FsUG9zLCBtYWtlTGFuZ3VhZ2VdIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja1N3aXRjaFJhdGUodGFyZ2V0OiBjYy5Ub2dnbGUpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy50Z2dTd2l0Y2hSYXRlOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVFZGl0Ym94UmF0ZSh0aGlzLmVkYkNoYW5nZVJhdGUsIHRhcmdldC5pc0NoZWNrZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFJhdGVCdXR0b24odGhpcy5lZGJDaGFuZ2VSYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50Z2dTd2l0Y2hSYXRlQXV0bzoge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlRWRpdGJveFJhdGUodGhpcy5lZGJDaGFuZ2VSYXRlQXV0bywgdGFyZ2V0LmlzQ2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoUmF0ZUJ1dHRvbih0aGlzLmVkYkNoYW5nZVJhdGVBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja0JldE1vZGUodGFyZ2V0OiBjYy5Ub2dnbGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYXRNYW51YWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYXRBdXRvLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGFiTWFudWFsLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLkJldE1vZGUuVU5fU0VMRUN0O1xuICAgICAgICB0aGlzLmxhYkF1dG8ubm9kZS5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuQmV0TW9kZS5VTl9TRUxFQ3Q7XG4gICAgICAgIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudGdnTWFudWFsOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXRNYW51YWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiTWFudWFsLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLkJldE1vZGUuU0VMRUNURUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudGdnQXV0bzoge1xuICAgICAgICAgICAgICAgIHRoaXMubGF0QXV0by5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJBdXRvLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLkJldE1vZGUuU0VMRUNURUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQmVnaW5CZXRSYXRlKGVkYjogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgY29udGVudDogc3RyaW5nID0gZWRiLnN0cmluZztcbiAgICAgICAgaWYgKGNvbnRlbnQgPT09IFwieFwiKSB7XG4gICAgICAgICAgICBlZGIuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBudW1SYXRlOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hSYXRlKGVkYik7XG4gICAgICAgIGVkYi5zdHJpbmcgPSBudW1SYXRlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZVJvdW5kKGNvbnRlbnQ6IHN0cmluZywgZWRiOiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGxldCBhcnJDb250ZW50OiBzdHJpbmdbXSA9IGNvbnRlbnQuc3BsaXQoJycpO1xuICAgICAgICBmb3IgKGxldCBpID0gYXJyQ29udGVudC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgbGV0IHJlZzogUmVnRXhwID0gL1swLTldL2c7XG4gICAgICAgICAgICBpZiAoIXJlZy50ZXN0KGFyckNvbnRlbnRbaV0pKSB7XG4gICAgICAgICAgICAgICAgYXJyQ29udGVudC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGVnYWxDb250ZW50OiBzdHJpbmcgPSBhcnJDb250ZW50LmpvaW4oXCIsXCIpLnJlcGxhY2UoLywvZywgXCJcIik7XG4gICAgICAgIGxldCBudW1Db250ZW50OiBudW1iZXIgPSBOdW1iZXIobGVnYWxDb250ZW50KTtcblxuICAgICAgICBpZiAobnVtQ29udGVudCA8IE1JTl9ST1VORCkge1xuICAgICAgICAgICAgY29udGVudCA9IE1JTl9ST1VORC50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKG51bUNvbnRlbnQgPiBNQVhfUk9VTkQpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBNQVhfUk9VTkQudG9TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBudW1Db250ZW50LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWRiLnN0cmluZyA9IGNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoUm91bmRCdXR0b24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlQmV0UmF0ZShjb250ZW50OiBzdHJpbmcsIGVkYjogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgYXJyQ29udGVudDogc3RyaW5nW10gPSBjb250ZW50LnNwbGl0KCcnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyckNvbnRlbnQubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCByZWc6IFJlZ0V4cCA9IC9bMC05Ll0vZztcbiAgICAgICAgICAgIGlmICghcmVnLnRlc3QoYXJyQ29udGVudFtpXSkpIHtcbiAgICAgICAgICAgICAgICBhcnJDb250ZW50LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZWdhbENvbnRlbnQ6IHN0cmluZyA9IGFyckNvbnRlbnQuam9pbihcIixcIikucmVwbGFjZSgvLC9nLCBcIlwiKTtcbiAgICAgICAgbGV0IG51bUNvbnRlbnQ6IG51bWJlciA9IE51bWJlcihsZWdhbENvbnRlbnQpO1xuXG4gICAgICAgIGlmIChpc05hTihudW1Db250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobnVtQ29udGVudCAlIDEgIT09IDApIHtcbiAgICAgICAgICAgICAgICBudW1Db250ZW50ID0gVXRpbE1nci50b0ZpeGVkKG51bUNvbnRlbnQsIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGVudCA9IG51bUNvbnRlbnQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBlZGIuc3RyaW5nID0gY29udGVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRW5kQmV0UmF0ZShlZGI6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbnRlbnQ6IHN0cmluZyA9IGVkYi5zdHJpbmc7XG4gICAgICAgIGlmIChjb250ZW50Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICBlZGIuc3RyaW5nID0gXCJ4XCI7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbnVtUmF0ZTogbnVtYmVyID0gTnVtYmVyKGNvbnRlbnQpO1xuXG4gICAgICAgIGlmIChudW1SYXRlID49IE1BWF9SQVRFKSB7XG4gICAgICAgICAgICBudW1SYXRlID0gTUFYX1JBVEU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bVJhdGUgPCBNSU5fUkFURSkge1xuICAgICAgICAgICAgbnVtUmF0ZSA9IE1JTl9SQVRFO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RWRpdGJveFJhdGUobnVtUmF0ZSwgZWRiKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUmF0ZUJ1dHRvbihlZGIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFuZ2VkQmV0R29sZChjb250ZW50OiBzdHJpbmcsIGVkYjogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgYXJyQ29udGVudDogc3RyaW5nW10gPSBjb250ZW50LnNwbGl0KCcnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyckNvbnRlbnQubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCByZWc6IFJlZ0V4cCA9IC9bMC05XS9nO1xuICAgICAgICAgICAgaWYgKCFyZWcudGVzdChhcnJDb250ZW50W2ldKSkge1xuICAgICAgICAgICAgICAgIGFyckNvbnRlbnQuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlZ2FsQ29udGVudDogc3RyaW5nID0gYXJyQ29udGVudC5qb2luKFwiLFwiKS5yZXBsYWNlKC8sL2csIFwiXCIpO1xuICAgICAgICBsZXQgbnVtQ29udGVudDogbnVtYmVyID0gTnVtYmVyKGxlZ2FsQ29udGVudCk7XG5cbiAgICAgICAgaWYgKG51bUNvbnRlbnQgPD0gMCkge1xuICAgICAgICAgICAgY29udGVudCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50ID0gbnVtQ29udGVudC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVkYi5zdHJpbmcgPSBjb250ZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgb25EaWRFbmRlZEF1dG9CZXRHb2xkKGVkYjogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgc3RvcFByb2ZpdEdvbGQ6IG51bWJlciA9IHRoaXMuZ2V0RWRpdGJveFByb2ZpdCgpO1xuICAgICAgICBsZXQgc3RvcExvc3NHb2xkOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hMb3NzKCk7XG5cbiAgICAgICAgbGV0IGJldEdvbGQ6IG51bWJlciA9IHRoaXMuZ2V0RWRpdGJveEJldEdvbGQoZWRiKTtcbiAgICAgICAgLy8gaWYgKHN0b3BQcm9maXRHb2xkIDwgYmV0R29sZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5zZXRFZGl0Ym94U3RvcFByb2ZpdChiZXRHb2xkKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAoc3RvcExvc3NHb2xkIDwgYmV0R29sZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRFZGl0Ym94U3RvcExvc3MoYmV0R29sZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlZFByb2ZpdEdvbGQoY29udGVudDogc3RyaW5nLCBlZGI6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFyckNvbnRlbnQ6IHN0cmluZ1tdID0gY29udGVudC5zcGxpdCgnJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcnJDb250ZW50Lmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBsZXQgcmVnOiBSZWdFeHAgPSAvWzAtOV0vZztcbiAgICAgICAgICAgIGlmICghcmVnLnRlc3QoYXJyQ29udGVudFtpXSkpIHtcbiAgICAgICAgICAgICAgICBhcnJDb250ZW50LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiZXRHb2xkOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hCZXRHb2xkKHRoaXMuZWRiQmV0R29sZEF1dG8pO1xuXG4gICAgICAgIGxldCBsZWdhbENvbnRlbnQ6IHN0cmluZyA9IGFyckNvbnRlbnQuam9pbihcIixcIikucmVwbGFjZSgvLC9nLCBcIlwiKTtcbiAgICAgICAgbGV0IG51bUNvbnRlbnQ6IG51bWJlciA9IE51bWJlcihsZWdhbENvbnRlbnQpO1xuXG4gICAgICAgIGxldCBtaW5CZXRHb2xkOiBudW1iZXIgPSBNYXRoLmZsb29yKE9wZXJhdGlvbi5tdWwoTUlOX0JFVF9HT0xELCAoTUlOX1JBVEUgLSAxKSkpO1xuXG4gICAgICAgIGlmIChudW1Db250ZW50IDw9IG1pbkJldEdvbGQpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBtaW5CZXRHb2xkLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50ID0gbnVtQ29udGVudC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVkYi5zdHJpbmcgPSBjb250ZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFuZ2VkTG9zc0dvbGQoY29udGVudDogc3RyaW5nLCBlZGI6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFyckNvbnRlbnQ6IHN0cmluZ1tdID0gY29udGVudC5zcGxpdCgnJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcnJDb250ZW50Lmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBsZXQgcmVnOiBSZWdFeHAgPSAvWzAtOV0vZztcbiAgICAgICAgICAgIGlmICghcmVnLnRlc3QoYXJyQ29udGVudFtpXSkpIHtcbiAgICAgICAgICAgICAgICBhcnJDb250ZW50LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiZXRHb2xkOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hCZXRHb2xkKHRoaXMuZWRiQmV0R29sZEF1dG8pO1xuXG4gICAgICAgIGxldCBsZWdhbENvbnRlbnQ6IHN0cmluZyA9IGFyckNvbnRlbnQuam9pbihcIixcIikucmVwbGFjZSgvLC9nLCBcIlwiKTtcbiAgICAgICAgbGV0IG51bUNvbnRlbnQ6IG51bWJlciA9IE51bWJlcihsZWdhbENvbnRlbnQpO1xuXG4gICAgICAgIGxldCBtaW5CZXRHb2xkOiBudW1iZXIgPSBNSU5fQkVUX0dPTEQ7XG4gICAgICAgIGlmIChiZXRHb2xkID4gTUlOX0JFVF9HT0xEKSB7XG4gICAgICAgICAgICBtaW5CZXRHb2xkID0gYmV0R29sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW1Db250ZW50IDw9IG1pbkJldEdvbGQpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBtaW5CZXRHb2xkLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50ID0gbnVtQ29udGVudC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVkYi5zdHJpbmcgPSBjb250ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyByZXFFbnRlckxvYmJ5KCk6IHZvaWQge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyTV9UcmFuc2Zlck1hcF9SZXEuY3JlYXRlKHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIFJvb21OYW1lOiBDb25maWcuR2FtZUlkLkxvYmJ5LFxuICAgICAgICB9KVxuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTV9UcmFuc2Zlck1hcF9SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMk1fVHJhbnNmZXJNYXBfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfTWFwLkMyTV9UcmFuc2Zlck1hcF9SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb0JvbWIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pc0JvbWIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIuc3RvcEVmZmVjdEJ5UGF0aChDcmFzaC5TT1VORFMuUk9DS0VUX0ZMWSk7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChDcmFzaC5TT1VORFMuUk9DS0VUX0JPTUIsIHRoaXMuYnVuZGxlKTtcblxuICAgICAgICBsZXQgY3Jhc2hEYXRhOiBDcmFzaERhdGEgPSBHLkRhdGFNZ3IuZ2V0KENyYXNoRGF0YSk7XG4gICAgICAgIGNyYXNoRGF0YS5zdGF0dXMgPSBNU1QuQ3Jhc2hTdGF0dXMuR2FtZU92ZXI7XG5cbiAgICAgICAgdGhpcy5faXNCb21iID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmV0QnV0dG9uKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEdhbWUoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUm91bmRIYXNoKCk7XG4gICAgICAgIHRoaXMuc3RvcFJvY2tldEFuaW0oKTtcbiAgICAgICAgdGhpcy5zdG9wQmdNb3ZlQW5pbSgpO1xuICAgICAgICB0aGlzLnN0b3BSYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogc3RyaW5nLCBCdXR0b25Ob2RlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnJlcUVudGVyTG9iYnkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5CZXQwXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCZXRHb2xkKENyYXNoQ29uZmlnLkJldEdvbGRCdXR0b25bMF0sIHRoaXMuZWRiQmV0R29sZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmV0QXV0bzBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJldEdvbGQoQ3Jhc2hDb25maWcuQmV0R29sZEJ1dHRvblswXSwgdGhpcy5lZGJCZXRHb2xkQXV0byk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmV0MVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQmV0R29sZChDcmFzaENvbmZpZy5CZXRHb2xkQnV0dG9uWzFdLCB0aGlzLmVkYkJldEdvbGQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkJldEF1dG8xXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCZXRHb2xkKENyYXNoQ29uZmlnLkJldEdvbGRCdXR0b25bMV0sIHRoaXMuZWRiQmV0R29sZEF1dG8pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkJldDJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJldEdvbGQoQ3Jhc2hDb25maWcuQmV0R29sZEJ1dHRvblsyXSwgdGhpcy5lZGJCZXRHb2xkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5CZXRBdXRvMlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQmV0R29sZChDcmFzaENvbmZpZy5CZXRHb2xkQnV0dG9uWzJdLCB0aGlzLmVkYkJldEdvbGRBdXRvKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5CZXQzXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5tdWxCZXRHb2xkKENyYXNoQ29uZmlnLkJldEdvbGRCdXR0b25bM10sIHRoaXMuZWRiQmV0R29sZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmV0QXV0bzNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm11bEJldEdvbGQoQ3Jhc2hDb25maWcuQmV0R29sZEJ1dHRvblszXSwgdGhpcy5lZGJCZXRHb2xkQXV0byk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmV0NFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubXVsQmV0R29sZChDcmFzaENvbmZpZy5CZXRHb2xkQnV0dG9uWzRdLCB0aGlzLmVkYkJldEdvbGQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkJldEF1dG80XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5tdWxCZXRHb2xkKENyYXNoQ29uZmlnLkJldEdvbGRCdXR0b25bNF0sIHRoaXMuZWRiQmV0R29sZEF1dG8pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0blN1YlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ViUmF0ZSgxLCB0aGlzLmVkYkNoYW5nZVJhdGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0blN1YkF1dG9cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlJhdGUoMSwgdGhpcy5lZGJDaGFuZ2VSYXRlQXV0byk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQWRkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSYXRlKDEsIHRoaXMuZWRiQ2hhbmdlUmF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQWRkQXV0b1wiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUmF0ZSgxLCB0aGlzLmVkYkNoYW5nZVJhdGVBdXRvKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5BZGQxXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb3VuZCgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5TdWIxXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJSb3VuZCgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5OZXh0QmV0XCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ3VyckJldFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuQzJNX015Q3Jhc2hCZXRfUmVxKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ29weU5vXCI6XG4gICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5jb3B5VG9DbGlwKHBhcnNlSW50KFwiRkZGRkZGXCIsIDE2KS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5SZWNvcmRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5Xb3JsZFJlY29yZFwiOlxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBDcmFzaFRvdGFsUmVjb3JkVmlldywgYnVuZGxlOiB0aGlzLmJ1bmRsZSB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkF1dG9CZXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLkMyTV9NeUNyYXNoQXV0b0JldF9SZXEoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5DYW5jZWxBdXRvQmV0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5DMk1fQ3Jhc2hDYW5jZWxBdXRvQmV0X1JlcSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bk15UmVjb3JkXCI6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IENyYXNoTXlSZWNvcmRWaWV3LCBidW5kbGU6IHRoaXMuYnVuZGxlIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuU3RvcFByb2ZpdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tJbmRpY2F0b3IoQnV0dG9uTm9kZSwgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJzdG9wUHJvZml0SW52ZGljYXRvclwiLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuU3RvcExvc3NcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSW5kaWNhdG9yKEJ1dHRvbk5vZGUsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwic3RvcExvc3NJbnZkaWNhdG9yXCIsIHRydWUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgQzJNX0dldENyYXNoSW5mb19SZXEoKTogdm9pZCB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJNX0dldENyYXNoSW5mb19SZXEuY3JlYXRlKHsgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTV9HZXRDcmFzaEluZm9fUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJNX0dldENyYXNoSW5mb19SZXEsIE1TVC5PdXRlck9wY29kZV9DcmFzaEdhbWUuQzJNX0dldENyYXNoSW5mb19SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDMk1fTXlDcmFzaEJldF9SZXEoKTogdm9pZCB7XG4gICAgICAgIGxldCBiZXRHb2xkOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hCZXRHb2xkKHRoaXMuZWRiQmV0R29sZCk7XG4gICAgICAgIGlmIChiZXRHb2xkIDwgTUlOX0JFVF9HT0xEIHx8IGJldEdvbGQgPiBNQVhfQkVUX0dPTEQpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcIklucHV0QmV0R29sZFwiLCBNSU5fQkVUX0dPTEQsIE1BWF9CRVRfR09MRF0sIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy50Z2dTd2l0Y2hSYXRlLmlzQ2hlY2tlZCB8fFxuICAgICAgICAgICAgKHRoaXMudGdnU3dpdGNoUmF0ZS5pc0NoZWNrZWQgJiYgKHRoaXMuZ2V0RWRpdGJveFJhdGUodGhpcy5lZGJDaGFuZ2VSYXRlKSA8IE1JTl9SQVRFIHx8IHRoaXMuZ2V0RWRpdGJveFJhdGUodGhpcy5lZGJDaGFuZ2VSYXRlKSA+IE1BWF9SQVRFKSkpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiSW5wdXRSYXRlXCIsIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJNX015Q3Jhc2hCZXRfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBCZXRNb2RlOiBNU1QuQ3Jhc2hNb2RlLk1hbnVhbCxcbiAgICAgICAgICAgIEJldEdvbGQ6IE51bWJlclV0aWxzLmNvbnZlclRvUyhiZXRHb2xkKSxcbiAgICAgICAgICAgIEJldE11bHRpcGxlOiBOdW1iZXJVdGlscy5jb252ZXJUb1ModGhpcy5nZXRFZGl0Ym94UmF0ZSh0aGlzLmVkYkNoYW5nZVJhdGUpKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX015Q3Jhc2hCZXRfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJNX015Q3Jhc2hCZXRfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfQ3Jhc2hHYW1lLkMyTV9NeUNyYXNoQmV0X1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIEMyTV9NeUNyYXNoQXV0b0JldF9SZXEoKTogdm9pZCB7XG4gICAgICAgIGxldCBiZXRHb2xkOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hCZXRHb2xkKHRoaXMuZWRiQmV0R29sZEF1dG8pO1xuICAgICAgICBpZiAoYmV0R29sZCA8IE1JTl9CRVRfR09MRCB8fCBiZXRHb2xkID4gTUFYX0JFVF9HT0xEKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChNYW5hZ2VyLm1ha2VMYW5ndWFnZShbXCJJbnB1dEJldEdvbGRcIiwgTUlOX0JFVF9HT0xELCBNQVhfQkVUX0dPTERdLCB0cnVlKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudGdnU3dpdGNoUmF0ZUF1dG8uaXNDaGVja2VkIHx8XG4gICAgICAgICAgICAodGhpcy50Z2dTd2l0Y2hSYXRlQXV0by5pc0NoZWNrZWQgJiYgKHRoaXMuZ2V0RWRpdGJveFJhdGUodGhpcy5lZGJDaGFuZ2VSYXRlQXV0bykgPCBNSU5fUkFURSB8fCB0aGlzLmdldEVkaXRib3hSYXRlKHRoaXMuZWRiQ2hhbmdlUmF0ZUF1dG8pID4gTUFYX1JBVEUpKSkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJJbnB1dFJhdGVcIiwgdHJ1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJvdW5kOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hSb3VuZCgpO1xuICAgICAgICBpZiAocm91bmQgPD0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJJbnB1dFJvdW5kXCIsIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9maXQ6IG51bWJlciA9IHRoaXMuZ2V0RWRpdGJveFByb2ZpdCgpO1xuICAgICAgICBpZiAocHJvZml0IDw9IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiSW5wdXRQcm9maXRcIiwgdHJ1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvc3M6IG51bWJlciA9IHRoaXMuZ2V0RWRpdGJveExvc3MoKTtcbiAgICAgICAgaWYgKGxvc3MgPD0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJJbnB1dExvc3NcIiwgdHJ1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYXV0b0JldFJlcURhdGEgPSB7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBCZXRNb2RlOiBNU1QuQ3Jhc2hNb2RlLkF1dG8sXG4gICAgICAgICAgICBCZXRHb2xkOiBOdW1iZXJVdGlscy5jb252ZXJUb1MoYmV0R29sZCksXG4gICAgICAgICAgICBCZXRNdWx0aXBsZTogTnVtYmVyVXRpbHMuY29udmVyVG9TKHRoaXMuZ2V0RWRpdGJveFJhdGUodGhpcy5lZGJDaGFuZ2VSYXRlQXV0bykpLFxuICAgICAgICAgICAgQXV0b1JvdW5kOiByb3VuZCxcbiAgICAgICAgICAgIFN0b3BQcm9maXQ6IE51bWJlclV0aWxzLmNvbnZlclRvUyhwcm9maXQpLFxuICAgICAgICAgICAgU3RvcExvc3M6IE51bWJlclV0aWxzLmNvbnZlclRvUyhsb3NzKSxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJNX015Q3Jhc2hCZXRfUmVxLmNyZWF0ZSh0aGlzLl9hdXRvQmV0UmVxRGF0YSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX015Q3Jhc2hCZXRfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJNX015Q3Jhc2hCZXRfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfQ3Jhc2hHYW1lLkMyTV9NeUNyYXNoQmV0X1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIEMyTV9DcmFzaENhbmNlbEF1dG9CZXRfUmVxKCk6IHZvaWQge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyTV9DcmFzaENhbmNlbEF1dG9CZXRfUmVxLmNyZWF0ZSh7fSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX0NyYXNoQ2FuY2VsQXV0b0JldF9SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKE1TVC5DMk1fQ3Jhc2hDYW5jZWxBdXRvQmV0X1JlcSwgTVNULk91dGVyT3Bjb2RlX0NyYXNoR2FtZS5DMk1fQ3Jhc2hDYW5jZWxBdXRvQmV0X1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRfTTJDX0dldENyYXNoSW5mb19SZXMoZGF0YTogTVNULklNMkNfR2V0Q3Jhc2hJbmZvX1Jlcyk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZnJlc2hHYW1lTm8oKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2VlZCgpO1xuICAgICAgICB0aGlzLnJlc3VtZVZpZXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRfTTJDX0NyYXNoU3RhcnRfbWVzKGRhdGE6IE1TVC5JTTJDX0NyYXNoU3RhcnRfbWVzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIuc3RvcE11c2ljKCk7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChDcmFzaC5TT1VORFMuUk9DS0VUX0ZMWSwgdGhpcy5idW5kbGUpO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaEJldEJ1dHRvbigpO1xuICAgICAgICB0aGlzLmluaXRHYW1lKCk7XG4gICAgICAgIHRoaXMubm9kR2FtZVN0YXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucGxheUR5bmFtaWNTdGFyRHJvcEFuaW0oKTtcblxuICAgICAgICBpZiAoZGF0YS5NdWx0aSA8PSBNSU5fUkFURV9SRVRVUk4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGxheVN0YXRpY1N0YXJGYWRlQW5pbShmYWxzZSk7XG4gICAgICAgIHRoaXMucGxheUR5bmFtaWNTdGFyRmFkZUFuaW0odHJ1ZSk7XG4gICAgICAgIHRoaXMucGxheVJvY2tldEFuaW0oKTtcbiAgICAgICAgdGhpcy5wbGF5QmdNb3ZlQW5pbSgpO1xuICAgICAgICB0aGlzLnN0YXJ0UmF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfTXlDcmFzaEJldF9SZXMoZGF0YTogTVNULklNMkNfTXlDcmFzaEJldF9SZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcIm5leHRCZXRHb2xkU3VjY2VlZFwiLCBOdW1iZXJVdGlscy5jb252ZXJUb0MoZGF0YS5Hb2xkKV0sIHRydWUpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5CZXRNb2RlID09PSBNU1QuQ3Jhc2hNb2RlLkF1dG8pIHtcbiAgICAgICAgICAgIGlmIChkYXRhLkVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3Jhc2hEYXRhLmF1dG9CZXREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBCZXRHb2xkOiB0aGlzLl9hdXRvQmV0UmVxRGF0YS5CZXRHb2xkLFxuICAgICAgICAgICAgICAgICAgICBCZXRNdWx0aXBsZTogdGhpcy5fYXV0b0JldFJlcURhdGEuQmV0TXVsdGlwbGUsXG4gICAgICAgICAgICAgICAgICAgIEF1dG9Sb3VuZDogdGhpcy5fYXV0b0JldFJlcURhdGEuQXV0b1JvdW5kLFxuICAgICAgICAgICAgICAgICAgICBTdG9wUHJvZml0OiB0aGlzLl9hdXRvQmV0UmVxRGF0YS5TdG9wUHJvZml0LFxuICAgICAgICAgICAgICAgICAgICBTdG9wTG9zczogdGhpcy5fYXV0b0JldFJlcURhdGEuU3RvcExvc3MsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYXV0b0JldFJlcURhdGEgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXV0b0JldEJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X00yQ19DcmFzaEJldF9NZXMoZGF0YTogTVNULklNMkNfQ3Jhc2hCZXRfTWVzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdFJvdW5kSGFzaCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hHYW1lTm8oKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxDb3VudCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hUb3RhbEdvbGQoKTtcblxuICAgICAgICBsZXQgaW5zZXJ0TXlMaXN0OiBDcmFzaEludGVyZmFjZS5CZXRQbGF5ZXJbXSA9IFtdO1xuICAgICAgICBsZXQgaW5zZXJ0UGxheWVyTGlzdDogQ3Jhc2hJbnRlcmZhY2UuQmV0UGxheWVyW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB2IG9mIGRhdGEuQmV0cykge1xuICAgICAgICAgICAgbGV0IGJldFBsYXllcjogQ3Jhc2hJbnRlcmZhY2UuQmV0UGxheWVyID0ge1xuICAgICAgICAgICAgICAgIGJldEluZm86IHYsXG4gICAgICAgICAgICAgICAgaXNFc2NhcGU6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHYucGxheWVyLlVuaXRJZCA9PT0gdGhpcy5fdXNlckRhdGEuaWQpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRNeUxpc3QucHVzaChiZXRQbGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRQbGF5ZXJMaXN0LnB1c2goYmV0UGxheWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubHN2QmV0UGxheWVyLmluc2VydChpbnNlcnRNeUxpc3QucmV2ZXJzZSgpLCAwKTtcbiAgICAgICAgdGhpcy5sc3ZCZXRQbGF5ZXIuaW5zZXJ0KGluc2VydFBsYXllckxpc3QucmV2ZXJzZSgpLCB0aGlzLl9jcmFzaERhdGEubXlCZXRMaXN0Lmxlbmd0aCk7XG5cbiAgICAgICAgLy8gdGhpcy5sc3ZCZXRQbGF5ZXIuc2V0KEFycmF5LmZyb20odGhpcy5fY3Jhc2hEYXRhLmJldFBsYXllck1hcC52YWx1ZXMoKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfQ3Jhc2hTdG9wX01lcyhkYXRhOiBNU1QuSU0yQ19DcmFzaFN0b3BfTWVzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZG9Cb21iKCk7XG5cbiAgICAgICAgbGV0IGJldFBsYXllck5vZGVMaXN0OiBjYy5Ob2RlW10gPSB0aGlzLmxzdkJldFBsYXllci5nZXRDaGlsZE5vZGUoMCwgOSk7XG4gICAgICAgIGZvciAobGV0IHYgb2YgYmV0UGxheWVyTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGxldCBiZXRQbGF5ZXJTcmM6IENyYXNoQmV0UGxheWVySXRlbSA9IHYuZ2V0Q29tcG9uZW50KENyYXNoQmV0UGxheWVySXRlbSk7XG4gICAgICAgICAgICBpZiAoIWJldFBsYXllclNyYy5nZXRJc1dpbigpKSB7XG4gICAgICAgICAgICAgICAgYmV0UGxheWVyU3JjLnNldElzV2luKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFJlY29yZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfQ3Jhc2hTdGFydEJldF9NZXMoZGF0YTogTVNULklNMkNfQ3Jhc2hTdGFydEJldF9NZXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoQ3Jhc2guU09VTkRTLkJHTSwgdGhpcy5idW5kbGUpO1xuICAgICAgICB0aGlzLl9pc0JvbWIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZXh0VmlldygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hHYW1lTm8oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRfTTJDX0NyYXNoRXNjYXBlX01lcyhkYXRhOiBNU1QuSU0yQ19DcmFzaEVzY2FwZV9NZXMpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgdiBvZiBkYXRhLlBsYXllcnMpIHtcbiAgICAgICAgICAgIHRoaXMucGxheUVzY2FwZVBsYXllckRyb3BBbmltKHYuTmljayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRfTTJDX0NyYXNoU3RvcEJldF9NZXMoZGF0YTogTVNULklNMkNfQ3Jhc2hFc2NhcGVfTWVzKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaEJldEJ1dHRvbigpO1xuICAgICAgICB0aGlzLmxhYlN0YXJ0Q291bnREb3duLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMucGdiU3RhcnRDb3VudERvd24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYWJTdGFydFRpcHMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYWJTdG9wVGlwcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X00yQ19DcmFzaENhbmNlbEF1dG9CZXRfUmVzKGRhdGE6IE1TVC5JTTJDX0NyYXNoQ2FuY2VsQXV0b0JldF9SZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYXV0b0JldFJlcURhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9jcmFzaERhdGEuYXV0b0JldERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnJlZnJlc2hBdXRvQmV0QnV0dG9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X00yQ19DcmFzaENhbmNlbEF1dG9CZXRfTWVzKGRhdGE6IE1TVC5JTTJDX0NyYXNoQ2FuY2VsQXV0b0JldF9NZXMpOiB2b2lkIHtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJjYW5jZWxBdXRvQmV0XCIsIHRydWUpKTtcbiAgICAgICAgdGhpcy5fYXV0b0JldFJlcURhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnJlZnJlc2hBdXRvQmV0QnV0dG9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X00yQ19DcmFzaEhhc2hfTWVzKGRhdGE6IE1TVC5JTTJDX0NyYXNoSGFzaF9NZXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2VlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfVHJhbnNmZXJNYXBfUmVzKGRhdGE6IE1TVC5JTTJDX1RyYW5zZmVyTWFwX1Jlcyk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goTG9naWNFdmVudC5FTlRFUl9IQUxMKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wQWxsU291bmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIuc3RvcE11c2ljKCk7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIuc3RvcEVmZmVjdEJ5UGF0aChDcmFzaC5TT1VORFMuUk9DS0VUX0JPTUIpO1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnN0b3BFZmZlY3RCeVBhdGgoQ3Jhc2guU09VTkRTLlJPQ0tFVF9GTFkpO1xuXG4gICAgfVxuXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5zdG9wQWxsU291bmQoKTtcbiAgICB9XG5cbn1cbiJdfQ==