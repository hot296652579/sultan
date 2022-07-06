
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/net/ServerConnector.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL25ldC9TZXJ2ZXJDb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWdEO0FBR2hEOztHQUVHO0FBRUgsTUFBYSxlQUFlO0lBT3hCO1FBTEE7O1dBRUc7UUFDSyxjQUFTLEdBQW9CLElBQUksQ0FBQztRQXlGbEMsNkJBQXdCLEdBQVcsQ0FBQyxDQUFDLENBQUEsYUFBYTtRQXRGdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxhQUFhO1FBQ25CLElBQUksUUFBUTtZQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDTyxzQkFBc0I7UUFDNUIsT0FBTztRQUNQLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELCtCQUErQjtJQUNyQixvQkFBb0I7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sa0JBQWtCO1FBQ3hCLFdBQVc7UUFDWCxFQUFFLENBQUMsS0FBSyxDQUFDLDBCQUEwQixD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QUF3QixHQUFHLENBQUMsQ0FBQztZQUNsRSxJQUFJLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMxQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUlEOzs7T0FHRztJQUNJLElBQUksQ0FBQyxHQUFZO1FBQ3BCLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdDLENBQUM7Q0FDSjtBQXZLRCwwQ0F1S0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViU29ja2V0Q2xpbmV0IGZyb20gXCIuL1dlYlNvY2tldENsaWVudFwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuL01lc3NhZ2VcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uLy4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbi8qKlxuICogQGRlc2NyaXB0aW9uIOacjeWKoeWZqOi/nuaOpeWZqFxuICovXG5cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJDb25uZWN0b3Ige1xuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIHdlYnNvY2tldOWunuS+i+eUseWklumDqOiuvue9ruaWueWPr+S9v+eUqFxuICAgICAqL1xuICAgIHByaXZhdGUgX3dzQ2xpZW50OiBXZWJTb2NrZXRDbGluZXQgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3dzQ2xpZW50ID0gbmV3IFdlYlNvY2tldENsaW5ldCgpO1xuICAgICAgICB0aGlzLl93c0NsaWVudC5vbkNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX3dzQ2xpZW50Lm9uRXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fd3NDbGllbnQub25NZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fd3NDbGllbnQub25PcGVuID0gdGhpcy5vbk9wZW4uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5Y+R6YCB5b+D6LezXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNlbmRIZWFydGJlYXQoKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IoYOivt+mHjeWGmXNlbmRIZWFydGJlYXRgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g6I635Y+W5pyA5aSn5b+D6Lez6LaF5pe255qE5qyh5pWwXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldE1heEhlYXJ0YmVhdFRpbWVPdXQoKTogbnVtYmVyIHtcbiAgICAgICAgLy/pu5jorqTnu5k15qyhXG4gICAgICAgIHJldHVybiA1O1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDlv4Pot7Plj5HpgIHpl7TpmpTvvIzpu5jorqTkuLoz56eSICovXG4gICAgcHJvdGVjdGVkIGdldEhlYXJ0YmVhdEludGVydmFsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAzMDAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDlv4Pot7PotoXml7ZcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25IZWFydGJlYXRUaW1lT3V0KCkge1xuICAgICAgICAvL2RvIG5vdGluZ1xuICAgICAgICBjYy5lcnJvcignc2VydmVyIGhlYXJ0YmVhdCB0aW1lb3V0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOaYr+WQpuS4uuW/g+i3s+a2iOaBr1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBpc0hlYXJ0QmVhdChkYXRhOiBNZXNzYWdlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g572R57uc5omT5byAXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCfnvZHnu5zmiZPlvIAnKTtcbiAgICAgICAgdGhpcy5fY3VyUmVjdkhhcnRUaW1lT3V0Q291bnQgPSAwO1xuICAgICAgICB0aGlzLnN0YXJ0U2VuZEhhcnRTY2hlZHVsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDnvZHnu5zlhbPpl61cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25DbG9zZShldjogRXZlbnQpIHtcbiAgICAgICAgLy/lgZzmraLlv4Pot7Plj5HpgIHvvIzlt7Lnu4/msqHmnInmhI/kuYlcbiAgICAgICAgRy5Mb2dnZXIubG9nKCfnvZHnu5zlhbPpl60nLCBldik7XG4gICAgICAgIHRoaXMuc3RvcFNlbmRIYXJ0U2NoZWR1bGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g572R57uc6ZSZ6K+vXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uRXJyb3IoZXY6IEV2ZW50KSB7XG4gICAgICAgIC8v572R57uc6L+e5o6l5Ye66ZSZ6K+v77yM5YGc5q2i5b+D6Lez5Y+R6YCBXG4gICAgICAgIEcuTG9nZ2VyLmxvZygn572R57uc6ZSZ6K+vJywgZXYpO1xuXG4gICAgICAgIHRoaXMuc3RvcFNlbmRIYXJ0U2NoZWR1bGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS25Yiw572R57uc5raI5oGvXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uTWVzc2FnZShkYXRhOiBVaW50OEFycmF5KSB7XG4gICAgICAgIC8vIEcuTG9nZ2VyLmxvZygn5pS25Yiw572R57uc5raI5oGvJyxkYXRhKTtcbiAgICAgICAgdGhpcy5yZWN2SGVhcnRiZWF0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOaUtuWIsOW/g+i3s1xuICAgICAqL1xuICAgIHByb3RlY3RlZCByZWN2SGVhcnRiZWF0KCkge1xuICAgICAgICB0aGlzLl9jdXJSZWN2SGFydFRpbWVPdXRDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VuZEhhcnRJZDogTm9kZUpTLlRpbWVvdXQ7IC8v5Y+R6YCB5b+D6Lez5YyF55qE6Ze06ZqUaWRcbiAgICBwcml2YXRlIF9jdXJSZWN2SGFydFRpbWVPdXRDb3VudDogbnVtYmVyID0gMDsvL+W9k+WJjeaOpeaUtuW/g+i3s+i2heaXtueahOasoeaVsFxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOi/nuaOpee9kee7nFxuICAgICAqIEBwYXJhbSBpcCBcbiAgICAgKiBAcGFyYW0gcG9ydCBcbiAgICAgKiBAcGFyYW0gcHJvdG9jb2wg5Y2P6K6u57G75Z6LIHdzIC8gd3NzIFxuICAgICAqL1xuICAgIHB1YmxpYyBjb25uZWN0KGlwOiBzdHJpbmcsIHBvcnQ6IG51bWJlciB8IHN0cmluZyA9IG51bGwsIHByb3RvY29sOiBzdHJpbmcgPSBcIndzXCIpIHtcbiAgICAgICAgLy8gaWYgKCFwcm90b2NvbCkge1xuICAgICAgICAvLyAgICAgcHJvdG9jb2wgPSBcIndzXCI7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiKSB7XG4gICAgICAgICAgICBwcm90b2NvbCA9IFwid3NzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm90b2NvbCA9IFwid3NcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3J0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBvcnQgPT0gXCJzdHJpbmdcIiAmJiBwb3J0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93c0NsaWVudCAmJiB0aGlzLl93c0NsaWVudC5pbml0V2ViU29ja2V0KGlwLCBwb3J0LCBwcm90b2NvbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwb3J0ID09IFwibnVtYmVyXCIgJiYgcG9ydCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93c0NsaWVudCAmJiB0aGlzLl93c0NsaWVudC5pbml0V2ViU29ja2V0KGlwLCBwb3J0LnRvU3RyaW5nKCksIHByb3RvY29sKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd3NDbGllbnQgJiYgdGhpcy5fd3NDbGllbnQuaW5pdFdlYlNvY2tldChpcCwgbnVsbCwgcHJvdG9jb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fd3NDbGllbnQgJiYgdGhpcy5fd3NDbGllbnQuaW5pdFdlYlNvY2tldChpcCwgbnVsbCwgcHJvdG9jb2wpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOa4hemZpOWumuaXtuWPkemAgeW/g+i3s+eahOWumuaXtuWZqGlkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN0b3BTZW5kSGFydFNjaGVkdWxlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VuZEhhcnRJZCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zZW5kSGFydElkKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRIYXJ0SWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWQr+WKqOW/g+i3s+WPkemAgVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdGFydFNlbmRIYXJ0U2NoZWR1bGUoKSB7XG4gICAgICAgIHRoaXMuc3RvcFNlbmRIYXJ0U2NoZWR1bGUoKTtcbiAgICAgICAgdGhpcy5zZW5kSGVhcnRiZWF0KCk7XG4gICAgICAgIHRoaXMuX3NlbmRIYXJ0SWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jdXJSZWN2SGFydFRpbWVPdXRDb3VudCA9IHRoaXMuX2N1clJlY3ZIYXJ0VGltZU91dENvdW50ICsgMTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJSZWN2SGFydFRpbWVPdXRDb3VudCA+IHRoaXMuZ2V0TWF4SGVhcnRiZWF0VGltZU91dCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wU2VuZEhhcnRTY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25IZWFydGJlYXRUaW1lT3V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZW5kSGVhcnRiZWF0KCk7XG4gICAgICAgIH0sIHRoaXMuZ2V0SGVhcnRiZWF0SW50ZXJ2YWwoKSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDlj5HpgIHor7fmsYJcbiAgICAgKiBAcGFyYW0gbXNnIOa2iOaBr1xuICAgICAqL1xuICAgIHB1YmxpYyBzZW5kKG1zZzogTWVzc2FnZSkge1xuICAgICAgICB0aGlzLl93c0NsaWVudCAmJiB0aGlzLl93c0NsaWVudC5zZW5kKG1zZy5idWZmZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5zdG9wU2VuZEhhcnRTY2hlZHVsZSgpO1xuICAgICAgICB0aGlzLl93c0NsaWVudCAmJiB0aGlzLl93c0NsaWVudC5jbG9zZSgpO1xuICAgIH1cbn0iXX0=