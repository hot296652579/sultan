
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/platform/ios.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGxhdGZvcm0vaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFvRDtBQUNwRCxvRUFBNEM7QUFDNUMsSUFBSSxZQUFZLEdBQUcsZUFBZSxDQUFBO0FBQ2xDLE1BQU0sSUFBSTtJQUVOLG9CQUFvQjtJQUNwQixlQUFlLENBQUMsT0FBTztJQUV2QixDQUFDO0lBRUQsb0JBQW9CO0lBQ3BCLGVBQWUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU87SUFFNUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBSTtRQUNqQixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUM7UUFDL0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLElBQUksR0FBRyxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsSUFBSSxHQUFHLEVBQUU7WUFDTCxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2I7UUFDRCxPQUFPLG1CQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxhQUFhO0lBQ2IsYUFBYTtRQUNULElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxvQkFBb0I7UUFDaEgsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVM7SUFDVCxPQUFPLENBQUMsR0FBRztRQUNQLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLCtCQUErQjtJQUNuQyxDQUFDO0lBQ0QsU0FBUztJQUNULFNBQVMsQ0FBQyxLQUFLO0lBRWYsQ0FBQztJQUNELFNBQVM7SUFDVCxrQkFBa0IsQ0FBQyxRQUFRO0lBQzNCLENBQUM7SUFDRCxRQUFRO0lBQ1IsaUJBQWlCLENBQUMsUUFBUTtJQUMxQixDQUFDO0lBQ0QsV0FBVztJQUNYLGFBQWE7SUFFYixDQUFDO0lBQ0QsV0FBVztJQUNYLGVBQWU7SUFFZixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ2xCLENBQUM7SUFDRCxXQUFXO0lBQ1gsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGNBQWM7SUFDZCxlQUFlLENBQUMsWUFBWTtJQUU1QixDQUFDO0lBRUQsY0FBYyxDQUFDLE9BQU87SUFFdEIsQ0FBQztDQUNKO0FBRVksUUFBQSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xubGV0IEFwcENsYXNzTmFtZSA9IFwiQXBwQ29udHJvbGxlclwiXG5jbGFzcyBfaW9zIHtcblxuICAgIC8qKiBmYWNlYm9vayDngrnlh7vnmbvlvZUgKi9cbiAgICBsb2dpblRvRmFjZWJvb2soaXNMb2dpbikge1xuXG4gICAgfVxuXG4gICAgLyoqIGZhY2Vib29rIOeCueWHu+WIhuS6qyAqL1xuICAgIHNoYXJlVG9GYWNlYm9vayhzaGFyZVR5cGUsIHNoYXJlVXJsLCBpbWdQYXRoKSB7XG5cbiAgICB9XG5cbiAgICBjb3B5VG9DbGlwKHRleHQsIHN0cj8pIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCdpb3MgY29weVRvQ2xpcDonLCB0ZXh0KTtcbiAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcImNvcHlUb0NsaXA6XCI7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoQXBwQ2xhc3NOYW1lLCBtZXRob2ROYW1lLCB0ZXh0LnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgbXNnID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJUaXBzLkNvcHlTdWNjZXNzXCIpO1xuICAgICAgICBpZiAoc3RyKSB7XG4gICAgICAgICAgICBtc2cgPSBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBhbmVsSGVscC5zaG93VGlwKG1zZyk7XG4gICAgfVxuICAgIC8qKuiOt+WPluiuvuWkh+WUr+S4gGlkKi9cbiAgICBnZXREZXZpY2VVVUlEKCkge1xuICAgICAgICBsZXQgdXVpZCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJCR0tleWNoYWluVG9vbFwiLCBcImdldERldmljZUlESW5LZXljaGFpblwiLCBcIlwiKTsgIC8vJ+acgOWuieWFqO+8jOacgOeos+Wumu+8jOacgOa1geeVheeahOa4uOaIj+W5s+WPsCdcbiAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfVxuXG4gICAgLyoq5omT5byA6ZO+5o6lKi9cbiAgICBvcGVuVVJMKHVybCkge1xuICAgICAgICBjYy5zeXMub3BlblVSTCh1cmwpO1xuICAgICAgICAvLyByeXlsLnBhbmVsLnNob3dXZWJWaWV3KHVybCk7XG4gICAgfVxuICAgIC8qKuaJk+W8gOmCrueusSovXG4gICAgb3BlbkVtYWlsKGVtYWlsKSB7XG5cbiAgICB9XG4gICAgLy/kv53lrZjlm77niYfliLDmnKzlnLBcbiAgICBzYXZlVGV4dHVyZVRvTG9jYWwoZmlsZVBhdGgpIHtcbiAgICB9XG4gICAgLy/osIPnlKjns7vnu5/liIbkuqtcbiAgICBzaGFyZUltYWdlVG9Mb2NhbChzaGFyZVVybCkge1xuICAgIH1cbiAgICAvL+iOt+WPluaJi+acuumAmuiur+W9leS/oeaBr1xuICAgIGdldEFsbENvbnRhY3QoKSB7XG5cbiAgICB9XG4gICAgLy/ojrflj5bliarliIfmnb/kuIrnmoTkv6Hmga9cbiAgICBnZXRDbGlwQm9hcmRTdHIoKSB7XG5cbiAgICB9XG4gICAgaGFuZGxlQ2xpcEJvYXJkU3RyKCkge1xuICAgIH1cbiAgICAvKirojrflj5bliIbkuqvlj4LmlbAqL1xuICAgIGdldFJvb21JZE9uU2hhcmUoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBBRiDotK3kubDkuovku7YgKi9cbiAgICBzZW5kQnV5SW5mb1RvQUYocmVjaGFyZ2VJbmZvKSB7XG5cbiAgICB9XG5cbiAgICBpc0luQXBwU3VjY2VzcyhvcmRlcklkKSB7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBpb3MgPSBuZXcgX2lvcygpOyJdfQ==