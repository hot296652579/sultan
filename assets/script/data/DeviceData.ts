import BaseData from "../base/BaseData";
import ClassDecorator from "../framework/decorator/ClassDecorator";

@ClassDecorator.classname
export default class DeviceData extends BaseData {

    // 唯一码
    public uuid: string = null;
    // 系统
    public os: string = null;
    // 系统版本号
    public osVersion: string = null;

    constructor() {
        super();

    }


}