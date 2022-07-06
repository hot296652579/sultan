
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/MultiCurrency/EnterRealFieldNotiPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c95a6CwOV9G0Lls/wuqTq5O', 'EnterRealFieldNotiPanel');
// script/MultiCurrency/EnterRealFieldNotiPanel.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Global_1 = require("../global/Global");
const Manager_1 = require("../common/manager/Manager");
const RechargePayView_1 = __importDefault(require("../recharge/RechargePayView"));
const { ccclass, property } = cc._decorator;
let EnterRealFieldNotiPanel = class EnterRealFieldNotiPanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lbl_content = null;
    }
    static getPrefabUrl() {
        return "MultiCurrency/prefabs/EnterRealFieldNotiPanel";
    }
    show() {
        this.content = this.node.getChildByName("content");
        this.showWithAction(true);
        this.lbl_content.string = LanguageImpl_1.i18n.EXPERIENCE_FIELD.enterRealField;
        Manager_1.Manager.uiManager.close(RechargePayView_1.default);
    }
    onClick() {
        // this.closeWithAction();
        Global_1.reStartGame();
    }
};
__decorate([
    property(cc.Label)
], EnterRealFieldNotiPanel.prototype, "lbl_content", void 0);
EnterRealFieldNotiPanel = __decorate([
    ccclass
], EnterRealFieldNotiPanel);
exports.default = EnterRealFieldNotiPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvTXVsdGlDdXJyZW5jeS9FbnRlclJlYWxGaWVsZE5vdGlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUM1QyxrRUFBdUQ7QUFDdkQsNkNBQStDO0FBQy9DLHVEQUFvRDtBQUNwRCxrRkFBMEQ7QUFFMUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLHVCQUF1QixHQUE1QyxNQUFxQix1QkFBd0IsU0FBUSxnQkFBTTtJQUEzRDs7UUFHSSxnQkFBVyxHQUFhLElBQUksQ0FBQztJQWNqQyxDQUFDO0lBYlUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTywrQ0FBK0MsQ0FBQTtJQUMxRCxDQUFDO0lBQ0QsSUFBSTtRQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxtQkFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztRQUMvRCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMseUJBQWUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRCxPQUFPO1FBQ0gsMEJBQTBCO1FBQzFCLG9CQUFXLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0osQ0FBQTtBQWRHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NERBQ1U7QUFIWix1QkFBdUI7SUFEM0MsT0FBTztHQUNhLHVCQUF1QixDQWlCM0M7a0JBakJvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IHJlU3RhcnRHYW1lIH0gZnJvbSBcIi4uL2dsb2JhbC9HbG9iYWxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IFJlY2hhcmdlUGF5VmlldyBmcm9tIFwiLi4vcmVjaGFyZ2UvUmVjaGFyZ2VQYXlWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlclJlYWxGaWVsZE5vdGlQYW5lbCBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJsX2NvbnRlbnQ6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCJNdWx0aUN1cnJlbmN5L3ByZWZhYnMvRW50ZXJSZWFsRmllbGROb3RpUGFuZWxcIlxuICAgIH1cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpXG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIHRoaXMubGJsX2NvbnRlbnQuc3RyaW5nID0gaTE4bi5FWFBFUklFTkNFX0ZJRUxELmVudGVyUmVhbEZpZWxkO1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5jbG9zZShSZWNoYXJnZVBheVZpZXcpO1xuICAgIH1cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICAvLyB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICByZVN0YXJ0R2FtZSgpO1xuICAgIH1cbn1cbiJdfQ==