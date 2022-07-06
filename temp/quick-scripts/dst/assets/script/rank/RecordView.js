
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/rank/RecordView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85fbeRCndBBdajkncvoJowg', 'RecordView');
// script/rank/RecordView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankType = void 0;
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
var rankType;
(function (rankType) {
    rankType[rankType["Friends"] = 1] = "Friends";
    rankType[rankType["Wealth"] = 2] = "Wealth";
    rankType[rankType["DayEarn"] = 3] = "DayEarn";
})(rankType = exports.rankType || (exports.rankType = {}));
let RecordView = class RecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this.noRecords = null;
        this.boxNode = null;
        this.boxTime = null;
        this.draw = null;
        this._rankingList = [];
        this.timeInterval = null;
    }
    static getPrefabUrl() {
        return "rank/prefabs/RecordView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingRecord), this.updateList);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingReceive), this.newRankingReceiveRes);
    }
    updateList(data) {
        cc.log(data, "newRankingRecord");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.newRankingRecordP.length > 0) {
                    this._rankingList = data.newRankingRecordP;
                    this.rankView();
                }
                this._receiveStatus = data.receiveStatus;
                this._isWin = data.isWin;
                this._contDown = data.contDown;
                this.showBox();
                this.noRecords.active = !this._rankingList.length;
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    rankView() {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = this._rankingList;
            yield scroViewCtrlCom.framingLoad(this._rankingList.length);
            PanelHelp_1.default.hideLoading();
        });
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "boxBtn":
                this.reqReceive();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqReceive() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingReceive, null);
    }
    refreshRank() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingRecord, null);
    }
    start() {
        this.refreshRank();
    }
    newRankingReceiveRes(data) {
        if (data.statusMsg.status == 0) {
            this.boxNode.getComponent(sp.Skeleton).setAnimation(0, "kaixiang", false);
            this.boxNode.getComponent(sp.Skeleton).setCompleteListener(() => {
                this.boxNode.active = false;
                this.refreshRank();
            });
            dispatch("OpenBox");
            PanelHelp_1.default.showMsgBox("", Manager_1.Manager.makeLanguage(["RANK.Receive", UtilMgr_1.UtilMgr.changeMoney(data.reward)]), null, "btn_OK");
        }
        else {
            PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }
    showBox() {
        if (this._isWin == 1 && this._receiveStatus == 0) {
            this.boxNode.active = true;
            this.boxNode.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
        }
        else {
            this.boxNode.active = false;
        }
        this.draw.active = this._isWin == 1 ? (this._receiveStatus ? true : false) : true;
        this.updateBoxTime(this._contDown);
        if (this._contDown <= 0) {
            this.boxTime.node.active = false;
            this.draw.active = false;
        }
        this.boxTime.node.active = this.draw.active;
    }
    updateBoxTime(time) {
        this.timeInterval = () => {
            time -= 1000;
            this.conversionTime(time);
            if (time == 0) {
                this.unschedule(this.timeInterval);
                this.timeInterval = null;
                this.refreshRank();
            }
        };
        if (time > 0) {
            this.schedule(this.timeInterval, 1);
        }
        else if (time == 0) {
            this.unscheduleAllCallbacks();
            if (this.timeInterval) {
                this.unschedule(this.timeInterval);
                this.timeInterval = null;
            }
            this.refreshRank();
        }
    }
    conversionTime(data) {
        let hours = parseInt(data) / (1000 * 60 * 60);
        let h = parseInt(hours.toString());
        let minutes = (data % (1000 * 60 * 60)) / (1000 * 60);
        let m = parseInt(minutes.toString());
        let seconds = (data % (1000 * 60)) / 1000;
        let s = parseInt(seconds.toString());
        let time = (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
        this.boxTime.string = time;
    }
    onDestroy() {
        super.onDestroy();
        this.unscheduleAllCallbacks();
        if (this.timeInterval) {
            this.unschedule(this.timeInterval);
            this.timeInterval = null;
        }
    }
};
__decorate([
    property(cc.ScrollView)
], RecordView.prototype, "scrollView", void 0);
__decorate([
    property(cc.Node)
], RecordView.prototype, "noRecords", void 0);
__decorate([
    property(cc.Node)
], RecordView.prototype, "boxNode", void 0);
__decorate([
    property(cc.Label)
], RecordView.prototype, "boxTime", void 0);
__decorate([
    property(cc.Node)
], RecordView.prototype, "draw", void 0);
RecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RecordView);
exports.default = RecordView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmFuay9SZWNvcmRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9GQUE0RDtBQUM1RCx1REFBb0Q7QUFDcEQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUUxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBRTVDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLElBQVksUUFJWDtBQUpELFdBQVksUUFBUTtJQUNoQiw2Q0FBVyxDQUFBO0lBQ1gsMkNBQVUsQ0FBQTtJQUNWLDZDQUFXLENBQUE7QUFDZixDQUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkI7QUFJRCxJQUFxQixVQUFVLEdBQS9CLE1BQXFCLFVBQVcsU0FBUSxnQkFBTTtJQUE5Qzs7UUFHSSxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUdqQyxjQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsWUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixTQUFJLEdBQVksSUFBSSxDQUFDO1FBRXJCLGlCQUFZLEdBQVEsRUFBRSxDQUFBO1FBV3RCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO0lBd0p4QixDQUFDO0lBckpVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8seUJBQXlCLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMs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R0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTO1FBQ0wsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBakxHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7OENBQ1M7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDUTtBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNNO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ007QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3Q0FDRztBQWZKLFVBQVU7SUFGOUIsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsVUFBVSxDQW9MOUI7a0JBcExvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgU2Nyb1ZpZXdDdHJsIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3Q3RybFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIHJhbmtUeXBlIHtcbiAgICBGcmllbmRzID0gMSwgIC8v5aW95Y+LXG4gICAgV2VhbHRoID0gMiwgICAvL+i0ouWvjFxuICAgIERheUVhcm4gPSAzLCAgLy/ml6XotZpcbn1cblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub1JlY29yZHM6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYm94Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYm94VGltZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZHJhdzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBfcmFua2luZ0xpc3Q6IGFueSA9IFtdXG5cbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cblxuICAgIF9yZWNlaXZlU3RhdHVzOiBudW1iZXI7Ly/mmK/lkKbpooblj5ZcblxuICAgIF9pc1dpbjogbnVtYmVyOy8v5piv5ZCm5Lit5aWWXG5cbiAgICBfY29udERvd246IG51bWJlcjtcblxuICAgIHRpbWVJbnRlcnZhbCA9IG51bGw7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJyYW5rL3ByZWZhYnMvUmVjb3JkVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfTmV3UmFua2luZ1JlY29yZCksIHRoaXMudXBkYXRlTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05ld1JhbmtpbmdSZWNlaXZlKSwgdGhpcy5uZXdSYW5raW5nUmVjZWl2ZVJlcyk7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVMaXN0KGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsIFwibmV3UmFua2luZ1JlY29yZFwiKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubmV3UmFua2luZ1JlY29yZFAubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYW5raW5nTGlzdCA9IGRhdGEubmV3UmFua2luZ1JlY29yZFBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYW5rVmlldygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNlaXZlU3RhdHVzID0gZGF0YS5yZWNlaXZlU3RhdHVzO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzV2luID0gZGF0YS5pc1dpbjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250RG93biA9IGRhdGEuY29udERvd247XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Qm94KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub1JlY29yZHMuYWN0aXZlID0gIXRoaXMuX3JhbmtpbmdMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByYW5rVmlldygpIHtcbiAgICAgICAgbGV0IHNjcm9WaWV3Q3RybENvbSA9IHRoaXMuZ2V0Q29tcG9uZW50KFNjcm9WaWV3Q3RybClcbiAgICAgICAgc2Nyb1ZpZXdDdHJsQ29tLmRhdGFMaXN0ID0gdGhpcy5fcmFua2luZ0xpc3RcbiAgICAgICAgYXdhaXQgc2Nyb1ZpZXdDdHJsQ29tLmZyYW1pbmdMb2FkKHRoaXMuX3JhbmtpbmdMaXN0Lmxlbmd0aClcbiAgICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKClcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICB9XG5cblxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJveEJ0blwiOiB0aGlzLnJlcVJlY2VpdmUoKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVxUmVjZWl2ZSgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05ld1JhbmtpbmdSZWNlaXZlLFxuICAgICAgICAgICAgbnVsbCk7XG4gICAgfVxuXG5cbiAgICByZWZyZXNoUmFuaygpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05ld1JhbmtpbmdSZWNvcmQsXG4gICAgICAgICAgICBudWxsKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoUmFuaygpXG4gICAgfVxuXG4gICAgbmV3UmFua2luZ1JlY2VpdmVSZXMoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYm94Tm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImthaXhpYW5nXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuYm94Tm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYm94Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hSYW5rKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJPcGVuQm94XCIpO1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goXCJcIiwgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoW1wiUkFOSy5SZWNlaXZlXCIsIFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5yZXdhcmQpXSksIG51bGwsIFwiYnRuX09LXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Qm94KCkge1xuICAgICAgICBpZiAodGhpcy5faXNXaW4gPT0gMSAmJiB0aGlzLl9yZWNlaXZlU3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYm94Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ib3hOb2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiZGFpamlcIiwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJveE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3LmFjdGl2ZSA9IHRoaXMuX2lzV2luID09IDEgPyAodGhpcy5fcmVjZWl2ZVN0YXR1cyA/IHRydWUgOiBmYWxzZSkgOiB0cnVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQm94VGltZSh0aGlzLl9jb250RG93bik7XG4gICAgICAgIGlmICh0aGlzLl9jb250RG93biA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmJveFRpbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZHJhdy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm94VGltZS5ub2RlLmFjdGl2ZSA9IHRoaXMuZHJhdy5hY3RpdmU7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVCb3hUaW1lKHRpbWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRpbWUgLT0gMTAwMDtcbiAgICAgICAgICAgIHRoaXMuY29udmVyc2lvblRpbWUodGltZSk7XG4gICAgICAgICAgICBpZiAodGltZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMudGltZUludGVydmFsKVxuICAgICAgICAgICAgICAgIHRoaXMudGltZUludGVydmFsID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hSYW5rKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy50aW1lSW50ZXJ2YWwsIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRpbWUgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy50aW1lSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUludGVydmFsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFJhbmsoKVxuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGNvbnZlcnNpb25UaW1lKGRhdGEpIHtcbiAgICAgICAgbGV0IGhvdXJzID0gcGFyc2VJbnQoZGF0YSkgLyAoMTAwMCAqIDYwICogNjApO1xuICAgICAgICBsZXQgaCA9IHBhcnNlSW50KGhvdXJzLnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgbWludXRlcyA9IChkYXRhICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKTtcbiAgICAgICAgbGV0IG0gPSBwYXJzZUludChtaW51dGVzLnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IChkYXRhICUgKDEwMDAgKiA2MCkpIC8gMTAwMDtcbiAgICAgICAgbGV0IHMgPSBwYXJzZUludChzZWNvbmRzLnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgdGltZSA9IChoIDwgMTAgPyAoJzAnICsgaCkgOiBoKSArICc6JyArIChtIDwgMTAgPyAoJzAnICsgbSkgOiBtKSArICc6JyArIChzIDwgMTAgPyAoJzAnICsgcykgOiBzKTtcbiAgICAgICAgdGhpcy5ib3hUaW1lLnN0cmluZyA9IHRpbWU7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIGlmICh0aGlzLnRpbWVJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMudGltZUludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMudGltZUludGVydmFsID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==