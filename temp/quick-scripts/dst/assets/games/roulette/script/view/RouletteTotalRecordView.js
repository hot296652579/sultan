
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteTotalRecordView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '15e1724SYRL35MwxDcD8MvH', 'RouletteTotalRecordView');
// games/roulette/script/view/RouletteTotalRecordView.ts

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
const RouletteData_1 = __importDefault(require("../data/RouletteData"));
// 每页数量
const PAGE_COUNT = 20;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = -1;
const { ccclass, property } = cc._decorator;
let RouletteTotalRecordView = class RouletteTotalRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lsvRecord = null;
        this.titleItemPage = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // App 数据
        this._rouletteData = null;
        // 是否最后一页
        this._isLastPage = false;
        // 当天历史数据列表
        this._gameRecordDataList = null;
    }
    static getPrefabUrl() {
        return "prefabs/RouletteTotalRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        let round = this._rouletteData.curRound;
        this.C2R_GetGameRecords_Req(round);
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    initData() {
        this._appData = G.DataMgr.get(AppData_1.default);
        this._rouletteData = G.DataMgr.get(RouletteData_1.default);
        this._isLastPage = false;
        this._gameRecordDataList = [];
    }
    initView() {
        this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_R2C_GetGameRecords_Res", this.onEvent_R2C_GetGameRecords_Res);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labRecordPageName", true));
    }
    getLastRecordId() {
        let id = DEFAULT_FIRST_ID;
        if (this._gameRecordDataList.length > 0) {
            let lastRecordData = this._gameRecordDataList[this._gameRecordDataList.length - 1];
            id = lastRecordData.round;
        }
        return id;
    }
    /**
     * 查询历史记录
     * @param timestamp {number} 查询哪天时间戳
     */
    C2R_GetGameRecords_Req(round) {
        if (TypeUtils_1.default.isNull(round)) {
            round = DEFAULT_FIRST_ID;
        }
        let data = {
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            limit: PAGE_COUNT,
            round
        };
        let req = protoc_1.MST.C2R_GetGameRecords_Req.create(data);
        let buffer = protoc_1.MST.C2R_GetGameRecords_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2R_GetGameRecords_Req, protoc_1.MST.OuterOpcode_Roulette.C2R_GetGameRecords_Req, buffer);
    }
    onEvent_R2C_GetGameRecords_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        if (data.round === DEFAULT_FIRST_ID && data.records.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.records.length < PAGE_COUNT;
        if (data.round === DEFAULT_FIRST_ID) {
            this._gameRecordDataList = [].concat(data.records);
            this.lsvRecord.set(data.records);
        }
        else {
            this._gameRecordDataList = this._gameRecordDataList.concat(data.records);
            this.lsvRecord.insert(data.records);
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
        this.C2R_GetGameRecords_Req(0);
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览总历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2R_GetGameRecords_Req(this.getLastRecordId());
    }
};
__decorate([
    property(ListView_1.default)
], RouletteTotalRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(TitleItemPage_1.default)
], RouletteTotalRecordView.prototype, "titleItemPage", void 0);
__decorate([
    property(NoneItem_1.default)
], RouletteTotalRecordView.prototype, "noneItem", void 0);
RouletteTotalRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteTotalRecordView);
exports.default = RouletteTotalRecordView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZVRvdGFsUmVjb3JkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRGQUFvRTtBQUNwRSx1RkFBK0Q7QUFDL0QsaUdBQXlFO0FBQ3pFLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFDMUUsMEZBQWtFO0FBQ2xFLDhFQUFzRDtBQUN0RCx1RUFBbUY7QUFFbkYsa0ZBQWtGO0FBQ2xGLDBFQUF1RTtBQUV2RSx5RUFBbUU7QUFDbkUsb0ZBQTREO0FBQzVELG9GQUE0RDtBQUM1RCx3RUFBZ0Q7QUFFaEQsT0FBTztBQUNQLE1BQU0sVUFBVSxHQUFXLEVBQUUsQ0FBQztBQUM5QixPQUFPO0FBQ1AsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO0FBQ3BDLGNBQWM7QUFDZCxNQUFNLGdCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO0FBRXBDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQix1QkFBdUIsR0FBNUMsTUFBcUIsdUJBQXdCLFNBQVEsZ0JBQU07SUFBM0Q7O1FBSVksY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFHcEMsYUFBUSxHQUFhLElBQUksQ0FBQztRQUVsQyxTQUFTO1FBQ0QsYUFBUSxHQUFZLElBQUksQ0FBQztRQUNqQyxTQUFTO1FBQ0Qsa0JBQWEsR0FBaUIsSUFBSSxDQUFDO1FBQzNDLFNBQVM7UUFDRCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUNyQyxXQUFXO1FBQ0gsd0JBQW1CLEdBQThCLElBQUksQ0FBQztJQXVJbEUsQ0FBQztJQXJJVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLGlDQUFpQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFD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O0lBRUQ7OztPQUdHO0lBQ0ssU0FBUyxDQUFDLE1BQWdCO1FBQzlCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxZQUFZLENBQUMsTUFBZ0I7UUFDakMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDNUMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FFSixDQUFBO0FBdEpHO0lBREMsUUFBUSxDQUFDLGtCQUFRLENBQUM7MERBQ2dCO0FBR25DO0lBREMsUUFBUSxDQUFDLHVCQUFhLENBQUM7OERBQ29CO0FBRzVDO0lBREMsUUFBUSxDQUFDLGtCQUFRLENBQUM7eURBQ2U7QUFWakIsdUJBQXVCO0lBRjNDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLHVCQUF1QixDQTBKM0M7a0JBMUpvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vY29tcG9uZW50L0xpc3RWaWV3XCI7XG5pbXBvcnQgTm9uZUl0ZW0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vaXRlbS9Ob25lSXRlbVwiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2UgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vaXRlbS9UaXRsZUl0ZW1QYWdlXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IEFwcERhdGEgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgUm91bGV0dGVEYXRhIGZyb20gXCIuLi9kYXRhL1JvdWxldHRlRGF0YVwiO1xuXG4vLyDmr4/pobXmlbDph49cbmNvbnN0IFBBR0VfQ09VTlQ6IG51bWJlciA9IDIwO1xuLy8g5LiA5aSp5q+r56eSXG5jb25zdCBPTkVfREFZX01TOiBudW1iZXIgPSA4NjQwMDAwMDtcbi8vIOm7mOiupOmmluasoeivt+axguWIhumhtSBJRFxuY29uc3QgREVGQVVMVF9GSVJTVF9JRDogbnVtYmVyID0gLTE7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3VsZXR0ZVRvdGFsUmVjb3JkVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcbiAgICBwcml2YXRlIGxzdlJlY29yZDogTGlzdFZpZXcgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFRpdGxlSXRlbVBhZ2UpXG4gICAgcHJpdmF0ZSB0aXRsZUl0ZW1QYWdlOiBUaXRsZUl0ZW1QYWdlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShOb25lSXRlbSlcbiAgICBwcml2YXRlIG5vbmVJdGVtOiBOb25lSXRlbSA9IG51bGw7XG5cbiAgICAvLyBBcHAg5pWw5o2uXG4gICAgcHJpdmF0ZSBfYXBwRGF0YTogQXBwRGF0YSA9IG51bGw7XG4gICAgLy8gQXBwIOaVsOaNrlxuICAgIHByaXZhdGUgX3JvdWxldHRlRGF0YTogUm91bGV0dGVEYXRhID0gbnVsbDtcbiAgICAvLyDmmK/lkKbmnIDlkI7kuIDpobVcbiAgICBwcml2YXRlIF9pc0xhc3RQYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5b2T5aSp5Y6G5Y+y5pWw5o2u5YiX6KGoXG4gICAgcHJpdmF0ZSBfZ2FtZVJlY29yZERhdGFMaXN0OiBNU1QuSVJvdWxldHRlR2FtZVJlY29yZFtdID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJwcmVmYWJzL1JvdWxldHRlVG90YWxSZWNvcmRWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcblxuICAgICAgICBsZXQgcm91bmQgPSB0aGlzLl9yb3VsZXR0ZURhdGEuY3VyUm91bmQ7XG4gICAgICAgIHRoaXMuQzJSX0dldEdhbWVSZWNvcmRzX1JlcShyb3VuZCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdyhhcmdzPzogYW55W10pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcblxuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hcHBEYXRhID0gRy5EYXRhTWdyLmdldChBcHBEYXRhKTtcbiAgICAgICAgdGhpcy5fcm91bGV0dGVEYXRhID0gRy5EYXRhTWdyLmdldChSb3VsZXR0ZURhdGEpO1xuICAgICAgICB0aGlzLl9pc0xhc3RQYWdlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dhbWVSZWNvcmREYXRhTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9uZUl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9SMkNfR2V0R2FtZVJlY29yZHNfUmVzXCIsIHRoaXMub25FdmVudF9SMkNfR2V0R2FtZVJlY29yZHNfUmVzKTtcblxuICAgIH1cblxuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMudGl0bGVJdGVtUGFnZS5sYW5ndWFnZVBhZ2VOYW1lKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiUmVjb3JkUGFnZU5hbWVcIiwgdHJ1ZSkpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMYXN0UmVjb3JkSWQoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGlkOiBudW1iZXIgPSBERUZBVUxUX0ZJUlNUX0lEO1xuICAgICAgICBpZiAodGhpcy5fZ2FtZVJlY29yZERhdGFMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBsYXN0UmVjb3JkRGF0YTogTVNULklSb3VsZXR0ZUdhbWVSZWNvcmQgPSB0aGlzLl9nYW1lUmVjb3JkRGF0YUxpc3RbdGhpcy5fZ2FtZVJlY29yZERhdGFMaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWQgPSBsYXN0UmVjb3JkRGF0YS5yb3VuZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5p+l6K+i5Y6G5Y+y6K6w5b2VXG4gICAgICogQHBhcmFtIHRpbWVzdGFtcCB7bnVtYmVyfSDmn6Xor6Llk6rlpKnml7bpl7TmiLNcbiAgICAgKi9cbiAgICBwcml2YXRlIEMyUl9HZXRHYW1lUmVjb3Jkc19SZXEocm91bmQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwocm91bmQpKSB7XG4gICAgICAgICAgICByb3VuZCA9IERFRkFVTFRfRklSU1RfSUQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YTogTVNULkMyUl9HZXRHYW1lUmVjb3Jkc19SZXEgPSB7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBsaW1pdDogUEFHRV9DT1VOVCxcbiAgICAgICAgICAgIHJvdW5kXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlJfR2V0R2FtZVJlY29yZHNfUmVxLmNyZWF0ZShkYXRhKTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlJfR2V0R2FtZVJlY29yZHNfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJSX0dldEdhbWVSZWNvcmRzX1JlcSwgTVNULk91dGVyT3Bjb2RlX1JvdWxldHRlLkMyUl9HZXRHYW1lUmVjb3Jkc19SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X1IyQ19HZXRHYW1lUmVjb3Jkc19SZXMoZGF0YTogTVNULklSMkNfR2V0R2FtZVJlY29yZHNfUmVzKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLkVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLnJvdW5kID09PSBERUZBVUxUX0ZJUlNUX0lEICYmIGRhdGEucmVjb3Jkcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5piv5ZCm5pyA5ZCO5LiA6aG1XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBkYXRhLnJlY29yZHMubGVuZ3RoIDwgUEFHRV9DT1VOVDtcblxuXG4gICAgICAgIGlmIChkYXRhLnJvdW5kID09PSBERUZBVUxUX0ZJUlNUX0lEKSB7XG4gICAgICAgICAgICB0aGlzLl9nYW1lUmVjb3JkRGF0YUxpc3QgPSBbXS5jb25jYXQoZGF0YS5yZWNvcmRzKTtcbiAgICAgICAgICAgIHRoaXMubHN2UmVjb3JkLnNldChkYXRhLnJlY29yZHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ2FtZVJlY29yZERhdGFMaXN0ID0gdGhpcy5fZ2FtZVJlY29yZERhdGFMaXN0LmNvbmNhdChkYXRhLnJlY29yZHMpO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQuaW5zZXJ0KGRhdGEucmVjb3Jkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhCdXR0b25OYW1lOiBhbnksIEJ1dHRvbk5vZGU6IGFueSwgZGF0YT86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKEJ1dHRvbk5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidG5DbG9zZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4iuaLieWbnuiwg1xuICAgICAqIEBwYXJhbSB0YXJnZXQgXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblB1bGxUb3AodGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICB0aGlzLkMyUl9HZXRHYW1lUmVjb3Jkc19SZXEoMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5ouJ5Zue6LCDXG4gICAgICovXG4gICAgcHJpdmF0ZSBvblB1bGxCb3R0b20odGFyZ2V0OiBMaXN0Vmlldyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faXNMYXN0UGFnZSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwiQ3Jhc2gg5rWP6KeI5oC75Y6G5Y+y6K6w5b2VIOW3suaYr+acgOWQjuS4gOmhtSDml6DpnIDor7fmsYLnv7vpobVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5DMlJfR2V0R2FtZVJlY29yZHNfUmVxKHRoaXMuZ2V0TGFzdFJlY29yZElkKCkpO1xuICAgIH1cblxufVxuIl19