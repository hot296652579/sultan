

import { Service } from "../../framework/base/Service";
import { GameEventInterface } from "../../framework/base/GameEventInterface";
import { Message } from "../../framework/net/Message";
import { JsonMessage } from "../../framework/net/JsonMessage";
import { LobbyService } from "./LobbyService";
import { Config } from "../config/Config";
import PanelHelp from "../../msgbox/PanelHelp";
import { i18n } from "../language/LanguageImpl";
import { User } from "../../global/User";
import { Manager } from "../manager/Manager";
import { MST } from "../../framework/external/protoc";

/**@description  网络 mainCmd  配置  */
export let serverType = {
    GateWay: 1001,
    Lobby: 2001,
    Crash: 3016,
}

/**@description 读取 proto 配置  */
export let protoPackage = {

    // /**@description 网关身份验证*/
    // gateway: MST.bt.game.proto.game.gateway,

    // /**@description  大厅*/
    // hall: MST.bt.game.proto.hall,

    // /**@description  大厅 base */
    // hallBase: MST.bt.game.proto.hall.base,

    // /**@description  大厅 base */
    // gameBase: MST.bt.game.proto.game.base,

    hall: MST,

    /**@decription  爆点*/
    crash: MST,

}

export class CommonMessage extends JsonMessage {
}

/**
 * @description service公共基类
 */

export class CommonService extends Service implements GameEventInterface {

    protected static _instance: CommonService = null;
    public static get instance() { return this._instance || (this._instance = new CommonService()); }

    /**@description 公共的消息解析类型，必须包含对消息码的解析与打包 */
    protected get commonMessageType(): typeof Message {
        return CommonMessage;
    }

    /**
     * @description 发送心跳
     */
    protected sendHeartbeat() {
        let req = MST.C2G_Ping_Req.create({ RpcId: Manager.netManager.getNewSeqId() });
        let buffer = MST.C2G_Ping_Req.encode(req).finish();
        this.sendMsg(MST.C2G_Ping_Req, MST.OuterOpcode_Gate.C2G_Ping_Req, buffer);
    }
    /**
     * @description 获取最大心跳超时的次数
     */
    protected getMaxHeartbeatTimeOut(): number {
        return super.getMaxHeartbeatTimeOut();
    }

    protected getHeartbeatInterval() {
        return super.getHeartbeatInterval();
    }

    /**
     * @description 心跳超时
     */
    protected onHeartbeatTimeOut() {
        super.onHeartbeatTimeOut();
        cc.warn(`心跳超时，您已经断开网络`);

        PanelHelp.showMsgBox('', i18n.WAIT.NETERROR, () => {
            Manager.uiManager.closeExcept(null);
            cc.audioEngine.stopAll();
            super.close();
            super.reset();
            cc.game.restart();
            cc.sys.garbageCollect();
        })
    }
    /**
     * @description 是否为心跳消息
     */
    protected isHeartBeat(data: Message): boolean {
        //示例
        return data.mainCmd == MST.OuterOpcode_Gate.G2C_Ping_Res || data.mainCmd == MST.OuterOpcode_Gate.C2G_Ping_Req;
    }

    onEnterBackground() {

    }

    onEnterForgeground(inBackgroundTime: number) {
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
    sendMsg(proto, mainCmd, databuffer?, serverId?) {
        let msg = new CommonMessage();
        msg.mainCmd = mainCmd;
        msg.databuffer = databuffer;
        if (serverId) {
            msg.serverId = serverId
        }

        if (this.isHeartBeat(msg)) {
            // console.log(`发送网络消息 main cmd : ${mainCmd}`);
        } else {
            G.Logger.color(`发送消息：`, `${mainCmd}`);
            G.Logger.log(proto.decode(databuffer));
        }

        // this.addListener(mainCmd,null,call,false,target);
        this.send(msg)

    }
    /**
     * 重连
     */
    disconnect() {
        G.Logger.log('重连', Config.webServiceCfg);
        if (Config.webServiceCfg) {
            this.connect(Config.webServiceCfg.ip, Config.webServiceCfg.wsPort, Config.webServiceCfg.protocol);
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