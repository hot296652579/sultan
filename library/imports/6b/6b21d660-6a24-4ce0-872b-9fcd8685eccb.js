"use strict";
cc._RF.push(module, '6b21dZgaiRM4Icrn82GhezL', 'LocalStorage');
// script/framework/base/LocalStorage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
/*
 * @Author: your name
 * @Date: 2019-11-20 19:04:21
 * @LastEditTime: 2020-04-10 13:38:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ddz\assets\framework\base\LocalStorage.ts
 */
const BitEncrypt_1 = require("../extentions/BitEncrypt");
class LocalStorage {
    constructor() {
        this.key = "VuxiAKihQ0VR9WRe";
    }
    static Instance() { return this._instance || (this._instance = new LocalStorage()); }
    //public iv = "Zqk3jEvujfeRIY9j";
    //aes加密 
    encrypt(obj) {
        //些加载出来的数据太过庞大,可能造成浏览器无法缓存太多数据，
        //使用新的加密方法,不会增加数据本身的大小
        return BitEncrypt_1.BitEncrypt.encode(JSON.stringify(obj), this.key);
        // let _CryptoJS: any = CryptoJS;
        // let word = JSON.stringify(obj);
        // let key = _CryptoJS.enc.Utf8.parse(this.key);
        // let iv = _CryptoJS.enc.Utf8.parse(this.iv);
        // let srcs = _CryptoJS.enc.Utf8.parse(word);
        // let encrypted = _CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: _CryptoJS.mode.CBC, padding: _CryptoJS.pad.Pkcs7 });
        // return encrypted.ciphertext.toString();
    }
    decryption(word) {
        return BitEncrypt_1.BitEncrypt.decode(word, this.key);
        // let _CryptoJS: any = CryptoJS;
        // let key = _CryptoJS.enc.Utf8.parse(this.key);
        // let iv = _CryptoJS.enc.Utf8.parse(this.iv);
        // let encryptedHexStr = _CryptoJS.enc.Hex.parse(word);
        // let srcs = _CryptoJS.enc.Base64.stringify(encryptedHexStr);
        // let decrypt = _CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: _CryptoJS.mode.CBC, padding: _CryptoJS.pad.Pkcs7 });
        // let decryptedStr = decrypt.toString(_CryptoJS.enc.Utf8);
        // return decryptedStr.toString();
    }
    getItem(key, defaultValue = null) {
        let value = cc.sys.localStorage.getItem(key);
        if (value) {
            //解析
            try {
                let data = this.decryption(value);
                let result = JSON.parse(data);
                if (result.type) {
                    return result.value;
                }
                else {
                    return value;
                }
            }
            catch (error) {
                return value;
            }
        }
        else {
            return defaultValue;
        }
    }
    setItem(key, value) {
        let type = typeof value;
        if (type == "number" || type == "string" || type == "boolean" || type == "object") {
            let saveObj = { type: type, value: value };
            //加密
            try {
                let data = this.encrypt(saveObj);
                cc.sys.localStorage.setItem(key, data);
            }
            catch (error) {
                if (CC_DEBUG)
                    cc.error(error);
            }
        }
        else {
            if (CC_DEBUG)
                cc.error(`存储数据类型不支持 当前的存储类型: ${type}`);
        }
    }
    removeItem(key) {
        cc.sys.localStorage.removeItem(key);
    }
    /**
     * 清除登录缓存
     */
    cleanLoginCache() {
        this.removeItem('facebookLoginCache');
        this.removeItem('loginCache');
    }
}
exports.LocalStorage = LocalStorage;
LocalStorage._instance = null;

cc._RF.pop();