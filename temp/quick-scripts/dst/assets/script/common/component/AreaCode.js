
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/AreaCode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '058c7gNvLJD5qviFLI3xHQE', 'AreaCode');
// script/common/component/AreaCode.ts

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
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let AreaCode = class AreaCode extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.parentNode = null;
        this.ListPrefab = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("AreaCodeInfo", (data) => {
            if (data) {
                this.label.string = data.Code;
            }
        });
    }
    start() {
    }
    onTouchEnd() {
        if (this.ListPrefab) {
            let prefab = cc.instantiate(this.ListPrefab);
            prefab.parent = this.parentNode;
        }
    }
};
__decorate([
    property(cc.Label)
], AreaCode.prototype, "label", void 0);
__decorate([
    property(cc.Node)
], AreaCode.prototype, "parentNode", void 0);
__decorate([
    property(cc.Prefab)
], AreaCode.prototype, "ListPrefab", void 0);
AreaCode = __decorate([
    ccclass
], AreaCode);
exports.default = AreaCode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9BcmVhQ29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUErQztBQUcvQyxNQUFNLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHMUMsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsZ0JBQU07SUFBNUM7O1FBR0ksVUFBSyxHQUFhLElBQUksQ0FBQztRQUd2QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVUsR0FBYyxJQUFJLENBQUM7UUE0QjdCLGlCQUFpQjtJQUNyQixDQUFDO0lBekJHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0lBQ0QsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7YUFDaEM7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxLQUFLO0lBRUwsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxNQUFNLEdBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDN0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1NBQ2xDO0lBQ0wsQ0FBQztDQUdKLENBQUE7QUFuQ0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1Q0FDSTtBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNTO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ1M7QUFUWixRQUFRO0lBRDVCLE9BQU87R0FDYSxRQUFRLENBc0M1QjtrQkF0Q29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcmVhQ29kZSBleHRlbmRzIFVJVmlld3tcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGFyZW50Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIExpc3RQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cblxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKClcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcylcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJBcmVhQ29kZUluZm9cIiwgKGRhdGEpPT57XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gZGF0YS5Db2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgb25Ub3VjaEVuZCgpe1xuICAgICAgICBpZiAodGhpcy5MaXN0UHJlZmFiKSB7XG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gIGNjLmluc3RhbnRpYXRlKHRoaXMuTGlzdFByZWZhYilcbiAgICAgICAgICAgIHByZWZhYi5wYXJlbnQgPSB0aGlzLnBhcmVudE5vZGVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=