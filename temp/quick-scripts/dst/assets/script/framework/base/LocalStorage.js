
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/LocalStorage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvTG9jYWxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSCx5REFBc0Q7QUFZdEQsTUFBYSxZQUFZO0lBQXpCO1FBS1csUUFBRyxHQUFHLGtCQUFrQixDQUFDO0lBNkVwQyxDQUFDO0lBL0VVLE1BQU0sQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRzVGLGlDQUFpQztJQUVqQyxRQUFRO0lBQ0EsT0FBTyxDQUFDLEdBQU87UUFDbkIsK0JBQStCO1FBQy9CLHNCQUFzQjtRQUN0QixPQUFPLHVCQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELGlDQUFpQztRQUNqQyxrQ0FBa0M7UUFDbEMsZ0RBQWdEO1FBQ2hELDhDQUE4QztRQUM5Qyw2Q0FBNkM7UUFDN0Msd0hBQXdIO1FBQ3hILDBDQUEwQztJQUM5QyxDQUFDO0lBRU8sVUFBVSxDQUFDLElBQUk7UUFDbkIsT0FBTyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLGlDQUFpQztRQUNqQyxnREFBZ0Q7UUFDaEQsOENBQThDO1FBQzlDLHVEQUF1RDtRQUN2RCw4REFBOEQ7UUFDOUQsc0hBQXNIO1FBQ3RILDJEQUEyRDtRQUMzRCxrQ0FBa0M7SUFDdEMsQ0FBQztJQUVNLE9BQU8sQ0FBQyxHQUFXLEVBQUUsZUFBb0IsSUFBSTtRQUNoRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJO1lBQ0osSUFBSTtnQkFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO29CQUNiLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0gsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2FBQ0o7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO2FBQ0k7WUFDRCxPQUFPLFlBQVksQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFTSxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQXlDO1FBRWpFLElBQUksSUFBSSxHQUFHLE9BQU8sS0FBSyxDQUFDO1FBQ3hCLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUMvRSxJQUFJLE9BQU8sR0FBZ0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUN4RCxJQUFJO1lBQ0osSUFBSTtnQkFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFDO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osSUFBSSxRQUFRO29CQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakM7U0FDSjthQUFNO1lBQ0gsSUFBSSxRQUFRO2dCQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRU0sVUFBVSxDQUFDLEdBQVc7UUFDekIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRDs7T0FFRztJQUNILGVBQWU7UUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxDQUFDOztBQWpGTCxvQ0FrRkM7QUFoRmtCLHNCQUFTLEdBQWlCLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiB5b3VyIG5hbWVcbiAqIEBEYXRlOiAyMDE5LTExLTIwIDE5OjA0OjIxXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIwLTA0LTEwIDEzOjM4OjUwXG4gKiBATGFzdEVkaXRvcnM6IFBsZWFzZSBzZXQgTGFzdEVkaXRvcnNcbiAqIEBEZXNjcmlwdGlvbjogSW4gVXNlciBTZXR0aW5ncyBFZGl0XG4gKiBARmlsZVBhdGg6IFxcZGR6XFxhc3NldHNcXGZyYW1ld29ya1xcYmFzZVxcTG9jYWxTdG9yYWdlLnRzXG4gKi9cbmltcG9ydCB7IEJpdEVuY3J5cHQgfSBmcm9tIFwiLi4vZXh0ZW50aW9ucy9CaXRFbmNyeXB0XCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOacrOWcsOaVsOaNruWtmOWCqO+8jOS4uuS6huWQjumdouWPr+iDvemcgOimgeWvueaVsOaNrui/m+WFpeWKoOWvhuS/neWtmOetie+8jOaKimNvY29z55qE5bCB6Zet5LiA5bGCXG4gKi9cblxudHlwZSBTdG9yYWdlVmF1bGVUeXBlID0gXCJudW1iZXJcIiB8IFwic3RyaW5nXCIgfCBcImJvb2xlYW5cIiB8IFwib2JqZWN0XCI7XG5pbnRlcmZhY2UgU3RvcmFnZURhdGEge1xuICAgIHR5cGU6IFN0b3JhZ2VWYXVsZVR5cGUsXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBvYmplY3Q7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2Uge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBMb2NhbFN0b3JhZ2UgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgTG9jYWxTdG9yYWdlKCkpOyB9XG5cbiAgICBwdWJsaWMga2V5ID0gXCJWdXhpQUtpaFEwVlI5V1JlXCI7XG4gICAgLy9wdWJsaWMgaXYgPSBcIlpxazNqRXZ1amZlUklZOWpcIjtcblxuICAgIC8vYWVz5Yqg5a+GIFxuICAgIHByaXZhdGUgZW5jcnlwdChvYmo6IHt9KSB7XG4gICAgICAgIC8v5Lqb5Yqg6L295Ye65p2l55qE5pWw5o2u5aSq6L+H5bqe5aSnLOWPr+iDvemAoOaIkOa1j+iniOWZqOaXoOazlee8k+WtmOWkquWkmuaVsOaNru+8jFxuICAgICAgICAvL+S9v+eUqOaWsOeahOWKoOWvhuaWueazlSzkuI3kvJrlop7liqDmlbDmja7mnKzouqvnmoTlpKflsI9cbiAgICAgICAgcmV0dXJuIEJpdEVuY3J5cHQuZW5jb2RlKEpTT04uc3RyaW5naWZ5KG9iaiksIHRoaXMua2V5KTtcbiAgICAgICAgLy8gbGV0IF9DcnlwdG9KUzogYW55ID0gQ3J5cHRvSlM7XG4gICAgICAgIC8vIGxldCB3b3JkID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICAgICAgLy8gbGV0IGtleSA9IF9DcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh0aGlzLmtleSk7XG4gICAgICAgIC8vIGxldCBpdiA9IF9DcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh0aGlzLml2KTtcbiAgICAgICAgLy8gbGV0IHNyY3MgPSBfQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2Uod29yZCk7XG4gICAgICAgIC8vIGxldCBlbmNyeXB0ZWQgPSBfQ3J5cHRvSlMuQUVTLmVuY3J5cHQoc3Jjcywga2V5LCB7IGl2OiBpdiwgbW9kZTogX0NyeXB0b0pTLm1vZGUuQ0JDLCBwYWRkaW5nOiBfQ3J5cHRvSlMucGFkLlBrY3M3IH0pO1xuICAgICAgICAvLyByZXR1cm4gZW5jcnlwdGVkLmNpcGhlcnRleHQudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY3J5cHRpb24od29yZCkge1xuICAgICAgICByZXR1cm4gQml0RW5jcnlwdC5kZWNvZGUod29yZCwgdGhpcy5rZXkpO1xuICAgICAgICAvLyBsZXQgX0NyeXB0b0pTOiBhbnkgPSBDcnlwdG9KUztcbiAgICAgICAgLy8gbGV0IGtleSA9IF9DcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh0aGlzLmtleSk7XG4gICAgICAgIC8vIGxldCBpdiA9IF9DcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh0aGlzLml2KTtcbiAgICAgICAgLy8gbGV0IGVuY3J5cHRlZEhleFN0ciA9IF9DcnlwdG9KUy5lbmMuSGV4LnBhcnNlKHdvcmQpO1xuICAgICAgICAvLyBsZXQgc3JjcyA9IF9DcnlwdG9KUy5lbmMuQmFzZTY0LnN0cmluZ2lmeShlbmNyeXB0ZWRIZXhTdHIpO1xuICAgICAgICAvLyBsZXQgZGVjcnlwdCA9IF9DcnlwdG9KUy5BRVMuZGVjcnlwdChzcmNzLCBrZXksIHsgaXY6IGl2LCBtb2RlOiBfQ3J5cHRvSlMubW9kZS5DQkMsIHBhZGRpbmc6IF9DcnlwdG9KUy5wYWQuUGtjczcgfSk7XG4gICAgICAgIC8vIGxldCBkZWNyeXB0ZWRTdHIgPSBkZWNyeXB0LnRvU3RyaW5nKF9DcnlwdG9KUy5lbmMuVXRmOCk7XG4gICAgICAgIC8vIHJldHVybiBkZWNyeXB0ZWRTdHIudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbShrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIC8v6Kej5p6QXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5kZWNyeXB0aW9uKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBTdG9yYWdlRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG9iamVjdCkge1xuXG4gICAgICAgIGxldCB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICBpZiAodHlwZSA9PSBcIm51bWJlclwiIHx8IHR5cGUgPT0gXCJzdHJpbmdcIiB8fCB0eXBlID09IFwiYm9vbGVhblwiIHx8IHR5cGUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgbGV0IHNhdmVPYmo6IFN0b3JhZ2VEYXRhID0geyB0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIC8v5Yqg5a+GXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5lbmNyeXB0KHNhdmVPYmopO1xuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGRhdGEpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IoYOWtmOWCqOaVsOaNruexu+Wei+S4jeaUr+aMgSDlvZPliY3nmoTlrZjlgqjnsbvlnos6ICR7dHlwZX1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmuIXpmaTnmbvlvZXnvJPlrZhcbiAgICAgKi9cbiAgICBjbGVhbkxvZ2luQ2FjaGUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlSXRlbSgnZmFjZWJvb2tMb2dpbkNhY2hlJyk7XG4gICAgICAgIHRoaXMucmVtb3ZlSXRlbSgnbG9naW5DYWNoZScpO1xuICAgIH1cbn0iXX0=