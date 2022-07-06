
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/minigame/MinigameGoldView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbWluaWdhbWUvTWluaWdhbWVHb2xkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUEwRDtBQUMxRCw4RUFBc0Q7QUFDdEQsMEVBQWtEO0FBQ2xELHVEQUFtRTtBQUVuRSxrRUFBa0U7QUFDbEUsMERBQXVEO0FBQ3ZELG9FQUE0QztBQUM1QyxxREFBa0Q7QUFFbEQsb0JBQW9CO0FBQ3BCLE1BQU0sd0JBQXdCLEdBQVcsSUFBSSxDQUFDO0FBQzlDLGdCQUFnQjtBQUNoQixNQUFNLGdCQUFnQixHQUFXLEdBQUcsQ0FBQztBQUNyQyxXQUFXO0FBQ1gsTUFBTSxtQkFBbUIsR0FBVyxDQUFDLENBQUM7QUFDdEMsV0FBVztBQUNYLE1BQU0sa0JBQWtCLEdBQVcsRUFBRSxDQUFDO0FBQ3RDLGFBQWE7QUFDYixNQUFNLG9CQUFvQixHQUFXLEdBQUcsQ0FBQztBQUV6QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFpQixTQUFRLGdCQUFNO0lBQXBEOztRQUlZLFVBQUssR0FBYyxJQUFJLENBQUM7UUFHeEIsWUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGdCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRXRDLGFBQWE7UUFDTCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUNwQyxVQUFVO1FBQ0YsbUJBQWMsR0FBbUIsSUFBSSxDQUFDO1FBQzlDLFNBQVM7UUFDRCxrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFDNUMsT0FBTztRQUNDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDbkMsT0FBTztRQUNDLGVBQVUsR0FBVyxJQUFJLENBQUM7SUFzSnRDLENBQUM7SUFwSlUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxtQ0FBbUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUs7SUFFTCxDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFTyxNQUFNO0lBRWQsQ0FBQztJQUVPLFdBQVc7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDbEQsSUFBSSxZQUFZLEdBQWdCLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFUyxhQUFhO1FBQ25CLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV0QixJQUFJLGdDQUFzQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkU7SUFFTCxDQUFDO0lBRU8sZ0JBQWdCO0lBRXhCLENBQUM7SUFFTSxJQUFJLENBQUMsSUFBWTtRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUN2RSxDQUFDO0lBRU8sa0JBQWtCO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLGlCQUFpQjtRQUNyQixJQUFJLENBQUMsbUJBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3hDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsK0JBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUd4RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssa0JBQWtCO1FBQ3RCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUMzQixFQUFFLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQzNDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSyxzQkFBc0IsQ0FBQyxTQUFrQjtRQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDbEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLENBQUMsRUFBRSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUM3QjtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssbUJBQW1CLENBQUMsS0FBYSxFQUFFLFNBQWtCO1FBQ3pELElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDekQsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDM0QsRUFBRSxDQUFDLG9CQUFvQixHQUFHLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFM0UsSUFBSSxLQUFLLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxPQUFPLENBQUMsVUFBZSxFQUFFLFVBQWUsRUFBRSxJQUFhO1FBQzFELFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssaUJBQWlCO2dCQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FFSixDQUFBO0FBMUtHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ1k7QUFHaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDYztBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2tCO0FBYnJCLGdCQUFnQjtJQUZwQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixnQkFBZ0IsQ0E4S3BDO2tCQTlLb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uL2NvbW1vbi91dGlscy9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IFR5cGVVdGlscyBmcm9tIFwiLi4vY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IHsgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBNaW5pZ2FtZURlZmluZSB9IGZyb20gXCIuL01pbmlnYW1lRGVmaW5lXCI7XG5cbi8vIOaSreaUvumHkeW4geWKqOeUu+etieW+heaXtumXtO+8iOWNleS9je+8muavq+enku+8iVxuY29uc3QgUExBWV9HT0xEX0FOSU1fV0FJVF9USU1FOiBudW1iZXIgPSAyNTAwO1xuLy8g6IOM5pmv5riQ6ZqQ5pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG5jb25zdCBCR19GQURFX09VVF9USU1FOiBudW1iZXIgPSA1MDA7XG4vLyDmnIDlpKfph5HluIHliqjnlLvmlbDph49cbmNvbnN0IE1BWF9HT0xEX0FOSU1fQ09VTlQ6IG51bWJlciA9IDc7XG4vLyDmr4/kuKrph5HluIHpl7TpmpTml7bpl7RcbmNvbnN0IElOVEVSVkFMX0dPTERfVElNRTogbnVtYmVyID0gODA7XG4vLyDph5HluIHpo57liLDmjIflrprkvY3nva7ml7bpl7RcbmNvbnN0IEdPTERfRkxZX1RBUkdFVF9USU1FOiBudW1iZXIgPSA4MDA7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaW5pZ2FtZUdvbGRWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPntcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nQmc6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nR29sZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcHJpdmF0ZSBwZmJHb2xkQW5pbTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIC8vIOaYr+WQpuato+WcqOaSreaUvumHkeW4geWKqOeUu1xuICAgIHByaXZhdGUgX2lzUGxheUFuaW06IGJvb2xlYW4gPSBudWxsO1xuICAgIC8vIOaSreaUvuWKqOeUu+WumuaXtuWZqFxuICAgIHByaXZhdGUgX2dvbGRBbmltVGltZXI6IE5vZGVKUy5UaW1lb3V0ID0gbnVsbDtcbiAgICAvLyDph5HluIHliqjnlLvliJfooahcbiAgICBwcml2YXRlIF9nb2xkQW5pbUxpc3Q6IHNwLlNrZWxldG9uW10gPSBudWxsO1xuICAgIC8vIOebruagh+WdkOagh1xuICAgIHByaXZhdGUgX3RhcmdldFBvczogY2MuVmVjMiA9IG51bGw7XG4gICAgLy8g5aWW5Yqx6YeR6aKdXG4gICAgcHJpdmF0ZSBfYm9udXNHb2xkOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcIm1pbmlnYW1lL3ByZWZhYnMvTWluaWdhbWVHb2xkVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuICAgICAgICB0aGlzLmluaXRQcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pc1BsYXlBbmltID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dvbGRBbmltVGltZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9nb2xkQW5pbUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0UG9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYm9udXNHb2xkID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRVSSgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBNQVhfR09MRF9BTklNX0NPVU5UOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBnb2xkQW5pbUl0ZW06IHNwLlNrZWxldG9uID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZmJHb2xkQW5pbSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChnb2xkQW5pbUl0ZW0ubm9kZSk7XG4gICAgICAgICAgICBnb2xkQW5pbUl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2dvbGRBbmltTGlzdFtpXSA9IGdvbGRBbmltSXRlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgb25MYW5ndWFnZUNoYW5nZSgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KGFyZ3M/OiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuXG4gICAgICAgIHRoaXMuX2JvbnVzR29sZCA9IGFyZ3NbMF07XG4gICAgICAgIHRoaXMuX3RhcmdldFBvcyA9IGFyZ3NbMV07XG5cbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQm9udXNHb2xkKCk7XG4gICAgICAgIHRoaXMuc3RhcnRHb2xkQW5pbVRpbWVyKCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hCb251c0dvbGQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiR29sZC5zdHJpbmcgPSBgKyR7TnVtYmVyVXRpbHMuY29udmVyVG9DKHRoaXMuX2JvbnVzR29sZCl9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0R29sZEFuaW1UaW1lcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wR29sZEFuaW1UaW1lcigpO1xuICAgICAgICB0aGlzLl9nb2xkQW5pbVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXlHb2xkQW5pbSgpO1xuICAgICAgICB9LCBQTEFZX0dPTERfQU5JTV9XQUlUX1RJTUUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcEdvbGRBbmltVGltZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl9nb2xkQW5pbVRpbWVyKSkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2dvbGRBbmltVGltZXIpO1xuICAgICAgICAgICAgdGhpcy5fZ29sZEFuaW1UaW1lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pc1BsYXlBbmltID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5R29sZEFuaW0oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlBbmltKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoTWluaWdhbWVEZWZpbmUuU291bmQuRkxZX0dPTEQsIHRoaXMuYnVuZGxlKTtcblxuXG4gICAgICAgIHRoaXMuaW1nR29sZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhYkdvbGQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5QmdGYWRlT3V0VHdlZW4oKTtcbiAgICAgICAgdGhpcy5wbGF5QWxsR29sZEZseVBvc1R3ZWVuKHRoaXMuX3RhcmdldFBvcyk7XG5cbiAgICAgICAgdGhpcy5faXNQbGF5QW5pbSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6IOM5pmv5riQ6ZqQ5Yqo55S7XG4gICAgICogQHJldHVybnMge2NjLlR3ZWVufVxuICAgICAqL1xuICAgIHByaXZhdGUgcGxheUJnRmFkZU91dFR3ZWVuKCk6IGNjLlR3ZWVuIHtcbiAgICAgICAgcmV0dXJuIGNjLnR3ZWVuKHRoaXMuaW1nQmcubm9kZSlcbiAgICAgICAgICAgIC50byhCR19GQURFX09VVF9USU1FIC8gMTAwMCwgeyBvcGFjaXR5OiAwIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7lpJrkuKrph5HluIHpo57liLDmjIflrprlnZDmoIdcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIHtjYy5WZWMyfSDnm67moIflnZDmoIdcbiAgICAgKi9cbiAgICBwcml2YXRlIHBsYXlBbGxHb2xkRmx5UG9zVHdlZW4odGFyZ2V0UG9zOiBjYy5WZWMyKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBNQVhfR09MRF9BTklNX0NPVU5UOyArK2kpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUdvbGRGbHlQb3NUd2VlbihpLCB0YXJnZXRQb3MpO1xuICAgICAgICAgICAgfSwgSU5URVJWQUxfR09MRF9USU1FICogaSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvuWNleS4qumHkeW4gemjnuWIsOaMh+WumuWdkOagh1xuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSDph5HluIHkuIvmoIdcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIHtjYy5WZWMyfSDnm67moIflnZDmoIdcbiAgICAgKi9cbiAgICBwcml2YXRlIHBsYXlHb2xkRmx5UG9zVHdlZW4oaW5kZXg6IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyKTogdm9pZCB7XG4gICAgICAgIGxldCB0d2VlbjogY2MuVHdlZW4gPSBjYy50d2Vlbih0aGlzLl9nb2xkQW5pbUxpc3RbaW5kZXhdLm5vZGUpXG4gICAgICAgICAgICAuc2V0KHsgYWN0aXZlOiB0cnVlLCBwb3NpdGlvbjogdGhpcy5pbWdHb2xkLm5vZGUucG9zaXRpb24gfSlcbiAgICAgICAgICAgIC50byhHT0xEX0ZMWV9UQVJHRVRfVElNRSAvIDEwMDAsIHsgc2NhbGU6IDAuMjIsIHBvc2l0aW9uOiB0YXJnZXRQb3MgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID49IE1BWF9HT0xEX0FOSU1fQ09VTlQgLSAxKSB7XG4gICAgICAgICAgICB0d2Vlbi5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuUGxheUdvbGRBbmltXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5R29sZEFuaW0oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19