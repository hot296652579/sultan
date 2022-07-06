
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/roomlist/RoomListGuide.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcm9vbWxpc3QvUm9vbUxpc3RHdWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUM1Qyx5Q0FBc0M7QUFDdEMsK0RBQXVFO0FBQ3ZFLGtFQUFrRTtBQUNsRSw2REFBMEQ7QUFHMUQsb0RBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCw4RUFBc0Q7QUFDdEQsOEVBQXNEO0FBR3RELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixhQUFhLEdBQWxDLE1BQXFCLGFBQWMsU0FBUSxnQkFBTTtJQUFqRDs7UUFPWSxXQUFNLEdBQTJDLElBQUksQ0FBQztRQTJGOUQsaUJBQWlCO0lBQ3JCLENBQUM7SUExRlUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxnQ0FBZ0MsQ0FBQztJQUM1QyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQzVCLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBSTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBYyxFQUFFO1lBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFB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R2pDO2tCQW5Hb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCBSb29tTGlzdFZpZXcgZnJvbSBcIi4vUm9vbUxpc3RWaWV3XCI7XG5pbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgUm9vbVRleGFDb3dUYWJsZUl0ZW0gZnJvbSBcIi4vUm9vbVRleGFDb3dUYWJsZUl0ZW1cIjtcbmltcG9ydCBSb29tRnJ1aXRQYXJ0eUl0ZW0gZnJvbSBcIi4vUm9vbUZydWl0UGFydHlJdGVtXCI7XG5pbXBvcnQgUm9vbVJlZFZzQmxhY2tJdGVtIGZyb20gXCIuL1Jvb21SZWRWc0JsYWNrSXRlbVwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tTGlzdEd1aWRlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICByb29tOiBjYy5Ob2RlO1xuICAgIHN0ZXA6IG51bWJlcjtcbiAgICByb29tTGlzdFZpZXc6IFJvb21MaXN0VmlldztcblxuICAgIHByaXZhdGUgbV9kYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklHZXRSb29tTGlzdFJlcyA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwicm9vbWxpc3QvcHJlZmFicy9Sb29tTGlzdEd1aWRlXCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKVxuICAgICAgICB0aGlzLnJvb20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyb29tXCIpXG4gICAgICAgIHRoaXMucm9vbS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgaWYgKGFyZ3NbMF0gJiYgY2MuanMuZ2V0Q2xhc3NOYW1lKGFyZ3NbMF0pID09IFwiUm9vbUxpc3RWaWV3XCIpIHtcbiAgICAgICAgICAgIHRoaXMucm9vbUxpc3RWaWV3ID0gYXJnc1swXVxuICAgICAgICAgICAgdGhpcy5zdGVwID0gMFxuICAgICAgICAgICAgdGhpcy5zZXRTdGVwKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fZGF0YSA9IGFyZ3NbMV07XG4gICAgICBcbiAgICB9XG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0ZXAoKSB7XG4gICAgICAgIHRoaXMuc3RlcCsrXG4gICAgICAgIGxldCB3cFxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbUxpc3RWaWV3LnNjdlJvb21MaXN0LmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdwID0gdGhpcy5yb29tTGlzdFZpZXcuc2N2Um9vbUxpc3QuY29udGVudC5jaGlsZHJlblswXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5nZXRDaGlsZEJ5TmFtZShcIm1hc2tcIikuZ2V0Q29tcG9uZW50KGNjLk1hc2spLnR5cGUgPSBjYy5NYXNrLlR5cGUuUkVDVDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20uZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpLnNldFBvc2l0aW9uKHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3cCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5nZXRDaGlsZEJ5TmFtZShcIm1hc2tcIikuc2V0Q29udGVudFNpemUoY2Muc2l6ZSgzNTQsIDM3MikpXG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLmdldENoaWxkQnlOYW1lKFwiamlhbnRvdVwiKS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLmdldENoaWxkQnlOYW1lKFwiamlhbnRvdVwiKS54ID0gdGhpcy5yb29tLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS54XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLmdldENoaWxkQnlOYW1lKFwiamlhbnRvdVwiKS55ID0gdGhpcy5yb29tLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS55ICsgdGhpcy5yb29tLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS5oZWlnaHQgLyAyICsgNTBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMudG9HYW1lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXFHdWlkZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdza2lwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXFHdWlkZSgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RlcCgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHRvR2FtZSgpe1xuICAgICAgICBsZXQgaXRlbUNvbXBvbmVudDtcbiAgICAgICAgc3dpdGNoICh0aGlzLm1fZGF0YS5nYW1lSWQpIHtcbiAgICAgICAgICAgIGNhc2UgQ29uZmlnLkdhbWVJZC5UZXhhQ293VGFibGU6XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tTGlzdFZpZXcuc2N2Um9vbUxpc3QuY29udGVudC5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoUm9vbVRleGFDb3dUYWJsZUl0ZW0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb25maWcuR2FtZUlkLkZydWl0UGFydHk6XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tTGlzdFZpZXcuc2N2Um9vbUxpc3QuY29udGVudC5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoUm9vbUZydWl0UGFydHlJdGVtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ29uZmlnLkdhbWVJZC5SZWRWc0JsYWNrOlxuICAgICAgICAgICAgICAgIHRoaXMucm9vbUxpc3RWaWV3LnNjdlJvb21MaXN0LmNvbnRlbnQuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFJvb21SZWRWc0JsYWNrSXRlbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gIFxuICAgICAgICBpdGVtQ29tcG9uZW50Lm9uQ2xpY2tFbnRlcigpO1xuICAgIH1cbiAgXG4gICAgcmVxR3VpZGUoKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhVc2VyLl9nYW1lSWRzKTtcbiAgICAgICAgaWYgKFVzZXIuX2dhbWVJZHMuaW5kZXhPZigyMDAyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5SZXFJbnNlcnROZXdQbGF5ZXJHdWlkLmNyZWF0ZSh7IGdhbWVJZDogMjAwMiB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5SZXFJbnNlcnROZXdQbGF5ZXJHdWlkLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9SZXFJbnNlcnROZXdQbGF5ZXJHdWlkLFxuICAgICAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==