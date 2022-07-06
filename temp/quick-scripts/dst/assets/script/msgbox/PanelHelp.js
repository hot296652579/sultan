
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/msgbox/PanelHelp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1bbffImQ9hMeaZDukOk8eKN', 'PanelHelp');
// script/msgbox/PanelHelp.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AgentPot_1 = __importDefault(require("../agentPot/AgentPot"));
const Config_1 = require("../common/config/Config");
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const Loading_1 = __importDefault(require("../loading/Loading"));
const DisconnectWait_1 = __importDefault(require("../wait/DisconnectWait"));
const ConfirmBox_1 = __importDefault(require("./ConfirmBox"));
const LabelTip_1 = __importDefault(require("./LabelTip"));
class PanelHelp {
    /**
    * @description 文本提示
    * @param str 提示内容
    */
    static showTip(str, delayTime = 0.5) {
        this.hideLoading();
        Manager_1.Manager.uiManager.open({ type: LabelTip_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: Config_1.ViewZOrder.Toast, args: [str, delayTime] });
    }
    /**
     * 显示错误提示
     * @param code {number} 错误码
     */
    static showErrTip(code) {
        Manager_1.Manager.uiManager.open({ type: LabelTip_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: Config_1.ViewZOrder.Toast, args: [`i18n.ErrCode.${code}`] });
    }
    /**
     * @param title 标题
     * @param content 内容
     * @param next 确定后的回调
     * @param confirm_label 确定按钮Label
     * @param showclose 显示关闭按钮
     */
    static showMsgBox(title, content, next, confirm_label, showclose = true, autoclose = true) {
        this.hideLoading();
        let data = { title: title, content: content, next: next, confirm_label: confirm_label, isSingle: true, showclose: showclose, autoclose: autoclose, showicon: false };
        Manager_1.Manager.uiManager.open({ type: ConfirmBox_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: Config_1.ViewZOrder.Alert, args: [data] });
    }
    /**
    * @param title 标题
    * @param content 内容
    * @param next 确定后的回调
    * @param confirm_label 确定按钮Label
    * @param showclose 显示关闭按钮
    */
    static showMsgBoxIcon(title, content, next, confirm_label, showclose = true, autoclose = true) {
        this.hideLoading();
        let data = { title: title, content: content, next: next, confirm_label: confirm_label, isSingle: true, showclose: showclose, autoclose: autoclose, showicon: true };
        Manager_1.Manager.uiManager.open({ type: ConfirmBox_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: Config_1.ViewZOrder.Alert, args: [data] });
    }
    /**
     *
     * @param title 标题
     * @param content 内容
     * @param next 确定后的回调
     * @param cancel 取消后的回调
     * @param cancel_label 取消按钮
     * @param confirm_label 确认按钮
     * @param showclose 显示关闭按钮
     */
    static showDialog(title, content, next, cancel, cancel_label, confirm_label, showclose = true, autoclose = true) {
        this.hideLoading();
        let data = {
            title: title, content: content, next: next, cancel: cancel,
            cancel_label: cancel_label, confirm_label: confirm_label, isSingle: false, showclose: showclose,
            autoclose: autoclose, showicon: false
        };
        Manager_1.Manager.uiManager.open({ type: ConfirmBox_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: Config_1.ViewZOrder.Alert, args: [data] });
    }
    /**
     * loading 提示信息
     * @param content
     * @param outTime
     */
    static showLoading(content, showLoading = false, outTime = 180000) {
        return Manager_1.Manager.uiManager.open({ type: Loading_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: Config_1.ViewZOrder.Loading, args: [content, outTime, showLoading] });
    }
    static hideLoading() {
        Manager_1.Manager.uiManager.close('Loading');
    }
    /**
     *
     * @param _timeoutCallBack //超时回调
     */
    static showDisconnectWait(_timeoutCallBack) {
        let content = Manager_1.Manager.makeLanguage("WAIT.DISCONNECT");
        Manager_1.Manager.uiManager.open({ type: DisconnectWait_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: Config_1.ViewZOrder.Loading, args: [content, _timeoutCallBack] });
    }
    static hideDisconnectWait() {
        Manager_1.Manager.uiManager.close(DisconnectWait_1.default);
    }
    /**
     * 添加 滚动 跑马灯
     * @param parent 父节点
     * @param UIView parent 对应的  UIView
     *
     */
    static showRollNotice(parent, UIView) {
        if (parent) {
            // cc.createPrefab({url :"common/prefabs/RollNotice",view:UIView,bundle:BUNDLE_RESOURCES,completeCallback:(node)=>{
            //     if ( node ){
            //         node.parent = parent;   
            //     }
            //  }});
            let bundle = cc.assetManager.getBundle(Defines_1.BUNDLE_RESOURCES);
            bundle.load(`common/prefabs/RollNotice`, cc.Prefab, function (err, prefab) {
                let node = cc.instantiate(prefab);
                node.parent = parent;
            });
        }
    }
    /**
     * 添加 代理保证金展示
     * @param parent
     * @param value {number} 保证金
     */
    static showAgentPot(parent, value) {
        if (parent) {
            let bundle = cc.assetManager.getBundle(Defines_1.BUNDLE_RESOURCES);
            bundle.load(`common/prefabs/AgentPot`, cc.Prefab, function (err, prefab) {
                let node = cc.instantiate(prefab);
                node.parent = parent;
                let src = node.getComponent(AgentPot_1.default);
                src.setData(value);
            });
        }
    }
}
exports.default = PanelHelp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbXNnYm94L1BhbmVsSGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUM1QyxvREFBcUQ7QUFDckQsdURBQW9EO0FBQ3BELHVEQUE2RDtBQUM3RCxpRUFBeUM7QUFDekMsNEVBQW9EO0FBQ3BELDhEQUFzQztBQUN0QywwREFBa0M7QUFFbEMsTUFBcUIsU0FBUztJQUUxQjs7O01BR0U7SUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLEdBQUcsR0FBRztRQUMvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbEIsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFRLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDMUIsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFRLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkksQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFLLEVBQUUsYUFBYyxFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFHLElBQUk7UUFDdkYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLElBQUksSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtB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QXlCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEdBQUcsRUFBRSxNQUFpQjtnQkFDOUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO2dCQUNoRCxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBRUo7QUE5SEQsNEJBOEhDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFnZW50UG90IGZyb20gXCIuLi9hZ2VudFBvdC9BZ2VudFBvdFwiO1xuaW1wb3J0IHsgVmlld1pPcmRlciB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuLi9sb2FkaW5nL0xvYWRpbmdcIjtcbmltcG9ydCBEaXNjb25uZWN0V2FpdCBmcm9tIFwiLi4vd2FpdC9EaXNjb25uZWN0V2FpdFwiO1xuaW1wb3J0IENvbmZpcm1Cb3ggZnJvbSBcIi4vQ29uZmlybUJveFwiO1xuaW1wb3J0IExhYmVsVGlwIGZyb20gXCIuL0xhYmVsVGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsSGVscCB7XG5cbiAgICAvKipcbiAgICAqIEBkZXNjcmlwdGlvbiDmlofmnKzmj5DnpLpcbiAgICAqIEBwYXJhbSBzdHIg5o+Q56S65YaF5a65XG4gICAgKi9cbiAgICBzdGF0aWMgc2hvd1RpcChzdHIsIGRlbGF5VGltZSA9IDAuNSkge1xuICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKClcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IExhYmVsVGlwLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIHpJbmRleDogVmlld1pPcmRlci5Ub2FzdCwgYXJnczogW3N0ciwgZGVsYXlUaW1lXSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrplJnor6/mj5DnpLpcbiAgICAgKiBAcGFyYW0gY29kZSB7bnVtYmVyfSDplJnor6/noIFcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd0VyclRpcChjb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IExhYmVsVGlwLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIHpJbmRleDogVmlld1pPcmRlci5Ub2FzdCwgYXJnczogW2BpMThuLkVyckNvZGUuJHtjb2RlfWBdIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0aXRsZSDmoIfpophcbiAgICAgKiBAcGFyYW0gY29udGVudCDlhoXlrrlcbiAgICAgKiBAcGFyYW0gbmV4dCDnoa7lrprlkI7nmoTlm57osINcbiAgICAgKiBAcGFyYW0gY29uZmlybV9sYWJlbCDnoa7lrprmjInpkq5MYWJlbFxuICAgICAqIEBwYXJhbSBzaG93Y2xvc2Ug5pi+56S65YWz6Zet5oyJ6ZKuXG4gICAgICovXG4gICAgc3RhdGljIHNob3dNc2dCb3godGl0bGUsIGNvbnRlbnQsIG5leHQ/LCBjb25maXJtX2xhYmVsPywgc2hvd2Nsb3NlID0gdHJ1ZSwgYXV0b2Nsb3NlID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKClcbiAgICAgICAgbGV0IGRhdGEgPSB7IHRpdGxlOiB0aXRsZSwgY29udGVudDogY29udGVudCwgbmV4dDogbmV4dCwgY29uZmlybV9sYWJlbDogY29uZmlybV9sYWJlbCwgaXNTaW5nbGU6IHRydWUsIHNob3djbG9zZTogc2hvd2Nsb3NlLCBhdXRvY2xvc2U6IGF1dG9jbG9zZSwgc2hvd2ljb246IGZhbHNlIH07XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBDb25maXJtQm94LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIHpJbmRleDogVmlld1pPcmRlci5BbGVydCwgYXJnczogW2RhdGFdIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBwYXJhbSB0aXRsZSDmoIfpophcbiAgICAqIEBwYXJhbSBjb250ZW50IOWGheWuuVxuICAgICogQHBhcmFtIG5leHQg56Gu5a6a5ZCO55qE5Zue6LCDXG4gICAgKiBAcGFyYW0gY29uZmlybV9sYWJlbCDnoa7lrprmjInpkq5MYWJlbFxuICAgICogQHBhcmFtIHNob3djbG9zZSDmmL7npLrlhbPpl63mjInpkq5cbiAgICAqL1xuICAgIHN0YXRpYyBzaG93TXNnQm94SWNvbih0aXRsZSwgY29udGVudCwgbmV4dD8sIGNvbmZpcm1fbGFiZWw/LCBzaG93Y2xvc2UgPSB0cnVlLCBhdXRvY2xvc2UgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKVxuICAgICAgICBsZXQgZGF0YSA9IHsgdGl0bGU6IHRpdGxlLCBjb250ZW50OiBjb250ZW50LCBuZXh0OiBuZXh0LCBjb25maXJtX2xhYmVsOiBjb25maXJtX2xhYmVsLCBpc1NpbmdsZTogdHJ1ZSwgc2hvd2Nsb3NlOiBzaG93Y2xvc2UsIGF1dG9jbG9zZTogYXV0b2Nsb3NlLCBzaG93aWNvbjogdHJ1ZSB9O1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQ29uZmlybUJveCwgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCB6SW5kZXg6IFZpZXdaT3JkZXIuQWxlcnQsIGFyZ3M6IFtkYXRhXSB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHRpdGxlIOagh+mimFxuICAgICAqIEBwYXJhbSBjb250ZW50IOWGheWuuVxuICAgICAqIEBwYXJhbSBuZXh0IOehruWumuWQjueahOWbnuiwg1xuICAgICAqIEBwYXJhbSBjYW5jZWwg5Y+W5raI5ZCO55qE5Zue6LCDXG4gICAgICogQHBhcmFtIGNhbmNlbF9sYWJlbCDlj5bmtojmjInpkq5cbiAgICAgKiBAcGFyYW0gY29uZmlybV9sYWJlbCDnoa7orqTmjInpkq5cbiAgICAgKiBAcGFyYW0gc2hvd2Nsb3NlIOaYvuekuuWFs+mXreaMiemSrlxuICAgICAqL1xuICAgIHN0YXRpYyBzaG93RGlhbG9nKHRpdGxlLCBjb250ZW50LCBuZXh0PywgY2FuY2VsPywgY2FuY2VsX2xhYmVsPywgY29uZmlybV9sYWJlbD8sIHNob3djbG9zZSA9IHRydWUsIGF1dG9jbG9zZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLCBjb250ZW50OiBjb250ZW50LCBuZXh0OiBuZXh0LCBjYW5jZWw6IGNhbmNlbCxcbiAgICAgICAgICAgIGNhbmNlbF9sYWJlbDogY2FuY2VsX2xhYmVsLCBjb25maXJtX2xhYmVsOiBjb25maXJtX2xhYmVsLCBpc1NpbmdsZTogZmFsc2UsIHNob3djbG9zZTogc2hvd2Nsb3NlXG4gICAgICAgICAgICAsIGF1dG9jbG9zZTogYXV0b2Nsb3NlLCBzaG93aWNvbjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IENvbmZpcm1Cb3gsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgekluZGV4OiBWaWV3Wk9yZGVyLkFsZXJ0LCBhcmdzOiBbZGF0YV0gfSk7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogbG9hZGluZyDmj5DnpLrkv6Hmga9cbiAgICAgKiBAcGFyYW0gY29udGVudCBcbiAgICAgKiBAcGFyYW0gb3V0VGltZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd0xvYWRpbmcoY29udGVudCwgc2hvd0xvYWRpbmcgPSBmYWxzZSwgb3V0VGltZSA9IDE4MDAwMCkge1xuICAgICAgICByZXR1cm4gTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IExvYWRpbmcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgekluZGV4OiBWaWV3Wk9yZGVyLkxvYWRpbmcsIGFyZ3M6IFtjb250ZW50LCBvdXRUaW1lLCBzaG93TG9hZGluZ10gfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGVMb2FkaW5nKCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5jbG9zZSgnTG9hZGluZycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBcbiAgICAgKiBAcGFyYW0gX3RpbWVvdXRDYWxsQmFjayAvL+i2heaXtuWbnuiwg1xuICAgICAqL1xuICAgIHN0YXRpYyBzaG93RGlzY29ubmVjdFdhaXQoX3RpbWVvdXRDYWxsQmFjaykge1xuICAgICAgICBsZXQgY29udGVudCA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiV0FJVC5ESVNDT05ORUNUXCIpO1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogRGlzY29ubmVjdFdhaXQsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgekluZGV4OiBWaWV3Wk9yZGVyLkxvYWRpbmcsIGFyZ3M6IFtjb250ZW50LCBfdGltZW91dENhbGxCYWNrXSB9KTtcbiAgICB9XG4gICAgc3RhdGljIGhpZGVEaXNjb25uZWN0V2FpdCgpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIuY2xvc2UoRGlzY29ubmVjdFdhaXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmt7vliqAg5rua5YqoIOi3kemprOeBr1xuICAgICAqIEBwYXJhbSBwYXJlbnQg54i26IqC54K5XG4gICAgICogQHBhcmFtIFVJVmlldyBwYXJlbnQg5a+55bqU55qEICBVSVZpZXdcbiAgICAgKiBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd1JvbGxOb3RpY2UocGFyZW50LCBVSVZpZXcpIHtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgLy8gY2MuY3JlYXRlUHJlZmFiKHt1cmwgOlwiY29tbW9uL3ByZWZhYnMvUm9sbE5vdGljZVwiLHZpZXc6VUlWaWV3LGJ1bmRsZTpCVU5ETEVfUkVTT1VSQ0VTLGNvbXBsZXRlQ2FsbGJhY2s6KG5vZGUpPT57XG4gICAgICAgICAgICAvLyAgICAgaWYgKCBub2RlICl7XG4gICAgICAgICAgICAvLyAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50OyAgIFxuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vICB9fSk7XG5cbiAgICAgICAgICAgIGxldCBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKEJVTkRMRV9SRVNPVVJDRVMpXG4gICAgICAgICAgICBidW5kbGUubG9hZChgY29tbW9uL3ByZWZhYnMvUm9sbE5vdGljZWAsIGNjLlByZWZhYiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiOiBjYy5QcmVmYWIpIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoCDku6PnkIbkv53or4Hph5HlsZXnpLpcbiAgICAgKiBAcGFyYW0gcGFyZW50IFxuICAgICAqIEBwYXJhbSB2YWx1ZSB7bnVtYmVyfSDkv53or4Hph5FcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd0FnZW50UG90KHBhcmVudCwgdmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBsZXQgYnVuZGxlID0gY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZShCVU5ETEVfUkVTT1VSQ0VTKVxuICAgICAgICAgICAgYnVuZGxlLmxvYWQoYGNvbW1vbi9wcmVmYWJzL0FnZW50UG90YCwgY2MuUHJlZmFiLCBmdW5jdGlvbiAoZXJyLCBwcmVmYWI6IGNjLlByZWZhYikge1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgICAgICBsZXQgc3JjOiBBZ2VudFBvdCA9IG5vZGUuZ2V0Q29tcG9uZW50KEFnZW50UG90KTtcbiAgICAgICAgICAgICAgICBzcmMuc2V0RGF0YSh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19