// google ID： howwarddyylan@gmail.com 
// PW： wle6p8yhn321 
// 辅助Email： zhurovfilimon78@rambler.ru 
// 辅助Email PW： S9t0FlF778Aa 
// 谷歌开发者账号：
// google ID： kigeina4491@gmail.com 
// PW： 7xCRgFzBA223 
// 辅助Email： yaroslav-aleksandrov-66@list.ru 
// 辅助Email PW： 57TZElhIKe
// Access Approval API
export default class googlesdk {
  protected static _instance: googlesdk = null;
  public static get instance() { return this._instance || (this._instance = new googlesdk()); }
  constructor() {

  }

  public Google_Load() {
    let self = this;
    (function (d: any, s: any, id: any) {
      var js; var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      // (js as any).src = 'https://apis.google.com/js/api.js';
      (js as any).src = 'https://accounts.google.com/gsi/client';
      // (js as any).src = 'https://apis.google.com/js/api:client.js';
      (fjs as any).parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
    // 初始化
    (window as any).fbAsyncInit = function () {
      // @ts-ignore：
      // eslint-disable-next-line no-undef
    }
  }

  public Google_SignOut() {
    let google = window['google']
    if (!google) return;
    google.accounts.id.disableAutoSelect();
  }

  public Google_Login(callback) {
    let self = this
    let gapi = window['gapi']
    // 传统方法
    let start = function () {
      // 2. Initialize the JavaScript client library.
      gapi.client.init({
        'apiKey': 'AIzaSyAvS_49o1oJy47qPhGI7A2F5XdF7vRbo1Q',
        // Your API key will be automatically added to the Discovery Document URLs.
        'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
        // clientId and scope are optional if auth is not required.
        'clientId': '370002132573-m6b7j5b4poakr6r7r3lfbuicudn8v6ej.apps.googleusercontent.com',
        'scope': 'profile',
      }).then(function () {
        // 3. Initialize and make the API request.
        return gapi.client.people.people.get({
          'resourceName': 'people/me',
          'requestMask.includeField': 'person.names'
        });
      }).then(function (response) {
        console.log(response.result);
        let res = response.result;
        res.id = res.names[0].metadata.source.id;
        res.name = res.names[0].displayName;

        console.log(`Good To See You : ${res.name}`)
        if (callback) {
          callback(res)
        }
      }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    };
    // 1. Load the JavaScript client library.
    if (gapi) {
      // gapi.load('client', start);
    }

    //谷歌身份 新方法
    let google = window['google']
    if (!google) return;
    let client = google.accounts.oauth2.initCodeClient({
      client_id: '370002132573-m6b7j5b4poakr6r7r3lfbuicudn8v6ej.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar.readonly \
      https://www.googleapis.com/auth/contacts.readonly',
      callback: (response) => {
        console.log(response);
        if (response.error)
          return;

        let res = response.result;
        if (!res) return;
        res.id = res.names[0].metadata.source.id;
        res.name = res.names[0].displayName;

        console.log(`Good To See You : ${res.name}`)
        if (callback) {
          callback(res)
        }
      },
    });
    client.requestCode();

    // Google's OAuth 2.0 endpoint for requesting an access token
    // var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    // var form = document.createElement('form');
    // form.setAttribute('method', 'GET'); // Send as a GET request.
    // form.setAttribute('action', oauth2Endpoint);

    // // Parameters to pass to OAuth 2.0 endpoint.
    // var params = {
    //   'client_id': '370750100142-5blk1j67h9rrcl0ddrk059t71vsdrggl.apps.googleusercontent.com',
    //   'redirect_uri': 'http://192.168.2.188',
    //   'response_type': 'token',
    //   'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    //   'include_granted_scopes': 'true',
    //   'state': 'pass-through value'
    // };

    // // Add form parameters as hidden input values.
    // for (var p in params) {
    //   var input = document.createElement('input');
    //   input.setAttribute('type', 'hidden');
    //   input.setAttribute('name', p);
    //   input.setAttribute('value', params[p]);
    //   form.appendChild(input);
    // }

    // // Add form to page and submit it to open the OAuth 2.0 endpoint.
    // document.body.appendChild(form);
    // form.submit();
  }

  public destroy(): void {
  }

}