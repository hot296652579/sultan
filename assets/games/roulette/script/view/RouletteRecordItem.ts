import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import UIView from "../../../../script/framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RouletteRecordItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Sprite)
    private icon0: cc.Sprite = null;
    @property(cc.Sprite)
    private icon1: cc.Sprite = null;
    @property(cc.Sprite)
    private icon2: cc.Sprite = null;

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
        this.icon0.node.active = false;
        this.icon1.node.active = false;
        this.icon2.node.active = false;
    }

    public setColor(color: number): void {
        this.icon0.node.active = false;
        this.icon1.node.active = false;
        this.icon2.node.active = false;
        this[`icon${color}`].node.active = true;
    }

    public clear(): void {
        this.initView();
    }

}
