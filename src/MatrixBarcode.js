import Model from "./Model.js"
import SVGDrawing from "./SVGDrawing.js"
import CanvasDrawing from "./CanvasDrawing.js"
import { QRErrorCorrectLevel } from "./BarcodeMath.js"

class MatrixBarcode {
	/**
	 * @param {HTMLElement|String} el target element or 'id' attribute of element.
	 * @param {Object|String} vOption
	 * @param {String} vOption.text MatrixBarcode link data
	 * @param {Number} [vOption.width=256]
	 * @param {Number} [vOption.height=256]
	 * @param {String} [vOption.colorDark="#000000"]
	 * @param {String} [vOption.colorLight="#ffffff"]
	 * @param {MatrixBarcode.CorrectLevel} [vOption.correctLevel=MatrixBarcode.CorrectLevel.H] [L|M|Q|H]
	 */
	constructor(el, vOption) {
		this._el = el
		this._htOption = {
			width: 256,
			height: 256,
			typeNumber: 4,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRErrorCorrectLevel.H
		}

		if (typeof vOption === "string") {
			vOption = {
				text: vOption
			}
		}

		// Overwrites options
		if (vOption) {
			for (var i in vOption) {
				this._htOption[i] = vOption[i]
			}
		}

		if (typeof el == "string") {
			el = document.getElementById(el)
		}

		if (this._htOption.useSVG) {
			this._oDrawing = new SVGDrawing(this._el, this._htOption)
		} else {
			this._oDrawing = new CanvasDrawing(this._el, this._htOption)
		}

		this._oModel = null

		if (this._htOption.text) {
			this.makeCode(this._htOption.text)
		}
	}

	/**
	 * Make the MatrixBarcode
	 *
	 * @param {String} sText link data
	 */
	makeCode(sText) {
		this._oModel = new Model(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel)
		this._oModel.addData(sText)
		this._oModel.make()
		this._el.title = sText
		this._oDrawing.draw(this._oModel)
		this._oDrawing.makeImage()
	}

	/**
	 * Clear the MatrixBarcode
	 */
	clear() {
		this._oDrawing.clear()
	}
}

/**
 * @name MatrixBarcode.CorrectLevel
 */
MatrixBarcode.CorrectLevel = QRErrorCorrectLevel

function _getUTF8Length(sText) {
	var replacedText = encodeURI(sText)
		.toString()
		.replace(/\%[0-9a-fA-F]{2}/g, "a")
	return replacedText.length + (replacedText.length != sText ? 3 : 0)
}

var MatrixBarcodeLimitLength = [
	[17, 14, 11, 7],
	[32, 26, 20, 14],
	[53, 42, 32, 24],
	[78, 62, 46, 34],
	[106, 84, 60, 44],
	[134, 106, 74, 58],
	[154, 122, 86, 64],
	[192, 152, 108, 84],
	[230, 180, 130, 98],
	[271, 213, 151, 119],
	[321, 251, 177, 137],
	[367, 287, 203, 155],
	[425, 331, 241, 177],
	[458, 362, 258, 194],
	[520, 412, 292, 220],
	[586, 450, 322, 250],
	[644, 504, 364, 280],
	[718, 560, 394, 310],
	[792, 624, 442, 338],
	[858, 666, 482, 382],
	[929, 711, 509, 403],
	[1003, 779, 565, 439],
	[1091, 857, 611, 461],
	[1171, 911, 661, 511],
	[1273, 997, 715, 535],
	[1367, 1059, 751, 593],
	[1465, 1125, 805, 625],
	[1528, 1190, 868, 658],
	[1628, 1264, 908, 698],
	[1732, 1370, 982, 742],
	[1840, 1452, 1030, 790],
	[1952, 1538, 1112, 842],
	[2068, 1628, 1168, 898],
	[2188, 1722, 1228, 958],
	[2303, 1809, 1283, 983],
	[2431, 1911, 1351, 1051],
	[2563, 1989, 1423, 1093],
	[2699, 2099, 1499, 1139],
	[2809, 2213, 1579, 1219],
	[2953, 2331, 1663, 1273]
]

function _isSupportCanvas() {
	return typeof CanvasRenderingContext2D != "undefined"
}

/**
 * Get the type by string length
 *
 * @private
 * @param {String} sText
 * @param {Number} nCorrectLevel
 * @return {Number} type
 */
function _getTypeNumber(sText, nCorrectLevel) {
	var nType = 1
	var length = _getUTF8Length(sText)

	for (var i = 0, len = MatrixBarcodeLimitLength.length; i < len; i++) {
		var nLimit = 0

		switch (nCorrectLevel) {
			case QRErrorCorrectLevel.L:
				nLimit = MatrixBarcodeLimitLength[i][0]
				break
			case QRErrorCorrectLevel.M:
				nLimit = MatrixBarcodeLimitLength[i][1]
				break
			case QRErrorCorrectLevel.Q:
				nLimit = MatrixBarcodeLimitLength[i][2]
				break
			case QRErrorCorrectLevel.H:
				nLimit = MatrixBarcodeLimitLength[i][3]
				break
		}

		if (length <= nLimit) {
			break
		} else {
			nType++
		}
	}

	if (nType > MatrixBarcodeLimitLength.length) {
		throw new Error(
			"Text is beyond the limit of " + MatrixBarcodeLimitLength[MatrixBarcodeLimitLength.length - 1][3] + ": " + length
		)
	}

	return nType
}

export default MatrixBarcode
