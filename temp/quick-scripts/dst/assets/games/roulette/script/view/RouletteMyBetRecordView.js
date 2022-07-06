
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteMyBetRecordView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c6ee7EYvPxPQI1NCUxiR2qD', 'RouletteMyBetRecordView');
// games/roulette/script/view/RouletteMyBetRecordView.ts

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
const DEFAULT_FIRST_ID = 0;
const { ccclass, property } = cc._decorator;
let RouletteMyBetRecordView = class RouletteMyBetRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lsvRecord = null;
        this.titleItemPage = null;
        this.noneItem = null;
        this.labResult = null;
        this.labBetGold = null;
        this.labWinChips = null;
        // App 数据
        this._appData = null;
        // App 数据
        this._rouletteData = null;
        // 是否最后一页
        this._isLastPage = false;
        // 当天历史数据列表
        this._gameRecordDataList = null;
        this.currentIndexPage = 0;
    }
    static getPrefabUrl() {
        return "prefabs/RouletteMyBetRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.C2R_GetGameRecords_Req();
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
        this.registerEvent("Event_onR2C_GetBetInfo_Res", this.onEvent_onR2C_GetBetInfo_Res);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labMyBetRecord", true));
        this.labResult.language = Manager_1.Manager.makeLanguage("labResult", true);
        this.labBetGold.language = Manager_1.Manager.makeLanguage("labBetGold", true);
        this.labWinChips.language = Manager_1.Manager.makeLanguage("labWinChips", true);
    }
    getLastRecordId() {
        let id;
        id = this.currentIndexPage + PAGE_COUNT;
        return id;
    }
    /**
     * 查询历史记录
     * @param timestamp {number} 查询哪天时间戳
     */
    C2R_GetGameRecords_Req(index) {
        if (TypeUtils_1.default.isNull(index)) {
            index = DEFAULT_FIRST_ID;
        }
        let data = {
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            index,
            limit: PAGE_COUNT,
        };
        let req = protoc_1.MST.C2R_GetBetInfo_Req.create(data);
        let buffer = protoc_1.MST.C2R_GetBetInfo_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2R_GetBetInfo_Req, protoc_1.MST.OuterOpcode_Roulette.C2R_GetBetInfo_Req, buffer);
    }
    onEvent_onR2C_GetBetInfo_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        if (data.index === DEFAULT_FIRST_ID && data.records.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.records.length < PAGE_COUNT;
        if (data.index === DEFAULT_FIRST_ID) {
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
], RouletteMyBetRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(TitleItemPage_1.default)
], RouletteMyBetRecordView.prototype, "titleItemPage", void 0);
__decorate([
    property(NoneItem_1.default)
], RouletteMyBetRecordView.prototype, "noneItem", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordView.prototype, "labResult", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordView.prototype, "labBetGold", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordView.prototype, "labWinChips", void 0);
RouletteMyBetRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteMyBetRecordView);
exports.default = RouletteMyBetRecordView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZU15QmV0UmVjb3JkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRGQUFvRTtBQUNwRSx1RkFBK0Q7QUFDL0QsaUdBQXlFO0FBQ3pFLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFDMUUsMEZBQWtFO0FBQ2xFLDhFQUFzRDtBQUN0RCx1RUFBbUY7QUFFbkYsa0ZBQWtGO0FBQ2xGLDBFQUF1RTtBQUV2RSx5RUFBbUU7QUFDbkUsb0ZBQTREO0FBQzVELG9GQUE0RDtBQUM1RCx3RUFBZ0Q7QUFFaEQsT0FBTztBQUNQLE1BQU0sVUFBVSxHQUFXLEVBQUUsQ0FBQztBQUM5QixPQUFPO0FBQ1AsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO0FBQ3BDLGNBQWM7QUFDZCxNQUFNLGdCQUFnQixHQUFXLENBQUMsQ0FBQztBQUVuQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsdUJBQXVCLEdBQTVDLE1BQXFCLHVCQUF3QixTQUFRLGdCQUFNO0lBQTNEOztRQUlZLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0Isa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBR3BDLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQWEsSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRXJDLFNBQVM7UUFDRCxhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ2pDLFNBQVM7UUFDRCxrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFDM0MsU0FBUztRQUNELGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQ3JDLFdBQVc7UUFDSCx3QkFBbUIsR0FBNkIsSUFBSSxDQUFDO1FBQzdELHFCQUFnQixHQUFXLENBQUMsQ0FBQztJQW1J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QUFDO0lBRU0sT0FBTyxDQUFDLFVBQWUsRUFBRSxVQUFlLEVBQUUsSUFBYTtRQUMxRCxRQUFRLFVBQVUsRUFBRTtZQUNoQixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxTQUFTLENBQUMsTUFBZ0I7UUFDOUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNLLFlBQVksQ0FBQyxNQUFnQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUM1QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUVKLENBQUE7QUExSkc7SUFEQyxRQUFRLENBQUMsa0JBQVEsQ0FBQzswREFDZ0I7QUFHbkM7SUFEQyxRQUFRLENBQUMsdUJBQWEsQ0FBQzs4REFDb0I7QUFHNUM7SUFEQyxRQUFRLENBQUMsa0JBQVEsQ0FBQzt5REFDZTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUNnQjtBQUVuQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJEQUNpQjtBQUVwQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzREQUNrQjtBQWpCcEIsdUJBQXVCO0lBRjNDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLHVCQUF1QixDQThKM0M7a0JBOUpvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vY29tcG9uZW50L0xpc3RWaWV3XCI7XG5pbXBvcnQgTm9uZUl0ZW0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vaXRlbS9Ob25lSXRlbVwiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2UgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vaXRlbS9UaXRsZUl0ZW1QYWdlXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IEFwcERhdGEgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgUm91bGV0dGVEYXRhIGZyb20gXCIuLi9kYXRhL1JvdWxldHRlRGF0YVwiO1xuXG4vLyDmr4/pobXmlbDph49cbmNvbnN0IFBBR0VfQ09VTlQ6IG51bWJlciA9IDIwO1xuLy8g5LiA5aSp5q+r56eSXG5jb25zdCBPTkVfREFZX01TOiBudW1iZXIgPSA4NjQwMDAwMDtcbi8vIOm7mOiupOmmluasoeivt+axguWIhumhtSBJRFxuY29uc3QgREVGQVVMVF9GSVJTVF9JRDogbnVtYmVyID0gMDtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdWxldHRlTXlCZXRSZWNvcmRWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxuICAgIHByaXZhdGUgbHN2UmVjb3JkOiBMaXN0VmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoVGl0bGVJdGVtUGFnZSlcbiAgICBwcml2YXRlIHRpdGxlSXRlbVBhZ2U6IFRpdGxlSXRlbVBhZ2UgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KE5vbmVJdGVtKVxuICAgIHByaXZhdGUgbm9uZUl0ZW06IE5vbmVJdGVtID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJlc3VsdDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldEdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJXaW5DaGlwczogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8gQXBwIOaVsOaNrlxuICAgIHByaXZhdGUgX2FwcERhdGE6IEFwcERhdGEgPSBudWxsO1xuICAgIC8vIEFwcCDmlbDmja5cbiAgICBwcml2YXRlIF9yb3VsZXR0ZURhdGE6IFJvdWxldHRlRGF0YSA9IG51bGw7XG4gICAgLy8g5piv5ZCm5pyA5ZCO5LiA6aG1XG4gICAgcHJpdmF0ZSBfaXNMYXN0UGFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIOW9k+WkqeWOhuWPsuaVsOaNruWIl+ihqFxuICAgIHByaXZhdGUgX2dhbWVSZWNvcmREYXRhTGlzdDogTVNULklSb3VsZXR0ZUJldERldGFpbFtdID0gbnVsbDtcbiAgICBjdXJyZW50SW5kZXhQYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInByZWZhYnMvUm91bGV0dGVNeUJldFJlY29yZFZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgICAgICB0aGlzLkMyUl9HZXRHYW1lUmVjb3Jkc19SZXEoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KGFyZ3M/OiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuXG4gICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICB0aGlzLl9yb3VsZXR0ZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJvdWxldHRlRGF0YSk7XG4gICAgICAgIHRoaXMuX2lzTGFzdFBhZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ2FtZVJlY29yZERhdGFMaXN0ID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X29uUjJDX0dldEJldEluZm9fUmVzXCIsIHRoaXMub25FdmVudF9vblIyQ19HZXRCZXRJbmZvX1Jlcyk7XG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy50aXRsZUl0ZW1QYWdlLmxhbmd1YWdlUGFnZU5hbWUoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJNeUJldFJlY29yZFwiLCB0cnVlKSk7XG4gICAgICAgIHRoaXMubGFiUmVzdWx0Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJSZXN1bHRcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiQmV0R29sZC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiQmV0R29sZFwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJXaW5DaGlwcy5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiV2luQ2hpcHNcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMYXN0UmVjb3JkSWQoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBpZCA9IHRoaXMuY3VycmVudEluZGV4UGFnZSArIFBBR0VfQ09VTlQ7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmn6Xor6Lljoblj7LorrDlvZVcbiAgICAgKiBAcGFyYW0gdGltZXN0YW1wIHtudW1iZXJ9IOafpeivouWTquWkqeaXtumXtOaIs1xuICAgICAqL1xuICAgIHByaXZhdGUgQzJSX0dldEdhbWVSZWNvcmRzX1JlcShpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpbmRleCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gREVGQVVMVF9GSVJTVF9JRDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhOiBNU1QuQzJSX0dldEJldEluZm9fUmVxID0ge1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBsaW1pdDogUEFHRV9DT1VOVCxcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVxID0gTVNULkMyUl9HZXRCZXRJbmZvX1JlcS5jcmVhdGUoZGF0YSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJSX0dldEJldEluZm9fUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJSX0dldEJldEluZm9fUmVxLCBNU1QuT3V0ZXJPcGNvZGVfUm91bGV0dGUuQzJSX0dldEJldEluZm9fUmVxLCBidWZmZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9vblIyQ19HZXRCZXRJbmZvX1JlcyhkYXRhOiBNU1QuSVIyQ19HZXRCZXRJbmZvX1Jlcyk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5pbmRleCA9PT0gREVGQVVMVF9GSVJTVF9JRCAmJiBkYXRhLnJlY29yZHMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMubm9uZUl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sc3ZSZWNvcmQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9uZUl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubHN2UmVjb3JkLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOaYr+WQpuacgOWQjuS4gOmhtVxuICAgICAgICB0aGlzLl9pc0xhc3RQYWdlID0gZGF0YS5yZWNvcmRzLmxlbmd0aCA8IFBBR0VfQ09VTlQ7XG5cblxuICAgICAgICBpZiAoZGF0YS5pbmRleCA9PT0gREVGQVVMVF9GSVJTVF9JRCkge1xuICAgICAgICAgICAgdGhpcy5fZ2FtZVJlY29yZERhdGFMaXN0ID0gW10uY29uY2F0KGRhdGEucmVjb3Jkcyk7XG4gICAgICAgICAgICB0aGlzLmxzdlJlY29yZC5zZXQoZGF0YS5yZWNvcmRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dhbWVSZWNvcmREYXRhTGlzdCA9IHRoaXMuX2dhbWVSZWNvcmREYXRhTGlzdC5jb25jYXQoZGF0YS5yZWNvcmRzKTtcbiAgICAgICAgICAgIHRoaXMubHN2UmVjb3JkLmluc2VydChkYXRhLnJlY29yZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIrmi4nlm57osINcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxuICAgICAqL1xuICAgIHByaXZhdGUgb25QdWxsVG9wKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5DMlJfR2V0R2FtZVJlY29yZHNfUmVxKDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4i+aLieWbnuiwg1xuICAgICAqL1xuICAgIHByaXZhdGUgb25QdWxsQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzTGFzdFBhZ2UpIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhcIkNyYXNoIOa1j+iniOaAu+WOhuWPsuiusOW9lSDlt7LmmK/mnIDlkI7kuIDpobUg5peg6ZyA6K+35rGC57+76aG1XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuQzJSX0dldEdhbWVSZWNvcmRzX1JlcSh0aGlzLmdldExhc3RSZWNvcmRJZCgpKTtcbiAgICB9XG5cbn1cbiJdfQ==