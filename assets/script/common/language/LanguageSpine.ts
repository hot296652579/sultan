import { ENABLE_CHANGE_LANGUAGE } from "../../framework/base/Defines";
import EventComponent from "../../framework/base/EventComponent";
import { EventApi } from "../../framework/event/EventApi";
import { Manager } from "../../framework/Framework";


const { ccclass, property, menu } = cc._decorator;

/**
 * 多语言的spine初始化
 */
@ccclass
@menu("多语言/spine")
export default class LanguageSpine extends EventComponent {

    @property({
        displayName: "英文(默认)",
        type: sp.SkeletonData
    })
    en: sp.SkeletonData = null;
    @property({
        displayName: "中文",
        type: sp.SkeletonData
    })
    zh: sp.SkeletonData = null;

    @property({
        displayName: "印地",
        type: sp.SkeletonData
    })
    hi: sp.SkeletonData = null;

    onLoad() {
        super.onLoad()
        let language = Manager.language.getLanguage();
        this.onLanguageChange(language);
    }
    protected bindingEvents() {
        super.bindingEvents();
        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    /**
    * 监听切换语言事件
    */
    onLanguageChange(language) {
        let skeletonData = null;
        if (language == cc.sys.LANGUAGE_ENGLISH) {
            skeletonData = this.en
        } else if (language == cc.sys.LANGUAGE_CHINESE) {
            skeletonData = this.zh
        } else if (language == cc.sys.LANGUAGE_HINDI) {
            skeletonData = this.hi
        }
        if (skeletonData) {
            this.getComponent(sp.Skeleton).skeletonData = skeletonData;
            this.getComponent(sp.Skeleton).setAnimation(0, 'newAnimation', true);
        }

    }

    // update (dt) {}
}
