
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/CrashLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5c9derz+C9EV4lxQyGRL1Vk', 'CrashLogic');
// games/crash/script/CrashLogic.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = require("../../../script/common/base/Logic");
const LogicEvent_1 = require("../../../script/common/event/LogicEvent");
const Manager_1 = require("../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../script/common/net/LobbyService");
const ResourceLoader_1 = require("../../../script/framework/assetManager/ResourceLoader");
const CrashGameData_1 = require("./data/CrashGameData");
const CrashGameView_1 = __importDefault(require("./view/CrashGameView"));
class CrashLogic extends Logic_1.Logic {
    constructor() {
        super(...arguments);
        this.logicType = LogicEvent_1.LogicType.GAME;
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_GAME, this.onEnterGame);
    }
    get bundle() {
        return "crash";
    }
    onEnterComplete(data) {
        super.onEnterComplete(data);
        if (data.type == this.logicType) {
        }
        else {
            //移除网络组件
            this.removeNetComponent();
            //卸载资源
            this._loader.unLoadResources();
        }
    }
    onEnterGame(msg) {
        if (msg.bundle == this.bundle) {
            this.data = msg.data;
            // Manager.uiManager.open({ type: CrashGameView, bundle: this.bundle , args:[msg.data]});
            //游戏数据初始化
            Manager_1.Manager.gameData = CrashGameData_1.Crash.gameData;
            Manager_1.Manager.gameData.clear();
            //子游戏语言包初始化
            this.onLanguageChange();
            //先暂停网络回调处理，等待资源加载完成后，恢复处理
            LobbyService_1.LobbyService.instance.pauseMessageQueue();
            //加载资源
            this._loader.loadResources();
        }
        else {
            //移除网络组件
            this.removeNetComponent();
            //卸载资源
            this._loader.unLoadResources();
        }
    }
    onLoadResourceComplete(err) {
        if (err == ResourceLoader_1.ResourceLoaderError.LOADING) {
            return;
        }
        cc.log(`${this.bundle}资源加载完成!!!`);
        super.onLoadResourceComplete(err);
        Manager_1.Manager.uiManager.open({ type: CrashGameView_1.default, bundle: this.bundle, args: [this.data] }).then(() => {
            //加载完成，恢复网络
            LobbyService_1.LobbyService.instance.resumeMessageQueue();
        }).catch((e) => {
            LobbyService_1.LobbyService.instance.resumeMessageQueue();
            cc.error(`打开游戏界面：${CrashGameView_1.default.name}时报错了:`, e);
        });
    }
    getLoadResources() {
        return [{ preloadView: CrashGameView_1.default, bundle: this.bundle }];
    }
    onLanguageChange() {
        super.onLanguageChange();
        CrashGameData_1.Crash.gameData.onLanguageChange();
    }
}
Manager_1.Manager.logicManager.push(CrashLogic);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvQ3Jhc2hMb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUEwRDtBQUMxRCx3RUFBZ0c7QUFDaEcsb0VBQWlFO0FBQ2pFLDBFQUF1RTtBQUN2RSwwRkFBNEY7QUFFNUYsd0RBQTZDO0FBQzdDLHlFQUFpRDtBQUVqRCxNQUFNLFVBQVcsU0FBUSxhQUFLO0lBQTlCOztRQUVJLGNBQVMsR0FBYyxzQkFBUyxDQUFDLElBQUksQ0FBQztJQTRFMUMsQ0FBQztJQXpFRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFUyxhQUFhO1FBQ25CLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBYyxNQUFNO1FBQ2hCLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSxlQUFlLENBQUMsSUFBb0I7UUFDdkMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtTQUVoQzthQUFNO1lBQ0gsUUFBUTtZQUNSLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLE1BQU07WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUFHO1FBQ25CLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQix5RkFBeUY7WUFDekYsU0FBUztZQUNULGlCQUFPLENBQUMsUUFBUSxHQUFHLHFCQUFLLENBQUMsUUFBUSxDQUFDO1lBQ2xDLGlCQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXpCLFdBQVc7WUFDWCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QiwwQkFBMEI7WUFDMUIsMkJBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMxQyxNQUFNO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNoQzthQUFNO1lBQ0gsUUFBUTtZQUNSLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLE1BQU07WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVTLHNCQUFzQixDQUFDLEdBQXdCO1FBQ3JELElBQUksR0FBRyxJQUFJLG9DQUFtQixDQUFDLE9BQU8sRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sV0FBVyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx1QkFBYSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM5RixXQUFXO1lBQ1gsMkJBQVksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNYLDJCQUFZLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDM0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLHVCQUFhLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDcEQsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRVMsZ0JBQWdCO1FBQ3RCLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSx1QkFBYSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRVMsZ0JBQWdCO1FBQ3RCLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pCLHFCQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBRUQsaUJBQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naWMgfSBmcm9tIFwiLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9iYXNlL0xvZ2ljXCI7XG5pbXBvcnQgeyBMb2dpY1R5cGUsIExvZ2ljRXZlbnQsIExvZ2ljRXZlbnREYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NjcmlwdC9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NjcmlwdC9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgUmVzb3VyY2VMb2FkZXJFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2Fzc2V0TWFuYWdlci9SZXNvdXJjZUxvYWRlclwiO1xuaW1wb3J0IHsgUmVzb3VyY2VEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBDcmFzaCB9IGZyb20gXCIuL2RhdGEvQ3Jhc2hHYW1lRGF0YVwiO1xuaW1wb3J0IENyYXNoR2FtZVZpZXcgZnJvbSBcIi4vdmlldy9DcmFzaEdhbWVWaWV3XCI7XG5cbmNsYXNzIENyYXNoTG9naWMgZXh0ZW5kcyBMb2dpYyB7XG5cbiAgICBsb2dpY1R5cGU6IExvZ2ljVHlwZSA9IExvZ2ljVHlwZS5HQU1FO1xuICAgIHByaXZhdGUgZGF0YTogYW55O1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoTG9naWNFdmVudC5FTlRFUl9HQU1FLCB0aGlzLm9uRW50ZXJHYW1lKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGJ1bmRsZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiY3Jhc2hcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25FbnRlckNvbXBsZXRlKGRhdGE6IExvZ2ljRXZlbnREYXRhKSB7XG4gICAgICAgIHN1cGVyLm9uRW50ZXJDb21wbGV0ZShkYXRhKTtcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PSB0aGlzLmxvZ2ljVHlwZSkge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+enu+mZpOe9kee7nOe7hOS7tlxuICAgICAgICAgICAgdGhpcy5yZW1vdmVOZXRDb21wb25lbnQoKTtcbiAgICAgICAgICAgIC8v5Y246L296LWE5rqQXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIudW5Mb2FkUmVzb3VyY2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRW50ZXJHYW1lKG1zZykge1xuICAgICAgICBpZiAobXNnLmJ1bmRsZSA9PSB0aGlzLmJ1bmRsZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbXNnLmRhdGE7XG4gICAgICAgICAgICAvLyBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQ3Jhc2hHYW1lVmlldywgYnVuZGxlOiB0aGlzLmJ1bmRsZSAsIGFyZ3M6W21zZy5kYXRhXX0pO1xuICAgICAgICAgICAgLy/muLjmiI/mlbDmja7liJ3lp4vljJZcbiAgICAgICAgICAgIE1hbmFnZXIuZ2FtZURhdGEgPSBDcmFzaC5nYW1lRGF0YTtcbiAgICAgICAgICAgIE1hbmFnZXIuZ2FtZURhdGEuY2xlYXIoKTtcblxuICAgICAgICAgICAgLy/lrZDmuLjmiI/or63oqIDljIXliJ3lp4vljJZcbiAgICAgICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZSgpO1xuXG4gICAgICAgICAgICAvL+WFiOaaguWBnOe9kee7nOWbnuiwg+WkhOeQhu+8jOetieW+hei1hOa6kOWKoOi9veWujOaIkOWQju+8jOaBouWkjeWkhOeQhlxuICAgICAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnBhdXNlTWVzc2FnZVF1ZXVlKCk7XG4gICAgICAgICAgICAvL+WKoOi9vei1hOa6kFxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRSZXNvdXJjZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v56e76Zmk572R57uc57uE5Lu2XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU5ldENvbXBvbmVudCgpO1xuICAgICAgICAgICAgLy/ljbjovb3otYTmupBcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci51bkxvYWRSZXNvdXJjZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxvYWRSZXNvdXJjZUNvbXBsZXRlKGVycjogUmVzb3VyY2VMb2FkZXJFcnJvcikge1xuICAgICAgICBpZiAoZXJyID09IFJlc291cmNlTG9hZGVyRXJyb3IuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhgJHt0aGlzLmJ1bmRsZX3otYTmupDliqDovb3lrozmiJAhISFgKTtcbiAgICAgICAgc3VwZXIub25Mb2FkUmVzb3VyY2VDb21wbGV0ZShlcnIpO1xuXG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBDcmFzaEdhbWVWaWV3LCBidW5kbGU6IHRoaXMuYnVuZGxlLCBhcmdzOiBbdGhpcy5kYXRhXSB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8v5Yqg6L295a6M5oiQ77yM5oGi5aSN572R57ucXG4gICAgICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2UucmVzdW1lTWVzc2FnZVF1ZXVlKCk7XG4gICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2UucmVzdW1lTWVzc2FnZVF1ZXVlKCk7XG4gICAgICAgICAgICBjYy5lcnJvcihg5omT5byA5ri45oiP55WM6Z2i77yaJHtDcmFzaEdhbWVWaWV3Lm5hbWV95pe25oql6ZSZ5LqGOmAsIGUpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0TG9hZFJlc291cmNlcygpOiBSZXNvdXJjZURhdGFbXSB7XG4gICAgICAgIHJldHVybiBbeyBwcmVsb2FkVmlldzogQ3Jhc2hHYW1lVmlldywgYnVuZGxlOiB0aGlzLmJ1bmRsZSB9XTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZSgpIHtcbiAgICAgICAgc3VwZXIub25MYW5ndWFnZUNoYW5nZSgpO1xuICAgICAgICBDcmFzaC5nYW1lRGF0YS5vbkxhbmd1YWdlQ2hhbmdlKCk7XG4gICAgfVxufVxuXG5NYW5hZ2VyLmxvZ2ljTWFuYWdlci5wdXNoKENyYXNoTG9naWMpOyJdfQ==