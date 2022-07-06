"use strict";
cc._RF.push(module, '8a4c8RZTeRI7o/2tfcSwWgb', 'openAppHelpder');
// script/Helpder/openAppHelpder/openAppHelpder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAppHelpder = void 0;
var APP_NAMES;
(function (APP_NAMES) {
    APP_NAMES["telegram"] = "org.telegram.messenger";
    APP_NAMES["whatsApp"] = "com.whatsapp";
    APP_NAMES["ins"] = "com.instagram.android";
    APP_NAMES["facebook"] = "com.facebook.katana";
    APP_NAMES["test"] = "com.tencent.mm";
})(APP_NAMES || (APP_NAMES = {}));
let AppClassName_Openapp = "org/cocos2dx/javascript/AppActivity";
class _openAppHelpder {
    constructor() {
        this.APP_NAMES = APP_NAMES;
    }
    openApp(appName) {
        if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("openAppHelpder", "openApp", '');
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            console.log("openApp:js:" + appName);
            jsb.reflection.callStaticMethod(AppClassName_Openapp, "openApp", "(Ljava/lang/String;)V", appName);
        }
    }
}
exports.OpenAppHelpder = new _openAppHelpder();

cc._RF.pop();