
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '28677ZXSZ1Au4QNZRC+wUw8', 'UIManager');
// script/framework/base/UIManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIManager = void 0;
const Defines_1 = require("./Defines");
const Framework_1 = require("../Framework");
/**@description 动态加载垃圾数据名 */
const DYNAMIC_LOAD_GARBAGE = "DYNAMIC_LOAD_GARBAGE";
/**@description 动画加载全局数据名 */
const DYNAMIC_LOAD_RETAIN_MEMORY = "DYNAMIC_LOAD_RETAIN_MEMORY";
class ViewDynamicLoadData {
    constructor(name = null) {
        this.local = new Map();
        this.remote = new Map();
        this.name = name;
    }
    /**@description 添加动态加载的本地资源 */
    addLocal(info, className = null) {
        if (info && info.url) {
            if (this.name == DYNAMIC_LOAD_GARBAGE) {
                // cc.error(`找不到资源持有者: ${info.url}`);
            }
            if (CC_DEBUG)
                Framework_1.Manager.uiManager.checkView(info.url, className);
            if (!this.local.has(info.url)) {
                this.local.set(info.url, info);
            }
        }
    }
    /**@description 添加动态加载的远程资源 */
    addRemote(info, className = null) {
        if (info && info.data && !this.remote.has(info.url)) {
            if (this.name == DYNAMIC_LOAD_GARBAGE) {
                // cc.error(`找不到资源持有者 : ${info.url}`);
            }
            if (CC_DEBUG)
                Framework_1.Manager.uiManager.checkView(info.url, className);
            Framework_1.Manager.cacheManager.remoteCaches.retainAsset(info);
            this.remote.set(info.url, info);
        }
    }
    /**@description 清除远程加载资源 */
    clear() {
        if (this.name == DYNAMIC_LOAD_GARBAGE) {
            //先输出
            let isShow = this.local.size > 0 || this.remote.size > 0;
            if (isShow) {
                cc.error(`当前未能释放资源如下:`);
            }
            if (this.local && this.local.size > 0) {
                cc.error("-----------local-----------");
                if (this.local) {
                    this.local.forEach((info) => {
                        cc.error(info.url);
                    });
                }
            }
            if (this.remote && this.remote.size > 0) {
                cc.error("-----------remote-----------");
                if (this.remote) {
                    this.remote.forEach((info, url) => {
                        cc.error(info.url);
                    });
                }
            }
        }
        else {
            //先清除当前资源的引用关系
            if (this.local) {
                this.local.forEach((info) => {
                    Framework_1.Manager.assetManager.releaseAsset(info);
                });
                this.local.clear();
            }
            if (this.remote) {
                this.remote.forEach((info, url) => {
                    Framework_1.Manager.cacheManager.remoteCaches.releaseAsset(info);
                });
                this.remote.clear();
            }
        }
    }
}
/**@description 界面数据，这里需要处理一个问题，当一个界面打开，收到另一个人的关闭，此时如果界面未加载完成
 * 可能导致另一个人关闭无效，等界面加载完成后，又显示出来
 */
class ViewData {
    constructor() {
        /**@description 界面是否已经加载 */
        this.isLoaded = false;
        /**@description 界面当前等待操作状态 */
        this.status = Defines_1.ViewStatus.WAITTING_NONE;
        /**@description 实际显示界面 */
        this.view = null;
        /**@description 等待加载完成回调 */
        this.finishCb = [];
        /**@description 等待获取界面回调 */
        this.getViewCb = [];
        /**是否预加载,不显示出来，但会加到当前场景上 */
        this.isPreload = false;
        /**@description 资源信息 */
        this.info = null;
        /**@description 界面动态加载的数据 */
        this.loadData = new ViewDynamicLoadData();
        this.node = null;
    }
    doGet(view, className, msg) {
        for (let i = 0; i < this.getViewCb.length; i++) {
            let cb = this.getViewCb[i];
            if (cb) {
                cb(view);
                if (CC_DEBUG)
                    cc.warn(`ViewData do get view : ${className} msg : ${msg}`);
            }
        }
        this.getViewCb = [];
    }
    doFinish(view, className, msg) {
        for (let i = 0; i < this.finishCb.length; i++) {
            let cb = this.finishCb[i];
            if (cb) {
                cb(view);
                if (CC_DEBUG)
                    cc.warn(`ViewData do finish view : ${className} msg : ${msg}`);
            }
        }
        this.finishCb = [];
    }
    doCallback(view, className, msg) {
        this.doFinish(view, className, msg);
        this.doGet(view, className, msg);
    }
}
class UIManager {
    constructor() {
        this._logTag = `[UIManager]`;
        /**@description 视图 */
        this._viewDatas = new Map();
        this._viewList = [];
        /**@description GC的间隔时间,目前暂定为进入完成指定场景，后，多少时间内没有界面打开或关闭操作，做GC操作释放内存 */
        this.GC_INTERVAL = 1500;
        /**@description 最后一次GC操作时间，当打开或关闭界面时，把当前GC时间重置为当前时间
         * 在进入到大厅1秒后无界面的关闭与打开，做GC内存释放操作
         */
        this._lastGCTime = 0;
        /**@description 是否需要做GC操作 */
        this._isNeedGC = false;
        /**@description 无主资源 */
        this.garbage = new ViewDynamicLoadData(DYNAMIC_LOAD_GARBAGE);
        /**@description 驻留内存资源 */
        this.retainMemory = new ViewDynamicLoadData(DYNAMIC_LOAD_RETAIN_MEMORY);
        this.uiLoading = null;
        this.toast = null;
    }
    static Instance() { return this._instance || (this._instance = new UIManager()); }
    getViewData(data) {
        let className = this.getClassName(data);
        if (!className)
            return null;
        let viewData = this._viewDatas.has(className) ? this._viewDatas.get(className) : null;
        return viewData;
    }
    getClassName(data) {
        if (!data)
            return null;
        let className = null;
        if (typeof data == "string") {
            className = data;
        }
        else {
            className = cc.js.getClassName(data);
        }
        return className;
    }
    preload(uiClass, bundle) {
        return this._open(uiClass, bundle, 0, true, null, null);
    }
    /**
     * @description open<T extends UIView>(config: { type: UIClass<T>, zIndex?: number, args?: any[] , delay?: number}) : Promise<T>
     * @param config 配置信息
     * @param config.type UIView
     * @param config.zIndex 节点层级，默认为0
     * @param config.args 传入的参数列表
     * @param config.delay >0 多少时间未加载界面完成显示加载动画，<=0 | undefined | null 不显示动画
     * @param config.name 界面名字，如 商城 首充
     * @example 示例
     * Manager.uiManager.open({type:GameLayer});
     * Manager.uiManager.open({type:GameLayer,delay:ViewDelay.delay});
     * Manager.uiManager.open({type:GameLayer,delay:ViewDelay.delay,zIndex:ViewZOrder.zero});
     * Manager.uiManager.open({type:GameLayer,delay:ViewDelay.delay,zIndex:ViewZOrder.zero,args:["aa","bb"]});
     *
     * @description 弃用接口 open<T extends UIView>(uiClass: UIClass<T>, zIndex?: number, ...args: any[]): Promise<T>
     * @param uiClass UIView
     * @param zIndex 节点层级
     * @param args 传入参数列表
     */
    open(config) {
        return this._open(config.type, config.bundle, config.zIndex ? config.zIndex : 0, false, config.args, config.delay, config.name);
    }
    _open(uiClass, bundle, zOrder = 0, isPreload, args, delay, name) {
        return new Promise((reslove, reject) => {
            if (!uiClass) {
                if (CC_DEBUG)
                    cc.log(`${this._logTag}open ui class error`);
                reslove(null);
                return;
            }
            let className = cc.js.getClassName(uiClass);
            G.Logger.log(`打开界面 ${className}`);
            let canvas = this.getCanvas();
            if (!canvas) {
                if (CC_DEBUG)
                    cc.error(`${this._logTag}找不到场景的Canvas节点`);
                reslove(null);
                return;
            }
            //打开界面时，更新GC时间
            this.recordGCTime();
            let viewData = this.getViewData(uiClass);
            if (viewData) {
                viewData.isPreload = isPreload;
                //已经加载
                if (viewData.isLoaded) {
                    viewData.status = Defines_1.ViewStatus.WAITTING_NONE;
                    if (!isPreload) {
                        if (viewData.view && cc.isValid(viewData.node)) {
                            viewData.node.zIndex = zOrder;
                            if (!viewData.node.parent) {
                                viewData.node.parent = this.getCanvas();
                            }
                            Framework_1.Manager.adaptor.fullScreenAdapt(viewData.node);
                            viewData.view.show(args);
                        }
                    }
                    this._viewList.push(viewData);
                    reslove(viewData.view);
                    return;
                }
                else {
                    viewData.status = Defines_1.ViewStatus.WAITTING_NONE;
                    if (!isPreload) {
                        if (this.uiLoading)
                            this.uiLoading.show(delay, name);
                    }
                    //正在加载中
                    if (CC_DEBUG)
                        cc.warn(`${this._logTag}${className} 正在加载中...`);
                    viewData.finishCb.push(reslove);
                    return;
                }
            }
            else {
                viewData = new ViewData();
                viewData.loadData.name = className;
                let prefabUrl = uiClass.getPrefabUrl();
                viewData.isPreload = isPreload;
                this._viewDatas.set(className, viewData);
                let progressCallback = null;
                // if (!isPreload) {
                if (this.uiLoading)
                    this.uiLoading.show(delay, name);
                //预加载界面不显示进度
                progressCallback = (completedCount, totalCount, item) => {
                    let progress = Math.ceil((completedCount / totalCount) * 100);
                    dispatch("loadGameProgress", progress);
                    if (this.uiLoading)
                        this.uiLoading.updateProgress(progress);
                };
                // }
                this.loadPrefab(bundle, prefabUrl, progressCallback)
                    .then((prefab) => {
                    viewData.info = new Defines_1.ResourceInfo;
                    viewData.info.url = prefabUrl;
                    viewData.info.type = cc.Prefab;
                    viewData.info.data = prefab;
                    viewData.info.bundle = bundle;
                    this.createNode(className, uiClass, reslove, prefab, args, zOrder, bundle, isPreload);
                    if (this.uiLoading)
                        this.uiLoading.hide();
                }).catch((reason) => {
                    viewData.isLoaded = true;
                    cc.error(reason);
                    this.close(uiClass);
                    viewData.doCallback(null, className, "打开界面异常");
                    reslove(null);
                    let uiName = "";
                    if (CC_DEBUG) {
                        uiName = className;
                    }
                    if (name) {
                        uiName = name;
                    }
                    if (this.toast)
                        this.toast.show(`加载界面${uiName}失败，请重试`);
                    if (this.uiLoading)
                        this.uiLoading.hide();
                });
            }
        });
    }
    _addComponent(uiNode, uiClass, viewData, className, zOrder, args, bundle) {
        if (uiNode) {
            //挂载脚本
            let view = uiNode.getComponent(uiClass);
            if (!view) {
                view = uiNode.addComponent(uiClass);
                if (!view) {
                    if (CC_DEBUG)
                        cc.error(`${this._logTag}挂载脚本失败 : ${className}`);
                    return null;
                }
                else {
                    if (CC_DEBUG)
                        cc.log(`${this._logTag}挂载脚本 : ${className}`);
                }
            }
            Framework_1.Manager.adaptor.fullScreenAdapt(uiNode);
            view.className = className;
            view.bundle = bundle;
            viewData.view = view;
            //去掉init函数，处理放在onLoad中，
            view._args = args;
            //界面显示在屏幕中间
            let widget = view.getComponent(cc.Widget);
            if (widget) {
                if (CC_DEBUG)
                    cc.warn(`${this._logTag}你已经添加了cc.Widget组件，将会更改成居中模块`);
                widget.isAlignHorizontalCenter = true;
                widget.horizontalCenter = 0;
                widget.isAlignVerticalCenter = true;
                widget.verticalCenter = 0;
            }
            else {
                widget = view.addComponent(cc.Widget);
                widget.isAlignHorizontalCenter = true;
                widget.horizontalCenter = 0;
                widget.isAlignVerticalCenter = true;
                widget.verticalCenter = 0;
            }
            if (!viewData.isPreload) {
                uiNode.parent = this.getCanvas();
                uiNode.zIndex = zOrder;
            }
            return view;
        }
        else {
            return null;
        }
    }
    createNode(className, uiClass, reslove, data, args, zOrder, bundle, isPreload) {
        let viewData = this._viewDatas.get(className);
        viewData.isLoaded = true;
        if (viewData.status == Defines_1.ViewStatus.WAITTING_CLOSE) {
            //加载过程中有人关闭了界面
            reslove(null);
            if (CC_DEBUG)
                cc.warn(`${this._logTag}${className}正等待关闭`);
            //如果此时有地方正在获取界面，直接返回空
            viewData.doCallback(null, className, "获取界内已经关闭");
            return;
        }
        let uiNode = cc.instantiate(data);
        viewData.node = uiNode;
        let view = this._addComponent(uiNode, uiClass, viewData, className, zOrder, args, bundle);
        if (!view) {
            reslove(null);
            return;
        }
        this._viewList.push(viewData);
        if (viewData.status == Defines_1.ViewStatus.WATITING_HIDE) {
            //加载过程中有人隐藏了界面
            view.hide();
            if (CC_DEBUG)
                cc.warn(`${this._logTag}加载过程隐藏了界面${className}`);
            reslove(view);
            viewData.doCallback(view, className, "加载完成，但加载过程中被隐藏");
        }
        else {
            if (CC_DEBUG)
                cc.log(`${this._logTag}open view : ${className}`);
            if (!isPreload) {
                view.show(args);
            }
            reslove(view);
            viewData.doCallback(view, className, "加载完成，回调之前加载中的界面");
        }
    }
    loadPrefab(bundle, url, progressCallback) {
        return new Promise((resolove, reject) => {
            if (bundle == undefined || bundle == "" || bundle == null) {
                bundle = Defines_1.BUNDLE_RESOURCES;
            }
            Framework_1.Manager.assetManager.load(bundle, url, cc.Prefab, progressCallback, (data) => {
                if (data && data.data && data.data instanceof cc.Prefab) {
                    resolove(data.data);
                }
                else {
                    reject(`加载prefab : ${url} 失败`);
                }
            });
        });
    }
    getCanvas() {
        let rootScene = cc.director.getScene();
        if (!rootScene) {
            if (CC_DEBUG)
                cc.error(`${this._logTag}当前场景为空 ： ${cc.director.getScene().name}`);
            return null;
        }
        let root = rootScene.getChildByName("Canvas");
        if (!root) {
            if (CC_DEBUG)
                cc.error(`${this._logTag}当前场景上找不到 Canvas 节点`);
            return null;
        }
        return root;
    }
    onDirectorAfterDraw() {
        let cando = true;
        let hasWaitingClose = false;
        this._viewDatas.forEach((viewData) => {
            if (viewData) {
                //只要有一个界面没加载完成，都不能进行处理
                if (!viewData.isLoaded)
                    cando = false;
                if (viewData.status == Defines_1.ViewStatus.WAITTING_CLOSE)
                    hasWaitingClose = true;
            }
        });
        if (hasWaitingClose && cando) {
            console.time("释放资源");
            this._viewDatas.forEach((viewData, className) => {
                if (viewData && viewData.status == Defines_1.ViewStatus.WAITTING_CLOSE) {
                    console.time(`${this._logTag} close view : ${className}`);
                    if (cc.isValid(viewData.node)) {
                        viewData.node.removeFromParent(false);
                        viewData.node.destroy();
                    }
                    // viewData.loadData.clear();
                    // Manager.assetManager.releaseAsset(viewData.info);
                    this._viewDatas.delete(className);
                    console.timeEnd(`${this._logTag} close view : ${className}`);
                }
            });
            //删除无主加载数据
            // this.garbage.clear()
            console.timeEnd("释放资源");
            //此处GC操作另行做优化，不能过度的GC会造成动画的卡顿，需要挑一个比较空闲的时间段来做GC操作
            //cc.sys.garbageCollect();
        }
        //GC操作处理
        if (this._isNeedGC) {
            let now = Date.timeNowMillisecons();
            if (now - this._lastGCTime > this.GC_INTERVAL) {
                //抽时间做GC操作
                cc.sys.garbageCollect();
                if (CC_DEBUG)
                    cc.log(`GC内存操作`);
                this._isNeedGC = false;
            }
        }
        return cando;
    }
    /**@description 添加动态加载的本地资源 */
    addLocal(info, className) {
        if (info) {
            let viewData = this.getViewData(className);
            if (viewData) {
                viewData.loadData.addLocal(info, className);
            }
        }
    }
    /**@description 添加动态加载的远程资源 */
    addRemote(info, className) {
        if (info) {
            let viewData = this.getViewData(className);
            if (viewData) {
                viewData.loadData.addRemote(info, className);
            }
        }
    }
    recordGCTime(isNeedGC = null) {
        if (isNeedGC != null)
            this._isNeedGC = isNeedGC;
        this._lastGCTime = Date.timeNowMillisecons();
    }
    close(data) {
        //当前所有界面都已经加载完成
        let viewData = this.getViewData(data);
        if (viewData) {
            while (true) {
                let index = this._viewList.lastIndexOf(viewData);
                if (index == -1) {
                    break;
                }
                this._viewList.splice(index, 1);
            }
            viewData.status = Defines_1.ViewStatus.WAITTING_CLOSE;
            if (viewData.view && cc.isValid(viewData.node)) {
                viewData.node.removeFromParent(false);
            }
            this.recordGCTime();
        }
    }
    /**@description 关闭除传入参数以外的所有其它界面,不传入，关闭所有界面 */
    closeExcept(views) {
        let self = this;
        if (views == undefined || views == null || views.length == 0) {
            //关闭所有界面
            // if (CC_DEBUG) cc.error(`请检查参数，至少需要保留一个界面，不然就黑屏了，大兄弟`);
            this._viewDatas.forEach((viewData, key) => {
                self.close(key);
            });
            return;
        }
        let viewClassNames = new Set();
        for (let i = 0; i < views.length; i++) {
            viewClassNames.add(this.getClassName(views[i]));
        }
        this._viewDatas.forEach((viewData, key) => {
            if (viewClassNames.has(key)) {
                //如果包含，不做处理，是排除项
                return;
            }
            self.close(key);
        });
        this.printViews();
    }
    hide(data) {
        let viewData = this.getViewData(data);
        if (viewData) {
            if (viewData.isLoaded) {
                //已经加载完成，说明已经是直实存在的界面，按照正常游戏进行删除
                if (viewData.view && cc.isValid(viewData.view.node)) {
                    viewData.view.hide();
                }
                if (CC_DEBUG)
                    cc.log(`${this._logTag}hide view : ${viewData.loadData.name}`);
            }
            else {
                //没有加载写成，正常加载中
                viewData.status = Defines_1.ViewStatus.WATITING_HIDE;
            }
        }
    }
    getView(data) {
        return new Promise((resolove, reject) => {
            if (data == undefined || data == null) {
                resolove(null);
                return;
            }
            let viewData = this.getViewData(data);
            if (viewData) {
                if (viewData.isPreload) {
                    //如果只是预加载，返回空，让使用者用open的方式打开
                    resolove(null);
                }
                else {
                    if (viewData.isLoaded) {
                        resolove(viewData.view);
                    }
                    else {
                        //加载中
                        viewData.getViewCb.push(resolove);
                    }
                }
            }
            else {
                resolove(null);
            }
        });
    }
    getLastView() {
        let lastView = null;
        if (this._viewList.length > 0) {
            lastView = this._viewList[this._viewList.length - 1].view;
        }
        return lastView;
    }
    checkView(url, className) {
        if (CC_DEBUG && className) {
            this.getView(className).then((view) => {
                if (!view) {
                    let viewData = this.getViewData(className);
                    if (viewData) {
                        //预置加载返回的view是空
                        //排除掉这种方式的
                        if (!viewData.isPreload) {
                            cc.error(`资源 : ${url} 的持有者必须由UIManager.open方式打开`);
                        }
                    }
                    else {
                        cc.error(`资源 : ${url} 的持有者必须由UIManager.open方式打开`);
                    }
                }
            });
        }
    }
    isShow(data) {
        let viewData = this.getViewData(data);
        if (!viewData) {
            return false;
        }
        if (viewData.isLoaded && viewData.status == Defines_1.ViewStatus.WAITTING_NONE) {
            if (viewData.view)
                return viewData.view.node.active;
        }
        return false;
    }
    fullScreenAdapt() {
        this._viewDatas.forEach((data) => {
            if (data.isLoaded && data.view) {
                Framework_1.Manager.adaptor.fullScreenAdapt(data.view.node);
            }
        });
    }
    /*获取当前canvas的组件 */
    getCanvasComponent() {
        return this.getCanvas().getComponent("MainController");
    }
    addComponent(data) {
        let canvas = this.getCanvas();
        if (canvas) {
            let component = canvas.getComponent(data);
            if (component) {
                if (typeof data == "string") {
                    if (CC_DEBUG)
                        cc.warn(`${this._logTag}已经存在 Component ${component}`);
                }
                else {
                    if (CC_DEBUG)
                        cc.warn(`${this._logTag}已经存在 Component ${cc.js.getClassName(data)}`);
                }
                return component;
            }
            else {
                return canvas.addComponent(data);
            }
        }
        return null;
    }
    removeComponent(component) {
        let canvas = this.getCanvas();
        if (canvas)
            canvas.removeComponent(component);
    }
    printViews() {
        cc.log(`${this._logTag}---------views----start-----`);
        this._viewDatas.forEach((value, key) => {
            cc.log(`[${key}] isLoaded : ${value.isLoaded} status : ${value.status} view : ${value.view} active : ${value.view && value.view.node ? value.view.node.active : false}`);
        });
        cc.log(`${this._logTag}---------views----end-----`);
    }
    printCanvasChildren() {
        cc.log(`${this._logTag}-----------printCanvasChildren--start-----------`);
        let canvas = this.getCanvas();
        if (canvas) {
            let children = canvas.children;
            for (let i = 0; i < children.length; i++) {
                cc.log(`${children[i].name} active : ${children[i].active}`);
            }
        }
        cc.log(`${this._logTag}-----------printCanvasChildren--end-----------`);
    }
    isInLogin() {
        return !!this.getViewData("LoginView");
    }
    isInHall() {
        return !!this.getViewData("HallNewView");
    }
    isInGame() {
        return !!this.getViewData("CrashGameView");
    }
    isInCurrentGame(gameName) {
        return !!this.getViewData(gameName);
    }
}
exports.UIManager = UIManager;
UIManager._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvVUlNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF1RztBQUd2Ryw0Q0FBdUM7QUFFdkMsNEJBQTRCO0FBQzVCLE1BQU0sb0JBQW9CLEdBQUcsc0JBQXNCLENBQUM7QUFDcEQsNEJBQTRCO0FBQzVCLE1BQU0sMEJBQTBCLEdBQUcsNEJBQTRCLENBQUM7QUFDaEUsTUFBTSxtQkFBbUI7SUFLckIsWUFBWSxPQUFlLElBQUk7UUFKdkIsVUFBSyxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1FBQ3hDLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztRQUk3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsOEJBQThCO0lBQ3ZCLFFBQVEsQ0FBQyxJQUFrQixFQUFFLFlBQW9CLElBQUk7UUFDeEQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksb0JBQW9CLEVBQUU7Z0JBQ25DLHFDQUFxQzthQUN4QztZQUNELElBQUksUUFBUTtnQkFBRSxtQkFBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsOEJBQThCO0lBQ3ZCLFNBQVMsQ0FBQyxJQUFrQixFQUFFLFlBQW9CLElBQUk7UUFDekQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FB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TSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUNoRTtTQUNKO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLGdEQUFnRCxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVNLFNBQVM7UUFDWixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxRQUFRO1FBQ1gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sUUFBUTtRQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLGVBQWUsQ0FBQyxRQUFnQjtRQUNuQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O0FBbmtCTCw4QkFva0JDO0FBbGtCa0IsbUJBQVMsR0FBYyxJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3LCB7IFVJQ2xhc3MgfSBmcm9tIFwiLi4vdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBSZXNvdXJjZUluZm8sIFJlc291cmNlQ2FjaGVEYXRhLCBWaWV3U3RhdHVzLCBCVU5ETEVfVFlQRSwgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuL0RlZmluZXNcIjtcbmltcG9ydCBVSUxvYWRpbmdEZWxlZ2F0ZSBmcm9tIFwiLi4vdWkvVUlMb2FkaW5nRGVsZWdhdGVcIjtcbmltcG9ydCBUb2FzdERlbGVnYXRlIGZyb20gXCIuLi91aS9Ub2FzdERlbGVnYXRlXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZyYW1ld29ya1wiO1xuXG4vKipAZGVzY3JpcHRpb24g5Yqo5oCB5Yqg6L295Z6D5Zy+5pWw5o2u5ZCNICovXG5jb25zdCBEWU5BTUlDX0xPQURfR0FSQkFHRSA9IFwiRFlOQU1JQ19MT0FEX0dBUkJBR0VcIjtcbi8qKkBkZXNjcmlwdGlvbiDliqjnlLvliqDovb3lhajlsYDmlbDmja7lkI0gKi9cbmNvbnN0IERZTkFNSUNfTE9BRF9SRVRBSU5fTUVNT1JZID0gXCJEWU5BTUlDX0xPQURfUkVUQUlOX01FTU9SWVwiO1xuY2xhc3MgVmlld0R5bmFtaWNMb2FkRGF0YSB7XG4gICAgcHJpdmF0ZSBsb2NhbCA9IG5ldyBNYXA8c3RyaW5nLCBSZXNvdXJjZUluZm8+KCk7XG4gICAgcHJpdmF0ZSByZW1vdGUgPSBuZXcgTWFwPHN0cmluZywgUmVzb3VyY2VJbmZvPigpO1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOa3u+WKoOWKqOaAgeWKoOi9veeahOacrOWcsOi1hOa6kCAqL1xuICAgIHB1YmxpYyBhZGRMb2NhbChpbmZvOiBSZXNvdXJjZUluZm8sIGNsYXNzTmFtZTogc3RyaW5nID0gbnVsbCkge1xuICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLnVybCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSA9PSBEWU5BTUlDX0xPQURfR0FSQkFHRSkge1xuICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKGDmib7kuI3liLDotYTmupDmjIHmnInogIU6ICR7aW5mby51cmx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIE1hbmFnZXIudWlNYW5hZ2VyLmNoZWNrVmlldyhpbmZvLnVybCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2NhbC5oYXMoaW5mby51cmwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbC5zZXQoaW5mby51cmwsIGluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOa3u+WKoOWKqOaAgeWKoOi9veeahOi/nOeoi+i1hOa6kCAqL1xuICAgIHB1YmxpYyBhZGRSZW1vdGUoaW5mbzogUmVzb3VyY2VJbmZvLCBjbGFzc05hbWU6IHN0cmluZyA9IG51bGwpIHtcbiAgICAgICAgaWYgKGluZm8gJiYgaW5mby5kYXRhICYmICF0aGlzLnJlbW90ZS5oYXMoaW5mby51cmwpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lID09IERZTkFNSUNfTE9BRF9HQVJCQUdFKSB7XG4gICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoYOaJvuS4jeWIsOi1hOa6kOaMgeacieiAhSA6ICR7aW5mby51cmx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIE1hbmFnZXIudWlNYW5hZ2VyLmNoZWNrVmlldyhpbmZvLnVybCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLnJlbW90ZUNhY2hlcy5yZXRhaW5Bc3NldChpbmZvKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3RlLnNldChpbmZvLnVybCwgaW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5riF6Zmk6L+c56iL5Yqg6L296LWE5rqQICovXG4gICAgcHVibGljIGNsZWFyKCkge1xuICAgICAgICBpZiAodGhpcy5uYW1lID09IERZTkFNSUNfTE9BRF9HQVJCQUdFKSB7XG4gICAgICAgICAgICAvL+WFiOi+k+WHulxuICAgICAgICAgICAgbGV0IGlzU2hvdyA9IHRoaXMubG9jYWwuc2l6ZSA+IDAgfHwgdGhpcy5yZW1vdGUuc2l6ZSA+IDA7XG4gICAgICAgICAgICBpZiAoaXNTaG93KSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoYOW9k+WJjeacquiDvemHiuaUvui1hOa6kOWmguS4izpgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsICYmIHRoaXMubG9jYWwuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihcIi0tLS0tLS0tLS0tbG9jYWwtLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2NhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsLmZvckVhY2goKGluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGluZm8udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlICYmIHRoaXMucmVtb3RlLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCItLS0tLS0tLS0tLXJlbW90ZS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZS5mb3JFYWNoKChpbmZvLCB1cmwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGluZm8udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+WFiOa4hemZpOW9k+WJjei1hOa6kOeahOW8leeUqOWFs+ezu1xuICAgICAgICAgICAgaWYgKHRoaXMubG9jYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsLmZvckVhY2goKGluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KGluZm8pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWwuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlLmZvckVhY2goKGluZm8sIHVybCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdGVDYWNoZXMucmVsZWFzZUFzc2V0KGluZm8pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuLyoqQGRlc2NyaXB0aW9uIOeVjOmdouaVsOaNru+8jOi/memHjOmcgOimgeWkhOeQhuS4gOS4qumXrumimO+8jOW9k+S4gOS4queVjOmdouaJk+W8gO+8jOaUtuWIsOWPpuS4gOS4quS6uueahOWFs+mXre+8jOatpOaXtuWmguaenOeVjOmdouacquWKoOi9veWujOaIkFxuICog5Y+v6IO95a+86Ie05Y+m5LiA5Liq5Lq65YWz6Zet5peg5pWI77yM562J55WM6Z2i5Yqg6L295a6M5oiQ5ZCO77yM5Y+I5pi+56S65Ye65p2lXG4gKi9cbmNsYXNzIFZpZXdEYXRhIHtcbiAgICAvKipAZGVzY3JpcHRpb24g55WM6Z2i5piv5ZCm5bey57uP5Yqg6L29ICovXG4gICAgaXNMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipAZGVzY3JpcHRpb24g55WM6Z2i5b2T5YmN562J5b6F5pON5L2c54q25oCBICovXG4gICAgc3RhdHVzOiBWaWV3U3RhdHVzID0gVmlld1N0YXR1cy5XQUlUVElOR19OT05FO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDlrp7pmYXmmL7npLrnlYzpnaIgKi9cbiAgICB2aWV3OiBVSVZpZXcgPSBudWxsO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDnrYnlvoXliqDovb3lrozmiJDlm57osIMgKi9cbiAgICBmaW5pc2hDYjogKCh2aWV3OiBhbnkpID0+IHZvaWQpW10gPSBbXTtcbiAgICAvKipAZGVzY3JpcHRpb24g562J5b6F6I635Y+W55WM6Z2i5Zue6LCDICovXG4gICAgZ2V0Vmlld0NiOiAoKHZpZXc6IGFueSkgPT4gdm9pZClbXSA9IFtdO1xuICAgIC8qKuaYr+WQpumihOWKoOi9vSzkuI3mmL7npLrlh7rmnaXvvIzkvYbkvJrliqDliLDlvZPliY3lnLrmma/kuIogKi9cbiAgICBpc1ByZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipAZGVzY3JpcHRpb24g6LWE5rqQ5L+h5oGvICovXG4gICAgaW5mbzogUmVzb3VyY2VJbmZvID0gbnVsbDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDnlYzpnaLliqjmgIHliqDovb3nmoTmlbDmja4gKi9cbiAgICBsb2FkRGF0YTogVmlld0R5bmFtaWNMb2FkRGF0YSA9IG5ldyBWaWV3RHluYW1pY0xvYWREYXRhKCk7XG5cbiAgICBub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgZG9HZXQodmlldywgY2xhc3NOYW1lOiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRWaWV3Q2IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjYiA9IHRoaXMuZ2V0Vmlld0NiW2ldO1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2Iodmlldyk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGBWaWV3RGF0YSBkbyBnZXQgdmlldyA6ICR7Y2xhc3NOYW1lfSBtc2cgOiAke21zZ31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Vmlld0NiID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb0ZpbmlzaCh2aWV3LCBjbGFzc05hbWU6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpbmlzaENiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2IgPSB0aGlzLmZpbmlzaENiW2ldO1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2Iodmlldyk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGBWaWV3RGF0YSBkbyBmaW5pc2ggdmlldyA6ICR7Y2xhc3NOYW1lfSBtc2cgOiAke21zZ31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbmlzaENiID0gW107XG4gICAgfVxuXG4gICAgZG9DYWxsYmFjayh2aWV3LCBjbGFzc05hbWU6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kb0ZpbmlzaCh2aWV3LCBjbGFzc05hbWUsIG1zZyk7XG4gICAgICAgIHRoaXMuZG9HZXQodmlldywgY2xhc3NOYW1lLCBtc2cpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVJTWFuYWdlciB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFVJTWFuYWdlciA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZSgpIHsgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBVSU1hbmFnZXIoKSk7IH1cbiAgICBwdWJsaWMgX2xvZ1RhZyA9IGBbVUlNYW5hZ2VyXWA7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOinhuWbviAqL1xuICAgIHByaXZhdGUgX3ZpZXdEYXRhczogTWFwPHN0cmluZywgVmlld0RhdGE+ID0gbmV3IE1hcDxzdHJpbmcsIFZpZXdEYXRhPigpO1xuICAgIHByaXZhdGUgX3ZpZXdMaXN0OiBWaWV3RGF0YVtdID0gW107XG4gICAgcHJpdmF0ZSBnZXRWaWV3RGF0YShjbGFzc05hbWU6IHN0cmluZyk6IFZpZXdEYXRhO1xuICAgIHByaXZhdGUgZ2V0Vmlld0RhdGE8VCBleHRlbmRzIFVJVmlldz4odWlDbGFzczogVUlDbGFzczxUPik6IFZpZXdEYXRhO1xuICAgIHByaXZhdGUgZ2V0Vmlld0RhdGEoZGF0YTogYW55KTogVmlld0RhdGEge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoZGF0YSk7XG4gICAgICAgIGlmICghY2xhc3NOYW1lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IHZpZXdEYXRhID0gdGhpcy5fdmlld0RhdGFzLmhhcyhjbGFzc05hbWUpID8gdGhpcy5fdmlld0RhdGFzLmdldChjbGFzc05hbWUpIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIHZpZXdEYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKTogc3RyaW5nO1xuICAgIHByaXZhdGUgZ2V0Q2xhc3NOYW1lPFQgZXh0ZW5kcyBVSVZpZXc+KHVpQ2xhc3M6IFVJQ2xhc3M8VD4pOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBnZXRDbGFzc05hbWUoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gY2MuanMuZ2V0Q2xhc3NOYW1lKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFzc05hbWU7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIEdD55qE6Ze06ZqU5pe26Ze0LOebruWJjeaaguWumuS4uui/m+WFpeWujOaIkOaMh+WumuWcuuaZr++8jOWQju+8jOWkmuWwkeaXtumXtOWGheayoeacieeVjOmdouaJk+W8gOaIluWFs+mXreaTjeS9nO+8jOWBmkdD5pON5L2c6YeK5pS+5YaF5a2YICovXG4gICAgcHJpdmF0ZSBHQ19JTlRFUlZBTCA9IDE1MDA7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOacgOWQjuS4gOasoUdD5pON5L2c5pe26Ze077yM5b2T5omT5byA5oiW5YWz6Zet55WM6Z2i5pe277yM5oqK5b2T5YmNR0Pml7bpl7Tph43nva7kuLrlvZPliY3ml7bpl7RcbiAgICAgKiDlnKjov5vlhaXliLDlpKfljoUx56eS5ZCO5peg55WM6Z2i55qE5YWz6Zet5LiO5omT5byA77yM5YGaR0PlhoXlrZjph4rmlL7mk43kvZxcbiAgICAgKi9cbiAgICBwcml2YXRlIF9sYXN0R0NUaW1lID0gMDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDmmK/lkKbpnIDopoHlgZpHQ+aTjeS9nCAqL1xuICAgIHByaXZhdGUgX2lzTmVlZEdDID0gZmFsc2U7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5peg5Li76LWE5rqQICovXG4gICAgcHVibGljIGdhcmJhZ2UgPSBuZXcgVmlld0R5bmFtaWNMb2FkRGF0YShEWU5BTUlDX0xPQURfR0FSQkFHRSk7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOmpu+eVmeWGheWtmOi1hOa6kCAqL1xuICAgIHB1YmxpYyByZXRhaW5NZW1vcnkgPSBuZXcgVmlld0R5bmFtaWNMb2FkRGF0YShEWU5BTUlDX0xPQURfUkVUQUlOX01FTU9SWSk7XG5cbiAgICBwdWJsaWMgdWlMb2FkaW5nOiBVSUxvYWRpbmdEZWxlZ2F0ZSA9IG51bGw7XG4gICAgcHVibGljIHRvYXN0OiBUb2FzdERlbGVnYXRlID0gbnVsbDtcblxuICAgIHB1YmxpYyBwcmVsb2FkPFQgZXh0ZW5kcyBVSVZpZXc+KHVpQ2xhc3M6IFVJQ2xhc3M8VD4sIGJ1bmRsZTogQlVORExFX1RZUEUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW4odWlDbGFzcywgYnVuZGxlLCAwLCB0cnVlLCBudWxsLCBudWxsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gb3BlbjxUIGV4dGVuZHMgVUlWaWV3Pihjb25maWc6IHsgdHlwZTogVUlDbGFzczxUPiwgekluZGV4PzogbnVtYmVyLCBhcmdzPzogYW55W10gLCBkZWxheT86IG51bWJlcn0pIDogUHJvbWlzZTxUPlxuICAgICAqIEBwYXJhbSBjb25maWcg6YWN572u5L+h5oGvIFxuICAgICAqIEBwYXJhbSBjb25maWcudHlwZSBVSVZpZXdcbiAgICAgKiBAcGFyYW0gY29uZmlnLnpJbmRleCDoioLngrnlsYLnuqfvvIzpu5jorqTkuLowXG4gICAgICogQHBhcmFtIGNvbmZpZy5hcmdzIOS8oOWFpeeahOWPguaVsOWIl+ihqFxuICAgICAqIEBwYXJhbSBjb25maWcuZGVsYXkgPjAg5aSa5bCR5pe26Ze05pyq5Yqg6L2955WM6Z2i5a6M5oiQ5pi+56S65Yqg6L295Yqo55S777yMPD0wIHwgdW5kZWZpbmVkIHwgbnVsbCDkuI3mmL7npLrliqjnlLtcbiAgICAgKiBAcGFyYW0gY29uZmlnLm5hbWUg55WM6Z2i5ZCN5a2X77yM5aaCIOWVhuWfjiDpppblhYVcbiAgICAgKiBAZXhhbXBsZSDnpLrkvotcbiAgICAgKiBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHt0eXBlOkdhbWVMYXllcn0pO1xuICAgICAqIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oe3R5cGU6R2FtZUxheWVyLGRlbGF5OlZpZXdEZWxheS5kZWxheX0pO1xuICAgICAqIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oe3R5cGU6R2FtZUxheWVyLGRlbGF5OlZpZXdEZWxheS5kZWxheSx6SW5kZXg6Vmlld1pPcmRlci56ZXJvfSk7XG4gICAgICogTWFuYWdlci51aU1hbmFnZXIub3Blbih7dHlwZTpHYW1lTGF5ZXIsZGVsYXk6Vmlld0RlbGF5LmRlbGF5LHpJbmRleDpWaWV3Wk9yZGVyLnplcm8sYXJnczpbXCJhYVwiLFwiYmJcIl19KTtcbiAgICAgKiBcbiAgICAgKiBAZGVzY3JpcHRpb24g5byD55So5o6l5Y+jIG9wZW48VCBleHRlbmRzIFVJVmlldz4odWlDbGFzczogVUlDbGFzczxUPiwgekluZGV4PzogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD5cbiAgICAgKiBAcGFyYW0gdWlDbGFzcyBVSVZpZXdcbiAgICAgKiBAcGFyYW0gekluZGV4IOiKgueCueWxgue6pyBcbiAgICAgKiBAcGFyYW0gYXJncyDkvKDlhaXlj4LmlbDliJfooahcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbjxUIGV4dGVuZHMgVUlWaWV3Pihjb25maWc6IHsgdHlwZTogVUlDbGFzczxUPiwgYnVuZGxlPzogQlVORExFX1RZUEUsIHpJbmRleD86IG51bWJlciwgYXJncz86IGFueVtdLCBkZWxheT86IG51bWJlciwgbmFtZT86IHN0cmluZyB9KTogUHJvbWlzZTxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuKGNvbmZpZy50eXBlLCBjb25maWcuYnVuZGxlLCBjb25maWcuekluZGV4ID8gY29uZmlnLnpJbmRleCA6IDAsIGZhbHNlLCBjb25maWcuYXJncywgY29uZmlnLmRlbGF5LCBjb25maWcubmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3BlbjxUIGV4dGVuZHMgVUlWaWV3Pih1aUNsYXNzOiBVSUNsYXNzPFQ+LCBidW5kbGU6IEJVTkRMRV9UWVBFLCB6T3JkZXI6IG51bWJlciA9IDAsIGlzUHJlbG9hZDogYm9vbGVhbiwgYXJnczogYW55W10sIGRlbGF5OiBudW1iZXIsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNsb3ZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdWlDbGFzcykge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGAke3RoaXMuX2xvZ1RhZ31vcGVuIHVpIGNsYXNzIGVycm9yYCk7XG4gICAgICAgICAgICAgICAgcmVzbG92ZShudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gY2MuanMuZ2V0Q2xhc3NOYW1lKHVpQ2xhc3MpO1xuXG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coYOaJk+W8gOeVjOmdoiAke2NsYXNzTmFtZX1gKTtcblxuXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5nZXRDYW52YXMoKTtcbiAgICAgICAgICAgIGlmICghY2FudmFzKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgJHt0aGlzLl9sb2dUYWd95om+5LiN5Yiw5Zy65pmv55qEQ2FudmFz6IqC54K5YCk7XG4gICAgICAgICAgICAgICAgcmVzbG92ZShudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5omT5byA55WM6Z2i5pe277yM5pu05pawR0Pml7bpl7RcbiAgICAgICAgICAgIHRoaXMucmVjb3JkR0NUaW1lKCk7XG4gICAgICAgICAgICBsZXQgdmlld0RhdGEgPSB0aGlzLmdldFZpZXdEYXRhKHVpQ2xhc3MpO1xuICAgICAgICAgICAgaWYgKHZpZXdEYXRhKSB7XG4gICAgICAgICAgICAgICAgdmlld0RhdGEuaXNQcmVsb2FkID0gaXNQcmVsb2FkO1xuICAgICAgICAgICAgICAgIC8v5bey57uP5Yqg6L29XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdEYXRhLmlzTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdEYXRhLnN0YXR1cyA9IFZpZXdTdGF0dXMuV0FJVFRJTkdfTk9ORTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ByZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3RGF0YS52aWV3ICYmIGNjLmlzVmFsaWQodmlld0RhdGEubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS5ub2RlLnpJbmRleCA9IHpPcmRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZpZXdEYXRhLm5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdEYXRhLm5vZGUucGFyZW50ID0gdGhpcy5nZXRDYW52YXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5hZGFwdG9yLmZ1bGxTY3JlZW5BZGFwdCh2aWV3RGF0YS5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS52aWV3LnNob3coYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0xpc3QucHVzaCh2aWV3RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2xvdmUoPFQ+dmlld0RhdGEudmlldyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdEYXRhLnN0YXR1cyA9IFZpZXdTdGF0dXMuV0FJVFRJTkdfTk9ORTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ByZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVpTG9hZGluZykgdGhpcy51aUxvYWRpbmcuc2hvdyhkZWxheSwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy/mraPlnKjliqDovb3kuK1cbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGAke3RoaXMuX2xvZ1RhZ30ke2NsYXNzTmFtZX0g5q2j5Zyo5Yqg6L295LitLi4uYCk7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdEYXRhLmZpbmlzaENiLnB1c2gocmVzbG92ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWV3RGF0YSA9IG5ldyBWaWV3RGF0YSgpO1xuICAgICAgICAgICAgICAgIHZpZXdEYXRhLmxvYWREYXRhLm5hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgbGV0IHByZWZhYlVybCA9IHVpQ2xhc3MuZ2V0UHJlZmFiVXJsKCk7XG4gICAgICAgICAgICAgICAgdmlld0RhdGEuaXNQcmVsb2FkID0gaXNQcmVsb2FkO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdEYXRhcy5zZXQoY2xhc3NOYW1lLCB2aWV3RGF0YSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8vIGlmICghaXNQcmVsb2FkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudWlMb2FkaW5nKSB0aGlzLnVpTG9hZGluZy5zaG93KGRlbGF5LCBuYW1lKTtcbiAgICAgICAgICAgICAgICAvL+mihOWKoOi9veeVjOmdouS4jeaYvuekuui/m+W6plxuICAgICAgICAgICAgICAgIHByb2dyZXNzQ2FsbGJhY2sgPSAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKChjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQpICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goXCJsb2FkR2FtZVByb2dyZXNzXCIsIHByb2dyZXNzKVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51aUxvYWRpbmcpIHRoaXMudWlMb2FkaW5nLnVwZGF0ZVByb2dyZXNzKHByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIoYnVuZGxlLCBwcmVmYWJVcmwsIHByb2dyZXNzQ2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChwcmVmYWIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdEYXRhLmluZm8gPSBuZXcgUmVzb3VyY2VJbmZvO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0RhdGEuaW5mby51cmwgPSBwcmVmYWJVcmw7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS5pbmZvLnR5cGUgPSBjYy5QcmVmYWI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS5pbmZvLmRhdGEgPSBwcmVmYWI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS5pbmZvLmJ1bmRsZSA9IGJ1bmRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTm9kZShjbGFzc05hbWUsIHVpQ2xhc3MsIHJlc2xvdmUsIHByZWZhYiwgYXJncywgek9yZGVyLCBidW5kbGUsIGlzUHJlbG9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51aUxvYWRpbmcpIHRoaXMudWlMb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0RhdGEuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IocmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UodWlDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS5kb0NhbGxiYWNrKG51bGwsIGNsYXNzTmFtZSwgXCLmiZPlvIDnlYzpnaLlvILluLhcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNsb3ZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVpTmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50b2FzdCkgdGhpcy50b2FzdC5zaG93KGDliqDovb3nlYzpnaIke3VpTmFtZX3lpLHotKXvvIzor7fph43or5VgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVpTG9hZGluZykgdGhpcy51aUxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkQ29tcG9uZW50PFQgZXh0ZW5kcyBVSVZpZXc+KHVpTm9kZTogY2MuTm9kZSwgdWlDbGFzczogVUlDbGFzczxUPiwgdmlld0RhdGE6IFZpZXdEYXRhLCBjbGFzc05hbWU6IHN0cmluZywgek9yZGVyOiBudW1iZXIsIGFyZ3M6IGFueVtdLCBidW5kbGU6IEJVTkRMRV9UWVBFKTogVUlWaWV3IHtcbiAgICAgICAgaWYgKHVpTm9kZSkge1xuICAgICAgICAgICAgLy/mjILovb3ohJrmnKxcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdWlOb2RlLmdldENvbXBvbmVudCh1aUNsYXNzKSBhcyBVSVZpZXc7XG4gICAgICAgICAgICBpZiAoIXZpZXcpIHtcbiAgICAgICAgICAgICAgICB2aWV3ID0gdWlOb2RlLmFkZENvbXBvbmVudCh1aUNsYXNzKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgJHt0aGlzLl9sb2dUYWd95oyC6L296ISa5pys5aSx6LSlIDogJHtjbGFzc05hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2coYCR7dGhpcy5fbG9nVGFnfeaMgui9veiEmuacrCA6ICR7Y2xhc3NOYW1lfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTWFuYWdlci5hZGFwdG9yLmZ1bGxTY3JlZW5BZGFwdCh1aU5vZGUpO1xuXG4gICAgICAgICAgICB2aWV3LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgICAgIHZpZXcuYnVuZGxlID0gYnVuZGxlXG4gICAgICAgICAgICB2aWV3RGF0YS52aWV3ID0gdmlldztcbiAgICAgICAgICAgIC8v5Y675o6JaW5pdOWHveaVsO+8jOWkhOeQhuaUvuWcqG9uTG9hZOS4re+8jFxuICAgICAgICAgICAgKDxhbnk+dmlldykuX2FyZ3MgPSBhcmdzO1xuXG4gICAgICAgICAgICAvL+eVjOmdouaYvuekuuWcqOWxj+W5leS4remXtFxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGAke3RoaXMuX2xvZ1RhZ33kvaDlt7Lnu4/mt7vliqDkuoZjYy5XaWRnZXTnu4Tku7bvvIzlsIbkvJrmm7TmlLnmiJDlsYXkuK3mqKHlnZdgKTtcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkhvcml6b250YWxDZW50ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpZGdldC5ob3Jpem9udGFsQ2VudGVyID0gMDtcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblZlcnRpY2FsQ2VudGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aWRnZXQudmVydGljYWxDZW50ZXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0ID0gdmlldy5hZGRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkhvcml6b250YWxDZW50ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpZGdldC5ob3Jpem9udGFsQ2VudGVyID0gMDtcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblZlcnRpY2FsQ2VudGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aWRnZXQudmVydGljYWxDZW50ZXIgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXZpZXdEYXRhLmlzUHJlbG9hZCkge1xuICAgICAgICAgICAgICAgIHVpTm9kZS5wYXJlbnQgPSB0aGlzLmdldENhbnZhcygpO1xuICAgICAgICAgICAgICAgIHVpTm9kZS56SW5kZXggPSB6T3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmlldztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVOb2RlPFQgZXh0ZW5kcyBVSVZpZXc+KGNsYXNzTmFtZTogc3RyaW5nLCB1aUNsYXNzOiBVSUNsYXNzPFQ+LCByZXNsb3ZlLCBkYXRhOiBjYy5QcmVmYWIsIGFyZ3M6IGFueVtdLCB6T3JkZXI6IG51bWJlciwgYnVuZGxlOiBCVU5ETEVfVFlQRSwgaXNQcmVsb2FkKSB7XG4gICAgICAgIGxldCB2aWV3RGF0YSA9IHRoaXMuX3ZpZXdEYXRhcy5nZXQoY2xhc3NOYW1lKTtcbiAgICAgICAgdmlld0RhdGEuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICBpZiAodmlld0RhdGEuc3RhdHVzID09IFZpZXdTdGF0dXMuV0FJVFRJTkdfQ0xPU0UpIHtcbiAgICAgICAgICAgIC8v5Yqg6L296L+H56iL5Lit5pyJ5Lq65YWz6Zet5LqG55WM6Z2iXG4gICAgICAgICAgICByZXNsb3ZlKG51bGwpO1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGAke3RoaXMuX2xvZ1RhZ30ke2NsYXNzTmFtZX3mraPnrYnlvoXlhbPpl61gKTtcbiAgICAgICAgICAgIC8v5aaC5p6c5q2k5pe25pyJ5Zyw5pa55q2j5Zyo6I635Y+W55WM6Z2i77yM55u05o6l6L+U5Zue56m6XG4gICAgICAgICAgICB2aWV3RGF0YS5kb0NhbGxiYWNrKG51bGwsIGNsYXNzTmFtZSwgXCLojrflj5bnlYzlhoXlt7Lnu4/lhbPpl61cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdWlOb2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUoZGF0YSk7XG4gICAgICAgIHZpZXdEYXRhLm5vZGUgPSB1aU5vZGU7XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5fYWRkQ29tcG9uZW50KHVpTm9kZSwgdWlDbGFzcywgdmlld0RhdGEsIGNsYXNzTmFtZSwgek9yZGVyLCBhcmdzLCBidW5kbGUpO1xuICAgICAgICBpZiAoIXZpZXcpIHtcbiAgICAgICAgICAgIHJlc2xvdmUobnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aWV3TGlzdC5wdXNoKHZpZXdEYXRhKTtcblxuICAgICAgICBpZiAodmlld0RhdGEuc3RhdHVzID09IFZpZXdTdGF0dXMuV0FUSVRJTkdfSElERSkge1xuICAgICAgICAgICAgLy/liqDovb3ov4fnqIvkuK3mnInkurrpmpDol4/kuobnlYzpnaJcbiAgICAgICAgICAgIHZpZXcuaGlkZSgpO1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGAke3RoaXMuX2xvZ1RhZ33liqDovb3ov4fnqIvpmpDol4/kuobnlYzpnaIke2NsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgIHJlc2xvdmUodmlldyk7XG4gICAgICAgICAgICB2aWV3RGF0YS5kb0NhbGxiYWNrKHZpZXcsIGNsYXNzTmFtZSwgXCLliqDovb3lrozmiJDvvIzkvYbliqDovb3ov4fnqIvkuK3ooqvpmpDol49cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhgJHt0aGlzLl9sb2dUYWd9b3BlbiB2aWV3IDogJHtjbGFzc05hbWV9YClcblxuICAgICAgICAgICAgaWYgKCFpc1ByZWxvYWQpIHtcbiAgICAgICAgICAgICAgICB2aWV3LnNob3coYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNsb3ZlKHZpZXcpXG4gICAgICAgICAgICB2aWV3RGF0YS5kb0NhbGxiYWNrKHZpZXcsIGNsYXNzTmFtZSwgXCLliqDovb3lrozmiJDvvIzlm57osIPkuYvliY3liqDovb3kuK3nmoTnlYzpnaJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRQcmVmYWIoYnVuZGxlOiBCVU5ETEVfVFlQRSwgdXJsOiBzdHJpbmcsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Y2MuUHJlZmFiPigocmVzb2xvdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJ1bmRsZSA9PSB1bmRlZmluZWQgfHwgYnVuZGxlID09IFwiXCIgfHwgYnVuZGxlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBidW5kbGUgPSBCVU5ETEVfUkVTT1VSQ0VTO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTWFuYWdlci5hc3NldE1hbmFnZXIubG9hZChidW5kbGUsIHVybCwgY2MuUHJlZmFiLCBwcm9ncmVzc0NhbGxiYWNrLCAoZGF0YTogUmVzb3VyY2VDYWNoZURhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmRhdGEgJiYgZGF0YS5kYXRhIGluc3RhbmNlb2YgY2MuUHJlZmFiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sb3ZlKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoYOWKoOi9vXByZWZhYiA6ICR7dXJsfSDlpLHotKVgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2FudmFzKCk6IGNjLk5vZGUge1xuICAgICAgICBsZXQgcm9vdFNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcbiAgICAgICAgaWYgKCFyb290U2NlbmUpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IoYCR7dGhpcy5fbG9nVGFnfeW9k+WJjeWcuuaZr+S4uuepuiDvvJogJHtjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByb290ID0gcm9vdFNjZW5lLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpO1xuICAgICAgICBpZiAoIXJvb3QpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IoYCR7dGhpcy5fbG9nVGFnfeW9k+WJjeWcuuaZr+S4iuaJvuS4jeWIsCBDYW52YXMg6IqC54K5YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EaXJlY3RvckFmdGVyRHJhdygpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGNhbmRvID0gdHJ1ZTtcbiAgICAgICAgbGV0IGhhc1dhaXRpbmdDbG9zZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl92aWV3RGF0YXMuZm9yRWFjaCgodmlld0RhdGEpID0+IHtcbiAgICAgICAgICAgIGlmICh2aWV3RGF0YSkge1xuICAgICAgICAgICAgICAgIC8v5Y+q6KaB5pyJ5LiA5Liq55WM6Z2i5rKh5Yqg6L295a6M5oiQ77yM6YO95LiN6IO96L+b6KGM5aSE55CGXG4gICAgICAgICAgICAgICAgaWYgKCF2aWV3RGF0YS5pc0xvYWRlZCkgY2FuZG8gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodmlld0RhdGEuc3RhdHVzID09IFZpZXdTdGF0dXMuV0FJVFRJTkdfQ0xPU0UpIGhhc1dhaXRpbmdDbG9zZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzV2FpdGluZ0Nsb3NlICYmIGNhbmRvKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRpbWUoXCLph4rmlL7otYTmupBcIik7XG4gICAgICAgICAgICB0aGlzLl92aWV3RGF0YXMuZm9yRWFjaCgodmlld0RhdGEsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aWV3RGF0YSAmJiB2aWV3RGF0YS5zdGF0dXMgPT0gVmlld1N0YXR1cy5XQUlUVElOR19DTE9TRSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLnRpbWUoYCR7dGhpcy5fbG9nVGFnfSBjbG9zZSB2aWV3IDogJHtjbGFzc05hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHZpZXdEYXRhLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0RhdGEubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gdmlld0RhdGEubG9hZERhdGEuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFuYWdlci5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KHZpZXdEYXRhLmluZm8pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3RGF0YXMuZGVsZXRlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUudGltZUVuZChgJHt0aGlzLl9sb2dUYWd9IGNsb3NlIHZpZXcgOiAke2NsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8v5Yig6Zmk5peg5Li75Yqg6L295pWw5o2uXG4gICAgICAgICAgICAvLyB0aGlzLmdhcmJhZ2UuY2xlYXIoKVxuICAgICAgICAgICAgY29uc29sZS50aW1lRW5kKFwi6YeK5pS+6LWE5rqQXCIpO1xuICAgICAgICAgICAgLy/mraTlpIRHQ+aTjeS9nOWPpuihjOWBmuS8mOWMlu+8jOS4jeiDvei/h+W6pueahEdD5Lya6YCg5oiQ5Yqo55S755qE5Y2h6aG/77yM6ZyA6KaB5oyR5LiA5Liq5q+U6L6D56m66Zey55qE5pe26Ze05q615p2l5YGaR0Pmk43kvZxcbiAgICAgICAgICAgIC8vY2Muc3lzLmdhcmJhZ2VDb2xsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dD5pON5L2c5aSE55CGXG4gICAgICAgIGlmICh0aGlzLl9pc05lZWRHQykge1xuICAgICAgICAgICAgbGV0IG5vdyA9IERhdGUudGltZU5vd01pbGxpc2Vjb25zKCk7XG4gICAgICAgICAgICBpZiAobm93IC0gdGhpcy5fbGFzdEdDVGltZSA+IHRoaXMuR0NfSU5URVJWQUwpIHtcbiAgICAgICAgICAgICAgICAvL+aKveaXtumXtOWBmkdD5pON5L2cXG4gICAgICAgICAgICAgICAgY2Muc3lzLmdhcmJhZ2VDb2xsZWN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2coYEdD5YaF5a2Y5pON5L2cYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNOZWVkR0MgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FuZG87XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOa3u+WKoOWKqOaAgeWKoOi9veeahOacrOWcsOi1hOa6kCAqL1xuICAgIHB1YmxpYyBhZGRMb2NhbChpbmZvOiBSZXNvdXJjZUluZm8sIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBsZXQgdmlld0RhdGEgPSB0aGlzLmdldFZpZXdEYXRhKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBpZiAodmlld0RhdGEpIHtcbiAgICAgICAgICAgICAgICB2aWV3RGF0YS5sb2FkRGF0YS5hZGRMb2NhbChpbmZvLCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOa3u+WKoOWKqOaAgeWKoOi9veeahOi/nOeoi+i1hOa6kCAqL1xuICAgIHB1YmxpYyBhZGRSZW1vdGUoaW5mbzogUmVzb3VyY2VJbmZvLCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgbGV0IHZpZXdEYXRhID0gdGhpcy5nZXRWaWV3RGF0YShjbGFzc05hbWUpO1xuICAgICAgICAgICAgaWYgKHZpZXdEYXRhKSB7XG4gICAgICAgICAgICAgICAgdmlld0RhdGEubG9hZERhdGEuYWRkUmVtb3RlKGluZm8sIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVjb3JkR0NUaW1lKGlzTmVlZEdDOiBib29sZWFuID0gbnVsbCkge1xuICAgICAgICBpZiAoaXNOZWVkR0MgIT0gbnVsbCkgdGhpcy5faXNOZWVkR0MgPSBpc05lZWRHQztcbiAgICAgICAgdGhpcy5fbGFzdEdDVGltZSA9IERhdGUudGltZU5vd01pbGxpc2Vjb25zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlPFQgZXh0ZW5kcyBVSVZpZXc+KHVpQ2xhc3M6IFVJQ2xhc3M8VD4pO1xuICAgIHB1YmxpYyBjbG9zZShjbGFzc05hbWU6IHN0cmluZyk7XG4gICAgcHVibGljIGNsb3NlKGRhdGE6IGFueSkge1xuICAgICAgICAvL+W9k+WJjeaJgOacieeVjOmdoumDveW3sue7j+WKoOi9veWujOaIkFxuICAgICAgICBsZXQgdmlld0RhdGEgPSB0aGlzLmdldFZpZXdEYXRhKGRhdGEpO1xuICAgICAgICBpZiAodmlld0RhdGEpIHtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLl92aWV3TGlzdC5sYXN0SW5kZXhPZih2aWV3RGF0YSlcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWV3RGF0YS5zdGF0dXMgPSBWaWV3U3RhdHVzLldBSVRUSU5HX0NMT1NFO1xuICAgICAgICAgICAgaWYgKHZpZXdEYXRhLnZpZXcgJiYgY2MuaXNWYWxpZCh2aWV3RGF0YS5ub2RlKSkge1xuICAgICAgICAgICAgICAgIHZpZXdEYXRhLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlY29yZEdDVGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWFs+mXremZpOS8oOWFpeWPguaVsOS7peWklueahOaJgOacieWFtuWug+eVjOmdoizkuI3kvKDlhaXvvIzlhbPpl63miYDmnInnlYzpnaIgKi9cbiAgICBwdWJsaWMgY2xvc2VFeGNlcHQodmlld3M6IChVSUNsYXNzPFVJVmlldz4gfCBzdHJpbmcgfCBVSVZpZXcpW10pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodmlld3MgPT0gdW5kZWZpbmVkIHx8IHZpZXdzID09IG51bGwgfHwgdmlld3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8v5YWz6Zet5omA5pyJ55WM6Z2iXG4gICAgICAgICAgICAvLyBpZiAoQ0NfREVCVUcpIGNjLmVycm9yKGDor7fmo4Dmn6Xlj4LmlbDvvIzoh7PlsJHpnIDopoHkv53nlZnkuIDkuKrnlYzpnaLvvIzkuI3nhLblsLHpu5HlsY/kuobvvIzlpKflhYTlvJ9gKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdEYXRhcy5mb3JFYWNoKCh2aWV3RGF0YTogVmlld0RhdGEsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZShrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmlld0NsYXNzTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2aWV3Q2xhc3NOYW1lcy5hZGQodGhpcy5nZXRDbGFzc05hbWUodmlld3NbaV0gYXMgYW55KSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aWV3RGF0YXMuZm9yRWFjaCgodmlld0RhdGE6IFZpZXdEYXRhLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHZpZXdDbGFzc05hbWVzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzljIXlkKvvvIzkuI3lgZrlpITnkIbvvIzmmK/mjpLpmaTpoblcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNsb3NlKGtleSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJpbnRWaWV3cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKGNsYXNzTmFtZTogc3RyaW5nKTtcbiAgICBwdWJsaWMgaGlkZTxUIGV4dGVuZHMgVUlWaWV3Pih1aUNsYXNzOiBVSUNsYXNzPFQ+KTtcbiAgICBwdWJsaWMgaGlkZShkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IHZpZXdEYXRhID0gdGhpcy5nZXRWaWV3RGF0YShkYXRhKTtcbiAgICAgICAgaWYgKHZpZXdEYXRhKSB7XG4gICAgICAgICAgICBpZiAodmlld0RhdGEuaXNMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAvL+W3sue7j+WKoOi9veWujOaIkO+8jOivtOaYjuW3sue7j+aYr+ebtOWunuWtmOWcqOeahOeVjOmdou+8jOaMieeFp+ato+W4uOa4uOaIj+i/m+ihjOWIoOmZpFxuICAgICAgICAgICAgICAgIGlmICh2aWV3RGF0YS52aWV3ICYmIGNjLmlzVmFsaWQodmlld0RhdGEudmlldy5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS52aWV3LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2coYCR7dGhpcy5fbG9nVGFnfWhpZGUgdmlldyA6ICR7dmlld0RhdGEubG9hZERhdGEubmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v5rKh5pyJ5Yqg6L295YaZ5oiQ77yM5q2j5bi45Yqg6L295LitXG4gICAgICAgICAgICAgICAgdmlld0RhdGEuc3RhdHVzID0gVmlld1N0YXR1cy5XQVRJVElOR19ISURFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFZpZXcoY2xhc3NOYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG4gICAgcHVibGljIGdldFZpZXc8VCBleHRlbmRzIFVJVmlldz4odWlDbGFzczogVUlDbGFzczxUPik6IFByb21pc2U8VD47XG4gICAgcHVibGljIGdldFZpZXcoZGF0YTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sb3ZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCB8fCBkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXNvbG92ZShudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdmlld0RhdGEgPSB0aGlzLmdldFZpZXdEYXRhKGRhdGEpO1xuICAgICAgICAgICAgaWYgKHZpZXdEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdEYXRhLmlzUHJlbG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWPquaYr+mihOWKoOi9ve+8jOi/lOWbnuepuu+8jOiuqeS9v+eUqOiAheeUqG9wZW7nmoTmlrnlvI/miZPlvIBcbiAgICAgICAgICAgICAgICAgICAgcmVzb2xvdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdEYXRhLmlzTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbG92ZSh2aWV3RGF0YS52aWV3KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Yqg6L295LitXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGF0YS5nZXRWaWV3Q2IucHVzaChyZXNvbG92ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbG92ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExhc3RWaWV3KCk6IFVJVmlldyB7XG4gICAgICAgIGxldCBsYXN0VmlldzogVUlWaWV3ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxhc3RWaWV3ID0gdGhpcy5fdmlld0xpc3RbdGhpcy5fdmlld0xpc3QubGVuZ3RoIC0gMV0udmlldztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFzdFZpZXc7XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrVmlldyh1cmw6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHICYmIGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5nZXRWaWV3KGNsYXNzTmFtZSkudGhlbigodmlldykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdmlldykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmlld0RhdGEgPSB0aGlzLmdldFZpZXdEYXRhKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3RGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/pooTnva7liqDovb3ov5Tlm57nmoR2aWV35piv56m6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aOkumZpOaOiei/meenjeaWueW8j+eahFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3RGF0YS5pc1ByZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihg6LWE5rqQIDogJHt1cmx9IOeahOaMgeacieiAheW/hemhu+eUsVVJTWFuYWdlci5vcGVu5pa55byP5omT5byAYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihg6LWE5rqQIDogJHt1cmx9IOeahOaMgeacieiAheW/hemhu+eUsVVJTWFuYWdlci5vcGVu5pa55byP5omT5byAYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1Nob3coY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICAgIHB1YmxpYyBpc1Nob3c8VCBleHRlbmRzIFVJVmlldz4odWlDbGFzczogVUlDbGFzczxUPik6IGJvb2xlYW47XG4gICAgcHVibGljIGlzU2hvdyhkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IHZpZXdEYXRhID0gdGhpcy5nZXRWaWV3RGF0YShkYXRhKTtcbiAgICAgICAgaWYgKCF2aWV3RGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3RGF0YS5pc0xvYWRlZCAmJiB2aWV3RGF0YS5zdGF0dXMgPT0gVmlld1N0YXR1cy5XQUlUVElOR19OT05FKSB7XG4gICAgICAgICAgICBpZiAodmlld0RhdGEudmlldykgcmV0dXJuIHZpZXdEYXRhLnZpZXcubm9kZS5hY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBmdWxsU2NyZWVuQWRhcHQoKSB7XG4gICAgICAgIHRoaXMuX3ZpZXdEYXRhcy5mb3JFYWNoKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pc0xvYWRlZCAmJiBkYXRhLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLmFkYXB0b3IuZnVsbFNjcmVlbkFkYXB0KGRhdGEudmlldy5ub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyrojrflj5blvZPliY1jYW52YXPnmoTnu4Tku7YgKi9cbiAgICBwdWJsaWMgZ2V0Q2FudmFzQ29tcG9uZW50KCk6IGNjLkNvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbnZhcygpLmdldENvbXBvbmVudChcIk1haW5Db250cm9sbGVyXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDb21wb25lbnQ8VCBleHRlbmRzIGNjLkNvbXBvbmVudD4odHlwZTogeyBuZXcoKTogVCB9KTogVDtcbiAgICBwdWJsaWMgYWRkQ29tcG9uZW50KGNsYXNzTmFtZTogc3RyaW5nKTogYW55O1xuICAgIHB1YmxpYyBhZGRDb21wb25lbnQoZGF0YTogYW55KSB7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmdldENhbnZhcygpO1xuICAgICAgICBpZiAoY2FudmFzKSB7XG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gY2FudmFzLmdldENvbXBvbmVudChkYXRhKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLndhcm4oYCR7dGhpcy5fbG9nVGFnfeW3sue7j+WtmOWcqCBDb21wb25lbnQgJHtjb21wb25lbnR9YClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2Mud2FybihgJHt0aGlzLl9sb2dUYWd95bey57uP5a2Y5ZyoIENvbXBvbmVudCAke2NjLmpzLmdldENsYXNzTmFtZShkYXRhKX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYW52YXMuYWRkQ29tcG9uZW50KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVDb21wb25lbnQoY29tcG9uZW50OiBzdHJpbmcgfCBjYy5Db21wb25lbnQpIHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKCk7XG4gICAgICAgIGlmIChjYW52YXMpIGNhbnZhcy5yZW1vdmVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJpbnRWaWV3cygpIHtcbiAgICAgICAgY2MubG9nKGAke3RoaXMuX2xvZ1RhZ30tLS0tLS0tLS12aWV3cy0tLS1zdGFydC0tLS0tYCk7XG4gICAgICAgIHRoaXMuX3ZpZXdEYXRhcy5mb3JFYWNoKCh2YWx1ZTogVmlld0RhdGEsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjYy5sb2coYFske2tleX1dIGlzTG9hZGVkIDogJHt2YWx1ZS5pc0xvYWRlZH0gc3RhdHVzIDogJHt2YWx1ZS5zdGF0dXN9IHZpZXcgOiAke3ZhbHVlLnZpZXd9IGFjdGl2ZSA6ICR7dmFsdWUudmlldyAmJiB2YWx1ZS52aWV3Lm5vZGUgPyB2YWx1ZS52aWV3Lm5vZGUuYWN0aXZlIDogZmFsc2V9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYy5sb2coYCR7dGhpcy5fbG9nVGFnfS0tLS0tLS0tLXZpZXdzLS0tLWVuZC0tLS0tYCk7XG4gICAgfVxuXG4gICAgcHVibGljIHByaW50Q2FudmFzQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNjLmxvZyhgJHt0aGlzLl9sb2dUYWd9LS0tLS0tLS0tLS1wcmludENhbnZhc0NoaWxkcmVuLS1zdGFydC0tLS0tLS0tLS0tYCk7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmdldENhbnZhcygpO1xuICAgICAgICBpZiAoY2FudmFzKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBjYW52YXMuY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKGAke2NoaWxkcmVuW2ldLm5hbWV9IGFjdGl2ZSA6ICR7Y2hpbGRyZW5baV0uYWN0aXZlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhgJHt0aGlzLl9sb2dUYWd9LS0tLS0tLS0tLS1wcmludENhbnZhc0NoaWxkcmVuLS1lbmQtLS0tLS0tLS0tLWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0luTG9naW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZ2V0Vmlld0RhdGEoXCJMb2dpblZpZXdcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGlzSW5IYWxsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldFZpZXdEYXRhKFwiSGFsbE5ld1ZpZXdcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGlzSW5HYW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldFZpZXdEYXRhKFwiQ3Jhc2hHYW1lVmlld1wiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNJbkN1cnJlbnRHYW1lKGdhbWVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5nZXRWaWV3RGF0YShnYW1lTmFtZSk7XG4gICAgfVxufSJdfQ==