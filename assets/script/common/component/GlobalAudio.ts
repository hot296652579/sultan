/*
 * @Author: your name
 * @Date: 2019-11-20 19:04:21
 * @LastEditTime: 2020-04-10 15:27:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ddz\assets\common\component\GlobalAudio.ts
 */
import AudioComponent from "../../framework/base/AudioComponent";
import { BUNDLE_TYPE, BUNDLE_RESOURCES } from "../../framework/base/Defines";
import { Manager } from "../manager/Manager";

/**
 * @description 全局音频播放组棒
 */

const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu("common/component/GlobalAudio")
export default class GlobalAudio extends AudioComponent {

    public playMusic(url: string, bundle: BUNDLE_TYPE, loop: boolean = true) {
        let me = this;
        return new Promise<{ url: string, isSuccess: boolean }>((resolve) => {
            if (this.audioData) {
                this.audioData.curMusicUrl = url;
                this.audioData.curBundle = bundle;
                if (this.audioData.isMusicOn) {
                    Manager.cacheManager.getCacheByAsync(url, cc.AudioClip,bundle).then((data) => {
                        if (data) {
                            me.stopMusic();
                            cc.audioEngine.playMusic(data, loop);
                            resolve({ url: url, isSuccess: true });
                        } else {
                            resolve({ url: url, isSuccess: false });
                        }
                    });
                }
            }
            
        });

    }

    public playEffect(url: string, bundle:BUNDLE_TYPE, loop: boolean = false) {
        return new Promise<number>((resolve) => {
            if (this.audioData) {
                if (this.audioData.isEffectOn) {
                    Manager.cacheManager.getCacheByAsync(url, cc.AudioClip,bundle).then((data) => {
                        if (this.audioData) {
                            if (data) {
                                this.audioData.curEffectId = cc.audioEngine.playEffect(data, loop);
                                resolve(this.audioData.curEffectId);
                            } else {
                                resolve(this.audioData.curEffectId);
                            }     
                        }
                        
                    });
                } else {
                    this.audioData.curEffectId = -1;
                    resolve(-1);
                }
            }
            
        });
    }

    onLoad(){
        this.effectVolume = this.audioData.effectVolume;
        this.musicVolume = this.audioData.musicVolume;
    }
}
