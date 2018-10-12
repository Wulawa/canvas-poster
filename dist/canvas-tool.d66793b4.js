// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	xhr: function xhr(url) {
		var xhr = window.XMLHttpRequest;
		return new Promise(function (resolve, reject) {
			if (xhr) {
				try {
					var xmlhttp = new xhr();
					xmlhttp.open('GET', url, true);
					xmlhttp.responseType = 'blob';
					xmlhttp.withCredentials = false;
					xmlhttp.onload = function () {
						if (xmlhttp.status == 200) {
							resolve(xmlhttp.response);
						} else {
							reject(xmlhttp);
						}
					};
					xmlhttp.send(null);
				} catch (e) {
					console.error(e);
					reject(e);
				}
			} else {
				reject('no xhr');
			}
		});
	},
	blobtoImg: function blobtoImg(blob) {
		var img = new Image();
		return new Promise(function (resolve, reject) {
			img.src = window.URL.createObjectURL(blob);
			img.onload = function () {
				resolve(img);
			};
			img.onerror = function (e) {
				reject(e);
			};
		});
	},
	loader: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(urls, img) {
			var _this = this;

			var imgs;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return Promise.all(urls.map(function (item) {
								return _this.xhr(item);
							}));

						case 2:
							imgs = _context.sent;

							if (!img) {
								_context.next = 7;
								break;
							}

							_context.next = 6;
							return Promise.all(imgs.map(function (item) {
								return _this.blobtoImg(item);
							}));

						case 6:
							return _context.abrupt('return', _context.sent);

						case 7:
							return _context.abrupt('return', imgs);

						case 8:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function loader(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return loader;
	}()
};
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ImageClip = exports.ImageCircle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var imageManager = function () {
	function imageManager() {
		_classCallCheck(this, imageManager);
	}

	_createClass(imageManager, [{
		key: 'loadByUrl',
		value: function loadByUrl(imgs, img) {
			return _util2.default.loader(imgs, img);
		}
	}]);

	return imageManager;
}();

exports.default = imageManager;

var ImageCircle = exports.ImageCircle = function () {
	function ImageCircle(img) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { square: true };

		_classCallCheck(this, ImageCircle);

		this.canvas = document.createElement('canvas');
		var ctx = this.canvas.getContext('2d');
		var width = img.width,
		    height = img.height;
		var w = options.w,
		    h = options.h,
		    square = options.square;


		var clpWidth = void 0,
		    clpHeight = void 0,
		    clpX = void 0,
		    clpY = void 0,
		    ww = void 0,
		    hh = void 0;

		if (square) {
			var min = Math.min(width, height);
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
		var circle = {
			x: ww / 2,
			y: hh / 2,
			r: Math.min(ww, hh) / 2
		};
		ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
		ctx.clip();
		ctx.drawImage(img, clpX, clpY, clpWidth, clpHeight, 0, 0, ww, hh);
	}

	_createClass(ImageCircle, [{
		key: 'getCanvas',
		value: function getCanvas() {
			return this.canvas;
		}
	}]);

	return ImageCircle;
}();

var ImageClip = exports.ImageClip = function () {
	function ImageClip(img) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, ImageClip);

		this.canvas = document.createElement('canvas');
		var ctx = this.canvas.getContext('2d');
		var width = img.width,
		    height = img.height;
		var padding = options.padding;

		this.canvas.width = width - 2 * padding;
		this.canvas.height = height - 2 * padding;
		ctx.drawImage(img, padding, padding, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
	}

	_createClass(ImageClip, [{
		key: 'getCanvas',
		value: function getCanvas() {
			return this.canvas;
		}
	}]);

	return ImageClip;
}();
},{"./util.js":12}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var textManager = function textManager() {
	_classCallCheck(this, textManager);
};

exports.default = textManager;

var Text = exports.Text = function () {
	function Text(text, options) {
		_classCallCheck(this, Text);

		this.text = String(text);
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		var devicePixelRatio = options.devicePixelRatio,
		    maxWidth = options.maxWidth,
		    fontSize = options.fontSize,
		    fontFamily = options.fontFamily,
		    fontWeight = options.fontWeight,
		    lineHeight = options.lineHeight,
		    textAlign = options.textAlign,
		    fillStyle = options.fillStyle,
		    maxLines = options.maxLines,
		    lastLineCenter = options.lastLineCenter;


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
			this.ctx.font = fontWeight + ' ' + this.fontSize + 'px ' + fontFamily;
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

	_createClass(Text, [{
		key: 'draw',
		value: function draw() {
			var sc = 1;
			if (this.devicePixelRatio > 2) {
				sc = 2 / this.devicePixelRatio;
			}
			var baseLine = 0.85 * this.fontSize;
			var x = 0,
			    y = baseLine;
			var lineHeight = this.lineHeight * this.fontSize * sc;
			var info = this.measureText();
			var j = info.length;
			for (var i = 0; i < j; i++) {
				var item = info[i];
				if (this.lastLineCenter && i == j - 1) {
					var w = this.ctx.measureText(item).width;
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
	}, {
		key: 'measureText',
		value: function measureText() {
			// TODO 二分查找
			var words = this.text;
			var maxWidth = this.maxWidth;
			var maxLines = this.maxLines - 1;
			var ctx = this.ctx;
			var res = [];
			var len = words.length;
			var line = '',
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
	}, {
		key: 'getCanvas',
		value: function getCanvas() {
			var canvas = document.createElement('canvas');
			canvas.width = this.maxWidth;
			canvas.height = this.maxHeight;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(this.canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
			return canvas;
		}
	}]);

	return Text;
}();
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ImageClip = exports.ImageCircle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageManager = require('./imageManager.js');

var _imageManager2 = _interopRequireDefault(_imageManager);

var _textManager = require('./textManager.js');

var _textManager2 = _interopRequireDefault(_textManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvasImg = function () {
	function canvasImg(width, height) {
		_classCallCheck(this, canvasImg);

		this.image = new _imageManager2.default();
		this.text = new _textManager2.default();
		this.width = width;
		this.height = height;
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = this.canvas.getContext('2d');
	}

	_createClass(canvasImg, [{
		key: 'loadImgByUrl',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(imgs, img) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt('return', this.image.loadByUrl(imgs, img));

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function loadImgByUrl(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return loadImgByUrl;
		}()
	}, {
		key: 'setBackground',
		value: function setBackground(bgBlob) {
			this.bgImg = bgBlob;
			this.drawBackground();
		}
	}, {
		key: 'drawBackground',
		value: function drawBackground() {
			this.ctx.clearRect(0, 0, this.width, this.height);
			if (this.bgImg) {
				this.ctx.drawImage(this.bgImg, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
			}
		}
	}, {
		key: 'drawRoundRect',
		value: function drawRoundRect(x, y, width, height, radius, bg) {
			this.ctx.beginPath();
			this.ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
			this.ctx.lineTo(width - radius + x, y);
			this.ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
			this.ctx.lineTo(width + x, height + y - radius);
			this.ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
			this.ctx.lineTo(radius + x, height + y);
			this.ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
			this.ctx.closePath();
			this.ctx.fillStyle = bg || '#fff';
			this.ctx.fill();
		}
	}, {
		key: 'addImg',
		value: function addImg(canvas, options) {
			var width = canvas.width,
			    height = canvas.height;
			var x = options.x,
			    y = options.y,
			    w = options.w,
			    h = options.h,
			    centerx = options.centerx,
			    centery = options.centery;


			var ww = w ? w : width;
			var hh = h ? h : height;
			var xx = x;
			var yy = y;

			if (centerx) {
				xx = this.width / 2 - ww / 2;
			}
			if (centery) {
				yy = this.height / 2 - hh / 2;
			}

			this.ctx.drawImage(canvas, xx, yy, ww, hh);
		}
	}, {
		key: 'addText',
		value: function addText(text, textOptions, imgOptions) {
			var t = new _textManager.Text(text, textOptions);
			var img = t.getCanvas();
			this.addImg(img, imgOptions);
			return t;
		}
	}, {
		key: 'getImg',
		value: function getImg() {
			return this.canvas;
		}
	}]);

	return canvasImg;
}();

exports.default = canvasImg;
exports.ImageCircle = _imageManager.ImageCircle;
exports.ImageClip = _imageManager.ImageClip;
},{"./imageManager.js":8,"./textManager.js":9}],4:[function(require,module,exports) {
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var img1 = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var canvas, qrurl, imgs, _ref2, _ref3, bg, avatar, qrcode, avatarConfig, avatarConfigImg, nameConfig, nameConfigImg, titleConfig, titleConfigImg, timeConfig, timeConfigImg, intro, introConfig, introConfigImg;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						canvas = new _src2.default(750, 1334);
						qrurl = 'http://qrcode.ourwill.cn/png/' + btoa('http://live.tuwenzhibo.com') + '.png?s=6';
						imgs = ['http://cdn.ourwill.cn/static/images/invite1.jpg', 'http://cdn.ourwill.cn/static/images/123.png', qrurl];
						_context.next = 5;
						return canvas.loadImgByUrl(imgs, true);

					case 5:
						_ref2 = _context.sent;
						_ref3 = _slicedToArray(_ref2, 3);
						bg = _ref3[0];
						avatar = _ref3[1];
						qrcode = _ref3[2];

						canvas.setBackground(bg);
						avatarConfig = {
							square: true
						};
						avatarConfigImg = {
							x: 110,
							y: 119,
							w: 134,
							h: 134
						};

						canvas.addImg(new _src.ImageCircle(avatar, avatarConfig).getCanvas(), avatarConfig);
						nameConfig = {
							maxWidth: 400,
							fontSize: 32,
							maxLines: 1,
							fontWeight: '400',
							fillStyle: '#111',
							fontFamily: 'sans-serif'
						};
						nameConfigImg = {
							x: 109,
							y: 285
						};

						canvas.addText('Sucong Hou', nameConfig, nameConfigImg);

						titleConfig = {
							maxWidth: 550,
							fontSize: 32,
							lineHeight: 2,
							fontWeight: '500',
							fillStyle: '#111',
							fontFamily: 'sans-serif',
							maxLines: 2
						};
						titleConfigImg = {
							x: 110,
							y: 478
						};

						canvas.addText('#遇见生活#生活方式面面观——大咖采访会', titleConfig, titleConfigImg);

						timeConfig = {
							maxWidth: 550,
							fontSize: 26,
							maxLines: 1,
							fontWeight: '300',
							fillStyle: '#888',
							fontFamily: 'sans-serif'
						};
						timeConfigImg = {
							x: 109,
							y: 624
						};

						canvas.addText('18/06/26 14:30', timeConfig, timeConfigImg);

						canvas.addImg(new _src.ImageClip(qrcode, { padding: 24 }).getCanvas(), {
							x: 110,
							y: 693,
							w: 181,
							h: 181
						});

						intro = '2018北京国际家具展暨智能生活节于6月14-17日在北京·中国国际展览中心（新馆）盛大召开。《今日家具》中文版直播间将以“生活方式面面观”为主题，邀请多位家具行业大咖，共同探讨有关生活方式的诸多话题。';
						introConfig = {
							maxWidth: 540,
							fontSize: 24,
							lineHeight: 2,
							fontWeight: '300',
							fillStyle: '#888',
							fontFamily: 'sans-serif'
						};
						introConfigImg = {
							centerx: true,
							y: 968
						};

						canvas.addText(intro, introConfig, introConfigImg);

						document.body.appendChild(canvas.getImg());

					case 29:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function img1() {
		return _ref.apply(this, arguments);
	};
}();

var img2 = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
		var canvas, qrurl, imgs, _ref5, _ref6, bg, avatar, qrcode, avatarConfig, avatarConfigImg, nameConfig, nameConfigImg, titleConfig, titleConfigImg, timeConfig, timeConfigImg, intro, introConfig, introConfigImg;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						canvas = new _src2.default(750, 1334);
						qrurl = 'http://qrcode.ourwill.cn/png/' + btoa('http://live.tuwenzhibo.com') + '.png?s=6';
						imgs = ['http://cdn.ourwill.cn/static/images/invite2.jpg', 'http://cdn.ourwill.cn/static/images/123.png', qrurl];
						_context2.next = 5;
						return canvas.loadImgByUrl(imgs, true);

					case 5:
						_ref5 = _context2.sent;
						_ref6 = _slicedToArray(_ref5, 3);
						bg = _ref6[0];
						avatar = _ref6[1];
						qrcode = _ref6[2];

						canvas.setBackground(bg);
						avatarConfig = {
							square: true
						};
						avatarConfigImg = {
							centerx: true,
							y: 140,
							w: 134,
							h: 134
						};

						canvas.addImg(new _src.ImageCircle(avatar, avatarConfig).getCanvas(), avatarConfigImg);
						nameConfig = {
							maxWidth: 400,
							fontSize: 32,
							maxLines: 1,
							fontWeight: '400',
							fillStyle: '#111',
							fontFamily: 'sans-serif'
						};
						nameConfigImg = {
							centerx: true,
							y: 305
						};

						canvas.addText('Sucong Hou', nameConfig, nameConfigImg);

						titleConfig = {
							maxWidth: 516,
							fontSize: 32,
							lineHeight: 1.8,
							fontWeight: '500',
							fillStyle: '#111',
							fontFamily: 'sans-serif',
							maxLines: 2,
							lastLineCenter: true
						};
						titleConfigImg = {
							x: 116,
							y: 499
						};

						canvas.addText('#遇见生活#生活方式面面观——大咖采访会', titleConfig, titleConfigImg);

						timeConfig = {
							maxWidth: 200,
							fontSize: 26,
							maxLines: 1,
							fontWeight: '300',
							fillStyle: '#888',
							fontFamily: 'sans-serif'
						};
						timeConfigImg = {
							centerx: true,
							y: 645
						};

						canvas.addText('18/06/26 14:30', timeConfig, timeConfigImg);

						canvas.addImg(new _src.ImageClip(qrcode, { padding: 24 }).getCanvas(), {
							centerx: true,
							y: 714,
							w: 181,
							h: 181
						});

						intro = '2018北京国际家具展暨智能生活节于6月14-17日在北京·中国国际展览中心（新馆）盛大召开。《今日家具》中文版直播间将以“生活方式面面观”为主题，邀请多位家具行业大咖，共同探讨有关生活方式的诸多话题。';
						introConfig = {
							maxWidth: 539,
							fontSize: 24,
							lineHeight: 2,
							fontWeight: '300',
							fillStyle: '#888',
							fontFamily: 'sans-serif',
							lastLineCenter: true
						};
						introConfigImg = {
							x: 108,
							y: 989
						};

						canvas.addText(intro, introConfig, introConfigImg);

						document.body.appendChild(canvas.getImg());

					case 29:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function img2() {
		return _ref4.apply(this, arguments);
	};
}();

var img3 = function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
		var canvas, qrurl, imgs, _ref8, _ref9, bg, avatar, qrcode, avatarConfig, avatarConfigImg, nameConfig, nameConfigImg, titleConfig, titleConfigImg, timeConfig, timeConfigImg, intro, introConfig, introConfigImg;

		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						canvas = new _src2.default(750, 1334);
						qrurl = 'http://qrcode.ourwill.cn/png/' + btoa('http://live.tuwenzhibo.com') + '.png?s=6';
						imgs = ['http://cdn.ourwill.cn/static/images/invite3.jpg', 'http://cdn.ourwill.cn/static/images/123.png', qrurl];
						_context3.next = 5;
						return canvas.loadImgByUrl(imgs, true);

					case 5:
						_ref8 = _context3.sent;
						_ref9 = _slicedToArray(_ref8, 3);
						bg = _ref9[0];
						avatar = _ref9[1];
						qrcode = _ref9[2];

						canvas.setBackground(bg);
						avatarConfig = {
							square: true
						};
						avatarConfigImg = {
							w: 134,
							h: 134,
							centerx: true,
							y: 140
						};

						canvas.addImg(new _src.ImageCircle(avatar, avatarConfig).getCanvas(), avatarConfigImg);
						nameConfig = {
							maxWidth: 400,
							fontSize: 32,
							maxLines: 1,
							fontWeight: '400',
							fillStyle: '#111',
							fontFamily: 'Calibri'
						};
						nameConfigImg = {
							centerx: true,
							y: 306
						};

						canvas.addText('Sucong Hou', nameConfig, nameConfigImg);

						titleConfig = {
							maxWidth: 516,
							fontSize: 32,
							lineHeight: 1.8,
							fontWeight: '500',
							fillStyle: '#111',
							fontFamily: 'sans-serif',
							maxLines: 2,
							lastLineCenter: true
						};
						titleConfigImg = {
							x: 116,
							y: 499
						};

						canvas.addText('#遇见生活#生活方式面面观——大咖采访会', titleConfig, titleConfigImg);

						timeConfig = {
							maxWidth: 200,
							fontSize: 26,
							maxLines: 1,
							fontWeight: '300',
							fillStyle: '#888',
							fontFamily: 'sans-serif'
						};
						timeConfigImg = {
							centerx: true,
							y: 645
						};

						canvas.addText('18/06/26 14:30', timeConfig, timeConfigImg);

						canvas.addImg(new _src.ImageClip(qrcode, { padding: 24 }).getCanvas(), {
							centerx: true,
							y: 714,
							w: 181,
							h: 181
						});

						intro = '2018北京国际家具展暨智能生活节于6月14-17日在北京·中国国际展览中心（新馆）盛大召开。《今日家具》中文版直播间将以“生活方式面面观”为主题，邀请多位家具行业大咖，共同探讨有关生活方式的诸多话题。';
						introConfig = {
							maxWidth: 539,
							fontSize: 26,
							lineHeight: 2,
							fontWeight: '300',
							fillStyle: '#888',
							fontFamily: 'sans-serif',
							lastLineCenter: true
						};
						introConfigImg = {
							centerx: true,
							y: 989
						};

						canvas.addText(intro, introConfig, introConfigImg);

						document.body.appendChild(canvas.getImg());

					case 29:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function img3() {
		return _ref7.apply(this, arguments);
	};
}();

var _src = require('./src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

img3();
},{"./src":6}],14:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55702' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[14,4])
//# sourceMappingURL=/canvas-tool.d66793b4.map