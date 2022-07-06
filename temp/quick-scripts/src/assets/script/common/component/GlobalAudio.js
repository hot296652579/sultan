"use strict";
cc._RF.push(module, '1facfFsEXlCYKgKMntC7Wla', 'GlobalAudio');
// script/common/component/GlobalAudio.ts

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
/*
 * @Author: your name
 * @Date: 2019-11-20 19:04:21
 * @LastEditTime: 2020-04-10 15:27:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ddz\assets\common\component\GlobalAudio.ts
 */
const AudioComponent_1 = __importDefault(require("../../framework/base/AudioComponent"));
const Manager_1 = require("../manager/Manager");
/**
 * @description 全局音频播放组棒
 */
const { ccclass, property, menu } = cc._decorator;
let GlobalAudio = class GlobalAudio extends AudioComponent_1.default {
    playMusic(url, bundle, loop = true) {
        let me = this;
        return new Promise((resolve) => {
            if (this.audioData) {
                this.audioData.curMusicUrl = url;
                this.audioData.curBundle = bundle;
                if (this.audioData.isMusicOn) {
                    Manager_1.Manager.cacheManager.getCacheByAsync(url, cc.AudioClip, bundle).then((data) => {
                        if (data) {
                            me.stopMusic();
                            cc.audioEngine.playMusic(data, loop);
                            resolve({ url: url, isSuccess: true });
                        }
                        else {
                            resolve({ url: url, isSuccess: false });
                        }
                    });
                }
            }
        });
    }
    playEffect(url, bundle, loop = false) {
        return new Promise((resolve) => {
            if (this.audioData) {
                if (this.audioData.isEffectOn) {
                    Manager_1.Manager.cacheManager.getCacheByAsync(url, cc.AudioClip, bundle).then((data) => {
                        if (this.audioData) {
                            if (data) {
                                this.audioData.curEffectId = cc.audioEngine.playEffect(data, loop);
                                resolve(this.audioData.curEffectId);
                            }
                            else {
                                resolve(this.audioData.curEffectId);
                            }
                        }
                    });
                }
                else {
                    this.audioData.curEffectId = -1;
                    resolve(-1);
                }
            }
        });
    }
    onLoad() {
        this.effectVolume = this.audioData.effectVolume;
        this.musicVolume = this.audioData.musicVolume;
    }
};
GlobalAudio = __decorate([
    ccclass,
    menu("common/component/GlobalAudio")
], GlobalAudio);
exports.default = GlobalAudio;

cc._RF.pop();