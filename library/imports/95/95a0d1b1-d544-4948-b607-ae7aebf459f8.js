"use strict";
cc._RF.push(module, '95a0dGx1URJSLYHrnrr9Fn4', 'WingoLogic');
// games/wingo/script/WingoLogic.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = require("../../../script/common/base/Logic");
const LogicEvent_1 = require("../../../script/common/event/LogicEvent");
const Manager_1 = require("../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../script/common/net/LobbyService");
const ResourceLoader_1 = require("../../../script/framework/assetManager/ResourceLoader");
const WingoGameData_1 = require("./data/WingoGameData");
const WingoGameView_1 = __importDefault(require("./view/WingoGameView"));
class WingoLogic extends Logic_1.Logic {
    constructor() {
        super(...arguments);
        this.logicType = LogicEvent_1.LogicType.GAME;
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_GAME, this.onEnterGame);
    }
    get bundle() {
        return "wingo";
    }
    onEnterComplete(data) {
        super.onEnterComplete(data);
        if (data.type == this.logicType) {
        }
        else {
            //移除网络组件
            this.removeNetComponent();
            //卸载资源
            this._loader.unLoadResources();
        }
    }
    onEnterGame(msg) {
        if (msg.bundle == this.bundle) {
            this.data = msg.data;
            // Manager.uiManager.open({ type: WingoGameView, bundle: this.bundle , args:[msg.data]});
            //游戏数据初始化
            Manager_1.Manager.gameData = WingoGameData_1.Wingo.gameData;
            Manager_1.Manager.gameData.clear();
            //子游戏语言包初始化
            this.onLanguageChange();
            //先暂停网络回调处理，等待资源加载完成后，恢复处理
            LobbyService_1.LobbyService.instance.pauseMessageQueue();
            //加载资源
            this._loader.loadResources();
        }
        else {
            //移除网络组件
            this.removeNetComponent();
            //卸载资源
            this._loader.unLoadResources();
        }
    }
    onLoadResourceComplete(err) {
        if (err == ResourceLoader_1.ResourceLoaderError.LOADING) {
            return;
        }
        cc.log(`${this.bundle}资源加载完成!!!`);
        super.onLoadResourceComplete(err);
        Manager_1.Manager.uiManager.open({ type: WingoGameView_1.default, bundle: this.bundle, args: [this.data] }).then(() => {
            //加载完成，恢复网络
            LobbyService_1.LobbyService.instance.resumeMessageQueue();
        }).catch((e) => {
            LobbyService_1.LobbyService.instance.resumeMessageQueue();
            cc.error(`打开游戏界面：${WingoGameView_1.default.name}时报错了:`, e);
        });
    }
    getLoadResources() {
        return [{ preloadView: WingoGameView_1.default, bundle: this.bundle }];
    }
    onLanguageChange() {
        super.onLanguageChange();
        WingoGameData_1.Wingo.gameData.onLanguageChange();
    }
}
Manager_1.Manager.logicManager.push(WingoLogic);

cc._RF.pop();