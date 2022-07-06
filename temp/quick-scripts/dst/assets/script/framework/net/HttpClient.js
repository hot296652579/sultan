
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/net/HttpClient.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9440fYu/95D5orBXWIAUqJ9', 'HttpClient');
// script/framework/net/HttpClient.ts

"use strict";
/**
 * @description http网络请求
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPackge = exports.RequestPackgeData = exports.HttpRequestType = exports.HttpErrorType = void 0;
var HttpErrorType;
(function (HttpErrorType) {
    HttpErrorType[HttpErrorType["UrlError"] = 0] = "UrlError";
    HttpErrorType[HttpErrorType["TimeOut"] = 1] = "TimeOut";
    HttpErrorType[HttpErrorType["RequestError"] = 2] = "RequestError";
})(HttpErrorType = exports.HttpErrorType || (exports.HttpErrorType = {}));
var HttpRequestType;
(function (HttpRequestType) {
    HttpRequestType["POST"] = "POST";
    HttpRequestType["GET"] = "GET";
})(HttpRequestType = exports.HttpRequestType || (exports.HttpRequestType = {}));
class RequestPackgeData {
    constructor() {
        this.data = null;
        this.url = null;
        /**@description 超时设置 默认为10s*/
        this.timeout = 10000;
        /**@description 请求类型 默认为GET请求*/
        this.type = HttpRequestType.GET;
        this.requestHeader = null;
        /**@description 发送接口时，默认为false 仅浏览器端生效
         * 自动附加当前时间的参数字段
         * 但如果服务器做了接口参数效验，可能会导致接口无法通过服务器验证，返回错误数据
         * @example
         * 请求地址为http:www.baidu.com 当isAutoAttachCurrentTime 为 true为
         * 实际的请求接口为http:www.baidu.com?cur_loc_t=当前时间
         * 请求地址为http:www.baidu.com?uid=123 当isAutoAttachCurrentTime 为 true为
         * 实际的请求接口为http:www.baidu.com?uid=123&cur_loc_t=当前时间
         *  */
        this.isAutoAttachCurrentTime = false;
        this._responseType = "";
    }
    set responseType(type) {
        this._responseType = type;
    }
    get responseType() {
        if (CC_JSB) {
            if (this._responseType == "") {
                this._responseType = "json";
            }
        }
        return this._responseType;
    }
}
exports.RequestPackgeData = RequestPackgeData;
/**
 * @description http 请求包
 */
class RequestPackge {
    constructor() {
        this._data = new RequestPackgeData();
    }
    set data(data) {
        this._data = data;
    }
    get data() {
        return this._data;
    }
    /**
     * @description 发送请求包
     * @param cb
     * @param errorcb
     */
    send(cb, errorcb) {
        HttpClient.request(this, cb, errorcb);
    }
}
exports.RequestPackge = RequestPackge;
/**@description 跨域代理 */
RequestPackge.crossProxy = {};
/**@description 当前主机地址 */
RequestPackge.location = { host: "", pathname: "", protocol: "" };
class HttpClient {
    static crossProxy(url) {
        //浏览器，非调试模式下
        if (cc.sys.isBrowser && !CC_PREVIEW && RequestPackge.crossProxy) {
            let config = RequestPackge.crossProxy;
            let location = RequestPackge.location;
            let keys = Object.keys(config);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let value = config[key];
                if (url.indexOf(key) > -1) {
                    if (value.protocol && value.api) {
                        if (location.protocol != value.protocol) {
                            //所有跨域的都从当前服务器的代理转发，把https也得转化成http:
                            url = url.replace(value.protocol, location.protocol);
                        }
                        return url.replace(key, `${location.host}/${value.api}`);
                    }
                }
            }
            return url;
        }
        else {
            return url;
        }
    }
    static request(packge, cb, errorcb) {
        let url = packge.data.url;
        if (!url) {
            if (CC_DEBUG) {
                cc.error(`reuqest url error`);
            }
            if (errorcb)
                errorcb({ type: HttpErrorType.UrlError, reason: "错误的Url地址" });
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300)) {
                    if (xhr.responseType == "arraybuffer" || xhr.responseType == "blob") {
                        if (cb)
                            cb(xhr.response);
                    }
                    else {
                        if (CC_DEBUG)
                            cc.log(`htpp res(${xhr.responseText})`);
                        if (cb) {
                            let responText = null;
                            if (xhr.responseType === "text") {
                                responText = xhr.responseText;
                            }
                            else {
                                responText = JSON.parse(xhr.responseText);
                            }
                            cb(responText);
                        }
                    }
                }
                else {
                    let reason = xhr.status;
                    cc.error(`request error status : ${xhr.status} url : ${url} `);
                    if (errorcb)
                        errorcb({ type: HttpErrorType.RequestError, reason: reason });
                }
            }
            else {
                // cc.log(`readyState ${xhr.readyState}`);
            }
        };
        xhr.responseType = packge.data.responseType;
        xhr.timeout = packge.data.timeout;
        xhr.ontimeout = () => {
            xhr.abort(); //网络超时，断开连接
            if (CC_DEBUG)
                cc.warn(`request timeout : ${url}`);
            if (errorcb)
                errorcb({ type: HttpErrorType.TimeOut, reason: "连接超时" });
        };
        xhr.onerror = () => {
            cc.error(`request error : ${url} `);
            if (errorcb)
                errorcb({ type: HttpErrorType.RequestError, reason: "请求错误" });
        };
        if (CC_DEBUG)
            cc.log(`[send http request] url : ${url} request type : ${packge.data.type} , responseType : ${xhr.responseType} data : ${packge.data.data}`);
        // url = this.crossProxy(url);
        if (cc.sys.isBrowser) {
            if (packge.data.isAutoAttachCurrentTime) {
                if (url.indexOf("?") >= 0) {
                    url = `${url}&cur_loc_t=${Date.timeNow()}`;
                }
                else {
                    url = `${url}?cur_loc_t=${Date.timeNow()}`;
                }
            }
        }
        if (cc.sys.isBrowser && !CC_PREVIEW) {
            if (CC_DEBUG)
                cc.log(`[send http request] corss prox url : ${url} request type : ${packge.data.type} , responseType : ${xhr.responseType} data : ${packge.data.data}`);
        }
        if (packge.data.type === HttpRequestType.POST) {
            xhr.open(HttpRequestType.POST, url);
            if (packge.data.requestHeader) {
                xhr.setRequestHeader(packge.data.requestHeader.name, packge.data.requestHeader.value);
            }
            else {
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            }
            xhr.send(packge.data.data);
        }
        else {
            xhr.open(HttpRequestType.GET, url, true);
            if (packge.data.requestHeader) {
                xhr.setRequestHeader(packge.data.requestHeader.name, packge.data.requestHeader.value);
            }
            xhr.send();
        }
    }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRzs7O0FBR0gsSUFBWSxhQUlYO0FBSkQsV0FBWSxhQUFhO0lBQ3JCLHlEQUFRLENBQUE7SUFDUix1REFBTyxDQUFBO0lBQ1AsaUVBQVksQ0FBQTtBQUNoQixDQUFDLEVBSlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7QUFPRCxJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDdkIsZ0NBQWEsQ0FBQTtJQUNiLDhCQUFXLENBQUE7QUFDZixDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7QUFFRCxNQUFhLGlCQUFpQjtJQUE5QjtRQUNJLFNBQUksR0FBUSxJQUFJLENBQUM7UUFDakIsUUFBRyxHQUFXLElBQUksQ0FBQztRQUNuQiw2QkFBNkI7UUFDN0IsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUN4QiwrQkFBK0I7UUFDL0IsU0FBSSxHQUFvQixlQUFlLENBQUMsR0FBRyxDQUFDO1FBQzVDLGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RDs7Ozs7Ozs7Y0FRTTtRQUNOLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQUN4QixrQkFBYSxHQUErQixFQUFFLENBQUM7SUFZM0QsQ0FBQztJQVhHLElBQVcsWUFBWSxDQUFDLElBQWdDO1FBQ3BELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFXLFlBQVk7UUFDbkIsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzthQUMvQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7Q0FDSjtBQTlCRCw4Q0E4QkM7QUFFRDs7R0FF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QyxDQUFDO2FBQ3pGO1lBQ0QsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0NBQ0oiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXNjcmlwdGlvbiBodHRw572R57uc6K+35rGCXG4gKi9cblxuXG5leHBvcnQgZW51bSBIdHRwRXJyb3JUeXBlIHtcbiAgICBVcmxFcnJvciwvL+mUmeivr+eahFVybOWcsOaWuVxuICAgIFRpbWVPdXQsLy/otoXml7ZcbiAgICBSZXF1ZXN0RXJyb3IsLy/or7fmsYLplJnor69cbn1cblxuZXhwb3J0IGludGVyZmFjZSBIdHRwRXJyb3Ige1xuICAgIHR5cGU6IEh0dHBFcnJvclR5cGUsXG4gICAgcmVhc29uOiBhbnlcbn1cblxuZXhwb3J0IGVudW0gSHR0cFJlcXVlc3RUeXBlIHtcbiAgICBQT1NUID0gXCJQT1NUXCIsXG4gICAgR0VUID0gXCJHRVRcIixcbn1cblxuZXhwb3J0IGNsYXNzIFJlcXVlc3RQYWNrZ2VEYXRhIHtcbiAgICBkYXRhOiBhbnkgPSBudWxsO1xuICAgIHVybDogc3RyaW5nID0gbnVsbDtcbiAgICAvKipAZGVzY3JpcHRpb24g6LaF5pe26K6+572uIOm7mOiupOS4ujEwcyovXG4gICAgdGltZW91dDogbnVtYmVyID0gMTAwMDA7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOivt+axguexu+WeiyDpu5jorqTkuLpHRVTor7fmsYIqL1xuICAgIHR5cGU6IEh0dHBSZXF1ZXN0VHlwZSA9IEh0dHBSZXF1ZXN0VHlwZS5HRVQ7XG4gICAgcmVxdWVzdEhlYWRlcjogeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfSA9IG51bGw7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOWPkemAgeaOpeWPo+aXtu+8jOm7mOiupOS4umZhbHNlIOS7hea1j+iniOWZqOerr+eUn+aViFxuICAgICAqIOiHquWKqOmZhOWKoOW9k+WJjeaXtumXtOeahOWPguaVsOWtl+autVxuICAgICAqIOS9huWmguaenOacjeWKoeWZqOWBmuS6huaOpeWPo+WPguaVsOaViOmqjO+8jOWPr+iDveS8muWvvOiHtOaOpeWPo+aXoOazlemAmui/h+acjeWKoeWZqOmqjOivge+8jOi/lOWbnumUmeivr+aVsOaNrlxuICAgICAqIEBleGFtcGxlIFxuICAgICAqIOivt+axguWcsOWdgOS4umh0dHA6d3d3LmJhaWR1LmNvbSDlvZNpc0F1dG9BdHRhY2hDdXJyZW50VGltZSDkuLogdHJ1ZeS4ulxuICAgICAqIOWunumZheeahOivt+axguaOpeWPo+S4umh0dHA6d3d3LmJhaWR1LmNvbT9jdXJfbG9jX3Q95b2T5YmN5pe26Ze0XG4gICAgICog6K+35rGC5Zyw5Z2A5Li6aHR0cDp3d3cuYmFpZHUuY29tP3VpZD0xMjMg5b2TaXNBdXRvQXR0YWNoQ3VycmVudFRpbWUg5Li6IHRydWXkuLpcbiAgICAgKiDlrp7pmYXnmoTor7fmsYLmjqXlj6PkuLpodHRwOnd3dy5iYWlkdS5jb20/dWlkPTEyMyZjdXJfbG9jX3Q95b2T5YmN5pe26Ze0XG4gICAgICogICovXG4gICAgaXNBdXRvQXR0YWNoQ3VycmVudFRpbWUgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9yZXNwb25zZVR5cGU6IFhNTEh0dHBSZXF1ZXN0UmVzcG9uc2VUeXBlID0gXCJcIjtcbiAgICBwdWJsaWMgc2V0IHJlc3BvbnNlVHlwZSh0eXBlOiBYTUxIdHRwUmVxdWVzdFJlc3BvbnNlVHlwZSkge1xuICAgICAgICB0aGlzLl9yZXNwb25zZVR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IHJlc3BvbnNlVHlwZSgpIHtcbiAgICAgICAgaWYgKENDX0pTQikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzcG9uc2VUeXBlID0gXCJqc29uXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlVHlwZTtcbiAgICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIGh0dHAg6K+35rGC5YyFXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0UGFja2dlIHtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDot6jln5/ku6PnkIYgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyb3NzUHJveHkgPSB7fTtcbiAgICAvKipAZGVzY3JpcHRpb24g5b2T5YmN5Li75py65Zyw5Z2AICovXG4gICAgcHVibGljIHN0YXRpYyBsb2NhdGlvbiA9IHsgaG9zdDogXCJcIiwgcGF0aG5hbWU6IFwiXCIsIHByb3RvY29sOiBcIlwiIH07XG5cbiAgICBwcml2YXRlIF9kYXRhOiBSZXF1ZXN0UGFja2dlRGF0YSA9IG5ldyBSZXF1ZXN0UGFja2dlRGF0YSgpO1xuICAgIHB1YmxpYyBzZXQgZGF0YShkYXRhOiBSZXF1ZXN0UGFja2dlRGF0YSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgcHVibGljIGdldCBkYXRhKCk6IFJlcXVlc3RQYWNrZ2VEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDlj5HpgIHor7fmsYLljIVcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICogQHBhcmFtIGVycm9yY2IgXG4gICAgICovXG4gICAgcHVibGljIHNlbmQoY2I/OiAoZGF0YTogYW55KSA9PiB2b2lkLCBlcnJvcmNiPzogKGVycm9yRGF0YTogSHR0cEVycm9yKSA9PiB2b2lkKSB7XG4gICAgICAgIEh0dHBDbGllbnQucmVxdWVzdCh0aGlzLCBjYiwgZXJyb3JjYik7XG4gICAgfVxufVxuXG5jbGFzcyBIdHRwQ2xpZW50IHtcblxuICAgIHN0YXRpYyBjcm9zc1Byb3h5KHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy/mtY/op4jlmajvvIzpnZ7osIPor5XmqKHlvI/kuItcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIgJiYgIUNDX1BSRVZJRVcgJiYgUmVxdWVzdFBhY2tnZS5jcm9zc1Byb3h5KSB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gUmVxdWVzdFBhY2tnZS5jcm9zc1Byb3h5O1xuICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gUmVxdWVzdFBhY2tnZS5sb2NhdGlvbjtcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gY29uZmlnW2tleV07XG5cbiAgICAgICAgICAgICAgICBpZiAodXJsLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5wcm90b2NvbCAmJiB2YWx1ZS5hcGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5wcm90b2NvbCAhPSB2YWx1ZS5wcm90b2NvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5pyJ6Leo5Z+f55qE6YO95LuO5b2T5YmN5pyN5Yqh5Zmo55qE5Luj55CG6L2s5Y+R77yM5oqKaHR0cHPkuZ/lvpfovazljJbmiJBodHRwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKHZhbHVlLnByb3RvY29sLCBsb2NhdGlvbi5wcm90b2NvbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2Uoa2V5LCBgJHtsb2NhdGlvbi5ob3N0fS8ke3ZhbHVlLmFwaX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcXVlc3QocGFja2dlOiBSZXF1ZXN0UGFja2dlLCBjYj86IChkYXRhOiBhbnkpID0+IHZvaWQsIGVycm9yY2I/OiAoZXJyb3JEYXRhOiBIdHRwRXJyb3IpID0+IHZvaWQpIHtcblxuICAgICAgICBsZXQgdXJsID0gcGFja2dlLmRhdGEudXJsO1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoYHJldXFlc3QgdXJsIGVycm9yYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3JjYikgZXJyb3JjYih7IHR5cGU6IEh0dHBFcnJvclR5cGUuVXJsRXJyb3IsIHJlYXNvbjogXCLplJnor6/nmoRVcmzlnLDlnYBcIiB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGlmICgoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT0gXCJhcnJheWJ1ZmZlclwiIHx8IHhoci5yZXNwb25zZVR5cGUgPT0gXCJibG9iXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgY2IoeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGBodHBwIHJlcygke3hoci5yZXNwb25zZVRleHR9KWApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcG9uVGV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvblRleHQgPSB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uVGV4dCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKHJlc3BvblRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlYXNvbiA9IHhoci5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGByZXF1ZXN0IGVycm9yIHN0YXR1cyA6ICR7eGhyLnN0YXR1c30gdXJsIDogJHt1cmx9IGApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JjYikgZXJyb3JjYih7IHR5cGU6IEh0dHBFcnJvclR5cGUuUmVxdWVzdEVycm9yLCByZWFzb246IHJlYXNvbiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coYHJlYWR5U3RhdGUgJHt4aHIucmVhZHlTdGF0ZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gcGFja2dlLmRhdGEucmVzcG9uc2VUeXBlO1xuICAgICAgICB4aHIudGltZW91dCA9IHBhY2tnZS5kYXRhLnRpbWVvdXQ7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiB7XG4gICAgICAgICAgICB4aHIuYWJvcnQoKTsvL+e9kee7nOi2heaXtu+8jOaWreW8gOi/nuaOpVxuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGByZXF1ZXN0IHRpbWVvdXQgOiAke3VybH1gKTtcbiAgICAgICAgICAgIGlmIChlcnJvcmNiKSBlcnJvcmNiKHsgdHlwZTogSHR0cEVycm9yVHlwZS5UaW1lT3V0LCByZWFzb246IFwi6L+e5o6l6LaF5pe2XCIgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICBjYy5lcnJvcihgcmVxdWVzdCBlcnJvciA6ICR7dXJsfSBgKTtcbiAgICAgICAgICAgIGlmIChlcnJvcmNiKSBlcnJvcmNiKHsgdHlwZTogSHR0cEVycm9yVHlwZS5SZXF1ZXN0RXJyb3IsIHJlYXNvbjogXCLor7fmsYLplJnor69cIiB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhgW3NlbmQgaHR0cCByZXF1ZXN0XSB1cmwgOiAke3VybH0gcmVxdWVzdCB0eXBlIDogJHtwYWNrZ2UuZGF0YS50eXBlfSAsIHJlc3BvbnNlVHlwZSA6ICR7eGhyLnJlc3BvbnNlVHlwZX0gZGF0YSA6ICR7cGFja2dlLmRhdGEuZGF0YX1gKTtcblxuICAgICAgICAvLyB1cmwgPSB0aGlzLmNyb3NzUHJveHkodXJsKTtcblxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgaWYgKHBhY2tnZS5kYXRhLmlzQXV0b0F0dGFjaEN1cnJlbnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKFwiP1wiKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IGAke3VybH0mY3VyX2xvY190PSR7RGF0ZS50aW1lTm93KCl9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSBgJHt1cmx9P2N1cl9sb2NfdD0ke0RhdGUudGltZU5vdygpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIgJiYgIUNDX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGBbc2VuZCBodHRwIHJlcXVlc3RdIGNvcnNzIHByb3ggdXJsIDogJHt1cmx9IHJlcXVlc3QgdHlwZSA6ICR7cGFja2dlLmRhdGEudHlwZX0gLCByZXNwb25zZVR5cGUgOiAke3hoci5yZXNwb25zZVR5cGV9IGRhdGEgOiAke3BhY2tnZS5kYXRhLmRhdGF9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFja2dlLmRhdGEudHlwZSA9PT0gSHR0cFJlcXVlc3RUeXBlLlBPU1QpIHtcbiAgICAgICAgICAgIHhoci5vcGVuKEh0dHBSZXF1ZXN0VHlwZS5QT1NULCB1cmwpO1xuICAgICAgICAgICAgaWYgKHBhY2tnZS5kYXRhLnJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihwYWNrZ2UuZGF0YS5yZXF1ZXN0SGVhZGVyLm5hbWUsIHBhY2tnZS5kYXRhLnJlcXVlc3RIZWFkZXIudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4aHIuc2VuZChwYWNrZ2UuZGF0YS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHhoci5vcGVuKEh0dHBSZXF1ZXN0VHlwZS5HRVQsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAocGFja2dlLmRhdGEucmVxdWVzdEhlYWRlcikge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKHBhY2tnZS5kYXRhLnJlcXVlc3RIZWFkZXIubmFtZSwgcGFja2dlLmRhdGEucmVxdWVzdEhlYWRlci52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19