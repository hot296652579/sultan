
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/Service.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '04660opGZBJ3JOIgugJWjAl', 'Service');
// script/framework/base/Service.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const ServerConnector_1 = require("../net/ServerConnector");
const EventApi_1 = require("../event/EventApi");
const Decorators_1 = require("../decorator/Decorators");
const Message_1 = require("../net/Message");
const Framework_1 = require("../Framework");
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const AppData_1 = __importDefault(require("../../data/AppData"));
const Operation_1 = __importDefault(require("../extentions/Operation"));
class Service extends ServerConnector_1.ServerConnector {
    constructor() {
        super(...arguments);
        /** 监听集合*/
        this._listeners = {};
        /** 消息处理队列 */
        this._masseageQueue = new Array();
        /** 是否正在处理消息 ，消息队列处理消息有时间，如执行一个消息需要多少秒后才执行一下个*/
        this._isDoingMessage = false;
        /** @description 可能后面有其它特殊需要，特定情况下暂停消息队列的处理, true为停止消息队列处理 */
        this._isPause = false;
        //处理loading界面
        this._sendLoadingHart = new Map();
        this._LoadingTime = 10000;
        // private startLoadingMsgIDMap: Map<number, number> = new Map();
        this.startLoadingMsgIDMap = {
            "3002_1002": "3002_1003", "3001_10001": "3001_10001", "3012_1002": "3012_1003", "3004_1002": "3004_1003",
            "3015_1002": "3015_1003", "3016_1001": "3016_1002", "3018_1003": "3018_1004", "3020_10001": "3020_10001"
        };
    }
    /**@description 公共的消息解析类型，必须包含对消息码的解析与打包 */
    get commonMessageType() {
        return Message_1.Message;
    }
    /**
     * @description 发送心跳
     */
    sendHeartbeat() {
        super.sendHeartbeat();
    }
    /**
     * @description 获取最大心跳超时的次数
     */
    getMaxHeartbeatTimeOut() {
        return super.getMaxHeartbeatTimeOut();
    }
    /**
     * @description 心跳超时
     */
    onHeartbeatTimeOut() {
        super.onHeartbeatTimeOut();
    }
    /**
     * @description 是否为心跳消息
     */
    isHeartBeat(data) {
        return super.isHeartBeat(data);
    }
    onOpen() {
        super.onOpen();
        this.stopSendLoadingHart();
        dispatch(EventApi_1.EventApi.NetEvent.ON_OPEN);
    }
    onClose(ev) {
        super.onClose(ev);
        this.stopSendLoadingHart();
        dispatch(EventApi_1.EventApi.NetEvent.ON_CLOSE, ev);
    }
    onError(ev) {
        super.onError(ev);
        this.stopSendLoadingHart();
        dispatch(EventApi_1.EventApi.NetEvent.ON_ERROR, ev);
    }
    onMessage(data) {
        //先对包信进行解析
        let msg = new this.commonMessageType();
        if (!msg.decode(data)) {
            cc.error(`包信进行解析 error`);
            return;
        }
        super.onMessage(data);
        if (this.isHeartBeat(msg)) {
            //心跳消息，路过处理，应该不会有人注册心跳吧
            let pingData = msg.data;
            let appData = G.DataMgr.get(AppData_1.default);
            appData.timeDifference = Operation_1.default.sub(Number(pingData.Time), Date.now());
            console.log(`收到网络消息 main cmd : ${msg.mainCmd} 时间差 ${appData.timeDifference}`);
            return;
        }
        G.Logger.color(`接收消息：`, `${msg.mainCmd}`);
        G.Logger.log(msg.data);
        this.stopSendLoadingHart(null, msg.mainCmd);
        let key = Decorators_1.makeKey(msg.mainCmd);
        if (this.onlyServerSendMsg(msg)) {
            cc.log(`服务器主动下发: ${msg.mainCmd}`);
            return;
        }
        if (!this._listeners[key]) {
            cc.warn(`no find listener data main cmd : ${msg.mainCmd}`);
            return;
        }
        if (this._listeners[key].length <= 0) {
            return;
        }
        let listenerDatas = this._listeners[key];
        let queueDatas = [];
        for (let i = 0; i < listenerDatas.length; i++) {
            //预先存储的解析类型 //同一个命令使用同一类类型
            let obj = null;
            if (listenerDatas[i].type) {
                obj = new listenerDatas[i].type();
                //解包
                obj.decode(data);
            }
            else {
                //把数据放到里面，让后面使用都自己解析
                obj = msg;
            }
            if (listenerDatas[i].isQueue) {
                //需要加入队列处理
                queueDatas.push(this.copyListenerData(listenerDatas[i], obj));
            }
            else {
                //不需要进入队列处理
                try {
                    listenerDatas[i].func && listenerDatas[i].func.call(listenerDatas[i].target, obj.data.data);
                }
                catch (error) {
                    cc.error(error);
                }
            }
        }
        if (queueDatas.length > 0) {
            this._masseageQueue.push(queueDatas);
        }
    }
    /**
     * @description 暂停消息队列消息处理
     */
    pauseMessageQueue() {
        this._isPause = true;
    }
    /**
     * @description 恢复消息队列消息处理
     */
    resumeMessageQueue() {
        this._isPause = false;
    }
    /**
     * @description 删除消息队列消息处理
     */
    removeMessageQueue(len = 3) {
        if (this._masseageQueue.length == 0)
            return;
        // G.Logger.log('队列消息处理',this._masseageQueue.length);
        //消息队列太多 只处理最近len 个
        if (this._masseageQueue.length > len) {
            this._masseageQueue.splice(0, this._masseageQueue.length - len);
        }
    }
    /**
     * @description 添加服务器数据监听
     * @param mainCmd main command
     * @param handleType 处理类型，指你用哪一个类来进行解析数据
     * @param handleFunc 处理回调
     * @param isQueue 是否进入消息队列
     */
    addListener(mainCmd, handleType, handleFunc, isQueue, target) {
        let key = Decorators_1.makeKey(mainCmd);
        if (this._listeners[key]) {
            let hasSame = false;
            for (let i = 0; i < this._listeners[key].length; i++) {
                if (this._listeners[key][i].target === target) {
                    hasSame = true;
                    break;
                }
            }
            if (hasSame) {
                return;
            }
            this._listeners[key].push({
                mainCmd: mainCmd,
                func: handleFunc,
                type: handleType,
                isQueue: isQueue,
                target: target
            });
        }
        else {
            this._listeners[key] = [];
            this._listeners[key].push({
                mainCmd: mainCmd,
                func: handleFunc,
                type: handleType,
                isQueue: isQueue,
                target: target
            });
        }
    }
    removeListeners(target, mainCmd) {
        if (mainCmd) {
            let self = this;
            Object.keys(this._listeners).forEach((value) => {
                let datas = self._listeners[value];
                let i = datas.length;
                while (i--) {
                    if (datas[i].target == target && datas[i].mainCmd == mainCmd) {
                        datas.splice(i, 1);
                    }
                }
                if (datas.length == 0) {
                    delete self._listeners[value];
                }
            });
            //移除网络队列中已经存在的消息
            let i = this._masseageQueue.length;
            while (i--) {
                let datas = this._masseageQueue[i];
                let j = datas.length;
                while (j--) {
                    if (datas[j].target == target && datas[j].mainCmd == mainCmd) {
                        datas.splice(j, 1);
                    }
                }
                if (datas.length == 0) {
                    this._masseageQueue.splice(i, 1);
                }
            }
        }
        else {
            let self = this;
            Object.keys(this._listeners).forEach((value, index, arr) => {
                let datas = self._listeners[value];
                let i = datas.length;
                while (i--) {
                    if (datas[i].target == target) {
                        datas.splice(i, 1);
                    }
                }
                if (datas.length == 0) {
                    delete self._listeners[value];
                }
            });
            //移除网络队列中已经存在的消息
            let i = this._masseageQueue.length;
            while (i--) {
                let datas = this._masseageQueue[i];
                let j = datas.length;
                while (j--) {
                    if (datas[j].target == target) {
                        datas.splice(j, 1);
                    }
                }
                if (datas.length == 0) {
                    this._masseageQueue.splice(i, 1);
                }
            }
        }
    }
    /**
     * @description 发送请求
     * @param msg msg
     */
    send(msg) {
        //发送请求数据
        if (msg.encode()) {
            super.send(msg);
            this.startSendLoadingHart(msg.mainCmd);
        }
        else {
            cc.error(`encode error`);
        }
        // super.send(msg);
    }
    /**
     * @description 复制proto协议监听数据
     * @param input
     * @param data
     */
    copyListenerData(input, data) {
        return {
            mainCmd: input.mainCmd,
            type: input.type,
            func: input.func,
            isQueue: input.isQueue,
            data: data,
            target: input.target
        };
    }
    /**
     * @description 消息队列处理，由框架调用
     */
    handMessage() {
        //如果当前暂停了消息队列处理，不再处理消息队列
        if (this._isPause)
            return;
        //如果当前有函数正在处理
        if (this._isDoingMessage)
            return;
        //如果当前执行队列为空
        if (this._masseageQueue.length == 0)
            return;
        let datas = this._masseageQueue.shift();
        if (datas == undefined)
            return;
        if (datas.length == 0)
            return;
        this._isDoingMessage = true;
        let handleTime = 0;
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            if (data.func instanceof Function) {
                try {
                    let tempTime = data.func.call(data.target, data.data.data);
                    if (typeof tempTime == "number") {
                        handleTime = Math.max(handleTime, tempTime);
                    }
                }
                catch (error) {
                    cc.error(error);
                }
            }
        }
        if (handleTime == 0) {
            //立即进行处理
            this._isDoingMessage = false;
        }
        else {
            Framework_1.Manager.uiManager.getCanvasComponent().scheduleOnce(() => {
                this._isDoingMessage = false;
            }, handleTime);
        }
    }
    /**
     * @description 重置
     */
    reset() {
        this._isDoingMessage = false;
        this._listeners = {};
        this._masseageQueue = [];
        this.resumeMessageQueue();
    }
    close() {
        //清空消息处理队列
        this._masseageQueue = [];
        this._isDoingMessage = false;
        //不能恢复这个队列，可能在重新连接网络时，如游戏的Logic层暂停掉了处理队列去加载资源，期望加载完成资源后再恢复队列的处理
        //this.resumeMessageQueue();
        super.close();
    }
    /**
     * 服务器主动下发
     */
    onlyServerSendMsg(msg) {
        return false;
    }
    startSendLoadingHart(mainCmd) {
        let key = mainCmd;
        //判断 key是否在startLoadingMsgIDMap中
        if (this.isKey(key)) {
            // console.log(" this._sendLoadingHart", this._sendLoadingHart, key);
            this.stopSendLoadingHart(key, null);
            this._sendLoadingHart[key] = setInterval(() => {
                this.stopSendLoadingHart(key, null);
                PanelHelp_1.default.hideLoading();
            }, this._LoadingTime);
        }
    }
    isKey(key) {
        for (const k in this.startLoadingMsgIDMap) {
            if (k == key)
                return true;
        }
        return false;
    }
    isValue(value) {
        for (const k in this.startLoadingMsgIDMap) {
            if (this.startLoadingMsgIDMap[k] == value)
                return k;
        }
        return null;
    }
    stopSendLoadingHart(key = null, value = null) {
        if (key == null && value == null) { //socket关闭了 清掉所有的定时器
            for (const k in this._sendLoadingHart) {
                clearInterval(this._sendLoadingHart[k]);
                delete this._sendLoadingHart[k];
            }
            this._sendLoadingHart.clear();
        }
        else if (key) { //根据Key清理
            if (Object.keys(this._sendLoadingHart).length != 0 && this._sendLoadingHart[key]) {
                clearInterval(this._sendLoadingHart[key]);
                delete this._sendLoadingHart[key];
            }
        }
        else { //根据vulue找到Key清理
            let k = this.isValue(value);
            if (k) {
                if (Object.keys(this._sendLoadingHart).length != 0 && this._sendLoadingHart[k]) {
                    clearInterval(this._sendLoadingHart[k]);
                    delete this._sendLoadingHart[k];
                }
            }
        }
    }
}
exports.Service = Service;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBeUQ7QUFDekQsZ0RBQTZDO0FBQzdDLHdEQUFrRDtBQUNsRCw0Q0FBeUM7QUFDekMsNENBQXVDO0FBRXZDLHVFQUErQztBQUUvQyxpRUFBeUM7QUFDekMsd0VBQWdEO0FBaUJoRCxNQUFhLE9BQVEsU0FBUSxpQ0FBZTtJQUE1Qzs7UUFvSEksVUFBVTtRQUNGLGVBQVUsR0FBMkMsRUFBRSxDQUFDO1FBRWhFLGFBQWE7UUFDTCxtQkFBYyxHQUErQixJQUFJLEtBQUssRUFBdUIsQ0FBQztRQUV0RiwrQ0FBK0M7UUFDdkMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFekMsNkRBQTZEO1FBQ3JELGFBQVEsR0FBWSxLQUFLLENBQUM7UUFnUGxDLGFBQWE7UUFDTCxxQkFBZ0IsR0FBZ0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMxRCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUM3QixpRUFBaUU7UUFDekQseUJBQW9CLEdBQUc7WUFDM0IsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVc7WUFDdEcsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVk7U0FDN0csQ0FBQztJQWlETixDQUFDO0lBcGFHLDJDQUEyQztJQUMzQyxJQUFjLGlCQUFpQjtRQUMzQixPQUFPLGlCQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ08sYUFBYTtRQUNuQixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNEOztPQUVHO0lBQ08sc0JBQXNCO1FBQzVCLE9BQU8sS0FBSyxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDMUMs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QUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ25DLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakM7YUFBTSxJQUFJLEdBQUcsRUFBRSxFQUFDLFNBQVM7WUFDdEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM5RSxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7YUFBTSxFQUFDLGdCQUFnQjtZQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxFQUFFO2dCQUNILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDNUUsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBdGFELDBCQXNhQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZlckNvbm5lY3RvciB9IGZyb20gXCIuLi9uZXQvU2VydmVyQ29ubmVjdG9yXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgbWFrZUtleSB9IGZyb20gXCIuLi9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuLi9uZXQvTWVzc2FnZVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9GcmFtZXdvcmtcIjtcbmltcG9ydCB7IENvbW1vbk1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgQXBwRGF0YSBmcm9tIFwiLi4vLi4vZGF0YS9BcHBEYXRhXCI7XG5pbXBvcnQgT3BlcmF0aW9uIGZyb20gXCIuLi9leHRlbnRpb25zL09wZXJhdGlvblwiO1xuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiO5pyN5Yqh5Zmo5LmL6Ze05raI5oGv5pS25Y+R5Z+657G7LOazqOWGjOa2iOaBr+W5tui9rOWPkVxuICovXG5cbi8qKiBAZGVzY3JpcHRpb24g5aSE55CG5Ye95pWw5aOw5piOIGhhbmRsZVR5cGUg5Li65L2g5LmL5YmN5rOo5YaM55qEaGFuZGxlVHlwZeexu+Wei+eahOaVsOaNriDov5Tlm57lgLxudW1iZXIg5Li65aSE55CG5Ye95pWw6ZyA6KaB55qE5pe26Ze0ICovXG5leHBvcnQgdHlwZSBNZXNzYWdlSGFuZGxlRnVuYyA9IChoYW5kbGVUeXBlRGF0YTogYW55KSA9PiBudW1iZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvdG9MaXN0ZW5lckRhdGEge1xuICAgIG1haW5DbWQ6IG51bWJlciwgLy8gbWFpbiBjbWRcbiAgICBmdW5jOiBNZXNzYWdlSGFuZGxlRnVuYywgLy/lpITnkIblh73mlbBcbiAgICB0eXBlOiB0eXBlb2YgTWVzc2FnZSwgLy/op6PljIXnsbvlnotcbiAgICBpc1F1ZXVlOiBib29sZWFuLC8v5piv5ZCm6L+b5YWl5raI5oGv6Zif5YiX77yM5aaC5p6c5LiN5piv77yM5pS25Yiw572R57uc5raI5oGv6L+U5Zue77yM5Lya56uL5Y2z5Zue6LCD5aSE55CG5Ye95pWwXG4gICAgZGF0YT86IGFueSwgLy/op6PljIXlkI7nmoTmlbDmja5cbiAgICB0YXJnZXQ/OiBhbnksIC8v5aSE55CG6ICFXG59XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIGV4dGVuZHMgU2VydmVyQ29ubmVjdG9yIHtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDlhazlhbHnmoTmtojmga/op6PmnpDnsbvlnovvvIzlv4XpobvljIXlkKvlr7nmtojmga/noIHnmoTop6PmnpDkuI7miZPljIUgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvbW1vbk1lc3NhZ2VUeXBlKCk6IHR5cGVvZiBNZXNzYWdlIHtcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWPkemAgeW/g+i3s1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZW5kSGVhcnRiZWF0KCkge1xuICAgICAgICBzdXBlci5zZW5kSGVhcnRiZWF0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5bmnIDlpKflv4Pot7PotoXml7bnmoTmrKHmlbBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0TWF4SGVhcnRiZWF0VGltZU91dCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0TWF4SGVhcnRiZWF0VGltZU91dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5b+D6Lez6LaF5pe2XG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uSGVhcnRiZWF0VGltZU91dCgpIHtcbiAgICAgICAgc3VwZXIub25IZWFydGJlYXRUaW1lT3V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDmmK/lkKbkuLrlv4Pot7Pmtojmga9cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaXNIZWFydEJlYXQoZGF0YTogTWVzc2FnZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3VwZXIuaXNIZWFydEJlYXQoZGF0YSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcbiAgICAgICAgc3VwZXIub25PcGVuKCk7XG4gICAgICAgIHRoaXMuc3RvcFNlbmRMb2FkaW5nSGFydCgpO1xuICAgICAgICBkaXNwYXRjaChFdmVudEFwaS5OZXRFdmVudC5PTl9PUEVOKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoZXY6IEV2ZW50KSB7XG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoZXYpO1xuICAgICAgICB0aGlzLnN0b3BTZW5kTG9hZGluZ0hhcnQoKTtcbiAgICAgICAgZGlzcGF0Y2goRXZlbnRBcGkuTmV0RXZlbnQuT05fQ0xPU0UsIGV2KTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uRXJyb3IoZXY6IEV2ZW50KSB7XG4gICAgICAgIHN1cGVyLm9uRXJyb3IoZXYpO1xuICAgICAgICB0aGlzLnN0b3BTZW5kTG9hZGluZ0hhcnQoKTtcbiAgICAgICAgZGlzcGF0Y2goRXZlbnRBcGkuTmV0RXZlbnQuT05fRVJST1IsIGV2KTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uTWVzc2FnZShkYXRhOiBVaW50OEFycmF5KSB7XG5cbiAgICAgICAgLy/lhYjlr7nljIXkv6Hov5vooYzop6PmnpBcbiAgICAgICAgbGV0IG1zZyA9IG5ldyB0aGlzLmNvbW1vbk1lc3NhZ2VUeXBlKCk7XG4gICAgICAgIGlmICghbXNnLmRlY29kZShkYXRhKSkge1xuICAgICAgICAgICAgY2MuZXJyb3IoYOWMheS/oei/m+ihjOino+aekCBlcnJvcmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLm9uTWVzc2FnZShkYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuaXNIZWFydEJlYXQobXNnKSkge1xuICAgICAgICAgICAgLy/lv4Pot7Pmtojmga/vvIzot6/ov4flpITnkIbvvIzlupTor6XkuI3kvJrmnInkurrms6jlhozlv4Pot7PlkKdcbiAgICAgICAgICAgIGxldCBwaW5nRGF0YTogTVNULkcyQ19QaW5nX1JlcyA9IG1zZy5kYXRhO1xuICAgICAgICAgICAgbGV0IGFwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICAgICAgYXBwRGF0YS50aW1lRGlmZmVyZW5jZSA9IE9wZXJhdGlvbi5zdWIoTnVtYmVyKHBpbmdEYXRhLlRpbWUpLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDmlLbliLDnvZHnu5zmtojmga8gbWFpbiBjbWQgOiAke21zZy5tYWluQ21kfSDml7bpl7Tlt64gJHthcHBEYXRhLnRpbWVEaWZmZXJlbmNlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgRy5Mb2dnZXIuY29sb3IoYOaOpeaUtua2iOaBr++8mmAsIGAke21zZy5tYWluQ21kfWApO1xuICAgICAgICBHLkxvZ2dlci5sb2cobXNnLmRhdGEpO1xuICAgICAgICB0aGlzLnN0b3BTZW5kTG9hZGluZ0hhcnQobnVsbCwgbXNnLm1haW5DbWQpO1xuICAgICAgICBsZXQga2V5ID0gbWFrZUtleShtc2cubWFpbkNtZCk7XG5cbiAgICAgICAgaWYgKHRoaXMub25seVNlcnZlclNlbmRNc2cobXNnKSkge1xuICAgICAgICAgICAgY2MubG9nKGDmnI3liqHlmajkuLvliqjkuIvlj5E6ICR7bXNnLm1haW5DbWR9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNba2V5XSkge1xuICAgICAgICAgICAgY2Mud2Fybihgbm8gZmluZCBsaXN0ZW5lciBkYXRhIG1haW4gY21kIDogJHttc2cubWFpbkNtZH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzW2tleV0ubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGlzdGVuZXJEYXRhcyA9IHRoaXMuX2xpc3RlbmVyc1trZXldO1xuICAgICAgICBsZXQgcXVldWVEYXRhcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJEYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy/pooTlhYjlrZjlgqjnmoTop6PmnpDnsbvlnosgLy/lkIzkuIDkuKrlkb3ku6Tkvb/nlKjlkIzkuIDnsbvnsbvlnotcbiAgICAgICAgICAgIGxldCBvYmo6IE1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyRGF0YXNbaV0udHlwZSkge1xuICAgICAgICAgICAgICAgIG9iaiA9IG5ldyBsaXN0ZW5lckRhdGFzW2ldLnR5cGUoKTtcbiAgICAgICAgICAgICAgICAvL+ino+WMhVxuICAgICAgICAgICAgICAgIG9iai5kZWNvZGUoZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v5oqK5pWw5o2u5pS+5Yiw6YeM6Z2i77yM6K6p5ZCO6Z2i5L2/55So6YO96Ieq5bex6Kej5p6QXG4gICAgICAgICAgICAgICAgb2JqID0gbXNnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJEYXRhc1tpXS5pc1F1ZXVlKSB7XG4gICAgICAgICAgICAgICAgLy/pnIDopoHliqDlhaXpmJ/liJflpITnkIZcbiAgICAgICAgICAgICAgICBxdWV1ZURhdGFzLnB1c2godGhpcy5jb3B5TGlzdGVuZXJEYXRhKGxpc3RlbmVyRGF0YXNbaV0sIG9iaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/kuI3pnIDopoHov5vlhaXpmJ/liJflpITnkIZcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lckRhdGFzW2ldLmZ1bmMgJiYgbGlzdGVuZXJEYXRhc1tpXS5mdW5jLmNhbGwobGlzdGVuZXJEYXRhc1tpXS50YXJnZXQsIG9iai5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChxdWV1ZURhdGFzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21hc3NlYWdlUXVldWUucHVzaChxdWV1ZURhdGFzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiDnm5HlkKzpm4blkIgqL1xuICAgIHByaXZhdGUgX2xpc3RlbmVyczogeyBba2V5OiBzdHJpbmddOiBQcm90b0xpc3RlbmVyRGF0YVtdIH0gPSB7fTtcblxuICAgIC8qKiDmtojmga/lpITnkIbpmJ/liJcgKi9cbiAgICBwcml2YXRlIF9tYXNzZWFnZVF1ZXVlOiBBcnJheTxQcm90b0xpc3RlbmVyRGF0YVtdPiA9IG5ldyBBcnJheTxQcm90b0xpc3RlbmVyRGF0YVtdPigpO1xuXG4gICAgLyoqIOaYr+WQpuato+WcqOWkhOeQhua2iOaBryDvvIzmtojmga/pmJ/liJflpITnkIbmtojmga/mnInml7bpl7TvvIzlpoLmiafooYzkuIDkuKrmtojmga/pnIDopoHlpJrlsJHnp5LlkI7miY3miafooYzkuIDkuIvkuKoqL1xuICAgIHByaXZhdGUgX2lzRG9pbmdNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGRlc2NyaXB0aW9uIOWPr+iDveWQjumdouacieWFtuWug+eJueauiumcgOimge+8jOeJueWumuaDheWGteS4i+aaguWBnOa2iOaBr+mYn+WIl+eahOWkhOeQhiwgdHJ1ZeS4uuWBnOatoua2iOaBr+mYn+WIl+WkhOeQhiAqL1xuICAgIHByaXZhdGUgX2lzUGF1c2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDmmoLlgZzmtojmga/pmJ/liJfmtojmga/lpITnkIZcbiAgICAgKi9cbiAgICBwdWJsaWMgcGF1c2VNZXNzYWdlUXVldWUoKSB7XG4gICAgICAgIHRoaXMuX2lzUGF1c2UgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDmgaLlpI3mtojmga/pmJ/liJfmtojmga/lpITnkIZcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzdW1lTWVzc2FnZVF1ZXVlKCkge1xuICAgICAgICB0aGlzLl9pc1BhdXNlID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDliKDpmaTmtojmga/pmJ/liJfmtojmga/lpITnkIZcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlTWVzc2FnZVF1ZXVlKGxlbiA9IDMpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hc3NlYWdlUXVldWUubGVuZ3RoID09IDApIHJldHVybjtcbiAgICAgICAgLy8gRy5Mb2dnZXIubG9nKCfpmJ/liJfmtojmga/lpITnkIYnLHRoaXMuX21hc3NlYWdlUXVldWUubGVuZ3RoKTtcbiAgICAgICAgLy/mtojmga/pmJ/liJflpKrlpJog5Y+q5aSE55CG5pyA6L+RbGVuIOS4qlxuICAgICAgICBpZiAodGhpcy5fbWFzc2VhZ2VRdWV1ZS5sZW5ndGggPiBsZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX21hc3NlYWdlUXVldWUuc3BsaWNlKDAsIHRoaXMuX21hc3NlYWdlUXVldWUubGVuZ3RoIC0gbGVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOa3u+WKoOacjeWKoeWZqOaVsOaNruebkeWQrFxuICAgICAqIEBwYXJhbSBtYWluQ21kIG1haW4gY29tbWFuZFxuICAgICAqIEBwYXJhbSBoYW5kbGVUeXBlIOWkhOeQhuexu+Wei++8jOaMh+S9oOeUqOWTquS4gOS4quexu+adpei/m+ihjOino+aekOaVsOaNrlxuICAgICAqIEBwYXJhbSBoYW5kbGVGdW5jIOWkhOeQhuWbnuiwg1xuICAgICAqIEBwYXJhbSBpc1F1ZXVlIOaYr+WQpui/m+WFpea2iOaBr+mYn+WIl1xuICAgICAqL1xuICAgIHB1YmxpYyBhZGRMaXN0ZW5lcihcbiAgICAgICAgbWFpbkNtZDogbnVtYmVyLFxuICAgICAgICBoYW5kbGVUeXBlOiBhbnksXG4gICAgICAgIGhhbmRsZUZ1bmM6IE1lc3NhZ2VIYW5kbGVGdW5jLFxuICAgICAgICBpc1F1ZXVlOiBib29sZWFuLFxuICAgICAgICB0YXJnZXQ6IGFueSkge1xuICAgICAgICBsZXQga2V5ID0gbWFrZUtleShtYWluQ21kKTtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyc1trZXldKSB7XG4gICAgICAgICAgICBsZXQgaGFzU2FtZSA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9saXN0ZW5lcnNba2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnNba2V5XVtpXS50YXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBoYXNTYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc1NhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNba2V5XS5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYWluQ21kOiBtYWluQ21kLFxuICAgICAgICAgICAgICAgIGZ1bmM6IGhhbmRsZUZ1bmMsXG4gICAgICAgICAgICAgICAgdHlwZTogaGFuZGxlVHlwZSxcbiAgICAgICAgICAgICAgICBpc1F1ZXVlOiBpc1F1ZXVlLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1trZXldID0gW107XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNba2V5XS5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYWluQ21kOiBtYWluQ21kLFxuICAgICAgICAgICAgICAgIGZ1bmM6IGhhbmRsZUZ1bmMsXG4gICAgICAgICAgICAgICAgdHlwZTogaGFuZGxlVHlwZSxcbiAgICAgICAgICAgICAgICBpc1F1ZXVlOiBpc1F1ZXVlLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lcnModGFyZ2V0OiBhbnksIG1haW5DbWQ/OiBudW1iZXIpIHtcblxuICAgICAgICBpZiAobWFpbkNtZCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fbGlzdGVuZXJzKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhcyA9IHNlbGYuX2xpc3RlbmVyc1t2YWx1ZV07XG4gICAgICAgICAgICAgICAgbGV0IGkgPSBkYXRhcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YXNbaV0udGFyZ2V0ID09IHRhcmdldCAmJiBkYXRhc1tpXS5tYWluQ21kID09IG1haW5DbWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNlbGYuX2xpc3RlbmVyc1t2YWx1ZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8v56e76Zmk572R57uc6Zif5YiX5Lit5bey57uP5a2Y5Zyo55qE5raI5oGvXG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuX21hc3NlYWdlUXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhcyA9IHRoaXMuX21hc3NlYWdlUXVldWVbaV07XG4gICAgICAgICAgICAgICAgbGV0IGogPSBkYXRhcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YXNbal0udGFyZ2V0ID09IHRhcmdldCAmJiBkYXRhc1tqXS5tYWluQ21kID09IG1haW5DbWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFzc2VhZ2VRdWV1ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9saXN0ZW5lcnMpLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGFycjogc3RyaW5nW10pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YXMgPSBzZWxmLl9saXN0ZW5lcnNbdmFsdWVdO1xuXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBkYXRhcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YXNbaV0udGFyZ2V0ID09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLl9saXN0ZW5lcnNbdmFsdWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8v56e76Zmk572R57uc6Zif5YiX5Lit5bey57uP5a2Y5Zyo55qE5raI5oGvXG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuX21hc3NlYWdlUXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhcyA9IHRoaXMuX21hc3NlYWdlUXVldWVbaV07XG4gICAgICAgICAgICAgICAgbGV0IGogPSBkYXRhcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YXNbal0udGFyZ2V0ID09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXNzZWFnZVF1ZXVlLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5Y+R6YCB6K+35rGCXG4gICAgICogQHBhcmFtIG1zZyBtc2dcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VuZChtc2cpIHtcbiAgICAgICAgLy/lj5HpgIHor7fmsYLmlbDmja5cbiAgICAgICAgaWYgKG1zZy5lbmNvZGUoKSkge1xuICAgICAgICAgICAgc3VwZXIuc2VuZChtc2cpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFNlbmRMb2FkaW5nSGFydChtc2cubWFpbkNtZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5lcnJvcihgZW5jb2RlIGVycm9yYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VwZXIuc2VuZChtc2cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDlpI3liLZwcm90b+WNj+iuruebkeWQrOaVsOaNrlxuICAgICAqIEBwYXJhbSBpbnB1dCBcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvcHlMaXN0ZW5lckRhdGEoaW5wdXQ6IFByb3RvTGlzdGVuZXJEYXRhLCBkYXRhOiBhbnkpOiBQcm90b0xpc3RlbmVyRGF0YSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluQ21kOiBpbnB1dC5tYWluQ21kLFxuICAgICAgICAgICAgdHlwZTogaW5wdXQudHlwZSxcbiAgICAgICAgICAgIGZ1bmM6IGlucHV0LmZ1bmMsXG4gICAgICAgICAgICBpc1F1ZXVlOiBpbnB1dC5pc1F1ZXVlLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHRhcmdldDogaW5wdXQudGFyZ2V0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOa2iOaBr+mYn+WIl+WkhOeQhu+8jOeUseahhuaetuiwg+eUqFxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kTWVzc2FnZSgpIHtcblxuICAgICAgICAvL+WmguaenOW9k+WJjeaaguWBnOS6hua2iOaBr+mYn+WIl+WkhOeQhu+8jOS4jeWGjeWkhOeQhua2iOaBr+mYn+WIl1xuICAgICAgICBpZiAodGhpcy5faXNQYXVzZSkgcmV0dXJuO1xuXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pyJ5Ye95pWw5q2j5Zyo5aSE55CGXG4gICAgICAgIGlmICh0aGlzLl9pc0RvaW5nTWVzc2FnZSkgcmV0dXJuO1xuICAgICAgICAvL+WmguaenOW9k+WJjeaJp+ihjOmYn+WIl+S4uuepulxuICAgICAgICBpZiAodGhpcy5fbWFzc2VhZ2VRdWV1ZS5sZW5ndGggPT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBkYXRhcyA9IHRoaXMuX21hc3NlYWdlUXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKGRhdGFzID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZGF0YXMubGVuZ3RoID09IDApIHJldHVybjtcblxuICAgICAgICB0aGlzLl9pc0RvaW5nTWVzc2FnZSA9IHRydWU7XG4gICAgICAgIGxldCBoYW5kbGVUaW1lID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1tpXTtcbiAgICAgICAgICAgIGlmIChkYXRhLmZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wVGltZSA9IGRhdGEuZnVuYy5jYWxsKGRhdGEudGFyZ2V0LCBkYXRhLmRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGVtcFRpbWUgPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlVGltZSA9IE1hdGgubWF4KGhhbmRsZVRpbWUsIHRlbXBUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlVGltZSA9PSAwKSB7XG4gICAgICAgICAgICAvL+eri+WNs+i/m+ihjOWkhOeQhlxuICAgICAgICAgICAgdGhpcy5faXNEb2luZ01lc3NhZ2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLmdldENhbnZhc0NvbXBvbmVudCgpLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNEb2luZ01lc3NhZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIGhhbmRsZVRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOmHjee9rlxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpcy5faXNEb2luZ01lc3NhZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuX21hc3NlYWdlUXVldWUgPSBbXTtcbiAgICAgICAgdGhpcy5yZXN1bWVNZXNzYWdlUXVldWUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKSB7XG5cbiAgICAgICAgLy/muIXnqbrmtojmga/lpITnkIbpmJ/liJdcbiAgICAgICAgdGhpcy5fbWFzc2VhZ2VRdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLl9pc0RvaW5nTWVzc2FnZSA9IGZhbHNlO1xuICAgICAgICAvL+S4jeiDveaBouWkjei/meS4qumYn+WIl++8jOWPr+iDveWcqOmHjeaWsOi/nuaOpee9kee7nOaXtu+8jOWmgua4uOaIj+eahExvZ2lj5bGC5pqC5YGc5o6J5LqG5aSE55CG6Zif5YiX5Y675Yqg6L296LWE5rqQ77yM5pyf5pyb5Yqg6L295a6M5oiQ6LWE5rqQ5ZCO5YaN5oGi5aSN6Zif5YiX55qE5aSE55CGXG4gICAgICAgIC8vdGhpcy5yZXN1bWVNZXNzYWdlUXVldWUoKTtcbiAgICAgICAgc3VwZXIuY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pyN5Yqh5Zmo5Li75Yqo5LiL5Y+RXG4gICAgICovXG4gICAgb25seVNlcnZlclNlbmRNc2cobXNnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+WkhOeQhmxvYWRpbmfnlYzpnaJcbiAgICBwcml2YXRlIF9zZW5kTG9hZGluZ0hhcnQ6IE1hcDxzdHJpbmcsIE5vZGVKUy5UaW1lb3V0PiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIF9Mb2FkaW5nVGltZSA9IDEwMDAwO1xuICAgIC8vIHByaXZhdGUgc3RhcnRMb2FkaW5nTXNnSURNYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBzdGFydExvYWRpbmdNc2dJRE1hcCA9IHtcbiAgICAgICAgXCIzMDAyXzEwMDJcIjogXCIzMDAyXzEwMDNcIiwgXCIzMDAxXzEwMDAxXCI6IFwiMzAwMV8xMDAwMVwiLCBcIjMwMTJfMTAwMlwiOiBcIjMwMTJfMTAwM1wiLCBcIjMwMDRfMTAwMlwiOiBcIjMwMDRfMTAwM1wiXG4gICAgICAgICwgXCIzMDE1XzEwMDJcIjogXCIzMDE1XzEwMDNcIiwgXCIzMDE2XzEwMDFcIjogXCIzMDE2XzEwMDJcIiwgXCIzMDE4XzEwMDNcIjogXCIzMDE4XzEwMDRcIiwgXCIzMDIwXzEwMDAxXCI6IFwiMzAyMF8xMDAwMVwiXG4gICAgfTtcbiAgICBwcml2YXRlIHN0YXJ0U2VuZExvYWRpbmdIYXJ0KG1haW5DbWQpIHtcbiAgICAgICAgbGV0IGtleSA9IG1haW5DbWQ7XG4gICAgICAgIC8v5Yik5patIGtleeaYr+WQpuWcqHN0YXJ0TG9hZGluZ01zZ0lETWFw5LitXG4gICAgICAgIGlmICh0aGlzLmlzS2V5KGtleSkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIHRoaXMuX3NlbmRMb2FkaW5nSGFydFwiLCB0aGlzLl9zZW5kTG9hZGluZ0hhcnQsIGtleSk7XG4gICAgICAgICAgICB0aGlzLnN0b3BTZW5kTG9hZGluZ0hhcnQoa2V5LCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRMb2FkaW5nSGFydFtrZXldID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFNlbmRMb2FkaW5nSGFydChrZXksIG51bGwpO1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgfSwgdGhpcy5fTG9hZGluZ1RpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleShrZXkpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHRoaXMuc3RhcnRMb2FkaW5nTXNnSURNYXApIHtcbiAgICAgICAgICAgIGlmIChrID09IGtleSkgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZhbHVlKHZhbHVlKTogc3RyaW5nIHtcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHRoaXMuc3RhcnRMb2FkaW5nTXNnSURNYXApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0TG9hZGluZ01zZ0lETWFwW2tdID09IHZhbHVlKSByZXR1cm4gaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcHVibGljIHN0b3BTZW5kTG9hZGluZ0hhcnQoa2V5ID0gbnVsbCwgdmFsdWUgPSBudWxsKSB7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCAmJiB2YWx1ZSA9PSBudWxsKSB7Ly9zb2NrZXTlhbPpl63kuoYg5riF5o6J5omA5pyJ55qE5a6a5pe25ZmoXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGsgaW4gdGhpcy5fc2VuZExvYWRpbmdIYXJ0KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zZW5kTG9hZGluZ0hhcnRba10pO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zZW5kTG9hZGluZ0hhcnRba107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zZW5kTG9hZGluZ0hhcnQuY2xlYXIoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkpIHsvL+agueaNrktleea4heeQhlxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX3NlbmRMb2FkaW5nSGFydCkubGVuZ3RoICE9IDAgJiYgdGhpcy5fc2VuZExvYWRpbmdIYXJ0W2tleV0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3NlbmRMb2FkaW5nSGFydFtrZXldKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fc2VuZExvYWRpbmdIYXJ0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7Ly/moLnmja52dWx1ZeaJvuWIsEtleea4heeQhlxuICAgICAgICAgICAgbGV0IGsgPSB0aGlzLmlzVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGspIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fc2VuZExvYWRpbmdIYXJ0KS5sZW5ndGggIT0gMCAmJiB0aGlzLl9zZW5kTG9hZGluZ0hhcnRba10pIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zZW5kTG9hZGluZ0hhcnRba10pO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fc2VuZExvYWRpbmdIYXJ0W2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==