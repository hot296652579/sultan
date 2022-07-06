"use strict";
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