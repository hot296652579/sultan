
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/DepositRecordView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9fd48zalUBMVaKt25/UByRd', 'DepositRecordView');
// script/wallet/DepositRecordView.ts

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
let DepositRecordView = class DepositRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDate = null;
        this.labChips = null;
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
        return "wallet/prefabes/DepositRecordView";
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
        this.registerEvent("Event_S2C_GetDepositList", this.onEvent_S2C_GetDepositList);
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
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            index,
            limit: PAGE_COUNT,
        };
        console.log('C2S_MyRecord ->index :' + index);
        let req = protoc_1.MST.C2S_GetDepositList.create(data);
        let buffer = protoc_1.MST.C2S_GetDepositList.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2S_GetDepositList, protoc_1.MST.OuterOpcode_Lobby.C2S_GetDepositList, buffer);
    }
    onEvent_S2C_GetDepositList(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
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
], DepositRecordView.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], DepositRecordView.prototype, "labChips", void 0);
__decorate([
    property(cc.Label)
], DepositRecordView.prototype, "labAmount", void 0);
__decorate([
    property(ListView_1.default)
], DepositRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(cc.Node)
], DepositRecordView.prototype, "titleItem", void 0);
__decorate([
    property(NoneItem_1.default)
], DepositRecordView.prototype, "noneItem", void 0);
DepositRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], DepositRecordView);
exports.default = DepositRecordView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L0RlcG9zaXRSZWNvcmRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQW9EO0FBQ3BELHVFQUErQztBQUMvQyx1REFBb0Q7QUFDcEQsNkRBQTBEO0FBQzFELDBFQUFrRDtBQUNsRCw4REFBc0M7QUFDdEMsdURBQW1FO0FBRW5FLGtFQUFrRTtBQUNsRSwwREFBdUQ7QUFDdkQseURBQW1EO0FBQ25ELG9FQUE0QztBQUM1QyxvRUFBNEM7QUFHNUMsT0FBTztBQUNQLE1BQU0sVUFBVSxHQUFXLEVBQUUsQ0FBQztBQUM5QixPQUFPO0FBQ1AsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO0FBQ3BDLGNBQWM7QUFDZCxNQUFNLGdCQUFnQixHQUFXLENBQUMsQ0FBQztBQUVuQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLGdCQUFNO0lBQXJEOztRQUlZLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsY0FBUyxHQUFZLElBQUksQ0FBQztRQUcxQixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRWxDLFNBQVM7UUFDRCxhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ2pDLFNBQVM7UUFDRCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUNyQyxhQUFhO1FBQ0wsY0FBUyxHQUEwQixJQUFJLENBQUM7UUFDaEQscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO0lBZ0lqQyxDQUFDO0lBOUhVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sbUNBQW1DLENBQUM7SUFDL0MsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFTSxJQUFJLENBQUMsSUFBWTtRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLFFBQVE7UUFDWixtQ0FBbUM7UUFDbkMsNEJBQTRCO1FBQzVCLGdDQUFnQztRQUNoQyw4QkFBOEI7UUFFOUIscUNBQXFDO0lBQ3pDLENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXRCLElBQUksZ0NBQXNCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFFcEYsQ0FBQztJQUVELGdCQUFnQjtJQUVoQixDQUFDO0lBRU8sZUFBZTtRQUNuQixJQUFJLEVBQUUsQ0FBQztRQUNQLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFlBQVksQ0FBQyxLQUFjO1FBQy9CLElBQUksbUJBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1NBQzVCO1FBRUQsSUFBSSxJQUFJLEdBQTJCO1lBQy9CLE1BQU0sRUFBRSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsS0FBSztZQUNMLEtBQUssRUFBRSxVQUFVO1NBQ3BCLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksR0FBRyxHQUFHLFlBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxNQUFNLEdBQUcsWUFBRyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFHLENBQUMsa0JBQWtCLEVBQUUsWUFBRyxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFTywwQkFBMEIsQ0FBQyxJQUE0QjtRQUMzRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLG1CQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdEM7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNyQztRQUVELFNBQVM7UUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLE9BQU8sQ0FBQyxVQUFlLEVBQUUsVUFBZSxFQUFFLElBQWE7UUFDMUQsUUFBUSxVQUFVLEVBQUU7WUFDaEIsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssU0FBUyxDQUFDLE1BQWdCO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWSxDQUFDLE1BQWdCO1FBQ2pDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzdDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUVKLENBQUE7QUF2Skc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDYztBQUdqQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNlO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ2dCO0FBR25DO0lBREMsUUFBUSxDQUFDLGtCQUFRLENBQUM7b0RBQ2dCO0FBR25DO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2dCO0FBR2xDO0lBREMsUUFBUSxDQUFDLGtCQUFRLENBQUM7bURBQ2U7QUFuQmpCLGlCQUFpQjtJQUZyQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixpQkFBaUIsQ0EySnJDO2tCQTNKb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L0xpc3RWaWV3XCI7XG5pbXBvcnQgTm9uZUl0ZW0gZnJvbSBcIi4uL2NvbW1vbi9pdGVtL05vbmVJdGVtXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IFR5cGVVdGlscyBmcm9tIFwiLi4vY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IEFwcERhdGEgZnJvbSBcIi4uL2RhdGEvQXBwRGF0YVwiO1xuaW1wb3J0IHsgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuXG5cbi8vIOavj+mhteaVsOmHj1xuY29uc3QgUEFHRV9DT1VOVDogbnVtYmVyID0gMTA7XG4vLyDkuIDlpKnmr6vnp5JcbmNvbnN0IE9ORV9EQVlfTVM6IG51bWJlciA9IDg2NDAwMDAwO1xuLy8g6buY6K6k6aaW5qyh6K+35rGC5YiG6aG1IElEXG5jb25zdCBERUZBVUxUX0ZJUlNUX0lEOiBudW1iZXIgPSAwO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwb3NpdFJlY29yZFZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJEYXRlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJDaGlwczogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQW1vdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXG4gICAgcHJpdmF0ZSBsc3ZSZWNvcmQ6IExpc3RWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdGl0bGVJdGVtOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShOb25lSXRlbSlcbiAgICBwcml2YXRlIG5vbmVJdGVtOiBOb25lSXRlbSA9IG51bGw7XG5cbiAgICAvLyBBcHAg5pWw5o2uXG4gICAgcHJpdmF0ZSBfYXBwRGF0YTogQXBwRGF0YSA9IG51bGw7XG4gICAgLy8g5piv5ZCm5pyA5ZCO5LiA6aG1XG4gICAgcHJpdmF0ZSBfaXNMYXN0UGFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIOS4quS6uuWOhuWPsuS4i+azqOaVsOaNruWIl+ihqFxuICAgIHByaXZhdGUgX2RhdGFMaXN0OiBNU1QuSVdpdGhEcmF3UmVjb3JkW10gPSBudWxsO1xuICAgIGN1cnJlbnRJbmRleFBhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwid2FsbGV0L3ByZWZhYmVzL0RlcG9zaXRSZWNvcmRWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcblxuICAgICAgICB0aGlzLkMyU19NeVJlY29yZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHNob3coYXJncz86IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG5cbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYXBwRGF0YSA9IEcuRGF0YU1nci5nZXQoQXBwRGF0YSk7XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGF0YUxpc3QgPSBbXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLmxhYkdhbWVOb1RpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIC8vIHRoaXMubGFiRGF0ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICAvLyB0aGlzLmxhYkJhbmtDb2RlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIC8vIHRoaXMubGFiQW1vdW50LnN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgLy8gdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1MyQ19HZXREZXBvc2l0TGlzdFwiLCB0aGlzLm9uRXZlbnRfUzJDX0dldERlcG9zaXRMaXN0KTtcblxuICAgIH1cblxuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExhc3RSZWNvcmRJZCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGlkID0gdGhpcy5jdXJyZW50SW5kZXhQYWdlICsgUEFHRV9DT1VOVDtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOafpeivouWOhuWPsuiusOW9lVxuICAgICAqIEBwYXJhbSBpZCB7bnVtYmVyfSBpZCDkuLrkuobpgb/lhY3mn6Xor6LlkI7vvIzlh7rnjrDph43lpI3mlbDmja4g6aaW5qyh6K+35rGC6buY6K6k5Li6IC0xIO+8iOafpeivouWQjueahOaVsOaNruS4jeWMheWQq+iHqui6qyBJRO+8iVxuICAgICAqL1xuICAgIHByaXZhdGUgQzJTX015UmVjb3JkKGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSBERUZBVUxUX0ZJUlNUX0lEO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGE6IE1TVC5DMlNfR2V0RGVwb3NpdExpc3QgPSB7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBsaW1pdDogUEFHRV9DT1VOVCxcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnQzJTX015UmVjb3JkIC0+aW5kZXggOicgKyBpbmRleCk7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJTX0dldERlcG9zaXRMaXN0LmNyZWF0ZShkYXRhKTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0RGVwb3NpdExpc3QuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKE1TVC5DMlNfR2V0RGVwb3NpdExpc3QsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfR2V0RGVwb3NpdExpc3QsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X1MyQ19HZXREZXBvc2l0TGlzdChkYXRhOiBNU1QuUzJDX0dldERlcG9zaXRMaXN0KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXhQYWdlID0gZGF0YS5pbmRleDtcbiAgICAgICAgaWYgKGRhdGEucmVjb3Jkcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5piv5ZCm5pyA5ZCO5LiA6aG1XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBkYXRhLnJlY29yZHMubGVuZ3RoIDwgUEFHRV9DT1VOVDtcbiAgICAgICAgdGhpcy5fZGF0YUxpc3QgPSB0aGlzLl9kYXRhTGlzdC5jb25jYXQoZGF0YS5yZWNvcmRzKTtcbiAgICAgICAgdGhpcy5sc3ZSZWNvcmQuaW5zZXJ0KGRhdGEucmVjb3Jkcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIrmi4nlm57osINcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxuICAgICAqL1xuICAgIHByaXZhdGUgb25QdWxsVG9wKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5DMlNfTXlSZWNvcmQoMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5ouJ5Zue6LCDXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblB1bGxCb3R0b20odGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faXNMYXN0UGFnZSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwiQ3Jhc2gg5rWP6KeI5Liq5Lq65Y6G5Y+y6K6w5b2VIOW3suaYr+acgOWQjuS4gOmhtSDml6DpnIDor7fmsYLnv7vpobVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5DMlNfTXlSZWNvcmQodGhpcy5nZXRMYXN0UmVjb3JkSWQoKSk7XG4gICAgfVxuXG59XG4iXX0=