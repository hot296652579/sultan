
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/extentions/Extentions.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2ee709OI+pEX7Wqmoa02FAO', 'Extentions');
// script/framework/extentions/Extentions.js

"use strict";

exports.__esModule = true;
exports.extentionsInit = extentionsInit;

/**
 * @description 对cocos 进行扩展，本脚本以插件方式运行
 * 
 * 
 */
window.base64Encrypt = function (obj) {
  // let _CryptoJS = CryptoJS;
  // let word = JSON.stringify(obj);
  // let key = _CryptoJS.enc.Utf8.parse("btgame^&*!@#123Abc");
  // let srcs = _CryptoJS.enc.Utf8.parse(word);
  // let encrypted = _CryptoJS.DES.encrypt(srcs, key, {  mode: _CryptoJS.mode.ECB, padding: _CryptoJS.pad.Pkcs7 });
  // return encrypted.ciphertext.toString();
  // let _CryptoJS = CryptoJS;
  // let word = JSON.stringify(obj);
  // let srcs = _CryptoJS.enc.Utf8.parse(obj);
  // var base64 = _CryptoJS.enc.Base64.stringify(srcs);
  return window.base64Encode(obj);
};

window.base64Decrypt = function (word) {
  // let _CryptoJS = CryptoJS;
  // let key = _CryptoJS.enc.Utf8.parse("btgame^&*!@#123Abc");
  // let encryptedHexStr = _CryptoJS.enc.Hex.parse(word);
  // let srcs = _CryptoJS.enc.Base64.stringify(encryptedHexStr);
  // let decrypt = _CryptoJS.DES.decrypt(srcs, key, {  mode: _CryptoJS.mode.ECB, padding: _CryptoJS.pad.Pkcs7 });
  // let decryptedStr = decrypt.toString(_CryptoJS.enc.Utf8);
  // return decryptedStr.toString();
  var _CryptoJS = CryptoJS;

  var parsedWordArray = _CryptoJS.enc.Base64.parse(word);

  var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
  return parsedStr.toString();
};

window.md5 = function md5(data) {
  return this.CryptoJS.MD5(data);
};

window.makeRemoteUrl = function (remoteUrl) {
  return remoteUrl.path + "/" + remoteUrl.fileName;
};

window.parseRemoteUrl = function (url) {
  url = url.replace(/\s*/g, "");
  var data = {
    url: null,
    path: null,
    fileName: null
  };
  data.url = url; //摘取文件

  var fileName = data.url.slice(data.url.lastIndexOf("/") + 1);
  var fileDir = data.url.substr(0, data.url.length - fileName.length - 1);
  var md5path = fileDir;

  if (CC_JSB) {
    md5path = window.md5(fileDir).toString();
    data.path = md5path;
  } else {
    data.path = fileDir;
  }

  data.fileName = fileName;
  return data;
};

Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }

  return format;
};
/**@description 返回当前时间的秒数 */


Date.timeNow = function () {
  return Math.floor(Date.timeNowMillisecons() / 1000);
};
/**@description 返回当前时间的毫秒数 */


Date.timeNowMillisecons = function () {
  var now = new Date();
  return now.getTime();
};

String.format = function () {
  var param = [];

  for (var i = 0, l = arguments.length; i < l; i++) {
    param.push(arguments[i]);
  }

  var statment = param[0]; // get the first element(the original statement)

  if (typeof statment != "string") {
    if (!CC_EDITOR) cc.error("String.format error,first param is not a string");
    return "";
  }

  param.shift(); // remove the first element from array

  if (Array.isArray(param[0]) && param.length == 1) {
    param = param[0];
  }

  return statment.replace(/\{(\d+)\}/g, function (m, n) {
    return param[n];
  });
};

function extentionsInit() {//cc.log(`extentionsInit`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvRXh0ZW50aW9ucy5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJiYXNlNjRFbmNyeXB0Iiwib2JqIiwiYmFzZTY0RW5jb2RlIiwiYmFzZTY0RGVjcnlwdCIsIndvcmQiLCJfQ3J5cHRvSlMiLCJDcnlwdG9KUyIsInBhcnNlZFdvcmRBcnJheSIsImVuYyIsIkJhc2U2NCIsInBhcnNlIiwicGFyc2VkU3RyIiwidG9TdHJpbmciLCJVdGY4IiwibWQ1IiwiZGF0YSIsIk1ENSIsIm1ha2VSZW1vdGVVcmwiLCJyZW1vdGVVcmwiLCJwYXRoIiwiZmlsZU5hbWUiLCJwYXJzZVJlbW90ZVVybCIsInVybCIsInJlcGxhY2UiLCJzbGljZSIsImxhc3RJbmRleE9mIiwiZmlsZURpciIsInN1YnN0ciIsImxlbmd0aCIsIm1kNXBhdGgiLCJDQ19KU0IiLCJEYXRlIiwicHJvdG90eXBlIiwiZm9ybWF0IiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJNYXRoIiwiZmxvb3IiLCJnZXRNaWxsaXNlY29uZHMiLCJ0ZXN0IiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsImsiLCJ0aW1lTm93IiwidGltZU5vd01pbGxpc2Vjb25zIiwibm93IiwiZ2V0VGltZSIsIlN0cmluZyIsInBhcmFtIiwiaSIsImwiLCJhcmd1bWVudHMiLCJwdXNoIiwic3RhdG1lbnQiLCJDQ19FRElUT1IiLCJjYyIsImVycm9yIiwic2hpZnQiLCJBcnJheSIsImlzQXJyYXkiLCJtIiwibiIsImV4dGVudGlvbnNJbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsTUFBTSxDQUFDQyxhQUFQLEdBQXVCLFVBQVNDLEdBQVQsRUFBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVFGLE1BQU0sQ0FBQ0csWUFBUCxDQUFvQkQsR0FBcEIsQ0FBUjtBQUNILENBWkQ7O0FBYUFGLE1BQU0sQ0FBQ0ksYUFBUCxHQUF1QixVQUFTQyxJQUFULEVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJQyxTQUFTLEdBQUdDLFFBQWhCOztBQUNBLE1BQUlDLGVBQWUsR0FBR0YsU0FBUyxDQUFDRyxHQUFWLENBQWNDLE1BQWQsQ0FBcUJDLEtBQXJCLENBQTJCTixJQUEzQixDQUF0Qjs7QUFDQSxNQUFJTyxTQUFTLEdBQUdKLGVBQWUsQ0FBQ0ssUUFBaEIsQ0FBeUJOLFFBQVEsQ0FBQ0UsR0FBVCxDQUFhSyxJQUF0QyxDQUFoQjtBQUNBLFNBQU9GLFNBQVMsQ0FBQ0MsUUFBVixFQUFQO0FBQ0gsQ0FaRDs7QUFhQWIsTUFBTSxDQUFDZSxHQUFQLEdBQWEsU0FBU0EsR0FBVCxDQUFhQyxJQUFiLEVBQW1CO0FBQzVCLFNBQU8sS0FBS1QsUUFBTCxDQUFjVSxHQUFkLENBQWtCRCxJQUFsQixDQUFQO0FBQ0gsQ0FGRDs7QUFJQWhCLE1BQU0sQ0FBQ2tCLGFBQVAsR0FBdUIsVUFBVUMsU0FBVixFQUFxQjtBQUN4QyxTQUFVQSxTQUFTLENBQUNDLElBQXBCLFNBQTRCRCxTQUFTLENBQUNFLFFBQXRDO0FBQ0gsQ0FGRDs7QUFJQXJCLE1BQU0sQ0FBQ3NCLGNBQVAsR0FBd0IsVUFBVUMsR0FBVixFQUFlO0FBQ25DQSxFQUFBQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLE1BQVosRUFBb0IsRUFBcEIsQ0FBTjtBQUVBLE1BQUlSLElBQUksR0FBRztBQUFFTyxJQUFBQSxHQUFHLEVBQUUsSUFBUDtBQUFhSCxJQUFBQSxJQUFJLEVBQUUsSUFBbkI7QUFBeUJDLElBQUFBLFFBQVEsRUFBRTtBQUFuQyxHQUFYO0FBQ0FMLEVBQUFBLElBQUksQ0FBQ08sR0FBTCxHQUFXQSxHQUFYLENBSm1DLENBS25DOztBQUNBLE1BQUlGLFFBQVEsR0FBR0wsSUFBSSxDQUFDTyxHQUFMLENBQVNFLEtBQVQsQ0FBZVQsSUFBSSxDQUFDTyxHQUFMLENBQVNHLFdBQVQsQ0FBcUIsR0FBckIsSUFBNEIsQ0FBM0MsQ0FBZjtBQUNBLE1BQUlDLE9BQU8sR0FBR1gsSUFBSSxDQUFDTyxHQUFMLENBQVNLLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJaLElBQUksQ0FBQ08sR0FBTCxDQUFTTSxNQUFULEdBQWtCUixRQUFRLENBQUNRLE1BQTNCLEdBQW9DLENBQXZELENBQWQ7QUFDQSxNQUFJQyxPQUFPLEdBQUdILE9BQWQ7O0FBQ0EsTUFBSUksTUFBSixFQUFZO0FBQ1JELElBQUFBLE9BQU8sR0FBRzlCLE1BQU0sQ0FBQ2UsR0FBUCxDQUFXWSxPQUFYLEVBQW9CZCxRQUFwQixFQUFWO0FBQ0FHLElBQUFBLElBQUksQ0FBQ0ksSUFBTCxHQUFZVSxPQUFaO0FBQ0gsR0FIRCxNQUdPO0FBQ0hkLElBQUFBLElBQUksQ0FBQ0ksSUFBTCxHQUFZTyxPQUFaO0FBQ0g7O0FBQ0RYLEVBQUFBLElBQUksQ0FBQ0ssUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFPTCxJQUFQO0FBQ0gsQ0FqQkQ7O0FBbUJBZ0IsSUFBSSxDQUFDQyxTQUFMLENBQWVDLE1BQWYsR0FBd0IsVUFBVUEsTUFBVixFQUFrQjtBQUN0QyxNQUFJQyxJQUFJLEdBQUc7QUFDUCxVQUFNLEtBQUtDLFFBQUwsS0FBa0IsQ0FEakI7QUFFUCxVQUFNLEtBQUtDLE9BQUwsRUFGQztBQUdQLFVBQU0sS0FBS0MsUUFBTCxFQUhDO0FBSVAsVUFBTSxLQUFLQyxVQUFMLEVBSkM7QUFLUCxVQUFNLEtBQUtDLFVBQUwsRUFMQztBQU1QLFVBQU1DLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUMsS0FBS04sUUFBTCxLQUFrQixDQUFuQixJQUF3QixDQUFuQyxDQU5DO0FBT1AsVUFBTSxLQUFLTyxlQUFMO0FBUEMsR0FBWDs7QUFTQSxNQUFJLFFBQVFDLElBQVIsQ0FBYVYsTUFBYixDQUFKLEVBQTBCO0FBQ3RCQSxJQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ1YsT0FBUCxDQUFlcUIsTUFBTSxDQUFDQyxFQUF0QixFQUEwQixDQUFDLEtBQUtDLFdBQUwsS0FBcUIsRUFBdEIsRUFBMEJuQixNQUExQixDQUFpQyxJQUFJaUIsTUFBTSxDQUFDQyxFQUFQLENBQVVqQixNQUEvQyxDQUExQixDQUFUO0FBQ0g7O0FBQ0QsT0FBSyxJQUFJbUIsQ0FBVCxJQUFjYixJQUFkLEVBQW9CO0FBQ2hCLFFBQUksSUFBSVUsTUFBSixDQUFXLE1BQU1HLENBQU4sR0FBVSxHQUFyQixFQUEwQkosSUFBMUIsQ0FBK0JWLE1BQS9CLENBQUosRUFBNEM7QUFDeENBLE1BQUFBLE1BQU0sR0FBR0EsTUFBTSxDQUFDVixPQUFQLENBQWVxQixNQUFNLENBQUNDLEVBQXRCLEVBQTBCRCxNQUFNLENBQUNDLEVBQVAsQ0FBVWpCLE1BQVYsSUFBb0IsQ0FBcEIsR0FDL0JNLElBQUksQ0FBQ2EsQ0FBRCxDQUQyQixHQUNyQixDQUFDLE9BQU9iLElBQUksQ0FBQ2EsQ0FBRCxDQUFaLEVBQWlCcEIsTUFBakIsQ0FBd0IsQ0FBQyxLQUFLTyxJQUFJLENBQUNhLENBQUQsQ0FBVixFQUFlbkIsTUFBdkMsQ0FETCxDQUFUO0FBRUg7QUFDSjs7QUFDRCxTQUFPSyxNQUFQO0FBQ0gsQ0FwQkQ7QUFzQkE7OztBQUNBRixJQUFJLENBQUNpQixPQUFMLEdBQWUsWUFBWTtBQUN2QixTQUFPUixJQUFJLENBQUNDLEtBQUwsQ0FBV1YsSUFBSSxDQUFDa0Isa0JBQUwsS0FBNEIsSUFBdkMsQ0FBUDtBQUNILENBRkQ7QUFHQTs7O0FBQ0FsQixJQUFJLENBQUNrQixrQkFBTCxHQUEwQixZQUFZO0FBQ2xDLE1BQUlDLEdBQUcsR0FBRyxJQUFJbkIsSUFBSixFQUFWO0FBQ0EsU0FBT21CLEdBQUcsQ0FBQ0MsT0FBSixFQUFQO0FBQ0gsQ0FIRDs7QUFLQUMsTUFBTSxDQUFDbkIsTUFBUCxHQUFnQixZQUFZO0FBQ3hCLE1BQUlvQixLQUFLLEdBQUcsRUFBWjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLENBQUMsR0FBR0MsU0FBUyxDQUFDNUIsTUFBOUIsRUFBc0MwQixDQUFDLEdBQUdDLENBQTFDLEVBQTZDRCxDQUFDLEVBQTlDLEVBQWtEO0FBQzlDRCxJQUFBQSxLQUFLLENBQUNJLElBQU4sQ0FBV0QsU0FBUyxDQUFDRixDQUFELENBQXBCO0FBQ0g7O0FBQ0QsTUFBSUksUUFBUSxHQUFHTCxLQUFLLENBQUMsQ0FBRCxDQUFwQixDQUx3QixDQUtDOztBQUN6QixNQUFLLE9BQU9LLFFBQVAsSUFBbUIsUUFBeEIsRUFBa0M7QUFDOUIsUUFBSyxDQUFDQyxTQUFOLEVBQ0lDLEVBQUUsQ0FBQ0MsS0FBSDtBQUNKLFdBQU8sRUFBUDtBQUNIOztBQUNEUixFQUFBQSxLQUFLLENBQUNTLEtBQU4sR0FYd0IsQ0FXVDs7QUFDZixNQUFLQyxLQUFLLENBQUNDLE9BQU4sQ0FBY1gsS0FBSyxDQUFDLENBQUQsQ0FBbkIsS0FBMkJBLEtBQUssQ0FBQ3pCLE1BQU4sSUFBZ0IsQ0FBaEQsRUFBbUQ7QUFDL0N5QixJQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQyxDQUFELENBQWI7QUFDSDs7QUFDRCxTQUFPSyxRQUFRLENBQUNuQyxPQUFULENBQWlCLFlBQWpCLEVBQStCLFVBQVUwQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDbEQsV0FBT2IsS0FBSyxDQUFDYSxDQUFELENBQVo7QUFDSCxHQUZNLENBQVA7QUFHSCxDQWxCRDs7QUFvQk8sU0FBU0MsY0FBVCxHQUF5QixDQUM1QjtBQUNIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXNjcmlwdGlvbiDlr7ljb2NvcyDov5vooYzmianlsZXvvIzmnKzohJrmnKzku6Xmj5Lku7bmlrnlvI/ov5DooYxcbiAqIFxuICogXG4gKi9cblxud2luZG93LmJhc2U2NEVuY3J5cHQgPSBmdW5jdGlvbihvYmopIHtcbiAgICAvLyBsZXQgX0NyeXB0b0pTID0gQ3J5cHRvSlM7XG4gICAgLy8gbGV0IHdvcmQgPSBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIC8vIGxldCBrZXkgPSBfQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UoXCJidGdhbWVeJiohQCMxMjNBYmNcIik7XG4gICAgLy8gbGV0IHNyY3MgPSBfQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2Uod29yZCk7XG4gICAgLy8gbGV0IGVuY3J5cHRlZCA9IF9DcnlwdG9KUy5ERVMuZW5jcnlwdChzcmNzLCBrZXksIHsgIG1vZGU6IF9DcnlwdG9KUy5tb2RlLkVDQiwgcGFkZGluZzogX0NyeXB0b0pTLnBhZC5Qa2NzNyB9KTtcbiAgICAvLyByZXR1cm4gZW5jcnlwdGVkLmNpcGhlcnRleHQudG9TdHJpbmcoKTtcbiAgICAvLyBsZXQgX0NyeXB0b0pTID0gQ3J5cHRvSlM7XG4gICAgLy8gbGV0IHdvcmQgPSBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIC8vIGxldCBzcmNzID0gX0NyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKG9iaik7XG4gICAgLy8gdmFyIGJhc2U2NCA9IF9DcnlwdG9KUy5lbmMuQmFzZTY0LnN0cmluZ2lmeShzcmNzKTtcbiAgICByZXR1cm4gIHdpbmRvdy5iYXNlNjRFbmNvZGUob2JqKTtcbn1cbndpbmRvdy5iYXNlNjREZWNyeXB0ID0gZnVuY3Rpb24od29yZCkge1xuICAgIC8vIGxldCBfQ3J5cHRvSlMgPSBDcnlwdG9KUztcbiAgICAvLyBsZXQga2V5ID0gX0NyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKFwiYnRnYW1lXiYqIUAjMTIzQWJjXCIpO1xuICAgIC8vIGxldCBlbmNyeXB0ZWRIZXhTdHIgPSBfQ3J5cHRvSlMuZW5jLkhleC5wYXJzZSh3b3JkKTtcbiAgICAvLyBsZXQgc3JjcyA9IF9DcnlwdG9KUy5lbmMuQmFzZTY0LnN0cmluZ2lmeShlbmNyeXB0ZWRIZXhTdHIpO1xuICAgIC8vIGxldCBkZWNyeXB0ID0gX0NyeXB0b0pTLkRFUy5kZWNyeXB0KHNyY3MsIGtleSwgeyAgbW9kZTogX0NyeXB0b0pTLm1vZGUuRUNCLCBwYWRkaW5nOiBfQ3J5cHRvSlMucGFkLlBrY3M3IH0pO1xuICAgIC8vIGxldCBkZWNyeXB0ZWRTdHIgPSBkZWNyeXB0LnRvU3RyaW5nKF9DcnlwdG9KUy5lbmMuVXRmOCk7XG4gICAgLy8gcmV0dXJuIGRlY3J5cHRlZFN0ci50b1N0cmluZygpO1xuICAgIGxldCBfQ3J5cHRvSlMgPSBDcnlwdG9KUztcbiAgICB2YXIgcGFyc2VkV29yZEFycmF5ID0gX0NyeXB0b0pTLmVuYy5CYXNlNjQucGFyc2Uod29yZCk7XG4gICAgdmFyIHBhcnNlZFN0ciA9IHBhcnNlZFdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG4gICAgcmV0dXJuIHBhcnNlZFN0ci50b1N0cmluZygpO1xufVxud2luZG93Lm1kNSA9IGZ1bmN0aW9uIG1kNShkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuQ3J5cHRvSlMuTUQ1KGRhdGEpO1xufVxuXG53aW5kb3cubWFrZVJlbW90ZVVybCA9IGZ1bmN0aW9uIChyZW1vdGVVcmwpIHtcbiAgICByZXR1cm4gYCR7cmVtb3RlVXJsLnBhdGh9LyR7cmVtb3RlVXJsLmZpbGVOYW1lfWA7XG59XG5cbndpbmRvdy5wYXJzZVJlbW90ZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFxzKi9nLCBcIlwiKTtcblxuICAgIGxldCBkYXRhID0geyB1cmw6IG51bGwsIHBhdGg6IG51bGwsIGZpbGVOYW1lOiBudWxsIH07XG4gICAgZGF0YS51cmwgPSB1cmw7XG4gICAgLy/mkZjlj5bmlofku7ZcbiAgICBsZXQgZmlsZU5hbWUgPSBkYXRhLnVybC5zbGljZShkYXRhLnVybC5sYXN0SW5kZXhPZihcIi9cIikgKyAxKTtcbiAgICBsZXQgZmlsZURpciA9IGRhdGEudXJsLnN1YnN0cigwLCBkYXRhLnVybC5sZW5ndGggLSBmaWxlTmFtZS5sZW5ndGggLSAxKTtcbiAgICBsZXQgbWQ1cGF0aCA9IGZpbGVEaXI7XG4gICAgaWYgKENDX0pTQikge1xuICAgICAgICBtZDVwYXRoID0gd2luZG93Lm1kNShmaWxlRGlyKS50b1N0cmluZygpO1xuICAgICAgICBkYXRhLnBhdGggPSBtZDVwYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEucGF0aCA9IGZpbGVEaXI7XG4gICAgfVxuICAgIGRhdGEuZmlsZU5hbWUgPSBmaWxlTmFtZTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxuRGF0ZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHZhciBkYXRlID0ge1xuICAgICAgICBcIk0rXCI6IHRoaXMuZ2V0TW9udGgoKSArIDEsXG4gICAgICAgIFwiZCtcIjogdGhpcy5nZXREYXRlKCksXG4gICAgICAgIFwiaCtcIjogdGhpcy5nZXRIb3VycygpLFxuICAgICAgICBcIm0rXCI6IHRoaXMuZ2V0TWludXRlcygpLFxuICAgICAgICBcInMrXCI6IHRoaXMuZ2V0U2Vjb25kcygpLFxuICAgICAgICBcInErXCI6IE1hdGguZmxvb3IoKHRoaXMuZ2V0TW9udGgoKSArIDMpIC8gMyksXG4gICAgICAgIFwiUytcIjogdGhpcy5nZXRNaWxsaXNlY29uZHMoKVxuICAgIH07XG4gICAgaWYgKC8oeSspL2kudGVzdChmb3JtYXQpKSB7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcbiAgICB9XG4gICAgZm9yICh2YXIgayBpbiBkYXRlKSB7XG4gICAgICAgIGlmIChuZXcgUmVnRXhwKFwiKFwiICsgayArIFwiKVwiKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSwgUmVnRXhwLiQxLmxlbmd0aCA9PSAxID9cbiAgICAgICAgICAgICAgICBkYXRlW2tdIDogKFwiMDBcIiArIGRhdGVba10pLnN1YnN0cigoXCJcIiArIGRhdGVba10pLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXQ7XG59O1xuXG4vKipAZGVzY3JpcHRpb24g6L+U5Zue5b2T5YmN5pe26Ze055qE56eS5pWwICovXG5EYXRlLnRpbWVOb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS50aW1lTm93TWlsbGlzZWNvbnMoKSAvIDEwMDApO1xufVxuLyoqQGRlc2NyaXB0aW9uIOi/lOWbnuW9k+WJjeaXtumXtOeahOavq+enkuaVsCAqL1xuRGF0ZS50aW1lTm93TWlsbGlzZWNvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIG5vdy5nZXRUaW1lKCk7XG59XG5cblN0cmluZy5mb3JtYXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmFtID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHBhcmFtLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gICAgdmFyIHN0YXRtZW50ID0gcGFyYW1bMF07IC8vIGdldCB0aGUgZmlyc3QgZWxlbWVudCh0aGUgb3JpZ2luYWwgc3RhdGVtZW50KVxuICAgIGlmICggdHlwZW9mIHN0YXRtZW50ICE9IFwic3RyaW5nXCIgKXtcbiAgICAgICAgaWYgKCAhQ0NfRURJVE9SIClcbiAgICAgICAgICAgIGNjLmVycm9yKGBTdHJpbmcuZm9ybWF0IGVycm9yLGZpcnN0IHBhcmFtIGlzIG5vdCBhIHN0cmluZ2ApO1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcGFyYW0uc2hpZnQoKTsgLy8gcmVtb3ZlIHRoZSBmaXJzdCBlbGVtZW50IGZyb20gYXJyYXlcbiAgICBpZiAoIEFycmF5LmlzQXJyYXkocGFyYW1bMF0pICYmIHBhcmFtLmxlbmd0aCA9PSAxICl7XG4gICAgICAgIHBhcmFtID0gcGFyYW1bMF07XG4gICAgfVxuICAgIHJldHVybiBzdGF0bWVudC5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgZnVuY3Rpb24gKG0sIG4pIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtW25dO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW50aW9uc0luaXQoKXtcbiAgICAvL2NjLmxvZyhgZXh0ZW50aW9uc0luaXRgKTtcbn1cblxuXG5cbiJdfQ==