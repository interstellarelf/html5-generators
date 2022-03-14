/*********************************************
 * MainMenu::
 *   Creates a main-menu on top-of-screen
 *********************************************/
function MainMenu() {

  this.init = function(DATA) {
    this.VIEW_DATA = DATA;
    var __inst = this;
    var menu = this;

    $('ul.multi-menu li, multi-menu li').hover(function(e) {
      var elist = $(e.target).find('ul'),
        e1 = elist.length ?
        elist[0] :
        undefined,
        xOffset = $(e.currentTarget).position().left,
        yOffset = $(e.currentTarget).position().top + $(e.currentTarget).height();
      console.log(e.currentTarget, e.target);

      if (e.target.parentNode.classList.contains('multi-menu')) {
        //TODO NOTE MUST CHANGE the calculation of xOffset / COMPATIBILITY with DIFF MARGINS + PADDING
        yOffset = $(e.currentTarget).position().top + $(e.currentTarget).height() - 1;
        //  yOffset = Fix(e.currentTarget.parentNode).size().y;
      } else {
        //xOffset += ;
        //  console.log(pxx);
        //xOffset += 300;
        yOffset -= $(e.target).height() - 1;
        xOffset += (($(e.target).width() + 3) * 0.45);
      }

      if (e1) {
        e1.style.left = xOffset + 'px';
        e1.style.top = yOffset + 'px';
        e1.style.minWidth = $(e.target).width() + 'px';
      }

    }, function(e) {

    });

    $('#main-menu li li').click(function(e) {
      //  alert('clicked #main-menu li:' + e.target.innerText);
      var view_Uri = e.target.getAttribute('data-view');
      if (view_Uri) {


        e.preventDefault();
        return false;
      }

    });


    function MediaLink() {


    }


    $('#add-script').click(function() {

      alert('add-script');

    });

    $('#select-materials').click(function() {

      var materials = new ModelMaterials().getMaterials(App.model);

    });


    $('#animation-mix').click(function() {

      var controller = controller || new Arrow.Controller('#main-modal-content');
      controller.Title('Animation Mixer');

      controller.addMediaLinks('Select Animation - 1', [{
          image: './images/program-capture.png',
          text: '3D Model Loader',
          description: 'Load and Edit 3D Models',
          file: 'NONE'
        },
        {
          image: './images/program-capture.png',
          text: '3D Model Loader',
          description: 'Load and Edit 3D Models',
          file: 'NONE'
        },
        {
          image: './images/program-capture.png',
          text: '3D Model Loader',
          description: 'Load and Edit 3D Models',
          file: 'NONE'
        },
        {
          image: './images/program-capture.png',
          text: '3D Model Loader',
          description: 'Load and Edit 3D Models',
          file: 'NONE'
        }
      ]);

      controller.render();

      $('#main-modal').show('fast');

    });


    $('#load-animation').click(function() {

      var controller = controller || new Arrow.Controller('#main-modal-content');
      controller.Title('Load Animation');

      console.info('loading from model list:', App.modelService.models);

      let animationList = [];

      animationList.add = function(item) {
        if (!this.includes(item)) {
          this.push(item);
        }

      };

      animationList.findByText = function(text) {

        return this.filter(item => item.text == text);

      };

      App.modelService.models.getCurrentModel = function() {

        for (var x = 0; x < this.length; x++) {
          if (App.selectedModel.includes(this[x].name)) {
            return this[x];
          }

        }

        return false;

      };

      let model = App.modelService.models.getCurrentModel();

      model.animations = model.animations || model.children;

      if (App.selectedModel.indexOf(model.name) >= 0 && model.animations) {
        console.log('got model-animations');

        model.animations.forEach(function(anime) {

          console.info('anime', anime);

          var screenshotPath = anime.path.split('.').slice(0, -1).join('.');
          screenshotPath = screenshotPath.substring(1, screenshotPath.length);

          console.log('screenshotPath=' + screenshotPath);

          animationList.add({
            image: screenshotPath + '-screenshot.jpg',
            text: anime.name,
            description: anime.type,
            file: anime.path
          });

        });

      }

      controller.add3DAnimationLinks('Select Animation - 1', animationList, function(text) {

        let anime = animationList.findByText(text)[0];

        console.info(anime);

        App.setMainAnimation(anime.file.replace('./', './../../'));

        $('#main-modal').hide('fast');

      });

      controller.render();

      $('#main-modal').show('fast');

    });


    $('#load-object3d').click(function() {

      console.info('Models', App.modelService);

      var controller = controller || new Arrow.Controller('#main-modal-content');
      controller.Title('Load Object3d');

      console.info('loading from model list:', App.modelService.models);

      let modelList = [];

      modelList.add = function(item) {
        if (!this.includes(item)) {
          this.push(item);
        }

      };

      modelList.findByText = function(text) {

        return this.filter(item => item.text == text);

      };

      for (var x = 0; x < App.modelService.models.length; x++) {
        let model = App.modelService.models[x];

        model.animations = model.animations || model.children;

        console.log('got model-animations');


        var screenshotPath = model.path.split('.').slice(0, -1).join('.');
        screenshotPath = screenshotPath.substring(1, screenshotPath.length);

        console.log('screenshotPath=' + screenshotPath);

        modelList.add({
          image: screenshotPath + '-screenshot.jpg',
          text: model.name,
          description: model.type,
          file: model.path
        });

      }


      controller.add3DModelLinks('Select Model - 1', modelList, function(text) {

        let model = modelList.findByText(text)[0];

        console.info(model);

        App.setMainModel(model.file.replace('./', './../../'));

        $('#main-modal').hide('fast');

      });

      controller.render();

      $('#main-modal').show('fast');



    });

  }

  //call init()
  this.init();


};
