
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Helpder/ShareHelpder/ShareHelpder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b051csq0+1J+409Xi51qe4e', 'ShareHelpder');
// script/Helpder/ShareHelpder/ShareHelpder.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShareBase_1 = __importDefault(require("./ShareBase"));
class InstagramShare extends ShareBase_1.default {
    constructor() {
        super(...arguments);
        this.AppClassName = 'com/threeoctopus/ShareHelpder/instagram/InstagramShare';
    }
    shareText(text) {
        let code = super.shareText(text);
        console.log("shareText:22222", code);
        return code;
    }
    shareImage(imgurl) {
        let code = super.shareImage(imgurl);
        console.log("shareImage:", code);
        return code;
    }
}
class WhatsappShare extends ShareBase_1.default {
    constructor() {
        super(...arguments);
        this.AppClassName = 'com/threeoctopus/ShareHelpder/whatsapp/WhatsappShare';
    }
    shareText(text) {
        let code = super.shareText(text);
        console.log("shareText:2222", code);
        return code;
    }
    shareImage(imgurl) {
        let code = super.shareImage(imgurl);
        console.log("shareImage:", code);
        return code;
    }
}
class _ShareHelpder {
    constructor() {
        this.instagram = new InstagramShare();
        this.whatsapp = new WhatsappShare();
    }
    static getInstance() {
        if (_ShareHelpder._ins == null) {
            _ShareHelpder._ins = new _ShareHelpder();
        }
        return _ShareHelpder._ins;
    }
    // 分享文字失败
    shareTextFail(errmg) {
        cc.log("分享文字失败:", errmg);
    }
    // 分享图片失败
    shareImageFail(errmg) {
        cc.log("分享图片失败:", errmg);
    }
}
exports.default = _ShareHelpder;
_ShareHelpder._ins = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvSGVscGRlci9TaGFyZUhlbHBkZXIvU2hhcmVIZWxwZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQW1DO0FBRW5DLE1BQU0sY0FBZSxTQUFRLG1CQUFTO0lBQXRDOztRQUNJLGlCQUFZLEdBQUcsd0RBQXdELENBQUE7SUFjM0UsQ0FBQztJQWJHLFNBQVMsQ0FBQyxJQUFZO1FBQ2xCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNwQyxPQUFPLElBQUksQ0FBQTtJQUVmLENBQUM7SUFDRCxVQUFVLENBQUMsTUFBYztRQUVyQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2hDLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztDQUVKO0FBQ0QsTUFBTSxhQUFjLFNBQVEsbUJBQVM7SUFBckM7O1FBQ0ksaUJBQVksR0FBRyxzREFBc0QsQ0FBQTtJQWN6RSxDQUFDO0lBWkcsU0FBUyxDQUFDLElBQVk7UUFDbEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ25DLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUNELFVBQVUsQ0FBQyxNQUFjO1FBQ3JCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDaEMsT0FBTyxJQUFJLENBQUE7SUFFZixDQUFDO0NBRUo7QUFDRCxNQUFxQixhQUFhO0lBQWxDO1FBUUksY0FBUyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDakMsYUFBUSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFZbkMsQ0FBQztJQW5CRyxNQUFNLENBQUMsV0FBVztRQUNkLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDNUIsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFJRCxTQUFTO0lBQ1QsYUFBYSxDQUFDLEtBQUs7UUFDZixFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUU1QixDQUFDO0lBQ0QsU0FBUztJQUNULGNBQWMsQ0FBQyxLQUFLO1FBQ2hCLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRTVCLENBQUM7O0FBcEJMLGdDQXFCQztBQXBCVSxrQkFBSSxHQUFrQixJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hhcmVCYXNlIGZyb20gXCIuL1NoYXJlQmFzZVwiXG5cbmNsYXNzIEluc3RhZ3JhbVNoYXJlIGV4dGVuZHMgU2hhcmVCYXNlIHtcbiAgICBBcHBDbGFzc05hbWUgPSAnY29tL3RocmVlb2N0b3B1cy9TaGFyZUhlbHBkZXIvaW5zdGFncmFtL0luc3RhZ3JhbVNoYXJlJ1xuICAgIHNoYXJlVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBzdXBlci5zaGFyZVRleHQodGV4dClcbiAgICAgICAgY29uc29sZS5sb2coXCJzaGFyZVRleHQ6MjIyMjJcIiwgY29kZSlcbiAgICAgICAgcmV0dXJuIGNvZGVcblxuICAgIH1cbiAgICBzaGFyZUltYWdlKGltZ3VybDogc3RyaW5nKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgY29kZSA9IHN1cGVyLnNoYXJlSW1hZ2UoaW1ndXJsKVxuICAgICAgICBjb25zb2xlLmxvZyhcInNoYXJlSW1hZ2U6XCIsIGNvZGUpXG4gICAgICAgIHJldHVybiBjb2RlXG4gICAgfVxuXG59XG5jbGFzcyBXaGF0c2FwcFNoYXJlIGV4dGVuZHMgU2hhcmVCYXNlIHtcbiAgICBBcHBDbGFzc05hbWUgPSAnY29tL3RocmVlb2N0b3B1cy9TaGFyZUhlbHBkZXIvd2hhdHNhcHAvV2hhdHNhcHBTaGFyZSdcblxuICAgIHNoYXJlVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBzdXBlci5zaGFyZVRleHQodGV4dClcbiAgICAgICAgY29uc29sZS5sb2coXCJzaGFyZVRleHQ6MjIyMlwiLCBjb2RlKVxuICAgICAgICByZXR1cm4gY29kZVxuICAgIH1cbiAgICBzaGFyZUltYWdlKGltZ3VybDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjb2RlID0gc3VwZXIuc2hhcmVJbWFnZShpbWd1cmwpXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hhcmVJbWFnZTpcIiwgY29kZSlcbiAgICAgICAgcmV0dXJuIGNvZGVcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgX1NoYXJlSGVscGRlciB7XG4gICAgc3RhdGljIF9pbnM6IF9TaGFyZUhlbHBkZXIgPSBudWxsO1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKF9TaGFyZUhlbHBkZXIuX2lucyA9PSBudWxsKSB7XG4gICAgICAgICAgICBfU2hhcmVIZWxwZGVyLl9pbnMgPSBuZXcgX1NoYXJlSGVscGRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfU2hhcmVIZWxwZGVyLl9pbnM7XG4gICAgfVxuICAgIGluc3RhZ3JhbSA9IG5ldyBJbnN0YWdyYW1TaGFyZSgpO1xuICAgIHdoYXRzYXBwID0gbmV3IFdoYXRzYXBwU2hhcmUoKTtcblxuICAgIC8vIOWIhuS6q+aWh+Wtl+Wksei0pVxuICAgIHNoYXJlVGV4dEZhaWwoZXJybWcpIHtcbiAgICAgICAgY2MubG9nKFwi5YiG5Lqr5paH5a2X5aSx6LSlOlwiLCBlcnJtZylcblxuICAgIH1cbiAgICAvLyDliIbkuqvlm77niYflpLHotKVcbiAgICBzaGFyZUltYWdlRmFpbChlcnJtZykge1xuICAgICAgICBjYy5sb2coXCLliIbkuqvlm77niYflpLHotKU6XCIsIGVycm1nKVxuXG4gICAgfVxufSJdfQ==