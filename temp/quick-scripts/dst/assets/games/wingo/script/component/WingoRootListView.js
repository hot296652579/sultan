
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/component/WingoRootListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1df62Lx+UlLR7icbXMv9MKp', 'WingoRootListView');
// games/wingo/script/component/WingoRootListView.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentDefine = __importStar(require("../../../../script/common/define/ComponentDefine"));
const { ccclass, property } = cc._decorator;
let WingoRootListView = class WingoRootListView extends cc.ScrollView {
    constructor() {
        super(...arguments);
        this.directionType = ComponentDefine.DirectionType.HORIZONTAL;
        this.isPaging = false;
        this.pullLeftEventHandler = new cc.Component.EventHandler();
        this.pullRightEventHandler = new cc.Component.EventHandler();
        this.pullTopEventHandler = new cc.Component.EventHandler();
        this.pullBottomEventHandler = new cc.Component.EventHandler();
        this.waitingImage = null;
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
    initData() {
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
    update(dt) {
        super.update(dt);
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
], WingoRootListView.prototype, "directionType", void 0);
__decorate([
    property({ tooltip: "是否分页加载" })
], WingoRootListView.prototype, "isPaging", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "左边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoRootListView.prototype, "pullLeftEventHandler", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "右边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoRootListView.prototype, "pullRightEventHandler", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "顶部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoRootListView.prototype, "pullTopEventHandler", void 0);
__decorate([
    property({ type: cc.Component.EventHandler, tooltip: "底部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoRootListView.prototype, "pullBottomEventHandler", void 0);
__decorate([
    property({ type: cc.SpriteFrame, tooltip: "刷新拉取等待图片", visible: (function () { return this.isPaging; }) })
], WingoRootListView.prototype, "waitingImage", void 0);
__decorate([
    property({ type: cc.Enum(ComponentDefine.DirectionType), tooltip: "滑动方向\nHORIZONTAL 水平\nVERTICAL 垂直" })
], WingoRootListView.prototype, "direction", null);
__decorate([
    property({ override: true, visible: false })
], WingoRootListView.prototype, "horizontal", void 0);
__decorate([
    property({ override: true, visible: false })
], WingoRootListView.prototype, "vertical", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "滚动之后的减速系数。取值范围是 0-1，如果是 1 则立马停止滚动，如果是 0，则会一直滚动到 content 的边界。", override: true, visible: true })
], WingoRootListView.prototype, "brake", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "回弹所需要的时间。取值范围是 0-10。", override: true, visible: true })
], WingoRootListView.prototype, "bounceDuration", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "垂直间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoRootListView.prototype, "spacingY", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "顶间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoRootListView.prototype, "top", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "底间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL; }) })
], WingoRootListView.prototype, "bottom", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "水平间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoRootListView.prototype, "spacingX", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "左间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoRootListView.prototype, "left", void 0);
__decorate([
    property({ type: cc.Float, tooltip: "右间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL; }) })
], WingoRootListView.prototype, "right", void 0);
WingoRootListView = __decorate([
    ccclass
], WingoRootListView);
exports.default = WingoRootListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvY29tcG9uZW50L1dpbmdvUm9vdExpc3RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtHQUFvRjtBQUVwRixNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLEVBQUUsQ0FBQyxVQUFVO0lBQTVEOztRQVNZLGtCQUFhLEdBQWtDLGVBQWUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBR3hGLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHMUIseUJBQW9CLEdBQThCLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUdsRiwwQkFBcUIsR0FBOEIsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR25GLHdCQUFtQixHQUE4QixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHakYsMkJBQXNCLEdBQThCLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUdwRixpQkFBWSxHQUFtQixJQUFJLENBQUM7UUFjckMsZUFBVSxHQUFZLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFHbEYsYUFBUSxHQUFZLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFHOUUsVUFBSyxHQUFXLElBQUksQ0FBQztRQUdyQixtQkFBYyxHQUFXLElBQUksQ0FBQztRQUc3QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFHaEIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUduQixhQUFRLEdB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QUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzsrQ0FDbkg7QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnREFDbEg7QUFwRVQsaUJBQWlCO0lBRHJDLE9BQU87R0FDYSxpQkFBaUIsQ0F3WXJDO2tCQXhZb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQ29tcG9uZW50RGVmaW5lIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2RlZmluZS9Db21wb25lbnREZWZpbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmdvUm9vdExpc3RWaWV3IGV4dGVuZHMgY2MuU2Nyb2xsVmlldyB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB2aXNpYmxlOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImhvcml6b250YWxTY3JvbGxCYXJcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgICAgIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJ2ZXJ0aWNhbFNjcm9sbEJhclwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHByaXZhdGUgZGlyZWN0aW9uVHlwZTogQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUgPSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmmK/lkKbliIbpobXliqDovb1cIiB9KVxuICAgIHByaXZhdGUgaXNQYWdpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5bem6L655ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgcHJpdmF0ZSBwdWxsTGVmdEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuWPs+i+ueaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgcHVsbFJpZ2h0RXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi6aG26YOo5ouJ5Y+W5Zue6LCDXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nICYmIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgcHVsbFRvcEV2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCB0b29sdGlwOiBcIuW6lemDqOaLieWPluWbnuiwg1wiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5pc1BhZ2luZyAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwgfSkgfSlcbiAgICBwcml2YXRlIHB1bGxCb3R0b21FdmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlRnJhbWUsIHRvb2x0aXA6IFwi5Yi35paw5ouJ5Y+W562J5b6F5Zu+54mHXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmlzUGFnaW5nIH0pIH0pXG4gICAgcHJpdmF0ZSB3YWl0aW5nSW1hZ2U6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUpLCB0b29sdGlwOiBcIua7keWKqOaWueWQkVxcbkhPUklaT05UQUwg5rC05bmzXFxuVkVSVElDQUwg5Z6C55u0XCIgfSlcbiAgICBwcml2YXRlIGdldCBkaXJlY3Rpb24oKTogQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb25UeXBlO1xuICAgIH1cbiAgICBwcml2YXRlIHNldCBkaXJlY3Rpb24odmFsdWU6IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5kaXJlY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvblR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IG92ZXJyaWRlOiB0cnVlLCB2aXNpYmxlOiBmYWxzZSB9KVxuICAgIHB1YmxpYyBob3Jpem9udGFsOiBib29sZWFuID0gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUw7XG5cbiAgICBAcHJvcGVydHkoeyBvdmVycmlkZTogdHJ1ZSwgdmlzaWJsZTogZmFsc2UgfSlcbiAgICBwdWJsaWMgdmVydGljYWw6IGJvb2xlYW4gPSB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLmu5rliqjkuYvlkI7nmoTlh4/pgJ/ns7vmlbDjgILlj5blgLzojIPlm7TmmK8gMC0x77yM5aaC5p6c5pivIDEg5YiZ56uL6ams5YGc5q2i5rua5Yqo77yM5aaC5p6c5pivIDDvvIzliJnkvJrkuIDnm7Tmu5rliqjliLAgY29udGVudCDnmoTovrnnlYzjgIJcIiwgb3ZlcnJpZGU6IHRydWUsIHZpc2libGU6IHRydWUgfSlcbiAgICBwdWJsaWMgYnJha2U6IG51bWJlciA9IDAuNzU7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlm57lvLnmiYDpnIDopoHnmoTml7bpl7TjgILlj5blgLzojIPlm7TmmK8gMC0xMOOAglwiLCBvdmVycmlkZTogdHJ1ZSwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHB1YmxpYyBib3VuY2VEdXJhdGlvbjogbnVtYmVyID0gMC4yMztcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuWeguebtOmXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMIH0pIH0pXG4gICAgcHJpdmF0ZSBzcGFjaW5nWTogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIumhtumXtOi3nVwiLCB2aXNpYmxlOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMIH0pIH0pXG4gICAgcHJpdmF0ZSB0b3A6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlupXpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCB9KSB9KVxuICAgIHByaXZhdGUgYm90dG9tOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5rC05bmz6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgc3BhY2luZ1g6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlt6bpl7Tot51cIiwgdmlzaWJsZTogKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMIH0pIH0pXG4gICAgcHJpdmF0ZSBsZWZ0OiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Y+z6Ze06LedXCIsIHZpc2libGU6IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCB9KSB9KVxuICAgIHByaXZhdGUgcmlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiDkv67mlLnmlrnlkJHnsbvlnovlsZ7mgKdcbiAgICAgKiBAcGFyYW0gdmFsdWUge0NvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlfSDmlrnlkJHnsbvlnotcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZURpcmVjdGlvbih2YWx1ZTogQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsID0gdmFsdWUgPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUw7XG4gICAgICAgIHRoaXMudmVydGljYWwgPSB2YWx1ZSA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUw7XG5cbiAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInRvcFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImJvdHRvbVwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLlZFUlRJQ0FMKTtcbiAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcInNwYWNpbmdZXCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpO1xuICAgICAgICBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwidmVydGljYWxTY3JvbGxCYXJcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCk7XG4gICAgICAgIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJsZWZ0XCIsIFwidmlzaWJsZVwiLCB0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCk7XG4gICAgICAgIGNjLkNsYXNzW1wiQXR0clwiXS5zZXRDbGFzc0F0dHIodGhpcywgXCJyaWdodFwiLCBcInZpc2libGVcIiwgdGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpO1xuICAgICAgICBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKHRoaXMsIFwic3BhY2luZ1hcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICAgICAgY2MuQ2xhc3NbXCJBdHRyXCJdLnNldENsYXNzQXR0cih0aGlzLCBcImhvcml6b250YWxTY3JvbGxCYXJcIiwgXCJ2aXNpYmxlXCIsIHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsLXRvLXRvcFwiLCB0aGlzLm9uU2Nyb2xsVG9Ub3AsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxUb0JvdHRvbSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihcInNjcm9sbC10by1sZWZ0XCIsIHRoaXMub25TY3JvbGxUb0xlZnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vblNjcm9sbFRvUmlnaHQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihcImJvdW5jZS1ib3R0b21cIiwgdGhpcy5vbkJvdW5jZUJvdHRvbSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihcImJvdW5jZS10b3BcIiwgdGhpcy5vbkJvdW5jZVRvcCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihcImJvdW5jZS1sZWZ0XCIsIHRoaXMub25Cb3VuY2VMZWZ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25Cb3VuY2VSaWdodCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMub25TY3JvbGxpbmcsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2gtdXBcIiwgdGhpcy5vblRvdWNoVXAsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGwtYmVnYW5cIiwgdGhpcy5vblNjcm9sbEJlZ2FuLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVucmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tdG9wXCIsIHRoaXMub25TY3JvbGxUb1RvcCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxUb0JvdHRvbSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJzY3JvbGwtdG8tbGVmdFwiLCB0aGlzLm9uU2Nyb2xsVG9MZWZ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uU2Nyb2xsVG9SaWdodCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9mZihcImJvdW5jZS1ib3R0b21cIiwgdGhpcy5vbkJvdW5jZUJvdHRvbSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJib3VuY2UtdG9wXCIsIHRoaXMub25Cb3VuY2VUb3AsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLWxlZnRcIiwgdGhpcy5vbkJvdW5jZUxlZnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25Cb3VuY2VSaWdodCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsaW5nLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInNjcm9sbC1lbmRlZFwiLCB0aGlzLm9uU2Nyb2xsRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2gtdXBcIiwgdGhpcy5vblRvdWNoVXAsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwic2Nyb2xsLWJlZ2FuXCIsIHRoaXMub25TY3JvbGxCZWdhbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluW3pui+uee8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdExlZnQoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueCAtPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoLCB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodCk7XG4gICAgLy8gICAgIHJldHVybiByZWN0O1xuICAgIC8vIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiOt+WPluWPs+i+uee8k+WtmOefqeW9ouWMuuWfn1xuICAgIC8vICAqIEByZXR1cm5zIHtjYy5SZWN0fSDnn6nlvaJcbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIGdldENhY2hlUmVjdFJpZ2h0KCk6IGNjLlJlY3Qge1xuICAgIC8vICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgLy8gICAgIGxldCBwb2ludDogY2MuVmVjMiA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgLy8gICAgIHBvaW50LnggKz0gdGhpcy5jb250ZW50LnBhcmVudC53aWR0aDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5bpobbpg6jnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RUb3AoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueSArPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blupXpg6jnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RCb3R0b20oKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueSAtPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blt6blj7PnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RMZWZ0UmlnaHQoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueCAtPSB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoO1xuICAgIC8vICAgICByZWN0ID0gY2MucmVjdChwb2ludC54LCBwb2ludC55LCB0aGlzLmNvbnRlbnQucGFyZW50LndpZHRoICogMywgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5bkuIrkuIvnvJPlrZjnn6nlvaLljLrln59cbiAgICAvLyAgKiBAcmV0dXJucyB7Y2MuUmVjdH0g55+p5b2iXG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRDYWNoZVJlY3RUb3BCb3R0b20oKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcG9pbnQueSAtPSB0aGlzLmNvbnRlbnQucGFyZW50LmhlaWdodDtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQgKiAzKTtcbiAgICAvLyAgICAgcmV0dXJuIHJlY3Q7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6I635Y+W5Lit6Ze05Y+v6KeG55+p5b2i5Yy65Z+fXG4gICAgLy8gICogQHJldHVybnMge2NjLlJlY3R9IOefqeW9olxuICAgIC8vICAqL1xuICAgIC8vIHByaXZhdGUgZ2V0VmlzaWJsZVJlY3RDZW50ZXIoKTogY2MuUmVjdCB7XG4gICAgLy8gICAgIGxldCByZWN0OiBjYy5SZWN0ID0gbnVsbDtcbiAgICAvLyAgICAgbGV0IHBvaW50OiBjYy5WZWMyID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDAsIDApKTtcbiAgICAvLyAgICAgcmVjdCA9IGNjLnJlY3QocG9pbnQueCwgcG9pbnQueSwgdGhpcy5jb250ZW50LnBhcmVudC53aWR0aCwgdGhpcy5jb250ZW50LnBhcmVudC5oZWlnaHQpO1xuICAgIC8vICAgICByZXR1cm4gcmVjdDtcbiAgICAvLyB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDojrflj5blrZDpobnliJfooajnmoTnn6nlvaLlpKflsI9cbiAgICAvLyAgKiBAcGFyYW0gaXRlbXMge1Njcm9sbFZpZXdJbnRlcmZhY2UuSXRlbURhdGFbXX0g5a2Q6aG55YiX6KGoXG4gICAgLy8gICogQHJldHVybnMge2NjLlNpemV9XG4gICAgLy8gICovXG4gICAgLy8gcHJpdmF0ZSBnZXRJdGVtc1JlY3RTaXplKGl0ZW1zOiBTY3JvbGxWaWV3SW50ZXJmYWNlLkl0ZW1EYXRhW10pOiBjYy5TaXplIHtcbiAgICAvLyAgICAgbGV0IHJlY3RTaXplOiBjYy5TaXplID0gbmV3IGNjLlNpemUoMCwgMCk7XG5cbiAgICAvLyAgICAgaWYgKGl0ZW1zKSB7XG4gICAgLy8gICAgICAgICBpZiAoIShpdGVtcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIC8vICAgICAgICAgICAgIGl0ZW1zID0gW10uY29uY2F0KGl0ZW1zKTtcbiAgICAvLyAgICAgICAgIH1cblxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGl0ZW06IFNjcm9sbFZpZXdJbnRlcmZhY2UuSXRlbURhdGEgPSBpdGVtc1tpXTtcbiAgICAvLyAgICAgICAgICAgICByZWN0U2l6ZS53aWR0aCArPSBpdGVtLnByZWZhYi5kYXRhLndpZHRoO1xuICAgIC8vICAgICAgICAgICAgIHJlY3RTaXplLmhlaWdodCArPSBpdGVtLnByZWZhYi5kYXRhLmhlaWdodDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIHJldHVybiByZWN0U2l6ZTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bovrnot51cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDovrnot51cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFBhZGRpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHBhZGRpbmc6IG51bWJlciA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgcGFkZGluZyArPSB0aGlzLmxlZnQgKyB0aGlzLnJpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgcGFkZGluZyArPSB0aGlzLnRvcCArIHRoaXMuYm90dG9tO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYWRkaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumXtOi3nVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IOmXtOi3nVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U3BhY2luZygpOiBudW1iZXIge1xuICAgICAgICBsZXQgc3BhY2luZzogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBDb21wb25lbnREZWZpbmUuRGlyZWN0aW9uVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBzcGFjaW5nID0gdGhpcy5zcGFjaW5nWDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHNwYWNpbmcgPSB0aGlzLnNwYWNpbmdZO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFjaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGxUb1RvcCh0YXJnZXQ6IFdpbmdvUm9vdExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1BhZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHVsbFRvcEV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5wdWxsVG9wRXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNjcm9sbFRvQm90dG9tKHRhcmdldDogV2luZ29Sb290TGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wdWxsQm90dG9tRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnB1bGxCb3R0b21FdmVudEhhbmRsZXIuZW1pdChbdGFyZ2V0XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2Nyb2xsVG9MZWZ0KHRhcmdldDogV2luZ29Sb290TGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5wdWxsTGVmdEV2ZW50SGFuZGxlci5lbWl0KFt0YXJnZXRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGxUb1JpZ2h0KHRhcmdldDogV2luZ29Sb290TGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGFnaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wdWxsUmlnaHRFdmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHVsbFJpZ2h0RXZlbnRIYW5kbGVyLmVtaXQoW3RhcmdldF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNjcm9sbGluZyh0YXJnZXQ6IFdpbmdvUm9vdExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIC8vIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudDsgKytpKSB7XG4gICAgICAgIC8vICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICBsZXQgaXRlbVJlY3Q6IGNjLlJlY3QgPSBpdGVtTm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcblxuICAgICAgICAvLyAgICAgaWYgKGl0ZW1SZWN0LmludGVyc2VjdHModGhpcy5tX2NhY2hlUmVjdCkpIHtcblxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IENvbXBvbmVudERlZmluZS5EaXJlY3Rpb25UeXBlLkhPUklaT05UQUwpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnggPiB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gQ29tcG9uZW50RGVmaW5lLkRpcmVjdGlvblR5cGUuVkVSVElDQUwpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMCwgMCkpLnkgPCB0aGlzLmNvbnRlbnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkueCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLS10aGlzLm1fbGFzdEluZGV4O1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIHRoaXMucHV0Tm9kZShpdGVtTm9kZSk7XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBHLkxvZ01nci5sb2coXCJTY3JvbGxpbmdcIiwgdGFyZ2V0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQm91bmNlQm90dG9tKHRhcmdldDogV2luZ29Sb290TGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VCb3R0b21cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJvdW5jZVRvcCh0YXJnZXQ6IFdpbmdvUm9vdExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlVG9wXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Cb3VuY2VMZWZ0KHRhcmdldDogV2luZ29Sb290TGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmJyYWtlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHLkxvZ01nci5sb2coXCJCb3VuY2VMZWZ0XCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Cb3VuY2VSaWdodCh0YXJnZXQ6IFdpbmdvUm9vdExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5icmFrZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiQm91bmNlUmlnaHRcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNjcm9sbEVuZGVkKHRhcmdldDogV2luZ29Sb290TGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgLy8gRy5Mb2dNZ3IubG9nKFwiU2Nyb2xsRW5kZWRcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblRvdWNoVXAodGFyZ2V0OiBXaW5nb1Jvb3RMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICAvLyBHLkxvZ01nci5sb2coXCJUb3VjaFVwXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGxCZWdhbih0YXJnZXQ6IFdpbmdvUm9vdExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIC8vIEcuTG9nTWdyLmxvZyhcIlNjcm9sbEJlZ2FuXCIpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnVucmVnaXN0ZXIoKTtcbiAgICB9XG5cbn1cbiJdfQ==