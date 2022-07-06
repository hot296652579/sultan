"use strict";
cc._RF.push(module, '091fetwLYtMO5Y0reKklm/m', 'ScroViewPlusItem');
// script/common/component/ScroViewPlusItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
/**
 * 用法：
 *
 *      1. 将本组件挂载在Item节点上
 * 		2. 在属性面板上指定事件数组回调，即可监听 Item 「进入」和「离开」ScrollView可视区域的事件
 *
 */
let ScroViewPlusItem = class ScroViewPlusItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.onEnterScorllViewEvents = [];
        this.onExitScorllViewEvents = [];
        this.onPositionChangeEvents = [];
        /**
         * 当前是否在展示中
         *
         * 1. 在进入和离开ScrollView期间，为true
         * 2. 在离开ScrolLView期间，为false
         */
        this.isShowing = false;
    }
    /**
     * Item 进入 ScrollView 的时候回调
     */
    publishOnEnterScrollView() {
        if (this.onEnterScorllViewEvents.length == 0) {
            return;
        }
        this.onEnterScorllViewEvents.forEach(event => {
            event.emit([]);
        });
    }
    /**
     * Item 离开 ScrollView 的时候回调
     */
    publishOnExitScrollView() {
        if (this.onExitScorllViewEvents.length == 0) {
            return;
        }
        this.onExitScorllViewEvents.forEach(event => {
            event.emit([]);
        });
    }
    /**
     * Item 进入 ScrollView 后，位置发生移动时回调，离开ScrollView后不会回调
     *
     * @param xOffsetPercent 相对于 ScrollView 可视区域中心点，X的偏移量百分比，取值范围：[0, 1]。其中，0：为在可视区域最左边，1：为可视区域最右边
     * @param yOffsetPercent 相对于 ScrollView 可视区域中心点，Y的偏移量百分比，取值范围：[0, 1]。其中，0：为在可视区域最下边，1：为可视区域最上边
     */
    publishOnPositionChange(xOffsetPercent, yOffsetPercent) {
        if (this.onPositionChangeEvents.length == 0) {
            return;
        }
        this.onPositionChangeEvents.forEach(event => {
            event.emit([xOffsetPercent, yOffsetPercent]);
        });
    }
    updateItem(data, itemId) {
        //cc.assert(itemId || itemId == 0, "itemId is undefined")
        this._data = data;
        this._itemId = itemId;
    }
    getItemId() {
        return this._itemId;
    }
};
__decorate([
    property({
        type: [cc.Component.EventHandler],
        tooltip: "进入ScrollView时回调"
    })
], ScroViewPlusItem.prototype, "onEnterScorllViewEvents", void 0);
__decorate([
    property({
        type: [cc.Component.EventHandler],
        tooltip: "离开ScrollView时回调"
    })
], ScroViewPlusItem.prototype, "onExitScorllViewEvents", void 0);
__decorate([
    property({
        type: [cc.Component.EventHandler],
        tooltip: "进入ScrollView之后，位置发生改变时回调"
    })
], ScroViewPlusItem.prototype, "onPositionChangeEvents", void 0);
ScroViewPlusItem = __decorate([
    ccclass
], ScroViewPlusItem);
exports.default = ScroViewPlusItem;

cc._RF.pop();