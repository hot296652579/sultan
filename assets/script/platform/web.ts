import { Manager } from "../common/manager/Manager";
import PanelHelp from "../msgbox/PanelHelp";

class _web {

    /** facebook 点击登录 */
    loginToFacebook(isLogin) {

    }

    /** facebook 点击分享 */
    shareToFacebook(shareType, shareUrl, imgPath) {

    }

    copyToClip(str1, str2?) {
        let textArea = document.createElement("textarea");
        textArea.style.background = 'transparent';
        textArea.value = str1;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            let successful = document.execCommand('copy');
            let msg = successful ? Manager.makeLanguage("Tips.CopySuccess") : Manager.makeLanguage("TIPS.GAMEDOWNLOADCOPYERROR");
            if (str2) {
                msg = str2;
            }
            document.body.removeChild(textArea);
            return PanelHelp.showTip(msg);
        } catch (err) {
        }

    }

    /**获取设备唯一id*/
    getDeviceUUID() {
        let uuid = Date.now(); //Math.random() *100000000;
        uuid = Math.ceil(uuid);
        return uuid.toString();
    }

    /**打开链接*/
    openURL(url) {
        cc.sys.openURL(url);
        // ryyl.panel.showWebView(url);
    }
    /**获取APPversionName*/
    getVersionName() {
        G.Logger.log('android : getVersionName');
        return '1.1.4';
    }
    /**获取ResversionName*/
    getResVersionName() {
        G.Logger.log('android : getResVersionName');
        return '241';
    }
    /**打开相册*/
    localPhotoMethod() {
        document.getElementById("file").click();
    }
    /**打开相机*/
    takePhotoMethod() {
        this.localPhotoMethod()
    }
    /**获取渠道号*/
    getAppQuDaoId() {
        let getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
        let ch = getQueryString("ch")
        console.log("ch=", ch);
        return ch || 0
    }
    /**
     * 获取连接 "?" 后指定 name 字段值
     * @param name {string} 键
     * @returns {string} 值
     */
    getQueryString(name: string) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
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
    setRequestedOrientation(islandscape) {

    }
    /**
     * 把引擎层置顶
     */
    setSurfaceViewZOrderOnTop(istop) {
        let gCanvas = document.getElementsByClassName('gameCanvas')[0] as any;
        gCanvas.style.position = 'relative';
        gCanvas.style.zIndex = istop ? 10 : '';
    }
    //获取手机通讯录信息
    getAllContact() {

    }


    //获取剪切板上的信息
    getClipBoardStr() {
        navigator.clipboard
            .readText()
            .then((v) => {
                G.Logger.log("获取剪贴板成功：", v);
                dispatch("getClipBoardStr", v)
                setTimeout(() => {
                    navigator.clipboard.writeText("")
                }, 1)
            })
            .catch((v) => {
                G.Logger.log("获取剪贴板失败: ", v);
            });
        return null
    }
    handleClipBoardStr() {
    }

    /**获取分享参数*/
    getRoomIdOnShare() {
        return null;
    }
}

export const web = new _web();

window['webHandleFiles'] = function (param) {
    if (param && param.files && param.files[0]) {
        var fileList = param.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(fileList);
        reader.onload = function (event) {
            let image = new Image() //新建一个img标签（还没嵌入DOM节点)
            var dataImg = event.target.result;
            image.src = "" + event.target.result;
            image.onload = function () {
                //由于不能将太多Base64字符给服务端发过于，咱们压缩一下
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                let imageWidth = 300;  //压缩后图片的大小
                let imageHeight = 300;
                canvas.width = imageWidth;
                canvas.height = imageHeight;
                context.drawImage(image, 0, 0, imageWidth, imageHeight);
                dataImg = canvas.toDataURL('image/jpeg');
                // cc.log(dataImg);
                //此时的dataImg就是你要上传给服务器的字符
                dispatch("handleUpLoadPhoto", dataImg)
            }
        }
    }


} 