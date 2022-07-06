import { LobbyService } from "../common/net/LobbyService";
import NumberUtils from "../common/utils/NumberUtils";
import TypeUtils from "../common/utils/TypeUtils";
import { ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import UIView from "../framework/ui/UIView";
import { MinigameDefine } from "./MinigameDefine";

// 播放金币动画等待时间（单位：毫秒）
const PLAY_GOLD_ANIM_WAIT_TIME: number = 2500;
// 背景渐隐时间（单位：毫秒）
const BG_FADE_OUT_TIME: number = 500;
// 最大金币动画数量
const MAX_GOLD_ANIM_COUNT: number = 7;
// 每个金币间隔时间
const INTERVAL_GOLD_TIME: number = 80;
// 金币飞到指定位置时间
const GOLD_FLY_TARGET_TIME: number = 800;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class MinigameGoldView extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.Sprite)
    private imgBg: cc.Sprite = null;

    @property(cc.Sprite)
    private imgGold: cc.Sprite = null;

    @property(cc.Label)
    private labGold: cc.Label = null;

    @property(cc.Prefab)
    private pfbGoldAnim: cc.Prefab = null;

    // 是否正在播放金币动画
    private _isPlayAnim: boolean = null;
    // 播放动画定时器
    private _goldAnimTimer: NodeJS.Timeout = null;
    // 金币动画列表
    private _goldAnimList: sp.Skeleton[] = null;
    // 目标坐标
    private _targetPos: cc.Vec2 = null;
    // 奖励金额
    private _bonusGold: number = null;

    public static getPrefabUrl() {
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

    private initData(): void {
        this._isPlayAnim = false;
        this._goldAnimTimer = null;
        this._goldAnimList = [];
        this._targetPos = null;
        this._bonusGold = null;
    }

    private initUI(): void {

    }

    private initPreload(): void {
        for (let i: number = 0; i < MAX_GOLD_ANIM_COUNT; ++i) {
            let goldAnimItem: sp.Skeleton = cc.instantiate(this.pfbGoldAnim).getComponent(sp.Skeleton);
            this.node.addChild(goldAnimItem.node);
            goldAnimItem.node.active = false;
            this._goldAnimList[i] = goldAnimItem;
        }
    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

    }

    private onLanguageChange(): void {

    }

    public show(args?: any[]): void {
        super.show(args);

        this._bonusGold = args[0];
        this._targetPos = args[1];

        this.onLanguageChange();

        this.refreshBonusGold();
        this.startGoldAnimTimer();

    }

    private refreshBonusGold(): void {
        this.labGold.string = `+${NumberUtils.converToC(this._bonusGold)}`;
    }

    private startGoldAnimTimer(): void {
        this.stopGoldAnimTimer();
        this._goldAnimTimer = setTimeout(() => {
            this.playGoldAnim();
        }, PLAY_GOLD_ANIM_WAIT_TIME);
    }

    private stopGoldAnimTimer(): void {
        if (!TypeUtils.isNull(this._goldAnimTimer)) {
            clearTimeout(this._goldAnimTimer);
            this._goldAnimTimer = null;
        }

        this._isPlayAnim = false;
    }

    private playGoldAnim(): void {
        if (this._isPlayAnim) {
            return;
        }

        this.audioHelper.playEffect(MinigameDefine.Sound.FLY_GOLD, this.bundle);


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
    private playBgFadeOutTween(): cc.Tween {
        return cc.tween(this.imgBg.node)
            .to(BG_FADE_OUT_TIME / 1000, { opacity: 0 })
            .start();
    }

    /**
     * 播放多个金币飞到指定坐标
     * @param targetPos {cc.Vec2} 目标坐标
     */
    private playAllGoldFlyPosTween(targetPos: cc.Vec2): void {
        for (let i: number = 0; i < MAX_GOLD_ANIM_COUNT; ++i) {
            setTimeout(() => {
                this.playGoldFlyPosTween(i, targetPos);
            }, INTERVAL_GOLD_TIME * i)
        }
    }

    /**
     * 播放单个金币飞到指定坐标
     * @param index {number} 金币下标
     * @param targetPos {cc.Vec2} 目标坐标
     */
    private playGoldFlyPosTween(index: number, targetPos: cc.Vec2): void {
        let tween: cc.Tween = cc.tween(this._goldAnimList[index].node)
            .set({ active: true, position: this.imgGold.node.position })
            .to(GOLD_FLY_TARGET_TIME / 1000, { scale: 0.22, position: targetPos });

        if (index >= MAX_GOLD_ANIM_COUNT - 1) {
            tween.call(() => {
                this.close();
            });
        }

        tween.start();
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
        switch (ButtonName) {
            case "btnPlayGoldAnim":
                this.playGoldAnim();
                break;
        }
    }

}
