"use strict";
cc._RF.push(module, 'a3d0d0NsdJILL+Zc+VA5F9x', 'NativePopUpToolTip');
// script/msgbox/NativePopUpToolTip.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativePopUpToolTip = void 0;
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const NativePopUpToolTipClassName = "com/PopUpTipTool/PopUpTipTool";
class _NativePopUpToolTip {
    constructor() {
        this.confirmCall = null;
        this.cancleCall = null;
        window["onPopSelectCall"] = this.onPopSelectCall.bind(this);
        window["onServerOutTimeCall"] = this.onServerOutTimeCall.bind(this);
    }
    init() {
    }
    onPopSelectCall(isConfirm) {
        let call = isConfirm ? this.confirmCall : this.cancleCall;
        if (call)
            call();
        this.confirmCall = null;
        this.cancleCall = null;
    }
    onServerOutTimeCall() {
        dispatch("serverOutTime");
    }
    showTip(string) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        }
        else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "showToask", "(Ljava/lang/String;)V", string);
        }
    }
    showDialog(title, content, next, cancel, cancleText, conmfirmText, showclose = true, autoclose = true) {
        title = this.chackLanguageStr(title);
        content = this.chackLanguageStr(content);
        cancleText = this.chackLanguageStr(cancleText);
        conmfirmText = this.chackLanguageStr(conmfirmText);
        if (title == '') {
            title = LanguageImpl_1.i18n.MSG_BOX.tips;
        }
        if (!conmfirmText) {
            conmfirmText = LanguageImpl_1.i18n.MSG_BOX.Confirm;
        }
        if (!cancleText) {
            cancleText = LanguageImpl_1.i18n.MSG_BOX.Cancel;
        }
        else if ("false" == cancleText) {
            cancleText = '';
        }
        let info = { title, content, conmfirmText, cancleText };
        this.cancleCall = cancleText;
        this.confirmCall = next;
        let string = JSON.stringify(info);
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        }
        else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "showDialog", "(Ljava/lang/String;)V", string);
        }
    }
    showMsgBox(title, content, next, confirm_label, showclose = true, autoclose = true) {
        this.showDialog(title, content, next, null, 'false', confirm_label);
    }
    showLoading(content, outTime = 10000) {
        content = this.chackLanguageStr(content);
        if (content == '')
            content = LanguageImpl_1.i18n.WAIT.LOADING;
        let jsonStr = JSON.stringify({ content, outTime });
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        }
        else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "showLoading", "(Ljava/lang/String;)V", jsonStr);
        }
    }
    hideLoading() {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        }
        else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "hideLoading", "()V");
        }
    }
    showDisconnectWait() {
        let content = Manager_1.Manager.makeLanguage("WAIT.DISCONNECT");
        this.showLoading(content, 20000);
    }
    hideDisconnectWait() {
        this.hideLoading();
    }
    // 检测是不是多语言的字符串
    chackLanguageStr(content) {
        if (content == undefined) {
            content = '';
        }
        else if (content.startsWith(Defines_1.USING_LAN_KEY)) {
            content = Manager_1.Manager.language.get([content]);
        }
        return content;
    }
}
exports.NativePopUpToolTip = new _NativePopUpToolTip();

cc._RF.pop();