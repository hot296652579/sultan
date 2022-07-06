
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/net/LobbyService.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL25ldC9Mb2JieVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHOzs7Ozs7QUFFSCxnREFBa0Q7QUFDbEQsdUVBQStDO0FBRS9DLGdEQUE2QztBQUM3QyxtREFBZ0Q7QUFHaEQsTUFBYSxZQUFhLFNBQVEsNkJBQWE7SUFBL0M7O1FBQ1ksdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBSXBDLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBd0UzQyxDQUFDO0lBM0VVLE1BQU0sS0FBSyxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBS2hHOztPQUVHO0lBQ0gsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNkLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMxQixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLG9CQUFXLEVBQUUsQ0FBQTtnQkFDakIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ1g7U0FFSjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxFQUFTO1FBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNqQixJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDbkMsbUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QixtQkFBUyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzFDO0lBQ0wsQ0FBQztJQUNPLDBCQUEwQjtRQUM5QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFTywyQkFBMkI7UUFDL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMzQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNEOztPQUVHO0lBQ0ssY0FBYztRQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUNEOztPQUVHO0lBQ08sbUJBQW1CO1FBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDL0IsbUJBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQy9CLG1CQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxpQkFBTyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEdBQUcsRUFBRTtZQUN6RSxpQkFBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QyxvQkFBVyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxFQUFFLGlCQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDSjtBQTdFRCxvQ0E2RUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXNjcmlwdGlvbiDlpKfljoXov57mjqXmnI3liqFcbiAqL1xuXG5pbXBvcnQgeyByZVN0YXJ0R2FtZSB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2xvYmFsXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBMb2dpY0V2ZW50IH0gZnJvbSBcIi4uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb21tb25TZXJ2aWNlIH0gZnJvbSBcIi4vQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcblxuZXhwb3J0IGNsYXNzIExvYmJ5U2VydmljZSBleHRlbmRzIENvbW1vblNlcnZpY2Uge1xuICAgIHByaXZhdGUgX2Rpc2Nvbm5lY3RUaW1lT3V0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgTG9iYnlTZXJ2aWNlKCkpOyB9XG4gICAgcHJpdmF0ZSBfZGlzY29ubmVjdE51bTogbnVtYmVyO1xuICAgIHByaXZhdGUgX3NlbmREaXNDb25uZWN0SWQ6IE5vZGVKUy5UaW1lb3V0O1xuICAgIHByaXZhdGUgX2lzZGlzQ29ubmVjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICog572R57uc5omT5byAXG4gICAgICovXG4gICAgb25PcGVuKCkge1xuICAgICAgICBzdXBlci5vbk9wZW4oKVxuICAgICAgICBpZiAodGhpcy5faXNkaXNDb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNjb25uZWN0TnVtID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2lzZGlzQ29ubmVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdG9wU2VuZERpc0Nvbm5lY3RTY2hlZHVsZSgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNjb25uZWN0VGltZU91dCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZVN0YXJ0R2FtZSgpXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog572R57uc5YWz6ZetXG4gICAgICovXG4gICAgb25DbG9zZShldjogRXZlbnQpIHtcbiAgICAgICAgc3VwZXIub25DbG9zZShldilcbiAgICAgICAgaWYgKGV2LnR5cGUgIT0gJ0N1c3RvbUNsb3NlJyAmJiAhdGhpcy5faXNkaXNDb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNjb25uZWN0TnVtID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2lzZGlzQ29ubmVjdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0b3BTZW5kRGlzQ29ubmVjdFNjaGVkdWxlKCk7XG4gICAgICAgICAgICB0aGlzLnNlbmREaXNDb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VuZERpc0Nvbm5lY3RTY2hlZHVsZSgpO1xuICAgICAgICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0Rpc2Nvbm5lY3RXYWl0KCgpID0+IHsgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHN0b3BTZW5kRGlzQ29ubmVjdFNjaGVkdWxlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VuZERpc0Nvbm5lY3RJZCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zZW5kRGlzQ29ubmVjdElkKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbmREaXNDb25uZWN0SWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGFydFNlbmREaXNDb25uZWN0U2NoZWR1bGUoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fc2VuZERpc0Nvbm5lY3RJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuX2Rpc2Nvbm5lY3ROdW0gPSBzZWxmLl9kaXNjb25uZWN0TnVtICsgMTtcbiAgICAgICAgICAgIGlmIChzZWxmLl9kaXNjb25uZWN0TnVtID4gMykge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RvcFNlbmREaXNDb25uZWN0U2NoZWR1bGUoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRGlzQ29ubmVjdFRpbWVPdXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnNlbmREaXNDb25uZWN0KCk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlvIDlp4vph43ov55cbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbmREaXNDb25uZWN0KCkge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDph43ov57otoXml7ZcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25EaXNDb25uZWN0VGltZU91dCgpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCfph43ov57otoXml7YnKTtcbiAgICAgICAgdGhpcy5fZGlzY29ubmVjdFRpbWVPdXQgPSB0cnVlO1xuICAgICAgICBQYW5lbEhlbHAuaGlkZURpc2Nvbm5lY3RXYWl0KCk7XG4gICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KG51bGwsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLkUyMDAxMDAwMVwiKSwgKCkgPT4ge1xuICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2UuY2xlYW5Mb2dpbkNhY2hlKCk7XG4gICAgICAgICAgICByZVN0YXJ0R2FtZSgpO1xuICAgICAgICB9LCBNYW5hZ2VyLmdldExhbmd1YWdlKFwiVElQUy5SRVRSWVwiKSwgZmFsc2UpO1xuICAgIH1cbn1cblxuIl19