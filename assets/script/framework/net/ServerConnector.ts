import WebSocketClinet from "./WebSocketClient";
import { Message } from "./Message";
import PanelHelp from "../../msgbox/PanelHelp";
/**
 * @description 服务器连接器
 */

export class ServerConnector {

    /**
     * @description websocket实例由外部设置方可使用
     */
    private _wsClient: WebSocketClinet = null;

    constructor() {
        this._wsClient = new WebSocketClinet();
        this._wsClient.onClose = this.onClose.bind(this);
        this._wsClient.onError = this.onError.bind(this);
        this._wsClient.onMessage = this.onMessage.bind(this);
        this._wsClient.onOpen = this.onOpen.bind(this);
    }

    /**
     * @description 发送心跳
     */
    protected sendHeartbeat() {
        if (CC_DEBUG) cc.error(`请重写sendHeartbeat`);
    }

    /**
     * @description 获取最大心跳超时的次数
     */
    protected getMaxHeartbeatTimeOut(): number {
        //默认给5次
        return 5;
    }

    /**@description 心跳发送间隔，默认为3秒 */
    protected getHeartbeatInterval(): number {
        return 3000;
    }

    /**
     * @description 心跳超时
     */
    protected onHeartbeatTimeOut() {
        //do noting
        cc.error('server heartbeat timeout');
    }

    /**
     * @description 是否为心跳消息
     */
    protected isHeartBeat(data: Message): boolean {
        return false;
    }

    /**
     * @description 网络打开
     */
    protected onOpen() {
        G.Logger.log('网络打开');
        this._curRecvHartTimeOutCount = 0;
        this.startSendHartSchedule();
    }

    /**
     * @description 网络关闭
     */
    protected onClose(ev: Event) {
        //停止心跳发送，已经没有意义
        G.Logger.log('网络关闭', ev);
        this.stopSendHartSchedule();
    }

    /**
     * @description 网络错误
     */
    protected onError(ev: Event) {
        //网络连接出错误，停止心跳发送
        G.Logger.log('网络错误', ev);

        this.stopSendHartSchedule();
    }

    /**
     * @description 收到网络消息
     */
    protected onMessage(data: Uint8Array) {
        // G.Logger.log('收到网络消息',data);
        this.recvHeartbeat();
    }

    /**
     * @description 收到心跳
     */
    protected recvHeartbeat() {
        this._curRecvHartTimeOutCount = 0;
    }

    private _sendHartId: NodeJS.Timeout; //发送心跳包的间隔id
    private _curRecvHartTimeOutCount: number = 0;//当前接收心跳超时的次数

    /**
     * @description 连接网络
     * @param ip 
     * @param port 
     * @param protocol 协议类型 ws / wss 
     */
    public connect(ip: string, port: number | string = null, protocol: string = "ws") {
        // if (!protocol) {
        //     protocol = "ws";
        // }

        if (window.location.protocol === "https:") {
            protocol = "wss";
        } else {
            protocol = "ws";
        }

        if (port) {
            if (typeof port == "string" && port.length > 0) {
                this._wsClient && this._wsClient.initWebSocket(ip, port, protocol);
            } else if (typeof port == "number" && port > 0) {
                this._wsClient && this._wsClient.initWebSocket(ip, port.toString(), protocol);
            } else {
                this._wsClient && this._wsClient.initWebSocket(ip, null, protocol);
            }
        } else {
            this._wsClient && this._wsClient.initWebSocket(ip, null, protocol);
        }
    }

    /**
     * @description 清除定时发送心跳的定时器id
     */
    protected stopSendHartSchedule() {
        if (this._sendHartId) {
            clearInterval(this._sendHartId);
            this._sendHartId = null;
        }
    }

    /**
     * @description 启动心跳发送
     */
    protected startSendHartSchedule() {
        this.stopSendHartSchedule();
        this.sendHeartbeat();
        this._sendHartId = setInterval(() => {
            this._curRecvHartTimeOutCount = this._curRecvHartTimeOutCount + 1;
            if (this._curRecvHartTimeOutCount > this.getMaxHeartbeatTimeOut()) {
                this.stopSendHartSchedule();
                this.onHeartbeatTimeOut();
                return;
            }
            this.sendHeartbeat();
        }, this.getHeartbeatInterval());
    }



    /**
     * @description 发送请求
     * @param msg 消息
     */
    public send(msg: Message) {
        this._wsClient && this._wsClient.send(msg.buffer);
    }

    public close() {
        this.stopSendHartSchedule();
        this._wsClient && this._wsClient.close();
    }
}