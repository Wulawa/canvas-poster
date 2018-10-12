import util from './util.js';
export default class imageManager {
	constructor() {}
	loadByUrl(imgs, img) {
		return util.loader(imgs, img);
	}
}

export class ImageCircle {
	constructor(img, options = { square: true }) {
		this.canvas = document.createElement('canvas');
		const ctx = this.canvas.getContext('2d');
		const { width, height } = img;
		const { w, h, square } = options;

		let clpWidth, clpHeight, clpX, clpY, ww, hh;

		if (square) {
			const min = Math.min(width, height);
			ww = w ? w : min;
			hh = h ? h : min;
			this.canvas.width = min;
			this.canvas.height = min;
			clpWidth = min;
			clpHeight = min;
			clpX = (width - min) / 2;
			clpY = (height - min) / 2;
		} else {
			ww = w ? w : width;
			hh = h ? h : height;

			this.canvas.width = ww;
			this.canvas.height = hh;
			clpWidth = width;
			clpHeight = height;
			clpX = 0;
			clpY = 0;
		}
		const circle = {
			x: ww / 2,
			y: hh / 2,
			r: Math.min(ww, hh) / 2
		};
		ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
		ctx.clip();
		ctx.drawImage(img, clpX, clpY, clpWidth, clpHeight, 0, 0, ww, hh);
	}

	getCanvas() {
		return this.canvas;
	}
}

export class ImageClip {
	constructor(img, options = {}) {
		this.canvas = document.createElement('canvas');
		const ctx = this.canvas.getContext('2d');
		const { width, height } = img;
		const { padding } = options;
		this.canvas.width = width - 2 * padding;
		this.canvas.height = height - 2 * padding;
		ctx.drawImage(
			img,
			padding,
			padding,
			this.canvas.width,
			this.canvas.height,
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
	}

	getCanvas() {
		return this.canvas;
	}
}
