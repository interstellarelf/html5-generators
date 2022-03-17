
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


            var spiritModule = new Gamelab.Module().load('./res/modules/the-spirit.js', function(spiritLib){


                var construct = new spiritLib(gameWindow);


            });


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
