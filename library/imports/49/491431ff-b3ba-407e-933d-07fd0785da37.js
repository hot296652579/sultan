"use strict";
cc._RF.push(module, '49143H/s7pAfpM9B/0Hhdo3', 'BaseWaitPanelEnter');
// script/common/base/BaseWaitPanelEnter.ts

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
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const Manager_1 = require("../manager/Manager");
const { ccclass, property } = cc._decorator;
let BaseWaitPanelEnter = class BaseWaitPanelEnter extends cc.Component {
    onLoad() {
        // this.timeoutAction(); 
    }
    /**处理超时回调 */
    timeoutAction() {
        cc.tween(this.node)
            .delay(5)
            .call(() => {
            if (null != this.timeoutCb) {
                this.timeoutCb();
            }
            else {
                PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage(`TIPS.NETWAITTIMEOUT`));
            }
            let waitPanelName = this.node.name;
            // ryyl.waitPanel.closeWaitByKey(waitPanelName);
            Manager_1.Manager.uiManager.close(waitPanelName);
            this.node.destroy();
            cc.warn('等待超时处理');
        })
            .start();
    }
    registerTimeoutCb(_cb) {
        this.timeoutCb = _cb;
    }
};
BaseWaitPanelEnter = __decorate([
    ccclass
], BaseWaitPanelEnter);
exports.default = BaseWaitPanelEnter;

cc._RF.pop();