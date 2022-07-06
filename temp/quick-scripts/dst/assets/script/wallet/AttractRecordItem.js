
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/AttractRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '704d3yTVDtDka5/Gd1ffi2B', 'AttractRecordItem');
// script/wallet/AttractRecordItem.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let AttractRecordItem = class AttractRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDate = null;
        this.labBankCode = null;
        this.labBankNum = null;
        this.labAmount = null;
        // 数据
        this._data = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
        this._data = null;
    }
    initView() {
        this.labDate.string = "";
        this.labAmount.string = "";
        this.labBankCode.string = "";
        this.labBankNum.string = "";
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labDate.string = new Date(Number(data.withdrawTime)).format("yyyy/MM:dd hh:mm");
        this.labBankCode.string = data.bankCode;
        this.labBankNum.string = data.backNo;
        this.labAmount.string = `+${data.amount}`;
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labBankCode", void 0);
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labBankNum", void 0);
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labAmount", void 0);
AttractRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AttractRecordItem);
exports.default = AttractRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L0F0dHJhY3RSZWNvcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkRBQTBEO0FBRTFELHVEQUFtRTtBQUVuRSxrRUFBa0U7QUFDbEUsMERBQXVEO0FBRXZELG9FQUE0QztBQUU1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLGdCQUFNO0lBQXJEOztRQUlZLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFFN0IsZUFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRW5DLEtBQUs7UUFDRyxVQUFLLEdBQXVCLElBQUksQ0FBQztJQXFEN0MsQ0FBQztJQW5ERyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsS0FBSztJQUVmLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVTLGFBQWE7UUFDbkIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXRCLElBQUksZ0NBQXNCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFFaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUF3QjtRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTlDLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVwQixDQUFDO0NBRUosQ0FBQTtBQWhFRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ2tCO0FBRXJDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ2lCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ2dCO0FBWmxCLGlCQUFpQjtJQUZyQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixpQkFBaUIsQ0FvRXJDO2tCQXBFb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vY29tbW9uL3V0aWxzL051bWJlclV0aWxzXCI7XG5pbXBvcnQgeyBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0UmVjb3JkSXRlbSBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkRhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJhbmtDb2RlOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQmFua051bTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQW1vdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyDmlbDmja5cbiAgICBwcml2YXRlIF9kYXRhOiBNU1QuV2l0aERyYXdSZWNvcmQgPSBudWxsO1xuXG4gICAgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkRhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJBbW91bnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCYW5rQ29kZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkJhbmtOdW0uc3RyaW5nID0gXCJcIjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIGlmIChFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuQ0hBTkdFX0xBTkdVQUdFLCB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3coZGF0YTogTVNULldpdGhEcmF3UmVjb3JkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZSgpO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxhYkRhdGUuc3RyaW5nID0gbmV3IERhdGUoTnVtYmVyKGRhdGEud2l0aGRyYXdUaW1lKSkuZm9ybWF0KFwieXl5eS9NTTpkZCBoaDptbVwiKTtcbiAgICAgICAgdGhpcy5sYWJCYW5rQ29kZS5zdHJpbmcgPSBkYXRhLmJhbmtDb2RlO1xuICAgICAgICB0aGlzLmxhYkJhbmtOdW0uc3RyaW5nID0gZGF0YS5iYWNrTm87XG4gICAgICAgIHRoaXMubGFiQW1vdW50LnN0cmluZyA9IGArJHtkYXRhLmFtb3VudH1gO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcblxuICAgIH1cblxufVxuIl19