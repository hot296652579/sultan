import UIView from "../../framework/ui/UIView";
import { Manager } from "../manager/Manager";

const { ccclass, property } = cc._decorator;

/**
 * 多语言切换界面
 */

@ccclass
export default class LanguageChange extends UIView {


    @property(cc.ToggleContainer)
    toggleContainer: cc.ToggleContainer = null;

    public static getPrefabUrl() {
        return "common/prefabs/LanguageChange";
    }

    onLoad() {
        super.onLoad();
        this.content = cc.find('content', this.node);
        let  language = "english"
        if (Manager.language.getLanguage() === cc.sys.LANGUAGE_ENGLISH) {
            language = "english"
        }else if(Manager.language.getLanguage() === cc.sys.LANGUAGE_HINDI){
            language = "hindi"
        }

        this.toggleContainer.toggleItems.forEach((toggle)=>{
            if (toggle.node.name == language)toggle.isChecked = true
        })
        this.showWithAction();
       
    }
    onClick(name, node) {
        switch (name) {
            case "confirm": this.okCall(); break;
            case "close": this.closeWithAction(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    okCall(){
        this.toggleContainer.toggleItems.forEach((toggle)=>{
            if (toggle.isChecked) {
                switch (toggle.node.name) {
                    case "english":
                        if (Manager.language.getLanguage() != cc.sys.LANGUAGE_ENGLISH) {
                            Manager.language.change(cc.sys.LANGUAGE_ENGLISH);
                        }
                        break;
                    case "hindi":
                        if (Manager.language.getLanguage() != cc.sys.LANGUAGE_HINDI) {
                            Manager.language.change(cc.sys.LANGUAGE_HINDI);
                        }
                        break;
                    default:
                        break;
                }
            }
        })

        this.closeWithAction()
    }

    // update (dt) {}
}
