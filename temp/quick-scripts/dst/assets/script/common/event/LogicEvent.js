
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/event/LogicEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUE7O0dBRUc7QUFDSCxJQUFZLFNBV1g7QUFYRCxXQUFZLFNBQVM7SUFDakIscUJBQXFCO0lBQ3JCLGdDQUFtQixDQUFBO0lBQ25CLHFCQUFxQjtJQUNyQiwwQkFBYSxDQUFBO0lBQ2IsdUJBQXVCO0lBQ3ZCLDBCQUFhLENBQUE7SUFDYix1QkFBdUI7SUFDdkIsNEJBQWUsQ0FBQTtJQUNmLHVCQUF1QjtJQUN2QixvQ0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBWFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFXcEI7QUFlRDs7O0dBR0c7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxJQUFvQjtJQUN0RCxRQUFRLENBQUMsa0JBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUZELHNEQUVDO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLFVBQVUsR0FBRztJQUNwQiwyQkFBMkI7SUFDM0IsY0FBYyxFQUFFLGdCQUFnQjtJQUVoQyxzQkFBc0I7SUFDdEIsYUFBYSxFQUFFLGVBQWU7SUFFOUIsc0JBQXNCO0lBQ3RCLFVBQVUsRUFBRSxZQUFZO0lBRXhCLHVCQUF1QjtJQUN2QixVQUFVLEVBQUUsWUFBWTtJQUV4QiwrQkFBK0I7SUFDL0IsZ0JBQWdCLEVBQUUsa0JBQWtCO0lBRXBDLHlCQUF5QjtJQUN6QixXQUFXLEVBQUUsYUFBYTtJQUUxQix1QkFBdUI7SUFDdkIsY0FBYyxFQUFFLGdCQUFnQjtJQUVoQyx5QkFBeUI7SUFDekIsZUFBZSxFQUFFLGlCQUFpQjtJQUVsQyx5QkFBeUI7SUFDekIsZ0JBQWdCLEVBQUUsa0JBQWtCO0lBRXBDLHlCQUF5QjtJQUN6QixtQkFBbUIsRUFBRSxxQkFBcUI7Q0FDN0MsQ0FBQztBQUNGOztHQUVHO0FBQ1EsUUFBQSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiB5b3VyIG5hbWVcbiAqIEBEYXRlOiAyMDE5LTExLTIwIDE5OjA0OjIxXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIwLTAyLTI4IDE0OjU2OjQ5XG4gKiBATGFzdEVkaXRvcnM6IHlvdXIgbmFtZVxuICogQERlc2NyaXB0aW9uOiBJbiBVc2VyIFNldHRpbmdzIEVkaXRcbiAqIEBGaWxlUGF0aDogXFxkZHpcXGFzc2V0c1xcY29tbW9uXFxldmVudFxcTG9naWNFdmVudC50c1xuICovXG5pbXBvcnQgVUlWaWV3LCB7IFVJQ2xhc3MgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDpgLvovpHmqKHlnZfnsbvlnotcbiAqL1xuZXhwb3J0IGVudW0gTG9naWNUeXBlIHtcbiAgICAvKipAZGVzY3JpcHRpb24g5pyq55+lICovXG4gICAgVU5LTk9XTiA9IFwiVU5LTk9XTlwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDlpKfljoUgKi9cbiAgICBIQUxMID0gXCJIQUxMXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOa4uOaIj+WcuuaZryAqL1xuICAgIEdBTUUgPSBcIkdBTUVcIixcbiAgICAvKipAZGVzY3JpcHRpb24g55m75b2V5Zy65pmvICovXG4gICAgTE9HSU4gPSBcIkxPR0lOXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOaIv+mXtOWIl+ihqCAqL1xuICAgIFJPT01fTElTVCA9IFwiUk9PTV9MSVNUXCIsXG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOmAu+i+kea0vuWPkeaVsOaNruaOpeWPo1xuICovXG5leHBvcnQgaW50ZXJmYWNlIExvZ2ljRXZlbnREYXRhIHtcbiAgICB0eXBlOiBMb2dpY1R5cGU7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6ZyA6KaB5o6S6Zmk55qE55WM6Z2i77yM6Zmk6L+Z5Lqb55WM6Z2i5LmL5aSW55qE5YW25a6D55WM6Z2i5bCG5Lya5YWz6ZetICovXG4gICAgdmlld3M6IChVSUNsYXNzPFVJVmlldz4gfCBzdHJpbmcgfCBVSVZpZXcpW107XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5YW25a6D55So5oi35pWw5o2uICovXG4gICAgZGF0YT86IGFueTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiT55So6L+b5YWl5a6M5oiQ5LqL5Lu2TG9naWNFdmVudC5FTlRFUl9DT01QTEVURVxuICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEVudGVyQ29tcGxldGUoZGF0YTogTG9naWNFdmVudERhdGEpIHtcbiAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0NPTVBMRVRFLCBkYXRhKTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6YC76L6R5LqL5Lu25a6a5LmJXG4gKi9cbmV4cG9ydCBsZXQgTG9naWNFdmVudCA9IHtcbiAgICAvKipAZGVzY3JpcHRpb24g6L+b6KGM5oyH5a6a5Zy65pmv5a6M5oiQICovXG4gICAgRU5URVJfQ09NUExFVEU6IFwiRU5URVJfQ09NUExFVEVcIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDov5vlhaXlpKfljoUqL1xuICAgIExPR0lOX1NVQ0NFU1M6IFwiTE9HSU5fU1VDQ0VTU1wiLFxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOi/m+WFpeWkp+WOhSovXG4gICAgRU5URVJfSEFMTDogXCJFTlRFUl9IQUxMXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24g6L+b5YWl5ri45oiPICovXG4gICAgRU5URVJfR0FNRTogXCJFTlRFUl9HQU1FXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24g5ri45oiP5YeG5aSH5aW9IOWHhuWkh+i/m+WFpea4uOaIjyAqL1xuICAgIEVOVEVSX0dBTUVfUkVBRFk6IFwiRU5URVJfR0FNRV9SRUFEWVwiLFxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOi/lOWbnueZu+W9leeVjOmdoiAqL1xuICAgIEVOVEVSX0xPR0lOOiBcIkVOVEVSX0xPR0lOXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24g5pu05paw55WM6Z2iICovXG4gICAgRU5URVJfVVBEQVRJTkc6IFwiRU5URVJfVVBEQVRJTkdcIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDov5vlhaXmiL/pl7TliJfooaggKi9cbiAgICBFTlRFUl9ST09NX0xJU1Q6IFwiRU5URVJfUk9PTV9MSVNUXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24g6L+b5YWl5ri45oiP5Yy56YWNICovXG4gICAgRU5URVJfR0FNRV9NQVRDSDogXCJFTlRFUl9HQU1FX01BVENIXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24g6L+b5YWl5aSW5o6l5ri45oiPICovXG4gICAgRU5URVJfRVhURVJOQUxfR0FNRTogXCJFTlRFUl9FWFRFUk5BTF9HQU1FXCIsXG59O1xuLyoqXG4gKiBAZGVzY3JpcHRpb24g6YeN5ZCv5YmN5oGi5aSN5p+Q5Lqb5LqL5Lu2XG4gKi9cbmV4cG9ydCBsZXQgR0FNRV9SRVNUQVJUX0VWRU5UID0gXCJHQU1FX1JFU1RBUlRfRVZFTlRcIiJdfQ==