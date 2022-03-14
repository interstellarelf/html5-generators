

module.exports = function(options={}){

  var proton;
  var renderer;
  var emitter, position;
  var stats;

  var scale;

  var particle;

  var datargs = {
    shape: 'circle',
    path: {
      selection: 'random',
      size: {
        x: 200,
        y: 200
      },
      curve: 'linear'
    },
    birthrate: {
      a: 20,
      b: 20,
      transition: 'random'
    },
    life: {
      a: 70,
      b: 70,
      transition: 'random'
    },
    color: {
      a: '#ff0000',
      b: '#0000ff',
      transition: 'linear'
    },
    speed: {
      a: 1.0,
      b: 4.0,
      transition: 'linear'
    },
    scale: {
      a: 0.5,
      b: 1.0,
      transition: 'linear'
    },
    angle: {
      a: 0,
      b: 360,
      transition: 'random'
    },
    alpha: {
      a: 1.0,
      b: 0.1,
      transition: 'linear'
    }
  };

  var ParticleDemo;

      var Controller = {

        on: false,

        degrees: 0,

        proton: undefined,

        emitters: [],

        options: undefined,

        sprites: [],

        index: 0,

        ready: function(gameWindow){

          var canvas = gameWindow.canvas;

          var particle = new Gamelab.Particle(datargs, gameWindow).Src('./res/images/ripple.png');

          particle.Composite('lighter');

          gameWindow.ctx = canvas.getContext('2d');
          gameWindow.ctx.globalCompositeOperation = "lighter";

          var RATE = 20;

          var LIFE = 20;

          var TIMER = 0;

          var INTERVAL = 4;

          var POSITION = new Gamelab.Vector(200, 200);

          gameWindow.onUpdate(function(){

            console.log('--update');

            TIMER += 1;

            if(TIMER % 4.0 == 0)
            {
              particle.enter(2);
            }

          });

        },

        update: function(){

          if(!this.on)
          {
            return;
          }

          var $controller = this;

          tick(function(){

          });

        }

      };


    var image = new Image();

    image.src = './res/images/ripple.png';


    function tick(callback) {

        requestAnimationFrame(function(){
          tick(callback)
        });

        callback();

    }


    return new ParticleApi(Controller, function init() {

      this.canvas = gameWindow.canvas;

      gameWindow.start();

    });


};
