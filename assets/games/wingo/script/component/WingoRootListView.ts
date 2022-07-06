import * as ComponentDefine from "../../../../script/common/define/ComponentDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WingoRootListView extends cc.ScrollView {

    @property({
        visible: (function () {
            cc.Class["Attr"].setClassAttr(this, "horizontalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.HORIZONTAL);
            cc.Class["Attr"].setClassAttr(this, "verticalScrollBar", "visible", this.direction === ComponentDefine.DirectionType.VERTICAL);
            return false;
        })
    })
    private directionType: ComponentDefine.DirectionType = ComponentDefine.DirectionType.HORIZONTAL;

    @property({ tooltip: "是否分页加载" })
    private isPaging: boolean = false;

    @property({ type: cc.Component.EventHandler, tooltip: "左边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL }) })
    private pullLeftEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();

    @property({ type: cc.Component.EventHandler, tooltip: "右边拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.HORIZONTAL }) })
    private pullRightEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();

    @property({ type: cc.Component.EventHandler, tooltip: "顶部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL }) })
    private pullTopEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();

    @property({ type: cc.Component.EventHandler, tooltip: "底部拉取回调", visible: (function () { return this.isPaging && this.direction === ComponentDefine.DirectionType.VERTICAL }) })
    private pullBottomEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();

    @property({ type: cc.SpriteFrame, tooltip: "刷新拉取等待图片", visible: (function () { return this.isPaging }) })
    private waitingImage: cc.SpriteFrame = null;

    @property({ type: cc.Enum(ComponentDefine.DirectionType), tooltip: "滑动方向\nHORIZONTAL 水平\nVERTICAL 垂直" })
    private get direction(): ComponentDefine.DirectionType {
        return this.directionType;
    }
    private set direction(value: ComponentDefine.DirectionType) {
        if (value !== this.directionType) {
            this.directionType = value;
            this.changeDirection(value);
        }
    }

    @property({ override: true, visible: false })
    public horizontal: boolean = this.direction === ComponentDefine.DirectionType.HORIZONTAL;

    @property({ override: true, visible: false })
    public vertical: boolean = this.direction === ComponentDefine.DirectionType.VERTICAL;

    @property({ type: cc.Float, tooltip: "滚动之后的减速系数。取值范围是 0-1，如果是 1 则立马停止滚动，如果是 0，则会一直滚动到 content 的边界。", override: true, visible: true })
    public brake: number = 0.75;

    @property({ type: cc.Float, tooltip: "回弹所需要的时间。取值范围是 0-10。", override: true, visible: true })
    public bounceDuration: number = 0.23;

    @property({ type: cc.Float, tooltip: "垂直间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL }) })
    private spacingY: number = 0;

    @property({ type: cc.Float, tooltip: "顶间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL }) })
    private top: number = 0;

    @property({ type: cc.Float, tooltip: "底间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.VERTICAL }) })
    private bottom: number = 0;

    @property({ type: cc.Float, tooltip: "水平间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL }) })
    private spacingX: number = 0;

    @property({ type: cc.Float, tooltip: "左间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL }) })
    private left: number = 0;

    @property({ type: cc.Float, tooltip: "右间距", visible: (function () { return this.direction === ComponentDefine.DirectionType.HORIZONTAL }) })
    private right: number = 0;

    /**
     * 修改方向类型属性
     * @param value {ComponentDefine.DirectionType} 方向类型
     */
    private changeDirection(value: ComponentDefine.DirectionType): void {
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

    private initData(): void {

    }

    private register(): void {
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

    private unregister(): void {
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

    private initView(): void {

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
    private getPadding(): number {
        let padding: number = 0;
        if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
            padding += this.left + this.right;
        } else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
            padding += this.top + this.bottom;
        }
        return padding;
    }

    /**
     * 获取间距
     * @returns {number} 间距
     */
    private getSpacing(): number {
        let spacing: number = 0;
        if (this.direction === ComponentDefine.DirectionType.HORIZONTAL) {
            spacing = this.spacingX;
        } else if (this.direction === ComponentDefine.DirectionType.VERTICAL) {
            spacing = this.spacingY;
        }
        return spacing;
    }

    private onScrollToTop(target: WingoRootListView): void {
        if (!this.isPaging) {
            return;
        }

        if (this.pullTopEventHandler) {
            this.pullTopEventHandler.emit([target]);
        }
    }

    private onScrollToBottom(target: WingoRootListView): void {
        if (!this.isPaging) {
            return;
        }

        if (this.pullBottomEventHandler) {
            this.pullBottomEventHandler.emit([target]);
        }
    }

    private onScrollToLeft(target: WingoRootListView): void {
        if (!this.isPaging) {
            return;
        }

        if (this.pullLeftEventHandler) {
            this.pullLeftEventHandler.emit([target]);
        }
    }

    private onScrollToRight(target: WingoRootListView): void {
        if (!this.isPaging) {
            return;
        }

        if (this.pullRightEventHandler) {
            this.pullRightEventHandler.emit([target]);
        }
    }

    private onScrolling(target: WingoRootListView): void {
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

    private onBounceBottom(target: WingoRootListView): void {
        if (!this.brake) {
            return;
        }

        // G.LogMgr.log("BounceBottom");
    }

    private onBounceTop(target: WingoRootListView): void {
        if (!this.brake) {
            return;
        }

        // G.LogMgr.log("BounceTop");
    }

    private onBounceLeft(target: WingoRootListView): void {
        if (!this.brake) {
            return;
        }

        // G.LogMgr.log("BounceLeft");
    }

    private onBounceRight(target: WingoRootListView): void {
        if (!this.brake) {
            return;
        }

        // G.LogMgr.log("BounceRight");
    }

    private onScrollEnded(target: WingoRootListView): void {
        // G.LogMgr.log("ScrollEnded");
    }

    private onTouchUp(target: WingoRootListView): void {
        // G.LogMgr.log("TouchUp");
    }

    private onScrollBegan(target: WingoRootListView): void {
        // G.LogMgr.log("ScrollBegan");
    }

    update(dt: number) {
        super.update(dt);
    }

    protected onDestroy(): void {

        this.unregister();
    }

}
