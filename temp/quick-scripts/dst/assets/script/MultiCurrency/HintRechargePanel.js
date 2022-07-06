
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/MultiCurrency/HintRechargePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1289ajHfvNFUZmDO8exe8VJ', 'HintRechargePanel');
// script/MultiCurrency/HintRechargePanel.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const User_1 = require("../global/User");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Defines_1 = require("../framework/base/Defines");
const { ccclass, property } = cc._decorator;
let HintRechargePanel = class HintRechargePanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lbl_god = null;
        this.lbl_hit = null;
    }
    static getPrefabUrl() {
        return "MultiCurrency/prefabs/HintRechargePanel";
    }
    show(args) {
        let goldTypeExchange = args[0];
        this.scheduleOnce(this.close, 3);
        this.lbl_god.string = UtilMgr_1.UtilMgr.changeMoney(User_1.User._gold);
        this.lbl_hit.string = goldTypeExchange == 1 ? LanguageImpl_1.i18n.EXPERIENCE_FIELD.hintRecharge : LanguageImpl_1.i18n.EXPERIENCE_FIELD.hintChipCount;
    }
    playDefaultEffect(name = "") {
        switch (name) {
            case 'shop':
            case 'addGold':
                this.audioHelper.playEffect("common/audio/RechargeBtn", Defines_1.BUNDLE_RESOURCES);
                break;
            default:
                super.playDefaultEffect(name);
                break;
        }
    }
    onClick(name) {
        switch (name) {
            case "continue":
                break;
            case "addGold":
                dispatch("openRechargeView");
                break;
        }
        this.close();
    }
};
__decorate([
    property(cc.Label)
], HintRechargePanel.prototype, "lbl_god", void 0);
__decorate([
    property(cc.Label)
], HintRechargePanel.prototype, "lbl_hit", void 0);
HintRechargePanel = __decorate([
    ccclass
], HintRechargePanel);
exports.default = HintRechargePanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvTXVsdGlDdXJyZW5jeS9IaW50UmVjaGFyZ2VQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUM1QywrQ0FBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLGtFQUF1RDtBQUN2RCx1REFBNkQ7QUFFN0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxnQkFBTTtJQUFyRDs7UUFHSSxZQUFPLEdBQWEsSUFBSSxDQUFDO1FBRXpCLFlBQU8sR0FBYSxJQUFJLENBQUM7SUFnQzdCLENBQUM7SUE5QkcsTUFBTSxDQUFDLFlBQVk7UUFDZixPQUFPLHlDQUF5QyxDQUFBO0lBQ3BELENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSTtRQUNMLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsbUJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDM0gsQ0FBQztJQUNELGlCQUFpQixDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3ZCLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsMEJBQWdCLENBQUMsQ0FBQztnQkFDMUUsTUFBTTtZQUNWO2dCQUFTLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFJO1FBQ1IsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLFVBQVU7Z0JBQ1gsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDN0IsTUFBTTtTQUNiO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFBO0FBbENHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ007QUFFekI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDTTtBQUxSLGlCQUFpQjtJQURyQyxPQUFPO0dBQ2EsaUJBQWlCLENBcUNyQztrQkFyQ29CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaW50UmVjaGFyZ2VQYW5lbCBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJsX2dvZDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYmxfaGl0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJNdWx0aUN1cnJlbmN5L3ByZWZhYnMvSGludFJlY2hhcmdlUGFuZWxcIlxuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBsZXQgZ29sZFR5cGVFeGNoYW5nZSA9IGFyZ3NbMF07XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xvc2UsIDMpXG4gICAgICAgIHRoaXMubGJsX2dvZC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KFVzZXIuX2dvbGQpXG4gICAgICAgIHRoaXMubGJsX2hpdC5zdHJpbmcgPSBnb2xkVHlwZUV4Y2hhbmdlID09IDEgPyBpMThuLkVYUEVSSUVOQ0VfRklFTEQuaGludFJlY2hhcmdlIDogaTE4bi5FWFBFUklFTkNFX0ZJRUxELmhpbnRDaGlwQ291bnQ7XG4gICAgfVxuICAgIHBsYXlEZWZhdWx0RWZmZWN0KG5hbWUgPSBcIlwiKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnc2hvcCc6XG4gICAgICAgICAgICBjYXNlICdhZGRHb2xkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vUmVjaGFyZ2VCdG5cIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBzdXBlci5wbGF5RGVmYXVsdEVmZmVjdChuYW1lKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2xpY2sobmFtZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjb250aW51ZVwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFkZEdvbGRcIjpcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChcIm9wZW5SZWNoYXJnZVZpZXdcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbn1cbiJdfQ==