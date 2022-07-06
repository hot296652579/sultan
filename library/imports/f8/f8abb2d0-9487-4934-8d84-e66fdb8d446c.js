"use strict";
cc._RF.push(module, 'f8abbLQlIdJNI2E5m/bjURs', 'DeviceData');
// script/data/DeviceData.ts

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
const BaseData_1 = __importDefault(require("../base/BaseData"));
const ClassDecorator_1 = __importDefault(require("../framework/decorator/ClassDecorator"));
let DeviceData = class DeviceData extends BaseData_1.default {
    constructor() {
        super();
        // 唯一码
        this.uuid = null;
        // 系统
        this.os = null;
        // 系统版本号
        this.osVersion = null;
    }
};
DeviceData = __decorate([
    ClassDecorator_1.default.classname
], DeviceData);
exports.default = DeviceData;

cc._RF.pop();