// 账号：mustoesjsavinaucf@hotmail.com
// 密码：Sam@VR80sGIr
export default class fbsdk {
  protected static _instance: fbsdk = null;
  public static get instance() { return this._instance || (this._instance = new fbsdk()); }
  constructor() {

  }

  public FB_Load() {
    let self = this;
    (function (d: any, s: any, id: any) {
      var js; var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      (js as any).src = 'https://connect.facebook.net/en_US/sdk.js';
      (fjs as any).parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // 初始化
    (window as any).fbAsyncInit = function () {
      // @ts-ignore：
      // eslint-disable-next-line no-undef
    }
  }

  init() {
    let FB = window['FB']
    if (FB) {
      FB.init({
        appId: '740652370264994', // 应用编号
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v13.0'
      })
    }
  }

  public FB_SignOut(callback) {
    let self = this;
    let FB = window['FB']
    if (FB) {
      FB.logout(function (response: any) {
        console.log('FB.logout登出', response)
        if (callback)
          callback()
      })
    }
  }

  public FB_Login(callback) {
    let self = this;
    let FB = window['FB']
    if (FB) {
      FB.login(function (response) {
        if (response.authResponse) {
          let res = response.authResponse
          console.log('Welcome!  Fetching your information.... ');
          // userData.info = res
          // Manager.localStorage.setItem(LocalStoreageDefine.ACCOUNT_TOKEN, res.accessToken);
          FB.api('/me', function (response) {
            console.log('Good to see you, ' + response.name + '.');
            res.id = response.id
            res.name = response.name
            console.log(`Good To See You : ${res.name}`)
            if (callback) {
              callback(res)
            }
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }
  }

  public destroy(): void {
  }

}