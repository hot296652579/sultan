
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/external/telegram-widget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8bc50n4dQhK1aMcKLGRjxiq', 'telegram-widget');
// script/framework/external/telegram-widget.js

"use strict";

(function (window) {
  (function (window) {
    window.__parseFunction = function (__func, __attrs) {
      __attrs = __attrs || [];
      __func = '(function(' + __attrs.join(',') + '){' + __func + '})';
      return window.execScript ? window.execScript(__func) : eval(__func);
    };
  })(window);

  (function (window) {
    function addEvent(el, event, handler) {
      var events = event.split(/\s+/);

      for (var i = 0; i < events.length; i++) {
        if (el.addEventListener) {
          el.addEventListener(events[i], handler);
        } else {
          el.attachEvent('on' + events[i], handler);
        }
      }
    }

    function removeEvent(el, event, handler) {
      var events = event.split(/\s+/);

      for (var i = 0; i < events.length; i++) {
        if (el.removeEventListener) {
          el.removeEventListener(events[i], handler);
        } else {
          el.detachEvent('on' + events[i], handler);
        }
      }
    }

    function getCssProperty(el, prop) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(el, '').getPropertyValue(prop) || null;
      } else if (el.currentStyle) {
        return el.currentStyle[prop] || null;
      }

      return null;
    }

    function geById(el_or_id) {
      if (typeof el_or_id == 'string' || el_or_id instanceof String) {
        return document.getElementById(el_or_id);
      } else if (el_or_id instanceof HTMLElement) {
        return el_or_id;
      }

      return null;
    }

    var getWidgetsOrigin = function getWidgetsOrigin(default_origin, dev_origin) {
      var link = document.createElement('A'),
          origin;
      link.href = document.currentScript && document.currentScript.src || default_origin;
      origin = link.origin || link.protocol + '//' + link.hostname;

      if (origin == 'https://telegram.org') {
        origin = default_origin;
      } else if (origin == 'https://telegram-js.azureedge.net' || origin == 'https://tg.dev') {
        origin = dev_origin;
      }

      return origin;
    };

    var getPageCanonical = function getPageCanonical() {
      var a = document.createElement('A'),
          link,
          href;

      if (document.querySelector) {
        link = document.querySelector('link[rel="canonical"]');

        if (link && (href = link.getAttribute('href'))) {
          a.href = href;
          return a.href;
        }
      } else {
        var links = document.getElementsByTagName('LINK');

        for (var i = 0; i < links.length; i++) {
          if ((link = links[i]) && link.getAttribute('rel') == 'canonical' && (href = link.getAttribute('href'))) {
            a.href = href;
            return a.href;
          }
        }
      }

      return false;
    };

    function getXHR() {
      if (navigator.appName == "Microsoft Internet Explorer") {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } else {
        return new XMLHttpRequest();
      }
    }

    if (!window.Telegram) {
      window.Telegram = {};
    }

    if (!window.Telegram.__WidgetUuid) {
      window.Telegram.__WidgetUuid = 0;
    }

    if (!window.Telegram.__WidgetLastId) {
      window.Telegram.__WidgetLastId = 0;
    }

    if (!window.Telegram.__WidgetCallbacks) {
      window.Telegram.__WidgetCallbacks = {};
    }

    function postMessageToIframe(iframe, event, data, callback) {
      if (!iframe._ready) {
        if (!iframe._readyQueue) iframe._readyQueue = [];

        iframe._readyQueue.push([event, data, callback]);

        return;
      }

      try {
        data = data || {};
        data.event = event;

        if (callback) {
          data._cb = ++window.Telegram.__WidgetLastId;
          window.Telegram.__WidgetCallbacks[data._cb] = {
            iframe: iframe,
            callback: callback
          };
        }

        iframe.contentWindow.postMessage(JSON.stringify(data), '*');
      } catch (e) {}
    }

    function initWidget(widgetEl) {
      var widgetId,
          widgetElId,
          widgetsOrigin,
          existsEl,
          src,
          styles = {},
          allowedAttrs = [],
          defWidth,
          defHeight,
          scrollable = false,
          onInitAuthUser,
          onAuthUser,
          onUnauth;

      if (!widgetEl.tagName || !(widgetEl.tagName.toUpperCase() == 'SCRIPT' || widgetEl.tagName.toUpperCase() == 'BLOCKQUOTE' && widgetEl.classList.contains('telegram-post'))) {
        return null;
      }

      if (widgetEl._iframe) {
        return widgetEl._iframe;
      }

      if (widgetId = widgetEl.getAttribute('data-telegram-post')) {
        var comment = widgetEl.getAttribute('data-comment') || '';
        widgetsOrigin = getWidgetsOrigin('https://t.me', 'https://post.tg.dev');
        widgetElId = 'telegram-post-' + widgetId.replace(/[^a-z0-9_]/ig, '-') + (comment ? '-comment' + comment : '');
        src = widgetsOrigin + '/' + widgetId + '?embed=1';
        allowedAttrs = ['comment', 'userpic', 'mode', 'single?', 'color', 'dark', 'dark_color'];
        defWidth = widgetEl.getAttribute('data-width') || '100%';
        defHeight = '';
        styles.minWidth = '320px';
      } else if (widgetId = widgetEl.getAttribute('data-telegram-discussion')) {
        widgetsOrigin = getWidgetsOrigin('https://t.me', 'https://post.tg.dev');
        widgetElId = 'telegram-discussion-' + widgetId.replace(/[^a-z0-9_]/ig, '-') + '-' + ++window.Telegram.__WidgetUuid;
        var websitePageUrl = widgetEl.getAttribute('data-page-url');

        if (!websitePageUrl) {
          websitePageUrl = getPageCanonical();
        }

        src = widgetsOrigin + '/' + widgetId + '?embed=1&discussion=1' + (websitePageUrl ? '&page_url=' + encodeURIComponent(websitePageUrl) : '');
        allowedAttrs = ['comments_limit', 'color', 'colorful', 'dark', 'dark_color', 'width', 'height'];
        defWidth = widgetEl.getAttribute('data-width') || '100%';
        defHeight = widgetEl.getAttribute('data-height') || 0;
        styles.minWidth = '320px';

        if (defHeight > 0) {
          scrollable = true;
        }
      } else if (widgetEl.hasAttribute('data-telegram-login')) {
        widgetId = widgetEl.getAttribute('data-telegram-login');
        widgetsOrigin = getWidgetsOrigin('https://oauth.telegram.org', 'https://oauth.tg.dev');
        widgetElId = 'telegram-login-' + widgetId.replace(/[^a-z0-9_]/ig, '-');
        src = widgetsOrigin + '/embed/' + widgetId + '?origin=' + encodeURIComponent(location.origin || location.protocol + '//' + location.hostname);
        allowedAttrs = ['size', 'userpic', 'init_auth', 'request_access', 'radius', 'min_width', 'max_width', 'lang'];
        defWidth = 186;
        defHeight = 28;

        if (widgetEl.hasAttribute('data-size')) {
          var size = widgetEl.getAttribute('data-size');
          if (size == 'small') defWidth = 148, defHeight = 20;else if (size == 'large') defWidth = 238, defHeight = 40;
        }

        if (widgetEl.hasAttribute('data-onauth')) {
          onInitAuthUser = onAuthUser = __parseFunction(widgetEl.getAttribute('data-onauth'), ['user']);
        } else if (widgetEl.hasAttribute('data-auth-url')) {
          var a = document.createElement('A');
          a.href = widgetEl.getAttribute('data-auth-url');

          onAuthUser = function onAuthUser(user) {
            var authUrl = a.href;
            authUrl += authUrl.indexOf('?') >= 0 ? '&' : '?';
            var params = [];

            for (var key in user) {
              params.push(key + '=' + encodeURIComponent(user[key]));
            }

            authUrl += params.join('&');
            location.href = authUrl;
          };
        }

        if (widgetEl.hasAttribute('data-onunauth')) {
          onUnauth = __parseFunction(widgetEl.getAttribute('data-onunauth'));
        }
      } else if (widgetId = widgetEl.getAttribute('data-telegram-share-url')) {
        widgetsOrigin = getWidgetsOrigin('https://t.me', 'https://post.tg.dev');
        widgetElId = 'telegram-share-' + window.btoa(widgetId);
        src = widgetsOrigin + '/share/embed?origin=' + encodeURIComponent(location.origin || location.protocol + '//' + location.hostname);
        allowedAttrs = ['telegram-share-url', 'comment', 'size', 'text'];
        defWidth = 60;
        defHeight = 20;

        if (widgetEl.getAttribute('data-size') == 'large') {
          defWidth = 76;
          defHeight = 28;
        }
      } else {
        return null;
      }

      existsEl = document.getElementById(widgetElId);

      if (existsEl) {
        return existsEl;
      }

      for (var i = 0; i < allowedAttrs.length; i++) {
        var attr = allowedAttrs[i];
        var novalue = attr.substr(-1) == '?';

        if (novalue) {
          attr = attr.slice(0, -1);
        }

        var data_attr = 'data-' + attr.replace(/_/g, '-');

        if (widgetEl.hasAttribute(data_attr)) {
          var attr_value = novalue ? '1' : encodeURIComponent(widgetEl.getAttribute(data_attr));
          src += '&' + attr + '=' + attr_value;
        }
      }

      function getCurCoords(iframe) {
        var docEl = document.documentElement;
        var frect = iframe.getBoundingClientRect();
        return {
          frameTop: frect.top,
          frameBottom: frect.bottom,
          frameLeft: frect.left,
          frameRight: frect.right,
          frameWidth: frect.width,
          frameHeight: frect.height,
          scrollTop: window.pageYOffset,
          scrollLeft: window.pageXOffset,
          clientWidth: docEl.clientWidth,
          clientHeight: docEl.clientHeight
        };
      }

      function visibilityHandler() {
        if (isVisible(iframe, 50)) {
          postMessageToIframe(iframe, 'visible', {
            frame: widgetElId
          });
        }
      }

      function focusHandler() {
        postMessageToIframe(iframe, 'focus', {
          has_focus: document.hasFocus()
        });
      }

      function postMessageHandler(event) {
        if (event.source !== iframe.contentWindow || event.origin != widgetsOrigin) {
          return;
        }

        try {
          var data = JSON.parse(event.data);
        } catch (e) {
          var data = {};
        }

        if (data.event == 'resize') {
          if (data.height) {
            iframe.style.height = data.height + 'px';
          }

          if (data.width) {
            iframe.style.width = data.width + 'px';
          }
        } else if (data.event == 'ready') {
          iframe._ready = true;
          focusHandler();

          for (var i = 0; i < iframe._readyQueue.length; i++) {
            var queue_item = iframe._readyQueue[i];
            postMessageToIframe(iframe, queue_item[0], queue_item[1], queue_item[2]);
          }

          iframe._readyQueue = [];
        } else if (data.event == 'visible_off') {
          removeEvent(window, 'scroll', visibilityHandler);
          removeEvent(window, 'resize', visibilityHandler);
        } else if (data.event == 'get_coords') {
          postMessageToIframe(iframe, 'callback', {
            _cb: data._cb,
            value: getCurCoords(iframe)
          });
        } else if (data.event == 'scroll_to') {
          try {
            window.scrollTo(data.x || 0, data.y || 0);
          } catch (e) {}
        } else if (data.event == 'auth_user') {
          if (data.init) {
            onInitAuthUser && onInitAuthUser(data.auth_data);
          } else {
            onAuthUser && onAuthUser(data.auth_data);
          }
        } else if (data.event == 'unauthorized') {
          onUnauth && onUnauth();
        } else if (data.event == 'callback') {
          var cb_data = null;

          if (cb_data = window.Telegram.__WidgetCallbacks[data._cb]) {
            if (cb_data.iframe === iframe) {
              cb_data.callback(data.value);
              delete window.Telegram.__WidgetCallbacks[data._cb];
            }
          } else {
            console.warn('Callback #' + data._cb + ' not found');
          }
        }
      }

      var iframe = document.createElement('iframe');
      iframe.id = widgetElId;
      iframe.src = src;
      iframe.width = defWidth;
      iframe.height = defHeight;
      iframe.setAttribute('frameborder', '0');

      if (!scrollable) {
        iframe.setAttribute('scrolling', 'no');
        iframe.style.overflow = 'hidden';
      }

      iframe.style.border = 'none';

      for (var prop in styles) {
        iframe.style[prop] = styles[prop];
      }

      if (widgetEl.parentNode) {
        widgetEl.parentNode.insertBefore(iframe, widgetEl);

        if (widgetEl.tagName.toUpperCase() == 'BLOCKQUOTE') {
          widgetEl.parentNode.removeChild(widgetEl);
        }
      }

      iframe._ready = false;
      iframe._readyQueue = [];
      widgetEl._iframe = iframe;
      addEvent(iframe, 'load', function () {
        removeEvent(iframe, 'load', visibilityHandler);
        addEvent(window, 'scroll', visibilityHandler);
        addEvent(window, 'resize', visibilityHandler);
        visibilityHandler();
      });
      addEvent(window, 'focus blur', focusHandler);
      addEvent(window, 'message', postMessageHandler);
      return iframe;
    }

    function isVisible(el, padding) {
      var node = el,
          val;
      var visibility = getCssProperty(node, 'visibility');
      if (visibility == 'hidden') return false;

      while (node) {
        if (node === document.documentElement) break;
        var display = getCssProperty(node, 'display');
        if (display == 'none') return false;
        var opacity = getCssProperty(node, 'opacity');
        if (opacity !== null && opacity < 0.1) return false;
        node = node.parentNode;
      }

      if (el.getBoundingClientRect) {
        padding = +padding || 0;
        var rect = el.getBoundingClientRect();
        var html = document.documentElement;

        if (rect.bottom < padding || rect.right < padding || rect.top > (window.innerHeight || html.clientHeight) - padding || rect.left > (window.innerWidth || html.clientWidth) - padding) {
          return false;
        }
      }

      return true;
    }

    function getAllWidgets() {
      var widgets = [];

      if (document.querySelectorAll) {
        widgets = document.querySelectorAll('script[data-telegram-post],blockquote.telegram-post,script[data-telegram-discussion],script[data-telegram-login],script[data-telegram-share-url]');
      } else {
        widgets = Array.prototype.slice.apply(document.getElementsByTagName('SCRIPT'));
        widgets = widgets.concat(Array.prototype.slice.apply(document.getElementsByTagName('BLOCKQUOTE')));
      }

      return widgets;
    }

    function getWidgetInfo(el_or_id, callback) {
      var e = null,
          iframe = null;

      if (el = geById(el_or_id)) {
        if (el.tagName && el.tagName.toUpperCase() == 'IFRAME') {
          iframe = el;
        } else if (el._iframe) {
          iframe = el._iframe;
        }

        if (iframe && callback) {
          postMessageToIframe(iframe, 'get_info', {}, callback);
        }
      }
    }

    function setWidgetOptions(options, el_or_id) {
      var e = null,
          iframe = null;

      if (typeof el_or_id === 'undefined') {
        var widgets = getAllWidgets();

        for (var i = 0; i < widgets.length; i++) {
          if (iframe = widgets[i]._iframe) {
            postMessageToIframe(iframe, 'set_options', {
              options: options
            });
          }
        }
      } else {
        if (el = geById(el_or_id)) {
          if (el.tagName && el.tagName.toUpperCase() == 'IFRAME') {
            iframe = el;
          } else if (el._iframe) {
            iframe = el._iframe;
          }

          if (iframe) {
            postMessageToIframe(iframe, 'set_options', {
              options: options
            });
          }
        }
      }
    }

    if (!document.currentScript || !initWidget(document.currentScript)) {
      var widgets = getAllWidgets();

      for (var i = 0; i < widgets.length; i++) {
        initWidget(widgets[i]);
      }
    }

    var TelegramLogin = {
      popups: {},
      auth: function auth(options, callback) {
        var bot_id = parseInt(options.bot_id);

        if (!bot_id) {
          throw new Error('Bot id required');
        }

        var width = 550;
        var height = 470;
        var left = Math.max(0, (screen.width - width) / 2) + (screen.availLeft | 0),
            top = Math.max(0, (screen.height - height) / 2) + (screen.availTop | 0);

        var onMessage = function onMessage(event) {
          try {
            var data = JSON.parse(event.data);
          } catch (e) {
            var data = {};
          }

          if (!TelegramLogin.popups[bot_id]) return;
          if (event.source !== TelegramLogin.popups[bot_id].window) return;

          if (data.event == 'auth_result') {
            onAuthDone(data.result);
          }
        };

        var onAuthDone = function onAuthDone(authData) {
          if (!TelegramLogin.popups[bot_id]) return;
          if (TelegramLogin.popups[bot_id].authFinished) return;
          callback && callback(authData);
          TelegramLogin.popups[bot_id].authFinished = true;
          removeEvent(window, 'message', onMessage);
        };

        var checkClose = function checkClose(bot_id) {
          if (!TelegramLogin.popups[bot_id]) return;

          if (!TelegramLogin.popups[bot_id].window || TelegramLogin.popups[bot_id].window.closed) {
            return TelegramLogin.getAuthData(options, function (origin, authData) {
              onAuthDone(authData);
            });
          }

          setTimeout(checkClose, 100, bot_id);
        }; //Telegram.Login.widgetsOrigin


        var popup_url = 'https://oauth.telegram.org/auth?bot_id=' + encodeURIComponent(options.bot_id) + '&origin=' + encodeURIComponent(location.origin || location.protocol + '//' + location.hostname) + (options.request_access ? '&request_access=' + encodeURIComponent(options.request_access) : '') + (options.lang ? '&lang=' + encodeURIComponent(options.lang) : '');
        var popup = window.open(popup_url, 'telegram_oauth_bot' + bot_id, 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',status=0,location=0,menubar=0,toolbar=0');
        TelegramLogin.popups[bot_id] = {
          window: popup,
          authFinished: false
        };

        if (popup) {
          addEvent(window, 'message', onMessage);
          popup.focus();
          checkClose(bot_id);
        }
      },
      getAuthData: function getAuthData(options, callback) {
        var bot_id = parseInt(options.bot_id);

        if (!bot_id) {
          throw new Error('Bot id required');
        }

        var xhr = getXHR();
        var url = 'https://oauth.telegram.org/auth/get';
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (typeof xhr.responseBody == 'undefined' && xhr.responseText) {
              try {
                var result = JSON.parse(xhr.responseText);
              } catch (e) {
                var result = {};
              }

              if (result.user) {
                callback(result.origin, result.user);
              } else {
                callback(result.origin, false);
              }
            } else {
              callback('*', false);
            }
          }
        };

        xhr.onerror = function () {
          callback('*', false);
        };

        xhr.withCredentials = true;
        xhr.send('bot_id=' + encodeURIComponent(options.bot_id) + (options.lang ? '&lang=' + encodeURIComponent(options.lang) : ''));
      }
    };
    window.Telegram.getWidgetInfo = getWidgetInfo;
    window.Telegram.setWidgetOptions = setWidgetOptions;
    window.Telegram.Login = {
      auth: TelegramLogin.auth,
      widgetsOrigin: getWidgetsOrigin('https://oauth.telegram.org', 'https://oauth.tg.dev')
    };
  })(window);
})(window);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3RlbGVncmFtLXdpZGdldC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJfX3BhcnNlRnVuY3Rpb24iLCJfX2Z1bmMiLCJfX2F0dHJzIiwiam9pbiIsImV4ZWNTY3JpcHQiLCJldmFsIiwiYWRkRXZlbnQiLCJlbCIsImV2ZW50IiwiaGFuZGxlciIsImV2ZW50cyIsInNwbGl0IiwiaSIsImxlbmd0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsInJlbW92ZUV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwiZ2V0Q3NzUHJvcGVydHkiLCJwcm9wIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiLCJjdXJyZW50U3R5bGUiLCJnZUJ5SWQiLCJlbF9vcl9pZCIsIlN0cmluZyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJIVE1MRWxlbWVudCIsImdldFdpZGdldHNPcmlnaW4iLCJkZWZhdWx0X29yaWdpbiIsImRldl9vcmlnaW4iLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsIm9yaWdpbiIsImhyZWYiLCJjdXJyZW50U2NyaXB0Iiwic3JjIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsImdldFBhZ2VDYW5vbmljYWwiLCJhIiwicXVlcnlTZWxlY3RvciIsImdldEF0dHJpYnV0ZSIsImxpbmtzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRYSFIiLCJuYXZpZ2F0b3IiLCJhcHBOYW1lIiwiQWN0aXZlWE9iamVjdCIsIlhNTEh0dHBSZXF1ZXN0IiwiVGVsZWdyYW0iLCJfX1dpZGdldFV1aWQiLCJfX1dpZGdldExhc3RJZCIsIl9fV2lkZ2V0Q2FsbGJhY2tzIiwicG9zdE1lc3NhZ2VUb0lmcmFtZSIsImlmcmFtZSIsImRhdGEiLCJjYWxsYmFjayIsIl9yZWFkeSIsIl9yZWFkeVF1ZXVlIiwicHVzaCIsIl9jYiIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlIiwiaW5pdFdpZGdldCIsIndpZGdldEVsIiwid2lkZ2V0SWQiLCJ3aWRnZXRFbElkIiwid2lkZ2V0c09yaWdpbiIsImV4aXN0c0VsIiwic3R5bGVzIiwiYWxsb3dlZEF0dHJzIiwiZGVmV2lkdGgiLCJkZWZIZWlnaHQiLCJzY3JvbGxhYmxlIiwib25Jbml0QXV0aFVzZXIiLCJvbkF1dGhVc2VyIiwib25VbmF1dGgiLCJ0YWdOYW1lIiwidG9VcHBlckNhc2UiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIl9pZnJhbWUiLCJjb21tZW50IiwicmVwbGFjZSIsIm1pbldpZHRoIiwid2Vic2l0ZVBhZ2VVcmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJoYXNBdHRyaWJ1dGUiLCJsb2NhdGlvbiIsInNpemUiLCJ1c2VyIiwiYXV0aFVybCIsImluZGV4T2YiLCJwYXJhbXMiLCJrZXkiLCJidG9hIiwiYXR0ciIsIm5vdmFsdWUiLCJzdWJzdHIiLCJzbGljZSIsImRhdGFfYXR0ciIsImF0dHJfdmFsdWUiLCJnZXRDdXJDb29yZHMiLCJkb2NFbCIsImRvY3VtZW50RWxlbWVudCIsImZyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZnJhbWVUb3AiLCJ0b3AiLCJmcmFtZUJvdHRvbSIsImJvdHRvbSIsImZyYW1lTGVmdCIsImxlZnQiLCJmcmFtZVJpZ2h0IiwicmlnaHQiLCJmcmFtZVdpZHRoIiwid2lkdGgiLCJmcmFtZUhlaWdodCIsImhlaWdodCIsInNjcm9sbFRvcCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsTGVmdCIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJ2aXNpYmlsaXR5SGFuZGxlciIsImlzVmlzaWJsZSIsImZyYW1lIiwiZm9jdXNIYW5kbGVyIiwiaGFzX2ZvY3VzIiwiaGFzRm9jdXMiLCJwb3N0TWVzc2FnZUhhbmRsZXIiLCJzb3VyY2UiLCJwYXJzZSIsInN0eWxlIiwicXVldWVfaXRlbSIsInZhbHVlIiwic2Nyb2xsVG8iLCJ4IiwieSIsImluaXQiLCJhdXRoX2RhdGEiLCJjYl9kYXRhIiwiY29uc29sZSIsIndhcm4iLCJpZCIsInNldEF0dHJpYnV0ZSIsIm92ZXJmbG93IiwiYm9yZGVyIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwicGFkZGluZyIsIm5vZGUiLCJ2YWwiLCJ2aXNpYmlsaXR5IiwiZGlzcGxheSIsIm9wYWNpdHkiLCJyZWN0IiwiaHRtbCIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsImdldEFsbFdpZGdldHMiLCJ3aWRnZXRzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwicHJvdG90eXBlIiwiYXBwbHkiLCJjb25jYXQiLCJnZXRXaWRnZXRJbmZvIiwic2V0V2lkZ2V0T3B0aW9ucyIsIm9wdGlvbnMiLCJUZWxlZ3JhbUxvZ2luIiwicG9wdXBzIiwiYXV0aCIsImJvdF9pZCIsInBhcnNlSW50IiwiRXJyb3IiLCJNYXRoIiwibWF4Iiwic2NyZWVuIiwiYXZhaWxMZWZ0IiwiYXZhaWxUb3AiLCJvbk1lc3NhZ2UiLCJvbkF1dGhEb25lIiwicmVzdWx0IiwiYXV0aERhdGEiLCJhdXRoRmluaXNoZWQiLCJjaGVja0Nsb3NlIiwiY2xvc2VkIiwiZ2V0QXV0aERhdGEiLCJzZXRUaW1lb3V0IiwicG9wdXBfdXJsIiwicmVxdWVzdF9hY2Nlc3MiLCJsYW5nIiwicG9wdXAiLCJvcGVuIiwiZm9jdXMiLCJ4aHIiLCJ1cmwiLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInJlc3BvbnNlQm9keSIsInJlc3BvbnNlVGV4dCIsIm9uZXJyb3IiLCJ3aXRoQ3JlZGVudGlhbHMiLCJzZW5kIiwiTG9naW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxVQUFVQSxNQUFWLEVBQWtCO0FBQ2hCLGFBQVVBLE1BQVYsRUFBa0I7QUFDakJBLElBQUFBLE1BQU0sQ0FBQ0MsZUFBUCxHQUF5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LE1BaGhCSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICB3aW5kb3cuX19wYXJzZUZ1bmN0aW9uID0gZnVuY3Rpb24gKF9fZnVuYywgX19hdHRycykge1xuICAgICAgX19hdHRycyA9IF9fYXR0cnMgfHwgW107XG4gICAgICBfX2Z1bmMgPSAnKGZ1bmN0aW9uKCcgKyBfX2F0dHJzLmpvaW4oJywnKSArICcpeycgKyBfX2Z1bmMgKyAnfSknO1xuICAgICAgcmV0dXJuIHdpbmRvdy5leGVjU2NyaXB0ID8gd2luZG93LmV4ZWNTY3JpcHQoX19mdW5jKSA6IGV2YWwoX19mdW5jKTtcbiAgICB9XG4gIH0od2luZG93KSk7XG4gIChmdW5jdGlvbiAod2luZG93KSB7XG5cbiAgICBmdW5jdGlvbiBhZGRFdmVudChlbCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIHZhciBldmVudHMgPSBldmVudC5zcGxpdCgvXFxzKy8pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgaGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50c1tpXSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWwsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICB2YXIgZXZlbnRzID0gZXZlbnQuc3BsaXQoL1xccysvKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIGhhbmRsZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudHNbaV0sIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldENzc1Byb3BlcnR5KGVsLCBwcm9wKSB7XG4gICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCAnJykuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSB8fCBudWxsO1xuICAgICAgfSBlbHNlIGlmIChlbC5jdXJyZW50U3R5bGUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmN1cnJlbnRTdHlsZVtwcm9wXSB8fCBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdlQnlJZChlbF9vcl9pZCkge1xuICAgICAgaWYgKHR5cGVvZiBlbF9vcl9pZCA9PSAnc3RyaW5nJyB8fCBlbF9vcl9pZCBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxfb3JfaWQpO1xuICAgICAgfSBlbHNlIGlmIChlbF9vcl9pZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbF9vcl9pZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBnZXRXaWRnZXRzT3JpZ2luID0gZnVuY3Rpb24gKGRlZmF1bHRfb3JpZ2luLCBkZXZfb3JpZ2luKSB7XG4gICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKSwgb3JpZ2luO1xuICAgICAgbGluay5ocmVmID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYyB8fCBkZWZhdWx0X29yaWdpbjtcbiAgICAgIG9yaWdpbiA9IGxpbmsub3JpZ2luIHx8IGxpbmsucHJvdG9jb2wgKyAnLy8nICsgbGluay5ob3N0bmFtZTtcbiAgICAgIGlmIChvcmlnaW4gPT0gJ2h0dHBzOi8vdGVsZWdyYW0ub3JnJykge1xuICAgICAgICBvcmlnaW4gPSBkZWZhdWx0X29yaWdpbjtcbiAgICAgIH0gZWxzZSBpZiAob3JpZ2luID09ICdodHRwczovL3RlbGVncmFtLWpzLmF6dXJlZWRnZS5uZXQnIHx8IG9yaWdpbiA9PSAnaHR0cHM6Ly90Zy5kZXYnKSB7XG4gICAgICAgIG9yaWdpbiA9IGRldl9vcmlnaW47XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ2luO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0UGFnZUNhbm9uaWNhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpLCBsaW5rLCBocmVmO1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgICAgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwiY2Fub25pY2FsXCJdJyk7XG4gICAgICAgIGlmIChsaW5rICYmIChocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkpIHtcbiAgICAgICAgICBhLmhyZWYgPSBocmVmO1xuICAgICAgICAgIHJldHVybiBhLmhyZWY7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdMSU5LJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoKGxpbmsgPSBsaW5rc1tpXSkgJiZcbiAgICAgICAgICAgIChsaW5rLmdldEF0dHJpYnV0ZSgncmVsJykgPT0gJ2Nhbm9uaWNhbCcpICYmXG4gICAgICAgICAgICAoaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykpKSB7XG4gICAgICAgICAgICBhLmhyZWYgPSBocmVmO1xuICAgICAgICAgICAgcmV0dXJuIGEuaHJlZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0WEhSKCkge1xuICAgICAgaWYgKG5hdmlnYXRvci5hcHBOYW1lID09IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cuVGVsZWdyYW0pIHtcbiAgICAgIHdpbmRvdy5UZWxlZ3JhbSA9IHt9O1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5UZWxlZ3JhbS5fX1dpZGdldFV1aWQpIHtcbiAgICAgIHdpbmRvdy5UZWxlZ3JhbS5fX1dpZGdldFV1aWQgPSAwO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5UZWxlZ3JhbS5fX1dpZGdldExhc3RJZCkge1xuICAgICAgd2luZG93LlRlbGVncmFtLl9fV2lkZ2V0TGFzdElkID0gMDtcbiAgICB9XG4gICAgaWYgKCF3aW5kb3cuVGVsZWdyYW0uX19XaWRnZXRDYWxsYmFja3MpIHtcbiAgICAgIHdpbmRvdy5UZWxlZ3JhbS5fX1dpZGdldENhbGxiYWNrcyA9IHt9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvc3RNZXNzYWdlVG9JZnJhbWUoaWZyYW1lLCBldmVudCwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghaWZyYW1lLl9yZWFkeSkge1xuICAgICAgICBpZiAoIWlmcmFtZS5fcmVhZHlRdWV1ZSkgaWZyYW1lLl9yZWFkeVF1ZXVlID0gW107XG4gICAgICAgIGlmcmFtZS5fcmVhZHlRdWV1ZS5wdXNoKFtldmVudCwgZGF0YSwgY2FsbGJhY2tdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIGRhdGEuZXZlbnQgPSBldmVudDtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgZGF0YS5fY2IgPSArK3dpbmRvdy5UZWxlZ3JhbS5fX1dpZGdldExhc3RJZDtcbiAgICAgICAgICB3aW5kb3cuVGVsZWdyYW0uX19XaWRnZXRDYWxsYmFja3NbZGF0YS5fY2JdID0ge1xuICAgICAgICAgICAgaWZyYW1lOiBpZnJhbWUsXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KGRhdGEpLCAnKicpO1xuICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdFdpZGdldCh3aWRnZXRFbCkge1xuICAgICAgdmFyIHdpZGdldElkLCB3aWRnZXRFbElkLCB3aWRnZXRzT3JpZ2luLCBleGlzdHNFbCxcbiAgICAgICAgc3JjLCBzdHlsZXMgPSB7fSwgYWxsb3dlZEF0dHJzID0gW10sXG4gICAgICAgIGRlZldpZHRoLCBkZWZIZWlnaHQsIHNjcm9sbGFibGUgPSBmYWxzZSwgb25Jbml0QXV0aFVzZXIsIG9uQXV0aFVzZXIsIG9uVW5hdXRoO1xuICAgICAgaWYgKCF3aWRnZXRFbC50YWdOYW1lIHx8XG4gICAgICAgICEod2lkZ2V0RWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09ICdTQ1JJUFQnIHx8XG4gICAgICAgICAgd2lkZ2V0RWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09ICdCTE9DS1FVT1RFJyAmJlxuICAgICAgICAgIHdpZGdldEVsLmNsYXNzTGlzdC5jb250YWlucygndGVsZWdyYW0tcG9zdCcpKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh3aWRnZXRFbC5faWZyYW1lKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXRFbC5faWZyYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHdpZGdldElkID0gd2lkZ2V0RWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRlbGVncmFtLXBvc3QnKSkge1xuICAgICAgICB2YXIgY29tbWVudCA9IHdpZGdldEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb21tZW50JykgfHwgJyc7XG4gICAgICAgIHdpZGdldHNPcmlnaW4gPSBnZXRXaWRnZXRzT3JpZ2luKCdodHRwczovL3QubWUnLCAnaHR0cHM6Ly9wb3N0LnRnLmRldicpO1xuICAgICAgICB3aWRnZXRFbElkID0gJ3RlbGVncmFtLXBvc3QtJyArIHdpZGdldElkLnJlcGxhY2UoL1teYS16MC05X10vaWcsICctJykgKyAoY29tbWVudCA/ICctY29tbWVudCcgKyBjb21tZW50IDogJycpO1xuICAgICAgICBzcmMgPSB3aWRnZXRzT3JpZ2luICsgJy8nICsgd2lkZ2V0SWQgKyAnP2VtYmVkPTEnO1xuICAgICAgICBhbGxvd2VkQXR0cnMgPSBbJ2NvbW1lbnQnLCAndXNlcnBpYycsICdtb2RlJywgJ3NpbmdsZT8nLCAnY29sb3InLCAnZGFyaycsICdkYXJrX2NvbG9yJ107XG4gICAgICAgIGRlZldpZHRoID0gd2lkZ2V0RWwuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJykgfHwgJzEwMCUnO1xuICAgICAgICBkZWZIZWlnaHQgPSAnJztcbiAgICAgICAgc3R5bGVzLm1pbldpZHRoID0gJzMyMHB4JztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHdpZGdldElkID0gd2lkZ2V0RWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRlbGVncmFtLWRpc2N1c3Npb24nKSkge1xuICAgICAgICB3aWRnZXRzT3JpZ2luID0gZ2V0V2lkZ2V0c09yaWdpbignaHR0cHM6Ly90Lm1lJywgJ2h0dHBzOi8vcG9zdC50Zy5kZXYnKTtcbiAgICAgICAgd2lkZ2V0RWxJZCA9ICd0ZWxlZ3JhbS1kaXNjdXNzaW9uLScgKyB3aWRnZXRJZC5yZXBsYWNlKC9bXmEtejAtOV9dL2lnLCAnLScpICsgJy0nICsgKCsrd2luZG93LlRlbGVncmFtLl9fV2lkZ2V0VXVpZCk7XG4gICAgICAgIHZhciB3ZWJzaXRlUGFnZVVybCA9IHdpZGdldEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLXVybCcpO1xuICAgICAgICBpZiAoIXdlYnNpdGVQYWdlVXJsKSB7XG4gICAgICAgICAgd2Vic2l0ZVBhZ2VVcmwgPSBnZXRQYWdlQ2Fub25pY2FsKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3JjID0gd2lkZ2V0c09yaWdpbiArICcvJyArIHdpZGdldElkICsgJz9lbWJlZD0xJmRpc2N1c3Npb249MScgKyAod2Vic2l0ZVBhZ2VVcmwgPyAnJnBhZ2VfdXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQod2Vic2l0ZVBhZ2VVcmwpIDogJycpO1xuICAgICAgICBhbGxvd2VkQXR0cnMgPSBbJ2NvbW1lbnRzX2xpbWl0JywgJ2NvbG9yJywgJ2NvbG9yZnVsJywgJ2RhcmsnLCAnZGFya19jb2xvcicsICd3aWR0aCcsICdoZWlnaHQnXTtcbiAgICAgICAgZGVmV2lkdGggPSB3aWRnZXRFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKSB8fCAnMTAwJSc7XG4gICAgICAgIGRlZkhlaWdodCA9IHdpZGdldEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnKSB8fCAwO1xuICAgICAgICBzdHlsZXMubWluV2lkdGggPSAnMzIwcHgnO1xuICAgICAgICBpZiAoZGVmSGVpZ2h0ID4gMCkge1xuICAgICAgICAgIHNjcm9sbGFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh3aWRnZXRFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdGVsZWdyYW0tbG9naW4nKSkge1xuICAgICAgICB3aWRnZXRJZCA9IHdpZGdldEVsLmdldEF0dHJpYnV0ZSgnZGF0YS10ZWxlZ3JhbS1sb2dpbicpO1xuICAgICAgICB3aWRnZXRzT3JpZ2luID0gZ2V0V2lkZ2V0c09yaWdpbignaHR0cHM6Ly9vYXV0aC50ZWxlZ3JhbS5vcmcnLCAnaHR0cHM6Ly9vYXV0aC50Zy5kZXYnKTtcbiAgICAgICAgd2lkZ2V0RWxJZCA9ICd0ZWxlZ3JhbS1sb2dpbi0nICsgd2lkZ2V0SWQucmVwbGFjZSgvW15hLXowLTlfXS9pZywgJy0nKTtcbiAgICAgICAgc3JjID0gd2lkZ2V0c09yaWdpbiArICcvZW1iZWQvJyArIHdpZGdldElkICsgJz9vcmlnaW49JyArIGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5vcmlnaW4gfHwgbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdG5hbWUpO1xuICAgICAgICBhbGxvd2VkQXR0cnMgPSBbJ3NpemUnLCAndXNlcnBpYycsICdpbml0X2F1dGgnLCAncmVxdWVzdF9hY2Nlc3MnLCAncmFkaXVzJywgJ21pbl93aWR0aCcsICdtYXhfd2lkdGgnLCAnbGFuZyddO1xuICAgICAgICBkZWZXaWR0aCA9IDE4NjtcbiAgICAgICAgZGVmSGVpZ2h0ID0gMjg7XG4gICAgICAgIGlmICh3aWRnZXRFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpKSB7XG4gICAgICAgICAgdmFyIHNpemUgPSB3aWRnZXRFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpO1xuICAgICAgICAgIGlmIChzaXplID09ICdzbWFsbCcpIGRlZldpZHRoID0gMTQ4LCBkZWZIZWlnaHQgPSAyMDtcbiAgICAgICAgICBlbHNlIGlmIChzaXplID09ICdsYXJnZScpIGRlZldpZHRoID0gMjM4LCBkZWZIZWlnaHQgPSA0MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkZ2V0RWwuaGFzQXR0cmlidXRlKCdkYXRhLW9uYXV0aCcpKSB7XG4gICAgICAgICAgb25Jbml0QXV0aFVzZXIgPSBvbkF1dGhVc2VyID0gX19wYXJzZUZ1bmN0aW9uKHdpZGdldEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vbmF1dGgnKSwgWyd1c2VyJ10pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHdpZGdldEVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1hdXRoLXVybCcpKSB7XG4gICAgICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XG4gICAgICAgICAgYS5ocmVmID0gd2lkZ2V0RWwuZ2V0QXR0cmlidXRlKCdkYXRhLWF1dGgtdXJsJyk7XG4gICAgICAgICAgb25BdXRoVXNlciA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICB2YXIgYXV0aFVybCA9IGEuaHJlZjtcbiAgICAgICAgICAgIGF1dGhVcmwgKz0gKGF1dGhVcmwuaW5kZXhPZignPycpID49IDApID8gJyYnIDogJz8nO1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHVzZXIpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLnB1c2goa2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJba2V5XSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXV0aFVybCArPSBwYXJhbXMuam9pbignJicpO1xuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGF1dGhVcmw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkZ2V0RWwuaGFzQXR0cmlidXRlKCdkYXRhLW9udW5hdXRoJykpIHtcbiAgICAgICAgICBvblVuYXV0aCA9IF9fcGFyc2VGdW5jdGlvbih3aWRnZXRFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb251bmF1dGgnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHdpZGdldElkID0gd2lkZ2V0RWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRlbGVncmFtLXNoYXJlLXVybCcpKSB7XG4gICAgICAgIHdpZGdldHNPcmlnaW4gPSBnZXRXaWRnZXRzT3JpZ2luKCdodHRwczovL3QubWUnLCAnaHR0cHM6Ly9wb3N0LnRnLmRldicpO1xuICAgICAgICB3aWRnZXRFbElkID0gJ3RlbGVncmFtLXNoYXJlLScgKyB3aW5kb3cuYnRvYSh3aWRnZXRJZCk7XG4gICAgICAgIHNyYyA9IHdpZGdldHNPcmlnaW4gKyAnL3NoYXJlL2VtYmVkP29yaWdpbj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLm9yaWdpbiB8fCBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0bmFtZSk7XG4gICAgICAgIGFsbG93ZWRBdHRycyA9IFsndGVsZWdyYW0tc2hhcmUtdXJsJywgJ2NvbW1lbnQnLCAnc2l6ZScsICd0ZXh0J107XG4gICAgICAgIGRlZldpZHRoID0gNjA7XG4gICAgICAgIGRlZkhlaWdodCA9IDIwO1xuICAgICAgICBpZiAod2lkZ2V0RWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKSA9PSAnbGFyZ2UnKSB7XG4gICAgICAgICAgZGVmV2lkdGggPSA3NjtcbiAgICAgICAgICBkZWZIZWlnaHQgPSAyODtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgZXhpc3RzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh3aWRnZXRFbElkKTtcbiAgICAgIGlmIChleGlzdHNFbCkge1xuICAgICAgICByZXR1cm4gZXhpc3RzRWw7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbG93ZWRBdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXR0ciA9IGFsbG93ZWRBdHRyc1tpXTtcbiAgICAgICAgdmFyIG5vdmFsdWUgPSBhdHRyLnN1YnN0cigtMSkgPT0gJz8nO1xuICAgICAgICBpZiAobm92YWx1ZSkge1xuICAgICAgICAgIGF0dHIgPSBhdHRyLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YV9hdHRyID0gJ2RhdGEtJyArIGF0dHIucmVwbGFjZSgvXy9nLCAnLScpO1xuICAgICAgICBpZiAod2lkZ2V0RWwuaGFzQXR0cmlidXRlKGRhdGFfYXR0cikpIHtcbiAgICAgICAgICB2YXIgYXR0cl92YWx1ZSA9IG5vdmFsdWUgPyAnMScgOiBlbmNvZGVVUklDb21wb25lbnQod2lkZ2V0RWwuZ2V0QXR0cmlidXRlKGRhdGFfYXR0cikpO1xuICAgICAgICAgIHNyYyArPSAnJicgKyBhdHRyICsgJz0nICsgYXR0cl92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZ2V0Q3VyQ29vcmRzKGlmcmFtZSkge1xuICAgICAgICB2YXIgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHZhciBmcmVjdCA9IGlmcmFtZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBmcmFtZVRvcDogZnJlY3QudG9wLFxuICAgICAgICAgIGZyYW1lQm90dG9tOiBmcmVjdC5ib3R0b20sXG4gICAgICAgICAgZnJhbWVMZWZ0OiBmcmVjdC5sZWZ0LFxuICAgICAgICAgIGZyYW1lUmlnaHQ6IGZyZWN0LnJpZ2h0LFxuICAgICAgICAgIGZyYW1lV2lkdGg6IGZyZWN0LndpZHRoLFxuICAgICAgICAgIGZyYW1lSGVpZ2h0OiBmcmVjdC5oZWlnaHQsXG4gICAgICAgICAgc2Nyb2xsVG9wOiB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgIGNsaWVudFdpZHRoOiBkb2NFbC5jbGllbnRXaWR0aCxcbiAgICAgICAgICBjbGllbnRIZWlnaHQ6IGRvY0VsLmNsaWVudEhlaWdodFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdmlzaWJpbGl0eUhhbmRsZXIoKSB7XG4gICAgICAgIGlmIChpc1Zpc2libGUoaWZyYW1lLCA1MCkpIHtcbiAgICAgICAgICBwb3N0TWVzc2FnZVRvSWZyYW1lKGlmcmFtZSwgJ3Zpc2libGUnLCB7IGZyYW1lOiB3aWRnZXRFbElkIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBmb2N1c0hhbmRsZXIoKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlVG9JZnJhbWUoaWZyYW1lLCAnZm9jdXMnLCB7IGhhc19mb2N1czogZG9jdW1lbnQuaGFzRm9jdXMoKSB9KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHBvc3RNZXNzYWdlSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuc291cmNlICE9PSBpZnJhbWUuY29udGVudFdpbmRvdyB8fFxuICAgICAgICAgIGV2ZW50Lm9yaWdpbiAhPSB3aWRnZXRzT3JpZ2luKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5ldmVudCA9PSAncmVzaXplJykge1xuICAgICAgICAgIGlmIChkYXRhLmhlaWdodCkge1xuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodCA9IGRhdGEuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEud2lkdGgpIHtcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS53aWR0aCA9IGRhdGEud2lkdGggKyAncHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhLmV2ZW50ID09ICdyZWFkeScpIHtcbiAgICAgICAgICBpZnJhbWUuX3JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICBmb2N1c0hhbmRsZXIoKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlmcmFtZS5fcmVhZHlRdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHF1ZXVlX2l0ZW0gPSBpZnJhbWUuX3JlYWR5UXVldWVbaV07XG4gICAgICAgICAgICBwb3N0TWVzc2FnZVRvSWZyYW1lKGlmcmFtZSwgcXVldWVfaXRlbVswXSwgcXVldWVfaXRlbVsxXSwgcXVldWVfaXRlbVsyXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmcmFtZS5fcmVhZHlRdWV1ZSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEuZXZlbnQgPT0gJ3Zpc2libGVfb2ZmJykge1xuICAgICAgICAgIHJlbW92ZUV2ZW50KHdpbmRvdywgJ3Njcm9sbCcsIHZpc2liaWxpdHlIYW5kbGVyKTtcbiAgICAgICAgICByZW1vdmVFdmVudCh3aW5kb3csICdyZXNpemUnLCB2aXNpYmlsaXR5SGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YS5ldmVudCA9PSAnZ2V0X2Nvb3JkcycpIHtcbiAgICAgICAgICBwb3N0TWVzc2FnZVRvSWZyYW1lKGlmcmFtZSwgJ2NhbGxiYWNrJywge1xuICAgICAgICAgICAgX2NiOiBkYXRhLl9jYixcbiAgICAgICAgICAgIHZhbHVlOiBnZXRDdXJDb29yZHMoaWZyYW1lKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEuZXZlbnQgPT0gJ3Njcm9sbF90bycpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKGRhdGEueCB8fCAwLCBkYXRhLnkgfHwgMCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YS5ldmVudCA9PSAnYXV0aF91c2VyJykge1xuICAgICAgICAgIGlmIChkYXRhLmluaXQpIHtcbiAgICAgICAgICAgIG9uSW5pdEF1dGhVc2VyICYmIG9uSW5pdEF1dGhVc2VyKGRhdGEuYXV0aF9kYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25BdXRoVXNlciAmJiBvbkF1dGhVc2VyKGRhdGEuYXV0aF9kYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YS5ldmVudCA9PSAndW5hdXRob3JpemVkJykge1xuICAgICAgICAgIG9uVW5hdXRoICYmIG9uVW5hdXRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YS5ldmVudCA9PSAnY2FsbGJhY2snKSB7XG4gICAgICAgICAgdmFyIGNiX2RhdGEgPSBudWxsO1xuICAgICAgICAgIGlmIChjYl9kYXRhID0gd2luZG93LlRlbGVncmFtLl9fV2lkZ2V0Q2FsbGJhY2tzW2RhdGEuX2NiXSkge1xuICAgICAgICAgICAgaWYgKGNiX2RhdGEuaWZyYW1lID09PSBpZnJhbWUpIHtcbiAgICAgICAgICAgICAgY2JfZGF0YS5jYWxsYmFjayhkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgICAgZGVsZXRlIHdpbmRvdy5UZWxlZ3JhbS5fX1dpZGdldENhbGxiYWNrc1tkYXRhLl9jYl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ2FsbGJhY2sgIycgKyBkYXRhLl9jYiArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBpZnJhbWUuaWQgPSB3aWRnZXRFbElkO1xuICAgICAgaWZyYW1lLnNyYyA9IHNyYztcbiAgICAgIGlmcmFtZS53aWR0aCA9IGRlZldpZHRoO1xuICAgICAgaWZyYW1lLmhlaWdodCA9IGRlZkhlaWdodDtcbiAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgJzAnKTtcbiAgICAgIGlmICghc2Nyb2xsYWJsZSkge1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzY3JvbGxpbmcnLCAnbm8nKTtcbiAgICAgICAgaWZyYW1lLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgICBpZnJhbWUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZXMpIHtcbiAgICAgICAgaWZyYW1lLnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdO1xuICAgICAgfVxuICAgICAgaWYgKHdpZGdldEVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgd2lkZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaWZyYW1lLCB3aWRnZXRFbCk7XG4gICAgICAgIGlmICh3aWRnZXRFbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT0gJ0JMT0NLUVVPVEUnKSB7XG4gICAgICAgICAgd2lkZ2V0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh3aWRnZXRFbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmcmFtZS5fcmVhZHkgPSBmYWxzZTtcbiAgICAgIGlmcmFtZS5fcmVhZHlRdWV1ZSA9IFtdO1xuICAgICAgd2lkZ2V0RWwuX2lmcmFtZSA9IGlmcmFtZTtcbiAgICAgIGFkZEV2ZW50KGlmcmFtZSwgJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZUV2ZW50KGlmcmFtZSwgJ2xvYWQnLCB2aXNpYmlsaXR5SGFuZGxlcik7XG4gICAgICAgIGFkZEV2ZW50KHdpbmRvdywgJ3Njcm9sbCcsIHZpc2liaWxpdHlIYW5kbGVyKTtcbiAgICAgICAgYWRkRXZlbnQod2luZG93LCAncmVzaXplJywgdmlzaWJpbGl0eUhhbmRsZXIpO1xuICAgICAgICB2aXNpYmlsaXR5SGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBhZGRFdmVudCh3aW5kb3csICdmb2N1cyBibHVyJywgZm9jdXNIYW5kbGVyKTtcbiAgICAgIGFkZEV2ZW50KHdpbmRvdywgJ21lc3NhZ2UnLCBwb3N0TWVzc2FnZUhhbmRsZXIpO1xuICAgICAgcmV0dXJuIGlmcmFtZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNWaXNpYmxlKGVsLCBwYWRkaW5nKSB7XG4gICAgICB2YXIgbm9kZSA9IGVsLCB2YWw7XG4gICAgICB2YXIgdmlzaWJpbGl0eSA9IGdldENzc1Byb3BlcnR5KG5vZGUsICd2aXNpYmlsaXR5Jyk7XG4gICAgICBpZiAodmlzaWJpbGl0eSA9PSAnaGlkZGVuJykgcmV0dXJuIGZhbHNlO1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgYnJlYWs7XG4gICAgICAgIHZhciBkaXNwbGF5ID0gZ2V0Q3NzUHJvcGVydHkobm9kZSwgJ2Rpc3BsYXknKTtcbiAgICAgICAgaWYgKGRpc3BsYXkgPT0gJ25vbmUnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gZ2V0Q3NzUHJvcGVydHkobm9kZSwgJ29wYWNpdHknKTtcbiAgICAgICAgaWYgKG9wYWNpdHkgIT09IG51bGwgJiYgb3BhY2l0eSA8IDAuMSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgaWYgKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICBwYWRkaW5nID0gK3BhZGRpbmcgfHwgMDtcbiAgICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChyZWN0LmJvdHRvbSA8IHBhZGRpbmcgfHxcbiAgICAgICAgICByZWN0LnJpZ2h0IDwgcGFkZGluZyB8fFxuICAgICAgICAgIHJlY3QudG9wID4gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBodG1sLmNsaWVudEhlaWdodCkgLSBwYWRkaW5nIHx8XG4gICAgICAgICAgcmVjdC5sZWZ0ID4gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGh0bWwuY2xpZW50V2lkdGgpIC0gcGFkZGluZykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsV2lkZ2V0cygpIHtcbiAgICAgIHZhciB3aWRnZXRzID0gW107XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCkge1xuICAgICAgICB3aWRnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W2RhdGEtdGVsZWdyYW0tcG9zdF0sYmxvY2txdW90ZS50ZWxlZ3JhbS1wb3N0LHNjcmlwdFtkYXRhLXRlbGVncmFtLWRpc2N1c3Npb25dLHNjcmlwdFtkYXRhLXRlbGVncmFtLWxvZ2luXSxzY3JpcHRbZGF0YS10ZWxlZ3JhbS1zaGFyZS11cmxdJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aWRnZXRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTQ1JJUFQnKSk7XG4gICAgICAgIHdpZGdldHMgPSB3aWRnZXRzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JMT0NLUVVPVEUnKSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2lkZ2V0SW5mbyhlbF9vcl9pZCwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBlID0gbnVsbCwgaWZyYW1lID0gbnVsbDtcbiAgICAgIGlmIChlbCA9IGdlQnlJZChlbF9vcl9pZCkpIHtcbiAgICAgICAgaWYgKGVsLnRhZ05hbWUgJiZcbiAgICAgICAgICBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICBpZnJhbWUgPSBlbDtcbiAgICAgICAgfSBlbHNlIGlmIChlbC5faWZyYW1lKSB7XG4gICAgICAgICAgaWZyYW1lID0gZWwuX2lmcmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWZyYW1lICYmIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcG9zdE1lc3NhZ2VUb0lmcmFtZShpZnJhbWUsICdnZXRfaW5mbycsIHt9LCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXaWRnZXRPcHRpb25zKG9wdGlvbnMsIGVsX29yX2lkKSB7XG4gICAgICB2YXIgZSA9IG51bGwsIGlmcmFtZSA9IG51bGw7XG4gICAgICBpZiAodHlwZW9mIGVsX29yX2lkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgd2lkZ2V0cyA9IGdldEFsbFdpZGdldHMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWRnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGlmcmFtZSA9IHdpZGdldHNbaV0uX2lmcmFtZSkge1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2VUb0lmcmFtZShpZnJhbWUsICdzZXRfb3B0aW9ucycsIHsgb3B0aW9uczogb3B0aW9ucyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbCA9IGdlQnlJZChlbF9vcl9pZCkpIHtcbiAgICAgICAgICBpZiAoZWwudGFnTmFtZSAmJlxuICAgICAgICAgICAgZWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09ICdJRlJBTUUnKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBlbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVsLl9pZnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IGVsLl9pZnJhbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlVG9JZnJhbWUoaWZyYW1lLCAnc2V0X29wdGlvbnMnLCB7IG9wdGlvbnM6IG9wdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkb2N1bWVudC5jdXJyZW50U2NyaXB0IHx8XG4gICAgICAhaW5pdFdpZGdldChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSkge1xuICAgICAgdmFyIHdpZGdldHMgPSBnZXRBbGxXaWRnZXRzKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZGdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5pdFdpZGdldCh3aWRnZXRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgVGVsZWdyYW1Mb2dpbiA9IHtcbiAgICAgIHBvcHVwczoge30sXG4gICAgICBhdXRoOiBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGJvdF9pZCA9IHBhcnNlSW50KG9wdGlvbnMuYm90X2lkKTtcbiAgICAgICAgaWYgKCFib3RfaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdCBpZCByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3aWR0aCA9IDU1MDtcbiAgICAgICAgdmFyIGhlaWdodCA9IDQ3MDtcbiAgICAgICAgdmFyIGxlZnQgPSBNYXRoLm1heCgwLCAoc2NyZWVuLndpZHRoIC0gd2lkdGgpIC8gMikgKyAoc2NyZWVuLmF2YWlsTGVmdCB8IDApLFxuICAgICAgICAgIHRvcCA9IE1hdGgubWF4KDAsIChzY3JlZW4uaGVpZ2h0IC0gaGVpZ2h0KSAvIDIpICsgKHNjcmVlbi5hdmFpbFRvcCB8IDApO1xuICAgICAgICB2YXIgb25NZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIVRlbGVncmFtTG9naW4ucG9wdXBzW2JvdF9pZF0pIHJldHVybjtcbiAgICAgICAgICBpZiAoZXZlbnQuc291cmNlICE9PSBUZWxlZ3JhbUxvZ2luLnBvcHVwc1tib3RfaWRdLndpbmRvdykgcmV0dXJuO1xuICAgICAgICAgIGlmIChkYXRhLmV2ZW50ID09ICdhdXRoX3Jlc3VsdCcpIHtcbiAgICAgICAgICAgIG9uQXV0aERvbmUoZGF0YS5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9uQXV0aERvbmUgPSBmdW5jdGlvbiAoYXV0aERhdGEpIHtcbiAgICAgICAgICBpZiAoIVRlbGVncmFtTG9naW4ucG9wdXBzW2JvdF9pZF0pIHJldHVybjtcbiAgICAgICAgICBpZiAoVGVsZWdyYW1Mb2dpbi5wb3B1cHNbYm90X2lkXS5hdXRoRmluaXNoZWQpIHJldHVybjtcbiAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhhdXRoRGF0YSk7XG4gICAgICAgICAgVGVsZWdyYW1Mb2dpbi5wb3B1cHNbYm90X2lkXS5hdXRoRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIHJlbW92ZUV2ZW50KHdpbmRvdywgJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgY2hlY2tDbG9zZSA9IGZ1bmN0aW9uIChib3RfaWQpIHtcbiAgICAgICAgICBpZiAoIVRlbGVncmFtTG9naW4ucG9wdXBzW2JvdF9pZF0pIHJldHVybjtcbiAgICAgICAgICBpZiAoIVRlbGVncmFtTG9naW4ucG9wdXBzW2JvdF9pZF0ud2luZG93IHx8XG4gICAgICAgICAgICBUZWxlZ3JhbUxvZ2luLnBvcHVwc1tib3RfaWRdLndpbmRvdy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBUZWxlZ3JhbUxvZ2luLmdldEF1dGhEYXRhKG9wdGlvbnMsIGZ1bmN0aW9uIChvcmlnaW4sIGF1dGhEYXRhKSB7XG4gICAgICAgICAgICAgIG9uQXV0aERvbmUoYXV0aERhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tDbG9zZSwgMTAwLCBib3RfaWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vVGVsZWdyYW0uTG9naW4ud2lkZ2V0c09yaWdpblxuICAgICAgICB2YXIgcG9wdXBfdXJsID0gJ2h0dHBzOi8vb2F1dGgudGVsZWdyYW0ub3JnL2F1dGg/Ym90X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5ib3RfaWQpICsgJyZvcmlnaW49JyArIGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5vcmlnaW4gfHwgbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdG5hbWUpICsgKG9wdGlvbnMucmVxdWVzdF9hY2Nlc3MgPyAnJnJlcXVlc3RfYWNjZXNzPScgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5yZXF1ZXN0X2FjY2VzcykgOiAnJykgKyAob3B0aW9ucy5sYW5nID8gJyZsYW5nPScgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5sYW5nKSA6ICcnKTtcbiAgICAgICAgdmFyIHBvcHVwID0gd2luZG93Lm9wZW4ocG9wdXBfdXJsLCAndGVsZWdyYW1fb2F1dGhfYm90JyArIGJvdF9pZCwgJ3dpZHRoPScgKyB3aWR0aCArICcsaGVpZ2h0PScgKyBoZWlnaHQgKyAnLGxlZnQ9JyArIGxlZnQgKyAnLHRvcD0nICsgdG9wICsgJyxzdGF0dXM9MCxsb2NhdGlvbj0wLG1lbnViYXI9MCx0b29sYmFyPTAnKTtcbiAgICAgICAgVGVsZWdyYW1Mb2dpbi5wb3B1cHNbYm90X2lkXSA9IHtcbiAgICAgICAgICB3aW5kb3c6IHBvcHVwLFxuICAgICAgICAgIGF1dGhGaW5pc2hlZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHBvcHVwKSB7XG4gICAgICAgICAgYWRkRXZlbnQod2luZG93LCAnbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgICAgICAgcG9wdXAuZm9jdXMoKTtcbiAgICAgICAgICBjaGVja0Nsb3NlKGJvdF9pZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRBdXRoRGF0YTogZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBib3RfaWQgPSBwYXJzZUludChvcHRpb25zLmJvdF9pZCk7XG4gICAgICAgIGlmICghYm90X2lkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3QgaWQgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeGhyID0gZ2V0WEhSKCk7XG4gICAgICAgIHZhciB1cmwgPSAnaHR0cHM6Ly9vYXV0aC50ZWxlZ3JhbS5vcmcvYXV0aC9nZXQnO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIHVybCk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0Jyk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgeGhyLnJlc3BvbnNlQm9keSA9PSAndW5kZWZpbmVkJyAmJiB4aHIucmVzcG9uc2VUZXh0KSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdC51c2VyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0Lm9yaWdpbiwgcmVzdWx0LnVzZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdC5vcmlnaW4sIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soJyonLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjaygnKicsIGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgIHhoci5zZW5kKCdib3RfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmJvdF9pZCkgKyAob3B0aW9ucy5sYW5nID8gJyZsYW5nPScgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5sYW5nKSA6ICcnKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5UZWxlZ3JhbS5nZXRXaWRnZXRJbmZvID0gZ2V0V2lkZ2V0SW5mbztcbiAgICB3aW5kb3cuVGVsZWdyYW0uc2V0V2lkZ2V0T3B0aW9ucyA9IHNldFdpZGdldE9wdGlvbnM7XG4gICAgd2luZG93LlRlbGVncmFtLkxvZ2luID0ge1xuICAgICAgYXV0aDogVGVsZWdyYW1Mb2dpbi5hdXRoLFxuICAgICAgd2lkZ2V0c09yaWdpbjogZ2V0V2lkZ2V0c09yaWdpbignaHR0cHM6Ly9vYXV0aC50ZWxlZ3JhbS5vcmcnLCAnaHR0cHM6Ly9vYXV0aC50Zy5kZXYnKVxuICAgIH07XG5cbiAgfSh3aW5kb3cpKTtcbn0pKHdpbmRvdyk7Il19