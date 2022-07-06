
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/ScroViewPlusItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld1BsdXNJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDOzs7Ozs7R0FNRztBQUVILElBQXFCLGdCQUFnQixHQUFyQyxNQUFxQixnQkFBaUIsU0FBUSxFQUFFLENBQUMsU0FBUztJQUExRDs7UUFLSSw0QkFBdUIsR0FBZ0MsRUFBRSxDQUFDO1FBTTFELDJCQUFzQixHQUFnQyxFQUFFLENBQUM7UUFNekQsMkJBQXNCLEdBQWdDLEVBQUUsQ0FBQztRQUl6RDs7Ozs7V0FLRztRQUNILGNBQVMsR0FBWSxLQUFLLENBQUM7SUFrRC9CLENBQUM7SUFoREc7O09BRUc7SUFDSCx3QkFBd0I7UUFDcEIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMxQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBdUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN6QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx1QkFBdUIsQ0FBQyxjQUFzQixFQUFFLGNBQXNCO1FBQ2xFLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDekMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNO1FBQ25CLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0NBQ0osQ0FBQTtBQXhFRztJQUpDLFFBQVEsQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7S0FDN0IsQ0FBQztpRUFDd0Q7QUFNMUQ7SUFKQyxRQUFRLENBQUM7UUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUNqQyxPQUFPLEVBQUUsaUJBQWlCO0tBQzdCLENBQUM7Z0VBQ3VEO0FBTXpEO0lBSkMsUUFBUSxDQUFDO1FBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFDakMsT0FBTyxFQUFFLDBCQUEwQjtLQUN0QyxDQUFDO2dFQUN1RDtBQWpCeEMsZ0JBQWdCO0lBRHBDLE9BQU87R0FDYSxnQkFBZ0IsQ0E2RXBDO2tCQTdFb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLyoqXG4gKiDnlKjms5XvvJpcbiAqXG4gKiAgICAgIDEuIOWwhuacrOe7hOS7tuaMgui9veWcqEl0ZW3oioLngrnkuIpcbiAqIFx0XHQyLiDlnKjlsZ7mgKfpnaLmnb/kuIrmjIflrprkuovku7bmlbDnu4Tlm57osIPvvIzljbPlj6/nm5HlkKwgSXRlbSDjgIzov5vlhaXjgI3lkozjgIznprvlvIDjgI1TY3JvbGxWaWV35Y+v6KeG5Yy65Z+f55qE5LqL5Lu2XG4gKlxuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb1ZpZXdQbHVzSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJdLFxuICAgICAgICB0b29sdGlwOiBcIui/m+WFpVNjcm9sbFZpZXfml7blm57osINcIlxuICAgIH0pXG4gICAgb25FbnRlclNjb3JsbFZpZXdFdmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJdLFxuICAgICAgICB0b29sdGlwOiBcIuemu+W8gFNjcm9sbFZpZXfml7blm57osINcIlxuICAgIH0pXG4gICAgb25FeGl0U2NvcmxsVmlld0V2ZW50czogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcltdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0sXG4gICAgICAgIHRvb2x0aXA6IFwi6L+b5YWlU2Nyb2xsVmlld+S5i+WQju+8jOS9jee9ruWPkeeUn+aUueWPmOaXtuWbnuiwg1wiXG4gICAgfSlcbiAgICBvblBvc2l0aW9uQ2hhbmdlRXZlbnRzOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcbiAgICBfaXRlbUlkOiBhbnk7XG4gICAgX2RhdGE6IGFueTtcblxuICAgIC8qKlxuICAgICAqIOW9k+WJjeaYr+WQpuWcqOWxleekuuS4rVxuICAgICAqXG4gICAgICogMS4g5Zyo6L+b5YWl5ZKM56a75byAU2Nyb2xsVmlld+acn+mXtO+8jOS4unRydWVcbiAgICAgKiAyLiDlnKjnprvlvIBTY3JvbExWaWV35pyf6Ze077yM5Li6ZmFsc2VcbiAgICAgKi9cbiAgICBpc1Nob3dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEl0ZW0g6L+b5YWlIFNjcm9sbFZpZXcg55qE5pe25YCZ5Zue6LCDXG4gICAgICovXG4gICAgcHVibGlzaE9uRW50ZXJTY3JvbGxWaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5vbkVudGVyU2NvcmxsVmlld0V2ZW50cy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25FbnRlclNjb3JsbFZpZXdFdmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5lbWl0KFtdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlbSDnprvlvIAgU2Nyb2xsVmlldyDnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBwdWJsaXNoT25FeGl0U2Nyb2xsVmlldygpIHtcbiAgICAgICAgaWYgKHRoaXMub25FeGl0U2NvcmxsVmlld0V2ZW50cy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25FeGl0U2NvcmxsVmlld0V2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LmVtaXQoW10pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVtIOi/m+WFpSBTY3JvbGxWaWV3IOWQju+8jOS9jee9ruWPkeeUn+enu+WKqOaXtuWbnuiwg++8jOemu+W8gFNjcm9sbFZpZXflkI7kuI3kvJrlm57osINcbiAgICAgKlxuICAgICAqIEBwYXJhbSB4T2Zmc2V0UGVyY2VudCDnm7jlr7nkuo4gU2Nyb2xsVmlldyDlj6/op4bljLrln5/kuK3lv4PngrnvvIxY55qE5YGP56e76YeP55m+5YiG5q+U77yM5Y+W5YC86IyD5Zu077yaWzAsIDFd44CC5YW25Lit77yMMO+8muS4uuWcqOWPr+inhuWMuuWfn+acgOW3pui+ue+8jDHvvJrkuLrlj6/op4bljLrln5/mnIDlj7PovrlcbiAgICAgKiBAcGFyYW0geU9mZnNldFBlcmNlbnQg55u45a+55LqOIFNjcm9sbFZpZXcg5Y+v6KeG5Yy65Z+f5Lit5b+D54K577yMWeeahOWBj+enu+mHj+eZvuWIhuavlO+8jOWPluWAvOiMg+WbtO+8mlswLCAxXeOAguWFtuS4re+8jDDvvJrkuLrlnKjlj6/op4bljLrln5/mnIDkuIvovrnvvIwx77ya5Li65Y+v6KeG5Yy65Z+f5pyA5LiK6L65XG4gICAgICovXG4gICAgcHVibGlzaE9uUG9zaXRpb25DaGFuZ2UoeE9mZnNldFBlcmNlbnQ6IG51bWJlciwgeU9mZnNldFBlcmNlbnQ6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5vblBvc2l0aW9uQ2hhbmdlRXZlbnRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlRXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQuZW1pdChbeE9mZnNldFBlcmNlbnQsIHlPZmZzZXRQZXJjZW50XSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKSB7XG4gICAgICAgIC8vY2MuYXNzZXJ0KGl0ZW1JZCB8fCBpdGVtSWQgPT0gMCwgXCJpdGVtSWQgaXMgdW5kZWZpbmVkXCIpXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9pdGVtSWQgPSBpdGVtSWQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbUlkXG4gICAgfVxufVxuIl19