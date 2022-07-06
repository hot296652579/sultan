"use strict";
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