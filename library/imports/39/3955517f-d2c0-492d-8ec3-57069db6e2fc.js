"use strict";
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