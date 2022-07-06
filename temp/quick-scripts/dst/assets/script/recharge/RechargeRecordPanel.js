
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/recharge/RechargeRecordPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a44caWV81dKyYHrUYwE9vAD', 'RechargeRecordPanel');
// script/recharge/RechargeRecordPanel.ts

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
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const CommonService_1 = require("../common/net/CommonService");
const Manager_1 = require("../common/manager/Manager");
const { ccclass, property } = cc._decorator;
let RechargeRecordPanel = class RechargeRecordPanel extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noRecord = null;
        this.labTime = null;
        this.labCommodity = null;
        this.labAmount = null;
        this.labState = null;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_ProductOrder), (res) => {
            this.noRecord.active = res.productOrder.length == 0;
            this.rankView(res.productOrder);
        });
    }
    onLoad() {
        super.onLoad();
    }
    start() {
        this.labTime.language = Manager_1.Manager.makeLanguage("RECHARGE.Time");
        this.labCommodity.language = Manager_1.Manager.makeLanguage("RECHARGE.Commodity");
        this.labAmount.language = Manager_1.Manager.makeLanguage("RECHARGE.Amount");
        this.labState.language = Manager_1.Manager.makeLanguage("RECHARGE.State");
    }
    onEnable() {
        this.requestRecordList();
    }
    requestRecordList() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_ProductOrder, null);
    }
    rankView(rankingList) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = rankingList;
            yield scroViewCtrlCom.framingLoad(rankingList.length, true);
        });
    }
};
__decorate([
    property(cc.Node)
], RechargeRecordPanel.prototype, "noRecord", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labTime", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labCommodity", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labAmount", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordPanel.prototype, "labState", void 0);
RechargeRecordPanel = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RechargeRecordPanel);
exports.default = RechargeRecordPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVjaGFyZ2UvUmVjaGFyZ2VSZWNvcmRQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLG9GQUE0RDtBQUM1RCxvRUFBNEM7QUFDNUMsNkRBQTBEO0FBRTFELGtFQUEyRTtBQUMzRSwrREFBdUU7QUFDdkUsdURBQW9EO0FBRXBELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsZ0JBQU07SUFBdkQ7O1FBSUksYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsYUFBUSxHQUFhLElBQUksQ0FBQztJQWlDOUIsQ0FBQztJQS9CRyxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzlGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQ2pDLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDMUMsSUFBSSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBQ0ssUUFBUSxDQUFDLFdBQVc7O1lBQ3RCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFBO1lBQ3JELGVBQWUsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFBO1lBQ3RDLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQy9ELENBQUM7S0FBQTtDQUdKLENBQUE7QUE3Q0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDTztBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNNO0FBR3pCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ1c7QUFHOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDUTtBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNPO0FBaEJULG1CQUFtQjtJQUZ2QyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixtQkFBbUIsQ0FpRHZDO2tCQWpEb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBTY3JvVmlld1BsdXMgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdQbHVzXCI7XG5pbXBvcnQgU2Nyb1ZpZXdDdHJsIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3Q3RybFwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBtYWtlS2V5LCBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgc2VydmVyVHlwZSwgcHJvdG9QYWNrYWdlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNoYXJnZVJlY29yZFBhbmVsIGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPntcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub1JlY29yZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiVGltZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYkNvbW1vZGl0eTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYkFtb3VudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYlN0YXRlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1Byb2R1Y3RPcmRlciksIChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm9SZWNvcmQuYWN0aXZlID0gcmVzLnByb2R1Y3RPcmRlci5sZW5ndGggPT0gMDtcbiAgICAgICAgICAgIHRoaXMucmFua1ZpZXcocmVzLnByb2R1Y3RPcmRlcilcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmxhYlRpbWUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlJFQ0hBUkdFLlRpbWVcIik7XG4gICAgICAgIHRoaXMubGFiQ29tbW9kaXR5Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRUNIQVJHRS5Db21tb2RpdHlcIik7XG4gICAgICAgIHRoaXMubGFiQW1vdW50Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRUNIQVJHRS5BbW91bnRcIik7XG4gICAgICAgIHRoaXMubGFiU3RhdGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlJFQ0hBUkdFLlN0YXRlXCIpO1xuICAgIH1cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0UmVjb3JkTGlzdCgpO1xuICAgIH1cbiAgICByZXF1ZXN0UmVjb3JkTGlzdCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1Byb2R1Y3RPcmRlcixcbiAgICAgICAgICAgIG51bGwpO1xuICAgIH1cbiAgICBhc3luYyByYW5rVmlldyhyYW5raW5nTGlzdCkge1xuICAgICAgICBsZXQgc2Nyb1ZpZXdDdHJsQ29tID0gdGhpcy5nZXRDb21wb25lbnQoU2Nyb1ZpZXdDdHJsKVxuICAgICAgICBzY3JvVmlld0N0cmxDb20uZGF0YUxpc3QgPSByYW5raW5nTGlzdFxuICAgICAgICBhd2FpdCBzY3JvVmlld0N0cmxDb20uZnJhbWluZ0xvYWQocmFua2luZ0xpc3QubGVuZ3RoLCB0cnVlKVxuICAgIH1cblxuXG59XG4iXX0=