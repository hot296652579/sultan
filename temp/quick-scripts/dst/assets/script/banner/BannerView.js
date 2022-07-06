
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/banner/BannerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a521d64X5BE1on2bjdVkVac', 'BannerView');
// script/banner/BannerView.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
/**
 * 多语言切换界面
 */
let BannerView = class BannerView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.pageView = null;
        this.pageSpriteNode = null;
        // update (dt) {
        // }
    }
    static getPrefabUrl() {
        return "common/prefabs/BannerView";
    }
    onLoad() {
        super.onLoad();
        this.content = cc.find('content', this.node);
        this.pageIndex = 0;
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.loadUI(args[0]);
        }
    }
    loadUI(banners) {
        if (banners) {
            for (let index = 0; index < banners.length; index++) {
                let data = banners[index];
                let page = cc.instantiate(this.pageSpriteNode);
                page.active = true;
                page.getComponent(cc.Sprite).loadRemoteImage({ url: data.imgUrl, view: this });
                this.pageView.addPage(page);
            }
        }
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    onPageScorllEvents(pageView, eventType, customEventData) {
        if (eventType == cc.PageView.EventType.PAGE_TURNING) {
            this.pageIndex = pageView.getCurrentPageIndex();
        }
    }
    start() {
        if (this.pageView.getPages().length > 1) {
            this.schedule(() => {
                if (!this.pageView.isScrolling()) {
                    this.pageIndex++;
                    if (this.pageIndex >= this.pageView.getPages().length) {
                        this.pageIndex = 0;
                        this.pageView.scrollToPage(this.pageIndex, 0);
                    }
                    else {
                        this.pageView.scrollToPage(this.pageIndex, 1);
                    }
                }
            }, 5);
        }
    }
    onDestroy() {
        super.onDestroy();
        UtilMgr_1.UtilMgr.popWindows();
    }
};
__decorate([
    property(cc.PageView)
], BannerView.prototype, "pageView", void 0);
__decorate([
    property(cc.Node)
], BannerView.prototype, "pageSpriteNode", void 0);
BannerView = __decorate([
    ccclass
], BannerView);
exports.default = BannerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYmFubmVyL0Jhbm5lclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNEM7QUFDNUMsK0NBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUU1Qzs7R0FFRztBQUdILElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBVyxTQUFRLGdCQUFNO0lBQTlDOztRQUlJLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRzdCLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBNEQvQixnQkFBZ0I7UUFDaEIsSUFBSTtJQUNSLENBQUM7SUEzRFUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTywyQkFBMkIsQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBSTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFHLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFDTyxNQUFNLENBQUMsT0FBTztRQUNsQixJQUFJLE9BQU8sRUFBRTtZQUNULEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNqRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO2dCQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7Z0JBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQ2QsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLE9BQU87Z0JBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUFDLE1BQU07WUFDNUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBQ0Qsa0JBQWtCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxlQUFlO1FBQ25ELElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtZQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUNELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUUsRUFBRTtnQkFDZCxJQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBQztvQkFDNUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO29CQUNoQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUM7d0JBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO3dCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUMvQzt5QkFBSTt3QkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUMvQztpQkFDSjtZQUNMLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtTQUNQO0lBQ0wsQ0FBQztJQUNELFNBQVM7UUFDTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDakIsaUJBQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0NBR0osQ0FBQTtBQWpFRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzRDQUNPO0FBRzdCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ2E7QUFQZCxVQUFVO0lBRDlCLE9BQU87R0FDYSxVQUFVLENBcUU5QjtrQkFyRW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8qKlxuICog5aSa6K+t6KiA5YiH5o2i55WM6Z2iXG4gKi9cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbm5lclZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuXG5cbiAgICBAcHJvcGVydHkoY2MuUGFnZVZpZXcpXG4gICAgcGFnZVZpZXc6IGNjLlBhZ2VWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBhZ2VTcHJpdGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIHBhZ2VJbmRleDogbnVtYmVyO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcImNvbW1vbi9wcmVmYWJzL0Jhbm5lclZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjYy5maW5kKCdjb250ZW50JywgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAwO1xuICAgIH1cbiAgICBzaG93KGFyZ3Mpe1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuICAgICAgICBpZihhcmdzICYmIGFyZ3NbMF0pIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFVJKGFyZ3NbMF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgbG9hZFVJKGJhbm5lcnMpe1xuICAgICAgICBpZiAoYmFubmVycykge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJhbm5lcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBiYW5uZXJzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGFnZVNwcml0ZU5vZGUpXG4gICAgICAgICAgICAgICAgcGFnZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgcGFnZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5sb2FkUmVtb3RlSW1hZ2UoeyB1cmw6IGRhdGEuaW1nVXJsLCB2aWV3OiB0aGlzfSlcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LmFkZFBhZ2UocGFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uUGFnZVNjb3JsbEV2ZW50cyhwYWdlVmlldywgZXZlbnRUeXBlLCBjdXN0b21FdmVudERhdGEpe1xuICAgICAgICBpZiAoZXZlbnRUeXBlID09IGNjLlBhZ2VWaWV3LkV2ZW50VHlwZS5QQUdFX1RVUk5JTkcpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZUluZGV4ID0gcGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0KCl7XG4gICAgICAgIGlmICh0aGlzLnBhZ2VWaWV3LmdldFBhZ2VzKCkubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhZ2VWaWV3LmlzU2Nyb2xsaW5nKCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VJbmRleCsrXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucGFnZUluZGV4ID49IHRoaXMucGFnZVZpZXcuZ2V0UGFnZXMoKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZSh0aGlzLnBhZ2VJbmRleCwwKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKHRoaXMucGFnZUluZGV4LDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LDUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25EZXN0cm95KCl7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpXG4gICAgICAgIFV0aWxNZ3IucG9wV2luZG93cygpXG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHtcbiAgICAvLyB9XG59XG4iXX0=