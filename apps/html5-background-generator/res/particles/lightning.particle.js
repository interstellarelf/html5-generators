module.exports = function() {

  var context;
  var proton;
  var renderer;
  var emitter, position;
  var stats;

  var V = function(x, y) {
    return new Gamelab.Vector(x, y)
  };

  var Options = {

    offset: ParticleOptions.offset || {
      min: V(0, 0),
      max: V(400, 400),
      step: V(1.0, 1.0),
      value: V(120, 170)
    }

  };

  function createLightningPoints(min, max, line_color, blur_color) {

    return {
      min,
      max,
      line_color,
      blur_color
    };

  };

  var LinePair = function(x1, y1, x2, y2) {

    return {
      min: V(x1, y1),
      max: V(x2, y2)
    };

  }

  var points = [LinePair(20, 20, 105, 38), LinePair(180, 20, 300, 34), LinePair(40, 190, 220, 170)];

  var lightningArray = [];

  var Controller = {

    on: false,

    proton: undefined,

    emitters: [],

    ready: function(gameWindow) {

      gameWindow.ctx = gameWindow.canvas.getContext('2d');

      points.forEach(function(linePair) {

        var min = linePair.min,
          max = linePair.max;

        lightningArray.push(
          createLightningPoints(
            V(min).add(Options.offset.value),
            V(max).add(Options.offset.value),
            'rgba(0, 100, 100, 1.0)',
            'rgba(0, 100, 100, 0.8)'
          )
        );

      });

      for (var x in lightningArray) {

        var l = lightningArray[x];

        var instance = new LightningPointPair(gameWindow);

        l.instance = instance;

      }

    },

    update: function() {

      if (this.on == false) {
        return;
      }

      var $controller = this;

      tick(function() {

      });

    }

  };

  var image = new Image();
  image.src = './res/images/particle.png';

  function tick(callback) {

    requestAnimationFrame(function() {
      tick(callback)
    });

    callback();

  }

  return new ParticleApi(Controller, function init() {

    this.canvas = gameWindow.canvas;

    gameWindow.start();

  });

};
