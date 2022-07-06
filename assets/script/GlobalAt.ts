import DataManager from "./common/manager/DataManager";
import URLManager from "./common/manager/URLManager";
import Logger from "./framework/log/Logger";
import _ShareHelpder from "./Helpder/ShareHelpder/ShareHelpder";

export default class GlobalAt {

    private static s_instance: GlobalAt = new GlobalAt();

    public static getInstance(): GlobalAt {
        if (this.s_instance === null) {
            this.s_instance = new GlobalAt();
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
        window.G = this;
    }

    /**
     * 日志访问器
     * @return {Logger} 日志管理器
     */
    public get Logger(): Logger {
        return Logger.getInstance();
    }

    public get ShareHelpder(): _ShareHelpder {
        return _ShareHelpder.getInstance();
    }

    public get URLMgr(): URLManager {
        return URLManager.getInstance();
    }

    public get DataMgr(): DataManager {
        return DataManager.getInstance();
    }

    public destroy(): void {
        delete window.G;
    }
}