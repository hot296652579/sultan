
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/base/Logic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aef19i0aeFBvY497I6IWj/K', 'Logic');
// script/common/base/Logic.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logic = void 0;
const LogicEvent_1 = require("../event/LogicEvent");
const EventComponent_1 = __importDefault(require("../../framework/base/EventComponent"));
const Defines_1 = require("../../framework/base/Defines");
const ResourceLoader_1 = __importDefault(require("../../framework/assetManager/ResourceLoader"));
const EventApi_1 = require("../../framework/event/EventApi");
const Config_1 = require("../config/Config");
/**
 * @description 逻辑控制器 需要实现LogicInterface
*/
class Logic extends EventComponent_1.default {
    constructor() {
        super();
        this.logTag = `[Logic]`;
        this._loader = null;
        this.logicType = LogicEvent_1.LogicType.UNKNOWN;
        this._loader = new ResourceLoader_1.default();
        //绑定加载器获取资源的回调
        this._loader.getLoadResources = this.getLoadResources.bind(this);
        //绑定加载器加载资源完成回调
        this._loader.onLoadComplete = this.onLoadResourceComplete.bind(this);
        this._loader.onLoadProgress = this.onLoadResourceProgress.bind(this);
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    get bundle() {
        cc.error(`请子类重写protected get bundle,返回游戏的包名,即 asset bundle name`);
        return "";
    }
    /**@description 进入各模块完成回调 */
    onEnterComplete(data) {
    }
    onLanguageChange() {
    }
    init(data) {
        if (this.logicType == LogicEvent_1.LogicType.UNKNOWN) {
            cc.error(`未对正确的对logicType赋值`);
        }
        this.node = data;
    }
    onLoad() {
        if (!!this.bundle) {
            Config_1.Config.assetBundle[`${this.bundle}`] = this.bundle;
        }
        else {
            cc.error(`请子类重写protected get bundle,返回游戏的包名,即 asset bundle name`);
        }
        super.onLoad();
    }
    onDestroy() {
        super.onDestroy();
        this.node = null;
    }
    /**@description 获取需要加载的资源 */
    getLoadResources() {
        return [];
    }
    /**@description 资源加载完成 */
    onLoadResourceComplete(err) {
    }
    /**@description 资源加载中 */
    onLoadResourceProgress(loadedCount, total, data) {
    }
    //移除网络组件
    removeNetComponent() {
    }
    //添加网络组件
    addNetComponent() {
    }
}
exports.Logic = Logic;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2Jhc2UvTG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBQ2hFLHlGQUFpRTtBQUNqRSwwREFBdUc7QUFDdkcsaUdBQWtHO0FBQ2xHLDZEQUEwRDtBQUMxRCw2Q0FBMEM7QUFHMUM7O0VBRUU7QUFFRixNQUFhLEtBQU0sU0FBUSx3QkFBYztJQU9yQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBTkYsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUNuQixZQUFPLEdBQW1CLElBQUksQ0FBQztRQUUvQixjQUFTLEdBQWMsc0JBQVMsQ0FBQyxPQUFPLENBQUM7UUFLL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHdCQUFjLEVBQUUsQ0FBQztRQUVwQyxjQUFjO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLGVBQWU7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVTLGFBQWE7UUFDbkIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksZ0NBQXNCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFFRCxJQUFjLE1BQU07UUFDaEIsRUFBRSxDQUFDLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELDRCQUE0QjtJQUNyQixlQUFlLENBQUMsSUFBb0I7SUFFM0MsQ0FBQztJQUVTLGdCQUFnQjtJQUUxQixDQUFDO0lBRU0sSUFBSSxDQUFDLElBQWE7UUFDckIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLHNCQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNO1FBQ1QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLGVBQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3REO2FBQU07WUFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7U0FDckU7UUFDRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVNLFNBQVM7UUFDWixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELDRCQUE0QjtJQUNsQixnQkFBZ0I7UUFDdEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQseUJBQXlCO0lBQ2Ysc0JBQXNCLENBQUMsR0FBd0I7SUFDekQsQ0FBQztJQUVELHdCQUF3QjtJQUNkLHNCQUFzQixDQUFDLFdBQW1CLEVBQUUsS0FBYSxFQUFFLElBQXVCO0lBQzVGLENBQUM7SUFFRCxRQUFRO0lBQ0Usa0JBQWtCO0lBRTVCLENBQUM7SUFFRCxRQUFRO0lBQ0UsZUFBZTtJQUV6QixDQUFDO0NBQ0o7QUFuRkQsc0JBbUZDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naWNFdmVudERhdGEsIExvZ2ljVHlwZSB9IGZyb20gXCIuLi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgRXZlbnRDb21wb25lbnQgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9iYXNlL0V2ZW50Q29tcG9uZW50XCI7XG5pbXBvcnQgeyBSZXNvdXJjZURhdGEsIFJlc291cmNlQ2FjaGVEYXRhLCBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBSZXNvdXJjZUxvYWRlciwgeyBSZXNvdXJjZUxvYWRlckVycm9yIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9hc3NldE1hbmFnZXIvUmVzb3VyY2VMb2FkZXJcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL0ZyYW1ld29ya1wiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDpgLvovpHmjqfliLblmagg6ZyA6KaB5a6e546wTG9naWNJbnRlcmZhY2VcbiovXG5cbmV4cG9ydCBjbGFzcyBMb2dpYyBleHRlbmRzIEV2ZW50Q29tcG9uZW50IHtcblxuICAgIHByb3RlY3RlZCBsb2dUYWcgPSBgW0xvZ2ljXWA7XG4gICAgcHJvdGVjdGVkIF9sb2FkZXI6IFJlc291cmNlTG9hZGVyID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCBsb2dpY1R5cGU6IExvZ2ljVHlwZSA9IExvZ2ljVHlwZS5VTktOT1dOO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbmV3IFJlc291cmNlTG9hZGVyKCk7XG5cbiAgICAgICAgLy/nu5HlrprliqDovb3lmajojrflj5botYTmupDnmoTlm57osINcbiAgICAgICAgdGhpcy5fbG9hZGVyLmdldExvYWRSZXNvdXJjZXMgPSB0aGlzLmdldExvYWRSZXNvdXJjZXMuYmluZCh0aGlzKTtcbiAgICAgICAgLy/nu5HlrprliqDovb3lmajliqDovb3otYTmupDlrozmiJDlm57osINcbiAgICAgICAgdGhpcy5fbG9hZGVyLm9uTG9hZENvbXBsZXRlID0gdGhpcy5vbkxvYWRSZXNvdXJjZUNvbXBsZXRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2xvYWRlci5vbkxvYWRQcm9ncmVzcyA9IHRoaXMub25Mb2FkUmVzb3VyY2VQcm9ncmVzcy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIGlmIChFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuQ0hBTkdFX0xBTkdVQUdFLCB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBidW5kbGUoKTogc3RyaW5nIHtcbiAgICAgICAgY2MuZXJyb3IoYOivt+WtkOexu+mHjeWGmXByb3RlY3RlZCBnZXQgYnVuZGxlLOi/lOWbnua4uOaIj+eahOWMheWQjSzljbMgYXNzZXQgYnVuZGxlIG5hbWVgKTtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOi/m+WFpeWQhOaooeWdl+WujOaIkOWbnuiwgyAqL1xuICAgIHB1YmxpYyBvbkVudGVyQ29tcGxldGUoZGF0YTogTG9naWNFdmVudERhdGEpIHtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoZGF0YTogY2MuTm9kZSkge1xuICAgICAgICBpZiAodGhpcy5sb2dpY1R5cGUgPT0gTG9naWNUeXBlLlVOS05PV04pIHtcbiAgICAgICAgICAgIGNjLmVycm9yKGDmnKrlr7nmraPnoa7nmoTlr7lsb2dpY1R5cGXotYvlgLxgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUgPSBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxvYWQoKSB7XG4gICAgICAgIGlmICghIXRoaXMuYnVuZGxlKSB7XG4gICAgICAgICAgICBDb25maWcuYXNzZXRCdW5kbGVbYCR7dGhpcy5idW5kbGV9YF0gPSB0aGlzLmJ1bmRsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9yKGDor7flrZDnsbvph43lhplwcm90ZWN0ZWQgZ2V0IGJ1bmRsZSzov5Tlm57muLjmiI/nmoTljIXlkI0s5Y2zIGFzc2V0IGJ1bmRsZSBuYW1lYCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgICAgIHRoaXMubm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOiOt+WPlumcgOimgeWKoOi9veeahOi1hOa6kCAqL1xuICAgIHByb3RlY3RlZCBnZXRMb2FkUmVzb3VyY2VzKCk6IFJlc291cmNlRGF0YVtdIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDotYTmupDliqDovb3lrozmiJAgKi9cbiAgICBwcm90ZWN0ZWQgb25Mb2FkUmVzb3VyY2VDb21wbGV0ZShlcnI6IFJlc291cmNlTG9hZGVyRXJyb3IpIHtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6LWE5rqQ5Yqg6L295LitICovXG4gICAgcHJvdGVjdGVkIG9uTG9hZFJlc291cmNlUHJvZ3Jlc3MobG9hZGVkQ291bnQ6IG51bWJlciwgdG90YWw6IG51bWJlciwgZGF0YTogUmVzb3VyY2VDYWNoZURhdGEpIHtcbiAgICB9XG5cbiAgICAvL+enu+mZpOe9kee7nOe7hOS7tlxuICAgIHByb3RlY3RlZCByZW1vdmVOZXRDb21wb25lbnQoKSB7XG5cbiAgICB9XG5cbiAgICAvL+a3u+WKoOe9kee7nOe7hOS7tlxuICAgIHByb3RlY3RlZCBhZGROZXRDb21wb25lbnQoKSB7XG5cbiAgICB9XG59Il19