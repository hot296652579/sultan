import { LogicEvent, GAME_RESTART_EVENT } from "../common/event/LogicEvent";
import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import { LoginType } from "../login/LoginView";
import { android } from "../platform/android";
import { ios } from "../platform/ios";
import { web } from "../platform/web";


/**
 * 重启游戏
 */
export function reStartGame() {
    dispatch(GAME_RESTART_EVENT)
    Manager.uiManager.closeExcept(null);
    cc.audioEngine.stopAll();
    LobbyService.instance.reset();
    LobbyService.instance.close();
    cc.game.restart();
    cc.sys.garbageCollect();
}

/**
 * 返回登录
 */
export function goToLogin() {
    cc.audioEngine.stopAll();
    LobbyService.instance.close();
    Manager.localStorage.cleanLoginCache();
    cc.sys.garbageCollect();
    dispatch(LogicEvent.ENTER_LOGIN);
}


