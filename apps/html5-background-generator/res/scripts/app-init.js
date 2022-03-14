
var System = {

  createParticleEffect: function(name) {

    var tabTitle = document.createElement('div');

    tabTitle.classList.add('tab-title');

    tabTitle.innerText = name;

    $(tabTitle).insertAfter($('div.tab-title').last());

  }

};


var App = {

  init: function(){


    window.onload = function() {

      //Place the renderer at approx center screen (in window)
      canvasPositionLoop();

      //prepare clicks
      prepareClicks();

    };

  }
};



function showObjectRequestModal(callback) {

  var modal = document.querySelector('#object-modal');

  $(modal).show('fast');

  callback();

};


function jqueryReady() {

  $(document).ready(function() {

    $('button#close-name').click(function() {

      $(this).parent().hide('fast');

    });

    $('button#add-particle').click(function() {

      showObjectRequestModal(function(name) {

        $('button#continue-name').off().click(function() {

          var name = $('input#name').val();

          $('button#close-name').parent().hide('fast');

          System.createParticleEffect(name);

        });

      });

    });

      var modal = document.querySelector('#object-modal');

      $(modal).hide('fast');

  });

}


function prepareClicks() {

  //2 seconds after window-load, auto-click the #start button
  window.setTimeout(function() {

    $('#start').click();

    //7 seconds later prepare the canvas click
    window.setTimeout(function() {

      prepareCanvasClick();

    }, 7000);

  }, 200);

}


function canvasPositionLoop() {

  window.setInterval(function() {

    var canvasParticle = document.querySelectorAll('.particle-frame')[0];

    var logo = document.querySelectorAll('div.logo')[0];

    var screenWidth = document.body.clientWidth,
      screenHeight = document.body.clientHeight;

    canvasParticle.style.left = ((screenWidth / 2.0) - 340) + 'px';

    if (screenWidth < 1150) {

      canvasParticle.style.left = ((screenWidth / 2.0) - 400) + 'px';
      logo.style.display = 'none';
    } else {
      logo.style.display = 'block';
    }

    canvasParticle.style.top = 10 + 'px';

  }, 2000);

}

function prepareCanvasClick() {

  //canvas click is same as pressing replay button ::

  var canvas = document.querySelectorAll('.effect-frame')[0];

  canvas.onclick = function(){

    $('#replay').click();

  };


  var canvasParticle = document.querySelectorAll('.particle-frame')[0];

  canvasParticle.onclick = function() {

    $('#replay').click();

  };


}
