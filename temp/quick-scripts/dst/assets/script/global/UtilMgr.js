
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/global/UtilMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '00df3PHuQhKipg6UdtdI0Y7', 'UtilMgr');
// script/global/UtilMgr.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilMgr = void 0;
const Config_1 = require("../common/config/Config");
const Defines_1 = require("../framework/base/Defines");
const Operation_1 = __importDefault(require("../framework/extentions/Operation"));
const Manager_1 = require("../common/manager/Manager");
const CaptureUtil_1 = __importDefault(require("../common/component/CaptureUtil"));
const User_1 = require("./User");
/**
 * 工具通用
 */
class _UtilMgr {
    constructor() {
        this.LocalHeadPicName = null;
    }
    spreadMoney(num) {
        if (isNaN(num)) {
            return num;
        }
        return Operation_1.default.mul(num, 10000);
    }
    shrinkMoney(num) {
        if (isNaN(num)) {
            return num;
        }
        return Operation_1.default.div(num, 10000);
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
        }
        else if (typeof num == "number") {
            num = num / 10000;
        }
        else {
            cc.error("parameter type error");
            return;
        }
        let bFu = false;
        if (num < 0) {
            bFu = true;
            num *= -1;
        }
        let str = '';
        if (isParseInt || num < 0.01)
            num = parseInt(num);
        if (num.toString().indexOf('.') != -1) {
            if (bPlaceholder) {
                str = exports.UtilMgr.formatMoney(exports.UtilMgr.toFixed(num, 2).toString(), true);
            }
            else {
                str = exports.UtilMgr.toFixed(num, 2).toString();
            }
            str = exports.UtilMgr.toPadding(str, 2); //策划说需要补零
        }
        else {
            if (bPlaceholder) {
                str = exports.UtilMgr.formatMoney(num.toString(), false);
            }
            else {
                str = num.toString();
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
    abbrMoney(num) {
        num /= 10000;
        let str = '';
        if (num >= 10000000000) { //十亿及以上
            str = (Math.floor(num / 10000000) / 100).toString();
            if (str.indexOf('.') != -1) {
                str = Number(str).toFixed(2) + "B";
            }
            else {
                str = str + "B";
            }
        }
        else if (num >= 10000000) { //一百万及以上
            str = (Math.floor(num / 10000) / 100).toString();
            if (str.indexOf('.') != -1) {
                str = this.toFixed(Number(str), 2) + "M";
            }
            else {
                str = str + "M";
            }
        }
        else if (num >= 10000) { //一千及以上
            str = (Math.floor(num / 10) / 100).toString();
            if (str.indexOf('.') != -1) {
                str = this.toFixed(Number(str), 2) + "K";
            }
            else {
                str = str + "K";
            }
        }
        else { //小于1千
            if (num.toString().indexOf('.') != -1) {
                str = this.toFixed(num, 2).toString();
            }
            else {
                str = num.toString();
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
    toFixed(num, places) {
        let result = num;
        let strNum = num.toString();
        if (strNum.indexOf(".") > 0) {
            let arrNum = strNum.split(".");
            let frontNum = arrNum[0] + ".";
            let rearNum = arrNum[1];
            for (let i = 0; i < places; ++i) {
                let index = rearNum[i];
                if (index) {
                    frontNum += index;
                }
                else {
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
    toPadding(num, places) {
        const POINT = ".";
        const ZERO = "0";
        let strResult = "";
        if (typeof (num) === "string") {
            strResult = num;
        }
        else {
            strResult = num.toString();
        }
        let pointIndex = strResult.indexOf(POINT);
        let perchCount = 0;
        if (pointIndex < 0) {
            perchCount = places;
            strResult += POINT;
        }
        else {
            perchCount = places - (strResult.length - (pointIndex + 1));
        }
        for (let i = 0; i < perchCount; ++i) {
            strResult += ZERO;
        }
        return strResult;
    }
    /**
     * 格式化数字
     */
    formatMoney(num, bFloat) {
        let numArr = [];
        let floatArr = [];
        if (bFloat) {
            floatArr = num.split(".");
            numArr = floatArr[0].split("");
        }
        else {
            numArr = num.split("");
        }
        let index = 0;
        for (let i = numArr.length - 1; i >= 0; i--) {
            index++;
            if (index == 3 && i != 0) {
                numArr.splice(i, 0, ",");
                index = 0;
            }
        }
        let newMoney = "";
        numArr.forEach((char) => {
            newMoney = newMoney + char;
        });
        if (bFloat && floatArr[1] !== undefined) {
            newMoney = newMoney + "." + floatArr[1];
        }
        return newMoney;
    }
    /**
     * 恢复数字
     */
    recoverMoney(num) {
        let str = "";
        if (typeof num == "string") {
            str = num;
        }
        else if (typeof num == "number") {
            str = num.toString();
        }
        else {
            cc.error("parameter type error");
            return;
        }
        let reg = new RegExp(",", "g");
        return Number(str.replace(reg, ""));
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
        str = str.toString();
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                strlen += 2;
            }
            else {
                strlen++;
            }
            s += str.charAt(i);
            if (strlen > len) {
                if (omit) {
                    return s + "...";
                }
                else {
                    return s;
                }
            }
        }
        return s;
    }
    setBankCardStringCover(str, start = 0, end = 4) {
        let newStr;
        if (typeof str == "string") {
            newStr = str;
        }
        else if (typeof str == "number") {
            newStr = str.toString();
        }
        else {
            cc.error("parameter srr type error");
            return;
        }
        var s = "";
        for (let index = 0; index < newStr.length; index++) {
            if (index >= start && index < newStr.length - end) {
                s += "*";
            }
            else {
                s += newStr.charAt(index);
            }
            if ((index + 1) % 4 == 0 && index > 0) {
                s += " ";
            }
        }
        return s;
    }
    setStringCover(str, start = 0, end = 4) {
        let newStr;
        if (typeof str == "string") {
            newStr = str;
        }
        else if (typeof str == "number") {
            newStr = str.toString();
        }
        else {
            cc.error("parameter srr type error");
            return;
        }
        var s = "";
        for (let index = 0; index < newStr.length; index++) {
            if (index >= start && index < newStr.length - end) {
                s += "*";
            }
            else {
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
        let index = userId % 7 + 1;
        return index;
    }
    /**
     * 获取本地头像地址
     */
    getLocalHeadPath(userId) {
        let index = exports.UtilMgr.getLocalHeadIndex(userId);
        return Config_1.Config.avatar_path + index;
    }
    /**
     * 加载头像
     * @param head
     * @param headImg
     * @param userId
     * @param view
     */
    loadHeadImg(head, headImg, userId, view) {
        if (headImg && headImg.length > 0) {
            if (headImg.indexOf("http") != -1) {
                head.loadRemoteImage({ url: headImg, view: view, defaultSpriteFrame: Config_1.Config.headImage_default });
            }
            else {
                if (headImg.indexOf("head") != -1) {
                    headImg = Config_1.Config.headImageURL + headImg;
                    head.loadRemoteImage({ url: headImg, view: view, defaultSpriteFrame: Config_1.Config.headImage_default });
                }
                else if (headImg.indexOf("base") != -1) {
                    headImg = headImg.slice(headImg.indexOf("_") + 1, headImg.indexOf('.'));
                    headImg = Config_1.Config.avatar_path + headImg;
                    head.loadImage({ url: headImg, view: view, bundle: Defines_1.BUNDLE_RESOURCES });
                }
                else if (headImg.length == 1) {
                    let avartarPath = Config_1.Config.avatar_path + (Number(headImg) + 1);
                    head.loadImage({ url: avartarPath, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
                }
                else {
                    G.Logger.error('headImg 格式不对');
                }
            }
        }
        else {
            headImg = this.getLocalHeadPath(userId);
            head.loadImage({ url: headImg, view: view, bundle: Defines_1.BUNDLE_RESOURCES });
        }
        if (head) {
            head.node["userId"] = userId;
            head.node.off("click");
            if (head.node.getComponent(cc.Button) == null) {
                head.node.addComponent(cc.Button);
            }
            head.node.on("click", () => {
                // head.node.off(cc.Node.EventType.TOUCH_END);
                // head.node.on(cc.Node.EventType.TOUCH_END, () => {
                Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
                dispatch("OpenUserHeadInfo", { userID: head.node["userId"] });
            }, this);
        }
    }
    /**
     * 下载网络图片到本地显示
     * @param url
     * @param callback
     */
    downloadImg(url, sprite, callback, view) {
        function loadEnd() {
            cc.loader.load(filepath, function (err, tex) {
                if (err) {
                    cc.error(err);
                }
                else {
                    var spriteFrame = new cc.SpriteFrame(tex);
                    if (spriteFrame) {
                        callback(spriteFrame);
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
                    }
                    else {
                        cc.log('Remote write file failed.');
                    }
                }
                else {
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
                    }
                    else {
                        saveFile(null);
                    }
                }
            }.bind(this);
            xhr.responseType = 'arraybuffer';
            xhr.open("GET", url, true);
            xhr.send();
        }
        else {
            sprite.loadRemoteImage({ url: url, view: view });
        }
    }
    /**
     * 将a的坐标转为b可以使用的坐标系
     */
    converPosition(a, b) {
        //获取a的世界坐标
        var a2world = a.parent.convertToWorldSpaceAR(a.position);
        var p = b.parent.convertToNodeSpaceAR(a2world);
        return new cc.Vec2(p.x, p.y);
    }
    getLocalHeadPicName() {
        return this.LocalHeadPicName || null;
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
            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2;
            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4; // 3 = 2^2 - 1;
            base64 += encodings[a] + encodings[b] + '==';
        }
        else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
            a = (chunk & 16128) >> 8; // 16128 = (2^6 - 1) << 8;
            b = (chunk & 1008) >> 4; // 1008 = (2^6 - 1) << 4;
            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2; // 15 = 2^4 - 1;
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
                this.LocalHeadPicName = path;
            }
            G.Logger.log('path' + path);
            let data = null;
            if (jsb.fileUtils.isFileExist(path)) {
                data = jsb.fileUtils.getDataFromFile(path);
                data = this._arrayBufferToBase64(data);
            }
            G.Logger.log(data);
            if (data == null)
                return null;
            return data;
        }
    }
    /**
     * 检测游戏是否安装
     */
    checkGameInstall(gameName) {
        if (CC_JSB) {
            let gamePath = `assets/${gameName}`;
            return jsb.fileUtils.isFileExist(gamePath);
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
                let mainifest = JSON.parse(content);
                G.Logger.log('获取游戏版本号=', mainifest.version);
                return mainifest.version;
            }
        }
        return null;
    }
    /**
     * 截图并保存到本地
     */
    captureTexture(node) {
        let captureUtil = this.getCatureUitl();
        if (captureUtil && node) {
            captureUtil.capture(node);
        }
    }
    getCatureUitl() {
        return CaptureUtil_1.default.Instance();
    }
    pushWindows(pushData) {
        let pop = User_1.User._popWindows.findIndex(popWindow => { return popWindow[0] == pushData[0]; });
        if (pop == -1)
            User_1.User._popWindows.push(pushData);
    }
    popWindows(popName) {
        if (User_1.User._popWindows.length) {
            User_1.User._popWindows = User_1.User._popWindows.sort((a, b) => { return a[2] - b[2]; });
            // User._popWindows.forEach((wd, i) => {
            //     if (wd[0] == popName) {
            //         dispatch(wd[0], wd[1]);
            //         User._popWindows.splice(i, 1);
            //     }
            // });
            dispatch(User_1.User._popWindows[0][0], User_1.User._popWindows[0][1]);
            User_1.User._popWindows.splice(0, 1);
        }
    }
}
exports.UtilMgr = new _UtilMgr();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZ2xvYmFsL1V0aWxNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQWlEO0FBQ2pELHVEQUE2RDtBQUM3RCxrRkFBMEQ7QUFHMUQsdURBQW9EO0FBR3BELGtGQUEwRDtBQUMxRCxpQ0FBOEI7QUFJOUI7O0dBRUc7QUFDSCxNQUFNLFFBQVE7SUFBZDtRQUVJLHFCQUFnQixHQUFHLElBQUksQ0FBQztJQTBuQjVCLENBQUM7SUF6bkJHLFdBQVcsQ0FBQyxHQUFXO1FBQ25CLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1osT0FBTyxHQUFHLENBQUM7U0FDZDtRQUNELE9BQU8sbUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBVztRQUNuQixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNaLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLG1CQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxXQUFXLENBQUMsR0FBRyxFQUFFLFlBQVksR0FBRyxJQUFJLEVBQUUsVUFBVSxHQUFHLEtBQUs7UUFDcEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDeEIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDN0I7YUFBTSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUMvQixHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNyQjthQUFNO1lBQ0gsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1lBQ2hDLE9BQU07U0FDVDtRQUVELElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNoQixJQUFJLEdB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LENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFFLHdDQUF3QztZQUN4Qyw4QkFBOEI7WUFDOUIsa0NBQWtDO1lBQ2xDLHlDQUF5QztZQUN6QyxRQUFRO1lBQ1IsTUFBTTtZQUVOLFFBQVEsQ0FBQyxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxXQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FFakM7SUFDTCxDQUFDO0NBQ0o7QUFFWSxRQUFBLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSG90VXBkYXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9iYXNlL0hvdFVwZGF0ZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBPcGVyYXRpb24gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlbnRpb25zL09wZXJhdGlvblwiO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0UGFja2dlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvSHR0cENsaWVudFwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL3VzZXJJbmZvL1VzZXJJbmZvXCI7XG5pbXBvcnQgeyBnZXRTaW5nbGV0b24gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvU2luZ2xldG9uXCI7XG5pbXBvcnQgQ2FwdHVyZVV0aWwgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvQ2FwdHVyZVV0aWxcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9Vc2VyXCI7XG5pbXBvcnQgeyBIYWxsQ29uZmlnIH0gZnJvbSBcIi4uL2hhbGwvSGFsbE5ldENvbnRyb2xsZXJcIjtcbmltcG9ydCBUeXBlVXRpbHMgZnJvbSBcIi4uL2NvbW1vbi91dGlscy9UeXBlVXRpbHNcIjtcblxuLyoqXG4gKiDlt6XlhbfpgJrnlKhcbiAqL1xuY2xhc3MgX1V0aWxNZ3Ige1xuXG4gICAgTG9jYWxIZWFkUGljTmFtZSA9IG51bGw7XG4gICAgc3ByZWFkTW9uZXkobnVtOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoaXNOYU4obnVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT3BlcmF0aW9uLm11bChudW0sIDEwMDAwKTtcbiAgICB9XG5cbiAgICBzaHJpbmtNb25leShudW06IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmIChpc05hTihudW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPcGVyYXRpb24uZGl2KG51bSwgMTAwMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi9rOaNoumHkeW4geaYvuekuuinhOWImVxuICAgICAqIOWAvFxuICAgICAqIOaYr+WQpuagvOW8j+WMllxuICAgICAqIOaYr+WQpui/lOWbnuaVtOaVsFxuICAgICAqL1xuICAgIGNoYW5nZU1vbmV5KG51bSwgYlBsYWNlaG9sZGVyID0gdHJ1ZSwgaXNQYXJzZUludCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbnVtID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG51bSA9IE51bWJlcihudW0pIC8gMTAwMDA7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBudW0gPSBudW0gLyAxMDAwMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9yKFwicGFyYW1ldGVyIHR5cGUgZXJyb3JcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJGdSA9IGZhbHNlO1xuICAgICAgICBpZiAobnVtIDwgMCkge1xuICAgICAgICAgICAgYkZ1ID0gdHJ1ZTtcbiAgICAgICAgICAgIG51bSAqPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdHIgPSAnJ1xuICAgICAgICBpZiAoaXNQYXJzZUludCB8fCBudW0gPCAwLjAxKSBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICBpZiAobnVtLnRvU3RyaW5nKCkuaW5kZXhPZignLicpICE9IC0xKSB7XG4gICAgICAgICAgICBpZiAoYlBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgc3RyID0gVXRpbE1nci5mb3JtYXRNb25leShVdGlsTWdyLnRvRml4ZWQobnVtLCAyKS50b1N0cmluZygpLCB0cnVlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgPSBVdGlsTWdyLnRvRml4ZWQobnVtLCAyKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyID0gVXRpbE1nci50b1BhZGRpbmcoc3RyLCAyKS8v562W5YiS6K+06ZyA6KaB6KGl6Zu2XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYlBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgc3RyID0gVXRpbE1nci5mb3JtYXRNb25leShudW0udG9TdHJpbmcoKSwgZmFsc2UpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0ciA9IG51bS50b1N0cmluZygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIChudW0gPj0gMTAwMDAwMDAwMCkgeyAvL+WNgeS6v+WPiuS7peS4ilxuICAgICAgICAvLyAgICBzdHIgPSAoTWF0aC5mbG9vcihudW0gLyAxMDAwMDAwMCkgLyAxMDApLnRvU3RyaW5nKClcbiAgICAgICAgLy8gICAgaWYgKHN0ci5pbmRleE9mKCcuJykgIT0gLTEpIHtcbiAgICAgICAgLy8gICAgICAgIHN0ciA9IE51bWJlcihzdHIpLnRvRml4ZWQoMikgKyBcIkJcIjtcbiAgICAgICAgLy8gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgIHN0ciA9IHN0ciArIFwiQlwiO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuICAgICAgICAvL2Vsc2UgaWYgKG51bSA+PSAxMDAwMDAwKSB7IC8v5LiA55m+5LiH5Y+K5Lul5LiKXG4gICAgICAgIC8vICAgIHN0ciA9IChNYXRoLmZsb29yKG51bSAvIDEwMDAwKSAvIDEwMCkudG9TdHJpbmcoKVxuICAgICAgICAvLyAgICBpZiAoc3RyLmluZGV4T2YoJy4nKSAhPSAtMSkge1xuICAgICAgICAvLyAgICAgICAgc3RyID0gTnVtYmVyKHN0cikudG9GaXhlZCgyKSArIFwiTVwiO1xuICAgICAgICAvLyAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgc3RyID0gc3RyICsgXCJNXCI7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy99XG4gICAgICAgIC8vZWxzZSBpZiAobnVtID49IDEwMDApIHsgLy/kuIDljYPlj4rku6XkuIpcbiAgICAgICAgLy8gICAgc3RyID0gKE1hdGguZmxvb3IobnVtIC8gMTApIC8gMTAwKS50b1N0cmluZygpXG4gICAgICAgIC8vICAgIGlmIChzdHIuaW5kZXhPZignLicpICE9IC0xKSB7XG4gICAgICAgIC8vICAgICAgICBzdHIgPSBOdW1iZXIoc3RyKS50b0ZpeGVkKDIpICsgXCJLXCI7XG4gICAgICAgIC8vICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICBzdHIgPSBzdHIgKyBcIktcIjtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIHsgLy/lsI/kuo4x5Y2DXG4gICAgICAgIC8vICAgIGlmIChudW0udG9TdHJpbmcoKS5pbmRleE9mKCcuJykgIT0gLTEpIHtcbiAgICAgICAgLy8gICAgICAgIHN0ciA9IG51bS50b0ZpeGVkKDIpXG4gICAgICAgIC8vICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICBzdHIgPSBudW0udG9TdHJpbmcoKVxuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuXG4gICAgICAgIGlmIChiRnUpIHtcbiAgICAgICAgICAgIHN0ciA9IFwiLVwiICsgc3RyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgYWJick1vbmV5KG51bSk6IHN0cmluZyB7XG4gICAgICAgIG51bSAvPSAxMDAwMDtcbiAgICAgICAgbGV0IHN0ciA9ICcnXG4gICAgICAgIGlmIChudW0gPj0gMTAwMDAwMDAwMDApIHsgLy/ljYHkur/lj4rku6XkuIpcbiAgICAgICAgICAgIHN0ciA9IChNYXRoLmZsb29yKG51bSAvIDEwMDAwMDAwKSAvIDEwMCkudG9TdHJpbmcoKVxuICAgICAgICAgICAgaWYgKHN0ci5pbmRleE9mKCcuJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdHIgPSBOdW1iZXIoc3RyKS50b0ZpeGVkKDIpICsgXCJCXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArIFwiQlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bSA+PSAxMDAwMDAwMCkgeyAvL+S4gOeZvuS4h+WPiuS7peS4ilxuICAgICAgICAgICAgc3RyID0gKE1hdGguZmxvb3IobnVtIC8gMTAwMDApIC8gMTAwKS50b1N0cmluZygpXG4gICAgICAgICAgICBpZiAoc3RyLmluZGV4T2YoJy4nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHN0ciA9IHRoaXMudG9GaXhlZChOdW1iZXIoc3RyKSwgMikgKyBcIk1cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyID0gc3RyICsgXCJNXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtID49IDEwMDAwKSB7IC8v5LiA5Y2D5Y+K5Lul5LiKXG4gICAgICAgICAgICBzdHIgPSAoTWF0aC5mbG9vcihudW0gLyAxMCkgLyAxMDApLnRvU3RyaW5nKClcbiAgICAgICAgICAgIGlmIChzdHIuaW5kZXhPZignLicpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgc3RyID0gdGhpcy50b0ZpeGVkKE51bWJlcihzdHIpLCAyKSArIFwiS1wiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyBcIktcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy/lsI/kuo4x5Y2DXG4gICAgICAgICAgICBpZiAobnVtLnRvU3RyaW5nKCkuaW5kZXhPZignLicpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgc3RyID0gdGhpcy50b0ZpeGVkKG51bSwgMikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyID0gbnVtLnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG51bSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0ciA9IFwiMFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+d55WZ5bCP5pWw5ZCO5Yeg5L2N77yI55Sx5LqOanPljp/nlJ90b0ZpeGVk5pa55rOV5Lya5Zub6IiN5LqU5YWl77yM5peg5rOV6L6+5Yiw5oOz6KaB5pWI5p6c77yM5omA5Lul5omN5YaZ5LqG5LiA5Liq5pa55rOV77yJXG4gICAgICogQHBhcmFtIG51bSB7bnVtYmVyfSDmlbBcbiAgICAgKiBAcGFyYW0gcGxhY2VzIHtudW1iZXJ9IOS9jeaVsFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICB0b0ZpeGVkKG51bTogbnVtYmVyLCBwbGFjZXM6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IG51bTtcbiAgICAgICAgbGV0IHN0ck51bTogc3RyaW5nID0gbnVtLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChzdHJOdW0uaW5kZXhPZihcIi5cIikgPiAwKSB7XG4gICAgICAgICAgICBsZXQgYXJyTnVtOiBBcnJheTxzdHJpbmc+ID0gc3RyTnVtLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIGxldCBmcm9udE51bTogc3RyaW5nID0gYXJyTnVtWzBdICsgXCIuXCI7XG4gICAgICAgICAgICBsZXQgcmVhck51bTogc3RyaW5nID0gYXJyTnVtWzFdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZXM7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHJlYXJOdW1baV07XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb250TnVtICs9IGluZGV4O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IE51bWJlcihmcm9udE51bSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOihpem9kOWwj+aVsOWQjueahOWNoOS9jeespjBcbiAgICAgKiBAcGFyYW0gbnVtIHtudW1iZXIgfCBzdHJpbmd9IOaVsFxuICAgICAqIEBwYXJhbSBwbGFjZXMge251bWJlcn0g5L2N5pWwXG4gICAgICovXG4gICAgdG9QYWRkaW5nKG51bTogbnVtYmVyIHwgc3RyaW5nLCBwbGFjZXM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IFBPSU5UOiBzdHJpbmcgPSBcIi5cIjtcbiAgICAgICAgY29uc3QgWkVSTzogc3RyaW5nID0gXCIwXCI7XG4gICAgICAgIGxldCBzdHJSZXN1bHQ6IHN0cmluZyA9IFwiXCJcbiAgICAgICAgaWYgKHR5cGVvZiAobnVtKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgc3RyUmVzdWx0ID0gbnVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyUmVzdWx0ID0gbnVtLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBvaW50SW5kZXggPSBzdHJSZXN1bHQuaW5kZXhPZihQT0lOVCk7XG4gICAgICAgIGxldCBwZXJjaENvdW50OiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAocG9pbnRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHBlcmNoQ291bnQgPSBwbGFjZXM7XG4gICAgICAgICAgICBzdHJSZXN1bHQgKz0gUE9JTlQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZXJjaENvdW50ID0gcGxhY2VzIC0gKHN0clJlc3VsdC5sZW5ndGggLSAocG9pbnRJbmRleCArIDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBwZXJjaENvdW50OyArK2kpIHtcbiAgICAgICAgICAgIHN0clJlc3VsdCArPSBaRVJPO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0clJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLzlvI/ljJbmlbDlrZdcbiAgICAgKi9cbiAgICBmb3JtYXRNb25leShudW0sIGJGbG9hdCkge1xuICAgICAgICBsZXQgbnVtQXJyID0gW11cbiAgICAgICAgbGV0IGZsb2F0QXJyID0gW11cbiAgICAgICAgaWYgKGJGbG9hdCkge1xuICAgICAgICAgICAgZmxvYXRBcnIgPSBudW0uc3BsaXQoXCIuXCIpXG4gICAgICAgICAgICBudW1BcnIgPSBmbG9hdEFyclswXS5zcGxpdChcIlwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtQXJyID0gbnVtLnNwbGl0KFwiXCIpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSBudW1BcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAzICYmIGkgIT0gMCkge1xuICAgICAgICAgICAgICAgIG51bUFyci5zcGxpY2UoaSwgMCwgXCIsXCIpXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3TW9uZXkgPSBcIlwiXG4gICAgICAgIG51bUFyci5mb3JFYWNoKChjaGFyKSA9PiB7XG4gICAgICAgICAgICBuZXdNb25leSA9IG5ld01vbmV5ICsgY2hhclxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGJGbG9hdCAmJiBmbG9hdEFyclsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZXdNb25leSA9IG5ld01vbmV5ICsgXCIuXCIgKyBmbG9hdEFyclsxXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld01vbmV5XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5oGi5aSN5pWw5a2XXG4gICAgICovXG4gICAgcmVjb3Zlck1vbmV5KG51bSkge1xuICAgICAgICBsZXQgc3RyID0gXCJcIlxuICAgICAgICBpZiAodHlwZW9mIG51bSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBzdHIgPSBudW1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbnVtID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHN0ciA9IG51bS50b1N0cmluZygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5lcnJvcihcInBhcmFtZXRlciB0eXBlIGVycm9yXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWcgPSBuZXcgUmVnRXhwKFwiLFwiLCBcImdcIilcbiAgICAgICAgcmV0dXJuIE51bWJlcihzdHIucmVwbGFjZShyZWcsIFwiXCIpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeaXtumXtO+8jOagvOW8j1lZWVktTU0tRERcbiAgICAgKi9cbiAgICBnZXROb3dGb3JtYXREYXRlKCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBzZXBlcmF0b3IxID0gXCItXCI7XG4gICAgICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICB2YXIgc3RyRGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgbW9udGhzdHIgPSBtb250aC50b1N0cmluZygpO1xuICAgICAgICBpZiAobW9udGggPj0gMSAmJiBtb250aCA8PSA5KSB7XG4gICAgICAgICAgICBtb250aHN0ciA9IFwiMFwiICsgbW9udGg7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0ckRhdGVzdHIgPSBzdHJEYXRlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChzdHJEYXRlID49IDAgJiYgc3RyRGF0ZSA8PSA5KSB7XG4gICAgICAgICAgICBzdHJEYXRlc3RyID0gXCIwXCIgKyBzdHJEYXRlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50ZGF0ZSA9IHllYXIgKyBzZXBlcmF0b3IxICsgbW9udGhzdHIgKyBzZXBlcmF0b3IxICsgc3RyRGF0ZXN0cjtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRkYXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0cmluZ+aIquWPluS4gOWumumVv+W6pijljZXkuKrlrZfmr43ljaAxKVxuICAgICAqL1xuICAgIHNldFN0cmluZyhzdHIsIGxlbiA9IDEwLCBvbWl0ID0gdHJ1ZSkge1xuICAgICAgICB2YXIgc3RybGVuID0gMDtcbiAgICAgICAgdmFyIHMgPSBcIlwiO1xuICAgICAgICBzdHIgPSBzdHIudG9TdHJpbmcoKVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHN0ci5jaGFyQ29kZUF0KGkpID4gMTI4KSB7XG4gICAgICAgICAgICAgICAgc3RybGVuICs9IDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0cmxlbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgaWYgKHN0cmxlbiA+IGxlbikge1xuICAgICAgICAgICAgICAgIGlmIChvbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzICsgXCIuLi5cIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHNldEJhbmtDYXJkU3RyaW5nQ292ZXIoc3RyLCBzdGFydCA9IDAsIGVuZCA9IDQpIHtcbiAgICAgICAgbGV0IG5ld1N0clxuICAgICAgICBpZiAodHlwZW9mIHN0ciA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBuZXdTdHIgPSBzdHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIG5ld1N0ciA9IHN0ci50b1N0cmluZygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5lcnJvcihcInBhcmFtZXRlciBzcnIgdHlwZSBlcnJvclwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbmV3U3RyLmxlbmd0aDsgaW5kZXgrKykge1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gc3RhcnQgJiYgaW5kZXggPCBuZXdTdHIubGVuZ3RoIC0gZW5kKSB7XG4gICAgICAgICAgICAgICAgcyArPSBcIipcIjtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzICs9IG5ld1N0ci5jaGFyQXQoaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKGluZGV4ICsgMSkgJSA0ID09IDAgJiYgaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgcyArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc2V0U3RyaW5nQ292ZXIoc3RyLCBzdGFydCA9IDAsIGVuZCA9IDQpIHtcbiAgICAgICAgbGV0IG5ld1N0clxuICAgICAgICBpZiAodHlwZW9mIHN0ciA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBuZXdTdHIgPSBzdHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIG5ld1N0ciA9IHN0ci50b1N0cmluZygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5lcnJvcihcInBhcmFtZXRlciBzcnIgdHlwZSBlcnJvclwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbmV3U3RyLmxlbmd0aDsgaW5kZXgrKykge1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gc3RhcnQgJiYgaW5kZXggPCBuZXdTdHIubGVuZ3RoIC0gZW5kKSB7XG4gICAgICAgICAgICAgICAgcyArPSBcIipcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyArPSBuZXdTdHIuY2hhckF0KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdHJpbmfplb/luqZcbiAgICAgKi9cbiAgICBzdHJMZW4oc3RyKSB7XG4gICAgICAgIGxldCBsZW4gPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHN0ci5jaGFyQ29kZUF0KGkpID4gMjU1IHx8IHN0ci5jaGFyQ29kZUF0KGkpIDwgMCkge1xuICAgICAgICAgICAgICAgIGxlbiArPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVuKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmjIflrprojIPlm7Tpmo/mnLrmlbBcbiAgICAgKi9cbiAgICByYW5kb20obWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpITnkIbmta7ngrnmlbDorqHnrpfkuKLlpLHnsr7luqbpl67pophcbiAgICAgKi9cbiAgICBmb3JtYXRGbG9hdChmKSB7XG4gICAgICAgIHZhciBtID0gTWF0aC5wb3coMTAsIDIpO1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChmICogbSkgLyBtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluacrOWcsOWktOWDj+e0ouW8lSAyIC0gMTZcbiAgICAgKi9cbiAgICBnZXRMb2NhbEhlYWRJbmRleCh1c2VySWQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdXNlcklkICUgNyArIDFcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5pys5Zyw5aS05YOP5Zyw5Z2AXG4gICAgICovXG4gICAgZ2V0TG9jYWxIZWFkUGF0aCh1c2VySWQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gVXRpbE1nci5nZXRMb2NhbEhlYWRJbmRleCh1c2VySWQpXG4gICAgICAgIHJldHVybiBDb25maWcuYXZhdGFyX3BhdGggKyBpbmRleFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9veWktOWDj1xuICAgICAqIEBwYXJhbSBoZWFkIFxuICAgICAqIEBwYXJhbSBoZWFkSW1nIFxuICAgICAqIEBwYXJhbSB1c2VySWQgXG4gICAgICogQHBhcmFtIHZpZXcgXG4gICAgICovXG4gICAgbG9hZEhlYWRJbWcoaGVhZDogY2MuU3ByaXRlLCBoZWFkSW1nOiBzdHJpbmcsIHVzZXJJZDogbnVtYmVyIHwgTG9uZywgdmlldzogVUlWaWV3KSB7XG4gICAgICAgIGlmIChoZWFkSW1nICYmIGhlYWRJbWcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGhlYWRJbWcuaW5kZXhPZihcImh0dHBcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBoZWFkLmxvYWRSZW1vdGVJbWFnZSh7IHVybDogaGVhZEltZywgdmlldzogdmlldywgZGVmYXVsdFNwcml0ZUZyYW1lOiBDb25maWcuaGVhZEltYWdlX2RlZmF1bHQgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGhlYWRJbWcuaW5kZXhPZihcImhlYWRcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZEltZyA9IENvbmZpZy5oZWFkSW1hZ2VVUkwgKyBoZWFkSW1nO1xuICAgICAgICAgICAgICAgICAgICBoZWFkLmxvYWRSZW1vdGVJbWFnZSh7IHVybDogaGVhZEltZywgdmlldzogdmlldywgZGVmYXVsdFNwcml0ZUZyYW1lOiBDb25maWcuaGVhZEltYWdlX2RlZmF1bHQgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhlYWRJbWcuaW5kZXhPZihcImJhc2VcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZEltZyA9IGhlYWRJbWcuc2xpY2UoaGVhZEltZy5pbmRleE9mKFwiX1wiKSArIDEsIGhlYWRJbWcuaW5kZXhPZignLicpKTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZEltZyA9IENvbmZpZy5hdmF0YXJfcGF0aCArIGhlYWRJbWdcbiAgICAgICAgICAgICAgICAgICAgaGVhZC5sb2FkSW1hZ2UoeyB1cmw6IGhlYWRJbWcsIHZpZXc6IHZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVhZEltZy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXZhcnRhclBhdGggPSBDb25maWcuYXZhdGFyX3BhdGggKyAoTnVtYmVyKGhlYWRJbWcpICsgMSlcbiAgICAgICAgICAgICAgICAgICAgaGVhZC5sb2FkSW1hZ2UoeyB1cmw6IGF2YXJ0YXJQYXRoLCB2aWV3OiB0aGlzLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEcuTG9nZ2VyLmVycm9yKCdoZWFkSW1nIOagvOW8j+S4jeWvuScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlYWRJbWcgPSB0aGlzLmdldExvY2FsSGVhZFBhdGgodXNlcklkKVxuICAgICAgICAgICAgaGVhZC5sb2FkSW1hZ2UoeyB1cmw6IGhlYWRJbWcsIHZpZXc6IHZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChoZWFkKSB7XG4gICAgICAgICAgICBoZWFkLm5vZGVbXCJ1c2VySWRcIl0gPSB1c2VySWQ7XG4gICAgICAgICAgICBoZWFkLm5vZGUub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBpZiAoaGVhZC5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBoZWFkLm5vZGUuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhlYWQubm9kZS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBoZWFkLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XG4gICAgICAgICAgICAgICAgLy8gaGVhZC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIE1hbmFnZXIuZ2xvYmFsQXVkaW8ucGxheUVmZmVjdChcImNvbW1vbi9hdWRpby9jbGlja1wiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChcIk9wZW5Vc2VySGVhZEluZm9cIiwgeyB1c2VySUQ6IGhlYWQubm9kZVtcInVzZXJJZFwiXSB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL6L29572R57uc5Zu+54mH5Yiw5pys5Zyw5pi+56S6XG4gICAgICogQHBhcmFtIHVybCBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAgICovXG4gICAgZG93bmxvYWRJbWcodXJsOiBzdHJpbmcsIHNwcml0ZTogY2MuU3ByaXRlLCBjYWxsYmFjazogRnVuY3Rpb24sIHZpZXc6IFVJVmlldykge1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRFbmQoKSB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChmaWxlcGF0aCwgZnVuY3Rpb24gKGVyciwgdGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNwcml0ZUZyYW1lKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgIHZhciBkaXJwYXRoID0ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSArICdkb3dubG9hZEltZy8nO1xuICAgICAgICAgICAgdmFyIGZpbGVwYXRoID0gZGlycGF0aCArIHVybCArICcucG5nJztcblxuICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QoZmlsZXBhdGgpKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCdSZW1vdGUgaXMgZmluZCcgKyBmaWxlcGF0aCk7XG4gICAgICAgICAgICAgICAgbG9hZEVuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNhdmVGaWxlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghanNiLmZpbGVVdGlscy5pc0RpcmVjdG9yeUV4aXN0KGRpcnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqc2IuZmlsZVV0aWxzLmNyZWF0ZURpcmVjdG9yeShkaXJwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLndyaXRlRGF0YVRvRmlsZShuZXcgVWludDhBcnJheShkYXRhKSwgZmlsZXBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ1JlbW90ZSB3cml0ZSBmaWxlIHN1Y2NlZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ1JlbW90ZSB3cml0ZSBmaWxlIGZhaWxlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnUmVtb3RlIGRvd25sb2FkIGZpbGUgZmFpbGVkLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJ4aHIucmVhZHlTdGF0ZSAgXCIgKyB4aHIucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwieGhyLnN0YXR1cyAgXCIgKyB4aHIuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZUZpbGUoeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVGaWxlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgICAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNwcml0ZS5sb2FkUmVtb3RlSW1hZ2UoeyB1cmw6IHVybCwgdmlldzogdmlldyB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bCGYeeahOWdkOagh+i9rOS4umLlj6/ku6Xkvb/nlKjnmoTlnZDmoIfns7tcbiAgICAgKi9cbiAgICBjb252ZXJQb3NpdGlvbihhOiBjYy5Ob2RlLCBiOiBjYy5Ob2RlKSB7XG4gICAgICAgIC8v6I635Y+WYeeahOS4lueVjOWdkOagh1xuICAgICAgICB2YXIgYTJ3b3JsZCA9IGEucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihhLnBvc2l0aW9uKTtcbiAgICAgICAgdmFyIHAgPSBiLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihhMndvcmxkKTtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5WZWMyKHAueCwgcC55KTtcbiAgICB9XG5cbiAgICBnZXRMb2NhbEhlYWRQaWNOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5Mb2NhbEhlYWRQaWNOYW1lIHx8IG51bGxcbiAgICB9XG4gICAgLyoqXG4gICAgICog6L2s5o2i5Li6YmFzZTY0XG4gICAgICogQHBhcmFtIGJ5dGVzIFxuICAgICAqL1xuICAgIF9hcnJheUJ1ZmZlclRvQmFzZTY0KGJ5dGVzKSB7XG4gICAgICAgIHZhciBiYXNlNjQgPSAnJztcbiAgICAgICAgdmFyIGVuY29kaW5ncyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcbiAgICAgICAgdmFyIGJ5dGVMZW5ndGggPSBieXRlcy5ieXRlTGVuZ3RoO1xuICAgICAgICB2YXIgYnl0ZVJlbWFpbmRlciA9IGJ5dGVMZW5ndGggJSAzO1xuICAgICAgICB2YXIgbWFpbkxlbmd0aCA9IGJ5dGVMZW5ndGggLSBieXRlUmVtYWluZGVyO1xuICAgICAgICB2YXIgYSwgYiwgYywgZDtcbiAgICAgICAgdmFyIGNodW5rO1xuICAgICAgICAvLyBNYWluIGxvb3AgZGVhbHMgd2l0aCBieXRlcyBpbiBjaHVua3Mgb2YgM1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1haW5MZW5ndGg7IGkgPSBpICsgMykge1xuICAgICAgICAgICAgLy8gQ29tYmluZSB0aGUgdGhyZWUgYnl0ZXMgaW50byBhIHNpbmdsZSBpbnRlZ2VyXG4gICAgICAgICAgICBjaHVuayA9IChieXRlc1tpXSA8PCAxNikgfCAoYnl0ZXNbaSArIDFdIDw8IDgpIHwgYnl0ZXNbaSArIDJdO1xuICAgICAgICAgICAgLy8gVXNlIGJpdG1hc2tzIHRvIGV4dHJhY3QgNi1iaXQgc2VnbWVudHMgZnJvbSB0aGUgdHJpcGxldFxuICAgICAgICAgICAgYSA9IChjaHVuayAmIDE2NTE1MDcyKSA+PiAxODsgLy8gMTY1MTUwNzIgPSAoMl42IC0gMSkgPDwgMThcbiAgICAgICAgICAgIGIgPSAoY2h1bmsgJiAyNTgwNDgpID4+IDEyOyAvLyAyNTgwNDggPSAoMl42IC0gMSkgPDwgMTJcbiAgICAgICAgICAgIGMgPSAoY2h1bmsgJiA0MDMyKSA+PiA2OyAvLyA0MDMyID0gKDJeNiAtIDEpIDw8IDZcbiAgICAgICAgICAgIGQgPSBjaHVuayAmIDYzOyAvLyA2MyA9IDJeNiAtIDFcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIHJhdyBiaW5hcnkgc2VnbWVudHMgdG8gdGhlIGFwcHJvcHJpYXRlIEFTQ0lJIGVuY29kaW5nXG4gICAgICAgICAgICBiYXNlNjQgKz0gZW5jb2RpbmdzW2FdICsgZW5jb2RpbmdzW2JdICsgZW5jb2RpbmdzW2NdICsgZW5jb2RpbmdzW2RdO1xuICAgICAgICB9XG4gICAgICAgIC8vIERlYWwgd2l0aCB0aGUgcmVtYWluaW5nIGJ5dGVzIGFuZCBwYWRkaW5nXG4gICAgICAgIGlmIChieXRlUmVtYWluZGVyID09IDEpIHtcbiAgICAgICAgICAgIGNodW5rID0gYnl0ZXNbbWFpbkxlbmd0aF07XG4gICAgICAgICAgICBhID0gKGNodW5rICYgMjUyKSA+PiAyIC8vIDI1MiA9ICgyXjYgLSAxKSA8PCAyO1xuICAgICAgICAgICAgLy8gU2V0IHRoZSA0IGxlYXN0IHNpZ25pZmljYW50IGJpdHMgdG8gemVyb1xuICAgICAgICAgICAgYiA9IChjaHVuayAmIDMpIDw8IDQgLy8gMyA9IDJeMiAtIDE7XG4gICAgICAgICAgICBiYXNlNjQgKz0gZW5jb2RpbmdzW2FdICsgZW5jb2RpbmdzW2JdICsgJz09JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChieXRlUmVtYWluZGVyID09IDIpIHtcbiAgICAgICAgICAgIGNodW5rID0gKGJ5dGVzW21haW5MZW5ndGhdIDw8IDgpIHwgYnl0ZXNbbWFpbkxlbmd0aCArIDFdO1xuICAgICAgICAgICAgYSA9IChjaHVuayAmIDE2MTI4KSA+PiA4IC8vIDE2MTI4ID0gKDJeNiAtIDEpIDw8IDg7XG4gICAgICAgICAgICBiID0gKGNodW5rICYgMTAwOCkgPj4gNCAvLyAxMDA4ID0gKDJeNiAtIDEpIDw8IDQ7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIDIgbGVhc3Qgc2lnbmlmaWNhbnQgYml0cyB0byB6ZXJvXG4gICAgICAgICAgICBjID0gKGNodW5rICYgMTUpIDw8IDIgLy8gMTUgPSAyXjQgLSAxO1xuICAgICAgICAgICAgYmFzZTY0ICs9IGVuY29kaW5nc1thXSArIGVuY29kaW5nc1tiXSArIGVuY29kaW5nc1tjXSArICc9JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgYmFzZTY0O1xuICAgICAgICAvLyByZXR1cm4gYmFzZTY0O1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4iuS8oOWktOWDj1xuICAgICAqL1xuICAgIGdldFVwTG9hZFBob3RvQmFzZTY0KHBhdGgpIHtcbiAgICAgICAgaWYgKENDX0pTQikge1xuICAgICAgICAgICAgLy8gbGV0IHBhdGggPSB0aGlzLmdldExvY2FsSGVhZFBpY05hbWUoKVxuICAgICAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkxvY2FsSGVhZFBpY05hbWUgPSBwYXRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coJ3BhdGgnICsgcGF0aClcbiAgICAgICAgICAgIGxldCBkYXRhID0gbnVsbFxuICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QocGF0aCkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gKGpzYi5maWxlVXRpbHMgYXMgYW55KS5nZXREYXRhRnJvbUZpbGUocGF0aCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX2FycmF5QnVmZmVyVG9CYXNlNjQoZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhkYXRhKVxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmo4DmtYvmuLjmiI/mmK/lkKblronoo4VcbiAgICAgKi9cbiAgICBjaGVja0dhbWVJbnN0YWxsKGdhbWVOYW1lKSB7XG4gICAgICAgIGlmIChDQ19KU0IpIHtcbiAgICAgICAgICAgIGxldCBnYW1lUGF0aCA9IGBhc3NldHMvJHtnYW1lTmFtZX1gXG4gICAgICAgICAgICByZXR1cm4ganNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChnYW1lUGF0aClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlua4uOaIj+eJiOacrOWPt1xuICAgICAqL1xuICAgIGdldEdhbWVNYW5pZmVzdFZlcnNpb24oZ2FtZU5hbWUpIHtcbiAgICAgICAgaWYgKENDX0pTQikge1xuICAgICAgICAgICAgbGV0IG1hbmlmZXN0VXJsID0gYCR7Z2FtZU5hbWV9X3Byb2plY3QubWFuaWZlc3RgO1xuICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QobWFuaWZlc3RVcmwpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKG1hbmlmZXN0VXJsKTtcbiAgICAgICAgICAgICAgICBsZXQgbWFpbmlmZXN0ID0gSlNPTi5wYXJzZShjb250ZW50KVxuICAgICAgICAgICAgICAgIEcuTG9nZ2VyLmxvZygn6I635Y+W5ri45oiP54mI5pys5Y+3PScsIG1haW5pZmVzdC52ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFpbmlmZXN0LnZlcnNpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmiKrlm77lubbkv53lrZjliLDmnKzlnLBcbiAgICAgKi9cbiAgICBjYXB0dXJlVGV4dHVyZShub2RlOiBjYy5Ob2RlKSB7XG5cbiAgICAgICAgbGV0IGNhcHR1cmVVdGlsID0gdGhpcy5nZXRDYXR1cmVVaXRsKClcbiAgICAgICAgaWYgKGNhcHR1cmVVdGlsICYmIG5vZGUpIHtcbiAgICAgICAgICAgIGNhcHR1cmVVdGlsLmNhcHR1cmUobm9kZSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2F0dXJlVWl0bCgpIHtcbiAgICAgICAgcmV0dXJuIENhcHR1cmVVdGlsLkluc3RhbmNlKCk7XG4gICAgfVxuICAgIHB1c2hXaW5kb3dzKHB1c2hEYXRhKSB7XG4gICAgICAgIGxldCBwb3AgPSBVc2VyLl9wb3BXaW5kb3dzLmZpbmRJbmRleChwb3BXaW5kb3cgPT4geyByZXR1cm4gcG9wV2luZG93WzBdID09IHB1c2hEYXRhWzBdIH0pO1xuICAgICAgICBpZiAocG9wID09IC0xKSBVc2VyLl9wb3BXaW5kb3dzLnB1c2gocHVzaERhdGEpO1xuICAgIH1cbiAgICBwb3BXaW5kb3dzKHBvcE5hbWU/OiBTdHJpbmcpIHtcbiAgICAgICAgaWYgKFVzZXIuX3BvcFdpbmRvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBVc2VyLl9wb3BXaW5kb3dzID0gVXNlci5fcG9wV2luZG93cy5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhWzJdIC0gYlsyXSB9KVxuICAgICAgICAgICAgLy8gVXNlci5fcG9wV2luZG93cy5mb3JFYWNoKCh3ZCwgaSkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGlmICh3ZFswXSA9PSBwb3BOYW1lKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGRpc3BhdGNoKHdkWzBdLCB3ZFsxXSk7XG4gICAgICAgICAgICAvLyAgICAgICAgIFVzZXIuX3BvcFdpbmRvd3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICBkaXNwYXRjaChVc2VyLl9wb3BXaW5kb3dzWzBdWzBdLCBVc2VyLl9wb3BXaW5kb3dzWzBdWzFdKTtcbiAgICAgICAgICAgIFVzZXIuX3BvcFdpbmRvd3Muc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBVdGlsTWdyID0gbmV3IF9VdGlsTWdyKCk7XG5cbiJdfQ==