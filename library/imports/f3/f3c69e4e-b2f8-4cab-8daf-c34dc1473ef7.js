"use strict";
cc._RF.push(module, 'f3c695OsvhMq42vw03BRz73', 'MinigameGoldView');
// script/minigame/MinigameGoldView.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const TypeUtils_1 = __importDefault(require("../common/utils/TypeUtils"));
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const MinigameDefine_1 = require("./MinigameDefine");
// 播放金币动画等待时间（单位：毫秒）
const PLAY_GOLD_ANIM_WAIT_TIME = 2500;
// 背景渐隐时间（单位：毫秒）
const BG_FADE_OUT_TIME = 500;
// 最大金币动画数量
const MAX_GOLD_ANIM_COUNT = 7;
// 每个金币间隔时间
const INTERVAL_GOLD_TIME = 80;
// 金币飞到指定位置时间
const GOLD_FLY_TARGET_TIME = 800;
const { ccclass, property } = cc._decorator;
let MinigameGoldView = class MinigameGoldView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgBg = null;
        this.imgGold = null;
        this.labGold = null;
        this.pfbGoldAnim = null;
        // 是否正在播放金币动画
        this._isPlayAnim = null;
        // 播放动画定时器
        this._goldAnimTimer = null;
        // 金币动画列表
        this._goldAnimList = null;
        // 目标坐标
        this._targetPos = null;
        // 奖励金额
        this._bonusGold = null;
    }
    static getPrefabUrl() {
        return "minigame/prefabs/MinigameGoldView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initUI();
        this.initPreload();
    }
    start() {
    }
    initData() {
        this._isPlayAnim = false;
        this._goldAnimTimer = null;
        this._goldAnimList = [];
        this._targetPos = null;
        this._bonusGold = null;
    }
    initUI() {
    }
    initPreload() {
        for (let i = 0; i < MAX_GOLD_ANIM_COUNT; ++i) {
            let goldAnimItem = cc.instantiate(this.pfbGoldAnim).getComponent(sp.Skeleton);
            this.node.addChild(goldAnimItem.node);
            goldAnimItem.node.active = false;
            this._goldAnimList[i] = goldAnimItem;
        }
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
    }
    show(args) {
        super.show(args);
        this._bonusGold = args[0];
        this._targetPos = args[1];
        this.onLanguageChange();
        this.refreshBonusGold();
        this.startGoldAnimTimer();
    }
    refreshBonusGold() {
        this.labGold.string = `+${NumberUtils_1.default.converToC(this._bonusGold)}`;
    }
    startGoldAnimTimer() {
        this.stopGoldAnimTimer();
        this._goldAnimTimer = setTimeout(() => {
            this.playGoldAnim();
        }, PLAY_GOLD_ANIM_WAIT_TIME);
    }
    stopGoldAnimTimer() {
        if (!TypeUtils_1.default.isNull(this._goldAnimTimer)) {
            clearTimeout(this._goldAnimTimer);
            this._goldAnimTimer = null;
        }
        this._isPlayAnim = false;
    }
    playGoldAnim() {
        if (this._isPlayAnim) {
            return;
        }
        this.audioHelper.playEffect(MinigameDefine_1.MinigameDefine.Sound.FLY_GOLD, this.bundle);
        this.imgGold.node.active = false;
        this.labGold.node.active = false;
        this.playBgFadeOutTween();
        this.playAllGoldFlyPosTween(this._targetPos);
        this._isPlayAnim = true;
    }
    /**
     * 获取背景渐隐动画
     * @returns {cc.Tween}
     */
    playBgFadeOutTween() {
        return cc.tween(this.imgBg.node)
            .to(BG_FADE_OUT_TIME / 1000, { opacity: 0 })
            .start();
    }
    /**
     * 播放多个金币飞到指定坐标
     * @param targetPos {cc.Vec2} 目标坐标
     */
    playAllGoldFlyPosTween(targetPos) {
        for (let i = 0; i < MAX_GOLD_ANIM_COUNT; ++i) {
            setTimeout(() => {
                this.playGoldFlyPosTween(i, targetPos);
            }, INTERVAL_GOLD_TIME * i);
        }
    }
    /**
     * 播放单个金币飞到指定坐标
     * @param index {number} 金币下标
     * @param targetPos {cc.Vec2} 目标坐标
     */
    playGoldFlyPosTween(index, targetPos) {
        let tween = cc.tween(this._goldAnimList[index].node)
            .set({ active: true, position: this.imgGold.node.position })
            .to(GOLD_FLY_TARGET_TIME / 1000, { scale: 0.22, position: targetPos });
        if (index >= MAX_GOLD_ANIM_COUNT - 1) {
            tween.call(() => {
                this.close();
            });
        }
        tween.start();
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnPlayGoldAnim":
                this.playGoldAnim();
                break;
        }
    }
};
__decorate([
    property(cc.Sprite)
], MinigameGoldView.prototype, "imgBg", void 0);
__decorate([
    property(cc.Sprite)
], MinigameGoldView.prototype, "imgGold", void 0);
__decorate([
    property(cc.Label)
], MinigameGoldView.prototype, "labGold", void 0);
__decorate([
    property(cc.Prefab)
], MinigameGoldView.prototype, "pfbGoldAnim", void 0);
MinigameGoldView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], MinigameGoldView);
exports.default = MinigameGoldView;

cc._RF.pop();