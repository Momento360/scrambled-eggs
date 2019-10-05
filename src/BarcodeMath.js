"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRMath = exports.QRUtil = exports.QRMaskPattern = exports.QRErrorCorrectLevel = exports.QRMode = exports.Polynomial = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Polynomial =
/*#__PURE__*/
function () {
  function Polynomial(num, shift) {
    _classCallCheck(this, Polynomial);

    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);

    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  _createClass(Polynomial, [{
    key: "get",
    value: function get(index) {
      return this.num[index];
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return this.num.length;
    }
  }, {
    key: "multiply",
    value: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new Polynomial(num, 0);
    }
  }, {
    key: "mod",
    value: function mod(e) {
      if (this.getLength() - e.getLength() < 0) {
        return this;
      }

      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      var num = new Array(this.getLength());

      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }

      for (var _i = 0; _i < e.getLength(); _i++) {
        num[_i] ^= QRMath.gexp(QRMath.glog(e.get(_i)) + ratio);
      }

      return new Polynomial(num, 0).mod(e);
    }
  }]);

  return Polynomial;
}();

exports.Polynomial = Polynomial;
var QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
exports.QRMode = QRMode;
var QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
exports.QRErrorCorrectLevel = QRErrorCorrectLevel;
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
exports.QRMaskPattern = QRMaskPattern;
var QRUtil = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function getBCHTypeInfo(data) {
    var d = data << 10;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }

    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function getBCHTypeNumber(data) {
    var d = data << 12;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }

    return data << 12 | d;
  },
  getBCHDigit: function getBCHDigit(data) {
    var digit = 0;

    while (data != 0) {
      digit++;
      data >>>= 1;
    }

    return digit;
  },
  getPatternPosition: function getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;

      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;

      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;

      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;

      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;

      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;

      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;

      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
    var a = new Polynomial([1], 0);

    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new Polynomial([1, QRMath.gexp(i)], 0));
    }

    return a;
  },
  getLengthInBits: function getLengthInBits(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;

        case QRMode.MODE_ALPHA_NUM:
          return 9;

        case QRMode.MODE_8BIT_BYTE:
          return 8;

        case QRMode.MODE_KANJI:
          return 8;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;

        case QRMode.MODE_ALPHA_NUM:
          return 11;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 10;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;

        case QRMode.MODE_ALPHA_NUM:
          return 13;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 12;

        default:
          throw new Error("mode:" + mode);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function getLostPoint(matrixBarcode) {
    var moduleCount = matrixBarcode.getModuleCount();
    var lostPoint = 0;

    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var dark = matrixBarcode.isDark(row, col);

        for (var r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }

          for (var c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }

            if (r == 0 && c == 0) {
              continue;
            }

            if (dark == matrixBarcode.isDark(row + r, col + c)) {
              sameCount++;
            }
          }
        }

        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }

    for (var _row = 0; _row < moduleCount - 1; _row++) {
      for (var _col = 0; _col < moduleCount - 1; _col++) {
        var count = 0;
        if (matrixBarcode.isDark(_row, _col)) count++;
        if (matrixBarcode.isDark(_row + 1, _col)) count++;
        if (matrixBarcode.isDark(_row, _col + 1)) count++;
        if (matrixBarcode.isDark(_row + 1, _col + 1)) count++;

        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }

    for (var _row2 = 0; _row2 < moduleCount; _row2++) {
      for (var _col2 = 0; _col2 < moduleCount - 6; _col2++) {
        if (matrixBarcode.isDark(_row2, _col2) && !matrixBarcode.isDark(_row2, _col2 + 1) && matrixBarcode.isDark(_row2, _col2 + 2) && matrixBarcode.isDark(_row2, _col2 + 3) && matrixBarcode.isDark(_row2, _col2 + 4) && !matrixBarcode.isDark(_row2, _col2 + 5) && matrixBarcode.isDark(_row2, _col2 + 6)) {
          lostPoint += 40;
        }
      }
    }

    for (var _col3 = 0; _col3 < moduleCount; _col3++) {
      for (var _row3 = 0; _row3 < moduleCount - 6; _row3++) {
        if (matrixBarcode.isDark(_row3, _col3) && !matrixBarcode.isDark(_row3 + 1, _col3) && matrixBarcode.isDark(_row3 + 2, _col3) && matrixBarcode.isDark(_row3 + 3, _col3) && matrixBarcode.isDark(_row3 + 4, _col3) && !matrixBarcode.isDark(_row3 + 5, _col3) && matrixBarcode.isDark(_row3 + 6, _col3)) {
          lostPoint += 40;
        }
      }
    }

    var darkCount = 0;

    for (var _col4 = 0; _col4 < moduleCount; _col4++) {
      for (var _row4 = 0; _row4 < moduleCount; _row4++) {
        if (matrixBarcode.isDark(_row4, _col4)) {
          darkCount++;
        }
      }
    }

    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
};
exports.QRUtil = QRUtil;
var QRMath = {
  glog: function glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }

    return QRMath.LOG_TABLE[n];
  },
  gexp: function gexp(n) {
    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};
exports.QRMath = QRMath;

for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}

for (var _i2 = 8; _i2 < 256; _i2++) {
  QRMath.EXP_TABLE[_i2] = QRMath.EXP_TABLE[_i2 - 4] ^ QRMath.EXP_TABLE[_i2 - 5] ^ QRMath.EXP_TABLE[_i2 - 6] ^ QRMath.EXP_TABLE[_i2 - 8];
}

for (var _i3 = 0; _i3 < 255; _i3++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[_i3]] = _i3;
}

