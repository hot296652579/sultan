
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Helpder/ShareHelpder/ShareBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '51c1ac3ua9NcbG3U/Ddk2au', 'ShareBase');
// script/Helpder/ShareHelpder/ShareBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShareBase {
    constructor() {
        this.AppClassName = '';
    }
    shareText(text) {
        let code = -1;
        if (cc.sys.isBrowser) {
            cc.log("shareTest", text);
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            code = jsb.reflection.callStaticMethod(this.AppClassName, "shareTest", "(Ljava/lang/String;)I", text);
        }
        return code;
    }
    shareImage(imgurl) {
        // if (!imgurl.startsWith("http://")) {
        //     imgurl = "http://" + imgurl;
        // }
        let code = -1;
        if (cc.sys.isBrowser) {
            cc.log("shareImage", imgurl);
        }
        this.downRemoteImage(imgurl, (imagePath) => {
            if (cc.sys.os === cc.sys.OS_IOS) {
            }
            else if (cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod(this.AppClassName, "shareImage", "(Ljava/lang/String;)I", imagePath);
            }
        });
    }
    downRemoteImage(imgUrl, call) {
        let fileName = "qrcode";
        let fileType = ".png";
        let filePath = "";
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.response && cc.sys.isNative) {
                    filePath = jsb.fileUtils.getWritablePath() + fileName + fileType;
                    const u8a = new Uint8Array(xhr.response);
                    let bool = jsb.fileUtils.writeDataToFile(u8a, filePath);
                    console.log(bool ? "保存成功" : "保存失败");
                    call(filePath);
                }
            }
        };
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", imgUrl, true);
        xhr.send();
    }
}
exports.default = ShareBase;
// 状态码
//     //    正常的 成功的
//     static int NORMAL = 0;
// //    沒有裝這個app
//     static int NO_INSTAll = 1;
// //    其他錯誤
//     static int ERREO_ELSE = 2;
//     //    文件不存在
//     static int NO_FILE = 3;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvSGVscGRlci9TaGFyZUhlbHBkZXIvU2hhcmVCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBcUIsU0FBUztJQUE5QjtRQUNJLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBcUR0QixDQUFDO0lBcERHLFNBQVMsQ0FBQyxJQUFZO1FBQ2xCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWQsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUNsQixFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUU1QjthQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDckM7YUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pHO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELFVBQVUsQ0FBQyxNQUFjO1FBQ3JCLHVDQUF1QztRQUN2QyxtQ0FBbUM7UUFDbkMsSUFBSTtRQUNKLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUNsQixFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUMvQjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTthQUNoQztpQkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUN0QyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hHO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN4QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDL0IsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtZQUMxQixJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ2pDLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ2pFLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO29CQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lCQUNqQjthQUVKO1FBQ0wsQ0FBQyxDQUFBO1FBQ0QsR0FBRyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUE7UUFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVmLENBQUM7Q0FDSjtBQXRERCw0QkFzREM7QUFDRCxNQUFNO0FBQ04sb0JBQW9CO0FBQ3BCLDZCQUE2QjtBQUM3QixpQkFBaUI7QUFDakIsaUNBQWlDO0FBQ2pDLGFBQWE7QUFDYixpQ0FBaUM7QUFDakMsa0JBQWtCO0FBQ2xCLDhCQUE4QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlQmFzZSB7XG4gICAgQXBwQ2xhc3NOYW1lID0gJyc7XG4gICAgc2hhcmVUZXh0KHRleHQ6IHN0cmluZykge1xuICAgICAgICBsZXQgY29kZSA9IC0xO1xuXG4gICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJzaGFyZVRlc3RcIiwgdGV4dClcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcbiAgICAgICAgICAgIGNvZGUgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuQXBwQ2xhc3NOYW1lLCBcInNoYXJlVGVzdFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspSVwiLCB0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gICAgc2hhcmVJbWFnZShpbWd1cmw6IHN0cmluZykge1xuICAgICAgICAvLyBpZiAoIWltZ3VybC5zdGFydHNXaXRoKFwiaHR0cDovL1wiKSkge1xuICAgICAgICAvLyAgICAgaW1ndXJsID0gXCJodHRwOi8vXCIgKyBpbWd1cmw7XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGV0IGNvZGUgPSAtMTtcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcInNoYXJlSW1hZ2VcIiwgaW1ndXJsKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG93blJlbW90ZUltYWdlKGltZ3VybCwgKGltYWdlUGF0aCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5BcHBDbGFzc05hbWUsIFwic2hhcmVJbWFnZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspSVwiLCBpbWFnZVBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBkb3duUmVtb3RlSW1hZ2UoaW1nVXJsLCBjYWxsKSB7XG4gICAgICAgIGxldCBmaWxlTmFtZSA9IFwicXJjb2RlXCI7XG4gICAgICAgIGxldCBmaWxlVHlwZSA9IFwiLnBuZ1wiO1xuICAgICAgICBsZXQgZmlsZVBhdGggPSBcIlwiO1xuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZSAmJiBjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgZmlsZU5hbWUgKyBmaWxlVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdThhID0gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbCA9IGpzYi5maWxlVXRpbHMud3JpdGVEYXRhVG9GaWxlKHU4YSwgZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvb2wgPyBcIuS/neWtmOaIkOWKn1wiIDogXCLkv53lrZjlpLHotKVcIilcbiAgICAgICAgICAgICAgICAgICAgY2FsbChmaWxlUGF0aClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCBpbWdVcmwsIHRydWUpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuXG4gICAgfVxufVxuLy8g54q25oCB56CBXG4vLyAgICAgLy8gICAg5q2j5bi455qEIOaIkOWKn+eahFxuLy8gICAgIHN0YXRpYyBpbnQgTk9STUFMID0gMDtcbi8vIC8vICAgIOaykuacieijnemAmeWAi2FwcFxuLy8gICAgIHN0YXRpYyBpbnQgTk9fSU5TVEFsbCA9IDE7XG4vLyAvLyAgICDlhbbku5bpjK/oqqRcbi8vICAgICBzdGF0aWMgaW50IEVSUkVPX0VMU0UgPSAyO1xuLy8gICAgIC8vICAgIOaWh+S7tuS4jeWtmOWcqFxuLy8gICAgIHN0YXRpYyBpbnQgTk9fRklMRSA9IDM7Il19