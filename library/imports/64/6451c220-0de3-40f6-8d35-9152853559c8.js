"use strict";
cc._RF.push(module, '6451cIgDeNA9o01kVKFNVnI', 'AudioComponent');
// script/framework/base/AudioComponent.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Defines_1 = require("./Defines");
const Framework_1 = require("../Framework");
/**
 * @description 声音组件
 */
const { ccclass, property, menu } = cc._decorator;
/**@description 框架内部使用，外部请不要调用 */
class AudioData {
    constructor() {
        this.musicVolume = 100;
        this.effectVolume = 100;
        this.isEffectOn = true;
        this.isMusicOn = true;
        this.curMusicUrl = "";
        this.curEffectId = -1;
        this.curBundle = null;
        this._storeMusicKey = "default_save_music";
        this._storeEffectKey = "default_save_effect";
        this._storeMusicVolumeKey = "default_save_music_volume_key";
        this._storeEffectVolumeKey = "default_save_effect_volume_key";
    }
    static get instance() {
        if (this._instance == null) {
            this._instance = new AudioData();
            this._instance.init();
        }
        return this._instance;
    }
    init() {
        //音量开关读取
        this.isMusicOn = Framework_1.Manager.localStorage.getItem(this._storeMusicKey, this.isMusicOn);
        this.isEffectOn = Framework_1.Manager.localStorage.getItem(this._storeEffectKey, this.isEffectOn);
        //音量读取
        this.musicVolume = Framework_1.Manager.localStorage.getItem(this._storeMusicVolumeKey, this.musicVolume);
        this.effectVolume = Framework_1.Manager.localStorage.getItem(this._storeEffectVolumeKey, this.effectVolume);
    }
    /**@description 存储 */
    save() {
        try {
            Framework_1.Manager.localStorage.setItem(this._storeMusicKey, this.isMusicOn);
            Framework_1.Manager.localStorage.setItem(this._storeMusicVolumeKey, this.musicVolume);
            Framework_1.Manager.localStorage.setItem(this._storeEffectKey, this.isEffectOn);
            Framework_1.Manager.localStorage.setItem(this._storeEffectVolumeKey, this.effectVolume);
        }
        catch (error) {
        }
    }
}
AudioData._instance = null;
let AudioComponent = class AudioComponent extends cc.Component {
    constructor() {
        super(...arguments);
        this.audioData = AudioData.instance;
        /**@description 音频控件资源拥有者，该对象由UIManager打开的界面 */
        this.owner = null;
        this.effectMap = new Map();
    }
    /**@description 背景音乐音量 */
    get musicVolume() { return this.audioData.musicVolume; }
    set musicVolume(volume) {
        let value = volume / 100;
        cc.audioEngine.setMusicVolume(value);
        if (volume <= 0) {
            this.stopMusic();
        }
        this.audioData.musicVolume = volume;
    }
    ;
    /**@description 音效音量 */
    get effectVolume() { return this.audioData.effectVolume; }
    set effectVolume(volume) {
        let value = volume / 100;
        cc.audioEngine.setEffectsVolume(value);
        if (volume <= 0) {
            this.stopEffect();
        }
        this.audioData.effectVolume = volume;
    }
    ;
    /**@description 音效开关 */
    get isEffectOn() { return this.audioData.isEffectOn; }
    set isEffectOn(value) {
        this.audioData.isEffectOn = value;
        this.save();
        if (!value) {
            this.stopEffect();
        }
    }
    ;
    /**@description 背景音乐开关 */
    get isMusicOn() { return this.audioData.isMusicOn; }
    /**@description 设置背景音乐开关 */
    setMusicEnabled(isOn, isPlay = true) {
        this.audioData.isMusicOn = isOn;
        this.save();
        if (this.audioData.isMusicOn) {
            if (!this.curMusicUrl) {
                return;
            }
            if (isPlay) {
                this.playMusic(this.curMusicUrl, this.curBundle, true);
            }
        }
        else {
            this.stopMusic();
        }
    }
    ;
    /**@description 当前播放的背景音乐 */
    get curMusicUrl() { return this.audioData.curMusicUrl; }
    set curMusicUrl(value) { this.audioData.curMusicUrl = value; }
    ;
    get curBundle() { return this.audioData.curBundle; }
    set curBundle(value) { this.audioData.curBundle = value; }
    /**@description 存储 */
    save() {
        this.audioData.save();
    }
    /**@description 停止 */
    stopEffect(effectId = null) {
        if (effectId == null) {
            if (this.audioData.curEffectId < 0) {
                return;
            }
            cc.audioEngine.stopEffect(this.audioData.curEffectId);
            this.audioData.curEffectId = -1;
        }
        else {
            cc.audioEngine.stopEffect(effectId);
        }
    }
    stopEffectByPath(path) {
        let id = this.effectMap.get(path);
        if (id !== null && id !== undefined) {
            this.stopEffect(id);
            this.effectMap.delete(path);
        }
    }
    stopAllEffects() {
        this.effectMap.clear();
        cc.audioEngine.stopAllEffects();
    }
    stopMusic() {
        cc.audioEngine.stopMusic();
    }
    playMusic(url, bundle, loop = true, retain = false) {
        return new Promise((resolve) => {
            if (CC_DEBUG) {
                if (!this.owner) {
                    cc.error(`必须要指定资源的管理都才能播放`);
                    resolve({ url: url, isSuccess: false });
                    return;
                }
            }
            this.audioData.curMusicUrl = url;
            this.audioData.curBundle = bundle;
            if (this.audioData.isMusicOn) {
                Framework_1.Manager.cacheManager.getCacheByAsync(url, cc.AudioClip, bundle).then((data) => {
                    if (data && this.owner) {
                        let info = new Defines_1.ResourceInfo;
                        info.url = url;
                        info.type = cc.AudioClip;
                        info.data = data;
                        info.bundle = bundle;
                        if (!retain) {
                            if (this.owner) {
                                Framework_1.Manager.uiManager.addLocal(info, this.owner.className);
                            }
                            else {
                                Framework_1.Manager.uiManager.garbage.addLocal(info);
                            }
                        }
                        //停掉当前播放音乐
                        this.stopMusic();
                        //播放新的背景音乐
                        cc.audioEngine.playMusic(data, loop);
                        resolve({ url: url, isSuccess: true });
                    }
                    else {
                        resolve({ url: url, isSuccess: false });
                    }
                });
            }
        });
    }
    playEffect(url, bundle, loop = false) {
        return new Promise((resolve) => {
            if (CC_DEBUG) {
                if (!this.owner) {
                    cc.error(`必须要指定资源的管理都才能播放`);
                    resolve(-1);
                    return;
                }
            }
            if (this.audioData.isEffectOn) {
                Framework_1.Manager.cacheManager.getCacheByAsync(url, cc.AudioClip, bundle).then((data) => {
                    if (this.audioData) {
                        if (data) {
                            let info = new Defines_1.ResourceInfo;
                            info.url = url;
                            info.type = cc.AudioClip;
                            info.data = data;
                            info.bundle = bundle;
                            if (this.owner) {
                                Framework_1.Manager.uiManager.addLocal(info, this.owner.className);
                            }
                            else {
                                Framework_1.Manager.uiManager.garbage.addLocal(info);
                            }
                            this.audioData.curEffectId = cc.audioEngine.playEffect(data, loop);
                        }
                        this.effectMap.set(url, this.audioData.curEffectId);
                        resolve(this.audioData.curEffectId);
                    }
                });
            }
            else {
                this.audioData.curEffectId = -1;
                resolve(-1);
            }
        });
    }
    onEnterBackground() {
        cc.audioEngine.pauseMusic();
        cc.audioEngine.pauseAllEffects();
    }
    onEnterForgeground(inBackgroundTime) {
        cc.audioEngine.resumeMusic();
        cc.audioEngine.resumeAllEffects();
    }
};
AudioComponent = __decorate([
    ccclass,
    menu("framework/base/AudioComponent")
], AudioComponent);
exports.default = AudioComponent;

cc._RF.pop();