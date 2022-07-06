
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/NoticeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bad6b8+4+BHmI1JKCNd1Kbt', 'NoticeItem');
// script/common/component/NoticeItem.ts

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
const Decorators_1 = require("../../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const LobbyService_1 = require("../net/LobbyService");
const HallData_1 = __importDefault(require("../../data/HallData"));
const { ccclass, property } = cc._decorator;
let NoticeItem = class NoticeItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.mask = null;
        this.startX = null;
        this.endX = null;
        this.speed = 20;
        this.service = null;
    }
    onLoad() {
        //guest162468409 win Rp3800000in Crash
        let contentSize = this.label.node.getBoundingBox();
        this.startX = this.mask.width * this.mask.anchorX;
        this.endX = -this.mask.width * this.mask.anchorX - contentSize.size.width;
        this.label.node.x = this.startX;
        //test
        // let hallData = G.DataMgr.get(HallData);
        // let notices = hallData.notice;
        // notices.push({ message: "guest162468409 win Rp3800000in Crash", type: 0 });
        this.initView();
    }
    start() {
    }
    initView() {
        let hallData = G.DataMgr.get(HallData_1.default);
        let notices = hallData.notice;
        if (notices.length <= 0)
            return;
        let notice = notices[0];
        let str;
        if (notice.type == 0)
            str = this.getRichTxt(notice.message);
        else
            str = notice.message;
        this.label.string = str;
    }
    update(dt) {
        if (this.label.node.x <= this.endX) {
            this.label.node.x = this.startX;
        }
        this.label.node.x -= this.speed * dt;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_MessageNotify', this.onEvent_S2C_MessageNotify);
    }
    onEvent_S2C_MessageNotify() {
        this.schedule(this.checkLabelPos);
    }
    checkLabelPos() {
        // console.log('this.label.node.x:++++++++++++++' + this.label.node.x);
        if (this.label.node.x <= this.endX) {
            let hallData = G.DataMgr.get(HallData_1.default);
            let notices = hallData.notice;
            if (notices.length <= 0)
                return;
            let str;
            if (notices[0].type == 0) {
                let message = notices[0].message;
                str = this.getRichTxt(message);
            }
            else
                str = notices[0].message;
            this.label.string = str;
            if (notices.length > 1)
                notices.splice(0, 1);
        }
    }
    getRichTxt(message) {
        let winIndex = message.lastIndexOf('win');
        let rpIndex = message.lastIndexOf('Rp');
        let inIndex = message.lastIndexOf('in ');
        let name = message.substring(0, winIndex);
        let rp = message.substring(rpIndex, inIndex);
        let game = message.substring(inIndex, message.length);
        let str = `<color=#ffffff>${name}</c><color=#E1BC11> win${rp}</color><color=#ffffff>${game}</c>`;
        return str;
    }
    onDestroy() {
        this.unschedule(this.checkLabelPos);
    }
};
__decorate([
    property(cc.RichText)
], NoticeItem.prototype, "label", void 0);
__decorate([
    property(cc.Node)
], NoticeItem.prototype, "mask", void 0);
NoticeItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], NoticeItem);
exports.default = NoticeItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9Ob3RpY2VJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUVBQThFO0FBRTlFLHVFQUErQztBQU0vQyxzREFBbUQ7QUFFbkQsbUVBQTJDO0FBRTNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixVQUFVLEdBQS9CLE1BQXFCLFVBQVcsU0FBUSxnQkFBTTtJQUE5Qzs7UUFHSSxVQUFLLEdBQWdCLElBQUksQ0FBQztRQUcxQixTQUFJLEdBQVksSUFBSSxDQUFDO1FBRXJCLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFDdEIsU0FBSSxHQUFXLElBQUksQ0FBQztRQUVwQixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRVgsWUFBTyxHQUFpQixJQUFJLENBQUM7SUF3RmpDLENBQUM7SUF2RkcsTUFBTTtRQUNGLHNDQUFzQztRQUN0QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVoQyxNQUFNO1FBQ04sMENBQTBDO1FBQzFDLGlDQUFpQztRQUNqQyw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNuQixPQUFPO1FBRVgsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDaEIsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBOztZQUVyQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUV4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFO1FBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCx5QkFBeUI7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGFBQWE7UUFDVCx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLENBQUM7WUFDdkMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM5QixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQztnQkFDbkIsT0FBTztZQUVYLElBQUksR0FBRyxDQUFDO1lBQ1IsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDakMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbEM7O2dCQUNHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO1lBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUV4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQU87UUFDZCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxHQUFHLEdBQUcsa0JBQWtCLElBQUksMEJBQTBCLEVBQUUsMEJBQTBCLElBQUksTUFBTSxDQUFDO1FBQ2pHLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0osQ0FBQTtBQWxHRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3lDQUNJO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0NBQ0c7QUFOSixVQUFVO0lBRjlCLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLFVBQVUsQ0FxRzlCO2tCQXJHb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0UGFja2dlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9uZXQvSHR0cENsaWVudFwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCJwcm90b2J1ZmpzXCI7XG5pbXBvcnQgSGFsbERhdGEgZnJvbSBcIi4uLy4uL2RhdGEvSGFsbERhdGFcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGljZUl0ZW0gZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxuICAgIGxhYmVsOiBjYy5SaWNoVGV4dCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtYXNrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHN0YXJ0WDogbnVtYmVyID0gbnVsbDtcbiAgICBlbmRYOiBudW1iZXIgPSBudWxsO1xuXG4gICAgc3BlZWQgPSAyMDtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZSA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvL2d1ZXN0MTYyNDY4NDA5IHdpbiBScDM4MDAwMDBpbiBDcmFzaFxuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmxhYmVsLm5vZGUuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgdGhpcy5zdGFydFggPSB0aGlzLm1hc2sud2lkdGggKiB0aGlzLm1hc2suYW5jaG9yWDtcbiAgICAgICAgdGhpcy5lbmRYID0gLXRoaXMubWFzay53aWR0aCAqIHRoaXMubWFzay5hbmNob3JYIC0gY29udGVudFNpemUuc2l6ZS53aWR0aDtcbiAgICAgICAgdGhpcy5sYWJlbC5ub2RlLnggPSB0aGlzLnN0YXJ0WDtcblxuICAgICAgICAvL3Rlc3RcbiAgICAgICAgLy8gbGV0IGhhbGxEYXRhID0gRy5EYXRhTWdyLmdldChIYWxsRGF0YSk7XG4gICAgICAgIC8vIGxldCBub3RpY2VzID0gaGFsbERhdGEubm90aWNlO1xuICAgICAgICAvLyBub3RpY2VzLnB1c2goeyBtZXNzYWdlOiBcImd1ZXN0MTYyNDY4NDA5IHdpbiBScDM4MDAwMDBpbiBDcmFzaFwiLCB0eXBlOiAwIH0pO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBpbml0VmlldygpIHtcbiAgICAgICAgbGV0IGhhbGxEYXRhID0gRy5EYXRhTWdyLmdldChIYWxsRGF0YSk7XG4gICAgICAgIGxldCBub3RpY2VzID0gaGFsbERhdGEubm90aWNlO1xuICAgICAgICBpZiAobm90aWNlcy5sZW5ndGggPD0gMClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbm90aWNlID0gbm90aWNlc1swXTtcbiAgICAgICAgbGV0IHN0cjtcbiAgICAgICAgaWYgKG5vdGljZS50eXBlID09IDApXG4gICAgICAgICAgICBzdHIgPSB0aGlzLmdldFJpY2hUeHQobm90aWNlLm1lc3NhZ2UpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0ciA9IG5vdGljZS5tZXNzYWdlXG5cbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBzdHI7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmxhYmVsLm5vZGUueCA8PSB0aGlzLmVuZFgpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwubm9kZS54ID0gdGhpcy5zdGFydFg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYWJlbC5ub2RlLnggLT0gdGhpcy5zcGVlZCAqIGR0O1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdFdmVudF9TMkNfTWVzc2FnZU5vdGlmeScsIHRoaXMub25FdmVudF9TMkNfTWVzc2FnZU5vdGlmeSk7XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfTWVzc2FnZU5vdGlmeSgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmNoZWNrTGFiZWxQb3MpO1xuICAgIH1cblxuICAgIGNoZWNrTGFiZWxQb3MoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLmxhYmVsLm5vZGUueDorKysrKysrKysrKysrKycgKyB0aGlzLmxhYmVsLm5vZGUueCk7XG4gICAgICAgIGlmICh0aGlzLmxhYmVsLm5vZGUueCA8PSB0aGlzLmVuZFgpIHtcbiAgICAgICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICAgICAgbGV0IG5vdGljZXMgPSBoYWxsRGF0YS5ub3RpY2U7XG4gICAgICAgICAgICBpZiAobm90aWNlcy5sZW5ndGggPD0gMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIGxldCBzdHI7XG4gICAgICAgICAgICBpZiAobm90aWNlc1swXS50eXBlID09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5vdGljZXNbMF0ubWVzc2FnZTtcbiAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLmdldFJpY2hUeHQobWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICBzdHIgPSBub3RpY2VzWzBdLm1lc3NhZ2VcblxuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBzdHI7XG5cbiAgICAgICAgICAgIGlmIChub3RpY2VzLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgbm90aWNlcy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSaWNoVHh0KG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHdpbkluZGV4ID0gbWVzc2FnZS5sYXN0SW5kZXhPZignd2luJyk7XG4gICAgICAgIGxldCBycEluZGV4ID0gbWVzc2FnZS5sYXN0SW5kZXhPZignUnAnKTtcbiAgICAgICAgbGV0IGluSW5kZXggPSBtZXNzYWdlLmxhc3RJbmRleE9mKCdpbiAnKTtcblxuICAgICAgICBsZXQgbmFtZSA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIHdpbkluZGV4KTtcbiAgICAgICAgbGV0IHJwID0gbWVzc2FnZS5zdWJzdHJpbmcocnBJbmRleCwgaW5JbmRleCk7XG4gICAgICAgIGxldCBnYW1lID0gbWVzc2FnZS5zdWJzdHJpbmcoaW5JbmRleCwgbWVzc2FnZS5sZW5ndGgpO1xuICAgICAgICBsZXQgc3RyID0gYDxjb2xvcj0jZmZmZmZmPiR7bmFtZX08L2M+PGNvbG9yPSNFMUJDMTE+IHdpbiR7cnB9PC9jb2xvcj48Y29sb3I9I2ZmZmZmZj4ke2dhbWV9PC9jPmA7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jaGVja0xhYmVsUG9zKTtcbiAgICB9XG59XG4iXX0=