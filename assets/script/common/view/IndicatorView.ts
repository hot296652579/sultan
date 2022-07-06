import ListView from "../../common/component/ListView";
import NoneItem from "../../common/item/NoneItem";
import TitleItemPage from "../../common/item/TitleItemPage";
import { Manager } from "../../common/manager/Manager";
import { LobbyService } from "../../common/net/LobbyService";
import TypeUtils from "../../common/utils/TypeUtils";
import AppData from "../../data/AppData";
import { ENABLE_CHANGE_LANGUAGE } from "../../framework/base/Defines";
import { IController } from "../../framework/controller/Controller";
import { injectService } from "../../framework/decorator/Decorators";
import { EventApi } from "../../framework/event/EventApi";
import DateUtils from "../../framework/extentions/DateUtils";
import { MST } from "../../framework/external/protoc";
import UIView from "../../framework/ui/UIView";
import { CommonDefine } from "../define/CommonDefine";

// 默认宽
const DEFAULT_WIDTH: number = 698;
// 间隔宽
const PADDING_WIDTH: number = 10;
// 间隔高
const PADDING_HEIGHT: number = 10;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class IndicatorView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Sprite)
    private imgArrows: cc.Sprite = null;

    @property(cc.Sprite)
    private imgBg: cc.Sprite = null;

    @property(cc.Label)
    private labContent: cc.Label = null;

    // 位置
    private _pos: cc.Vec2 = null;
    // 多语言字符串
    private _language: string = null;
    // 文本宽度
    private _width: number = null;
    // 方向
    private _direction: CommonDefine.Direction = null;

    public static getPrefabUrl() {
        return "common/prefabs/IndicatorView";
    }

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();

    }

    start() {

    }

    public show(args?: any[]): void {
        super.show(args);

        this._pos = args[0];
        this._language = args[1];
        this._width = args[2]
        this._direction = args[3];

        if (TypeUtils.isNull(this._width)) {
            this._width = DEFAULT_WIDTH;
        }

        this.refreshContent();
    }

    private initData(): void {

    }

    private initView(): void {
        this.labContent.string = "";
        this.imgBg.node.setContentSize(0, 0);
    }

    private setDirectionLayout(direction: CommonDefine.Direction, isAuto: boolean = false): void {
        if (TypeUtils.isNull(direction)) {
            this.setDirectionLayout(CommonDefine.Direction.DOWN);
            return;
        }

        let paddingY: number = 0;

        if (direction === CommonDefine.Direction.UP) {
            paddingY = (this._pos.y + (this.imgArrows.node.height / 2) + this.imgBg.node.height)
            if (paddingY > (this.node.height / 2) && !isAuto) {
                this.setDirectionLayout(CommonDefine.Direction.DOWN, true);
                return
            }
            this.imgArrows.node.scaleY = -1;
            this.imgArrows.node.position = cc.v2(this._pos.x, this._pos.y + (this.imgArrows.node.height / 2));
            this.imgBg.node.position = cc.v2(0, this.imgArrows.node.y + (this.imgArrows.node.height / 2) + (this.imgBg.node.height / 2));
        } else if (direction === CommonDefine.Direction.DOWN) {
            paddingY = (this._pos.y - (this.imgArrows.node.height / 2) - this.imgBg.node.height)
            if (paddingY < (0 - (this.node.height / 2)) && !isAuto) {
                this.setDirectionLayout(CommonDefine.Direction.UP, true)
                return;
            }
            this.imgArrows.node.scaleY = 1;
            this.imgArrows.node.position = cc.v2(this._pos.x, this._pos.y - (this.imgArrows.node.height / 2));
            this.imgBg.node.position = cc.v2(0, this.imgArrows.node.y - (this.imgArrows.node.height / 2) - (this.imgBg.node.height / 2));
        }
    }

    private refreshContent(): void {
        this.imgBg.node.width = this._width;
        this.labContent.node.width = this._width - (PADDING_WIDTH * 2);
        this.labContent.language = this._language;
        (this.labContent as any)._forceUpdateRenderData();
        this.imgBg.node.height = this.labContent.node.height + (PADDING_HEIGHT * 2);

        this.setDirectionLayout(this._direction);
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
        switch (ButtonName) {
            case "btnClose":
                this.close();
                break;
        }
    }

}
