
var assignFunction = function(name) {
	return self[name];
};

{

	let window = assignFunction("window");
	let self = assignFunction("self");
	let document = assignFunction("document");
	let location = assignFunction("location");
	let top = assignFunction("top");
	let parent = assignFunction("parent");
	let frames = assignFunction("frames");
	let opener = assignFunction("opener");

	function Canvas(options) {
		this.canvas = $("canvas#" + options.id)[0];
		this.name = options.id;
		this.width = this.canvas.width;
		this.height = this.canvas.width;
		this.ctx = this.canvas.getContext("2d");
		this.frameSkip = 8;
		this.step = 0;
		this.replay = [];
		this.clear();
	}

	function CanvasGl(options) {
		this.view = document.getElementById("explo-frame-gl");
		this.renderOptions = {
			transparent: !0,
			preserveDrawingBuffer: !0,
			view: this.view,
			autoResize: !0,
			antialias: !1,
			forceFXAA: !1,
			resolution: 1
		};

		this.renderer = new PIXI.WebGLRenderer(420, 420, this.renderOptions);
		this.stage = new PIXI.Container;
		var properties = {
			scale: !0,
			uvs: !0
		};
		this.smokeContainer = new PIXI.ParticleContainer(15e3, properties, 15e3);
		this.smokeContainer.blendMode = PIXI.BLEND_MODES.SCREEN;
		this.stage.addChild(this.smokeContainer);
		this.fireContainer = new PIXI.ParticleContainer(15e3, properties, 15e3);
		this.fireContainer.blendMode = PIXI.BLEND_MODES.SCREEN;
		this.stage.addChild(this.fireContainer);
		this.sparkContainer = new PIXI.ParticleContainer(15e3, properties, 15e3);
		this.sparkContainer.blendMode = PIXI.BLEND_MODES.SCREEN;
		this.stage.addChild(this.sparkContainer);
		this.replayContainer = new PIXI.Sprite;
		this.stage.addChild(this.replayContainer);
		this.name = options.id;
		this.width = this.renderer.width;
		this.height = this.renderer.height;
		this.ctx = this.renderer.context;
		this.frameSkip = 1;
		this.step = 0;
		this.replay = [];
	}

	function Emitter(options) {
		this.canvas = options.canvas;
    this.queue = [];
    this.requestId, this.stopLoop, this.domCounter = $(".particle-count")
	}

	function File() {}

	function Frame(options) {
		this.render = !0, this.index = options.index, this.img = new Image, this.img.src = options.src, $(this.img).addClass("img-frame"), this.html = $('<div class="rendered-frame"><div class="frame-num">' + this.index + '</div><div class="remove frame-visible"><i class="fa fa-eye"></i></div></div>'), this.html.append(this.img), $(".render-output").append(this.html), this.remove = this.html.find(".remove"), this.eye = this.remove.find("i"), this.html.click(function(e) {
			this.render = !this.render, this.render ? (this.eye.addClass("fa-eye"), this.eye.removeClass("fa-eye-slash"), this.remove.removeClass("frame-invisible"), this.remove.addClass("frame-visible")) : (this.eye.removeClass("fa-eye"), this.eye.addClass("fa-eye-slash"), this.remove.removeClass("frame-visible"), this.remove.addClass("frame-invisible"))
		}.bind(this)), this.texture = PIXI.Texture.fromImage(this.img.src)
	}

	function Gradient(options) {
		this.id = options.id, this.container = $(document.createElement("div")), this.container.addClass("gradient-container"), this.checkBox = $(document.createElement("input")), this.checkBox.addClass("checkBox"), this.checkBox.attr("type", "checkbox"), this.picker1 = $(document.createElement("input")), this.picker1.attr("type", "text"), this.picker2 = $(document.createElement("input")), this.picker2.attr("type", "text"), this.picker3 = $(document.createElement("input")), this.picker3.attr("type", "text"), this.picker4 = $(document.createElement("input")), this.picker4.attr("type", "text"), this.canvas = $(document.createElement("canvas")), this.canvas.attr("width", options.width), this.canvas.attr("height", options.height), this.canvas.addClass("gradient"), this.width = options.width, this.height = options.height, this.ctx = this.canvas[0].getContext("2d"), this.gradientMap = [], this.colors = {}, $(this.container).append(this.canvas), $(this.container).append(this.checkBox), $(this.container).append(this.picker1), $(this.container).append(this.picker2), $(this.container).append(this.picker3), $(this.container).append(this.picker4), $(options.id).append(this.container), this.baseTexture
	}

	function Particle(options) {

		if(this.parent = options.parent, this.type = options.type, this.amount = options.amount, this.canvas = options.canvas, this.gradient = options.gradient, this.duration = options.duration + Math.random() * (.5 * options.duration), this.layer = options.layer, this.maxDelay = parseInt(Math.random() * options.maxDelay), this.frequency = options.frequency, this.depth = parseInt(Math.random() * options.depth), this.damping = options.damping, this.rad = options.rad, this.scaleStart = options.scaleStart / 8, this.scaleEnd = options.scaleEnd / 8, this.vStart = parseFloat(Math.random() * options.vStart), this.vPulse = parseFloat(options.vPulse), this.offset = new Vector(options.offset * Math.sin(this.rad), options.offset * Math.cos(this.rad)), this.offsetRange = new Vector(Math.random() * options.offsetRange * Math.sin(this.rad), Math.random() * options.offsetRange * Math.cos(this.rad)), this.position = new Vector(options.x, options.y), this.position.add(this.offset), this.position.add(this.offsetRange), this.v = new Vector(this.vStart * Math.sin(this.rad), this.vStart * Math.cos(this.rad)), this.g = new Vector(0, options.g / 20), this.mass = .5 + .5 * Math.random(), this.g.multiply(this.mass), this.depthCount = 0, this.currentTime = 0, this.hasStarted = !1, this.x = 0, this.y = 0, this.scaleFollow = 0, this.texture = new PIXI.Texture(options.gradient.baseTexture), this.sprite = new PIXI.Sprite(this.texture), this.sprite.anchor = new PIXI.Point(.5, .5), this.scalePoint = new PIXI.Point(1, 1), this.sprite.x = -9999, this.sprite.y = -9999, null != this.parent) {
			var negativeV = this.v.copy();
			negativeV.multiply(this.vPulse), this.parent.pulse(negativeV)
		}
	}

	function Preset(options) {

		this.data = options.data;
		this.icon = options.icon;
		this.text = options.text;
		this.div = $(document.createElement("div"));
		this.div.addClass("preset");

		this.div.html('<img class="icon" src="./res/' + this.icon + '"><div class="label">' + this.text + "</div>"), $(options.container).append(this.div), this.div.click(function() {
			this.doPreset()
		}.bind(this))
	}

	function RangeSlider(options) {
		this.presetDomain = options.value[0], this.presetKey = options.value[1], this.random = options.random, this.checked = "", options.checked && (this.checked = "checked"), this.options = options, this.localStorageId = options.container + options.label, this.rangeSelector = $(document.createElement("div")), this.value = presets[this.presetDomain][this.presetKey];
		var storedValue = localStorage.getItem(this.localStorageId);
		null != storedValue && (this.value = parseFloat(storedValue)), this.rangeSelector.addClass("range-selector"), this.randomCheckBox = "", this.random && (this.randomCheckBox = '<input class="checkbox" type="checkbox" ' + this.checked + ">"), this.rangeSelector.html('<div class="value">' + this.value + '</div><div class="label">' + this.randomCheckBox + options.label + '</div><input checked class="range-slider" type="range" min="' + options.min + '" max="' + options.max + '" step="' + options.step + '" value="' + this.value + '">'), $(options.container).append(this.rangeSelector), this.slider = this.rangeSelector.find(".range-slider"), this.slider.on("input change, change", function(e) {
			var val = $(e.target).val();
			$(e.target).siblings(".value").html(val), this.value = parseFloat(val), localStorage.setItem(this.localStorageId, val), this.dispatchEvent({
				type: "change",
				message: this.value
			})
		}.bind(this)), $(document).ready(function() {
			this.dispatchEvent({
				type: "change",
				message: this.value
			})
		}.bind(this))
	}

	function SeedField(options) {
		this.presetDomain = options.value[0], this.presetKey = options.value[1], this.options = options, this.localStorageId = options.container + options.label, this.rangeSelector = $(document.createElement("div")), this.value = presets[this.presetDomain][this.presetKey];
		var storedValue = localStorage.getItem(this.localStorageId);
		null != storedValue && (this.value = parseFloat(storedValue)), this.rangeSelector.addClass("range-selector"), this.rangeSelector.html('<div class="label"><input class="checkbox" type="checkbox" name="randomize" checked>' + options.label + '</div><input class="range-slider" type="text" value="' + this.value + '">'), $(options.container).append(this.rangeSelector), this.rangeSelector.on("input change, change", function(e) {
			var val = $(e.target).val();
			$(e.target).siblings(".value").html(val), this.value = parseFloat(val), localStorage.setItem(this.localStorageId, val), this.dispatchEvent({
				type: "change",
				message: this.value
			})
		}.bind(this)), $(document).ready(function() {
			this.dispatchEvent({
				type: "change",
				message: this.value
			})
		}.bind(this))
	}

	function Vector(x, y) {
		this.x = x, this.y = y
	}

	function InputOutput(options) {
		this.element = $(document.createElement("div")), this.element.addClass("input-output"), this.label = $(document.createElement("div")), this.label.html("input - output"), this.label.addClass("label"), this.field = $(document.createElement("textArea")), this.buttonInput = $(document.createElement("button")), this.buttonInput.html("input"), this.buttonOutput = $(document.createElement("button")), this.buttonOutput.html("output"), this.buttonClear = $(document.createElement("button")), this.buttonClear.html("clear"), this.element.append(this.label), this.element.append(this.field), this.element.append(this.buttonOutput), this.element.append(this.buttonInput), this.element.append(this.buttonClear), $(options.container).append(this.element), this.buttonInput.click(function(event) {
			this.dispatchEvent({
				type: "INPUT_DATA"
			})
		}.bind(this)), this.buttonOutput.click(function(event) {
			this.dispatchEvent({
				type: "OUTPUT_DATA"
			})
		}.bind(this)), this.buttonClear.click(function(event) {
			this.field.val("")
		}.bind(this))
	}
	Canvas.prototype.clear = function() {
		this.ctx.clearRect(0, 0, this.width, this.height)
	}, Canvas.prototype.createGradient = function(options) {
		var grd = this.ctx.createLinearGradient(0, 0, 170, 0);
		grd.addColorStop(0, options.c1), grd.addColorStop(.25, options.c2), grd.addColorStop(.5, options.c3), grd.addColorStop(1, options.c4), this.ctx.fillStyle = grd, this.ctx.fillRect(0, 0, this.width, this.height), this.gradientMap = [];
		for(var i = 0; i < this.width - 1; i++) {
			var colorData = this.ctx.getImageData(i, 2, 1, 1).data,
				r = ("00" + colorData[0].toString(16)).substr(-2),
				g = ("00" + colorData[1].toString(16)).substr(-2),
				b = ("00" + colorData[2].toString(16)).substr(-2),
				a = colorData[3] / 255;
			this.gradientMap.push({
				r: r,
				g: g,
				b: b,
				a: a
			})
		}
	}, Canvas.prototype.getColorHex = function(percent) {
		var l = this.gradientMap.length - 1;
		return this.gradientMap[parseInt(l * percent)]
	}, Canvas.prototype.getColor = function(percent) {
		var c = this.ctx.getImageData(parseInt((this.width - 1) * percent), 2, 1, 1).data;
		return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] / 255 + ")"
	}, Canvas.prototype.getImage = function() {
		return this.canvas.toDataURL()
	}, Canvas.prototype.clearFrames = function() {
		$(".render-output").html(""), this.replay = []
	}, Canvas.prototype.replayFrames = function(fps) {
		this.numFrames = this.replay.length, this.frame = 0, clearInterval(this.interval), this.interval = setInterval(function() {
			this.playNext()
		}.bind(this), 1e3 / fps)
	}, Canvas.prototype.playNext = function() {
		this.frame >= this.numFrames - 1 && clearInterval(this.interval);
		var img = this.replay[this.frame];
		this.clear(), this.ctx.drawImage(img, 0, 0), this.frame++
	}, Canvas.prototype.addFrame = function() {
		var takeShot = this.step % this.frameSkip;
		if(0 == takeShot) {
			var data = this.getImage(),
				img = new Image;
			img.src = data, $(img).addClass("img-frame");
			var frame = $('<div class="rendered-frame"><div class="frame-num">' + this.step + "</div></div>");
			frame.append(img), $(".render-output").append(frame), this.replay.push(img)
		}
		this.step++
	}, CanvasGl.prototype.addParticle = function(particle) {
		switch(particle.type) {
			case "smoke":
				this.smokeContainer.addChild(particle.sprite);
				break;
			case "fire":
				this.fireContainer.addChild(particle.sprite);
				break;
			case "spark":
				this.sparkContainer.addChild(particle.sprite)
		}
	}, CanvasGl.prototype.removeParticle = function(particle) {
		switch(particle.type) {
			case "smoke":
				this.smokeContainer.removeChild(particle.sprite);
				break;
			case "fire":
				this.fireContainer.removeChild(particle.sprite);
				break;
			case "spark":
				this.sparkContainer.removeChild(particle.sprite)
		}
		particle.sprite.destroy()
	}, CanvasGl.prototype.removeParticles = function() {
		for(var children = this.smokeContainer.children, len = this.smokeContainer.children.length, i = 0; len > i; i++) this.smokeContainer.removeChild(children[0]);
		for(var children = this.fireContainer.children, len = this.fireContainer.children.length, i = 0; len > i; i++) this.fireContainer.removeChild(children[0]);
		for(var children = this.sparkContainer.children, len = this.sparkContainer.children.length, i = 0; len > i; i++) this.sparkContainer.removeChild(children[0]);
		this.render()
	}, CanvasGl.prototype.render = function() {
		this.renderer.render(this.stage)
	}, CanvasGl.prototype.setFrameSkip = function(v) {
		this.frameSkip = v
	}, CanvasGl.prototype.setWidth = function(v) {
		$(this.view).attr("width", v), this.width = v, $(this.view).css("width", v + "px"), this.renderer = new PIXI.WebGLRenderer(this.width, this.height, this.renderOptions), this.ctx = this.renderer.context
	}, CanvasGl.prototype.setHeight = function(v) {
		$(this.view).attr("height", v), this.height = v, $(this.view).css("height", v + "px"), this.renderer = new PIXI.WebGLRenderer(this.width, this.height, this.renderOptions), this.ctx = this.renderer.context
	},
	CanvasGl.prototype.setAbsolutePosition = function(top, left) {
		$(this.view).css("position", 'absolute');
		$(this.view).css("top", top + 'px');
		$(this.view).css("left", left + 'px');
	},
	 CanvasGl.prototype.getImage = function() {
		return this.view.toDataURL()
	}, CanvasGl.prototype.nullTexture = function() {
		clearInterval(this.interval), this.replayContainer.texture = PIXI.Texture.EMPTY, this.render()
	}, CanvasGl.prototype.clearFrames = function() {
		this.nullTexture(), this.step = 0, $(".render-output").html(""), this.replay = []
	}, CanvasGl.prototype.replayFrames = function(fps) {
		this.numFrames = this.replay.length, this.frameNum = 0, clearInterval(this.interval), this.interval = setInterval(function() {
			this.playNext()
		}.bind(this), 1e3 / fps)
	}, CanvasGl.prototype.playNext = function() {
		this.frameNum >= this.numFrames - 1 && (clearInterval(this.interval), this.frameNum = this.numFrames - 1);
		var frame = this.replay[this.frameNum];
		if(!frame.render) return this.frameNum += this.frameSkip, void this.playNext();
		var texture = this.replay[this.frameNum].texture;
		this.replayContainer.texture = texture, this.render(), this.frameNum += this.frameSkip
	}, CanvasGl.prototype.zipImages = function() {
		for(var zip = new JSZip, folder = zip.folder("images"), num = 0, i = 0; i < this.replay.length; i++) {
			var frame = this.replay[i];
			if(frame.render) {
				var src = frame.img.src,
					data = src.substr(src.indexOf(",") + 1),
					index = ("" + (1e4 + num)).substr(1);
				folder.file("explosion" + index + ".png", data, {
					base64: !0
				}), num++
			}
		}
		var content = zip.generate({
			type: "blob"
		});
		return content
	}, CanvasGl.prototype.createGif = function(w, h) {
		for(var images = [], i = 0; i < this.replay.length; i++) {
			var frame = this.replay[i];
			frame.render && images.push(frame.img.src)
		}
		gifshot.createGIF({
			images: images,
			interval: 0,
			gifWidth: w,
			gifHeight: h,
			numWorkers: 10
		}, function(obj) {
			if(!obj.error) {
				var zip = new JSZip,
					src = obj.image,
					data = src.substr(src.indexOf(",") + 1);
				zip.file("explosion-gif.gif", data, {
					base64: !0
				});
				var content = zip.generate({
					type: "blob"
				});
				saveAs(content, "explosion-gif.zip")
			}
		})
	}, CanvasGl.prototype.removeFrame = function(framenum) {
		console.log(framenum)
	}, CanvasGl.prototype.addFrame = function() {
		var options = {
				src: this.getImage(),
				index: this.step
			},
			frame = new Frame(options);
		this.replay.push(frame), this.step++
	}, Emitter.prototype.clear = function() {
		this.queue = [], this.domCounter.html(this.queue.length)
	}, Emitter.prototype.start = function() {
		this.stopLoop = !1, this.loop()
	}, Emitter.prototype.loop = function() {
		if(this.stopLoop) return void this.stop();
		for(var i in this.queue) {
			var particle = this.queue[i];
			particle.update()
		}
		this.domCounter.html(this.queue.length), this.canvas.render(), this.canvas.addFrame(), this.requestId = requestAnimationFrame(this.loop.bind(this))
	}, Emitter.prototype.setIntervalX = function(repetitions) {
		var x = 0,
			intervalID = window.setInterval(function() {
				var particle = this.queue[x];
				particle.update(), ++x === repetitions && (window.clearInterval(intervalID), this.canvas.addFrame(), this.requestId = requestAnimationFrame(this.loop.bind(this)), this.canvas.render(), console.log("repeat done"))
			}.bind(this), 0)
	}, Emitter.prototype.stop = function() {
		cancelAnimationFrame(this.requestId), this.destroyAllParticles()
	}, Emitter.prototype.addParticle = function(particle) {
		this.queue.push(particle)
	}, Emitter.prototype.removeParticle = function(particle) {
		var index = this.queue.indexOf(particle);
		this.queue.splice(index, 1);
		var activeParticles = this.queue.length;
		0 >= activeParticles && (this.stopLoop = !0)
	}, Emitter.prototype.destroyAllParticles = function() {
		this.stopLoop = !0, this.queue = [], this.canvas.render(), this.clear()
	};
	var EventDispatcher = function() {};
	EventDispatcher.prototype = {
		constructor: EventDispatcher,
		apply: function(object) {
			object.addEventListener = EventDispatcher.prototype.addEventListener, object.hasEventListener = EventDispatcher.prototype.hasEventListener, object.removeEventListener = EventDispatcher.prototype.removeEventListener, object.dispatchEvent = EventDispatcher.prototype.dispatchEvent
		},
		addEventListener: function(type, listener) {
			void 0 === this._listeners && (this._listeners = {});
			var listeners = this._listeners;
			void 0 === listeners[type] && (listeners[type] = []), -1 === listeners[type].indexOf(listener) && listeners[type].push(listener)
		},
		hasEventListener: function(type, listener) {
			if(void 0 === this._listeners) return !1;
			var listeners = this._listeners;
			return void 0 !== listeners[type] && -1 !== listeners[type].indexOf(listener) ? !0 : !1
		},
		removeEventListener: function(type, listener) {
			if(void 0 !== this._listeners) {
				var listeners = this._listeners,
					listenerArray = listeners[type];
				if(void 0 !== listenerArray) {
					var index = listenerArray.indexOf(listener); - 1 !== index && listenerArray.splice(index, 1)
				}
			}
		},
		dispatchEvent: function(event) {
			if(void 0 !== this._listeners) {
				var listeners = this._listeners,
					listenerArray = listeners[event.type];
				if(void 0 !== listenerArray) {
					event.target = this;
					for(var array = [], length = listenerArray.length, i = 0; length > i; i++) array[i] = listenerArray[i];
					for(var i = 0; length > i; i++) array[i].call(this, event)
				}
			}
		}
	}, File.SaveToDisk = function(fileUrl, fileName) {
		var hyperlink = document.createElement("a");
		hyperlink.href = fileUrl, hyperlink.target = "_blank", hyperlink.download = fileName || fileUrl, (document.body || document.documentElement).appendChild(hyperlink), hyperlink.onclick = function() {
			(document.body || document.documentElement).removeChild(hyperlink)
		};
		var mouseEvent = new MouseEvent("click", {
			view: window,
			bubbles: !0,
			cancelable: !0
		});
		hyperlink.dispatchEvent(mouseEvent), navigator.mozGetUserMedia || window.URL.revokeObjectURL(hyperlink.href)
	}, Gradient.prototype.set = function(options) {
		this.colors = options, void 0 == this.orgColors && (this.orgColors = JSON.parse(JSON.stringify(this.colors)));
		var storedColors = localStorage.getItem(this.id);
		null != storedColors && (this.colors = JSON.parse(storedColors)), localStorage.setItem(this.id, JSON.stringify(this.colors)), this.createPickers(), this.ctx.clearRect(0, 0, this.width, this.height);
		var c1 = "rgba(" + this.colors.color1.r + "," + this.colors.color1.g + "," + this.colors.color1.b + "," + this.colors.color1.a + ")",
			c2 = "rgba(" + this.colors.color2.r + "," + this.colors.color2.g + "," + this.colors.color2.b + "," + this.colors.color2.a + ")",
			c3 = "rgba(" + this.colors.color3.r + "," + this.colors.color3.g + "," + this.colors.color3.b + "," + this.colors.color3.a + ")",
			c4 = "rgba(" + this.colors.color4.r + "," + this.colors.color4.g + "," + this.colors.color4.b + "," + this.colors.color4.a + ")",
			grd = this.ctx.createLinearGradient(0, 0, 170, 0);
		grd.addColorStop(0, c1), grd.addColorStop(.25, c2), grd.addColorStop(.5, c3), grd.addColorStop(1, c4), this.ctx.fillStyle = grd, this.ctx.fillRect(0, 0, this.width, this.height), this.gradientMap.length = 0;
		for(var i = 0; i < this.width - 1; i++) {
			var colorData = this.ctx.getImageData(i, 2, 1, 1).data,
				r = colorData[0],
				g = colorData[1],
				b = colorData[2],
				a = colorData[3] / 255;
			this.gradientMap.push({
				r: r,
				g: g,
				b: b,
				a: a
			})
		}
		this.baseTexture = this.createBaseTexture()
	}, Gradient.prototype.createPickers = function() {
		this.picker1.spectrum({
			showAlpha: !0,
			color: "rgba(" + this.colors.color1.r + "," + this.colors.color1.g + "," + this.colors.color1.b + "," + this.colors.color1.a + ")",
			change: function(color) {
				this.colors.color1.r = parseInt(color._r), this.colors.color1.g = parseInt(color._g), this.colors.color1.b = parseInt(color._b), this.colors.color1.a = color._a, this.update()
			}.bind(this)
		}), this.picker2.spectrum({
			showAlpha: !0,
			color: "rgba(" + this.colors.color2.r + "," + this.colors.color2.g + "," + this.colors.color2.b + "," + this.colors.color2.a + ")",
			change: function(color) {
				this.colors.color2.r = parseInt(color._r), this.colors.color2.g = parseInt(color._g), this.colors.color2.b = parseInt(color._b), this.colors.color2.a = color._a, this.update()
			}.bind(this)
		}), this.picker3.spectrum({
			showAlpha: !0,
			color: "rgba(" + this.colors.color3.r + "," + this.colors.color3.g + "," + this.colors.color3.b + "," + this.colors.color3.a + ")",
			change: function(color) {
				this.colors.color3.r = parseInt(color._r), this.colors.color3.g = parseInt(color._g), this.colors.color3.b = parseInt(color._b), this.colors.color3.a = color._a, this.update()
			}.bind(this)
		}), this.picker4.spectrum({
			showAlpha: !0,
			color: "rgba(" + this.colors.color4.r + "," + this.colors.color4.g + "," + this.colors.color4.b + "," + this.colors.color4.a + ")",
			change: function(color) {
				this.colors.color4.r = parseInt(color._r), this.colors.color4.g = parseInt(color._g), this.colors.color4.b = parseInt(color._b), this.colors.color4.a = color._a, this.update()
			}.bind(this)
		})
	}, Gradient.prototype.createParticleGradient = function(ctx, px, py, c, rx, ry, size) {
		var grd = ctx.createRadialGradient(16 + 32 * px + rx, 16 + 32 * py + ry, 2, 16 + 32 * px + rx, 16 + 32 * py + ry, size);
		grd.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")"), grd.addColorStop(1, "rgba(0,0,0,0)"), ctx.fillStyle = grd, ctx.fillRect(32 * px, 32 * py, 32 + 32 * px, 32 + 32 * py)
	}, Gradient.prototype.createBaseTexture = function() {
		this.canvasTexture = null, this.canvasTexture = $(document.createElement("canvas")), this.canvasTexture.attr("width", "320"), this.canvasTexture.attr("height", "320");
		var ctx = this.canvasTexture[0].getContext("2d");
		ctx.clearRect(0, 0, 320, 320);
		for(var p = 0; 100 > p; p++) {
			var px = p % 10,
				py = parseInt(p / 10),
				color = this.getColor(p / 100);
			this.createParticleGradient(ctx, px, py, [color.r, color.g, color.b, color.a], 0, 0, 16)
		}
		var texture = PIXI.Texture.fromCanvas(this.canvasTexture[0]);
		return console.log(texture), texture
	}, Gradient.prototype.update = function() {
		localStorage.removeItem(this.id), this.set(this.colors)
	}, Gradient.prototype.reset = function(colors) {
		localStorage.removeItem(this.id), this.colors = JSON.parse(JSON.stringify(this.orgColors)), this.set(this.colors)
	}, Gradient.prototype.getColor = function(percent) {
		var l = this.gradientMap.length - 1;
		return this.gradientMap[parseInt(l * percent)]
	}, Gradient.prototype.getColorObject = function() {
		return this.colors
	}, Gradient.prototype.randomize = function() {
		this.checkBox.is(":checked") && (this.colors.color1.r = parseInt(255 * Math.random()), this.colors.color1.g = parseInt(255 * Math.random()), this.colors.color1.b = parseInt(255 * Math.random()), this.colors.color1.a = Math.random(), this.colors.color2.r = parseInt(255 * Math.random()), this.colors.color2.g = parseInt(255 * Math.random()), this.colors.color2.b = parseInt(255 * Math.random()), this.colors.color2.a = Math.random(), this.colors.color3.r = parseInt(255 * Math.random()), this.colors.color3.g = parseInt(255 * Math.random()), this.colors.color3.b = parseInt(255 * Math.random()), this.colors.color3.a = Math.random(), this.colors.color4.r = parseInt(255 * Math.random()), this.colors.color4.g = parseInt(255 * Math.random()), this.colors.color4.b = parseInt(255 * Math.random()), this.colors.color4.a = 0, this.update())
	}, Gradient.prototype.fromPreset = function(colors) {
		this.colors = colors, this.update()
	}, $(document).ready(function() {
		function emitParticle(type, parentParticle) {
			var options = getParticleOptions(type, parentParticle),
				particle = new Particle(options);
			particle.addEventListener("die", function(event) {
				exploCanvasB.removeParticle(event.target), emitter.removeParticle(event.target)
			}), particle.addEventListener("fire", function(event) {
				emitParticle("fire", event.target)
			}), particle.addEventListener("smoke", function(event) {
				emitParticle("smoke", event.target)
			}), particle.addEventListener("spark", function(event) {
				emitParticle("spark", event.target)
			}), exploCanvasB.addParticle(particle), emitter.addParticle(particle)
		}

		function getRadRange(startRad, radRange) {
			var output = startRad - .5 * radRange + Math.random() * radRange;
			return output
		}

		function getRadians(degrees) {

			var pi = Math.PI;
			return degrees * (pi/180);

		};

		function getParticleOptions(type, parentParticle) {
			var options = {},
				sameType = !0;
			return(null == parentParticle || parentParticle.type != type) && (sameType = !1), options = {
				amount: slider.amount.getValue(),
				parent: parentParticle,
				type: type,
				canvas: exploCanvasB,
				gradient: gradients[type],
				duration: slider[type + "_duration"].getValue(),
				maxDelay: null == parentParticle ? slider[type + "_delay"].getValue() : 1,
				g: slider[type + "_g"].getValue(),
				frequency: {
					fire: void 0 == slider[type + "_fireChance"] ? 0 : slider[type + "_fireChance"].getValue(),
					smoke: slider[type + "_smokeChance"].getValue(),
					spark: slider[type + "_sparkChance"].getValue()
				},
				x: null == parentParticle ? exploCanvasB.width / 2 : parentParticle.x,
				y: null == parentParticle ? exploCanvasB.height / 2 : parentParticle.y,
				damping: slider[type + "_damping"].getValue(),
				depth: sameType ? parentParticle.depth : slider[type + "_depth"].getValue(),
				rad: null == parentParticle ? getRadRange(getRadians(slider[type + "_minAngleDispersion"].getValue()), getRadians(slider[type + "_maxAngleDispersion"].getValue())) : getRadRange(parentParticle.rad, Math.PI / 360 * slider[type + "_branchAngle"].getValue()),
				scaleStart: slider[type + "_scaleStart"].getValue(),
				scaleEnd: slider[type + "_scaleEnd"].getValue(),
				vStart: sameType ? parentParticle.vStart * slider[type + "_vStartBranche"].getValue() : slider[type + "_vStart"].getValue(),
				offset: sameType ? parentParticle.getSize() : slider[type + "_offset"].getValue(),
				offsetRange: sameType ? 0 : slider[type + "_offsetRange"].getValue(),
				vPulse: slider[type + "_vPulse"].getValue()
			}
		}

		function createSliders(type) {
			"fire" == type && (slider.amount = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "start amount",
				min: 1,
				max: 400,
				step: 1,
				value: [type, "amount"]
			}), slider[type + "_delay"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "delay",
				min: 0,
				max: 25,
				step: 1,
				value: [type, "delay"]
			})), slider[type + "_offset"] = new RangeSlider({
				random: !0,
				checked: !1,
				container: ".tab-window#" + type,
				label: "offset",
				min: 1,
				max: 128,
				step: 1,
				value: [type, "offset"]
			}), slider[type + "_offsetRange"] = new RangeSlider({
				random: !0,
				checked: !1,
				container: ".tab-window#" + type,
				label: "offset range",
				min: 0,
				max: 128,
				step: 1,
				value: [type, "offsetRange"]

			}),


			slider[type + "_minAngleDispersion"] = new RangeSlider({
		 	random: !0,
		 	checked: !0,
		 	container: ".tab-window#" + type,
		 	label: "min angle dispersion",
		 	min: 1,
		 	max: 360,
		 	step: 1,
		 	value: [type, "minAngleDispersion"]
		 }),

		 slider[type + "_maxAngleDispersion"] = new RangeSlider({
		 random: !0,
		 checked: !0,
		 container: ".tab-window#" + type,
		 label: "max angle dispersion",
		 min: 1,
		 max: 360,
		 step: 1,
		 value: [type, "maxAngleDispersion"]
		}),

			slider[type + "_vStart"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "v start",
				min: .1,
				max: 2.5,
				step: .1,
				value: [type, "vStart"]
			}), slider[type + "_vStartBranche"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "v start branche multiplier",
				min: 0,
				max: 2,
				step: .05,
				value: [type, "vStartBranche"]
			}), slider[type + "_vPulse"] = new RangeSlider({
				random: !0,
				checked: !1,
				container: ".tab-window#" + type,
				label: "v impulse to parent",
				min: 0,
				max: 2,
				step: .05,
				value: [type, "vPulse"]
			}), slider[type + "_damping"] = new RangeSlider({
				random: !0,
				checked: !1,
				container: ".tab-window#" + type,
				label: "damping",
				min: .9,
				max: 1,
				step: .01,
				value: [type, "damping"]
			}), slider[type + "_scaleStart"] = new RangeSlider({
				random: !0,
				checked: !1,
				container: ".tab-window#" + type,
				label: "scale start",
				min: 0,
				max: 10,
				step: 1,
				value: [type, "scaleStart"]
			}), slider[type + "_scaleEnd"] = new RangeSlider({
				random: !0,
				checked: !1,
				container: ".tab-window#" + type,
				label: "scale end",
				min: 0,
				max: 10,
				step: 1,
				value: [type, "scaleEnd"]
			}), slider[type + "_duration"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "duration",
				min: 5,
				max: 80,
				step: 1,
				value: [type, "duration"]
			}), slider[type + "_branchAngle"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "branch angle",
				min: 0,
				max: 360,
				step: 1,
				value: [type, "branchAngle"]
			}), slider[type + "_g"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "gravity",
				min: -1,
				max: 1,
				step: .1,
				value: [type, "g"]
			}), slider[type + "_depth"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "branch depth",
				min: 0,
				max: 10,
				step: 1,
				value: [type, "depth"]
			}), "fire" == type && (slider[type + "_fireChance"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "fire chance",
				min: 0,
				max: 25,
				step: 1,
				value: [type, "fireChance"]
			})), slider[type + "_smokeChance"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "smoke chance",
				min: 0,
				max: 25,
				step: 1,
				value: [type, "smokeChance"]
			}), slider[type + "_sparkChance"] = new RangeSlider({
				random: !0,
				checked: !0,
				container: ".tab-window#" + type,
				label: "spark chance",
				min: 0,
				max: 25,
				step: 1,
				value: [type, "sparkChance"]
			})
		}

		function emitStart() {
			emitter.stop(), Math.seedrandom(slider.randomSeed.getValue()), exploCanvasB.removeParticles(), exploCanvasB.clearFrames();
			for(var i = 0; i < slider.amount.getValue(); i++) emitParticle("fire", null);
			emitter.start()
		}

		function sendTweet() {
			var text = encodeURIComponent($(".twitter-text").val());
			twitterTextBox.toggleClass("twitter-text-box-show");
			var url = "https://web.archive.org/web/20190618032755/https://twitter.com/intent/tweet?original_referer=http://www.explosiongenerator.com&text=" + text;
			window.open(url, "_blank")
		}

		function addPreset(options) {
			var preset = new Preset(options);
			preset.addEventListener("DO_PRESET", function(event) {
				$(".preset").removeClass("preset-active"), setPresetData(event.message)
			})
		}

		function setPresetData(data) {
			presets = data;
			for(var s in slider) slider[s].resetValue();
			gradients.fire.fromPreset(data.fire.colors), gradients.smoke.fromPreset(data.smoke.colors), gradients.spark.fromPreset(data.spark.colors)
		}
		var debug = !1;
		debug || $("button#output").css("display", "none"), presets = {
			global: {
				randomSeed: 99113,
				replayFps: 40,
				replaySkip: 1,
				canvasWidth: 420,
				canvasHeight: 420,
				blur: 1
			},
			fire: {
				amount: 97,
				delay: 11,
				offset: 1,
				offsetRange: 0,

				minAngleDispersion: 0,
				maxAngleDispersion: 360,

				vStart: "1.20",
				vStartBranche: "0.70",
				vPulse: 0,
				damping: .99,

				scaleStart: "7.00",
				scaleEnd: "0.00",
				duration: "54.00",
				branchAngle: "220.00",
				g: "0.30",
				depth: "9.00",
				fireChance: "21.00",
				smokeChance: "23.00",
				sparkChance: "3.00",
				colors: {
					color1: {
						r: 255,
						g: 255,
						b: 0,
						a: .5
					},
					color2: {
						r: 255,
						g: 0,
						b: 0,
						a: .5
					},
					color3: {
						r: 255,
						g: 0,
						b: 0,
						a: .5
					},
					color4: {
						r: 0,
						g: 0,
						b: 0,
						a: .2
					}
				}
			},
			smoke: {
				offset: 1,
				offsetRange: 1,
				vStart: .6,
				vStartBranche: "1.60",
				vPulse: 0,
				damping: .99,
				scaleStart: 5,
				scaleEnd: 5,
				duration: "76.00",
				branchAngle: "221.00",
				g: "-0.20",
				depth: "1.00",
				smokeChance: "17.00",
				sparkChance: "10.00",
				colors: {
					color1: {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					},
					color2: {
						r: 100,
						g: 100,
						b: 100,
						a: .8
					},
					color3: {
						r: 0,
						g: 0,
						b: 0,
						a: .6
					},
					color4: {
						r: 0,
						g: 0,
						b: 0,
						a: .1
					}
				}
			},
			spark: {
				offset: 1,
				offsetRange: 1,
				vStart: "1.60",
				vStartBranche: "1.30",
				vPulse: 0,
				damping: .98,
				scaleStart: 2,
				scaleEnd: 4,
				duration: "59.00",
				branchAngle: "261.00",
				g: "0.30",
				depth: "6.00",
				smokeChance: "20.00",
				sparkChance: "2.00",
				colors: {
					color1: {
						r: 255,
						g: 255,
						b: 255,
						a: .8
					},
					color2: {
						r: 255,
						g: 0,
						b: 0,
						a: .7
					},
					color3: {
						r: 50,
						g: 100,
						b: 50,
						a: .6
					},
					color4: {
						r: 0,
						g: 0,
						b: 0,
						a: .2
					}
				}
			}
		}, presetsOut = {};
		var gradients = [];
		gradients.fire = new Gradient({
			id: ".tab-window#fire",
			width: 192,
			height: 10
		}), gradients.fire.set(presets.fire.colors), gradients.smoke = new Gradient({
			id: ".tab-window#smoke",
			width: 192,
			height: 10
		}), gradients.smoke.set(presets.smoke.colors), gradients.spark = new Gradient({
			id: ".tab-window#spark",
			width: 192,
			height: 10
		}), gradients.spark.set(presets.spark.colors);
		var exploCanvasB = new CanvasGl({
				id: "explo-frame-gl"
			}),
			emitter = new Emitter({
				canvas: exploCanvasB
			}),
			slider = [];
		slider.randomSeed = new SeedField({
			container: ".tab-window#config",
			label: "random seed (also @ start render)",
			min: 0,
			max: 500,
			step: 1,
			value: ["global", "randomSeed"]
		}), slider.replay_fps = new RangeSlider({
			random: !1,
			container: ".tab-window#config",
			label: "replay fps",
			min: 1,
			max: 60,
			step: 1,
			value: ["global", "replayFps"]
		}), slider.replay_skip = new RangeSlider({
			random: !1,
			container: ".tab-window#config",
			label: "replay skip frames",
			min: 1,
			max: 10,
			step: 1,
			value: ["global", "replaySkip"]
		}), slider.replay_skip.addEventListener("change", function(event) {
			exploCanvasB.setFrameSkip(parseInt(event.message))
		}), slider.canvas_width = new RangeSlider({
			random: !1,
			container: ".tab-window#config",
			label: "canvas width",
			min: 32,
			max: 512,
			step: 32,
			value: ["global", "canvasWidth"]
		}), slider.canvas_width.addEventListener("change", function(event) {
			exploCanvasB.setWidth(parseInt(event.message));
			exploCanvasB.setAbsolutePosition(15, 280);
		}), slider.canvas_height = new RangeSlider({
			random: !1,
			container: ".tab-window#config",
			label: "canvas height",
			min: 32,
			max: 512,
			step: 32,
			value: ["global", "canvasHeight"]
		}), slider.canvas_height.addEventListener("change", function(event) {
			exploCanvasB.setHeight(parseInt(event.message))
		});
		var io = new InputOutput({
			container: ".tab-window#io"
		});
		io.addEventListener("INPUT_DATA", function(event) {
			var target = event.target,
				data = target.getData();
			setPresetData(JSON.parse(data))
		}), io.addEventListener("OUTPUT_DATA", function(event) {
			var target = event.target;
			emitter.stop();
			for(var s in slider) slider[s].outputPreset();
			presetsOut.fire.colors = gradients.fire.getColorObject(), presetsOut.smoke.colors = gradients.smoke.getColorObject(), presetsOut.spark.colors = gradients.spark.getColorObject();
			var output = JSON.stringify(presetsOut);
			target.setData(output)
		}), createSliders("fire"), createSliders("smoke"), createSliders("spark"), $("button#randomize").click(function() {
			for(var s in slider) slider[s].randomizeValue();
			gradients.fire.randomize(), gradients.smoke.randomize(), gradients.spark.randomize(), emitStart()
		}), $("button#start").click(function() {
			slider.randomSeed.randomizeValue(), emitStart()
		}), $("button#stop").click(function() {
			exploCanvasB.nullTexture(), exploCanvasB.removeParticles(), emitter.stop()
		}), $("button#replay").click(function() {
			exploCanvasB.nullTexture(), exploCanvasB.removeParticles(), emitter.stop(), exploCanvasB.replayFrames(slider.replay_fps.getValue());
		}), $("button#save").click(function() {
			emitter.stop();
			var zip = exploCanvasB.zipImages();
			saveAs(zip, "explosion-images.zip")
		}), $("button#makeGif").click(function() {
			emitter.stop(), exploCanvasB.createGif(parseInt(slider.canvas_width.getValue()), parseInt(slider.canvas_height.getValue()))
		}), $("button#reset").click(function() {
			exploCanvasB.removeParticles(), emitter.stop();
			for(var s in slider) slider[s].resetValue();
			for(var g in gradients) gradients[g].reset()
		}), $(".tab-title").click(function() {
			$(".tab-title").removeClass("tab-title-active"), $(this).addClass("tab-title-active");
			var titleId = $(this).attr("id");
			$(".tab-window").removeClass("tab-window-active"), $(".tab-window#" + titleId).addClass("tab-window-active")
		}), $("select#blend").on("change", function(e) {
			var mode = $(this).val();
			Particle.BLEND_MODE = mode
		});
		var popover = $(".popover");
		$(".question-mark").click(function() {
			popover.css("display", "block")
		});
		var popoverclose = $(".pop-close");
		popoverclose.click(function() {
			popover.css("display", "none")
		});
		var tutorialButton = $(".button-red");
		tutorialButton.click(function() {
			window.open("tutorial/", "_blank")
		});
		var twitterButton = $(".twitter-button"),
			twitterTextBox = $(".twitter-text-box"),
			twitterSend = $(".twitter-send");
		twitterButton.click(function() {
			twitterTextBox.toggleClass("twitter-text-box-show")
		}), twitterSend.click(function() {
			sendTweet()
		}), addPreset({
			container: ".tab-window#presets",
			text: "BIG EXPLOSION",
			icon: "bigExplosion.png",
			data: {
				global: {
					randomSeed: 228,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
					blur: 1
				},
				fire: {
					amount: 400,
					delay: 11,
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,

					vStart: .8,
					vStartBranche: 1.45,
					vPulse: 0,
					damping: .99,
					scaleStart: 4,
					scaleEnd: 10,
					duration: 48,
					branchAngle: 0,
					g: .1,
					depth: 10,
					fireChance: 13,
					smokeChance: 12,
					sparkChance: 5,
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 0,
							a: .5
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color3: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: .5,
					vStartBranche: .6,
					vPulse: 0,
					damping: .99,
					scaleStart: 4,
					scaleEnd: 1,
					duration: 66,
					branchAngle: 360,
					g: -.7,
					depth: 0,
					smokeChance: 25,
					sparkChance: 0,
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 100,
							g: 100,
							b: 100,
							a: .8
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: 1.7,
					vStartBranche: 0,
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: 29,
					branchAngle: 145,
					g: .7,
					depth: 5,
					smokeChance: 0,
					sparkChance: 13,
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .7
						},
						color3: {
							r: 50,
							g: 100,
							b: 50,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "SOFT EXPLOSION",
			icon: "softExplosion.png",
			data: {
				global: {
					randomSeed: 99113,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
					blur: 1
				},
				fire: {
					amount: 97,
					delay: 11,
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: "1.20",
					vStartBranche: "0.70",
					vPulse: 0,
					damping: .99,
					scaleStart: "7.00",
					scaleEnd: "0.00",
					duration: "54.00",
					branchAngle: "220.00",
					g: "0.30",
					depth: "9.00",
					fireChance: "21.00",
					smokeChance: "23.00",
					sparkChance: "3.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 0,
							a: .5
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color3: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: .6,
					vStartBranche: "1.60",
					vPulse: 0,
					damping: .99,
					scaleStart: 5,
					scaleEnd: 5,
					duration: "76.00",
					branchAngle: "221.00",
					g: "-0.20",
					depth: "1.00",
					smokeChance: "17.00",
					sparkChance: "10.00",
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 100,
							g: 100,
							b: 100,
							a: .8
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.60",
					vStartBranche: "1.30",
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: "59.00",
					branchAngle: "261.00",
					g: "0.30",
					depth: "6.00",
					smokeChance: "20.00",
					sparkChance: "2.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .7
						},
						color3: {
							r: 50,
							g: 100,
							b: 50,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "SPARK CRACKER",
			icon: "sparksCracker.png",
			data: {
				global: {
					randomSeed: 95797,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: "256.00",
					delay: "21.00",
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: "2.20",
					vStartBranche: "0.40",
					vPulse: 0,
					damping: .99,
					scaleStart: 7,
					scaleEnd: 0,
					duration: "54.00",
					branchAngle: "276.00",
					g: "0.40",
					depth: "9.00",
					fireChance: "8.00",
					smokeChance: "8.00",
					sparkChance: "23.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 0,
							a: .5
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color3: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.70",
					vStartBranche: "0.80",
					vPulse: 0,
					damping: .99,
					scaleStart: 5,
					scaleEnd: 5,
					duration: "33.00",
					branchAngle: "63.00",
					g: "0.30",
					depth: "4.00",
					smokeChance: "17.00",
					sparkChance: "20.00",
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 100,
							g: 100,
							b: 100,
							a: .8
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.90",
					vStartBranche: "0.05",
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: "45.00",
					branchAngle: "283.00",
					g: "-0.30",
					depth: "0.00",
					smokeChance: "16.00",
					sparkChance: "21.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .7
						},
						color3: {
							r: 50,
							g: 100,
							b: 50,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "DANDELION",
			icon: "dandelion.png",
			data: {
				global: {
					randomSeed: 41545,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: 365,
					delay: 9,
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: 1.2,
					vStartBranche: .8,
					vPulse: 0,
					damping: .99,
					scaleStart: 7,
					scaleEnd: 0,
					duration: "54.00",
					branchAngle: 268,
					g: 0,
					depth: "9.00",
					fireChance: "8.00",
					smokeChance: "8.00",
					sparkChance: 25,
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 0,
							a: .5
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color3: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: .1,
					vStartBranche: 0,
					vPulse: 0,
					damping: .99,
					scaleStart: 5,
					scaleEnd: 5,
					duration: "33.00",
					branchAngle: 258,
					g: "0.30",
					depth: "4.00",
					smokeChance: 0,
					sparkChance: 25,
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 100,
							g: 100,
							b: 100,
							a: .8
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 8,
					offsetRange: 0,
					vStart: "1.90",
					vStartBranche: "0.05",
					vPulse: 0,
					damping: .99,
					scaleStart: 2,
					scaleEnd: 4,
					duration: "45.00",
					branchAngle: 0,
					g: "-0.30",
					depth: 6,
					smokeChance: 0,
					sparkChance: 25,
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .7
						},
						color3: {
							r: 255,
							g: 245,
							b: 0,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "SMOKE BOMB",
			icon: "smokeBomb.png",
			data: {
				global: {
					randomSeed: 27062,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: 76,
					delay: 7,
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: "1.20",
					vStartBranche: "0.70",
					vPulse: 0,
					damping: .99,
					scaleStart: "7.00",
					scaleEnd: "0.00",
					duration: "54.00",
					branchAngle: "220.00",
					g: "0.30",
					depth: 10,
					fireChance: 9,
					smokeChance: "23.00",
					sparkChance: "3.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 0,
							a: .5
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color3: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 15,
					vStart: .2,
					vStartBranche: .45,
					vPulse: 0,
					damping: .99,
					scaleStart: 5,
					scaleEnd: 5,
					duration: 30,
					branchAngle: "221.00",
					g: 0,
					depth: 10,
					smokeChance: 19,
					sparkChance: 8,
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 141,
							g: 139,
							b: 139,
							a: .47
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .22
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: .6,
					vStartBranche: .7,
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: 33,
					branchAngle: "261.00",
					g: -.1,
					depth: 2,
					smokeChance: 1,
					sparkChance: 0,
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 0,
							g: 0,
							b: 0,
							a: .39
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "PURPLE DUST",
			icon: "dusty.png",
			data: {
				global: {
					randomSeed: 62988,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: "139.00",
					delay: "17.00",
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: "1.10",
					vStartBranche: "0.60",
					vPulse: 0,
					damping: .99,
					scaleStart: 4,
					scaleEnd: 10,
					duration: "61.00",
					branchAngle: "61.00",
					g: "-0.70",
					depth: "3.00",
					fireChance: "15.00",
					smokeChance: "15.00",
					sparkChance: "22.00",
					colors: {
						color1: {
							r: 118,
							g: 92,
							b: 49,
							a: .9960310204485149
						},
						color2: {
							r: 189,
							g: 111,
							b: 201,
							a: .8405128399903851
						},
						color3: {
							r: 132,
							g: 146,
							b: 209,
							a: .4330582988916046
						},
						color4: {
							r: 167,
							g: 179,
							b: 31,
							a: 0
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.40",
					vStartBranche: "1.45",
					vPulse: 0,
					damping: .99,
					scaleStart: 4,
					scaleEnd: 1,
					duration: "22.00",
					branchAngle: "133.00",
					g: "-0.40",
					depth: "8.00",
					smokeChance: "7.00",
					sparkChance: "7.00",
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 99,
							g: 99,
							b: 99,
							a: .41
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .33
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: "0.30",
					vStartBranche: "0.10",
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: "30.00",
					branchAngle: "69.00",
					g: "-0.60",
					depth: "0.00",
					smokeChance: "10.00",
					sparkChance: "7.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .7
						},
						color3: {
							r: 50,
							g: 100,
							b: 50,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "HALO RING",
			icon: "haloRing.png",
			data: {
				global: {
					randomSeed: 96659,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: 296,
					delay: "8.00",
					offset: 22,
					offsetRange: 12,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: 1.3,
					vStartBranche: "0.50",
					vPulse: 0,
					damping: 1,
					scaleStart: 6,
					scaleEnd: 4,
					duration: 78,
					branchAngle: "227.00",
					g: "0.20",
					depth: "3.00",
					fireChance: "7.00",
					smokeChance: "9.00",
					sparkChance: "24.00",
					colors: {
						color1: {
							r: 35,
							g: 181,
							b: 214,
							a: .6834092599778232
						},
						color2: {
							r: 192,
							g: 205,
							b: 206,
							a: .44570408256328686
						},
						color3: {
							r: 23,
							g: 252,
							b: 188,
							a: .24635190961899142
						},
						color4: {
							r: 130,
							g: 21,
							b: 67,
							a: 0
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: "0.10",
					vStartBranche: "0.65",
					vPulse: 0,
					damping: .99,
					scaleStart: 4,
					scaleEnd: 1,
					duration: "68.00",
					branchAngle: "35.00",
					g: "0.10",
					depth: "2.00",
					smokeChance: "6.00",
					sparkChance: "2.00",
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 99,
							g: 99,
							b: 99,
							a: .41
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .33
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.10",
					vStartBranche: "0.60",
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: "14.00",
					branchAngle: "2.00",
					g: "-0.50",
					depth: "8.00",
					smokeChance: "14.00",
					sparkChance: "16.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .7
						},
						color3: {
							r: 50,
							g: 100,
							b: 50,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "TOXIC WASTE",
			icon: "toxicWaste.png",
			data: {
				global: {
					randomSeed: 78877,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: "358.00",
					delay: "7.00",
					offset: 1,
					offsetRange: 14,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: .8,
					vStartBranche: "0.15",
					vPulse: 0,
					damping: 1,
					scaleStart: 6,
					scaleEnd: 4,
					duration: "42.00",
					branchAngle: "5.00",
					g: "-0.10",
					depth: "4.00",
					fireChance: "8.00",
					smokeChance: "0.00",
					sparkChance: "15.00",
					colors: {
						color1: {
							r: 18,
							g: 129,
							b: 223,
							a: .7629614358580167
						},
						color2: {
							r: 28,
							g: 101,
							b: 171,
							a: .12004580769043145
						},
						color3: {
							r: 178,
							g: 254,
							b: 26,
							a: .8431345194344736
						},
						color4: {
							r: 242,
							g: 184,
							b: 125,
							a: 0
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: .7,
					vStartBranche: .5,
					vPulse: 0,
					damping: .99,
					scaleStart: 4,
					scaleEnd: 1,
					duration: "65.00",
					branchAngle: "359.00",
					g: "-0.10",
					depth: "5.00",
					smokeChance: "23.00",
					sparkChance: "3.00",
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 99,
							g: 99,
							b: 99,
							a: .41
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .33
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.30",
					vStartBranche: "0.20",
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: "13.00",
					branchAngle: "44.00",
					g: "-0.30",
					depth: "3.00",
					smokeChance: "11.00",
					sparkChance: "16.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 0,
							g: 255,
							b: 1,
							a: .7
						},
						color3: {
							r: 50,
							g: 100,
							b: 50,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "PLASMA BURST",
			icon: "plasmaBurst.png",
			data: {
				global: {
					randomSeed: 66715,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: 72,
					delay: 22,
					offset: 1,
					offsetRange: 12,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: 1.3,
					vStartBranche: .5,
					vPulse: 0,
					damping: .9,
					scaleStart: 3,
					scaleEnd: 6,
					duration: 29,
					branchAngle: 360,
					g: -.3,
					depth: 10,
					fireChance: 25,
					smokeChance: 14,
					sparkChance: 0,
					colors: {
						color1: {
							r: 166,
							g: 197,
							b: 44,
							a: .6219628911111936
						},
						color2: {
							r: 8,
							g: 251,
							b: 185,
							a: .82
						},
						color3: {
							r: 20,
							g: 124,
							b: 240,
							a: .86
						},
						color4: {
							r: 150,
							g: 53,
							b: 191,
							a: 0
						}
					}
				},
				smoke: {
					offset: 8,
					offsetRange: 1,
					vStart: 1.7,
					vStartBranche: .75,
					vPulse: 0,
					damping: .9,
					scaleStart: 4,
					scaleEnd: 6,
					duration: 28,
					branchAngle: 35,
					g: .1,
					depth: 2,
					smokeChance: 9,
					sparkChance: 21,
					colors: {
						color1: {
							r: 38,
							g: 214,
							b: 117,
							a: .09
						},
						color2: {
							r: 0,
							g: 255,
							b: 63,
							a: .3
						},
						color3: {
							r: 222,
							g: 255,
							b: 0,
							a: 1
						},
						color4: {
							r: 19,
							g: 143,
							b: 180,
							a: 0
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: 1.1,
					vStartBranche: .6,
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: 14,
					branchAngle: 0,
					g: 0,
					depth: 8,
					smokeChance: 0,
					sparkChance: 0,
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: 0
						},
						color2: {
							r: 0,
							g: 220,
							b: 255,
							a: .53
						},
						color3: {
							r: 255,
							g: 255,
							b: 255,
							a: .61
						},
						color4: {
							r: 255,
							g: 255,
							b: 255,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "SPLIT SECOND",
			icon: "splitSecond.png",
			data: {
				global: {
					randomSeed: 54790,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: 372,
					delay: 0,
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: 2.5,
					vStartBranche: 1.05,
					vPulse: 0,
					damping: .99,
					scaleStart: 5,
					scaleEnd: 6,
					duration: 12,
					branchAngle: "15.00",
					g: -.5,
					depth: 10,
					fireChance: "24.00",
					smokeChance: "1.00",
					sparkChance: "22.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 0,
							a: .5
						},
						color2: {
							r: 254,
							g: 255,
							b: 0,
							a: .5
						},
						color3: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.30",
					vStartBranche: "0.45",
					vPulse: 0,
					damping: .99,
					scaleStart: 2,
					scaleEnd: 3,
					duration: "51.00",
					branchAngle: "178.00",
					g: "0.30",
					depth: "3.00",
					smokeChance: "9.00",
					sparkChance: "0.00",
					colors: {
						color1: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						color2: {
							r: 100,
							g: 100,
							b: 100,
							a: .8
						},
						color3: {
							r: 0,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 1,
					offsetRange: 1,
					vStart: "1.30",
					vStartBranche: "0.70",
					vPulse: 0,
					damping: .98,
					scaleStart: 2,
					scaleEnd: 4,
					duration: "18.00",
					branchAngle: "153.00",
					g: "0.30",
					depth: "0.00",
					smokeChance: "2.00",
					sparkChance: "23.00",
					colors: {
						color1: {
							r: 255,
							g: 255,
							b: 255,
							a: .8
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: .7
						},
						color3: {
							r: 50,
							g: 100,
							b: 50,
							a: .6
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: .2
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "BLOOD STAINS",
			icon: "bloodStains.png",
			data: {
				global: {
					randomSeed: 83030,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: 296,
					delay: 5,
					offset: 1,
					offsetRange: 4,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: 2.5,
					vStartBranche: 1.15,
					vPulse: 0,
					damping: 1,
					scaleStart: 4,
					scaleEnd: 3,
					duration: 7,
					branchAngle: 0,
					g: 0,
					depth: 10,
					fireChance: 25,
					smokeChance: 22,
					sparkChance: 6,
					colors: {
						color1: {
							r: 255,
							g: 0,
							b: 0,
							a: .5
						},
						color2: {
							r: 255,
							g: 0,
							b: 0,
							a: 1
						},
						color3: {
							r: 255,
							g: 0,
							b: 0,
							a: 1
						},
						color4: {
							r: 255,
							g: 0,
							b: 0,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: 1.7,
					vStartBranche: .45,
					vPulse: 2,
					damping: 1,
					scaleStart: 2,
					scaleEnd: 1,
					duration: 8,
					branchAngle: "229.00",
					g: 0,
					depth: 10,
					smokeChance: 25,
					sparkChance: 11,
					colors: {
						color1: {
							r: 255,
							g: 0,
							b: 0,
							a: .58
						},
						color2: {
							r: 150,
							g: 0,
							b: 0,
							a: .8
						},
						color3: {
							r: 199,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 255,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 14,
					offsetRange: 0,
					vStart: .5,
					vStartBranche: 2,
					vPulse: 0,
					damping: 1,
					scaleStart: 1,
					scaleEnd: 1,
					duration: 12,
					branchAngle: 0,
					g: 0,
					depth: 2,
					smokeChance: 0,
					sparkChance: 25,
					colors: {
						color1: {
							r: 130,
							g: 129,
							b: 129,
							a: 1
						},
						color2: {
							r: 134,
							g: 0,
							b: 0,
							a: 1
						},
						color3: {
							r: 148,
							g: 0,
							b: 0,
							a: .77
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						}
					}
				}
			}
		}), addPreset({
			container: ".tab-window#presets",
			text: "BASIC",
			icon: "basic.png",
			data: {
				global: {
					randomSeed: 74177,
					replayFps: 40,
					replaySkip: 1,
					canvasWidth: 420,
					canvasHeight: 420,
				},
				fire: {
					amount: 400,
					delay: 0,
					offset: 1,
					offsetRange: 0,

					minAngleDispersion: 0,
					maxAngleDispersion: 360,


					vStart: 2.5,
					vStartBranche: 1,
					vPulse: 0,
					damping: 1,
					scaleStart: 3,
					scaleEnd: 3,
					duration: 9,
					branchAngle: 0,
					g: 0,
					depth: 10,
					fireChance: 25,
					smokeChance: 0,
					sparkChance: 0,
					colors: {
						color1: {
							r: 254,
							g: 255,
							b: 0,
							a: .15
						},
						color2: {
							r: 255,
							g: 234,
							b: 0,
							a: .75
						},
						color3: {
							r: 233,
							g: 21,
							b: 21,
							a: 1
						},
						color4: {
							r: 1,
							g: 1,
							b: 1,
							a: .2
						}
					}
				},
				smoke: {
					offset: 1,
					offsetRange: 1,
					vStart: 1.7,
					vStartBranche: .45,
					vPulse: 2,
					damping: 1,
					scaleStart: 2,
					scaleEnd: 1,
					duration: 8,
					branchAngle: "229.00",
					g: 0,
					depth: 10,
					smokeChance: 25,
					sparkChance: 11,
					colors: {
						color1: {
							r: 255,
							g: 0,
							b: 0,
							a: .58
						},
						color2: {
							r: 150,
							g: 0,
							b: 0,
							a: .8
						},
						color3: {
							r: 199,
							g: 0,
							b: 0,
							a: .6
						},
						color4: {
							r: 255,
							g: 0,
							b: 0,
							a: .1
						}
					}
				},
				spark: {
					offset: 14,
					offsetRange: 0,
					vStart: .5,
					vStartBranche: 2,
					vPulse: 0,
					damping: 1,
					scaleStart: 1,
					scaleEnd: 1,
					duration: 12,
					branchAngle: 0,
					g: 0,
					depth: 2,
					smokeChance: 0,
					sparkChance: 25,
					colors: {
						color1: {
							r: 130,
							g: 129,
							b: 129,
							a: 1
						},
						color2: {
							r: 134,
							g: 0,
							b: 0,
							a: 1
						},
						color3: {
							r: 148,
							g: 0,
							b: 0,
							a: .77
						},
						color4: {
							r: 0,
							g: 0,
							b: 0,
							a: 0
						}
					}
				}
			}
		});
		var confirmOnPageExit = function(e) {
			e = e || window.event;
			var message = "message";
			return e && (e.returnValue = message), message
		};
		window.onbeforeunload = confirmOnPageExit
	}), EventDispatcher.prototype.apply(Particle.prototype), Particle.prototype.update = function() {
		if(this.maxDelay--, this.maxDelay <= 0 && !this.hasStarted && (this.hasStarted = !0, null != this.parent && (this.x = parent.x, this.y = parent.y)), this.hasStarted) {
			var percent = this.currentTime / this.duration,
				color = this.gradient.getColor(percent);
			"0x" + color.r + color.g + color.b;
			if(this.g.multiply(this.damping), this.v.add(this.g), this.v.multiply(this.damping), this.position.add(this.v), this.x = this.position.x, this.y = this.position.y, 0 == this.v.length ? this.rad = 2 * Math.PI * Math.random() : this.rad = Math.atan2(this.v.x, this.v.y), this.sprite.x = this.x, this.sprite.y = this.y, this.scale = this.scaleStart - (this.scaleStart - this.scaleEnd) * percent, null !== this.parent ? this.scaleFollow -= .5 * (this.scaleFollow - this.scale) : this.scaleFollow = this.scale, this.fp = parseInt(100 * percent), this.px = this.fp % 10 * 32, this.py = 32 * parseInt(this.fp / 10), this.sprite.texture.frame = new PIXI.Rectangle(this.px, this.py, 32, 32), this.scalePoint.x = this.scaleFollow, this.scalePoint.y = this.scaleFollow, this.sprite.scale = this.scalePoint, this.currentTime++, this.currentTime >= this.duration && (this.die(), this.currentTime = this.duration), this.depthCount < this.depth && percent > .25 && .75 > percent) {
				var fireChance = this.amount * (this.frequency.fire / 100),
					smokeChance = this.amount * (this.frequency.smoke / 100),
					sparkChance = this.amount * (this.frequency.spark / 100);
				Math.random() * this.amount < fireChance && 0 != this.frequency.fire && (this.fire(), this.depthCount++), Math.random() * this.amount < smokeChance && 0 != this.frequency.smoke && (this.smoke(), this.depthCount++), Math.random() * this.amount < sparkChance && 0 != this.frequency.spark && (this.spark(), this.depthCount++)
			}
		}
	}, Particle.prototype.pulse = function(vector) {
		var m = vector.copy();
		m.multiply(-this.vPulse), this.v.add(m)
	}, Particle.prototype.getSize = function() {
		return 8 * this.scale
	}, Particle.prototype.die = function() {
		this.dispatchEvent({
			type: "die"
		})
	}, Particle.prototype.smoke = function() {
		this.dispatchEvent({
			type: "smoke"
		})
	}, Particle.prototype.spark = function() {
		this.dispatchEvent({
			type: "spark"
		})
	}, Particle.prototype.fire = function() {
		this.dispatchEvent({
			type: "fire"
		})
	}, EventDispatcher.prototype.apply(Preset.prototype), Preset.prototype.doPreset = function() {
		this.dispatchEvent({
			type: "DO_PRESET",
			message: this.data
		}), this.div.addClass("preset-active")
	}, EventDispatcher.prototype.apply(RangeSlider.prototype), RangeSlider.prototype.getValue = function(percentageOf) {
		return(null == percentageOf || void 0 == percentageOf) && (percentageOf = 1), this.value * percentageOf
	}, RangeSlider.prototype.update = function() {
		this.dispatchEvent({
			type: "change",
			message: this.value
		})
	}, RangeSlider.prototype.resetValue = function() {
		this.value = presets[this.presetDomain][this.presetKey], this.rangeSelector.find(".range-slider").val(this.value), this.rangeSelector.find(".value").html(this.value), localStorage.setItem(this.localStorageId, this.value), this.dispatchEvent({
			type: "change",
			message: this.value
		})
	}, RangeSlider.prototype.outputPreset = function() {
		presetsOut[this.presetDomain] = presetsOut[this.presetDomain] || {}, presetsOut[this.presetDomain][this.presetKey] = this.value
	}, RangeSlider.prototype.randomizeValue = function() {
		var cb = this.rangeSelector.find(".checkbox").is(":checked");
		if(cb) {
			var totalValues = (this.options.max - this.options.min) / this.options.step,
				rand = parseInt(Math.random() * totalValues) * this.options.step;
			this.value = (this.options.min + rand).toFixed(2), this.rangeSelector.find(".range-slider").val(this.value), this.rangeSelector.find(".value").html(this.value)
		}
	}, EventDispatcher.prototype.apply(SeedField.prototype), SeedField.prototype.getValue = function() {
		return this.value
	}, SeedField.prototype.randomizeValue = function() {
		var cb = this.rangeSelector.find(".checkbox").is(":checked");
		cb && (this.value = parseInt(1e5 * Math.random()), this.rangeSelector.find(".range-slider").val(this.value))
	}, SeedField.prototype.update = function() {
		this.dispatchEvent({
			type: "change",
			message: this.value
		})
	}, SeedField.prototype.resetValue = function() {
		this.value = presets[this.presetDomain][this.presetKey], this.rangeSelector.find(".range-slider").val(this.value), localStorage.setItem(this.localStorageId, this.value), this.dispatchEvent({
			type: "change",
			message: this.value
		})
	}, SeedField.prototype.outputPreset = function() {
		presetsOut[this.presetDomain] = presetsOut[this.presetDomain] || {}, presetsOut[this.presetDomain][this.presetKey] = this.value
	}, Vector.prototype.add = function(vector) {
		this.x += vector.x, this.y += vector.y
	}, Vector.prototype.divide = function(v) {
		this.x /= v, this.y /= v
	}, Vector.prototype.multiply = function(v) {
		this.x *= v, this.y *= v
	}, Vector.prototype.normalize = function() {
		this.x /= this.magnitude, this.y /= this.magnitude
	}, Vector.prototype.copy = function() {
		return new Vector(this.x, this.y)
	}, Object.defineProperties(Vector.prototype, {
		magnitude: {
			get: function() {
				return Math.sqrt(this.x * this.x + this.y * this.y)
			},
			set: function(v) {
				this.normalize(), this.x *= v, this.y *= v
			}
		}
	}), EventDispatcher.prototype.apply(InputOutput.prototype), InputOutput.prototype.getData = function() {
		return this.field.val()
	}, InputOutput.prototype.setData = function(newVal) {
		this.field.val(newVal)
	};

}
