
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/AttractRecordView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72fa8J1mAhLFob2IyE5ejTO', 'AttractRecordView');
// script/wallet/AttractRecordView.ts

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
const ListView_1 = __importDefault(require("../common/component/ListView"));
const NoneItem_1 = __importDefault(require("../common/item/NoneItem"));
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const TypeUtils_1 = __importDefault(require("../common/utils/TypeUtils"));
const AppData_1 = __importDefault(require("../data/AppData"));
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
// 每页数量
const PAGE_COUNT = 10;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = 0;
const { ccclass, property } = cc._decorator;
let AttractRecordView = class AttractRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDate = null;
        this.labBankCode = null;
        this.labAmount = null;
        this.lsvRecord = null;
        this.titleItem = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // 是否最后一页
        this._isLastPage = false;
        // 个人历史下注数据列表
        this._dataList = null;
        this.currentIndexPage = 0;
    }
    static getPrefabUrl() {
        return "wallet/prefabes/AttractRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.C2S_MyRecord();
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    initData() {
        this._appData = G.DataMgr.get(AppData_1.default);
        this._isLastPage = false;
        this._dataList = [];
    }
    initView() {
        // this.labGameNoTitle.string = "";
        // this.labDate.string = "";
        // this.labBankCode.string = "";
        // this.labAmount.string = "";
        // this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_L2C_WithdrawRecord", this.onEvent_L2C_WithdrawRecord);
    }
    onLanguageChange() {
    }
    getLastRecordId() {
        let id;
        id = this.currentIndexPage + PAGE_COUNT;
        return id;
    }
    /**
     * 查询历史记录
     * @param id {number} id 为了避免查询后，出现重复数据 首次请求默认为 -1 （查询后的数据不包含自身 ID）
     */
    C2S_MyRecord(index) {
        if (TypeUtils_1.default.isNull(index)) {
            index = DEFAULT_FIRST_ID;
        }
        let data = {
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            index,
            limit: PAGE_COUNT,
        };
        console.log('C2S_MyRecord ->index :' + index);
        let req = protoc_1.MST.C2L_GetWithdrawReocrds_Req.create(data);
        let buffer = protoc_1.MST.C2L_GetWithdrawReocrds_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2L_GetWithdrawReocrds_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetWithdrawReocrds_Req, buffer);
    }
    onEvent_L2C_WithdrawRecord(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        this.currentIndexPage = data.index;
        if (data.records.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.records.length < PAGE_COUNT;
        this._dataList = this._dataList.concat(data.records);
        this.lsvRecord.insert(data.records);
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnClose":
                this.close();
                break;
        }
    }
    /**
     * 上拉回调
     * @param target
     */
    onPullTop(target) {
        this.C2S_MyRecord(0);
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览个人历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2S_MyRecord(this.getLastRecordId());
    }
};
__decorate([
    property(cc.Label)
], AttractRecordView.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], AttractRecordView.prototype, "labBankCode", void 0);
__decorate([
    property(cc.Label)
], AttractRecordView.prototype, "labAmount", void 0);
__decorate([
    property(ListView_1.default)
], AttractRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(cc.Node)
], AttractRecordView.prototype, "titleItem", void 0);
__decorate([
    property(NoneItem_1.default)
], AttractRecordView.prototype, "noneItem", void 0);
AttractRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AttractRecordView);
exports.default = AttractRecordView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L0F0dHJhY3RSZWNvcmRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQW9EO0FBQ3BELHVFQUErQztBQUMvQyx1REFBb0Q7QUFDcEQsNkRBQTBEO0FBQzFELDBFQUFrRDtBQUNsRCw4REFBc0M7QUFDdEMsdURBQW1FO0FBRW5FLGtFQUFrRTtBQUNsRSwwREFBdUQ7QUFDdkQseURBQW1EO0FBQ25ELG9FQUE0QztBQUM1QyxvRUFBNEM7QUFHNUMsT0FBTztBQUNQLE1BQU0sVUFBVSxHQUFXLEVBQUUsQ0FBQztBQUM5QixPQUFPO0FBQ1AsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO0FBQ3BDLGNBQWM7QUFDZCxNQUFNLGdCQUFnQixHQUFXLENBQUMsQ0FBQztBQUVuQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLGdCQUFNO0lBQXJEOztRQUlZLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsYUFBUSxHQUFhLElBQUksQ0FBQztRQUVsQyxTQUFTO1FBQ0QsYUFBUSxHQUFZLElBQUksQ0FBQztRQUNqQyxTQUFTO1FBQ0QsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDckMsYUFBYTtRQUNMLGNBQVMsR0FBMEIsSUFBSSxDQUFDO1FBQ2hELHFCQUFnQixHQUFXLENBQUMsQ0FBQztJQWdJakMsQ0FBQztJQTlIVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLG1DQUFtQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFD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SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDZ0I7QUFHbEM7SUFEQyxRQUFRLENBQUMsa0JBQVEsQ0FBQzttREFDZTtBQW5CakIsaUJBQWlCO0lBRnJDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGlCQUFpQixDQTJKckM7a0JBM0pvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvTGlzdFZpZXdcIjtcbmltcG9ydCBOb25lSXRlbSBmcm9tIFwiLi4vY29tbW9uL2l0ZW0vTm9uZUl0ZW1cIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi9jb21tb24vdXRpbHMvVHlwZVV0aWxzXCI7XG5pbXBvcnQgQXBwRGF0YSBmcm9tIFwiLi4vZGF0YS9BcHBEYXRhXCI7XG5pbXBvcnQgeyBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5cblxuLy8g5q+P6aG15pWw6YePXG5jb25zdCBQQUdFX0NPVU5UOiBudW1iZXIgPSAxMDtcbi8vIOS4gOWkqeavq+enklxuY29uc3QgT05FX0RBWV9NUzogbnVtYmVyID0gODY0MDAwMDA7XG4vLyDpu5jorqTpppbmrKHor7fmsYLliIbpobUgSURcbmNvbnN0IERFRkFVTFRfRklSU1RfSUQ6IG51bWJlciA9IDA7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0UmVjb3JkVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkRhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJhbmtDb2RlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJBbW91bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcbiAgICBwcml2YXRlIGxzdlJlY29yZDogTGlzdFZpZXcgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSB0aXRsZUl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KE5vbmVJdGVtKVxuICAgIHByaXZhdGUgbm9uZUl0ZW06IE5vbmVJdGVtID0gbnVsbDtcblxuICAgIC8vIEFwcCDmlbDmja5cbiAgICBwcml2YXRlIF9hcHBEYXRhOiBBcHBEYXRhID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmnIDlkI7kuIDpobVcbiAgICBwcml2YXRlIF9pc0xhc3RQYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5Liq5Lq65Y6G5Y+y5LiL5rOo5pWw5o2u5YiX6KGoXG4gICAgcHJpdmF0ZSBfZGF0YUxpc3Q6IE1TVC5JV2l0aERyYXdSZWNvcmRbXSA9IG51bGw7XG4gICAgY3VycmVudEluZGV4UGFnZTogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJ3YWxsZXQvcHJlZmFiZXMvQXR0cmFjdFJlY29yZFZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuXG4gICAgICAgIHRoaXMuQzJTX015UmVjb3JkKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdyhhcmdzPzogYW55W10pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcblxuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hcHBEYXRhID0gRy5EYXRhTWdyLmdldChBcHBEYXRhKTtcbiAgICAgICAgdGhpcy5faXNMYXN0UGFnZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kYXRhTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIC8vIHRoaXMubGFiR2FtZU5vVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgLy8gdGhpcy5sYWJEYXRlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIC8vIHRoaXMubGFiQmFua0NvZGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgLy8gdGhpcy5sYWJBbW91bnQuc3RyaW5nID0gXCJcIjtcblxuICAgICAgICAvLyB0aGlzLm5vbmVJdGVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIGlmIChFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuQ0hBTkdFX0xBTkdVQUdFLCB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTDJDX1dpdGhkcmF3UmVjb3JkXCIsIHRoaXMub25FdmVudF9MMkNfV2l0aGRyYXdSZWNvcmQpO1xuXG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TGFzdFJlY29yZElkKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBpZDtcbiAgICAgICAgaWQgPSB0aGlzLmN1cnJlbnRJbmRleFBhZ2UgKyBQQUdFX0NPVU5UO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5p+l6K+i5Y6G5Y+y6K6w5b2VXG4gICAgICogQHBhcmFtIGlkIHtudW1iZXJ9IGlkIOS4uuS6humBv+WFjeafpeivouWQju+8jOWHuueOsOmHjeWkjeaVsOaNriDpppbmrKHor7fmsYLpu5jorqTkuLogLTEg77yI5p+l6K+i5ZCO55qE5pWw5o2u5LiN5YyF5ZCr6Ieq6LqrIElE77yJXG4gICAgICovXG4gICAgcHJpdmF0ZSBDMlNfTXlSZWNvcmQoaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IERFRkFVTFRfRklSU1RfSUQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YTogTVNULkMyTF9HZXRXaXRoZHJhd1Jlb2NyZHNfUmVxID0ge1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBsaW1pdDogUEFHRV9DT1VOVCxcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnQzJTX015UmVjb3JkIC0+aW5kZXggOicgKyBpbmRleCk7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJMX0dldFdpdGhkcmF3UmVvY3Jkc19SZXEuY3JlYXRlKGRhdGEpO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9HZXRXaXRoZHJhd1Jlb2NyZHNfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJMX0dldFdpdGhkcmF3UmVvY3Jkc19SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfR2V0V2l0aGRyYXdSZW9jcmRzX1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRfTDJDX1dpdGhkcmF3UmVjb3JkKGRhdGE6IE1TVC5MMkNfR2V0V2l0aGRyYXdSZWNvcmRzX1Jlcyk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXhQYWdlID0gZGF0YS5pbmRleDtcbiAgICAgICAgaWYgKGRhdGEucmVjb3Jkcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5piv5ZCm5pyA5ZCO5LiA6aG1XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBkYXRhLnJlY29yZHMubGVuZ3RoIDwgUEFHRV9DT1VOVDtcbiAgICAgICAgdGhpcy5fZGF0YUxpc3QgPSB0aGlzLl9kYXRhTGlzdC5jb25jYXQoZGF0YS5yZWNvcmRzKTtcbiAgICAgICAgdGhpcy5sc3ZSZWNvcmQuaW5zZXJ0KGRhdGEucmVjb3Jkcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIrmi4nlm57osINcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxuICAgICAqL1xuICAgIHByaXZhdGUgb25QdWxsVG9wKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5DMlNfTXlSZWNvcmQoMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5ouJ5Zue6LCDXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblB1bGxCb3R0b20odGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faXNMYXN0UGFnZSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwiQ3Jhc2gg5rWP6KeI5Liq5Lq65Y6G5Y+y6K6w5b2VIOW3suaYr+acgOWQjuS4gOmhtSDml6DpnIDor7fmsYLnv7vpobVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5DMlNfTXlSZWNvcmQodGhpcy5nZXRMYXN0UmVjb3JkSWQoKSk7XG4gICAgfVxuXG59XG4iXX0=