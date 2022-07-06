import ShareBase from "./ShareBase"

class InstagramShare extends ShareBase {
    AppClassName = 'com/threeoctopus/ShareHelpder/instagram/InstagramShare'
    shareText(text: string) {
        let code = super.shareText(text)
        console.log("shareText:22222", code)
        return code

    }
    shareImage(imgurl: string) {
        
        let code = super.shareImage(imgurl)
        console.log("shareImage:", code)
        return code
    }

}
class WhatsappShare extends ShareBase {
    AppClassName = 'com/threeoctopus/ShareHelpder/whatsapp/WhatsappShare'

    shareText(text: string) {
        let code = super.shareText(text)
        console.log("shareText:2222", code)
        return code
    }
    shareImage(imgurl: string) {
        let code = super.shareImage(imgurl)
        console.log("shareImage:", code)
        return code

    }

}
export default class _ShareHelpder {
    static _ins: _ShareHelpder = null;
    static getInstance() {
        if (_ShareHelpder._ins == null) {
            _ShareHelpder._ins = new _ShareHelpder();
        }
        return _ShareHelpder._ins;
    }
    instagram = new InstagramShare();
    whatsapp = new WhatsappShare();

    // 分享文字失败
    shareTextFail(errmg) {
        cc.log("分享文字失败:", errmg)

    }
    // 分享图片失败
    shareImageFail(errmg) {
        cc.log("分享图片失败:", errmg)

    }
}