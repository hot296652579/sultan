
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/roomlist/RoomListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcm9vbWxpc3QvUm9vbUxpc3RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWlEO0FBR2pELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsa0VBQTJFO0FBQzNFLHlEQUFtRDtBQUNuRCxvRUFBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFJNUMsc0RBQWlEO0FBQ2pELHVEQUFtRTtBQUNuRSwwREFBdUQ7QUFFdkQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUVsRCxTQUFTO0FBQ1QsTUFBTSxhQUFhLEdBQVcsRUFBRSxDQUFDO0FBQ2pDLFNBQVM7QUFDVCxNQUFNLFdBQVcsR0FBVyxFQUFFLENBQUM7QUFJL0IsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsZ0JBQU07SUFBaEQ7O1FBSVksWUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixVQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUd4QixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFHakMsZ0JBQVcsR0FBYyxJQUFJLENBQUM7UUFFdEMsT0FBTztRQUVDLG9CQUFlLEdBQWMsSUFBSSxDQUFDO1FBRTFDLE9BQU87UUFFQywwQkFBcUIsR0FBYyxJQUFJLENBQUM7UUFFaEQsTUFBTTtRQUVFLDBCQUFxQixHQUFjLElBQUksQ0FBQztRQUVoRCxPQUFPO1FBRUMsb0JBQWUsR0FBbUIsSUFBSSxDQUFDO1FBRS9DLE9BQU87UUFFQywwQkFBcUIsR0FBbUIsSUFBSSxDQUFDO1FBRXJELE1BQU07UUFFRSwwQkFBcUIsR0FBbUIsSUFBSSxDQUFDO1FBRXJELE9BQU87UUFFQyw0QkFBdUIsR0FBbUIsSUFBSSxDQUFD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UUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ3NCO0FBSTFDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQzRCO0FBSWhEO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQzRCO0FBSWhEO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7cURBQ3NCO0FBSS9DO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkRBQzRCO0FBSXJEO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkRBQzRCO0FBSXJEO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NkRBQzhCO0FBSXZEO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NkRBQzhCO0FBbkR0QyxZQUFZO0lBRmhDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLFlBQVksQ0F5UmhDO2tCQXpSb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgZGlzcGF0Y2hFbnRlckNvbXBsZXRlLCBMb2dpY0V2ZW50LCBMb2dpY1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCBSb29tSXRlbUJhc2UgZnJvbSBcIi4vUm9vbUl0ZW1CYXNlXCI7XG5pbXBvcnQgUm9vbUxpc3RHdWlkZSBmcm9tIFwiLi9Sb29tTGlzdEd1aWRlXCI7XG5pbXBvcnQgeyBIYWxsQ29uZmlnIH0gZnJvbSBcIi4uL2hhbGwvSGFsbE5ldENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL0ZyYW1ld29ya1wiO1xuaW1wb3J0IHsgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLy8g5bem5Y+z5Lik6L656Ze06ZqUXG5jb25zdCBQQURESU5HX1dJRFRIOiBudW1iZXIgPSAzMDtcbi8vIOavj+S4quS5i+mXtOmXtOmalFxuY29uc3QgU1BBQ0VfV0lEVEg6IG51bWJlciA9IDIwO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbUxpc3RWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJOaWNrOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJJZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ2hpcDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub3RpY2U6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXG4gICAgcHVibGljIHNjdlJvb21MaXN0OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdHYW1lTmFtZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIC8vIOW+t+W3nueJm+S7lFxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcHJpdmF0ZSBwZmJSb29tSXRlbUR6bno6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICAvLyDnuqLpu5HlpKfmiJhcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHByaXZhdGUgcGZiUm9vbVJlZFZzQmxhY2tJdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgLy8g5rC05p6c5py6XG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwcml2YXRlIHBmYlJvb21GcnVpdFBhcnR5SXRlbTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIC8vIOW+t+W3nueJm+S7lFxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBwcml2YXRlIHNwZlJvb21JdGVtRHpuejogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgLy8g57qi6buR5aSn5oiYXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHByaXZhdGUgc3BmUm9vbVJlZFZzQmxhY2tJdGVtOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICAvLyDmsLTmnpzmnLpcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgcHJpdmF0ZSBzcGZSb29tRnJ1aXRQYXJ0eUl0ZW06IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIC8vIOe6oum7keWkp+aImFxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBwcml2YXRlIHNwZlJvb21SZWRWc0JsYWNrSXRlbUhJOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICAvLyDmsLTmnpzmnLpcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgcHJpdmF0ZSBzcGZSb29tRnJ1aXRQYXJ0eUl0ZW1ISTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtX2RhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUdldFJvb21MaXN0UmVzID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJyb29tbGlzdC9wcmVmYWJzL1Jvb21MaXN0Vmlld1wiO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwidXBkYXRlVXNlckluZm9cIiwgdGhpcy51cGRhdGVVc2VySW5mbyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuVVNFUl9JTkZPUk1BVElPTiksIHRoaXMub25VcGRhdGVVc2VySW5mbyk7XG4gICAgICAgIGlmIChFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuQ0hBTkdFX0xBTkdVQUdFLCB0aGlzLnVwZGF0ZVJvb21OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICAgICAgLy8gTWFuYWdlci5nbG9iYWxBdWRpby5wbGF5TXVzaWMoRHpway5TT1VORFMuQkdNLCBEenBrLmdsb2JhbERhdGEuYnVuZGxlKVxuICAgICAgICBQYW5lbEhlbHAuc2hvd1JvbGxOb3RpY2UodGhpcy5ub3RpY2UsIHRoaXMpXG4gICAgICAgIC8vIGRpc3BhdGNoRW50ZXJDb21wbGV0ZSh7IHR5cGU6IExvZ2ljVHlwZS5HQU1FLCB2aWV3czogW3RoaXNdIH0pO1xuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLnJlcVVzZXJJbmZvKClcblxuICAgICAgICB0aGlzLm1fZGF0YSA9IGFyZ3NbMF07XG5cbiAgICAgICAgdGhpcy51cGRhdGVVc2VySW5mbygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVJvb21OYW1lKCk7XG4gICAgICAgIHRoaXMudXBkYXRlUm9vbUxpc3QoKTtcbiAgICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKCk7XG5cbiAgICAgICAgLy8gbGV0IGljb25Db25maWcgPSBIYWxsQ29uZmlnLmhhbGxJY29uQ29uZmlnLmZpbmQoaWNvbkNvbmZpZyA9PiB7IHJldHVybiBpY29uQ29uZmlnLmtleSA9PSBcIm5ld2NvbWVyR3VpZGFuY2VcIiB9KTtcbiAgICAgICAgLy8gaWYgKGljb25Db25maWcgJiYgaWNvbkNvbmZpZy52YWx1ZSAmJiBVc2VyLl9nYW1lSWRzLmluZGV4T2YoMjAwMikgPT09IC0xKSB7XG4gICAgICAgIC8vICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogUm9vbUxpc3RHdWlkZSwgYnVuZGxlOiB0aGlzLmJ1bmRsZSwgYXJnczogW3RoaXNdIH0pO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSb29tTGlzdCgpOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklSb29tSW5mb1tdIHwgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUHZlUm9vbUluZm9bXSB8IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVB2cFJvb21JbmZvW10ge1xuICAgICAgICBsZXQgcm9vbUxpc3QgPSBbXTtcbiAgICAgICAgc3dpdGNoICh0aGlzLm1fZGF0YS5pbmZvVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBjb20uYnQuZ2FtZS5wcm90by5oYWxsLlJvb21JbmZvVHlwZS5QdmU6XG4gICAgICAgICAgICAgICAgcm9vbUxpc3QgPSB0aGlzLm1fZGF0YS5wdmVJbmZvcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5Sb29tSW5mb1R5cGUuUHZwOlxuICAgICAgICAgICAgICAgIHJvb21MaXN0ID0gdGhpcy5tX2RhdGEucm9vbUxpc3Q7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcm9vbUxpc3QgPSB0aGlzLnNvcnRSb29tTGlzdChyb29tTGlzdCk7XG4gICAgICAgIHJldHVybiByb29tTGlzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYk5pY2suc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJJZC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkNoaXAuc3RyaW5nID0gXCJcIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRSb29tTGlzdChyb29tTGlzdDogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUm9vbUluZm9bXSB8IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVB2ZVJvb21JbmZvW10gfCBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQdnBSb29tSW5mb1tdKTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUm9vbUluZm9bXSB8IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVB2ZVJvb21JbmZvW10gfCBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQdnBSb29tSW5mb1tdIHtcbiAgICAgICAgcm9vbUxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEuYXJlYUlkIC0gYi5hcmVhSWQ7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByb29tTGlzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcVVzZXJJbmZvKCkge1xuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuVXNlckluZm9ybWF0aW9uLmNyZWF0ZSh7IHVzZXJJZDogVXNlci5fdXNlcklEIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuVXNlckluZm9ybWF0aW9uLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VU0VSX0lORk9STUFUSU9OLFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVXBkYXRlVXNlckluZm8oZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIFVzZXIuX2dvbGQgPSBkYXRhLmdvbGQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJJbmZvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVXNlckluZm8oKSB7XG4gICAgICAgIHRoaXMubGFiTmljay5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZyhVc2VyLl91c2VyTmFtZSk7XG4gICAgICAgIHRoaXMubGFiSWQuc3RyaW5nID0gXCJJRDpcIiArIFVzZXIuX3VzZXJJRDtcbiAgICAgICAgdGhpcy5sYWJDaGlwLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoVXNlci5fZ29sZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVSb29tTmFtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWdHYW1lTmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuZ2V0Um9vbU5hbWVTcHJpdGVGcmFtZSh0aGlzLm1fZGF0YS5nYW1lSWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUm9vbUxpc3QoKSB7XG4gICAgICAgIHRoaXMuc2N2Um9vbUxpc3QuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcblxuICAgICAgICBpZiAodGhpcy5tX2RhdGEuaW5mb1R5cGUgPT09IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuUm9vbUluZm9UeXBlLlB2ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQdmVSb29tTGlzdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubV9kYXRhLmluZm9UeXBlID09PSBjb20uYnQuZ2FtZS5wcm90by5oYWxsLlJvb21JbmZvVHlwZS5QdnApIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHZwUm9vbUxpc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLndhcm4oXCLmiL/pl7TliJfooajnsbvlnovplJnor69cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVB2ZVJvb21MaXN0KCk6IHZvaWQge1xuICAgICAgICBsZXQgaXRlbVdpZHRoOiBudW1iZXIgPSB0aGlzLnBmYlJvb21JdGVtRHpuei5kYXRhLndpZHRoO1xuICAgICAgICBsZXQgbGlzdENvdW50OiBudW1iZXIgPSB0aGlzLm1fZGF0YS5wdmVJbmZvcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5tX2RhdGEucHZlSW5mb3MgPSB0aGlzLnNvcnRSb29tTGlzdCh0aGlzLm1fZGF0YS5wdmVJbmZvcyk7XG5cbiAgICAgICAgbGV0IGNvbnRlbnRTaXplOiBudW1iZXIgPSAoMiAqIFBBRERJTkdfV0lEVEgpICsgKChsaXN0Q291bnQgLSAxKSAqIFNQQUNFX1dJRFRIKSArIChsaXN0Q291bnQgKiBpdGVtV2lkdGgpO1xuICAgICAgICBpZiAoY29udGVudFNpemUgPiB0aGlzLnNjdlJvb21MaXN0LmNvbnRlbnQud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2N2Um9vbUxpc3QuY29udGVudC53aWR0aCA9IGNvbnRlbnRTaXplO1xuICAgICAgICAgICAgdGhpcy5zY3ZSb29tTGlzdC5pbmVydGlhID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2N2Um9vbUxpc3QuZWxhc3RpYyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc3RhcnRYOiBudW1iZXIgPSAwICsgKGl0ZW1XaWR0aCAvIDIpICsgUEFERElOR19XSURUSDtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBsaXN0Q291bnQ7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtRGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUHZlUm9vbUluZm8gPSB0aGlzLm1fZGF0YS5wdmVJbmZvc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGU6IGNjLk5vZGUgPSB0aGlzLmdldFJvb21JdGVtTm9kZSh0aGlzLm1fZGF0YS5nYW1lSWQpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtU3JjOiBSb29tSXRlbUJhc2UgPSBpdGVtTm9kZS5nZXRDb21wb25lbnQoaXRlbU5vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgaXRlbVNyYy5wcmVsb2FkRGF0YSh0aGlzLm1fZGF0YS5nYW1lSWQsIHRoaXMubV9kYXRhLmluZm9UeXBlLCBpdGVtRGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpdGVtTm9kZS54ID0gc3RhcnRYICsgKChpdGVtV2lkdGggKyBTUEFDRV9XSURUSCkgKiBpKTtcbiAgICAgICAgICAgICAgICBpdGVtTm9kZS55ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjdlJvb21MaXN0LmNvbnRlbnQuYWRkQ2hpbGQoaXRlbU5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY3ZSb29tTGlzdC5pbmVydGlhID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjdlJvb21MaXN0LmVsYXN0aWMgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBzdGFydFg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0WDogbnVtYmVyID0gc3RhcnRYO1xuICAgICAgICAgICAgbGV0IHNwYWNlV2lkdGg6IG51bWJlciA9ICh0aGlzLnNjdlJvb21MaXN0Lm5vZGUud2lkdGggLSAoaXRlbVdpZHRoICogbGlzdENvdW50KSkgLyAobGlzdENvdW50ICsgMSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGlzdENvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVB2ZVJvb21JbmZvID0gdGhpcy5tX2RhdGEucHZlSW5mb3NbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5nZXRSb29tSXRlbU5vZGUodGhpcy5tX2RhdGEuZ2FtZUlkKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbVNyYzogUm9vbUl0ZW1CYXNlID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGl0ZW1Ob2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSGFsZldpZHRoOiBudW1iZXIgPSAoaXRlbU5vZGUud2lkdGggLyAyKTtcbiAgICAgICAgICAgICAgICBvZmZzZXRYICs9IHNwYWNlV2lkdGggKyBpdGVtSGFsZldpZHRoO1xuICAgICAgICAgICAgICAgIGl0ZW1TcmMucHJlbG9hZERhdGEodGhpcy5tX2RhdGEuZ2FtZUlkLCB0aGlzLm1fZGF0YS5pbmZvVHlwZSwgaXRlbURhdGEpO1xuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLnggPSBvZmZzZXRYO1xuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLnkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2N2Um9vbUxpc3QuY29udGVudC5hZGRDaGlsZChpdGVtTm9kZSk7XG4gICAgICAgICAgICAgICAgb2Zmc2V0WCArPSBpdGVtSGFsZldpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVB2cFJvb21MaXN0KCk6IHZvaWQge1xuICAgICAgICBsZXQgaXRlbVdpZHRoOiBudW1iZXIgPSB0aGlzLnBmYlJvb21JdGVtRHpuei5kYXRhLndpZHRoO1xuICAgICAgICBsZXQgbGlzdENvdW50OiBudW1iZXIgPSB0aGlzLm1fZGF0YS5yb29tTGlzdC5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5tX2RhdGEucHZlSW5mb3MgPSB0aGlzLnNvcnRSb29tTGlzdCh0aGlzLm1fZGF0YS5wdmVJbmZvcyk7XG5cbiAgICAgICAgbGV0IGNvbnRlbnRTaXplOiBudW1iZXIgPSAoMiAqIFBBRERJTkdfV0lEVEgpICsgKChsaXN0Q291bnQgLSAxKSAqIFNQQUNFX1dJRFRIKSArIGl0ZW1XaWR0aDtcbiAgICAgICAgaWYgKGNvbnRlbnRTaXplID4gdGhpcy5zY3ZSb29tTGlzdC5jb250ZW50LndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnNjdlJvb21MaXN0LmNvbnRlbnQud2lkdGggPSBjb250ZW50U2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGFydFg6IG51bWJlciA9IDAgKyAoaXRlbVdpZHRoIC8gMikgKyBQQURESU5HX1dJRFRIO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5tX2RhdGEucm9vbUxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBpdGVtRGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUm9vbUluZm8gPSB0aGlzLm1fZGF0YS5yb29tTGlzdFtpXTtcbiAgICAgICAgICAgIGxldCBpdGVtTm9kZTogY2MuTm9kZSA9IHRoaXMuZ2V0Um9vbUl0ZW1Ob2RlKHRoaXMubV9kYXRhLmdhbWVJZCk7XG4gICAgICAgICAgICBsZXQgaXRlbVNyYzogUm9vbUl0ZW1CYXNlID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KGl0ZW1Ob2RlLm5hbWUpO1xuICAgICAgICAgICAgaXRlbVNyYy5wcmVsb2FkRGF0YSh0aGlzLm1fZGF0YS5nYW1lSWQsIHRoaXMubV9kYXRhLmluZm9UeXBlLCBpdGVtRGF0YSk7XG5cbiAgICAgICAgICAgIGl0ZW1Ob2RlLnggPSBzdGFydFggKyAoKGl0ZW1XaWR0aCArIFNQQUNFX1dJRFRIKSAqIGkpO1xuICAgICAgICAgICAgaXRlbU5vZGUueSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjdlJvb21MaXN0LmNvbnRlbnQuYWRkQ2hpbGQoaXRlbU5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5oi/6Ze06aG56IqC54K5XG4gICAgICogQHBhcmFtIGdhbWVJZCB7bnVtYmVyfSDmuLjmiI8gSURcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJvb21JdGVtTm9kZShnYW1lSWQ6IG51bWJlcik6IGNjLk5vZGUge1xuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAoZ2FtZUlkKSB7XG4gICAgICAgICAgICBjYXNlIENvbmZpZy5HYW1lSWQuVGV4YUNvd1RhYmxlOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBmYlJvb21JdGVtRHpueik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbmZpZy5HYW1lSWQuRnJ1aXRQYXJ0eTpcbiAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZmJSb29tRnJ1aXRQYXJ0eUl0ZW0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb25maWcuR2FtZUlkLlJlZFZzQmxhY2s6XG4gICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGZiUm9vbVJlZFZzQmxhY2tJdGVtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJvb21OYW1lU3ByaXRlRnJhbWUoZ2FtZUlkOiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGxldCBzcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGdhbWVJZCkge1xuICAgICAgICAgICAgY2FzZSBDb25maWcuR2FtZUlkLlRleGFDb3dUYWJsZTpcbiAgICAgICAgICAgICAgICBzcHJpdGVGcmFtZSA9IHRoaXMuc3BmUm9vbUl0ZW1Eem56O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb25maWcuR2FtZUlkLkZydWl0UGFydHk6XG4gICAgICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSBNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJID8gdGhpcy5zcGZSb29tRnJ1aXRQYXJ0eUl0ZW1ISSA6IHRoaXMuc3BmUm9vbUZydWl0UGFydHlJdGVtO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb25maWcuR2FtZUlkLlJlZFZzQmxhY2s6XG4gICAgICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSBNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJID8gdGhpcy5zcGZSb29tUmVkVnNCbGFja0l0ZW1ISSA6IHRoaXMuc3BmUm9vbVJlZFZzQmxhY2tJdGVtO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcHJpdGVGcmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tHb0JhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgc3VwZXIucGxheURlZmF1bHRFZmZlY3QoXCJjbG9zZVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tDb3B5KCk6IHZvaWQge1xuICAgICAgICB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmNvcHlUb0NsaXAodGhpcy5sYWJJZC5zdHJpbmcpO1xuICAgICAgICBzdXBlci5wbGF5RGVmYXVsdEVmZmVjdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja1Nob3AoKTogdm9pZCB7XG4gICAgICAgIGRpc3BhdGNoKFwib3BlblJlY2hhcmdlVmlld1wiKTtcbiAgICAgICAgc3VwZXIucGxheURlZmF1bHRFZmZlY3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tTZXR0aW5nKCk6IHZvaWQge1xuICAgICAgICBkaXNwYXRjaChcIm9wZW5TZXR0aW5nXCIpO1xuICAgICAgICBzdXBlci5wbGF5RGVmYXVsdEVmZmVjdCgpO1xuICAgIH1cbn1cbiJdfQ==