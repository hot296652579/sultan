"use strict";
cc._RF.push(module, '3855bRNSeZNYZWtRx/he/Pv', 'RoomListView');
// script/roomlist/RoomListView.ts

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
const Config_1 = require("../common/config/Config");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const Framework_1 = require("../framework/Framework");
const Defines_1 = require("../framework/base/Defines");
const EventApi_1 = require("../framework/event/EventApi");
const { ccclass, property, menu } = cc._decorator;
// 左右两边间隔
const PADDING_WIDTH = 30;
// 每个之间间隔
const SPACE_WIDTH = 20;
let RoomListView = class RoomListView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labNick = null;
        this.labId = null;
        this.labChip = null;
        this.notice = null;
        this.scvRoomList = null;
        this.imgGameName = null;
        // 德州牛仔
        this.pfbRoomItemDznz = null;
        // 红黑大战
        this.pfbRoomRedVsBlackItem = null;
        // 水果机
        this.pfbRoomFruitPartyItem = null;
        // 德州牛仔
        this.spfRoomItemDznz = null;
        // 红黑大战
        this.spfRoomRedVsBlackItem = null;
        // 水果机
        this.spfRoomFruitPartyItem = null;
        // 红黑大战
        this.spfRoomRedVsBlackItemHI = null;
        // 水果机
        this.spfRoomFruitPartyItemHI = null;
        this.m_data = null;
    }
    static getPrefabUrl() {
        return "roomlist/prefabs/RoomListView";
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("updateUserInfo", this.updateUserInfo);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.USER_INFORMATION), this.onUpdateUserInfo);
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.updateRoomName);
        }
    }
    onLoad() {
        super.onLoad();
        this.initView();
        // Manager.globalAudio.playMusic(Dzpk.SOUNDS.BGM, Dzpk.globalData.bundle)
        PanelHelp_1.default.showRollNotice(this.notice, this);
        // dispatchEnterComplete({ type: LogicType.GAME, views: [this] });
    }
    show(args) {
        super.show(args);
        this.reqUserInfo();
        this.m_data = args[0];
        this.updateUserInfo();
        this.updateRoomName();
        this.updateRoomList();
        PanelHelp_1.default.hideLoading();
        // let iconConfig = HallConfig.hallIconConfig.find(iconConfig => { return iconConfig.key == "newcomerGuidance" });
        // if (iconConfig && iconConfig.value && User._gameIds.indexOf(2002) === -1) {
        //     Manager.uiManager.open({ type: RoomListGuide, bundle: this.bundle, args: [this] });
        // }
    }
    getRoomList() {
        let roomList = [];
        switch (this.m_data.infoType) {
            case protoc_1.com.bt.game.proto.hall.RoomInfoType.Pve:
                roomList = this.m_data.pveInfos;
                break;
            case protoc_1.com.bt.game.proto.hall.RoomInfoType.Pvp:
                roomList = this.m_data.roomList;
                break;
        }
        roomList = this.sortRoomList(roomList);
        return roomList;
    }
    initView() {
        this.labNick.string = "";
        this.labId.string = "";
        this.labChip.string = "";
    }
    sortRoomList(roomList) {
        roomList.sort((a, b) => {
            return a.areaId - b.areaId;
        });
        return roomList;
    }
    reqUserInfo() {
        let req = CommonService_1.protoPackage.hall.UserInformation.create({ userId: User_1.User._userID });
        let buffer = CommonService_1.protoPackage.hall.UserInformation.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.USER_INFORMATION, buffer);
    }
    onUpdateUserInfo(data) {
        if (data.statusMsg.status == 0) {
            User_1.User._gold = data.gold;
            this.updateUserInfo();
        }
    }
    updateUserInfo() {
        this.labNick.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        this.labId.string = "ID:" + User_1.User._userID;
        this.labChip.string = UtilMgr_1.UtilMgr.changeMoney(User_1.User._gold);
    }
    updateRoomName() {
        this.imgGameName.spriteFrame = this.getRoomNameSpriteFrame(this.m_data.gameId);
    }
    updateRoomList() {
        this.scvRoomList.content.destroyAllChildren();
        if (this.m_data.infoType === protoc_1.com.bt.game.proto.hall.RoomInfoType.Pve) {
            this.updatePveRoomList();
        }
        else if (this.m_data.infoType === protoc_1.com.bt.game.proto.hall.RoomInfoType.Pvp) {
            this.updatePvpRoomList();
        }
        else {
            G.Logger.warn("房间列表类型错误");
        }
    }
    updatePveRoomList() {
        let itemWidth = this.pfbRoomItemDznz.data.width;
        let listCount = this.m_data.pveInfos.length;
        this.m_data.pveInfos = this.sortRoomList(this.m_data.pveInfos);
        let contentSize = (2 * PADDING_WIDTH) + ((listCount - 1) * SPACE_WIDTH) + (listCount * itemWidth);
        if (contentSize > this.scvRoomList.content.width) {
            this.scvRoomList.content.width = contentSize;
            this.scvRoomList.inertia = true;
            this.scvRoomList.elastic = true;
            let startX = 0 + (itemWidth / 2) + PADDING_WIDTH;
            for (let i = 0; i < listCount; ++i) {
                let itemData = this.m_data.pveInfos[i];
                let itemNode = this.getRoomItemNode(this.m_data.gameId);
                let itemSrc = itemNode.getComponent(itemNode.name);
                itemSrc.preloadData(this.m_data.gameId, this.m_data.infoType, itemData);
                itemNode.x = startX + ((itemWidth + SPACE_WIDTH) * i);
                itemNode.y = 0;
                this.scvRoomList.content.addChild(itemNode);
            }
        }
        else {
            this.scvRoomList.inertia = false;
            this.scvRoomList.elastic = false;
            let startX = 0;
            let offsetX = startX;
            let spaceWidth = (this.scvRoomList.node.width - (itemWidth * listCount)) / (listCount + 1);
            for (let i = 0; i < listCount; ++i) {
                let itemData = this.m_data.pveInfos[i];
                let itemNode = this.getRoomItemNode(this.m_data.gameId);
                let itemSrc = itemNode.getComponent(itemNode.name);
                let itemHalfWidth = (itemNode.width / 2);
                offsetX += spaceWidth + itemHalfWidth;
                itemSrc.preloadData(this.m_data.gameId, this.m_data.infoType, itemData);
                itemNode.x = offsetX;
                itemNode.y = 0;
                this.scvRoomList.content.addChild(itemNode);
                offsetX += itemHalfWidth;
            }
        }
    }
    updatePvpRoomList() {
        let itemWidth = this.pfbRoomItemDznz.data.width;
        let listCount = this.m_data.roomList.length;
        this.m_data.pveInfos = this.sortRoomList(this.m_data.pveInfos);
        let contentSize = (2 * PADDING_WIDTH) + ((listCount - 1) * SPACE_WIDTH) + itemWidth;
        if (contentSize > this.scvRoomList.content.width) {
            this.scvRoomList.content.width = contentSize;
        }
        let startX = 0 + (itemWidth / 2) + PADDING_WIDTH;
        for (let i = 0; i < this.m_data.roomList.length; ++i) {
            let itemData = this.m_data.roomList[i];
            let itemNode = this.getRoomItemNode(this.m_data.gameId);
            let itemSrc = itemNode.getComponent(itemNode.name);
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
    getRoomItemNode(gameId) {
        let node = null;
        switch (gameId) {
            case Config_1.Config.GameId.TexaCowTable:
                node = cc.instantiate(this.pfbRoomItemDznz);
                break;
            case Config_1.Config.GameId.FruitParty:
                node = cc.instantiate(this.pfbRoomFruitPartyItem);
                break;
            case Config_1.Config.GameId.RedVsBlack:
                node = cc.instantiate(this.pfbRoomRedVsBlackItem);
                break;
        }
        return node;
    }
    getRoomNameSpriteFrame(gameId) {
        let spriteFrame = null;
        switch (gameId) {
            case Config_1.Config.GameId.TexaCowTable:
                spriteFrame = this.spfRoomItemDznz;
                break;
            case Config_1.Config.GameId.FruitParty:
                spriteFrame = Framework_1.Manager.language.getLanguage() == cc.sys.LANGUAGE_HINDI ? this.spfRoomFruitPartyItemHI : this.spfRoomFruitPartyItem;
                break;
            case Config_1.Config.GameId.RedVsBlack:
                spriteFrame = Framework_1.Manager.language.getLanguage() == cc.sys.LANGUAGE_HINDI ? this.spfRoomRedVsBlackItemHI : this.spfRoomRedVsBlackItem;
                break;
        }
        return spriteFrame;
    }
    onClickGoBack() {
        this.close();
        super.playDefaultEffect("close");
    }
    onClickCopy() {
        window['platformUtil'].copyToClip(this.labId.string);
        super.playDefaultEffect();
    }
    onClickShop() {
        dispatch("openRechargeView");
        super.playDefaultEffect();
    }
    onClickSetting() {
        dispatch("openSetting");
        super.playDefaultEffect();
    }
};
__decorate([
    property(cc.Label)
], RoomListView.prototype, "labNick", void 0);
__decorate([
    property(cc.Label)
], RoomListView.prototype, "labId", void 0);
__decorate([
    property(cc.Label)
], RoomListView.prototype, "labChip", void 0);
__decorate([
    property(cc.Node)
], RoomListView.prototype, "notice", void 0);
__decorate([
    property(cc.ScrollView)
], RoomListView.prototype, "scvRoomList", void 0);
__decorate([
    property(cc.Sprite)
], RoomListView.prototype, "imgGameName", void 0);
__decorate([
    property(cc.Prefab)
], RoomListView.prototype, "pfbRoomItemDznz", void 0);
__decorate([
    property(cc.Prefab)
], RoomListView.prototype, "pfbRoomRedVsBlackItem", void 0);
__decorate([
    property(cc.Prefab)
], RoomListView.prototype, "pfbRoomFruitPartyItem", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomListView.prototype, "spfRoomItemDznz", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomListView.prototype, "spfRoomRedVsBlackItem", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomListView.prototype, "spfRoomFruitPartyItem", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomListView.prototype, "spfRoomRedVsBlackItemHI", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomListView.prototype, "spfRoomFruitPartyItemHI", void 0);
RoomListView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RoomListView);
exports.default = RoomListView;

cc._RF.pop();