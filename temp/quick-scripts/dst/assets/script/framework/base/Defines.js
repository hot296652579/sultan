
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/Defines.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67315ILTptCJ6ugLWRGRR1Y', 'Defines');
// script/framework/base/Defines.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USING_LAN_KEY = exports.ENABLE_CHANGE_LANGUAGE = exports.BUNDLE_REMOTE = exports.BUNDLE_RESOURCES = exports.ViewStatus = exports.ResourceCacheData = exports.ResourceInfo = exports.ResourceType = exports.ResourceCacheStatus = void 0;
/**
 * @description 资源加载缓存数据
 */
var ResourceCacheStatus;
(function (ResourceCacheStatus) {
    /**@description 无状态 */
    ResourceCacheStatus[ResourceCacheStatus["NONE"] = 0] = "NONE";
    /**@description 等待释放 */
    ResourceCacheStatus[ResourceCacheStatus["WAITTING_FOR_RELEASE"] = 1] = "WAITTING_FOR_RELEASE";
})(ResourceCacheStatus = exports.ResourceCacheStatus || (exports.ResourceCacheStatus = {}));
/**@description 资源类型 */
var ResourceType;
(function (ResourceType) {
    /**@description 本地 */
    ResourceType[ResourceType["Local"] = 0] = "Local";
    /**@description 远程资源 */
    ResourceType[ResourceType["Remote"] = 1] = "Remote";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
/**@description 资源信息 */
class ResourceInfo {
    constructor() {
        this.url = "";
        this.type = null;
        this.data = null;
        this.assetUrl = "";
        /**@description 是否常驻内存，远程加载资源有效 */
        this.retain = false;
        this.bundle = null;
    }
}
exports.ResourceInfo = ResourceInfo;
class ResourceCacheData {
    constructor() {
        /**@description 加载资源url地址 */
        this.url = "";
        /**@description 是否已经加载完成 */
        this.isLoaded = false;
        /**@description 加载完成数据
         * cc.Prefab
         * cc.SpriteAtlas
         * cc.SpriteFrame
         * cc.AudioClip
         * cc.Font
         * sp.SkeletonData
         * cc.ParticleAsset
         * cc.Texture2D
         * cc.JsonAsset
         * */
        this.data = null;
        /**@description 加载资源类型 */
        this.assetType = null;
        this.status = ResourceCacheStatus.NONE;
        this.bundle = null;
        /**@description 在加载过程中有地方获取,加载完成后再回调 */
        this.getCb = [];
        /**@description 完成回调，在资源正在加载过程中，又有其它地方调用加载同一个资源，此时需要等待资源加载完成，统一回调 */
        this.finishCb = [];
        /**@description jsb下载完成回调 */
        this.jsbFinishCb = null;
        /**@description 远程下载资源保存本地的物理路径，仅在JSB情况下有效 */
        this.jsbStoragePath = null;
        /**@description 默认为本地资源 */
        this.resourceType = ResourceType.Local;
    }
    doGet(data) {
        for (let i = 0; i < this.getCb.length; i++) {
            if (this.getCb[i])
                this.getCb[i](data);
        }
        this.getCb = [];
    }
    doFinish(data) {
        for (let i = 0; i < this.finishCb.length; i++) {
            if (this.finishCb[i])
                this.finishCb[i](data);
        }
        this.finishCb = [];
    }
    doJsbFinish(data) {
        if (this.jsbFinishCb) {
            this.jsbFinishCb(data);
        }
        this.jsbFinishCb = null;
    }
}
exports.ResourceCacheData = ResourceCacheData;
/**
 * @description 界面视图状态
 * 界面控制器,各界面的类名不能相同，即使是放在不同文件夹下面，也会认为是同一类型，建议加上模块前缀
 */
var ViewStatus;
(function (ViewStatus) {
    /**@description 等待关闭 */
    ViewStatus[ViewStatus["WAITTING_CLOSE"] = 0] = "WAITTING_CLOSE";
    /**@description 等待隐藏 */
    ViewStatus[ViewStatus["WATITING_HIDE"] = 1] = "WATITING_HIDE";
    /**@description 无状态 */
    ViewStatus[ViewStatus["WAITTING_NONE"] = 2] = "WAITTING_NONE";
})(ViewStatus = exports.ViewStatus || (exports.ViewStatus = {}));
exports.BUNDLE_RESOURCES = 'resources';
exports.BUNDLE_REMOTE = "__Remote__Caches__";
/**@description 是否允许游戏启动后切换语言 */
exports.ENABLE_CHANGE_LANGUAGE = true;
/**@description 语言包路径使用前缀 */
exports.USING_LAN_KEY = "i18n.";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvRGVmaW5lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQTs7R0FFRztBQUNILElBQVksbUJBS1g7QUFMRCxXQUFZLG1CQUFtQjtJQUMzQixzQkFBc0I7SUFDdEIsNkRBQUksQ0FBQTtJQUNKLHVCQUF1QjtJQUN2Qiw2RkFBb0IsQ0FBQTtBQUN4QixDQUFDLEVBTFcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFLOUI7QUFFRCx1QkFBdUI7QUFDdkIsSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBQ3BCLHFCQUFxQjtJQUNyQixpREFBSyxDQUFBO0lBQ0wsdUJBQXVCO0lBQ3ZCLG1EQUFNLENBQUE7QUFDVixDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRCx1QkFBdUI7QUFDdkIsTUFBYSxZQUFZO0lBQXpCO1FBQ0ksUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQixTQUFJLEdBQW9CLElBQUksQ0FBQztRQUM3QixTQUFJLEdBQWEsSUFBSSxDQUFDO1FBQ3RCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsa0NBQWtDO1FBQ2xDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsV0FBTSxHQUFnQixJQUFJLENBQUM7SUFDL0IsQ0FBQztDQUFBO0FBUkQsb0NBUUM7QUFFRCxNQUFhLGlCQUFpQjtJQUE5QjtRQUVJLDRCQUE0QjtRQUM1QixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2pCLDJCQUEyQjtRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCOzs7Ozs7Ozs7O2FBVUs7UUFDTCxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBRXRCLHlCQUF5QjtRQUN6QixjQUFTLEdBQW9CLElBQUksQ0FBQztRQUVsQyxXQUFNLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBRWxDLFdBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBRTNCLHVDQUF1QztRQUN2QyxVQUFLLEdBQTRCLEVBQUUsQ0FBQztRQUVwQyxvRUFBb0U7UUFDcEUsYUFBUSxHQUE0QixFQUFFLENBQUM7UUFFdkMsNEJBQTRCO1FBQzVCLGdCQUFXLEdBQXdCLElBQUksQ0FBQztRQUV4Qyw2Q0FBNkM7UUFDN0MsbUJBQWMsR0FBVyxJQUFJLENBQUM7UUFFOUIsMEJBQTBCO1FBQzFCLGlCQUFZLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFzQnBELENBQUM7SUFwQlUsS0FBSyxDQUFDLElBQUk7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFJO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sV0FBVyxDQUFDLElBQUk7UUFDbkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0NBQ0o7QUE3REQsOENBNkRDO0FBaUJEOzs7R0FHRztBQUVILElBQVksVUFPWDtBQVBELFdBQVksVUFBVTtJQUNsQix1QkFBdUI7SUFDdkIsK0RBQWMsQ0FBQTtJQUNkLHVCQUF1QjtJQUN2Qiw2REFBYSxDQUFBO0lBQ2Isc0JBQXNCO0lBQ3RCLDZEQUFhLENBQUE7QUFDakIsQ0FBQyxFQVBXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBT3JCO0FBSVksUUFBQSxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7QUFFL0IsUUFBQSxhQUFhLEdBQUcsb0JBQW9CLENBQUM7QUFFbEQsZ0NBQWdDO0FBQ25CLFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0FBQzNDLDRCQUE0QjtBQUNmLFFBQUEsYUFBYSxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiB5b3VyIG5hbWVcbiAqIEBEYXRlOiAyMDE5LTExLTIwIDE5OjA0OjIxXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIwLTA0LTAxIDE4OjA2OjA5XG4gKiBATGFzdEVkaXRvcnM6IFBsZWFzZSBzZXQgTGFzdEVkaXRvcnNcbiAqIEBEZXNjcmlwdGlvbjogSW4gVXNlciBTZXR0aW5ncyBFZGl0XG4gKiBARmlsZVBhdGg6IFxcZGR6XFxhc3NldHNcXGZyYW1ld29ya1xcbG9hZGVyXFxEZWZpbmVzLnRzXG4gKi9cbmltcG9ydCBVSVZpZXcsIHsgVUlDbGFzcyB9IGZyb20gXCIuLi91aS9VSVZpZXdcIjtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6LWE5rqQ5Yqg6L2957yT5a2Y5pWw5o2uIFxuICovXG5leHBvcnQgZW51bSBSZXNvdXJjZUNhY2hlU3RhdHVzIHtcbiAgICAvKipAZGVzY3JpcHRpb24g5peg54q25oCBICovXG4gICAgTk9ORSxcbiAgICAvKipAZGVzY3JpcHRpb24g562J5b6F6YeK5pS+ICovXG4gICAgV0FJVFRJTkdfRk9SX1JFTEVBU0UsXG59XG5cbi8qKkBkZXNjcmlwdGlvbiDotYTmupDnsbvlnosgKi9cbmV4cG9ydCBlbnVtIFJlc291cmNlVHlwZSB7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOacrOWcsCAqL1xuICAgIExvY2FsLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDov5znqIvotYTmupAgKi9cbiAgICBSZW1vdGUsXG59XG5cbi8qKkBkZXNjcmlwdGlvbiDotYTmupDkv6Hmga8gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUluZm8ge1xuICAgIHVybDogc3RyaW5nID0gXCJcIjtcbiAgICB0eXBlOiB0eXBlb2YgY2MuQXNzZXQgPSBudWxsO1xuICAgIGRhdGE6IGNjLkFzc2V0ID0gbnVsbDtcbiAgICBhc3NldFVybDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipAZGVzY3JpcHRpb24g5piv5ZCm5bi46am75YaF5a2Y77yM6L+c56iL5Yqg6L296LWE5rqQ5pyJ5pWIICovXG4gICAgcmV0YWluOiBib29sZWFuID0gZmFsc2U7XG4gICAgYnVuZGxlOiBCVU5ETEVfVFlQRSA9IG51bGw7XG59XG5cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNhY2hlRGF0YSB7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5Yqg6L296LWE5rqQdXJs5Zyw5Z2AICovXG4gICAgdXJsOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDmmK/lkKblt7Lnu4/liqDovb3lrozmiJAgKi9cbiAgICBpc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDliqDovb3lrozmiJDmlbDmja4gXG4gICAgICogY2MuUHJlZmFiIFxuICAgICAqIGNjLlNwcml0ZUF0bGFzIFxuICAgICAqIGNjLlNwcml0ZUZyYW1lIFxuICAgICAqIGNjLkF1ZGlvQ2xpcCBcbiAgICAgKiBjYy5Gb250IFxuICAgICAqIHNwLlNrZWxldG9uRGF0YSBcbiAgICAgKiBjYy5QYXJ0aWNsZUFzc2V0IFxuICAgICAqIGNjLlRleHR1cmUyRFxuICAgICAqIGNjLkpzb25Bc3NldFxuICAgICAqICovXG4gICAgZGF0YTogY2MuQXNzZXQgPSBudWxsO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWKoOi9vei1hOa6kOexu+WeiyAqL1xuICAgIGFzc2V0VHlwZTogdHlwZW9mIGNjLkFzc2V0ID0gbnVsbDtcblxuICAgIHN0YXR1cyA9IFJlc291cmNlQ2FjaGVTdGF0dXMuTk9ORTtcblxuICAgIGJ1bmRsZTogQlVORExFX1RZUEUgPSBudWxsO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWcqOWKoOi9vei/h+eoi+S4reacieWcsOaWueiOt+WPlizliqDovb3lrozmiJDlkI7lho3lm57osIMgKi9cbiAgICBnZXRDYjogKChkYXRhOiBhbnkpID0+IHZvaWQpW10gPSBbXTtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDlrozmiJDlm57osIPvvIzlnKjotYTmupDmraPlnKjliqDovb3ov4fnqIvkuK3vvIzlj4jmnInlhbblroPlnLDmlrnosIPnlKjliqDovb3lkIzkuIDkuKrotYTmupDvvIzmraTml7bpnIDopoHnrYnlvoXotYTmupDliqDovb3lrozmiJDvvIznu5/kuIDlm57osIMgKi9cbiAgICBmaW5pc2hDYjogKChkYXRhOiBhbnkpID0+IHZvaWQpW10gPSBbXTtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiBqc2LkuIvovb3lrozmiJDlm57osIMgKi9cbiAgICBqc2JGaW5pc2hDYjogKGRhdGE6IGFueSkgPT4gdm9pZCA9IG51bGw7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6L+c56iL5LiL6L296LWE5rqQ5L+d5a2Y5pys5Zyw55qE54mp55CG6Lev5b6E77yM5LuF5ZyoSlNC5oOF5Ya15LiL5pyJ5pWIICovXG4gICAganNiU3RvcmFnZVBhdGg6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6buY6K6k5Li65pys5Zyw6LWE5rqQICovXG4gICAgcmVzb3VyY2VUeXBlOiBSZXNvdXJjZVR5cGUgPSBSZXNvdXJjZVR5cGUuTG9jYWw7XG5cbiAgICBwdWJsaWMgZG9HZXQoZGF0YSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0Q2IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldENiW2ldKSB0aGlzLmdldENiW2ldKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0Q2IgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9GaW5pc2goZGF0YSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmluaXNoQ2IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbmlzaENiW2ldKSB0aGlzLmZpbmlzaENiW2ldKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmluaXNoQ2IgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9Kc2JGaW5pc2goZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5qc2JGaW5pc2hDYikge1xuICAgICAgICAgICAgdGhpcy5qc2JGaW5pc2hDYihkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmpzYkZpbmlzaENiID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb3VyY2VEYXRhIHtcbiAgICAvKipAZGVzY3JpcHRpb24gcmVzb3VyY2VzIOebruW9lXVybCDkuI4gdHlwZSDlv4XpobvmiJDlr7nlh7rnjrAqL1xuICAgIHVybD86IHN0cmluZyxcbiAgICAvKipAZGVzY3JpcHRpb24g6LWE5rqQ57G75Z6LIOS4jiB1cmwg5b+F6aG75oiQ5a+55Ye6546wIOebruWJjeaUr+aMgemihOWKoOi9veeahOi1hOa6kOaciWNjLlByZWZhYiB8IGNjLlNwcml0ZUZyYW1lIHwgc3AuU2tlbGV0b25EYXRhKi9cbiAgICB0eXBlPzogdHlwZW9mIGNjLkFzc2V0LFxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDpooTliqDovb3nlYzpnaLvvIzkuI3pnIDopoHlr7l1cmwgdHlwZei1i+WAvCBcbiAgICAgKiDlpoJHYW1lVmlld+a4uOaIj+eVjOmdou+8jOmcgOimgeaPkOWJjeebtOaOpeWKoOi9veWlveeVjOmdou+8jOiAjOS4jeaYr+WPquWKoOi9vemihOe9ruS9k++8jFxuICAgICAqIOWcqOe9kee7nOa2iOaBr+adpeeahOaXtumXtO+8jOeUqOmihOe9ruS9k+WKoOi9veeVjOmdoui/mOaYr+mcgOimgeS4gOWumueahOaXtumXtO+8jFxuICAgICAqIOS7juiAjOS8mumAoOaIkOa2iOaBr+WkhOeQhuS4jeaYr+mhuuW6j+aJp+ihjCBcbiAgICAgKiAqL1xuICAgIHByZWxvYWRWaWV3PzogVUlDbGFzczxVSVZpZXc+LFxuICAgIGJ1bmRsZT86IEJVTkRMRV9UWVBFLFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDnlYzpnaLop4blm77nirbmgIFcbiAqIOeVjOmdouaOp+WItuWZqCzlkITnlYzpnaLnmoTnsbvlkI3kuI3og73nm7jlkIzvvIzljbPkvb/mmK/mlL7lnKjkuI3lkIzmlofku7blpLnkuIvpnaLvvIzkuZ/kvJrorqTkuLrmmK/lkIzkuIDnsbvlnovvvIzlu7rorq7liqDkuIrmqKHlnZfliY3nvIBcbiAqL1xuXG5leHBvcnQgZW51bSBWaWV3U3RhdHVzIHtcbiAgICAvKipAZGVzY3JpcHRpb24g562J5b6F5YWz6ZetICovXG4gICAgV0FJVFRJTkdfQ0xPU0UsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOetieW+hemakOiXjyAqL1xuICAgIFdBVElUSU5HX0hJREUsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOaXoOeKtuaAgSAqL1xuICAgIFdBSVRUSU5HX05PTkUsXG59XG5cbmV4cG9ydCB0eXBlIEJVTkRMRV9UWVBFID0gc3RyaW5nIHwgY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZTtcblxuZXhwb3J0IGNvbnN0IEJVTkRMRV9SRVNPVVJDRVMgPSAncmVzb3VyY2VzJztcblxuZXhwb3J0IGNvbnN0IEJVTkRMRV9SRU1PVEUgPSBcIl9fUmVtb3RlX19DYWNoZXNfX1wiO1xuXG4vKipAZGVzY3JpcHRpb24g5piv5ZCm5YWB6K645ri45oiP5ZCv5Yqo5ZCO5YiH5o2i6K+t6KiAICovXG5leHBvcnQgY29uc3QgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSA9IHRydWU7XG4vKipAZGVzY3JpcHRpb24g6K+t6KiA5YyF6Lev5b6E5L2/55So5YmN57yAICovXG5leHBvcnQgY29uc3QgVVNJTkdfTEFOX0tFWSA9IFwiaTE4bi5cIjsiXX0=