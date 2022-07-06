"use strict";
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