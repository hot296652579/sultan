
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/turntable/PrizeRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8fb89I9/VLObwP7i1wLuty', 'PrizeRecordItem');
// script/turntable/PrizeRecordItem.ts

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
const AddressView_1 = __importDefault(require("./AddressView"));
const { ccclass, property } = cc._decorator;
let PrizeRecordItem = class PrizeRecordItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.time = null;
        this.prize = null;
        this.status = null;
        this.btn_address = null;
    }
    updateItem(data, itemId) {
        this.time.string = new Date(data.time).format("yy/MM/dd");
        this.prize.string = data.prize;
        let status = '';
        this.btn_address.active = false;
        this.turntableRecord = data;
        switch (data.status) { //奖品状态(0=未中奖,1=未领取（not receive）,2=待发放（Waiting to Receive）,3=已领取)
            case 0:
                status = "-";
                break;
            case 1:
                status = "Not Receive";
                this.btn_address.active = true;
                break;
            case 2:
                status = "Waiting to Receive";
                break;
            case 3:
                status = "Received";
                break;
            default:
                break;
        }
        this.status.string = status;
    }
    onClick(event) {
        let buttonName = event.target.name;
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        switch (buttonName) {
            case "btn_address":
                Manager_1.Manager.uiManager.open({ type: AddressView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this.turntableRecord.id] });
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Label)
], PrizeRecordItem.prototype, "time", void 0);
__decorate([
    property(cc.Label)
], PrizeRecordItem.prototype, "prize", void 0);
__decorate([
    property(cc.Label)
], PrizeRecordItem.prototype, "status", void 0);
__decorate([
    property(cc.Node)
], PrizeRecordItem.prototype, "btn_address", void 0);
PrizeRecordItem = __decorate([
    ccclass
], PrizeRecordItem);
exports.default = PrizeRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdHVybnRhYmxlL1ByaXplUmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRGQUFvRTtBQUNwRSx1REFBb0Q7QUFDcEQsdURBQTZEO0FBRTdELGdFQUF3QztBQUV4QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLDBCQUFnQjtJQUE3RDs7UUFLSSxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLFVBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsV0FBTSxHQUFhLElBQUksQ0FBQztRQUd4QixnQkFBVyxHQUFZLElBQUksQ0FBQztJQWtEaEMsQ0FBQztJQS9DRyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU07UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsZ0VBQWdFO1lBQ2xGLEtBQUssQ0FBQztnQkFDRixNQUFNLEdBQUcsR0FBRyxDQUFDO2dCQUNiLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsTUFBTSxHQUFHLGFBQWEsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztnQkFDOUIsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixNQUFNLEdBQUcsVUFBVSxDQUFDO2dCQUNwQixNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFDRCxPQUFPLENBQUMsS0FBSztRQUNULElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ25DLGlCQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSwwQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssYUFBYTtnQkFBRSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUscUJBQVcsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNwSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RDtJQUNMLENBQUM7SUFDRDs7T0FFRztJQUNILGlCQUFpQjtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUVKLENBQUE7QUEzREc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDRztBQUd0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNJO0FBR3ZCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ0s7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDVTtBQWRYLGVBQWU7SUFEbkMsT0FBTztHQUNhLGVBQWUsQ0FnRW5DO2tCQWhFb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvVmlld0Jhc2VJdGVtIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3QmFzZUl0ZW1cIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IEFkZHJlc3NWaWV3IGZyb20gXCIuL0FkZHJlc3NWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcml6ZVJlY29yZEl0ZW0gZXh0ZW5kcyBTY3JvVmlld0Jhc2VJdGVtIHtcblxuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXplOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RhdHVzOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fYWRkcmVzczogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIHR1cm50YWJsZVJlY29yZDogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVHVybnRhYmxlUmVjb3JkO1xuICAgIHVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMudGltZS5zdHJpbmcgPSBuZXcgRGF0ZShkYXRhLnRpbWUpLmZvcm1hdChcInl5L01NL2RkXCIpO1xuICAgICAgICB0aGlzLnByaXplLnN0cmluZyA9IGRhdGEucHJpemU7XG4gICAgICAgIGxldCBzdGF0dXMgPSAnJztcbiAgICAgICAgdGhpcy5idG5fYWRkcmVzcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50dXJudGFibGVSZWNvcmQgPSBkYXRhO1xuICAgICAgICBzd2l0Y2ggKGRhdGEuc3RhdHVzKSB7Ly/lpZblk4HnirbmgIEoMD3mnKrkuK3lpZYsMT3mnKrpooblj5bvvIhub3QgcmVjZWl2Ze+8iSwyPeW+heWPkeaUvu+8iFdhaXRpbmcgdG8gUmVjZWl2Ze+8iSwzPeW3sumihuWPlilcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBcIi1cIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBcIk5vdCBSZWNlaXZlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5fYWRkcmVzcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IFwiV2FpdGluZyB0byBSZWNlaXZlXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gXCJSZWNlaXZlZFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXR1cy5zdHJpbmcgPSBzdGF0dXM7XG4gICAgfVxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IGJ1dHRvbk5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgTWFuYWdlci5nbG9iYWxBdWRpby5wbGF5RWZmZWN0KFwiY29tbW9uL2F1ZGlvL2NsaWNrXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgICAgICBzd2l0Y2ggKGJ1dHRvbk5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYWRkcmVzc1wiOiBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQWRkcmVzc1ZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgYXJnczogW3RoaXMudHVybnRhYmxlUmVjb3JkLmlkXSB9KTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5pysSXRlbei/m+WFpVNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkVudGVyU3Jjb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbeemu+W8gFNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkV4aXRTY3JvbGxWaWV3KCkge1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuXG59XG4iXX0=