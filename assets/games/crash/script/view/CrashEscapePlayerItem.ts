import UIView from "../../../../script/framework/ui/UIView";
import { UtilMgr } from "../../../../script/global/UtilMgr";
import { CrashColorDefine } from "../define/CrashColorDefine";
import { CrashInterface } from "../interface/CrashInterface";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CrashEscapePlayerItem extends UIView {

    @property(cc.Sprite)
    private imgBg: cc.Sprite = null;

    @property(cc.Label)
    private labNick: cc.Label = null;

    private _nick: string = null;

    onLoad() {
        this.initData();
        this.initUI();
    }

    start() {

    }

    private initData(): void {
        this._nick = null;
    }

    private initUI(): void {
        this.labNick.string = "";
    }

    private refreshNick(): void {
        this.labNick.string = UtilMgr.setString(this._nick);
        (this.labNick as any)._forceUpdateRenderData();
        this.imgBg.node.width = this.labNick.node.width;
    }

    public onShow(nick: string): void {
        this._nick = nick;
        this.initUI();
        this.refreshNick();
    }

    public reset(): void {
        this.initData();
        this.initUI();
    }

    // update (dt) {}
}
