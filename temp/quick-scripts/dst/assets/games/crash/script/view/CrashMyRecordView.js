
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashMyRecordView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '24b448yqQNEDLueSt3Z+ohN', 'CrashMyRecordView');
// games/crash/script/view/CrashMyRecordView.ts

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
const ListView_1 = __importDefault(require("../../../../script/common/component/ListView"));
const NoneItem_1 = __importDefault(require("../../../../script/common/item/NoneItem"));
const TitleItemPage_1 = __importDefault(require("../../../../script/common/item/TitleItemPage"));
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const TypeUtils_1 = __importDefault(require("../../../../script/common/utils/TypeUtils"));
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const protoc_1 = require("../../../../script/framework/external/protoc");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
// 每页数量
const PAGE_COUNT = 20;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = -1;
const { ccclass, property } = cc._decorator;
let CrashMyRecordView = class CrashMyRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labGameNoTitle = null;
        this.labDate = null;
        this.labBetRate = null;
        this.labBetGold = null;
        this.labIncome = null;
        this.lsvRecord = null;
        this.titleItemPage = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // 是否最后一页
        this._isLastPage = false;
        // 个人历史下注数据列表
        this._dataList = null;
    }
    static getPrefabUrl() {
        return "prefabs/CrashMyRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.C2S_CrashMyRecord();
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
        this.labGameNoTitle.string = "";
        this.labDate.string = "";
        this.labBetRate.string = "";
        this.labBetGold.string = "";
        this.labIncome.string = "";
        this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_S2C_CrashMyRecord", this.onEvent_S2C_CrashMyRecord);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labMyRecordPageName", true));
        this.labGameNoTitle.language = Manager_1.Manager.makeLanguage("labGameNoTitle", true);
        this.labDate.language = Manager_1.Manager.makeLanguage("labDate", true);
        this.labBetRate.language = Manager_1.Manager.makeLanguage("labBetRate", true);
        this.labBetGold.language = Manager_1.Manager.makeLanguage("labBetGold", true);
        this.labIncome.language = Manager_1.Manager.makeLanguage("labIncome", true);
    }
    getLastRecordId() {
        let id = DEFAULT_FIRST_ID;
        if (this._dataList.length > 0) {
            let lastRecordData = this._dataList[this._dataList.length - 1];
            id = lastRecordData.id;
        }
        return id;
    }
    /**
     * 查询历史记录
     * @param id {number} id 为了避免查询后，出现重复数据 首次请求默认为 -1 （查询后的数据不包含自身 ID）
     */
    C2S_CrashMyRecord(id) {
        if (TypeUtils_1.default.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }
        let data = {
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            id: id,
            count: PAGE_COUNT,
        };
        let req = protoc_1.MST.C2S_CrashMyRecord.create(data);
        let buffer = protoc_1.MST.C2S_CrashMyRecord.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2S_CrashMyRecord, protoc_1.MST.OuterOpcode_CrashGame.C2S_CrashMyRecord, buffer);
    }
    onEvent_S2C_CrashMyRecord(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        if (data.id === DEFAULT_FIRST_ID && data.myRecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.myRecordInfo.length < PAGE_COUNT;
        if (data.id === DEFAULT_FIRST_ID) {
            this._dataList = [].concat(data.myRecordInfo);
            this.lsvRecord.set(data.myRecordInfo);
        }
        else {
            this._dataList = this._dataList.concat(data.myRecordInfo);
            this.lsvRecord.insert(data.myRecordInfo);
        }
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
        this.C2S_CrashMyRecord();
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览个人历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2S_CrashMyRecord(this.getLastRecordId());
    }
};
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labGameNoTitle", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labBetRate", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labBetGold", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labIncome", void 0);
__decorate([
    property(ListView_1.default)
], CrashMyRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(TitleItemPage_1.default)
], CrashMyRecordView.prototype, "titleItemPage", void 0);
__decorate([
    property(NoneItem_1.default)
], CrashMyRecordView.prototype, "noneItem", void 0);
CrashMyRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashMyRecordView);
exports.default = CrashMyRecordView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaE15UmVjb3JkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRGQUFvRTtBQUNwRSx1RkFBK0Q7QUFDL0QsaUdBQXlFO0FBQ3pFLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFDMUUsMEZBQWtFO0FBQ2xFLDhFQUFzRDtBQUN0RCx1RUFBbUY7QUFFbkYsa0ZBQWtGO0FBQ2xGLDBFQUF1RTtBQUV2RSx5RUFBbUU7QUFDbkUsb0ZBQTREO0FBQzVELG9GQUE0RDtBQUU1RCxPQUFPO0FBQ1AsTUFBTSxVQUFVLEdBQVcsRUFBRSxDQUFDO0FBQzlCLE9BQU87QUFDUCxNQUFNLFVBQVUsR0FBVyxRQUFRLENBQUM7QUFDcEMsY0FBYztBQUNkLE1BQU0sZ0JBQWdCLEdBQVcsQ0FBQyxDQUFDLENBQUM7QUFFcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxnQkFBTTtJQUFyRDs7UUFJWSxtQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsZUFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0Isa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBR3BDLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFFbEMsU0FBUztRQUNELGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDakMsU0FBUztRQUNELGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQ3JDLGFBQWE7UUFDTCxjQUFTLEdBQXdCLElBQUksQ0FBQztJQWlKbEQsQ0FBQztJQS9JVSxNQUFNLENBQUMsWUFBWTtRQUN0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QUM7eURBQ3FCO0FBR3hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ2M7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDaUI7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDaUI7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDZ0I7QUFHbkM7SUFEQyxRQUFRLENBQUMsa0JBQVEsQ0FBQztvREFDZ0I7QUFHbkM7SUFEQyxRQUFRLENBQUMsdUJBQWEsQ0FBQzt3REFDb0I7QUFHNUM7SUFEQyxRQUFRLENBQUMsa0JBQVEsQ0FBQzttREFDZTtBQXpCakIsaUJBQWlCO0lBRnJDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGlCQUFpQixDQWlMckM7a0JBakxvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vY29tcG9uZW50L0xpc3RWaWV3XCI7XG5pbXBvcnQgTm9uZUl0ZW0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vaXRlbS9Ob25lSXRlbVwiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2UgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vaXRlbS9UaXRsZUl0ZW1QYWdlXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IEFwcERhdGEgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9tc2dib3gvUGFuZWxIZWxwXCI7XG5cbi8vIOavj+mhteaVsOmHj1xuY29uc3QgUEFHRV9DT1VOVDogbnVtYmVyID0gMjA7XG4vLyDkuIDlpKnmr6vnp5JcbmNvbnN0IE9ORV9EQVlfTVM6IG51bWJlciA9IDg2NDAwMDAwO1xuLy8g6buY6K6k6aaW5qyh6K+35rGC5YiG6aG1IElEXG5jb25zdCBERUZBVUxUX0ZJUlNUX0lEOiBudW1iZXIgPSAtMTtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXNoTXlSZWNvcmRWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiR2FtZU5vVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkRhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldFJhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldEdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkluY29tZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxuICAgIHByaXZhdGUgbHN2UmVjb3JkOiBMaXN0VmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoVGl0bGVJdGVtUGFnZSlcbiAgICBwcml2YXRlIHRpdGxlSXRlbVBhZ2U6IFRpdGxlSXRlbVBhZ2UgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KE5vbmVJdGVtKVxuICAgIHByaXZhdGUgbm9uZUl0ZW06IE5vbmVJdGVtID0gbnVsbDtcblxuICAgIC8vIEFwcCDmlbDmja5cbiAgICBwcml2YXRlIF9hcHBEYXRhOiBBcHBEYXRhID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmnIDlkI7kuIDpobVcbiAgICBwcml2YXRlIF9pc0xhc3RQYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5Liq5Lq65Y6G5Y+y5LiL5rOo5pWw5o2u5YiX6KGoXG4gICAgcHJpdmF0ZSBfZGF0YUxpc3Q6IE1TVC5JTXlSZWNvcmRJbmZvW10gPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInByZWZhYnMvQ3Jhc2hNeVJlY29yZFZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuXG4gICAgICAgIHRoaXMuQzJTX0NyYXNoTXlSZWNvcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KGFyZ3M/OiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuXG4gICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICB0aGlzLl9pc0xhc3RQYWdlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RhdGFMaXN0ID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJHYW1lTm9UaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkRhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCZXRSYXRlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQmV0R29sZC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkluY29tZS5zdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMubm9uZUl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9TMkNfQ3Jhc2hNeVJlY29yZFwiLCB0aGlzLm9uRXZlbnRfUzJDX0NyYXNoTXlSZWNvcmQpO1xuXG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy50aXRsZUl0ZW1QYWdlLmxhbmd1YWdlUGFnZU5hbWUoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJNeVJlY29yZFBhZ2VOYW1lXCIsIHRydWUpKTtcblxuICAgICAgICB0aGlzLmxhYkdhbWVOb1RpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJHYW1lTm9UaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJEYXRlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJEYXRlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYkJldFJhdGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkJldFJhdGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiQmV0R29sZC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiQmV0R29sZFwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJJbmNvbWUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkluY29tZVwiLCB0cnVlKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TGFzdFJlY29yZElkKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBpZDogbnVtYmVyID0gREVGQVVMVF9GSVJTVF9JRDtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBsYXN0UmVjb3JkRGF0YTogTVNULklNeVJlY29yZEluZm8gPSB0aGlzLl9kYXRhTGlzdFt0aGlzLl9kYXRhTGlzdC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlkID0gbGFzdFJlY29yZERhdGEuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOafpeivouWOhuWPsuiusOW9lVxuICAgICAqIEBwYXJhbSBpZCB7bnVtYmVyfSBpZCDkuLrkuobpgb/lhY3mn6Xor6LlkI7vvIzlh7rnjrDph43lpI3mlbDmja4g6aaW5qyh6K+35rGC6buY6K6k5Li6IC0xIO+8iOafpeivouWQjueahOaVsOaNruS4jeWMheWQq+iHqui6qyBJRO+8iVxuICAgICAqL1xuICAgIHByaXZhdGUgQzJTX0NyYXNoTXlSZWNvcmQoaWQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaWQpKSB7XG4gICAgICAgICAgICBpZCA9IERFRkFVTFRfRklSU1RfSUQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YTogTVNULklDMlNfQ3Jhc2hNeVJlY29yZCA9IHtcbiAgICAgICAgICAgIHNlcmlhbDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBjb3VudDogUEFHRV9DT1VOVCxcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19DcmFzaE15UmVjb3JkLmNyZWF0ZShkYXRhKTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfQ3Jhc2hNeVJlY29yZC5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coTVNULkMyU19DcmFzaE15UmVjb3JkLCBNU1QuT3V0ZXJPcGNvZGVfQ3Jhc2hHYW1lLkMyU19DcmFzaE15UmVjb3JkLCBidWZmZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9TMkNfQ3Jhc2hNeVJlY29yZChkYXRhOiBNU1QuSVMyQ19DcmFzaE15UmVjb3JkKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5pZCA9PT0gREVGQVVMVF9GSVJTVF9JRCAmJiBkYXRhLm15UmVjb3JkSW5mby5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5piv5ZCm5pyA5ZCO5LiA6aG1XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBkYXRhLm15UmVjb3JkSW5mby5sZW5ndGggPCBQQUdFX0NPVU5UO1xuXG4gICAgICAgIGlmIChkYXRhLmlkID09PSBERUZBVUxUX0ZJUlNUX0lEKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhTGlzdCA9IFtdLmNvbmNhdChkYXRhLm15UmVjb3JkSW5mbyk7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5zZXQoZGF0YS5teVJlY29yZEluZm8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGF0YUxpc3QgPSB0aGlzLl9kYXRhTGlzdC5jb25jYXQoZGF0YS5teVJlY29yZEluZm8pO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQuaW5zZXJ0KGRhdGEubXlSZWNvcmRJbmZvKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIrmi4nlm57osINcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxuICAgICAqL1xuICAgIHByaXZhdGUgb25QdWxsVG9wKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5DMlNfQ3Jhc2hNeVJlY29yZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4i+aLieWbnuiwg1xuICAgICAqL1xuICAgIHByaXZhdGUgb25QdWxsQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzTGFzdFBhZ2UpIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhcIkNyYXNoIOa1j+iniOS4quS6uuWOhuWPsuiusOW9lSDlt7LmmK/mnIDlkI7kuIDpobUg5peg6ZyA6K+35rGC57+76aG1XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuQzJTX0NyYXNoTXlSZWNvcmQodGhpcy5nZXRMYXN0UmVjb3JkSWQoKSk7XG4gICAgfVxuXG59XG4iXX0=