(function($) {
    var ColorPicker = function() {
        var
            ids = {},
            inAction, charMin = 65,
            visible, tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_hue_bottom"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
            defaults = {
                eventName: 'click',
                onShow: function() {},
                onBeforeShow: function() {},
                onHide: function() {},
                onChange: function() {},
                onSubmit: function() {},
                color: 'ff0000',
                livePreview: true,
                flat: false,
                mDown: 'mousedown',
                mUp: 'mouseup',
                mMove: 'mousemove',
                mobile: false,
                secondary: false,
            },
            fillRGBFields = function(hsb, cal) {
                var rgb = HSBToRGB(hsb);
                $(cal).data('colorpicker').fields.eq(1).val(rgb.r).end().eq(2).val(rgb.g).end().eq(3).val(rgb.b).end();
            },
            fillHSBFields = function(hsb, cal) {
                $(cal).data('colorpicker').fields.eq(4).val(parseInt(hsb.h)).end().eq(5).val(parseInt(hsb.s)).end().eq(6).val(parseInt(hsb.b)).end();
            },
            fillHexFields = function(hsb, cal) {
                $(cal).data('colorpicker').fields.eq(0).val(HSBToHex(hsb)).end();
            },
            setSelector = function(hsb, cal) {
                $(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({
                    h: hsb.h,
                    s: 100,
                    b: 100
                }));
                $(cal).data('colorpicker').selectorIndic.css({
                    left: parseInt(150 * hsb.s / 100, 10),
                    top: parseInt(150 * (100 - hsb.b) / 100, 10)
                });
            },
            setHue = function(hsb, cal) {
                $(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h / 360, 10));
                $(cal).data('colorpicker').hueBottom.css('left', parseInt(150 - 150 * hsb.h / 360, 10));
            },
            setCurrentColor = function(hsb, cal) {
                $(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
            },
            setNewColor = function(hsb, cal) {
                $(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
            },
            keyDown = function(ev) {
                var pressedKey = ev.charCode || ev.keyCode || -1;
                if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
                    return false;
                }
                var cal = $(this).parent().parent();
                if (cal.data('colorpicker').livePreview === true) {
                    change.apply(this);
                }
            },
            change = function(ev) {
                var cal = $(this).parent().parent(),
                    col;
                if (this.parentNode.className.indexOf('_hex') > 0) {
                    cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
                } else if (this.parentNode.className.indexOf('_hsb') > 0) {
                    cal.data('colorpicker').color = col = fixHSB({
                        h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
                        s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
                        b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
                    });
                } else {
                    cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
                        r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
                        g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
                        b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
                    }));
                }
                if (ev) {
                    fillRGBFields(col, cal.get(0));
                    fillHexFields(col, cal.get(0));
                    fillHSBFields(col, cal.get(0));
                }
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
                cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').secondary]);
            },
            blur = function(ev) {
                var cal = $(this).parent().parent();
                cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
            },
            focus = function() {
                charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
                $(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
                $(this).parent().addClass('colorpicker_focus');
            },
            downIncrement = function(ev) {
                var field = $(this).parent().find('input').focus();
                var current = {
                    el: $(this).parent().addClass('colorpicker_slider'),
                    max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
                    y: ev.pageY,
                    field: field,
                    val: parseInt(field.val(), 10),
                    preview: $(this).parent().parent().data('colorpicker').livePreview
                };
                $(document).bind('pointerup', current, upIncrement);
                $(document).bind('pointermove', current, moveIncrement);
            },
            moveIncrement = function(ev) {
                ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
                if (ev.data.preview) {
                    change.apply(ev.data.field.get(0), [true]);
                }
                return false;
            },
            upIncrement = function(ev) {
                change.apply(ev.data.field.get(0), [true]);
                ev.data.el.removeClass('colorpicker_slider').find('input').focus();
                $(document).unbind('pointerup', upIncrement);
                $(document).unbind('pointermove', moveIncrement);
                return false;
            },
            downHue = function(ev) {
                var current = {
                    cal: $(this).parent(),
                    y: $(this).offset().top
                };
                current.preview = current.cal.data('colorpicker').livePreview;
                $(document).bind('pointerup', current, upHue);
                $(document).bind('pointermove', current, moveHue);
                $(document).bind('pointerdown', current, moveHue);
            },
            downHueBottom = function(ev) {
                var current = {
                    cal: $(this).parent(),
                    x: $(this).offset().left
                };
                current.preview = current.cal.data('colorpicker').livePreview;
                $(document).bind('pointerup', current, upHue);
                $(document).bind('pointermove', current, moveHueBottom);
                $(document).bind('pointerdown', current, moveHueBottom);
            },
            moveHueBottom = function(ev) {
                if (ev.originalEvent && ev.originalEvent.touches) {
                    ev.originalEvent.touches[0].data = ev.data;
                    ev = ev.originalEvent.touches[0];
                }
                change.apply(ev.data.cal.data('colorpicker').fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, (ev.pageX - ev.data.x)))) / 150, 10)).get(0), [ev.data.preview]);
                return false;
            },
            moveHue = function(ev) {
                if (ev.originalEvent && ev.originalEvent.touches) {
                    ev.originalEvent.touches[0].data = ev.data;
                    ev = ev.originalEvent.touches[0];
                }
                change.apply(ev.data.cal.data('colorpicker').fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, (ev.pageY - ev.data.y)))) / 150, 10)).get(0), [ev.data.preview]);
                return false;
            },
            upHue = function(ev) {
                fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                $(document).unbind('pointerup', upHue);
                $(document).unbind('pointermove', moveHue);
                $(document).unbind('pointerdown', moveHue);
                $(document).unbind('pointermove', moveHueBottom);
                $(document).unbind('pointerdown', moveHueBottom);
                return false;
            },
            downSelector = function(ev) {
                var current = {
                    cal: $(this).parent(),
                    pos: $(this).offset()
                };
                current.preview = current.cal.data('colorpicker').livePreview;
                $(document).bind('pointerup', current, upSelector);
                $(document).bind('pointermove', current, moveSelector);
                $(document).bind('pointerdown', current, moveSelector);
            },
            moveSelector = function(ev) {
                if (ev.originalEvent && ev.originalEvent.touches) {
                    ev.originalEvent.touches[0].data = ev.data;
                    ev = ev.originalEvent.touches[0];
                }
                change.apply(ev.data.cal.data('colorpicker').fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, (ev.pageY - ev.data.pos.top)))) / 150, 10)).end().eq(5).val(parseInt(100 * (Math.max(0, Math.min(150, (ev.pageX - ev.data.pos.left)))) / 150, 10)).get(0), [ev.data.preview]);
                return false;
            },
            upSelector = function(ev) {
                fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                $(document).unbind('pointerup', upSelector);
                $(document).unbind('pointermove', moveSelector);
                $(document).unbind('pointerdown', moveSelector);
                return false;
            },
            enterSubmit = function(ev) {
                $(this).addClass('colorpicker_focus');
            },
            leaveSubmit = function(ev) {
                $(this).removeClass('colorpicker_focus');
            },
            clickSubmit = function(ev) {
                var cal = $(this).parent();
                var col = cal.data('colorpicker').color;
                cal.data('colorpicker').origColor = col;
                setCurrentColor(col, cal.get(0));
                cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
            },
            show = function(ev) {
                var cal = $('#' + $(this).data('colorpickerId'));
                cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
                var pos = $(this).offset();
                var viewPort = getViewport();
                var top = pos.top + this.offsetHeight;
                var left = pos.left;
                if (top + 176 > viewPort.t + viewPort.h) {
                    top -= this.offsetHeight + 176;
                }
                if (left + 356 > viewPort.l + viewPort.w) {
                    left -= 356;
                }
                cal.css({
                    left: left + 'px',
                    top: top + 'px'
                });
                if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
                    cal.show();
                }
                $(document).bind('pointerdown', {
                    cal: cal
                }, hide);
                return false;
            },
            hide = function(ev) {
                if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
                    if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
                        ev.data.cal.hide();
                    }
                    $(document).unbind('pointerdown', hide);
                }
            },
            isChildOf = function(parentEl, el, container) {
                if (parentEl == el) {
                    return true;
                }
                if (parentEl.contains) {
                    return parentEl.contains(el);
                }
                if (parentEl.compareDocumentPosition) {
                    return !!(parentEl.compareDocumentPosition(el) & 16);
                }
                var prEl = el.parentNode;
                while (prEl && prEl != container) {
                    if (prEl == parentEl)
                        return true;
                    prEl = prEl.parentNode;
                }
                return false;
            },
            getViewport = function() {
                var m = document.compatMode == 'CSS1Compat';
                return {
                    l: window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
                    t: window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
                    w: window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
                    h: window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
                };
            },
            fixHSB = function(hsb) {
                return {
                    h: Math.min(360, Math.max(0, hsb.h)),
                    s: Math.min(100, Math.max(0, hsb.s)),
                    b: Math.min(100, Math.max(0, hsb.b))
                };
            },
            fixRGB = function(rgb) {
                return {
                    r: Math.min(255, Math.max(0, rgb.r)),
                    g: Math.min(255, Math.max(0, rgb.g)),
                    b: Math.min(255, Math.max(0, rgb.b))
                };
            },
            fixHex = function(hex) {
                var len = 6 - hex.length;
                if (len > 0) {
                    var o = [];
                    for (var i = 0; i < len; i++) {
                        o.push('0');
                    }
                    o.push(hex);
                    hex = o.join('');
                }
                return hex;
            },
            HexToRGB = function(hex) {
                var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
                return {
                    r: hex >> 16,
                    g: (hex & 0x00FF00) >> 8,
                    b: (hex & 0x0000FF)
                };
            },
            HexToHSB = function(hex) {
                return RGBToHSB(HexToRGB(hex));
            },
            RGBToHSB = function(rgb) {
                var hsb = {
                    h: 0,
                    s: 0,
                    b: 0
                };
                var min = Math.min(rgb.r, rgb.g, rgb.b);
                var max = Math.max(rgb.r, rgb.g, rgb.b);
                var delta = max - min;
                hsb.b = max;
                if (max != 0) {}
                hsb.s = max != 0 ? 255 * delta / max : 0;
                if (hsb.s != 0) {
                    if (rgb.r == max) {
                        hsb.h = (rgb.g - rgb.b) / delta;
                    } else if (rgb.g == max) {
                        hsb.h = 2 + (rgb.b - rgb.r) / delta;
                    } else {
                        hsb.h = 4 + (rgb.r - rgb.g) / delta;
                    }
                } else {
                    hsb.h = -1;
                }
                hsb.h *= 60;
                if (hsb.h < 0) {
                    hsb.h += 360;
                }
                hsb.s *= 100 / 255;
                hsb.b *= 100 / 255;
                return hsb;
            },
            HSBToRGB = function(hsb) {
                let h = hsb.h,
                    s = hsb.s,
                    b = hsb.b;
                let r, g, bb;
                s = s / 100;
                b = b / 100;
                const i = Math.floor(h / 60);
                const f = h / 60 - i;
                const p = b * (1 - s);
                const q = b * (1 - f * s);
                const t = b * (1 - (1 - f) * s);
                switch (i) {
                    case 0:
                        r = b;
                        g = t;
                        bb = p;
                        break;
                    case 1:
                        r = q;
                        g = b;
                        bb = p;
                        break;
                    case 2:
                        r = p;
                        g = b;
                        bb = t;
                        break;
                    case 3:
                        r = p;
                        g = q;
                        bb = b;
                        break;
                    case 4:
                        r = t;
                        g = p;
                        bb = b;
                        break;
                    default:
                        r = b;
                        g = p;
                        bb = q;
                        break;
                }
                return {
                    r: Math.round(r * 255),
                    g: Math.round(g * 255),
                    b: Math.round(bb * 255)
                };
            },
            RGBToHex = function(rgb) {
                var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
                $.each(hex, function(nr, val) {
                    if (val.length == 1) {
                        hex[nr] = '0' + val;
                    }
                });
                return hex.join('');
            },
            HSBToHex = function(hsb) {
                return RGBToHex(HSBToRGB(hsb));
            },
            restoreOriginal = function() {
                var cal = $(this).parent();
                var col = cal.data('colorpicker').origColor;
                cal.data('colorpicker').color = col;
                fillRGBFields(col, cal.get(0));
                fillHexFields(col, cal.get(0));
                fillHSBFields(col, cal.get(0));
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
            };
        return {
            init: function(opt) {
                opt = $.extend({}, defaults, opt || {});
                if (typeof opt.color == 'string') {
                    opt.color = HexToHSB(opt.color);
                } else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
                    opt.color = RGBToHSB(opt.color);
                } else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
                    opt.color = fixHSB(opt.color);
                } else {
                    return this;
                }
                return this.each(function() {
                    if (!$(this).data('colorpickerId')) {
                        var options = $.extend({}, opt);
                        options.origColor = opt.color;
                        var id = 'collorpicker_' + parseInt(Math.random() * 1000);
                        $(this).data('colorpickerId', id);
                        var cal = $(tpl).attr('id', id);
                        if (options.flat) {
                            cal.appendTo(this).show();
                        } else {
                            cal.appendTo(document.body);
                        }
                        options.secondary = $(this).hasClass('secondary-color');
                        if (options.secondary) {
                            cal.data('secondary', 1);
                        }
                        var mDown = 'pointerdown';
                        if (options.mobile) {
                            mDown = 'pointerdown';
                            cal.data('mobile', true);
                            cal.attr('touch-action', 'none');
                        }
                        cal.attr('touch-action', 'none');
                        options.fields = cal.find('input').bind('keyup', keyDown).bind('change', change).bind('blur', blur).bind('focus', focus);
                        cal.find('span').bind(mDown, downIncrement).end().find('>div.colorpicker_current_color').bind('click', restoreOriginal);
                        options.selector = cal.find('div.colorpicker_color').bind(mDown, downSelector);
                        options.selectorIndic = options.selector.find('div div');
                        options.el = this;
                        options.hue = cal.find('div.colorpicker_hue div');
                        options.hueBottom = cal.find('div.colorpicker_hue_bottom div');
                        cal.find('div.colorpicker_hue').bind(mDown, downHue);
                        cal.find('div.colorpicker_hue_bottom').bind(mDown, downHueBottom);
                        options.newColor = cal.find('div.colorpicker_new_color');
                        options.currentColor = cal.find('div.colorpicker_current_color');
                        cal.data('colorpicker', options);
                        cal.find('div.colorpicker_submit').bind('mouseenter', enterSubmit).bind('mouseleave', leaveSubmit).bind('click', clickSubmit);
                        fillRGBFields(options.color, cal.get(0));
                        fillHSBFields(options.color, cal.get(0));
                        fillHexFields(options.color, cal.get(0));
                        setHue(options.color, cal.get(0));
                        setSelector(options.color, cal.get(0));
                        setCurrentColor(options.color, cal.get(0));
                        setNewColor(options.color, cal.get(0));
                        if (options.flat) {
                            cal.css({
                                position: 'relative',
                                display: 'block'
                            });
                        } else {
                            $(this).bind(options.eventName, show);
                        }
                    }
                });
            },
            showPicker: function() {
                return this.each(function() {
                    if ($(this).data('colorpickerId')) {
                        show.apply(this);
                    }
                });
            },
            hidePicker: function() {
                return this.each(function() {
                    if ($(this).data('colorpickerId')) {
                        $('#' + $(this).data('colorpickerId')).hide();
                    }
                });
            },
            setColor: function(col) {
                if (typeof col == 'string') {
                    col = HexToHSB(col);
                } else if (col.r != undefined && col.g != undefined && col.b != undefined) {
                    col = RGBToHSB(col);
                } else if (col.h != undefined && col.s != undefined && col.b != undefined) {
                    col = fixHSB(col);
                } else {
                    return this;
                }
                return this.each(function() {
                    if ($(this).data('colorpickerId')) {
                        var cal = $('#' + $(this).data('colorpickerId'));
                        cal.data('colorpicker').color = col;
                        cal.data('colorpicker').origColor = col;
                        fillRGBFields(col, cal.get(0));
                        fillHSBFields(col, cal.get(0));
                        fillHexFields(col, cal.get(0));
                        setHue(col, cal.get(0));
                        setSelector(col, cal.get(0));
                        setCurrentColor(col, cal.get(0));
                        setNewColor(col, cal.get(0));
                    }
                });
            }
        };
    }();
    $.fn.extend({
        ColorPicker: ColorPicker.init,
        ColorPickerHide: ColorPicker.hidePicker,
        ColorPickerShow: ColorPicker.showPicker,
        ColorPickerSetColor: ColorPicker.setColor
    });
})(jQuery)
