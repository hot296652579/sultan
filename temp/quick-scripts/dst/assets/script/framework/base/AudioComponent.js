
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/AudioComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvQXVkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBc0Q7QUFDdEQsNENBQXVDO0FBRXZDOztHQUVHO0FBQ0gsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUVsRCxpQ0FBaUM7QUFDakMsTUFBTSxTQUFTO0lBQWY7UUFTVyxnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixpQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUNuQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQixjQUFTLEdBQWdCLElBQUksQ0FBQztRQUVwQixtQkFBYyxHQUFXLG9CQUFvQixDQUFDO1FBQzlDLG9CQUFlLEdBQVcscUJBQXFCLENBQUM7UUFDaEQseUJBQW9CLEdBQVcsK0JBQStCLENBQUM7UUFDL0QsMEJBQXFCLEdBQVcsZ0NBQWdDLENBQUM7SUF3QnRGLENBQUM7SUExQ1UsTUFBTSxLQUFLLFFBQVE7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBY08sSUFBSTtRQUVSLFFBQVE7UUFDUixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV0RixNQUFNO1FBQ04sSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxxQkFBcUI7SUFDZCxJQUFJO1FBQ1AsSUFBSTtZQUNBLG1CQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRSxtQkFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUxRSxtQkFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEUsbUJBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0U7UUFBQyxPQUFPLEtBQUssRUFBRTtTQUNmO0lBQ0wsQ0FBQzs7QUExQ2MsbUJBQVMsR0FBYyxJQUFJLENBQUM7QUErQy9DLElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXhEOztRQUVjLGNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBRXpDLCtDQUErQztRQUN4QyxVQUFLLEdBQVcsSUFBSSxDQUFDO1FBRXBCLGNBQVMsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQXVMdkQsQ0FBQztJQXJMRyx5QkFBeUI7SUFDekIsSUFBVyxXQUFXLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDL0QsSUFBVyxXQUFXLENBQUMsTUFBTTtRQUN6QixJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztJQUN4QyxDQUFDO0lBQUEsQ0FBQztJQUNGLHVCQUF1QjtJQUN2QixJQUFXLFlBQVksS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNqRSxJQUFXLFlBQVksQ0FBQyxNQUFNO1FBQzFCLElBQUksS0FBSyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDekIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQUFBLENBQUM7SUFFRix1QkFBdUI7SUFDdkIsSUFBVyxVQUFVLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsSUFBVyxVQUFVLENBQUMsS0FBSztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUYseUJBQXlCO0lBQ3pCLElBQVcsU0FBUyxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNELDJCQUEyQjtJQUNwQixlQUFlLENBQUMsSUFBYSxFQUFFLFNBQWtCLElBQUk7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ25CLE9BQU87YUFDVjtZQUNELElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFEO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0YsNEJBQTRCO0lBQzVCLElBQVcsV0FBVyxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQy9ELElBQVcsV0FBVyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUEsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUVyRSxJQUFXLFNBQVMsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCxJQUFXLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUVqRSxxQkFBcUI7SUFDZCxJQUFJO1FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQscUJBQXFCO0lBQ2QsVUFBVSxDQUFDLFdBQW1CLElBQUk7UUFDckMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxPQUFPO2FBQ1Y7WUFDRCxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQ0k7WUFDRCxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ2hDLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRU0sY0FBYztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLFNBQVM7UUFDWixFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTSxTQUFTLENBQUMsR0FBVyxFQUFFLE1BQW1CLEVBQUUsT0FBZ0IsSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLO1FBQ25GLE9BQU8sSUFBSSxPQUFPLENBQXNDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDaEUsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM1QixPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxPQUFPO2lCQUNWO2FBQ0o7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7Z0JBQzFCLG1CQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDMUUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxzQkFBWSxDQUFDO3dCQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzt3QkFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO3dCQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0NBQ1osbUJBQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzZCQUMxRDtpQ0FBTTtnQ0FDSCxtQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUM1Qzt5QkFDSjt3QkFFRCxVQUFVO3dCQUNWLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDakIsVUFBVTt3QkFDVixFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ3JDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQzFDO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7cUJBQzNDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTSxVQUFVLENBQUMsR0FBVyxFQUFFLE1BQW1CLEVBQUUsT0FBZ0IsS0FBSztRQUNyRSxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM1QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWixPQUFPO2lCQUNWO2FBQ0o7WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO2dCQUMzQixtQkFBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzFFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDaEIsSUFBSSxJQUFJLEVBQUU7NEJBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxzQkFBWSxDQUFDOzRCQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs0QkFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs0QkFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dDQUNaLG1CQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzs2QkFDMUQ7aUNBQU07Z0NBQ0gsbUJBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDNUM7NEJBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUN0RTt3QkFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3ZDO2dCQUVMLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Y7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QixFQUFFLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxnQkFBd0I7UUFDOUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixFQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUVKLENBQUE7QUE5TG9CLGNBQWM7SUFGbEMsT0FBTztJQUNQLElBQUksQ0FBQywrQkFBK0IsQ0FBQztHQUNqQixjQUFjLENBOExsQztrQkE5TG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFJlc291cmNlSW5mbywgQlVORExFX1RZUEUgfSBmcm9tIFwiLi9EZWZpbmVzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZyYW1ld29ya1wiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDlo7Dpn7Pnu4Tku7ZcbiAqL1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLyoqQGRlc2NyaXB0aW9uIOahhuaetuWGhemDqOS9v+eUqO+8jOWklumDqOivt+S4jeimgeiwg+eUqCAqL1xuY2xhc3MgQXVkaW9EYXRhIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEF1ZGlvRGF0YSA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBBdWRpb0RhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgfVxuICAgIHB1YmxpYyBtdXNpY1ZvbHVtZSA9IDEwMDtcbiAgICBwdWJsaWMgZWZmZWN0Vm9sdW1lID0gMTAwO1xuICAgIHB1YmxpYyBpc0VmZmVjdE9uID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNNdXNpY09uID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3VyTXVzaWNVcmwgPSBcIlwiO1xuICAgIHB1YmxpYyBjdXJFZmZlY3RJZCA9IC0xO1xuICAgIHB1YmxpYyBjdXJCdW5kbGU6IEJVTkRMRV9UWVBFID0gbnVsbDtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0b3JlTXVzaWNLZXk6IHN0cmluZyA9IFwiZGVmYXVsdF9zYXZlX211c2ljXCI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfc3RvcmVFZmZlY3RLZXk6IHN0cmluZyA9IFwiZGVmYXVsdF9zYXZlX2VmZmVjdFwiO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0b3JlTXVzaWNWb2x1bWVLZXk6IHN0cmluZyA9IFwiZGVmYXVsdF9zYXZlX211c2ljX3ZvbHVtZV9rZXlcIjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zdG9yZUVmZmVjdFZvbHVtZUtleTogc3RyaW5nID0gXCJkZWZhdWx0X3NhdmVfZWZmZWN0X3ZvbHVtZV9rZXlcIjtcblxuICAgIHByaXZhdGUgaW5pdCgpIHtcblxuICAgICAgICAvL+mfs+mHj+W8gOWFs+ivu+WPllxuICAgICAgICB0aGlzLmlzTXVzaWNPbiA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fc3RvcmVNdXNpY0tleSwgdGhpcy5pc011c2ljT24pO1xuICAgICAgICB0aGlzLmlzRWZmZWN0T24gPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX3N0b3JlRWZmZWN0S2V5LCB0aGlzLmlzRWZmZWN0T24pO1xuXG4gICAgICAgIC8v6Z+z6YeP6K+75Y+WXG4gICAgICAgIHRoaXMubXVzaWNWb2x1bWUgPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX3N0b3JlTXVzaWNWb2x1bWVLZXksIHRoaXMubXVzaWNWb2x1bWUpO1xuICAgICAgICB0aGlzLmVmZmVjdFZvbHVtZSA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fc3RvcmVFZmZlY3RWb2x1bWVLZXksIHRoaXMuZWZmZWN0Vm9sdW1lKTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5a2Y5YKoICovXG4gICAgcHVibGljIHNhdmUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX3N0b3JlTXVzaWNLZXksIHRoaXMuaXNNdXNpY09uKTtcbiAgICAgICAgICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fc3RvcmVNdXNpY1ZvbHVtZUtleSwgdGhpcy5tdXNpY1ZvbHVtZSk7XG5cbiAgICAgICAgICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fc3RvcmVFZmZlY3RLZXksIHRoaXMuaXNFZmZlY3RPbik7XG4gICAgICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX3N0b3JlRWZmZWN0Vm9sdW1lS2V5LCB0aGlzLmVmZmVjdFZvbHVtZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBjY2NsYXNzXG5AbWVudShcImZyYW1ld29yay9iYXNlL0F1ZGlvQ29tcG9uZW50XCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb0NvbXBvbmVudCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcm90ZWN0ZWQgYXVkaW9EYXRhID0gQXVkaW9EYXRhLmluc3RhbmNlO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOmfs+mikeaOp+S7tui1hOa6kOaLpeacieiAhe+8jOivpeWvueixoeeUsVVJTWFuYWdlcuaJk+W8gOeahOeVjOmdoiAqL1xuICAgIHB1YmxpYyBvd25lcjogVUlWaWV3ID0gbnVsbDtcblxuICAgIHByaXZhdGUgZWZmZWN0TWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOiDjOaZr+mfs+S5kOmfs+mHjyAqL1xuICAgIHB1YmxpYyBnZXQgbXVzaWNWb2x1bWUoKSB7IHJldHVybiB0aGlzLmF1ZGlvRGF0YS5tdXNpY1ZvbHVtZTsgfVxuICAgIHB1YmxpYyBzZXQgbXVzaWNWb2x1bWUodm9sdW1lKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHZvbHVtZSAvIDEwMDtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUodmFsdWUpO1xuICAgICAgICBpZiAodm9sdW1lIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcE11c2ljKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdWRpb0RhdGEubXVzaWNWb2x1bWUgPSB2b2x1bWU7XG4gICAgfTtcbiAgICAvKipAZGVzY3JpcHRpb24g6Z+z5pWI6Z+z6YePICovXG4gICAgcHVibGljIGdldCBlZmZlY3RWb2x1bWUoKSB7IHJldHVybiB0aGlzLmF1ZGlvRGF0YS5lZmZlY3RWb2x1bWU7IH1cbiAgICBwdWJsaWMgc2V0IGVmZmVjdFZvbHVtZSh2b2x1bWUpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdm9sdW1lIC8gMTAwO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKHZhbHVlKTtcbiAgICAgICAgaWYgKHZvbHVtZSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BFZmZlY3QoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF1ZGlvRGF0YS5lZmZlY3RWb2x1bWUgPSB2b2x1bWU7XG4gICAgfTtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDpn7PmlYjlvIDlhbMgKi9cbiAgICBwdWJsaWMgZ2V0IGlzRWZmZWN0T24oKSB7IHJldHVybiB0aGlzLmF1ZGlvRGF0YS5pc0VmZmVjdE9uOyB9XG4gICAgcHVibGljIHNldCBpc0VmZmVjdE9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYXVkaW9EYXRhLmlzRWZmZWN0T24gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEVmZmVjdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDog4zmma/pn7PkuZDlvIDlhbMgKi9cbiAgICBwdWJsaWMgZ2V0IGlzTXVzaWNPbigpIHsgcmV0dXJuIHRoaXMuYXVkaW9EYXRhLmlzTXVzaWNPbjsgfVxuICAgIC8qKkBkZXNjcmlwdGlvbiDorr7nva7og4zmma/pn7PkuZDlvIDlhbMgKi9cbiAgICBwdWJsaWMgc2V0TXVzaWNFbmFibGVkKGlzT246IGJvb2xlYW4sIGlzUGxheTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hdWRpb0RhdGEuaXNNdXNpY09uID0gaXNPbjtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvRGF0YS5pc011c2ljT24pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJNdXNpY1VybCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1BsYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlNdXNpYyh0aGlzLmN1ck11c2ljVXJsLCB0aGlzLmN1ckJ1bmRsZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BNdXNpYygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipAZGVzY3JpcHRpb24g5b2T5YmN5pKt5pS+55qE6IOM5pmv6Z+z5LmQICovXG4gICAgcHVibGljIGdldCBjdXJNdXNpY1VybCgpIHsgcmV0dXJuIHRoaXMuYXVkaW9EYXRhLmN1ck11c2ljVXJsOyB9XG4gICAgcHVibGljIHNldCBjdXJNdXNpY1VybCh2YWx1ZSkgeyB0aGlzLmF1ZGlvRGF0YS5jdXJNdXNpY1VybCA9IHZhbHVlIH07XG5cbiAgICBwdWJsaWMgZ2V0IGN1ckJ1bmRsZSgpIHsgcmV0dXJuIHRoaXMuYXVkaW9EYXRhLmN1ckJ1bmRsZTsgfVxuICAgIHB1YmxpYyBzZXQgY3VyQnVuZGxlKHZhbHVlKSB7IHRoaXMuYXVkaW9EYXRhLmN1ckJ1bmRsZSA9IHZhbHVlOyB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5a2Y5YKoICovXG4gICAgcHVibGljIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuYXVkaW9EYXRhLnNhdmUoKTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5YGc5q2iICovXG4gICAgcHVibGljIHN0b3BFZmZlY3QoZWZmZWN0SWQ6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgaWYgKGVmZmVjdElkID09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvRGF0YS5jdXJFZmZlY3RJZCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wRWZmZWN0KHRoaXMuYXVkaW9EYXRhLmN1ckVmZmVjdElkKTtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9EYXRhLmN1ckVmZmVjdElkID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wRWZmZWN0KGVmZmVjdElkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wRWZmZWN0QnlQYXRoKHBhdGg6IHN0cmluZykge1xuICAgICAgICBsZXQgaWQ6IG51bWJlciA9IHRoaXMuZWZmZWN0TWFwLmdldChwYXRoKTtcbiAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEVmZmVjdChpZCk7XG4gICAgICAgICAgICB0aGlzLmVmZmVjdE1hcC5kZWxldGUocGF0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcEFsbEVmZmVjdHMoKSB7XG4gICAgICAgIHRoaXMuZWZmZWN0TWFwLmNsZWFyKCk7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGxFZmZlY3RzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3BNdXNpYygpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlNdXNpYyh1cmw6IHN0cmluZywgYnVuZGxlOiBCVU5ETEVfVFlQRSwgbG9vcDogYm9vbGVhbiA9IHRydWUsIHJldGFpbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IHVybDogc3RyaW5nLCBpc1N1Y2Nlc3M6IGJvb2xlYW4gfT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vd25lcikge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihg5b+F6aG76KaB5oyH5a6a6LWE5rqQ55qE566h55CG6YO95omN6IO95pKt5pS+YCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyB1cmw6IHVybCwgaXNTdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXVkaW9EYXRhLmN1ck11c2ljVXJsID0gdXJsO1xuICAgICAgICAgICAgdGhpcy5hdWRpb0RhdGEuY3VyQnVuZGxlID0gYnVuZGxlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXVkaW9EYXRhLmlzTXVzaWNPbikge1xuICAgICAgICAgICAgICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldENhY2hlQnlBc3luYyh1cmwsIGNjLkF1ZGlvQ2xpcCwgYnVuZGxlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIHRoaXMub3duZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gbmV3IFJlc291cmNlSW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8udXJsID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mby50eXBlID0gY2MuQXVkaW9DbGlwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYnVuZGxlID0gYnVuZGxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vd25lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5hZGRMb2NhbChpbmZvLCB0aGlzLm93bmVyLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIuZ2FyYmFnZS5hZGRMb2NhbChpbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5YGc5o6J5b2T5YmN5pKt5pS+6Z+z5LmQXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BNdXNpYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/mkq3mlL7mlrDnmoTog4zmma/pn7PkuZBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhkYXRhLCBsb29wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyB1cmw6IHVybCwgaXNTdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHVybDogdXJsLCBpc1N1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlFZmZlY3QodXJsOiBzdHJpbmcsIGJ1bmRsZTogQlVORExFX1RZUEUsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm93bmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGDlv4XpobvopoHmjIflrprotYTmupDnmoTnrqHnkIbpg73miY3og73mkq3mlL5gKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hdWRpb0RhdGEuaXNFZmZlY3RPbikge1xuICAgICAgICAgICAgICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldENhY2hlQnlBc3luYyh1cmwsIGNjLkF1ZGlvQ2xpcCwgYnVuZGxlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IG5ldyBSZXNvdXJjZUluZm87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby51cmwgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby50eXBlID0gY2MuQXVkaW9DbGlwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5idW5kbGUgPSBidW5kbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3duZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIuYWRkTG9jYWwoaW5mbywgdGhpcy5vd25lci5jbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLmdhcmJhZ2UuYWRkTG9jYWwoaW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpb0RhdGEuY3VyRWZmZWN0SWQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGRhdGEsIGxvb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdE1hcC5zZXQodXJsLCB0aGlzLmF1ZGlvRGF0YS5jdXJFZmZlY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYXVkaW9EYXRhLmN1ckVmZmVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9EYXRhLmN1ckVmZmVjdElkID0gLTE7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkVudGVyQmFja2dyb3VuZCgpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25FbnRlckZvcmdlZ3JvdW5kKGluQmFja2dyb3VuZFRpbWU6IG51bWJlcikge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGxFZmZlY3RzKCk7XG4gICAgfVxuXG59XG4iXX0=