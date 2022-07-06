import BaseData from "../base/BaseData";

export interface DataParam<T extends BaseData> {
    // 数据类
    dataClass: DataClass<T>,
}

export interface DataClass<T extends BaseData> {
    new(): T;
}