"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Draws MatrixBarcode by using canvas
 *
 * @constructor
 * @param {HTMLElement} el
 * @param {Object} htOption QRCode Options
 */
var CanvasDrawing =
/*#__PURE__*/
function () {
  function CanvasDrawing(el, htOption) {
    _classCallCheck(this, CanvasDrawing);

    this._el = el;
    this._htOption = htOption;
    this._bIsPainted = false;
    this._elCanvas = document.createElement("canvas");
    this._elCanvas.width = htOption.width;
    this._elCanvas.height = htOption.height;

    this._el.appendChild(this._elCanvas);

    this._oContext = this._elCanvas.getContext("2d");
    this._elImage = document.createElement("img");
    this._elImage.alt = "Scan me!";
    this._elImage.style.display = "none";

    this._el.appendChild(this._elImage);

    this._bSupportDataURI = null;
  }
  /**
   * Draw the QRCode
   *
   * @param {QRCode} oQRCode
   */


  _createClass(CanvasDrawing, [{
    key: "draw",
    value: function draw(oQRCode) {
      var _elImage = this._elImage;
      var _oContext = this._oContext;
      var _htOption = this._htOption;
      var nCount = oQRCode.getModuleCount();
      var nWidth = _htOption.width / nCount;
      var nHeight = _htOption.height / nCount;
      var nRoundedWidth = Math.round(nWidth);
      var nRoundedHeight = Math.round(nHeight);
      _elImage.style.display = "none";
      this.clear();

      for (var row = 0; row < nCount; row++) {
        for (var col = 0; col < nCount; col++) {
          var bIsDark = oQRCode.isDark(row, col);
          var nLeft = col * nWidth;
          var nTop = row * nHeight;
          _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
          _oContext.lineWidth = 1;
          _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;

          _oContext.fillRect(nLeft, nTop, nWidth, nHeight); // 안티 앨리어싱 방지 처리


          _oContext.strokeRect(Math.floor(nLeft) + 0.5, Math.floor(nTop) + 0.5, nRoundedWidth, nRoundedHeight);

          _oContext.strokeRect(Math.ceil(nLeft) - 0.5, Math.ceil(nTop) - 0.5, nRoundedWidth, nRoundedHeight);
        }
      }

      this._bIsPainted = true;
    }
    /**
     * Make the image from Canvas if the browser supports Data URI.
     */

  }, {
    key: "makeImage",
    value: function makeImage() {
      if (this._bIsPainted) {
        this._safeSetDataURI(this._onMakeImage, function () {
          console.error("Error", arguments);
        });
      }
    }
    /**
     * Return whether the QRCode is painted or not
     *
     * @return {Boolean}
     */

  }, {
    key: "isPainted",
    value: function isPainted() {
      return this._bIsPainted;
    }
    /**
     * Clear the QRCode
     */

  }, {
    key: "clear",
    value: function clear() {
      this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);

      this._bIsPainted = false;
    }
    /**
     * Check whether the user's browser supports Data URI or not
     *
     * @private
     * @param {Function} fSuccess Occurs if it supports Data URI
     * @param {Function} fFail Occurs if it doesn't support Data URI
     */

  }, {
    key: "_safeSetDataURI",
    value: function _safeSetDataURI(fSuccess, fFail) {
      this._fFail = fFail;
      this._fSuccess = fSuccess; // Check it just once

      if (this._bSupportDataURI === null) {
        var el = document.createElement("img");

        var fOnError = function fOnError() {
          this._bSupportDataURI = false;

          if (this._fFail) {
            this._fFail.call(this);
          }
        };

        var fOnSuccess = function fOnSuccess() {
          this._bSupportDataURI = true;

          if (this._fSuccess) {
            this._fSuccess.call(this);
          }
        };

        el.onabort = fOnError;
        el.onerror = fOnError;
        el.onload = fOnSuccess;
        el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.

        return;
      } else if (this._bSupportDataURI === true && this._fSuccess) {
        this._fSuccess.call(this);
      } else if (this._bSupportDataURI === false && this._fFail) {
        this._fFail.call(this);
      }
    } // Drawing in Canvas

  }, {
    key: "_onMakeImage",
    value: function _onMakeImage() {
      this._elImage.src = this._elCanvas.toDataURL("image/png");
      this._elImage.style.display = "block";
      this._elCanvas.style.display = "none";
    }
  }]);

  return CanvasDrawing;
}();

var _default = CanvasDrawing;
exports["default"] = _default;

