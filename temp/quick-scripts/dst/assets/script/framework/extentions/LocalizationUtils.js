
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/extentions/LocalizationUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3617w+A31ABYpmr3C9zU4g', 'LocalizationUtils');
// script/framework/extentions/LocalizationUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalizationUtils {
    static get(content, ...format) {
        let value = content;
        if (value && value.length > 0) {
            if (format.length > 0) {
                value = value.replace(/{(\d+)}/g, (_, matchIndex) => {
                    let index = Number(matchIndex);
                    let content = format[index];
                    let result = "";
                    if (content === undefined) {
                        result = "?";
                    }
                    else {
                        if (typeof (content) === "number") {
                            result = content.toString();
                        }
                        else {
                            result = content;
                        }
                    }
                    return result;
                });
            }
        }
        return value;
    }
}
exports.default = LocalizationUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvTG9jYWxpemF0aW9uVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFxQixpQkFBaUI7SUFFM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFlLEVBQUUsR0FBRyxNQUEyQjtRQUM3RCxJQUFJLEtBQUssR0FBVyxPQUFPLENBQUM7UUFFNUIsSUFBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBUyxFQUFFLFVBQWtCLEVBQUUsRUFBRTtvQkFDaEUsSUFBSSxLQUFLLEdBQVcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLE9BQU8sR0FBZ0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6RCxJQUFJLE1BQU0sR0FBVyxFQUFFLENBQUM7b0JBQ3hCLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTt3QkFDdkIsTUFBTSxHQUFHLEdBQUcsQ0FBQTtxQkFDZjt5QkFBTTt3QkFDSCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7NEJBQy9CLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQy9COzZCQUFNOzRCQUNILE1BQU0sR0FBRyxPQUFPLENBQUM7eUJBQ3BCO3FCQUNKO29CQUNELE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBRUo7QUE1QkQsb0NBNEJDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxpemF0aW9uVXRpbHMge1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQoY29udGVudDogc3RyaW5nLCAuLi5mb3JtYXQ6IHN0cmluZ1tdIHwgbnVtYmVyW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGNvbnRlbnQ7XG5cbiAgICAgICAgaWYodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGZvcm1hdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC97KFxcZCspfS9nLCAoXzogc3RyaW5nLCBtYXRjaEluZGV4OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBOdW1iZXIobWF0Y2hJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQgPSBmb3JtYXRbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBcIj9cIlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29udGVudCkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjb250ZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBcbn0iXX0=