
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/fbsdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2RrL2Zic2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLGtCQUFrQjtBQUNsQixNQUFxQixLQUFLO0lBR3hCO0lBRUEsQ0FBQztJQUhNLE1BQU0sS0FBSyxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBS2xGLE9BQU87UUFDWixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxVQUFVLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBTztZQUNoQyxJQUFJLEVBQUUsQ0FBQztZQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBQ3JDLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDbkMsRUFBVSxDQUFDLEdBQUcsR0FBRywyQ0FBMkMsQ0FBQztZQUM3RCxHQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU07UUFDTCxNQUFjLENBQUMsV0FBVyxHQUFHO1lBQzVCLGNBQWM7WUFDZCxvQ0FBb0M7UUFDdEMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsSUFBSSxFQUFFLEVBQUU7WUFDTixFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNOLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxPQUFPO2FBQ2pCLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUVNLFVBQVUsQ0FBQyxRQUFRO1FBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsSUFBSSxFQUFFLEVBQUU7WUFDTixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsUUFBYTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQ3BDLElBQUksUUFBUTtvQkFDVixRQUFRLEVBQUUsQ0FBQTtZQUNkLENBQUMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBRU0sUUFBUSxDQUFDLFFBQVE7UUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLEVBQUUsRUFBRTtZQUNOLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxRQUFRO2dCQUN6QixJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7b0JBQ3pCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUE7b0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQztvQkFDeEQsc0JBQXNCO29CQUN0QixvRkFBb0Y7b0JBQ3BGLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUTt3QkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RCxHQUFHLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUE7d0JBQ3BCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTt3QkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7d0JBQzVDLElBQUksUUFBUSxFQUFFOzRCQUNaLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTt5QkFDZDtvQkFDSCxDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7aUJBQ2pFO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTSxPQUFPO0lBQ2QsQ0FBQzs7QUExRUgsd0JBNEVDO0FBM0VrQixlQUFTLEdBQVUsSUFBSSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8g6LSm5Y+377yabXVzdG9lc2pzYXZpbmF1Y2ZAaG90bWFpbC5jb21cbi8vIOWvhuegge+8mlNhbUBWUjgwc0dJclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmJzZGsge1xuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogZmJzZGsgPSBudWxsO1xuICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpIHsgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBmYnNkaygpKTsgfVxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgcHVibGljIEZCX0xvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIChmdW5jdGlvbiAoZDogYW55LCBzOiBhbnksIGlkOiBhbnkpIHtcbiAgICAgIHZhciBqczsgdmFyIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcbiAgICAgIChqcyBhcyBhbnkpLnNyYyA9ICdodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL3Nkay5qcyc7XG4gICAgICAoZmpzIGFzIGFueSkucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG4gICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcbiAgICAvLyDliJ3lp4vljJZcbiAgICAod2luZG93IGFzIGFueSkuZmJBc3luY0luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBAdHMtaWdub3Jl77yaXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxldCBGQiA9IHdpbmRvd1snRkInXVxuICAgIGlmIChGQikge1xuICAgICAgRkIuaW5pdCh7XG4gICAgICAgIGFwcElkOiAnNzQwNjUyMzcwMjY0OTk0JywgLy8g5bqU55So57yW5Y+3XG4gICAgICAgIGF1dG9Mb2dBcHBFdmVudHM6IHRydWUsXG4gICAgICAgIHhmYm1sOiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiAndjEzLjAnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBGQl9TaWduT3V0KGNhbGxiYWNrKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBGQiA9IHdpbmRvd1snRkInXVxuICAgIGlmIChGQikge1xuICAgICAgRkIubG9nb3V0KGZ1bmN0aW9uIChyZXNwb25zZTogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGQi5sb2dvdXTnmbvlh7onLCByZXNwb25zZSlcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcHVibGljIEZCX0xvZ2luKGNhbGxiYWNrKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBGQiA9IHdpbmRvd1snRkInXVxuICAgIGlmIChGQikge1xuICAgICAgRkIubG9naW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5hdXRoUmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgcmVzID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlXG4gICAgICAgICAgY29uc29sZS5sb2coJ1dlbGNvbWUhICBGZXRjaGluZyB5b3VyIGluZm9ybWF0aW9uLi4uLiAnKTtcbiAgICAgICAgICAvLyB1c2VyRGF0YS5pbmZvID0gcmVzXG4gICAgICAgICAgLy8gTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMb2NhbFN0b3JlYWdlRGVmaW5lLkFDQ09VTlRfVE9LRU4sIHJlcy5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgRkIuYXBpKCcvbWUnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHb29kIHRvIHNlZSB5b3UsICcgKyByZXNwb25zZS5uYW1lICsgJy4nKTtcbiAgICAgICAgICAgIHJlcy5pZCA9IHJlc3BvbnNlLmlkXG4gICAgICAgICAgICByZXMubmFtZSA9IHJlc3BvbnNlLm5hbWVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBHb29kIFRvIFNlZSBZb3UgOiAke3Jlcy5uYW1lfWApXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGNhbmNlbGxlZCBsb2dpbiBvciBkaWQgbm90IGZ1bGx5IGF1dGhvcml6ZS4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gIH1cblxufSJdfQ==