import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../../framework/base/Defines";
import { EventApi } from "../../framework/event/EventApi";
import UIView from "../../framework/ui/UIView";
import { i18n } from "../language/LanguageImpl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NoneItem extends UIView {

    @property(cc.Label)
    private labNone: cc.Label = null;

    onLoad() {
        super.onLoad();

        this.initData();
        this.initUI()

        this.onLanguageChange();
    }

    start() {

    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

    }

    onLanguageChange() {
        this.labNone.language = i18n.Common.NoData;
    }

    private initData(): void {

    }

    private initUI(): void {
        this.labNone.string = "";
    }

    // update (dt) {}
}
