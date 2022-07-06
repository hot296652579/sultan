import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends UIView {

    @property(cc.Label)
    label: cc.Label = null;

    // @property(cc.Node)
    // progressbarNode: cc.Node = null;

    // @property(cc.ProgressBar)
    // progressbar: cc.ProgressBar = null;

    // @property(cc.Label)
    // progressbarLabel: cc.Label = null;


    outTimeCall: NodeJS.Timeout;



    public static getPrefabUrl() {
        return "common/prefabs/Loading";
    }

    onLoad() {
        super.onLoad();
        // this.progressbar.node.active = false;

    }
    bindingEvents() {
        super.bindingEvents();
        // this.registerEvent(HallEvent.DOWNLOAD_PROGRESS, this.onDownloadProgess);
        if (cc.sys.isBrowser) {
            // this.registerEvent("loadGameProgress", (progress) => {
            //     this.progressbar.node.active = true;
            //     if ((progress / 100) >= this.progressbar.progress) {
            //         this.progressbar.progress = progress / 100;
            //         this.progressbarLabel.string = progress + "%";
            //     }
            // });
        }

    }
    show(args) {
        super.show(args)
        // this.progressbarNode.active = false;
        // this.progressbar.node.active = false;
        // this.progressbar.progress = 0;
        // this.progressbarLabel.string = "";
        if (this.args[0]) {
            this.label.language = this.args[0];
        }
        if (this.outTimeCall) {
            clearTimeout(this.outTimeCall);
        }
        this.outTimeCall = setTimeout(() => {
            this.close();
            dispatch("serverOutTime");

        }, this.args[1])

        if (this.args[2] && cc.sys.isBrowser) {
            // this.progressbarNode.active = true;
            // this.progressbarNode.y = 0;
            // if (!Manager.uiManager.isInCurrentGame("HallView")) {
            //     this.progressbarNode.y = -50;
            // }
        }

    }

    start() {
        // cc.tween(this.iconWait)
        // .repeatForever(cc.tween().by(0.1,{angle : 30})
        // .delay(0.01))
        // .start()

        // cc.tween(this.juhuaicon)
        // .repeatForever(cc.tween().to(0.3,{scaleX : 0})
        // .to(0.3,{scaleX : 1})
        // .delay(0.2))
        // .start()

    }
    onDestroy() {
        super.onDestroy();
        if (this.outTimeCall) {
            clearTimeout(this.outTimeCall);
        }
    }

    // update (dt) {}
}
