module.exports = function() {

  var context;
  var proton;
  var renderer;
  var emitter;
  var emitter1, emitter2;
  var stats;
  var canvas;
  var attractionBehaviours = [];
  var conf = {
    radius: 110,
    tha: 0
  };
  var mouseObj;

  var graphicWindow;


  function emitterRun() {

    var canvas = graphicWindow.canvas;

    emitter1.p.x = canvas.width / 2 + conf.radius * Math.sin(Math.PI / 2 + conf.tha);
    emitter1.p.y = canvas.height / 2 + conf.radius * Math.cos(Math.PI / 2 + conf.tha);
    emitter2.p.x = canvas.width / 2 + conf.radius * Math.sin(-Math.PI / 2 + conf.tha);
    emitter2.p.y = canvas.height / 2 + conf.radius * Math.cos(-Math.PI / 2 + conf.tha);

    conf.tha += .1;
  }

  function createImageEmitter(x, y, color1, color2) {

    var canvas = graphicWindow.canvas;

    var emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(5, 7), new Proton.Span(.01, .02));

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(0.4));
    emitter.addInitialize(new Proton.Body(['./res/images/particle.png'], 12));
    emitter.addInitialize(new Proton.Radius(10));

    emitter.addBehaviour(new Proton.Alpha(1, 0));
    emitter.addBehaviour(new Proton.Color(color1, color2));
    emitter.addBehaviour(new Proton.Scale(1.5, 0.1));
    emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'dead'));
    var attractionBehaviour = new Proton.Attraction(mouseObj, 0, 0);
    attractionBehaviours.push(attractionBehaviour);
    emitter.addBehaviour(attractionBehaviour);

    emitter.p.x = x;
    emitter.p.y = y;
    emitter.emit();
    proton.addEmitter(emitter);

    return emitter;
  }


  var Controller = {

    on: false,

    proton: undefined,

    emitters: [],

    ready: function(gameWindow) {


      gameWindow.ctx = gameWindow.canvas.getContext('experimental-web-gl');

      graphicWindow = gameWindow;

      proton = new Proton();

      var canvas = gameWindow.canvas;

      var position = new Gamelab.Vector(gameWindow.size.x / 2.0, gameWindow.size.y / 2.0);

      emitter1 = createImageEmitter(canvas.width / 2 + conf.radius, canvas.height / 2, '#CC4500', '#9A0000');
      emitter2 = createImageEmitter(canvas.width / 2 - conf.radius, canvas.height / 2, '#0033AF', '#002720');

      renderer = new Proton.WebGlRenderer(canvas);
      renderer.blendFunc("SRC_ALPHA", "ONE");
      proton.addRenderer(renderer);


      this.proton = proton;
      this.emitters.push(emitter1);
      this.emitters.push(emitter2);

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

    emitterRun();

    proton.update();
    callback();

  }



  return new ParticleApi(Controller, function init() {

    this.canvas = gameWindow.canvas;

  });



};
