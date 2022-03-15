


module.exports = function(){

  var context;
  var proton;
  var renderer;
  var emitter, position;
  var stats;



      var image = new Image();


      image.src = './res/images/fire.png';


      var Controller = {

        on: false,

        proton: undefined,

        emitters: [],

        ready: function(gameWindow){

            gameWindow.ctx = gameWindow.canvas.getContext('2d');

            var canvas = gameWindow.canvas;

            proton = new Proton;
            emitter = new Proton.Emitter();
            emitter.rate = new Proton.Rate(new Proton.Span(5, 8), .02);

            gameWindow.ctx.globalCompositeOperation = "lighter";


            var position = new Gamelab.Vector(gameWindow.size.x / 2.0, gameWindow.size.y / 2.0);


            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.Body(image));
            emitter.addInitialize(new Proton.P(new Proton.CircleZone(position.x, position.y, 5)));
            emitter.addInitialize(new Proton.Life(1, 2));
            emitter.addInitialize(new Proton.V(new Proton.Span(0.8, 1.75), new Proton.Span(0, 30, true), 'polar'));

            emitter.addBehaviour(new Proton.Scale(0.4, 0));
            emitter.addBehaviour(new Proton.Alpha(0.8, 0.1));

            emitter.emit();
            proton.addEmitter(emitter);


            renderer = new Proton.CanvasRenderer(canvas);
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
