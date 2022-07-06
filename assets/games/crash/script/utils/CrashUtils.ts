import NumberUtils from "../../../../script/common/utils/NumberUtils";
import Operation from "../../../../script/framework/extentions/Operation";
import { UtilMgr } from "../../../../script/global/UtilMgr";
import { CrashRateDefine } from "../define/CrashRateDefine";
import { CrashInterface } from "../interface/CrashInterface";

export default class CrashUtils {

    public static getRateByRunTime(ms: number): number {
        if (ms <= 0) {
            G.Logger.warn(`倍率负数 ${ms}`);
            return null;
        }
        let currRateInterval: CrashInterface.RateInterval = null;
        let maxRateInterval: CrashInterface.RateInterval = CrashRateDefine.RateInterval[CrashRateDefine.RateInterval.length - 1];
        if (ms < Operation.mul(maxRateInterval.startTime, 1000)) {
            for (let v of CrashRateDefine.RateInterval) {
                if (Operation.mul(v.startTime, 1000) > ms) {
                    break;
                } else {
                    currRateInterval = v;
                }
            }
        } else {
            currRateInterval = maxRateInterval;
        }

        // 剩余秒
        let residueS: number = Operation.sub(Operation.div(ms, 1000), currRateInterval.startTime);
        // 计算后倍率
        let rate: number = currRateInterval.rate + (currRateInterval.move * residueS) + (residueS * (currRateInterval.append + (currRateInterval.append * residueS))) / 2

        return Math.floor(NumberUtils.converToS(rate));
    }

}