import DateUtils from "../extentions/DateUtils";

export default class Logger {

    private static s_instance: Logger = null;

    public static getInstance(): Logger {
        if (this.s_instance === null) {
            this.s_instance = new Logger();
        }
        return this.s_instance;
    }

    public static destroy(): void {
        if (this.s_instance !== null) {
            this.s_instance.destroy();
        }
        this.s_instance = null;
    }

    constructor() {

    }

    /**
     * 颜色日志
     * @param title {string} 标题
     * @param content {string} 重要内容
     * @param data {...any[]} 数据
     */
    public color(title: string, content: string, ...data: any[]): void {
        let colorList: string[] = [
            `${title} %c ${content} %c`,
            'background: #31A43D;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
            'background: #00FF24;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
        ];
        data = colorList.concat(data);
        console.log.apply(console.log, data);
    }


    /**
     * 打印正常信息
     * @param data {...any[]} 多个任意数据
     */
    public log(...data: any[]): void {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("信息：");
        data.push(DateUtils.getMDHMS(Date.now()));
        console.log.apply(console, data);
    }

    /**
     * 打印警告信息
     * @param data {...any[]} 多个任意数据
     */
    public warn(...data: any[]): void {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("警告：");
        console.warn.apply(console, data);
    }

    /**
     * 打印错误信息
     * @param data {...any[]} 多个任意数据
     */
    public error(...data: any[]): void {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("错误：");
        console.error.apply(console, data);
    }

    /**
     * 销毁
     */
    public destroy(): void {

    }

}