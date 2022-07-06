
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/RouletteLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9882fvM2+tJ9IeqwSIxa9PA', 'RouletteLogic');
// games/roulette/script/RouletteLogic.ts

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
const RouletteGameData_1 = require("./data/RouletteGameData");
const RouletteView_1 = __importDefault(require("./view/RouletteView"));
class RouletteLogic extends Logic_1.Logic {
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
        return "roulette";
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
            // Manager.uiManager.open({ type: WingoGameView, bundle: this.bundle , args:[msg.data]});
            //游戏数据初始化
            Manager_1.Manager.gameData = RouletteGameData_1.Roulette.gameData;
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
        Manager_1.Manager.uiManager.open({ type: RouletteView_1.default, bundle: this.bundle, args: [this.data] }).then(() => {
            //加载完成，恢复网络
            LobbyService_1.LobbyService.instance.resumeMessageQueue();
        }).catch((e) => {
            LobbyService_1.LobbyService.instance.resumeMessageQueue();
            cc.error(`打开y游戏界面：${RouletteView_1.default.name}时报错了:`, e);
        });
    }
    getLoadResources() {
        return [{ preloadView: RouletteView_1.default, bundle: this.bundle }];
    }
    onLanguageChange() {
        super.onLanguageChange();
        RouletteGameData_1.Roulette.gameData.onLanguageChange();
    }
}
Manager_1.Manager.logicManager.push(RouletteLogic);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvUm91bGV0dGVMb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUEwRDtBQUMxRCx3RUFBZ0c7QUFDaEcsb0VBQWlFO0FBQ2pFLDBFQUF1RTtBQUN2RSwwRkFBNEY7QUFFNUYsOERBQW1EO0FBQ25ELHVFQUErQztBQUUvQyxNQUFNLGFBQWMsU0FBUSxhQUFLO0lBQWpDOztRQUVJLGNBQVMsR0FBYyxzQkFBUyxDQUFDLElBQUksQ0FBQztJQTRFMUMsQ0FBQztJQXpFRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFUyxhQUFhO1FBQ25CLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBYyxNQUFNO1FBQ2hCLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxlQUFlLENBQUMsSUFBb0I7UUFDdkMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtTQUVoQzthQUFNO1lBQ0gsUUFBUTtZQUNSLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLE1BQU07WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUFHO1FBQ25CLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQix5RkFBeUY7WUFDekYsU0FBUztZQUNULGlCQUFPLENBQUMsUUFBUSxHQUFHLDJCQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3JDLGlCQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXpCLFdBQVc7WUFDWCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QiwwQkFBMEI7WUFDMUIsMkJBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMxQyxNQUFNO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNoQzthQUFNO1lBQ0gsUUFBUTtZQUNSLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLE1BQU07WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVTLHNCQUFzQixDQUFDLEdBQXdCO1FBQ3JELElBQUksR0FBRyxJQUFJLG9DQUFtQixDQUFDLE9BQU8sRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sV0FBVyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxzQkFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3RixXQUFXO1lBQ1gsMkJBQVksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNYLDJCQUFZLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDM0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLHNCQUFZLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDcEQsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRVMsZ0JBQWdCO1FBQ3RCLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxzQkFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRVMsZ0JBQWdCO1FBQ3RCLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pCLDJCQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekMsQ0FBQztDQUNKO0FBRUQsaUJBQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naWMgfSBmcm9tIFwiLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9iYXNlL0xvZ2ljXCI7XG5pbXBvcnQgeyBMb2dpY1R5cGUsIExvZ2ljRXZlbnQsIExvZ2ljRXZlbnREYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NjcmlwdC9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NjcmlwdC9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgUmVzb3VyY2VMb2FkZXJFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2Fzc2V0TWFuYWdlci9SZXNvdXJjZUxvYWRlclwiO1xuaW1wb3J0IHsgUmVzb3VyY2VEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBSb3VsZXR0ZSB9IGZyb20gXCIuL2RhdGEvUm91bGV0dGVHYW1lRGF0YVwiO1xuaW1wb3J0IFJvdWxldHRlVmlldyBmcm9tIFwiLi92aWV3L1JvdWxldHRlVmlld1wiO1xuXG5jbGFzcyBSb3VsZXR0ZUxvZ2ljIGV4dGVuZHMgTG9naWMge1xuXG4gICAgbG9naWNUeXBlOiBMb2dpY1R5cGUgPSBMb2dpY1R5cGUuR0FNRTtcbiAgICBwcml2YXRlIGRhdGE6IGFueTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KExvZ2ljRXZlbnQuRU5URVJfR0FNRSwgdGhpcy5vbkVudGVyR2FtZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBidW5kbGUoKSB7XG4gICAgICAgIHJldHVybiBcInJvdWxldHRlXCI7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRW50ZXJDb21wbGV0ZShkYXRhOiBMb2dpY0V2ZW50RGF0YSkge1xuICAgICAgICBzdXBlci5vbkVudGVyQ29tcGxldGUoZGF0YSk7XG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT0gdGhpcy5sb2dpY1R5cGUpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/np7vpmaTnvZHnu5znu4Tku7ZcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTmV0Q29tcG9uZW50KCk7XG4gICAgICAgICAgICAvL+WNuOi9vei1hOa6kFxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLnVuTG9hZFJlc291cmNlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVudGVyR2FtZShtc2cpIHtcbiAgICAgICAgaWYgKG1zZy5idW5kbGUgPT0gdGhpcy5idW5kbGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG1zZy5kYXRhO1xuICAgICAgICAgICAgLy8gTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFdpbmdvR2FtZVZpZXcsIGJ1bmRsZTogdGhpcy5idW5kbGUgLCBhcmdzOlttc2cuZGF0YV19KTtcbiAgICAgICAgICAgIC8v5ri45oiP5pWw5o2u5Yid5aeL5YyWXG4gICAgICAgICAgICBNYW5hZ2VyLmdhbWVEYXRhID0gUm91bGV0dGUuZ2FtZURhdGE7XG4gICAgICAgICAgICBNYW5hZ2VyLmdhbWVEYXRhLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIC8v5a2Q5ri45oiP6K+t6KiA5YyF5Yid5aeL5YyWXG4gICAgICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcblxuICAgICAgICAgICAgLy/lhYjmmoLlgZznvZHnu5zlm57osIPlpITnkIbvvIznrYnlvoXotYTmupDliqDovb3lrozmiJDlkI7vvIzmgaLlpI3lpITnkIZcbiAgICAgICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5wYXVzZU1lc3NhZ2VRdWV1ZSgpO1xuICAgICAgICAgICAgLy/liqDovb3otYTmupBcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2FkUmVzb3VyY2VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+enu+mZpOe9kee7nOe7hOS7tlxuICAgICAgICAgICAgdGhpcy5yZW1vdmVOZXRDb21wb25lbnQoKTtcbiAgICAgICAgICAgIC8v5Y246L296LWE5rqQXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIudW5Mb2FkUmVzb3VyY2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Mb2FkUmVzb3VyY2VDb21wbGV0ZShlcnI6IFJlc291cmNlTG9hZGVyRXJyb3IpIHtcbiAgICAgICAgaWYgKGVyciA9PSBSZXNvdXJjZUxvYWRlckVycm9yLkxPQURJTkcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYy5sb2coYCR7dGhpcy5idW5kbGV96LWE5rqQ5Yqg6L295a6M5oiQISEhYCk7XG4gICAgICAgIHN1cGVyLm9uTG9hZFJlc291cmNlQ29tcGxldGUoZXJyKTtcblxuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogUm91bGV0dGVWaWV3LCBidW5kbGU6IHRoaXMuYnVuZGxlLCBhcmdzOiBbdGhpcy5kYXRhXSB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8v5Yqg6L295a6M5oiQ77yM5oGi5aSN572R57ucXG4gICAgICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2UucmVzdW1lTWVzc2FnZVF1ZXVlKCk7XG4gICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2UucmVzdW1lTWVzc2FnZVF1ZXVlKCk7XG4gICAgICAgICAgICBjYy5lcnJvcihg5omT5byAeea4uOaIj+eVjOmdou+8miR7Um91bGV0dGVWaWV3Lm5hbWV95pe25oql6ZSZ5LqGOmAsIGUpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0TG9hZFJlc291cmNlcygpOiBSZXNvdXJjZURhdGFbXSB7XG4gICAgICAgIHJldHVybiBbeyBwcmVsb2FkVmlldzogUm91bGV0dGVWaWV3LCBidW5kbGU6IHRoaXMuYnVuZGxlIH1dO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICBzdXBlci5vbkxhbmd1YWdlQ2hhbmdlKCk7XG4gICAgICAgIFJvdWxldHRlLmdhbWVEYXRhLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICB9XG59XG5cbk1hbmFnZXIubG9naWNNYW5hZ2VyLnB1c2goUm91bGV0dGVMb2dpYyk7Il19