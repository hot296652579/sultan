

const {ccclass, property} = cc._decorator;
let moveType = cc.Enum({
    horizontal:0,
    vertical:1
})
@ccclass
export default class MoveRepeatForever extends cc.Component {

    @property({
        type:moveType
    })
    moveType = moveType.horizontal;
    temp: number = 10;
    tweenAnim = null;

    

    onLoad () {
    }
    start(){
    }
  
    onDisable(){
        this.node.stopAllActions()
    }
    onEnable(){
        this.node.stopAllActions()
        if (this.moveType === moveType.horizontal ) {
            this.node.runAction(cc.repeatForever(
                cc.sequence(
                cc.moveBy(0.5,cc.v2(this.temp,0)),cc.moveBy(0.5,cc.v2(-this.temp,0)
                ))))
        }else{
            this.node.runAction(cc.repeatForever(
                cc.sequence(
                cc.moveBy(0.5,cc.v2(0,this.temp)),cc.moveBy(0.5,cc.v2(0,-this.temp)
                ))))
        }
    }

    // update (dt) {}
}
