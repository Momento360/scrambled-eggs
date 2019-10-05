"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SVGDrawing =
/*#__PURE__*/
function () {
  function SVGDrawing(el, htOption) {
    _classCallCheck(this, SVGDrawing);

    this._el = el;
    this._htOption = htOption;
  }

  _createClass(SVGDrawing, [{
    key: "draw",
    value: function draw(oMatrixBarcode) {
      var _htOption = this._htOption;
      var _el = this._el;
      var nCount = oMatrixBarcode.getModuleCount();
      var nWidth = Math.floor(_htOption.width / nCount);
      var nHeight = Math.floor(_htOption.height / nCount);
      this.clear();
      var svg = makeSVG("svg", {
        viewBox: "0 0 " + String(nCount) + " " + String(nCount),
        width: this._htOption.width,
        height: this._htOption.height,
        fill: _htOption.colorLight
      });
      svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

      _el.appendChild(svg);

      svg.appendChild(makeSVG("rect", {
        fill: _htOption.colorLight,
        width: "100%",
        height: "100%"
      }));
      svg.appendChild(makeSVG("rect", {
        fill: _htOption.colorDark,
        width: "1",
        height: "1",
        id: "template"
      }));

      for (var row = 0; row < nCount; row++) {
        for (var col = 0; col < nCount; col++) {
          if (oMatrixBarcode.isDark(row, col)) {
            var child = makeSVG("use", {
              x: String(col),
              y: String(row)
            });
            child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template");
            svg.appendChild(child);
          }
        }
      }
    }
  }, {
    key: "makeImage",
    value: function makeImage() {// This is already an image, so do nothing
    }
  }, {
    key: "clear",
    value: function clear() {
      while (this._el.hasChildNodes()) {
        this._el.removeChild(this._el.lastChild);
      }
    }
  }]);

  return SVGDrawing;
}();

function makeSVG(tag, attrs) {
  var el = document.createElementNS("http://www.w3.org/2000/svg", tag);

  for (var k in attrs) {
    if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
  }

  return el;
}

var _default = SVGDrawing;
exports["default"] = _default;

