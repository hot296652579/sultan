"use strict";
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