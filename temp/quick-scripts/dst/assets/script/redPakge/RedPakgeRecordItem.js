
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '93728R+E2dCeb8PtN34ejGE', 'RedPakgeRecordItem');
// script/redPakge/RedPakgeRecordItem.ts

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
const ScroViewBaseItem_1 = __importDefault(require("../common/component/ScroViewBaseItem"));
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const UtilMgr_1 = require("../global/UtilMgr");
const RedPakgeShareView_1 = __importDefault(require("./RedPakgeShareView"));
const { ccclass, property } = cc._decorator;
let RedPakgeRecordItem = class RedPakgeRecordItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.typeLabel = null;
        this.codeLabel = null;
        this.amountLabel = null;
        this.numLabel = null;
        this.stateLabel = null;
        this.shareBtn = null;
        // update (dt) {}
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            this.typeLabel.language = data.type == 1 ? Manager_1.Manager.makeLanguage("REDPAKGE.recordAverageType") : Manager_1.Manager.makeLanguage("REDPAKGE.recordRandomType");
            this.codeLabel.string = data.receiveCode;
            this.amountLabel.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.totalAmount);
            this.numLabel.string = data.receivedNumber + "/" + data.number;
            if (new Date().getTime() > data.expireTime) { //过期
                this.shareBtn.node.active = false;
                this.stateLabel.language = Manager_1.Manager.makeLanguage("REDPAKGE.Expired");
                this.codeLabel.string = "";
            }
            else {
                this.shareBtn.node.active = true;
                this.stateLabel.language = Manager_1.Manager.makeLanguage(["REDPAKGE.ValidUntil", new Date(data.expireTime).format("MM-dd hh:mm")]);
                if (data.receiveCode.length > 0) {
                    this.codeLabel.string = "(" + data.receiveCode + ")";
                }
            }
        }
    }
    onClick(event, type) {
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        let buttonName = event.target.name;
        switch (buttonName) {
            case "shareBtn":
                this.onShare();
                break;
            default: this.onShowInfo();
        }
    }
    onShowInfo() {
        dispatch("showRedPakgeRecordDetail", this._data);
    }
    onShare() {
        Manager_1.Manager.uiManager.open({ type: RedPakgeShareView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this._data.shareUrl] });
    }
};
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "typeLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "codeLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "amountLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "numLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "stateLabel", void 0);
__decorate([
    property(cc.Button)
], RedPakgeRecordItem.prototype, "shareBtn", void 0);
RedPakgeRecordItem = __decorate([
    ccclass
], RedPakgeRecordItem);
exports.default = RedPakgeRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VSZWNvcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQW9FO0FBQ3BFLHVEQUFvRDtBQUNwRCx1REFBNkQ7QUFDN0QsK0NBQTRDO0FBQzVDLDRFQUFvRDtBQUdwRCxNQUFNLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHMUMsSUFBcUIsa0JBQWtCLEdBQXZDLE1BQXFCLGtCQUFtQixTQUFRLDBCQUFnQjtJQUFoRTs7UUFHSSxjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixlQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGFBQVEsR0FBYyxJQUFJLENBQUM7UUF3QzNCLGlCQUFpQjtJQUNyQixDQUFDO0lBdkNHLFVBQVUsQ0FBQyxJQUFJLEVBQUMsTUFBTTtRQUNsQixLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBTyxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBTyxDQUFDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ2pKLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFDLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO1lBRTFELElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsSUFBSTtnQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtnQkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO2FBQzdCO2lCQUFJO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7Z0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLENBQUMscUJBQXFCLEVBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pILElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxHQUFHLENBQUE7aUJBQ25EO2FBQ0o7U0FFSjtJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDZixpQkFBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsMEJBQWdCLENBQUMsQ0FBQztRQUN2RSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNuQyxRQUFRLFVBQVUsRUFBRTtZQUNoQixLQUFLLFVBQVU7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUFDLE1BQU07WUFDdkMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVPLFVBQVU7UUFDZCxRQUFRLENBQUMsMEJBQTBCLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFDTyxPQUFPO1FBQ1gsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLDJCQUFpQixFQUFDLE1BQU0sRUFBRSwwQkFBZ0IsRUFBQyxJQUFJLEVBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUN4RyxDQUFDO0NBRUosQ0FBQTtBQXhERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNRO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1E7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDVTtBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNPO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ1M7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDTztBQWxCVixrQkFBa0I7SUFEdEMsT0FBTztHQUNhLGtCQUFrQixDQTJEdEM7a0JBM0RvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2Nyb1ZpZXdCYXNlSXRlbSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0Jhc2VJdGVtXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFJlZFBha2dlU2hhcmVWaWV3IGZyb20gXCIuL1JlZFBha2dlU2hhcmVWaWV3XCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRQYWtnZVJlY29yZEl0ZW0gZXh0ZW5kcyBTY3JvVmlld0Jhc2VJdGVtIHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0eXBlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb2RlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBhbW91bnRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG51bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RhdGVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBzaGFyZUJ0bjogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIHVwZGF0ZUl0ZW0oZGF0YSxpdGVtSWQpe1xuICAgICAgICBzdXBlci51cGRhdGVJdGVtKGRhdGEsaXRlbUlkKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy50eXBlTGFiZWwubGFuZ3VhZ2UgPSBkYXRhLnR5cGUgPT0gMSA/IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUkVEUEFLR0UucmVjb3JkQXZlcmFnZVR5cGVcIikgOiBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlJFRFBBS0dFLnJlY29yZFJhbmRvbVR5cGVcIilcbiAgICAgICAgICAgIHRoaXMuY29kZUxhYmVsLnN0cmluZyA9IGRhdGEucmVjZWl2ZUNvZGVcbiAgICAgICAgICAgIHRoaXMuYW1vdW50TGFiZWwuc3RyaW5nID0gXCLigrlcIitVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEudG90YWxBbW91bnQpIFxuICAgICAgICAgICAgdGhpcy5udW1MYWJlbC5zdHJpbmcgPSBkYXRhLnJlY2VpdmVkTnVtYmVyK1wiL1wiK2RhdGEubnVtYmVyXG5cbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSA+IGRhdGEuZXhwaXJlVGltZSkgey8v6L+H5pyfXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZUJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRURQQUtHRS5FeHBpcmVkXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZUxhYmVsLnN0cmluZyA9IFwiXCJcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVCdG4ubm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoW1wiUkVEUEFLR0UuVmFsaWRVbnRpbFwiLG5ldyBEYXRlKGRhdGEuZXhwaXJlVGltZSkuZm9ybWF0KFwiTU0tZGQgaGg6bW1cIildKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZWNlaXZlQ29kZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29kZUxhYmVsLnN0cmluZyA9IFwiKFwiK2RhdGEucmVjZWl2ZUNvZGUrXCIpXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHR5cGUpe1xuICAgICAgICBNYW5hZ2VyLmdsb2JhbEF1ZGlvLnBsYXlFZmZlY3QoXCJjb21tb24vYXVkaW8vY2xpY2tcIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgICAgIGxldCBidXR0b25OYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgICAgIHN3aXRjaCAoYnV0dG9uTmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcInNoYXJlQnRuXCI6IHRoaXMub25TaGFyZSgpOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMub25TaG93SW5mbygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNob3dJbmZvKCl7XG4gICAgICAgIGRpc3BhdGNoKFwic2hvd1JlZFBha2dlUmVjb3JkRGV0YWlsXCIsdGhpcy5fZGF0YSlcbiAgICB9XG4gICAgcHJpdmF0ZSBvblNoYXJlKCl7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oe3R5cGU6UmVkUGFrZ2VTaGFyZVZpZXcsYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLGFyZ3M6W3RoaXMuX2RhdGEuc2hhcmVVcmxdfSlcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==