import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import { BUNDLE_RESOURCES } from "../../../../script/framework/base/Defines";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import UIView from "../../../../script/framework/ui/UIView";
import { UtilMgr } from "../../../../script/global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RouletteMyRecordItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Sprite)
    private iconSp: cc.Sprite = null;

    @property(cc.Sprite)
    private imgAvatar: cc.Sprite = null;

    @property(cc.Label)
    private uname: cc.Label = null;

    @property(cc.Label)
    private labRp: cc.Label = null;

    @property(cc.Node)
    private colorIcon0: cc.Node = null;

    @property(cc.Node)
    private colorIcon1: cc.Node = null;

    @property(cc.Node)
    private colorIcon2: cc.Node = null;

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
        this.labRp.string = NumberUtils.converToC(betInfo.BetGold);

        for (let index = 0; index < 3; index++) {
            const colorIcon = this[`colorIcon${index}`];
            colorIcon.active = false;

            if (index == betInfo.Color)
                colorIcon.active = true;
        }

        UtilMgr.loadHeadImg(this.imgAvatar, betInfo.player.HeaderUrl, betInfo.player.UnitId, this);
    }
    public clear(): void {
        this.initView();
    }

}
