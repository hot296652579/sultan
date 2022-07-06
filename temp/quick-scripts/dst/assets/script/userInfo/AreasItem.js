
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/userInfo/AreasItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e0668hISX1IKb0nVNxA0bhf', 'AreasItem');
// script/userInfo/AreasItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const { ccclass, property } = cc._decorator;
let AreasItem = class AreasItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.areaName = null;
        this._itemId = 0;
        this._itemClickCallback = null;
        // update (dt) {}
    }
    onLoad() {
    }
    updateItem(data, itemId, onClickCallback) {
        this._itemId = itemId;
        this._itemClickCallback = onClickCallback;
        this.areaName.string = data;
    }
    onItemClick(event, type) {
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        if (this._itemClickCallback) {
            this._itemClickCallback(event.target, this._itemId);
        }
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Label)
], AreasItem.prototype, "areaName", void 0);
AreasItem = __decorate([
    ccclass
], AreasItem);
exports.default = AreasItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdXNlckluZm8vQXJlYXNJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQW9EO0FBQ3BELHVEQUE2RDtBQUU3RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsRUFBRSxDQUFDLFNBQVM7SUFBbkQ7O1FBR0ksYUFBUSxHQUFhLElBQUksQ0FBQTtRQUV6QixZQUFPLEdBQVcsQ0FBQyxDQUFBO1FBRW5CLHVCQUFrQixHQUFRLElBQUksQ0FBQTtRQWlDOUIsaUJBQWlCO0lBQ3JCLENBQUM7SUFoQ0csTUFBTTtJQUNOLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxlQUFlLENBQUE7UUFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbkIsaUJBQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLDBCQUFnQixDQUFDLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3REO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBR0osQ0FBQTtBQXRDRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNNO0FBSFIsU0FBUztJQUQ3QixPQUFPO0dBQ2EsU0FBUyxDQXlDN0I7a0JBekNvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyZWFzSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYXJlYU5hbWU6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgX2l0ZW1JZDogbnVtYmVyID0gMFxuXG4gICAgX2l0ZW1DbGlja0NhbGxiYWNrOiBhbnkgPSBudWxsXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbShkYXRhLCBpdGVtSWQsIG9uQ2xpY2tDYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9pdGVtSWQgPSBpdGVtSWRcbiAgICAgICAgdGhpcy5faXRlbUNsaWNrQ2FsbGJhY2sgPSBvbkNsaWNrQ2FsbGJhY2tcblxuICAgICAgICB0aGlzLmFyZWFOYW1lLnN0cmluZyA9ICBkYXRhO1xuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50LCB0eXBlKSB7XG4gICAgICAgIE1hbmFnZXIuZ2xvYmFsQXVkaW8ucGxheUVmZmVjdChcImNvbW1vbi9hdWRpby9jbGlja1wiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1DbGlja0NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtQ2xpY2tDYWxsYmFjayhldmVudC50YXJnZXQsIHRoaXMuX2l0ZW1JZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacrEl0ZW3ov5vlhaVTY3JvbGxWaWV355qE5pe25YCZ5Zue6LCDXG4gICAgICovXG4gICAgb25FbnRlclNyY29sbFZpZXcoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacrEl0ZW3nprvlvIBTY3JvbGxWaWV355qE5pe25YCZ5Zue6LCDXG4gICAgICovXG4gICAgb25FeGl0U2Nyb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=