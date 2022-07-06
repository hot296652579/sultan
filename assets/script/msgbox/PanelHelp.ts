import AgentPot from "../agentPot/AgentPot";
import { ViewZOrder } from "../common/config/Config";
import { Manager } from "../common/manager/Manager";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import Loading from "../loading/Loading";
import DisconnectWait from "../wait/DisconnectWait";
import ConfirmBox from "./ConfirmBox";
import LabelTip from "./LabelTip";

export default class PanelHelp {

    /**
    * @description 文本提示
    * @param str 提示内容
    */
    static showTip(str, delayTime = 0.5) {
        this.hideLoading()
        Manager.uiManager.open({ type: LabelTip, bundle: BUNDLE_RESOURCES, zIndex: ViewZOrder.Toast, args: [str, delayTime] });
    }

    /**
     * 显示错误提示
     * @param code {number} 错误码
     */
    static showErrTip(code: number): void {
        Manager.uiManager.open({ type: LabelTip, bundle: BUNDLE_RESOURCES, zIndex: ViewZOrder.Toast, args: [`i18n.ErrCode.${code}`] });
    }

    /**
     * @param title 标题
     * @param content 内容
     * @param next 确定后的回调
     * @param confirm_label 确定按钮Label
     * @param showclose 显示关闭按钮
     */
    static showMsgBox(title, content, next?, confirm_label?, showclose = true, autoclose = true) {
        this.hideLoading()
        let data = { title: title, content: content, next: next, confirm_label: confirm_label, isSingle: true, showclose: showclose, autoclose: autoclose, showicon: false };
        Manager.uiManager.open({ type: ConfirmBox, bundle: BUNDLE_RESOURCES, zIndex: ViewZOrder.Alert, args: [data] });
    }
    /**
    * @param title 标题
    * @param content 内容
    * @param next 确定后的回调
    * @param confirm_label 确定按钮Label
    * @param showclose 显示关闭按钮
    */
    static showMsgBoxIcon(title, content, next?, confirm_label?, showclose = true, autoclose = true) {
        this.hideLoading()
        let data = { title: title, content: content, next: next, confirm_label: confirm_label, isSingle: true, showclose: showclose, autoclose: autoclose, showicon: true };
        Manager.uiManager.open({ type: ConfirmBox, bundle: BUNDLE_RESOURCES, zIndex: ViewZOrder.Alert, args: [data] });
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
    static showDialog(title, content, next?, cancel?, cancel_label?, confirm_label?, showclose = true, autoclose = true) {
        this.hideLoading()
        let data = {
            title: title, content: content, next: next, cancel: cancel,
            cancel_label: cancel_label, confirm_label: confirm_label, isSingle: false, showclose: showclose
            , autoclose: autoclose, showicon: false
        };
        Manager.uiManager.open({ type: ConfirmBox, bundle: BUNDLE_RESOURCES, zIndex: ViewZOrder.Alert, args: [data] });

    }
    /**
     * loading 提示信息
     * @param content 
     * @param outTime 
     */
    static showLoading(content, showLoading = false, outTime = 180000) {
        return Manager.uiManager.open({ type: Loading, bundle: BUNDLE_RESOURCES, zIndex: ViewZOrder.Loading, args: [content, outTime, showLoading] });
    }

    static hideLoading() {
        Manager.uiManager.close('Loading');
    }

    /**
     *  
     * @param _timeoutCallBack //超时回调
     */
    static showDisconnectWait(_timeoutCallBack) {
        let content = Manager.makeLanguage("WAIT.DISCONNECT");
        Manager.uiManager.open({ type: DisconnectWait, bundle: BUNDLE_RESOURCES, zIndex: ViewZOrder.Loading, args: [content, _timeoutCallBack] });
    }
    static hideDisconnectWait() {
        Manager.uiManager.close(DisconnectWait);
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

            let bundle = cc.assetManager.getBundle(BUNDLE_RESOURCES)
            bundle.load(`common/prefabs/RollNotice`, cc.Prefab, function (err, prefab: cc.Prefab) {
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
    static showAgentPot(parent, value: number) {
        if (parent) {
            let bundle = cc.assetManager.getBundle(BUNDLE_RESOURCES)
            bundle.load(`common/prefabs/AgentPot`, cc.Prefab, function (err, prefab: cc.Prefab) {
                let node = cc.instantiate(prefab);
                node.parent = parent;
                let src: AgentPot = node.getComponent(AgentPot);
                src.setData(value);
            });
        }
    }

}
