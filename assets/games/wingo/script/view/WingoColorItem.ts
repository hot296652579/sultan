import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WingoColorItem extends UIView {

    @property(cc.Label)
    private labIssue: cc.Label = null;

    @property(cc.Label)
    private labHarga: cc.Label = null;

    @property(cc.Label)
    private labNum: cc.Label = null;

    @property(cc.Node)
    private nodColor: cc.Node = null;

    @property([cc.Prefab])
    private pfbWingoColorGroupItemList: cc.Prefab[] = [];

    private _data: MST.IWingoHistoryInfo = null;

    onLoad() {
        this.initData();
        this.initUI();
    }

    start() {

    }

    private initData(): void {
        this._data = null;
    }

    private initUI(): void {
        this.labIssue.string = "";
        this.labHarga.string = "";
        this.labNum.string = "";
        this.initColor();
    }

    private initColor(): void {
        this.nodColor.removeAllChildren();
    }

    private setIssue(issue: number): void {
        this.labIssue.string = issue.toString();
    }

    private setNum(num: number): void {
        this.labNum.string = num.toString();
    }

    private setHarga(harga: number): void {
        this.labHarga.string = harga.toString();
    }

    private setColor(num:number):void {
        this.nodColor.addChild(cc.instantiate(this.pfbWingoColorGroupItemList[num]));
    }

    public onShow(data: MST.IWingoHistoryInfo): void {
        this._data = data;
        this.initUI();

        this.setIssue(Number(data.Issue));
        this.setHarga(data.Harga);
        this.setNum(data.Num)
        this.setColor(data.Num);
    }

    public reset(): void {
        this.initData();
        this.initUI();
    }

    // update (dt) {}
}
