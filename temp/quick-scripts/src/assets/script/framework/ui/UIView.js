"use strict";
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