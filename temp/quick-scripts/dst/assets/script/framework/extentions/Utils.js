
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/extentions/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b839bYlRdMVqgOZ6FF4A6j', 'Utils');
// script/framework/extentions/Utils.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeWithPrefab = exports.setSkeletonSkeletonData = exports.setLabelFont = exports.setParticleSystemFile = exports.setButtonSpriteFrame = exports.ButtonSpriteMemberName = exports.setSpriteSpriteFrame = exports.getBundle = exports.addRemoteLoadResource = exports.addExtraLoadResource = void 0;
const UIView_1 = __importDefault(require("../ui/UIView"));
const Defines_1 = require("../base/Defines");
const Framework_1 = require("../Framework");
/*
 * @Author: your name
 * @Date: 2020-03-20 10:07:02
 * @LastEditTime: 2020-04-10 15:29:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ddz\assets\framework\extentions\Utils.ts
 */
/**@description 添加加载本地的资源 */
function addExtraLoadResource(view, info) {
    let uiManager = Framework_1.Manager.uiManager;
    if (view == (uiManager.retainMemory)) {
        uiManager.retainMemory.addLocal(info);
    }
    else if (view && view instanceof UIView_1.default) {
        uiManager.addLocal(info, view.className);
    }
    else {
        uiManager.garbage.addLocal(info);
    }
}
exports.addExtraLoadResource = addExtraLoadResource;
/**@description 添加加载远程的资源 */
function addRemoteLoadResource(view, info) {
    let uiManager = Framework_1.Manager.uiManager;
    if (view == (uiManager.retainMemory)) {
        uiManager.retainMemory.addRemote(info);
    }
    else if (view && view instanceof UIView_1.default) {
        uiManager.addRemote(info, view.className);
    }
    else {
        uiManager.garbage.addRemote(info);
    }
}
exports.addRemoteLoadResource = addRemoteLoadResource;
/**@description 获取Bundle,如果没有传入，会默认指定当前View打开时的bundle,否则批定resources */
function getBundle(config) {
    let bundle = Defines_1.BUNDLE_RESOURCES;
    if (config.bundle != Defines_1.BUNDLE_RESOURCES) {
        if (config.view) {
            bundle = config.view.bundle;
        }
    }
    return bundle;
}
exports.getBundle = getBundle;
function isValidComponent(component) {
    if (cc.isValid(component) && component.node && cc.isValid(component.node)) {
        return true;
    }
    return false;
}
/**
 * @description 设置cc.Sprite组件精灵帧
 * @param {*} view 持有视图
 * @param {*} url url
 * @param {*} sprite Sprite组件
 * @param {*} spriteFrame 新的精灵帧
 * @param {*} completeCallback 完成回调(data: cc.SpriteFrame) => void
 * @param {*} resourceType 资源类型 默认为ResourceType.Local
 * @param {*} retain 是否常驻内存 默认为false
 * @param {*} isAtlas 是否是大纹理图集加载 默认为false
 */
function setSpriteSpriteFrame(view, url, sprite, spriteFrame, completeCallback, bundle, resourceType = Defines_1.ResourceType.Local, retain = false, isAtlas = false) {
    if (!isAtlas) {
        //纹理只需要把纹理单独添加引用，不需要把spirteFrame也添加引用
        let info = new Defines_1.ResourceInfo;
        info.url = url;
        info.type = cc.SpriteFrame;
        info.data = spriteFrame;
        info.retain = retain;
        info.bundle = bundle;
        if (resourceType == Defines_1.ResourceType.Remote) {
            addRemoteLoadResource(view, info);
        }
        else {
            addExtraLoadResource(view, info);
        }
    }
    if (spriteFrame && isValidComponent(sprite)) {
        let oldSpriteFrame = sprite.spriteFrame;
        let replaceData = cc.isValid(spriteFrame) ? spriteFrame : null;
        try {
            if (replaceData)
                sprite.spriteFrame = replaceData;
            if (completeCallback)
                completeCallback(replaceData);
        }
        catch (error) {
            let temp = cc.isValid(oldSpriteFrame) ? oldSpriteFrame : null;
            sprite.spriteFrame = temp;
            if (completeCallback)
                completeCallback(null);
            //把数据放到全局的垃圾回收中 //好像有点不行，
            cc.error(`${url} : ${error ? error : "replace spriteframe error"}`);
        }
    }
    else {
        //完成回调
        if (completeCallback && isValidComponent(sprite))
            completeCallback(spriteFrame);
    }
}
exports.setSpriteSpriteFrame = setSpriteSpriteFrame;
var ButtonSpriteMemberName;
(function (ButtonSpriteMemberName) {
    ButtonSpriteMemberName["Norml"] = "normalSprite";
    ButtonSpriteMemberName["Pressed"] = "pressedSprite";
    ButtonSpriteMemberName["Hover"] = "hoverSprite";
    ButtonSpriteMemberName["Disable"] = "disabledSprite";
})(ButtonSpriteMemberName = exports.ButtonSpriteMemberName || (exports.ButtonSpriteMemberName = {}));
/**
 * @description 设置按钮精灵帧
 * @param view 持有视图
 * @param url url
 * @param button
 * @param spriteFrame 新的spriteFrame
 * @param memberName 替换成员变量名
 * @param completeCallback 完成回调
 * @param isAtlas 是否是从大纹理图集中加载的
 */
function _setSpriteFrame(view, url, button, spriteFrame, memberName, completeCallback, isAtlas, bundle) {
    if (!isAtlas) {
        let info = new Defines_1.ResourceInfo;
        info.url = url;
        info.type = cc.SpriteFrame;
        info.data = spriteFrame;
        info.bundle = bundle;
        addExtraLoadResource(view, info);
    }
    if (spriteFrame && isValidComponent(button)) {
        let oldSpriteFrame = button[memberName];
        try {
            let replaceData = cc.isValid(spriteFrame) ? spriteFrame : null;
            if (replaceData)
                button[memberName] = replaceData;
            if (completeCallback)
                completeCallback(memberName, replaceData);
        }
        catch (error) {
            let temp = cc.isValid(oldSpriteFrame) ? oldSpriteFrame : null;
            button[memberName] = temp;
            if (completeCallback)
                completeCallback(memberName, null);
            //把数据放到全局的垃圾回收中 //好像有点不行，
            cc.error(`${url} : ${error ? error : "replace spriteframe error"}`);
        }
    }
    else {
        if (completeCallback && isValidComponent(button))
            completeCallback(memberName, spriteFrame);
    }
}
;
/**
 * @description 设置按钮精灵帧
 * @param button 按钮组件
 * @param memberName 成员变量名
 * @param view 持有视图
 * @param url url
 * @param spriteFrame 待替换的精灵帧
 * @param completeCallback 完成回调
 * @param isAtlas 是否是从大纹理图集中加载的 默认为false
 */
function _setButtonSpriteFrame(button, memberName, view, url, spriteFrame, completeCallback, bundle, isAtlas = false) {
    if (spriteFrame && isValidComponent(button)) {
        _setSpriteFrame(view, url, button, spriteFrame, memberName, completeCallback, isAtlas, bundle);
    }
    else {
        //完成回调
        if (completeCallback && isValidComponent(button))
            completeCallback(memberName, spriteFrame);
    }
}
/**
 * @description 根据类型设置按钮
 * @param button
 * @param memberName 成员变量名
 * @param view
 * @param url
 * @param completeCallback
 */
function _setButtonWithType(button, memberName, view, url, completeCallback, bundle) {
    if (url) {
        if (typeof url == "string") {
            Framework_1.Manager.cacheManager.getCacheByAsync(url, cc.SpriteFrame, bundle).then((spriteFrame) => {
                _setButtonSpriteFrame(button, memberName, view, url, spriteFrame, completeCallback, bundle);
            });
        }
        else {
            //在纹理图集中查找
            Framework_1.Manager.cacheManager.getSpriteFrameByAsync(url.urls, url.key, view, addExtraLoadResource, bundle).then((data) => {
                if (data && data.isTryReload) {
                    //来到这里面，程序已经崩溃，无意义在处理
                }
                else {
                    _setButtonSpriteFrame(button, memberName, view, data.url, data.spriteFrame, completeCallback, bundle, true);
                }
            });
        }
    }
}
/**
 * @description 设置按钮精灵
 * @param button 按钮组件
 * @param config 配置信息
 */
function setButtonSpriteFrame(button, config) {
    let bundle = getBundle(config);
    _setButtonWithType(button, ButtonSpriteMemberName.Norml, config.view, config.normalSprite, config.completeCallback, bundle);
    _setButtonWithType(button, ButtonSpriteMemberName.Pressed, config.view, config.pressedSprite, config.completeCallback, bundle);
    _setButtonWithType(button, ButtonSpriteMemberName.Hover, config.view, config.hoverSprite, config.completeCallback, bundle);
    _setButtonWithType(button, ButtonSpriteMemberName.Disable, config.view, config.disabledSprite, config.completeCallback, bundle);
}
exports.setButtonSpriteFrame = setButtonSpriteFrame;
/**
 * @description 设置特效
 * @param component 特效组件
 * @param config 配置信息
 * @param data 特效数据
 */
function setParticleSystemFile(component, config, data) {
    let info = new Defines_1.ResourceInfo;
    info.url = config.url;
    info.type = cc.ParticleAsset;
    info.data = data;
    info.bundle = getBundle(config);
    addExtraLoadResource(config.view, info);
    if (data && isValidComponent(component)) {
        let oldFile = component.file;
        try {
            let replaceData = cc.isValid(data) ? data : null;
            if (replaceData)
                component.file = replaceData;
            if (config.completeCallback)
                config.completeCallback(replaceData);
        }
        catch (error) {
            let temp = cc.isValid(oldFile) ? oldFile : null;
            component.file = temp;
            if (config.completeCallback)
                config.completeCallback(null);
            //把数据放到全局的垃圾回收中 //好像有点不行，
            cc.error(`${config.url} : ${error ? error : "replace file error"}`);
        }
    }
    else {
        //完成回调
        if (config.completeCallback && isValidComponent(component))
            config.completeCallback(data);
    }
}
exports.setParticleSystemFile = setParticleSystemFile;
/**
 * @description 设置字体
 * @param component 字体组件
 * @param config 配置信息
 * @param data 字体数据
 */
function setLabelFont(component, config, data) {
    let info = new Defines_1.ResourceInfo;
    info.url = config.font;
    info.type = cc.Font;
    info.data = data;
    info.bundle = getBundle(config);
    addExtraLoadResource(config.view, info);
    if (data && isValidComponent(component)) {
        let oldFont = component.font;
        try {
            let replaceData = cc.isValid(data) ? data : null;
            if (replaceData)
                component.font = replaceData;
            if (config.completeCallback)
                config.completeCallback(replaceData);
        }
        catch (error) {
            let temp = cc.isValid(oldFont) ? oldFont : null;
            component.font = temp;
            if (config.completeCallback)
                config.completeCallback(null);
            //把数据放到全局的垃圾回收中 //好像有点不行，
            cc.error(`${config.font} : ${error ? error : "replace font error"}`);
        }
    }
    else {
        //完成回调
        if (config.completeCallback && isValidComponent(component))
            config.completeCallback(data);
    }
}
exports.setLabelFont = setLabelFont;
/**
 * @description 设置spine动画数据
 * @param component spine组件
 * @param config 配置信息
 * @param data 动画数据
 */
function setSkeletonSkeletonData(component, config, data, resourceType = Defines_1.ResourceType.Local) {
    let url = "";
    let retain = false;
    if (resourceType == Defines_1.ResourceType.Remote) {
        let realConfig = config;
        url = `${realConfig.path}/${realConfig.name}`;
        retain = realConfig.retain ? true : false;
    }
    else {
        let realConfig = config;
        url = realConfig.url;
    }
    let info = new Defines_1.ResourceInfo;
    info.url = url;
    info.type = sp.SkeletonData;
    info.data = data;
    info.retain = retain;
    info.bundle = getBundle(config);
    if (resourceType == Defines_1.ResourceType.Remote) {
        addRemoteLoadResource(config.view, info);
    }
    else {
        addExtraLoadResource(config.view, info);
    }
    if (data && isValidComponent(component)) {
        let oldSkeletonData = component.skeletonData;
        try {
            let replaceData = cc.isValid(data) ? data : null;
            if (replaceData)
                component.skeletonData = replaceData;
            if (config.completeCallback)
                config.completeCallback(replaceData);
        }
        catch (error) {
            let temp = cc.isValid(oldSkeletonData) ? oldSkeletonData : null;
            component.skeletonData = temp;
            if (config.completeCallback)
                config.completeCallback(null);
            //把数据放到全局的垃圾回收中 //好像有点不行，
            cc.error(`${url} : ${error ? error : "replace skeletonData error"}`);
        }
    }
    else {
        //完成回调
        if (config.completeCallback && isValidComponent(component))
            config.completeCallback(data);
    }
}
exports.setSkeletonSkeletonData = setSkeletonSkeletonData;
/**
 * @description 通过预置体创建Node
 * @param config 配置信息
 */
function createNodeWithPrefab(config, data) {
    let info = new Defines_1.ResourceInfo;
    info.url = config.url;
    info.type = cc.Prefab;
    info.data = data;
    info.bundle = getBundle(config);
    addExtraLoadResource(config.view, info);
    if (data && isValidComponent(config.view) && config.completeCallback) {
        let node = cc.instantiate(data);
        config.completeCallback(node);
    }
}
exports.createNodeWithPrefab = createNodeWithPrefab;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWtDO0FBQ2xDLDZDQUErRTtBQUMvRSw0Q0FBdUM7QUFFdkM7Ozs7Ozs7R0FPRztBQUVILDRCQUE0QjtBQUM1QixTQUFnQixvQkFBb0IsQ0FBQyxJQUFZLEVBQUUsSUFBa0I7SUFDakUsSUFBSSxTQUFTLEdBQUcsbUJBQU8sQ0FBQyxTQUFTLENBQUM7SUFDbEMsSUFBSSxJQUFJLElBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDdkMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekM7U0FDSSxJQUFJLElBQUksSUFBSSxJQUFJLFlBQVksZ0JBQU0sRUFBRTtRQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDNUM7U0FBTTtRQUNILFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0wsQ0FBQztBQVZELG9EQVVDO0FBRUQsNEJBQTRCO0FBQzVCLFNBQWdCLHFCQUFxQixDQUFDLElBQVksRUFBRSxJQUFrQjtJQUNsRSxJQUFJLFNBQVMsR0FBRyxtQkFBTyxDQUFDLFNBQVMsQ0FBQztJQUNsQyxJQUFJLElBQUksSUFBUyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN2QyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQztTQUNJLElBQUksSUFBSSxJQUFJLElBQUksWUFBWSxnQkFBTSxFQUFFO1FBQ3JDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3QztTQUFNO1FBQ0gsU0FBUyxDQUFDLE9BQU8sQ0FB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U0FBZ0Isb0JBQW9CLENBQUMsTUFBa0csRUFBRSxJQUFlO0lBQ3BKLElBQUksSUFBSSxHQUFHLElBQUksc0JBQVksQ0FBQztJQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsSUFBSSxJQUFJLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtRQUNsRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQztBQUNMLENBQUM7QUFYRCxvREFXQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgUmVzb3VyY2VJbmZvLCBSZXNvdXJjZVR5cGUsIEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZyYW1ld29ya1wiO1xuXG4vKlxuICogQEF1dGhvcjogeW91ciBuYW1lXG4gKiBARGF0ZTogMjAyMC0wMy0yMCAxMDowNzowMlxuICogQExhc3RFZGl0VGltZTogMjAyMC0wNC0xMCAxNToyOToxNFxuICogQExhc3RFZGl0b3JzOiBQbGVhc2Ugc2V0IExhc3RFZGl0b3JzXG4gKiBARGVzY3JpcHRpb246IEluIFVzZXIgU2V0dGluZ3MgRWRpdFxuICogQEZpbGVQYXRoOiBcXGRkelxcYXNzZXRzXFxmcmFtZXdvcmtcXGV4dGVudGlvbnNcXFV0aWxzLnRzXG4gKi9cblxuLyoqQGRlc2NyaXB0aW9uIOa3u+WKoOWKoOi9veacrOWcsOeahOi1hOa6kCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEV4dHJhTG9hZFJlc291cmNlKHZpZXc6IFVJVmlldywgaW5mbzogUmVzb3VyY2VJbmZvKSB7XG4gICAgbGV0IHVpTWFuYWdlciA9IE1hbmFnZXIudWlNYW5hZ2VyO1xuICAgIGlmICh2aWV3ID09IDxhbnk+KHVpTWFuYWdlci5yZXRhaW5NZW1vcnkpKSB7XG4gICAgICAgIHVpTWFuYWdlci5yZXRhaW5NZW1vcnkuYWRkTG9jYWwoaW5mbyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHZpZXcgJiYgdmlldyBpbnN0YW5jZW9mIFVJVmlldykge1xuICAgICAgICB1aU1hbmFnZXIuYWRkTG9jYWwoaW5mbywgdmlldy5jbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVpTWFuYWdlci5nYXJiYWdlLmFkZExvY2FsKGluZm8pO1xuICAgIH1cbn1cblxuLyoqQGRlc2NyaXB0aW9uIOa3u+WKoOWKoOi9vei/nOeoi+eahOi1hOa6kCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlbW90ZUxvYWRSZXNvdXJjZSh2aWV3OiBVSVZpZXcsIGluZm86IFJlc291cmNlSW5mbykge1xuICAgIGxldCB1aU1hbmFnZXIgPSBNYW5hZ2VyLnVpTWFuYWdlcjtcbiAgICBpZiAodmlldyA9PSA8YW55Pih1aU1hbmFnZXIucmV0YWluTWVtb3J5KSkge1xuICAgICAgICB1aU1hbmFnZXIucmV0YWluTWVtb3J5LmFkZFJlbW90ZShpbmZvKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmlldyAmJiB2aWV3IGluc3RhbmNlb2YgVUlWaWV3KSB7XG4gICAgICAgIHVpTWFuYWdlci5hZGRSZW1vdGUoaW5mbywgdmlldy5jbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVpTWFuYWdlci5nYXJiYWdlLmFkZFJlbW90ZShpbmZvKTtcbiAgICB9XG59XG5cbi8qKkBkZXNjcmlwdGlvbiDojrflj5ZCdW5kbGUs5aaC5p6c5rKh5pyJ5Lyg5YWl77yM5Lya6buY6K6k5oyH5a6a5b2T5YmNVmlld+aJk+W8gOaXtueahGJ1bmRsZSzlkKbliJnmibnlrppyZXNvdXJjZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCdW5kbGUoIGNvbmZpZyA6IHsgYnVuZGxlPyA6IEJVTkRMRV9UWVBFICwgdmlldz8gOiBVSVZpZXd9KXtcbiAgICBsZXQgYnVuZGxlIDogQlVORExFX1RZUEUgPSBCVU5ETEVfUkVTT1VSQ0VTO1xuICAgIGlmICggY29uZmlnLmJ1bmRsZSAhPSBCVU5ETEVfUkVTT1VSQ0VTICl7XG4gICAgICAgIGlmKCBjb25maWcudmlldyApe1xuICAgICAgICAgICAgYnVuZGxlID0gY29uZmlnLnZpZXcuYnVuZGxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBidW5kbGU7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRDb21wb25lbnQoY29tcG9uZW50OiBjYy5Db21wb25lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoY2MuaXNWYWxpZChjb21wb25lbnQpICYmIGNvbXBvbmVudC5ub2RlICYmIGNjLmlzVmFsaWQoY29tcG9uZW50Lm5vZGUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOiuvue9rmNjLlNwcml0Zee7hOS7tueyvueBteW4p1xuICogQHBhcmFtIHsqfSB2aWV3IOaMgeacieinhuWbvlxuICogQHBhcmFtIHsqfSB1cmwgdXJsXG4gKiBAcGFyYW0geyp9IHNwcml0ZSBTcHJpdGXnu4Tku7ZcbiAqIEBwYXJhbSB7Kn0gc3ByaXRlRnJhbWUg5paw55qE57K+54G15binXG4gKiBAcGFyYW0geyp9IGNvbXBsZXRlQ2FsbGJhY2sg5a6M5oiQ5Zue6LCDKGRhdGE6IGNjLlNwcml0ZUZyYW1lKSA9PiB2b2lkXG4gKiBAcGFyYW0geyp9IHJlc291cmNlVHlwZSDotYTmupDnsbvlnosg6buY6K6k5Li6UmVzb3VyY2VUeXBlLkxvY2FsXG4gKiBAcGFyYW0geyp9IHJldGFpbiDmmK/lkKbluLjpqbvlhoXlrZgg6buY6K6k5Li6ZmFsc2VcbiAqIEBwYXJhbSB7Kn0gaXNBdGxhcyDmmK/lkKbmmK/lpKfnurnnkIblm77pm4bliqDovb0g6buY6K6k5Li6ZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNwcml0ZVNwcml0ZUZyYW1lKFxuICAgIHZpZXc6IFVJVmlldyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBzcHJpdGU6IGNjLlNwcml0ZSxcbiAgICBzcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgY29tcGxldGVDYWxsYmFjazogKGRhdGE6IGNjLlNwcml0ZUZyYW1lKSA9PiB2b2lkLFxuICAgIGJ1bmRsZTpCVU5ETEVfVFlQRSxcbiAgICByZXNvdXJjZVR5cGU6IFJlc291cmNlVHlwZSA9IFJlc291cmNlVHlwZS5Mb2NhbCxcbiAgICByZXRhaW46IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBpc0F0bGFzOiBib29sZWFuID0gZmFsc2UpIHtcblxuICAgIGlmICghaXNBdGxhcykge1xuICAgICAgICAvL+e6ueeQhuWPqumcgOimgeaKiue6ueeQhuWNleeLrOa3u+WKoOW8leeUqO+8jOS4jemcgOimgeaKinNwaXJ0ZUZyYW1l5Lmf5re75Yqg5byV55SoXG4gICAgICAgIGxldCBpbmZvID0gbmV3IFJlc291cmNlSW5mbztcbiAgICAgICAgaW5mby51cmwgPSB1cmw7XG4gICAgICAgIGluZm8udHlwZSA9IGNjLlNwcml0ZUZyYW1lO1xuICAgICAgICBpbmZvLmRhdGEgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgaW5mby5yZXRhaW4gPSByZXRhaW47XG4gICAgICAgIGluZm8uYnVuZGxlID0gYnVuZGxlO1xuICAgICAgICBpZiAocmVzb3VyY2VUeXBlID09IFJlc291cmNlVHlwZS5SZW1vdGUpIHtcbiAgICAgICAgICAgIGFkZFJlbW90ZUxvYWRSZXNvdXJjZSh2aWV3LCBpbmZvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZEV4dHJhTG9hZFJlc291cmNlKHZpZXcsIGluZm8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNwcml0ZUZyYW1lICYmIGlzVmFsaWRDb21wb25lbnQoc3ByaXRlKSkge1xuICAgICAgICBsZXQgb2xkU3ByaXRlRnJhbWUgPSBzcHJpdGUuc3ByaXRlRnJhbWU7XG4gICAgICAgIGxldCByZXBsYWNlRGF0YSA9IGNjLmlzVmFsaWQoc3ByaXRlRnJhbWUpID8gc3ByaXRlRnJhbWUgOiBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJlcGxhY2VEYXRhKSBzcHJpdGUuc3ByaXRlRnJhbWUgPSByZXBsYWNlRGF0YTtcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSBjb21wbGV0ZUNhbGxiYWNrKHJlcGxhY2VEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gY2MuaXNWYWxpZChvbGRTcHJpdGVGcmFtZSkgPyBvbGRTcHJpdGVGcmFtZSA6IG51bGw7XG4gICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0ZW1wO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIGNvbXBsZXRlQ2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAvL+aKiuaVsOaNruaUvuWIsOWFqOWxgOeahOWeg+WcvuWbnuaUtuS4rSAvL+WlveWDj+acieeCueS4jeihjO+8jFxuICAgICAgICAgICAgY2MuZXJyb3IoYCR7dXJsfSA6ICR7ZXJyb3IgPyBlcnJvciA6IFwicmVwbGFjZSBzcHJpdGVmcmFtZSBlcnJvclwifWApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy/lrozmiJDlm57osINcbiAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2sgJiYgaXNWYWxpZENvbXBvbmVudChzcHJpdGUpKSBjb21wbGV0ZUNhbGxiYWNrKHNwcml0ZUZyYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIEJ1dHRvblNwcml0ZU1lbWJlck5hbWUge1xuICAgIE5vcm1sID0gXCJub3JtYWxTcHJpdGVcIixcbiAgICBQcmVzc2VkID0gXCJwcmVzc2VkU3ByaXRlXCIsXG4gICAgSG92ZXIgPSBcImhvdmVyU3ByaXRlXCIsXG4gICAgRGlzYWJsZSA9IFwiZGlzYWJsZWRTcHJpdGVcIixcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6K6+572u5oyJ6ZKu57K+54G15binXG4gKiBAcGFyYW0gdmlldyDmjIHmnInop4blm75cbiAqIEBwYXJhbSB1cmwgdXJsIFxuICogQHBhcmFtIGJ1dHRvbiBcbiAqIEBwYXJhbSBzcHJpdGVGcmFtZSDmlrDnmoRzcHJpdGVGcmFtZVxuICogQHBhcmFtIG1lbWJlck5hbWUg5pu/5o2i5oiQ5ZGY5Y+Y6YeP5ZCNXG4gKiBAcGFyYW0gY29tcGxldGVDYWxsYmFjayDlrozmiJDlm57osINcbiAqIEBwYXJhbSBpc0F0bGFzIOaYr+WQpuaYr+S7juWkp+e6ueeQhuWbvumbhuS4reWKoOi9veeahFxuICovXG5mdW5jdGlvbiBfc2V0U3ByaXRlRnJhbWUoXG4gICAgdmlldzogVUlWaWV3LFxuICAgIHVybDogc3RyaW5nLFxuICAgIGJ1dHRvbjogY2MuQnV0dG9uLFxuICAgIHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcbiAgICBtZW1iZXJOYW1lOiBzdHJpbmcsXG4gICAgY29tcGxldGVDYWxsYmFjazogKHR5cGU6IHN0cmluZywgZGF0YTogY2MuU3ByaXRlRnJhbWUpID0+IHZvaWQsXG4gICAgaXNBdGxhczogYm9vbGVhbixcbiAgICBidW5kbGU6QlVORExFX1RZUEUpIHtcblxuICAgIGlmICghaXNBdGxhcykge1xuICAgICAgICBsZXQgaW5mbyA9IG5ldyBSZXNvdXJjZUluZm87XG4gICAgICAgIGluZm8udXJsID0gdXJsO1xuICAgICAgICBpbmZvLnR5cGUgPSBjYy5TcHJpdGVGcmFtZTtcbiAgICAgICAgaW5mby5kYXRhID0gc3ByaXRlRnJhbWU7XG4gICAgICAgIGluZm8uYnVuZGxlID0gYnVuZGxlO1xuICAgICAgICBhZGRFeHRyYUxvYWRSZXNvdXJjZSh2aWV3LCBpbmZvKTtcbiAgICB9XG5cbiAgICBpZiAoc3ByaXRlRnJhbWUgJiYgaXNWYWxpZENvbXBvbmVudChidXR0b24pKSB7XG4gICAgICAgIGxldCBvbGRTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBidXR0b25bbWVtYmVyTmFtZV07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVwbGFjZURhdGEgPSBjYy5pc1ZhbGlkKHNwcml0ZUZyYW1lKSA/IHNwcml0ZUZyYW1lIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChyZXBsYWNlRGF0YSkgYnV0dG9uW21lbWJlck5hbWVdID0gcmVwbGFjZURhdGE7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykgY29tcGxldGVDYWxsYmFjayhtZW1iZXJOYW1lLCByZXBsYWNlRGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IGNjLmlzVmFsaWQob2xkU3ByaXRlRnJhbWUpID8gb2xkU3ByaXRlRnJhbWUgOiBudWxsO1xuICAgICAgICAgICAgYnV0dG9uW21lbWJlck5hbWVdID0gdGVtcDtcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSBjb21wbGV0ZUNhbGxiYWNrKG1lbWJlck5hbWUsIG51bGwpO1xuICAgICAgICAgICAgLy/miormlbDmja7mlL7liLDlhajlsYDnmoTlnoPlnL7lm57mlLbkuK0gLy/lpb3lg4/mnInngrnkuI3ooYzvvIxcbiAgICAgICAgICAgIGNjLmVycm9yKGAke3VybH0gOiAke2Vycm9yID8gZXJyb3IgOiBcInJlcGxhY2Ugc3ByaXRlZnJhbWUgZXJyb3JcIn1gKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrICYmIGlzVmFsaWRDb21wb25lbnQoYnV0dG9uKSkgY29tcGxldGVDYWxsYmFjayhtZW1iZXJOYW1lLCBzcHJpdGVGcmFtZSk7XG4gICAgfVxuXG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDorr7nva7mjInpkq7nsr7ngbXluKdcbiAqIEBwYXJhbSBidXR0b24g5oyJ6ZKu57uE5Lu2IFxuICogQHBhcmFtIG1lbWJlck5hbWUg5oiQ5ZGY5Y+Y6YeP5ZCNIFxuICogQHBhcmFtIHZpZXcg5oyB5pyJ6KeG5Zu+XG4gKiBAcGFyYW0gdXJsIHVybFxuICogQHBhcmFtIHNwcml0ZUZyYW1lIOW+heabv+aNoueahOeyvueBteW4pyBcbiAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIOWujOaIkOWbnuiwg1xuICogQHBhcmFtIGlzQXRsYXMg5piv5ZCm5piv5LuO5aSn57q555CG5Zu+6ZuG5Lit5Yqg6L2955qEIOm7mOiupOS4umZhbHNlXG4gKi9cbmZ1bmN0aW9uIF9zZXRCdXR0b25TcHJpdGVGcmFtZShcbiAgICBidXR0b246IGNjLkJ1dHRvbixcbiAgICBtZW1iZXJOYW1lOiBCdXR0b25TcHJpdGVNZW1iZXJOYW1lLFxuICAgIHZpZXc6IFVJVmlldyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBzcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgY29tcGxldGVDYWxsYmFjazogKHR5cGU6IHN0cmluZywgZGF0YTogY2MuU3ByaXRlRnJhbWUpID0+IHZvaWQsXG4gICAgYnVuZGxlOiBCVU5ETEVfVFlQRSxcbiAgICBpc0F0bGFzOiBib29sZWFuID0gZmFsc2UpIHtcblxuICAgIGlmIChzcHJpdGVGcmFtZSAmJiBpc1ZhbGlkQ29tcG9uZW50KGJ1dHRvbikpIHtcbiAgICAgICAgX3NldFNwcml0ZUZyYW1lKHZpZXcsIHVybCwgYnV0dG9uLCBzcHJpdGVGcmFtZSwgbWVtYmVyTmFtZSwgY29tcGxldGVDYWxsYmFjaywgaXNBdGxhcyxidW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8v5a6M5oiQ5Zue6LCDXG4gICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrICYmIGlzVmFsaWRDb21wb25lbnQoYnV0dG9uKSkgY29tcGxldGVDYWxsYmFjayhtZW1iZXJOYW1lLCBzcHJpdGVGcmFtZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDmoLnmja7nsbvlnovorr7nva7mjInpkq5cbiAqIEBwYXJhbSBidXR0b24gXG4gKiBAcGFyYW0gbWVtYmVyTmFtZSDmiJDlkZjlj5jph4/lkI1cbiAqIEBwYXJhbSB2aWV3IFxuICogQHBhcmFtIHVybCBcbiAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIFxuICovXG5mdW5jdGlvbiBfc2V0QnV0dG9uV2l0aFR5cGUoXG4gICAgYnV0dG9uOiBjYy5CdXR0b24sXG4gICAgbWVtYmVyTmFtZTogQnV0dG9uU3ByaXRlTWVtYmVyTmFtZSxcbiAgICB2aWV3OiBVSVZpZXcsXG4gICAgdXJsOiBzdHJpbmcgfCB7IHVybHM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZyB9LFxuICAgIGNvbXBsZXRlQ2FsbGJhY2s/OiAodHlwZTogc3RyaW5nLCBzcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUpID0+IHZvaWQsXG4gICAgYnVuZGxlID86IEJVTkRMRV9UWVBFXG4pIHtcbiAgICBpZiAodXJsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdXJsID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldENhY2hlQnlBc3luYyh1cmwsIGNjLlNwcml0ZUZyYW1lLGJ1bmRsZSkudGhlbigoc3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgICAgICBfc2V0QnV0dG9uU3ByaXRlRnJhbWUoYnV0dG9uLCBtZW1iZXJOYW1lLCB2aWV3LCB1cmwsIHNwcml0ZUZyYW1lLCBjb21wbGV0ZUNhbGxiYWNrLGJ1bmRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5Zyo57q555CG5Zu+6ZuG5Lit5p+l5om+XG4gICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5nZXRTcHJpdGVGcmFtZUJ5QXN5bmModXJsLnVybHMsIHVybC5rZXksIHZpZXcsIGFkZEV4dHJhTG9hZFJlc291cmNlLGJ1bmRsZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuaXNUcnlSZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mnaXliLDov5nph4zpnaLvvIznqIvluo/lt7Lnu4/ltKnmuoPvvIzml6DmhI/kuYnlnKjlpITnkIZcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfc2V0QnV0dG9uU3ByaXRlRnJhbWUoYnV0dG9uLCBtZW1iZXJOYW1lLCB2aWV3LCBkYXRhLnVybCwgZGF0YS5zcHJpdGVGcmFtZSwgY29tcGxldGVDYWxsYmFjayxidW5kbGUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDorr7nva7mjInpkq7nsr7ngbVcbiAqIEBwYXJhbSBidXR0b24g5oyJ6ZKu57uE5Lu2XG4gKiBAcGFyYW0gY29uZmlnIOmFjee9ruS/oeaBr1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QnV0dG9uU3ByaXRlRnJhbWUoYnV0dG9uOiBjYy5CdXR0b24sIGNvbmZpZzoge1xuICAgIG5vcm1hbFNwcml0ZT86IHN0cmluZyB8IHsgdXJsczogc3RyaW5nW10sIGtleTogc3RyaW5nIH0sXG4gICAgdmlldzogYW55LC8vVUlWaWV355qE5a2Q57G7XG4gICAgcHJlc3NlZFNwcml0ZT86IHN0cmluZyB8IHsgdXJsczogc3RyaW5nW10sIGtleTogc3RyaW5nIH0sXG4gICAgaG92ZXJTcHJpdGU/OiBzdHJpbmcgfCB7IHVybHM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZyB9LFxuICAgIGRpc2FibGVkU3ByaXRlPzogc3RyaW5nIHwgeyB1cmxzOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcgfSxcbiAgICBjb21wbGV0ZUNhbGxiYWNrPzogKHR5cGU6IHN0cmluZywgc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lKSA9PiB2b2lkLFxuICAgIGJ1bmRsZT86QlVORExFX1RZUEVcbn0pIHtcbiAgICBsZXQgYnVuZGxlID0gZ2V0QnVuZGxlKGNvbmZpZyk7XG4gICAgX3NldEJ1dHRvbldpdGhUeXBlKGJ1dHRvbiwgQnV0dG9uU3ByaXRlTWVtYmVyTmFtZS5Ob3JtbCwgY29uZmlnLnZpZXcsIGNvbmZpZy5ub3JtYWxTcHJpdGUsIGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrLGJ1bmRsZSk7XG4gICAgX3NldEJ1dHRvbldpdGhUeXBlKGJ1dHRvbiwgQnV0dG9uU3ByaXRlTWVtYmVyTmFtZS5QcmVzc2VkLCBjb25maWcudmlldywgY29uZmlnLnByZXNzZWRTcHJpdGUsIGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrLGJ1bmRsZSk7XG4gICAgX3NldEJ1dHRvbldpdGhUeXBlKGJ1dHRvbiwgQnV0dG9uU3ByaXRlTWVtYmVyTmFtZS5Ib3ZlciwgY29uZmlnLnZpZXcsIGNvbmZpZy5ob3ZlclNwcml0ZSwgY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2ssYnVuZGxlKTtcbiAgICBfc2V0QnV0dG9uV2l0aFR5cGUoYnV0dG9uLCBCdXR0b25TcHJpdGVNZW1iZXJOYW1lLkRpc2FibGUsIGNvbmZpZy52aWV3LCBjb25maWcuZGlzYWJsZWRTcHJpdGUsIGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrLGJ1bmRsZSk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOiuvue9rueJueaViFxuICogQHBhcmFtIGNvbXBvbmVudCDnibnmlYjnu4Tku7ZcbiAqIEBwYXJhbSBjb25maWcg6YWN572u5L+h5oGvXG4gKiBAcGFyYW0gZGF0YSDnibnmlYjmlbDmja5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFBhcnRpY2xlU3lzdGVtRmlsZShcbiAgICBjb21wb25lbnQ6IGNjLlBhcnRpY2xlU3lzdGVtLFxuICAgIGNvbmZpZzogeyB1cmw6IHN0cmluZywgdmlldzogYW55LCBjb21wbGV0ZUNhbGxiYWNrPzogKGZpbGU6IGNjLlBhcnRpY2xlQXNzZXQpID0+IHZvaWQgLCBidW5kbGU6QlVORExFX1RZUEV9LFxuICAgIGRhdGE6IGNjLlBhcnRpY2xlQXNzZXRcbikge1xuICAgIGxldCBpbmZvID0gbmV3IFJlc291cmNlSW5mbztcbiAgICBpbmZvLnVybCA9IGNvbmZpZy51cmw7XG4gICAgaW5mby50eXBlID0gY2MuUGFydGljbGVBc3NldDtcbiAgICBpbmZvLmRhdGEgPSBkYXRhO1xuICAgIGluZm8uYnVuZGxlID0gZ2V0QnVuZGxlKGNvbmZpZyk7XG4gICAgYWRkRXh0cmFMb2FkUmVzb3VyY2UoY29uZmlnLnZpZXcsIGluZm8pO1xuICAgIGlmIChkYXRhICYmIGlzVmFsaWRDb21wb25lbnQoY29tcG9uZW50KSkge1xuICAgICAgICBsZXQgb2xkRmlsZSA9IGNvbXBvbmVudC5maWxlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcGxhY2VEYXRhID0gY2MuaXNWYWxpZChkYXRhKSA/IGRhdGEgOiBudWxsO1xuICAgICAgICAgICAgaWYgKHJlcGxhY2VEYXRhKSBjb21wb25lbnQuZmlsZSA9IHJlcGxhY2VEYXRhO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrKSBjb25maWcuY29tcGxldGVDYWxsYmFjayhyZXBsYWNlRGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IGNjLmlzVmFsaWQob2xkRmlsZSkgPyBvbGRGaWxlIDogbnVsbDtcbiAgICAgICAgICAgIGNvbXBvbmVudC5maWxlID0gdGVtcDtcbiAgICAgICAgICAgIGlmIChjb25maWcuY29tcGxldGVDYWxsYmFjaykgY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAvL+aKiuaVsOaNruaUvuWIsOWFqOWxgOeahOWeg+WcvuWbnuaUtuS4rSAvL+WlveWDj+acieeCueS4jeihjO+8jFxuICAgICAgICAgICAgY2MuZXJyb3IoYCR7Y29uZmlnLnVybH0gOiAke2Vycm9yID8gZXJyb3IgOiBcInJlcGxhY2UgZmlsZSBlcnJvclwifWApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy/lrozmiJDlm57osINcbiAgICAgICAgaWYgKGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrICYmIGlzVmFsaWRDb21wb25lbnQoY29tcG9uZW50KSkgY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2soZGF0YSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDorr7nva7lrZfkvZNcbiAqIEBwYXJhbSBjb21wb25lbnQg5a2X5L2T57uE5Lu2XG4gKiBAcGFyYW0gY29uZmlnIOmFjee9ruS/oeaBr1xuICogQHBhcmFtIGRhdGEg5a2X5L2T5pWw5o2uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRMYWJlbEZvbnQoXG4gICAgY29tcG9uZW50OiBjYy5MYWJlbCxcbiAgICBjb25maWc6IHsgZm9udDogc3RyaW5nLCB2aWV3OiBhbnksIGNvbXBsZXRlQ2FsbGJhY2s/OiAoZm9udDogY2MuRm9udCkgPT4gdm9pZCAsIGJ1bmRsZTpCVU5ETEVfVFlQRSB9LFxuICAgIGRhdGE6IGNjLkZvbnQpIHtcbiAgICBsZXQgaW5mbyA9IG5ldyBSZXNvdXJjZUluZm87XG4gICAgaW5mby51cmwgPSBjb25maWcuZm9udDtcbiAgICBpbmZvLnR5cGUgPSBjYy5Gb250O1xuICAgIGluZm8uZGF0YSA9IGRhdGE7XG4gICAgaW5mby5idW5kbGUgPSBnZXRCdW5kbGUoY29uZmlnKTtcbiAgICBhZGRFeHRyYUxvYWRSZXNvdXJjZShjb25maWcudmlldywgaW5mbyk7XG4gICAgaWYgKGRhdGEgJiYgaXNWYWxpZENvbXBvbmVudChjb21wb25lbnQpKSB7XG4gICAgICAgIGxldCBvbGRGb250ID0gY29tcG9uZW50LmZvbnQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVwbGFjZURhdGEgPSBjYy5pc1ZhbGlkKGRhdGEpID8gZGF0YSA6IG51bGw7XG4gICAgICAgICAgICBpZiAocmVwbGFjZURhdGEpIGNvbXBvbmVudC5mb250ID0gcmVwbGFjZURhdGE7XG4gICAgICAgICAgICBpZiAoY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2spIGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrKHJlcGxhY2VEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gY2MuaXNWYWxpZChvbGRGb250KSA/IG9sZEZvbnQgOiBudWxsO1xuICAgICAgICAgICAgY29tcG9uZW50LmZvbnQgPSB0ZW1wO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrKSBjb25maWcuY29tcGxldGVDYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIC8v5oqK5pWw5o2u5pS+5Yiw5YWo5bGA55qE5Z6D5Zy+5Zue5pS25LitIC8v5aW95YOP5pyJ54K55LiN6KGM77yMXG4gICAgICAgICAgICBjYy5lcnJvcihgJHtjb25maWcuZm9udH0gOiAke2Vycm9yID8gZXJyb3IgOiBcInJlcGxhY2UgZm9udCBlcnJvclwifWApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy/lrozmiJDlm57osINcbiAgICAgICAgaWYgKGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrICYmIGlzVmFsaWRDb21wb25lbnQoY29tcG9uZW50KSkgY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2soZGF0YSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDorr7nva5zcGluZeWKqOeUu+aVsOaNrlxuICogQHBhcmFtIGNvbXBvbmVudCBzcGluZee7hOS7tlxuICogQHBhcmFtIGNvbmZpZyDphY3nva7kv6Hmga9cbiAqIEBwYXJhbSBkYXRhIOWKqOeUu+aVsOaNrlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0U2tlbGV0b25Ta2VsZXRvbkRhdGEoXG4gICAgY29tcG9uZW50OiBzcC5Ta2VsZXRvbixcbiAgICBjb25maWc6IHsgdXJsOiBzdHJpbmcsIHZpZXc6IGFueSwgY29tcGxldGVDYWxsYmFjazogKGRhdGE6IHNwLlNrZWxldG9uRGF0YSkgPT4gdm9pZCAsIGJ1bmRsZTpCVU5ETEVfVFlQRX0gfFxuICAgIHsgdmlldzogYW55LCBwYXRoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY29tcGxldGVDYWxsYmFjazogKGRhdGE6IHNwLlNrZWxldG9uRGF0YSkgPT4gdm9pZCwgYnVuZGxlOkJVTkRMRV9UWVBFICwgaXNOZWVkQ2FjaGU/OiBib29sZWFuLCByZXRhaW4/OiBib29sZWFuIH0sXG4gICAgZGF0YTogc3AuU2tlbGV0b25EYXRhLFxuICAgIHJlc291cmNlVHlwZTogUmVzb3VyY2VUeXBlID0gUmVzb3VyY2VUeXBlLkxvY2FsKSB7XG4gICAgbGV0IHVybCA9IFwiXCI7XG4gICAgbGV0IHJldGFpbiA9IGZhbHNlO1xuICAgIGlmIChyZXNvdXJjZVR5cGUgPT0gUmVzb3VyY2VUeXBlLlJlbW90ZSkge1xuICAgICAgICBsZXQgcmVhbENvbmZpZzogeyB2aWV3OiBhbnksIHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjb21wbGV0ZUNhbGxiYWNrOiAoZGF0YTogc3AuU2tlbGV0b25EYXRhKSA9PiB2b2lkLCBpc05lZWRDYWNoZT86IGJvb2xlYW4sIHJldGFpbj86IGJvb2xlYW4gfSA9IDxhbnk+Y29uZmlnO1xuICAgICAgICB1cmwgPSBgJHtyZWFsQ29uZmlnLnBhdGh9LyR7cmVhbENvbmZpZy5uYW1lfWA7XG4gICAgICAgIHJldGFpbiA9IHJlYWxDb25maWcucmV0YWluID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZWFsQ29uZmlnOiB7IHVybDogc3RyaW5nLCB2aWV3OiBhbnksIGNvbXBsZXRlQ2FsbGJhY2s6IChkYXRhOiBzcC5Ta2VsZXRvbkRhdGEpID0+IHZvaWQgfSA9IDxhbnk+Y29uZmlnO1xuICAgICAgICB1cmwgPSByZWFsQ29uZmlnLnVybDtcbiAgICB9XG4gICAgbGV0IGluZm8gPSBuZXcgUmVzb3VyY2VJbmZvO1xuICAgIGluZm8udXJsID0gdXJsO1xuICAgIGluZm8udHlwZSA9IHNwLlNrZWxldG9uRGF0YTtcbiAgICBpbmZvLmRhdGEgPSBkYXRhO1xuICAgIGluZm8ucmV0YWluID0gcmV0YWluO1xuICAgIGluZm8uYnVuZGxlID0gZ2V0QnVuZGxlKGNvbmZpZyk7XG4gICAgaWYgKHJlc291cmNlVHlwZSA9PSBSZXNvdXJjZVR5cGUuUmVtb3RlKSB7XG4gICAgICAgIGFkZFJlbW90ZUxvYWRSZXNvdXJjZShjb25maWcudmlldywgaW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWRkRXh0cmFMb2FkUmVzb3VyY2UoY29uZmlnLnZpZXcsIGluZm8pO1xuICAgIH1cbiAgICBpZiAoZGF0YSAmJiBpc1ZhbGlkQ29tcG9uZW50KGNvbXBvbmVudCkpIHtcbiAgICAgICAgbGV0IG9sZFNrZWxldG9uRGF0YSA9IGNvbXBvbmVudC5za2VsZXRvbkRhdGE7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVwbGFjZURhdGEgPSBjYy5pc1ZhbGlkKGRhdGEpID8gZGF0YSA6IG51bGw7XG4gICAgICAgICAgICBpZiAocmVwbGFjZURhdGEpIGNvbXBvbmVudC5za2VsZXRvbkRhdGEgPSByZXBsYWNlRGF0YTtcbiAgICAgICAgICAgIGlmIChjb25maWcuY29tcGxldGVDYWxsYmFjaykgY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2socmVwbGFjZURhdGEpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbGV0IHRlbXAgPSBjYy5pc1ZhbGlkKG9sZFNrZWxldG9uRGF0YSkgPyBvbGRTa2VsZXRvbkRhdGEgOiBudWxsO1xuICAgICAgICAgICAgY29tcG9uZW50LnNrZWxldG9uRGF0YSA9IHRlbXA7XG4gICAgICAgICAgICBpZiAoY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2spIGNvbmZpZy5jb21wbGV0ZUNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgLy/miormlbDmja7mlL7liLDlhajlsYDnmoTlnoPlnL7lm57mlLbkuK0gLy/lpb3lg4/mnInngrnkuI3ooYzvvIxcbiAgICAgICAgICAgIGNjLmVycm9yKGAke3VybH0gOiAke2Vycm9yID8gZXJyb3IgOiBcInJlcGxhY2Ugc2tlbGV0b25EYXRhIGVycm9yXCJ9YCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvL+WujOaIkOWbnuiwg1xuICAgICAgICBpZiAoY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2sgJiYgaXNWYWxpZENvbXBvbmVudChjb21wb25lbnQpKSBjb25maWcuY29tcGxldGVDYWxsYmFjayhkYXRhKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOmAmui/h+mihOe9ruS9k+WIm+W7uk5vZGVcbiAqIEBwYXJhbSBjb25maWcg6YWN572u5L+h5oGvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlV2l0aFByZWZhYihjb25maWc6IHsgYnVuZGxlOkJVTkRMRV9UWVBFICwgdXJsOiBzdHJpbmcsIHZpZXc6IGFueSwgY29tcGxldGVDYWxsYmFjazogKG5vZGU6IGNjLk5vZGUpID0+IHZvaWQgfSwgZGF0YTogY2MuUHJlZmFiKSB7XG4gICAgbGV0IGluZm8gPSBuZXcgUmVzb3VyY2VJbmZvO1xuICAgIGluZm8udXJsID0gY29uZmlnLnVybDtcbiAgICBpbmZvLnR5cGUgPSBjYy5QcmVmYWI7XG4gICAgaW5mby5kYXRhID0gZGF0YTtcbiAgICBpbmZvLmJ1bmRsZSA9IGdldEJ1bmRsZShjb25maWcpO1xuICAgIGFkZEV4dHJhTG9hZFJlc291cmNlKGNvbmZpZy52aWV3LCBpbmZvKTtcbiAgICBpZiAoZGF0YSAmJiBpc1ZhbGlkQ29tcG9uZW50KGNvbmZpZy52aWV3KSAmJiBjb25maWcuY29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGRhdGEpO1xuICAgICAgICBjb25maWcuY29tcGxldGVDYWxsYmFjayhub2RlKTtcbiAgICB9XG59Il19