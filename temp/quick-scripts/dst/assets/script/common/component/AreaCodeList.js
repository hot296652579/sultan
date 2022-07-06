
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/AreaCodeList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a807gEWPZFFrM5CQE9vCgv', 'AreaCodeList');
// script/common/component/AreaCodeList.ts

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
const AreaCodeConfig_1 = require("./AreaCodeConfig");
const ScroViewLogic_1 = __importDefault(require("./ScroViewLogic"));
const { ccclass, property } = cc._decorator;
let AreaCodeList = class AreaCodeList extends cc.Component {
    constructor() {
        super(...arguments);
        this.bg = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            // this.node.destroy();
            this.hide();
        }, this);
    }
    show() {
        this.node.active = true;
    }
    hide() {
        this.node.active = false;
    }
    start() {
        if (AreaCodeConfig_1.AreaCodeConfig.Config) {
            this.getComponent(ScroViewLogic_1.default).initUI(AreaCodeConfig_1.AreaCodeConfig.Config);
        }
    }
};
__decorate([
    property(cc.Node)
], AreaCodeList.prototype, "bg", void 0);
AreaCodeList = __decorate([
    ccclass
], AreaCodeList);
exports.default = AreaCodeList;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9BcmVhQ29kZUxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBa0Q7QUFDbEQsb0VBQTRDO0FBRzVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxFQUFFLENBQUMsU0FBUztJQUF0RDs7UUFHSSxPQUFFLEdBQVksSUFBSSxDQUFDO1FBc0JuQixpQkFBaUI7SUFDckIsQ0FBQztJQXBCRyxNQUFNO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUMzQyx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFDRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSwrQkFBYyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNqRTtJQUNMLENBQUM7Q0FHSixDQUFBO0FBdkJHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0NBQ0M7QUFIRixZQUFZO0lBRGhDLE9BQU87R0FDYSxZQUFZLENBMEJoQztrQkExQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcmVhQ29kZUNvbmZpZyB9IGZyb20gXCIuL0FyZWFDb2RlQ29uZmlnXCI7XG5pbXBvcnQgU2Nyb1ZpZXdMb2dpYyBmcm9tIFwiLi9TY3JvVmlld0xvZ2ljXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyZWFDb2RlTGlzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiZzogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9LCB0aGlzKVxuICAgIH1cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoQXJlYUNvZGVDb25maWcuQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChTY3JvVmlld0xvZ2ljKS5pbml0VUkoQXJlYUNvZGVDb25maWcuQ29uZmlnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==