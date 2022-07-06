import PanelHelp from "./PanelHelp";
import { WebPopUpTipTool } from "./WebPopUpToolTip";
import { NativePopUpToolTip } from "./NativePopUpToolTip";


class _PanelHelpSwitch {
    // 需要切换的方法 
    default_ShowTip = null;
    default_showDialog = null;
    default_showMsgBox = null;
    default_ShowLoading = null;
    default_hideLoading = null;
    default_showDisconnectWait = null;
    default_hideDisconnectWait = null;

    platform_tipTool = null;
    constructor() {
        this.default_ShowTip = PanelHelp.showTip.bind(PanelHelp)
        this.default_showDialog = PanelHelp.showDialog.bind(PanelHelp)
        this.default_showMsgBox = PanelHelp.showMsgBox.bind(PanelHelp)
        this.default_ShowLoading = PanelHelp.showLoading.bind(PanelHelp)
        this.default_hideLoading = PanelHelp.hideLoading.bind(PanelHelp)
        this.default_showDisconnectWait = PanelHelp.showDisconnectWait.bind(PanelHelp)
        this.default_hideDisconnectWait = PanelHelp.hideDisconnectWait.bind(PanelHelp)

        this.platform_tipTool = cc.sys.isBrowser ? WebPopUpTipTool : NativePopUpToolTip;
    }
    init(that) {
        this.platform_tipTool.init(that);
    }
    // 更具平台切换弹窗方式
    switchByPlatform() {
        if (cc.sys.isBrowser) return
        PanelHelp.showTip = this.platform_tipTool.showTip.bind(this.platform_tipTool)
        PanelHelp.showMsgBox = this.platform_tipTool.showMsgBox.bind(this.platform_tipTool)
        PanelHelp.showDialog = this.platform_tipTool.showDialog.bind(this.platform_tipTool)
        PanelHelp.showLoading = this.platform_tipTool.showLoading.bind(this.platform_tipTool)
        PanelHelp.hideLoading = this.platform_tipTool.hideLoading.bind(this.platform_tipTool)
        PanelHelp.showDisconnectWait = this.platform_tipTool.showDisconnectWait.bind(this.platform_tipTool)
        PanelHelp.hideDisconnectWait = this.platform_tipTool.hideDisconnectWait.bind(this.platform_tipTool)
    }
    // 恢复到默认的
    receiveDefault() {
        if (cc.sys.isBrowser) return
        PanelHelp.showTip = this.default_ShowTip;
        PanelHelp.showMsgBox = this.default_showMsgBox;
        PanelHelp.showDialog = this.default_showDialog;
        PanelHelp.showLoading = this.default_ShowLoading;
        PanelHelp.hideLoading = this.default_hideLoading;
        PanelHelp.showDisconnectWait = this.default_showDisconnectWait;
        PanelHelp.hideDisconnectWait = this.default_hideDisconnectWait;

    }
}

export const PanelHelpSwitch = new _PanelHelpSwitch();
