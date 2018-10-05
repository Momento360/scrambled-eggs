class SVGDrawing {
	constructor(el, htOption) {
		this._el = el
		this._htOption = htOption
	}

	draw(oMatrixBarcode) {
		const _htOption = this._htOption
		const _el = this._el
		const nCount = oMatrixBarcode.getModuleCount()
		const nWidth = Math.floor(_htOption.width / nCount)
		const nHeight = Math.floor(_htOption.height / nCount)

		this.clear()

		const svg = makeSVG("svg", {
			viewBox: "0 0 " + String(nCount) + " " + String(nCount),
			width: this._htOption.width,
			height: this._htOption.height,
			fill: _htOption.colorLight
		})
		svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
		_el.appendChild(svg)

		svg.appendChild(
			makeSVG("rect", {
				fill: _htOption.colorLight,
				width: "100%",
				height: "100%"
			})
		)
		svg.appendChild(
			makeSVG("rect", {
				fill: _htOption.colorDark,
				width: "1",
				height: "1",
				id: "template"
			})
		)

		for (let row = 0; row < nCount; row++) {
			for (let col = 0; col < nCount; col++) {
				if (oMatrixBarcode.isDark(row, col)) {
					const child = makeSVG("use", {
						x: String(col),
						y: String(row)
					})
					child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
					svg.appendChild(child)
				}
			}
		}
	}

	makeImage() {
		// This is already an image, so do nothing
	}

	clear() {
		while (this._el.hasChildNodes()) this._el.removeChild(this._el.lastChild)
	}
}

function makeSVG(tag, attrs) {
	const el = document.createElementNS("http://www.w3.org/2000/svg", tag)
	for (const k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k])
	return el
}

export default SVGDrawing
