
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/sdk/googlesdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'abc79pAdzBJGpNzpQHABMW1', 'googlesdk');
// script/sdk/googlesdk.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class googlesdk {
    constructor() {
    }
    static get instance() { return this._instance || (this._instance = new googlesdk()); }
    Google_Load() {
        let self = this;
        (function (d, s, id) {
            var js;
            var fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            // (js as any).src = 'https://apis.google.com/js/api.js';
            js.src = 'https://accounts.google.com/gsi/client';
            // (js as any).src = 'https://apis.google.com/js/api:client.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
        // 初始化
        window.fbAsyncInit = function () {
            // @ts-ignore：
            // eslint-disable-next-line no-undef
        };
    }
    Google_SignOut() {
        let google = window['google'];
        if (!google)
            return;
        google.accounts.id.disableAutoSelect();
    }
    Google_Login(callback) {
        let self = this;
        let gapi = window['gapi'];
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
                console.log(`Good To See You : ${res.name}`);
                if (callback) {
                    callback(res);
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
        let google = window['google'];
        if (!google)
            return;
        let client = google.accounts.oauth2.initCodeClient({
            client_id: '370002132573-m6b7j5b4poakr6r7r3lfbuicudn8v6ej.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/calendar.readonly \
      https://www.googleapis.com/auth/contacts.readonly',
            callback: (response) => {
                console.log(response);
                if (response.error)
                    return;
                let res = response.result;
                if (!res)
                    return;
                res.id = res.names[0].metadata.source.id;
                res.name = res.names[0].displayName;
                console.log(`Good To See You : ${res.name}`);
                if (callback) {
                    callback(res);
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
    destroy() {
    }
}
exports.default = googlesdk;
googlesdk._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2RrL2dvb2dsZXNkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxvQkFBb0I7QUFDcEIsdUNBQXVDO0FBQ3ZDLDRCQUE0QjtBQUM1QixXQUFXO0FBQ1gsb0NBQW9DO0FBQ3BDLG9CQUFvQjtBQUNwQiw0Q0FBNEM7QUFDNUMseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUN0QixNQUFxQixTQUFTO0lBRzVCO0lBRUEsQ0FBQztJQUhNLE1BQU0sS0FBSyxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBS3RGLFdBQVc7UUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLENBQUMsVUFBVSxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQU87WUFDaEMsSUFBSSxFQUFFLENBQUM7WUFBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUNyQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3BDLHlEQUF5RDtZQUN4RCxFQUFVLENBQUMsR0FBRyxHQUFHLHdDQUF3QyxDQUFDO1lBQzNELGdFQUFnRTtZQUMvRCxHQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNO1FBQ0wsTUFBYyxDQUFDLFdB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LENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7Z0JBQzVDLElBQUksUUFBUSxFQUFFO29CQUNaLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDZDtZQUNILENBQUM7U0FDRixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckIsNkRBQTZEO1FBQzdELHVFQUF1RTtRQUV2RSx1RUFBdUU7UUFDdkUsNkNBQTZDO1FBQzdDLGdFQUFnRTtRQUNoRSwrQ0FBK0M7UUFFL0MsK0NBQStDO1FBQy9DLGlCQUFpQjtRQUNqQiw2RkFBNkY7UUFDN0YsNENBQTRDO1FBQzVDLDhCQUE4QjtRQUM5Qix3RUFBd0U7UUFDeEUsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxLQUFLO1FBRUwsaURBQWlEO1FBQ2pELDBCQUEwQjtRQUMxQixpREFBaUQ7UUFDakQsMENBQTBDO1FBQzFDLG1DQUFtQztRQUNuQyw0Q0FBNEM7UUFDNUMsNkJBQTZCO1FBQzdCLElBQUk7UUFFSixvRUFBb0U7UUFDcEUsbUNBQW1DO1FBQ25DLGlCQUFpQjtJQUNuQixDQUFDO0lBRU0sT0FBTztJQUNkLENBQUM7O0FBL0hILDRCQWlJQztBQWhJa0IsbUJBQVMsR0FBYyxJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBnb29nbGUgSUTvvJogaG93d2FyZGR5eWxhbkBnbWFpbC5jb20gXG4vLyBQV++8miB3bGU2cDh5aG4zMjEgXG4vLyDovoXliqlFbWFpbO+8miB6aHVyb3ZmaWxpbW9uNzhAcmFtYmxlci5ydSBcbi8vIOi+heWKqUVtYWlsIFBX77yaIFM5dDBGbEY3NzhBYSBcbi8vIOiwt+atjOW8gOWPkeiAhei0puWPt++8mlxuLy8gZ29vZ2xlIElE77yaIGtpZ2VpbmE0NDkxQGdtYWlsLmNvbSBcbi8vIFBX77yaIDd4Q1JnRnpCQTIyMyBcbi8vIOi+heWKqUVtYWls77yaIHlhcm9zbGF2LWFsZWtzYW5kcm92LTY2QGxpc3QucnUgXG4vLyDovoXliqlFbWFpbCBQV++8miA1N1RaRWxoSUtlXG4vLyBBY2Nlc3MgQXBwcm92YWwgQVBJXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnb29nbGVzZGsge1xuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogZ29vZ2xlc2RrID0gbnVsbDtcbiAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgZ29vZ2xlc2RrKCkpOyB9XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBwdWJsaWMgR29vZ2xlX0xvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIChmdW5jdGlvbiAoZDogYW55LCBzOiBhbnksIGlkOiBhbnkpIHtcbiAgICAgIHZhciBqczsgdmFyIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcbiAgICAgIC8vIChqcyBhcyBhbnkpLnNyYyA9ICdodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGkuanMnO1xuICAgICAgKGpzIGFzIGFueSkuc3JjID0gJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50JztcbiAgICAgIC8vIChqcyBhcyBhbnkpLnNyYyA9ICdodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGk6Y2xpZW50LmpzJztcbiAgICAgIChmanMgYXMgYW55KS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICB9KGRvY3VtZW50LCAnc2NyaXB0JywgJ2dvb2dsZS1qc3NkaycpKTtcbiAgICAvLyDliJ3lp4vljJZcbiAgICAod2luZG93IGFzIGFueSkuZmJBc3luY0luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBAdHMtaWdub3Jl77yaXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgR29vZ2xlX1NpZ25PdXQoKSB7XG4gICAgbGV0IGdvb2dsZSA9IHdpbmRvd1snZ29vZ2xlJ11cbiAgICBpZiAoIWdvb2dsZSkgcmV0dXJuO1xuICAgIGdvb2dsZS5hY2NvdW50cy5pZC5kaXNhYmxlQXV0b1NlbGVjdCgpO1xuICB9XG5cbiAgcHVibGljIEdvb2dsZV9Mb2dpbihjYWxsYmFjaykge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIGxldCBnYXBpID0gd2luZG93WydnYXBpJ11cbiAgICAvLyDkvKDnu5/mlrnms5VcbiAgICBsZXQgc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAyLiBJbml0aWFsaXplIHRoZSBKYXZhU2NyaXB0IGNsaWVudCBsaWJyYXJ5LlxuICAgICAgZ2FwaS5jbGllbnQuaW5pdCh7XG4gICAgICAgICdhcGlLZXknOiAnQUl6YVN5QXZTXzQ5bzFvSnk0N3FQaEdJN0EyRjVYZEY3dlJibzFRJyxcbiAgICAgICAgLy8gWW91ciBBUEkga2V5IHdpbGwgYmUgYXV0b21hdGljYWxseSBhZGRlZCB0byB0aGUgRGlzY292ZXJ5IERvY3VtZW50IFVSTHMuXG4gICAgICAgICdkaXNjb3ZlcnlEb2NzJzogWydodHRwczovL3Blb3BsZS5nb29nbGVhcGlzLmNvbS8kZGlzY292ZXJ5L3Jlc3QnXSxcbiAgICAgICAgLy8gY2xpZW50SWQgYW5kIHNjb3BlIGFyZSBvcHRpb25hbCBpZiBhdXRoIGlzIG5vdCByZXF1aXJlZC5cbiAgICAgICAgJ2NsaWVudElkJzogJzM3MDAwMjEzMjU3My1tNmI3ajViNHBvYWtyNnI3cjNsZmJ1aWN1ZG44djZlai5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICAgICdzY29wZSc6ICdwcm9maWxlJyxcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAzLiBJbml0aWFsaXplIGFuZCBtYWtlIHRoZSBBUEkgcmVxdWVzdC5cbiAgICAgICAgcmV0dXJuIGdhcGkuY2xpZW50LnBlb3BsZS5wZW9wbGUuZ2V0KHtcbiAgICAgICAgICAncmVzb3VyY2VOYW1lJzogJ3Blb3BsZS9tZScsXG4gICAgICAgICAgJ3JlcXVlc3RNYXNrLmluY2x1ZGVGaWVsZCc6ICdwZXJzb24ubmFtZXMnXG4gICAgICAgIH0pO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzdWx0KTtcbiAgICAgICAgbGV0IHJlcyA9IHJlc3BvbnNlLnJlc3VsdDtcbiAgICAgICAgcmVzLmlkID0gcmVzLm5hbWVzWzBdLm1ldGFkYXRhLnNvdXJjZS5pZDtcbiAgICAgICAgcmVzLm5hbWUgPSByZXMubmFtZXNbMF0uZGlzcGxheU5hbWU7XG5cbiAgICAgICAgY29uc29sZS5sb2coYEdvb2QgVG8gU2VlIFlvdSA6ICR7cmVzLm5hbWV9YClcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2socmVzKVxuICAgICAgICB9XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIHJlYXNvbi5yZXN1bHQuZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIC8vIDEuIExvYWQgdGhlIEphdmFTY3JpcHQgY2xpZW50IGxpYnJhcnkuXG4gICAgaWYgKGdhcGkpIHtcbiAgICAgIC8vIGdhcGkubG9hZCgnY2xpZW50Jywgc3RhcnQpO1xuICAgIH1cblxuICAgIC8v6LC35q2M6Lqr5Lu9IOaWsOaWueazlVxuICAgIGxldCBnb29nbGUgPSB3aW5kb3dbJ2dvb2dsZSddXG4gICAgaWYgKCFnb29nbGUpIHJldHVybjtcbiAgICBsZXQgY2xpZW50ID0gZ29vZ2xlLmFjY291bnRzLm9hdXRoMi5pbml0Q29kZUNsaWVudCh7XG4gICAgICBjbGllbnRfaWQ6ICczNzAwMDIxMzI1NzMtbTZiN2o1YjRwb2FrcjZyN3IzbGZidWljdWRuOHY2ZWouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgICAgc2NvcGU6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2NhbGVuZGFyLnJlYWRvbmx5IFxcXG4gICAgICBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2NvbnRhY3RzLnJlYWRvbmx5JyxcbiAgICAgIGNhbGxiYWNrOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCByZXMgPSByZXNwb25zZS5yZXN1bHQ7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm47XG4gICAgICAgIHJlcy5pZCA9IHJlcy5uYW1lc1swXS5tZXRhZGF0YS5zb3VyY2UuaWQ7XG4gICAgICAgIHJlcy5uYW1lID0gcmVzLm5hbWVzWzBdLmRpc3BsYXlOYW1lO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBHb29kIFRvIFNlZSBZb3UgOiAke3Jlcy5uYW1lfWApXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrKHJlcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgICBjbGllbnQucmVxdWVzdENvZGUoKTtcblxuICAgIC8vIEdvb2dsZSdzIE9BdXRoIDIuMCBlbmRwb2ludCBmb3IgcmVxdWVzdGluZyBhbiBhY2Nlc3MgdG9rZW5cbiAgICAvLyB2YXIgb2F1dGgyRW5kcG9pbnQgPSAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3YyL2F1dGgnO1xuXG4gICAgLy8gLy8gQ3JlYXRlIDxmb3JtPiBlbGVtZW50IHRvIHN1Ym1pdCBwYXJhbWV0ZXJzIHRvIE9BdXRoIDIuMCBlbmRwb2ludC5cbiAgICAvLyB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAvLyBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ0dFVCcpOyAvLyBTZW5kIGFzIGEgR0VUIHJlcXVlc3QuXG4gICAgLy8gZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIG9hdXRoMkVuZHBvaW50KTtcblxuICAgIC8vIC8vIFBhcmFtZXRlcnMgdG8gcGFzcyB0byBPQXV0aCAyLjAgZW5kcG9pbnQuXG4gICAgLy8gdmFyIHBhcmFtcyA9IHtcbiAgICAvLyAgICdjbGllbnRfaWQnOiAnMzcwNzUwMTAwMTQyLTVibGsxajY3aDlycmNsMGRkcmswNTl0NzF2c2RyZ2dsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICAvLyAgICdyZWRpcmVjdF91cmknOiAnaHR0cDovLzE5Mi4xNjguMi4xODgnLFxuICAgIC8vICAgJ3Jlc3BvbnNlX3R5cGUnOiAndG9rZW4nLFxuICAgIC8vICAgJ3Njb3BlJzogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUubWV0YWRhdGEucmVhZG9ubHknLFxuICAgIC8vICAgJ2luY2x1ZGVfZ3JhbnRlZF9zY29wZXMnOiAndHJ1ZScsXG4gICAgLy8gICAnc3RhdGUnOiAncGFzcy10aHJvdWdoIHZhbHVlJ1xuICAgIC8vIH07XG5cbiAgICAvLyAvLyBBZGQgZm9ybSBwYXJhbWV0ZXJzIGFzIGhpZGRlbiBpbnB1dCB2YWx1ZXMuXG4gICAgLy8gZm9yICh2YXIgcCBpbiBwYXJhbXMpIHtcbiAgICAvLyAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgLy8gICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XG4gICAgLy8gICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwKTtcbiAgICAvLyAgIGlucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBwYXJhbXNbcF0pO1xuICAgIC8vICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgLy8gfVxuXG4gICAgLy8gLy8gQWRkIGZvcm0gdG8gcGFnZSBhbmQgc3VibWl0IGl0IHRvIG9wZW4gdGhlIE9BdXRoIDIuMCBlbmRwb2ludC5cbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIC8vIGZvcm0uc3VibWl0KCk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgfVxuXG59Il19