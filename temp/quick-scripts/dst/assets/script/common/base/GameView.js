
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/base/GameView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6615fp4kFJCp59X9P6X+odj', 'GameView');
// script/common/base/GameView.ts

"use strict";
/**@description 游戏层公共基类 */
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
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const Manager_1 = require("../manager/Manager");
/**
 * @description 游戏视图基类,处理了前后台切换对网络进行后台最大允许时间做统一处理,
 * 游戏层设置为ViewZOrder.zero
 */
const { ccclass, property } = cc._decorator;
let GameView = class GameView extends UIView_1.default {
    //重写show函数自己处理自己的喇叭位置,如果不写，默认为上一个场景的显示位置
    //show(args:any[]){
    //    super.show(args);
    //    Manager.horn.update();
    //}
    onLoad() {
        //调用进入后台重连的时间
        Manager_1.Manager.gameView = this;
        super.onLoad();
        //通用公共网络重连组件添加
        //进入场景完成，即onLoad最后一行  必须发进入完成事件
        //dispatchEnterComplete( {type : LogicType.GAME,views:[this],data : GameName.likuiby });
    }
    onDestroy() {
        if (this.audioHelper) {
            //停止背景音乐
            //this.audioHelper.stopMusic();
            this.audioHelper.stopAllEffects();
        }
        Manager_1.Manager.gameView = null;
        super.onDestroy();
    }
};
GameView = __decorate([
    ccclass
], GameView);
exports.default = GameView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2Jhc2UvR2FtZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBCQUEwQjs7Ozs7Ozs7Ozs7QUFFMUIsdUVBQStDO0FBQy9DLGdEQUE2QztBQUU3Qzs7O0dBR0c7QUFFSCxNQUFNLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHMUMsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsZ0JBQU07SUFHeEMsd0NBQXdDO0lBQ3hDLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLEdBQUc7SUFFSCxNQUFNO1FBQ0YsYUFBYTtRQUNiLGlCQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN4QixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixjQUFjO1FBRWQsK0JBQStCO1FBQy9CLHdGQUF3RjtJQUM1RixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixRQUFRO1lBQ1IsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDckM7UUFFRCxpQkFBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDeEIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDSixDQUFBO0FBOUJvQixRQUFRO0lBRDVCLE9BQU87R0FDYSxRQUFRLENBOEI1QjtrQkE5Qm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipAZGVzY3JpcHRpb24g5ri45oiP5bGC5YWs5YWx5Z+657G7ICovXG5cbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOa4uOaIj+inhuWbvuWfuuexuyzlpITnkIbkuobliY3lkI7lj7DliIfmjaLlr7nnvZHnu5zov5vooYzlkI7lj7DmnIDlpKflhYHorrjml7bpl7TlgZrnu5/kuIDlpITnkIYsXG4gKiDmuLjmiI/lsYLorr7nva7kuLpWaWV3Wk9yZGVyLnplcm9cbiAqL1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVWaWV3IGV4dGVuZHMgVUlWaWV3IHtcblxuXG4gICAgLy/ph43lhplzaG935Ye95pWw6Ieq5bex5aSE55CG6Ieq5bex55qE5ZaH5Y+t5L2N572uLOWmguaenOS4jeWGme+8jOm7mOiupOS4uuS4iuS4gOS4quWcuuaZr+eahOaYvuekuuS9jee9rlxuICAgIC8vc2hvdyhhcmdzOmFueVtdKXtcbiAgICAvLyAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgIC8vICAgIE1hbmFnZXIuaG9ybi51cGRhdGUoKTtcbiAgICAvL31cblxuICAgIG9uTG9hZCgpe1xuICAgICAgICAvL+iwg+eUqOi/m+WFpeWQjuWPsOmHjei/nueahOaXtumXtFxuICAgICAgICBNYW5hZ2VyLmdhbWVWaWV3ID0gdGhpcztcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG5cbiAgICAgICAgLy/pgJrnlKjlhazlhbHnvZHnu5zph43ov57nu4Tku7bmt7vliqBcblxuICAgICAgICAvL+i/m+WFpeWcuuaZr+WujOaIkO+8jOWNs29uTG9hZOacgOWQjuS4gOihjCAg5b+F6aG75Y+R6L+b5YWl5a6M5oiQ5LqL5Lu2XG4gICAgICAgIC8vZGlzcGF0Y2hFbnRlckNvbXBsZXRlKCB7dHlwZSA6IExvZ2ljVHlwZS5HQU1FLHZpZXdzOlt0aGlzXSxkYXRhIDogR2FtZU5hbWUubGlrdWlieSB9KTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKXtcbiAgICAgICAgaWYgKCB0aGlzLmF1ZGlvSGVscGVyICl7XG4gICAgICAgICAgICAvL+WBnOatouiDjOaZr+mfs+S5kFxuICAgICAgICAgICAgLy90aGlzLmF1ZGlvSGVscGVyLnN0b3BNdXNpYygpO1xuICAgICAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5zdG9wQWxsRWZmZWN0cygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBNYW5hZ2VyLmdhbWVWaWV3ID0gbnVsbDtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxufVxuIl19