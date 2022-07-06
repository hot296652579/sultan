"use strict";
cc._RF.push(module, '608bdGOEl5HpLe/v5W2tS4u', 'WebSocketClient');
// script/framework/net/WebSocketClient.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventApi_1 = require("../event/EventApi");
/**
 * @description websocket封装
 */
class WebSocketClinet {
    constructor() {
        this._tag = "[WebSocketClinet]";
        this._ip = "";
        this._port = null;
        this._protocol = "ws";
        this._dataArr = [];
        /**@description 是否处于等待连接状态 */
        this._isWaitingConnect = false;
        /** 连接超时时间 默认为10*/
        this._conTimeOut = 10;
        /** 发送超时设置 默认为10*/
        this._sendTimeOut = 10;
        this._ws = null;
        this._onOpen = null;
        this._onClose = null;
        this._onMessage = null;
        this._onError = null;
        this._closeEvent = null;
    }
    set connectTimeOut(value) {
        this._conTimeOut = value;
    }
    get connectTimeOut() {
        return this._conTimeOut;
    }
    set sendTimeOut(value) {
        this._sendTimeOut = value;
    }
    get sendTimeOut() {
        return this._sendTimeOut;
    }
    set onOpen(value) {
        this._onOpen = value;
    }
    /**@description 网络连接成功 */
    get onOpen() {
        return this._onOpen;
    }
    set onClose(value) {
        this._onClose = value;
    }
    /**@description 网络关闭 */
    get onClose() {
        return this._onClose;
    }
    set onMessage(value) {
        this._onMessage = value;
    }
    /**@description 接收网络数据 */
    get onMessage() {
        return this._onMessage;
    }
    set onError(value) {
        this._onError = value;
    }
    /**@description 网络连接错误 */
    get onError() {
        return this._onError;
    }
    init(ip, port, protocol) {
        this._ip = ip;
        this._port = port;
        this._protocol = protocol;
        this._dataArr = [];
        this._conTimeOut = 10;
        this._sendTimeOut = 10;
        this._closeEvent = null;
    }
    connectWebSocket(ip, port, protocol) {
        this.init(ip, port, protocol);
        if (!this._ip)
            return;
        let fullUrl = `${protocol}://${this._ip}`;
        if (this._port) {
            fullUrl = fullUrl + `:${this._port}`;
        }
        if (CC_DEBUG)
            cc.log(this._tag, `initWebSocket : ${fullUrl}`);
        if (CC_JSB && protocol == "wss") {
            let pemFileUrl = cc.url.raw("resources/cacert/cacert.cer");
            if (cc.loader.md5Pipe) {
                pemFileUrl = cc.loader.md5Pipe.transformURL(pemFileUrl);
            }
            this._ws = new (WebSocket)(fullUrl, null, pemFileUrl);
        }
        else {
            this._ws = new WebSocket(fullUrl);
        }
        //cc.log(this._tag,`new websocket readyState : ${this._ws.readyState}`);
        this._ws.binaryType = "arraybuffer";
        //打开socket
        this._ws.onopen = this.__onConected.bind(this);
        //收消息
        this._ws.onmessage = this.__onMessage.bind(this);
        //socket关闭
        this._ws.onclose = this.__onClose.bind(this);
        //错误处理
        this._ws.onerror = this.__onError.bind(this);
    }
    /**
     *
     * @param ip ip
     * @param port 端口
     */
    initWebSocket(ip, port, protocol) {
        if (ip == undefined || ip == null || ip.length < 0) {
            if (CC_DEBUG)
                cc.error(this._tag, `init websocket error ip : ${ip} port : ${port}`);
            return;
        }
        //先判断当前是否已经有连接
        if (this._ws) {
            //cc.log(this._tag,`============initWebSocket111=================`);
            //已经有连接，查看现在的websocket状态
            if (this._ws.readyState == WebSocket.CONNECTING) {
                //当前正在建立连接
                //查看当前连接中的地址是否跟要连接的相同
                if (this._ip == ip && this._port == port) {
                    //cc.warn(this._tag,"socket正在连接中");
                    return;
                }
                else {
                    if (CC_DEBUG)
                        cc.error(this._tag, `当前有正在连接的socket??`);
                }
            }
            else if (this._ws.readyState == WebSocket.OPEN) {
                //当前连接已经打开
                if (this._ip == ip && this._port == port) {
                    if (CC_DEBUG)
                        cc.warn(this._tag, `当前连接已经是打开的，不重复连接`);
                    dispatch('webSocketIsOpen');
                }
                else {
                    if (CC_DEBUG)
                        cc.error(this._tag, `当前已经存在连接，请先关闭${this._ip}:${this._port} 再连接 ${ip} : ${port}`);
                }
            }
            else if (this._ws.readyState == WebSocket.CLOSING) {
                //连接正在关闭，等连接关闭后在进行重新连接
                this._isWaitingConnect = true;
                this._ip = ip;
                this._port = port;
                if (CC_DEBUG)
                    cc.warn(this._tag, `当前网络关闭连接中，关闭完成后重新连接`);
            }
            else {
                //连接处于关闭状态，直接创建新的连接
                this._ws = null;
                this.connectWebSocket(ip, port, protocol);
            }
        }
        else {
            //cc.log(this._tag,`============initWebSocket=================`);
            this.connectWebSocket(ip, port, protocol);
        }
    }
    __onConected(event) {
        if (this._ws) {
            if (CC_DEBUG)
                cc.log(this._tag, `onConected state : ${this._ws.readyState}`);
        }
        if (this._dataArr.length > 0) {
            for (let i = 0; i < this._dataArr.length; i++) {
                this.send(this._dataArr[i]);
            }
            this._dataArr = [];
        }
        if (this.onOpen)
            this.onOpen();
    }
    __onMessage(arraybuffer) {
        let dataArr = new Uint8Array(arraybuffer.data);
        if (this.onMessage)
            this.onMessage(dataArr);
    }
    __onClose(event) {
        this._ws = null;
        if (this._closeEvent) {
            event = this._closeEvent;
            this._closeEvent = null;
        }
        if (event) {
            if (CC_DEBUG)
                cc.log(this._tag, `onClose type : ${event.type}`);
        }
        else {
            if (CC_DEBUG)
                cc.log(this._tag, `onClose`);
        }
        //等待关闭后连接
        if (this._isWaitingConnect) {
            if (CC_DEBUG)
                cc.log(this._tag, `收到连接关闭，有等待连接的网络，重连连接网络`);
            this._closeEvent = null;
            this.connectWebSocket(this._ip, this._port, this._protocol);
            this._isWaitingConnect = false;
        }
        else {
            if (this.onClose)
                this.onClose(event);
        }
    }
    __onError(event) {
        if (event) {
            if (CC_DEBUG)
                cc.error(this._tag, `onError`, event);
        }
        else {
            if (CC_DEBUG)
                cc.error(this._tag, `onError`);
        }
        if (this.onError)
            this.onError(event);
    }
    send(data) {
        if (!this._ws || !data) {
            return;
        }
        if (this._ws.readyState === WebSocket.OPEN) {
            this._ws.send(data);
        }
        else {
            //放入发送队列
            //如果当前连接正在连接中
            if (this._ws.readyState == WebSocket.CONNECTING) {
                this._dataArr.push(data);
            }
            else {
                //关闭或者正在关闭状态
                let content = this._ws.readyState == WebSocket.CLOSING ? `网络正在关闭` : `网络已经关闭`;
                if (CC_DEBUG)
                    cc.warn(this._tag, `发送消息失败: ${content}`);
            }
        }
    }
    /**@description 关闭网络 */
    close() {
        if (this._ws) {
            this._closeEvent = { type: EventApi_1.CustomNetEventType.CLOSE };
            this._ws.close();
        }
        //清空发送
        this._dataArr = [];
        if (CC_DEBUG)
            cc.log(this._tag, `close websocket`);
    }
}
exports.default = WebSocketClinet;

cc._RF.pop();