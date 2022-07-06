import { Logic } from "../../../script/common/base/Logic";
import { LogicType, LogicEvent, LogicEventData } from "../../../script/common/event/LogicEvent";
import { Manager } from "../../../script/common/manager/Manager";
import { LobbyService } from "../../../script/common/net/LobbyService";
import { ResourceLoaderError } from "../../../script/framework/assetManager/ResourceLoader";
import { ResourceData } from "../../../script/framework/base/Defines";
import { Wingo } from "./data/WingoGameData";
import WingoGameView from "./view/WingoGameView";

class WingoLogic extends Logic {

    logicType: LogicType = LogicType.GAME;
    private data: any;

    onLoad() {
        super.onLoad();
    }

    protected bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent.ENTER_GAME, this.onEnterGame);
    }

    protected get bundle() {
        return "wingo";
    }

    public onEnterComplete(data: LogicEventData) {
        super.onEnterComplete(data);
        if (data.type == this.logicType) {

        } else {
            //移除网络组件
            this.removeNetComponent();
            //卸载资源
            this._loader.unLoadResources();
        }
    }

    private onEnterGame(msg) {
        if (msg.bundle == this.bundle) {
            this.data = msg.data;
            // Manager.uiManager.open({ type: WingoGameView, bundle: this.bundle , args:[msg.data]});
            //游戏数据初始化
            Manager.gameData = Wingo.gameData;
            Manager.gameData.clear();

            //子游戏语言包初始化
            this.onLanguageChange();

            //先暂停网络回调处理，等待资源加载完成后，恢复处理
            LobbyService.instance.pauseMessageQueue();
            //加载资源
            this._loader.loadResources();
        } else {
            //移除网络组件
            this.removeNetComponent();
            //卸载资源
            this._loader.unLoadResources();
        }
    }

    protected onLoadResourceComplete(err: ResourceLoaderError) {
        if (err == ResourceLoaderError.LOADING) {
            return;
        }
        cc.log(`${this.bundle}资源加载完成!!!`);
        super.onLoadResourceComplete(err);

        Manager.uiManager.open({ type: WingoGameView, bundle: this.bundle, args: [this.data] }).then(() => {
            //加载完成，恢复网络
            LobbyService.instance.resumeMessageQueue();
        }).catch((e) => {
            LobbyService.instance.resumeMessageQueue();
            cc.error(`打开游戏界面：${WingoGameView.name}时报错了:`, e)
        })

    }

    protected getLoadResources(): ResourceData[] {
        return [{ preloadView: WingoGameView, bundle: this.bundle }];
    }

    protected onLanguageChange() {
        super.onLanguageChange();
        Wingo.gameData.onLanguageChange();
    }
}

Manager.logicManager.push(WingoLogic);