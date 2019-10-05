"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BarcodeMath = require("./BarcodeMath.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Matrix8BitByte =
/*#__PURE__*/
function () {
  function Matrix8BitByte(data) {
    _classCallCheck(this, Matrix8BitByte);

    this.mode = _BarcodeMath.QRMode.MODE_8BIT_BYTE;
    this.data = data;
    this.parsedData = []; // Added to support UTF-8 Characters

    for (var i = 0, l = this.data.length; i < l; i++) {
      var byteArray = [];
      var code = this.data.charCodeAt(i);

      if (code > 0x10000) {
        byteArray[0] = 0xf0 | (code & 0x1c0000) >>> 18;
        byteArray[1] = 0x80 | (code & 0x3f000) >>> 12;
        byteArray[2] = 0x80 | (code & 0xfc0) >>> 6;
        byteArray[3] = 0x80 | code & 0x3f;
      } else if (code > 0x800) {
        byteArray[0] = 0xe0 | (code & 0xf000) >>> 12;
        byteArray[1] = 0x80 | (code & 0xfc0) >>> 6;
        byteArray[2] = 0x80 | code & 0x3f;
      } else if (code > 0x80) {
        byteArray[0] = 0xc0 | (code & 0x7c0) >>> 6;
        byteArray[1] = 0x80 | code & 0x3f;
      } else {
        byteArray[0] = code;
      }

      this.parsedData.push(byteArray);
    }

    this.parsedData = Array.prototype.concat.apply([], this.parsedData);

    if (this.parsedData.length != this.data.length) {
      this.parsedData.unshift(191);
      this.parsedData.unshift(187);
      this.parsedData.unshift(239);
    }
  }

  _createClass(Matrix8BitByte, [{
    key: "getLength",
    value: function getLength(buffer) {
      return this.parsedData.length;
    }
  }, {
    key: "write",
    value: function write(buffer) {
      for (var i = 0, l = this.parsedData.length; i < l; i++) {
        buffer.put(this.parsedData[i], 8);
      }
    }
  }]);

  return Matrix8BitByte;
}();

var _default = Matrix8BitByte;
exports["default"] = _default;

