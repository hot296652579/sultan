"use strict";
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