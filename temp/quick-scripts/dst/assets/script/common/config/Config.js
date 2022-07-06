
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/config/Config.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df6483YRVVPlodAQqnkAnjN', 'Config');
// script/common/config/Config.ts

"use strict";
/**@description 全局配置 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewZOrder = exports.Config = void 0;
var Config;
(function (Config) {
    /**@description 是否显示调试按钮 */
    Config.isShowDebugButton = false;
    /**@description 是否开启热更新 */
    Config.isOpenHotUpdate = false;
    /**@description 当前入子游戏时，在Logic.onLoad时初始设置 */
    Config.assetBundle = {};
    /**@description websocket cfg */
    Config.webServiceCfg = null;
    // 内网测试 地址 
    Config.WS_URL = "192.168.2.254:10000";
    // 陈洪 HTTP 地址 
    // export const WS_URL: string = "192.168.2.171:10003";
    // VPN 地址
    // export const WS_URL: string = "192.168.255.30:10000";
    // 正式服 地址
    // export const WS_URL: string = "game.sultan777.io:8443";
    // 热更新地址 
    // http://192.168.6.201:81/hotUpdate/ (内网)
    // http://ng888.cyou/hotUpdate/ (预发)
    // https://bollygame.com/hotUpdate/ (正式)
    /**@description URL */
    Config.avatar_path = "akun/images/tx";
    /**@description headImage_default */
    Config.headImage_default = "akun/images/tx1";
    /**@description URL */
    Config.headImageURL = "";
    // Telegram 聊天室
    Config.TelegramURL = "https://t.me/+qnWMhBQWEsIxZWQ1";
    // /**@description 头像上传 */
    // export let uploadHeadURL = "http://{0}/m/uploadHead";
    /**
     * @description 游戏配置
     */
    Config.games = {
        Crash: {
            name: "Crash",
            subName: "crash",
            disName: "crash"
        },
        Roulette: {
            name: "Roulette",
            subName: "roulette",
            disName: "roulette"
        },
        Wingo: {
            name: "Wingo",
            subName: "wingo",
            disName: "wingo"
        },
    };
    Config.GameId = {
        // 大厅
        Lobby: "Lobby",
        // 爆点
        Crash: "Crash",
        // 轮盘
        Roulette: "Roulette",
        // Wingo
        Wingo: "Wingo",
    };
})(Config = exports.Config || (exports.Config = {}));
/**
 * @description 界面层级定义
 */
var ViewZOrder;
(function (ViewZOrder) {
    /**@description 最底层 */
    ViewZOrder.zero = 0;
    /**@description 小喇叭显示层 */
    ViewZOrder.Horn = 10;
    /**@description ui层 */
    ViewZOrder.UI = 100;
    /**@description 提示 */
    ViewZOrder.Tips = 300;
    ViewZOrder.Alert = 299;
    ViewZOrder.Toast = 288;
    /**@description Loading层 */
    ViewZOrder.Loading = 600;
    /**@description 界面加载动画层，暂时放到最高层，加载动画时，界面未打开完成时，不让玩家点击其它地方 */
    ViewZOrder.UILoading = 700;
})(ViewZOrder = exports.ViewZOrder || (exports.ViewZOrder = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbmZpZy9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVCQUF1Qjs7O0FBRXZCLElBQWlCLE1BQU0sQ0E4RXRCO0FBOUVELFdBQWlCLE1BQU07SUFDbkIsMkJBQTJCO0lBQ2hCLHdCQUFpQixHQUFHLEtBQUssQ0FBQztJQUVyQywwQkFBMEI7SUFDZixzQkFBZSxHQUFHLEtBQUssQ0FBQztJQUVuQyw2Q0FBNkM7SUFDbEMsa0JBQVcsR0FBRyxFQUFFLENBQUM7SUFFNUIsZ0NBQWdDO0lBQ3JCLG9CQUFhLEdBQUcsSUFBSSxDQUFDO0lBRWhDLFdBQVc7SUFDRSxhQUFNLEdBQVcscUJBQXFCLENBQUM7SUFDcEQsY0FBYztJQUNkLHVEQUF1RDtJQUN2RCxTQUFTO0lBQ1Qsd0RBQXdEO0lBQ3hELFNBQVM7SUFDVCwwREFBMEQ7SUFFMUQsU0FBUztJQUNULDBDQUEwQztJQUMxQyxvQ0FBb0M7SUFDcEMsd0NBQXdDO0lBRXhDLHNCQUFzQjtJQUNYLGtCQUFXLEdBQUcsZ0JBQWdCLENBQUM7SUFFMUMsb0NBQW9DO0lBQ3pCLHdCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBRWpELHNCQUFzQjtJQUNYLG1CQUFZLEdBQUcsRUFBRSxDQUFDO0lBRTdCLGVBQWU7SUFDSixrQkFBVyxHQUFHLGdDQUFnQyxDQUFDO0lBRTFELDBCQUEwQjtJQUMxQix3REFBd0Q7SUFFeEQ7O09BRUc7SUFDUSxZQUFLLEdBQ2hCO1FBQ0ksS0FBSyxFQUNMO1lBQ0ksSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUUsT0FBTztTQUNuQjtRQUNELFFBQVEsRUFDUjtZQUNJLElBQUksRUFBRSxVQUFVO1lBQ2hCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLE9BQU8sRUFBRSxVQUFVO1NBQ3RCO1FBQ0QsS0FBSyxFQUNMO1lBQ0ksSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUUsT0FBTztTQUNuQjtLQUNKLENBQUE7SUFHVSxhQUFNLEdBQUc7UUFDaEIsS0FBSztRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSztRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSztRQUNMLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVE7UUFDUixLQUFLLEVBQUUsT0FBTztLQUNqQixDQUFBO0FBQ0wsQ0FBQyxFQTlFZ0IsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBOEV0QjtBQUdEOztHQUVHO0FBRUgsSUFBaUIsVUFBVSxDQXdCMUI7QUF4QkQsV0FBaUIsVUFBVTtJQUd2QixzQkFBc0I7SUFDVCxlQUFJLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLHlCQUF5QjtJQUNaLGVBQUksR0FBRyxFQUFFLENBQUM7SUFFdkIsc0JBQXNCO0lBQ1QsYUFBRSxHQUFHLEdBQUcsQ0FBQztJQUV0QixxQkFBcUI7SUFDUixlQUFJLEdBQUcsR0FBRyxDQUFDO0lBRVgsZ0JBQUssR0FBRyxHQUFHLENBQUM7SUFFWixnQkFBSyxHQUFHLEdBQUcsQ0FBQztJQUV6QiwyQkFBMkI7SUFDZCxrQkFBTyxHQUFHLEdBQUcsQ0FBQztJQUUzQiw0REFBNEQ7SUFDL0Msb0JBQVMsR0FBRyxHQUFHLENBQUM7QUFDakMsQ0FBQyxFQXhCZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUF3QjFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqQGRlc2NyaXB0aW9uIOWFqOWxgOmFjee9riAqL1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbmZpZyB7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOaYr+WQpuaYvuekuuiwg+ivleaMiemSriAqL1xuICAgIGV4cG9ydCBsZXQgaXNTaG93RGVidWdCdXR0b24gPSBmYWxzZTtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDmmK/lkKblvIDlkK/ng63mm7TmlrAgKi9cbiAgICBleHBvcnQgbGV0IGlzT3BlbkhvdFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOW9k+WJjeWFpeWtkOa4uOaIj+aXtu+8jOWcqExvZ2ljLm9uTG9hZOaXtuWIneWni+iuvue9riAqL1xuICAgIGV4cG9ydCBsZXQgYXNzZXRCdW5kbGUgPSB7fTtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiB3ZWJzb2NrZXQgY2ZnICovXG4gICAgZXhwb3J0IGxldCB3ZWJTZXJ2aWNlQ2ZnID0gbnVsbDtcblxuICAgIC8vIOWGhee9kea1i+ivlSDlnLDlnYAgXG4gICAgZXhwb3J0IGNvbnN0IFdTX1VSTDogc3RyaW5nID0gXCIxOTIuMTY4LjIuMjU0OjEwMDAwXCI7XG4gICAgLy8g6ZmI5rSqIEhUVFAg5Zyw5Z2AIFxuICAgIC8vIGV4cG9ydCBjb25zdCBXU19VUkw6IHN0cmluZyA9IFwiMTkyLjE2OC4yLjE3MToxMDAwM1wiO1xuICAgIC8vIFZQTiDlnLDlnYBcbiAgICAvLyBleHBvcnQgY29uc3QgV1NfVVJMOiBzdHJpbmcgPSBcIjE5Mi4xNjguMjU1LjMwOjEwMDAwXCI7XG4gICAgLy8g5q2j5byP5pyNIOWcsOWdgFxuICAgIC8vIGV4cG9ydCBjb25zdCBXU19VUkw6IHN0cmluZyA9IFwiZ2FtZS5zdWx0YW43NzcuaW86ODQ0M1wiO1xuXG4gICAgLy8g54Ot5pu05paw5Zyw5Z2AIFxuICAgIC8vIGh0dHA6Ly8xOTIuMTY4LjYuMjAxOjgxL2hvdFVwZGF0ZS8gKOWGhee9kSlcbiAgICAvLyBodHRwOi8vbmc4ODguY3lvdS9ob3RVcGRhdGUvICjpooTlj5EpXG4gICAgLy8gaHR0cHM6Ly9ib2xseWdhbWUuY29tL2hvdFVwZGF0ZS8gKOato+W8jylcblxuICAgIC8qKkBkZXNjcmlwdGlvbiBVUkwgKi9cbiAgICBleHBvcnQgbGV0IGF2YXRhcl9wYXRoID0gXCJha3VuL2ltYWdlcy90eFwiO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIGhlYWRJbWFnZV9kZWZhdWx0ICovXG4gICAgZXhwb3J0IGxldCBoZWFkSW1hZ2VfZGVmYXVsdCA9IFwiYWt1bi9pbWFnZXMvdHgxXCI7XG5cbiAgICAvKipAZGVzY3JpcHRpb24gVVJMICovXG4gICAgZXhwb3J0IGxldCBoZWFkSW1hZ2VVUkwgPSBcIlwiO1xuXG4gICAgLy8gVGVsZWdyYW0g6IGK5aSp5a6kXG4gICAgZXhwb3J0IGxldCBUZWxlZ3JhbVVSTCA9IFwiaHR0cHM6Ly90Lm1lLytxbldNaEJRV0VzSXhaV1ExXCI7XG5cbiAgICAvLyAvKipAZGVzY3JpcHRpb24g5aS05YOP5LiK5LygICovXG4gICAgLy8gZXhwb3J0IGxldCB1cGxvYWRIZWFkVVJMID0gXCJodHRwOi8vezB9L20vdXBsb2FkSGVhZFwiO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOa4uOaIj+mFjee9rlxuICAgICAqL1xuICAgIGV4cG9ydCBsZXQgZ2FtZXMgPVxuICAgIHtcbiAgICAgICAgQ3Jhc2g6XG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiQ3Jhc2hcIixcbiAgICAgICAgICAgIHN1Yk5hbWU6IFwiY3Jhc2hcIixcbiAgICAgICAgICAgIGRpc05hbWU6IFwiY3Jhc2hcIlxuICAgICAgICB9LFxuICAgICAgICBSb3VsZXR0ZTpcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJSb3VsZXR0ZVwiLFxuICAgICAgICAgICAgc3ViTmFtZTogXCJyb3VsZXR0ZVwiLFxuICAgICAgICAgICAgZGlzTmFtZTogXCJyb3VsZXR0ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFdpbmdvOlxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIldpbmdvXCIsXG4gICAgICAgICAgICBzdWJOYW1lOiBcIndpbmdvXCIsXG4gICAgICAgICAgICBkaXNOYW1lOiBcIndpbmdvXCJcbiAgICAgICAgfSxcbiAgICB9XG5cblxuICAgIGV4cG9ydCBsZXQgR2FtZUlkID0ge1xuICAgICAgICAvLyDlpKfljoVcbiAgICAgICAgTG9iYnk6IFwiTG9iYnlcIixcbiAgICAgICAgLy8g54iG54K5XG4gICAgICAgIENyYXNoOiBcIkNyYXNoXCIsXG4gICAgICAgIC8vIOi9ruebmFxuICAgICAgICBSb3VsZXR0ZTogXCJSb3VsZXR0ZVwiLFxuICAgICAgICAvLyBXaW5nb1xuICAgICAgICBXaW5nbzogXCJXaW5nb1wiLFxuICAgIH1cbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDnlYzpnaLlsYLnuqflrprkuYlcbiAqL1xuXG5leHBvcnQgbmFtZXNwYWNlIFZpZXdaT3JkZXIge1xuXG5cbiAgICAvKipAZGVzY3JpcHRpb24g5pyA5bqV5bGCICovXG4gICAgZXhwb3J0IGNvbnN0IHplcm8gPSAwO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWwj+WWh+WPreaYvuekuuWxgiAqL1xuICAgIGV4cG9ydCBjb25zdCBIb3JuID0gMTA7XG5cbiAgICAvKipAZGVzY3JpcHRpb24gdWnlsYIgKi9cbiAgICBleHBvcnQgY29uc3QgVUkgPSAxMDA7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5o+Q56S6ICovXG4gICAgZXhwb3J0IGNvbnN0IFRpcHMgPSAzMDA7XG5cbiAgICBleHBvcnQgY29uc3QgQWxlcnQgPSAyOTk7XG5cbiAgICBleHBvcnQgY29uc3QgVG9hc3QgPSAyODg7XG5cbiAgICAvKipAZGVzY3JpcHRpb24gTG9hZGluZ+WxgiAqL1xuICAgIGV4cG9ydCBjb25zdCBMb2FkaW5nID0gNjAwO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOeVjOmdouWKoOi9veWKqOeUu+Wxgu+8jOaaguaXtuaUvuWIsOacgOmrmOWxgu+8jOWKoOi9veWKqOeUu+aXtu+8jOeVjOmdouacquaJk+W8gOWujOaIkOaXtu+8jOS4jeiuqeeOqeWutueCueWHu+WFtuWug+WcsOaWuSAqL1xuICAgIGV4cG9ydCBjb25zdCBVSUxvYWRpbmcgPSA3MDA7XG59XG5cbiJdfQ==