
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashTotalRecordView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '086f8XlpV5FILBYwk0EmAKh', 'CrashTotalRecordView');
// games/crash/script/view/CrashTotalRecordView.ts

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
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const protoc_1 = require("../../../../script/framework/external/protoc");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
// 每页数量
const PAGE_COUNT = 20;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = -1;
// 最大显示前几天数据
const MAX_BEFORE_DAY = 7;
const { ccclass, property } = cc._decorator;
let CrashTotalRecordView = class CrashTotalRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnLeft = null;
        this.labDate = null;
        this.btnRight = null;
        this.labCurrServerSeed = null;
        this.labCurrServerSeedValue = null;
        this.labPrevServerSeed = null;
        this.labPrevServerSeedValue = null;
        this.labPublicSeed = null;
        this.labPublicSeedValue = null;
        this.lsvRecord = null;
        this.titleItemPage = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // 当前查找时间戳
        this._currFindTimestamp = null;
        // 是否最后一页
        this._isLastPage = false;
        // 当天历史数据列表
        this._todayRecordDataList = null;
    }
    static getPrefabUrl() {
        return "prefabs/CrashTotalRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp);
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    initData() {
        this._appData = G.DataMgr.get(AppData_1.default);
        this._currFindTimestamp = DateUtils_1.default.getDayTimestamp(this._appData.getClientTimestamp());
        this._isLastPage = false;
        this._todayRecordDataList = [];
    }
    initView() {
        this.btnRight.interactable = false;
        this.labDate.string = DateUtils_1.default.getYMD(this._currFindTimestamp, "-");
        this.labCurrServerSeedValue.string = "";
        this.labPrevServerSeedValue.string = "";
        this.labPublicSeedValue.string = "";
        this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_M2C_CrashHashRecord_Res", this.onEvent_M2C_CrashHashRecord_Res);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labRecordPageName", true));
        this.labCurrServerSeed.language = Manager_1.Manager.makeLanguage("labCurrServerSeed", true);
        this.labPrevServerSeed.language = Manager_1.Manager.makeLanguage("labPrevServerSeed", true);
        this.labPublicSeed.language = Manager_1.Manager.makeLanguage("labPublicSeed", true);
    }
    refreshLeftRightBtn() {
        if (this._currFindTimestamp >= DateUtils_1.default.getDayTimestamp(this._appData.getClientTimestamp())) {
            this.btnRight.interactable = false;
        }
        else {
            this.btnRight.interactable = true;
        }
        this.btnLeft.interactable = true;
        if (this._currFindTimestamp <= DateUtils_1.default.getTimestampByDate(DateUtils_1.default.getDayBeforeAfter(this._appData.getClientTimestamp(), -(MAX_BEFORE_DAY - 1)))) {
            // && this._todayRecordDataList.length <= 0) {
            this.btnLeft.interactable = false;
        }
    }
    getLastRecordId() {
        let id = DEFAULT_FIRST_ID;
        if (this._todayRecordDataList.length > 0) {
            let lastRecordData = this._todayRecordDataList[this._todayRecordDataList.length - 1];
            id = lastRecordData.ID;
        }
        return id;
    }
    clickPrevDayData() {
        let prevTimestamp = this._currFindTimestamp - ONE_DAY_MS;
        this._todayRecordDataList.length = 0;
        this._isLastPage = false;
        this.C2M_CrashHashRecord_Req(prevTimestamp);
    }
    clickNextDayData() {
        let nextTimestamp = this._currFindTimestamp + ONE_DAY_MS;
        this._todayRecordDataList.length = 0;
        this._isLastPage = false;
        this.C2M_CrashHashRecord_Req(nextTimestamp);
    }
    /**
     * 查询历史记录
     * @param timestamp {number} 查询哪天时间戳
     */
    C2M_CrashHashRecord_Req(timestamp, id) {
        if (TypeUtils_1.default.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }
        let data = {
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            Date: DateUtils_1.default.getYMD(timestamp, "-"),
            ID: id,
            PageNumber: PAGE_COUNT,
        };
        let req = protoc_1.MST.C2M_CrashHashRecord_Req.create(data);
        let buffer = protoc_1.MST.C2M_CrashHashRecord_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_CrashHashRecord_Req, protoc_1.MST.OuterOpcode_CrashGame.C2M_CrashHashRecord_Req, buffer);
    }
    onEvent_M2C_CrashHashRecord_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        if (data.SeedInfo.ServerSeed.length <= 0) {
            this.labCurrServerSeedValue.language = Manager_1.Manager.makeLanguage("labCurrServerSeedValue", true);
        }
        else {
            this.labCurrServerSeedValue.string = data.SeedInfo.ServerSeed;
        }
        if (data.ID === DEFAULT_FIRST_ID && data.RecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.RecordInfo.length < PAGE_COUNT;
        this.labDate.string = data.Date;
        this._currFindTimestamp = DateUtils_1.default.getTimestampByDate(data.Date);
        this.labPrevServerSeedValue.string = data.SeedInfo.ServerSeedHash;
        this.labPublicSeedValue.string = data.SeedInfo.PublicSeed;
        if (data.ID === DEFAULT_FIRST_ID) {
            this._todayRecordDataList = [].concat(data.RecordInfo);
            this.lsvRecord.set(data.RecordInfo);
        }
        else {
            this._todayRecordDataList = this._todayRecordDataList.concat(data.RecordInfo);
            this.lsvRecord.insert(data.RecordInfo);
        }
        this.refreshLeftRightBtn();
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnLeft":
                this.clickPrevDayData();
                break;
            case "btnRight":
                this.clickNextDayData();
                break;
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
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp);
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览总历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp, this.getLastRecordId());
    }
};
__decorate([
    property(cc.Button)
], CrashTotalRecordView.prototype, "btnLeft", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labDate", void 0);
__decorate([
    property(cc.Button)
], CrashTotalRecordView.prototype, "btnRight", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labCurrServerSeed", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labCurrServerSeedValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPrevServerSeed", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPrevServerSeedValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPublicSeed", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPublicSeedValue", void 0);
__decorate([
    property(ListView_1.default)
], CrashTotalRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(TitleItemPage_1.default)
], CrashTotalRecordView.prototype, "titleItemPage", void 0);
__decorate([
    property(NoneItem_1.default)
], CrashTotalRecordView.prototype, "noneItem", void 0);
CrashTotalRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashTotalRecordView);
exports.default = CrashTotalRecordView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaFRvdGFsUmVjb3JkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRGQUFvRTtBQUNwRSx1RkFBK0Q7QUFDL0QsaUdBQXlFO0FBQ3pFLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFDMUUsMEZBQWtFO0FBQ2xFLDhFQUFzRDtBQUN0RCx1RUFBbUY7QUFFbkYsa0ZBQWtGO0FBQ2xGLDBFQUF1RTtBQUN2RSxrR0FBMEU7QUFDMUUseUVBQW1FO0FBQ25FLG9GQUE0RDtBQUM1RCxvRkFBNEQ7QUFFNUQsT0FBTztBQUNQLE1BQU0sVUFBVSxHQUFXLEVBQUUsQ0FBQztBQUM5QixPQUFPO0FBQ1AsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO0FBQ3BDLGNBQWM7QUFDZCxNQUFNLGdCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFlBQVk7QUFDWixNQUFNLGNBQWMsR0FBVyxDQUFDLENBQUM7QUFFakMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxnQkFBTTtJQUF4RDs7UUFJWSxZQUFPLEdBQWMsSUFBSSxDQUFDO1FBRzFCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsYUFBUSxHQUFjLElBQUksQ0FBQztRQUczQixzQkFBaUIsR0FBYSxJQUFJLENBQUM7UUFHbkMsMkJBQXNCLEdBQWEsSUFBSSxDQUFDO1FBR3hDLHNCQUFpQixHQUFhLElBQUksQ0FBQztRQUduQywyQkFBc0IsR0FBYSxJQUFJLENBQUM7UUFHeEMsa0JBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsdUJBQWtCLEdBQWEsSUFBSSxDQUFDO1FBR3BDLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0Isa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBR3BDLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFFbEMsU0FBUztRQUNELGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDakMsVUFBVTtRQUNGLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQUMxQyxTQUFTO1FBQ0QsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDckMsV0FBVztRQUNILHlCQUFvQixHQUEyQixJQUFJLENBQUM7SUErTGhFLENBQUM7SUE3TFUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw4QkFBOEIsQ0FBQztJQUMxQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFZO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsbUJBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV0QixJQUFJLGdDQUFzQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBRTlGLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGlCQUFPLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUU5RSxDQUFDO0lBRU8sbUJBQW1CO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLG1CQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFO1lBQzFGLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUN0QzthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLG1CQUFTLENBQUMsa0JBQWtCLENBQUMsbUJBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakosOENBQThDO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUNyQztJQUVMLENBQUM7SUFFTyxlQUFlO1FBQ25CLElBQUksRUFBRSxHQUFXLGdCQUFnQixDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxjQUFjLEdBQXlCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNHLEVBQUUsR0FBRyxjQUFjLENBQUMsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUM7UUFDakUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxhQUFhLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQztRQUNqRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHVCQUF1QixDQUFDLFNBQWlCLEVBQUUsRUFBVztRQUMxRCxJQUFJLG1CQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RCLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztTQUN6QjtRQUVELElBQUksSUFBSSxHQUFpQztZQUNyQyxLQUFLLEVBQUUsaUJBQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3ZDLElBQUksRUFBRSxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO1lBQ3RDLEVBQUUsRUFBRSxFQUFFO1lBQ04sVUFBVSxFQUFFLFVBQVU7U0FDekIsQ0FBQTtRQUNELElBQUksR0FBRyxHQUFHLFlBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxNQUFNLEdBQUcsWUFBRyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFHLENBQUMsdUJBQXVCLEVBQUUsWUFBRyxDQUFDLHFCQUFxQixDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFTywrQkFBK0IsQ0FBQyxJQUFrQztRQUN0RSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLG1CQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvRjthQUFNO1lBQ0gsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUNqRTtRQUVELElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3RDO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDckM7UUFFRCxTQUFTO1FBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFFdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsbUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUNsRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBRTFELElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFDSCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLE9BQU8sQ0FBQyxVQUFlLEVBQUUsVUFBZSxFQUFFLElBQWE7UUFDMUQsUUFBUSxVQUFVLEVBQUU7WUFDaEIsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssU0FBUyxDQUFDLE1BQWdCO1FBQzlCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxZQUFZLENBQUMsTUFBZ0I7UUFDakMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDNUMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUNsRixDQUFDO0NBRUosQ0FBQTtBQXpPRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNjO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ2M7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDZTtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytEQUN3QjtBQUczQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29FQUM2QjtBQUdoRDtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytEQUN3QjtBQUczQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29FQUM2QjtBQUdoRDtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJEQUNvQjtBQUd2QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dFQUN5QjtBQUc1QztJQURDLFFBQVEsQ0FBQyxrQkFBUSxDQUFDO3VEQUNnQjtBQUduQztJQURDLFFBQVEsQ0FBQyx1QkFBYSxDQUFDOzJEQUNvQjtBQUc1QztJQURDLFFBQVEsQ0FBQyxrQkFBUSxDQUFDO3NEQUNlO0FBckNqQixvQkFBb0I7SUFGeEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsb0JBQW9CLENBNk94QztrQkE3T29CLG9CQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaXN0VmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9jb21wb25lbnQvTGlzdFZpZXdcIjtcbmltcG9ydCBOb25lSXRlbSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9pdGVtL05vbmVJdGVtXCI7XG5pbXBvcnQgVGl0bGVJdGVtUGFnZSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9pdGVtL1RpdGxlSXRlbVBhZ2VcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCBUeXBlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvVHlwZVV0aWxzXCI7XG5pbXBvcnQgQXBwRGF0YSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2RhdGEvQXBwRGF0YVwiO1xuaW1wb3J0IHsgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IERhdGVVdGlscyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlbnRpb25zL0RhdGVVdGlsc1wiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L21zZ2JveC9QYW5lbEhlbHBcIjtcblxuLy8g5q+P6aG15pWw6YePXG5jb25zdCBQQUdFX0NPVU5UOiBudW1iZXIgPSAyMDtcbi8vIOS4gOWkqeavq+enklxuY29uc3QgT05FX0RBWV9NUzogbnVtYmVyID0gODY0MDAwMDA7XG4vLyDpu5jorqTpppbmrKHor7fmsYLliIbpobUgSURcbmNvbnN0IERFRkFVTFRfRklSU1RfSUQ6IG51bWJlciA9IC0xO1xuLy8g5pyA5aSn5pi+56S65YmN5Yeg5aSp5pWw5o2uXG5jb25zdCBNQVhfQkVGT1JFX0RBWTogbnVtYmVyID0gNztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXNoVG90YWxSZWNvcmRWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0bkxlZnQ6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJEYXRlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHByaXZhdGUgYnRuUmlnaHQ6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJDdXJyU2VydmVyU2VlZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ3VyclNlcnZlclNlZWRWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUHJldlNlcnZlclNlZWQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlByZXZTZXJ2ZXJTZWVkVmFsdWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlB1YmxpY1NlZWQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlB1YmxpY1NlZWRWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxuICAgIHByaXZhdGUgbHN2UmVjb3JkOiBMaXN0VmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoVGl0bGVJdGVtUGFnZSlcbiAgICBwcml2YXRlIHRpdGxlSXRlbVBhZ2U6IFRpdGxlSXRlbVBhZ2UgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KE5vbmVJdGVtKVxuICAgIHByaXZhdGUgbm9uZUl0ZW06IE5vbmVJdGVtID0gbnVsbDtcblxuICAgIC8vIEFwcCDmlbDmja5cbiAgICBwcml2YXRlIF9hcHBEYXRhOiBBcHBEYXRhID0gbnVsbDtcbiAgICAvLyDlvZPliY3mn6Xmib7ml7bpl7TmiLNcbiAgICBwcml2YXRlIF9jdXJyRmluZFRpbWVzdGFtcDogbnVtYmVyID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmnIDlkI7kuIDpobVcbiAgICBwcml2YXRlIF9pc0xhc3RQYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5b2T5aSp5Y6G5Y+y5pWw5o2u5YiX6KGoXG4gICAgcHJpdmF0ZSBfdG9kYXlSZWNvcmREYXRhTGlzdDogTVNULklDcmFzaFJlY29yZEluZm9bXSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwicHJlZmFicy9DcmFzaFRvdGFsUmVjb3JkVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5DMk1fQ3Jhc2hIYXNoUmVjb3JkX1JlcSh0aGlzLl9jdXJyRmluZFRpbWVzdGFtcCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdyhhcmdzPzogYW55W10pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcblxuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hcHBEYXRhID0gRy5EYXRhTWdyLmdldChBcHBEYXRhKTtcbiAgICAgICAgdGhpcy5fY3VyckZpbmRUaW1lc3RhbXAgPSBEYXRlVXRpbHMuZ2V0RGF5VGltZXN0YW1wKHRoaXMuX2FwcERhdGEuZ2V0Q2xpZW50VGltZXN0YW1wKCkpO1xuICAgICAgICB0aGlzLl9pc0xhc3RQYWdlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RvZGF5UmVjb3JkRGF0YUxpc3QgPSBbXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ0blJpZ2h0LmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhYkRhdGUuc3RyaW5nID0gRGF0ZVV0aWxzLmdldFlNRCh0aGlzLl9jdXJyRmluZFRpbWVzdGFtcCwgXCItXCIpO1xuICAgICAgICB0aGlzLmxhYkN1cnJTZXJ2ZXJTZWVkVmFsdWUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJQcmV2U2VydmVyU2VlZFZhbHVlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiUHVibGljU2VlZFZhbHVlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubm9uZUl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfQ3Jhc2hIYXNoUmVjb3JkX1Jlc1wiLCB0aGlzLm9uRXZlbnRfTTJDX0NyYXNoSGFzaFJlY29yZF9SZXMpO1xuXG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy50aXRsZUl0ZW1QYWdlLmxhbmd1YWdlUGFnZU5hbWUoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJSZWNvcmRQYWdlTmFtZVwiLCB0cnVlKSk7XG4gICAgICAgIHRoaXMubGFiQ3VyclNlcnZlclNlZWQubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkN1cnJTZXJ2ZXJTZWVkXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYlByZXZTZXJ2ZXJTZWVkLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJQcmV2U2VydmVyU2VlZFwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJQdWJsaWNTZWVkLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJQdWJsaWNTZWVkXCIsIHRydWUpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoTGVmdFJpZ2h0QnRuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fY3VyckZpbmRUaW1lc3RhbXAgPj0gRGF0ZVV0aWxzLmdldERheVRpbWVzdGFtcCh0aGlzLl9hcHBEYXRhLmdldENsaWVudFRpbWVzdGFtcCgpKSkge1xuICAgICAgICAgICAgdGhpcy5idG5SaWdodC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnRuUmlnaHQuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnRuTGVmdC5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5fY3VyckZpbmRUaW1lc3RhbXAgPD0gRGF0ZVV0aWxzLmdldFRpbWVzdGFtcEJ5RGF0ZShEYXRlVXRpbHMuZ2V0RGF5QmVmb3JlQWZ0ZXIodGhpcy5fYXBwRGF0YS5nZXRDbGllbnRUaW1lc3RhbXAoKSwgLShNQVhfQkVGT1JFX0RBWSAtIDEpKSkpIHtcbiAgICAgICAgICAgIC8vICYmIHRoaXMuX3RvZGF5UmVjb3JkRGF0YUxpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnRuTGVmdC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMYXN0UmVjb3JkSWQoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGlkOiBudW1iZXIgPSBERUZBVUxUX0ZJUlNUX0lEO1xuICAgICAgICBpZiAodGhpcy5fdG9kYXlSZWNvcmREYXRhTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbGFzdFJlY29yZERhdGE6IE1TVC5JQ3Jhc2hSZWNvcmRJbmZvID0gdGhpcy5fdG9kYXlSZWNvcmREYXRhTGlzdFt0aGlzLl90b2RheVJlY29yZERhdGFMaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWQgPSBsYXN0UmVjb3JkRGF0YS5JRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGlja1ByZXZEYXlEYXRhKCk6IHZvaWQge1xuICAgICAgICBsZXQgcHJldlRpbWVzdGFtcDogbnVtYmVyID0gdGhpcy5fY3VyckZpbmRUaW1lc3RhbXAgLSBPTkVfREFZX01TO1xuICAgICAgICB0aGlzLl90b2RheVJlY29yZERhdGFMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5DMk1fQ3Jhc2hIYXNoUmVjb3JkX1JlcShwcmV2VGltZXN0YW1wKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrTmV4dERheURhdGEoKTogdm9pZCB7XG4gICAgICAgIGxldCBuZXh0VGltZXN0YW1wOiBudW1iZXIgPSB0aGlzLl9jdXJyRmluZFRpbWVzdGFtcCArIE9ORV9EQVlfTVM7XG4gICAgICAgIHRoaXMuX3RvZGF5UmVjb3JkRGF0YUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5faXNMYXN0UGFnZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkMyTV9DcmFzaEhhc2hSZWNvcmRfUmVxKG5leHRUaW1lc3RhbXApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOafpeivouWOhuWPsuiusOW9lVxuICAgICAqIEBwYXJhbSB0aW1lc3RhbXAge251bWJlcn0g5p+l6K+i5ZOq5aSp5pe26Ze05oizXG4gICAgICovXG4gICAgcHJpdmF0ZSBDMk1fQ3Jhc2hIYXNoUmVjb3JkX1JlcSh0aW1lc3RhbXA6IG51bWJlciwgaWQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoaWQpKSB7XG4gICAgICAgICAgICBpZCA9IERFRkFVTFRfRklSU1RfSUQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YTogTVNULklDMk1fQ3Jhc2hIYXNoUmVjb3JkX1JlcSA9IHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIERhdGU6IERhdGVVdGlscy5nZXRZTUQodGltZXN0YW1wLCBcIi1cIiksXG4gICAgICAgICAgICBJRDogaWQsXG4gICAgICAgICAgICBQYWdlTnVtYmVyOiBQQUdFX0NPVU5ULFxuICAgICAgICB9XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJNX0NyYXNoSGFzaFJlY29yZF9SZXEuY3JlYXRlKGRhdGEpO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTV9DcmFzaEhhc2hSZWNvcmRfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJNX0NyYXNoSGFzaFJlY29yZF9SZXEsIE1TVC5PdXRlck9wY29kZV9DcmFzaEdhbWUuQzJNX0NyYXNoSGFzaFJlY29yZF9SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X00yQ19DcmFzaEhhc2hSZWNvcmRfUmVzKGRhdGE6IE1TVC5JTTJDX0NyYXNoSGFzaFJlY29yZF9SZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEuU2VlZEluZm8uU2VydmVyU2VlZC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5sYWJDdXJyU2VydmVyU2VlZFZhbHVlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJDdXJyU2VydmVyU2VlZFZhbHVlXCIsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYWJDdXJyU2VydmVyU2VlZFZhbHVlLnN0cmluZyA9IGRhdGEuU2VlZEluZm8uU2VydmVyU2VlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLklEID09PSBERUZBVUxUX0ZJUlNUX0lEICYmIGRhdGEuUmVjb3JkSW5mby5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5piv5ZCm5pyA5ZCO5LiA6aG1XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBkYXRhLlJlY29yZEluZm8ubGVuZ3RoIDwgUEFHRV9DT1VOVDtcblxuICAgICAgICB0aGlzLmxhYkRhdGUuc3RyaW5nID0gZGF0YS5EYXRlO1xuICAgICAgICB0aGlzLl9jdXJyRmluZFRpbWVzdGFtcCA9IERhdGVVdGlscy5nZXRUaW1lc3RhbXBCeURhdGUoZGF0YS5EYXRlKTtcblxuICAgICAgICB0aGlzLmxhYlByZXZTZXJ2ZXJTZWVkVmFsdWUuc3RyaW5nID0gZGF0YS5TZWVkSW5mby5TZXJ2ZXJTZWVkSGFzaDtcbiAgICAgICAgdGhpcy5sYWJQdWJsaWNTZWVkVmFsdWUuc3RyaW5nID0gZGF0YS5TZWVkSW5mby5QdWJsaWNTZWVkO1xuXG4gICAgICAgIGlmIChkYXRhLklEID09PSBERUZBVUxUX0ZJUlNUX0lEKSB7XG4gICAgICAgICAgICB0aGlzLl90b2RheVJlY29yZERhdGFMaXN0ID0gW10uY29uY2F0KGRhdGEuUmVjb3JkSW5mbyk7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5zZXQoZGF0YS5SZWNvcmRJbmZvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RvZGF5UmVjb3JkRGF0YUxpc3QgPSB0aGlzLl90b2RheVJlY29yZERhdGFMaXN0LmNvbmNhdChkYXRhLlJlY29yZEluZm8pO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQuaW5zZXJ0KGRhdGEuUmVjb3JkSW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hMZWZ0UmlnaHRCdG4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhCdXR0b25OYW1lOiBhbnksIEJ1dHRvbk5vZGU6IGFueSwgZGF0YT86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKEJ1dHRvbk5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidG5MZWZ0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja1ByZXZEYXlEYXRhKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuUmlnaHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrTmV4dERheURhdGEoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5DbG9zZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4iuaLieWbnuiwg1xuICAgICAqIEBwYXJhbSB0YXJnZXQgXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblB1bGxUb3AodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICB0aGlzLkMyTV9DcmFzaEhhc2hSZWNvcmRfUmVxKHRoaXMuX2N1cnJGaW5kVGltZXN0YW1wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIvmi4nlm57osINcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uUHVsbEJvdHRvbSh0YXJnZXQ6IExpc3RWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xhc3RQYWdlKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coXCJDcmFzaCDmtY/op4jmgLvljoblj7LorrDlvZUg5bey5piv5pyA5ZCO5LiA6aG1IOaXoOmcgOivt+axgue/u+mhtVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkMyTV9DcmFzaEhhc2hSZWNvcmRfUmVxKHRoaXMuX2N1cnJGaW5kVGltZXN0YW1wLCB0aGlzLmdldExhc3RSZWNvcmRJZCgpKTtcbiAgICB9XG5cbn1cbiJdfQ==