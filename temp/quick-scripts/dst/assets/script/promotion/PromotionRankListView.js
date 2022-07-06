
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/promotion/PromotionRankListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc19d5BAHxPMo9Aars/hyCt', 'PromotionRankListView');
// script/promotion/PromotionRankListView.ts

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
const ComponentDefine = __importStar(require("../../script/common/define/ComponentDefine"));
const TypeUtils_1 = __importDefault(require("../common/utils/TypeUtils"));
// 每次执行协程分配的时间（单位：毫秒）
const EXEC_GENERATOR_TIME = 8;
const { ccclass, property } = cc._decorator;
let PromotionRankListView = class PromotionRankListView extends cc.Component {
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
        if (TypeUtils_1.default.isArray(itemsData) && itemsData.length <= 0) {
            return;
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
        this.content.setContentSize(this.getInnerEstimateSize());
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
], PromotionRankListView.prototype, "content", void 0);
__decorate([
    property({ type: cc.Prefab, tooltip: "列表项预制" })
], PromotionRankListView.prototype, "itemPrefab", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.ListViewLoadMode), tooltip: "加载模式\nNONE 直接加载\nFRAME 分帧加载\nENDLESS 无限加载" })
], PromotionRankListView.prototype, "mode", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.DirectionType), tooltip: "滑动方向\nHORIZONTAL 水平\nVERTICAL 垂直" })
], PromotionRankListView.prototype, "direction", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "垂直间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], PromotionRankListView.prototype, "spacingY", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "顶间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], PromotionRankListView.prototype, "top", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "底间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], PromotionRankListView.prototype, "bottom", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "水平间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], PromotionRankListView.prototype, "spacingX", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "左间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], PromotionRankListView.prototype, "left", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "右间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], PromotionRankListView.prototype, "right", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "点击列表项回调", visible: true })
], PromotionRankListView.prototype, "clickItemEventHandler", void 0);
PromotionRankListView = __decorate([
    ccclass
], PromotionRankListView);
exports.default = PromotionRankListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcHJvbW90aW9uL1Byb21vdGlvblJhbmtMaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RkFBOEU7QUFFOUUsMEVBQWtEO0FBRWxELHFCQUFxQjtBQUNyQixNQUFNLG1CQUFtQixHQUFXLENBQUMsQ0FBQztBQUV0QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIscUJBQXFCLEdBQTFDLE1BQXFCLHFCQUFzQixTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQS9EO1FBRUksbUNBQW1DO1FBQ25DLHFDQUFxQzs7UUFFckMsb0xBQW9MO1FBQ3BMLDZGQUE2RjtRQUU3RixvTEFBb0w7UUFDcEwsOEZBQThGO1FBRTlGLGtMQUFrTDtRQUNsTCw0RkFBNEY7UUFFNUYsa0xBQWtMO1FBQ2xMLCtGQUErRjtRQUUvRiw0R0FBNEc7UUFDNUcsK0NBQStDO1FBR3ZDLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsZUFBVSxHQUFjLElBQUksQ0FBQztRQUc5QixTQUFJLEdBQXFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7UUFHOUUsY0FBUyxHQUFrQyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUUxRix3SUFBd0k7UUFDeEksK0JBQStCO1FBRS9CLGdHQUFnRztRQUNoRyx3Q0FBd0M7UUFHaEMsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBR2hCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFHbkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBR2pCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFHbEIsMEJBQXFCLEdBQThCLElBQUksRUFBRSxDQUFDLFNBQVMs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b3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIENvbXBvbmVudERlZmluZSBmcm9tIFwiLi4vLi4vc2NyaXB0L2NvbW1vbi9kZWZpbmUvQ29tcG9uZW50RGVmaW5lXCI7XG5pbXBvcnQgKiBhcyBDb21wb25lbnRJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL3NjcmlwdC9jb21tb24vaW50ZXJmYWNlL0NvbXBvbmVudEludGVyZmFjZVwiO1xuaW1wb3J0IFR5cGVVdGlscyBmcm9tIFwiLi4vY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuXG4vLyDmr4/mrKHmiafooYzljY/nqIvliIbphY3nmoTml7bpl7TvvIjljZXkvY3vvJrmr6vnp5LvvIlcbmNvbnN0IEVYRUNfR0VORVJBVE9SX1RJTUU6IG51bWJlciA9IDg7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9tb3Rpb25SYW5rTGlzdFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmmK/lkKbliIbpobXliqDovb1cIiB9KVxuICAgIC8vIHByaXZhdGUgaXNQYWdpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5bem6L655ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgLy8gcHJpdmF0ZSBwdWxsTGVmdEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuWPs+i+ueaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIC8vIHByaXZhdGUgcHVsbFJpZ2h0RXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi6aG26YOo5ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIC8vIHByaXZhdGUgcHVsbFRvcEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuW6lemDqOaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICAvLyBwcml2YXRlIHB1bGxCb3R0b21FdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlRnJhbWUsIHRvb2x0aXA6IFwi5Yi35paw5ouJ5Y+W562J5b6F5Zu+54mHXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nIH0pIH0pXG4gICAgLy8gcHJpdmF0ZSB3YWl0aW5nSW1hZ2U6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgY29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5YiX6KGo6aG56aKE5Yi2XCIgfSlcbiAgICBwcml2YXRlIGl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlKSwgdG9vbHRpcDogXCLliqDovb3mqKHlvI9cXG5OT05FIOebtOaOpeWKoOi9vVxcbkZSQU1FIOWIhuW4p+WKoOi9vVxcbkVORExFU1Mg5peg6ZmQ5Yqg6L29XCIgfSlcbiAgICBwdWJsaWMgbW9kZTogQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUgPSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5OT05FO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSksIHRvb2x0aXA6IFwi5ruR5Yqo5pa55ZCRXFxuSE9SSVpPTlRBTCDmsLTlubNcXG5WRVJUSUNBTCDlnoLnm7RcIiB9KVxuICAgIHByaXZhdGUgZGlyZWN0aW9uOiBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5rua5Yqo5LmL5ZCO55qE5YeP6YCf57O75pWw44CC5Y+W5YC86IyD5Zu05pivIDAtMe+8jOWmguaenOaYryAxIOWImeeri+mprOWBnOatoua7muWKqO+8jOWmguaenOaYryAw77yM5YiZ5Lya5LiA55u05rua5Yqo5YiwIGNvbnRlbnQg55qE6L6555WM44CCXCIsIG92ZXJyaWRlOiB0cnVlLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgLy8gcHVibGljIGJyYWtlOiBudW1iZXIgPSAwLjc1O1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Zue5by55omA6ZyA6KaB55qE5pe26Ze044CC5Y+W5YC86IyD5Zu05pivIDAtMTDjgIJcIiwgb3ZlcnJpZGU6IHRydWUsIHZpc2libGU6IHRydWUgfSlcbiAgICAvLyBwdWJsaWMgYm91bmNlRHVyYXRpb246IG51bWJlciA9IDAuMjM7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlnoLnm7Tpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgc3BhY2luZ1k6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLpobbpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgdG9wOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5bqV6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICBwcml2YXRlIGJvdHRvbTogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuawtOW5s+mXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICBwcml2YXRlIHNwYWNpbmdYOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5bem6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgbGVmdDogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuWPs+mXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICBwcml2YXRlIHJpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLngrnlh7vliJfooajpobnlm57osINcIiwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgY2xpY2tJdGVtRXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIOaYr+WQpuWKoOi9veWujOaIkFxuICAgIHByaXZhdGUgX2lzTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5pWw5o2u5YiX6KGoXG4gICAgcHJpdmF0ZSBfaXRlbURhdGFMaXN0OiB1bmtub3duW10gPSBbXTtcbiAgICAvLyDliJfooajpobnoioLngrnmsaBcbiAgICBwcml2YXRlIF9pdGVtTm9kZVBvb2w6IGNjLk5vZGVQb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgLy8g5pyA5ZCO6IqC54K55L2N572uXG4gICAgcHJpdmF0ZSBfbGFzdFBvczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuICAgIC8vIOa4suafk+WIl+ihqOmhuei1t+Wni+S4i+agh1xuICAgIHByaXZhdGUgX3JlbmRlckl0ZW1TdGFydEluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOa4suafk+WIl+ihqOmhuee7k+adn+S4i+agh1xuICAgIHByaXZhdGUgX3JlbmRlckl0ZW1FbmRJbmRleDogbnVtYmVyID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmuLLmn5PkuK1cbiAgICBwcml2YXRlIF9pc1JlbmRlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIOe8k+WtmOWIl+ihqFxuICAgIHByaXZhdGUgX2l0ZW1DYWNoZURhdGFMaXN0OiB1bmtub3duW10gPSBbXTtcbiAgICAvLyDmuLLmn5PkuK3mk43kvZzmrKHmlbBcbiAgICBwcml2YXRlIF9yZW5kZXJpbmdPcGVyYXRlQ291bnQ6IG51bWJlciA9IDA7XG4gICAgLy8g57yT5a2Y5riy5p+T5YiX6KGo6aG56LW35aeL5LiL5qCHXG4gICAgcHJpdmF0ZSBfY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOS/ruaUueaWueWQkeexu+Wei+WxnuaAp1xuICAgICAqIEBwYXJhbSB2YWx1ZSB7Q29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGV9IOaWueWQkeexu+Wei1xuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlRGlyZWN0aW9uKHZhbHVlOiBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLmhvcml6b250YWwgPSB2YWx1ZSA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTDtcbiAgICAgICAgLy8gdGhpcy52ZXJ0aWNhbCA9IHZhbHVlID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTDtcblxuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwidG9wXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwiYm90dG9tXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwic3BhY2luZ1lcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJ2ZXJ0aWNhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImxlZnRcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInJpZ2h0XCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJzcGFjaW5nWFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwiaG9yaXpvbnRhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rumhuVxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge1QgfCBUW119IOaVsOaNrnzmlbDmja7liJfooahcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0PFQ+KGl0ZW1zRGF0YTogVCB8IFRbXSk6IHZvaWQge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzQXJyYXkoaXRlbXNEYXRhKSAmJiAoaXRlbXNEYXRhIGFzIEFycmF5PFQ+KS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEodGhpcy5faXRlbUNhY2hlRGF0YUxpc3QsIGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgICsrdGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX2l0ZW1EYXRhTGlzdCwgaXRlbXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7mlbDmja7poblcbiAgICAgKiBAcGFyYW0gZGF0YUxpc3Qge1RbXX0g6K6+572u5YiX6KGoXG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXREYXRhPFQ+KGRhdGFMaXN0OiBUW10sIGl0ZW1zRGF0YTogVCB8IFRbXSk6IHZvaWQge1xuICAgICAgICBkYXRhTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmluc2VydERhdGEoZGF0YUxpc3QsIGl0ZW1zRGF0YSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+S5YWl6aG5XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSDkuIvmoIfvvIjpu5jorqTvvJrmnIDlkI7mj5LlhaXvvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5zZXJ0PFQ+KGl0ZW1zRGF0YTogVCB8IFRbXSwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbXNEYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc0FycmF5KGl0ZW1zRGF0YSkgJiYgKGl0ZW1zRGF0YSBhcyBBcnJheTxUPikubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhTGlzdDogdW5rbm93bltdID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCA9IFtdLmNvbmNhdCh0aGlzLl9pdGVtRGF0YUxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5faXRlbURhdGFMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID4gZGF0YUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGF0YShkYXRhTGlzdCwgaXRlbXNEYXRhLCBpbmRleCk7XG4gICAgICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKyt0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydERhdGEoZGF0YUxpc3QsIGl0ZW1zRGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaPkuWFpeaVsOaNrumhuVxuICAgICAqIEBwYXJhbSBkYXRhTGlzdCB7VFtdfSDmj5LlhaXliJfooahcbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtUIHwgVFtdfSDmlbDmja585pWw5o2u5YiX6KGoXG4gICAgICogQHBhcmFtIGluZGV4IHtudW1iZXJ9IOS4i+agh1xuICAgICAqL1xuICAgIHB1YmxpYyBpbnNlcnREYXRhPFQ+KGRhdGFMaXN0OiBUW10sIGl0ZW1zRGF0YTogVCB8IFRbXSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICBsZXQgc3BsaWNlUGFyYW06IHVua25vd25bXSA9IFtpbmRleCwgMF07XG4gICAgICAgICAgICBzcGxpY2VQYXJhbSA9IHNwbGljZVBhcmFtLmNvbmNhdChpdGVtc0RhdGEpO1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlLmFwcGx5KGRhdGFMaXN0LCBzcGxpY2VQYXJhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGl0ZW1zRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKDpmaTpoblcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn0g5LiL5qCH77yI6ZyA6KaB5Yig6Zmk55qE5LiL5qCH77yJXG4gICAgICogQHBhcmFtIGNvdW50IHtudW1iZXJ9IOaVsOmHj++8iOWIoOmZpOS4i+agh+WQjueahOaVsOmHj++8iVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmUoaW5kZXg/OiBudW1iZXIsIGNvdW50PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhTGlzdDogdW5rbm93bltdID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCA9IFtdLmNvbmNhdCh0aGlzLl9pdGVtRGF0YUxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5faXRlbURhdGFMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpICYmIFR5cGVVdGlscy5pc051bGwoY291bnQpKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBjb3VudCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGggLSBjb3VudDtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgY291bnQgPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoVHlwZVV0aWxzLmlzTnVsbChjb3VudCkpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID49IGRhdGFMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gZGF0YUxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ID0gZGF0YUxpc3QubGVuZ3RoIC0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIGRhdGFMaXN0LnNwbGljZShpbmRleCwgY291bnQpO1xuICAgICAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPiBpbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICsrdGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlKGluZGV4LCBjb3VudCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4ID0gTWF0aC5tYXgodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbW92ZSgwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2hpbGROb2RlKHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXg6IG51bWJlcik6IGNjLk5vZGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2hpbGRyZW4uc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWIl+ihqOmhuVxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlTGlzdEl0ZW0oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5faXNMb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0UmVuZGVyaW5nKHRydWUpO1xuXG4gICAgICAgIHRoaXMuY29udGVudC5zZXRDb250ZW50U2l6ZSh0aGlzLmdldElubmVyRXN0aW1hdGVTaXplKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLkVORExFU1MpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHB1dEluZGV4TGlzdDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGxldCBpc0ZyYW1lTG9hZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gdGhpcy5fcmVuZGVySXRlbVN0YXJ0SW5kZXg7IGkgPCB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtTm9kZTogY2MuTm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURhdGE6IHVua25vd24gPSB0aGlzLl9pdGVtRGF0YUxpc3RbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIVR5cGVVdGlscy5pc051bGwoaXRlbU5vZGUpICYmIHRoaXMuX2l0ZW1EYXRhTGlzdC5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLm5vZGUub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrSXRlbS5iaW5kKHRoaXMsIGl0ZW1Ob2RlLCBpdGVtRGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtU3JjOiBDb21wb25lbnRJbnRlcmZhY2UuTGlzdFZpZXdJdGVtQ2xhc3MgPSBpdGVtTm9kZS5nZXRDb21wb25lbnQoaXRlbU5vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1TcmMub25TaG93ICYmIGl0ZW1TcmMub25TaG93KGl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbU5vZGUpICYmICF0aGlzLl9pdGVtRGF0YUxpc3QuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5faXRlbURhdGFMaXN0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHB1dEluZGV4TGlzdC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVHlwZVV0aWxzLmlzTnVsbChpdGVtTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zRGF0YTogdW5rbm93bltdID0gdGhpcy5faXRlbURhdGFMaXN0LnNsaWNlKGksIHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGgpOztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUuRlJBTUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlUG9vbFNpemU6IG51bWJlciA9IHRoaXMuX2l0ZW1Ob2RlUG9vbC5zaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZVBvb2xTaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3RMb2FkRW5kSW5kZXg6IG51bWJlciA9IGkgKyBub2RlUG9vbFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNEYXRhID0gdGhpcy5faXRlbURhdGFMaXN0LnNsaWNlKGksIGRpcmVjdExvYWRFbmRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3RMb2FkSXRlbShpdGVtc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3RMb2FkRW5kSW5kZXggPCB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNEYXRhID0gdGhpcy5faXRlbURhdGFMaXN0LnNsaWNlKGRpcmVjdExvYWRFbmRJbmRleCwgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZUxvYWRJdGVtKGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnJhbWVMb2FkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVMb2FkSXRlbShpdGVtc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnJhbWVMb2FkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLk5PTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0TG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHB1dEluZGV4TGlzdC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtTm9kZTogY2MuTm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlbltwdXRJbmRleExpc3RbaV1dO1xuICAgICAgICAgICAgICAgIHRoaXMucHV0Tm9kZShpdGVtTm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNGcmFtZUxvYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJlbmRlcmluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliLfmlrDnvJPlrZjmlbDmja7liJfooajpoblcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUNhY2hlRGF0YUxpc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9pdGVtRGF0YUxpc3QsIHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0KTtcbiAgICAgICAgdGhpcy5faXRlbUNhY2hlRGF0YUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fcmVuZGVySXRlbVN0YXJ0SW5kZXggPSB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4O1xuICAgICAgICB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXggPSBNYXRoLm1heCh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoLCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pc0xvYWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLXRvcFwiLCB0aGlzLm9uU2Nyb2xsVG9Ub3AsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxUb0JvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbC10by1sZWZ0XCIsIHRoaXMub25TY3JvbGxUb0xlZnQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vblNjcm9sbFRvUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImJvdW5jZS1ib3R0b21cIiwgdGhpcy5vbkJvdW5jZUJvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImJvdW5jZS10b3BcIiwgdGhpcy5vbkJvdW5jZVRvcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImJvdW5jZS1sZWZ0XCIsIHRoaXMub25Cb3VuY2VMZWZ0LCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25Cb3VuY2VSaWdodCwgdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMub25TY3JvbGxpbmcsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwidG91Y2gtdXBcIiwgdGhpcy5vblRvdWNoVXAsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtYmVnYW5cIiwgdGhpcy5vblNjcm9sbEJlZ2FuLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVucmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tdG9wXCIsIHRoaXMub25TY3JvbGxUb1RvcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxUb0JvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tbGVmdFwiLCB0aGlzLm9uU2Nyb2xsVG9MZWZ0LCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uU2Nyb2xsVG9SaWdodCwgdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcImJvdW5jZS1ib3R0b21cIiwgdGhpcy5vbkJvdW5jZUJvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJib3VuY2UtdG9wXCIsIHRoaXMub25Cb3VuY2VUb3AsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLWxlZnRcIiwgdGhpcy5vbkJvdW5jZUxlZnQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25Cb3VuY2VSaWdodCwgdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsaW5nLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC1lbmRlZFwiLCB0aGlzLm9uU2Nyb2xsRW5kZWQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwidG91Y2gtdXBcIiwgdGhpcy5vblRvdWNoVXAsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLWJlZ2FuXCIsIHRoaXMub25TY3JvbGxCZWdhbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvb2xOb2RlQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5hbmNob3JYID09PSAwLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFuY2hvclggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueCA9IHRoaXMuY29udGVudC54IC0gKHRoaXMuY29udGVudC53aWR0aCAqIDAuNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hbmNob3JZID0gMC41O1xuICAgICAgICAgICAgICAgIHBvb2xOb2RlQ291bnQgPSBNYXRoLmNlaWwoKHRoaXMubm9kZS53aWR0aCAtIHRoaXMuc3BhY2luZ1gpIC8gKHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoICsgdGhpcy5zcGFjaW5nWCkpICsgMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUw6IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmFuY2hvclkgPT09IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYW5jaG9yWSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC55ID0gdGhpcy5jb250ZW50LnkgKyAodGhpcy5jb250ZW50LmhlaWdodCAqIDAuNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hbmNob3JYID0gMC41O1xuICAgICAgICAgICAgICAgIHBvb2xOb2RlQ291bnQgPSBNYXRoLmNlaWwoKHRoaXMubm9kZS5oZWlnaHQgLSB0aGlzLnNwYWNpbmdZKSAvICh0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQgKyB0aGlzLnNwYWNpbmdZKSkgKyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUuRU5ETEVTUykge1xuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHBvb2xOb2RlQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHV0Tm9kZSh0aGlzLmdldE5vZGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rua4suafk+S4reeKtuaAgVxuICAgICAqIEBwYXJhbSBpc1JlbmRlcmluZyB7Ym9vbGVhbn0g5piv5ZCm5q2j5Zyo5riy5p+T6aG5XG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRSZW5kZXJpbmcoaXNSZW5kZXJpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNSZW5kZXJpbmcgPSBpc1JlbmRlcmluZztcbiAgICAgICAgaWYgKCFpc1JlbmRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5vblJlbmRlcmVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bliJfooajpobnoioLngrlcbiAgICAgKiBAcmV0dXJucyB7Y2MuTm9kZX0g6IqC54K5XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXROb2RlKCk6IGNjLk5vZGUgfCBudWxsIHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1QcmVmYWIpIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLmVycm9yKGDor7flnKggTGlzdFZpZXcg5re75Yqg6aKE5Yi26aG5IHByZWZhYmApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IHRoaXMuX2l0ZW1Ob2RlUG9vbC5nZXQoKTtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJlZmFiKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbjogY2MuQnV0dG9uID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBpZiAoIWJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBidXR0b24gPSBub2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUvuWFpeWIl+ihqOmhueiKgueCuVxuICAgICAqIEBwYXJhbSBub2RlIHtjYy5Ob2RlfSDoioLngrlcbiAgICAgKi9cbiAgICBwcml2YXRlIHB1dE5vZGUobm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZS5uYW1lICE9PSB0aGlzLml0ZW1QcmVmYWIuZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci53YXJuKGDor7fkuI3opoHmlL7lhaXkuI4gJHtub2RlLm5hbWV9IOS4jeebuOWFs+eahOiKgueCuWApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuXG4gICAgICAgIGxldCBzcmM6IENvbXBvbmVudEludGVyZmFjZS5MaXN0Vmlld0l0ZW1DbGFzcyA9IG5vZGUuZ2V0Q29tcG9uZW50KG5vZGUubmFtZSk7XG4gICAgICAgIHNyYy5yZXNldCgpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1Ob2RlUG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb3Mobm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5uZXJDb3VudDogbnVtYmVyID0gdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQgLSAxO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24odGhpcy5sZWZ0ICsgKHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoICogMC41KSArIChpbm5lckNvdW50ICogdGhpcy5pdGVtUHJlZmFiLmRhdGEud2lkdGgpICsgKGlubmVyQ291bnQgKiB0aGlzLnNwYWNpbmdYKSwgMCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDAgLSB0aGlzLnRvcCAtICh0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQgKiAwLjUpIC0gKGlubmVyQ291bnQgKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQpIC0gKGlubmVyQ291bnQgKiB0aGlzLnNwYWNpbmdZKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnlJ/kuqfliJfooajpoblcbiAgICAgKiBAcGFyYW0gaXRlbURhdGEge1R9IOazm+Wei+aVsOaNrlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZUl0ZW08VD4oaXRlbURhdGE6IFQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5nZXROb2RlKCk7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtTm9kZSk7XG4gICAgICAgIGxldCBpdGVtU3JjOiBDb21wb25lbnRJbnRlcmZhY2UuTGlzdFZpZXdJdGVtQ2xhc3MgPSBpdGVtTm9kZS5nZXRDb21wb25lbnQoaXRlbU5vZGUubmFtZSk7XG4gICAgICAgIGlmIChpdGVtU3JjICYmICFUeXBlVXRpbHMuaXNOdWxsKGl0ZW1EYXRhKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja0l0ZW0uYmluZCh0aGlzLCBpdGVtTm9kZSwgaXRlbURhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW1TcmMub25TaG93ICYmIGl0ZW1TcmMub25TaG93KGl0ZW1EYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb3MoaXRlbU5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgKm1ha2VHZW5lcmF0b3JJdGVtPFQ+KGl0ZW1zRGF0YTogVFtdKTogR2VuZXJhdG9yIHtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGl0ZW1zRGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgeWllbGQgdGhpcy5tYWtlSXRlbShpdGVtc0RhdGFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omn6KGM5Y2P56iL5Yqg6L295YiX6KGo6aG5XG4gICAgICogQHBhcmFtIGdlbmVyYXRvciB7R2VuZXJhdG9yfSDljY/nqItcbiAgICAgKiBAcGFyYW0gZHVyYXRpb24ge251bWJlcn0g5q+P5qyh5Y2P56iL5Y2g55So5pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBleGVjR2VuZXJhdG9ySXRlbShnZW5lcmF0b3I6IEdlbmVyYXRvciwgZHVyYXRpb246IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6ICh2YWx1ZTogdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBleGVjOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVyYXRvciA9IGdlbmVyYXRvci5uZXh0KCk7IDsgaXRlcmF0b3IgPSBnZW5lcmF0b3IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRvciA9PSBudWxsIHx8IGl0ZXJhdG9yLmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydFRpbWUgPiBkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4ZWMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YiG5bin5Yqg6L29XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7aXRlbXNEYXRhOiBUW119IOWIl+ihqOmhueaVsOaNrlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZnJhbWVMb2FkSXRlbTxUPihpdGVtc0RhdGE6IFRbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLmV4ZWNHZW5lcmF0b3JJdGVtKHRoaXMubWFrZUdlbmVyYXRvckl0ZW0oaXRlbXNEYXRhKSwgRVhFQ19HRU5FUkFUT1JfVElNRSk7XG4gICAgICAgIHRoaXMuc2V0UmVuZGVyaW5nKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnm7TmjqXliqDovb1cbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtpdGVtc0RhdGE6IFRbXX0g5YiX6KGo6aG55pWw5o2uXG4gICAgICovXG4gICAgcHJpdmF0ZSBkaXJlY3RMb2FkSXRlbTxUPihpdGVtc0RhdGE6IFRbXSk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbXNEYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VJdGVtKGl0ZW1zRGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blt6bovrnnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RMZWZ0KCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnggLT0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blj7PovrnnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RSaWdodCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC54ICs9IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGg7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W6aG26YOo57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0VG9wKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnkgKz0gdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQ7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5bqV6YOo57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0Qm90dG9tKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnkgLT0gdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQ7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5bem5Y+z57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0TGVmdFJpZ2h0KCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnggLT0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCAqIDMsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5LiK5LiL57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0VG9wQm90dG9tKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnkgLT0gdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQ7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0ICogMyk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluS4remXtOWPr+inhuefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldFZpc2libGVSZWN0Q2VudGVyKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5a2Q6aG55YiX6KGo55qE55+p5b2i5aSn5bCPXG4gICAgLy8gICogQHBhcmFtIGl0ZW1zIHtTY3JvbGxWaWV3SW50ZXJmYWNlLkl0ZW1EYXRhW119IOWtkOmhueWIl+ihqFxuICAgIC8vICAqIEByZXR1cm5zIHtjYy5TaXplfVxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0SXRlbXNSZWN0U2l6ZShpdGVtczogU2Nyb2xsVmlld0ludGVyZmFjZS5JdGVtRGF0YVtdKTogY2MuU2l6ZSB7XG4gICAgLy8gICAgIGxldCByZWN0U2l6ZTogY2MuU2l6ZSA9IG5ldyBjYy5TaXplKDAsIDApO1xuXG4gICAgLy8gICAgIGlmIChpdGVtcykge1xuICAgIC8vICAgICAgICAgaWYgKCEoaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAvLyAgICAgICAgICAgICBpdGVtcyA9IFtdLmNvbmNhdChpdGVtcyk7XG4gICAgLy8gICAgICAgICB9XG5cbiAgICAvLyAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIC8vICAgICAgICAgICAgIGxldCBpdGVtOiBTY3JvbGxWaWV3SW50ZXJmYWNlLkl0ZW1EYXRhID0gaXRlbXNbaV07XG4gICAgLy8gICAgICAgICAgICAgcmVjdFNpemUud2lkdGggKz0gaXRlbS5wcmVmYWIuZGF0YS53aWR0aDtcbiAgICAvLyAgICAgICAgICAgICByZWN0U2l6ZS5oZWlnaHQgKz0gaXRlbS5wcmVmYWIuZGF0YS5oZWlnaHQ7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICByZXR1cm4gcmVjdFNpemU7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6L656LedXG4gICAgICogQHJldHVybnMge251bWJlcn0g6L656LedXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRQYWRkaW5nKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBwYWRkaW5nOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHBhZGRpbmcgKz0gdGhpcy5sZWZ0ICsgdGhpcy5yaWdodDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHBhZGRpbmcgKz0gdGhpcy50b3AgKyB0aGlzLmJvdHRvbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFkZGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bpl7Tot51cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDpl7Tot51cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFNwYWNpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHNwYWNpbmc6IG51bWJlciA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgc3BhY2luZyA9IHRoaXMuc3BhY2luZ1g7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBzcGFjaW5nID0gdGhpcy5zcGFjaW5nWTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhY2luZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blhoXlrrnlmajpooTkvLDlpKflsI9cbiAgICAgKiBAcmV0dXJucyB7Y2MuU2l6ZX0g5YaF5a655Zmo6aKE5Lyw5aSn5bCPXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRJbm5lckVzdGltYXRlU2l6ZSgpOiBjYy5TaXplIHtcbiAgICAgICAgbGV0IHNpemU6IGNjLlNpemUgPSB0aGlzLmNvbnRlbnQucGFyZW50LmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgc2l6ZS53aWR0aCA9IHRoaXMuZ2V0UGFkZGluZygpICsgKHRoaXMuZ2V0U3BhY2luZygpICogKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggLSAxKSkgKyAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCAqIHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoKTtcbiAgICAgICAgICAgIGlmIChzaXplLndpZHRoIDwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCkge1xuICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSB0aGlzLmdldFBhZGRpbmcoKSArICh0aGlzLmdldFNwYWNpbmcoKSAqICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIC0gMSkpICsgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQpO1xuICAgICAgICAgICAgaWYgKHNpemUuaGVpZ2h0IDwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBzaXplLmhlaWdodCA9IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxUb1RvcCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKHRoaXMucHVsbFRvcEV2ZW50SGFuZGxlcikge1xuICAgIC8vICAgICAgICAgdGhpcy5wdWxsVG9wRXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbFRvQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsQm90dG9tRXZlbnRIYW5kbGVyKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnB1bGxCb3R0b21FdmVudEhhbmRsZXIuZW1pdChbdGFyZ2V0XSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uU2Nyb2xsVG9MZWZ0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlcikge1xuICAgIC8vICAgICAgICAgdGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxUb1JpZ2h0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsUmlnaHRFdmVudEhhbmRsZXIpIHtcbiAgICAvLyAgICAgICAgIHRoaXMucHVsbFJpZ2h0RXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbGluZyh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIC8vIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudDsgKytpKSB7XG4gICAgLy8gICAgIC8vICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgLy8gICAgIC8vICAgICBsZXQgaXRlbVJlY3Q6IGNjLlJlY3QgPSBpdGVtTm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcblxuICAgIC8vICAgICAvLyAgICAgaWYgKGl0ZW1SZWN0LmludGVyc2VjdHModGhpcy5tX2NhY2hlUmVjdCkpIHtcblxuICAgIC8vICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnggPiB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgIC8vICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnkgPCB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAvLyAgICAgICAgIHRoaXMucHV0Tm9kZShpdGVtTm9kZSk7XG4gICAgLy8gICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gfVxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJTY3JvbGxpbmdcIiwgdGFyZ2V0KTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uQm91bmNlQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VCb3R0b21cIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvbkJvdW5jZVRvcCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlVG9wXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Cb3VuY2VMZWZ0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VMZWZ0XCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Cb3VuY2VSaWdodCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlUmlnaHRcIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbEVuZGVkKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiU2Nyb2xsRW5kZWRcIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblRvdWNoVXAodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJUb3VjaFVwXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxCZWdhbih0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIC8vIEcuTG9nTWdyLmxvZyhcIlNjcm9sbEJlZ2FuXCIpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9vea4suafk+WujOaIkCDlm57osINcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uUmVuZGVyZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FjaGVEYXRhTGlzdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tJdGVtPFQ+KG5vZGU6IGNjLk5vZGUsIGRhdGE6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIuZW1pdChbbm9kZSwgZGF0YV0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyKCk7XG4gICAgfVxuXG59XG4iXX0=