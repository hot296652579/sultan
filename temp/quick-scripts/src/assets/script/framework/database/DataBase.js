"use strict";
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