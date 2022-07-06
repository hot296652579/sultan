"use strict";
cc._RF.push(module, 'ab4429aUZpJfoTpYOpkh3ZI', 'ServerConnector');
// script/framework/net/ServerConnector.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConnector = void 0;
const WebSocketClient_1 = __importDefault(require("./WebSocketClient"));
/**
 * @description 服务器连接器
 */
class ServerConnector {
    constructor() {
        /**
         * @description websocket实例由外部设置方可使用
         */
        this._wsClient = null;
        this._curRecvHartTimeOutCount = 0; //当前接收心跳超时的次数
        this._wsClient = new WebSocketClient_1.default();
        this._wsClient.onClose = this.onClose.bind(this);
        this._wsClient.onError = this.onError.bind(this);
        this._wsClient.onMessage = this.onMessage.bind(this);
        this._wsClient.onOpen = this.onOpen.bind(this);
    }
    /**
     * @description 发送心跳
     */
    sendHeartbeat() {
        if (CC_DEBUG)
            cc.error(`请重写sendHeartbeat`);
    }
    /**
     * @description 获取最大心跳超时的次数
     */
    getMaxHeartbeatTimeOut() {
        //默认给5次
        return 5;
    }
    /**@description 心跳发送间隔，默认为3秒 */
    getHeartbeatInterval() {
        return 3000;
    }
    /**
     * @description 心跳超时
     */
    onHeartbeatTimeOut() {
        //do noting
        cc.error('server heartbeat timeout');
    }
    /**
     * @description 是否为心跳消息
     */
    isHeartBeat(data) {
        return false;
    }
    /**
     * @description 网络打开
     */
    onOpen() {
        G.Logger.log('网络打开');
        this._curRecvHartTimeOutCount = 0;
        this.startSendHartSchedule();
    }
    /**
     * @description 网络关闭
     */
    onClose(ev) {
        //停止心跳发送，已经没有意义
        G.Logger.log('网络关闭', ev);
        this.stopSendHartSchedule();
    }
    /**
     * @description 网络错误
     */
    onError(ev) {
        //网络连接出错误，停止心跳发送
        G.Logger.log('网络错误', ev);
        this.stopSendHartSchedule();
    }
    /**
     * @description 收到网络消息
     */
    onMessage(data) {
        // G.Logger.log('收到网络消息',data);
        this.recvHeartbeat();
    }
    /**
     * @description 收到心跳
     */
    recvHeartbeat() {
        this._curRecvHartTimeOutCount = 0;
    }
    /**
     * @description 连接网络
     * @param ip
     * @param port
     * @param protocol 协议类型 ws / wss
     */
    connect(ip, port = null, protocol = "ws") {
        // if (!protocol) {
        //     protocol = "ws";
        // }
        if (window.location.protocol === "https:") {
            protocol = "wss";
        }
        else {
            protocol = "ws";
        }
        if (port) {
            if (typeof port == "string" && port.length > 0) {
                this._wsClient && this._wsClient.initWebSocket(ip, port, protocol);
            }
            else if (typeof port == "number" && port > 0) {
                this._wsClient && this._wsClient.initWebSocket(ip, port.toString(), protocol);
            }
            else {
                this._wsClient && this._wsClient.initWebSocket(ip, null, protocol);
            }
        }
        else {
            this._wsClient && this._wsClient.initWebSocket(ip, null, protocol);
        }
    }
    /**
     * @description 清除定时发送心跳的定时器id
     */
    stopSendHartSchedule() {
        if (this._sendHartId) {
            clearInterval(this._sendHartId);
            this._sendHartId = null;
        }
    }
    /**
     * @description 启动心跳发送
     */
    startSendHartSchedule() {
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
    send(msg) {
        this._wsClient && this._wsClient.send(msg.buffer);
    }
    close() {
        this.stopSendHartSchedule();
        this._wsClient && this._wsClient.close();
    }
}
exports.ServerConnector = ServerConnector;

cc._RF.pop();