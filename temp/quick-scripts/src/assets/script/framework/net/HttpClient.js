"use strict";
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