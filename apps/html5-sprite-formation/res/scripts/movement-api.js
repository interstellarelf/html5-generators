

class MovementOption {

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

  Duration(duration) {

    this.duration = duration;
    return this;

  }

  Curve(curve) {

    this.curve = curve;
    return this;

  }

  Precurve(precurve) {

    this.precurve = precurve;
    return this;

  }

  Delay(delay) {
    this.delay = delay;
    return this;
  }

  Interpole(interpole) {

    this.interpole = interpole;
    return this;

  }

  Value(value) {

    this.value = value;
    return this;

  }

}


var MovementApi = function(Controller, init){

  this.init = false;

  this.slide = undefined;

  this.movements = [];

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
                this.movements.forEach(function(item){
                  item.destroy();
                });
              }
              else {
                //alert('restarting this module');
                Controller.ready(gameWindow);
              }
            }

            this.slide = this.Controller.slide;
            this.movements = this.Controller.movements;

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
