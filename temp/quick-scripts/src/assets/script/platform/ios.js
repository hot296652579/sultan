"use strict";
cc._RF.push(module, '746b4Vb2Q1FH5qwHaD2UnVt', 'ios');
// script/platform/ios.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ios = void 0;
const Manager_1 = require("../common/manager/Manager");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
let AppClassName = "AppController";
class _ios {
    /** facebook 点击登录 */
    loginToFacebook(isLogin) {
    }
    /** facebook 点击分享 */
    shareToFacebook(shareType, shareUrl, imgPath) {
    }
    copyToClip(text, str) {
        G.Logger.log('ios copyToClip:', text);
        let methodName = "copyToClip:";
        jsb.reflection.callStaticMethod(AppClassName, methodName, text.toString());
        let msg = Manager_1.Manager.makeLanguage("Tips.CopySuccess");
        if (str) {
            msg = str;
        }
        return PanelHelp_1.default.showTip(msg);
    }
    /**获取设备唯一id*/
    getDeviceUUID() {
        let uuid = jsb.reflection.callStaticMethod("BGKeychainTool", "getDeviceIDInKeychain", ""); //'最安全，最稳定，最流畅的游戏平台'
        return uuid;
    }
    /**打开链接*/
    openURL(url) {
        cc.sys.openURL(url);
        // ryyl.panel.showWebView(url);
    }
    /**打开邮箱*/
    openEmail(email) {
    }
    //保存图片到本地
    saveTextureToLocal(filePath) {
    }
    //调用系统分享
    shareImageToLocal(shareUrl) {
    }
    //获取手机通讯录信息
    getAllContact() {
    }
    //获取剪切板上的信息
    getClipBoardStr() {
    }
    handleClipBoardStr() {
    }
    /**获取分享参数*/
    getRoomIdOnShare() {
        return null;
    }
    /** AF 购买事件 */
    sendBuyInfoToAF(rechargeInfo) {
    }
    isInAppSuccess(orderId) {
    }
}
exports.ios = new _ios();

cc._RF.pop();