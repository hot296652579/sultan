
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/net/JsonMessage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '765cbLoNc5HRY+HAc3KtQVO', 'JsonMessage');
// script/framework/net/JsonMessage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonMessage = exports.serialize = void 0;
const Message_1 = require("./Message");
function serialize(key, type, arrTypeOrMapKeyType, mapValueType) {
    return function (target, memberName) {
        if (Reflect.getOwnPropertyDescriptor(target, '__serialize__') === undefined) {
            let selfSerializeInfo = {};
            if (Reflect.getPrototypeOf(target)['__serialize__']) {
                // 父类拥有序列化信息,并且自己没有序列化信息,则拷贝父类到当前类中来
                if (Reflect.getOwnPropertyDescriptor(target, '__serialize__') === undefined) {
                    let parentSerializeInfo = Reflect.getPrototypeOf(target)['__serialize__'];
                    let serializeKeyList = Object.keys(parentSerializeInfo);
                    for (let len = serializeKeyList.length, i = 0; i < len; i++) {
                        selfSerializeInfo[serializeKeyList[i]] = parentSerializeInfo[serializeKeyList[i]].slice(0);
                    }
                }
            }
            Reflect.defineProperty(target, '__serialize__', {
                value: selfSerializeInfo,
            });
        }
        if (target['__serialize__'][key]) {
            throw `SerializeKey has already been declared:${key}`;
        }
        target['__serialize__'][key] = [memberName, type, arrTypeOrMapKeyType, mapValueType];
    };
}
exports.serialize = serialize;
/**
 * @description JSON的序列化与序列化
 */
class JsonMessage extends Message_1.Message {
    fillData() {
        // this.data = this.serialize();
    }
    /**@description 序列化 */
    serialize() {
        let result = {};
        let __serialize__ = Reflect.getPrototypeOf(this)['__serialize__'];
        if (!__serialize__)
            return null;
        let serializeKeyList = Object.keys(__serialize__);
        for (let len = serializeKeyList.length, i = 0; i < len; i++) {
            let serializeKey = serializeKeyList[i];
            let [memberName] = __serialize__[serializeKey];
            let serializeObj = this.serializeMember(this[memberName]);
            if (null === serializeObj) {
                cc.warn("Invalid serialize member : " + memberName);
            }
            result[serializeKey] = serializeObj;
        }
        return result;
    }
    /**
     * @description 序列化成员变量
     * @param value 该成员变量的值
     * */
    serializeMember(value) {
        if (typeof value == 'number') {
            return this.serializeNumber(value);
        }
        else if (typeof value == 'string') {
            return this.serializeString(value);
        }
        else if (value instanceof Array) {
            return this.serializeArray(value);
        }
        else if (value instanceof Map) {
            return this.serializeMap(value);
        }
        else if (value instanceof JsonMessage) {
            return value.serialize();
        }
        else {
            cc.warn("Invalid serialize value : " + value);
            return null;
        }
    }
    serializeNumber(value) {
        return (value === undefined || value === null) ? '0' : value.toString();
    }
    serializeString(value) {
        return (value === undefined || value === null) ? '' : value.toString();
    }
    serializeArray(value) {
        let result = [];
        value.forEach(element => {
            result.push(this.serializeMember(element));
        });
        return result;
    }
    serializeMap(value) {
        let result = [];
        let self = this;
        value.forEach((value, key) => {
            let serVal = { k: self.serializeMember(key), v: self.serializeMember(value) };
            if (null === serVal.k) {
                cc.warn("Invalid map key!");
                serVal.k = '';
            }
            if (null === serVal.v) {
                cc.warn("Invalid map value");
                serVal.v = '';
            }
            result.push(serVal);
        });
        return result;
    }
    decode(data) {
        if (super.decode(data)) {
            super.decode(data);
            return this.deserialize(this.data);
        }
        return false;
    }
    /**
     * @description 从json压缩对象信息 反序列化为实体类字段信息
     * @param data json压缩对象
     * */
    deserialize(data) {
        let __serializeInfo = Reflect.getPrototypeOf(this)['__serialize__'];
        if (!__serializeInfo)
            return true;
        let serializeKeyList = Object.keys(__serializeInfo);
        for (let len = serializeKeyList.length, i = 0; i < len; i++) {
            let serializeKey = serializeKeyList[i];
            let [memberName, memberType, arrOrmapKeyType, mapValType] = __serializeInfo[serializeKey];
            let iscomplete = this.deserializeMember(memberName, memberType, arrOrmapKeyType, mapValType, data[serializeKey]);
            if (!iscomplete) {
                cc.warn("Invalid deserialize member :" + memberName);
                return false;
            }
        }
        return true;
    }
    /**
     * @description 反序列化成
     * @param memberName 成员变量名
     * @param memberType 成员变量类型
     * @param arrOrmapKeyType 数组值类型/Map的key类型
     * @param mapValType Map的值类型
     * @param value json压缩对象
     */
    deserializeMember(memberName, memberType, arrOrmapKeyType, mapValType, value) {
        try {
            let originValue = this[memberName];
            if (typeof originValue === 'number') {
                this[memberName] = this.deserializeNumber(memberName, value);
            }
            else if (typeof originValue === 'string') {
                this[memberName] = this.deserializeString(memberName, value);
            }
            else if (originValue instanceof Array) {
                this.deserializeArray(memberName, arrOrmapKeyType, value);
            }
            else if (originValue instanceof Map) {
                this.deserializeMap(memberName, arrOrmapKeyType, mapValType, value);
            }
            else if (originValue instanceof JsonMessage) {
                originValue.deserialize(value);
            }
            else if (null === originValue) {
                switch (memberType) {
                    case Number:
                        this[memberName] = this.deserializeNumber(memberName, value);
                        break;
                    case String:
                        this[memberName] = this.deserializeString(memberName, value);
                        break;
                    case Array:
                        this[memberName] = [];
                        break;
                    case Map:
                        this[memberName] = new Map;
                        break;
                    default:
                        {
                            this[memberName] = new memberType;
                            if (this[memberName] instanceof JsonMessage) {
                                this[memberName].deserialize(value);
                            }
                            else {
                                cc.warn("Invalid deserialize member :" + memberName + " value:" + originValue);
                                return false;
                            }
                        }
                        break;
                }
            }
            else {
                cc.warn("Invalid deserialize member : " + memberName + " value:" + originValue);
                return false;
            }
            return true;
        }
        catch (error) {
            cc.warn(error.message);
            this[memberName] = error.data || null;
            return false;
        }
    }
    deserializeNumber(memberName, value) {
        if (value === null || value === undefined || value === NaN) {
            throw { message: `Invalid deserializeNumber member : ${memberName} value : ${value}`, data: 0 };
        }
        return Number(value);
    }
    deserializeString(memberName, value) {
        if (value === null || value === undefined) {
            throw { message: `Invalid deserializeString member : ${memberName} value : ${value}`, data: '' };
        }
        return value;
    }
    deserializeArray(memberName, valueType, value) {
        if (!(value instanceof Array)) {
            throw { message: `Invalid deserializeArray member : ${memberName} value : ${value}`, data: [] };
        }
        //重新解析，初始化时可能已经赋值，需要先清空对象
        this[memberName] = [];
        value.forEach((element, i) => {
            if (valueType === Number) {
                this[memberName].push(this.deserializeNumber(memberName + "[" + i + "]", element));
            }
            else if (valueType === String) {
                this[memberName].push(this.deserializeString(memberName + "[" + i + "]", element));
            }
            else if (valueType === Array) {
                throw { message: `Invalid deserializeArray member : ${memberName} array value type is Array` };
            }
            else if (valueType instanceof Map) {
                throw { message: `Invalid deserializeArray member : ${memberName} array value type is Map` };
            }
            else if (this[memberName] instanceof JsonMessage) {
                this[memberName].deserialize(element);
            }
            else {
                let elementObj = new valueType;
                if (elementObj instanceof JsonMessage) {
                    elementObj.deserialize(element);
                    this[memberName].push(elementObj);
                }
                else {
                    throw { message: `Invalid deserializeArray member : ${memberName} array value type is ` + valueType };
                }
            }
        });
    }
    deserializeMap(memberName, keyType, valueType, value) {
        if (!(value instanceof Array)) {
            throw { message: `Invalid deserializeMap member : ${memberName} value : ${value}`, data: new Map };
        }
        //重新解析，初始化时可能已经赋值，需要先清空对象
        this[memberName].clear();
        value.forEach((element, i) => {
            if (element === null || element.k === undefined || element.k === null || element.v === undefined || element.v === null) {
                throw { message: `Invalid deserializeMap member : ${memberName} invalid element : ${element}` };
            }
            let elementKey;
            if (keyType === Number) {
                elementKey = this.deserializeNumber(memberName + "[" + i + "]:key", element.k);
            }
            else if (keyType === String) {
                elementKey = this.deserializeString(memberName + "[" + i + "]:key", element.k);
            }
            else {
                throw { message: `Invalid deserializeMap member : ${memberName} invalid key type : ${keyType}` };
            }
            let elementValue;
            if (valueType === Number) {
                elementValue = this.deserializeNumber(memberName + "[" + i + "]:value", element.v);
            }
            else if (valueType === String) {
                elementValue = this.deserializeString(memberName + "[" + i + "]:value", element.v);
            }
            else if (valueType === Array) {
                throw { message: `Invalid deserializeMap member : ${memberName} invalid value type : Array` };
            }
            else if (valueType instanceof Map) {
                throw { message: `Invalid deserializeMap member : ${memberName} invalid value type : Map` };
            }
            else {
                elementValue = new valueType();
                if (elementValue instanceof JsonMessage) {
                    elementValue.deserialize(element.v);
                }
                else {
                    throw { message: `Invalid deserializeMap member : ${memberName} invalid value type : ${valueType}` };
                }
            }
            this[memberName].set(elementKey, elementValue);
        });
    }
}
exports.JsonMessage = JsonMessage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL25ldC9Kc29uTWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBb0M7QUFPcEMsU0FBZ0IsU0FBUyxDQUFDLEdBQVcsRUFBRSxJQUFJLEVBQUUsbUJBQW9CLEVBQUUsWUFBYTtJQUM1RSxPQUFPLFVBQVUsTUFBTSxFQUFFLFVBQVU7UUFDL0IsSUFBSSxPQUFPLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN6RSxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztZQUMzQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2pELG9DQUFvQztnQkFDcEMsSUFBSSxPQUFPLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDekUsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUMxRSxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDeEQsS0FBSyxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN6RCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM5RjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFO2dCQUM1QyxLQUFLLEVBQUUsaUJB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RUFBRSxPQUFPLEVBQUUsbUNBQW1DLFVBQVUsNkJBQTZCLEVBQUUsQ0FBQzthQUNqRztpQkFBTSxJQUFJLFNBQVMsWUFBWSxHQUFHLEVBQUU7Z0JBQ2pDLE1BQU0sRUFBRSxPQUFPLEVBQUUsbUNBQW1DLFVBQVUsMkJBQTJCLEVBQUUsQ0FBQzthQUMvRjtpQkFBTTtnQkFDSCxZQUFZLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxZQUFZLFlBQVksV0FBVyxFQUFFO29CQUNyQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0gsTUFBTSxFQUFFLE9BQU8sRUFBRSxtQ0FBbUMsVUFBVSx5QkFBeUIsU0FBUyxFQUFFLEVBQUUsQ0FBQztpQkFDeEc7YUFDSjtZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBL09ELGtDQStPQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuL01lc3NhZ2VcIjtcblxudHlwZSBKc29uTWVzc2FnZUNvbnN0cnVjdG9yID0gdHlwZW9mIEpzb25NZXNzYWdlO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKGtleTogc3RyaW5nLCB0eXBlOiBKc29uTWVzc2FnZUNvbnN0cnVjdG9yIHwgTnVtYmVyQ29uc3RydWN0b3IgfCBTdHJpbmdDb25zdHJ1Y3Rvcik7XG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKGtleTogc3RyaW5nLCB0eXBlOiBBcnJheUNvbnN0cnVjdG9yLCBhcnJheVR5cGU6IEpzb25NZXNzYWdlQ29uc3RydWN0b3IgfCBOdW1iZXJDb25zdHJ1Y3RvciB8IFN0cmluZ0NvbnN0cnVjdG9yKTtcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUoa2V5OiBzdHJpbmcsIHR5cGU6IE1hcENvbnN0cnVjdG9yLCBtYXBLZXlUeXBlOiBOdW1iZXJDb25zdHJ1Y3RvciB8IFN0cmluZ0NvbnN0cnVjdG9yLCBtYXBWYWx1ZVR5cGU6IEpzb25NZXNzYWdlQ29uc3RydWN0b3IgfCBOdW1iZXJDb25zdHJ1Y3RvciB8IFN0cmluZ0NvbnN0cnVjdG9yKTtcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUoa2V5OiBzdHJpbmcsIHR5cGUsIGFyclR5cGVPck1hcEtleVR5cGU/LCBtYXBWYWx1ZVR5cGU/KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIG1lbWJlck5hbWUpIHtcbiAgICAgICAgaWYgKFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgJ19fc2VyaWFsaXplX18nKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgc2VsZlNlcmlhbGl6ZUluZm8gPSB7fTtcbiAgICAgICAgICAgIGlmIChSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClbJ19fc2VyaWFsaXplX18nXSkge1xuICAgICAgICAgICAgICAgIC8vIOeItuexu+aLpeacieW6j+WIl+WMluS/oeaBryzlubbkuJToh6rlt7HmsqHmnInluo/liJfljJbkv6Hmga8s5YiZ5ou36LSd54i257G75Yiw5b2T5YmN57G75Lit5p2lXG4gICAgICAgICAgICAgICAgaWYgKFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgJ19fc2VyaWFsaXplX18nKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnRTZXJpYWxpemVJbmZvID0gUmVmbGVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpWydfX3NlcmlhbGl6ZV9fJ107XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpYWxpemVLZXlMaXN0ID0gT2JqZWN0LmtleXMocGFyZW50U2VyaWFsaXplSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxlbiA9IHNlcmlhbGl6ZUtleUxpc3QubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmU2VyaWFsaXplSW5mb1tzZXJpYWxpemVLZXlMaXN0W2ldXSA9IHBhcmVudFNlcmlhbGl6ZUluZm9bc2VyaWFsaXplS2V5TGlzdFtpXV0uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgJ19fc2VyaWFsaXplX18nLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHNlbGZTZXJpYWxpemVJbmZvLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldFsnX19zZXJpYWxpemVfXyddW2tleV0pIHtcbiAgICAgICAgICAgIHRocm93IGBTZXJpYWxpemVLZXkgaGFzIGFscmVhZHkgYmVlbiBkZWNsYXJlZDoke2tleX1gO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldFsnX19zZXJpYWxpemVfXyddW2tleV0gPSBbbWVtYmVyTmFtZSwgdHlwZSwgYXJyVHlwZU9yTWFwS2V5VHlwZSwgbWFwVmFsdWVUeXBlXTtcbiAgICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIEpTT07nmoTluo/liJfljJbkuI7luo/liJfljJZcbiAqL1xuZXhwb3J0IGNsYXNzIEpzb25NZXNzYWdlIGV4dGVuZHMgTWVzc2FnZSB7XG5cbiAgICBwcm90ZWN0ZWQgZmlsbERhdGEoKSB7XG4gICAgICAgIC8vIHRoaXMuZGF0YSA9IHRoaXMuc2VyaWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOW6j+WIl+WMliAqL1xuICAgIHByaXZhdGUgc2VyaWFsaXplKCk6IGFueSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgbGV0IF9fc2VyaWFsaXplX18gPSBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpWydfX3NlcmlhbGl6ZV9fJ107XG4gICAgICAgIGlmICghX19zZXJpYWxpemVfXykgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBzZXJpYWxpemVLZXlMaXN0ID0gT2JqZWN0LmtleXMoX19zZXJpYWxpemVfXyk7XG4gICAgICAgIGZvciAobGV0IGxlbiA9IHNlcmlhbGl6ZUtleUxpc3QubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VyaWFsaXplS2V5ID0gc2VyaWFsaXplS2V5TGlzdFtpXTtcbiAgICAgICAgICAgIGxldCBbbWVtYmVyTmFtZV0gPSBfX3NlcmlhbGl6ZV9fW3NlcmlhbGl6ZUtleV07XG4gICAgICAgICAgICBsZXQgc2VyaWFsaXplT2JqID0gdGhpcy5zZXJpYWxpemVNZW1iZXIodGhpc1ttZW1iZXJOYW1lXSk7XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gc2VyaWFsaXplT2JqKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcIkludmFsaWQgc2VyaWFsaXplIG1lbWJlciA6IFwiICsgbWVtYmVyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbc2VyaWFsaXplS2V5XSA9IHNlcmlhbGl6ZU9iajtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDluo/liJfljJbmiJDlkZjlj5jph49cbiAgICAgKiBAcGFyYW0gdmFsdWUg6K+l5oiQ5ZGY5Y+Y6YeP55qE5YC8XG4gICAgICogKi9cbiAgICBwcml2YXRlIHNlcmlhbGl6ZU1lbWJlcih2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmlhbGl6ZU51bWJlcih2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpYWxpemVTdHJpbmcodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmlhbGl6ZUFycmF5KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWFsaXplTWFwKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEpzb25NZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuc2VyaWFsaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy53YXJuKFwiSW52YWxpZCBzZXJpYWxpemUgdmFsdWUgOiBcIiArIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXJpYWxpemVOdW1iZXIodmFsdWU6IE51bWJlcikge1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpID8gJzAnIDogdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlcmlhbGl6ZVN0cmluZyh2YWx1ZTogU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgPyAnJyA6IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXJpYWxpemVBcnJheSh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIHZhbHVlLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnNlcmlhbGl6ZU1lbWJlcihlbGVtZW50KSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VyaWFsaXplTWFwKHZhbHVlOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VyVmFsID0geyBrOiBzZWxmLnNlcmlhbGl6ZU1lbWJlcihrZXkpLCB2OiBzZWxmLnNlcmlhbGl6ZU1lbWJlcih2YWx1ZSkgfTtcbiAgICAgICAgICAgIGlmIChudWxsID09PSBzZXJWYWwuaykge1xuICAgICAgICAgICAgICAgIGNjLndhcm4oXCJJbnZhbGlkIG1hcCBrZXkhXCIpO1xuICAgICAgICAgICAgICAgIHNlclZhbC5rID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gc2VyVmFsLnYpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiSW52YWxpZCBtYXAgdmFsdWVcIik7XG4gICAgICAgICAgICAgICAgc2VyVmFsLnYgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNlclZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRlY29kZShkYXRhOiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChzdXBlci5kZWNvZGUoZGF0YSkpIHtcbiAgICAgICAgICAgIHN1cGVyLmRlY29kZShkYXRhKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVzZXJpYWxpemUodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOS7jmpzb27ljovnvKnlr7nosaHkv6Hmga8g5Y+N5bqP5YiX5YyW5Li65a6e5L2T57G75a2X5q615L+h5oGvXG4gICAgICogQHBhcmFtIGRhdGEganNvbuWOi+e8qeWvueixoVxuICAgICAqICovXG4gICAgcHJpdmF0ZSBkZXNlcmlhbGl6ZShkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IF9fc2VyaWFsaXplSW5mbyA9IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGhpcylbJ19fc2VyaWFsaXplX18nXTtcbiAgICAgICAgaWYgKCFfX3NlcmlhbGl6ZUluZm8pIHJldHVybiB0cnVlO1xuICAgICAgICBsZXQgc2VyaWFsaXplS2V5TGlzdCA9IE9iamVjdC5rZXlzKF9fc2VyaWFsaXplSW5mbyk7XG4gICAgICAgIGZvciAobGV0IGxlbiA9IHNlcmlhbGl6ZUtleUxpc3QubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VyaWFsaXplS2V5ID0gc2VyaWFsaXplS2V5TGlzdFtpXTtcbiAgICAgICAgICAgIGxldCBbbWVtYmVyTmFtZSwgbWVtYmVyVHlwZSwgYXJyT3JtYXBLZXlUeXBlLCBtYXBWYWxUeXBlXSA9IF9fc2VyaWFsaXplSW5mb1tzZXJpYWxpemVLZXldO1xuICAgICAgICAgICAgbGV0IGlzY29tcGxldGUgPSB0aGlzLmRlc2VyaWFsaXplTWVtYmVyKG1lbWJlck5hbWUsIG1lbWJlclR5cGUsIGFyck9ybWFwS2V5VHlwZSwgbWFwVmFsVHlwZSwgZGF0YVtzZXJpYWxpemVLZXldKTtcbiAgICAgICAgICAgIGlmICghaXNjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIGNjLndhcm4oXCJJbnZhbGlkIGRlc2VyaWFsaXplIG1lbWJlciA6XCIgKyBtZW1iZXJOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWPjeW6j+WIl+WMluaIkFxuICAgICAqIEBwYXJhbSBtZW1iZXJOYW1lIOaIkOWRmOWPmOmHj+WQjVxuICAgICAqIEBwYXJhbSBtZW1iZXJUeXBlIOaIkOWRmOWPmOmHj+exu+Wei1xuICAgICAqIEBwYXJhbSBhcnJPcm1hcEtleVR5cGUg5pWw57uE5YC857G75Z6LL01hcOeahGtleeexu+Wei1xuICAgICAqIEBwYXJhbSBtYXBWYWxUeXBlIE1hcOeahOWAvOexu+Wei1xuICAgICAqIEBwYXJhbSB2YWx1ZSBqc29u5Y6L57yp5a+56LGhXG4gICAgICovXG4gICAgcHJpdmF0ZSBkZXNlcmlhbGl6ZU1lbWJlcihtZW1iZXJOYW1lOiBhbnksIG1lbWJlclR5cGU6IGFueSwgYXJyT3JtYXBLZXlUeXBlOiBhbnksIG1hcFZhbFR5cGU6IGFueSwgdmFsdWU6IGFueSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IG9yaWdpblZhbHVlID0gdGhpc1ttZW1iZXJOYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3JpZ2luVmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpc1ttZW1iZXJOYW1lXSA9IHRoaXMuZGVzZXJpYWxpemVOdW1iZXIobWVtYmVyTmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3JpZ2luVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpc1ttZW1iZXJOYW1lXSA9IHRoaXMuZGVzZXJpYWxpemVTdHJpbmcobWVtYmVyTmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcmlnaW5WYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZUFycmF5KG1lbWJlck5hbWUsIGFyck9ybWFwS2V5VHlwZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcmlnaW5WYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVNYXAobWVtYmVyTmFtZSwgYXJyT3JtYXBLZXlUeXBlLCBtYXBWYWxUeXBlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9yaWdpblZhbHVlIGluc3RhbmNlb2YgSnNvbk1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5WYWx1ZS5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bGwgPT09IG9yaWdpblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChtZW1iZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTnVtYmVyOiB0aGlzW21lbWJlck5hbWVdID0gdGhpcy5kZXNlcmlhbGl6ZU51bWJlcihtZW1iZXJOYW1lLCB2YWx1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFN0cmluZzogdGhpc1ttZW1iZXJOYW1lXSA9IHRoaXMuZGVzZXJpYWxpemVTdHJpbmcobWVtYmVyTmFtZSwgdmFsdWUpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBcnJheTogdGhpc1ttZW1iZXJOYW1lXSA9IFtdO2JyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1hcDogdGhpc1ttZW1iZXJOYW1lXSA9IG5ldyBNYXA7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW21lbWJlck5hbWVdID0gbmV3IG1lbWJlclR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1ttZW1iZXJOYW1lXSBpbnN0YW5jZW9mIEpzb25NZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1ttZW1iZXJOYW1lXS5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJJbnZhbGlkIGRlc2VyaWFsaXplIG1lbWJlciA6XCIgKyBtZW1iZXJOYW1lICsgXCIgdmFsdWU6XCIgKyBvcmlnaW5WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcIkludmFsaWQgZGVzZXJpYWxpemUgbWVtYmVyIDogXCIgKyBtZW1iZXJOYW1lICsgXCIgdmFsdWU6XCIgKyBvcmlnaW5WYWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjYy53YXJuKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpc1ttZW1iZXJOYW1lXSA9IGVycm9yLmRhdGEgfHwgbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVzZXJpYWxpemVOdW1iZXIobWVtYmVyTmFtZTogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBOYU4pIHtcbiAgICAgICAgICAgIHRocm93IHsgbWVzc2FnZTogYEludmFsaWQgZGVzZXJpYWxpemVOdW1iZXIgbWVtYmVyIDogJHttZW1iZXJOYW1lfSB2YWx1ZSA6ICR7dmFsdWV9YCwgZGF0YTogMCB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzZXJpYWxpemVTdHJpbmcobWVtYmVyTmFtZTogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyB7IG1lc3NhZ2U6IGBJbnZhbGlkIGRlc2VyaWFsaXplU3RyaW5nIG1lbWJlciA6ICR7bWVtYmVyTmFtZX0gdmFsdWUgOiAke3ZhbHVlfWAsIGRhdGE6ICcnIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzZXJpYWxpemVBcnJheShtZW1iZXJOYW1lOiBhbnksIHZhbHVlVHlwZTogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICB0aHJvdyB7IG1lc3NhZ2U6IGBJbnZhbGlkIGRlc2VyaWFsaXplQXJyYXkgbWVtYmVyIDogJHttZW1iZXJOYW1lfSB2YWx1ZSA6ICR7dmFsdWV9YCwgZGF0YTogW10gfTtcbiAgICAgICAgfVxuICAgICAgICAvL+mHjeaWsOino+aekO+8jOWIneWni+WMluaXtuWPr+iDveW3sue7j+i1i+WAvO+8jOmcgOimgeWFiOa4heepuuWvueixoVxuICAgICAgICB0aGlzW21lbWJlck5hbWVdID0gW107XG4gICAgICAgIHZhbHVlLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVR5cGUgPT09IE51bWJlcikge1xuICAgICAgICAgICAgICAgIHRoaXNbbWVtYmVyTmFtZV0ucHVzaCh0aGlzLmRlc2VyaWFsaXplTnVtYmVyKG1lbWJlck5hbWUgKyBcIltcIiArIGkgKyBcIl1cIiwgZWxlbWVudCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09IFN0cmluZykge1xuICAgICAgICAgICAgICAgIHRoaXNbbWVtYmVyTmFtZV0ucHVzaCh0aGlzLmRlc2VyaWFsaXplU3RyaW5nKG1lbWJlck5hbWUgKyBcIltcIiArIGkgKyBcIl1cIiwgZWxlbWVudCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09IEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgeyBtZXNzYWdlOiBgSW52YWxpZCBkZXNlcmlhbGl6ZUFycmF5IG1lbWJlciA6ICR7bWVtYmVyTmFtZX0gYXJyYXkgdmFsdWUgdHlwZSBpcyBBcnJheWAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgeyBtZXNzYWdlOiBgSW52YWxpZCBkZXNlcmlhbGl6ZUFycmF5IG1lbWJlciA6ICR7bWVtYmVyTmFtZX0gYXJyYXkgdmFsdWUgdHlwZSBpcyBNYXBgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNbbWVtYmVyTmFtZV0gaW5zdGFuY2VvZiBKc29uTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRoaXNbbWVtYmVyTmFtZV0uZGVzZXJpYWxpemUoZWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50T2JqID0gbmV3IHZhbHVlVHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE9iaiBpbnN0YW5jZW9mIEpzb25NZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRPYmouZGVzZXJpYWxpemUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbWVtYmVyTmFtZV0ucHVzaChlbGVtZW50T2JqKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyB7IG1lc3NhZ2U6IGBJbnZhbGlkIGRlc2VyaWFsaXplQXJyYXkgbWVtYmVyIDogJHttZW1iZXJOYW1lfSBhcnJheSB2YWx1ZSB0eXBlIGlzIGAgKyB2YWx1ZVR5cGUgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzZXJpYWxpemVNYXAobWVtYmVyTmFtZTogYW55LCBrZXlUeXBlOiBhbnksIHZhbHVlVHlwZTogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICB0aHJvdyB7IG1lc3NhZ2U6IGBJbnZhbGlkIGRlc2VyaWFsaXplTWFwIG1lbWJlciA6ICR7bWVtYmVyTmFtZX0gdmFsdWUgOiAke3ZhbHVlfWAsIGRhdGE6IG5ldyBNYXAgfTtcbiAgICAgICAgfVxuICAgICAgICAvL+mHjeaWsOino+aekO+8jOWIneWni+WMluaXtuWPr+iDveW3sue7j+i1i+WAvO+8jOmcgOimgeWFiOa4heepuuWvueixoVxuICAgICAgICB0aGlzW21lbWJlck5hbWVdLmNsZWFyKCk7XG4gICAgICAgIHZhbHVlLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQuayA9PT0gdW5kZWZpbmVkIHx8IGVsZW1lbnQuayA9PT0gbnVsbCB8fCBlbGVtZW50LnYgPT09IHVuZGVmaW5lZCB8fCBlbGVtZW50LnYgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyB7IG1lc3NhZ2U6IGBJbnZhbGlkIGRlc2VyaWFsaXplTWFwIG1lbWJlciA6ICR7bWVtYmVyTmFtZX0gaW52YWxpZCBlbGVtZW50IDogJHtlbGVtZW50fWAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVsZW1lbnRLZXk7XG4gICAgICAgICAgICBpZiAoa2V5VHlwZSA9PT0gTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudEtleSA9IHRoaXMuZGVzZXJpYWxpemVOdW1iZXIobWVtYmVyTmFtZSArIFwiW1wiICsgaSArIFwiXTprZXlcIiwgZWxlbWVudC5rKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5VHlwZSA9PT0gU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudEtleSA9IHRoaXMuZGVzZXJpYWxpemVTdHJpbmcobWVtYmVyTmFtZSArIFwiW1wiICsgaSArIFwiXTprZXlcIiwgZWxlbWVudC5rKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgeyBtZXNzYWdlOiBgSW52YWxpZCBkZXNlcmlhbGl6ZU1hcCBtZW1iZXIgOiAke21lbWJlck5hbWV9IGludmFsaWQga2V5IHR5cGUgOiAke2tleVR5cGV9YCB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZWxlbWVudFZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFZhbHVlID0gdGhpcy5kZXNlcmlhbGl6ZU51bWJlcihtZW1iZXJOYW1lICsgXCJbXCIgKyBpICsgXCJdOnZhbHVlXCIsIGVsZW1lbnQudik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFZhbHVlID0gdGhpcy5kZXNlcmlhbGl6ZVN0cmluZyhtZW1iZXJOYW1lICsgXCJbXCIgKyBpICsgXCJdOnZhbHVlXCIsIGVsZW1lbnQudik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyB7IG1lc3NhZ2U6IGBJbnZhbGlkIGRlc2VyaWFsaXplTWFwIG1lbWJlciA6ICR7bWVtYmVyTmFtZX0gaW52YWxpZCB2YWx1ZSB0eXBlIDogQXJyYXlgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIHRocm93IHsgbWVzc2FnZTogYEludmFsaWQgZGVzZXJpYWxpemVNYXAgbWVtYmVyIDogJHttZW1iZXJOYW1lfSBpbnZhbGlkIHZhbHVlIHR5cGUgOiBNYXBgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRWYWx1ZSA9IG5ldyB2YWx1ZVR5cGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudFZhbHVlIGluc3RhbmNlb2YgSnNvbk1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFZhbHVlLmRlc2VyaWFsaXplKGVsZW1lbnQudik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgeyBtZXNzYWdlOiBgSW52YWxpZCBkZXNlcmlhbGl6ZU1hcCBtZW1iZXIgOiAke21lbWJlck5hbWV9IGludmFsaWQgdmFsdWUgdHlwZSA6ICR7dmFsdWVUeXBlfWAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzW21lbWJlck5hbWVdLnNldChlbGVtZW50S2V5LCBlbGVtZW50VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=