
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/msgbox/NativePopUpToolTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbXNnYm94L05hdGl2ZVBvcFVwVG9vbFRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBdUQ7QUFDdkQsdURBQW9EO0FBQ3BELHVEQUEwRDtBQUUxRCxNQUFNLDJCQUEyQixHQUFHLCtCQUErQixDQUFBO0FBQ25FLE1BQU0sbUJBQW1CO0lBQ3JCO1FBT0EsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZUFBVSxHQUFHLElBQUksQ0FBQztRQVBkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkUsQ0FBQztJQUNELElBQUk7SUFFSixDQUFDO0lBR0QsZUFBZSxDQUFDLFNBQVM7UUFDckIsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQ3pELElBQUksSUFBSTtZQUFFLElBQUksRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDRCxtQkFBbUI7UUFDZixRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELE9BQU8sQ0FBQyxNQUFNO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtTQUNsRDthQUFNLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFB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QyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxPQUFPLENBQUE7SUFDbEIsQ0FBQztDQUNKO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgVVNJTkdfTEFOX0tFWSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5cbmNvbnN0IE5hdGl2ZVBvcFVwVG9vbFRpcENsYXNzTmFtZSA9IFwiY29tL1BvcFVwVGlwVG9vbC9Qb3BVcFRpcFRvb2xcIlxuY2xhc3MgX05hdGl2ZVBvcFVwVG9vbFRpcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHdpbmRvd1tcIm9uUG9wU2VsZWN0Q2FsbFwiXSA9IHRoaXMub25Qb3BTZWxlY3RDYWxsLmJpbmQodGhpcylcbiAgICAgICAgd2luZG93W1wib25TZXJ2ZXJPdXRUaW1lQ2FsbFwiXSA9IHRoaXMub25TZXJ2ZXJPdXRUaW1lQ2FsbC5iaW5kKHRoaXMpXG4gICAgfVxuICAgIGluaXQoKSB7XG5cbiAgICB9XG4gICAgY29uZmlybUNhbGwgPSBudWxsO1xuICAgIGNhbmNsZUNhbGwgPSBudWxsO1xuICAgIG9uUG9wU2VsZWN0Q2FsbChpc0NvbmZpcm0pIHtcbiAgICAgICAgbGV0IGNhbGwgPSBpc0NvbmZpcm0gPyB0aGlzLmNvbmZpcm1DYWxsIDogdGhpcy5jYW5jbGVDYWxsXG4gICAgICAgIGlmIChjYWxsKSBjYWxsKCk7XG4gICAgICAgIHRoaXMuY29uZmlybUNhbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmNhbmNsZUNhbGwgPSBudWxsO1xuICAgIH1cbiAgICBvblNlcnZlck91dFRpbWVDYWxsKCkge1xuICAgICAgICBkaXNwYXRjaChcInNlcnZlck91dFRpbWVcIik7XG4gICAgfVxuICAgIHNob3dUaXAoc3RyaW5nKSB7XG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYgY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYgY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKE5hdGl2ZVBvcFVwVG9vbFRpcENsYXNzTmFtZSwgXCJzaG93VG9hc2tcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dEaWFsb2codGl0bGUsIGNvbnRlbnQsIG5leHQ/LCBjYW5jZWw/LCBjYW5jbGVUZXh0PywgY29ubWZpcm1UZXh0Pywgc2hvd2Nsb3NlID0gdHJ1ZSwgYXV0b2Nsb3NlID0gdHJ1ZSkge1xuICAgICAgICB0aXRsZSA9IHRoaXMuY2hhY2tMYW5ndWFnZVN0cih0aXRsZSk7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLmNoYWNrTGFuZ3VhZ2VTdHIoY29udGVudCk7XG4gICAgICAgIGNhbmNsZVRleHQgPSB0aGlzLmNoYWNrTGFuZ3VhZ2VTdHIoY2FuY2xlVGV4dCk7XG4gICAgICAgIGNvbm1maXJtVGV4dCA9IHRoaXMuY2hhY2tMYW5ndWFnZVN0cihjb25tZmlybVRleHQpO1xuXG4gICAgICAgIGlmICh0aXRsZSA9PSAnJykge1xuICAgICAgICAgICAgdGl0bGUgPSBpMThuLk1TR19CT1gudGlwcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbm1maXJtVGV4dCkge1xuICAgICAgICAgICAgY29ubWZpcm1UZXh0ID0gaTE4bi5NU0dfQk9YLkNvbmZpcm07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5jbGVUZXh0KSB7XG4gICAgICAgICAgICBjYW5jbGVUZXh0ID0gaTE4bi5NU0dfQk9YLkNhbmNlbDtcbiAgICAgICAgfSBlbHNlIGlmIChcImZhbHNlXCIgPT0gY2FuY2xlVGV4dCkge1xuICAgICAgICAgICAgY2FuY2xlVGV4dCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbmZvID0geyB0aXRsZSwgY29udGVudCwgY29ubWZpcm1UZXh0LCBjYW5jbGVUZXh0IH1cbiAgICAgICAgdGhpcy5jYW5jbGVDYWxsID0gY2FuY2xlVGV4dDtcbiAgICAgICAgdGhpcy5jb25maXJtQ2FsbCA9IG5leHQ7XG4gICAgICAgIGxldCBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpbmZvKVxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlICYmIGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLmlzTmF0aXZlICYmIGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChOYXRpdmVQb3BVcFRvb2xUaXBDbGFzc05hbWUsIFwic2hvd0RpYWxvZ1wiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dNc2dCb3godGl0bGUsIGNvbnRlbnQsIG5leHQ/LCBjb25maXJtX2xhYmVsPywgc2hvd2Nsb3NlID0gdHJ1ZSwgYXV0b2Nsb3NlID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNob3dEaWFsb2codGl0bGUsIGNvbnRlbnQsIG5leHQsIG51bGwsICdmYWxzZScsIGNvbmZpcm1fbGFiZWwpO1xuICAgIH1cbiAgICBzaG93TG9hZGluZyhjb250ZW50LCBvdXRUaW1lID0gMTAwMDApIHtcbiAgICAgICAgY29udGVudCA9IHRoaXMuY2hhY2tMYW5ndWFnZVN0cihjb250ZW50KTtcbiAgICAgICAgaWYgKGNvbnRlbnQgPT0gJycpIGNvbnRlbnQgPSBpMThuLldBSVQuTE9BRElORztcbiAgICAgICAgbGV0IGpzb25TdHIgPSBKU09OLnN0cmluZ2lmeSh7IGNvbnRlbnQsIG91dFRpbWUgfSlcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xuICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoTmF0aXZlUG9wVXBUb29sVGlwQ2xhc3NOYW1lLCBcInNob3dMb2FkaW5nXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIGpzb25TdHIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhpZGVMb2FkaW5nKCkge1xuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlICYmIGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLmlzTmF0aXZlICYmIGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChOYXRpdmVQb3BVcFRvb2xUaXBDbGFzc05hbWUsIFwiaGlkZUxvYWRpbmdcIiwgXCIoKVZcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0Rpc2Nvbm5lY3RXYWl0KCkge1xuICAgICAgICBsZXQgY29udGVudCA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiV0FJVC5ESVNDT05ORUNUXCIpO1xuICAgICAgICB0aGlzLnNob3dMb2FkaW5nKGNvbnRlbnQsIDIwMDAwKTtcbiAgICB9XG4gICAgaGlkZURpc2Nvbm5lY3RXYWl0KCkge1xuICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgfVxuICAgIC8vIOajgOa1i+aYr+S4jeaYr+WkmuivreiogOeahOWtl+espuS4slxuICAgIGNoYWNrTGFuZ3VhZ2VTdHIoY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChjb250ZW50ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29udGVudCA9ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQuc3RhcnRzV2l0aChVU0lOR19MQU5fS0VZKSkge1xuICAgICAgICAgICAgY29udGVudCA9IE1hbmFnZXIubGFuZ3VhZ2UuZ2V0KFtjb250ZW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnRcbiAgICB9XG59XG5leHBvcnQgbGV0IE5hdGl2ZVBvcFVwVG9vbFRpcCA9IG5ldyBfTmF0aXZlUG9wVXBUb29sVGlwKCkiXX0=