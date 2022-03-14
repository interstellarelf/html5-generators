


module.exports = function(){

  var context;
  var proton;
  var renderer;
  var emitter, position;
  var stats;


      var Controller = {

        on: false,

        proton: undefined,

        emitters: [],

        ready: function(gameWindow){


            gameWindow.ctx = gameWindow.canvas.getContext('experimental-web-gl');

            proton = new Proton();

            emitter = new Proton.Emitter();
            emitter.rate = new Proton.Rate(new Proton.Span(10, 15), .1);

            emitter.addInitialize(new Proton.Mass(7));
            emitter.addInitialize(new Proton.Body(image));

            position = new Proton.Position(new Proton.PointZone(gameWindow.canvas.width / 2.0, gameWindow.canvas.height / 2.0));
            emitter.addInitialize(position);

            emitter.addInitialize(new Proton.Life(0.2, 0.6));
            emitter.addInitialize(new Proton.V(new Proton.Span(0.2, 1.2), new Proton.Span(0, 360), 'polar'));

            emitter.addBehaviour(new Proton.Alpha(1, 0));
            emitter.addBehaviour(new Proton.Color('#C97024', '#290000'));
            emitter.addBehaviour(new Proton.Scale(1, Proton.getSpan(1, 2)));
            emitter.emit();

            proton.addEmitter(emitter);

            renderer = new Proton.WebGlRenderer(gameWindow.canvas);
            renderer.blendFunc("SRC_ALPHA", "ONE");
            proton.addRenderer(renderer);

            this.proton = proton;

            this.emitters.push(emitter);

        },

        update: function(){

          if(this.on == false)
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
