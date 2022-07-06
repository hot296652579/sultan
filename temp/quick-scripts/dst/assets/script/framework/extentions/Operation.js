
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/extentions/Operation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '32cf1Oz24RMI5Ifmn721DBc', 'Operation');
// script/framework/extentions/Operation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Operation {
    static add(arg1, arg2) {
        let digits1, digits2, maxDigits;
        try {
            digits1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            digits1 = 0;
        }
        try {
            digits2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            digits2 = 0;
        }
        maxDigits = Math.pow(10, Math.max(digits1, digits2));
        return (Math.ceil(arg1 * maxDigits) + Math.ceil(arg2 * maxDigits)) / maxDigits;
    }
    static sub(arg1, arg2) {
        let digits1, digits2, maxDigits;
        try {
            digits1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            digits1 = 0;
        }
        try {
            digits2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            digits2 = 0;
        }
        maxDigits = Math.pow(10, Math.max(digits1, digits2));
        return (Math.ceil(arg1 * maxDigits) - Math.ceil(arg2 * maxDigits)) / maxDigits;
    }
    static mul(arg1, arg2) {
        let digits = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            digits += s1.split(".")[1].length;
        }
        catch (e) { }
        try {
            digits += s2.split(".")[1].length;
        }
        catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, digits);
    }
    static div(arg1, arg2) {
        let int1 = 0, int2 = 0, digits1, digits2;
        try {
            digits1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            digits1 = 0;
        }
        try {
            digits2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            digits2 = 0;
        }
        int1 = Number(arg1.toString().replace(".", ""));
        int2 = Number(arg2.toString().replace(".", ""));
        return (int1 / int2) * Math.pow(10, digits2 - digits1);
    }
}
exports.default = Operation;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvT3BlcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBcUIsU0FBUztJQUVuQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQ3hCLElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUM7UUFDaEMsSUFBSTtZQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtTQUFFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1NBQUU7UUFDaEYsSUFBSTtZQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtTQUFFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1NBQUU7UUFDaEYsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0lBQ2xGLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQ3hCLElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUM7UUFDaEMsSUFBSTtZQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcs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Q29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVyYXRpb24ge1xuXG4gICAgcHVibGljIHN0YXRpYyBhZGQoYXJnMSwgYXJnMikge1xuICAgICAgICBsZXQgZGlnaXRzMSwgZGlnaXRzMiwgbWF4RGlnaXRzO1xuICAgICAgICB0cnkgeyBkaWdpdHMxID0gYXJnMS50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGggfSBjYXRjaCAoZSkgeyBkaWdpdHMxID0gMCB9XG4gICAgICAgIHRyeSB7IGRpZ2l0czIgPSBhcmcyLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB9IGNhdGNoIChlKSB7IGRpZ2l0czIgPSAwIH1cbiAgICAgICAgbWF4RGlnaXRzID0gTWF0aC5wb3coMTAsIE1hdGgubWF4KGRpZ2l0czEsIGRpZ2l0czIpKVxuICAgICAgICByZXR1cm4gKE1hdGguY2VpbChhcmcxICogbWF4RGlnaXRzKSArIE1hdGguY2VpbChhcmcyICogbWF4RGlnaXRzKSkgLyBtYXhEaWdpdHNcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHN1YihhcmcxLCBhcmcyKSB7XG4gICAgICAgIGxldCBkaWdpdHMxLCBkaWdpdHMyLCBtYXhEaWdpdHM7XG4gICAgICAgIHRyeSB7IGRpZ2l0czEgPSBhcmcxLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB9IGNhdGNoIChlKSB7IGRpZ2l0czEgPSAwIH1cbiAgICAgICAgdHJ5IHsgZGlnaXRzMiA9IGFyZzIudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbMV0ubGVuZ3RoIH0gY2F0Y2ggKGUpIHsgZGlnaXRzMiA9IDAgfVxuICAgICAgICBtYXhEaWdpdHMgPSBNYXRoLnBvdygxMCwgTWF0aC5tYXgoZGlnaXRzMSwgZGlnaXRzMikpO1xuICAgICAgICByZXR1cm4gKE1hdGguY2VpbChhcmcxICogbWF4RGlnaXRzKSAtIE1hdGguY2VpbChhcmcyICogbWF4RGlnaXRzKSkgLyBtYXhEaWdpdHM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBtdWwoYXJnMSwgYXJnMikge1xuICAgICAgICBsZXQgZGlnaXRzID0gMCwgczEgPSBhcmcxLnRvU3RyaW5nKCksIHMyID0gYXJnMi50b1N0cmluZygpO1xuICAgICAgICB0cnkgeyBkaWdpdHMgKz0gczEuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgdHJ5IHsgZGlnaXRzICs9IHMyLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGggfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIHJldHVybiBOdW1iZXIoczEucmVwbGFjZShcIi5cIiwgXCJcIikpICogTnVtYmVyKHMyLnJlcGxhY2UoXCIuXCIsIFwiXCIpKSAvIE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGl2KGFyZzEsIGFyZzIpIHtcbiAgICAgICAgbGV0IGludDEgPSAwLCBpbnQyID0gMCwgZGlnaXRzMSwgZGlnaXRzMjtcbiAgICAgICAgdHJ5IHsgZGlnaXRzMSA9IGFyZzEudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbMV0ubGVuZ3RoIH0gY2F0Y2ggKGUpIHsgZGlnaXRzMSA9IDAgfVxuICAgICAgICB0cnkgeyBkaWdpdHMyID0gYXJnMi50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGggfSBjYXRjaCAoZSkgeyBkaWdpdHMyID0gMCB9XG5cbiAgICAgICAgaW50MSA9IE51bWJlcihhcmcxLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgXCJcIikpXG4gICAgICAgIGludDIgPSBOdW1iZXIoYXJnMi50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKVxuICAgICAgICByZXR1cm4gKGludDEgLyBpbnQyKSAqIE1hdGgucG93KDEwLCBkaWdpdHMyIC0gZGlnaXRzMSk7XG4gICAgfVxufSJdfQ==