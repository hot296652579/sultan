
import { EventApi } from "../event/EventApi";
import EventComponent from "../base/EventComponent";
import { Config } from "../../common/config/Config";
import PanelHelp from "../../msgbox/PanelHelp";
import { Manager } from "../../common/manager/Manager";

/**
 * @description 控制器基类 , 对service 的自动注入
 */

const { ccclass, property } = cc._decorator;

/**@description 控制器接口,在UIView中注入Service时必须实现 */
export interface IController<ServiceType>{
    service : ServiceType;
}

@ccclass
export default class Controller<ServiceType> extends EventComponent {

    /**
     * @description 这个变量会在脚本onLoad时自动赋值，使用者请勿进行修改
     */
    public get service() : ServiceType{
        return <any>(this._service);
    };
    public set service( value : ServiceType ) {
        this._service = <any>value;
    }

    protected bindingEvents(){
        super.bindingEvents();
        this.registerEvent(EventApi.NetEvent.ON_OPEN,this.onNetOpen);
        this.registerEvent(EventApi.NetEvent.ON_CLOSE,this.onNetClose);
        this.registerEvent(EventApi.NetEvent.ON_ERROR,this.onNetError);
    }

    protected onNetOpen() {
        if ( CC_DEBUG ) cc.log(`--Controller-- onNetOpen---`);
    }
    
    protected onNetClose( ev ) {
        if ( CC_DEBUG ) cc.log(`--Controller-- onNetClose---`);
    }
    protected onNetError( ev : Event ) {
        if ( CC_DEBUG ) cc.log(`--Controller-- onNetError---`);
    }

}
