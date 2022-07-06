// 账号：mustoesjsavinaucf@hotmail.com
// 密码：Sam@VR80sGIr
export default class twittersdk {
    protected static _instance: twittersdk = null;
    public static get instance() { return this._instance || (this._instance = new twittersdk()); }
    constructor() {

    }

    init() {
        let hello = window['hello']
        if (hello) {
            hello.init({
                twitter: 'REm8KjWsthsmKXZoVIYXNn1qqy'
            }, {
                scope: 'email',
                redirect_uri: 'http://192.168.2.188:7456/'
            });
        }
    }

    public Twitter_SignOut(callback) {
        let self = this;
        let hello = window['hello']
        if (hello) {
            hello.logout(function (response: any) {
                console.log('twitter.logout登出', response)
                if (callback)
                    callback()
            })
        }
    }

    public Twitter_Login(callback) {
        let self = this;
        let hello = window['hello']
        if (hello) {
            hello('twitter').login();
            // Listen to signin requests
            hello.on('auth.login', function (r) {
                // Get Profile
                hello(r.network).api('/me').then(function (p) {
                    window.console.log(p) //输出用户信息
                });
            });
        }
    }

    public destroy(): void {
    }

}