
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/GlobalAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9HbG9iYWxBdWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSCx5RkFBaUU7QUFFakUsZ0RBQTZDO0FBRTdDOztHQUVHO0FBRUgsTUFBTSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUkvQyxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVksU0FBUSx3QkFBYztJQUU1QyxTQUFTLENBQUMsR0FBVyxFQUFFLE1BQW1CLEVBQUUsT0FBZ0IsSUFBSTtRQUNuRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZCxPQUFPLElBQUksT0FBTyxDQUFzQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2hFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQ2xDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7b0JBQzFCLGlCQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDekUsSUFBSSxJQUFJLEVBQUU7NEJBQ04sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUNmLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDckMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt5QkFDMUM7NkJBQU07NEJBQ0gsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt5QkFDM0M7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDSjtRQUVMLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVNLFVBQVUsQ0FBQyxHQUFXLEVBQUUsTUFBa0IsRUFBRSxPQUFnQixLQUFLO1FBQ3BFLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7b0JBQzNCLGlCQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDekUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFOzRCQUNoQixJQUFJLElBQUksRUFBRTtnQ0FDTixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQ25FLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUN2QztpQ0FBTTtnQ0FDSCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQzs2QkFDdkM7eUJBQ0o7b0JBRUwsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNmO2FBQ0o7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ2xELENBQUM7Q0FDSixDQUFBO0FBckRvQixXQUFXO0lBRi9CLE9BQU87SUFDUCxJQUFJLENBQUMsOEJBQThCLENBQUM7R0FDaEIsV0FBVyxDQXFEL0I7a0JBckRvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBBdXRob3I6IHlvdXIgbmFtZVxuICogQERhdGU6IDIwMTktMTEtMjAgMTk6MDQ6MjFcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjAtMDQtMTAgMTU6Mjc6MTlcbiAqIEBMYXN0RWRpdG9yczogUGxlYXNlIHNldCBMYXN0RWRpdG9yc1xuICogQERlc2NyaXB0aW9uOiBJbiBVc2VyIFNldHRpbmdzIEVkaXRcbiAqIEBGaWxlUGF0aDogXFxkZHpcXGFzc2V0c1xcY29tbW9uXFxjb21wb25lbnRcXEdsb2JhbEF1ZGlvLnRzXG4gKi9cbmltcG9ydCBBdWRpb0NvbXBvbmVudCBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvQXVkaW9Db21wb25lbnRcIjtcbmltcG9ydCB7IEJVTkRMRV9UWVBFLCBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOWFqOWxgOmfs+mikeaSreaUvue7hOajklxuICovXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eSxtZW51fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AbWVudShcImNvbW1vbi9jb21wb25lbnQvR2xvYmFsQXVkaW9cIilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsb2JhbEF1ZGlvIGV4dGVuZHMgQXVkaW9Db21wb25lbnQge1xuXG4gICAgcHVibGljIHBsYXlNdXNpYyh1cmw6IHN0cmluZywgYnVuZGxlOiBCVU5ETEVfVFlQRSwgbG9vcDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgdXJsOiBzdHJpbmcsIGlzU3VjY2VzczogYm9vbGVhbiB9PigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXVkaW9EYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0RhdGEuY3VyTXVzaWNVcmwgPSB1cmw7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0RhdGEuY3VyQnVuZGxlID0gYnVuZGxlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvRGF0YS5pc011c2ljT24pIHtcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5jYWNoZU1hbmFnZXIuZ2V0Q2FjaGVCeUFzeW5jKHVybCwgY2MuQXVkaW9DbGlwLGJ1bmRsZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5zdG9wTXVzaWMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoZGF0YSwgbG9vcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHVybDogdXJsLCBpc1N1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyB1cmw6IHVybCwgaXNTdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlFZmZlY3QodXJsOiBzdHJpbmcsIGJ1bmRsZTpCVU5ETEVfVFlQRSwgbG9vcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdWRpb0RhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdWRpb0RhdGEuaXNFZmZlY3RPbikge1xuICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5nZXRDYWNoZUJ5QXN5bmModXJsLCBjYy5BdWRpb0NsaXAsYnVuZGxlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdWRpb0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvRGF0YS5jdXJFZmZlY3RJZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoZGF0YSwgbG9vcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hdWRpb0RhdGEuY3VyRWZmZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hdWRpb0RhdGEuY3VyRWZmZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9EYXRhLmN1ckVmZmVjdElkID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5lZmZlY3RWb2x1bWUgPSB0aGlzLmF1ZGlvRGF0YS5lZmZlY3RWb2x1bWU7XG4gICAgICAgIHRoaXMubXVzaWNWb2x1bWUgPSB0aGlzLmF1ZGlvRGF0YS5tdXNpY1ZvbHVtZTtcbiAgICB9XG59XG4iXX0=