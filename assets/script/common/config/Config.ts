/**@description 全局配置 */

export namespace Config {
    /**@description 是否显示调试按钮 */
    export let isShowDebugButton = false;

    /**@description 是否开启热更新 */
    export let isOpenHotUpdate = false;

    /**@description 当前入子游戏时，在Logic.onLoad时初始设置 */
    export let assetBundle = {};

    /**@description websocket cfg */
    export let webServiceCfg = null;

    // 内网测试 地址 
    export const WS_URL: string = "192.168.2.254:10000";
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
    export let avatar_path = "akun/images/tx";

    /**@description headImage_default */
    export let headImage_default = "akun/images/tx1";

    /**@description URL */
    export let headImageURL = "";

    // Telegram 聊天室
    export let TelegramURL = "https://t.me/+qnWMhBQWEsIxZWQ1";

    // /**@description 头像上传 */
    // export let uploadHeadURL = "http://{0}/m/uploadHead";

    /**
     * @description 游戏配置
     */
    export let games =
    {
        Crash:
        {
            name: "Crash",
            subName: "crash",
            disName: "crash"
        },
        Roulette:
        {
            name: "Roulette",
            subName: "roulette",
            disName: "roulette"
        },
        Wingo:
        {
            name: "Wingo",
            subName: "wingo",
            disName: "wingo"
        },
    }


    export let GameId = {
        // 大厅
        Lobby: "Lobby",
        // 爆点
        Crash: "Crash",
        // 轮盘
        Roulette: "Roulette",
        // Wingo
        Wingo: "Wingo",
    }
}


/**
 * @description 界面层级定义
 */

export namespace ViewZOrder {


    /**@description 最底层 */
    export const zero = 0;

    /**@description 小喇叭显示层 */
    export const Horn = 10;

    /**@description ui层 */
    export const UI = 100;

    /**@description 提示 */
    export const Tips = 300;

    export const Alert = 299;

    export const Toast = 288;

    /**@description Loading层 */
    export const Loading = 600;

    /**@description 界面加载动画层，暂时放到最高层，加载动画时，界面未打开完成时，不让玩家点击其它地方 */
    export const UILoading = 700;
}

