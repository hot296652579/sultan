import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import UIView from "../../../../script/framework/ui/UIView";
import { UtilMgr } from "../../../../script/global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RouletteBigWinItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Sprite)
    private iconSp: cc.Sprite = null;

    @property(cc.Sprite)
    private imgAvatar: cc.Sprite = null;

    @property(cc.Label)
    private uname: cc.Label = null;

    @property(cc.Label)
    private labRp: cc.Label = null;

    @property(cc.Label)
    private labNo: cc.Label = null;

    onLoad(): void {
        super.onLoad();

        this.initData();
        this.initView();
    }

    protected start(): void {

    }

    private initData(): void {

    }

    private initView(): void {
    }

    public updateItem(data, idx) {
        let betInfo = data.betInfo;
        this.uname.string = betInfo.player.Nick;
        this.labRp.string = String(NumberUtils.converToC(betInfo.BetGold));

        this.labNo.string = idx + 1;
        if (idx > 2) {
            this.iconSp.node.active = false;
        } else {
            this.labNo.node.active = false;
        }

        UtilMgr.loadHeadImg(this.imgAvatar, betInfo.player.HeaderUrl, betInfo.player.UnitId, this);
    }
    public clear(): void {
        this.initView();
    }

}
