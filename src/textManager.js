export default class textManager {
	constructor() {}
}

export class Text {
	constructor(text, options) {
		this.text = String(text);
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		const {
			devicePixelRatio,
			maxWidth,
			fontSize,
			fontFamily,
			fontWeight,
			lineHeight,
			textAlign,
			fillStyle,
			maxLines,
			lastLineCenter
		} = options;

		this.lastLineCenter = lastLineCenter;
		this.devicePixelRatio = devicePixelRatio || 1;
		this.maxLines = maxLines || 6;
		this.maxWidth = maxWidth || 100;
		this.maxWidth = this.devicePixelRatio * this.maxWidth;

		this.canvas.width = this.maxWidth;
		this.canvas.height = 10 * this.canvas.width;

		this.lineHeight = lineHeight || 1.2;

		if (fontSize && fontFamily && fontWeight) {
			this.fontSize = fontSize;

			if (devicePixelRatio > 2) {
				this.fontSize *= devicePixelRatio / 2;
			}
			this.ctx.font = `${fontWeight} ${this.fontSize}px ${fontFamily}`;
		} else {
			console.error('params error');
		}
		if (fillStyle) {
			this.ctx.fillStyle = fillStyle;
		}
		if (textAlign) {
			this.ctx.textAlign = textAlign;
		}

		this.draw();
	}

	draw() {
		let sc = 1;
		if (this.devicePixelRatio > 2) {
			sc = 2 / this.devicePixelRatio;
		}
		const baseLine = 0.85 * this.fontSize;
		let x = 0,
			y = baseLine;
		const lineHeight = this.lineHeight * this.fontSize * sc;
		const info = this.measureText();
		const j = info.length;
		for (let i = 0; i < j; i++) {
			const item = info[i];
			if (this.lastLineCenter && i == j - 1) {
				const w = this.ctx.measureText(item).width;
				x = this.maxWidth / 2 - w / 2;
				this.ctx.fillText(item, x, y + i * lineHeight, this.maxWidth);
			} else {
				this.ctx.fillText(item, x, y + i * lineHeight, this.maxWidth);
			}
		}
		this.maxHeight = j * lineHeight + y;
		if (j == 1) {
			this.maxWidth = this.ctx.measureText(this.text).width;
		}
	}

	measureText() {
		// TODO 二分查找
		const words = this.text;
		const maxWidth = this.maxWidth;
		const maxLines = this.maxLines - 1;
		const ctx = this.ctx;
		const res = [];
		const len = words.length;
		let line = '',
			lastLine = '',
			start = 0,
			isLast = false,
			i = 1;

		while (true) {
			line = words.substr(start, i);
			if (start + i > len) {
				res.push(line);
				break;
			}
			if (ctx.measureText(line).width > maxWidth) {
				start += i - 1;
				if (isLast || maxLines === 0) {
					res.push(lastLine.substr(0, lastLine.length - 3) + '...');
					break;
				}
				res.push(lastLine);
				if (res.length == maxLines) {
					isLast = true;
				}
				i = 1;
			} else {
				lastLine = line;
				i++;
			}
		}
		return res;
	}

	getCanvas() {
		const canvas = document.createElement('canvas');
		canvas.width = this.maxWidth;
		canvas.height = this.maxHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(
			this.canvas,
			0,
			0,
			canvas.width,
			canvas.height,
			0,
			0,
			canvas.width,
			canvas.height
		);
		return canvas;
	}
}
