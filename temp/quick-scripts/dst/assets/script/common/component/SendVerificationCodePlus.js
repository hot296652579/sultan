
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/SendVerificationCodePlus.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8cc7fW3gehA56CdDr4Y/JdB', 'SendVerificationCodePlus');
// script/common/component/SendVerificationCodePlus.ts

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
const SendVerificationCode_1 = __importDefault(require("./SendVerificationCode"));
const { ccclass, property } = cc._decorator;
let SendVerificationCodePlus = class SendVerificationCodePlus extends SendVerificationCode_1.default {
    constructor() {
        super(...arguments);
        this.prebg = null;
    }
    onLoad() {
        super.onLoad();
        this.countDownEnd();
    }
    doSendVerificationCode(msg) {
        super.doSendVerificationCode(msg);
        this.countDownEnd();
    }
    _doStartTime() {
        super._doStartTime();
        this.prebg.active = false;
    }
    countDownEnd() {
        this.prebg.active = true;
        this.label.string = "";
    }
    sendFail() {
        super.sendFail();
        this.countDownEnd();
    }
};
__decorate([
    property(cc.Node)
], SendVerificationCodePlus.prototype, "prebg", void 0);
SendVerificationCodePlus = __decorate([
    ccclass
], SendVerificationCodePlus);
exports.default = SendVerificationCodePlus;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9TZW5kVmVyaWZpY2F0aW9uQ29kZVBsdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrRkFBMEQ7QUFFMUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLHdCQUF3QixHQUE3QyxNQUFxQix3QkFBeUIsU0FBUSw4QkFBb0I7SUFBMUU7O1FBR0ksVUFBSyxHQUFZLElBQUksQ0FBQztJQXNCMUIsQ0FBQztJQXBCRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxzQkFBc0IsQ0FBQyxHQUFHO1FBQ3RCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUNELFlBQVk7UUFDUixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFDRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNKLENBQUE7QUF0Qkc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDSTtBQUhMLHdCQUF3QjtJQUQ1QyxPQUFPO0dBQ2Esd0JBQXdCLENBeUI1QztrQkF6Qm9CLHdCQUF3QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFNlbmRWZXJpZmljYXRpb25Db2RlIGZyb20gXCIuL1NlbmRWZXJpZmljYXRpb25Db2RlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZpY2F0aW9uQ29kZVBsdXMgZXh0ZW5kcyBTZW5kVmVyaWZpY2F0aW9uQ29kZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcmViZzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvdW50RG93bkVuZCgpO1xuICAgIH1cbiAgICBkb1NlbmRWZXJpZmljYXRpb25Db2RlKG1zZykge1xuICAgICAgICBzdXBlci5kb1NlbmRWZXJpZmljYXRpb25Db2RlKG1zZylcbiAgICAgICAgdGhpcy5jb3VudERvd25FbmQoKVxuICAgIH1cbiAgICBfZG9TdGFydFRpbWUoKSB7XG4gICAgICAgIHN1cGVyLl9kb1N0YXJ0VGltZSgpO1xuICAgICAgICB0aGlzLnByZWJnLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjb3VudERvd25FbmQoKSB7XG4gICAgICAgIHRoaXMucHJlYmcuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlwiO1xuICAgIH1cbiAgICBzZW5kRmFpbCgpe1xuICAgICAgICBzdXBlci5zZW5kRmFpbCgpO1xuICAgICAgICB0aGlzLmNvdW50RG93bkVuZCgpO1xuICAgIH1cbn1cbiJdfQ==