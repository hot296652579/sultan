
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/twittersdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2RrL3R3aXR0ZXJzZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBbUM7QUFDbkMsa0JBQWtCO0FBQ2xCLE1BQXFCLFVBQVU7SUFHM0I7SUFFQSxDQUFDO0lBSE0sTUFBTSxLQUFLLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFLOUYsSUFBSTtRQUNBLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMzQixJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLDRCQUE0QjthQUN4QyxFQUFFO2dCQUNDLEtBQUssRUFBRSxPQUFPO2dCQUNkLFlBQVksRUFBRSw0QkFBNEI7YUFDN0MsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU0sZUFBZSxDQUFDLFFBQVE7UUFDM0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMzQixJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxRQUFhO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QyxJQUFJLFFBQVE7b0JBQ1IsUUFBUSxFQUFFLENBQUE7WUFDbEIsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFFTSxhQUFhLENBQUMsUUFBUTtRQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzNCLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLDRCQUE0QjtZQUM1QixLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7Z0JBQzlCLGNBQWM7Z0JBQ2QsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxRQUFRO2dCQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU0sT0FBTztJQUNkLENBQUM7O0FBL0NMLDZCQWlEQztBQWhEb0Isb0JBQVMsR0FBZSxJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyDotKblj7fvvJptdXN0b2VzanNhdmluYXVjZkBob3RtYWlsLmNvbVxuLy8g5a+G56CB77yaU2FtQFZSODBzR0lyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0d2l0dGVyc2RrIHtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogdHdpdHRlcnNkayA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdHdpdHRlcnNkaygpKTsgfVxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IGhlbGxvID0gd2luZG93WydoZWxsbyddXG4gICAgICAgIGlmIChoZWxsbykge1xuICAgICAgICAgICAgaGVsbG8uaW5pdCh7XG4gICAgICAgICAgICAgICAgdHdpdHRlcjogJ1JFbThLaldzdGhzbUtYWm9WSVlYTm4xcXF5J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHNjb3BlOiAnZW1haWwnLFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogJ2h0dHA6Ly8xOTIuMTY4LjIuMTg4Ojc0NTYvJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgVHdpdHRlcl9TaWduT3V0KGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGhlbGxvID0gd2luZG93WydoZWxsbyddXG4gICAgICAgIGlmIChoZWxsbykge1xuICAgICAgICAgICAgaGVsbG8ubG9nb3V0KGZ1bmN0aW9uIChyZXNwb25zZTogYW55KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3R3aXR0ZXIubG9nb3V055m75Ye6JywgcmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIFR3aXR0ZXJfTG9naW4oY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgaGVsbG8gPSB3aW5kb3dbJ2hlbGxvJ11cbiAgICAgICAgaWYgKGhlbGxvKSB7XG4gICAgICAgICAgICBoZWxsbygndHdpdHRlcicpLmxvZ2luKCk7XG4gICAgICAgICAgICAvLyBMaXN0ZW4gdG8gc2lnbmluIHJlcXVlc3RzXG4gICAgICAgICAgICBoZWxsby5vbignYXV0aC5sb2dpbicsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IFByb2ZpbGVcbiAgICAgICAgICAgICAgICBoZWxsbyhyLm5ldHdvcmspLmFwaSgnL21lJykudGhlbihmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2cocCkgLy/ovpPlh7rnlKjmiLfkv6Hmga9cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgfVxuXG59Il19