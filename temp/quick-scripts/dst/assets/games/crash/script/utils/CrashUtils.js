
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/utils/CrashUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c9abfXz6LRLwKAY1js5vfAu', 'CrashUtils');
// games/crash/script/utils/CrashUtils.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Operation_1 = __importDefault(require("../../../../script/framework/extentions/Operation"));
const CrashRateDefine_1 = require("../define/CrashRateDefine");
class CrashUtils {
    static getRateByRunTime(ms) {
        if (ms <= 0) {
            G.Logger.warn(`倍率负数 ${ms}`);
            return null;
        }
        let currRateInterval = null;
        let maxRateInterval = CrashRateDefine_1.CrashRateDefine.RateInterval[CrashRateDefine_1.CrashRateDefine.RateInterval.length - 1];
        if (ms < Operation_1.default.mul(maxRateInterval.startTime, 1000)) {
            for (let v of CrashRateDefine_1.CrashRateDefine.RateInterval) {
                if (Operation_1.default.mul(v.startTime, 1000) > ms) {
                    break;
                }
                else {
                    currRateInterval = v;
                }
            }
        }
        else {
            currRateInterval = maxRateInterval;
        }
        // 剩余秒
        let residueS = Operation_1.default.sub(Operation_1.default.div(ms, 1000), currRateInterval.startTime);
        // 计算后倍率
        let rate = currRateInterval.rate + (currRateInterval.move * residueS) + (residueS * (currRateInterval.append + (currRateInterval.append * residueS))) / 2;
        return Math.floor(NumberUtils_1.default.converToS(rate));
    }
}
exports.default = CrashUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdXRpbHMvQ3Jhc2hVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhGQUFzRTtBQUN0RSxrR0FBMEU7QUFFMUUsK0RBQTREO0FBRzVELE1BQXFCLFVBQVU7SUFFcEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQVU7UUFDckMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLGdCQUFnQixHQUFnQyxJQUFJLENBQUM7UUFDekQsSUFBSSxlQUFlLEdBQWdDLGlDQUFlLENBQUMsWUFBWSxDQUFDLGlDQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6SCxJQUFJLEVBQUUsR0FBRyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JELEtBQUssSUFBSSxDQUFDLElBQUksaUNBQWUsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3hDLElBQUksbUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ3ZDLE1BQU07aUJBQ1Q7cUJBQU07b0JBQ0gsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7YUFBTTtZQUNILGdCQUFnQixHQUFHLGVBQWUsQ0FBQztTQUN0QztRQUVELE1BQU07UUFDTixJQUFJLFFBQVEsR0FBVyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUYsUUFBUTtRQUNSLElBQUksSUFBSSxHQUFXLGdCQUFnQixDQUFDLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRWpLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FFSjtBQTdCRCw2QkE2QkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBPcGVyYXRpb24gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9PcGVyYXRpb25cIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgeyBDcmFzaFJhdGVEZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL0NyYXNoUmF0ZURlZmluZVwiO1xuaW1wb3J0IHsgQ3Jhc2hJbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL0NyYXNoSW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXNoVXRpbHMge1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRSYXRlQnlSdW5UaW1lKG1zOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAobXMgPD0gMCkge1xuICAgICAgICAgICAgRy5Mb2dnZXIud2Fybihg5YCN546H6LSf5pWwICR7bXN9YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3VyclJhdGVJbnRlcnZhbDogQ3Jhc2hJbnRlcmZhY2UuUmF0ZUludGVydmFsID0gbnVsbDtcbiAgICAgICAgbGV0IG1heFJhdGVJbnRlcnZhbDogQ3Jhc2hJbnRlcmZhY2UuUmF0ZUludGVydmFsID0gQ3Jhc2hSYXRlRGVmaW5lLlJhdGVJbnRlcnZhbFtDcmFzaFJhdGVEZWZpbmUuUmF0ZUludGVydmFsLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobXMgPCBPcGVyYXRpb24ubXVsKG1heFJhdGVJbnRlcnZhbC5zdGFydFRpbWUsIDEwMDApKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIENyYXNoUmF0ZURlZmluZS5SYXRlSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoT3BlcmF0aW9uLm11bCh2LnN0YXJ0VGltZSwgMTAwMCkgPiBtcykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdXJyUmF0ZUludGVydmFsID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyUmF0ZUludGVydmFsID0gbWF4UmF0ZUludGVydmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5Ymp5L2Z56eSXG4gICAgICAgIGxldCByZXNpZHVlUzogbnVtYmVyID0gT3BlcmF0aW9uLnN1YihPcGVyYXRpb24uZGl2KG1zLCAxMDAwKSwgY3VyclJhdGVJbnRlcnZhbC5zdGFydFRpbWUpO1xuICAgICAgICAvLyDorqHnrpflkI7lgI3njodcbiAgICAgICAgbGV0IHJhdGU6IG51bWJlciA9IGN1cnJSYXRlSW50ZXJ2YWwucmF0ZSArIChjdXJyUmF0ZUludGVydmFsLm1vdmUgKiByZXNpZHVlUykgKyAocmVzaWR1ZVMgKiAoY3VyclJhdGVJbnRlcnZhbC5hcHBlbmQgKyAoY3VyclJhdGVJbnRlcnZhbC5hcHBlbmQgKiByZXNpZHVlUykpKSAvIDJcblxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihOdW1iZXJVdGlscy5jb252ZXJUb1MocmF0ZSkpO1xuICAgIH1cblxufSJdfQ==