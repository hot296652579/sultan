"use strict";
cc._RF.push(module, 'ad8b2nPoztJoK0ijcGhOnO+', 'Base64');
// script/framework/external/Base64.js

"use strict";

function Base64() {
  this._arrayBufferToBase64 = function (buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  };

  this.stringToByte = function (str) {
    var bytes = new Array();
    var len, c;
    len = str.length;

    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);

      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(c >> 18 & 0x07 | 0xF0);
        bytes.push(c >> 12 & 0x3F | 0x80);
        bytes.push(c >> 6 & 0x3F | 0x80);
        bytes.push(c & 0x3F | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(c >> 12 & 0x0F | 0xE0);
        bytes.push(c >> 6 & 0x3F | 0x80);
        bytes.push(c & 0x3F | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(c >> 6 & 0x1F | 0xC0);
        bytes.push(c & 0x3F | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }

    return bytes;
  };

  this.encode = function (key, val) {
    var arry = this.stringToByte(val);
    var key = this.stringToByte(key);

    for (var i = 0; i < arry.length; i++) {
      arry[i] = arry[i] ^ key[i % key.length];
    }

    return this._arrayBufferToBase64(arry);
  };
}

window.base64Encode = function (val) {
  var key = "btgame^&*!@#123Abc";
  return new Base64().encode(key, val);
};

cc._RF.pop();