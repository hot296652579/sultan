
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/view/IndicatorView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL3ZpZXcvSW5kaWNhdG9yVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLGdFQUE2RDtBQUM3RCw2RUFBcUQ7QUFJckQscUVBQXFFO0FBSXJFLHVFQUErQztBQUMvQyx5REFBc0Q7QUFFdEQsTUFBTTtBQUNOLE1BQU0sYUFBYSxHQUFXLEdBQUcsQ0FBQztBQUNsQyxNQUFNO0FBQ04sTUFBTSxhQUFhLEdBQVcsRUFBRSxDQUFDO0FBQ2pDLE1BQU07QUFDTixNQUFNLGNBQWMsR0FBVyxFQUFFLENBQUM7QUFFbEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLGdCQUFNO0lBQWpEOztRQUlZLGNBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsVUFBSyxHQUFjLElBQUksQ0FBQztRQUd4QixlQUFVLEdBQWEsSUFBSSxDQUFDO1FBRXBDLEtBQUs7UUFDRyxTQUFJLEdBQVksSUFBSSxDQUFDO1FBQzdCLFNBQVM7UUFDRCxjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ2pDLE9BQU87UUFDQyxXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQzlCLEtBQUs7UUFDRyxlQUFVLEdBQTJCLElBQUksQ0FBQztJQXlGdEQsQ0FBQztJQXZGVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLDhCQUE4QixDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVwQixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFTSxJQUFJLENBQUMsSUFBWTtRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFD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QUFJLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFrQixDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxPQUFPLENBQUMsVUFBZSxFQUFFLFVBQWUsRUFBRSxJQUFhO1FBQzFELFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUVKLENBQUE7QUF4R0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDZ0I7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDWTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNpQjtBQVZuQixhQUFhO0lBRmpDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGFBQWEsQ0E0R2pDO2tCQTVHb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaXN0VmlldyBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudC9MaXN0Vmlld1wiO1xuaW1wb3J0IE5vbmVJdGVtIGZyb20gXCIuLi8uLi9jb21tb24vaXRlbS9Ob25lSXRlbVwiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9pdGVtL1RpdGxlSXRlbVBhZ2VcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi8uLi9jb21tb24vdXRpbHMvVHlwZVV0aWxzXCI7XG5pbXBvcnQgQXBwRGF0YSBmcm9tIFwiLi4vLi4vZGF0YS9BcHBEYXRhXCI7XG5pbXBvcnQgeyBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9leHRlbnRpb25zL0RhdGVVdGlsc1wiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IENvbW1vbkRlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvQ29tbW9uRGVmaW5lXCI7XG5cbi8vIOm7mOiupOWuvVxuY29uc3QgREVGQVVMVF9XSURUSDogbnVtYmVyID0gNjk4O1xuLy8g6Ze06ZqU5a69XG5jb25zdCBQQURESU5HX1dJRFRIOiBudW1iZXIgPSAxMDtcbi8vIOmXtOmalOmrmFxuY29uc3QgUEFERElOR19IRUlHSFQ6IG51bWJlciA9IDEwO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kaWNhdG9yVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdBcnJvd3M6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nQmc6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJDb250ZW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyDkvY3nva5cbiAgICBwcml2YXRlIF9wb3M6IGNjLlZlYzIgPSBudWxsO1xuICAgIC8vIOWkmuivreiogOWtl+espuS4slxuICAgIHByaXZhdGUgX2xhbmd1YWdlOiBzdHJpbmcgPSBudWxsO1xuICAgIC8vIOaWh+acrOWuveW6plxuICAgIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOaWueWQkVxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogQ29tbW9uRGVmaW5lLkRpcmVjdGlvbiA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiY29tbW9uL3ByZWZhYnMvSW5kaWNhdG9yVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KGFyZ3M/OiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuXG4gICAgICAgIHRoaXMuX3BvcyA9IGFyZ3NbMF07XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlID0gYXJnc1sxXTtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBhcmdzWzJdXG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGFyZ3NbM107XG5cbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwodGhpcy5fd2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IERFRkFVTFRfV0lEVEg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiQ29udGVudC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmltZ0JnLm5vZGUuc2V0Q29udGVudFNpemUoMCwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXREaXJlY3Rpb25MYXlvdXQoZGlyZWN0aW9uOiBDb21tb25EZWZpbmUuRGlyZWN0aW9uLCBpc0F1dG86IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChkaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldERpcmVjdGlvbkxheW91dChDb21tb25EZWZpbmUuRGlyZWN0aW9uLkRPV04pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhZGRpbmdZOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IENvbW1vbkRlZmluZS5EaXJlY3Rpb24uVVApIHtcbiAgICAgICAgICAgIHBhZGRpbmdZID0gKHRoaXMuX3Bvcy55ICsgKHRoaXMuaW1nQXJyb3dzLm5vZGUuaGVpZ2h0IC8gMikgKyB0aGlzLmltZ0JnLm5vZGUuaGVpZ2h0KVxuICAgICAgICAgICAgaWYgKHBhZGRpbmdZID4gKHRoaXMubm9kZS5oZWlnaHQgLyAyKSAmJiAhaXNBdXRvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb25MYXlvdXQoQ29tbW9uRGVmaW5lLkRpcmVjdGlvbi5ET1dOLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1nQXJyb3dzLm5vZGUuc2NhbGVZID0gLTE7XG4gICAgICAgICAgICB0aGlzLmltZ0Fycm93cy5ub2RlLnBvc2l0aW9uID0gY2MudjIodGhpcy5fcG9zLngsIHRoaXMuX3Bvcy55ICsgKHRoaXMuaW1nQXJyb3dzLm5vZGUuaGVpZ2h0IC8gMikpO1xuICAgICAgICAgICAgdGhpcy5pbWdCZy5ub2RlLnBvc2l0aW9uID0gY2MudjIoMCwgdGhpcy5pbWdBcnJvd3Mubm9kZS55ICsgKHRoaXMuaW1nQXJyb3dzLm5vZGUuaGVpZ2h0IC8gMikgKyAodGhpcy5pbWdCZy5ub2RlLmhlaWdodCAvIDIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IENvbW1vbkRlZmluZS5EaXJlY3Rpb24uRE9XTikge1xuICAgICAgICAgICAgcGFkZGluZ1kgPSAodGhpcy5fcG9zLnkgLSAodGhpcy5pbWdBcnJvd3Mubm9kZS5oZWlnaHQgLyAyKSAtIHRoaXMuaW1nQmcubm9kZS5oZWlnaHQpXG4gICAgICAgICAgICBpZiAocGFkZGluZ1kgPCAoMCAtICh0aGlzLm5vZGUuaGVpZ2h0IC8gMikpICYmICFpc0F1dG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERpcmVjdGlvbkxheW91dChDb21tb25EZWZpbmUuRGlyZWN0aW9uLlVQLCB0cnVlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1nQXJyb3dzLm5vZGUuc2NhbGVZID0gMTtcbiAgICAgICAgICAgIHRoaXMuaW1nQXJyb3dzLm5vZGUucG9zaXRpb24gPSBjYy52Mih0aGlzLl9wb3MueCwgdGhpcy5fcG9zLnkgLSAodGhpcy5pbWdBcnJvd3Mubm9kZS5oZWlnaHQgLyAyKSk7XG4gICAgICAgICAgICB0aGlzLmltZ0JnLm5vZGUucG9zaXRpb24gPSBjYy52MigwLCB0aGlzLmltZ0Fycm93cy5ub2RlLnkgLSAodGhpcy5pbWdBcnJvd3Mubm9kZS5oZWlnaHQgLyAyKSAtICh0aGlzLmltZ0JnLm5vZGUuaGVpZ2h0IC8gMikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoQ29udGVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWdCZy5ub2RlLndpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIHRoaXMubGFiQ29udGVudC5ub2RlLndpZHRoID0gdGhpcy5fd2lkdGggLSAoUEFERElOR19XSURUSCAqIDIpO1xuICAgICAgICB0aGlzLmxhYkNvbnRlbnQubGFuZ3VhZ2UgPSB0aGlzLl9sYW5ndWFnZTtcbiAgICAgICAgKHRoaXMubGFiQ29udGVudCBhcyBhbnkpLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKTtcbiAgICAgICAgdGhpcy5pbWdCZy5ub2RlLmhlaWdodCA9IHRoaXMubGFiQ29udGVudC5ub2RlLmhlaWdodCArIChQQURESU5HX0hFSUdIVCAqIDIpO1xuXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uTGF5b3V0KHRoaXMuX2RpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==