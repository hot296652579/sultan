
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/HallData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5fd49CVed5DjqQIAJjEDZgr', 'HallData');
// script/data/HallData.ts

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
const BaseData_1 = __importDefault(require("../base/BaseData"));
const ClassDecorator_1 = __importDefault(require("../framework/decorator/ClassDecorator"));
let HallData = class HallData extends BaseData_1.default {
    constructor() {
        super();
        // public gameList: MST.IRoomInfo[] = null;
        this.games = null;
        // public winRankList: MST.UnitRankInfo[] = null;
        this.winRankList = null;
        this.betRankList = null;
        this.signinData = null;
        this.notice = [];
        this.missionList = [];
    }
    destroy() {
    }
};
HallData = __decorate([
    ClassDecorator_1.default.classname
], HallData);
exports.default = HallData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZGF0YS9IYWxsRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUF3QztBQUN4QywyRkFBbUU7QUFJbkUsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsa0JBQVE7SUFhMUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQVpaLDJDQUEyQztRQUNwQyxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGlEQUFpRDtRQUMxQyxnQkFBVyxHQUF1QixJQUFJLENBQUM7UUFDdkMsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO1FBRWxDLGVBQVUsR0FBMEIsSUFBSSxDQUFDO1FBRXpDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQUt4QixDQUFDO0lBRU0sT0FBTztJQUVkLENBQUM7Q0FFSixDQUFBO0FBdEJvQixRQUFRO0lBRDVCLHdCQUFjLENBQUMsU0FBUztHQUNKLFFBQVEsQ0FzQjVCO2tCQXRCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRGF0YSBmcm9tIFwiLi4vYmFzZS9CYXNlRGF0YVwiO1xuaW1wb3J0IENsYXNzRGVjb3JhdG9yIGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0NsYXNzRGVjb3JhdG9yXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuXG5AQ2xhc3NEZWNvcmF0b3IuY2xhc3NuYW1lXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsRGF0YSBleHRlbmRzIEJhc2VEYXRhIHtcblxuICAgIC8vIHB1YmxpYyBnYW1lTGlzdDogTVNULklSb29tSW5mb1tdID0gbnVsbDtcbiAgICBwdWJsaWMgZ2FtZXMgPSBudWxsO1xuICAgIC8vIHB1YmxpYyB3aW5SYW5rTGlzdDogTVNULlVuaXRSYW5rSW5mb1tdID0gbnVsbDtcbiAgICBwdWJsaWMgd2luUmFua0xpc3Q6IE1TVC5SYW5rSW5mb0NlbGxbXSA9IG51bGw7XG4gICAgcHVibGljIGJldFJhbmtMaXN0OiBNU1QuQmV0SW5mb1tdID0gbnVsbDtcblxuICAgIHB1YmxpYyBzaWduaW5EYXRhOiBNU1QuUzJDX0dldFNpZ25lZEluZm8gPSBudWxsO1xuXG4gICAgcHVibGljIG5vdGljZSA9IFtdO1xuICAgIHB1YmxpYyBtaXNzaW9uTGlzdCA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcblxuICAgIH1cblxufSJdfQ==