
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/component/WingoMyRecordListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '403857P/wNA14PeMjWL/1ca', 'WingoMyRecordListView');
// games/wingo/script/component/WingoMyRecordListView.ts

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
let WingoMyRecordListView = class WingoMyRecordListView extends cc.Component {
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
        // 原始高度
        this._originSize = null;
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
                this.remove(0);
                return;
            }
            else {
                itemsData = itemsData.slice(-WingoDefine_1.WingoDefine.HISTORY_COUNT);
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
        if (this._itemDataList.length <= 0 && this.content.childrenCount <= 0) {
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
        this._originSize = this.node.getContentSize();
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
        if (this._itemDataList.length <= 0) {
            size = this._originSize;
        }
        else {
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
        }
        return size;
    }
    initInnerSize() {
        this.content.setContentSize(this._originSize);
        this.node.setContentSize(this._originSize);
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
], WingoMyRecordListView.prototype, "content", void 0);
__decorate([
    property({ type: cc.Prefab, tooltip: "列表项预制" })
], WingoMyRecordListView.prototype, "itemPrefab", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.ListViewLoadMode), tooltip: "加载模式\nNONE 直接加载\nFRAME 分帧加载\nENDLESS 无限加载" })
], WingoMyRecordListView.prototype, "mode", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.DirectionType), tooltip: "滑动方向\nHORIZONTAL 水平\nVERTICAL 垂直" })
], WingoMyRecordListView.prototype, "direction", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "垂直间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoMyRecordListView.prototype, "spacingY", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "顶间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoMyRecordListView.prototype, "top", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "底间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoMyRecordListView.prototype, "bottom", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "水平间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoMyRecordListView.prototype, "spacingX", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "左间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoMyRecordListView.prototype, "left", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "右间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoMyRecordListView.prototype, "right", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "点击列表项回调", visible: true })
], WingoMyRecordListView.prototype, "clickItemEventHandler", void 0);
WingoMyRecordListView = __decorate([
    ccclass
], WingoMyRecordListView);
exports.default = WingoMyRecordListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvY29tcG9uZW50L1dpbmdvTXlSZWNvcmRMaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrR0FBb0Y7QUFFcEYsMEZBQWtFO0FBQ2xFLHVEQUFvRDtBQUVwRCxxQkFBcUI7QUFDckIsTUFBTSxtQkFBbUIsR0FBVyxDQUFDLENBQUM7QUFFdEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxFQUFFLENBQUMsU0FBUztJQUEvRDtRQUVJLG1DQUFtQztRQUNuQyxxQ0FBcUM7O1FBRXJDLG9MQUFvTDtRQUNwTCw2RkFBNkY7UUFFN0Ysb0xBQW9MO1FBQ3BMLDhGQUE4RjtRQUU5RixrTEFBa0w7UUFDbEwsNEZBQTRGO1FBRTVGLGtMQUFrTDtRQUNsTCwrRkFBK0Y7UUFFL0YsNEdBQTRHO1FBQzVHLCtDQUErQztRQUd2QyxZQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGVBQVUsR0FBYyxJQUFJLENBQUM7UUFHOUIsU0FBSSxHQUFxQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBRzlFLGNBQVMsR0FBa0MsZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFFMUYsd0lBQXdJO1FBQ3hJLCtCQUErQjtRQUUvQixnR0FBZ0c7UUFDaEcsd0NBQXdDO1FBR2hDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUdoQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBR25CLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUdqQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBR2xCLDBCQUFxQixH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b21wb25lbnREZWZpbmUgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vZGVmaW5lL0NvbXBvbmVudERlZmluZVwiO1xuaW1wb3J0ICogYXMgQ29tcG9uZW50SW50ZXJmYWNlIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2ludGVyZmFjZS9Db21wb25lbnRJbnRlcmZhY2VcIjtcbmltcG9ydCBUeXBlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvVHlwZVV0aWxzXCI7XG5pbXBvcnQgeyBXaW5nb0RlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvV2luZ29EZWZpbmVcIjtcblxuLy8g5q+P5qyh5omn6KGM5Y2P56iL5YiG6YWN55qE5pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG5jb25zdCBFWEVDX0dFTkVSQVRPUl9USU1FOiBudW1iZXIgPSA4O1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZ29NeVJlY29yZExpc3RWaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm5YiG6aG15Yqg6L29XCIgfSlcbiAgICAvLyBwcml2YXRlIGlzUGFnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuW3pui+ueaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIC8vIHByaXZhdGUgcHVsbExlZnRFdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLlj7Povrnmi4nlj5blm57osINcIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaXNQYWdpbmcgJiYgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICAvLyBwcml2YXRlIHB1bGxSaWdodEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIumhtumDqOaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICAvLyBwcml2YXRlIHB1bGxUb3BFdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLlupXpg6jmi4nlj5blm57osINcIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaXNQYWdpbmcgJiYgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMIH0pIH0pXG4gICAgLy8gcHJpdmF0ZSBwdWxsQm90dG9tRXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZUZyYW1lLCB0b29sdGlwOiBcIuWIt+aWsOaLieWPluetieW+heWbvueJh1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyB9KSB9KVxuICAgIC8vIHByaXZhdGUgd2FpdGluZ0ltYWdlOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuWIl+ihqOmhuemihOWItlwiIH0pXG4gICAgcHJpdmF0ZSBpdGVtUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZSksIHRvb2x0aXA6IFwi5Yqg6L295qih5byPXFxuTk9ORSDnm7TmjqXliqDovb1cXG5GUkFNRSDliIbluKfliqDovb1cXG5FTkRMRVNTIOaXoOmZkOWKoOi9vVwiIH0pXG4gICAgcHVibGljIG1vZGU6IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlID0gQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUuTk9ORTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUpLCB0b29sdGlwOiBcIua7keWKqOaWueWQkVxcbkhPUklaT05UQUwg5rC05bmzXFxuVkVSVElDQUwg5Z6C55u0XCIgfSlcbiAgICBwcml2YXRlIGRpcmVjdGlvbjogQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUgPSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIua7muWKqOS5i+WQjueahOWHj+mAn+ezu+aVsOOAguWPluWAvOiMg+WbtOaYryAwLTHvvIzlpoLmnpzmmK8gMSDliJnnq4vpqazlgZzmraLmu5rliqjvvIzlpoLmnpzmmK8gMO+8jOWImeS8muS4gOebtOa7muWKqOWIsCBjb250ZW50IOeahOi+ueeVjOOAglwiLCBvdmVycmlkZTogdHJ1ZSwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIC8vIHB1YmxpYyBicmFrZTogbnVtYmVyID0gMC43NTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuWbnuW8ueaJgOmcgOimgeeahOaXtumXtOOAguWPluWAvOiMg+WbtOaYryAwLTEw44CCXCIsIG92ZXJyaWRlOiB0cnVlLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgLy8gcHVibGljIGJvdW5jZUR1cmF0aW9uOiBudW1iZXIgPSAwLjIzO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Z6C55u06Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICBwcml2YXRlIHNwYWNpbmdZOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi6aG26Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICBwcml2YXRlIHRvcDogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuW6lemXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMIH0pIH0pXG4gICAgcHJpdmF0ZSBib3R0b206IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLmsLTlubPpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgcHJpdmF0ZSBzcGFjaW5nWDogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuW3pumXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwgfSkgfSlcbiAgICBwcml2YXRlIGxlZnQ6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlj7Ppl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgcHJpdmF0ZSByaWdodDogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi54K55Ye75YiX6KGo6aG55Zue6LCDXCIsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIGNsaWNrSXRlbUV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICAvLyDmmK/lkKbliqDovb3lrozmiJBcbiAgICBwcml2YXRlIF9pc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIOaVsOaNruWIl+ihqFxuICAgIHByaXZhdGUgX2l0ZW1EYXRhTGlzdDogdW5rbm93bltdID0gW107XG4gICAgLy8g5YiX6KGo6aG56IqC54K55rGgXG4gICAgcHJpdmF0ZSBfaXRlbU5vZGVQb29sOiBjYy5Ob2RlUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgIC8vIOacgOWQjuiKgueCueS9jee9rlxuICAgIHByaXZhdGUgX2xhc3RQb3M6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcbiAgICAvLyDmuLLmn5PliJfooajpobnotbflp4vkuIvmoIdcbiAgICBwcml2YXRlIF9yZW5kZXJJdGVtU3RhcnRJbmRleDogbnVtYmVyID0gbnVsbDtcbiAgICAvLyDmuLLmn5PliJfooajpobnnu5PmnZ/kuIvmoIdcbiAgICBwcml2YXRlIF9yZW5kZXJJdGVtRW5kSW5kZXg6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5piv5ZCm5riy5p+T5LitXG4gICAgcHJpdmF0ZSBfaXNSZW5kZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyDnvJPlrZjliJfooahcbiAgICBwcml2YXRlIF9pdGVtQ2FjaGVEYXRhTGlzdDogdW5rbm93bltdID0gW107XG4gICAgLy8g5riy5p+T5Lit5pON5L2c5qyh5pWwXG4gICAgcHJpdmF0ZSBfcmVuZGVyaW5nT3BlcmF0ZUNvdW50OiBudW1iZXIgPSAwO1xuICAgIC8vIOe8k+WtmOa4suafk+WIl+ihqOmhuei1t+Wni+S4i+agh1xuICAgIHByaXZhdGUgX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXg6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5Y6f5aeL6auY5bqmXG4gICAgcHJpdmF0ZSBfb3JpZ2luU2l6ZTogY2MuU2l6ZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDkv67mlLnmlrnlkJHnsbvlnovlsZ7mgKdcbiAgICAgKiBAcGFyYW0gdmFsdWUge0NvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlfSDmlrnlkJHnsbvlnotcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZURpcmVjdGlvbih2YWx1ZTogQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUpOiB2b2lkIHtcbiAgICAgICAgLy8gdGhpcy5ob3Jpem9udGFsID0gdmFsdWUgPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUw7XG4gICAgICAgIC8vIHRoaXMudmVydGljYWwgPSB2YWx1ZSA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUw7XG5cbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInRvcFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImJvdHRvbVwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInNwYWNpbmdZXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwidmVydGljYWxTY3JvbGxCYXJcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJsZWZ0XCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCk7XG4gICAgICAgIC8vIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJyaWdodFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgICAgICAvLyBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwic3BhY2luZ1hcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgLy8gY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImhvcml6b250YWxTY3JvbGxCYXJcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7poblcbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtUIHwgVFtdfSDmlbDmja585pWw5o2u5YiX6KGoXG4gICAgICovXG4gICAgcHVibGljIHNldDxUPihpdGVtc0RhdGE6IFQgfCBUW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbXNEYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc0FycmF5KGl0ZW1zRGF0YSkpIHtcbiAgICAgICAgICAgIGlmICgoaXRlbXNEYXRhIGFzIEFycmF5PFQ+KS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKDApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbXNEYXRhID0gKGl0ZW1zRGF0YSBhcyBBcnJheTxUPikuc2xpY2UoLVdpbmdvRGVmaW5lLkhJU1RPUllfQ09VTlQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEodGhpcy5faXRlbUNhY2hlRGF0YUxpc3QsIGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgICsrdGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX2l0ZW1EYXRhTGlzdCwgaXRlbXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7mlbDmja7poblcbiAgICAgKiBAcGFyYW0gZGF0YUxpc3Qge1RbXX0g6K6+572u5YiX6KGoXG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXREYXRhPFQ+KGRhdGFMaXN0OiBUW10sIGl0ZW1zRGF0YTogVCB8IFRbXSk6IHZvaWQge1xuICAgICAgICBkYXRhTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmluc2VydERhdGEoZGF0YUxpc3QsIGl0ZW1zRGF0YSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+S5YWl6aG5XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7VCB8IFRbXX0g5pWw5o2ufOaVsOaNruWIl+ihqFxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSDkuIvmoIfvvIjpu5jorqTvvJrmnIDlkI7mj5LlhaXvvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5zZXJ0PFQ+KGl0ZW1zRGF0YTogVCB8IFRbXSwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbXNEYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc0FycmF5KGl0ZW1zRGF0YSkgJiYgKGl0ZW1zRGF0YSBhcyBBcnJheTxUPikubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhTGlzdDogdW5rbm93bltdID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyaW5nT3BlcmF0ZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCA9IFtdLmNvbmNhdCh0aGlzLl9pdGVtRGF0YUxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5faXRlbURhdGFMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID4gZGF0YUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGF0YShkYXRhTGlzdCwgaXRlbXNEYXRhLCBpbmRleCk7XG4gICAgICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKyt0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydERhdGEoZGF0YUxpc3QsIGl0ZW1zRGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaPkuWFpeaVsOaNrumhuVxuICAgICAqIEBwYXJhbSBkYXRhTGlzdCB7VFtdfSDmj5LlhaXliJfooahcbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtUIHwgVFtdfSDmlbDmja585pWw5o2u5YiX6KGoXG4gICAgICogQHBhcmFtIGluZGV4IHtudW1iZXJ9IOS4i+agh1xuICAgICAqL1xuICAgIHB1YmxpYyBpbnNlcnREYXRhPFQ+KGRhdGFMaXN0OiBUW10sIGl0ZW1zRGF0YTogVCB8IFRbXSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtc0RhdGEpKSB7XG4gICAgICAgICAgICBsZXQgc3BsaWNlUGFyYW06IHVua25vd25bXSA9IFtpbmRleCwgMF07XG4gICAgICAgICAgICBzcGxpY2VQYXJhbSA9IHNwbGljZVBhcmFtLmNvbmNhdChpdGVtc0RhdGEpO1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlLmFwcGx5KGRhdGFMaXN0LCBzcGxpY2VQYXJhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGl0ZW1zRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKDpmaTpoblcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn0g5LiL5qCH77yI6ZyA6KaB5Yig6Zmk55qE5LiL5qCH77yJXG4gICAgICogQHBhcmFtIGNvdW50IHtudW1iZXJ9IOaVsOmHj++8iOWIoOmZpOS4i+agh+WQjueahOaVsOmHj++8iVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmUoaW5kZXg/OiBudW1iZXIsIGNvdW50PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIDw9IDAgJiYgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFMaXN0OiB1bmtub3duW10gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNSZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0ID0gW10uY29uY2F0KHRoaXMuX2l0ZW1EYXRhTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhTGlzdCA9IHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9pdGVtRGF0YUxpc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpbmRleCkgJiYgVHlwZVV0aWxzLmlzTnVsbChjb3VudCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGNvdW50ID0gZGF0YUxpc3QubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGRhdGFMaXN0Lmxlbmd0aCAtIGNvdW50O1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBjb3VudCA9IGRhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGNvdW50KSkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPj0gZGF0YUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBkYXRhTGlzdC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnQgPSBkYXRhTGlzdC5sZW5ndGggLSBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1JlbmRlcmluZykge1xuICAgICAgICAgICAgZGF0YUxpc3Quc3BsaWNlKGluZGV4LCBjb3VudCk7XG4gICAgICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVuZGVySXRlbVN0YXJ0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKyt0aGlzLl9yZW5kZXJpbmdPcGVyYXRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhTGlzdC5zcGxpY2UoaW5kZXgsIGNvdW50KTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtRW5kSW5kZXggPSBNYXRoLm1heCh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoLCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3ZlKDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDaGlsZE5vZGUoc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleDogbnVtYmVyKTogY2MuTm9kZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jaGlsZHJlbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yi35paw5YiX6KGo6aG5XG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVMaXN0SXRlbSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0xvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRSZW5kZXJpbmcodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHNpemU6IGNjLlNpemUgPSB0aGlzLmdldElubmVyRXN0aW1hdGVTaXplKCk7XG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShzaXplKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNldENvbnRlbnRTaXplKHNpemUpO1xuICAgICAgICB0aGlzLmNvbnRlbnQueSA9IHNpemUuaGVpZ2h0ICogMC41O1xuICAgICAgICB0aGlzLmNvbnRlbnQucGFyZW50LnNldENvbnRlbnRTaXplKHNpemUpO1xuICAgICAgICB0aGlzLmNvbnRlbnQucGFyZW50LnkgPSAtKHNpemUuaGVpZ2h0ICogMC41KTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5FTkRMRVNTKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwdXRJbmRleExpc3Q6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBsZXQgaXNGcmFtZUxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4OyBpIDwgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4OyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1EYXRhOiB1bmtub3duID0gdGhpcy5faXRlbURhdGFMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFUeXBlVXRpbHMuaXNOdWxsKGl0ZW1Ob2RlKSAmJiB0aGlzLl9pdGVtRGF0YUxpc3QuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5ub2RlLm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja0l0ZW0uYmluZCh0aGlzLCBpdGVtTm9kZSwgaXRlbURhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVNyYzogQ29tcG9uZW50SW50ZXJmYWNlLkxpc3RWaWV3SXRlbUNsYXNzID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGl0ZW1Ob2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtU3JjLm9uU2hvdyAmJiBpdGVtU3JjLm9uU2hvdyhpdGVtRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUeXBlVXRpbHMuaXNOdWxsKGl0ZW1Ob2RlKSAmJiAhdGhpcy5faXRlbURhdGFMaXN0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2l0ZW1EYXRhTGlzdC5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICBwdXRJbmRleExpc3QucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFR5cGVVdGlscy5pc051bGwoaXRlbU5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtc0RhdGE6IHVua25vd25bXSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShpLCB0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoKTs7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENvbXBvbmVudERlZmluZS5MaXN0Vmlld0xvYWRNb2RlLkZSQU1FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZVBvb2xTaXplOiBudW1iZXIgPSB0aGlzLl9pdGVtTm9kZVBvb2wuc2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVQb29sU2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0TG9hZEVuZEluZGV4OiBudW1iZXIgPSBpICsgbm9kZVBvb2xTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zRGF0YSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShpLCBkaXJlY3RMb2FkRW5kSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0TG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0TG9hZEVuZEluZGV4IDwgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zRGF0YSA9IHRoaXMuX2l0ZW1EYXRhTGlzdC5zbGljZShkaXJlY3RMb2FkRW5kSW5kZXgsIHRoaXMuX3JlbmRlckl0ZW1FbmRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVMb2FkSXRlbShpdGVtc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZyYW1lTG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lTG9hZEl0ZW0oaXRlbXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZyYW1lTG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSBDb21wb25lbnREZWZpbmUuTGlzdFZpZXdMb2FkTW9kZS5OT05FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdExvYWRJdGVtKGl0ZW1zRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBwdXRJbmRleExpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bcHV0SW5kZXhMaXN0W2ldXTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dE5vZGUoaXRlbU5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzRnJhbWVMb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSZW5kZXJpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yi35paw57yT5a2Y5pWw5o2u5YiX6KGo6aG5XG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVDYWNoZURhdGFMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldERhdGEodGhpcy5faXRlbURhdGFMaXN0LCB0aGlzLl9pdGVtQ2FjaGVEYXRhTGlzdCk7XG4gICAgICAgIHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3JlbmRlckl0ZW1TdGFydEluZGV4ID0gdGhpcy5fY2FjaGVSZW5kZXJJdGVtU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fcmVuZGVySXRlbUVuZEluZGV4ID0gTWF0aC5tYXgodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9vcmlnaW5TaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLXRvcFwiLCB0aGlzLm9uU2Nyb2xsVG9Ub3AsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxUb0JvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcInNjcm9sbC10by1sZWZ0XCIsIHRoaXMub25TY3JvbGxUb0xlZnQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vblNjcm9sbFRvUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImJvdW5jZS1ib3R0b21cIiwgdGhpcy5vbkJvdW5jZUJvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImJvdW5jZS10b3BcIiwgdGhpcy5vbkJvdW5jZVRvcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihcImJvdW5jZS1sZWZ0XCIsIHRoaXMub25Cb3VuY2VMZWZ0LCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25Cb3VuY2VSaWdodCwgdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMub25TY3JvbGxpbmcsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKFwidG91Y2gtdXBcIiwgdGhpcy5vblRvdWNoVXAsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJzY3JvbGwtYmVnYW5cIiwgdGhpcy5vblNjcm9sbEJlZ2FuLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVucmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tdG9wXCIsIHRoaXMub25TY3JvbGxUb1RvcCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxUb0JvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tbGVmdFwiLCB0aGlzLm9uU2Nyb2xsVG9MZWZ0LCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uU2Nyb2xsVG9SaWdodCwgdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcImJvdW5jZS1ib3R0b21cIiwgdGhpcy5vbkJvdW5jZUJvdHRvbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoXCJib3VuY2UtdG9wXCIsIHRoaXMub25Cb3VuY2VUb3AsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLWxlZnRcIiwgdGhpcy5vbkJvdW5jZUxlZnQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25Cb3VuY2VSaWdodCwgdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsaW5nLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihcInNjcm9sbC1lbmRlZFwiLCB0aGlzLm9uU2Nyb2xsRW5kZWQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwidG91Y2gtdXBcIiwgdGhpcy5vblRvdWNoVXAsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLWJlZ2FuXCIsIHRoaXMub25TY3JvbGxCZWdhbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvb2xOb2RlQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5hbmNob3JYID09PSAwLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFuY2hvclggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueCA9IHRoaXMuY29udGVudC54IC0gKHRoaXMuY29udGVudC53aWR0aCAqIDAuNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hbmNob3JZID0gMC41O1xuICAgICAgICAgICAgICAgIHBvb2xOb2RlQ291bnQgPSBNYXRoLmNlaWwoKHRoaXMubm9kZS53aWR0aCAtIHRoaXMuc3BhY2luZ1gpIC8gKHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoICsgdGhpcy5zcGFjaW5nWCkpICsgMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUw6IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmFuY2hvclkgPT09IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYW5jaG9yWSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC55ID0gdGhpcy5jb250ZW50LnkgKyAodGhpcy5jb250ZW50LmhlaWdodCAqIDAuNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hbmNob3JYID0gMC41O1xuICAgICAgICAgICAgICAgIHBvb2xOb2RlQ291bnQgPSBNYXRoLmNlaWwoKHRoaXMubm9kZS5oZWlnaHQgLSB0aGlzLnNwYWNpbmdZKSAvICh0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQgKyB0aGlzLnNwYWNpbmdZKSkgKyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gQ29tcG9uZW50RGVmaW5lLkxpc3RWaWV3TG9hZE1vZGUuRU5ETEVTUykge1xuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHBvb2xOb2RlQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHV0Tm9kZSh0aGlzLmdldE5vZGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rua4suafk+S4reeKtuaAgVxuICAgICAqIEBwYXJhbSBpc1JlbmRlcmluZyB7Ym9vbGVhbn0g5piv5ZCm5q2j5Zyo5riy5p+T6aG5XG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRSZW5kZXJpbmcoaXNSZW5kZXJpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNSZW5kZXJpbmcgPSBpc1JlbmRlcmluZztcbiAgICAgICAgaWYgKCFpc1JlbmRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5vblJlbmRlcmVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bliJfooajpobnoioLngrlcbiAgICAgKiBAcmV0dXJucyB7Y2MuTm9kZX0g6IqC54K5XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXROb2RlKCk6IGNjLk5vZGUgfCBudWxsIHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1QcmVmYWIpIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLmVycm9yKGDor7flnKggTGlzdFZpZXcg5re75Yqg6aKE5Yi26aG5IHByZWZhYmApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IHRoaXMuX2l0ZW1Ob2RlUG9vbC5nZXQoKTtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJlZmFiKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbjogY2MuQnV0dG9uID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBpZiAoIWJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBidXR0b24gPSBub2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUvuWFpeWIl+ihqOmhueiKgueCuVxuICAgICAqIEBwYXJhbSBub2RlIHtjYy5Ob2RlfSDoioLngrlcbiAgICAgKi9cbiAgICBwcml2YXRlIHB1dE5vZGUobm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZS5uYW1lICE9PSB0aGlzLml0ZW1QcmVmYWIuZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci53YXJuKGDor7fkuI3opoHmlL7lhaXkuI4gJHtub2RlLm5hbWV9IOS4jeebuOWFs+eahOiKgueCuWApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuXG4gICAgICAgIGxldCBzcmM6IENvbXBvbmVudEludGVyZmFjZS5MaXN0Vmlld0l0ZW1DbGFzcyA9IG5vZGUuZ2V0Q29tcG9uZW50KG5vZGUubmFtZSk7XG4gICAgICAgIHNyYy5yZXNldCgpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1Ob2RlUG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb3Mobm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5uZXJDb3VudDogbnVtYmVyID0gdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQgLSAxO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24odGhpcy5sZWZ0ICsgKHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoICogMC41KSArIChpbm5lckNvdW50ICogdGhpcy5pdGVtUHJlZmFiLmRhdGEud2lkdGgpICsgKGlubmVyQ291bnQgKiB0aGlzLnNwYWNpbmdYKSwgMCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDAgLSB0aGlzLnRvcCAtICh0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQgKiAwLjUpIC0gKGlubmVyQ291bnQgKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQpIC0gKGlubmVyQ291bnQgKiB0aGlzLnNwYWNpbmdZKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnlJ/kuqfliJfooajpoblcbiAgICAgKiBAcGFyYW0gaXRlbURhdGEge1R9IOazm+Wei+aVsOaNrlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZUl0ZW08VD4oaXRlbURhdGE6IFQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5nZXROb2RlKCk7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtTm9kZSk7XG4gICAgICAgIGxldCBpdGVtU3JjOiBDb21wb25lbnRJbnRlcmZhY2UuTGlzdFZpZXdJdGVtQ2xhc3MgPSBpdGVtTm9kZS5nZXRDb21wb25lbnQoaXRlbU5vZGUubmFtZSk7XG4gICAgICAgIGlmIChpdGVtU3JjICYmICFUeXBlVXRpbHMuaXNOdWxsKGl0ZW1EYXRhKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tJdGVtRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja0l0ZW0uYmluZCh0aGlzLCBpdGVtTm9kZSwgaXRlbURhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW1TcmMub25TaG93ICYmIGl0ZW1TcmMub25TaG93KGl0ZW1EYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb3MoaXRlbU5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgKm1ha2VHZW5lcmF0b3JJdGVtPFQ+KGl0ZW1zRGF0YTogVFtdKTogR2VuZXJhdG9yIHtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGl0ZW1zRGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgeWllbGQgdGhpcy5tYWtlSXRlbShpdGVtc0RhdGFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omn6KGM5Y2P56iL5Yqg6L295YiX6KGo6aG5XG4gICAgICogQHBhcmFtIGdlbmVyYXRvciB7R2VuZXJhdG9yfSDljY/nqItcbiAgICAgKiBAcGFyYW0gZHVyYXRpb24ge251bWJlcn0g5q+P5qyh5Y2P56iL5Y2g55So5pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBleGVjR2VuZXJhdG9ySXRlbShnZW5lcmF0b3I6IEdlbmVyYXRvciwgZHVyYXRpb246IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6ICh2YWx1ZTogdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBleGVjOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVyYXRvciA9IGdlbmVyYXRvci5uZXh0KCk7IDsgaXRlcmF0b3IgPSBnZW5lcmF0b3IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRvciA9PSBudWxsIHx8IGl0ZXJhdG9yLmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydFRpbWUgPiBkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4ZWMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YiG5bin5Yqg6L29XG4gICAgICogQHBhcmFtIGl0ZW1zRGF0YSB7aXRlbXNEYXRhOiBUW119IOWIl+ihqOmhueaVsOaNrlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZnJhbWVMb2FkSXRlbTxUPihpdGVtc0RhdGE6IFRbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLmV4ZWNHZW5lcmF0b3JJdGVtKHRoaXMubWFrZUdlbmVyYXRvckl0ZW0oaXRlbXNEYXRhKSwgRVhFQ19HRU5FUkFUT1JfVElNRSk7XG4gICAgICAgIHRoaXMuc2V0UmVuZGVyaW5nKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnm7TmjqXliqDovb1cbiAgICAgKiBAcGFyYW0gaXRlbXNEYXRhIHtpdGVtc0RhdGE6IFRbXX0g5YiX6KGo6aG55pWw5o2uXG4gICAgICovXG4gICAgcHJpdmF0ZSBkaXJlY3RMb2FkSXRlbTxUPihpdGVtc0RhdGE6IFRbXSk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbXNEYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VJdGVtKGl0ZW1zRGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blt6bovrnnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RMZWZ0KCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnggLT0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blj7PovrnnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RSaWdodCgpOiBjYy5SZWN0IHtcbiAgICAvLyAgICAgbGV0IHJlY3Q6IGNjLlJlY3QgPSBudWxsO1xuICAgIC8vICAgICBsZXQgcG9pbnQ6IGNjLlZlYzIgPSB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpO1xuICAgIC8vICAgICBwb2ludC54ICs9IHRoaXMuY29udGVudC5wYXJlbnQud2lkdGg7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W6aG26YOo57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0VG9wKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnkgKz0gdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQ7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5bqV6YOo57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0Qm90dG9tKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnkgLT0gdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQ7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5bem5Y+z57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0TGVmdFJpZ2h0KCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnggLT0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCAqIDMsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5LiK5LiL57yT5a2Y55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0Q2FjaGVSZWN0VG9wQm90dG9tKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnkgLT0gdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQ7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0ICogMyk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluS4remXtOWPr+inhuefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldFZpc2libGVSZWN0Q2VudGVyKCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHJlY3QgPSBjYy5yZWN0KHBvaW50LngsIHBvaW50LnksIHRoaXMuY29udGVudC5wYXJlbnQud2lkdGgsIHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5a2Q6aG55YiX6KGo55qE55+p5b2i5aSn5bCPXG4gICAgLy8gICogQHBhcmFtIGl0ZW1zIHtTY3JvbGxWaWV3SW50ZXJmYWNlLkl0ZW1EYXRhW119IOWtkOmhueWIl+ihqFxuICAgIC8vICAqIEByZXR1cm5zIHtjYy5TaXplfVxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0SXRlbXNSZWN0U2l6ZShpdGVtczogU2Nyb2xsVmlld0ludGVyZmFjZS5JdGVtRGF0YVtdKTogY2MuU2l6ZSB7XG4gICAgLy8gICAgIGxldCByZWN0U2l6ZTogY2MuU2l6ZSA9IG5ldyBjYy5TaXplKDAsIDApO1xuXG4gICAgLy8gICAgIGlmIChpdGVtcykge1xuICAgIC8vICAgICAgICAgaWYgKCEoaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAvLyAgICAgICAgICAgICBpdGVtcyA9IFtdLmNvbmNhdChpdGVtcyk7XG4gICAgLy8gICAgICAgICB9XG5cbiAgICAvLyAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIC8vICAgICAgICAgICAgIGxldCBpdGVtOiBTY3JvbGxWaWV3SW50ZXJmYWNlLkl0ZW1EYXRhID0gaXRlbXNbaV07XG4gICAgLy8gICAgICAgICAgICAgcmVjdFNpemUud2lkdGggKz0gaXRlbS5wcmVmYWIuZGF0YS53aWR0aDtcbiAgICAvLyAgICAgICAgICAgICByZWN0U2l6ZS5oZWlnaHQgKz0gaXRlbS5wcmVmYWIuZGF0YS5oZWlnaHQ7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICByZXR1cm4gcmVjdFNpemU7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6L656LedXG4gICAgICogQHJldHVybnMge251bWJlcn0g6L656LedXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRQYWRkaW5nKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBwYWRkaW5nOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHBhZGRpbmcgKz0gdGhpcy5sZWZ0ICsgdGhpcy5yaWdodDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHBhZGRpbmcgKz0gdGhpcy50b3AgKyB0aGlzLmJvdHRvbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFkZGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bpl7Tot51cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDpl7Tot51cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFNwYWNpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHNwYWNpbmc6IG51bWJlciA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgc3BhY2luZyA9IHRoaXMuc3BhY2luZ1g7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBzcGFjaW5nID0gdGhpcy5zcGFjaW5nWTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhY2luZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blhoXlrrnlmajpooTkvLDlpKflsI9cbiAgICAgKiBAcmV0dXJucyB7Y2MuU2l6ZX0g5YaF5a655Zmo6aKE5Lyw5aSn5bCPXG4gICAgICovXG4gICAgcHVibGljIGdldElubmVyRXN0aW1hdGVTaXplKCk6IGNjLlNpemUge1xuICAgICAgICBsZXQgc2l6ZTogY2MuU2l6ZSA9IHRoaXMuY29udGVudC5wYXJlbnQuZ2V0Q29udGVudFNpemUoKTtcblxuICAgICAgICBpZiAodGhpcy5faXRlbURhdGFMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICBzaXplID0gdGhpcy5fb3JpZ2luU2l6ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB0aGlzLmdldFBhZGRpbmcoKSArICh0aGlzLmdldFNwYWNpbmcoKSAqICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIC0gMSkpICsgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpemUud2lkdGggPCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSB0aGlzLmdldFBhZGRpbmcoKSArICh0aGlzLmdldFNwYWNpbmcoKSAqICh0aGlzLl9pdGVtRGF0YUxpc3QubGVuZ3RoIC0gMSkpICsgKHRoaXMuX2l0ZW1EYXRhTGlzdC5sZW5ndGggKiB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGlmIChzaXplLmhlaWdodCA8IHRoaXMuY29udGVudC5wYXJlbnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRJbm5lclNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGVudC5zZXRDb250ZW50U2l6ZSh0aGlzLl9vcmlnaW5TaXplKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHRoaXMuX29yaWdpblNpemUpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxUb1RvcCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKHRoaXMucHVsbFRvcEV2ZW50SGFuZGxlcikge1xuICAgIC8vICAgICAgICAgdGhpcy5wdWxsVG9wRXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbFRvQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsQm90dG9tRXZlbnRIYW5kbGVyKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnB1bGxCb3R0b21FdmVudEhhbmRsZXIuZW1pdChbdGFyZ2V0XSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uU2Nyb2xsVG9MZWZ0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlcikge1xuICAgIC8vICAgICAgICAgdGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxUb1JpZ2h0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpcy5wdWxsUmlnaHRFdmVudEhhbmRsZXIpIHtcbiAgICAvLyAgICAgICAgIHRoaXMucHVsbFJpZ2h0RXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbGluZyh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIC8vIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudDsgKytpKSB7XG4gICAgLy8gICAgIC8vICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgLy8gICAgIC8vICAgICBsZXQgaXRlbVJlY3Q6IGNjLlJlY3QgPSBpdGVtTm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcblxuICAgIC8vICAgICAvLyAgICAgaWYgKGl0ZW1SZWN0LmludGVyc2VjdHModGhpcy5tX2NhY2hlUmVjdCkpIHtcblxuICAgIC8vICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnggPiB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgIC8vICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnkgPCB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgIC8vICAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAvLyAgICAgICAgIHRoaXMucHV0Tm9kZShpdGVtTm9kZSk7XG4gICAgLy8gICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gfVxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJTY3JvbGxpbmdcIiwgdGFyZ2V0KTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIG9uQm91bmNlQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VCb3R0b21cIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvbkJvdW5jZVRvcCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlVG9wXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Cb3VuY2VMZWZ0KHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VMZWZ0XCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25Cb3VuY2VSaWdodCh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlUmlnaHRcIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblNjcm9sbEVuZGVkKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAvLyAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiU2Nyb2xsRW5kZWRcIik7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblRvdWNoVXAodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgIC8vICAgICAvLyBHLkxvZ01nci5sb2coXCJUb3VjaFVwXCIpO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgb25TY3JvbGxCZWdhbih0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgLy8gICAgIC8vIEcuTG9nTWdyLmxvZyhcIlNjcm9sbEJlZ2FuXCIpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9vea4suafk+WujOaIkCDlm57osINcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uUmVuZGVyZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmluZ09wZXJhdGVDb3VudCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1DYWNoZURhdGFMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVJlbmRlckl0ZW1TdGFydEluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FjaGVEYXRhTGlzdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tJdGVtPFQ+KG5vZGU6IGNjLk5vZGUsIGRhdGE6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGlja0l0ZW1FdmVudEhhbmRsZXIuZW1pdChbbm9kZSwgZGF0YV0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyKCk7XG4gICAgfVxuXG59XG4iXX0=