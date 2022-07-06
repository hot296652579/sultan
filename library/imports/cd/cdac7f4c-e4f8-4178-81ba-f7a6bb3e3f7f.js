"use strict";
cc._RF.push(module, 'cdac79M5PhBeIG696a7Pj9/', 'CommonService');
// script/common/net/CommonService.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = exports.CommonMessage = exports.protoPackage = exports.serverType = void 0;
const Service_1 = require("../../framework/base/Service");
const JsonMessage_1 = require("../../framework/net/JsonMessage");
const Config_1 = require("../config/Config");
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const Manager_1 = require("../manager/Manager");
const protoc_1 = require("../../framework/external/protoc");
/**@description  网络 mainCmd  配置  */
exports.serverType = {
    GateWay: 1001,
    Lobby: 2001,
    Crash: 3016,
};
/**@description 读取 proto 配置  */
exports.protoPackage = {
    // /**@description 网关身份验证*/
    // gateway: MST.bt.game.proto.game.gateway,
    // /**@description  大厅*/
    // hall: MST.bt.game.proto.hall,
    // /**@description  大厅 base */
    // hallBase: MST.bt.game.proto.hall.base,
    // /**@description  大厅 base */
    // gameBase: MST.bt.game.proto.game.base,
    hall: protoc_1.MST,
    /**@decription  爆点*/
    crash: protoc_1.MST,
};
class CommonMessage extends JsonMessage_1.JsonMessage {
}
exports.CommonMessage = CommonMessage;
/**
 * @description service公共基类
 */
class CommonService extends Service_1.Service {
    static get instance() { return this._instance || (this._instance = new CommonService()); }
    /**@description 公共的消息解析类型，必须包含对消息码的解析与打包 */
    get commonMessageType() {
        return CommonMessage;
    }
    /**
     * @description 发送心跳
     */
    sendHeartbeat() {
        let req = protoc_1.MST.C2G_Ping_Req.create({ RpcId: Manager_1.Manager.netManager.getNewSeqId() });
        let buffer = protoc_1.MST.C2G_Ping_Req.encode(req).finish();
        this.sendMsg(protoc_1.MST.C2G_Ping_Req, protoc_1.MST.OuterOpcode_Gate.C2G_Ping_Req, buffer);
    }
    /**
     * @description 获取最大心跳超时的次数
     */
    getMaxHeartbeatTimeOut() {
        return super.getMaxHeartbeatTimeOut();
    }
    getHeartbeatInterval() {
        return super.getHeartbeatInterval();
    }
    /**
     * @description 心跳超时
     */
    onHeartbeatTimeOut() {
        super.onHeartbeatTimeOut();
        cc.warn(`心跳超时，您已经断开网络`);
        PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.WAIT.NETERROR, () => {
            Manager_1.Manager.uiManager.closeExcept(null);
            cc.audioEngine.stopAll();
            super.close();
            super.reset();
            cc.game.restart();
            cc.sys.garbageCollect();
        });
    }
    /**
     * @description 是否为心跳消息
     */
    isHeartBeat(data) {
        //示例
        return data.mainCmd == protoc_1.MST.OuterOpcode_Gate.G2C_Ping_Res || data.mainCmd == protoc_1.MST.OuterOpcode_Gate.C2G_Ping_Req;
    }
    onEnterBackground() {
    }
    onEnterForgeground(inBackgroundTime) {
        // if (inBackgroundTime > 30) {
        //     this.disconnect()
        // }
    }
    /**
     * 发送信息
     * @param mainCmd
     * @param data
     * @param serverId
     */
    sendMsg(proto, mainCmd, databuffer, serverId) {
        let msg = new CommonMessage();
        msg.mainCmd = mainCmd;
        msg.databuffer = databuffer;
        if (serverId) {
            msg.serverId = serverId;
        }
        if (this.isHeartBeat(msg)) {
            // console.log(`发送网络消息 main cmd : ${mainCmd}`);
        }
        else {
            G.Logger.color(`发送消息：`, `${mainCmd}`);
            G.Logger.log(proto.decode(databuffer));
        }
        // this.addListener(mainCmd,null,call,false,target);
        this.send(msg);
    }
    /**
     * 重连
     */
    disconnect() {
        G.Logger.log('重连', Config_1.Config.webServiceCfg);
        if (Config_1.Config.webServiceCfg) {
            this.connect(Config_1.Config.webServiceCfg.ip, Config_1.Config.webServiceCfg.wsPort, Config_1.Config.webServiceCfg.protocol);
        }
    }
    onlyServerSendMsg(msg) {
        super.onlyServerSendMsg(msg);
        return false;
        // if (msg.mainCmd == 0) {//系统主动下发心跳
        //     let msg = new CommonMessage();
        //     msg.mainCmd = 0;
        //     this.send(msg);
        //     return true;
        // } else if (msg.mainCmd == serverType.Lobby) {//大厅
        //     if (msg.subCmd == protoPackage.hall.HallCmd.HORSE_LANTERN) {//跑马灯 message HorseLantern
        //         dispatch("rollNotice", msg.data);
        //         return true;
        //     }
        //     if (msg.subCmd == protoPackage.hall.HallCmd.USER_WEALTH) {//更新玩家的金币 积分 砖石 message UserWealth
        //         User._gold = msg.data.gold;
        //         User._diamonds = msg.data.diamonds;
        //         User._points = msg.data.points;
        //         dispatch("updateUserInfo", msg.data);
        //         return true;
        //     }
        // }
    }
}
exports.CommonService = CommonService;
CommonService._instance = null;

cc._RF.pop();