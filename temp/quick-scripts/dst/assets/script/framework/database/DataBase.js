
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/database/DataBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f08a0BzWulOgLwpA7QFhdr9', 'DataBase');
// script/framework/database/DataBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
class DataBase {
    constructor() {
        this.config = {
            name: "AppCaches",
            version: 1,
        };
        this.db = null;
        this.tables = ["cache_png", "cache_json", "cache_atlas"];
        this.logTag = "[DataBase]";
    }
    static Instance() { return this._instance || (this._instance = new DataBase()); }
    open(name, tables, version) {
        this.config.name = name || this.config.name;
        this.config.version = version || this.config.version;
        this.tables = tables || this.tables;
        if (this.isSupport()) {
            let request = this.getWindonwIndexedDB().open(this.config.name, this.config.version);
            request.onerror = (e) => {
                if (CC_DEBUG)
                    cc.error(this.logTag, `打开数据库失败`);
            };
            request.onsuccess = (e) => {
                this.db = e.target.result;
                if (CC_DEBUG)
                    cc.log(this.logTag, `找开数据库成功`);
            };
            request.onupgradeneeded = (e) => {
                cc.log(this.logTag, `onupgradeneeded`);
                this.db = e.target.result;
                for (let i = 0; i < this.tables.length; i++) {
                    if (!this.db.objectStoreNames.contains(this.tables[i])) {
                        this.db.createObjectStore(this.tables[i]);
                    }
                }
            };
        }
        else {
            if (CC_DEBUG)
                cc.warn(this.logTag, "no support indexedDB");
        }
    }
    isSupport() {
        let _windown = window;
        ;
        if (_windown.indexedDB || _windown.mozIndexedDB || _windown.webkitIndexedDB || _windown.msIndexedDB) {
            return true;
        }
        return false;
    }
    getWindonwIndexedDB() {
        let _windown = window;
        if (_windown.indexedDB) {
            return _windown.indexedDB;
        }
        _windown.indexedDB = _windown.indexedDB || _windown.mozIndexedDB || _windown.webkitIndexedDB || _windown.msIndexedDB;
        return _windown.indexedDB;
    }
    close() {
        if (this.db) {
            this.db.close();
            if (CC_DEBUG)
                cc.log(this.logTag, `数据关闭`);
        }
    }
    deleteDatabase() {
        if (this.isSupport()) {
            this.getWindonwIndexedDB().deleteDatabase(this.config.name);
            if (CC_DEBUG)
                cc.log(this.logTag, `删除数据库${this.config.name}`);
        }
    }
    put(stroeName, data) {
        if (this.db) {
            let store = this.db.transaction(stroeName, "readwrite").objectStore(stroeName);
            let request = store.put(data.data, data.key);
            request.onerror = () => {
                if (CC_DEBUG)
                    cc.error(this.logTag, `添加数据库中已经有该数据`);
            };
            request.onsuccess = () => {
                if (CC_DEBUG)
                    cc.log(this.logTag, "添加数据已存入数据");
            };
        }
    }
    get(stroeName, key) {
        return new Promise((resolve) => {
            if (this.db) {
                let store = this.db.transaction(stroeName, "readwrite").objectStore(stroeName);
                let request = store.get(key);
                request.onerror = () => {
                    if (CC_DEBUG)
                        cc.error(this.logTag, `get error ${stroeName} -> ${key}`);
                    resolve(null);
                };
                request.onsuccess = (e) => {
                    if (CC_DEBUG)
                        cc.log(this.logTag, `get success ${stroeName} -> ${key}`);
                    resolve(e.target.result);
                };
            }
        });
    }
    delete(stroeName, key) {
        if (this.db) {
            let store = this.db.transaction(stroeName, "readwrite").objectStore(stroeName);
            let request = store.delete(key);
            request.onerror = () => {
                if (CC_DEBUG)
                    cc.error(this.logTag, `delete error ${stroeName} -> ${key}`);
            };
            request.onsuccess = () => {
                if (CC_DEBUG)
                    cc.log(this.logTag, `delete success ${stroeName} -> ${key}`);
            };
        }
    }
    clear(stroeName) {
        //删除全部存储数据
        if (this.db) {
            let store = this.db.transaction(stroeName, "readwrite").objectStore(stroeName);
            let request = store.clear();
            request.onerror = () => {
                if (CC_DEBUG)
                    cc.error(this.logTag, `clear error ${stroeName}`);
            };
            request.onsuccess = () => {
                if (CC_DEBUG)
                    cc.log(this.logTag, `clear success ${stroeName}`);
            };
        }
    }
}
exports.DataBase = DataBase;
DataBase._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2RhdGFiYXNlL0RhdGFCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLE1BQWEsUUFBUTtJQUFyQjtRQUVZLFdBQU0sR0FBRztZQUNiLElBQUksRUFBRSxXQUFXO1lBQ2pCLE9BQU8sRUFBRSxDQUFDO1NBQ2IsQ0FBQztRQUVNLE9BQUUsR0FBZ0IsSUFBSSxDQUFDO1FBQ3ZCLFdBQU0sR0FBb0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXJFLFdBQU0sR0FBRyxZQUFZLENBQUM7SUF3SGxDLENBQUM7SUF2SFUsTUFBTSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakYsSUFBSSxDQUFDLElBQWEsRUFBRSxNQUF3QixFQUFFLE9BQWdCO1FBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRixPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BCLElBQUks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LFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvRSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7Z0JBQ25CLElBQUksUUFBUTtvQkFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsZUFBZSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQztZQUNGLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO2dCQUNyQixJQUFJLFFBQVE7b0JBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGlCQUFpQixTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQztTQUNMO0lBQ0wsQ0FBQzs7QUFoSUwsNEJBa0lDO0FBekhrQixrQkFBUyxHQUFhLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNpbmdsZXRvbiB9IGZyb20gXCIuLi9iYXNlL1NpbmdsZXRvblwiO1xuXG5leHBvcnQgdHlwZSBEYXRhQmFzZVRhYmxlID0gXCJjYWNoZV9wbmdcIiB8IFwiY2FjaGVfanNvblwiIHwgXCJjYWNoZV9hdGxhc1wiO1xuXG5leHBvcnQgY2xhc3MgRGF0YUJhc2Uge1xuXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XG4gICAgICAgIG5hbWU6IFwiQXBwQ2FjaGVzXCIsLy/mlbDmja7lupPlkI1cbiAgICAgICAgdmVyc2lvbjogMSwgLy9cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkYjogSURCRGF0YWJhc2UgPSBudWxsO1xuICAgIHByaXZhdGUgdGFibGVzOiBEYXRhQmFzZVRhYmxlW10gPSBbXCJjYWNoZV9wbmdcIiwgXCJjYWNoZV9qc29uXCIsIFwiY2FjaGVfYXRsYXNcIl07XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBEYXRhQmFzZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBsb2dUYWcgPSBcIltEYXRhQmFzZV1cIjtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IERhdGFCYXNlKCkpOyB9XG5cbiAgICBwdWJsaWMgb3BlbihuYW1lPzogc3RyaW5nLCB0YWJsZXM/OiBEYXRhQmFzZVRhYmxlW10sIHZlcnNpb24/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jb25maWcubmFtZSA9IG5hbWUgfHwgdGhpcy5jb25maWcubmFtZTtcbiAgICAgICAgdGhpcy5jb25maWcudmVyc2lvbiA9IHZlcnNpb24gfHwgdGhpcy5jb25maWcudmVyc2lvbjtcbiAgICAgICAgdGhpcy50YWJsZXMgPSB0YWJsZXMgfHwgdGhpcy50YWJsZXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdXBwb3J0KCkpIHtcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gdGhpcy5nZXRXaW5kb253SW5kZXhlZERCKCkub3Blbih0aGlzLmNvbmZpZy5uYW1lLCB0aGlzLmNvbmZpZy52ZXJzaW9uKTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcih0aGlzLmxvZ1RhZywgYOaJk+W8gOaVsOaNruW6k+Wksei0pWApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGIgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2codGhpcy5sb2dUYWcsIGDmib7lvIDmlbDmja7lupPmiJDlip9gKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5sb2codGhpcy5sb2dUYWcsIGBvbnVwZ3JhZGVuZWVkZWRgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRiID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnModGhpcy50YWJsZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRiLmNyZWF0ZU9iamVjdFN0b3JlKHRoaXMudGFibGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLndhcm4odGhpcy5sb2dUYWcsIFwibm8gc3VwcG9ydCBpbmRleGVkREJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTdXBwb3J0KCkge1xuICAgICAgICBsZXQgX3dpbmRvd246IGFueSA9IHdpbmRvdzs7XG4gICAgICAgIGlmIChfd2luZG93bi5pbmRleGVkREIgfHwgX3dpbmRvd24ubW96SW5kZXhlZERCIHx8IF93aW5kb3duLndlYmtpdEluZGV4ZWREQiB8fCBfd2luZG93bi5tc0luZGV4ZWREQikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0V2luZG9ud0luZGV4ZWREQigpOiBJREJGYWN0b3J5IHtcbiAgICAgICAgbGV0IF93aW5kb3duOiBhbnkgPSB3aW5kb3c7XG4gICAgICAgIGlmIChfd2luZG93bi5pbmRleGVkREIpIHtcbiAgICAgICAgICAgIHJldHVybiBfd2luZG93bi5pbmRleGVkREI7XG4gICAgICAgIH1cbiAgICAgICAgX3dpbmRvd24uaW5kZXhlZERCID0gX3dpbmRvd24uaW5kZXhlZERCIHx8IF93aW5kb3duLm1vekluZGV4ZWREQiB8fCBfd2luZG93bi53ZWJraXRJbmRleGVkREIgfHwgX3dpbmRvd24ubXNJbmRleGVkREI7XG4gICAgICAgIHJldHVybiBfd2luZG93bi5pbmRleGVkREI7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5kYikge1xuICAgICAgICAgICAgdGhpcy5kYi5jbG9zZSgpO1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2codGhpcy5sb2dUYWcsIGDmlbDmja7lhbPpl61gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVEYXRhYmFzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBwb3J0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0V2luZG9ud0luZGV4ZWREQigpLmRlbGV0ZURhdGFiYXNlKHRoaXMuY29uZmlnLm5hbWUpO1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2codGhpcy5sb2dUYWcsIGDliKDpmaTmlbDmja7lupMke3RoaXMuY29uZmlnLm5hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0KHN0cm9lTmFtZTogRGF0YUJhc2VUYWJsZSwgZGF0YTogeyBrZXk6IHN0cmluZywgZGF0YTogYW55IH0pIHtcbiAgICAgICAgaWYgKHRoaXMuZGIpIHtcbiAgICAgICAgICAgIGxldCBzdG9yZSA9IHRoaXMuZGIudHJhbnNhY3Rpb24oc3Ryb2VOYW1lLCBcInJlYWR3cml0ZVwiKS5vYmplY3RTdG9yZShzdHJvZU5hbWUpO1xuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBzdG9yZS5wdXQoZGF0YS5kYXRhLCBkYXRhLmtleSk7XG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcih0aGlzLmxvZ1RhZywgYOa3u+WKoOaVsOaNruW6k+S4reW3sue7j+acieivpeaVsOaNrmApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKHRoaXMubG9nVGFnLCBcIua3u+WKoOaVsOaNruW3suWtmOWFpeaVsOaNrlwiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KHN0cm9lTmFtZTogRGF0YUJhc2VUYWJsZSwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0b3JlID0gdGhpcy5kYi50cmFuc2FjdGlvbihzdHJvZU5hbWUsIFwicmVhZHdyaXRlXCIpLm9iamVjdFN0b3JlKHN0cm9lTmFtZSk7XG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBzdG9yZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IodGhpcy5sb2dUYWcsIGBnZXQgZXJyb3IgJHtzdHJvZU5hbWV9IC0+ICR7a2V5fWApO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKHRoaXMubG9nVGFnLCBgZ2V0IHN1Y2Nlc3MgJHtzdHJvZU5hbWV9IC0+ICR7a2V5fWApO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShzdHJvZU5hbWU6IERhdGFCYXNlVGFibGUsIGtleTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmRiKSB7XG4gICAgICAgICAgICBsZXQgc3RvcmUgPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0cm9lTmFtZSwgXCJyZWFkd3JpdGVcIikub2JqZWN0U3RvcmUoc3Ryb2VOYW1lKTtcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcih0aGlzLmxvZ1RhZywgYGRlbGV0ZSBlcnJvciAke3N0cm9lTmFtZX0gLT4gJHtrZXl9YCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2codGhpcy5sb2dUYWcsIGBkZWxldGUgc3VjY2VzcyAke3N0cm9lTmFtZX0gLT4gJHtrZXl9YCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKHN0cm9lTmFtZTogRGF0YUJhc2VUYWJsZSkge1xuICAgICAgICAvL+WIoOmZpOWFqOmDqOWtmOWCqOaVsOaNrlxuICAgICAgICBpZiAodGhpcy5kYikge1xuICAgICAgICAgICAgbGV0IHN0b3JlID0gdGhpcy5kYi50cmFuc2FjdGlvbihzdHJvZU5hbWUsIFwicmVhZHdyaXRlXCIpLm9iamVjdFN0b3JlKHN0cm9lTmFtZSk7XG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IHN0b3JlLmNsZWFyKCk7XG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcih0aGlzLmxvZ1RhZywgYGNsZWFyIGVycm9yICR7c3Ryb2VOYW1lfWApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKHRoaXMubG9nVGFnLCBgY2xlYXIgc3VjY2VzcyAke3N0cm9lTmFtZX1gKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==