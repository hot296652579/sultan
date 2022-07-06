import { Config } from "../common/config/Config";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import RoomItemBase from "./RoomItemBase";
import RoomListGuide from "./RoomListGuide";
import { HallConfig } from "../hall/HallNetController";
import { Manager } from "../framework/Framework";
import { ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { EventApi } from "../framework/event/EventApi";

const { ccclass, property, menu } = cc._decorator;

// 左右两边间隔
const PADDING_WIDTH: number = 30;
// 每个之间间隔
const SPACE_WIDTH: number = 20;

@ccclass
@injectService(LobbyService.instance)
export default class RoomListView extends UIView {
    service: LobbyService;

    @property(cc.Label)
    private labNick: cc.Label = null;

    @property(cc.Label)
    private labId: cc.Label = null;

    @property(cc.Label)
    private labChip: cc.Label = null;

    @property(cc.Node)
    private notice: cc.Node = null;

    @property(cc.ScrollView)
    public scvRoomList: cc.ScrollView = null;

    @property(cc.Sprite)
    private imgGameName: cc.Sprite = null;

    // 德州牛仔
    @property(cc.Prefab)
    private pfbRoomItemDznz: cc.Prefab = null;

    // 红黑大战
    @property(cc.Prefab)
    private pfbRoomRedVsBlackItem: cc.Prefab = null;

    // 水果机
    @property(cc.Prefab)
    private pfbRoomFruitPartyItem: cc.Prefab = null;

    // 德州牛仔
    @property(cc.SpriteFrame)
    private spfRoomItemDznz: cc.SpriteFrame = null;

    // 红黑大战
    @property(cc.SpriteFrame)
    private spfRoomRedVsBlackItem: cc.SpriteFrame = null;

    // 水果机
    @property(cc.SpriteFrame)
    private spfRoomFruitPartyItem: cc.SpriteFrame = null;

    // 红黑大战
    @property(cc.SpriteFrame)
    private spfRoomRedVsBlackItemHI: cc.SpriteFrame = null;

    // 水果机
    @property(cc.SpriteFrame)
    private spfRoomFruitPartyItemHI: cc.SpriteFrame = null;

    private m_data: com.bt.game.proto.hall.IGetRoomListRes = null;

    public static getPrefabUrl() {
        return "roomlist/prefabs/RoomListView";
    }


    protected bindingEvents() {
        super.bindingEvents();
        this.registerEvent("updateUserInfo", this.updateUserInfo);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.USER_INFORMATION), this.onUpdateUserInfo);
        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.updateRoomName);
        }
    }

    onLoad() {
        super.onLoad();
        this.initView();
        // Manager.globalAudio.playMusic(Dzpk.SOUNDS.BGM, Dzpk.globalData.bundle)
        PanelHelp.showRollNotice(this.notice, this)
        // dispatchEnterComplete({ type: LogicType.GAME, views: [this] });
    }

    show(args) {
        super.show(args);
        this.reqUserInfo()

        this.m_data = args[0];

        this.updateUserInfo();
        this.updateRoomName();
        this.updateRoomList();
        PanelHelp.hideLoading();

        // let iconConfig = HallConfig.hallIconConfig.find(iconConfig => { return iconConfig.key == "newcomerGuidance" });
        // if (iconConfig && iconConfig.value && User._gameIds.indexOf(2002) === -1) {
        //     Manager.uiManager.open({ type: RoomListGuide, bundle: this.bundle, args: [this] });
        // }
    }

    private getRoomList(): com.bt.game.proto.hall.IRoomInfo[] | com.bt.game.proto.hall.IPveRoomInfo[] | com.bt.game.proto.hall.IPvpRoomInfo[] {
        let roomList = [];
        switch (this.m_data.infoType) {
            case com.bt.game.proto.hall.RoomInfoType.Pve:
                roomList = this.m_data.pveInfos;
                break;
            case com.bt.game.proto.hall.RoomInfoType.Pvp:
                roomList = this.m_data.roomList;
                break;
        }
        roomList = this.sortRoomList(roomList);
        return roomList;
    }

    private initView(): void {
        this.labNick.string = "";
        this.labId.string = "";
        this.labChip.string = "";
    }

    private sortRoomList(roomList: com.bt.game.proto.hall.IRoomInfo[] | com.bt.game.proto.hall.IPveRoomInfo[] | com.bt.game.proto.hall.IPvpRoomInfo[]): com.bt.game.proto.hall.IRoomInfo[] | com.bt.game.proto.hall.IPveRoomInfo[] | com.bt.game.proto.hall.IPvpRoomInfo[] {
        roomList.sort((a, b) => {
            return a.areaId - b.areaId;
        })
        return roomList;
    }

    private reqUserInfo() {
        let req = protoPackage.hall.UserInformation.create({ userId: User._userID });
        let buffer = protoPackage.hall.UserInformation.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.USER_INFORMATION,
            buffer);
    }

    private onUpdateUserInfo(data) {
        if (data.statusMsg.status == 0) {
            User._gold = data.gold;
            this.updateUserInfo()
        }
    }

    private updateUserInfo() {
        this.labNick.string = UtilMgr.setString(User._userName);
        this.labId.string = "ID:" + User._userID;
        this.labChip.string = UtilMgr.changeMoney(User._gold);
    }

    private updateRoomName(): void {
        this.imgGameName.spriteFrame = this.getRoomNameSpriteFrame(this.m_data.gameId);
    }

    private updateRoomList() {
        this.scvRoomList.content.destroyAllChildren();

        if (this.m_data.infoType === com.bt.game.proto.hall.RoomInfoType.Pve) {
            this.updatePveRoomList();
        } else if (this.m_data.infoType === com.bt.game.proto.hall.RoomInfoType.Pvp) {
            this.updatePvpRoomList();
        } else {
            G.Logger.warn("房间列表类型错误");
        }
    }

    private updatePveRoomList(): void {
        let itemWidth: number = this.pfbRoomItemDznz.data.width;
        let listCount: number = this.m_data.pveInfos.length;

        this.m_data.pveInfos = this.sortRoomList(this.m_data.pveInfos);

        let contentSize: number = (2 * PADDING_WIDTH) + ((listCount - 1) * SPACE_WIDTH) + (listCount * itemWidth);
        if (contentSize > this.scvRoomList.content.width) {
            this.scvRoomList.content.width = contentSize;
            this.scvRoomList.inertia = true;
            this.scvRoomList.elastic = true;
            let startX: number = 0 + (itemWidth / 2) + PADDING_WIDTH;
            for (let i: number = 0; i < listCount; ++i) {
                let itemData: com.bt.game.proto.hall.IPveRoomInfo = this.m_data.pveInfos[i];
                let itemNode: cc.Node = this.getRoomItemNode(this.m_data.gameId);
                let itemSrc: RoomItemBase = itemNode.getComponent(itemNode.name);
                itemSrc.preloadData(this.m_data.gameId, this.m_data.infoType, itemData);

                itemNode.x = startX + ((itemWidth + SPACE_WIDTH) * i);
                itemNode.y = 0;
                this.scvRoomList.content.addChild(itemNode);
            }
        } else {
            this.scvRoomList.inertia = false;
            this.scvRoomList.elastic = false;
            let startX: number = 0;
            let offsetX: number = startX;
            let spaceWidth: number = (this.scvRoomList.node.width - (itemWidth * listCount)) / (listCount + 1);
            for (let i: number = 0; i < listCount; ++i) {
                let itemData: com.bt.game.proto.hall.IPveRoomInfo = this.m_data.pveInfos[i];
                let itemNode: cc.Node = this.getRoomItemNode(this.m_data.gameId);
                let itemSrc: RoomItemBase = itemNode.getComponent(itemNode.name);
                let itemHalfWidth: number = (itemNode.width / 2);
                offsetX += spaceWidth + itemHalfWidth;
                itemSrc.preloadData(this.m_data.gameId, this.m_data.infoType, itemData);
                itemNode.x = offsetX;
                itemNode.y = 0;
                this.scvRoomList.content.addChild(itemNode);
                offsetX += itemHalfWidth;
            }
        }

    }

    private updatePvpRoomList(): void {
        let itemWidth: number = this.pfbRoomItemDznz.data.width;
        let listCount: number = this.m_data.roomList.length;

        this.m_data.pveInfos = this.sortRoomList(this.m_data.pveInfos);

        let contentSize: number = (2 * PADDING_WIDTH) + ((listCount - 1) * SPACE_WIDTH) + itemWidth;
        if (contentSize > this.scvRoomList.content.width) {
            this.scvRoomList.content.width = contentSize;
        }

        let startX: number = 0 + (itemWidth / 2) + PADDING_WIDTH;
        for (let i: number = 0; i < this.m_data.roomList.length; ++i) {
            let itemData: com.bt.game.proto.hall.IRoomInfo = this.m_data.roomList[i];
            let itemNode: cc.Node = this.getRoomItemNode(this.m_data.gameId);
            let itemSrc: RoomItemBase = itemNode.getComponent(itemNode.name);
            itemSrc.preloadData(this.m_data.gameId, this.m_data.infoType, itemData);

            itemNode.x = startX + ((itemWidth + SPACE_WIDTH) * i);
            itemNode.y = 0;
            this.scvRoomList.content.addChild(itemNode);
        }
    }

    /**
     * 获取房间项节点
     * @param gameId {number} 游戏 ID
     */
    private getRoomItemNode(gameId: number): cc.Node {
        let node: cc.Node = null;
        switch (gameId) {
            case Config.GameId.TexaCowTable:
                node = cc.instantiate(this.pfbRoomItemDznz);
                break;
            case Config.GameId.FruitParty:
                node = cc.instantiate(this.pfbRoomFruitPartyItem);
                break;
            case Config.GameId.RedVsBlack:
                node = cc.instantiate(this.pfbRoomRedVsBlackItem);
                break;
        }
        return node;
    }

    private getRoomNameSpriteFrame(gameId: number): cc.SpriteFrame {
        let spriteFrame: cc.SpriteFrame = null;
        switch (gameId) {
            case Config.GameId.TexaCowTable:
                spriteFrame = this.spfRoomItemDznz;
                break;
            case Config.GameId.FruitParty:
                spriteFrame = Manager.language.getLanguage() == cc.sys.LANGUAGE_HINDI ? this.spfRoomFruitPartyItemHI : this.spfRoomFruitPartyItem;
                break;
            case Config.GameId.RedVsBlack:
                spriteFrame = Manager.language.getLanguage() == cc.sys.LANGUAGE_HINDI ? this.spfRoomRedVsBlackItemHI : this.spfRoomRedVsBlackItem;
                break;
        }
        return spriteFrame;
    }

    private onClickGoBack(): void {
        this.close();
        super.playDefaultEffect("close");
    }

    private onClickCopy(): void {
        window['platformUtil'].copyToClip(this.labId.string);
        super.playDefaultEffect();
    }

    private onClickShop(): void {
        dispatch("openRechargeView");
        super.playDefaultEffect();
    }

    private onClickSetting(): void {
        dispatch("openSetting");
        super.playDefaultEffect();
    }
}
