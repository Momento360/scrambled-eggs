/**
 * Draws MatrixBarcode by using canvas
 *
 * @constructor
 * @param {HTMLElement} el
 * @param {Object} htOption QRCode Options
 */
class CanvasDrawing {
	constructor(el, htOption) {
		this._el = el
		this._htOption = htOption

		this._bIsPainted = false

		this._elCanvas = document.createElement("canvas")
		this._elCanvas.width = htOption.width
		this._elCanvas.height = htOption.height
		this._el.appendChild(this._elCanvas)

		this._oContext = this._elCanvas.getContext("2d")
		this._elImage = document.createElement("img")
		this._elImage.alt = "Scan me!"
		this._elImage.style.display = "none"
		this._el.appendChild(this._elImage)
		this._bSupportDataURI = null
	}

	/**
	 * Draw the QRCode
	 *
	 * @param {QRCode} oQRCode
	 */
	draw(oQRCode) {
		const _elImage = this._elImage
		const _oContext = this._oContext
		const _htOption = this._htOption

		const nCount = oQRCode.getModuleCount()
		const nWidth = _htOption.width / nCount
		const nHeight = _htOption.height / nCount
		const nRoundedWidth = Math.round(nWidth)
		const nRoundedHeight = Math.round(nHeight)

		_elImage.style.display = "none"
		this.clear()

		for (let row = 0; row < nCount; row++) {
			for (let col = 0; col < nCount; col++) {
				const bIsDark = oQRCode.isDark(row, col)
				const nLeft = col * nWidth
				const nTop = row * nHeight
				_oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight
				_oContext.lineWidth = 1
				_oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight

				_oContext.fillRect(nLeft, nTop, nWidth, nHeight)

				// 안티 앨리어싱 방지 처리
				_oContext.strokeRect(Math.floor(nLeft) + 0.5, Math.floor(nTop) + 0.5, nRoundedWidth, nRoundedHeight)

				_oContext.strokeRect(Math.ceil(nLeft) - 0.5, Math.ceil(nTop) - 0.5, nRoundedWidth, nRoundedHeight)
			}
		}

		this._bIsPainted = true
	}

	/**
	 * Make the image from Canvas if the browser supports Data URI.
	 */
	makeImage() {
		if (this._bIsPainted) {
			this._safeSetDataURI(this._onMakeImage, function() {
				console.error("Error", arguments)
			})
		}
	}

	/**
	 * Return whether the QRCode is painted or not
	 *
	 * @return {Boolean}
	 */
	isPainted() {
		return this._bIsPainted
	}

	/**
	 * Clear the QRCode
	 */
	clear() {
		this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height)
		this._bIsPainted = false
	}

	/**
	 * Check whether the user's browser supports Data URI or not
	 *
	 * @private
	 * @param {Function} fSuccess Occurs if it supports Data URI
	 * @param {Function} fFail Occurs if it doesn't support Data URI
	 */
	_safeSetDataURI(fSuccess, fFail) {
		this._fFail = fFail
		this._fSuccess = fSuccess

		// Check it just once
		if (this._bSupportDataURI === null) {
			const el = document.createElement("img")
			const fOnError = function() {
				this._bSupportDataURI = false

				if (this._fFail) {
					this._fFail.call(this)
				}
			}
			const fOnSuccess = function() {
				this._bSupportDataURI = true

				if (this._fSuccess) {
					this._fSuccess.call(this)
				}
			}

			el.onabort = fOnError
			el.onerror = fOnError
			el.onload = fOnSuccess
			el.src =
				"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
			// the Image contains 1px data.
			return
		} else if (this._bSupportDataURI === true && this._fSuccess) {
			this._fSuccess.call(this)
		} else if (this._bSupportDataURI === false && this._fFail) {
			this._fFail.call(this)
		}
	}

	// Drawing in Canvas
	_onMakeImage() {
		this._elImage.src = this._elCanvas.toDataURL("image/png")
		this._elImage.style.display = "block"
		this._elCanvas.style.display = "none"
	}
}

export default CanvasDrawing
