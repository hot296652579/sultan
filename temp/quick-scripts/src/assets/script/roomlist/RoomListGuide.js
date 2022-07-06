"use strict";
cc._RF.push(module, '9bcf5NS6TRNH6XRavRWvEqC', 'RoomListGuide');
// script/roomlist/RoomListGuide.ts

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
const User_1 = require("../global/User");
const CommonService_1 = require("../common/net/CommonService");
const Decorators_1 = require("../framework/decorator/Decorators");
const LobbyService_1 = require("../common/net/LobbyService");
const Config_1 = require("../common/config/Config");
const RoomTexaCowTableItem_1 = __importDefault(require("./RoomTexaCowTableItem"));
const RoomFruitPartyItem_1 = __importDefault(require("./RoomFruitPartyItem"));
const RoomRedVsBlackItem_1 = __importDefault(require("./RoomRedVsBlackItem"));
const { ccclass, property } = cc._decorator;
let RoomListGuide = class RoomListGuide extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.m_data = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "roomlist/prefabs/RoomListGuide";
    }
    onLoad() {
        super.onLoad();
        this.room = this.node.getChildByName("room");
        this.room.active = false;
    }
    show(args) {
        super.show(args);
        if (args[0] && cc.js.getClassName(args[0]) == "RoomListView") {
            this.roomListView = args[0];
            this.step = 0;
            this.setStep();
        }
        this.m_data = args[1];
    }
    start() {
    }
    setStep() {
        this.step++;
        let wp;
        switch (this.step) {
            case 1:
                this.room.active = true;
                if (this.roomListView.scvRoomList.content.children.length > 0) {
                    wp = this.roomListView.scvRoomList.content.children[0].convertToWorldSpaceAR(cc.v2(0, 0));
                }
                this.room.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                this.room.getChildByName("mask").setPosition(this.node.convertToNodeSpaceAR(wp));
                this.room.getChildByName("mask").setContentSize(cc.size(354, 372));
                this.room.getChildByName("jiantou").active = true;
                this.room.getChildByName("jiantou").x = this.room.getChildByName("mask").x;
                this.room.getChildByName("jiantou").y = this.room.getChildByName("mask").y + this.room.getChildByName("mask").height / 2 + 50;
                break;
            case 2:
                this.toGame();
                this.reqGuide();
                this.close();
                break;
            default:
                break;
        }
    }
    onClick(name, node) {
        switch (name) {
            case 'skip':
                this.node.active = false;
                this.reqGuide();
                break;
            default:
                this.setStep();
                break;
        }
    }
    toGame() {
        let itemComponent;
        switch (this.m_data.gameId) {
            case Config_1.Config.GameId.TexaCowTable:
                this.roomListView.scvRoomList.content.children[0].getComponent(RoomTexaCowTableItem_1.default);
                break;
            case Config_1.Config.GameId.FruitParty:
                this.roomListView.scvRoomList.content.children[0].getComponent(RoomFruitPartyItem_1.default);
                break;
            case Config_1.Config.GameId.RedVsBlack:
                this.roomListView.scvRoomList.content.children[0].getComponent(RoomRedVsBlackItem_1.default);
                break;
        }
        itemComponent.onClickEnter();
    }
    reqGuide() {
        G.Logger.log(User_1.User._gameIds);
        if (User_1.User._gameIds.indexOf(2002) === -1) {
            let req = CommonService_1.protoPackage.hall.ReqInsertNewPlayerGuid.create({ gameId: 2002 });
            let buffer = CommonService_1.protoPackage.hall.ReqInsertNewPlayerGuid.encode(req).finish();
            this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_ReqInsertNewPlayerGuid, buffer);
        }
    }
};
RoomListGuide = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RoomListGuide);
exports.default = RoomListGuide;

cc._RF.pop();