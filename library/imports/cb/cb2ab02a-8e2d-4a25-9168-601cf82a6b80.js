"use strict";
cc._RF.push(module, 'cb2abAqji1KJZFoYBz4KmuA', 'LogicEvent');
// script/common/event/LogicEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAME_RESTART_EVENT = exports.LogicEvent = exports.dispatchEnterComplete = exports.LogicType = void 0;
/**
 * @description 逻辑模块类型
 */
var LogicType;
(function (LogicType) {
    /**@description 未知 */
    LogicType["UNKNOWN"] = "UNKNOWN";
    /**@description 大厅 */
    LogicType["HALL"] = "HALL";
    /**@description 游戏场景 */
    LogicType["GAME"] = "GAME";
    /**@description 登录场景 */
    LogicType["LOGIN"] = "LOGIN";
    /**@description 房间列表 */
    LogicType["ROOM_LIST"] = "ROOM_LIST";
})(LogicType = exports.LogicType || (exports.LogicType = {}));
/**
 * @description 专用进入完成事件LogicEvent.ENTER_COMPLETE
 * @param data 数据
 */
function dispatchEnterComplete(data) {
    dispatch(exports.LogicEvent.ENTER_COMPLETE, data);
}
exports.dispatchEnterComplete = dispatchEnterComplete;
/**
 * @description 逻辑事件定义
 */
exports.LogicEvent = {
    /**@description 进行指定场景完成 */
    ENTER_COMPLETE: "ENTER_COMPLETE",
    /**@description 进入大厅*/
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    /**@description 进入大厅*/
    ENTER_HALL: "ENTER_HALL",
    /**@description 进入游戏 */
    ENTER_GAME: "ENTER_GAME",
    /**@description 游戏准备好 准备进入游戏 */
    ENTER_GAME_READY: "ENTER_GAME_READY",
    /**@description 返回登录界面 */
    ENTER_LOGIN: "ENTER_LOGIN",
    /**@description 更新界面 */
    ENTER_UPDATING: "ENTER_UPDATING",
    /**@description 进入房间列表 */
    ENTER_ROOM_LIST: "ENTER_ROOM_LIST",
    /**@description 进入游戏匹配 */
    ENTER_GAME_MATCH: "ENTER_GAME_MATCH",
    /**@description 进入外接游戏 */
    ENTER_EXTERNAL_GAME: "ENTER_EXTERNAL_GAME",
};
/**
 * @description 重启前恢复某些事件
 */
exports.GAME_RESTART_EVENT = "GAME_RESTART_EVENT";

cc._RF.pop();