
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/DeviceData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f8abbLQlIdJNI2E5m/bjURs', 'DeviceData');
// script/data/DeviceData.ts

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
let DeviceData = class DeviceData extends BaseData_1.default {
    constructor() {
        super();
        // 唯一码
        this.uuid = null;
        // 系统
        this.os = null;
        // 系统版本号
        this.osVersion = null;
    }
};
DeviceData = __decorate([
    ClassDecorator_1.default.classname
], DeviceData);
exports.default = DeviceData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZGF0YS9EZXZpY2VEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXdDO0FBQ3hDLDJGQUFtRTtBQUduRSxJQUFxQixVQUFVLEdBQS9CLE1BQXFCLFVBQVcsU0FBUSxrQkFBUTtJQVM1QztRQUNJLEtBQUssRUFBRSxDQUFDO1FBUlosTUFBTTtRQUNDLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDM0IsS0FBSztRQUNFLE9BQUUsR0FBVyxJQUFJLENBQUM7UUFDekIsUUFBUTtRQUNELGNBQVMsR0FBVyxJQUFJLENBQUM7SUFLaEMsQ0FBQztDQUdKLENBQUE7QUFmb0IsVUFBVTtJQUQ5Qix3QkFBYyxDQUFDLFNBQVM7R0FDSixVQUFVLENBZTlCO2tCQWZvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VEYXRhIGZyb20gXCIuLi9iYXNlL0Jhc2VEYXRhXCI7XG5pbXBvcnQgQ2xhc3NEZWNvcmF0b3IgZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvQ2xhc3NEZWNvcmF0b3JcIjtcblxuQENsYXNzRGVjb3JhdG9yLmNsYXNzbmFtZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV2aWNlRGF0YSBleHRlbmRzIEJhc2VEYXRhIHtcblxuICAgIC8vIOWUr+S4gOeggVxuICAgIHB1YmxpYyB1dWlkOiBzdHJpbmcgPSBudWxsO1xuICAgIC8vIOezu+e7n1xuICAgIHB1YmxpYyBvczogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDns7vnu5/niYjmnKzlj7dcbiAgICBwdWJsaWMgb3NWZXJzaW9uOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICB9XG5cblxufSJdfQ==