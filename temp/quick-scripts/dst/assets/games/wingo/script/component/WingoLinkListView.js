
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/component/WingoLinkListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6d23gd1SNJep5RCeiXLhB+', 'WingoLinkListView');
// games/wingo/script/component/WingoLinkListView.ts

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
let WingoLinkListView = class WingoLinkListView extends cc.Component {
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
], WingoLinkListView.prototype, "content", void 0);
__decorate([
    property({ type: cc.Prefab, tooltip: "列表项预制" })
], WingoLinkListView.prototype, "itemPrefab", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.ListViewLoadMode), tooltip: "加载模式\nNONE 直接加载\nFRAME 分帧加载\nENDLESS 无限加载" })
], WingoLinkListView.prototype, "mode", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.DirectionType), tooltip: "滑动方向\nHORIZONTAL 水平\nVERTICAL 垂直" })
], WingoLinkListView.prototype, "direction", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "垂直间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoLinkListView.prototype, "spacingY", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "顶间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoLinkListView.prototype, "top", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "底间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoLinkListView.prototype, "bottom", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "水平间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoLinkListView.prototype, "spacingX", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "左间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoLinkListView.prototype, "left", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "右间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoLinkListView.prototype, "right", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "点击列表项回调", visible: true })
], WingoLinkListView.prototype, "clickItemEventHandler", void 0);
WingoLinkListView = __decorate([
    ccclass
], WingoLinkListView);
exports.default = WingoLinkListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvY29tcG9uZW50L1dpbmdvTGlua0xpc3RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtHQUFvRjtBQUVwRiwwRkFBa0U7QUFDbEUsdURBQW9EO0FBRXBELHFCQUFxQjtBQUNyQixNQUFNLG1CQUFtQixHQUFXLENBQUMsQ0FBQztBQUV0QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQTNEO1FBRUksbUNBQW1DO1FBQ25DLHFDQUFxQzs7UUFFckMsb0xBQW9MO1FBQ3BMLDZGQUE2RjtRQUU3RixvTEFBb0w7UUFDcEwsOEZBQThGO1FBRTlGLGtMQUFrTDtRQUNsTCw0RkFBNEY7UUFFNUYsa0xBQWtMO1FBQ2xMLCtGQUErRjtRQUUvRiw0R0FBNEc7UUFDNUcsK0NBQStDO1FBR3ZDLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsZUFBVSxHQUFjLElBQUksQ0FBQztRQUc5QixTQUFJLEdBQXFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7UUFHOUUsY0FBUyxHQUFrQyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUUxRix3SUFBd0k7UUFDeEksK0JBQStCO1FBRS9CLGdHQUFnRztRQUNoRyx3Q0FBd0M7UUFHaEMsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBR2hCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFHbkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBR2pCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFHbEIsMEJBQXFCLEdBQThC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ZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOytDQUNuSDtBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dEQUNsSDtBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztnRUFDVTtBQXpEMUUsaUJBQWlCO0lBRHJDLE9BQU87R0FDYSxpQkFBaUIsQ0E4MUJyQztrQkE5MUJvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDb21wb25lbnREZWZpbmUgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vZGVmaW5lL0NvbXBvbmVudERlZmluZVwiO1xuaW1wb3J0ICogYXMgQ29tcG9uZW50SW50ZXJmYWNlIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2ludGVyZmFjZS9Db21wb25lbnRJbnRlcmZhY2VcIjtcbmltcG9ydCBUeXBlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvVHlwZVV0aWxzXCI7XG5pbXBvcnQgeyBXaW5nb0RlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvV2luZ29EZWZpbmVcIjtcblxuLy8g5q+P5qyh5omn6KGM5Y2P56iL5YiG6YWN55qE5pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG5jb25zdCBFWEVDX0dFTkVSQVRPUl9USU1FOiBudW1iZXIgPSA4O1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZ29MaW5rTGlzdFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmmK/lkKbliIbpobXliqDovb1cIiB9KVxuICAgIC8vIHByaXZhdGUgaXNQYWdpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5bem6L655ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgLy8gcHJpdmF0ZSBwdWxsTGVmdEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuWPs+i+ueaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIC8vIHByaXZhdGUgcHVsbFJpZ2h0RXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi6aG26YOo5ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIC8vIHByaXZhdGUgcHVsbFRvcEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuW6lemDqOaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICAvLyBwcml2YXRlIHB1bGxCb3R0b21FdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlRnJhbWUsIHRvb2x0aXA6IFwi5Yi35paw5ouJ5Y+W562J5b6F5Zu+54mHXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nIH0pIH0pXG4gICAgLy8gcHJpdmF0ZSB3YWl0aW5nSW1hZ2U6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgY29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5YiX6KGo6aG56aKE5Yi2XCIgfSlcbiAgICBwcml2YXRlIGl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlKSwgdG9vbHRpcDogXCLliqDovb3mqKHlvI9cXG5OT05FIOebtOaOpeWKoOi9vVxcbkZSQU1FIOWIhuW4p+WKoOi9vVxcbkVORExFU1Mg5peg6ZmQ5Yqg6L29XCIgfSlcbiAgICBwdWJsaWMgbW9kZTogQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUgPSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5OT05FO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSksIHRvb2x0aXA6IFwi5ruR5Yqo5pa55ZCRXFxuSE9SSVpPTlRBTCDmsLTlubNcXG5WRVJUSUNBTCDlnoLnm7RcIiB9KVxuICAgIHByaXZhdGUgZGlyZWN0aW9uOiBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5rua5Yqo5LmL5ZCO55qE5YeP6YCf57O75pWw44CC5Y+W5YC86IyD5Zu05pivIDAtMe+8jOWmguaenOaYryAxIOWImeeri+mprOWBnOatoua7muWKqO+8jOWmguaenOaYryAw77yM5YiZ5Lya5LiA55u05rua5Yqo5YiwIGNvbnRlbnQg55qE6L6555WM44CCXCIsIG92ZXJyaWRlOiB0cnVlLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgLy8gcHVibGljIGJyYWtlOiBudW1iZXIgPSAwLjc1O1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Zue5by55omA6ZyA6KaB55qE5pe26Ze044CC5Y+W5YC86IyD5Zu05pivIDAtMTDjgIJcIiwgb3ZlcnJpZGU6IHRydWUsIHZpc2libGU6IHRydWUgfSlcbiAgICAvLyBwdWJsaWMgYm91bmNlRHVyYXRpb246IG51bWJlciA9IDAuMjM7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlnoLnm7Tpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgc3BhY2luZ1k6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLpobbpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgdG9wOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5bqV6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICBwcml2YXRlIGJvdHRvbTogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuawtOW5s+mXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICBwcml2YXRlIHNwYWNpbmdYOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5bem6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgbGVmdDogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuWPs+mXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICBwcml2YXRlIHJpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLngrnlh7vliJfooajpobnlm57osINcIiwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgY2xpY2tJdGVtRXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIOaYr+WQpuWKoOi9veWujOaIkFxuICAgIHByaXZhdGUgX2lzTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5pWw5o2u5YiX6KGoXG4gICAgcHJpdmF0ZSBfaXRlbURhdGFMaXN0OiB1bmtub3duW10gPSBbXTtcbiAgICAvLyDliJfooajpobnoioLngrnmsaBcbiAgICBwcml2YXRlIF9pdGVtTm9kZVBvb2w6IGNjLk5vZGVQb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgLy8g5pyA5ZCO6IqC54K55L2N572uXG4gICAgcHJpdmF0ZSBfbGFzdFBvczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuICAgIC8vIOa4suafk+WIl+ihqOmhuei1t+Wni+S4i+agh1xuICAgIHByaXZhdGUgX3JlbmRlckl0ZW1TdGFydEluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOa4suafk+WIl+ihqOmhuee7k+adn+S4i+agh1xuICAgIHByaXZhdGUgX3JlbmRlckl0ZW1FbmRJbmRleDogbnVtYmVyID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmuLLmn5PkuK1cbiAgICBwcml2YXRlIF9pc1JlbmRlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIOe8k+WtmOWIl+ihqFxuICAgIHByaXZhdGUgX2l0ZW1DYWNoZURhdGFMaXN0OiB1bmtub3duW10gPSBbXTtcbiAgICAvLyDmuLLmn5PkuK3mk43kvZzmrKHmlbBcbiAgICBwcml2YXRlIF9yZW5kZXJpbmdPcGVyYXRlQ291bnQ6IG51bWJlciA9IDA7XG4gICAgLy8g57yT5a2Y5riy5p+T5YiX6KGo6aG56LW35aeL5LiL5qCHXG4gICAgcHJpdmF0ZSBfY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOS/ruaUueaWueWQkeexu+Wei+WxnuaAp1xuICAgICAqIEBwYXJhbSB2YWx1ZSB7Q29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGV9IOaWueWQkeexu+Wei1xuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlRGlyZWN0aW9uKHZhbHVlOiBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZSk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLmhvcml6b250YWwgPSB2YWx1ZSA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTDtcbiAgICAgICAgLy8gdGhpcy52ZXJ0aWNhbCA9IHZhbHVlID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTDtcblxuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwidG9wXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwiYm90dG9tXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwic3BhY2luZ1lcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJ2ZXJ0aWNhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImxlZnRcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInJpZ2h0XCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJzcGFjaW5nWFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwiaG9yaXpvbnRhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rumhuVxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge1QgfCBUW119IOaVsOaNrnzmlbDmja7liJfooahcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0PFQ+KGl0ZW1zRGF0YTogVCB8IFRbXSk6IHZvaWQge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzQXJyYXkoaXRlbXNEYXRhKSkge1xuICAgICAgICAgICAgaWYgKChpdGVtc0RhdGEgYXMgQXJyYXk8VD4pLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtc0RhdGEgPSAoaXRlbXNEYXRhIGFzIEFycmF5PFQ+KS5zbGljZSgtV2luZ29EZWZpbmUuSElTVE9SWV9DT1VOVCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEodGhpcy5faXRlbUNhY2hlRGF0YUxpc3QsIGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgICsrdGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX2l0ZW1EYXRhTGlzdCwgaXRlbXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7mlbDmja7poblcbiAgICAgKiBAcGFyYW0gZGF0YUxpc3Qge1RbXX0g6K6+572u5YiX6KGoXG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXREYXRhPFQ+KGRhdGFMaXN0OiBUW10sIGl0ZW1zRGF0YTogVCB8IFRbXSk6IHZvaWQge1xuICAgICAgICBkYXRhTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmluc2VydERhdGEoZGF0YUxpc3QsIGl0ZW1zRGF0YSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+S5YWl6aG5XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSDkuIvmoIfvvIjpu5jorqTvvJrmnIDlkI7mj5LlhaXvvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5zZXJ0PFQ+KGl0ZW1zRGF0YTogVCB8IFRbXSwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbXNEYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc0FycmF5KGl0ZW1zRGF0YSkgJiYgKGl0ZW1zRGF0YSBhcyBBcnJheTxUPikubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhTGlzdDogdW5rbm93bltdID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCA9IFtdLmNvbmNhdCh0aGlzLl9pdGVtRGF0YUxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5faXRlbURhdGFMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID4gZGF0YUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGF0YShkYXRhTGlzdCwgaXRlbXNEYXRhLCBpbmRleCk7XG4gICAgICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKyt0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydERhdGEoZGF0YUxpc3QsIGl0ZW1zRGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaPkuWFpeaVsOaNrumhuVxuICAgICAqIEBwYXJhbSBkYXRhTGlzdCB7VFtdfSDmj5LlhaXliJfooahcbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtUIHwgVFtdfSDmlbDmja585pWw5o2u5YiX6KGoXG4gICAgICogQHBhcmFtIGluZGV4IHtudW1iZXJ9IOS4i+agh1xuICAgICAqL1xuICAgIHB1YmxpYyBpbnNlcnREYXRhPFQ+KGRhdGFMaXN0OiBUW10sIGl0ZW1zRGF0YTogVCB8IFRbXSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICBsZXQgc3BsaWNlUGFyYW06IHVua25vd25bXSA9IFtpbmRleCwgMF07XG4gICAgICAgICAgICBzcGxpY2VQYXJhbSA9IHNwbGljZVBhcmFtLmNvbmNhdChpdGVtc0RhdGEpO1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlLmFwcGx5KGRhdGFMaXN0LCBzcGxpY2VQYXJhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGl0ZW1zRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKDpmaTpoblcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn0g5LiL5qCH77yI6ZyA6KaB5Yig6Zmk55qE5LiL5qCH77yJXG4gICAgICogQHBhcmFtIGNvdW50IHtudW1iZXJ9IOaVsOmHj++8iOWIoOmZpOS4i+agh+WQjueahOaVsOmHj++8iVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmUoaW5kZXg/OiBudW1iZXIsIGNvdW50PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhTGlzdDogdW5rbm93bltdID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCA9IFtdLmNvbmNhdCh0aGlzLl9pdGVtRGF0YUxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5faXRlbURhdGFMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpICYmIFR5cGVVdGlscy5pc051bGwoY291bnQpKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBjb3VudCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGggLSBjb3VudDtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgY291bnQgPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoVHlwZVV0aWxzLmlzTnVsbChjb3VudCkpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID49IGRhdGFMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gZGF0YUxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ID0gZGF0YUxpc3QubGVuZ3RoIC0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIGRhdGFMaXN0LnNwbGljZShpbmRleCwgY291bnQpO1xuICAgICAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPiBpbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICsrdGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlKGluZGV4LCBjb3VudCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4ID0gTWF0aC5tYXgodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbW92ZSgwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2hpbGROb2RlKHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXg6IG51bWJlcik6IGNjLk5vZGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2hpbGRyZW4uc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWIl+ihqOmhuVxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlTGlzdEl0ZW0oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5faXNMb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0UmVuZGVyaW5nKHRydWUpO1xuXG4gICAgICAgIGxldCBzaXplOiBjYy5TaXplID0gdGhpcy5nZXRJbm5lckVzdGltYXRlU2l6ZSgpO1xuICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUoc2l6ZSk7XG4gICAgICAgIHRoaXMuY29udGVudC5zZXRDb250ZW50U2l6ZShzaXplKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnkgPSBzaXplLmhlaWdodCAqIDAuNTtcbiAgICAgICAgdGhpcy5jb250ZW50LnBhcmVudC5zZXRDb250ZW50U2l6ZShzaXplKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnBhcmVudC55ID0gLShzaXplLmhlaWdodCAqIDAuNSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUuRU5ETEVTUykge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcHV0SW5kZXhMaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IGlzRnJhbWVMb2FkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSB0aGlzLl9yZW5kZXJJdGVtU3RhcnRJbmRleDsgaSA8IHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtRGF0YTogdW5rbm93biA9IHRoaXMuX2l0ZW1EYXRhTGlzdFtpXTtcblxuICAgICAgICAgICAgICAgIGlmICghVHlwZVV0aWxzLmlzTnVsbChpdGVtTm9kZSkgJiYgdGhpcy5faXRlbURhdGFMaXN0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrSXRlbUV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tJdGVtLmJpbmQodGhpcywgaXRlbU5vZGUsIGl0ZW1EYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1TcmM6IENvbXBvbmVudEludGVyZmFjZS5MaXN0Vmlld0l0ZW1DbGFzcyA9IGl0ZW1Ob2RlLmdldENvbXBvbmVudChpdGVtTm9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVNyYy5vblNob3cgJiYgaXRlbVNyYy5vblNob3coaXRlbURhdGEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVHlwZVV0aWxzLmlzTnVsbChpdGVtTm9kZSkgJiYgIXRoaXMuX2l0ZW1EYXRhTGlzdC5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pdGVtRGF0YUxpc3QuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHV0SW5kZXhMaXN0LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGl0ZW1Ob2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXNEYXRhOiB1bmtub3duW10gPSB0aGlzLl9pdGVtRGF0YUxpc3Quc2xpY2UoaSwgdGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCk7O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5GUkFNRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGVQb29sU2l6ZTogbnVtYmVyID0gdGhpcy5faXRlbU5vZGVQb29sLnNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlUG9vbFNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdExvYWRFbmRJbmRleDogbnVtYmVyID0gaSArIG5vZGVQb29sU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc0RhdGEgPSB0aGlzLl9pdGVtRGF0YUxpc3Quc2xpY2UoaSwgZGlyZWN0TG9hZEVuZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdExvYWRJdGVtKGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcmVjdExvYWRFbmRJbmRleCA8IHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc0RhdGEgPSB0aGlzLl9pdGVtRGF0YUxpc3Quc2xpY2UoZGlyZWN0TG9hZEVuZEluZGV4LCB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lTG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGcmFtZUxvYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZUxvYWRJdGVtKGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGcmFtZUxvYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUuTk9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3RMb2FkSXRlbShpdGVtc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gcHV0SW5kZXhMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW3B1dEluZGV4TGlzdFtpXV07XG4gICAgICAgICAgICAgICAgdGhpcy5wdXROb2RlKGl0ZW1Ob2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc0ZyYW1lTG9hZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVuZGVyaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOe8k+WtmOaVsOaNruWIl+ihqOmhuVxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlQ2FjaGVEYXRhTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX2l0ZW1EYXRhTGlzdCwgdGhpcy5faXRlbUNhY2hlRGF0YUxpc3QpO1xuICAgICAgICB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9yZW5kZXJJdGVtU3RhcnRJbmRleCA9IHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXg7XG4gICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IE1hdGgubWF4KHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGgsIHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50KTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzTG9hZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyKCk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tdG9wXCIsIHRoaXMub25TY3JvbGxUb1RvcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbC10by1ib3R0b21cIiwgdGhpcy5vblNjcm9sbFRvQm90dG9tLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLWxlZnRcIiwgdGhpcy5vblNjcm9sbFRvTGVmdCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uU2Nyb2xsVG9SaWdodCwgdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwiYm91bmNlLWJvdHRvbVwiLCB0aGlzLm9uQm91bmNlQm90dG9tLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwiYm91bmNlLXRvcFwiLCB0aGlzLm9uQm91bmNlVG9wLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwiYm91bmNlLWxlZnRcIiwgdGhpcy5vbkJvdW5jZUxlZnQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJib3VuY2UtcmlnaHRcIiwgdGhpcy5vbkJvdW5jZVJpZ2h0LCB0aGlzKTtcblxuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGxpbmdcIiwgdGhpcy5vblNjcm9sbGluZywgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbC1lbmRlZFwiLCB0aGlzLm9uU2Nyb2xsRW5kZWQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJ0b3VjaC11cFwiLCB0aGlzLm9uVG91Y2hVcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbC1iZWdhblwiLCB0aGlzLm9uU2Nyb2xsQmVnYW4sIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5yZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC10by10b3BcIiwgdGhpcy5vblNjcm9sbFRvVG9wLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC10by1ib3R0b21cIiwgdGhpcy5vblNjcm9sbFRvQm90dG9tLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC10by1sZWZ0XCIsIHRoaXMub25TY3JvbGxUb0xlZnQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLXRvLXJpZ2h0XCIsIHRoaXMub25TY3JvbGxUb1JpZ2h0LCB0aGlzKTtcblxuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLWJvdHRvbVwiLCB0aGlzLm9uQm91bmNlQm90dG9tLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcImJvdW5jZS10b3BcIiwgdGhpcy5vbkJvdW5jZVRvcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJib3VuY2UtbGVmdFwiLCB0aGlzLm9uQm91bmNlTGVmdCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJib3VuY2UtcmlnaHRcIiwgdGhpcy5vbkJvdW5jZVJpZ2h0LCB0aGlzKTtcblxuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsaW5nXCIsIHRoaXMub25TY3JvbGxpbmcsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLWVuZGVkXCIsIHRoaXMub25TY3JvbGxFbmRlZCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJ0b3VjaC11cFwiLCB0aGlzLm9uVG91Y2hVcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtYmVnYW5cIiwgdGhpcy5vblNjcm9sbEJlZ2FuLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICBsZXQgcG9vbE5vZGVDb3VudDogbnVtYmVyID0gMDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUw6IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmFuY2hvclggPT09IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYW5jaG9yWCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC54ID0gdGhpcy5jb250ZW50LnggLSAodGhpcy5jb250ZW50LndpZHRoICogMC41KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFuY2hvclkgPSAwLjU7XG4gICAgICAgICAgICAgICAgcG9vbE5vZGVDb3VudCA9IE1hdGguY2VpbCgodGhpcy5ub2RlLndpZHRoIC0gdGhpcy5zcGFjaW5nWCkgLyAodGhpcy5pdGVtUHJlZmFiLmRhdGEud2lkdGggKyB0aGlzLnNwYWNpbmdYKSkgKyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTDoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuYW5jaG9yWSA9PT0gMC41KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hbmNob3JZID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnkgPSB0aGlzLmNvbnRlbnQueSArICh0aGlzLmNvbnRlbnQuaGVpZ2h0ICogMC41KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFuY2hvclggPSAwLjU7XG4gICAgICAgICAgICAgICAgcG9vbE5vZGVDb3VudCA9IE1hdGguY2VpbCgodGhpcy5ub2RlLmhlaWdodCAtIHRoaXMuc3BhY2luZ1kpIC8gKHRoaXMuaXRlbVByZWZhYi5kYXRhLmhlaWdodCArIHRoaXMuc3BhY2luZ1kpKSArIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5FTkRMRVNTKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgcG9vbE5vZGVDb3VudDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXROb2RlKHRoaXMuZ2V0Tm9kZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5riy5p+T5Lit54q25oCBXG4gICAgICogQHBhcmFtIGlzUmVuZGVyaW5nIHtib29sZWFufSDmmK/lkKbmraPlnKjmuLLmn5PpoblcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFJlbmRlcmluZyhpc1JlbmRlcmluZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9pc1JlbmRlcmluZyA9IGlzUmVuZGVyaW5nO1xuICAgICAgICBpZiAoIWlzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uUmVuZGVyZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWIl+ihqOmhueiKgueCuVxuICAgICAqIEByZXR1cm5zIHtjYy5Ob2RlfSDoioLngrlcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE5vZGUoKTogY2MuTm9kZSB8IG51bGwge1xuICAgICAgICBpZiAoIXRoaXMuaXRlbVByZWZhYikge1xuICAgICAgICAgICAgRy5Mb2dnZXIuZXJyb3IoYOivt+WcqCBMaXN0VmlldyDmt7vliqDpooTliLbpobkgcHJlZmFiYCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gdGhpcy5faXRlbU5vZGVQb29sLmdldCgpO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uOiBjYy5CdXR0b24gPSBub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgICAgIGlmICghYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbiA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pS+5YWl5YiX6KGo6aG56IqC54K5XG4gICAgICogQHBhcmFtIG5vZGUge2NjLk5vZGV9IOiKgueCuVxuICAgICAqL1xuICAgIHByaXZhdGUgcHV0Tm9kZShub2RlOiBjYy5Ob2RlKTogdm9pZCB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlLm5hbWUgIT09IHRoaXMuaXRlbVByZWZhYi5kYXRhLm5hbWUpIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLndhcm4oYOivt+S4jeimgeaUvuWFpeS4jiAke25vZGUubmFtZX0g5LiN55u45YWz55qE6IqC54K5YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNsaWNrSXRlbUV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5ub2RlLm9mZihcImNsaWNrXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG5cbiAgICAgICAgbGV0IHNyYzogQ29tcG9uZW50SW50ZXJmYWNlLkxpc3RWaWV3SXRlbUNsYXNzID0gbm9kZS5nZXRDb21wb25lbnQobm9kZS5uYW1lKTtcbiAgICAgICAgc3JjLnJlc2V0KCk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faXRlbU5vZGVQb29sLnB1dChub2RlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0SXRlbVBvcyhub2RlOiBjYy5Ob2RlKTogdm9pZCB7XG4gICAgICAgIGxldCBpbm5lckNvdW50OiBudW1iZXIgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCAtIDE7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLmxlZnQgKyAodGhpcy5pdGVtUHJlZmFiLmRhdGEud2lkdGggKiAwLjUpICsgKGlubmVyQ291bnQgKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCkgKyAoaW5uZXJDb3VudCAqIHRoaXMuc3BhY2luZ1gpLCAwKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCAtIHRoaXMudG9wIC0gKHRoaXMuaXRlbVByZWZhYi5kYXRhLmhlaWdodCAqIDAuNSkgLSAoaW5uZXJDb3VudCAqIHRoaXMuaXRlbVByZWZhYi5kYXRhLmhlaWdodCkgLSAoaW5uZXJDb3VudCAqIHRoaXMuc3BhY2luZ1kpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeUn+S6p+WIl+ihqOmhuVxuICAgICAqIEBwYXJhbSBpdGVtRGF0YSB7VH0g5rOb5Z6L5pWw5o2uXG4gICAgICovXG4gICAgcHJpdmF0ZSBtYWtlSXRlbTxUPihpdGVtRGF0YTogVCk6IHZvaWQge1xuICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmdldE5vZGUoKTtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW1Ob2RlKTtcbiAgICAgICAgbGV0IGl0ZW1TcmM6IENvbXBvbmVudEludGVyZmFjZS5MaXN0Vmlld0l0ZW1DbGFzcyA9IGl0ZW1Ob2RlLmdldENvbXBvbmVudChpdGVtTm9kZS5uYW1lKTtcbiAgICAgICAgaWYgKGl0ZW1TcmMgJiYgIVR5cGVVdGlscy5pc051bGwoaXRlbURhdGEpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBpdGVtTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrSXRlbS5iaW5kKHRoaXMsIGl0ZW1Ob2RlLCBpdGVtRGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbVNyYy5vblNob3cgJiYgaXRlbVNyYy5vblNob3coaXRlbURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SXRlbVBvcyhpdGVtTm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSAqbWFrZUdlbmVyYXRvckl0ZW08VD4oaXRlbXNEYXRhOiBUW10pOiBHZW5lcmF0b3Ige1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbXNEYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB5aWVsZCB0aGlzLm1ha2VJdGVtKGl0ZW1zRGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiafooYzljY/nqIvliqDovb3liJfooajpoblcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdG9yIHtHZW5lcmF0b3J9IOWNj+eoi1xuICAgICAqIEBwYXJhbSBkdXJhdGlvbiB7bnVtYmVyfSDmr4/mrKHljY/nqIvljaDnlKjml7bpl7TvvIjljZXkvY3vvJrmr6vnp5LvvIlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGV4ZWNHZW5lcmF0b3JJdGVtKGdlbmVyYXRvcjogR2VuZXJhdG9yLCBkdXJhdGlvbjogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKHZhbHVlOiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4pID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGV4ZWM6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLm5leHQoKTsgOyBpdGVyYXRvciA9IGdlbmVyYXRvci5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID09IG51bGwgfHwgaXRlcmF0b3IuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSA+IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhlYygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliIbluKfliqDovb1cbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtpdGVtc0RhdGE6IFRbXX0g5YiX6KGo6aG55pWw5o2uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBmcmFtZUxvYWRJdGVtPFQ+KGl0ZW1zRGF0YTogVFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZXhlY0dlbmVyYXRvckl0ZW0odGhpcy5tYWtlR2VuZXJhdG9ySXRlbShpdGVtc0RhdGEpLCBFWEVDX0dFTkVSQVRPUl9USU1FKTtcbiAgICAgICAgdGhpcy5zZXRSZW5kZXJpbmcoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOebtOaOpeWKoOi9vVxuICAgICAqIEBwYXJhbSBpdGVtc0RhdGEge2l0ZW1zRGF0YTogVFtdfSDliJfooajpobnmlbDmja5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRpcmVjdExvYWRJdGVtPFQ+KGl0ZW1zRGF0YTogVFtdKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtc0RhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMubWFrZUl0ZW0oaXRlbXNEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluW3pui+uee8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdExlZnQoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueCAtPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluWPs+i+uee8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdFJpZ2h0KCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnggKz0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5bpobbpg6jnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RUb3AoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueSArPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blupXpg6jnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RCb3R0b20oKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueSAtPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blt6blj7PnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RMZWZ0UmlnaHQoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueCAtPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoICogMywgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5bkuIrkuIvnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RUb3BCb3R0b20oKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueSAtPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQgKiAzKTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5Lit6Ze05Y+v6KeG55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0VmlzaWJsZVJlY3RDZW50ZXIoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blrZDpobnliJfooajnmoTnn6nlvaLlpKflsI9cbiAgICAvLyAgKiBAcGFyYW0gaXRlbXMge1Njcm9sbFZpZXdJbnRlcmZhY2UuSXRlbURhdGFbXX0g5a2Q6aG55YiX6KGoXG4gICAgLy8gICogQHJldHVybnMge2NjLlNpemV9XG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRJdGVtc1JlY3RTaXplKGl0ZW1zOiBTY3JvbGxWaWV3SW50ZXJmYWNlLkl0ZW1EYXRhW10pOiBjYy5TaXplIHtcbiAgICAvLyAgICAgbGV0IHJlY3RTaXplOiBjYy5TaXplID0gbmV3IGNjLlNpemUoMCwgMCk7XG5cbiAgICAvLyAgICAgaWYgKGl0ZW1zKSB7XG4gICAgLy8gICAgICAgICBpZiAoIShpdGVtcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIC8vICAgICAgICAgICAgIGl0ZW1zID0gW10uY29uY2F0KGl0ZW1zKTtcbiAgICAvLyAgICAgICAgIH1cblxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGl0ZW06IFNjcm9sbFZpZXdJbnRlcmZhY2UuSXRlbURhdGEgPSBpdGVtc1tpXTtcbiAgICAvLyAgICAgICAgICAgICByZWN0U2l6ZS53aWR0aCArPSBpdGVtLnByZWZhYi5kYXRhLndpZHRoO1xuICAgIC8vICAgICAgICAgICAgIHJlY3RTaXplLmhlaWdodCArPSBpdGVtLnByZWZhYi5kYXRhLmhlaWdodDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIHJldHVybiByZWN0U2l6ZTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bovrnot51cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDovrnot51cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFBhZGRpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHBhZGRpbmc6IG51bWJlciA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgcGFkZGluZyArPSB0aGlzLmxlZnQgKyB0aGlzLnJpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgcGFkZGluZyArPSB0aGlzLnRvcCArIHRoaXMuYm90dG9tO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYWRkaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumXtOi3nVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IOmXtOi3nVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U3BhY2luZygpOiBudW1iZXIge1xuICAgICAgICBsZXQgc3BhY2luZzogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBzcGFjaW5nID0gdGhpcy5zcGFjaW5nWDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHNwYWNpbmcgPSB0aGlzLnNwYWNpbmdZO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFjaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWGheWuueWZqOmihOS8sOWkp+Wwj1xuICAgICAqIEByZXR1cm5zIHtjYy5TaXplfSDlhoXlrrnlmajpooTkvLDlpKflsI9cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SW5uZXJFc3RpbWF0ZVNpemUoKTogY2MuU2l6ZSB7XG4gICAgICAgIGxldCBzaXplOiBjYy5TaXplID0gdGhpcy5jb250ZW50LnBhcmVudC5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHNpemUud2lkdGggPSB0aGlzLmdldFBhZGRpbmcoKSArICh0aGlzLmdldFNwYWNpbmcoKSAqICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIC0gMSkpICsgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCk7XG4gICAgICAgICAgICBpZiAoc2l6ZS53aWR0aCA8IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICBzaXplLndpZHRoID0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gdGhpcy5nZXRQYWRkaW5nKCkgKyAodGhpcy5nZXRTcGFjaW5nKCkgKiAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCAtIDEpKSArICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoICogdGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0KTtcbiAgICAgICAgICAgIGlmIChzaXplLmhlaWdodCA8IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG9uU2Nyb2xsVG9Ub3AodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICBpZiAoIXRoaXMuaXNQYWdpbmcpIHtcbiAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIGlmICh0aGlzLnB1bGxUb3BFdmVudEhhbmRsZXIpIHtcbiAgICAvLyAgICAgICAgIHRoaXMucHVsbFRvcEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxUb0JvdHRvbSh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKHRoaXMucHVsbEJvdHRvbUV2ZW50SGFuZGxlcikge1xuICAgIC8vICAgICAgICAgdGhpcy5wdWxsQm90dG9tRXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbFRvTGVmdCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKHRoaXMucHVsbExlZnRFdmVudEhhbmRsZXIpIHtcbiAgICAvLyAgICAgICAgIHRoaXMucHVsbExlZnRFdmVudEhhbmRsZXIuZW1pdChbdGFyZ2V0XSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uU2Nyb2xsVG9SaWdodCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKHRoaXMucHVsbFJpZ2h0RXZlbnRIYW5kbGVyKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnB1bGxSaWdodEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxpbmcodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICAvLyBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQ7ICsraSkge1xuICAgIC8vICAgICAvLyAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldO1xuICAgIC8vICAgICAvLyAgICAgbGV0IGl0ZW1SZWN0OiBjYy5SZWN0ID0gaXRlbU5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XG5cbiAgICAvLyAgICAgLy8gICAgIGlmIChpdGVtUmVjdC5pbnRlcnNlY3RzKHRoaXMubV9jYWNoZVJlY3QpKSB7XG5cbiAgICAvLyAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgIC8vICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgLy8gICAgIC8vICAgICAgICAgICAgIGlmIChpdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKS54ID4gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpLngpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgICAgIC0tdGhpcy5tX2xhc3RJbmRleDtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAvLyAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgLy8gICAgIC8vICAgICAgICAgICAgIGlmIChpdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKS55IDwgdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpLngpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgICAgIC0tdGhpcy5tX2xhc3RJbmRleDtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgLy8gICAgICAgICB0aGlzLnB1dE5vZGUoaXRlbU5vZGUpO1xuICAgIC8vICAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIC8vIH1cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiU2Nyb2xsaW5nXCIsIHRhcmdldCk7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvbkJvdW5jZUJvdHRvbSh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlQm90dG9tXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Cb3VuY2VUb3AodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICBpZiAoIXRoaXMuYnJha2UpIHtcbiAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIC8vIEcuTG9nTWdyLmxvZyhcIkJvdW5jZVRvcFwiKTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uQm91bmNlTGVmdCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlTGVmdFwiKTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uQm91bmNlUmlnaHQodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICBpZiAoIXRoaXMuYnJha2UpIHtcbiAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIC8vIEcuTG9nTWdyLmxvZyhcIkJvdW5jZVJpZ2h0XCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxFbmRlZCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIC8vIEcuTG9nTWdyLmxvZyhcIlNjcm9sbEVuZGVkXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Ub3VjaFVwKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiVG91Y2hVcFwiKTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uU2Nyb2xsQmVnYW4odGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJTY3JvbGxCZWdhblwiKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3muLLmn5PlrozmiJAg5Zue6LCDXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblJlbmRlcmVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUNhY2hlRGF0YUxpc3QoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrSXRlbTxUPihub2RlOiBjYy5Ob2RlLCBkYXRhOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyLmVtaXQoW25vZGUsIGRhdGFdKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMudW5yZWdpc3RlcigpO1xuICAgIH1cblxufVxuIl19