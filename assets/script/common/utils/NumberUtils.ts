import Operation from "../../framework/extentions/Operation";

export default class NumberUtils {

    /**
     * 转换到服务器数据 需要乘以 100 发给服务器
     * @param value {number} 需转换值
     * @returns 转换后值
     */
    public static converToS(value: number): number {
        return Operation.mul(value, 100);
    }

    /**
     * 转换到客户端数据 需要除以 100 用于展示
     * @param value {number | Long} 需转换值
     * @returns 转换后值
     */
    public static converToC(value: number | Long): string {
        return Operation.div(Number(value), 100).toString();
    }

    /**
     * 数字大于多少位之后，用省略号代替
     * @param value {number | Long} 需转换值
     * @returns 转换后值
     */
    public static converToE(max, value: number | Long): string {
        let numStr = String(value);
        if (numStr.length > max) {
            return `${numStr.slice(0, max)}...`
        }
        else
            return numStr
    }

}