
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeRecordDetailItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cebfezY7X1IW4acJhOOMaes', 'RedPakgeRecordDetailItem');
// script/redPakge/RedPakgeRecordDetailItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScroViewBaseItem_1 = __importDefault(require("../common/component/ScroViewBaseItem"));
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeRecordDetailItem = class RedPakgeRecordDetailItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.head = null;
        this.userIdLabel = null;
        this.amountLabel = null;
        this.nameLabel = null;
        this.stateLabel = null;
        this.newTipNode = null;
        this.view = null;
        // update (dt) {}
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this.view);
            this.userIdLabel.string = "ID:" + data.userId;
            this.nameLabel.string = UtilMgr_1.UtilMgr.setString(data.nickname);
            this.amountLabel.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.receiveAmount);
            this.stateLabel.language = new Date(data.receiveTime).format("MM-dd hh:mm:ss");
            this.newTipNode.active = data.new == 1 ? true : false;
        }
    }
};
__decorate([
    property(cc.Sprite)
], RedPakgeRecordDetailItem.prototype, "head", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "userIdLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "amountLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "nameLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "stateLabel", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetailItem.prototype, "newTipNode", void 0);
__decorate([
    property(UIView_1.default)
], RedPakgeRecordDetailItem.prototype, "view", void 0);
RedPakgeRecordDetailItem = __decorate([
    ccclass
], RedPakgeRecordDetailItem);
exports.default = RedPakgeRecordDetailItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VSZWNvcmREZXRhaWxJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQW9FO0FBRXBFLG9FQUE0QztBQUM1QywrQ0FBNEM7QUFJNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLHdCQUF3QixHQUE3QyxNQUFxQix3QkFBeUIsU0FBUSwwQkFBZ0I7SUFBdEU7O1FBR0ksU0FBSSxHQUFjLElBQUksQ0FBQztRQUd2QixnQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixnQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUczQixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBYXBCLGlCQUFpQjtJQUNyQixDQUFDO0lBWkcsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNO1FBQ25CLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzlCLElBQUksSUFBSSxFQUFFO1lBQ04saUJBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUMsaUJBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDekQ7SUFDTCxDQUFDO0NBRUosQ0FBQTtBQWhDRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNHO0FBR3ZCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkRBQ1U7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2REFDVTtBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJEQUNRO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NERBQ1M7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDUztBQUczQjtJQURDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDO3NEQUNHO0FBckJILHdCQUF3QjtJQUQ1QyxPQUFPO0dBQ2Esd0JBQXdCLENBbUM1QztrQkFuQ29CLHdCQUF3QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvVmlld0Jhc2VJdGVtIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3QmFzZUl0ZW1cIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFJlZFBha2dlUmVjb3JkRGV0YWlsIGZyb20gXCIuL1JlZFBha2dlUmVjb3JkRGV0YWlsXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZFBha2dlUmVjb3JkRGV0YWlsSXRlbSBleHRlbmRzIFNjcm9WaWV3QmFzZUl0ZW0ge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBoZWFkOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHVzZXJJZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYW1vdW50TGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBuYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGF0ZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBuZXdUaXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShVSVZpZXcpXG4gICAgdmlldzogVUlWaWV3ID0gbnVsbDtcblxuICAgIHVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLmhlYWQsIGRhdGEuaGVhZEltZ1VybCwgZGF0YS51c2VySWQsIHRoaXMudmlldylcbiAgICAgICAgICAgIHRoaXMudXNlcklkTGFiZWwuc3RyaW5nID0gXCJJRDpcIiArIGRhdGEudXNlcklkO1xuICAgICAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcoZGF0YS5uaWNrbmFtZSk7XG4gICAgICAgICAgICB0aGlzLmFtb3VudExhYmVsLnN0cmluZyA9IFwi4oK5XCIrVXRpbE1nci5jaGFuZ2VNb25leShkYXRhLnJlY2VpdmVBbW91bnQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLmxhbmd1YWdlID0gbmV3IERhdGUoZGF0YS5yZWNlaXZlVGltZSkuZm9ybWF0KFwiTU0tZGQgaGg6bW06c3NcIik7XG4gICAgICAgICAgICB0aGlzLm5ld1RpcE5vZGUuYWN0aXZlID0gZGF0YS5uZXcgPT0gMSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19