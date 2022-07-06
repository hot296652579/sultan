import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { USING_LAN_KEY } from "../framework/base/Defines";

const NativePopUpToolTipClassName = "com/PopUpTipTool/PopUpTipTool"
class _NativePopUpToolTip {
    constructor() {
        window["onPopSelectCall"] = this.onPopSelectCall.bind(this)
        window["onServerOutTimeCall"] = this.onServerOutTimeCall.bind(this)
    }
    init() {

    }
    confirmCall = null;
    cancleCall = null;
    onPopSelectCall(isConfirm) {
        let call = isConfirm ? this.confirmCall : this.cancleCall
        if (call) call();
        this.confirmCall = null;
        this.cancleCall = null;
    }
    onServerOutTimeCall() {
        dispatch("serverOutTime");
    }
    showTip(string) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "showToask", "(Ljava/lang/String;)V", string);
        }
    }

    showDialog(title, content, next?, cancel?, cancleText?, conmfirmText?, showclose = true, autoclose = true) {
        title = this.chackLanguageStr(title);
        content = this.chackLanguageStr(content);
        cancleText = this.chackLanguageStr(cancleText);
        conmfirmText = this.chackLanguageStr(conmfirmText);

        if (title == '') {
            title = i18n.MSG_BOX.tips;
        }
        if (!conmfirmText) {
            conmfirmText = i18n.MSG_BOX.Confirm;
        }
        if (!cancleText) {
            cancleText = i18n.MSG_BOX.Cancel;
        } else if ("false" == cancleText) {
            cancleText = '';
        }
        let info = { title, content, conmfirmText, cancleText }
        this.cancleCall = cancleText;
        this.confirmCall = next;
        let string = JSON.stringify(info)
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "showDialog", "(Ljava/lang/String;)V", string);
        }
    }
    showMsgBox(title, content, next?, confirm_label?, showclose = true, autoclose = true) {
        this.showDialog(title, content, next, null, 'false', confirm_label);
    }
    showLoading(content, outTime = 10000) {
        content = this.chackLanguageStr(content);
        if (content == '') content = i18n.WAIT.LOADING;
        let jsonStr = JSON.stringify({ content, outTime })
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "showLoading", "(Ljava/lang/String;)V", jsonStr);
        }
    }
    hideLoading() {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(NativePopUpToolTipClassName, "hideLoading", "()V");
        }
    }
    showDisconnectWait() {
        let content = Manager.makeLanguage("WAIT.DISCONNECT");
        this.showLoading(content, 20000);
    }
    hideDisconnectWait() {
        this.hideLoading();
    }
    // 检测是不是多语言的字符串
    chackLanguageStr(content: string) {
        if (content == undefined) {
            content = '';
        } else if (content.startsWith(USING_LAN_KEY)) {
            content = Manager.language.get([content]);
        }
        return content
    }
}
export let NativePopUpToolTip = new _NativePopUpToolTip()