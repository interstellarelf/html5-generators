


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

            proton = new Proton();
            emitter = new Proton.BoundEmitter();
            emitter.rate = new Proton.Rate(new Proton.Span(2, 4), .02);

            gameWindow.ctx.globalCompositeOperation = "lighter";

            var position = new Gamelab.Vector(gameWindow.size.x / 2.0, gameWindow.size.y / 2.0);

            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.Body(image));
            emitter.addInitialize(new Proton.P(new Proton.CircleZone(position.x, position.y, 0)));
            emitter.addInitialize(new Proton.Life(1, 2));
            emitter.addInitialize(new Proton.V(new Proton.Span(2, 2.4), new Proton.Span(0, 30, true), 'polar'));

            emitter.addBehaviour(new Proton.Scale(1.0, 0));
            emitter.addBehaviour(new Proton.Alpha(0.8, -1.5));

            emitter.emit();
            proton.addEmitter(emitter);

            renderer = new Proton.CanvasRenderer(canvas);
            proton.addRenderer(renderer);

            this.proton = proton;

            emitter.Drop('scale').Min(0.17);

            emitter.Drop('alpha').Min(0.1);

            this.emitters.push(emitter);

            gameWindow.draw = function(){
              //empty draw
            };

            var timer = 0;

             emitter.onUpdate(function(canvas, ctx){

               var canvas = gameWindow.canvas, ctx = gameWindow.ctx;

               var width = gameWindow.canvas.width, height = gameWindow.canvas.height;

               var imageData = gameWindow.ctx.getImageData(0, 0, width, height);

               var index = 0;

               for(var x = 0; x < imageData.data.length; x+=4)
               {

                 var opacity = imageData.data[x + 3];

                 if(parseFloat(opacity) <= 70)
                 {

                   imageData.data[x + 3] = 0;
                 }

               }

               var finalCanvas = getFinalCanvas();

               var finalCtx = finalCanvas.getContext('2d');

               finalCtx.clearRect(0, 0, 1000, 1000);

               finalCtx.putImageData(imageData, 0, 0);

            }, gameWindow.canvas, gameWindow.ctx);

            showFinalCanvas();

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
