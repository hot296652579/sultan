import { HotUpdate } from "../common/base/HotUpdate";
import { LogicEvent } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { LoginEvent } from "../login/LoginView";
import PanelHelp from "../msgbox/PanelHelp";

let
    AppClassName_Facebook = "com/threeoctopus/facebookapi/FacebookSDK",
    AppClassName_Google = "com/threeoctopus/googleapi/GoogleSDK",
    AppClassName_AF = "com/flyer/AFActivity",
    AppClassName = "org/cocos2dx/javascript/AppActivity"

export enum shareType {
    LINK = 0,
    PHOTO = 1,
}

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
        } else {
            // PanelHelp.showTip(i18n.ERRORCODE.E10020007);
        }
    }

    /** facebook 获取个人信息回调 用来登录 */
    getFacebookUserInfoToLogin(fbId, fbName, fbHeadImg) {
        dispatch(LoginEvent.FACEBOOK, { fbId, fbName, fbHeadImg })
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
            PanelHelp.showTip(i18n.TIPS.SHARESUCCESS)
        } else {
            //分享失败
            PanelHelp.showTip(i18n.TIPS.SHAREFAILED)
        }
    }

    copyToClip(text, str?) {
        G.Logger.error('copyToClip : ', text);
        jsb.reflection.callStaticMethod(AppClassName, "copyToClip", "(Ljava/lang/String;)V", text.toString());
        let msg = Manager.makeLanguage("Tips.CopySuccess");
        if (str) { msg = str; }
        return PanelHelp.showTip(msg);
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
            let manifestUrl = HotUpdate.hallProjectMainfest;
            let manifestUrltemp = `project.manifest`;
            if (jsb.fileUtils.isFileExist(manifestUrltemp)) {
                let content = jsb.fileUtils.getStringFromFile(manifestUrltemp);
                let mainifest = JSON.parse(content)
                G.Logger.log('获取资源版本号1=', mainifest.version);
                return mainifest.version
            } else {
                if (jsb.fileUtils.isFileExist(manifestUrl)) {
                    let content = jsb.fileUtils.getStringFromFile(manifestUrl);
                    let mainifest = JSON.parse(content)
                    G.Logger.log('获取资源版本号2=', mainifest.version);
                    return mainifest.version
                }
            }

        }
        return 1
    }
    /**安卓返回退出游戏*/
    handleKeyBackClicked() {
        dispatch("handleKeyBackClicked")
    }
    /**安卓返回上传头像 */
    handleUpLoadPhoto(path) {
        dispatch("handleUpLoadPhoto", path)
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
        dispatch("handleSaveImageToLocal", isSuccess)
    }

    getAllContact() {
        jsb.reflection.callStaticMethod(AppClassName, "getAllContact", "()V");
    }

    phoneInfo(data) {
        dispatch("phoneInfo", data)
    }
    getContactsPermission(isSuccess) {
        dispatch("getContactsPermission", isSuccess)
    }
    //获取剪切板上的信息
    getClipBoardStr() {
        let str = jsb.reflection.callStaticMethod(AppClassName, "getClipBoardStr", "()V");
        return str || null
    }
    handleClipBoardStr(data) {
        dispatch("handleClipBoardStr", data)
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

export const android = new _android();