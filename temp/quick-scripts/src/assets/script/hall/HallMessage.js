"use strict";
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