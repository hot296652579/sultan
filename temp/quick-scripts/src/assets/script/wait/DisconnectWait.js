"use strict";
cc._RF.push(module, 'cba526R775Hsqf3v49ArlaD', 'DisconnectWait');
// script/wait/DisconnectWait.ts

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
let DisconnectWait = class DisconnectWait extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "wait/prefabs/DisconnectWait";
    }
    onLoad() {
        super.onLoad();
    }
    show(args) {
        if (args[0]) {
            this.label.language = args[0];
        }
        // if (this.args[1] &&  typeof this.args[1] == 'function') {
        //     let ctr = this.node.getComponent('BaseWaitPanelEnter'); 
        //     if( !!ctr){
        //         ctr.registerTimeoutCb(this.args[1]);
        //     } 
        // }
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
};
__decorate([
    property(cc.Label)
], DisconnectWait.prototype, "label", void 0);
DisconnectWait = __decorate([
    ccclass
], DisconnectWait);
exports.default = DisconnectWait;

cc._RF.pop();