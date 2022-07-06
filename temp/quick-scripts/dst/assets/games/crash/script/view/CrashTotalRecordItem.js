
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashTotalRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6aab0BVs7dOEZvS/o0OUXeP', 'CrashTotalRecordItem');
// games/crash/script/view/CrashTotalRecordItem.ts

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
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const TypeUtils_1 = __importDefault(require("../../../../script/common/utils/TypeUtils"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
const CrashConfig_1 = require("../config/CrashConfig");
const CrashData_1 = __importDefault(require("../data/CrashData"));
const { ccclass, property } = cc._decorator;
let CrashTotalRecordItem = class CrashTotalRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labGameNo = null;
        this.labDate = null;
        this.labRoundHash = null;
        this.labRoundHashValue = null;
        this.labAcak = null;
        this.labAcakValue = null;
        this.labPoint = null;
        this.labPointValue = null;
        this.labCheck = null;
        this.imgLine = null;
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
        this.labGameNo.string = "";
        this.labDate.string = "";
        this.labRoundHash.string = "";
        this.labRoundHashValue.string = "";
        this.labAcak.string = "";
        this.labAcakValue.string = "";
        this.labPoint.string = "";
        this.labPointValue.string = "";
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.labPoint.language = Manager_1.Manager.makeLanguage("labPoint", true);
        this.labRoundHash.language = Manager_1.Manager.makeLanguage("labRoundHash", true);
        this.labAcak.language = Manager_1.Manager.makeLanguage("labAcak", true);
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labGameNo.language = Manager_1.Manager.makeLanguage(["labGameNo", data.GameNo], true);
        this.labDate.string = DateUtils_1.default.getYMDHMS(data.Timestamp);
        this.labPointValue.string = `${NumberUtils_1.default.converToC(data.Multiple)}x`;
        this.labRoundHashValue.string = data.RoundHashCell.RoundHash;
        this.labAcakValue.string = data.RoundHashCell.Acak.toString();
    }
    reset() {
        this.initData();
        this.initView();
    }
    openCheckWeb() {
        let crashData = G.DataMgr.get(CrashData_1.default);
        let serverSeed = crashData.totalRecordData.SeedInfo.ServerSeed;
        if (TypeUtils_1.default.isNull(serverSeed) || serverSeed.length <= 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("todayNotFind", true));
            return;
        }
        let publicSeed = crashData.totalRecordData.SeedInfo.PublicSeed;
        let gameNo = this._data.GameNo;
        let url = `${CrashConfig_1.CrashConfig.CHECK_SHA256_URL}${serverSeed}${publicSeed}${gameNo}`;
        cc.sys.openURL(url);
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnCheck":
                // Manager.uiManager.open({ type: CrashCheckView, bundle: SubGameDefine.GameName.CRASH, args: [this._data.GameNo] });
                this.openCheckWeb();
                break;
        }
    }
};
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labGameNo", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labRoundHash", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labRoundHashValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labAcak", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labAcakValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labPoint", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labPointValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labCheck", void 0);
__decorate([
    property(cc.Sprite)
], CrashTotalRecordItem.prototype, "imgLine", void 0);
CrashTotalRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashTotalRecordItem);
exports.default = CrashTotalRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaFRvdGFsUmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFDMUUsOEZBQXNFO0FBQ3RFLDBGQUFrRTtBQUNsRSx1RUFBbUY7QUFFbkYsa0ZBQWtGO0FBQ2xGLDBFQUF1RTtBQUN2RSxrR0FBMEU7QUFFMUUsb0ZBQTREO0FBQzVELG9GQUE0RDtBQUM1RCx1REFBb0Q7QUFDcEQsa0VBQTBDO0FBRzFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixvQkFBb0IsR0FBekMsTUFBcUIsb0JBQXFCLFNBQVEsZ0JBQU07SUFBeEQ7O1FBSVksY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLHNCQUFpQixHQUFhLElBQUksQ0FBQztRQUduQyxZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsa0JBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBRWpDLEtBQUs7UUFDRyxVQUFLLEdBQXlCLElBQUksQ0FBQztJQW1GL0MsQ0FBQztJQWpGRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsS0FBSztJQUVmLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIs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QixvQkFBb0IsQ0FxSHhDO2tCQXJIb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViR2FtZURlZmluZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2RlZmluZS9TdWJHYW1lRGVmaW5lXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBUeXBlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvVHlwZVV0aWxzXCI7XG5pbXBvcnQgeyBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgRGF0ZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvRGF0ZVV0aWxzXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgQ3Jhc2hDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnL0NyYXNoQ29uZmlnXCI7XG5pbXBvcnQgQ3Jhc2hEYXRhIGZyb20gXCIuLi9kYXRhL0NyYXNoRGF0YVwiO1xuaW1wb3J0IENyYXNoQ2hlY2tWaWV3IGZyb20gXCIuL0NyYXNoQ2hlY2tWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmFzaFRvdGFsUmVjb3JkSXRlbSBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkdhbWVObzogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiRGF0ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUm91bmRIYXNoOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJSb3VuZEhhc2hWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQWNhazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQWNha1ZhbHVlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJQb2ludDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUG9pbnRWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ2hlY2s6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdMaW5lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyDmlbDmja5cbiAgICBwcml2YXRlIF9kYXRhOiBNU1QuSUNyYXNoUmVjb3JkSW5mbyA9IG51bGw7XG5cbiAgICBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiR2FtZU5vLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiRGF0ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlJvdW5kSGFzaC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlJvdW5kSGFzaFZhbHVlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQWNhay5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkFjYWtWYWx1ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlBvaW50LnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiUG9pbnRWYWx1ZS5zdHJpbmcgPSBcIlwiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmxhYlBvaW50Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJQb2ludFwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJSb3VuZEhhc2gubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYlJvdW5kSGFzaFwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJBY2FrLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJBY2FrXCIsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3coZGF0YTogTVNULklDcmFzaFJlY29yZEluZm8pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5sYWJHYW1lTm8ubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShbXCJsYWJHYW1lTm9cIiwgZGF0YS5HYW1lTm9dLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJEYXRlLnN0cmluZyA9IERhdGVVdGlscy5nZXRZTURITVMoZGF0YS5UaW1lc3RhbXApO1xuICAgICAgICB0aGlzLmxhYlBvaW50VmFsdWUuc3RyaW5nID0gYCR7TnVtYmVyVXRpbHMuY29udmVyVG9DKGRhdGEuTXVsdGlwbGUpfXhgO1xuICAgICAgICB0aGlzLmxhYlJvdW5kSGFzaFZhbHVlLnN0cmluZyA9IGRhdGEuUm91bmRIYXNoQ2VsbC5Sb3VuZEhhc2g7XG4gICAgICAgIHRoaXMubGFiQWNha1ZhbHVlLnN0cmluZyA9IGRhdGEuUm91bmRIYXNoQ2VsbC5BY2FrLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkNoZWNrV2ViKCk6IHZvaWQge1xuICAgICAgICBsZXQgY3Jhc2hEYXRhOiBDcmFzaERhdGEgPSBHLkRhdGFNZ3IuZ2V0KENyYXNoRGF0YSk7XG4gICAgICAgIGxldCBzZXJ2ZXJTZWVkOiBzdHJpbmcgPSBjcmFzaERhdGEudG90YWxSZWNvcmREYXRhLlNlZWRJbmZvLlNlcnZlclNlZWQ7XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwoc2VydmVyU2VlZCkgfHwgc2VydmVyU2VlZC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJ0b2RheU5vdEZpbmRcIiwgdHJ1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHB1YmxpY1NlZWQ6IHN0cmluZyA9IGNyYXNoRGF0YS50b3RhbFJlY29yZERhdGEuU2VlZEluZm8uUHVibGljU2VlZDtcbiAgICAgICAgbGV0IGdhbWVObzogbnVtYmVyID0gdGhpcy5fZGF0YS5HYW1lTm87XG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IGAke0NyYXNoQ29uZmlnLkNIRUNLX1NIQTI1Nl9VUkx9JHtzZXJ2ZXJTZWVkfSR7cHVibGljU2VlZH0ke2dhbWVOb31gO1xuICAgICAgICBjYy5zeXMub3BlblVSTCh1cmwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrKEJ1dHRvbk5hbWU6IGFueSwgQnV0dG9uTm9kZTogYW55LCBkYXRhPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoQnV0dG9uTmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImJ0bkNoZWNrXCI6XG4gICAgICAgICAgICAgICAgLy8gTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IENyYXNoQ2hlY2tWaWV3LCBidW5kbGU6IFN1YkdhbWVEZWZpbmUuR2FtZU5hbWUuQ1JBU0gsIGFyZ3M6IFt0aGlzLl9kYXRhLkdhbWVOb10gfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQ2hlY2tXZWIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19