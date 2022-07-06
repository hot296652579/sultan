
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallBetRankItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '488946P629MZ73FTUzhqVa+', 'HallBetRankItem');
// script/hall/HallBetRankItem.ts

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
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const Defines_1 = require("../framework/base/Defines");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let HallBetRankItem = class HallBetRankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.gold = null;
        this.gamesNode = null;
        this.playerNode = null;
        this.iconGame = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        // this.node.opacity = 0;
    }
    updateItem(data, itemId) {
        // this.gold.string = UtilMgr.changeMoney(data.gold);
        let labGame = this.gamesNode.getChildByName('labGame').getComponent(cc.Label);
        let nick = this.playerNode.getChildByName('nick').getComponent(cc.Label);
        let imgAvatar = this.playerNode.getChildByName('imgAvatar').getComponent(cc.Sprite);
        labGame.string = data.gameName;
        nick.string = data.Nick;
        // this.gold.string = `Rp ${data.Score}`;
        this.gold.string = NumberUtils_1.default.converToC(data.Score);
        this.refreshGameIcon(data);
        if (data.headImgUrl)
            UtilMgr_1.UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this);
    }
    refreshGameIcon(data) {
        let games = Config_1.Config.games;
        let gameName = data.gameName;
        let imgUrl = `hall/images/domino/icon_${games[gameName].disName}_new`;
        console.log(imgUrl);
        this.iconGame.loadImage({ url: imgUrl, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClick(event) {
        console.log(event);
    }
};
__decorate([
    property(cc.Label)
], HallBetRankItem.prototype, "gold", void 0);
__decorate([
    property(cc.Node)
], HallBetRankItem.prototype, "gamesNode", void 0);
__decorate([
    property(cc.Node)
], HallBetRankItem.prototype, "playerNode", void 0);
__decorate([
    property(cc.Sprite)
], HallBetRankItem.prototype, "iconGame", void 0);
HallBetRankItem = __decorate([
    ccclass
], HallBetRankItem);
exports.default = HallBetRankItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsQmV0UmFua0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBaUQ7QUFDakQsOEVBQXNEO0FBQ3RELHVEQUE2RDtBQUM3RCxvRUFBNEM7QUFDNUMsK0NBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsZ0JBQU07SUFBbkQ7O1FBRUksU0FBSSxHQUFhLElBQUksQ0FBQztRQUd0QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsYUFBUSxHQUFjLElBQUksQ0FBQztRQW1DM0IsaUJBQWlCO0lBQ3JCLENBQUM7SUFsQ0csTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLHlCQUF5QjtJQUM3QixDQUFDO0lBRU0sVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNO1FBQzFCLHFEQUFxRDtRQUVyRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxVQUFVO1lBQ2YsaUJBQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUU5RSxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQUk7UUFDaEIsSUFBSSxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtRQUN4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksTUFBTSxHQUFHLDJCQUEyQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUM7UUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFBO0lBQ2xGLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdEIsQ0FBQztDQUdKLENBQUE7QUE1Q0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDRztBQUd0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNRO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ1M7QUFFM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDTztBQVZWLGVBQWU7SUFEbkMsT0FBTztHQUNhLGVBQWUsQ0E4Q25DO2tCQTlDb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbEJldFJhbmtJdGVtIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZ29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZ2FtZXNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBsYXllck5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaWNvbkdhbWU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKSB7XG4gICAgICAgIC8vIHRoaXMuZ29sZC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEuZ29sZCk7XG5cbiAgICAgICAgbGV0IGxhYkdhbWUgPSB0aGlzLmdhbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiR2FtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxldCBuaWNrID0gdGhpcy5wbGF5ZXJOb2RlLmdldENoaWxkQnlOYW1lKCduaWNrJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGV0IGltZ0F2YXRhciA9IHRoaXMucGxheWVyTm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW1nQXZhdGFyJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxhYkdhbWUuc3RyaW5nID0gZGF0YS5nYW1lTmFtZTtcbiAgICAgICAgbmljay5zdHJpbmcgPSBkYXRhLk5pY2s7XG4gICAgICAgIC8vIHRoaXMuZ29sZC5zdHJpbmcgPSBgUnAgJHtkYXRhLlNjb3JlfWA7XG4gICAgICAgIHRoaXMuZ29sZC5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoZGF0YS5TY29yZSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEdhbWVJY29uKGRhdGEpO1xuICAgICAgICBpZiAoZGF0YS5oZWFkSW1nVXJsKVxuICAgICAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyhpbWdBdmF0YXIsIGRhdGEuaGVhZEltZ1VybCwgZGF0YS5oZWFkSW1nVXJsLCB0aGlzKVxuXG4gICAgfVxuXG4gICAgcmVmcmVzaEdhbWVJY29uKGRhdGEpIHtcbiAgICAgICAgbGV0IGdhbWVzID0gQ29uZmlnLmdhbWVzXG4gICAgICAgIGxldCBnYW1lTmFtZSA9IGRhdGEuZ2FtZU5hbWU7XG4gICAgICAgIGxldCBpbWdVcmwgPSBgaGFsbC9pbWFnZXMvZG9taW5vL2ljb25fJHtnYW1lc1tnYW1lTmFtZV0uZGlzTmFtZX1fbmV3YDtcbiAgICAgICAgY29uc29sZS5sb2coaW1nVXJsKVxuICAgICAgICB0aGlzLmljb25HYW1lLmxvYWRJbWFnZSh7IHVybDogaW1nVXJsLCB2aWV3OiB0aGlzLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSlcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=