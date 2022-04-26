class MovementOption {

  constructor() {}

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


function diff(o1, o2) {
  return o2 - o1;
}

function roundToZeroSpriteRotation(sprite, nearest) {

  if (Math.abs(sprite.rotation.x) <= nearest) {

    sprite.rotation.x = 0;

  }

}


var MotionLibrary = {

  SeekVertPairRotation: function(upper, lower, rt1, rt2, duration, curve) {

    var motion =  {
      id: 'seek-vert-pair-rot-' + rt1 + '-' + rt2 + '-' + duration,
      move: 'SeekVertPairRotation',
      upper: upper,
      lower: lower,
      or1: upper.rotation.x,
      or2: lower.rotation.x,
      rt1: rt1,
      rt2: rt2,
      duration: duration,
      curve: curve,
      timer: 0,
      call: function(){

        var dr1 = diff(upper.rotation.x, this.rt1),
          dr2 = diff(lower.rotation.x, this.rt2);

      //  console.log("timer:" + this.timer);

      //  console.log("duration:" + this.duration);

        if (this.timer >= this.duration) {
            return;
        }

        var portion = this.timer / this.duration;

        if (dr1 !== 0) {
          var step = curve(portion) * dr1;
          upper.rotation.x = this.or1 + step;
          roundToZeroSpriteRotation(upper, 0.2);
        }

        if (dr2 !== 0) {
          var step = curve(portion) * dr2;
          lower.rotation.x = this.or2 + step;
          roundToZeroSpriteRotation(lower, 0.2);
        }

      },
      callstack: []
    };


    if (!upper.nextMotion || (upper.nextMotion.id !== motion.id)) {
      console.log('applying motion');
      upper.nextMotion = motion;
    }

    upper.nextMotion.timer += 1;

    upper.nextMotion.call();

  }



};



//Only limited number of motions happen live in-game
var LiveMotions = {

  Humanoid: {

    ShootOneHanded: function(a1, weapon, offset) {


    },

    ThrowOneHanded: function(a1, weapon, offset) {


    }

  },

  Neckhead: {

    //args: head 1, head2, speed
    OpenJaw: function(h1, h2, speed) {


    }

  }

};


//these motions will be captured or partially captured
var CaptureMotions = {

  Beetle: {

    SixWayWalk: function(l1, l2, l3, l4, l5, l6, speed) {


    }

  },

  Humanoid: {

    TwoWayWalk: function(l1, l2, speed) {


    },

    TwoWaySpeedWalkToRun: function(l1, l2, speed) {


    },

    TwoWayRun: function(l1, l2, speed) {


    }

  },


  Quadroped: {

    StandThere: function(l1, l2) {


    },

    FourWaySpeedToRun: function(l1, l2, speed) {


    },

    FourWayRun: function(l1, l2, speed) {


    },

    //args: head 1, head2, speed
    OpenJawAimStraight: function(h1, h2, speed) {


    },

    OpenJawAtAngle: function(h1, h2, speed, angle) {


    }

  },

  Worm: {

    //args: head 1, head2, speed
    CrawlAll: function(segments = [], distPerWidth, speed) {


    },

    //arg: totalBackend: the last x number of segments will just follow
    CrawlBackend: function(segments = [], totalBackend, distPerWidth, speed) {


    }

  },


};


var FormationApi = function(Controller, init) {

  this.init = false;

  this.movements = [];

  this.Controller = Controller;

  this.options = undefined;

  this.folders = [];

  init.bind(this).call();

  this.main = function() {

    this.Controller.update();

  };

  var $api = this;

  this.eachByType = function(object, type, callback) {

    for (var x in object) {

      if (object[x].constructor.name == type) {
        callback(object[x]);
      } else if (typeof object[x] == 'object') {

        $api.eachByType(object[x], type, callback);

      }


    }


  };

  this.setGameWindow = function(gameWindow) {

    gameWindow.get_center = function() {
      return new Gamelab.Vector(this.canvas.width / 2, this.canvas.height * 0.75)
    }

    $api.eachByType(Controller.spriteStructure, 'Sprite', function(sprite) {

      gameWindow.add(sprite);

    });

    gameWindow.onUpdate(function() {


      $api.Controller.update();


    });

  };

  this.setGameWindow(Controller.gameWindow);

  this.toggle = function(on, gameWindow) {

    this.setGameWindow(gameWindow);

    //if 1st argument not-undefined then apply 1st argument, otherwise toggle
    this.Controller.on = on == 'undefined' ? !this.Controller.on : on;


      if (!this.Controller.on) {

      } else {

        alert('calling ready');

        Controller.ready(gameWindow);
      }


    this.init = true;

  };


};
