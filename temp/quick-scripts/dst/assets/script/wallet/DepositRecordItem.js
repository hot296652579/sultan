
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/DepositRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2f95d2rL1OE4DCzN2L5lW3', 'DepositRecordItem');
// script/wallet/DepositRecordItem.ts

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
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let DepositRecordItem = class DepositRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDate = null;
        this.labChips = null;
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
        this.labChips.string = "";
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
        this.labDate.string = new Date(Number(data.depositTime)).format("yyyy/MM:dd hh:mm");
        this.labChips.string = NumberUtils_1.default.converToC(data.chips);
        this.labAmount.string = `+${data.amount}`;
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Label)
], DepositRecordItem.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], DepositRecordItem.prototype, "labChips", void 0);
__decorate([
    property(cc.Label)
], DepositRecordItem.prototype, "labAmount", void 0);
DepositRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], DepositRecordItem);
exports.default = DepositRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L0RlcG9zaXRSZWNvcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkRBQTBEO0FBQzFELDhFQUFzRDtBQUN0RCx1REFBbUU7QUFFbkUsa0VBQWtFO0FBQ2xFLDBEQUF1RDtBQUV2RCxvRUFBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxnQkFBTTtJQUFyRDs7UUFJWSxZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUVuQyxLQUFLO1FBQ0csVUFBSyxHQUFzQixJQUFJLENBQUM7SUFtRDVDLENBQUM7SUFqREcsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLEtBQUs7SUFFZixDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVTLGFBQWE7UUFDbkIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXRCLElBQUksZ0NBQXNCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFFaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUF1QjtRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcscUJBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTlDLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVwQixDQUFDO0NBRUosQ0FBQTtBQTVERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ2U7QUFHbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDZ0I7QUFWbEIsaUJBQWlCO0lBRnJDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGlCQUFpQixDQWdFckM7a0JBaEVvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcG9zaXRSZWNvcmRJdGVtIGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiRGF0ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ2hpcHM6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkFtb3VudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8g5pWw5o2uXG4gICAgcHJpdmF0ZSBfZGF0YTogTVNULkRlcG9zaXRSZWNvcmQgPSBudWxsO1xuXG4gICAgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkRhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJBbW91bnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJDaGlwcy5zdHJpbmcgPSBcIlwiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvdyhkYXRhOiBNU1QuRGVwb3NpdFJlY29yZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcblxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5sYWJEYXRlLnN0cmluZyA9IG5ldyBEYXRlKE51bWJlcihkYXRhLmRlcG9zaXRUaW1lKSkuZm9ybWF0KFwieXl5eS9NTTpkZCBoaDptbVwiKTtcbiAgICAgICAgdGhpcy5sYWJDaGlwcy5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoZGF0YS5jaGlwcyk7XG4gICAgICAgIHRoaXMubGFiQW1vdW50LnN0cmluZyA9IGArJHtkYXRhLmFtb3VudH1gO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcblxuICAgIH1cblxufVxuIl19