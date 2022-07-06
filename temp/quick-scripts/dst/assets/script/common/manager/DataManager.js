
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/manager/DataManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8b1060tm2FGbr6zzK6trgyu', 'DataManager');
// script/common/manager/DataManager.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseManager_1 = __importDefault(require("../../framework/base/BaseManager"));
class DataManager extends BaseManager_1.default {
    constructor() {
        super();
        // 数据注册结构 Map<数据类名, 数据>
        this.m_dataMap = null;
        this.m_dataMap = new Map();
    }
    static getInstance() {
        if (this.s_instance === null) {
            this.s_instance = new DataManager();
        }
        return this.s_instance;
    }
    static destroy() {
        if (this.s_instance !== null) {
            this.s_instance.destroy();
        }
        this.s_instance = null;
    }
    /**
     * 销毁 清理所有数据
     */
    destroy() {
        this.m_dataMap.forEach((value, key, map) => {
            value.destroy();
        });
        this.m_dataMap.clear();
        this.m_dataMap = null;
    }
    /**
     * 获取数据对象
     * @param dataClass 数据类
     * @returns {BaseData} 数据对象
     */
    get(dataClass) {
        let className = cc.js.getClassName(dataClass);
        let baseData = this.m_dataMap.get(className);
        if (baseData === undefined || baseData === null) {
            baseData = this.add(dataClass);
        }
        return baseData;
    }
    /**
     * 添加数据
     * @param dataClass {DataInterface.DataClass<T>} 数据类
     */
    add(dataClass) {
        let className = cc.js.getClassName(dataClass);
        if (this.m_dataMap === null) {
            G.Logger.warn(`添加 ${className} 数据失败`);
            return;
        }
        let baseData = this.m_dataMap.get(className);
        if (baseData) {
            G.Logger.warn(`已经存在 ${className} 对象`);
            return baseData;
        }
        baseData = new dataClass();
        this.m_dataMap.set(className, baseData);
        return baseData;
    }
    /**
     * 删除数据
     */
    del(dataClass) {
        let className = cc.js.getClassName(dataClass);
        if (this.m_dataMap === null) {
            return;
        }
        let baseData = this.m_dataMap.get(className);
        if (baseData) {
            baseData.destroy();
            this.m_dataMap.delete(className);
        }
    }
}
exports.default = DataManager;
DataManager.s_instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL21hbmFnZXIvRGF0YU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtRkFBMkQ7QUFHM0QsTUFBcUIsV0FBWSxTQUFRLHFCQUFXO0lBcUJoRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBbEJaLHVCQUF1QjtRQUNmLGNBQVMsR0FBMEIsSUFBSSxDQUFDO1FBbUI1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQWxCTSxNQUFNLENBQUMsV0FBVztRQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU87UUFDakIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQVFEOztPQUVHO0lBQ08sT0FBTztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBZSxFQUFFLEdBQVcsRUFBRSxHQUEwQixFQUFFLEVBQUU7WUFDaEYsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEdBQUcsQ0FBcUIsU0FBcUM7UUFDaEUsSUFBSSxTQUFTLEdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEQsSUFBSSxRQUFRLEdBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFNLENBQUM7UUFDckQsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDN0MsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksR0FBRyxDQUFxQixTQUFxQztRQUNoRSxJQUFJLFNBQVMsR0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0RCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sU0FBUyxPQUFPLENBQUMsQ0FBQztZQUN0QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQU0sQ0FBQztRQUNyRCxJQUFJLFFBQVEsRUFBRTtZQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsU0FBUyxLQUFLLENBQUMsQ0FBQztZQUN0QyxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUVELFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4QyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBR0Q7O09BRUc7SUFDSyxHQUFHLENBQXFCLFNBQXFDO1FBQ2pFLElBQUksU0FBUyxHQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDekIsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFNLENBQUM7UUFDckQsSUFBSSxRQUFRLEVBQUU7WUFDVixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDOztBQTNGTCw4QkE4RkM7QUE1RmtCLHNCQUFVLEdBQWdCLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRGF0YSBmcm9tIFwiLi4vLi4vYmFzZS9CYXNlRGF0YVwiO1xuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYmFzZS9CYXNlTWFuYWdlclwiO1xuaW1wb3J0ICogYXMgRGF0YUludGVyZmFjZSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlL0RhdGFJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzX2luc3RhbmNlOiBEYXRhTWFuYWdlciA9IG51bGw7XG5cbiAgICAvLyDmlbDmja7ms6jlhoznu5PmnoQgTWFwPOaVsOaNruexu+WQjSwg5pWw5o2uPlxuICAgIHByaXZhdGUgbV9kYXRhTWFwOiBNYXA8c3RyaW5nLCBCYXNlRGF0YT4gPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBEYXRhTWFuYWdlciB7XG4gICAgICAgIGlmICh0aGlzLnNfaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc19pbnN0YW5jZSA9IG5ldyBEYXRhTWFuYWdlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNfaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zX2luc3RhbmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNfaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc19pbnN0YW5jZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5tX2RhdGFNYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6ZSA5q+BIOa4heeQhuaJgOacieaVsOaNrlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fZGF0YU1hcC5mb3JFYWNoKCh2YWx1ZTogQmFzZURhdGEsIGtleTogc3RyaW5nLCBtYXA6IE1hcDxzdHJpbmcsIEJhc2VEYXRhPikgPT4ge1xuICAgICAgICAgICAgdmFsdWUuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tX2RhdGFNYXAuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tX2RhdGFNYXAgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaVsOaNruWvueixoVxuICAgICAqIEBwYXJhbSBkYXRhQ2xhc3Mg5pWw5o2u57G7XG4gICAgICogQHJldHVybnMge0Jhc2VEYXRhfSDmlbDmja7lr7nosaFcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0PFQgZXh0ZW5kcyBCYXNlRGF0YT4oZGF0YUNsYXNzOiBEYXRhSW50ZXJmYWNlLkRhdGFDbGFzczxUPik6IFQge1xuICAgICAgICBsZXQgY2xhc3NOYW1lOiBzdHJpbmcgPSBjYy5qcy5nZXRDbGFzc05hbWUoZGF0YUNsYXNzKTtcbiAgICAgICAgbGV0IGJhc2VEYXRhOiBUID0gdGhpcy5tX2RhdGFNYXAuZ2V0KGNsYXNzTmFtZSkgYXMgVDtcbiAgICAgICAgaWYgKGJhc2VEYXRhID09PSB1bmRlZmluZWQgfHwgYmFzZURhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGJhc2VEYXRhID0gdGhpcy5hZGQoZGF0YUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmFzZURhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5pWw5o2uXG4gICAgICogQHBhcmFtIGRhdGFDbGFzcyB7RGF0YUludGVyZmFjZS5EYXRhQ2xhc3M8VD59IOaVsOaNruexu1xuICAgICAqL1xuICAgIHB1YmxpYyBhZGQ8VCBleHRlbmRzIEJhc2VEYXRhPihkYXRhQ2xhc3M6IERhdGFJbnRlcmZhY2UuRGF0YUNsYXNzPFQ+KTogVCB7XG4gICAgICAgIGxldCBjbGFzc05hbWU6IHN0cmluZyA9IGNjLmpzLmdldENsYXNzTmFtZShkYXRhQ2xhc3MpO1xuXG4gICAgICAgIGlmICh0aGlzLm1fZGF0YU1hcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgRy5Mb2dnZXIud2Fybihg5re75YqgICR7Y2xhc3NOYW1lfSDmlbDmja7lpLHotKVgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYXNlRGF0YTogVCA9IHRoaXMubV9kYXRhTWFwLmdldChjbGFzc05hbWUpIGFzIFQ7XG4gICAgICAgIGlmIChiYXNlRGF0YSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIud2Fybihg5bey57uP5a2Y5ZyoICR7Y2xhc3NOYW1lfSDlr7nosaFgKTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhc2VEYXRhID0gbmV3IGRhdGFDbGFzcygpO1xuICAgICAgICB0aGlzLm1fZGF0YU1hcC5zZXQoY2xhc3NOYW1lLCBiYXNlRGF0YSk7XG4gICAgICAgIHJldHVybiBiYXNlRGF0YTtcbiAgICB9XG5cbiAgICBcbiAgICAvKipcbiAgICAgKiDliKDpmaTmlbDmja5cbiAgICAgKi9cbiAgICAgcHVibGljIGRlbDxUIGV4dGVuZHMgQmFzZURhdGE+KGRhdGFDbGFzczogRGF0YUludGVyZmFjZS5EYXRhQ2xhc3M8VD4pOiB2b2lkIHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZTogc3RyaW5nID0gY2MuanMuZ2V0Q2xhc3NOYW1lKGRhdGFDbGFzcyk7XG5cbiAgICAgICAgaWYgKHRoaXMubV9kYXRhTWFwID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmFzZURhdGE6IFQgPSB0aGlzLm1fZGF0YU1hcC5nZXQoY2xhc3NOYW1lKSBhcyBUO1xuICAgICAgICBpZiAoYmFzZURhdGEpIHtcbiAgICAgICAgICAgIGJhc2VEYXRhLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubV9kYXRhTWFwLmRlbGV0ZShjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iXX0=