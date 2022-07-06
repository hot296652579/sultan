
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/component/WingoColorListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '29f49pQ5klJgZBzy7iIdSqi', 'WingoColorListView');
// games/wingo/script/component/WingoColorListView.ts

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentDefine = __importStar(require("../../../../script/common/define/ComponentDefine"));
const TypeUtils_1 = __importDefault(require("../../../../script/common/utils/TypeUtils"));
const WingoDefine_1 = require("../define/WingoDefine");
// 每次执行协程分配的时间（单位：毫秒）
const EXEC_GENERATOR_TIME = 8;
const { ccclass, property } = cc._decorator;
let WingoColorListView = class WingoColorListView extends cc.Component {
    constructor() {
        // @property({ tooltip: "是否分页加载" })
        // private isPaging: boolean = false;
        super(...arguments);
        // @property({ type: cc.Component.EventHandler, tooltip: "左边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL }) })
        // private pullLeftEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();
        // @property({ type: cc.Component.EventHandler, tooltip: "右边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL }) })
        // private pullRightEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();
        // @property({ type: cc.Component.EventHandler, tooltip: "顶部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL }) })
        // private pullTopEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();
        // @property({ type: cc.Component.EventHandler, tooltip: "底部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL }) })
        // private pullBottomEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();
        // @property({ type: cc.SpriteFrame, tooltip: "刷新拉取等待图片", visible: (function () { return this.isPaging }) })
        // private waitingImage: cc.SpriteFrame = null;
        this.content = null;
        this.itemPrefab = null;
        this.mode = ComponentDefine.ListViewLoadMode.NONE;
        this.direction = ComponentDefine.DirectionType.VERTICAL;
        // @property({ type: cc.Float, tooltip: "滚动之后的减速系数。取值范围是 0-1，如果是 1 则立马停止滚动，如果是 0，则会一直滚动到 content 的边界。", override: true, visible: true })
        // public brake: number = 0.75;
        // @property({ type: cc.Float, tooltip: "回弹所需要的时间。取值范围是 0-10。", override: true, visible: true })
        // public bounceDuration: number = 0.23;
        this.spacingY = 0;
        this.top = 0;
        this.bottom = 0;
        this.spacingX = 0;
        this.left = 0;
        this.right = 0;
        this.clickItemEventHandler = new cc.Component.EventHandler();
        // 是否加载完成
        this._isLoaded = false;
        // 数据列表
        this._itemDataList = [];
        // 列表项节点池
        this._itemNodePool = new cc.NodePool();
        // 最后节点位置
        this._lastPos = cc.v2(0, 0);
        // 渲染列表项起始下标
        this._renderItemStartIndex = null;
        // 渲染列表项结束下标
        this._renderItemEndIndex = null;
        // 是否渲染中
        this._isRendering = false;
        // 缓存列表
        this._itemCacheDataList = [];
        // 渲染中操作次数
        this._renderingOperateCount = 0;
        // 缓存渲染列表项起始下标
        this._cacheRenderItemStartIndex = null;
    }
    /**
     * 修改方向类型属性
     * @param value {ComponentDefine.DirectionType} 方向类型
     */
    changeDirection(value) {
        // this.horizontal = value === ComponentDefine.DirectionType.HORIZONTAL;
        // this.vertical = value === ComponentDefine.DirectionType.VERTICAL;
        // cc.Class["Attr"].setClassAttr(this, "top", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        // cc.Class["Attr"].setClassAttr(this, "bottom", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        // cc.Class["Attr"].setClassAttr(this, "spacingY", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        // cc.Class["Attr"].setClassAttr(this, "verticalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        // cc.Class["Attr"].setClassAttr(this, "left", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
        // cc.Class["Attr"].setClassAttr(this, "right", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
        // cc.Class["Attr"].setClassAttr(this, "spacingX", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
        // cc.Class["Attr"].setClassAttr(this, "horizontalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
    }
    onLoad() {
        this.register();
        this.initData();
        this.initView();
    }
    start() {
    }
    /**
     * 设置项
     * @param itemsData {T | T[]} 数据|数据列表
     */
    set(itemsData) {
        if (TypeUtils_1.default.isNull(itemsData)) {
            return;
        }
        if (TypeUtils_1.default.isArray(itemsData)) {
            if (itemsData.length <= 0) {
                return;
            }
            else {
                itemsData = itemsData.slice(-WingoDefine_1.WingoDefine.HISTORY_COUNT).reverse();
            }
        }
        if (this._isRendering) {
            this.setData(this._itemCacheDataList, itemsData);
            this._cacheRenderItemStartIndex = 0;
            ++this._renderingOperateCount;
        }
        else {
            this.setData(this._itemDataList, itemsData);
            this._renderItemStartIndex = 0;
            this._renderItemEndIndex = this._itemDataList.length;
            this.updateListItem();
        }
    }
    /**
     * 设置数据项
     * @param dataList {T[]} 设置列表
     * @param itemsData {T | T[]} 数据|数据列表
     */
    setData(dataList, itemsData) {
        dataList.length = 0;
        this.insertData(dataList, itemsData, 0);
    }
    /**
     * 插入项
     * @param itemsData {T | T[]} 数据|数据列表
     * @param index {number} 下标（默认：最后插入）
     */
    insert(itemsData, index) {
        if (TypeUtils_1.default.isNull(itemsData)) {
            return;
        }
        if (TypeUtils_1.default.isArray(itemsData) && itemsData.length <= 0) {
            return;
        }
        let dataList = null;
        if (this._isRendering) {
            if (this._renderingOperateCount <= 0) {
                this._itemCacheDataList = [].concat(this._itemDataList);
            }
            dataList = this._itemCacheDataList;
        }
        else {
            dataList = this._itemDataList;
        }
        if (TypeUtils_1.default.isNull(index)) {
            index = dataList.length;
        }
        else {
            if (index < 0) {
                index = 0;
            }
            else if (index > dataList.length) {
                index = dataList.length;
            }
        }
        if (this._isRendering) {
            this.insertData(dataList, itemsData, index);
            if (TypeUtils_1.default.isNull(this._cacheRenderItemStartIndex)) {
                this._cacheRenderItemStartIndex = index;
            }
            else if (this._cacheRenderItemStartIndex > index) {
                this._cacheRenderItemStartIndex = index;
            }
            ++this._renderingOperateCount;
        }
        else {
            this.insertData(dataList, itemsData, index);
            this._renderItemStartIndex = index;
            this._renderItemEndIndex = dataList.length;
            this.updateListItem();
        }
    }
    /**
     * 插入数据项
     * @param dataList {T[]} 插入列表
     * @param itemsData {T | T[]} 数据|数据列表
     * @param index {number} 下标
     */
    insertData(dataList, itemsData, index) {
        if (Array.isArray(itemsData)) {
            let spliceParam = [index, 0];
            spliceParam = spliceParam.concat(itemsData);
            dataList.splice.apply(dataList, spliceParam);
        }
        else {
            dataList.splice(index, 0, itemsData);
        }
    }
    /**
     * 删除项
     * @param index {number} 下标（需要删除的下标）
     * @param count {number} 数量（删除下标后的数量）
     */
    remove(index, count) {
        if (this._itemDataList.length <= 0) {
            return;
        }
        let dataList = null;
        if (this._isRendering) {
            if (this._renderingOperateCount <= 0) {
                this._itemCacheDataList = [].concat(this._itemDataList);
            }
            dataList = this._itemCacheDataList;
        }
        else {
            dataList = this._itemDataList;
        }
        if (TypeUtils_1.default.isNull(index) && TypeUtils_1.default.isNull(count)) {
            index = 0;
            count = dataList.length;
        }
        else if (TypeUtils_1.default.isNull(index)) {
            index = dataList.length - count;
            if (index < 0) {
                index = 0;
                count = dataList.length;
            }
        }
        else if (TypeUtils_1.default.isNull(count)) {
            if (index < 0) {
                index = 0;
            }
            else if (index >= dataList.length) {
                index = dataList.length - 1;
            }
            count = dataList.length - index;
        }
        if (this._isRendering) {
            dataList.splice(index, count);
            if (TypeUtils_1.default.isNull(this._cacheRenderItemStartIndex)) {
                this._cacheRenderItemStartIndex = index;
            }
            else if (this._cacheRenderItemStartIndex > index) {
                this._cacheRenderItemStartIndex = index;
            }
            ++this._renderingOperateCount;
        }
        else {
            dataList.splice(index, count);
            this._renderItemStartIndex = index;
            this._renderItemEndIndex = Math.max(this._itemDataList.length, this.content.childrenCount);
            this.updateListItem();
        }
    }
    clear() {
        this.remove(0);
    }
    getChildNode(startIndex, endIndex) {
        return this.content.children.slice(startIndex, endIndex);
    }
    /**
     * 刷新列表项
     */
    updateListItem() {
        if (!this._isLoaded) {
            return;
        }
        this.setRendering(true);
        let size = this.getInnerEstimateSize();
        this.node.setContentSize(size);
        this.content.setContentSize(size);
        this.content.y = size.height * 0.5;
        this.content.parent.setContentSize(size);
        this.content.parent.y = -(size.height * 0.5);
        if (this.mode === ComponentDefine.ListViewLoadMode.ENDLESS) {
        }
        else {
            let putIndexList = [];
            let isFrameLoad = false;
            for (let i = this._renderItemStartIndex; i < this._renderItemEndIndex; ++i) {
                let itemNode = this.content.children[i];
                let itemData = this._itemDataList[i];
                if (!TypeUtils_1.default.isNull(itemNode) && this._itemDataList.hasOwnProperty(i)) {
                    if (this.clickItemEventHandler) {
                        itemNode.getComponent(cc.Button).node.off("click");
                        itemNode.getComponent(cc.Button).node.on("click", this.onClickItem.bind(this, itemNode, itemData));
                    }
                    let itemSrc = itemNode.getComponent(itemNode.name);
                    itemSrc.onShow && itemSrc.onShow(itemData);
                }
                else if (TypeUtils_1.default.isNull(itemNode) && !this._itemDataList.hasOwnProperty(i)) {
                    continue;
                }
                else if (!this._itemDataList.hasOwnProperty(i)) {
                    putIndexList.push(i);
                }
                else if (TypeUtils_1.default.isNull(itemNode)) {
                    let itemsData = this._itemDataList.slice(i, this._itemDataList.length);
                    ;
                    if (this.mode === ComponentDefine.ListViewLoadMode.FRAME) {
                        let nodePoolSize = this._itemNodePool.size();
                        if (nodePoolSize > 0) {
                            let directLoadEndIndex = i + nodePoolSize;
                            itemsData = this._itemDataList.slice(i, directLoadEndIndex);
                            this.directLoadItem(itemsData);
                            if (directLoadEndIndex < this._renderItemEndIndex) {
                                itemsData = this._itemDataList.slice(directLoadEndIndex, this._renderItemEndIndex);
                                this.frameLoadItem(itemsData);
                                isFrameLoad = true;
                            }
                        }
                        else {
                            this.frameLoadItem(itemsData);
                            isFrameLoad = true;
                        }
                    }
                    else if (this.mode === ComponentDefine.ListViewLoadMode.NONE) {
                        this.directLoadItem(itemsData);
                    }
                    break;
                }
            }
            for (let i = putIndexList.length - 1; i >= 0; --i) {
                let itemNode = this.content.children[putIndexList[i]];
                this.putNode(itemNode);
            }
            if (!isFrameLoad) {
                this.setRendering(false);
            }
        }
    }
    /**
     * 刷新缓存数据列表项
     */
    updateCacheDataList() {
        this.setData(this._itemDataList, this._itemCacheDataList);
        this._itemCacheDataList.length = 0;
        this._renderItemStartIndex = this._cacheRenderItemStartIndex;
        this._renderItemEndIndex = Math.max(this._itemDataList.length, this.content.childrenCount);
        this.updateListItem();
    }
    initData() {
        this._isLoaded = true;
    }
    register() {
        // this.node.on("scroll-to-top", this.onScrollToTop, this);
        // this.node.on("scroll-to-bottom", this.onScrollToBottom, this);
        // this.node.on("scroll-to-left", this.onScrollToLeft, this);
        // this.node.on("scroll-to-right", this.onScrollToRight, this);
        // this.node.on("bounce-bottom", this.onBounceBottom, this);
        // this.node.on("bounce-top", this.onBounceTop, this);
        // this.node.on("bounce-left", this.onBounceLeft, this);
        // this.node.on("bounce-right", this.onBounceRight, this);
        // this.node.on("scrolling", this.onScrolling, this);
        // this.node.on("scroll-ended", this.onScrollEnded, this);
        // this.node.on("touch-up", this.onTouchUp, this);
        // this.node.on("scroll-began", this.onScrollBegan, this);
    }
    unregister() {
        // this.node.off("scroll-to-top", this.onScrollToTop, this);
        // this.node.off("scroll-to-bottom", this.onScrollToBottom, this);
        // this.node.off("scroll-to-left", this.onScrollToLeft, this);
        // this.node.off("scroll-to-right", this.onScrollToRight, this);
        // this.node.off("bounce-bottom", this.onBounceBottom, this);
        // this.node.off("bounce-top", this.onBounceTop, this);
        // this.node.off("bounce-left", this.onBounceLeft, this);
        // this.node.off("bounce-right", this.onBounceRight, this);
        // this.node.off("scrolling", this.onScrolling, this);
        // this.node.off("scroll-ended", this.onScrollEnded, this);
        // this.node.off("touch-up", this.onTouchUp, this);
        // this.node.off("scroll-began", this.onScrollBegan, this);
    }
    initView() {
        let poolNodeCount = 0;
        switch (this.direction) {
            case ComponentDefine.DirectionType.HORIZONTAL:
                {
                    if (this.content.anchorX === 0.5) {
                        this.content.anchorX = 0;
                        this.content.x = this.content.x - (this.content.width * 0.5);
                    }
                    this.content.anchorY = 0.5;
                    poolNodeCount = Math.ceil((this.node.width - this.spacingX) / (this.itemPrefab.data.width + this.spacingX)) + 2;
                }
                break;
            case ComponentDefine.DirectionType.VERTICAL:
                {
                    if (this.content.anchorY === 0.5) {
                        this.content.anchorY = 1;
                        this.content.y = this.content.y + (this.content.height * 0.5);
                    }
                    this.content.anchorX = 0.5;
                    poolNodeCount = Math.ceil((this.node.height - this.spacingY) / (this.itemPrefab.data.height + this.spacingY)) + 2;
                }
                break;
        }
        if (this.mode === ComponentDefine.ListViewLoadMode.ENDLESS) {
            for (let i = 0; i < poolNodeCount; ++i) {
                this.putNode(this.getNode());
            }
        }
        if (this._itemDataList.length > 0) {
            this.updateListItem();
        }
    }
    /**
     * 设置渲染中状态
     * @param isRendering {boolean} 是否正在渲染项
     */
    setRendering(isRendering) {
        this._isRendering = isRendering;
        if (!isRendering) {
            this.onRendered();
        }
    }
    /**
     * 获取列表项节点
     * @returns {cc.Node} 节点
     */
    getNode() {
        if (!this.itemPrefab) {
            G.Logger.error(`请在 ListView 添加预制项 prefab`);
            return null;
        }
        let node = this._itemNodePool.get();
        if (!node) {
            node = cc.instantiate(this.itemPrefab);
            if (this.clickItemEventHandler) {
                let button = node.getComponent(cc.Button);
                if (!button) {
                    button = node.addComponent(cc.Button);
                }
            }
        }
        return node;
    }
    /**
     * 放入列表项节点
     * @param node {cc.Node} 节点
     */
    putNode(node) {
        if (!node || node.name !== this.itemPrefab.data.name) {
            G.Logger.warn(`请不要放入与 ${node.name} 不相关的节点`);
            return null;
        }
        if (this.clickItemEventHandler) {
            node.getComponent(cc.Button).node.off("click");
        }
        node.removeFromParent();
        let src = node.getComponent(node.name);
        src.reset();
        this.scheduleOnce(() => {
            this._itemNodePool.put(node);
        });
    }
    initItemPos(node) {
        let innerCount = this.content.childrenCount - 1;
        if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
            node.setPosition(this.left + (this.itemPrefab.data.width * 0.5) + (innerCount * this.itemPrefab.data.width) + (innerCount * this.spacingX), 0);
        }
        else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
            node.setPosition(0, 0 - this.top - (this.itemPrefab.data.height * 0.5) - (innerCount * this.itemPrefab.data.height) - (innerCount * this.spacingY));
        }
    }
    /**
     * 生产列表项
     * @param itemData {T} 泛型数据
     */
    makeItem(itemData) {
        let itemNode = this.getNode();
        this.content.addChild(itemNode);
        let itemSrc = itemNode.getComponent(itemNode.name);
        if (itemSrc && !TypeUtils_1.default.isNull(itemData)) {
            if (this.clickItemEventHandler) {
                itemNode.getComponent(cc.Button).node.on("click", this.onClickItem.bind(this, itemNode, itemData));
            }
            itemSrc.onShow && itemSrc.onShow(itemData);
        }
        this.initItemPos(itemNode);
    }
    *makeGeneratorItem(itemsData) {
        for (let i = 0; i < itemsData.length; ++i) {
            yield this.makeItem(itemsData[i]);
        }
    }
    /**
     * 执行协程加载列表项
     * @param generator {Generator} 协程
     * @param duration {number} 每次协程占用时间（单位：毫秒）
     * @returns {Promise<void>}
     */
    execGeneratorItem(generator, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let exec = () => {
                    let startTime = Date.now();
                    for (let iterator = generator.next();; iterator = generator.next()) {
                        if (iterator == null || iterator.done) {
                            resolve();
                            break;
                        }
                        if (Date.now() - startTime > duration) {
                            this.scheduleOnce(() => {
                                exec();
                            });
                            break;
                        }
                    }
                };
                exec();
            });
        });
    }
    /**
     * 分帧加载
     * @param itemsData {itemsData: T[]} 列表项数据
     * @returns {Promise<void>}
     */
    frameLoadItem(itemsData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.execGeneratorItem(this.makeGeneratorItem(itemsData), EXEC_GENERATOR_TIME);
            this.setRendering(false);
        });
    }
    /**
     * 直接加载
     * @param itemsData {itemsData: T[]} 列表项数据
     */
    directLoadItem(itemsData) {
        for (let i = 0; i < itemsData.length; ++i) {
            this.makeItem(itemsData[i]);
        }
    }
    // /**
    //  * 获取左边缓存矩形区域
    //  * @returns {cc.Rect} 矩形
    //  */
    // private getCacheRectLeft(): cc.Rect {
    //     let rect: cc.Rect = null;
    //     let point: cc.Vec2 = this.content.parent.convertToWorldSpace(cc.v2(0, 0));
    //     point.x -= this.content.parent.width;
    //     rect = cc.rect(point.x, point.y, this.content.parent.width, this.content.parent.height);
    //     return rect;
    // }
    // /**
    //  * 获取右边缓存矩形区域
    //  * @returns {cc.Rect} 矩形
    //  */
    // private getCacheRectRight(): cc.Rect {
    //     let rect: cc.Rect = null;
    //     let point: cc.Vec2 = this.content.parent.convertToWorldSpace(cc.v2(0, 0));
    //     point.x += this.content.parent.width;
    //     rect = cc.rect(point.x, point.y, this.content.parent.width, this.content.parent.height);
    //     return rect;
    // }
    // /**
    //  * 获取顶部缓存矩形区域
    //  * @returns {cc.Rect} 矩形
    //  */
    // private getCacheRectTop(): cc.Rect {
    //     let rect: cc.Rect = null;
    //     let point: cc.Vec2 = this.content.parent.convertToWorldSpace(cc.v2(0, 0));
    //     point.y += this.content.parent.height;
    //     rect = cc.rect(point.x, point.y, this.content.parent.width, this.content.parent.height);
    //     return rect;
    // }
    // /**
    //  * 获取底部缓存矩形区域
    //  * @returns {cc.Rect} 矩形
    //  */
    // private getCacheRectBottom(): cc.Rect {
    //     let rect: cc.Rect = null;
    //     let point: cc.Vec2 = this.content.parent.convertToWorldSpace(cc.v2(0, 0));
    //     point.y -= this.content.parent.height;
    //     rect = cc.rect(point.x, point.y, this.content.parent.width, this.content.parent.height);
    //     return rect;
    // }
    // /**
    //  * 获取左右缓存矩形区域
    //  * @returns {cc.Rect} 矩形
    //  */
    // private getCacheRectLeftRight(): cc.Rect {
    //     let rect: cc.Rect = null;
    //     let point: cc.Vec2 = this.content.parent.convertToWorldSpace(cc.v2(0, 0));
    //     point.x -= this.content.parent.width;
    //     rect = cc.rect(point.x, point.y, this.content.parent.width * 3, this.content.parent.height);
    //     return rect;
    // }
    // /**
    //  * 获取上下缓存矩形区域
    //  * @returns {cc.Rect} 矩形
    //  */
    // private getCacheRectTopBottom(): cc.Rect {
    //     let rect: cc.Rect = null;
    //     let point: cc.Vec2 = this.content.parent.convertToWorldSpace(cc.v2(0, 0));
    //     point.y -= this.content.parent.height;
    //     rect = cc.rect(point.x, point.y, this.content.parent.width, this.content.parent.height * 3);
    //     return rect;
    // }
    // /**
    //  * 获取中间可视矩形区域
    //  * @returns {cc.Rect} 矩形
    //  */
    // private getVisibleRectCenter(): cc.Rect {
    //     let rect: cc.Rect = null;
    //     let point: cc.Vec2 = this.content.parent.convertToWorldSpace(cc.v2(0, 0));
    //     rect = cc.rect(point.x, point.y, this.content.parent.width, this.content.parent.height);
    //     return rect;
    // }
    // /**
    //  * 获取子项列表的矩形大小
    //  * @param items {ScrollViewInterface.ItemData[]} 子项列表
    //  * @returns {cc.Size}
    //  */
    // private getItemsRectSize(items: ScrollViewInterface.ItemData[]): cc.Size {
    //     let rectSize: cc.Size = new cc.Size(0, 0);
    //     if (items) {
    //         if (!(items instanceof Array)) {
    //             items = [].concat(items);
    //         }
    //         for (let i: number = 0; i < items.length; ++i) {
    //             let item: ScrollViewInterface.ItemData = items[i];
    //             rectSize.width += item.prefab.data.width;
    //             rectSize.height += item.prefab.data.height;
    //         }
    //     }
    //     return rectSize;
    // }
    /**
     * 获取边距
     * @returns {number} 边距
     */
    getPadding() {
        let padding = 0;
        if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
            padding += this.left + this.right;
        }
        else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
            padding += this.top + this.bottom;
        }
        return padding;
    }
    /**
     * 获取间距
     * @returns {number} 间距
     */
    getSpacing() {
        let spacing = 0;
        if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
            spacing = this.spacingX;
        }
        else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
            spacing = this.spacingY;
        }
        return spacing;
    }
    /**
     * 获取内容器预估大小
     * @returns {cc.Size} 内容器预估大小
     */
    getInnerEstimateSize() {
        let size = this.content.parent.getContentSize();
        if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
            size.width = this.getPadding() + (this.getSpacing() * (this._itemDataList.length - 1)) + (this._itemDataList.length * this.itemPrefab.data.width);
            if (size.width < this.content.parent.width) {
                size.width = this.content.parent.width;
            }
        }
        else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
            size.height = this.getPadding() + (this.getSpacing() * (this._itemDataList.length - 1)) + (this._itemDataList.length * this.itemPrefab.data.height);
            if (size.height < this.content.parent.height) {
                size.height = this.content.parent.height;
            }
        }
        return size;
    }
    // private onScrollToTop(target: ListView): void {
    //     if (!this.isPaging) {
    //         return;
    //     }
    //     if (this.pullTopEventHandler) {
    //         this.pullTopEventHandler.emit([target]);
    //     }
    // }
    // private onScrollToBottom(target: ListView): void {
    //     if (!this.isPaging) {
    //         return;
    //     }
    //     if (this.pullBottomEventHandler) {
    //         this.pullBottomEventHandler.emit([target]);
    //     }
    // }
    // private onScrollToLeft(target: ListView): void {
    //     if (!this.isPaging) {
    //         return;
    //     }
    //     if (this.pullLeftEventHandler) {
    //         this.pullLeftEventHandler.emit([target]);
    //     }
    // }
    // private onScrollToRight(target: ListView): void {
    //     if (!this.isPaging) {
    //         return;
    //     }
    //     if (this.pullRightEventHandler) {
    //         this.pullRightEventHandler.emit([target]);
    //     }
    // }
    // private onScrolling(target: ListView): void {
    //     // for (let i: number = 0; i < this.content.childrenCount; ++i) {
    //     //     let itemNode: cc.Node = this.content.children[i];
    //     //     let itemRect: cc.Rect = itemNode.getBoundingBoxToWorld();
    //     //     if (itemRect.intersects(this.m_cacheRect)) {
    //     //     } else {
    //     //         if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
    //     //             if (itemNode.convertToWorldSpace(cc.v2(0, 0)).x > this.content.parent.convertToWorldSpaceAR(cc.v2(0, 0)).x) {
    //     //                 --this.m_lastIndex;
    //     //             }
    //     //         } else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
    //     //             if (itemNode.convertToWorldSpace(cc.v2(0, 0)).y < this.content.parent.convertToWorldSpaceAR(cc.v2(0, 0)).x) {
    //     //                 --this.m_lastIndex;
    //     //             }
    //     //         }
    //     //         this.putNode(itemNode);
    //     //     }
    //     // }
    //     // G.LogMgr.log("Scrolling", target);
    // }
    // private onBounceBottom(target: ListView): void {
    //     if (!this.brake) {
    //         return;
    //     }
    //     // G.LogMgr.log("BounceBottom");
    // }
    // private onBounceTop(target: ListView): void {
    //     if (!this.brake) {
    //         return;
    //     }
    //     // G.LogMgr.log("BounceTop");
    // }
    // private onBounceLeft(target: ListView): void {
    //     if (!this.brake) {
    //         return;
    //     }
    //     // G.LogMgr.log("BounceLeft");
    // }
    // private onBounceRight(target: ListView): void {
    //     if (!this.brake) {
    //         return;
    //     }
    //     // G.LogMgr.log("BounceRight");
    // }
    // private onScrollEnded(target: ListView): void {
    //     // G.LogMgr.log("ScrollEnded");
    // }
    // private onTouchUp(target: ListView): void {
    //     // G.LogMgr.log("TouchUp");
    // }
    // private onScrollBegan(target: ListView): void {
    //     // G.LogMgr.log("ScrollBegan");
    // }
    /**
     * 加载渲染完成 回调
     */
    onRendered() {
        this._renderingOperateCount = 0;
        if (this._itemCacheDataList.length <= 0) {
            this._cacheRenderItemStartIndex = null;
            return;
        }
        this.updateCacheDataList();
    }
    update(dt) {
    }
    onClickItem(node, data) {
        this.clickItemEventHandler.emit([node, data]);
    }
    onDestroy() {
        this.unregister();
    }
};
__decorate([
    property(cc.Node)
], WingoColorListView.prototype, "content", void 0);
__decorate([
    property({ type: cc.Prefab, tooltip: "列表项预制" })
], WingoColorListView.prototype, "itemPrefab", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.ListViewLoadMode), tooltip: "加载模式\nNONE 直接加载\nFRAME 分帧加载\nENDLESS 无限加载" })
], WingoColorListView.prototype, "mode", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.DirectionType), tooltip: "滑动方向\nHORIZONTAL 水平\nVERTICAL 垂直" })
], WingoColorListView.prototype, "direction", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "垂直间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoColorListView.prototype, "spacingY", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "顶间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoColorListView.prototype, "top", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "底间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoColorListView.prototype, "bottom", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "水平间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoColorListView.prototype, "spacingX", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "左间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoColorListView.prototype, "left", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "右间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoColorListView.prototype, "right", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "点击列表项回调", visible: true })
], WingoColorListView.prototype, "clickItemEventHandler", void 0);
WingoColorListView = __decorate([
    ccclass
], WingoColorListView);
exports.default = WingoColorListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvY29tcG9uZW50L1dpbmdvQ29sb3JMaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrR0FBb0Y7QUFFcEYsMEZBQWtFO0FBQ2xFLHVEQUFvRDtBQUVwRCxxQkFBcUI7QUFDckIsTUFBTSxtQkFBbUIsR0FBVyxDQUFDLENBQUM7QUFFdEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGtCQUFrQixHQUF2QyxNQUFxQixrQkFBbUIsU0FBUSxFQUFFLENBQUMsU0FBUztJQUE1RDtRQUVJLG1DQUFtQztRQUNuQyxxQ0FBcUM7O1FBRXJDLG9MQUFvTDtRQUNwTCw2RkFBNkY7UUFFN0Ysb0xBQW9MO1FBQ3BMLDhGQUE4RjtRQUU5RixrTEFBa0w7UUFDbEwsNEZBQTRGO1FBRTVGLGtMQUFrTDtRQUNsTCwrRkFBK0Y7UUFFL0YsNEdBQTRHO1FBQzVHLCtDQUErQztRQUd2QyxZQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGVBQVUsR0FBYyxJQUFJLENBQUM7UUFHOUIsU0FBSSxHQUFxQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBRzlFLGNBQVMsR0FBa0MsZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFFMUYsd0lBQXdJO1FBQ3hJLCtCQUErQjtRQUUvQixnR0FBZ0c7UUFDaEcsd0NBQXdDO1FBR2hDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUdoQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBR25CLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUdqQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBR2xCLDBCQUFxQixHQUE4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YSxDQUFDLEVBQUUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLENBQUM7cURBQ2Q7QUFTMUY7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvREFDOUc7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzsrQ0FDbEg7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztrREFDL0c7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvREFDaEg7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnREFDbkg7QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztpREFDbEg7QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7aUVBQ1U7QUF6RDFFLGtCQUFrQjtJQUR0QyxPQUFPO0dBQ2Esa0JBQWtCLENBODFCdEM7a0JBOTFCb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQ29tcG9uZW50RGVmaW5lIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2RlZmluZS9Db21wb25lbnREZWZpbmVcIjtcbmltcG9ydCAqIGFzIENvbXBvbmVudEludGVyZmFjZSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9pbnRlcmZhY2UvQ29tcG9uZW50SW50ZXJmYWNlXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IHsgV2luZ29EZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL1dpbmdvRGVmaW5lXCI7XG5cbi8vIOavj+asoeaJp+ihjOWNj+eoi+WIhumFjeeahOaXtumXtO+8iOWNleS9je+8muavq+enku+8iVxuY29uc3QgRVhFQ19HRU5FUkFUT1JfVElNRTogbnVtYmVyID0gODtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmdvQ29sb3JMaXN0VmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuaYr+WQpuWIhumhteWKoOi9vVwiIH0pXG4gICAgLy8gcHJpdmF0ZSBpc1BhZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLlt6bovrnmi4nlj5blm57osINcIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaXNQYWdpbmcgJiYgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICAvLyBwcml2YXRlIHB1bGxMZWZ0RXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5Y+z6L655ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgLy8gcHJpdmF0ZSBwdWxsUmlnaHRFdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLpobbpg6jmi4nlj5blm57osINcIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaXNQYWdpbmcgJiYgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMIH0pIH0pXG4gICAgLy8gcHJpdmF0ZSBwdWxsVG9wRXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5bqV6YOo5ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIC8vIHByaXZhdGUgcHVsbEJvdHRvbUV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgdG9vbHRpcDogXCLliLfmlrDmi4nlj5bnrYnlvoXlm77niYdcIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaXNQYWdpbmcgfSkgfSlcbiAgICAvLyBwcml2YXRlIHdhaXRpbmdJbWFnZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLliJfooajpobnpooTliLZcIiB9KVxuICAgIHByaXZhdGUgaXRlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUpLCB0b29sdGlwOiBcIuWKoOi9veaooeW8j1xcbk5PTkUg55u05o6l5Yqg6L29XFxuRlJBTUUg5YiG5bin5Yqg6L29XFxuRU5ETEVTUyDml6DpmZDliqDovb1cIiB9KVxuICAgIHB1YmxpYyBtb2RlOiBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZSA9IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLk5PTkU7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlKSwgdG9vbHRpcDogXCLmu5HliqjmlrnlkJFcXG5IT1JJWk9OVEFMIOawtOW5s1xcblZFUlRJQ0FMIOWeguebtFwiIH0pXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb246IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUw7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLmu5rliqjkuYvlkI7nmoTlh4/pgJ/ns7vmlbDjgILlj5blgLzojIPlm7TmmK8gMC0x77yM5aaC5p6c5pivIDEg5YiZ56uL6ams5YGc5q2i5rua5Yqo77yM5aaC5p6c5pivIDDvvIzliJnkvJrkuIDnm7Tmu5rliqjliLAgY29udGVudCDnmoTovrnnlYzjgIJcIiwgb3ZlcnJpZGU6IHRydWUsIHZpc2libGU6IHRydWUgfSlcbiAgICAvLyBwdWJsaWMgYnJha2U6IG51bWJlciA9IDAuNzU7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlm57lvLnmiYDpnIDopoHnmoTml7bpl7TjgILlj5blgLzojIPlm7TmmK8gMC0xMOOAglwiLCBvdmVycmlkZTogdHJ1ZSwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIC8vIHB1YmxpYyBib3VuY2VEdXJhdGlvbjogbnVtYmVyID0gMC4yMztcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuWeguebtOmXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMIH0pIH0pXG4gICAgcHJpdmF0ZSBzcGFjaW5nWTogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIumhtumXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMIH0pIH0pXG4gICAgcHJpdmF0ZSB0b3A6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlupXpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgYm90dG9tOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5rC05bmz6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgc3BhY2luZ1g6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlt6bpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgcHJpdmF0ZSBsZWZ0OiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Y+z6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgcmlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIueCueWHu+WIl+ihqOmhueWbnuiwg1wiLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBjbGlja0l0ZW1FdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgLy8g5piv5ZCm5Yqg6L295a6M5oiQXG4gICAgcHJpdmF0ZSBfaXNMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyDmlbDmja7liJfooahcbiAgICBwcml2YXRlIF9pdGVtRGF0YUxpc3Q6IHVua25vd25bXSA9IFtdO1xuICAgIC8vIOWIl+ihqOmhueiKgueCueaxoFxuICAgIHByaXZhdGUgX2l0ZW1Ob2RlUG9vbDogY2MuTm9kZVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAvLyDmnIDlkI7oioLngrnkvY3nva5cbiAgICBwcml2YXRlIF9sYXN0UG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XG4gICAgLy8g5riy5p+T5YiX6KGo6aG56LW35aeL5LiL5qCHXG4gICAgcHJpdmF0ZSBfcmVuZGVySXRlbVN0YXJ0SW5kZXg6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5riy5p+T5YiX6KGo6aG557uT5p2f5LiL5qCHXG4gICAgcHJpdmF0ZSBfcmVuZGVySXRlbUVuZEluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOaYr+WQpua4suafk+S4rVxuICAgIHByaXZhdGUgX2lzUmVuZGVyaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g57yT5a2Y5YiX6KGoXG4gICAgcHJpdmF0ZSBfaXRlbUNhY2hlRGF0YUxpc3Q6IHVua25vd25bXSA9IFtdO1xuICAgIC8vIOa4suafk+S4reaTjeS9nOasoeaVsFxuICAgIHByaXZhdGUgX3JlbmRlcmluZ09wZXJhdGVDb3VudDogbnVtYmVyID0gMDtcbiAgICAvLyDnvJPlrZjmuLLmn5PliJfooajpobnotbflp4vkuIvmoIdcbiAgICBwcml2YXRlIF9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog5L+u5pS55pa55ZCR57G75Z6L5bGe5oCnXG4gICAgICogQHBhcmFtIHZhbHVlIHtDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZX0g5pa55ZCR57G75Z6LXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VEaXJlY3Rpb24odmFsdWU6IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlKTogdm9pZCB7XG4gICAgICAgIC8vIHRoaXMuaG9yaXpvbnRhbCA9IHZhbHVlID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMO1xuICAgICAgICAvLyB0aGlzLnZlcnRpY2FsID0gdmFsdWUgPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMO1xuXG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJ0b3BcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJib3R0b21cIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJzcGFjaW5nWVwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInZlcnRpY2FsU2Nyb2xsQmFyXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwibGVmdFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwicmlnaHRcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInNwYWNpbmdYXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJob3Jpem9udGFsU2Nyb2xsQmFyXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCk7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u6aG5XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQ8VD4oaXRlbXNEYXRhOiBUIHwgVFtdKTogdm9pZCB7XG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKGl0ZW1zRGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNBcnJheShpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICBpZiAoKGl0ZW1zRGF0YSBhcyBBcnJheTxUPikubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1zRGF0YSA9IChpdGVtc0RhdGEgYXMgQXJyYXk8VD4pLnNsaWNlKC1XaW5nb0RlZmluZS5ISVNUT1JZX0NPVU5UKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCwgaXRlbXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSAwO1xuICAgICAgICAgICAgKyt0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEodGhpcy5faXRlbURhdGFMaXN0LCBpdGVtc0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbVN0YXJ0SW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4ID0gdGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9ruaVsOaNrumhuVxuICAgICAqIEBwYXJhbSBkYXRhTGlzdCB7VFtdfSDorr7nva7liJfooahcbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtUIHwgVFtdfSDmlbDmja585pWw5o2u5YiX6KGoXG4gICAgICovXG4gICAgcHVibGljIHNldERhdGE8VD4oZGF0YUxpc3Q6IFRbXSwgaXRlbXNEYXRhOiBUIHwgVFtdKTogdm9pZCB7XG4gICAgICAgIGRhdGFMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuaW5zZXJ0RGF0YShkYXRhTGlzdCwgaXRlbXNEYXRhLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmj5LlhaXpoblcbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtUIHwgVFtdfSDmlbDmja585pWw5o2u5YiX6KGoXG4gICAgICogQHBhcmFtIGluZGV4IHtudW1iZXJ9IOS4i+agh++8iOm7mOiupO+8muacgOWQjuaPkuWFpe+8iVxuICAgICAqL1xuICAgIHB1YmxpYyBpbnNlcnQ8VD4oaXRlbXNEYXRhOiBUIHwgVFtdLCBpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzQXJyYXkoaXRlbXNEYXRhKSAmJiAoaXRlbXNEYXRhIGFzIEFycmF5PFQ+KS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFMaXN0OiB1bmtub3duW10gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0ID0gW10uY29uY2F0KHRoaXMuX2l0ZW1EYXRhTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhTGlzdCA9IHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtRGF0YUxpc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpbmRleCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gZGF0YUxpc3QubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPiBkYXRhTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1JlbmRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnREYXRhKGRhdGFMaXN0LCBpdGVtc0RhdGEsIGluZGV4KTtcbiAgICAgICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID4gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICArK3RoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGF0YShkYXRhTGlzdCwgaXRlbXNEYXRhLCBpbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4ID0gZGF0YUxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+S5YWl5pWw5o2u6aG5XG4gICAgICogQHBhcmFtIGRhdGFMaXN0IHtUW119IOaPkuWFpeWIl+ihqFxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge1QgfCBUW119IOaVsOaNrnzmlbDmja7liJfooahcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn0g5LiL5qCHXG4gICAgICovXG4gICAgcHVibGljIGluc2VydERhdGE8VD4oZGF0YUxpc3Q6IFRbXSwgaXRlbXNEYXRhOiBUIHwgVFtdLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zRGF0YSkpIHtcbiAgICAgICAgICAgIGxldCBzcGxpY2VQYXJhbTogdW5rbm93bltdID0gW2luZGV4LCAwXTtcbiAgICAgICAgICAgIHNwbGljZVBhcmFtID0gc3BsaWNlUGFyYW0uY29uY2F0KGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICBkYXRhTGlzdC5zcGxpY2UuYXBwbHkoZGF0YUxpc3QsIHNwbGljZVBhcmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFMaXN0LnNwbGljZShpbmRleCwgMCwgaXRlbXNEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIoOmZpOmhuVxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSDkuIvmoIfvvIjpnIDopoHliKDpmaTnmoTkuIvmoIfvvIlcbiAgICAgKiBAcGFyYW0gY291bnQge251bWJlcn0g5pWw6YeP77yI5Yig6Zmk5LiL5qCH5ZCO55qE5pWw6YeP77yJXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZShpbmRleD86IG51bWJlciwgY291bnQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFMaXN0OiB1bmtub3duW10gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0ID0gW10uY29uY2F0KHRoaXMuX2l0ZW1EYXRhTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhTGlzdCA9IHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtRGF0YUxpc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpbmRleCkgJiYgVHlwZVV0aWxzLmlzTnVsbChjb3VudCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGNvdW50ID0gZGF0YUxpc3QubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGRhdGFMaXN0Lmxlbmd0aCAtIGNvdW50O1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGNvdW50KSkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPj0gZGF0YUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnQgPSBkYXRhTGlzdC5sZW5ndGggLSBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1JlbmRlcmluZykge1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlKGluZGV4LCBjb3VudCk7XG4gICAgICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKyt0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhTGlzdC5zcGxpY2UoaW5kZXgsIGNvdW50KTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXggPSBNYXRoLm1heCh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoLCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3ZlKDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDaGlsZE5vZGUoc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleDogbnVtYmVyKTogY2MuTm9kZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jaGlsZHJlbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yi35paw5YiX6KGo6aG5XG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVMaXN0SXRlbSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0xvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRSZW5kZXJpbmcodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHNpemU6IGNjLlNpemUgPSB0aGlzLmdldElubmVyRXN0aW1hdGVTaXplKCk7XG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShzaXplKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNldENvbnRlbnRTaXplKHNpemUpO1xuICAgICAgICB0aGlzLmNvbnRlbnQueSA9IHNpemUuaGVpZ2h0ICogMC41O1xuICAgICAgICB0aGlzLmNvbnRlbnQucGFyZW50LnNldENvbnRlbnRTaXplKHNpemUpO1xuICAgICAgICB0aGlzLmNvbnRlbnQucGFyZW50LnkgPSAtKHNpemUuaGVpZ2h0ICogMC41KTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5FTkRMRVNTKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwdXRJbmRleExpc3Q6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBsZXQgaXNGcmFtZUxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4OyBpIDwgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4OyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1EYXRhOiB1bmtub3duID0gdGhpcy5faXRlbURhdGFMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFUeXBlVXRpbHMuaXNOdWxsKGl0ZW1Ob2RlKSAmJiB0aGlzLl9pdGVtRGF0YUxpc3QuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5ub2RlLm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja0l0ZW0uYmluZCh0aGlzLCBpdGVtTm9kZSwgaXRlbURhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVNyYzogQ29tcG9uZW50SW50ZXJmYWNlLkxpc3RWaWV3SXRlbUNsYXNzID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGl0ZW1Ob2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtU3JjLm9uU2hvdyAmJiBpdGVtU3JjLm9uU2hvdyhpdGVtRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGl0ZW1Ob2RlKSAmJiAhdGhpcy5faXRlbURhdGFMaXN0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2l0ZW1EYXRhTGlzdC5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICBwdXRJbmRleExpc3QucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbU5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtc0RhdGE6IHVua25vd25bXSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShpLCB0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoKTs7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLkZSQU1FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZVBvb2xTaXplOiBudW1iZXIgPSB0aGlzLl9pdGVtTm9kZVBvb2wuc2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVQb29sU2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0TG9hZEVuZEluZGV4OiBudW1iZXIgPSBpICsgbm9kZVBvb2xTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zRGF0YSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShpLCBkaXJlY3RMb2FkRW5kSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0TG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0TG9hZEVuZEluZGV4IDwgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zRGF0YSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShkaXJlY3RMb2FkRW5kSW5kZXgsIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVMb2FkSXRlbShpdGVtc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZyYW1lTG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lTG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZyYW1lTG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5OT05FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdExvYWRJdGVtKGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBwdXRJbmRleExpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bcHV0SW5kZXhMaXN0W2ldXTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dE5vZGUoaXRlbU5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzRnJhbWVMb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSZW5kZXJpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yi35paw57yT5a2Y5pWw5o2u5YiX6KGo6aG5XG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVDYWNoZURhdGFMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldERhdGEodGhpcy5faXRlbURhdGFMaXN0LCB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCk7XG4gICAgICAgIHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4ID0gTWF0aC5tYXgodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNMb2FkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbC10by10b3BcIiwgdGhpcy5vblNjcm9sbFRvVG9wLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLWJvdHRvbVwiLCB0aGlzLm9uU2Nyb2xsVG9Cb3R0b20sIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tbGVmdFwiLCB0aGlzLm9uU2Nyb2xsVG9MZWZ0LCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLXJpZ2h0XCIsIHRoaXMub25TY3JvbGxUb1JpZ2h0LCB0aGlzKTtcblxuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJib3VuY2UtYm90dG9tXCIsIHRoaXMub25Cb3VuY2VCb3R0b20sIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJib3VuY2UtdG9wXCIsIHRoaXMub25Cb3VuY2VUb3AsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJib3VuY2UtbGVmdFwiLCB0aGlzLm9uQm91bmNlTGVmdCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImJvdW5jZS1yaWdodFwiLCB0aGlzLm9uQm91bmNlUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsaW5nLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsLWVuZGVkXCIsIHRoaXMub25TY3JvbGxFbmRlZCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInRvdWNoLXVwXCIsIHRoaXMub25Ub3VjaFVwLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsLWJlZ2FuXCIsIHRoaXMub25TY3JvbGxCZWdhbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bnJlZ2lzdGVyKCk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLXRvLXRvcFwiLCB0aGlzLm9uU2Nyb2xsVG9Ub3AsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLXRvLWJvdHRvbVwiLCB0aGlzLm9uU2Nyb2xsVG9Cb3R0b20sIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLXRvLWxlZnRcIiwgdGhpcy5vblNjcm9sbFRvTGVmdCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vblNjcm9sbFRvUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJib3VuY2UtYm90dG9tXCIsIHRoaXMub25Cb3VuY2VCb3R0b20sIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLXRvcFwiLCB0aGlzLm9uQm91bmNlVG9wLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcImJvdW5jZS1sZWZ0XCIsIHRoaXMub25Cb3VuY2VMZWZ0LCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcImJvdW5jZS1yaWdodFwiLCB0aGlzLm9uQm91bmNlUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGxpbmdcIiwgdGhpcy5vblNjcm9sbGluZywgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInRvdWNoLXVwXCIsIHRoaXMub25Ub3VjaFVwLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC1iZWdhblwiLCB0aGlzLm9uU2Nyb2xsQmVnYW4sIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIGxldCBwb29sTm9kZUNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTDoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuYW5jaG9yWCA9PT0gMC41KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hbmNob3JYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnggPSB0aGlzLmNvbnRlbnQueCAtICh0aGlzLmNvbnRlbnQud2lkdGggKiAwLjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYW5jaG9yWSA9IDAuNTtcbiAgICAgICAgICAgICAgICBwb29sTm9kZUNvdW50ID0gTWF0aC5jZWlsKCh0aGlzLm5vZGUud2lkdGggLSB0aGlzLnNwYWNpbmdYKSAvICh0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCArIHRoaXMuc3BhY2luZ1gpKSArIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5hbmNob3JZID09PSAwLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFuY2hvclkgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IHRoaXMuY29udGVudC55ICsgKHRoaXMuY29udGVudC5oZWlnaHQgKiAwLjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYW5jaG9yWCA9IDAuNTtcbiAgICAgICAgICAgICAgICBwb29sTm9kZUNvdW50ID0gTWF0aC5jZWlsKCh0aGlzLm5vZGUuaGVpZ2h0IC0gdGhpcy5zcGFjaW5nWSkgLyAodGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0ICsgdGhpcy5zcGFjaW5nWSkpICsgMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLkVORExFU1MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBwb29sTm9kZUNvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dE5vZGUodGhpcy5nZXROb2RlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7muLLmn5PkuK3nirbmgIFcbiAgICAgKiBAcGFyYW0gaXNSZW5kZXJpbmcge2Jvb2xlYW59IOaYr+WQpuato+WcqOa4suafk+mhuVxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0UmVuZGVyaW5nKGlzUmVuZGVyaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gaXNSZW5kZXJpbmc7XG4gICAgICAgIGlmICghaXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXJlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5YiX6KGo6aG56IqC54K5XG4gICAgICogQHJldHVybnMge2NjLk5vZGV9IOiKgueCuVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0Tm9kZSgpOiBjYy5Ob2RlIHwgbnVsbCB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtUHJlZmFiKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci5lcnJvcihg6K+35ZyoIExpc3RWaWV3IOa3u+WKoOmihOWItumhuSBwcmVmYWJgKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSB0aGlzLl9pdGVtTm9kZVBvb2wuZ2V0KCk7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZhYik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrSXRlbUV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGxldCBidXR0b246IGNjLkJ1dHRvbiA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgaWYgKCFidXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uID0gbm9kZS5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlL7lhaXliJfooajpobnoioLngrlcbiAgICAgKiBAcGFyYW0gbm9kZSB7Y2MuTm9kZX0g6IqC54K5XG4gICAgICovXG4gICAgcHJpdmF0ZSBwdXROb2RlKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFub2RlIHx8IG5vZGUubmFtZSAhPT0gdGhpcy5pdGVtUHJlZmFiLmRhdGEubmFtZSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIud2Fybihg6K+35LiN6KaB5pS+5YWl5LiOICR7bm9kZS5uYW1lfSDkuI3nm7jlhbPnmoToioLngrlgKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLm5vZGUub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcblxuICAgICAgICBsZXQgc3JjOiBDb21wb25lbnRJbnRlcmZhY2UuTGlzdFZpZXdJdGVtQ2xhc3MgPSBub2RlLmdldENvbXBvbmVudChub2RlLm5hbWUpO1xuICAgICAgICBzcmMucmVzZXQoKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtTm9kZVBvb2wucHV0KG5vZGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRJdGVtUG9zKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlubmVyQ291bnQ6IG51bWJlciA9IHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50IC0gMTtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMubGVmdCArICh0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCAqIDAuNSkgKyAoaW5uZXJDb3VudCAqIHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoKSArIChpbm5lckNvdW50ICogdGhpcy5zcGFjaW5nWCksIDApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLCAwIC0gdGhpcy50b3AgLSAodGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0ICogMC41KSAtIChpbm5lckNvdW50ICogdGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0KSAtIChpbm5lckNvdW50ICogdGhpcy5zcGFjaW5nWSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55Sf5Lqn5YiX6KGo6aG5XG4gICAgICogQHBhcmFtIGl0ZW1EYXRhIHtUfSDms5vlnovmlbDmja5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VJdGVtPFQ+KGl0ZW1EYXRhOiBUKTogdm9pZCB7XG4gICAgICAgIGxldCBpdGVtTm9kZTogY2MuTm9kZSA9IHRoaXMuZ2V0Tm9kZSgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbU5vZGUpO1xuICAgICAgICBsZXQgaXRlbVNyYzogQ29tcG9uZW50SW50ZXJmYWNlLkxpc3RWaWV3SXRlbUNsYXNzID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGl0ZW1Ob2RlLm5hbWUpO1xuICAgICAgICBpZiAoaXRlbVNyYyAmJiAhVHlwZVV0aWxzLmlzTnVsbChpdGVtRGF0YSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrSXRlbUV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tJdGVtLmJpbmQodGhpcywgaXRlbU5vZGUsIGl0ZW1EYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtU3JjLm9uU2hvdyAmJiBpdGVtU3JjLm9uU2hvdyhpdGVtRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJdGVtUG9zKGl0ZW1Ob2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlICptYWtlR2VuZXJhdG9ySXRlbTxUPihpdGVtc0RhdGE6IFRbXSk6IEdlbmVyYXRvciB7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtc0RhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMubWFrZUl0ZW0oaXRlbXNEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJp+ihjOWNj+eoi+WKoOi9veWIl+ihqOmhuVxuICAgICAqIEBwYXJhbSBnZW5lcmF0b3Ige0dlbmVyYXRvcn0g5Y2P56iLXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIHtudW1iZXJ9IOavj+asoeWNj+eoi+WNoOeUqOaXtumXtO+8iOWNleS9je+8muavq+enku+8iVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZXhlY0dlbmVyYXRvckl0ZW0oZ2VuZXJhdG9yOiBHZW5lcmF0b3IsIGR1cmF0aW9uOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiAodmFsdWU6IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPikgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhlYzogRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlcmF0b3IgPSBnZW5lcmF0b3IubmV4dCgpOyA7IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IgPT0gbnVsbCB8fCBpdGVyYXRvci5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gc3RhcnRUaW1lID4gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleGVjKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIhuW4p+WKoOi9vVxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge2l0ZW1zRGF0YTogVFtdfSDliJfooajpobnmlbDmja5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGZyYW1lTG9hZEl0ZW08VD4oaXRlbXNEYXRhOiBUW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjR2VuZXJhdG9ySXRlbSh0aGlzLm1ha2VHZW5lcmF0b3JJdGVtKGl0ZW1zRGF0YSksIEVYRUNfR0VORVJBVE9SX1RJTUUpO1xuICAgICAgICB0aGlzLnNldFJlbmRlcmluZyhmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55u05o6l5Yqg6L29XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7aXRlbXNEYXRhOiBUW119IOWIl+ihqOmhueaVsOaNrlxuICAgICAqL1xuICAgIHByaXZhdGUgZGlyZWN0TG9hZEl0ZW08VD4oaXRlbXNEYXRhOiBUW10pOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGl0ZW1zRGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5tYWtlSXRlbShpdGVtc0RhdGFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5bem6L6557yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0TGVmdCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC54IC09IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGg7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5Y+z6L6557yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0UmlnaHQoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueCArPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPlumhtumDqOe8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdFRvcCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC55ICs9IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluW6lemDqOe8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdEJvdHRvbSgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC55IC09IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluW3puWPs+e8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdExlZnRSaWdodCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC54IC09IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGg7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGggKiAzLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluS4iuS4i+e8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdFRvcEJvdHRvbSgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC55IC09IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCAqIDMpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5bkuK3pl7Tlj6/op4bnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRWaXNpYmxlUmVjdENlbnRlcigpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluWtkOmhueWIl+ihqOeahOefqeW9ouWkp+Wwj1xuICAgIC8vICAqIEBwYXJhbSBpdGVtcyB7U2Nyb2xsVmlld0ludGVyZmFjZS5JdGVtRGF0YVtdfSDlrZDpobnliJfooahcbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuU2l6ZX1cbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldEl0ZW1zUmVjdFNpemUoaXRlbXM6IFNjcm9sbFZpZXdJbnRlcmZhY2UuSXRlbURhdGFbXSk6IGNjLlNpemUge1xuICAgIC8vICAgICBsZXQgcmVjdFNpemU6IGNjLlNpemUgPSBuZXcgY2MuU2l6ZSgwLCAwKTtcblxuICAgIC8vICAgICBpZiAoaXRlbXMpIHtcbiAgICAvLyAgICAgICAgIGlmICghKGl0ZW1zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgLy8gICAgICAgICAgICAgaXRlbXMgPSBbXS5jb25jYXQoaXRlbXMpO1xuICAgIC8vICAgICAgICAgfVxuXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAvLyAgICAgICAgICAgICBsZXQgaXRlbTogU2Nyb2xsVmlld0ludGVyZmFjZS5JdGVtRGF0YSA9IGl0ZW1zW2ldO1xuICAgIC8vICAgICAgICAgICAgIHJlY3RTaXplLndpZHRoICs9IGl0ZW0ucHJlZmFiLmRhdGEud2lkdGg7XG4gICAgLy8gICAgICAgICAgICAgcmVjdFNpemUuaGVpZ2h0ICs9IGl0ZW0ucHJlZmFiLmRhdGEuaGVpZ2h0O1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgcmV0dXJuIHJlY3RTaXplO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlui+uei3nVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IOi+uei3nVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UGFkZGluZygpOiBudW1iZXIge1xuICAgICAgICBsZXQgcGFkZGluZzogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBwYWRkaW5nICs9IHRoaXMubGVmdCArIHRoaXMucmlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBwYWRkaW5nICs9IHRoaXMudG9wICsgdGhpcy5ib3R0b207XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZGRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6Ze06LedXG4gICAgICogQHJldHVybnMge251bWJlcn0g6Ze06LedXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTcGFjaW5nKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBzcGFjaW5nOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHNwYWNpbmcgPSB0aGlzLnNwYWNpbmdYO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgc3BhY2luZyA9IHRoaXMuc3BhY2luZ1k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYWNpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5YaF5a655Zmo6aKE5Lyw5aSn5bCPXG4gICAgICogQHJldHVybnMge2NjLlNpemV9IOWGheWuueWZqOmihOS8sOWkp+Wwj1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJbm5lckVzdGltYXRlU2l6ZSgpOiBjYy5TaXplIHtcbiAgICAgICAgbGV0IHNpemU6IGNjLlNpemUgPSB0aGlzLmNvbnRlbnQucGFyZW50LmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgc2l6ZS53aWR0aCA9IHRoaXMuZ2V0UGFkZGluZygpICsgKHRoaXMuZ2V0U3BhY2luZygpICogKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggLSAxKSkgKyAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCAqIHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoKTtcbiAgICAgICAgICAgIGlmIChzaXplLndpZHRoIDwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCkge1xuICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSB0aGlzLmdldFBhZGRpbmcoKSArICh0aGlzLmdldFNwYWNpbmcoKSAqICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIC0gMSkpICsgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQpO1xuICAgICAgICAgICAgaWYgKHNpemUuaGVpZ2h0IDwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBzaXplLmhlaWdodCA9IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxUb1RvcCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKHRoaXMucHVsbFRvcEV2ZW50SGFuZGxlcikge1xuICAgIC8vICAgICAgICAgdGhpcy5wdWxsVG9wRXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbFRvQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsQm90dG9tRXZlbnRIYW5kbGVyKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnB1bGxCb3R0b21FdmVudEhhbmRsZXIuZW1pdChbdGFyZ2V0XSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uU2Nyb2xsVG9MZWZ0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlcikge1xuICAgIC8vICAgICAgICAgdGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxUb1JpZ2h0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsUmlnaHRFdmVudEhhbmRsZXIpIHtcbiAgICAvLyAgICAgICAgIHRoaXMucHVsbFJpZ2h0RXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbGluZyh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIC8vIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudDsgKytpKSB7XG4gICAgLy8gICAgIC8vICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgLy8gICAgIC8vICAgICBsZXQgaXRlbVJlY3Q6IGNjLlJlY3QgPSBpdGVtTm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcblxuICAgIC8vICAgICAvLyAgICAgaWYgKGl0ZW1SZWN0LmludGVyc2VjdHModGhpcy5tX2NhY2hlUmVjdCkpIHtcblxuICAgIC8vICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnggPiB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgIC8vICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnkgPCB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAvLyAgICAgICAgIHRoaXMucHV0Tm9kZShpdGVtTm9kZSk7XG4gICAgLy8gICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gfVxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJTY3JvbGxpbmdcIiwgdGFyZ2V0KTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uQm91bmNlQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VCb3R0b21cIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvbkJvdW5jZVRvcCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlVG9wXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Cb3VuY2VMZWZ0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VMZWZ0XCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Cb3VuY2VSaWdodCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlUmlnaHRcIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbEVuZGVkKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiU2Nyb2xsRW5kZWRcIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblRvdWNoVXAodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJUb3VjaFVwXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxCZWdhbih0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIC8vIEcuTG9nTWdyLmxvZyhcIlNjcm9sbEJlZ2FuXCIpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9vea4suafk+WujOaIkCDlm57osINcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uUmVuZGVyZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FjaGVEYXRhTGlzdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tJdGVtPFQ+KG5vZGU6IGNjLk5vZGUsIGRhdGE6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIuZW1pdChbbm9kZSwgZGF0YV0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyKCk7XG4gICAgfVxuXG59XG4iXX0=