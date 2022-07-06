
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/platform/android.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53af5UKwnlP1b7K9MrRzaxX', 'android');
// script/platform/android.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.android = exports.shareType = void 0;
const HotUpdate_1 = require("../common/base/HotUpdate");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const LoginView_1 = require("../login/LoginView");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
let AppClassName_Facebook = "com/threeoctopus/facebookapi/FacebookSDK", AppClassName_Google = "com/threeoctopus/googleapi/GoogleSDK", AppClassName_AF = "com/flyer/AFActivity", AppClassName = "org/cocos2dx/javascript/AppActivity";
var shareType;
(function (shareType) {
    shareType[shareType["LINK"] = 0] = "LINK";
    shareType[shareType["PHOTO"] = 1] = "PHOTO";
})(shareType = exports.shareType || (exports.shareType = {}));
class _android {
    //--------------------facebook-------------------------
    /** facebook 点击登录 */
    loginToFacebook(isLogin) {
        jsb.reflection.callStaticMethod(AppClassName_Facebook, "loginFacebook", "(Ljava/lang/String;)V", isLogin ? "login" : "bind");
    }
    /** facebook 登录回调 */
    loginToFacebookCB(isSuccess) {
        G.Logger.log('facebook 登录回调 isSuccess', isSuccess);
        if (isSuccess && isSuccess == 'true') {
            G.Logger.log('getUserInfo', isSuccess);
            //获取个人信息
            jsb.reflection.callStaticMethod(AppClassName_Facebook, "getUserInfo", "(Ljava/lang/String;)V", "");
        }
        else {
            // PanelHelp.showTip(i18n.ERRORCODE.E10020007);
        }
    }
    /** facebook 获取个人信息回调 用来登录 */
    getFacebookUserInfoToLogin(fbId, fbName, fbHeadImg) {
        dispatch(LoginView_1.LoginEvent.FACEBOOK, { fbId, fbName, fbHeadImg });
    }
    /** facebook 点击分享 */
    shareToFacebook(shareType, shareUrl, imgPath) {
        let data = {
            shareType: shareType,
            shareUrl: shareUrl,
            imgPath: imgPath
        };
        let shareInfo = JSON.stringify(data);
        jsb.reflection.callStaticMethod(AppClassName_Facebook, "shareFacebook", "(Ljava/lang/String;)V", shareInfo);
    }
    /** facebook 分享回调 */
    shareToFacebookCB(isSuccess) {
        G.Logger.log('facebook 分享回调 isSuccess', isSuccess);
        if (isSuccess && isSuccess == "true") {
            //分享成功回调
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SHARESUCCESS);
        }
        else {
            //分享失败
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SHAREFAILED);
        }
    }
    copyToClip(text, str) {
        G.Logger.error('copyToClip : ', text);
        jsb.reflection.callStaticMethod(AppClassName, "copyToClip", "(Ljava/lang/String;)V", text.toString());
        let msg = Manager_1.Manager.makeLanguage("Tips.CopySuccess");
        if (str) {
            msg = str;
        }
        return PanelHelp_1.default.showTip(msg);
    }
    /**获取设备唯一id*/
    getDeviceUUID() {
        G.Logger.log('android : getDeviceUUID');
        let uuid = jsb.reflection.callStaticMethod(AppClassName, "getDeviceUUID", "()Ljava/lang/String;");
        if (!uuid) {
            uuid = Date.now();
            return uuid.toString();
        }
        return uuid;
    }
    /**打开链接*/
    openURL(url) {
        cc.sys.openURL(url);
        // ryyl.panel.showWebView(url);
    }
    /**获取APPversionName*/
    getVersionName() {
        G.Logger.log('android : getVersionName');
        let versionName = jsb.reflection.callStaticMethod(AppClassName, "getAPPVersionName", "()Ljava/lang/String;");
        G.Logger.log('android : getVersionName', versionName);
        return versionName;
    }
    /**获取ResversionName*/
    getResVersionName() {
        if (CC_JSB) {
            let manifestUrl = HotUpdate_1.HotUpdate.hallProjectMainfest;
            let manifestUrltemp = `project.manifest`;
            if (jsb.fileUtils.isFileExist(manifestUrltemp)) {
                let content = jsb.fileUtils.getStringFromFile(manifestUrltemp);
                let mainifest = JSON.parse(content);
                G.Logger.log('获取资源版本号1=', mainifest.version);
                return mainifest.version;
            }
            else {
                if (jsb.fileUtils.isFileExist(manifestUrl)) {
                    let content = jsb.fileUtils.getStringFromFile(manifestUrl);
                    let mainifest = JSON.parse(content);
                    G.Logger.log('获取资源版本号2=', mainifest.version);
                    return mainifest.version;
                }
            }
        }
        return 1;
    }
    /**安卓返回退出游戏*/
    handleKeyBackClicked() {
        dispatch("handleKeyBackClicked");
    }
    /**安卓返回上传头像 */
    handleUpLoadPhoto(path) {
        dispatch("handleUpLoadPhoto", path);
    }
    /**打开相册*/
    localPhotoMethod() {
        jsb.reflection.callStaticMethod(AppClassName, "localPhotoMethod", "()V");
    }
    /**打开相机*/
    takePhotoMethod() {
        jsb.reflection.callStaticMethod(AppClassName, "takePhotoMethod", "()V");
    }
    /**获取渠道号*/
    getAppQuDaoId() {
        let qudao = jsb.reflection.callStaticMethod(AppClassName, "getAppQuDaoId", "()I");
        G.Logger.log('android : getAppQuDaoId', qudao);
        return qudao || 0;
    }
    /**打开邮箱*/
    openEmail(email) {
        jsb.reflection.callStaticMethod(AppClassName, "openEmail", "(Ljava/lang/String;)V", email.toString());
    }
    //保存图片到本地
    saveTextureToLocal(filePath) {
        jsb.reflection.callStaticMethod(AppClassName, "saveTextureToLocal", "(Ljava/lang/String;)V", filePath);
    }
    //调用系统分享
    shareImageToLocal(shareUrl) {
        jsb.reflection.callStaticMethod(AppClassName, "shareImageToLocal", "(Ljava/lang/String;)V", shareUrl);
    }
    /**图片保存成功回调*/
    handleSaveImageToLocal(isSuccess) {
        dispatch("handleSaveImageToLocal", isSuccess);
    }
    getAllContact() {
        jsb.reflection.callStaticMethod(AppClassName, "getAllContact", "()V");
    }
    phoneInfo(data) {
        dispatch("phoneInfo", data);
    }
    getContactsPermission(isSuccess) {
        dispatch("getContactsPermission", isSuccess);
    }
    //获取剪切板上的信息
    getClipBoardStr() {
        let str = jsb.reflection.callStaticMethod(AppClassName, "getClipBoardStr", "()V");
        return str || null;
    }
    handleClipBoardStr(data) {
        dispatch("handleClipBoardStr", data);
    }
    /**設置屏幕方向
     * true  是橫屏
     * false 是豎屏
     */
    setRequestedOrientation(islandscape) {
        jsb.reflection.callStaticMethod(AppClassName, "setRequestedOrientation", "(Z)V", islandscape);
    }
    /**
     * 把引擎层置顶
     */
    setSurfaceViewZOrderOnTop(istop) {
        // jsb.reflection.callStaticMethod(AppClassName, "setSurfaceViewZOrderOnTop", "(Z)V", istop);
    }
    /**获取分享参数*/
    getRoomIdOnShare() {
        let roomId = jsb.reflection.callStaticMethod(AppClassName, "getRoomIdOnShare", "()Ljava/lang/String;");
        return roomId || null;
    }
    /** AF 购买事件 */
    sendBuyInfoToAF(rechargeInfo) {
        let data = {
            revenue: +rechargeInfo.amount,
            content_type: rechargeInfo.productName,
            content_id: rechargeInfo.orderId,
            currency: rechargeInfo.currency
        };
        let BuyInfo = JSON.stringify(data);
        G.Logger.log("send data", data, BuyInfo);
        jsb.reflection.callStaticMethod(AppClassName_AF, "AFBuyInfoInApp", "(Ljava/lang/String;)V", BuyInfo);
    }
    isInAppSuccess(orderId) {
        G.Logger.log("isInApp orderId", orderId);
        if (orderId) {
            dispatch("IN_AFAPP_SUCCESS", orderId);
        }
    }
}
exports.android = new _android();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGxhdGZvcm0vYW5kcm9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBcUQ7QUFFckQsa0VBQXVEO0FBQ3ZELHVEQUFvRDtBQUNwRCxrREFBZ0Q7QUFDaEQsb0VBQTRDO0FBRTVDLElBQ0kscUJBQXFCLEdBQUcsMENBQTBDLEVBQ2xFLG1CQUFtQixHQUFHLHNDQUFzQyxFQUM1RCxlQUFlLEdBQUcsc0JBQXNCLEVBQ3hDLFlBQVksR0FBRyxxQ0FBcUMsQ0FBQTtBQUV4RCxJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDakIseUNBQVEsQ0FBQTtJQUNSLDJDQUFTLENBQUE7QUFDYixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFFRCxNQUFNLFFBQVE7SUFFVix1REFBdUQ7SUFDdkQsb0JBQW9CO0lBQ3BCLGVBQWUsQ0FBQyxPQUFPO1FBQ25CLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBRUQsb0JBQW9CO0lBQ3BCLGlCQUFpQixDQUFDLFNBQVM7UUFDdkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsSUFBSSxTQUFTLElBQUksU0FBUyxJQUFJLE1BQU0sRUFBRTtZQUNsQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsUUFBUTtZQUNSLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3RHO2FBQU07WUFDSCwr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LFlBQVksQ0FBQyxNQUFNO1lBQzdCLFlBQVksRUFBRSxZQUFZLENBQUMsV0FBVztZQUN0QyxVQUFVLEVBQUUsWUFBWSxDQUFDLE9BQU87WUFDaEMsUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRO1NBQ2xDLENBQUM7UUFDRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUFPO1FBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksT0FBTyxFQUFFO1lBQ1QsUUFBUSxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0lBRUwsQ0FBQztDQUNKO0FBRVksUUFBQSxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhvdFVwZGF0ZSB9IGZyb20gXCIuLi9jb21tb24vYmFzZS9Ib3RVcGRhdGVcIjtcbmltcG9ydCB7IExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2dpbkV2ZW50IH0gZnJvbSBcIi4uL2xvZ2luL0xvZ2luVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuXG5sZXRcbiAgICBBcHBDbGFzc05hbWVfRmFjZWJvb2sgPSBcImNvbS90aHJlZW9jdG9wdXMvZmFjZWJvb2thcGkvRmFjZWJvb2tTREtcIixcbiAgICBBcHBDbGFzc05hbWVfR29vZ2xlID0gXCJjb20vdGhyZWVvY3RvcHVzL2dvb2dsZWFwaS9Hb29nbGVTREtcIixcbiAgICBBcHBDbGFzc05hbWVfQUYgPSBcImNvbS9mbHllci9BRkFjdGl2aXR5XCIsXG4gICAgQXBwQ2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiXG5cbmV4cG9ydCBlbnVtIHNoYXJlVHlwZSB7XG4gICAgTElOSyA9IDAsXG4gICAgUEhPVE8gPSAxLFxufVxuXG5jbGFzcyBfYW5kcm9pZCB7XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tZmFjZWJvb2stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLyoqIGZhY2Vib29rIOeCueWHu+eZu+W9lSAqL1xuICAgIGxvZ2luVG9GYWNlYm9vayhpc0xvZ2luKSB7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoQXBwQ2xhc3NOYW1lX0ZhY2Vib29rLCBcImxvZ2luRmFjZWJvb2tcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgaXNMb2dpbiA/IFwibG9naW5cIiA6IFwiYmluZFwiKTtcbiAgICB9XG5cbiAgICAvKiogZmFjZWJvb2sg55m75b2V5Zue6LCDICovXG4gICAgbG9naW5Ub0ZhY2Vib29rQ0IoaXNTdWNjZXNzKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZygnZmFjZWJvb2sg55m75b2V5Zue6LCDIGlzU3VjY2VzcycsIGlzU3VjY2Vzcyk7XG5cbiAgICAgICAgaWYgKGlzU3VjY2VzcyAmJiBpc1N1Y2Nlc3MgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coJ2dldFVzZXJJbmZvJywgaXNTdWNjZXNzKTtcbiAgICAgICAgICAgIC8v6I635Y+W5Liq5Lq65L+h5oGvXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZV9GYWNlYm9vaywgXCJnZXRVc2VySW5mb1wiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRVJST1JDT0RFLkUxMDAyMDAwNyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogZmFjZWJvb2sg6I635Y+W5Liq5Lq65L+h5oGv5Zue6LCDIOeUqOadpeeZu+W9lSAqL1xuICAgIGdldEZhY2Vib29rVXNlckluZm9Ub0xvZ2luKGZiSWQsIGZiTmFtZSwgZmJIZWFkSW1nKSB7XG4gICAgICAgIGRpc3BhdGNoKExvZ2luRXZlbnQuRkFDRUJPT0ssIHsgZmJJZCwgZmJOYW1lLCBmYkhlYWRJbWcgfSlcbiAgICB9XG5cbiAgICAvKiogZmFjZWJvb2sg54K55Ye75YiG5LqrICovXG4gICAgc2hhcmVUb0ZhY2Vib29rKHNoYXJlVHlwZSwgc2hhcmVVcmwsIGltZ1BhdGgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBzaGFyZVR5cGU6IHNoYXJlVHlwZSxcbiAgICAgICAgICAgIHNoYXJlVXJsOiBzaGFyZVVybCxcbiAgICAgICAgICAgIGltZ1BhdGg6IGltZ1BhdGhcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNoYXJlSW5mbyA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZV9GYWNlYm9vaywgXCJzaGFyZUZhY2Vib29rXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHNoYXJlSW5mbyk7XG4gICAgfVxuXG4gICAgLyoqIGZhY2Vib29rIOWIhuS6q+WbnuiwgyAqL1xuICAgIHNoYXJlVG9GYWNlYm9va0NCKGlzU3VjY2Vzcykge1xuICAgICAgICBHLkxvZ2dlci5sb2coJ2ZhY2Vib29rIOWIhuS6q+WbnuiwgyBpc1N1Y2Nlc3MnLCBpc1N1Y2Nlc3MpO1xuXG4gICAgICAgIGlmIChpc1N1Y2Nlc3MgJiYgaXNTdWNjZXNzID09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAvL+WIhuS6q+aIkOWKn+Wbnuiwg1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5USVBTLlNIQVJFU1VDQ0VTUylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5YiG5Lqr5aSx6LSlXG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRJUFMuU0hBUkVGQUlMRUQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3B5VG9DbGlwKHRleHQsIHN0cj8pIHtcbiAgICAgICAgRy5Mb2dnZXIuZXJyb3IoJ2NvcHlUb0NsaXAgOiAnLCB0ZXh0KTtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChBcHBDbGFzc05hbWUsIFwiY29weVRvQ2xpcFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCB0ZXh0LnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgbXNnID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJUaXBzLkNvcHlTdWNjZXNzXCIpO1xuICAgICAgICBpZiAoc3RyKSB7IG1zZyA9IHN0cjsgfVxuICAgICAgICByZXR1cm4gUGFuZWxIZWxwLnNob3dUaXAobXNnKTtcbiAgICB9XG5cbiAgICAvKirojrflj5borr7lpIfllK/kuIBpZCovXG4gICAgZ2V0RGV2aWNlVVVJRCgpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCdhbmRyb2lkIDogZ2V0RGV2aWNlVVVJRCcpO1xuICAgICAgICBsZXQgdXVpZCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoQXBwQ2xhc3NOYW1lLCBcImdldERldmljZVVVSURcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcbiAgICAgICAgaWYgKCF1dWlkKSB7XG4gICAgICAgICAgICB1dWlkID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHJldHVybiB1dWlkLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfVxuXG4gICAgLyoq5omT5byA6ZO+5o6lKi9cbiAgICBvcGVuVVJMKHVybCkge1xuICAgICAgICBjYy5zeXMub3BlblVSTCh1cmwpO1xuICAgICAgICAvLyByeXlsLnBhbmVsLnNob3dXZWJWaWV3KHVybCk7XG4gICAgfVxuICAgIC8qKuiOt+WPlkFQUHZlcnNpb25OYW1lKi9cbiAgICBnZXRWZXJzaW9uTmFtZSgpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCdhbmRyb2lkIDogZ2V0VmVyc2lvbk5hbWUnKTtcbiAgICAgICAgbGV0IHZlcnNpb25OYW1lID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChBcHBDbGFzc05hbWUsIFwiZ2V0QVBQVmVyc2lvbk5hbWVcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCdhbmRyb2lkIDogZ2V0VmVyc2lvbk5hbWUnLCB2ZXJzaW9uTmFtZSk7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uTmFtZTtcbiAgICB9XG4gICAgLyoq6I635Y+WUmVzdmVyc2lvbk5hbWUqL1xuICAgIGdldFJlc1ZlcnNpb25OYW1lKCkge1xuICAgICAgICBpZiAoQ0NfSlNCKSB7XG4gICAgICAgICAgICBsZXQgbWFuaWZlc3RVcmwgPSBIb3RVcGRhdGUuaGFsbFByb2plY3RNYWluZmVzdDtcbiAgICAgICAgICAgIGxldCBtYW5pZmVzdFVybHRlbXAgPSBgcHJvamVjdC5tYW5pZmVzdGA7XG4gICAgICAgICAgICBpZiAoanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChtYW5pZmVzdFVybHRlbXApKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKG1hbmlmZXN0VXJsdGVtcCk7XG4gICAgICAgICAgICAgICAgbGV0IG1haW5pZmVzdCA9IEpTT04ucGFyc2UoY29udGVudClcbiAgICAgICAgICAgICAgICBHLkxvZ2dlci5sb2coJ+iOt+WPlui1hOa6kOeJiOacrOWPtzE9JywgbWFpbmlmZXN0LnZlcnNpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWluaWZlc3QudmVyc2lvblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChtYW5pZmVzdFVybCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKG1hbmlmZXN0VXJsKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1haW5pZmVzdCA9IEpTT04ucGFyc2UoY29udGVudClcbiAgICAgICAgICAgICAgICAgICAgRy5Mb2dnZXIubG9nKCfojrflj5botYTmupDniYjmnKzlj7cyPScsIG1haW5pZmVzdC52ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1haW5pZmVzdC52ZXJzaW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgLyoq5a6J5Y2T6L+U5Zue6YCA5Ye65ri45oiPKi9cbiAgICBoYW5kbGVLZXlCYWNrQ2xpY2tlZCgpIHtcbiAgICAgICAgZGlzcGF0Y2goXCJoYW5kbGVLZXlCYWNrQ2xpY2tlZFwiKVxuICAgIH1cbiAgICAvKirlronljZPov5Tlm57kuIrkvKDlpLTlg48gKi9cbiAgICBoYW5kbGVVcExvYWRQaG90byhwYXRoKSB7XG4gICAgICAgIGRpc3BhdGNoKFwiaGFuZGxlVXBMb2FkUGhvdG9cIiwgcGF0aClcbiAgICB9XG4gICAgLyoq5omT5byA55u45YaMKi9cbiAgICBsb2NhbFBob3RvTWV0aG9kKCkge1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZSwgXCJsb2NhbFBob3RvTWV0aG9kXCIsIFwiKClWXCIpO1xuICAgIH1cbiAgICAvKirmiZPlvIDnm7jmnLoqL1xuICAgIHRha2VQaG90b01ldGhvZCgpIHtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChBcHBDbGFzc05hbWUsIFwidGFrZVBob3RvTWV0aG9kXCIsIFwiKClWXCIpO1xuICAgIH1cbiAgICAvKirojrflj5bmuKDpgZPlj7cqL1xuICAgIGdldEFwcFF1RGFvSWQoKSB7XG4gICAgICAgIGxldCBxdWRhbyA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoQXBwQ2xhc3NOYW1lLCBcImdldEFwcFF1RGFvSWRcIiwgXCIoKUlcIik7XG4gICAgICAgIEcuTG9nZ2VyLmxvZygnYW5kcm9pZCA6IGdldEFwcFF1RGFvSWQnLCBxdWRhbyk7XG4gICAgICAgIHJldHVybiBxdWRhbyB8fCAwO1xuICAgIH1cbiAgICAvKirmiZPlvIDpgq7nrrEqL1xuICAgIG9wZW5FbWFpbChlbWFpbCkge1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZSwgXCJvcGVuRW1haWxcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgZW1haWwudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgLy/kv53lrZjlm77niYfliLDmnKzlnLBcbiAgICBzYXZlVGV4dHVyZVRvTG9jYWwoZmlsZVBhdGgpIHtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChBcHBDbGFzc05hbWUsIFwic2F2ZVRleHR1cmVUb0xvY2FsXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIGZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICAvL+iwg+eUqOezu+e7n+WIhuS6q1xuICAgIHNoYXJlSW1hZ2VUb0xvY2FsKHNoYXJlVXJsKSB7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoQXBwQ2xhc3NOYW1lLCBcInNoYXJlSW1hZ2VUb0xvY2FsXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHNoYXJlVXJsKTtcbiAgICB9XG5cbiAgICAvKirlm77niYfkv53lrZjmiJDlip/lm57osIMqL1xuICAgIGhhbmRsZVNhdmVJbWFnZVRvTG9jYWwoaXNTdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKFwiaGFuZGxlU2F2ZUltYWdlVG9Mb2NhbFwiLCBpc1N1Y2Nlc3MpXG4gICAgfVxuXG4gICAgZ2V0QWxsQ29udGFjdCgpIHtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChBcHBDbGFzc05hbWUsIFwiZ2V0QWxsQ29udGFjdFwiLCBcIigpVlwiKTtcbiAgICB9XG5cbiAgICBwaG9uZUluZm8oZGF0YSkge1xuICAgICAgICBkaXNwYXRjaChcInBob25lSW5mb1wiLCBkYXRhKVxuICAgIH1cbiAgICBnZXRDb250YWN0c1Blcm1pc3Npb24oaXNTdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKFwiZ2V0Q29udGFjdHNQZXJtaXNzaW9uXCIsIGlzU3VjY2VzcylcbiAgICB9XG4gICAgLy/ojrflj5bliarliIfmnb/kuIrnmoTkv6Hmga9cbiAgICBnZXRDbGlwQm9hcmRTdHIoKSB7XG4gICAgICAgIGxldCBzdHIgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZSwgXCJnZXRDbGlwQm9hcmRTdHJcIiwgXCIoKVZcIik7XG4gICAgICAgIHJldHVybiBzdHIgfHwgbnVsbFxuICAgIH1cbiAgICBoYW5kbGVDbGlwQm9hcmRTdHIoZGF0YSkge1xuICAgICAgICBkaXNwYXRjaChcImhhbmRsZUNsaXBCb2FyZFN0clwiLCBkYXRhKVxuICAgIH1cbiAgICAvKiroqK3nva7lsY/luZXmlrnlkJFcbiAgICAgKiB0cnVlICDmmK/mqavlsY9cbiAgICAgKiBmYWxzZSDmmK/osY7lsY9cbiAgICAgKi9cbiAgICBzZXRSZXF1ZXN0ZWRPcmllbnRhdGlvbihpc2xhbmRzY2FwZSkge1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZSwgXCJzZXRSZXF1ZXN0ZWRPcmllbnRhdGlvblwiLCBcIihaKVZcIiwgaXNsYW5kc2NhcGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmiorlvJXmk47lsYLnva7pobZcbiAgICAgKi9cbiAgICBzZXRTdXJmYWNlVmlld1pPcmRlck9uVG9wKGlzdG9wKSB7XG4gICAgICAgIC8vIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoQXBwQ2xhc3NOYW1lLCBcInNldFN1cmZhY2VWaWV3Wk9yZGVyT25Ub3BcIiwgXCIoWilWXCIsIGlzdG9wKTtcbiAgICB9XG5cbiAgICAvKirojrflj5bliIbkuqvlj4LmlbAqL1xuICAgIGdldFJvb21JZE9uU2hhcmUoKSB7XG4gICAgICAgIGxldCByb29tSWQgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZSwgXCJnZXRSb29tSWRPblNoYXJlXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIHJldHVybiByb29tSWQgfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvKiogQUYg6LSt5Lmw5LqL5Lu2ICovXG4gICAgc2VuZEJ1eUluZm9Ub0FGKHJlY2hhcmdlSW5mbykge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHJldmVudWU6ICtyZWNoYXJnZUluZm8uYW1vdW50LFxuICAgICAgICAgICAgY29udGVudF90eXBlOiByZWNoYXJnZUluZm8ucHJvZHVjdE5hbWUsXG4gICAgICAgICAgICBjb250ZW50X2lkOiByZWNoYXJnZUluZm8ub3JkZXJJZCxcbiAgICAgICAgICAgIGN1cnJlbmN5OiByZWNoYXJnZUluZm8uY3VycmVuY3lcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IEJ1eUluZm8gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgRy5Mb2dnZXIubG9nKFwic2VuZCBkYXRhXCIsIGRhdGEsIEJ1eUluZm8pO1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZV9BRiwgXCJBRkJ1eUluZm9JbkFwcFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBCdXlJbmZvKTtcbiAgICB9XG5cbiAgICBpc0luQXBwU3VjY2VzcyhvcmRlcklkKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcImlzSW5BcHAgb3JkZXJJZFwiLCBvcmRlcklkKTtcbiAgICAgICAgaWYgKG9yZGVySWQpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiSU5fQUZBUFBfU1VDQ0VTU1wiLCBvcmRlcklkKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYW5kcm9pZCA9IG5ldyBfYW5kcm9pZCgpOyJdfQ==