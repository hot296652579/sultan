"use strict";
cc._RF.push(module, '5abb7LQ4bxNvrfGFVotYrd6', 'PanelHelpSwitch');
// script/msgbox/PanelHelpSwitch.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelHelpSwitch = void 0;
const PanelHelp_1 = __importDefault(require("./PanelHelp"));
const WebPopUpToolTip_1 = require("./WebPopUpToolTip");
const NativePopUpToolTip_1 = require("./NativePopUpToolTip");
class _PanelHelpSwitch {
    constructor() {
        // 需要切换的方法 
        this.default_ShowTip = null;
        this.default_showDialog = null;
        this.default_showMsgBox = null;
        this.default_ShowLoading = null;
        this.default_hideLoading = null;
        this.default_showDisconnectWait = null;
        this.default_hideDisconnectWait = null;
        this.platform_tipTool = null;
        this.default_ShowTip = PanelHelp_1.default.showTip.bind(PanelHelp_1.default);
        this.default_showDialog = PanelHelp_1.default.showDialog.bind(PanelHelp_1.default);
        this.default_showMsgBox = PanelHelp_1.default.showMsgBox.bind(PanelHelp_1.default);
        this.default_ShowLoading = PanelHelp_1.default.showLoading.bind(PanelHelp_1.default);
        this.default_hideLoading = PanelHelp_1.default.hideLoading.bind(PanelHelp_1.default);
        this.default_showDisconnectWait = PanelHelp_1.default.showDisconnectWait.bind(PanelHelp_1.default);
        this.default_hideDisconnectWait = PanelHelp_1.default.hideDisconnectWait.bind(PanelHelp_1.default);
        this.platform_tipTool = cc.sys.isBrowser ? WebPopUpToolTip_1.WebPopUpTipTool : NativePopUpToolTip_1.NativePopUpToolTip;
    }
    init(that) {
        this.platform_tipTool.init(that);
    }
    // 更具平台切换弹窗方式
    switchByPlatform() {
        if (cc.sys.isBrowser)
            return;
        PanelHelp_1.default.showTip = this.platform_tipTool.showTip.bind(this.platform_tipTool);
        PanelHelp_1.default.showMsgBox = this.platform_tipTool.showMsgBox.bind(this.platform_tipTool);
        PanelHelp_1.default.showDialog = this.platform_tipTool.showDialog.bind(this.platform_tipTool);
        PanelHelp_1.default.showLoading = this.platform_tipTool.showLoading.bind(this.platform_tipTool);
        PanelHelp_1.default.hideLoading = this.platform_tipTool.hideLoading.bind(this.platform_tipTool);
        PanelHelp_1.default.showDisconnectWait = this.platform_tipTool.showDisconnectWait.bind(this.platform_tipTool);
        PanelHelp_1.default.hideDisconnectWait = this.platform_tipTool.hideDisconnectWait.bind(this.platform_tipTool);
    }
    // 恢复到默认的
    receiveDefault() {
        if (cc.sys.isBrowser)
            return;
        PanelHelp_1.default.showTip = this.default_ShowTip;
        PanelHelp_1.default.showMsgBox = this.default_showMsgBox;
        PanelHelp_1.default.showDialog = this.default_showDialog;
        PanelHelp_1.default.showLoading = this.default_ShowLoading;
        PanelHelp_1.default.hideLoading = this.default_hideLoading;
        PanelHelp_1.default.showDisconnectWait = this.default_showDisconnectWait;
        PanelHelp_1.default.hideDisconnectWait = this.default_hideDisconnectWait;
    }
}
exports.PanelHelpSwitch = new _PanelHelpSwitch();

cc._RF.pop();