/*! pixilart-drawing-application - 2025-02-17- Drawing Application - Draw Pixel Art Online at www.Pixilart.com. */
var pixilapp = function(a) {
    "use strict";
    var b = function(b, c, d, e, f, g, h, i) {
        this.that = h, this.name = d, this.canvas = document.createElement("canvas"), this.canvas.name = d, this.canvas.id = "canvas_" + d, this.blend = "source-over", i && this.canvas.classList.add(i), f && "Canvas" == this.that.zoom.type && (b *= f, c *= f), this.canvas.width = b, this.canvas.height = c, "CSS" != this.that.zoom.type || "force" == f || e || (f && (this.canvas.style.width = "100%", this.canvas.style.height = "100%"), b *= f, c *= f, i || (a("#canvas-layers-container").width(b), a("#canvas-layers-container").height(c)), a("#drawing-canvas-conatiner").addClass("css-zoom")), this.setDefault(b, c), this.ctx = !1, e && a("body").append("<style> #canvas_" + d + " { display: none; }; </style>"), g ? document.getElementById("canvas-layers-appened").appendChild(this.canvas) : document.getElementById("drawing-canvas-conatiner").appendChild(this.canvas)
    };
    b.prototype.setDefault = function(a, b) {
        this.defaultData = {
            width: a,
            height: b
        }
    }, b.prototype.setSmoothing = function() {
        this.ctx.imageSmoothingEnabled && (this.ctx.imageSmoothingEnabled = !1), this.ctx.mozImageSmoothingEnabled && (this.ctx.mozImageSmoothingEnabled = !1), this.ctx.webkitImageSmoothingEnabled && (this.ctx.webkitImageSmoothingEnabled = !1), this.ctx.msImageSmoothingEnabled && (this.ctx.msImageSmoothingEnabled = !1)
    }, b.prototype.setAlpha = function(a) {
        this.ctx.globalAlpha = a
    }, b.prototype.restoreAlpha = function() {
        this.ctx.globalAlpha = 1
    }, b.prototype.getCanvas = function() {
        return document.getElementById(this.canvas.id)
    }, b.prototype.clear = function(a) {
        if (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), a) return this.dataURL()
    }, b.prototype.dataURL = function() {
        return this.canvas.toDataURL("image/png")
    }, b.prototype.blobImage = function() {
        this.canvas.toBlob(function(a) {
            var b = URL.createObjectURL(a),
                c = new Image;
            c.src = b, callback(c)
        })
    }, b.prototype.image = function(a) {
        var b = new Image;
        return b.src = this.dataURL(), b
    }, b.prototype.context = function() {
        return this.canvas.getContext("2d")
    }, b.prototype.putSimple = function(a, b, c, d, e) {
        return b = b ? b : 0, c = c ? c : 0, d ? this.ctx.drawImage(a, b, c, d, e) : void this.ctx.drawImage(a, b, c)
    }, b.prototype.putImageData = function(a, b, c, d, e) {
        var b = b ? b : 1,
            f = {
                left: 0,
                top: 0,
                ratio: 1
            };
        if (c && (f = c), 1 != b && (this.ctx.globalAlpha = b.toString()), "CSS" == this.that.zoom.type) this.ctx.drawImage(a, 0, 0);
        else {
            var g = this.canvas,
                h = parseInt(g.width),
                i = parseInt(g.height),
                j = parseInt(f.ratio);
            this.ctx.drawImage(a, f.left, f.top, h * j, i * j)
        }
        this.ctx.globalAlpha = 1
    }, b.prototype["default"] = function() {
        this.clear(), this.canvas.width = this.defaultData.width, this.canvas.height = this.defaultData.height
    }, b.prototype.destroy = function() {
        this.clear(), this.canvas.width = 1, this.canvas.height = 1, a("#canvas_" + this.name).remove(), this.that.canvas[this.name] = !1, delete this.that.canvas[this.name], delete this.canvas, delete this
    }, b.prototype.loadBlobToImage = function(a) {
        this.canvas.toBlob(function(b) {
            var c = new Image,
                d = URL.createObjectURL(b);
            c.onload = function() {
                return a(c, d)
            }, c.src = d
        })
    }, b.prototype.loadBlob = function(a) {
        this.canvas.toBlob(function(b) {
            var c = URL.createObjectURL(b);
            return a(c)
        })
    };
    var c = function(a, b, c) {
        this.id = a, this.src = c ? c : "", this.name = b, this.opacity = parseInt(1), this.active = !0, this.unqid = "", this.options = {
            blend: "source-over",
            locked: !1,
            filter: {
                brightness: "100%",
                contrast: "100%",
                grayscale: "0%",
                blur: 0,
                "hue-rotate": 0,
                dropshadow_x: 0,
                dropshadow_y: 0,
                dropshadow_blur: 0,
                dropshadow_alpha: 1
            }
        }
    };
    c.prototype["import"] = function(a) {
        var b = this;
        b = a
    }, c.prototype.init = function() {
        this.unqid = Math.random().toString(36).substring(7), this.dropshadowOptions()
    }, c.prototype.dropshadowOptions = function(a) {
        var b = a ? a : 0,
            c = a ? parseInt(b) - 1 : 0;
        this.options.filter.dropshadow_x = b, this.options.filter.dropshadow_y = b, this.options.filter.dropshadow_blur = c, this.options.filter.dropshadow_alpha = 1
    }, c.prototype.setUnqid = function() {
        this.unqid = Math.random().toString(36).substring(7)
    }, c.prototype.rename = function(a) {
        this.name = a
    }, c.prototype.update = function(a) {
        this.src = a
    }, c.prototype["delete"] = function() {
        delete this
    }, c.prototype.clone = function() {
        return jQuery.extend(!0, {}, this)
    }, c.prototype.createFilters = function() {
        this.options.filter = {
            brightness: "100%",
            contrast: "100%",
            grayscale: "0%",
            blur: 0,
            "hue-rotate": 0
        }, this.dropshadowOptions()
    };
    var d = function() {
        this.name = "", this.speed = 100, this.layers = [], this.active = !0, this.selectedLayer = 0, this.unqid = "", this.preview = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFUlEQVQYV2NkYGD4z8DAwMAIIkAAAA4fAQLCAeFmAAAAAElFTkSuQmCC", this.width = 0, this.height = 0
    };
    d.prototype.init = function(a, b) {
        this.setUnqid(), this.width = a, this.height = b
    }, d.prototype.setUnqid = function() {
        this.unqid = Math.random().toString(36).substring(7)
    }, d.prototype.rename = function(a) {
        this.name = a
    }, d.prototype.speed = function(a) {
        this.speed = a
    }, d.prototype["delete"] = function() {
        delete this
    }, d.prototype.clone = function() {
        return jQuery.extend(!0, {}, this)
    };
    var e = function() {
        this.id, this.type, this.category, this.data
    };
    e.prototype["delete"] = function() {
        delete this
    };
    var f = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.initClick = !1, this.hasOptions = !0, this.options = {
            perfect: {
                name: "pixel",
                preview: "Pixel Perfect",
                hint: "Clean strokes while free hand drawing",
                type: "checkbox",
                value: !1,
                self: this,
                fn: this.togglePerfect
            },
            erase: {
                name: "Right Click Erase",
                hint: "Use right click as eraser tool",
                type: "checkbox",
                value: !0,
                hideApp: !0
            },
            mirrorX: {
                name: "Mirror X",
                hint: "Mirror x on canvas",
                type: "checkbox",
                value: !1
            },
            mirrorY: {
                name: "Mirror Y",
                hint: "Mirror y on canvas",
                type: "checkbox",
                value: !1
            }
        }, this.that.isMobile && !this.that.isApp && (this.options.perfect.value = !0)
    };
    f.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, f.prototype.togglePerfect = function() {
        this.self.that.pixelPerfect.status = !this.self.that.pixelPerfect.status
    }, f.prototype.getCurrent = function() {
        this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, f.prototype.initClickRender = function(a, b) {
        this.that.layPixel(!1, !1, !1, !1, "rendering"), this.that.mirrorDrawing(!1, "rendering"), this.initClick = !0
    }, f.prototype.active = function(a, b) {
        if (!this.currentImage) return void this.getCurrent();
        !this.that.mouse.active || this.initClick || this.that.keyEvent || this.initClickRender(), this.that.mouse.active && this.currentImage && this.that.keys.shift && (this.that.canvas.rendering.clear(), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage));
        var c = this.that.maxHeight,
            d = 0;
        if (this.options.erase.value && this.that.mouse.rightClick) return this.that.ToolController.tools.EraserTool.active();
        for (; this.that.mouse.active && this.imageLoaded;) {
            if (this.that.keyEvent && this.that.keyEvent.ctrlKey) {
                this.that.ToolController.tools.ColorPickerTool.active(), this.that.mouse.active = !1;
                break
            }
            if (this.that.mirrorDrawing(!1, "rendering"), this.that.renderPixel(), this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height, this.that.mouse.x_0 == this.that.mouse.x_1 && this.that.mouse.y_0 == this.that.mouse.y_1) break;
            if (d++, d > c) break;
            this.that.mouseDistance()
        }(this.that.mouse.active && this.imageLoaded || this.that.mouse.activeForceReady) && (this.that.canvas.layer.clear(), this.that.settings.dithering && this.that.pixelDrawingSize > 1 && this.that.renderGlobalDither("rendering"), this.that.canvas.layer.putSimple(this.currentImage), this.that.ToolController.drawToCanvas(this.that.canvas.rendering.canvas, "layer"))
    }, f.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, f.prototype.colorPicker = function() {
        this.that.ColorController.color = "#" + this.that.mouse.getPixel(this.that.mouse.x1, this.that.mouse.y1), this.that.ColorController.select()
    }, f.prototype.off = function(a) {
        this.that.pixelPerfect.set = 0, this.that.pixelPerfect.direction = "", this.that.pixelPerfect.history = [], this.that.pixelPerfect.preHistory = [], this.that.ToolController.tools.ColorPickerTool && (this.that.ToolController.tools.ColorPickerTool.flatten = !1), this.initClick = !1, this.currentImage = !1, this.imageLoaded = !1, this.that.isApp && this.getCurrent()
    }, f.prototype.restore = function(a) {
        this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1
    };
    var g = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.init = !1, this.newImageData = !1, this.hasOptions = !0, this.options = {
            filter: {
                name: "filter",
                preview: "Filter",
                type: "dropdown",
                value: "Blur",
                values: ["Blur", "Grayscale", "Sepia", "Invert", "Contrast", "Brightness"],
                self: this,
                fn: this.changeFilter
            },
            size: {
                name: "size",
                preview: "Size",
                type: "range",
                value: 5,
                min: 1,
                max: 20,
                step: 1,
                self: this,
                fnEnd: this.changeSize
            },
            strenth: {
                name: "strenth",
                preview: "Strengh",
                type: "range",
                value: 50,
                min: 1,
                max: 100,
                step: 1,
                hideOn: "filter",
                hideValues: ["Blur", "Contrast", "Brightness"]
            },
            offset: {
                name: "offset",
                preview: "Strengh",
                type: "range",
                value: 125,
                min: "0",
                max: 200,
                step: 1,
                hideOn: "filter",
                hideValues: ["Blur", "Grayscale", "Sepia", "Invert"]
            }
        }, this.brushImage = !1
    };
    g.prototype.on = function() {
        this.checkOptionsShown()
    }, g.prototype.checkOptionsShown = function() {
        var b = this;
        a.each(b.options, function(c, d) {
            var e = d.type + "-" + d.name;
            a("#extra-panel-content #" + e + ", #tool-option-appended #" + e).closest(".appened-options").show(), d.hideOn && d.hideValues.indexOf(b.options[d.hideOn].value) > -1 && a("#extra-panel-content #" + e + ", #tool-option-appended #" + e).closest(".appened-options").hide()
        })
    }, g.prototype.changeFilter = function(a) {
        var b = this.self ? this.self : this;
        b.options.filter.value = a, b.checkOptionsShown()
    }, g.prototype.changeSize = function() {
        this.self.createBrush()
    }, g.prototype.createBrush = function() {
        var a = this,
            b = this.options.size.value,
            c = 2 * b,
            d = 2 * b;
        this.that.canvas.data.canvas.width = c, this.that.canvas.data.canvas.height = d;
        var e = this.that.canvas.data.ctx.createRadialGradient(b, b, b - 1, b, b, b);
        e.addColorStop(0, "black"), e.addColorStop(1, "transparent"), this.that.canvas.data.ctx.fillStyle = e, this.that.canvas.data.ctx.fillRect(0, 0, c, d), this.that.canvas.data.image().onload = function() {
            a.brushImage = this
        }
    }, g.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, g.prototype.getCurrent = function() {
        this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, g.prototype.active = function(a) {
        this.currentImage || this.getCurrent();
        var b = this.options.size.value;
        if (this.that.mouse.active && this.currentImage) {
            var c = 2 * b,
                d = 2 * b;
            this.canvasResize || (this.canvasResize = !0, this.that.canvas.rendering.canvas.width = c, this.that.canvas.rendering.canvas.height = d, this.that.canvas.data.canvas.width = this.that.width, this.that.canvas.data.canvas.height = this.that.height);
            var e = this.that.mouse.x1 - b,
                f = this.that.mouse.y1 - b,
                g = 2;
            e < 0 && (g = 1), e + c >= this.that.width - 1 && (c = this.that.width - e), e > this.that.width - 1 && (e = this.that.width - 1), f < 0 && (g = 1), f + d >= this.that.height - 1 && (d = this.that.height - f), f > this.that.height - 1 && (f = this.that.height - 1), c <= 0 && (c = 1), d <= 0 && (d = 1), this.that.canvas.data.clear(), this.that.canvas.data.putSimple(this.currentImage);
            var h = this.that.canvas.data.ctx.getImageData(e, f, c, d),
                i = parseInt(this.options.strenth.value),
                j = parseInt(this.options.offset.value);
            switch (this.options.filter.value) {
                case "Brightness":
                    var k = this.that.filterBrightness(!1, j, h.data);
                    break;
                case "Contrast":
                    var k = this.that.filterContrast(!1, j, h.data);
                    break;
                case "Grayscale":
                    var k = this.that.filterGrayscale(!1, i, h.data);
                    break;
                case "Sepia":
                    var k = this.that.filterSepia(!1, i, h.data);
                    break;
                case "Invert":
                    var k = this.that.filterInvert(!1, i, h.data);
                    break;
                default:
                    var k = this.that.filterBlur(!1, 1, h.data, c, d, g)
            }
            h.data.set(k), this.newImageData = h, this.that.canvas.rendering.clear(), this.that.canvas.rendering.ctx.putImageData(h, 0, 0), this.that.canvas.rendering.ctx.globalCompositeOperation = "destination-in";
            var l = this.that.canvas.rendering.ctx.createRadialGradient(b, b, 0, b, b, b);
            l.addColorStop(0, "black"), l.addColorStop(1, "transparent"), this.that.canvas.rendering.ctx.fillStyle = l, this.that.canvas.rendering.ctx.fillRect(0, 0, c, d), this.that.canvas.rendering.ctx.globalCompositeOperation = "source-over", this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas, e, f)
        }
    }, g.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage), this.off())
    }, g.prototype.off = function(a) {
        this.currentImage = !1, this.canvasResize = !1, this.newImageData = !1
    }, g.prototype.restore = function(a) {
        this.currentImage = !1, this.newImageData = !1
    };
    var h = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.initClick = !1, this.hasOptions = !0, this.color = !1, this.optionsSaved = !1, this.options = {
            size: {
                name: "size",
                hint: "Size of spray",
                type: "range",
                value: 6,
                min: 3,
                max: 100,
                step: 1
            },
            speed: {
                name: "speed",
                hint: "How fast pixels are drawn",
                type: "range",
                value: 7,
                min: 1,
                max: 250,
                step: 1
            },
            opacity: {
                name: "opacity",
                hint: "Opacity of pixels",
                type: "range",
                value: 1,
                min: .1,
                max: 1,
                step: .1
            },
            eraseright: {
                name: "Right Click Erase",
                hint: "Use right click as eraser tool",
                type: "checkbox",
                value: !0,
                hideApp: !0
            },
            erase: {
                name: "Erase",
                hint: "Erase pixels",
                type: "checkbox",
                value: !1,
                used: []
            }
        }, this.hasOptions = !0
    };
    h.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, h.prototype.getCurrent = function() {
        this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, h.prototype.repeat = function() {
        var a = this;
        this.color = this.that.hexToRgb(this.that.getDrawingcolor());
        var b = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.options.opacity.value + ")",
            c = !1;
        clearTimeout(this.timer), this.that.mouse.active && this.imageLoaded && (this.timer = setTimeout(function() {
            for (var d = 0; d < a.options.speed.value; d++) {
                var e = Math.random() * Math.PI * 2,
                    f = Math.random() * a.options.size.value * a.options.size.value,
                    g = Math.round(Math.sqrt(f) * Math.cos(e)),
                    h = Math.round(Math.sqrt(f) * Math.sin(e));
                g += a.that.mouse.x_1, h += a.that.mouse.y_1, a.options.erase.value || a.options.eraseright.value && a.that.mouse.rightClick ? a.that.clearPixel(String(g), String(h), 1, "layer") : (a.that.layPixel(String(g), String(h), !1, b, "rendering", 1), c = !0)
            }
            a.updateCanvas(c), a.repeat()
        }, 1))
    }, h.prototype.active = function(a) {
        this.currentImage || this.getCurrent(), this.that.mouse.active && !this.initClick && (this.optionsSaved = this.options.opacity.value), this.that.mouse.active && (this.initClick = !0, this.repeat())
    }, h.prototype.updateCanvas = function(a) {
        this.that.mouse.active && this.imageLoaded && (a && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas)), this.that.render())
    }, h.prototype.colorPicker = function() {
        this.that.ColorController.color = "#" + this.that.mouse.getPixel(this.that.mouse.x1, this.that.mouse.y1), this.that.ColorController.select()
    }, h.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, h.prototype.off = function(a) {
        this.initClick = !1, this.currentImage = !1, this.imageLoaded = !1, this.alpha = 1, this.color = !1, this.that.isApp && this.getCurrent(), clearTimeout(this.timer)
    }, h.prototype.restore = function(a) {
        this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1, this.alpha = 1, this.color = !1, clearTimeout(this.timer)
    };
    var i = function(a) {
        this.that = a, this.loaded = !1, this.currentTop = !1, this.currentLeft = !1, this.posX = 0, this.posY = 0, this.mouseStartX = !1, this.mouseStartY = !1
    };
    i.prototype.active = function(b, c, d, e) {
        if (this.that.mouse.active || b) {
            var f = a("#drawing-canvas-conatiner"),
                g = a("#canvas-layers-container").position(),
                h = this.that.pixel_size * this.that.ZoomController.zoom;
            c = c ? c : this.that.mouse.mousePageX, d = d ? d : this.that.mouse.mousePageY, this.loaded || (this.loaded = !0, this.currentTop = f.scrollTop(), this.currentLeft = f.scrollLeft(), this.mouseStartX = c, this.mouseStartY = d, this.posX = g.left, this.posY = g.top);
            var i = this.mouseStartX - c,
                j = this.mouseStartY - d,
                k = this.currentTop + j,
                l = this.currentLeft + i,
                m = this.posX - i,
                n = this.posY - j;
            if (this.that.mouse.pinchStartX = Math.round((f.width() / 2 - g.left) / h), this.that.mouse.pinchStartY = Math.round((f.height() / 2 - g.top) / h), this.that.ZoomController.previousZoomX = Math.round((f.width() / 2 - g.left) / h), this.that.ZoomController.previousZoomY = Math.round((f.height() / 2 - g.top) / h), this.that.isApp) return this.that.alignPan(m, n, e);
            a("#drawing-canvas-conatiner").scrollTop(k).scrollLeft(l)
        }
    }, i.prototype.off = function(a) {
        this.loaded = !1, a || this.that.NavigationController.updateLastClicks()
    }, i.prototype.restore = function(a) {
        this.loaded = !1
    };
    var j = function(a) {
        this.that = a, this.hasOptions = !0, this.currentImage = !1, this.imageLoaded = !1, this.options = {
            strength: {
                name: "strength",
                hint: "How much should be erased",
                type: "range",
                value: 1,
                min: .1,
                max: 1,
                step: .1
            },
            single: {
                name: "single",
                hint: "prevents pixels that were already erased from being erased again",
                type: "checkbox",
                value: !1,
                used: [],
                hideApp: !0
            },
            mirrorX: {
                name: "Mirror X",
                hint: "Mirror x on canvas",
                type: "checkbox",
                value: !1
            },
            mirrorY: {
                name: "Mirror Y",
                hint: "Mirror y on canvas",
                type: "checkbox",
                value: !1
            }
        }
    };
    j.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, j.prototype.getCurrent = function() {
        this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, j.prototype.active = function(a) {
        var b = 500,
            c = 0;
        for (this.currentImage || this.getCurrent(); this.that.mouse.active && this.currentImage;) {
            var d = this.that.mouse.x_0 + "-" + this.that.mouse.y_0;
            if (this.options.single.value) {
                if (this.options.single.used.indexOf(d) > -1) break;
                this.options.single.used.push(d)
            }
            if (this.that.clearPixel(), this.that.mirrorDrawing(!1, "layer", !0), this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height) break;
            if (this.that.mouse.x_0 == this.that.mouse.x_1 && this.that.mouse.y_0 == this.that.mouse.y_1) break;
            if (c++, c > b) break;
            this.that.mouseDistance()
        }
    }, j.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, j.prototype.restore = function() {
        this.options.single.used = [], this.currentImage = !1, this.imageLoaded = !1
    }, j.prototype.off = function() {
        this.options.single.used = [], this.currentImage = !1, this.imageLoaded = !1
    };
    var k = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.hasOptions = !0, this.startX = !1, this.startY = !1, this.options = {
            iso: {
                name: "iso",
                preview: "ISO Lines",
                hint: "Draw lines in ISO. Hold shift to toggle ISO",
                type: "checkbox",
                value: !1,
                self: this,
                fn: this.toggleISO
            },
            erase: {
                name: "Right Click Erase",
                hint: "Use right click as eraser",
                type: "checkbox",
                value: !0,
                hideApp: !0
            },
            mirrorX: {
                name: "Mirror X",
                hint: "Mirror x on canvas",
                type: "checkbox",
                value: !1
            },
            mirrorY: {
                name: "Mirror Y",
                hint: "Mirror y on canvas",
                type: "checkbox",
                value: !1
            }
        }
    };
    k.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, k.prototype.getCurrent = function() {
        this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, k.prototype.toggleISO = function() {
        this.self.that.settings.isoLines = !this.self.that.settings.isoLines
    }, k.prototype.active = function() {
        this.currentImage || this.getCurrent(), this.that.mouse.active && this.currentImage && (this.that.canvas.rendering.clear(), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage));
        var a = this.that.maxWidth,
            b = 0;
        for (this.startX || (this.startX = this.that.mouse.x_0, this.startY = this.that.mouse.y_0); this.that.mouse.active && this.currentImage && (this.options.erase.value && this.that.mouse.rightClick ? (this.that.clearPixel(!1, !1, !1, "layer"), this.that.mirrorDrawing(!1, "layer", !0)) : (this.that.layPixel(!1, !1, !1, !1, "layer"), this.that.mirrorDrawing(!1, "layer")), this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (b++, !(b > a));) this.that.mouseDistance();
        this.that.settings.dithering && this.that.pixelDrawingSize > 1
    }, k.prototype.shift = function(a) {
        a ? this.that.settings.isoLines = !0 : this.that.settings.isoLines = !1, this.that.SettingsController.toggleISOLines()
    }, k.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, k.prototype.off = function() {
        this.currentImage = !1, this.imageLoaded = !1, this.startX = !1, this.startY = !1
    }, k.prototype.restore = function() {
        this.currentImage = !1, this.imageLoaded = !1, this.startX = !1, this.startY = !1
    };
    var m = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.hasOptions = !0, this.options = {
            fill: {
                name: "Fill",
                hint: "Fill entire area",
                type: "checkbox",
                value: !1
            },
            erase: {
                name: "Right Click Erase",
                hint: "Use right click as eraser",
                type: "checkbox",
                value: !0,
                hideApp: !0
            }
        }
    };
    m.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, m.prototype.active = function(a) {
        if (this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.imageLoaded) {
            this.that.canvas.rendering.clear(), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage);
            var b = this.that.mouse.start_x.toString(),
                c = this.that.mouse.start_y.toString(),
                d = parseInt(this.that.mouse.x1) - parseInt(b),
                e = parseInt(this.that.mouse.y1) - parseInt(c),
                f = parseInt(this.that.mouse.start_x) + d,
                g = parseInt(this.that.mouse.start_y) + e
        }
        for (var h = 2 * this.that.maxWidth, i = 0; this.that.mouse.active && this.imageLoaded;) {
            if (this.render(b, !1), this.render(!1, c), this.render(f.toString(), !1), this.render(!1, g.toString()), this.options.fill.value) {
                var j = {
                    w: d,
                    h: e
                };
                this.options.erase.value && this.that.mouse.rightClick ? this.that.clearPixel(b, c, !1, "layer", j) : this.that.layPixel(b, c, !1, !1, "layer", !1, !1, j)
            }
            if (this.that.mouse.x_0 == this.that.mouse.x_1 && this.that.mouse.y_0 == this.that.mouse.y_1) break;
            if (i++, i > h) break;
            this.that.mouseDistance()
        }
    }, m.prototype.render = function(a, b) {
        this.options.erase.value && this.that.mouse.rightClick ? this.that.clearPixel(a, b, !1, "layer") : this.that.layPixel(a, b, !1, !1, "layer")
    }, m.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, m.prototype.off = function() {
        this.currentImage = !1, this.imageLoaded = !1
    }, m.prototype.restore = function() {
        this.currentImage = !1, this.imageLoaded = !1
    };
    var n = function(a) {
        this.that = a, this.filled = [], this.used = [], this.currentImage = !1, this.imageLoaded = !1, this.clickedColor = !1, this.clickedColorRgbaArray = !1, this.canRun = !0, this.renderImageData = [], this.renderImageColors = [], this.callStackLimit = 2e4, this.called = 0, this.hasOptions = !0, this.p32 = !1, this.options = {
            tolerance: {
                name: "tolerance",
                hint: "How much difference of a color",
                type: "range",
                value: 2,
                min: 0,
                max: 25,
                step: 1,
                hideApp: !0
            },
            all: {
                name: "All Similar Colors",
                hint: "Bucket fill all colors on canvas",
                type: "checkbox",
                value: !1
            },
            erase: {
                name: "Right Click Erase",
                hint: "Use right click as eraser tool",
                type: "checkbox",
                value: !0,
                hideApp: !0
            },
            clear: {
                name: "Clear Pixels",
                hint: "Will bucket fill clear",
                type: "checkbox",
                value: !1,
                cancels: ["pattern"]
            },
            pattern: {
                name: "Pattern",
                hint: "Bucket fill current stamp",
                type: "checkbox",
                value: !1,
                require: "stamps",
                cancels: ["clear"],
                hideApp: !0
            },
            stamps: {
                type: "stamps",
                hideApp: !0
            }
        }
    };
    n.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this, a.run()
            }
        }
    }, n.prototype.getCurrent = function() {
        this.currentImage = this.that.canvas.layer.image(), this.load()
    }, n.prototype.active = function(a) {
        (this.that.mouse.active && this.that.mouse.up && this.that.mouse.isTouch || this.that.mouse.active && !this.that.mouse.isTouch || this.that.mouse.active && !this.that.app.fingerToDraw) && (this.canRun = !0, this.getCurrent())
    }, n.prototype.run = function() {
        var a = this;
        if (this.canRun) {
            this.that.mouse.active = !1;
            var b = this.that.hexToRgb(this.that.ColorController.color, !0),
                c = !1;
            if ((this.options.clear.value || this.options.erase.value && this.that.mouse.rightClick) && (c = !0), this.options.pattern.value && (b = !1), this.options.all.value || this.options.pattern.value && !c) this.that.bucketCreate(function(b, c, d) {
                if (!b) return a.that.FrameController.updateFramePreview(), a.finish(), void a.that.render();
                var e = a.that.canvas.layer.ctx.getImageData(0, 0, a.that.width, a.that.height);
                a.options.pattern.value && a.that.stamps.data ? a.that.backgroundImageRepeat("rendering", a.that.stamps.data, function() {
                    var b = a.that.canvas.rendering.ctx.getImageData(0, 0, a.that.width, a.that.height);
                    a.that.canvas.rendering.clear(), a.that.canvas.rendering.ctx.putImageData(b, 0, 0), a.that.canvas.rendering.ctx.globalCompositeOperation = "destination-in", a.that.canvas.rendering.putSimple(a.that.canvas.data.canvas), a.that.canvas.rendering.ctx.globalCompositeOperation = "source-over", a.that.canvas.layer.clear(), a.that.canvas.layer.ctx.putImageData(e, 0, 0), a.that.canvas.layer.putSimple(a.that.canvas.rendering.canvas), a.that.FrameController.updateFramePreview(), a.finish(), a.that.render()
                }) : (a.that.canvas.layer.ctx.putImageData(c, 0, 0), a.that.FrameController.updateFramePreview(), a.finish(), a.that.render())
            }, a.options.all.value, !0, !1, !1, !1, !1, !1, b, c, this.options.tolerance.value);
            else {
                var d = this.that.mouse.start_x,
                    e = this.that.mouse.start_y;
                this.imageData = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height);
                for (var f = this.imageData, g = 0; g < f.data.length; g += 4) this.renderImageColors.push([f.data[g], f.data[g + 1], f.data[g + 2], f.data[g + 3]]);
                if (this.clickedColor = this.that.mouse.getPixel(d, e, !0), this.clickedColorRgbaArray = this.that.mouse.getPixel(d, e, !0, !1, !0), "#" + this.clickedColor == this.that.ColorController.color + "255" && !c) return void this.finish();
                this.doPixel(d, e), this.fill(d, e, !0), this.loopFill(), this.that.FrameController.updateFramePreview(), this.finish(), this.that.render()
            }
        }
    }, n.prototype.fill = function(a, b) {
        var c = a,
            d = b,
            e = a + 1,
            f = b + 1,
            g = a - 1,
            h = b - 1;
        this.canRun && (this.check(e, d), this.check(c, f), this.check(g, d), this.check(c, h))
    }, n.prototype.loopFill = function() {
        if (!(this.called >= this.callStackLimit)) {
            this.called++;
            var a = this.filled.slice(0);
            this.filled = [];
            for (var b = a.length - 1; b >= 0; b--) {
                if (!this.canRun) return;
                var c = a[b];
                this.fill(c[0], c[1])
            }
            a.length && this.loopFill()
        }
    }, n.prototype.doPixel = function(a, b, c) {
        if (c) {
            var d = this.that.getExactXYFromPosition(c);
            a = d[0], b = d[1]
        }
        this.options.clear.value || this.options.erase.value && this.that.mouse.rightClick ? this.that.clearPixel(a, b, 1) : this.that.layPixel(a, b, !0, !1, !1, 1)
    }, n.prototype.check = function(a, b, c) {
        var d = this.that.width,
            e = this.that.height;
        a = parseInt(a), b = parseInt(b);
        var f = d * b + a;
        if (a <= d - 1 && a >= 0 && b <= e - 1 && b >= 0 && this.inRange(f)) {
            if (c) return !0;
            if (!this.canRun) return;
            return this.doPixel(a, b), this.filled.push([a, b]), this.renderImageColors[f] = [-1, -1, -1, -1], this.renderImageData[f] = this.that.ColorController.color, !0
        }
        return !1
    }, n.prototype.inRange = function(a) {
        var b = this.renderImageColors[a],
            c = this.clickedColorRgbaArray,
            d = parseInt(this.options.tolerance.value);
        return (b[0] == c[0] || b[0] + d >= c[0] && b[0] - d <= c[0]) && (b[1] == c[1] || b[1] + d >= c[1] && b[1] - d <= c[1]) && (b[2] == c[2] || b[2] + d >= c[2] && b[2] - d <= c[2]) && b[3] == c[3]
    }, n.prototype.cancel = function() {
        this.canRun = !1, this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, n.prototype.finish = function() {
        var a = this;
        this.that.LayerController.updateLayer(!1, function() {
            a.that.HistoryController.create(), a.that.updateData(), a.that.ToolController.off()
        }, !0), this.filled = [], this.renderImageData = [], this.renderImageColors = [], this.called = 0, this.currentImage = !1, this.imageLoaded = !1
    }, n.prototype.off = function() {
        this.currentImage = !1, this.imageLoaded = !1
    };
    var o = function(a) {
        this.that = a, this.flatten = !1, this.color = !1, this.imageData = !1
    };
    o.prototype.flattenLayers = function() {
        var a = this,
            b = this.that.LayerController.layers;
        this.that.LayerController.flatten(b, !1, !1, function(b) {
            a.that.loadImage(b, function(b) {
                a.that.canvas.data.clear(), a.that.canvas.data["default"](), a.that.canvas.data.putSimple(b), a.imageData = a.that.canvas.data.ctx.getImageData(0, 0, a.that.canvas.data.canvas.width, a.that.canvas.data.canvas.height).data, a.flatten = !0, a.select()
            })
        })
    }, o.prototype.active = function(a) {
        this.that.mouse.active && (this.flatten ? this.select() : this.flattenLayers())
    }, o.prototype.select = function() {
        var a = this.that.mouse.x1,
            b = this.that.mouse.y1;
        this.color = this.that.mouse.getPixel(a, b, !1, "data", !1, this.imageData), this.that.ColorController.color = "#" + this.color.toLowerCase(), this.that.ColorController.select(this.color.toLowerCase())
    }, o.prototype.off = function(a) {
        var b = this;
        this.flatten = !1, setTimeout(function() {
            b.that.ToolController.setBrushColor(b.color, !0)
        }, 10)
    }, o.prototype.restore = function(a) {
        this.that.canvas.data["default"](), this.flatten = !1
    };
    var p = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.keyStart = !1, this.keyTimer = !1, this.keyX = 0, this.keyY = 0, this.hasOptions = !0, this.options = {
            parallax: {
                name: "Parallax",
                hint: "Infinite scrolling canvas",
                type: "checkbox",
                value: !1,
                used: []
            },
            left: {
                name: "left",
                preview: "Align Left",
                type: "button",
                value: "left",
                self: this,
                fn: this.align
            },
            right: {
                name: "right",
                preview: "Align Right",
                type: "button",
                value: "right",
                self: this,
                fn: this.align
            },
            center: {
                name: "center",
                preview: "Align Center",
                type: "button",
                value: "center",
                self: this,
                fn: this.align
            },
            top: {
                name: "top",
                preview: "Align Top",
                type: "button",
                value: "top",
                self: this,
                fn: this.align
            },
            bottom: {
                name: "bottom",
                preview: "Align Bottom",
                type: "button",
                value: "bottom",
                self: this,
                fn: this.align
            }
        }
    };
    p.prototype.align = function() {
        this.self.that.AlignController.active(this.value)
    }, p.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, p.prototype.getCurrent = function(a) {
        this.currentImage = a ? a : this.that.canvas.layer.image(), this.load()
    }, p.prototype.active = function(a) {
        if (!this.currentImage) return this.getCurrent(a);
        if (this.that.mouse.active && this.imageLoaded) {
            var b = this.that.mouse.x1 - this.that.mouse.start_x,
                c = this.that.mouse.y1 - this.that.mouse.start_y,
                d = Math.abs(b),
                e = Math.abs(c);
            this.that.keys.shift && (d > e ? c = 0 : b = 0), this.keyStart = !1, this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage, b, c), this.repeat(b, c)
        }
    }, p.prototype.repeat = function(a, b) {
        if (this.options.parallax.value) {
            var c = -(this.that.width - a),
                d = -(this.that.height - b),
                e = parseInt(this.that.width) + parseInt(a),
                f = parseInt(this.that.height) + parseInt(b);
            this.that.canvas.layer.putSimple(this.currentImage, c, b), this.that.canvas.layer.putSimple(this.currentImage, e, b), this.that.canvas.layer.putSimple(this.currentImage, a, d), this.that.canvas.layer.putSimple(this.currentImage, a, f), this.that.canvas.layer.putSimple(this.currentImage, c, d), this.that.canvas.layer.putSimple(this.currentImage, e, f), this.that.canvas.layer.putSimple(this.currentImage, c, f), this.that.canvas.layer.putSimple(this.currentImage, e, d)
        }
    }, p.prototype.key = function(a) {
        if (this.that.LayerController.layers[this.that.LayerController.currentLayer].options.locked) return void this.that.showAlert(this.that.messages("layer_locked_alter"));
        if (!this.currentImage) return this.getCurrent();
        var b = this;
        switch (this.keyStart || (this.that.mouse.createHistory = !0, this.keyX = 0, this.keyY = 0), this.keyStart = !0, a) {
            case 38:
                this.keyY--;
                break;
            case 40:
                this.keyY++;
                break;
            case 37:
                this.keyX--;
                break;
            case 39:
                this.keyX++
        }
        this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage, this.keyX, this.keyY), this.repeat(this.keyX, this.keyY), this.that.render(), clearTimeout(this.keyTimer), this.keyTimer = setTimeout(function() {
            b.completeKey()
        }, 500)
    }, p.prototype.completeKey = function() {
        clearTimeout(this.keyTimer), this.keyStart && (this.keyStart = !1, this.that.mouse.active = !0, this.restore(), this.currentImage = !1, this.that.mouse.finish())
    }, p.prototype.off = function() {
        this.completeKey(), this.currentImage = !1, this.imageLoaded = !1
    }, p.prototype.restore = function() {
        this.imageLoaded = !1, this.completeKey(), this.keyStart || (this.currentImage = !1, this.imageLoaded = !1)
    };
    var q = function(a) {
        this.id = "select-tool", this.that = a, this.moving = !1, this.activeSelecting = !1, this.undo = !1, this.selectionActive = !1, this.hasOptions = !0, this.draggingActive = !1, this.that.selectImageData = !1, this.that.currentImage = !1, this.moved = !1, this.rotating = !1, this.selectToolOnly = !1, this.multi = {
            "default": {
                name: "Select Tool",
                image: "/img/application/icons/select_32x32.png",
                option: "default"
            },
            lasso: {
                name: "Lasso Tool",
                image: "/img/application/icons/lasso_32x32.png",
                option: "lasso"
            },
            poly: {
                name: "Polygonal Tool",
                image: "/img/application/icons/poly_32x32.png",
                option: "poly"
            },
            bucket: {
                name: "Wand Tool",
                image: "/img/application/icons/wand_32x32.png",
                option: "bucket"
            },
            bucketall: {
                name: "Wand All Colors",
                image: "/img/application/icons/wand_all_32x32.png",
                option: "bucketall"
            }
        }, this.options = {
            "default": {
                name: "Default",
                hint: "",
                type: "checkbox",
                value: !0,
                hidden: !0,
                used: [],
                multi: !0,
                cancels: ["lasso", "bucket", "bucketall", "poly"]
            },
            lasso: {
                name: "Lasso",
                hint: "Free style selections",
                type: "checkbox",
                value: !1,
                used: [],
                multi: !0,
                cancels: ["bucket", "bucketall", "poly"]
            },
            poly: {
                name: "Polygonal Lasso",
                hint: "Line style selections. Press CTRL Key to set point",
                type: "checkbox",
                value: !1,
                used: [],
                multi: !0,
                cancels: ["bucket", "bucketall", "lasso"],
                hideApp: !0
            },
            bucket: {
                name: "Wand",
                hint: "Bucket fill selections",
                type: "checkbox",
                value: !1,
                multi: !0,
                cancels: ["lasso", "bucketall", "poly"]
            },
            bucketall: {
                name: "Wand All Colors",
                hint: "Bucket all colors selection",
                type: "checkbox",
                value: !1,
                multi: !0,
                cancels: ["lasso", "bucket", "poly"]
            },
            rotateAnyDegree: {
                name: "Rotate Any Degree",
                hint: "Beta - While free style rotating",
                type: "checkbox",
                value: !0,
                hideApp: !0
            },
            strength: {
                name: "strength",
                preview: "Filter Strengh",
                type: "range",
                value: 50,
                min: 0,
                max: 100,
                step: 1,
                hideApp: !0
            },
            repeat: {
                name: "repeat",
                preview: "Repeat Resize",
                hint: "Repeat the contents instead of resizing contents while resizing",
                type: "checkbox",
                value: !1
            }
        }, this.dragColor = "rgba(63, 223, 63, .30)", this.selectColor = "rgba(255,255,255,0.3)", this.selectColorPrimary = "rgba(0,0,0,0.3)", this.selectCanvasLocation = {
            active: !1,
            image: !1,
            default_x: -999999,
            default_y: -999999,
            x: -99999,
            y: -99999,
            width: 0,
            height: 0
        }, this.init()
    };
    q.prototype.init = function() {
        this.listeners(), this.that.SelectController.hideSelectTools()
    }, q.prototype.start = function() {
        this.that.isApp && a("#select-buttons-wrapper").addClass("d-flex-f")
    }, q.prototype.listeners = function() {
        var b = this,
            c = ".select-drag";
        (this.that.isMobile || this.that.isTablet || this.that.isTouch || this.that.isApp) && (a(c).bind("touchstart", function(c) {
            b.draggingActive = a(this).attr("data-axis"), a("#canvas-layers-appened").trigger("touchstart", [c])
        }), this.that.isApp || (a(c).bind("touchmove", function(a) {
            b.that.mouse.move(a.originalEvent.touches[0])
        }), a(c).bind("touchend", function(a) {
            b.that.mouse.active = !0, b.that.mouse.finish(a.originalEvent.touches[0])
        }))), a(c).on("mousedown", function() {
            b.draggingActive = a(this).attr("data-axis")
        })
    }, q.prototype.destroy = function() {
        var b = ".select-drag";
        a(b).unbind("touchstart"), a(b).unbind("touchmove"), a(b).unbind("touchend"), a(b).unbind("mousedown")
    }, q.prototype.useMulti = function(a) {
        var b = this.multi[a].option;
        this.that.ToolController.switchToolOption(b, 1)
    }, q.prototype.drag = function() {
        this.that.SelectController.hideSelectTools(), this.dragging(this.draggingActive)
    }, q.prototype.active = function(a) {
        if (this.that.SelectController.currentImage || (this.that.SelectController.currentImage = this.that.canvas.layer.image(), this.that.currentImage = this.that.canvas.layer.image()), this.draggingActive) return this.drag();
        if (this.moving && this.that.app_button_down) return this.move(), void this.that.renderAfter.push(this.that.canvas.select.canvas);
        if (this.that.mouse.active || this.that.SelectController.active) {
            if (this.selectToolOnly = !1, this.that.SelectController.hideSelectTools(), this.that.SelectController.status && (this.that.mouse.start_x >= this.that.SelectController.start_x && this.that.mouse.start_x <= this.that.SelectController.start_x + this.that.SelectController.width && this.that.mouse.start_y >= this.that.SelectController.start_y && this.that.mouse.start_y <= this.that.SelectController.start_y + this.that.SelectController.height ? this.move() : this.moveOff()), !this.moving) {
                if (this.that.SelectController.usingLasso || this.options.lasso.value) return this.activeSelecting = !1, this.selectCanvasLocation.active = !1, this.that.SelectController.usingLasso || this.that.canvas.select.clear(), this.that.ToolController.tool = this.that.ToolController.tools.LassoTool, this.that.ToolController.tools.LassoTool.active();
                if (this.options.poly.value) return this.activeSelecting = !1, this.selectCanvasLocation.active = !1, this.that.ToolController.tool = this.that.ToolController.tools.PolyTool, this.that.ToolController.tools.PolyTool.active();
                if (this.options.bucket.value || this.options.bucketall.value) return this.activeSelecting = !1, this.selectCanvasLocation.active = !1, this.that.canvas.select.clear(), this.that.ToolController.tool = this.that.ToolController.tools.WandTool, this.that.ToolController.tools.WandTool.active(this.options.bucketall.value);
                this.selectToolOnly = !0, this.selecting()
            }
        } else this.that.SelectController.showSelectTools(), this.that.SelectController.addSelectToolsReady();
        this.that.renderAfter.push(this.that.canvas.select.canvas)
    }, q.prototype.selecting = function() {
        this.doHistory(), this.that.SelectController.transform = !1, this.that.SelectController.cutImageData = !1, this.that.SelectController.currentSelectImage = !1;
        var a = this.that.mouse.x1,
            b = this.that.mouse.y1;
        this.that.mouse.start_x < a && a++, this.that.mouse.start_y < b && b++, this.that.mouse.start_x == a && this.that.mouse.start_y == b || (this.activeSelecting = !0, this.selectCanvasLocation.active = !1), this.that.canvas.select.clear();
        var c = Math.abs(a - this.that.mouse.start_x),
            d = Math.abs(b - this.that.mouse.start_y),
            e = a - this.that.mouse.start_x,
            f = b - this.that.mouse.start_y;
        this.that.keys.shift && (d = c, f = e), !e && f && (e = 1), !f && e && (f = 1);
        var g = this.that.mouse.start_x > a ? a : this.that.mouse.start_x,
            h = this.that.mouse.start_y > b ? b : this.that.mouse.start_y,
            i = e,
            j = f;
        this.that.mouse.start_x > a && (c++, i--), this.that.mouse.start_y > b && (d++, j--), this.setSelection(g, h, c, d, c, d), this.that.SelectController.setCordinates(i, j)
    }, q.prototype.setSelection = function(a, b, c, d, e, f, g) {
        c > 1 && !d && (d = 1), d > 1 && !c && (c = 1), this.that.SelectController.start_x = a, this.that.SelectController.start_y = b, this.that.SelectController.start_width = c, this.that.SelectController.start_height = d, this.that.SelectController.drag_width = c, this.that.SelectController.drag_height = d, this.that.SelectController.start_drag_x = a, this.that.SelectController.start_drag_y = b, this.that.SelectController.end_drag_x = a + c, this.that.SelectController.end_drag_y = b + d, this.that.SelectController.cut_x = a, this.that.SelectController.cut_y = b, this.that.SelectController.cut_width = c, this.that.SelectController.cut_height = d, this.that.SelectController.width = c, this.that.SelectController.height = d, this.showHideStampButton();
        g ? a : this.that.mouse.start_x, g ? b : this.that.mouse.start_y;
        this.drawSelectArea(a, b, e, f), this.selectCanvasLocation = {
            default_x: a,
            default_y: b,
            x: a,
            y: b,
            width: c,
            height: d,
            cut_start: a,
            cut_width: c,
            cut_height: d
        }
    }, q.prototype.dragging = function(a) {
        var b = 90;
        this.options.rotateAnyDegree.value && (b = 5), this.moved = !0, this.that.SelectController.start_drag_width && this.that.SelectController.start_drag_height || (this.that.SelectController.start_drag_width = this.selectCanvasLocation.width, this.that.SelectController.start_drag_height = this.selectCanvasLocation.height), this.that.SelectController.start_drag_x && this.that.SelectController.start_drag_y || (this.that.SelectController.start_drag_x = this.that.SelectController.start_x, this.that.SelectController.start_drag_y = this.that.SelectController.start_y, this.that.SelectController.end_drag_x = this.that.SelectController.start_x + this.selectCanvasLocation.width, this.that.SelectController.end_drag_y = this.that.SelectController.start_y + this.selectCanvasLocation.height);
        var c = this.that.mouse.x1 + 1,
            d = this.that.mouse.y1 + 1,
            e = this.that.SelectController.width,
            f = this.that.SelectController.height;
        if (this.that.SelectController.start_width = this.selectCanvasLocation.width, this.that.SelectController.start_height = this.selectCanvasLocation.height, "rotate" == a) {
            var g = this.that.SelectController.start_x + this.selectCanvasLocation.width / 2,
                h = this.that.SelectController.start_y + this.selectCanvasLocation.height / 2,
                i = (180 * Math.atan2(h - d, g - c) / Math.PI - 90).toFixed();
            return i = Math.round(i / b) * b, this.rotate(i)
        }
        if (this.that.keys.shift && ["nw", "ne", "se", "sw"].indexOf(a) > -1) {
            Math.abs(c - this.that.mouse.start_x), Math.abs(d - this.that.mouse.start_y);
            if ("se" == a) {
                var j = Math.abs((c - this.that.SelectController.start_drag_x) / this.that.SelectController.start_drag_width),
                    k = Math.abs(this.selectCanvasLocation.height * j);
                d = this.that.SelectController.start_drag_y + k
            }
            if ("ne" == a) {
                var j = Math.abs((c - this.that.SelectController.start_drag_x) / this.that.SelectController.start_drag_width),
                    k = Math.abs(this.selectCanvasLocation.height * j);
                d = this.that.SelectController.start_drag_y + this.that.SelectController.end_drag_y - (this.that.SelectController.start_drag_y + k)
            }
        }
        "w" != a && "nw" != a && "sw" != a || (this.that.SelectController.start_drag_x = c), "n" != a && "ne" != a && "nw" != a || (this.that.SelectController.start_drag_y = d), "x" != a && "ne" != a && "se" != a || (this.that.SelectController.end_drag_x = c), "y" != a && "sw" != a && "se" != a || (this.that.SelectController.end_drag_y = d), (this.that.SelectController.end_drag_x - this.that.SelectController.start_drag_x > 1 || this.that.SelectController.end_drag_y - this.that.SelectController.start_drag_y > 1) && (this.that.SelectController.width = this.that.SelectController.end_drag_x - this.that.SelectController.start_drag_x, this.that.SelectController.height = this.that.SelectController.end_drag_y - this.that.SelectController.start_drag_y), this.that.SelectController.setCordinates(this.that.SelectController.width, this.that.SelectController.height), this.that.canvas.select.clear(), this.drawSelectArea(this.that.SelectController.start_x, this.that.SelectController.start_y, e, f), this.that.renderAfter.push(this.that.canvas.select.canvas)
    }, q.prototype.showHideStampButton = function() {
        this.that.SelectController.width >= 1 || this.that.SelectController.height >= 1 ? this.that.SelectController.showStampButton() : this.that.SelectController.hideStampButton()
    }, q.prototype.rotate = function(a) {
        var b = this.that.SelectController.start_drag_x,
            c = this.that.SelectController.start_drag_y,
            d = this.that.SelectController.end_drag_x - this.that.SelectController.start_drag_x,
            e = this.that.SelectController.end_drag_y - this.that.SelectController.start_drag_y;
        this.rotating = a, this.that.canvas.select.clear();
        var f = a * Math.PI / 180;
        this.that.canvas.select.setSmoothing(), this.that.canvas.select.ctx.save(), this.that.canvas.select.ctx.translate(b + d / 2, c + e / 2), this.that.canvas.select.ctx.rotate(f), this.that.canvas.select.putSimple(this.selectCanvasLocation.image, -d / 2, -e / 2, d, e), this.that.canvas.select.setSmoothing(), this.that.canvas.select.ctx.fillStyle = this.dragColor, this.that.canvas.select.ctx.fillRect(-d / 2, -e / 2, d, e), this.that.canvas.select.ctx.restore(), this.drawSelectArea(b, c, d, e, !0), this.that.renderAfter.push(this.that.canvas.select.canvas)
    }, q.prototype.drawSelectArea = function(a, b, c, d, e) {
        var f = c,
            g = d;
        if (this.draggingActive && !e) {
            f = this.that.SelectController.drag_width, g = this.that.SelectController.drag_height;
            var h = this.that.SelectController.start_drag_x,
                i = this.that.SelectController.start_drag_y,
                j = this.that.SelectController.end_drag_x - this.that.SelectController.start_drag_x,
                k = this.that.SelectController.end_drag_y - this.that.SelectController.start_drag_y;
            j >= 1 && k >= 1 && (this.that.canvas.select.setSmoothing(), this.that.canvas.select.putSimple(this.selectCanvasLocation.image, h, i, j, k), this.that.canvas.select.ctx.fillStyle = this.dragColor, this.that.canvas.select.ctx.fillRect(h, i, j, k), this.that.canvas.select.ctx.fillRect(h, i, j, k))
        }!f && g > 1 && (f = 1), !g && f > 1 && (g = 1), this.that.canvas.select.ctx.fillStyle = this.selectColor, this.that.canvas.select.ctx.fillRect(a, b, f, g), this.that.canvas.select.ctx.fillStyle = this.selectColorPrimary, this.that.canvas.select.ctx.fillRect(a, b, f, g)
    }, q.prototype.renderSelectedArea = function() {
        this.that.canvas.select.clear(), this.that.SelectController.start_x = this.selectCanvasLocation.x, this.that.SelectController.start_y = this.selectCanvasLocation.y, this.that.SelectController.width = this.selectCanvasLocation.width, this.that.SelectController.height = this.selectCanvasLocation.height, this.drawSelectArea(this.selectCanvasLocation.x, this.selectCanvasLocation.y, this.selectCanvasLocation.width, this.selectCanvasLocation.height)
    }, q.prototype.updateSelectCanvasArea = function(a, b, c, d) {
        this.that.canvas.select.clear(), this.selectCanvasLocation.width = a, this.selectCanvasLocation.height = b, this.that.SelectController.width = a, this.that.SelectController.height = b, this.drawSelectArea(this.selectCanvasLocation.x, this.selectCanvasLocation.y, this.selectCanvasLocation.width, this.selectCanvasLocation.height)
    }, q.prototype.updateSelection = function(a, b) {
        var c = a ? a : this.that.canvas.rendering.image(),
            d = this;
        return b ? (this.that.SelectController.showAcceptButton(), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.that.currentImage, 0, 0), this.that.canvas.layer.ctx.clearRect(this.selectCanvasLocation.default_x, this.selectCanvasLocation.default_y, this.that.SelectController.cut_width, this.that.SelectController.cut_height), this.that.SelectController.cutImageData && this.that.canvas.layer.putSimple(this.that.SelectController.cutImageData, this.selectCanvasLocation.default_x, this.selectCanvasLocation.default_y), this.that.canvas.layer.putSimple(c, this.selectCanvasLocation.x, this.selectCanvasLocation.y), this.selectCanvasLocation.image = c, void this.that.render()) : c.onload = function() {
            d.updateSelection(c, !0)
        }
    }, q.prototype.move = function() {
        if (this.selectCanvasLocation.image) {
            this.moved = !0, this.that.SelectController.showAcceptButton(), this.that.SelectController.hideSelectTools(), this.moving = !0, this.selectCanvasLocation.active = !0, this.that.SelectController.transform = !1, this.that.canvas.select.clear(), this.that.canvas.rendering.clear(), this.that.canvas.rendering.putSimple(this.selectCanvasLocation.image), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.that.SelectController.currentImage, 0, 0), this.that.canvas.layer.ctx.clearRect(this.selectCanvasLocation.default_x, this.selectCanvasLocation.default_y, this.that.SelectController.cut_width, this.that.SelectController.cut_height), this.that.SelectController.cutImageData && this.that.canvas.layer.putSimple(this.that.SelectController.cutImageData, this.selectCanvasLocation.default_x, this.selectCanvasLocation.default_y);
            var a = this.that.mouse.x1 - this.that.mouse.start_x + this.that.SelectController.start_x,
                b = this.that.mouse.y1 - this.that.mouse.start_y + this.that.SelectController.start_y,
                c = Math.abs(this.that.mouse.x1 - this.that.mouse.start_x),
                d = Math.abs(this.that.mouse.y1 - this.that.mouse.start_y);
            this.that.keys.shift && (c > d ? b = this.that.SelectController.start_y : a = this.that.SelectController.start_x), this.that.canvas.layer.setSmoothing(), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas, a, b);
            this.selectCanvasLocation;
            this.selectCanvasLocation.x = a, this.selectCanvasLocation.y = b, this.that.SelectController.start_drag_x = !1
        }
    }, q.prototype.off = function() {
        var a = this;
        if (this.selectionActive = !1, this.draggingActive) return this.draggingActive = !1, this.that.SelectController.start_x = this.that.SelectController.start_drag_x, this.that.SelectController.start_y = this.that.SelectController.start_drag_y, this.selectCanvasLocation.x = this.that.SelectController.start_drag_x, this.selectCanvasLocation.y = this.that.SelectController.start_drag_y, this.that.SelectController.drag_width = this.that.SelectController.width, this.that.SelectController.drag_height = this.that.SelectController.height, this.that.SelectController.start_drag_x = !1, this.that.SelectController.start_drag_y = !1, this.that.SelectController.start_drag_width = !1, this.rotating ? void this.that.SelectController.setRotateImage(this.rotating) : this.that.SelectController.resize(this.that.SelectController.width, this.that.SelectController.height);
        if (this.activeSelecting && (this.that.SelectController.status = !0, this.selectToolOnly && (this.that.canvas.rendering.clear(), this.that.canvas.rendering.canvas.width = this.that.SelectController.width, this.that.canvas.rendering.canvas.height = this.that.SelectController.height, this.that.canvas.rendering.putSimple(this.that.canvas.layer.canvas, 0, 0, this.that.SelectController.start_x, this.that.SelectController.start_y), this.that.canvas.rendering.image().onload = function() {
                a.that.SelectController.copyDataFormat(a.that.canvas.rendering.image(), a.that.canvas.rendering.canvas.width, a.that.canvas.rendering.canvas.height)
            })), !this.selectCanvasLocation.active) {
            var b = this.that.SelectController.start_x,
                c = this.that.SelectController.start_y,
                d = this.that.SelectController.width,
                e = this.that.SelectController.height;
            if (this.that.canvas.rendering.canvas.width = this.that.width, this.that.canvas.rendering.canvas.height = this.that.height, this.that.canvas.rendering.putSimple(this.that.canvas.layer.canvas), this.that.SelectController.currentImage = !1, Math.abs(d) > 0 && Math.abs(e) > 0 || Math.abs(d) > 0 && !e || Math.abs(e) > 0 && !d) {
                e || (e = 1), d || (d = 1);
                var f = this.that.canvas.rendering.ctx.getImageData(b, c, d, e);
                this.that.canvas.rendering.canvas.width = Math.abs(d), this.that.canvas.rendering.canvas.height = Math.abs(e), this.that.canvas.rendering.ctx.putImageData(f, 0, 0), this.selectCanvasLocation.image = this.that.canvas.rendering.image()
            }
        }
        this.selectCanvasLocation.active && this.renderSelectedArea(), this.activeSelecting = !1, this.that.render()
    }, q.prototype.history = function() {
        var a = this;
        this.undo || this.that.SelectController.transform || (this.undo = !0, this.that.LayerController.updateLayer(!1, function() {
            a.that.HistoryController.create()
        }))
    }, q.prototype.alt = function(a) {}, q.prototype.moveOff = function() {
        this.restore(!0)
    }, q.prototype.hideButtons = function() {
        this.that.SelectController.hideToggleButtons()
    }, q.prototype.renderChange = function(a) {
        var b = this;
        this.that.LayerController.updateLayer(!1, function() {
            b.that.HistoryController.create(!1, function() {
                return b.that.SelectController.transform = !1, b.moved = !1, a()
            })
        })
    }, q.prototype.restore = function(a, b) {
        this.that.SelectController.hideAccept(), this.that.SelectController.hideSelectTools(), this.that.SelectController.hideStampButton(), this.doHistory(b), this.moving = !1, this.moved = !1, this.undo = !1, this.that.canvas.select.clear(), this.that.canvas.rendering["default"](), this.that.SelectController.currentImage = !1, this.that.SelectController.status = !1, this.that.SelectController.off(), this.that.SelectController.width = 0, this.that.SelectController.height = 0, this.selectCanvasLocation.width = 0, this.selectCanvasLocation.height = 0, this.that.SelectController.usingLasso = !1, this.that.currentImage = !1, a || this.that.render()
    }, q.prototype.cancel = function() {
        this.that.isApp && (this.that.SelectController.status = !1), this.that.mouse.active = !1
    }, q.prototype.doHistory = function(a) {
        var b = this;
        (this.that.SelectController.transform || a || this.moved) && this.that.LayerController.updateLayer(!1, function() {
            b.that.HistoryController.create(), b.that.SelectController.transform = !1, b.moved = !1, b.that.updateData()
        })
    }, q.prototype.finished = function() {
        this.that.isApp && a("#select-buttons-wrapper").removeClass("d-flex-f")
    };
    var r = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.hasOptions = !0, this.options = {
            ratio: {
                name: "Ratio",
                hint: "Keep 1:1 ratio. Hold shift to keep ratio (Shift)",
                type: "checkbox",
                value: !1,
                used: []
            },
            erase: {
                name: "Right Click Erase",
                hint: "Use right click as eraser",
                type: "checkbox",
                value: !0,
                hideApp: !0
            },
            center: {
                name: "Center",
                hint: "Keep circle in center of inital coordinates (Ctrl)",
                type: "checkbox",
                value: !1,
                used: []
            }
        }
    };
    r.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, r.prototype.render = function(a, b) {
        a = String(a), b = String(b), this.options.erase.value && this.that.mouse.rightClick ? this.that.clearPixel(a, b, !1, "layer") : this.that.layPixel(a, b)
    }, r.prototype.active = function(a) {
        if (this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.imageLoaded) {
            var b = this.that.mouse.start_x,
                c = this.that.mouse.start_y,
                d = this.that.mouse.x1,
                e = this.that.mouse.y1;
            this.that.mouse.x1 < this.that.mouse.start_x && !this.options.center.value && !this.that.keys.ctrl && (d = this.that.mouse.start_x, b = this.that.mouse.x1), this.that.mouse.y1 < this.that.mouse.start_y && !this.options.center.value && !this.that.keys.ctrl && (e = this.that.mouse.start_y, c = this.that.mouse.y1);
            var f = Math.abs(b - d),
                g = Math.abs(c - e);
            (this.options.ratio.value || this.that.keys.shift) && (d >= e ? f = g : g = f);
            var h = 0,
                i = 0,
                j = b + f,
                k = c + g,
                l = Math.abs(Math.round(b + f / 2)),
                m = Math.abs(Math.round(c + g / 2));
            this.options.center.value || this.that.keys.ctrl ? (j = b, k = c) : (j = l, k = m, f = Math.round(f / 2), g = Math.round(g / 2));
            var n, o, p, q, i, h;
            for (i = 0, h = g, p = g * g - f * f * g + .25 * f * f, n = 2 * g * g * i, o = 2 * f * f * h, this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage); n < o;) this.render((i + j).toFixed(0), (h + k).toFixed(0)), this.render((-i + j).toFixed(0), (h + k).toFixed(0)), this.render((i + j).toFixed(0), (-h + k).toFixed(0)), this.render((-i + j).toFixed(0), (-h + k).toFixed(0)), p < 0 ? (i++, n += 2 * g * g, p = p + n + g * g) : (i++, h--, n += 2 * g * g, o -= 2 * f * f, p = p + n - o + g * g);
            for (q = g * g * ((i + .5) * (i + .5)) + f * f * ((h - 1) * (h - 1)) - f * f * g * g; h >= 0;) this.render((i + j).toFixed(0), (h + k).toFixed(0)), this.render((-i + j).toFixed(0), (h + k).toFixed(0)), this.render((i + j).toFixed(0), (-h + k).toFixed(0)), this.render((-i + j).toFixed(0), (-h + k).toFixed(0)), q > 0 ? (h--, o -= 2 * f * f, q = q + f * f - o) : (h--, i++, n += 2 * g * g, o -= 2 * f * f, q = q + n - o + f * f)
        }
    }, r.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, r.prototype.off = function() {
        this.currentImage = !1, this.imageLoaded = !1
    }, r.prototype.restore = function() {
        this.currentImage = !1, this.imageLoaded = !1
    };
    var s = function(a) {
        this.that = a, this.used = [], this.hasOptions = !0, this.currentImage = !1, this.imageLoaded = !1, this.options = {
            lighter: {
                name: "lighter",
                Preview: "Lighter Color",
                hint: "Toggle to switch to the lighter color (Right+Click)",
                type: "checkbox",
                value: !1
            },
            strenth: {
                name: "strenth",
                type: "range",
                value: .3,
                min: .1,
                max: .9,
                step: .1
            },
            mirrorX: {
                name: "Mirror X",
                hint: "Mirror y on canvas",
                type: "checkbox",
                value: !1
            },
            mirrorY: {
                name: "Mirror Y",
                hint: "Mirror y on canvas",
                type: "checkbox",
                value: !1
            }
        }, this.listeners()
    };
    s.prototype.listeners = function() {
        var b = this;
        a("#lightendarken-range-size").on("input", function() {
            b.that.settings.lightendarken.strengh = a(this).val(), a(".ligtendarken-level").text(a(this).val())
        })
    }, s.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, s.prototype.getCurrent = function() {
        this.currentImage = this.that.canvas.layer.image(), this.load()
    }, s.prototype.active = function(a) {
        this.currentImage || this.getCurrent();
        for (var b = 500, c = 0, d = this.options.strenth.value; this.that.mouse.active && this.imageLoaded;) {
            var e = "rgba(0, 0, 0, " + d + ")";
            if ((3 == this.that.mouseEvent.which || this.options.lighter.value) && (e = "rgba(255, 255, 255, " + d + ")"), this.that.keyEvent && this.that.keyEvent.ctrlKey && (this.used = []), this.used.indexOf(this.that.mouse.x_0 + "-" + this.that.mouse.y_0) === -1 && (this.used.push(this.that.mouse.x_0 + "-" + this.that.mouse.y_0), this.that.layPixel(this.that.mouse.x_0, this.that.mouse.y_0, !1, e, !1, !0), this.that.mirrorDrawing(e)), this.that.mouse.x_0 == this.that.mouse.x_1 && this.that.mouse.y_0 == this.that.mouse.y_1) break;
            if (c++, c > b) break;
            this.that.mouseDistance()
        }
    }, s.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, s.prototype.off = function() {
        this.used = [], this.currentImage = !1, this.imageLoaded = !1
    };
    var t = function(a) {
        this.that = a, this.status = !1, this.position = !1, this.currentImage = !1, this.spacing_left = 0, this.spacing_top = 0, this.cursorShown = !1, this.history = [], this.setIntTime = !1, this.hasOptions = !0, this.canCreateHistory = !1, this.font_size = 1, this.size = 1, this.initActive = !1, this.callbackPrompt = !1, this.options = {
            font: {
                name: "font",
                type: "fonts",
                value: 1,
                hideApp: !0
            },
            textsize: {
                name: "textsize",
                preview: "Font Size",
                type: "range",
                value: 1,
                min: 1,
                max: 8,
                step: 1,
                self: this,
                fn: this.setSizeText
            }
        }, this.init()
    };
    t.prototype.setSizeText = function(b) {
        var c = this.self ? this.self : this;
        c.size = b ? b : c.size;
        var d = c.that.textData[c.that.textData.current].height * c.size;
        a(".text-size-level, #range-textsize-preview").text(d)
    }, t.prototype.init = function() {
        this.listeners()
    }, t.prototype.listeners = function() {
        var b = this;
        a("#text-size").on("input", function() {
            b.setSizeText(a(this).val())
        }), a("#text-size").on("change", function() {
            b.size = a(this).val()
        })
    }, t.prototype.active = function(a) {
        if (this.that.mouse.active) {
            if (this.that.mouse.active = !1, this.currentImage) {
                this.drawToLayer(!1, !0)
            }
            this.preStart()
        }
        this.that.TextController.loadedFonts || this.that.TextController.appendPreviews()
    }, t.prototype.begin = function() {
        this.currentImage = this.that.canvas.layer.image(), this.that.canvas.rendering["default"](), this.history = [], this.createHistory(), this.status = !0, this.that.ToolController.renderChange = !0, this.position = {
            default_x: this.that.mouse.start_x,
            default_y: this.that.mouse.start_y,
            x: this.that.mouse.start_x,
            y: this.that.mouse.start_y
        }, this.cursor()
    }, t.prototype.preStart = function() {
        var a = this;
        this.checkSettingHistoryController(function() {
            a.canCreateHistory = !0, a.begin(), (a.that.isMobile || a.that.isIpad) && a.that.TextController.prompt()
        })
    }, t.prototype.beforeHistory = function() {
        this.currentImage && (this.that.canvas.select.clear(), clearInterval(this.setIntTime), this.setIntTime = !1, this.drawToLayer(!1, !0))
    }, t.prototype.cursor = function() {
        function a(a) {
            var c = b.that.textData[b.that.textData.current].height;
            c *= b.size, b.cursorShown ? (b.cursorShown = !1, b.that.canvas.select.clear()) : (b.cursorShown = !0, b.that.canvas.select.ctx.fillStyle = "rgba(255,255,255,0.3)", b.that.canvas.select.ctx.fillRect(b.position.x, b.position.y, 1, c), b.that.canvas.select.ctx.fillStyle = "rgba(0,0,0,0.3)", b.that.canvas.select.ctx.fillRect(b.position.x, b.position.y, 1, c)), b.position && b.drawToLayer(!0)
        }
        if (this.position) {
            var b = this;
            this.setIntTime || (this.setIntTime = setInterval(function() {
                a(!0)
            }, 250))
        }
    }, t.prototype.createHistory = function() {
        var a = {
            image: this.that.canvas.rendering.image(),
            x: this.position.x,
            y: this.position.y
        };
        this.history.push(a)
    }, t.prototype.doHistory = function() {
        this.checkSettingHistoryController()
    }, t.prototype.renderChange = function(a) {
        var b = this;
        this.drawToLayer(!1, !1, function() {
            b.checkSettingHistoryController(function() {
                return a()
            })
        })
    }, t.prototype.checkSettingHistoryController = function(a) {
        var b = this;
        if (this.position && this.history.length >= 2 || this.canCreateHistory) this.that.LayerController.updateLayer(!1, function() {
            b.that.HistoryController.create(!1, function() {
                if (b.canCreateHistory = !1, a) return a(!0)
            })
        });
        else if (a) return a(!0)
    }, t.prototype.use = function(a, b, c) {
        var d = b ? b : a.which,
            e = d;
        if (this.callbackPrompt = !1, c && (this.callbackPrompt = c), this.position) {
            if (8 == d) return void this.backSpace();
            var f = this.that.textData.current;
            !b && a.shiftKey && (d = "s" + d);
            var g = this.that.textData[f][d];
            if ("object" == typeof g || [13, 32].indexOf(d) !== -1) {
                this.createHistory();
                var h = this,
                    i = this.that.textData[f][d];
                if (this.spacing_left = this.that.textData[f].spacing_left, this.spacing_top = this.that.textData[f].spacing_top, "object" == typeof this.that.textData[f][d] && (i = this.that.textData[f][d].image, this.spacing_left = this.that.textData[f][d].spacing_left, this.spacing_top = this.that.textData[f][d].spacing_top), this.spacing_left *= this.size, 32 == e) return this.updatePosition(parseInt(this.position.x) + parseInt(this.spacing_left), this.position.y), void(this.callbackPrompt && this.callbackPrompt());
                if (13 == d) return void this.returnKey();
                "#000000" != h.that.ColorController.color ? h.that.loadImage(i, function(a) {
                    h.that.canvasToSolid(a, !1, !1, !0, function(a) {
                        h.renderData(a, !0)
                    })
                }) : this.renderData(i, !0)
            } else this.callbackPrompt && this.callbackPrompt()
        }
    }, t.prototype.renderData = function(a, b, c) {
        var d = this;
        this.that.loadImage(a, function(a) {
            var c = a.width * d.size,
                e = a.height * d.size;
            d.that.canvas.data.canvas.width = c, d.that.canvas.data.canvas.height = e, d.that.canvas.data.setSmoothing(), d.that.canvas.data.ctx.drawImage(a, 0, 0, c, e), b && d.callback()
        })
    }, t.prototype.callback = function() {
        this.that.canvas.rendering.putSimple(this.that.canvas.data.canvas, this.position.x, this.position.y), this.updatePosition(parseInt(this.position.x) + parseInt(this.spacing_left), this.position.y), this.drawToLayer(), this.callbackPrompt && this.callbackPrompt()
    }, t.prototype.drawToLayer = function(a, b, c) {
        if (this.currentImage) return this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas), a ? this.that.renderAfter.push(this.that.canvas.select.canvas) : this.that.canvas.select.clear(), b || this.that.render(), c ? c(!0) : void 0
    }, t.prototype.updatePosition = function(a, b) {
        this.position.x = a, this.position.y = b
    }, t.prototype.backSpace = function() {
        if (this.history.length >= 2) {
            var a = this.history[this.history.length - 1],
                b = a.x,
                c = a.y,
                d = a.image;
            this.that.canvas.rendering.clear(), this.that.canvas.rendering.putSimple(d), this.updatePosition(b, c), this.drawToLayer(), this.history.pop()
        }
    }, t.prototype.restore = function() {
        this.drawToLayer(), this.that.canvas.select.clear(), this.position = !1, this.history = [], this.currentImage = !1, this.cursorShown = !1, clearInterval(this.setIntTime), this.setIntTime = !1, this.status = !1
    }, t.prototype.returnKey = function() {
        this.position.y = this.position.y + parseInt(this.spacing_top) * this.size, this.position.x = this.position.default_x
    }, t.prototype.on = function() {
        this.setSizeText()
    };
    var u = function(a) {
        this.that = a, this.currentImage = !1, this.imageData = !1
    };
    u.prototype.active = function(a) {
        this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.imageData = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height)), this.currentImage && this.changeColor(a)
    }, u.prototype.changeColor = function(a) {
        for (var b, c, d, e = 0, f = this.imageData.length; e < f; e += 4) {
            b = this.imageData.length[e], c = this.imageData.length[e + 1], d = this.imageData.length[e + 2];
            var g = that.that.RGBtoHSV(b, c, d);
            g.h += a;
            var h = that.that.HSVtoRGB(g.h, g.s, g.v);
            this.imageData.length[e] = h.r, this.imageData.length[e + 1] = h.g, this.imageData.length[e + 2] = h.b
        }
        this.that.canvas.layer.ctx.putImageData(map, 0, 0)
    }, u.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, u.prototype.off = function(a) {
        this.currentImage = !1, this.imageData = !1
    }, u.prototype.restore = function(a) {
        this.currentImage = !1, this.imageData = !1
    };
    var v = function(a) {
        this.that = a, this.isOdd = !1, this.setIsOff = !1, this.status = !1, this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1, this.hasOptions = !0, this.options = {
            spacing: {
                name: "spacing",
                preview: "Spacing",
                type: "dropdown",
                value: "1",
                values: ["1", "2", "3", "4", "5"],
                self: this,
                fn: this.changeSpacing
            }
        }, this.options.spacing.value = this.that.settings.ditherSpacing
    };
    v.prototype.changeSpacing = function(a) {
        var b = this.self ? this.self : this;
        b.options.spacing.value = a, b.that.settings.ditherSpacing = parseInt(a), b.that.updateSettings()
    }, v.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, v.prototype.active = function(a) {
        this.currentImage || (this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage));
        var b = 500,
            c = 0;
        Math.abs(this.that.mouse.start_x - this.that.mouse.x_1), Math.abs(this.that.mouse.start_y - this.that.mouse.y_1), this.that.mouse.start_x, this.that.mouse.start_y;
        for (this.that.mouse.active && !this.setIsOff && (this.setIsOff = !0); this.that.mouse.active && this.currentImage && (this.that.ditheringLayPixel(!1, !1, !1, "rendering", this.isOdd), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas), !(this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height)) && (this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (c++, !(c > b));) {
            this.that.mouseDistance()
        }
    }, v.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, v.prototype.off = function() {
        this.status = !1, this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1, this.isOdd = !1, this.setIsOff = !1
    }, v.prototype.restore = function() {
        this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1, this.isOdd = !1, this.setIsOff = !1
    };
    var w = function(a) {
        this.that = a, this.restore()
    };
    w.prototype.active = function(a) {
        this.that.mouse.active && this.that.StampController.showStampContainer()
    }, w.prototype.restore = function(a) {
        this.that.StampController.hideStampContainer()
    };
    var z = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.selectColor = "rgba(255,255,255,0.6)", this.selectColorPrimary = "rgba(0,0,0,0.6)", this.selectionActive = !1, this.closeLineActive = !1, this.start_x = 0, this.start_y = 0, this.last_x = 0, this.last_y = 0, this.selectingStyle = "normal", this.used = [], this.canErase = !0
    };
    z.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, z.prototype.getCurrent = function() {
        this.currentImage = this.that.canvas.layer.image(), this.load()
    }, z.prototype.active = function() {
        this.currentImage || this.getCurrent();
        var a = this.that.maxHeight,
            b = 0;
        for (this.that.mouse.active && this.canErase && (this.that.canvas.select.clear(), this.canErase = !1); this.that.mouse.active && this.imageLoaded || this.closeLineActive;) {
            var c = this.that.mouse.x_0 + "-" + this.that.mouse.y_0;
            if (this.that.SelectController.usingLasso = !0, this.start_x || (this.start_x = this.that.mouse.x_0, this.start_y = this.that.mouse.y_0, this.that.SelectController.currentSelectImage = !1), this.used.indexOf(c) === -1 && (this.used.push(c), this.draw(this.that.mouse.x_0, this.that.mouse.y_0)), this.closeLineActive || (this.last_x = this.that.mouse.x_1, this.last_y = this.that.mouse.y_1), this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height, this.that.mouse.x_0 == this.that.mouse.x_1 && this.that.mouse.y_0 == this.that.mouse.y_1 || this.that.mouse.x_0 == this.that.mouse.last_x && this.that.mouse.y_0 == this.that.mouse.last_y) {
                this.closeLineAction();
                break
            }
            if (this.selectionActive = !0, b++, b > a) {
                this.closeLineAction();
                break
            }
            this.that.mouseDistance()
        }
        this.render()
    }, z.prototype.draw = function(a, b, c) {
        a < 0 && (a = 0), a > this.that.width - 1 && (a = this.that.width - 1), b < 0 && (b = 0), b > this.that.height - 1 && (b = this.that.height - 1), this.that.canvas.select.ctx.fillStyle = c ? c : this.selectColor, this.that.canvas.select.ctx.fillRect(a, b, 1, 1), this.that.canvas.select.ctx.fillStyle = c ? c : this.selectColorPrimary, this.that.canvas.select.ctx.fillRect(a, b, 1, 1)
    }, z.prototype.render = function() {
        this.that.renderAfter.push(this.that.canvas.select.canvas)
    }, z.prototype.closeLineAction = function() {
        this.closeLineActive && (this.that.mouse.prevent = !1, this.closeLineActive = !1, this.bucketImage(), this.render(), this.that.render())
    }, z.prototype.bucketImage = function() {
        var a = this;
        this.that.width, this.that.height;
        this.that.getDrawnPixels(function(b, c, d, e, f, g, h) {
            c += 2, d += 2, a.that.canvas.rendering.clear(), a.that.canvas.rendering.canvas.width = c, a.that.canvas.rendering.canvas.height = d, a.that.canvas.rendering.putSimple(a.that.canvas.select.canvas, -(e - 1), -(f - 1)), a.that.bucketCreate(function() {
                a.that.canvas.select.clear(), a.that.canvas.rendering.canvas.width = a.that.width, a.that.canvas.rendering.canvas.height = a.that.height, a.that.canvas.select.putSimple(a.that.canvas.data.canvas, e - 1, f - 1), a.that.canvas.select.ctx.fillStyle = "#000000", a.that.canvas.select.ctx.fillRect(0, 0, a.that.width, f), a.that.canvas.select.ctx.fillRect(0, f - 1 + d, a.that.width, a.that.height), a.that.canvas.select.ctx.fillRect(0, 0, e, a.that.height), a.that.canvas.select.ctx.fillRect(e - 1 + c, 0, a.that.width, a.that.height), a.extract()
            }, !1, !0, c - 1, d - 1, "rendering", c, d)
        }, "select")
    }, z.prototype.extract = function() {
        var a = this;
        this.that.canvas.data.clear(), this.that.canvas.data.putSimple(this.currentImage), this.that.canvas.data.ctx.globalCompositeOperation = "destination-out", this.that.canvas.data.putSimple(this.that.canvas.select.canvas), this.that.canvas.data.ctx.globalCompositeOperation = "source-over", this.that.canvas.rendering.clear(), this.that.canvas.rendering.putSimple(this.currentImage), this.that.canvas.rendering.ctx.globalCompositeOperation = "destination-in", this.that.canvas.rendering.putSimple(this.that.canvas.select.canvas), this.that.canvas.rendering.ctx.globalCompositeOperation = "source-over";
        var b = this.that.canvas.rendering.ctx.getImageData(0, 0, this.that.width, this.that.height);
        this.that.getDrawnPixels(function(c, d, e, f, g, h, i) {
            a.that.canvas.rendering.clear(), a.that.canvas.rendering.canvas.width = d, a.that.canvas.rendering.canvas.height = e, a.that.canvas.rendering.ctx.putImageData(c, -f, -g), a.that.canvas.data.clear(), a.that.canvas.data.canvas.width = d, a.that.canvas.data.canvas.height = e, a.that.canvas.data.ctx.putImageData(b, -f, -g), a.that.SelectController.cutImageData = a.that.canvas.data.image();
            var j = a.that.canvas.rendering.image();
            j.onload = function() {
                var b = a.that.SelectController.copyDataFormat(this, d, e);
                a.that.SelectController.cut_width = 0, a.that.SelectController.cut_height = 0, a.restore(), a.that.ToolController.tool = a.that.ToolController.tools.SelectTool, a.that.ToolController.tool.setSelection(f, g, d, e, d, e, !0), a.that.SelectController.pasteSelection(f, g, f, g, !0, !0, b), a.that.SelectController.showStampButton(), a.that.render()
            }
        }, "data"), this.that.canvas.select.clear()
    }, z.prototype.mouseCorrection = function() {
        this.that.mouse.prevent = !0, this.last_x > this.that.width - 1 && (this.last_x = this.that.width - 1), this.last_y > this.that.height - 1 && (this.last_y = this.that.height - 1), this.that.mouse.dx = Math.abs(this.last_x - this.start_x), this.that.mouse.dy = Math.abs(this.last_y - this.start_y), this.that.mouse.sx = this.start_x < this.last_x ? 1 : -1, this.that.mouse.sy = this.start_y < this.last_y ? 1 : -1, this.that.mouse.err = this.that.mouse.dx - this.that.mouse.dy, this.that.mouse.x_1 = this.last_x, this.that.mouse.y_1 = this.last_y, this.that.mouseDistance(this.start_x, this.start_y)
    }, z.prototype.close = function(a) {
        this.mouseCorrection(), this.closeLineActive = !0, this.active()
    }, z.prototype.off = function(a) {
        this.selectionActive && (this.close(), this.selectionActive = !1), this.restore(), this.that.isApp && this.getCurrent()
    }, z.prototype.restore = function(a) {
        this.currentImage = !1, this.imageLoaded = !1, this.canErase = !0, this.used = [], this.start_x = 0, this.start_y = 0, this.that.SelectController.usingLasso = !1
    };
    var A = function(a) {
        this.that = a, this.currentImage = !1, this.currentSelectImage = !1, this.imageLoaded = !1, this.imageSelectLoaded = !1, this.selectColor = "rgba(255,255,255,0.6)", this.selectColorPrimary = "rgba(0,0,0,0.6)", this.selectionActive = !1, this.closeLineActive = !1, this.start_x = 0, this.start_y = 0, this.last_x = 0, this.last_y = 0, this.last_mouse_x = 0, this.last_mouse_y = 0, this.current_mouse_x = -1, this.current_mouse_y = -1, this.hasPoint = !1, this.selectingStyle = "normal", this.canErase = !0, this.keySet = !1
    };
    A.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, A.prototype.getCurrent = function() {
        this.currentImage = this.that.canvas.layer.image(), this.load()
    }, A.prototype.getSelectCurrent = function() {
        var a = this;
        this.currentSelectImage = this.that.canvas.select.image(), this.currentSelectImage.onload = function() {
            a.imageSelectLoaded = !0, a.currentSelectImage = this
        }
    }, A.prototype.active = function() {
        this.currentImage || (this.that.canvas.select.clear(), this.getCurrent(), this.getSelectCurrent());
        var a = this.that.maxHeight,
            b = 0;
        for (this.that.mouse.active && this.canErase && (this.that.canvas.select.clear(), this.canErase = !1), this.that.mouse.active && this.imageLoaded && this.that.canvas.select.clear(), this.that.mouse.active && (this.that.SelectController.active = !0); this.closeLineActive || this.that.mouse.active && this.that.SelectController.active && this.hasPoint;) {
            if (this.start_x || (this.start_x = this.that.mouse.x_0, this.start_y = this.that.mouse.y_0, this.that.SelectController.currentSelectImage = !1), this.draw(this.that.mouse.x_0, this.that.mouse.y_0), this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height, this.that.mouse.x_0 == this.that.mouse.x_1 && this.that.mouse.y_0 == this.that.mouse.y_1 || this.that.mouse.x_0 == this.that.mouse.last_x && this.that.mouse.y_0 == this.that.mouse.last_y) {
                this.closeLineAction();
                break
            }
            if (this.closeLineActive || (this.last_x = this.that.mouse.x_1, this.last_y = this.that.mouse.y_1), this.selectionActive = !0, b++, b > a) {
                this.closeLineAction();
                break
            }
            this.that.mouseDistance()
        }
        this.render()
    }, A.prototype.setPoint = function() {
        return this.hasPoint = !0, this.start_x == this.that.mouse.x_1 && this.start_y == this.that.mouse.y_1 ? this.close() : (this.getSelectCurrent(), this.that.mouse.start_x = this.that.mouse.x_1, void(this.that.mouse.start_y = this.that.mouse.y_1))
    }, A.prototype.ctrl = function(a) {
        !this.keySet, this.keySet = a
    }, A.prototype.draw = function(a, b, c) {
        this.that.canvas.select.putSimple(this.currentSelectImage), this.that.canvas.select.ctx.fillStyle = c ? c : this.selectColor, this.that.canvas.select.ctx.fillRect(a, b, 1, 1), this.that.canvas.select.ctx.fillStyle = c ? c : this.selectColorPrimary, this.that.canvas.select.ctx.fillRect(a, b, 1, 1)
    }, A.prototype.render = function() {
        this.that.renderAfter.push(this.that.canvas.select.canvas)
    }, A.prototype.closeLineAction = function() {
        this.closeLineActive && (this.that.mouse.prevent = !1, this.closeLineActive = !1, this.bucketImage(), this.render(), this.that.render())
    }, A.prototype.bucketImage = function() {
        var a = this;
        this.that.width, this.that.height;
        this.that.getDrawnPixels(function(b, c, d, e, f, g, h) {
            c += 2, d += 2, a.that.canvas.rendering.clear(), a.that.canvas.rendering.canvas.width = c, a.that.canvas.rendering.canvas.height = d, a.that.canvas.rendering.putSimple(a.that.canvas.select.canvas, -(e - 1), -(f - 1)), a.that.bucketCreate(function() {
                a.that.canvas.select.clear(), a.that.canvas.rendering.canvas.width = a.that.width, a.that.canvas.rendering.canvas.height = a.that.height, a.that.canvas.select.putSimple(a.that.canvas.data.canvas, e - 1, f - 1), a.that.canvas.select.ctx.fillStyle = "#000000", a.that.canvas.select.ctx.fillRect(0, 0, a.that.width, f), a.that.canvas.select.ctx.fillRect(0, f - 1 + d, a.that.width, a.that.height), a.that.canvas.select.ctx.fillRect(0, 0, e, a.that.height), a.that.canvas.select.ctx.fillRect(e - 1 + c, 0, a.that.width, a.that.height), a.extract()
            }, !1, !0, c - 1, d - 1, "rendering", c, d)
        }, "select")
    }, A.prototype.extract = function() {
        var a = this;
        this.that.canvas.data.clear(), this.that.canvas.data.putSimple(this.currentImage), this.that.canvas.data.ctx.globalCompositeOperation = "destination-out", this.that.canvas.data.putSimple(this.that.canvas.select.canvas), this.that.canvas.data.ctx.globalCompositeOperation = "source-over", this.that.canvas.rendering.clear(), this.that.canvas.rendering.putSimple(this.currentImage), this.that.canvas.rendering.ctx.globalCompositeOperation = "destination-in", this.that.canvas.rendering.putSimple(this.that.canvas.select.canvas), this.that.canvas.rendering.ctx.globalCompositeOperation = "source-over";
        var b = this.that.canvas.rendering.ctx.getImageData(0, 0, this.that.width, this.that.height);
        this.that.getDrawnPixels(function(c, d, e, f, g, h, i) {
            a.that.canvas.rendering.clear(), a.that.canvas.rendering.canvas.width = d, a.that.canvas.rendering.canvas.height = e, a.that.canvas.rendering.ctx.putImageData(c, -f, -g), a.that.canvas.data.clear(), a.that.canvas.data.canvas.width = d, a.that.canvas.data.canvas.height = e, a.that.canvas.data.ctx.putImageData(b, -f, -g), a.that.SelectController.cutImageData = a.that.canvas.data.image();
            var j = a.that.canvas.rendering.image();
            j.onload = function() {
                var b = a.that.SelectController.copyDataFormat(this, d, e);
                a.that.SelectController.cut_width = 0, a.that.SelectController.cut_height = 0, a.restore(), a.that.ToolController.tool = a.that.ToolController.tools.SelectTool, a.that.ToolController.tool.setSelection(f, g, d, e, d, e, !0), a.that.SelectController.pasteSelection(f, g, f, g, !0, !0, b), a.that.SelectController.showStampButton(), a.that.render()
            }
        }, "data"), this.that.canvas.select.clear()
    }, A.prototype.mouseCorrection = function() {
        this.that.mouse.prevent = !0, this.that.mouse.dx = Math.abs(this.last_x - this.start_x), this.that.mouse.dy = Math.abs(this.last_y - this.start_y), this.that.mouse.sx = this.start_x < this.last_x ? 1 : -1, this.that.mouse.sy = this.start_y < this.last_y ? 1 : -1, this.that.mouse.err = this.that.mouse.dx - this.that.mouse.dy, this.that.mouseDistance(this.start_x, this.start_y)
    }, A.prototype.close = function(a) {
        this.mouseCorrection(), this.closeLineActive = !0, this.that.SelectController.active = !1, this.that.mouse.active = !1, this.hasPoint = !1, this.active()
    }, A.prototype.doubleClick = function() {
        this.close()
    }, A.prototype.off = function(a) {
        this.selectionActive, this.that.isApp && this.getCurrent()
    }, A.prototype.restore = function(a) {
        this.currentImage = !1, this.imageLoaded = !1, this.canErase = !0, this.start_x = 0, this.start_y = 0, this.that.SelectController.active = !1, this.that.mouse.active = !1, this.hasPoint = !1, this.that.canvas.select.clear(), this.that.render()
    };
    var B = function(a) {
        this.that = a, this.currentImage = !1, this.bucketImage = !1, this.imageLoaded = !1
    };
    B.prototype.getCurrent = function() {
        this.currentImage = this.that.canvas.layer.image(), this.load()
    }, B.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, B.prototype.active = function(a) {
        var b = this;
        this.currentImage || this.getCurrent(), this.that.bucketCreate(function() {
            b.bucketImage = b.that.canvas.data.image(), b.bucketImage.onload = function() {
                b.extract()
            }
        }, a, !0), this.that.mouse.active = !1
    }, B.prototype.extract = function() {
        var a = this;
        this.that.canvas.data.clear(), this.that.canvas.data.putSimple(this.currentImage), this.that.canvas.data.ctx.globalCompositeOperation = "destination-in", this.that.canvas.data.putSimple(this.bucketImage), this.that.canvas.data.ctx.globalCompositeOperation = "source-over", this.that.canvas.rendering.clear(), this.that.canvas.rendering.putSimple(this.currentImage), this.that.canvas.rendering.ctx.globalCompositeOperation = "destination-out", this.that.canvas.rendering.putSimple(this.bucketImage), this.that.canvas.rendering.ctx.globalCompositeOperation = "source-over";
        var b = this.that.canvas.rendering.ctx.getImageData(0, 0, this.that.width, this.that.height);
        this.that.getDrawnPixels(function(c, d, e, f, g, h, i) {
            a.that.canvas.rendering.clear(), a.that.canvas.rendering.canvas.width = d, a.that.canvas.rendering.canvas.height = e, a.that.canvas.rendering.ctx.putImageData(c, -f, -g), a.that.canvas.data.clear(), a.that.canvas.data.canvas.width = d, a.that.canvas.data.canvas.height = e, a.that.canvas.data.ctx.putImageData(b, -f, -g), a.that.SelectController.cutImageData = a.that.canvas.data.image();
            var j = a.that.canvas.rendering.image();
            j.onload = function() {
                a.that.SelectController.copySection(this, !1, !0), a.that.SelectController.cut_width = 0, a.that.SelectController.cut_height = 0, a.restore(), a.that.ToolController.tool = a.that.ToolController.tools.SelectTool, a.that.ToolController.tool.setSelection(f, g, d, e, d, e, !0), a.that.SelectController.pasteSelection(f, g, f, g, !0), a.that.SelectController.showStampButton(), a.that.render()
            }
        }, "data"), this.that.canvas.select.clear()
    }, B.prototype.restore = function(a) {
        this.currentImage = !1, this.imageLoaded = !1, this.bucketImage = !1
    };
    var C = function(a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.initClick = !1, this.hasOptions = !0, this.grid = {
            status: !1,
            x: 0,
            y: 0
        }, this.hasOptions = !0, this.options = {
            preview: {
                name: "Solid Color",
                type: "brush",
                value: ""
            },
            solid: {
                name: "Solid Color",
                hint: "Toggle to create solid color",
                type: "checkbox",
                value: !0
            },
            track: {
                name: "Track",
                hint: "Trail brush with each stroke",
                type: "checkbox",
                value: !0
            },
            spacing: {
                name: "spacing",
                type: "range",
                value: 0,
                min: 0,
                max: 100,
                step: 1
            },
            alpha: {
                name: "alpha",
                preview: "Opacity",
                type: "range",
                value: 1,
                min: .1,
                max: 1,
                step: "0.1"
            },
            brushsize: {
                name: "brushsize",
                preview: "Brush Size",
                type: "range",
                value: 16,
                min: 2,
                max: 100,
                step: 1
            },
            pattern: {
                name: "Pattern",
                hint: "Reveal pattern",
                type: "checkbox",
                value: !1,
                require: "stamps",
                hideApp: !0
            },
            stamps: {
                type: "stamps",
                hideApp: !0
            }
        }, this.size = !1, this.currentBrushImage = !1, this.init()
    };
    C.prototype.init = function() {
        this.that.settings.brush.image && this.that.settings.brush.image.src || this["new"](), this.listeners()
    }, C.prototype.listeners = function() {
        var b = this;
        a(document).on("click", ".br-image", function() {
            var c = a(this).attr("data-image");
            b.fromSrc(c), b.that.hidePopup()
        }), a("#tool-option-appended, #extra-panel-content").on("change", "#range-brushsize", function() {
            b.size = a(this).val(), b.changeSize()
        })
    }, C.prototype.changeSize = function() {
        this.currentBrushImage || (this.currentBrushImage = jQuery.extend(!0, {}, this.that.settings.brush));
        var a = this.size,
            b = this.size;
        if (this.currentBrushImage.width > this.currentBrushImage.height) {
            var c = this.currentBrushImage.height / this.currentBrushImage.width;
            b = c * this.size
        } else {
            var c = this.currentBrushImage.width / this.currentBrushImage.height;
            a = c * this.size
        }
        b <= 0 && (b = 1), a <= 0 && (a = 1), this.that.canvas.rendering["default"](), this.that.canvas.rendering.canvas.width = Math.abs(a), this.that.canvas.rendering.canvas.height = Math.abs(b), this.that.canvas.rendering.setSmoothing(), this.that.canvas.rendering.ctx.drawImage(this.currentBrushImage.image, 0, 0, a, b), this.fromSrc(this.that.canvas.rendering.dataURL(), !0)
    }, C.prototype.fromSrc = function(a, b) {
        var c = this,
            d = !b;
        this.that.loadImage(a, function(a) {
            c.set(a, d)
        })
    }, C.prototype["new"] = function(a) {
        this.fromSrc(this.that.ToolController.brushes[0])
    }, C.prototype.destroy = function() {
        this.that.settings.brush.image = !1
    }, C.prototype.set = function(a, b) {
        b && (this.currentBrushImage = !1), this.that.settings.brush.image = a, this.that.settings.brush.width = a.width, this.that.settings.brush.height = a.height, this.that.settings.brush.solid = this.that.canvasToSolid(this.that.settings.brush.image, !1, !1, !0), this.that.settings.brush.black = this.that.canvasToSolid(this.that.settings.brush.image, "#000000", !1, !0), this.that.settings.brush.mouse = this.that.canvasToSolid(this.that.settings.brush.image, "#000000", .25, !0), this.that.ToolController.setBrushImage(), this.setOptions(), this.that.ToolController.loadOptions(), this.that.canvas.rendering["default"]()
    }, C.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, C.prototype.getCurrent = function() {
        this.that.canvas.data["default"](), this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, C.prototype.active = function(a) {
        var b = 500,
            c = 0;
        if (!this.currentImage) return void this.getCurrent();
        if (this.that.mouse.active && this.currentImage && this.that.keys.shift && (this.that.canvas.rendering.clear(), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.options.track.value)
            for (!this.that.mouse.active || this.initClick || this.that.keyEvent || (this.initClick = !0); this.that.mouse.active && this.imageLoaded && (this.that.layPixel(!1, !1, !1, !1, "rendering", 1), this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height, this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (c++, !(c > b));) {
                this.that.mouseDistance()
            } else this.that.mouse.active && (this.that.layPixel(!1, !1, !1, !1, "rendering", 1), this.initClick = !0);
        (this.that.mouse.active && this.imageLoaded || this.that.mouse.activeForceReady) && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage), this.options.pattern.value ? this.that.ToolController.drawToCanvas(this.that.canvas.data.canvas, "layer") : this.that.ToolController.drawToCanvas(this.that.canvas.rendering.canvas, "layer"))
    }, C.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, C.prototype.colorPicker = function() {
        this.that.ColorController.color = "#" + this.that.mouse.getPixel(this.that.mouse.x1, this.that.mouse.y1), this.that.ColorController.select()
    }, C.prototype.on = function() {
        this.setOptions()
    }, C.prototype.setOptions = function() {
        a("#range-brushsize-preview").text(this.that.settings.brush.width), a("#range-brushsize").val(this.that.settings.brush.width)
    }, C.prototype.off = function(a) {
        this.that.pixelPerfect.set = 0, this.that.pixelPerfect.direction = "", this.that.pixelPerfect.history = [], this.that.pixelPerfect.preHistory = [], this.initClick = !1, this.currentImage = !1, this.imageLoaded = !1, this.that.isApp && this.getCurrent()
    }, C.prototype.restore = function(a) {
        this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1, this.currentBrushImage = !1
    };
    var D = function(a) {
        this.that = a, this.startX = !1, this.startY = !1, this.endX = 0, this.endY = 0, this.method = "real", this.currentImage = !1, this.imageLoaded = !1, this.hasOptions = !0, this.fillPositions = [], this.canvas = "rendering", this.options = {
            secondary: {
                name: "secondary",
                preview: "Set Secondary Color",
                hint: "",
                type: "button",
                bgColor: !0,
                value: "#0000ff",
                onlyApp: !0,
                self: this,
                fn: this.toggleSecondaryColor
            },
            dithering: {
                name: "Bayer Dithering",
                hint: "Add dithering",
                type: "checkbox",
                value: !0
            },
            ditherstyle: {
                name: "ditherstyle",
                preview: "Dithering Matrix",
                type: "dropdown",
                value: "8",
                values: ["2", "4", "8"],
                self: this,
                fn: this.changeDithering
            },
            transparent: {
                name: "Transparent Secondary",
                hint: "Make secondary color transparent",
                type: "checkbox",
                value: !0
            },
            iso: {
                name: "Iso",
                hint: "Create gradient in iso format",
                type: "checkbox",
                value: !1
            },
            radial: {
                name: "Radial",
                hint: "Create a radial/circular gradient",
                type: "checkbox",
                value: !1
            },
            bucket: {
                name: "Bucket Fill",
                hint: "Fill all similar grouped colors",
                type: "checkbox",
                value: !1,
                cancels: ["bucketAll"]
            },
            bucketAll: {
                name: "Bucket All Colors",
                hint: "Fill all similar colors",
                type: "checkbox",
                value: !1,
                cancels: ["bucket"]
            }
        }
    };
    D.prototype.load = function() {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function() {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, D.prototype.toggleSecondaryColor = function() {
        this.value = this.self.that.ColorController.color, this.self.that.ColorController.secondary = this.value, this.self.that.ToolController.loadOptions()
    }, D.prototype.active = function(a) {
        if (this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.imageLoaded && (!this.startX && this.options.bucket.value || !this.startX && this.options.bucketAll.value)) {
            this.that.bucketCreate(function() {}, this.options.bucketAll.value)
        }
        this.that.mouse.active && this.imageLoaded && (this.that.canvas.layer.clear(), this.that.canvas[this.canvas].clear(), this.that.canvas[this.canvas].putSimple(this.currentImage));
        this.that.maxWidth;
        this.that.mouse.active && this.imageLoaded && (this.startX || (this.startX = this.that.mouse.x_0, this.startY = this.that.mouse.y_0, 0 == this.startX && (this.startX = 1)), this.endX = this.that.mouse.x_0, this.endY = this.that.mouse.y_0, 0 == this.endX && (this.endX = 1), 0 == this.endY && (this.endY = 1), this.apply())
    }, D.prototype.changeDithering = function(a) {
        var b = this.self ? this.self : this;
        b.options.ditherstyle.value = a
    }, D.prototype.apply = function() {
        if (this.startX) {
            if (this.startX == this.endX && this.startY == this.endY) return void this.that.canvas.layer.putSimple(this.currentImage);
            var a = Math.abs(this.startX - this.endX),
                b = Math.abs(this.startY - this.endY),
                c = Math.max(a, b);
            if (c <= 0 && (c = 1), this.options.radial.value) var d = this.that.canvas[this.canvas].ctx.createRadialGradient(this.startX, this.startY, 1, this.startX, this.startY, c);
            else var d = this.that.canvas[this.canvas].ctx.createLinearGradient(this.startX, this.startY, this.endX, this.endY);
            var e = this.that.ColorController.secondary;
            if (this.that.isApp && this.options.secondary.value && (e = this.options.secondary.value), this.options.transparent.value || this.that.isMobile && !this.that.isTablet && !this.that.isApp) {
                e = "transparent";
                var f = this.that.hexToRgb(this.that.ColorController.color);
                e = "rgba(" + f.r + "," + f.g + "," + f.b + ", 0)"
            }
            if ("object" == typeof this.options.radial && this.options.radial.value) {
                var a = Math.abs(this.startX - this.endX),
                    b = Math.abs(this.startY - this.endY);
                Math.max(a, b)
            }
            var g = this.that.ColorController.color,
                h = this.options.radial.value ? "radial" : "linear";
            if (g.indexOf("#") == -1 && (g = "#" + g), d.addColorStop(0, g), d.addColorStop(1, e), this.that.canvas[this.canvas].ctx.fillStyle = d, this.that.canvas[this.canvas].ctx.fillRect(0, 0, this.that.width, this.that.height), this.options.bucket.value || this.options.bucketAll.value) {
                var i = this.that.canvas[this.canvas].ctx.getImageData(0, 0, this.that.width, this.that.height);
                this.that.canvas[this.canvas].clear(), this.options.dithering.value && (i = this.that.applyDithering(i, this.that.width, this.that.height, this.options.ditherstyle.value, this.startX, this.startY, this.endX, this.endY, this.options.transparent.value, h)), this.that.settings.dithering && (i = this.ditherImageData(i)), this.that.canvas[this.canvas].ctx.putImageData(i, 0, 0), this.that.canvas[this.canvas].ctx.globalCompositeOperation = "destination-in", this.that.canvas[this.canvas].putSimple(this.that.canvas.data.canvas), this.that.canvas[this.canvas].ctx.globalCompositeOperation = "source-over", this.that.canvas.layer.putSimple(this.currentImage), this.that.canvas.layer.putSimple(this.that.canvas[this.canvas].canvas)
            } else {
                if (this.options.dithering.value) {
                    var i = this.that.canvas[this.canvas].ctx.getImageData(0, 0, this.that.width, this.that.height);
                    i = this.that.applyDithering(i, this.that.width, this.that.height, this.options.ditherstyle.value, this.startX, this.startY, this.endX, this.endY, this.options.transparent.value, h), this.that.canvas[this.canvas].ctx.clearRect(0, 0, this.that.width, this.that.height), this.that.canvas[this.canvas].ctx.putImageData(i, 0, 0), this.that.canvas.layer.putSimple(this.currentImage)
                }
                this.that.settings.dithering && (this.that.renderGlobalDither(this.canvas), this.that.canvas.layer.putSimple(this.currentImage)), this.that.canvas.layer.putSimple(this.that.canvas[this.canvas].canvas)
            }
        }
    }, D.prototype.dittering = function(a, b) {
        return
    }, D.prototype.cancel = function() {
        this.currentImage && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage)), this.off()
    }, D.prototype.off = function() {
        this.startX = !1, this.startY = !1, this.currentImage = !1, this.imageLoaded = !1, this.fillPositions = [], this.that.OnlineController.writeLayer()
    }, D.prototype.restore = function() {
        this.startX = !1, this.startY = !1, this.currentImage = !1, this.imageLoaded = !1
    };
    var E = function(a) {
        this.that = a, this.tools = {}, this.tool = !1, this.createHistory = !0, this.renderChange = !1, this.multiOpen = !1, this.currentTool = !1, this.drawToCanvasRenderTimer = null, this.brushes = this.brushData(), this.backgroundPatternImageData = !1, this.backgroundPatternImage = !1
    };
    E.prototype.init = function() {
        this.listeners(), this.tools.PencilTool = new f(this.that), this.tool = this.tools.PencilTool, this.loadCustomBrushes(), this.switchCursor(this.that.tool), this.setIcon(), "object" != typeof this.tools.HandTool && (this.tools.HandTool = new i(this.that))
    }, E.prototype.listeners = function() {
        var b = this,
            c = 0;
        a(".tool-selection").on("click", function() {
            var c = a(this).attr("data-type");
            "app-stamps" != c && b.selectTool(a(this), c)
        }), a(".tool-selection").on("mousedown", function(c) {
            var d = a(this).attr("data-type");
            switch (event.which) {
                case 3:
                    b.selectTool(a(this), d), b.checkMulti()
            }
        }), a(".tool-selection").on("mouseup", function(a) {
            b.multiChecking && (b.multiOpen = !0)
        }), a(".tool-selection").on("mousedown", function() {
            var d = a(this),
                e = a(this).attr("data-type");
            c = setTimeout(function() {
                b.selectTool(d, e), b.checkMulti()
            }, 1e3)
        }).on("mouseup mouseleave", function() {
            clearTimeout(c)
        }), a(".set-brush").bind("pointerdown", function() {
            b.that.SelectController.setBrush()
        }), a(".set-pattern").click(function() {
            b.that.SelectController.setPattern()
        }), a(".mirror-tool").click(function() {
            b.mirrorToggle(a(this))
        }), a(".close-extras").click(function() {}), a(".close-extras-tools").click(function() {}), a(".tool-toggle").click(function() {
            b.toolToggle(a(this))
        }), a("#tool-option-appended, #extra-panel-content").on("click", ".brush-canvas-wrapper", function() {
            b.that.showPopup("brushes", b.brushPopupHtml), b.loadBrushesElements()
        }), a("#popup-container").on("mousedown", ".bru-d", function(c) {
            if (c.preventDefault(), 3 == c.which) {
                var d = a(this).attr("data-id");
                b.subBrushData(d)
            }
        }), a("#panning-active").click(function() {
            b.offPanningButton()
        }), this.that.isApp ? a("#drawing-page").on("click", ".tool-option-checkbox", function() {
            var c = a(this).find("input"),
                d = a(this).attr("data-set"),
                e = !!c.is(":checked");
            b.switchToolOption(d, e)
        }) : a("#tool-option-appended, #extra-panel-content").on("input", ".tool-option-checkbox", function() {
            var c = a(this).attr("data-set"),
                d = !!a(this).is(":checked");
            b.switchToolOption(c, d)
        }), a("#tool-option-appended, #extra-panel-content").on("input", ".tool-change", function() {
            var c = a(this).attr("data-tool"),
                d = a(this).attr("data-option"),
                e = a(this).attr("data-tag"),
                f = a(this).val();
            e && (d = e), b.tool.options[d].value = f, a(".range-" + d).val(f), a("." + c + "-" + d + "-value").text(f), "function" == typeof b.tool.options[d].fn && b.tool.options[d].fn(f)
        }), a("#tool-option-appended, #extra-panel-content").on("click", ".tool-actbtn", function() {
            var c = a(this).attr("data-option");
            "function" == typeof b.tool.options[c].fn && b.tool.options[c].fn()
        }), a("#tool-option-appended, #extra-panel-content").on("change", ".tool-change", function() {
            var c = a(this).attr("data-option");
            "function" == typeof b.tool.options[c].fnEnd && b.tool.options[c].fnEnd()
        }), a("#tool-option-appended, #extra-panel-content").on("change", ".select-tool-options", function() {
            var c = a(this).attr("data-option"),
                d = a(this).val();
            a(".select-tool-options").val(d), "function" == typeof b.tool.options[c].fn && b.tool.options[c].fn(d)
        }), a("#tool-multi").on("mousedown", ".tool-multi-opt", function() {
            var c = a(this).attr("data-id");
            b.useMulti(c)
        })
    }, E.prototype.switchToolOption = function(b, c) {
        this.tool.options[b].value = c, this.checkCancelOptions(b), this.checkToolMulti(b), a(".op-" + b).prop("checked", c), "function" == typeof this.tool.options[b].fn && this.tool.options[b].fn(c)
    }, E.prototype.useMulti = function(a) {
        this.tool.multi && this.tool.useMulti(a)
    }, E.prototype.checkMulti = function() {
        this.tool.multi && this.openMulti()
    }, E.prototype.hideMulti = function() {
        this.multiOpen && (this.multiOpen = !1, this.multiChecking = !1, a("#tool-multi").hide())
    }, E.prototype.cancel = function() {
        "function" == typeof this.tool.cancel && this.tool.cancel(), this.that.mouse.activeForce = !1, this.that.mouse.active = !1, this.that.mouse.ignoreFinish = !0, this.that.mouse.createHistory = !1, this.that.online.send = !1, this.tool.currentImage
    }, E.prototype.openMulti = function() {
        var b = a("#" + this.tool.id),
            c = b.offset().top,
            d = a("#tool-multi");
        this.multiChecking = !0, d.html(""), d.show(), d.css({
            top: c
        }), a.each(this.tool.multi, function(a, b) {
            d.append('<div class="tool-multi-opt" data-id="' + a + '" title="' + b.name + '"><img src="' + b.image + '" class="multi-item" /></div>')
        }), a("#tool-multi .tool-multi-opt").tooltipJQ({
            track: !0,
            hide: {
                effect: "fade",
                delay: 0
            }
        })
    }, E.prototype.bucketBackgroundPattern = function(a) {
        var b = this;
        this.that.backgroundImageRepeat("data", this.that.stamps.data, function() {
            var a = b.that.canvas.data.ctx.getImageData(0, 0, b.that.width, b.that.height);
            b.backgroundPatternImageData = a, b.backgroundPatternImage = b.that.canvas.data.image()
        })
    }, E.prototype.checkToolMulti = function(b) {
        !this.tool.options[b].value && this.tool.options[b].multi && (b = "default"), this.tool.options[b] && this.tool.options[b].multi && this.tool.multi[b] && a("#" + this.tool.id + " .icon-tool").css({
            backgroundImage: "url(" + this.tool.multi[b].image + ")",
            backgroundPosition: "inherit"
        })
    }, E.prototype.checkCancelOptions = function(b) {
        var c = this;
        this.tool.options[b] && this.tool.options[b].cancels && a.each(this.tool.options[b].cancels, function(b, d) {
            c.tool.options[d].value = !1, a("#op-" + d).prop("checked", !1)
        })
    }, E.prototype.loadCustomBrushes = function(b) {
        this.brushPopupHtml = a("#brush-presets-wrapper").html()
    }, E.prototype.destroyTools = function() {
        var b = this;
        a.each(this.tools, function(a, c) {
            "function" == typeof b.tools[a].destroy && "SelectTool" != a && (b.tools[a].destroy(), b.tools[a] = !1)
        })
    }, E.prototype.loadBrushesElements = function() {
        a("#popup-container #brush-settings-display").html(""), a.each(this.brushes, function(b, c) {
            var d = '<div class="col-4 col-lg-3"><div data-id="' + b + '"  class="cs-k-w bru-d"><div class="cs-k-image br-image pp" style="background-image:url(' + c + ')" data-image="' + c + '"></div></div>';
            a("#popup-container #brush-settings-display").append(d)
        })
    }, E.prototype.setBrushColor = function(a, b) {
        (this.that.settings.brush.image && "Brush" == this.that.tool || b && this.that.settings.brush.image) && (this.that.settings.brush.solid = this.that.canvasToSolid(this.that.settings.brush.image, a, !1, !0), this.that.settings.brush.black = this.that.canvasToSolid(this.that.settings.brush.image, "#000000", !1, !0))
    }, E.prototype.setBrushImage = function() {
        a("#brush-canvas-wrapper img").attr("src", this.that.settings.brush.image.src)
    }, E.prototype.toolToggle = function(a) {
        var b = this.that.tool.toLowerCase(),
            c = a.attr("data-set"),
            d = this.that.settings[b][c];
        "undefined" != typeof d && (d ? this.that.settings[b][c] = !1 : this.that.settings[b][c] = !0);
    }, E.prototype.toggleAppToolDraw = function(a) {}, E.prototype.selectTool = function(b, c, d, e) {
        var f = this;
        this.that.tool + " ";
        return a("#tools-container .tool-selection").removeClass("active"), b.addClass("active"), this.finished(), this.renderChange ? this.checkRenderNeeded(function() {
            f.selectTool(b, c, d)
        }) : ("Text" == this.that.tool && this.doHistory(), this.restore(), this.hideButtons(), this.showButtons(c), this.that.tool = c, this.toggleMirrorWrapper(), this.hideISO(), this.activate(d), this.use(), this.startTool(), this.showOptions(), this.loadOptions(), this.setIcon(), this.hidePanningButton(), this.toggleToolBarPixelSize(), this.switchCursor(this.that.tool), void("function" == typeof this.tool.on && this.tool.on()))
    }, E.prototype.checkRenderNeeded = function(a) {
        this.renderChange && (this.renderChange = !1, this.tool.renderChange(function() {
            return a()
        }))
    }, E.prototype.size = function(a) {
        "up" == a ? "Brush" == this.that.tool || (this.that.pixelDrawingSize += 2, 3 == this.that.pixelDrawingSize && (this.that.pixelDrawingSize = 2), this.that.pixelDrawingSize >= 24 && (this.that.pixelDrawingSize = 24)) : "Brush" == this.that.tool || (this.that.pixelDrawingSize -= 2, this.that.pixelDrawingSize <= 1 && (this.that.pixelDrawingSize = 1)), this.that.mouse.changePixelSize(this.that.pixelDrawingSize), this.that.mouse.getPixelSizeImage(), this.that.mouse.renderMouse = !0, this.that.mouse.render(!1, !1, !0), this.that.render()
    }, E.prototype.toggleToolBarPixelSize = function() {
        ["Pencil", "Eraser", "Line", "Square", "Circle", "SprayTool"].indexOf(this.that.tool) !== -1 ? a("#pixel-size-adjust").show() : a("#pixel-size-adjust").hide()
    }, E.prototype.activate = function(b) {
        "Stamp" == this.that.tool && ("object" != typeof this.tools.StampTool && (this.tools.StampTool = new w(this.that), this.tools.StampTool.active()), this.tool = this.tools.StampTool), "Select" == this.that.tool && ("object" != typeof this.tools.SelectTool && (this.tools.SelectTool = new q(this.that), this.tools.SelectTool.active()), this.tool = this.tools.SelectTool), "Text" == this.that.tool && (this.that.TextController.loadCustom(), a(".dropdown-tool-container").addClass("active")), "Line" == this.that.tool && this.showISO()
    }, E.prototype.setIcon = function() {
        if (this.that.isApp) {
            a("#app-draw-down").removeClass("active");
            var b = this.that.tool.toLowerCase(),
                c = a("#" + b + "-tool").html();
            a("#current-tool").html(c)
        }
    }, E.prototype.switchCursor = function(b) {
        if (!this.that.isTablet && !this.that.isMobile && this.that.settings.mouseIcons) {
            b = b.toLowerCase();
            var c = "url(/img/application/icons/cursor/" + b + ".png) 0 34, auto";
            a("#canvas-layers-container").css({
                cursor: c
            })
        }
    }, E.prototype.use = function() {
        this.that.finished && (this.that.mouse.active && (this.that.hasDrawn = !0, this.that.ColorController.checkForColorChange(), this.makeHistory()), "Pencil" == this.that.tool && ("object" != typeof this.tools.PencilTool && (this.tools.PencilTool = new f(this.that)), "object" != typeof this.tools.EraserTool && (this.tools.EraserTool = new j(this.that)), "object" != typeof this.tools.ColorPickerTool && (this.tools.ColorPickerTool = new o(this.that)), this.tool = this.tools.PencilTool), "Hand" == this.that.tool && ("object" != typeof this.tools.HandTool && (this.tools.HandTool = new i(this.that)), this.tool = this.tools.HandTool), "Spray" == this.that.tool && ("object" != typeof this.tools.SprayTool && (this.tools.SprayTool = new h(this.that)), this.tool = this.tools.SprayTool), "Filter" == this.that.tool && ("object" != typeof this.tools.FilterTool && (this.tools.FilterTool = new g(this.that), this.tools.FilterTool.createBrush()), this.tool = this.tools.FilterTool), "Brush" == this.that.tool && ("object" != typeof this.tools.BrushTool && (this.tools.BrushTool = new C(this.that)), this.tool = this.tools.BrushTool), "Eraser" == this.that.tool && (this.tool = this.tools.EraserTool), "Line" == this.that.tool && ("object" != typeof this.tools.LineTool && (this.tools.LineTool = new k(this.that)), this.tool = this.tools.LineTool), "Square" == this.that.tool && ("object" != typeof this.tools.SquareTool && (this.tools.SquareTool = new m(this.that)), this.tool = this.tools.SquareTool), "Circle" == this.that.tool && ("object" != typeof this.tools.CircleTool && (this.tools.CircleTool = new r(this.that)), this.tool = this.tools.CircleTool), "Bucket" == this.that.tool && ("object" != typeof this.tools.BucketTool && (this.tools.BucketTool = new n(this.that)), this.tool = this.tools.BucketTool), "ColorPicker" == this.that.tool && (this.tool = this.tools.ColorPickerTool), "Move" == this.that.tool && ("object" != typeof this.tools.MoveTool && (this.tools.MoveTool = new p(this.that)), this.tool = this.tools.MoveTool), "Select" == this.that.tool && ("object" != typeof this.tools.SelectTool && (this.tools.SelectTool = new q(this.that)), "object" != typeof this.tools.LassoTool && (this.tools.LassoTool = new z(this.that)), "object" != typeof this.tools.WandTool && (this.tools.WandTool = new B(this.that)), "object" != typeof this.tools.PolyTool && (this.tools.PolyTool = new A(this.that)), this.tool = this.tools.SelectTool), "Gradient" == this.that.tool && ("object" != typeof this.tools.GradientTool && (this.tools.GradientTool = new D(this.that)), this.tool = this.tools.GradientTool), "LightenDarken" == this.that.tool && ("object" != typeof this.tools.LightenDarkenTool && (this.tools.LightenDarkenTool = new s(this.that)), this.tool = this.tools.LightenDarkenTool), "Text" == this.that.tool && ("object" != typeof this.tools.TextTool && (this.tools.TextTool = new t(this.that)), this.tool = this.tools.TextTool), "Dithering" == this.that.tool && ("object" != typeof this.tools.DitheringTool && (this.tools.DitheringTool = new v(this.that)), this.tool = this.tools.DitheringTool), "Lasso" == this.that.tool && ("object" != typeof this.tools.LassoTool && (this.tools.LassoTool = new z(this.that)), this.tool = this.tools.LassoTool), this.tool.active())
    }, E.prototype.startTool = function() {
        "function" == typeof this.tool.start && this.tool.start()
    }, E.prototype.drawToCanvas = function(a, b) {
        var c = this,
            d = 50;
        this.that.mouse.active && (this.that.mouse.doubleTapActive || !this.that.app.fingerToDraw || !this.that.isApp || this.that.isApp && this.that.app.fingerToDraw && Date.now() > this.that.mouse.activeAt + d) || this.that.mouse.activeForceReady ? (clearTimeout(this.drawToCanvasRenderTimer), this.that.canvas[b].putSimple(a), this.that.mouse.activeForceReady && (this.that.mouse.activeForceReady = !1, setTimeout(function() {
            c.that.render()
        }, 1))) : (clearTimeout(this.drawToCanvasRenderTimer), this.drawToCanvasRenderTimer = setTimeout(function() {
            c.that.mouse.activeForceReady = !0, c.drawToCanvas(a, b)
        }, d + 1))
    }, E.prototype.off = function() {
        "function" == typeof this.tool.off && this.tool.off(), this.turnOffButtons(), this.resetRainbowColor(), this.that.online.status && this.that.online.send && (this.that.OnlineController.writeLayer(), this.that.online.send = !1)
    }, E.prototype.showPanningButton = function() {
        this.currentTool = this.that.tool, this.that.tool = "Hand", a("#panning-active").show()
    }, E.prototype.hidePanningButton = function() {
        a("#panning-active").hide(), this.currentTool = !1
    }, E.prototype.offPanningButton = function() {
        this.that.tool = this.currentTool, this.hidePanningButton()
    }, E.prototype.turnOffButtons = function() {
        "Text" != this.that.tool && a(".dropdown-tool-container").removeClass("active")
    }, E.prototype["do"] = function(a, b) {
        this.tool[a](b)
    }, E.prototype.doHistory = function() {
        "function" == typeof this.tool.doHistory && this.tool.doHistory()
    }, E.prototype.finished = function() {
        "function" == typeof this.tool.finished && this.tool.finished()
    }, E.prototype.restore = function() {
        "function" == typeof this.tool.restore && this.tool.restore(), this.renderChange = !1, this.turnOffButtons(), this.resetRainbowColor()
    }, E.prototype.shift = function(a) {
        "function" == typeof this.tool.shift && this.tool.shift(a)
    }, E.prototype.alt = function(a) {
        "function" == typeof this.tool.alt && this.tool.alt(a)
    }, E.prototype.doubleClick = function(a) {
        "function" == typeof this.tool.doubleClick && this.tool.doubleClick(a)
    }, E.prototype.ctrl = function(a) {
        "function" == typeof this.tool.ctrl && this.tool.ctrl(a)
    }, E.prototype.resetRainbowColor = function() {
        this.that.rainbow.color = !1
    }, E.prototype.showButtons = function(b) {
        b = b.toLowerCase(), a("#right-sidebar ." + b + "-tool-toggle").css("display", "inline-block")
    }, E.prototype.hideButtons = function() {
        "function" == typeof this.tool.hideButtons && this.tool.hideButtons()
    }, E.prototype.makeHistory = function(a, b) {
        ["ColorPicker", "Select", "Text", "Bucket", "Lasso", "Poly", "Hand"].indexOf(this.that.tool) === -1 || a || (this.that.mouse.createHistory = !1)
    }, E.prototype.history = function(a, b) {
        var c = a.data.currentLayer,
            d = a.data.frame;
        a.data.layer;
        0 == this.that.FrameController.selectByUnqid(d.unqid) && this.that.FrameController.newFromData(d), this.that.FrameController.frames[a.data.currentFrame].layers = [], this.that.FrameController.frames[a.data.currentFrame].layers = a.data.layers, this.that.FrameController.frames[a.data.currentFrame].selectedLayer = c, this.that.FrameController.select(a.data.currentFrame), this.that.LayerController.selectLayer(c), this.that.LayerController.updateList(), this.that.LayerController.select(), this.restore()
    }, E.prototype.showOptions = function() {
        var b = this;
        b.that.tool.toLowerCase();
        this.tool.hasOptions ? (a("#tool-options-title").text(this.that.tool), a("#extra-panel-content").show().removeClass("hidden"), a("#tool-sidebar-tab").hasClass("active") || a("#sidebar-not").addClass("active"), a("#sidebar-tool-content .check-tool").each(function() {
            var c = b.that.tool.toLowerCase(),
                d = a(this).attr("data-tool");
            a(this).hide(), c == d && a(this).show()
        })) : (a("#tool-options-title").text("No"), a("#extra-panel-content").hide(), a("#sidebar-not").removeClass("active"))
    }, E.prototype.toggleMirrorWrapper = function() {
        this.that.mirror.tools.indexOf(this.that.tool) !== -1 ? a("#mirror-tool").slideDown(250) : a("#mirror-tool").slideUp(250)
    }, E.prototype.showISO = function() {
        a("#iso-option").show()
    }, E.prototype.hideISO = function() {
        a("#iso-option").hide()
    }, E.prototype.mirrorToggle = function(b) {
        var c = b.attr("data-type"),
            d = this;
        this.that.mirror[c] ? this.that.mirror[c] = !1 : this.that.mirror[c] = !0, a("#mirror-tool .mirror-tool").removeClass("active"), a("#mirror-tool .mirror-tool").each(function() {
            var b = a(this).attr("data-type");
            d.that.mirror[b] && a(this).addClass("active")
        })
    }, E.prototype.brushData = function() {
        var b = this,
            c = this.that.getStorage("pix_brush_data"),
            d = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAAfklEQVQoU41SwRGAMAhLF3ADd3MCh9ERHUQvnukFpJ78Cgkh0IY6ZgBHVWopOQQK5wSCGey8AVifd2iSFRxYDusEB58AWFOuq2QFdiXYRw6qmeBgkXbzc8sqJJsVghcRsll5eK252hI7TgCWP4fL41GZoZsED4NfEtPVWj+JF5wiFg47GqAYAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABP0lEQVQ4T6WTwUqFQBiFv+kJpILA1d0Iblq1u5sIhALfRDf6JLpy2S5C8AXqAS4tghZFXHIjCEWg0Ma18cvMZbKkIDc6858z//nPHBX/eNQC9+SH/Tfg1d63ye68ODvgW92QpWAeOV06+3qjAx6BI+BhqfM5IMALAURRhOd5TV3Xq6IoGl27mZNN16ljlmW+EAQk5DRN5fPKIu3ki+xpEcdxPI6j0/e9W5blpQYb6bLcAofArvvcsDMNErCfJAl5nk8qgHs9u3HcNZ3FjD096zSzSJZ313XrYRg2bds6VVXdKaUOgCepCVmM2geuzcxJkmyVUn4QBGsBhWG4SdPUAWrg1sxvX5XIiYEPQKQ2URStLNOegXc7C/OZT4EX647FJDFN3F4MiVFih+VYG2SH50volrL9p99lifxbzqfDPwEIFl1E73cCTwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAZCAYAAADAHFVeAAACfklEQVRIS7WWsWsiURDGJ2AhbCEXlGPTeCCshWnsXnUISpotUrjINbL29xdY2fpnaKorXicWprxCUmULY2FxhXAEgqCkUrvjW97Ic91133m5abJZdt9v5ptvZr2if4sbIno1PeLK9MGY5wBC/HeYDjKu7pLKGMTFfiaiwEShS2BVInojIkAQuGY5z1b5t7A0EBIAPLaPJjDO9o6IVkRUUJXgGgEJkQQH/38ibRqM+3MbAV0T0ZqIHhUICQAeeJ53J6XE/ZM4BzsHWii5vipoeLDneSSlfFEysuSH8YiD6W5jE+CFskpVB+HWTyK69X2fhsMhQAjunW6i1ygsztaQCLIhAGLwFyJ6EELct1qtzXQ6XUspV57nFaSUeAay6k6lJBhnxGYALFrRWghRKhaLueVy+W5Z1qbdbq87nQ4/y+bB37CIJBisG+c+wEtE9FSv18v5fB7VUTabfbZtezWZTEQQBBvNPEcrLQ4GEJrLDuNewX1h1kIIsd/vc47jhKBms0m9Xq+kQFAAttdbEs6dDosag184SOq67vVutyNUZNv2+2w22zQajcVoNCpvt9tPQRA8aXN31K8kGDvpyFW+7xcGg8FLrVa7z2QykIoA6na75Wq1CtAvIoIbjxyoDxtXFt3iPBs3vu9joGHrR9d1v43H4wXA6FG/3xeVSiU3n8+f1aEnDkyC8T7Tl2kIA0j1kRfwm+M43y3L+q0qQi8xbxwX7UY4kqU5gJRUMA6b5odmiMSPqcm60rNF1egJO5VnyeirnQTTpcQY8AbX9x16CXmNQHFDrfeTrxmsH6onEPdO7L20T4wOPDhU3TT+ocOHmMCMf9CklZgG+zAQEvkDxMbWNEsdOrEAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAAaUlEQVQoU62QwQ2AMAwDr1MgsQX7D8EWSGyBHDVVagR86C/1JXbSeH9rl4/EmvEbcAIDAKY/NWhKBZ48g8uGBdg7KUG1O4WckRLKJsXQq0MiRd3Bo3kdu/jSH0ebHSrsEYf2m0NOvJ38Av6bEiUJRyoZAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAALklEQVQYV2NkQABjBgaGsyAuI1QMJAATPAsSBHGcGBgYPkIVgAVBAEMlzFS4mQCIDAg5uYtuwAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAH0lEQVQYV2NkYGCQYmBgeMYAAShsRqggVgokOah0AgBbJAhwwO+YBAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAWCAYAAAC7ZX7KAAAC5ElEQVRYR7WXrY4VQRCFa18ARUIwGHA4DFl4AjxIEDg0PAY4EhwC5D4ATwAEQzA4MBiCRaDJd9Pf5ty6PTPLZmkzM/1TferUqeqeo/q/7WZVfb3ILY7OYQwQtH8B8rCq3p5hr+Mx5+PS3DXAM3YEe2lieIlN+m81wGtOA/pCAGPodzALa9+acYFkBGRN0m4M8LO5zlkEvcWwzADu8wD7rKrejXcN00d7Pp4ZCdjKcW0JTmkxh/WsnUVwN38G+NWw9GQsxqAAcOBKVV2vqu9j3vvBMhvyTstI8C0Ynler6mnYxum7Y512talTp3JLwHTeawt/jW9CL4jcHMP3q+rnBDxsJRi+WQuoD8PxnEM/JL2oqi9DNkZwEbDhcaK61VNCZUIYZuQh88l2gqFfh7WNNGhIjfZ4OH67qn5U1esgUKlNJWEI1aSs4H1PoNSnDOUcQKpH30k68yET1whj5/IAfa2qHsjWkoZngGFInekIwNj8Thj8M1hCSjLHMJE7GZv3BGScvKDpdCa2EtxN6BrWuEmmpg1vMpoJBos4RDhphJTEkkHZZY5aNswkOQlsfxKaTvB+vAYYVjSWRjQMiyZjjrNOfcJcAlQuOECTEKPG0yr1ckSGb+Q4ZTiTrpeaZJnFHreEDGY/DXBZ9AWYciJJTTBxIIU3IbtZkh4w7OIEYtjdULbsfzTCSW2ltBnm1GlqMKsP8tIh7AhY8OBRglafnSRm53qvn3kp8YDQWCZKZ0bNJtOdBImy3++e5AeScKJFOo/dTIistSaFp15uzoZ5ImZ0spZjz0jJbo6f1uBeJfhOsG7eK4Oh7DW4Zzqb0+jvwDOC7pOkJMi9e8ra5SfvBhidhagnlYmZ8+2TxawICSYPnJ4zmyedXvck2WVqy2bDlxtmXyZXajrvvP22t3dYCGYmiRzbel8y2v8aZmVu6YLubc7L1J5+twBv/QqdZXztN+pc/3vn+afr1WQrEmvjW04frP0L3cTywnBXYBcAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAAm0lEQVQoU22PsQ3CQBAEx60gMkJKwBW4CKACIiqgAnDoiIgK7JwEiQIQASkUgda6tQ70n71Gs3tbUX4z4FkVmEANtP/QYA7sDBvgHobAClhmcw0YqG2CituGITAAV5uy9sA7DjwBH8GSdfQUWZs0SVarv8wOWARU12gZ3hJ4hKVpF5mvOERxvS2bgucc536ZB+AnLkNd67ixy/AL8qUktIH4kb4AAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAVCAYAAABLy77vAAABuklEQVQ4T52UTSuEURTHf/MVlIViobzsFKLIzp7dlJJSNpqyFD6Al1lJyYZYKLEQs5OUhSgfQIlYWFgo5Rvo/3TOdOaZ+0xya5qne8/53XP+95xT4m9rFHhsZVoqOCwDZ3YmiFYeFG2IoC7gIwFeAK4KzurmDnJICrYHrAdQKs1yjGgZOMndrL02YAVwwDEwm4s8AykKrVRaN8AOcGl2a8CPgRtYDuowMQUdMkcZfgHtwUNgRb0f9rJI86+mzSULfRPoBG6D4z3wBqyGDKZ1cR6kiE6BccC10L8cFfW8pfYaXlI6Vh2kmtBS7ehgAngyLXRjP9ANHJoEekl9D1j6TREJpqiugYsgquAzwKBdKPiYpZ69YKqypZPS00/PriXHbYvKdZaGI8BkEUiVPAz0mTZqDTlJF+0vGkl2PcCuhE9FJKcH4BPYMJhEVnVXgHM7U6pVk6IO8gaUPjLObgFqdvtdcFJRvgPfVhayrxVp5J0u8AvQm6ubLWAuToQUKDauvo8sFe8vaaMopuzlsnFTNI/8ZbwPleqBtU6DyG7YCtQwuAAfJ4rGy6JpHiXmWXJLhfkcmvrfoMLZ/QsgUGbf7uaiQAAAAABJRU5ErkJggg=="];
        if (c) {
            var e = JSON.parse(c);
            a.each(e, function(a, c) {
                var e = b.that.decodeImage(c);
                d.push(e)
            })
        }
        return d
    }, E.prototype.addBrushData = function(a) {
        var b = this.that.getStorage("pix_brush_data");
        if (b) var c = JSON.parse(b);
        else c = [];
        c.push(a), this.brushes.push(a), this.that.putStorage("pix_brush_data", JSON.stringify(c))
    }, E.prototype.subBrushData = function(a) {
        if (!(a <= 8)) {
            this.brushes.splice(a, 1);
            var b = this.brushes.slice(9);
            this.that.putStorage("pix_brush_data", JSON.stringify(b)), this.loadBrushesElements()
        }
    }, E.prototype.stampCallback = function() {
        this.loadOptions()
    }, E.prototype.loadOptions = function() {
        var b = this;
        return a("#sidebar-tool-content .appened-options").remove(), a("#tool-option-name span").text(this.that.tool), a("#tool-option-appended").html(""), "object" != typeof this.tool.options ? void a("#tool-option-appended").html('<span class="no-o">No options</span>') : (this.loadToolOptionsAppend("tool-option-appended"), this.that.isApp || this.loadToolOptionsAppend("extra-panel-content", "sidebar"), void("Text" == this.that.tool && b.that.TextController.appendPreviews()))
    }, E.prototype.loadToolOptionsAppend = function(b, c) {
        var d = this,
            e = c ? " on " + c : "";
        c = c ? c : "", a.each(this.tool.options, function(f, g) {
            var h = "",
                i = (g.tag ? g.tag : "", g.preview ? g.preview : g.name);
            if (!(g.require && !d.that[g.require].data || g.hidden || d.that.isApp && g.hideApp) && (!g.onlyApp || d.that.isApp)) {
                if ("checkbox" == g.type) {
                    var j = g.value ? 'checked="checked"' : "";
                    h = '<div class="toggle-option"><input ' + j + ' aria-label="' + g.hint + e + '"  type="checkbox" id="op-' + f + c + '" class="check-box op-' + f + ' filled-in form-control-app tool-option-checkbox" data-set="' + f + '" value="true"/><label for="op-' + f + c + '" class="tool-toggle" title="' + g.hint + '">' + i + '<div class="toggle-label-helper">' + g.hint + "</div></label></div>", d.that.isApp && (h = '<ons-list-item><div class="center">' + i + '</div><div class="right"><ons-switch class="tool-option-checkbox" ' + j + ' data-set="' + f + '" input-id="op-' + f + '"></ons-switch></div></ons-list-item>')
                }
                if ("range" == g.type) {
                    var k = '<input type="range" class="tool-change range-' + g.name + '" data-tool="' + d.that.tool + '" data-option="' + g.name + '" value="' + g.value + '" id="range-' + g.name + '" min="' + g.min + '" step="' + g.step + '" max="' + g.max + '">';
                    d.that.isApp && (k = '<ons-range style="width: 100%" class="tool-change range-' + g.name + '" data-tool="' + d.that.tool + '" data-option="' + g.name + '" value="' + g.value + '" input-id="range-' + g.name + '" min="' + g.min + '" step="' + g.step + '" max="' + g.max + '"></ons-range>'), h = '<div class="tool-title">' + i + ' (<span id="range-' + g.name + c + '-preview" class="' + d.that.tool + "-" + g.name + '-value">' + g.value + '</span>)</div><div class="range-wrapper"><label class="d-none" for="range-' + g.name + c + '">' + g.name + "</label>" + k + '<span class="thumb"><span class="value">' + g.value + "</span></span></div>"
                }
                if ("button" == g.type && (h = '<div class="tool-act-btn"><div class="defaul-app-button tool-actbtn" data-option="' + g.name + '">' + i + "</div>", d.that.isApp && (h = '<div class="tool-act-btn"><ons-button class="full tool-actbtn cb ol" modifier="quiet" data-option="' + g.name + '">' + i + "</ons-button></div>")), "brush" == g.type && (d.that.isApp || (h = '<div class="tool-title tb-h pt-0">Current Brush (Click to change)</div>'), h = h + '<div class="brush-canvas-wrapper" id="brush-canvas-wrapper"><img src="' + d.that.settings.brush.image.src + '" class="brush-image pp" height="100px"></div>'), "dropdown" == g.type) {
                    h = '<select class="select-tool-options select-input select-back full" data-option="' + g.name + '">';
                    var l = function(a) {
                        return g.value == a ? 'selected="Selected"' : ""
                    };
                    a.each(g.values, function(a, b) {
                        h += '<option value="' + b + '" ' + l(b) + ">" + b + "</option>"
                    }), h += "</select>"
                }
                if ("fonts" == g.type && (h = '<div class="list-selection-images pp"><div id="fonts-toolbar-options"></div></div>'), "stamps" == g.type) {
                    var m = "";
                    d.that.stamps.data && (m = '<div class="thumb-preview pp" style="background-image: url(' + d.that.stamps.data.src + ')"></div>'), h = '<div class="defaul-app-button full stamp-select">' + m + "Pick Pattern</div>"
                }
                var n = '<div class="panel-select check-tool appened-options">' + h + "</div>",
                    o = a(n);
                g.bgColor && o.css({
                    backgroundColor: g.value,
                    textShadow: "0px 0px 2px #000"
                }), a("#" + b).append(o)
            }
        })
    };
    var F = function(b) {
        this.that = b, this.cookieName = "ad-002", this.adEl = a("#ad-popup-content")
    };
    F.prototype.init = function() {
        this.listeners(), this.set()
    }, F.prototype.listeners = function() {
        var b = this;
        a(".ad-close-set").click(function() {
            b.close()
        })
    }, F.prototype.set = function() {
        a("#ad-popup-content") && (this.that.readCookie(this.cookieName) ? this.removeAd() : this.adEl.removeClass("hidden"))
    }, F.prototype.close = function() {
        this.removeAd(), this.that.createCookie(this.cookieName, "true", 30)
    }, F.prototype.removeAd = function() {
        this.adEl.remove()
    };
    var G = function(a) {
        this.that = a, this.undo = [], this.redo = [], this.limit = 21, this.lastActionFrame = ""
    };
    G.prototype.init = function() {
        this.listeners()
    }, G.prototype.newCanvas = function() {
        var a = this;
        this.that.LayerController.updateLayer(!1, function() {
            a.create()
        }, !0)
    }, G.prototype.add = function(a, b, c, d) {
        this.create()
    }, G.prototype.autoRedo = function(a) {
        this.redo.push(a), this.undo.pop()
    }, G.prototype.autoUndo = function(a, b) {
        var c = !1;
        a && (c = a), this.undo.push(b), c ? this.redo.splice(a, 1) : this.redo.pop()
    }, G.prototype.listeners = function() {
        var b = this;
        a(".undo").click(function(a) {
            a.preventDefault(), b.doUndo()
        }), a(".redo").click(function(a) {
            a.preventDefault(), b.doRedo()
        })
    }, G.prototype.doUndo = function() {
        var a = this;
        this.undo.length >= 1 && ("Select" == this.that.tool && this.that.ToolController.tool.moved && this.that.SelectController.accept(), "Text" == this.that.tool && this.that.ToolController.tool.history.length && this.that.ToolController.tool.checkSettingHistoryController(), setTimeout(function() {
            a.that.ToolController.doHistory();
            var b = a.undo[a.undo.length - 2];
            a.initRedo(), a.call(b, "undo", !1)
        }, 10))
    }, G.prototype.doRedo = function() {
        var a = (this.redo[this.redo.length - 1], this.redo[this.redo.length - 2]);
        this.redo.length >= 1 && this.call(a, "redo", !1), this.redo.length <= 1 && (this.redo = [])
    }, G.prototype.initRedo = function(a, b) {
        if (0 == this.redo.length) {
            this.create(!0)
        }
    }, G.prototype.call = function(a, b, c) {
        var d = this;
        if ("undefined" != typeof a) {
            var e = a + "";
            this.work(a, function() {
                "undo" == b ? d.autoRedo(e) : c || d.autoUndo(!1, e)
            })
        }
    }, G.prototype.move = function(a, b) {
        this.redo = this.redo.splice(b, 0, this.redo.splice(a, 1)[0])
    }, G.prototype.create = function(a, b) {
        var c = this.that.FrameController.currentFrame,
            d = this;
        !this.that.app.ready && this.that.isApp || this.that.startHistory(function(e) {
            var f = {
                frames: e,
                currentFrame: c
            };
            return f = JSON.stringify(f), a ? void d.redo.push(f) : (d.undo.push(f), d.redo = [], d.checkLimit(), d.that.setProgressImage(e[c].preview), b ? b(!0) : void 0)
        })
    }, G.prototype.checkLimit = function() {
        this.undo.length > this.limit && this.undo.shift()
    }, G.prototype.work = function(a, b) {
        a = JSON.parse(a), this.that.loading = !0;
        var c = this;
        this.that.loadHistoryData(a, function(d) {
            if (c.loadFrames(d, a.currentFrame), b) return b()
        })
    }, G.prototype.loadFrames = function(a, b) {
        var c = parseInt(this.that.LayerController.currentLayer),
            d = parseInt(this.that.FrameController.currentFrame);
        this.that.FrameController.frames = [], this.that.LayerController.layers = [], this.that.canvas.top && this.that.canvas.top["default"](), this.that.canvas.bottom && this.that.canvas.bottom["default"](), this.that.FrameController.frames = a, a[d] && (b = d), a[b].layers[c] || (this.that.LayerController.currentLayer = a[b].selectedLayer), this.that.FrameController.select(b), this.that.FrameController.updateList();
        var e = this.that.FrameController.frame();
        this.that.updateDisplayCanvas(this.that.LayerController.layers, e.selectedLayer), this.that.render(), this.that.loading = !1, this.that.online.status && this.that.OnlineController.writeLayer(), this.that.updateData()
    };
    var H = function(b) {
        this.that = b, this.jElement = a("#" + b.element.id), this.roundImage = !1, this.roundImageMouse = !1, this.roundImageMouseData = !1, this.touchCount = 0, this.touches = [], this.active = !1, this.activeAt = 0, this.activeForce = !1, this.activeForceReady = !1, this.rightClick = !1, this.renderMouse = !0, this.prevent = !1, this.up = !1, this.isTouch = !1, this.start_x = !1, this.start_y = !1, this.removedMobile = !1, this.mousePageX = 0, this.mousePageY = 0, this.mouseMoveX = 0, this.mouseMoveY = 0, this.scrollBarBuffer = 15, this.middleClickDown = !1, this["in"] = !1, this.x = 0, this.y = 0, this.x1 = 0, this.x2 = 0, this.x_0 = 0, this.x_1 = null, this.y_0 = 0, this.y_1 = null, this.last_x = 0, this.last_y = 0, this.app_x = 0, this.app_y = 0, this.xx = 0, this.yy = 0, this.lx = -1, this.lcx = -1, this.ly = 0, this.lcy = 0, this.last_abs_pos, this.dx = 0, this.dy = 0, this.sx = 0, this.sy = 0, this.err = null, this.createHistory = !1, this.closeHook = !1, this.appX = !1, this.appY = !1, this.app_x_last = !1, this.app_y_last = !1, this.app_use = !1, this.app_touch_index = !1, this.app_touch_active = !1, this.app_button_down = !1, this.app_update_frame = !1, this.removeTips = !1, this.doubleTapTimer = !1, this.doubleTapSet = 0, this.doubleTapActive = !1, this.pixelTrace = !!this.that.isApp && a("#pixel-trace"), this.pixelMouse = !!this.that.isApp && a("#pixel-mouse"), this.mouseXEl = a("#mouse-x-canvas"), this.mouseYEl = a("#mouse-y-canvas"), this.mouseXE2 = a("#mouse-x-sidebar"), this.mouseYE2 = a("#mouse-y-sidebar"), this.last_ex = 0, this.last_ey = 0, this.lastSpeedX = 0, this.lastSpeedY = 0, this.speedTimer = null, this.mouseSpeedX = 0, this.mouseSpeedY = 0, this.activeDrawing = !1, this.isPinching = !1, this.isPanning = !1, this.pinchStartX = 0, this.pinchStartY = 0, this.pinchCurrentX = 0, this.pinchCurrentY = 0, this.pinchInit = !1, this.pinchTimer = !1, this.lastPinchDist = 0, this.pinchDist = 1, this.pinchTime = null, this.forceZooming = !1, this.forcePanning = !1, this.isTouchMoving = !1, this.pressure = .5, this.resetLast()
    };
    H.prototype.desktopListeners = function(b) {
        var c = this;
        a(b).on("pointerdown", function(a) {
            var b = a.originalEvent,
                d = b.pressure;
            "mouse" != b.pointerType && "touch" != b.pointerType || !d || c.that.isMobile || (c.pressure = parseFloat(d))
        }), a(b).on("pointermove", function(a) {
            var b = a.originalEvent,
                d = b.pressure;
            "mouse" != b.pointerType && "touch" != b.pointerType || !d || c.that.isMobile || (c.pressure = parseFloat(d))
        }), a(b).on("pointerup", function(a) {
            c.pressure = .5
        }), a(b).on("mousemove", function(a) {
            c.that.isMobile && !c.isTablet || c.move(a)
        }), a("#canvas-layers-appened").on("mousemove", function(a) {
            c["in"] = !0
        }), a("#canvas-layers-appened").on("mouseout", function(a) {
            c.that.isMobile && !c.isTablet || (c["in"] = !1, c.out(a))
        }), a(b).bind("mousedown", function(b) {
            var d = a(this),
                e = d.offset(),
                f = d.width(),
                g = d.height(),
                h = c.that.width * c.that.ZoomController.zoom,
                i = c.that.height * c.that.ZoomController.zoom,
                j = b.pageX - e.left,
                k = b.pageY - e.top;
            c.isTouch = !1, c.that.isMobile && !c.isTablet || c.that.isApp || (3 == b.which && (c.rightClick = !0), c.that.ZoomController.zoom > c.that.zoom["default"] && (j > f - c.scrollBarBuffer || k > g - c.scrollBarBuffer) && h > f && i > g || b.target.classList.contains("select-tool") || b.target.classList.contains("select-helpers") || c.checkPreConditions() || (2 == b.which && (b.preventDefault(), c.setHandTemp()), c.createHistory = !0, c.down(b)))
        }), a(document).on("mouseup", function(a) {
            c.that.isMobile && !c.isTablet || c.finish(a)
        })
    }, H.prototype.mobileListeners = function(b) {
        var c, d = this,
            e = !0;
        a(b).bind("touchstart", function(a, b) {
            b && (a = b);
            var f = a.originalEvent.touches.length;
            if (d.touches = a.originalEvent.touches, d.isTouch = !0, d.up = !1, d.activeDrawing || (d.activeDrawing = Date.now()), f >= 2 && Date.now() - d.activeDrawing > 150 && (e = !1), 2 === f && e) d.pinchStart(a.originalEvent);
            else if (f >= 3 && e) d.touchStartMove();
            else {
                if (a.target.classList.contains("select-tool") || a.target.classList.contains("select-helpers") || d.checkPreConditions()) return;
                clearTimeout(c), d.removeTips || d.doRemoveTips();
                var g = a.originalEvent.touches[0];
                d.createHistory = !0, d.setClickMobile(g), d.position(g), d.down(g), c = setTimeout(function() {
                    d.move(g)
                }, 1)
            }
        }), a(b).bind("touchmove", function(a) {
            var b = a.originalEvent.touches.length;
            2 === b && e ? d.pinchMove(a.originalEvent) : b >= 3 && e ? d.touchMoving() : d.panning(), d.move(a.originalEvent.touches[0])
        }), a(b).bind("touchend", function(a) {
            a.preventDefault(), a.originalEvent.touches.length || (e = !0, d.up = !0, d.finish(a.originalEvent.touches[0]))
        })
    }, H.prototype.appListeners = function(b) {
        function c(a) {
            if (j = 0, g.isTouch = !0, "undefined" != typeof a.originalEvent) {
                if (g.that.app.fingerToDraw && a.originalEvent.touches[a.originalEvent.touches.length - 1].radiusX < 50 && a.originalEvent.touches[a.originalEvent.touches.length - 1].radiusY < 50 || g.that.app.fingerToDraw && 0 === a.originalEvent.touches[a.originalEvent.touches.length - 1].radiusX) j = a.originalEvent.touches.length;
                else
                    for (var b = 0; b < a.originalEvent.touches.length; b++) "canvas-touchmove" != a.originalEvent.touches[b].target.id && "canvas_display" != a.originalEvent.touches[b].target.id && "canvas-layers-container" != a.originalEvent.touches[b].target.id && "canvas_grid_image" != a.originalEvent.touches[b].target.id || j++;
                if (g.activeDrawing || (g.activeDrawing = Date.now()), g.touchCount = j, j >= 2 && Date.now() - g.activeDrawing > 150 && (i = !1), j >= 2 && i && !g.app_button_down) g.pinchStart(a.originalEvent);
                else {
                    if (g.checkPreConditions()) return;
                    if (g.that.app.fingerToDraw) g.app_touch_index = 0;
                    else
                        for (var b = 0; b < a.originalEvent.touches.length; b++) "canvas-touchmove" != a.originalEvent.touches[b].target.id && "canvas_display" != a.originalEvent.touches[b].target.id && "canvas-layers-container" != a.originalEvent.touches[b].target.id && "canvas_grid_image" != a.originalEvent.touches[b].target.id && "pixel-trace" != a.originalEvent.touches[b].target.id || (g.app_touch_index = b);
                    var c = a.originalEvent.touches[g.app_touch_index];
                    g.that.app.fingerToDraw && (g.setClickMobile(c), g.position(c)), g.app_touch_active = !0, g.app_update_frame = !0, g.app_use = !0, g.up = !1, g.activeAt = Date.now(), g.activeForce = !0, g.down(c), g.that.app.fingerToDraw && (g.createHistory = !0, g.active = !0, g.move(c))
                }
            }
        }

        function d(a) {
            if (g.that.app.fingerToDraw && (j = a.originalEvent.touches.length), j >= 2 && i) g.pinchMove(a.originalEvent);
            else {
                if ("undefined" == typeof a.originalEvent) return;
                g.that.app.fingerToDraw && (g.app_touch_index = 0);
                var b = a.originalEvent.touches[g.app_touch_index],
                    c = !1;
                if (!g.that.app.fingerToDraw)
                    for (var d = 0; d < a.originalEvent.touches.length; d++) c || "canvas-touchmove" != a.originalEvent.touches[d].target.id && "canvas_display" != a.originalEvent.touches[d].target.id && "canvas-layers-container" != a.originalEvent.touches[d].target.id && "canvas_grid_image" != a.originalEvent.touches[d].target.id && "pixel-trace" != a.originalEvent.touches[d].target.id || (b = a.originalEvent.touches[d], c = !0);
                if (!g.app_touch_active) return;
                a.cancelable && (a.preventDefault(), a.stopPropagation()), g.move(b)
            }
        }

        function e(a) {
            var b = a.originalEvent.touches[g.app_touch_index];
            if (j--, g.app_touch_index = !1, !g.that.app.fingerToDraw)
                for (var c = 0; c < a.originalEvent.touches.length; c++) "canvas-touchmove" != a.originalEvent.touches[c].target.id && "canvas_display" != a.originalEvent.touches[c].target.id && "canvas-layers-container" != a.originalEvent.touches[c].target.id && "canvas_grid_image" != a.originalEvent.touches[c].target.id && "pixel-trace" != a.originalEvent.touches[c].target.id || (g.app_touch_index = c);
            g.up = !0, g.app_button_down && "Select" == g.that.tool && g.that.ToolController.tool.moving && g.endDrawButtonApp(), (g.doubleTapActive || g.that.app.fingerToDraw) && (g.toolsUp(), g.doubleTapActive = !1, g.active = !1, g.activeForce && (g.activeForceReady = !0)), g.app_button_down && (g.app_touch_index = 1), g.app_touch_active = !1, g.app_use = !1, g.touchCount = j, (!j || j <= 0 || !a.originalEvent.touches.length) && (j = 0, i = !0, g.touchCount = 0, g.activeForceReady && ["Select", "Hand", "Bucket"].indexOf(g.that.tool) == -1 && (g.that.ToolController.tool.active(), g.activeForce = !1, g.activeForceReady = !1), g.that.ToolController.tools.HandTool.off(!0), g.finish(b)), (g.that.zoom_step > 1 && Math.abs(g.app_x - g.x0) >= 3 && !g.that.app.fingerToDraw || g.that.zoom_step > 1 && Math.abs(g.app_y - g.y0) >= 3 && !g.that.app.fingerToDraw) && (g.app_x = g.x0, g.app_y = g.y0, g.that.ZoomController.position(!1, !1, !0))
        }

        function f(a) {
            g.createHistory = !0, g.doubleTap(!0)
        }
        var g = this,
            h = (a("#drawing-canvas-conatiner"), a("#app-draw-down")),
            i = !0,
            j = 0;
        a("#drawing-container").bind("touchstart", c), a("#drawing-container").bind("touchend", e), a("#drawing-container").bind("touchmove", d), a("#drawing-container").bind("doubletap", f), h.bind("touchstart", function(b) {
            a("#app-draw-down").addClass("set"), g.app_button_down = !0, g.createHistory = !0, g.active = !0, g.app_use = !0, g.activeForce = !0, g.down(b)
        }), h.bind("touchend keyup", function(a) {
            g.app_button_down && (g.endDrawButtonApp(), g.finish())
        })
    }, H.prototype.setHandTemp = function() {
        this.middleClickDown = this.that.tool, this.that.tool = "Hand"
    }, H.prototype.resetHandTemp = function(a) {
        this.that.tool = a ? a : this.middleClickDown, this.middleClickDown = !1
    }, H.prototype.resetLast = function() {
        this.last_x = this.that.width / 2, this.last_y = this.that.height / 2, this.that.ZoomController.last_x = this.that.width / 2, this.that.ZoomController.last_y = this.that.height / 2
    }, H.prototype.touchStartMove = function() {
        this.isPinching = !1, this.isTouchMoving = !0
    }, H.prototype.touchMoving = function() {
        this.isTouchMoving && (this.isPinching = !1, this.active && this.that.ToolController.cancel(), this.that.ToolController.tools.HandTool.active(!0))
    }, H.prototype.touchEndMove = function() {
        this.isTouchMoving = !1, this.that.NavigationController.ignoreZoomLastClicks || this.that.ToolController.tools.HandTool.off()
    }, H.prototype.pinchStart = function(b) {
        if (!this.isPinching && !this.isTouchMoving) {
            b.preventDefault(), this.isPanning = !0, this.isPinching = !0, this.active && (this.activeAt = !1, this.that.ToolController.cancel());
            var c = a("#canvas_display");
            this.ignoreLastclicks = !0;
            var d = b.touches[0].pageX,
                e = b.touches[0].pageY,
                f = b.touches[1] ? b.touches[1].pageX : c.offset().left + c.width() / 2,
                g = b.touches[1] ? b.touches[1].pageY : c.offset().top + c.height() / 2,
                h = this.pinchMiddlePoint(d, e, f, g);
            this.pinchPreviousX = this.that.ZoomController.last_cord_x, this.pinchPreviousY = this.that.ZoomController.last_cord_y, this.pinchStartX = h[0], this.pinchStartY = h[1]
        }
    }, H.prototype.pinchMiddlePoint = function(b, c, d, e) {
        var f = a("#canvas_display"),
            g = b - f.offset().left;
        g = Math.floor(g / (1 * this.that.ZoomController.zoom));
        var h = c - f.offset().top;
        h = Math.floor(h / (1 * this.that.ZoomController.zoom));
        var i = d - f.offset().left;
        i = Math.floor(i / (1 * this.that.ZoomController.zoom));
        var j = e - f.offset().top;
        j = Math.floor(j / (1 * this.that.ZoomController.zoom));
        var k = (g + i) / 2,
            l = (h + j) / 2;
        return this.pinchCurrentX = k, this.pinchCurrentY = l, [k, l]
    }, H.prototype.pinchMove = function(b) {
        if (this.isPinching && !this.isTouchMoving) {
            b.preventDefault();
            var c = a("#canvas_display");
            this.activeForce = !1, this.activeForceReady = !1;
            var d = .25,
                e = "in",
                f = b.touches[0].pageX,
                g = b.touches[0].pageY,
                h = b.touches[1] ? b.touches[1].pageX : c.offset().left + c.width() / 2,
                i = b.touches[1] ? b.touches[1].pageY : c.offset().top + c.height() / 2,
                j = Math.round((f + h) / 2),
                k = Math.round((g + i) / 2),
                l = Math.hypot(f - h, g - i),
                m = Math.hypot(f - h, g - i);
            l /= 20, l = this.that.round(l, .5), this.lastPinchDist || (this.lastPinchDist = l, this.lastLargePinchDist = m), this.pinchMoveInit || (this.lastX3 = j, this.lastY3 = k, this.lastXY = j + k, this.pinchMoveInit = !0);
            var n = 15;
            if ((j > this.lastX3 + n || j < this.lastX3 - n) && !this.forceZooming || (k > this.lastY3 + n || k < this.lastY3 - n) && !this.forceZooming || this.forcePanning && !this.forceZooming) return void(!this.forcePanning && this.forceZooming || "Hand" == this.that.tool || !this.that.app.fingerToDraw || (this.forcePanning = !0, this.that.ToolController.tools.HandTool.active(!0, j, k, !0), this.that.render()));
            if ((m > this.lastLargePinchDist + 18 || m < this.lastLargePinchDist - 18) && (this.forceZooming = !0), this.lastPinchDist == l || !this.forceZooming) return;
            this.that.ZoomController.zoom < 1 && (d = .1), this.that.ZoomController.zoom > 5 && (d = .75), this.that.ZoomController.zoom > 10 && (d = 1), this.that.ZoomController.zoom > 20 && (d = 1.25), this.lastPinchDist > l ? (this.that.ZoomController.zoom -= d, e = "out", this.that.ZoomController.zoom >= this.that.grid.max_size && (this.that.ZoomController.zoom = this.that.round(this.that.ZoomController.zoom, 1, "down")), this.that.ZoomController.zoomingOut = !0, this.pinchInit || (this.pinchInit = !0, this.that.isApp || (this.pinchStartX = this.that.ZoomController.last_x, this.pinchStartY = this.that.ZoomController.last_y))) : (this.that.ZoomController.zoomingOut = !1, this.that.ZoomController.zoom += d, this.that.ZoomController.zoom >= this.that.grid.max_size && (this.that.ZoomController.zoom = this.that.round(this.that.ZoomController.zoom, 1, "up"))), this.lastPinchDist = l, "in" == e && (this.pinchInit = !0, this.that.ZoomController.last_x = this.pinchStartX, this.that.ZoomController.last_y = this.pinchStartY), this.that.ZoomController.zoomRange(this.that.ZoomController.zoom, this.that.ZoomController.last_x, this.that.ZoomController.last_y)
        }
    }, H.prototype.panning = function() {
        this.isPanning && this.that.ToolController.tool.active(!0)
    }, H.prototype.pinchEnd = function() {
        this.forceZooming = !1, this.forcePanning = !1, this.isPinching && (this.pinchMoveInit = !1, this.lastPinchDist = 0, this.isPinching = !1)
    }, H.prototype.doRemoveTips = function() {
        this.that.removeTips(), this.removeTips = !0
    }, H.prototype.endDrawButtonApp = function() {
        a("#app-draw-down").removeClass("set"), this.app_button_down = !1, this.app_touch_index = 0
    }, H.prototype.listeners = function() {
        var b = this,
            c = "#canvas-layers-appened";
        this.that.isMobileDevice && (this.scrollBarBuffer = 0), this.that.isApp || (this.desktopListeners("#drawing-canvas-conatiner"), this.mobileListeners("#drawing-canvas-conatiner"), a(document).dblclick(function() {
            b.doubleClick()
        })), this.that.isApp && this.appListeners(c), a(".pixel-range-size").on("input", function() {
            b.changePixelSize(a(this).val())
        }), a(".pixel-range-size").on("pointerup", function() {
            b.getPixelSizeImage(a(this).val())
        })
    }, H.prototype.doubleClick = function() {
        this.that.ToolController.doubleClick()
    }, H.prototype.doubleTap = function(a) {
        if (this.that.isApp && ["Select"].indexOf(this.that.tool) == -1 && !this.that.app.fingerToDraw) {
            var b = this;
            a || (this.doubleTapTimer = setTimeout(function() {
                b.doubleTapSet = 0
            }, 300)), this.doubleTapSet++, (this.doubleTapSet >= 2 || a) && (this.active = !0, this.doubleTapActive = !0, this.doubleTapSet = 0, clearTimeout(this.doubleTapTimer), this.doubleTapTimer = !1)
        }
    }, H.prototype.changePixelSize = function(b) {
        var c = parseInt(b);
        c > 24 && (c = 24), c <= 1 && (c = 1), this.that.isOdd(c) && 1 !== c && (c += 1, a("#right-sidebar .pixel-range-size, #pixel-size-adjust .pixel-range-size").val(c)), this.that.pixelPerfect.status && c > 1, a("#right-sidebar .pixel-size-drawing, #pixel-size-adjust .pixel-size-drawing").text(c), this.that.pixelDrawingSize = c
    }, H.prototype.getPixelSizeImage = function() {
        var a = this;
        this.roundImage = !1, this.roundImageMouse = !1, this.roundImageMouseData = !1, this.that.pixelDrawingSize > 1 && this.that.generateCircle("data", this.that.pixelDrawingSize, "#000000", function(b, c) {
            a.roundImageMouse = b, a.roundImageMouseData = c, a.roundImage = a.that.generateCircle("data", a.that.pixelDrawingSize)
        })
    }, H.prototype.mouseEnd = function() {
        this.that.HistoryController.create(), this.that.updateData(), this.createHistory = !1, this.that.loading = !1
    }, H.prototype.setClickMobile = function(a) {
        var b = this.position(a, !0);
        b.length && (this.x1 = b[0], this.y1 = b[1])
    }, H.prototype.move = function(a) {
        return this.position(a), this.that.loading || this.that.isApp && !this.that.app.ready ? void(this.active = !1) : void(this.checkPosition() && (this.lcx = this.x_1, this.lcy = this.y_1, this.mouseMoveX = this.x_1, this.mouseMoveY = this.y_1, this.init(), this.renderMouse = !0, this.render(a)))
    }, H.prototype.checkPosition = function() {
        if ("Brush" == this.that.tool && this.that.ToolController.tool.options && 0 !== this.that.ToolController.tool.options.spacing.value) {
            var a = parseInt(this.that.ToolController.tool.options.spacing.value),
                b = Math.max(this.that.settings.brush.image.width, this.that.settings.brush.image.height),
                c = b * (.01 * a);
            if (this.lcx - c < this.x_1 && this.x_1 < this.lcx + c && this.lcy - c < this.y_1 && this.y_1 < this.lcy + c && this.active && "Brush" == this.that.tool) return !1
        } else if ("Filter" == this.that.tool && this.active) {
            var d = 1;
            if (this.x_1 > this.lcx - d && this.x_1 < this.lcx + d && this.y_1 > this.lcy - d && this.y_1 < this.lcy + d) return !1
        } else if (this.lcx === this.x_1 && this.lcy === this.y_1 && this.active && ["Hand"].indexOf(this.that.tool) == -1) return !1;
        return !0
    }, H.prototype.out = function(a) {
        this.position(a), this.init(a), this.renderMouse = !1, this.render(a)
    }, H.prototype.appFinish = function() {
        this.appX = !1, this.appY = !1, this.setLastClicks()
    }, H.prototype.toolsUp = function() {
        this.active && this.up && this.isTouch && ["Bucket"].indexOf(this.that.tool) > -1 && this.that.ToolController.tool.active()
    }, H.prototype.finish = function(a) {
        var b = this,
            c = !1,
            d = !1;
        return this.ignoreFinish && (this.ignoreFinish = !1), this.toolsUp(), this.that.SelectController.active ? this.that.SelectController.setPoint() : (this.pinchEnd(), this.touchEndMove(), this.setLastClicks(), this.activeDrawing = !1, this.isPanning = !1, this.isPinching = !1, this.pinchInit = !1, this.lastPinchDist = 0, this.rightClick = !1, this.that.ColorController.restoreSetColor(), this.active && (this.that.loading = !0, c = !0), this.app_update_frame && (c = !0), this.that.hasDrawn || !this.that.isApp || this.that.app.fingerToDraw || (d = !0), this.that.hasDrawn = !1, this.middleClickDown && this.resetHandTemp(), this.up = !1, this.that.isApp && this.that.app.fingerToDraw || (this.active = !1), void(c && (this.createHistoryTimeout = !1, this.createHistoryTimeout = this.createHistory && (this.that.width > 900 || this.that.height > 900), this.that.LayerController.updateLayer(!1, function(a) {
            b.defaultItems(a, d)
        }, !0, this.createHistoryTimeout))))
    }, H.prototype.defaultItems = function(a, b) {
        return this.createHistory && a && this.createHistoryTimeout ? this.mouseEnd() : (this.that.ToolController.off(), this.that.ToolController.createHistory = !0, this.start_x = !1, this.start_y = !1, this.appX = !1, this.appY = !1, this.rightClick = !1, (this.that.isTouch || this.that.isMobile) && (this.lcx = !1, this.lcy = !1), this.that.isApp && (this.x_0 = -9999, this.y_0 = -9999, this.that.app.fingerToDraw || (this.x_0 = this.x_1, this.y_0 = this.y_1)), !this.createHistory || this.createHistoryTimeout || b || this.mouseEnd(), this.that.loading = !1, ["Pencil"].indexOf(this.that.tool) !== -1 && this.that.ToolController.use(), void this.that.mouseEnded())
    }, H.prototype.removeMobile = function() {
        this.that.isMobile && !this.removedMobile && (this.removedMobile = !0, a(".ui-tooltip").remove(), a("#left-sidebar").removeClass("active"), a("#right-sidebar").removeClass("active"))
    }, H.prototype.checkPreConditions = function() {
        "undefined" == typeof this.that.LayerController.layers[this.that.LayerController.currentLayer] && (this.that.LayerController.currentLayer = 0);
        var a = this.that.LayerController.currentLayer;
        return this.that.online.status && this.that.LayerController.layers[a].name != this.that.online.layer_id ? (this.that.showAlert(this.that.messages("online_layer")), !0) : !(!this.that.LayerController.layers[a].options.locked || ["ColorPicker", "Hand"].indexOf(this.that.tool) != -1) && (this.that.showAlert(this.that.messages("layer_locked")), !0)
    }, H.prototype.down = function(a) {
        if (this.that.online.send = !0, clearTimeout(this.that.LayerController.updateLayerTime), !(this.that.loading || this.that.isApp && !this.that.app.ready || (this.that.isApp || this.removeMobile(), this.that.SelectController.active))) {
            switch (this.createHistory = !0, a.which) {
                case 3:
                    this.that.ColorController.setColor(!0);
                    break;
                default:
                    this.that.ColorController.setColor()
            }
            this.that.isApp || (this.active = !0), this.that.mouseEvent = a, this.setCloseHook(), this.setFirstClicks(this.x_1, this.y_1), this.that.clickCount = !0, this.init(), this.render(a)
        }
    }, H.prototype.setCloseHook = function() {
        this.closeHook || this.that.isApp || (a(window).on("beforeunload", function() {
            return "Did you save your stuff?"
        }), this.closeHook = !0)
    }, H.prototype.init = function() {
        this.that.render()
    }, H.prototype.setFirstClicks = function(a, b) {
        return a || b ? (this.start_x = a, void(this.start_y = b)) : (this.start_x = null != this.lx ? this.lx : this.x_1, void(this.start_y = null != this.ly ? this.ly : this.y_1))
    }, H.prototype.setLastClicks = function() {
        return this.that.isApp && this.that.app.fingerToDraw ? void(this.ignoreLastclicks = !1) : (this.active && (this.last_x = this.lx, this.last_y = this.ly, "Hand" == this.that.tool || this.that.isApp || (this.that.ZoomController.last_x = this.last_x, this.that.ZoomController.last_y = this.last_y)), this.that.isApp && ("Hand" != this.that.tool && !this.ignoreLastclicks, this.app_x_last = this.lx, this.app_y_last = this.ly, this.last_ex = !1, this.last_ey = !1), void(this.ignoreLastclicks = !1))
    }, H.prototype.setLastLocation = function() {
        this.lx = this.x_1, this.ly = this.y_1
    }, H.prototype.setEventLastLocation = function(a, b) {
        this.last_ex = a, this.last_ey = b
    }, H.prototype.checkSamePosition = function(a) {}, H.prototype.exactPos = function() {
        return this.that.width * this.y_0 + this.x_0
    }, H.prototype.position = function(a, b) {
        if (this.that.finished && !this.prevent) {
            var c = this.jElement.offset();
            "CSS" == this.that.zoom.type && this.that.zoom_step > 2 && (this.that.zoom_step = this.that.ZoomController.zoom);
            var d = this.that.ZoomController.zoom,
                e = a.pageX - parseInt(c.left),
                f = a.pageY - parseInt(c.top),
                g = parseInt(this.that.pixel_size);
            if (this.mousePageX = a.pageX, this.mousePageY = a.pageY, this.that.isApp) {
                var h = Math.abs(e - this.last_ex),
                    i = Math.abs(f - this.last_ey);
                h < 4 && (e = this.last_ex), i < 4 && (f = this.last_ey)
            }
            var j = Math.floor(e / (g * d)),
                k = Math.floor(f / (g * d));
            this.appX || (this.appX = j, this.appY = k);
            var l = this.appX - j,
                m = this.appY - k;
            if (this.xx = j, this.yy = k, !this.that.isApp || this.that.isApp && this.that.app.fingerToDraw ? (this.x_1 = Math.floor(e / (g * d)), this.y_1 = Math.floor(f / (g * d))) : (this.x_1 = this.app_x_last - l, this.y_1 = this.app_y_last - m, this.x_1 <= 0 && (this.x_1 = 0), this.y_1 <= 0 && (this.y_1 = 0), this.x_1 >= this.that.width - 1 && (this.x_1 = this.that.width - 1), this.y_1 >= this.that.height - 1 && (this.y_1 = this.that.height - 1)), b) return [this.x_1, this.y_1];
            this.x_0 = null == this.x1 ? this.x_1 : this.x1, this.y_0 = null == this.y1 ? this.y_1 : this.y1, (["Line", "Square", "Circle"].indexOf(this.that.tool) !== -1 && this.active || "Select" == this.that.tool && this.active && this.that.ToolController.tools.SelectTool && this.that.ToolController.tools.SelectTool.options.poly.value) && (this.x_0 = this.start_x, this.y_0 = this.start_y, "Line" == this.that.tool && this.that.settings.isoLines && this.doISOSetup()), ["Pencil", "Brush"].indexOf(this.that.tool) !== -1 && this.that.keys.shift && (this.x_0 = this.start_x, this.y_0 = this.start_y), (["Gradient"].indexOf(this.that.tool) !== -1 && this.that.keys.shift && this.active || "Gradient" == this.that.tool && this.that.ToolController.tool.options.iso.value && this.active) && this.doISOSetup();
            var n = this.x_1,
                o = this.y_1;
            return this.that.isWindowsIE || this.updateMousePosition(n, o), this.x0 = this.x_0, this.y0 = this.y_0, this.active || this.that.isMobile || this.that.isTablet || (this.x_0 = this.x_1, this.y_0 = this.y_1), this.dx = Math.abs(this.x_1 - this.x_0), this.dy = Math.abs(this.y_1 - this.y_0), this.sx = this.x_0 < this.x_1 ? 1 : -1, this.sy = this.y_0 < this.y_1 ? 1 : -1, this.err = this.dx - this.dy, this.x1 = this.x_1, this.y1 = this.y_1, this.last_abs_pos = this.absPosition(), this.setLastLocation(), {
                x: this.x_1,
                y: this.y_1
            }
        }
    }, H.prototype.updateMousePosition = function(a, b) {
        var c = this;
        clearTimeout(this.mousePosTimer), this.mousePosTimer = setTimeout(function() {
            c.mouseXEl.text(a + 1), c.mouseYEl.text(b + 1), c.mouseXE2.text(a + 1), c.mouseYE2.text(b + 1)
        }, 100)
    }, H.prototype.doISOSetup = function() {
        var a = Math.abs(this.start_x - this.x_1),
            b = Math.abs(this.start_y - this.y_1),
            c = a / b * 100;
        a > b && (c = b / a * 100);
        var d = 0;
        c > 25 && (d = .5 * b, a > b && (d = .5 * a)), c > 75 && (d = 1 * b, a > b && (d = 1 * a)), d = d < 0 ? 0 : d, d = Math.floor(d), a > b ? this.start_y < this.y_1 ? this.y_1 = this.start_y + d : this.y_1 = this.start_y - d : this.start_x < this.x_1 ? this.x_1 = this.start_x + d : this.x_1 = this.start_x - d
    }, H.prototype.absPosition = function(a, b) {
        return a = a ? a : this.x_0, b = b ? b : this.y_0, this.that.width * b + a + 1
    }, H.prototype.cordsFromPosition = function(a) {
        var b = 1,
            c = 1,
            d = a.toString(),
            e = a / this.that.width,
            f = e.toString(),
            g = f.split("."),
            h = d.substr(-1);
        return 1 == g.length ? (b = this.that.width, c = g[0]) : (c = parseInt(g[0]) + 1, b = "0" == h ? g[1] + "0" : Math.abs(g[1])), [b, c]
    }, H.prototype.drawingPosition = function(a) {}, H.prototype.render = function(a, b, c) {
        var d = this.that.displayCanvasLocation(),
            e = d.pixelSize;
        if (a = c ? a : d.x, b = c ? b : d.y, this.that.isApp && this.pixelTrace && !this.that.app.fingerToDraw) {
            var f = this.that.pixel_size * this.that.ZoomController.zoom,
                g = a * f,
                h = b * f,
                i = f - 1,
                j = f - 1;
            this.pixelTrace.css({
                left: g,
                top: h,
                height: j,
                width: i
            })
        }
        if (!(this.active && !this.that.isApp || !this.renderMouse && !this.that.isApp || !this["in"] && !this.active || this.that.isMobile && !this.that.isApp || this.that.isApp && this.that.app.fingerToDraw))
            if ("Brush" == this.that.tool && this.that.settings.brush.image) {
                var k = Math.floor(a - this.that.settings.brush.width / 2),
                    l = Math.floor(b - this.that.settings.brush.height / 2);
                this.that.canvas.display.putSimple(this.that.settings.brush.mouse, k, l), this.that.canvas.display.ctx.globalAlpha = .5, this.that.canvas.display.ctx.filter = "invert(1)", this.that.canvas.display.putSimple(this.that.settings.brush.mouse, k, l), this.that.canvas.display.ctx.filter = "none", this.that.canvas.display.ctx.globalAlpha = 1
            } else this.that.ToolController.tool.brushImage ? (a = this.x1 - this.that.ToolController.tool.options.size.value, b = this.y1 - this.that.ToolController.tool.options.size.value, this.that.canvas.display.ctx.globalAlpha = .3, this.that.canvas.display.putSimple(this.that.ToolController.tool.brushImage, a, b), this.that.canvas.display.ctx.globalAlpha = .15, this.that.canvas.display.ctx.filter = "invert(1)", this.that.canvas.display.putSimple(this.that.ToolController.tool.brushImage, a, b), this.that.canvas.display.ctx.filter = "none", this.that.canvas.display.ctx.globalAlpha = 1) : this.that.settings.roundedPixel && this.roundImage && ["Pencil", "Line", "Square", "Circle", "Eraser"].indexOf(this.that.tool) > -1 ? (this.that.canvas.display.ctx.globalAlpha = .3, this.that.canvas.display.putSimple(this.roundImageMouse, a, b), this.that.canvas.display.ctx.globalAlpha = .15, this.that.canvas.display.ctx.filter = "invert(1)", this.that.canvas.display.putSimple(this.roundImageMouse, a, b), this.that.canvas.display.ctx.filter = "none", this.that.canvas.display.ctx.globalAlpha = 1) : (this.that.canvas.display.ctx.fillStyle = "rgba(255,255,255,0.3)", this.that.canvas.display.ctx.fillRect(a, b, e, e), this.that.canvas.display.ctx.fillStyle = "rgba(0,0,0,0.3)", this.that.canvas.display.ctx.fillRect(a, b, e, e))
    }, H.prototype.getPixel = function(a, b, c, d, e, f) {
        d = d ? d : "layer";
        var g = this.that.canvas[d].ctx.getImageData(a, b, 1, 1).data;
        if (f) {
            var h = 4 * this.absPosition(a, b) - 4;
            g[0] = f[h], g[1] = f[h + 1], g[2] = f[h + 2], g[3] = f[h + 3]
        }
        if (e) return [g[0], g[1], g[2], g[3]];
        var i = ("000000" + this.that.rgbaToHex(g[0], g[1], g[2])).slice(-6);
        return c ? i + "" + g[3] : i
    };
    var I = function(a) {
        this.currentLayer = 0, this.that = a, this.frame = a.FrameController.frames[0], this.layers = this.frame.layers, this.beforeHistory = {}, this.layerFocus = !1, this.initLoaded = !1, this.blankImage = !1, this.updateLayerTime = !1, this.opacityChanging = !1, this.html = "", this.currentFilterValue = 0, this.currentFilter = !1
    };
    I.prototype.init = function(a) {
        this.listeners(), this.addLayer(a), this.initLoaded = !0
    }, I.prototype.selectFrame = function(b) {
        if (this.frame = b, this.layers = this.frame.layers, this.that.settings.persLayers || (this.currentLayer = this.frame.selectedLayer), "object" == typeof this.layers) {
            var c = [];
            a.each(this.layers, function(a, b) {
                c.push(b)
            }), this.layers = c
        }
        this.updateList(), this.select()
    }, I.prototype.cloneLayers = function(b, c, d) {
        var e = [],
            f = b ? b : this.that.FrameController.currentFrame,
            g = this.that.FrameController.frames[f];
        c = c ? c : g.layers;
        for (var h = c.length, i = 0; i < h; i++) {
            var j = a.extend(!0, [], c[i]);
            if (e.push(j), e.length == h) return d ? d(e) : e
        }
    }, I.prototype.cloneSingleLayer = function(b) {
        return a.extend(!0, {}, b)
    }, I.prototype.selectByUnqid = function(a) {
        for (var b = 0; b < this.layers.length; b++)
            if (l = this.layers[b], l.unqid == a) return !0
    }, I.prototype.addLayer = function(a, b, d, e, f) {
        var g = this.that.FrameController.currentFrame;
        e = e ? e : 1, a = a ? a : new c(this.layers.length, b), this.layers = this.that.FrameController.frames[g].layers, b && a.init(), d ? a.src = d : this.initLoaded && (a.src = this.blankLayer()), a.opacity = e, f && (a.details = f), this.layers.push(a), this.updateOpacityElement(a), this.updateList()
    }, I.prototype.newFromData = function(a) {
        this.layers.push(a), this.updateList()
    }, I.prototype.limitCheck = function() {
        return this.layers.length >= this.that.maxLayers && (alert("Max layers exceeded."), !0)
    }, I.prototype.promptAddlayer = function() {
        var b = this;
        if (this.that.ToolController && this.that.ToolController.renderChange) return this.that.ToolController.checkRenderNeeded(function() {
            b.promptAddlayer()
        });
        var c = "Layer " + this.layers.length;
        this.addLayer(!1, c);
        var d = this.currentLayer;
        this.currentLayer = this.layers.length - 1, a("#layers-container .layer-list").removeClass("active"), a("#layer-" + this.currentLayer).parent().addClass("active");
        var e = this.that.canvas.layer;
        e.clear(), this.move(parseInt(this.layers.length) - 1, parseInt(d) + 1), this.that.layersNewAllFrames(this.layers[this.currentLayer], parseInt(this.layers.length) - 1, parseInt(d) + 1), this.makeHistory("Layer", "Add", "Undo")
    }, I.prototype.promptRenameLayer = function(a) {
        var b = a.attr("data-id") ? a.attr("data-id") : this.currentLayer,
            c = this.layers[b],
            d = prompt("Layer name", c.name);
        d && (c.name = d, this.that.layersRenameAllFrames(b, d), this.updateList(), this.makeHistory("Layer", "Rename", "Undo"))
    }, I.prototype.listeners = function() {
        var b = this;
        document.getElementById("layers-container") || (this.container = a('<div id="layer_container" class="panel"><div class="append-layers"></div><a href="#" id="add-layer">Add Layer</a></div>'), a(".drawing-wrapper").append(this.container)), a(document).on("mouseup", function(a) {
            b.opacityChanging && b.opacityLayerUpdate()
        }), a("#add-layer").click(function() {
            b.promptAddlayer()
        }), a("#rename-layer").click(function() {
            b.promptRenameLayer(a(this))
        }), a("#layer-focus").click(function() {
            this.layerFocus ? this.layerFocus = !1 : this.layerFocus = !0, b.select()
        });
        var c = 0,
            d = !1,
            e = 125;
        (this.that.isMobile || this.that.isTablet || this.that.isTouch) && (d = ".layer-preview", e = 75), this.that.isApp && (d = ".layer-move"), a("#layers-container").sortable({
            scrollSpeed: 3,
            delay: e,
            axis: "y",
            handle: d,
            placeholder: "layer-placeholder",
            start: function(a, b) {
                var d = b.item;
                c = d.attr("data-id")
            },
            update: function(d, e) {
                var f = (e.item, 0);
                a(a("#layers-container .layer-list").reverse()).each(function() {
                    var d = a(this).attr("data-id");
                    d == c && (b.move(c, f, !0), b.updateMove()), f++
                })
            }
        }), a("#delete-layer").click(function() {
            b.deleteLayer(a(this))
        }), a("#opacity-layer").on("input", function() {
            b.opacityLayer(a(this))
        }), a("#opacity-layer").on("change", function() {
            b.that.updateData()
        }), a("#duplicate-layer").click(function() {
            b.duplicate()
        }), a(".sidebar-name-btn").click(function() {
            b.updateName()
        }), a(".layer-transform").click(function() {
            b.checkPreConditions() || b.that.SelectController.selectLayerContent()
        }), a(".layer-fill").click(function() {
            b.alterPixels("fill")
        }), a(".layer-invert").click(function() {
            b.alterPixels("invert")
        }), a(".layer-clonse-frames").click(function() {
            b.cloneToAllFrames()
        }), this.that.isApp || (a(".sidebar-layer-blend").change(function() {
            b.updateBlend()
        }), a(".clipping-mask-toggle").click(function() {
            b.toggleClippingMask()
        })), a("#opacity-layer-number").click(function() {
            b.promptLayerOpacity()
        }), a("#right-sidebar, #layer-dropdown").on("click", ".layer-outline", function(c) {
            c.preventDefault(), b.outlineLayer(a(this).attr("data-id"))
        }), a("#popup-container").on("click", ".download-layer", function(a) {
            a.preventDefault(), b.download()
        }), a("#popup-container").on("click", ".download-all-layers", function(a) {
            a.preventDefault(), b.downloadAll()
        }), a(".flip-layer").click(function(c) {
            c.preventDefault();
            var d = a(this).attr("data-type");
            b.flipLayer(d)
        }), a(".move-layer").click(function() {
            b.doMerge(a(this).attr("data-direction"))
        }), a("#layers-panel").on("click", ".layer-viewable", function() {
            b.layerVisability(a(this))
        }), a("#layers-panel").on("click", ".layer-lock", function() {
            b.layerLock(a(this))
        });
        var f = "click touchstart";
        this.that.isApp && (f = "click"), a("#layers-panel").on(f, ".layer-select", function() {
            b.select(a(this))
        }), a("#layers-panel").on("dblclick", ".layer-select", function() {
            b.promptRenameLayer(a(this))
        }), b.that.isApp ? a("#layer-buttons-wrapper").on("click", ".merge", function() {
            b.mergeLayer(a(this).attr("data-direction"))
        }) : a("#layers-panel").on("click", ".merge", function() {
            b.mergeLayer(a(this).attr("data-direction"))
        }), a(".layer-options-range").on("input", function() {
            b.changingOption = !0, b.changeLayerOption(a(this))
        }), a(".layer-options-range").bind("pointerup", function() {
            b.changeingOptionEnd()
        })
    }, I.prototype.changeLayerOption = function(b, c, d, e) {
        var f = c ? c : b.val(),
            g = d ? d : b.attr("data-option"),
            h = e ? e : b.attr("data-type"),
            i = this.that.capitalizeFirstLetter(g);
        if (this.layers[this.currentLayer].options.locked) return this.that.showAlert(this.that.messages("layer_locked_alter")), !0;
        switch (h) {
            case "percent":
                f += "%";
                break;
            case "pixels":
                f += "px";
                break;
            case "deg":
                f += "deg"
        }
        this.currentFilterValue || (this.currentFilterValue = f, this.currentFilter = g), this.that.filter.imageData || this.that.filter.status || (this.that.filter.imageData = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), this.that.filter.newImageData = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height)), this.that.isApp || a("#" + g + "-update").text(f), this.that.filter.status ? this.layers[this.currentLayer].options.filter[g] = f : (this.that["filter" + i]("layer", f), this.that.canvas.layer.ctx.putImageData(this.that.filter.newImageData, 0, 0)), this.that.render()
    }, I.prototype.changeingOptionEnd = function(b) {
        var c = this.layers[this.currentLayer];
        this.that.filter.status || (this.that.isApp ? (c.createFilters(), this.that.app.store.commit("app/setFilterByPayload", {
            name: this.currentFilter,
            val: c.options.filter[this.currentFilter]
        }), this.that.app.store.dispatch("app/loadFilters")) : (a("#" + this.currentFilter + "-update").text(a("#" + this.currentFilter + "-range").attr("data-default")), a("#" + this.currentFilter + "-range").val(a("#" + this.currentFilter + "-range").attr("data-default"))), this.currentFilterValue = !1, this.currentFilter = !1), this.that.filter.imageData = !1, this.updateLayer(), this.that.render(), this.that.FrameController.updateFramePreview(), this.that.OnlineController.writeLayer(), this.that.ToolController.restore(), this.that.ToolController.use(), this.makeHistory("Layer", "Layer Style", "Undo")
    }, I.prototype.setLayerOptions = function(b) {
        var c = this.layers[this.currentLayer];
        if (this.that.isApp) return c.options.filter || c.createFilters(), this.that.app.store.commit("app/setFilters", c.options.filter), void this.that.app.store.dispatch("app/loadFilters");
        if (this.that.filter.status) {
            c.options.filter || c.createFilters();
            for (var d in c.options.filter) a("#" + d + "-update").text(c.options.filter[d]), a("#" + d + "-range").val(parseFloat(c.options.filter[d]))
        }
    }, I.prototype.setSibebarLayer = function(b) {
        b = b ? b : this.currentLayer;
        var c = this.layers[b];
        a("#layer-blend-options").val(c.options.blend), this.checkClippingMask(c)
    }, I.prototype.toggleClippingMask = function(b) {
        b = b ? b : this.currentLayer;
        var c = this.layers[b];
        "source-atop" == c.options.blend ? a("#layer-blend-options").val("source-over") : a("#layer-blend-options").val("source-atop"), this.updateBlend()
    }, I.prototype.checkClippingMask = function(b) {
        a("#clipping-mask").prop("checked", !1), "source-atop" == b.options.blend && a("#clipping-mask").prop("checked", !0)
    }, I.prototype.updateBlend = function(b) {
        if (this.checkPreConditions(b)) return void a("#layer-blend-options").val("source-over");
        b = b ? b : this.currentLayer;
        var c = this.layers[b];
        c.options.blend = a("#layer-blend-options").val(), this.checkClippingMask(c), this.updateList(), this.that.render(), this.that.FrameController.updateFramePreview(), this.that.OnlineController.writeLayer(), this.makeHistory("Layer", "Layer Name", "Undo")
    }, I.prototype.doMerge = function(a) {
        "up" == a ? this.move(this.currentLayer, parseInt(this.currentLayer) + 1, !0) : this.move(this.currentLayer, parseInt(this.currentLayer) - 1, !0), this.updateMove()
    }, I.prototype.updateMove = function() {
        this.that.FrameController.frame().layers = this.layers, this.makeHistory("Layer", "Move", "Undo")
    }, I.prototype.flipLayer = function(a) {
        var b = this,
            c = this.that.canvas.layer.dataURL();
        this.that.ToolController.restore(), this.that.flip(a, c, this.that.canvas.layer, function() {
            b.updateLayer(), b.that.render(), b.that.FrameController.updateFramePreview(), b.that.OnlineController.writeLayer(), setTimeout(function() {
                b.that.ToolController.restore()
            }, 50), b.makeHistory("Layer", "Flip", "Undo")
        })
    }, I.prototype.outlineLayer = function(a, b) {
        var c = this;
        a = a ? a : this.currentLayer;
        var d = this.that.settings.outline.layer_id;
        if (this.that.isApp && (d = this.currentLayer), !this.checkPreConditions()) {
            if (!b) return this.that.OutlineController.open(a);
            var e = this.layers[d];
            return this.that.ToolController.restore(), this.that.render(), this.that.outline(e, "rendering", function() {
                c.updateLayer(), c.that.render(), c.that.FrameController.updateFramePreview(), c.that.OnlineController.writeLayer(), c.makeHistory("Layer", "Outline", "Undo")
            })
        }
    }, I.prototype.cloneToAllFrames = function() {
        var a = this;
        this.that.layerCloneToAllFrames(this.currentLayer, this.layers[this.currentLayer], function() {
            a.updateLayer(), a.that.render(), a.makeHistory("Layer", "Layer Clone Frames", "Undo")
        })
    }, I.prototype.alterPixels = function(a, b) {
        if (!this.checkPreConditions(b)) {
            this.that.ToolController.restore(), this.that.render(), b = b ? b : this.currentLayer;
            var c = this.layers[b];
            this.that.ToolController.restore(), this.that.canvas.rendering["default"](), this.that.canvas.rendering.putSimple(c.src);
            for (var d = this.that.canvas.rendering.ctx.getImageData(0, 0, this.that.width, this.that.height), e = this.that.hexToRgb(this.that.getDrawingcolor()), f = 0; f < d.data.length; f += 4) 0 != d.data[f + 3] && ("fill" == a && (d.data[f] = e.r, d.data[f + 1] = e.g, d.data[f + 2] = e.b), "invert" == a && (d.data[f] = 255 - d.data[f], d.data[f + 1] = 255 - d.data[f + 1], d.data[f + 2] = 255 - d.data[f + 2]));
            this.that.canvas.layer["default"](), this.that.canvas.layer.ctx.putImageData(d, 0, 0), this.updateLayer(), this.that.render(), this.that.online.status && this.that.OnlineController.writeLayer(), this.that.FrameController.updateFramePreview(), this.makeHistory("Layer", "Layer Style", "Undo")
        }
    }, I.prototype.checkPreConditions = function(a) {
        return a = a ? a : this.currentLayer, !!this.layers[a].options.locked && (this.that.showAlert(this.that.messages("layer_locked_alter")), !0)
    }, I.prototype.deleteLayer = function(b, c, d, e) {
        if (d = d ? d : this.currentLayer, this.layers[d].options.locked) return void this.that.showAlert(this.that.messages("layer_locked_delete"));
        var f = this.layers[d];
        if (1 != this.layers.length) {
            if (this.del(f.id), !e) {
                var g = 0 == this.currentLayer ? 0 : this.currentLayer - 1;
                this.currentLayer = g, this.selectLayer(g)
            }
            a("#layer-" + d).remove();
            var h = this;
            this.that.layersDeleteAllFrames(f.id), setTimeout(function() {
                h.updateList(), h.that.render(), h.makeHistory("Layer", "Delete", "Redo"), h.that.ToolController.restore(), h.that.updateData()
            }, 1)
        }
    }, I.prototype.del = function(a) {
        var b = this.layers[a];
        "object" == typeof b && (this.frame.layers.splice(a, 1), this.layers = this.frame.layers)
    }, I.prototype.mergeLayer = function(a, b, d, e, f) {
        this.that.loading = !0;
        var g = this,
            h = d ? d.layers : this.layers;
        b = b ? b : this.currentLayer;
        var i = h[b],
            j = !1,
            k = this.that.canvas.data,
            l = i.id;
        k.canvas.height = this.that.canvas.layer.canvas.height, k.canvas.width = this.that.canvas.layer.canvas.width, j = "down" == a ? h[parseInt(b) - 1] : h[parseInt(b) + 1], "object" == typeof j && ("down" == a ? (k.ctx.filter = this.that.layerOptionsFilter(j), k.ctx.globalCompositeOperation = j.options.blend, k.putImageData(j.src, j.opacity), k.ctx.filter = this.that.layerOptionsFilter(i), k.ctx.globalCompositeOperation = i.options.blend, k.putImageData(i.src, i.opacity), l = parseInt(this.currentLayer) - 1) : (k.ctx.filter = this.that.layerOptionsFilter(i), k.ctx.globalCompositeOperation = i.options.blend, k.putImageData(i.src, i.opacity), k.ctx.filter = this.that.layerOptionsFilter(j), k.ctx.globalCompositeOperation = j.options.blend, k.putImageData(j.src, j.opacity)), k.ctx.filter = "none", k.ctx.globalCompositeOperation = "source-over", k.image().onload = function() {
            var k = new c(h.length, i.name);
            return k.src = this, f ? f(k, d) : (g.currentLayer = l, void(e || (g.del(j.id), g.del(l), g.that.layersMergeAllFrames(a, b + 0, j.id, l, parseInt(h.length) - 1, parseInt(g.currentLayer), function() {
                g.layers.push(k), g.move(parseInt(g.layers.length) - 1, parseInt(g.currentLayer)), g.updateList(), g.select(), g.that.FrameController.frame().layers = g.layers, g.makeHistory("Layer", "Merge", "Undo"), g.that.loading = !1, g.that.updateData()
            }))))
        })
    }, I.prototype.opacityLayer = function(b) {
        var c = this.layers[this.currentLayer];
        if (this.checkPreConditions()) return a("#opacity-layer").val(c.opacity), void a("#opacity-layer-number").text(Math.floor(100 * c.opacity) + "%");
        this.opacityChanging || (this.opacityChanging = c.opacity);
        var d = b.val();
        c.opacity = d, a("#opacity-layer-number").text(Math.floor(100 * c.opacity) + "%"), this.that.updateDisplayCanvas(this.layers, this.currentLayer), this.that.FrameController.updateFramePreview(), this.updateLayer(), this.that.render()
    }, I.prototype.promptLayerOpacity = function() {
        var b = this.layers[this.currentLayer],
            c = prompt("Please enter between 0 - 100", Math.floor(100 * b.opacity));
        if (null != c && (c = parseInt(c), c <= 100 && c >= 0)) {
            var d = c / 100;
            b.opacity = d, a("#opacity-layer-number").text(Math.floor(100 * b.opacity) + "%"), a("#opacity-layer").val(d), this.that.updateDisplayCanvas(this.layers, this.currentLayer), this.that.FrameController.updateFramePreview(), this.updateLayer(), this.that.render(), this.opacityLayerUpdate()
        }
    }, I.prototype.opacityLayerUpdate = function() {
        var a = this.layers[this.currentLayer];
        this.opacityChanging && this.opacityChanging != a.opacity && this.makeHistory("Layer", "Layer Opacity", "Undo"), this.opacityChanging = !1, this.that.online.status && this.that.OnlineController.writeLayer()
    }, I.prototype.updateOpacityElement = function(b) {
        return "object" != typeof b ? (alert(this.that.getResponse("res-layer-error")), this.that.ExportImportController["export"]()) : (a("#opacity-layer").val(b.opacity), void a("#opacity-layer-number").text(Math.floor(100 * b.opacity) + "%"))
    }, I.prototype.layerActiveTemplate = function(a) {
        return this.currentLayer == a ? "active" : ""
    }, I.prototype.iconLock = function(a) {
        return a ? this.that.isApp ? '<i class="ft ft-icon-lock"></i>' : '<i class="fa fa-lock" aria-hidden="true"></i>' : this.that.isApp ? '<i class="ft ft-icon-unlock "></i>' : '<i class="fa fa-unlock q-op" aria-hidden="true"></i>'
    }, I.prototype.iconActive = function(a) {
        return a ? this.that.isApp ? '<i class="ft ft-icon-eye"></i>' : '<i class="fa fa-circle" aria-hidden="true"></i>' : this.that.isApp ? '<i class="ft ft-icon-eye-off"></i>' : '<i class="fa fa-circle-o" aria-hidden="true"></i>'
    }, I.prototype.template = function(a, b) {
        var c = this,
            d = "",
            e = "",
            f = "",
            g = function() {
                return b.options.locked ? "locked" : ""
            },
            h = function() {
                return b.details && b.details.image ? '<img src="' + b.details.image + '" width="16px" height="16px" style="margin-right:5px;border-radius:20px" alt="" /> ' : ""
            },
            i = function() {
                return b.details && b.details.online_name && b.details.online_name == c.that.online.layer_id ? "bl" : ""
            },
            i = function() {
                return b.details && b.details.online_name && b.details.online_name == c.that.online.layer_id ? "bl" : ""
            },
            j = function() {
                return b.details && b.details.online_name ? "layer-" + b.details.online_name : ""
            };
        return "source-atop" == b.options.blend && (e = '<div class="layer-icon fl" title="Clipping Mask"><i class="fa fa-level-down"></i></div>',
            this.that.isApp && (e = '<div class="layer-icon pr-1" title="Clipping Mask"><i class="ft ft-icon-corner-left-down"></i></div>')), this.that.isApp && (f = '<div class="layer-move"><div class="layer-move-icon"><i class="ft ft-icon-maximize-2"></i></div></div>'), d = '<div id="layer-preview-' + a + '" class="layer-preview layer-select preview-layer-' + a + '" data-id="' + a + '" style="background-image:url(' + b.src.src + ');"></div>', '<div title="Layer Status" id="layer-' + a + '" class="layer-list ' + i() + " " + g() + " " + j() + " layer-" + a + " " + this.layerActiveTemplate(a) + '" data-id="' + a + '">' + f + '<div class="layer-viewable" title="Visible" data-id="' + a + '">' + this.iconActive(b.active) + "</div>" + e + d + '<div class="layer-name layer-select layer-' + a + '" title="' + b.name + '" data-id="' + a + '">' + h() + b.name + '</div><div class="layer-inline-item layer-lock layer-' + a + '" title="Lock/Unlock Layer" data-id="' + a + '">' + this.iconLock(b.options.locked) + '</div><div class="layer-outline layer-' + a + '" title="Outline Layer" data-id="' + a + '"><i class="fa fa-square-o" aria-hidden="true"></i></div></div>'
    }, I.prototype.layerLock = function(a) {
        var b = (a.parent().attr("data-id"), this.layers[a.parent().attr("data-id")]);
        b.options.locked = !b.options.locked, this.updateList(), this.makeHistory("Layer", "Layer Lock", "Undo"), this.that.updateData()
    }, I.prototype.layerVisability = function(a) {
        var b = (a.parent().attr("data-id"), this.layers[a.parent().attr("data-id")]);
        b.active ? (b.active = !1, a.html(this.iconActive(b.active))) : (b.active = !0, a.html(this.iconActive(b.active))), this.that.updateDisplayCanvas(this.layers, this.currentLayer), this.that.FrameController.updateFramePreview(), this.that.render(), this.that.updateData(), this.makeHistory("Layer", "Layer Visability", "Undo")
    }, I.prototype.layerVisabilitySwitch = function(b) {
        var c = [];
        a.each(b, function(a, b) {
            c.push(parseInt(b))
        }), a.each(this.layers, function(a, b) {
            c.indexOf(b.id) ? b.active = !0 : b.active = !1
        })
    }, I.prototype.select = function(a, b, c) {
        if (this.that.ToolController.restore(), b || 0 === b) {
            if (b < 0 || !this.layers[b] || b > this.layers.length - 1) return;
            this.currentLayer = b
        }
        a && (this.currentLayer = a.parent().attr("data-id")), this.selectLayer(this.currentLayer), c && this.scrollTo()
    }, I.prototype.scrollTo = function() {
        var b = a("#layers-container"),
            c = a("#layer-" + this.currentLayer);
        b.animate({
            scrollTop: b.scrollTop() + (c.offset().top - b.offset().top)
        }, "fast")
    }, I.prototype.selectLayer = function(b) {
        if (b = parseInt(b), !(b < 0 || !this.layers[b] || b > this.layers.length - 1)) {
            b = b ? b : this.currentLayer, this.that.isApp;
            var c = this.layers[b];
            this.currentLayer = b, this.frame.selectedLayer = this.currentLayer, this.updateOpacityElement(c), this.updateLayerCanvas(c.src), this.setSibebarLayer(), this.that.updateDisplayCanvas(this.layers, this.currentLayer), this.that.render(), this.setLayerOptions(), a("#layers-container .layer-list").removeClass("active"), a("#layer-" + this.currentLayer).addClass("active")
        }
    }, I.prototype.updateLayerCanvas = function(a) {
        var b = this.that.canvas.layer;
        b.clear(), b.putImageData(a)
    }, I.prototype.updateList = function() {
        var b = this,
            c = a("#layers-container");
        c.html(""), a.each(this.layers, function(a, d) {
            b.layers[a].id = a, c.prepend(b.template(a, d))
        }), this.that.updateDisplayCanvas(this.layers, this.currentLayer), a("#layer-count").text(this.layers.length)
    }, I.prototype.updateCurrentLayerSrc = function(b) {
        var c = this;
        b = b ? b : c.currentLayer, setTimeout(function() {
            a("#layer-preview-" + b).css("backgroundImage", "url(" + c.layers[b].src.src + ")")
        }, 1)
    }, I.prototype.render = function() {
        var a = (this.that.canvas.layer.canvas, this.that.canvas.display, this.that.canvas.display.canvas.width, this.that.canvas.display.canvas.height, this.layers[this.currentLayer]),
            b = this;
        "undefined" != typeof a && null != a && (a.active && (this.that.canvas.display.ctx.filter = this.that.layerOptionsFilter(a), "source-atop" == a.options.blend && this.layers[this.currentLayer - 1] ? this.that.clipRender(a, this.layers[this.currentLayer - 1], function(a) {
            b.that.canvas.display.putImageData(a, 1, b.that.zoom)
        }, this.that.canvas.layer.canvas) : (this.that.canvas.display.ctx.globalCompositeOperation = a.options.blend, this.that.canvas.display.putImageData(this.that.canvas.layer.canvas, a.opacity, this.that.zoom, a)), this.that.canvas.display.ctx.filter = "none", this.that.canvas.display.ctx.globalCompositeOperation = "source-over"), this.that.updateTileCanvases())
    }, I.prototype.updateLayerPreview = function(b, c) {
        a("#layer-preview-" + b.id).length && a("#layer-preview-" + b.id).css({
            "background-image": "url(" + c + ")"
        })
    }, I.prototype.blankLayer = function() {
        var a = this.that.canvas.layer;
        a["default"]();
        var b = new Image;
        return b.src = a.canvas.toDataURL("image/png"), b
    }, I.prototype.updateLayer = function(a, b, c, d) {
        var e = this,
            f = this.layers[this.currentLayer],
            g = this.that.canvas.layer;
        return d ? (clearTimeout(this.updateLayerTime), this.updateLayerTime = setTimeout(function() {
            e.updateLayer(a, b, c)
        }, 300), void b()) : void g.loadBlobToImage(function(d, g) {
            return "undefined" == typeof f || null == f ? (e.currentLayer = 0, e.updateList(), e.select(), void console.info("The app has ran into an error. Enable AutoSave or Save locally and re-open to save data.")) : (e.updateLayerPreview(f, g), a ? d : (f.src = d, c && e.that.FrameController.updateFramePreview(), b ? b(d) : void 0))
        })
    }, I.prototype.move = function(a, b, c) {
        b >= this.layers.length || b < 0 || (this.layers.splice(b, 0, this.layers.splice(a, 1)[0]), this.currentLayer = b, this.updateList(), this.select(), this.scrollTo(), c && this.that.layersMoveAllFrames(b, a))
    }, I.prototype["import"] = function(a) {
        var b = "Layer " + this.layers.length,
            d = this.layers[this.currentLayer],
            e = new c(this.layers.length, b, a);
        this.layers.push(e), this.move(parseInt(this.layers.length) - 1, parseInt(d.id) + 1), this.updateList(), this.select(), this.that.settings.persLayers = !1, this.that.FrameController.frame().layers = this.layers, this.makeHistory("Layer", "Imported Layer", "Undo")
    }, I.prototype.duplicate = function() {
        var a = this,
            b = this.layers[this.currentLayer];
        if (!this.limitCheck()) {
            var c = jQuery.extend(!0, {}, b);
            c.name = c.name + " Copy", c.src = c.src.src;
            var d = JSON.stringify(c),
                e = JSON.parse(d);
            this.that.loadImage(e.src, function(c) {
                e.src = c, a.layers.push(e), a.that.layerDuplicateAllFrames(e, parseInt(a.layers.length) - 1, parseInt(b.id) + 1, function() {
                    a.move(parseInt(a.layers.length) - 1, parseInt(b.id) + 1), a.updateList(), a.select(), a.that.FrameController.frame().layers = a.layers, a.makeHistory("Layer", "Add Duplicate", "Undo"), a.that.updateData()
                })
            })
        }
    }, I.prototype.makeHistory = function(a, b, c) {
        if (!this.that.online.status) {
            var d = this;
            this.updateLayer(!1, function() {
                d.that.HistoryController.add("undo")
            })
        }
    }, I.prototype.flatten = function(a, b, c, d, e, f) {
        var g = this,
            h = b ? this.that.previewSize : 1;
        c && (h = c);
        var i = this.that.width * h,
            j = this.that.height * h;
        this.that.canvas.data.canvas.width = i, this.that.canvas.data.canvas.height = j, this.that.canvas.data.setSmoothing(), this.that.canvas.data.clear();
        for (var k = a.length, l = 0, m = [], n = 0; n < k; n++) {
            var o = a[n],
                p = o.src;
            if (o.active) {
                1 != o.opacity && this.that.canvas.data.setAlpha(o.opacity), "string" != typeof p && "" != p && p || (p = this.that.canvas.layer.image());
                var q = p.width * h,
                    r = p.height * h;
                this.that.canvas.data.ctx.filter = this.that.layerOptionsFilter(o, h), "source-atop" == o.options.blend && o.active && a[n - 1] && a[n - 1].active ? (this.that.canvas.data.setAlpha(1), o.src = p, this.that.clipRender(o, a[n - 1], function(a) {
                    g.that.canvas.data.putImageData(a, 1, g.that.zoom)
                })) : (this.that.canvas.data.ctx.globalCompositeOperation = o.options.blend, this.that.canvas.data.ctx.drawImage(p, 0, 0, q, r)), this.that.canvas.data.ctx.globalCompositeOperation = "source-over", this.that.canvas.data.ctx.filter = "none", this.that.canvas.data.restoreAlpha(), m.push(o)
            }
            if (l++, l == k) {
                var s = this.that.createCanvas("temp", this.that.canvas.data.canvas.width, this.that.canvas.data.canvas.height, !1);
                return s.putSimple(this.that.canvas.data.canvas, 0, 0), f && d ? s.loadBlob(function(a) {
                    d(a), g.that.render()
                }) : (this.that.isApp || (this.that.canvas.extended && e && this.that.canvas.extended.ctx.drawImage(this.that.canvas.data.canvas, 0, 0), this.that.canvas.data["default"]()), d ? f ? s.loadBlob(function(a) {
                    d(a), g.that.render()
                }) : d(this.that.canvas.temp.dataURL()) : this.that.canvas.temp.dataURL())
            }
        }
    }, I.prototype.download = function(a, b) {
        a = "undefined" != typeof a ? a : this.currentLayer;
        var c = this,
            d = this.layers[a],
            e = this.that.width * this.that.downloadSizes.layer,
            f = this.that.height * this.that.downloadSizes.layer;
        this.that.canvas.rendering.clear(), this.that.canvas.rendering.canvas.width = e, this.that.canvas.rendering.canvas.height = f, this.that.canvas.rendering.ctx.mozImageSmoothingEnabled = !1, this.that.canvas.rendering.ctx.imageSmoothingEnabled = !1, this.that.canvas.rendering.ctx.drawImage(d.src, 0, 0, e, f), this.that.canvas.rendering.canvas.toBlob(function(a) {
            return c.that.canvas.rendering["default"](), b ? b(a) : void saveAs(a, "pixil-layer-" + d.name + ".png")
        })
    }, I.prototype.downloadAll = function() {
        var a = 0,
            b = this,
            c = new JSZip;
        if (1 == this.layers.length) return b.download(a);
        var d = function() {
            return a >= b.layers.length ? void c.generateAsync({
                type: "blob"
            }).then(function(a) {
                saveAs(a, "pixilart-layers.zip")
            }) : void b.download(a, function(b) {
                c.file("pixil-layer-" + a + ".png", b), a++, d()
            })
        };
        d()
    };
    var J = function(a) {
        this.currentFrame = 0, this.that = a, this.speeds = [25, 50, 75, 100, 125, 150, 200, 250, 300, 350, 400, 450, 500, 1e3, 2500, 5e3], this.frames = [], this.template = function(a) {
            var b = this.frames[a],
                c = "";
            a == this.currentFrame && (c = "active");
            var d = "";
            return this.that.isApp && (d = '<div class="frame-move"><div class="frame-move-icon"><i class="ft ft-icon-maximize-2"></i></div></div>'), '<div class="frame-select frame-id-' + a + " " + c + '" data-id="' + a + '" id="frame-' + a + '"><div class="id-image select-frame" data-id="' + a + '">' + this.getPreview(a) + '</div><div class="frame-controllers"><div class="buttons-container"><div class="speed-container"><select class="frame-speed select-back ttip" title="Frame Speed" data-id="' + a + '">' + this.speedOptions(b.speed) + "</select></div></div></div>" + d + "</div>"
        }
    };
    J.prototype.getPreview = function(a) {
        this.frames[a];
        return '<span class="frame-tag">' + (parseInt(a) + 1) + '</span><img src="' + this.frames[a].preview + '" id="preview-img-' + a + '" class="preview-image-frame preview-img-' + a + '" alt="preview-image"/>'
    }, J.prototype.updateFrameCount = function() {
        this.frames.length > 1 ? a("#frame-count-wrapper").show(0) : a("#frame-count-wrapper").hide(), a("#frame-count").text(this.frames.length)
    }, J.prototype.updateCurrentFrame = function() {
        var b = parseInt(this.currentFrame) + 1;
        a("#current-frame").text(b)
    }, J.prototype.updateFramePreview = function(b, c) {
        b = b ? b : this.currentFrame;
        var d = this.frames[b],
            e = this;
        "object" == typeof d && this.that.LayerController.flatten(d.layers, !0, 1, function(c) {
            d.preview, a("#preview-img-" + b).attr("src", c), e.that.NavigationController.update(c), d.preview = c
        }, !1, !0)
    }, J.prototype.speedOptions = function(a) {
        if (!a) var a = 100;
        for (var b = "", c = 0; c < this.speeds.length; c++) {
            var d = this.speeds[c];
            b += '<option value="' + d + '" ', d == a && (b += 'selected="selected" '), b += ">" + d + " ms</option>"
        }
        return b
    }, J.prototype.appendOptionsToAllFramesSpeed = function() {
        for (var b = 0; b < this.speeds.length; b++) {
            var c = this.speeds[b];
            a("#frame-speed-all").append(a("<option>", {
                value: c,
                text: c
            }))
        }
    }, J.prototype.init = function(a) {
        a || this.listeners(), this.appendOptionsToAllFramesSpeed(), this["new"](!0)
    }, J.prototype.frame = function(a) {
        var a = a ? a : this.currentFrame;
        return this.frames[a]
    }, J.prototype.listeners = function() {
        var b = this,
            c = "mousedown";
        this.that.isApp && (c = "click");
        var d = 0,
            e = !1,
            f = 125;
        (this.that.isMobile || this.that.isTablet || this.that.isTouch) && (e = ".frame-tag", f = 75), this.that.isApp && (e = ".frame-move"), a("#frames-appended").sortable({
            scrollSpeed: 3,
            delay: f,
            axis: "x",
            handle: e,
            placeholder: "frame-placeholder",
            start: function(a, b) {
                var c = b.item;
                d = c.attr("data-id")
            },
            update: function(c, e) {
                var f = (e.item, 0);
                a("#frames-appended .frame-select").each(function() {
                    var c = a(this).attr("data-id");
                    c == d && b.move(d, f, !1, !1, !0), f++
                })
            }
        });
        var g = "click touchstart";
        this.that.isApp && (g = "click"), a("#frames-placement").on(g, ".select-frame", function() {
            var c = a(this).attr("data-id");
            b.select(c, !1, !0)
        }), a("#canvas-layers-container #frame-tiles").on("click", ".frame-tile-item", function() {
            var c = a(this).attr("data-id");
            b.select(c)
        }), a(".add-frame").bind(c, function() {
            b.add()
        }), a(".duplicate-frame").bind(c, function() {
            var a = b.currentFrame;
            b.duplicate(parseInt(a))
        }), a(".frame-delete").bind("click", function() {
            var c = a(this).attr("data-id");
            c || (c = b.currentFrame), b["delete"](c)
        }), a("#frames-tile-toggle").click(function() {
            b.that.toggleFrameTile()
        }), a(".frame-flip").click(function(c) {
            c.preventDefault();
            var d = a(this).attr("data-type");
            b.flip(d)
        }), a("#frames-placement").on("change", ".frame-speed", function() {
            var c = a(this).val(),
                d = a(this).attr("data-id");
            c > parseInt(5e3) && (c = 5e3), c < parseInt(10) && (c = 10), b.speed(d, parseInt(c))
        }), a("#popup-container").on("click", ".download-frame", function(a) {
            a.preventDefault(), b.download()
        }), a("#popup-container").on("click", ".download-all-frames", function(a) {
            a.preventDefault(), b.downloadAll()
        }), a("#popup-container").on("click", ".download-sprite-sheet", function(a) {
            a.preventDefault(), b.downloadSheet()
        }), a(".all-frames-speed").change(function() {
            var c = a(this).val();
            b.updateAllSpeed(c)
        }), a("#frames-placement").on("click", ".frame-move", function() {
            b.moveFrame(a(this).attr("data-direction"))
        })
    }, J.prototype.moveFrame = function(a, b) {
        b = b ? b : this.currentFrame;
        var c = parseInt(b) + 1;
        "left" == a && (c = parseInt(b) - 1), this.move(b, c)
    }, J.prototype.select = function(b, c, d) {
        if (!(b < 0 || !this.frames[b] || b > this.frames.length - 1)) {
            this.that.ToolController.restore();
            this.frames[b];
            this.currentFrame = b, a("#frames-appended .frame-select").removeClass("active"), a("#frames-appended .frame-id-" + b).addClass("active"), c || (this.that.setOnionSkin(), this.that.showOnionSkin(!0)), this.updateCurrentFrame(), this.that.LayerController.selectFrame(this.frame()), this.that.LayerController.updateCurrentLayerSrc(), this.updateFramePreview(), this.updateFrameTiles()
        }
    }, J.prototype.scrollTo = function() {
        var b = a("#frames-container"),
            c = a("#frame-" + this.currentFrame);
        c.offset().left > a(window).width() && b.scrollLeft(b.scrollLeft() + (c.offset().left - b.offset().left))
    }, J.prototype.flip = function(a) {
        a = a ? a : "x";
        var b = this,
            c = this.that.LayerController.layers;
        if (!this.that.online.status) {
            if (!this.that.canvas.extended) return this.that.createCanvas("extended", this.that.width, this.that.height, function() {
                b.flip(a)
            });
            for (var d = 0, e = 0; e < c.length; e++) {
                var f = this.that.flipCanvas(a, c[e].src, this.that.canvas.extended),
                    g = new Image;
                g.i = e, g.onload = function() {
                    d++, c[this.i].src = this, d >= c.length && (b.updateFramePreview(), b.select(b.currentFrame), setTimeout(function() {
                        b.that.ToolController.restore()
                    }, 50), b.that.LayerController.makeHistory("Frame", "Flip", "Undo"), b.that.canvas.extended.destroy())
                }, g.src = f
            }
        }
    }, J.prototype["new"] = function(a, b, e, f, g) {
        this.frames.push(new d);
        var h = parseInt(this.currentFrame),
            i = this.frames.length - 1;
        if (this.currentFrame = i, !a || f) {
            var j = new c(0, "Background - Frame" + i, this.newCanvas());
            e && (j.src = e), j.init(), this.frame().layers.push(j), this.move(this.frames.length - 1, h + 1, !0), g ? this.select(0, !0) : this.select(h + 1, !0)
        }
        this.frame().init(this.that.width, this.that.height), b && (this.frame().speed = b), e && (this.frame().preview = e.src), this.updateList(), this.that.updateData(), this.frameScrollLeft(), this.that.finished && this.that.layersNewFrame(this.frame(), this.frames[h]), a || this.that.LayerController.makeHistory("Layer", "Add Frame", "Undo")
    }, J.prototype.newFromData = function(a) {
        this.frames.push(a), this.updateList()
    }, J.prototype.newCanvas = function() {
        var a = new Image;
        return a.src = this.that.canvas.layer.empty, a
    }, J.prototype.updateList = function() {
        this.updateFrameCount(), a("#frames-appended").html("");
        var b = this;
        a.each(this.frames, function(c, d) {
            a("#frames-appended").append(b.template(c))
        })
    }, J.prototype.selectByUnqid = function(b) {
        var c = !1;
        return a.each(this.frames, function(a, d) {
            d.unqid == b && (c = !0)
        }), c
    }, J.prototype.duplicate = function(a) {
        this.that.isApp && this.frames.length > 9, a = a ? a : this.currentFrame;
        for (var b = this.frames[a], c = jQuery.extend(!0, {}, b), d = [], e = 0; e < b.layers.length; e++) {
            var f = jQuery.extend(!0, {}, b.layers[e]);
            d.push(f), d.length == b.layers.length && (c.layers = d, c.unqid = Math.random().toString(36).substring(7), this.frames.push(c), this.move(this.frames.length - 1, a + 1, !0), this.select(a + 1), this.that.setOnionSkin(), this.that.showOnionSkin(!0), this.that.updateAppFrames(), this.that.LayerController.makeHistory("Layer", "Duplicate Frame", "Redo"), this.frameScrollLeft())
        }
    }, J.prototype.speed = function(a, b) {
        var c = this.frames[a];
        c.speed = b, this.that.HistoryController.create()
    }, J.prototype.updateFrameTiles = function() {
        if (this.that.settings.frames.tile) {
            var b = parseInt(this.currentFrame),
                c = this.frames[b - 1],
                d = this.frames[b + 1],
                e = !1;
            a("#canvas-layers-container #frame-tiles .frame-tile").remove();
            var f = 'style="background-image:url(' + this.that.checker.data.src + ')";"';
            "undefined" != typeof c && (e = '<div class="frame-tile pre pp"><div class="frame-bg" ' + f + '></div><img src="' + c.preview + '" class="frame-tile-item" width="100%" data-id="' + (b - 1) + '" /></div></div>'), "undefined" != typeof d && (d = '<div class="frame-tile nex pp"><div class="frame-bg" ' + f + '></div><img src="' + d.preview + '" class="frame-tile-item" width="100%" data-id="' + (b + 1) + '" /></div></div>'), e && a("#frame-tiles").append(e), d && a("#frame-tiles").append(d)
        }
    }, J.prototype.updateAllSpeed = function(b) {
        if ("" != b.trim() && " " != b && "n" != b) {
            for (var c = 0; c < this.frames.length; c++) {
                var d = this.frames[c];
                d.speed = b
            }
            a("#frames-container .all-frames-speed").val("n"), this.updateList(), this.that.HistoryController.create()
        }
    }, J.prototype.move = function(a, b, c, d, e) {
        if (!(b >= this.frames.length || b < 0)) {
            var f = this.frames[this.currentFrame].unqid;
            c || e || this.that.LayerController.makeHistory("Layer", "Move Frame", "Undo"), this.frames.splice(b, 0, this.frames.splice(a, 1)[0]);
            for (var g = 0; g < this.frames.length; g++) {
                var h = this.frames[g];
                if (h.unqid == f) {
                    this.currentFrame = g;
                    break
                }
            }
            for (var g = 0; g < this.that.layers.length; g++) this.that.layers[g].frames.splice(b, 0, this.that.layers[g].frames.splice(a, 1)[0]);
            this.that.setOnionSkin(), this.that.showOnionSkin(!0), this.that.render(), this.updateList(), c || this.that.LayerController.makeHistory("Layer", "Move Frame", "Redo")
        }
    }, J.prototype["delete"] = function(b) {
        if (1 != this.frames.length) {
            this.frames[b];
            this.frames.splice(b, 1), a.each(this.that.layers, function(a, c) {
                c.frames.splice(b, 1)
            }), this.currentFrame == b ? (b = parseInt(b), this.currentFrame = b - 1 <= 0 ? 0 : b - 1) : this.currentFrame > b && (this.currentFrame = parseInt(this.currentFrame) - 1), this.select(this.currentFrame), this.updateList(), this.that.updateData(), this.that.setOnionSkin(), this.that.showOnionSkin(!0), this.that.LayerController.makeHistory("Layer", "Delete Frame", "Redo")
        }
    }, J.prototype.add = function(a, b) {
        if (this.that.isApp && this.frames.length > 9, !b && this.that.ToolController && this.that.ToolController.renderChange) return this.that.ToolController.checkRenderNeeded(function() {});
        var c = this.that.canvas.layer;
        c.clear(), a = !!a && a, this["new"](a)
    }, J.prototype.cloneFrames = function() {
        for (var a = [], b = this.frames.length, c = 0; c < b; c++) {
            var d = jQuery.extend(!0, {}, this.frames[c]);
            if (a.push(d), a.length == b) return a
        }
    }, J.prototype.cloneSingleFrame = function(a, b) {
        var c = a ? a : this.currentFrame,
            d = this.frames[c];
        "0" == a && (c = 0), c = c.toString();
        var e = jQuery.extend(!0, {}, d);
        this.that.LayerController.cloneLayers(c, !1, function(a) {
            return e.layers = a, b ? b(e) : e
        })
    }, J.prototype.makeHistory = function(a, b) {
        var c = this.cloneFrames(),
            d = {
                currentFrame: this.currentFrame,
                frames: c
            };
        this.that.HistoryController.add("undo", b, a, d)
    }, J.prototype.history = function(a, b) {
        this.currentFrame = a.data.currentFrame, this.frames = a.data.frames, this.select(this.currentFrame), his.updateList()
    }, J.prototype.flattenAll = function(a, b, c) {
        for (var d = this, e = [], f = this.frames.length - 1; f >= 0; f--) {
            var g = this.frames[f];
            g.data_id = f, g.active && this.that.LayerController.flatten(g.layers, a, b, function(a) {
                e.push({
                    src: a,
                    speed: g.speed,
                    data_id: g.data_id
                }), e.length == d.frames.length && d.that.arrangeImages(e, function(a) {
                    return c ? c(a) : e
                })
            })
        }
    }, J.prototype.frameScrollLeft = function() {
        a("#frames-container").scrollLeft = 1e4
    }, J.prototype.download = function(a, b, c, d, e) {
        a = "undefined" != typeof a ? a : this.currentFrame;
        var f = this,
            g = this.frames[a];
        c = c ? c : this.that.downloadSizes.frame;
        var h = this.that.LayerController.flatten(g.layers, !0, 1, !1, e),
            i = "pixil-frame-" + a + ".png",
            j = (new Image, this.that.width * c),
            k = this.that.height * c;
        this.that.loadImage(h, function(a) {
            return f.that.canvas.data.clear(), f.that.canvas.data.canvas.width = j, f.that.canvas.data.canvas.height = k, f.that.canvas.data.setSmoothing(), f.that.canvas.data.clear(), f.that.canvas.data.putSimple(a, 0, 0, j, k), h = f.that.canvas.data.dataURL(), b && (i = b), d ? e ? e(h) : h : (f.that.isApp && (f.that.ons.platform.isAndroid() ? f.that.canvas.data.canvas.toBlob(function(a) {
                f.that.ons.downloadAndroid(Date.now() + ".png", a, h), f.that.canvas.data["default"]()
            }) : f.that.ons.downloadiOS(h)), f.that.isApp || (e ? f.that.canvas.extended && (f.that.canvas.extended.setSmoothing(), f.that.canvas.extended.clear(), f.that.canvas.extended.putSimple(a, 0, 0, j, k), f.that.canvas.extended.canvas.toBlob(function(a) {
                return f.that.canvas.extended["default"](), e(a)
            })) : saveAs(h, i)), void f.that.canvas.rendering["default"]())
        })
    }, J.prototype.downloadAll = function() {
        var a = 0,
            b = this,
            c = new JSZip;
        if (!this.that.canvas.extended) {
            var d = this.that.width * this.that.downloadSizes.frame,
                e = this.that.height * this.that.downloadSizes.frame;
            return this.that.createCanvas("extended", d, e, function() {
                b.that.canvas.extended.setSmoothing(), b.that.canvas.extended.clear(), b.downloadAll()
            })
        }
        if (1 == this.frames.length) return b.download(a);
        var f = function() {
            return a >= b.frames.length ? (c.generateAsync({
                type: "blob"
            }).then(function(a) {
                saveAs(a, "pixilart-frames.zip")
            }), void b.that.canvas.extended.destroy()) : void b.download(a, !1, !1, !1, function(b) {
                c.file("pixil-frame-" + a + ".png", b), a++, f()
            })
        };
        f()
    }, J.prototype.resizeFrames = function() {
        for (var a = 0; a < this.frames.length; a++) {
            var b = this.frames[a];
            b.width = this.that.width, b.height = this.that.height
        }
    }, J.prototype.downloadSheet = function() {
        for (var a = this, b = this.that.downloadSizes.frame, c = [], d = 0; d < this.frames.length; d++) {
            var e = this.frames[d];
            this.that.LayerController.flatten(e.layers, !0, b, function(b) {
                c.push(b), c.length == a.frames.length && a.createSheet(c)
            })
        }
    }, J.prototype.createSheet = function(a) {
        var b = this,
            c = this.that.downloadSizes.frame,
            d = this.that.width * c,
            e = this.that.height * c;
        if (!this.that.canvas.extended) return this.that.createCanvas("extended", !1, !1, function() {
            b.createSheet(a)
        });
        this.that.canvas.extended.setSmoothing(), this.that.canvas.extended.clear(), this.that.canvas.extended.canvas.width = d * this.frames.length, this.that.canvas.extended.canvas.height = e, f || (f = "pixilart-sprite");
        for (var f = "pixilart-sprite", g = 0, h = 0; h < a.length; h++) {
            var i = new Image;
            i.i = h, i.onload = function() {
                b.that.canvas.extended.ctx.drawImage(this, this.i * d, 0), g++, g >= a.length && (b.that.downloadAppCanvas("extended"), saveAs(b.that.canvas.extended.dataURL(), f), b.that.canvas.extended.destroy())
            }, i.src = a[h]
        }
    };
    var K = function(b) {
        var c = this;
        this.common = ["000000", "ffffff", "7f7f7f", "a1a1a1", "c3c3c3", "c40424", "880015", "b97a57", "dba88c", "ed1c24", "f75b63", "f26f9b", "ff7f27", "f7ab79", "ffc90e", "fff200", "cfc532", "efe4b0", "1ee656", "0c6624", "22b14c", "b5e61d", "5487ff", "00a2e8", "99d9ea", "3f48cc", "7f86e3", "7092be", "720899", "cd55cf", "a349a4", "c8bfe7"], this.defaultColors = ["000000", "ffffff", "f44336", "e91e63", "9c27b0", "673ab7", "3f51b5", "2196f3", "03a9f4", "00bcd4", "009688", "4caf50", "8bc34a", "cddc39", "ffeb3b", "ffc107", "ff9800", "ff5722", "795548", "9e9e9e", "607d8b"], this.skinTones = ["ffe0bd", "ffdbac", "ffcd94", "eac086", "e0ac69", "f1c27d", "ffad60", "c68642", "8d5524", "896347", "765339", "613d24", "4c2d17", "391e0b", "351606", "2d1304", "180a01", "090300"], this.simple = ["ffffff", "d4d4d4", "a1a1a1", "787878", "545454", "303030", "000000", "edc5c5", "e68383", "ff0000", "de2424", "ad3636", "823737", "592b2b", "f5d2ee", "eb8dd7", "f700b9", "bf1f97", "9c277f", "732761", "4f2445", "e2bcf7", "bf79e8", "9d00ff", "8330ba", "6d3096", "502c69", "351b47", "c5c3f0", "736feb", "0905f7", "2e2eb0", "2d2d80", "252554", "090936", "c7e2ed", "6ac3e6", "00bbff", "279ac4", "347c96", "2d5b6b", "103947", "bbf0d9", "6febb3", "00ff88", "2eb878", "349166", "2b694c", "0c3d25", "c2edc0", "76ed70", "0dff00", "36c72c", "408c3b", "315c2e", "144511", "d6edbb", "b5eb73", "8cff00", "89c93a", "6f8f44", "4b632a", "2a400c", "f1f2bf", "eef069", "ffff00", "baba30", "91913f", "5e5e2b", "3b3b09", "ffdeb8", "f2ae61", "ff8400", "c48037", "85623d", "573e25", "3d2309", "fcbbae", "ff8066", "ff2b00", "cc553d", "9c5b4e", "61372e", "36130b"], this.common = ["000000", "ffffff", "464646", "b4b4b4", "990030", "9c5a3c", "ed1c24", "ffa3b1", "ff7e00", "e5aa7a", "ffc20e", "f5e49c", "fff200", "fff9bd", "a8e61d", "d3f9bc", "22b14c", "00b7ef", "99d9ea", "4d6df3", "709ad1", "2f3699", "546d8e", "6f3198", "b5a5d5"], this.that = b, this.colorPaletteShown = !1, this.maxColors = 500, this.currentSelection = "common", this.colorArray = [], this.that.isMobileDevice && (this.currentSelection = "default"), this.that.isApp && (this.defaultColors = [], this.currentSelection = "common"), this.color = "#000000", this.colorReverse = !1, this.secondary = "#ffffff", this.mobileColorsAll = ["ffebee", "ffcdd2", "ef9a9a", "e57373", "ef5350", "e53935", "d32f2f", "c62828", "b71c1c", "ff8a80", "ff5252", "ff1744", "d50000", "fce4ec", "f8bbd0", "f48fb1", "f06292", "ec407a", "e91e63", "d81b60", "c2185b", "ad1457", "880e4f", "ff80ab", "ff4081", "f50057", "c51162", "f3e5f5", "e1bee7", "ce93d8", "ba68c8", "ab47bc", "9c27b0", "8e24aa", "7b1fa2", "6a1b9a", "4a148c", "ea80fc", "e040fb", "d500f9", "aa00ff", "ede7f6", "d1c4e9", "b39ddb", "9575cd", "7e57c2", "673ab7", "5e35b1", "512da8", "4527a0", "311b92", "b388ff", "7c4dff", "651fff", "6200ea", "e8eaf6", "c5cae9", "9fa8da", "7986cb", "5c6bc0", "3f51b5", "3949ab", "303f9f", "283593", "1a237e", "8c9eff", "536dfe", "3d5afe", "304ffe", "e3f2fd", "bbdefb", "90caf9", "64b5f6", "42a5f5", "2196f3", "1e88e5", "1976d2", "1565c0", "0d47a1", "82b1ff", "448aff", "2979ff", "2962ff", "e1f5fe", "b3e5fc", "81d4fa", "4fc3f7", "29b6f6", "03a9f4", "039be5", "0288d1", "0277bd", "01579b", "80d8ff", "40c4ff", "00b0ff", "0091ea", "e0f7fa", "b2ebf2", "80deea", "4dd0e1", "26c6da", "00bcd4", "00acc1", "0097a7", "00838f", "006064", "84ffff", "18ffff", "00e5ff", "00b8d4", "e0f2f1", "b2dfdb", "80cbc4", "4db6ac", "26a69a", "009688", "00897b", "00796b", "00695c", "004d40", "a7ffeb", "64ffda", "1de9b6", "00bfa5", "e8f5e9", "c8e6c9", "a5d6a7", "81c784", "66bb6a", "4caf50", "43a047", "388e3c", "2e7d32", "1b5e20", "b9f6ca", "69f0ae", "00e676", "00c853", "f1f8e9", "dcedc8", "c5e1a5", "aed581", "9ccc65", "8bc34a", "7cb342", "689f38", "558b2f", "33691e", "ccff90", "b2ff59", "76ff03", "64dd17", "f9fbe7", "f0f4c3", "e6ee9c", "dce775", "d4e157", "cddc39", "c0ca33", "afb42b", "9e9d24", "827717", "f4ff81", "eeff41", "c6ff00", "aeea00", "fffde7", "fff9c4", "fff59d", "fff176", "ffee58", "ffeb3b", "fdd835", "fbc02d", "f9a825", "f57f17", "ffff8d", "ffff00", "ffea00", "ffd600", "fff8e1", "ffecb3", "ffe082", "ffd54f", "ffca28", "ffc107", "ffb300", "ffa000", "ff8f00", "ff6f00", "ffe57f", "ffd740", "ffc400", "ffab00", "fff3e0", "ffe0b2", "ffcc80", "ffb74d", "ffa726", "ff9800", "fb8c00", "f57c00", "ef6c00", "e65100", "ffd180", "ffab40", "ff9100", "ff6d00", "fbe9e7", "ffccbc", "ffab91", "ff8a65", "ff7043", "ff5722", "f4511e", "e64a19", "d84315", "bf360c", "ff9e80", "ff6e40", "ff3d00", "dd2c00", "efebe9", "d7ccc8", "bcaaa4", "a1887f", "8d6e63", "795548", "6d4c41", "5d4037", "4e342e", "3e2723", "fafafa", "f5f5f5", "eeeeee", "e0e0e0", "bdbdbd", "9e9e9e", "757575", "616161", "424242", "212121", "eceff1", "cfd8dc", "b0bec5", "90a4ae", "78909c", "607d8b", "546e7a", "455a64", "37474f", "263238"], this.importNameCount = 1;
        var d = this.defaultColors.concat(this.mobileColorsAll);
        this.colorPresets = {
            "default": d,
            simple: this.simple,
            common: this.common,
            "skin tones": this.skinTones
        }, this.that.isTouch || this.that.isWindowsIE || a("#color-container").sortable({
            scrollSpeed: 3,
            delay: 200,
            update: function(a, b) {
                c.updatePreset()
            }
        })
    };
    K.prototype.resetPresets = function() {
        var a = confirm("Are you sure you want to reset color palettes?");
        if (a) {
            var b = this.defaultColors.concat(this.mobileColorsAll);
            this.colorPresets = {
                "default": b,
                simple: this.simple.slice(),
                common: this.common.slice(),
                "skin tones": this.skinTones.slice()
            }, this.currentSelection = "common", this.load(this.colorPresets[this.currentSelection], !0), this.updateColors(this.currentSelection), this.updateOptions(), this.updatePaletteSettings()
        }
    }, K.prototype.updatePreset = function() {
        var b = this;
        this.colorPresets[this.currentSelection] = [], a("#color-container .color-select").each(function() {
            var c = a(this).attr("data-color");
            b.colorPresets[b.currentSelection].push(c)
        })
    }, K.prototype.setAppColorButton = function() {
        !this.that.isApp
    }, K.prototype["switch"] = function() {
        var a = this.color,
            b = this.secondary;
        this.secondary = a, this.color = b, this.setToolColors(), this.end()
    }, K.prototype.init = function() {
        this.initColors(), this.color = "#000000", this.elementSelect(a("#color-000000")), this.listeners(), this.updateOptions(), this.setToolColors(), this.importColorPallet(), this.that.isMobile
    }, K.prototype.initColors = function() {
        this.load(this.colorPresets[this.currentSelection], !0, !0)
    }, K.prototype.setColor = function(a) {
        var b = this.color,
            c = this.secondary;
        a && !this.colorReverse && (this.secondary = b, this.color = c, this.colorReverse = !0)
    }, K.prototype.restoreSetColor = function() {
        var a = this.color,
            b = this.secondary;
        this.colorReverse && (this.secondary = a, this.color = b, this.colorReverse = !1)
    }, K.prototype.load = function(b, c, d) {
        var e = this,
            f = [];
        c = c || !1, b = b ? b : this.colorPresets[this.currentSelection], this.colorArray = [], (!this.that.isMobileDevice && !this.that.isApp || this.that.isApp) && a("#mobile-color-container, #color-container, #colors-bar-mobile").html(""), b = b.slice(0, this.maxColors), a.each(b, function(b, g) {
            g = g.toLowerCase(), e["new"](g, c), e.that.isApp || f.indexOf(g) > -1 || (f.push(g), (!c && !e.that.isMobile || d || e.that.isApp) && (!e.that.isMobileDevice && !e.that.isApp || e.that.isApp ? a("#color-container").append(e.template(g)) : a("#mobile-color-container, #color-container, #colors-bar-mobile").append(e.template(g))))
        });
        var g = b[0];
        "ffffff" != g && "FFFFFF" != g || (g = "000000"), this.select(g)
    }, K.prototype.checkForColorChange = function() {
        this.newColor && (this["new"](this.newColor), this.newColor = !1)
    }, K.prototype.setToolColors = function() {
        this.that.isApp || (a("#primary-color, #add-color .primary-color").css({
            backgroundColor: this.color
        }), a("#secondary-color").css({
            backgroundColor: this.secondary
        }))
    }, K.prototype.listeners = function() {
        var b, c = this;
        if (a("#add-color").click(function() {
                b = a(this)
            }), !this.that.isApp) {
            var d = {
                color: c.color,
                mobile: c.that.isMobile,
                onChange: function(b, d, e, f) {
                    f ? c.secondary = "#" + d : c.color = "#" + d, c.setToolColors(), c.newColor = d, a(this).parent().hasClass("is-flat") || a("#color-picker-panel").ColorPickerSetColor("#" + d)
                },
                onBeforeShow: function() {
                    a(this).ColorPickerSetColor(c.color)
                },
                onSubmit: function(b, d, e, f) {
                    c.newColor = !1, c["new"](d, a(f)), a(f).ColorPickerHide()
                }
            };
            a("#add-color, #primary-color, #secondary-color").ColorPicker(d), d.flat = !0, a("#color-picker-panel").ColorPicker(d)
        }
        a("#colors-list-wrapper").on("click", ".use-palette", function() {
            c.usePalette(a(this))
        }), a(".color-switchable").click(function() {
            c["switch"]()
        }), a(".color-popup").click(function() {
            c.that.showPopup("colors", a("#colors-popup").html())
        }), a(".color-presets").change(function() {
            c.updateColors(a(this).val(), !0)
        }), a(".new-preset-color").click(function() {
            c.newPreset()
        }), a(".open-colors").click(function() {
            c.showPalettes()
        }), a(".import-colors").click(function() {
            c["import"]()
        }), a(".apply-colors").click(function() {
            c.applyPalette()
        }), a(".export-colors").click(function() {
            c["export"]()
        }), a(".get-layer-colors").click(function() {
            c.getColorsFromCanvas()
        }), a("#remove-palette").click(function() {
            c.removePreset()
        }), a(".black-white-default").click(function() {
            c.secondary = "#FFFFFF", c.color = "#000000", c.setToolColors()
        }), a(document).on("change", ".color-option-shown", function() {
            var b = a(this).val();
            b = b.replace("/#(S*)/g", "", b), c.select(b), c.color = b
        }), a("#popup-container, #colors-bar-mobile, #color-container").on("click", "#palette-reset", function() {
            c.resetPresets()
        }), a("#popup-container, #colors-bar-mobile, #color-container").on("mousedown", ".color-select", function(b) {
            switch (event.which) {
                case 3:
                    c.removeColor(a(this))
            }
        }), this.listenersRedo()
    }, K.prototype.listenersRedo = function() {
        var b = this,
            c = "pointerdown";
        this.that.isTouch && (c = "pointerdown"), a("#popup-container, #colors-bar-mobile").on("click", ".color-select", function(c) {
            var d = a(this).attr("data-color");
            b.select(d), a(this).parent().hasClass("mobile-color-container") && b.that.hidePopup()
        }), a("#color-container").on(c, ".color-select", function(c) {
            var d = a(this).attr("data-color");
            b.select(d), a(this).parent().hasClass("mobile-color-container") && b.that.hidePopup()
        })
    }, K.prototype.destroy = function() {
        a("#popup-container, #colors-bar-mobile, #color-container").unbind("click");
    }, K.prototype.showPalettes = function() {
        if (a("#colors-list-wrapper").is(":visible")) return void this.hidePalettes();
        this.colorPaletteShown = !0;
        var b = a("#drawing-canvas-conatiner"),
            c = 20,
            d = a("#drawing-tool-options"),
            e = d.length ? d.height() : 0,
            f = b.position(),
            g = (f.left + b.width() - c, f.top + c),
            h = b.height() - 2 * c + e,
            i = a("#right-sidebar").width() + 20;
        a("#colors-list-wrapper").show().css({
            top: g,
            right: i,
            Left: "inherit",
            height: h
        })
    }, K.prototype.hidePalettes = function() {
        a("#colors-list-wrapper").hide()
    }, K.prototype.removePreset = function() {
        var b = this,
            c = confirm("Are you sure?");
        if (c && !(this.colorPresets.length <= 1 || "default" == this.currentSelection)) {
            var d = {},
                e = {};
            a.each(this.colorPresets, function(a, c) {
                a != b.currentSelection && (d[a] = c)
            }), a.each(this.that.settings.palette_ids, function(a, c) {
                a != b.currentSelection && (e[a] = c)
            }), this.colorPresets = d, this.that.settings.palette_ids = e, this.currentSelection = "default", this.updateColors(this.currentSelection), this.updateOptions()
        }
    }, K.prototype.usePalette = function(b, c) {
        if (!b.hasClass("new-modal") || c) {
            var d = b.attr("data-colors"),
                e = d.split(","),
                f = b.attr("data-name"),
                g = b.attr("data-id");
            this.currentSelection = f, "undefined" == typeof this.colorPresets[f] && (this.colorPresets[f] = [], this.that.settings.palette_ids[f] = g, this.load(e)), this.that.palette_id = g, this.updateOptions(), this.updateColors(f, this.that.isTablet), this.elementSelect(a("#color-" + e[0])), this.hidePalettes(), this.updatePaletteSettings()
        }
    }, K.prototype.updatePaletteSettings = function() {
        this.that.isApp || (this.that.settings.palettes = this.colorPresets, this.that.updateSettings())
    }, K.prototype.applyPalette = function() {
        if (!this.that.LayerController.checkPreConditions()) {
            var a = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height),
                b = a.data,
                c = b.length;
            this.that.ToolController.restore();
            for (var d = this.colorPresets[this.currentSelection], e = d.length, f = [], g = 0; g < d.length; g++) {
                var h = this.that.hexToRgb(d[g]);
                f.push(h)
            }
            if (!(f.length > 400)) {
                for (var i = 0; i < c; i += 4) {
                    var j = !1,
                        k = 0,
                        l = b[i],
                        m = b[i + 1],
                        n = b[i + 2];
                    b[i + 3];
                    if (0 != b[i + 3])
                        for (var g = 0; g < e; g++) {
                            var h = (d[g], f[g]),
                                o = Math.abs(h.r - l) + Math.abs(h.g - m) + Math.abs(h.b - n);
                            (o <= j || j === !1) && (k = h, j = o), g == d.length - 1 && (b[i] = k.r, b[i + 1] = k.g, b[i + 2] = k.b)
                        }
                }
                this.that.canvas.layer.ctx.putImageData(a, 0, 0), this.applyPaletteDone(), b = null, a = null
            }
        }
    }, K.prototype.applyPaletteDone = function() {
        var a = this;
        this.that.render(), this.that.LayerController.updateLayer(), this.that.FrameController.updateFramePreview(), this.that.ToolController.restore(), this.that.LayerController.updateLayer(!1, function() {
            a.that.HistoryController.create()
        }), this.that.OnlineController.writeLayer()
    }, K.prototype.newPreset = function(a) {
        var b = a ? a : prompt("Preset Name", "");
        null != b && (b = b.trim(), this.colorPresets[b] = [], this.currentSelection = b, this.updateOptions(), this.updateColors(b))
    }, K.prototype.check = function(a) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#" + a)
    }, K.prototype["import"] = function() {
        var a = prompt("Seperate colors by comma", "");
        if (null != a) {
            a = a.replace(/#/g, "");
            for (var b = a.split(","), c = 0; c < b.length; c++) {
                var d = b[c];
                this.check(d) && this["new"](d)
            }
            this.updateOptions(), this.updateColors()
        }
    }, K.prototype["export"] = function() {
        var a = this.colorPresets[this.currentSelection].toString();
        prompt("Copy and save this to use later.", a)
    }, K.prototype.updateColors = function(b, c) {
        if ((!this.that.isMobile || this.that.isTablet || this.that.isApp) && "object" == typeof this.colorPresets[b]) {
            for (var d = 0; d < this.colorPresets[b].length; d++) this.colorPresets[b][d] = this.colorPresets[b][d].toLowerCase();
            a(".color-presets").val(b), this.currentSelection = b, this.load(!1, !1, c), this.that.settings.palette_ids[b] ? this.that.palette_id = this.that.settings.palette_ids[b] : this.that.palette_id = !1, this.that.settings.palette = b, this.updatePaletteSettings()
        }
    }, K.prototype.showExtras = function() {
        a(".extras-color").removeClass("soft-hidden")
    }, K.prototype.hideExtras = function() {
        a(".extras-color").addClass("soft-hidden")
    }, K.prototype.updateOptions = function() {
        var b = this,
            c = "";
        this.that.isApp || (a("#color-presets").html(""), a.each(this.colorPresets, function(a, d) {
            c = c + '<option value="' + a + '"', a == b.currentSelection && (c += ' selected="selected"'), c = c + ">" + a + "</option>"
        }), a("#color-presets").append(c))
    }, K.prototype.template = function(a, b) {
        return a = a.toLowerCase(), '<div id="color-' + a + '" class="color color-select color-' + a + " " + b + " col-" + a + '" data-color="' + a + '" title="' + a + '"><div class="color-block" style="background-color:#' + a + '"></div></div>'
    }, K.prototype.mobileColors = function() {
        var b = this;
        this.colorPresets[this.currentSelection] = this.mobileColorsAll.concat(this.colorPresets[this.currentSelection]), a.each(this.mobileColorsAll, function(c, d) {
            a("#mobile-color-container").append(b.template(d, "mobile-cl"))
        })
    }, K.prototype["new"] = function(b, c, d) {
        var e = "primary";
        if (c) try {
            e = c.attr("data-type")
        } catch (f) {}
        if (this.check(b)) {
            if (this.colorPresets[this.currentSelection].indexOf(b) === -1) return this.that.isApp ? this.colorPresets[this.currentSelection].unshift(b) : this.colorPresets[this.currentSelection].push(b), this.that.isApp ? a("#color-container").prepend(this.template(b)) : this.that.isMobileDevice ? a("#colors-bar-mobile").append(this.template(b)) : a("#color-container").append(this.template(b)), this.that.isApp && this.colorPresets[this.currentSelection].length > this.maxColors && (this.colorPresets[this.currentSelection] = this.colorPresets[this.currentSelection].slice(0, this.maxColors), a("#color-container .color-select:last-child").remove()), this.ignoreSelected || this.select(b, e), void this.updatePaletteSettings();
            this.select(b, e), "primary" == e ? this.color == "#" + b && this.select(b, e) : this.secondary == "#" + b && this.select(b, e)
        }
    }, K.prototype.importColorsFromPallet = function(b, c) {
        for (var d = !1, e = [], f = 0; f < c.length; f++) {
            var g = c[f];
            this.check(g) && (d || (d = g), g = g.toLowerCase(), e.push(g))
        }
        e.length >= 1 && (b = "custom-" + b, this.colorPresets[b] = e, this.updateOptions(), this.updateColors(b), this.that.isApp || (a("#color-presets").val(b), this.elementSelect(a("#color-" + d))))
    }, K.prototype.importColorPallet = function() {
        var b = a("#color-import").text(),
            c = b.split(",");
        c.length >= 1 && this.importColorsFromPallet(this.importNameCount, c)
    }, K.prototype.getColorsFromCanvas = function(a) {
        var b = [],
            c = this.that.LayerController.layers,
            d = this.that.LayerController.flatten(c),
            e = this,
            f = this.that.getBaseSize(d);
        return f > 1e5 ? this.that.showAlert(this.that.messages("filesize")) : void this.that.loadImage(d, function(a) {
            e.that.canvas.data.putSimple(a);
            for (var c = e.that.canvas.data.ctx.getImageData(0, 0, e.that.width, e.that.height), d = 0; d < c.data.length; d += 4) {
                var f = ("000000" + e.that.rgbaToHex(c.data[d], c.data[d + 1], c.data[d + 2])).slice(-6);
                f = f.toLowerCase(), b.indexOf(f) == -1 && c.data[d + 3] > 0 && (b.push(f), e["new"](f, !1, !0))
            }
        })
    }, K.prototype.elementSelect = function(b, c, d) {
        var d = !this.that.isApp && b.attr("data-color");
        !this.that.isApp && a("#color-" + d).length >= 1 && (!c || c && "primary" == c ? this.color = "#" + d : this.secondary = "#" + d, a("#color-container .color-select, #colors-bar-mobile .color-select, #mobile-color-container .color-select").removeClass("active"), b.addClass("active"), this.end()), this.setToolColors()
    }, K.prototype.end = function() {
        this.that.finished && (this.that.ToolController.setBrushColor(), this.that.mouse.getPixelSizeImage())
    }, K.prototype.removeColor = function(b) {
        var c = b.attr("data-color");
        if (a("#color-" + c).length >= 1) {
            var d = this.colorPresets[this.currentSelection].indexOf(c);
            d > -1 && (this.colorPresets[this.currentSelection].splice(d, 1), a("#color-" + c).remove(), this.updatePaletteSettings())
        }
    }, K.prototype.select = function(b, c) {
        b = b ? b : this.color, b = b.toLowerCase();
        var d = b.toUpperCase();
        this.colorPresets[this.currentSelection].indexOf(b) === -1 && this.colorPresets[this.currentSelection].indexOf(d) === -1 && this["new"](b), this.elementSelect(a(".color-" + b), c), this.setAppColorButton(), this.that.isApp || a("#color-picker-panel").ColorPickerSetColor("#" + b), this.that.isApp && a("#drawing-wrapper .current-color-shown").css({
            backgroundColor: "#" + b
        })
    };
    var L = function(b, c, d) {
        this.that = b, this.canvas = c, this.loading = !1, this.loadingTimer = !1, this.last_x = 0, this.last_y = 0, this.last_cord_x = 0, this.last_cord_y = 0, this.scrollX = 0, this.scrollY = 0, this.zoom = 1, this.maxZoom = 50, this.minZoom = 1, this.zoomTimer = !1, this.zoomTimeX = 0, this.zoomTimeY = 0, this.zoomMotionCurrent = 1, this.zoomMotionWidth = 0, this.zoomMotionHeight = 0, this.zoomMotionX = 0, this.zoomMotionY = 0, this.zoomingOut = !1, this.scrollZoom = !1, this.ignorePos = !1, this.setRangeLastClicks = !1, this.previousZoom = -1, this.previousZoomX = 0, this.previousZoomY = 0, this.rangeResetActive = !1, this.rangeResetTimer = !1, this.rangeResetAmount = 0, this.panX = 0, this.panY = 0, this.setLastClicks = !1, this.fit_size = 0, this.reset(), this.zoomOutMax = 0, this.canvas = a("#canvas-layers-container"), a("#canvas-layers-appened").addClass("css")
    };
    L.prototype.init = function(b) {
        var c = this,
            d = a("#drawing-canvas-conatiner");
        a("#zoom-range").attr("max", this.maxZoom), this.that.isApp || d.bind("wheel mousewheel", function(a) {
            c.that.isMobile || c.that.settings.disableScrollZoom || (a.preventDefault(), c.setLastClicks = !0, c.scrollZoom = !0, c.active(a))
        }), a(".zoom-in-btn").click(function(a) {
            c.active(!1, -100, !0)
        }), a(".zoom-out-btn").click(function(a) {
            c.active(!1, 100, !0)
        }), a("#zoom-fit").click(function() {
            c.fit()
        }), a("#zoom-range").on("input", function(b) {
            var d = a(this),
                e = parseInt(d.val());
            c.zoomRange(e)
        }), a("#zoom-range-reset").on("input", function(b) {
            var d = a(this),
                e = parseInt(d.val());
            c.rangeResetAmount = e, c.rangeResetActive = !0, c.zoomRangeReset()
        }), a("#zoom-range-reset").on("change", function(b) {
            c.rangeResetActive = !1, a("#zoom-range-reset").val(25)
        }), this.align(), this.previousZoom = this.zoom
    }, L.prototype.fit = function() {
        this.zoomRange(this.that.zoom["default"]), this.center()
    }, L.prototype.reset = function(a) {
        this.zoom = 1, this.that.zoom_step = 1;
        var b = this.that.width,
            c = this.that.height;
        this.last_x = b / 2, this.last_y = c / 2, this.zoom = this.that.zoom["default"], this.minZoom = this.that.zoom["default"], this.zoomMotionCurrent = this.that.zoom["default"], this.out = !1, this.previousZoomX = this.last_x, this.previousZoomY = this.last_y, this.setRange(), a && this.use()
    }, L.prototype.zoomRangeReset = function() {
        var a = this.rangeResetAmount - 25,
            b = !1,
            c = this;
        a > 0 ? (b = !0, a *= -1) : a = Math.abs(a), !this.rangeResetTimer && this.rangeResetActive && (this.zoomRangeAction(a), this.rangeResetTimer = setTimeout(function() {
            clearTimeout(c.rangeResetTimer), c.rangeResetTimer = !1, c.zoomRangeReset()
        }, 30))
    }, L.prototype.zoomRangeAction = function(a) {
        this.zoom *= Math.pow(.999, a / 25 * 100), this.checkLimits(), this.zoom >= this.that.grid.max_size && (this.zoom > this.lastZoomInt ? this.zoom = this.that.round(this.zoom, 1, "up") : this.zoom = this.that.round(this.zoom, 1, "down")), this.lastZoomInt = this.zoom;
        var b = this.last_x,
            c = this.last_y,
            d = d ? d : b,
            e = e ? e : c;
        this.that.NavigationController.ignoreZoomLastClicks = !0, this.setZoomVars(), this.render(d, e)
    }, L.prototype.zoomRange = function(a, b, c) {
        this.zoom = a, this.checkLimits();
        var d = this.last_x,
            e = this.last_y,
            b = b ? b : d,
            c = c ? c : e;
        this.that.NavigationController.ignoreZoomLastClicks = !0, this.setZoomVars(), this.render(b, c)
    }, L.prototype.checkLimits = function() {
        this.zoom >= this.maxZoom && (this.zoom = this.maxZoom), this.zoom <= this.minZoom && !this.that.settings.zoomUnlock && !this.that.isApp && (this.zoom = this.minZoom), this.zoom <= 1 && this.minZoom >= 1 && (this.zoom = 1), this.zoom <= .25 && (this.zoom = .25)
    }, L.prototype.active = function(a, b, c) {
        if (!this.that.mouse.middleClickDown && !this.loading) {
            var d = b ? b : a.originalEvent.deltaY;
            d < 0 && d > -25 && (d = -25), d > 0 && d < 25 && (d = 25), this.zoom *= Math.pow(.999, d), this.lastZoomInt || (this.lastZoomInt = this.that.zoom["default"]), this.zoom >= this.that.grid.max_size && (this.zoom > this.lastZoomInt ? this.zoom = this.that.round(this.zoom, 1, "up") : this.zoom = this.that.round(this.zoom, 1, "down")), this.lastZoomInt = this.zoom, this.checkLimits();
            var e = !1,
                f = !1;
            this.scrollZoom || this.that.ToolController.cancel(), (this.zoom < this.previousZoom || this.zoom == this.previousZoom) && (this.zoomingOut = !0), this.previousZoom = this.zoom, (c || this.zoomingOut) && (e = this.last_x, f = this.last_y, this.that.isApp && !this.that.app.fingerToDraw && (e = this.that.mouse.app_x_last, f = this.that.mouse.app_y_last), this.that.NavigationController.ignoreZoomLastClicks = !0), this.setZoomVars(), this.render(e, f)
        }
    }, L.prototype.setZoomVars = function() {
        this.that.zoom_ratio = this.zoom, this.that.zoom_step = this.zoom
    }, L.prototype.render = function(a, b) {
        var c = this,
            d = a ? a : this.that.mouse.x_0,
            e = b ? b : this.that.mouse.y_0;
        this.zoomTimeX && this.scrollZoom && (d = this.zoomTimeX, e = this.zoomTimeY), this.loading = !0, this.that.grid.status ? this.that.createGrid("grid", function() {
            c.end(d, e)
        }) : this.end(d, e)
    }, L.prototype.end = function(a, b) {
        var c = this;
        a = a ? a : this.last_x, b = b ? b : this.last_y, this.used = !0, this.use(a, b), this.that.render(), this.that.NavigationController.placement(), this.that.NavigationController.clickLocation(), this.setLastClicks && (this.setLastClicks = !1, this.last_x = a, this.last_y = b), this.setRangeLastClicks && (this.setRangeLastClicks = !0, this.that.mouse.touchEndMove()), clearTimeout(this.loadingTimer), clearTimeout(this.zoomTimer), this.scrollZoom && (this.zoomTimeX = a, this.zoomTimeY = b, this.zoomTimer = setTimeout(function() {
            c.zoomTimeX = 0, c.scrollZoom = !1
        }, 50)), this.setRange(), this.finish()
    }, L.prototype.finish = function() {
        var a = this;
        this.setLastZoom(), this.loading = !1, this.loadingTimer = setTimeout(function() {
            a.zoomingOut = !1
        }, 100)
    }, L.prototype.setLastZoom = function() {
        this.zoomMotionWidth = this.that.width * this.that.pixel_size * this.zoom, this.zoomMotionHeight = this.that.height * this.that.pixel_size * this.zoom, this.zoomMotionX = this.last_x, this.zoomMotionY = this.last_y, this.zoomMotionCurrent = this.zoom
    }, L.prototype.align = function(b, c, d, e) {
        if (d = d ? d : a("#drawing-canvas-conatiner").width(), e = e ? e : a("#drawing-canvas-conatiner").height(), b || (b = this.canvas.width()), c || (c = this.canvas.height()), this.canvas.css({
                left: 0,
                top: 0
            }), b < d) {
            var f = d / 2 - b / 2;
            this.canvas.css({
                left: this.that.round(f, 1)
            })
        }
        if (c < e) {
            var g = e / 2 - c / 2;
            this.canvas.css({
                top: this.that.round(g, 1)
            })
        }
    }, L.prototype.setRange = function() {
        a("#zoom-range").val(this.zoom)
    }, L.prototype.position = function(b, c, d) {
        b = b ? b : this.that.mouse.x_0, c = c ? c : this.that.mouse.y_0, this.that.isApp && !this.that.app.fingerToDraw && (b = this.that.mouse.app_x_last, c = this.that.mouse.app_y_last), this.zoomTimeX && this.scrollZoom && !this.zoomingOut && (b = this.zoomTimeX, c = this.zoomTimeY), this.last_cord_x = b, this.last_cord_y = c, this.previousZoom = this.zoom;
        var e = .33 * Math.abs(b - this.previousZoomX),
            f = .33 * Math.abs(c - this.previousZoomY);
        this.zoomingOut && (e = 0, f = 0), b < this.previousZoomX ? this.previousZoomX -= e : b > this.previousZoomX && (this.previousZoomX += e), c < this.previousZoomY ? this.previousZoomY -= f : c > this.previousZoomY && (this.previousZoomY += f), this.that.isApp || (b = this.previousZoomX, c = this.previousZoomY);
        var g = b * this.that.pixel_size * this.zoom,
            h = c * this.that.pixel_size * this.zoom;
        if (this.that.isApp && this.that.app.fingerToDraw) {
            var i = a("#drawing-canvas-conatiner").width(),
                j = a("#drawing-canvas-conatiner").height(),
                k = this.previousZoomX * this.that.pixel_size * this.zoom,
                l = this.previousZoomY * this.that.pixel_size * this.zoom,
                m = i / 2 - k,
                n = j / 2 - l;
            return void this.that.alignPan(m, n)
        }
        this.panX = g, this.panY = h;
        var i = a("#drawing-canvas-conatiner").width(),
            j = a("#drawing-canvas-conatiner").height();
        g -= i / 2, h -= j / 2, this.scrollX = g, this.scrollY = h, d ? a("#drawing-canvas-conatiner").animate({
            scrollTop: h,
            scrollLeft: g
        }, 150) : a("#drawing-canvas-conatiner").scrollLeft(g).scrollTop(h)
    }, L.prototype.setZoomPosition = function() {
        var b = a("#drawing-canvas-conatiner"),
            c = a("#canvas-layers-container").position(),
            d = this.that.pixel_size * this.that.ZoomController.zoom;
        this.last_x = Math.round((b.width() / 2 - c.left) / d), this.last_y = Math.round((b.height() / 2 - c.top) / d), this.previousZoomX = Math.round((b.width() / 2 - c.left) / d), this.previousZoomY = Math.round((b.height() / 2 - c.top) / d)
    }, L.prototype.center = function() {
        var b = a("#drawing-canvas-conatiner").width(),
            c = a("#drawing-canvas-conatiner").height(),
            d = (a("#canvas-layers-container").position(), this.that.pixel_size * this.zoom, this.that.width / 2 * this.that.pixel_size * this.zoom),
            e = this.that.height / 2 * this.that.pixel_size * this.zoom,
            f = b / 2 - d,
            g = c / 2 - e;
        this.last_x = this.that.width / 2, this.last_y = this.that.height / 2, this.previousZoomX = this.last_x, this.previousZoomY = this.last_y, this.that.alignPan(f, g)
    }, L.prototype.zoomUse = function(a, b, c, d) {
        this.canvas.width(c).height(d), this.that.isApp && this.that.app.fingerToDraw || this.align(c, d), this.position(a, b), this.that.mouse.render(), this.that.TileController.updatePlacement()
    }, L.prototype.zoomMotion = function(a, b, c, d, e) {}, L.prototype.use = function(a, b) {
        var c = this.that.width,
            d = this.that.height;
        return c = c * this.that.pixel_size * this.zoom, d = d * this.that.pixel_size * this.zoom, this.zoomUse(a, b, c, d)
    };
    var M = function(a) {
        this.that = a
    };
    M.prototype.init = function() {
        this.listeners()
    }, M.prototype.listeners = function() {
        var b = this;
        a("#popup-container").on("click", ".download-preset", function() {
            b.changePreset(a(this).attr("data-type"))
        })
    }, M.prototype.changePreset = function(a) {
        var b = 1;
        switch (a) {
            case "default":
                b = 1;
                break;
            case "facebook":
                b = this.calculateSize(1200);
                break;
            case "twitter":
                b = this.calculateSize(1200);
                break;
            case "instagram":
                b = this.calculateSize(1080);
                break;
            case "web":
                b = this.calculateSize(1600)
        }
        return this.that.SettingsController.changeRation(!1, b)
    }, M.prototype.calculateSize = function(a, b) {
        return this.that.width > this.that.height ? Math.max(a / this.that.width) : Math.max(a / this.that.height)
    };
    var N = function(a) {
        this.that = a, this.active = !1, this.loopTimer, this.imagePosition = 0, this.downloadActive = !1, this.downloadButtonText = "", this.downloadButtonLoadingtext = this.that.getResponse("res-loading") + '.. <span class="loading-percent-preview-gif"></span>'
    };
    N.prototype.init = function() {
        this.listeners(), this.close(), this.downloadButtonText = a("#download-preview").html()
    }, N.prototype.reset = function() {
        this.that.previewSize = this.that.pixel_size * this.that.zoom, a("#preview-size-change, #preview-size-change-nav").val("default")
    }, N.prototype.listeners = function() {
        var b = this;
        a(document).keydown(function(a) {
            27 == a.keyCode && b.close()
        }), a(".popup-close-button, .close-btn").bind("click", function(a) {
            a.preventDefault(), b.close()
        }), a(".close-preview-wrapper, .close-preview").bind("touchstart click", function(a) {
            a.preventDefault(), b.close()
        }), a("#preview, #preview-footer").click(function() {
            b.previewFrames()
        }), a("#popup-container, #preview-content").on("click", ".download-preview", function(c) {
            c.preventDefault(), b.download(a(this))
        }), a(".preview-select").change(function() {
            var c = a(this).val(),
                d = "default" == a(this).val() ? b.that.zoom["default"] : parseInt(a(this).val());
            a(".preview-select").val(c), b.that.previewSize = d
        })
    }, N.prototype.previewFrames = function() {
        var a = this;
        this.show(), this.that.FrameController.flattenAll(!0, 1, function(b) {
            b.length >= 1 && a.loop(b)
        })
    }, N.prototype.close = function() {
        this.that.finished && (this.active = !1, clearTimeout(this.loopTimer), a(".preview-container").removeClass("active"), a(".close-preview-button").hasClass("hidden") && a(".close-preview-button").removeClass("hidden"))
    }, N.prototype.showLoading = function() {
        a(".preview-container").addClass("active"), a(".preview-loading").show(), a(".close-preview-button").addClass("hidden"), a(".preview-content").hide()
    }, N.prototype.hideLoading = function() {
        a(".preview-container").removeClass("active"), a(".close-preview-button").removeClass("hidden"), a(".preview-content").show()
    }, N.prototype.show = function() {
        return this.active = !0, a(".preview-container").hasClass("active") ? void this.close() : (this.that.FrameController.frames.length > 1 ? a("#download-preview").addClass("active") : a("#download-preview").removeClass("active"), a(".preview-container").removeAttr("style"), a(".preview-container").addClass("active"), a(".preview-loading").show(), void a(".preview-content-append").html(""))
    }, N.prototype.image = function(b) {
        var c = a('<img src="' + b + '">');
        a("#preview-appened").html(c)
    }, N.prototype.doLoop = function(a) {
        var b = !1,
            c = this;
        this.active && (b = a[this.imagePosition], this.imagePosition >= a.length && (this.imagePosition = 0, b = a[this.imagePosition]), this.imagePosition++, b && (this.image(b.src), this.loopTimer = setTimeout(function() {
            c.doLoop(a)
        }, b.speed)))
    }, N.prototype.loop = function(b) {
        this.imagePosition = 0;
        var c = this.that.previewSize ? this.that.previewSize : this.that.zoom["default"],
            d = this.that.width * c,
            e = this.that.height * c;
        a("#preview-content, #preview-appened").width(d).height(e), a("#preview-loading").hide(), clearTimeout(this.loopTimer), this.doLoop(b)
    }, N.prototype.download = function(b) {
        var c = this,
            d = this.that.previewSize;
        a("#download-preview").html(this.downloadButtonLoadingtext), b.attr("data-select-size") && (d = parseInt(this.that.downloadSizes.gif)), this.downloadActive || (this.downloadActive = !0, this.that.GifController.download(d, !0, function(b) {
            var d = URL.createObjectURL(b);
            saveAs(d, "pixil-gif-drawing.gif"), a("#download-preview").html(c.downloadButtonText), a(".loading-gif-restart").text(""), c.downloadActive = !1
        }))
    };
    var O = function(b) {
        this.that = b, this.status = !1, this.active = !1, this.start_x = !1, this.start_y = !1, this.width = !1, this.height = !1, this.cut_x = -1, this.cut_y = -1, this.cut_width = 0, this.cut_height = 0, this.copyData = !1, this.secondaryCopyData = !1, this.cutImageData = !1, this.currentImage = !1, this.transform = !1, this.currentSizeImage = !1, this.currentSizeImageLoaded = !1, this.currentSelectImage = !1, this.rotateImageColors = [], this.developerData = [], this.usingLasso = !1, this.informationHTML = a("#select-information").html(), a("#select-information").remove()
    };
    O.prototype.init = function() {
        this.listeners(), this.hideStampButton()
    }, O.prototype.listeners = function() {
        var b = this;
        a(".copy-selection").bind("pointerdown", function() {
            b.copySection()
        }), a(".paste-selection").bind("pointerdown", function() {
            b.pasteSelection()
        }), a(".cut-selection").bind("pointerdown", function() {
            b.cutSelection()
        }), a(".accept-selection").click(function() {
            b.accept()
        }), a(".rotate-right").click(function() {
            b.rotate("right")
        }), a(".rotate-left").click(function() {
            b.rotate("left")
        }), a(".flip-right").click(function() {
            b.flipRight()
        }), a(".flip-top").click(function() {
            b.flipTop()
        }), a("#select-info").mousedown(function() {
            b.that.showPopup("select-information", b.informationHTML)
        }), a(".select-download").click(function() {
            b.downloadSelection()
        }), a(".select-filter").click(function() {
            b.applyFilter(a(this))
        }), a(document).keydown(function(a) {
            if (46 == a.keyCode && b.deleteSelection(), (event.ctrlKey || event.metaKey) && 67 == a.keyCode && b.copySection(), (event.ctrlKey || event.metaKey) && 86 == a.keyCode && b.pasteSelection(), (event.ctrlKey || event.metaKey) && 88 == a.keyCode && b.cutSelection(), (event.ctrlKey || event.metaKey) && 68 == a.keyCode && b.hasSelection() && b.accept(), b.that.developer) {
                if (192 == a.keyCode) {
                    var c = JSON.stringify(b.developerData);
                    b.that.showPopup("developer", c)
                }
                b.developerInformation(a.keyCode)
            }
        })
    }, O.prototype.selectLayerContent = function(a) {
        this.that.useSelectTool(!0, !0), this.that.canvas.rendering.clear(), this.that.canvas.select.clear();
        var b = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height),
            c = 0,
            d = 0,
            e = !1,
            f = !1,
            g = !1,
            h = !1,
            i = 0,
            j = 0;
        this.cutImageData = !1;
        for (var k = 0; k < b.data.length; k += 4) c >= this.that.width && (c = 0, d++), b.data[k + 3] > 0 && ((c <= e || e === !1) && (e = c), (d <= f || f === !1) && (f = d), (c >= g || g === !1) && (g = c), (d >= h || h === !1) && (h = d)), c++;
        i = g - e + 1, j = h - f + 1;
        var l = this.that.canvas.layer.image();
        if (this.secondaryCopyData = this.copyDataFormat(l, l.width, l.height), i > 1 && j > 1 && (this.that.ToolController.tool.setSelection(e, f, i, j, i, j, !0), this.that.ToolController.tool.activeSelecting = !0, this.that.ToolController.tool.selectCanvasLocation.active = !1, this.that.ToolController.tool.off(), this.that.SelectController.setCordinates(i, j), this.that.render(), a)) return a()
    }, O.prototype.setCordinates = function(b, c) {
        Math.abs(b) > 0 || Math.abs(c) > 0 ? (a("#select-size-display").removeClass("hidden-hard"), a("#select-width").text(Math.abs(b)), a("#select-height").text(Math.abs(c))) : a("#select-size-display").addClass("hidden-hard")
    }, O.prototype.resize = function(a, b) {
        var c = this;
        if (!(a <= 0 || b <= 0)) return this.currentSizeImage ? void(this.currentSizeImageLoaded && this.resizeCanvas(a, b)) : (this.currentSizeImageLoaded = !1, this.currentSizeImage = this.that.canvas.rendering.image(), this.currentSizeImage.onload = function() {
            c.currentSizeImageLoaded = !0, c.resizeCanvas(a, b)
        })
    }, O.prototype.resizeCanvas = function(a, b) {
        var c = this;
        this.that.canvas.rendering.canvas.width = a, this.that.canvas.rendering.canvas.height = b, this.that.canvas.rendering.setSmoothing(), this.that.ToolController.tool.options.repeat.value ? this.that.backgroundImageRepeat("rendering", this.secondaryCopyData.image, function() {
            c.resizeSrc(c.that.canvas.rendering.dataURL(), !0)
        }, a, b) : (this.that.canvas.rendering.ctx.drawImage(this.currentSizeImage, 0, 0, a, b), this.resizeSrc(this.that.canvas.rendering.dataURL(), !0)), this.setCordinates(a, b)
    }, O.prototype.setRotateImage = function(a) {
        var b = this,
            c = !1,
            d = !1;
        return c = this.that.canvas.rendering.canvas.width, d = this.that.canvas.rendering.canvas.height, this.currentSelectImage ? (a += this.currentDeg, this.degRotate(a)) : void this.that.getDrawnPixels(function(c, d, e, f, g, h, i, j) {
            b.that.canvas.rendering.clear(), b.that.canvas.rendering.canvas.width = d, b.that.canvas.rendering.canvas.height = e, b.that.canvas.rendering.setSmoothing(), b.that.canvas.rendering.ctx.putImageData(c, -f, -g), b.currentSelectImage = b.that.canvas.rendering.image(), b.rotateImageColors = !1, j.length < 20 && j.length >= 1 && (b.rotateImageColors = j), b.currentSelectImage.onload = function() {
                b.currentDeg = 0, b.degRotate(a)
            }
        }, "rendering", this.that.ToolController.tool.options.rotateAnyDegree.value, !1, c, d)
    }, O.prototype.degRotate = function(a) {
        var b = this;
        if (!this.hasSelection() && !data) return !1;
        var c = this.currentSelectImage.width,
            d = this.currentSelectImage.height,
            e = Math.round(this.start_x + c / 2),
            f = Math.round(this.start_y + d / 2),
            g = c;
        e = Math.round(this.drag_width / 2) + this.start_x, f = Math.round(this.drag_height / 2) + this.start_y, d > c && (g = d), g = Math.round(g + g / 2);
        Math.round((g - c) / 2), Math.round((g - d) / 2);
        this.that.canvas.data.clear(), this.that.canvas.data.canvas.width = Math.round(g), this.that.canvas.data.canvas.height = Math.round(g), this.that.canvas.data.setSmoothing(), this.that.canvas.data.ctx.save(), this.that.canvas.data.ctx.translate(Math.round(g / 2), Math.round(g / 2)), this.that.canvas.data.ctx.rotate(a * Math.PI / 180), this.that.canvas.data.setSmoothing(), this.that.canvas.data.ctx.drawImage(this.currentSelectImage, Math.round(-c / 2), Math.round(-d / 2), c, d), this.that.canvas.data.ctx.restore(), this.that.getDrawnPixels(function(c, d, g, h, i, j, k) {
            b.that.canvas.rendering.clear(), b.that.canvas.rendering.canvas.width = d, b.that.canvas.rendering.canvas.height = g, b.that.canvas.rendering.setSmoothing(), b.that.canvas.rendering.ctx.putImageData(c, -h, -i);
            var l = Math.floor(e - d / 2),
                m = Math.floor(f - g / 2);
            b.currentSizeImage = !1, b.currentDeg = a, b.width = d, b.height = g, b.drag_width = d, b.drag_height = g, b.start_x = l, b.start_y = m, b.that.ToolController.tool.selectCanvasLocation.x = l, b.that.ToolController.tool.selectCanvasLocation.y = m, b.that.ToolController.tool.selectCanvasLocation.width = d, b.that.ToolController.tool.selectCanvasLocation.height = g, b.that.ToolController.tool.rotating = !1, b.that.ToolController.tool.updateSelection(), b.that.ToolController.tool.updateSelectCanvasArea(d, g), b.that.render(), b.setCordinates(d, g)
        }, "data", !1, this.rotateImageColors, this.that.canvas.data.canvas.width, this.that.canvas.data.canvas.height)
    }, O.prototype.resizeSrc = function(a, b) {
        var c = this,
            d = !b;
        this.that.loadImage(a, function(a) {
            c.currentSelectImage = a, c.currentDeg = 0, c.resetSet(a, d)
        })
    }, O.prototype.resetSet = function(a, b) {
        b && (this.currentSizeImage = !1), this.that.ToolController.tool.updateSelection(a, !0), this.that.ToolController.tool.updateSelectCanvasArea(this.that.canvas.rendering.canvas.width, this.that.canvas.rendering.canvas.height), this.that.render()
    }, O.prototype.cutSelection = function() {
        return !!this.hasSelection() && (this.copySection(!1, !0), void this.deleteSelection())
    }, O.prototype.developerInformation = function(a) {
        var b = this.that.canvas.rendering.canvas.width + 1,
            c = this.that.canvas.rendering.dataURL(),
            d = {};
        d[a] = {
            image: c,
            spacing_left: b
        }, this.developerData.push(d), console.log(d)
    }, O.prototype.downloadSelection = function() {
        var b = this.that.canvas.rendering.dataURL();
        a("#dowmnload-a").attr("href", b), a("#dowmnload-a").attr("download", "Pixilart selection"), a("#dowmnload-a")[0].click()
    }, O.prototype.showAcceptButton = function() {
        a(".accept-selection").css("display", "inline-block")
    }, O.prototype.hideSelectTools = function() {
        a("#canvas-layers-container .select-helpers").removeClass("active"), this.that.isApp && a("#select-accept, #select-copy, #select-delete, #select-paste, #select-flip-x, #select-flip-y").hide()
    }, O.prototype.showSelectTools = function(b, c) {
        if (this.that.fileDrawing && a("#tool-select-bar .save-text-selection, #canvas-layers-container .save-text-selection").length >= 1 && a("#tool-select-bar .save-text-selection, #canvas-layers-container .save-text-selection").remove(), this.height >= 1 && this.width >= 1 || this.width > 0 && !this.height || this.height > 0 && !this.width) {
            if (this.that.isWindowsIE) return;
            var d = this.start_x * (this.that.pixel_size * this.that.ZoomController.zoom),
                e = this.start_y * (this.that.pixel_size * this.that.ZoomController.zoom),
                f = (this.start_x + this.width) * (this.that.pixel_size * this.that.ZoomController.zoom),
                g = (this.start_y + this.height) * (this.that.pixel_size * this.that.ZoomController.zoom),
                h = (this.start_x + this.width / 2) * (this.that.pixel_size * this.that.ZoomController.zoom),
                i = (this.start_y + this.height / 2) * (this.that.pixel_size * this.that.ZoomController.zoom),
                j = this.that.SelectController.start_x * (this.that.pixel_size * this.that.ZoomController.zoom),
                k = this.that.SelectController.start_y * (this.that.pixel_size * this.that.ZoomController.zoom);
            a("#canvas-layers-container .select-helpers").css({
                left: j - 34,
                top: k
            }), a("#canvas-layers-container .select-helpers-x").css({
                left: f,
                top: i
            }), a("#canvas-layers-container .select-helpers-w").css({
                left: d,
                top: i
            }), a("#canvas-layers-container .select-helpers-y").css({
                left: h,
                top: g
            }), a("#canvas-layers-container .select-helpers-n").css({
                left: h,
                top: e
            }), a("#canvas-layers-container .select-helpers-rotate").css({
                left: h,
                top: e - 40
            }), a("#canvas-layers-container .select-helpers-se").css({
                left: f,
                top: g
            }), a("#canvas-layers-container .select-helpers-sw").css({
                left: d,
                top: g
            }), a("#canvas-layers-container .select-helpers-nw").css({
                left: d,
                top: e
            }), a("#canvas-layers-container .select-helpers-ne").css({
                left: f,
                top: e
            }), a("#canvas-layers-container .select-helpers").addClass("active"), this.that.isApp && a("#select-accept, #select-copy, #select-delete, #select-flip-x, #select-flip-y").show()
        } else this.hideSelectTools(), this.copyData && a("#select-paste").show()
    }, O.prototype.addSelectToolsReady = function() {
        a(".select-helpers").addClass("ready")
    }, O.prototype.removeSelectToolsReady = function() {
        a(".select-helpers").removeClass("ready")
    }, O.prototype.showStampButton = function() {
        a("#tool-select-bar .selection-disabled, #extra-panel-content .select-tool-toggle").removeClass("disabled"), a("#select-size-display").show(), this.showToggleButtons(), this.that.isExternal || (a("#save-stamp-bar").parent(".submit-menu").css("display", "block"), a("#save-stamp-bar, #save-stamp-bar-right").removeClass("hidden-hard"), a("#select-size-display").removeClass("hidden-hard"), a("#set-brush-tool, #set-brush-bar").removeClass("hidden-hard"), a("#set-pattern-tool").removeClass("hidden-hard"), a("#select-tools-tool").show(), this.copyData || a("#paste-selection-bar, #paste-selection-tool").addClass("disabled"))
    }, O.prototype.hideStampButton = function() {
        a("#set-brush-tool, #set-brush-bar").addClass("hidden-hard"), a("#set-pattern-tool").addClass("hidden-hard"), a("#save-stamp-bar, #save-stamp-bar-right").addClass("hidden-hard"), a("#select-tools-tool").hide(), a("#tool-select-bar .selection-disabled, #extra-panel-content .select-tool-toggle").addClass("disabled"), a("#select-size-display").addClass("hidden-hard"), this.copyData && a("#paste-selection-bar, #paste-selection-tool").removeClass("disabled")
    }, O.prototype.showToggleButtons = function() {
        a("#select-group-bar .select-tool-toggle").show()
    }, O.prototype.hideToggleButtons = function() {
        a("#select-group-bar .select-tool-toggle").hide()
    }, O.prototype.deleteSelection = function() {
        var a = this;
        this.status && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage, 0, 0), this.that.canvas.layer.ctx.clearRect(this.cut_x, this.cut_y, this.cut_width, this.cut_height), this.cutImageData && this.that.canvas.layer.putSimple(this.cutImageData, this.cut_x, this.cut_y), this.that.ToolController.restore(), this.that.LayerController.updateLayer(), this.that.FrameController.updateFramePreview(), this.that.LayerController.updateLayer(!1, function() {
            a.that.HistoryController.create(), a.that.updateData()
        }))
    }, O.prototype.clearCopy = function() {
        this.copyData = !1, a("#paste-selection-bar, #paste-selection-tool").addClass("selection-disabled")
    }, O.prototype.applyFilter = function(a) {
        var b = this,
            c = a.attr("data-type");
        this.that.canvas.rendering.clear(), this.that.canvas.rendering.width = this.secondaryCopyData.width, this.that.canvas.rendering.height = this.secondaryCopyData.width, this.that.canvas.rendering.putSimple(this.secondaryCopyData.image);
        var d = this.that.canvas.rendering.ctx.getImageData(0, 0, this.secondaryCopyData.width, this.secondaryCopyData.height),
            e = parseInt(this.that.ToolController.tool.options.strength.value);
        switch ("brightness" != c && "contrast" != c || (e >= 50 && (e += 100), e < 50 && (e += 50)), c) {
            case "brightness":
                var f = this.that.filterBrightness(!1, e, d.data);
                break;
            case "contrast":
                var f = this.that.filterContrast(!1, e, d.data);
                break;
            case "grayscale":
                var f = this.that.filterGrayscale(!1, e, d.data);
                break;
            case "sepia":
                var f = this.that.filterSepia(!1, e, d.data);
                break;
            case "invert":
                var f = this.that.filterInvert(!1, e, d.data);
                break;
            default:
                var f = this.that.filterBlur(!1, 1, d.data, this.secondaryCopyData.width, this.secondaryCopyData.height)
        }
        d.data.set(f), this.that.canvas.rendering.ctx.putImageData(d, 0, 0), this.that.canvas.rendering.image().onload = function() {
            var a = b.copyDataFormat(this, this.width, this.height);
            b.pasteSelection(b.start_x, b.start_y, b.start_x, b.start_y, !0, !0, a), b.accept()
        }
    }, O.prototype.copyDataFormat = function(a, b, c) {
        var d = {};
        return d.image = a, d.width = b, d.height = c, this.secondaryCopyData = d, d
    }, O.prototype.copySection = function(b, c, d) {
        return !(!this.hasSelection() && !b) && (this.copyData = {}, b ? this.copyData = this.copyDataFormat(b, b.width, b.height) : this.copyData = this.copyDataFormat(this.that.canvas.rendering.image(), this.that.canvas.rendering.canvas.width, this.that.canvas.rendering.canvas.height), this.that.isApp ? a("#select-paste").show() : a("#paste-selection-bar, #paste-selection-tool").removeClass("selection-disabled"), void(c || (d || (this.cutImageData = !1), this.that.ToolController.restore(), this.that.ToolController.bucketBackgroundPattern())))
    }, O.prototype.hasSelection = function() {
        return !!this.status
    }, O.prototype.off = function() {
        this.currentSizeImage = !1
    }, O.prototype.setPattern = function() {
        return !!this.hasSelection() && (this.that.stamps.data = this.that.canvas.rendering.image(), this.that.ToolController.restore(), this.that.ToolController.bucketBackgroundPattern(), void(this.that.debug && console.log(this.that.stamps.data)))
    }, O.prototype.setBrush = function() {
        return !!this.hasSelection() && (this.that.settings.brush.status = !0, this.that.settings.brush.image = this.that.canvas.rendering.image(), this.that.settings.brush.width = this.that.canvas.rendering.canvas.width, this.that.settings.brush.height = this.that.canvas.rendering.canvas.height, this.that.settings.brush.solid = this.that.canvasToSolid(this.that.settings.brush.image), this.that.settings.brush.mouse = this.that.canvasToSolid(this.that.settings.brush.image, "#000000", .25), this.that.ToolController.setBrushImage(), this.that.ToolController.restore(), this.that.settings.brush.width <= 50 && this.that.settings.brush.height <= 50 && (this.that.ToolController.addBrushData(this.that.settings.brush.image.src), this.that.ToolController.loadCustomBrushes(), this.that.ToolController.selectTool(a("#brush-tool"), "Brush")), void(this.that.debug && console.log(this.that.settings.brush.image.src)))
    }, O.prototype.pasteSelection = function(a, b, c, d, e, f, g) {
        var h = this.that.mouse.x_1,
            i = this.that.mouse.y_1,
            j = this.that.ZoomController.zoom,
            k = g ? g : this.copyData;
        if (this.that.online.status && this.that.LayerController.layers[this.that.LayerController.currentLayer].name != this.that.online.layer_id) return void this.that.showAlert(this.that.getResponse("res-online-alert"));
        if (!this.that.popup.open && (k && "Select" != this.that.tool && this.that.useSelectTool(!0, !0), k && "Select" == this.that.tool)) {
            this.transform = !1, this.currentDeg = 0, this.showAcceptButton(), this.that.ToolController.restore(), this.that.ToolController.tool.currentImage = !1, this.that.canvas.rendering.canvas.width = k.width, this.that.canvas.rendering.canvas.height = k.height;
            var l = Math.abs(this.that.canvas.layer.canvas.width / 2 - k.width / 2),
                m = Math.abs(this.that.canvas.layer.canvas.height / 2 - k.height / 2);
            (this.that.mouse["in"] || this.isApp) && (l = h - 4 - k.width / 2, m = i - 4 - k.height / 2), (!this.that.mouse["in"] || this.that.isApp) && j > this.that.zoom["default"] && (l = this.that.NavigationController.scroll_x - k.width / 2, m = this.that.NavigationController.scroll_y - k.height / 2), l = Math.floor(l), m = Math.floor(m), (a || e) && (l = a), (b || e) && (m = b), k.width > this.that.width && (l = 0), k.height > this.that.height && (m = 0), this.that.canvas.rendering.putSimple(k.image, 0, 0);
            var n = this.that.ToolController.tool;
            n.selectCanvasLocation && (n.selectCanvasLocation.default_x = c ? c : -99999999, n.selectCanvasLocation.default_y = d ? d : -99999999), e && (n.selectCanvasLocation.default_x = c, n.selectCanvasLocation.default_y = d), n.selectCanvasLocation.x = l, n.selectCanvasLocation.y = m, this.start_drag_x = l, this.start_drag_y = m, this.end_drag_x = l + k.width, this.end_drag_y = m + k.height, n.selectCanvasLocation.width = k.width, n.selectCanvasLocation.height = k.height, this.status = !0, n.selectCanvasLocation.active = !0, n.currentImage = this.that.canvas.layer.image(), n.renderSelectedArea(), this.status = !0, n.selectCanvasLocation.image = this.that.canvas.rendering.image(), this.secondaryCopyData = this.copyDataFormat(n.selectCanvasLocation.image, k.width, k.height), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas, l, m), this.that.render(), this.setCordinates(k.width, k.height), this.showStampButton(), this.drag_width = k.width, this.drag_height = k.height, this.that.ToolController.renderChange = !0, f || this.that.HistoryController.create()
        }
    }, O.prototype.hideAccept = function() {
        a("#select-accept").hide()
    }, O.prototype.accept = function() {
        this.that.ToolController.tool.restore(!1, !0)
    }, O.prototype.flipTop = function() {
        if (this.status) {
            var a = this.that.canvas.rendering.image(),
                b = this;
            this.transform = !0, a.onload = function() {
                var c = b.that.canvas.rendering.canvas,
                    d = c.height;
                c.width;
                b.that.canvas.rendering.clear(), b.that.canvas.rendering.ctx.save(), b.that.canvas.rendering.ctx.scale(1, -1), b.that.canvas.rendering.ctx.drawImage(a, 0, -d), b.that.canvas.rendering.ctx.restore(), b.currentSizeImageLoaded = !1, b.currentSizeImage = !1, b.currentSelectImage = !1, b.that.ToolController.tool.selectCanvasLocation.active = !0, b.that.ToolController.tool.updateSelection(), b.that.render()
            }
        }
    }, O.prototype.flipRight = function() {
        if ("Select" == this.that.tool && this.status) {
            var a = this.that.canvas.rendering.image(),
                b = this;
            this.transform = !0, a.onload = function() {
                var a = b.that.canvas.rendering.canvas,
                    c = (a.height, a.width);
                b.that.canvas.rendering.clear(), b.that.canvas.rendering.ctx.save(), b.that.canvas.rendering.ctx.scale(-1, 1), b.that.canvas.rendering.ctx.drawImage(this, -c, 0), b.that.canvas.rendering.ctx.restore(), b.currentSizeImageLoaded = !1, b.currentSizeImage = !1, b.currentSelectImage = !1, b.that.ToolController.tool.selectCanvasLocation.active = !0, b.that.ToolController.tool.updateSelection(), b.that.render()
            }
        }
    }, O.prototype.rotate = function(a) {
        if ("Select" == this.that.tool && this.status) {
            var b = this.that.canvas.rendering.image(),
                c = this;
            b.onload = function() {
                var b = c.that.canvas.rendering.canvas.height,
                    d = c.that.canvas.rendering.canvas.width,
                    e = [];
                c.that.canvas.rendering.clear(), c.that.canvas.rendering.ctx.translate(d, 0), c.that.canvas.rendering.ctx.scale(-1, 1), c.that.canvas.rendering.ctx.drawImage(this, 0, 0);
                for (var f = c.that.canvas.rendering.ctx.getImageData(0, 0, this.width, this.height), g = 0, h = 0, i = 0; i < f.data.length; i += 4) {
                    g >= this.width && (g = 0, h++);
                    var j = [f.data[i], f.data[i + 1], f.data[i + 2], f.data[i + 3]];
                    f.data[i + 3] > 0 && m && (j[0] = rgbaColor.r, j[1] = rgbaColor.g, j[2] = rgbaColor.b);
                    var k = {
                        x: g,
                        y: h,
                        data: j
                    };
                    e.push(k), g++
                }
                if (c.that.canvas.rendering.clear(), c.that.canvas.rendering.canvas.height = d, c.that.canvas.rendering.canvas.width = b, "left" == a)
                    for (var g = 0; g < e.length; g++) {
                        var l = e[g],
                            m = "rgba(" + l.data[0] + "," + l.data[1] + "," + l.data[2] + "," + l.data[3] + ")";
                        c.that.layPixel(l.y, l.x, !0, m, "rendering", 1)
                    } else
                        for (var g = 0; g < e.length; g++) {
                            var l = e[g],
                                m = "rgba(" + l.data[0] + "," + l.data[1] + "," + l.data[2] + "," + l.data[3] + ")",
                                n = c.that.canvas.rendering.canvas.width - 1 - l.y,
                                o = c.that.canvas.rendering.canvas.height - 1 - l.x;
                            c.that.layPixel(n, o, !0, m, "rendering", 1)
                        }
                c.that.ToolController.tool.selectCanvasLocation.active = !0, c.that.ToolController.tool.updateSelection(), c.that.ToolController.tool.updateSelectCanvasArea(c.that.canvas.rendering.canvas.width, c.that.canvas.rendering.canvas.height), c.that.render(), c.transform = !0, c.currentSizeImage = c.that.canvas.rendering.image()
            }
        }
    }, O.prototype.completePoint = function() {
        "function" == typeof this.that.ToolController.tool.off && this.that.ToolController.tool.off()
    }, O.prototype.setPoint = function() {
        "function" == typeof this.that.ToolController.tool.setPoint && this.that.ToolController.tool.setPoint()
    };
    var P = function(a) {
        this.that = a
    };
    P.prototype.init = function() {
        this.listeners()
    }, P.prototype.listeners = function() {
        var b = this;
        a(document).on("focus", "input[type=text], textarea", function(a) {
            b.that.preventShortcut = !0, b.that.canKey = !1
        }), a(document).on("blur", "input[type=text], textarea", function(a) {
            b.that.preventShortcut = !1, b.that.canKey = !0
        }), a(document).keydown(function(a) {
            !b.that.settings.disableKeybinds && b.that.canKey && (b.that.preventShortcut || a.preventDefault(), a.shiftKey && (b.that.keys.shift = !0), (a.ctrlKey || a.metaKey) && (b.that.keys.ctrl = !0), b.that.keyEvent = a, (a.ctrlKey || a.metaKey) && 90 == a.keyCode && b.that.HistoryController.doUndo(), (a.ctrlKey || a.metaKey) && 89 == a.keyCode && b.that.HistoryController.doRedo(), (a.ctrlKey || a.metaKey) && a.shiftKey && 83 == a.keyCode && b.that.ExportImportController["export"](), (a.ctrlKey || a.metaKey) && 79 == a.keyCode && b.that.ExportImportController.open())
        }), a(document).keyup(function(a) {
            b.that.keyEvent = !1, b.that.keys.shift = !1, b.that.keys.ctrl = !1
        })
    };
    var Q = function(b) {
        this.that = b, this.status = !1, this.customTextName = "ptx", this.customTextSettingsName = "ptxs", this.customTextData = {}, this.canAssignLetter = !1, this.tabletStart = 0, this.fontsSelectionCache = a("#fonts-selection"), this.customTextSettings = {
            height: 10,
            spacing: 2
        }, this.loadedFonts = !1, this.fontSelectionOpen = !1, this.imagePreviews = {}, this.popupHtmlData = !1, this.customFont = !1, this.currentImageData = {
            image: "",
            height: 10,
            spacing: 10
        }
    };
    Q.prototype.init = function() {
        this.listeners(), this.loadCustomTextInfo(), this.popupHtmlData = a(".custom-text-information").html(), a(".custom-text-information").remove(), this.popupTextHtmlData = a(".select-text-information").html(), a(".select-text-information").remove(), this.loadCustomData()
    }, Q.prototype.loadCustom = function() {
        this.loadCustomData(), this.that.textData.custom = this.customFont
    }, Q.prototype.showPopup = function(a, b) {
        this.that.showPopup(a, b), this.loadPopupData()
    }, Q.prototype.getImageFromCanvas = function() {
        var a = this.that.canvas.rendering.image();
        this.currentImageData.image = a.src, this.currentImageData.height = a.height, this.currentImageData.spacing = parseInt(a.width) + 1
    }, Q.prototype.listeners = function() {
        var b = this;
        a(document, "#tablet-text-keyboard").on("keydown", function(a) {
            "Text" == b.that.tool && (32 == a.keyCode && a.target == document.body && a.preventDefault(), 8 === a.which && a.preventDefault(), b.that.ToolController["do"]("use", a))
        }), a(".show-font-settings").click(function() {
            b.showPopup("custom-text", b.popupHtmlData)
        }), a(".save-text-selection").click(function() {
            return !!b.that.SelectController.hasSelection() && (b.canAssignLetter = !0, b.showPopup("new-letter", b.popupTextHtmlData), void b.getImageFromCanvas())
        }), a("#popup-container").on("click", ".assign-key", function() {
            var c = a(this).attr("data-key");
            b.updateKey(c)
        }), a("#popup-container").on("click", ".export-font", function() {
            b["export"]()
        }), a("#popup-container").on("click", ".text-settings-update", function() {
            b.updateSettings()
        }), this.fontsSelectionCache.change(function() {
            b.selection(a(this).val())
        }), a("#tool-option-appended, #extra-panel-content").on("pointerdown", ".preview-font", function() {
            var c = a(this),
                d = c.attr("data-option");
            a("#text-selection-images .preview-font, #fonts-toolbar-options .preview-font").removeClass("active"), a(".font-" + d).addClass("active"), b.selection(c.attr("data-option")), b.checkFontSelectionOpen(!1, !0)
        }), a("#tool-option-appended").on("click", "#fonts-toolbar-options", function(c) {
            var d = a(this);
            d.hasClass("active") || (d.addClass("active"), b.fontSelectionOpen = !0)
        })
    }, Q.prototype.checkFontSelectionOpen = function(b, c) {
        (c || this.fontSelectionOpen && !a(b.target).parents("#fonts-toolbar-options").length) && (a("#fonts-toolbar-options").removeClass("active"), this.fontSelectionOpen = !1)
    }, Q.prototype.prompt = function() {
        var a = this,
            b = prompt("Text to add", ""),
            c = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (b) {
            b = b.toUpperCase();
            var d = b.split("");
            this.tabletStart = 0;
            var e = function() {
                if (!(a.tabletStart > b.length - 1)) {
                    var f = d[a.tabletStart],
                        g = b.charCodeAt(a.tabletStart);
                    c.test(f) && (g = "s" + g), a.that.ToolController.tool.use(!1, g, function() {
                        a.tabletStart++, e()
                    })
                }
            };
            e()
        }
    }, Q.prototype.selection = function(a) {
        this.that.textData.current = a, this.that.ToolController.tool.on()
    }, Q.prototype.appendPreviews = function(b) {
        var c = this;
        a("#text-selection-images").html(""), a.each(this.that.textData, function(b, d) {
            var e = "";
            if (d.preview) {
                b == c.that.textData.current && (e += "active");
                var f = a('<div class="preview-font ' + e + " font-" + b + '" data-option="' + b + '" title="' + b + '"><img src="' + d.preview + '"" /></div>');
                a("#fonts-toolbar-options, #text-selection-images").append(f)
            }
        }), this.loadedFonts = !0
    }, Q.prototype.loadFonts = function() {}, Q.prototype.loadPopupData = function() {
        var b = this;
        a(".text-settings-height").val(this.customTextSettings.height), a(".text-settings-spacing").val(this.customTextSettings.spacing);
        var c = "";
        a.each(this.customTextData, function(a, d) {
            c += '<div class="col-4 col-lg-3 assign-key" data-key="' + a + '"><div class="cs-k-w"><div class="cs-k-image kimg-' + a + '">' + b.getImage(d.image) + '</div><div class="cs-k">' + d.key + "</div></div></div>"
        }), a(".text-settings-display").html(c)
    }, Q.prototype.getImage = function(a) {
        return "" == a ? "" : '<img src="' + a + '" />'
    }, Q.prototype.loadCustomTextInfo = function() {
        this.fetchKeys(), this.loadSettings()
    }, Q.prototype.fetchKeys = function() {
        this.loadKeys() || (this.customTextData = this.createKeys(), this.that.putStorage(this.customTextName, this.customTextData))
    }, Q.prototype.loadKeys = function() {
        var a = this.that.getStorage(this.customTextName);
        return !(!a || "" == a.trim()) && (a = this.that.replaceAll(a, "--.--", ";"), this.customTextData = JSON.parse(a), !0)
    }, Q.prototype.loadSettings = function() {
        var a = this.that.getStorage(this.customTextSettingsName);
        a ? (a = this.that.replaceAll(a, "--.--", ";"), this.customTextSettings = JSON.parse(a)) : this.that.putStorage(this.customTextSettingsName, this.customTextSettings)
    }, Q.prototype.updateSettings = function() {
        this.customTextSettings.height = a(".text-settings-height").val(), this.customTextSettings.spacing = a(".text-settings-spacing").val(), this.that.textData.custom.height = this.customTextSettings.height, this.that.putStorage(this.customTextSettingsName, this.customTextSettings)
    }, Q.prototype.updateKey = function(b) {
        this.canAssignLetter && (this.saveKey(b, this.currentImageData), a(".kimg-" + b).html(this.getImage(this.currentImageData.image)))
    }, Q.prototype.saveKey = function(a, b) {
        this.that.fileDrawing || ("undefined" == typeof this.that.textData.custom[a] && this.loadCustomData(), this.that.textData.custom[a].image = b.image, this.that.textData.custom[a].spacing = b.spacing, this.customTextData[a].image = b.image, this.customTextData[a].spacing = b.spacing, this.that.putStorage(this.customTextName, this.customTextData))
    }, Q.prototype.getKey = function(a) {
        return this.customTextData[a]
    }, Q.prototype.createKeys = function() {
        return {
            81: {
                key: "q",
                image: "",
                spacing: 0
            },
            87: {
                key: "w",
                image: "",
                spacing: 0
            },
            69: {
                key: "e",
                image: "",
                spacing: 0
            },
            82: {
                key: "r",
                image: "",
                spacing: 0
            },
            84: {
                key: "t",
                image: "",
                spacing: 0
            },
            89: {
                key: "y",
                image: "",
                spacing: 0
            },
            85: {
                key: "u",
                image: "",
                spacing: 0
            },
            73: {
                key: "i",
                image: "",
                spacing: 0
            },
            79: {
                key: "o",
                image: "",
                spacing: 0
            },
            80: {
                key: "p",
                image: "",
                spacing: 0
            },
            65: {
                key: "a",
                image: "",
                spacing: 0
            },
            83: {
                key: "s",
                image: "",
                spacing: 0
            },
            68: {
                key: "d",
                image: "",
                spacing: 0
            },
            70: {
                key: "f",
                image: "",
                spacing: 0
            },
            71: {
                key: "g",
                image: "",
                spacing: 0
            },
            72: {
                key: "h",
                image: "",
                spacing: 0
            },
            74: {
                key: "j",
                image: "",
                spacing: 0
            },
            75: {
                key: "k",
                image: "",
                spacing: 0
            },
            76: {
                key: "l",
                image: "",
                spacing: 0
            },
            90: {
                key: "z",
                image: "",
                spacing: 0
            },
            88: {
                key: "x",
                image: "",
                spacing: 0
            },
            67: {
                key: "c",
                image: "",
                spacing: 0
            },
            86: {
                key: "v",
                image: "",
                spacing: 0
            },
            66: {
                key: "b",
                image: "",
                spacing: 0
            },
            78: {
                key: "n",
                image: "",
                spacing: 0
            },
            77: {
                key: "m",
                image: "",
                spacing: 0
            },
            49: {
                key: "1",
                image: "",
                spacing: 0
            },
            50: {
                key: "2",
                image: "",
                spacing: 0
            },
            51: {
                key: "3",
                image: "",
                spacing: 0
            },
            52: {
                key: "4",
                image: "",
                spacing: 0
            },
            53: {
                key: "5",
                image: "",
                spacing: 0
            },
            54: {
                key: "6",
                image: "",
                spacing: 0
            },
            55: {
                key: "7",
                image: "",
                spacing: 0
            },
            56: {
                key: "8",
                image: "",
                spacing: 0
            },
            57: {
                key: "9",
                image: "",
                spacing: 0
            },
            48: {
                key: "0",
                image: "",
                spacing: 0
            },
            189: {
                key: "-",
                image: "",
                spacing: 0
            },
            187: {
                key: "=",
                image: "",
                spacing: 0
            },
            190: {
                key: ".",
                image: "",
                spacing: 0
            },
            188: {
                key: ",",
                image: "",
                spacing: 0
            },
            191: {
                key: "/",
                image: "",
                spacing: 0
            },
            222: {
                key: "'",
                image: "",
                spacing: 0
            },
            219: {
                key: "[",
                image: "",
                spacing: 0
            },
            220: {
                key: "\\",
                image: "",
                spacing: 0
            },
            221: {
                key: "]",
                image: "",
                spacing: 0
            },
            186: {
                key: ";",
                image: "",
                spacing: 0
            },
            192: {
                key: "`",
                image: "",
                spacing: 0
            },
            s186: {
                key: ":",
                image: "",
                spacing: 0,
                shift: !0
            },
            s191: {
                key: "?",
                image: "",
                spacing: 0,
                shift: !0
            },
            s49: {
                key: "!",
                image: "",
                spacing: 0,
                shift: !0
            },
            s50: {
                key: "@",
                image: "",
                spacing: 0,
                shift: !0
            },
            s51: {
                key: "#",
                image: "",
                spacing: 0,
                shift: !0
            },
            s52: {
                key: "$",
                image: "",
                spacing: 0,
                shift: !0
            },
            s53: {
                key: "%",
                image: "",
                spacing: 0,
                shift: !0
            },
            s54: {
                key: "^",
                image: "",
                spacing: 0,
                shift: !0
            },
            s55: {
                key: "&",
                image: "",
                spacing: 0,
                shift: !0
            },
            s56: {
                key: "*",
                image: "",
                spacing: 0,
                shift: !0
            },
            s57: {
                key: "(",
                image: "",
                spacing: 0,
                shift: !0
            },
            s48: {
                key: ")",
                image: "",
                spacing: 0,
                shift: !0
            },
            s189: {
                key: "_",
                image: "",
                spacing: 0,
                shift: !0
            },
            s187: {
                key: "+",
                image: "",
                spacing: 0,
                shift: !0
            },
            s222: {
                key: '"',
                image: "",
                spacing: 0,
                shift: !0
            },
            s219: {
                key: "{",
                image: "",
                spacing: 0
            },
            s220: {
                key: "|",
                image: "",
                spacing: 0
            },
            s221: {
                key: "}",
                image: "",
                spacing: 0
            },
            s188: {
                key: "<",
                image: "",
                spacing: 0
            },
            s190: {
                key: ">",
                image: "",
                spacing: 0
            },
            s192: {
                key: "~",
                image: "",
                spacing: 0
            }
        }
    }, Q.prototype.loadCustomData = function(b) {
        var c = (this.customTextData, this.customTextSettings.height),
            d = this.customTextSettings.spacing,
            e = this.that.textData.custom.preview,
            f = {
                resize: !1,
                height: c,
                spacing_top: parseInt(c) + 1,
                spacing_left: d
            };
        if (a.each(this.customTextData, function(a, b) {
                f[a] = {
                    image: b.image,
                    spacing_left: b.spacing
                }
            }), this.customFont = f, this.that.textData.custom = this.customFont, this.that.textData.custom.preview = e, b) return f
    }, Q.prototype["export"] = function() {
        var a = JSON.stringify(this.loadCustomData(!0));
        this.that.downloadFile("new-font.json", a)
    };
    var R = function(a) {
        this.that = a, this.loaded = !1, this.html = "", this.cookieName = this.that.settings.name, this.maxDownloadSize = 100, this.iconSets = {
            "default": {
                name: "Default",
                src: "/img/application/icons/set_default.png",
                size: 16
            },
            username: {
                name: "Set by Username",
                src: "/img/application/icons/set_username.png",
                size: 16
            },
            peppermint: {
                name: "Set by Peppermint",
                src: "/img/application/icons/set_peppermint.png",
                size: 32
            },
            wolf: {
                name: "Set by Wolf",
                src: "/img/application/icons/set_wolf.png",
                size: 32
            },
            autumnfire: {
                name: "Set by Autumnfire",
                src: "/img/application/icons/set_autumnfire.png",
                size: 32
            },
            vinzenzius: {
                name: "Set by Vinzenzius",
                src: "/img/application/icons/set_vinzenzius.png",
                size: 32
            },
            isometric: {
                name: "Set by Isometric",
                src: "/img/application/icons/set_isometric.png",
                size: 32
            },
            detectiveevolve: {
                name: "Set by DetectiveEvolve",
                src: "/img/application/icons/set_detectiveevolve.png",
                size: 24
            },
            slinky_16: {
                name: "Set by Slinky 16",
                src: "/img/application/icons/set_slinky_16.png",
                size: 16
            },
            slinky_32: {
                name: "Set by Slinky 32",
                src: "/img/application/icons/set_slinky_32.png",
                size: 32
            },
            limethelime_32: {
                name: "Set by LimeTheLime 32",
                src: "/img/application/icons/set_limethelime.png",
                size: 32
            },
            alpha6_32: {
                name: "Set by Alpha6 32",
                src: "/img/application/icons/set_alpha6.png",
                size: 32
            }
        }
    };
    R.prototype.init = function() {
        this.listeners(), this.createIconSelects(), this.html = a(".settings-information").html(), a(".settings-information").remove()
    }, R.prototype.createIconSelects = function() {
        a.each(this.iconSets, function(b, c) {
            a(".select-icon-set").append('<option value="' + b + '">' + c.name + "</option>")
        })
    }, R.prototype.checkCurrentSettings = function() {}, R.prototype.loadIconSet = function() {
        var b = this.iconSets[this.that.settings.theme.icons];
        b && (a(".icon-tool").css("background-image", "url(" + b.src + ")"), a(".icon-set").removeClass("s").removeClass("ml"), 32 == b.size && a(".icon-set").addClass("s"), 24 == b.size && a(".icon-set").addClass("ml"))
    }, R.prototype.updateSettingsCookie = function(a, b) {
        this.that.updateSettingsByKey(a, b)
    }, R.prototype.changeIconSet = function(a) {
        this.that.settings.theme.icons = a, this.loadIconSet(), this.that.updateSettings()
    }, R.prototype.load = function() {
        this.that.isApp && a(".ons-switch").removeAttr("checked"), a(".grid-sect").show(), this.that.grid.show || a(".grid-sect").hide(), this.that.backgroundImage.init && (a(".background-size-switch").removeClass("d-none"), a(".background-size-switch").val(this.that.backgroundImage.size)), this.that.grid.status && (a(".grid-sect").show(), a("#grid-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-grid").attr("checked", !0)), this.that.checker.status && (a("#checker-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-checker").attr("checked", !0)), this.that.autosave.status && a("#autosave-toggle").prop("checked", !0), this.that.pixelPerfect.status && (a("#perfect-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-pixel").attr("checked", !0)), this.that.onionSkin.status && a("#onion-toggle").prop("checked", !0), this.that.onionSkin.top_status && a("#onion-toggle-top").prop("checked", !0), this.that.randomColor.status && (a("#random-color-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-random").attr("checked", !0)), this.that.rainbow.status && (a("#rainbow-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-rainbow").attr("checked", !0)), this.that.settings.showHue && a("#hue-toggle").prop("checked", !0), this.that.settings.usePressure && a("#settings-use-pressure").prop("checked", !0), this.that.settings.dithering && a("#dithering-toggle").prop("checked", !0), this.that.settings.extras && a(".extras-toggle").prop("checked", !0), this.that.settings.isoLines && (a("#iso-lines-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-iso").attr("checked", !0)), this.that.settings.theme.lighter && a("#lighter-toggle").prop("checked", !0), this.that.settings.canvasZoomDefault && a("#canvas-zoom-toggle").prop("checked", !0), this.that.settings.disableDownloadSubmit && a("#download-submit-toggle").prop("checked", !0), this.that.settings.mouseIcons && a("#mouse-icons-toggle").prop("checked", !0), this.that.settings.persLayers && a("#pers-toggle").prop("checked", !0), this.that.settings.disableScrollZoom && a("#disable-scroll-zoom-toggle").prop("checked", !0), this.that.settings.disableKeybinds && a("#disable-keybinds-toggle").prop("checked", !0), this.that.settings.lockFrames && a(".frames-lock-toggle").prop("checked", !0), this.that.backgroundImage.status && a("#background-toggle").prop("checked", !0), this.loadSettings(), this.loadDownloadSelect(), this.loaded = !0
    }, R.prototype.loadSettings = function() {
        a(".select-icon-set").val(this.that.settings.theme.icons)
    }, R.prototype.listeners = function() {
        var b = this;
        a(document).on("click", ".settings-toggle", function(a) {
            a.preventDefault(), b.showPopup("settings"), b.load()
        }), a(document).on("click", ".popup-exit", function() {
            b.closePopup()
        }), a(document).on("click", ".close-btn", function() {
            b.closePopup()
        }), a(document).keydown(function(a) {
            27 == a.keyCode && b.closePopup()
        }), this.that.isApp ? (a(document).on("click", ".app-mouse-toggle", function(a) {
            b.hideAppMouse()
        }), a(document).on("change", ".app-speed-dropdown", function(c) {
            b.that.updateFrameSpeed(a(this).val())
        })) : (a("#popup-container").on("change", ".select-icon-set", function() {
            b.changeIconSet(a(this).val())
        }), a("#rounded-toggle").change(function() {
            b.that.settings.roundedPixel = !b.that.settings.roundedPixel, b.that.updateSettings()
        }), a(".s-a-lt").click(function(c) {
            c.preventDefault(), b.changeAdLayout(a(this).attr("data-type"))
        }), a(".section-extend").bind("pointerup", function() {
            b.expandPanel(a(this))
        }), a(".section-close").bind("pointerup", function(c) {
            c.preventDefault(), b.closePanel(a(this))
        }), a("#popup-container").on("change", "#tracing-background", function() {
            b.loaded && b.loadBackground(a(this))
        }), a("#popup-container").on("change", ".background-size-switch", function() {
            b.changeBackgroundSize(a(this).val())
        }), a("#popup-container").on("click", ".upload-tracing", function() {
            a("#tracing-background")[0].click()
        }), a("#popup-container").on("change", ".lang-selection", function() {
            var c = a(this).val();
            b.changeLang(c)
        }), a("#popup-container").on("click", ".background-toggle", function() {
            b.loaded && (b.that.backgroundImage.status = !1, a(this).is(":checked") ? (b.that.backgroundImage.status = !0, b.that.tracing(), a(".background-toggle").prop("checked", !0)) : (b.that.tracing(), a(".background-toggle").prop("checked", !1).removeAttr("checked")))
        }), a("#popup-container").on("click", ".checker-toggle", function() {
            b.loaded && (b.that.checker.status = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.checker.status = !0, a(".checker-toggle").prop("checked", !0)) : a(".checker-toggle").prop("checked", !1).removeAttr("checked"), b.that.render())
        }), a("#grid-icon-toggle").click(function() {
            b.that.grid.status = !b.that.grid.status, b.that.toggleGridIcon()
        })), a(".download-toggle").click(function(c) {
            c.preventDefault(), b.that.showPopup("download", a("#download-information").html()), b.that.PopupController.updateElements(), b.load()
        }), a(".p-header").click(function() {
            b.that.isApp && b.closePopup()
        }), a("#popup-container").on("click", ".grid-toggle", function() {
            (b.loaded || b.that.isApp) && (b.that.grid.status = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.grid.status = !0, a(".grid-toggle").prop("checked", !0)) : a(".grid-toggle").prop("checked", !1).removeAttr("checked"), b.that.toggleGridIcon(), b.that.render(!0))
        }), a("#popup-container").on("click", ".autosave-toggle", function() {
            b.loaded && !b.that.fileDrawing && (b.that.autosave.status = !1, a(this).is(":checked") ? (b.that.autosave.status = !0, a(".autosave-toggle").prop("checked", !0), b.that.startAutoSave()) : (a(".autosave-toggle").prop("checked", !1).removeAttr("checked"), b.that.stopAutoSave()))
        }), a("#popup-container").on("click", ".onion-toggle", function() {
            b.loaded && (b.that.onionSkin.status = !1, a(this).is(":checked") ? (b.that.onionSkin.status = !0, a(".onion-toggle").prop("checked", !0)) : a(".onion-toggle").prop("checked", !1).removeAttr("checked"), b.that.render())
        }), a("#popup-container").on("click", "#settings-use-pressure", function() {
            b.that.settings.usePressure = !1, a(this).is(":checked") ? (b.that.settings.usePressure = !0, a("#settings-use-pressure").prop("checked", !0)) : a("#settings-use-pressure").prop("checked", !1).removeAttr("checked"), b.that.updateSettings()
        }), a("#popup-container").on("click", ".onion-toggle-top", function() {
            b.loaded && (b.that.onionSkin.top_status = !1, a(this).is(":checked") ? (b.that.onionSkin.top_status = !0, a(".onion-toggle-top").prop("checked", !0)) : a(".onion-toggle-top").prop("checked", !1).removeAttr("checked"), b.that.render())
        }), a("#popup-container, #right-sidebar").on("click", ".perfect-toggle", function() {
            (b.loaded || a(this).attr("data-force")) && (b.that.pixelPerfect.status = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.pixelPerfect.status = !0, a(".perfect-toggle, #op-perfect").prop("checked", !0)) : a(".perfect-toggle, #op-perfect").prop("checked", !1).removeAttr("checked"), b.that.render())
        }), a("#popup-container, #right-sidebar").on("click", ".random-color-toggle", function() {
            (b.loaded || a(this).attr("data-force")) && (b.that.randomColor.status = !1, a(".random-toggle-option").removeClass("active"), a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.randomColor.status = !0, a(".random-color-toggle").prop("checked", !0), a(".random-toggle-option").addClass("active")) : a(".random-color-toggle").prop("checked", !1).removeAttr("checked"))
        }), a("#popup-container").on("click", ".canvas-zoom-toggle", function() {
            (b.loaded || a(this).attr("data-force")) && (b.that.settings.canvasZoomDefault = !1, a(this).is(":checked") ? (b.that.settings.canvasZoomDefault = !0, a(".canvas-zoom-toggle").prop("checked", !0)) : a(".canvas-zoom-toggle").prop("checked", !1).removeAttr("checked"), b.toggleCanvasZoom())
        }), a("#popup-container, #right-sidebar").on("click", ".rainbow-toggle", function() {
            (b.loaded || a(this).attr("data-force")) && (b.that.rainbow.status = !1, a(".rainbow-toggle-option").removeClass("active"), a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.rainbow.status = !0, a(".rainbow-toggle").prop("checked", !0), a(".rainbow-toggle-option").addClass("active")) : a(".rainbow-toggle").prop("checked", !1).removeAttr("checked"))
        }), a("#popup-container").on("click", "#pers-toggle", function() {
            b.togglePersLayers(a(this).is(":checked"))
        }), a("#popup-container, #right-sidebar").on("click", ".dithering-toggle", function() {
            (b.loaded || a(this).attr("data-force")) && (b.that.settings.dithering = !1, a(".dithering-toggle-option").removeClass("active"), a(this).is(":checked") ? (b.that.settings.dithering = !0, a(".dithering-toggle").prop("checked", !0), a(".dithering-toggle-option").addClass("active")) : a(".dithering-toggle").prop("checked", !1).removeAttr("checked"))
        }), a("#popup-container").on("click", "#download-submit-toggle", function() {
            b.that.settings.disableDownloadSubmit = !1, a(this).is(":checked") ? b.that.settings.disableDownloadSubmit = !0 : a("#download-submit-toggle").prop("checked", !1).removeAttr("checked"), b.that.updateSettings()
        }), a("#popup-container").on("click", "#mouse-icons-toggle", function() {
            b.that.settings.mouseIcons = !1, a(this).is(":checked") ? b.that.settings.mouseIcons = !0 : a("#mouse-icons-toggle").prop("checked", !1).removeAttr("checked"), b.toggleMouseIcons(), b.that.updateSettings()
        }), a("#popup-container").on("click", "#disable-keybinds-toggle", function() {
            b.that.settings.disableKeybinds = !1, a(this).is(":checked") ? b.that.settings.disableKeybinds = !0 : a("#disable-keybinds-toggle").prop("checked", !1).removeAttr("checked"), b.toggleKeybinds()
        }), a("#popup-container").on("click", "#disable-scroll-zoom-toggle", function() {
            b.that.settings.disableScrollZoom = !1, a(this).is(":checked") ? b.that.settings.disableScrollZoom = !0 : a("#disable-scroll-zoom-toggle").prop("checked", !1).removeAttr("checked"), b.that.updateSettings()
        }), a("#right-sidebar").on("click", ".iso-lines-toggle", function() {
            b.that.settings.isoLines = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.settings.isoLines = !0, a(".iso-lines-toggle, #op-iso").prop("checked", !0)) : a(".iso-lines-toggle, #op-iso").prop("checked", !1).removeAttr("checked")
        }), a("#popup-container, #frames-placement").on("click", ".frames-lock-toggle", function() {
            b.that.settings.lockFrames = !1, a(this).is(":checked") ? (b.that.settings.lockFrames = !0, a(".frames-lock-toggle").prop("checked", !0)) : a(".frames-lock-toggle").prop("checked", !1).removeAttr("checked"), b.toggleLockedFrames()
        }), a("#popup-container").on("click", "#lighter-toggle", function() {
            a(this).is(":checked") ? a("#lighter-toggle").prop("checked", !0) : a("#lighter-toggle").prop("checked", !1).removeAttr("checked"), b.toggleLighterTheme()
        }), a("#zoom-out-toggle").click(function() {
            b.that.settings.zoomUnlock = !b.that.settings.zoomUnlock, b.toggleZoomLock(!0)
        }), a("#popup-container").on("input", "#download-range, .ratio-download", function() {
            var c = a(this).val();
            c <= 0 && (c = 1), b.changeRation(a(this).attr("data-alt"), c)
        }), a("#popup-container").on("click", ".text-pattern-prompt", function() {
            b.promptPattern()
        })
    }, R.prototype.closePanel = function(b, c) {
        var d = c ? c : a(b).attr("data-for");
        this.that.isApp || (a("." + d).removeClass("dragable").removeClass("fixed"), a("." + d).css({
            position: "static",
            width: "100%"
        }), a("." + d + "-tab").show(), a("." + d + "-content").removeClass("force"))
    }, R.prototype.expandPanel = function(b, c) {
        if (c) var d = c;
        else var d = b.attr("data-for");
        if (!this.that.isApp) {
            if (a("." + d).hasClass("dragable")) return this.closePanel(!1, d);
            a("." + d).addClass("dragable fixed"), a("." + d).css({
                position: "fixed"
            }), a("." + d + "-tab").hide(), a(".dragable").draggable({
                handle: ".drag-handle"
            });
            var e = a("." + d).position();
            e.left < 0 || e.top < 50, a("." + d + "-content").addClass("force"), b && !b.attr("data-ig") && a(".sidebar-preview-tab")[0].click()
        }
    }, R.prototype.hideAppMouse = function() {
        this.that.app.hideMouse ? a("#pixel-trace").addClass("hide-mouse") : a("#pixel-trace").removeClass("hide-mouse");
    }, R.prototype.loadCssGrid = function(b, c) {
        var d = this,
            e = a("#canvas_grid_image");
        e.show(), this.that.ZoomController.zoom = this.that.round(this.that.ZoomController.zoom, .5, "up");
        this.that.pixel_size * this.that.ZoomController.zoom;
        this.that.settings.grid = this.that.grid.status, this.that.grid.status ? this.that.createGrid("grid", function() {
            d.that.ZoomController.end()
        }) : e.hide(), c && this.that.updateSettings()
    }, R.prototype.changeAdLayout = function(a) {
        this.that.settings.ad.placement = a, this.that.ads.placement = a, this.that.initFreestar(), this.that.updateSettings()
    }, R.prototype.togglePersLayers = function(b) {
        this.that.settings.persLayers && (this.that.settings.persLayers = b), this.that.settings.persLayers ? a("#layer-lepard").show() : (a("#pers-toggle, #pers-toggle-def").prop("checked", !1), a("#layer-lepard").hide(), localStorage.setItem("new_draw_per", this.that.settings.persLayers))
    }, R.prototype.toggleZoomLock = function(b) {
        this.that.settings.zoomUnlock ? a("#zoom-out-toggle").addClass("dis") : (a("#zoom-out-toggle").removeClass("dis"), this.that.ZoomController.zoom < this.that.ZoomController.minZoom && this.that.ZoomController.reset(!0)), b && this.that.updateSettings()
    }, R.prototype.changeLang = function(a) {
        var b = "https://www.pixilart.com/draw";
        switch (a) {
            case "es":
                b = "https://es.pixilart.com/draw"
        }
        return window.location.href = b
    }, R.prototype.toggleISOLines = function() {
        this.that.settings.isoLines ? a(".iso-lines-toggle, #op-iso").prop("checked", !0) : a(".iso-lines-toggle, #op-iso").prop("checked", !1).removeAttr("checked")
    }, R.prototype.toggleLockedFrames = function(b) {
        var c = !1,
            d = a("#drawing-tool-options").height();
        if (this.that.settings.lockFrames) {
            c = 25, a("#frames-placement").addClass("locked");
            var e = a("#frames-placement").height();
            d && (e += d);
            var f = "calc(100% - " + e + "px)";
            a("#drawing-canvas-conatiner").height(f), a("body").addClass("frame-locked")
        } else a("#frames-placement").removeClass("locked"), a("#drawing-canvas-conatiner").removeAttr("style"), a("#frames-container").hide(), a("body").removeClass("frame-locked");
        this.that.repositionScreen(c), this.that.updateSettings()
    }, R.prototype.toggleCanvasZoom = function() {
        this.that.createCookie("pixil-canvas-zoom", this.that.settings.canvasZoomDefault), location.reload()
    }, R.prototype.toggleLighterTheme = function() {
        this.that.settings.theme.lighter = !this.that.settings.theme.lighter, this.that.changeTheme(), this.that.updateSettings()
    }, R.prototype.toggleMouseIcons = function() {
        this.that.settings.mouseIcons ? this.that.ToolController.switchCursor(this.that.tool) : a("#canvas-layers-container").css({
            cursor: "auto"
        }), this.updateSettingsCookie("mouseIcons", this.that.settings.mouseIcons)
    }, R.prototype.toggleDisableScroll = function() {
        this.that.createCookie("pixil-disable-scroll-zoom", this.that.settings.disableScrollZoom)
    }, R.prototype.toggleKeybinds = function() {
        this.that.createCookie("pixil-disable-keybinds", this.that.settings.disableKeybinds)
    }, R.prototype.toggleDithering = function(b) {
        this.that.settings.dithering ? (this.that.settings.dithering = !1, a(".dithering-toggle").prop("checked", !1).removeAttr("checked")) : (this.that.settings.dithering = !0, a(".dithering-toggle").prop("checked", !0))
    }, R.prototype.promptPattern = function() {
        var a = this,
            b = prompt("Background Generator", "");
        b && (this.that.runGenerator(b), this.that.LayerController.updateLayer(!1, function() {
            a.that.FrameController.updateFramePreview(), a.that.HistoryController.create(), a.that.ToolController.restore(), a.that.OnlineController.writeLayer()
        }), this.closePopup())
    }, R.prototype.loadDownloadSelect = function() {
        var b = this,
            c = 1e4;
        this.that.FrameController.frames.length > 1 && (c = 1600);
        var d = Math.max(this.that.width, this.that.height);
        this.maxDownloadSize = Math.floor(c / d), a("#download-range").attr("max", this.maxDownloadSize), this.maxDownloadSize < this.that.downloadSizes.frame && b.changeRation(!1, 1)
    }, R.prototype.loadSelectOnInput = function(a) {}, R.prototype.downloadSizeLimit = function(a) {
        return parseInt(a)
    }, R.prototype.changeRation = function(b, c) {
        this.that.downloadSizes.frame = this.downloadSizeLimit(c), this.that.downloadSizes.layer = this.downloadSizeLimit(c), this.that.downloadSizes.gif = this.downloadSizeLimit(c), c = parseInt(c), c > this.maxDownloadSize && (c = this.maxDownloadSize);
        var d = this.that.width * parseInt(c),
            e = this.that.height * parseInt(c);
        d = Math.round(d), e = Math.round(e), a(".download-width").text(d), a(".download-height").text(e), a(".ratio-download").val(c), a("#download-range").val(c)
    }, R.prototype.closePopup = function() {
        this.that.hidePopup()
    }, R.prototype.showPopup = function(a) {
        this.that.showPopup(a, this.html), this.that.PopupController.updateElements(), this.that.online.status && this.that.OnlineController.removeElements()
    }, R.prototype.showBackround = function(b) {
        this.that.backgroundImage.init = !0, a(".background-size-switch").removeClass("d-none"), this.that.tracing()
    }, R.prototype.changeBackgroundSize = function(b) {
        switch (b) {
            case "cover":
                a("#canvas_display").css({
                    backgroundSize: "cover"
                });
                break;
            case "contain":
                a("#canvas_display").css({
                    backgroundSize: "contain"
                });
                break;
            case "fit":
                a("#canvas_display").css({
                    backgroundSize: "100% 100%"
                })
        }
        this.that.backgroundImage.size = b
    }, R.prototype.loadBackground = function(a) {
        var b = this,
            c = document.getElementById("tracing-background");
        if (c.files && c.files[0]) {
            var d = new FileReader;
            d.onload = function(c) {
                b.that.loadImage(c.target.result, function(c) {
                    var d = c,
                        e = b.that.getAspectRatio(c.width, c.height, 600, 600);
                    b.that.createCanvas("extended", e.width, e.height, function() {
                        b.that.canvas.extended.putSimple(d, 0, 0, e.width, e.height), b.that.backgroundImage.image = b.that.canvas.extended.dataURL(), b.showBackround(a), b.that.canvas.extended.destroy()
                    })
                })
            }, d.readAsDataURL(c.files[0])
        }
    };
    var S = function(a) {
        this.that = a, this.currentImage = !1, this.imageData = !1, this.imageDataClone = !1, this.canRestore = !0
    };
    S.prototype.init = function() {
        this.listeners()
    }, S.prototype.listeners = function() {
        var b = this;
        a("#hue-changer").on("input", function() {
            var c = a(this).val();
            b.active(c)
        }), a("#hue-changer").on("mouseup", function() {
            b.restore()
        }), a("#hue-changer").bind("touchend", function() {
            b.restore()
        })
    }, S.prototype.active = function(b) {
        return this.that.LayerController.checkPreConditions() ? void(this.canRestore = !1) : (this.canRestore = !0, this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.imageData = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), this.imageDataClone = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), this.that.canvas.data["default"](), this.that.ToolController.restore()), a("#hue-update").text(b), void this.changeColor(b))
    }, S.prototype.changeColor = function(a) {
        for (var b, c, d, e, f, g = new Uint8ClampedArray(this.imageData.data), h = g, i = h.length, j = 0; j < i; j += 4) {
            b = h[j], c = h[j + 1], d = h[j + 2], e = this.that.RGBtoHSV(b, c, d);
            var k = 360 * e.h;
            k = parseInt(k) + parseInt(a), parseInt(k) > 360 && (k -= 360), parseInt(k) < 0 && (k = Math.abs(k)), e.h = k / 360, f = this.that.HSVtoRGB(e.h, e.s, e.v), h[j] = f.r, h[j + 1] = f.g, h[j + 2] = f.b
        }
        this.imageDataClone.data.set(g), this.that.canvas.layer.ctx.putImageData(this.imageDataClone, 0, 0), this.that.render(), g = null, h = null
    }, S.prototype.restore = function(b) {
        var c = this;
        a("#hue-update").text("0"), a("#hue-changer").val(0), this.currentImage = !1, this.imageData = !1, this.canRestore && (this.that.LayerController.updateLayer(), this.that.LayerController.updateLayer(!1, function() {
            c.that.FrameController.updateFramePreview(), c.that.HistoryController.create(), c.that.ToolController.restore(), c.that.OnlineController.writeLayer()
        }))
    };
    var T = function(a) {
        this.that = a, this.html = "", this.start = !1, this.filters = ["popular", "new", "yours", "emojis", "badges", "approve", "favorite", "private"], this.filter = "new", this.page = 1, this.search = "", this.processingNewStamp = !1, this.processingFetchStamp = !1
    };
    T.prototype.init = function() {
        this.that.isApp || (this.listerners(), this.html = a(".save-stamp").html(), a(".save-stamp").remove())
    }, T.prototype.listerners = function() {
        var b = this;
        a(document).keyup(function(a) {
            "Stamp" == b.that.tool && 27 === a.keyCode && b.closeStampContainer()
        }), a(".save-stamp-selection").click(function() {
            b.showPopup()
        }), a("#popup-container").on("submit", ".stamp-form-data", function(c) {
            c.preventDefault(), b.newStamp(a(this))
        }), a(".stamp-show-more").click(function() {
            b.getStamps(a(this).attr("data-type"))
        }), a(".stamp-filter-btn").click(function(c) {
            c.preventDefault(), b.selectFilter(a(this))
        }), a("#stamp-search-input").keyup(function(c) {
            13 == c.which && b.searchInput(a(this).val())
        }), a("#stamp-container").on("click", ".stamp-pre-image", function() {
            b.preRenderData(a(this))
        }), a("#stamp-container").on("click", ".delete-stamp-btn", function() {
            var c = a(this).attr("data-id");
            b["delete"](c)
        }), a("#stamp-container").on("click", ".approve-stamp-btn", function() {
            var c = a(this).attr("data-id");
            b.approve(c, a(this))
        }), a("#stamp-container").on("click", ".favorite-stamp-btn", function() {
            b.favoriteStamp(a(this))
        }), a("#stamp-tool").click(function() {
            b.showStampContainer()
        }), a("#tool-option-appended, #extra-panel-content").on("click", ".stamp-select", function() {
            b.showStampContainer()
        }), a(".close-stamps-container").click(function() {
            b.closeStampContainer()
        })
    }, T.prototype.scrollHide = function() {
        var b = a(".stamps-preview-wrapper").height(),
            c = a(".stamps-preview-wrapper").scrollTop(),
            d = a(".append-stamps-preview").position().top,
            e = c + b;
        a(".stamp-pre").addClass("hide-img"), a(".stamp-pre").each(function() {
            var b = a(this),
                f = b.position(),
                g = f.top - d,
                h = (f.top - d, b.height()),
                i = parseInt(g) + parseInt(h);
            g > c && g < e || i > c && i < e || g < c && i > e ? b.removeClass("hide-img") : b.addClass("hide-img")
        })
    }, T.prototype.renderData = function(a, b) {
        this.that.canvas.rendering.canvas.width = a.width, this.that.canvas.rendering.canvas.height = a.height, this.that.canvas.rendering.putSimple(a);
        var c = !!b && b.attr("data-resize"),
            d = a,
            e = this;
        "1" == c ? this.that.resizeImage(a.src, 4, function(a) {
            e.appendCopyData(a)
        }) : this.appendCopyData(d, !0)
    }, T.prototype.appendCopyData = function(a, b) {
        var c = this;
        this.that.stamps.data = a, this.that.SelectController.currentSelectImage = !1, b ? (this.that.SelectController.copySection(a), this.that.SelectController.cut_width = 0, this.that.SelectController.cut_height = 0, this.that.useSelectTool(this.that.isApp)) : a.onload = function() {
            c.that.SelectController.copySection(this), c.that.SelectController.cut_width = 0, c.that.SelectController.cut_height = 0, c.that.useSelectTool()
        }
    }, T.prototype.useSelectTool = function() {}, T.prototype.preRenderData = function(b, c) {
        if (this.that.online.status && this.that.LayerController.layers[this.that.LayerController.currentLayer].name != this.that.online.layer_id) return void this.that.showAlert(this.that.messages("online_layer"));
        if (this.that.LayerController.layers[this.that.LayerController.currentLayer].options.locked) return void this.that.showAlert(this.that.messages("layer_locked"));
        var d = c ? c.imageData : b.attr("data-image"),
            e = this.that.validateImageData(d, !0),
            f = this,
            g = "https://www.pixilart.com";
        this.debug && (g = ""), e ? (d = e, this.that.loadImage(d, function(a) {
            f.renderData(a, b)
        }), b && b.attr("data-id") && this.that.isAuth && a.ajax({
            type: "PUT",
            url: g + "/stamp/" + b.attr("data-id"),
            data: "_token=" + a("#_token").val()
        })) : console.info("Image is not valid.")
    }, T.prototype.searchInput = function(a) {
        this.search = a.trim();
        var b = this;
        b.page = 1, b.clearStampWrapper(), b.getStamps()
    }, T.prototype.selectFilter = function(b) {
        var c = b.attr("data-filter");
        if (c = c.trim().toLowerCase(), this.filters.indexOf(c) !== -1) {
            if (a(".stamp-filter-btn").removeClass("active"), b.addClass("active"), "favorite" == c && !this.that.isAuth || "yours" == c && !this.that.isAuth) return this.clearStampWrapper(), a(".stamp-show-more").hide(), a(".append-stamps-preview").html("<div style='color:white;text-align:center' class='mgbtm'>You need to be logged in.</div>");
            a(".stamp-show-more").show(), this.filter = c, this.page = 1, this.clearStampWrapper(), this.getStamps()
        }
    }, T.prototype.showStampContainer = function() {
        this.start || (this.start = !0, this.getStamps());
        var b = a("#drawing-canvas-conatiner"),
            c = 20,
            d = a("#drawing-tool-options"),
            e = d.length ? d.height() : 0,
            f = b.position(),
            g = f.left + c,
            h = f.top + c,
            i = b.width() - 2 * c,
            j = b.height() - 2 * c + e;
        a(".stamp-container").show().css({
            top: h,
            left: g,
            width: i,
            height: j
        }), this.that.isMobile && !this.that.isTablet
    }, T.prototype.hideStampContainer = function() {
        a(".stamp-container").hide()
    }, T.prototype.showShowMoreStampsButton = function() {
        a(".stamp-show-more").show()
    }, T.prototype.updateButtons = function() {
        a(".stamp-btn-next").show(), a(".stamp-btn-back-container").hide(), this.page >= 2 && a(".stamp-btn-back-container").show()
    }, T.prototype.hideNextButton = function() {
        a(".stamp-btn-next").hide()
    }, T.prototype.hideShowMoreStampsButton = function() {
        a(".stamp-show-more").hide()
    }, T.prototype.showPopup = function(b) {
        this.putRenderingCanvasData(function() {
            a("#popup-container .title-stamp").val("")
        })
    }, T.prototype.closePopup = function() {
        this.that.hidePopup()
    }, T.prototype.putRenderingCanvasData = function(b) {
        var c = this;
        if (this.that.isWindowsIE) {
            var d = this.that.canvas.rendering.image();
            this.that.sizeUp(d, 5, function(b) {
                a(".stamp-data-preview").attr("src", b.src)
            }), a(".hidden-base-image").val(d.src)
        } else this.that.getDrawnPixels(function(d, e, f, g, h, i, j) {
            if (!(e <= 1 || f <= 1)) {
                c.that.canvas.data.clear(), c.that.canvas.data.canvas.width = e, c.that.canvas.data.canvas.height = f, c.that.canvas.data.ctx.putImageData(d, -g, -h), b && c.that.showPopup("stamp", c.html);
                var k = c.that.canvas.data.image();
                k.onload = function() {
                    if (a("#popup-container .stamp-data-preview").attr("src", k.src), a("#popup-container .hidden-base-image").val(k.src), b) return b()
                }
            }
        }, "rendering")
    }, T.prototype.clearStampWrapper = function() {
        a(".append-stamps-preview").html("")
    }, T.prototype.showAppendLoader = function() {
        a(".loading-container").show()
    }, T.prototype.hideAppendLoader = function() {
        a(".loading-container").hide()
    }, T.prototype.closeStampContainer = function() {
        return "Stamp" != this.that.tool ? this.hideStampContainer() : void this.that.ToolController.selectTool(a("#pencil-tool"), "Pencil")
    }, T.prototype.appendStamps = function(b, c) {
        this.processingFetchStamp = !1;
        var d = this,
            e = "";
        a.each(b, function(a, b) {
            e += d.that.stampsTemplate(b, c)
        }), a(".append-stamps-preview").html(""), a(".append-stamps-preview").append(e)
    }, T.prototype.showError = function(b) {
        a("#error-stamp").show(), a("#error-stamp .error-message-stamp").text(b)
    }, T.prototype.hideError = function() {
        a("#error-stamp").hide(), a("#error-stamp .error-message-stamp").text("")
    }, T.prototype.favoriteStamp = function(b) {
        var c = b.attr("data-id"),
            d = this;
        if (b.hasClass("active") ? b.removeClass("active") : b.addClass("active"), !this.favoriteStampRequest) {
            this.favoriteStampRequest = !0;
            var e = "stamp_id=" + c;
            a.ajax({
                type: "POST",
                url: "/stamp/favorite/" + c,
                data: e,
                cache: !1,
                processData: !1,
                contentType: !1,
                headers: {
                    "X-CSRF-TOKEN": a('meta[name="csrf-token"]').attr("content")
                },
                success: function(a) {
                    d.favoriteStampRequest = !1
                },
                fail: function() {
                    d.favoriteStampRequest = !1
                },
                error: function() {
                    d.favoriteStampRequest = !1
                }
            })
        }
    }, T.prototype.getStamps = function(b) {
        "back" == b ? this.page-- : "next" == b && this.page++, this.page < 0 && (this.page = 0);
        var c = a(".append-stamps-preview .selectable-stamp:last .stamp-pre-image").attr("data-id"),
            d = a(".append-stamps-preview .selectable-stamp:last .stamp-pre-image").attr("data-favorite-id"),
            e = "search_term=" + this.search + "&type=" + this.filter + "&page=" + this.page + "&is_new=true&after_id=" + c + "&last_f_id=" + d,
            f = this;
        if (a(".append-stamps-preview").addClass("loading"), !this.processingFetchStamp) return this.processingFetchStamp = !0, this.showAppendLoader(), this.hideShowMoreStampsButton(), a.ajax({
            type: "GET",
            url: "/stamp",
            data: e,
            cache: !1,
            processData: !1,
            contentType: !1,
            success: function(b) {
                a(".append-stamps-preview").removeClass("loading"), f.appendStamps(b.data, b.permission), f.hideAppendLoader(), b.data.length >= 1 && f.updateButtons(), (!b.data.length || b.data.length < 30) && f.hideNextButton()
            },
            fail: function() {
                a(".append-stamps-preview").removeClass("loading"), a(".loading-container").html(f.that.getResponse("res-stamps-error"))
            },
            error: function() {
                a(".append-stamps-preview").removeClass("loading"), a(".loading-container").html(f.that.getResponse("res-stamps-error"))
            }
        }), !1
    }, T.prototype.newStamp = function(b) {
        var c = this,
            d = new FormData(b[0]),
            e = a(".hidden-base-image").val(),
            f = new Blob([e], {
                type: "text/plain"
            });
        return d.append("fname", "stamp.txt"), d.append("is_new", "1"), d.append("file", f), this.that.fileDrawing ? (this.that.FileController.showFileAlert(), !1) : this.that.validateImageData(e) && d && !this.processingNewStamp ? (this.hideError(), this.disableSubmit(), this.processingNewStamp = !0, a.ajax({
            type: "POST",
            url: "/stamp",
            data: d,
            cache: !1,
            processData: !1,
            contentType: !1,
            success: function(a) {
                c.successNewStamp()
            },
            fail: function(a) {
                c.finishNewStamp(), c.showError(a.responseJSON.message)
            },
            error: function(a) {
                c.finishNewStamp(), c.showError(a.responseJSON.message)
            }
        }), !1) : void 0
    }, T.prototype["delete"] = function(b, c) {
        var d = b,
            c = a("#_token").val(),
            e = "_token=" + c + "&delete_stamp=true";
        a(".stamp-id-" + d).hide(), a.ajax({
            type: "PUT",
            url: "/stamp/" + d,
            data: e,
            success: function(b) {
                a(".smp-" + d).hide()
            },
            fail: function() {
                a(".smp-" + d).show()
            },
            error: function() {
                a(".smp-" + d).show()
            }
        })
    }, T.prototype.approve = function(b, c) {
        var d = b,
            e = a("#_token").val(),
            f = "_token=" + e + "&approve_stamp=true";
        a.ajax({
            type: "GET",
            url: "/stamp/" + d + "/edit",
            data: f,
            success: function(a) {
                console.log(a), c.remove()
            },
            error: function() {
                alert("There was an error.")
            }
        })
    }, T.prototype.disableSubmit = function() {
        a(".stamp-submit-button").prop("disabled", !0)
    }, T.prototype.enableSubmit = function() {
        a(".stamp-submit-button").removeAttr("disabled")
    }, T.prototype.finishNewStamp = function() {
        this.processingNewStamp = !1, this.enableSubmit()
    }, T.prototype.successNewStamp = function() {
        this.processingNewStamp = !1, this.enableSubmit(), this.closePopup()
    };
    var U = function(a) {
        this.that = a, this.selectPopulate = 30
    };
    U.prototype.init = function() {
        this.listeners()
    }, U.prototype.listeners = function() {}, U.prototype.tab = function(a, b) {}, U.prototype.updateElements = function() {
        var b = this;
        a(".populate-numbers").each(function() {
            a(this).html("");
            for (var c = '<option value="1">Size</option>', d = 1; d < b.selectPopulate + 1; d++) {
                var e = b.that.width * d,
                    f = b.that.height * d;
                e = Math.round(e), f = Math.round(f), c = c + '<option value="' + d + '">' + e + "x" + f + "</option>"
            }
            a(this).append(c)
        })
    };
    var V = function(a) {
        this.that = a, this.gif = !1, this.callback = !1
    };
    V.prototype.init = function() {
        this.listeners()
    }, V.prototype.listeners = function() {}, V.prototype.finishedLoad = function() {
        this.that.canvas.rendering["default"](), this.callback ? (this.callback(), this.callback = !1) : this.that.ready()
    }, V.prototype.load = function(b, c) {
        a("#image-preset").attr("src", b);
        var d = new SuperGif({
                gif: a("#image-preset")[0]
            }),
            e = this;
        this.callback = !!c && c, d.load(function() {
            var a = d.get_current_frame(0).data,
                b = [];
            e.that.canvas.rendering.canvas.width = a.width, e.that.canvas.rendering.canvas.height = a.height, e.that.FrameController.frames = [];
            for (var c = 0; c < d.get_length(); c++) b.push(d.get_current_frame(c)), d.get_length() == b.length && e.processData(b)
        })
    }, V.prototype.loadAppDrawing = function() {
        var a = this,
            b = [],
            c = this.that.app.frames;
        this.that.FrameController.frames = [];
        for (var d = 0; d < c.length; d++) {
            var e = new Image;
            e.data_id = d, e.onload = function() {
                b.push({
                    delay: 10,
                    data: this,
                    data_id: this.data_id
                }), b.length == c.length && a.that.arrangeImages(b, function(b) {
                    a.processData(b, !0)
                })
            }, e.src = this.that.decodeImage(c[d])
        }
    }, V.prototype.processData = function(a, b) {
        for (var c = this, d = 100, e = null, f = !1, g = !0, h = [], i = 0; i < a.length; i++) {
            if (d = 10 * a[i].delay, e = a[i].data, "object" != typeof e) return;
            b ? (c.that.canvas.rendering.clear(), c.that.canvas.rendering.putImageData(e)) : c.that.canvas.rendering.ctx.putImageData(e, 0, 0, 0, 0, e.width, e.height), f = {
                image: c.that.canvas.rendering.dataURL(),
                speed: d
            }, c.that.resizeImage(f, c.that.edit.resize, function(b, d) {
                b.speed = d.speed, b.onload = function() {
                    h.push(i), g ? (c.that.FrameController["new"](!0, this.speed, b, !0, !0), g = !1) : c.that.FrameController["new"](!0, this.speed, b, !0), c.that.canvas.layer.putSimple(b), a.length == h.length && c.finishedLoad()
                }
            })
        }
    }, V.prototype.download = function(a, b, c) {
        var d = this;
        this.that.getDrawnPixels(function(e, f, g, h, i, j, k, l) {
            var m = l.length;
            d.getFrames(b, a, function(a) {
                var b = [],
                    e = !1;
                if (a.length >= 1) {
                    var f = 0,
                        g = function() {
                            var h = a[f],
                                i = new Image;
                            i.speed = h.speed, i.data_id = f, i.onload = function() {
                                b.push({
                                    src: this,
                                    speed: this.speed,
                                    data_id: this.data_id
                                }), b.length !== a.length || e ? (f++, g()) : d.that.arrangeImages(b, function(a) {
                                    d.useGif(a, c, m)
                                })
                            }, i.src = h.src
                        };
                    g()
                }
            })
        }, "layer", !0, !1, !1, !1, !0)
    }, V.prototype.getFrames = function(a, b, c) {
        var d = this,
            e = [];
        this.that.FrameController.flattenAll(a, 1, function(a) {
            var f = d.that.width * b,
                g = d.that.height * b,
                h = 0,
                i = function() {
                    var b = a[h],
                        j = new Image;
                    j.id = h, j.speed = b.speed, j.data_id = b.data_id, j.onload = function() {
                        return d.that.canvas.data.clear(), d.that.canvas.data.canvas.width = f, d.that.canvas.data.canvas.height = g, d.that.canvas.data.setSmoothing(), d.that.canvas.data.clear(), d.that.giftransparent && (d.that.canvas.data.ctx.fillStyle = "#FF0000", d.that.canvas.data.ctx.fillRect(0, 0, f, g)), d.that.canvas.data.putSimple(this, 0, 0, f, g), e.push({
                            src: d.that.canvas.data.dataURL(),
                            speed: this.speed,
                            data_id: this.data_id
                        }), e.length == a.length ? c(e) : (h++, void i())
                    }, j.src = b.src
                };
            i()
        })
    }, V.prototype.useGif = function(b, c, d) {
        var e = "/js/dist/gif.worker.js",
            f = 10,
            g = !1,
            h = null;
        d > 500 && (f = 5), d > 1e3 && (g = "FloydSteinberg-serpentine", f = 1), a(".gif-loader").show(), this.that.isApp && (e = "/static/js/gif.worker.js"), this.that.giftransparent && (h = "0xFF0000");
        var i = new GIF({
            workers: 2,
            quality: f,
            workerScript: e,
            dither: g,
            transparent: h
        });
        a.each(b, function(a, b) {
            i.addFrame(b.src, {
                delay: parseInt(b.speed)
            })
        }), i.on("progress", function(b) {
            a(".loading-percent-preview-gif, .gif-loading-percent").text(Math.ceil(100 * b) + "%"), a("#popup-container .download-btn").prop("disabled", !0)
        }), i.on("finished", function(b) {
            return a("#popup-container .download-btn").prop("disabled", !1), a(".gif-loader").hide(), c(b)
        }), i.render()
    };
    var W = function(a) {
        this.that = a, this.onNew = !1, this.importing = !1, this.resizeImport = !1, this.importExportSecretString = "p98kjasdnasd983/24kasdjasd", this.importExportrandomStringPlacement = "/sfR5H8Fkddasdmnacvx/", this.importExportIsPhotoUpload = "/8745jkhasdASD945kjknhj/"
    };
    W.prototype.init = function() {
        this.listeners()
    }, W.prototype.listeners = function() {
        var b = this;
        a("#popup-container, #toolbar").on("click", ".save-as", function() {
            b["export"]()
        }), a("#drawing-wrapper").on("click", ".open-pix-callout", function() {
            b.onNew = !0, b.importing = !1, b.open()
        }), a("#drawing-wrapper").on("click", "#import-gallery .a-base-thumb", function(c) {
            c.preventDefault();
            var d = a(this).attr("data-file");
            return b.importing = !0, b.fromGallery = !0, d ? void b.fromURL(d) : void console.log("No file found")
        }), a("#open-pix").click(function() {
            b.onNew = !1, b.open()
        }), a("#import-pixil").click(function() {
            b.importing = !0, b.open()
        }), a("#import-gallery").click(function() {
            b.that.showPopup("import")
        }), a("#file-open").change(function() {
            var c = a(this).prop("files");
            c && b.read(c)
        })
    }, W.prototype.open = function() {
        this.that.fileDrawing, a("#file-open")[0].click()
    }, W.prototype["export"] = function(a, b, c) {
        this.that.fileDrawing;
        var d = (this.that.FrameController.frames.length, this.that.FrameController.currentFrame),
            e = this.that.width,
            f = this.that.height,
            g = this.that.ColorController.colorPresets,
            h = this;
        if (this.that.isApp && !c) {
            if (!(e < 175)) return this.that.resizeImagetoWidth(this.that.canvas.display.dataURL(), 175, function(c, d, e) {
                h["export"](a, b, c)
            });
            c = this.that.canvas.display.dataURL()
        }
        this.that.startHistory(function(i) {
            var j = h.that.canvas.display.dataURL(),
                k = "";
            if (j.length > 120) {
                var l = j.substring(0, 50),
                    m = j.substring(50, j.length);
                j = l + h.importExportrandomStringPlacement, h.that.isExternal && (j += h.importExportIsPhotoUpload), j += m
            }
            h.that.isApp && (k = c);
            var n = {
                application: "pixil",
                type: ".pixil",
                version: h.that.version,
                website: h.that.website,
                author: "https://www.pixilart.com",
                contact: "support@pixilart.com",
                width: e,
                height: f,
                colors: g,
                colorSelected: h.that.ColorController.currentSelection,
                frames: i,
                currentFrame: d,
                speed: h.that.app.speed,
                name: h.that.drawingName ? h.that.drawingName : h.that.fileName,
                preview: j,
                previewApp: k,
                art_edit_id: 0,
                palette_id: h.that.palette_id,
                created_at: Date.now(),
                updated_at: Date.now()
            };
            if (h.that.settings.persLayers && (n.persLayers = !0), h.that.app.edit_id && (n.app_edit_id = h.that.app.edit_id), h.that.isExternal && (n.isExternal = !0), h.that.id && (n.id = h.that.id), h.that.edit.status && (n.edit = {
                    status: !0,
                    unqid: h.that.edit.unqid
                }), b && h.that.isApp) return b(n);
            var o = JSON.stringify(n);
            if (a) return o;
            if (o = h.that.replaceAll(o, ";", h.importExportSecretString), b) return b(o);
            var p = prompt("Filename", "");
            null != p && (h.that.downloadFile(p + ".pixil", o), h.that.clearAutoSave())
        }, !0)
    }, W.prototype.read = function(b) {
        var c = this,
            d = new FileReader,
            b = b[0];
        b && (d.readAsText(b, "UTF-8"), a("#file-open").val(""), d.onload = function(a) {
            var d = new Date(b.lastModified);
            c["import"](a.target.result, !1, d)
        }, d.onerror = function(a) {
            console.info("There was an error loading the file.")
        })
    }, W.prototype.fromURL = function(b, c, d) {
        var e = this;
        a.ajax({
            type: "GET",
            url: b,
            cache: !1,
            crossDomain: !0,
            processData: !1,
            contentType: !1,
            dataType: "text",
            headers: {
                accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function(a) {
                e["import"](a, !0, !1, c)
            },
            fail: function() {
                e.importing = !1, d && (e.that.getEditImage(), e.that.showTipStepperOrAds())
            },
            error: function() {
                e.importing = !1, d && (e.that.getEditImage(), e.that.showTipStepperOrAds())
            },
            timeout: 1e4
        })
    }, W.prototype["import"] = function(b, c, d, e) {
        var f = this,
            g = !1,
            h = !1;
        if (this.resizeImport = !1, c || this.onNew || this.importing || (g = confirm(f.that.getResponse("res-export-confirm"))), g || c || this.onNew || this.importing) {
            var i = b;
            if (b = this.that.replaceAll(b, this.importExportSecretString, ";"), b = this.that.replaceAll(b, this.importExportrandomStringPlacement, ""), i.indexOf(this.importExportIsPhotoUpload) > -1 && (this.that.FileController.hideFileElements(), b = this.that.replaceAll(b, this.importExportIsPhotoUpload, ""), h = !0, this.importing && !this.that.isExternal && (g = confirm(f.that.getResponse("res-export-confirm")), this.importing = !1, !g))) return;
            this.importing && this.that.isExternal && (h = !0);
            try {
                var j = JSON.parse(b)
            } catch (k) {
                return console.log(k), alert("Not a valid file type")
            }
            if ((!j.version || j.version && parseFloat(j.version) < 2.7 || !j.persLayers) && (this.that.settings.persLayers = !1), j.version < 1.9 && d && d.getFullYear() < 2020 || j.version >= 1.8 && i.indexOf(this.importExportSecretString) == -1 || j.version >= 2.1 && i.indexOf(this.importExportrandomStringPlacement) == -1) return alert(f.that.getResponse("res-export-tainted"));
            if (j.persLayers && (this.that.settings.persLayers = !0, this.that.SettingsController.togglePersLayers(!0)), this.importing && (this.that.settings.persLayers = !1), this.that.isExternal && this.that.SelectController.clearCopy(), h || this.that.FileController.showFileElements(), "object" == typeof j && "pixil" == j.application) {
                if (this.that.clickCount = !0, j.edit && j.edit.status && (this.that.edit.status = !0, this.that.edit.unqid = j.edit.unqid), this.importing || (this.that.width = j.width, this.that.height = j.height, this.that.getPixelRatio()), this.importing && this.that.width < j.width || this.importing && this.that.height < j.height) {
                    var l = confirm("Import is larger than current canvas size, resize canvas?");
                    l && (this.that.width = j.width, this.that.height = j.height, this.that.getPixelRatio(), this.resizeImport = !0)
                }
                j.palette_id && (this.that.palette_id = j.palette_id), this.that.resizeCanvases(), this.that.createChecker();
                var m = this.that.zoom.type;
                this.that.zoom_ratio = 1, this.that.zoom_step = 1, this.that.zoom = {
                    type: m,
                    left: 0,
                    top: 0,
                    ratio: 1,
                    pixel_size: 1
                }, this.that.getPixelRatio(), a("#canvas_grid_image").removeAttr("style"), this.that.createGrid(), this.that.ZoomController.reset(!0), this.that.TileController.reset(), this.that.mouse.resetLast();
                var n = [];
                a.each(this.that.ColorController.colorPresets, function(a, b) {
                    n.push(a)
                });
                var o = "default";
                this.importing || (this.that.ColorController.colorPresets = j.colors, j.colorSelected && (this.that.ColorController.currentSelection = j.colorSelected, o = j.colorSelected), this.that.ColorController.updateOptions()), a.each(j.colors, function(a, b) {
                    n.indexOf(a) == -1 && "default" == o && (o = a)
                }), this.importing || (this.that.ColorController.updateColors(o), this.that.HistoryController.undo = [], this.that.HistoryController.redo = [], this.that.LayerController.currentLayer = 0, this.that.FrameController.currentFrame = 0), this.that.loadHistoryData(j, function(a) {
                    f.loadFrames(a), f.importing = !1
                }), this.that.FileController.updateDimensions(), this.fromGallery && this.that.hidePopup(), this.fromGallery = !1, e || this.that.FileController.clearEdit(), setTimeout(function() {
                    f.that.LayerController.updateList()
                }, 100), e && e()
            }
            this.that.hidePopup()
        }
    }, W.prototype.loadAppFrames = function(b) {
        var d = this,
            e = b.length,
            f = 0;
        a.each(b, function(a, g) {
            var h = d.that.decodeImage(g.src);
            d.that.loadImage(h, function(g) {
                var i = new c(0, "Background - Frame" + a, g);
                i.init(), b[a].layers = [i], b[a].src = h, b[a].active = !0, b[a].speed = 100, f++, f == e && d.loadFrames(b)
            })
        })
    }, W.prototype.loadFrames = function(a) {
        if (this.importing) {
            if (this.resizeImport && this.that.FrameController.resizeFrames(), a.length > 1) {
                var b = this.that.FrameController.frames;
                a = b.concat(a), this.that.FrameController.frames = a
            } else this.that.FrameController.frames[this.that.FrameController.currentFrame] = a[0];
            return this.that.FrameController.updateList(), this.that.FrameController.select(this.that.FrameController.currentFrame), this.that.HistoryController.create(), void this.that.showAlert("Import complete", !1, "success")
        }
        this.that.FrameController.frames = a, this.that.FrameController.updateList(), this.that.canvas.rendering.clear(), this.that.updateDisplayCanvas(this.that.LayerController.layers, 0), this.that.render(), this.importing || (this.that.HistoryController.newCanvas(), this.that.FrameController.select(0)), this.that.app.isLoaded = !0, this.that.isApp && this.that.app.isGif && (this.that.canvas.rendering.clear(), this.that.canvas.display.clear(), this.that.FrameController.select(this.that.FrameController.frames.length - 1))
    };
    var X = function(a) {
        this.that = a, this.html = !1, this.ratioLimit = 12, this.importingPhoto = !1, this.newPerLayersDefault = !0, this["new"] = {
            width: 256,
            height: 144,
            default_width: 256,
            default_height: 144
        }
    };
    X.prototype.init = function() {
        this.listeners(), this.updateNew(this["new"].width, this["new"].height), this.html = a("#new-menu").html(), this.resizeHtml = a("#resize-menu").html(), a("#new-menu").remove(), a("#resize-menu").remove()
    }, X.prototype.listeners = function() {
        var b = this;
        a("#new-pix, .new-pix").click(function() {
            b.that.fileDrawing, b.showPopup("new", b.html)
        }), a("#resize-pix, .crop-canvas").click(function() {
            b.showPopup("resize", b.resizeHtml)
        }), a(".rename-image").click(function() {
            b.renameImage()
        }), a("#open-image").change(function(a) {
            b.readFile(a, b.importingPhoto)
        }), a("#import-image-toggle").click(function(c) {
            b.importingPhoto = !0, a("#open-image").trigger("click")
        }), a(document).on("click", ".new-pix-link", function() {
            b.showPopup()
        }), a(document).on("click", ".preset-select", function() {
            return a(".preset-select").removeClass("active"), a(this).addClass("active"), "#" == a(this).attr("data-width") || "#" == a(this).attr("data-height") ? b.randomSize() : (b.updateNew(a(this).attr("data-width"), a(this).attr("data-height")), void b.newer())
        }), a(document).on("click", ".open-external", function() {
            b.importingPhoto = !1, a("#open-image").trigger("click")
        }), a(document).on("blur", ".new-width", function(c) {
            c.preventDefault(), b.updateNew(a(this).val(), b["new"].height)
        }), a(document).on("blur", ".new-height", function(c) {
            c.preventDefault(), b.updateNew(b["new"].width, a(this).val())
        }), a(document).on("click", ".new-drawing-a", function(c) {
            b.newPerLayersDefault = a("#pers-toggle-def").is(":checked"), b.newer()
        }), a("#popup-container").on("click", ".resize-drawing-submit", function(a) {
            b.checkResize()
        }), a("#popup-container").on("click", ".anchor-sets", function(c) {
            b.changeAnchor(a(this).attr("data-set"), !0)
        }), a("#popup-container").on("click", ".crop-resize-toggle", function(a) {
            b.changeCropResize()
        })
    }, X.prototype.importPhotoFromUrl = function(a) {
        var b = this;
        this.that.PreviewController.showLoading(), this.that.loadImage(a, function(c) {
            b.loadFile(c, a)
        })
    }, X.prototype.readFile = function(a, b, c) {
        var d = this,
            e = new FileReader;
        c = c ? c : a.target.files[0], e.onload = function(a) {
            d.that.loadImage(a.target.result, function(a) {
                d.that.settings.persLayers = !1, b ? d.importPhoto(a) : d.loadFile(a, c.name)
            })
        }, e.readAsDataURL(c)
    }, X.prototype.resizeFile = function(a, b, c, d, e, f) {
        var g = a,
            h = b;
        if (c = c ? c : this.that.maxWidth, d = d ? d : this.that.maxHeight, g > c || h > d)
            if (a > b && !e || a > b && e && this.that.width <= this.that.height) {
                var i = b / a;
                g = c, h = c * i
            } else {
                var i = a / b;
                g = d * i, h = d
            } return [Math.round(g), Math.round(h)]
    }, X.prototype.importPhoto = function(a) {
        if (this.that.isExternal) {
            this.that.loading = !0;
            var b = this,
                c = this.resizeFile(a.width, a.height, this.that.width, this.that.height, !0),
                d = c[0],
                e = c[1],
                f = Math.round(this.that.width / 2 - d / 2),
                g = Math.round(this.that.height / 2 - e / 2);
            this.that.canvas.data.clear(), this.that.canvas.data.ctx.drawImage(a, f, g, d, e);
            var h = this.that.canvas.data.dataURL();
            this.that.loadImage(h, function(a) {
                b.that.LayerController["import"](a), b.that.loading = !1
            })
        }
    }, X.prototype.loadFile = function(a, b) {
        var c = this,
            d = this.resizeFile(a.width, a.height);
        this["new"].width = d[0], this["new"].height = d[1], this.that.getPixelRatio(), this.newer() && (this.that.settings.persLayers = !1, this.that.loading = !0, this.hideFileElements(), "gif" == this.that.fileExtension(b) ? (this.that.edit.resize = 1, this.that.PreviewController.showLoading(), this.that.GifController.load(a.src, function() {
            c.that.PreviewController.hideLoading(), c.loadFileData(a), c.that.settings.persLayers = !0
        })) : this.loadFileData(a))
    }, X.prototype.loadFileData = function(b) {
        this.that.ToolController.tool.imageLoaded = !1, this.that.ToolController.tool.currentImage = !1, this.that.canvas.layer.putSimple(b, 0, 0, this["new"].width, this["new"].height), this.that.canvas.rendering.putSimple(b, 0, 0, this["new"].width, this["new"].height), this.that.updateDisplayCanvas(this.that.LayerController.layers, 0), this.that.PreviewController.close(), this.that.FrameController.updateFramePreview(0), this.that.HistoryController.newCanvas(), this.that.render(), this.that.loading = !1, this.that.ToolController.off(), this.that.ToolController.selectTool(a("#pencil-tool"), "Pencil", !0)
    }, X.prototype.showFileAlert = function(a) {
        var b = a ? a : this.that.getResponse("res-file-alert");
        alert(b)
    }, X.prototype.hideFileElements = function() {
        this.that.debug, this.that.fileDrawing = !0, this.that.autosave.status = !1, this.that.isExternal = !0, this.that.SubmitController.hideSubmit(), this.that.SelectController.clearCopy(), a("#import-image-toggle").removeClass("d-none")
    }, X.prototype.showFileElements = function() {
        this.that.fileDrawing = !1, this.that.isExternal = !1, this.that.SubmitController.showSubmit(), a("#import-image-toggle").addClass("d-none")
    }, X.prototype.restoreNoFile = function() {
        a("#save, #open-pix").show(), this.that.SubmitController.showSubmit()
    }, X.prototype.reloadPage = function() {
        location.reload()
    }, X.prototype.randomSize = function() {
        for (var a = [32, 64, 50, 100, 120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400, 420, 450, 480, 500], b = !0, c = 0, d = 1e3; b;) {
            var e = a[Math.floor(Math.random() * a.length)],
                f = a[Math.floor(Math.random() * a.length)];
            if (this.checkRatio(e, f, 40) || (b = !1, this.updateNew(e, f), this.newer()), c++, c > d) {
                this.error(this.that.getResponse("res-file-random"));
                break
            }
        }
    }, X.prototype.checkResize = function(b, c) {
        this["new"].width = b ? b : a(".new-width").val(), this["new"].height = c ? c : a(".new-height").val(), this.resize(!0, this["new"].width, this["new"].height, !1)
    }, X.prototype.resize = function(a, b, c, d) {
        var e = this;
        return b == this.that.width && c == this.that.height ? this.hidePopup() : (this.that.loading = !0, b = b ? b : this["new"].width, c = c ? c : this["new"].height, void this.that.cropResize(b, c, function() {
            if (e.that.width = b, e.that.height = c, e.that.getPixelRatio(), e.that.resizeCanvases(!1, !1, !0), e.that.checker.data = !1, e.that.createGrid(), e.that.showChecker(!0), e.that.ZoomController.reset(!0), e.that.TileController.reset(), e.that.mouse.resetLast(), e.that.PreviewController.reset(), e.updateDimensions(), a) {
                for (var f = e.that.FrameController.frames, g = 0; g < f.length; g++) {
                    var h = f[g];
                    h.width = e.that.width, h.height = e.that.height
                }
                e.that.HistoryController.create(), console.log("history created")
            }
            if (e.that.FrameController.select(e.that.FrameController.currentFrame), e.that.render(), e.hidePopup(), e.that.loading = !0, d) return d()
        }))
    }, X.prototype.renameImage = function() {
        var a = prompt("Rename Image", this.that.fileName);
        null != a && (this.that.fileName = a)
    }, X.prototype.updateNew = function(b, c) {
        a(".preset-select").removeClass("active"), b = parseInt(b), c = parseInt(c), (c <= 0 || c > this.that.maxHeight) && (c = this.that.height), (b <= 0 || b > this.that.maxWidth) && (b = this.that.height), this["new"].width = b, this["new"].height = c, a(".new-width").val(this["new"].width), a(".new-height").val(this["new"].height)
    }, X.prototype.showPopup = function(b, c) {
        c = c ? c : this.html, b = b ? b : "new", this.clearError(), this.that.showPopup(b, c), this.updateNew(this.that.width, this.that.height), this.changeAnchor(this.that.settings.crop.anchor), this.that.settings.crop.resize && (a(".crop-resize-toggle").prop("checked", !0), a("#anchor-crop").addClass("disabled"))
    }, X.prototype.changeCropResize = function(b) {
        this.that.settings.crop.resize = !this.that.settings.crop.resize, (b || b === !1) && (this.that.settings.crop.resize = b), this.that.settings.crop.resize ? a("#anchor-crop").addClass("disabled") : a("#anchor-crop").removeClass("disabled")
    }, X.prototype.changeAnchor = function(b, c) {
        this.that.settings.crop.resize || (a("#anchor-crop .anchor-sets").removeClass("active"), a("#anchor-crop .anchor-" + b).addClass("active"), c && (this.that.settings.crop.anchor = b))
    }, X.prototype.hidePopup = function() {
        this.that.hidePopup()
    }, X.prototype.checkRatio = function(a, b, c) {
        var d = 0;
        a = a ? a : this["new"].width, b = b ? b : this["new"].height;
        var e = c ? c : this.ratioLimit;
        return d = a > b ? b / a : a / b, d = 100 * d, d < e
    }, X.prototype.error = function(b) {
        a("#error-new").slideDown(250), a("#error-resizing").slideDown(250), b && a(".error-message-file").text(b)
    }, X.prototype.clearError = function() {
        a("#error-new").hide(), a("#error-resizing").hide()
    }, X.prototype.appClear = function(a) {
        var b = this;
        this.that.ons.notification.confirm("Are you sure?").then(function(c) {
            c && (b.newer(!0, !0), b.that.newDrawing(a), b.that.updateAppFrames())
        })
    }, X.prototype.clearEdit = function() {
        this.that.edit.title = "", this.that.edit.description = ""
    }, X.prototype.clearNew = function() {
        var a = confirm(this.that.getResponse("res-file-confirm"));
        if (a) {
            this["new"].width = this.that.width, this["new"].height = this.that.height, this.that.resizeCanvases(), this.that.LayerController.currentLayer = 0, this.that.FrameController.currentFrame = 0, this.that.LayerController.layers = [], this.that.FrameController.frames = [];
            var b = new c(0, "Background");
            b.init(), this.that.FrameController["new"](!0), this.that.LayerController.frame = this.that.FrameController.frame(), this.that.LayerController.layers = this.that.LayerController.frame.layers, this.that.LayerController.addLayer(b), this.that.FrameController.select(0), this.that.FrameController.updateList(), this.that.ZoomController.reset(!0), this.that.TileController.reset(), this.that.mouse.resetLast(), this.that.HistoryController.create(), this.that.updateData()
        }
    }, X.prototype.newer = function(b, d) {
        var e;
        this.that.newShow || this.that.isApp || (e = confirm(this.that.getResponse("res-file-confirm")));
        if (this.clearError(), e || this.that.newShow || d) {
            this.that.newShow = !1, b && (this["new"].width = this.that.width, this["new"].height = this.that.height), this.checkRatio() && !this.that.isApp, this.that.isExternal && this.that.SelectController.clearCopy(), this.that.FileController.showFileElements(), this.that.edit.unqid = !1, this.that.edit.status = !1, this.that.SubmitController.defaultSubmitForm(), this.that.width = this["new"].width, this.that.height = this["new"].height, this.that.getPixelRatio(), this.that.resizeCanvases(), this.that.checker.data = !1, this.that.grid.data = !1, this.that.grid.status = !1, this.that.toggleGridIcon(), this.that.createGrid(), this.that.showChecker(!0), this.that.LayerController.currentLayer = 0, this.that.FrameController.currentFrame = 0, this.that.LayerController.layers = [], this.that.FrameController.frames = [];
            var f = new c(0, "Background");
            f.init(), this.that.FrameController["new"](!0), this.that.LayerController.frame = this.that.FrameController.frame(), this.that.LayerController.layers = this.that.LayerController.frame.layers, this.that.LayerController.addLayer(f), this.that.HistoryController.undo = [], this.that.HistoryController.redo = [], this.that.FrameController.select(0), this.that.FrameController.updateList(), this.that.HistoryController.newCanvas();
            this.that.zoom.type;
            if (this.that.progress.images = [], this.that.ZoomController.reset(!0), this.that.TileController.reset(), this.that.mouse.resetLast(), this.that.settings.persLayers = this.newPerLayersDefault, this.that.PreviewController.reset(), this.updateDimensions(), this.that.render(), this.clearEdit(), a(".has-colors").length) {
                var g = a(".has-colors").find(".use-palette");
                g && (this.that.isMobile && a("#colors-bar-mobile").html(""), this.that.ColorController.usePalette(g, !0))
            }
            return this.hidePopup(), this.that.isApp && this.that.updateData(), !0
        }
        return !1
    }, X.prototype.updateText = function() {
        a("#canvas-width, #canvas-width-sidebar").text(Math.round(this.that.width)), a("#canvas-height, #canvas-height-sidebar").text(Math.round(this.that.height))
    }, X.prototype.updateDimensions = function() {
        var b = a("#drawing-canvas-conatiner"),
            c = 10,
            d = b.offset(),
            e = (b.height(), d.top + c),
            f = a("#frames-placement").height() + c,
            g = a("#left-sidebar").width() + c,
            h = 1;
        this.that.isIpad && (h = 0), a("#canvas-size-details").css({
            position: "absolute",
            bottom: f,
            left: g,
            zIndex: h
        }), a("#canvas-size-pos").css({
            position: "fixed",
            top: e,
            left: g,
            zIndex: h
        }), this.updateText()
    };
    var Y = function(a) {
        this.that = a, this.is_gif = !1, this.htmlLoading = "", this.submitted = !1, this.saveImage = !1, this.defaultUploadButtonText = '<i class="fa fa-star fa-small fa-fw" aria-hidden="true"></i> Save Drawing', this.defaultUpdateButtonText = '<i class="fa fa-floppy-o fa-small fa-fw" aria-hidden="true"></i> Update', this.defaultNewButtonText = '<i class="fa fa-star fa-small fa-fw" aria-hidden="true"></i> New', this.loadingText = "Loading..", this.url = "", this.errorTimer, this.doTimeout = !0, this.timeoutTimer = 3e5, this.gifRatio = 1, this.photo_blob = !1, this.pixilFile = !1
    };
    Y.prototype.init = function() {
        this.listerners(), this.htmlSmall = a("#submit-small"), a("#submit-small").remove(), this.htmlLoading = a("#submit-loading"), a("#submit-loading").remove()
    }, Y.prototype.hideSubmit = function() {
        this.that.isAuth || a(".submit-drawing").hide()
    }, Y.prototype.hideArtOptions = function() {
        a(".art-options-submit").addClass("d-none"), a(".photos-info").removeClass("d-none"), a(".submit-details").addClass("full")
    }, Y.prototype.showSubmit = function() {
        a(".submit-drawing").show()
    }, Y.prototype.defaultSubmitForm = function() {
        a(".art-unqid-set").length >= 1 && a(".art-unqid-set").remove(), a(".save-edit-btn").length >= 1 && a(".save-edit-btn").remove(), this.that.edit.title = "", this.that.edit.description = "", a(".submit-new-drawing").removeClass("upload-edit-btn"), a(".title-drawing").val(""), a(".desc-art").val("")
    }, Y.prototype.listerners = function() {
        var b = this,
            c = "#popup-container";
        a(document).on("click", ".submit-drawing", function() {
            b.that.fileDrawing, b.validateSize() && b.checkFileSize(function() {
                "Text" == b.that.tool && b.that.ToolController.selectTool(a("#pencil-tool"), "Pencil", !0), b.that.ToolController.restore(), a("#submit_title").val(b.that.edit.title), a("#submit_description").val(b.that.edit.description), b.that.showPopup("submit", a("#submit-drawing").html()), b.setInputValue(), b.enableUploadReplay()
            })
        }), a(c).on("mousedown", ".save-edit-btn", function() {
            b.saveImage = !0
        }), a(c).on("mousedown", ".submit-new-drawing", function() {
            b.saveImage = !1
        }), a(c).on("submit", ".submit-drawing-form", function(c) {
            c.preventDefault(), b.processSubmit(a(this))
        }), a(c).on("change", ".progress-check-toggle", function() {
            var c = a(this);
            c.prop("checked") ? b.that.createCookie("pixil-replay", !0) : b.that.createCookie("pixil-replay", !1)
        }), a("#popup-container").on("click", ".go-to-image-btn", function() {
            window.location.href = b.url
        })
    }, Y.prototype.enableUploadReplay = function() {
        var b = this.that.readCookie("pixil-replay"),
            c = !1;
        (this.that.isTablet || this.that.isIpad || !this.that.isAuth) && a("#upload-replay-toggle").hide(), "string" == typeof b && "true" == b && 1 == this.that.FrameController.frames.length && (c = !0), a("#progress-check").prop("checked", c)
    }, Y.prototype.validateSize = function() {
        return !(this.that.width < this.that.minWidth || this.that.height < this.that.minHeight) || (this.that.showPopup("download", " " + a("#download-information").html()), this.that.PopupController.updateElements(), !1)
    }, Y.prototype.processSubmit = function(b, c) {
        var d = this,
            e = this.that.getScaleUpRatio(),
            f = this.that.giftransparent;
        if (this.that.FileController.checkRatio() && !this.that.isApp) return void this.error(this.that.getResponse("res-submit-error"));
        this.disableSubmit(), this.that.mouse.closeHook = !1;
        var g = {};
        a.each(b.serializeArray(), function(a, b) {
            g[b.name] = b.value
        });
        var h = 1 == g.upload_progress;
        return this.that.isExternal && !c ? (e = 1, this.that.FrameController.download(0, !1, e, !0, function(a) {
            d.photo_blob = a, d.processSubmit(b, !0)
        })) : (this.that.isAuth || (h = !1), void this.that.downloadProgressGif(!1, !1, function(c) {
            d.that.isExternal && (e = 1), d.that.FrameController.frames.length > 1 ? (d.is_gif = !0, d.that.giftransparent = !1, a(".submit-drawing-butn").html(d.loadingText + " " + d.that.getResponse("res-submit-animation-creating") + ' <span class="gif-loading-percent"></span>'), d.that.GifController.download(e, e, function(c) {
                a(".submit-drawing-butn").text(d.loadingText + " " + d.that.getResponse("res-submit-animation-uploading")), d.that.giftransparent = f, d.submitDrawing(b, c, !1)
            })) : d.submitDrawing(b, !1, c)
        }, h))
    }, Y.prototype.setInputValue = function() {
        var b = this.that.FrameController.frame(0),
            c = this.that.LayerController.flatten(b.layers);
        a(".frame-0").val(c), this.getColorTree(c)
    }, Y.prototype.checkFileSize = function(b) {
        var c = this;
        return !this.that.isExternal && this.that.isAuth && (this.that.LayerController.layers.length > 1 || this.that.FrameController.frames.length > 1) && (this.pixilFile = !1, this.that.ExportImportController["export"](!1, function(d) {
            c.that.getBinarySize(d, !0, 1);
            return c.that.getBinarySize(d) < 15521440 ? c.pixilFile = d : a("#file-size-too-large").removeClass("d-none"), b()
        })), b()
    }, Y.prototype.submitDrawing = function(b, c, d) {
        if (!this.that.isApp) {
            var e = this,
                f = document.getElementById("submit-form"),
                g = new FormData(f),
                h = this.that.backgroundImage.image,
                i = "/draw/new";
            if (g.append("app_set", "true"), this.that.palette_id && g.append("palette_id", this.that.palette_id), this.pixilFile && g.append("px_f", this.pixilFile), !a("#submit-art-unqid").length && this.that.edit.status && g.append("unqid", this.that.edit.unqid), this.hideError(), this.that.clickCount || e.enableSubmit(), d && this.that.isAuth && (g.append("has_progress", "true"), g.append("progress_name", "pixil-progress.gif"), g.append("progress_blob", d)), c) {
                if (g.append("is_gif", "true"), g.append("fname", "pixil-image.gif"), g.append("gif_blob", c), c.size > 4e7) return e.enableSubmit(), void e.showError(e.that.getResponse("res-submit-large-error"));
                e.is_gif = !0
            }
            if (this.saveImage && g.append("save_image", "true"), "" != h.trim() && h.toLowerCase().match(/\.(jpg|png|gif|bmp)/g) && g.append("is_traced", "true"), a("#challenge-id").length && g.append("challenge_id", a("#challenge-id").attr("data-value")), a("#drawing-wrapper").attr("data-rid") && g.append("r_f", a("#drawing-wrapper").attr("data-rid")), a(".submit-drawing-butn").html(e.that.getResponse("res-submit-uploading")), this.that.isExternal && this.that.isAuth && (i = "/draw/photo", g.append("post_comment", a("#submit_title").val()), g.append("post_desc", a("#submit_description").val()), c ? (g.append("is_gif", 1), g.append("photo", c)) : (g.append("base_image", 1), g.append("base_src", this.photo_blob))), !this.submitted && g) {
                if (this.submitted = !0, this.hideError(), this.that.validateImageData(a(".frame-0").val())) return a.ajax({
                    type: "POST",
                    url: i,
                    data: g,
                    cache: !1,
                    processData: !1,
                    contentType: !1,
                    timeout: e.timeoutTimer,
                    success: function(b) {
                        if ("object" == typeof b && b.url) {
                            if (a(window).unbind("beforeunload"), !e.that.isAuth) {
                                var c = e.that.getCookie("anon_ids");
                                c.length || (c = []), c.push(b.art_id), e.that.createCookie("anon_ids", c, 7, !0)
                            }
                            e.that.clearAutoSave(), e.showLink(b.url, b);
                            try {
                                e.download()
                            } catch (d) {
                                console.log(d)
                            }
                        }
                    },
                    fail: function(a) {
                        JSON.parse(a.responseText);
                        e.error(e.that.getResponse("res-submit-error-server"))
                    },
                    error: function(a, b, c) {
                        if (e.error(e.that.getResponse("res-submit-error-error")), "timeout" === a.statusText) e.error(e.that.getResponse("res-submit-error-timeout"));
                        else {
                            var d = JSON.parse(a.responseText);
                            e.error(d.message)
                        }
                    },
                    timeout: 18e4
                }), !1;
                e.error(e.that.getResponse("res-submit-error-invalid"))
            }
        }
    }, Y.prototype.error = function(a) {
        this.enableSubmit(), this.showError(a), this.updateBtns()
    }, Y.prototype.updateBtns = function() {
        a(".submit-new").html(this.defaultUploadButtonText), a(".submit-new-btn").html(this.defaultNewButtonText), a(".submit-update-btn").html(this.defaultUpdateButtonText)
    }, Y.prototype.showLink = function(b, c) {
        this.that.ads.status || (window.location.href = b), this.that.hidePopup(), this.that.showPopup("getting-link", this.htmlLoading, !0, !0, !0), this.url = b;
        Math.floor(2 * Math.random());
        try {
            this.appendAd()
        } catch (d) {
            console.log("There was an error getting the ad.", d)
        }
        setTimeout(function() {
            a("#pre-getting-text").hide(), a("#go-to-image-btn").addClass("active")
        }, 3500)
    }, Y.prototype.appendAd = function() {
        this.that.linkLoadingAd()
    }, Y.prototype.shopAd = function(b, c, d) {
        function e(c) {
            var d = "";
            return a.each(c, function(a, c) {
                c && (d += "<a href='/shop/custom/" + b + "' class='slide-slot'><div class='product-card-wrap'><div class='product-image-render'><canvas class='render_shop_canvas image-popup-image' id='product_" + c.id + "_img' width='100%' height='100%' data-startImage='" + c.image_url + "' data-topImage='" + c.above_image_url + "' data-cords='" + c.cords + "' data-moveable='" + c.is_moveable + "' data-resizeable='" + c.is_resizeable + "' data-constraints='" + c.use_constraints + "' data-fullsize='" + c.use_fullsize + "' data-crop='" + c.use_crop + "'></canvas><img src='" + c.image_url + "' id='product_image_" + c.id + "' width='100%'></div></div></a>")
            }), d
        }

        function f() {
            return ""
        }
        var g = '<div class="shop-product-placement mt-3">' + f(b) + '<div class="rotate-slide-wrapper">' + e(c) + '</div><a href="/shop/custom/' + b + '?ref=drawing-page" style="color: #000; text-align: center; font-size: 16px; line-height: normal;"><div style=" font-weight: bold; margin-bottom: 5px; font-size: 22px;">' + this.that.getResponse("res-submit-shop-header") + "</div>" + this.that.getResponse("res-submit-shop-desc") + "</a></div>";
        a("#da-text").addClass("product hide-mobile"), a("#da-text").html(""), a("#da-link-append").html(g), this.loadPixilShop(d)
    }, Y.prototype.loadPixilShop = function(b) {
        function c() {
            for (var a = 0; a < e.length; a++) {
                var b = e[a],
                    c = document.getElementById(b.id),
                    f = c.getContext("2d"),
                    g = {
                        resizeable: b.resizeable,
                        moveable: b.moveable,
                        constraints: b.constraints,
                        fullsize: b.fullsize,
                        use_crop: b.use_crop
                    },
                    h = new product(c, f, b.startImage, d, b.topImage, b.cords, g);
                h.start()
            }
        }
        var d = b,
            e = [];
        a(".image-popup-image").each(function() {
            var b = {
                id: a(this).attr("id"),
                startImage: a(this).attr("data-startImage"),
                moveable: !1,
                resizeable: !1,
                constraints: !1,
                cords: a(this).attr("data-cords"),
                topImage: a(this).attr("data-topImage"),
                fullsize: a(this).attr("data-fullsize"),
                use_crop: a(this).attr("data-crop")
            };
            e.push(b), e.length == a(".image-popup-image").length && c()
        });
        var f = 0,
            g = 0,
            h = 0,
            i = function() {
                f = a(".slide-slot").length;
                var b = new Image;
                b.onload = function() {
                    a(".rotate-slide-wrapper").width(a(".slide-slot").width()).height(a(".slide-slot").height()), g = a(".slide-slot").width(), j()
                }, b.src = a(".rotate-slide-wrapper .slide-slot:first img").attr("src")
            },
            j = function() {
                k(), window.timer = setTimeout(function() {
                    j()
                }, 2500)
            },
            k = function() {
                var b = h * g;
                h++, h == f && (h = 0), a(".rotate-slide-wrapper").animate({
                    scrollLeft: b
                }, 50)
            };
        i()
    }, Y.prototype.showError = function(b) {
        this.hideError(), a("#error-submitting").show(), a("#error-submitting .error-message-submit").text(b)
    }, Y.prototype.hideError = function() {
        a("#error-submitting").hide(), a("#error-submitting .error-message-submit").text("")
    }, Y.prototype.disableSubmit = function() {
        a(".save-edit-btn").length >= 1 && a(".save-edit-btn").hide(), a("#popup-container .submit-drawing-butn").text(this.loadingText).prop("disabled", !0)
    }, Y.prototype.enableSubmit = function() {
        this.submitted = !1, a(".save-edit-btn").length >= 1 && a(".save-edit-btn").show(), this.updateBtns(), a(".submit-drawing-butn").removeAttr("disabled")
    }, Y.prototype.getTitle = function(b) {
        var c = a(".drawing-title-submit").val();
        return c = c.replace(/\s+/g, "-").toLowerCase(), c = "" == c.trim() ? "pixilart-drawing." + b : c + "-pixilart." + b
    }, Y.prototype.download = function() {
        if (!(this.that.settings.disableDownloadSubmit || this.that.isMobile || this.that.isIpad)) {
            var b = this.that.FrameController.frames;
            if (this.that.downloadSizes.frame = 1, this.that.downloadSizes.gif = 1, b.length > 1) {
                var c = this.getTitle("gif");
                this.that.GifController.download(1, 1, function(b) {
                    var d = URL.createObjectURL(b);
                    a("#dowmnload-a").attr("href", d), a("#dowmnload-a").attr("download", c), a("#dowmnload-a")[0].click()
                })
            } else {
                var c = this.getTitle("png");
                this.that.FrameController.download(0, c)
            }
        }
    }, Y.prototype.getColorTree = function(a) {
        this.that.canvas.data.clear();
        var b = (new Image, "{image:true,data:set,method:upload,token:__this}");
        return b
    }, Y.prototype.showShopPanel = function() {
        var a = JSON.parse('{"status":"success","error":false,"url":"/art/sfda-8bac0535dce94fc","data":[{"id":2,"image_url":"/images/shop/product/12/default.png","above_image_url":"","cords":"{"x":0.302,"y":0.219,"w":0.392,"h":0.483}","is_moveable":1,"is_resizeable":1,"use_constraints":0,"use_fullsize":"0","use_crop":1,"name":"Unisex Gildan Softstyle T-Shirt","url":"/shop/product/unisex-gildan-softstyle-t-shirt-2"},null,{"id":42,"image_url":"/images/shop/product/172/12x16.png","above_image_url":"/images/shop/product/172/12x16.png","cords":"{"x":0.2730138883590698,"y":0.19901388835906983,"w":0.456,"h":0.604} ","is_moveable":1,"is_resizeable":1,"use_constraints":0,"use_fullsize":"1","use_crop":0,"name":"Premium Luster Photo Paper Framed Poster","url":"/shop/product/premium-luster-photo-paper-framed-poster-42"},{"id":28,"image_url":"/images/shop/product/19/preview.png","above_image_url":"/images/shop/product/19/preview.png","cords":"{"x":0.25301388835906985,"y":0.2800138883590698,"w":0.451,"h":0.549}","is_moveable":1,"is_resizeable":1,"use_constraints":0,"use_fullsize":"1","use_crop":0,"name":"White Glossy Mug","url":"/shop/product/white-glossy-mug-28"},{"id":66,"image_url":"/images/shop/product/420/preview.png","above_image_url":"/images/shop/product/420/preview.png","cords":"{"x":0.15257352941176472,"y":0.25919117647058826,"w":0.7279411764705882,"h":0.7279411764705882}","is_moveable":1,"is_resizeable":1,"use_constraints":0,"use_fullsize":"1","use_crop":0,"name":"All-Over Neck Gaiter","url":"/shop/product/all-over-neck-gaiter-66"},{"id":35,"image_url":"/images/shop/product/216/preview.png","above_image_url":"/images/shop/product/216/preview.png","cords":"{"x":0.3200138883590698,"y":0.12201388835906983,"w":0.362,"h":0.7536518771331058} ","is_moveable":1,"is_resizeable":1,"use_constraints":0,"use_fullsize":"1","use_crop":0,"name":"iPhone 7,8/7,8 Plus, X Case","url":"/shop/product/iphone-7878-plus-x-case-35"}],"art_id":"8bac0535dce94fc","art_url":"/images/art/8bac0535dce94fc.png?v=1628147936","art_main_id":320586}');
        this.showLink("#", a)
    };
    var Z = function(a) {
        this.that = a, this.html = ""
    };
    Z.prototype.init = function() {
        this.listeners(), this.html = a("#info-container").html(), a("#info-container").remove(), this.html_about = a("#about-information").html(), a("#about-information").remove(), this.html_mobile = a("#mobile-information").html(), a("#mobile-information").remove()
    }, Z.prototype.listeners = function() {
        var b = this;
        a(".show-information").click(function() {
            b.that.showPopup("info", b.html), b.that.ShortcutController.appendKeys()
        }), a(".mobile-information").click(function() {
            b.that.showPopup("mobile", b.html_mobile)
        }), a(".about-information").click(function() {
            b.that.showPopup("about", b.html_about)
        })
    };
    var $ = function(b) {
        this.that = b, this.event = !1, this.storageName = "custom_keys", this.stroageKeys = this.that.getStorage(this.storageName), this.keys = this.defaultKeys(), this.stroageKeys && a.extend(this.keys, JSON.parse(this.stroageKeys)), this.current_key = !1, this.setting_key = !1, this.setting_ctrl_key = !1, this.setting_shift_key = !1, this.handShortActive = !1
    };
    $.prototype.init = function() {
        this.listeners()
    }, $.prototype.listeners = function() {
        var b = this;
        a(document).keydown(function(a) {
            b.event = a, b.current_key = a.key, b.use(a.which)
        }), a(document).keyup(function(a) {
            b.end(a)
        }), a(document).mousedown(function() {
            b.setting_key && b.doneUpdatingKeys()
        }), a("#popup-container").on("mouseup", ".toggle-set", function() {
            var c = a(this).attr("data-key");
            a(".toggle-set").removeClass("active"), a(this).addClass("active"), b.setting_key = c
        })
    }, $.prototype.updateKeys = function(b) {
        var c = this,
            d = b,
            e = this.current_key,
            f = this.event.key;
        f = f.toLowerCase(), "" != e && " " != e || (e = "space"), this.setting_shift_key && (d = "s" + d, e = "shift + " + e), this.setting_ctrl_key && (d = "c" + d, e = "ctrl + " + e), this.setting_alt_key && (d = "a" + d, e = "alt + " + e), ["shift", "control", "alt"].indexOf(f) > -1 || (this.keys[this.setting_key].code = d, this.keys[this.setting_key].key = e, a.each(this.keys, function(a, b) {
            b.code == d && a != c.setting_key && (c.keys[a].code = 0, c.keys[a].key = "??")
        }), this.updateStorage(), this.doneUpdatingKeys())
    }, $.prototype.appendKeys = function() {
        a(".append-keybinds").each(function() {
            a(this).text("")
        }), a.each(this.keys, function(b, c) {
            var d = "sh-" + c.section,
                e = '<div class="shortcut-item toggle-set" data-key="' + b + '"><div class="shortcut-icon">' + c.key + "</div> " + c.text + "</div>";
            a("." + d).append(e)
        })
    }, $.prototype.updateStorage = function() {
        var a = JSON.stringify(this.keys);
        this.that.putStorage(this.storageName, a)
    }, $.prototype.doneUpdatingKeys = function() {
        a(".toggle-set").removeClass("active"), this.setting_key = !1, this.setting_ctrl_key = !1, this.setting_shift_key = !1, this.setting_alt_key = !1, this.appendKeys()
    }, $.prototype.use = function(b) {
        var c = b,
            d = this;
        parseInt(this.that.FrameController.currentFrame), parseInt(this.that.LayerController.currentLayer);
        if ("Move" == this.that.tool && [37, 40, 39, 38].indexOf(b) > -1) return void this.that.ToolController.tool.key(b);
        if (!this.that.settings.disableKeybinds) {
            if (this.setting_key) return (this.that.keyEvent.ctrlKey || this.that.keyEvent.metaKey) && (this.setting_ctrl_key = !0), this.that.keyEvent.shiftKey && (this.setting_shift_key = !0), this.that.keyEvent.altKey && (this.setting_alt_key = !0), void this.updateKeys(b);
            if ("Text" == this.that.tool || (this.that.keyEvent.ctrlKey || this.that.keyEvent.metaKey) && "pencil" == this.that.tool && !this.that.keyEvent.shiftKey || this.that.preventShortcut || this.that.developer) return void(this.that.mouse.active = !1);
            this.that.keyEvent.shiftKey && (c = "s" + c), (this.that.keyEvent.ctrlKey || this.that.keyEvent.metaKey) && (c = "c" + c), this.that.keyEvent.altKey && (c = "a" + c), a.each(this.keys, function(b, e) {
                return ("#text-tool" != e.el || !d.that.online.status) && (e.code != c || e.script ? e.code == c && e.script ? d.runScript(e.script) : void 0 : d.that.ToolController.selectTool(a(e.el), e.type))
            }), !this.that.keyEvent.ctrlKey && !this.that.keyEvent.shiftKey, this.that.keyEvent.shiftKey && this.that.ToolController.shift(!0), (this.that.keyEvent.ctrlKey || this.that.keyEvent.metaKey) && this.that.ToolController.ctrl(!0), this.that.keyEvent.altKey && this.that.ToolController.alt(!0)
        }
    }, $.prototype.runScript = function(a) {
        var b = parseInt(this.that.FrameController.currentFrame),
            c = parseInt(this.that.LayerController.currentLayer);
        if (this.that.canKey) switch (a) {
            case "preview":
                return this.that.PreviewController.previewFrames();
            case "add-frame":
                return this.that.FrameController.add();
            case "copy-frame":
                return this.that.FrameController.duplicate(b);
            case "delete-frame":
                return this.that.FrameController["delete"](b);
            case "right-frame":
                return this.that.FrameController.select(b + 1, !1, !0);
            case "left-frame":
                return this.that.FrameController.select(b - 1, !1, !0);
            case "move-right-frame":
                return this.that.FrameController.moveFrame("right");
            case "move-left-frame":
                return this.that.FrameController.moveFrame("left");
            case "add-layer":
                return this.that.LayerController.promptAddlayer();
            case "copy-layer":
                return this.that.LayerController.duplicate();
            case "up-layer":
                return this.that.LayerController.select(!1, c + 1, !0);
            case "down-layer":
                return this.that.LayerController.select(!1, c - 1, !0);
            case "delete-layer":
                return this.that.LayerController.deleteLayer();
            case "merge-down-layer":
                return this.that.LayerController.doMerge("down");
            case "merge-up-layer":
                return this.that.LayerController.doMerge("up");
            case "switch-colors":
                return this.that.ColorController["switch"]();
            case "size-up":
                return this.that.ToolController.size("up");
            case "size-down":
                return this.that.ToolController.size("down");
            case "in-zoom":
                return this.that.ZoomController.active(!1, -100, !0);
            case "out-zoom":
                return this.that.ZoomController.active(!1, 100, !0);
            case "hand-shortcut":
                return this.handShortcut()
        }
    }, $.prototype.handShortcut = function() {
        this.handShortActive || (this.handShortActive = this.that.tool, this.that.mouse.setHandTemp())
    }, $.prototype.end = function(a) {
        16 == a.keyCode && this.that.ToolController.shift(!1), 17 == a.keyCode && this.that.ToolController.ctrl(!1), 18 == a.keyCode && this.that.ToolController.alt(!1), this.handShortActive && (this.that.mouse.resetHandTemp(this.handShortActive), this.handShortActive = !1)
    }, $.prototype.defaultKeys = function() {
        return {
            pencil_tool: {
                text: "pencil tool",
                code: 80,
                key: "p",
                el: "#pencil-tool",
                type: "Pencil",
                section: "tools"
            },
            hand_tool: {
                text: "hand tool",
                code: 72,
                key: "h",
                el: "#hand-tool",
                type: "Hand",
                section: "tools"
            },
            spray_paint: {
                text: "spray tool",
                code: 79,
                key: "o",
                el: "#spray-tool",
                type: "Spray",
                section: "tools"
            },
            eraser_tool: {
                text: "eraser tool",
                code: 69,
                key: "e",
                el: "#eraser-tool",
                type: "Eraser",
                section: "tools"
            },
            line_tool: {
                text: "line tool",
                code: 76,
                key: "l",
                el: "#line-tool",
                type: "Line",
                section: "tools"
            },
            square_tool: {
                text: "square tool",
                code: 81,
                key: "q",
                el: "#square-tool",
                type: "Square",
                section: "tools"
            },
            circle_tool: {
                text: "circle tool",
                code: 67,
                key: "c",
                el: "#circle-tool",
                type: "Circle",
                section: "tools"
            },
            bucket_tool: {
                text: "bucket tool",
                code: 66,
                key: "b",
                el: "#bucket-tool",
                type: "Bucket",
                section: "tools"
            },
            color_picker_tool: {
                text: "color picker tool",
                code: 86,
                key: "v",
                el: "#color-picker-tool",
                type: "ColorPicker",
                section: "tools"
            },
            move_tool: {
                text: "move tool",
                code: 77,
                key: "m",
                el: "#move-tool",
                type: "Move",
                section: "tools"
            },
            select_tool: {
                text: "select tool",
                code: 83,
                key: "s",
                el: "#select-tool",
                type: "Select",
                section: "tools"
            },
            text_tool: {
                text: "text tool",
                code: 84,
                key: "t",
                el: "#text-tool",
                type: "Text",
                section: "tools"
            },
            lighten_darken_tool: {
                text: "lighten & darken tool",
                code: 68,
                key: "d",
                el: "#lighten-darken-tool",
                type: "LightenDarken",
                section: "tools"
            },
            dither_tool: {
                text: "dither tool",
                code: 75,
                key: "k",
                el: "#dithering-tool",
                type: "Dithering",
                section: "tools"
            },
            brush_tool: {
                text: "brush tool",
                code: 82,
                key: "r",
                el: "#brush-tool",
                type: "Brush",
                section: "tools"
            },
            gradient_tool: {
                text: "gradient tool",
                code: 71,
                key: "g",
                el: "#gradient-tool",
                type: "Gradient",
                section: "tools"
            },
            preview: {
                text: "preview current image",
                code: 32,
                key: "space",
                script: "preview",
                section: "ui"
            },
            add_frame: {
                text: "add frame",
                code: "s65",
                key: "shift + a",
                script: "add-frame",
                section: "ui"
            },
            copy_frame: {
                text: "duplicate frame",
                code: "s68",
                key: "shift + d",
                script: "copy-frame",
                section: "ui"
            },
            delete_frame: {
                text: "delete frame",
                code: "s84",
                key: "shift + t",
                script: "delete-frame",
                section: "ui"
            },
            left_frame: {
                text: "previous frame",
                code: "37",
                key: "arrowleft",
                script: "left-frame",
                section: "ui"
            },
            right_frame: {
                text: "next frame",
                code: "39",
                key: "arrowright",
                script: "right-frame",
                section: "ui"
            },
            move_right_frame: {
                text: "move frame right",
                code: "c39",
                key: "ctrl + arrowright",
                script: "move-right-frame",
                section: "ui"
            },
            move_left_frame: {
                text: "move frame left",
                code: "c37",
                key: "ctrl + arrowleft",
                script: "move-left-frame",
                section: "ui"
            },
            add_layer: {
                text: "add layer",
                code: "s76",
                key: "shift + l",
                script: "add-layer",
                section: "ui"
            },
            copy_layer: {
                text: "duplicate layer",
                code: "s75",
                key: "shift + k",
                script: "copy-layer",
                section: "ui"
            },
            down_layer: {
                text: "previous layer",
                code: "40",
                key: "arrowdown",
                script: "down-layer",
                section: "ui"
            },
            up_layer: {
                text: "next layer",
                code: "38",
                key: "ARROWUP",
                script: "up-layer",
                section: "ui"
            },
            delete_layer: {
                text: "delete layer",
                code: "s82",
                key: "shift + r",
                script: "delete-layer",
                section: "ui"
            },
            merge_layer_down: {
                text: "merge layer down",
                code: "s81",
                key: "shift + q",
                script: "merge-down-layer",
                section: "ui"
            },
            merge_layer_up: {
                text: "merge layer up",
                code: "s87",
                key: "shift + w",
                script: "merge-up-layer",
                section: "ui"
            },
            switch_color: {
                text: "switch primary/secondary colors",
                code: "88",
                key: "x",
                script: "switch-colors",
                section: "ui"
            },
            in_zoom: {
                text: "zoom in",
                code: "187",
                key: "=",
                script: "in-zoom",
                section: "ui"
            },
            out_zoom: {
                text: "zoom out",
                code: "189",
                key: "-",
                script: "out-zoom",
                section: "ui"
            },
            hand_shortcut: {
                text: "quick hand tool",
                code: "48",
                key: "0",
                script: "hand-shortcut",
                section: "ui"
            },
            size_up: {
                text: "change brush size up",
                code: "219",
                key: "[",
                script: "size-up",
                section: "ui"
            },
            size_down: {
                text: "change brush size down",
                code: "221",
                key: "]",
                script: "size-down",
                section: "ui"
            }
        }
    };
    var _ = function(a) {
        this.that = a, this.ratio = 1, this.ratioContainer = 1, this.dragging = !1, this.scrolling = !1, this.active = !1, this.ignoreZoomLastClicks = !0
    };
    _.prototype.init = function() {
        this.listeners(), this.set()
    }, _.prototype.set = function() {
        if (!this.that.settings.navigation || this.that.isApp) return !1;
        var b = this.that.width,
            c = this.that.height,
            d = a("#navigation-scroller").width(),
            e = 125,
            f = 1;
        b >= c ? this.that.width < d ? (f = parseInt(d) / this.that.width, b *= f, c *= f) : (f = this.that.width / parseInt(d), b /= f, c /= f) : this.that.height < e ? (f = e / this.that.height, b *= f, c *= f) : (f = this.that.height / e, b /= f, c /= f), b = Math.floor(b), c = Math.floor(c), c > e ? (b = e / c * b, a("#navigation-scroller").height(e), a("#nav-canvas-img").height(e).width(b)) : (c = this.width / b * c, a("#navigation-scroller").height(c), a("#nav-canvas-img").height(c).width(b))
    }, _.prototype.listeners = function() {
        var b = this;
        if (!this.that.isApp) {
            var c = a("#nav-placement").draggable({
                containment: "parent",
                drag: function() {
                    b.dragging = !0, b.updatePlacement()
                },
                stop: function() {
                    b.dragging = !1, b.updateLastClicks()
                }
            });
            a(document).on("pointerup", function() {
                b.scrolling && (b.scrolling = !1, b.updateLastClicks())
            }), a("#drawing-canvas-conatiner").on("scroll", function() {
                b.dragging || b.that.ZoomController.loading || (b.scrolling = !0, b.placement())
            }), a(".nav-canvas-img").mousedown(function(d) {
                var e = a(this).parent().offset(),
                    f = d.pageX - e.left,
                    g = d.pageY - e.top;
                b.clickPosition(f, g), c.trigger(d)
            }), a(".nav-canvas-img, #nav-placement").bind("touchstart", function(d) {
                var e = d.originalEvent.touches[0],
                    f = a(this).parent().offset(),
                    g = e.pageX - f.left,
                    h = e.pageY - f.top;
                e.type = "mousedown.draggable", b.clickPosition(g, h), c.trigger(e)
            }), a(".nav-canvas-img, #nav-placement").bind("touchmove", function(d) {
                if (!b.dragging) {
                    var e = d.originalEvent.touches[0],
                        f = a(this).parent().offset(),
                        g = e.pageX - f.left,
                        h = e.pageY - f.top;
                    e.type = "mousedown.draggable", b.clickPosition(g, h), c.trigger(e)
                }
            })
        }
    }, _.prototype.clickPosition = function(b, c) {
        var d = a("#nav-placement"),
            e = a("#navigation-scroller"),
            f = d.width(),
            g = d.height();
        b -= f / 2, c -= g / 2;
        var h = b + f / 2 + f,
            i = c + g / 2 + g;
        b < 0 && (b = 0), c < 0 && (c = 0), h > e.width() && (b = e.width() - f), i > e.height() && (c = e.height() - g), d.css({
            top: c,
            left: b
        }), this.updatePlacement()
    }, _.prototype.updatePlacement = function() {
        if (!this.that.isApp) {
            var b = a("#drawing-canvas-conatiner"),
                c = a("#canvas-layers-container"),
                d = a("#nav-placement"),
                e = d.position(),
                f = this.ratio,
                g = e.left * f,
                h = e.top * f,
                i = Math.abs(d.width()),
                j = Math.abs(d.height());
            d.width(i).height(j);
            var k = (c.width() / this.that.ZoomController.zoom, c.height() / this.that.ZoomController.zoom, g / this.that.ZoomController.zoom),
                l = h / this.that.ZoomController.zoom,
                m = c.width() / b.width(),
                n = c.height() / b.height();
            k = (Math.ceil(k) + m / 2) / this.that.pixel_size, l = (Math.ceil(l) + n / 2) / this.that.pixel_size, this.that.ZoomController.last_x = k, this.that.ZoomController.last_y = l, b.scrollLeft(g).scrollTop(h), this.that.TileController.updatePlacement()
        }
    }, _.prototype.placement = function() {
        if (!this.that.isApp) {
            var b = a("#canvas_display"),
                c = (b.width(), b.height(), a("#drawing-canvas-conatiner")),
                d = c.width(),
                e = c.height(),
                f = a("#canvas-layers-container"),
                g = f.width(),
                h = f.height(),
                i = a("#nav-canvas-img"),
                j = i[0].getBoundingClientRect().width,
                k = i[0].getBoundingClientRect().height;
            g > h ? (this.ratio = g / j, this.ratioContainer = g / d) : (this.ratio = h / k, this.ratioContainer = h / e);
            var l = d / this.ratio,
                m = e / this.ratio,
                n = c.scrollLeft(),
                o = c.scrollTop(),
                p = n / this.ratio,
                q = o / this.ratio;
            this.that.ZoomController.zoom >= 1 && (l -= 3, m -= 3), a("#nav-placement").show().css({
                top: q,
                left: p
            }).width(l).height(m), l + 3 >= j && m + 3 >= k && a("#nav-placement").hide(), this.that.TileController.updatePlacement()
        }
    }, _.prototype.update = function(b) {
        return !!this.that.settings.navigation && void(b && a("#nav-canvas-img").show().attr("src", b))
    }, _.prototype.clickLocation = function() {
        var b = a("#drawing-canvas-conatiner"),
            c = a("#canvas-layers-container").position(),
            d = this.that.pixel_size * this.that.ZoomController.zoom,
            e = b.scrollLeft() / d,
            f = b.scrollTop() / d;
        this.scroll_x = e + b.width() / 2 / d, this.scroll_y = f + b.height() / 2 / d, this.that.isApp && (this.scroll_x = Math.round((b.width() / 2 - c.left) / d), this.scroll_y = Math.round((b.height() / 2 - c.top) / d))
    }, _.prototype.updateLastClicks = function() {
        this.that.ZoomController.zoom <= 0 || (this.clickLocation(), this.that.mouse.last_x = this.scroll_x, this.that.mouse.last_y = this.scroll_y, this.that.ZoomController.previousZoomX = this.scroll_x, this.that.ZoomController.previousZoomY = this.scroll_y, this.ignoreZoomLastClicks || (this.that.ZoomController.last_x = this.scroll_x, this.that.ZoomController.last_y = this.scroll_y, this.that.ZoomController.setLastZoom()), this.that.isApp && (this.that.ZoomController.last_x = this.scroll_x, this.that.ZoomController.last_y = this.scroll_y, this.that.mouse.app_x_last = this.scroll_x, this.that.mouse.app_y_last = this.scroll_y), this.ignoreZoomLastClicks = !1)
    };
    var aa = function(a) {
        this.that = a
    };
    aa.prototype.init = function() {
        this.listeners()
    }, aa.prototype.listeners = function() {
        var b = this;
        a("#align-left").click(function() {
            b.active("left")
        }), a("#align-right").click(function() {
            b.active("right")
        }), a("#align-top").click(function() {
            b.active("top")
        }), a("#align-bottom").click(function() {
            b.active("bottom")
        }), a("#align-center").click(function() {
            b.active("center")
        })
    }, aa.prototype.active = function(a) {
        if (!this.checkPreConditions()) switch (a) {
            case "left":
                return this.that.alignLeft();
            case "right":
                return this.that.alignRight();
            case "top":
                return this.that.alignTop();
            case "bottom":
                return this.that.alignBottom();
            case "center":
                return this.that.alignCenter()
        }
    }, aa.prototype.checkPreConditions = function() {
        return !!this.that.LayerController.checkPreConditions()
    };
    var ba = function(a) {
        this.that = a
    };
    ba.prototype.init = function() {
        this.listeners()
    }, ba.prototype.listeners = function() {
        var b = this;
        a("#tiles-toggle").click(function() {
            b.that.settings.tile.status = !b.that.settings.tile.status, b.updateStatus(), b.that.updateSettings()
        }), a("#tiles-alpha").on("input", function() {
            b.that.updateTileOpacity(a(this).val())
        }), a("#tiles-alpha").on("change", function() {
            b.that.updateSettings()
        }), a(".tiles-border-toggle").click(function() {
            b.that.settings.tile.border = !b.that.settings.tile.border, b.that.updateBorder(), b.that.updateSettings()
        })
    }, ba.prototype.reset = function() {
        this.that.settings.tile.status && (this.that.createTileCanvases(), this.that.getPixelRatio())
    }, ba.prototype.updateStatus = function(a, b) {
        this.that.settings.tile.status ? this.that.createTileCanvases(a, b) : this.that.removeTileCanvases(), this.that.getPixelRatio(), this.that.ZoomController.reset(!0)
    }, ba.prototype.toggleOff = function() {
        this.that.settings.tile.status = !1, this.that.removeTileCanvases(), this.that.getPixelRatio(), this.that.ZoomController.reset(!0), a("#tiles-toggle").prop("checked", !1)
    }, ba.prototype.updateOpacity = function(a) {
        this.that.settings.tile.opacity = a, this.that.updateTileCanvases()
    }, ba.prototype.updateBorders = function() {}, ba.prototype.updatePlacement = function() {
        if (this.that.settings.tile.status) {
            for (var b = a("#canvas_display"), c = b.offset(), d = c.top - a(window).scrollTop(), e = c.left - a(window).scrollLeft(), f = b.width(), g = b.height(), h = 0; h <= this.that.settings.tile.canvases.length - 1; h++) {
                switch (h) {
                    case 0:
                        var i = e - f,
                            j = d - g;
                        break;
                    case 1:
                        var i = e,
                            j = d - g;
                        break;
                    case 2:
                        var i = e + f,
                            j = d - g;
                        break;
                    case 3:
                        var i = e - f,
                            j = d;
                        break;
                    case 4:
                        var i = e + f,
                            j = d;
                        break;
                    case 5:
                        var i = e - f,
                            j = d + g;
                        break;
                    case 6:
                        var i = e,
                            j = d + g;
                        break;
                    case 7:
                        var i = e + f,
                            j = d + g
                }
                a("#canvas-layers-appened #canvas_canvas_tile_" + h).css({
                    position: "fixed",
                    left: i,
                    top: j
                })
            }
            a("#canvas-layers-appened .canvas_tile").width(f).height(g)
        }
    };
    var ca = function(a) {
        this.that = a
    };
    ca.prototype.init = function() {
        this.listeners(), this.updateAnchors()
    }, ca.prototype.listeners = function() {
        var b = this;
        a("#anchor-outline .anchor-sets").click(function() {
            b.updateAnchor(a(this))
        }), a("#outline-ok").click(function() {
            b.that.LayerController.outlineLayer(!1, !0)
        }), a("#outline-inside").click(function() {
            b.toggleInside()
        }), a("#outline-alpha").on("input", function() {
            b.changeAlpha(a(this))
        }), a("#outline-layers").change(function() {
            b.changeLayer(a(this))
        })
    }, ca.prototype.changeLayer = function(a) {
        this.that.settings.outline.layer_id = a.val()
    }, ca.prototype.open = function(b) {
        this.that.SettingsController.expandPanel(!1, "sidebar-outline");
        var c = (this.that.LayerController.layers, "");
        this.that.settings.outline.layer_id = b, a.each(this.that.LayerController.layers, function(a, d) {
            c = c + '<option value="' + a + '"', a == b && (c += ' selected="selected"'), c = c + ">" + d.name + "</option>"
        }), a("#outline-layers").html(""), a("#outline-layers").append(c)
    }, ca.prototype.changeAlpha = function(b) {
        this.that.settings.outline.alpha = b.val(), a("#outline-alpha-change").text(this.that.settings.outline.alpha)
    }, ca.prototype.toggleInside = function() {
        this.that.settings.outline.inside = !this.that.settings.outline.inside
    }, ca.prototype.updateAnchor = function(a) {
        var b = a.attr("data-set");
        this.that.settings.outline.points[b] = !this.that.settings.outline.points[b], this.updateAnchors()
    }, ca.prototype.updateAnchors = function() {
        var b = this;
        a("#anchor-outline .anchor-sets").each(function() {
            var c = a(this),
                d = c.attr("data-set");
            b.that.settings.outline.points[d] ? c.addClass("active") : c.removeClass("active")
        })
    };
    var da = function(a) {
        this.that = a, this.active = !1, this.src = !1, this.width = 200, this.height = 200, this.scale = 1, this.imageObj = !1
    };
    da.prototype.init = function() {
        this.listeners()
    }, da.prototype.listeners = function() {
        var b = this;
        a("#reference-btn").click(function() {
            a("#file-reference")[0].click()
        }), a("#reference-scale").change(function() {
            b.scale = a(this).val(), b.updatePreview()
        }), a("#file-reference").change(function(a) {
            b.load(a)
        })
    }, da.prototype.load = function(b) {
        this.that.readFile(b, function(b) {
            a("#tab-reference-preview").removeClass("d-none"), a("#tab-reference-preview").html(b)
        })
    };
    var ea = function(a) {
        this.that = a, this.owner = !1, this.config = !1, this.addedCalled = !1, this.database = null, this.removed = !1, this.pingTimer = !1, this.whosOnlineTimer = !1, this.onlineLayersCount = 0, this.forceAdd = !1, this.canWrite = !0, this.canRead = !0, this.currentRef = !1, this.users = []
    };
    ea.prototype.init = function() {
        if (this.that.online) {
            var b = this;
            this.create(), this.activate(), this.that.HistoryController.undo = [], this.initalCalls(), this.changed(), this.listenLayer(), setTimeout(function() {
                b.that.HistoryController.undo = []
            }, 100), this.whosOnlineCheck(), this.that.repositionScreen(!1), this.that.settings.persLayers = !1, a(document).on("click", ".online-layer-block", function() {
                var c = a(this),
                    d = c.attr("data-user"),
                    e = 1;
                c.hasClass("off") && (e = 0), b.blockWrite(d, e), b.blockRead(d, e), c.toggleClass("off")
            }), a(document).on("click", ".online-layer-remove", function() {
                var c = a(this),
                    d = c.attr("data-user");
                b.removeLayer(d)
            })
        }
    }, ea.prototype.ping = function() {
        var a = this;
        this.pingTimer = setTimeout(function() {
            a.updateOnlineStatus()
        }, 12e4)
    }, ea.prototype.whosOnlineCheck = function() {
        var a = this;
        this.whosOnlineTimer = setTimeout(function() {
            a.updateWhosOnline()
        }, 15e3)
    }, ea.prototype.updateWhosOnline = function() {
        var b = this;
        this.that.online.database;
        a(".online-users-append").html(""), a.each(this.users, function(c, d) {
            var e = Date.now() - d.last_update,
                f = Math.round(e % 864e5 % 36e5 / 6e4),
                g = d.username.toLowerCase();
            if (f <= 1 || b.that.online.user && b.that.online.user == d.username) {
                var h = '<a target="_blank" href="/' + g + '" title="' + d.username + '"><img class="circle" src="' + d.image + '"></a>';
                a(".online-users-append").append(h)
            }
        }), this.whosOnlineCheck()
    }, ea.prototype.updateOnlineStatus = function() {}, ea.prototype.addLayerTemplate = function(b) {
        var c = '<div class="online-layer-item row-section online-layer-item-' + b + '" title="' + b + '"><div class="online-layer-name full">' + b + '</div><div class="online-layer-options"><div class="online-layer-remove defaul-app-button" data-user="' + b + '"><i class="fa fa-trash" aria-hidden="true"></i></div></div></div>';
        a(".online-layers-append").append(c)
    }, ea.prototype.create = function() {
        this.config = {
            apiKey: "AIzaSyDMqjJEFfQSFQ9wD1wQ3iF-4Y6C5JoZ2Vk",
            authDomain: "pixilart-drawing.firebaseapp.com",
            databaseURL: "https://pixilart-drawing.firebaseio.com"
        }, firebase.initializeApp(this.config), this.database = firebase.database()
    }, ea.prototype.activate = function() {
        this.removeElements(), this.that.autosave.status = !1, a("#drawing-canvas-conatiner").addClass("full")
    }, ea.prototype.removeElements = function() {
        a("#frames-placement").remove(), a("#delete-layer, #duplicate-layer, #merger-up, #merger-down, #add-layer, #rename-layer, .online-remove").remove(), a(".online-hidden").addClass("hidden")
    }, ea.prototype.listenLayer = function() {
        var a = this.database.ref(this.that.online.database + "/layers/" + this.that.online.layer_id);
        a.on("child_changed", function(a) {
            a.val().blockWrite && (_this.that.showAlert("Connection has been lost. You can continue to draw but your session has expired", 1e4), _this.canWrite = !1), a.val().blockRead && (_this.canRead = !1)
        })
    }, ea.prototype.initalCalls = function() {
        var a = this;
        this.database.ref(this.that.online.database + "/layers/" + this.that.online.layer_id).once("value").then(function(b) {
            return b.hasChildren() ? b.val().removed ? (a.removed = !0, void a.that.showAlert("You are not allowed to draw in this room", 3e4)) : (a.currentRef = b.val(), void a.checkAdded()) : void a.writeLayer()
        })
    }, ea.prototype.blockWrite = function(a, b) {
        if (this.that.online.maker_user_id == this.that.online.user_id) {
            var c = this.database.ref(this.that.online.database + "/layers/" + a);
            c.update({
                blockWrite: b
            })
        }
    }, ea.prototype.blockRead = function(a, b) {
        if (this.that.online.maker_user_id == this.that.online.user_id) {
            var c = this.database.ref(this.that.online.database + "/layers/" + a);
            c.update({
                blockRead: b
            })
        }
    }, ea.prototype.removeLayer = function(b) {
        if (this.that.online.maker_user_id == this.that.online.user_id && b != this.that.online.layer_id) {
            var c = this.database.ref(this.that.online.database + "/layers/" + b);
            c.update({
                removed: !0,
                blockWrite: !0,
                blockRead: !0
            }), a(".online-layer-item-" + b).remove()
        }
    }, ea.prototype.checkAdded = function() {
        var a = this,
            b = this.database.ref(this.that.online.database + "/layers");
        b.on("child_added", function(b) {
            a.onlineLayersCount++
        }), setTimeout(function() {
            a.added()
        }, 250)
    }, ea.prototype.added = function() {
        function a() {
            g.push(d), b(!1, !0, 0)
        }

        function b(a, d, e, h) {
            if (a = a ? a : g[e], !a.val().removed && (c.that.loadImage(a.val().src, function(i) {
                    var j = {
                        online_name: a.val().name,
                        user: a.val().user,
                        image: a.val().user_image
                    };
                    c.that.LayerController.addLayer(!1, a.val().name, i, a.val().opacity, j), c.that.LayerController.select(), f.push("null"), d && (c.that.LayerController.currentLayer = f.length, c.that.LayerController.select()), c.that.FrameController.updateFramePreview(), c.addLayerTemplate(a.val().name), h || e != g.length - 1 && b(!1, !0, e + 1)
                }), a.val().user)) {
                var i = {
                    username: a.val().name,
                    image: a.val().user_image,
                    last_update: a.val().last_update
                };
                c.users.push(i), c.updateWhosOnline()
            }
        }
        var c = this,
            d = !1,
            e = this.database.ref(this.that.online.database + "/layers"),
            f = [],
            g = [],
            h = 0;
        this.addedCalled = !0, this.removed || e.on("child_added", function(e) {
            return h++, c.forceAdd ? void b(e, !1, !1, !0) : (c.that.online.layer_id != e.val().name || d ? g.push(e) : (d = e, c.currentRef = e.val()), void(h == c.onlineLayersCount && (a(), c.forceAdd = !0)))
        })
    }, ea.prototype.changed = function() {
        function b(a, b) {
            d.that.LayerController.layers[a] && d.that.LayerController.deleteLayer(!1, !1, a, !0)
        }

        function c(b, c) {
            return d.that.loadImage(c.val().src, function(a) {
                var e = d.that.LayerController.layers[b];
                e.src = a, e.opacity = parseFloat(c.val().opacity), d.that.updateDisplayCanvas(d.that.LayerController.layers, d.that.LayerController.currentLayer), d.that.LayerController.updateCurrentLayerSrc(b), d.that.render()
            }), a.each(d.users, function(a, b) {
                b.username == c.val().name && (b.last_update = c.val().last_update)
            }), !1
        }
        var d = this,
            e = this.database.ref(this.that.online.database + "/layers");
        e.on("child_changed", function(e) {
            return d.that.online.layer_id == e.val().name && e.val().removed ? (d.removed = !0, void d.that.showAlert("Connection has been lost. Please save as a .pixil or download now.", 3e4)) : void(e.val().name == d.that.online.layer_id || d.removed || a.each(d.that.LayerController.layers, function(a, d) {
                if (d && e.val().name == d.name) {
                    if (e.val().removed) return b(a);
                    c(a, e)
                }
            }))
        })
    }, ea.prototype.write = function(a, b) {
        var c = this;
        if (this.that.online.status) {
            this.that.online.database;
            this.database.ref(this.that.online.database + "/" + a).set(b, function(a) {
                a || c.addedCalled || c.checkAdded()
            })
        }
    }, ea.prototype.writeLayer = function() {
        if (this.that.online.status && !this.removed) {
            var a = this.that.canvas.layer.dataURL(),
                b = "layers/" + this.that.online.layer_id,
                c = (this.database.ref(b), this.that.LayerController.layers[this.that.LayerController.currentLayer]),
                d = {
                    name: this.that.online.layer_id,
                    src: a,
                    opacity: c.opacity,
                    timestamp: Date.now()
                };
            this.currentRef.timestamp && (d.timestamp = this.currentRef.timestamp), this.that.online.user && (d.user = this.that.online.user, d.user_image = this.that.online.user_image, d.last_update = Date.now()), this.write(b, d)
        }
    };
    var fa = function(a) {};
    fa.prototype.buildButton = function() {};
    var ga = {
            version: "2.7.0",
            theme: {
                white: !1
            },
            adsBy: null,
            ons: !1,
            id: !1,
            isAuth: !1,
            isExternal: !1,
            isPhotoEdit: !1,
            name: "pixil_art_drawing_app",
            website: "pixilart.com",
            fileName: "Untitled",
            drawingName: !1,
            debug: !1,
            developer: !1,
            loading: !1,
            layers: [],
            topLayers: [],
            bottomLayers: [],
            hasTopLayers: !1,
            hasBottomLayers: !1,
            useSeperateTopLayers: !1,
            useSeperateBottomLayers: !1,
            canvas: {},
            current_layer: 1,
            current_frame: 1,
            width: 100,
            height: 100,
            minWidth: 8,
            minHeight: 8,
            maxWidth: 1e3,
            maxHeight: 1e3,
            maxRatioWidth: 2100,
            maxRatioHeight: 2100,
            window: !1,
            keys: {
                shift: !1,
                ctrl: !1
            },
            edit: {
                unqid: !1,
                status: !1,
                image_src: !1,
                image: !1,
                resize: !1,
                force: !1,
                title: "",
                description: ""
            },
            isWindowsIE: !1,
            pixel_size: 1,
            ratio_size: 1,
            zoom_ratio: 1,
            zoom_step: 1,
            zoom: {
                type: "CSS",
                left: 0,
                top: 0,
                ratio: 1,
                "default": 1,
                pixel_size: 1
            },
            pixelDrawingSize: 1,
            previewSize: 1,
            maxLayers: 200,
            panX: 0,
            panY: 0,
            element: null,
            mouseEvent: !1,
            keyEvent: !1,
            tool: "Pencil",
            tools: {},
            pixelPerfect: {
                status: !1,
                last: {
                    x: 0,
                    y: 0
                },
                set: 0,
                direction: "",
                previous: !1,
                history: [],
                preHistory: []
            },
            backgroundImage: {
                status: !0,
                image: "",
                init: !1,
                size: "fit"
            },
            onionSkin: {
                status: !0,
                image: !1,
                opacity: .2,
                top_status: !1,
                top_image: !1,
                top_opacity: .2
            },
            grid: {
                status: !1,
                data: !1,
                opacity: .2,
                canvas: !1,
                max_size: 10,
                show: !0
            },
            checker: {
                status: !0,
                data: !1,
                opacity: .15
            },
            downloadSizes: {
                layer: 1,
                frame: 1,
                gif: 1
            },
            autosave: {
                status: !0,
                timer: 6e4,
                cookieName: "pas",
                timeout: !0,
                loaded: !1
            },
            renderAfter: [],
            mirror: {
                x: !1,
                y: !1,
                tools: ["Pencil", "LightenDarken", "Line", "Eraser"]
            },
            finished: !1,
            layerAboveCache: !1,
            layerBelowCache: !1,
            closePopup: !0,
            popup: {
                open: !1
            },
            ads: {
                type: "freestar",
                placement: "auto",
                large: !1,
                startTime: 9e4,
                lastRefreshTime: 0,
                adStartTimer: !1,
                autloadTime: 9e4,
                mobileAutloadTime: 3e4,
                maxAttempts: 50,
                attempts: 0,
                bottomPlacement: !1,
                adElementWidth: !1,
                status: !0,
                show: !0,
                timer: !1,
                canShowManual: !1,
                units: {
                    leaderOne: null,
                    leaderTwo: null,
                    submitLoading: null
                }
            },
            isMobile: !1,
            isMobileDevice: !1,
            isTablet: !1,
            isIpad: !1,
            isApp: !1,
            isTouch: !1,
            isCustomSize: !1,
            preventShortcut: !1,
            newShow: !0,
            bucket: {
                renderImageData: [],
                filled: [],
                imageData: !1,
                maskImageData: !1,
                color: !1,
                positions: [],
                callback: !1
            },
            stamps: {
                data: !1
            },
            rainbow: {
                status: !1,
                color: !1,
                turn: "r",
                direction: "up",
                current: 0,
                r: "up",
                g: "up",
                b: "up",
                h: !1
            },
            randomColor: {
                status: !1
            },
            fullscreen: {
                status: !1,
                text: "Full Screen",
                exit: "Exit Full Screen"
            },
            screen: {
                width: 0,
                height: 0,
                is_large: !1
            },
            controllersLoaded: !1,
            passiveSet: !1,
            settings: {
                ad: {
                    placement: "auto"
                },
                name: "pa_draw_settings",
                showHue: !1,
                gridSize: 1,
                checkerSize: 1,
                whiteIsTransparent: !1,
                dithering: !1,
                extras: !0,
                navigation: !0,
                extrasColors: !1,
                isoLines: !1,
                canvasZoomDefault: !1,
                disableDownloadSubmit: !1,
                disableScrollZoom: !1,
                lockFrames: !1,
                framesLeft: !1,
                mouseIcons: !1,
                spacing: 10,
                roundedPixel: !1,
                palette: "common",
                palettes: {},
                palette_ids: {},
                zoomUnlock: !1,
                grid: !1,
                checker: !1,
                persLayers: !1,
                usePressure: !1,
                theme: {
                    lighter: !1,
                    icons: "autumnfire"
                },
                brush: {
                    status: !0,
                    fill: !0,
                    image: !1,
                    mouse: !1,
                    solid: !1,
                    height: 0,
                    width: 0,
                    spacing: 0,
                    alpha: 1,
                    track: !0
                },
                lightendarken: {
                    light: !1,
                    strengh: 1
                },
                tile: {
                    status: !1,
                    count: 8,
                    opacity: .65,
                    border: !1,
                    canvases: []
                },
                crop: {
                    anchor: "center-center",
                    resize: !1,
                    aspect: !1
                },
                watermark: {
                    status: !1,
                    image: null
                },
                frames: {
                    tile: !1
                },
                ditherSpacing: 1,
                outline: {
                    inside: !1,
                    alpha: 1,
                    layer_id: 0,
                    points: {
                        tl: !1,
                        tc: !0,
                        tr: !1,
                        cl: !0,
                        cr: !0,
                        bl: !1,
                        bc: !0,
                        br: !1
                    }
                }
            },
            canKey: !0,
            clickCount: !1,
            isChrome: !1,
            chromeVersion: 0,
            online: {
                status: !1,
                database: "",
                layer_id: "null-false-aksjdasdjok34908weduaadjlsdaasdsadasd",
                send: !1
            },
            alert: {
                s: !1
            },
            fileDrawing: !1,
            antiAliasingLog: [],
            options: {
                skipNew: !1
            },
            palette_id: !1,
            app: {
                store: !1,
                loaded: !1,
                ready: !1,
                hideMouse: !1,
                fingerToDraw: !0,
                resizeOnNew: !1,
                edit_id: !1,
                frameSpeed: 100,
                isLoaded: !1,
                isGif: !1,
                callback: !1,
                frames: !1,
                speed: 100,
                padding: 100
            },
            filter: {
                status: !0,
                imageData: !1
            },
            user: {
                status: !1,
                username: ""
            },
            checkMouseIcon: !1,
            giftransparent: !1,
            init: function(d, e, f, g, h) {
                var i = this,
                    j = a("#online");
                this.id = Date.now();
                var k = a(window).width(),
                    l = a(window).height();
                this.window = a(window);
                j.length >= 1 && (this.online.status = !0, this.online.database = j.attr("data-online-id"), this.online.layer_id = j.attr("data-layer-id"), this.online.maker_user_id = j.attr("data-maker-user-id"), j.attr("data-user") && (this.online.user = j.attr("data-user"), this.online.user_image = j.attr("data-user-image"), this.online.user_id = j.attr("data-user-id"))), a("body").attr("data-user") && (this.user.status = !0, this.user.username = a("body").attr("data-username")), g && (this.app.callback = g), a("#palette").length && a("#palette").attr("data-id") && (this.palette_id = a("#palette").attr("data-id")), a("#skip-new").length && (this.options.skipNew = !0), a("#bg-color").length && (this.options.bgColor = a("#bg-color").attr("data-value")), a("body").data("user") && (this.isAuth = !0), a("#check-mouse-icon").length && (this.checkMouseIcon = !0), a("#is-photo").length && (this.isPhotoEdit = a("#is-photo").attr("data-url")), h && (this.ons = h), this.FileController = new X(this), this.FileController.init();
                var m = new c(0, "Background");
                if (m.src = new Image, m.src.src = "", m.init(), l <= 690 && l >= 550 && k > 1360 && !d && (this.width = 32, this.height = 32), d && (this.width = parseInt(d)), e && (this.height = parseInt(e)), this.FileController.checkRatio(this.width, this.height) && (this.width = 32, this.height = 32), "object" == typeof f && ("string" == typeof f.image && ["gif", "png"].indexOf(this.fileExtension(f.image)) != -1 && (this.edit.status = !0, this.edit.unqid = f.unqid), "boolean" == typeof f.skipNew && (this.options.skipNew = !0), "string" == typeof f.title && (this.edit.title = f.title, this.edit.description = f.description), f.isApp && (this.app.ready = !1, this.customSize = !0, this.app.edit_id = !1, this.settings.persLayers = !0, f.drawWithMouse && (this.app.fingerToDraw = !1), f.id && (this.id = f.id), f.name && (this.drawingName = f.name), f.image && (this.edit.status = !0), f.isExternal ? this.isExternal = !0 : this.isExternal = !1, f.art_id && (this.app.edit_id = f.art_id), f.app_edit_id && (this.app.edit_id = f.app_edit_id), f.frames ? this.app.frames = f.frames : this.app.frames = !1, this.app.speed = f.speed ? f.speed : 50)), this.checkMobile(h), this.checkTablet(), this.checkTouchScreen(), this.checkUserAgent(), this.validateSize(this.width, this.height), this.isWindowsIE && !this.edit.status && (this.width = 32, this.height = 32), this.checkSettings(), this.controllersLoaded || (this.HistoryController = new G(this), this.HistoryController.init(), this.FrameController = new J(this), this.FrameController.init(), this.LayerController = new I(this), this.LayerController.init(m), this.ColorController = new K(this), this.ColorController.init(), this.SelectController = new O(this), this.SelectController.init(), this.ToolController = new E(this), this.ToolController.init(), this.PreviewController = new N(this), this.PreviewController.init(), this.KeyboardController = new P(this), this.KeyboardController.init(), this.TextController = new Q(this), this.TextController.init(), this.PopupController = new U(this), this.PopupController.init(), this.SettingsController = new R(this), this.SettingsController.init(), this.StampController = new T(this), this.StampController.init(), this.GifController = new V(this), this.GifController.init(), this.HueController = new S(this), this.HueController.init(), this.ExportImportController = new W(this), this.ExportImportController.init(), this.SubmitController = new Y(this), this.SubmitController.init(), this.InfoController = new Z(this), this.InfoController.init(), this.ShortcutController = new $(this), this.ShortcutController.init(), this.AlignController = new aa(this), this.AlignController.init(), this.AdController = new F(this), this.AdController.init(), this.TileController = new ba(this), this.TileController.init(), this.OutlineController = new ca(this), this.OutlineController.init(), this.DownloadController = new M(this), this.DownloadController.init(), this.ReferenceController = new da(this), this.ReferenceController.init()), this.getPixelRatio(), this.canvas.layer = new b(this.width, this.height, "layer", (!0), (!1), (!1), this), this.canvas.layer.ctx = this.canvas.layer.context(), this.canvas.layer.empty = this.canvas.layer.clear(!0), this.canvas.bottom = new b(this.width, this.height, "bottom", (!0), (!1), (!1), this), this.canvas.bottom.ctx = this.canvas.bottom.context(), this.canvas.bottom.empty = this.canvas.bottom.clear(!0), this.canvas.select = new b(1, 1, "select", (!0), (!1), (!1), this), this.canvas.select.ctx = this.canvas.select.context(), this.canvas.select.empty = this.canvas.select.clear(!0), this.canvas.rendering = new b(this.width, this.height, "rendering", (!0), (!1), (!1), this), this.canvas.rendering.ctx = this.canvas.rendering.context(), this.canvas.rendering.empty = this.canvas.rendering.clear(!0), this.canvas.data = new b(this.width, this.height, "data", (!0), (!1), (!1), this), this.canvas.data.ctx = this.canvas.data.context(), this.canvas.data.empty = this.canvas.data.clear(!0), this.createCssDisplayGrid(), this.canvas.display = new b(this.width, this.height, "display", (!1), this.pixel_size, "canvas-layers-appened", this), this.canvas.display.ctx = this.canvas.display.context(), this.OnlineController = new ea(this), this.NavigationController = new _(this), this.NavigationController.init(), this.ZoomController = new L(this, this.canvas.display, this.zoom.type), this.ZoomController.init(), this.resizeCanvases(), this.element = document.getElementById("canvas-layers-appened"), this.mouse = new H(this), this.mouse.listeners(), this.begin(), document.getElementsByTagName("img").ondragstart = function() {
                        return !1
                    }, "object" == typeof f && "string" == typeof f.image)
                    if (this.clickCount = !0, this.edit.status)
                        if (this.newShow = !1, this.edit.image_src = f.image, f.resize && (this.edit.resize = f.resize), f.file)
                            if (this.isApp && "object" == typeof f.file) {
                                var n = JSON.stringify(f.file);
                                n = this.decodeImage(n), this.ExportImportController["import"](n, !0, !1, function() {
                                    i.ready()
                                }, !0)
                            } else this.ExportImportController.fromURL(f.file, function() {
                                i.ready(), i.showTipStepperOrAds()
                            }, !0);
                else this.getEditImage(), this.showTipStepperOrAds();
                else this.ready(), this.showTipStepperOrAds();
                else this.ready(), this.showTipStepperOrAds();
                if (this.online.status) {
                    var o = new tipStepper(toolTipCookie, function() {}, "#forced-step", (!0));
                    o.init()
                }
            },
            showTipStepperOrAds: function() {
                var a = this,
                    b = "tipHelper";
                if (!this.isApp) {
                    console.log("checking tip");
                    var c = this.readCookie(b);
                    if (c || this.isMobile || this.isTablet) this.startTipLoadAds(), this.togglePassiveInput(!0);
                    else {
                        this.hidePopup(), this.isApp || (this.passiveSet = !0, this.togglePassiveInput(!1));
                        var d = new tipStepper(b, function() {
                            a.newShow = !1, a.startTipLoadAds(), a.togglePassiveInput(!0), a.clickCount || a.online.status || a.edit.status || a.FileController.showPopup()
                        });
                        d.init()
                    }
                }
            },
            togglePassiveInput: function(a) {
                !this.isMobileDevice && this.passiveSet && (jQuery.event.special.touchstart = {
                    setup: function(b, c, d) {
                        this.addEventListener("touchstart", d, {
                            passive: a
                        })
                    }
                }, jQuery.event.special.touchmove = {
                    setup: function(b, c, d) {
                        this.addEventListener("touchmove", d, {
                            passive: a
                        })
                    }
                }, jQuery.event.special.wheel = {
                    setup: function(b, c, d) {
                        this.addEventListener("wheel", d, {
                            passive: a
                        })
                    }
                }, jQuery.event.special.mousewheel = {
                    setup: function(b, c, d) {
                        this.addEventListener("mousewheel", d, {
                            passive: a
                        })
                    }
                })
            },
            checkUserAgent: function() {
                if (!this.isApp) {
                    var b = navigator.userAgent.toLowerCase();
                    b.indexOf("safari") == -1 || this.isMobile || this.isTablet || b.indexOf("chrome") > -1 || b.indexOf("opera") > -1 || b.indexOf("opr") > -1 || (this.filter.status = !1, a(".remove-safari").remove()), /MSIE 10/i.test(navigator.userAgent) && this.isIE(), (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) && (a("body").addClass("ie"), this.isIE()), /Edge\/\d./i.test(navigator.userAgent) && this.isIE()
                }
            },
            isIE: function() {
                this.isWindowsIE = !0, a("#resize-pix, .navigation-scroller").hide(), a(".sidebar-preview-tab span").html('<i class="fa fa-home f-nm"></i>'), a(".sidebar-layers-tab span").html('<i class="fa fa-file-o f-nm"></i>'), a(".sidebar-options-tab span").html('<i class="fa fa-sliders f-nm"></i>'), a(".sidebar-tools-tab span").html('<i class="fa fa-wrench f-nm"></i>'), a(".sidebar-online-tab span").html('<i class="fa fa-users f-nm"></i>')
            },
            checkScreenSize: function() {
                var b = a("#frames-placement").height();
                this.online.status && (b = 0);
                var c = a("#drawing-container").height() - b;
                this.screen.width = this.window.width(), this.screen.height = this.window.height(), this.screen.width > 1400 && (this.screen.is_large = !0), this.isMobileDevice || a("#left-sidebar .screen-sizer, #right-sidebar .screen-sizer").height(c)
            },
            begin: function() {
                !this.isApp, this.loadSettings(), a(".older-version-text").remove(), this.options.bgColor && (this.canvas.layer.ctx.fillStyle = this.options.bgColor, this.canvas.layer.ctx.fillRect(0, 0, this.width, this.height)), this.checkScreenSize(), this.checkSmoothing(), this.listerners(), this.showChecker(!0), this.showGrid(!0), this.controllersLoaded = !0, this.ToolController.showOptions()
            },
            ready: function() {
                this.finished = !0, this.finishLoading(), this.PreviewController.close(), this.isPhotoEdit && (this.FileController.importPhotoFromUrl(this.isPhotoEdit), this.edit.status = !0, this.isPhotoEdit = !1), a(".app-start-section").remove(), a(".after-app-ready-show").show();
                var b = this.getStorage("new_draw_per");
                return b && (this.settings.persLayers = "false" != b, this.settings.persLayers && a("#layer-lepard").show()), this.FrameController.updateFramePreview(!1, !0), this.HistoryController.newCanvas(), this.online.status && this.OnlineController.init(), this.checkConditions(), this.ToolController.loadOptions(), this.edit.status || this.isMobile || this.autosave.loaded || this.online.status || this.options.skipNew || this.FileController.showPopup(), a("#debug").length && this.enableDebug(), a("#no-ads").length && (this.ads.status = !1), this.FileController.updateDimensions(), this.loadAds(), this.LayerController.updateList(), this.ZoomController.reset(!0), this.doFinal(), this.app.callback ? this.app.callback(this) : void this.createWatermarkImage()
            },
            doFinal: function() {
                setTimeout(function() {
                    a(".ui-helper-hidden-accessible").remove()
                }, 3e3)
            },
            enableDebug: function() {
                a(".hidden-canvas").removeClass("hidden-canvas"), this.debug = !0
            },
            checkConditions: function() {
                if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
                    this.isChrome = !0;
                    var a = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                    this.chromeVersion = !!a && parseInt(a[2], 10)
                }
            },
            getPixelRatio: function(b, c, d) {
                var e = a("#drawing-canvas-conatiner"),
                    f = !!b,
                    g = b ? b : 75,
                    h = 10,
                    i = 1;
                !f && this.height >= 500 && (g = 75);
                var j = parseInt(e.width()),
                    k = parseInt(e.height());
                g = 10;
                var l = 0,
                    m = (k - g) / this.height;
                if ((this.width > this.height || k > j || this.settings.frames.tile) && (l = (j - g) / this.width), i = m, m > l && l > 0 && (i = l), this.settings.frames.tile && (i = l), !this.isMobile || this.isTablet || this.isApp || (i = k > a(window).width() || this.isApp && !c && k > a(window).width() ? parseInt(a(window).width() - h) / this.width : parseInt(k - h) / this.width, this.isApp || (this.pixelPerfect.status = !0)), i = i <= 0 ? 1 : i, this.isWindowsIE && (i = this.round(i, 1)), !this.isApp && !this.isWindowsIE) {
                    var n = this.round(i, .25),
                        o = n * this.height,
                        p = n * this.width,
                        q = a("#drawing-canvas-conatiner").height(),
                        r = a("#drawing-canvas-conatiner").width(),
                        s = parseInt(q) - parseInt(o),
                        t = parseInt(r) - parseInt(p);
                    this.grid.show = !0, s > 30 && t > 30 || (i = n)
                }
                return (this.settings.tile.status || this.settings.frames.tile) && (i /= 3), this.ratio_size = i - 1, this.zoom["default"] = i, i > this.grid.max_size && (this.zoom["default"] = this.round(i, .5, "down")), i < 1 ? (this.zoom.minZoom = i, a("#zoom-range").attr("min", i)) : a("#zoom-range").attr("min", 1), i = 1, this.previewSize = this.zoom["default"], this.pixel_size = i, i
            },
            render: function() {
                this.loading = !0, this.canvas.display.clear(), this.draw(), this.startData(), this.LayerController.render(), this.endData(), this.loading = !1
            },
            updateData: function() {
                this.isApp && this.app.ready
            },
            mouseEnded: function() {},
            checkSmoothing: function(a) {
                a = a ? a : "display", "CSS" == this.zoom.type
            },
            draw: function() {
                this.ToolController.use()
            },
            debugParse: function(a) {
                ga.debug && console.log(a)
            },
            listerners: function() {
                function b() {
                    c.settings.lockFrames || (a("#frames-container").stop().slideUp(500), d = !1)
                }
                var c = this,
                    d = !1,
                    e = a("#frames-placement");
                this.commonListeners(), this.debug && a(".hidden-canvas").css({
                    visibility: "visible"
                }), a(".prevent-a").click(function(a) {
                    a.preventDefault()
                }), this.isMobile && !this.isTablet || (a(".panel-frames-header").on("pointerdown", function(e) {
                    if (!c.settings.lockFrames && !a(".prevent-panel-up").has(e.target).length) {
                        var f = e.target.id;
                        null != f && "" != f.trim() && f || (f = e.target.parentNode.id), ["preview", "preview-size-change"].indexOf(f) > -1 || (!d || ["duplicate-frame", "add-frame", "preview-size-change", "toggle-frame-panel"].indexOf(f) > -1 ? (a("#frames-container").stop().slideDown(500),
                            d = !0) : b())
                    }
                }), a(document).on("pointerdown", function(a) {
                    d && (e.is(a.target) || 0 !== e.has(a.target).length || b())
                }));
                var f = !1;
                this.isWindowsIE || this.isApp || a(window).resize(function(a) {
                    clearTimeout(f), f = setTimeout(function() {}, 100)
                }), a(".full-screen-toggle").click(function(b) {
                    var d = document.body,
                        e = a("#full-screen-text");
                    c.fullscreen.status = !0, a("#drawing-wrapper").addClass("fullscreen"), c.requestFullScreen(d, e), setTimeout(function() {
                        c.repositionScreen()
                    }, 100)
                }), a(".toggle-sub").mouseup(function() {
                    a("#toolbar").toggleClass("sub-open"), a(this).toggleClass("active")
                }), a(".toggle-sub").mouseover(function() {
                    a("#toolbar").hasClass("sub-open") && (a(".toggle-sub").removeClass("active"), a(this).addClass("active"))
                }), a(".sub-menu-link").click(function() {
                    a(".toggle-sub").removeClass("active")
                }), a(".ad-close").click(function() {
                    c.loadAdsWrapper()
                }), a(".alert-close").click(function() {
                    c.hideAlert()
                }), a(".outlinks-menu .sub-menu-link, .out-l").click(function() {
                    var b = a(this).attr("href");
                    a(this).attr("data-tab") ? window.open(b, "_blank").focus() : window.location.href = b
                }), this.isMobile ? (a("#tools-toggle").mouseup(function() {
                    a("#left-sidebar").toggleClass("active"), a("#right-sidebar").removeClass("active")
                }), a("#layers-toggle").mouseup(function() {
                    a("#right-sidebar").toggleClass("active"), a("#left-sidebar").removeClass("active")
                }), a("#frames-toggle, .close-button-frames").mouseup(function() {
                    a("#frames-placement").hasClass("active") ? a("#frames-placement").removeClass("active") : a("#frames-placement").addClass("active"), a("#right-sidebar").removeClass("active"), a("#left-sidebar").removeClass("active")
                }), a(".close-sidebar-mobile").bind("pointerdown", function() {
                    a("#right-sidebar").removeClass("active"), a("#left-sidebar").removeClass("active")
                }), a(document).bind("pointerdown", function(b) {
                    var c = a("#right-sidebar"),
                        d = a("#left-sidebar"),
                        e = a("#drawing-canvas-conatiner"),
                        f = e.has(b.target).length,
                        g = e.is(b.target);
                    (!c.is(b.target) && 0 === c.has(b.target).length && d.is(b.target) && 0 === d.has(b.target).length || f || g) && (a("#right-sidebar").removeClass("active"), a("#left-sidebar").removeClass("active"))
                }), a(document).bind("mousedown", function(b) {
                    var c = a("#frames-toggle"),
                        d = a("#frames-placement"),
                        e = (a("#left-sidebar"), a("#drawing-canvas-conatiner")),
                        f = e.has(b.target).length;
                    a("#left-sidebar").removeClass("active"), (!c.is(b.target) && 0 === c.has(b.target).length && !d.is(b.target) && 0 === d.has(b.target).length || f) && a("#frames-placement").removeClass("active")
                }), a("canvas").bind("touchstart", function() {
                    a("#frames-placement").removeClass("active")
                }), (this.isMobile || this.isTablet || this.isIpad) && a(document).bind("touchstart", function(b) {
                    var c = a(b.target);
                    c.closest("#toolbar").length || (a("#toolbar").removeClass("sub-open"), a(".toggle-sub").removeClass("active"))
                })) : (a(document).mousedown(function(b) {
                    var d = a(event.target);
                    d.closest("#toolbar").length || (a("#toolbar").removeClass("sub-open"), a(".toggle-sub").removeClass("active")), c.ToolController.hideMulti()
                }), !this.isWindowsIE && !this.isTouch);
                var g = 3;
                a("#right-sidebar .sidebar-content .section").mousedown(function() {
                    a(this).css({
                        "z-index": g++
                    })
                }), a(".dragable").length && a(".dragable").draggable({
                    handle: ".drag-handle"
                })
            },
            checkCanvasZoom: function() {
                var b = this.readCookie("pixil-canvas-zoom");
                b && "true" == b && a(".frames-lock-wrapper").remove()
            },
            changeTheme: function() {
                this.settings.theme.lighter ? (a("#header-logo").attr("src", "/images/public/logo_pixilart_simple_black.png"), a("#drawing-wrapper").addClass("lighter")) : (a("#header-logo").attr("src", "/images/public/logo_pixilart_simple_white.png"), a("#drawing-wrapper").removeClass("lighter"))
            },
            updateImageStorage: function(a) {
                if (this.isApp) {
                    this.FrameController.currentFrame;
                    return this.updateAppPixil(function() {
                        return !0
                    })
                }
            },
            updateAppPixil: function(a) {
                var b = this;
                this.isApp && this.app.ready && this.ExportImportController["export"](!1, function(c) {
                    b.updateAppStorage(c, function() {
                        if (a) return a(c)
                    })
                })
            },
            updateAppFrames: function() {
                return this.updateAppPixil()
            },
            updateFrameSpeed: function(a) {},
            setAppSettings: function() {
                this.app.hideMouse && a(".pixel-trace").addClass("hide-mouse"), this.app.fingerToDraw && a(".pixel-trace").hide()
            },
            setAppInit: function() {},
            updateAppCallback: function() {
                this.appOptionsUpdate(this.app)
            },
            layPixel: function(a, b, c, d, e, f, g, h) {
                c || (a = a ? a : this.mouse.x_0, b = b ? b : this.mouse.y_0);
                var i = this.pixelDrawingSize;
                return e = e ? e : "layer", d = d ? d : this.getDrawingcolor(), 1 == i || f || (a -= i / 2, b -= i / 2), f && (i = f), !("Dithering" != this.tool && this.settings.dithering && !this.ditheringCheck(a, b)) && void this.drawPixel(e, a, b, d, i, g, h)
            },
            drawPixel: function(a, b, c, d, e, f, g) {
                if (.5 != this.mouse.pressure && this.settings.usePressure && (e = Math.round(e * (this.mouse.pressure / 3 * 10)), b = Math.round(b - e / 2), c = Math.round(c - e / 2)), "Brush" == this.tool && this.settings.brush.image && !f) {
                    var h = Math.floor(b - this.settings.brush.width / 2),
                        i = Math.floor(c - this.settings.brush.height / 2),
                        j = this.ToolController.tool.options.solid.value ? this.settings.brush.solid : this.settings.brush.image;
                    1 !== this.ToolController.tool.options.alpha.value && this.canvas[a].setAlpha(this.ToolController.tool.options.alpha.value), this.ToolController.tool.options.pattern.value && (j = this.settings.brush.black, this.canvas.data.putSimple(this.ToolController.backgroundPatternImage, 0, 0), this.canvas.data.ctx.globalCompositeOperation = "destination-in"), this.canvas[a].putSimple(j, h, i), this.ToolController.tool.options.pattern.value && (this.canvas.data.putSimple(this.canvas[a].canvas), this.canvas.data.ctx.globalCompositeOperation = "source-over"), 1 !== this.ToolController.tool.options.alpha.value && this.canvas[a].restoreAlpha()
                } else if (this.settings.roundedPixel && this.mouse.roundImage && ["Pencil", "Line", "Square", "Circle"].indexOf(this.tool) > -1) this.canvas[a].putSimple(this.mouse.roundImage, b, c);
                else {
                    var k = e,
                        l = e;
                    g && (k = g.w, l = g.h), this.canvas[a].ctx.fillStyle = d, this.canvas[a].ctx.fillRect(b, c, k, l)
                }
            },
            getDrawingcolor: function() {
                var a = this.ColorController.color;
                return this.rainbow.status && (a = this.getRainbowColor()), this.randomColor.status && (a = this.getRandomColorPallet()), a
            },
            renderPixel: function(a, b, c, d, e, f, g) {
                c || (a = a ? a : this.mouse.x_0, b = b ? b : this.mouse.y_0), e = e ? e : "rendering", f = f ? f : this.pixelDrawingSize;
                var h = this.mouse.absPosition(a, b),
                    i = this.mouse.absPosition(this.pixelPerfect.last.x, this.pixelPerfect.last.y);
                if (d = d ? d : this.getDrawingcolor(), this.pixelPerfect.status && !g && 1 === f && (this.pixelPerfect.preHistory.indexOf(h) === -1 && this.pixelPerfect.history.indexOf(h) === -1 && this.pixelPerfect.preHistory.push(h), this.pixelPerfect.preHistory.length > 3)) {
                    var j = this.pixelPerfect.preHistory[0];
                    this.pixelPerfect.preHistory.shift(), this.pixelPerfect.history.indexOf(h) === -1 && this.pixelPerfect.history.push(j)
                }
                if (this.pixelPerfect.status && 1 == f && !g) {
                    var k = this.pixelPerfect.direction;
                    this.pixelPerfect.last.x, this.pixelPerfect.last.y;
                    this.pixelPerfect.last.x == a && this.pixelPerfect.last.y == b || this.pixelPerfect.set++, (this.pixelPerfect.last.x == a && this.pixelPerfect.last.y != b && "left" == this.pixelPerfect.direction && this.pixelPerfect.set > 1 || this.pixelPerfect.last.x != a && this.pixelPerfect.last.y == b && "top" == this.pixelPerfect.direction && this.pixelPerfect.set > 1) && this.pixelPerfect.history.indexOf(i) === -1 && (this.canvas[e].ctx.clearRect(this.pixelPerfect.last.x, this.pixelPerfect.last.y, 1, 1), this.mirrorDrawing(!1, "rendering", !0, this.pixelPerfect.last.x, this.pixelPerfect.last.y), this.pixelPerfect.set = 0), this.pixelPerfect.last.x != a && this.pixelPerfect.last.y != b && (this.pixelPerfect.set = 0), this.pixelPerfect.last.x != a && (this.pixelPerfect.last.y == b && (k = "left"), this.pixelPerfect.last.x = a), this.pixelPerfect.last.y != b && (this.pixelPerfect.last.x == a && (k = "top"), this.pixelPerfect.last.y = b), k != this.pixelPerfect.direction && (this.pixelPerfect.set > 1 && (this.pixelPerfect.set = 0), this.pixelPerfect.direction = k)
                }
                if (1 != f && (a -= f / 2, b -= f / 2), "Dithering" != this.tool && this.settings.dithering && !this.ditheringCheck(a, b)) return !1;
                var l = this.pixelDrawingSize;
                ["Dithering"].indexOf(this.tool) > -1 && (l = 1), this.drawPixel(e, a, b, d, l)
            },
            ditheringCheck: function(a, b) {
                var c = this.settings.ditherSpacing;
                return (c > 1 && a % c === 0 && b % c === 0 || 1 == c && (Math.floor(a / c) + Math.floor(b / c)) % 2 === 0) && (this.lastDitheringX = a, this.lastDitheringY = b, !0)
            },
            ditheringLayPixel: function(a, b, c, d, e) {
                var a = a ? a : this.mouse.x_0,
                    b = b ? b : this.mouse.y_0;
                this.ditheringCheck(a, b) && (d && "rendering" == d ? this.renderPixel(a, b, !1, c, !1, 1) : this.layPixel(a, b, !1, c, !1, 1))
            },
            getPixelHex: function(a, b, c) {
                var d = a.getImageData(b, c, 1, 1);
                return this.rgbaToHex(d[0], d[1], d[2])
            },
            getImageData: function(a, b, c, d, e) {
                return a.getImageData(b, c, d, e)
            },
            clearPixel: function(a, b, c, d, e) {
                d = d ? d : "layer";
                var f = this.pixelDrawingSize,
                    g = !1,
                    h = 1;
                c || (a = a ? a : this.mouse.x_0, b = b ? b : this.mouse.y_0), c && (f = 1), 1 != f && (a -= f / 2, b -= f / 2);
                var i = f,
                    j = f;
                e && (i = e.w, j = e.h), this.canvas.data.canvas.width == this.width && this.canvas.data.canvas.height == this.height || (this.canvas.data.canvas.width = this.width, this.canvas.data.canvas.height = this.height), "Eraser" == this.tool && this.ToolController.tool.options.strength.value < 1 && !this.settings.roundedPixel && (g = !0, this.canvas.data.ctx.clearRect(a, b, i, j), this.canvas.data.setAlpha(1 - this.ToolController.tool.options.strength.value), this.canvas.data.putSimple(this.canvas[d].canvas, 0, 0), this.canvas.data.setAlpha(1)), ("Eraser" == this.tool || "Pencil" == this.tool || "Line" == this.tool || "Square" == this.tool) && this.settings.roundedPixel && this.mouse.roundImage && (i += 1, j += 1, g = !0, h = this.ToolController.tools.EraserTool.options.strength.value ? this.ToolController.tools.EraserTool.options.strength.value : h, this.canvas.data.ctx.clearRect(a, b, i, j), this.canvas.data.putSimple(this.canvas[d].canvas, 0, 0), this.canvas.data.ctx.globalCompositeOperation = "destination-out", this.canvas.data.setAlpha(h), this.canvas.data.putSimple(this.mouse.roundImageMouse, a, b), this.canvas.data.setAlpha(1), this.canvas.data.ctx.globalCompositeOperation = "source-over"), this.canvas[d].ctx.clearRect(a, b, i, j), g && this.canvas[d].ctx.drawImage(this.canvas.data.canvas, a, b, i, j, a, b, i, j)
            },
            mouseDistance: function(a, b) {
                a && (this.mouse.x_0 = a), b && (this.mouse.y_0 = b);
                var c = 2 * this.mouse.err;
                return c > -this.mouse.dy && (this.mouse.err = this.mouse.err - this.mouse.dy, this.mouse.x_0 = this.mouse.x_0 + this.mouse.sx), c < this.mouse.dx && (this.mouse.err = this.mouse.err + this.mouse.dx, this.mouse.y_0 = this.mouse.y_0 + this.mouse.sy), this.mouse.x0 = this.mouse.x_0, this.mouse.x1 = this.mouse.x_0, [this.mouse.x_0, this.mouse.x_0]
            },
            mirrorDrawing: function(a, b, c, d, e) {
                if (this.mirror.tools.indexOf(this.tool) !== -1) {
                    var f = !1,
                        g = !1,
                        h = !1;
                    if (this.ToolController.tool.options && this.ToolController.tool.options.mirrorX && this.ToolController.tool.options.mirrorX.value && (g = !0), this.ToolController.tool.options && this.ToolController.tool.options.mirrorY && this.ToolController.tool.options.mirrorY.value && (h = !0), this.keyEvent && this.keyEvent.ctrlKey && ["Pencil"].indexOf(this.tool) !== -1 && (f = !0), this.mouse.active) {
                        d = d ? d : this.mouse.x_0, e = e ? e : this.mouse.y_0;
                        var i = this.width - (d + 1),
                            j = this.height - (e + 1);
                        (this.mirror.x || g) && (f ? this.ditheringLayPixel(i, this.mouse.y_0, a) : b && "rendering" == b ? c ? this.clearPixel(i, e, !1, "rendering") : this.renderPixel(i, this.mouse.y_0, !1, a, !1, !1, !0) : c ? this.clearPixel(i, this.mouse.y_0) : this.layPixel(i, this.mouse.y_0, !1, a)), (this.mirror.y || h) && (f ? this.ditheringLayPixel(this.mouse.x_0, j, a) : b && "rendering" == b ? c ? this.clearPixel(d, j, !1, "rendering") : this.renderPixel(this.mouse.x_0, j, !1, a, !1, !1, !0) : c ? this.clearPixel(this.mouse.x_0, j) : this.layPixel(this.mouse.x_0, j, !1, a)), (this.mirror.x && this.mirror.y || g && h) && (f ? this.ditheringLayPixel(i, j, a) : b && "rendering" == b ? c ? this.clearPixel(i, j, !1, "rendering") : this.renderPixel(i, j, !1, a, !1, !1, !0) : c ? this.clearPixel(i, j) : this.layPixel(i, j, !1, a))
                    }
                }
            },
            rgbaToHex: function(a, b, c) {
                return (a > 255 || b > 255 || c > 255) && (a > 255 && (a = 255), b > 255 && (b = 255), c > 255 && (c = 255)), (a << 16 | b << 8 | c).toString(16)
            },
            trim: function(a) {
                return a.replace(/^\s+|\s+$/gm, "")
            },
            hexToNumber: function(a) {
                return parseInt(a, 16)
            },
            numberToHex: function(a) {
                return a = parseInt(a).toString(16), (a + "000").substring(0, 2)
            },
            rgbToAbgr: function(a) {
                var b = parseInt(a[2]).toString(16),
                    c = parseInt(a[1]).toString(16),
                    d = parseInt(a[0]).toString(16);
                return 1 == d.length && (d = "0" + d), 1 == c.length && (c = "0" + c), 1 == b.length && (b = "0" + b), "0xFF" + (b + "000").substring(0, 2) + (c + "000").substring(0, 2) + (d + "000").substring(0, 2)
            },
            realRgbaToHex: function(a) {
                var b = a.substring(a.indexOf("(")).split(","),
                    c = parseInt(this.trim(b[0].substring(1)), 10),
                    d = parseInt(this.trim(b[1]), 10),
                    e = parseInt(this.trim(b[2]), 10),
                    f = parseFloat(this.trim(b[3].substring(0, b[3].length - 1))).toFixed(2);
                return c.toString(16) + d.toString(16) + e.toString(16) + (255 * f).toString(16).substring(0, 2)
            },
            hexToRgbNew: function(a) {
                var b = new ArrayBuffer(4),
                    c = new DataView(b);
                c.setUint32(0, parseInt(a, 16), !1);
                var d = new Uint8Array(b);
                return [d[1], d[2], d[3]]
            },
            hexToRgb: function(a, b) {
                var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
                return c = c ? {
                    r: parseInt(c[1], 16),
                    g: parseInt(c[2], 16),
                    b: parseInt(c[3], 16)
                } : null, c && b ? [c.r, c.g, c.b] : c
            },
            hexToRgbFast: function(a) {
                var b = parseInt(a, 16),
                    c = b >> 16 & 255,
                    d = b >> 8 & 255,
                    e = 255 & b;
                return {
                    r: c,
                    g: d,
                    b: e
                }
            },
            HSVtoRGB: function(a, b, c) {
                var d, e, f, g, h, i, j, k;
                switch (1 === arguments.length && (b = a.s, c = a.v, a = a.h), g = Math.floor(6 * a), h = 6 * a - g, i = c * (1 - b), j = c * (1 - h * b), k = c * (1 - (1 - h) * b), g % 6) {
                    case 0:
                        d = c, e = k, f = i;
                        break;
                    case 1:
                        d = j, e = c, f = i;
                        break;
                    case 2:
                        d = i, e = c, f = k;
                        break;
                    case 3:
                        d = i, e = j, f = c;
                        break;
                    case 4:
                        d = k, e = i, f = c;
                        break;
                    case 5:
                        d = c, e = i, f = j
                }
                return {
                    r: Math.round(255 * d),
                    g: Math.round(255 * e),
                    b: Math.round(255 * f)
                }
            },
            RGBtoHSV: function(a, b, c) {
                1 === arguments.length && (b = a.g, c = a.b, a = a.r);
                var d, e = Math.max(a, b, c),
                    f = Math.min(a, b, c),
                    g = e - f,
                    h = 0 === e ? 0 : g / e,
                    i = e / 255;
                switch (e) {
                    case f:
                        d = 0;
                        break;
                    case a:
                        d = b - c + g * (b < c ? 6 : 0), d /= 6 * g;
                        break;
                    case b:
                        d = c - a + 2 * g, d /= 6 * g;
                        break;
                    case c:
                        d = a - b + 4 * g, d /= 6 * g
                }
                return {
                    h: d,
                    s: h,
                    v: i
                }
            },
            displayCanvasLocation: function() {
                var a = this.pixel_size,
                    b = a * this.zoom_step,
                    c = this.mouse.x_1 - Math.abs(this.zoom.left / b),
                    d = this.mouse.y_1 - Math.abs(this.zoom.top / b);
                "CSS" == this.zoom.type && (b = 1, c = this.mouse.x_1, d = this.mouse.y_1);
                var e = c * b,
                    f = d * b,
                    g = this.pixelDrawingSize;
                return ["BucketClear", "Bucket", "BucketColor", "Select", "Text", "Spray", "Hand", "Gradient", "ColorPicker", "Move", "Dithering", "Stamp", "LightenDarken", "Brush"].indexOf(this.tool) != -1 && (g = 1), 1 != g && (b = g * b, e -= b / 2, f -= b / 2), {
                    x: e,
                    y: f,
                    pixelSize: b
                }
            },
            createGrid: function(b, c, d) {
                if (b = b ? b : "grid", "undefined" != typeof this.canvas.grid)
                    if ("Canvas" != this.zoom.type && !this.isWindowsIE && this.grid.status) {
                        this.canvas.grid.clear();
                        var e = this.pixel_size * this.ZoomController.zoom,
                            f = this.canvas.grid.ctx;
                        Math.ceil(this.width * e), Math.ceil(this.height * e);
                        if (a("#canvas_grid_image").removeAttr("style"), !(e <= this.grid.max_size)) return e *= this.settings.gridSize, "CSS" == this.zoom.type && (this.canvas.grid.canvas.width = e, this.canvas.grid.canvas.height = e, this.canvas.grid.setSmoothing(), f.moveTo(0, 0), f.lineTo(e, 0), f.moveTo(0, 0), f.lineTo(0, e), f.lineTo(e, e), f.lineTo(e, 0)), f.strokeStyle = "#000000", f.stroke(), this.grid.data = this.canvas.grid.image(), this.canvas.grid.canvas.width = 1, this.canvas.grid.canvas.height = 1, "CSS" == this.zoom.type && this.grid.status && a("#canvas_grid_image").show(), "CSS" == this.zoom.type && (this.grid.data.width = e, this.grid.data.height = e, a("#canvas_grid_image").css({
                            "background-image": "url(" + this.grid.data.src + ")",
                            "background-size": e + "px"
                        })), "grid" != b && this.canvas.grid.clear(), c ? c(!0) : void 0;
                        if (c) return c(!1)
                    } else if (c) return c(!1)
            },
            toggleGridIcon: function(b) {
                var c = a("#grid-icon-toggle");
                c.show(), c.removeClass("active"), a("#canvas_grid_image").hide(), this.grid.status && (c.addClass("active"), "CSS" == this.zoom.type && this.SettingsController.loadCssGrid(this.grid.status)), this.grid.show || c.hide()
            },
            downloadAppCanvas: function(a) {
                if (this.isApp) {
                    var b = this,
                        c = this.canvas[a].dataURL();
                    this.ons.platform.isAndroid() ? this.canvas[a].canvas.toBlob(function(c) {
                        b.ons.downloadAndroid(Date.now() + ".png", c), b.canvas[a]["default"]()
                    }) : this.ons.downloadiOS(c)
                }
            },
            createCssDisplayGrid: function(a) {
                var c = this.width,
                    d = this.height;
                this.canvas.grid = new b(c, d, "grid", (!1), "force", "canvas-layers-appened", this), this.canvas.grid.ctx = this.canvas.grid.context(), this.canvas.grid.canvas.width = 1, this.canvas.grid.canvas.height = 1, this.grid.canvas = !0
            },
            createChecker: function() {
                for (var a = this.canvas.rendering.ctx, b = (this.width * this.pixel_size, this.height * this.pixel_size, 0), c = 0, d = 0, e = 0; e <= this.width; e++)
                    for (var f = 0; f <= this.height; f++) d = e + f, this.isOdd(d) || (b = e, c = f, a.fillRect(b, c, 1, 1));
                this.checker.data = this.canvas.rendering.image(), this.canvas.rendering.clear()
            },
            isEven: function(a) {
                return /^-?\d*[02468]$/.test(a)
            },
            isOdd: function(a) {
                return a % 2
            },
            offImageSmoothing: function(a) {
                this.canvas[a].ctx.imageSmoothingEnabled = !1, this.canvas[a].ctx.msImageSmoothingEnabled = !1, this.canvas[a].ctx.mozImageSmoothingEnabled = !1, this.canvas[a].ctx.webkitImageSmoothingEnabled = !1
            },
            compareImageData: function(a, b) {
                for (var c = 0; c < a.data.length; c += 4) a.data[c + 0] == b.data[c + 0] && a.data[c + 1] == b.data[c + 1] && a.data[c + 2] == b.data[c + 2] && a.data[c + 3] == b.data[c + 3] && (a.data[c + 0] = 0, a.data[c + 1] = 255, a.data[c + 2] = 0, a.data[c + 3] = 255);
                return a
            },
            getColorDataFromImageData: function(a, b, c) {
                for (var d = 0; d < a.data.length; d += 4) {
                    var e = a.data[d + 0] + "," + a.data[d + 1] + "," + a.data[d + 2];
                    this.rgbaToHex(a.data[d + 0], a.data[d + 1], a.data[d + 2]);
                    c.indexOf(e) == -1 && (b.push(a.data[d + 0]), b.push(a.data[d + 1]), b.push(a.data[d + 2]), c.push(e))
                }
                return [b, c]
            },
            getAspectRatio: function(a, b, c, d) {
                var e = Math.min(c / a, d / b);
                return {
                    width: a * e,
                    height: b * e
                }
            },
            sizeUp: function(a, b, c) {
                var d = this;
                a.onload = function() {
                    var a = this.width * b,
                        e = this.height * b;
                    d.canvas.data.clear(), d.canvas.data.canvas.width = a, d.canvas.data.canvas.height = e, d.offImageSmoothing("data"), d.canvas.data.ctx.drawImage(this, 0, 0, a, e), c(d.canvas.data.image())
                }
            },
            canvasToSolid: function(a, b, c, d, e) {
                var f = this,
                    g = [];
                b = b ? b : this.ColorController.color, c = c ? c : 1, f.canvas.data.clear(), f.canvas.data.setSmoothing(), f.canvas.data.canvas.width = a.width, f.canvas.data.canvas.height = a.height;
                try {
                    f.canvas.data.ctx.drawImage(a, 0, 0)
                } catch (h) {
                    if (e) return e(!1);
                    return
                }
                for (var i = f.canvas.data.ctx.getImageData(0, 0, a.width, a.height), j = this.hexToRgb(b), k = 0, l = 0, m = 0; m < i.data.length; m += 4) {
                    k >= a.width && (k = 0, l++);
                    var n = [i.data[m], i.data[m + 1], i.data[m + 2], i.data[m + 3]];
                    i.data[m + 3] > 0 && (n[0] = j.r, n[1] = j.g, n[2] = j.b);
                    var o = {
                        d: n,
                        x: k,
                        y: l
                    };
                    g.push(o), k++
                }
                f.canvas.data.clear(), f.canvas.data.canvas.width = a.width, f.canvas.data.canvas.height = a.height;
                for (var k = 0; k <= g.length - 1; k += 1) {
                    var p = g[k],
                        q = p.d[3] / 225 * c,
                        r = "rgba(" + p.d[0] + "," + p.d[1] + "," + p.d[2] + "," + q + ")";
                    if (f.layPixel(p.x, p.y, !0, r, "data", !0, d), k == g.length - 1) return e ? e(f.canvas.data.dataURL()) : f.canvas.data.image()
                }
            },
            resizeImagetoWidth: function(a, b, c) {
                var d = new Image;
                d.src = a, d.onload = function() {
                    var a = document.createElement("canvas"),
                        e = a.getContext("2d"),
                        f = b / d.width,
                        g = d.height * f;
                    a.width = b, a.height = g, e.imageSmoothingEnabled = !1, e.drawImage(d, 0, 0, b, g);
                    var h = a.toDataURL();
                    return a = null, c(h, b, g)
                }
            },
            resizeImage: function(a, b, c, d, e) {
                var f = this,
                    g = !1;
                "object" == typeof a && (g = a, a = a.image);
                var h = new Image;
                h.crossOrigin = "Anonymous";
                var i = [],
                    j = this.hexToRgb(this.ColorController.color);
                h.onload = function() {
                    f.canvas.data.clear(), f.canvas.data.canvas.width = this.width, f.canvas.data.canvas.height = this.height, f.canvas.data.ctx.drawImage(this, 0, 0);
                    var a = f.canvas.data.ctx.getImageData(0, 0, this.width, this.height),
                        h = 0,
                        k = 0;
                    f.canvas.data["default"]();
                    for (var l = 0; l < a.data.length; l += 4 * b) {
                        h >= this.width && (h = 0, k++);
                        var m = [a.data[l], a.data[l + 1], a.data[l + 2], a.data[l + 3]];
                        e && 255 == m[0] && 255 == m[1] && 255 === m[2] && (m[3] = 0), a.data[l + 3] > 0 && d && (m[0] = j.r, m[1] = j.g, m[2] = j.b);
                        var n = {
                            d: m,
                            x: h,
                            y: k
                        };
                        i.push(n), h++
                    }
                    f.canvas.data.canvas.width = this.width / b, f.canvas.data.canvas.height = this.height / b;
                    for (var h = 0; h <= i.length - 1; h += 1) {
                        var o = i[h],
                            p = o.d[3] / 225,
                            q = "rgba(" + o.d[0] + "," + o.d[1] + "," + o.d[2] + "," + p + ")";
                        f.layPixel(o.x, o.y, !0, q, "data", !0, !0)
                    }
                    if ("function" != typeof c) switch (c) {
                        case "TextTool":
                            f.ToolController["do"]("callback")
                    }
                    "function" == typeof c && c(f.canvas.data.image(), g)
                }, h.src = a
            },
            isPrime: function(a) {
                for (var b = 2; b < a; b++)
                    if (a % b === 0) return !1;
                return 1 !== a && 0 !== a
            },
            fileExtension: function(a) {
                var b = a;
                return b.indexOf("?") >= 0 && (b = b.substr(0, b.indexOf("?"))), b.split(".").pop()
            },
            getResponse: function(b) {
                return a("#" + b).text()
            },
            useSelectTool: function(b, c) {
                return "Stamp" == this.tool || b ? ("Select" != this.tool && this.ToolController.selectTool(a("#select-tool"), "Select", !0), void((!b && !c || this.isApp && !c) && this.SelectController.pasteSelection())) : (this.ToolController.stampCallback(), void this.StampController.hideStampContainer())
            },
            applyDithering: function(a, b, c, d, e, f, g, h, i, j) {
                for (var k = a.data, l = parseInt(d), m = this.generateBayerMatrix(l), n = l * l, o = this.ColorController.color.replace("#", ""), p = this.ColorController.secondary.replace("#", ""), q = this.hexToRgbNew(o), r = this.hexToRgbNew(p), s = [q[0], q[1], q[2], 255], t = [r[0], r[1], r[2], 255], u = 0; u < c; u++)
                    for (var v = u * b * 4, w = 0; w < b; w++) {
                        var x, y = v + 4 * w;
                        x = "radial" === j ? this.getRadialGradientPosition(w, u, e, f, g, h) : this.getLinearGradientPosition(w, u, e, f, g, h), i && (t[3] = 0);
                        var z = m[u % l][w % l],
                            A = (z + .5) / n,
                            B = x < A,
                            C = B ? s : t;
                        k[y] = C[0], k[y + 1] = C[1], k[y + 2] = C[2], k[y + 3] = C[3]
                    }
                return a
            },
            clamp: function(a, b, c) {
                return Math.max(b, Math.min(c, a))
            },
            getLinearGradientPosition: function(a, b, c, d, e, f) {
                var g = e - c,
                    h = f - d,
                    i = g * g + h * h;
                if (0 === i) return 0;
                var j = ((a - c) * g + (b - d) * h) / i;
                return this.clamp(j, 0, 1)
            },
            getRadialGradientPosition: function(a, b, c, d, e, f) {
                var g = Math.hypot(e - c, f - d);
                if (0 === g) return 0;
                var h = Math.hypot(a - c, b - d),
                    i = h / g;
                return this.clamp(i, 0, 1)
            },
            generateBayerMatrix: function(a) {
                return 2 === a ? [
                    [0, 2],
                    [3, 1]
                ] : 4 === a ? [
                    [0, 12, 3, 15],
                    [8, 4, 11, 7],
                    [2, 14, 1, 13],
                    [10, 6, 9, 5]
                ] : 8 === a ? [
                    [0, 48, 12, 60, 3, 51, 15, 63],
                    [32, 16, 44, 28, 35, 19, 47, 31],
                    [8, 56, 4, 52, 11, 59, 7, 55],
                    [40, 24, 36, 20, 43, 27, 39, 23],
                    [2, 50, 14, 62, 1, 49, 13, 61],
                    [34, 18, 46, 30, 33, 17, 45, 29],
                    [10, 58, 6, 54, 9, 57, 5, 53],
                    [42, 26, 38, 22, 41, 25, 37, 21]
                ] : [
                    [0, 12, 3, 15],
                    [8, 4, 11, 7],
                    [2, 14, 1, 13],
                    [10, 6, 9, 5]
                ]
            },
            getColorDistance: function(a, b) {
                var c = a[0] - b[0],
                    d = a[1] - b[1],
                    e = a[2] - b[2];
                return Math.sqrt(c * c + d * d + e * e)
            },
            getGradientPosition: function(a, b, c) {
                var d = this.getColorDistance(a, b),
                    e = this.getColorDistance(a, c),
                    f = d + e;
                if (0 === f) return .5;
                var g = d / f;
                return g
            },
            downloadOptions: function() {
                a(".hide-gif, .show-gif").addClass("hide"), a(".show-gif").addClass("hide"), this.FrameController.frames.length > 1 ? a(".show-gif").removeClass("hide") : a(".hide-gif").removeClass("hide"), this.fileDrawing && a(".submit-drawing-hideable, .autosave-wrapper").hide()
            },
            readFile: function(a, b) {
                var c = this,
                    d = new FileReader,
                    e = a.target.files[0];
                d.onload = function(a) {
                    c.loadImage(a.target.result, function(a) {
                        b(a)
                    })
                }, d.readAsDataURL(e)
            },
            toggleNewFileElements: function(b) {
                this.newShow && "new" == b ? a(".header-new").hide() : a(".old-version-access").hide()
            },
            hidePopup: function() {
                this.closePopup && (a(".popup-close-button").show(), a(".p-header").show(), a(".popup-wrapper").removeClass("autoWidth"), a(".popup-container").hide(), this.TextController.canAssignLetter = !1, this.preventShortcut = !1, this.progress.doPreview = !1, this.newShow = !1, this.popup.open = !1, this.hideAllModals())
            },
            round: function(a, b, c) {
                b || (b = 1);
                var d = 1 / b;
                return c && "up" == c ? Math.ceil(a * d) / d : Math.floor(a * d) / d
            },
            validateImageData: function(a, b) {
                var c = "-px199113-";
                if ("string" != typeof a || "string" == typeof a && a.length > 15350462) return console.info("Image upload failed due to size restrictions. Please contact support for information. Data size: " + a.length), !1;
                if (b) {
                    var d = a.substr(-c.length);
                    if (d != c) return !1
                }
                return a.slice(0, -c.length)
            },
            validateSize: function(a, b) {
                a > this.maxWidth && (this.width = 500), a <= 8 && (this.width = 8), b > this.maxHeight && (this.height = 500), b <= 8 && (this.height = 8)
            },
            detectIE: function() {
                var a = window.navigator.userAgent,
                    b = a.indexOf("MSIE ");
                if (b > 0) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
                var c = a.indexOf("Trident/");
                if (c > 0) {
                    var d = a.indexOf("rv:");
                    return parseInt(a.substring(d + 3, a.indexOf(".", d)), 10)
                }
                var e = a.indexOf("Edge/");
                return e > 0 && parseInt(a.substring(e + 5, a.indexOf(".", e)), 10)
            },
            downloadFile: function(a, b) {
                var c = new Blob([b], {
                    type: "text/plain;charset=utf-8"
                });
                saveAs(c, a)
            },
            requestFullScreen: function(a, b) {
                var c = document.fullscreenElement && null !== document.fullscreenElement || document.webkitFullscreenElement && null !== document.webkitFullscreenElement || document.mozFullScreenElement && null !== document.mozFullScreenElement || document.msFullscreenElement && null !== document.msFullscreenElement;
                c ? (document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(), b.text(this.fullscreen.text)) : (a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullScreen ? a.webkitRequestFullScreen() : a.msRequestFullscreen && a.msRequestFullscreen(), b.text(this.fullscreen.exit))
            },
            getExactXYFromPosition: function(a) {
                var b = Math.floor(a % this.width + 1),
                    c = Math.floor(a / this.width + 1);
                return [b, c]
            },
            repositionScreen: function(a) {
                this.ads.lastRefreshTime && Date.now() < this.ads.lastRefreshTime || (this.checkScreenSize(), this.getPixelRatio(a), this.ZoomController.reset(!0), this.zoom.left = 0, this.zoom.top = 0, this.zoom.pixel_size = 1, this.zoom.ratio = 1, this.zoom_step = 1, this.createGrid(), this.toggleGridIcon(), this.FileController.updateDimensions())
            },
            resizeCanvases: function(b, c, d) {
                var e = this,
                    b = b ? b : this.width;
                c = c ? c : this.height, a.each(this.canvas, function(d, f) {
                    var g = 1,
                        h = e.canvas[f.name];
                    "grid" != f.name && ("display" == h.name && (g = e.pixel_size), "CSS" == e.zoom.type && (a("#canvas-layers-container").width(b * g), a("#canvas-layers-container").height(c * g), g = 1), h.canvas.width = b * g, h.canvas.height = c * g, h.setDefault(h.canvas.width, h.canvas.height), h.clear())
                }), "CSS" == this.zoom.type && this.NavigationController.set(), this.checkSmoothing()
            },
            readCookie: function(a) {
                var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
                return b ? b.pop() : ""
            },
            getCookie: function(a) {
                var b = this.readCookie(a);
                return b ? JSON.parse(b) : {}
            },
            createCookie: function(a, b, c, d) {
                var e = "";
                if (c) {
                    var f = new Date;
                    f.setTime(f.getTime() + 24 * c * 60 * 60 * 1e3), e = "; expires=" + f.toUTCString()
                }
                d && (b = JSON.stringify(b)), document.cookie = a + "=" + b + e + "; path=/"
            },
            eraseCookie: function(a) {
                this.createCookie(a, "", -1)
            },
            putStorage: function(a, b, c) {
                "object" == typeof b && (b = JSON.stringify(b)), this.isApp || (b = this.encodeImage(b));
                var d = new Blob([b]).size;
                if (d > 5e6) return this.showAlert(this.messages("autosave_failed"), 1e4);
                try {
                    localStorage.setItem(a, b)
                } catch (e) {
                    console.log("Localstorage failed. Please save a local copy.")
                }
            },
            encodeImage: function(a) {
                return this.replaceAll(a, ";", "--.--")
            },
            decodeImage: function(a) {
                return this.replaceAll(a, "--.--", ";")
            },
            getStorage: function(a) {
                return localStorage.getItem(a)
            },
            replaceAll: function(a, b, c) {
                return a.replace(new RegExp(b, "g"), c)
            },
            removeTips: function() {
                a("body").append("<style> .ui-tooltip, .ui-tooltip:last-child, .ui-tooltip.ui-widget { display: none !important; } </style>")
            },
            randomIntFromInterval: function(a, b) {
                return Math.floor(Math.random() * (b - a + 1) + a)
            },
            getRandomColor: function() {
                for (var a = "2523456789ABADEF", b = "#", c = 0; c < 6; c++) b += a[Math.floor(16 * Math.random())];
                return b
            },
            getRandomColorPallet: function() {
                var a = this.ColorController.colorPresets[this.ColorController.currentSelection],
                    b = a[Math.floor(Math.random() * a.length)];
                return "#" + b
            },
            toRaingbow: function() {
                function a(a, b, c) {
                    var d = parseInt(a.substring(1), 16),
                        e = parseInt(b.substring(1), 16),
                        f = d >> 16 & 255,
                        g = d >> 8 & 255,
                        h = 255 & d,
                        i = e >> 16 & 255,
                        j = e >> 8 & 255,
                        k = 255 & e,
                        l = Math.round(f + (i - f) * c),
                        m = Math.round(g + (j - g) * c),
                        n = Math.round(h + (k - h) * c);
                    return "#" + ((1 << 24) + (l << 16) + (m << 8) + n).toString(16).slice(1).toUpperCase()
                }
                this.rainbow.smoothInitialized || (this.rainbow.palette = ["#FF0000", "#00FF00", "#0000FF", "#FF00FF"], this.rainbow.fromIndex = 0, this.rainbow.toIndex = 1, this.rainbow.fraction = 0, this.rainbow.increment = .01, this.rainbow.smoothInitialized = !0);
                var b = this.rainbow.palette[this.rainbow.fromIndex],
                    c = this.rainbow.palette[this.rainbow.toIndex],
                    d = a(b, c, this.rainbow.fraction);
                return this.rainbow.fraction += this.rainbow.increment, this.rainbow.fraction >= 1 && (this.rainbow.fraction = 0, this.rainbow.fromIndex = this.rainbow.toIndex, this.rainbow.toIndex = (this.rainbow.toIndex + 1) % this.rainbow.palette.length), this.rainbow.color = d, d
            },
            getRainbowColor: function() {
                function a(a) {
                    a = a.replace("#", "");
                    var b = parseInt(a, 16);
                    return {
                        r: b >> 16 & 255,
                        g: b >> 8 & 255,
                        b: 255 & b
                    }
                }

                function b(a, b, c) {
                    return {
                        r: Math.round(a.r + c * (b.r - a.r)),
                        g: Math.round(a.g + c * (b.g - a.g)),
                        b: Math.round(a.b + c * (b.b - a.b))
                    }
                }

                function c(a, b, c) {
                    var d = ((1 << 24) + (a << 16) + (b << 8) + c).toString(16).slice(1).toUpperCase();
                    return "#" + d
                }
                var d = this.ColorController.colorPresets[this.ColorController.currentSelection],
                    e = d[0];
                if (!d.length) return "#000000";
                if (d.length < 2) return "#" + e.replace("#", "").toUpperCase();
                "undefined" == typeof this.rainbow.index && (this.rainbow.index = 0), "undefined" == typeof this.rainbow.nextIndex && (this.rainbow.nextIndex = 1), "undefined" == typeof this.rainbow.fraction && (this.rainbow.fraction = 0), d[this.rainbow.index] || (this.rainbow.index = 0, this.rainbow.nextIndex = 1), this.rainbow.color || (this.rainbow.color = d[this.rainbow.index]);
                var f = .01;
                this.rainbow.fraction += f, this.rainbow.fraction >= 1 && (this.rainbow.fraction = 0, this.rainbow.index = this.rainbow.nextIndex, this.rainbow.nextIndex = (this.rainbow.index + 1) % d.length);
                var g = d[this.rainbow.index],
                    h = d[this.rainbow.nextIndex];
                if (!g || !h || "" == g.trim() || "" == h.trim()) return this.ColorController.color;
                var i = a(g),
                    j = a(h),
                    k = b(i, j, this.rainbow.fraction),
                    l = c(k.r, k.g, k.b);
                return this.rainbow.color = l.replace("#", "").toUpperCase(), l
            },
            randomArray: function(a) {
                return a[Math.floor(Math.random() * a.length)]
            },
            getBaseSize: function(a) {
                var b = "data:image/png;base64,";
                return Math.round(3 * (a.length - b.length) / 4)
            },
            getDrawnPixels: function(a, b, c, d, e, f, g) {
                b = b ? b : "layer";
                var h = e ? e : this.width,
                    i = f ? f : this.height;
                h > 2e3 && (h = 2e3), i > 2e3 && (i = 2e3);
                var j = this.canvas[b].ctx.getImageData(0, 0, h, i),
                    k = this.getBaseSize(this.canvas[b].dataURL());
                k > 15e3 && !g && (c = !1, this.colorsRgbaArray = !1);
                var e = 0,
                    f = 0,
                    l = "0",
                    m = 0,
                    n = "0",
                    o = 0,
                    p = 0,
                    q = 0,
                    r = [];
                d || (this.colorsRgbaArray = []);
                for (var s = "", t = !0, u = 0; u < j.data.length; u += 4)
                    if (t = !0, p >= h && (p = 0, q++), j.data[u + 3] > 0 && (s = j.data[u] + "" + j.data[u + 1] + j.data[u + 2] + j.data[u + 3], c && (this.arraySearch(r, s) || (r.push(s), this.colorsRgbaArray.push(j.data[u]), this.colorsRgbaArray.push(j.data[u + 1]), this.colorsRgbaArray.push(j.data[u + 2]), this.colorsRgbaArray.push(j.data[u + 3]))), d && d.length && this.colorsRgbaArray.length && (this.arrayRgbaSearch(this.colorsRgbaArray, [j.data[u], j.data[u + 1], j.data[u + 2], j.data[u + 3]]) ? j.data[u + 3] = 255 : (j.data[u + 3] = 0, t = !1)), t && (p >= m && (m = p), q >= o && (o = q), ("0" === l || "0" !== l && p < l) && (l = p), ("0" === n || "0" !== n && q < n) && (n = q))), p++, p >= h && q >= i - 1) return e = m - (l - 1), f = o - (n - 1), a(j, e, f, l, n, m, o, r)
            },
            arrayRgbaSearch: function(a, b) {
                for (var c = 3, d = 0; d < a.length; d += 4) {
                    if (b[0] - c < a[d] && b[0] + c > a[d] && b[1] - c < a[d + 1] && b[1] + c > a[d + 1] && b[2] - c < a[d + 2] && b[2] + c > a[d + 2]) return !0;
                    if (d === a.length) return !1
                }
            },
            arraySearch: function(a, b) {
                for (var c = 0; c < a.length; c++) {
                    if (a[c] === b) return !0;
                    if (c === a.length) return !1
                }
            },
            capitalizeFirstLetter: function(a) {
                return a.charAt(0).toUpperCase() + a.slice(1)
            },
            showAlert: function(b, c, d) {
                var e = this,
                    f = 270;
                this.hideAlert(), clearTimeout(this.alert.s), c = c ? c : 3e3, this.isMobile && (f = 20);
                var g = a("#response-message.alert-response-container");
                g.addClass("active"), g.animate({
                    right: f
                }, 250), a("#response-message .alert-response-wrapper").removeClass("success"), a("#response-message .alert-response").text(b), "success" == d && a("#response-message .alert-response-wrapper").addClass("success"), this.alert.s = setTimeout(function() {
                    e.hideAlert()
                }, c)
            },
            hideAlert: function() {
                var b = a("#response-message.alert-response-container");
                b.removeClass("active"), b.css({
                    right: 250
                })
            },
            getScaleUpRatioDecimal: function(a) {
                var b = a ? a : 1400,
                    c = b / this.width,
                    d = b / this.height,
                    e = g * this.width,
                    f = g * this.height,
                    g = Math.max(c, d);
                return (e >= this.maxRatioWidth || f >= this.maxRatioHeight) && (g = Math.min(c, d)), g
            },
            getScaleUpRatio: function(a) {
                var b = a ? a : 1200,
                    c = Math.round(b / this.width),
                    d = Math.round(b / this.height),
                    e = Math.round(1400 / this.width),
                    f = Math.round(1400 / this.height),
                    g = Math.max(c, d);
                1 != g || a || (g = Math.max(e, f));
                var h = g * this.width,
                    i = g * this.height;
                return (h >= this.maxRatioWidth || i >= this.maxRatioHeight) && (g = Math.min(e, f)), g
            },
            arrangeImages: function(a, b) {
                function c(a, b) {
                    return a.data_id < b.data_id ? -1 : a.data_id > b.data_id ? 1 : 0
                }
                return a.sort(c), b(a)
            },
            isImage: function(a) {
                return a instanceof HTMLImageElement
            },
            loadImage: function(a, b) {
                if (this.isImage(a)) return b(a);
                if (!a) return !1;
                var c = new Image;
                c.onload = function() {
                    return b(this)
                }, c.src = a
            },
            b64toBlob: function(a, b) {
                b = b || "";
                for (var c = 1024, d = atob(a), e = d.length, f = Math.ceil(e / c), g = new Array(f), h = 0; h < f; ++h) {
                    for (var i = h * c, j = Math.min(i + c, e), k = new Array(j - i), l = i, m = 0; l < j; ++m, ++l) k[m] = d[l].charCodeAt(0);
                    g[h] = new Uint8Array(k)
                }
                return new Blob(g, {
                    type: b
                })
            },
            customLog: function(b, c) {
                c = c ? c : "debug-log-container", a(".debug-log-container").prepend("<p>" + b + "</p>")
            },
            newDrawing: function(b, d, e) {
                var f = this.zoom.type;
                this.zoom_ratio = 1, this.zoom_step = 1, this.zoom = {
                    type: f,
                    left: 0,
                    top: 0,
                    ratio: 1,
                    pixel_size: 1
                }, d && (this.width = d), e && (this.height = e), this.HistoryController.undo = [], this.HistoryController.redo = [], this.LayerController.layers = [], this.FrameController.frames = [];
                var g = new c(0, "Background");
                g.init(), this.LayerController.currentLayer = 0, this.FrameController.currentFrame = 0, this.FrameController.init(b), this.LayerController.init(g), this.ColorController.initColors(), this.app.frames = !1, b || (a(document).off("click", ".select-frame"), a(".frame-delete").unbind("click"), a(".add-frame").unbind("click"), a(".duplicate-frame").unbind("click"), this.ColorController.listenersRedo(), this.FrameController.listeners(), this.ToolController.listeners(), this.HistoryController.listeners())
            },
            getBinarySize: function(a) {
                return (new TextEncoder).encode(a).length
            },
            messages: function(a) {
                switch (a) {
                    case "filesize":
                        return "Image too large.";
                    case "online_layer":
                        return "You can only edit your layer while online drawing.";
                    case "layer_locked":
                        return "Could not use " + this.tool.toLowerCase() + " tool because layer is locked.";
                    case "layer_locked_delete":
                        return "Could not delete layer because layer is locked.";
                    case "layer_locked_alter":
                        return "Could not alter layer because layer is locked.";
                    case "autosave_failed":
                        return "Autosave failed. Please save a local copy."
                }
                return "There was an error"
            },
            createCanvas: function(a, c, d, e) {
                return c = c ? c : this.width, d = d ? d : this.height, this.canvas[a] ? (this.canvas[a].canvas.width = c, this.canvas[a].canvas.height = d, this.canvas[a].ctx.clearRect(0, 0, c, d), e ? e() : this.canvas[a]) : (this.canvas[a] = new b(c, d, a, (!0), (!1), (!1), this), this.canvas[a].ctx = this.canvas[a].context(), e ? e() : this.canvas[a])
            },
            layerOptionsFilter: function(a, b) {
                if (!this.filter.status) return "none";
                b = b ? b : 1;
                var c = "none",
                    d = !1;
                if (a.options.filter) {
                    c = "";
                    var e = a.options.filter;
                    !e.dropshadow_x && e.dropshadow && a.dropshadowOptions(e.dropshadow);
                    for (var f in e)
                        if ("dropshadow" != f && e[f])
                            if (f.indexOf("dropshadow_") > -1) {
                                var g = parseInt(e.dropshadow_x),
                                    h = parseInt(e.dropshadow_y),
                                    i = parseInt(e.dropshadow_blur);
                                if ((g || h || i) && !d) {
                                    var j = "rgba(0, 0, 0, " + e.dropshadow_alpha + ")";
                                    c += "drop-shadow(" + g + "px " + h + "px " + i + "px " + j + ") ", d = !0
                                }
                            } else c += f + "(" + e[f] + ") "
                }
                return c
            },
            filterBrightness: function(a, b, c) {
                for (var d = parseInt(b) / 100, e = c ? c : new Uint8ClampedArray(this.filter.imageData.data), f = 0; f < e.length; f += 4) {
                    var g = e[f],
                        h = e[f + 1],
                        i = e[f + 2],
                        j = d * g,
                        k = d * h,
                        l = d * i;
                    e[f] = j, e[f + 1] = k, e[f + 2] = l
                }
                return c ? e : void this.filter.newImageData.data.set(e)
            },
            filterContrast: function(a, b, c) {
                for (var d = parseInt(b) / 100, e = c ? c : new Uint8ClampedArray(this.filter.imageData.data), f = 0; f < e.length; f += 4) e[f] = 255 * ((e[f + 0] / 255 - .5) * d + .5), e[f + 1] = 255 * ((e[f + 1] / 255 - .5) * d + .5), e[f + 2] = 255 * ((e[f + 2] / 255 - .5) * d + .5);
                return c ? e : void this.filter.newImageData.data.set(e)
            },
            filterGrayscale: function(a, b, c) {
                for (var d = parseInt(b) / 100, e = c ? c : new Uint8ClampedArray(this.filter.imageData.data), f = 0; f < e.length; f += 4) {
                    var g = .2126 * e[f] + .7152 * e[f + 1] + .0722 * e[f + 2];
                    e[f] += (g - e[f]) * d, e[f + 1] += (g - e[f + 1]) * d, e[f + 2] += (g - e[f + 2]) * d
                }
                return c ? e : void this.filter.newImageData.data.set(e)
            },
            filterSepia: function(a, b, c) {
                for (var d = parseInt(b) / 100, e = c ? c : new Uint8ClampedArray(this.filter.imageData.data), f = 0; f < e.length; f += 4) {
                    var g = e[f + 0],
                        h = e[f + 1],
                        i = e[f + 2];
                    e[f + 0] = (.393 * g + .769 * h + .189 * i) * d + g * (1 - d), e[f + 1] = (.349 * g + .686 * h + .168 * i) * d + h * (1 - d), e[f + 2] = (.272 * g + .534 * h + .131 * i) * d + i * (1 - d)
                }
                return c ? e : void this.filter.newImageData.data.set(e)
            },
            filterInvert: function(a, b, c) {
                for (var d = parseInt(b) / 100, e = c ? c : new Uint8ClampedArray(this.filter.imageData.data), f = 0; f < e.length; f += 4) e[f + 0] = Math.abs(e[f + 0] - 255 * d), e[f + 1] = Math.abs(e[f + 1] - 255 * d), e[f + 2] = Math.abs(e[f + 2] - 255 * d);
                return c ? e : void this.filter.newImageData.data.set(e)
            },
            filterBlur: function(a, b, c, d, e, f) {
                var g = c ? c : this.filter.imageData.data,
                    h = c ? c : new Uint8ClampedArray(g),
                    i = parseInt(b);
                f = f ? f : 3;
                for (var d = d ? d : this.width, e = e ? e : this.height, j = i, k = f; k-- > 0;) {
                    for (var l = new Uint8ClampedArray(h.length), m = 0; m < e; m++)
                        for (var n = m * d * 4, o = 0; o < d; o++) {
                            for (var p = 0, q = 0, r = 0, s = 0, t = 0, u = -j; u <= j; u++) {
                                var v = o + u;
                                if (v >= 0 && v < d) {
                                    var w = n + 4 * v,
                                        x = h[w + 3] / 255;
                                    p += h[w] * x, q += h[w + 1] * x, r += h[w + 2] * x, s += x, t += x
                                }
                            }
                            var w = n + 4 * o;
                            t > 0 ? (l[w] = p / t, l[w + 1] = q / t, l[w + 2] = r / t, l[w + 3] = s / (2 * j + 1) * 255) : (l[w] = 0, l[w + 1] = 0, l[w + 2] = 0, l[w + 3] = 0)
                        }
                    h.set(l);
                    for (var o = 0; o < d; o++)
                        for (var m = 0; m < e; m++) {
                            for (var p = 0, q = 0, r = 0, s = 0, t = 0, y = -j; y <= j; y++) {
                                var z = m + y;
                                if (z >= 0 && z < e) {
                                    var w = 4 * (z * d + o),
                                        x = h[w + 3] / 255;
                                    p += h[w] * x, q += h[w + 1] * x, r += h[w + 2] * x, s += x, t += x
                                }
                            }
                            var w = 4 * (m * d + o);
                            t > 0 ? (l[w] = p / t, l[w + 1] = q / t, l[w + 2] = r / t, l[w + 3] = s / (2 * j + 1) * 255) : (l[w] = 0, l[w + 1] = 0, l[w + 2] = 0, l[w + 3] = 0)
                        }
                    h.set(l)
                }
                return c ? h : void this.filter.newImageData.data.set(h)
            },
            hideAllModals: function() {
                a("#popup-container, #importing-modal, #new-modal").hide()
            },
            showPopup: function(b, c, d, e, f) {
                var g = ".p-body";
                this.hideAllModals(), "new" == b ? (a("#new-modal").show(), a("#new-modal .new-width").val(this.width), a("#new-modal .new-height").val(this.height)) : "import" == b ? (a("#importing-modal").show(), a("#start-import-fetch")[0].click()) : a("#popup-container, #popup-container .p-content-sidebar-head").show(), a("#popup-container .error-submitting").hide(), a("#popup-container .p-content").removeClass("mobile"), a(g).removeClass("blueBackground"), a(g + ", .p-content-sidebar-head").removeClass("g"), a("#popup-container .popup-wrapper").removeClass("stampWidth"), a("#popup-container .popup-wrapper").removeClass("autoWidth");
                var h = "",
                    i = !1,
                    j = !1,
                    k = !1,
                    l = !1,
                    m = !1,
                    n = !1,
                    o = !1,
                    p = !1;
                switch (b) {
                    case "settings":
                        h = '<i class="fa fa-cogs" aria-hidden="true"></i> ' + this.getResponse("res-modal-settings"), j = !0, k = !0;
                        break;
                    case "download":
                        h = '<i class="fa fa-download" aria-hidden="true"></i> ' + this.getResponse("res-modal-download"), j = !0, l = !0;
                        break;
                    case "palettes":
                        h = '<i class="fa fa-eyedropper" aria-hidden="true"></i> ' + this.getResponse("res-modal-palette"), j = !0, l = !0;
                        break;
                    case "stamp":
                        h = '<i class="fa fa-puzzle-piece" aria-hidden="true"></i> ' + this.getResponse("res-modal-new-stamp"), m = !0;
                        break;
                    case "new":
                        h = '<i class="fa fa-file-image-o" aria-hidden="true"></i> ' + this.getResponse("res-modal-new-drawing"), i = !0;
                        break;
                    case "resize":
                        h = '<i class="fa fa-crop" aria-hidden="true"></i> ' + this.getResponse("res-modal-resize-drawing");
                        break;
                    case "submit":
                        h = '<i class="fa fa-flag" aria-hidden="true"></i> ' + this.getResponse("res-modal-save-drawing"), j = !0;
                        break;
                    case "info":
                        h = '<i class="fa fa-keyboard-o" aria-hidden="true"></i> ' + this.getResponse("res-modal-keys"), j = !0;
                        break;
                    case "about":
                        h = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + this.getResponse("res-modal-about"), j = !0;
                        break;
                    case "submit_download":
                        h = '<i class="fa fa-download" aria-hidden="true"></i> ' + this.getResponse("res-modal-download-drawing");
                        break;
                    case "bad-browser":
                        h = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + this.getResponse("res-modal-bad");
                        break;
                    case "auto-save-loaded":
                        h = '<i class="fa fa-life-ring" aria-hidden="true"></i> ' + this.getResponse("res-modal-autosave");
                        break;
                    case "select-information":
                        h = '<i class="fa fa-question-circle" aria-hidden="true"></i> ' + this.getResponse("res-modal-select");
                        break;
                    case "custom-text":
                        h = '<i class="fa fa-font" aria-hidden="true"></i> ' + this.getResponse("res-modal-font"), m = !0;
                        break;
                    case "brushes":
                        h = '<i class="fa fa-brush" aria-hidden="true"></i> ' + this.getResponse("res-modal-brushes"), m = !0;
                        break;
                    case "colors":
                        h = '<i class="fa fa-eyedropper" aria-hidden="true"></i> ' + this.getResponse("res-modal-colors");
                        break;
                    case "getting-link":
                        h = '<i class="fa fa-flag" aria-hidden="true"></i> ' + this.getResponse("res-modal-getting"), n = !0, o = !0;
                        break;
                    case "new-letter":
                        h = '<i class="fa fa-font" aria-hidden="true"></i> ' + this.getResponse("res-modal-assign"), m = !0, n = !0;
                        break;
                    case "progress":
                        h = '<i class="fa fa-film" aria-hidden="true"></i> ' + this.getResponse("res-modal-current"), j = !0;
                        break;
                    case "mobile":
                        h = '<i class="fa fa-mobile" aria-hidden="true"></i> ' + this.getResponse("res-modal-mobile"), j = !0, p = !0;
                        break;
                    case "layer":
                        h = '<i class="fa fa-sticky-note-o" aria-hidden="true"></i> Layer Properties', j = !0;
                        break;
                    case "developer":
                        h = "Developer";
                        break;
                    default:
                        j = !0
                }
                a("#popup-container .p-content-btn").removeClass("active"), a("#popup-container .p-" + b).addClass("active"), a(g).html(c), this.preventShortcut = !0, f && (this.closePopup = !1), (k || l) && (this.downloadOptions(), this.giftransparent && a("#giftransparent").prop("checked", this.giftransparent)), "submit" == b && (this.FrameController.frames.length > 1 && a("#popup-container .upload-replay-toggle").remove(), a("#submit_title").val(this.edit.title), a("#submit_description").val(this.edit.description), this.isExternal && this.SubmitController.hideArtOptions()), e && a("#popup-container .popup-wrapper").addClass("autoWidth"), d ? a("#popup-container .popup-close-button").hide() : a("#popup-container .popup-close-button").show(), h ? a("#live-header").show().html(h) : a("#live-header").hide(), p && a("#popup-container .p-content").addClass("mobile"), m && a(g + ", #popup-container .p-content-sidebar-head").addClass("g"), n && a("#popup-container .p-content-sidebar-head").hide(), o && a("#popup-container .popup-wrapper").width(410), "download" == b && this.SettingsController.changeRation(!1, this.downloadSizes.frame), this.popup.open = !0, this.toggleNewFileElements(b)
            },
            startData: function(a) {
                var b = this;
                if (this.showChecker(), this.showOnionSkin(), this.useSeperateBottomLayers)
                    for (var c = 0; c < this.bottomLayers.length; c++) {
                        var d = this.bottomLayers[c];
                        this.canvas.display.ctx.filter = this.layerOptionsFilter(d), "source-atop" == d.options.blend && d.active && this.bottomLayers[c - 1] && this.bottomLayers[c - 1].active ? this.clipRender(d, this.bottomLayers[c - 1], function(a) {
                            b.canvas.display.putImageData(a, 1, b.zoom)
                        }) : (this.canvas.display.ctx.globalCompositeOperation = d.options.blend, this.canvas.display.putImageData(d.src, d.opacity, this.zoom))
                    } else this.hasBottomLayers && this.canvas.display.putImageData(this.canvas.bottom.canvas, 1, this.zoom);
                this.canvas.display.ctx.globalCompositeOperation = "source-over", this.canvas.display.ctx.filter = "none"
            },
            endData: function() {
                var a = this;
                if (this.useSeperateTopLayers)
                    for (var b = 0; b < this.topLayers.length; b++) {
                        var c = this.topLayers[b];
                        if (this.canvas.display.ctx.filter = this.layerOptionsFilter(c), "source-atop" == c.options.blend) {
                            var d = this.topLayers[b - 1],
                                e = !1;
                            d || (d = this.LayerController.layers[this.LayerController.currentLayer], e = this.canvas.layer.canvas), d && d.active && c.id - 1 == d.id && this.clipRender(c, d, function(b) {
                                a.canvas.display.putImageData(b, 1, a.zoom)
                            }, !1, e)
                        } else this.canvas.display.ctx.globalCompositeOperation = c.options.blend, this.canvas.display.putImageData(c.src, c.opacity, this.zoom)
                    } else this.hasTopLayers && this.canvas.display.putImageData(this.canvas.top.canvas, 1, this.zoom);
                if (this.canvas.display.ctx.globalCompositeOperation = "source-over", this.canvas.display.ctx.filter = "none", this.renderAfter.length)
                    for (var b = 0; b < this.renderAfter.length; b++) {
                        var f = this.renderAfter[b];
                        this.canvas.display.putImageData(f, 1, this.zoom)
                    }
                this.renderAfter = [], this.showTopOnion(), this.updateTileCanvases()
            },
            clipRender: function(a, b, c, d, e, f) {
                var f = f ? f : "extended",
                    g = this;
                if (!this.canvas[f]) return this.createCanvas(f, !1, !1, function() {
                    g.clipRender(a, b, c, d, e, f)
                });
                if (this.canvas[f].canvas.width == this.width && this.canvas[f].canvas.height == this.height || (this.canvas[f].canvas.width = this.width, this.canvas[f].canvas.height = this.height), this.canvas[f].clear(), b.active) {
                    var h = e ? e : b.src;
                    this.canvas[f].ctx.globalCompositeOperation = b.options.blend, this.canvas[f].putImageData(h, b.opacity)
                }
                if (a.active) {
                    var i = d ? d : a.src;
                    this.canvas[f].ctx.globalCompositeOperation = a.options.blend, this.canvas[f].putImageData(i, a.opacity)
                }
                return this.canvas[f].ctx.globalCompositeOperation = "source-over", c(this.canvas[f].canvas)
            },
            setOnionSkin: function(a) {
                var b = this;
                if (this.onionSkin.top_image = !1, this.FrameController.frames.length >= 1) {
                    var c = parseInt(this.FrameController.currentFrame),
                        d = this.FrameController.frames[c - 1],
                        e = "CSS" == this.zoom.type ? 1 : this.pixel_size;
                    if (0 != c) {
                        var f = new Image;
                        this.LayerController.flatten(d.layers, !1, e, function(a) {
                            if (c + 1 <= b.FrameController.frames.length - 1) {
                                d = b.FrameController.frames[c + 1];
                                var g = new Image;
                                g.src = b.LayerController.flatten(d.layers, !1, e), b.onionSkin.top_image = g
                            }
                            f.src = a, b.onionSkin.image = f
                        })
                    }
                }
            },
            showOnionSkin: function(a, b) {
                if (this.FrameController.frames.length > 1 && this.onionSkin.status && 0 != this.FrameController.currentFrame)
                    if (a && this.onionSkin.image) {
                        var c = this;
                        this.onionSkin.image.onload = function() {
                            c.canvas.display.putImageData(this, c.onionSkin.opacity, c.zoom), c.render()
                        }
                    } else this.onionSkin.image && this.canvas.display.putImageData(this.onionSkin.image, this.onionSkin.opacity, this.zoom)
            },
            showTopOnion: function() {
                var a = this.FrameController.currentFrame;
                this.onionSkin && this.onionSkin.top_status && this.onionSkin.top_image && a != this.FrameController.frames.length - 1 && this.canvas.display.putImageData(this.onionSkin.top_image, this.onionSkin.top_opacity, this.zoom)
            },
            showGrid: function(a) {
                if (this.grid.status) {
                    if ("CSS" == this.zoom.type && a && this.resetGrid(), "CSS" == this.zoom.type || "Canvas" == this.zoom.type) return;
                    if (a) {
                        var b = this;
                        this.grid.data.onload = function() {
                            b.canvas.display.putImageData(this, b.grid.opacity, b.zoom)
                        }
                    } else this.canvas.display.putImageData(this.grid.data, this.grid.opacity, this.zoom)
                }
            },
            resetGrid: function() {
                a("#canvas_grid").remove()
            },
            showChecker: function(a, b) {
                if (this.checker.data && !b || this.createChecker(), this.checker.status)
                    if (a) {
                        var c = this;
                        this.checker.data.onload = function() {
                            c.canvas.display.putImageData(this, c.checker.opacity, c.zoom), c.render()
                        }
                    } else this.canvas.display.putImageData(this.checker.data, this.checker.opacity, this.zoom)
            },
            tracing: function() {
                this.backgroundImage.status && this.backgroundImage.image && "" != this.backgroundImage.image.trim() ? a("#canvas_display").css("background-image", 'url("' + this.backgroundImage.image + '")') : a("#canvas_display").css("background-image", "none")
            },
            renderEditImage: function(a) {
                this.edit.image = a, this.putEditImage(a)
            },
            getEditImage: function() {
                var a = this;
                if ("gif" == this.fileExtension(this.edit.image_src)) return this.GifController.load(this.edit.image_src);
                if (this.app.frames) return this.GifController.loadAppDrawing();
                var b = new Image;
                b.crossOrigin = "Anonymous", b.onload = function() {
                    a.edit.resize ? a.resizeImage(this.src, a.edit.resize, function(b) {
                        a.renderEditImage(b)
                    }) : a.renderEditImage(this.src)
                }, b.src = this.edit.image_src
            },
            putEditImage: function(a) {
                var b = this;
                a.onload = function() {
                    b.canvas.layer.putSimple(this), b.ToolController.tool.currentImage = this, b.ready(), b.render(), b.ToolController.tool.restore()
                }
            },
            backgroundImageRepeat: function(a, b, c, d, e) {
                var f = this;
                d = d ? d : this.width, e = e ? e : this.height, this.canvas[a].clear(), this.canvas[a].canvas.width = d, this.canvas[a].canvas.height = e, this.loadImage(b, function(b) {
                    for (var g = b.width, h = b.height, i = Math.abs(d / g), j = Math.abs(e / h), k = 0; k < i; k++)
                        for (var l = k * g, m = 0; m < j; m++) {
                            var n = m * h;
                            if (f.canvas[a].putSimple(b, l, n), k >= i - 1 && m >= j - 1) return c()
                        }
                })
            },
            updateDisplayCanvas: function(a, b) {
                this.finished && (this.layerAboveCache = !1, this.layerBelowCache = !1, this.renderLocationLayers(a, b))
            },
            canvasAddTop: function(a, b) {
                var c = this;
                return this.canvas.top ? (this.canvas.top.ctx.filter = this.layerOptionsFilter(b), void this.canvas.top.putImageData(a, b.opacity)) : this.createCanvas("top", !1, !1, function() {
                    c.canvasAddTop(a, b)
                })
            },
            canvasAddBottom: function(a, b) {
                var c = this;
                return this.canvas.bottom ? (this.canvas.bottom.ctx.filter = this.layerOptionsFilter(b), void this.canvas.bottom.putImageData(a, b.opacity)) : this.createCanvas("bottom", !1, !1, function() {
                    c.canvasAddBottom(a, b)
                })
            },
            renderLocationLayers: function(a, b) {
                this.canvas.top && this.canvas.top["default"](), this.canvas.bottom && this.canvas.bottom["default"]();
                a[this.LayerController.currentLayer];
                this.topLayers = [], this.bottomLayers = [], this.useSeperateTopLayers = !1, this.useSeperateBottomLayers = !1, this.hasTopLayers = !1, this.hasBottomLayers = !0;
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    if (c != b && d.active && 0 !== d.opacity) {
                        var e = d.src;
                        c > b ? (this.hasTopLayers = !0, this.topLayers.push(d), this.canvasAddTop(e, d), "source-over" != d.options.blend && (this.useSeperateTopLayers = !0)) : (this.hasBottomLayers = !0, this.bottomLayers.push(d), this.canvasAddBottom(e, d), "source-over" != d.options.blend && (this.useSeperateBottomLayers = !0))
                    }
                }
            },
            renderGlobalDither: function(a) {
                for (var b = this.canvas[a].ctx.getImageData(0, 0, this.width, this.height), c = new Uint32Array(b.data.buffer), d = 0; d < c.length; d += 1) {
                    var e = this.getExactXYFromPosition(d);
                    this.ditheringCheck(e[0], e[1]) || (c[d] = "0x00000000")
                }
                this.canvas[a].ctx.putImageData(b, 0, 0)
            },
            stampsTemplate: function(a, b) {
                return a.resize = "1", a.stamp_favorites_id = a.stamp_favorites_id ? a.stamp_favorites_id : "false", '<div class="stamp-pre selectable-stamp smp-' + a.id + '"><div class="stamp-data">' + this.addDeleteStampButton(b, a) + this.addApproveStampButton(b, a) + this.favoriteIcon(a) + '<div class="stamp-pre-image" style="background-image:url(' + a.imageData + ')"  data-id="' + a.id + '" data-resize="' + a.is_old + '" data-image="' + a.imageData + '-px199113-"></div><div class="stamp-pre-title">' + this.lockIcon(a.is_private) + a.title + "</div></div></div>"
            },
            addDeleteStampButton: function(a, b) {
                if (a && "object" == typeof a) return a.user || a.admin ? '<span class="delete-stamp-btn" data-id="' + b.id + '" title="Delete Stamp"><i class="fa fa-trash fa-fw" aria-hidden="true"></i></span>' : ""
            },
            lockIcon: function(a) {
                return a ? '<span class="private-stamp-icon" title="Stamp is Private"><i class="fa fa-lock" aria-hidden="true"></i></span> ' : ""
            },
            favoriteIcon: function(a) {
                var b = a.favorite ? "active" : "";
                return this.isAuth ? '<span class="stamp-btn favorite-stamp-btn ' + b + '" data-id="' + a.id + '" title="Star Stamp"><i class="fa fa-star fa-fw" aria-hidden="true"></i></span>' : ""
            },
            addApproveStampButton: function(a, b) {
                if (a && "object" == typeof a) return a.admin && !b.is_approved ? '<span class="approve-stamp-btn" data-id="' + b.id + '" title="Approve Stamp"><i class="fa fa-check fa-fw" aria-hidden="true"></i></span>' : ""
            },
            timerAutoSave: function() {
                var a = this;
                this.autosave.status && !this.fileDrawing && this.createAutoSaveData(function(b) {
                    JSON.parse(JSON.stringify(b));
                    a.databaseSavePixil(b, function() {
                        console.log("autosave complete")
                    }), a.autosave.timeout = setTimeout(function() {
                        a.timerAutoSave()
                    }, a.autosave.timer)
                })
            },
            createAutoSaveData: function(a) {
                var b = this;
                this.startHistory(function(c) {
                    var d = {
                        version: b.version,
                        id: "autosave",
                        frames: c,
                        currentFrame: b.FrameController.currentFrame,
                        width: b.width,
                        height: b.height,
                        updated_at: Date.now()
                    };
                    return b.settings.persLayers ? (d.version = b.version, d.persLayers = !0) : d.persLayers = !1, b.edit.status && (d.edit = {
                        status: !0,
                        unqid: b.edit.unqid
                    }), a(d)
                }, !0)
            },
            startAutoSave: function() {
                this.timerAutoSave(), this.createCookie("pixil-asc", !0, 31)
            },
            stopAutoSave: function() {
                this.putStorage(this.autosave.cookieName, ""), this.databaseDeletePixil("autosave"), this.databaseDeletePixil("backup"), this.createCookie("pixil-asc", !1, 31), clearTimeout(this.autosave.timeout)
            },
            clearAutoSave: function() {
                this.putStorage(this.autosave.cookieName, ""), this.databaseDeletePixil("autosave"), this.databaseDeletePixil("backup")
            },
            setupAutoSave: function() {
                var a = this;
                this.isApp || this.online.status || this.databaseStart(function() {
                    a.beginAutoSave()
                })
            },
            beginAutoSave: function() {
                var b = this,
                    c = this.readCookie("pixil-asc");
                if (c && "" != c && " " != c.trim() && (this.autosave.status = c), "false" == this.autosave.status) this.autosave.status = !1, a("#autosave-toggle").prop("checked", !0);
                else {
                    if (!this.edit.status) {
                        var d = this.getStorage(this.autosave.cookieName);
                        d && "" != d.trim() || this.databaseGetPixil("autosave", function(a) {
                            a && b.autoSaveLoadObject(a), a || b.databaseGetPixil("backup", function(a) {
                                a && (console.log("Loading from backup"), b.autoSaveLoadObject(a))
                            })
                        })
                    }
                    this.preAutoSave()
                }
            },
            autoSaveLoadObject: function(b) {
                var c = JSON.stringify(b);
                c && (c = this.replaceAll(c, "--.--", ";")), this.loadAutoSave(c), this.showPopup("auto-save-loaded", a("#auto-save-loaded").html())
            },
            preAutoSave: function() {
                var a = this;
                setTimeout(function() {
                    a.timerAutoSave()
                }, this.autosave.timer)
            },
            loadAutoSave: function(a) {
                this.loading = !0;
                var b = this;
                a = JSON.parse(a), this.width = a.width, this.height = a.height, this.getPixelRatio(), a.persLayers && (this.settings.persLayers = !0), a.version && a.persLayers !== !1 || (this.settings.persLayers = !1), a.edit && a.edit.status && (this.edit.status = !0, this.edit.unqid = a.edit.unqid), this.resizeCanvases(a.width, a.height), "CSS" == this.zoom.type && (this.ZoomController.align(), this.ZoomController.reset(), this.mouse.resetLast()), this.createGrid(), this.createChecker(), this.FileController.updateDimensions(), this.loadHistoryData(a, function(c) {
                    b.HistoryController.loadFrames(c, a.currentFrame), b.HistoryController.undo = [], b.HistoryController.redo = [], b.HistoryController.create(), setTimeout(function() {
                        b.LayerController.updateList(), b.ZoomController.fit()
                    }, 1)
                })
            },
            loadAds: function() {
                var b = this,
                    c = document.head.querySelector('meta[name="ad-type"]');
                return c = !!c && c.content, this.ads.placement = this.settings.ad.placement, "auto" == this.ads.placement && this.window.height() > 940 && (this.ads.placement = "footer"), c && (this.ads.type = c), a("#disable-ads").length || !this.ads.status || this.isApp ? (a("#ad-sidebar-modal, #append-mobile-ad-pos").remove(), void(this.ads.status = !1)) : (this.checkAdsWidthWindow(), void(this.adStartTimer = setTimeout(function() {
                    b.appendScripts()
                }, 12e4)))
            },
            removeFooterAdPlacement: function() {
                a("body").removeClass("b-top"), this.repositionScreen()
            },
            setAdsPlacementLayout: function() {
                this.window.width() < 1440 && a("#footer-ad-2").remove(), a("body").addClass("b-top"), this.repositionScreen()
            },
            startTipLoadAds: function() {
                var a = this;
                clearTimeout(this.adStartTimer), setTimeout(function() {
                    a.appendScripts()
                }, 500)
            },
            setupMobileAdPosition: function() {
                var b = a("#append-mobile-ad-pos").offset();
                a("#append-mobile-ad").css({
                    top: b.top
                })
            },
            startAdScripts: function() {
                var b = this,
                    c = 1;
                return "freestar" == this.ads.type ? setTimeout(function() {
                    b.loadFreestar()
                }, c) : "playwire" == this.ads.type ? setTimeout(function() {
                    b.loadPlaywire()
                }, c) : "nitropay" == this.ads.type ? setTimeout(function() {
                    b.loadNitropay()
                }, c) : a("#ads-google").length ? (this.adsBy = "google", setTimeout(function() {
                    b.loadGTP()
                }, c)) : void 0
            },
            appendScripts: function() {
                if (!this.ads.loaded && !a("#disable-ads").length && this.ads.status && !this.isApp) {
                    var b = '<link rel="stylesheet" href="https://a.pub.network/core/pubfig/cls.css"><script data-cfasync="false" type="text/javascript">var freestar = freestar || {};freestar.queue = freestar.queue || [];freestar.config = freestar.config || {};freestar.config.enabled_slots = [];freestar.initCallback = function () { (freestar.config.enabled_slots.length === 0) ? freestar.initCallbackCalled = false : freestar.newAdSlots(freestar.config.enabled_slots) }</script><script src="https://a.pub.network/pixilart-com/pubfig.min.js" data-cfasync="false" async></script>';
                    if ("nitropay" == this.ads.type && (b = '<script data-cfasync="false">window.nitroAds=window.nitroAds||{createAd:function(){return new Promise(e=>{window.nitroAds.queue.push(["createAd",arguments,e])})},addUserToken:function(){window.nitroAds.queue.push(["addUserToken",arguments])},queue:[]};</script><script data-cfasync="false" async src="https://s.nitropay.com/ads-1290.js"></script>'), "playwire" == this.ads.type) {
                        var c = "1024450",
                            d = "73196";
                        b = document.createElement("script"), b.setAttribute("data-cfasync", "false"), b.setAttribute("async", !0), b.src = "//cdn.intergient.com/" + c + "/" + d + "/ramp.js", this.startPlaywireLeaderBoardAds()
                    }
                    a("head").append(b), this.ads.loaded = !0, this.startAdScripts()
                }
            },
            loadPlaywire: function(a) {
                this.setupMobileAdPosition()
            },
            startPlaywireLeaderBoardAds: function(a) {
                var b = this;
                if (!(this.ads.attempts > this.ads.maxAttempts)) {
                    if ("undefined" == typeof ramp.onReady) return setTimeout(function() {
                        b.ads.attempts++, b.startPlaywireLeaderBoardAds()
                    }, 250);
                    var c = [{
                        type: "leaderboard_atf",
                        selectorId: "ad-leaderboard-one"
                    }, {
                        type: "leaderboard_btf",
                        selectorId: "ad-leaderboard-two"
                    }];
                    this.isMobileDevice && (c = [{
                        type: "leaderboard_btf",
                        selectorId: "append-mobile-ad"
                    }]), this.isMobile || a || c.push({
                        type: "med_rect_atf",
                        selectorId: "ad-modal-footer"
                    }), ramp.setPath("728x90"), this.loadPlayWireAds(c), this.refreshPlaywire()
                }
            },
            showPlaywireSubmitAd: function() {
                var a = [{
                    type: "med_rect_btf",
                    selectorId: "da-link-append"
                }];
                this.loadPlayWireAds(a)
            },
            refreshLeaderBoardAds: function() {
                var a = this;
                ramp.destroyUnits(["leaderboard_atf", "leaderboard_btf"]).then(function() {
                    a.startPlaywireLeaderBoardAds(!0)
                })["catch"](function(a) {})
            },
            loadPlayWireAds: function(a) {
                console.log("lodaing ads", a), ramp.addUnits(a).then(function() {
                    ramp.displayUnits()
                })
            },
            refreshPlaywire: function() {
                var b = this;
                this.isMobileDevice || (this.ads.bottomPlacement = b.ads.bottomPlacement ? b.ads.bottomPlacement : a("#frames-placement .panel-header").height(), a("#simple-ad").addClass("show").css({
                    bottom: b.ads.bottomPlacement
                })), this.ads.timer = setTimeout(function() {
                    b.refreshLeaderBoardAds(), b.ads.lastRefreshTime = Date.now() + 3e3, setTimeout(function() {
                        b.loadAdsWrapperOpen()
                    }, 500)
                }, this.ads.autloadTime)
            },
            loadNitropay: function() {
                this.setupMobileAdPosition(), a(window).width() >= 1600 && a(window).height() >= 900 && (this.ads.large = !0), a(window).height() > 675 && this.loadNitropayAd("ad-modal-footer", [
                    [300, 250]
                ]), this.loadNitropayLeaderboards()
            },
            loadNitropayLeaderboards: function() {
                if (this.isMobileDevice) this.loadNitropayAd("append-mobile-ad", [
                    [300, 50]
                ]);
                else {
                    var b = [
                            [728, 90]
                        ],
                        c = [
                            [970, 250]
                        ];
                    a("#ad-leaderboard-one").html(""), a("#ad-leaderboard-two").html(""), a("#ad-leaderboard-large").html(""), this.ads.large ? this.loadNitropayAd("ad-leaderboard-large", c) : (this.loadNitropayAd("ad-leaderboard-one", b), this.loadNitropayAd("ad-leaderboard-two", b))
                }
                this.refreshNitropay()
            },
            refreshNitropay: function() {
                var b = this;
                this.isMobileDevice || (this.ads.bottomPlacement = b.ads.bottomPlacement ? b.ads.bottomPlacement : a("#frames-placement .panel-header").height(), a("#simple-ad").addClass("show").css({
                    bottom: b.ads.bottomPlacement
                })), this.ads.timer = setTimeout(function() {
                    b.loadNitropayLeaderboards(), b.ads.lastRefreshTime = Date.now() + 3e3, setTimeout(function() {
                        b.loadAdsWrapperOpen()
                    }, 500)
                }, this.ads.autloadTime)
            },
            showNitropaySubmitAd: function() {
                this.loadNitropayAd("da-link-append", [
                    [300, 250]
                ])
            },
            loadNitropayAd: function(a, b) {
                console.log(a, b), window.nitroAds.createAd(a, {
                    refreshLimit: 20,
                    refreshTime: 86400,
                    renderVisibleOnly: !1,
                    refreshVisibleOnly: !1,
                    sizes: b,
                    report: {
                        enabled: !1
                    }
                })
            },
            loadFreestar: function() {
                this.isMobileDevice && (a("body").append('<div id="append-mobile-ad" align="center" data-freestar-ad="__320x50"></div>'), this.setupMobileAdPosition()), this.showFreestarSidebarAd(), this.initFreestar()
            },
            initFreestar: function() {
                clearTimeout(this.ads.timer), "footer" == this.ads.placement ? (this.setAdsPlacementLayout(), a("#simple-ad").removeClass("show"), a("#ad-leaderboard-one, #ad-leaderboard-two").html("")) : (this.removeFooterAdPlacement(), a("#footer-ad-1, #footer-ad-2").html("")), this.showFreestar()
            },
            showFreestarSidebarAd: function() {
                a(window).height() < 675 || freestar.config.enabled_slots.push({
                    placementName: "pixilart_draw_mrec_3",
                    slotId: "ad-modal-footer"
                })
            },
            showFreestarSubmitAd: function() {
                freestar.config.enabled_slots.push({
                    placementName: "pixilart_draw_mrec_4",
                    slotId: "da-link-append"
                })
            },
            showFreestar: function() {
                if (this.isMobileDevice) freestar.config.enabled_slots.push({
                    placementName: "pixilart_draw_leaderboard_mob_1",
                    slotId: "append-mobile-ad"
                });
                else {
                    var b = "ad-leaderboard-one",
                        c = "ad-leaderboard-two";
                    "footer" == this.ads.placement && (b = "footer-ad-1", c = "footer-ad-2"), freestar.config.enabled_slots.push({
                        placementName: "pixilart_draw_leaderboard_1",
                        slotId: b
                    }), a("#" + b).attr("data-freestar-ad", "__728x90").attr("align", "center"), ("footer" != this.ads.placement || this.window.width() > 1440 && "footer" == this.ads.placement) && (freestar.config.enabled_slots.push({
                        placementName: "pixilart_draw_leaderboard_2",
                        slotId: c
                    }), a("#" + c).attr("data-freestar-ad", "__728x90").attr("align", "center"))
                }
                this.refreshFreestar()
            },
            refreshFreestar: function() {
                var b = this;
                this.isMobileDevice || "footer" == this.ads.placement || (this.ads.bottomPlacement = b.ads.bottomPlacement ? b.ads.bottomPlacement : a("#frames-placement .panel-header").height(), a("#simple-ad").addClass("show").css({
                    bottom: b.ads.bottomPlacement
                })), this.ads.timer = setTimeout(function() {
                    "footer" != b.ads.placement && (b.ads.lastRefreshTime = Date.now() + 2e4, setTimeout(function() {
                        b.loadAdsWrapperOpen()
                    }, 1250)), b.showFreestar()
                }, this.ads.autloadTime)
            },
            checkAdsWidthWindow: function() {
                var b = a(window).width();
                b < 940 && a("#ad-close-secondary").show()
            },
            loadGTP: function() {
                this.setupMobileAdPosition();
                var b, c = this;
                this.isMobileDevice ? googletag.cmd.push(function() {
                    b = googletag.defineSlot("/21875033406/drawing_mobile_1", [
                        [320, 50]
                    ], "append-mobile-ad").addService(googletag.pubads()), googletag.pubads().enableSingleRequest(), googletag.enableServices(), setTimeout(function() {
                        googletag.cmd.push(function() {
                            googletag.display("append-mobile-ad")
                        })
                    }, 5), setInterval(function() {
                        googletag.pubads().refresh([b])
                    }, 6e4)
                }) : (a(window).height() > 675 && googletag.cmd.push(function() {
                    googletag.defineSlot("/21875033406/drawing_mobile_1", [
                        [300, 250]
                    ], "ad-modal-footer").addService(googletag.pubads()), googletag.pubads().enableSingleRequest(), googletag.enableServices(), setTimeout(function() {
                        googletag.cmd.push(function() {
                            googletag.display("ad-modal-footer")
                        })
                    }, 5)
                }), googletag.cmd.push(function() {
                    c.ads.units.leaderOne = googletag.defineSlot("/21875033406/drawing_leader_1", [
                        [728, 90]
                    ], "ad-leaderboard-one").addService(googletag.pubads()), googletag.pubads().enableSingleRequest(), googletag.enableServices(), setTimeout(function() {
                        googletag.cmd.push(function() {
                            googletag.display("ad-leaderboard-one")
                        })
                    }, 5)
                }), googletag.cmd.push(function() {
                    c.ads.units.leaderTwo = googletag.defineSlot("/21875033406/drawing_leader_2", [
                        [728, 90]
                    ], "ad-leaderboard-two").addService(googletag.pubads()), googletag.pubads().enableSingleRequest(), googletag.enableServices(), setTimeout(function() {
                        googletag.cmd.push(function() {
                            googletag.display("ad-leaderboard-two")
                        })
                    }, 5)
                }), this.reloadGptAds())
            },
            loadGptSubmitAd: function() {
                googletag.cmd.push(function() {
                    googletag.defineSlot("/21875033406/drawing_loading_1", [
                        [300, 250]
                    ], "ad-submit-rect").addService(googletag.pubads()), googletag.pubads().enableSingleRequest(), googletag.enableServices(), setTimeout(function() {
                        googletag.cmd.push(function() {
                            googletag.display("ad-submit-rect")
                        })
                    }, 5)
                })
            },
            reloadGptAds: function() {
                var b = this;
                this.ads.bottomPlacement = b.ads.bottomPlacement ? b.ads.bottomPlacement : a("#frames-placement .panel-header").height(), a("#simple-ad").addClass("show").css({
                    bottom: b.ads.bottomPlacement
                }), this.ads.timer = setTimeout(function() {
                    googletag.pubads().refresh([b.ads.units.leaderOne]), googletag.pubads().refresh([b.ads.units.leaderTwo]), b.loadAdsWrapperOpen(), b.reloadGptAds()
                }, this.ads.autloadTime)
            },
            loadGoogleAds: function() {
                this.setupMobileAdPosition(), this.getSidebarAdSense(), this.loadData()
            },
            getDesktopAds: function() {
                return this.isIpad || a(window).width() < 1366 ? [{
                    selectorId: "ad-leaderboard",
                    type: "leaderboard_atf"
                }] : [{
                    selectorId: "ad-leaderboard",
                    type: "leaderboard_atf"
                }, {
                    selectorId: "ad-leaderboard",
                    type: "leaderboard_btf"
                }]
            },
            loadData: function() {
                a("#simple-ad").addClass("show").css({
                    bottom: this.ads.bottomPlacement
                }), this.autoLoadMoreAds(), "google" == this.adsBy && (this.isMobileDevice || this.loadAdsWrapperOpen(), this.getAdSense())
            },
            loadAdsWrapper: function() {
                this.ads.show ? this.loadAdsWrapperClose() : this.loadAdsWrapperOpen()
            },
            loadAdsWrapperClose: function() {
                this.ads.show = !1, this.ads.adElementWidth = this.ads.adElementWidth ? this.ads.adElementWidth : a("#simple-ad").width() + 20;
                var b = a("#simple-ad").outerWidth();
                a("#simple-ad").addClass("hidden-ad").css({
                    right: "-" + b + "px"
                }), a("#ad-close").addClass("bottom").html('<i class="fa fa-times fa-fw" aria-hidden="true"></i>')
            },
            loadAdsWrapperOpen: function() {
                this.isMobileDevice || (this.ads.show = !0, a("#simple-ad").removeClass("hidden-ad").css({
                    right: 0
                }), a("#ad-close").removeClass("bottom").html('<i class="fa fa-times fa-fw" aria-hidden="true"></i>'))
            },
            getNewMobileLeaderboardAd: function() {
                var a = this,
                    b = [{
                        selectorId: "append-mobile-ad",
                        type: "leaderboard_atf"
                    }];
                tyche.destroyUnits("leaderboard_atf").then(function() {
                    a.loadPlaywire(b)
                })["catch"](function(a) {})
            },
            getNewLeaderboardAd: function() {
                if ("google" != this.adsBy) {
                    var a = this,
                        b = this.getDesktopAds();
                    tyche.destroyUnits(["leaderboard_atf", "leaderboard_btf"]).then(function() {
                        a.loadAdsWrapperOpen(), a.loadPlaywire(b)
                    })["catch"](function(a) {})
                }
            },
            autoLoadMoreMobileAds: function() {
                var a = this;
                clearTimeout(this.ads.timer), this.ads.timer = setTimeout(function() {
                    a.getNewMobileLeaderboardAd(),
                        a.autoLoadMoreMobileAds()
                }, this.ads.mobileAutloadTime)
            },
            autoLoadMoreAds: function() {
                var b = this;
                clearTimeout(this.ads.timer), a("#simple-ad").addClass("show"), this.ads.timer = setTimeout(function() {
                    b.getNewLeaderboardAd(), b.loadData()
                }, this.ads.autloadTime)
            },
            linkLoadingAd: function() {
                if ("freestar" == this.ads.type) return this.showFreestarSubmitAd();
                if ("nitropay" == this.ads.type) return this.showNitropaySubmitAd();
                if ("playwire" == this.ads.type) return this.showPlaywireSubmitAd();
                a("#da-link-append").html('<div id="ad-submit-rect" align="center" data-freestar-ad="__300x250"></div>');
                if ("google" == this.adsBy) {
                    return this.loadGptSubmitAd()
                }
            },
            getAdSense: function() {
                if (this.ads.bottomPlacement = this.ads.bottomPlacement ? this.ads.bottomPlacement : a("#frames-placement .panel-header").height(), this.isMobileDevice) {
                    if (a("#simple-ad").remove(), this.isTablet) var b = '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-3237025594850465" data-ad-slot="7613531756"></ins>';
                    else var b = '<ins class="adsbygoogle" style="display:inline-block;width:320px;height:50px" data-ad-client="ca-pub-3237025594850465" data-ad-slot="9677570505"></ins>';
                    a("#append-mobile-ad").html(b);
                    try {
                        (adsbygoogle = window.adsbygoogle || []).push({})
                    } catch (c) {
                        console.log(c)
                    }
                } else {
                    var d = '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-3237025594850465" data-ad-slot="7613531756"></ins>';
                    a("#ad-leaderboard-one").html(d);
                    try {
                        (adsbygoogle = window.adsbygoogle || []).push({})
                    } catch (c) {
                        console.log(c)
                    }
                    if (!this.isIpad) {
                        var e = '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-3237025594850465" data-ad-slot="5412389416"></ins>';
                        a("#ad-leaderboard-two").html(e);
                        try {
                            (adsbygoogle = window.adsbygoogle || []).push({})
                        } catch (c) {
                            console.log(c)
                        }
                    }
                }
            },
            getSidebarAdSense: function() {
                if (!this.isMobileDevice) {
                    var b = '<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-3237025594850465" data-ad-slot="8832813578"></ins>';
                    a("#ad-modal-footer").html(b);
                    try {
                        (adsbygoogle = window.adsbygoogle || []).push({})
                    } catch (c) {
                        console.log(c)
                    }
                }
            },
            outline: function(a, b, c) {
                this.canvas[b]["default"](), this.canvas[b].putSimple(a.src), "Select" != this.tool && c && this.ToolController.restore();
                for (var d = this.canvas[b].ctx.getImageData(0, 0, this.width, this.height), e = 0, f = 0, g = [], h = this.hexToRgb(this.getDrawingcolor()), i = "rgba(" + h.r + "," + h.g + "," + h.b + "," + this.settings.outline.alpha + ")", j = 0; j < d.data.length; j += 4) {
                    var k = [d.data[j], d.data[j + 1], d.data[j + 2], d.data[j + 3]];
                    e >= this.width && (e = 0, f++);
                    var l = this.settings.outline.inside ? 0 : 1;
                    if (0 != k[3]) {
                        var m = j + 7,
                            n = j - 1,
                            o = j - 4 * this.width + 3,
                            p = j + 4 * this.width + 3,
                            q = o - 4,
                            r = o + 4,
                            s = p - 4,
                            t = p + 4;
                        0 == d.data[n] && this.settings.outline.points.cl && this.layPixel(e - l, f, !0, i, !1, 1), 0 == d.data[q] && this.settings.outline.points.tl && 0 == d.data[n] && 0 == d.data[o] && this.layPixel(e - l, f - l, !0, i, !1, 1), 0 == d.data[r] && this.settings.outline.points.tr && 0 == d.data[m] && 0 == d.data[o] && this.layPixel(e + l, f - l, !0, i, !1, 1), 0 == d.data[s] && this.settings.outline.points.bl && 0 == d.data[n] && 0 == d.data[p] && this.layPixel(e - l, f + l, !0, i, !1, 1), 0 == d.data[t] && this.settings.outline.points.br && 0 == d.data[m] && 0 == d.data[p] && this.layPixel(e + l, f + l, !0, i, !1, 1), 0 == d.data[m] && g.indexOf(m) == -1 && this.settings.outline.points.cr && (g.push(m), this.layPixel(e + l, f, !0, i, !1, 1)), 0 == d.data[o] && this.settings.outline.points.tc && this.layPixel(e, f - l, !0, i, !1, 1), 0 == d.data[p] && g.indexOf(p) == -1 && this.settings.outline.points.bc && (g.push(p), this.layPixel(e, f + l, !0, i, !1, 1))
                    }
                    e++
                }
                return !c || c()
            },
            flip: function(a, b, c, d) {
                var e = this;
                this.loadImage(b, function(b) {
                    return e.flipCanvas(a, b, c), d()
                })
            },
            flipCanvas: function(a, b, c) {
                return c.clear(), c.ctx.save(), "x" == a ? (c.ctx.scale(-1, 1), c.ctx.drawImage(b, -c.canvas.width, 0)) : (c.ctx.scale(1, -1), c.ctx.drawImage(b, 0, -c.canvas.height)), c.ctx.restore(), c.dataURL()
            },
            cropResize: function(a, b, c) {
                var d = this,
                    e = 0,
                    f = 0,
                    g = this.canvas.data;
                g.canvas.width = parseInt(a), g.canvas.height = parseInt(b);
                var h = 0,
                    i = 0,
                    j = (a - this.width) / 2,
                    k = (b - this.height) / 2,
                    l = a - this.width,
                    m = b - this.height;
                switch (this.settings.crop.anchor) {
                    case "top-center":
                        h = j, i = 0;
                        break;
                    case "top-right":
                        h = l, i = 0;
                        break;
                    case "center-left":
                        h = 0, i = k;
                        break;
                    case "center-center":
                        h = j, i = k;
                        break;
                    case "center-right":
                        h = l, i = k;
                        break;
                    case "bottom-left":
                        h = 0, i = m;
                        break;
                    case "bottom-center":
                        h = j, i = m;
                        break;
                    case "bottom-right":
                        h = l, i = m
                }
                h = Math.round(h), i = Math.round(i);
                var n = function() {
                    var j = d.FrameController.frames[e];
                    if (!j || "undefined" == typeof j) return c();
                    var k = j.layers,
                        l = k[f];
                    g.canvas.width = parseInt(a), g.canvas.height = parseInt(b), d.settings.crop.resize ? (g.setSmoothing(), g.ctx.drawImage(l.src, 0, 0, a, b)) : g.putSimple(l.src, h, i), g.image().onload = function() {
                        l.src = this, f++, f >= k.length && (e++, f = 0), n()
                    }
                };
                n()
            },
            createTileCanvases: function(c, d) {
                if (this.settings.tile.status && !this.isWindowsIE) {
                    this.removeTileCanvases(), this.turnOffFrameTile(), c = c ? c : this.width, d = d ? d : this.height;
                    for (var e = 0; e <= this.settings.tile.count - 1; e++) {
                        var f = new b(c, d, "canvas_tile_" + e, (!1), (!0), "canvas-layers-appened", this, "canvas_tile");
                        f.ctx = f.context(), f.empty = f.clear(!0), this.settings.tile.canvases.push(f)
                    }
                    this.updateTileCanvases(), this.ZoomController.reset(), a("#sidebar-tiles-tab").removeClass("hidden"), a("#canvas-layers-appened").addClass("has-tiles")
                }
            },
            removeTileCanvases: function() {
                if (this.settings.tile.canvases.length)
                    for (var b = 0; b <= this.settings.tile.canvases.length - 1; b++) delete this.settings.tile.canvases[b].canvas;
                this.settings.tile.canvases = [], a("#sidebar-tiles-tab").addClass("hidden"), a("#canvas-layers-appened .canvas_tile").remove(), a("#canvas-layers-appened").removeClass("has-tiles")
            },
            updateTileCanvases: function() {
                if (this.settings.tile.status && !this.isWindowsIE)
                    for (var a = 0; a <= this.settings.tile.canvases.length - 1; a++) this.settings.tile.canvases[a].clear(), this.settings.tile.canvases[a].ctx.globalAlpha = this.settings.tile.opacity, this.settings.tile.canvases[a].putSimple(this.canvas.display.canvas, 0, 0, 0, 0)
            },
            updateTileOpacity: function(b) {
                a("#tiles-alpha-change").text(b), a("#tiles-alpha").val(b), this.settings.tile.opacity = b, this.updateTileCanvases()
            },
            updateBorder: function() {
                this.settings.tile.border ? a("#canvas-layers-appened").addClass("has-tiles-border") : a("#canvas-layers-appened").removeClass("has-tiles-border")
            },
            toggleFrameTile: function() {
                this.settings.frames.tile = !this.settings.frames.tile, this.settings.tile.status && this.TileController.toggleOff();
                this.getPixelRatio();
                this.ZoomController.reset(!0), this.FrameController.updateFrameTiles(), this.settings.frames.tile ? this.turnOnFrameTile() : this.turnOffFrameTile(), this.updateSettings()
            },
            turnOnFrameTile: function() {
                this.checker.status
            },
            turnOffFrameTile: function() {
                this.settings.frames.tile = !1, a("#frame-tiles").removeAttr("style"), a("#frames-tile-toggle").prop("checked", !1), a("#canvas-layers-container .frame-tile").remove()
            },
            checkMobile: function(b) {
                (1 == a("#is-app").length || b) && (this.isApp = !0), (a(window).width() <= 768 || b) && this.setMobile(), a(window).height() < 450 && a("#resize-pix").hide()
            },
            setMobile: function() {
                var b = a(window).width();
                if (this.isMobile = !0, this.isMobileDevice = !0, this.progress.status = !1, !("object" == typeof la && this.width == this.height || "object" == typeof la && this.width < 50 || "object" == typeof la && this.height < 50 || this.online.status && this.width == this.height))
                    if (b <= 768 && (this.isMobileDevice = !0), 768 != b || this.isApp) {
                        if (this.isApp) {
                            if (this.customSize) return;
                            this.width = 32, this.height = 32
                        } else this.width = 32, this.height = 32, this.formatScreen(), this.setLayerTools();
                        a(window).height() < 600 && (a("#append-mobile-ad").remove(), this.ads.status = !1)
                    } else this.width = 100, this.height = 100
            },
            formatScreen: function() {
                var b = a("#toolbar").height(),
                    c = a(".mobile-header").height(),
                    d = a(".footer-mobile-buttons").height(),
                    e = a(window).height(),
                    f = Math.abs(e - (b + c + d));
                a("#drawing-container").height(f)
            },
            checkTouchScreen: function() {
                this.isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
            },
            checkTablet: function() {
                var b = navigator.userAgent,
                    c = a(window).width();
                this.isApp || (b.indexOf("iPad") > -1 && (this.isIpad = !0, this.filter.status = !1, a(".remove-safari").remove()), (1080 == c && b.match(/Mac OS X/i) || 810 == c && b.match(/Mac OS X/i) || c > 768 && b.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) && this.setTablet())
            },
            setLayerTools: function() {
                a(window).width() <= 768 && (a("#sidebar-tool-content").show(), a("#sidebar-tool-content .sidebar-tools").removeClass("hide-mobile"))
            },
            setTablet: function() {
                this.isApp || (this.isMobile = !0, this.isTablet = !0, this.edit.status || 768 == a(window).width() || (this.width = 100, this.height = 100), this.settings.disableDownloadSubmit = !0, this.pixelPerfect.status = !0, a(".perfect-toggle").prop("checked", !0), this.settings.extras = !1, this.setLayerTools())
            },
            setApp: function() {
                if ("" == a("#added-styles").html().trim() || this.app.resizeOnNew) {
                    var b = a("#drawing-canvas-conatiner"),
                        c = b.height() - this.height * this.pixel_size;
                    if (c >= 30) {
                        var d = c - 4,
                            e = b.height() - d;
                        this.ZoomController.align(!1, !1, !1, e + 5)
                    } else if (c < 0) {
                        var f = 4 + Math.abs(c),
                            g = 30 - f,
                            e = b.height() + f;
                        g < 0 && (g = 5, this.app.resizeOnNew = !0), this.app.resizeOnNew && (this.getPixelRatio(!1, !0), this.ZoomController.reset(!0)), this.ZoomController.align(!1, !1, !1, e - 1)
                    }
                    this.mouse.render()
                }
            },
            layersNewAllFrames: function(a, b, c) {
                if (this.settings.persLayers && 1 != this.FrameController.frames.length) {
                    var d = this.FrameController.frames;
                    a = jQuery.extend(!0, {}, a);
                    for (var e = 0; e < d.length; e += 1) e != this.FrameController.currentFrame && (d[e].layers.push(a), d[e].layers.splice(c, 0, d[e].layers.splice(b, 1)[0]))
                }
            },
            layersMergeAllFrames: function(a, b, c, d, e, f, g) {
                if (!this.settings.persLayers || 1 == this.FrameController.frames.length) return void(g && g());
                for (var h = this.FrameController.frames, i = this, j = [], k = 0; k < h.length; k += 1) k != this.FrameController.currentFrame && this.LayerController.mergeLayer(a, b, h[k], !0, function(a, b) {
                    b.layers.splice(c, 1), b.layers.splice(d, 1), b.layers.push(a), b.layers.splice(parseInt(b.layers.length) - 1, 0, b.layers.splice(f, 1)[0]), i.loading = !1, i.updateData(), j.push(1), j.length == h.length - 1 && g()
                })
            },
            layerCloneToAllFramesCopy: function(a, b) {
                for (var c = this.FrameController.frames, d = 0, e = 0; e < c.length; e += 1)
                    if (d++, e != this.FrameController.currentFrame && (a = jQuery.extend(!0, {}, a), c[e].layers.push(a), d >= c[e].length && b)) return b()
            },
            layerCloneToAllFrames: function(a, b, c) {
                if (1 != this.FrameController.frames.length) {
                    if (!this.settings.persLayers) return this.layerCloneToAllFramesCopy(b, c);
                    for (var d = this.FrameController.frames, e = 0, f = 0; f < d.length; f += 1)
                        if (e++, f != this.FrameController.currentFrame && !d[f].layers[a].options.locked && (b = jQuery.extend(!0, {}, b), d[f].layers[a] = b, e >= d[f].length && c)) return c()
                }
            },
            layerDuplicateAllFrames: function(a, b, c, d) {
                if (!this.settings.persLayers || 1 == this.FrameController.frames.length) return void(d && d());
                for (var e = this.FrameController.frames, f = [], g = 0; g < e.length; g += 1)
                    if (this.FrameController.currentFrame != g) {
                        var a = e[g].layers[this.LayerController.currentLayer],
                            h = jQuery.extend(!0, {}, a);
                        h.name = h.name + " Copy", h.src = h.src.src;
                        var i = JSON.stringify(h),
                            j = JSON.parse(i),
                            k = new Image;
                        k.i = g, k.onload = function() {
                            if (j.src = this, e[this.i].layers.splice(c, 0, j), f.push(this.i), f.length >= e.length) return d()
                        }, k.src = j.src
                    } else f.push(this.i)
            },
            layersCopyAllFrames: function() {
                if (this.settings.persLayers && 1 != this.FrameController.frames.length)
                    for (var a = this.FrameController.frames, b = 0; b < a.length; b += 1) b != this.FrameController.currentFrame && a[b].layers.splice(id, 1)
            },
            layersDeleteAllFrames: function(a) {
                if (this.settings.persLayers && 1 != this.FrameController.frames.length)
                    for (var b = this.FrameController.frames, c = 0; c < b.length; c += 1) c != this.FrameController.currentFrame && b[c].layers.splice(a, 1)
            },
            layersMoveAllFrames: function(a, b) {
                if (this.settings.persLayers && 1 != this.FrameController.frames.length)
                    for (var c = this.FrameController.frames, d = 0; d < c.length; d += 1) d != this.FrameController.currentFrame && c[d].layers.splice(a, 0, c[d].layers.splice(b, 1)[0])
            },
            layersRenameAllFrames: function(a, b) {
                if (this.settings.persLayers && 1 != this.FrameController.frames.length)
                    for (var c = this.FrameController.frames, d = 0; d < c.length; d += 1) d != this.FrameController.currentFrame && (c[d].layers[a].name = b)
            },
            layersNewFrame: function(a, b) {
                if (this.settings.persLayers && 1 != this.FrameController.frames.length) {
                    var c = b;
                    c.layers;
                    a.layers = [];
                    for (var d = 0; d < c.layers.length; d++) {
                        var e = c.layers[d],
                            f = jQuery.extend(!0, {}, e);
                        f.src = this.LayerController.blankLayer(), a.layers.push(f)
                    }
                    this.FrameController.select(this.FrameController.currentFrame)
                }
            },
            startHistoryNew: function() {
                ({
                    frame: this.FrameController.frames[this.FrameController.currentFrame],
                    layer: this.LayerController.layers[this.LayerController.currentLayer],
                    tool: this.tool,
                    startX: this.mouse.start_x,
                    startY: this.mouse.start_y,
                    lastX: this.mouse.last_x,
                    lastY: this.mouse.last_y,
                    dataX: x,
                    dataY: y,
                    dataWidth: ha,
                    dataHeight: ia,
                    data: data
                })
            },
            startHistory: function(a, b) {
                for (var c = this, d = this.FrameController.frames, e = [], f = 0; f < d.length; f++) this.loopHistoryFrames(f, function(f) {
                    if (e.push(f), e.length == d.length) {
                        if (!b) return a(e);
                        c.historyChangeBloblsToImages(e, function(b) {
                            return a(b)
                        })
                    }
                })
            },
            historyChangeBloblsToImages: function(a, b) {
                function c(f) {
                    function g(h) {
                        var j = i[h],
                            k = new Image;
                        e.ctx.clearRect(0, 0, d.width, d.height), k.onload = function() {
                            if (e.ctx.drawImage(k, 0, 0), j.src = e.dataURL(), h == i.length - 1) {
                                if (f == a.length - 1) return b(a);
                                c(f + 1)
                            } else g(h + 1)
                        }, k.src = j.src
                    }
                    var h = a[f],
                        i = h.layers,
                        j = new Image;
                    j.onload = function() {
                        e.ctx.clearRect(0, 0, d.width, d.height), e.ctx.drawImage(j, 0, 0), h.preview = e.dataURL(), g(0)
                    }, j.src = h.preview
                }
                var d = this,
                    e = this.createCanvas("temp", this.width, this.height, !1);
                c(0)
            },
            loopHistoryFrames: function(a, b) {
                var c = this;
                this.FrameController.cloneSingleFrame(a.toString(), function(a) {
                    c.loopFrameLayers(a.layers, function(c) {
                        return a.layers = c, b(a)
                    }, a)
                })
            },
            loopFrameLayers: function(a, b, c) {
                for (var d = [], e = 0; e < a.length; e++) {
                    var f = jQuery.extend(!0, {}, a[e]),
                        g = {
                            id: f.id,
                            src: f.src.src,
                            edit: this.edit.status,
                            name: f.name,
                            opacity: f.opacity,
                            active: f.active,
                            unqid: f.unqid,
                            details: f.details,
                            options: f.options
                        };
                    if (d.push(g), d.length == a.length) return b(d)
                }
            },
            loadHistoryData: function(a, b) {
                var c = a.frames,
                    a = [],
                    d = this;
                if ("undefined" != typeof c[0].width && c[0].width != this.width && !this.ExportImportController.importing || "undefined" != typeof c[0].height && c[0].height != this.height && !this.ExportImportController.importing) this.resizeHistoryCanvas(c[0].width, c[0].height, function() {
                    for (var e = 0; e < c.length; e++) d.ExportImportController.importing && (c[e].old_width = c[e].width, c[e].old_height = c[e].height, c[e].width = d.width, c[e].height = d.height), d.renderLayers(c[e], function() {
                        if (a.push(e), a.length == c.length) return b(c)
                    })
                });
                else
                    for (var e = 0; e < c.length; e++) {
                        if (this.ExportImportController.importing && (c[e].old_width = c[e].width, c[e].old_height = c[e].height, c[e].width = d.width, c[e].height = d.height), this.ExportImportController.importing && 0 === e && 1 == c.length) {
                            c[0].selectedLayer = this.LayerController.currentLayer;
                            this.loopFrameLayers(this.LayerController.layers, function(a) {
                                for (var b = 0; b < c[0].layers.length; b++) a.push(c[0].layers[b]);
                                c[e].layers = a
                            })
                        }
                        d.renderLayers(c[e], function() {
                            if (a.push(e), a.length == c.length) return b(c)
                        })
                    }
            },
            renderLayers: function(a, b) {
                var c = this;
                this.loopLoadFrames(a, function() {
                    return c.ExportImportController.importing ? void c.loopFrameResizeLayers(a, function() {
                        return b()
                    }) : b()
                })
            },
            resizeHistoryCanvas: function(a, b, c) {
                this.FileController.resize(!1, a, b, function() {
                    return c()
                })
            },
            loopFrameResizeLayers: function(a, b) {
                var c = this,
                    d = a.layers,
                    e = this.width / 2 - a.old_width / 2,
                    f = this.height / 2 - a.old_height / 2,
                    g = 0;
                if (this.width <= a.old_width || this.height <= a.old_height) return b(d);
                this.canvas.rendering["default"]();
                for (var h = 0; h < d.length; h++) {
                    var i = d[h];
                    this.canvas.rendering.clear(), i.src.width == this.width && i.src.height == this.height ? this.canvas.rendering.ctx.drawImage(i.src, 0, 0) : this.canvas.rendering.ctx.drawImage(i.src, 0, 0, i.src.width, i.src.height, e, f, i.src.width, i.src.height);
                    var j = new Image;
                    j.pos_x = h, j.details = d[h].details, j.options = d[h].options, j.onload = function() {
                        if (d[this.pos_x] = c.createHistoryLayer(this, d[this.pos_x]), g++, g == d.length) return b(d)
                    }, j.src = this.canvas.rendering.dataURL()
                }
            },
            loopLoadFrames: function(a, b) {
                for (var c = this, d = a.layers, e = 0, f = 0; f < d.length; f++) {
                    var g = d[f];
                    "undefined" != typeof g.options && g.options || (g.options = {
                        blend: "source-over"
                    });
                    var h = new Image;
                    h.pos_x = f, h.details = g.details, h.options = g.options, h.onload = function() {
                        if (d[this.pos_x] = c.createHistoryLayer(this, d[this.pos_x]), e++, e >= d.length) return b(d)
                    }, h.src = "object" == typeof g.src ? g.src.src : g.src
                }
            },
            createHistoryLayer: function(a, b) {
                var d = new c(b.id, b.name);
                return d.src = a, d.active = b.active, d.opacity = parseFloat(b.opacity), d.unqid = b.unqid, d.details = a.details, d.options = a.options, d.opacity = d.opacity.toString(), d
            },
            simpleListeners: function() {
                var b = this;
                a(document).keyup(function(b) {
                    27 === b.keyCode && a(".drawing-modal").hide()
                }), a(document).on("click", ".tab-item", function() {
                    var b = a(this).attr("data-for"),
                        c = a(this).attr("data-activate");
                    a(b + " .tab-content-selection").removeClass("active"), a(b).find(c).addClass("active"), a(this).parent().children(".tab-item").removeClass("active"), a(this).addClass("active")
                }), a("#popup-container").on("click", ".download-progress-preview", function() {
                    b.downloadProgressGif(!1, !0, !1, !0)
                }), a("#popup-container").on("change", "#giftransparent", function(a) {
                    b.giftransparent = !b.giftransparent
                }), a("#draw-online-others").click(function() {
                    window.location.href = "/online/"
                }), this.isMobile || this.isTablet || this.isApp || this.isTouch || this.isWindowsIE || (a(".panel-resize").each(function() {
                    var c = b.getCookie(a(this).attr("id") + "-resize");
                    c && a(this).height(c)
                }), a(".panel-resize").resizable({
                    stop: function(c, d) {
                        var e = a(d.element[0]);
                        b.createCookie(e.attr("id") + "-resize", e.height())
                    }
                })), a(".clear-new").click(function() {
                    return b.isApp && b.ons ? b.FileController.appClear(!0) : void b.FileController.clearNew(!0)
                })
            },
            commonListeners: function() {
                this.extraToolDropDown(), this.simpleListeners()
            },
            extraToolDropDown: function() {
                function b(b) {
                    var c = b.find(".activate-switch-wrapper").attr("data-current");
                    e = b, b.find(".selectable-switch-wrapper").toggleClass("active"), a(".activate-switch-wrapper").show(), b.find(".selectable-switch-wrapper").hasClass("active") && (d = b, a(".activate-switch-wrapper").hide(), b.find(".select-able-switch").each(function() {
                        var b = a(this).attr("data-selection");
                        a(this).show(), b == c && a(this).hide()
                    }))
                }
                var c = this,
                    d = !1,
                    e = !1;
                a(".activate-switch-wrapper").click(function() {
                    b(a(this))
                }), a(".activate-switch-wrapper").click(function() {
                    b(a(this))
                }), a(".close-modal").click(function() {
                    a(".drawing-modal").hide()
                }), a(".sidebar-tabs").click(function(b) {
                    var c = a(this).attr("data-toggle");
                    a(".sidebar-content").removeClass("active"), a(".sidebar-tabs").removeClass("active"), a(this).find(".sidebar-tab-notification").removeClass("active"), a(this).hasClass("sidebar-tools-tab") && a(".sidebar-tab-notification").removeClass("active"), a(this).addClass("active"), a(c).addClass("active")
                }), a(".p-progress").mousedown(function(b) {
                    c.stopProgress(), c.progress.doPreview = !0, c.showProgress(".progress-images"), c.showPopup("progress", a("#progress-content").html())
                }), a(".select-able-switch, .switch-change").click(function(b) {
                    if (3 != b.which && e) {
                        e.find(".switch-change").addClass("active");
                        var c = a(this).attr("data-selection"),
                            d = a(this).attr("data-title"),
                            f = a(this).attr("data-type");
                        e.attr("title", d), a(".activate-switch-wrapper").attr("data-current", c), a(".switch-change").html(a(this).html()).attr("data-title", d).attr("data-selection", c).attr("title", d).attr("data-type", f), a(".selectable-switch-wrapper").removeClass("active"), a(".activate-switch-wrapper").show()
                    }
                }), a(document).on("pointerdown", function(a) {
                    c.TextController.checkFontSelectionOpen(a)
                }), a(document).mouseup(function(b) {
                    if (d) {
                        var c = d;
                        c.is(b.target) || 0 !== c.has(b.target).length || (a(".selectable-switch-wrapper").removeClass("active"), a(".activate-switch-wrapper").show(), d = !1)
                    }
                })
            },
            runGenerator: function(a) {
                this.loading = !0;
                for (var b = a.replace(/[^a-zA-Z0-9 ]/g, ""), c = b.split(""), d = 0, e = 0, f = 0, g = this.width * this.height, h = 0; h < g; h++) {
                    e >= this.width && (e = 0, f++), d >= c.length && (d = 0);
                    var i = c[d];
                    i = i.toLowerCase();
                    var j = this.getGenerateKey("keys", i);
                    j = j ? "#" + j : "rgba(0,0,0,0.0)", this.layPixel(e, f, !0, j, !1, 1), d++, e++, h == g - 1 && (this.FrameController.updateFramePreview(), this.render(), this.loading = !1)
                }
            },
            getGenerateKey: function(a, b) {
                var c = {
                        81: "368045",
                        87: "f97496",
                        69: "78a3f5",
                        82: "ab3c74",
                        84: "d71e1e",
                        89: "4e257b",
                        85: "914cd6",
                        73: "e89a8b",
                        79: "8a9b73",
                        80: "c5d866",
                        65: "f0eea9",
                        83: "136c6f",
                        68: "3db769",
                        70: "6e2753",
                        71: "5c6f8e",
                        72: "468399",
                        74: "39f2ed",
                        75: "8cffea",
                        76: "3d5d1c",
                        90: "5ce873",
                        88: "248a01",
                        67: "c4428d",
                        86: "2aa69e",
                        66: "391d11",
                        78: "278690",
                        77: "9cea9e",
                        49: "f6e5a3",
                        50: "e6201c",
                        51: "e0df38",
                        52: "99a031",
                        53: "42c29e",
                        54: "d77183",
                        55: "78e7c5",
                        56: "66297b",
                        57: "adad6c",
                        48: "CCCCCC"
                    },
                    d = {
                        q: "368045",
                        w: "f97496",
                        e: "78a3f5",
                        r: "ab3c74",
                        t: "d71e1e",
                        y: "4e257b",
                        u: "914cd6",
                        i: "e89a8b",
                        o: "8a9b73",
                        p: "c5d866",
                        a: "f0eea9",
                        s: "136c6f",
                        d: "3db769",
                        f: "6e2753",
                        g: "5c6f8e",
                        h: "468399",
                        j: "39f2ed",
                        k: "8cffea",
                        l: "3d5d1c",
                        z: "5ce873",
                        x: "248a01",
                        c: "c4428d",
                        v: "2aa69e",
                        b: "391d11",
                        n: "278690",
                        m: "9cea9e",
                        1: "f6e5a3",
                        2: "e6201c",
                        3: "e0df38",
                        4: "99a031",
                        5: "42c29e",
                        6: "d77183",
                        7: "78e7c5",
                        8: "66297b",
                        9: "adad6c",
                        0: "CCCCCC"
                    };
                return "keys" == a ? d[b] : c[b]
            },
            generateCircle: function(a, b, c, d) {
                var e = Math.abs(b),
                    f = (Math.abs(b), 0);
                c = c ? c : this.getDrawingcolor(), e = Math.floor(e / 2);
                var g = Math.ceil(b / 2),
                    h = Math.ceil(b / 2),
                    i = 1 - e,
                    j = b + 1,
                    k = b + 1;
                for (this.canvas[a].canvas.width = j, this.canvas[a].canvas.height = k; e >= f;) {
                    for (var l = g; l < e + g; l++) this.drawPixel(a, l, f + h, c, 1, !0), this.drawPixel(a, f + g, l, c, 1, !0), this.drawPixel(a, l - e, f + h, c, 1, !0), this.drawPixel(a, -f + g, l, c, 1, !0), this.drawPixel(a, l - e, -f + h, c, 1, !0), this.drawPixel(a, -f + g, l - e, c, 1, !0), this.drawPixel(a, l, -f + h, c, 1, !0), this.drawPixel(a, f + g, l - e, c, 1, !0);
                    this.drawPixel(a, e + g, f + h, c, 1, !0), this.drawPixel(a, f + g, e + h, c, 1, !0), this.drawPixel(a, -e + g, f + h, c, 1, !0), this.drawPixel(a, -f + g, e + h, c, 1, !0), this.drawPixel(a, -e + g, -f + h, c, 1, !0), this.drawPixel(a, -f + g, -e + h, c, 1, !0), this.drawPixel(a, e + g, -f + h, c, 1, !0), this.drawPixel(a, f + g, -e + h, c, 1, !0), f++, i <= 0 ? i += 2 * f + 1 : (e--, i += 2 * (f - e) + 1)
                }
                return d ? d(this.canvas[a].image(), this.canvas.data.ctx.getImageData(0, 0, j, k)) : this.canvas[a].image()
            },
            textData: {
                current: "default",
                "default": {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAFCAYAAADPLFVyAAAAAXNSR0IArs4c6QAAAGhJREFUKFOVUtESwCAIsv//6HXuopxDqp48UkS0mdlj67URRswhxxnmf8BjbY49Bxi6Zb7Z5LSYEapaiGBioqiXAxMzQiQzt3YOngx3JUa58CMa61LDZb5SjHKBOajEVHcUTvNzP3OFHepNLQUdw50WAAAAAElFTkSuQmCC",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGklEQVQYV2NkgID/UJqREcoB0WAJ4gRQzAAATN4IA/yXnoQAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2NkgID/DAwMjIxQBkgAzEGRwaqMAQCj5wUFBf2pmgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2NkgID/UJqREcoB0WAJGAOmCqwCzgExYFqg4gwMABAOBgTA2bPJAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkgID/UJqREcoB0WAJGAOmCrcKuBkAIgEHBJhT9BsAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2NkQID/DAwMjIxQPogDAmABsAyMhjHgGmFaQAJglQD/HgYFRxqNXQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkYGD4z4AEGKECIBoMYAJwPlwGKvIfQwUA39UFBAG4wloAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkgID/UJqREcoB0WAAE4Dz0VX8hymFmwEA9h4GBZZ2+8YAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2NkYGD4z4AAjIxIHBDzP14BkFYULWABAMPpBQS6CdR+AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGUlEQVQYV2NkgID/UJqREcoB0WAJOIN4FQAl/QcEOvQMUAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAI0lEQVQYV2NkgID/UJqREcoB0WAJOAMqwAATgPHhKmDmMAIAA+IGA5WzvzgAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAH0lEQVQYV2NkgID/UJqREcoB0WAJmACUz8CAUwVcCwAu2QgC/bjjowAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2NkYGD4z4AAjIxQARANAv9hAjA1RKgAADHxBwTmLpwaAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkgID/UJqREcoB0WAJdAEGrCpQzAAAKgEHBLNsDBwAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkYGD4z4AAjIxQARANAv+JF4CZwggAVNYIA3NWX2YAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHElEQVQYV2NkYGD4z4AEGKECIBoMYAJwPkEVDADr4gUEb0NJSQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkYGD4z4AEGKECIBoMYAJwPk4VcC0A6+sFBXovt7YAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkgID/UJqREcoB0WCALABWha7iP0wp3AwAHQ4HBO/WInkAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAH0lEQVQYV2NkYGD4z8DAwMgAAf9BDKwCUAUQpfi1AAB3mAkBgHdxVwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkYGD4zwAFjFAaJMCInwPXAwCjsgUEYh/r8QAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHElEQVQYV2NkQAX/GYkS+M/AwABTCdcCEgQBRgDVmgYC9JzoZgAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2NkYGD4z8DAwMgAAf9BDJgAmIYJgGTBqnCqgJsBAH/9CQQFQ+vaAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGklEQVQYV2NkYGD4z8DAwMgABSAGmQIwIxgA7DcFBQWEkdsAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJ0lEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMDZMAYKjcyBGQDXjmImADXLCwEJA7D+AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2NkYGD4z8DAwMgAAf9BDJAACIDZMAG4BLIAiha4GQCemAoBcKVkawAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGklEQVQYV2NkgID/UJqREcoB0WAJ4gRQzAAATN4IA/yXnoQAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGD4z4AAjIxQARANAv9hAjA1GCoY0LUwAAAgCwYFQczmVQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAH0lEQVQYV2NkgID/UJqREcoB0WAJvAIgbWAtMDPAqgFR7wkD3HH35AAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGD4z4AAjIxQARANAv9hAjA1KCpAWjG1AAA3BggELZAzJAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2NkgID/UJqBEcoB0WAAY8BUMMJlYFphWuA6ANfdBQRKqEj9AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGElEQVQYV2NkYGD4z4AGGJH4IEkwn0JBAAg+BQW0w4yUAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2NkYGD4z8DAwMgAAf9BDDIEwHqhZjACAJWdCQJA96l2AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJUlEQVQYV2NkYGD4z8DAwMiAAP9BHKyCIDUwCTAN04ZVEFk1AwD2AgkEPab4CwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJElEQVQYV2NkYGD4z8DAwMiAAP9BHLyCMEm4SpBmmC44A8VMADXLCwGcFtUcAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2NkYGD4z8DAwMgAAf9BDAwBsAxUBSNWFShaAHO/CQJBNAo/AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJUlEQVQYV2NkYGD4z8DAwMiAAP9BHKyCIDUgCRhgRNEGMwarIACpAgcEc9qTqwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGD4z4AEGJHYIAlGmACYA5IEEXAOsgBcJwDf6gUE3zmQOgAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkQAKMUPZ/BgYGRhgHLIZVBqwMAEP4Awbm4xYMAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    187: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGElEQVQYV2NkQAKMDAwM/2F8EAcOcMsAAEa+AgQnU8YcAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAF0lEQVQYV2NkQAKMBDn/GRgYGGHKwBwAF/wCBjcn4hwAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAFUlEQVQYV2NkQAKM6Jz/MAEMGbhKACPhAQWShsyqAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAFElEQVQYV2NkQAKMpHH+MzAwMAIABgABBkf5UEcAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkQAX/GZH4/xkYGBhhAmAOSBKrAFwWpAIAz/8FBUrO0UIAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    192: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkYGD4zwABjIxQBoj6j8xhwM0BAGXUAgVidnTBAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    219: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAGElEQVQYV2NkYGD4z8DAwMAIZTDiZjAAAHN6BQRPREgOAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    220: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkYGD4z8DAwMgABTAGXBAuA1OJVwBkyn8AzEMFBXtGYSAAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    221: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAGUlEQVQYV2NkYGD4z8DAwMAIIkAc7AywGgBnTQUBLhxcKAAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkgID/DAwMjIzYOGAxmAwmBwBl/AIGnkPsiwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkQAKMUPZ/BgYGRhgHLIZbBgA+/AIG+vry8gAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2NkYGD4z4AAjIxIHBDzP0wArgpdBQOyCjAbALnlBAS711XBAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAF0lEQVQYV2NkgID/DAwMjIwEOWAFKMoAifQEBsIKtpQAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAKElEQVQYV2NkgID/UBpEMTJCBUA0DPxHFgSpBvPRVYKNgWmDmQnmAwDYCgkDpcf3tQAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAG0lEQVQYV2NkgID/DAwMjDAaxoDKQSiQIAUqAaklCASmABIBAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJElEQVQYV2NkgID/UBpEMTJCBZBpBhgHSSFEJQyAjAArwqoSAHplBwVmGaR3AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGD4z8DAwMgAAf9hDDAHJAGXganCKoBiBgAiCQcEWuzxHQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGklEQVQYV2NkgID/DAwMjIwwBogGceAANwcAkdQDBadbdvYAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJUlEQVQYV2NkQID/UCYjI5QBEgCxwTSyIEgeLAGXRdaBrhIsBwCdWwgEWm/hrgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    s56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIUlEQVQYV2NkYGD4zwABjIxIHAYQBwTAsjAORB1UBkwBAIytAwTJjSn1AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkQID/DAwMjIxQPpgDYhMvAFIN1gYA0EAFBoZXSkEAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    s48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkgID/DAwMjIxQDliAMAesBwCPqwUDrcmxdAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAEklEQVQYV2NkQAOM5An8R9YGAA5HAQUF+fYPAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    s187: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2NkQAKMUPZ/BgYGRhAHxAADDBm4LgBh2QMFPXBDcAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2NkYGD4z8DAwAiiwQQyhwEGQDLYOQDKnwQE8rYkdAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s219: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkgID/IIIRicMI4oBEwYIYMnA9AJ+6BQRyQ7jAAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s220: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAE0lEQVQYV2NkgID/DAwMjIxkcACb8AUGdsIplgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s221: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4zwABjIxQBkgAzgGJ/ceQgesBAJ/RBQUNuOIVAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAGklEQVQYV2NkgAJGKP0fxPjPwMDAiCIClgUAPYoDBLVY1C4AAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    s190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHElEQVQYV2NkgAJGBgaG/wwMDIwgBgj8xxBhAABBmQMFcfOUKQAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    s192: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkQAOMuAT+MzAwgCT/gwkYB0RjaAEAgyUEBdsNtBAAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    resize: !1,
                    height: 5,
                    spacing_top: 6,
                    spacing_left: 2
                },
                Darkstar_2: {
                    resize: !1,
                    height: 10,
                    spacing_top: 11,
                    spacing_left: 9,
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAKCAYAAAAXfRggAAAAAXNSR0IArs4c6QAAAQ5JREFUSEutVtESwzAIWv7/o7frNnuGAcYsfWkvtRUJYsbjcz2/93wbZA3jMEa9v9ZZbKy5/zJsDucuRsbDuAA6ALkoFaeKjCJyDox1+StsjKQTGCddMPDIJAJlhKySUBHEVJsBBwGVuncwYsO8cymCMkm7MbkY9lzlJx1+q90RpNq+2sQjBDHQrNAsddUqrjWVklYVxHAiQYgxvpnatKuOFYJWvaHyt45K1KBBLNUw+jH4LkEr8s3mjLui/KzrMx3yVHuH8ply7v93TbpDUAaAraFaRcmeEU09Qxwn0Aacyqcaq1HKpo7a7Y4Ru11lCjxNEFMyPSJ0jLI67IUPqFHO1KfyO5N2R4F/MaIqxwuzOH4GMQEUrgAAAABJRU5ErkJggg==",
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAPElEQVQoU2NkQID/SGwQkxFOMDAwoEvC1DKCVCFLgnUhiyErgEnCdIM1opuA5gwSFRC0gnwFMG9hM4ERAHiZEAQ0pZuCAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAOUlEQVQoU2NkgID/UBqZYgRxQAQ2SZhCRmQFYB3oJuJSALeWZCvQ3YPTDVitIOhILEHBALYCb0ABAO/GDwdz5z7GAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALUlEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEF0HVSUgBmN1VVw78AsxPAgADRBCglCLNugAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAALklEQVQoU2NkgID/UBqZYgRxQAQ2SZhCRmQFYB3oJuJSALd2ABXAfUaUN/EGFACMxhAFX3dHJQAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEFsOmBiGEZhlcBrFFbLUbwCU4HhQQA0MQoJgR+LjwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEFsOmBiFBqF0w4MCZgHUSQANGsKCn3k73EAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAOklEQVQoU2NkgID/UBqZYmTEIQFWhC4J4sMBsiSKBLpOmCTcfnSdKA7DZSxYES4HYZVE8S6GI5B9AgDFeQ4FCQOfPQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAMElEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsSD0FaE5A2AuzgqACGjoSb0ABALbKEgMMM6NNAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAFElEQVQYV2NkgID/jCACxKISgxEAw5YKAu3knXIAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJ0lEQVQYV2NkwAT/GRgYGBlxSDAMKgmQU8EA5Co4B9npMOeiSzICALnBCgPHFOz/AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAN0lEQVQYV2NkYGD4z8DAwMiACv6DBEASIACTBPOJloDpRtGBbAsjslE4JVAUEW05yDgU52J4EADlxRIDOl3KLQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkgID/DAwMjFA2mAJxQIIwNlxu0EiguAzZVcjegHsK5heYJCMANSYKClL0VTkAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAARklEQVQoU2NkgID/DAwMjFA2OgWWA0mCGDCArhguh64QpAGmGNkAsCCKAA7rURTiMh1sELIkupUofGwKsfkaq4mUKyQqwAG61RUDc5+tPwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAARUlEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBhAVgQWR1cAE4OZilUBikZkE7CZhmICzH5kN2FVALcf3ZHYvInTBBRf4A0oAAHYFAPgON9kAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAM0lEQVQoU2NkgID/UBqdYmTEIwlWjK4AxEcxEVkBTBJmDdhaOiuAWYnTkViDAsNbaKoYAYuLEAPYtXDuAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMElEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdREmgWIPLDhTLYXbgtJywBMyJKEYBAIGlDAenwGauAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAO0lEQVQoU2NkgID/UBqdYmTEIwlWjK4AxEcxEVkBTBJmDdhakhXAHAvXiG4Cum8wfIHhK6K8iS2g4BoBNekSA+cAhDsAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMElEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdREvA7cJlB1bLwXYRpQNFEbITUZwLAC59DwVBz+bFAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAM0lEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEFsOlDswGY52A50AHYhugTc2Xidi9WDABNRCgbvjleAAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJ0lEQVQoU2NkgID/UBoXxchIhCKwZpBCdAAzHUVuVCEsmEDBgxEaACwYCgoQcgdNAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAM0lEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsOKQUIPsE5nAUX6AFA6rf4TrQVDECAMLREgNP77PAAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAO0lEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsOEAKYNZidQNcEt0XaL6E+ArmNWRdKF5G9jtW7wIAfKYRBhzGp8EAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAPklEQVQoU2NkgID/DAwMjFA2OgWWA0mCGCCATyFYkvYK0W0A87FZTT2F2GyAmQ4PErgAjrAEhyMMYHUbLHwBcyEXBAc6So0AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAOUlEQVQYV2NkgID/DAwMjMhsEAckCALIEmAOURIwRajaoUaCjUUxF10Crh3qADCfaMthfkL1FLIHAdqoEgXHmUHCAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAP0lEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsSLQCZFNgmuDGwgXQ3AF2A7KjkOXBcugOg/kILkc7BXCTAZrHDghvVKN9AAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAM0lEQVQYV2NkYGD4z4AFMELFMCRhEjA9MAWMREnAVYO0I+vAKoEiiKwDqwQ2f4BdhdWDAAd8Cghbtf+SAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMklEQVQYV2NkQID/UCYjiAYTDAwMMEG4GEgCWZA4CZgtWO1AtgfFctIlMFyGzblgxwAADSsKCtxhVEcAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMklEQVQYV2NkgID/UBpGMTJiEQRLgiTQAVg3URIo9sB0ELQcbjSyq1Dsw+tcdPPBrgUACngKBldb/zEAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkgID/UBpGMTJiEQRLgiTQAVg3URLI9oDtgAGcEigK8NqB7gcU52J4EADifAoFhfIAGQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAARElEQVQoU32PSQ4AIAgDy/8fLSkRwqJ4Ip2RFMF8B4B4HMMNCAvLQoaUjLnQ4VfgB5djQwk24XHQ3sF69DMZjg59dREU6c4MCosk97kAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMklEQVQYV2NkYGD4z4AJGBlxSDAgS4DYcECUBIoGmHYMB6CYC9UCVoRXAps/4DrQJRkBE1UKBoO/LfYAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAM0lEQVQoU2NkgID/UBpGMYIYIAJdAq4AWRKsGhkQLYmuiXQ7YQ5kxGYnVkkMx8KcjzUQALULDAukvfWwAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANElEQVQYV2NkgID/UBpOMWITBMmCJNABWDfREnC70HXAJBiRJZBdhlUCrBibDgwJmEfBEgDZyQoG1sJZ8QAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdeCVw2kHQcuLtQPcD3LlY7QAAAIEOBc8LaAcAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAM0lEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdREmgWIOiHVkGJoEsBnYhXgl0P8Cdi9WDAFybDANVXhK2AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdg0YCxSsoTkSSYQQA8qYQA2mevikAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAHUlEQVQYV2NkgID/jCACxCKFwQhSDAYwXWARsDkArNIJBMuc9PwAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAFUlEQVQYV2NkgAJGyhn/QUaAzAEzABU2Agls+2mEAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAGElEQVQYV2NkgAJGyhn/GRgYGEHmgBgMABVAAgogF271AAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANklEQVQYV2NkgID/UBpGMTJiEQRLgiSQAVwnugTcWKJ0IDsAbDkMwCTAYtjswHAVSAdcIU6jAKevCQfmOOLwAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAIElEQVQYV2NkYGD4z8DAwMAIIkAcGAMuQoiBqR0kwggAxoUFB1CoJVAAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAG0lEQVQYV2NkYGD4z8DAwMAIIkAcGAMuQiYDAKCqAglJxe2oAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    s222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAAJUlEQVQYV2NkYGD4zwABjDA2iAECIAk4G8aAyiG0oAjAzBk4QQDx/AQJlvcoDAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    }
                },
                Heleela: {
                    resize: !1,
                    height: 7,
                    spacing_top: 8,
                    spacing_left: 6,
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAHCAYAAACP+oQ+AAAAAXNSR0IArs4c6QAAAHhJREFUOE/FU0EOwCAIw/8/2oUsNU2FIV7myUCxlcKw90wzG3L3GB/PMw65DHdSC+6NqBIFsYpTUYrzfFXLovDprTtMnHWFib6EnuCi+rnUJVYhrNYynO1jXLd2vRmRoUO/dqo7U9Gs3MZS+ypRbENn06Lt01go6gGOjjwBuNlfUAAAAABJRU5ErkJggg==",
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJ0lEQVQYV2NkgID/UBpOMaJJgPhgRcgSMDbYBLgKfEZh6IBZTpwEAL5EDAEMU2EGAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAK0lEQVQYV2NkgID/UBpGMTIiSaCw0SVgOsE60I0BG4LNKLCduOxA0YHiMADKqgsEaDqRqAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAIUlEQVQYV2NkYGD4z4AEGJEEQGwGmACYQ5oATDXcDLg9AMHGBwYKo9yjAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAI0lEQVQYV2NkYGD4z4AGGKF8kASIDVaALggS+0++INxMDNsBZRAMAUwiOtwAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAI0lEQVQYV2NkYGD4z4AEGJEEQGwGmACYgywA5+NVgWIG3B4Awb4HBk9dTEUAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJ0lEQVQYV2NkgID/UBpMMaIJgvnIgjA2WBBFK0ghTpUwi1C0YwgCABpKBwdpHO+uAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKUlEQVQYV2NkYGD4z4AKGBmRBEFsMIAJwgWIEoSZDTcTph0kgWIR3A0Af7gJByhwwvgAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAHklEQVQYV2NkgID/DAwMjDA2nEGUIEgrCiBNO4btAJkkDQG9HqVlAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAGUlEQVQYV2NkYGD4zwAFjFAaJMBILgduGgA9YgcGXO/GXQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKUlEQVQYV2NkgID/UBpMMSJzoJKMpAmCzIPpALNBHJggzDK4mci2MwIAU0YJB9xS0lkAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJ0lEQVQYV2NkgID/DAwMjDA2nIFPEKQDrAXMQAKMyNrh4kSZCXYJAHJYDAKZwxxaAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAIUlEQVQYV2NkYGD4z8DAwMgABSAGtQRARoINhhkKs4QBAMI5Bwd6rkx5AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMDZyIJwtTBBFBqZA1MJNxOrRSiCAOgYDgF0D026AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALElEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMAk8AvCdIBpZA7ICLBRRAmCVQMAQSsPAe5drGkAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAI0lEQVQYV2NkYGD4z4AGGJEE4WwYA0TDwH/SBUFaMcxEsR8AeQgMAYZLnh0AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKElEQVQYV2NkYGD4z4AGGKF8kASIDVaALggS+48sCDcEm0qs2rELAgDcSwkEYMMnowAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAALklEQVQYV2NkYGD4z4AJGBmRJFDYMA6IhgGQCXAdeCXAKqFGY+iAOQTFchS3AQB6Rg0HDPsx3gAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKElEQVQYV2NkYGD4z4AGGKF8kASIDVaALggS+48sCDcEmyAjQe1wBQDzLAsCEgmQ6gAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAALElEQVQYV2NkYGD4z4AEGJEEQGwGmACYAxMA0XBtcBmogv/IAmBVyIaCFQEAqWEHAzfTKn8AAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAIUlEQVQYV2NkYGD4z4ADMCKJIysCiyNLgvggBXCxgZAEAM8uBwelxUp+AAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIklEQVQYV2NkYGD4z8DAwMiAAP9BHFoJgqyBmY9gINnOAAD0HA0BOdJE2AAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJ0lEQVQYV2NkYGD4z8DAwMiAAP9BHAoFQaaBjIABRpgFWAVhqsGKAJ9iCwQRUQNVAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAMElEQVQYV2NkYGD4z8DAwMiAHfwHSVBXAcg0EIBZCbYCBGAS6C5hJFoBzBRkDWA2AEU3DQS9dtv1AAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAANElEQVQYV2NkYGD4z8DAwMiACv6DBNAlQHy4SjAHykeRAAkiS4J1YKgG6USXgDkBq+VgYwFt1g0Dhf5oVgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALklEQVQYV2NkYGD4z8DAwMiAAP9BHJyCIHUwBQgGknYUs2DiGGaCzIerBHNgAAB5FAsBOAqAeAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKklEQVQYV2NkYGD4z4AGGNH4YAXogiCx/yBBdO2MMEEUHcgq4RLYtDMAABV+BwRhYNY0AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAJUlEQVQYV2NkYGD4z4AEGKECMJoBWQCk7j/xAiDlYNVww2AWAQDI0QwBWzx8wgAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAL0lEQVQYV2NkQID/DAwMjCAumGBgYAAJwPkgQZgAiiDMAAztMCNQzMQQRDYTbBQADsgHB363RM0AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAALUlEQVQYV2NkYGD4z4AJGBmhEiAaBGCKwBLoACRJnATcGJARGGbDzIVZjmERAP08CAcowyckAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKklEQVQYV2NkYGD4z4AGGKGCIBoEwApgHGS1/5EFYcYw4lQJUoFhJobtAJFFCQICBG1BAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkYGD4z8DAwMgAAWA2iEOaIEgrXBeMATUSQsEsgAnCLUJWBRYEAKilCwc7KHSXAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKElEQVQYV2NkgID/UBpMMSIJwtj4BVGMgGtBMvM/SBBkCbLZqByYagAjzAgDWzep5gAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAJklEQVQYV2NkgID/UJqBEcoB0WAJdAG4CpgO3FpAKsDaYWbAtQAASBYKAtS1FdgAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJUlEQVQYV2NkYGD4z4AGGNH4YAXogiCx/9hUMiILgrSC+cQLAgDxjAcFwADvUgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALklEQVQYV2NkYGD4z4AGGJEEQWwQ+A8ThAnABcEMJBMYcaoEqYKbB9KBbBHcBAAxSAsCJzk2mAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAK0lEQVQYV2NkYGD4z4AGGKGCIBoEwArQBcESMEEUA2DakAXhKpElsWpnBAD5/goCIRqEfgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    }
                },
                Darkstar_3: {
                    resize: !1,
                    height: 12,
                    spacing_top: 13,
                    spacing_left: 11,
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAMCAYAAACZW2gkAAAAAXNSR0IArs4c6QAAARZJREFUWEftWMsSwjAItP//0Tq10kGG5SlqZuqlh5A07MIudbsdv/vriR4bW7hiBzDbASZgOdgaOTyWeKE9khwZaxEp78DP0s6R67J4eD4oN9qjxU7ltp8LMe6CgBKpnhsB3gKPk4IKR+to673VNQLeI/u5bgHmrUfB7oCbAUF2xr8Rocn+eccqEV6SUZIyZHuxnyJiKrfliCB/8gAxNVd0O9d9T5q891aLTMrmmw9/qyP4JSxj96YzDSTkCx6g1X3dAUctig4RWquhiSVkWEnPMlu92RETuS0nTVHSJonwujYyLUpPKxORnVhQd01NTasRYUplVe88/a0aWpY09DGHqhF5TEeiOx+g514yx+tvi4PSn+HwAM9L+QPNLBGkAAAAAElFTkSuQmCC",
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAO0lEQVQoU2NkgID/UBoXxciIRRFIDEMzukJkPoocWQpxOQPsfpxWQd0JlydbIbbgoZPV6DGE4hmiohAAre0eA2qMPasAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpAjERgdwA9AVopsMl6efQph7iXIjsrMY6OdGWHjiDB68AU5UFAIAMQgeA50LZ2UAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMklEQVQoU2NkgID/UBoXxciIRRFIDBmADUFXiE0jWBOyBE5Fw1ohtuCChydJAU5UFAIA5GQWA2QTZlAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMklEQVQoU2NkgID/UBoXxciIpAjERgYomtEVIksiyzHgUwgyHS4/YhTiDR68AU5UFAIAOPweA2TznIYAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAANklEQVQoU2NkgID/UBoXxciIpgjERwdgQ5AVomtC0UB7hTDrMDxHe6txhidZVsPCFWeAExWFAOR0FgMDpOeuAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMUlEQVQoU2NkgID/UBoXxciIpgjERwdgQ5AVomtC0UB7hTDrMDxHe6txhidtrCYqCgH4ZBYD4fD3zgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPUlEQVQoU2NkgID/UBoXxciIRRFIDBmADUFXiE0jWBOyBE5F9FWI7CEMz+AKAfIV4g0uQgEOjzGYowlGIQA6pRoDzeJ4egAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALElEQVQoU2NkgID/UBoXxciIpAiZDdMAFxtECrF5BuzRQeRG9IAnLxyJikIABwsfA8Lwq48AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALElEQVQoU2NkgID/UBoXxciIpgjEhwEUzegKQYqwiWEVHFUID1SSApyoKAQAvFwWA+b+U7IAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMElEQVQoU2NkgID/UBoXxciIQxFIHAbAhuBSiCE3qhA9sFFCBD14MAIaphsmQTAKAXRcFgOUS7hiAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpAiZDdKAwh9ECmEeQ3cvioNBkjCAEQq4PEPQRJhJRCukLByJikIAaAMfA84/NH4AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAKklEQVQoU2NkgID/UBoXxciIpAiZjaFhVCH1gwcUyCBT0QE41mASBKMQAABrFgPiUB3GAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAANklEQVQoU2NkgID/UBoXxciIpAiZDdMAFyNbIbIzQIbA+egmEq0Q5Clkkyh3I3owDRYTiYpCABExIQN9zS/KAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAQ0lEQVQoU2NkgID/UBoXxciIpAiZDdMAFyNbIbozcJpItEKQp7A6B5sg0QpB1sMUE/Q10QphpsI9hy8cQXIoComKQgAsVyQDGACA8gAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALklEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLjSokOnhg4YYzwImKQgAo/B4D2akYVgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMklEQVQoU2NkgID/UBoXxciIpgjEhwEUzcgKsWmCKx5ECpF9TbRnUIIKn2fooJCoKAQA7rsaA7z5S2AAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLDVWFWN2NyzMwcaJ8DQtTcFiSFOBERSEAZhcgAxCAmNAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMElEQVQoU2NkgID/UBoXxciIpgjEhwEUzcgKsWmCKx5ECpF9TZRn0D3GMMCeISoKAbDpHgOf8AySAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpgjERwdgQ5AVomtC0UBbhTCnIFsJ9yRedyH7YZAoxBnYyL4kGIUAkHgWA65XgEsAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAKklEQVQoU2NkgID/UBoXxciIpAjExgbAhiArhCnCJjaqEB6ElAcPUVEIALhgFgMWuMBlAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALElEQVQoU2NkgID/UBoXxciIpAiZDdMAFxtVSP3gAQUyyFRkAI8xmATBKAQA2AMfA1Tnx30AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAM0lEQVQoU2NkgID/UBoXxciIpAiZDdMAFxskCkHuwukUdA8MoEKYOzEiAVcgY1VIVBQCAHj7HgOyqdUWAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpAiZDdMAFxtkCkHOgXkQrxupqxA5TJFNZkAPHqIVoscQimeIikIAnFAjAyRvX04AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOUlEQVQoU2NkgID/UBoXxciIpAiZDdMAFyNLIcgUnBrRrSNaIcxUDA/i8gBBhURbTZRC6oUjUVEIADDsHgP1QpZeAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMUlEQVQoU2NkgID/UBoXxciIpAiZDdMAFxskCkHuAjkFGcA9ic0DMA0oITFUFBIVhQBOwhoDdrNy6AAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPElEQVQoU2NkgID/UBoXxciIpAjExgbAhiArxKYILo9PIYocxQoxDMBmIlZb0AVxOoUshXiDiqQAJyoKAZx0FgMI89SmAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIQxGGODaFIDEMW8hWCDONKBNBiohy42BXiOxrWCyBYw1r4GKJR0YAlGwWA5MfJ2EAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAR0lEQVQoU2NkgID/UBoXxciIRRFIDAbgBqArxMlHlsBlOthUbJLI7oTL41OIIkexQgwD8HoAq2Ohgjidgh482GIGHjxERSEAY50YA/9QoxAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPUlEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLYZNENpF6CmFuxepGdB+jOIu2biQpePAGOFFRCABRjhgDxlLwTAAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAP0lEQVQoU2NkgID/UBoXxciIRxGKHC6FIHEUmyhSCNNM0GqiFCKbgtdEohTCfIoeluAwpjgcMQzBCFgcccgIAEK0GgNze/cgAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAO0lEQVQoU2NkgID/UBoXxciIpAjExgbAhqArxGky7RWiuxHuFGSrsXkELk9bhdhMx2k1eqCjeIaoKAQA+4AXA+SK6+MAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPUlEQVQoU2NkgID/UBoXxciIRxGKHC6FGOLYFGLVjC6I0ylkKQRpQgfw0EA2Ea97aasQ5D50d6K4kagoBABIkhkD7DiHPwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAN0lEQVQoU2NkgID/UBoXxciIpAjExgbAhiArxKYILo9PIYocxQoxDMBlIlEKsWrGJkhHhURFIQCUYBYDYexYVwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMUlEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCL0VYhzKrB7Eaig4egZ4iKQgAd9R0DAJhezAAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAQUlEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCL0VYhzCp0D4Hdic1dyAqxuhFb0FCmkOjgweYZlAAnKgoB4sAaA1kzD70AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALklEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLjSokOnhg4YYzwImKQgAo/B4D2akYVgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    }
                },
                Lava4267: {
                    resize: 1,
                    height: 5,
                    spacing_top: 6,
                    spacing_left: 4,
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHNwyMGUAikAOAcrF+3AAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4zwAi/v9nYITQ/xkYGRkhHMIyAHlWE/huZ7j8AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGklEQVQYV2NkYGD4zwAFjCDO//8QPgEOTA8A1zsN+K0XLxQAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4zwAi/v9nYITQ/xkYGRkJcWB6AIWhE/vKrfqbAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPpgDYoAEsMuAZAHLRw34EqdRrwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPpgDYoAEMGVgygDgMhD1cjfJQgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPnYOIyMjRAamBwDXaw37eCOlbgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4////fwZGRkYGRgwOAxRgysD0AAA7QxEBmOp70AAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV33LoQEAAAiAMPj/aCwGk7QFBGKzSqXiwX0GAFkW+NftOzUAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIUlEQVQYV32LsQkAMAyA9P+jDYF0rZugAnFYpVLxkfdsNglQGfWtm0nlAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4////fwZGRkYGRgwOA0QEiwxMDwCR7BP+0bKa4wAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkYGD4////fwYQYCSBA9YABACHmRD1bb59ggAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAKklEQVQYV4WKQQoAMAyD9P+Pzsig3XEXE0SBUCSovZQZMbvyJq30lV95AEQ4FwG0JrxXAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJ0lEQVQYV2NkYGD4////fwYQYGRkZGAECYA4IEG4AIwDVoVVC7IZAII2FAFREIYzAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJElEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHAwZkABcGYgDAIoHDftrKQwJAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2NkYGD4zwAFjCDO////GRgZGRkIcEBaQEoB4TcQ/lbzSGIAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJElEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHJAEWABDBqYMAODpEP6s9Dt1AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIUlEQVQYV2NkYGD4zwAFjCDO//8QPpgDl4EJMzIyosoAAIDCCv7LbuG1AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV43HMQEAAAyDMPAvmj4TsHwRiGOVSsUzAypEHPXXJqZoAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkYGD4////fwZGRkYGRhI4DFAAAIlDEQHMmbdoAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4////fwZGRkYGRiI5IA0g9SB9ALMuFv6A7rCZAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJklEQVQYV2NkYGD4////fwYYYGRkZGAkXRCkDWQMXDvIPJgAiA0AxikXAdqxzMcAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2NkYGD4////fwZGRkYGRhQOSBgkCpbFqQwAAO8W/syQxWUAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4////fwZGRkYGRhALxAALEMcBANs4H/WskRtEAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJklEQVQYVzWLxxEAMAzCpP2HJodj80IUgbAyyYDKQE0zO9vyw30eRrwQ++h++G4AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHklEQVQYV2XIoREAAAyEMNh/aN7V1OVilYpAAN48DIQgEQEWfGzSAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJklEQVQYV2NkYGD4zwAFjP///wdzGBkZGcAcEAMsAFIGlYRwYHoA8AQN/oYYrfMAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJklEQVQYV2NkYGD4zwAi/v9nYPwPIhkYGBgZGSEcEAMsgCKDrAcAqYkT+6GeNpMAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAI0lEQVQYV2NkYGD4////fwZGRkYGRgwOAxQwgtUwMECUIXMAUysRASi4GZgAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIklEQVQYV2NkYGD4zwAFjCDO//8QPpgDl4EJMzIyImRASgGJuQ37SO3wUAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPpiDIcPIyIgqAwB0zgr+8u3z+QAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2NkYGD4zwAFjP///wdzGBkZGYjkAAAdExEB/JZkggAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHMIyAHVMCwGqDo0PAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJUlEQVQYV03JwQ0AMAzCQHv/oalKo6j8DguEmRdJUCm29IZXfhyiKA4Bu3ymkAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2P8////f0ZGRgYQAJEgPgNIgAAHpB6kFACeOhP+HucMMwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHUlEQVQYV2NkYGD4z8DAwMD4/////4yMjGgMFCkAaPwQ/rlJqWUAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAGElEQVQYV2P8////fwYGBgZGAgxGRkYGAOjiE/XIhZVzAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHUlEQVQYV2P8////fwYGBgZGTAYDAwNCipGRkQEAuRIQ+EwHUMcAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJUlEQVQYV2NkYGD4zwAFjP///wdzGBkZGcAcEAMkBpcByyLLAAB8mxb43Bdv6gAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHElEQVQYV2P8////f0ZGRgZGEIOBgQGNAZcCMQDpexP7PVUR8QAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAG0lEQVQYV2P8////f0ZGRgZGFAYDAwNEBIUBAOmoE/h3QASpAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4////fwZGRkYGRhCHAQrAHMIyANhADgESNXizAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    }
                },
                AaronLightning: {
                    resize: 1,
                    height: 10,
                    spacing_top: 11,
                    spacing_left: 7,
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANklEQVQYV2P8////fwYGBgZGRkYQxQDlMjDilAApQlEJ1QnSj18CbAESgOvAKQF3DdF2EK0DAHyHJ/tw1pLMAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJUlEQVQYV2NkYGD4z4AE/v+HcBkJSsBVMoLUIunAKQGzZlDYAQCReCfv3j7FzwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKUlEQVQYV2P8////fwYGBgZGRkYQBQeMOCUYGBjAOqAaEToGVIJkfwAAgPcn7wEFxioAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJUlEQVQYV2NkYGD4z4AE/v+HcBkJSsBVMoLUIukYUAmYVwj6AwDEFSf1cp1NBgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAIElEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JdGsG1A4ALM0V9V8Z4nwAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKElEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JmDUwBRh2YEiQbgfROgCbiCHpnJK4awAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAK0lEQVQYV2NkYGD4z4AFMBKU+P8fVSNcBw0kGBlBpjMwYNiBIYHuFZz+AAAonhv1TKHPvwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJUlEQVQYV2NkYGD4zwAi/oMpBkZGRghNAwmwwUgAbgdOCRq6CgAsYSIBNiQjQAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJ0lEQVQYV2NkYGD4z4AFMOKU+P//P1gHIyNIDQMDlMvAOKASJPsDAB6ELe9+k+6aAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2P8////fwYGBgZGRkYQBQeMBCVgSmE64ToGRIKBgQHsDxiAeosB5CusEgC4iSf77KcjzAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMElEQVQYV2NkYGD4zwAi/oMpBkZGRghNUAKsDFknTAdOCZgdMAUYdmBIkG8HQX8AAMFIJ+9xKMrGAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAIUlEQVQYV2NkYGD4zwAi/oMpOGAcohIonmBgYID7A10CAHbzIenjALCeAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAPElEQVQoU2NkYGD4zwAi/oMpDMDIyAgWA5GkKYQZBTMZZhJMHG4i0QrRTULnY7gRZiVBhejeJt/XVAtHAGa8LgGBZGHUAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAANUlEQVQoU2NkYGD4zwAi/oMpOGBkZASzQSS9FMAsh7kFww0EFaDrhGnA8AXMaJwK4BLEhgMA2XgoAaJ0T8MAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuY0Al0L2C0x8AL2QcAbryXgoAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuA6cEujXE2wHTiWEH+RIA1SEb9V+gqK8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAALElEQVQoU2NkYGD4z4AF/P8PEWYkWgFcByNIDwMDhglDQgEsKNAdixEO6AoAWDE56f/4wu8AAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuA6cEzBq4AnQ7MCRIt4NoHQChlyH7ObyMXQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JdGtw2/EfzQxGRpBaBgZGnBIEnYtuOQBePhX7Zt24dAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJElEQVQYV2NkYGD4z4AFMOKU+P//P1gHIyNIDQMDlMvAOLQkAGfuOenclfG2AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAI0lEQVQYV2NkYGD4zwAi/oMpBkZGRgg9RCXAjkcCcH+gSwAAhH8iAWCP9b8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJElEQVQYV2NkYGD4zwAi/oMpBkZGRgg9xCT+Qz0Acz/cP7gkAM3pLftu5+D4AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMElEQVQoU2NkYGD4zwAi/oMpDMDIyAgWA5HDVyHMl7BQwOlrnAr/Q7XiUgA3mViFAIPnOfuj2iLDAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKUlEQVQYV2NkYGD4zwAi/oMpBkZGRghNRYn/UMNhZsPtwilBRctxGQUAI74t++x+nnAAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJElEQVQYV2NkYGD4zwAi/oMpBkZGRghNRYn/UMNhZsPtGkgJAJfGOe8JHmrvAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAN0lEQVQYV4WPSQ4AIAgDp/9/dI0HSEQbuU4XKsA8ThHYPhzS1oK+oJQV0I4LVPmoor+KYE6JOxZX8yH1+rXysgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV8WNMQ4AIBDCyv8fjTkjTDrLwtAUZNsAkqYaPQGwjSPWHP8OMpXxfPXjB1jozigBqj8/pAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAN0lEQVQYV4WPQQ4AIAzCyv8fjfGwJU6JuxbSIcA8ThHYPhrSzoK+oJKl68YFSj5U9FcRzClxxwKNkxv71dECOQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkYGD4z4AFMOKU+P//P4oORkaQWgYGRoISMJUw6+A6cErAVRK0g2R/AAC/BBwBXttm/AAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkYGD4zwAi/oMpBkZGRghNAwmwwUgAbgeGxH+Yc6AycFdRTwIAjAEiAYnkD0QAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANUlEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JmDUwBRh2wCX+o5nByAhSy8DAiFOCoHPR/QgAKJ4b9RtbCKAAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALUlEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JdGuIt4OREaSWgQHDDgwJou0AAC5uFftdKga1AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKklEQVQYV2NkYGD4z4AFMOKU+P//P4oORkaQWgYGRhpIwMyGWQm3g3IJAKfrLfXudqbRAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuA6cEujUDagcAMmcWAUt13poAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANklEQVQYV4WOQQ4AMAjC4P+PxiwbHMyMXktBAhA+xxVIVyRPFogxgj4zb8gdT8nGCpzMEzY6KKuhIfsLVDWRAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuY0Al0L2C0x8AL2QcAbryXgoAAAAASUVORK5CYII=",
                        spacing_left: 7
                    }
                },
                Art_Deco: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAICAYAAAC2wNw9AAAAAXNSR0IArs4c6QAAAIZJREFUOE/lVFsKwDAIq/c/9IYwWZAY508prF9itBpftt53PaIRHahW4GGPmMvoH1i27WLgPxNfw+Q6GZPLSXtQRqTyQXvly7DQUawjoT7EzkwJua9KTBVPFtYJjatAurGTUNuh3xH6uvSTHcojx44O2rDxLndIXasTd+iYkas63Z3/0dm+Af64VQNgT+mAAAAAAElFTkSuQmCC",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAHUlEQVQYV2NkgID/UBpGMTJCBUE0Mvg/4BJYnQsAcUwOA3q1iz0AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJElEQVQYV2NkQID/UCYjiAYRyAIgNlwCSRNYEV0lYK5CdgQDAMM8CQiY5S+uAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAANElEQVQYV2NkgID/UBpGMTJCBUE0MviPVwJNMcRoDCOgqsB2wADIAXA+jIEiCDMK3algEwBltwsEdbBpEwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALUlEQVQYV2NkgID/UBpGMTJCBUE0MviPIQCVBevABjB0wBThlwC5CKflGM4FAMe0CgT8rlbIAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkgID/DAwMjFA2mA/jkCaBrhrDKCQrUC1EloBbjqIa2VUYEgBDswwBBumLvAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAL0lEQVQYV2NkYGD4z4AFMEIlQDQKgElgiGOohKr4j1cCZDm6ArAOnBIgY9GdzAgAh4cKBIDzw9AAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALklEQVQYV2NkQID/SGxGRigHJAhjg4VAHAxBoiSQjIeYhMuo/3glQFqRnQo2CgCk6AoHBfWQhAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAANElEQVQYV2NkYGD4z4AFMEIlQDQy+I8uAJNEkQAZCTcBwwioJFgFXDsuHTCjwAqx6QBLAABdjwsGC5GHMwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJUlEQVQYV2NkgID/UBpGMTJCBUE0MvgPEyBNB0g1VqNIl8DqXADvrw0EH3F/qgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALklEQVQYV2NkgID/UBpGMTJCBUE0MvhPngQ2OxjQzYbZA7YDHYBcCHYVulFgMQCwUwsEL9X5YAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkQID/UCYjiAYTDAwMIEEUNl4JZNUwg/+DdJAngeQ4CBOnUQBZXA4E4VcM5gAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJUlEQVQYV2NkYGD4z4AJGBmhEiAaGfyHSaDrIawDp1GkS2BYDgD7ow0EsknJggAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJElEQVQYV2NkgID/UBpGMTJCBUE0MviPS4KBZB04jcIvgdW5APO7DQQZvjmxAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJ0lEQVQYV2NkYGD4z4AKGEFcEAGSAHOgAMzHJgGS/09PCTQXMzACAH3bDgSjTa9aAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIUlEQVQYV2NkYGD4z4AFMEIlQDQKoIEEsvlg+wjageFgAGd8CAfUe3L/AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAH0lEQVQYV2NkYGD4z4AFMEIlQDQKoIEEzHy4XaTbAQBnkQgICb1/BwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJUlEQVQYV2NkgID/UBpGMTJCBUE0MvhPPQkGdKPgjsBrB1bnAgAtkA0EfmxgCgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIElEQVQYV2NkYGD4z8DAwMiACv6DBAZcAs1REGdidRUAD7IPAfvTYBMAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAG0lEQVQYV2NkYGD4z4AFMKKJgRSBxQZcAqtzAR+ICAcDZ/2UAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJElEQVQYV2NkgID/UBpOMaILQBUx0ksC5CJku8B8mACyc8FiAC2RCQg7FxboAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIElEQVQYV2NkYGD4z8DAwMiACv6DBOglgWY3AyPplgMA9tYPAnlNQ4QAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAG0lEQVQYV2NkYGD4z8DAwMiABkACg1cC3bUMAGhICAjplMR9AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAKUlEQVQYV2NkYGD4zwABjMhsGAdFEKQAWQKkC6QbLEZDCagDMe2ASwAAV2wVAl+bVB8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAMklEQVQYV2NkYGD4z8DAwMiACv6DBEASIIAsSYEEzEiYcXCj8EqAHABzIYoOmIPBrgQA5qYTAfamXtAAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAHUlEQVQYV2NkgID/UBpGMTJCBUE0Mvg/4BJYnQsAcUwOA3q1iz0AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAI0lEQVQYV2NkYGD4z4AJGBmhEiAaGfyngQS69TgtZ8BlOQMALJEMBQSUP3wAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAKUlEQVQYV2NkgID/UBpGMTJCBUE0MvhPQwmQI8DGY7MD7EKYa9CdywAAsEMPAqnFMlMAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAH0lEQVQYV2NkYGD4z4AJGBmhEiAaGfyngQS69WRYDgBHdg4DkHAESQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkgID/UBpGMTJCBUE0MviPS4IBphKrUWimQOwk2Q6wDqzOBQArGAsF6pMEbQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAGUlEQVQYV2NkYGD4z4AFMKKJgRSBxQanBAATmQgIVtYshwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIElEQVQYV2NkYGD4z8DAwMiACv6DBAanBMihIJchA0YAJLcPAtg2aHIAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAKUlEQVQYV2NkYGD4z8DAwMiACv6DBOghAbIW2R4wG+YanBIwXSAarBgAIQQPBKHiWEIAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkYGD4z8DAwMiACv6DBIiSgCnC0EElCZAxIAB2EMyZyC4DswHRthUCZ4dymwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAMElEQVQYV2NkYGD4z8DAwMiACv6DBKgoATId2TgwG2YpTgmYLhANVgxzFVwAaiwDAAxHDwQvIdchAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALUlEQVQYV2NkYGD4z8DAwMiACv6DBHBKgNQiS4LZMCNwSsB0gWiwYgxLyZcAAGUkDAfv8mklAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALklEQVQYV2NkYGD4z4AFMEIlQDQy+I8hAJVlhEnAjIMrxGUUA147QMZgtRyrcwE6qwsE2AB23gAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    resize: !1,
                    height: "8",
                    spacing_top: 9,
                    spacing_left: "4"
                },
                Old_English: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAAbCAYAAAAZHp/iAAAAAXNSR0IArs4c6QAABPxJREFUeF7tWtluGzEMbP7/o1u4gAx6di5pnSINkrfEu5TIuWi0H7/yz+/xyEd4fD27npu/qzqPv6e6+Zb7T+z0larfrYVzc+edzHjVm/fEMx4YpHvg+xNnhyGry7jxUiORgjWj3lGNp6bdwNgAE1ESsPM+d+u7ntt7/osZJ3ImjNz7691dXjxq2nMbtrMh43t3FLlDztVQC/x8bjl0Oi8JNgG9Pm/qpLvMfu/M+FHHpVjj/Ol8hkl6xzo1GyBeVIE632XRjO+dCqERRyIrAqPcsyEUAo0CmL+neomc754x1ovuNZqZGKt4RxyQFzHK3fDYoc2lmksk10tAnUawGgjrK5FpEdNF2Q5w6LLOwd4xYyakJtKZ+TiRznTZEcTLOexFJK8aiiObi5DkckgAFW0NkVit6RbtQq/Wg2bPSumEc1REYK6EzpcM4DPIuYPDFCNG+kWYExwVnyqyUfWp8XZwcx1gDtXsR1O5CkA8pxFN45zTUVjPLCEYDgn0OwbAVrfWbJhQm9mlMy+Jg0PBXUzFVyLI6eDwvc8mpxKkcilU/q5zurk40rJ7ns6YiQddjBlNQ8D2ewWuEtMonue05FTRqtR2Orh3klMplTlpkwITHLenuZ1TzcUBnwTADCURKc0GkyfVw8/TKuPu/Lwb27nYxRnTGaAMmOSybh2445wJAEciBYYSjyKuEjWCg46M9ZyT7ZBTubPCiDpawVQk5w4vXsiJlq7IqQbk9tadwc24maRcA2JqPomR6Zxpr1NxqtYdd0cnFkwgJZxdcjXxnFxM4dsQEFcIJkJZh8XTKTmdA7rYbJxTifVfkbNZN3bEy5zTge1isjWAKfKUKiiyEyKqdJjmYE24JWcTW4mcjUs1JGjXhAQAOnKKcjYDRTJ2R5dQ6JzoOC05mxkz4rlYL1L8+Qhb/5jzMt5dUoepLjmn29XcbtG6HMbuV4p1FM8OqRI5XbTP2Z3OGEmm7uPOSkStSBf+TZ3unGi3k/FN5KR9SJHTvcd2z7vO6fpKw2fOrvbSRLb0JQGd+mR/c/005FRnujUL614ckZCTif75X9WcI7D4UxdQkZFcUzk4iwkGmiOIer6N9QkQE0typBYcZQBJ1PNOSVxq9cIeE6ndXRk3khBZ9F/IuS6F1q6sPg2OxV5q/DNiXcUvG7JLiTkfRe5T51BCfPeMmYG05Gx6dmsYzk/h8vc5tayiwhg5Wzd0zznXWU2e7pwskhrRpb5QPKwHVkOtL4wYzeqi5tO6ZxPr7M5IKFaHzbnZ118waxxxkiPFOSMEDiuBj9GJsdwAx+ILU2G3r+k4KkpVpOHawgBuXBxdTxGxcduGZC3Rmz2eRTszwecMFTnRVTFymmh2zzBw6VIcptO4slI/K93WS+RUglQAqXRoSaZ6YQJEkSLh6f5X4JB2+AaHF541+xU6111isnonxETl371XQ8yVDDvkTDPGWimdGpBd2ig8m5h3yZgSMbnwxQDb3aglghusc41Vf2fwLZmaKGwcCofXLP5sbk2PDdANdrsumFaLXYdXrsxIfhF8A8oOMRvCKPvfcYzmHKZURox2BmkNSF8McL9STpKI2fTOSORWOIfx7o6PfTVxT5OoaTTZ8Ts+Tw2844ydGrvuloS1c/Z3e7bBls7vq5DzqwHiIlvF6c8sOYqNcCmBfwb61WTx/e7TknN1/uTkDzm/Hxn+144uJP4DqmNNL3rH4IsAAAAASUVORK5CYII=",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAeUlEQVQ4T82TQRLAIAgD4f+PbgdGnABBD73UG7JGhKjS17O2FFMpEJGAgtn5G2gHnEHQ1Cymqgw0gQYHyB6AsCJY603KWNMncKveFP8G1knFvL2fdWRTi1LDm2PWhnugjpBdP4IIh6OazYjhux+pvabCET7+GexdAl+w3SUP19ZsSwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAWCAYAAADjGu3TAAAARUlEQVQoU2NkQID/DAwMjDAujAESRBEDSSALgiTBimESyArgEjAjYDpHJeChSqUgQY+o/9hiEGwpPI7RYpIRWQKkEJ4gAPsLGBUM3p7lAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAeUlEQVQ4T62TSw4AIQhD4f6HnolkMNAW42LcWV74FHXj85iZo4zCgvK0WL1UiOAEEVp6asFUAbO0NhCcWvFa+jgY2VCmptLCypD+BcmuqcfmYfqIPco1qoyUTWWUEIIjVMEjhKB6IJuZgrStWzBej/JNbkZ+pq/2jr1IIB0WLlbutgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAdElEQVQ4T62SWQ7AIAhEh/sfugZTCctgU1v/lOcMm6Ce634SHwoXAAsqjAczpDFTXyCDVNXeO8UiwHKknzOYe0CtWwiAdIq+uMk89dHix4o+z2D/S9XbyTCHmQKbNe2E35Bu/VpF6vR6H0OFaejfR6jJlzYNlgofDWHLFKAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAaElEQVQ4T72T7Q4AEAhF8/4PzTIl6YPN9M/uKXNvCthVAaBIaTkMASEq1jUoIYRDEEVq+ATKl4ZXH4HaN3fiEbil4NlzBTqRzyhlCiF8BVqT0qyp6S2oF7fbl204b7oForh9Bw8kmPUGq+IgFVDXDosAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAWCAYAAAASEbZeAAAAd0lEQVQ4T62SSQ7AIAwDk/8/ulWQcBPHLIf2hMQwjQ1u3/ekdVn6X5DfmBqUD2ESNm2hSCaB0M0NhmYdY58h1RUGXxYZomxic0unBod9mcjMrqD43QB3pgaVXvhlhInjt0tXUKuCe1KP8/ieyt0hSVJhNq5ApnwB+VQdDULsTtAAAAAASUVORK5CYII=",
                        spacing_left: 10
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAXCAYAAADZTWX7AAAAfklEQVQ4T6WTUQ6AMAhDy/0PrYEMBGzAxH2Z8NYWZAJ+LgDipfhIrAKl3qEMBPgFenwBeI6XWlYqYc8ltRSH/DazLxDr1MJrYVSZoDIrpkS7y3Z0DFnJ7X3SobgFX7tTwNQmu38QDd/t8rLFaPoP7sts9b4qKxTdHHJ9CGVtbgY9Jg54aDZfAAAAAElFTkSuQmCC",
                        spacing_left: 10
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAWCAYAAAASEbZeAAAAa0lEQVQ4T6VSQQ7AIAiT/z96C2ZokTa6zYMRLKUNWJvngnd62hNJgP+fgOwYFK2iIPR4vuf8GsEiPIGYqcS+tiit0B2yFY2MaQuiTpntIgNBOJpU/BlUzDCmfyApWu2TbPeKiQ4cN1NtRLsBgxwYFZtzvLcAAAAASUVORK5CYII=",
                        spacing_left: 10
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAWCAYAAAASEbZeAAAAcElEQVQ4T82SUQ7AIAhDx/0PvQWyNoJF9jk/TNBHlaZ25XWX2ryO7V0VwLl9gajkKmuDq1AZFwoi6BA6qpKE6iCA4uNqqvRCB3F8yHf+bD4dwZ+ZGV5Njm+QclxCMmOT49G0RqUkN8oxvjS6S2M6fwBpdCEL1kx+1gAAAABJRU5ErkJggg==",
                        spacing_left: 10
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAXCAYAAADZTWX7AAAAfklEQVQ4T6WTUQ7AIAhD6/0PvQWTkoIgH/onvnRAu4XzfACWlsMFgAE8/qaQAgGcIIMXIarY/VDUYqvaQfYZV3yGXC03Wu7tBpU96QJpzQbLvYh3DoVxk7kBItg2XqTFS7s39a6LTWkwZTx8t+lGiOvZqjlPZbS7DI0/Qp4SPxTRJg0gR8DVAAAAAElFTkSuQmCC",
                        spacing_left: 10
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAo0lEQVQ4T62UUQ7AIAhD5/0P7QIZppaixmx/Y3tQkNqe/HQRaxCz7w0D9k1Bwdi/DlmAM4liKTSBWGmnQoIMKfkDjGoVFL1hr97j7+CYIE17K/UKRIgHtKx4BGLGmOwVyFApNc5ntae4d2lXd0ueFgCzKZlHUtXaHYFsNdV/aaupl+8l2Q7PTZkYXY9m6NN1sLg62FrSVnyeSpVfVpUfqw3yRC/BBzgWUzsU0AAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAAA0klEQVQ4T51VWxLEIAhb73/o3dEpNoTELe0XykMIgY7P/X1BnuK4znE/zygvNRtRjH1E57hcvkrBQcKGbVOAyCScOW3UY6kDo+PL00jWDDisCvjleXkEjYDdIPLrjI8tsZNBlJWyfBMgceHEAwaRibZBVAqFgbTjNqYei44U4ikeuDYqEFtttCUoDjgMCuiO4+0AzP1WF4JZmN4TOS0UN4lc4hED5PjTzVTG2bFSbalSQlmYPPvXOQ2gAkul74KnraxG22GR1jWvsb9OaKB+Hq0APx58UBGc5NkPAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAk0lEQVQ4T+2UUQ7AIAhDx/0PvQUzTClFTfa7fYHjWYKAXfvvhhALexrEe7D/QwhDTIE7aFzAYCiEWqeaFBmKiyMD96eNiipFVE5lCFCpKcUJfwL5nZRfqs9V6/wfpMbGp9oWR00NtlxqAB4d1fjljDvnRHEIcZOnYX0dno7BrcDVUikboFsVJZNudXRqR8uK4STyAIB4ORWtj1AwAAAAAElFTkSuQmCC",
                        spacing_left: 15
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAAl0lEQVQ4T91UQQ7AIAjD/z96i2aQ0tUEFk/zZDQtBQrDzC4zG/bhTNAEV08K0gXPIEHgl070IEAZbYJdobyITqgUDgVGoNdEKmQwRmIS70ik93OwdOCRnNkg2CIenFRt5SwFZuMsk78eH/Mrl6VAR3Jm95RzxjYoX+N/mn9l+PKC4FErA30j8CSV99lOtiLANi0cym6v3xtXikYKmtxPEAAAAABJRU5ErkJggg==",
                        spacing_left: 16
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAmklEQVQ4T82UQRKAMAgD7f8frdMqTAhh4KinokmXCmVd/XODZNnaF+Tf4v0NTShZytiZzgZsNILRKmogssk2tgx27BokqhSRbMbjMaOiMRHJY2MqGh++i72MnVD9VT8jd4aKU72nxJ8bscZtqurWhMKjgK+Oavz0jltuQjwgbvJwWb9gdDv6QfIq0gSoRkXKpBodFXk0rNgcIA/sUTsUMtRyJwAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAAAn0lEQVQ4T+1UQQ7AIAib/3+0BiekYgW3szu5BEpbtOU5/yqUlnGuejiBQQCrPwWgzYKSAWwbB4USAWiz1Hj98t97/wKkHrCJ2jQN9QyYZi8BN7Z48AVg8QBNkyk7EycpKMGc1VumqyJbSE2MGIQmokHRPbgMSDCwPLgmvm+Bhcnkl38LGDIegIaPxbNbA04OczMKiyzy+kwF8EyytDbCDWPuNBh6LJa1AAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAYAAADUUxW8AAAAqklEQVQ4T52UURKEMAhD7f0PrdMOdCAkWN2/LTwQAoyr/91mHsyNPpqjg5FL/gpmICYff+HFMThmdTt7KzB+bgw+bbLmrkFt5igJOsqgWNP8f9Lp1S90VjB7P4KxaVvvk8wo5y4rwkxTNgufYAxAYXdig0IV6Gp2m6q57XaE2RAV2GVgwzNtafqo+GFxyzJYgLSSapsQTmdJTo+tX4TLPevg15snR4+Q5eo8U3I4E0jt04QAAAAASUVORK5CYII=",
                        spacing_left: 16
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAbCAYAAAB1NA+iAAAAxklEQVQ4T6VUWw6AMAjb7n9ozczADssr+rU46KC0zPF+1z5O5x+7HxIsl5CrxxVDk1cEXraTEaBVNr4kFXQAVjsaj4kLGLlgvdv7F2mX1QF4KOhUIKUfE6sCCOHCn4Iw8iTIjpjGRkKKBHRU4KkwE9lTqdVBNoWQg4oOfgGgoX5NgeqAEVmegvRuE9wdgJ6JlGjVRx/KANIlE0k5TfYMUvHHZ6EcW4Y8jVY+2kYzWT4sTmmtRyC0SmvnDAB3hbqRse39+7RxAxqwTBGLmi7MAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAiElEQVQ4T9VT0Q7AMATU///oNWTsKK0se1mfJNzhrgY974I4hoOIJM+BvgpgxVyvAC3GpBIikQNk3Rx7HAnnzjoKIbK+BriZVR0lzzp8BpAVTj4sMkcfSofvROpDtcMy0knWNoALzciOcX8CxANKv3tlXBTDqbQ7zXi+4vTu+NFMOyAGdD6hgCfQTjAXP4TfDAAAAABJRU5ErkJggg==",
                        spacing_left: 13
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAnUlEQVQ4T9WUUQ7AIAhD5/0P7aIJScFWgts+tp9F46OA0nadfb0FrpM49AxuMkjl0ww0aKyzAJNBUKVtwfDvQAyEKY4MMJNFkYGshHdA1j3VMKf4GFQPAPcXRXV/8W63qUaFrWK8O1uXFAdU6uoPm1OukXW23FVTXUZKzV86i5+B8QE4a8lczvkM1hBdjs1lNLF5JrNDCiEoDyhHvgHHPTgbiWheDAAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAAt0lEQVQ4T7VVQQ7AIAjD/z96i0twpRQxS+ZlhpBSW+uGveuC/dwOM/Oa7+c3LS8yADZuAXiaGoI9kkXXgOwQYNYDYEW10gLri3lFUYEo4R+gX0D8vMwEByatWDB2SGmWdOnuSQWS3OHpTBctTfZ+FTaZceoOxyCwPxX2CKQKICa5BFLHqYStsiRvbJcbZ7QI7JjsLlpwlkG6l0yGULmzE1M+oZ3FKkuzFkTusnMMIl8r8RdQ+j21GwoGQRcQOIzFAAAAAElFTkSuQmCC",
                        spacing_left: 18
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAnUlEQVQ4T91UwRaAIAzS///oevM5I8amh051yVqwBGZvz3XNZZ93fPa1lUadPwKesbQ6E4YCg46A3tnB1iXthowILPfmzNzJ3v8ZiCazFej58hEFQS/RjhSIgE9VDbYp49FjmdNdyLeR43DzHlW61lgpcYKSLLnq6L8puylGDoEa7FcAcA7VQIdgVHaUBNkAZ0ovj/GwSoUAFj9S2g1l5y4WD+bC6gAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAxklEQVRIS92VSRKFIAxE5f6H1oIiVBM7A4ob/zI/PDN0knLkfmd3K8q92iebdmB4gcl/8gbt1dbgEVDDKnQ87hAMwgVimh44BdQ1o+l10uRrpbwVqKOpgbyK8BMgdnJLhJ8CmWRQ5G6XI+1Nmotkk+mknhSsb5Mgm0vv0RJQGrEFiLWRlYSrKVOOKeV/ArHWo8Fs20Q1tDZ3a2oWqOfZlBwCra0sEbEtdFsclrB1Wgj1shoHh1276IDRA2ytqUcwNmL0qyvGCyvqYxlREFs8AAAAAElFTkSuQmCC",
                        spacing_left: 21
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAAwklEQVRIS8WVUQ6AIAxD5f6H1kAyUkphI6D6Y6LjDdqNpWv9uWFJ4uXdhwkfQRjWMKLAEczAlRMBGoxjOUn57wHzohxjb1akg+4Cc4LGpE+ASpvRkd0dKjdNQ6X5koboLprDNfifhlgur2iIWmKHhI/MGnqmuJ2iTFF3R9OaqrBH7nqxJZnX8Bbj9XLotokcuUu008vqWrtPABujTgMTAnn4zDQczhcDejODK4L1q+aodlLFq04i5VLzYjp3J/OlbOQB6tZJGOnV7OoAAAAASUVORK5CYII=",
                        spacing_left: 21
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAArklEQVQ4T72UUQ6AMAxC3f0PrZkJC6NgE2P0T22ftDLG0V8nlQwtLw+kgJvxaut5ArjmAnEAlTzvZ50C714FuCIAZn15z4A0LwMUMgBI80J6VKoAnfUzAO9rU8sK3DisAI2bSr7pAOyxpeI3AH89joBFJScCUpboGnTrr3zg/pCqiE5UiyfLW4CT6wDlNKbkcadxAZ9Oo+6Anbh+a5cHbQR2iaQGKhGcMtHGlwvwC+86Qw8ohstcAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAbCAYAAAB1NA+iAAAAw0lEQVQ4T7WU2w7AIAhD9f8/eotmsFI7xSXuCZUduVRqid8Fy/rYbQ/ttm3r1yil4M/GaY4G4PMOUWSOQoH9Ag/lIxWMoLkMsBUAUzE7QFYAjmCAHAGoIvJF7qMOLGzrkjmjrwSgI9sIDQ1jHVA3u05QicsiKrVtAVgs2xHMAFLSWR2EF4iSzgLSOuAq/6oB1oH7P7RdpbAzD9ITiQXm66wSvwB1leNsIvlMnElVdSH4/9XBUAPOUT1nWYfjEaipHCK5AdcmTAvn6h+zAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAAAtklEQVQ4T72U2wqAMAxD3f9/tLJBR5YmLYjom7M7preMq39uCBkqXB5CIALiON2pIAogQQrC8uf7jGPovssQFRiQqUKCEOLyRwiD1v2AuPwjjUrxYAjn/imkUn0oUamhkkg5qcWDDoLDeozBrxBUUaYTxXMTG6A0cK6l3I3Xc4KFdpByYnkd3HpYiPqrgsgtdg7mtriFqMJal+v8pHPg1V2GKONhS0yKFMQ6mDHwvcWdbPV9F/wBg0hHF7OZFEMAAAAASUVORK5CYII=",
                        spacing_left: 18
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAAsElEQVQ4T71U7RKAIAjL93/oOrywMYcf3VW/lGQOHCvH852wtmWhvf/neDvIAJ7vCcML8JBKsJi6ILDpqN0UMmZYYctdBVGMlkE8eVjWjAmCWCmywQoED45A0nIMAKlnIOnrOADSViBLYsuYTBWrmubS3xab6v42CDN69Tq/gPDL1VnaVaxi+g3IzJzcCoJmsJyZh6iJrrHM/shew7azBQ5wozNvDZPOYlIMsplpA3sBYplAFixVicIAAAAASUVORK5CYII=",
                        spacing_left: 18
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAsElEQVQ4T61UWw6AMAhz9z+0ZkQWKGUMo18ORx+AjIs/N4THe55xfZeQO5gkBNC7RwAsWbEDIVNgWTIrSywCBInGO7XcAaD1YgCMKVPmurArHjZ7Edv+JiOxDQ8ckI4KscomrGqd+44WsqLiIC2QrzWYeQLyG8AE6xQwKGC9YsOjJCXAyT8hd6oa2K5YdrUsAF3vK9lumdMxVkL3L6A0BcuU0Z2IRWPncqFYxmzZBqsPlWswEig/SVkAAAAASUVORK5CYII=",
                        spacing_left: 17
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAl0lEQVQ4T+2USxKAIAxD5f6HhoGxGFNCYWSpKz/htXaapOvblROdzwEP9U3rXuw2ZICosuImBuBzvZ+BmxZFI5gBTMczcwA8UAssA2a/gp0OO7ABcfXlDo4AcNqj3ZgOEVtVy/UDno117lVmUmst7cymUR5x4CgP+PsRwGvpdiMNg6XnAafNSjr1ws6eNy1MIquqAOwPqS9vYj8UaGf9CwAAAABJRU5ErkJggg==",
                        spacing_left: 17
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAAAtUlEQVQ4T71UWw7AIAib9z/0Fo2wWnloZuaXQS3QYsv1rrtvC8TqtsY5NlyRQwHAw3pmAU+geJEKSJPJ2/IFRLIoCPYctcZJ2zstqcMiBwjmJTkLIr1ZVXClIrnyIe0cA+F58KoKK8lAvFFQYhGdJ3iZE0tKbmdJ4oFt+jPW8E3q/FZJ2s4RYi3tt4n1QFDurXZYJbZHVsocNrZHBPF8ZjDgaB4i65xcPAOy/lCzR14ekEVuiz3g8VAY3h7/CgAAAABJRU5ErkJggg==",
                        spacing_left: 18
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAl0lEQVQ4T8VUSRLAIAir/390HTuFsiSgp3pygCQo0XF96363w8ToVooEJIUMrOQMuAgi2JKPlYxqURXlFYiULWnKS3K3ZVWvzlGeE92eu4QwD6q46v4Fts6xBcetwkF3l9O5R/DJqzGBzuacdDLHZPLIzt6li1eKzI5PfBeYumDAUq1SRA/ckSFm9iu0QDZDF2eK1hDwx5vSkDAQN4wqHAAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAuklEQVRIS91VSRKAMAiz/3+0Do5UihAi3vTUKSVsIY7t/vbrOMxd66gACqggGTAKPG0ZqIB7YBsY2sTos/TZRnaYjIJGj2xApqIZHIFG/UW9X0DthKuBUX2Npkw5okH+B/TTRmXDai2AdUIk16DUEBGpu6s6UHm+n9VKPwSF6SlVuvAX8TSrovQpH5AivugsC0qJM1J4AWiXHlFG7hSUkrnovxZlxFLHMmbBecPTTAcec8kyjXjLvD39Dh6rRRBHKMMIAAAAAElFTkSuQmCC",
                        spacing_left: 22
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAnElEQVQ4T9WUSw7AIAhE6/0P3QZS6IjDZ1tXRHwKA7iub91gL7DNFL/vm4GQHUQ4+pc4GSRwBaoTQzhufp+nL8Z0WK52ufk01A7cRGECoHroH4MCZbl6dCzUCNIzcTMrTdRhE2cKaY3LIhPFvTGyHNs8p2Bswa0fMbLYKT8AU5GyQc7K1P4AFajCZT9A14q0cyYzetSRzh58H37pAzJKKheuaIo1AAAAAElFTkSuQmCC",
                        spacing_left: 15
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAcCAYAAAC+lOV/AAAAtElEQVQ4T7VV0RKAIAjT///oOks8mEzwrF48jQGOgbW839VXWSrs3W0zQiA6oI4xgjYMHXvpsUjT+QoskbWNyWwXrMmtJ+ASkdLSZGnzHx3kkTfOMqWiNsdgSUMc6b3cGc8eFSJAa1iT6dpRJhVh7GpTnT1tp8FGQb3jPgMbcnfkiVVZKsybHiaYLkFq9Hi13AaKSLBzMrNvKOwXcDiOQ/1CX1O2V6VB2Zquil6NEByxPBF7A5KcQhaquecgAAAAAElFTkSuQmCC",
                        spacing_left: 16
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAh0lEQVQ4T5VT0RLAIAiq///o7fLmTgnMeqsgCWWOvJ5vO8X5iBcOBmzaTie0wIsaCYy8zpJMRogaYmXD4udQ/2ZCRdheP1W4IlAwVmhZq/6gOk5dknKwcdVI/FgmScphtpZyKoJsqJr7FqHU7o6wAJXzhRmI889svkqcmYQvyvB7dpzQCZJhXqSTHxbTVZurAAAAAElFTkSuQmCC",
                        spacing_left: 13
                    },
                    resize: !1,
                    height: "28",
                    spacing_top: 29,
                    spacing_left: "6"
                },
                Darkstar_K: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAHCAYAAACr4wv+AAAAAXNSR0IArs4c6QAAAMBJREFUSEutVVsOgCAMk/sfWkN0pGnaDRB/fBS2rqusXe91f/e4NXrnNYxX+wPv+/AZ02QxGHM8cd0Rjo5wT4QJuCjEVcEOZ6EiRxbDCRpNczGOcGSBVAGu+0FgFY+cqjDnAP6uGtYFU/Xs1Dg4rm7mX2LGgZn7It7qmsrhGPcXx1WBZhxWOYRxdwZmIlQYuilzlXOxdRArj+RP2Tcjr/Irl/0VqBJw4KxgNR0yu6ozwBUXaxnPpig3iwdtNSm38AcvqYsGk796ogAAAABJRU5ErkJggg==",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKUlEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECpsySbx2whyJ4VoA5toPBdmEdywAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAM0lEQVQYV2NkQID/UCYjiAYTDAwMyIIgNiNIAkUllA+WwKmDaKPACtGNgrkRbgeSqyFMAEQUDAiY2jJCAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAOElEQVQYV22OUQoAMAhC9f6HbhjUnKyPUMxHxJ0yTeleACZwTxkPHp3Noemom4nddmLtJ9QPOwc8REsNBgxKi50AAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAL0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEChtdJ8w0kCLSdGLYCXMkhmsBgzIOBn+vwDgAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANElEQVQYV2NkQAX/oVxGEA0moABZAsRmhEmi6GBgYIBLYujAJYnsgv/oxsLcgWInNkcxAAAXtw0Hgst6CQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALUlEQVQYV2NkgID/UBqZYmREkgCxkcF/dElkE3DqBCkCS2KzE2wiLjsJ6mQAANL+DAbdaB5QAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAMklEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEiiJ0SZjJIEV4df4naCeyUTA2WBMAEqsNB73m46UAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANUlEQVQYV2NkgID/UBpGMYIYIAImARZAUswIE8Cm8z+yamTjwSaiG4VsFdxYDF0g9+AzlgEApxIMBjELQgkAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJ0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECpuGOmGOxHAtAIM2DgbIIJFqAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANUlEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEChuXTrBpMElko2HWYZWEWQW2ExmgOAwAJ+oNBVk/zDoAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAL0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEChtdEslkhv8k6cQwFt1BcAUAubwQBL+AHrQAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJUlEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D8NdeJ0LQCXLg4GdV8AyAAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKklEQVQYV2NkQID/SGxGRigHJgjngxjIgnA2NgmwLrw6QAqw2gFzDIqrAB67DAatII32AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJ0lEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D/1JDHsxOlaAPbSDwWboH7hAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALElEQVQYV2NkgID/UBqZYmREkgCxkcF/dElkE3DqBCnCkCRKJ9iRMEdgdS0A3xcMBuQ4SIgAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAMUlEQVQYV2NkgID/UBqZYmREkgCxkcF/dElkE3DqBCnCkITpBFuBzVi43TAGig6YqwDrQQwHGRSilgAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAL0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEim5sknDduHSCxQnaCXMkhmsBck8OBgSaMscAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJUlEQVQYV2NkgID/UJoRmY3CQVdEkiTUdIhVJOlEcRhIJ07XAgASQBIDcclj6gAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAK0lEQVQYV2NkgID/UBpGMTIiCYLYMPAfxoHpgCkE60A2ijgJZGNw2gF3FQAWuwwG3l84RgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANklEQVQYV2NkwAT/oUKMjGhycAkGBob/REnCdMAMAmkC60QxCmYfsrHICkDyID6Kg5CNBrsFAN1JDQRk4J2PAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKklEQVQYV2NkgID/UJoRmY3CQVeETRImxoguCbMCJM5Akk4Uh4G143ItACNEEgbE1zTZAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALElEQVQYV2NkgID/UJoRSoMpEAdZAsSGK6CuJMxaRnRjkd3zH2Y5zFEojgUA87kMBw73nekAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAALklEQVQYV2NkgID/UJoRnQ8SQJaEsUHqwHLoCmCmwU3CZgJMDKsJBK3AqgCvLwDyjxQDEBtREgAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKklEQVQYV2NkgID/UJoRmY3CQVeELgkzBSyOTSdIDKyIJGNRHAY3AptrAXJAEwN596S6AAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKUlEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECpsySbx2whyJ4VoA5toPBdmEdywAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALklEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D/ZOjHsBBkLtxvGwOYoBgBkcQ0Hk096UQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANElEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECptkSZgGsLHodoKMBiuASSIrgDmaEQANAhAFHL+frQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAK0lEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D/JOmEaCBuL7FoUawDKRxAGlJdzRQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAMklEQVQYV2NkQID/SGwQk5ERKgCTgPFBwv9BHGQJZN04dYIUYUjCrAWbiG4sTJKgTgYAxwIMBhEUIsYAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAALUlEQVQYV2NkgID/UBqdYmREkgSx0cF/mCCyCSiakHXBFMEUgOWoqwDZN3CTAWvIDAfp08kqAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJklEQVQYV2NkgID/UJoRmY3CQVdEQ0l0B8H4jCA7YQDmYhAfLA4AP14RBIYzIXEAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAANElEQVQYV2NkgID/UJoRnQ8SQJaEsUHqwHJEKUC3AmQKTCMjhp1QKzEU4DIFbBQyQPcNAwBAZBEGxEMZeQAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAK0lEQVQYV2NkgID/UJoRnQ8SQJaEsUHqwHJkKYBpwmoCzD1wtxBlBV5fAADyjxQDZoogOgAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAKUlEQVQYV2NkgID/UBpEMSLxGVE4SIpB4mCNRClAtgKmEyZGAyswfAEABwcSBBoYe6EAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAOUlEQVQYV2NkgID/UJoRSsPEGEECyJIwNkgBWA5dAVwnzGSYkXitgFmLbhVYM7qj4HbD5JAVYPUNAHlpDwZ6dUrXAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANUlEQVQYV2NkgID/UBpGMYIYIAImARZAUswIE8Cm8z+6JDIfrBPZWGQTMIxFsRfdEciOZgQAxzwMBrOs+pwAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    resize: !1,
                    height: "7",
                    spacing_top: 8,
                    spacing_left: "2"
                },
                Tsiox: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAKCAYAAAAzZJfgAAAAAXNSR0IArs4c6QAAASNJREFUOE+dlCFuA0EMRd+SHKI4sCAopCBSLlDQW4RUykECC3uHvUCkgPC0KuwVCkKLor9ab71fs6NuBs1o/O1v+9sN0AJrYAH8Aj/AFfgAvoEDf0e2OifgAhz7997sAvEFvBf+5Oc5+c3XtrGPmrEC62SSAXecbDeJ/Gt/D+yUL/k5Oak3YDeVQSU7x6lCj+bHq+nE9F4qvpOaaoP8d1lMVCrjdH8BnozUFlgZPpIZEZxDSjEC7G10UqUWBz7/BdGRvzmaGomxf4RYs6ZqEih14twP1SCbOZpyqeUAmUhNAv4XyahiGoYuyf9WqhQoV6c0fd5C16Svi0FX95LyySmRct1lm1gZvqs6v3OErt4/AJ+FKVT5Y5Hm3aVpjZMrV2vx9gavH1Piz/tykgAAAABJRU5ErkJggg==",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAARUlEQVQYV2NkQICNUKY/I5QBEjgIk0cW9IcKFsEEixgYGPqQBUFaYapA4htBKrEKImuFqwQJggDMzPvYnBQMEwRrgzkeAOAuDxh4FS3MAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAKCAYAAABxJ+R3AAAAQklEQVQYV2NkgICjDAwMaxkZGBiKGBgYGhgYGPhgnGAGBgZrEAcEpjEwMGTBOBsZGBj8scqADOnDrwekRIWBgeEOAKthCu8OrerNAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAW0lEQVQYV2NkQIAiKNOegYHBnxHKAQmCBRgYGDbCJI4yMDCsZWBg6ENS1AfSAVaBZiRYAhmAjATrRJaAWY4hgWIkTAdI8CCSA8BGoRgBsxAmAfKDMgMDw12YBAAL8g+80L+qUgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAKCAYAAACT+/8OAAAAT0lEQVQYV2NkQICNDAwMBxkZGBhADGUGBgYdBgaGIpBAEQMDQx9U4UaQADK4giwAN8OJgYFhEgMDgzADA8MpdC0YZmAXmMbAwCANchTIegAxPQyqpNAGJwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAATElEQVQYV2NkYGAoYmBg6GOAgI0MDAz+jGiCRxkYGKyJEpzGwMCQBVIJMgcEJjIwMOSDaJAgMoCrJCgIdh669vsMDAyK6IJXGBgYdAAhDg9Njudc3AAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAAVUlEQVQYV23OOw0AIRBF0YuOlUKBBLwghBIfSKDAAS3l+ti8ZaoJr5nkZH4B6MDgJAFvAApQDf8iVGf2OIHocRls21017lNu2G+4PGr/FjbgsSN6Pn/0vA5JLxM16wAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAAVElEQVQYV2NkQAUbGRgY/BmRxIqg7D5kQbAqkARM8AoDA4MOTBdMEK4KphJklj2S2QdBKkFa78LMY2Bg2AgSPMrAwGCNpBIsiGIeAwNDEbJFMMUHAegcDcPReaqgAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAWElEQVQYV3XOPRGAMAwG0FctrAxowEC9IKQS8IAEHDBgAR9chtz1uJIxLz9fwWZQZdTEMYIDzx/UL+S/lhDrURN2XP1G4IkWEz3cmDNlf6r20QNWLHki8QVGewwGd1wA+wAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAAY0lEQVQYV12OsQ2AMAwEjzlYgQ0oGCG7ZBBKtqDICCnYgJJh0AUHIb6xfXq/PfBoA0agAusQ4HIAig7hAewBZbnDOWJeaNPWQlVnBpY4Ym2ZQo90tUxX0x+ewPSBpTt9WpmZbvzyElh8joY6AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAAaElEQVQYV03OsQmAQBBE0X+liIZXg5ZgYBeGFmJoaAcGFmEHpmIkRvYgA7PoJQtvlptNfG8HDuBKttWzBW6hoASyg0c4AKOnvAtsvD0H/rpQWY4iBfqmAvo/nkChNHAC6rggcAMWX8ELLf4P/xhZVbsAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAeElEQVQoU43QPQ6CQBAF4I/a0srW2huYyBG8i4kH8xDcgFY6YiOlvRnCkmErtny/+6axfR9MOOEYVJP4DueF/OFQC164L4Yel1qwgnigDUOpCOCJAV+MuEVKEeT48q0ZK4Icv1sQtfPMcL/TgnyZPgSx/1odbK35Ay+2FgIpSfIQAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAeUlEQVQoU3XOsQ2CYBCG4YcF7KhcxMaGhjgErXvYOYMtQzAACWEHEhtDxRLmlJ/gn3jN5e7N994VmPHC5FvN2hUYcVoXLXo8Ys5h7K572OGSVIj0Rx3JuHnDGRUOqDEEXFDukkm9JY8ZjLFN2r8wf+hHe8cz08ZzzRuCZxUds35PhgAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAcklEQVQoU33PsQnCcBTE4S+rBNI5gDhOioAb2NtkBgsbB7DMAGkyQDrBFVxBXsgD/aN53fG7491Vvu+GBi+cq5UdcMSIS/oDdjih/wRhCDjhWoKET9TF70VGchPO2P1LZv19acgpA+6/2mYgJrV4rHvnN/KqEX9vqbanAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAdElEQVQoU33OvQ3CYAyE4Scb0FCxCE16lqDNDIyQDZBo06dmgUR0NKmZgRHQ8SN9ihLc+OxX53OFBwaf2mKDfYYKVxy+MG3CHcfALqKAkQ3qwBanGczY/YPtUubvyBsuZSZqt+bMQ5e584Yn+hKWz54xZvECYwMVBDD2CSAAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAaUlEQVQoU53PrRGDQBBA4Y+hBxRF0AM90AgmJcRE0EZ6CAaDYiLiIkMMVTA3cySYQ7Bqd97bvwyjf7wxxPKV4YrLTvilAT5Qp+AdTQpO+ETYod/EMHZGmep8ojq184b26JUcSxTCcQW+K7UYEM0aKjCJAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAV0lEQVQYV5XOsRFAUAwG4O/tYQg72MEiGiNoFNawA41G5fRKBnEcR/EKUiX3XZI/YPTUguEYAyqULzzbAzpkMWiRx2DCekGD/j61IYltzEh//ahRfI67A4N2DXFY4MDWAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAeUlEQVQoU43PMQrCUAyA4a/HcCtCN6GreBMHlw6CN2jnHsGtqwdw9AAuHsCt4BW8ggT64PlwMFvyJ3+Syndc0OCNsVrYDicc8t6AR/RYFxYBH9iWIPKAr19Tf8EnNpl2jxptaNP55d5zeuWGK6bMMCQYtXipw4w7Vh/SIA94ETP38wAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAV0lEQVQoU2NkYGAoYmBg6GPABEWMDAwM0xgYGLKwSG4ESW5kYGDwxyX5nIGBQRKX5CcGBoYGJEl7KFuEoLF47bzCwMCgg8XOaSBjjzIwMFjjchCuQJgGAGuNEJQHKoOqAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAKCAYAAABxJ+R3AAAALklEQVQYV2NkgIAiBgaGPkYoZyMDA4M/jDONgYEhC8ZBUUakHhTTUDhODAwM+wBsiwoLRZNmYgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAM0lEQVQYV2NkwA6KGAetxDQGBoYsNNc5gZxbxMDAYM/AwOAPlXQC0TB/bETScZCBgaEPAHIDB6201TFXAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAc0lEQVQoU22QsQmAMBBFX/ZxAwtHcA/BxkFsBPdwAUHQ3sLSFdxBfrhEPUyV3Dve/yQAHdDzHL13YA4/8AAK7Xo4AmcyCU5AbYbK7jFE8AJWYHHZEW5A+TLkaoLKaWySIrLWQwF1iNrPthVrgcFrU54+ghsVIRbvrram4QAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAARUlEQVQYV2NkYGAoYmBg6GNAA4z4JDYyMDD4Y9OBU+IKAwODDjYdOCWOMjAwWGPTMY2BgSGLJMvvMzAwXGJgYDiIpOsCAEdmDE3eNNr7AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAcElEQVQoU4XQsQ2AIBCF4Z+5LBjBPSwZxJI9HIHCDWzdxbwLL0Fi4jVE+Lx3kIACZGDlXQfQ0gAasA/mAm6BCmwdGqirKgucwNKBNoUEYh076FC5KsfVGbi1owLor/kGnjUifoGHnJ4hPiPCE3+B8gANVBhp2aj/dAAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAbklEQVQoU22QsQ2AMAwEL7NAyQZ0LMAelBmE0ntkAbosgCiRWAU5iiXL4Mr6+/crScAFTHynJOABTmANvEHp4g3sztBg7mIJafFQTSOw9XS2syZohe3tbAVm12U1NSbNo/2D7/QvUYjCBTh+PkFegn4WtwW6CtQAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAc0lEQVQoU42PsQ2AMAwEL/tQ0FMgsQAFW9AgZRBKSnZgBDagYCD0VoyCK1J98vfvOPE9N7ADqz+nIjLQAydwAUvRqwNKNqFNIQMkJqALwAC0DrwzY4uADZiD4df8q0G0fSi0HNqkXlN+DQkYHZBpiarF4AesJhRFWaqaiQAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAXklEQVQYV3WPsQ3AMAgEzztkmxQZwXuk9CAus4dHSJG9okdgUdg0CN0/DwUYwAtcwAGcAMVB1QA0F1SBB7gdRGsCX9gTNJAdWqXqkRHh6n0VPrfJIbupcu3C7Y/VVfzbQw/vA21MVQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAfElEQVQoU22QsQ2AMAwEL3OwAgU9BRILULAFDVIGSUnJDiyAxAYUDIQexchEuHLs+7edwDcuYAWSlUNOItABB3ACc86TAVLWhZtED6BkBNoC6IHGgHdm6SJgAaaiYc/45yDr3Zb3V/gxcq10iQck8tAGDAaoqYL+wUJwvAEcBxW327hC0wAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAbElEQVQYV3XOoQ2EUBBF0UMPqG0FQQlgtwUkFSDQGBJaQG8JK1ZvS2TInwQBY34m9793p8IHX7So0UBVQBcLxvKhC7BhKCCfMcAv4xd4gmsiqmKWdKT8j+lO/saeIOJLqXihj/o7ecD56ar1AHMFEyDoFJdBAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAWUlEQVQYV22OwQ2AMAwDr2uwFLswSHfpCDz4IyZCjuISifbTVPZd0/jOyPEE7paPI+/ungO190JTAyl+hMrWae4mqiWWWAVBK5BiuhMdqyD+suoCNuABYrsXkzsOk24yXFUAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAS0lEQVQoU6XPoQ2AMBQE0FfDSKzRPZAMgmSPjoLvCggsitRBm1DRLy8vl/sBCTMm3Dhx4UAOvldwfEc12LH8gRXbEBjf0G3oguaLB8w+Dn3X9EpBAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAATklEQVQoU2NkYGAoYmBg6GPABEWMhCSdGBgY9pGqcxo+YzeCJDcyMDD4YzGWsCQurziBjAW51gDNryANF0CSIADi2EPZTxkYGPQZGBisAcoSEI6j+eYlAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAYElEQVQoU2NkYGAoYmBg6GPADqYxElCwEaQABLCZAhaDKZjGwMCQhWYLaQpAmp0YGBj2QU2BmwizAiSObM1GBgYGf5AgsgIQHyYBdzS6gqMMDAxrkcMFXQHIFJAia5iPAM0zElJpNqsqAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAcUlEQVQoU2NkYGBwYmBg2MeAHRQxMjAwFDEwMPSRq2AayIRpDAwMWUgmIPM3ghQcZWBgsIYqALH5GRgYdKB8DBM2QiX8kRXAHAmSPAh1MEwM7AuYhD0DAwNcJ9RdYDegGwtzL0hcBOYLaSTdMAUga1QAJNEX4D5BzGYAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAcklEQVQoU23QywmAMBCE4T+9WIAdCGnAPrwIFuLRoz1YggcLECxIJmQkLO4t2S+P2QQcwMh/HQlYam8NRgdPAVVEWnfAZCC0aSPiFmSgj8+1QL0LuOtNxbbAaXTT7GQGD7ADTvJ92jGHn1kUZBBn4JHkF2KPEuJw5IsoAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAXklEQVQoU4WQ0QmAMAxEXycTXKC7dBA/3cMFBPfoMOWEk1iC3mfycnekAA3YyNUKsAM9gXSIAGmGDuDSkQFBGlr3Mjp4IdsFqB5Ehwg9pTNAUZ8Ov8DrL1nECpwuNAAz5w/vWHaGewAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAYklEQVQoU2NkYGAoYmBgsGdgYBBhYGB4w8DAcJABAZIYkTjoTLBGQgr6cCkA6e4DGYlNAUgSBLAqQJFENwEkGczAwGCN7FqYFTCv+qN7BaQApyTMiqMMDAxr0XSCAg4EDgIAXjANAuXDg00AAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    186: {
                        image: "",
                        spacing_left: 0
                    },
                    187: {
                        image: "",
                        spacing_left: 0
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAKCAYAAABxJ+R3AAAAG0lEQVQYV2NkQAKMtOdsZGBg8IfZU8TAwNAHABbZAgs/43lTAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    189: {
                        image: "",
                        spacing_left: 0
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAKCAYAAABxJ+R3AAAAFElEQVQYV2NkQAKMdOZsZGBg8AcABxEBC0ygkgEAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    191: {
                        image: "",
                        spacing_left: 0
                    },
                    192: {
                        image: "",
                        spacing_left: 0
                    },
                    219: {
                        image: "",
                        spacing_left: 0
                    },
                    220: {
                        image: "",
                        spacing_left: 0
                    },
                    221: {
                        image: "",
                        spacing_left: 0
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAKCAYAAABxJ+R3AAAAHklEQVQYV2NkgICNDAwM/oxQzjQGBoYsGAcsRkMOAOdpAgvi5eHxAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s186: {
                        image: "",
                        spacing_left: 0
                    },
                    s191: {
                        image: "",
                        spacing_left: 0
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAKCAYAAABxJ+R3AAAARklEQVQYV03NuwmAQABEwblSrMg+LEGwDfswtwxzIzE2EC4UPwtuNmzwincTtvJhwRHsqMGJOajo/88QrGiCEV3wFII72l63/AzafNomXgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s50: {
                        image: "",
                        spacing_left: 0
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAgklEQVQoU13QsQ0CUQwD0Hdz0DIDDR0LsMOVlEiUrEBJyQqIBa6joWICZkH5+pFyP1UUO7aTybrOuPVR66eCxyAqCS8cg5DABU9ssMMP11Eht+84hVwSQuWLpdusCAHOeHQwrD6ZLRXe2I/baREK2+45XtIytHPq7fU1QTiUcLVvvD8srxb+71Z5wQAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    s52: {
                        image: "",
                        spacing_left: 0
                    },
                    s53: {
                        image: "",
                        spacing_left: 0
                    },
                    s54: {
                        image: "",
                        spacing_left: 0
                    },
                    s55: {
                        image: "",
                        spacing_left: 0
                    },
                    s56: {
                        image: "",
                        spacing_left: 0
                    },
                    s57: {
                        image: "",
                        spacing_left: 0
                    },
                    s48: {
                        image: "",
                        spacing_left: 0
                    },
                    s189: {
                        image: "",
                        spacing_left: 0
                    },
                    s187: {
                        image: "",
                        spacing_left: 0
                    },
                    s222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAKCAYAAABxJ+R3AAAAJUlEQVQYV2NkYGA4ysDAYA2iGRkYGIoYGBj6GBgYpoE4cEBDDgCHjANmaPgjfAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s219: {
                        image: "",
                        spacing_left: 0
                    },
                    s220: {
                        image: "",
                        spacing_left: 0
                    },
                    s221: {
                        image: "",
                        spacing_left: 0
                    },
                    s188: {
                        image: "",
                        spacing_left: 0
                    },
                    s190: {
                        image: "",
                        spacing_left: 0
                    },
                    s192: {
                        image: "",
                        spacing_left: 0
                    },
                    resize: !1,
                    height: 10,
                    spacing_top: 11,
                    spacing_left: 2
                },
                Dredge: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAHCAYAAACC5PR5AAAAAXNSR0IArs4c6QAAAGVJREFUOE/tU9EOABEMq///6JPJVWg2LF55021VpQXAh3mVf3uKW7vNRP1W92qKdRIK4CDJT3Bexchv+rdiRs88x7zDVdwokm6ok40n4wBJ1YGsMyHPExO8yDIFqw8pAUylKUorKssYPQZjNn0wAAAAAElFTkSuQmCC",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALElEQVQYV2NkgID/UBpEMTJCBUA0DPxHFwTrQBYECYD5MEGYArD5OM3EsB0AtZQNA5bBLDYAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJ0lEQVQYV2NkQID/DAwMjCAumGBgYAAJwPkwQZgEikoKBGGWwN0BAAbQBwct4gI8AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkgID/UBpEMTJCBUA0DPxH5mAVhBkB1g4zE64Lm5kMMEEkexgYAHwNCAU0c7RRAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKklEQVQYV2NkgID/UBpEMTJCBUA0DPxH5mAVhBkB1o4OwNpBKrCaiWI7AIHVCQScurOcAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkQAX/QVxGJDGQAIj/HyYIEwCpAQsiC6AIopiMbCZMAm4mssr/APgdCgE8BXxtAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKklEQVQYV2NkYGD4z4AGGKGCIBoOYIIoYigqoDL/cQqCLEKWhKtEdgEjACPJCASHXgccAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALklEQVQYV2NkQID/UCYjI5QBEoCxwQwUAZAimCCSKQxg7egq/+MUBGmF2Qw2EgBjiAkGvgRNHwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJUlEQVQYV2NkYGD4z4AGGKGCIBoG/iNzQIIgXYwoKkACIBkKBQFv7AgGhkdXwAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAHElEQVQYV2NkgID/UBpEMTJCBUA0DPzHKUht7QAl2AsEP9m92wAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALElEQVQYV2NkgID/UBpEMTJCBUA0DPzHKYiunQFZG4p2JOPAFoItQtYO5gMAyKcJBPaubicAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJElEQVQYV2NkgID/UBpEMTJCBUA0DPyHCSKJMTDgVYlVO2FBABmbDAJjf++CAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIklEQVQYV2NkYGD4z4AKGBmhgiAaBv7DBJHV4leJVTthMwEc4QsESLgKWwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIUlEQVQYV2NkgID/UBpEMTJCBUA0DPzHJshAmSDYTAzbAapRCQbciuZfAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAHUlEQVQYV2NkYGD4z4AKGBmhgiAaBv7TUhDZfkYAcZgMA8Ks8VkAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJElEQVQYV2NkYGD4z4AGGKGCIBoOYIIwAbAkXpVYteM1E2w2ADJBBwac1izVAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIklEQVQYV2NkYGD4z4AGGKGCIBoOYIIwAbAkXpVYtRMWBAAyTgcHpLftbgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIklEQVQYV2NkgID/UBpMMUIFQDQcoAuCdWBT+Z80QXTbGQEDhwsD3EILzwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIUlEQVQYV2NkYGD4z8DAwMiAAP9BHJyCSAoh2kjTTtgiAJwkDQEyxnl5AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAGUlEQVQYV2NkYGD4zwAFjFAaJMBILgduGgA9YgcGXO/GXQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAHUlEQVQYV2NkwAT/GWkk+J+BgQHZbLhFIAkYYAQA8x8IAizJZZsAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAK0lEQVQYV2NkYGD4z8DAwMiAAP9BHGRBMBsmCFMH1oFXJV4zQboxLAILAgClHw0E37348QAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAG0lEQVQYV2NkYGD4z8DAwMiABEAcugoiW84AADLUBwc7iKMLAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKUlEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMDZMAYKjcyBGQDXjtVMwoIAUjMPAc5UXE4AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMAk4IIwSTCNzAGpButCFwRLEC8IAFIzDwEykjP1AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAHElEQVQYV2NkgID/UBpEMTJCBUA0DPynlSCG7QBpoAwDGMIeyAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAI0lEQVQYV2NkYGD4z4AKGBmhgiAaBv7DBJHVYlXJgE07CYIAnF8IB7ubrqsAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAI0lEQVQYV2NkgID/UBpEMTJCBUA0DPynsiDIQrBFyLaD7QAAbrUNA+svqF4AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIklEQVQYV2NkYGD4z4AKGBmhgiAaBv7DBJHV4leJVTthQQAd7AwDUnN4cwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKElEQVQYV2NkgID/UBpMMUIFQDQcwDjIKhlRVMCMwikI0oos+R+rmQAb0QgE2+PnqAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAGElEQVQYV2NkYGD4z4AGGJH4IEkwn26CAAJWBwfe48o0AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAH0lEQVQYV2NkYGD4z8DAwMiAAP9BHLoJguwFWQYDjADsKQ0CBtvK3gAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJklEQVQYV2NkYGD4z8DAwMiAAP9BHAoFQabBjADTMAuwCiKrZgAA6GoNBG5v7TgAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJUlEQVQYV2NkYGD4z8DAwMiAAP9BHCoJwoyBmwmyBmY+nIFiOwAoMw8BPN5GpwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJUlEQVQYV2NkYGD4z8DAwMiAAP9hHJgEmEZRAdOBUyVWM4kTBACVJw0EdnJ87wAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIElEQVQYV2NkYGD4z8DAwMiAAP9hHJgEmEZRAdNBC0EA814JB39ykVQAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAK0lEQVQYV2NkYGD4z4AGGNEFQIrQBUG6GJEFwQIgnTBBuABMEEUAWRDFPgAJ4wcF6IIVfwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAHUlEQVQYV2NkgID/DAwMjIzYOGAxmAwKB7cesAwA0LMFCIK/Vp8AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    187: {
                        image: "",
                        spacing_left: 0
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAF0lEQVQYV2NkQAKMpHH+MzAwMML0YHIAN7sDCAAu5WUAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    189: {
                        image: "",
                        spacing_left: 0
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAF0lEQVQYV2NkQAKMFHD+MzAwMMIMAHMAGL8CCJ4XINAAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJUlEQVQYV2NkwAT/GdHE/jMwMDASFASrAumEqYQL4BVEUQVSCQD6VwcHrEShgwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    192: {
                        image: "",
                        spacing_left: 0
                    },
                    219: {
                        image: "",
                        spacing_left: 0
                    },
                    220: {
                        image: "",
                        spacing_left: 0
                    },
                    221: {
                        image: "",
                        spacing_left: 0
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAGUlEQVQYV2NkgID/DAwMjIzYOGAxmAwpHACavwIISnt2VQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAG0lEQVQYV2NkgID/DAwMjIzYOGAxmAwKh4AeAMu3BAjGtUUzAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALElEQVQYV2NkgID/UBpEMTJCBUA0DPxH5uAUBBkD1g5XARIAG4okCGdiVQkARiIHBuh1VYQAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAGElEQVQYV2NkgID/DAwMjIwUcMBaUQwAACO+BghduXy7AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQYV2NkgID/UBpGMTJCBUE0MviPLAHTBRYjSQJsJC47wBJYXQUA0PUNBDxSNvkAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAHklEQVQYV2NkgID/DAwMjDAaxMAqCFKFAqigEsMiAHJEDAZ2yMsTAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAMUlEQVQYV2NkQID/DAwMjCAumGBgYAAJwAFIEK4CJopNJSNMEFn3f5h2FCORVcLNBgAKNAcG4hPwzgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    s53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkYGD4z8DAwMiAAP9BHGRBMBtZBUgthiBcB0wlirnYBDEsApsLABpWCwVA2HMZAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s54: {
                        image: "",
                        spacing_left: 0
                    },
                    s55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAMklEQVQYV2NkQID/DAwMjCAumGBgYIAJgGmYILIEikqYzv8glchawRLIgnAjkC2CawcAEpcMBrsVnusAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    s56: {
                        image: "",
                        spacing_left: 0
                    },
                    s57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAIklEQVQYV2NkQID/ICYjlA/igNkgAs4hXgCkEsUMmD1gWwCp3gcG5mSkTwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAIklEQVQYV2NkYGD4zwABjHACKgCSYASLIoH/pAnAzUCxBQCNrgcF2EFxXwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s189: {
                        image: "",
                        spacing_left: 0
                    },
                    s187: {
                        image: "",
                        spacing_left: 0
                    },
                    s222: {
                        image: "",
                        spacing_left: 0
                    },
                    s219: {
                        image: "",
                        spacing_left: 0
                    },
                    s220: {
                        image: "",
                        spacing_left: 0
                    },
                    s221: {
                        image: "",
                        spacing_left: 0
                    },
                    s188: {
                        image: "",
                        spacing_left: 0
                    },
                    s190: {
                        image: "",
                        spacing_left: 0
                    },
                    s192: {
                        image: "",
                        spacing_left: 0
                    },
                    resize: !1,
                    height: "7",
                    spacing_top: 8,
                    spacing_left: "2"
                },
                Slinky: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAADCAYAAAB4bZQtAAAAAXNSR0IArs4c6QAAAD1JREFUKFNjZGBgYJBjMPgPoh8xXGBEZiPLocsj82H60GlGmAEgCXSLQHxs8uiGwCxCVg9iU9WlyD4HGQ4A6PQ/6yKQKgMAAAAASUVORK5CYII=",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAH0lEQVQYV2NkYGBgkGMw+A+iGUGMRwwXwDSYAImCBACMrgiehQAc5QAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAH0lEQVQYV2OUYzD4z8DAwPCI4QIjI4gBEgBzYDIgQQCfUAdRM1EAJQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHUlEQVQYV2OUYzD4z8DAwPCI4QIjI4gBEkDhgAQBmhwHUaQiyEsAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2NkgAI5BoP/jCA2iAGiGWEMEAcASFED64stq/wAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAG0lEQVQYV2OUYzD4/4jhAiOIBhMMUMAIY4AEAalRBus2iNLmAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHklEQVQYV2NkYGBgkGMw+A+iGWGcRwwXGBlhoiAOAG3uB1FFtYfIAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAG0lEQVQYV2OUYzD4/4jhAiMDAwMDI4gDYmBwAJAQBZ4Z03hcAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAFklEQVQYV2OUYzD4zwAFjDAGSBCFAwBDHQPrkfvRRwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAG0lEQVQYV2NkYGBgkGMw+A+iGWEMFM4jhguMAFfiBZ5Nv0Q3AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAFklEQVQYV2OUYzD4zwAFjCgcmChIEABNhQPrzDr8HAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHElEQVQYV2NkYGBgkGMw+A+iGWEMOOcRwwWwIABghQbrrehTiwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHElEQVQYV2OUYzD4z8DAwPCI4QIjI4wDEkDhAACJRAWeHlNDoAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHElEQVQYV2OUYzD4zwAFjCDOI4YLjCA+mAOTAQB5+QWeHrtViQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2OUYzD4z8DAwPCI4QIjI4gDYoBoMAGSAQEAvhAInprCmLQAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAF0lEQVQYV2OUYzD4zwAFjDAGiGZElgEAOsUCni4SEAwAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHElEQVQYV2OUYzD4zwAFjDDOI4YLjGAOiAGSBAB/IgdRMlSwhgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHElEQVQYV2OUYzD4zwAFjCDOI4YLYJoRJAiTBQCHhQbrCO0uowAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2OUYzD4/4jhAiOIBhMMUADmwGQAwYUJ60+6esAAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAG0lEQVQYV2OUYzD4zwAFjCAaJPCI4QIjI7IMAG35BZ4xLipdAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2NkgAI5BoP/jCDiEcMFMA0mYLIAglEG62KZ7AcAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHklEQVQYV2OUYzD4/4jhAiOIBhMMDAwMIAEwByYDANzFC57GugXFAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2OUYzD4z8DAwPCI4QIjI1YOSBYApIQHUQLLWfMAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAF0lEQVQYV2OUYzD4zwAFjBicRwwXwIIAZbkG68JgymUAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGUlEQVQYV2OUYzD4zwAFjCDOI4YLYBqFAwCahQnrAmOxMQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2OUYzD4zwAFjCDOI4YLYBpMwGQAjLkG63dPIDoAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGElEQVQYV2OUYzD4zwAFjBicRwwXGEGSAGPiBZ72Ifz6AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAFklEQVQYV2OUYzD4zwAFjCgcmChIEABNhQPrzDr8HAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAG0lEQVQYV2OUYzD4zwAFjDDOI4YLjGAOiAGiAYD5CJ6hdatHAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHklEQVQYV2NkYGBgkGMw+A+iGWGcRwwXGBlhoiAOAG3uB1FFtYfIAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2OUYzD4zwAFjCAaJPCI4QIjCgcAbe4HUVYaAkcAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGUlEQVQYV2OUYzD4/4jhAiOIBhMoHAYoAADohQnrjo+LZwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAG0lEQVQYV2OUYzD4/4jhAiOIBhMMUMAIomGyALOuCJ7rcMofAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGUlEQVQYV2OUYzD4/4jhAiOIBhMMUIDCAQCzuQbrv6L25wAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHUlEQVQYV2OUYzD4/4jhAiOIZmRgYGCACYBFYDIA15ELnt6VTa8AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2OUYzD4/4jhAiOIZmRgYGAAMUA0WATEAAEAroUG6/OwhO0AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHUlEQVQYV2OUYzD4z8DAwPCI4QIjI4gBEkDhgAQBmhwHUaQiyEsAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAE0lEQVQYV2NkQAKM2Dj/GRgYGAEFcQEERSJ4aAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    resize: !1,
                    height: "3",
                    spacing_top: 4,
                    spacing_left: "4"
                },
                Nanner: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAFCAYAAABW1IzHAAAAAXNSR0IArs4c6QAAAEJJREFUKFNjdDB2+M8ABQfOHmBE5oOEqS0GtgBmKLLhlIrBPAHzAMw8nBZi8zWxjoCFDIhGD8HB40NifYNNHb7QAQBqsbbOKYP1ZAAAAABJRU5ErkJggg==",
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHElEQVQYV2N0MHb4z4AEGGECB84eALNJEIAZAwBojRSA8slrlQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGBgcDB2+A+iD5w9wMgI48AFMFTg1QKSBAAl+RG4o4EYHwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2N0MHb4zwAFB84eYGREFgCJM8JkYRJwFSDlYBXoWgBkNA0cVw0B8gAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2N0MHb4z4AEGGFsmARYAMY5cPYAI6YKdDMAyiMKztw13eYAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2N0MHb4f+DsAUYQzcDAwABmYAiAZGCAEcaAa0EXAACeNRCA0CTQNwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJklEQVQYV2N0MHb4z4AEGGECB84eYASJwwVAHJAgWBQGQKoxVAAAZFQPaq47KkwAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAI0lEQVQYV2N0MHb4z4AEGGECB84eYASJwwVgilBUgFRjqAAAc7gOzoVte7cAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAFklEQVQYV2N0MHb4z4AEGGFsmAQZAgBghwiA3iBEfAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2N0MHb4z4AEGGECB84eALPhAjBFhFUAAM1GEIDpuZ5ZAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2N0MHb4z4AEGEECB84eANMgcTgDpogRxoCrQBcAAGruDIDL7yTxAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2N0MHb4z4AEGGECB84eALPhAjBFuFXAtAAA4H4UgGGrUaEAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2N0MHb4zwAFB84eYGSECYA4IDZcAKSIOBUAzSEXagBhlXAAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkYGBgcDB2+A+iQYARxjlw9gAjkQLoZgAApLoPavnA+cwAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2N0MHb4zwAFB84eYGSECYA4IDYJAiBjQNoAEyQZHDDim7QAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2N0MHb4z4AEGGECB84eYASJwwVAHJAgfhUgVQCpEg9qlnev3wAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2N0MHb4z4AEGGECB84eYASJwwVAHJAgbhUwLQC5MhG4btBjlAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2N0MHb4z4AEGGECB84eYASJowiAJHELwIwBAA7/Es5Bt3BsAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2N0MHb4z8DAwHDg7AFGEBtMYBUACYIAbhUwMwAD1BiAbHSurwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2N0MHb4z4AEGEFsmOCBswcYiRBANwMAgkoPaupFvnIAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAH0lEQVQYV2NkYGBgcDB2+A+iQYARxoAJEiGArB+kHQBnTwiA8Qxr+AAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2N0MHb4z8DAwHDg7AFGEBtMYBWACeJWATMDAFkYGs6QT+niAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2N0MHb4z8DAwHDg7AFGEM1IgQBIPwgAAF8xEbiXNr4kAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHElEQVQYV2N0MHb4z4AEGIkXOHD2AFg1XAtMAAABRhCAWBJzIwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGklEQVQYV2N0MHb4z4AEGGECB84eALPJEAAAe8UYgJcfVTYAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHElEQVQYV2N0MHb4z4AEGGECB84eALNJEIAZAwBojRSA8slrlQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2N0MHb4z4AEGGECB84eALPhAjBFKCpAghgCAL18ERznWipPAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAI0lEQVQYV2N0MHb4z4AEGGECB84eALNxC4B0gVQxIusHaQEAKxMSzt6vkAkAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2N0MHb4z4AEGGECB84eALPhAiBFIEHcKmBaADXRFs50G75KAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2N0MHb4z4AEGGECB84eYASJwwVgisCiIABTiaECAA7wCs4kXwMvAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAG0lEQVQYV2N0MHb4z4AEGEFsmOCBswcYyRAAAIJqEbgPC2Q5AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2N0MHb4z8DAwHDg7AFGEBtMkCkA0gYCAIvUGIDesg9aAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2N0MHb4z8DAwHDg7AFGEBtM4BcAyYJUwbWABJAFAX5kGs6R0bnIAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2N0MHb4z8DAwHDg7AFGEBtMYBUACYIAXAVOAQCZVRCAHz6AfwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2N0MHb4f+DsAUYGBgYGEBvOAAmAJIgQQDcDAMs5F2qpMYdnAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2N0MHb4f+DsAUYGBgYGEJsRQwAmA6JBKuFKcQoAACG+F2oy9uNmAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2N0MHb4z4AEGGFsmARYAMY5cPYAIyMyByQJF4BpBQAPEA0cLRJwLwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHUlEQVQYV2NkYGBgcDB2+H/g7AFGRhAHBghwYHoA8pQIBnitBhkAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    187: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAFklEQVQYV2NkQAOMDsYO/5HFGElXAQCjfANq+Ui0jQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkQAKM+DkOxg7/D5w9wAhWBuMAAFaUCAaPyngmAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGUlEQVQYV2NkQAOMGAIOxg7/kQUxVaBrAQBSaAG4tptoNQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAF0lEQVQYV2NkQAKMJHAcjB3+Hzh7gBEAEcwEBjiB30kAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2NkQAOMyHwHY4f/cAEQ58DZA4xgARgHxGZE5oAEAIlJDbiVsS5XAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    192: {
                        image: "",
                        spacing_left: 0
                    },
                    219: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2N0MHb4z8DAwHDg7AFGRhAHxAAJEODA9AAAmpoUBumTQuIAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    220: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkQAOMDsYO/w+cPcAIEwczkAXhMjBBuABMJQD+0w24O+XrFAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    221: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkYGBgcDB2+A+iGUEETIAAB6YHAPpwCIDPCtzuAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGBgcDB2+H/g7AFGRgwOSAAEwDJYOQCOowgGAy+rDQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    resize: !1,
                    height: "5",
                    spacing_top: 6,
                    spacing_left: "2",
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHUlEQVQYV2NkYGBgcDB2+H/g7AFGRhAHBghwYHoA8pQIBnitBhkAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIklEQVQYV2N0MHb4zwAFjDAGSBDMgcnCZUCCcJkDZw8wAgD1xgkcoMSAeQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGBgcDB2+H/g7AFGRvwckCwIoCgDABhCEAaWIsM2AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s50: {
                        image: "",
                        spacing_left: 0
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQYV2NkYGBgcDB2+H/g7AFGGA1mgCSQASNlKgGBdxtqmKSf1QAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    s52: {
                        image: "",
                        spacing_left: 0
                    },
                    s53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2NkQAOMDsYO/w+cPcAIEgexwQwYByQBl4GpwtACAIk4E2p+6/uWAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    s54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2NkYGBgcDB2+H/g7AFGRhgDRDOCZGAANwcA49kJuN9I2koAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2N0MHb4zwAFB84eYGQECYAYMJoRJIksiKkCZgZMGwDjNB9q4Mnq8gAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJElEQVQYV2NkYGBgcDB2+H/g7AFGRhADJAACjCgyMFG4DEwAAK1pCbjWDU6oAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGBgcDB2+H/g7AFGRhgDJIiHg6wHAI0KFAZwya34AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGBgcDB2+H/g7AFGRhAHJkCAA9MDAIAnDRwIvuW1AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAGCAYAAAAL+1RLAAAAFUlEQVQYV2NkwAIYaSHoYOzwH91cACBvAbkVlymfAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s187: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAIUlEQVQYV2NkQAKMILaDscP/A2cPMDKCGDBJVBkMPTABAK3ECbk1lbH2AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2N0MHb4f+DsAUYQDSbgHAYkwIiTAwBPKAtqTng2PwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s219: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAI0lEQVQYV2NkgAIHY4f/jCA2iHHg7AFGRhADJADmoMgg6wEA0IsPaoC04j8AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s220: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGElEQVQYV2NkYGBgcDB2+H/g7AFGRjI4AF0KFAb1y9PvAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s221: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2N0MHb4f+DsAUYGBgYGMAETgHMwZZD1AAA6NhG4AzE/AgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIUlEQVQYV2NkgAIHY4f/jCA2iHHg7AFGRhgDJIgqg6wHANnDD2pGW3pSAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2N0MHb4f+DsAUYGBgYGMAETAHNgAqgyyHoAM24RuF68yG0AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s192: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkQAOMWAUcjB3+Hzh7gBFEgwkYB0RjaAEAsHcNuBXrnJ4AAAAASUVORK5CYII=",
                        spacing_left: 5
                    }
                },
                Comic_Font: {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABhJREFUGFdjZGBg+M8ABYxQDpgmzAHrAgAAcAgBtw/7OQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABpJREFUGFdjZGBg+M8AAYyMUAZIgAAHpocBAKPnBQXUG5lfAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAACFJREFUGFdjZGBg+M8ABYwwBkgQxgHLgjggBlgQxgGrBgCjcwUCUxAr+QAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M8AAYyMUAaI+g/jgGUxZOB6AJufBQMWe5ipAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M8AAYyMuDgMIBkQACkFK4NzAKfJBQWrJPL2AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZGBg+M8ABYxIHEYQBwb+w2TANLIyBgC1iQYCJdvtQwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M8ABYxQDohmgHHAcsgy/1FkAL2FBgJOOzvMAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABZJREFUGFdjZGBg+M8ABYwwBkiQSA4Aj3UFAf0AhkMAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M8ABYxQDpiGccByIA4MoMoAAM9hBgEFHhVvAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M8ABYxQDpiGccByIA4MoMoAAM9hBgEFHhVvAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABtJREFUGFdjZGBg+M8ABYxQDpiGccByWGXAggDmYQgBceMvQQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAAXNSR0IArs4c6QAAACJJREFUGFdjZGBg+M8AAYwwAiQA4oBpGAOqCEkGKvIfQwUANgEHAwO1WSYAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M8ABYxQDohmIMwB6wIAr7IFBC+pPf8AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M8AAYyMUA6YJswBawIAAKUIAgeShOoAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABpJREFUGFdjZGBg+M8ABYxQDohmgHHAcrhlAK+TBQMfnQaWAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABxJREFUGFdjZGBg+M8ABYxQDohmgHHAclhlwMoAr5gFBB6fxq4AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABxJREFUGFdjZGBg+M8ABYxQDohmwMn5D5MB6wIAvaQGA716hEUAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABxJREFUGFdjZGBg+M/AwMAIosEEOocBBLDKgAUBG3QJAbZByYgAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M8ABYxQGiTAiJ8D1wMAo7IFBGIf6/EAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABxJREFUGFdjZGBg+M/AwMDIACUIc/6D1IKUgQEAvd0GBMsIF50AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M/AwMAIosEEOocBJIBVBiwIABuPCQKV8ElcAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M/AwMDIACVI4IC0MAAAr+sFBX8ToiEAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABhJREFUGFdjZGBg+M8ABYwEOWAVMGVgGgC+XQcBpR6WowAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABZJREFUGFdjZGBg+M8ABYxQDpgmkgMAAXQJAalBZXAAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABhJREFUGFdjZGBg+M8ABYxQDpgmzAHrAgAAcAgBtw/7OQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABtJREFUGFdjZGBg+M8ABYxQDpiGccByyDKoHADXcAYDXl74MAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZGBg+M8ABYxQDpiGccByIA4MgGXgHADHaQYB8aqNugAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAAXNSR0IArs4c6QAAACVJREFUGFdjZGBg+M8AAYwwAiQA4oBpGAOqCCEAVg5SBVcKEwAANywIBCEAN78AAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M8ABYxQDohmgHHAcmARKPiPIgMAp4kFAldD5RgAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABdJREFUGFdjZGBg+M8ABYxQGiTASCQHAJ+3BQUmfastAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M/AwMAIosEE8RwGEAAANXQJAWmZFIYAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M/AwMAIosEEcRwGmFIAMXkJAmuQRVAAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABxJREFUGFdjZGBg+M/AwMAIosEEOocBBGAymBwADGwHAYI4n2QAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M/AwMAIosEEMocBJoAhA1cGABeTCQKQ5XIbAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M/AwMAIosEEMocBJgCSwc4BAACiBwTHWKxlAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M8ABYwwBkgQxEGRAXHAKlBkAKdvBQIUIpdrAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    186: {
                        image: "",
                        spacing_left: 0
                    },
                    187: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABNJREFUGFdjZEACjOic/zAB3DIALNgCBN6y+L4AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    188: {
                        image: "",
                        spacing_left: 0
                    },
                    189: {
                        image: "",
                        spacing_left: 0
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAABRJREFUGFdjZEACjKRx/jMwMDACAAYAAQZH+VBHAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    191: {
                        image: "",
                        spacing_left: 0
                    },
                    192: {
                        image: "",
                        spacing_left: 0
                    },
                    219: {
                        image: "",
                        spacing_left: 0
                    },
                    220: {
                        image: "",
                        spacing_left: 0
                    },
                    221: {
                        image: "",
                        spacing_left: 0
                    },
                    222: {
                        image: "",
                        spacing_left: 0
                    },
                    resize: !1,
                    height: 5,
                    spacing_top: 11,
                    spacing_left: 2,
                    s186: {
                        image: "",
                        spacing_left: 0
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M8ABYwwBkgQxMEqwwCTASsHAJF4BAN8g91IAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZGBg+M8ABYzoHJA4SJYRJAMHMA5YBgCRjwQEhOwYaQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s50: {
                        image: "",
                        spacing_left: 0
                    },
                    s51: {
                        image: "",
                        spacing_left: 0
                    },
                    s52: {
                        image: "",
                        spacing_left: 0
                    },
                    s53: {
                        image: "",
                        spacing_left: 0
                    },
                    s54: {
                        image: "",
                        spacing_left: 0
                    },
                    s55: {
                        image: "",
                        spacing_left: 0
                    },
                    s56: {
                        image: "",
                        spacing_left: 0
                    },
                    s57: {
                        image: "",
                        spacing_left: 0
                    },
                    s48: {
                        image: "",
                        spacing_left: 0
                    },
                    s189: {
                        image: "",
                        spacing_left: 0
                    },
                    s187: {
                        image: "",
                        spacing_left: 0
                    },
                    s222: {
                        image: "",
                        spacing_left: 0
                    },
                    s219: {
                        image: "",
                        spacing_left: 0
                    },
                    s220: {
                        image: "",
                        spacing_left: 0
                    },
                    s221: {
                        image: "",
                        spacing_left: 0
                    },
                    s188: {
                        image: "",
                        spacing_left: 0
                    },
                    s190: {
                        image: "",
                        spacing_left: 0
                    },
                    s192: {
                        image: "",
                        spacing_left: 0
                    },
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAFCAYAAADPLFVyAAAAAXNSR0IArs4c6QAAAE9JREFUKFNjZGBg+M+AAIwDyYdZDqJhAOQ4ZHF0x4LUwdSgs/HxsZkLsxcsRyvHwDyG7ilsfLgHiHUMujqahgy6Twj5jBj1yNGOzzx4yAAAicw5BfdhEncAAAAASUVORK5CYII="
                },
                normalsville: {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M+ABhiRBOFsWgvC3QAAhPAMAeSg7RwAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAACRJREFUGFdjZICA/1CakRGJAxIDC2CoIEMAZgPYMJihULMZGAAluAcII9bCpQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACVJREFUGFdjZGBg+M+ABhhxCSKrA+sCqcQpiGIuTCVMEMzHahEAEQcHAl7OP+4AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAABtJREFUGFdjZGBg+M+ABBixCcDkwSrJVIFiCwCwsgcB2Ss65QAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBg+M8AAYwwNpxBkiDUFIg5yABsPvGCAFcMCgFuDt/kAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACFJREFUGFdjZGBg+M+ABhjxCYIk4QCvShRTUbTBzMeqHQAlOgcCbIdPVgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M+ABBjxCYAkGQiq+I9XBdguAOPvCAIy70yLAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACdJREFUGFdjZGBg+M+ABhhxCSKrA+sCqYQBuDEwQWRzGdEFwXysggARNwcEnlob8wAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACFJREFUGFdjZGBg+M+ABhiRBOFsgoJwQ5BVYhXEaiZcJQAR6AoBKLUnWgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAACNJREFUGFdjZGBg+M+ABBiRBMBsZAGwOqwCMBPAZoFU4BcAAP6+CAEipKtXAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M+ABTCiScD5REvADSVaB2E7AOYMDAFpk/g1AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBg+M+ABBihAjCaAc6AKUIXYMSpBbcZAFfxCgLazfleAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZGBg+M+ABBjxCYAkGZBVEBYAG41hKADBSgcE8sLW+wAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBg+M+AChgZsQgyIAvC2eQJwq3DZhEjAP1ZCgP2JpzbAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAABpJREFUGFdjZGBg+M+ABBjxCYAkGShUAbYLAMESBwP9kJDWAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAABxJREFUGFdjZGBg+M+ABBjxCYAkGUhTgaEFLAAAwS0HBcqksdEAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACRJREFUGFdjZGBg+M+ABhgJCYIUgAGySjgbXRCk8D9BM+FuAACgNgkCe0Tq3wAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M8AAYwwNpxBkiDUFCRzSNIOtxQAyPQNARu9B8EAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAACJJREFUGFdjZGBg+M+ABTDik4Cph+kEKWYAE1BAvARplgMAifEHBJfyvHMAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAAClJREFUGFdjZGBg+M+ABTDik4Cph+kEKWYAE1CAIQESQDYSrgPdcvwSANEQCAaOgKyeAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACVJREFUGFdjZGBg+M8AAYwwNpxBkiDUFCRzkMxFGA5Xhmw4MhsAgBsLAtmNaJYAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAABpJREFUGFdjZGBg+M8AAYwwgpoCcJNhhoIFAMIPBwYx9mWtAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAC1JREFUGFdjZGBg+M8AAYxQGkSBxUACMEkMPkmSSCZjGotTEmYF3CpkOzFcCwAsWg0BxQ4p0QAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAAChJREFUGFdjZGBg+M8AAYxQGswHcWASKHyiJaCmoRqFohuZg9NyFAkAhSsNAUEqHgQAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZGBg+M+ABTCiScD5NJSAOwPdDrgEABMXCwGHFXCbAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M+ABhiRBOFs8gThJqNrB0tgFQQAPA8KAzCEHcEAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAACZJREFUGFdjZGBg+M+ACRgZiZEAKQIBkAkoOvBKwOzDaQcDLssZAJcFCgYTO6MyAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBg+M+ABhiRBOFs8gThJiNrhwkyYjUTAEECCwI1LLEcAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACVJREFUGFdjZGBg+M+ABhgJCYIUgAGySqyCcJPhslARsKVYLQIAJX4HA1ElEFsAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M+ABTDik4Cph+kEKWYAE1BAKwkAeiQHBrP9ZMIAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBg+M8AAYxQGswHcegpAbUb4RKY5SgSAK4vDAGtSw55AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACJJREFUGFdjZGBg+M8AAYwwNpxBuSDUaIjhIACzDGwhVkEAtwsLA92aXkwAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZGBg+M8AAYxQGkSBxUACREuCFMI1oOvEKYlkJaojkO2Fs2EuxCoJADuYDwM0wNBQAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACtJREFUGFdjZGBg+M8AAYwwNpxBkiDUFAZGkHYQgJkLNhvZTJhKhI3IFgEAfFsLA/hPzrEAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAACNJREFUGFdjZGBg+M8AAYwgNpjAJQBXBmLAVIH1IQswEhYAAG3/CQSnJ0iRAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAAXNSR0IArs4c6QAAACJJREFUGFdjZGBg+M+ABhhxCSKrA+sCqcQqiNdMuC6sFgEAGQMHAhJiNk8AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    186: {
                        image: "",
                        spacing_left: 0
                    },
                    187: {
                        image: "",
                        spacing_left: 0
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAICAYAAADTLS5CAAAAAXNSR0IArs4c6QAAABtJREFUGFdjZIACRvyM/yBpkBo4AyTwHybCCABHRwQG8JBYPwAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    189: {
                        image: "",
                        spacing_left: 0
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAHCAYAAAAie5yXAAAAAXNSR0IArs4c6QAAABVJREFUGFdjZIACRiIZ/0HqQIrBDAAUKAIGs9freQAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZECA/yAmIy4BsCxIAUwFfgG4LMxQFAEApXUHBiVNEXYAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    192: {
                        image: "",
                        spacing_left: 0
                    },
                    219: {
                        image: "",
                        spacing_left: 0
                    },
                    220: {
                        image: "",
                        spacing_left: 0
                    },
                    221: {
                        image: "",
                        spacing_left: 0
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAHCAYAAAAie5yXAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M/AwMDAiMwACYBFCDEAbc4CBpeC4xcAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    resize: !1,
                    height: 7,
                    spacing_top: 8,
                    spacing_left: 2,
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAHCAYAAAAie5yXAAAAAXNSR0IArs4c6QAAABhJREFUGFdjZIACRgYGhv8gNgoDLIlHCgCAuwQEzmpkCQAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAAXNSR0IArs4c6QAAACRJREFUGFdjZGBg+M8ABYxQGiwA4qDIwDiMMGVg1cjKwDJwZQAp5AYFjZt9wAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAHCAYAAAAie5yXAAAAAXNSR0IArs4c6QAAABhJREFUGFdjZGBg+M/AwMDAiJ8BUoJFDQDJcgYCMHz/5AAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    s50: {
                        image: "",
                        spacing_left: 0
                    },
                    s51: {
                        image: "",
                        spacing_left: 0
                    },
                    s52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAJCAYAAAD6reaeAAAAAXNSR0IArs4c6QAAAClJREFUGFdjZECA/wwMDIwgLogAcVAAUYJYteM3E2YJ3EKcFiGrBJsJAHefCQVWudckAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAAXNSR0IArs4c6QAAAC1JREFUGFdjZGBg+M8AAYxQGoUPEiSoAKoRTKErhhsLU0SZAqxugbkcm/1gDQAAWwsGu5dLZwAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    s54: {
                        image: "",
                        spacing_left: 0
                    },
                    s55: {
                        image: "",
                        spacing_left: 0
                    },
                    s56: {
                        image: "",
                        spacing_left: 0
                    },
                    s57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAAXNSR0IArs4c6QAAABxJREFUGFdjZICA/yCCEcZA5zAiy+DmgA2AmwYASQYHBOP6rz4AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAAXNSR0IArs4c6QAAACJJREFUGFdjZGBg+M8AAYyMSBwGEAcEwLL4OTADwMrgpgEAROIHA6gtI6UAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s189: {
                        image: "",
                        spacing_left: 0
                    },
                    s187: {
                        image: "",
                        spacing_left: 0
                    },
                    s222: {
                        image: "",
                        spacing_left: 0
                    },
                    s219: {
                        image: "",
                        spacing_left: 0
                    },
                    s220: {
                        image: "",
                        spacing_left: 0
                    },
                    s221: {
                        image: "",
                        spacing_left: 0
                    },
                    s188: {
                        image: "",
                        spacing_left: 0
                    },
                    s190: {
                        image: "",
                        spacing_left: 0
                    },
                    s192: {
                        image: "",
                        spacing_left: 0
                    },
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAAHCAYAAABEIWDAAAAAAXNSR0IArs4c6QAAALFJREFUSEvtlVESgCAIRPX+h65pEod2WFwa+6sfSwPkCWtvrR3tfvoY/be9j6U5XP9Ga37e/F1GVZ+Rrd8Dxtnhn8bEZFlwgxhtRrVBHyufBkU5jB8SVDrCU6o3spHnWNtUT105ychn1kJZEqyFWYvLQEBypg6xBCutaJvIoFfBq+2GoN8CoYCjUlWqIoLBhF/VrMwnS9zrFcZXLhsW86GDOyBlN02mH5lwryozAvIZpBO4vXEDYSkr4AAAAABJRU5ErkJggg=="
                },
                newspaper: {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAABpJREFUGFdjZICA/1AaRDEyIgnA2XQVxHASAKS5DgOO7X+JAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZICA/1CakRGJAxIDC2CooIYAzEqw6QAuwQgIjdq84wAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAC5JREFUGFdjZICA/1AaRDEyIgnA2SAGMgDrQBaEGQHWjmwmmI9uJlgFXotQnAQAU34KBif1O+UAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACpJREFUGFdjZICA/1AaRDEyIgnA2SAGMgDrQBaEGQHWjlcl3EK8FqE4CQA/GwoEn37/VgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACVJREFUGFdjZICA/wwMDIwwGsYAScDZBAWhJkG0IAOQ2RQKMgIAKtkLA7qNgEIAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACxJREFUGFdjZGBg+M+ABhiRBOFsdEGwHmRBmCGMIEFkADYfpyDMdqwWwc0EAFrdCgTK20HhAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACdJREFUGFdjZICA/1AaRDEyIgnA2eiCYA3IgjATiNMOthCnRRhOAgDeaQwFLQuBjQAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAC1JREFUGFdjZGBg+M+ABhiRBOFsEAMZgHUhC8KNwSbICBNEtgxDEKwIXTuYDwAsrwkFWNjItAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACBJREFUGFdjZICA/1AaRDEyIgnA2TgFKdQOsxnFIgwzAUgODQQ5gKYjAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAClJREFUGFdjZICA/1AaRDEyIgnA2TgF0bUzgFQiA7DZOAVhNqNYhOEkALy6CwPeozbLAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M+ABhiRBOFsgoJwQwiqJN5MuEoAWBwOATgX+t4AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZGBg+M+ABhiRBOFsgoIwQxgJqiTDTABTbg0DZ1K6VwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACFJREFUGFdjZGBg+M+ABhiRBOFsdEGwHioLgl2CbCbcYQBzRwoFYGlt2QAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAABtJREFUGFdjZGBg+M+AChgZkQTh7AERhDmMEQCssQ4DU5RHfQAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAChJREFUGFdjZGBg+M+ABhiRBOFsdEGwHmRBmCGMBFWCFGBox2oR3GEAcz8KBYWhfOAAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACZJREFUGFdjZGBg+M+ABhiRBOFsdEGwHmRBmCGMBFWCFGBoxy8IAFliCQe1YPCrAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACFJREFUGFdjZGBg+M+ABhiRBOFsdEGwHqJUgs0nTyXcYQA+ig0CfABxmgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M8AAYwwNpxBkiDUFCRzSNKO33YA8CAPATjKAegAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAABpJREFUGFdjZGBg+M+ABBihbJggI80EUKwFAC5JCAfxAVbyAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M+ABhjR+GAFtBKE2Q4yH24RhpMAsyYJAZpujDoAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M8AAYwwNpxBkiDUFAZG8rTjtx0A8HUPAkGqtZ8AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAABpJREFUGFdjZGBg+M8AAYxQGswYHIIwFzEAANdxCAjmaRgFAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAAAXNSR0IArs4c6QAAACxJREFUGFdjZGBg+M8AAYxQGkSBxUACMEkMProkkmZUnTCFcA3IOvHaSUVJADi5EAE6H8r8AAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAChJREFUGFdjZGBg+M8AAYxQGswHcWASKHx0CagmVB0oipA5OO2gUAIAy2MPAbsHY1UAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M+ABhiRBOHsARGEOwwArBwOAeRTOXgAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBg+M+ABhiRBOFsgoIwQxjRVYIlKBQEAMb0CgbAhBDxAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZGBg+M+ACRgZkSRQ2AMpwYBsObKjGQGq9Q4Iw7BRWgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBg+M+ABhiRBOFsgoIwQxgJqiTeTLhKAFhxDgIIctU+AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAC1JREFUGFdjZGBg+M+ABhiRBOFsdEGwHpAgCCAbwQgThJkKlsQpCNOK1SK4wwBW4AoD2WjKUwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAABdJREFUGFdjZGBg+M+ABBihbJggI30EACpOCAignBUMAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAABtJREFUGFdjZGBg+M8AAYwwNpwx4IJQlzEwAABELw8B4i29cQAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACFJREFUGFdjZGBg+M8AAYwwNpxBD0GQzTAXwJ0BdRFCAgAeNw4BLjdwsQAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZGBg+M8AAYxQGkSBxUACdJAEWQG3Ct1ODEm465BcC3YsuvNhJoHFAcrkEQMQY5dsAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACVJREFUGFdjZGBg+M8AAYwwNpxBkiDUFIg5IAAzF2w2eWbCdQEAqGAOAizHIjsAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACVJREFUGFdjZGBg+M8AAYwwNpxBlCBIK8wIuDlQIxFmg8ykQBAAOrYLBdbL31sAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACpJREFUGFdjZGBg+M+ABhiRBOFsEAMZgHXBBJGNYETXDtZFlCDcTAwnAQBi3QoEpI82cQAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZEACjFD2fwYGBkYYByxGIgfFADAHAGwwAwmDFLsLAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    187: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAABtJREFUGFdjZMABGPFJ/McmiVcHVtNAOqhkFADccwIHhImHkQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAAXNSR0IArs4c6QAAABhJREFUGFdjZEACjNTi/GdgYGCEmQbmAAAZNAIJpu1EPgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAABtJREFUGFdjZMABGMmS+I9NF8gonBJYrSHdcgDccwIH+WC+0wAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAAXNSR0IArs4c6QAAABRJREFUGFdjZEACjDTh/GdgYGAEAAc4AQkHW7ijAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACZJREFUGFdjZEAF/0FcRkKCYFUghcgqMQThAshmYgiiCMBUYggCAKZvCAdwF4lEAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    192: {
                        image: "",
                        spacing_left: 0
                    },
                    219: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAABpJREFUGFdjZGBg+M+ABBiRBEBsBpoLgC0HAEZJCAesNMWOAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    220: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACtJREFUGFdjZGBg+M8AAYxQGszAKghSgCIB04JVEEU13HBkI5AF4aqxCgIAp2sIB26UCYMAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    221: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAABlJREFUGFdjZGBg+M+ABBiR2GAJmgmgWAsAFPYIASN0lnIAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAAXNSR0IArs4c6QAAABtJREFUGFdjZEACjFD2fwYGBkasHLACmAwpHACbNAIJM2HaIwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    resize: !1,
                    height: "8",
                    spacing_top: 9,
                    spacing_left: "2",
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAAXNSR0IArs4c6QAAABtJREFUGFdjZEACjFD2fwYGBkYYByxGCQdsGgBaNAIJ4wKPvQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAADBJREFUGFdjZICA/1AaRjEyYhEES4Ik0AFYN7IEsnFgo2AAJgEWw2YUhh04daBIAADsCQcHiBuuSQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAICAYAAADTLS5CAAAAAXNSR0IArs4c6QAAABhJREFUGFdjZGBg+M/AwMDASCQDpBaLYgANjgcCb8uV6AAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    s50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZICA/1AamWJkhEqAaHTwH10SZgJYHFkSJIHCR5ck2k4UY7A6CKdXAMsxEAVslE0GAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAB5JREFUGFdjZICA/wwMDIwwGsTAKghShQJwqqS2dgCV8w4HWH4nfQAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    s52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAADZJREFUGFdjZECA/wwMDIwgLphgYGAACcABSBAmAFMAVomiClk7TCtYAVwLstnYtDMiq4Q7CQCqNwgFTCuZ3QAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    s53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAADxJREFUKFNjZGBg+M8AAYxQGkaBxUGC2BTAxDB0gTTBJUEGYDUW2UpkBSg6YQ6BKcAqie5IdJ/g9QXcsQBFzAwFgqHixQAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    s54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZECA/wwMDIwgLphgYGAACcAAI0gQJgBnwxgwHWBdyByEfiSzyBAEAMvbBgczNgMOAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s55: {
                        image: "",
                        spacing_left: 0
                    },
                    s56: {
                        image: "",
                        spacing_left: 0
                    },
                    s57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAACRJREFUGFdjZICA/1CagRGZw8DAwIgsAGKjqCBDAGwEWB+yTQA+SQgHhhHsdQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAACFJREFUGFdjZGBg+M+AAIyMUDZcECYAEgcLUiCAYiiKtQAdZwgDKgTHtgAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAABNJREFUGFdjZMABGAetxH9sLgMAGTcBCEqks60AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    s187: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACVJREFUGFdjZMABGJHE/0PZYDG8EjCVKIaCdOCUgKkk3g6sDgYAbnEGB638JfwAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    s222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAICAYAAADTLS5CAAAAAXNSR0IArs4c6QAAABpJREFUGFdjZIACRgYGhv8gNgoDLAkSIcQAAG4fAgcJV4s3AAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    s219: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZECA/zAmI5QBF2BgYGBEFwTzQQRMFUwBWBAEUCSIEgQbCTcHyQgGALLdCAd3ydXnAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s220: {
                        image: "",
                        spacing_left: 0
                    },
                    s221: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAXNSR0IArs4c6QAAACxJREFUGFdjZGBg+M+AAIwgJphAl4AJIkswIgvCJQiqhFkI147iApB2DCcBAKsZCAhzyOg1AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    s188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAAXNSR0IArs4c6QAAACVJREFUGFdjZEACjEjs/zDOf5AgiANmgNgYHJAoXBnMDLgBYAEAMHkGBUOPR5MAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    s190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAAXNSR0IArs4c6QAAACZJREFUGFdjZEACjAwMDP8ZGBhANJgAccBssAhMAIODogzFALjhAEDOBgcRqjCDAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    s192: {
                        image: "",
                        spacing_left: 0
                    },
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAICAYAAACs/DyzAAAAAXNSR0IArs4c6QAAAJpJREFUSEvlVVsOgCAMG/c/tAakZllaGBG+9Edeq+taZjGzy56n9LefY9y33nMxpm6sxCm87euVlCfh59kxkmIEsxjHYiPBjFJRrRlBj3mCyBBfVRiWjRZlNmYEfRGY/RET8WYWVefleiSo7hIAlFoMZ7eySqklBX9NUHXbaKtRkVj3PXW+fStrUUYCiQHD23jl9/KF4Kgpthxu0hNuAsUxAfUAAAAASUVORK5CYII="
                },
                PolarisBSM: {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC5JREFUGFdjZGBgYGAW1PwPomHg7/vrjIzogjBJuARIFbJuWkgguwrERrEQ2bkAWowfceZDiDwAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACpJREFUGFdjZBbU/M+ABP6+v84I4jKSLgEzBaYTbhTpEuiWw0zAcBVMAgDZLRqBYexMDgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACxJREFUGFdjZBbU/M+ABTDilEBXDFPICJLApgu3UTDVf99fB+uGAcI60B0BANHQDK1F4sg+AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACVJREFUGFdjZBbU/M+ABTDilEBXDFPICJLApgu/BLJxcKNIdhUABTgJ6WiZj70AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAADdJREFUGFdjZIACZkHN/zA2iGYEEeiCYAlkwb/vr8P5cAZIEFk3ig4UO7CZD7ccWSVMIdhcbBIA2aUR6SOg9s4AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACtJREFUGFdjZBbU/M+ABTASlPj7/jojskbcOkCqsBmHoh1ZEWHLkS0GOQQAqbsPcczKT58AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC1JREFUGFdjZGBgYGAW1PwPopEBIzZBkAK4xN/31xkJ6gApIt4omJ24deByLgDFWRNxcLqWHgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACFJREFUGFdjZBbU/M+ABv6+v87IiE0CpI4RXTVM4YBKAACskwyt5crbhwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACxJREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVIFEoApJKwD3R4yjEK2ENk4ADqfFK0qHK8+AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAADBJREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVIFEoApxK0DWRWyVWDtyICwUbicCwA3IBNxUhGmXAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZGBgYGAW1PwPopEBIzZBkAIUib/vr8P5cAZIENlY4ozCajlOo9AlAM9UGemW9WcwAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAADJJREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVIFEoApxKoDxSgQB9lY0oxCsRzZxSBjAcYtHjVWR1QwAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC5JREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVIFEoApxJCAmUq8BIZR6C7D6SoAdukaNbXy72oAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAChJREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVIFEoAppIUEustwugoAW/wcrdmSxc8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACdJREFUGFdjZBbU/M+ABTASlPj7/jojskbCOtCtgesg3iiQEdhcBgBpAg9xkw76RAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAClJREFUGFdjZGBgYGAW1PwPopEBIzZBkAK4xN/31xlJ04HTDpxGES0BAAF1FPnchVtDAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAADBJREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVKFrBFFAlk3cRIgo2C6cFuOrArZcgDAERtxP4LLWAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACdJREFUGFdjZBbU/M/AwMDw9/11RhAN4zPSQAJkPjKA24FTgmhXAQBT7iHpMOXgBwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACVJREFUGFdjZBbU/M+ABTDilIAphin4+/46I0gMTIAAFSRIdhUAJUwU+dh/6F8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACtJREFUGFdjZBbU/M+ABTDilEBWDFP09/11RkbSJZC1oxiFzXK4HeiSIAkAQk8egZ9DFMEAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAADVJREFUGFdjZBbU/M/AwMDw9/11RhAN4zMiS8DYIAVYJUC64RIgVchGEpYAaUe2jzjLkZ0LAJ+zLPmPFd9lAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACdJREFUGFdjZBbU/M/AwMDw9/11RhANA4yDQgLZRSA22IkwlyFLAgB2rBqBZrFNtQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAChJREFUGFdjZBbU/M/AwMDw9/11RhAN4zMSlACpRgZwHTglSLeDaB0Aw9Ah6cqmk54AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACRJREFUGFdjZGBgYGAW1PwPopEBIzZBkAK4xN/31xmRdQ+oBAAu0SHp6i9GxAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACpJREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVIFEoAppIUEustQLESWBABXDBytCsvwcwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACxJREFUGFdjZBbU/M+ABTASlPj7/jojSCNMIVwHTgl0a7DaAdKNYRRMJ04JAEY/GjUO8qy4AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC5JREFUGFdjZBbU/M+ABv6+v87IiE0CpA4uAVIFEoApJCyBbg9uO9BVwu3AJQEA4A8UredfpcEAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACtJREFUGFdjZBbU/M+ABTASlPj7/jojSCNMIVwHTglka0CKiLMD2SE47QAAvC8crZXs27wAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZGBgYGAW1PwPopEBIzZBkAK4xN/31xlJ04FhB7oAzE7CliPrBDkEAKm7D3Gxg5KoAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACNJREFUGFdjZBbU/M+ABTDilIAphin4+/46I0gMTIDAQEgAAH2wGoFbSEZlAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACRJREFUGFdjZBbU/M/AwMDw9/11RhAN4zMOCgmQi5ABihORJQDfDSHpJkAfHQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC1JREFUGFdjZBbU/M/AwMDw9/11RhAN4zPSUwJkMTJAcQlMAuRCsASyM2HOBgA+ISNxQYSnCAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC1JREFUGFdjZBbU/M/AwMDw9/11RhAN4zPSQAJkPjKA24FTAqurYIIwXSCXAgBaDiHpIMBHRwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAADVJREFUGFdjZBbU/M/AwMDw9/11RhAN4zMSlACpRgYo2mESIGPBEshmw+zCrQNmOYYduFwFAFpUHjW6K6D9AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC5JREFUGFdjZBbU/M/AwMDw9/11RhAN4zOSLwEyBhmgmAuTANkHlkC2FOYI0iUAjrcg+ZeYFlQAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAC9JREFUGFdjZBbU/M+ABTDilEBXDFPIiCyBrBsugSz49/11RrAEuiBIDLfluFwFAHrrD3FqdNS+AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    186: {
                        image: "",
                        spacing_left: 0
                    },
                    187: {
                        image: "",
                        spacing_left: 0
                    },
                    188: {
                        image: "",
                        spacing_left: 0
                    },
                    189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZMABGEmXYBbU/I9NFyNOCdLtwKUDABDfAoGOBxwUAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAAB1JREFUGFdjZEADjDQTYBbU/A8y/O/764xgW5AFAG6sCAk5CKMuAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    191: {
                        image: "",
                        spacing_left: 0
                    },
                    192: {
                        image: "",
                        spacing_left: 0
                    },
                    219: {
                        image: "",
                        spacing_left: 0
                    },
                    220: {
                        image: "",
                        spacing_left: 0
                    },
                    221: {
                        image: "",
                        spacing_left: 0
                    },
                    222: {
                        image: "",
                        spacing_left: 0
                    },
                    resize: !1,
                    height: 10,
                    spacing_top: 11,
                    spacing_left: 2,
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAACFJREFUGFdjZEADjFgFmAU1/4Mk/r6/zghWgSGArI0MMwD6ihAJswPKuwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAACpJREFUGFdjZBbU/M+ABTDilEBXDFPICJNA10lYAt1IDB1/318Hi+GUAAAPhA4148oyEgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAACBJREFUGFdjZGBgYGAW1PwPov++v87ISC0BkDkwQNhQAHZ1HAnGlAYjAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    s50: {
                        image: "",
                        spacing_left: 0
                    },
                    s51: {
                        image: "",
                        spacing_left: 0
                    },
                    s52: {
                        image: "",
                        spacing_left: 0
                    },
                    s53: {
                        image: "",
                        spacing_left: 0
                    },
                    s54: {
                        image: "",
                        spacing_left: 0
                    },
                    s55: {
                        image: "",
                        spacing_left: 0
                    },
                    s56: {
                        image: "",
                        spacing_left: 0
                    },
                    s57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAAChJREFUGFdjZGBgYGAW1PwPokGAEZmDIvD3/XVGEgVAykHaMA1FtxYAnQ8U+bNhvW4AAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    s48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAACZJREFUGFdjZBbU/M8ABX/fX2dkRBYAiTPCZGESRAogm4NpKLq1AAkkD3Gp3yCvAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    s189: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAXNSR0IArs4c6QAAABlJREFUGFdjZMABGAdUgllQ8z82BzDikgAAV6gCgRi3w+kAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    s187: {
                        image: "",
                        spacing_left: 0
                    },
                    s222: {
                        image: "",
                        spacing_left: 0
                    },
                    s219: {
                        image: "",
                        spacing_left: 0
                    },
                    s220: {
                        image: "",
                        spacing_left: 0
                    },
                    s221: {
                        image: "",
                        spacing_left: 0
                    },
                    s188: {
                        image: "",
                        spacing_left: 0
                    },
                    s190: {
                        image: "",
                        spacing_left: 0
                    },
                    s192: {
                        image: "",
                        spacing_left: 0
                    },
                    height: 8,
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAICAYAAACrvuKmAAAAAXNSR0IArs4c6QAAANZJREFUSEu1VckNgDAMo2ICxmD/YRiDCRCoj6LIJLFLgRc9cjl2WuZlPSfnO/ateGd1v15vZ22NLiLb3njVL8a0sVie9i7LCeO4ALSElEI8cBQ7BDMqsicXz2fbU3IKwfEYgeyw64w5NhFbNP5HDPR8K/EyViv2CO7NnD/A6fWJXbasVDqPcmOSYqyUZKUUOZIISjNjTiZHlGYvuNLMiej5RlbK8LRDVxn2eCeTv/fYqPYPWY0wAGnKGBfNpi+H9acDWX2SLfoROxg4UQdVcNgTzxrNFHIBC9GF+DnZhaIAAAAASUVORK5CYII="
                },
                custom: {
                    preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAFCAYAAAC94zfEAAAAAXNSR0IArs4c6QAAAGNJREFUKFOVUkcOACAIw/8/WgPSpDI0ekFWW9Ah+0y3g/zu7iWiefQhppb7oo+ccQIgEinoLcZkEH8AN/0QY6IjOUAr8mpDVX0UA6xkfybnaVncz+Rp7d1E1T/g976Jef0jyy9wNi0B4XZlHQAAAABJRU5ErkJggg=="
                }
            },
            alignLeft: function() {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function(b, c, d, e, f, g, h) {
                        a.canvas.layer.clear(), a.canvas.layer.ctx.putImageData(b, -e, 0), a.render(), a.alignRestore()
                    })
                }
            },
            alignRight: function() {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function(b, c, d, e, f, g, h) {
                        a.canvas.layer.clear();
                        var i = a.width - 1 - g;
                        a.canvas.layer.ctx.putImageData(b, i, 0), a.render(), a.alignRestore()
                    })
                }
            },
            alignTop: function() {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function(b, c, d, e, f, g, h) {
                        a.canvas.layer.clear(), a.canvas.layer.ctx.putImageData(b, 0, -f), a.render(), a.alignRestore()
                    })
                }
            },
            alignBottom: function() {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function(b, c, d, e, f, g, h) {
                        a.canvas.layer.clear();
                        var i = a.height - 1 - h;
                        a.canvas.layer.ctx.putImageData(b, 0, i), a.render(), a.alignRestore()
                    })
                }
            },
            alignCenter: function() {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function(b, c, d, e, f, g, h) {
                        a.canvas.layer.clear();
                        var i = a.width / 2 - c / 2;
                        i -= e, i = Math.floor(i);
                        var j = a.height / 2 - d / 2;
                        j -= f, j = Math.floor(j), a.canvas.layer.ctx.putImageData(b, i, j), a.render(), a.alignRestore()
                    })
                }
            },
            alignRestore: function() {
                var a = this;
                this.LayerController.updateLayer(!1, function() {
                    a.LayerController.updateLayer(), a.FrameController.updateFramePreview(), a.HistoryController.create()
                }), this.online.status && this.OnlineController.writeLayer()
            },
            alignCheck: function() {
                var b = this.LayerController.currentLayer;
                return !(!this.online.status || this.LayerController.layers[b].name == this.online.layer_id) && (this.showAlert(a("#res-online-editing").text()), !0)
            },
            finishLoading: function() {
                this.setupAutoSave(), "Canvas" == this.zoom.type && a(".navigation-scroller").hide()
            },
            bucketCreate: function(a, b, c, d, e, f, g, h, i, j, k) {
                var l = d ? d : this.mouse.start_x,
                    m = e ? e : this.mouse.start_y;
                if (f = f ? f : "layer", this.bucket.callback = a, this.bucket.width = g ? g : this.width, this.bucket.height = h ? h : this.height, this.bucket.clear = j, this.canvas.data.clear(), this.canvas.data.canvas.width = this.bucket.width, this.canvas.data.canvas.height = this.bucket.height, this.bucket.tolerance = k ? k : 0, this.bucket.canvasName = f, this.bucketReset(), this.bucket.currentRGB = this.mouse.getPixel(l, m, !1, !1, !0), this.bucket.imageDataRender = [], this.bucket.currentRGB[0] == this.bucket.color[0] && this.bucket.currentRGB[1] == this.bucket.color[1] && this.bucket.currentRGB[2] == this.bucket.color[2] && i) return a(!1);
                this.bucket.color = i ? i : [0, 0, 0], this.bucket.currentRGB[0] != this.bucket.color[0] || this.bucket.currentRGB[1] != this.bucket.color[1] || this.bucket.currentRGB[2] != this.bucket.color[2] || i || (this.bucket.color = [1, 0, 0]), this.bucket.imageData = this.canvas[this.bucket.canvasName].ctx.getImageData(0, 0, this.bucket.width, this.bucket.height), this.bucket.clearImageData = this.canvas.data.ctx.getImageData(0, 0, this.bucket.width, this.bucket.height), this.bucket.p32 = new Uint32Array(this.bucket.imageData.data.buffer), this.bucket.clearP32 = new Uint32Array(this.bucket.clearImageData.data.buffer);
                for (var n = 0; n < this.bucket.imageData.data.length; n += 4) this.bucket.imageDataRender.push([this.bucket.imageData.data[n], this.bucket.imageData.data[n + 1], this.bucket.imageData.data[n + 2], this.bucket.imageData.data[n + 3]]);
                b ? this.bucketAllColors("data") : this.bucketWhileLoop(l, m, "data")
            },
            bucketWhileLoop: function(a, b, c) {
                if (this.bucketCheck(a, b)) {
                    var d, e, f, g, h = 1e4,
                        i = 0,
                        j = this.rgbToAbgr(this.bucket.color);
                    const k = parseInt(this.width);
                    parseInt(this.height);
                    var l = this.bucket.p32,
                        m = this.bucket.filled,
                        n = this.bucket.p32[m[0]];
                    for (this.bucket.clear && (j = j.replace("0xFF", "0x00")); m.length;) {
                        for (var o = m.pop(); o >= k && l[o - k] === n;) o -= k;
                        if (i++, i > h) {
                            console.log("maxxxed");
                            break
                        }
                        for (e = d = !1, f = o % k === 0, g = (o + 1) % k === 0; l[o] === n;) {
                            l[o] = j, this.bucket.clearP32[o] = j;
                            var p = this.getExactXYFromPosition(o);
                            (this.settings.dithering && this.isOdd(p[0]) && this.isOdd(p[1]) || this.settings.dithering && !this.isOdd(p[0]) && !this.isOdd(p[1])) && (this.bucket.clearP32[o] = "0x00000001"), f || (l[o - 1] === n ? d || (d = !0, m.push(o - 1)) : d && (d = !1)), g || (l[o + 1] === n ? e || (e = !0, m.push(o + 1)) : e && (e = !1)), o += k
                        }
                    }
                    this.canvas[c].ctx.putImageData(this.bucket.clearImageData, 0, 0), this.bucket.callback(this.bucket.clearImageData, this.bucket.imageData, this.canvas[c].dataURL())
                }
            },
            bucketReset: function() {
                this.bucket.color = !1, this.bucket.filled = [], this.bucket.renderImageData = [], this.bucket.positions = [], this.bucket.width = this.width, this.bucket.height = this.height, this.bucket.p32 = !1, this.bucket.clearP32 = !1, this.canvas.data.clear(), this.canvas.data.canvas.width = this.width, this.canvas.data.canvas.height = this.height
            },
            bucketAllColors: function(a) {
                var b = this.mouse.start_x,
                    c = this.mouse.start_y;
                if (this.bucketCheck(b, c)) {
                    var d = this.rgbToAbgr(this.bucket.color),
                        e = this.bucket.p32,
                        f = e[this.bucket.filled[0]];
                    this.bucket.clear && (d = d.replace("0xFF", "0x00"));
                    for (var g = 0; g < e.length; g += 1) {
                        var h = this.getExactXYFromPosition(g);
                        this.settings.dithering && this.isOdd(h[0]) && this.isOdd(h[1]) || this.settings.dithering && !this.isOdd(h[0]) && !this.isOdd(h[1]) || e[g] === f && (e[g] = d, this.bucket.clearP32[g] = d)
                    }
                    this.canvas[a].ctx.putImageData(this.bucket.clearImageData, 0, 0), this.bucket.callback(this.bucket.clearImageData, this.bucket.imageData)
                }
            },
            bucketInRange: function(a) {
                var b = this.bucket.imageDataRender[a],
                    c = this.bucket.currentRGB,
                    d = parseInt(this.bucket.tolerance);
                return !!b && ((b[0] == c[0] || b[0] + d >= c[0] && b[0] - d <= c[0]) && (b[1] == c[1] || b[1] + d >= c[1] && b[1] - d <= c[1]) && (b[2] == c[2] || b[2] + d >= c[2] && b[2] - d <= c[2]) && b[3] == c[3])
            },
            bucketCheck: function(a, b) {
                var c = this.bucket.width,
                    d = this.bucket.height;
                a = parseInt(a), b = parseInt(b);
                var e = c * b + a;
                return a <= c - 1 && a >= 0 && b <= d - 1 && b >= 0 && (this.bucket.filled.push(e), this.layPixel(a, b, !0, "#000000", "data", 1), !0)
            },
            bucketCreatMask: function() {
                this.bucket.maskImageData = this.canvas.data.ctx.getImageData(0, 0, this.width, this.height)
            },
            progress: {
                status: !0,
                startStep: 2,
                step: 0,
                lap: 0,
                current: 2,
                max: 300,
                maxUploadFrames: 30,
                speed: 300,
                images: [],
                max_width: 0,
                max_height: 0,
                timer: !1,
                doPreview: !1,
                dir: "pos",
                dirCount: 1
            },
            setProgressImage: function(a) {
                this.isMobile || !this.progress.status || this.online.status || this.fileDrawing || this.FrameController.frames.length > 1 || !this.isAuth || ((this.width > 500 || this.height > 500) && (this.progress.max = 150), 0 == this.progress.step && (this.progress.step = this.progress.startStep), (this.width > this.progress.max_width || this.height > this.progress.max_height) && (this.progress.max_width = this.width, this.progress.max_height = this.height), this.progress.images.length >= this.progress.max && (this.progress.lap > 20 && (this.progress.lap = 0), this.progress.current > this.progress.max && (this.progress.current = this.progress.startStep, this.progress.lap++), this.progress.images.splice(this.progress.current, 1), this.progress.current += this.progress.step + this.progress.lap), this.progress.images.push(a))
            },
            toggleProgressSetting: function(a) {
                a ? this.progress.status = !1 : (this.progress.status = !1, this.prgoress.images = [])
            },
            stopProgress: function() {
                this.progress.doPreview = !1, clearTimeout(this.progress.timer)
            },
            showProgress: function(b) {
                var c = 0,
                    d = this,
                    e = this.renderProgressFrames(),
                    f = function() {
                        return d.progress.doPreview ? (c >= e.length && (c = 0), a(b).attr("src", e[c]), c++, void(d.progress.timer = setTimeout(function() {
                            f()
                        }, d.progress.speed))) : void clearTimeout(d.progress.timer)
                    };
                f()
            },
            downloadProgressGif: function(b, c, d, e) {
                var f = this,
                    b = b ? b : this.getScaleUpRatioDecimal(this.maxWidth, !0);
                return !this.progress.status || this.FrameController.frames.length > 1 || !e || !this.progress.images.length ? d(!1) : (a(".submit-drawing-butn").html(f.getResponse("res-replay-creating") + ' <span class="gif-loading-percent"></span>'), a(".download-progress-preview").html(f.getResponse("res-replay-loading") + ' <span class="loading-percent-preview-gif"></span>'), this.downloadProgressGifPrepare(b, function(b) {
                    if (f.SubmitController.updateBtns(), !c) return d(b);
                    var e = URL.createObjectURL(b);
                    a("#dowmnload-a").attr("href", e), a("#dowmnload-a").attr("download", "pixil-progress-gif-drawing.gif"), a("#dowmnload-a")[0].click(), a(".download-progress-preview").html("Download")
                }), void 0)
            },
            renderProgressFrames: function(a) {
                var b = [];
                if (!this.progress.images.length) return b;
                for (var c = Math.ceil(this.progress.images.length / this.progress.maxUploadFrames), d = 0; d < this.progress.images.length; d += c) b.push(this.progress.images[d]);
                return 1 != c && b.push(this.progress.images[this.progress.images.length - 1]), a && b.unshift(this.progress.images[this.progress.images.length - 1]), b
            },
            downloadProgressGifPrepare: function(a, b) {
                var c = this,
                    d = [];
                this.downloadProgressSize(a, function(a) {
                    for (var e = 0; e < a.length; e++) {
                        var f = new Image;
                        f.data_id = e;
                        c.progress.speed;
                        f.onload = function() {
                            d.push({
                                src: this,
                                speed: this.data_id == a.length - 1 ? 1750 : c.progress.speed,
                                data_id: this.data_id
                            }), d.length === a.length && c.arrangeImages(d, function(a) {
                                c.downloadProgressGifProcess(a, b)
                            })
                        }, f.src = a[e].src
                    }
                })
            },
            downloadProgressSize: function(b, c) {
                var d = this,
                    e = [],
                    f = {},
                    g = this.width * b,
                    h = this.height * b,
                    i = this.renderProgressFrames(!0),
                    j = new Image,
                    k = a("#made-with").attr("src");
                j.onload = function() {
                    var a = this.width,
                        j = this.height,
                        k = this;
                    d.createCanvas("extended", !1, !1, function() {
                        d.canvas.extended.canvas.width = g, d.canvas.extended.canvas.height = h, d.canvas.extended.setSmoothing();
                        for (var l = 0; l < i.length; l++) {
                            var m = new Image;
                            m.data_id = l, f[l] = "", m.onload = function() {
                                var l = this.width * b,
                                    m = this.height * b,
                                    n = g - a,
                                    o = h - j;
                                d.canvas.extended.ctx.drawImage(this, 0, 0, l, m), d.canvas.extended.ctx.drawImage(k, n - 15, o - 15), f[this.data_id] = d.canvas.extended.dataURL(), d.canvas.extended.clear(), e.push({
                                    src: f[this.data_id],
                                    data_id: this.data_id
                                }), e.length == i.length && (d.canvas.extended.destroy(), d.arrangeImages(e, function(a) {
                                    c(a)
                                }))
                            }, m.src = i[l]
                        }
                    })
                }, j.src = k
            },
            downloadProgressGifProcess: function(b, c) {
                var d = new GIF({
                    workers: 3,
                    quality: 1,
                    workerScript: "/js/dist/gif.worker.js"
                });
                a.each(b, function(a, b) {
                    d.addFrame(b.src, {
                        delay: parseInt(b.speed)
                    })
                }), d.on("progress", function(b) {
                    a(".loading-percent-preview-gif, .gif-loading-percent").text(Math.ceil(100 * b) + "%")
                }), d.on("finished", function(a) {
                    return c(a)
                }), d.render()
            },
            createWatermarkImage: function(a, b) {
                var c = this,
                    d = this.canvas.data,
                    e = "pixilart.com";
                this.user.status && (e = "By " + this.user.username + " on " + e);
                var f = this.width - 50,
                    g = this.height - 50;
                d["default"](), d.ctx.font = "bold 30px Arial", d.ctx.textAlign = "right", d.ctx.fillStyle = "black", d.ctx.globalAlpha = .05, d.ctx.fillText(e, f, g), d.ctx.fillStyle = "white", d.ctx.globalAlpha = .05, d.ctx.fillText(e, f, g), d.image().onload = function() {
                    if (c.settings.watermark.image = this, b) return b()
                }
            },
            checkSettings: function() {
                var b = this.getStorage(this.settings.name),
                    c = this.getCookie(this.settings.name);
                b && (b = JSON.parse(b), this.settings = a.extend(!0, this.settings, b)), c && c.name && (this.eraseCookie(this.settings.name), this.settings = a.extend(!0, this.settings, c), this.updateSettings())
            },
            updateSettings: function() {
                var b = a.extend(!0, {}, this.settings);
                b.tile.canvases = [], this.putStorage(this.settings.name, b, !1, !0)
            },
            updateSettingsByKey: function(a, b) {
                return
            },
            loadSettings: function() {
                var b = this.getStorage(this.settings.name),
                    c = this.getStorage(this.autosave.cookieName);
                c && (c = JSON.parse(c)), b && (b = JSON.parse(b), b = a.extend(!0, this.settings, b), b.dithering = !1, this.settings.isoLines = !1, b.mouseIcons && this.SettingsController.toggleMouseIcons(), b.palettes && b.palettes["default"] && !this.isApp && (this.ColorController.colorPresets = b.palettes), b.palette && !this.isApp && (this.ColorController.updateColors(b.palette, !0), this.ColorController.updateOptions()), b.zoomUnlock && this.SettingsController.toggleZoomLock(), b.roundedPixel && a("#rounded-toggle").prop("checked", !0), b.persLayers && !this.isApp, b.lockFrames && !this.online.status && (this.SettingsController.toggleLockedFrames(), a("#frames-lock-toggle").prop("checked", !0)), b.frames && b.frames.tile && !this.online.status && a("#frames-tile-toggle").prop("checked", !0), b.theme.lighter && this.changeTheme(), b.theme.icons && this.SettingsController.loadIconSet(), b.checker && this.isApp && (this.checker.status = !0, this.SettingsController.loadIconSet()), b.grid && this.isApp && (this.grid.status = !0, this.SettingsController.loadIconSet(), this.SettingsController.loadCssGrid()), b.tile.status && (c ? this.TileController.updateStatus(c.width, c.height) : this.TileController.updateStatus(), a("#tiles-toggle").prop("checked", !0)), b.tile.border && (this.updateBorder(), a("#tiles-border").prop("checked", !0)), this.updateTileOpacity(this.settings.tile.opacity))
            },
            alignPan: function(b, c, d) {
                var e = a("#drawing-canvas-conatiner").width(),
                    f = a("#drawing-canvas-conatiner").height(),
                    g = e / 2,
                    h = e / 2 - this.width * this.ZoomController.zoom,
                    i = f / 2,
                    j = f / 2 - this.height * this.ZoomController.zoom;
                b > g && (b = g), b < h && (b = h), c > i && (c = i), c < j && (c = j), a("#canvas-layers-container").css({
                    left: parseInt(b),
                    top: parseInt(c)
                }), d && this.ZoomController.setZoomPosition()
            },
            db: !1,
            dbPixils: {},
            dbTimer: !1,
            dbCurrent: 0,
            dbTimeMax: 25,
            backup: !1,
            databaseStart: function(a) {
                var b = this;
                if (this.db) return this.db;
                var c = window.indexedDB.open("pixils", 1);
                c.onerror = function(a) {
                    console.log("Error opening db", a)
                }, c.onsuccess = function(c) {
                    var d = c.target.result;
                    b.db = d, a && a()
                }, c.onupgradeneeded = function(a) {
                    var b = a.target.result,
                        c = b.createObjectStore("files", {
                            keyPath: "id"
                        });
                    c.createIndex("id", "id", {
                        unique: !0
                    }), c.createIndex("updated_at", "updated_at", {
                        unique: !1
                    })
                }
            },
            databaseGetPixils: function() {
                this.dbPixils = {};
                var a = this.db.transaction(["files"], "readonly");
                a.oncomplete = function() {
                    callback && callback(d)
                };
                var b = a.objectStore("drawings"),
                    c = b.index("updated_at"),
                    d = [];
                c.openCursor(null, "prev").onsuccess = function(a) {
                    var b = a.target.result;
                    b && (this.dbPixils[b.value.id] = b.value, b["continue"]())
                }
            },
            databaseGetPixil: function(a, b) {
                var c = this.db.transaction(["files"], "readwrite");
                c.oncomplete = function() {
                    b && b(e.result)
                };
                var d = c.objectStore("files"),
                    e = d.get(a)
            },
            databaseSavePixil: function(a, b) {
                var c = this.db.transaction(["files"], "readwrite");
                c.oncomplete = function() {
                    b && b()
                };
                var d = c.objectStore("files");
                a.id ? a.id : Date.now();
                a = JSON.parse(JSON.stringify(a)), d.put(a), (!this.backup || Date.now() > this.backup) && (a.id = "backup", d.put(a), this.backup = Date.now() + 3e5)
            },
            databaseDeletePixil: function(a, b) {
                var c = this.db.transaction(["files"], "readwrite");
                c.oncomplete = function() {
                    b && b()
                };
                var d = c.objectStore("files");
                d["delete"](a)
            }
        },
        ha = a("#width-image").text(),
        ia = a("#height-image").text(),
        ja = a("#edit-unqid").text(),
        ka = a("#edit-file").text(),
        la = !1;
    return a("#edit-image").length && (la = {
        image: a("#edit-image").attr("data-image"),
        resize: a("#edit-image").attr("data-size"),
        title: a("#edit-title").text(),
        description: a("#edit-description").text(),
        unqid: ja
    }), (a("#edit-description").length || a("#edit-title").length) && ("object" != typeof la && (la = {}), la.title = a("#edit-title").text(), la.description = a("#edit-description").text()), a("#sk").length >= 1 && ("object" != typeof la && (la = {}), la.skipNew = !0), ka && (la.file = ka), "boolean" == typeof window.pixilMobileApp ? ga : void ga.init(ha, ia, la)
}(jQuery);
