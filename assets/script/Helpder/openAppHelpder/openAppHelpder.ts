
enum APP_NAMES {
    telegram = "org.telegram.messenger",
    whatsApp = "com.whatsapp",
    ins = "com.instagram.android",
    facebook = "com.facebook.katana",
    test = "com.tencent.mm"

}
let AppClassName_Openapp = "org/cocos2dx/javascript/AppActivity"

class _openAppHelpder {

    APP_NAMES = APP_NAMES;

    openApp(appName) {
        if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("openAppHelpder", "openApp", '');
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            console.log("openApp:js:" + appName)
            jsb.reflection.callStaticMethod(AppClassName_Openapp, "openApp", "(Ljava/lang/String;)V", appName);
        }

    }

}
export let OpenAppHelpder = new _openAppHelpder();
