import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

/**
 * 多语言切换界面
 */

@ccclass
export default class BannerView extends UIView {


    @property(cc.PageView)
    pageView: cc.PageView = null;

    @property(cc.Node)
    pageSpriteNode: cc.Node = null;
    private pageIndex: number;

    public static getPrefabUrl() {
        return "common/prefabs/BannerView";
    }

    onLoad() {
        super.onLoad();
        this.content = cc.find('content', this.node);
        this.pageIndex = 0;
    }
    show(args){
        super.show(args);
        this.showWithAction(true);
        if(args && args[0]) {
            this.loadUI(args[0]);
        }
    }
    private loadUI(banners){
        if (banners) {
            for (let index = 0; index < banners.length; index++) {
                let data = banners[index];
                let page = cc.instantiate(this.pageSpriteNode)
                page.active = true
                page.getComponent(cc.Sprite).loadRemoteImage({ url: data.imgUrl, view: this})
                this.pageView.addPage(page);
            }
        }
    }
    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    onPageScorllEvents(pageView, eventType, customEventData){
        if (eventType == cc.PageView.EventType.PAGE_TURNING) {
            this.pageIndex = pageView.getCurrentPageIndex();
        }
    }
    start(){
        if (this.pageView.getPages().length > 1) {
            this.schedule(()=>{
                if(!this.pageView.isScrolling()){
                    this.pageIndex++
                    if(this.pageIndex >= this.pageView.getPages().length){
                        this.pageIndex = 0
                        this.pageView.scrollToPage(this.pageIndex,0)
                    }else{
                        this.pageView.scrollToPage(this.pageIndex,1)
                    }
                }
            },5)
        }
    }
    onDestroy(){
        super.onDestroy()
        UtilMgr.popWindows()
    }
    // update (dt) {
    // }
}
