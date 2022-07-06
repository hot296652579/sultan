"use strict";
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