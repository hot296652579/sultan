"use strict";
cc._RF.push(module, '343b2gmf59HG6w6quKjqFdG', 'IndicatorView');
// script/common/view/IndicatorView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LobbyService_1 = require("../../common/net/LobbyService");
const TypeUtils_1 = __importDefault(require("../../common/utils/TypeUtils"));
const Decorators_1 = require("../../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const CommonDefine_1 = require("../define/CommonDefine");
// 默认宽
const DEFAULT_WIDTH = 698;
// 间隔宽
const PADDING_WIDTH = 10;
// 间隔高
const PADDING_HEIGHT = 10;
const { ccclass, property } = cc._decorator;
let IndicatorView = class IndicatorView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgArrows = null;
        this.imgBg = null;
        this.labContent = null;
        // 位置
        this._pos = null;
        // 多语言字符串
        this._language = null;
        // 文本宽度
        this._width = null;
        // 方向
        this._direction = null;
    }
    static getPrefabUrl() {
        return "common/prefabs/IndicatorView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    show(args) {
        super.show(args);
        this._pos = args[0];
        this._language = args[1];
        this._width = args[2];
        this._direction = args[3];
        if (TypeUtils_1.default.isNull(this._width)) {
            this._width = DEFAULT_WIDTH;
        }
        this.refreshContent();
    }
    initData() {
    }
    initView() {
        this.labContent.string = "";
        this.imgBg.node.setContentSize(0, 0);
    }
    setDirectionLayout(direction, isAuto = false) {
        if (TypeUtils_1.default.isNull(direction)) {
            this.setDirectionLayout(CommonDefine_1.CommonDefine.Direction.DOWN);
            return;
        }
        let paddingY = 0;
        if (direction === CommonDefine_1.CommonDefine.Direction.UP) {
            paddingY = (this._pos.y + (this.imgArrows.node.height / 2) + this.imgBg.node.height);
            if (paddingY > (this.node.height / 2) && !isAuto) {
                this.setDirectionLayout(CommonDefine_1.CommonDefine.Direction.DOWN, true);
                return;
            }
            this.imgArrows.node.scaleY = -1;
            this.imgArrows.node.position = cc.v2(this._pos.x, this._pos.y + (this.imgArrows.node.height / 2));
            this.imgBg.node.position = cc.v2(0, this.imgArrows.node.y + (this.imgArrows.node.height / 2) + (this.imgBg.node.height / 2));
        }
        else if (direction === CommonDefine_1.CommonDefine.Direction.DOWN) {
            paddingY = (this._pos.y - (this.imgArrows.node.height / 2) - this.imgBg.node.height);
            if (paddingY < (0 - (this.node.height / 2)) && !isAuto) {
                this.setDirectionLayout(CommonDefine_1.CommonDefine.Direction.UP, true);
                return;
            }
            this.imgArrows.node.scaleY = 1;
            this.imgArrows.node.position = cc.v2(this._pos.x, this._pos.y - (this.imgArrows.node.height / 2));
            this.imgBg.node.position = cc.v2(0, this.imgArrows.node.y - (this.imgArrows.node.height / 2) - (this.imgBg.node.height / 2));
        }
    }
    refreshContent() {
        this.imgBg.node.width = this._width;
        this.labContent.node.width = this._width - (PADDING_WIDTH * 2);
        this.labContent.language = this._language;
        this.labContent._forceUpdateRenderData();
        this.imgBg.node.height = this.labContent.node.height + (PADDING_HEIGHT * 2);
        this.setDirectionLayout(this._direction);
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnClose":
                this.close();
                break;
        }
    }
};
__decorate([
    property(cc.Sprite)
], IndicatorView.prototype, "imgArrows", void 0);
__decorate([
    property(cc.Sprite)
], IndicatorView.prototype, "imgBg", void 0);
__decorate([
    property(cc.Label)
], IndicatorView.prototype, "labContent", void 0);
IndicatorView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], IndicatorView);
exports.default = IndicatorView;

cc._RF.pop();