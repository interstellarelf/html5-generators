'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO: list the fxns needed for arrays only

var arrays = {};
; //Simplified expressions for setTimeout and setInterval
var delay = function delay(fxn, timing) {
  setTimeout(fxn, timing);
};

var repeat = function repeat(fxn, timing) {
  setInterval(fxn, timing);
};
;var clog = function clog(a, b, c) {
  console.log(a, b, c);
};

var dlog = function dlog() {
  if (Gamelab.config.DEV) console.log(a, b, c);
};
;
//TODO: list the fxns needed for numbers only

var numbers = {

  getMinAndMaxByPair: function getMinAndMaxByPair(a, b) {

    if (!(a || b)) return console.error('null or undefined args');

    if (typeof a == 'number' && !b) return { min: a, max: a };else if (a >= b) {
      return {
        min: b, max: a
      };
    } else {
      return {
        min: a, max: b
      };
    }
  }

};
;var TypeCode = {

  DEV: false,

  //Display message in console
  info: function info(arg1, arg2) {

    if (!this.DEV) return;

    console.info(arg1, arg2);
  },

  log: function log(arg1, arg2) {

    if (!this.DEV) return;

    console.log(arg1, arg2);
  },

  /* ERRORS always show */
  error: function error(arg1, arg2) {

    if (!this.DEV) return;

    console.error(arg1, arg2);
  },

  warn: function warn(arg1, arg2) {

    if (!this.DEV) return;

    console.error(arg1, arg2);
  },

  //obj is number or becomes fallback
  number: function number(_number) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


    _number = typeof _number == 'number' ? _number : fallback;
  },

  //obj is string or becomes fallback
  string: function string(_string, fallback) {

    _string = typeof _string == 'string' ? _string : fallback;
  },

  //obj is Array or becomes wrapped in [] as [obj]
  arrayWrap: function arrayWrap(obj) {
    if (obj instanceof Array) return obj;else return [obj];
  },

  //obj or array-of-objects are ALL truthy (return=true) or not (return=false)
  allDefined: function allDefined(obj_all) {

    var list = this.arrayWrap(obj_all);

    var failed = false;

    for (var x in list) {
      if (!list[x]) {
        failed = true;
        console.error('Failed to define @ TypeCode.Define()');
      }
    };

    return !failed;
  },

  //getPreferredPropertyByKey(): uses the property[key] if present, if not returns same property passed in
  getPreferredPropertyByKey: function getPreferredPropertyByKey(property, key, warning) {

    if (property.hasOwnProperty(key)) {
      this.warn(warning);
      return property[key];
    } else {
      return property;
    }
  },

  //obj's are all of type or return false
  psuedoTypeCheck: function psuedoTypeCheck(obj) //obj is type or is encapsulated into type
  {
    var psuedotype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var throwing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var list = this.arrayWrap(obj);

    for (var x in list) {
      if (_typeof(list[x]) !== psuedotype && !(list[x] instanceof psuedotype)) {
        if (!throwing) return console.error(error);else throw new console.error(error);
      }
    }

    return true;
  },

  getAllFuncs: function getAllFuncs(obj) {

    return Object.getOwnPropertyNames(obj).filter(function (p) {
      return typeof obj[p] === 'function';
    });
  },

  getProtoFuncs: function getProtoFuncs(obj) {

    return Object.getOwnPropertyNames(obj.__proto__).filter(function (p) {
      return typeof obj[p] === 'function';
    });
  },

  truthOrDie: function truthOrDie(list, exitMessage) //All members of Array are truthy or the program exits with Error()
  {
    function findError(obj, error) {
      return obj || new Error(error);
    };

    for (var x in list) {

      var e = findError(list[x], exitMessage);

      if (e instanceof Error) {
        console.Error(e);
      }
    };
  },

  truthyPropsPerArray: function truthyPropsPerArray(obj, propKeys, kill) {

    var list = this.arrayWrap(obj),
        keys = this.arrayWrap(propKeys);

    var error = "The required truthy property has non-truthy value.";

    function findError(obj, prop) {
      return obj[prop] || new Error(error);
    };

    var failed = false;

    for (var x in list) {
      for (var y in keys) {
        var e = findError(list[x], keys[y]);
        if (e instanceof Error) {
          failed = true;
          if (kill) throw e;else console.error(e);
        }
      }
    }

    return !failed;
  },

  typeArgsExtract: function typeArgsExtract(obj, type) //obj is type or is each-converted into type
  {
    if (obj instanceof type) {
      return obj;
    } else {
      obj = [obj];
    }
    return obj;
  },

  typeOrHalt: function typeOrHalt(obj, type) //obj is type or error is thrown
  {
    if (obj instanceof type) {
      return obj;
    } else {
      throw new Error('object not of required type');
      console.info(obj);
      console.info(type + "?");
    }
    return obj;
  },

  typeOrError: function typeOrError(obj, type) //obj is type or error is logged, execution continues
  {
    if (obj instanceof type) {
      return obj;
    } else {
      console.log(new Error('object not of required type'));
      console.info(obj);
      console.info(type + "?");
    }
    return obj;
  },

  check: function check(object, propKey, propValue) {
    if (!object[propKey]) {
      object[propKey] = propValue;
    }
  }
};
; /**@author
  Jordan Blake
  * */

/**@copyright
 Copyright 2018
 **/

//Gamelab: the main module object:
var Gamelab_Module = function Gamelab_Module() {

  var module = {

    settings: {

      DEBUG: false,

      gui_mode: true,

      recursionCount: 0,

      errorLimit: 20
    },

    errors: 0,

    stopDraw: false,

    defSize: function defSize() {
      if (this.WIDTH == 0) {
        this.WIDTH = document.body.clientWidth;
      }

      if (this.HEIGHT == 0) {
        this.HEIGHT = document.body.clientHeight;
      }
    },


    /*
     *
     * A simple method to detect whether the user agent is mobile or tablet
     * -assumes that if not mobile or tablet then it must be a PC
     * isMobileOrTablet(){}
     **/

    isMobileOrTablet: function isMobileOrTablet() {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },

    /**
     * A very simple method to retrieve the name of the default videocard of the system
     * using webgl.
     *
     * @see https://stackoverflow.com/questions/49267764/how-to-get-the-video-card-driver-name-using-javascript-browser-side
     * @returns {Object}
     */
    getVideoCardInfo: function getVideoCardInfo() {
      var gl = document.createElement('canvas').getContext('webgl');

      if (!gl) {
        return {
          error: "no webgl"
        };
      }

      var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

      if (debugInfo) {
        return {
          vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
          renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        };
      }

      return {
        error: "no WEBGL_debug_renderer_info"
      };
    },

    isGameObject: function isGameObject(object) {
      object.type = object.constructor.name;
      return ['Sprite', 'BackgroundElement', 'BackgroundFill', 'Terrain', 'Animation', 'Frame', 'Line2D'].includes(object.type);
    },
    getGameWindow: function getGameWindow() {
      var ix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return this.game_windows[0];
    },


    WIDTH: 0,

    HEIGHT: 0,

    game_windows: [],

    gs_renderables: [],

    gs_events: [],

    spriteTypes: [],

    systemSpriteTypes: ['player', 'enemy', 'background', 'interactive', 'terrain', 'weapon', 'subsprite'],

    __gameWindowList: [],

    all: function all() {
      var all_objects = [];
      this.game_windows.forEach(function (item) {
        all_objects = all_objects.concat(item.drawables);
      });
      console.info('Gamelab.all():', all_objects);
      return all_objects;
    },

    init: function init() {

      this.testSquare = new Gamelab.Sprite();
    },

    onButton: function onButton() {
      var gpix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var callback = arguments[1];

      if (typeof gpix == 'function') {
        callback = gpix;
        gpix = 0;
      }
      new Gamelab.GamepadEvent().Gamepads([gpix]).Keys();
    },

    objectDestroyed: function objectDestroyed(obj) {
      var dead = true;

      for (var x in this.game_windows) {
        var gw = this.game_windows[x];

        for (var y in gw.objects) {
          if (gw.objects[y] === obj) dead = false;
        }
      }
      return dead;
    },
    getObjectById: function getObjectById(id) {
      for (var x = 0; x < this.all_objects.length; x++) {
        if (this.all_objects[x].id == id) {
          return this.all_objects[x];
        }
      }
    },


    interlog: function interlog(message, div) //recursive safe :: won't go crazy with recursive logs :: log message every x times this is called
    {
      this.recursionCount++;
      if (!isNaN(div) && this.settings.recursionCount % div == 0) {
        //   console.log('Interval Log:'+  message);
      }
    },

    create_id: function create_id() {
      var S4 = function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      };
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    },

    error: function error(quit, message) {

      if (quit) {
        throw new Error(message);
      } else {
        console.error('E!' + message);
      }
    },

    info: function info(m) {

      if (Gamelab.DEBUG) {
        console.info('Info:' + m);
      }
    },

    log: function log(m) {

      if (Gamelab.DEBUG) {
        console.log('Gamelab:' + m);
      }
    },

    initializers: [],

    addInitializer: function addInitializer(i) {

      this.initializers.push(i);
    },

    _gameWindow: {},

    setGameWindow: function setGameWindow(gameWindow) {
      this._gameWindow = gameWindow;
    },

    ExtendEvents: function ExtendEvents(extendedObject, extendedKey, extendor, extendorKey) {
      var evtLink = new GSEventLink(extendedObject, extendedKey, extendor, extendorKey);

      this.all_objects.push(new GSEventLink(extendedObject, extendedKey, extendor, extendorKey));

      var parent = extendedObject;

      // console.log(parent);

      if (parent) {
        console.log('Gamelab:EXTENDING EVENTS:' + extendedKey + ":" + extendorKey);

        if (parent.onRun) //Any extendable object has an onRun ... OR
          {
            parent.onRun(extendor, extendorKey);
          }
        if (parent.onComplete) //object has an onComplete
          {
            parent.onComplete(extendor, extendorKey);
          }
      }
    },

    assignAll: function assignAll(object, args, keys) {

      __gamelabInstance.each(keys, function (ix, item) {

        object[ix] = args[ix];
      });
    },

    loadSprites: function loadSprites(sprites, callback) {

      var LEN = sprites.length,
          COUNT = 0;

      if (sprites instanceof Array) {
        sprites.forEach(function (spr) {

          spr.onLoad(function () {

            COUNT += 1;

            if (COUNT >= LEN) {
              callback(sprites);
            }
          });
        });
      } else if ((typeof sprites === 'undefined' ? 'undefined' : _typeof(sprites)) == 'object') {
        LEN = Object.keys(sprites).length;

        for (var x in sprites) {
          var spr = sprites[x];
          if (spr.constructor.name == 'Sprite' || spr.constructor.name == 'BoneSprite' || spr.constructor.name == 'SpriteGroup' || spr.constructor.name == 'Animation') {
            spr.onLoad(function () {

              COUNT += 1;

              if (COUNT >= LEN) {
                callback(sprites);
              }
            });
          }
        }
      }
    },

    each: function each(list, onResult, onComplete) {
      for (var i in list) {
        onResult(i, list[i]);
      }

      if (typeof onComplete === 'function') {
        onComplete(false, list);
      };
    },

    ready_callstack: [],

    ready: function ready(callback) {

      this.ready_callstack.push(callback);
    },
    reload: function reload() {

      this.callReady();
    },

    callReady: function callReady() {

      var funx = this.ready_callstack;

      var gameWindow = this.game_windows[0],
          module = this;

      //call every function in the ready_callstack

      this.each(funx, function (ix, call) {

        call(module, gameWindow);
      });

      this.InputSystem.init();

      this.__running = true;
    },

    getArg: function getArg(args, keys, fallback) {

      if (typeof keys == 'string') {
        keys = [keys]; //always array
      }
      for (var x = 0; x < keys.length; x++) {
        var k = keys[x];

        if (args && args.hasOwnProperty(k)) {
          return args[k]; //return first argument match
        }
      }
      return fallback;
    },

    normalArgs: function normalArgs(args) {

      var a = {};

      function normal(str) {
        return str.toLowerCase().replace('-', '').replace(' ', '').replace('_', '');
      };

      for (var x in args) {
        a[normal(x)] = args[x];
      }

      return a;
    },

    isNormalStringMatch: function isNormalStringMatch(str1, str2) {

      return str1.toLowerCase().replace(' ', '') == str2.toLowerCase().replace(' ', '');
    },

    instance_type_pairs: function instance_type_pairs() {

      //get an array of all instance/type pairs added to the library

      //example : [ {constructor_name:Sprite, type:enemy_basic}, {constructor_name:Animation, type:enemy_attack}  ];

      var objectList = [];

      this.each(this.all_objects, function (ix, item) {

        objectList.push({
          constructor_name: item.constructor.name,
          type: item.type
        });
      });

      return objectList;
    },

    getById: function getById(id) {

      for (var x in this.all_objects) {
        if (this.all_objects[x].id == id) {
          return this.all_objects[x];
        }
      }
    },

    select: function select(constructor_name, name, group /*ignoring spaces and CAPS/CASE on type match*/) {

      var query = [];

      var __inst = this;

      this.each(Gamelab.all(), function (ix, item) {

        if (constructor_name == '*' || item.constructor.name == constructor_name) {

          if (group == '*' || __inst.isNormalStringMatch(group, item.group)) {

            if (name == '*' || __inst.isNormalStringMatch(name, item.name)) {

              query.push(item);
            }
          }
        }
      });

      return query;
    }
  };

  return module;
};

var GamelabApi = {
  get: function get() {},

  post: function post(object) {
    //TODO decycle the object before saving

    if (!object.id) {
      object.id = Gamelab.create_id();
    }

    var name = object.name,
        type = object.constructor.name,
        contents = jstr(object),
        id = object.id;
  }

};

var GSO //Gamelab-Overrideable
= function () {
  function GSO() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GSO);

    this.run_ext = args.run_ext || [];

    this.complete_ext = args.complete_ext || [];
  }

  /*****
   * Overridable / Extendable functions
   * -allows stacking of external object-function calls
   ******/

  _createClass(GSO, [{
    key: 'onRun',
    value: function onRun(caller, callkey) {
      this.run_ext = this.run_ext || [];

      if (this.run_ext.indexOf(caller[callkey]) == -1) {
        this.run_ext.push({
          caller: caller,
          callkey: callkey
        });
      }
    }
  }, {
    key: 'onComplete',
    value: function onComplete(caller, callkey) {
      this.complete_ext = this.complete_ext || [];

      if (this.complete_ext.indexOf(caller[callkey]) == -1) {
        this.complete_ext.push({
          caller: caller,
          callkey: callkey
        });
      }
    }
  }, {
    key: 'call_on_run',
    value: function call_on_run() {
      //call any function extension that is present
      for (var x = 0; x < this.run_ext.length; x++) {
        this.run_ext[x].caller[this.run_ext[x].callkey]();
      }
    }
  }, {
    key: 'call_on_complete',
    value: function call_on_complete() {
      //call any function extension that is present
      for (var x = 0; x < this.complete_ext.length; x++) {
        this.complete_ext[x].caller[this.complete_ext[x].callkey]();
      }
    }
  }]);

  return GSO;
}();

var Gamelab = Gamelab_Module();

Gamelab.DEV = true;

if (typeof module !== 'undefined' && module.exports) {

  //This library is being instaniated via require() aka node.js require or similar library loader
  module.exports = Gamelab;
} else {}

/***************
 * TODO : fix the above duplicate references, which exist now for backward compatibility with previouslyh authored code
 *  -apply find and replace accross the codebase
 * ****************/

/********
 * jstr() : public function for stringifying objects and arrays (uses pretty print style)
 * *********/

function jstr(obj) {

  return JSON.stringify(obj);
};

Gamelab.jstr = jstr;

/**********
 * $Q : Selector Function
 *  -allows string-based-selection of game-objects.
 * **********/

function $Q(selector, gameWindow) {

  //declare events:

  console.log(selector);

  var query = [];

  //handle selector / selection of objects:

  if (typeof selector !== 'string') {

    if (selector instanceof Array) {} else {}
  } else {

    if (selector && selector !== '*') {

      var s = selector || '';

      console.info('selector:' + s);

      var mainSelector = $Q.before('[', s).trim(),
          msfChar = mainSelector.substring(0, 1);

      var __targetClassName = "*";

      var output = [];

      var cleanSelectorString = function cleanSelectorString(str) {
        return str.replace(",", "");
      };

      switch (msfChar.toLowerCase()) {
        case ".":

          console.info('Selecting by "." or class');

          __targetClassName = cleanSelectorString($Q.after('.', mainSelector));

          console.info('Target class is:' + __targetClassName);

          break;

        case "*":

          console.info('Selecting by "*" or ANY object in the library instance');

          __targetClassName = "*";

          break;

      }

      var criterion = $Q.between('[', ']', s),
          cparts = criterion.split('=');

      var __targetGroup = "*",
          __targetName = "*";

      var getParts = function getParts() {

        if (cparts.length >= 2) {

          switch (cparts[0].toLowerCase()) {

            case "name":

              //get all objects according to name=name

              console.log('Q():Detected parts in selector:' + jstr(cparts));

              __targetName = cleanSelectorString(cparts[1]);

              break;

            case "group":

              console.log('Q():Detected parts in selector:' + jstr(cparts));

              __targetGroup = cleanSelectorString(cparts[1]);

              break;

          }
        }

        if (cparts.length >= 4) {

          cparts[2] = cparts[2].replace(",", "");

          switch (cparts[2].toLowerCase()) {

            case "name":

              //get all objects according to name=name

              console.log('Q():Detected parts in selector:' + jstr(cparts));

              __targetName = cleanSelectorString(cparts[3]);

              break;

            case "group":

              console.log('Q():Detected parts in selector:' + jstr(cparts));

              __targetGroup = cleanSelectorString(cparts[3]);

              break;

          }
        }
      };

      getParts(cparts);

      query = Gamelab.select(__targetClassName, __targetName, __targetGroup);
    } else if (selector == '*') {

      query = Gamelab.all();
    }
  }

  query.each = function (callback) {

    var objects = [];

    for (var x = 0; x < this.length; x++) {
      if (typeof x == 'number') {

        callback(x, this[x]);
      }
    }
  };

  query.on = function (evt_key, selectorObject, controller_ix, callback) //handle each event such as on('collide') OR on('stick_left_0') << first controller stick_left
  {

    if (typeof evt_key == 'function' && typeof selectorObject == 'function') {
      //this is a special pattern of if(f() == true){ runFunction(); };

      var boolTrigger = evt_key,
          boolCall = selectorObject,
          boolEvent = new Gamelab.BoolEvent().On(boolTrigger).Call(boolCall);
    }

    var criterion = $Q.between('[', ']', evt_key);

    if (criterion.indexOf('===') >= 0) {
      criterion = criterion.replace('===', '=');
    }

    if (criterion.indexOf('==') >= 0) {
      criterion = criterion.replace('==', '=').replace('==', 0);
    }

    var cparts = criterion.split('=');

    var __targetGroup = "*",
        __targetName = "*";

    if (evt_key.indexOf('[') >= 0) {
      evt_key = $Q.before('[', evt_key).trim();
    }

    var padding = 0;

    //if controller_ix is function, and callback not present, then controller_ix is the callback aka optional argument

    if (controller_ix && typeof controller_ix == 'function' && !callback) {
      callback = controller_ix;
      controller_ix = 0;
    }

    //optional argument: if controller_ix is function, and callback not present, then callback is selectorObject

    if (selectorObject && typeof selectorObject == 'function' && !callback) {

      callback = selectorObject;

      selectorObject = $Q('*');

      controller_ix = 0;
    };

    var evt_profile = {};

    //which controller?

    evt_profile.cix = controller_ix;

    //Need the control key: 'left_stick', 'button_0', etc..

    evt_profile.evt_key = evt_key;

    if ($Q.contains_any(['stick', 'button', 'click', 'key'], evt_profile.evt_key)) {

      var button_mode = evt_profile.evt_key.indexOf('button') >= 0;

      Gamelab.GamepadAdapter.on(evt_profile.evt_key, 0, function (x, y) {

        callback(x, y);
      });

      console.info('detected input event key in:' + evt_profile.evt_key);

      console.info('TODO: rig events');
    }

    //TODO: test collision events:
    else if ($Q.contains_any(['collide', 'collision', 'hit', 'touch'], evt_profile.evt_key)) {

        //   console.info('Rigging a collision event');

        //   console.info('detected collision event key in:' + evt_profile.evt_key);

        //  console.info('TODO: rig collision events');

        this.each(function (ix, item1) {

          // console.info('Collision Processing 1:' + item1.name);
          //  console.info('Collision Processing 1:' + item1.type);

          selectorObject.each(function (iy, item2) {

            //    console.info('Collision Processing 2:' + item2.name);
            //   console.info('Collision Processing 2:' + item2.type);

            if (typeof item1.onUpdate == 'function') {

              var update = function update(sprite) {

                console.log('Box collide::' + jstr([this, item2]));

                if (Gamelab.Collision.spriteBoxCollide(this, item2, gameWindow)) {

                  callback(this, item2);
                };
              };

              item1.onUpdate(update);
            }
          });
        });
      } else {
        console.info('Rigging a property event');

        //TODO: test property-watch events:

        console.info('detected property threshhold event key in:' + evt_profile.evt_key);

        console.info('TODO: rig property events');

        var condition = "_",
            key = criterion || evt_profile.evt_key;

        if (key.indexOf('[') >= 0 || key.indexOf(']') >= 0) {
          key = $Q.between('[', ']', key);
        }

        var evt_parts = [];

        var run = function run() {
          console.error('Sprite property check was not set correctly');
        };

        if (key.indexOf('>=') >= 0) {
          condition = ">=";
        } else if (key.indexOf('<=') >= 0) {
          condition = "<=";
        } else if (key.indexOf('>') >= 0) {
          condition = ">";
        } else if (key.indexOf('<') >= 0) {
          condition = "<";
        } else if (key.indexOf('=') >= 0) {
          condition = "=";
        }

        evt_parts = key.split(condition);

        for (var x = 0; x < evt_parts.length; x++) {
          evt_parts[x] = evt_parts[x].replace('=', '').replace('=', '').trim(); //remove any trailing equals and trim()
        }

        var mykey, number;

        // alert(evt_parts[0]);

        try {

          mykey = evt_parts[0];

          number = parseFloat(evt_parts[1]);
        } catch (e) {
          console.log(e);
        }

        console.info('Gamelab:Processing condition with:' + condition);

        switch (condition) {

          case ">=":

            run = function run(obj, key) {
              if (obj[key] >= number) {
                callback();
              }
            };

            break;

          case "<=":

            run = function run(obj, key) {
              if (obj[key] <= number) {
                callback();
              }
            };

            break;

          case ">":

            run = function run(obj, key) {
              if (obj[key] > number) {
                callback();
              }
            };

            break;

          case "<":

            run = function run(obj, key) {
              if (obj[key] < number) {
                callback();
              }
            };

            break;

          case "=":

            run = function run(obj, key) {
              if (obj[key] == number) {
                callback();
              }
            };

            break;

        }

        /************
         * Attach update to each member
         *
         * **************/

        var keys = mykey.split('.'),
            propkey = "";

        this.each(function (ix, item) {

          var object = {};

          if (keys.length == 1) {
            object = item;

            propkey = mykey;
          } else if (keys.length == 2) {
            object = item[keys[0]];

            propkey = keys[1];
          } else if (keys.length == 3) {
            object = item[keys[0]][keys[1]];

            propkey = keys[2];
          } else {
            console.error(":length of '.' notation out of range. We use max length of 3 or prop.prop.key.");
          }

          if (typeof item.onUpdate == 'function') {

            var spr = item;

            item.onUpdate(function (sprite) {

              run(object, propkey);
            });
          }
        });
      }
  };

  return query;
}

$Q.each = function (obj, callback, complete) {

  for (var x in obj) {
    callback(obj);
  }

  if (typeof complete == 'function') {
    complete(obj);
  }
};

$Q.before = function (c1, test_str) {
  var start_pos = 0;
  var end_pos = test_str.indexOf(c1, start_pos);
  return test_str.substring(start_pos, end_pos);
};

$Q.contains = function (c1, test_str) {
  return test_str.indexOf(c1) >= 0;
};

$Q.contains_all = function (cList, test_str) {
  for (var x = 0; x < cList.length; x++) {
    if (test_str.indexOf(cList[x]) < 0) {
      return false;
    }
  }

  return true;
};

$Q.contains_any = function (cList, test_str) {

  for (var x = 0; x < cList.length; x++) {
    if (test_str.indexOf(cList[x]) >= 0) {
      return true;
    }
  }

  return false;
};

$Q.after = function (c1, test_str) {
  var start_pos = test_str.indexOf(c1) + 1;
  var end_pos = test_str.length;
  return test_str.substring(start_pos, end_pos);
};

$Q.between = function (c1, c2, test_str) {
  var start_pos = test_str.indexOf(c1) + 1;
  var end_pos = test_str.indexOf(c2, start_pos);
  return test_str.substring(start_pos, end_pos);
};

/****************************************
 *  Developer's own test-function:
 *      -Q.test_selector_method():
 * ***************************************/

$Q.test_selector_method = function () {
  //leftover method of hand-testing
  var Q_TestStrings = ['*', '.Sprite', '*[group="enemy_type_0"]', '.Sprite[group="enemy_type_0"]'];

  for (var x = 0; x < Q_TestStrings.length; x++) {
    var test = Q_TestStrings[x];

    console.info('testing:' + test);

    $Q(test);
  }

  console.log('Testing stick left');

  this.on('stick_left_0');

  console.log('Testing button');

  this.on('button_0');

  console.log('Testing collide');

  this.on('collide');

  console.log('Testing button');

  this.on('collide');

  console.log('Testing prop');

  this.on('health>=0');
};

Gamelab.$Q = $Q;

Gamelab.query = $Q;

/********************
 * Gamelab.InputSystem
 * Various Keyboard + mouse Input Events
 ********************/

Gamelab.InputSystem = {

  //PC input events

  Mouse: {
    Position: {
      x: 0,
      y: 0
    },
    Speed: {
      x: 0,
      y: 0
    },
    setPosition: function setPosition(x, y) {

      this.Speed.x = x - this.Position.x;

      this.Speed.y = y - this.Position.y;

      this.Position.x = x;

      this.Position.y = y;
    },

    isIdle: function isIdle() {
      return this.speed.x == 0 && this.speed.y == 0;
    }
  },

  events: {

    mousemove: [],
    mousepos: [],
    leftclick: [],
    rightclick: [],
    middleclick: [],
    wheelup: [],
    wheelDown: []
  },

  keymap: {},

  keyReplace: function keyReplace(str) {
    return str.toLowerCase().replace('space', ' ').replace('left', String.fromCharCode(37)).replace('left', String.fromCharCode(37)).replace('up', String.fromCharCode(38)).replace('right', String.fromCharCode(39)).replace('down', String.fromCharCode(40));
  },

  extendKey: function extendKey(evt_key, callback, onFinish) {

    evt_key = this.keyReplace(evt_key);

    Gamelab.InputSystem.keymap[evt_key] = {

      down: false,

      callback: function (_callback) {
        function callback() {
          return _callback.apply(this, arguments);
        }

        callback.toString = function () {
          return _callback.toString();
        };

        return callback;
      }(function () {
        callback(evt_key);
      })
    };

    return Gamelab.InputSystem.keymap[evt_key];
  },

  extend: function extend(evt_key, downCall, upCall, onFinish) {

    evt_key = evt_key.toLowerCase();

    //each event-group has object-type
    Gamelab.InputSystem.events[evt_key] = Gamelab.InputSystem.events[evt_key] || [];

    Gamelab.InputSystem.events[evt_key].push({

      down: downCall,

      up: upCall

    });
  },

  init: function init() {

    var MOUSE = this.Mouse;

    window.setInterval(function () {

      Gamelab.each(Gamelab.InputSystem.keymap, function (im, kmapItem) {

        if (kmapItem.down == true) {

          kmapItem.callback();
        }
      });
    }, 10);

    document.onkeydown = document.onkeyup = function (e) {

      e = e || event; // to deal with IE

      var gs_key_string = 'key_' + String.fromCharCode(e.keyCode),
          evt_object = Gamelab.InputSystem['keymap'][gs_key_string] || Gamelab.InputSystem['keymap'][gs_key_string.toLowerCase()];

      if (e.keyCode == 32) {
        gs_key_string = 'key_space';
      }

      if (e.keyCode == 18) {
        gs_key_string = 'key_alt';
      }

      if (e.keyCode == 9) {
        gs_key_string = 'key_tab';
      }

      if (e.keyCode == 16) {
        gs_key_string = 'key_shift';
      }

      if (evt_object) {
        evt_object.down = e.type == 'keydown';
      }
    };

    var canvases = document.querySelectorAll('canvas.gamewindow');

    function getMousePos(e, c) {

      var x;
      var y;
      if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      x -= c.offsetLeft;
      y -= c.style.top;
      return {
        x: x,
        y: y
      };
    }

    var InputSystem = Gamelab.InputSystem;

    function mouseMoving(event, c) {

      var pos = getMousePos(event, c);

      MOUSE.setPosition(pos.x, pos.y);

      if (InputSystem.events['mousemove']) {
        Gamelab.each(InputSystem.events['mousemove'], function (ix, el) {

          el.down(pos.x, pos.y);
        });
      }
    };

    //Interval for mouse-idle time : run mouse move again with same position, no difference
    setInterval(function () {

      if (InputSystem.events['mousepos']) {

        var pos = MOUSE.Position;

        Gamelab.each(InputSystem.events['mousepos'], function (ix, el) {

          el.down(pos.x, pos.y);
        });
      }
    }, 10);

    for (var x = 0; x < canvases.length; x++) {
      var applyMouseMove = function applyMouseMove(e) {
        mouseMoving(e, c);
      };

      var c = canvases[x];

      console.info('Gamelab-lib-code:main.js: InputSystem applying mousemove');

      document.addEventListener("mousemove", applyMouseMove);

      c.onmousedown = function (e) {
        //    alert(JSON.stringify(Gamelab.InputSystem, true, 2));

        var value = e.which;
        var pos = getMousePos(e, c);
        var InputSystem = Gamelab.InputSystem;

        e.preventDefault();

        switch (e.which) {
          case 1:

            for (var x in InputSystem.events) {

              if (InputSystem.events[x] instanceof Array && x == 'leftclick') {

                Gamelab.each(InputSystem.events[x], function (ix, el) {

                  el.down(pos.x, pos.y);
                });
              }
            }

            break;
          case 2:
            // alert('Middle Mouse button pressed.');

            for (var x in Gamelab.InputSystem.events) {

              if (InputSystem.events[x] instanceof Array && x == 'middleclick') {

                Gamelab.each(InputSystem.events[x], function (ix, el) {

                  el.down(pos.x, pos.y);
                });
              }
            }
            break;
          case 3:
            //  alert('Right Mouse button pressed.');


            for (var x in Gamelab.InputSystem.events) {

              if (InputSystem.events[x] instanceof Array && x == 'rightclick') {

                Gamelab.each(InputSystem.events[x], function (ix, el) {

                  el.down(pos.x, pos.y);
                });

                return false;
              }
            }

            break;
          default:

            return 0;
          //alert('You have a strange Mouse!');

        }

        e.preventDefault();
        return 0;
      };

      c.onmouseup = function (e) {

        //    alert(JSON.stringify(Gamelab.InputSystem, true, 2));

        var value = e.which;
        var pos = getMousePos(e, c);
        var InputSystem = Gamelab.InputSystem;

        e.preventDefault();

        switch (e.which) {
          case 1:

            for (var x in InputSystem.events) {

              if (InputSystem.events[x] instanceof Array && x == 'leftclick') {

                Gamelab.each(InputSystem.events[x], function (ix, el) {

                  el.up(pos.x, pos.y);
                });
              }
            }

            break;
          case 2:
            // alert('Middle Mouse button pressed.');


            for (var x in Gamelab.InputSystem.events) {

              if (InputSystem.events[x] instanceof Array && x == 'middleclick') {

                Gamelab.each(InputSystem.events[x], function (ix, el) {

                  el.up(pos.x, pos.y);
                });
              }
            }
            break;
          case 3:
            //  alert('Right Mouse button pressed.');


            for (var x in Gamelab.InputSystem.events) {

              if (InputSystem.events[x] instanceof Array && x == 'rightclick') {

                Gamelab.each(InputSystem.events[x], function (ix, el) {

                  el.up(pos.x, pos.y);
                });

                return false;
              }
            }

            break;
          default:

            return 0;
          //alert('You have a strange Mouse!');

        }
      };
    }
  }

};

//Override the existing window.onload function

document.addEventListener('DOMContentLoaded', function () {

  Gamelab.callReady();
});

Gamelab.file_system = {

  localizedSource: function localizedSource(src, hostUrl) {

    hostUrl = hostUrl || "../";

    var gs_folder_ix = src.indexOf('assets/game');

    return hostUrl + src.substring(gs_folder_ix, src.length);
  },

  loadJSON: function loadJSON(filepath, callback) {

    function readTextFile(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            callback(rawFile.responseText);
          }
        }
      };
      rawFile.send(null);
    };

    readTextFile('file:///' + filepath, callback);
  },

  loadLevel: function loadLevel(jsonText, gw, callback) {

    var data = JSON.parse(jsonText);

    if (typeof gw == 'function' || !gw) {
      callback = gw || callback || function () {};

      gw = Gamelab.game_windows[0];
    }

    $.each(data.sprites, function (ix, xitem) {

      if (typeof xitem.src == 'string') {

        xitem.src = Gamelab.file_system.localizedSource(xitem.src);
      }

      __gamelabInstance.each(xitem, function (iy, yitem) {

        if (yitem.src) {

          yitem.src = Gamelab.file_system.localizedSource(yitem.src);
        }

        __gamelabInstance.each(yitem, function (iz, zitem) {

          if (zitem.src) {
            zitem.src = Gamelab.file_system.localizedSource(zitem.src);
          }
        });
      });

      xitem = new Gamelab.Sprite(xitem);

      gw.add(xitem);
      //sprite.image = sprite.selected_animation.image;


      if (ix >= data.sprites.length - 1) {

        //last sprite is loaded //WHY DOESN't this work?

        callback(false, data);
      }
    });
  },

  loadJSONLevel: function loadJSONLevel(filepath, gw, callback) {

    if (typeof gw == 'function' || !gw) {
      callback = gw || callback || function () {};

      gw = Gamelab.game_windows[0];
    }

    this.loadJSON(filepath, function (data) {

      //localize .src up to three levels of recursion (.src must be altered to refer locally)

      $.each(data.sprites, function (ix, xitem) {

        if (typeof xitem.src == 'string') {

          xitem.src = Gamelab.file_system.localizedSource(xitem.src);
        }

        __gamelabInstance.each(xitem, function (iy, yitem) {

          if (yitem.src) {

            yitem.src = Gamelab.file_system.localizedSource(yitem.src);
          }

          __gamelabInstance.each(yitem, function (iz, zitem) {

            if (zitem.src) {
              zitem.src = Gamelab.file_system.localizedSource(zitem.src);
            }
          });
        });

        xitem = new Gamelab.Sprite(xitem);

        gw.add(xitem);
        //sprite.image = sprite.selected_animation.image;


        if (ix >= data.sprites.length - 1) {

          //last sprite is loaded //WHY DOESN't this work?

          callback(false, data);
        }
      });
    });
  }

};

//reference loadJSON direct from Gamelab::
Gamelab.loadJSON = Gamelab.file_system.loadJSON;
//reference loadJSON as loadJson::
Gamelab.file_system.loadJson = Gamelab.file_system.loadJSON;
Gamelab.loadJson = Gamelab.loadJSON;

Gamelab.ready(function (lib) {

  Gamelab.log('Gamelab: library is ready');
});

/* Screen */

var Screen = {

  size: function size() {
    return new Gamelab.Vector(Gamelab.WIDTH, Gamelab.HEIGHT);
  },

  center: function center() {
    return new Gamelab.Vector(Gamelab.WIDTH / 2, Gamelab.HEIGHT / 2).round();
  }

};
;

Gamelab.config = Gamelab.config || {
  DEV: true,
  maxErrors: 50
};
; /**************************
   EventInterfaceMap: StringKeys:

     * (must implement without option)
     @ (may implement optional)
  *****************************/

var EventInterfaceMap = { //className / must have named functions whyen carrying Symbol of className

  Sprite: ['@onUpdate', '@onDestroy'],

  Animation: ['@onRun', '@onComplete', '*onCollide'],

  Motion: ['@onCommit', '@onComplete', '*onCollide'],

  Shot: ['@onShoot', '*onCollide', '*onCollide'],

  Terrain: ['@onCollide'],

  Interactive: ['@onCollide'],

  Global: ['@onUpdate'],

  check: function check(instance) {
    for (var x in this) {
      if (x == 'check') continue;else {
        if (this[x] instanceof Array) {
          this[x].forEach(function (f) {
            var fkey = f.replace('@', '');
            if (!instance.getOwnPropertyNames.indexOf(fkey) >= 0) throw new Error('Object must implement function by name of:' + fkey);
          });
        }
      }
    };
  }

  /**************************
    ObjectFeatureInterfaceMap:
        Indicates classNames, and what they must carry as functions
  *****************************/

};var ObjectFeatureMap = { //className / must have named function properties when carrying Symbol of className

  Sprite: ['@spatial', '@data'],

  SpriteGroup: ['@relative_spatial', '@data'],

  SpriteBrush: ['@spatial', '@data'],

  Frame: ['@spatial'],

  Particle: ['@spatial'],

  RectangularLine: ['@spatial'],

  Circle: ['@spatial'],

  GridAnimation: ['@anchored', '@framedriven', '@effectdriven', '@data'],

  Line2d: ['@spatial', '@pointarrayflippable', '@selftransposable', '@data'],

  Text: ['@spatial', '@text', '@colored']

};

Gamelab.ObjectFeatureMap = ObjectFeatureMap;

var InputIFM = {

  GamepadButtons: ['@onButton'],

  GamepadSticks: ['@onStick'],

  Keyboard: ['@onKey'],

  MouseMove: ['@onMouseMove'],

  MouseButton: ['@onMouseButton'],

  MouseWheel: ['@onMouseWheel'],

  LeapMotion: ['@onLeapMotion']

};

var UIEditables = {

  Sprite: ['size', 'position', 'rotation'],

  Animation: ['frameBounds', 'etc']

};

var UIOption = function UIOption(name, hint, script) {
  return {
    name: name,
    hint: hint,
    script: script
  };
};

var UIPrefab = {

  MainSelect: {
    Interactive: {

      name: 'FourwayClasticRect',

      hint: 'Object is collideable on four rectangular sides',

      script: '#MY-SCRIPT-PATH'
    }
  },

  FormEditables: {

    Interactive: []
  }
};

var UIPrefabMainSelect = {

  Background: ['Bound']

};

var getCustomPrefabMeta = function getCustomPrefabMeta() {//get name and file/data resources for each custom prefab

};

/**********************************

  UIObjectSelectMap:

    -Just the system default options

*********************************/

var UIObjectPrefabs = {

  Sprite: ['Side-Scroll-Player', 'Collider', 'Spaceship', 'Robot']

};;
;(function () {

  /**
   * Creates a new Camera
   * @param {number} x=0 position-x
   * @param {number} y=0 position-y
   * @param {number} z=0 position-z
   * @returns {Camera}
   */

  var Camera = function () {
    function Camera(x, y, z) {
      _classCallCheck(this, Camera);

      if (isNaN(x)) {
        x = 0;
      }

      if (isNaN(y)) {
        y = 0;
      }

      if (isNaN(z)) {
        z = 0;
      }

      /**
       * @property {Vector} position the vector-position of Camera
       * @memberof Camera
       **********/

      this.position = new Gamelab.Vector(x, y, z);

      this.speed = new Gamelab.Vector(0, 0, 0);
    }

    _createClass(Camera, [{
      key: 'update',
      value: function update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
      }
    }]);

    return Camera;
  }();

  Gamelab.Camera = Camera;
})();
;
// Converts from degrees to radians.
Math.radians = function (degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
  return radians * 180 / Math.PI;
};

var Circle = function () {
  function Circle(radius) {
    _classCallCheck(this, Circle);

    this.radius = radius;
  }

  _createClass(Circle, [{
    key: 'Radius',
    value: function Radius(r) {
      this.radius = r;
      return this;
    }
  }, {
    key: 'getRandomCircumferencePoints',
    value: function getRandomCircumferencePoints(count) {
      if (isNaN(count)) return console.error('needs 1st argument of number --count');
      var points = [],
          radius = this.radius;
      while (count) {
        var pt_angle = Math.random() * 2 * Math.PI;
        var p = new Gamelab.Vector(Math.cos(pt_angle) * this.radius, Math.sin(pt_angle) * this.radius);
        p.r = pt_angle * 180 / Math.PI;
        points.push(p);
        count--;
      }
      return points;
    }
  }, {
    key: 'getRandomPoints',
    value: function getRandomPoints() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

      if (isNaN(count)) return console.error('needs 1st argument of number --count');
      var points = [],
          radius = this.radius;
      while (count) {
        var pt_angle = Math.random() * 2 * Math.PI;
        var pt_radius_sq = Math.random() * radius * radius;
        var x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
        var y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
        points.push(new Gamelab.Vector(x, y));
        count--;
      }
      return points;
    }
  }, {
    key: 'getCircumferencePoint',
    value: function getCircumferencePoint(r) {
      var pt_angle = Math.radians(r);
      var p = new Gamelab.Vector(Math.cos(pt_angle) * this.radius, Math.sin(pt_angle) * this.radius);
      return p;
    }
  }]);

  return Circle;
}();

Gamelab.Circle = Circle;
; //http://www.blackpawn.com/texts/pointinpoly/
function pointInTriangle(point, triangle) {
  //compute vectors & dot products
  var cx = point.x,
      cy = point.y,
      t0 = triangle[0],
      t1 = triangle[1],
      t2 = triangle[2],
      v0x = t2.x - t0.x,
      v0y = t2.y - t0.y,
      v1x = t1.x - t0.x,
      v1y = t1.y - t0.y,
      v2x = cx - t0.x,
      v2y = cy - t0.y,
      dot00 = v0x * v0x + v0y * v0y,
      dot01 = v0x * v1x + v0y * v1y,
      dot02 = v0x * v2x + v0y * v2y,
      dot11 = v1x * v1x + v1y * v1y,
      dot12 = v1x * v2x + v1y * v2y;

  // Compute barycentric coordinates
  var b = dot00 * dot11 - dot01 * dot01,
      inv = b === 0 ? 0 : 1 / b,
      u = (dot11 * dot02 - dot01 * dot12) * inv,
      v = (dot00 * dot12 - dot01 * dot02) * inv;
  return u >= 0 && v >= 0 && u + v < 1;
};

var Collision = {

  /*Collide straight boxes no-rotate*/
  boxCollide: function boxCollide(pos1, size1, pos2, size2) {
    return pos1.x >= pos2.x - size1.x && pos1.x <= pos2.x + size2.x && pos1.y >= pos2.y - size1.y && pos1.y <= pos2.y + size2.y;
  },


  //determine if point is inside box / allows rotation
  pointInBox: function pointInBox(point, box) {
    var triangles = Gamelab.Trig.getTrianglesByBox(box);
    box.collisionPoints = triangles;
    return pointInTriangle(point, triangles[0]) || pointInTriangle(point, triangles[1]);
  },


  /* Collide objects with NO-rotation */
  spriteMouseCollide: function spriteMouseCollide(obj1, obj2, gw) {

    gw = gw || Gamelab.game_windows[0];
    var scale = gw.scale || 1.0;
    if (gw.settings && gw.settings.hasOwnProperty(scale)) {
      scale = gw.settings.scale;
    }
    var camPos = new Gamelab.Vector(0, 0, 0);
    obj1.padding = obj1.padding || new Gamelab.Vector(0, 0, 0);

    var S = function S(value) {
      return value * scale;
    };

    var paddingX = Math.round(obj1.padding.x * S(obj1.size.x)),
        paddingY = Math.round(obj1.padding.y * S(obj1.size.y)),
        left = S(obj1.position.x) + paddingX + camPos.x,
        right = S(obj1.position.x) + S(obj1.size.x) - paddingX + camPos.x,
        top = S(obj1.position.y) + camPos.y + paddingY,
        bottom = S(obj1.position.y) + S(obj1.size.y) - paddingY + camPos.y;
    if (right > obj2.position.x && left < obj2.position.x + obj2.size.x && bottom > obj2.position.y && top < obj2.position.y + obj2.size.y) {
      return true;
    }
  },


  /* Collide Sprites NO-Rotation */
  spriteBoxCollide: function spriteBoxCollide(obj1, obj2, gw) {
    gw = gw || Gamelab.game_windows[0];
    var scale = gw.scale || 1.0;
    var camPos = new Gamelab.Vector(0, 0, 0);
    obj1.padding = obj1.padding || new Gamelab.Vector(0, 0, 0);

    var S = function S(value) {
      return value * scale;
    };

    var paddingX = Math.round(obj1.padding.x * S(obj1.size.x)),
        paddingY = Math.round(obj1.padding.y * S(obj1.size.y)),
        left = S(obj1.position.x) + paddingX + camPos.x,
        right = S(obj1.position.x) + S(obj1.size.x) - paddingX + camPos.x,
        top = S(obj1.position.y) + camPos.y + paddingY,
        bottom = S(obj1.position.y) + S(obj1.size.y) - paddingY + camPos.y;
    if (right > S(obj2.position.x) && left < S(obj2.position.x) + S(obj2.size.x) && bottom > S(obj2.position.y) && top < S(obj2.position.y) + S(obj2.size.y)) {
      return true;
    }
  },


  //takes 2 arrays, returns array (empy array means no-collision)
  spriteBoxCollideArray: function spriteBoxCollideArray(obj1, obj2, gw) {

    var collisions = [],
        spritesX = obj1 instanceof Array ? obj1 : [obj1],
        spritesY = obj2 instanceof Array ? obj2 : [obj2];

    for (var x = 0; x < spritesX.length; x++) {
      for (var y = 0; y < spritesY.length; y++) {
        if (this.spriteBoxCollide(spritesX[x], spritesY[y])) {
          collisions.push({
            object: spritesX[x],
            collider: spritesY[y]
          });
        }
      }
    }

    return collisions;
  },
  spriteCollideTop: function spriteCollideTop(obj1, obj2, gw) {
    gw = gw || Gamelab.game_windows[0];

    var camPos = new Gamelab.Vector(0, 0, 0);

    obj1.padding = obj1.padding || new Gamelab.Vector(0, 0, 0);

    var paddingX = Math.round(obj1.padding.x * obj1.size.x),
        paddingY = Math.round(obj1.padding.y * obj1.size.y),
        left = obj1.position.x + paddingX + camPos.x,
        right = obj1.position.x + obj1.size.x - paddingX + camPos.x,
        top = obj1.position.y + camPos.y + paddingY,
        bottom = obj1.position.y + obj1.size.y - paddingY + camPos.y;

    if (right > obj2.position.x && left < obj2.position.x + obj2.size.x && bottom > obj2.position.y && top < obj2.position.y + obj2.size.y) {
      return true;
    }
  },


  /*
   *
   *  ##Not known to be working -->> Below function
   *
   * */

  getSpatialGrid: function getSpatialGrid(sourceSprite) {
    var spatialDivider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5.0;

    if (sourceSprite.anime && sourceSprite.anime.getCurrentPixelMap) {
      var pixelGrid = sourceSprite.anime.getCurrentPixelMap(spatialDivider);
      return pixelGrid;
    } else {
      return [];
    }
  }
};

Gamelab.Collision = Collision;
;
//RGBColor:: Color object

var RGBColor = function () {
  function RGBColor() {
    var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, RGBColor);

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  //Create color from string (rgba-string or hex-string to RGBAColor{})


  _createClass(RGBColor, [{
    key: 'fromString',
    value: function fromString(str) {
      if (str.indexOf('#') >= 0) //color-string is hex-color-string
        {
          str = Gamelab.ColorCalc.hexToRgba(str);
        }

      str = str.replace(/^\s*#|\s*$/g, '');
      str = str.toLowerCase();
      if (ColorStrings[str]) str = ColorStrings[str];

      var match;
      // RGB(A)
      if (match = str.match(/\d+/g)) {

        return new Gamelab.RGBColor(parseInt(match[0], 10), parseInt(match[1], 10), parseInt(match[2], 10), 1.0);
      }
    }

    //Create color from pixel-data

  }, {
    key: 'fromData',
    value: function fromData(data) {
      return new Gamelab.RGBColor(parseInt(data[0], 10), parseInt(data[1], 10), parseInt(data[2], 10), 1.0);
    }

    //Distance between two colors (a 3d distance fxn)

  }, {
    key: 'distance',
    value: function distance(color) {
      var sumOfSquares = 0;
      sumOfSquares += Math.pow(this.r - color.r, 2);
      sumOfSquares += Math.pow(this.g - color.g, 2);
      sumOfSquares += Math.pow(this.b - color.b, 2);
      return Math.sqrt(sumOfSquares);
    }

    //Fuzzy Match with tolerance for distance

  }, {
    key: 'match_by_tolerance',
    value: function match_by_tolerance(color, tolerance) {

      var matches = {
        r: color.r,
        g: color.g,
        b: color.b
      };

      var total_diff = 0;

      for (var x in matches) {
        var diff = Math.abs(color[x] - this[x]);

        //console.log('COLOR-DIFF: --1::' + jstr(this) + ':: --2::' + jstr(color));

        total_diff += diff;
      }

      return total_diff <= tolerance;
    }
  }]);

  return RGBColor;
}();

;

Gamelab.RGBColor = RGBColor;

//Color calculations::
Gamelab.ColorCalculator = {
  hexToRgbArray: function hexToRgbArray(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  },


  rgbFromString: function rgbFromString(rgba_string) {
    return new Gamelab.RGBColor(rgba_string);
  },

  hexToRgba: function hexToRgba(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ',1)';
    }
    throw new Error('Bad Hex');
  },

  scaledRGBAFromHex: function scaledRGBAFromHex(hexcolor_a, hexcolor_b, scalePoint) {

    //get the point between color_a and color_b using value of 0-1 ::
    //scalePoint of 0 = color_a as rgba & scalePoint of 1.0 will return color_b as rgba

    var rgba_a = this.hexToRgbArray(hexcolor_a),
        rgba_b = this.hexToRgbArray(hexcolor_b);

    var finalRgba = {
      0: rgba_a[0] + (rgba_a[0] - rgba_b[0]) * scalePoint * -1.0,
      1: rgba_a[1] + (rgba_a[1] - rgba_b[1]) * scalePoint * -1.0,
      2: rgba_a[2] + (rgba_a[2] - rgba_b[2]) * scalePoint * -1.0,
      3: 1.0
    };

    //first 3 values are rounded / whole number
    [0, 1, 2].forEach(function (x) {
      if (finalRgba[x] >= 255) {
        finalRgba[x] = 255;
      }
      finalRgba[x] = Math.round(finalRgba[x]);
    });

    return "rgba(" + finalRgba[0] + "," + finalRgba[1] + "," + finalRgba[2] + ", 1.0)";
  }

};

//Css Colors by name::
var ColorStrings = {
  aliceblue: 'rgb(240, 248, 255)',
  antiquewhite: 'rgb(250, 235, 215)',
  aqua: 'rgb(0, 255, 255)',
  aquamarine: 'rgb(127, 255, 212)',
  azure: 'rgb(240, 255, 255)',
  beige: 'rgb(245, 245, 220)',
  bisque: 'rgb(255, 228, 196)',
  black: 'rgb(0, 0, 0)',
  blanchedalmond: 'rgb(255, 235, 205)',
  blue: 'rgb(0, 0, 255)',
  blueviolet: 'rgb(138, 43, 226)',
  brown: 'rgb(165, 42, 42)',
  burlywood: 'rgb(222, 184, 135)',
  cadetblue: 'rgb(95, 158, 160)',
  chartreuse: 'rgb(127, 255, 0)',
  chocolate: 'rgb(210, 105, 30)',
  coral: 'rgb(255, 127, 80)',
  cornflowerblue: 'rgb(100, 149, 237)',
  cornsilk: 'rgb(255, 248, 220)',
  crimson: 'rgb(220, 20, 60)',
  cyan: 'rgb(0, 255, 255)',
  darkblue: 'rgb(0, 0, 139)',
  darkcyan: 'rgb(0, 139, 139)',
  darkgoldenrod: 'rgb(184, 134, 11)',
  darkgray: 'rgb(169, 169, 169)',
  darkgreen: 'rgb(0, 100, 0)',
  darkgrey: 'rgb(169, 169, 169)',
  darkkhaki: 'rgb(189, 183, 107)',
  darkmagenta: 'rgb(139, 0, 139)',
  darkolivegreen: 'rgb(85, 107, 47)',
  darkorange: 'rgb(255, 140, 0)',
  darkorchid: 'rgb(153, 50, 204)',
  darkred: 'rgb(139, 0, 0)',
  darksalmon: 'rgb(233, 150, 122)',
  darkseagreen: 'rgb(143, 188, 143)',
  darkslateblue: 'rgb(72, 61, 139)',
  darkslategray: 'rgb(47, 79, 79)',
  darkslategrey: 'rgb(47, 79, 79)',
  darkturquoise: 'rgb(0, 206, 209)',
  darkviolet: 'rgb(148, 0, 211)',
  deeppink: 'rgb(255, 20, 147)',
  deepskyblue: 'rgb(0, 191, 255)',
  dimgray: 'rgb(105, 105, 105)',
  dimgrey: 'rgb(105, 105, 105)',
  dodgerblue: 'rgb(30, 144, 255)',
  firebrick: 'rgb(178, 34, 34)',
  floralwhite: 'rgb(255, 250, 240)',
  forestgreen: 'rgb(34, 139, 34)',
  fuchsia: 'rgb(255, 0, 255)',
  gainsboro: 'rgb(220, 220, 220)',
  ghostwhite: 'rgb(248, 248, 255)',
  gold: 'rgb(255, 215, 0)',
  goldenrod: 'rgb(218, 165, 32)',
  gray: 'rgb(128, 128, 128)',
  green: 'rgb(0, 128, 0)',
  greenyellow: 'rgb(173, 255, 47)',
  grey: 'rgb(128, 128, 128)',
  honeydew: 'rgb(240, 255, 240)',
  hotpink: 'rgb(255, 105, 180)',
  indianred: 'rgb(205, 92, 92)',
  indigo: 'rgb(75, 0, 130)',
  ivory: 'rgb(255, 255, 240)',
  khaki: 'rgb(240, 230, 140)',
  lavender: 'rgb(230, 230, 250)',
  lavenderblush: 'rgb(255, 240, 245)',
  lawngreen: 'rgb(124, 252, 0)',
  lemonchiffon: 'rgb(255, 250, 205)',
  lightblue: 'rgb(173, 216, 230)',
  lightcoral: 'rgb(240, 128, 128)',
  lightcyan: 'rgb(224, 255, 255)',
  lightgoldenrodyellow: 'rgb(250, 250, 210)',
  lightgray: 'rgb(211, 211, 211)',
  lightgreen: 'rgb(144, 238, 144)',
  lightgrey: 'rgb(211, 211, 211)',
  lightpink: 'rgb(255, 182, 193)',
  lightsalmon: 'rgb(255, 160, 122)',
  lightseagreen: 'rgb(32, 178, 170)',
  lightskyblue: 'rgb(135, 206, 250)',
  lightslategray: 'rgb(119, 136, 153)',
  lightslategrey: 'rgb(119, 136, 153)',
  lightsteelblue: 'rgb(176, 196, 222)',
  lightyellow: 'rgb(255, 255, 224)',
  lime: 'rgb(0, 255, 0)',
  limegreen: 'rgb(50, 205, 50)',
  linen: 'rgb(250, 240, 230)',
  magenta: 'rgb(255, 0, 255)',
  maroon: 'rgb(128, 0, 0)',
  mediumaquamarine: 'rgb(102, 205, 170)',
  mediumblue: 'rgb(0, 0, 205)',
  mediumorchid: 'rgb(186, 85, 211)',
  mediumpurple: 'rgb(147, 112, 219)',
  mediumseagreen: 'rgb(60, 179, 113)',
  mediumslateblue: 'rgb(123, 104, 238)',
  mediumspringgreen: 'rgb(0, 250, 154)',
  mediumturquoise: 'rgb(72, 209, 204)',
  mediumvioletred: 'rgb(199, 21, 133)',
  midnightblue: 'rgb(25, 25, 112)',
  mintcream: 'rgb(245, 255, 250)',
  mistyrose: 'rgb(255, 228, 225)',
  moccasin: 'rgb(255, 228, 181)',
  navajowhite: 'rgb(255, 222, 173)',
  navy: 'rgb(0, 0, 128)',
  oldlace: 'rgb(253, 245, 230)',
  olive: 'rgb(128, 128, 0)',
  olivedrab: 'rgb(107, 142, 35)',
  orange: 'rgb(255, 165, 0)',
  orangered: 'rgb(255, 69, 0)',
  orchid: 'rgb(218, 112, 214)',
  palegoldenrod: 'rgb(238, 232, 170)',
  palegreen: 'rgb(152, 251, 152)',
  paleturquoise: 'rgb(175, 238, 238)',
  palevioletred: 'rgb(219, 112, 147)',
  papayawhip: 'rgb(255, 239, 213)',
  peachpuff: 'rgb(255, 218, 185)',
  peru: 'rgb(205, 133, 63)',
  pink: 'rgb(255, 192, 203)',
  plum: 'rgb(221, 160, 221)',
  powderblue: 'rgb(176, 224, 230)',
  purple: 'rgb(128, 0, 128)',
  red: 'rgb(255, 0, 0)',
  rosybrown: 'rgb(188, 143, 143)',
  royalblue: 'rgb(65, 105, 225)',
  saddlebrown: 'rgb(139, 69, 19)',
  salmon: 'rgb(250, 128, 114)',
  sandybrown: 'rgb(244, 164, 96)',
  seagreen: 'rgb(46, 139, 87)',
  seashell: 'rgb(255, 245, 238)',
  sienna: 'rgb(160, 82, 45)',
  silver: 'rgb(192, 192, 192)',
  skyblue: 'rgb(135, 206, 235)',
  slateblue: 'rgb(106, 90, 205)',
  slategray: 'rgb(112, 128, 144)',
  slategrey: 'rgb(112, 128, 144)',
  snow: 'rgb(255, 250, 250)',
  springgreen: 'rgb(0, 255, 127)',
  steelblue: 'rgb(70, 130, 180)',
  tan: 'rgb(210, 180, 140)',
  teal: 'rgb(0, 128, 128)',
  thistle: 'rgb(216, 191, 216)',
  tomato: 'rgb(255, 99, 71)',
  turquoise: 'rgb(64, 224, 208)',
  violet: 'rgb(238, 130, 238)',
  wheat: 'rgb(245, 222, 179)',
  white: 'rgb(255, 255, 255)',
  whitesmoke: 'rgb(245, 245, 245)',
  yellow: 'rgb(255, 255, 0)',
  yellowgreen: 'rgb(154, 205, 50)',

  //special map Colors
  map_orange: 'rgb(255, 106, 0)',
  map_green: 'rgb(76, 255, 0)',
  map_red: 'rgb(255, 0, 0)',
  map_blue: 'rgb(0, 38, 255)',
  map_darkgreen: 'rgb(38, 127, 0)',
  map_yellow: 'rgb(255, 216, 0)',
  map_aqua: 'rgb(0, 255, 255)',
  map_grey: 'rgb(128, 128, 128)',
  map_gray: 'rgb(128, 128, 128)',
  map_darkgrey: 'rgb(64, 64, 64)',
  map_darkgray: 'rgb(64, 64, 64)',
  map_black: 'rgb(0, 0, 0)'
};

var RE_RGB = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;

Gamelab.Colors = {};

for (var x in ColorStrings) {
  if (ColorStrings.hasOwnProperty(x)) {
    Gamelab.Colors[x] = new Gamelab.RGBColor().fromString(x);
  }
}
;
var ConditionalPromise = function (_Promise) {
  _inherits(ConditionalPromise, _Promise);

  function ConditionalPromise(resolve, reject) {
    _classCallCheck(this, ConditionalPromise);

    var _this = _possibleConstructorReturn(this, (ConditionalPromise.__proto__ || Object.getPrototypeOf(ConditionalPromise)).call(this, resolve, reject));

    _this.every = function () {}; //millis || boolfxn
    _this.unless = function () {};
    _this.resolve = resolve || function () {};
    _this.reject = reject || function () {};
    _this.until = function () {}; //millis || boolfxn
    _this.promise = new Promise(_this.resolve, _this.reject);
    return _this;
  }

  _createClass(ConditionalPromise, [{
    key: 'Do',
    value: function Do(d) {
      this.do = d;
      return this;
    }
  }, {
    key: 'On',
    value: function On(o) {
      this.on = o;
      return this;
    }
  }, {
    key: 'Every',
    value: function Every(e) {
      this.every = e;
      return this;
    }
  }, {
    key: 'Unless',
    value: function Unless(u) {
      this.unless = u;
      return this;
    }
  }, {
    key: 'Until',
    value: function Until(u) {
      this.until = u;
      return this;
    }
  }, {
    key: 'run',
    value: function run(timer) {}
  }]);

  return ConditionalPromise;
}(Promise);

Gamelab.ConditionalPromise = ConditionalPromise;; /**
                                                  * Dubiously created by Adrian Cooney
                                                  * http://adriancooney.github.io
                                                  */
(function (console) {
  "use strict";

  //Bootlegged of imgur.com/memegen

  var memes = { "10 Guy": "//i.imgur.com/LaENqOV.jpg", "3rd World Success Kid": "//i.imgur.com/WA5duA1.jpg", "90's Problems": "//i.imgur.com/tL47qtp.jpg", "Aaand It's Gone": "//i.imgur.com/yf12saq.jpg", "Actual Advice Mallard": "//i.imgur.com/WymFmVy.jpg", "Advice Dog": "//i.imgur.com/Qk0VO6D.jpg", "Advice God": "//i.imgur.com/xH2fSFg.jpg", "Almost Politically Correct Redneck": "//i.imgur.com/YqLgINf.jpg", "Am I The Only One": "//i.imgur.com/gS9YL5U.jpg", "Ancient Aliens": "//i.imgur.com/NfCknz0.jpg", "Annoyed Picard": "//i.imgur.com/s9GmfSS.jpg", "Annoying Childhood Friend": "//i.imgur.com/27VCyQw.jpg", "Annoying Facebook Girl": "//i.imgur.com/ccczyGt.jpg", "Anti-Joke Chicken (Rooster)": "//i.imgur.com/KOsW0jh.jpg", "Awkward Penguin": "//i.imgur.com/ez1tQrq.jpg", "Back In My Day Grandpa": "//i.imgur.com/zuJSZp8.jpg", "Bad Advice Mallard": "//i.imgur.com/QEPvL2B.jpg", "Bad Luck Brian": "//i.imgur.com/sRW8BiO.jpg", "Bear Grylls": "//i.imgur.com/6Spqy1D.jpg", "Brace Yourself": "//i.imgur.com/NhIq0LY.jpg", "Captain Obvious": "//i.imgur.com/DmUcxBu.jpg", "Chemistry Cat": "//i.imgur.com/8agP4Xe.jpg", "College Freshman": "//i.imgur.com/2Ynyv9t.jpg", "College Liberal": "//i.imgur.com/OWfvSFE.jpg", "Condescending Wonka": "//i.imgur.com/D0e5fgL.jpg", "Confession Bear": "//i.imgur.com/kH1SKhp.jpg", "Confession Kid": "//i.imgur.com/jhOxR12.jpg", "Confused Gandalf": "//i.imgur.com/iIb5SEo.jpg", "Conspiracy Keanu": "//i.imgur.com/pFyk3J7.jpg", "Courage Wolf": "//i.imgur.com/H5qoXFb.jpg", "Dating Site Murderer": "//i.imgur.com/jffNNql.jpg", "Depression Dog": "//i.imgur.com/wgad6P8.jpg", "Drunk Baby": "//i.imgur.com/QvZdbRE.jpg", "English Motherfucker": "//i.imgur.com/sJThEC0.jpg", "Evil Plotting Raccoon": "//i.imgur.com/xMslWFf.jpg", "First Day On The Internet Kid": "//i.imgur.com/TWfdmVu.jpg", "First World Cat Problems": "//i.imgur.com/0vR5Slq.jpg", "First World Problem": "//i.imgur.com/ATcIl08.jpg", "Forever Alone": "//i.imgur.com/pcfXSUU.jpg", "Forever Resentful Mother": "//i.imgur.com/pIrdwo2.jpg", "Foul Bachelor Frog": "//i.imgur.com/JUFmusm.jpg", "Foul Bachelorette Frog": "//i.imgur.com/dYf971U.jpg", "Friendzone Fiona": "//i.imgur.com/Qu1eedL.jpg", "Frustrated Farnsworth": "//i.imgur.com/U3SElKP.jpg", "Fuck Me, Right?": "//i.imgur.com/J9gfxsx.jpg", "Gangster Baby": "//i.imgur.com/C3XhI56.jpg", "Good Girl Gina": "//i.imgur.com/qK6lYr2.jpg", "Good Guy Greg": "//i.imgur.com/UXMPoKN.jpg", "Grandma Finds The Internet": "//i.imgur.com/xPfGYqu.jpg", "Grinds My Gears": "//i.imgur.com/t4JqU1j.jpg", "Grumpy Cat (Tard)": "//i.imgur.com/dU5CDxN.jpg", "High Expectations Asian Father": "//i.imgur.com/7QeB9LI.jpg", "Hipster Barista": "//i.imgur.com/AbWxdy2.jpg", "Horrifying House Guest": "//i.imgur.com/DxmoFp1.jpg", "I Dare You Samuel Jackson": "//i.imgur.com/UQtpdqj.jpg", "I Should Buy A Boat": "//i.imgur.com/XqlqPxn.jpg", "I Too Like To Live Dangerously": "//i.imgur.com/qF70EL9.jpg", "Idiot Nerd Girl": "//i.imgur.com/8hYPYwd.jpg", "Insanity Wolf": "//i.imgur.com/GOOdg3k.jpg", "Joker Mind Loss": "//i.imgur.com/qQIRaOD.jpg", "Joseph Ducreux": "//i.imgur.com/QL7TyR9.jpg", "Lame Joke Eel": "//i.imgur.com/oQXw3jF.jpg", "Lame Pun Raccoon": "//i.imgur.com/nvALRK3.jpg", "Lazy College Senior": "//i.imgur.com/PpkVfzz.jpg", "Mad Karma": "//i.imgur.com/G0QMPum.jpg", "Masturbating Spidey": "//i.imgur.com/dZ7AB4c.jpg", "Matrix Morpheus": "//i.imgur.com/8Yrw6cZ.jpg", "Mayonnaise Patrick": "//i.imgur.com/5jE0Y7f.jpg", "Musically Oblivious 8th Grader": "//i.imgur.com/l5YHN5D.jpg", "Not Sure Fry": "//i.imgur.com/7rFgBB1.jpg", "Oblivious Suburban Mom": "//i.imgur.com/Y7o7UJs.jpg", "One Does Not Simply": "//i.imgur.com/7LrwR1Y.jpg", "Overly Attached Girlfriend": "//i.imgur.com/5blLJLR.jpg", "Overly Manly Man": "//i.imgur.com/dOSn9Na.jpg", "Paranoid Parrot": "//i.imgur.com/KooYHdg.jpg", "Pedobear": "//i.imgur.com/c6JZKRW.jpg", "Pepperidge Farm Remembers": "//i.imgur.com/uFde4v5.jpg", "Philosoraptor": "//i.imgur.com/eERhI5h.jpg", "Priority Peter": "//i.imgur.com/BBEFk0e.jpg", "Rasta Science Teacher": "//i.imgur.com/Js6Ai5T.jpg", "Redditor's Wife": "//i.imgur.com/d1XfJeD.jpg", "Revenge Band Kid": "//i.imgur.com/dlvmaRI.jpg", "Schrute Facts": "//i.imgur.com/UxcvPwT.jpg", "Scumbag Brain": "//i.imgur.com/OZhhZdS.jpg", "Scumbag Stacy": "//i.imgur.com/Qqz1axp.jpg", "Scumbag Steve": "//i.imgur.com/Rfvoc0Y.jpg", "Sexually Oblivious Rhino": "//i.imgur.com/RoaNuEC.jpg", "Sheltering Suburban Mom": "//i.imgur.com/vMkSofv.jpg", "Shut Up And Take My Money": "//i.imgur.com/uWe0rtQ.jpg", "Skeptical Third World Kid": "//i.imgur.com/uwAusxV.jpg", "Smug Spongebob": "//i.imgur.com/OTTRjrv.jpg", "Socially Awesome Penguin": "//i.imgur.com/S6WgQW7.jpg", "Success Kid": "//i.imgur.com/ZibijBz.jpg", "Successful Black Man": "//i.imgur.com/ogIm0cy.jpg", "Sudden Clarity Clarence": "//i.imgur.com/N3Xmfbe.jpg", "Tech Impaired Duck": "//i.imgur.com/riz28ci.jpg", "The Most Interesting Man In The World": "//i.imgur.com/MGv15MH.jpg", "The Rent Is Too High": "//i.imgur.com/r5WLktQ.jpg", "Tough Spongebob": "//i.imgur.com/2w0F1HX.jpg", "Unhelpful Highschool Teacher": "//i.imgur.com/ohbGhuD.jpg", "Vengeance Dad": "//i.imgur.com/0nUStsa.jpg", "What Year Is It?": "//i.imgur.com/fj79hQS.jpg", "X, X Everywhere": "//i.imgur.com/GGy94Gt.jpg", "Yeah That'd Be Great": "//i.imgur.com/nz9M2pl.jpg", "Yo Dawg Xzibit": "//i.imgur.com/XOyGqF2.jpg", "You're Bad And You Should Feel Bad": "//i.imgur.com/YsabGnQ.jpg", "You're Gonna Have A Bad Time": "//i.imgur.com/2tNR7P7.jpg" };

  /**
   * Since the console.log doesn't respond to the `display` style,
   * setting a width and height has no effect. In fact, the only styles
   * I've found it responds to is font-size, background-image and color.
   * To combat the image repeating, we have to get a create a font bounding
   * box so to speak with the unicode box characters. EDIT: See Readme.md
   *
   * @param  {int} width  The height of the box
   * @param  {int} height The width of the box
   * @return {object}     {string, css}
   */
  function getBox(width, height) {
    return {
      string: "+",
      style: "font-size: 1px; padding: " + Math.floor(height / 2) + "px " + Math.floor(width / 2) + "px; line-height: " + height + "px;"
    };
  }

  /**
   * Draw's meme text on a context.
   *
   * @param  {CanvasRenderingContext2D} ctx   The canvas context
   * @param  {string} type  "upper"|"lower"
   * @param  {string} text  The text to draw
   * @param  {int} width The width of the image
   * @param  {int} y     The y value to draw at
   * @return {null}
   */
  function drawMemeText(ctx, type, text, width, y) {
    text = text.toUpperCase();
    //Determine the font size
    if (text.length < 24) {
      var val = Math.max(0, text.length - 12),
          size = 70 + val * -3;

      drawText(ctx, size, text, width / 2, y);
    } else if (text.length < 29) {
      drawText(ctx, 40, text, width / 2, y);
    } else {
      var strs = wrap(text, 27);
      strs.forEach(function (str, i) {
        drawText(ctx, 40, str, width / 2, type == "lower" ? y - (strs.length - 1) * 40 + i * 40 : y + i * 40);
      });
    }
  }

  /**
   * Draws text in impact font with stroke on context
   *
   * @param  {CanvasRenderingContext2D} ctx  The canvas context
   * @param  {int} size Font size
   * @param  {string} text The string to write
   * @param  {int} x    X Position
   * @param  {int} y    Y position
   * @return {null}
   */
  function drawText(ctx, size, text, x, y) {
    //Set the text styles
    ctx.font = "bold " + size + "px Impact";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#000";
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }

  /**
   * Wrap a line of text at an index
   *
   * @param  {string} text The text
   * @param  {int} num  The index to wrap at
   * @return {array}      Array of text
   */
  function wrap(text, num) {
    var output = [],
        split = text.split(" ");

    var str = [];
    for (var i = 0, cache = split.length; i < cache; i++) {
      if ((str + split[i]).length < num) str.push(split[i]);else {
        output.push(str.join(" "));
        str.length = 0;
        str.push(split[i]);
      }
    }

    //Push the final line
    output.push(str.join(" "));

    return output;
  }

  /**
   * Add a meme to the console!
   *
   * @param  {string} upper  The upper text
   * @param  {string} lower  The lower text
   * @param  {string} image  The meme type (see `console.meme` for all supported) or image url (Make sure it's CORS enabled)
   * @param  {int} width  The width of the meme
   * @param  {int} height The height of the meme
   * @return {null}
   */
  console.meme = function (upper, lower, image, width, height) {
    if (!upper) console.error("Yo, you forgot the text for the upper part of the meme. The bit at the top. Yeah, that bit.");
    if (!lower) console.error("You forgot the text for the bottom of the meme, stupid.");
    if (!image) console.error("Dude, you forgot the meme type or url for the background image (CORS enabled, *hint* imgur *hint*). To see a list of supported memes, hit `console.meme()`");
    if (!upper && !lower && !image) return console.log("> " + Object.keys(memes).join("\n> "));

    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        width = width || 500,
        height = width || 500,

    //I tweaked it at these dimensions,
    //So everything scales from here
    _w = 500,
        _h = 500;

    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {
      canvas.width = width;
      canvas.height = height;

      var text = upper.toUpperCase();

      ctx.scale(width / 500, height / 500);

      //Draw the background
      ctx.drawImage(this, 0, 0, _w, _h);

      drawMemeText(ctx, "upper", upper, _w, 50); //upper
      drawMemeText(ctx, "lower", lower, _w, _h - 50); //upper

      console.image(canvas.toDataURL());
    };

    if (memes[image]) var url = memes[image];else var url = image;

    img.src = url; //"http://www.corsproxy.com/" + url.replace(/https?:\/\//, "");
  };

  /**
   * Display an image in the console.
   * @param  {string} url The url of the image.
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  console.image = function (url, scale) {
    scale = scale || 1;
    var img = new Image();

    img.onload = function () {
      var dim = getBox(this.width * scale, this.height * scale);
      console.log("%c" + dim.string, dim.style + "background: url(" + url + "); background-size: " + this.width * scale + "px " + this.height * scale + "px; color: transparent;");
    };

    img.src = url;
  };
})(console);
;(function () {
  console.log('Line() class... creating');

  var cos = Math.cos,
      pow = Math.pow,
      sin = Math.sin,
      sqrt = Math.sqrt,
      PI = Math.PI;

  var Curves = { //ALL HAVE INPUT AND OUTPUT OF: 0-1.
    Sine: {
      In: function In(x) {
        return 1 - cos(x * PI / 2);
      },

      Out: function Out(x) {

        return sin(x * PI / 2);
      },

      InOut: function InOut(x) {

        return -(cos(PI * x) - 1) / 2;
      }
    },
    Cubic: {
      In: function In(x) {
        return x * x * x;
      },

      Out: function Out(x) {

        return 1 - pow(1 - x, 3);
      },

      InOut: function InOut(x) {

        return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
      }
    },
    Quintic: {
      In: function In(x) {
        return x * x * x * x * x;
      },

      Out: function Out(x) {

        return 1 - pow(1 - x, 5);
      },

      InOut: function InOut(x) {

        return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
      }
    },
    Circular: {
      In: function In(x) {
        return 1 - sqrt(1 - pow(x, 2));
      },

      Out: function Out(x) {

        return sqrt(1 - pow(x - 1, 2));
      },

      InOut: function InOut(x) {

        return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
      }
    },
    Elastic: {
      In: function In(x) {
        var c4 = 2 * Math.PI / 3;

        return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
      },

      Out: function Out(x) {

        var c4 = 2 * Math.PI / 3;
        return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
      },

      InOut: function InOut(x) {

        var c5 = 2 * Math.PI / 4.5;

        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
      }
    },
    Quadratic: {
      In: function In(x) {
        return x * x;
      },

      Out: function Out(x) {

        return 1 - (1 - x) * (1 - x);
      },

      InOut: function InOut(x) {
        return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
      }
    },
    Quartic: {
      In: function In(x) {
        return x * x * x * x;
      },

      Out: function Out(x) {

        return 1 - pow(1 - x, 4);
      },

      InOut: function InOut(x) {

        return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
      }
    },
    Exponential: {
      In: function In(x) {
        return x === 0 ? 0 : pow(2, 10 * x - 10);
      },

      Out: function Out(x) {
        return x === 1 ? 1 : 1 - pow(2, -10 * x);
      },

      InOut: function InOut(x) {

        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
      }
    },
    Back: {
      In: function In(x) {
        var c1 = 1.70158;
        var c3 = c1 + 1;

        return c3 * x * x * x - c1 * x * x;
      },

      Out: function Out(x) {

        var c1 = 1.70158;
        var c3 = c1 + 1;

        return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
      },

      InOut: function InOut(x) {

        var c1 = 1.70158;
        var c2 = c1 * 1.525;

        return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
      }
    },
    Bounce: {
      In: function In(x) {
        return 1 - Curves.Out.Bounce(1 - x);
      },

      Out: function Out(x) {

        var n1 = 7.5625;
        var d1 = 2.75;

        if (x < 1 / d1) {
          return n1 * x * x;
        } else if (x < 2 / d1) {
          return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
          return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
          return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
      },

      InOut: function InOut(x) {

        var n1 = 7.5625;
        var d1 = 2.75;

        if (x < 1 / d1) {
          return n1 * x * x;
        } else if (x < 2 / d1) {
          return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
          return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
          return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
      }
    },

    None: {
      Linear: function Linear(x) {
        return x;
      },
      Zero: function Zero(x) {
        return 0;
      }
    },
    In: {
      Sine: function Sine(x) {
        return 1 - cos(x * PI / 2);
      },
      Cubic: function Cubic(x) {
        return x * x * x;
      },
      Quintic: function Quintic(x) {
        return x * x * x * x * x;
      },
      Circular: function Circular(x) {
        return 1 - sqrt(1 - pow(x, 2));
      },
      Elastic: function Elastic(x) {
        var c4 = 2 * Math.PI / 3;

        return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
      },
      Quadratic: function Quadratic(x) {
        return x * x;
      },
      Quartic: function Quartic(x) {
        return x * x * x * x;
      },
      Exponential: function Exponential(x) {
        return x === 0 ? 0 : pow(2, 10 * x - 10);
      },
      Back: function Back(x) {
        var c1 = 1.70158;
        var c3 = c1 + 1;

        return c3 * x * x * x - c1 * x * x;
      },
      Bounce: function Bounce(x) {
        return 1 - Curves.Out.Bounce(1 - x);
      }
    },

    Out: {
      Sine: function Sine(x) {
        return sin(x * PI / 2);
      },
      Cubic: function Cubic(x) {
        return 1 - pow(1 - x, 3);
      },
      Quintic: function Quintic(x) {
        return 1 - pow(1 - x, 5);
      },
      Circular: function Circular(x) {
        return sqrt(1 - pow(x - 1, 2));
      },
      Elastic: function Elastic(x) {
        var c4 = 2 * Math.PI / 3;
        return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
      },
      Quadratic: function Quadratic(x) {
        return 1 - (1 - x) * (1 - x);
      },
      Quartic: function Quartic(x) {
        return 1 - pow(1 - x, 4);
      },
      Exponential: function Exponential(x) {
        return x === 1 ? 1 : 1 - pow(2, -10 * x);
      },
      Back: function Back(x) {
        var c1 = 1.70158;
        var c3 = c1 + 1;

        return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
      },
      Bounce: function Bounce(x) {
        var n1 = 7.5625;
        var d1 = 2.75;

        if (x < 1 / d1) {
          return n1 * x * x;
        } else if (x < 2 / d1) {
          return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
          return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
          return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
      }
    },
    InOut: {
      Sine: function Sine(x) {
        return -(cos(PI * x) - 1) / 2;
      },
      Cubic: function Cubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
      },
      Quintic: function Quintic(x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
      },
      Circular: function Circular(x) {
        return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
      },
      Elastic: function Elastic(x) {
        var c5 = 2 * Math.PI / 4.5;

        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
      },
      Quadratic: function Quadratic(x) {
        return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
      },
      Quartic: function Quartic(x) {
        return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
      },
      Exponential: function Exponential(x) {
        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
      },
      Back: function Back(x) {
        var c1 = 1.70158;
        var c2 = c1 * 1.525;

        return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
      },
      Bounce: function Bounce(x) {
        var n1 = 7.5625;
        var d1 = 2.75;

        if (x < 1 / d1) {
          return n1 * x * x;
        } else if (x < 2 / d1) {
          return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
          return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
          return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
      }
    }
  };

  Gamelab.Curves = Curves;
  Gamelab.EasingCurves = Gamelab.Curves;

  var inOutCurves = {
    quadratic: function quadratic(t) {
      return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    cubic: function cubic(t) {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    quartic: function quartic(t) {
      return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    quintic: function quintic(t) {
      return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
    linear: function linear(t) {
      return t;
    } //provided for consistency / in case 'linear' is needed
  };

  Gamelab.UI = Gamelab.UI || {};

  var getCurveCanvasList = function getCurveCanvasList() {
    var canvases = [];
    for (var q in Gamelab.Curves) {
      for (var t in Gamelab.Curves[q]) {
        if (typeof Gamelab.Curves[q][t] == 'function') {
          var _c = document.createElement('canvas');
          var ckey = q + '.' + t;
          _c.width = 170;
          _c.height = 100;
          _c.style.width = '170px';
          _c.style.height = '100px';
          _c.fillStyle = 'rgba(0, 0, 0, 0.6)';

          _c.setAttribute('data-curve-keys', q + '.' + t);

          var _ctx = _c.getContext('2d');
          _ctx.fillRect(0, 0, 170, 100);
          _ctx.lineWidth = 1;
          _ctx.shadowBlur = 2;
          _ctx.shadowColor = 'teal';

          var padding = 40;

          _ctx.beginPath();

          for (var x = padding / 2.0; x < _c.width - padding / 2.0; x += 1.0) {
            var calcHeight = _c.height - padding;
            var calcWidth = _c.width - padding;
            var p2 = new Gamelab.Vector(x, padding / 2.0 + calcHeight * Gamelab.Curves[q][t](x / calcWidth));
            if (x > 0) {

              var p1 = new Gamelab.Vector(x - 1, padding / 2.0 + calcHeight * Gamelab.Curves[q][t]((x - 1) / calcWidth));
              _ctx.strokeStyle = 'limegreen';

              if (ckey.indexOf('In.Elastic') >= 0) {
                p1.y += 20;
                p2.y += 20;
              }

              if (ckey.indexOf('Out.Elastic') >= 0) {
                p1.y -= 20;
                p2.y -= 20;
              }

              _ctx.moveTo(p1.x, 100 - p1.y);
              _ctx.lineTo(p2.x, 100 - p2.y);
              _ctx.stroke();
            };
          }
          canvases.push(_c);
        }
      }
    }
    return canvases;
  };

  var getCurveImageList = function getCurveImageList() {
    var images = [],
        canvases = this.getCurveCanvasList();
    canvases.forEach(function (c) {

      var image = document.createElement('img');

      image.style.display = 'none';
      image.style.position = 'absolute';
      image.style.zIndex = '9999';

      image.style.width = 'auto';
      image.style.height = 'auto';

      image.style.background = 'transparent';
      image.style.border = '1px inset #444';

      image.setAttribute('data-curve-keys', c.getAttribute('data-curve-keys'));
      image.style.opacity = 0.8;
      image.src = c.toDataURL();
      image.onload = function () {};

      image.show = function (topLeftElement) {
        var rect = topLeftElement.getBoundingClientRect();
        this.style.top = $(topLeftElement).position().top - 6 + 'px';
        this.style.left = 5 + 120 + 'px';
        this.style.display = 'block';
      };

      image.hide = function () {
        this.style.display = 'none';
      };
      images.push(image);
    });
    return images;
  };

  var StateFrame = function () {
    function StateFrame(object, target) {
      _classCallCheck(this, StateFrame);

      this.object = object;
      this.target = target;
      this.easingCurve = 'linear-none';
      this.timeLimit = 100;
      this.complete = function () {
        console.log('empty complete');
      };
    }

    _createClass(StateFrame, [{
      key: 'Object',
      value: function Object(o) {
        this.object = o;
        return this;
      }
    }, {
      key: 'Target',
      value: function Target(t) {
        this.target = t;
        return this;
      }
    }, {
      key: 'EasingCurve',
      value: function EasingCurve(e) {
        this.easingCurve = e;
        return this;
      }
    }, {
      key: 'TimeLimit',
      value: function TimeLimit(t) {
        this.timeLimit = t;
        return this;
      }
    }, {
      key: 'onComplete',
      value: function onComplete(complete) {
        this.complete = complete;
        return this;
      }
    }, {
      key: 'commit',
      value: function commit() {
        alert('commiting keyframe');
        if (this.complete) {
          this.complete();
        }
      }
    }]);

    return StateFrame;
  }();

  Gamelab.StateFrame = StateFrame;

  Gamelab.UI.getCurveCanvasList = getCurveCanvasList;
  Gamelab.UI.getCurveImageList = getCurveImageList;
})();
;
var FeildSpan = function FeildSpan(a, b) {
  var transition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'linear';
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;

  _classCallCheck(this, FeildSpan);

  //console.log('FeildSpan(a, b, transition) :: transition may be the key-name of a curve or "random"');

  if (typeof a == 'number' && b == undefined) transition = 'fixed';

  this.a = a;
  this.b = b;
  this.transition = transition;
  this.duration = duration;
  this.ticker = 0;

  this.Duration = function (d) {
    this.duration = d;
    return this;
  };

  this.Clone = function () {
    return new FeildSpan(this.a, this.b, this.transition, this.duration);
  };

  this.max = function () {
    if (typeof this.a == 'number' && typeof this.b !== 'number') return this.a;else return this.a >= this.b ? this.a : this.b;
  };

  this.Reset = function () {
    this.ticker = 0;
    return this;
  };

  this.getValue = function () {

    if (this.transition == 'fixed') return this.a;

    var option = this,
        value = 0,
        diff = option.a - option.b;
    option.duration = option.duration || 500;
    var tvalue = option.transition;

    var curveMethod;

    for (var x in Gamelab.EasingCurves) {
      for (var y in Gamelab.EasingCurves[x]) {
        if (y.toLowerCase() == option.transition.toLowerCase() && x == 'None' || x == 'In') {
          curveMethod = Gamelab.EasingCurves[x][y] || Gamelab.EasingCurves[x][y];
        }
      }
    }

    if (tvalue == 'random-once' && this.testValue !== undefined) {
      return this.testValue;
    } else if (tvalue == 'random-once' || tvalue == 'random') {

      option.ticker += 1;

      var finalValue = option.a;

      if (option.a <= option.b) {
        return option.a + Math.abs(Math.random() * diff);
      } else {
        return option.a - Math.abs(Math.random() * diff);
      }
    } else if (curveMethod) {

      var portion = Math.round(option.ticker / option.duration * 100) / 100;

      option.ticker += 1;

      diff = Math.abs(diff);

      var curveStep = Math.abs(curveMethod(portion) * diff);

      var finalValue = option.a;

      finalValue += option.a > option.b ? curveStep * -1 : curveStep;

      if (option.ticker >= option.duration) {
        return option.b;
      }

      return Math.round(finalValue * 100) / 100;
    }
  };

  this.testValue = this.getValue();
};

var ColorFeildSpan = function ColorFeildSpan(a, b) {
  var transition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'linear';
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
  var colors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  _classCallCheck(this, ColorFeildSpan);

  if (typeof a == 'string' && b == undefined) transition = 'fixed';

  this.a = a;
  this.b = b;
  this.transition = transition;
  this.duration = duration;
  this.ticker = 0;
  this.colors = colors;

  this.Duration = function (d) {
    this.duration = d;
    return this;
  };

  this.Clone = function () {
    return new ColorFeildSpan(this.a, this.b, this.transition, this.duration, this.colors);
  };

  this.hasVariance = function () {
    return this.transition !== 'fixed';
  };

  this.PrepareColors = function () {
    //runs 100 X , creates set of differential colors on the specified scale

    for (var x = 0.0; x <= 1.0; x += 0.01) {
      //use the x value to get the set of y values for this transition | curve (ex 'cubic')
      var tvalue = this.transition !== 'random' ? this.transition : 'linear';
      var option = this,
          value = 0;

      var curveMethod;

      option.duration = option.duration || 500;

      //if 'random' then create a linear scale to select from
      if (this.transition == 'random') {
        tvalue = 'linear';
      }

      if (this.transition == 'fixed') {
        this.colors.push(Gamelab.ColorCalculator.scaledRGBAFromHex(option.a, option.a, 0));
        continue;
      }

      var portion = x;

      this.colors.push(Gamelab.ColorCalculator.scaledRGBAFromHex(option.a, option.b, portion));
    };

    return this;
  };

  this.Reset = function () {
    this.ticker = 0;
    return this;
  };

  this.min = function () {

    if (typeof this.a == 'number' && this.b == undefined) return this.a;

    if (this.a <= this.b) return this.a;else {
      return this.b;
    }
  };

  this.max = function () {

    if (typeof this.a == 'number' && this.b == undefined) return this.a;

    if (this.a >= this.b) return this.a;else {
      return this.b;
    }
  };

  this.getPortion = function () {
    return this.ticker / this.duration;
  };

  //getValue :: returns the color for current step
  this.getValue = function () {
    //calculate portion as step 0.0 - 1.0
    var portion = this.ticker / this.duration;

    //increment ticker
    this.ticker += 1;

    //handle random transition
    if (this.transition == 'random') {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    if (this.transition == 'fixed') return this.colors[0];

    //get the correct array-member of index 0-99 using portion
    return this.colors[Math.floor(portion * 100)];
  };
};

Gamelab.FeildSpan = FeildSpan;
Gamelab.ColorFeildSpan = ColorFeildSpan;;
var FiringClock = function () {
  function FiringClock() {
    _classCallCheck(this, FiringClock);

    this.ticker = 0;
    this.skip = 0;
    this.duration = 200;
    this.repeats = 0;
    this.callback = function () {};
    this.callback_arguments = {};
    this.chance = 1.0;
    this.every = 1.0;
    this.skipMin = -1;
    this.skipMax = -1;
    this.lockout = 0; //when > 0 cannot fire / locked;
  }

  _createClass(FiringClock, [{
    key: 'Reset',
    value: function Reset() {
      this.ticker = 0;
      return this;
    }
  }, {
    key: 'NeverDie',
    value: function NeverDie() {
      this.duration = Infinity;
      return this;
    }
  }, {
    key: 'Callback',
    value: function Callback(c, args) {
      this.callback = c;
      this.callback_arguments = args;
      return this;
    }
  }, {
    key: 'Repeat',
    value: function Repeat(repeats) {
      this.repeats = repeats;
      return this;
    }
  }, {
    key: 'Skip',
    value: function Skip(min, max) {
      this.skipMin = min;
      this.skipMax = max;
      return this;
    }
  }, {
    key: 'Duration',
    value: function Duration(d) {
      this.duration = d;
      return this;
    }
  }, {
    key: 'Lockout',
    value: function Lockout(l) {
      this.lockout = l;
      return this;
    }
  }, {
    key: 'Every',
    value: function Every(millis) {
      if (millis >= 1) this.every = millis;
      return this;
    }
  }, {
    key: 'Chance',
    value: function Chance(c) {
      this.chance = c;
      return this;
    }
  }, {
    key: 'hasChance',
    value: function hasChance() {
      return this.lockout <= 0 && Math.random() * 1.0 <= this.chance;
    }
  }, {
    key: 'skipTime',
    value: function skipTime() {
      return this.ticker >= this.skipMin && this.ticker <= this.skipMax;
    }
  }, {
    key: 'fire',
    value: function fire(callback) {

      this.lockout--;

      if (!this.hasChance()) return;

      if (callback) this.callback = callback;

      if (this.ticker % this.every !== 0) return;

      if (this.repeat > 0 && this.ticker >= this.duration) {
        this.ticker = 0;
        this.repeat--;
      }

      if (this.ticker <= this.duration && !this.skipTime()) {
        this.callback(this.callback_arguments);
      }

      this.ticker += 1;
    }
  }]);

  return FiringClock;
}();

Gamelab.FiringClock = FiringClock;; /*UniqueList : store only unique array items*/
var UniqueList = function UniqueList(list) {
  list.addUnique = function (i) {
    if (this.indexOf(i) == -1) {
      this.push(i);
    }
  };
  return list;
};

var GameData = {
  applyParentAndChildRelationship: function applyParentAndChildRelationship(parent, child, trackBy) {
    parent.children = parent.children || [];
    parent.children = UniqueList(parent.children);
    child.parent = parent;
    parent.children.addUnique(child);
  }
};

Gamelab.GameData = GameData;; /**
                              * Creates a new GameWindow
                              * <iframe style='width:400px; height:450px; overflow:hidden;' src='./html/iframe-error.html'> </iframe>
                              * @param   {Object} canvas the canvas element for this gameWindow. --GameWindow's if not supplied, the constructor will create a full-screen canvas, if a canvas.
                              * @param   {Array} drawables=[] a list of drawable objects to be drawn. --Drawables can also be added after constructor call.
                              * @returns {GameWindow} a Gamelab.GameWindow object
                              * */

var GameWindow = function () {
  function GameWindow() {
    var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var drawables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, GameWindow);

    /**
     * list of all drawables in the window.
     *
     * @property this.drawables
     * @memberof GameWindow
     **********/

    this.drawables = drawables;
    this.bool_events = Gamelab.bool_events || [];
    this.settings = {};

    this.paused = false;
    this.drawFromWindows = false;

    /**
     * the html-canvas of the GameWindow.
     *
     * @property this.canvas
     * @memberof GameWindow
     **********/

    this.canvas = canvas || false;

    this.engaged = true;

    if (!canvas) {
      console.info('GameWindow() had no {canvas:canvas} argument. Creating a new canvas in document.body...');
      this.canvas = document.createElement('CANVAS');
    } else if (typeof canvas == 'string') {
      this.canvas = document.querySelector(canvas);
    } else if ((typeof canvas === 'undefined' ? 'undefined' : _typeof(canvas)) == HTMLCanvasElement) {
      this.canvas = canvas;
    }

    this.canvas.setAttribute('class', 'gamewindow');
    document.body.append(this.canvas);

    this.context = this.canvas.getContext('2d');

    document.body.style.position = "absolute";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    /**
     * the camera of the GameWindow. --An instance of Gamelab.Camera
     *
     * @property this.camera
     * @memberof GameWindow
     **********/

    this.camera = new Gamelab.Camera();

    this.camera.target = false;

    Gamelab.camera = this.camera;

    this.scaleTracker = 1.0;

    var __inst = this;

    this.Size();

    this.update_ext = [];
    this.resize_ext = [];

    window.onresize = function () {

      if (__inst.isAbsoluteSize) return;

      __inst.Size();

      __inst.resize_ext.forEach(function (f) {

        f.bind(this).call();
      });
    };

    this.ctx = this.canvas.getContext('2d');
    Gamelab.game_windows.push(this);

    window.onerror = function () {
      Gamelab.errors += 1;
      console.log('Canvas Error --');
      if (Gamelab.errors > Gamelab.config.maxErrors) {
        Gamelab.stopDraw = true;
        var call = call || window.setTimeout(function () {
          if (call) {
            window.clearTimeout(call);
          }
          console.log('%cDraw stopped at errorLimit:' + Gamelab.settings.errorLimit, 'color:darkorange;');
        }, 200);
      }
    };
    this.domElement = this.canvas;
  }

  _createClass(GameWindow, [{
    key: 'FromArray',
    value: function FromArray(array) {
      this.drawFromWindows = [];
      return this;
    }
  }, {
    key: 'Offscreen',
    value: function Offscreen(o) {
      this.offscreen = o;
      this.canvas.display = 'none';
      return this;
    }
  }, {
    key: 'isPaused',
    value: function isPaused() {
      return this.paused;
    }
  }, {
    key: 'setPause',
    value: function setPause(p) {
      this.paused = p;
      return this;
    }
  }, {
    key: 'getImageData',
    value: function getImageData(x, y, w, h) {

      return this.ctx.getImageData(x, y, w, h);
    }

    /**
     * returns the gameWindow.canvas property, an HTMLCanvasElement
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'getCanvas',
    value: function getCanvas() {
      return this.canvas;
    }

    /**
     * returns a vector(x, y) showing the center of the GameWindow
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'center',
    value: function center() {
      return new Gamelab.Vector(Math.round(this.canvas.width / 2), Math.round(this.canvas.height / 2));
    }
  }, {
    key: 'TrackStat',
    value: function TrackStat() {

      this.__trackStat = true;
      return this;
    }
  }, {
    key: 'GridUnit',
    value: function GridUnit(x, y, w, h, srcImage_Path) {

      var size = new Gamelab.Vector(w, h),
          position = new Gamelab.Vector(x, y);

      var sprite;

      if (srcImage_Path) {
        sprite = new Gamelab.Sprite(srcImage_Path);
        sprite.Size(size);
        sprite.Pos(position);

        Gamelab.game_windows[0].add(sprite);
      }

      return {
        size: size,
        position: position
      };
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(callback) {

      var canvas = this.canvas;

      this.canvas.addEventListener('mousemove', function (evt) {

        var x = evt.clientX,
            y = evt.clientY;

        var rect = canvas.getBoundingClientRect();

        x -= rect.left;
        y -= rect.top;

        callback(x, y);
      });
    }
  }, {
    key: 'onMouseClick',
    value: function onMouseClick(callback) {
      var canvas = this.canvas;
      this.canvas.addEventListener('click', function (evt) {
        var x = evt.clientX,
            y = evt.clientY;
        var rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        callback(x, y, evt);
      });
    }
  }, {
    key: 'onMouseWheel',
    value: function onMouseWheel(callback, kill) {
      var canvas = this.canvas;
      this.canvas.addEventListener('mousewheel', function (evt) {
        var x = evt.clientX,
            y = evt.clientY;
        var rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        callback(x, y, evt.wheelDelta > 0 ? 1 : -1, evt);
        if (kill) {
          evt.preventDefault();
          return true;
        }
      });
    }
  }, {
    key: 'getGameSprites',
    value: function getGameSprites() {
      var gameSprites = [];
      this.drawables.forEach(function (sprite) {
        console.info(sprite);
        if (sprite.spriteType = 'game') {
          gameSprites.push(sprite);
        }
      });
      return gameSprites;
    }

    /**
     * creates an array of gridUnits
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'GridStyle',
    value: function GridStyle(total_x, total_y, w, h, srcImage_Path) {

      if (!(this.grid instanceof Array)) {
        this.grid = [];
      }

      function GridUnit(x, y, w, h, srcImage_Path) {

        var size = new Gamelab.Vector(w, h),
            position = new Gamelab.Vector(x, y);

        var sprite;

        if (srcImage_Path) {
          sprite = new Gamelab.Sprite(srcImage_Path);
          sprite.Size(size);
          sprite.Pos(position);

          Gamelab.game_windows[0].add(sprite);
        }

        return {
          size: size,
          position: position
        };
      };

      for (var y = 0; y < total_y; y++) {

        for (var x = 0; x < total_x; x++) {

          this.grid.push(new GridUnit(x * w, y * h, w, h, srcImage_Path));
        }
      }
      return this;
    }
  }, {
    key: 'getCanvas',
    value: function getCanvas() {
      return this.canvas;
    }

    /**
     * adds an update to the GameWindow:: update to be called every 20 milliseconds
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'onUpdate',
    value: function onUpdate(f) {

      this.update_ext.push(f);
    }

    /**
     * adds a resize call to the GameWindow:: resize to be called when window size changes
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'onResize',
    value: function onResize(r) {

      this.resize_ext.push(r);
    }

    /**
     * the main update for the GameWindow:: called automatically after call of GameWindow.start() or GameWindow.animate()
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'update',
    value: function update() {

      if (this.isPaused()) return;

      if (this.camera && this.camera.update) this.camera.update();

      var sortDrawables = function sortDrawables(arr, key) {
        return arr.sort(function (a, b) {
          return a[key] - b[key];
        });
      };

      sortDrawables(this.drawables, "layer");

      Gamelab.each(this.drawables, function (ix, item) {

        if (item && typeof item.def_update == 'function') {
          item.def_update(item);
        }

        if (item && typeof item.update == 'function') {
          item.update(item);
        }

        if (item && ['SpriteArray', 'RobotixArray', 'RobotixVerticalChain'].indexOf(item.constructor.name) >= 0 && typeof item.each == 'function') {

          item.each(function (ix, graphic) {

            graphic.update(graphic);
          });
        }
      });

      Gamelab.each(this.bool_events, function (ix, item) {

        if (item && item.bool()) {
          item.callback();
        }
      });

      for (var x in this.update_ext) {
        this.update_ext[x]();
      }
    }
  }, {
    key: 'reset_draw',
    value: function reset_draw() {
      this.before_draw_ext = function () {};
    }
  }, {
    key: 'disengage',
    value: function disengage() {
      this.drawables = [];
      this.engaged = false;
      this.reset_draw();
    }
  }, {
    key: 'engage',
    value: function engage() {
      this.engaged = true;
    }
  }, {
    key: 'batchDraw',
    value: function batchDraw(drawables) {

      var __gameWindow = this;

      Gamelab.each(drawables, function (ix, item) {

        if (typeof item.draw == 'function') {
          item.draw(__gameWindow.ctx, __gameWindow.camera);
        }
      });
    }
  }, {
    key: 'hasDrawableByPosition',
    value: function hasDrawableByPosition(px, py) {

      for (var x = 0; x < this.drawables.length; x++) {

        var sprite = this.drawables[x];

        if (px >= sprite.position.x && px <= sprite.position.x + sprite.size.x && py >= sprite.position.y && py <= sprite.position.y + sprite.size.y) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: 'splitCurrentWindowToSpriteArray',
    value: function splitCurrentWindowToSpriteArray(sx, sy, frameSizeX, frameSizeY) {

      var sprites = [];

      for (var x = 0; x < frameSizeX; x += sx) {

        for (var y = 0; y < frameSizeY; y += sy) {

          if (!this.hasDrawableByPosition(x, y)) {
            continue;
          }

          var canvas = document.createElement('CANVAS');
          canvas.width = frameSizeX;
          canvas.height = frameSizeY;
          var ctx = canvas.getContext('2d');

          var imageData = this.ctx.getImageData(x, y, sx, sy);
          ctx.putImageData(imageData, 0, 0);

          var sprite = new Gamelab.Sprite(canvas);

          sprite.Position(x, y);

          sprite.Size(sx, sy);

          sprites.push(sprite);
        }
      }

      return sprites;
    }
  }, {
    key: 'draw',
    value: function draw(canvas) {

      if (canvas instanceof HTMLCanvasElement) this.ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);else if ((typeof canvas === 'undefined' ? 'undefined' : _typeof(canvas)) == 'object' && canvas.canvas instanceof HTMLCanvasElement) this.ctx.drawImage(canvas.canvas, canvas.canvas.width, canvas.canvas.height);

      if (this.isPaused()) return;

      var __gameWindow = this;

      if (this.before_draw_ext) {
        this.before_draw_ext();
      }

      Gamelab.each(this.drawables, function (ix, item) {

        if (typeof item.draw == 'function') {
          item.draw(__gameWindow.ctx, __gameWindow.camera);
        }
      });

      if (this.after_draw_ext) {
        this.after_draw_ext();
      }
    }
  }, {
    key: 'defineComplete',
    value: function defineComplete(getComplete) {
      this.getComplete = getComplete;
      return this;
    }
  }, {
    key: 'complete',
    value: function complete() {

      if (this.complete_callback) this.complete_callback();
    }
  }, {
    key: 'onComplete',
    value: function onComplete(completion) {
      this.complete_callback = completion;
      return this;
    }

    /**
     * adds a call before the GameWindow draw()
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'onBeforeDraw',
    value: function onBeforeDraw(f) {

      var boundCall = f.bind(this);

      if (!this.before_draw_ext) this.before_draw_ext = function () {};

      var beforeDraw = this.before_draw_ext.bind(this);

      this.before_draw_ext = function () {
        beforeDraw();
        boundCall();
      };
    }
  }, {
    key: 'removeSelf',
    value: function removeSelf() {
      this.canvas.parentNode.removeChild(this.canvas);
      return this;
    }

    /**
     * adds a call after the GameWindow draw()
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'onAfterDraw',
    value: function onAfterDraw(f) {

      var boundCall = f.bind(this);

      if (!this.after_draw_ext) this.after_draw_ext = function () {};

      var afterDraw = this.after_draw_ext.bind(this);

      this.after_draw_ext = function () {
        afterDraw();
        boundCall();
      };
    }

    /**
     * sets the size of the GameWindow
     *
     * @function
     * @param {integer} w the width of the GameWindow
     * @param {integer} h the HEIGHT of the GameWindow
     * @memberof GameWindow
     **********/

  }, {
    key: 'Size',
    value: function Size(w, h, isAbsoluteSize) {
      //call with no args to fill to browser-window-size;

      w = w || this.canvas.parentNode.clientWidth;

      h = h || this.canvas.parentNode.clientHeight;

      var c = this.canvas;

      if (c) {
        c.setAttribute('width', w);
      };

      if (c) {
        c.setAttribute('height', h);
      };

      Gamelab.WIDTH = w;

      Gamelab.HEIGHT = h;

      this.canvas.width = w;

      this.canvas.height = h;

      this.size = new Gamelab.Vector(w, h);

      this.isAbsoluteSize = isAbsoluteSize || false;

      return this;
    }

    /**
     * adds an object to the GameWindow
     *
     * @function
     * @param {Object} obj the object to be added (Sprite)
     * @param {Boolean} onBottom if true, adds to the bottom of layer-stack in GameWindow
     * @memberof GameWindow
     **********/

  }, {
    key: 'add',
    value: function add(obj) {

      if (obj instanceof Array) {
        var $gw = this;
        obj.forEach(function (o) {
          $gw.add(o);
        });
        return;
      }

      var __inst = this;

      if (obj instanceof Gamelab.Camera) {

        this.camera = obj;
      } else if (obj instanceof Gamelab.GSEvent) {

        if (Gamelab.__running) {

          return console.error('Events can only be added before Gamstack.animate() is called::aka before the main update / loop begins');
        } else {

          obj.apply();
        }
      } else {

        this.drawables.push(obj);
      };

      return obj;
    }

    /**
     * set background-color of GameWindow
     *
     * @function
     * @param {string} c the new background-color for GameWindow
     * @memberof GameWindow
     **********/

  }, {
    key: 'Background',
    value: function Background(c) {
      this.canvas.style.background = c;
      this.canvas.style.backgroundColor = c;
      return this;
    }

    /**
     * removes an object from the GameWindow
     *
     * @function
     * @param {Object} obj the object to be removed (Sprite)
     * @memberof GameWindow
     **********/

  }, {
    key: 'remove',
    value: function remove(obj) {
      var ix = this.drawables.indexOf(obj);
      if (ix >= 0) {
        this.drawables.splice(ix, 1);
      }
    }

    /**
     * removeAll(): removes all drawables
     *
     * @function
     * @param {Object} obj the object to be removed (Sprite)
     * @memberof GameWindow
     **********/

  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.drawables = [];
    }
  }, {
    key: 'has',
    value: function has(obj) {

      var ix = this.drawables.indexOf(obj);

      if (ix >= 0) {
        return true;
      }

      return false;
    }
  }, {
    key: 'removeDeadObjects',
    value: function removeDeadObjects() {

      var $window = this;

      this.drawables.forEach(function (sprite) {

        if (sprite.life <= 0) {
          $window.remove(sprite);
          if (sprite.die_callback) {
            sprite.die_callback();
          }
        }
      });
    }
  }, {
    key: 'cleanup',
    value: function cleanup() {

      this.removeDeadObjects();
    }

    /**
     * begins the animation-loop of GameWindow.
     *
     * @function
     * @param {number} time optional time parameter for usage with Tween
     * @memberof GameWindow
     **********/

  }, {
    key: 'run',
    value: function run() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      if (options.DEV || options.dev) {
        this.start(time);
      } else this.animate(time);
    }
  }, {
    key: 'drawOnce',
    value: function drawOnce() {

      if (!this.engaged) return;

      if (this.frameInterval) {
        frameInterval = this.frameInterval;
      }

      if (this.drawFromWindows instanceof Array) {
        this.drawFromWindows.forEach(function (w) {
          this.draw(w);
        });
        return;
      }

      if (this.getComplete && this.getComplete()) {
        return;
      }

      var __inst = this;

      if (this.__stats) {
        this.__stats.begin();
        this.__statsMS.begin();
        this.__statsMB.update();
      }

      Gamelab.isAtPlay = true;

      this.update();

      if (!this.isPaused()) {
        if (window.TWEEN) TWEEN.update(time);

        if (this.settings.hasOwnProperty('autoClear') && this.settings.autoClear == false) {} else {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.draw();

        if (this.__stats) {
          this.__stats.end();
          this.__statsMS.end();
        }
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.engaged = false;
      this.paused = true;
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      this.engaged = true;
      this.paused = true;
    }
  }, {
    key: 'animate',
    value: function animate(time, frameInterval) {

      if (!this.engaged) return;

      if (this.frameInterval) {
        frameInterval = this.frameInterval;
      }

      if (this.drawFromWindows instanceof Array) {
        this.drawFromWindows.forEach(function (w) {
          this.draw(w);
        });
        return;
      }

      if (this.getComplete && this.getComplete()) {
        return;
      }

      var __inst = this;

      if (typeof frameInterval == 'number') {
        setTimeout(function () {

          requestAnimationFrame(function () {
            __inst.animate();
          });
        }, frameInterval);
      } else {
        requestAnimationFrame(function () {
          __inst.animate();
        });
      }

      if (this.__stats) {
        this.__stats.begin();
        this.__statsMS.begin();
        this.__statsMB.update();
      }

      Gamelab.isAtPlay = true;

      this.update();

      if (!this.isPaused()) {
        if (window.TWEEN) TWEEN.update(time);

        if (this.settings.hasOwnProperty('autoClear') && this.settings.autoClear == false) {} else {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.draw();

        if (this.__stats) {
          this.__stats.end();
          this.__statsMS.end();
        }
      }
    }

    /**
     * begins the animation-loop of GameWindow, with performance Stats shown on-screen
     *
     * @function
     * @memberof GameWindow
     **********/

  }, {
    key: 'start',
    value: function start() {

      if (typeof Stats == 'function') //Stats library exists
        {
          //basic stat animation
          this.__stats = new Stats();
          this.__stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

          this.__stats.dom.style.left = '10%';

          this.__stats.dom.setAttribute('class', 'stat');

          this.canvas.parentNode.appendChild(this.__stats.dom);

          //basic stat animation
          this.__statsMS = new Stats();
          this.__statsMS.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom

          this.__statsMS.dom.style.left = '10%';

          this.__statsMS.dom.style.marginLeft = '90px';

          this.__statsMS.dom.setAttribute('class', 'stat');

          this.canvas.parentNode.appendChild(this.__statsMS.dom);

          //basic stat animation
          this.__statsMB = new Stats();
          this.__statsMB.showPanel(2); // 0: fps, 1: ms, 2: mb, 3+: custom

          this.__statsMB.dom.style.left = '10%';

          this.__statsMB.dom.setAttribute('class', 'stat');

          this.__statsMB.dom.style.marginLeft = '180px';

          this.canvas.parentNode.appendChild(this.__statsMB.dom);
        }

      this.animate();
    }
  }]);

  return GameWindow;
}();

Gamelab.GameWindow = GameWindow;
;
var GSEvent = function GSEvent() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, GSEvent);
};

Gamelab.GSEvent = GSEvent;
Gamelab.Event = GSEvent;

var GSEventLink = function GSEventLink(extendedObject, extendedKey, extendor, extendorKey) {
  _classCallCheck(this, GSEventLink);

  this.parent_id = extendedObject.id, this.child_id = extendor.id, this.parent_key = extendedKey, this.child_key = extendorKey;
};

;

Gamelab.GSEventLink = GSEventLink;
Gamelab.EventLink = GSEventLink;; /**
                                  * Creates a new Module
                                  * @param   {string} uri the uri that the .js file is located at
                                  * @param   {Function} callback=function(){} The callback to call after the module is loaded
                                  * @returns {Module} a Gamelab.Module object
                                  * */

var Module = function () {
  function Module(uri, callback) {
    _classCallCheck(this, Module);

    if (uri) this.load(uri, callback);
  }

  _createClass(Module, [{
    key: 'readFile',
    value: function readFile(fileObject, callback) {
      var reader = new FileReader();
      reader.onload = function (e) {
        callback(reader.result);
      };
      reader.readAsText(fileObject);
    }
  }, {
    key: 'onInstanceCallback',
    value: function onInstanceCallback(uri, callback) {
      var moduleInstance;
      this.load(uri, function (inst) {
        moduleInstance = new inst();
        callback(moduleInstance);
      });
    }
  }, {
    key: 'load',
    value: function load(uri, callback) {

      Gamelab.modules = Gamelab.modules || [];

      var __object = this;
      this.uri = uri;
      callback = callback || function () {};
      callback = callback.bind(this);

      var script = document.createElement('SCRIPT'),
          executeNow = false;

      for (var x = 0; x < Gamelab.modules.length; x++) {
        if (Gamelab.modules[x].uri == uri) {
          callback(Gamelab.modules[x].construct);
          return Gamelab.modules[x];
        }
      }

      if (uri.toLowerCase().endsWith('.js')) {
        script.src = uri;
      } else {
        //assumed to be raw value
        var data = uri;
        executeNow = true;
        script.appendChild(document.createTextNode(data));
      }
      //be sure the window.module is set to new {}
      window.module = window.module || {};
      //define onload fxn
      script.onload = function () {
        var construct = window.module.exports;
        __object.construct = __object.lib = construct;
        callback(construct, uri);
      };
      if (executeNow) {
        setTimeout(function () {
          var construct = window.module.exports;
          callback(construct, uri);
        }, 250);
      }
      //append to the document

      Gamelab.modules.push(__object);

      document.head.appendChild(script);
    }
  }]);

  return Module;
}();

;

Gamelab.Module = Module;

var Code = function () {
  function Code() {
    _classCallCheck(this, Code);
  }

  _createClass(Code, [{
    key: 'run',
    value: function run(callback) {
      if (typeof callback == 'string') {
        callback = new Function('return function run(){' + callback + '}();');
      }
      //get string contents after the name
      var fxnString = callback.toString().split('()')[1];
      //add generic name
      fxnString = '\n function run()' + fxnString;
      var script = document.createElement('SCRIPT');
      script.innerHTML = fxnString + '\n  run();';
      document.head.appendChild(script);
    }
  }, {
    key: 'loadAndRun',
    value: function loadAndRun(uri, callback) {
      var __object = this;
      this.uri = uri;
      callback = callback || function () {};
      callback = callback.bind(this);
      var script = document.createElement('SCRIPT');
      script.src = uri;
      //be sure the window.module is set to new {}
      window.module = window.module || {};

      //define onload fxn
      script.onload = function () {
        var construct = window.module.exports;
        var value;
        if (typeof construct == 'function') {
          value = window.module.exports();
        }
        callback(value, construct, uri);
      };
      //append to the document
      document.head.appendChild(script);
    }
  }]);

  return Code;
}();

Code.call = Code.run;
Code.loadAndCall = Code.loadAndRun;
Gamelab.Code = Code;

Gamelab.ScopeInterface = function (scope) {
  var testInterface = document.createElement('div');
  testInterface.style.position = 'fixed';
  testInterface.style.display = 'block';
  testInterface.style.top = '58px';
  testInterface.style.right = '4%';
  testInterface.style.width = '40%';
  testInterface.style.height = '40%';
  testInterface.style.zIndex = '9999';
  testInterface.style.padding = '7px';
  testInterface.style.background = '#222';
  testInterface.style.border = '1px solid lightgrey';
  var testInput = document.createElement('textarea');
  testInput.style.backgroundColor = '#000';
  testInput.style.height = '80%';
  testInput.style.width = '96%';
  testInput.style.color = 'lightgrey';
  var submitRow = document.createElement('span');
  var submit = document.createElement('button');
  submit.style.backgroundColor = '#222';
  submit.style.color = 'lightgrey';
  submit.style.border = '1px solid lightgrey';
  submit.style.marginTop = '4px';
  submitRow.appendChild(submit);
  submit.innerText = 'Run Code';

  submit.onclick = function () {
    console.log('testing-interface-value:' + testInput.value);
    var value = testInput.value;
    new Gamelab.Code().run(value);
  };

  testInterface.appendChild(testInput);
  testInterface.appendChild(submit);
  document.body.appendChild(testInterface);
};
;

var Mouse = function () {
  function Mouse(domElement) {
    _classCallCheck(this, Mouse);

    this.position = new Gamelab.Vector(0, 0);
    this.domElement = domElement.domElement || domElement;
  }

  _createClass(Mouse, [{
    key: 'onMouseMove',
    value: function onMouseMove(call) {
      var $mouse = this;
      this.domElement.addEventListener('mousemove', function (evt) {
        $mouse.position = new Gamelab.Vector(evt.clientX, evt.clientY);
        call.bind($mouse)($mouse.position.x, $mouse.position.y);
      });
      return this;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(call) {
      var $mouse = this;
      this.domElement.addEventListener('mouseup', function (evt) {
        call.bind($mouse)(true);
      });
      return this;
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(call) {
      var $mouse = this;
      this.domElement.addEventListener('mousedown', function (evt) {
        call.bind($mouse)(false);
      });
      return this;
    }
  }, {
    key: 'onMouseOver',
    value: function onMouseOver(call) {
      var $mouse = this;
      this.domElement.addEventListener('mouseover', function (evt) {
        $mouse.position = new Gamelab.Vector(evt.clientX, evt.clientY);
        call.bind($mouse)($mouse.position.x, $mouse.position.y);
      });
      return this;
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut(call) {
      var $mouse = this;
      this.domElement.addEventListener('mouseout', function (evt) {
        $mouse.position = new Gamelab.Vector(evt.clientX, evt.clientY);
        call.bind($mouse).call($mouse.position.x, $mouse.position.y);
      });
      return this;
    }
  }, {
    key: 'onLeftClick',
    value: function onLeftClick(call) {
      var $mouse = this;
      this.domElement.addEventListener('click', function (evt) {
        evt = evt || window.event;
        if (evt.which == 1) (function () {
          $mouse.position = new Gamelab.Vector(evt.clientX, evt.clientY);
          call.bind($mouse)($mouse.position.x, $mouse.position.y);
        })();
      });
    }
  }, {
    key: 'onRightClick',
    value: function onRightClick(call) {
      var $mouse = this;
      this.domElement.addEventListener('contextmenu', function (evt) {

        (function () {
          $mouse.position = new Gamelab.Vector(evt.clientX, evt.clientY);
          call.bind($mouse)($mouse.position.x, $mouse.position.y);
        })();

        evt.preventDefault();

        return false;
      });
    }
  }, {
    key: 'onMouseWheel',
    value: function onMouseWheel(call) {

      var $mouse = this;

      window.addEventListener("wheel", function (event) {
        var delta = Math.sign(event.deltaY);
        call.bind($mouse)(event.deltaY);
      });
    }
  }, {
    key: 'onMiddleButton',
    value: function onMiddleButton(call) {
      var $mouse = this;
      this.domElement.addEventListener('click', function (evt) {
        evt = evt || window.event;
        if (evt.which == 2) (function () {
          $mouse.position = new Gamelab.Vector(evt.clientX, evt.clientY);
          call.bind($mouse)($mouse.position.x, $mouse.position.y);
        })();
      });
    }
  }]);

  return Mouse;
}();

;

Gamelab.Mouse = Mouse;
;
(function () {
  var OffscreenCanvas = function () {
    function OffscreenCanvas(canvas, x, y) {
      _classCallCheck(this, OffscreenCanvas);

      this.canvas = canvas;
      this.x = x;
      this.y = y;

      this.ctx = this.canvas.getContext('2d');
    }

    _createClass(OffscreenCanvas, [{
      key: 'draw',
      value: function draw(ctx) {
        ctx.draw(this.canvas, this.x, this.y);
      }
    }]);

    return OffscreenCanvas;
  }();

  Gamelab.OffscreenCanvas = OffscreenCanvas;
})();
;

var PixelChopper = function () {
  function PixelChopper(src) {
    _classCallCheck(this, PixelChopper);

    this.chop = new Gamelab.GameImage(src);
    this.canvasChop = this.canvasChop || new Gamelab.OffscreenCanvasRendering(this.chop);
  }

  _createClass(PixelChopper, [{
    key: 'chop',
    value: function chop(src) {

      this.sourceImage = new Gamelab.GameImage(src);
      this.canvasSourceImage = this.canvasSourceImage || new Gamelab.OffscreenCanvasRendering(this.sourceImage);
    }
  }]);

  return PixelChopper;
}();

;

/**
 * Creates an instance of Rectangle.
 * @param   {Gamelab.Vector} min the minimum vector point (x,y)
 * @param   {Gamelab.Vector} max the maximum vector point (x,y)
 *
 * @returns {Rectangle} a Rectangle object
 */

var Vector2Range = function () {
  function Vector2Range(x1, y1, x2, y2) {
    _classCallCheck(this, Vector2Range);

    this.Min(x1, y1);
    this.Max(x2, y2);
  }

  _createClass(Vector2Range, [{
    key: 'Min',
    value: function Min(x, y) {
      this.min = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Max',
    value: function Max(x, y) {
      this.max = new Gamelab.Vector(x, y);
      return this;
    }
  }]);

  return Vector2Range;
}();

;

var VectorBounds = Vector2Range;
Gamelab.VectorBounds = Vector2Range;
Gamelab.Vector2Range = Vector2Range;

/**
 * Takes the min and max vectors plus termPoint ('termination-point'), returns VectorFrameBounds
 *  *use this to define the bounds of an Animation object.
 * @param   {Vector} min the minimum vector point (x,y)
 * @param   {Vector} max the maximum vector point (x,y)
 * @param   {Vector=} termPoint the optional termination vector point (x,y) : defaults to the value of 'max'
 * -While a min and max Gamelab.Vector(x,y) will describe the grid-size of Animation frames,
 * the termPoint will indicate the last frame on-grid for this set of frames --Animation may stop early on the 'grid')
 * @returns {VectorFrameBounds} a VectorFrameBounds object
 */

//traverse a grid from min(x,y) toward max(x,y)
//stop or repeat at the termPoint(x,y)

var VectorFrameBounds = function VectorFrameBounds(min, max, termPoint) {
  _classCallCheck(this, VectorFrameBounds);

  this.min = min;
  this.max = max;
  this.termPoint = termPoint || new Gamelab.Vector(this.max.x, this.max.y, this.max.z);
};

;

Gamelab.VectorFrameBounds = VectorFrameBounds;
; /**
  * Renderable : consistent base-type for graphic-objects
  * @param   {Object} args the object of arguments
  * @returns {Renderable} a Gamelab.Renderable object.
  * */

var Renderable = function Renderable() {
  //  Gamelab.FeatureInject(this, args);

  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Renderable);
};

/**
 * A game-image object based on HTMLImage element. Creates GameImage, attaches gameImage.domElement --an instance of HTMLImageElement
 * @param   {string} src the sourcePath of the image-file.
 * @returns {GameImage} a Gamelab.GameImage object.
 * */

var GameImage = function (_Renderable) {
  _inherits(GameImage, _Renderable);

  function GameImage() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var onCreate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      I('image: used default fxn argument:');
    };

    _classCallCheck(this, GameImage);

    var _this2 = _possibleConstructorReturn(this, (GameImage.__proto__ || Object.getPrototypeOf(GameImage)).call(this, src));

    if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) == 'object' && !(src instanceof HTMLCanvasElement)) {
      var _ret;

      return _ret = src, _possibleConstructorReturn(_this2, _ret);
    }

    if (typeof src == 'string') {
      _this2.domElement = document.createElement('IMG');
      _this2.domElement.src = src;
    } else if (src instanceof HTMLCanvasElement) {
      _this2.domElement = src;
    }

    _this2.domElement.onerror = function () {
      this.__error = true;
      //console.dev('--image error');
    };

    return _this2;
  }

  return GameImage;
}(Renderable);

;

Gamelab.GameImage = GameImage;
;

var Script = function () {
  function Script(uri, callback) {
    _classCallCheck(this, Script);

    this.src = uri || '';

    if (uri && callback) {
      this.load(uri, callback);
    } else {
      console.info('Created Script() without uri + callback --1st and 2nd arguments. To use object call script.load()');
    }
  }

  _createClass(Script, [{
    key: 'load',
    value: function load(uri, callback) {

      var __object = this;

      callback = callback || function () {};

      callback.bind(this);

      var script = document.createElement('SCRIPT');
      script.src = uri;

      //define onload fxn
      script.onload = function () {

        var construct = module.exports;
        callback(construct);
      };

      //append to the document
      document.head.appendChild(script);
    }
  }]);

  return Script;
}();

;

Gamelab.Script = Script;

var Scriptable = function () {
  function Scriptable(object, siblings) {
    _classCallCheck(this, Scriptable);

    this.object = object;

    this.siblings = siblings;
  }

  _createClass(Scriptable, [{
    key: 'Object',
    value: function Object(object) {
      this.object = object;
      return this;
    }
  }, {
    key: 'load',
    value: function load(url, callback) {

      var __object = this;

      callback = callback || function () {};

      callback = callback.bind(this);

      var script = document.createElement('SCRIPT');
      script.src = url;

      //define onload fxn
      script.onload = function () {

        var construct = window.module.exports;

        var MOD = construct(__object.object, __object.siblings);

        callback.bind(__object).call(MOD, __object.object, __object.siblings);
      };

      //append to the document
      document.head.appendChild(script);
    }
  }]);

  return Scriptable;
}();

;

Gamelab.Scriptable = Scriptable;
;

var StateAction = function () {
  function StateAction() {
    _classCallCheck(this, StateAction);
  }

  _createClass(StateAction, [{
    key: 'Name',
    value: function Name(name) {
      this.name = name;
      return this;
    }
  }, {
    key: 'Parent',
    value: function Parent(p) {
      this.parent = p;
      return this;
    }
  }, {
    key: 'Options',
    value: function Options(options) {
      this.options = options;
      this.stateOptions = {};
      this.reset();
      return this;
    }
  }, {
    key: 'Call',
    value: function Call(engageCallback) {
      this.engage = this.commit = engageCallback;
      return this;
    }
  }, {
    key: 'set',
    value: function set(optionKey, optionValue) {
      this.stateOptions[optionKey] = optionValue;
      return this;
    }
  }, {
    key: 'get',
    value: function get(optionKey) {
      return this.stateOptions[optionKey];
    }
  }, {
    key: 'reset',
    value: function reset() {
      //reset the options to original values
      for (var x in this.options) {
        this.stateOptions[x] = this.options[x];
      }
    }
  }, {
    key: 'disengage',
    value: function disengage() {
      //set the parent's state to '_NEXT_'
      this.parent.state = '_NEXT_';
      this.reset();
    }
  }, {
    key: 'commit',
    value: function commit() {
      //default as empty function
    }
  }, {
    key: 'engage',
    value: function engage() {
      //same as calling commit()
    }
  }]);

  return StateAction;
}();

Gamelab.StateAction = StateAction;
;
var State = function () {
  function State(object, stateName, fallbackState) {
    _classCallCheck(this, State);

    this.object = object;
    this.stateName = stateName;
    //list of boolean fxns which cancel the state
    this.triggers = [];
    //fxn to be called when triggered
    this.triggerCall = function () {};
    //list of boolean fxns which trigger the state
    this.cancellators = [];
    //fxn to be called when cancelled
    this.cancelCall = function () {};
    //error-protection: use limit on number of list-Members
    this.listLimit = 10;
    this.fallbackState = fallbackState;
  }

  _createClass(State, [{
    key: 'onTrigger',
    value: function onTrigger(call) {
      this.triggerCall = call || function () {
        clog('--empty trigger call');
      };
    }
  }, {
    key: 'onCancel',
    value: function onCancel(call) {
      this.cancelCall = call || function () {
        clog('--empty cancel call');
      };
    }
  }, {
    key: 'defineTrigger',
    value: function defineTrigger(triggerFxn) {
      this.triggers.push(triggerFxn);
      return this;
    }
  }, {
    key: 'defineCancellator',
    value: function defineCancellator(cancelFxn) {
      this.cancellators.push(cancelFxn);
      return this;
    }
  }, {
    key: 'isTriggered',
    value: function isTriggered() {
      for (var x = 0; x < this.triggers.length; x++) {
        if (this.triggers[x]()) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'isCancelled',
    value: function isCancelled() {
      for (var x = 0; x < this.triggers.length; x++) {
        if (this.cancellators[x]) {
          return true;
        }
      }
      return false;
    }
  }]);

  return State;
}();

var StateMachine = function () {
  function StateMachine() {
    _classCallCheck(this, StateMachine);

    this.states = [];
  }

  _createClass(StateMachine, [{
    key: 'add',
    value: function add(state) {
      this.states.push(state);
    }
  }]);

  return StateMachine;
}();

;

var Texel = function Texel(x, y, w, h) {
  _classCallCheck(this, Texel);

  this.size = new Gamelab.Vector(w, h);
  this.x = x;
  this.y = y;
};

var TexelArray = function () {
  function TexelArray(texels, onCreate) {
    _classCallCheck(this, TexelArray);

    onCreate = onCreate || function () {};

    var array = this;

    texels = texels || [];

    this.texels = [];

    this.id = Gamelab.create_id();

    var $object = this;

    texels.forEach(function (v) {

      $object.texels.push(v);
    });

    onCreate.bind(this).call();
  }

  _createClass(TexelArray, [{
    key: 'Clone',
    value: function Clone(object) {
      if (object.texels instanceof Array) return new Gamelab.TexelArray(object.texels);else return console.error('needs array-type@ on 1st arg: .texels');
    }
  }, {
    key: 'push',
    value: function push(item) {
      this.texels.push(item);
    }
  }, {
    key: 'add',
    value: function add(item) {
      this.texels.push(item);
    }
  }, {
    key: 'FromData',
    value: function FromData(data) {
      var jsonData = JSON.parse(JSON.stringify(data));
      return new TexelArray(jsonData.texels);
    }
  }]);

  return TexelArray;
}();

Gamelab.Texel = Texel;
Gamelab.TexelArray = TexelArray;
;var ThreeJsMath = {
  getScreenXY: function getScreenXY(position, camera, div) {
    var pos = position.clone();
    var projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
    projScreenMat.multiplyVector3(pos);
    var offset = this.findOffset(div);
    return {
      x: (pos.x + 1) * div.width / 2 + offset.left,
      y: (-pos.y + 1) * div.height / 2 + offset.top
    };
    return offset;
  },
  findOffset: function findOffset(element) {
    var pos = new Object();
    pos.left = pos.top = 0;
    if (element.offsetParent) {
      do {
        pos.left += element.offsetLeft;
        pos.top += element.offsetTop;
      } while (element = element.offsetParent);
    }
    return pos;
  }
};

Gamelab.ThreeJsMath = ThreeJsMath;

var ThreeJsWindow = function () {
  function ThreeJsWindow(container, threejs) {
    _classCallCheck(this, ThreeJsWindow);

    var THREE = window.THREE || threejs;

    if (!THREE) return console.error('Needs three.js library in window.');

    var scene = this.scene = new THREE.Scene();
    var camera = this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1.0, 5000);
    var renderer = this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    var defaultLight = this.defaultLight = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(defaultLight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.background = new THREE.Color(0xffffff);
    if (typeof container == 'string') {
      container = document.querySelector(container);
    }
    if (container instanceof HTMLCollection) {
      container = container[0];
    }
    if (!(container instanceof HTMLElement)) {
      container = document.body;
    }
    container.appendChild(renderer.domElement);
  }

  _createClass(ThreeJsWindow, [{
    key: 'add',
    value: function add(object) {
      this.scene.add(object);
    }
  }, {
    key: 'animate',
    value: function animate() {
      var $window = this;
      requestAnimationFrame(function () {
        $window.animate();
      });
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: 'start',
    value: function start() {
      this.animate();
    }
  }]);

  return ThreeJsWindow;
}();

Gamelab.ThreeJsWindow = ThreeJsWindow;
var ThreeJSWindow = ThreeJsWindow;
Gamelab.ThreeJSWindow = ThreeJSWindow;
var ThreejsWindow = ThreeJsWindow;
Gamelab.ThreejsWindow = ThreejsWindow;;var Trigonometry = {

  rotatePointsByOrigin: function rotatePointsByOrigin(points, origin, rotation) {
    for (var x = 0; x < points.length; x++) {
      points[x] = this.rotate_from_xy(origin.x, origin.y, points[x].x, points[x].y, typeof rotation == 'number' ? rotation : rotation.x);
    }

    return points;
  },

  getTrianglesByBox: function getTrianglesByBox(box) {
    box.origin = box.origin || new Gamelab.Vector(0, 0, 0);

    var position = box.fullPosition || box.position;

    var point_a1 = position.copy(),
        point_a2 = position.add(box.size.x, 0),
        point_a3 = position.add(box.size.x, box.size.y),
        point_b1 = position.copy(),
        point_b2 = position.add(0, box.size.y),
        point_b3 = position.add(box.size.x, box.size.y);

    var plista = this.rotatePointsByOrigin([point_a1, point_a2, point_a3], box.origin.add(position), box.rotation.negate());

    var plistb = this.rotatePointsByOrigin([point_b1, point_b2, point_b3], box.origin.add(position), box.rotation.negate());

    return [plista, plistb];
  },

  rotate_from_xy: function rotate_from_xy(cx, cy, x, y, angle) {
    var radians = Math.PI / 180 * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = cos * (x - cx) + sin * (y - cy) + cx,
        ny = cos * (y - cy) - sin * (x - cx) + cy;
    return new Gamelab.Vector(nx, ny);
  },

  rotational_speed: function rotational_speed(angle, speed) {
    // Move towards the player
    var radians = angle / 360 * Math.PI * 2.0;
    return new Gamelab.Vector(Math.cos(radians) * speed, Math.sin(radians) * speed);
  },

  find_point_on_circle: function find_point_on_circle(x, y, radius, degrees) {}
};

Gamelab.Trig = Trigonometry;
Gamelab.Trigonometry = Trigonometry;;(function () {
  console.log('Vector class... creating');

  /**
   * Creates a Vector object with x, y, and --optional z.
   * @param   {number} x the x coordinate
   * @param   {number} y the y coordinate
   * @param   {number} z the optional z coordinate
   * @param   {number} r the optional r value
   * @returns {Vector} a Vector object
   */

  function single_numeric_x(x, y, z) {
    return typeof x == 'number' && y == undefined && z == undefined;
  }

  var Vector = function () {
    function Vector(x, y, z, r) {
      _classCallCheck(this, Vector);

      var copied = false;

      if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object' && x.hasOwnProperty('x') && x.hasOwnProperty('y')) //optionally pass vector3
        {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z || 0;

          if (this.z == null) {
            this.z = 0;
          }

          this.valid_check();

          copied = true;
        }

      if (!copied) {

        if (single_numeric_x(x, y, z)) {
          this.x = x;
          this.y = x;
          this.z = x;
        } else {
          if (z == null) {
            z = 0;
          }

          this.x = x;
          this.y = y;
          this.z = z;
          this.r = r;
        }

        this.valid_check();
      }
    }

    _createClass(Vector, [{
      key: 'valid_check',
      value: function valid_check() {
        if (this.x == undefined) {
          this.x = 0;
        }
        if (this.y == undefined) {
          this.y = 0;
        }
        if (this.z == undefined) {
          this.z = 0;
        }
      }
    }, {
      key: 'copy',
      value: function copy() {
        return new Gamelab.Vector(this);
      }
    }, {
      key: 'negate',
      value: function negate() {
        return new Gamelab.Vector(-this.x, -this.y, -this.z);
      }

      /**
       * Subtracts another Vector from this vector and returns a vector for the resulting difference.
       *
       * @function
       * @param {Vector} v the vector to be subtracted from this vector
       * @memberof Vector
       **********/

    }, {
      key: 'sub',
      value: function sub(x, y, z) {
        var v = new Gamelab.Vector(x, y, z);
        return new Gamelab.Vector(this.x - v.x, this.y - v.y, this.z - v.z);
      }

      /**
       * Adds another Vector to this vector and returns a vector for the resulting sum.
       *
       * @function
       * @param {Vector} v the vector to be added to this vector
       * @memberof Vector
       **********/

    }, {
      key: 'add',
      value: function add(x, y, z) {
        var v = new Gamelab.Vector(x, y, z);
        return new Gamelab.Vector(this.x + v.x, this.y + v.y, this.z + v.z);
      }

      /**
       * Multiplies another Vector by this vector and returns a vector for the resulting product.
       *
       * @function
       * @param {Vector} v the vector that this vector will by muliplied by
       * @memberof Vector
       **********/

    }, {
      key: 'mult',
      value: function mult(x, y, z) {
        var v = new Gamelab.Vector(x, y, z);
        return new Gamelab.Vector(this.x * v.x, this.y * v.y, this.z * v.z);
      }

      /**
       * Gets vector of absolute values.
       *
       * @function
       * @param {Vector} v the absolute vector
       * @memberof Vector
       **********/

    }, {
      key: 'abs',
      value: function abs() {
        return new Gamelab.Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
      }

      /**
       * Divides another Vector by this vector and returns a vector for the resulting quotient.
       *
       * @function
       * @param {Vector} v the vector for this vector to be divided by
       * @memberof Vector
       **********/

    }, {
      key: 'div',
      value: function div(x, y, z) {
        var v = new Gamelab.Vector(x, y, z);
        return new Gamelab.Vector(this.x / v.x, this.y / v.y, this.z / v.z);
      }

      /**
       * Rounds this vector to the nearest set of whole numbers and returns the result.
       *
       * @function
       * @memberof Vector
       * @returns {Vector} a Gamelab.Vector object
       **********/

    }, {
      key: 'round',
      value: function round() {
        var multiple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

        var d = multiple;
        if (isNaN(d) || d < 1) {
          d = 1;
        }

        var z = !isNaN(this.z) ? this.z : 0;
        return new Gamelab.Vector(Math.round(this.x * d) / d, Math.round(this.y * d) / d, Math.round(this.z * d) / d);
      }

      /**
       * Floors this vector to the nearest set of whole numbers and returns the result (subtractive-only, an x of 1.7 becomes 1)
       *
       * @function
       * @memberof Vector
       * @returns {Vector} a Gamelab.Vector object
       **********/

    }, {
      key: 'floor',
      value: function floor() {
        var multiple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

        var d = multiple;
        if (isNaN(d) || d < 1) {
          d = 1;
        }

        var z = !isNaN(this.z) ? this.z : 0;
        return new Gamelab.Vector(Math.floor(this.x * d) / d, Math.floor(this.y * d) / d, Math.floor(this.z * d) / d);
      }

      /**
       * Ceils this vector to the nearest set of whole numbers  and returns the result (additive-only, an x of 1.2 becomes 2)
       *
       * @function
       * @memberof Vector
       * @returns {Vector} a Gamelab.Vector object
       **********/

    }, {
      key: 'ceil',
      value: function ceil() {
        var multiple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

        var d = multiple;
        if (isNaN(d) || d < 1) {
          d = 1;
        }

        var z = !isNaN(this.z) ? this.z : 0;
        return new Gamelab.Vector(Math.ceil(this.x * d) / d, Math.ceil(this.y * d) / d, Math.ceil(this.z * d) / d);
      }
    }, {
      key: 'above_zero_xy',
      value: function above_zero_xy() {

        return this.x > 0 && this.y > 0;
      }

      /**
       * Creates new vector, with the negated x,y,z values (-x-y-z), returns the resulting vector
       *
       * @function
       * @memberof Vector
       * @returns {Vector} a Gamelab.Vector object
       **********/

    }, {
      key: 'neg',
      value: function neg() {
        return new Gamelab.Vector(-this.x, -this.y, -this.z);
      }
    }, {
      key: 'seek',
      value: function seek(x, y) {
        var speedValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;

        var targetInc;

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object' && typeof y == 'number') {
          speedValue = y;
          y = undefined;
          targetInc = new Gamelab.Vector(x).sub(this).mult(speedValue);
        } else {
          targetInc = new Gamelab.Vector(x, y).sub(this).mult(speedValue);
        }
        return this.add(targetInc);
      }
    }, {
      key: 'half',
      value: function half() {
        return this.div(2);
      }

      /**
       * An equals-test for vectors. Returns true OR false.
       *
       * @function
       * @memberof Vector
       * @returns {boolean} a true OR false value
       **********/

    }, {
      key: 'equals',
      value: function equals(x, y, z) {
        var v = new Gamelab.Vector(x, y, z);
        return this.x == v.x && this.y == v.y && this.z == v.z;
      }

      /**
       * Gets  the specific distance between this and the argument-vector. --applies to x and y of two vectors. Returns a single number.
       *
       * @function
       * @memberof Vector
       * @returns {number} the specific distance between this and the argument-vector
       **********/

    }, {
      key: 'distance',
      value: function distance(v) {
        var dist = this.sub(v);
        return Math.sqrt(dist.x * dist.x + dist.y * dist.y);
      }
    }, {
      key: 'is_between',
      value: function is_between(v1, v2) {
        //TODO : overlap vectors return boolean

        return this.x >= v1.x && this.x <= v2.x && this.y >= v1.y && this.y <= v2.y && this.z >= v1.z && this.z <= v2.z;
      }

      /**
       * Returns a vector-multiple: the original-size, multiplied by a random between the minFloat and maxFloat arguments.
       *
       * @function
       * @memberof Vector
       * @returns {Vector} the resulting vector.
       **********/

    }, {
      key: 'randomize',
      value: function randomize(minFloat, maxFloat) {
        var random = (Math.random() * (maxFloat - minFloat) + minFloat) * 1000 / 1000;
        return this.mult(random);
      }

      /**
       * Returns a speed vector, based on rotation.
       *
       * @function
       * @param {number} rotation in degrees, 0-360
       * @param {number} speed the level of speed to apply, default being 1
       * @returns {Vector}
       * @memberof Vector
       **********/

    }, {
      key: 'rotationalSpeedPoints',
      value: function rotationalSpeedPoints(rotation, speed) {
        var r = rotation;
        if (isNaN(speed)) {
          speed = 1;
        }
        if ((typeof rotation === 'undefined' ? 'undefined' : _typeof(rotation)) == 'object' && rotation.x) {
          r = rotation.x;
        }

        return new Gamelab.Vector(Math.cos(r * 3.14 / 180) * speed, Math.sin(r * 3.14 / 180) * speed);
      }

      /**
       * Returns the right-handed angle of degrees between two two position-vectors.
         * @memberof Vector
       * @function
       * @param {Vector} p1 the 1st vector-argument
       * @param {Vector} p2 the 2nd vector-argument
       * @returns {number} the resulting angle in degrees.
       **********/

    }, {
      key: 'angleBetween',
      value: function angleBetween(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      }

      //apply minimum value to all values

    }, {
      key: 'min2d',
      value: function min2d() {

        function minimize(object, key1, key2) {
          if (object[key1] < object[key2]) object[key2] = object[key1];

          if (object[key2] < object[key1]) object[key1] = object[key2];
        };

        minimize(this, 'x', 'y');

        return this;
      }

      //apply maximum value to all values

    }, {
      key: 'max2d',
      value: function max2d() {

        function maximize(object, key1, key2) {
          if (object[key1] > object[key2]) object[key2] = object[key1];

          if (object[key2] > object[key1]) object[key1] = object[key2];
        };

        maximize(this, 'x', 'y');

        return this;
      }
    }]);

    return Vector;
  }();

  ;

  var Vector3 = Vector,
      Pos = Vector,
      Size = Vector,
      Position = Vector,
      Vector2 = Vector,
      Rotation = Vector;

  Gamelab.Vector = Vector;

  //synonymous w/ Vector::
  Gamelab.Vector2d = Vector;
  Gamelab.Vector2D = Vector;
  Gamelab.Rotation = Vector;
  Gamelab.Pos = Vector;
  Gamelab.Position = Vector;
  Gamelab.Size = Vector;

  //The above are a list of synonymous expressions for Vector. All of these do the same thing in this library (store and manipulate x,y,z values)

  var VectorMath = {
    rotatePointsXY: function rotatePointsXY(x, y, angle) {

      var theta = angle * Math.PI / 180;

      var point = {};
      point.x = x * Math.cos(theta) - y * Math.sin(theta);
      point.y = x * Math.sin(theta) + y * Math.cos(theta);

      point.z = 0;

      return new Gamelab.Vector(point.x, point.y, point.z);
    }
  };

  Gamelab.VectorMath = VectorMath;
})();
;
var WebGLWindow = function () {
  function WebGLWindow(container) {
    _classCallCheck(this, WebGLWindow);

    if (typeof container == 'string') {
      container = document.querySelector(container);
    }

    this.container = container;
    var canvasBox = document.createElement('div');
    canvasBox.classList.add('control');

    var canvas = document.createElement('CANVAS');

    canvas.style.position = 'relative';
    canvas.style.width = '500px';
    canvas.style.height = '500px';
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.marginTop = '30px';

    var scene = this.scene = new THREE.Scene();
    var camera = this.camera = new THREE.PerspectiveCamera(75, canvasBox.clientWidth / canvasBox.clientHeight, 0.1, 1000);
    var renderer = this.renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    canvasBox.appendChild(renderer.domElement);
    container.append(canvasBox);
  }

  _createClass(WebGLWindow, [{
    key: 'update',
    value: function update(scene, renderer) {
      console.dev_log('updating');
    }
    //animate(): begins the update-interval

  }, {
    key: 'animate',
    value: function animate() {
      var $webgl = this;
      var update = this.update;

      function run() {
        update($webgl.scene, $webgl.renderer);
        requestAnimationFrame(run);
        renderer.render($webgl.scene, $webgl.camera);
      }
      run();
    }
    //start() :: calls animate to begin the update-interval

  }, {
    key: 'start',
    value: function start() {
      this.animate();
    }
  }]);

  return WebGLWindow;
}();

Gamelab.WebGLWindow = WebGLWindow;;(function () {
  console.log('Animation class... creating');

  /**
   *
   * Creates an instance of Animation with one or more Frames.
   *
   * <example-marker data-class='Animation' data-info='Use JQuery fnxs to load content into the div outside of this p-element. Do not use iframe' > </example-marker>
   *
   * @param   {string=} [src] the src-image-path for this Animation
   * @returns {Animation} an Animation object
   *
   * @example
   *
   * //constructor call: Creates a single-frame Animation from src
   * var singleFrameAnime = new Animation('directory/myFile.png');
   *
   * @example
   * //constructor call with chainable function-calls: Creates multi-frame Animation from src, then sets properties with chainable-function-calls.
   * var multiFrameAnime = new Gamelab.GridAnimation('../images/characters/full/spaceman1.png') //constructor is called
   * .FrameSize(130, 130)
   * .FrameBounds(new Gamelab.Vector(9, 0), new Gamelab.Vector(23, 0), new Gamelab.Vector(23, 0))
   * .Seesaw() //The Animation will play back-and-forth repeatedly (cycle through frames forwards, then backwards and so on.
   * .Duration(900); //Animation lasts 900 millis OR just under 1 second
   *
   *  @design
   *
   * //single-responsibility : to define a list of frames, then progress that list of frames with a 'selected_frame' property
   * var singleFrameAnime = new Animation('directory/myFile.png');
   */

  var Animation = function () {
    function Animation() {
      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Animation);

      var args = (typeof src === 'undefined' ? 'undefined' : _typeof(src)) == 'object' ? src : {};
      //Gamelab.Modifiers.informable(this, args);
      /**
       * @property {Vector} frameSize the frameSize of the Animation
       * @memberof Animation
       **********/

      this.frameSize = this.frameSize || new Gamelab.Vector(args.frameSize || new Gamelab.Vector(0, 0));
      this.size = this.size || new Gamelab.Vector(args.size || new Gamelab.Vector(0, 0));

      this.type = 'Animation';

      if (typeof src == 'string' || src instanceof HTMLCanvasElement) {
        this.src = src;
        this.image = new Gamelab.GameImage(src);
        this.init_singleFrame();
      } else if (args instanceof Gamelab.GameImage) {
        //console.log('Animation(): args are an instance of GameImage');
        this.image = args;
      } else if (args instanceof HTMLImageElement) {
        //console.log('Animation(): args was an instance of HTMLImageElement');
        this.image = new Gamelab.GameImage(args);
      } else if (args instanceof Gamelab.GridAnimation) {
        this.image = args.image;
      } else if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) == 'object' && args.src) {
        this.src = args.src;
        this.image = new Gamelab.GameImage(args.src);
      }

      this.min_cix = 0;

      this.visible = args.visible || true;

      if (args.frameBounds && args.frameBounds.min && args.frameBounds.max) {
        /**
         * @property {VectorFrameBounds} frameBounds the frameBounds of the Animation, has three Vectors
         * @memberof Animation
         **********/
        this.frameBounds = new Gamelab.VectorFrameBounds(args.frameBounds.min, args.frameBounds.max, args.frameBounds.termPoint);
      } else {
        this.frameBounds = new Gamelab.VectorFrameBounds(new Gamelab.Vector(0, 0, 0), new Gamelab.Vector(0, 0, 0), new Gamelab.Vector(0, 0, 0));
      }

      this.scale = 1.0;

      this.origin = new Gamelab.Vector(0, 0, 0);
      this.position = new Gamelab.Vector(0, 0);
      this.rotation = new Gamelab.Vector(0, 0, 0);
      this.frameOffset = this.getArg(args, 'frameOffset', new Gamelab.Vector(0, 0, 0));

      this.apply2DFrames();
      this.flipX = this.getArg(args, 'flipX', false);
      this.cix = 0;
      /**
       * @property {Frame} selected_frame the selected_frame of the Animation, a Gamelab.Frame
       * @memberof Animation
       **********/

      this.selected_frame = this.frames[0] || false;
      this.timer = 0;
      this.duration = args.duration || 2000;
      this.seesaw_mode = args.seesaw_mode || false;
      this.reverse_frames = args.reverse_frames || false;
      this.run_ext = args.run_ext || [];
      this.complete_ext = args.complete_ext || [];

      this.Scale(this.scale);
      // this.colorMap = this.createColorMap(5);
    }

    _createClass(Animation, [{
      key: 'Origin',
      value: function Origin(x, y, z) {
        this.origin = new Gamelab.Vector(x, y, z);

        this.frames.forEach(function ($f) {
          $f.origin = new Gamelab.Vector(x, y, z);
        });
        if (this.selected_frame) {
          this.selected_frame.origin = new Gamelab.Vector(x, y, z);
        }
        return this;
      }
    }, {
      key: 'Position',
      value: function Position(x, y, z) {
        this.position = new Gamelab.Vector(x, y, z);

        this.frames.forEach(function ($f) {
          $f.position = new Gamelab.Vector(x, y, z);
        });

        return this;
      }
    }, {
      key: 'Size',
      value: function Size(x, y) {

        this.size = new Gamelab.Vector(x, y);
        this.frames.forEach(function (f) {

          f.Size(x, y);
        });
        return this;
      }
    }, {
      key: 'Bone',
      value: function Bone(b) {
        this.bone = b;
        return this;
      }
    }, {
      key: 'ParentBone',
      value: function ParentBone(b) {
        this.parentBone = b;
        return this;
      }
    }, {
      key: 'Rotation',
      value: function Rotation(x, y, z) {

        this.rotation = new Gamelab.Vector(x, y, z);

        this.frames.forEach(function ($frame) {
          $frame.Rotation(x, y, z);
        });

        return this;
      }
    }, {
      key: 'add',
      value: function add(frame) {
        this.frames.push(frame);
      }
    }, {
      key: 'Src',
      value: function Src(src) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (typeof src == 'string') {
          console.log('setting GameImage with string:' + src);
          this.src = src;
          this.image = new Gamelab.GameImage(src);
        } else if (src instanceof GameImage) {
          //console.log('Animation(): args are an instance of GameImage');
          this.image = src;
        } else if (src instanceof HTMLImageElement) {
          //console.log('Animation(): args are an instance of HTMLImageElement');
          this.image = new Gamelab.GameImage(src);
        }

        if (!options.frameBounds) this.init_singleFrame();

        return this;
      }
    }, {
      key: 'Scale',
      value: function Scale(s) {
        this.scale = s;
        if (this.image && this.image.domElement && this.image.domElement.width > 0) {
          this.size = new Gamelab.Vector(this.image.domElement.width * s, this.image.domElement.height * s).round();
          this.Size(this.size);
        }
        if (this.frames instanceof Array) this.frames.forEach(function (f) {
          f.Scale(s);
        });
        return this;
      }
    }, {
      key: 'Size',
      value: function Size(x, y, z) {
        this.size = new Gamelab.Vector(x, y, z);
        this.frames.forEach(function (f) {
          f.size = new Gamelab.Vector(x, y, z);
        });
        return this;
      }
    }, {
      key: 'Image',
      value: function Image(src) {

        if (typeof src == 'string') {
          //console.log('setting GameImage with string:' + src);
          this.src = src;
          this.image = new Gamelab.GameImage(src);
        } else if (src instanceof Gamelab.GameImage) {
          //console.log('Animation(): args are an instance of GameImage');
          this.image = src;
        } else if (src instanceof HTMLImageElement) {
          console.log('Animation(): args was an instance of HTMLImageElement');

          this.image = new Gamelab.GameImage(src);
        }
        this.init_singleFrame();
        return this;
      }

      /**
       * sets this Animation to a single-frame-animation, from existing image
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'init_singleFrame',
      value: function init_singleFrame() {

        var $anime = this;

        $anime.load_call = $anime.load_call || function () {};

        this.image.domElement.onload = function () {

          //alert('Anime loaded');

          //first run callback assigned by the api-fxns
          $anime.load_call();

          if ($anime.frameSize.x == 0 && !$anime.__isInit) //indicates zero frame size
            $anime.FrameSize($anime.image.domElement.width, $anime.image.domElement.height).FrameBounds(new Gamelab.Vector(0, 0), new Gamelab.Vector(0, 0));

          if ($anime.size.x == 0 && !$anime.__isInit) //indicates zero size
            $anime.Size($anime.frameSize.mult(new Gamelab.Vector($anime.scale, $anime.scale)));

          if (!$anime.__isInit) $anime.apply2DFrames();
        };
        Gamelab.log('Animation():set single-frame animation');
        return this;
      }

      /*****
       * Overridable / Extendable functions
       * -allows stacking of external object-function calls
       ******/

      /**
       * Provides a function to be called when this Animation.image loads.
       *
       * @function
       * @params {Function} call the function to be called on load
       * @memberof Animation
       **********/

    }, {
      key: 'onLoad',
      value: function onLoad(call) {

        var $anime = this;
        call = call || function () {};

        this.load_call = call;

        this.image.domElement.onload = function () {

          call.bind($anime).call();
        };
      }

      /**
       * Provides a function to be called whenever this Animation starts. Function should run every time the Animation reaches frame-index 0
       *
       * @function
       * @params {Function} call the function to be called on start
       * @memberof Animation
       **********/

    }, {
      key: 'onRun',
      value: function onRun(call) {

        if (this.run_ext.indexOf(call) == -1) {
          this.run_ext.push(call.bind(this));
        }
      }

      /**
       * Provides a function to be called whenever this Animation completes. Function should run every time the Animation reaches it's last frame-index.
       *
       * @function
       * @params {Function} call the function to be called on complete
       * @memberof Animation
       **********/

    }, {
      key: 'onComplete',
      value: function onComplete(call) {

        if (this.complete_ext.indexOf(call) == -1) {
          this.complete_ext.push(call.bind(this));
        }
      }

      /**
       * Provides a single and only function to be called whenever this Animation completes. Function should run every time the Animation reaches it's last frame-index.
       *
       * @function
       * @params {Function} call the function to be called on complete
       * @memberof Animation
       **********/

    }, {
      key: 'soleComplete',
      value: function soleComplete(call) {
        this.complete_ext = [];
        if (this.complete_ext.indexOf(call) == -1) {
          this.complete_ext.push(call.bind(this));
        }
      }
    }, {
      key: 'call_on_run',
      value: function call_on_run() {
        //call any function extension that is present
        for (var x = 0; x < this.run_ext.length; x++) {
          this.run_ext[x](this);
        }
      }
    }, {
      key: 'call_on_complete',
      value: function call_on_complete() {
        //call any function extension that is present
        for (var x = 0; x < this.complete_ext.length; x++) {
          this.complete_ext[x](this);
        }
      }
    }, {
      key: 'Visible',
      value: function Visible(v) {
        this.visible = v;
        return this;
      }
    }, {
      key: 'FrameSize',
      value: function FrameSize(w, h) {
        this.frameSize = new Gamelab.Vector(w, h);
        this.__isInit = true;
        this.apply2DFrames();
        return this;
      }
    }, {
      key: 'Hang',
      value: function Hang() {
        this._hang = true;
        return this;
      }
    }, {
      key: 'ResetHang',
      value: function ResetHang() {
        this._hang = false;
        this.cix = this.min_cix;
      }
    }, {
      key: 'FrameBounds',
      value: function FrameBounds(min, max, termPoint) {
        if (max && !termPoint) {
          termPoint = max;
        }
        this.frameBounds = new Gamelab.VectorFrameBounds(new Gamelab.Vector(min), new Gamelab.Vector(max), termPoint);
        this.__isInit = true;
        this.apply2DFrames();
        return this;
      }

      //4 ways of doing an animation:
      //Verbatim(): each frame is specifically defined

    }, {
      key: 'Verbatim',
      value: function Verbatim() {}
      //Single(): single frame from src image

    }, {
      key: 'Single',
      value: function Single() {
        this.SingleFrame();
        return this;
      }
      //ByCanvas(): what's on the canvas at any time is what you get

    }, {
      key: 'ByCanvas',
      value: function ByCanvas() {}

      //GridFrame(): Frames are laid out evenly

    }, {
      key: 'GridFrame',
      value: function GridFrame(x1, y1, x2, y2, xFinal, yFinal) {
        var maxFrame;

        if (typeof xFinal == 'number' && typeof yFinal == 'number') maxFrame = new Gamelab.Vector(xFinal, yFinal);

        this.frameBounds = new Gamelab.VectorFrameBounds(new Gamelab.Vector(x1, y1), new Gamelab.Vector(x2, y2), maxFrame);
        this.__isInit = true;
        this.apply2DFrames();
        return this;
      }
    }, {
      key: 'FrameOffset',
      value: function FrameOffset(x, y) {
        this.frameOffset = new Gamelab.Vector(x, y);
        return this;
      }

      //X ways of animating:
      //Seesaw: animate back and forth across frame-sequence

    }, {
      key: 'Seesaw',
      value: function Seesaw() {
        if (!this.seesaw_mode) {
          this.seesaw_mode = true;
        }
        return this;
      }

      //Reverse: animate in reverse

    }, {
      key: 'Reverse',
      value: function Reverse() {
        this.ReverseFrames();
        return this;
      }
    }, {
      key: 'Lock',
      value: function Lock() {
        this.locked = true;
        return this;
      }
    }, {
      key: 'Unlock',
      value: function Unlock() {
        this.locked = false;
        return this;
      }

      //Forward and loop: first pass is completed, then always loop back to a
      //specific point and end at another point

    }, {
      key: 'LoopAndPass',
      value: function LoopAndPass() {
        var fullPass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var restartFrame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var endFrame = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.length;
      }
    }, {
      key: 'Duration',
      value: function Duration(millis) {
        this.duration = millis;
        return this;
      }

      /**
       * Reverses all frames of the animation. Frames are then expected to run backwards.
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'ReverseFrames',
      value: function ReverseFrames() {
        this.reverse_frames = true;
        return this;
      }

      /**
       * Sets the animation a a single frame / full-image. Use before img is loaded
       *
       * @function
       * @param {Vector} frameSize optional size param
       * @memberof Animation
       **********/

    }, {
      key: 'SingleFrame',
      value: function SingleFrame() {
        this.init_singleFrame();
        return this;
      }
    }, {
      key: 'getArg',
      value: function getArg(args, key, fallback) {

        if (args.hasOwnProperty(key)) {
          return args[key];
        } else {
          return fallback;
        }
      }
    }, {
      key: 'init',
      value: function init() {
        this.apply2DFrames();
        return this;
      }
    }, {
      key: 'apply2DFrames',
      value: function apply2DFrames() {
        this.frames = [];

        if (!this.size) {
          this.Size(this.frameSize.x, this.frameSize.y);
        }

        var fcount = 0;
        var quitLoop = false;

        for (var y = this.frameBounds.min.y; y <= this.frameBounds.max.y; y++) {
          for (var _x35 = this.frameBounds.min.x; _x35 <= this.frameBounds.max.x; _x35++) {

            var framePos = {
              x: _x35 * this.frameSize.x + this.frameOffset.x,
              y: y * this.frameSize.y + this.frameOffset.y
            };

            var f = new Gamelab.Frame().Image(this.image).FramePos(framePos).FrameSize(this.frameSize).Origin(this.origin).Size(this.size || this.frameSize).Position(this.position || framePos);
            f.Rotation(this.rotation);

            this.frames.push(f);

            if (_x35 >= this.frameBounds.termPoint.x && y >= this.frameBounds.termPoint.y) {
              quitLoop = true;
              break;
            }

            fcount += 1;

            if (quitLoop) break;
          }
        }

        this.frames[0] = this.selected_frame = this.frames[0] || new Gamelab.Frame().Image(this.image).FrameSize(this.frameSize).Size(this.frameSize);

        if (this.seesaw_mode) {
          // console.log('Animation: applying seesaw');
          var frames_reversed = this.frames.slice().reverse();
          this.frames.pop();
          this.frames = this.frames.concat(frames_reversed);
        }
        if (this.reverse_frames) {
          this.frames.reverse();
        }
      }
    }, {
      key: 'scaleOf',
      value: function scaleOf(sized_Object) {
        var s = TypeCode.getPreferredPropertyByKey(sized_Object, 'size', 'argument had nested size variable. Using this instead.');
        return s.div(this.frameSize);
      }
    }, {
      key: 'init_colorMap',
      value: function init_colorMap() {
        TypeCode.info('init_colorMap()');

        if (!TypeCode.allDefined([this.image, this.image.domElement])) return [];

        this.canvasObject = this.canvasObject || new Gamelab.OffscreenCanvasRendering(this.image);
        this.colorMap = this.colorMap || this.ColoredPixelMap();
        return this.colorMap;
      }
    }, {
      key: 'init_colorGrid',
      value: function init_colorGrid(spatialDiv) {
        TypeCode.info('init_colorMap()');

        if (!TypeCode.allDefined([this.image, this.image.domElement])) return [];

        this.canvasObject = this.canvasObject || new Gamelab.OffscreenCanvasRendering(this.image);
        this.colorGrid = this.coloGrid || this.ColoredPixelGrid();
        return this.colorGrid;
      }
    }, {
      key: 'forEachPixel',
      value: function forEachPixel(callback) {

        this.init_colorMap();

        this.colorMap.forEach(function (item) {
          callback(item);
        });
      }
    }, {
      key: 'ColoredPixelGrid',
      value: function ColoredPixelGrid() {
        var spatialDiv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5.0;


        var image = this.image.domElement,
            ctx = this.canvasObject.ctx,
            grid = [],
            frameSizeDiv = this.selected_frame.frameSize.div(spatialDiv).round();

        for (var x = 0; x <= image.width; x += frameSizeDiv.x) {
          for (var y = 0; y <= image.height; y += frameSizeDiv.y) {
            // Fetch pixel at current position
            var pixel = ctx.getImageData(x, y, 1, 1);
            // Check that opacity is above zero
            if (pixel.data[3] !== 0) {
              var vector = new Gamelab.Vector(x, y),
                  gridObject = {
                position: vector.sub(frameSizeDiv.div(2.0)),
                size: frameSizeDiv
              };

              grid.push(gridObject);
            }
          }
        }

        return grid;
      }
    }, {
      key: 'ColoredPixelMap',
      value: function ColoredPixelMap() {

        var image = this.image.domElement,
            ctx = this.canvasObject.ctx,
            grid = [],
            frameSizeDiv = this.selected_frame.frameSize.div(this.selected_frame.frameSize).round();

        for (var x = 0; x <= image.width; x += frameSizeDiv.x) {
          for (var y = 0; y <= image.height; y += frameSizeDiv.y) {
            // Fetch pixel at current position
            var pixel = ctx.getImageData(x, y, 1, 1);
            // Check that opacity is above zero
            if (pixel.data[3] !== 0) {
              var vector = new Gamelab.Vector(x, y),
                  gridObject = {
                position: vector.sub(frameSizeDiv.div(2.0)),
                size: frameSizeDiv
              };

              grid.push(gridObject);
            }
          }
        }

        return grid;
      }

      /**
       * Returns the existing ColorMap for this animation.
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'getCurrentPixelMap',
      value: function getCurrentPixelMap(spatialDiv) {

        TypeCode.info('getCurrentPixelMap()');
        var map = [];
        var frame = this.selected_frame;
        var __inst = this;

        this.colorMap = this.init_colorMap();

        for (var x in this.colorMap) {
          var c = this.colorMap[x];

          if (Gamelab.Collision.boxCollide(frame.framePos, frame.frameSize, c.position, c.size)) {
            map.push(c);
          }
        }

        return map;
      }

      /**
       * Sets the frame to a specific array-index.
       *
       * @function
       * @param {number} ix the frame-index to apply.
       * @memberof Animation
       **********/

    }, {
      key: 'setFrame',
      value: function setFrame(ix) {
        this.selected_frame = this.frames[ix];
      }

      /**
       * extends the update of this animation with a new function to be called during the update
       * --repeated calls will extend, (not replace) the update --Allows multiple extensions of the update
       * @function
       * @memberof Animation
       * @param {function} fun the function to be appended to sprite.update
       *
       *  * @example
       * // extend the behavior of your animation
       * myAnime.onUpdate(function(spr)
       *
       *                    console.log('extended update'); //runs automatically whenever animation.update runs
       *
       *                   });
       *
       **********/

    }, {
      key: 'onUpdate',
      value: function onUpdate(fun) {
        fun = fun.bind(this);
        var update = this.update_frame.bind(this);
        var __inst = this;
        this.update_frame = function (__inst) {
          update(__inst);
          fun(__inst);
        };
      }
    }, {
      key: 'soleUpdate',
      value: function soleUpdate(fun) {
        fun = fun.bind(this);
        var __inst = this;
        this.update_frame = function (__inst) {
          fun(__inst);
        };
      }
    }, {
      key: 'update_frame',
      value: function update_frame() {
        this.selected_frame = this.frames[Math.round(this.cix) % this.frames.length];
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.apply2DFrames();
        this.cix = 0;
      }
      /**
       * Applies a continuous animation. Use this in parent-sprite's update if continuous animation is required.
       * Also works as a single call at any time during game-update.
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'run',
      value: function run() {

        if (this.locked) {
          return;
        }

        if (this.__frametype == 'single') {
          return 0;
        }
        this.apply2DFrames();
        this.cix += 1;
        this.update_frame();
      }
      /**
       * animate():: same as run()
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'animate',
      value: function animate() {

        if (this.locked) {
          return;
        }

        if (this.__frametype == 'single') {
          return 0;
        }

        if (!this.applied) {
          this.apply2DFrames();
          this.applied = true;
        }

        if (this.cix % this.frames.length == 0) {
          this.engage();
        }
      }

      /**
       * Engages, or updates the animation for a one full frame-cycle.
       *
       * @function
       * @param {number} duration the number of milliseconds the animation should take.
       * @memberof Animation
       **********/

    }, {
      key: 'engage',
      value: function engage(duration) {

        if (this.locked) {
          return;
        }

        this.call_on_run();
        duration = duration || this.duration || this.frames.length * 20;
        if (this.__frametype == 'single') {
          return 0;
        }

        //note support of min_cix (eg: min_cix of 1 if top-row starts 1 frame later than bottom)
        if (this.cix >= this.frames.length - 1 || this.cix < this.min_cix && !this._hang) {
          this.cix = this.min_cix;
        }
        var __inst = this;

        //we have a target
        this.tween = new TWEEN.Tween(this).easing(__inst.curve || TWEEN.Easing.Linear.None).to({
          cix: this.min_cix + (this.frames.length - 1)
        }, duration).onUpdate(function () {
          //console.log(objects[0].position.x,objects[0].position.y);
          //__inst.cix = Math.ceil(__inst.cix);
          __inst.update_frame();
        }).onComplete(function () {
          //console.log(objects[0].position.x, objects[0].position.y);
          if (!__inst._hang) __inst.cix = __inst.min_cix;
          __inst.call_on_complete();
          __inst.isComplete = true;
          __inst.apply2DFrames();
        });

        if (this.cix == this.min_cix) this.tween.start();
      }
    }, {
      key: 'img_src',
      set: function set(value) {
        this.src = value;
      },
      get: function get() {
        return this.src;
      }
    }]);

    return Animation;
  }();

  ;

  /** @memberof Gamelab */
  Gamelab.GridAnimation = Animation;
  Gamelab.Animation = Animation;

  Gamelab.GridAnimation.continuous = Gamelab.GridAnimation.run; //'continuous is an alternate reference to 'run'.'
  Gamelab.Animation.continuous = Gamelab.Animation.run; //'continuous is an alternate

  Gamelab.GridAnimation.update = Gamelab.GridAnimation.update_frame; //alt ref
  Gamelab.Animation.continue = Gamelab.GridAnimation.run; //'continue is an alternate reference to 'run'.'
})();
;
var Bone = function () {
  function Bone() {
    _classCallCheck(this, Bone);

    this.parent = undefined;
    this.target = undefined;
    this.offset = new Gamelab.Vector(0, 0);
  }

  _createClass(Bone, [{
    key: 'updatePositionRotation',
    value: function updatePositionRotation() {
      //  console.log('Parent-Rotation:' + this.parentAnimation.rotation.x);
      var rotatedOffset = Gamelab.VectorMath.rotatePointsXY(this.offset.x, this.offset.y, this.parent.rotation.x),
          fullPosition = this.parent.position.add(this.parent.origin).sub(this.target.origin).add(rotatedOffset);
      this.target.Position(fullPosition);
      this.RotateTarget(this.target.rotation);
      return fullPosition;
    }
  }, {
    key: 'RotateTarget',
    value: function RotateTarget(x, y, z) {
      this.target.Rotation(x, y, z);
      return this;
    }
  }, {
    key: 'Parent',
    value: function Parent(p) {
      this.parent = p;
      return this;
    }
  }, {
    key: 'Origin',
    value: function Origin(o) {
      this.target.origin = new Gamelab.Vector(o);
      return this;
    }
  }, {
    key: 'Target',
    value: function Target(t) {
      this.target = t;
      return this;
    }
  }, {
    key: 'Offset',
    value: function Offset(o) {
      this.offset = o;
      return this;
    }
  }]);

  return Bone;
}();

Gamelab.Bone = Bone;

var Bone3D = function () {
  function Bone3D() {
    _classCallCheck(this, Bone3D);

    this.parent = undefined;
    this.target = undefined;
    this.offset = new Gamelab.Vector(0, 0);
  }

  _createClass(Bone3D, [{
    key: 'getRotatedOffset',
    value: function getRotatedOffset() {
      //  console.log('Parent-Rotation:' + this.parentAnimation.rotation.x);
      //apply rotation, convert radians to degrees
      if (!this.parent || !this.parent.member) {
        return console.error('cannot update bone3d without parent and parent.member ');
      }

      var scale = this.target.threejsScale;

      var previousOffset = this.parent.rotOffset || new Gamelab.Vector(0, 0, 0);

      var rotatedOffset = Gamelab.VectorMath.rotatePointsXY(this.offset.x, this.offset.y, this.parent.rotation.z),
          targetRotOffset = new Gamelab.Vector(0, 0, 0).add(this.parent.origin).sub(this.target.origin).add(rotatedOffset);
      var rotOffset = targetRotOffset;
      return rotOffset;
    }
  }, {
    key: 'Parent',
    value: function Parent(p) {
      this.parent = p;
      return this;
    }
  }, {
    key: 'Target',
    value: function Target(t) {
      this.target = t;
      return this;
    }
  }, {
    key: 'Offset',
    value: function Offset(o) {
      this.offset = o;
      return this;
    }
  }]);

  return Bone3D;
}();

Gamelab.Bone3D = Bone3D;
var Bone3d = Bone3D;
Gamelab.Bone3D = Bone3D;

var BoneState = function BoneState(boneList) {
  _classCallCheck(this, BoneState);

  var states = [];
  boneList.forEach(function (bone) {
    states.push({
      bone: bone,
      offset: new Gamelab.Vector(),
      rotation: new Gamelab.Vector(),
      size: new Gamelab.Vector()
    });
  });
};

Gamelab.BoneState = BoneState;
;

var Box2D = function () {
  function Box2D(pos, size) {
    _classCallCheck(this, Box2D);

    this.Position(pos | 0);
    this.Size(size | 0);
  }

  _createClass(Box2D, [{
    key: 'Position',
    value: function Position(x, y) {
      this.position = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Size',
    value: function Size(x, y) {
      this.size = new Gamelab.Vector(x, y);
      return this;
    }
  }]);

  return Box2D;
}();

Gamelab.Box2D = Box2D;
; /**
  * returns BoolEvent --allows code to run whenever a conditional-function returns true
  * @param   {onBool} onBool the function to be tested each update
  * @param   {call} call the function to be called when onBool returns true;

  * @returns {BoolEvent} a Gamelab.BoolEvent object
  */

var BooleanEvent = function (_GSEvent) {
  _inherits(BooleanEvent, _GSEvent);

  function BooleanEvent(onBool, callback) {
    _classCallCheck(this, BooleanEvent);

    var _this3 = _possibleConstructorReturn(this, (BooleanEvent.__proto__ || Object.getPrototypeOf(BooleanEvent)).call(this, {}));

    _this3.bool = onBool || function () {
      console.info('CustomBoolEvent():needs .on function(){}. --Add this as 1st argument or via chainable On() function returning bool argument');
    };
    /*Defaults to false to avoid broken code*/
    _this3.callback = callback || function () {
      console.info('CustomBoolEvent():needs .callback function(){} --Add this as 2nd argument or via chainable Call() function');
    };
    Gamelab.gs_events.push(_this3);
    return _this3;
  }

  /**
   * applies a boolFunction to be tested for true each update
   * @param   {boolFunction} boolFunction the function to be tested each update --replaces the value of boolEvent.onBool
     * @returns {BoolEvent} the current instance of BoolEvent, reference to 'this' keyword
   */

  _createClass(BooleanEvent, [{
    key: 'On',
    value: function On(boolFunction) {
      this.bool = boolFunction;
      return this;
    }

    /**
     * applies a callback to be called whenever the onBool function returns true
     * @memberof BoolEvent
     * @param   {callbackFunction} callbackFunction the function to be called --replaces the value of boolEvent.callback
       * @returns {BoolEvent} the current instance of BoolEvent, reference to 'this' keyword
     */

  }, {
    key: 'Call',
    value: function Call(callbackFunction) {
      this.callback = callbackFunction || this.callback || function () {};
      return this;
    }
  }]);

  return BooleanEvent;
}(GSEvent);

;

BooleanEvent.Boolean = BooleanEvent.Boolean = BooleanEvent.On;
Gamelab.BooleanEvent = BooleanEvent;;
var CollisionEvent = function (_GSEvent2) {
  _inherits(CollisionEvent, _GSEvent2);

  function CollisionEvent() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CollisionEvent);

    return _possibleConstructorReturn(this, (CollisionEvent.__proto__ || Object.getPrototypeOf(CollisionEvent)).call(this, args));
  }

  /**
   * applies objects and siblings to be compared for the CollisionEvent instance
   * @memberof CollisionEvent
   * @param   {Array} objects the main-objects for collision processing
   * @param   {Array} siblings the comparable-objects for collision processing
   * @returns {CollisionEvent} the current instance of CollisionEvent, reference to 'this' keyword
   */

  _createClass(CollisionEvent, [{
    key: 'OnCollision',
    value: function OnCollision(objects, siblings) {
      this.objects = TypeCode.arrayWrap(objects || this.objects || []);
      this.siblings = TypeCode.arrayWrap(siblings || this.siblings || []);
      return this;
    }

    /**
     * applies a callback to be called whenever the onBool function returns true
     * @memberof CollisionEvent
     * @param   {callbackFunction} callbackFunction the function to be called --replaces the value of collisionEvent.callback
       * @returns {CollisionEvent} the current instance of CollisionEvent, reference to 'this' keyword
     */

  }, {
    key: 'Call',
    value: function Call(callbackFunction) {
      this.callback = callbackFunction || this.callback || function () {};
      var $collision = this;
      this.objects.forEach(function ($obj) {
        $obj.onUpdate(function () {
          var $sprite = this;
          $collision.siblings.forEach(function ($sib) {
            if (Gamelab.Collision.spriteBoxCollide($sprite, $sib)) {
              $collision.callback($sprite, $sib);
            }
          });
        });
      });

      return this;
    }
  }]);

  return CollisionEvent;
}(GSEvent);

;

Gamelab.CollisionEvent = CollisionEvent;
Gamelab.BoxCollisionEvent = CollisionEvent;; /**
                                             * Creates an instance of InputEvent
                                             * <info-bit> Gamelab.InputEvent runs a callback function when a specified input is triggered</info-bit>
                                             *
                                             * <tip is="p">Instead of calling
                                             *
                                             * @param   {Object} args object of arguments
                                             * @param   {number} args.btnix the index of controller-button to be applied
                                             * @param   {number} args.gpix the index of pc-gamepad --the 1st gamepad will have index 0
                                             * @param   {number} args.stickix the controller-stick-index to be applied
                                             * @param   {Array} args.keys array of strings for keys to be applied
                                             * @param   {Function} args.callback the function to call when InputEvent is triggered
                                             * @returns {Gamelab.InputEvent} a Gamelab.InputEvent object
                                             */

var InputEvent = function (_GSEvent3) {
  _inherits(InputEvent, _GSEvent3);

  function InputEvent(args) {
    _classCallCheck(this, InputEvent);

    var _this5 = _possibleConstructorReturn(this, (InputEvent.__proto__ || Object.getPrototypeOf(InputEvent)).call(this, args));

    var btnix = args.btnix || args.button_ix || false,
        gpix = args.gpix || args.gamepad_ix || 0,
        callback = args.callback || function () {};

    var six = args.stickix || args.six || args.stick_ix || false;
    var inputKey = six !== false ? 'stick_' + six : btnix !== false ? 'button_' + btnix : false;

    //Keys:
    var keyboardKeys = TypeCode.arrayWrap(args.keys || []);

    //Run the Q() function
    if (keyboardKeys instanceof Array) {
      Gamelab.each(keyboardKeys, function (ix, keyitem) {
        Gamelab.InputSystem.extendKey('key_' + keyitem.toLowerCase(), function () {
          callback(keyitem.toLowerCase());
        });
      });
    }

    if (inputKey && gpix >= 0) {
      Gamelab.GamepadAdapter.on(inputKey, gpix, function (x, y) {
        callback(x, y);
      });
    }
    return _this5;
  }

  return InputEvent;
}(GSEvent);

;

Gamelab.InputEvent = InputEvent;

/**
 *
 * @extends InputEvent
 *
 * Creates an instance of KeyboardEvent
 * <info-bit> Gamelab.KeyboardEvent runs a callback function when keyboard-keys are pressed</info-bit>
 * @param   {Array | string} keys the Array of keys or single string-key for this event
 * @param   {Function} callback the callback-function to be called when this event is triggered

 * @returns {Gamelab.KeyboardEvent}
 */

var KeyboardEvent = function (_InputEvent) {
  _inherits(KeyboardEvent, _InputEvent);

  function KeyboardEvent() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : keys instanceof Array ? keys : [keys];
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    _classCallCheck(this, KeyboardEvent);

    var _this6 = _possibleConstructorReturn(this, (KeyboardEvent.__proto__ || Object.getPrototypeOf(KeyboardEvent)).call(this, {}));

    _this6.keys = keys;
    _this6.callback = callback;
    return _this6;
  }

  _createClass(KeyboardEvent, [{
    key: 'init',
    value: function init() {
      var keyboardKeys = this.keys;
      var __inst = this;

      if (keyboardKeys instanceof Array) {
        Gamelab.each(keyboardKeys, function (ix, keyitem) {
          Gamelab.InputSystem.extendKey('key_' + keyitem.toLowerCase(), function () {
            __inst.callback(keyitem.toLowerCase());
          });
        });
      }
    }
  }, {
    key: 'Keys',
    value: function Keys() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.keys = TypeCode.arrayWrap(keys);
      return this;
    }
  }, {
    key: 'Call',
    value: function Call() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.callback = callback;
      this.init();
      return this;
    }
  }]);

  return KeyboardEvent;
}(InputEvent);

;

Gamelab.KeyboardEvent = KeyboardEvent;

/**
 *
 * @extends InputEvent
 *
 * Creates an instance of GamepadEvent
 * <info-bit> Gamelab.GamepadEvent runs a callback function when any specified gamepad-buttons or gamepad-sticks are pressed</info-bit>
 * @param   {Array | string} gamepadKeys the Array of gamepadKeys or single string-key, representing gamepad-buttons or gamepad-sticks for this event
 * @param   {Function} callback the callback-function to be called when this event is triggered

 * @returns {Gamelab.GamepadEvent}
 */

var GamepadEvent = function (_InputEvent2) {
  _inherits(GamepadEvent, _InputEvent2);

  function GamepadEvent() {
    _classCallCheck(this, GamepadEvent);

    var _this7 = _possibleConstructorReturn(this, (GamepadEvent.__proto__ || Object.getPrototypeOf(GamepadEvent)).call(this, {}));

    _this7.gps = [0];
    _this7.keys = [];
    _this7.callback = function () {};
    return _this7;
  }

  _createClass(GamepadEvent, [{
    key: 'Gamepads',
    value: function Gamepads() {
      var gps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.gps = TypeCode.arrayWrap(gps);
      return this;
    }
  }, {
    key: 'init',
    value: function init() {
      var gamepadKeys = TypeCode.arrayWrap(this.keys || []);
      var __inst = this;
      Gamelab.GamepadAdapter.on(gamepadKeys, this.gps, function (x, y) {
        __inst.callback(x, y);
      });
    }
  }, {
    key: 'Keys',
    value: function Keys() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.keys = TypeCode.arrayWrap(keys);
      for (var x = 0; x < this.keys.length; x++) {
        if (typeof this.keys[x] == 'number') {
          //must change to a string
          this.keys[x] = this.keys[x] + '';
        }
      }
      return this;
    }
  }, {
    key: 'Call',
    value: function Call() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.callback = callback;
      this.init();
      return this;
    }
  }]);

  return GamepadEvent;
}(InputEvent);

;

Gamelab.GamepadEvent = GamepadEvent;;
var MouseLeftClickEvent = function () {
  function MouseLeftClickEvent(callback) {
    _classCallCheck(this, MouseLeftClickEvent);

    callback = callback || function (x, y) {};

    this.Callback(callback);
  }

  _createClass(MouseLeftClickEvent, [{
    key: 'Callback',
    value: function Callback(cb) {
      Gamelab.InputSystem.extend('leftclick', function (x, y) {
        cb(x, y);
      });
    }
  }]);

  return MouseLeftClickEvent;
}();

;

Gamelab.MouseLeftClickEvent = MouseLeftClickEvent;;
var MouseMoveEvent = function () {
  function MouseMoveEvent(callback) {
    _classCallCheck(this, MouseMoveEvent);

    callback = callback || function (x, y) {};

    this.Callback(callback);
  }

  _createClass(MouseMoveEvent, [{
    key: 'Callback',
    value: function Callback(cb) {
      Gamelab.InputSystem.extend('mousemove', function (x, y) {

        cb(x, y);
      });
    }
  }]);

  return MouseMoveEvent;
}();

;

Gamelab.MouseMoveEvent = MouseMoveEvent;;
var MousePosEvent = function () {
  function MousePosEvent(callback) {
    _classCallCheck(this, MousePosEvent);

    callback = callback || function (x, y) {};

    this.Callback(callback);
  }

  _createClass(MousePosEvent, [{
    key: 'Callback',
    value: function Callback(cb) {
      Gamelab.InputSystem.extend('mousepos', function (x, y) {
        cb(x, y);
      });
    }
  }]);

  return MousePosEvent;
}();

;

Gamelab.MousePosEvent = MousePosEvent;;
var MouseRightClickEvent = function () {
  function MouseRightClickEvent(callback) {
    _classCallCheck(this, MouseRightClickEvent);

    callback = callback || function (x, y) {};

    this.Callback(callback);
  }

  _createClass(MouseRightClickEvent, [{
    key: 'Callback',
    value: function Callback(cb) {
      Gamelab.InputSystem.extend('rightclick', function (x, y) {
        cb(x, y);
      });
    }
  }]);

  return MouseRightClickEvent;
}();

;

Gamelab.MouseRightClickEvent = MouseRightClickEvent;;(function () {
  console.log('Frame class... creating');

  /**
   * Creates an instance of Frame
   *
   * <info-bit>Gamelab.Frame is called automatically by Gamelab.Sprite and Gamelab.Animation.
   * Gamelab.Frame does not take arguments.
   * It is instantiated, then initilized with chainable function-calls.</info-bit>
   *
   * @returns {Frame}
   *
   * @example
   *
   * var selected_frame = new Gamelab.Frame().Image(gameImage).Size(frameSizeVector);
   */

  var Frame = function () {
    function Frame() {
      _classCallCheck(this, Frame);

      var __inst = this;
      this.framePos = new Gamelab.Vector(0, 0, 0);
      this.frameSize = new Gamelab.Vector(0, 0, 0);
      this.origin = new Gamelab.Vector(0, 0, 0);
      this.position = new Gamelab.Vector(0, 0, 0);
      this.rotation = new Gamelab.Vector(0, 0, 0);
    }

    _createClass(Frame, [{
      key: 'Image',
      value: function Image(src) {
        this.image = new Gamelab.GameImage(src);
        return this;
      }
    }, {
      key: 'onLoad',
      value: function onLoad(fxn) {

        fxn = fxn || function () {};
        fxn = fxn.bind(this);
        this.image.domElement.onload = function () {
          fxn();
        };
      }
    }, {
      key: 'Origin',
      value: function Origin(x, y, z) {
        this.origin = new Gamelab.Vector(x, y, z);
        return this;
      }
    }, {
      key: 'Rotation',
      value: function Rotation(x, y, z) {
        this.rotation = new Gamelab.Vector(x, y, z);
        return this;
      }
    }, {
      key: 'FramePos',
      value: function FramePos(x, y, z) {
        this.framePos = new Gamelab.Vector(x, y, z);
        return this;
      }
    }, {
      key: 'FrameSize',
      value: function FrameSize(x, y, z) {
        this.frameSize = new Gamelab.Vector(x, y, z);
        return this;
      }
    }, {
      key: 'Scale',
      value: function Scale(s) {
        if (this.image && this.image.domElement) {
          this.size = new Gamelab.Vector(Math.round(this.image.domElement.width * s), Math.round(this.image.domElement.height * s));
        }
      }
    }, {
      key: 'StoreOffscreen',
      value: function StoreOffscreen() {

        this.offscreen = this.offscreen || new Gamelab.OffscreenCanvasRendering(this.image);

        for (var x in this.offscreen) {
          if (x == 'ctx' || x == 'canvas') this[x] = this.offscreen[x];
        }

        return this;
      }
    }, {
      key: 'getURL',
      value: function getURL() {
        this.StoreOffscreen();
        return this.offscreen.canvas.toDataURL();
      }
    }, {
      key: 'getColoredPixelGrid',
      value: function getColoredPixelGrid() {
        var unitSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        var ctx = arguments[1];


        var grid = [];

        ctx = ctx || this.ctx;

        var min = this.framePos,
            max = this.framePos.add(this.frameSize);

        for (var x = min.x; x <= max.x; x += unitSize) {
          for (var y = min.y; y <= max.y; y += unitSize) {
            // Fetch pixel at current position
            var pixel = ctx.getImageData(x, y, 1, 1);
            // Check that opacity is above zero
            if (pixel.data[3] != 0) {

              var vector = new Gamelab.Vector(x, y),
                  gridObject = {

                position: vector,

                x: x,
                y: y,

                size: new Gamelab.Vector(unitSize, unitSize),

                pixel: pixel,

                rotation: this.rotation

              };

              grid.push(gridObject);
            }
          }
        }

        return grid;
      }
    }, {
      key: 'getNonColoredPixelGrid',
      value: function getNonColoredPixelGrid() {
        var unitSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        var ctx = arguments[1];


        var grid = [];

        ctx = ctx || this.ctx;

        var min = this.framePos,
            max = this.framePos.add(this.frameSize);

        for (var x = min.x; x <= max.x; x += unitSize) {
          for (var y = min.y; y <= max.y; y += unitSize) {
            // Fetch pixel at current position
            var pixel = ctx.getImageData(x, y, 1, 1);
            // Check that opacity is above zero
            if (pixel.data[3] == 0) {

              var vector = new Gamelab.Vector(x, y),
                  gridObject = {

                position: vector,

                x: x,
                y: y,

                size: new Gamelab.Vector(unitSize, unitSize),

                pixel: pixel,

                rotation: this.rotation

              };

              grid.push(gridObject);
            }
          }
        }

        return grid;
      }
    }, {
      key: 'getFullPixelGrid',
      value: function getFullPixelGrid() {
        var unitSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        var ctx = arguments[1];


        ctx = ctx || this.ctx;

        var grid = [];

        var min = this.framePos,
            max = this.framePos.add(this.frameSize);

        for (var x = min.x; x <= max.x; x += unitSize) {
          for (var y = min.y; y <= max.y; y += unitSize) {
            // Fetch pixel at current position
            var pixel = ctx.getImageData(x, y, 1, 1);
            // Check that opacity is above zero


            var vector = new Gamelab.Vector(x, y),
                gridObject = {

              position: vector,

              x: x,
              y: y,

              size: new Gamelab.Vector(unitSize, unitSize),

              pixel: pixel,

              rotation: this.rotation

            };

            grid.push(gridObject);
          }
        }

        return grid;
      }

      /**
       * Creates and returns a ColorMap for this animation, allowing opacity-based pixel-collision.
       *
       * @function
       * @param {number} unitDimen a Colormap grid-unit-size --A larger unitDimen decreases accuracy, and results in faster-processing.
       * @memberof Animation
       **********/

    }, {
      key: 'createColorMap',
      value: function createColorMap(size, ctx) {

        this.StoreOffscreen();

        ctx = ctx || this.ctx;

        this.colorMap = this.colorMap || this.getColoredPixelGrid(size, ctx);

        return this.colorMap;
      }
    }, {
      key: 'createNonColorMap',
      value: function createNonColorMap(size, ctx) {
        this.StoreOffscreen();
        ctx = ctx || this.ctx;
        this.nonColorMap = this.nonColorMap || this.getNonColoredPixelGrid(size, ctx);
        return this.nonColorMap;
      }
    }, {
      key: 'createPixelMap',
      value: function createPixelMap(size, altImage) {
        if (this.image.domElement instanceof HTMLCanvasElement) {
          this.canvas = this.image.domElement;
          ctx = this.ctx = this.canvas.getContext('2d');
        } else {
          this.StoreOffscreen();
          ctx = ctx || this.ctx;
        }

        this.pixelMap = this.pixelMap || this.getFullPixelGrid(size, this.testCtx);
        return this.fullPixelMap;
      }
    }]);

    return Frame;
  }();

  Gamelab.Frame = Frame;
})();;

/**
 * Creates an instance of GamepadAdapter: --instead use the existing: Gamelab.GamepadAdapter, a working instance of this class.
 * -supports game-controller input for web-games
 * -accesses live gamepad input from the HTML5 Gamepad Api
 * @returns {GamepadAdapter} an instance of GamepadAdapter
 * */

Gamelab.gamepads = Gamelab.gamepads || [];

var GamepadAdapter = function () {
  function GamepadAdapter() {
    _classCallCheck(this, GamepadAdapter);

    this.__gamepads = [];
    this.intervals = [];
    var controller_stack = this;
    var __gamepadMaster = this;
    this.settings = {};
    this.settings.xbox_pc = {
      button_0: 'a',
      button_1: 'b',
      button_2: 'x',
      button_3: 'y',
      button_4: 'lb',
      button_5: 'rb',
      button_6: 'lt',
      button_7: 'rt',
      button_8: 'select',
      button_9: 'start',
      button_10: 'left_stick_button',
      button_11: 'right_stick_button',
      button_12: 'up',
      button_13: 'down',
      button_14: 'right',
      button_15: 'left'
    };

    this.selectSettings('xbox_pc');

    this.events = [];

    window.addEventListener("gamepadconnected", function (e) {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);

      if (__gamepadMaster.mainLoop) {
        window.clearInterval(__gamepadMaster.mainLoop);
      }

      __gamepadMaster.mainLoop = window.setInterval(function () {

        var gps = navigator.getGamepads();

        __gamepadMaster.gps = gps;

        for (var x = 0; x < gps.length; x++) {

          var events = __gamepadMaster.__gamepads[x] ? __gamepadMaster.__gamepads[x] : {};

          __gamepadMaster.process(__gamepadMaster.gps[x], events);
        }
      }, 20);
    });
  }

  _createClass(GamepadAdapter, [{
    key: 'selectSettings',
    value: function selectSettings(name) {
      for (var x in this.settings) {
        if (x.toLowerCase() == name.toLowerCase()) {
          this.selectedSettings = this.settings[x];
        }
      }
    }
  }, {
    key: 'addButtonSettings',
    value: function addButtonSettings(name, settings) {
      name = name || '#untitled';
      this.settings[name] = settings;
    }
  }, {
    key: 'gamepads',
    value: function gamepads() {

      return navigator.getGamepads();
    }
  }, {
    key: 'disconnect_all',
    value: function disconnect_all() {

      for (var x = 0; x < this.intervals.length; x++) {

        window.clearInterval(this.intervals[x]);
      }
    }
  }, {
    key: 'disconnect_by_index',
    value: function disconnect_by_index(game_pad_index) {

      window.clearInterval(this.intervals[game_pad_index]);
    }
  }, {
    key: 'hasAnyPad',
    value: function hasAnyPad() {
      return "getGamepads" in navigator;
    }
  }, {
    key: 'Event',
    value: function Event(key, game_pad, callback) {
      return {

        key: key, game_pad: game_pad, callback: callback

      };
    }
  }, {
    key: 'GamepadEvents',
    value: function GamepadEvents(args) {

      var $adapter = this;

      var gp = {};

      gp.stick_left = args.stick_left || function (x, y) {

        //  console.log('Def call');

      };

      gp.stick_right = args.stick_right || function (x, y) {};

      gp.buttons = [];

      gp.extendFunc = function (f1, f2) {

        var fc = f2;

        return function (x, y) {

          f2(x, y);

          f1(x, y);
        };
      };

      gp.normal_key = function (k) {
        //replace spaces and dashes with _
        for (var x = 0; x < 4; x++) {
          if (k.indexOf(' ') >= 0) {
            k = k.replace(' ', '_');
          }
          if (k.indexOf('-') >= 0) {
            k = k.replace('-', '_');
          }
        }

        return k.toLowerCase();
      };

      gp.on = function (key, callback) {

        var settings = $adapter.selectedSettings;

        key = this.normal_key(key);

        if (this[key] && key !== "on") {

          var current_cb = typeof this[key] == 'function' ? this[key] : function (x, y) {};

          this[key] = this.extendFunc(callback, current_cb);
        }

        for (var x in settings) {
          var parts = x.split('_');

          if (this.normal_key(x) == key || this.normal_key(settings[x]) == key) //its in the settings
            {

              var number;

              try {

                number = parseInt(parts[1]);

                var current_cb = typeof this['buttons'][number] == 'function' ? this['buttons'][number] : function (x, y) {};

                this['buttons'][number] = this.extendFunc(callback, current_cb);
              } catch (e) {
                console.error('could not parse "on" event with ' + key);
              }
            }
        }
      };

      gp.constructor = { name: "GamepadEvents" };

      this.__gamepads.push(gp);

      Gamelab.gamepads = this.__gamepads;

      return gp;
    }
  }, {
    key: 'getGamepads',
    value: function getGamepads() {
      return Gamelab.gamepads;
    }
  }, {
    key: 'process',
    value: function process(gp, gpEvents) {

      this.process_buttons(gp, gpEvents);

      this.process_axes(gp, gpEvents);
    }
  }, {
    key: 'process_axes',
    value: function process_axes(gp, events) {

      if (!gp || !gp['axes']) {

        return false;
      }

      for (var i = 0; i < gp.axes.length; i += 2) {

        var axis1 = gp.axes[i],
            axia2 = gp.axes[i + 1];

        var ix = Math.ceil(i / 2) + 1,
            x = gp.axes[i],
            y = gp.axes[i + 1];

        if (ix == 1 && events.stick_left) {
          events.stick_left(x, y);
        }

        if (ix == 2 && events.stick_right) {
          events.stick_right(x, y);
        }

        if (this.events && this.events['stick_' + i] && typeof this.events['stick_' + i].callback == 'function') {
          this.events['stick_' + i].callback();
        }
      }
    }
  }, {
    key: 'process_buttons',
    value: function process_buttons(gp, events) {

      if (!gp || !gp['buttons']) {
        return false;
      }

      for (var i = 0; i < gp.buttons.length; i++) {

        if (!events.buttons) break;else if (events.buttons.length > i && typeof events.buttons[i] == 'function') {
          events.buttons[i](gp.buttons[i].pressed);
        } else if (events.buttons.length > i && _typeof(events.buttons[i]) == 'object' && typeof events.buttons[i].update == 'function') {
          events.buttons[i].update(events.buttons[i].pressed);
        }
        var clearance_1 = this.events && this.events[i],
            gpc,
            bkey = "button_" + i;

        if (clearance_1) {
          gpc = this.events[bkey] && !isNaN(this.events[bkey].game_pad) ? this.gamepads[this.events[bkey].game_pad] : this.events[bkey].game_pad;
        }
        ;

        if (clearance_1 && gpc && typeof this.events[bkey].callback == 'function') {
          //call the callback
          this.events[i].callback();
        }
      }
    }
  }, {
    key: 'on',
    value: function on(key, gpix, callback) {

      var keys = TypeCode.arrayWrap(key || []),
          gps = TypeCode.arrayWrap(gpix || []);;

      for (var x in keys) {
        for (var y in gps) {
          if (gps[y] >= this.__gamepads.length) {

            this.__gamepads.push(this.GamepadEvents({}));
          }

          this.__gamepads[y].on(keys[x], callback);
        }
      }
    }
  }]);

  return GamepadAdapter;
}();

/**********
 * NOTE: here we bind the instance, and NOT the instantiator.
 *
 * *********/

if (!Gamelab.GamepadAdapter) {

  Gamelab.GamepadAdapter = new GamepadAdapter();

  // __gameInstance.gamepads.push(gamepad);
}
;
var Line2d = function (_Scriptable) {
  _inherits(Line2d, _Scriptable);

  function Line2d() {
    _classCallCheck(this, Line2d);

    var _this8 = _possibleConstructorReturn(this, (Line2d.__proto__ || Object.getPrototypeOf(Line2d)).call(this));

    _this8.Object(_this8);
    _this8.points = [];
    _this8.position = new Gamelab.Vector(0, 0);
    _this8.rotation = new Gamelab.Vector(0, 0);
    _this8.size = new Gamelab.Vector(0, 0);
    _this8.index = 0;
    _this8.lineWidth = 1.0;
    _this8.timer = 0;
    _this8.phase_index = 0;
    _this8.call = function () {};
    return _this8;
  }

  _createClass(Line2d, [{
    key: 'StepFunction',
    value: function StepFunction(call) {
      this.call = call;
      return this;
    }
  }, {
    key: 'next',
    value: function next() {
      this.index += 1;
      return this.points[this.index % this.points.length];
    }
  }, {
    key: 'Color',
    value: function Color(c) {
      this.color = c;
      return this;
    }
  }, {
    key: 'GradientCall',
    value: function GradientCall(fxn) {
      var colorStops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      this.colorStops = colorStops;
      this.gradient_call = fxn.bind(this);
      return this;
    }
  }, {
    key: 'ShadowBlur',
    value: function ShadowBlur(shadowBlur, color) {
      this.shadowBlur = shadowBlur;
      this.shadowColor = color;
      return this;
    }
  }, {
    key: 'Opacity',
    value: function Opacity(o) {
      this.opacity = o;
      return this;
    }
  }, {
    key: 'AnimateShadowBlur',
    value: function AnimateShadowBlur(minBlur, maxBlur, color, stepFunction) {
      this.shadowBlur = minBlur;
      this.shadowColor = color;
      this.minBlur = minBlur;
      this.maxBlur = maxBlur;
      this.blurStepFunction = stepFunction.bind(this);
      this.blurTimer = 0;
      return this;
    }
  }, {
    key: 'collide',
    value: function collide(gameObject) {
      var lineCollisionCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var gop = gameObject.position,
          gos = gameObject.size;
      var COLLIDE = false,
          LINE = this;
      this.points.forEach(function (p) {
        if (p.x >= gop.x && p.x <= gop.x + gos.x && p.y >= gop.y && p.y <= gop.y + gos.y) {
          COLLIDE = true;
          lineCollisionCallback(p, LINE.points);
        }
      });
      return COLLIDE;
    }
  }, {
    key: 'Fill',
    value: function Fill() {
      for (var x = 1; x <= this.size.x; x++) {
        var x_total = this.size.x;
        var out_of_1 = x / x_total;
        //  console.log('using x portion::' + out_of_1);
        var y = this.size.y * this.call(out_of_1, 1.0),
            pos = new Gamelab.Vector(Gamelab.VectorMath.rotatePointsXY(x, y, this.rotation.x));
        var next_x = this.position.x + pos.x,
            next_y = this.position.y + pos.y,
            last_point = this.points[this.points.length - 1];
        if (!last_point) {
          last_point = new Gamelab.Vector(0, 0);
        }
        var next_point = new Gamelab.Vector(next_x, next_y);
        next_point.r = next_point.angleBetween(last_point, next_point);
        this.points.push(next_point);
      }
      return this;
    }
  }, {
    key: 'getOffsetPos',
    value: function getOffsetPos(pos) {
      var offset = this.window_offset || new Gamelab.Vector(0, 0);
      return pos.add(offset);
    }
  }, {
    key: 'LineWidth',
    value: function LineWidth(number) {
      this.lineWidth = number;
      return this;
    }
  }, {
    key: 'Layer',
    value: function Layer(l) {
      this.layer = l;
      return this;
    }
  }, {
    key: 'GlobalComposite',
    value: function GlobalComposite(gc) {
      this.globalComposite = gc;
      return this;
    }
  }, {
    key: 'draw',
    value: function draw(ctx, camera) {
      ctx = ctx || Gamelab.game_windows[0].ctx;
      camera = camera || Gamelab.game_windows[0].camera;

      this.ctx = ctx;
      var points = this.points;
      ctx.save();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.lineWidth;
      ctx.beginPath();
      this.timer += 1;
      var lastPoint = false;

      if (points instanceof Array) {
        for (var x = 0; x < points.length; x++) {
          var p = points[x];
          if (x >= 1) {
            lastPoint = points[x];
            if (this.gradient_call) {
              this.gradient = this.gradient_call(lastPoint, p, this.colorStops);
              ctx.strokeStyle = this.gradient || this.color;
            }
          }
          var position = p.position || p;
          var real_pos = position.sub(camera.position);
          if (real_pos.hasOwnProperty('x') && real_pos.hasOwnProperty('y')) {
            ctx.lineTo(real_pos.x, real_pos.y);
          }
        }
      }

      var blurTime = this.timer % (this.maxBlur - this.minBlur),
          blurLen = this.maxBlur - this.minBlur;
      this.phase_index = Math.floor(this.timer / (this.maxBlur - this.minBlur));

      if (this.shadowBlur) {
        ctx.shadowBlur = this.shadowBlur;
      }
      if (this.blurStepFunction) {
        ctx.shadowBlur = this.minBlur + this.blurStepFunction(blurTime / blurLen, 1.0) * (this.maxBlur - this.minBlur);
      }
      if (this.shadowColor) {
        ctx.shadowColor = this.shadowColor;
      }
      if (this.globalComposite) {
        ctx.globalCompositeOperation = this.globalComposite;
      }
      if (typeof this.opacity == 'number') {
        ctx.globalAlpha = this.opacity;
      }

      ctx.stroke();

      if (this.fillStyle) {
        ctx.fillStyle = this.fillStyle;
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }]);

  return Line2d;
}(Scriptable);

Gamelab.Line2d = Line2d;

Gamelab.Line2D = Line2d;
;
/**
 * Creates a Sound instance. Implements HTML5-Audio object
 * --DevTODO : complete docs for the Sound class
 *
 * @param   {string} src the source-path of the targeted sound-file
 * @returns {Sound} instance of Gamelab.Sound
 * */

var Sound = function () {
  function Sound(src, data) {
    _classCallCheck(this, Sound);

    if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) == 'object') {

      this.sound = document.createElement('audio');
      this.sound.volume = src.sound.volume;
      this.sound.src = src.src;
      this.src = src.src;
    } else if (typeof src == 'string') {

      this.sound = document.createElement('audio');
      this.sound.volume = 1;
      this.sound.src = src;
      this.src = src;
    }

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == 'object') {
      for (var x in data) {
        if (x !== 'sound') {
          this[x] = data[x];
        }
      }
    }

    this.onLoad = this.onLoad || function () {};

    if (typeof this.onLoad == 'function') {

      this.onLoad(this.sound);
    }
  }

  _createClass(Sound, [{
    key: 'Multiply',
    value: function Multiply(number) {

      var srcList = [];
      for (var x = 0; x < number; x++) {
        srcList.push(this.src || this.sound.src);
      }

      return new Gamelab.SoundList(srcList).Volume(this.sound.volume);
    }
  }, {
    key: 'Loop',
    value: function Loop(loop) {
      this.sound.loop = loop || true;

      return this;
    }
  }, {
    key: 'loop',
    value: function loop(_loop) //same as Loop()
    {
      this.sound.loop = _loop || true;

      return this;
    }
  }, {
    key: 'Volume',
    value: function Volume(val) {
      this.sound.volume = val;

      return this;
    }
  }, {
    key: 'volume',
    value: function volume(val) //same as Volume()
    {

      this.sound.volume = val;

      return this;
    }
  }, {
    key: 'Play',
    value: function Play() {

      if (Gamelab.config && Gamelab.config.soundOff) {
        return;
      }

      if (_typeof(this.sound) == 'object' && typeof this.sound.play == 'function') {

        this.sound.play();
      }

      return this;
    }
  }, {
    key: 'play',
    value: function play() {
      //same as Play()
      if (Gamelab.config && Gamelab.config.soundOff) {
        return;
      }
      if (_typeof(this.sound) == 'object' && typeof this.sound.play == 'function') {

        this.sound.play();
      }
      return this;
    }
  }]);

  return Sound;
}();

var SoundList = function () {
  function SoundList(list) {
    _classCallCheck(this, SoundList);

    this.cix = 1;

    this.sounds = [];

    if (list instanceof Array) {
      for (var x in list) {
        if (list[x].src) {
          this.sounds.push(new Sound(list[x].src, list[x]));
        } else if (typeof list[x] == 'string') {
          this.sounds.push(new Sound(list[x]));
        }
      }
    }
  }

  _createClass(SoundList, [{
    key: 'Multiply',
    value: function Multiply(number) {

      var srcList = [];
      for (var x = 0; x < number; x++) {
        srcList.push(this.src || this.sound.src);
      }

      return new Gamelab.SoundList(srcList).Volume(this.sounds[0].volume);
    }
  }, {
    key: 'add',
    value: function add(src, name) {
      if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) == 'object' && src.src) {
        this.sounds.push(new Sound(src.src, src));
      } else if (typeof src == 'string') {
        var data = {};

        if (name) {
          data.name = name;
        }

        this.sounds.push(new Sound(list[x], data));
      }
    }
  }, {
    key: 'Volume',
    value: function Volume(v) {
      for (var x = 0; x < this.sounds.length; x++) {
        this.sounds[x].volume(v);
      }

      return this;
    }
  }, {
    key: 'volume',
    value: function volume(v) {
      for (var x = 0; x < this.sounds.length; x++) {
        this.sounds[x].volume(v);
      }

      return this;
    }
  }, {
    key: 'PlayNext',
    value: function PlayNext() {
      if (Gamelab.config && Gamelab.config.soundOff) {
        return;
      }

      this.sounds[this.cix % this.sounds.length].play();

      this.cix += 1;
    }
  }, {
    key: 'Play',
    value: function Play() {

      if (Gamelab.config && Gamelab.config.soundOff) {
        return;
      }

      this.sounds[this.cix % this.sounds.length].play();

      this.cix += 1;
    }
  }, {
    key: 'playNext',
    value: function playNext() //same as PlayNext()
    {
      if (Gamelab.config && Gamelab.config.soundOff) {
        return;
      }
      this.sounds[this.cix % this.sounds.length].play();

      this.cix += 1;
    }
  }, {
    key: 'play',
    value: function play() //same as Play()
    {
      if (Gamelab.config && Gamelab.config.soundOff) {
        return;
      }

      this.sounds[this.cix % this.sounds.length].play();

      this.cix += 1;
    }
  }]);

  return SoundList;
}();

Gamelab.Sound = Sound;

Gamelab.SoundList = SoundList;

var Audio = function Audio() {
  _classCallCheck(this, Audio);
};

Gamelab.Audio = Audio;
;
var Particle = function () {
  function Particle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gameWindow = arguments[1];

    _classCallCheck(this, Particle);

    var canvas = document.createElement('CANVAS');
    options.size = options.size || new Gamelab.Vector(2000, 2000);
    this.options = options;
    this.trackableSpeed = false;

    canvas.width = options.size.x;
    canvas.height = options.size.y;
    canvas.style.display = 'none';

    this.duration = 500;

    //refers to an approxomated size
    this.referenceSize = new Gamelab.Vector(0, 0);

    this.startSize = this.referenceSize;

    if (!this.life) this.Life(70, 70, 'random');

    this.DefaultValues();

    this.NormalizeOptions(options);

    this.Options(options);

    if (options.duration) this.duration = options.duration;

    var sourceSprites = [],
        livingSprites = [],
        ctx = canvas.getContext('2d');

    this.sourceSprites = [];

    this.gameWindow = gameWindow;
    this.ctx = ctx;
    this.canvas = canvas;

    this.sprites = [];
    this.layer = 0;
    this.ticker = 0;
    this.total = 0;
    this.position = new Gamelab.Vector(200, 200);
  }

  _createClass(Particle, [{
    key: 'Layer',
    value: function Layer(l) {
      this.layer = l;
      return this;
    }
  }, {
    key: 'Prerender',
    value: function Prerender() {
      var inTestMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


      this.prerendered = true;
      this.precanvas = document.createElement('CANVAS');

      this.precanvas.width = 200;
      this.precanvas.height = 200;

      var testDom;

      if (inTestMode) {
        testDom = document.createElement('DIV');
        testDom.style.position = 'fixed';
        testDom.style.overflow = 'scroll';
        testDom.style.width = '60%';
        testDom.style.height = '60%';
        this.testDom = testDom;
      }

      this.prectx = this.precanvas.getContext('2d');

      this.image = document.createElement('img');
      this.image.src = this.options.src;

      this.portions = [];

      this.presprites = [];

      for (var x = 0; x <= 64; x++) {
        this.portions.push(Math.round(x / 64 * 100) / 100);
      }

      var $object = this;

      var fw = 0,
          fh = 0;

      var $sprite = new Gamelab.Sprite(this.image.src);

      this.isPrerendered = true;

      var V = Gamelab.Vector;

      this.presprite = $sprite;

      $sprite.onLoad(function () {

        fw = this.size.x;
        fh = this.size.y;

        $object.precanvas.style.width = this.size.x * 64 + 'px';
        $object.precanvas.style.height = this.size.y + 'px';

        $object.precanvas.width = this.size.x * 64;
        $object.precanvas.height = this.size.y;

        if ($object.testDom) $object.testDom.style.height = this.size.y + 35 + 'px';

        this.testSize = this.size;

        var colorOptions = $object.options.color,
            colorOptionSet = numbers.getMinAndMaxByPair(colorOptions.a, colorOptions.b);

        var colors = new Gamelab.ColorFeildSpan(colorOptionSet.min, colorOptionSet.max, 'linear').PrepareColors();

        var all_colors = colors.colors,
            max_ix = 64;

        var frames = [];

        $sprite.effectDataList = [];

        for (var ix = 0; ix < 64; ix++) {

          var colorIndex = Math.floor(ix / max_ix * all_colors.length);

          this.pushColorEffectCanvas(all_colors[colorIndex % all_colors.length]);
          this.ColorEffect(all_colors[colorIndex % all_colors.length]);

          this.Position(ix * fw, 0);
          this.draw($object.prectx);
        }

        //modify the draw function
        $object.presprite.draw = function (ctx, camera) {

          var sprite = this;

          this.Layer($object.layer);

          this.ScrollFactor(0);

          var frame = false;

          if (sprite.active) {

            if (sprite.selected_animation instanceof Object && sprite.selected_animation.hasOwnProperty('selected_frame')) {
              frame = sprite.selected_animation.selected_frame;
            }

            //match frame position w/ sprite position
            frame.Position(sprite.position);

            var xpos = frame.position.x,
                ypos = frame.position.y;

            var p = sprite.position;

            var x = p.x,
                y = p.y,
                scrollFactor = sprite.scrollFactor >= -1.0 && sprite.scrollFactor <= 1.0 ? sprite.scrollFactor : 1.0;

            if (sprite.noScroll) {
              scrollFactor = 0;
            }

            //optional animation : gameSize

            var targetSize = sprite.size || sprite.selected_animation.size;
            var realWidth = targetSize.x;
            var realHeight = targetSize.y;

            var origin = sprite.origin || new Gamelab.Vector(realWidth / 2, realHeight / 2);

            //optional animation : offset

            var rotation;

            if (_typeof(sprite.rotation) == 'object') {
              rotation = sprite.rotation.x;
            } else {
              rotation = sprite.rotation;
            }

            var pct = this.ticker / (this.life + 1);

            if (pct > 1.0 || isNaN(pct)) pct = 1.0;

            if (!(this.effectCanvasList instanceof Array)) alert('not an array');

            var index = Math.floor((this.effectCanvasList.length - 1) * pct);

            if (isNaN(index) || index > this.effectCanvasList.length) index = 0;

            var targetCanvas = this.effectCanvasList[index];

            if (targetCanvas instanceof HTMLCanvasElement) {
              var imageFrameArgs = {
                image: targetCanvas,
                framePos: frame.framePos,
                frameSize: frame.frameSize,
                position: new Gamelab.Vector2D(Math.round(xpos + origin.x), Math.round(ypos + origin.y)),
                size: new Gamelab.Vector2D(realWidth, realHeight),
                rotation: rotation % 360,
                canvasContext: ctx,
                flipX: sprite.flipX,
                flipY: sprite.flipY,
                origin: origin,
                globalAlpha: this.opacity,
                globalComposite: false
              };
              Gamelab.Canvas.draw_image_frame(imageFrameArgs);
            }
          }
        };

        if (this.testDom) {
          testDom.style.zIndex = 9999;
          testDom.style.top = '20%';
          testDom.style.left = '20%';
          testDom.appendChild($object.precanvas);
          document.body.appendChild(testDom);
        }
      });

      return this;
    }
  }, {
    key: 'DefaultValues',
    value: function DefaultValues() {

      var def_life = 50;

      if (!(this.options.composite || this.options.globalComposite || this.options.gobalCompositeOperation)) this.Composite('source-over');

      if (!this.options.scale) this.Scale(0.6, 0.8, 'quadratic', def_life);

      if (!this.options.speed) this.Speed(7.5, 1.0, 'linear', def_life);

      if (!(this.options.alpha || this.options.opacity)) this.Alpha(1.0, 0.1, 'quintic', def_life);

      if (!this.options.color) this.Color(false);
    }
  }, {
    key: 'NormalizeOptions',
    value: function NormalizeOptions(options) {

      if (typeof options.angle == 'number') options.angle = {
        a: options.angle
      };

      if (typeof options.scale == 'number') options.scale = {
        a: options.scale
      };

      if (typeof options.speed == 'number') options.speed = {
        a: options.speed
      };

      if (typeof options.alpha == 'number') options.alpha = {
        a: options.alpha
      };

      if (typeof options.color == 'string') options.color = {
        a: options.color
      };
    }
  }, {
    key: 'Options',
    value: function Options(options) {

      this.Composite(options.composite || options.globalComposite || options.gobalCompositeOperation || 'source-over');

      if (options.life) this.Life(options.life.a, options.life.b, options.life.transition, 500);

      var life = this.life.Clone().getValue();

      if (options.angle) this.Angle(options.angle.a, options.angle.b, options.angle.transition, life);

      if (options.scale) this.Scale(options.scale.a, options.scale.b, options.scale.transition, life);

      if (options.speed) this.Speed(options.speed.a, options.speed.b, options.speed.transition, life);

      if (options.alpha) this.Alpha(options.alpha.a, options.alpha.b, options.alpha.transition, life);

      if (options.color) this.Color(options.color.a, options.color.b, options.color.transition, life);
    }

    //flipX :: reverse the x-speed of sprite over x-axis

  }, {
    key: 'FlipX',
    value: function FlipX(value) {
      this.flipX = value;

      if (this.flipX) {
        if (this.options.speed.a > 0) {
          this.options.speed.a = -this.options.speed.a;
        }
        if (this.options.speed.b > 0) {
          this.options.speed.b = -this.options.speed.b;
        }
      } else {
        if (this.options.speed.a < 0) {
          this.options.speed.a = -this.options.speed.a;
        }
        if (this.options.speed.b < 0) {
          this.options.speed.b = -this.options.speed.b;
        }
      }
      return this;
    }

    //Define the src (image) of the particle

  }, {
    key: 'Src',
    value: function Src(src) {

      this.sourceSprites = [];
      this.options.src = src;

      var options = this.options;

      var maxlife;

      if (options.life instanceof Object) {
        maxlife = options.life.a && !options.life.b ? options.life.a : options.life.a > options.life.b ? options.life.a : options.life.b;
      } else if (typeof options.life == 'number') {
        maxlife = options.life;
      }

      this.options.max = maxlife * 60;

      if (this.options.max > 2000) {
        this.options.max = 2000;
      }

      for (var x = 0; x < this.options.max; x++) {
        var sprite = new Gamelab.Sprite(this.options.src).Scale(this.options.scale.a);

        var particle = this;

        if (x == 0) sprite.onLoad(function () {
          particle.referenceSize = this.size;
        });

        sprite.options = this.options;
        this.sourceSprites.push(sprite);
      }

      this.sourceSprites.oldest = function () {

        var maxTicker = 0,
            nextObjectIndex = 0;

        for (var x = 0; x < this.length; x++) {
          if (_typeof(this[x]) == 'object' && this[x].ticker >= maxTicker) {
            maxTicker = this[x].ticker;
            nextObjectIndex = x;
          }
        }
        return this[nextObjectIndex];
      };

      this.sourceSprites.countLiving = function () {
        var total = 0;
        for (var x = 0; x < this.length; x++) {
          if (this[x].ticker >= 1) {
            total++;
          }
        }

        //  console.log('TOTAL LIVING blts::' + total);
        return total;
      };

      return this;
    }

    //Total particles to draw from

  }, {
    key: 'Stock',
    value: function Stock(stock) {
      this.options.stock = stock;
      return this;
    }
  }, {
    key: 'OffsetAllByX',
    value: function OffsetAllByX(x) {

      var particle = this;

      this.sprites.forEach(function (sprite) {
        if (!sprite.detached_particle && sprite.flipX == particle.flipX) sprite.position.x += x;else {
          sprite.detached_particle = true;
        }
      });

      return this;
    }

    //composite :: example value = 'lighter'

  }, {
    key: 'Composite',
    value: function Composite(c) {
      this.options.globalCompositeOperation = c;
      return this;
    }

    //Life span

  }, {
    key: 'Life',
    value: function Life(a, b, transition) {
      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;

      this.life = new Gamelab.FeildSpan(a, b, transition, duration);
      return this;
    }
  }, {
    key: 'Color',
    value: function Color(a, b, transition, life) {
      if (!a) {
        this.options.color = false;
        return false;
      }
      this.options.color = new Gamelab.ColorFeildSpan(a, b, transition, life).PrepareColors();
    }

    //scale transition

  }, {
    key: 'Scale',
    value: function Scale(a, b, transition, life) {
      this.options.scale = new Gamelab.FeildSpan(a, b, transition, life);
      return this;
    }

    //allowable angles

  }, {
    key: 'Angle',
    value: function Angle(a, b, transition, life) {
      this.options.angle = new Gamelab.FeildSpan(a, b, transition, life);
      return this;
    }

    //alpha transition

  }, {
    key: 'Alpha',
    value: function Alpha(a, b, transition, life) {
      this.options.alpha = new Gamelab.FeildSpan(a, b, transition, life);
      return this;
    }

    //speed transition

  }, {
    key: 'Speed',
    value: function Speed(a, b, transition, life) {
      this.options.speed = new Gamelab.FeildSpan(a, b, transition, life);
      return this;
    }
  }, {
    key: 'LockRotation',
    value: function LockRotation(r) {
      this.lockedRotation = r;
      return this;
    }
  }, {
    key: 'addParticles',
    value: function addParticles(total) {

      var options = this.options;

      var positions = [];

      if (options.shape instanceof Gamelab.Circle) positions = ['border', 'perimeter'].indexOf(options.pointMode) >= 0 ? options.shape.getRandomCircumferencePoints(total) : options.shape.getRandomPoints(total);
      for (var x = 0; x < total; x++) {

        this.total += 1;
        var sprite;

        var ix = x + this.sourceSprites.countLiving();

        if (ix < this.sourceSprites.length) sprite = this.sourceSprites[ix];else {
          sprite = this.sourceSprites.oldest();
        }
        //  console.info(sprite);
        //  console.info(this.sourceSprites);
        if (this.total >= this.sourceSprites.length) {
          //console.info(sprite);
        }
        this.lastSprite = sprite;
        //  console.info(sprite);
        //  console.log(ix);
        //  console.log(this.sourceSprites.length);
        sprite.ticker = 0;
        sprite.speed = new Gamelab.Vector(0, 0);

        //temp scroll factor -zero

        sprite.ScrollFactor(0);

        if (this.presprite && this.options.color && this.options.color.hasVariance()) {
          sprite.effectCanvasList = this.presprite.effectCanvasList;
          sprite.draw = this.presprite.draw;
        }

        if (this.gameWindow.has(sprite)) this.gameWindow.remove(sprite);

        if (this.sprites.indexOf(sprite) >= 0) this.sprites.splice(this.sprites.indexOf(sprite), 1);

        if (sprite.constructor.name !== 'Sprite') {
          console.error('not a sprite');
        }

        sprite.detached_particle = false;
        sprite.flipX = this.flipX;

        var particle = this;

        sprite.flyByRotation = function (angle, speed) {
          this.speed = Gamelab.Trig.rotational_speed(angle, speed);
          this.position = this.position.add(this.speed);
        };

        sprite.speed = new Gamelab.Vector(0, 0);

        sprite.gunOptions = {};

        sprite.gunOptions.life = this.life.Clone();

        sprite.life = sprite.gunOptions.life.getValue();

        if (isNaN(sprite.life) || sprite.life == 0) console.error('Not a number OR isZero --sprite.life');

        sprite.gunOptions.angle = options.angle.Duration(sprite.life).Clone();

        if (options.color && options.color.hasVariance()) sprite.gunOptions.color = options.color.Duration(sprite.life).Clone();

        sprite.gunOptions.alpha = options.alpha.Duration(sprite.life).Clone();

        sprite.gunOptions.speed = options.speed.Duration(sprite.life).Clone();

        sprite.gunOptions.scale = options.scale.Duration(sprite.life).Clone();

        sprite.opacity = sprite.gunOptions.alpha.getValue();

        if (this.options.color && !this.presprite && this.options.color.hasVariance()) {
          sprite.color = sprite.gunOptions.color.getValue();
        }

        sprite.scale = sprite.gunOptions.scale.getValue();

        if (!this.presprite && this.options.color && this.options.color.hasVariance()) sprite.ColorEffect(sprite.color);

        sprite.globalCompositeOperation = options.globalCompositeOperation || 'lighter';

        var angleDiff = Math.abs(options.angle.a - options.angle.b);

        if (sprite.hasOwnProperty('r')) {
          sprite.fly_angle = sprite.r;
        } else {
          sprite.fly_angle = sprite.gunOptions.angle.getValue();
        }

        sprite.Scale(sprite.scale);

        if (positions.length >= 1) {
          if (x < positions.length) {
            sprite.Position(this.position.add(positions[x]));

            if (positions[x] && positions[x].hasOwnProperty('r') && !isNaN(positions[x].r) && positions[x].r >= -360 && positions[x].r <= 360) {
              sprite.r = positions[x].r;
            }
          } else {
            sprite.Position(this.position);
          }
        } else {
          sprite.Position(this.trackablePosition || this.position);
        }

        var gameWindow = this.gameWindow;

        if (this.lockedRotation) {
          sprite.Rotation(this.lockedRotation);
        }

        sprite.update = function () {

          this.ticker += 1;

          this.life -= 1;

          if (this.life <= 0) {
            //console.log('REMOVING PARTICLE');
            particle.sprites.splice(particle.sprites.indexOf(this), 1);
            gameWindow.remove(this);
          }

          this.scale = this.gunOptions.scale.getValue();

          this.Scale(this.scale);

          if (!particle.isPrerendered && particle.options.color && particle.options.color.hasVariance()) {
            this.color = this.gunOptions.color.getValue();
            this.ColorEffect(this.color);
          }

          this.Opacity(this.gunOptions.alpha.getValue());

          this.gunSpeed = this.gunOptions.speed.getValue();

          this.flyByRotation(this.r ? this.r % 360 : this.fly_angle % 360, this.gunSpeed);

          if (particle.trackableSpeed) {
            this.position = this.position.add(particle.trackableSpeed);
          }
          if (particle.trackablePosition) {
            this.position = particle.trackablePosition;
          }
        };

        this.sprites.push(sprite);
        this.gameWindow.add(sprite);
      }
    }
  }, {
    key: 'resetTicker',
    value: function resetTicker() {
      this.ticker = 0;
      return this;
    }
  }, {
    key: 'assignTrackableSpeed',
    value: function assignTrackableSpeed(speed) {

      this.trackableSpeed = speed;
      return this;
    }
  }, {
    key: 'assignTrackablePosition',
    value: function assignTrackablePosition(position) {

      this.trackablePosition = position;
      return this;
    }
  }, {
    key: 'assignLinesAndSelector',
    value: function assignLinesAndSelector(lineList, lineSelector) {
      this.lines = lines;
      return this;
    }
  }, {
    key: 'enter',
    value: function enter(number) {

      this.ticker += 1;

      this.addParticles(number);

      //return an api for assigning various updates::

      var $p = this;

      return this;
    }
  }]);

  return Particle;
}();

Gamelab.Particle = Particle;

var Effect = function (_Particle) {
  _inherits(Effect, _Particle);

  function Effect() {
    _classCallCheck(this, Effect);

    return _possibleConstructorReturn(this, (Effect.__proto__ || Object.getPrototypeOf(Effect)).apply(this, arguments));
  }

  return Effect;
}(Particle);

Gamelab.Effect = Effect;
; /**
  * Creates a GravityForce instance.
  *
  *@param   {Object} args the object of arguments
  * @param   {string} args.name optional
  * @param   {string} args.description optional
  * @param   {Array} args.subjects the subjects to be pulled by the GravityForce
  * @param   {Array} args.clasticObjects any clastic object or array-of-objects that should have collision-stop behavior with subjects
  * @param   {Vector} args.max the max speed of the gravity-force, similar to concept of 'terminal velocity'
  * @param   {number} args.accel the increment of acceleration for each update called, while subjects are falling
  *
  * @returns {GravityForce} a GravityForce object
  */

(function () {
  console.log('Force class... creating');

  var GravityForce = function () {
    function GravityForce() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, GravityForce);

      this.name = args.name || "";

      this.description = args.description || "";

      this.subjects = args.subjects || [];

      this.clasticObjects = args.clasticObjects || [];

      this.topClastics = args.topClastics || [];

      this.max = args.max || new Gamelab.Vector(3, 3, 3);
      this.accel = args.accel || new Gamelab.Vector(1.3, 1.3, 1.3);

      for (var x in this.clasticObjects) {
        if (!this.clasticObjects[x] instanceof Gamelab.Sprite) {
          this.clasticObjects[x] = Gamelab.getById(this.clasticObjects[x].id);
        }
      }

      for (var x in this.topClastics) {
        if (!this.topClastics[x] instanceof Gamelab.Sprite) {
          this.topClastics[x] = Gamelab.getById(this.topClastics[x].id);
        }
      }

      for (var x in this.subjects) {
        if (!this.subjects[x] instanceof Gamelab.Sprite) {
          this.subjects[x] = Gamelab.getById(this.subjects[x].id);
        }
      }
    }

    _createClass(GravityForce, [{
      key: 'getArg',
      value: function getArg(args, key, fallback) {

        if (args.hasOwnProperty(key)) {
          return args[key];
        } else {
          return fallback;
        }
      }

      /**
       * Updates position for all objects effected by this instance.
       * @memberof GravityForce
       */

    }, {
      key: 'update',
      value: function update() {

        var subjects = this.subjects;

        var clasticObjects = this.clasticObjects;

        var topClastics = this.topClastics;

        var accel = this.accel || {};

        var max = this.max || {};

        Gamelab.each(subjects, function (ix, itemx) {

          if (!itemx.jumping && !itemx.flying) itemx.accelY(accel, max);

          itemx.__inAir = true;
        });
      }
    }]);

    return GravityForce;
  }();

  ;

  var Force = GravityForce;

  Gamelab.Force = Force;

  Gamelab.GForce = Force;

  Gamelab.GravityForce = GravityForce;
})();
;
console.log('TODO:: complete Gamelab.Gravity class');

var Gravity = function () {
  function Gravity() {
    _classCallCheck(this, Gravity);
  }
  //pull single object or list of objects


  _createClass(Gravity, [{
    key: 'pull',
    value: function pull(object) {
      var accel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

      var list = object instanceof Array ? object : [object];
      list.forEach(function (item) {
        if (item.speed.y < max) {
          item.__inAir = true;
          item.speed.y += accel;
        } else {
          item.speed.y = max;
        }
      });
    }
  }]);

  return Gravity;
}();

Gamelab.Gravity = Gravity;
;
var Elipsoid = function () {
  function Elipsoid() {
    _classCallCheck(this, Elipsoid);

    this.position = new Gamelab.Vector(0, 0);
    this.rotation = new Gamelab.Vector(0, 0);
    this.size = new Gamelab.Vector(0, 0);
    this.origin = new Gamelab.Vector(0, 0);
    this.gradient = undefined;
    this.borderGradient = undefined;
    this.active = true;
    this.invisible = false;
    this.fill = false;
  }

  _createClass(Elipsoid, [{
    key: 'Rotation',
    value: function Rotation(r) {
      this.rotation = new Gamelab.Vector(r);
      return this;
    }
  }, {
    key: 'Origin',
    value: function Origin(x, y) {
      this.origin = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Position',
    value: function Position(x, y) {
      this.position = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Size',
    value: function Size(x, y) {
      this.size = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Fill',
    value: function Fill(fill) {
      this.fill = fill || true;
      return this;
    }
  }, {
    key: 'BorderGradient',
    value: function BorderGradient(a, b) {
      this.borderGradientColorA = a;
      this.borderGradientColorB = b;
      return this;
    }
  }, {
    key: 'Gradient',
    value: function Gradient(a, b) {
      this.gradientColorA = a;
      this.gradientColorB = b;
      this.Fill(true);
      return this;
    }
  }, {
    key: 'BorderThickness',
    value: function BorderThickness(bt) {
      this.borderThickness = bt;
      return this;
    }
  }, {
    key: 'draw',
    value: function draw(ctx, camera) {

      ctx.save();

      var startX = this.position.x - this.origin.x;

      if (!this.invisible && this.active) {
        this.ctx = ctx;
        var gradient = this.ctx.createLinearGradient(startX, 0, startX + this.size.x, 0);
        gradient.addColorStop(0, this.gradientColorA || 'white');
        gradient.addColorStop(1.0, this.gradientColorB || 'white');
        this.gradient = gradient;

        var borderGradient = this.ctx.createLinearGradient(startX, 0, startX + this.size.x, 0);
        borderGradient.addColorStop(0, this.borderGradientColorA || 'white');
        borderGradient.addColorStop(1.0, this.borderGradientColorB || 'white');
        this.borderGradient = borderGradient;

        ctx.translate(this.position.x + this.origin.x, this.position.y + this.origin.y);
        ctx.rotate(Math.PI / 180 * this.rotation.x);

        ctx.translate(0, ctx.width);

        if (this.flipX) {
          ctx.scale(-1, 1);
        } else {}

        if (this.flipY) {
          ctx.scale(1, -1);
        } else {}

        ctx.strokeStyle = this.borderGradient || 'white';
        ctx.lineWidth = this.borderThickness || 4.0;

        ctx.beginPath();
        ctx.arc(this.position.x + this.origin.x, this.position.y + this.origin.y, this.size.x / 2.0, 2 * Math.PI, false);

        if (this.fill) {
          ctx.fillStyle = this.gradient || 'white';
          ctx.fill();
        }
      }

      ctx.restore();
    }
  }]);

  return Elipsoid;
}();

var Rectangle = function () {
  function Rectangle() {
    _classCallCheck(this, Rectangle);

    this.position = new Gamelab.Vector(0, 0);
    this.rotation = new Gamelab.Vector(0, 0);
    this.size = new Gamelab.Vector(0, 0);
    this.origin = new Gamelab.Vector(0, 0);
    this.gradient = undefined;
    this.borderGradient = undefined;
    this.active = true;
    this.invisible = false;
    this.fill = false;
  }

  _createClass(Rectangle, [{
    key: 'Rotation',
    value: function Rotation(r) {
      this.rotation = new Gamelab.Vector(r);
      return this;
    }
  }, {
    key: 'Origin',
    value: function Origin(x, y) {
      this.origin = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Position',
    value: function Position(x, y) {
      this.position = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Size',
    value: function Size(x, y) {
      this.size = new Gamelab.Vector(x, y);
      return this;
    }
  }, {
    key: 'Fill',
    value: function Fill(fill) {
      this.fill = fill || true;
      return this;
    }
  }, {
    key: 'BorderGradient',
    value: function BorderGradient(a, b) {
      this.borderGradientColorA = a;
      this.borderGradientColorB = b;
      return this;
    }
  }, {
    key: 'Gradient',
    value: function Gradient(a, b) {
      this.gradientColorA = a;
      this.gradientColorB = b;
      this.Fill(true);
      return this;
    }
  }, {
    key: 'BorderThickness',
    value: function BorderThickness(bt) {
      this.borderThickness = bt;
      return this;
    }
  }, {
    key: 'draw',
    value: function draw(ctx, camera) {

      ctx.save();

      var startX = this.position.x - this.origin.x;

      if (!this.invisible && this.active) {
        this.ctx = ctx;
        var gradient = this.ctx.createLinearGradient(startX, 0, startX + this.size.x, 0);
        gradient.addColorStop(0, this.gradientColorA || 'white');
        gradient.addColorStop(1.0, this.gradientColorB || 'white');
        this.gradient = gradient;

        var borderGradient = this.ctx.createLinearGradient(startX, 0, startX + this.size.x, 0);
        borderGradient.addColorStop(0, this.borderGradientColorA || 'white');
        borderGradient.addColorStop(1.0, this.borderGradientColorB || 'white');
        this.borderGradient = borderGradient;

        ctx.translate(this.position.x + this.origin.x, this.position.y + this.origin.y);
        ctx.rotate(Math.PI / 180 * this.rotation.x);

        ctx.translate(0, ctx.width);

        if (this.flipX) {
          ctx.scale(-1, 1);
        } else {}

        if (this.flipY) {
          ctx.scale(1, -1);
        } else {}

        if (this.fill) {
          ctx.fillStyle = this.gradient || 'white';
          ctx.fillRect(this.position.x - this.origin.x, this.position.y - this.origin.y, this.size.x, this.size.y);
        }

        ctx.strokeStyle = this.borderGradient || 'white';
        ctx.lineWidth = this.borderThickness || 4.0;

        ctx.beginPath();
        ctx.strokeRect(this.position.x - this.origin.x, this.position.y - this.origin.y, this.size.x, this.size.y);
      }

      ctx.restore();
    }
  }]);

  return Rectangle;
}();

Gamelab.Rectangle = Rectangle;
Gamelab.RectangularLine = Rectangle;

Gamelab.CircleShape = Elipsoid;
Gamelab.Elipsoid = Elipsoid;
; /**
  * Creates a new Sprite.
  *
  * <info-bit>Gamelab.Sprite is a container for 2D Animations.
  * -apply Sprite class to create a 2D game-object.
  *
  * Sprites hold reference to their-own Animations and Sounds.</info-bit>
  * <iframe style='width:400px; height:450px; overflow:hidden;' src='../client/examples/js-class/Sprite.html'> </iframe>

  * @param   {string} src the srcPath for the image of the Sprite
  * @param   {number} scale=1.0 the scale to be applied to size of each animation-frame
  *
  * @returns {Sprite} a Gamelab.Sprite object
  *
  */

var Sprite = function () {
  function Sprite() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments[1];

    _classCallCheck(this, Sprite);

    var args = (typeof src === 'undefined' ? 'undefined' : _typeof(src)) == 'object' ? src : {};

    this.handleAnimationArgs(args);

    this.animations = [];

    this.sounds = [];
    this.filters = [];
    this.effects = [];

    this.actions = {};

    this.layer = 0;
    this.type = 'Sprite';

    //create size property
    this.size = new Gamelab.Vector(0, 0);
    this.active = true; //defaults to active or visible
    this.ticker = 0;

    this.scale = scale || 1.0;

    //apply canvas-src if passed
    this.handleCanvasArgs(src);

    //apply remaining args
    this.apply_args(args);

    if (!this.selected_animation) this.SingleFrame();
  }

  _createClass(Sprite, [{
    key: 'then',
    value: function then(callback) {
      this.onLoad(function () {
        callback(this);
      });
    }
  }, {
    key: 'forEachPixel',
    value: function forEachPixel(callback) {
      this.anime.forEachPixel(callback);
    }
  }, {
    key: 'handleCanvasArgs',
    value: function handleCanvasArgs(src) {

      var $sprite = this;

      if (src instanceof HTMLCanvasElement) {
        this.src = src;
        this.selected_animation = new Gamelab.GridAnimation(src);
        this.image = this.selected_animation.image;

        this.animations = [];
        this.animations.push(this.selected_animation);
        this.SingleFrame();
      } else if (typeof src == 'string') {
        this.src = src;

        var srcTail = this.src.split('/').pop();
        //set name to part of file-name, if name falsy
        if (srcTail) {
          this.name = this.name || srcTail.split('.')[0];
        }

        this.selected_animation = new Gamelab.GridAnimation(src);
        this.image = this.selected_animation.image;
        this.animations = [];
        this.animations.push(this.selected_animation);

        this.image.domElement.onerror = function () {
          $sprite.isBroken = true;
        };

        this.SingleFrame();
      }
    }
  }, {
    key: 'handleAnimationArgs',
    value: function handleAnimationArgs(args) {
      if (args instanceof Gamelab.GridAnimation) //instantiate from animation
        {
          console.info('args was Gamelab.GridAnimation', args);
          args = {
            selected_animation: args,
            image: args.image,
            size: new Gamelab.Vector(args.frameSize)
          };
        }
    }
  }, {
    key: 'Origin',
    value: function Origin(o) {
      this.origin = new Gamelab.Vector(o);
      if (this.anime) {
        this.anime.origin = new Gamelab.Vector(o);
      }
      return this;
    }
  }, {
    key: 'Layer',
    value: function Layer(l) {
      this.layer = l;
      return this;
    }
  }, {
    key: 'Size',
    value: function Size(x, y, z) {
      this.size = new Gamelab.Vector(x, y, z);
      if (this.selected_animation && this.selected_animation.frames instanceof Array) {
        this.selected_animation.Size(vector);
      }
      return this.size;
    }
  }, {
    key: 'static_image_load',
    value: function static_image_load(img) {
      this.size = new Gamelab.Vector(img.width * this.scale, img.height * this.scale).round();
    }
  }, {
    key: 'pushColorEffectCanvas',
    value: function pushColorEffectCanvas(color) {

      this.effectCanvasList = this.effectCanvasList || [];

      var canvas = document.createElement('CANVAS');
      var img = this.image.domElement;

      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.67;
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillRect(0, 0, img.width, img.height);
      ctx.globalCompositeOperation = "source-over";
      this.effectCanvasList.push(canvas);
      return this;
    }
  }, {
    key: 'GlobalComposite',
    value: function GlobalComposite(g) {
      this.globalCompositeOperation = g;
      return this;
    }
  }, {
    key: 'ColorEffect',
    value: function ColorEffect(color) {
      var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.666;

      this.clearEffects();
      this.effectCanvas = this.effectCanvas || document.createElement('CANVAS');

      var img = this.image.domElement;
      this.effectCanvas.width = img.width;
      this.effectCanvas.height = img.height;

      this.effectCtx = this.effectCtx || this.effectCanvas.getContext('2d');
      this.effectCtx.drawImage(img, 0, 0, img.width * this.scale, img.height * this.scale);

      this.effectCtx.fillStyle = color;
      this.effectCtx.globalAlpha = opacity;
      this.effectCtx.globalCompositeOperation = "source-atop";
      this.effectCtx.fillRect(0, 0, img.width, img.height);
      this.effectCtx.globalCompositeOperation = "source-over";
      this.data = this.effectCtx.getImageData(0, 0, this.effectCanvas.width, this.effectCanvas.height);
      return this;
    }
  }, {
    key: 'DrawToCanvas',
    value: function DrawToCanvas() {
      this.clearEffects();
      this.effectCanvas = this.effectCanvas || document.createElement('CANVAS');
      var img = this.image.domElement;
      this.effectCanvas.width = img.width;
      this.effectCanvas.height = img.height;
      this.effectCtx = this.effectCtx || this.effectCanvas.getContext('2d');
      this.effectCtx.drawImage(img, 0, 0, img.width, img.height);
      this.image.domElement = this.effectCanvas;
      return this;
    }
  }, {
    key: 'doCanvasEffects',
    value: function doCanvasEffects() {

      if (!this.stored) {
        this.clearEffects();
      }

      this.effectCanvas = this.effectCanvas || document.createElement('CANVAS');
      this.effectCanvasList = this.effectCanvasList || [];

      var img = this.image.domElement;

      this.img = img;
      this.effectCanvas.width = img.width;
      this.effectCanvas.height = img.height;
      this.effectCtx = this.effectCtx || this.effectCanvas.getContext('2d');
      this.effectCtx.drawImage(img, 0, 0, img.width, img.height);

      this.data = this.effectCtx.getImageData(0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.effectCanvasList.push(this.effectCanvas);

      this.stored = true;
      this.effectFrames = [];
    }
  }, {
    key: 'resetEffectFrames',
    value: function resetEffectFrames() {
      this.effectFrames = [];
      return this;
    }
  }, {
    key: 'addFilterFrame',
    value: function addFilterFrame(api, callback) {

      this.effectCanvasList = this.effectCanvasList || [];
      this.effectFrames = this.effectFrames || [];
      this.effectCanvasTimer = 0;

      if (api.timer == 0) {
        //alert('doing effects');
        this.doCanvasEffects();
      }

      var data = this.effectCtx.getImageData(0, 0, this.effectCanvas.width, this.effectCanvas.height);
      api.next(data);
      this.effectFrames.push(data);
      //    console.log('added effect data');
    }
  }, {
    key: 'DoubleBackFilterFrames',
    value: function DoubleBackFilterFrames() {
      this.effectFrames = this.effectFrames.concat(this.effectFrames.slice().reverse());
      return;
    }
  }, {
    key: 'addImageFrame',
    value: function addImageFrame(image, callback) {
      this.effectCanvasTimer = 0;
      this.effectCanvas.width = this.size.x;
      this.effectCanvas.height = this.size.y;
      this.effectCtx.drawImage(image, 0, 0, this.size.x, this.size.y);
      var data = this.effectCtx.getImageData(0, 0, this.effectCanvas.width, this.effectCanvas.height);
      console.info('effect', data);
      this.effectFrames.push(data);
      console.log('added effect data');
    }
  }, {
    key: 'clearEffects',
    value: function clearEffects() {
      if (this.effectCanvas && this.effectCtx) this.effectCtx.clearRect(0, 0, this.effectCanvas.width, this.effectCanvas.height);
      return this;
    }

    /**
     * runs a function for the onload event of this sprite's image
     *
     * @function
     * @param {Function} f the function to be called on load
     * @memberof Sprite
     **********/

  }, {
    key: 'onLoad',
    value: function onLoad(f) {

      if (this.src instanceof HTMLCanvasElement) {
        var f = f || function () {};
        f.bind(this).call(false);
      }

      if (this.image && this.image.domElement) {
        var img = this.image.domElement,
            load = img.onload;
        f = f || function () {};
        f.bind(this);
        this.load_call = f;
        var $sprite = this;
        img.onload = function () {

          $sprite.load_total += 1;

          load.bind($sprite).call(false, $sprite);
          //  $sprite.static_image_load(img);
          $sprite.load_call(false, $sprite);
        };

        img.onerror = function (err) {
          $sprite.isBroken = true;
          $sprite.load_call(true, $sprite);
        };
      } else if (this.anime && this.anime.frames instanceof Array) {
        this.load_call = f;
        f.bind(this).call();
      }

      return this;
    }
  }, {
    key: 'Opacity',
    value: function Opacity(o) {

      this.opacity = o;
      return this;
    }

    /**********
     * @ignore
     **********/

  }, {
    key: 'apply_args',
    value: function apply_args() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      this.FromData(args, true); //Using a FUNCTIONAL COPY --heavy to process

      function array_instance(list) {
        return list.slice(0);
      };

      var $sprite = this;

      if (args.image instanceof Gamelab.GameImage && !this.image) {
        this.image = args.image;
        this.image.domElement.onerror = function () {
          $sprite.sourceError();
        };
      }

      if (typeof args.name == 'string') this.name = args.name;

      //life is either provided or assumed to be approx 4 seconds
      this.life = args.life || 4000 / 50;
      this.description = args.description || "__spriteDesc";
      this.opacity = args.opacity || 1.0;
      this.color = args.color || '#ffffff';

      /**
       * @property {String} id the unique identifier of the Sprite --called automatically on constructor.
       * @memberof Sprite
       **********/

      this.id = this.create_id();

      /**
       * @property {Array} animations the array of animations attached to the Sprite
       * @memberof Sprite
       **********/

      var listnames = ['animations', 'bones', 'meshes', 'scripts', 'events', 'sounds'];

      var $object = this;

      listnames.forEach(function (ln) {

        $object[ln] = array_instance(Gamelab.getArg(args, ln, []));
      });

      /**
       * @property {Array} scripts the array of scripts attached to the Sprite
       * @memberof Sprite
       **********/

      this.motions = Gamelab.getArg(args, 'motions', []);
      this.particles = Gamelab.getArg(args, 'particles', []);
      this.shots = Gamelab.getArg(args, 'shots', []);
      this.init_ext = Gamelab.getArg(args, 'init_ext', []);
      this.group = Gamelab.getArg(args, 'group', 'one');
      this.scrollFactor = args.scrollFactor || 1.0;
      this.noScroll = args.noScroll || false;

      if (this.noScroll) {
        this.scrollFactor = 0;
      }

      /**
       * @property {Vector} speed the speed of the Sprite
       * @memberof Sprite
       **********/

      this.speed = new Gamelab.Vector(Gamelab.getArg(args, 'speed', new Gamelab.Vector(0, 0)));

      /**
       * @property {Vector} size the vector-size of the Sprite
       * @memberof Sprite
       **********/

      this.size = new Gamelab.Vector(Gamelab.getArg(args, 'size', new Gamelab.Vector(0, 0)));

      /**
       * @property {Vector} position the position of the Sprite
       * @memberof Sprite
       **********/

      this.position = new Gamelab.Vector(Gamelab.getArg(args, 'position', new Gamelab.Vector(0, 0, 0)));
      this.realPosition = new Gamelab.Vector(Gamelab.getArg(args, 'realPosition', new Gamelab.Vector(0, 0, 0)));
      this.collision_bounds = Gamelab.getArg(args, 'collision_bounds', new Gamelab.VectorBounds(new Gamelab.Vector(0, 0, 0), new Gamelab.Vector(0, 0, 0)));

      this.GROUNDED = false;

      /**
       *
       *
       * @property {Vector} rotation the rotation of the Sprite
       * @memberof Sprite
       **********/

      this.rotation = new Gamelab.Vector(Gamelab.getArg(args, 'rotation', new Gamelab.Vector(0, 0, 0)));

      /**
       * @property {number} scale the scale of the Sprite, controls draw-size
       * @memberof Sprite
       **********/

      this.scale = args.scale || 1.0;
      this.acceleration = Gamelab.getArg(args, 'acceleration', new Gamelab.Vector(0, 0, 0));
      this.rot_speed = new Gamelab.Vector(Gamelab.getArg(args, 'rot_speed', new Gamelab.Vector(0, 0)));
      this.rot_accel = new Gamelab.Vector(Gamelab.getArg(args, 'rot_accel', new Gamelab.Vector(0, 0)));
      this.padding = Gamelab.getArg(args, 'padding', new Gamelab.Vector(0, 0, 0));

      var __inst = this;

      //Apply / instantiate Sound(), Gamelab.Motion(), and Gamelab.GridAnimation() args...


      Gamelab.each(this.sounds, function (ix, item) {
        __inst.sounds[ix] = new Gamelab.Sound(item);
      });

      Gamelab.each(this.animations, function (ix, item) {
        __inst.animations[ix] = new Gamelab.GridAnimation(item);
      });

      //Apply initializers:

      Gamelab.each(this.init_ext, function (ix, item) {
        __inst.addInitializer(item);
      });

      if (!this.selected_animation && args.selected_animation) {

        //console.dev('applying animation:' + jstr(args.selected_animation));
        this.selected_animation = new Gamelab.GridAnimation(args.selected_animation);

        this.animations = [];
        if (this.animations.indexOf(this.selected_animation) == -1) this.animations.push(this.selected_animation);
      }
    }
  }, {
    key: 'RealPosition',
    value: function RealPosition() {
      return this.realPosition;
    }
  }, {
    key: 'Origin',
    value: function Origin(x, y) {
      this.origin = new Gamelab.Vector(x, y);
      var sprite = this;
      this.animations.forEach(function ($anime) {
        $anime.Origin(sprite.origin);
      });
    }

    /**
     * Clones a sprite from existing data
     *
     * @function
     * @param {Object} object the data to be cloned
     * @memberof Sprite
     **********/

  }, {
    key: 'Clone',
    value: function Clone(sprite) {
      var clone = new sprite.constructor(sprite.src);
      clone.Anime(new sprite.anime.constructor(sprite.anime));
      clone.apply_args(sprite);
      return clone;
    }
  }, {
    key: 'draw',
    value: function draw(ctx, camera) {

      if (this.isBroken && !this.hasError) {
        var $sprite = this;
        this.errorTimer = 0;
        window.setInterval(function () {

          $sprite.errorTimer += 1;

          if ($sprite.errorTimer % 300 == 0) {
            console.error('The html-image is broken for sprite:' + $sprite.name);
          }
        });
      }

      if (this.isBroken) {
        return;
      }

      var sprite;

      if (this.constructor.name == 'SpriteBrush') {
        sprite = this.selected_sprite;
      } else {
        sprite = this;
      }

      camera = camera || false;

      if (!camera && Gamelab.game_windows[0] && Gamelab.game_windows[0].camera) camera = Gamelab.game_windows[0].camera;else if (!camera) {
        camera = {
          position: new Gamelab.Vector(0, 0, 0)
        };
      }

      if (sprite.invisible) return;

      if (sprite.active && (this.DRAWOFFSCREEN || sprite.onScreen(Gamelab.WIDTH, Gamelab.HEIGHT))) {
        this.draw_current_frame(ctx, camera);
      }
    }
  }, {
    key: 'setSoleUpdate',
    value: function setSoleUpdate(callback) {
      this.update = function () {
        callback.bind(this).call();
      };
    }
  }, {
    key: 'onCollision',
    value: function onCollision(object, callback) {
      this.onUpdate(function () {
        var collisions = Gamelab.Collision.spriteBoxCollideArray([this], object);
        collisions.forEach(function (c) {
          callback(c.object, c.collider);
        });
      });
    }
  }, {
    key: 'onListCollision',
    value: function onListCollision(object, callback) {
      this.onUpdate(function () {
        callback(Gamelab.Collision.spriteCollideArray([this], object));
      });
    }

    /*****************************
     *  accel
     *  -accelerate any acceleration -key
     ***************************/

    /**
     * decelerate speed on the x-Axis, toward zero
     * @function
     * @memberof Sprite
     * @param {number} amt the increment of deceleration, negatives ignored
     *
     **********/

  }, {
    key: 'decelY',
    value: function decelY(amt) {

      amt = Math.abs(amt);

      if (Math.abs(this.speed.y) <= amt) {
        this.speed.y = 0;
      } else if (this.speed.y > amt) {

        this.speed.y -= amt;
      } else if (this.speed.y < amt * -1) {

        this.speed.y += amt;
      }
    }

    /*****************************
     *  decelX
     *  -decelerate on the X axis
     *  -args: 1 float:amt
     ***************************/

    /**
     * decelerate speed on the x-Axis, toward zero
     * @function
     * @memberof Sprite
     * @param {number} amt the increment of deceleration, negatives ignored
     *
     **********/

  }, {
    key: 'decelX',
    value: function decelX(amt) {

      amt = Math.abs(amt);

      if (this.speed.x > amt) {

        this.speed.x -= amt;
      } else if (this.speed.x < amt * -1) {

        this.speed.x += amt;
      }

      if (Math.abs(this.speed.x) <= amt) {

        this.speed.x = 0;
      }
    }

    /**
     * decelerate rspeed on the x-Axis, toward zero
     * @function
     * @memberof Sprite
     * @param {number} amt the increment of deceleration, negatives ignored
     *
     **********/

    /**
     * accelerate toward a max value on any object-property
     * @function
     * @memberof Sprite
     * @param {Object} prop The object to control
     * @param {string} key the target property-key for object argument
     * @param {number} accel the additive increase to the property on each call
     * @param {number} max the max value to accelerate towards
     **********/

  }, {
    key: 'accel',
    value: function accel(object, key, _accel, max) {

      var prop = object;

      _accel = Math.abs(_accel);

      if (typeof max == 'number') {
        max = {
          x: max
        };
      }

      var speed = prop[key];

      // this.assertSpeed();

      var diff = max.x - prop[key];

      if (diff > 0) {
        prop[key] += Math.abs(diff) >= _accel ? _accel : diff;
      };

      if (diff < 0) {
        prop[key] -= Math.abs(diff) >= _accel ? _accel : diff;
      };
    }

    /*****************************
     *  decel
     *  -deceleration -key
     ***************************/

    /**
     * decelerate toward a max value on any object-property
     * @function
     * @memberof Sprite
     * @param {Object} prop the object to control
     * @param {string} key the property-key for targeted property of prop argument
     *
     * @param {number} decel the increment of deceleration
     *
     * @param {number} max the max value to decelerate towards
     *
     *
     **********/

  }, {
    key: 'decel',
    value: function decel(prop, key, rate) {

      if ((typeof rate === 'undefined' ? 'undefined' : _typeof(rate)) == 'object') {

        rate = rate.rate;
      }

      rate = Math.abs(rate);

      if (Math.abs(prop[key]) <= rate) {
        prop[key] = 0;
      } else if (prop[key] > 0) {
        prop[key] -= rate;
      } else if (prop[key] < 0) {
        prop[key] += rate;
      } else {

        prop[key] = 0;
      }
    }

    /*****************************
     *  accelY
     *  -accelerate on Y-Axis with 'accel' and 'max' (speed) arguments
     *  -example-use: gravitation of sprite || up / down movement
     ***************************/

    /**
     * accelerate speed on the y-axis
     *
     * @function
     * @memberof Sprite
     * @param {number} accel the increment of acceleration
     * @param {number} max the maximum for speed
     *
     **********/

  }, {
    key: 'accelY',
    value: function accelY(accel, max) {

      accel = Math.abs(accel);

      if (typeof max == 'number') {
        max = {
          y: max
        };
      }

      this.assertSpeed();

      var diff = max.y - this.speed.y;

      if (diff > 0) {
        this.speed.y += Math.abs(diff) >= accel ? accel : diff;
      };

      if (diff < 0) {
        this.speed.y -= Math.abs(diff) >= accel ? accel : diff;
      };
    }

    /*****************************
     *  accelX
     *  -accelerate on x-Axis
     *  -example-use: running of sprite || left / right movement
     ***************************/

    /**
     * accelerate speed on the x-Axis
     *
     * @function
     * @memberof Sprite
     * @param {number} accel the increment of acceleration
     * @param {number} max the maximum for speed
     *
     **********/

  }, {
    key: 'accelX',
    value: function accelX(accel, max) {

      accel = Math.abs(accel);

      if (typeof max == 'number') {
        max = {
          x: max
        };
      }

      this.assertSpeed();

      var diff = max.x - this.speed.x;

      if (diff > 0) {
        this.speed.x += Math.abs(diff) >= accel ? accel : diff;
      };

      if (diff < 0) {
        this.speed.x -= Math.abs(diff) >= accel ? accel : diff;
      };
    }
  }, {
    key: 'draw_current_frame',
    value: function draw_current_frame(ctx, camera) {

      var sprite;

      if (this.isBroken) {
        return;
      }

      if (this.constructor.name == 'SpriteBrush') {
        sprite = this.selected_sprite;
      } else {
        sprite = this;
      }

      var frame = false,
          frameList = [];

      if (this.effectCanvas) {
        this.size = new Gamelab.Vector(this.effectCanvas.width * this.scale, this.effectCanvas.height * this.scale), this.Origin(this.size.div(2.0));

        console.log('drawing effect canvas');

        var imageFrameArgs = {
          image: this.effectCanvas,
          framePos: new Gamelab.Vector(0, 0),
          frameSize: this.size,
          position: new Gamelab.Vector2D(Math.round(this.position.x + this.origin.x), Math.round(this.position.y + this.origin.y)),
          size: this.size,
          rotation: this.rotation.x,
          canvasContext: ctx,
          flipX: this.flipX,
          flipY: this.flipY,
          origin: this.origin,
          globalAlpha: this.opacity,
          globalComposite: this.globalCompositeOperation || false
        };

        return Gamelab.Canvas.draw_image_frame(imageFrameArgs);
      }

      if (sprite.active) {

        if (sprite.selected_animation instanceof Array && sprite.selected_animation.length >= 1) {
          sprite.selected_animation.forEach(function (anime) {
            frameList.push(anime.selected_frame);
          });
        }

        if (sprite.selected_animation instanceof Object && sprite.selected_animation.hasOwnProperty('selected_frame')) {
          frame = sprite.selected_animation.selected_frame;
        }

        var p = sprite.position;

        var camera_pos = camera.position || {
          x: 0,
          y: 0,
          z: 0
        };

        if (!sprite.hasOwnProperty('scrollFactor')) {
          sprite.scrollFactor = 1.0;
        }

        var x = p.x,
            y = p.y,
            scrollFactor = sprite.scrollFactor >= -1.0 && sprite.scrollFactor <= 1.0 ? sprite.scrollFactor : 1.0;

        if (sprite.noScroll) {
          scrollFactor = 0;
        }

        //optional animation : gameSize

        var targetSize = sprite.size || sprite.selected_animation.size;

        var realWidth = targetSize.x;
        var realHeight = targetSize.y;

        var origin = sprite.origin || new Gamelab.Vector(realWidth / 2, realHeight / 2);

        //optional animation : offset

        var rotation;

        if (_typeof(sprite.rotation) == 'object') {
          rotation = sprite.rotation.x;
        } else {
          rotation = sprite.rotation;
        }

        if (this.image && this.image.domElement instanceof HTMLCanvasElement) {
          var x = this.position.x,
              y = this.position.y;

          x -= camera_pos.x * scrollFactor || 0;
          y -= camera_pos.y * scrollFactor || 0;
          //  console.log('sprite:: canvas draw!! ');

          var _imageFrameArgs = {
            image: this.image.domElement,
            framePos: new Gamelab.Vector(0, 0),
            frameSize: this.size,
            position: new Gamelab.Vector2D(Math.round(x + origin.x), Math.round(y + origin.y)),
            size: new Gamelab.Vector2D(realWidth, realHeight),
            rotation: rotation % 360,
            canvasContext: ctx,
            flipX: sprite.flipX,
            flipY: sprite.flipY,
            origin: origin,
            globalAlpha: this.opacity,
            globalComposite: this.globalCompositeOperation || false
          };

          return Gamelab.Canvas.draw_image_frame(_imageFrameArgs);
        }

        if (!(sprite.selected_animation && sprite.selected_animation.selected_frame)) {
          return;
        }

        var frame = sprite.selected_animation.selected_frame;

        if (frame && frame.image && frame.image.data) {

          ctx.putImageData(frame.image.data, x, y, 0, 0, sprite.size.x, sprite.size.y);
        } else {

          if (frameList.length >= 1) {

            frameList.forEach(function (frame) {

              var realWidth = frame.size.x;
              var realHeight = frame.size.y;

              var xpos = frame.position.x,
                  ypos = frame.position.y;

              x += sprite.position.x;
              y += sprite.position.y;

              x -= camera_pos.x * scrollFactor || 0;
              y -= camera_pos.y * scrollFactor || 0;

              sprite.realPosition = new Gamelab.Vector(x, y);

              if (frame.rotation && typeof frame.rotation.x == 'number') {
                rotation = frame.rotation.x;
              }

              if (frame.origin) {
                origin = frame.origin;
                //console.log('drawing with origin:' + origin.x + ':' + origin.y);
              }

              if (frame && frame.image) {
                var _imageFrameArgs2 = {
                  image: sprite.effectCanvas ? sprite.effectCanvas : frame.image.domElement,
                  framePos: frame.framePos,
                  frameSize: frame.frameSize,
                  position: new Gamelab.Vector2D(Math.round(xpos + origin.x), Math.round(ypos + origin.y)),
                  size: new Gamelab.Vector2D(realWidth, realHeight),
                  rotation: rotation % 360,
                  canvasContext: ctx,
                  flipX: sprite.flipX,
                  flipY: sprite.flipY,
                  origin: origin,
                  globalAlpha: this.opacity,
                  globalComposite: this.globalCompositeOperation || false
                };

                return Gamelab.Canvas.draw_image_frame(_imageFrameArgs2);
              }
            });
          } else {
            var fx = frame.position.x,
                fy = frame.position.y,
                pos = new Gamelab.Vector(x + fx, y + fy);

            pos.x -= camera_pos.x * scrollFactor || 0;
            pos.y -= camera_pos.y * scrollFactor || 0;
            sprite.realPosition = pos;
            if (frame.image.domElement instanceof HTMLImageElement || frame.image.domElement instanceof HTMLCanvasElement) {

              var _imageFrameArgs3 = {
                image: this.effectCanvas ? this.effectCanvas : frame.image.domElement,
                framePos: frame.framePos,
                frameSize: frame.frameSize,
                position: new Gamelab.Vector2D(Math.round(pos.x + origin.x), Math.round(pos.y + origin.y)),
                size: new Gamelab.Vector2D(realWidth, realHeight),
                rotation: rotation % 360,
                canvasContext: ctx,
                flipX: sprite.flipX,
                flipY: sprite.flipY,
                origin: origin,
                globalAlpha: this.opacity,
                globalComposite: this.globalCompositeOperation || false
              };

              return Gamelab.Canvas.draw_image_frame(_imageFrameArgs3);
            }
          }
        }
      }
    }

    /**
     * adds an animation to the sprites
     *
     * @function
     * @param {Object} object the animation to be added
     * @memberof Sprite
     **********/

  }, {
    key: 'Add',
    value: function Add(object) {

      if (object instanceof Gamelab.GridAnimation) {
        this.animations.add(object);
      }

      return this;
    }
  }, {
    key: 'Anime',
    value: function Anime(anime) {
      if (anime) this.selected_animation = anime;
      return this;
    }
  }, {
    key: 'Animation',
    value: function Animation(anime) {
      if (anime) this.selected_animation = anime;
      return this;
    }
  }, {
    key: 'FromData',
    value: function FromData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var fxlCopy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      for (var x in data) {
        if (fxlCopy || typeof data[x] !== 'function') this[x] = data[x];
      }

      if (data.update) {
        this.update = data.update;
      }
      return this;
    }
  }, {
    key: 'FromSourceImage',
    value: function FromSourceImage(src) {
      return new this.constructor(src);
    }

    /**************************************************************
     * scales the sprite.size property according to image-size.
     * @param {number} scaleFloat a 0-1+ value
     *
     * @function
     * @memberof Sprite
     **************************************************************/

  }, {
    key: 'Scale',
    value: function Scale(scaleFloat) {
      var frameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      this.scale = scaleFloat;

      if (this.anime && this.anime.frameSize && this.anime.frameSize.above_zero_xy()) {
        frameSize = this.anime.frameSize;
      }

      var size_x = frameSize.x || this.image.domElement.width,
          size_y = frameSize.y || this.image.domElement.height;

      var size = new Gamelab.Vector(size_x * scaleFloat, size_y * scaleFloat);

      if (!this.size || isNaN(this.size.x) || isNaN(this.size.y)) this.size = new Gamelab.Vector(0, 0);

      var diffpos = size.sub(this.size).half();

      this.position.x -= diffpos.x;
      this.position.y -= diffpos.y;
      this.size = size;

      return this;
    }

    /**************************************************************
     * applies a float value arg to Sprite.scrollFactor
     * @param {number} s a 0-1+ value
     *
     * @function
     * @memberof Sprite
     **************************************************************/

  }, {
    key: 'ScrollFactor',
    value: function ScrollFactor(s) {
      this.scrollFactor = s;
      return this;
    }
  }, {
    key: 'engage',
    value: function engage(obj) //engages an object having an engage function
    {
      obj.parent = this;
      if (obj.engage) {
        obj.engage();
      }
    }

    /**
     * pass argument v to the sprite.life property.
     * @function
     * @memberof Sprite
     * @param {number} v number of render-updates that this Sprite will last. --update occurs 60+ times per second, or less, depending on performance
     * @returns {Sprite} the sprite object --enables chainable function calls
     **********/

  }, {
    key: 'Life',
    value: function Life(v) {
      this.life = v;
      return this;
    }

    /**
     * initializes sprites. triggers all functions previously passed to the addInitializer function.
     * Use this function when a sprite, instantiated from json-data, carries initializers.
     * --This feature is built for the purpose of data-persistence. --sprites from json-file may carry behaviors onto the scene.
     *
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'init',
    value: function init() {}

    /**
     * extends the init function.
     * @function
     * @memberof Sprite
     * @param {function} fun the function to be passed into the init function of the sprite
     **********/

  }, {
    key: 'addInitializer',
    value: function addInitializer(fun) {

      if (!(typeof fun == 'function')) return;

      var boundFun = fun.bind(this);
      if (this.init_ext.indexOf(boundFun) < 0) {
        this.init_ext.push(boundFun);
      };
    }

    /*****************************
     * Getters
     ***************************/

    /**
     * returns the 'id' property of the sprite
     * @function
     * @memberof Sprite
     * @returns {string}
     **********/

  }, {
    key: 'get_id',
    value: function get_id() {
      return this.id;
    }

    /**********
     * @ignore
     **********/

  }, {
    key: 'to_map_object',
    value: function to_map_object(size, framesize) {

      this.__mapSize = new Gamelab.Vector(size || this.size);

      this.frameSize = new Gamelab.Vector(framesize || this.size);

      return this;
    }

    /*****************************
     * Setters and Creators
     ***************************/

    /**
     * creates a unique string id property for the sprite.
     * @function
     * @memberof Sprite
     * @returns {string}
     **********/

  }, {
    key: 'create_id',
    value: function create_id() {

      return Gamelab.create_id();
    }

    /**
     * returns a maximum scaled size, according to max dimensions of width and height
     * @param {number} mx the maximum size.x for the returned size
     * @param {number} my the maximum size.y for the returned size
     * @function
     * @memberof Sprite
     * @returns {Vector} a vector of x,y,z? values
     **********/

  }, {
    key: 'getSizeByMax',
    value: function getSizeByMax(mx, my) {

      var size = new Gamelab.Vector(this.size);
      var wth = size.y / size.x;
      var htw = size.x / size.y;

      if (size.x > mx) {
        size.x = mx;
        size.y = size.x * wth;
      }

      if (size.y > my) {
        size.y = my;
        size.x = size.y * htw;
      }

      return size;
    }

    /*****************************
     *  assert the existence of a speed{} property
     *  sprite.speed (vector) is created if not existing in sprite
     *  @memberof Sprite
     ***************************/

  }, {
    key: 'assertSpeed',
    value: function assertSpeed() {
      if (!this.speed) {
        this.speed = new Gamelab.Vector(0, 0, 0);
      }
    }

    /**
     * set the 'selected_animation' property to a single-frame-animation
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'SingleFrame',
    value: function SingleFrame() {

      if (!this.image || !this.image.domElement) {
        return this;
      }

      var __inst = this,
          load = this.image.domElement.onload || function () {};

      if (this.size && this.size.x !== 0 && this.size.y !== 0) return;

      var _obj = this;

      if (this.image.domElement instanceof HTMLCanvasElement) {
        if (_obj.size && _obj.size.x !== 0 && _obj.size.y !== 0) {} else {
          __inst.size = new Gamelab.Vector(__inst.image.domElement.width, __inst.image.domElement.height);
          __inst.selected_animation = new Gamelab.GridAnimation(this.image.domElement).FrameSize(__inst.size);
          __inst.animations = [];
          __inst.animations.push(__inst.selected_animation);
          __inst.Scale(__inst.scale || 1.0);
        }

        return this;
      }

      this.image.domElement.onerror = function () {
        _obj.isBroken = true;
      };

      this.image.domElement.onload = function () {

        load(false, __inst);

        if (_obj.size && _obj.size.x !== 0 && _obj.size.y !== 0) {} else {
          __inst.size = new Gamelab.Vector(__inst.image.domElement.width, __inst.image.domElement.height);
          __inst.selected_animation = new Gamelab.GridAnimation(__inst.image).FrameSize(__inst.size);
          __inst.animations = [];
          __inst.animations.push(__inst.selected_animation);
          __inst.Scale(__inst.scale || 1.0);
        }
      };

      Gamelab.log('set single-frame animation');
      return this;
    }

    /**
     * set the 'life' property to a specified integer
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'LifeSpan',
    value: function LifeSpan(value) {
      this.life = value;
    }

    /**
     * set the 'life' property to a specified integer
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'Life',
    value: function Life(value) //same as LifeSpan
    {
      this.life = value;
    }

    /**
     * tells if sprite has been taken out of game
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'isDead',
    value: function isDead(gw) {
      gw = gw || Gamelab.game_windows[0];
      return this.hasOwnProperty('life') && this.life <= 0;
    }

    /**
     * sets life to 0, then ending the sprite
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'die',
    value: function die(gw) {
      this.life = 0;
      return this;
    }

    /**
     * indicates if any portion of the sprite is within screen bounds --uses Gamelab.WIDTH, Gamelab.HEIGHT OR any w,h arguments passed to this method
     * @function
     * @memberof Sprite
     * @param {number} w optional screen-width argument, defaults to Gamelab.WIDTH
     * @param {number} h optional screen-height argument, defaults to Gamelab.HEIGHT
     * @returns {boolean} a true or false value to show if any part of the sprite is on-screen
     **********/

  }, {
    key: 'onScreen',
    value: function onScreen(w, h, gw) {

      w = w || Gamelab.WIDTH;
      h = h || Gamelab.HEIGHT;
      gw = gw || Gamelab.game_windows[0];

      var camera = gw && gw.camera ? gw.camera : Gamelab && Gamelab.camera ? Gamelab.camera : {
        position: new Gamelab.Vector(0, 0, 0)
      },
          scrollFactor = this.noScroll ? 0 : this.scrollFactor;

      var sprite = this,
          p = sprite.position,
          camera_pos = camera.position || {
        x: 0,
        y: 0,
        z: 0
      };

      if (!sprite.hasOwnProperty('scrollFactor')) {
        sprite.scrollFactor = 1.0;
      }

      var x = p.x,
          y = p.y,
          scrollFactor = sprite.scrollFactor >= -1.0 && sprite.scrollFactor <= 1.0 ? sprite.scrollFactor : 1.0;

      if (sprite.noScroll) {
        scrollFactor = 0;
      }

      x -= camera_pos.x * scrollFactor || 0;
      y -= camera_pos.y * scrollFactor || 0;

      return x + sprite.size.x > -1000 - w && x < w + 1000 && y + sprite.size.y > -1000 - h && y < h + 1000;
    }

    /*****************************
     * Updates
     ***************************/

    /*****************************
     * update()
     * -starts empty:: is applied recursively by Gamelab.js as the main sprite-update
     ***************************/

    /**
     * the main update for the sprite --applied recursively by GameWindow
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'update',
    value: function update(sprite) {}
  }, {
    key: 'updateBySpeed',
    value: function updateBySpeed() {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }

    /**
     * addAction
     * @function
     * @memberof Sprite
     * @param {name} name the name of the action
     * @param {options} options the object of options
     * @param {caller} caller the caller function
     * @param {name} name the name of the action
     **********/

  }, {
    key: 'addAction',
    value: function addAction(name, options, caller) {

      if (typeof options == 'function') {
        caller = options;
        options = undefined;
      }

      var actionObject;

      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object' && name.constructor.name == 'Action') {
        actionObject = name;
      } else {

        actionObject = new StateAction().Name(name).Options(options).Call(caller);
      }

      actionObject.Parent(this);

      this.actions[name] = actionObject;
    }

    /**
     * callAction
     * @function
     * @memberof Sprite
     * @param {name} name the name of the action
     **********/

  }, {
    key: 'callAction',
    value: function callAction(name) {

      //look for an action.function() by this name
      //or object with engage() function:
      //(allows props to be attached to the parent object)

      if (this.actions[name] && typeof this.actions[name] == 'function') {
        this.actions[name]();
      } else if (this.actions[name] && _typeof(this.actions[name]) == 'object' && typeof this.actions[name].commit == 'function') {

        this.actions[name].commit();
      }
    }

    /*****************************
     *  onUpdate(fun)
     * -args: 1 function(sprite){ } //the self-instance/sprite is passed into the function()
     * -overrides and maintains existing code for update(){} function
     ***************************/

    /**
     * extends the update of this sprite with a new function to be called during the update
     * --repeated calls will extend, (not replace) the update --Allows multiple extensions of the update
     * @function
     * @memberof Sprite
     * @param {function} fun the function to be appended to sprite.update
     *
     *  * @example
     * // extend the behavior of your sprite
     * mySprite.onUpdate(function(spr)
     *
     *                    console.log('extended update'); //runs automatically whenever sprite.update runs
     *
     *                   });
     *
     **********/

  }, {
    key: 'onUpdate',
    value: function onUpdate(fun) {

      fun = fun.bind(this);

      var update = this.update.bind(this);

      var __inst = this;

      this.update = function (__inst) {

        update(__inst);

        fun(__inst);
      };
    }

    /*****************************
     *  travelLineTwoWay()
     *  -sprite travels line: any Line() or object with property of line
     ***************************/

    /********************************************************************************
     * sprite travels on a line in a back-and-forth motion --to the end of the line, and back.
     * #Dev-todo:MORE ON THIS
     * @function
     * @memberof Sprite
     *********************************************************************************/

  }, {
    key: 'travelLineTwoWay',
    value: function travelLineTwoWay(lineObject, speed, curveKey, offset) {

      speed = speed || 1;

      var motionCurveOptions = ["linear", "quadratic", "cubic"];
      curveKey = curveKey || "linear";
      var line = lineObject;

      if (lineObject.line) {
        line = lineObject.line;
      }

      this.__crtLineIx = this.__crtLineIx || 0;

      var __inst = this,
          pctFloat = __inst.__crtLineIx % ((line.points.length - 1) / 2) / ((line.points.length - 1) / 2);

      if (__inst.__crtLineIx >= (line.points.length - 1) / 2) {
        pctFloat = 1.0 - pctFloat;
      }

      var ixChange = Gamelab.Curves.InOut[curveKey](pctFloat) * speed * 0.5;

      if (curveKey == 'linear') {
        ixChange = speed;
      }

      ixChange = Math.ceil(ixChange);

      if (ixChange < 1) {
        ixChange = 1;
      }

      __inst.position = new Gamelab.Vector(line.points[__inst.__crtLineIx]);

      //console.log(ixChange);

      __inst.__crtLineIx += ixChange;

      if (__inst.__crtLineIx >= line.points.length) {
        line.points = line.points.reverse();
        __inst.__crtLineIx = 0;
      }

      if (offset instanceof Gamelab.Vector) {
        this.position = this.position.add(offset);
      }
    }

    /*****************************
     *  travelLineOnLoop()
     *  -sprite travels line: any Line() or object with property of line
     ***************************/

    /**
     * the sprite travels one line in a looping motion --useful for traveling Square, Circle, or other enclosed Lines.
     * #Dev-todo:MORE ON THIS
     * @function
     * @memberof Sprite
     **********/

  }, {
    key: 'travelLineOnLoop',
    value: function travelLineOnLoop(lineObject, speed, curveKey, offset) {

      speed = speed || 1;

      var motionCurveOptions = ["linear", "quadratic", "cubic"];

      curveKey = curveKey || "linear";

      var line = lineObject;

      if (lineObject.line) {
        line = lineObject.line;
      }

      this.__crtLineIx = this.__crtLineIx || 0;

      var __inst = this,
          pctFloat = __inst.__crtLineIx % ((line.points.length - 1) / 2) / ((line.points.length - 1) / 2);

      if (__inst.__crtLineIx >= (line.points.length - 1) / 2) {
        pctFloat = 1.0 - pctFloat;
      }

      var ixChange = Gamelab.Curves.InOut[curveKey](pctFloat) * speed * 0.5;

      if (curveKey == 'linear') {
        ixChange = speed;
      }

      ixChange = Math.ceil(ixChange);

      if (ixChange < 1) {
        ixChange = 1;
      }

      __inst.position = new Gamelab.Vector(line.points[__inst.__crtLineIx]);

      // console.log(ixChange);

      __inst.__crtLineIx += ixChange;

      if (__inst.__crtLineIx >= line.points.length) {
        __inst.__crtLineIx = 0;
      }

      if (offset instanceof Gamelab.Vector) {
        this.position = this.position.add(offset);
      }
    }

    /*****************************
     *  shoot(sprite)
     *  -fire a shot from the sprite:: as in a firing gun or spaceship
     *  -takes options{} for number of shots anglePerShot etc...
     *  -TODO: complete and test this code
     ***************************/

    /**
     * fire a Shot, or bullet-Sprite from the Sprite
     * @function
     * @memberof Sprite
     * @param {Object} options an object of arguments
     * @param {Gamelab.GridAnimation} animation the animation to fire from the Sprite
     * @param {number} speed the speed of the shot that is projected
     * @param {Gamelab.Vector} position the initial position of the shot: defaults to current Sprite position
     * @param {Gamelab.Vector} size the Vector size of the shot
     * @param {Gamelab.Vector} rot_offset the rotational offset to apply: controls direction of the shot
     **********/

  }, {
    key: 'shoot',
    value: function shoot(options, gw) {
      //character shoots an animation
      gw = gw || Gamelab.game_windows[0];
      this.prep_key = 'shoot';

      var animation = options.bullet || options.animation || options.anime || new Gamelab.GridAnimation();
      var speed = options.speed || options.velocity || 1;

      var size = options.size || new Gamelab.Vector(10, 10, 0);
      var position = new Gamelab.Vector(options.position) || new Gamelab.Vector(this.position);

      var rot_offset = options.rot_offset || options.rotation || 0;
      var total = options.total || 1;
      var rot_disp = options.rot_disp || 0; //the full rotational-dispersion of the bullets

      var life = options.life || 900;
      var shots = [];
      for (var x = 0; x < total; x++) {

        var __playerInst = this;
        if (Gamelab.isAtPlay) {
          var bx = position.x,
              by = position.y,
              bw = size.x,
              bh = size.y;

          var shot = new Gamelab.Sprite().FromData({
            active: true,
            position: new Gamelab.Vector(position),
            size: new Gamelab.Vector(size),
            speed: speed,
            image: animation.image,
            rotation: new Gamelab.Vector(0, 0, 0),
            flipX: false,
            life: options.life,
            noScroll: true
          });

          shot.Animation(animation);

          rot_offset = new Gamelab.Vector(rot_offset, 0, 0);
          shot.position.x = bx, shot.position.y = by;

          //Danger On this line: annoying math --dispersing rotation of bullets by rot_disp

          var div = rot_disp / total;
          var rotPlus = div * x + div / 2 - rot_disp / 2;

          shot.rotation.x = rot_offset.x + rotPlus;
          //  shot.origin = new Gamelab.Vector(position);

          shot.speed = new Gamelab.Vector(Math.cos(shot.rotation.x * 3.14 / 180) * speed, Math.sin(shot.rotation.x * 3.14 / 180) * speed);
          shots.push(shot);

          shot.onUpdate(function (spr) {
            // console.log('update:rotation:' + shot.rotation.x);
          });
          gw.add(shot);
        }
      }
      return shots;
    }

    /**
     * create a sub-sprite belonging to the current sprite
     * @function
     * @memberof Sprite
     * @param {Object} options an object of arguments
     * @param {Animation} animation the animation to fire from the Sprite
     * @param {number} speed the speed of the shot that is projected
     * @param {Vector} position the initial position of the shot: defaults to current Sprite position
     * @param {Vector} size the Vector size of the shot
     * @param {Vector} offset the positional offset to apply
     * @returns {Sprite} a Gamelab.Sprite object
     **********/

  }, {
    key: 'subsprite',
    value: function subsprite(options, gw) {

      gw = gw || Gamelab.game_windows[0];

      var animation = options.animation || new Gamelab.GridAnimation();
      var position = options.position || new Gamelab.Vector(this.position);
      var offset = options.offset || new Gamelab.Vector(0, 0, 0);
      var size = new Gamelab.Vector(options.size || this.size);

      if (Gamelab.isAtPlay) {

        var subsprite = gw.add(new Gamelab.Sprite().FromData({
          active: true,
          position: position,
          size: size,
          offset: offset,
          image: animation.image,
          rotation: new Gamelab.Vector(0, 0, 0),
          flipX: false,
          scrollFactor: this.scrollFactor,
          noScroll: this.noScroll
        }));

        subsprite.Animation(animation);

        return subsprite;
      } else {
        console.error('No subsprite when not at play');
      }
    }

    /**
     * switch to the next frame on sprite.selected_animation
     * @function
     * @memberof Sprite
     * @param {Animation} animation the optional animation to switch to before animate is called, defaults to the existing sprite.selected_animation
     **********/

  }, {
    key: 'animate',
    value: function animate(animation) {
      if (Gamelab.isAtPlay) {
        if (animation) {
          this.Animation(animation);
        }

        if (this.effectFrames instanceof Array && this.effectFrames.length && this.effectFrames.length >= 1) {
          this.effectCanvasTimer += 1;

          console.log('drawing from effect');

          var data = this.effectFrames[this.effectCanvasTimer % this.effectFrames.length];
          //  this.clearEffects();
          this.effectCtx.putImageData(data, 0, 0);
          console.log('animated data');
        } else if (this.effectCanvas) {
          this.effectCanvasTimer += 1;
          //do nothing
        } else if (this.selected_animation) {
          this.selected_animation.run();
        }
      }
    }

    /**
     * run a function when the sprite.selected_animation is complete
     *
     * @function
     * @memberof Sprite
     * @param {Function} fun the function to call when the animation is complete
     *
     **********/

  }, {
    key: 'onAnimationComplete',
    value: function onAnimationComplete(fun) {
      this.selected_animation.onComplete(fun);
    }
  }, {
    key: 'grounded',
    value: function grounded(value) {
      if (value) this.GROUNDED = value;
      return this.GROUNDED;
    }

    /**
     * get the vector-position at the center of the sprite, based on its current position and size
     * @function
     * @memberof Sprite
     *
     * @returns (Vector) a vector-position pinpointing the current-center of the sprite
     *
     **********/

  }, {
    key: 'center',
    value: function center() {
      return new Gamelab.Vector(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2, 0);
    }

    /*****************************
     *  System Use / Collision
     ***************************/

    /*****************************
     * @ignore
     ***************************/

  }, {
    key: 'shortest_stop',
    value: function shortest_stop(item, callback) {
      var diff_min_y = item.min ? item.min.y : Math.abs(item.position.y - this.position.y + this.size.y);
      var diff_min_x = item.min ? item.min.x : Math.abs(item.position.x - this.position.x + this.size.x);
      var diff_max_y = item.max ? item.max.y : Math.abs(item.position.y + item.size.y - this.position.y);
      var diff_max_x = item.max ? item.max.x : Math.abs(item.position.x + item.size.x - this.position.y);

      var dimens = {
        top: diff_min_y,
        left: diff_min_x,
        bottom: diff_max_y,
        right: diff_max_x
      };

      var minkey = "",
          min = 10000000;

      for (var x in dimens) {
        if (dimens[x] < min) {
          min = dimens[x];
          minkey = x; // a key of top left bottom or right
        }
      }

      callback(minkey);
    }
  }, {
    key: 'setGrounded',
    value: function setGrounded(grounded) {

      this.grounded = grounded;

      this.__inAir = !this.grounded;
    }

    /*************
     * #BE CAREFUL
     * -with this function :: change sensitive / tricky / 4 way collision
     * *************/

    /**
     * determine if sprite overlaps on x-axis with another sprite
     *
     * @function
     * @memberof Sprite
     * @param {Sprite} item the Sprite to compare with
     * @param {number} padding the 0-1.0 float value of padding to use on self when testing overlap
     * @returns {boolean} a true || false var showing if overlap has occured
     *
     **********/

  }, {
    key: 'overlap_x',
    value: function overlap_x(item, padding) {
      if (!padding) {
        padding = 0;
      }

      var p1 = this.position,
          p2 = item.position;
      var paddingX = Math.round(padding * this.size.x),
          paddingY = Math.round(padding * this.size.y),
          left = item.position.x,
          right = item.position.x + item.size.x;

      var pLeft = this.position.x + paddingX,
          pRight = this.position.x + this.size.x - paddingX;

      return right > pLeft && left < pRight;
    }

    /*************
     * #BE CAREFUL
     * -with this function :: change sensitive / tricky / 4 way collision
     * *************/

    /**
     * determine if sprite overlaps on y-axis with another sprite
     * @function
     * @memberof Sprite
     * @param {Sprite} item the Sprite to compare with
     * @param {number} padding the 0-1.0 float value of padding to use on self when testing overlap
     * @returns {boolean} a true || false var showing if overlap has occured
     *
     **********/

  }, {
    key: 'overlap_y',
    value: function overlap_y(item, padding) {
      if (!padding) {
        padding = 0;
      }

      var p1 = this.position,
          p2 = item.position;
      var paddingX = Math.round(padding * this.size.x),
          paddingY = Math.round(padding * this.size.y),
          top = item.position.y + paddingY,
          bottom = item.position.y + item.size.y - paddingY;

      return bottom > p1.y && top < p1.y + this.size.y;
    }
  }, {
    key: 'item_pos_y',
    value: function item_pos_y(item, padding) {
      if (!padding) {
        padding = 0;
      }

      var paddingY = Math.round(padding * this.size.y),
          top = item.position.y + paddingY;

      return top - this.size.y;
    }

    /*************
     * #BE CAREFUL
     * -with this function :: change sensitive / tricky / 4 way collision
     * *************/

    /**
     * stop collision on x-axis with another sprite
     * @function
     * @memberof Sprite
     * @param {Sprite} item the Sprite with which to collide-stop on the x-axis
     **********/

  }, {
    key: 'collide_stop_x',
    value: function collide_stop_x(item) {

      var apart = false;
      var ct = 500;

      while (!apart && ct > 0) {
        ct--;

        var diffX = this.center().sub(item.center()).x;
        var distX = Math.abs(this.size.x / 2 + item.size.x / 2 - Math.round(this.size.x * this.padding.x));

        if (Math.abs(diffX) < distX) {
          this.position.x -= diffX > 0 ? -1 : 1;
        } else {
          this.speed.x = 0;
          apart = true;
        }
      }
    }

    /**
     * collide-stop only from the top (of the sprite passed as argument) ::
     *
     * @function
     * @memberof Sprite
     * @param {Sprite} item the Sprite to collide with
     *
     **********/

  }, {
    key: 'get_highest_ground_from_array',
    value: function get_highest_ground_from_array(items, paddingX) {

      this.solidGroundPosition = new Gamelab.Vector(Infinity, Infinity);

      this.solidGroundSprite = undefined;

      paddingX = paddingX || this.padding.x;

      for (var x = 0; x < items.length; x++) {
        var item = items[x];

        if (this.overlap_x(item, paddingX)) {

          var paddingY = this.padding.y * this.size.y;

          var p1 = this.position,
              p2 = item.position;

          if (this.position.y < p2.y) {

            var nextY = p2.y;

            if (nextY < this.solidGroundPosition.y) {
              this.solidGroundPosition.y = nextY;
              this.solidGroundSprite = item;
            }
          }
        }
      }

      return this.solidGroundSprite;
    }

    /**
     * restore a sprite from existing json-data --applies to data-persistence
     *
     * @function
     * @memberof Sprite
     *
     * @returns (Sprite)
     **********/

  }, {
    key: 'restoreFrom',
    value: function restoreFrom(data) {
      data.image = new GameImage(data.src || data.image.src);
      return new Gamelab.Sprite(data);
    }
  }, {
    key: 'ColoredRect',
    value: function ColoredRect(color, w, h) {
      var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext('2d');
      this.canvas = canvas;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, w, h);
      this.image = new Gamelab.GameImage(canvas);
      this.ctx = ctx;
      this.size = new Gamelab.Vector(w, h);
      return this;
    }
  }, {
    key: 'AsCanvasTiles',
    value: function AsCanvasTiles(tilesX, tilesY, unitWidth, unitHeight) {

      var canvas = document.createElement('canvas');

      var width = unitWidth * tilesX + unitWidth,
          height = unitHeight * tilesY + unitHeight;

      canvas.width = width;
      canvas.height = height;

      this.size = new Gamelab.Vector(w, h);

      var ctx = canvas.getContext('2d');

      this.canvas = canvas;
      this.srcImageSave = new Gamelab.GameImage(this.image.domElement.src);

      var $object = this;

      this.srcImageSave.domElement.onload = function () {

        for (var x = 0; x < tilesX; x++) {
          for (var y = 0; y < tilesY; y++) {
            ctx.drawImage(this, x * $object.size.x, y * $object.size.y, unitWidth, unitHeight);
          }
        }
      };

      this.image = new Gamelab.GameImage(canvas);

      this.ctx = ctx;
      return this;
    }

    /*****************************
     * @ignore
     * #IN-TESTING
     *  fromFile(file_path)
     *  -TODO : complete this function based on code to load Sprite() from file, located in the spritemaker.html file
     *  -TODO: test this function
     ***************************/

  }, {
    key: 'fromFile',
    value: function fromFile(file_path) {
      if (typeof file_path == 'string') {
        var __inst = this;
        $.getJSON(file_path, function (data) {
          __inst = new Gamelab.Sprite(data);
        });
      }
    }

    /*****************************
     * return a decycled json-string for the sprite --without circular references
     * @returns {string} a json string
     ***************************/

  }, {
    key: 'toJSONString',
    value: function toJSONString() {
      return jstr(JSON.decycle(this));
    }
  }, {
    key: 'animation',
    get: function get() {
      return this.selected_animation;
    }
  }, {
    key: 'anime',
    get: function get() {
      return this.selected_animation;
    }
  }]);

  return Sprite;
}();

;

Gamelab.Sprite = Sprite;
; /**
  * Creates a new BoneSprite.
  *
  * <info-bit>Gamelab.BoneSprite is a container for 2D Animations.
  * -apply Sprite class to create a 2D game-object.
  *
  * BoneSprites are a group of moving animations.</info-bit>
  * <iframe style='width:400px; height:450px; overflow:hidden;' src='../client/examples/js-class/Sprite.html'> </iframe>

  * @param   {string} src the srcPath for the image of the Sprite
  * @param   {number} scale=1.0 the scale to be applied to size of each animation-frame
  *
  * @returns {Sprite} a Gamelab.BoneSprite object
  */

var BoneSprite = function (_Sprite) {
  _inherits(BoneSprite, _Sprite);

  function BoneSprite() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;

    _classCallCheck(this, BoneSprite);

    var _this10 = _possibleConstructorReturn(this, (BoneSprite.__proto__ || Object.getPrototypeOf(BoneSprite)).call(this, src, scale));

    _this10.bones = [];
    return _this10;
  }

  _createClass(BoneSprite, [{
    key: 'addBone',
    value: function addBone(oncreate) {
      var bone = new Bone(this, this.size);
      oncreate.bind(bone).call();
      this.bones.push(bone);
    }
  }, {
    key: 'updateBones',
    value: function updateBones() {

      this.bones[0].SetParentPosition(this.position);

      var boffset = this.bones[0].CalcOffset();

      var count = 0;

      for (var x = 0; x < this.bones.length; x += 2) {

        if (this.bones[x] && this.bones[x + 1]) {
          var b1 = this.bones[x],
              b2 = this.bones[x + 1];
          boffset = b1.CalcOffset();
          b2.SetParentPosition(boffset);
          b2.CalcOffset(b1);
        }
      }
    }
  }, {
    key: 'draw_current_frame',
    value: function draw_current_frame(ctx, camera) {

      var sprite = this;
      var frameList = [];
      if (sprite.active) {

        if (sprite.selected_animation instanceof Array && sprite.selected_animation.length >= 1) {
          sprite.selected_animation.forEach(function (anime) {

            anime.selected_frame.parent = anime;
            frameList.push(anime.selected_frame);
          });
        }

        var origin = sprite.origin || new Gamelab.Vector(0, 0);
        var rotation = sprite.rotation.x;

        frameList.reverse().forEach(function (frame) {

          var realWidth = frame.size.x;
          var realHeight = frame.size.y;

          var x = frame.position.x,
              y = frame.position.y;

          if (frame.rotation && typeof frame.rotation.x == 'number') {
            rotation = frame.rotation.x;
          }

          if (frame.origin) {
            origin = frame.origin;
            //console.log('drawing with origin:' + origin.x + ':' + origin.y);
          }

          var frame_offset = new Gamelab.Vector(0, 0);

          if (frame.parent && frame.parent.frameOffset instanceof Gamelab.Vector) {
            //console.log('object.bonesprite.js:: frame-parent-offset');
            frame_offset = frame.parent.frameOffset;
          }

          if (frame && frame.image) Gamelab.Canvas.draw_image_frame(frame.image.domElement, new Gamelab.Vector(frame.framePos).add(frame_offset), frame.frameSize, new Gamelab.Vector2D(Math.round(x + origin.x), Math.round(y + origin.y)), new Gamelab.Vector2D(realWidth, realHeight), rotation % 360, ctx, sprite.flipX, sprite.flipY, origin);
        });
      }
    }
  }]);

  return BoneSprite;
}(Sprite);

;

var CompositeSprite = BoneSprite;

Gamelab.BoneSprite = BoneSprite;
Gamelab.CompositeSprite = CompositeSprite;
; /**
  * Creates a new SpriteFill.
  */

var SpriteFill = function (_Sprite2) {
  _inherits(SpriteFill, _Sprite2);

  function SpriteFill() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;

    _classCallCheck(this, SpriteFill);

    var _this11 = _possibleConstructorReturn(this, (SpriteFill.__proto__ || Object.getPrototypeOf(SpriteFill)).call(this, src, scale));

    _this11.sourceSprites = [];
    _this11.overlaySprites = [];
    _this11.shape = [];
    return _this11;
  }
  //draw function is overwritten to nothing. --limits console errors --todo --complete


  _createClass(SpriteFill, [{
    key: 'draw',
    value: function draw() {
      return 0;
    }
  }, {
    key: 'addSprite',
    value: function addSprite(src, scale, callback) {
      this.sourceSprites.push(new Gamelab.Sprite(src, scale));
      if (callback) callback.bind(this).call();
    }
  }, {
    key: 'addOverlaySprite',
    value: function addOverlaySprite(src, scale, callback) {
      console.info('SpriteFill().addOverlay(): --adds an overlay.\n      Every overlay must fit with every sourceSprite, matching non-transparent pixels only');
      this.overlaySprites.push(new Gamelab.Sprite(src, scale));
      if (callback) callback.bind(this).call();
    }
  }, {
    key: 'SelectionMode',
    value: function SelectionMode(mode) {
      this.selection_mode = mode || this.selected_mode || 'random';
      return this.selection_mode;
    }
  }, {
    key: 'BuildShape',
    value: function BuildShape(onCreateShape) {
      if (onCreateShape) onCreateShape.bind(this).call();
      return this.shape;
    }
  }, {
    key: 'enclose_rectangle',
    value: function enclose_rectangle() {
      var rect = new Gamelab.Rectangle(Infinity, Infinity, -Infinity, -Infinity);
      this.shape.forEach(function (point) {
        if (point.x < rect.min.x) {
          rect.min.x = point.x;
        }
        if (point.y < rect.min.y) {
          rect.min.y = point.y;
        }
        if (point.x > rect.max.x) {
          rect.max.x = point.x;
        }
        if (point.y > rect.max.y) {
          rect.max.y = point.y;
        }
      });
      return rect;
    }
  }, {
    key: 'Fill',
    value: function Fill() {
      var bounds = this.enclose_rectangle();
      //step 1: fill the shape with rectangles:
      var tracker = new Gamelab.Vector(),
          sprite = this.sourceSprites[0],
          currentSize = new Gamelab.Vector(sprite.size),
          currentIndex = 0;

      this.offscreenCanvas = new Gamelab.OffscreenCanvas(document.createElement('CANVAS'), bounds.min.x, bounds.min.y);

      var ctx = this.offscreenCanvas.ctx;

      //apply loop through x, y bounds, fill with sprites
      for (var x = bounds.min.x; x < bounds.max.x; x += currentSize.x) {
        for (var y = bounds.min.y; y < bounds.max.y; y += currentSize.y) {
          var nextSprite = new Gamelab.Sprite().FromData(this.sourceSprites[currentIndex]);
          this.sprites.push(nextSprite);
          currentSize = new Gamelab.Vector(nextSprite.size);
          currentIndex += 1;
          nextSprite.onLoad(function () {
            this.draw(ctx);
          });
        }
      }
      return this.offscreenCanvas;
    }
  }]);

  return SpriteFill;
}(Sprite);

;

Gamelab.SpriteFill = SpriteFill;; /**
                                  * Creates a new Interactive.
                                  *
                                  * @param   {string} src the srcPath for the image of the Item
                                  * @param   {number} scale=1.0 the scale to be applied to size of each animation-frame
                                  *
                                  * @returns {Interactive} a Gamelab.Interactive object
                                  *
                                  */

var Interactive = function (_Sprite3) {
  _inherits(Interactive, _Sprite3);

  function Interactive() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments[1];

    _classCallCheck(this, Interactive);

    return _possibleConstructorReturn(this, (Interactive.__proto__ || Object.getPrototypeOf(Interactive)).call(this, src, scale));
  }

  return Interactive;
}(Sprite);

Gamelab.Interactive = Interactive;; /**
                                    * Creates a new Item.
                                    *
                                    * @param   {string} src the srcPath for the image of the Item
                                    * @param   {number} scale=1.0 the scale to be applied to size of each animation-frame
                                    *
                                    * @returns {Item} a Gamelab.Item object
                                    *
                                    */

var Item = function (_Sprite4) {
  _inherits(Item, _Sprite4);

  function Item() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments[1];

    _classCallCheck(this, Item);

    var _this13 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, src, scale));

    _this13.imageOptions = [];
    _this13.collisionObjects = [];
    _this13.collisionBehavior = 'COLLECT';
    _this13.collectionAnimation = undefined;
    return _this13;
  }

  _createClass(Item, [{
    key: 'appendImageOption',
    value: function appendImageOption(src, scale) {
      this.imageProfiles.push({
        src: src,
        scale: scale
      });
    }
  }, {
    key: 'appendCollisionProfile',
    value: function appendCollisionProfile(collisionObjects, collisionBehavior) {
      this.collisionObjects = collisionObjects;
      this.collisionBehavior = collisionBehavior;
    }
  }]);

  return Item;
}(Sprite);

Gamelab.Item = Item;
;

var ScriptedSprite = function ScriptedSprite() {
  _classCallCheck(this, ScriptedSprite);
};

;
var ScrollingBackground = function (_Sprite5) {
  _inherits(ScrollingBackground, _Sprite5);

  function ScrollingBackground() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var size = arguments[1];

    _classCallCheck(this, ScrollingBackground);

    var _this14 = _possibleConstructorReturn(this, (ScrollingBackground.__proto__ || Object.getPrototypeOf(ScrollingBackground)).call(this, arg1, size));

    _this14.src = arg1;

    var args = (typeof arg1 === 'undefined' ? 'undefined' : _typeof(arg1)) == 'object' ? arg1 : {};

    _this14.size = size;

    _this14.type = args.type || "parallax" || "basic" || false;

    _this14.source_objects = args.objects || args.source_objects || [];

    _this14.members = [];

    _this14.rows = args.rows || 1; //The Y number of repititions

    _this14.cols = args.cols || 1; //The X number of repetitions of the images

    _this14.flip = args.flip || false;

    _this14.fill = args.fill || false;

    _this14.flip = args.flip || false;

    return _this14;
  }

  _createClass(ScrollingBackground, [{
    key: 'Flip',
    value: function Flip(value) {
      if (value == undefined) {
        this.flip = true;
      } else if (value == true || value == false) {
        this.flip = value;
      }

      return this;
    }
  }, {
    key: 'Rows',
    value: function Rows(r) {
      this.rows = r;
      return this;
    }
  }, {
    key: 'Cols',
    value: function Cols(c) {
      this.cols = c;
      return this;
    }
  }, {
    key: 'Fill',
    value: function Fill(approxRows, approxCols, gw) {

      approxRows = approxRows || this.rows || 1;

      approxCols = approxCols || this.cols || 1;

      gw = gw || Gamelab.game_windows[0];

      var w = gw.canvas.width,
          h = gw.canvas.height,
          xBacksTotal = Math.floor(approxRows / 2),
          yBacksTotal = Math.floor(approxCols / 2);

      var __inst = this;

      //create first row:

      for (var y = -yBacksTotal; y <= yBacksTotal + 1; y++) {
        console.log('adding background:' + y);

        for (var x = -xBacksTotal; x <= xBacksTotal + 1; x++) {

          console.log('adding background');

          this.members.push(new Sprite(this.src));

          var b = this.members[this.members.length - 1];

          b.Size(this.size);

          console.info(this);

          var __inst = this;

          b.position.x = x * this.size.x;

          b.position.y = y * this.size.y;

          b.minX = -xBacksTotal * b.size.x + b.size.x;

          b.maxX = (xBacksTotal + 1) * b.size.x;

          b.minY = -yBacksTotal * b.size.y + b.size.y;

          b.maxY = yBacksTotal * b.size.y;

          if (x % 2 == 0) {
            b.flipX = true;
          }

          if (y % 2 == 0) {
            b.flipY = true;
          }

          b.onUpdate(function (spr) {

            spr.campos = gw.camera.position;

            var cx = spr.campos.x - spr.campos.x % spr.size.x,
                cy = spr.campos.y - spr.campos.y % spr.size.y;

            if (spr.position.x - cx < spr.minX) {
              spr.position.x = spr.maxX + cx;
            }

            if (spr.position.x - cx > spr.maxX) {
              spr.position.x = spr.minX + cx;
            }

            if (spr.position.y - cy < spr.minY) {
              spr.position.y = spr.maxY + cy;
            }

            if (spr.position.y - cy > spr.maxY) {
              spr.position.y = spr.minY + cy;
            }
          });

          gw.add(b); //add to window
        }
      }

      return this;
    }
  }, {
    key: 'add',
    value: function add(object) {
      var cleanCheck = object instanceof Gamelab.Sprite || object instanceof Array && object[0] instanceof Gamelab.Sprite; //is Sprite

      if (!cleanCheck) {
        return console.error('Must have: valid contents (Gamelab.Sprite OR [] of Gamelab.Sprite())');
      }

      if (object instanceof Array) {
        this.source_objects.concat(object);
      } else {
        this.source_objects.push(object);
      }

      return this;
    }
  }]);

  return ScrollingBackground;
}(Sprite);

Gamelab.ScrollingBackground = ScrollingBackground;
;

var SpriteAlgorythm = function () {
  function SpriteAlgorythm(options, callback) {
    _classCallCheck(this, SpriteAlgorythm);

    this.options = options;

    this.setCallback(callback);
  }

  _createClass(SpriteAlgorythm, [{
    key: 'setCallback',
    value: function setCallback() {

      this.Engage = callback;
    }
  }, {
    key: 'Engage',
    value: function Engage() {}
  }]);

  return SpriteAlgorythm;
}();

Gamelab.SpriteAlgorythm = SpriteAlgorythm;
; /**
  * Creates a new SpriteBrush.
  */

var SpriteBrush = function () {
  function SpriteBrush(onCreate) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'random';

    _classCallCheck(this, SpriteBrush);

    this.sprites = [];
    this.overlaySprites = [];
    this.mode = mode;
    this.index = -1;
    this.total = 0;
    this.selected_sprite = {};
    this.id = Gamelab.create_id();
    onCreate = onCreate || function () {};
    onCreate.bind(this);
  }

  _createClass(SpriteBrush, [{
    key: 'addSprite',
    value: function addSprite(src, scale, callback) {
      this.sprites.push(new Gamelab.Sprite(src, scale));
      if (callback) callback.bind(this).call();
    }
  }, {
    key: 'addOverlaySprite',
    value: function addOverlaySprite(src, scale, callback) {
      console.info('SpriteFill().addOverlay(): --adds an overlay.\n      Every overlay must fit with every sourceSprite, matching non-transparent pixels only');
      this.overlaySprites.push(new Gamelab.Sprite(src, scale));
      if (callback) callback.bind(this).call();
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.sprites = [];
      this.overlaySprites = [];
    }
  }, {
    key: 'next',
    value: function next() {
      this.index += 1;
      switch (this.mode.toLowerCase()) {
        case 'random':
          var index = Math.floor(Math.random() * this.sprites.length);
          this.selected_sprite = this.sprites[index];
          return this.selected_sprite;
          break;

        case 'consecutive':
          this.selected_sprite = this.sprites[this.index % this.sprites.length];
          return this.selected_sprite;
          break;
      }
    }
  }, {
    key: 'Clone',
    value: function Clone(spritebrush) {
      var outputSprite = new Gamelab.SpriteBrush();
      outputSprite.id = spritebrush.id;
      var oix = 0;

      spritebrush.sprites.forEach(function (sprite) {
        outputSprite.addSprite(sprite.src, sprite.size);
        oix += 1;
      });

      spritebrush.overlaySprites.forEach(function (sprite) {
        outputSprite.addOverlaySprite(sprite.src, sprite.size);
        oix += 1;
      });
      return outputSprite;
    }
  }, {
    key: 'FromData',
    value: function FromData(spritebrush) {
      var outputSprite = new Gamelab.SpriteBrush();

      outputSprite.id = spritebrush.id;

      var oix = 0;

      spritebrush.sprites.forEach(function (sprite) {

        outputSprite.addSprite(sprite.src, sprite.size);

        oix += 1;
      });

      spritebrush.overlaySprites.forEach(function (sprite) {

        outputSprite.addOverlaySprite(sprite.src, sprite.size);

        oix += 1;
      });

      return outputSprite;
    }
  }]);

  return SpriteBrush;
}();

;

Gamelab.SpriteBrush = SpriteBrush;
;
var SpriteFactory = function () {
  function SpriteFactory(onCreate) {
    _classCallCheck(this, SpriteFactory);

    this.sprites = [];
    this.livingTotal = 0;
    this.livingSprites = [];

    this.lockoutTime = 0;

    this.livingSprites.oldest = function () {
      var maxTicker = 0,
          nextObjectIndex = 0;
      for (var x = 0; x < this.length; x++) {
        if (_typeof(this[x]) == 'object' && this[x].ticker >= maxTicker) {
          maxTicker = this[x].ticker;
          nextObjectIndex = x;
        }
      }
      return this[nextObjectIndex];
    };

    this.livingSprites.countLiving = function () {
      var total = 0;
      for (var x = 0; x < this.length; x++) {
        if (this[x].ticker > 0) {
          total++;
        }
      }
      return total;
    };

    this.sprites.oldest = function () {
      var maxTicker = 0,
          nextObjectIndex = 0;
      for (var x = 0; x < this.length; x++) {
        if (_typeof(this[x]) == 'object' && this[x].ticker >= maxTicker) {
          maxTicker = this[x].ticker;
          nextObjectIndex = x;
        }
      }
      return this[nextObjectIndex];
    };

    this.sprites.countLiving = function () {
      var total = 0;
      for (var x = 0; x < this.length; x++) {
        if (this[x].ticker >= 1) {
          total++;
        }
      }
      console.log('TOTAL LIVING blts::' + total);
      return total;
    };

    if (typeof onCreate == 'function') onCreate.bind(this).call();
  }

  _createClass(SpriteFactory, [{
    key: 'Frequency',
    value: function Frequency(f) {
      this.frequency = f;
      return this;
    }
  }, {
    key: 'MenuSprite',
    value: function MenuSprite(sprite) {

      if (sprite) this.menu_sprite = sprite;

      return this.menu_sprite;
    }
  }, {
    key: 'PrepareSprites',
    value: function PrepareSprites() {
      var total = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var exampleSprite = arguments[1];
      var onCreateSprite = arguments[2];

      for (var x = 0; x < total; x++) {
        var s = new Gamelab.Sprite().FromData(exampleSprite);
        this.sprites.push(s);
      }
      this.createSprite = onCreateSprite;
      return this;
    }
  }, {
    key: 'PrepareSpritesByArrayOrder',
    value: function PrepareSpritesByArrayOrder() {
      var total = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var exampleSprites = arguments[1];
      var loadFxn = arguments[2];


      if (!exampleSprites instanceof Array) exampleSprites = [exampleSprites];

      for (var x = 0; x < total; x++) {
        var s = new Gamelab.Sprite().FromData(exampleSprites[x % exampleSprites.length]);
        s.onLoad(loadFxn || function () {});
        this.sprites.push(s);
      }

      return this;
    }
  }, {
    key: 'lockout',
    value: function lockout(numberUpdates) {
      if (this.lockoutTime <= 0) {
        this.lockoutTime = numberUpdates;
      }
    }
  }, {
    key: 'Life',
    value: function Life(l) {
      this.life = l;
      return this;
    }
  }, {
    key: 'enter',
    value: function enter() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var gameWindow = arguments[1];

      var $controller = this;

      if (this.lockoutTime > 0) {
        this.lockoutTime -= 1.0;

        if (this.lockoutTime >= 1.0) {
          return;
        }
        //continue to with enter() fxn
      }

      for (var x = 0; x < number; x++) {
        //get next in stock::
        var livingCount = this.sprites.countLiving();

        var s = new Gamelab.Sprite().Clone(this.sprites[0]);

        s.Life(this.life);

        if (this.createSprite) {
          this.createSprite.bind(s).call();
        }

        this.livingSprites.push(s);

        gameWindow.add(s);
        this.livingTotal += 1;

        if (this.onfire) this.onfire(s);
      }

      return {

        assignTrackableSpeed: function assignTrackableSpeed(speed) {

          $p.trackableSpeed = speed;
          return this;
        },

        assignLinesAndSelector: function assignLinesAndSelector(lineList, lineSelector) {
          $p.lines = lines;
          return this;
        }

      };
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(update) {
      this.onupdate = update;
      return this;
    }
  }, {
    key: 'onFire',
    value: function onFire(callback) {

      this.onfire = callback;
      return this;
    }
  }, {
    key: 'fire',
    value: function fire(gameWindow) {
      this.enter(1, gameWindow);
    }
  }]);

  return SpriteFactory;
}();

Gamelab.SpriteFactory = SpriteFactory;; /**
                                        * Creates a new SpriteGroup.
                                        *
                                        * <info-bit>Gamelab.SpriteGroup is a container for RELATIVE-POSITIONED 2D Animations.
                                        * -apply Sprite class to create a 2D game-object.
                                        */

var SpriteGroup = function () {
  function SpriteGroup() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;

    _classCallCheck(this, SpriteGroup);

    this.sprites = [];
    this.mainSprite = new Gamelab.Sprite(src, scale);
  }

  _createClass(SpriteGroup, [{
    key: 'BasePosition',
    value: function BasePosition(px, py) {
      this.basePosition = new Gamelab.Vector(px, py);
      return this;
    }
  }, {
    key: 'add',
    value: function add(sprite) {
      this.sprites.push(sprite);
      return this;
    }
  }]);

  return SpriteGroup;
}();

;

Gamelab.SpriteGroup = SpriteGroup;
; /**
  * Creates a new Terrain.
  *
  * @param   {string} src the srcPath for the image of the Terrain
  * @param   {number} scale=1.0 the scale to be applied to size of each animation-frame
  *
  * @returns {Terrain} a Gamelab.Terrain object
  *
  */

var Terrain = function (_Sprite6) {
  _inherits(Terrain, _Sprite6);

  function Terrain() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments[1];

    _classCallCheck(this, Terrain);

    var _this15 = _possibleConstructorReturn(this, (Terrain.__proto__ || Object.getPrototypeOf(Terrain)).call(this, src, scale));

    _this15.imageOptions = [];
    //1. Terrain can draw from a set of optional source images
    //2. Terrain has values for collision
    //3. Terrain can quickly instantiate objects for running, jumping, climbing
    _this15.collisionObjects = [];
    _this15.collisionBehavior = 'STOP';
    return _this15;
  }

  _createClass(Terrain, [{
    key: 'Clone',
    value: function Clone(sprite) {
      console.log('using Clone() function');
      var clone = new Gamelab.Terrain(sprite.src);
      clone.Anime(new Gamelab.GridAnimation(sprite.anime));
      clone.apply_args(sprite);
      return clone;
    }
  }, {
    key: 'multiply',
    value: function multiply(top, left, skipTop, skipLeft) {}
  }, {
    key: 'appendImageOption',
    value: function appendImageOption(src, scale) {
      this.imageProfiles.push({
        src: src,
        scale: scale
      });
    }
  }, {
    key: 'appendCollisionProfile',
    value: function appendCollisionProfile(collisionObjects, collisionBehavior) {
      this.collisionObjects = collisionObjects;
      this.collisionBehavior = collisionBehavior;
    }
  }]);

  return Terrain;
}(Sprite);

var CookieCutterTerrain = function (_Sprite7) {
  _inherits(CookieCutterTerrain, _Sprite7);

  function CookieCutterTerrain(src) {
    _classCallCheck(this, CookieCutterTerrain);

    var _this16 = _possibleConstructorReturn(this, (CookieCutterTerrain.__proto__ || Object.getPrototypeOf(CookieCutterTerrain)).call(this));

    _this16.baseSprite = new Gamelab.Sprite(src);
    return _this16;
  }

  _createClass(CookieCutterTerrain, [{
    key: 'repeat',
    value: function repeat(x, y) {}
    //cut the terrain by non-transparent pixels of the image

  }, {
    key: 'cutByImage',
    value: function cutByImage() {}
  }, {
    key: 'cutByLine',
    value: function cutByLine() {}
  }, {
    key: 'highlightLine',
    value: function highlightLine() {}
  }, {
    key: 'plantSprite',
    value: function plantSprite() {}
  }, {
    key: 'scatterSprites',
    value: function scatterSprites() {}
  }]);

  return CookieCutterTerrain;
}(Sprite);

Gamelab.Terrain = Terrain;
Gamelab.CookieCutterTerrain = Terrain;
;(function () {
  console.log('Animation class... creating');

  /**
   *
   * Creates an instance of Animation with one or more Frames.
   *
   * <example-marker data-class='Animation' data-info='Use JQuery fnxs to load content into the div outside of this p-element. Do not use iframe' > </example-marker>
   *
   * @param   {string=} [src] the src-image-path for this Animation
   * @returns {Animation} an Animation object
   *
   * @example
   *
   * //constructor call: Creates a single-frame Animation from src
   * var singleFrameAnime = new Animation('directory/myFile.png');
   *
   * @example
   * //constructor call with chainable function-calls: Creates multi-frame Animation from src, then sets properties with chainable-function-calls.
   * var multiFrameAnime = new Gamelab.StaticAnimation('../images/characters/full/spaceman1.png') //constructor is called
   * .FrameSize(130, 130)
   * .FrameBounds(new Gamelab.Vector(9, 0), new Gamelab.Vector(23, 0), new Gamelab.Vector(23, 0))
   * .Seesaw() //The Animation will play back-and-forth repeatedly (cycle through frames forwards, then backwards and so on.
   * .Duration(900); //Animation lasts 900 millis OR just under 1 second
   *
   *  @design
   *
   * //single-responsibility : to define a list of frames, then progress that list of frames with a 'selected_frame' property
   * var singleFrameAnime = new Animation('directory/myFile.png');
   */

  var StaticAnimation = function () {
    function StaticAnimation() {
      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, StaticAnimation);

      var args = (typeof src === 'undefined' ? 'undefined' : _typeof(src)) == 'object' ? src : {};
      //Gamelab.Modifiers.informable(this, args);
      /**
       * @property {Vector} frameSize the frameSize of the Animation
       * @memberof Animation
       **********/

      this.frameSize = this.frameSize || new Gamelab.Vector(args.frameSize || new Gamelab.Vector(0, 0));
      this.size = this.size || new Gamelab.Vector(args.size || new Gamelab.Vector(0, 0));

      this.type = 'Animation';

      if (typeof src == 'string' || src instanceof HTMLCanvasElement) {
        this.src = src;
        this.image = new Gamelab.GameImage(src);
        this.init_singleFrame();
      } else if (args instanceof Gamelab.GameImage) {
        //console.log('Animation(): args are an instance of GameImage');
        this.image = args;
      } else if (args instanceof HTMLImageElement) {
        //console.log('Animation(): args was an instance of HTMLImageElement');
        this.image = new Gamelab.GameImage(args);
      } else if (args instanceof Gamelab.GridAnimation) {
        this.image = args.image;
      } else if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) == 'object' && args.src) {
        this.src = args.src;
        this.image = new Gamelab.GameImage(args.src);
      }

      this.min_cix = 0;

      this.visible = args.visible || true;

      if (args.frameBounds && args.frameBounds.min && args.frameBounds.max) {
        /**
         * @property {VectorFrameBounds} frameBounds the frameBounds of the Animation, has three Vectors
         * @memberof Animation
         **********/
        this.frameBounds = new Gamelab.VectorFrameBounds(args.frameBounds.min, args.frameBounds.max, args.frameBounds.termPoint);
      } else {
        this.frameBounds = new Gamelab.VectorFrameBounds(new Gamelab.Vector(0, 0, 0), new Gamelab.Vector(0, 0, 0), new Gamelab.Vector(0, 0, 0));
      }

      this.scale = 1.0;

      this.origin = new Gamelab.Vector(0, 0, 0);

      this.position = new Gamelab.Vector(0, 0);

      this.rotation = new Gamelab.Vector(0, 0, 0);

      this.frameOffset = this.getArg(args, 'frameOffset', new Gamelab.Vector(0, 0, 0));

      this.flipX = this.getArg(args, 'flipX', false);

      this.cix = 0;

      /**
       * @property {Frame} selected_frame the selected_frame of the Animation, a Gamelab.Frame
       * @memberof Animation
       **********/

      this.selected_frame = false;
      this.timer = 0;
      this.duration = args.duration || 2000;
      this.seesaw_mode = args.seesaw_mode || false;
      this.reverse_frames = args.reverse_frames || false;
      this.run_ext = args.run_ext || [];
      this.complete_ext = args.complete_ext || [];

      this.Scale(this.scale);
      // this.colorMap = this.createColorMap(5);
    }

    _createClass(StaticAnimation, [{
      key: 'Origin',
      value: function Origin(x, y, z) {
        this.origin = new Gamelab.Vector(x, y, z);
        this.frames.forEach(function ($f) {
          $f.origin = new Gamelab.Vector(x, y, z);
        });
        if (this.selected_frame) {
          this.selected_frame.origin = new Gamelab.Vector(x, y, z);
        }
        return this;
      }
    }, {
      key: 'Position',
      value: function Position(x, y, z) {
        this.position = new Gamelab.Vector(x, y, z);

        this.frames.forEach(function ($f) {
          $f.position = new Gamelab.Vector(x, y, z);
        });

        return this;
      }
    }, {
      key: 'Size',
      value: function Size(x, y) {

        this.size = new Gamelab.Vector(x, y);
        this.frames.forEach(function (f) {

          f.Size(x, y);
        });
        return this;
      }
    }, {
      key: 'Bone',
      value: function Bone(b) {
        this.bone = b;
        return this;
      }
    }, {
      key: 'ParentBone',
      value: function ParentBone(b) {
        this.parentBone = b;
        return this;
      }
    }, {
      key: 'Rotation',
      value: function Rotation(x, y, z) {

        this.rotation = new Gamelab.Vector(x, y, z);

        this.frames.forEach(function ($frame) {
          $frame.Rotation(x, y, z);
        });

        return this;
      }
    }, {
      key: 'add',
      value: function add(frame) {
        this.frames.push(frame);
      }
    }, {
      key: 'Src',
      value: function Src(src) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (typeof src == 'string') {
          console.log('setting GameImage with string:' + src);
          this.src = src;
          this.image = new Gamelab.GameImage(src);
        } else if (src instanceof GameImage) {
          //console.log('Animation(): args are an instance of GameImage');
          this.image = src;
        } else if (src instanceof HTMLImageElement) {
          //console.log('Animation(): args are an instance of HTMLImageElement');
          this.image = new Gamelab.GameImage(src);
        }

        if (!options.frameBounds) this.init_singleFrame();

        return this;
      }
    }, {
      key: 'Scale',
      value: function Scale(s) {
        this.scale = s;
        if (this.image && this.image.domElement && this.image.domElement.width > 0) {
          this.size = new Gamelab.Vector(this.image.domElement.width * s, this.image.domElement.height * s).round();
          this.Size(this.size);
        }
        if (this.frames instanceof Array) this.frames.forEach(function (f) {
          f.Scale(s);
        });
        return this;
      }
    }, {
      key: 'Size',
      value: function Size(x, y, z) {
        this.size = new Gamelab.Vector(x, y, z);
        this.frames.forEach(function (f) {
          f.size = new Gamelab.Vector(x, y, z);
        });
        return this;
      }
    }, {
      key: 'Image',
      value: function Image(src) {

        if (typeof src == 'string') {
          //console.log('setting GameImage with string:' + src);
          this.src = src;
          this.image = new Gamelab.GameImage(src);
        } else if (src instanceof Gamelab.GameImage) {
          //console.log('Animation(): args are an instance of GameImage');
          this.image = src;
        } else if (src instanceof HTMLImageElement) {
          console.log('Animation(): args was an instance of HTMLImageElement');

          this.image = new Gamelab.GameImage(src);
        }
        this.init_singleFrame();
        return this;
      }

      /*****
       * Overridable / Extendable functions
       * -allows stacking of external object-function calls
       ******/

      /**
       * Provides a function to be called when this Animation.image loads.
       *
       * @function
       * @params {Function} call the function to be called on load
       * @memberof Animation
       **********/

    }, {
      key: 'onLoad',
      value: function onLoad(call) {
        var $anime = this;
        call = call || function () {};
        this.load_call = call;
        this.image.domElement.onload = function () {
          call.bind($anime).call();
        };
      }

      /**
       * Provides a function to be called whenever this Animation starts. Function should run every time the Animation reaches frame-index 0
       *
       * @function
       * @params {Function} call the function to be called on start
       * @memberof Animation
       **********/

    }, {
      key: 'onRun',
      value: function onRun(call) {

        if (this.run_ext.indexOf(call) == -1) {
          this.run_ext.push(call.bind(this));
        }
      }

      /**
       * Provides a function to be called whenever this Animation completes. Function should run every time the Animation reaches it's last frame-index.
       *
       * @function
       * @params {Function} call the function to be called on complete
       * @memberof Animation
       **********/

    }, {
      key: 'onComplete',
      value: function onComplete(call) {

        if (this.complete_ext.indexOf(call) == -1) {
          this.complete_ext.push(call.bind(this));
        }
      }

      /**
       * Provides a single and only function to be called whenever this Animation completes. Function should run every time the Animation reaches it's last frame-index.
       *
       * @function
       * @params {Function} call the function to be called on complete
       * @memberof Animation
       **********/

    }, {
      key: 'soleComplete',
      value: function soleComplete(call) {
        this.complete_ext = [];
        if (this.complete_ext.indexOf(call) == -1) {
          this.complete_ext.push(call.bind(this));
        }
      }
    }, {
      key: 'call_on_run',
      value: function call_on_run() {
        //call any function extension that is present
        for (var x = 0; x < this.run_ext.length; x++) {
          this.run_ext[x](this);
        }
      }
    }, {
      key: 'call_on_complete',
      value: function call_on_complete() {
        //call any function extension that is present
        for (var x = 0; x < this.complete_ext.length; x++) {
          this.complete_ext[x](this);
        }
      }
    }, {
      key: 'Visible',
      value: function Visible(v) {
        this.visible = v;
        return this;
      }
    }, {
      key: 'FrameSize',
      value: function FrameSize(w, h) {
        this.frameSize = new Gamelab.Vector(w, h);
        this.__isInit = true;
        return this;
      }
    }, {
      key: 'Hang',
      value: function Hang() {
        this._hang = true;
        return this;
      }
    }, {
      key: 'ResetHang',
      value: function ResetHang() {
        this._hang = false;
        this.cix = this.min_cix;
      }
    }, {
      key: 'FrameOffset',
      value: function FrameOffset(x, y) {
        this.frameOffset = new Gamelab.Vector(x, y);
        return this;
      }
    }, {
      key: 'Seesaw',
      value: function Seesaw() {
        if (!this.seesaw_mode) {
          this.seesaw_mode = true;
        }
        return this;
      }
    }, {
      key: 'Duration',
      value: function Duration(millis) {
        this.duration = millis;
        return this;
      }

      /**
       * Reverses all frames of the animation. Frames are then expected to run backwards.
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'ReverseFrames',
      value: function ReverseFrames() {

        this.reverse_frames = true;
        return this;
      }

      /**
       * Sets the animation a a single frame / full-image. Use before img is loaded
       *
       * @function
       * @param {Vector} frameSize optional size param
       * @memberof Animation
       **********/

    }, {
      key: 'SingleFrame',
      value: function SingleFrame() {
        this.init_singleFrame();
        return this;
      }
    }, {
      key: 'getArg',
      value: function getArg(args, key, fallback) {

        if (args.hasOwnProperty(key)) {
          return args[key];
        } else {
          return fallback;
        }
      }
    }, {
      key: 'init',
      value: function init() {
        return this;
      }
    }, {
      key: 'scaleOf',
      value: function scaleOf(sized_Object) {

        var s = TypeCode.getPreferredPropertyByKey(sized_Object, 'size', 'argument had nested size variable. Using this instead.');

        return s.div(this.frameSize);
      }
    }, {
      key: 'init_colorMap',
      value: function init_colorMap(spatialDiv) {
        TypeCode.info('init_colorMap()');

        if (!TypeCode.allDefined([this.image, this.image.domElement])) return [];

        this.canvasObject = this.canvasObject || new Gamelab.OffscreenCanvasRendering(this.image);
        this.colorMap = this.colorMap || this.ColoredPixelGrid(spatialDiv);
        return this.colorMap;
      }
    }, {
      key: 'ColoredPixelGrid',
      value: function ColoredPixelGrid() {
        var spatialDiv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5.0;


        var image = this.image.domElement,
            ctx = this.canvasObject.ctx,
            grid = [],
            frameSizeDiv = this.selected_frame.frameSize.div(spatialDiv).round();

        for (var x = 0; x <= image.width; x += frameSizeDiv.x) {
          for (var y = 0; y <= image.height; y += frameSizeDiv.y) {
            // Fetch pixel at current position
            var pixel = ctx.getImageData(x, y, 1, 1);
            // Check that opacity is above zero
            if (pixel.data[3] != 0) {
              var vector = new Gamelab.Vector(x, y),
                  gridObject = {
                position: vector.sub(frameSizeDiv.div(2.0)),
                size: frameSizeDiv
              };

              grid.push(gridObject);
            }
          }
        }

        return grid;
      }

      /**
       * Returns the existing ColorMap for this animation.
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'getCurrentPixelMap',
      value: function getCurrentPixelMap(spatialDiv) {

        TypeCode.info('getCurrentPixelMap()');
        var map = [];
        var frame = this.selected_frame;
        var __inst = this;

        this.colorMap = this.init_colorMap(spatialDiv);

        for (var x in this.colorMap) {
          var c = this.colorMap[x];

          if (Gamelab.Collision.boxCollide(frame.framePos, frame.frameSize, c.position, c.size)) {
            map.push(c);
          }
        }
        return map;
      }

      /**
       * Sets the frame to a specific array-index.
       *
       * @function
       * @param {number} ix the frame-index to apply.
       * @memberof Animation
       **********/

    }, {
      key: 'setFrame',
      value: function setFrame(ix) {
        this.selected_frame = this.frames[ix];
      }

      /**
       * extends the update of this animation with a new function to be called during the update
       * --repeated calls will extend, (not replace) the update --Allows multiple extensions of the update
       * @function
       * @memberof Animation
       * @param {function} fun the function to be appended to sprite.update
       *
       *  * @example
       * // extend the behavior of your animation
       * myAnime.onUpdate(function(spr)
       *
       *                    console.log('extended update'); //runs automatically whenever animation.update runs
       *
       *                   });
       *
       **********/

    }, {
      key: 'onUpdate',
      value: function onUpdate(fun) {
        fun = fun.bind(this);
        var update = this.update_frame.bind(this);
        var __inst = this;
        this.update_frame = function (__inst) {
          update(__inst);
          fun(__inst);
        };
      }
    }, {
      key: 'soleUpdate',
      value: function soleUpdate(fun) {
        fun = fun.bind(this);
        var __inst = this;
        this.update_frame = function (__inst) {
          fun(__inst);
        };
      }
    }, {
      key: 'update_frame',
      value: function update_frame() {
        this.selected_frame = this.frames[Math.round(this.cix) % this.frames.length];
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.cix = 0;
      }
      /**
       * Applies a continuous animation. Use this in parent-sprite's update if continuous animation is required.
       * Also works as a single call at any time during game-update.
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'run',
      value: function run() {
        if (this.__frametype == 'single') {
          return 0;
        }
        this.cix += 1;
        this.update_frame();
      }
      /**
       * animate():: same as run()
       *
       * @function
       * @memberof Animation
       **********/

    }, {
      key: 'animate',
      value: function animate() {

        if (this.__frametype == 'single') {
          return 0;
        }

        if (!this.applied) {
          this.applied = true;
        }

        if (this.cix % this.frames.length == 0) {
          this.engage();
        }
      }

      /**
       * Engages, or updates the animation for a one full frame-cycle.
       *
       * @function
       * @param {number} duration the number of milliseconds the animation should take.
       * @memberof Animation
       **********/

    }, {
      key: 'engage',
      value: function engage(duration) {
        this.call_on_run();
        duration = duration || this.duration || this.frames.length * 20;
        if (this.__frametype == 'single') {
          return 0;
        }

        //note support of min_cix (eg: min_cix of 1 if top-row starts 1 frame later than bottom)
        if (this.cix >= this.frames.length - 1 || this.cix < this.min_cix && !this._hang) {
          this.cix = this.min_cix;
        }
        var __inst = this;

        //we have a target
        this.tween = new TWEEN.Tween(this).easing(__inst.curve || TWEEN.Easing.Linear.None).to({
          cix: this.min_cix + (this.frames.length - 1)
        }, duration).onUpdate(function () {
          //console.log(objects[0].position.x,objects[0].position.y);
          //__inst.cix = Math.ceil(__inst.cix);
          __inst.update_frame();
        }).onComplete(function () {
          //console.log(objects[0].position.x, objects[0].position.y);
          if (!__inst._hang) __inst.cix = __inst.min_cix;
          __inst.call_on_complete();
          __inst.isComplete = true;
        });

        if (this.cix == this.min_cix) this.tween.start();
      }
    }, {
      key: 'img_src',
      set: function set(value) {
        this.src = value;
      },
      get: function get() {
        return this.src;
      }
    }]);

    return StaticAnimation;
  }();

  ;

  /** @memberof Gamelab */
  Gamelab.StaticAnimation = StaticAnimation;
  Gamelab.StaticAnimation.continuous = Gamelab.StaticAnimation.run; //'continuous is an alternate reference to 'run'.'
  Gamelab.StaticAnimation.update = Gamelab.StaticAnimation.update_frame; //alt ref
  Gamelab.StaticAnimation.continue = Gamelab.StaticAnimation.run; //'continue is an alternate reference to 'run'.'
})();
;
var Text = function () {
  function Text(value) {
    _classCallCheck(this, Text);

    this.Text(value);
    this.FontSize(15);
    this.FontFamily('Arial');
    this.color = 'white';
    this.shadowColor = 'black';
    this.shadowBlur = 0;
    this.position = new Gamelab.Vector(0, 0);
  }

  _createClass(Text, [{
    key: 'Text',
    value: function Text(t) {
      this.text = t;
      this.value = t;
      return this;
    }
  }, {
    key: 'Shadow',
    value: function Shadow(color, blur) {
      this.shadowColor = color;
      this.shadowBlur = blur;
      return this;
    }
  }, {
    key: 'Font',
    value: function Font(fsize, ffamily) {
      this.FontSize(fsize);
      this.FontFamily(ffamily);
      return this;
    }
  }, {
    key: 'Color',
    value: function Color(c) {
      this.color = c;
      return this;
    }
  }, {
    key: 'FontSize',
    value: function FontSize(value) {
      if (typeof value !== 'string') value = value + '';
      value = value.replace('px', '') + 'px';
      this.fontSize = value;
      return this;
    }
  }, {
    key: 'FontFamily',
    value: function FontFamily(value) {
      this.fontFamily = value;
      return this;
    }
  }, {
    key: 'getOffsetPos',
    value: function getOffsetPos(pos) {
      var offset = this.window_offset || new Gamelab.Vector(0, 0);
      return pos.add(offset);
    }
  }, {
    key: 'draw',
    value: function draw(ctx, camera) {
      console.log("DRAWING object.text.js");
      var x = this.position.x + camera.position.x,
          y = this.position.y + camera.position.y;

      if (ctx.save) {
        ctx.save();
      }

      ctx.fillStyle = this.color;
      ctx.font = this.fontSize + ' ' + this.fontFamily;

      var size = ctx.measureText(this.text);

      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;

      //use the width of capital M as approximate text height

      this.size = new Gamelab.Vector(size.width, ctx.measureText('M').width);

      var pos = new Gamelab.Vector(x, y),
          realPos = this.getOffsetPos(pos);

      ctx.fillText(this.text, realPos.x, realPos.y);
      ctx.restore();
    }
  }]);

  return Text;
}();

Gamelab.Text = Text;
;;Gamelab.assign3DGroupMesh = function (key, mesh, sprite) {
  Gamelab.ThreejsGroups = Gamelab.ThreejsGroups || [];
  Gamelab.ThreejsGroups[key] = Gamelab.ThreejsGroups[key] || new THREE.Object3D();
  Gamelab.ThreejsGroups[key].countOps = Gamelab.ThreejsGroups[key].countOps || 1.0;
  Gamelab.ThreejsGroups[key].countOps += 1.0;
  Gamelab.ThreejsGroups[key].add(mesh);
  mesh.layer = sprite.layer;
  return Gamelab.ThreejsGroups[key];
};

var Sprite3D = function () {
  function Sprite3D(gamelabSprite, scale) {
    _classCallCheck(this, Sprite3D);

    var sprite = gamelabSprite,
        texture = new THREE.TextureLoader().load(sprite.src);
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    var w = sprite.image.domElement.width,
        h = sprite.image.domElement.height;

    this.w = w;
    this.h = h;

    var geometry = new THREE.PlaneGeometry(w, h, 256, Math.round(256 * (w / h)));

    this.geometry = geometry;

    this.vertices = this.geometry.vertices;

    var material = new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true
    });
    //material.colorWrite = false;
    material.side = THREE.DoubleSide;

    var mesh = new THREE.Mesh(geometry, material);

    material.needsUpdate = true;

    sprite.threejsScale = scale * sprite.scale;

    this.spriteScale = scale;

    mesh.scale.set(sprite.threejsScale, sprite.threejsScale, 1);

    this.size3D = new Gamelab.Vector(w * this.threejsScale, h * this.threejsScale);

    this.size3d = this.size3D;

    // Add to pivot group
    var member = new THREE.Object3D();

    member.add(mesh);

    this.mesh = mesh;

    this.member = member;
    sprite.builderGroup = sprite.builderGroup || 'MASTER';
    this.threejsGroup = Gamelab.assign3DGroupMesh(sprite.builderGroup, this.member, sprite);
    this.threejsMesh = mesh;

    var realSize = new Gamelab.Vector(sprite.image.domElement.width, sprite.image.domElement.height, 1).mult(sprite.threejsScale);

    this.group = this.threejsGroup;

    this.threejsGroup.needsUpdate = true;

    var t3d = this;

    sprite.onLoad(function () {

      var size2D = t3d.visibleSize(camera, renderer).size;

      while (size2D.x > sprite.size.x) {
        scale -= 0.02;
        t3d.Scale(scale);
        size2D = t3d.visibleSize(camera, renderer).size;
        camera.updateMatrixWorld();
      }

      while (size2D.x < this.size.x) {
        scale += 0.02;
        t3d.Scale(scale);
        size2D = t3d.visibleSize(camera, renderer).size;
        camera.updateMatrixWorld();
      }
    });
  }

  _createClass(Sprite3D, [{
    key: 'ScreenSize',
    value: function ScreenSize(camera) {
      var mesh = this.mesh;
      var vertices = mesh.geometry.vertices;
      var vertex = new THREE.Vector3();
      var min = new THREE.Vector3(1, 1, 1);
      var max = new THREE.Vector3(-1, -1, -1);

      for (var i = 0; i < vertices.length; i++) {
        var vertexWorldCoord = vertex.copy(vertices[i]).applyMatrix4(mesh.matrixWorld);
        var vertexScreenSpace = vertexWorldCoord.project(camera);
        min.min(vertexScreenSpace);
        max.max(vertexScreenSpace);
      }

      return new THREE.Box2(min, max);
    }
  }, {
    key: 'Scale',
    value: function Scale(scaleValue) {
      this.threejsScale = scaleValue * this.spriteScale;
      this.mesh.scale.set(this.threejsScale, this.threejsScale, 1);
      this.size3D = new Gamelab.Vector(this.w * this.threejsScale, this.h * this.threejsScale);
      return this;
    }
  }, {
    key: 'visibleSize',
    value: function visibleSize(camera, renderer) {
      var obj = this.threejsGroup;
      var box = new THREE.Box3().setFromObject(this.mesh);
      var size = box.getSize();
      console.log(size);

      // Calc distance of obj from camera
      var distance = camera.position.distanceTo(obj.position);
      console.log('distance: ', distance);
      distance = camera.position.z - obj.position.z - size.z / 2;

      var aspect = renderer.domElement.width / renderer.domElement.height;
      // Calc height and width
      var vFOV = THREE.Math.degToRad(camera.fov); // convert vertical fov to radians
      var height = 2 * Math.tan(vFOV / 2) * distance; // visible height
      var width = height * aspect; //camera.aspect;           // visible width

      var ratio = distance / height; // height per 1 of z-depth
      console.log('depath ratio: ', ratio);

      width = size.x / ratio * aspect;
      height = size.y / ratio * aspect;

      // Calc position
      var vector = new THREE.Vector3();
      var viewProjectionMatrix = new THREE.Matrix4();
      var viewMatrix = new THREE.Matrix4();
      viewMatrix.copy(camera.matrixWorldInverse);
      viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, viewMatrix);
      var widthHalf = 0.5 * renderer.domElement.width;
      var heightHalf = 0.5 * renderer.domElement.height;
      obj.updateMatrixWorld();
      vector.setFromMatrixPosition(obj.matrixWorld);
      //vector.project(camera);
      vector.applyMatrix4(viewProjectionMatrix);

      vector.x = vector.x * widthHalf + widthHalf;
      vector.y = -(vector.y * heightHalf) + heightHalf;
      /*
          vector.x = 2 * (vector.x / renderer.domElement.width) - 1;
          vector.y = 1 - 2 * ( vector.y / renderer.domElement.height );*/
      var x = vector.x;
      var y = vector.y;

      var result = {
        position: new Gamelab.Vector(x - width / 2, y - height / 2),
        size: new Gamelab.Vector(width, height)
      };
      console.info(result);
      return result;
    }
  }, {
    key: 'fitCamera',
    value: function fitCamera(camera, scene, offset) {

      offset = offset || 1.25;

      var boundingBox = new THREE.Box3();

      var object = this.mesh;

      // get bounding box of object - this will be used to setup controls and camera
      boundingBox.setFromObject(object);

      var center = boundingBox.getCenter();

      var size = boundingBox.getSize();

      // get the max side of the bounding box (fits to width OR height as needed )
      var maxDim = Math.max(size.x, size.y, size.z);
      var fov = camera.fov * (Math.PI / 180);
      var cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2)); //Applied fifonik correction

      cameraZ *= offset; // zoom out a little so that objects don't fill the screen

      // <--- NEW CODE
      //Method 1 to get object's world position
      scene.updateMatrixWorld(); //Update world positions
      var objectWorldPosition = new THREE.Vector3();
      objectWorldPosition.setFromMatrixPosition(object.matrixWorld);

      //Method 2 to get object's world position
      //objectWorldPosition = object.getWorldPosition();

      var directionVector = camera.position.sub(objectWorldPosition); //Get vector from camera to object
      var unitDirectionVector = directionVector.normalize(); // Convert to unit vector
      camera.position = unitDirectionVector.multiplyScalar(cameraZ); //Multiply unit vector times cameraZ distance
      camera.lookAt(objectWorldPosition); //Look at object
      // --->

      var minZ = boundingBox.min.z;
      var cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

      camera.far = cameraToFarEdge * 3;
      camera.updateProjectionMatrix();
    }
  }, {
    key: 'get2DSize',
    value: function get2DSize(camera, div) {
      this.size3D = new THREE.Vector3(this.size3D.x, this.size3D.y, 0);
      var size = new Gamelab.Vector(Gamelab.ThreeJsMath.getScreenXY(this.size3D, camera, div));
      return size;
    }
  }]);

  return Sprite3D;
}();

var Sprite3d = Sprite3D;

Gamelab.Sprite3D = Sprite3D;
Gamelab.Sprite3d = Sprite3d;;
var FeatureSymbol = function FeatureSymbol(key) {
  _classCallCheck(this, FeatureSymbol);

  this.key = key || "@NONE";
  this.symbol = Symbol(key);
};

Gamelab.FeatureSymbol = FeatureSymbol;

Gamelab.FeatureInjectors = Gamelab.FeatureInjectors || {};

Gamelab.FeatureInject = function (constructor, args) {

  //console.log('Gamelab.FeatureInject()');

  var GClassFeatures = {};

  for (var y in Gamelab.ObjectFeatureMap) {

    if (Gamelab[y] && typeof Gamelab[y] == 'function') {

      var constructor = Gamelab[y];

      GClassFeatures[y] = {};

      //  console.log('Feature Symbol-key:' + Gamelab.ObjectFeatureMap[x][y]);

      GClassFeatures[y].featureSymbols = GClassFeatures[y].featureSymbols || [];

      for (var z in Gamelab.ObjectFeatureMap[y]) {

        GClassFeatures[y].featureSymbols.push(new Gamelab.FeatureSymbol(Gamelab.ObjectFeatureMap[y][z]));

        GClassFeatures[y].featureSymbols.hasKey = function (key) {

          for (var x = 0; x < this.length; x++) {
            if (typeof this[x].key !== 'string') continue;

            if (this[x].key.indexOf('@') == -1) console.error('feature-keys must contain @');

            //  console.log('eval key:' + this[x].key.split('@')[1]);

            if (this[x].key.split('@')[1] == key) return true;
          }

          return false;
        };

        GClassFeatures[y].featureSymbols.hasSymbol = function (symbol) {
          for (var x in this) {
            if (this[x].symbol == symbol) return true;
          }

          return false;
        };

        //  console.info('adding feature-symbol:' + Gamelab.ObjectFeatureMap[x][y]);
      }
    } else {
      console.error('Gamelab.ObjectFeatureMap: member by name of ' + x + ' does not exist as member of Gamelab');
    }
  }

  console.info('FEATURES:', GClassFeatures);

  for (var x in Gamelab.FeatureInjectors) {

    //  console.log(Gamelab.FeatureInjectors[x]);

    var props = TypeCode.getProtoFuncs(Gamelab.FeatureInjectors[x]);

    for (var y = 0; y < props.length; y++) {
      console.log(x + ":" + props[y]);
      for (var z in GClassFeatures) {
        if (GClassFeatures[z] && GClassFeatures[z].featureSymbols.hasKey(props[y])) {
          Gamelab.FeatureInjectors[x][props[y]](Gamelab[z].prototype, args);
        }
      }
    }
  }
};

var CssFeatures = function () {
  function CssFeatures() {
    _classCallCheck(this, CssFeatures);
  }

  _createClass(CssFeatures, [{
    key: 'colored',
    value: function colored(obj) {
      obj.Color = function (c) {
        this.color = c;
        return this;
      };
    }
  }, {
    key: 'color_transition',
    value: function color_transition(min_color, max_color) {
      this.min_color = min_color;
      this.max_color = max_color;
      return this;
    }
  }, {
    key: 'text',
    value: function text(obj) {
      obj.Text = function (value) {
        this.text = value;
        return this;
      };
    }
  }, {
    key: 'opaque',
    value: function opaque(obj) {
      obj.Opacity = function (o) {
        this.opacity = o;
        return this;
      };
    }
  }]);

  return CssFeatures;
}();

;

var DataFunctions = function () {
  function DataFunctions() {
    _classCallCheck(this, DataFunctions);
  }

  _createClass(DataFunctions, [{
    key: 'data',
    value: function data(obj) {

      obj.Name = function (n) {
        this.name = n;
        return this;
      };

      obj.Description = function (d) {
        this.description = d;
        return this;
      };

      obj.Context = function (c) {
        this.context = c;
        return this;
      };

      obj.create_id = function () {
        return Gamelab.create_id();
      };
    }
  }]);

  return DataFunctions;
}();

/***************************
GeometryFeatures:
  A functional dependency injector
  injects properties and functions according to Symbols
**************************/


var VectorFunctions = function () {
  function VectorFunctions() {
    _classCallCheck(this, VectorFunctions);

    this.name = 'VectorFunctionals';
  }

  _createClass(VectorFunctions, [{
    key: 'collideable',
    value: function collideable(obj) {
      obj.collision_callback = function () {};
      obj.onCollide = args.onCollide || function (collideables, callback) {
        if (typeof collideables == 'function') {
          callback = collideables;
        }
        this.collision_callback = callback || function () {};
      };
    }
  }, {
    key: 'spatial',
    value: function spatial(obj) {

      obj.Size = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.size = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.size = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.size = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Pos = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.position = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.position = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.position = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Rot = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.rotation = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.rotation = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.rotation = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Position = obj.Pos;

      obj.Rotate = obj.Rot;

      obj.Rotation = obj.Rot;
    }
  }, {
    key: 'relative_spatial',
    value: function relative_spatial(obj) {

      obj.Size = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.size = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.size = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.size = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Pos = function (x, y, z) {

        var bpx = 0;
        if (this.basePosition && this.basePosition.x) bpx = this.basePosition.x;

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.position = new Gamelab.Vector(bpx + x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.position = new Gamelab.Vector(bpx + x, y, z);else //use x accross the vector
          this.position = new Gamelab.Vector(bpx + x, x, x);

        return this;
      };

      obj.Rot = function (x, y, z) {

        var bx = 0;
        if (this.baseRotation && this.baseRotation.x) bx = this.baseRotation.x;

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.rotation = new Gamelab.Vector(bx + x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.rotation = new Gamelab.Vector(bx + x, y, z);else //use x accross the vector
          this.rotation = new Gamelab.Vector(bx + x, x, x);

        return this;
      };

      obj.Position = obj.Pos;

      obj.Rotate = obj.Rot;

      obj.Rotation = obj.Rot;
    }
  }, {
    key: 'posable',
    value: function posable(obj) {

      obj.Pos = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.position = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.position = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.position = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Position = obj.Pos;
    }
  }, {
    key: 'sizeable',
    value: function sizeable(obj) {

      obj.Size = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.size = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.size = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.size = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Position = obj.Pos;
    }
  }, {
    key: 'rotable',
    value: function rotable(obj) {
      obj.Rot = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.rotation = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.rotation = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.rotation = new Gamelab.Vector(x, x, x);

        if (typeof this.Transpose == 'function') {
          this.Transpose();
        }

        return this;
      };

      obj.Rotate = obj.Rot;

      obj.Rotation = obj.Rot;
    }
  }, {
    key: 'minable',
    value: function minable(obj) {
      obj.Min = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.min = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.min = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.min = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Minimum = obj.Min;
    }
  }, {
    key: 'maxable',
    value: function maxable(obj) {
      obj.Max = function (x, y, z) {

        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') this.max = new Gamelab.Vector(x);else if (!isNaN(x) && !isNaN(y)) //has minimum of numeric x and y
          this.max = new Gamelab.Vector(x, y, z);else //use x accross the vector
          this.max = new Gamelab.Vector(x, x, x);

        return this;
      };

      obj.Maximum = obj.Max;
    }
  }, {
    key: 'boundable',
    value: function boundable(obj) {
      this.minable(obj);

      this.maxable(obj);
    }
  }, {
    key: 'selftransposable',
    value: function selftransposable(obj) {
      //apply the transposition
      obj.Transpose = function (rotation, position) {

        this.rotation = new Gamelab.Vector(rotation || this.rotation);

        this.position = new Gamelab.Vector(position || this.position);

        //TODO: Modify this trig function and its call below to an optional 3D rotation

        for (var x = 0; x < this.points.length; x++) {

          var p = this.points[x];

          var np = Gamelab.Trig.rotate_from_xy(0, 0, p.x, p.y, this.rotation.x);

          this.points[x] = this.position.add(np);
        }
        return this;
      };
    }
  }, {
    key: 'pointarrayflippable',
    value: function pointarrayflippable(obj) {
      //apply the transposition
      obj.FlipX = function () {

        var middle = Math.floor(this.points.length / 2); //account for FlipX with length of --odd number

        var x, y;

        for (x = this.points.length - 1, y = 0; x > middle, y < middle; x--, y++) {

          var p1 = this.points[x],
              p2 = this.points[y];

          var _ref = [p2.x, p1.x];
          p1.x = _ref[0];
          p2.x = _ref[1];
        }

        return this;
      };

      //apply the transposition
      obj.FlipY = function () {

        var middle = Math.floor(this.points.length / 2); //account for FlipX with length of --odd number

        var x, y;

        for (x = this.points.length - 1, y = 0; x > middle, y < middle; x--, y++) {

          var p1 = this.points[x],
              p2 = this.points[y];

          var _ref2 = [p2.y, p1.y];
          p1.y = _ref2[0];
          p2.y = _ref2[1];
        }

        return this;
      };
    }
  }, {
    key: 'informable',
    value: function informable(obj, args) {
      obj.name = Gamelab.getArg(args, 'name', "__ObjectName");

      obj.description = Gamelab.getArg(args, 'description', false);

      obj.group = Gamelab.getArg(args, 'group', 'one');
    }
  }, {
    key: 'tweenable',
    value: function tweenable(obj) {

      obj.curve_string = obj.curve_string || "linearNone";

      obj.setTweenCurve = function (c) {

        c = c || "linear_none";

        var cps = c.split('_');

        //alert(cps);

        var s1 = cps[0].toLowerCase(),
            s2 = cps[1].toLowerCase();

        var curve = TWEEN.Easing.Linear.None;

        obj.curve_string = 'linear_none';

        Gamelab.each(TWEEN.Easing, function (ix, easing) {

          Gamelab.each(TWEEN.Easing[ix], function (iy, easeType) {

            if (ix == s1 && iy == s2) {

              // alert('setting curve');

              curve = TWEEN.Easing[ix][iy];

              obj.curve_string = ix + '_' + iy;
            }
          });
        });

        obj.curve = curve;

        return curve;
      };

      obj.curvesToArray = function () {

        var c = [];

        Gamelab.each(TWEEN.Easing, function (ix, easing) {

          Gamelab.each(easing, function (iy, easeType) {

            if (['in', 'out', 'inout', 'none'].indexOf(iy.toLowerCase()) >= 0) {

              c.push(ix + "_" + iy);
            }
          });
        });

        return c;
      };
    }
  }]);

  return VectorFunctions;
}();

;

Gamelab.FeatureInjectors.CssFeatures = new CssFeatures();

Gamelab.FeatureInjectors.VectorFunctions = new VectorFunctions();

Gamelab.FeatureInjectors.DataFunctions = new DataFunctions();
; /**
  * Creates Gamelab.js Canvas: The canvas-renderer for Gamelab games.

  @description
  This Canvas library handles the low-level drawing of Gamelab.Animation objects on HTML5Canvas.
  -Draws Sprites according to their rotation, size, and properties.
  * @returns {CanvasLib} a CanvasLib object.
  */

(function () {

  console.log('CanvasStack class... creating');

  var GamelabCanvas = function () {
    function GamelabCanvas() {
      _classCallCheck(this, GamelabCanvas);

      this.__levelMaker = false;
      //draw is synonymous w/ drawSprite
      this.draw = this.draw_object;
    }

    _createClass(GamelabCanvas, [{
      key: 'isStopped',
      value: function isStopped() {
        return Gamelab.stopDraw || false;
      }
    }, {
      key: 'drawLine',
      value: function drawLine(a, b, strokeStyle) {

        if (this.isStopped()) return;

        var ctx = Gamelab.game_windows[0].ctx;
        ctx.strokeStyle = strokeStyle || 'aqua';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }, {
      key: 'arc',
      value: function arc(p1, p2, strokeStyle) {

        if (this.isStopped()) return;

        var ctx = Gamelab.game_windows[0].ctx;

        ctx.strokeStyle = options.strokeStyle || 'aqua';

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p2.x, p2.y, Math.PI * 2, true);
        ctx.stroke();
      }
    }, {
      key: 'draw_image_frame',
      value: function draw_image_frame(imageFrameOptions) {
        var image = imageFrameOptions.image,
            framePos = imageFrameOptions.framePos,
            frameSize = imageFrameOptions.frameSize,
            position = imageFrameOptions.position,
            size = imageFrameOptions.size,
            rotation = imageFrameOptions.rotation,
            canvasContext = imageFrameOptions.canvasContext,
            flipX = imageFrameOptions.flipX,
            flipY = imageFrameOptions.flipY,
            origin = imageFrameOptions.origin,
            globalAlpha = imageFrameOptions.globalAlpha,
            globalComposite = imageFrameOptions.globalComposite;


        if (this.isStopped()) return;

        var fx = framePos.x,
            fy = framePos.y,
            fw = frameSize.x,
            fh = frameSize.y,
            x = position.x,
            y = position.y,
            width = size.x,
            height = size.y;

        //save canvas state before draw
        canvasContext.save();

        origin = origin || new Gamelab.Vector(width / 2, height / 2);

        //degrees rotation:
        var deg = rotation;
        deg = deg % 360;
        var rad = Math.floor(deg * Math.PI * 1000 / 180) / 1000;
        //Set the origin to the center of the image
        canvasContext.translate(x, y);
        canvasContext.rotate(rad);
        //Rotate the canvas around the origin


        canvasContext.translate(0, canvasContext.width);

        if (flipX) {
          canvasContext.scale(-1, 1);
        } else {}

        if (flipY) {
          canvasContext.scale(1, -1);
        } else {}
        canvasContext.globalAlpha = globalAlpha || 1.0;

        if (globalComposite) {}
        //canvasContext.globalCompositeOperation = globalComposite;

        //draw the image
        canvasContext.drawImage(image, fx, fy, fw, fh, -origin.x, -origin.y, width, height);
        //reset the canvas
        canvasContext.globalAlpha = 1.0;
        canvasContext.restore();
      }
    }, {
      key: 'draw_data',
      value: function draw_data(x, y, w, h, data, ctx) {
        if (this.isStopped()) return;

        ctx.putImageData(data, x, y, 0, 0, w, h);
      }
    }]);

    return GamelabCanvas;
  }();

  Gamelab.Canvas = new GamelabCanvas();

  Gamelab.GamelabCanvas = GamelabCanvas;

  var OffscreenCanvasRendering = function OffscreenCanvasRendering(psuedoImage) {
    _classCallCheck(this, OffscreenCanvasRendering);

    this.htmlImage = psuedoImage.domElement || psuedoImage;
    this.testCanvas = document.createElement("CANVAS");
    this.testCtx = this.testCanvas.getContext("2d");
    this.testCanvas.width = this.htmlImage.width;
    this.testCanvas.height = this.htmlImage.height;
    this.testCanvas.style.zIndex = '9999';
    this.testCtx.drawImage(this.htmlImage, 0, 0);
    return {
      canvas: this.testCanvas,
      ctx: this.testCtx
    };
  };

  ;

  Gamelab.OffscreenCanvasRendering = OffscreenCanvasRendering;
})();
;if (typeof JSON.decycle !== 'function') {
  JSON.decycle = function decycle(object) {
    "use strict";

    var objects = [],
        // Keep a reference to each unique object or array
    paths = []; // Keep the path to each unique object or array

    return function derez(value, path) {

      var i, // The loop counter
      name, // Property name
      nu; // The new object or array

      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'object':

          if (!value) {
            return null;
          }

          for (i = 0; i < objects.length; i += 1) {
            if (objects[i] === value) {
              return { $ref: paths[i] };
            }
          }

          // Otherwise, accumulate the unique value and its path.

          objects.push(value);
          paths.push(path);

          // If it is an array, replicate the array.

          if (Object.prototype.toString.apply(value) === '[object Array]') {
            nu = [];
            for (i = 0; i < value.length; i += 1) {
              nu[i] = derez(value[i], path + '[' + i + ']');
            }
          } else {

            // If it is an object, replicate the object.

            nu = {};
            for (name in value) {
              if (Object.prototype.hasOwnProperty.call(value, name)) {
                nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
              }
            }
          }
          return nu;
        case 'number':
        case 'string':
        case 'boolean':
          return value;
      }
    }(object, '$');
  };
}


/*

if (typeof JSON.retrocycle !== 'function') {
  JSON.retrocycle = function retrocycle($) {
    "use strict";

    var px = /^\$(?:\[(?:\d?|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

    (function rez(value) {

      var i, item, name, path;

      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        if (Object.prototype.toString.apply(value) === '[object Array]') {
          for (i = 0; i < value.length; i += 1) {
            item = value[i];
            if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
              path = item.$ref;
              if (typeof path === 'string' && px.test(path)) {
                value[i] = eval(path);
              } else {
                rez(item);
              }
            }
          }
        } else {
          for (name in value) {
            if (_typeof(value[name]) === 'object') {
              item = value[name];
              if (item) {
                path = item.$ref;
                if (typeof path === 'string' && px.test(path)) {
                  value[name] = eval(path);
                } else {
                  rez(item);
                }
              }
            }
          }
        }
      }
    })($);
    return $;
  };
}

var json_stringify = JSON.stringify;

JSON.stringify = function (object, arg2, arg3) {
  var clean_object = JSON.decycle(object);
  return json_stringify(clean_object, arg2, arg3);
};

var json_parse = JSON.parse;

JSON.parse = function (object, arg2, arg3) {
  var retro_object = JSON.retrocycle(object);
  return json_parse(retro_object);
};



; /**
  * @author mrdoob / http://mrdoob.com/
  */



/***************
 *
 * @ignore
 *
 * *****************/

var Stats = function Stats() {

  var mode = 0;

  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
  container.addEventListener('click', function (event) {

    event.preventDefault();
    showPanel(++mode % container.children.length);
  }, false);

  //

  function addPanel(panel) {

    container.appendChild(panel.dom);
    return panel;
  }

  function showPanel(id) {

    for (var i = 0; i < container.children.length; i++) {

      container.children[i].style.display = i === id ? 'block' : 'none';
    }

    mode = id;
  }

  //

  var beginTime = (performance || Date).now(),
      prevTime = beginTime,
      frames = 0;

  var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
  var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));

  if (self.performance && self.performance.memory) {

    var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));
  }

  showPanel(0);

  return {

    REVISION: 16,

    dom: container,

    addPanel: addPanel,
    showPanel: showPanel,

    begin: function begin() {

      beginTime = (performance || Date).now();
    },

    end: function end() {

      frames++;

      var time = (performance || Date).now();

      msPanel.update(time - beginTime, 200);

      if (time >= prevTime + 1000) {

        fpsPanel.update(frames * 1000 / (time - prevTime), 100);

        prevTime = time;
        frames = 0;

        if (memPanel) {

          var memory = performance.memory;
          memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
        }
      }

      return time;
    },

    update: function update() {

      beginTime = this.end();
    },

    // Backwards Compatibility

    domElement: container,
    setMode: showPanel

  };
};

Stats.Panel = function (name, fg, bg) {

  var min = Infinity,
      max = 0,
      round = Math.round;
  var PR = round(window.devicePixelRatio || 1);

  var WIDTH = 80 * PR,
      HEIGHT = 48 * PR,
      TEXT_X = 3 * PR,
      TEXT_Y = 2 * PR,
      GRAPH_X = 3 * PR,
      GRAPH_Y = 15 * PR,
      GRAPH_WIDTH = 74 * PR,
      GRAPH_HEIGHT = 30 * PR;

  var canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.cssText = 'width:80px;height:48px';

  var context = canvas.getContext('2d');
  context.font = 'bold ' + 9 * PR + 'px Helvetica,Arial,sans-serif';
  context.textBaseline = 'top';

  context.fillStyle = bg;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = fg;
  context.fillText(name, TEXT_X, TEXT_Y);
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

  context.fillStyle = bg;
  context.globalAlpha = 0.9;
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

  return {

    dom: canvas,

    update: function update(value, maxValue) {

      min = Math.min(min, value);
      max = Math.max(max, value);

      context.fillStyle = bg;
      context.globalAlpha = 1;
      context.fillRect(0, 0, WIDTH, GRAPH_Y);
      context.fillStyle = fg;
      context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);

      context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

      context.fillStyle = bg;
      context.globalAlpha = 0.9;
      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));
    }

  };
};
; /**
  * Tween.js - Licensed under the MIT license
  * https://github.com/tweenjs/tween.js
  * ----------------------------------------------
  *
  * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
  * Thank you all, you're awesome!
  */

/*
*
* @ignore
*
* */

var TWEEN = TWEEN || function () {

  var _tweens = [];

  return {

    getAll: function getAll() {

      return _tweens;
    },

    removeAll: function removeAll() {

      _tweens = [];
    },

    add: function add(tween) {

      _tweens.push(tween);
    },

    remove: function remove(tween) {

      var i = _tweens.indexOf(tween);

      if (i !== -1) {
        _tweens.splice(i, 1);
      }
    },

    update: function update(time, preserve) {

      if (_tweens.length === 0) {
        return false;
      }

      var i = 0;

      time = time !== undefined ? time : TWEEN.now();

      while (i < _tweens.length) {

        if (_tweens[i].update(time) || preserve) {
          i++;
        } else {
          _tweens.splice(i, 1);
        }
      }

      return true;
    }
  };
}();

//removed polyfill

TWEEN.now = Date.now;

TWEEN.Tween = function (object) {

  var _object = object;
  var _valuesStart = {};
  var _valuesEnd = {};
  var _valuesStartRepeat = {};
  var _duration = 1000;
  var _repeat = 0;
  var _repeatDelayTime;
  var _yoyo = false;
  var _isPlaying = false;
  var _reversed = false;
  var _delayTime = 0;
  var _startTime = null;
  var _easingFunction = TWEEN.Easing.Linear.None;
  var _interpolationFunction = TWEEN.Interpolation.Linear;
  var _chainedTweens = [];
  var _onStartCallback = null;
  var _onStartCallbackFired = false;
  var _onUpdateCallback = null;
  var _onCompleteCallback = null;
  var _onStopCallback = null;

  // Set all starting values present on the target object
  for (var field in object) {
    _valuesStart[field] = parseFloat(object[field], 10);
  }

  this.to = function (properties, duration) {

    if (duration !== undefined) {
      _duration = duration;
    }

    _valuesEnd = properties;

    return this;
  };

  this.start = function (time) {

    TWEEN.add(this);

    _isPlaying = true;

    _onStartCallbackFired = false;

    _startTime = time !== undefined ? time : TWEEN.now();
    _startTime += _delayTime;

    for (var property in _valuesEnd) {

      // Check if an Array was provided as property value
      if (_valuesEnd[property] instanceof Array) {

        if (_valuesEnd[property].length === 0) {
          continue;
        }

        // Create a local copy of the Array with the start value at the front
        _valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
      }

      // If `to()` specifies a property that doesn't exist in the source object,
      // we should not set that property in the object
      if (_object[property] === undefined) {
        continue;
      }

      _valuesStart[property] = _object[property];

      if (_valuesStart[property] instanceof Array === false) {
        _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
      }

      _valuesStartRepeat[property] = _valuesStart[property] || 0;
    }

    return this;
  };

  this.stop = function () {

    if (!_isPlaying) {
      return this;
    }

    TWEEN.remove(this);
    _isPlaying = false;

    if (_onStopCallback !== null) {
      _onStopCallback.call(_object, _object);
    }

    this.stopChainedTweens();
    return this;
  };

  this.end = function () {

    this.update(_startTime + _duration);
    return this;
  };

  this.stopChainedTweens = function () {

    for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
      _chainedTweens[i].stop();
    }
  };

  this.delay = function (amount) {

    _delayTime = amount;
    return this;
  };

  this.repeat = function (times) {

    _repeat = times;
    return this;
  };

  this.repeatDelay = function (amount) {

    _repeatDelayTime = amount;
    return this;
  };

  this.yoyo = function (yoyo) {

    _yoyo = yoyo;
    return this;
  };

  this.easing = function (easing) {

    _easingFunction = easing;
    return this;
  };

  this.interpolation = function (interpolation) {

    _interpolationFunction = interpolation;
    return this;
  };

  this.chain = function () {

    _chainedTweens = arguments;
    return this;
  };

  this.onStart = function (callback) {

    _onStartCallback = callback;
    return this;
  };

  this.onUpdate = function (callback) {

    _onUpdateCallback = callback;
    return this;
  };

  this.onComplete = function (callback) {

    _onCompleteCallback = callback;
    return this;
  };

  this.onStop = function (callback) {

    _onStopCallback = callback;
    return this;
  };

  this.update = function (time) {

    var property;
    var elapsed;
    var value;

    if (time < _startTime) {
      return true;
    }

    if (_onStartCallbackFired === false) {

      if (_onStartCallback !== null) {
        _onStartCallback.call(_object, _object);
      }

      _onStartCallbackFired = true;
    }

    elapsed = (time - _startTime) / _duration;
    elapsed = elapsed > 1 ? 1 : elapsed;

    value = _easingFunction(elapsed);

    for (property in _valuesEnd) {

      // Don't update properties that do not exist in the source object
      if (_valuesStart[property] === undefined) {
        continue;
      }

      var start = _valuesStart[property] || 0;
      var end = _valuesEnd[property];

      if (end instanceof Array) {

        _object[property] = _interpolationFunction(end, value);
      } else {

        // Parses relative end values with start as base (e.g.: +10, -3)
        if (typeof end === 'string') {

          if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            end = start + parseFloat(end, 10);
          } else {
            end = parseFloat(end, 10);
          }
        }

        // Protect against non numeric properties.
        if (typeof end === 'number') {
          _object[property] = start + (end - start) * value;
        }
      }
    }

    if (_onUpdateCallback !== null) {
      _onUpdateCallback.call(_object, value);
    }

    if (elapsed === 1) {

      if (_repeat > 0) {

        if (isFinite(_repeat)) {
          _repeat--;
        }

        // Reassign starting values, restart by making startTime = now
        for (property in _valuesStartRepeat) {

          if (typeof _valuesEnd[property] === 'string') {
            _valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
          }

          if (_yoyo) {
            var tmp = _valuesStartRepeat[property];

            _valuesStartRepeat[property] = _valuesEnd[property];
            _valuesEnd[property] = tmp;
          }

          _valuesStart[property] = _valuesStartRepeat[property];
        }

        if (_yoyo) {
          _reversed = !_reversed;
        }

        if (_repeatDelayTime !== undefined) {
          _startTime = time + _repeatDelayTime;
        } else {
          _startTime = time + _delayTime;
        }

        return true;
      } else {

        if (_onCompleteCallback !== null) {

          _onCompleteCallback.call(_object, _object);
        }

        for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
          // Make the chained tweens start exactly at the time they should,
          // even if the `update()` method was called way past the duration of the tween
          _chainedTweens[i].start(_startTime + _duration);
        }

        return false;
      }
    }

    return true;
  };
};

TWEEN.Easing = {

  Linear: {

    None: function None(k) {

      return k;
    }

  },

  Quadratic: {

    In: function In(k) {

      return k * k;
    },

    Out: function Out(k) {

      return k * (2 - k);
    },

    InOut: function InOut(k) {

      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }

      return -0.5 * (--k * (k - 2) - 1);
    }

  },

  Cubic: {

    In: function In(k) {

      return k * k * k;
    },

    Out: function Out(k) {

      return --k * k * k + 1;
    },

    InOut: function InOut(k) {

      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k + 2);
    }

  },

  Quartic: {

    In: function In(k) {

      return k * k * k * k;
    },

    Out: function Out(k) {

      return 1 - --k * k * k * k;
    },

    InOut: function InOut(k) {

      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }

      return -0.5 * ((k -= 2) * k * k * k - 2);
    }

  },

  Quintic: {

    In: function In(k) {

      return k * k * k * k * k;
    },

    Out: function Out(k) {

      return --k * k * k * k * k + 1;
    },

    InOut: function InOut(k) {

      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }

  },

  Sinusoidal: {

    In: function In(k) {

      return 1 - Math.cos(k * Math.PI / 2);
    },

    Out: function Out(k) {

      return Math.sin(k * Math.PI / 2);
    },

    InOut: function InOut(k) {

      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

  },

  Exponential: {

    In: function In(k) {

      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },

    Out: function Out(k) {

      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },

    InOut: function InOut(k) {

      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }

      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }

  },

  Circular: {

    In: function In(k) {

      return 1 - Math.sqrt(1 - k * k);
    },

    Out: function Out(k) {

      return Math.sqrt(1 - --k * k);
    },

    InOut: function InOut(k) {

      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }

      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }

  },

  Elastic: {

    In: function In(k) {

      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    },

    Out: function Out(k) {

      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    },

    InOut: function InOut(k) {

      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      k *= 2;

      if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
      }

      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    }

  },

  Back: {

    In: function In(k) {

      var s = 1.70158;

      return k * k * ((s + 1) * k - s);
    },

    Out: function Out(k) {

      var s = 1.70158;

      return --k * k * ((s + 1) * k + s) + 1;
    },

    InOut: function InOut(k) {

      var s = 1.70158 * 1.525;

      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }

      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }

  },

  Bounce: {

    In: function In(k) {

      return 1 - TWEEN.Easing.Bounce.Out(1 - k);
    },

    Out: function Out(k) {

      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },

    InOut: function InOut(k) {

      if (k < 0.5) {
        return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
      }

      return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    }

  }

};

TWEEN.Interpolation = {

  Linear: function Linear(v, k) {

    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = TWEEN.Interpolation.Utils.Linear;

    if (k < 0) {
      return fn(v[0], v[1], f);
    }

    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }

    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },

  Bezier: function Bezier(v, k) {

    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = TWEEN.Interpolation.Utils.Bernstein;

    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }

    return b;
  },

  CatmullRom: function CatmullRom(v, k) {

    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = TWEEN.Interpolation.Utils.CatmullRom;

    if (v[0] === v[m]) {

      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {

      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }

      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },

  Utils: {

    Linear: function Linear(p0, p1, t) {

      return (p1 - p0) * t + p0;
    },

    Bernstein: function Bernstein(n, i) {

      var fc = TWEEN.Interpolation.Utils.Factorial;

      return fc(n) / fc(i) / fc(n - i);
    },

    Factorial: function () {

      var a = [1];

      return function (n) {

        var s = 1;

        if (a[n]) {
          return a[n];
        }

        for (var i = n; i > 1; i--) {
          s *= i;
        }

        a[n] = s;
        return s;
      };
    }(),

    CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {

      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;

      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }

  }

};

//Attach to the global Gamelab object

/***************
 *
 * @memberOf Gamelab
 *
 * *****************/

Gamelab.TWEEN = TWEEN;

/*

// UMD (Universal Module Definition)
(function (root) {

    if (typeof define === 'function' && define.amd) {

        // AMD
        define([], function () {
            return TWEEN;
        });

    } else if (typeof module !== 'undefined' && typeof exports === 'object') {

        // Node.js
        module.exports = TWEEN;

    } else if (root !== undefined) {

        // Global variable
        root.TWEEN = TWEEN;

    }

})(this);

*/
;
//Call Gamelab.FeatureInject::

Gamelab.FeatureInject();

// UMD (Universal Module Definition)
(function (root) {

  if (typeof define === 'function' && define.amd) {

    // AMD
    define([], function () {
      return Gamelab;
    });
  } else if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {

    // Node.js
    module.exports = Gamelab;
  } else if (root !== undefined) {

    // Global variable
    root.Gamelab = Gamelab;
  }
})(undefined);
//# sourceMappingURL=gamelab.js.map
