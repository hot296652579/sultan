import NumberUtils from "../common/utils/NumberUtils";
import { MST } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import { PromotionInterface } from "./PromotionInterface";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PromotionRankItem extends UIView {

    @property(cc.Sprite)
    private imgRank: cc.Sprite = null;

    @property(cc.Label)
    private labRank: cc.Label = null;

    @property(cc.Sprite)
    private imgAvatar: cc.Sprite = null;

    @property(cc.Label)
    private labNick: cc.Label = null;

    @property(cc.Label)
    private labIncome: cc.Label = null;

    @property([cc.SpriteFrame])
    private spfRankList: cc.SpriteFrame[] = [];

    private _data: PromotionInterface.PlayerBrokerageRank = null;

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
        this.imgRank.node.active = false;
        this.labRank.string = "";
        this.imgAvatar.spriteFrame = null;
        this.labNick.string = "";
        this.labIncome.string = "";
    }

    private refreshRank(): void {
        if (this._data.rank <= 3) {
            this.labRank.string = "";
            this.imgRank.spriteFrame = this.spfRankList[this._data.rank - 1];
            this.imgRank.node.active = true;
        } else {
            this.imgRank.node.active = false;
            this.labRank.string = this._data.rank.toString();
        }
    }

    private refreshPlayer(): void {
        UtilMgr.loadHeadImg(this.imgAvatar, this._data.data.userInfo.HeaderUrl, this._data.data.userInfo.UnitId, this);
        this.labNick.string = this._data.data.userInfo.Nick;
    }

    private refreshIncome(): void {
        this.labIncome.string = NumberUtils.converToC(this._data.data.incomeGold);
    }

    public onShow(data: PromotionInterface.PlayerBrokerageRank): void {
        this._data = data;
        this.initUI();

        this.refreshRank();
        this.refreshPlayer();
        this.refreshIncome();
    }

    public reset(): void {
        this.initData();
        this.initUI();
    }

    // update (dt) {}
}
