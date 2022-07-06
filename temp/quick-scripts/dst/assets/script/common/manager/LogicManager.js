
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/manager/LogicManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc2c0079ExICL2e4HMg+a06', 'LogicManager');
// script/common/manager/LogicManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicManager = void 0;
const LogicEvent_1 = require("../event/LogicEvent");
const Manager_1 = require("./Manager");
class LogicManager {
    constructor() {
        this._logTag = `[LogicManager]`;
        this._logics = [];
        this._logicTypes = [];
        this.node = null;
    }
    static Instance() { return this._instance || (this._instance = new LogicManager()); }
    push(logicType) {
        for (let i = 0; i < this._logicTypes.length; i++) {
            if (this._logicTypes[i] == logicType) {
                cc.error(this._logTag, `重复添加${cc.js.getClassName(logicType)}`);
                return;
            }
        }
        if (this.node) {
            //已经进入过onLoad,这里需要单独的进行初始化
            let logic = new logicType;
            logic.init(this.node);
            this._logics.push(logic);
            logic.onLoad();
        }
        else {
            this._logicTypes.push(logicType);
        }
    }
    onLoad(node) {
        this.node = node;
        Manager_1.Manager.eventDispatcher.addEventListener(LogicEvent_1.LogicEvent.ENTER_COMPLETE, this.onEnterComplete, this);
        if (this._logics.length == 0) {
            for (let i = 0; i < this._logicTypes.length; i++) {
                let type = this._logicTypes[i];
                cc.log(this._logTag, `添加Logic : ${cc.js.getClassName(type)}`);
                let logic = new type;
                logic.init(node);
                this._logics.push(logic);
            }
        }
        this._logics.forEach((data) => {
            data.onLoad();
        });
    }
    onDestroy(node) {
        Manager_1.Manager.eventDispatcher.removeEventListener(LogicEvent_1.LogicEvent.ENTER_COMPLETE, this);
        this._logics.forEach((data) => {
            data.onDestroy();
        });
    }
    onEnterComplete(data) {
        //房间列表会直接加在大厅上，不对界面进行关闭操作
        if (data.type != LogicEvent_1.LogicType.ROOM_LIST) {
            if (data && data.views && data.views.length > 0) {
                //关闭掉除排除项之外的所有界面
                Manager_1.Manager.uiManager.closeExcept(data.views);
            }
            for (let i = 0; i < this._logics.length; i++) {
                let logic = this._logics[i];
                if (logic) {
                    logic.onEnterComplete(data);
                }
            }
        }
    }
}
exports.LogicManager = LogicManager;
LogicManager._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL21hbmFnZXIvTG9naWNNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUE0RTtBQUM1RSx1Q0FBb0M7QUFFcEMsTUFBYSxZQUFZO0lBQXpCO1FBRVksWUFBTyxHQUFHLGdCQUFnQixDQUFDO1FBSTNCLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsU0FBSSxHQUFhLElBQUksQ0FBQztJQThEbEMsQ0FBQztJQWxFVSxNQUFNLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQU1yRixJQUFJLENBQUUsU0FBZTtRQUN4QixLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDakQsSUFBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDbkMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPO2FBQ1Y7U0FDSjtRQUNELElBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLDBCQUEwQjtZQUMxQixJQUFJLEtBQUssR0FBVyxJQUFJLFNBQVMsQ0FBQztZQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEI7YUFBSTtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBRSxJQUFjO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGlCQUFPLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLHVCQUFVLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUYsSUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDM0IsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFHLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdELElBQUksS0FBSyxHQUFXLElBQUksSUFBSSxDQUFDO2dCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBQzthQUM5QjtTQUNKO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRU0sU0FBUyxDQUFFLElBQWM7UUFDNUIsaUJBQU8sQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsdUJBQVUsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsZUFBZSxDQUFDLElBQW9CO1FBRTFDLHlCQUF5QjtRQUN6QixJQUFLLElBQUksQ0FBQyxJQUFJLElBQUksc0JBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLGdCQUFnQjtnQkFDaEIsaUJBQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QztZQUNELEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRyxDQUFDLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDL0I7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7QUFyRUwsb0NBc0VDO0FBbkVrQixzQkFBUyxHQUFpQixJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpYyB9IGZyb20gXCIuLi9iYXNlL0xvZ2ljXCI7XG5pbXBvcnQgeyBMb2dpY0V2ZW50LCBMb2dpY0V2ZW50RGF0YSwgTG9naWNUeXBlIH0gZnJvbSBcIi4uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi9NYW5hZ2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBMb2dpY01hbmFnZXJ7XG4gICAgXG4gICAgcHJpdmF0ZSBfbG9nVGFnID0gYFtMb2dpY01hbmFnZXJdYDtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IExvZ2ljTWFuYWdlciA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZSgpIHsgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBMb2dpY01hbmFnZXIoKSk7IH1cblxuICAgIHByaXZhdGUgX2xvZ2ljcyA6IExvZ2ljW10gPSBbXTtcbiAgICBwcml2YXRlIF9sb2dpY1R5cGVzID0gW107XG4gICAgcHJpdmF0ZSBub2RlIDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwdWJsaWMgcHVzaCggbG9naWNUeXBlIDogYW55ICl7XG4gICAgICAgIGZvciAoIGxldCBpID0gMCA7IGkgPCB0aGlzLl9sb2dpY1R5cGVzLmxlbmd0aCA7IGkrKyApe1xuICAgICAgICAgICAgaWYgKCB0aGlzLl9sb2dpY1R5cGVzW2ldID09IGxvZ2ljVHlwZSApe1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKHRoaXMuX2xvZ1RhZywgYOmHjeWkjea3u+WKoCR7Y2MuanMuZ2V0Q2xhc3NOYW1lKGxvZ2ljVHlwZSl9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy5ub2RlICl7XG4gICAgICAgICAgICAvL+W3sue7j+i/m+WFpei/h29uTG9hZCzov5nph4zpnIDopoHljZXni6znmoTov5vooYzliJ3lp4vljJZcbiAgICAgICAgICAgIGxldCBsb2dpYyA6IExvZ2ljID0gbmV3IGxvZ2ljVHlwZTtcbiAgICAgICAgICAgIGxvZ2ljLmluaXQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2ljcy5wdXNoKGxvZ2ljKTtcbiAgICAgICAgICAgIGxvZ2ljLm9uTG9hZCgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2ljVHlwZXMucHVzaChsb2dpY1R5cGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uTG9hZCggbm9kZSA6IGNjLk5vZGUgKXtcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgTWFuYWdlci5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihMb2dpY0V2ZW50LkVOVEVSX0NPTVBMRVRFLHRoaXMub25FbnRlckNvbXBsZXRlLHRoaXMpO1xuICAgICAgICBpZiAoIHRoaXMuX2xvZ2ljcy5sZW5ndGggPT0gMCApe1xuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMuX2xvZ2ljVHlwZXMubGVuZ3RoIDsgaSsrICl7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLl9sb2dpY1R5cGVzW2ldO1xuICAgICAgICAgICAgICAgIGNjLmxvZyh0aGlzLl9sb2dUYWcsYOa3u+WKoExvZ2ljIDogJHtjYy5qcy5nZXRDbGFzc05hbWUodHlwZSl9YCk7XG4gICAgICAgICAgICAgICAgbGV0IGxvZ2ljIDogTG9naWMgPSBuZXcgdHlwZTtcbiAgICAgICAgICAgICAgICBsb2dpYy5pbml0KG5vZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2ljcy5wdXNoKCBsb2dpYyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9naWNzLmZvckVhY2goKGRhdGEgOiBMb2dpYyk9PntcbiAgICAgICAgICAgIGRhdGEub25Mb2FkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EZXN0cm95KCBub2RlIDogY2MuTm9kZSApe1xuICAgICAgICBNYW5hZ2VyLmV2ZW50RGlzcGF0Y2hlci5yZW1vdmVFdmVudExpc3RlbmVyKExvZ2ljRXZlbnQuRU5URVJfQ09NUExFVEUsdGhpcyk7XG4gICAgICAgIHRoaXMuX2xvZ2ljcy5mb3JFYWNoKChkYXRhIDogTG9naWMpPT57XG4gICAgICAgICAgICBkYXRhLm9uRGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FbnRlckNvbXBsZXRlKGRhdGE6IExvZ2ljRXZlbnREYXRhKSB7XG5cbiAgICAgICAgLy/miL/pl7TliJfooajkvJrnm7TmjqXliqDlnKjlpKfljoXkuIrvvIzkuI3lr7nnlYzpnaLov5vooYzlhbPpl63mk43kvZxcbiAgICAgICAgaWYgKCBkYXRhLnR5cGUgIT0gTG9naWNUeXBlLlJPT01fTElTVCApe1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS52aWV3cyAmJiBkYXRhLnZpZXdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvL+WFs+mXreaOiemZpOaOkumZpOmhueS5i+WklueahOaJgOacieeVjOmdolxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLmNsb3NlRXhjZXB0KGRhdGEudmlld3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMuX2xvZ2ljcy5sZW5ndGggOyBpKysgKXtcbiAgICAgICAgICAgICAgICBsZXQgbG9naWMgPSB0aGlzLl9sb2dpY3NbaV07XG4gICAgICAgICAgICAgICAgaWYgKCBsb2dpYyApe1xuICAgICAgICAgICAgICAgICAgICBsb2dpYy5vbkVudGVyQ29tcGxldGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19