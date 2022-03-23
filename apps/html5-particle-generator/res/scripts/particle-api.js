

class ParticleOption {

  constructor() {
  }

  Min(min) {

    this.min = min;
    return this;
  }

  Max(max) {

    this.max = max;
    return this;
  }

  Step(step) {

    this.step = step;
    return this;

  }

  Value(value) {

    this.value = value;
    return this;

  }

}


var ParticleApi = function(Controller, init){

  this.init = false;

  this.proton = undefined;

  this.emitters = [];

  this.Controller = Controller;

  this.options = undefined;

  init.bind(this).call();

  this.main = function(){

    this.Controller.update();

  };

  this.setGameWindow = function(gameWindow){

    gameWindow.get_center = function(){
      return new Gamelab.Vector(this.canvas.width / 2, this.canvas.height * 0.75)
    }

  };

  this.toggle = function(on, gameWindow){

    this.setGameWindow(gameWindow);

    //if 1st argument not-undefined then apply 1st argument, otherwise toggle
    this.Controller.on = on == 'undefined' ? !this.Controller.on : on;

            if(!this.init)
            {
              Controller.ready(gameWindow);
              this.main(gameWindow.canvas);
            }
            else {
              if(!this.Controller.on)
              {
                this.emitters.forEach(function(item){
                  item.destroy();
                });
              }
              else {
                //alert('restarting this module');
                Controller.ready(gameWindow);
              }
            }

            this.proton = this.Controller.proton;
            this.emitters = this.Controller.emitters;

            this.init = true;

  };

  this.Options = function(){

    let particleOptions = this.options !== undefined ? this.options:

    (function() {

      var baseOptions = {

        adjustPositionX: {
          min: -400, max: 400, step: 1.0, value: -20
        },

        adjustPositionY: {
          min: -400, max: 400, step: 1.0, value: -20
        },

        color: new Color()

      };

      return baseOptions;

    })();

    this.options = particleOptions;

    return this.options;

  };


};




class ProtonDropOption {

  constructor(key, min, max) {

    this.key = key;

    if(min)
    {
      this.min = min;
    }

    if(max)
    {
      this.max = max;
    }

  }

  Min(min) {

    this.min = min;

    return this;

  }

  Max(max) {

    this.max = max;

    return this;

  }

  ready(item) {

    function def(v) {
      return v !== undefined;
    }

    if(def(this.min) && item[this.key] < this.min)
    {
      return true;
    }

    if(def(this.max) && item[this.key] > this.max)
    {
      return true;
    }

    return false;

  }

}



Proton.BoundEmitter = function(){

  var emitter = new Proton.Emitter();

  emitter.Drop = function(key){

    this.dropOptions[x] = new ProtonDropOption(key);

    return this.dropOptions[x];

  };

  emitter.dropOptions = {};

  emitter.dropUpdate = function(){

    var $e = this;

    this.particles.forEach(function(p){

      for(var x in $e.dropOptions)
      {
        if($e.dropOptions[x].ready(p))
        {
          var index = $e.particles.indexOf(p);
          $e.particles.splice(index, 1);
        }
      }

    });

  }


  return emitter;

};
