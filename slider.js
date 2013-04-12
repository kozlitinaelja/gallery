var Slider = function(container, config) {

  var images = container.find('img'),
      config = config || {};

  this.container = container;
  this.images = images;
  this.imageWidth = images.eq(0).outerWidth();
  this.imageLength = images.length;
  this.current = config.current || 0;
  this.timeout = 0;
  this.effectType = Slider.TYPE_FADE;
  this.fadeSpeed = config.fadeSpeed || 1000;
  this.playSpeed = config.playSpeed || 4000;
};

Slider.TYPE_FADE = 1;
Slider.TYPE_SLIDE = 0;

Slider.prototype = {
  constructor: Slider,

  play: function() {
    var curr = this.current,
        next = (curr !== (this.imageLength - 1) ) ? curr + 1 : 0;

    this._triggerEffect(curr, next);
    this.setCurrent(next);
    this._setTimer();
  },

  pause: function() {
    this._cleanTimer();
    this._setLayout();
  },

  prev: function() {
    var curr = this.current ,
        prev = curr !== 0 ? curr - 1 : this.imageLength - 1;

    this._cleanTimer();
    this._triggerEffect(curr, prev);
    this.setCurrent(prev);
  },

  next: function() {
    var curr = this.current ,
        next = (curr !== (this.imageLength - 1) ) ? curr + 1 : 0;

    this._cleanTimer();
    this._triggerEffect(curr, next);
    this.setCurrent(next);

  },

  getCurrent: function() {
    return this.current;
  },

  setCurrent: function(value) {
    this.current = value;
  },

  _triggerEffect: function(hide, show) {
    if (this.effectType) {
      this._fade(hide, show);
    } else {
      this._slide(show);
    }
  },

  setEffect: function(effect) {
    this.effectType = effect;
  },

  _setLayout: function() {
    if (this.effectType) {
      this.container.css({marginLeft: 0});
      this.images.addClass('play').removeClass('slide').css({opacity: 0});
      this.images.eq(this.current).addClass('show').css({opacity: 1});
    } else {
      this.images.removeClass('play').removeClass('show').addClass('slide').css({opacity: 1});
    }
  },

  _setTimer: function() {
    var self = this;
    this.timeout = setTimeout(function() {
      self.play()
    }, self.playSpeed);
  },

  _cleanTimer: function() {
    var self = this;
    if (this.timeout) {
      clearTimeout(self.timeout);
    }
  },

  _fade: function(hide, show) {
    this._setLayout();
    this.images.eq(hide).removeClass('show').animate({opacity: 0}, this.fadeSpeed);
    this.images.eq(show).addClass('show').animate({opacity: 1}, this.fadeSpeed);
  },

  _slide: function(slideTo) {
    this._setLayout();
    var moveBy = slideTo * this.imageWidth;
    this.container.css({marginLeft: -moveBy});
  }
};
