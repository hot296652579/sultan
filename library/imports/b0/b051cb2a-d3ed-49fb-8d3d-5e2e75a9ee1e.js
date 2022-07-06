"use strict";
cc._RF.push(module, 'b051csq0+1J+409Xi51qe4e', 'ShareHelpder');
// script/Helpder/ShareHelpder/ShareHelpder.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShareBase_1 = __importDefault(require("./ShareBase"));
class InstagramShare extends ShareBase_1.default {
    constructor() {
        super(...arguments);
        this.AppClassName = 'com/threeoctopus/ShareHelpder/instagram/InstagramShare';
    }
    shareText(text) {
        let code = super.shareText(text);
        console.log("shareText:22222", code);
        return code;
    }
    shareImage(imgurl) {
        let code = super.shareImage(imgurl);
        console.log("shareImage:", code);
        return code;
    }
}
class WhatsappShare extends ShareBase_1.default {
    constructor() {
        super(...arguments);
        this.AppClassName = 'com/threeoctopus/ShareHelpder/whatsapp/WhatsappShare';
    }
    shareText(text) {
        let code = super.shareText(text);
        console.log("shareText:2222", code);
        return code;
    }
    shareImage(imgurl) {
        let code = super.shareImage(imgurl);
        console.log("shareImage:", code);
        return code;
    }
}
class _ShareHelpder {
    constructor() {
        this.instagram = new InstagramShare();
        this.whatsapp = new WhatsappShare();
    }
    static getInstance() {
        if (_ShareHelpder._ins == null) {
            _ShareHelpder._ins = new _ShareHelpder();
        }
        return _ShareHelpder._ins;
    }
    // 分享文字失败
    shareTextFail(errmg) {
        cc.log("分享文字失败:", errmg);
    }
    // 分享图片失败
    shareImageFail(errmg) {
        cc.log("分享图片失败:", errmg);
    }
}
exports.default = _ShareHelpder;
_ShareHelpder._ins = null;

cc._RF.pop();