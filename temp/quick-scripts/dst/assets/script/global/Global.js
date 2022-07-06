
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/global/Global.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '39555F/0sBJLY7DVwadtuL8', 'Global');
// script/global/Global.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToLogin = exports.reStartGame = void 0;
const LogicEvent_1 = require("../common/event/LogicEvent");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
/**
 * 重启游戏
 */
function reStartGame() {
    dispatch(LogicEvent_1.GAME_RESTART_EVENT);
    Manager_1.Manager.uiManager.closeExcept(null);
    cc.audioEngine.stopAll();
    LobbyService_1.LobbyService.instance.reset();
    LobbyService_1.LobbyService.instance.close();
    cc.game.restart();
    cc.sys.garbageCollect();
}
exports.reStartGame = reStartGame;
/**
 * 返回登录
 */
function goToLogin() {
    cc.audioEngine.stopAll();
    LobbyService_1.LobbyService.instance.close();
    Manager_1.Manager.localStorage.cleanLoginCache();
    cc.sys.garbageCollect();
    dispatch(LogicEvent_1.LogicEvent.ENTER_LOGIN);
}
exports.goToLogin = goToLogin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZ2xvYmFsL0dsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBNEU7QUFDNUUsdURBQW9EO0FBQ3BELDZEQUEwRDtBQU8xRDs7R0FFRztBQUNILFNBQWdCLFdBQVc7SUFDdkIsUUFBUSxDQUFDLCtCQUFrQixDQUFDLENBQUE7SUFDNUIsaUJBQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekIsMkJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsMkJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFSRCxrQ0FRQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUztJQUNyQixFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pCLDJCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLGlCQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3ZDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQU5ELDhCQU1DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naWNFdmVudCwgR0FNRV9SRVNUQVJUX0VWRU5UIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgTG9naW5UeXBlIH0gZnJvbSBcIi4uL2xvZ2luL0xvZ2luVmlld1wiO1xuaW1wb3J0IHsgYW5kcm9pZCB9IGZyb20gXCIuLi9wbGF0Zm9ybS9hbmRyb2lkXCI7XG5pbXBvcnQgeyBpb3MgfSBmcm9tIFwiLi4vcGxhdGZvcm0vaW9zXCI7XG5pbXBvcnQgeyB3ZWIgfSBmcm9tIFwiLi4vcGxhdGZvcm0vd2ViXCI7XG5cblxuLyoqXG4gKiDph43lkK/muLjmiI9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlU3RhcnRHYW1lKCkge1xuICAgIGRpc3BhdGNoKEdBTUVfUkVTVEFSVF9FVkVOVClcbiAgICBNYW5hZ2VyLnVpTWFuYWdlci5jbG9zZUV4Y2VwdChudWxsKTtcbiAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XG4gICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnJlc2V0KCk7XG4gICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLmNsb3NlKCk7XG4gICAgY2MuZ2FtZS5yZXN0YXJ0KCk7XG4gICAgY2Muc3lzLmdhcmJhZ2VDb2xsZWN0KCk7XG59XG5cbi8qKlxuICog6L+U5Zue55m75b2VXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnb1RvTG9naW4oKSB7XG4gICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xuICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5jbG9zZSgpO1xuICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLmNsZWFuTG9naW5DYWNoZSgpO1xuICAgIGNjLnN5cy5nYXJiYWdlQ29sbGVjdCgpO1xuICAgIGRpc3BhdGNoKExvZ2ljRXZlbnQuRU5URVJfTE9HSU4pO1xufVxuXG5cbiJdfQ==