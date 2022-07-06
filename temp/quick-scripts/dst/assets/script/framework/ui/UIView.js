
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/ui/UIView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3ab94+tF5hMG5+UXd1Yf5M5', 'UIView');
// script/framework/ui/UIView.ts

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
const EventComponent_1 = __importDefault(require("../base/EventComponent"));
const AudioComponent_1 = __importDefault(require("../base/AudioComponent"));
// import { Manager } from "../Framework";
const Defines_1 = require("../base/Defines");
const Manager_1 = require("../../common/manager/Manager");
const UserData_1 = __importDefault(require("../../data/UserData"));
const EventDefine_1 = require("../../common/define/EventDefine");
/**
 * @description 视图基类
 */
const { ccclass, property } = cc._decorator;
let UIView = class UIView extends EventComponent_1.default {
    constructor() {
        super(...arguments);
        /**@description 是否允许接受键盘事件 */
        this._isEnableKey = false;
        /**@description 按钮点击状态 */
        this.curClickState = false;
        this.scvRoot = null;
        /**@description init代码参数 */
        this._args = null;
        /**
         * @description 当前界面的节点，如果界面需要使用动画打开或关闭，
         * 可直接对content进行赋值，
         * 使用showWithAction 有动画显示
         * 使用hideWithAction 有动画隐藏
         * 使用closeWithAction 有动画关闭
         * */
        this._content = null;
        /**本组件的类名 */
        this._className = "unknow";
        this._bundle = null;
        this.audioHelper = null;
        this._enterBackgroundTime = 0;
        this._enableFrontAndBackgroundSwitch = false;
    }
    static getPrefabUrl() {
        if (CC_DEBUG) {
            cc.error(`请求实现public static getPrefabUrl`);
        }
        return "unknown";
    }
    /**@description 当前传入参数，即通过UI管理器打开时的传入参数 */
    get args() {
        return this._args;
    }
    /**
     * @description 查找子节点
     * @param path 子节点路径
     * @param referenceNode 从哪一个节点开始查找，
     * referenceNode如果有值，从传入节点中查找，
     * referenceNode如果没有值，this.content有值，默认从this.content进行查找
     * referenceNode如不传入，且this.content没有值，相当于使用了cc.find
     */
    find(path, referenceNode) {
        if (referenceNode) {
            return cc.find(path, referenceNode);
        }
        else {
            if (this.content) {
                return cc.find(path, this.content);
            }
            else {
                return cc.find(path, referenceNode);
            }
        }
    }
    set content(value) {
        this._content = value;
    }
    get content() {
        return this._content;
    }
    set className(value) {
        this._className = value;
    }
    get className() {
        return this._className;
    }
    /**指向当前View打开时的bundle */
    set bundle(value) {
        this._bundle = value;
    }
    get bundle() {
        return this._bundle;
    }
    close() {
        Manager_1.Manager.uiManager.close(this.className);
    }
    /**@description args为open代入的参数 */
    show(args) {
        //再如果界面已经存在于界面管理器中，不会再进入init函数，此时传入新的参数，只从show里面过来,这里重新对_args重新赋值
        this._args = args;
        if (this.node)
            this.node.active = true;
    }
    hide() {
        Manager_1.Manager.uiManager.close(this.className);
        // if (this.node) this.node.removeFromParent(false);
    }
    playDefaultEffect(buttonName) {
        switch (buttonName) {
            case "close":
                // ryyl.audio.playSoundEffectByPath("modules/public/res/audio/close");
                if (this.audioHelper) {
                    this.audioHelper.playEffect("common/audio/close", Defines_1.BUNDLE_RESOURCES);
                }
                break;
            // default: ryyl.audio.playSoundEffectByPath("modules/public/res/audio/click");
            default:
                if (this.audioHelper) {
                    this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
                }
        }
    }
    /**
    * @param event
    * @param type UI编辑器传参 有值就不做按钮连点过滤
    * @Explain Button点击事件统一调用
    */
    onClickButton(event, type) {
        let buttonName = event.target.name;
        let buttonNode = event.target;
        if (type === null || type === undefined) {
            if (this.curClickState)
                return;
            this.curClickState = true;
            this.allCurTimeout = this.allCurTimeout || [];
            this.allCurTimeout.push(setTimeout(() => {
                this.curClickState = false;
            }, 100));
        }
        //G.Logger.log(`点击了button -> ${buttonName}`);
        this.playDefaultEffect(buttonName);
        this.onClick(buttonName, buttonNode, type);
    }
    onClickCheckButton(event, type) {
        let buttonName = event.target.name;
        let buttonNode = event.target;
        if (type === null || type === undefined) {
            if (this.curClickState)
                return;
            this.curClickState = true;
            this.allCurTimeout = this.allCurTimeout || [];
            this.allCurTimeout.push(setTimeout(() => {
                this.curClickState = false;
            }, 100));
        }
        //G.Logger.log(`点击了button -> ${buttonName}`);
        this.playDefaultEffect(buttonName);
        if (!G.DataMgr.get(UserData_1.default).isLogined()) {
            // PanelHelp.showTip(i18n.Tips.SilakanMasuk);
            dispatch(EventDefine_1.EventDefine.NOT_LOGIN_CLICK_BUTTON);
            return;
        }
        this.onClick(buttonName, buttonNode, type);
    }
    /**
    * @param ButtonName
    * @param ButtonNode
    * @param data {index} 编辑器传入数据
    * @Explain 子类需要重写这个接口来触发点击事件
    */
    onClick(ButtonName, ButtonNode, data) { }
    clearCurTimeout() {
        if (!this.allCurTimeout)
            return;
        let count = this.allCurTimeout.length;
        for (let i = 0; i < count; i++) {
            clearTimeout(this.allCurTimeout[i]);
        }
    }
    /**@description 动画显示界面
     *@param isOverrideShow 是否是重写show调用的,如果是重写show调用了,必将此参数设置为true,否则会产生死循环递归调用
     *@param completeCallback 完成回调
     *@example
     *  示例： 通常在init/onLoad函数中调用 showWithAction,
     *  但如果需要界面通过hide隐藏，而不是关闭界面时，下一次显示时
     *  管理器直接调用了show,没有执行界面的打开动画，如果还需要界面打开动画
     *  需要按如下方式重写show方法
     *  show( args : any[] ){
     *      super.show(args);
     *      this.showWithAction(true);
     *      //to do =>
     *  }
     */
    showWithAction(isOverrideShow = false, completeCallback) {
        if (this.content) {
            if (!isOverrideShow)
                this.show(this.args);
            this.content.stopAllActions();
            if (this.content.getComponent(cc.Widget)) {
                this.content.getComponent(cc.Widget).enabled = false;
            }
            cc.tween(this.content)
                .set({ scale: 0.2 })
                .to(0.1, { scale: 1.15 })
                .delay(0.05)
                .to(0.1, { scale: 1.0 })
                .call(() => {
                if (completeCallback)
                    completeCallback();
                if (this.content.getComponent(cc.Widget)) {
                    this.content.getComponent(cc.Widget).enabled = true;
                }
            })
                .start();
        }
    }
    /**@description 动画隐藏界面
     *@param isOverrideHide 是否是重写hide调用的,如果是重写hide调用了,必将此参数设置为true,否则会产生死循环递归调用
     *@param completeCallback 完成回调
     */
    hideWithAction(completeCallback) {
        if (this.content) {
            this.content.stopAllActions();
            cc.tween(this.content)
                .to(0.1, { scale: 1.15 })
                .to(0.1, { scale: 0.3 })
                .call(() => {
                this.hide();
                this.content.scale = 1.0;
                if (completeCallback)
                    completeCallback();
            })
                .start();
        }
    }
    /**@description 动画关闭界面
     *@param completeCallback 完成回调
     */
    closeWithAction(completeCallback) {
        if (this.content && this.content.getNumberOfRunningActions() == 0) {
            this.content.stopAllActions();
            cc.tween(this.content)
                .to(0.1, { scale: 1.15 })
                .to(0.1, { scale: 0.3 })
                .call(() => {
                if (completeCallback)
                    completeCallback();
                this.close();
            })
                .start();
        }
    }
    /**
     * @description 启用物理返回键按钮
     * @param isEnabled true 启用，
     * @example 重写onKeyBack方法
     */
    setEnabledKeyBack(isEnabled) {
        if (isEnabled) {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        else {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        this._isEnableKey = isEnabled;
    }
    isEnabledKeyBack() {
        return this._isEnableKey;
    }
    onKeyUp(ev) {
        if (CC_DEBUG) {
            cc.log(`[${cc.js.getClassName(this)}] onKeyUp keyCode : ${ev.keyCode}`);
        }
        if (ev.keyCode == cc.macro.KEY.escape) {
            this.onKeyBack(ev);
        }
        else {
            ev.stopPropagation();
        }
    }
    onKeyBack(ev) {
        //只有一个接受，不再向上传播
        ev.stopPropagation();
    }
    onLoad() {
        this.audioHelper = this.addComponent(AudioComponent_1.default);
        this.audioHelper.owner = this;
        let nodRoot = this.node.getChildByName("scvRoot");
        if (nodRoot) {
            let scvRoot = nodRoot.getComponent(cc.ScrollView);
            if (scvRoot) {
                this.scvRoot = scvRoot;
            }
        }
        super.onLoad();
    }
    onDestroy() {
        this.setEnabledKeyBack(false);
        this.enableFrontAndBackgroundSwitch = false;
        this.clearCurTimeout();
        super.onDestroy();
    }
    set enableFrontAndBackgroundSwitch(value) {
        this._enableFrontAndBackgroundSwitch = value;
        if (value) {
            cc.game.on(cc.game.EVENT_SHOW, this._onEnterForgeGround, this);
            cc.game.on(cc.game.EVENT_HIDE, this._onEnterBackground, this);
        }
        else {
            cc.game.off(cc.game.EVENT_SHOW, this._onEnterForgeGround, this);
            cc.game.off(cc.game.EVENT_HIDE, this._onEnterBackground, this);
        }
    }
    get enableFrontAndBackgroundSwitch() {
        return this._enableFrontAndBackgroundSwitch;
    }
    _onEnterBackground() {
        this._enterBackgroundTime = Date.timeNow();
        this.onEnterBackground();
    }
    _onEnterForgeGround() {
        let now = Date.timeNow();
        let inBackgroundTime = now - this._enterBackgroundTime;
        this.onEnterForgeground(inBackgroundTime);
    }
    onEnterForgeground(inBackgroundTime) {
    }
    onEnterBackground() {
    }
    onScrollTop() {
        if (this.scvRoot) {
            this.scvRoot.stopAutoScroll();
            this.scvRoot.scrollToTop();
        }
    }
};
UIView = __decorate([
    ccclass
], UIView);
exports.default = UIView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFvRDtBQUNwRCw0RUFBb0Q7QUFDcEQsMENBQTBDO0FBQzFDLDZDQUFtRDtBQUNuRCwwREFBdUQ7QUFDdkQsbUVBQTJDO0FBRzNDLGlFQUE4RDtBQUU5RDs7R0FFRztBQUNILE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQVc1QyxJQUE4QixNQUFNLEdBQXBDLE1BQThCLE1BQU8sU0FBUSx3QkFBYztJQUEzRDs7UUFFSSw2QkFBNkI7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFN0IseUJBQXlCO1FBQ2pCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRXBCLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBU3hDLDJCQUEyQjtRQUNuQixVQUFLLEdBQVUsSUFBSSxDQUFDO1FBMEI1Qjs7Ozs7O2FBTUs7UUFDRyxhQUFRLEdBQVksSUFBSSxDQUFDO1FBUWpDLFlBQVk7UUFDSixlQUFVLEdBQVcsUUFBUSxDQUFDO1FBUTlCLFlBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBbU4xQixnQkFBVyxHQUFtQixJQUFJLENBQUM7UUF1QnJDLHlCQUFvQixHQUFHLENBQUMsQ0FBQztRQUN6QixvQ0FBK0IsR0FBRyxLQUFLLENBQUM7SUF1Q3BELENBQUM7SUE1VVUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsSUFBSSxRQUFRLEVBQUU7WUFDVixFQUFFLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBSUQsMENBQTBDO0lBQzFDLElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNPLElBQUksQ0FBQyxJQUFZ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SSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBdFY2QixNQUFNO0lBRG5DLE9BQU87R0FDc0IsTUFBTSxDQXNWbkM7a0JBdFY2QixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50Q29tcG9uZW50IGZyb20gXCIuLi9iYXNlL0V2ZW50Q29tcG9uZW50XCI7XG5pbXBvcnQgQXVkaW9Db21wb25lbnQgZnJvbSBcIi4uL2Jhc2UvQXVkaW9Db21wb25lbnRcIjtcbi8vIGltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vRnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgVmlld1pPcmRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgRXZlbnREZWZpbmUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RlZmluZS9FdmVudERlZmluZVwiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDop4blm77ln7rnsbtcbiAqL1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IGludGVyZmFjZSBVSUNsYXNzPFQgZXh0ZW5kcyBVSVZpZXc+IHtcbiAgICBuZXcoKTogVDtcbiAgICAvKipcbiAgICAgKkBkZXNjcmlwdGlvbiDop4blm75wcmVmYWIg5Zyw5Z2AIHJlc291cmNlc+ebruW9leS4i+WmgnpfcGFuZWxzL1dlaVpvbmVMYXllciBcbiAgICAgKi9cbiAgICBnZXRQcmVmYWJVcmwoKTogc3RyaW5nO1xufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgVUlWaWV3IGV4dGVuZHMgRXZlbnRDb21wb25lbnQge1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOaYr+WQpuWFgeiuuOaOpeWPl+mUruebmOS6i+S7tiAqL1xuICAgIHByaXZhdGUgX2lzRW5hYmxlS2V5ID0gZmFsc2U7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5oyJ6ZKu54K55Ye754q25oCBICovXG4gICAgcHJpdmF0ZSBjdXJDbGlja1N0YXRlID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBhbGxDdXJUaW1lb3V0OiBhbnk7XG4gICAgcHJvdGVjdGVkIHNjdlJvb3Q6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy5lcnJvcihg6K+35rGC5a6e546wcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmxgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJ1bmtub3duXCI7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIGluaXTku6PnoIHlj4LmlbAgKi9cbiAgICBwcml2YXRlIF9hcmdzOiBhbnlbXSA9IG51bGw7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOW9k+WJjeS8oOWFpeWPguaVsO+8jOWNs+mAmui/h1VJ566h55CG5Zmo5omT5byA5pe255qE5Lyg5YWl5Y+C5pWwICovXG4gICAgcHVibGljIGdldCBhcmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXJncztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5p+l5om+5a2Q6IqC54K5XG4gICAgICogQHBhcmFtIHBhdGgg5a2Q6IqC54K56Lev5b6EXG4gICAgICogQHBhcmFtIHJlZmVyZW5jZU5vZGUg5LuO5ZOq5LiA5Liq6IqC54K55byA5aeL5p+l5om+77yMXG4gICAgICogcmVmZXJlbmNlTm9kZeWmguaenOacieWAvO+8jOS7juS8oOWFpeiKgueCueS4reafpeaJvu+8jFxuICAgICAqIHJlZmVyZW5jZU5vZGXlpoLmnpzmsqHmnInlgLzvvIx0aGlzLmNvbnRlbnTmnInlgLzvvIzpu5jorqTku450aGlzLmNvbnRlbnTov5vooYzmn6Xmib5cbiAgICAgKiByZWZlcmVuY2VOb2Rl5aaC5LiN5Lyg5YWl77yM5LiUdGhpcy5jb250ZW505rKh5pyJ5YC877yM55u45b2T5LqO5L2/55So5LqGY2MuZmluZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBmaW5kKHBhdGg6IHN0cmluZywgcmVmZXJlbmNlTm9kZT86IGNjLk5vZGUpIHtcbiAgICAgICAgaWYgKHJlZmVyZW5jZU5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5maW5kKHBhdGgsIHJlZmVyZW5jZU5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYy5maW5kKHBhdGgsIHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYy5maW5kKHBhdGgsIHJlZmVyZW5jZU5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOW9k+WJjeeVjOmdoueahOiKgueCue+8jOWmguaenOeVjOmdoumcgOimgeS9v+eUqOWKqOeUu+aJk+W8gOaIluWFs+mXre+8jFxuICAgICAqIOWPr+ebtOaOpeWvuWNvbnRlbnTov5vooYzotYvlgLzvvIxcbiAgICAgKiDkvb/nlKhzaG93V2l0aEFjdGlvbiDmnInliqjnlLvmmL7npLpcbiAgICAgKiDkvb/nlKhoaWRlV2l0aEFjdGlvbiDmnInliqjnlLvpmpDol49cbiAgICAgKiDkvb/nlKhjbG9zZVdpdGhBY3Rpb24g5pyJ5Yqo55S75YWz6ZetXG4gICAgICogKi9cbiAgICBwcml2YXRlIF9jb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgc2V0IGNvbnRlbnQodmFsdWU6IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbHVlO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cblxuICAgIC8qKuacrOe7hOS7tueahOexu+WQjSAqL1xuICAgIHByaXZhdGUgX2NsYXNzTmFtZTogc3RyaW5nID0gXCJ1bmtub3dcIjtcbiAgICBwdWJsaWMgc2V0IGNsYXNzTmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NsYXNzTmFtZSA9IHZhbHVlO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2J1bmRsZTogQlVORExFX1RZUEUgPSBudWxsO1xuICAgIC8qKuaMh+WQkeW9k+WJjVZpZXfmiZPlvIDml7bnmoRidW5kbGUgKi9cbiAgICBwdWJsaWMgc2V0IGJ1bmRsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9idW5kbGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHVibGljIGdldCBidW5kbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idW5kbGU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5jbG9zZSh0aGlzLmNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIGFyZ3PkuLpvcGVu5Luj5YWl55qE5Y+C5pWwICovXG4gICAgcHVibGljIHNob3coYXJncz86IGFueVtdKSB7XG4gICAgICAgIC8v5YaN5aaC5p6c55WM6Z2i5bey57uP5a2Y5Zyo5LqO55WM6Z2i566h55CG5Zmo5Lit77yM5LiN5Lya5YaN6L+b5YWlaW5pdOWHveaVsO+8jOatpOaXtuS8oOWFpeaWsOeahOWPguaVsO+8jOWPquS7jnNob3fph4zpnaLov4fmnaUs6L+Z6YeM6YeN5paw5a+5X2FyZ3Pph43mlrDotYvlgLxcbiAgICAgICAgdGhpcy5fYXJncyA9IGFyZ3M7XG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5jbG9zZSh0aGlzLmNsYXNzTmFtZSk7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMubm9kZSkgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xuICAgIH1cbiAgICBwbGF5RGVmYXVsdEVmZmVjdChidXR0b25OYW1lPzogc3RyaW5nKSB7XG4gICAgICAgIHN3aXRjaCAoYnV0dG9uTmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6XG4gICAgICAgICAgICAgICAgLy8gcnl5bC5hdWRpby5wbGF5U291bmRFZmZlY3RCeVBhdGgoXCJtb2R1bGVzL3B1YmxpYy9yZXMvYXVkaW8vY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXVkaW9IZWxwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5RWZmZWN0KFwiY29tbW9uL2F1ZGlvL2Nsb3NlXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGRlZmF1bHQ6IHJ5eWwuYXVkaW8ucGxheVNvdW5kRWZmZWN0QnlQYXRoKFwibW9kdWxlcy9wdWJsaWMvcmVzL2F1ZGlvL2NsaWNrXCIpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdWRpb0hlbHBlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcGFyYW0gZXZlbnRcbiAgICAqIEBwYXJhbSB0eXBlIFVJ57yW6L6R5Zmo5Lyg5Y+CIOacieWAvOWwseS4jeWBmuaMiemSrui/nueCuei/h+a7pFxuICAgICogQEV4cGxhaW4gQnV0dG9u54K55Ye75LqL5Lu257uf5LiA6LCD55SoXG4gICAgKi9cblxuICAgIHB1YmxpYyBvbkNsaWNrQnV0dG9uKGV2ZW50LCB0eXBlKSB7XG4gICAgICAgIGxldCBidXR0b25OYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgICAgIGxldCBidXR0b25Ob2RlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAodHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1ckNsaWNrU3RhdGUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuY3VyQ2xpY2tTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFsbEN1clRpbWVvdXQgPSB0aGlzLmFsbEN1clRpbWVvdXQgfHwgW107XG4gICAgICAgICAgICB0aGlzLmFsbEN1clRpbWVvdXQucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckNsaWNrU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vRy5Mb2dnZXIubG9nKGDngrnlh7vkuoZidXR0b24gLT4gJHtidXR0b25OYW1lfWApO1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KGJ1dHRvbk5hbWUpXG4gICAgICAgIHRoaXMub25DbGljayhidXR0b25OYW1lLCBidXR0b25Ob2RlLCB0eXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGlja0NoZWNrQnV0dG9uKGV2ZW50LCB0eXBlKSB7XG4gICAgICAgIGxldCBidXR0b25OYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgICAgIGxldCBidXR0b25Ob2RlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAodHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1ckNsaWNrU3RhdGUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuY3VyQ2xpY2tTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFsbEN1clRpbWVvdXQgPSB0aGlzLmFsbEN1clRpbWVvdXQgfHwgW107XG4gICAgICAgICAgICB0aGlzLmFsbEN1clRpbWVvdXQucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckNsaWNrU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vRy5Mb2dnZXIubG9nKGDngrnlh7vkuoZidXR0b24gLT4gJHtidXR0b25OYW1lfWApO1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KGJ1dHRvbk5hbWUpXG5cbiAgICAgICAgaWYgKCFHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKS5pc0xvZ2luZWQoKSkge1xuICAgICAgICAgICAgLy8gUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5UaXBzLlNpbGFrYW5NYXN1ayk7XG4gICAgICAgICAgICBkaXNwYXRjaChFdmVudERlZmluZS5OT1RfTE9HSU5fQ0xJQ0tfQlVUVE9OKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25DbGljayhidXR0b25OYW1lLCBidXR0b25Ob2RlLCB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEBwYXJhbSBCdXR0b25OYW1lXG4gICAgKiBAcGFyYW0gQnV0dG9uTm9kZVxuICAgICogQHBhcmFtIGRhdGEge2luZGV4fSDnvJbovpHlmajkvKDlhaXmlbDmja5cbiAgICAqIEBFeHBsYWluIOWtkOexu+mcgOimgemHjeWGmei/meS4quaOpeWPo+adpeinpuWPkeeCueWHu+S6i+S7tlxuICAgICovXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZSwgQnV0dG9uTm9kZSwgZGF0YT86IHN0cmluZykgeyB9XG5cbiAgICBwdWJsaWMgY2xlYXJDdXJUaW1lb3V0KCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxsQ3VyVGltZW91dCkgcmV0dXJuO1xuICAgICAgICBsZXQgY291bnQgPSB0aGlzLmFsbEN1clRpbWVvdXQubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFsbEN1clRpbWVvdXRbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipAZGVzY3JpcHRpb24g5Yqo55S75pi+56S655WM6Z2iIFxuICAgICAqQHBhcmFtIGlzT3ZlcnJpZGVTaG93IOaYr+WQpuaYr+mHjeWGmXNob3fosIPnlKjnmoQs5aaC5p6c5piv6YeN5YaZc2hvd+iwg+eUqOS6hizlv4XlsIbmraTlj4LmlbDorr7nva7kuLp0cnVlLOWQpuWImeS8muS6p+eUn+atu+W+queOr+mAkuW9kuiwg+eUqCBcbiAgICAgKkBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIOWujOaIkOWbnuiwg1xuICAgICAqQGV4YW1wbGUgXG4gICAgICogIOekuuS+i++8miDpgJrluLjlnKhpbml0L29uTG9hZOWHveaVsOS4reiwg+eUqCBzaG93V2l0aEFjdGlvbixcbiAgICAgKiAg5L2G5aaC5p6c6ZyA6KaB55WM6Z2i6YCa6L+HaGlkZemakOiXj++8jOiAjOS4jeaYr+WFs+mXreeVjOmdouaXtu+8jOS4i+S4gOasoeaYvuekuuaXtlxuICAgICAqICDnrqHnkIblmajnm7TmjqXosIPnlKjkuoZzaG93LOayoeacieaJp+ihjOeVjOmdoueahOaJk+W8gOWKqOeUu++8jOWmguaenOi/mOmcgOimgeeVjOmdouaJk+W8gOWKqOeUu1xuICAgICAqICDpnIDopoHmjInlpoLkuIvmlrnlvI/ph43lhplzaG935pa55rOVXG4gICAgICogIHNob3coIGFyZ3MgOiBhbnlbXSApe1xuICAgICAqICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgKiAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICogICAgICAvL3RvIGRvID0+IFxuICAgICAqICB9XG4gICAgICovXG4gICAgcHVibGljIHNob3dXaXRoQWN0aW9uKGlzT3ZlcnJpZGVTaG93ID0gZmFsc2UsIGNvbXBsZXRlQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICghaXNPdmVycmlkZVNob3cpIHRoaXMuc2hvdyh0aGlzLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5XaWRnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5XaWRnZXQpLmVuYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5jb250ZW50KVxuICAgICAgICAgICAgICAgIC5zZXQoeyBzY2FsZTogMC4yIH0pXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZTogMS4xNSB9KVxuICAgICAgICAgICAgICAgIC5kZWxheSgwLjA1KVxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgc2NhbGU6IDEuMCB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIGNvbXBsZXRlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5XaWRnZXQpLmVuYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWKqOeUu+makOiXj+eVjOmdoiBcbiAgICAgKkBwYXJhbSBpc092ZXJyaWRlSGlkZSDmmK/lkKbmmK/ph43lhploaWRl6LCD55So55qELOWmguaenOaYr+mHjeWGmWhpZGXosIPnlKjkuoYs5b+F5bCG5q2k5Y+C5pWw6K6+572u5Li6dHJ1ZSzlkKbliJnkvJrkuqfnlJ/mrbvlvqrnjq/pgJLlvZLosIPnlKggXG4gICAgICpAcGFyYW0gY29tcGxldGVDYWxsYmFjayDlrozmiJDlm57osINcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZVdpdGhBY3Rpb24oY29tcGxldGVDYWxsYmFjaz86ICgpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmNvbnRlbnQpXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZTogMS4xNSB9KVxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgc2NhbGU6IDAuMyB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zY2FsZSA9IDEuMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIGNvbXBsZXRlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWKqOeUu+WFs+mXreeVjOmdoiBcbiAgICAgKkBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIOWujOaIkOWbnuiwg1xuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZVdpdGhBY3Rpb24oY29tcGxldGVDYWxsYmFjaz86ICgpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCAmJiB0aGlzLmNvbnRlbnQuZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9ucygpID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5jb250ZW50KVxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgc2NhbGU6IDEuMTUgfSlcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IHNjYWxlOiAwLjMgfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSBjb21wbGV0ZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWQr+eUqOeJqeeQhui/lOWbnumUruaMiemSrlxuICAgICAqIEBwYXJhbSBpc0VuYWJsZWQgdHJ1ZSDlkK/nlKjvvIxcbiAgICAgKiBAZXhhbXBsZSDph43lhplvbktleUJhY2vmlrnms5VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0RW5hYmxlZEtleUJhY2soaXNFbmFibGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faXNFbmFibGVLZXkgPSBpc0VuYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzRW5hYmxlZEtleUJhY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuYWJsZUtleTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25LZXlVcChldjogY2MuRXZlbnQuRXZlbnRLZXlib2FyZCkge1xuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIGNjLmxvZyhgWyR7Y2MuanMuZ2V0Q2xhc3NOYW1lKHRoaXMpfV0gb25LZXlVcCBrZXlDb2RlIDogJHtldi5rZXlDb2RlfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldi5rZXlDb2RlID09IGNjLm1hY3JvLktFWS5lc2NhcGUpIHtcbiAgICAgICAgICAgIHRoaXMub25LZXlCYWNrKGV2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uS2V5QmFjayhldjogY2MuRXZlbnQuRXZlbnRLZXlib2FyZCkge1xuICAgICAgICAvL+WPquacieS4gOS4quaOpeWPl++8jOS4jeWGjeWQkeS4iuS8oOaSrVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXVkaW9IZWxwZXI6IEF1ZGlvQ29tcG9uZW50ID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlciA9IHRoaXMuYWRkQ29tcG9uZW50KEF1ZGlvQ29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5vd25lciA9IHRoaXM7XG5cbiAgICAgICAgbGV0IG5vZFJvb3Q6IGNjLk5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3ZSb290XCIpO1xuICAgICAgICBpZiAobm9kUm9vdCkge1xuICAgICAgICAgICAgbGV0IHNjdlJvb3Q6IGNjLlNjcm9sbFZpZXcgPSBub2RSb290LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcbiAgICAgICAgICAgIGlmIChzY3ZSb290KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3ZSb290ID0gc2N2Um9vdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc2V0RW5hYmxlZEtleUJhY2soZmFsc2UpO1xuICAgICAgICB0aGlzLmVuYWJsZUZyb250QW5kQmFja2dyb3VuZFN3aXRjaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsZWFyQ3VyVGltZW91dCgpO1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbnRlckJhY2tncm91bmRUaW1lID0gMDtcbiAgICBwcml2YXRlIF9lbmFibGVGcm9udEFuZEJhY2tncm91bmRTd2l0Y2ggPSBmYWxzZTtcbiAgICBwdWJsaWMgc2V0IGVuYWJsZUZyb250QW5kQmFja2dyb3VuZFN3aXRjaCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9lbmFibGVGcm9udEFuZEJhY2tncm91bmRTd2l0Y2ggPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5fb25FbnRlckZvcmdlR3JvdW5kLCB0aGlzKTtcbiAgICAgICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLl9vbkVudGVyQmFja2dyb3VuZCwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMuX29uRW50ZXJGb3JnZUdyb3VuZCwgdGhpcyk7XG4gICAgICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMuX29uRW50ZXJCYWNrZ3JvdW5kLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGVuYWJsZUZyb250QW5kQmFja2dyb3VuZFN3aXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUZyb250QW5kQmFja2dyb3VuZFN3aXRjaDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uRW50ZXJCYWNrZ3JvdW5kKCkge1xuICAgICAgICB0aGlzLl9lbnRlckJhY2tncm91bmRUaW1lID0gRGF0ZS50aW1lTm93KCk7XG4gICAgICAgIHRoaXMub25FbnRlckJhY2tncm91bmQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkVudGVyRm9yZ2VHcm91bmQoKSB7XG4gICAgICAgIGxldCBub3cgPSBEYXRlLnRpbWVOb3coKTtcbiAgICAgICAgbGV0IGluQmFja2dyb3VuZFRpbWUgPSBub3cgLSB0aGlzLl9lbnRlckJhY2tncm91bmRUaW1lO1xuICAgICAgICB0aGlzLm9uRW50ZXJGb3JnZWdyb3VuZChpbkJhY2tncm91bmRUaW1lKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FbnRlckZvcmdlZ3JvdW5kKGluQmFja2dyb3VuZFRpbWU6IG51bWJlcikge1xuXG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkVudGVyQmFja2dyb3VuZCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblNjcm9sbFRvcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2N2Um9vdCkge1xuICAgICAgICAgICAgdGhpcy5zY3ZSb290LnN0b3BBdXRvU2Nyb2xsKCk7XG4gICAgICAgICAgICB0aGlzLnNjdlJvb3Quc2Nyb2xsVG9Ub3AoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==