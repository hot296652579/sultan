"use strict";
cc._RF.push(module, '22e745v0/xIfpSiSpvCtHQB', 'fbsdk');
// script/sdk/fbsdk.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 账号：mustoesjsavinaucf@hotmail.com
// 密码：Sam@VR80sGIr
class fbsdk {
    constructor() {
    }
    static get instance() { return this._instance || (this._instance = new fbsdk()); }
    FB_Load() {
        let self = this;
        (function (d, s, id) {
            var js;
            var fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        // 初始化
        window.fbAsyncInit = function () {
            // @ts-ignore：
            // eslint-disable-next-line no-undef
        };
    }
    init() {
        let FB = window['FB'];
        if (FB) {
            FB.init({
                appId: '740652370264994',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v13.0'
            });
        }
    }
    FB_SignOut(callback) {
        let self = this;
        let FB = window['FB'];
        if (FB) {
            FB.logout(function (response) {
                console.log('FB.logout登出', response);
                if (callback)
                    callback();
            });
        }
    }
    FB_Login(callback) {
        let self = this;
        let FB = window['FB'];
        if (FB) {
            FB.login(function (response) {
                if (response.authResponse) {
                    let res = response.authResponse;
                    console.log('Welcome!  Fetching your information.... ');
                    // userData.info = res
                    // Manager.localStorage.setItem(LocalStoreageDefine.ACCOUNT_TOKEN, res.accessToken);
                    FB.api('/me', function (response) {
                        console.log('Good to see you, ' + response.name + '.');
                        res.id = response.id;
                        res.name = response.name;
                        console.log(`Good To See You : ${res.name}`);
                        if (callback) {
                            callback(res);
                        }
                    });
                }
                else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }
    }
    destroy() {
    }
}
exports.default = fbsdk;
fbsdk._instance = null;

cc._RF.pop();