import canvasImg, { ImageCircle, ImageClip } from './src';

async function img1() {
	const canvas = new canvasImg(750, 1334);
	const qrurl = `http://qrcode.ourwill.cn/png/${btoa('http://live.tuwenzhibo.com')}.png?s=6`;
	const imgs = ['http://cdn.ourwill.cn/static/images/invite1.jpg', 'http://cdn.ourwill.cn/static/images/123.png', qrurl];
	const [bg, avatar, qrcode] = await canvas.loadImgByUrl(imgs, true);
	canvas.setBackground(bg);
	const avatarConfig = {
		square: true
	};
	const avatarConfigImg = {
		x: 110,
		y: 119,
		w: 134,
		h: 134
	};
	canvas.addImg(new ImageCircle(avatar, avatarConfig).getCanvas(), avatarConfig);
	const nameConfig = {
		maxWidth: 400,
		fontSize: 32,
		maxLines: 1,
		fontWeight: '400',
		fillStyle: '#111',
		fontFamily: 'sans-serif'
	};
	const nameConfigImg = {
		x: 109,
		y: 285
	};
	canvas.addText('Sucong Hou', nameConfig, nameConfigImg);

	const titleConfig = {
		maxWidth: 550,
		fontSize: 32,
		lineHeight: 2,
		fontWeight: '500',
		fillStyle: '#111',
		fontFamily: 'sans-serif',
		maxLines: 2
	};
	const titleConfigImg = {
		x: 110,
		y: 478
	};
	canvas.addText('#遇见生活#生活方式面面观——大咖采访会', titleConfig, titleConfigImg);

	const timeConfig = {
		maxWidth: 550,
		fontSize: 26,
		maxLines: 1,
		fontWeight: '300',
		fillStyle: '#888',
		fontFamily: 'sans-serif'
	};
	const timeConfigImg = {
		x: 109,
		y: 624
	};
	canvas.addText('18/06/26 14:30', timeConfig, timeConfigImg);

	canvas.addImg(new ImageClip(qrcode, { padding: 24 }).getCanvas(), {
		x: 110,
		y: 693,
		w: 181,
		h: 181
	});

	const intro =
		'2018北京国际家具展暨智能生活节于6月14-17日在北京·中国国际展览中心（新馆）盛大召开。《今日家具》中文版直播间将以“生活方式面面观”为主题，邀请多位家具行业大咖，共同探讨有关生活方式的诸多话题。';
	const introConfig = {
		maxWidth: 540,
		fontSize: 24,
		lineHeight: 2,
		fontWeight: '300',
		fillStyle: '#888',
		fontFamily: 'sans-serif'
	};
	const introConfigImg = {
		centerx: true,
		y: 968
	};
	canvas.addText(intro, introConfig, introConfigImg);

	document.body.appendChild(canvas.getImg());
}

async function img2() {
	const canvas = new canvasImg(750, 1334);
	const qrurl = `http://qrcode.ourwill.cn/png/${btoa('http://live.tuwenzhibo.com')}.png?s=6`;
	const imgs = ['http://cdn.ourwill.cn/static/images/invite2.jpg', 'http://cdn.ourwill.cn/static/images/123.png', qrurl];
	const [bg, avatar, qrcode] = await canvas.loadImgByUrl(imgs, true);
	canvas.setBackground(bg);
	const avatarConfig = {
		square: true
	};
	const avatarConfigImg = {
		centerx: true,
		y: 140,
		w: 134,
		h: 134
	};
	canvas.addImg(new ImageCircle(avatar, avatarConfig).getCanvas(), avatarConfigImg);
	const nameConfig = {
		maxWidth: 400,
		fontSize: 32,
		maxLines: 1,
		fontWeight: '400',
		fillStyle: '#111',
		fontFamily: 'sans-serif'
	};
	const nameConfigImg = {
		centerx: true,
		y: 305
	};
	canvas.addText('Sucong Hou', nameConfig, nameConfigImg);

	const titleConfig = {
		maxWidth: 516,
		fontSize: 32,
		lineHeight: 1.8,
		fontWeight: '500',
		fillStyle: '#111',
		fontFamily: 'sans-serif',
		maxLines: 2,
		lastLineCenter: true
	};
	const titleConfigImg = {
		x: 116,
		y: 499
	};
	canvas.addText('#遇见生活#生活方式面面观——大咖采访会', titleConfig, titleConfigImg);

	const timeConfig = {
		maxWidth: 200,
		fontSize: 26,
		maxLines: 1,
		fontWeight: '300',
		fillStyle: '#888',
		fontFamily: 'sans-serif'
	};
	const timeConfigImg = {
		centerx: true,
		y: 645
	};
	canvas.addText('18/06/26 14:30', timeConfig, timeConfigImg);

	canvas.addImg(new ImageClip(qrcode, { padding: 24 }).getCanvas(), {
		centerx: true,
		y: 714,
		w: 181,
		h: 181
	});

	const intro =
		'2018北京国际家具展暨智能生活节于6月14-17日在北京·中国国际展览中心（新馆）盛大召开。《今日家具》中文版直播间将以“生活方式面面观”为主题，邀请多位家具行业大咖，共同探讨有关生活方式的诸多话题。';
	const introConfig = {
		maxWidth: 539,
		fontSize: 24,
		lineHeight: 2,
		fontWeight: '300',
		fillStyle: '#888',
		fontFamily: 'sans-serif',
		lastLineCenter: true
	};
	const introConfigImg = {
		x: 108,
		y: 989
	};
	canvas.addText(intro, introConfig, introConfigImg);

	document.body.appendChild(canvas.getImg());
}

async function img3() {
	const canvas = new canvasImg(750, 1334);
	const qrurl = `http://qrcode.ourwill.cn/png/${btoa('http://live.tuwenzhibo.com')}.png?s=6`;
	const imgs = ['http://cdn.ourwill.cn/static/images/invite3.jpg', 'http://cdn.ourwill.cn/static/images/123.png', qrurl];
	const [bg, avatar, qrcode] = await canvas.loadImgByUrl(imgs, true);
	canvas.setBackground(bg);
	const avatarConfig = {
		square: true
	};
	const avatarConfigImg = {
		w: 134,
		h: 134,
		centerx: true,
		y: 140
	};
	canvas.addImg(new ImageCircle(avatar, avatarConfig).getCanvas(), avatarConfigImg);
	const nameConfig = {
		maxWidth: 400,
		fontSize: 32,
		maxLines: 1,
		fontWeight: '400',
		fillStyle: '#111',
		fontFamily: 'Calibri'
	};
	const nameConfigImg = {
		centerx: true,
		y: 306
	};
	canvas.addText('Sucong Hou', nameConfig, nameConfigImg);

	const titleConfig = {
		maxWidth: 516,
		fontSize: 32,
		lineHeight: 1.8,
		fontWeight: '500',
		fillStyle: '#111',
		fontFamily: 'sans-serif',
		maxLines: 2,
		lastLineCenter: true
	};
	const titleConfigImg = {
		x: 116,
		y: 499
	};
	canvas.addText('#遇见生活#生活方式面面观——大咖采访会', titleConfig, titleConfigImg);

	const timeConfig = {
		maxWidth: 200,
		fontSize: 26,
		maxLines: 1,
		fontWeight: '300',
		fillStyle: '#888',
		fontFamily: 'sans-serif'
	};
	const timeConfigImg = {
		centerx: true,
		y: 645
	};
	canvas.addText('18/06/26 14:30', timeConfig, timeConfigImg);

	canvas.addImg(new ImageClip(qrcode, { padding: 24 }).getCanvas(), {
		centerx: true,
		y: 714,
		w: 181,
		h: 181
	});

	const intro =
		'2018北京国际家具展暨智能生活节于6月14-17日在北京·中国国际展览中心（新馆）盛大召开。《今日家具》中文版直播间将以“生活方式面面观”为主题，邀请多位家具行业大咖，共同探讨有关生活方式的诸多话题。';
	const introConfig = {
		maxWidth: 539,
		fontSize: 26,
		lineHeight: 2,
		fontWeight: '300',
		fillStyle: '#888',
		fontFamily: 'sans-serif',
		lastLineCenter: true
	};
	const introConfigImg = {
		centerx: true,
		y: 989
	};
	canvas.addText(intro, introConfig, introConfigImg);

	document.body.appendChild(canvas.getImg());
}

img3();
