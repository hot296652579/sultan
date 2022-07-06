
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Helpder/openAppHelpder/openAppHelpder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a4c8RZTeRI7o/2tfcSwWgb', 'openAppHelpder');
// script/Helpder/openAppHelpder/openAppHelpder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAppHelpder = void 0;
var APP_NAMES;
(function (APP_NAMES) {
    APP_NAMES["telegram"] = "org.telegram.messenger";
    APP_NAMES["whatsApp"] = "com.whatsapp";
    APP_NAMES["ins"] = "com.instagram.android";
    APP_NAMES["facebook"] = "com.facebook.katana";
    APP_NAMES["test"] = "com.tencent.mm";
})(APP_NAMES || (APP_NAMES = {}));
let AppClassName_Openapp = "org/cocos2dx/javascript/AppActivity";
class _openAppHelpder {
    constructor() {
        this.APP_NAMES = APP_NAMES;
    }
    openApp(appName) {
        if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("openAppHelpder", "openApp", '');
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            console.log("openApp:js:" + appName);
            jsb.reflection.callStaticMethod(AppClassName_Openapp, "openApp", "(Ljava/lang/String;)V", appName);
        }
    }
}
exports.OpenAppHelpder = new _openAppHelpder();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvSGVscGRlci9vcGVuQXBwSGVscGRlci9vcGVuQXBwSGVscGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFLLFNBT0o7QUFQRCxXQUFLLFNBQVM7SUFDVixnREFBbUMsQ0FBQTtJQUNuQyxzQ0FBeUIsQ0FBQTtJQUN6QiwwQ0FBNkIsQ0FBQTtJQUM3Qiw2Q0FBZ0MsQ0FBQTtJQUNoQyxvQ0FBdUIsQ0FBQTtBQUUzQixDQUFDLEVBUEksU0FBUyxLQUFULFNBQVMsUUFPYjtBQUNELElBQUksb0JBQW9CLEdBQUcscUNBQXFDLENBQUE7QUFFaEUsTUFBTSxlQUFlO0lBQXJCO1FBRUksY0FBUyxHQUFHLFNBQVMsQ0FBQztJQWExQixDQUFDO0lBWEcsT0FBTyxDQUFDLE9BQU87UUFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQzdCLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BFO2FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsQ0FBQTtZQUNwQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN0RztJQUVMLENBQUM7Q0FFSjtBQUNVLFFBQUEsY0FBYyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmVudW0gQVBQX05BTUVTIHtcbiAgICB0ZWxlZ3JhbSA9IFwib3JnLnRlbGVncmFtLm1lc3NlbmdlclwiLFxuICAgIHdoYXRzQXBwID0gXCJjb20ud2hhdHNhcHBcIixcbiAgICBpbnMgPSBcImNvbS5pbnN0YWdyYW0uYW5kcm9pZFwiLFxuICAgIGZhY2Vib29rID0gXCJjb20uZmFjZWJvb2sua2F0YW5hXCIsXG4gICAgdGVzdCA9IFwiY29tLnRlbmNlbnQubW1cIlxuXG59XG5sZXQgQXBwQ2xhc3NOYW1lX09wZW5hcHAgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCJcblxuY2xhc3MgX29wZW5BcHBIZWxwZGVyIHtcblxuICAgIEFQUF9OQU1FUyA9IEFQUF9OQU1FUztcblxuICAgIG9wZW5BcHAoYXBwTmFtZSkge1xuICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfSU9TKSB7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3BlbkFwcEhlbHBkZXJcIiwgXCJvcGVuQXBwXCIsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW5BcHA6anM6XCIgKyBhcHBOYW1lKVxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChBcHBDbGFzc05hbWVfT3BlbmFwcCwgXCJvcGVuQXBwXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIGFwcE5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBsZXQgT3BlbkFwcEhlbHBkZXIgPSBuZXcgX29wZW5BcHBIZWxwZGVyKCk7XG4iXX0=