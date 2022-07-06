"use strict";
cc._RF.push(module, '51c1ac3ua9NcbG3U/Ddk2au', 'ShareBase');
// script/Helpder/ShareHelpder/ShareBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShareBase {
    constructor() {
        this.AppClassName = '';
    }
    shareText(text) {
        let code = -1;
        if (cc.sys.isBrowser) {
            cc.log("shareTest", text);
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            code = jsb.reflection.callStaticMethod(this.AppClassName, "shareTest", "(Ljava/lang/String;)I", text);
        }
        return code;
    }
    shareImage(imgurl) {
        // if (!imgurl.startsWith("http://")) {
        //     imgurl = "http://" + imgurl;
        // }
        let code = -1;
        if (cc.sys.isBrowser) {
            cc.log("shareImage", imgurl);
        }
        this.downRemoteImage(imgurl, (imagePath) => {
            if (cc.sys.os === cc.sys.OS_IOS) {
            }
            else if (cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod(this.AppClassName, "shareImage", "(Ljava/lang/String;)I", imagePath);
            }
        });
    }
    downRemoteImage(imgUrl, call) {
        let fileName = "qrcode";
        let fileType = ".png";
        let filePath = "";
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.response && cc.sys.isNative) {
                    filePath = jsb.fileUtils.getWritablePath() + fileName + fileType;
                    const u8a = new Uint8Array(xhr.response);
                    let bool = jsb.fileUtils.writeDataToFile(u8a, filePath);
                    console.log(bool ? "保存成功" : "保存失败");
                    call(filePath);
                }
            }
        };
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", imgUrl, true);
        xhr.send();
    }
}
exports.default = ShareBase;
// 状态码
//     //    正常的 成功的
//     static int NORMAL = 0;
// //    沒有裝這個app
//     static int NO_INSTAll = 1;
// //    其他錯誤
//     static int ERREO_ELSE = 2;
//     //    文件不存在
//     static int NO_FILE = 3;

cc._RF.pop();