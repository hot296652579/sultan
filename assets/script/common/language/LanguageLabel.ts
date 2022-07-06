import { ENABLE_CHANGE_LANGUAGE } from "../../framework/base/Defines";
import EventComponent from "../../framework/base/EventComponent";
import { EventApi } from "../../framework/event/EventApi";
import { Manager } from "../manager/Manager";


const { ccclass, property, menu } = cc._decorator;

/**
 * 多语言的图片初始化
 */
@ccclass
@menu("多语言/FontLabel")
export default class LanguageLabel extends EventComponent {

    @property({
        displayName: "英文(默认)",
        type: cc.Font
    })
    en: cc.Font = null;
    @property({
        displayName: "英文字体大小",
        type: cc.Integer
    })
    enSize = 20;

    @property({
        displayName: "中文",
        type: cc.Font
    })
    zh: cc.Font = null;
    @property({
        displayName: "中文字体大小",
        type: cc.Integer
    })
    zhSize = 20;

    @property({
        displayName: "印地语",
        type: cc.Font
    })
    hi: cc.Font = null;
    @property({
        displayName: "印地字体大小",
        type: cc.Integer
    })
    hiSize = 20;
    onLoad() {
        super.onLoad()
        if (Manager.language.getLanguage() === cc.sys.LANGUAGE_ENGLISH) {
            if (this.en) {
                this.getComponent(cc.Label).font = this.en;
                this.getComponent(cc.Label).fontSize = this.enSize;
            }
        } else if (Manager.language.getLanguage() === cc.sys.LANGUAGE_HINDI) {
            if (this.hi) {
                this.getComponent(cc.Label).font = this.hi;
                this.getComponent(cc.Label).fontSize = this.hiSize;
            }
        }
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
        // 容错处理
        if (!this || !cc.isValid(this) || !this.getComponent(cc.Sprite) || !cc.isValid(this.getComponent(cc.Sprite))) {
            return;
        }

        if (language == cc.sys.LANGUAGE_ENGLISH) {
            if (this.en) {
                this.getComponent(cc.Label).font = this.en;
                this.getComponent(cc.Label).fontSize = this.enSize;
            }
            else G.Logger.warn("未配置多语言")
        } else if (language == cc.sys.LANGUAGE_CHINESE) {
            if (this.zh) {
                this.getComponent(cc.Label).font = this.zh;
                this.getComponent(cc.Label).fontSize = this.zhSize;
            }
            else G.Logger.warn("未配置多语言")
        } else if (language == cc.sys.LANGUAGE_HINDI) {
            if (this.hi) {
                this.getComponent(cc.Label).font = this.hi;
                this.getComponent(cc.Label).fontSize = this.hiSize;
            }
            else G.Logger.warn("未配置多语言")
        }
    }

    // update (dt) {}
}
