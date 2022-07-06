
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/extentions/BitEncrypt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '714809p2/BN/rqgBK9MkiIN', 'BitEncrypt');
// script/framework/extentions/BitEncrypt.ts

"use strict";
/**
 * @description 位加密,不增加数据本身大小进行位置加密
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitEncrypt = void 0;
class _BitEncrypt {
    constructor() {
        this.logTag = `[BitEncrypt]:`;
        this._encryptKey = "EskKbMvzZBILhcTv";
    }
    set encryptKey(value) {
        this._encryptKey = value;
    }
    /**@description 加密解密 密钥 */
    get encryptKey() {
        return this._encryptKey;
    }
    /**
     * @description 解密
     * @param content 加密的内容
     * @param key 解密的key 加密/解密的key保持一致，如果不传可通过设置encryptKey
     */
    decode(content, key) {
        return this._code(content, key);
    }
    /**
     * @description 加密
     * @param content 未加密内容
     * @param key 加密的key 加密/解密的key保持一致 如果不传可通过设置encryptKey
     */
    encode(content, key) {
        return this._code(content, key);
    }
    _code(content, key) {
        let result = this._check(content, key);
        if (result.isOK) {
            let contentCharCode = [];
            for (let i = 0; i < content.length; i++) {
                contentCharCode.push(content.charCodeAt(i));
            }
            let index = 0;
            let ch = "";
            //对中文，及以下的其它字符串进行位加密
            let regex = /[\w\d_-`~#!$%^&*(){}=+;:'"<,>,/?|\\\u4e00-\u9fa5]/g;
            for (let i = 0; i < contentCharCode.length; i++) {
                //只有子母，数字，
                let matchs = content[i].match(regex);
                if (matchs && matchs.length > 0) {
                    //替换字符
                    contentCharCode[i] ^= result.key.charCodeAt(index);
                    ch = String.fromCharCode(contentCharCode[i]);
                    matchs = ch.match(regex);
                    if (matchs && matchs.length) {
                        //转换后仍然是可显示字符
                    }
                    else {
                        //转成了不能显示的字符，把它恢复原样
                        contentCharCode[i] ^= result.key.charCodeAt(index);
                    }
                    index++;
                    if (index >= result.key.length) {
                        index = 0;
                    }
                }
                else {
                    //不替换字符
                }
            }
            let newContent = "";
            for (let i = 0; i < contentCharCode.length; i++) {
                newContent += String.fromCharCode(contentCharCode[i]);
            }
            return newContent;
        }
        else {
            if (CC_DEBUG)
                cc.error(exports.BitEncrypt.logTag, `encode/decode error content : ${content} key : ${key}`);
            return content;
        }
    }
    _check(content, key) {
        if (content && content.length > 0) {
            if (key && key.length > 0) {
                //使用传的key进行加解密
                return { isOK: true, key: key };
            }
            else {
                if (this.encryptKey && this.encryptKey.length > 0) {
                    return { isOK: true, key: this.encryptKey };
                }
                else {
                    return { isOK: false, key: key };
                }
            }
        }
        else {
            return { isOK: false, key: key };
        }
    }
}
exports.BitEncrypt = new _BitEncrypt();
//window[`BitEncrypt`] = BitEncrypt;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvQml0RW5jcnlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0dBRUc7OztBQUVILE1BQU0sV0FBVztJQUFqQjtRQUVxQixXQUFNLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLGdCQUFXLEdBQVcsa0JBQWtCLENBQUM7SUE0RnJELENBQUM7SUEzRkcsSUFBVyxVQUFVLENBQUUsS0FBYztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBQ0QsMEJBQTBCO0lBQzFCLElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsT0FBZSxFQUFFLEdBQVk7UUFDdkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxPQUFlLEVBQUUsR0FBWTtRQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTyxLQUFLLENBQUMsT0FBZSxFQUFFLEdBQVc7UUFDdEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBRWQsSUFBSSxlQUFlLEdBQWMsRUFBRSxDQUFDO1lBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFHLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQztZQUVELElBQUks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b250ZW50IjpbIlxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5L2N5Yqg5a+GLOS4jeWinuWKoOaVsOaNruacrOi6q+Wkp+Wwj+i/m+ihjOS9jee9ruWKoOWvhlxuICovXG5cbmNsYXNzIF9CaXRFbmNyeXB0IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nVGFnID0gYFtCaXRFbmNyeXB0XTpgO1xuICAgIHByaXZhdGUgX2VuY3J5cHRLZXk6IHN0cmluZyA9IFwiRXNrS2JNdnpaQklMaGNUdlwiO1xuICAgIHB1YmxpYyBzZXQgZW5jcnlwdEtleSggdmFsdWUgOiBzdHJpbmcgKXtcbiAgICAgICAgdGhpcy5fZW5jcnlwdEtleSA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipAZGVzY3JpcHRpb24g5Yqg5a+G6Kej5a+GIOWvhumSpSAqL1xuICAgIHB1YmxpYyBnZXQgZW5jcnlwdEtleSggKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuY3J5cHRLZXk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDop6Plr4ZcbiAgICAgKiBAcGFyYW0gY29udGVudCDliqDlr4bnmoTlhoXlrrlcbiAgICAgKiBAcGFyYW0ga2V5IOino+WvhueahGtleSDliqDlr4Yv6Kej5a+G55qEa2V55L+d5oyB5LiA6Ie077yM5aaC5p6c5LiN5Lyg5Y+v6YCa6L+H6K6+572uZW5jcnlwdEtleVxuICAgICAqL1xuICAgIHB1YmxpYyBkZWNvZGUoY29udGVudDogc3RyaW5nLCBrZXk/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29kZShjb250ZW50LCBrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDliqDlr4ZcbiAgICAgKiBAcGFyYW0gY29udGVudCDmnKrliqDlr4blhoXlrrlcbiAgICAgKiBAcGFyYW0ga2V5IOWKoOWvhueahGtleSDliqDlr4Yv6Kej5a+G55qEa2V55L+d5oyB5LiA6Ie0IOWmguaenOS4jeS8oOWPr+mAmui/h+iuvue9rmVuY3J5cHRLZXlcbiAgICAgKi9cbiAgICBwdWJsaWMgZW5jb2RlKGNvbnRlbnQ6IHN0cmluZywga2V5Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGUoY29udGVudCwga2V5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2RlKGNvbnRlbnQ6IHN0cmluZywga2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fY2hlY2soY29udGVudCxrZXkpO1xuICAgICAgICBpZiAoIHJlc3VsdC5pc09LICl7XG5cbiAgICAgICAgICAgIGxldCBjb250ZW50Q2hhckNvZGUgOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgZm9yKCBsZXQgaSA9IDAgOyBpIDwgY29udGVudC5sZW5ndGggOyBpKysgKXtcbiAgICAgICAgICAgICAgICBjb250ZW50Q2hhckNvZGUucHVzaChjb250ZW50LmNoYXJDb2RlQXQoaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGNoID0gXCJcIjtcbiAgICAgICAgICAgIC8v5a+55Lit5paH77yM5Y+K5Lul5LiL55qE5YW25a6D5a2X56ym5Liy6L+b6KGM5L2N5Yqg5a+GXG4gICAgICAgICAgICBsZXQgcmVnZXggPSAvW1xcd1xcZF8tYH4jISQlXiYqKCl7fT0rOzonXCI8LD4sLz98XFxcXFxcdTRlMDAtXFx1OWZhNV0vZztcbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gMCA7IGkgPCBjb250ZW50Q2hhckNvZGUubGVuZ3RoIDsgaSsrICl7XG5cbiAgICAgICAgICAgICAgICAvL+WPquacieWtkOavje+8jOaVsOWtl++8jFxuICAgICAgICAgICAgICAgIGxldCBtYXRjaHMgPSBjb250ZW50W2ldLm1hdGNoKHJlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAoIG1hdGNocyAmJiBtYXRjaHMubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgICAgICAvL+abv+aNouWtl+esplxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Q2hhckNvZGVbaV0gXj0gcmVzdWx0LmtleS5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbnRlbnRDaGFyQ29kZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNocyA9IGNoLm1hdGNoKHJlZ2V4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBtYXRjaHMgJiYgbWF0Y2hzLmxlbmd0aCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/ovazmjaLlkI7ku43nhLbmmK/lj6/mmL7npLrlrZfnrKZcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+i9rOaIkOS6huS4jeiDveaYvuekuueahOWtl+espu+8jOaKiuWug+aBouWkjeWOn+agt1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudENoYXJDb2RlW2ldIF49IHJlc3VsdC5rZXkuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpbmRleCA+PSByZXN1bHQua2V5Lmxlbmd0aCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8v5LiN5pu/5o2i5a2X56ymXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbmV3Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDAgOyBpIDwgY29udGVudENoYXJDb2RlLmxlbmd0aCA7IGkrKyApe1xuICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb250ZW50Q2hhckNvZGVbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld0NvbnRlbnQ7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmVycm9yKEJpdEVuY3J5cHQubG9nVGFnLCBgZW5jb2RlL2RlY29kZSBlcnJvciBjb250ZW50IDogJHtjb250ZW50fSBrZXkgOiAke2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2soIGNvbnRlbnQgOiBzdHJpbmcgLCBrZXkgOiBzdHJpbmcgKSA6IHtpc09LIDogYm9vbGVhbiwga2V5IDogc3RyaW5nIH0ge1xuICAgICAgICBpZiAoY29udGVudCAmJiBjb250ZW50Lmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBpZiAoIGtleSAmJiBrZXkubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgIC8v5L2/55So5Lyg55qEa2V56L+b6KGM5Yqg6Kej5a+GXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaXNPSyA6IHRydWUgLCBrZXkgOiBrZXkgfTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5lbmNyeXB0S2V5ICYmIHRoaXMuZW5jcnlwdEtleS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGlzT0sgOiB0cnVlICwga2V5IDogdGhpcy5lbmNyeXB0S2V5IH07XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGlzT0sgOiBmYWxzZSAsIGtleSA6IGtleSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IGlzT0sgOiAgZmFsc2UgLCBrZXkgOiBrZXkgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGxldCBCaXRFbmNyeXB0ID0gbmV3IF9CaXRFbmNyeXB0KCk7XG4vL3dpbmRvd1tgQml0RW5jcnlwdGBdID0gQml0RW5jcnlwdDsiXX0=