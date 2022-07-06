
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/base/BaseData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '73b74M7g2hBFJlsMJ9MPw5v', 'BaseData');
// script/base/BaseData.ts

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
const ClassDecorator_1 = __importDefault(require("../framework/decorator/ClassDecorator"));
let BaseData = class BaseData {
    constructor() {
    }
    destroy() {
    }
};
BaseData = __decorate([
    ClassDecorator_1.default.classname
], BaseData);
exports.default = BaseData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYmFzZS9CYXNlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJGQUFtRTtBQUduRSxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVE7SUFFekI7SUFFQSxDQUFDO0lBRU0sT0FBTztJQUVkLENBQUM7Q0FFSixDQUFBO0FBVm9CLFFBQVE7SUFENUIsd0JBQWMsQ0FBQyxTQUFTO0dBQ0osUUFBUSxDQVU1QjtrQkFWb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDbGFzc0RlY29yYXRvciBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9DbGFzc0RlY29yYXRvclwiO1xuXG5AQ2xhc3NEZWNvcmF0b3IuY2xhc3NuYW1lXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlRGF0YSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuXG4gICAgfVxuXG59Il19