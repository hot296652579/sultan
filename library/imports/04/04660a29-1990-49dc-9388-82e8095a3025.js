"use strict";
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