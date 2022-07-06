
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/adaptor/Adaptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d316/ErghHD7bOW3XBySzv', 'Adaptor');
// script/framework/adaptor/Adaptor.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adaptor = void 0;
const Singleton_1 = require("../base/Singleton");
const Framework_1 = require("../Framework");
var ScreenAdaptType;
(function (ScreenAdaptType) {
    /**@description 无处理 */
    ScreenAdaptType[ScreenAdaptType["None"] = 0] = "None";
    /**@description 放大 */
    ScreenAdaptType[ScreenAdaptType["Increase"] = 1] = "Increase";
    /**@description 缩小 */
    ScreenAdaptType[ScreenAdaptType["Decrease"] = 2] = "Decrease";
    /**@description 最大化，不能在进行拉伸扩大了 */
    ScreenAdaptType[ScreenAdaptType["Max"] = 3] = "Max";
})(ScreenAdaptType || (ScreenAdaptType = {}));
function instance() {
    return Singleton_1.getSingleton(Adaptor);
}
class Adaptor {
    constructor() {
        this._logTag = "[Adaptor]";
        this.canvas = null;
        /**@description 是否需要进行全屏幕适配 */
        this.screenAdaptType = ScreenAdaptType.None;
        this.node = null;
        /**最大允许屏幕比率 */
        this.MAX_RATE = 2.4;
        this.designResolution = null;
        this.landscapeHeight = 0;
        this.protraitHeight = 0;
        this.waitScorllY = null;
        this.isFirstResize = true;
        this._isShowKeyboard = false;
        this._maxLandscapeHeight = 0;
    }
    static Instance() { return this._instance || (this._instance = new Adaptor()); }
    get isShowKeyboard() {
        return instance()._isShowKeyboard;
    }
    set isShowKeyboard(value) {
        let me = instance();
        //let content = value ? "键盘显示!!!" : "键盘隐藏!!!";
        //cc.log(me._logTag,`${content}`);
        me._isShowKeyboard = value;
        if (!value) {
            me._onResize(true);
        }
    }
    /**@description 全屏适配 */
    fullScreenAdapt(node, adapter) {
        let me = instance();
        if (node && me.isNeedAdapt) {
            //这里，做下优化，只有该节点有选配组件，才适配到全屏
            let widget = node.getComponent(cc.Widget);
            if (!widget)
                return;
            node.setContentSize(cc.winSize);
            //这里可能父节点还没有，就不管了，按当前节点大小，把子节点做布局
            me.updateAlignment(node);
            if (adapter !== undefined && adapter !== null) {
                adapter.onFullScreenAdapt();
            }
        }
    }
    /**@description 是否需要做适配操作，当分辨率发生变化，只要ScreenAdaptType 不是None的情况 */
    get isNeedAdapt() {
        let me = instance();
        if (me.screenAdaptType != ScreenAdaptType.None) {
            return true;
        }
        return false;
    }
    updateAlignment(node) {
        let me = instance();
        let ch = node.children;
        for (let i = 0; i < ch.length; i++) {
            let child = ch[i];
            cc.updateAlignment(child);
            me.updateAlignment(child);
        }
    }
    onLoad(node) {
        let me = instance();
        me.node = node;
        me.canvas = node.getComponent(cc.Canvas);
        me.designResolution = me.canvas.designResolution.clone();
        me.onResize();
    }
    onDestroy() {
        let me = instance();
        me.node = null;
        me.isFirstResize = false;
    }
    /**@description 做屏幕适配 */
    doChangeResolution() {
        let me = instance();
        if (me.screenAdaptType == ScreenAdaptType.Increase) {
            let winsize = me.getWinsize();
            me.canvas.designResolution = winsize;
        }
        else if (me.screenAdaptType == ScreenAdaptType.Max) {
            let winsize = me.getMaxWinsize();
            if (CC_DEBUG)
                cc.log(`max winsize : ${winsize.width} * ${winsize.height}`);
            me.canvas.designResolution = winsize;
        }
        else {
            me.canvas.designResolution = me.designResolution;
        }
        if (me.isNeedAdapt) {
            // dispatch(td.Adaptor.ADAPT_SCREEN);
            Framework_1.Manager.uiManager.fullScreenAdapt();
        }
    }
    /**@description 浏览器适配初始化 */
    initBrowserAdaptor() {
        let me = instance();
        if (me.isBrowser && !CC_EDITOR) {
            cc.view.resizeWithBrowserSize(true);
            //调试浏览器
            if (CC_PREVIEW || cc.sys.platform == cc.sys.WECHAT_GAME) {
                me.recordHeight();
            }
            else {
                window.addEventListener("load", () => {
                    me.recordHeight();
                    window.addEventListener("resize", me.onResize, false);
                    window.addEventListener("orientationchange", me.onOrientationChange, false);
                }, false);
            }
        }
    }
    get isBrowser() {
        if (cc.sys.isBrowser) {
            return true;
        }
        return false;
    }
    get isSafari() {
        let me = instance();
        if (me.isBrowser && cc.sys.OS_IOS == cc.sys.os && cc.sys.browserType == cc.sys.BROWSER_TYPE_SAFARI) {
            return true;
        }
        return false;
    }
    onOrientationChange() {
        let me = instance();
        me.recordHeight();
        me.isFirstResize = false;
        //cc.log(me._logTag,`onOrientationChange`);
    }
    onResize() {
        let me = instance();
        me._onResize(false);
    }
    _onResize(isHideKeyboard) {
        let me = instance();
        //cc.log(me._logTag,`onResize`);
        if (me.node) {
            if (CC_PREVIEW || cc.sys.platform == cc.sys.WECHAT_GAME) {
                me.recordHeight();
                me.doAdapt();
            }
            else {
                if (me.isShowKeyboard) {
                    //cc.log(`键盘显示，不做重新适配处理`);
                    me.recordHeight();
                    return;
                }
                if (me.dviceDirection == "Landscape") {
                    let height = me.landscapeHeight;
                    let offsetY = 0;
                    me.recordHeight();
                    if (me.landscapeHeight != 0) {
                        offsetY = me.landscapeHeight - height; //Math.abs(me.landscapeHeight - height);
                        if (me.isFirstResize) {
                            if (CC_DEBUG)
                                cc.log(me._logTag, `在有导行条情况下进行刷新操作`);
                            me.waitScorllY = offsetY;
                            me.doAdapt();
                            me.isFirstResize = false;
                            return;
                        }
                    }
                }
                if (isHideKeyboard && me.dviceDirection == "Landscape") {
                    //cc.log(`maxHeigth : ${me._maxLandscapeHeight} curHeigth : ${me.landscapeHeight}`);
                    me.waitScorllY = Math.abs(me._maxLandscapeHeight - me.landscapeHeight);
                }
                me.isFirstResize = false;
                me.doAdapt();
                setTimeout(() => {
                    if (me.isShowKeyboard) {
                        //cc.log(`键盘显示11，不做重新适配处理`);
                        return;
                    }
                    if (me.dviceDirection == "Landscape") {
                        me.recordHeight();
                        cc.log(`cur scrolly : ${window.scrollY}`);
                        if (window.scrollY > 0 || me.isSafari) {
                            if (CC_DEBUG)
                                cc.log(me._logTag, me.dviceDirection);
                            if (me.isSafari) {
                                //在safari浏览器下，做一个强制移动，让浏览器的导行条显示出来,不然在ios13之前，最顶部分按钮无法点击
                                me.waitScorllY = window.scrollY > 0 ? -window.scrollY : -50;
                            }
                            else {
                                me.waitScorllY = -window.scrollY;
                            }
                            if (CC_DEBUG)
                                cc.log(me._logTag, `scrollY : ${me.waitScorllY}`);
                            me.doAdapt();
                        }
                        else {
                            me.doAdapt();
                        }
                    }
                    else if (me.dviceDirection == "Portrait") {
                        if (me.protraitHeight > window.innerHeight) {
                            me.waitScorllY = (me.protraitHeight - window.innerHeight);
                        }
                        me.recordHeight();
                        me.doAdapt();
                    }
                }, 505);
            }
        }
    }
    doAdapt() {
        let me = instance();
        if (me.canvas) {
            if (me.waitScorllY != null) {
                let top = me.waitScorllY;
                if (CC_DEBUG)
                    cc.log(me._logTag, `scroll top : ${top}`);
                if (window.scrollTo) {
                    window.scrollTo(0, top);
                }
                me.waitScorllY = null;
            }
            me.calculateNeedFullScreenAdapt();
            me.doChangeResolution();
        }
        else {
            if (CC_DEBUG)
                cc.log(me._logTag, `等待场景加载完成做适配`);
        }
    }
    //记录屏幕高度
    recordHeight() {
        if (window.innerWidth && window.innerHeight) {
            let me = instance();
            if (me.dviceDirection == "Landscape") {
                me.landscapeHeight = window.innerHeight;
                me._maxLandscapeHeight = Math.max(me._maxLandscapeHeight, me.landscapeHeight);
            }
            else if (me.dviceDirection == "Portrait") {
                me.protraitHeight = Math.max(window.innerWidth, window.innerHeight);
            }
        }
    }
    getWinsize() {
        let me = instance();
        let frameSize = me.getFrameSize();
        let width = frameSize.width * me.designResolution.height / frameSize.height;
        let height = me.designResolution.height;
        return cc.size(width, height);
    }
    /**@description 最大化窗口大小 */
    getMaxWinsize() {
        let me = instance();
        //实际当前窗口的宽度
        let height = me.designResolution.height;
        let width = height * me.MAX_RATE;
        return cc.size(width, height);
    }
    getFrameSize() {
        let me = instance();
        let frameSize = cc.view.getFrameSize();
        let innerSize = me.windowInnerSize;
        let size = frameSize.clone();
        if (!CC_JSB && !CC_PREVIEW) {
            size = innerSize;
        }
        return size;
    }
    /**计算是否需要进行全屏幕适配 */
    calculateNeedFullScreenAdapt() {
        let me = instance();
        //当前设计分辨率的宽高比
        let design = me.designResolution.width / me.designResolution.height;
        let frameSize = me.getFrameSize();
        let rate = frameSize.width / frameSize.height;
        if (me.dviceDirection == "Portrait" || (me.dviceDirection == '' && design < 1)) {
            design = 1 / design;
            rate = 1 / rate;
        }
        if (CC_DEBUG)
            cc.log(me._logTag, `design : ${design} real : ${rate}`);
        me.screenAdaptType = ScreenAdaptType.None;
        if (design == rate) {
            //相等比率，
            if (CC_DEBUG)
                cc.log(me._logTag, `相等比率`);
        }
        else if (rate < design) {
            me.screenAdaptType = ScreenAdaptType.Decrease;
            if (CC_DEBUG)
                cc.log(me._logTag, `当前设计比率大于实际比率，按宽进行适配，上下有黑边`);
        }
        else {
            if (CC_DEBUG)
                cc.log(me._logTag, `当前设计比率小于实际比率，将会对支持全屏的界面进行重重布局`);
            if (rate >= me.MAX_RATE) {
                if (CC_DEBUG)
                    cc.log(me._logTag, `超过上限比率，按最大值来`);
                me.screenAdaptType = ScreenAdaptType.Max;
            }
            else {
                me.screenAdaptType = ScreenAdaptType.Increase;
            }
        }
    }
    /**@description 当前是否处于横屏状态 */
    get dviceDirection() {
        if ((window.orientation != undefined || window.orientation != null) && (window.orientation == 90 || window.orientation == -90)) {
            return "Landscape";
        }
        if ((window.orientation != undefined || window.orientation != null) && (window.orientation == 0 || window.orientation == 180)) {
            return "Portrait";
        }
        return "";
    }
    get windowInnerSize() {
        let size = cc.Size.ZERO.clone();
        if (window.innerHeight && window.innerWidth) {
            let w = window.innerWidth;
            let h = window.innerHeight;
            let isLandscape = w >= h;
            if (!cc.sys.isMobile || isLandscape) {
                size.width = w;
                size.height = h;
            }
            else {
                size.width = h;
                size.height = w;
            }
        }
        return size;
    }
}
exports.Adaptor = Adaptor;
Adaptor._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2FkYXB0b3IvQWRhcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBaUQ7QUFDakQsNENBQXVDO0FBSXZDLElBQUssZUFTSjtBQVRELFdBQUssZUFBZTtJQUNoQixzQkFBc0I7SUFDdEIscURBQUksQ0FBQTtJQUNKLHFCQUFxQjtJQUNyQiw2REFBUSxDQUFBO0lBQ1IscUJBQXFCO0lBQ3JCLDZEQUFRLENBQUE7SUFDUixpQ0FBaUM7SUFDakMsbURBQUcsQ0FBQTtBQUNQLENBQUMsRUFUSSxlQUFlLEtBQWYsZUFBZSxRQVNuQjtBQUVELFNBQVMsUUFBUTtJQUNiLE9BQU8sd0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsTUFBYSxPQUFPO0lBQXBCO1FBQ1ksWUFBTyxHQUFHLFdBQVcsQ0FBQztRQUd2QixXQUFNLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLDhCQUE4QjtRQUN0QixvQkFBZSxHQUFvQixlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3hELFNBQUksR0FBWSxJQUFJLENBQUM7UUFFN0IsY0FBYztRQUNHLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFFeEIscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHdCQUFtQixHQUFHLENBQUMsQ0FBQztJQWtVcEMsQ0FBQztJQWpWVSxNQUFNLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQWdCdkYsSUFBVyxjQUFjO1FBQ3JCLE9BQU8sUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxJQUFXLGNBQWMsQ0FBQyxLQUFLO1FBQzNCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLDhDQUE4QztRQUM5QyxrQ0FBa0M7UUFDbEMsRUFBRSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsdUJBQXVCO0lBQ2hCLGVBQWUsQ0FBQyxJQUFhLEVBQUUsT0FBMEI7UUFDNUQsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtZQUN4QiwyQkFBMkI7WUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxpQ0FBaUM7WUFDakMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDM0MsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDL0I7U0FDSjtJQUNMLENBQUM7SUFFRCxpRUFBaUU7SUFDakUsSUFBVyxXQUFXO1FBQ2xCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUksRUFBRSxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQzVDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU8sZUFBZSxDQUFDLElBQWE7UUFDakMsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFhO1FBQ3ZCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2YsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6RCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLFNBQVM7UUFDWixJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNmLEVBQUUsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCx3QkFBd0I7SUFDaEIsa0JBQWtCO1FBQ3RCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUksRUFBRSxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ2hELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztTQUN4QzthQUFNLElBQUksRUFBRSxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ2xELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNqQyxJQUFJLFFBQVE7Z0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsT0FBTyxDQUFDLEtBQUssTUFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMzRSxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztTQUN4QzthQUFNO1lBQ0gsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDcEQ7UUFDRCxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFDaEIscUNBQXFDO1lBQ3JDLG1CQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUdELDJCQUEyQjtJQUNwQixrQkFBa0I7UUFDckIsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxFQUFFLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEMsT0FBTztZQUNQLElBQUksVUFBVSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO2dCQUNyRCxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7b0JBQ2pDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDYjtTQUNKO0lBQ0wsQ0FBQztJQUVELElBQVcsU0FBUztRQUNoQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBWSxRQUFRO1FBQ2hCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUksRUFBRSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQ2hHLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU8sbUJBQW1CO1FBQ3ZCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsQixFQUFFLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN6QiwyQ0FBMkM7SUFDL0MsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxTQUFTLENBQUMsY0FBdUI7UUFDckMsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEIsZ0NBQWdDO1FBQ2hDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtZQUNULElBQUksVUFBVSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO2dCQUNyRCxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtpQkFDSTtnQkFFRCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUU7b0JBQ25CLDBCQUEwQjtvQkFDMUIsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNsQixPQUFPO2lCQUNWO2dCQUVELElBQUksRUFBRSxDQUFDLGNBQWMsSUFBSSxXQUFXLEVBQUU7b0JBQ2xDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQ2hDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNsQixJQUFJLEVBQUUsQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFO3dCQUN6QixPQUFPLEdBQUcsRUFBRSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQSx3Q0FBd0M7d0JBQzlFLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRTs0QkFDbEIsSUFBSSxRQUFRO2dDQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOzRCQUNuRCxFQUFFLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQzs0QkFDekIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNiLEVBQUUsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDOzRCQUN6QixPQUFPO3lCQUNWO3FCQUNKO2lCQUNKO2dCQUVELElBQUksY0FBYyxJQUFJLEVBQUUsQ0FBQyxjQUFjLElBQUksV0FBVyxFQUFFO29CQUNwRCxvRkFBb0Y7b0JBQ3BGLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUMxRTtnQkFFRCxFQUFFLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDekIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUViLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFO3dCQUNuQiw0QkFBNEI7d0JBQzVCLE9BQU87cUJBQ1Y7b0JBQ0QsSUFBSSxFQUFFLENBQUMsY0FBYyxJQUFJLFdBQVcsRUFBRTt3QkFDbEMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNsQixFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFOzRCQUNuQyxJQUFJLFFBQVE7Z0NBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDcEQsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO2dDQUNiLHdEQUF3RDtnQ0FDeEQsRUFBRSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs2QkFDL0Q7aUNBQU07Z0NBQ0gsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7NkJBQ3BDOzRCQUNELElBQUksUUFBUTtnQ0FBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs0QkFDaEUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO3lCQUNoQjs2QkFBTTs0QkFDSCxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQ2hCO3FCQUNKO3lCQUFNLElBQUksRUFBRSxDQUFDLGNBQWMsSUFBSSxVQUFVLEVBQUU7d0JBQ3hDLElBQUksRUFBRSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFOzRCQUN4QyxFQUFFLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQzdEO3dCQUNELEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDbEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUNoQjtnQkFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDWDtTQUNKO0lBQ0wsQ0FBQztJQUVPLE9BQU87UUFDWCxJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUNwQixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDWCxJQUFJLEVBQUUsQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUN4QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUN6QixJQUFJLFFBQVE7b0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUMzQjtnQkFDRCxFQUFFLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN6QjtZQUNELEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO2FBQ0k7WUFDRCxJQUFJLFFBQVE7Z0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDQSxZQUFZO1FBQ2hCLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3pDLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLElBQUksRUFBRSxDQUFDLGNBQWMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2xDLEVBQUUsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNqRjtpQkFBTSxJQUFJLEVBQUUsQ0FBQyxjQUFjLElBQUksVUFBVSxFQUFFO2dCQUN4QyxFQUFFLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFFdkU7U0FDSjtJQUNMLENBQUM7SUFFTyxVQUFVO1FBQ2QsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQzVFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMEJBQTBCO0lBQ2xCLGFBQWE7UUFDakIsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEIsV0FBVztRQUNYLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDakMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUNwQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDbkMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEIsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQkFBbUI7SUFDWCw0QkFBNEI7UUFDaEMsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEIsYUFBYTtRQUNiLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUNwRSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksRUFBRSxDQUFDLGNBQWMsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxJQUFJLEVBQUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDNUUsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDcEIsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDbkI7UUFDRCxJQUFJLFFBQVE7WUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxNQUFNLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV0RSxFQUFFLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2hCLE9BQU87WUFDUCxJQUFJLFFBQVE7Z0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztZQUM5QyxJQUFJLFFBQVE7Z0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLDJCQUEyQixDQUFDLENBQUM7U0FDakU7YUFBTTtZQUNILElBQUksUUFBUTtnQkFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsK0JBQStCLENBQUMsQ0FBQztZQUNsRSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUNyQixJQUFJLFFBQVE7b0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFBO2dCQUNoRCxFQUFFLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0gsRUFBRSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO2FBQ2pEO1NBQ0o7SUFDTCxDQUFDO0lBRUQsNkJBQTZCO0lBQzdCLElBQVksY0FBYztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1SCxPQUFPLFdBQVcsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUMzSCxPQUFPLFVBQVUsQ0FBQztTQUNyQjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQVksZUFBZTtRQUN2QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN6QyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDM0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNuQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNuQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7QUFuVkwsMEJBb1ZDO0FBbFZrQixpQkFBUyxHQUFZLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNpbmdsZXRvbiB9IGZyb20gXCIuLi9iYXNlL1NpbmdsZXRvblwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9GcmFtZXdvcmtcIjtcblxudHlwZSBEZXZpY2VEaXJlY3Rpb24gPSBcIlwiIHwgXCJMYW5kc2NhcGVcIiB8IFwiUG9ydHJhaXRcIjtcblxuZW51bSBTY3JlZW5BZGFwdFR5cGUge1xuICAgIC8qKkBkZXNjcmlwdGlvbiDml6DlpITnkIYgKi9cbiAgICBOb25lLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDmlL7lpKcgKi9cbiAgICBJbmNyZWFzZSxcbiAgICAvKipAZGVzY3JpcHRpb24g57yp5bCPICovXG4gICAgRGVjcmVhc2UsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOacgOWkp+WMlu+8jOS4jeiDveWcqOi/m+ihjOaLieS8uOaJqeWkp+S6hiAqL1xuICAgIE1heCxcbn1cblxuZnVuY3Rpb24gaW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIGdldFNpbmdsZXRvbihBZGFwdG9yKTtcbn1cblxuZXhwb3J0IGNsYXNzIEFkYXB0b3Ige1xuICAgIHByaXZhdGUgX2xvZ1RhZyA9IFwiW0FkYXB0b3JdXCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBZGFwdG9yID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IEFkYXB0b3IoKSk7IH1cbiAgICBwdWJsaWMgY2FudmFzOiBjYy5DYW52YXMgPSBudWxsO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDmmK/lkKbpnIDopoHov5vooYzlhajlsY/luZXpgILphY0gKi9cbiAgICBwcml2YXRlIHNjcmVlbkFkYXB0VHlwZTogU2NyZWVuQWRhcHRUeXBlID0gU2NyZWVuQWRhcHRUeXBlLk5vbmU7XG4gICAgcHJpdmF0ZSBub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8qKuacgOWkp+WFgeiuuOWxj+W5leavlOeOhyAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgTUFYX1JBVEUgPSAyLjQ7XG5cbiAgICBwcml2YXRlIGRlc2lnblJlc29sdXRpb246IGNjLlNpemUgPSBudWxsO1xuICAgIHByaXZhdGUgbGFuZHNjYXBlSGVpZ2h0ID0gMDtcbiAgICBwcml2YXRlIHByb3RyYWl0SGVpZ2h0ID0gMDtcbiAgICBwcml2YXRlIHdhaXRTY29ybGxZID0gbnVsbDtcbiAgICBwcml2YXRlIGlzRmlyc3RSZXNpemUgPSB0cnVlO1xuICAgIHByaXZhdGUgX2lzU2hvd0tleWJvYXJkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbWF4TGFuZHNjYXBlSGVpZ2h0ID0gMDtcbiAgICBwdWJsaWMgZ2V0IGlzU2hvd0tleWJvYXJkKCkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UoKS5faXNTaG93S2V5Ym9hcmQ7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgaXNTaG93S2V5Ym9hcmQodmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gaW5zdGFuY2UoKTtcbiAgICAgICAgLy9sZXQgY29udGVudCA9IHZhbHVlID8gXCLplK7nm5jmmL7npLohISFcIiA6IFwi6ZSu55uY6ZqQ6JePISEhXCI7XG4gICAgICAgIC8vY2MubG9nKG1lLl9sb2dUYWcsYCR7Y29udGVudH1gKTtcbiAgICAgICAgbWUuX2lzU2hvd0tleWJvYXJkID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgbWUuX29uUmVzaXplKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWFqOWxj+mAgumFjSAqL1xuICAgIHB1YmxpYyBmdWxsU2NyZWVuQWRhcHQobm9kZTogY2MuTm9kZSwgYWRhcHRlcj86IElGdWxsU2NyZWVuQWRhcHQpIHtcbiAgICAgICAgbGV0IG1lID0gaW5zdGFuY2UoKTtcbiAgICAgICAgaWYgKG5vZGUgJiYgbWUuaXNOZWVkQWRhcHQpIHtcbiAgICAgICAgICAgIC8v6L+Z6YeM77yM5YGa5LiL5LyY5YyW77yM5Y+q5pyJ6K+l6IqC54K55pyJ6YCJ6YWN57uE5Lu277yM5omN6YCC6YWN5Yiw5YWo5bGPXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgICAgIGlmICghd2lkZ2V0KSByZXR1cm47XG4gICAgICAgICAgICBub2RlLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xuICAgICAgICAgICAgLy/ov5nph4zlj6/og73niLboioLngrnov5jmsqHmnInvvIzlsLHkuI3nrqHkuobvvIzmjInlvZPliY3oioLngrnlpKflsI/vvIzmiorlrZDoioLngrnlgZrluIPlsYBcbiAgICAgICAgICAgIG1lLnVwZGF0ZUFsaWdubWVudChub2RlKTtcbiAgICAgICAgICAgIGlmIChhZGFwdGVyICE9PSB1bmRlZmluZWQgJiYgYWRhcHRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFkYXB0ZXIub25GdWxsU2NyZWVuQWRhcHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDmmK/lkKbpnIDopoHlgZrpgILphY3mk43kvZzvvIzlvZPliIbovqjnjoflj5HnlJ/lj5jljJbvvIzlj6ropoFTY3JlZW5BZGFwdFR5cGUg5LiN5pivTm9uZeeahOaDheWGtSAqL1xuICAgIHB1YmxpYyBnZXQgaXNOZWVkQWRhcHQoKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIGlmIChtZS5zY3JlZW5BZGFwdFR5cGUgIT0gU2NyZWVuQWRhcHRUeXBlLk5vbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUFsaWdubWVudChub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIGxldCBjaCA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoW2ldO1xuICAgICAgICAgICAgY2MudXBkYXRlQWxpZ25tZW50KGNoaWxkKTtcbiAgICAgICAgICAgIG1lLnVwZGF0ZUFsaWdubWVudChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Mb2FkKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IG1lID0gaW5zdGFuY2UoKTtcbiAgICAgICAgbWUubm9kZSA9IG5vZGU7XG4gICAgICAgIG1lLmNhbnZhcyA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbnZhcyk7XG4gICAgICAgIG1lLmRlc2lnblJlc29sdXRpb24gPSBtZS5jYW52YXMuZGVzaWduUmVzb2x1dGlvbi5jbG9uZSgpO1xuICAgICAgICBtZS5vblJlc2l6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkRlc3Ryb3koKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIG1lLm5vZGUgPSBudWxsO1xuICAgICAgICBtZS5pc0ZpcnN0UmVzaXplID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWBmuWxj+W5lemAgumFjSAqL1xuICAgIHByaXZhdGUgZG9DaGFuZ2VSZXNvbHV0aW9uKCkge1xuICAgICAgICBsZXQgbWUgPSBpbnN0YW5jZSgpO1xuICAgICAgICBpZiAobWUuc2NyZWVuQWRhcHRUeXBlID09IFNjcmVlbkFkYXB0VHlwZS5JbmNyZWFzZSkge1xuICAgICAgICAgICAgbGV0IHdpbnNpemUgPSBtZS5nZXRXaW5zaXplKCk7XG4gICAgICAgICAgICBtZS5jYW52YXMuZGVzaWduUmVzb2x1dGlvbiA9IHdpbnNpemU7XG4gICAgICAgIH0gZWxzZSBpZiAobWUuc2NyZWVuQWRhcHRUeXBlID09IFNjcmVlbkFkYXB0VHlwZS5NYXgpIHtcbiAgICAgICAgICAgIGxldCB3aW5zaXplID0gbWUuZ2V0TWF4V2luc2l6ZSgpO1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2coYG1heCB3aW5zaXplIDogJHt3aW5zaXplLndpZHRofSAqICR7d2luc2l6ZS5oZWlnaHR9YCk7XG4gICAgICAgICAgICBtZS5jYW52YXMuZGVzaWduUmVzb2x1dGlvbiA9IHdpbnNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5jYW52YXMuZGVzaWduUmVzb2x1dGlvbiA9IG1lLmRlc2lnblJlc29sdXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lLmlzTmVlZEFkYXB0KSB7XG4gICAgICAgICAgICAvLyBkaXNwYXRjaCh0ZC5BZGFwdG9yLkFEQVBUX1NDUkVFTik7XG4gICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5mdWxsU2NyZWVuQWRhcHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOa1j+iniOWZqOmAgumFjeWIneWni+WMliAqL1xuICAgIHB1YmxpYyBpbml0QnJvd3NlckFkYXB0b3IoKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIGlmIChtZS5pc0Jyb3dzZXIgJiYgIUNDX0VESVRPUikge1xuICAgICAgICAgICAgY2Mudmlldy5yZXNpemVXaXRoQnJvd3NlclNpemUodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8v6LCD6K+V5rWP6KeI5ZmoXG4gICAgICAgICAgICBpZiAoQ0NfUFJFVklFVyB8fCBjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XG4gICAgICAgICAgICAgICAgbWUucmVjb3JkSGVpZ2h0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnJlY29yZEhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtZS5vblJlc2l6ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIG1lLm9uT3JpZW50YXRpb25DaGFuZ2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzQnJvd3NlcigpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBpc1NhZmFyaSgpIHtcbiAgICAgICAgbGV0IG1lID0gaW5zdGFuY2UoKTtcbiAgICAgICAgaWYgKG1lLmlzQnJvd3NlciAmJiBjYy5zeXMuT1NfSU9TID09IGNjLnN5cy5vcyAmJiBjYy5zeXMuYnJvd3NlclR5cGUgPT0gY2Muc3lzLkJST1dTRVJfVFlQRV9TQUZBUkkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uT3JpZW50YXRpb25DaGFuZ2UoKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIG1lLnJlY29yZEhlaWdodCgpO1xuICAgICAgICBtZS5pc0ZpcnN0UmVzaXplID0gZmFsc2U7XG4gICAgICAgIC8vY2MubG9nKG1lLl9sb2dUYWcsYG9uT3JpZW50YXRpb25DaGFuZ2VgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUmVzaXplKCkge1xuICAgICAgICBsZXQgbWUgPSBpbnN0YW5jZSgpO1xuICAgICAgICBtZS5fb25SZXNpemUoZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uUmVzaXplKGlzSGlkZUtleWJvYXJkOiBib29sZWFuKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIC8vY2MubG9nKG1lLl9sb2dUYWcsYG9uUmVzaXplYCk7XG4gICAgICAgIGlmIChtZS5ub2RlKSB7XG4gICAgICAgICAgICBpZiAoQ0NfUFJFVklFVyB8fCBjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XG4gICAgICAgICAgICAgICAgbWUucmVjb3JkSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgbWUuZG9BZGFwdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobWUuaXNTaG93S2V5Ym9hcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coYOmUruebmOaYvuekuu+8jOS4jeWBmumHjeaWsOmAgumFjeWkhOeQhmApO1xuICAgICAgICAgICAgICAgICAgICBtZS5yZWNvcmRIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZS5kdmljZURpcmVjdGlvbiA9PSBcIkxhbmRzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSBtZS5sYW5kc2NhcGVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRZID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbWUucmVjb3JkSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZS5sYW5kc2NhcGVIZWlnaHQgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IG1lLmxhbmRzY2FwZUhlaWdodCAtIGhlaWdodDsvL01hdGguYWJzKG1lLmxhbmRzY2FwZUhlaWdodCAtIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWUuaXNGaXJzdFJlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKG1lLl9sb2dUYWcsIGDlnKjmnInlr7zooYzmnaHmg4XlhrXkuIvov5vooYzliLfmlrDmk43kvZxgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS53YWl0U2NvcmxsWSA9IG9mZnNldFk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWUuZG9BZGFwdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLmlzRmlyc3RSZXNpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNIaWRlS2V5Ym9hcmQgJiYgbWUuZHZpY2VEaXJlY3Rpb24gPT0gXCJMYW5kc2NhcGVcIikge1xuICAgICAgICAgICAgICAgICAgICAvL2NjLmxvZyhgbWF4SGVpZ3RoIDogJHttZS5fbWF4TGFuZHNjYXBlSGVpZ2h0fSBjdXJIZWlndGggOiAke21lLmxhbmRzY2FwZUhlaWdodH1gKTtcbiAgICAgICAgICAgICAgICAgICAgbWUud2FpdFNjb3JsbFkgPSBNYXRoLmFicyhtZS5fbWF4TGFuZHNjYXBlSGVpZ2h0IC0gbWUubGFuZHNjYXBlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZS5pc0ZpcnN0UmVzaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWUuZG9BZGFwdCgpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZS5pc1Nob3dLZXlib2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coYOmUruebmOaYvuekujEx77yM5LiN5YGa6YeN5paw6YCC6YWN5aSE55CGYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lLmR2aWNlRGlyZWN0aW9uID09IFwiTGFuZHNjYXBlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLnJlY29yZEhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKGBjdXIgc2Nyb2xseSA6ICR7d2luZG93LnNjcm9sbFl9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPiAwIHx8IG1lLmlzU2FmYXJpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2cobWUuX2xvZ1RhZywgbWUuZHZpY2VEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZS5pc1NhZmFyaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WcqHNhZmFyaea1j+iniOWZqOS4i++8jOWBmuS4gOS4quW8uuWItuenu+WKqO+8jOiuqea1j+iniOWZqOeahOWvvOihjOadoeaYvuekuuWHuuadpSzkuI3nhLblnKhpb3MxM+S5i+WJje+8jOacgOmhtumDqOWIhuaMiemSruaXoOazleeCueWHu1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS53YWl0U2NvcmxsWSA9IHdpbmRvdy5zY3JvbGxZID4gMCA/IC13aW5kb3cuc2Nyb2xsWSA6IC01MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS53YWl0U2NvcmxsWSA9IC13aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2cobWUuX2xvZ1RhZywgYHNjcm9sbFkgOiAke21lLndhaXRTY29ybGxZfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLmRvQWRhcHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWUuZG9BZGFwdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lLmR2aWNlRGlyZWN0aW9uID09IFwiUG9ydHJhaXRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lLnByb3RyYWl0SGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWUud2FpdFNjb3JsbFkgPSAobWUucHJvdHJhaXRIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWUucmVjb3JkSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5kb0FkYXB0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCA1MDUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb0FkYXB0KCkge1xuICAgICAgICBsZXQgbWUgPSBpbnN0YW5jZSgpO1xuICAgICAgICBpZiAobWUuY2FudmFzKSB7XG4gICAgICAgICAgICBpZiAobWUud2FpdFNjb3JsbFkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBtZS53YWl0U2NvcmxsWTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhtZS5fbG9nVGFnLCBgc2Nyb2xsIHRvcCA6ICR7dG9wfWApO1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsVG8pIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1lLndhaXRTY29ybGxZID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lLmNhbGN1bGF0ZU5lZWRGdWxsU2NyZWVuQWRhcHQoKTtcbiAgICAgICAgICAgIG1lLmRvQ2hhbmdlUmVzb2x1dGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2cobWUuX2xvZ1RhZywgYOetieW+heWcuuaZr+WKoOi9veWujOaIkOWBmumAgumFjWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/orrDlvZXlsY/luZXpq5jluqZcbiAgICBwcml2YXRlIHJlY29yZEhlaWdodCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoICYmIHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgbGV0IG1lID0gaW5zdGFuY2UoKTtcbiAgICAgICAgICAgIGlmIChtZS5kdmljZURpcmVjdGlvbiA9PSBcIkxhbmRzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgbWUubGFuZHNjYXBlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgICAgIG1lLl9tYXhMYW5kc2NhcGVIZWlnaHQgPSBNYXRoLm1heChtZS5fbWF4TGFuZHNjYXBlSGVpZ2h0LCBtZS5sYW5kc2NhcGVIZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZS5kdmljZURpcmVjdGlvbiA9PSBcIlBvcnRyYWl0XCIpIHtcbiAgICAgICAgICAgICAgICBtZS5wcm90cmFpdEhlaWdodCA9IE1hdGgubWF4KHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFdpbnNpemUoKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIGxldCBmcmFtZVNpemUgPSBtZS5nZXRGcmFtZVNpemUoKTtcbiAgICAgICAgbGV0IHdpZHRoID0gZnJhbWVTaXplLndpZHRoICogbWUuZGVzaWduUmVzb2x1dGlvbi5oZWlnaHQgLyBmcmFtZVNpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgaGVpZ2h0ID0gbWUuZGVzaWduUmVzb2x1dGlvbi5oZWlnaHQ7XG4gICAgICAgIHJldHVybiBjYy5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDmnIDlpKfljJbnqpflj6PlpKflsI8gKi9cbiAgICBwcml2YXRlIGdldE1heFdpbnNpemUoKSB7XG4gICAgICAgIGxldCBtZSA9IGluc3RhbmNlKCk7XG4gICAgICAgIC8v5a6e6ZmF5b2T5YmN56qX5Y+j55qE5a695bqmXG4gICAgICAgIGxldCBoZWlnaHQgPSBtZS5kZXNpZ25SZXNvbHV0aW9uLmhlaWdodDtcbiAgICAgICAgbGV0IHdpZHRoID0gaGVpZ2h0ICogbWUuTUFYX1JBVEU7XG4gICAgICAgIHJldHVybiBjYy5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RnJhbWVTaXplKCkge1xuICAgICAgICBsZXQgbWUgPSBpbnN0YW5jZSgpO1xuICAgICAgICBsZXQgZnJhbWVTaXplID0gY2Mudmlldy5nZXRGcmFtZVNpemUoKTtcbiAgICAgICAgbGV0IGlubmVyU2l6ZSA9IG1lLndpbmRvd0lubmVyU2l6ZTtcbiAgICAgICAgbGV0IHNpemUgPSBmcmFtZVNpemUuY2xvbmUoKTtcbiAgICAgICAgaWYgKCFDQ19KU0IgJiYgIUNDX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHNpemUgPSBpbm5lclNpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuXG4gICAgLyoq6K6h566X5piv5ZCm6ZyA6KaB6L+b6KGM5YWo5bGP5bmV6YCC6YWNICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVOZWVkRnVsbFNjcmVlbkFkYXB0KCkge1xuICAgICAgICBsZXQgbWUgPSBpbnN0YW5jZSgpO1xuICAgICAgICAvL+W9k+WJjeiuvuiuoeWIhui+qOeOh+eahOWuvemrmOavlFxuICAgICAgICBsZXQgZGVzaWduID0gbWUuZGVzaWduUmVzb2x1dGlvbi53aWR0aCAvIG1lLmRlc2lnblJlc29sdXRpb24uaGVpZ2h0O1xuICAgICAgICBsZXQgZnJhbWVTaXplID0gbWUuZ2V0RnJhbWVTaXplKCk7XG4gICAgICAgIGxldCByYXRlID0gZnJhbWVTaXplLndpZHRoIC8gZnJhbWVTaXplLmhlaWdodDtcbiAgICAgICAgaWYgKG1lLmR2aWNlRGlyZWN0aW9uID09IFwiUG9ydHJhaXRcIiB8fCAobWUuZHZpY2VEaXJlY3Rpb24gPT0gJycgJiYgZGVzaWduIDwgMSkpIHtcbiAgICAgICAgICAgIGRlc2lnbiA9IDEgLyBkZXNpZ247XG4gICAgICAgICAgICByYXRlID0gMSAvIHJhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2cobWUuX2xvZ1RhZywgYGRlc2lnbiA6ICR7ZGVzaWdufSByZWFsIDogJHtyYXRlfWApO1xuXG4gICAgICAgIG1lLnNjcmVlbkFkYXB0VHlwZSA9IFNjcmVlbkFkYXB0VHlwZS5Ob25lO1xuICAgICAgICBpZiAoZGVzaWduID09IHJhdGUpIHtcbiAgICAgICAgICAgIC8v55u4562J5q+U546H77yMXG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhtZS5fbG9nVGFnLCBg55u4562J5q+U546HYCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA8IGRlc2lnbikge1xuICAgICAgICAgICAgbWUuc2NyZWVuQWRhcHRUeXBlID0gU2NyZWVuQWRhcHRUeXBlLkRlY3JlYXNlO1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2cobWUuX2xvZ1RhZywgYOW9k+WJjeiuvuiuoeavlOeOh+Wkp+S6juWunumZheavlOeOh++8jOaMieWuvei/m+ihjOmAgumFje+8jOS4iuS4i+aciem7kei+uWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2cobWUuX2xvZ1RhZywgYOW9k+WJjeiuvuiuoeavlOeOh+Wwj+S6juWunumZheavlOeOh++8jOWwhuS8muWvueaUr+aMgeWFqOWxj+eahOeVjOmdoui/m+ihjOmHjemHjeW4g+WxgGApO1xuICAgICAgICAgICAgaWYgKHJhdGUgPj0gbWUuTUFYX1JBVEUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhtZS5fbG9nVGFnLCBg6LaF6L+H5LiK6ZmQ5q+U546H77yM5oyJ5pyA5aSn5YC85p2lYClcbiAgICAgICAgICAgICAgICBtZS5zY3JlZW5BZGFwdFR5cGUgPSBTY3JlZW5BZGFwdFR5cGUuTWF4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5zY3JlZW5BZGFwdFR5cGUgPSBTY3JlZW5BZGFwdFR5cGUuSW5jcmVhc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5b2T5YmN5piv5ZCm5aSE5LqO5qiq5bGP54q25oCBICovXG4gICAgcHJpdmF0ZSBnZXQgZHZpY2VEaXJlY3Rpb24oKTogRGV2aWNlRGlyZWN0aW9uIHtcbiAgICAgICAgaWYgKCh3aW5kb3cub3JpZW50YXRpb24gIT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5vcmllbnRhdGlvbiAhPSBudWxsKSAmJiAod2luZG93Lm9yaWVudGF0aW9uID09IDkwIHx8IHdpbmRvdy5vcmllbnRhdGlvbiA9PSAtOTApKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJMYW5kc2NhcGVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHdpbmRvdy5vcmllbnRhdGlvbiAhPSB1bmRlZmluZWQgfHwgd2luZG93Lm9yaWVudGF0aW9uICE9IG51bGwpICYmICh3aW5kb3cub3JpZW50YXRpb24gPT0gMCB8fCB3aW5kb3cub3JpZW50YXRpb24gPT0gMTgwKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiUG9ydHJhaXRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB3aW5kb3dJbm5lclNpemUoKSB7XG4gICAgICAgIGxldCBzaXplID0gY2MuU2l6ZS5aRVJPLmNsb25lKCk7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgJiYgd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIGxldCBpc0xhbmRzY2FwZSA9IHcgPj0gaDtcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTW9iaWxlIHx8IGlzTGFuZHNjYXBlKSB7XG4gICAgICAgICAgICAgICAgc2l6ZS53aWR0aCA9IHc7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSBoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaXplLndpZHRoID0gaDtcbiAgICAgICAgICAgICAgICBzaXplLmhlaWdodCA9IHc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxufSJdfQ==