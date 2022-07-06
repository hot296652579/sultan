import NumberUtils from "../../../../script/common/utils/NumberUtils";
import Operation from "../../../../script/framework/extentions/Operation";
import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";
import { UtilMgr } from "../../../../script/global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WingoLinkItem extends UIView {

    @property(cc.Label)
    private labIssue: cc.Label = null;

    @property(cc.Layout)
    private latNum: cc.Layout = null;

    @property([cc.SpriteFrame])
    private spfNum: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    private spfDarkNum: cc.SpriteFrame = null;

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
        this.initColor();
    }

    private initColor(): void {
        for (let v of this.latNum.node.children) {
            v.getComponent(cc.Sprite).spriteFrame = this.spfDarkNum;
        }
    }

    private setIssue(issue:number): void {
        this.labIssue.string = issue.toString();
    }

    private setColor(num: number): void {
        let imgNum:cc.Sprite =  this.latNum.node.getChildByName(`imgNum${num}`).getComponent(cc.Sprite);
        imgNum.spriteFrame = this.spfNum[num];
    }

    public onShow(data: MST.IWingoHistoryInfo): void {
        this._data = data;
        this.initUI();

        this.setIssue(Number(data.Issue));
        this.setColor(data.Num);
    }

    public reset(): void {
        this.initData();
        this.initUI();
    }

    // update (dt) {}
}
