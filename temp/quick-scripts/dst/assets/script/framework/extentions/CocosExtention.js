
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/extentions/CocosExtention.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd04cfrIH9pOMoFQB4kwLaeF', 'CocosExtention');
// script/framework/extentions/CocosExtention.js

"use strict";

exports.__esModule = true;
exports.CocosExtentionInit = CocosExtentionInit;

var _WebEditBoxImpl = _interopRequireDefault(require("./WebEditBoxImpl"));

var _Defines = require("../base/Defines");

var _Utils = require("./Utils");

var _EventApi = require("../event/EventApi");

var _Framework = require("../Framework");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**@description 对cc.Node 扩展一个临时存储的用户自定义数据 */
if (typeof Reflect == "object") {
  //在浏览器中已经有反射
  Reflect.defineProperty(cc.Node.prototype, "userData", {
    value: null,
    writable: true
  });
} else {
  cc.Node.prototype.userData = null;
}
/**
 * @description 从网络加载图片，推荐使用第二种方式
 * @param url 网络地址，如 : http://tools.itharbors.com/res/logo.png
 * @param completeCallback 加载完成回调
 * @param defaultSpriteFrame 加载图片失败后，使用的默认图片,当传入string时，会动态加载该默认图片
 * @param isNeedCache 是否需要缓存到本地,如果不需要，每次都会从网络拉取资源,默认都会缓存到本地
 * @param config.retain 远程加载的资源是否驻留在内存中,默认都不驻留内存
 * @example
 * 示例1：
 * let sprite = imageNode.getComponent(cc.Sprite);
 * sprite.loadRemoteImage({url :"http://tools.itharbors.com/res/logo.png", defaultSpriteFrame : HALL("textures/avatar_default_0.png"), view : this,completeCallback : (data)=>{
 * 		if ( data ) { do something }
 * }});
 * 
 * 示例2:
 * let sprite = imageNode.getComponent(cc.Sprite);
 * sprite.loadRemoteImage({url :"http://tools.itharbors.com/res/logo.png", defaultSpriteFrame : HALL("textures/avatar_default_0.png"), view : this});
 * 
 * 示例3：
 * let sprite = imageNode.getComponent(cc.Sprite);
 * sprite.loadRemoteImage({url :"http://tools.itharbors.com/res/logo.png", view : this});
 * }
 */
//config : {url: string, view : any , completeCallback?: (data: cc.SpriteFrame) => void, defaultSpriteFrame?: string , isNeedCache ?: boolean }


cc.Sprite.prototype.loadRemoteImage = function (config) {
  var me = this;

  if (config.isNeedCache == undefined || config.isNeedCache == null) {
    config.isNeedCache = true;
  }

  var isRetain = false;

  if (config.retain) {
    isRetain = true;
  }

  var bundle = (0, _Utils.getBundle)(config);

  _Framework.Manager.assetManager.remote.loadImage(config.url, config.isNeedCache).then(function (data) {
    if (data) {
      (0, _Utils.setSpriteSpriteFrame)(config.view, config.url, me, data, config.completeCallback, bundle, _Defines.ResourceType.Remote, isRetain);
    } else {
      if (config.defaultSpriteFrame) {
        if (typeof config.defaultSpriteFrame == "string") {
          //动态加载了一张图片，把资源通知管理器
          _Framework.Manager.cacheManager.getCacheByAsync(config.defaultSpriteFrame, cc.SpriteFrame, _Defines.BUNDLE_RESOURCES).then(function (spriteFrame) {
            (0, _Utils.setSpriteSpriteFrame)(config.view, config.defaultSpriteFrame, me, spriteFrame, config.completeCallback, bundle);
          });
        }
      }
    }

    if (config.completeCallback && cc.isValid(me)) config.completeCallback(data);
  });
};
/**
 * @description 加载本地图片
 * @param url 图片路径 {urls:string[],key:string} urls 为纹理名如果有此纹理会打包成多张，此时需要传入所有纹理的地址，key指纹理中名字
 * @param view 所属视图，UIView的子类
 * @param completeCallback 完成回调
 * @example
 * 示例1：
 * sprite.getComponent(cc.Sprite).loadImage({url:{urls:["plist/fish_30","plist/fish_30_1","plist/fish_30_2"],key:"fishMove_030_28"},view:this});
 * 示例2：
 * sprite.getComponent(cc.Sprite).loadImage({url:"hall/a",view:this});
 */
//loadImage( config : { url : string | {urls:string[],key:string} , view : any , completeCallback?:(data : SpriteFrame)=>void});


cc.Sprite.prototype.loadImage = function (config) {
  var me = this;
  var view = config.view;
  var url = config.url;
  var completeCallback = config.completeCallback;
  var bundle = (0, _Utils.getBundle)(config);

  if (typeof url == "string") {
    _Framework.Manager.cacheManager.getCacheByAsync(url, cc.SpriteFrame, bundle).then(function (spriteFrame) {
      (0, _Utils.setSpriteSpriteFrame)(view, url, me, spriteFrame, completeCallback, bundle, _Defines.ResourceType.Remote, true);
    });
  } else {
    //在纹理图集中查找
    _Framework.Manager.cacheManager.getSpriteFrameByAsync(url.urls, url.key, view, _Utils.addExtraLoadResource, bundle).then(function (data) {
      if (data && data.isTryReload) {//来到这里面程序已经崩溃了，无意义在处理了
      } else {
        (0, _Utils.setSpriteSpriteFrame)(view, data.url, me, data.spriteFrame, completeCallback, bundle, _Defines.ResourceType.Local, false, true);
      }
    });
  }
};
/**@description 通过预置体路径创建节点 
 * @param config 配置信息
 * @param config.url 预置体路径
 * @param config.view 预置视图资源管理器，继承自UIView
 * @param config.completeCallback 创建完成回调 
 * @example 
 * cc.createPrefab({url :GAME_RES("res/animations/shzDealerCommon"),view:this,completeCallback:(node)=>{
 *     if ( node ){
 *         // to do 
 *     }
 * }});
 */


cc.createPrefab = function (config) {
  var url = config.url;
  var bundle = (0, _Utils.getBundle)(config);

  _Framework.Manager.cacheManager.getCacheByAsync(url, cc.Prefab, bundle).then(function (data) {
    (0, _Utils.createNodeWithPrefab)(config, data);
  });
};
/**
 * @description 扩展方法
 * @param remotePath 远程资源路径
 * @param name 远程Spine文件名，不再后缀
 * @param completeCallback 完成回调
 * @param isNeedCache 是否需要缓存到本地,如果不需要，每次都会从网络拉取资源,默认都会缓存到本地
 * @param config.retain 远程加载的资源是否驻留在内存中,默认都不驻留内存
 * @example
 * var skeleton = node.addComponent(sp.Skeleton);
 *
 * let path = "https://bc-test1.oss-cn-shenzhen.aliyuncs.com/image/action";
 * let name = "nnoh_v4";
 * skeleton.loadRemoteSkeleton({view : this , path : path, name : name, completeCallback : (data:sp.SkeletonData)=>{
 *    if (data) {
 *        skeleton.animation = 'loop';
 *        skeleton.premultipliedAlpha = false;
 *    }
 * }});
 */


sp.Skeleton.prototype.loadRemoteSkeleton = function (config) {
  var me = this;

  if (config.isNeedCache == undefined || config.isNeedCache == null) {
    config.isNeedCache = true;
  }

  _Framework.Manager.assetManager.remote.loadSkeleton(config.path, config.name, config.isNeedCache).then(function (data) {
    (0, _Utils.setSkeletonSkeletonData)(me, config, data, _Defines.ResourceType.Remote);
  });
};
/**
 * @description 加载动画
 * @example
 * action.loadSkeleton({url:"hall/vip/vipAction/vip_10",view:this,completeCallback:(data)=>{
 *	if ( data ){
 *		action.animation = "loop";
 *		action.loop = true;
 *		action.premultipliedAlpha = false;
 *	}
 * }});
 */


sp.Skeleton.prototype.loadSkeleton = function (config) {
  var me = this;
  var url = config.url;
  var bundle = (0, _Utils.getBundle)(config);

  _Framework.Manager.cacheManager.getCacheByAsync(url, sp.SkeletonData, bundle).then(function (data) {
    (0, _Utils.setSkeletonSkeletonData)(me, config, data);
  });
};
/**
 * @description 加载按钮
 * @example
 * let button = cc.find("button",this.node);
 * button.getComponent(cc.Button).loadButton({normalSprite : "hall/a",view:this});
 * button.getComponent(cc.Button).loadButton({normalSprite : "hall/b",pressedSprite : "hall/c",view:this});
 */


cc.Button.prototype.loadButton = function (config) {
  (0, _Utils.setButtonSpriteFrame)(this, config);
};
/**
 * @description 加载字体
 * @example
 * let content = cc.find("content",this.node); 
 * content.getComponent(cc.Label).loadFont({font:roomPath + dfFont,view:this});
 */


cc.Label.prototype.loadFont = function (config) {
  var font = config.font;
  var me = this;
  var bundle = (0, _Utils.getBundle)(config);

  _Framework.Manager.cacheManager.getCacheByAsync(font, cc.Font, bundle).then(function (data) {
    (0, _Utils.setLabelFont)(me, config, data);
  });
};
/**@description 强制label在当前帧进行绘制 */


cc.Label.prototype.forceDoLayout = function () {
  //2.2.0
  if (this._forceUpdateRenderData) {
    this._forceUpdateRenderData();
  } //2.2.0以下版本
  else if (this._updateRenderData) {
    this._updateRenderData(true);
  }
};
/**
 * @description 加载特效文件 view 为null时，加载之前不会释
 * @example
 * let node = new cc.Node();
 * let par = node.addComponent(cc.ParticleSystem);
 * par.loadFile({url:GAME_RES( "res/action/DDZ_win_lizi" ),view:null});
 * this.node.addChild(node);
 */


cc.ParticleSystem.prototype.loadFile = function (config) {
  var me = this;
  var url = config.url;
  var bundle = (0, _Utils.getBundle)(config);

  _Framework.Manager.cacheManager.getCacheByAsync(url, cc.ParticleAsset, bundle).then(function (data) {
    (0, _Utils.setParticleSystemFile)(me, config, data);
  });
};
/**
 * @description 强制节点在当前帧进行一次布局 
 * @example
 * cc.updateAlignment(this.node);
 * */


cc.updateAlignment = function (node) {
  if (node) {
    //强制当前节点进行本帧强制布局
    var backcc = cc;

    if (backcc._widgetManager) {
      backcc._widgetManager.updateAlignment(node);
    } else {
      if (CC_DEBUG) cc.error(this._logTag, "\u5F15\u64CE\u53D8\u5316,\u539F\u59CB\u5F15\u64CE\u7248\u672C2.1.2\uFF0C\u627E\u4E0D\u5230cc._widgetManager");
    }
  }
};

if (!CC_EDITOR) {
  //对引擎输入框进行修改 ,原始引擎版本2.1.2
  if (cc.sys.isBrowser && !CC_PREVIEW && cc.sys.os != cc.sys.OS_WINDOWS) {
    if (CC_DEBUG) cc.log("\u6D4F\u89C8\u5668"); // cc.EditBox._ImplClass = WebEditBoxImpl; 
  }
}

function CocosExtentionInit() {//cc.log("CocosExtentionInit");
}

Reflect.defineProperty(cc.Label.prototype, "language", {
  get: function get() {
    return this._language;
  },
  set: function set(v) {
    //该游戏允许在游戏中进行语言包切换,当设置的值为 null | [] 时，清除language的事件绑定
    var self = this;

    var updateLanguage = function updateLanguage(v, cb) {
      if (v && (Array.isArray(v) && v.length > 0 || !!v)) {
        var value = null;

        if (Array.isArray(v)) {
          value = v;
        } else {
          value = [v];
        }

        cb && cb(true);
        self._language = [].concat(value);
        self.string = _Framework.Manager.language.get(value);
      } else {
        cb && cb(false);
        self._language = null;
        self.string = "";
      }
    };

    if (_Defines.ENABLE_CHANGE_LANGUAGE) {
      if (self.isValid) {
        updateLanguage(v, function (isUsing) {
          if (isUsing) {
            if (!!!self._isUsinglanguage) {
              self._isUsinglanguage = true;

              _Framework.Manager.eventDispatcher.addEventListener(_EventApi.EventApi.CHANGE_LANGUAGE, self._onChangeLanguage, self);
            }
          } else {
            if (self._language) {
              _Framework.Manager.eventDispatcher.removeEventListener(_EventApi.EventApi.CHANGE_LANGUAGE, self);
            }
          }
        });
      }
    } else {
      updateLanguage(v, null);
    }
  }
});

if (!CC_EDITOR && _Defines.ENABLE_CHANGE_LANGUAGE) {
  cc.Label.prototype._onChangeLanguage = function () {
    this.language = this.language;
  };

  var __label_onDestroy__ = cc.Label.prototype.onDestroy;

  cc.Label.prototype.onDestroy = function () {
    if (this._isUsinglanguage) {
      _Framework.Manager.eventDispatcher.removeEventListener(_EventApi.EventApi.CHANGE_LANGUAGE, this);
    }

    __label_onDestroy__ && __label_onDestroy__.call(this);
  };

  var __label_onLoad__ = cc.Label.prototype.onLoad;

  cc.Label.prototype.onLoad = function () {
    if (this.string.indexOf(_Defines.USING_LAN_KEY) > -1) {
      this.language = [this.string];
    }

    __label_onLoad__ && __label_onLoad__.call(this);
  };
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvQ29jb3NFeHRlbnRpb24uanMiXSwibmFtZXMiOlsiUmVmbGVjdCIsImRlZmluZVByb3BlcnR5IiwiY2MiLCJOb2RlIiwicHJvdG90eXBlIiwidmFsdWUiLCJ3cml0YWJsZSIsInVzZXJEYXRhIiwiU3ByaXRlIiwibG9hZFJlbW90ZUltYWdlIiwiY29uZmlnIiwibWUiLCJpc05lZWRDYWNoZSIsInVuZGVmaW5lZCIsImlzUmV0YWluIiwicmV0YWluIiwiYnVuZGxlIiwiTWFuYWdlciIsImFzc2V0TWFuYWdlciIsInJlbW90ZSIsImxvYWRJbWFnZSIsInVybCIsInRoZW4iLCJkYXRhIiwidmlldyIsImNvbXBsZXRlQ2FsbGJhY2siLCJSZXNvdXJjZVR5cGUiLCJSZW1vdGUiLCJkZWZhdWx0U3ByaXRlRnJhbWUiLCJjYWNoZU1hbmFnZXIiLCJnZXRDYWNoZUJ5QXN5bmMiLCJTcHJpdGVGcmFtZSIsIkJVTkRMRV9SRVNPVVJDRVMiLCJzcHJpdGVGcmFtZSIsImlzVmFsaWQiLCJnZXRTcHJpdGVGcmFtZUJ5QXN5bmMiLCJ1cmxzIiwia2V5IiwiYWRkRXh0cmFMb2FkUmVzb3VyY2UiLCJpc1RyeVJlbG9hZCIsIkxvY2FsIiwiY3JlYXRlUHJlZmFiIiwiUHJlZmFiIiwic3AiLCJTa2VsZXRvbiIsImxvYWRSZW1vdGVTa2VsZXRvbiIsImxvYWRTa2VsZXRvbiIsInBhdGgiLCJuYW1lIiwiU2tlbGV0b25EYXRhIiwiQnV0dG9uIiwibG9hZEJ1dHRvbiIsIkxhYmVsIiwibG9hZEZvbnQiLCJmb250IiwiRm9udCIsImZvcmNlRG9MYXlvdXQiLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwiX3VwZGF0ZVJlbmRlckRhdGEiLCJQYXJ0aWNsZVN5c3RlbSIsImxvYWRGaWxlIiwiUGFydGljbGVBc3NldCIsInVwZGF0ZUFsaWdubWVudCIsIm5vZGUiLCJiYWNrY2MiLCJfd2lkZ2V0TWFuYWdlciIsIkNDX0RFQlVHIiwiZXJyb3IiLCJfbG9nVGFnIiwiQ0NfRURJVE9SIiwic3lzIiwiaXNCcm93c2VyIiwiQ0NfUFJFVklFVyIsIm9zIiwiT1NfV0lORE9XUyIsImxvZyIsIkNvY29zRXh0ZW50aW9uSW5pdCIsImdldCIsIl9sYW5ndWFnZSIsInNldCIsInYiLCJzZWxmIiwidXBkYXRlTGFuZ3VhZ2UiLCJjYiIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImNvbmNhdCIsInN0cmluZyIsImxhbmd1YWdlIiwiRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSIsImlzVXNpbmciLCJfaXNVc2luZ2xhbmd1YWdlIiwiZXZlbnREaXNwYXRjaGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkV2ZW50QXBpIiwiQ0hBTkdFX0xBTkdVQUdFIiwiX29uQ2hhbmdlTGFuZ3VhZ2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX19sYWJlbF9vbkRlc3Ryb3lfXyIsIm9uRGVzdHJveSIsImNhbGwiLCJfX2xhYmVsX29uTG9hZF9fIiwib25Mb2FkIiwiaW5kZXhPZiIsIlVTSU5HX0xBTl9LRVkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBS0E7O0FBQ0E7Ozs7QUFFQTtBQUNBLElBQUksT0FBT0EsT0FBUCxJQUFrQixRQUF0QixFQUFnQztBQUM1QjtBQUNBQSxFQUFBQSxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRQyxTQUEvQixFQUEwQyxVQUExQyxFQUFzRDtBQUNsREMsSUFBQUEsS0FBSyxFQUFFLElBRDJDO0FBRWxEQyxJQUFBQSxRQUFRLEVBQUU7QUFGd0MsR0FBdEQ7QUFJSCxDQU5ELE1BTU87QUFDSEosRUFBQUEsRUFBRSxDQUFDQyxJQUFILENBQVFDLFNBQVIsQ0FBa0JHLFFBQWxCLEdBQTZCLElBQTdCO0FBQ0g7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBTCxFQUFFLENBQUNNLE1BQUgsQ0FBVUosU0FBVixDQUFvQkssZUFBcEIsR0FBc0MsVUFBVUMsTUFBVixFQUFrQjtBQUNwRCxNQUFJQyxFQUFFLEdBQUcsSUFBVDs7QUFDQSxNQUFJRCxNQUFNLENBQUNFLFdBQVAsSUFBc0JDLFNBQXRCLElBQW1DSCxNQUFNLENBQUNFLFdBQVAsSUFBc0IsSUFBN0QsRUFBbUU7QUFDL0RGLElBQUFBLE1BQU0sQ0FBQ0UsV0FBUCxHQUFxQixJQUFyQjtBQUNIOztBQUNELE1BQUlFLFFBQVEsR0FBRyxLQUFmOztBQUNBLE1BQUlKLE1BQU0sQ0FBQ0ssTUFBWCxFQUFtQjtBQUNmRCxJQUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNIOztBQUNELE1BQUlFLE1BQU0sR0FBRyxzQkFBVU4sTUFBVixDQUFiOztBQUNBTyxxQkFBUUMsWUFBUixDQUFxQkMsTUFBckIsQ0FBNEJDLFNBQTVCLENBQXNDVixNQUFNLENBQUNXLEdBQTdDLEVBQWtEWCxNQUFNLENBQUNFLFdBQXpELEVBQXNFVSxJQUF0RSxDQUEyRSxVQUFDQyxJQUFELEVBQVU7QUFDakYsUUFBSUEsSUFBSixFQUFVO0FBQ04sdUNBQXFCYixNQUFNLENBQUNjLElBQTVCLEVBQWtDZCxNQUFNLENBQUNXLEdBQXpDLEVBQThDVixFQUE5QyxFQUFrRFksSUFBbEQsRUFBd0RiLE1BQU0sQ0FBQ2UsZ0JBQS9ELEVBQWlGVCxNQUFqRixFQUF5RlUsc0JBQWFDLE1BQXRHLEVBQThHYixRQUE5RztBQUNILEtBRkQsTUFFTztBQUNILFVBQUlKLE1BQU0sQ0FBQ2tCLGtCQUFYLEVBQStCO0FBQzNCLFlBQUksT0FBT2xCLE1BQU0sQ0FBQ2tCLGtCQUFkLElBQW9DLFFBQXhDLEVBQWtEO0FBQzlDO0FBQ0FYLDZCQUFRWSxZQUFSLENBQXFCQyxlQUFyQixDQUFxQ3BCLE1BQU0sQ0FBQ2tCLGtCQUE1QyxFQUFnRTFCLEVBQUUsQ0FBQzZCLFdBQW5FLEVBQWdGQyx5QkFBaEYsRUFBa0dWLElBQWxHLENBQXVHLFVBQUNXLFdBQUQsRUFBaUI7QUFDcEgsNkNBQXFCdkIsTUFBTSxDQUFDYyxJQUE1QixFQUFrQ2QsTUFBTSxDQUFDa0Isa0JBQXpDLEVBQTZEakIsRUFBN0QsRUFBaUVzQixXQUFqRSxFQUE4RXZCLE1BQU0sQ0FBQ2UsZ0JBQXJGLEVBQXVHVCxNQUF2RztBQUNILFdBRkQ7QUFHSDtBQUNKO0FBQ0o7O0FBQ0QsUUFBSU4sTUFBTSxDQUFDZSxnQkFBUCxJQUEyQnZCLEVBQUUsQ0FBQ2dDLE9BQUgsQ0FBV3ZCLEVBQVgsQ0FBL0IsRUFBK0NELE1BQU0sQ0FBQ2UsZ0JBQVAsQ0FBd0JGLElBQXhCO0FBQ2xELEdBZEQ7QUFlSCxDQXpCRDtBQTJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBckIsRUFBRSxDQUFDTSxNQUFILENBQVVKLFNBQVYsQ0FBb0JnQixTQUFwQixHQUFnQyxVQUFVVixNQUFWLEVBQWtCO0FBRTlDLE1BQUlDLEVBQUUsR0FBRyxJQUFUO0FBQ0EsTUFBSWEsSUFBSSxHQUFHZCxNQUFNLENBQUNjLElBQWxCO0FBQ0EsTUFBSUgsR0FBRyxHQUFHWCxNQUFNLENBQUNXLEdBQWpCO0FBQ0EsTUFBSUksZ0JBQWdCLEdBQUdmLE1BQU0sQ0FBQ2UsZ0JBQTlCO0FBQ0EsTUFBSVQsTUFBTSxHQUFHLHNCQUFVTixNQUFWLENBQWI7O0FBQ0EsTUFBSSxPQUFPVyxHQUFQLElBQWMsUUFBbEIsRUFBNEI7QUFDeEJKLHVCQUFRWSxZQUFSLENBQXFCQyxlQUFyQixDQUFxQ1QsR0FBckMsRUFBMENuQixFQUFFLENBQUM2QixXQUE3QyxFQUEwRGYsTUFBMUQsRUFBa0VNLElBQWxFLENBQXVFLFVBQUNXLFdBQUQsRUFBaUI7QUFDcEYsdUNBQXFCVCxJQUFyQixFQUEyQkgsR0FBM0IsRUFBZ0NWLEVBQWhDLEVBQW9Dc0IsV0FBcEMsRUFBaURSLGdCQUFqRCxFQUFtRVQsTUFBbkUsRUFBMkVVLHNCQUFhQyxNQUF4RixFQUFnRyxJQUFoRztBQUNILEtBRkQ7QUFHSCxHQUpELE1BSU87QUFDSDtBQUNBVix1QkFBUVksWUFBUixDQUFxQk0scUJBQXJCLENBQTJDZCxHQUFHLENBQUNlLElBQS9DLEVBQXFEZixHQUFHLENBQUNnQixHQUF6RCxFQUE4RGIsSUFBOUQsRUFBb0VjLDJCQUFwRSxFQUEwRnRCLE1BQTFGLEVBQWtHTSxJQUFsRyxDQUF1RyxVQUFDQyxJQUFELEVBQVU7QUFDN0csVUFBSUEsSUFBSSxJQUFJQSxJQUFJLENBQUNnQixXQUFqQixFQUE4QixDQUMxQjtBQUNILE9BRkQsTUFFTztBQUNILHlDQUFxQmYsSUFBckIsRUFBMkJELElBQUksQ0FBQ0YsR0FBaEMsRUFBcUNWLEVBQXJDLEVBQXlDWSxJQUFJLENBQUNVLFdBQTlDLEVBQTJEUixnQkFBM0QsRUFBNkVULE1BQTdFLEVBQXFGVSxzQkFBYWMsS0FBbEcsRUFBeUcsS0FBekcsRUFBZ0gsSUFBaEg7QUFDSDtBQUNKLEtBTkQ7QUFPSDtBQUNKLENBckJEO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0F0QyxFQUFFLENBQUN1QyxZQUFILEdBQWtCLFVBQVUvQixNQUFWLEVBQWtCO0FBQ2hDLE1BQUlXLEdBQUcsR0FBR1gsTUFBTSxDQUFDVyxHQUFqQjtBQUNBLE1BQUlMLE1BQU0sR0FBRyxzQkFBVU4sTUFBVixDQUFiOztBQUNBTyxxQkFBUVksWUFBUixDQUFxQkMsZUFBckIsQ0FBcUNULEdBQXJDLEVBQTBDbkIsRUFBRSxDQUFDd0MsTUFBN0MsRUFBcUQxQixNQUFyRCxFQUE2RE0sSUFBN0QsQ0FBa0UsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hFLHFDQUFxQmIsTUFBckIsRUFBNkJhLElBQTdCO0FBQ0gsR0FGRDtBQUdILENBTkQ7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFvQixFQUFFLENBQUNDLFFBQUgsQ0FBWXhDLFNBQVosQ0FBc0J5QyxrQkFBdEIsR0FBMkMsVUFBVW5DLE1BQVYsRUFBa0I7QUFDekQsTUFBSUMsRUFBRSxHQUFHLElBQVQ7O0FBQ0EsTUFBSUQsTUFBTSxDQUFDRSxXQUFQLElBQXNCQyxTQUF0QixJQUFtQ0gsTUFBTSxDQUFDRSxXQUFQLElBQXNCLElBQTdELEVBQW1FO0FBQy9ERixJQUFBQSxNQUFNLENBQUNFLFdBQVAsR0FBcUIsSUFBckI7QUFDSDs7QUFDREsscUJBQVFDLFlBQVIsQ0FBcUJDLE1BQXJCLENBQTRCMkIsWUFBNUIsQ0FBeUNwQyxNQUFNLENBQUNxQyxJQUFoRCxFQUFzRHJDLE1BQU0sQ0FBQ3NDLElBQTdELEVBQW1FdEMsTUFBTSxDQUFDRSxXQUExRSxFQUF1RlUsSUFBdkYsQ0FBNEYsVUFBQ0MsSUFBRCxFQUFVO0FBQ2xHLHdDQUF3QlosRUFBeEIsRUFBNEJELE1BQTVCLEVBQW9DYSxJQUFwQyxFQUEwQ0csc0JBQWFDLE1BQXZEO0FBQ0gsR0FGRDtBQUdILENBUkQ7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQWdCLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZeEMsU0FBWixDQUFzQjBDLFlBQXRCLEdBQXFDLFVBQVVwQyxNQUFWLEVBQWtCO0FBQ25ELE1BQUlDLEVBQUUsR0FBRyxJQUFUO0FBQ0EsTUFBSVUsR0FBRyxHQUFHWCxNQUFNLENBQUNXLEdBQWpCO0FBQ0EsTUFBSUwsTUFBTSxHQUFHLHNCQUFVTixNQUFWLENBQWI7O0FBQ0FPLHFCQUFRWSxZQUFSLENBQXFCQyxlQUFyQixDQUFxQ1QsR0FBckMsRUFBMENzQixFQUFFLENBQUNNLFlBQTdDLEVBQTJEakMsTUFBM0QsRUFBbUVNLElBQW5FLENBQXdFLFVBQUNDLElBQUQsRUFBVTtBQUM5RSx3Q0FBd0JaLEVBQXhCLEVBQTRCRCxNQUE1QixFQUFvQ2EsSUFBcEM7QUFDSCxHQUZEO0FBR0gsQ0FQRDtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQXJCLEVBQUUsQ0FBQ2dELE1BQUgsQ0FBVTlDLFNBQVYsQ0FBb0IrQyxVQUFwQixHQUFpQyxVQUFVekMsTUFBVixFQUFrQjtBQUMvQyxtQ0FBcUIsSUFBckIsRUFBMkJBLE1BQTNCO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FSLEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU2hELFNBQVQsQ0FBbUJpRCxRQUFuQixHQUE4QixVQUFVM0MsTUFBVixFQUFrQjtBQUM1QyxNQUFJNEMsSUFBSSxHQUFHNUMsTUFBTSxDQUFDNEMsSUFBbEI7QUFDQSxNQUFJM0MsRUFBRSxHQUFHLElBQVQ7QUFDQSxNQUFJSyxNQUFNLEdBQUcsc0JBQVVOLE1BQVYsQ0FBYjs7QUFDQU8scUJBQVFZLFlBQVIsQ0FBcUJDLGVBQXJCLENBQXFDd0IsSUFBckMsRUFBMkNwRCxFQUFFLENBQUNxRCxJQUE5QyxFQUFvRHZDLE1BQXBELEVBQTRETSxJQUE1RCxDQUFpRSxVQUFDQyxJQUFELEVBQVU7QUFDdkUsNkJBQWFaLEVBQWIsRUFBaUJELE1BQWpCLEVBQXlCYSxJQUF6QjtBQUNILEdBRkQ7QUFHSCxDQVBEO0FBU0E7OztBQUNBckIsRUFBRSxDQUFDa0QsS0FBSCxDQUFTaEQsU0FBVCxDQUFtQm9ELGFBQW5CLEdBQW1DLFlBQVk7QUFDM0M7QUFDQSxNQUFJLEtBQUtDLHNCQUFULEVBQWlDO0FBQzdCLFNBQUtBLHNCQUFMO0FBQ0gsR0FGRCxDQUdBO0FBSEEsT0FJSyxJQUFJLEtBQUtDLGlCQUFULEVBQTRCO0FBQzdCLFNBQUtBLGlCQUFMLENBQXVCLElBQXZCO0FBQ0g7QUFDSixDQVREO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0F4RCxFQUFFLENBQUN5RCxjQUFILENBQWtCdkQsU0FBbEIsQ0FBNEJ3RCxRQUE1QixHQUF1QyxVQUFVbEQsTUFBVixFQUFrQjtBQUNyRCxNQUFJQyxFQUFFLEdBQUcsSUFBVDtBQUNBLE1BQUlVLEdBQUcsR0FBR1gsTUFBTSxDQUFDVyxHQUFqQjtBQUNBLE1BQUlMLE1BQU0sR0FBRyxzQkFBVU4sTUFBVixDQUFiOztBQUNBTyxxQkFBUVksWUFBUixDQUFxQkMsZUFBckIsQ0FBcUNULEdBQXJDLEVBQTBDbkIsRUFBRSxDQUFDMkQsYUFBN0MsRUFBNEQ3QyxNQUE1RCxFQUFvRU0sSUFBcEUsQ0FBeUUsVUFBQ0MsSUFBRCxFQUFVO0FBQy9FLHNDQUFzQlosRUFBdEIsRUFBMEJELE1BQTFCLEVBQWtDYSxJQUFsQztBQUNILEdBRkQ7QUFHSCxDQVBEO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FyQixFQUFFLENBQUM0RCxlQUFILEdBQXFCLFVBQVVDLElBQVYsRUFBZ0I7QUFDakMsTUFBSUEsSUFBSixFQUFVO0FBQ047QUFDQSxRQUFJQyxNQUFNLEdBQUc5RCxFQUFiOztBQUNBLFFBQUk4RCxNQUFNLENBQUNDLGNBQVgsRUFBMkI7QUFDdkJELE1BQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkgsZUFBdEIsQ0FBc0NDLElBQXRDO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsVUFBSUcsUUFBSixFQUFjaEUsRUFBRSxDQUFDaUUsS0FBSCxDQUFTLEtBQUtDLE9BQWQ7QUFDakI7QUFDSjtBQUNKLENBVkQ7O0FBYUEsSUFBSSxDQUFDQyxTQUFMLEVBQWdCO0FBRVo7QUFDQSxNQUFJbkUsRUFBRSxDQUFDb0UsR0FBSCxDQUFPQyxTQUFQLElBQW9CLENBQUNDLFVBQXJCLElBQW1DdEUsRUFBRSxDQUFDb0UsR0FBSCxDQUFPRyxFQUFQLElBQWF2RSxFQUFFLENBQUNvRSxHQUFILENBQU9JLFVBQTNELEVBQXVFO0FBQ25FLFFBQUlSLFFBQUosRUFBY2hFLEVBQUUsQ0FBQ3lFLEdBQUgsdUJBRHFELENBRW5FO0FBQ0g7QUFDSjs7QUFFTSxTQUFTQyxrQkFBVCxHQUE4QixDQUNqQztBQUNIOztBQUVENUUsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxFQUFFLENBQUNrRCxLQUFILENBQVNoRCxTQUFoQyxFQUEyQyxVQUEzQyxFQUF1RDtBQUNuRHlFLEVBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsV0FBTyxLQUFLQyxTQUFaO0FBQ0gsR0FIa0Q7QUFJbkRDLEVBQUFBLEdBQUcsRUFBRSxhQUFVQyxDQUFWLEVBQWE7QUFDZDtBQUNBLFFBQUlDLElBQUksR0FBRyxJQUFYOztBQUNBLFFBQUlDLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0YsQ0FBRCxFQUFJRyxFQUFKLEVBQVc7QUFDNUIsVUFBSUgsQ0FBQyxLQUFNSSxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsQ0FBZCxLQUFvQkEsQ0FBQyxDQUFDTSxNQUFGLEdBQVcsQ0FBaEMsSUFBc0MsQ0FBQyxDQUFDTixDQUE3QyxDQUFMLEVBQXNEO0FBQ2xELFlBQUkzRSxLQUFLLEdBQUcsSUFBWjs7QUFDQSxZQUFJK0UsS0FBSyxDQUFDQyxPQUFOLENBQWNMLENBQWQsQ0FBSixFQUFzQjtBQUNsQjNFLFVBQUFBLEtBQUssR0FBRzJFLENBQVI7QUFDSCxTQUZELE1BRU87QUFDSDNFLFVBQUFBLEtBQUssR0FBRyxDQUFDMkUsQ0FBRCxDQUFSO0FBQ0g7O0FBQ0RHLFFBQUFBLEVBQUUsSUFBSUEsRUFBRSxDQUFDLElBQUQsQ0FBUjtBQUNBRixRQUFBQSxJQUFJLENBQUNILFNBQUwsR0FBaUIsR0FBR1MsTUFBSCxDQUFVbEYsS0FBVixDQUFqQjtBQUNBNEUsUUFBQUEsSUFBSSxDQUFDTyxNQUFMLEdBQWN2RSxtQkFBUXdFLFFBQVIsQ0FBaUJaLEdBQWpCLENBQXFCeEUsS0FBckIsQ0FBZDtBQUNILE9BVkQsTUFVTztBQUNIOEUsUUFBQUEsRUFBRSxJQUFJQSxFQUFFLENBQUMsS0FBRCxDQUFSO0FBQ0FGLFFBQUFBLElBQUksQ0FBQ0gsU0FBTCxHQUFpQixJQUFqQjtBQUNBRyxRQUFBQSxJQUFJLENBQUNPLE1BQUwsR0FBYyxFQUFkO0FBQ0g7QUFDSixLQWhCRDs7QUFpQkEsUUFBSUUsK0JBQUosRUFBNEI7QUFDeEIsVUFBSVQsSUFBSSxDQUFDL0MsT0FBVCxFQUFrQjtBQUNkZ0QsUUFBQUEsY0FBYyxDQUFDRixDQUFELEVBQUksVUFBQ1csT0FBRCxFQUFhO0FBQzNCLGNBQUlBLE9BQUosRUFBYTtBQUNULGdCQUFJLENBQUMsQ0FBQyxDQUFDVixJQUFJLENBQUNXLGdCQUFaLEVBQThCO0FBQzFCWCxjQUFBQSxJQUFJLENBQUNXLGdCQUFMLEdBQXdCLElBQXhCOztBQUNBM0UsaUNBQVE0RSxlQUFSLENBQXdCQyxnQkFBeEIsQ0FBeUNDLG1CQUFTQyxlQUFsRCxFQUFtRWYsSUFBSSxDQUFDZ0IsaUJBQXhFLEVBQTJGaEIsSUFBM0Y7QUFDSDtBQUNKLFdBTEQsTUFLTztBQUNILGdCQUFJQSxJQUFJLENBQUNILFNBQVQsRUFBb0I7QUFDaEI3RCxpQ0FBUTRFLGVBQVIsQ0FBd0JLLG1CQUF4QixDQUE0Q0gsbUJBQVNDLGVBQXJELEVBQXNFZixJQUF0RTtBQUNIO0FBQ0o7QUFDSixTQVhhLENBQWQ7QUFZSDtBQUVKLEtBaEJELE1BZ0JPO0FBQ0hDLE1BQUFBLGNBQWMsQ0FBQ0YsQ0FBRCxFQUFJLElBQUosQ0FBZDtBQUNIO0FBQ0o7QUEzQ2tELENBQXZEOztBQThDQSxJQUFJLENBQUNYLFNBQUQsSUFBY3FCLCtCQUFsQixFQUEwQztBQUN0Q3hGLEVBQUFBLEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU2hELFNBQVQsQ0FBbUI2RixpQkFBbkIsR0FBdUMsWUFBWTtBQUMvQyxTQUFLUixRQUFMLEdBQWdCLEtBQUtBLFFBQXJCO0FBQ0gsR0FGRDs7QUFJQSxNQUFJVSxtQkFBbUIsR0FBR2pHLEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU2hELFNBQVQsQ0FBbUJnRyxTQUE3Qzs7QUFDQWxHLEVBQUFBLEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU2hELFNBQVQsQ0FBbUJnRyxTQUFuQixHQUErQixZQUFZO0FBQ3ZDLFFBQUksS0FBS1IsZ0JBQVQsRUFBMkI7QUFDdkIzRSx5QkFBUTRFLGVBQVIsQ0FBd0JLLG1CQUF4QixDQUE0Q0gsbUJBQVNDLGVBQXJELEVBQXNFLElBQXRFO0FBQ0g7O0FBQ0RHLElBQUFBLG1CQUFtQixJQUFJQSxtQkFBbUIsQ0FBQ0UsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdkI7QUFDSCxHQUxEOztBQU9BLE1BQUlDLGdCQUFnQixHQUFHcEcsRUFBRSxDQUFDa0QsS0FBSCxDQUFTaEQsU0FBVCxDQUFtQm1HLE1BQTFDOztBQUNBckcsRUFBQUEsRUFBRSxDQUFDa0QsS0FBSCxDQUFTaEQsU0FBVCxDQUFtQm1HLE1BQW5CLEdBQTRCLFlBQVk7QUFDcEMsUUFBSSxLQUFLZixNQUFMLENBQVlnQixPQUFaLENBQW9CQyxzQkFBcEIsSUFBcUMsQ0FBQyxDQUExQyxFQUE2QztBQUN6QyxXQUFLaEIsUUFBTCxHQUFnQixDQUFDLEtBQUtELE1BQU4sQ0FBaEI7QUFDSDs7QUFDRGMsSUFBQUEsZ0JBQWdCLElBQUlBLGdCQUFnQixDQUFDRCxJQUFqQixDQUFzQixJQUF0QixDQUFwQjtBQUNILEdBTEQ7QUFPSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYkVkaXRCb3hJbXBsIGZyb20gXCIuL1dlYkVkaXRCb3hJbXBsXCI7XG5pbXBvcnQgeyBSZXNvdXJjZVR5cGUsIEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UsIFVTSU5HX0xBTl9LRVksIEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQge1xuICAgIGFkZEV4dHJhTG9hZFJlc291cmNlLCBzZXRTcHJpdGVTcHJpdGVGcmFtZSwgc2V0QnV0dG9uU3ByaXRlRnJhbWUsXG4gICAgc2V0UGFydGljbGVTeXN0ZW1GaWxlLCBzZXRMYWJlbEZvbnQsIHNldFNrZWxldG9uU2tlbGV0b25EYXRhLFxuICAgIGNyZWF0ZU5vZGVXaXRoUHJlZmFiLCBnZXRCdW5kbGVcbn0gZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZyYW1ld29ya1wiO1xuXG4vKipAZGVzY3JpcHRpb24g5a+5Y2MuTm9kZSDmianlsZXkuIDkuKrkuLTml7blrZjlgqjnmoTnlKjmiLfoh6rlrprkuYnmlbDmja4gKi9cbmlmICh0eXBlb2YgUmVmbGVjdCA9PSBcIm9iamVjdFwiKSB7XG4gICAgLy/lnKjmtY/op4jlmajkuK3lt7Lnu4/mnInlj43lsIRcbiAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGNjLk5vZGUucHJvdG90eXBlLCBcInVzZXJEYXRhXCIsIHtcbiAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIH0pO1xufSBlbHNlIHtcbiAgICBjYy5Ob2RlLnByb3RvdHlwZS51c2VyRGF0YSA9IG51bGw7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS7jue9kee7nOWKoOi9veWbvueJh++8jOaOqOiNkOS9v+eUqOesrOS6jOenjeaWueW8j1xuICogQHBhcmFtIHVybCDnvZHnu5zlnLDlnYDvvIzlpoIgOiBodHRwOi8vdG9vbHMuaXRoYXJib3JzLmNvbS9yZXMvbG9nby5wbmdcbiAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIOWKoOi9veWujOaIkOWbnuiwg1xuICogQHBhcmFtIGRlZmF1bHRTcHJpdGVGcmFtZSDliqDovb3lm77niYflpLHotKXlkI7vvIzkvb/nlKjnmoTpu5jorqTlm77niYcs5b2T5Lyg5YWlc3RyaW5n5pe277yM5Lya5Yqo5oCB5Yqg6L296K+l6buY6K6k5Zu+54mHXG4gKiBAcGFyYW0gaXNOZWVkQ2FjaGUg5piv5ZCm6ZyA6KaB57yT5a2Y5Yiw5pys5ZywLOWmguaenOS4jemcgOimge+8jOavj+asoemDveS8muS7jue9kee7nOaLieWPlui1hOa6kCzpu5jorqTpg73kvJrnvJPlrZjliLDmnKzlnLBcbiAqIEBwYXJhbSBjb25maWcucmV0YWluIOi/nOeoi+WKoOi9veeahOi1hOa6kOaYr+WQpumpu+eVmeWcqOWGheWtmOS4rSzpu5jorqTpg73kuI3pqbvnlZnlhoXlrZhcbiAqIEBleGFtcGxlXG4gKiDnpLrkvosx77yaXG4gKiBsZXQgc3ByaXRlID0gaW1hZ2VOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICogc3ByaXRlLmxvYWRSZW1vdGVJbWFnZSh7dXJsIDpcImh0dHA6Ly90b29scy5pdGhhcmJvcnMuY29tL3Jlcy9sb2dvLnBuZ1wiLCBkZWZhdWx0U3ByaXRlRnJhbWUgOiBIQUxMKFwidGV4dHVyZXMvYXZhdGFyX2RlZmF1bHRfMC5wbmdcIiksIHZpZXcgOiB0aGlzLGNvbXBsZXRlQ2FsbGJhY2sgOiAoZGF0YSk9PntcbiAqIFx0XHRpZiAoIGRhdGEgKSB7IGRvIHNvbWV0aGluZyB9XG4gKiB9fSk7XG4gKiBcbiAqIOekuuS+izI6XG4gKiBsZXQgc3ByaXRlID0gaW1hZ2VOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICogc3ByaXRlLmxvYWRSZW1vdGVJbWFnZSh7dXJsIDpcImh0dHA6Ly90b29scy5pdGhhcmJvcnMuY29tL3Jlcy9sb2dvLnBuZ1wiLCBkZWZhdWx0U3ByaXRlRnJhbWUgOiBIQUxMKFwidGV4dHVyZXMvYXZhdGFyX2RlZmF1bHRfMC5wbmdcIiksIHZpZXcgOiB0aGlzfSk7XG4gKiBcbiAqIOekuuS+izPvvJpcbiAqIGxldCBzcHJpdGUgPSBpbWFnZU5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gKiBzcHJpdGUubG9hZFJlbW90ZUltYWdlKHt1cmwgOlwiaHR0cDovL3Rvb2xzLml0aGFyYm9ycy5jb20vcmVzL2xvZ28ucG5nXCIsIHZpZXcgOiB0aGlzfSk7XG4gKiB9XG4gKi9cblxuLy9jb25maWcgOiB7dXJsOiBzdHJpbmcsIHZpZXcgOiBhbnkgLCBjb21wbGV0ZUNhbGxiYWNrPzogKGRhdGE6IGNjLlNwcml0ZUZyYW1lKSA9PiB2b2lkLCBkZWZhdWx0U3ByaXRlRnJhbWU/OiBzdHJpbmcgLCBpc05lZWRDYWNoZSA/OiBib29sZWFuIH1cbmNjLlNwcml0ZS5wcm90b3R5cGUubG9hZFJlbW90ZUltYWdlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgaWYgKGNvbmZpZy5pc05lZWRDYWNoZSA9PSB1bmRlZmluZWQgfHwgY29uZmlnLmlzTmVlZENhY2hlID09IG51bGwpIHtcbiAgICAgICAgY29uZmlnLmlzTmVlZENhY2hlID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGlzUmV0YWluID0gZmFsc2U7XG4gICAgaWYgKGNvbmZpZy5yZXRhaW4pIHtcbiAgICAgICAgaXNSZXRhaW4gPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgYnVuZGxlID0gZ2V0QnVuZGxlKGNvbmZpZyk7XG4gICAgTWFuYWdlci5hc3NldE1hbmFnZXIucmVtb3RlLmxvYWRJbWFnZShjb25maWcudXJsLCBjb25maWcuaXNOZWVkQ2FjaGUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHNldFNwcml0ZVNwcml0ZUZyYW1lKGNvbmZpZy52aWV3LCBjb25maWcudXJsLCBtZSwgZGF0YSwgY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2ssIGJ1bmRsZSwgUmVzb3VyY2VUeXBlLlJlbW90ZSwgaXNSZXRhaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5kZWZhdWx0U3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5kZWZhdWx0U3ByaXRlRnJhbWUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAvL+WKqOaAgeWKoOi9veS6huS4gOW8oOWbvueJh++8jOaKiui1hOa6kOmAmuefpeeuoeeQhuWZqFxuICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5nZXRDYWNoZUJ5QXN5bmMoY29uZmlnLmRlZmF1bHRTcHJpdGVGcmFtZSwgY2MuU3ByaXRlRnJhbWUsIEJVTkRMRV9SRVNPVVJDRVMpLnRoZW4oKHNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTcHJpdGVTcHJpdGVGcmFtZShjb25maWcudmlldywgY29uZmlnLmRlZmF1bHRTcHJpdGVGcmFtZSwgbWUsIHNwcml0ZUZyYW1lLCBjb25maWcuY29tcGxldGVDYWxsYmFjaywgYnVuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuY29tcGxldGVDYWxsYmFjayAmJiBjYy5pc1ZhbGlkKG1lKSkgY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2soZGF0YSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDliqDovb3mnKzlnLDlm77niYdcbiAqIEBwYXJhbSB1cmwg5Zu+54mH6Lev5b6EIHt1cmxzOnN0cmluZ1tdLGtleTpzdHJpbmd9IHVybHMg5Li657q555CG5ZCN5aaC5p6c5pyJ5q2k57q555CG5Lya5omT5YyF5oiQ5aSa5byg77yM5q2k5pe26ZyA6KaB5Lyg5YWl5omA5pyJ57q555CG55qE5Zyw5Z2A77yMa2V55oyH57q555CG5Lit5ZCN5a2XXG4gKiBAcGFyYW0gdmlldyDmiYDlsZ7op4blm77vvIxVSVZpZXfnmoTlrZDnsbtcbiAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIOWujOaIkOWbnuiwg1xuICogQGV4YW1wbGVcbiAqIOekuuS+izHvvJpcbiAqIHNwcml0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5sb2FkSW1hZ2Uoe3VybDp7dXJsczpbXCJwbGlzdC9maXNoXzMwXCIsXCJwbGlzdC9maXNoXzMwXzFcIixcInBsaXN0L2Zpc2hfMzBfMlwiXSxrZXk6XCJmaXNoTW92ZV8wMzBfMjhcIn0sdmlldzp0aGlzfSk7XG4gKiDnpLrkvosy77yaXG4gKiBzcHJpdGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkubG9hZEltYWdlKHt1cmw6XCJoYWxsL2FcIix2aWV3OnRoaXN9KTtcbiAqL1xuLy9sb2FkSW1hZ2UoIGNvbmZpZyA6IHsgdXJsIDogc3RyaW5nIHwge3VybHM6c3RyaW5nW10sa2V5OnN0cmluZ30gLCB2aWV3IDogYW55ICwgY29tcGxldGVDYWxsYmFjaz86KGRhdGEgOiBTcHJpdGVGcmFtZSk9PnZvaWR9KTtcbmNjLlNwcml0ZS5wcm90b3R5cGUubG9hZEltYWdlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuXG4gICAgbGV0IG1lID0gdGhpcztcbiAgICBsZXQgdmlldyA9IGNvbmZpZy52aWV3O1xuICAgIGxldCB1cmwgPSBjb25maWcudXJsO1xuICAgIGxldCBjb21wbGV0ZUNhbGxiYWNrID0gY29uZmlnLmNvbXBsZXRlQ2FsbGJhY2s7XG4gICAgbGV0IGJ1bmRsZSA9IGdldEJ1bmRsZShjb25maWcpO1xuICAgIGlmICh0eXBlb2YgdXJsID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgTWFuYWdlci5jYWNoZU1hbmFnZXIuZ2V0Q2FjaGVCeUFzeW5jKHVybCwgY2MuU3ByaXRlRnJhbWUsIGJ1bmRsZSkudGhlbigoc3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgIHNldFNwcml0ZVNwcml0ZUZyYW1lKHZpZXcsIHVybCwgbWUsIHNwcml0ZUZyYW1lLCBjb21wbGV0ZUNhbGxiYWNrLCBidW5kbGUsIFJlc291cmNlVHlwZS5SZW1vdGUsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvL+WcqOe6ueeQhuWbvumbhuS4reafpeaJvlxuICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5nZXRTcHJpdGVGcmFtZUJ5QXN5bmModXJsLnVybHMsIHVybC5rZXksIHZpZXcsIGFkZEV4dHJhTG9hZFJlc291cmNlLCBidW5kbGUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuaXNUcnlSZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAvL+adpeWIsOi/memHjOmdoueoi+W6j+W3sue7j+W0qea6g+S6hu+8jOaXoOaEj+S5ieWcqOWkhOeQhuS6hlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRTcHJpdGVTcHJpdGVGcmFtZSh2aWV3LCBkYXRhLnVybCwgbWUsIGRhdGEuc3ByaXRlRnJhbWUsIGNvbXBsZXRlQ2FsbGJhY2ssIGJ1bmRsZSwgUmVzb3VyY2VUeXBlLkxvY2FsLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqQGRlc2NyaXB0aW9uIOmAmui/h+mihOe9ruS9k+i3r+W+hOWIm+W7uuiKgueCuSBcbiAqIEBwYXJhbSBjb25maWcg6YWN572u5L+h5oGvXG4gKiBAcGFyYW0gY29uZmlnLnVybCDpooTnva7kvZPot6/lvoRcbiAqIEBwYXJhbSBjb25maWcudmlldyDpooTnva7op4blm77otYTmupDnrqHnkIblmajvvIznu6fmib/oh6pVSVZpZXdcbiAqIEBwYXJhbSBjb25maWcuY29tcGxldGVDYWxsYmFjayDliJvlu7rlrozmiJDlm57osIMgXG4gKiBAZXhhbXBsZSBcbiAqIGNjLmNyZWF0ZVByZWZhYih7dXJsIDpHQU1FX1JFUyhcInJlcy9hbmltYXRpb25zL3NoekRlYWxlckNvbW1vblwiKSx2aWV3OnRoaXMsY29tcGxldGVDYWxsYmFjazoobm9kZSk9PntcbiAqICAgICBpZiAoIG5vZGUgKXtcbiAqICAgICAgICAgLy8gdG8gZG8gXG4gKiAgICAgfVxuICogfX0pO1xuICovXG5jYy5jcmVhdGVQcmVmYWIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgbGV0IHVybCA9IGNvbmZpZy51cmw7XG4gICAgbGV0IGJ1bmRsZSA9IGdldEJ1bmRsZShjb25maWcpO1xuICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldENhY2hlQnlBc3luYyh1cmwsIGNjLlByZWZhYiwgYnVuZGxlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNyZWF0ZU5vZGVXaXRoUHJlZmFiKGNvbmZpZywgZGF0YSlcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5omp5bGV5pa55rOVXG4gKiBAcGFyYW0gcmVtb3RlUGF0aCDov5znqIvotYTmupDot6/lvoRcbiAqIEBwYXJhbSBuYW1lIOi/nOeoi1NwaW5l5paH5Lu25ZCN77yM5LiN5YaN5ZCO57yAXG4gKiBAcGFyYW0gY29tcGxldGVDYWxsYmFjayDlrozmiJDlm57osINcbiAqIEBwYXJhbSBpc05lZWRDYWNoZSDmmK/lkKbpnIDopoHnvJPlrZjliLDmnKzlnLAs5aaC5p6c5LiN6ZyA6KaB77yM5q+P5qyh6YO95Lya5LuO572R57uc5ouJ5Y+W6LWE5rqQLOm7mOiupOmDveS8mue8k+WtmOWIsOacrOWcsFxuICogQHBhcmFtIGNvbmZpZy5yZXRhaW4g6L+c56iL5Yqg6L2955qE6LWE5rqQ5piv5ZCm6am755WZ5Zyo5YaF5a2Y5LitLOm7mOiupOmDveS4jempu+eVmeWGheWtmFxuICogQGV4YW1wbGVcbiAqIHZhciBza2VsZXRvbiA9IG5vZGUuYWRkQ29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAqXG4gKiBsZXQgcGF0aCA9IFwiaHR0cHM6Ly9iYy10ZXN0MS5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tL2ltYWdlL2FjdGlvblwiO1xuICogbGV0IG5hbWUgPSBcIm5ub2hfdjRcIjtcbiAqIHNrZWxldG9uLmxvYWRSZW1vdGVTa2VsZXRvbih7dmlldyA6IHRoaXMgLCBwYXRoIDogcGF0aCwgbmFtZSA6IG5hbWUsIGNvbXBsZXRlQ2FsbGJhY2sgOiAoZGF0YTpzcC5Ta2VsZXRvbkRhdGEpPT57XG4gKiAgICBpZiAoZGF0YSkge1xuICogICAgICAgIHNrZWxldG9uLmFuaW1hdGlvbiA9ICdsb29wJztcbiAqICAgICAgICBza2VsZXRvbi5wcmVtdWx0aXBsaWVkQWxwaGEgPSBmYWxzZTtcbiAqICAgIH1cbiAqIH19KTtcbiAqL1xuXG5zcC5Ta2VsZXRvbi5wcm90b3R5cGUubG9hZFJlbW90ZVNrZWxldG9uID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgaWYgKGNvbmZpZy5pc05lZWRDYWNoZSA9PSB1bmRlZmluZWQgfHwgY29uZmlnLmlzTmVlZENhY2hlID09IG51bGwpIHtcbiAgICAgICAgY29uZmlnLmlzTmVlZENhY2hlID0gdHJ1ZTtcbiAgICB9XG4gICAgTWFuYWdlci5hc3NldE1hbmFnZXIucmVtb3RlLmxvYWRTa2VsZXRvbihjb25maWcucGF0aCwgY29uZmlnLm5hbWUsIGNvbmZpZy5pc05lZWRDYWNoZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBzZXRTa2VsZXRvblNrZWxldG9uRGF0YShtZSwgY29uZmlnLCBkYXRhLCBSZXNvdXJjZVR5cGUuUmVtb3RlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5Yqg6L295Yqo55S7XG4gKiBAZXhhbXBsZVxuICogYWN0aW9uLmxvYWRTa2VsZXRvbih7dXJsOlwiaGFsbC92aXAvdmlwQWN0aW9uL3ZpcF8xMFwiLHZpZXc6dGhpcyxjb21wbGV0ZUNhbGxiYWNrOihkYXRhKT0+e1xuICpcdGlmICggZGF0YSApe1xuICpcdFx0YWN0aW9uLmFuaW1hdGlvbiA9IFwibG9vcFwiO1xuICpcdFx0YWN0aW9uLmxvb3AgPSB0cnVlO1xuICpcdFx0YWN0aW9uLnByZW11bHRpcGxpZWRBbHBoYSA9IGZhbHNlO1xuICpcdH1cbiAqIH19KTtcbiAqL1xuc3AuU2tlbGV0b24ucHJvdG90eXBlLmxvYWRTa2VsZXRvbiA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICBsZXQgbWUgPSB0aGlzO1xuICAgIGxldCB1cmwgPSBjb25maWcudXJsO1xuICAgIGxldCBidW5kbGUgPSBnZXRCdW5kbGUoY29uZmlnKTtcbiAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5nZXRDYWNoZUJ5QXN5bmModXJsLCBzcC5Ta2VsZXRvbkRhdGEsIGJ1bmRsZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBzZXRTa2VsZXRvblNrZWxldG9uRGF0YShtZSwgY29uZmlnLCBkYXRhKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5Yqg6L295oyJ6ZKuXG4gKiBAZXhhbXBsZVxuICogbGV0IGJ1dHRvbiA9IGNjLmZpbmQoXCJidXR0b25cIix0aGlzLm5vZGUpO1xuICogYnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmxvYWRCdXR0b24oe25vcm1hbFNwcml0ZSA6IFwiaGFsbC9hXCIsdmlldzp0aGlzfSk7XG4gKiBidXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikubG9hZEJ1dHRvbih7bm9ybWFsU3ByaXRlIDogXCJoYWxsL2JcIixwcmVzc2VkU3ByaXRlIDogXCJoYWxsL2NcIix2aWV3OnRoaXN9KTtcbiAqL1xuY2MuQnV0dG9uLnByb3RvdHlwZS5sb2FkQnV0dG9uID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHNldEJ1dHRvblNwcml0ZUZyYW1lKHRoaXMsIGNvbmZpZyk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOWKoOi9veWtl+S9k1xuICogQGV4YW1wbGVcbiAqIGxldCBjb250ZW50ID0gY2MuZmluZChcImNvbnRlbnRcIix0aGlzLm5vZGUpOyBcbiAqIGNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5sb2FkRm9udCh7Zm9udDpyb29tUGF0aCArIGRmRm9udCx2aWV3OnRoaXN9KTtcbiAqL1xuY2MuTGFiZWwucHJvdG90eXBlLmxvYWRGb250ID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGxldCBmb250ID0gY29uZmlnLmZvbnQ7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICBsZXQgYnVuZGxlID0gZ2V0QnVuZGxlKGNvbmZpZyk7XG4gICAgTWFuYWdlci5jYWNoZU1hbmFnZXIuZ2V0Q2FjaGVCeUFzeW5jKGZvbnQsIGNjLkZvbnQsIGJ1bmRsZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBzZXRMYWJlbEZvbnQobWUsIGNvbmZpZywgZGF0YSk7XG4gICAgfSk7XG59XG5cbi8qKkBkZXNjcmlwdGlvbiDlvLrliLZsYWJlbOWcqOW9k+WJjeW4p+i/m+ihjOe7mOWItiAqL1xuY2MuTGFiZWwucHJvdG90eXBlLmZvcmNlRG9MYXlvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8yLjIuMFxuICAgIGlmICh0aGlzLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEpIHtcbiAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgfVxuICAgIC8vMi4yLjDku6XkuIvniYjmnKxcbiAgICBlbHNlIGlmICh0aGlzLl91cGRhdGVSZW5kZXJEYXRhKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEodHJ1ZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDliqDovb3nibnmlYjmlofku7YgdmlldyDkuLpudWxs5pe277yM5Yqg6L295LmL5YmN5LiN5Lya6YeKXG4gKiBAZXhhbXBsZVxuICogbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICogbGV0IHBhciA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtKTtcbiAqIHBhci5sb2FkRmlsZSh7dXJsOkdBTUVfUkVTKCBcInJlcy9hY3Rpb24vRERaX3dpbl9saXppXCIgKSx2aWV3Om51bGx9KTtcbiAqIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcbiAqL1xuY2MuUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLmxvYWRGaWxlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgbGV0IHVybCA9IGNvbmZpZy51cmw7XG4gICAgbGV0IGJ1bmRsZSA9IGdldEJ1bmRsZShjb25maWcpO1xuICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldENhY2hlQnlBc3luYyh1cmwsIGNjLlBhcnRpY2xlQXNzZXQsIGJ1bmRsZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBzZXRQYXJ0aWNsZVN5c3RlbUZpbGUobWUsIGNvbmZpZywgZGF0YSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOW8uuWItuiKgueCueWcqOW9k+WJjeW4p+i/m+ihjOS4gOasoeW4g+WxgCBcbiAqIEBleGFtcGxlXG4gKiBjYy51cGRhdGVBbGlnbm1lbnQodGhpcy5ub2RlKTtcbiAqICovXG5jYy51cGRhdGVBbGlnbm1lbnQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChub2RlKSB7XG4gICAgICAgIC8v5by65Yi25b2T5YmN6IqC54K56L+b6KGM5pys5bin5by65Yi25biD5bGAXG4gICAgICAgIGxldCBiYWNrY2MgPSBjYztcbiAgICAgICAgaWYgKGJhY2tjYy5fd2lkZ2V0TWFuYWdlcikge1xuICAgICAgICAgICAgYmFja2NjLl93aWRnZXRNYW5hZ2VyLnVwZGF0ZUFsaWdubWVudChub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IodGhpcy5fbG9nVGFnLCBg5byV5pOO5Y+Y5YyWLOWOn+Wni+W8leaTjueJiOacrDIuMS4y77yM5om+5LiN5YiwY2MuX3dpZGdldE1hbmFnZXJgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5pZiAoIUNDX0VESVRPUikge1xuXG4gICAgLy/lr7nlvJXmk47ovpPlhaXmoYbov5vooYzkv67mlLkgLOWOn+Wni+W8leaTjueJiOacrDIuMS4yXG4gICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIgJiYgIUNDX1BSRVZJRVcgJiYgY2Muc3lzLm9zICE9IGNjLnN5cy5PU19XSU5ET1dTKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGDmtY/op4jlmahgKTtcbiAgICAgICAgLy8gY2MuRWRpdEJveC5fSW1wbENsYXNzID0gV2ViRWRpdEJveEltcGw7IFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvY29zRXh0ZW50aW9uSW5pdCgpIHtcbiAgICAvL2NjLmxvZyhcIkNvY29zRXh0ZW50aW9uSW5pdFwiKTtcbn1cblxuUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYy5MYWJlbC5wcm90b3R5cGUsIFwibGFuZ3VhZ2VcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2U7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIC8v6K+l5ri45oiP5YWB6K645Zyo5ri45oiP5Lit6L+b6KGM6K+t6KiA5YyF5YiH5o2iLOW9k+iuvue9rueahOWAvOS4uiBudWxsIHwgW10g5pe277yM5riF6ZmkbGFuZ3VhZ2XnmoTkuovku7bnu5HlrppcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgdXBkYXRlTGFuZ3VhZ2UgPSAodiwgY2IpID0+IHtcbiAgICAgICAgICAgIGlmICh2ICYmICgoQXJyYXkuaXNBcnJheSh2KSAmJiB2Lmxlbmd0aCA+IDApIHx8ICEhdikpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2IgJiYgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5fbGFuZ3VhZ2UgPSBbXS5jb25jYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3RyaW5nID0gTWFuYWdlci5sYW5ndWFnZS5nZXQodmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYiAmJiBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5fbGFuZ3VhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgaWYgKHNlbGYuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUxhbmd1YWdlKHYsIChpc1VzaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1VzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISEhc2VsZi5faXNVc2luZ2xhbmd1YWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5faXNVc2luZ2xhbmd1YWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgc2VsZi5fb25DaGFuZ2VMYW5ndWFnZSwgc2VsZik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fbGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmV2ZW50RGlzcGF0Y2hlci5yZW1vdmVFdmVudExpc3RlbmVyKEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgc2VsZik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cGRhdGVMYW5ndWFnZSh2LCBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5pZiAoIUNDX0VESVRPUiAmJiBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgY2MuTGFiZWwucHJvdG90eXBlLl9vbkNoYW5nZUxhbmd1YWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcbiAgICB9XG5cbiAgICBsZXQgX19sYWJlbF9vbkRlc3Ryb3lfXyA9IGNjLkxhYmVsLnByb3RvdHlwZS5vbkRlc3Ryb3k7XG4gICAgY2MuTGFiZWwucHJvdG90eXBlLm9uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzVXNpbmdsYW5ndWFnZSkge1xuICAgICAgICAgICAgTWFuYWdlci5ldmVudERpc3BhdGNoZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIF9fbGFiZWxfb25EZXN0cm95X18gJiYgX19sYWJlbF9vbkRlc3Ryb3lfXy5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIGxldCBfX2xhYmVsX29uTG9hZF9fID0gY2MuTGFiZWwucHJvdG90eXBlLm9uTG9hZDtcbiAgICBjYy5MYWJlbC5wcm90b3R5cGUub25Mb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdHJpbmcuaW5kZXhPZihVU0lOR19MQU5fS0VZKSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlID0gW3RoaXMuc3RyaW5nXTtcbiAgICAgICAgfVxuICAgICAgICBfX2xhYmVsX29uTG9hZF9fICYmIF9fbGFiZWxfb25Mb2FkX18uY2FsbCh0aGlzKTtcbiAgICB9XG5cbn1cbiJdfQ==