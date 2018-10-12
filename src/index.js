import imageManager, { ImageCircle, ImageClip } from './imageManager.js';
import textManager, { Text } from './textManager.js';

class canvasImg {
	constructor(width, height) {
		this.image = new imageManager();
		this.text = new textManager();
		this.width = width;
		this.height = height;
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = this.canvas.getContext('2d');
	}
	async loadImgByUrl(imgs, img) {
		return this.image.loadByUrl(imgs, img);
	}
	setBackground(bgBlob) {
		this.bgImg = bgBlob;
		this.drawBackground();
	}
	drawBackground() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		if (this.bgImg) {
			this.ctx.drawImage(
				this.bgImg,
				0,
				0,
				this.width,
				this.height,
				0,
				0,
				this.width,
				this.height
			);
		}
	}
	drawRoundRect(x, y, width, height, radius, bg) {
		this.ctx.beginPath();
		this.ctx.arc(
			x + radius,
			y + radius,
			radius,
			Math.PI,
			(Math.PI * 3) / 2
		);
		this.ctx.lineTo(width - radius + x, y);
		this.ctx.arc(
			width - radius + x,
			radius + y,
			radius,
			(Math.PI * 3) / 2,
			Math.PI * 2
		);
		this.ctx.lineTo(width + x, height + y - radius);
		this.ctx.arc(
			width - radius + x,
			height - radius + y,
			radius,
			0,
			(Math.PI * 1) / 2
		);
		this.ctx.lineTo(radius + x, height + y);
		this.ctx.arc(
			radius + x,
			height - radius + y,
			radius,
			(Math.PI * 1) / 2,
			Math.PI
		);
		this.ctx.closePath();
		this.ctx.fillStyle = bg || '#fff';
		this.ctx.fill();
	}
	addImg(canvas, options) {
		const { width, height } = canvas;
		const { x, y, w, h, centerx, centery } = options;

		const ww = w ? w : width;
		const hh = h ? h : height;
		let xx = x;
		let yy = y;

		if (centerx) {
			xx = this.width / 2 - ww / 2;
		}
		if (centery) {
			yy = this.height / 2 - hh / 2;
		}

		this.ctx.drawImage(canvas, xx, yy, ww, hh);
	}
	addText(text, textOptions, imgOptions) {
		const t = new Text(text, textOptions);
		const img = t.getCanvas();
		this.addImg(img, imgOptions);
		return t;
	}
	getImg() {
		return this.canvas;
	}
}
export default canvasImg;
export { ImageCircle, ImageClip };
