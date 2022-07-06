"use strict";
cc._RF.push(module, 'a70853uQHdFyq17JF74OVGc', 'LobbyService');
// script/common/net/LobbyService.ts

"use strict";
/**
 * @description 大厅连接服务
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyService = void 0;
const Global_1 = require("../../global/Global");
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const Manager_1 = require("../manager/Manager");
const CommonService_1 = require("./CommonService");
class LobbyService extends CommonService_1.CommonService {
    constructor() {
        super(...arguments);
        this._disconnectTimeOut = false;
        this._isdisConnect = false;
    }
    static get instance() { return this._instance || (this._instance = new LobbyService()); }
    /**
     * 网络打开
     */
    onOpen() {
        super.onOpen();
        if (this._isdisConnect) {
            this._disconnectNum = 0;
            this._isdisConnect = false;
            this.stopSendDisConnectSchedule();
            if (!this._disconnectTimeOut) {
                setTimeout(() => {
                    Global_1.reStartGame();
                }, 1000);
            }
        }
    }
    /**
     * 网络关闭
     */
    onClose(ev) {
        super.onClose(ev);
        if (ev.type != 'CustomClose' && !this._isdisConnect) {
            this._disconnectNum = 0;
            this._isdisConnect = true;
            this.stopSendDisConnectSchedule();
            this.sendDisConnect();
            this.startSendDisConnectSchedule();
            PanelHelp_1.default.hideLoading();
            PanelHelp_1.default.showDisconnectWait(() => { });
        }
    }
    stopSendDisConnectSchedule() {
        if (this._sendDisConnectId) {
            clearInterval(this._sendDisConnectId);
            this._sendDisConnectId = null;
        }
    }
    startSendDisConnectSchedule() {
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
    sendDisConnect() {
        this.disconnect();
    }
    /**
     * 重连超时
     */
    onDisConnectTimeOut() {
        G.Logger.log('重连超时');
        this._disconnectTimeOut = true;
        PanelHelp_1.default.hideDisconnectWait();
        PanelHelp_1.default.showMsgBox(null, Manager_1.Manager.makeLanguage("ERRORCODE.E20010001"), () => {
            Manager_1.Manager.localStorage.cleanLoginCache();
            Global_1.reStartGame();
        }, Manager_1.Manager.getLanguage("TIPS.RETRY"), false);
    }
}
exports.LobbyService = LobbyService;

cc._RF.pop();