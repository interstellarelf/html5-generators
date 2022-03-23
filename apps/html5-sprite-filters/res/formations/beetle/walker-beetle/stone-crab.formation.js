class LegLayerPair {

  constructor() {


  }

  MainParent(mainParent) {

    this.mainParent = mainParent;
    return this;
  }

  FrontLayer(upper, lower, offset) {

    let V = Gamelab.Vector;

    this.frontLayer = {
      upper: new Gamelab.Sprite().Clone(upper),
      lower: new Gamelab.Sprite().Clone(lower)
    };

    this.applyLeg(this.mainParent,
      this.frontLayer.upper,
      this.frontLayer.lower,
      offset);

    return this;

  }

  BackLayer(upper, lower, offset) {

    let V = Gamelab.Vector;

    this.backLayer = {
      upper: new Gamelab.Sprite().Clone(upper).Layer(-4),
      lower: new Gamelab.Sprite().Clone(lower).Layer(-4)
    };



    this.applyLeg(this.mainParent,
      this.backLayer.upper,
      this.backLayer.lower,
      offset);

    return this;

  }

  applyLeg($parentSprite, upper, lower, offset) {

    let V = Gamelab.Vector;

    let boneParent = $parentSprite;

    let $bones = [];

    //anchor right leg

    let anchorLeg = new Gamelab.Bone()
      .Parent(boneParent)
      .Target(upper)
      .Origin(new V(9, 7))
      .Offset(new V(offset.x, offset.y));

    $bones.push(anchorLeg);


    //Apply Legs::
    let upperToLowerLegBone = new Gamelab.Bone()
      .Parent(upper)
      .Target(lower)
      .Origin(new V(21, 5))
      .Offset(new V(14, 14));

    $bones.push(upperToLowerLegBone);

    $parentSprite.onUpdate(function() {

    //  console.log('updating bones');

      $bones.forEach(function(bone) {

        bone.updatePositionRotation();

      });

    });

  }

}

module.exports = function(gameWindow) {


  let $boneList = [];

  let $boneAnimations = [];

  $boneAnimations.add = function(name) {

    this.push({
      name: name,
      frames: []
    });

  };

  $boneAnimations.get = function(name) {

    for (var x = 0; x < this.length; x++) {
      if (name == x || this[x].name == name) {
        return this[x];
      }
    }

    return false;
  };


  $boneAnimations.add('walk');





  var frontUpperLeg1 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/upper-leg-x1.png');

  var frontLowerLeg1 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/lower-leg-x1.png');

  var frontUpperLeg2 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/upper-leg-x1.png');

  var frontLowerLeg2 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/lower-leg-x1.png');

  var frontUpperLeg3 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/upper-leg-x1.png');

  var frontLowerLeg3 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/lower-leg-x1.png');



  var backUpperLeg1 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/upper-leg-x1.png');

  var backLowerLeg1 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/lower-leg-x1.png');

  var backUpperLeg2 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/upper-leg-x1.png');

  var backLowerLeg2 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/lower-leg-x1.png');

  var backUpperLeg3 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/upper-leg-x1.png');

  var backLowerLeg3 = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/lower-leg-x1.png');




  var body = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/spike-body.png'),

    gill = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/gill.png'),

    eye = new Gamelab.Sprite('./res/formations/beetle/walker-beetle/eye.png');


  body.Position(180, 180);

  gill.Position(230, 215);

  eye.Position(196, 230);

  eye.Layer(-2);

  eye.flipX = true;

  body.Layer(-3);



  var legOffset1 = new V(42, 102),
      legOffset2 = new V(68, 102),
      legOffset3 = new V(96, 102);


  var BeetleStruct = {

    body: body,

    gill: gill,

    eye: eye,

    legPairs: [

      new LegLayerPair().MainParent(body).FrontLayer(frontUpperLeg1, frontLowerLeg1, legOffset1)
      .BackLayer(backUpperLeg1, backLowerLeg1, legOffset1),

      new LegLayerPair().MainParent(body).FrontLayer(frontUpperLeg2, frontLowerLeg2, legOffset2)
      .BackLayer(backUpperLeg2, backLowerLeg2, legOffset2),

      new LegLayerPair().MainParent(body).FrontLayer(frontUpperLeg3, frontLowerLeg3, legOffset3)
      .BackLayer(backUpperLeg3, backLowerLeg3, legOffset3),

    ]

  };

  BeetleStruct.getLeg = function(value) {

    if(value == 0)
    {
      var legPairLayer = this.legPairs[0].frontLayer;
      return {upper: legPairLayer.upper, lower:legPairLayer.lower };
    }

    if(value == 1)
    {
      var legPairLayer = this.legPairs[0].backLayer;
      return {upper: legPairLayer.upper, lower:legPairLayer.lower };
    }

    if(value == 2)
    {
      var legPairLayer = this.legPairs[1].frontLayer;
      return {upper: legPairLayer.upper, lower:legPairLayer.lower };
    }

    if(value == 3)
    {
      var legPairLayer = this.legPairs[1].backLayer;
      return {upper: legPairLayer.upper, lower:legPairLayer.lower };
    }

    if(value == 4)
    {
      var legPairLayer = this.legPairs[2].frontLayer;
      return {upper: legPairLayer.upper, lower:legPairLayer.lower };
    }

    if(value == 5)
    {
      var legPairLayer = this.legPairs[2].backLayer;
      return {upper: legPairLayer.upper, lower:legPairLayer.lower };
    }

    if(value > 5)
    {
      return console.error('index beyond total legs');
    }

  };


  var Controller = {

    gameWindow: gameWindow,

    spriteStructure: BeetleStruct,

    timer: 0,

    mode: 'walk',

    toggle: function() {

    },

    ready: function() {

      gameWindow.start();

    },

    walk: function(leg, delay=0) {

      var timeValue = this.timer - delay;

      if(this.mode=='walk' && timeValue % 50 < 25)
      {
        //seek min value at start of 2nd animation
        if(leg.lower.rotation.x > 0)
        {
          leg.lower.rotation.x = 0;
        }

        MotionLibrary.SeekVertPairRotation(leg.upper, leg.lower, 0, -10, 25, Gamelab.Curves.Out.Quadratic);

      }
      else if(this.mode=='walk' && timeValue % 50 >= 25) {

        if(leg.lower.rotation.x < 0)
        {
          leg.lower.rotation.x = 0;
        }

        MotionLibrary.SeekVertPairRotation(leg.upper, leg.lower, 82, 40, 25, Gamelab.Curves.Out.Quadratic);

      }

    },

    update: function() {

      this.timer += 1;

      console.log('updating');

      if(this.mode == 'walk')
      {

        this.walk(BeetleStruct.getLeg(0));

        this.walk(BeetleStruct.getLeg(1), 20);

        this.walk(BeetleStruct.getLeg(2), 20);

        this.walk(BeetleStruct.getLeg(3), 20);

        this.walk(BeetleStruct.getLeg(4));

        this.walk(BeetleStruct.getLeg(5), 20);

      }

      if(this.mode == 'backstep')
      {

        //insert backstep animation

      }

      if(this.mode == 'freeze')
      {

        //insert freeze animation

      }

    }

  };


  var formationApi = new FormationApi(Controller, function() {


  });

  //Set animations object::
  this.animations = {

    freeze: function(){

      Controller.mode = 'freeze';

    },

    walk: function(){

      Controller.mode = 'walk';

    },

    backstep: function(){

      Controller.mode = 'backstep';

    }

  };

  this.$api = formationApi;

  this.$api.Controller = Controller;

};
