"use strict";
cc._RF.push(module, '20d80oXDHdKzIXFGpg2fs84', 'CrashCheckView');
// games/crash/script/view/CrashCheckView.ts

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
const TitleItemPage_1 = __importDefault(require("../../../../script/common/item/TitleItemPage"));
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const CrashConfig_1 = require("../config/CrashConfig");
const CrashData_1 = __importDefault(require("../data/CrashData"));
const { ccclass, property } = cc._decorator;
let CrashCheckView = class CrashCheckView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.wbvCheck = null;
        this.titleItemPage = null;
        // 游戏数据
        this._crashData = null;
        // 游戏号
        this._gameNo = null;
    }
    static getPrefabUrl() {
        return "prefabs/CrashCheckView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
        this._gameNo = args[0];
        this.wbvCheck.url = `${CrashConfig_1.CrashConfig.CHECK_SHA256_URL}${this.getURLParam()}`;
    }
    initData() {
        this._crashData = G.DataMgr.get(CrashData_1.default);
        this._gameNo = null;
    }
    initView() {
    }
    getURLParam() {
        return `${this._crashData.totalRecordData.SeedInfo.ServerSeed}${this._crashData.totalRecordData.SeedInfo.PublicSeed}${this._gameNo}`;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labRecordPageName", true));
    }
};
__decorate([
    property(cc.WebView)
], CrashCheckView.prototype, "wbvCheck", void 0);
__decorate([
    property(TitleItemPage_1.default)
], CrashCheckView.prototype, "titleItemPage", void 0);
CrashCheckView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashCheckView);
exports.default = CrashCheckView;

cc._RF.pop();