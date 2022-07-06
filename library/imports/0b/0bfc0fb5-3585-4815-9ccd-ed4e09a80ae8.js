"use strict";
cc._RF.push(module, '0bfc0+1NYVIFZzN7U4JqAro', 'Loading');
// script/loading/Loading.ts

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
const { ccclass, property } = cc._decorator;
let Loading = class Loading extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
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
        super.show(args);
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
        }, this.args[1]);
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
};
__decorate([
    property(cc.Label)
], Loading.prototype, "label", void 0);
Loading = __decorate([
    ccclass
], Loading);
exports.default = Loading;

cc._RF.pop();