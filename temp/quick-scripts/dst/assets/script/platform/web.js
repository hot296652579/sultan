
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/platform/web.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '38ea6awK0BHU4PvpHcoHXU2', 'web');
// script/platform/web.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const Manager_1 = require("../common/manager/Manager");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
class _web {
    /** facebook 点击登录 */
    loginToFacebook(isLogin) {
    }
    /** facebook 点击分享 */
    shareToFacebook(shareType, shareUrl, imgPath) {
    }
    copyToClip(str1, str2) {
        let textArea = document.createElement("textarea");
        textArea.style.background = 'transparent';
        textArea.value = str1;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            let successful = document.execCommand('copy');
            let msg = successful ? Manager_1.Manager.makeLanguage("Tips.CopySuccess") : Manager_1.Manager.makeLanguage("TIPS.GAMEDOWNLOADCOPYERROR");
            if (str2) {
                msg = str2;
            }
            document.body.removeChild(textArea);
            return PanelHelp_1.default.showTip(msg);
        }
        catch (err) {
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
        this.localPhotoMethod();
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
        };
        let ch = getQueryString("ch");
        console.log("ch=", ch);
        return ch || 0;
    }
    /**
     * 获取连接 "?" 后指定 name 字段值
     * @param name {string} 键
     * @returns {string} 值
     */
    getQueryString(name) {
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
        let gCanvas = document.getElementsByClassName('gameCanvas')[0];
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
            dispatch("getClipBoardStr", v);
            setTimeout(() => {
                navigator.clipboard.writeText("");
            }, 1);
        })
            .catch((v) => {
            G.Logger.log("获取剪贴板失败: ", v);
        });
        return null;
    }
    handleClipBoardStr() {
    }
    /**获取分享参数*/
    getRoomIdOnShare() {
        return null;
    }
}
exports.web = new _web();
window['webHandleFiles'] = function (param) {
    if (param && param.files && param.files[0]) {
        var fileList = param.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(fileList);
        reader.onload = function (event) {
            let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
            var dataImg = event.target.result;
            image.src = "" + event.target.result;
            image.onload = function () {
                //由于不能将太多Base64字符给服务端发过于，咱们压缩一下
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                let imageWidth = 300; //压缩后图片的大小
                let imageHeight = 300;
                canvas.width = imageWidth;
                canvas.height = imageHeight;
                context.drawImage(image, 0, 0, imageWidth, imageHeight);
                dataImg = canvas.toDataURL('image/jpeg');
                // cc.log(dataImg);
                //此时的dataImg就是你要上传给服务器的字符
                dispatch("handleUpLoadPhoto", dataImg);
            };
        };
    }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGxhdGZvcm0vd2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFvRDtBQUNwRCxvRUFBNEM7QUFFNUMsTUFBTSxJQUFJO0lBRU4sb0JBQW9CO0lBQ3BCLGVBQWUsQ0FBQyxPQUFPO0lBRXZCLENBQUM7SUFFRCxvQkFBb0I7SUFDcEIsZUFBZSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTztJQUU1QyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFLO1FBQ2xCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixJQUFJO1lBQ0EsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLGlCQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDckgsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sR0FBRyxHQUFHLElBQUksQ0FBQzthQUNkO1lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsT0FBTyxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQztRQUFDLE9BQU8sR0FBRyxFQUFFO1NBQ2I7SUFFTCxDQUFDO0lBRUQsYUFBYTtJQUNiLGFBQWE7UUFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQywyQkFBMkI7UUFDbEQsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFNBQVM7SUFDVCxPQUFPLENBQUMsR0FBRztRQUNQLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLCtCQUErQjtJQUNuQyxDQUFDO0lBQ0QscUJBQXFCO0lBQ3JCLGNBQWM7UUFDVixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDRCxxQkFBcUI7SUFDckIsaUJBQWlCO1FBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsU0FBUztJQUNULGdCQUFnQjtRQUNaLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNELFNBQVM7SUFDVCxlQUFlO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUNELFVBQVU7SUFDVixhQUFhO1FBQ1QsSUFBSSxjQUFjLEdBQUcsVUFBVSxJQUFJO1lBQy9CLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1gsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFDRCxJQUFJLEVBQUUsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2xCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsY0FBYyxDQUFDLElBQVk7UUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNYLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELFNBQVM7SUFDVCxTQUFTLENBQUMsS0FBSztJQUVmLENBQUM7SUFDRCxTQUFTO0lBQ1Qsa0JBQWtCLENBQUMsUUFBUTtJQUMzQixDQUFDO0lBQ0QsUUFBUTtJQUNSLGlCQUFpQixDQUFDLFFBQVE7SUFDMUIsQ0FBQztJQUNELHVCQUF1QixDQUFDLFdBQVc7SUFFbkMsQ0FBQztJQUNEOztPQUVHO0lBQ0gseUJBQXlCLENBQUMsS0FBSztRQUMzQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFRLENBQUM7UUFDdEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUNELFdBQVc7SUFDWCxhQUFhO0lBRWIsQ0FBQztJQUdELFdBQVc7SUFDWCxlQUFlO1FBQ1gsU0FBUyxDQUFDLFNBQVM7YUFDZCxRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNSLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDOUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNyQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDVCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNULENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNQLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUNELGtCQUFrQjtJQUNsQixDQUFDO0lBRUQsV0FBVztJQUNYLGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQUVZLFFBQUEsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFFOUIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsVUFBVSxLQUFLO0lBQ3RDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN4QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsS0FBSztZQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBLENBQUMsc0JBQXNCO1lBQzlDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxNQUFNLEdBQUc7Z0JBQ1gsK0JBQStCO2dCQUMvQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBRSxVQUFVO2dCQUNqQyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO2dCQUMxQixNQUFNLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3hELE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6QyxtQkFBbUI7Z0JBQ25CLHlCQUF5QjtnQkFDekIsUUFBUSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQzFDLENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQTtLQUNKO0FBR0wsQ0FBQyxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5cbmNsYXNzIF93ZWIge1xuXG4gICAgLyoqIGZhY2Vib29rIOeCueWHu+eZu+W9lSAqL1xuICAgIGxvZ2luVG9GYWNlYm9vayhpc0xvZ2luKSB7XG5cbiAgICB9XG5cbiAgICAvKiogZmFjZWJvb2sg54K55Ye75YiG5LqrICovXG4gICAgc2hhcmVUb0ZhY2Vib29rKHNoYXJlVHlwZSwgc2hhcmVVcmwsIGltZ1BhdGgpIHtcblxuICAgIH1cblxuICAgIGNvcHlUb0NsaXAoc3RyMSwgc3RyMj8pIHtcbiAgICAgICAgbGV0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgICB0ZXh0QXJlYS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBzdHIxO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgICAgICAgdGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc3VjY2Vzc2Z1bCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgICAgICAgICBsZXQgbXNnID0gc3VjY2Vzc2Z1bCA/IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiVGlwcy5Db3B5U3VjY2Vzc1wiKSA6IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiVElQUy5HQU1FRE9XTkxPQURDT1BZRVJST1JcIik7XG4gICAgICAgICAgICBpZiAoc3RyMikge1xuICAgICAgICAgICAgICAgIG1zZyA9IHN0cjI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRBcmVhKTtcbiAgICAgICAgICAgIHJldHVybiBQYW5lbEhlbHAuc2hvd1RpcChtc2cpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoq6I635Y+W6K6+5aSH5ZSv5LiAaWQqL1xuICAgIGdldERldmljZVVVSUQoKSB7XG4gICAgICAgIGxldCB1dWlkID0gRGF0ZS5ub3coKTsgLy9NYXRoLnJhbmRvbSgpICoxMDAwMDAwMDA7XG4gICAgICAgIHV1aWQgPSBNYXRoLmNlaWwodXVpZCk7XG4gICAgICAgIHJldHVybiB1dWlkLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLyoq5omT5byA6ZO+5o6lKi9cbiAgICBvcGVuVVJMKHVybCkge1xuICAgICAgICBjYy5zeXMub3BlblVSTCh1cmwpO1xuICAgICAgICAvLyByeXlsLnBhbmVsLnNob3dXZWJWaWV3KHVybCk7XG4gICAgfVxuICAgIC8qKuiOt+WPlkFQUHZlcnNpb25OYW1lKi9cbiAgICBnZXRWZXJzaW9uTmFtZSgpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCdhbmRyb2lkIDogZ2V0VmVyc2lvbk5hbWUnKTtcbiAgICAgICAgcmV0dXJuICcxLjEuNCc7XG4gICAgfVxuICAgIC8qKuiOt+WPllJlc3ZlcnNpb25OYW1lKi9cbiAgICBnZXRSZXNWZXJzaW9uTmFtZSgpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCdhbmRyb2lkIDogZ2V0UmVzVmVyc2lvbk5hbWUnKTtcbiAgICAgICAgcmV0dXJuICcyNDEnO1xuICAgIH1cbiAgICAvKirmiZPlvIDnm7jlhowqL1xuICAgIGxvY2FsUGhvdG9NZXRob2QoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsZVwiKS5jbGljaygpO1xuICAgIH1cbiAgICAvKirmiZPlvIDnm7jmnLoqL1xuICAgIHRha2VQaG90b01ldGhvZCgpIHtcbiAgICAgICAgdGhpcy5sb2NhbFBob3RvTWV0aG9kKClcbiAgICB9XG4gICAgLyoq6I635Y+W5rig6YGT5Y+3Ki9cbiAgICBnZXRBcHBRdURhb0lkKCkge1xuICAgICAgICBsZXQgZ2V0UXVlcnlTdHJpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiICsgbmFtZSArIFwiPShbXiZdKikoJnwkKVwiKTtcbiAgICAgICAgICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcbiAgICAgICAgICAgIGlmIChyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5lc2NhcGUoclsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2ggPSBnZXRRdWVyeVN0cmluZyhcImNoXCIpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2g9XCIsIGNoKTtcbiAgICAgICAgcmV0dXJuIGNoIHx8IDBcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W6L+e5o6lIFwiP1wiIOWQjuaMh+WumiBuYW1lIOWtl+auteWAvFxuICAgICAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IOmUrlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IOWAvFxuICAgICAqL1xuICAgIGdldFF1ZXJ5U3RyaW5nKG5hbWU6IHN0cmluZykge1xuICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIpO1xuICAgICAgICB2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XG4gICAgICAgIGlmIChyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmVzY2FwZShyWzJdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoq5omT5byA6YKu566xKi9cbiAgICBvcGVuRW1haWwoZW1haWwpIHtcblxuICAgIH1cbiAgICAvL+S/neWtmOWbvueJh+WIsOacrOWcsFxuICAgIHNhdmVUZXh0dXJlVG9Mb2NhbChmaWxlUGF0aCkge1xuICAgIH1cbiAgICAvL+iwg+eUqOezu+e7n+WIhuS6q1xuICAgIHNoYXJlSW1hZ2VUb0xvY2FsKHNoYXJlVXJsKSB7XG4gICAgfVxuICAgIHNldFJlcXVlc3RlZE9yaWVudGF0aW9uKGlzbGFuZHNjYXBlKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICog5oqK5byV5pOO5bGC572u6aG2XG4gICAgICovXG4gICAgc2V0U3VyZmFjZVZpZXdaT3JkZXJPblRvcChpc3RvcCkge1xuICAgICAgICBsZXQgZ0NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbWVDYW52YXMnKVswXSBhcyBhbnk7XG4gICAgICAgIGdDYW52YXMuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICBnQ2FudmFzLnN0eWxlLnpJbmRleCA9IGlzdG9wID8gMTAgOiAnJztcbiAgICB9XG4gICAgLy/ojrflj5bmiYvmnLrpgJrorq/lvZXkv6Hmga9cbiAgICBnZXRBbGxDb250YWN0KCkge1xuXG4gICAgfVxuXG5cbiAgICAvL+iOt+WPluWJquWIh+adv+S4iueahOS/oeaBr1xuICAgIGdldENsaXBCb2FyZFN0cigpIHtcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZFxuICAgICAgICAgICAgLnJlYWRUZXh0KClcbiAgICAgICAgICAgIC50aGVuKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwi6I635Y+W5Ymq6LS05p2/5oiQ5Yqf77yaXCIsIHYpO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKFwiZ2V0Q2xpcEJvYXJkU3RyXCIsIHYpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KFwiXCIpXG4gICAgICAgICAgICAgICAgfSwgMSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKHYpID0+IHtcbiAgICAgICAgICAgICAgICBHLkxvZ2dlci5sb2coXCLojrflj5bliarotLTmnb/lpLHotKU6IFwiLCB2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBoYW5kbGVDbGlwQm9hcmRTdHIoKSB7XG4gICAgfVxuXG4gICAgLyoq6I635Y+W5YiG5Lqr5Y+C5pWwKi9cbiAgICBnZXRSb29tSWRPblNoYXJlKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB3ZWIgPSBuZXcgX3dlYigpO1xuXG53aW5kb3dbJ3dlYkhhbmRsZUZpbGVzJ10gPSBmdW5jdGlvbiAocGFyYW0pIHtcbiAgICBpZiAocGFyYW0gJiYgcGFyYW0uZmlsZXMgJiYgcGFyYW0uZmlsZXNbMF0pIHtcbiAgICAgICAgdmFyIGZpbGVMaXN0ID0gcGFyYW0uZmlsZXNbMF07XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlTGlzdCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpIC8v5paw5bu65LiA5LiqaW1n5qCH562+77yI6L+Y5rKh5bWM5YWlRE9N6IqC54K5KVxuICAgICAgICAgICAgdmFyIGRhdGFJbWcgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gXCJcIiArIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy/nlLHkuo7kuI3og73lsIblpKrlpJpCYXNlNjTlrZfnrKbnu5nmnI3liqHnq6/lj5Hov4fkuo7vvIzlkrHku6zljovnvKnkuIDkuItcbiAgICAgICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VXaWR0aCA9IDMwMDsgIC8v5Y6L57yp5ZCO5Zu+54mH55qE5aSn5bCPXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlSGVpZ2h0ID0gMzAwO1xuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlV2lkdGg7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgZGF0YUltZyA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coZGF0YUltZyk7XG4gICAgICAgICAgICAgICAgLy/mraTml7bnmoRkYXRhSW1n5bCx5piv5L2g6KaB5LiK5Lyg57uZ5pyN5Yqh5Zmo55qE5a2X56ymXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goXCJoYW5kbGVVcExvYWRQaG90b1wiLCBkYXRhSW1nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0gIl19