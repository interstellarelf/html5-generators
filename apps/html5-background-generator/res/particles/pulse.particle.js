

module.exports = function(options={}){

  var proton;
  var renderer;
  var emitter, position;
  var stats;

  var scale;

      var Controller = {

        on: false,

        degrees: 0,

        proton: undefined,

        emitters: [],

        options: undefined,

        ready: function(gameWindow){

          proton = new Proton();

          var canvas = gameWindow.canvas;

          gameWindow.ctx = canvas.getContext('2d');
          gameWindow.ctx.globalCompositeOperation = "lighter";

          emitter = new Proton.Emitter();
          emitter.rate = new Proton.Rate(new Proton.Span(4, 8), new Proton.Span(0.05, 0.1));

          position = new Proton.Position(new Proton.PointZone(canvas.width / 2, canvas.height / 2.0));

          emitter.addInitialize(position);

          emitter.addInitialize(new Proton.Body(image));
          emitter.addInitialize(new Proton.Mass(1));
          emitter.addInitialize(new Proton.Life(1));
          emitter.addInitialize(new Proton.V(new Proton.Span(1, 2), new Proton.Span(0, 360), 'polar'));

          emitter.addBehaviour(new Proton.Alpha(1, [0.7]));
          scale = new Proton.Scale(1, 0);
          emitter.addBehaviour(scale);
          emitter.addBehaviour(new Proton.Color('random', 'random', Infinity, Proton.easeInSine));

          emitter.emit();
          
          proton.addEmitter(emitter);

          renderer = new Proton.CanvasRenderer(canvas);
          proton.addRenderer(renderer);

          this.proton = proton;
          this.emitters.push(emitter);

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

    image.src = './res/images/particle.png';


    function tick(callback) {

        requestAnimationFrame(function(){
          tick(callback)
        });

        proton.update();
        callback();

    }


    return new ParticleApi(Controller, function init() {

      this.canvas = gameWindow.canvas;

    });


};
