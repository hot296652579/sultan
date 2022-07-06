
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeReceiveItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b4cd71t7MlHbKFIK0PoRVFo', 'RedPakgeReceiveItem');
// script/redPakge/RedPakgeReceiveItem.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeReceiveItem = class RedPakgeReceiveItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.nameLabel = null;
        this.timeLabel = null;
        this.amountLabel = null;
        // update (dt) {}
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            this.nameLabel.string = Manager_1.Manager.getLanguage("REDPAKGE.receiveFrom") + UtilMgr_1.UtilMgr.setString(data.nickname);
            this.amountLabel.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.receiveAmount);
            this.timeLabel.language = new Date(data.receiveTime).format("MM-dd hh:mm:ss");
        }
    }
    onClick(event, type) {
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
    }
};
__decorate([
    property(cc.Label)
], RedPakgeReceiveItem.prototype, "nameLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeReceiveItem.prototype, "timeLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeReceiveItem.prototype, "amountLabel", void 0);
RedPakgeReceiveItem = __decorate([
    ccclass
], RedPakgeReceiveItem);
exports.default = RedPakgeReceiveItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VSZWNlaXZlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRGQUFvRTtBQUNwRSx1REFBb0Q7QUFDcEQsK0NBQTRDO0FBRzVDLE1BQU0sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUcxQyxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsMEJBQWdCO0lBQWpFOztRQUlJLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixnQkFBVyxHQUFhLElBQUksQ0FBQztRQXlCN0IsaUJBQWlCO0lBQ3JCLENBQUM7SUF4QkcsVUFBVSxDQUFDLElBQUksRUFBQyxNQUFNO1FBQ2xCLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsR0FBQyxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDcEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFDLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakY7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ2YsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDbkMsUUFBUSxVQUFVLEVBQUU7WUFDaEIsS0FBSyxVQUFVO2dCQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFBQyxNQUFNO1lBQ3ZDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFTyxVQUFVO1FBQ2QsUUFBUSxDQUFDLDBCQUEwQixFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBQ08sT0FBTztJQUVmLENBQUM7Q0FFSixDQUFBO0FBaENHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ1E7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDUTtBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNVO0FBVlosbUJBQW1CO0lBRHZDLE9BQU87R0FDYSxtQkFBbUIsQ0FvQ3ZDO2tCQXBDb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjcm9WaWV3QmFzZUl0ZW0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdCYXNlSXRlbVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRQYWtnZVJlY2VpdmVJdGVtIGV4dGVuZHMgU2Nyb1ZpZXdCYXNlSXRlbSB7XG5cbiAgIFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBuYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBhbW91bnRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgdXBkYXRlSXRlbShkYXRhLGl0ZW1JZCl7XG4gICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oZGF0YSxpdGVtSWQpXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSBNYW5hZ2VyLmdldExhbmd1YWdlKFwiUkVEUEFLR0UucmVjZWl2ZUZyb21cIikrVXRpbE1nci5zZXRTdHJpbmcoZGF0YS5uaWNrbmFtZSlcbiAgICAgICAgICAgIHRoaXMuYW1vdW50TGFiZWwuc3RyaW5nID0gXCLigrlcIitVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEucmVjZWl2ZUFtb3VudClcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLmxhbmd1YWdlID0gbmV3IERhdGUoZGF0YS5yZWNlaXZlVGltZSkuZm9ybWF0KFwiTU0tZGQgaGg6bW06c3NcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50LCB0eXBlKXtcbiAgICAgICAgbGV0IGJ1dHRvbk5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgc3dpdGNoIChidXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwic2hhcmVCdG5cIjogdGhpcy5vblNoYXJlKCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhpcy5vblNob3dJbmZvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2hvd0luZm8oKXtcbiAgICAgICAgZGlzcGF0Y2goXCJzaG93UmVkUGFrZ2VSZWNvcmREZXRhaWxcIix0aGlzLl9kYXRhKVxuICAgIH1cbiAgICBwcml2YXRlIG9uU2hhcmUoKXtcblxuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19