
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallMessage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d2ecWmZg9Kr7TB+OBcCwNn', 'HallMessage');
// script/hall/HallMessage.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMoney = exports.TestData = exports.SubCmd = exports.MainCmd = void 0;
const CommonService_1 = require("../common/net/CommonService");
const JsonMessage_1 = require("../framework/net/JsonMessage");
exports.MainCmd = {
    LOBBY_UPDATE: 2001,
    GATEWAY: 1001,
};
exports.SubCmd = {
    UPDATE_MONEY: 100,
};
class TestData extends CommonService_1.CommonMessage {
    constructor() {
        super(...arguments);
        this.test = "my test";
    }
}
__decorate([
    JsonMessage_1.serialize("test", String)
], TestData.prototype, "test", void 0);
exports.TestData = TestData;
class UpdateMoney extends CommonService_1.CommonMessage {
    constructor() {
        super(...arguments);
        this.mainCmd = exports.MainCmd.LOBBY_UPDATE;
        this.count = 1000;
    }
}
__decorate([
    JsonMessage_1.serialize("count", Number)
], UpdateMoney.prototype, "count", void 0);
exports.UpdateMoney = UpdateMoney;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsTWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBMkQ7QUFDM0QsOERBQXlEO0FBRTlDLFFBQUEsT0FBTyxHQUFHO0lBQ2pCLFlBQVksRUFBRyxJQUFJO0lBQ25CLE9BQU8sRUFBRyxJQUFJO0NBRWpCLENBQUE7QUFFVSxRQUFBLE1BQU0sR0FBRztJQUNoQixZQUFZLEVBQUcsR0FBRztDQUNyQixDQUFBO0FBRUQsTUFBYSxRQUFTLFNBQVEsNkJBQWE7SUFBM0M7O1FBR0ksU0FBSSxHQUFZLFNBQVMsQ0FBQztJQUU5QixDQUFDO0NBQUE7QUFGRztJQURDLHVCQUFTLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQztzQ0FDQztBQUg5Qiw0QkFLQztBQUVELE1BQWEsV0FBWSxTQUFRLDZCQUFhO0lBQTlDOztRQUNJLFlBQU8sR0FBRyxlQUFPLENBQUMsWUFBWSxDQUFDO1FBRS9CLFVBQUssR0FBWSxJQUFJLENBQUM7SUFDMUIsQ0FBQztDQUFBO0FBREc7SUFEQyx1QkFBUyxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7MENBQ0o7QUFIMUIsa0NBSUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25NZXNzYWdlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiXG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9Kc29uTWVzc2FnZVwiO1xuXG5leHBvcnQgbGV0IE1haW5DbWQgPSB7XG4gICAgTE9CQllfVVBEQVRFIDogMjAwMSxcbiAgICBHQVRFV0FZIDogMTAwMSxcblxufVxuXG5leHBvcnQgbGV0IFN1YkNtZCA9IHtcbiAgICBVUERBVEVfTU9ORVkgOiAxMDAsXG59XG5cbmV4cG9ydCBjbGFzcyBUZXN0RGF0YSBleHRlbmRzIENvbW1vbk1lc3NhZ2V7XG5cbiAgICBAc2VyaWFsaXplKFwidGVzdFwiLFN0cmluZylcbiAgICB0ZXN0IDogc3RyaW5nID0gXCJteSB0ZXN0XCI7XG5cbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZU1vbmV5IGV4dGVuZHMgQ29tbW9uTWVzc2FnZSB7XG4gICAgbWFpbkNtZCA9IE1haW5DbWQuTE9CQllfVVBEQVRFO1xuICAgIEBzZXJpYWxpemUoXCJjb3VudFwiLE51bWJlcilcbiAgICBjb3VudCA6IG51bWJlciA9IDEwMDA7XG59XG5cblxuXG4iXX0=