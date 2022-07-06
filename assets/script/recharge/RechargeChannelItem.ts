import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RechargeChannelItem extends UIView {

    @property(cc.Sprite)
    private imgIcon: cc.Sprite = null;

    @property(cc.Label)
    private labName: cc.Label = null;

    // 商品数据
    private m_data: com.bt.game.proto.hall.IPayChannelInfo = null;

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();
        this.register();
    }

    start() {
        this.updateView();
    }

    private initData(): void {

    }

    private initView(): void {
        this.imgIcon.spriteFrame = null;
        this.labName.string = "";
    }

    private register(): void {

    }

    private updateView(): void {
        this.imgIcon.spriteFrame = null;
        this.labName.string = this.m_data.name;

        this.imgIcon.loadRemoteImage({ url: this.m_data.icon, view: this })

        // UtilMgr.downloadImg(this.m_data.icon, this.imgIcon, (spriteFrame: cc.SpriteFrame) => {
        //     this.imgIcon.spriteFrame = spriteFrame
        // }, this);
    }

    private onClickSelect(): void {
        dispatch("SELECT_PAY_CHANNEL", this.m_data);
    }

    public setData(data: com.bt.game.proto.hall.IPayChannelInfo): void {
        this.m_data = data;
    }

    // update (dt) {}
}
