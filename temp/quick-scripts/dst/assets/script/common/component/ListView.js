
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/ListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df317NFqC5COIrGmHLMpHw2', 'ListView');
// script/common/component/ListView.ts

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
const ComponentDefine = __importStar(require("../define/ComponentDefine"));
const TypeUtils_1 = __importDefault(require("../utils/TypeUtils"));
// 每次执行协程分配的时间（单位：毫秒）
const EXEC_GENERATOR_TIME = 8;
const { ccclass, property } = cc._decorator;
let ListView = class ListView extends cc.ScrollView {
    constructor() {
        super(...arguments);
        this.directionType = ComponentDefine.DirectionType.HORIZONTAL;
        this.isPaging = false;
        this.pullLeftEventHandler = new cc.Component.EventHandler();
        this.pullRightEventHandler = new cc.Component.EventHandler();
        this.pullTopEventHandler = new cc.Component.EventHandler();
        this.pullBottomEventHandler = new cc.Component.EventHandler();
        this.waitingImage = null;
        this.itemPrefab = null;
        this.mode = ComponentDefine.ListViewLoadMode.NONE;
        this.horizontal = this.direction === ComponentDefine.DirectionType.HORIZONTAL;
        this.vertical = this.direction === ComponentDefine.DirectionType.VERTICAL;
        this.brake = 0.75;
        this.bounceDuration = 0.23;
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
    get direction() {
        return this.directionType;
    }
    set direction(value) {
        if (value !== this.directionType) {
            this.directionType = value;
            this.changeDirection(value);
        }
    }
    /**
     * 修改方向类型属性
     * @param value {ComponentDefine.DirectionType} 方向类型
     */
    changeDirection(value) {
        this.horizontal = value === ComponentDefine.DirectionType.HORIZONTAL;
        this.vertical = value === ComponentDefine.DirectionType.VERTICAL;
        cc.Class["Attr"].setClassAttr(this, "top", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        cc.Class["Attr"].setClassAttr(this, "bottom", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        cc.Class["Attr"].setClassAttr(this, "spacingY", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        cc.Class["Attr"].setClassAttr(this, "verticalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
        cc.Class["Attr"].setClassAttr(this, "left", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
        cc.Class["Attr"].setClassAttr(this, "right", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
        cc.Class["Attr"].setClassAttr(this, "spacingX", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
        cc.Class["Attr"].setClassAttr(this, "horizontalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
    }
    onLoad() {
        this.register();
        this.initData();
        this.initView();
    }
    start() {
        super.start();
    }
    /**
     * 设置项
     * @param itemsData {T | T[]} 数据|数据列表
     */
    set(itemsData) {
        if (TypeUtils_1.default.isNull(itemsData)) {
            this.remove(0);
            return;
        }
        if (TypeUtils_1.default.isArray(itemsData) && itemsData.length <= 0) {
            this.remove(0);
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
        this.stopAutoScroll();
        this.scrollToTop();
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
    /**
     * 刷新列表项
     */
    updateListItem() {
        if (!this._isLoaded) {
            return;
        }
        this.setRendering(true);
        let isFrameLoad = false;
        this.content.setContentSize(this.getInnerEstimateSize());
        if (this.mode === ComponentDefine.ListViewLoadMode.ENDLESS) {
        }
        else {
            let putIndexList = [];
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
        this.node.on("scroll-to-top", this.onScrollToTop, this);
        this.node.on("scroll-to-bottom", this.onScrollToBottom, this);
        this.node.on("scroll-to-left", this.onScrollToLeft, this);
        this.node.on("scroll-to-right", this.onScrollToRight, this);
        this.node.on("bounce-bottom", this.onBounceBottom, this);
        this.node.on("bounce-top", this.onBounceTop, this);
        this.node.on("bounce-left", this.onBounceLeft, this);
        this.node.on("bounce-right", this.onBounceRight, this);
        this.node.on("scrolling", this.onScrolling, this);
        this.node.on("scroll-ended", this.onScrollEnded, this);
        this.node.on("touch-up", this.onTouchUp, this);
        this.node.on("scroll-began", this.onScrollBegan, this);
    }
    unregister() {
        this.node.off("scroll-to-top", this.onScrollToTop, this);
        this.node.off("scroll-to-bottom", this.onScrollToBottom, this);
        this.node.off("scroll-to-left", this.onScrollToLeft, this);
        this.node.off("scroll-to-right", this.onScrollToRight, this);
        this.node.off("bounce-bottom", this.onBounceBottom, this);
        this.node.off("bounce-top", this.onBounceTop, this);
        this.node.off("bounce-left", this.onBounceLeft, this);
        this.node.off("bounce-right", this.onBounceRight, this);
        this.node.off("scrolling", this.onScrolling, this);
        this.node.off("scroll-ended", this.onScrollEnded, this);
        this.node.off("touch-up", this.onTouchUp, this);
        this.node.off("scroll-began", this.onScrollBegan, this);
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
    onScrollToTop(target) {
        if (!this.isPaging) {
            return;
        }
        if (this.pullTopEventHandler) {
            this.pullTopEventHandler.emit([target]);
        }
    }
    onScrollToBottom(target) {
        if (!this.isPaging) {
            return;
        }
        if (this.pullBottomEventHandler) {
            this.pullBottomEventHandler.emit([target]);
        }
    }
    onScrollToLeft(target) {
        if (!this.isPaging) {
            return;
        }
        if (this.pullLeftEventHandler) {
            this.pullLeftEventHandler.emit([target]);
        }
    }
    onScrollToRight(target) {
        if (!this.isPaging) {
            return;
        }
        if (this.pullRightEventHandler) {
            this.pullRightEventHandler.emit([target]);
        }
    }
    onScrolling(target) {
        // for (let i: number = 0; i < this.content.childrenCount; ++i) {
        //     let itemNode: cc.Node = this.content.children[i];
        //     let itemRect: cc.Rect = itemNode.getBoundingBoxToWorld();
        //     if (itemRect.intersects(this.m_cacheRect)) {
        //     } else {
        //         if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
        //             if (itemNode.convertToWorldSpace(cc.v2(0, 0)).x > this.content.parent.convertToWorldSpaceAR(cc.v2(0, 0)).x) {
        //                 --this.m_lastIndex;
        //             }
        //         } else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
        //             if (itemNode.convertToWorldSpace(cc.v2(0, 0)).y < this.content.parent.convertToWorldSpaceAR(cc.v2(0, 0)).x) {
        //                 --this.m_lastIndex;
        //             }
        //         }
        //         this.putNode(itemNode);
        //     }
        // }
        // G.LogMgr.log("Scrolling", target);
    }
    onBounceBottom(target) {
        if (!this.brake) {
            return;
        }
        // G.LogMgr.log("BounceBottom");
    }
    onBounceTop(target) {
        if (!this.brake) {
            return;
        }
        // G.LogMgr.log("BounceTop");
    }
    onBounceLeft(target) {
        if (!this.brake) {
            return;
        }
        // G.LogMgr.log("BounceLeft");
    }
    onBounceRight(target) {
        if (!this.brake) {
            return;
        }
        // G.LogMgr.log("BounceRight");
    }
    onScrollEnded(target) {
        // G.LogMgr.log("ScrollEnded");
    }
    onTouchUp(target) {
        // G.LogMgr.log("TouchUp");
    }
    onScrollBegan(target) {
        // G.LogMgr.log("ScrollBegan");
    }
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
        super.update(dt);
    }
    onClickItem(node, data) {
        this.clickItemEventHandler.emit([node, data]);
    }
    onDestroy() {
        this.unregister();
    }
};
__decorate([
    property({
        visible: (function () {
            cc.Class["Attr"].setClassAttr(this, "horizontalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
            cc.Class["Attr"].setClassAttr(this, "verticalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
            return false;
        })
    })
], ListView.prototype, "directionType", void 0);
__decorate([
    property({ tooltip: "是否分页加载" })
], ListView.prototype, "isPaging", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "左边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], ListView.prototype, "pullLeftEventHandler", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "右边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], ListView.prototype, "pullRightEventHandler", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "顶部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], ListView.prototype, "pullTopEventHandler", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "底部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], ListView.prototype, "pullBottomEventHandler", void 0);
__decorate([
    property({ type: cc.SpriteFrame, tooltip: "刷新拉取等待图片", visible: (function () { return this.isPaging; }) })
], ListView.prototype, "waitingImage", void 0);
__decorate([
    property({ type: cc.Prefab, tooltip: "列表项预制" })
], ListView.prototype, "itemPrefab", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.ListViewLoadMode), tooltip: "加载模式\nNONE 直接加载\nFRAME 分帧加载\nENDLESS 无限加载" })
], ListView.prototype, "mode", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.DirectionType), tooltip: "滑动方向\nHORIZONTAL 水平\nVERTICAL 垂直" })
], ListView.prototype, "direction", null);
__decorate([
    property({ override: true, visible: false })
], ListView.prototype, "horizontal", void 0);
__decorate([
    property({ override: true, visible: false })
], ListView.prototype, "vertical", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "滚动之后的减速系数。取值范围是 0-1，如果是 1 则立马停止滚动，如果是 0，则会一直滚动到 content 的边界。", override: true, visible: true })
], ListView.prototype, "brake", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "回弹所需要的时间。取值范围是 0-10。", override: true, visible: true })
], ListView.prototype, "bounceDuration", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "垂直间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], ListView.prototype, "spacingY", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "顶间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], ListView.prototype, "top", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "底间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], ListView.prototype, "bottom", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "水平间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], ListView.prototype, "spacingX", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "左间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], ListView.prototype, "left", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "右间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], ListView.prototype, "right", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "点击列表项回调", visible: true })
], ListView.prototype, "clickItemEventHandler", void 0);
ListView = __decorate([
    ccclass
], ListView);
exports.default = ListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9MaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRUFBNkQ7QUFFN0QsbUVBQTJDO0FBRTNDLHFCQUFxQjtBQUNyQixNQUFNLG1CQUFtQixHQUFXLENBQUMsQ0FBQztBQUV0QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsRUFBRSxDQUFDLFVBQVU7SUFBbkQ7O1FBU1ksa0JBQWEsR0FBa0MsZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFHeEYsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUcxQix5QkFBb0IsR0FBOEIsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR2xGLDBCQUFxQixHQUE4QixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHbkYsd0JBQW1CLEdBQThCLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUdqRiwyQkFBc0IsR0FBOEIsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR3BGLGlCQUFZLEdBQW1CLElBQUksQ0FBQztRQUdwQyxlQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzlCLFNBQUksR0FBcUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztRQWMvRSxlQUFVLEdBQVksSUFBSSxDQUFDLFNBQVMsS0FBSyxlQUFlLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUdsRixhQUFRLEdBQVksSUFBSSxDQUFDLFNBQVMsS0FBSyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUc5RSxVQUFLLEdBQVcs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LElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3FDQUNsSDtBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dDQUMvRztBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzBDQUNoSDtBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3NDQUNuSDtBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3VDQUNsSDtBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzt1REFDVTtBQTdFMUUsUUFBUTtJQUQ1QixPQUFPO0dBQ2EsUUFBUSxDQXcyQjVCO2tCQXgyQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDb21wb25lbnREZWZpbmUgZnJvbSBcIi4uL2RlZmluZS9Db21wb25lbnREZWZpbmVcIjtcbmltcG9ydCAqIGFzIENvbXBvbmVudEludGVyZmFjZSBmcm9tIFwiLi4vaW50ZXJmYWNlL0NvbXBvbmVudEludGVyZmFjZVwiO1xuaW1wb3J0IFR5cGVVdGlscyBmcm9tIFwiLi4vdXRpbHMvVHlwZVV0aWxzXCI7XG5cbi8vIOavj+asoeaJp+ihjOWNj+eoi+WIhumFjeeahOaXtumXtO+8iOWNleS9je+8muavq+enku+8iVxuY29uc3QgRVhFQ19HRU5FUkFUT1JfVElNRTogbnVtYmVyID0gODtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RWaWV3IGV4dGVuZHMgY2MuU2Nyb2xsVmlldyB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB2aXNpYmxlOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImhvcml6b250YWxTY3JvbGxCYXJcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgICAgIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJ2ZXJ0aWNhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHByaXZhdGUgZGlyZWN0aW9uVHlwZTogQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUgPSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmmK/lkKbliIbpobXliqDovb1cIiB9KVxuICAgIHByaXZhdGUgaXNQYWdpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5bem6L655ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgcHJpdmF0ZSBwdWxsTGVmdEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuWPs+i+ueaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgcHVsbFJpZ2h0RXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi6aG26YOo5ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgcHVsbFRvcEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuW6lemDqOaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICBwcml2YXRlIHB1bGxCb3R0b21FdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlRnJhbWUsIHRvb2x0aXA6IFwi5Yi35paw5ouJ5Y+W562J5b6F5Zu+54mHXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nIH0pIH0pXG4gICAgcHJpdmF0ZSB3YWl0aW5nSW1hZ2U6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLliJfooajpobnpooTliLZcIiB9KVxuICAgIHByaXZhdGUgaXRlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUpLCB0b29sdGlwOiBcIuWKoOi9veaooeW8j1xcbk5PTkUg55u05o6l5Yqg6L29XFxuRlJBTUUg5YiG5bin5Yqg6L29XFxuRU5ETEVTUyDml6DpmZDliqDovb1cIiB9KVxuICAgIHB1YmxpYyBtb2RlOiBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZSA9IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLk5PTkU7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlKSwgdG9vbHRpcDogXCLmu5HliqjmlrnlkJFcXG5IT1JJWk9OVEFMIOawtOW5s1xcblZFUlRJQ0FMIOWeguebtFwiIH0pXG4gICAgcHJpdmF0ZSBnZXQgZGlyZWN0aW9uKCk6IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uVHlwZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzZXQgZGlyZWN0aW9uKHZhbHVlOiBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZGlyZWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25UeXBlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBvdmVycmlkZTogdHJ1ZSwgdmlzaWJsZTogZmFsc2UgfSlcbiAgICBwdWJsaWMgaG9yaXpvbnRhbDogYm9vbGVhbiA9IHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMO1xuXG4gICAgQHByb3BlcnR5KHsgb3ZlcnJpZGU6IHRydWUsIHZpc2libGU6IGZhbHNlIH0pXG4gICAgcHVibGljIHZlcnRpY2FsOiBib29sZWFuID0gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5rua5Yqo5LmL5ZCO55qE5YeP6YCf57O75pWw44CC5Y+W5YC86IyD5Zu05pivIDAtMe+8jOWmguaenOaYryAxIOWImeeri+mprOWBnOatoua7muWKqO+8jOWmguaenOaYryAw77yM5YiZ5Lya5LiA55u05rua5Yqo5YiwIGNvbnRlbnQg55qE6L6555WM44CCXCIsIG92ZXJyaWRlOiB0cnVlLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHVibGljIGJyYWtlOiBudW1iZXIgPSAwLjc1O1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Zue5by55omA6ZyA6KaB55qE5pe26Ze044CC5Y+W5YC86IyD5Zu05pivIDAtMTDjgIJcIiwgb3ZlcnJpZGU6IHRydWUsIHZpc2libGU6IHRydWUgfSlcbiAgICBwdWJsaWMgYm91bmNlRHVyYXRpb246IG51bWJlciA9IDAuMjM7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlnoLnm7Tpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgc3BhY2luZ1k6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLpobbpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgdG9wOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5bqV6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICBwcml2YXRlIGJvdHRvbTogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuawtOW5s+mXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICBwcml2YXRlIHNwYWNpbmdYOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5bem6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgbGVmdDogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuWPs+mXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICBwcml2YXRlIHJpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLngrnlh7vliJfooajpobnlm57osINcIiwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgY2xpY2tJdGVtRXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIOaYr+WQpuWKoOi9veWujOaIkFxuICAgIHByaXZhdGUgX2lzTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5pWw5o2u5YiX6KGoXG4gICAgcHJpdmF0ZSBfaXRlbURhdGFMaXN0OiB1bmtub3duW10gPSBbXTtcbiAgICAvLyDliJfooajpobnoioLngrnmsaBcbiAgICBwcml2YXRlIF9pdGVtTm9kZVBvb2w6IGNjLk5vZGVQb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgLy8g5pyA5ZCO6IqC54K55L2N572uXG4gICAgcHJpdmF0ZSBfbGFzdFBvczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuICAgIC8vIOa4suafk+WIl+ihqOmhuei1t+Wni+S4i+agh1xuICAgIHByaXZhdGUgX3JlbmRlckl0ZW1TdGFydEluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOa4suafk+WIl+ihqOmhuee7k+adn+S4i+agh1xuICAgIHByaXZhdGUgX3JlbmRlckl0ZW1FbmRJbmRleDogbnVtYmVyID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmuLLmn5PkuK1cbiAgICBwcml2YXRlIF9pc1JlbmRlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIOe8k+WtmOWIl+ihqFxuICAgIHByaXZhdGUgX2l0ZW1DYWNoZURhdGFMaXN0OiB1bmtub3duW10gPSBbXTtcbiAgICAvLyDmuLLmn5PkuK3mk43kvZzmrKHmlbBcbiAgICBwcml2YXRlIF9yZW5kZXJpbmdPcGVyYXRlQ291bnQ6IG51bWJlciA9IDA7XG4gICAgLy8g57yT5a2Y5riy5p+T5YiX6KGo6aG56LW35aeL5LiL5qCHXG4gICAgcHJpdmF0ZSBfY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOS/ruaUueaWueWQkeexu+Wei+WxnuaAp1xuICAgICAqIEBwYXJhbSB2YWx1ZSB7Q29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGV9IOaWueWQkeexu+Wei1xuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlRGlyZWN0aW9uKHZhbHVlOiBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmhvcml6b250YWwgPSB2YWx1ZSA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTDtcbiAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IHZhbHVlID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTDtcblxuICAgICAgICBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwidG9wXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwiYm90dG9tXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwic3BhY2luZ1lcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCk7XG4gICAgICAgIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJ2ZXJ0aWNhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImxlZnRcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInJpZ2h0XCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCk7XG4gICAgICAgIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJzcGFjaW5nWFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgICAgICBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwiaG9yaXpvbnRhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rumhuVxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge1QgfCBUW119IOaVsOaNrnzmlbDmja7liJfooahcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0PFQ+KGl0ZW1zRGF0YTogVCB8IFRbXSk6IHZvaWQge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNBcnJheShpdGVtc0RhdGEpICYmIChpdGVtc0RhdGEgYXMgQXJyYXk8VD4pLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1JlbmRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0LCBpdGVtc0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IDA7XG4gICAgICAgICAgICArK3RoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9pdGVtRGF0YUxpc3QsIGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtU3RhcnRJbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXggPSB0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdG9wQXV0b1Njcm9sbCgpO1xuICAgICAgICB0aGlzLnNjcm9sbFRvVG9wKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5pWw5o2u6aG5XG4gICAgICogQHBhcmFtIGRhdGFMaXN0IHtUW119IOiuvue9ruWIl+ihqFxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge1QgfCBUW119IOaVsOaNrnzmlbDmja7liJfooahcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0RGF0YTxUPihkYXRhTGlzdDogVFtdLCBpdGVtc0RhdGE6IFQgfCBUW10pOiB2b2lkIHtcbiAgICAgICAgZGF0YUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5pbnNlcnREYXRhKGRhdGFMaXN0LCBpdGVtc0RhdGEsIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaPkuWFpemhuVxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge1QgfCBUW119IOaVsOaNrnzmlbDmja7liJfooahcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn0g5LiL5qCH77yI6buY6K6k77ya5pyA5ZCO5o+S5YWl77yJXG4gICAgICovXG4gICAgcHVibGljIGluc2VydDxUPihpdGVtc0RhdGE6IFQgfCBUW10sIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKGl0ZW1zRGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNBcnJheShpdGVtc0RhdGEpICYmIChpdGVtc0RhdGEgYXMgQXJyYXk8VD4pLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YUxpc3Q6IHVua25vd25bXSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9pc1JlbmRlcmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbUNhY2hlRGF0YUxpc3QgPSBbXS5jb25jYXQodGhpcy5faXRlbURhdGFMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5faXRlbUNhY2hlRGF0YUxpc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhTGlzdCA9IHRoaXMuX2l0ZW1EYXRhTGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+IGRhdGFMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gZGF0YUxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydERhdGEoZGF0YUxpc3QsIGl0ZW1zRGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPiBpbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICsrdGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnREYXRhKGRhdGFMaXN0LCBpdGVtc0RhdGEsIGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXggPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmj5LlhaXmlbDmja7poblcbiAgICAgKiBAcGFyYW0gZGF0YUxpc3Qge1RbXX0g5o+S5YWl5YiX6KGoXG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSDkuIvmoIdcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5zZXJ0RGF0YTxUPihkYXRhTGlzdDogVFtdLCBpdGVtc0RhdGE6IFQgfCBUW10sIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXNEYXRhKSkge1xuICAgICAgICAgICAgbGV0IHNwbGljZVBhcmFtOiB1bmtub3duW10gPSBbaW5kZXgsIDBdO1xuICAgICAgICAgICAgc3BsaWNlUGFyYW0gPSBzcGxpY2VQYXJhbS5jb25jYXQoaXRlbXNEYXRhKTtcbiAgICAgICAgICAgIGRhdGFMaXN0LnNwbGljZS5hcHBseShkYXRhTGlzdCwgc3BsaWNlUGFyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlKGluZGV4LCAwLCBpdGVtc0RhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yig6Zmk6aG5XG4gICAgICogQHBhcmFtIGluZGV4IHtudW1iZXJ9IOS4i+agh++8iOmcgOimgeWIoOmZpOeahOS4i+agh++8iVxuICAgICAqIEBwYXJhbSBjb3VudCB7bnVtYmVyfSDmlbDph4/vvIjliKDpmaTkuIvmoIflkI7nmoTmlbDph4/vvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlKGluZGV4PzogbnVtYmVyLCBjb3VudD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YUxpc3Q6IHVua25vd25bXSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9pc1JlbmRlcmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbUNhY2hlRGF0YUxpc3QgPSBbXS5jb25jYXQodGhpcy5faXRlbURhdGFMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5faXRlbUNhY2hlRGF0YUxpc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhTGlzdCA9IHRoaXMuX2l0ZW1EYXRhTGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKGluZGV4KSAmJiBUeXBlVXRpbHMuaXNOdWxsKGNvdW50KSkge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgY291bnQgPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAoVHlwZVV0aWxzLmlzTnVsbChpbmRleCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gZGF0YUxpc3QubGVuZ3RoIC0gY291bnQ7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gZGF0YUxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFR5cGVVdGlscy5pc051bGwoY291bnQpKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+PSBkYXRhTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGRhdGFMaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudCA9IGRhdGFMaXN0Lmxlbmd0aCAtIGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICBkYXRhTGlzdC5zcGxpY2UoaW5kZXgsIGNvdW50KTtcbiAgICAgICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID4gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICArK3RoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFMaXN0LnNwbGljZShpbmRleCwgY291bnQpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IE1hdGgubWF4KHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGgsIHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWIl+ihqOmhuVxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlTGlzdEl0ZW0oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5faXNMb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0UmVuZGVyaW5nKHRydWUpO1xuXG4gICAgICAgIGxldCBpc0ZyYW1lTG9hZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY29udGVudC5zZXRDb250ZW50U2l6ZSh0aGlzLmdldElubmVyRXN0aW1hdGVTaXplKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLkVORExFU1MpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHB1dEluZGV4TGlzdDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4OyBpIDwgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4OyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1EYXRhOiB1bmtub3duID0gdGhpcy5faXRlbURhdGFMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFUeXBlVXRpbHMuaXNOdWxsKGl0ZW1Ob2RlKSAmJiB0aGlzLl9pdGVtRGF0YUxpc3QuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5ub2RlLm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja0l0ZW0uYmluZCh0aGlzLCBpdGVtTm9kZSwgaXRlbURhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVNyYzogQ29tcG9uZW50SW50ZXJmYWNlLkxpc3RWaWV3SXRlbUNsYXNzID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGl0ZW1Ob2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtU3JjLm9uU2hvdyAmJiBpdGVtU3JjLm9uU2hvdyhpdGVtRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGl0ZW1Ob2RlKSAmJiAhdGhpcy5faXRlbURhdGFMaXN0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2l0ZW1EYXRhTGlzdC5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICBwdXRJbmRleExpc3QucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbU5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtc0RhdGE6IHVua25vd25bXSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShpLCB0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoKTs7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLkZSQU1FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZVBvb2xTaXplOiBudW1iZXIgPSB0aGlzLl9pdGVtTm9kZVBvb2wuc2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVQb29sU2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0TG9hZEVuZEluZGV4OiBudW1iZXIgPSBpICsgbm9kZVBvb2xTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zRGF0YSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShpLCBkaXJlY3RMb2FkRW5kSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0TG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0TG9hZEVuZEluZGV4IDwgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zRGF0YSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShkaXJlY3RMb2FkRW5kSW5kZXgsIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVMb2FkSXRlbShpdGVtc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZyYW1lTG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lTG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZyYW1lTG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5OT05FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdExvYWRJdGVtKGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBwdXRJbmRleExpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bcHV0SW5kZXhMaXN0W2ldXTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dE5vZGUoaXRlbU5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzRnJhbWVMb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSZW5kZXJpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yi35paw57yT5a2Y5pWw5o2u5YiX6KGo6aG5XG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVDYWNoZURhdGFMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldERhdGEodGhpcy5faXRlbURhdGFMaXN0LCB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCk7XG4gICAgICAgIHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4ID0gTWF0aC5tYXgodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNMb2FkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kZS5vbihcInNjcm9sbC10by10b3BcIiwgdGhpcy5vblNjcm9sbFRvVG9wLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLWJvdHRvbVwiLCB0aGlzLm9uU2Nyb2xsVG9Cb3R0b20sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tbGVmdFwiLCB0aGlzLm9uU2Nyb2xsVG9MZWZ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLXJpZ2h0XCIsIHRoaXMub25TY3JvbGxUb1JpZ2h0LCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oXCJib3VuY2UtYm90dG9tXCIsIHRoaXMub25Cb3VuY2VCb3R0b20sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJib3VuY2UtdG9wXCIsIHRoaXMub25Cb3VuY2VUb3AsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJib3VuY2UtbGVmdFwiLCB0aGlzLm9uQm91bmNlTGVmdCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihcImJvdW5jZS1yaWdodFwiLCB0aGlzLm9uQm91bmNlUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsaW5nLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsLWVuZGVkXCIsIHRoaXMub25TY3JvbGxFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihcInRvdWNoLXVwXCIsIHRoaXMub25Ub3VjaFVwLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsLWJlZ2FuXCIsIHRoaXMub25TY3JvbGxCZWdhbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bnJlZ2lzdGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLXRvLXRvcFwiLCB0aGlzLm9uU2Nyb2xsVG9Ub3AsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLXRvLWJvdHRvbVwiLCB0aGlzLm9uU2Nyb2xsVG9Cb3R0b20sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLXRvLWxlZnRcIiwgdGhpcy5vblNjcm9sbFRvTGVmdCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vblNjcm9sbFRvUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJib3VuY2UtYm90dG9tXCIsIHRoaXMub25Cb3VuY2VCb3R0b20sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLXRvcFwiLCB0aGlzLm9uQm91bmNlVG9wLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcImJvdW5jZS1sZWZ0XCIsIHRoaXMub25Cb3VuY2VMZWZ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcImJvdW5jZS1yaWdodFwiLCB0aGlzLm9uQm91bmNlUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJzY3JvbGxpbmdcIiwgdGhpcy5vblNjcm9sbGluZywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInRvdWNoLXVwXCIsIHRoaXMub25Ub3VjaFVwLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInNjcm9sbC1iZWdhblwiLCB0aGlzLm9uU2Nyb2xsQmVnYW4sIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIGxldCBwb29sTm9kZUNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTDoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuYW5jaG9yWCA9PT0gMC41KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hbmNob3JYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnggPSB0aGlzLmNvbnRlbnQueCAtICh0aGlzLmNvbnRlbnQud2lkdGggKiAwLjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYW5jaG9yWSA9IDAuNTtcbiAgICAgICAgICAgICAgICBwb29sTm9kZUNvdW50ID0gTWF0aC5jZWlsKCh0aGlzLm5vZGUud2lkdGggLSB0aGlzLnNwYWNpbmdYKSAvICh0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCArIHRoaXMuc3BhY2luZ1gpKSArIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5hbmNob3JZID09PSAwLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFuY2hvclkgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IHRoaXMuY29udGVudC55ICsgKHRoaXMuY29udGVudC5oZWlnaHQgKiAwLjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYW5jaG9yWCA9IDAuNTtcbiAgICAgICAgICAgICAgICBwb29sTm9kZUNvdW50ID0gTWF0aC5jZWlsKCh0aGlzLm5vZGUuaGVpZ2h0IC0gdGhpcy5zcGFjaW5nWSkgLyAodGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0ICsgdGhpcy5zcGFjaW5nWSkpICsgMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLkVORExFU1MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBwb29sTm9kZUNvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dE5vZGUodGhpcy5nZXROb2RlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7muLLmn5PkuK3nirbmgIFcbiAgICAgKiBAcGFyYW0gaXNSZW5kZXJpbmcge2Jvb2xlYW59IOaYr+WQpuato+WcqOa4suafk+mhuVxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0UmVuZGVyaW5nKGlzUmVuZGVyaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gaXNSZW5kZXJpbmc7XG4gICAgICAgIGlmICghaXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXJlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5YiX6KGo6aG56IqC54K5XG4gICAgICogQHJldHVybnMge2NjLk5vZGV9IOiKgueCuVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0Tm9kZSgpOiBjYy5Ob2RlIHwgbnVsbCB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtUHJlZmFiKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci5lcnJvcihg6K+35ZyoIExpc3RWaWV3IOa3u+WKoOmihOWItumhuSBwcmVmYWJgKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSB0aGlzLl9pdGVtTm9kZVBvb2wuZ2V0KCk7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZhYik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrSXRlbUV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGxldCBidXR0b246IGNjLkJ1dHRvbiA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgaWYgKCFidXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uID0gbm9kZS5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlL7lhaXliJfooajpobnoioLngrlcbiAgICAgKiBAcGFyYW0gbm9kZSB7Y2MuTm9kZX0g6IqC54K5XG4gICAgICovXG4gICAgcHJpdmF0ZSBwdXROb2RlKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFub2RlIHx8IG5vZGUubmFtZSAhPT0gdGhpcy5pdGVtUHJlZmFiLmRhdGEubmFtZSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIud2Fybihg6K+35LiN6KaB5pS+5YWl5LiOICR7bm9kZS5uYW1lfSDkuI3nm7jlhbPnmoToioLngrlgKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLm5vZGUub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcblxuICAgICAgICBsZXQgc3JjOiBDb21wb25lbnRJbnRlcmZhY2UuTGlzdFZpZXdJdGVtQ2xhc3MgPSBub2RlLmdldENvbXBvbmVudChub2RlLm5hbWUpO1xuICAgICAgICBzcmMucmVzZXQoKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtTm9kZVBvb2wucHV0KG5vZGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRJdGVtUG9zKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlubmVyQ291bnQ6IG51bWJlciA9IHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50IC0gMTtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMubGVmdCArICh0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCAqIDAuNSkgKyAoaW5uZXJDb3VudCAqIHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoKSArIChpbm5lckNvdW50ICogdGhpcy5zcGFjaW5nWCksIDApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLCAwIC0gdGhpcy50b3AgLSAodGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0ICogMC41KSAtIChpbm5lckNvdW50ICogdGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0KSAtIChpbm5lckNvdW50ICogdGhpcy5zcGFjaW5nWSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55Sf5Lqn5YiX6KGo6aG5XG4gICAgICogQHBhcmFtIGl0ZW1EYXRhIHtUfSDms5vlnovmlbDmja5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VJdGVtPFQ+KGl0ZW1EYXRhOiBUKTogdm9pZCB7XG4gICAgICAgIGxldCBpdGVtTm9kZTogY2MuTm9kZSA9IHRoaXMuZ2V0Tm9kZSgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbU5vZGUpO1xuICAgICAgICBsZXQgaXRlbVNyYzogQ29tcG9uZW50SW50ZXJmYWNlLkxpc3RWaWV3SXRlbUNsYXNzID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGl0ZW1Ob2RlLm5hbWUpO1xuICAgICAgICBpZiAoaXRlbVNyYyAmJiAhVHlwZVV0aWxzLmlzTnVsbChpdGVtRGF0YSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrSXRlbUV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tJdGVtLmJpbmQodGhpcywgaXRlbU5vZGUsIGl0ZW1EYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtU3JjLm9uU2hvdyAmJiBpdGVtU3JjLm9uU2hvdyhpdGVtRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJdGVtUG9zKGl0ZW1Ob2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlICptYWtlR2VuZXJhdG9ySXRlbTxUPihpdGVtc0RhdGE6IFRbXSk6IEdlbmVyYXRvciB7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtc0RhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMubWFrZUl0ZW0oaXRlbXNEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJp+ihjOWNj+eoi+WKoOi9veWIl+ihqOmhuVxuICAgICAqIEBwYXJhbSBnZW5lcmF0b3Ige0dlbmVyYXRvcn0g5Y2P56iLXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIHtudW1iZXJ9IOavj+asoeWNj+eoi+WNoOeUqOaXtumXtO+8iOWNleS9je+8muavq+enku+8iVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZXhlY0dlbmVyYXRvckl0ZW0oZ2VuZXJhdG9yOiBHZW5lcmF0b3IsIGR1cmF0aW9uOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiAodmFsdWU6IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPikgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhlYzogRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlcmF0b3IgPSBnZW5lcmF0b3IubmV4dCgpOyA7IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IgPT0gbnVsbCB8fCBpdGVyYXRvci5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gc3RhcnRUaW1lID4gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleGVjKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIhuW4p+WKoOi9vVxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge2l0ZW1zRGF0YTogVFtdfSDliJfooajpobnmlbDmja5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGZyYW1lTG9hZEl0ZW08VD4oaXRlbXNEYXRhOiBUW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjR2VuZXJhdG9ySXRlbSh0aGlzLm1ha2VHZW5lcmF0b3JJdGVtKGl0ZW1zRGF0YSksIEVYRUNfR0VORVJBVE9SX1RJTUUpO1xuICAgICAgICB0aGlzLnNldFJlbmRlcmluZyhmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55u05o6l5Yqg6L29XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7aXRlbXNEYXRhOiBUW119IOWIl+ihqOmhueaVsOaNrlxuICAgICAqL1xuICAgIHByaXZhdGUgZGlyZWN0TG9hZEl0ZW08VD4oaXRlbXNEYXRhOiBUW10pOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGl0ZW1zRGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5tYWtlSXRlbShpdGVtc0RhdGFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5bem6L6557yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0TGVmdCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC54IC09IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGg7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5Y+z6L6557yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0UmlnaHQoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueCArPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPlumhtumDqOe8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdFRvcCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC55ICs9IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluW6lemDqOe8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdEJvdHRvbSgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC55IC09IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluW3puWPs+e8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdExlZnRSaWdodCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC54IC09IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGg7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGggKiAzLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluS4iuS4i+e8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdFRvcEJvdHRvbSgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC55IC09IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0O1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCAqIDMpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5bkuK3pl7Tlj6/op4bnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRWaXNpYmxlUmVjdENlbnRlcigpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluWtkOmhueWIl+ihqOeahOefqeW9ouWkp+Wwj1xuICAgIC8vICAqIEBwYXJhbSBpdGVtcyB7U2Nyb2xsVmlld0ludGVyZmFjZS5JdGVtRGF0YVtdfSDlrZDpobnliJfooahcbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuU2l6ZX1cbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldEl0ZW1zUmVjdFNpemUoaXRlbXM6IFNjcm9sbFZpZXdJbnRlcmZhY2UuSXRlbURhdGFbXSk6IGNjLlNpemUge1xuICAgIC8vICAgICBsZXQgcmVjdFNpemU6IGNjLlNpemUgPSBuZXcgY2MuU2l6ZSgwLCAwKTtcblxuICAgIC8vICAgICBpZiAoaXRlbXMpIHtcbiAgICAvLyAgICAgICAgIGlmICghKGl0ZW1zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgLy8gICAgICAgICAgICAgaXRlbXMgPSBbXS5jb25jYXQoaXRlbXMpO1xuICAgIC8vICAgICAgICAgfVxuXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAvLyAgICAgICAgICAgICBsZXQgaXRlbTogU2Nyb2xsVmlld0ludGVyZmFjZS5JdGVtRGF0YSA9IGl0ZW1zW2ldO1xuICAgIC8vICAgICAgICAgICAgIHJlY3RTaXplLndpZHRoICs9IGl0ZW0ucHJlZmFiLmRhdGEud2lkdGg7XG4gICAgLy8gICAgICAgICAgICAgcmVjdFNpemUuaGVpZ2h0ICs9IGl0ZW0ucHJlZmFiLmRhdGEuaGVpZ2h0O1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgcmV0dXJuIHJlY3RTaXplO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlui+uei3nVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IOi+uei3nVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UGFkZGluZygpOiBudW1iZXIge1xuICAgICAgICBsZXQgcGFkZGluZzogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBwYWRkaW5nICs9IHRoaXMubGVmdCArIHRoaXMucmlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBwYWRkaW5nICs9IHRoaXMudG9wICsgdGhpcy5ib3R0b207XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZGRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6Ze06LedXG4gICAgICogQHJldHVybnMge251bWJlcn0g6Ze06LedXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTcGFjaW5nKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBzcGFjaW5nOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHNwYWNpbmcgPSB0aGlzLnNwYWNpbmdYO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgc3BhY2luZyA9IHRoaXMuc3BhY2luZ1k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYWNpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5YaF5a655Zmo6aKE5Lyw5aSn5bCPXG4gICAgICogQHJldHVybnMge2NjLlNpemV9IOWGheWuueWZqOmihOS8sOWkp+Wwj1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0SW5uZXJFc3RpbWF0ZVNpemUoKTogY2MuU2l6ZSB7XG4gICAgICAgIGxldCBzaXplOiBjYy5TaXplID0gdGhpcy5jb250ZW50LnBhcmVudC5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHNpemUud2lkdGggPSB0aGlzLmdldFBhZGRpbmcoKSArICh0aGlzLmdldFNwYWNpbmcoKSAqICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIC0gMSkpICsgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCk7XG4gICAgICAgICAgICBpZiAoc2l6ZS53aWR0aCA8IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICBzaXplLndpZHRoID0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gdGhpcy5nZXRQYWRkaW5nKCkgKyAodGhpcy5nZXRTcGFjaW5nKCkgKiAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCAtIDEpKSArICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoICogdGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0KTtcbiAgICAgICAgICAgIGlmIChzaXplLmhlaWdodCA8IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2Nyb2xsVG9Ub3AodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNQYWdpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnB1bGxUb3BFdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHVsbFRvcEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGxUb0JvdHRvbSh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHVsbEJvdHRvbUV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5wdWxsQm90dG9tRXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNjcm9sbFRvTGVmdCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHVsbExlZnRFdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHVsbExlZnRFdmVudEhhbmRsZXIuZW1pdChbdGFyZ2V0XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2Nyb2xsVG9SaWdodCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHVsbFJpZ2h0RXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnB1bGxSaWdodEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGxpbmcodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICAvLyBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQ7ICsraSkge1xuICAgICAgICAvLyAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgbGV0IGl0ZW1SZWN0OiBjYy5SZWN0ID0gaXRlbU5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XG5cbiAgICAgICAgLy8gICAgIGlmIChpdGVtUmVjdC5pbnRlcnNlY3RzKHRoaXMubV9jYWNoZVJlY3QpKSB7XG5cbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChpdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKS54ID4gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpLngpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC0tdGhpcy5tX2xhc3RJbmRleDtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChpdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKS55IDwgdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpLngpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC0tdGhpcy5tX2xhc3RJbmRleDtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB0aGlzLnB1dE5vZGUoaXRlbU5vZGUpO1xuICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiU2Nyb2xsaW5nXCIsIHRhcmdldCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJvdW5jZUJvdHRvbSh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlQm90dG9tXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Cb3VuY2VUb3AodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYnJha2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEcuTG9nTWdyLmxvZyhcIkJvdW5jZVRvcFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQm91bmNlTGVmdCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlTGVmdFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQm91bmNlUmlnaHQodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYnJha2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEcuTG9nTWdyLmxvZyhcIkJvdW5jZVJpZ2h0XCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGxFbmRlZCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIC8vIEcuTG9nTWdyLmxvZyhcIlNjcm9sbEVuZGVkXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Ub3VjaFVwKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiVG91Y2hVcFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2Nyb2xsQmVnYW4odGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICAvLyBHLkxvZ01nci5sb2coXCJTY3JvbGxCZWdhblwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3muLLmn5PlrozmiJAg5Zue6LCDXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblJlbmRlcmVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUNhY2hlRGF0YUxpc3QoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja0l0ZW08VD4obm9kZTogY2MuTm9kZSwgZGF0YTogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsaWNrSXRlbUV2ZW50SGFuZGxlci5lbWl0KFtub2RlLCBkYXRhXSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnVucmVnaXN0ZXIoKTtcbiAgICB9XG5cbn1cbiJdfQ==