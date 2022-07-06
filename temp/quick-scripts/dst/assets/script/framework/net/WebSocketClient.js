
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/net/WebSocketClient.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL25ldC9XZWJTb2NrZXRDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBdUQ7QUFFdkQ7O0dBRUc7QUFDSCxNQUFxQixlQUFlO0lBQXBDO1FBRVksU0FBSSxHQUFXLG1CQUFtQixDQUFDO1FBQ25DLFFBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFXLElBQUksQ0FBQztRQUNyQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDdEIsNkJBQTZCO1FBQ3JCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUVsQyxrQkFBa0I7UUFDVixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQU9qQyxrQkFBa0I7UUFDVixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQVExQixRQUFHLEdBQWMsSUFBSSxDQUFDO1FBRXRCLFlBQU8sR0FBZSxJQUFJLENBQUM7UUFTM0IsYUFBUSxHQUFpQixJQUFJLENBQUM7UUFTOUIsZUFBVSxHQUFnQyxJQUFJLENBQUM7UUFTL0MsYUFBUSxHQUEwQixJQUFJLENBQUM7UUFTdkMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7SUF3TC9CLENBQUM7SUE3T0csSUFBVyxjQUFjLENBQUUsS0FBYztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBVyxjQUFjO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBR0QsSUFBVyxXQUFXLENBQUUsS0FBYztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBS0QsSUFBVyxNQUFNLENBQUUsS0FBaUI7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENB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QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO2FBQ0c7WUFDQSxRQUFRO1lBRVIsYUFBYTtZQUNiLElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7aUJBQ0c7Z0JBQ0EsWUFBWTtnQkFDWixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDN0UsSUFBSyxRQUFRO29CQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxXQUFXLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDM0Q7U0FDSjtJQUNMLENBQUM7SUFFRCx1QkFBdUI7SUFDaEIsS0FBSztRQUNSLElBQUssSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxJQUFJLEVBQUcsNkJBQWtCLENBQUMsS0FBSyxFQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQjtRQUNELE1BQU07UUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFLLFFBQVE7WUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUF6UEQsa0NBeVBDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3VzdG9tTmV0RXZlbnRUeXBlIH0gZnJvbSBcIi4uL2V2ZW50L0V2ZW50QXBpXCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIHdlYnNvY2tldOWwgeijhVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJTb2NrZXRDbGluZXQge1xuXG4gICAgcHJpdmF0ZSBfdGFnOiBzdHJpbmcgPSBcIltXZWJTb2NrZXRDbGluZXRdXCI7XG4gICAgcHJpdmF0ZSBfaXA6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBfcG9ydDogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIF9wcm90b2NvbCA6IHN0cmluZyA9IFwid3NcIjtcbiAgICBwcml2YXRlIF9kYXRhQXJyID0gW107XG4gICAgLyoqQGRlc2NyaXB0aW9uIOaYr+WQpuWkhOS6juetieW+hei/nuaOpeeKtuaAgSAqL1xuICAgIHByaXZhdGUgX2lzV2FpdGluZ0Nvbm5lY3QgPSBmYWxzZTtcblxuICAgIC8qKiDov57mjqXotoXml7bml7bpl7Qg6buY6K6k5Li6MTAqL1xuICAgIHByaXZhdGUgX2NvblRpbWVPdXQ6IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBzZXQgY29ubmVjdFRpbWVPdXQoIHZhbHVlIDogbnVtYmVyICl7XG4gICAgICAgIHRoaXMuX2NvblRpbWVPdXQgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHVibGljIGdldCBjb25uZWN0VGltZU91dCggKSA6IG51bWJlcntcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvblRpbWVPdXQ7XG4gICAgfVxuICAgIC8qKiDlj5HpgIHotoXml7borr7nva4g6buY6K6k5Li6MTAqL1xuICAgIHByaXZhdGUgX3NlbmRUaW1lT3V0OiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgc2V0IHNlbmRUaW1lT3V0KCB2YWx1ZSA6IG51bWJlciApe1xuICAgICAgICB0aGlzLl9zZW5kVGltZU91dCA9IHZhbHVlO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IHNlbmRUaW1lT3V0KCApIDogbnVtYmVye1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VuZFRpbWVPdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfd3M6IFdlYlNvY2tldCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9vbk9wZW4gOiAoICk9PnZvaWQgPSBudWxsO1xuICAgIHB1YmxpYyBzZXQgb25PcGVuKCB2YWx1ZSA6ICgpPT4gdm9pZCl7XG4gICAgICAgIHRoaXMuX29uT3BlbiA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipAZGVzY3JpcHRpb24g572R57uc6L+e5o6l5oiQ5YqfICovXG4gICAgcHVibGljIGdldCBvbk9wZW4oICl7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbk9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25DbG9zZSA6IChldiApPT52b2lkID0gbnVsbDtcbiAgICBwdWJsaWMgc2V0IG9uQ2xvc2UoIHZhbHVlIDogKGV2ICk9PnZvaWQgKXtcbiAgICAgICAgdGhpcy5fb25DbG9zZSA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipAZGVzY3JpcHRpb24g572R57uc5YWz6ZetICovXG4gICAgcHVibGljIGdldCBvbkNsb3NlKCApe1xuICAgICAgICByZXR1cm4gdGhpcy5fb25DbG9zZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbk1lc3NhZ2UgOiAoZGF0YSA6IFVpbnQ4QXJyYXkpPT4gdm9pZCA9IG51bGw7XG4gICAgcHVibGljIHNldCBvbk1lc3NhZ2UoIHZhbHVlIDogKGRhdGEgOiBVaW50OEFycmF5KT0+dm9pZCl7XG4gICAgICAgIHRoaXMuX29uTWVzc2FnZSA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipAZGVzY3JpcHRpb24g5o6l5pS2572R57uc5pWw5o2uICovXG4gICAgcHVibGljIGdldCBvbk1lc3NhZ2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uTWVzc2FnZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkVycm9yIDogKCBldiA6IEV2ZW50ICk9PnZvaWQgPSBudWxsO1xuICAgIHB1YmxpYyBzZXQgb25FcnJvciggdmFsdWUgOiAoZXYgOiBFdmVudCk9PnZvaWQgKXtcbiAgICAgICAgdGhpcy5fb25FcnJvciA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipAZGVzY3JpcHRpb24g572R57uc6L+e5o6l6ZSZ6K+vICovXG4gICAgcHVibGljIGdldCBvbkVycm9yKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkVycm9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Nsb3NlRXZlbnQgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpbml0KGlwOiBzdHJpbmcsIHBvcnQ6IHN0cmluZyAsIHByb3RvY29sIDogc3RyaW5nICkge1xuICAgICAgICB0aGlzLl9pcCA9IGlwO1xuICAgICAgICB0aGlzLl9wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy5fcHJvdG9jb2wgPSBwcm90b2NvbDtcbiAgICAgICAgdGhpcy5fZGF0YUFyciA9IFtdO1xuICAgICAgICB0aGlzLl9jb25UaW1lT3V0ID0gMTA7XG4gICAgICAgIHRoaXMuX3NlbmRUaW1lT3V0ID0gMTA7XG4gICAgICAgIHRoaXMuX2Nsb3NlRXZlbnQgPSBudWxsO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjb25uZWN0V2ViU29ja2V0KCBpcCA6IHN0cmluZyAsIHBvcnQ6IHN0cmluZyAsIHByb3RvY29sIDogc3RyaW5nICl7XG4gICAgICAgIHRoaXMuaW5pdChpcCwgcG9ydCxwcm90b2NvbCk7XG4gICAgICAgIGlmICghdGhpcy5faXAgKSByZXR1cm47XG4gICAgICAgIGxldCBmdWxsVXJsID0gYCR7cHJvdG9jb2x9Oi8vJHt0aGlzLl9pcH1gO1xuICAgICAgICBpZih0aGlzLl9wb3J0KXtcbiAgICAgICAgICAgIGZ1bGxVcmwgPSBmdWxsVXJsICtgOiR7dGhpcy5fcG9ydH1gO1xuICAgICAgICB9XG4gICAgICAgIGlmICggQ0NfREVCVUcpIGNjLmxvZyh0aGlzLl90YWcsYGluaXRXZWJTb2NrZXQgOiAke2Z1bGxVcmx9YCk7XG5cblxuICAgICAgICBpZihDQ19KU0IgJiYgcHJvdG9jb2wgPT0gXCJ3c3NcIil7XG4gICAgICAgICAgICBsZXQgcGVtRmlsZVVybCA9IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvY2FjZXJ0L2NhY2VydC5jZXJcIik7XG4gICAgICAgICAgICBpZihjYy5sb2FkZXIubWQ1UGlwZSl7XG4gICAgICAgICAgICAgICAgcGVtRmlsZVVybCA9IGNjLmxvYWRlci5tZDVQaXBlLnRyYW5zZm9ybVVSTChwZW1GaWxlVXJsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fd3MgPSBuZXcgKDxhbnk+KFdlYlNvY2tldCkpKGZ1bGxVcmwsbnVsbCxwZW1GaWxlVXJsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLl93cyA9IG5ldyBXZWJTb2NrZXQoZnVsbFVybCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jYy5sb2codGhpcy5fdGFnLGBuZXcgd2Vic29ja2V0IHJlYWR5U3RhdGUgOiAke3RoaXMuX3dzLnJlYWR5U3RhdGV9YCk7XG4gICAgICAgIHRoaXMuX3dzLmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG5cbiAgICAgICAgLy/miZPlvIBzb2NrZXRcbiAgICAgICAgdGhpcy5fd3Mub25vcGVuID0gdGhpcy5fX29uQ29uZWN0ZWQuYmluZCh0aGlzKTtcblxuICAgICAgICAvL+aUtua2iOaBr1xuICAgICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSB0aGlzLl9fb25NZXNzYWdlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy9zb2NrZXTlhbPpl61cbiAgICAgICAgdGhpcy5fd3Mub25jbG9zZSA9IHRoaXMuX19vbkNsb3NlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy/plJnor6/lpITnkIZcbiAgICAgICAgdGhpcy5fd3Mub25lcnJvciA9IHRoaXMuX19vbkVycm9yLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGlwIGlwXG4gICAgICogQHBhcmFtIHBvcnQg56uv5Y+jXG4gICAgICovXG4gICAgcHVibGljIGluaXRXZWJTb2NrZXQoaXA6IHN0cmluZywgcG9ydDogc3RyaW5nLCBwcm90b2NvbCA6IHN0cmluZyApIHtcbiAgICAgICAgaWYgKCBpcCA9PSB1bmRlZmluZWQgfHwgaXAgPT0gbnVsbCB8fCBpcC5sZW5ndGggPCAwICl7XG4gICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MuZXJyb3IodGhpcy5fdGFnLGBpbml0IHdlYnNvY2tldCBlcnJvciBpcCA6ICR7aXB9IHBvcnQgOiAke3BvcnR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy/lhYjliKTmlq3lvZPliY3mmK/lkKblt7Lnu4/mnInov57mjqVcbiAgICAgICAgaWYgKCB0aGlzLl93cyApe1xuICAgICAgICAgICAgLy9jYy5sb2codGhpcy5fdGFnLGA9PT09PT09PT09PT1pbml0V2ViU29ja2V0MTExPT09PT09PT09PT09PT09PT1gKTtcbiAgICAgICAgICAgIC8v5bey57uP5pyJ6L+e5o6l77yM5p+l55yL546w5Zyo55qEd2Vic29ja2V054q25oCBXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3dzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcgKXtcbiAgICAgICAgICAgICAgICAvL+W9k+WJjeato+WcqOW7uueri+i/nuaOpVxuICAgICAgICAgICAgICAgIC8v5p+l55yL5b2T5YmN6L+e5o6l5Lit55qE5Zyw5Z2A5piv5ZCm6Lef6KaB6L+e5o6l55qE55u45ZCMXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLl9pcCA9PSBpcCAmJiB0aGlzLl9wb3J0ID09IHBvcnQgKXtcbiAgICAgICAgICAgICAgICAgICAgLy9jYy53YXJuKHRoaXMuX3RhZyxcInNvY2tldOato+WcqOi/nuaOpeS4rVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MuZXJyb3IodGhpcy5fdGFnLGDlvZPliY3mnInmraPlnKjov57mjqXnmoRzb2NrZXQ/P2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmICggdGhpcy5fd3MucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuT1BFTiApe1xuICAgICAgICAgICAgICAgIC8v5b2T5YmN6L+e5o6l5bey57uP5omT5byAXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLl9pcCA9PSBpcCAmJiB0aGlzLl9wb3J0ID09IHBvcnQgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBDQ19ERUJVRyApIGNjLndhcm4odGhpcy5fdGFnLGDlvZPliY3ov57mjqXlt7Lnu4/mmK/miZPlvIDnmoTvvIzkuI3ph43lpI3ov57mjqVgKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goJ3dlYlNvY2tldElzT3BlbicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmICggQ0NfREVCVUcgKSBjYy5lcnJvcih0aGlzLl90YWcsYOW9k+WJjeW3sue7j+WtmOWcqOi/nuaOpe+8jOivt+WFiOWFs+mXrSR7dGhpcy5faXB9OiR7dGhpcy5fcG9ydH0g5YaN6L+e5o6lICR7aXB9IDogJHtwb3J0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKCB0aGlzLl93cy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DTE9TSU5HICl7XG4gICAgICAgICAgICAgICAgLy/ov57mjqXmraPlnKjlhbPpl63vvIznrYnov57mjqXlhbPpl63lkI7lnKjov5vooYzph43mlrDov57mjqVcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1dhaXRpbmdDb25uZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pcCA9IGlwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvcnQgPSBwb3J0O1xuICAgICAgICAgICAgICAgIGlmICggQ0NfREVCVUcgKSBjYy53YXJuKHRoaXMuX3RhZyxg5b2T5YmN572R57uc5YWz6Zet6L+e5o6l5Lit77yM5YWz6Zet5a6M5oiQ5ZCO6YeN5paw6L+e5o6lYCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL+i/nuaOpeWkhOS6juWFs+mXreeKtuaAge+8jOebtOaOpeWIm+W7uuaWsOeahOi/nuaOpVxuICAgICAgICAgICAgICAgIHRoaXMuX3dzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RXZWJTb2NrZXQoaXAscG9ydCxwcm90b2NvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy9jYy5sb2codGhpcy5fdGFnLGA9PT09PT09PT09PT1pbml0V2ViU29ja2V0PT09PT09PT09PT09PT09PT1gKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFdlYlNvY2tldChpcCxwb3J0LHByb3RvY29sKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIF9fb25Db25lY3RlZChldmVudCkge1xuICAgICAgICBpZiAoIHRoaXMuX3dzICl7XG4gICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKHRoaXMuX3RhZyxgb25Db25lY3RlZCBzdGF0ZSA6ICR7dGhpcy5fd3MucmVhZHlTdGF0ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHRoaXMuX2RhdGFBcnIubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMuX2RhdGFBcnIubGVuZ3RoIDsgaSsrICl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kKHRoaXMuX2RhdGFBcnJbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGF0YUFyciA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy5vbk9wZW4gKSB0aGlzLm9uT3BlbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX19vbk1lc3NhZ2UoYXJyYXlidWZmZXIgOiBNZXNzYWdlRXZlbnQgKSB7XG4gICAgICAgIGxldCBkYXRhQXJyID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIuZGF0YSk7XG4gICAgICAgIGlmICggdGhpcy5vbk1lc3NhZ2UgKSB0aGlzLm9uTWVzc2FnZShkYXRhQXJyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9fb25DbG9zZShldmVudCApIHtcblxuICAgICAgICB0aGlzLl93cyA9IG51bGw7XG4gICAgICAgIGlmICggdGhpcy5fY2xvc2VFdmVudCApe1xuICAgICAgICAgICAgZXZlbnQgPSB0aGlzLl9jbG9zZUV2ZW50O1xuICAgICAgICAgICAgdGhpcy5fY2xvc2VFdmVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGV2ZW50ICl7XG4gICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKHRoaXMuX3RhZyxgb25DbG9zZSB0eXBlIDogJHtldmVudC50eXBlfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKHRoaXMuX3RhZyxgb25DbG9zZWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/nrYnlvoXlhbPpl63lkI7ov57mjqVcbiAgICAgICAgaWYgKCB0aGlzLl9pc1dhaXRpbmdDb25uZWN0ICl7XG4gICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKHRoaXMuX3RhZyxg5pS25Yiw6L+e5o6l5YWz6Zet77yM5pyJ562J5b6F6L+e5o6l55qE572R57uc77yM6YeN6L+e6L+e5o6l572R57ucYCk7XG4gICAgICAgICAgICB0aGlzLl9jbG9zZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFdlYlNvY2tldCh0aGlzLl9pcCx0aGlzLl9wb3J0LHRoaXMuX3Byb3RvY29sKTtcbiAgICAgICAgICAgIHRoaXMuX2lzV2FpdGluZ0Nvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAoIHRoaXMub25DbG9zZSApIHRoaXMub25DbG9zZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9fb25FcnJvcihldmVudCA6IEV2ZW50ICkge1xuICAgICAgICBpZiAoIGV2ZW50ICl7XG4gICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MuZXJyb3IodGhpcy5fdGFnLGBvbkVycm9yYCxldmVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYgKCBDQ19ERUJVRyApIGNjLmVycm9yKHRoaXMuX3RhZyxgb25FcnJvcmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy5vbkVycm9yICkgdGhpcy5vbkVycm9yKGV2ZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VuZCggZGF0YTogc3RyaW5nIHwgQXJyYXlCdWZmZXJMaWtlIHwgQmxvYiB8IEFycmF5QnVmZmVyVmlldyApe1xuICAgICAgICBpZiAoICF0aGlzLl93cyB8fCAhZGF0YSApe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy5fd3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4gKXtcbiAgICAgICAgICAgIHRoaXMuX3dzLnNlbmQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8v5pS+5YWl5Y+R6YCB6Zif5YiXXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8v5aaC5p6c5b2T5YmN6L+e5o6l5q2j5Zyo6L+e5o6l5LitXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3dzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcgKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhQXJyLnB1c2goZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8v5YWz6Zet5oiW6ICF5q2j5Zyo5YWz6Zet54q25oCBXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLl93cy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DTE9TSU5HID8gYOe9kee7nOato+WcqOWFs+mXrWAgOiBg572R57uc5bey57uP5YWz6ZetYDtcbiAgICAgICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2Mud2Fybih0aGlzLl90YWcsYOWPkemAgea2iOaBr+Wksei0pTogJHtjb250ZW50fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWFs+mXree9kee7nCAqL1xuICAgIHB1YmxpYyBjbG9zZSggKXtcbiAgICAgICAgaWYgKCB0aGlzLl93cyApe1xuICAgICAgICAgICAgdGhpcy5fY2xvc2VFdmVudCA9IHt0eXBlIDogQ3VzdG9tTmV0RXZlbnRUeXBlLkNMT1NFfTtcbiAgICAgICAgICAgIHRoaXMuX3dzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy/muIXnqbrlj5HpgIFcbiAgICAgICAgdGhpcy5fZGF0YUFyciA9IFtdO1xuICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKHRoaXMuX3RhZyxgY2xvc2Ugd2Vic29ja2V0YCk7XG4gICAgfVxufVxuIl19