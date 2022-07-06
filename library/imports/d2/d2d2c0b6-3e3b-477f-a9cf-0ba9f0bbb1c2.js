"use strict";
cc._RF.push(module, 'd2d2cC2PjtHf6nPC6nwu7HC', 'LanguageChange');
// script/common/language/LanguageChange.ts

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
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const Manager_1 = require("../manager/Manager");
const { ccclass, property } = cc._decorator;
/**
 * 多语言切换界面
 */
let LanguageChange = class LanguageChange extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.toggleContainer = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "common/prefabs/LanguageChange";
    }
    onLoad() {
        super.onLoad();
        this.content = cc.find('content', this.node);
        let language = "english";
        if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_ENGLISH) {
            language = "english";
        }
        else if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_HINDI) {
            language = "hindi";
        }
        this.toggleContainer.toggleItems.forEach((toggle) => {
            if (toggle.node.name == language)
                toggle.isChecked = true;
        });
        this.showWithAction();
    }
    onClick(name, node) {
        switch (name) {
            case "confirm":
                this.okCall();
                break;
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    okCall() {
        this.toggleContainer.toggleItems.forEach((toggle) => {
            if (toggle.isChecked) {
                switch (toggle.node.name) {
                    case "english":
                        if (Manager_1.Manager.language.getLanguage() != cc.sys.LANGUAGE_ENGLISH) {
                            Manager_1.Manager.language.change(cc.sys.LANGUAGE_ENGLISH);
                        }
                        break;
                    case "hindi":
                        if (Manager_1.Manager.language.getLanguage() != cc.sys.LANGUAGE_HINDI) {
                            Manager_1.Manager.language.change(cc.sys.LANGUAGE_HINDI);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
        this.closeWithAction();
    }
};
__decorate([
    property(cc.ToggleContainer)
], LanguageChange.prototype, "toggleContainer", void 0);
LanguageChange = __decorate([
    ccclass
], LanguageChange);
exports.default = LanguageChange;

cc._RF.pop();