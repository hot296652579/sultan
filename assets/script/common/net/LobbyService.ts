/**
 * @description 大厅连接服务
 */

import { reStartGame } from "../../global/Global";
import PanelHelp from "../../msgbox/PanelHelp";
import { LogicEvent } from "../event/LogicEvent";
import { Manager } from "../manager/Manager";
import { CommonService } from "./CommonService";
import { i18n } from "../language/LanguageImpl";

export class LobbyService extends CommonService {
    private _disconnectTimeOut: boolean = false;
    public static get instance() { return this._instance || (this._instance = new LobbyService()); }
    private _disconnectNum: number;
    private _sendDisConnectId: NodeJS.Timeout;
    private _isdisConnect: boolean = false;

    /**
     * 网络打开
     */
    onOpen() {
        super.onOpen()
        if (this._isdisConnect) {
            this._disconnectNum = 0;
            this._isdisConnect = false;
            this.stopSendDisConnectSchedule();
            if (!this._disconnectTimeOut) {
                setTimeout(() => {
                    reStartGame()
                }, 1000)
            }

        }
    }

    /**
     * 网络关闭
     */
    onClose(ev: Event) {
        super.onClose(ev)
        if (ev.type != 'CustomClose' && !this._isdisConnect) {
            this._disconnectNum = 0;
            this._isdisConnect = true;
            this.stopSendDisConnectSchedule();
            this.sendDisConnect();
            this.startSendDisConnectSchedule();
            PanelHelp.hideLoading();
            PanelHelp.showDisconnectWait(() => { })
        }
    }
    private stopSendDisConnectSchedule() {
        if (this._sendDisConnectId) {
            clearInterval(this._sendDisConnectId);
            this._sendDisConnectId = null;
        }
    }

    private startSendDisConnectSchedule() {
        let self = this;
        this._sendDisConnectId = setInterval(() => {
            self._disconnectNum = self._disconnectNum + 1;
            if (self._disconnectNum > 3) {
                self.stopSendDisConnectSchedule();
                self.onDisConnectTimeOut();
                return;
            }
            self.sendDisConnect();
        }, 5000);
    }
    /**
     * 开始重连
     */
    private sendDisConnect() {
        this.disconnect()
    }
    /**
     * 重连超时
     */
    protected onDisConnectTimeOut() {
        G.Logger.log('重连超时');
        this._disconnectTimeOut = true;
        PanelHelp.hideDisconnectWait();
        PanelHelp.showMsgBox(null, Manager.makeLanguage("ERRORCODE.E20010001"), () => {
            Manager.localStorage.cleanLoginCache();
            reStartGame();
        }, Manager.getLanguage("TIPS.RETRY"), false);
    }
}

