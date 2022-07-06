
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashCheckView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '20d80oXDHdKzIXFGpg2fs84', 'CrashCheckView');
// games/crash/script/view/CrashCheckView.ts

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
const TitleItemPage_1 = __importDefault(require("../../../../script/common/item/TitleItemPage"));
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const CrashConfig_1 = require("../config/CrashConfig");
const CrashData_1 = __importDefault(require("../data/CrashData"));
const { ccclass, property } = cc._decorator;
let CrashCheckView = class CrashCheckView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.wbvCheck = null;
        this.titleItemPage = null;
        // 游戏数据
        this._crashData = null;
        // 游戏号
        this._gameNo = null;
    }
    static getPrefabUrl() {
        return "prefabs/CrashCheckView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
        this._gameNo = args[0];
        this.wbvCheck.url = `${CrashConfig_1.CrashConfig.CHECK_SHA256_URL}${this.getURLParam()}`;
    }
    initData() {
        this._crashData = G.DataMgr.get(CrashData_1.default);
        this._gameNo = null;
    }
    initView() {
    }
    getURLParam() {
        return `${this._crashData.totalRecordData.SeedInfo.ServerSeed}${this._crashData.totalRecordData.SeedInfo.PublicSeed}${this._gameNo}`;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labRecordPageName", true));
    }
};
__decorate([
    property(cc.WebView)
], CrashCheckView.prototype, "wbvCheck", void 0);
__decorate([
    property(TitleItemPage_1.default)
], CrashCheckView.prototype, "titleItemPage", void 0);
CrashCheckView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashCheckView);
exports.default = CrashCheckView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaENoZWNrVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGlHQUF5RTtBQUN6RSx1RUFBb0U7QUFDcEUsNkVBQTBFO0FBRzFFLHVFQUFtRjtBQUVuRixrRkFBa0Y7QUFDbEYsMEVBQXVFO0FBR3ZFLG9GQUE0RDtBQUU1RCx1REFBb0Q7QUFDcEQsa0VBQTBDO0FBRTFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWUsU0FBUSxnQkFBTTtJQUFsRDs7UUFJWSxhQUFRLEdBQWUsSUFBSSxDQUFDO1FBRzVCLGtCQUFhLEdBQWtCLElBQUksQ0FBQztRQUU1QyxPQUFPO1FBQ0MsZUFBVSxHQUFjLElBQUksQ0FBQztRQUNyQyxNQUFNO1FBQ0UsWUFBTyxHQUFXLElBQUksQ0FBQztJQXFEbkMsQ0FBQztJQW5EVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLHdCQUF3QixDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVwQixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFTSxJQUFJLENBQUMsSUFBWTtRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcseUJBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQVMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxRQUFRO0lBRWhCLENBQUM7SUFFTyxXQUFXO1FBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekksQ0FBQztJQUVELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFdEIsSUFBSSxnQ0FBc0IsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3ZFO0lBRUwsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsaUJBQU8sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV6RixDQUFDO0NBRUosQ0FBQTtBQTdERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2dEQUNlO0FBR3BDO0lBREMsUUFBUSxDQUFDLHVCQUFhLENBQUM7cURBQ29CO0FBUDNCLGNBQWM7SUFGbEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsY0FBYyxDQWlFbEM7a0JBakVvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9MaXN0Vmlld1wiO1xuaW1wb3J0IE5vbmVJdGVtIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2l0ZW0vTm9uZUl0ZW1cIjtcbmltcG9ydCBUaXRsZUl0ZW1QYWdlIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2l0ZW0vVGl0bGVJdGVtUGFnZVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IFR5cGVVdGlscyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi91dGlscy9UeXBlVXRpbHNcIjtcbmltcG9ydCBBcHBEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZGF0YS9BcHBEYXRhXCI7XG5pbXBvcnQgeyBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgRGF0ZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvRGF0ZVV0aWxzXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgQ3Jhc2hDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnL0NyYXNoQ29uZmlnXCI7XG5pbXBvcnQgQ3Jhc2hEYXRhIGZyb20gXCIuLi9kYXRhL0NyYXNoRGF0YVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jhc2hDaGVja1ZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuV2ViVmlldylcbiAgICBwcml2YXRlIHdidkNoZWNrOiBjYy5XZWJWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShUaXRsZUl0ZW1QYWdlKVxuICAgIHByaXZhdGUgdGl0bGVJdGVtUGFnZTogVGl0bGVJdGVtUGFnZSA9IG51bGw7XG5cbiAgICAvLyDmuLjmiI/mlbDmja5cbiAgICBwcml2YXRlIF9jcmFzaERhdGE6IENyYXNoRGF0YSA9IG51bGw7XG4gICAgLy8g5ri45oiP5Y+3XG4gICAgcHJpdmF0ZSBfZ2FtZU5vOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInByZWZhYnMvQ3Jhc2hDaGVja1ZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdyhhcmdzPzogYW55W10pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG5cbiAgICAgICAgdGhpcy5fZ2FtZU5vID0gYXJnc1swXTtcbiAgICAgICAgdGhpcy53YnZDaGVjay51cmwgPSBgJHtDcmFzaENvbmZpZy5DSEVDS19TSEEyNTZfVVJMfSR7dGhpcy5nZXRVUkxQYXJhbSgpfWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3Jhc2hEYXRhID0gRy5EYXRhTWdyLmdldChDcmFzaERhdGEpO1xuICAgICAgICB0aGlzLl9nYW1lTm8gPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFVSTFBhcmFtKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLl9jcmFzaERhdGEudG90YWxSZWNvcmREYXRhLlNlZWRJbmZvLlNlcnZlclNlZWR9JHt0aGlzLl9jcmFzaERhdGEudG90YWxSZWNvcmREYXRhLlNlZWRJbmZvLlB1YmxpY1NlZWR9JHt0aGlzLl9nYW1lTm99YDtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMudGl0bGVJdGVtUGFnZS5sYW5ndWFnZVBhZ2VOYW1lKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiUmVjb3JkUGFnZU5hbWVcIiwgdHJ1ZSkpO1xuXG4gICAgfVxuXG59XG4iXX0=