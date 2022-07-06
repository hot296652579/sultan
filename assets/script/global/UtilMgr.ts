import { HotUpdate } from "../common/base/HotUpdate";
import { Config } from "../common/config/Config";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import Operation from "../framework/extentions/Operation";
import { HttpRequestType, RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { Manager } from "../common/manager/Manager";
import UserInfo from "../userInfo/UserInfo";
import { getSingleton } from "../framework/base/Singleton";
import CaptureUtil from "../common/component/CaptureUtil";
import { User } from "./User";
import { HallConfig } from "../hall/HallNetController";
import TypeUtils from "../common/utils/TypeUtils";

/**
 * 工具通用
 */
class _UtilMgr {

    LocalHeadPicName = null;
    spreadMoney(num: number): number {
        if (isNaN(num)) {
            return num;
        }
        return Operation.mul(num, 10000);
    }

    shrinkMoney(num: number): number {
        if (isNaN(num)) {
            return num;
        }
        return Operation.div(num, 10000);
    }

    /**
     * 转换金币显示规则
     * 值
     * 是否格式化
     * 是否返回整数
     */
    changeMoney(num, bPlaceholder = true, isParseInt = false) {
        if (typeof num == "string") {
            num = Number(num) / 10000;
        } else if (typeof num == "number") {
            num = num / 10000;
        } else {
            cc.error("parameter type error")
            return
        }

        let bFu = false;
        if (num < 0) {
            bFu = true;
            num *= -1;
        }

        let str = ''
        if (isParseInt || num < 0.01) num = parseInt(num);
        if (num.toString().indexOf('.') != -1) {
            if (bPlaceholder) {
                str = UtilMgr.formatMoney(UtilMgr.toFixed(num, 2).toString(), true)
            } else {
                str = UtilMgr.toFixed(num, 2).toString();
            }
            str = UtilMgr.toPadding(str, 2)//策划说需要补零
        } else {
            if (bPlaceholder) {
                str = UtilMgr.formatMoney(num.toString(), false)
            } else {
                str = num.toString()
            }
        }

        //if (num >= 1000000000) { //十亿及以上
        //    str = (Math.floor(num / 10000000) / 100).toString()
        //    if (str.indexOf('.') != -1) {
        //        str = Number(str).toFixed(2) + "B";
        //    } else {
        //        str = str + "B";
        //    }
        //}
        //else if (num >= 1000000) { //一百万及以上
        //    str = (Math.floor(num / 10000) / 100).toString()
        //    if (str.indexOf('.') != -1) {
        //        str = Number(str).toFixed(2) + "M";
        //    } else {
        //        str = str + "M";
        //    }
        //}
        //else if (num >= 1000) { //一千及以上
        //    str = (Math.floor(num / 10) / 100).toString()
        //    if (str.indexOf('.') != -1) {
        //        str = Number(str).toFixed(2) + "K";
        //    } else {
        //        str = str + "K";
        //    }
        //}
        //else { //小于1千
        //    if (num.toString().indexOf('.') != -1) {
        //        str = num.toFixed(2)
        //    } else {
        //        str = num.toString()
        //    }
        //}

        if (bFu) {
            str = "-" + str;
        }
        return str;
    }

    abbrMoney(num): string {
        num /= 10000;
        let str = ''
        if (num >= 10000000000) { //十亿及以上
            str = (Math.floor(num / 10000000) / 100).toString()
            if (str.indexOf('.') != -1) {
                str = Number(str).toFixed(2) + "B";
            } else {
                str = str + "B";
            }
        }
        else if (num >= 10000000) { //一百万及以上
            str = (Math.floor(num / 10000) / 100).toString()
            if (str.indexOf('.') != -1) {
                str = this.toFixed(Number(str), 2) + "M";
            } else {
                str = str + "M";
            }
        }
        else if (num >= 10000) { //一千及以上
            str = (Math.floor(num / 10) / 100).toString()
            if (str.indexOf('.') != -1) {
                str = this.toFixed(Number(str), 2) + "K";
            } else {
                str = str + "K";
            }
        }
        else { //小于1千
            if (num.toString().indexOf('.') != -1) {
                str = this.toFixed(num, 2).toString();
            } else {
                str = num.toString()
            }

            if (num === 0) {
                str = "0";
            }
        }
        return str;
    }

    /**
     * 保留小数后几位（由于js原生toFixed方法会四舍五入，无法达到想要效果，所以才写了一个方法）
     * @param num {number} 数
     * @param places {number} 位数
     * @return {number}
     */
    toFixed(num: number, places: number): number {
        let result: number = num;
        let strNum: string = num.toString();
        if (strNum.indexOf(".") > 0) {
            let arrNum: Array<string> = strNum.split(".");
            let frontNum: string = arrNum[0] + ".";
            let rearNum: string = arrNum[1];
            for (let i = 0; i < places; ++i) {
                let index = rearNum[i];
                if (index) {
                    frontNum += index;
                } else {
                    break;
                }
            }
            result = Number(frontNum);
        }

        return result;
    }

    /**
     * 补齐小数后的占位符0
     * @param num {number | string} 数
     * @param places {number} 位数
     */
    toPadding(num: number | string, places: number): string {
        const POINT: string = ".";
        const ZERO: string = "0";
        let strResult: string = ""
        if (typeof (num) === "string") {
            strResult = num;
        } else {
            strResult = num.toString();
        }
        let pointIndex = strResult.indexOf(POINT);
        let perchCount: number = 0;
        if (pointIndex < 0) {
            perchCount = places;
            strResult += POINT;
        } else {
            perchCount = places - (strResult.length - (pointIndex + 1));
        }

        for (let i: number = 0; i < perchCount; ++i) {
            strResult += ZERO;
        }

        return strResult;
    }

    /**
     * 格式化数字
     */
    formatMoney(num, bFloat) {
        let numArr = []
        let floatArr = []
        if (bFloat) {
            floatArr = num.split(".")
            numArr = floatArr[0].split("")
        } else {
            numArr = num.split("")
        }

        let index = 0
        for (let i = numArr.length - 1; i >= 0; i--) {
            index++
            if (index == 3 && i != 0) {
                numArr.splice(i, 0, ",")
                index = 0
            }
        }

        let newMoney = ""
        numArr.forEach((char) => {
            newMoney = newMoney + char
        });
        if (bFloat && floatArr[1] !== undefined) {
            newMoney = newMoney + "." + floatArr[1]
        }

        return newMoney
    }

    /**
     * 恢复数字
     */
    recoverMoney(num) {
        let str = ""
        if (typeof num == "string") {
            str = num
        } else if (typeof num == "number") {
            str = num.toString()
        } else {
            cc.error("parameter type error")
            return
        }

        let reg = new RegExp(",", "g")
        return Number(str.replace(reg, ""))
    }

    /**
     * 获取当前时间，格式YYYY-MM-DD
     */
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        let monthstr = month.toString();
        if (month >= 1 && month <= 9) {
            monthstr = "0" + month;
        }
        let strDatestr = strDate.toString();
        if (strDate >= 0 && strDate <= 9) {
            strDatestr = "0" + strDate;
        }
        var currentdate = year + seperator1 + monthstr + seperator1 + strDatestr;
        return currentdate;
    }

    /**
     * string截取一定长度(单个字母占1)
     */
    setString(str, len = 10, omit = true) {
        var strlen = 0;
        var s = "";
        str = str.toString()
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                strlen += 2;
            } else {
                strlen++;
            }
            s += str.charAt(i);
            if (strlen > len) {
                if (omit) {
                    return s + "...";
                } else {
                    return s;
                }
            }
        }
        return s;
    }
    setBankCardStringCover(str, start = 0, end = 4) {
        let newStr
        if (typeof str == "string") {
            newStr = str
        } else if (typeof str == "number") {
            newStr = str.toString()
        } else {
            cc.error("parameter srr type error")
            return
        }
        var s = "";
        for (let index = 0; index < newStr.length; index++) {

            if (index >= start && index < newStr.length - end) {
                s += "*";

            } else {
                s += newStr.charAt(index);
            }

            if ((index + 1) % 4 == 0 && index > 0) {
                s += " ";
            }
        }
        return s;
    }
    setStringCover(str, start = 0, end = 4) {
        let newStr
        if (typeof str == "string") {
            newStr = str
        } else if (typeof str == "number") {
            newStr = str.toString()
        } else {
            cc.error("parameter srr type error")
            return
        }
        var s = "";
        for (let index = 0; index < newStr.length; index++) {

            if (index >= start && index < newStr.length - end) {
                s += "*";
            } else {
                s += newStr.charAt(index);
            }
        }
        return s;
    }

    /**
     * string长度
     */
    strLen(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 255 || str.charCodeAt(i) < 0) {
                len += 2;
            }
            else {
                len++;
            }
        }
        return len;
    }

    /**
     * 获取指定范围随机数
     */
    random(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    /**
     * 处理浮点数计算丢失精度问题
     */
    formatFloat(f) {
        var m = Math.pow(10, 2);
        return Math.round(f * m) / m;
    }

    /**
     * 获取本地头像索引 2 - 16
     */
    getLocalHeadIndex(userId) {
        let index = userId % 7 + 1
        return index
    }

    /**
     * 获取本地头像地址
     */
    getLocalHeadPath(userId) {
        let index = UtilMgr.getLocalHeadIndex(userId)
        return Config.avatar_path + index
    }

    /**
     * 加载头像
     * @param head 
     * @param headImg 
     * @param userId 
     * @param view 
     */
    loadHeadImg(head: cc.Sprite, headImg: string, userId: number | Long, view: UIView) {
        if (headImg && headImg.length > 0) {
            if (headImg.indexOf("http") != -1) {
                head.loadRemoteImage({ url: headImg, view: view, defaultSpriteFrame: Config.headImage_default })
            } else {
                if (headImg.indexOf("head") != -1) {
                    headImg = Config.headImageURL + headImg;
                    head.loadRemoteImage({ url: headImg, view: view, defaultSpriteFrame: Config.headImage_default })
                } else if (headImg.indexOf("base") != -1) {
                    headImg = headImg.slice(headImg.indexOf("_") + 1, headImg.indexOf('.'));
                    headImg = Config.avatar_path + headImg
                    head.loadImage({ url: headImg, view: view, bundle: BUNDLE_RESOURCES })
                } else if (headImg.length == 1) {
                    let avartarPath = Config.avatar_path + (Number(headImg) + 1)
                    head.loadImage({ url: avartarPath, view: this, bundle: BUNDLE_RESOURCES })
                }
                else {
                    G.Logger.error('headImg 格式不对');
                }
            }
        } else {
            headImg = this.getLocalHeadPath(userId)
            head.loadImage({ url: headImg, view: view, bundle: BUNDLE_RESOURCES })
        }
        if (head) {
            head.node["userId"] = userId;
            head.node.off("click");
            if (head.node.getComponent(cc.Button) == null) {
                head.node.addComponent(cc.Button)
            }
            head.node.on("click", () => {
                // head.node.off(cc.Node.EventType.TOUCH_END);
                // head.node.on(cc.Node.EventType.TOUCH_END, () => {
                Manager.globalAudio.playEffect("common/audio/click", BUNDLE_RESOURCES);
                dispatch("OpenUserHeadInfo", { userID: head.node["userId"] });
            }, this);
        }
    }

    /**
     * 下载网络图片到本地显示
     * @param url 
     * @param callback 
     */
    downloadImg(url: string, sprite: cc.Sprite, callback: Function, view: UIView) {

        function loadEnd() {
            cc.loader.load(filepath, function (err, tex) {
                if (err) {
                    cc.error(err);
                } else {
                    var spriteFrame = new cc.SpriteFrame(tex);
                    if (spriteFrame) {
                        callback(spriteFrame)
                    }
                }
            });

        }

        if (cc.sys.isNative) {
            var dirpath = jsb.fileUtils.getWritablePath() + 'downloadImg/';
            var filepath = dirpath + url + '.png';

            if (jsb.fileUtils.isFileExist(filepath)) {
                cc.log('Remote is find' + filepath);
                loadEnd();
                return;
            }

            var saveFile = function (data) {
                if (typeof data !== 'undefined') {
                    if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
                        jsb.fileUtils.createDirectory(dirpath);
                    }

                    if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                        cc.log('Remote write file succeed.');
                        loadEnd();
                    } else {
                        cc.log('Remote write file failed.');
                    }
                } else {
                    cc.log('Remote download file failed.');
                }
            };

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                cc.log("xhr.readyState  " + xhr.readyState);
                cc.log("xhr.status  " + xhr.status);
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        saveFile(xhr.response);
                    } else {
                        saveFile(null);
                    }
                }
            }.bind(this);
            xhr.responseType = 'arraybuffer';
            xhr.open("GET", url, true);
            xhr.send();
        } else {
            sprite.loadRemoteImage({ url: url, view: view })
        }
    }

    /**
     * 将a的坐标转为b可以使用的坐标系
     */
    converPosition(a: cc.Node, b: cc.Node) {
        //获取a的世界坐标
        var a2world = a.parent.convertToWorldSpaceAR(a.position);
        var p = b.parent.convertToNodeSpaceAR(a2world);
        return new cc.Vec2(p.x, p.y);
    }

    getLocalHeadPicName() {
        return this.LocalHeadPicName || null
    }
    /**
     * 转换为base64
     * @param bytes 
     */
    _arrayBufferToBase64(bytes) {
        var base64 = '';
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var byteLength = bytes.byteLength;
        var byteRemainder = byteLength % 3;
        var mainLength = byteLength - byteRemainder;
        var a, b, c, d;
        var chunk;
        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
            d = chunk & 63; // 63 = 2^6 - 1
            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }
        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];
            a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2;
            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4 // 3 = 2^2 - 1;
            base64 += encodings[a] + encodings[b] + '==';
        }
        else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
            a = (chunk & 16128) >> 8 // 16128 = (2^6 - 1) << 8;
            b = (chunk & 1008) >> 4 // 1008 = (2^6 - 1) << 4;
            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2 // 15 = 2^4 - 1;
            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }
        return "data:image/jpeg;base64," + base64;
        // return base64;

    }
    /**
     * 上传头像
     */
    getUpLoadPhotoBase64(path) {
        if (CC_JSB) {
            // let path = this.getLocalHeadPicName()
            if (path) {
                this.LocalHeadPicName = path
            }
            G.Logger.log('path' + path)
            let data = null
            if (jsb.fileUtils.isFileExist(path)) {
                data = (jsb.fileUtils as any).getDataFromFile(path);
                data = this._arrayBufferToBase64(data)
            }
            G.Logger.log(data)
            if (data == null) return null;
            return data

        }

    }
    /**
     * 检测游戏是否安装
     */
    checkGameInstall(gameName) {
        if (CC_JSB) {
            let gamePath = `assets/${gameName}`
            return jsb.fileUtils.isFileExist(gamePath)
        }
    }

    /**
     * 获取游戏版本号
     */
    getGameManifestVersion(gameName) {
        if (CC_JSB) {
            let manifestUrl = `${gameName}_project.manifest`;
            if (jsb.fileUtils.isFileExist(manifestUrl)) {
                let content = jsb.fileUtils.getStringFromFile(manifestUrl);
                let mainifest = JSON.parse(content)
                G.Logger.log('获取游戏版本号=', mainifest.version);
                return mainifest.version
            }
        }
        return null
    }
    /**
     * 截图并保存到本地
     */
    captureTexture(node: cc.Node) {

        let captureUtil = this.getCatureUitl()
        if (captureUtil && node) {
            captureUtil.capture(node)
        }

    }

    getCatureUitl() {
        return CaptureUtil.Instance();
    }
    pushWindows(pushData) {
        let pop = User._popWindows.findIndex(popWindow => { return popWindow[0] == pushData[0] });
        if (pop == -1) User._popWindows.push(pushData);
    }
    popWindows(popName?: String) {
        if (User._popWindows.length) {
            User._popWindows = User._popWindows.sort((a, b) => { return a[2] - b[2] })
            // User._popWindows.forEach((wd, i) => {
            //     if (wd[0] == popName) {
            //         dispatch(wd[0], wd[1]);
            //         User._popWindows.splice(i, 1);
            //     }
            // });

            dispatch(User._popWindows[0][0], User._popWindows[0][1]);
            User._popWindows.splice(0, 1);

        }
    }
}

export const UtilMgr = new _UtilMgr();

