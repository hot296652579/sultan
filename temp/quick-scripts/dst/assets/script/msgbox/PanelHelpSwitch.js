
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/msgbox/PanelHelpSwitch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbXNnYm94L1BhbmVsSGVscFN3aXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBb0M7QUFDcEMsdURBQW9EO0FBQ3BELDZEQUEwRDtBQUcxRCxNQUFNLGdCQUFnQjtJQVdsQjtRQVZBLFdBQVc7UUFDWCxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2Qix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQix3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IsK0JBQTBCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLCtCQUEwQixHQUFHLElBQUksQ0FBQztRQUVsQyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQVMsQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQVMsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQVMsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQVMsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQVMsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQywwQkFBMEIsR0FBRyxtQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxtQkFBUyxDQUFDLENBQUE7UUFDOUUsSUFBSSxDQUFDLDBCQUEwQixHQUFHLG1CQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLG1CQUFTLENBQUMsQ0FBQTtRQUU5RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlDQUFlLENBQUMsQ0FBQyxDQUFDLHVDQUFrQixDQUFDO0lBQ3BGLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBSTtRQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELGFBQWE7SUFDYixnQkFBZ0I7UUFDWixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUztZQUFFLE9BQU07UUFDNUIsbUJBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDN0UsbUJBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbkYsbUJBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbkYsbUJBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDckYsbUJBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDckYsbUJBQVMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ25HLG1CQUFTLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN2RyxDQUFDO0lBQ0QsU0FBUztJQUNULGNBQWM7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUztZQUFFLE9BQU07UUFDNUIsbUJBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN6QyxtQkFBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDL0MsbUJBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQy9DLG1CQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNqRCxtQkFBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDakQsbUJBQVMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUM7UUFDL0QsbUJBQVMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUM7SUFFbkUsQ0FBQztDQUNKO0FBRVksUUFBQSxlQUFlLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IFdlYlBvcFVwVGlwVG9vbCB9IGZyb20gXCIuL1dlYlBvcFVwVG9vbFRpcFwiO1xuaW1wb3J0IHsgTmF0aXZlUG9wVXBUb29sVGlwIH0gZnJvbSBcIi4vTmF0aXZlUG9wVXBUb29sVGlwXCI7XG5cblxuY2xhc3MgX1BhbmVsSGVscFN3aXRjaCB7XG4gICAgLy8g6ZyA6KaB5YiH5o2i55qE5pa55rOVIFxuICAgIGRlZmF1bHRfU2hvd1RpcCA9IG51bGw7XG4gICAgZGVmYXVsdF9zaG93RGlhbG9nID0gbnVsbDtcbiAgICBkZWZhdWx0X3Nob3dNc2dCb3ggPSBudWxsO1xuICAgIGRlZmF1bHRfU2hvd0xvYWRpbmcgPSBudWxsO1xuICAgIGRlZmF1bHRfaGlkZUxvYWRpbmcgPSBudWxsO1xuICAgIGRlZmF1bHRfc2hvd0Rpc2Nvbm5lY3RXYWl0ID0gbnVsbDtcbiAgICBkZWZhdWx0X2hpZGVEaXNjb25uZWN0V2FpdCA9IG51bGw7XG5cbiAgICBwbGF0Zm9ybV90aXBUb29sID0gbnVsbDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0X1Nob3dUaXAgPSBQYW5lbEhlbHAuc2hvd1RpcC5iaW5kKFBhbmVsSGVscClcbiAgICAgICAgdGhpcy5kZWZhdWx0X3Nob3dEaWFsb2cgPSBQYW5lbEhlbHAuc2hvd0RpYWxvZy5iaW5kKFBhbmVsSGVscClcbiAgICAgICAgdGhpcy5kZWZhdWx0X3Nob3dNc2dCb3ggPSBQYW5lbEhlbHAuc2hvd01zZ0JveC5iaW5kKFBhbmVsSGVscClcbiAgICAgICAgdGhpcy5kZWZhdWx0X1Nob3dMb2FkaW5nID0gUGFuZWxIZWxwLnNob3dMb2FkaW5nLmJpbmQoUGFuZWxIZWxwKVxuICAgICAgICB0aGlzLmRlZmF1bHRfaGlkZUxvYWRpbmcgPSBQYW5lbEhlbHAuaGlkZUxvYWRpbmcuYmluZChQYW5lbEhlbHApXG4gICAgICAgIHRoaXMuZGVmYXVsdF9zaG93RGlzY29ubmVjdFdhaXQgPSBQYW5lbEhlbHAuc2hvd0Rpc2Nvbm5lY3RXYWl0LmJpbmQoUGFuZWxIZWxwKVxuICAgICAgICB0aGlzLmRlZmF1bHRfaGlkZURpc2Nvbm5lY3RXYWl0ID0gUGFuZWxIZWxwLmhpZGVEaXNjb25uZWN0V2FpdC5iaW5kKFBhbmVsSGVscClcblxuICAgICAgICB0aGlzLnBsYXRmb3JtX3RpcFRvb2wgPSBjYy5zeXMuaXNCcm93c2VyID8gV2ViUG9wVXBUaXBUb29sIDogTmF0aXZlUG9wVXBUb29sVGlwO1xuICAgIH1cbiAgICBpbml0KHRoYXQpIHtcbiAgICAgICAgdGhpcy5wbGF0Zm9ybV90aXBUb29sLmluaXQodGhhdCk7XG4gICAgfVxuICAgIC8vIOabtOWFt+W5s+WPsOWIh+aNouW8ueeql+aWueW8j1xuICAgIHN3aXRjaEJ5UGxhdGZvcm0oKSB7XG4gICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSByZXR1cm5cbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAgPSB0aGlzLnBsYXRmb3JtX3RpcFRvb2wuc2hvd1RpcC5iaW5kKHRoaXMucGxhdGZvcm1fdGlwVG9vbClcbiAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3ggPSB0aGlzLnBsYXRmb3JtX3RpcFRvb2wuc2hvd01zZ0JveC5iaW5kKHRoaXMucGxhdGZvcm1fdGlwVG9vbClcbiAgICAgICAgUGFuZWxIZWxwLnNob3dEaWFsb2cgPSB0aGlzLnBsYXRmb3JtX3RpcFRvb2wuc2hvd0RpYWxvZy5iaW5kKHRoaXMucGxhdGZvcm1fdGlwVG9vbClcbiAgICAgICAgUGFuZWxIZWxwLnNob3dMb2FkaW5nID0gdGhpcy5wbGF0Zm9ybV90aXBUb29sLnNob3dMb2FkaW5nLmJpbmQodGhpcy5wbGF0Zm9ybV90aXBUb29sKVxuICAgICAgICBQYW5lbEhlbHAuaGlkZUxvYWRpbmcgPSB0aGlzLnBsYXRmb3JtX3RpcFRvb2wuaGlkZUxvYWRpbmcuYmluZCh0aGlzLnBsYXRmb3JtX3RpcFRvb2wpXG4gICAgICAgIFBhbmVsSGVscC5zaG93RGlzY29ubmVjdFdhaXQgPSB0aGlzLnBsYXRmb3JtX3RpcFRvb2wuc2hvd0Rpc2Nvbm5lY3RXYWl0LmJpbmQodGhpcy5wbGF0Zm9ybV90aXBUb29sKVxuICAgICAgICBQYW5lbEhlbHAuaGlkZURpc2Nvbm5lY3RXYWl0ID0gdGhpcy5wbGF0Zm9ybV90aXBUb29sLmhpZGVEaXNjb25uZWN0V2FpdC5iaW5kKHRoaXMucGxhdGZvcm1fdGlwVG9vbClcbiAgICB9XG4gICAgLy8g5oGi5aSN5Yiw6buY6K6k55qEXG4gICAgcmVjZWl2ZURlZmF1bHQoKSB7XG4gICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSByZXR1cm5cbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAgPSB0aGlzLmRlZmF1bHRfU2hvd1RpcDtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3ggPSB0aGlzLmRlZmF1bHRfc2hvd01zZ0JveDtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dEaWFsb2cgPSB0aGlzLmRlZmF1bHRfc2hvd0RpYWxvZztcbiAgICAgICAgUGFuZWxIZWxwLnNob3dMb2FkaW5nID0gdGhpcy5kZWZhdWx0X1Nob3dMb2FkaW5nO1xuICAgICAgICBQYW5lbEhlbHAuaGlkZUxvYWRpbmcgPSB0aGlzLmRlZmF1bHRfaGlkZUxvYWRpbmc7XG4gICAgICAgIFBhbmVsSGVscC5zaG93RGlzY29ubmVjdFdhaXQgPSB0aGlzLmRlZmF1bHRfc2hvd0Rpc2Nvbm5lY3RXYWl0O1xuICAgICAgICBQYW5lbEhlbHAuaGlkZURpc2Nvbm5lY3RXYWl0ID0gdGhpcy5kZWZhdWx0X2hpZGVEaXNjb25uZWN0V2FpdDtcblxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBhbmVsSGVscFN3aXRjaCA9IG5ldyBfUGFuZWxIZWxwU3dpdGNoKCk7XG4iXX0=