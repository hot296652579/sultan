import NumberUtils from "../../../../script/common/utils/NumberUtils";
import UserData from "../../../../script/data/UserData";
import Operation from "../../../../script/framework/extentions/Operation";
import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";
import { UtilMgr } from "../../../../script/global/UtilMgr";
import { CrashColorDefine } from "../define/CrashColorDefine";
import { CrashInterface } from "../interface/CrashInterface";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CrashBetPlayerItem extends UIView {

    @property(cc.Sprite)
    private imgAvatar: cc.Sprite = null;

    @property(cc.Label)
    private labPlayer: cc.Label = null;

    @property(cc.Label)
    private labRate: cc.Label = null;

    @property(cc.Label)
    private labBetGold: cc.Label = null;

    @property(cc.Label)
    private labInCome: cc.Label = null;

    private _data: CrashInterface.BetPlayer = null;
    private _isWin: boolean = null;
    private _userData: UserData = null;

    onLoad() {
        this.initData();
        this.initUI();
    }

    start() {

    }

    private initData(): void {
        this._data = null;
        this._isWin = null;
        this._userData = G.DataMgr.get(UserData);
    }

    private initUI(): void {
        this.imgAvatar.spriteFrame = null;
        this.labPlayer.string = "";
        this.labRate.string = "";
        this.labBetGold.string = "";
        this.labInCome.string = "";
        this.labPlayer.node.color = CrashColorDefine.ProfitLoss.NORMAL;
        this.labRate.node.color = CrashColorDefine.ProfitLoss.NORMAL;
        this.labBetGold.node.color = CrashColorDefine.ProfitLoss.NORMAL;
        this.labInCome.node.color = CrashColorDefine.ProfitLoss.NORMAL;
    }

    private refreshUI(): void {
        UtilMgr.loadHeadImg(this.imgAvatar, this._data.betInfo.player.HeaderUrl, this._data.betInfo.player.UnitId, this);
        this.labPlayer.string = UtilMgr.setString(this._data.betInfo.player.Nick);
        this.labBetGold.string = NumberUtils.converToC(Number(this._data.betInfo.BetGold));
        this.refreshInCome();

        if (this._data.betInfo.player.UnitId === this._userData.id) {
            this.labRate.string = NumberUtils.converToC(this._data.betInfo.Multiple);
        }
    }

    private refreshInCome(): void {
        if (this._isWin === null) {
            this.labInCome.node.color = CrashColorDefine.ProfitLoss.NORMAL;
            this.labInCome.string = "";
        } else {
            if (this._data.isEscape) {
                this.labRate.string = NumberUtils.converToC(Number(this._data.betInfo.Multiple));
                this.labInCome.node.color = CrashColorDefine.ProfitLoss.GREEN;
                this.labPlayer.node.color = CrashColorDefine.ProfitLoss.GREEN;
                this.labRate.node.color = CrashColorDefine.ProfitLoss.GREEN;
                this.labBetGold.node.color = CrashColorDefine.ProfitLoss.GREEN;
                this.labInCome.string = Math.floor(Operation.mul(Operation.div(Number(this._data.betInfo.BetGold), 100), Operation.div(this._data.betInfo.Multiple, 100))).toString();
            } else {
                this.labInCome.node.color = CrashColorDefine.ProfitLoss.RED;
                this.labPlayer.node.color = CrashColorDefine.ProfitLoss.RED;
                this.labRate.node.color = CrashColorDefine.ProfitLoss.RED;
                this.labBetGold.node.color = CrashColorDefine.ProfitLoss.RED;
                this.labInCome.string = NumberUtils.converToC(Number(this._data.betInfo.BetGold));
            }
        }
    }

    public setIsWin(is: boolean): void {
        this._isWin = is;
        this._data.isEscape = is;
        this.refreshInCome();
    }

    public getIsWin(): boolean {
        return this._isWin;
    }

    public getId(): number {
        return Number(this._data.betInfo.player.UnitId);
    }

    public getBetRate(): number {
        return Number(this._data.betInfo.Multiple);
    }

    public onShow(data: CrashInterface.BetPlayer): void {
        this._data = data;

        if (data.isEscape) {
            this._isWin = data.isEscape;
        }

        this.initUI();
        this.refreshUI();
    }

    public reset(): void {
        this.initData();
        this.initUI();
    }

    // update (dt) {}
}
