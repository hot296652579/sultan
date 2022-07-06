"use strict";
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