
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7ca50vkGvdE3Kv4o/7p5py3', 'RedPakgeView');
// script/redPakge/RedPakgeView.ts

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
const { ccclass, property } = cc._decorator;
let RedPakgeView = class RedPakgeView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.sendNode = null;
        this.recordsNode = null;
        this.receiveNode = null;
        this.recordsDetailNode = null;
    }
    static getPrefabUrl() {
        return "redPakge/prefabs/RedPakgeView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.sendNode.active = false;
        this.recordsNode.active = false;
        this.receiveNode.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    start() {
        this.showSend();
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "send":
                this.showSend();
                break;
            case "records":
                this.showRecords();
                break;
            case "receive":
                this.showReceive();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    showSend() {
        this.sendNode.active = true;
        this.recordsNode.active = false;
        this.receiveNode.active = false;
        this.recordsDetailNode.active = false;
    }
    showRecords() {
        this.sendNode.active = false;
        this.recordsNode.active = true;
        this.receiveNode.active = false;
        this.recordsDetailNode.active = false;
    }
    showReceive() {
        this.sendNode.active = false;
        this.recordsNode.active = false;
        this.receiveNode.active = true;
        this.recordsDetailNode.active = false;
    }
    update(dt) {
        // G.Logger.log(this.node.width,this.content.width)
    }
};
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "sendNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "recordsNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "receiveNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "recordsDetailNode", void 0);
RedPakgeView = __decorate([
    ccclass
], RedPakgeView);
exports.default = RedPakgeView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsb0VBQTRDO0FBSTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxnQkFBTTtJQUFoRDs7UUFHSSxhQUFRLEdBQVksSUFBSSxDQUFBO1FBRXhCLGdCQUFXLEdBQVksSUFBSSxDQUFBO1FBRTNCLGdCQUFXLEdBQVksSUFBSSxDQUFBO1FBRzNCLHNCQUFpQixHQUFZLElBQUksQ0FBQTtJQXlEckMsQ0FBQztJQXZEVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLCtCQUErQixDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUNuQyxDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQUk7UUFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUNkLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxPQUFPO2dCQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFBQyxNQUFNO1lBQzVDLEtBQUssTUFBTTtnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQUMsTUFBTTtZQUNwQyxLQUFLLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUFDLE1BQU07WUFDMUMsS0FBSyxTQUFTO2dCQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFBQyxNQUFNO1lBQzFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUN6QyxDQUFDO0lBQ08sV0FBVztRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3pDLENBQUM7SUFDTyxXQUFXO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDekMsQ0FBQztJQUNELE1BQU0sQ0FBRSxFQUFFO1FBQ04sbURBQW1EO0lBQ3ZELENBQUM7Q0FDSixDQUFBO0FBaEVHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ007QUFFeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDUztBQUUzQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNTO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ2U7QUFWaEIsWUFBWTtJQURoQyxPQUFPO0dBQ2EsWUFBWSxDQW1FaEM7a0JBbkVvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRQYWtnZVZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2VuZE5vZGU6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmVjb3Jkc05vZGU6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmVjZWl2ZU5vZGU6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByZWNvcmRzRGV0YWlsTm9kZTogY2MuTm9kZSA9IG51bGxcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJyZWRQYWtnZS9wcmVmYWJzL1JlZFBha2dlVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuICAgICAgICB0aGlzLnNlbmROb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMucmVjb3Jkc05vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5yZWNlaXZlTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICB9XG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1NlbmQoKVxuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNsb3NlV2l0aEFjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZW5kXCI6IHRoaXMuc2hvd1NlbmQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmVjb3Jkc1wiOiB0aGlzLnNob3dSZWNvcmRzKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJlY2VpdmVcIjogdGhpcy5zaG93UmVjZWl2ZSgpOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IEcuTG9nZ2VyLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd1NlbmQoKXtcbiAgICAgICAgdGhpcy5zZW5kTm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMucmVjb3Jkc05vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5yZWNlaXZlTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLnJlY29yZHNEZXRhaWxOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuICAgIHByaXZhdGUgc2hvd1JlY29yZHMoKXtcbiAgICAgICAgdGhpcy5zZW5kTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLnJlY29yZHNOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5yZWNlaXZlTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLnJlY29yZHNEZXRhaWxOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuICAgIHByaXZhdGUgc2hvd1JlY2VpdmUoKXtcbiAgICAgICAgdGhpcy5zZW5kTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLnJlY29yZHNOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMucmVjZWl2ZU5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLnJlY29yZHNEZXRhaWxOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgLy8gRy5Mb2dnZXIubG9nKHRoaXMubm9kZS53aWR0aCx0aGlzLmNvbnRlbnQud2lkdGgpXG4gICAgfVxufVxuIl19