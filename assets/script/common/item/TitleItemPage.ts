import UIView from "../../framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TitleItemPage extends UIView {

    @property(cc.Label)
    private labPageName: cc.Label = null;

    onLoad() {
        super.onLoad();

        this.initData();
        this.initUI()
    }

    start() {

    }

    protected bindingEvents(): void {
        super.bindingEvents();
    }

    private initData(): void {

    }

    private initUI(): void {
        this.labPageName.string = "";
    }

    public setPageName(name: string): void {
        this.labPageName.string = name;
    }

    public languagePageName(i18n: (string | number)[] | string): void {
        this.labPageName.language = i18n;
    }

    // update (dt) {}
}
