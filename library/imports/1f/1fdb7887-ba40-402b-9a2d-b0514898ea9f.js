"use strict";
cc._RF.push(module, '1fdb7iHukBAK5otsFFImOqf', 'twittersdk');
// script/sdk/twittersdk.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 账号：mustoesjsavinaucf@hotmail.com
// 密码：Sam@VR80sGIr
class twittersdk {
    constructor() {
    }
    static get instance() { return this._instance || (this._instance = new twittersdk()); }
    init() {
        let hello = window['hello'];
        if (hello) {
            hello.init({
                twitter: 'REm8KjWsthsmKXZoVIYXNn1qqy'
            }, {
                scope: 'email',
                redirect_uri: 'http://192.168.2.188:7456/'
            });
        }
    }
    Twitter_SignOut(callback) {
        let self = this;
        let hello = window['hello'];
        if (hello) {
            hello.logout(function (response) {
                console.log('twitter.logout登出', response);
                if (callback)
                    callback();
            });
        }
    }
    Twitter_Login(callback) {
        let self = this;
        let hello = window['hello'];
        if (hello) {
            hello('twitter').login();
            // Listen to signin requests
            hello.on('auth.login', function (r) {
                // Get Profile
                hello(r.network).api('/me').then(function (p) {
                    window.console.log(p); //输出用户信息
                });
            });
        }
    }
    destroy() {
    }
}
exports.default = twittersdk;
twittersdk._instance = null;

cc._RF.pop();