var BUTTON_BACKGROUND = 'linear-gradient(#333, black)',
  FILE_BACKGROUND = 'linear-gradient(black, #444)';

var BUTTON_BORDER = '1px ridge grey',
  FILE_BORDER = '1px ridge grey',
  SPAN_BORDER = '1px solid #111',
  LI_BORDER = '1px solid #222',
  RADIO_BACKGROUND = 'linear-gradient(#444, black)',
  RADIO_BORDER = '1px ridge grey',
  RADIO_SELECTED_BACKGROUND = 'linear-gradient(darkgoldenrod, black)',
  RADIO_SELECTED_COLOR = 'brown',
  RADIO_COLOR = 'snow',
  BUTTON_RADIUS = '5px',
  FINAL_BUTTON_COLOR = '#1ed36f';



dat.GUI.prototype.extensionSettings = {
  setterButton: './../../js/extensions/images/target.png',
  liBorder: '1px solid #222',
  spanBorder: '1px solid #111',
  titleSpanBorder: '1px solid #111',
  titleSpanColor: 'lightgrey',
  titleSpanWidth: '180px',
  titleSpanHeight: '20px',
  labelPadding: '4px',
  labelHeight: '19px',
  labelFileHeight: '16px',
  labelFilePaddingBottom: '8px',
  labelFilePaddingLeft: '4px',
  listBuilderWidth: '180px',
  listBuilderHeight: '20px',
  fontSize1: '12px',
  closeButtonFontSize: '12px',
  closeButtonColor: '#bd6d1a', //dark-orange
  labelInnerWidth: '180px',
  liInnerWidth: '180px',
  radioWidth: '180px',
  innerWidth: '190px',
  buttonBackground: 'linear-gradient(#333, black)',
  radioBackground: 'linear-gradient(#444, black)',
  radioSelectedBackground: 'linear-gradient(#222, black)',
  radioColor: 'snow',
  radioSelectedColor: 'darkorange',
  radioColor: 'snow',
  fileBackground: 'linear-gradient(black, #333)',
  buttonBorder: '1px ridge grey',
  fileBorder: '1px ridge grey',
  buttonRadius: '5px',
  finalButtonColor: '#1ed36f'
};

//add library function
dat.GUI.closeAllByClassName = function(className) {
  className = className.replace('.', '');
  let controllers = document.querySelectorAll('.' + className);

  controllers.forEach(function(item) {
    item.remove();
  });
}

dat.GUI.prototype.getExtSetting = function(key, def) {

  for (var x in this.extensionSettings) {
    if (x.toLowerCase() == key.toLowerCase()) {
      return this.extensionSettings[x];
    }
  }

  return def;
};

dat.GUI.prototype.ExtOptions = function(settings) {
  for (var x in settings) {
    dat.GUI.prototype.extensionSettings[x] = settings[x];
  }
};


dat.GUI.prototype.getListItemWithSpan = function(spanText, pctWidth) {
  let li = document.createElement('li');
  let span = document.createElement('span');
  span.style.display = 'inline-flex';
  span.style.flexDirection = 'row';
  span.style.color = 'lightgrey';
  span.style.width = this.getExtSetting('innerWidth', '190px');
  span.style.height = '90%';
  span.style.padding = '3px';
  span.style.background = '#222';
  span.style.fontSize = this.getExtSetting('fontSize1', '12px');

  span.innerText = text;
  li.appendChild(span);
  return li;
};


function getPosition(element) {
  var box = element.getBoundingClientRect();
  return {
    x: box.left,
    y: box.top
  }
}


function getSize(element) {
  return {
    x: element.clientWidth,
    y: element.clientHeight
  }
}


dat.GUI.prototype.positionRightByElement = function(dom) {
  var pos = getPosition(dom),
    size = getSize(dom);

  this.domElement.style.position = 'absolute';
  this.domElement.style.right = '!important';
  this.domElement.style.top = (pos.y - 4) + 'px';
  this.domElement.style.left = (pos.x + size.x + 10) + 'px';

  return this;
};




dat.GUI.prototype.positionLeftByElement = function(dom) {
  var pos = getPosition(dom),
    selfSize = getSize(this.domElement);

  this.domElement.style.position = 'absolute';
  this.domElement.style.right = '!important';
  this.domElement.style.top = (pos.y - 4) + 'px';
  this.domElement.style.left = (pos.x - selfSize.x - 10) + 'px';

  return this;
};


dat.GUI.prototype.show = function(domElement) {

  var divs = document.querySelectorAll('div');

  let located = false;
  let dom = document.getElementsByTagName('body')[0];

  if (domElement instanceof HTMLElement) {
    dom = domElement;
  }

  for (var x = 0; x < divs.length; x++) {
    if (this == divs[x]) {
      located = true;
    }
  }

  if (!located) {
    dom.appendChild(this.domElement);
  }

  if (this.domElement.style.display == 'none') {
    this.domElement.style.display = 'block'
  }

  if (this.domElement.style.opacity == 0) {
    this.domElement.style.opacity = 1.0;
  }

  return this;
};


dat.GUI.prototype.getBoxImageButton = function(imagePath) {

  let target = document.createElement('i');
  target.style.background = 'url(' + imagePath + ')';
  target.style.display = 'inline-block';
  target.style.width = '50px';
  target.style.height = '90%';
  target.style.float = 'right';
  target.style.marginTop = '-26px';
  target.style.marginLeft = '4px';
  target.style.cursor = 'pointer';
  target.style.backgroundRepeat = 'no-repeat';
  target.style.backgroundSize = 'auto 100%';
  target.style.backgroundPosition = 'center center';
  target.style.zIndex = '5';

  return target;
};

/***************************************
 * dat.GUI :: addButton()
 * function: add single button w/ onclick event
 ***************************************/

dat.GUI.prototype.addButton = function(text, onclick) {
  let li = document.createElement('li'),
    button = document.createElement('button');
  li.style.padding = '2px';
  button.style.color = 'lightgrey';
  button.style.width = this.getExtSetting('innerWidth', '190px');
  button.style.height = '90%';
  button.style.background = this.getExtSetting('buttonBackground', BUTTON_BACKGROUND);
  button.style.borderRadius = this.getExtSetting('buttonRadius', BUTTON_RADIUS);
  button.style.fontSize = this.getExtSetting('fontSize1', '12px');
  button.style.border = this.getExtSetting('buttonBorder', BUTTON_BORDER);
  button.style.marginTop = '2px';
  button.innerText = text;
  button.onclick = onclick;
  li.appendChild(button);
  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);
};





/***************************************
 * dat.GUI :: addGamepadInterface()
 * function: add single gamepad interface
 ***************************************/

dat.GUI.prototype.addGamepadInterface = function(text, onGamepadEvent) {
  let li = document.createElement('li'),
    liTwo = document.createElement('li');

  li.setAttribute('id', 'gamepad-interface');
  li.style.padding = '2px';

  let gamepad = document.createElement('i');
  gamepad.style.background = 'url(./../../js/extensions/images/xbox-pc-gamepad.png)';
  gamepad.style.display = 'inline-block';
  gamepad.style.width = '80px';
  gamepad.style.height = '64px';
  gamepad.style.marginTop = '12px';
  gamepad.style.marginRight = '9px';
  gamepad.style.float = 'right';
  gamepad.style.cursor = 'pointer';
  gamepad.style.backgroundRepeat = 'no-repeat';
  gamepad.style.backgroundSize = '100% 100%';
  gamepad.style.backgroundPosition = 'center center';
  gamepad.style.zIndex = '5';
  gamepad.onclick = onclick;

  let textarea = document.createElement('textarea'),
    spanOne = document.createElement('span');
  spanTwo = document.createElement('span'),
    inputBox = document.createElement('i');

  inputBox.style.position = 'relative';
  inputBox.style.display = 'inline-block';
  inputBox.style.top = '4px';
  inputBox.style.left = '4px';

  inputBox.style.width = '50px';
  inputBox.style.height = '50px';

  inputBox.style.background = 'black';

  spanOne.innerText = text;
  spanTwo.style.padding = '10px';

  liTwo.appendChild(spanOne);
  spanTwo.appendChild(gamepad);
  liTwo.appendChild(spanTwo);
  liTwo.appendChild(inputBox);

  li.appendChild(liTwo);

  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);

};


dat.GUI.prototype.addRadioSwitch = function(textArray, onclick) {
  let li = document.createElement('li');

  li.style.padding = '0px';
  li.style.margin = '0px';

  for (var x = 0; x < textArray.length; x++) {

    var childLi = document.createElement('li');

    li.appendChild(childLi);

    var button = document.createElement('button');
    button.style.color = 'lightgrey';
    button.style.width = this.getExtSetting('radioWidth', '180px');

    button.style.height = '90%';
    button.style.minHeight = '24px';
    button.style.marginTop = '2px';
    button.style.marginLeft = '5px';
    button.style.textAlign = 'left';
    button.style.paddingLeft = '15px';
    button.style.background = this.getExtSetting('radioBackground', RADIO_BACKGROUND);
    button.style.color = this.getExtSetting('radioColor', RADIO_COLOR);
    button.style.borderRadius = this.getExtSetting('buttonRadius', BUTTON_RADIUS);
    button.style.fontSize = this.getExtSetting('fontSize1', '12px');
    button.style.border = this.getExtSetting('buttonBorder', BUTTON_BORDER);


    button.setAttribute('data-radio-index', x);
    button.setAttribute('data-checked', false);

    while (textArray[x].includes('*')) {
      textArray[x] = textArray[x].replace('*', '');
      button.setAttribute('data-checked', true);
      button.style.color = this.getExtSetting('radioSelectedColor', RADIO_SELECTED_COLOR);
      button.style.background = this.getExtSetting('radioSelectedBackground', RADIO_SELECTED_BACKGROUND);
    }

    button.innerText = textArray[x];

    button.setAttribute('data-radio-value', textArray[x]);

    button.classList.add('option');

    button.classList.add('radio');

    var _proto = dat.GUI.prototype;

    function clearAll() {

      var buttons = li.querySelectorAll('button.radio');

      buttons.forEach(function(item) {

        item.setAttribute('data-checked', false);
        item.style.color = _proto.getExtSetting('radioColor', RADIO_COLOR);
        item.style.background = _proto.getExtSetting('radioBackground', RADIO_BACKGROUND);

      });

    }

    button.onclick = function(evt) {

      var selected = evt.target.getAttribute('data-checked') == 'true';

      clearAll();

      //runs when button is clicked: only if !selected do we select this button:
      if (!selected) {
        evt.target.setAttribute('data-checked', true);
        evt.target.style.color = _proto.getExtSetting('radioSelectedColor', RADIO_SELECTED_COLOR);
        evt.target.style.background = _proto.getExtSetting('radioSelectedBackground', RADIO_SELECTED_BACKGROUND);
      }

      var text = evt.target.innerText,
        selected = evt.target.getAttribute('data-checked');

      onclick(evt, text, selected);
    }

    childLi.appendChild(button);


  }

  li.appendChild(childLi);

  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);
};




dat.GUI.prototype.addMultiCheck = function(checkList, onclick) {

  let li = document.createElement('li');

  li.style.padding = '0px';

  for (var x = 0; x < checkList.length; x++) {

    var childLi = document.createElement('li');

    li.appendChild(childLi);

    var label = document.createElement('label');

    label.innerText = checkList[x].name;

    var input = document.createElement('input');

    input.type = 'checkbox';

    input.checked = false;

    input.setAttribute('data-name', checkList[x].name);

    input.onchange = function() {

      callback(this.getAttribute('data-name'), this.checked);

    };

    childLi.appendChild(label);

    childLi.appendChild(input);

    li.appendChild(childLi);

  }


  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);
};


dat.GUI.prototype.addFinalButton = function(text, onclick) {

  let li = document.createElement('li'),
    button = document.createElement('button');
  li.classList.add('final');

  let spacer = document.createElement('span');
  spacer.classList.add('spacer');

  button.style.color = this.getExtSetting('finalButtonColor', 'darkorange');
  button.style.width = this.getExtSetting('innerWidth', '190px');
  button.style.height = '90%';
  button.style.background = this.getExtSetting('buttonBackground', BUTTON_BACKGROUND);
  button.style.borderRadius = this.getExtSetting('buttonRadius', BUTTON_RADIUS);
  button.style.fontSize = this.getExtSetting('fontSize1', '12px');
  button.style.border = this.getExtSetting('buttonBorder', BUTTON_BORDER);
  button.style.marginTop = '2px';
  button.innerText = text;
  button.onclick = onclick;

  li.appendChild(button);


  this.domElement.appendChild(spacer);


  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);
};


dat.GUI.prototype.ListBuilderPosition = function(value) {

  let headings = this.domElement.querySelectorAll('.list-builder-heading');

  headings.forEach(function(item) {
    item.style.position = value;
  });
}

/***************************************
 * dat.GUI :: addButton()
 * function: add single button w/ onclick event
 ***************************************/

dat.GUI.prototype.addListBuilder = function(text, onclick) {

  let li = document.createElement('li'),
    span = document.createElement('span');

  span.style.position = 'fixed';
  span.style.zIndex = '4998';

  span.classList.add('list-builder-heading');

  li.style.marginTop = '-1px';

  li.classList.add('list-builder-' + text);
  li.setAttribute('id', 'dgui-list-builder-' + text);

  span.style.display = 'flex';
  span.style.flexDirection = 'row';
  span.style.fontSize = this.getExtSetting('fontSize1', '12px');
  span.style.color = 'lightgrey';
  span.style.width = this.getExtSetting('listBuilderWidth', '180px');
  span.style.height = this.getExtSetting('listBuilderHeight', '1px solid #111');

  span.style.paddingTop = '7px';
  span.style.paddingLeft = '10px';
  span.style.paddingBottom = '4px';
  span.style.background = '#222';
  span.style.border = this.getExtSetting('spanBorder', SPAN_BORDER);
  span.innerText = text;

  let plus = document.createElement('i');
  plus.style.background = 'url(./../../js/extensions/images/plus.png)';
  plus.style.display = 'inline-block';
  plus.style.width = '50px';
  plus.style.height = '32px';
  plus.style.marginTop = '-8px';
  plus.style.cursor = 'pointer';
  plus.style.backgroundRepeat = 'no-repeat';
  plus.style.backgroundSize = 'auto 100%';
  plus.style.backgroundPosition = 'center center';
  plus.style.zIndex = '5';

  plus.onclick = onclick;

  span.appendChild(plus);
  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(span);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);
};



dat.GUI.prototype.addTitleSpan = dat.GUI.prototype.addTitle = function(text) {
  let li = document.createElement('li'),
    span = document.createElement('span');

  this.domElement.classList.add('has-title');

  span.classList.add('title');

  span.style.position = 'fixed';
  span.style.display = 'inline-flex';
  span.style.flexDirection = 'row';
  span.style.marginTop = '-10px';
  span.style.fontSize = this.getExtSetting('fontSize1', '12px');
  span.style.color = 'lightgrey';
  span.style.width = this.getExtSetting('titleSpanWidth', '180px');
  span.style.height = this.getExtSetting('titleSpanHeight', '20px');
  span.style.paddingLeft = '10px';
  span.style.paddingTop = '4px';
  span.style.paddingBottom = '5px';
  span.style.background = '#222';
  span.style.border = this.getExtSetting('titleSpanBorder', '1px solid #111');
  span.innerText = text;

  li.appendChild(span);
  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);

  return this;
};

//later: change the warning to a custom dialogue
function warning(message) {
  alert(message);
}

function nameInputLabel(label) {

  label.contentEditable = true;

  label.onkeypress = function(e) {

    if (e.key === 'Enter' || e.keyCode === 13) {
      this.setAttribute('entity-name', this.innerText);
      return false;
    }

    if (this.innerText.length <= 15) {
      return true;
    } else {
      warning('names have max length of 15 characters');
      return false;
    }
  };

}

dat.GUI.prototype.addMemberToListBuilder = function(lbText, member, onclick) {

  var options = dat.GUI.prototype.extensionSettings || {
    setterButton: './../../js/extensions/images/target.png'
  };

  let liMain = document.querySelector('#dgui-list-builder-' + lbText),
    li = document.createElement('li');

  li.classList.add('member');

  let len = liMain.querySelectorAll('li.member').length;

  li.style.top = '0px';

  li.classList.add('listmember');


  if (len == 0 && !this.domElement.classList.contains('has-title')) {
    console.log('+margin on 1st list item');
    li.style.marginTop = '38px';
  }

  li.style.marginLeft = '5px';
  li.style.marginBottom = '4px';

  if (len > 0) {
    li.style.top = (-14 * len) + 'px';
  }

  li.style.position = 'relative';

  li.style.height = '32px';

  li.style.background = '#222';
  li.style.width = this.getExtSetting('liInnerWidth', '190px');
  li.style.borderRight = 'none';

  let span = document.createElement('span');
  span.style.position = 'absolute';
  span.style.color = 'lightgrey';
  span.style.width = this.getExtSetting('innerWidth', '190px');
  span.style.height = '90%';
  span.style.textAlign = 'left';
  span.style.paddingLeft = '5px';
  span.style.paddingTop = '4px';
  span.style.fontSize = this.getExtSetting('fontSize1', '12px');

  span.classList.add('listmember-item');

  if (typeof member == 'object') {
    span.setAttribute('dguid', member.dguid || 'NONE');
    span.innerText = member.type || 'object';
  } else {
    span.innerText = typeof member == 'string' ? member : '!untitled';
  }

  li.onmouseover = function() {
    console.log('mouseover');
    this.style.background = '#333';
  };

  li.onmouseout = function() {
    console.log('mouseout');
    this.style.background = '#222';
  };

  let fileServerSelect;

  if (typeof member == 'object' && member.type == 'animation-3d') {
    fileServerSelect = this.getFileServerSelect();
    fileServerSelect.style.marginTop = '-1px';
  }

  let setter = document.createElement('i');
  setter.style.background = `url(${options.setterButton || './../../js/extensions/images/target.png'})`;
  setter.style.position = 'absolute';
  setter.style.width = '50px';
  setter.style.height = '25px';
  setter.style.cursor = 'pointer';
  setter.style.backgroundRepeat = 'no-repeat';
  setter.style.backgroundSize = 'auto 100%';
  setter.style.backgroundPosition = 'center center';
  setter.style.zIndex = '5';
  setter.style.marginTop = '-2px';
  setter.classList.add('setter');
  setter.setAttribute('data-index', liMain.querySelectorAll('i.setter').length);

  if (this.domElement.getAttribute('data-expand') == 'right') {
    setter.style.left = 'revert';
    setter.style.right = '12px';
  } else {
    setter.style.right = 'revert';
    setter.style.left = '-40px';
    setter.style.marginTop = '0px';
    span.style.marginLeft = '30px';
    span.style.marginTop = '2px';
    span.style.paddingTop = '0px';
  }

  setter.onmouseover = function() {
    this.style.transform = 'scale(1.2)';
  }

  setter.onmouseout = function() {
    this.style.transform = 'none';
  }

  let listItems = liMain.querySelectorAll('li');

  console.info('listItems', listItems);

  if (!listItems.length) {
    let spacer = document.createElement('span');
    spacer.classList.add('dg-spacer-y');
    spacer.style.position = 'relative';
    spacer.style.height = '0px';
    spacer.style.padding = '0px';
    spacer.style.margin = '0px';
    spacer.style.display = 'block';
    spacer.style.visibility = 'hidden';
    this.domElement.appendChild(spacer);
  }



  setter.onclick = onclick;
  span.appendChild(setter);

  if (fileServerSelect) {
    span.appendChild(fileServerSelect);
  }

  li.appendChild(span);
  liMain.appendChild(li);
};


dat.GUI.prototype.getPlayButton = function(onclick) {

  var options = {
    playButton: './../../files/images/gui/play.png'
  };

  var labelHeight = this.getExtSetting('labelHeight', '30px'),

    labelHeight = parseInt(labelHeight);

  let play = document.createElement('i');
  play.style.background = `url(${options.playButton || './../../files/images/gui/play.png'})`;
  play.style.position = 'absolute';
  play.style.right = '10px';
  play.style.width = '50px';
  play.style.height = '25px';
  play.style.marginTop = -(labelHeight + 7) + 'px';
  play.style.cursor = 'pointer';
  play.style.backgroundRepeat = 'no-repeat';
  play.style.backgroundSize = 'auto 100%';
  play.style.backgroundPosition = 'center center';
  play.style.zIndex = '5';

  play.classList.add('play');

  play.onmouseover = function() {
    this.style.transform = 'scale(1.2)';
  }

  play.onmouseout = function() {
    this.style.transform = 'none';
  }

  play.onclick = onclick || function() {};
  return play;
}


dat.GUI.prototype.getFileButton = function(onclick) {

  var options = {
    fileButton: './../../files/images/gui/file.png'
  };

  var labelHeight = this.getExtSetting('labelHeight', '30px'),

    labelHeight = parseInt(labelHeight);

  let file = document.createElement('i');
  file.style.background = `url(${options.fileButton || './../../files/images/gui/file.png'})`;
  file.style.position = 'absolute';
  file.style.right = '45px';
  file.style.width = '50px';
  file.style.height = '25px';
  file.style.marginTop = -(labelHeight + 7) + 'px';
  file.style.cursor = 'pointer';
  file.style.backgroundRepeat = 'no-repeat';
  file.style.backgroundSize = 'auto 100%';
  file.style.backgroundPosition = 'center center';
  file.style.zIndex = '5';

  file.classList.add('file');

  file.onmouseover = function() {
    this.style.transform = 'scale(1.2)';
  }

  file.onmouseout = function() {
    this.style.transform = 'none';
  }

  file.onclick = onclick || function() {};
  return file;
}



dat.GUI.prototype.getFileServerSelect = function(onclick) {

  onclick = onclick || function() {};

  var options = {
    fileButton: './../../files/images/gui/file-server.png'
  };

  var labelHeight = this.getExtSetting('labelHeight', '30px'),

    labelHeight = parseInt(labelHeight);

  let file = document.createElement('i');
  file.style.background = `url(${options.fileButton || './../../files/images/gui/file-server.png'})`;
  file.style.position = 'absolute';
  file.style.right = '45px';
  file.style.width = '50px';
  file.style.height = '25px';
  file.style.marginTop = -(labelHeight + 7) + 'px';
  file.style.cursor = 'pointer';
  file.style.backgroundRepeat = 'no-repeat';
  file.style.backgroundSize = 'auto 100%';
  file.style.backgroundPosition = 'center center';
  file.style.zIndex = '5';

  file.classList.add('file');

  file.onmouseover = function() {
    this.style.transform = 'scale(1.2)';
  }

  file.onmouseout = function() {
    this.style.transform = 'none';
  }

  file.onclick = onclick || function() {};
  return file;
}



dat.GUI.prototype.getBlankAudio = function() {
  var audio = document.createElement('audio');
  audio.style.display = 'none';
  return audio;
}

dat.GUI.prototype.addSoundFileMemberToListBuilder = function(lbText, member, onchange) {

  var options = dat.GUI.prototype.extensionSettings || {
    setterButton: './../../js/extensions/images/target.png'
  };

  let liMain = document.querySelector('#dgui-list-builder-' + lbText),
    li = document.createElement('li');

  li.classList.add('member');

  let len = liMain.querySelectorAll('li.member').length;

  if (len == 0 && !this.domElement.classList.contains('has-title')) {
    console.log('+margin on 1st list item');
    li.style.marginTop = '35px';
  }


  li.style.position = 'relative';
  li.style.top = '0px';
  li.style.height = '28px';
  li.style.background = '#222';
  li.style.width = this.getExtSetting('liInnerWidth', '190px');
  li.style.borderRight = 'none';

  let span = document.createElement('span');
  span.style.position = 'relative';
  span.style.display = 'contents';
  span.style.color = 'lightgrey';
  span.style.width = this.getExtSetting('innerWidth', '190px');
  span.style.height = '90%';
  span.style.paddingTop = '7px';
  span.style.paddingLeft = '35px';
  span.style.paddingBottom = '0px';
  span.style.fontSize = this.getExtSetting('fontSize1', '12px');


  let playButton = this.getPlayButton(),
    fileButton = this.getFileButton(),
    audioDom = this.getBlankAudio();

  fileButton.onclick = function() {

    hiddenFile.click();

  };

  let hiddenFile = document.createElement('input');
  hiddenFile.type = 'file';
  hiddenFile.id = 'hidden-file';
  hiddenFile.style.display = 'none';
  hiddenFile.onchange = onchange;

  let label = document.createElement('label');
  label.innerText = lbText;
  label.style.display = 'block';
  label.style.color = 'lightgrey';
  label.style.width = this.getExtSetting('labelInnerWidth', '180px');
  label.style.height = this.getExtSetting('labelHeight', '1px solid #111');
  label.style.background = this.getExtSetting('fileBackground', FILE_BACKGROUND);
  label.style.padding = this.getExtSetting('labelPadding', '4px');
  label.style.border = this.getExtSetting('buttonBorder', BUTTON_BORDER);

  nameInputLabel(label);


  let listItems = liMain.querySelectorAll('li');

  console.info('listItems', listItems);

  if (!listItems.length) {
    let spacer = document.createElement('span');
    spacer.classList.add('dg-spacer-y');
    spacer.style.position = 'relative';
    spacer.style.height = '5px';
    spacer.style.display = 'block';
    spacer.style.visibility = 'hidden';
    this.domElement.appendChild(spacer);
  }

  span.appendChild(label);
  span.appendChild(playButton);
  span.appendChild(audioDom);
  span.appendChild(fileButton);
  li.appendChild(hiddenFile);
  li.appendChild(span);
  liMain.appendChild(li);
};


/***************************************
 * dat.GUI :: addFileInput()
 * function: add single file input w/ onchange event
 ***************************************/

dat.GUI.prototype.addFileInput = function(text, onchange) {

  let li = document.createElement('li'),
    hiddenFile = document.createElement('input');
  hiddenFile.type = 'file';
  hiddenFile.id = 'hidden-file';
  hiddenFile.style.display = 'none';
  hiddenFile.onchange = onchange;

  li.classList.add('file');

  let label = document.createElement('label');
  label.innerText = text;
  label.style.display = 'block';
  label.style.color = 'lightgrey';
  label.style.width = this.getExtSetting('labelInnerWidth', '180px');
  label.style.height = this.getExtSetting('labelFileHeight', '16px');
  label.style.background = this.getExtSetting('fileBackground', FILE_BACKGROUND);
  label.style.paddingBottom = this.getExtSetting('labelFilePaddingBottom', '8px');
  label.style.paddingLeft = this.getExtSetting('labelFilePaddingLeft', '4px');
  label.style.border = this.getExtSetting('buttonBorder', BUTTON_BORDER);

  label.for = hiddenFile.id;

  label.appendChild(hiddenFile);
  li.appendChild(label);
  console.info(this.domElement);
  this.domElement.querySelectorAll('ul')[0].appendChild(li);
};


/***************************************
 * dat.GUI :: addFontInput()
 * function: add single font-file input w/ onchange event
 ***************************************/

dat.GUI.prototype.addFontInput = function(text, onchange) {
  this.addFileInput(text, function(evt) {
    var file = evt.target.files[0];
    SpriteBuilderProgram.surfaceFont = file;
    for (var x = 0; x < files.length; x++) {
      var $reader = new FileReader();
      var f = files[x];

      $reader.addEventListener("load", function() {
        var fontStyle = document.createElement('style');
        if (!['ttf', 'otf', 'woff', 'eot'].includes(f.name.split('.').pop().toLowerCase())) {
          console.error('Incorrect file type');
        }
        fontStyle.innerText = "@font-face {\nfont-family : surfaceFont;\nsrc : url(data:font/ttf;base64," + this.result + ");\n};";

        onchange(fontStyle);

      });
      $reader.readAsDataURL(f);
    }
  });

}



dat.GUI.prototype.prepareFade = function(dom) {

  var gui = this;

  var timeout;

  this.onmouseout = function() {

    this.style.border = '2px solid #444';

    if (timeout) {
      clearTimeout(timeout);
    }

    var $dom = this;

    timeout = setTimeout(() => {

      $dom.classList.add('fade-out');

    }, 3000);
  }

  //original timeout is for 5 seconds unless inputs are engaged:
  timeout = setTimeout(() => {

    gui.domElement.classList.add('fade-out');

  }, 5000);


  this.onmouseover = function() {
    this.style.border = '2px solid #777';

    if (timeout) {
      clearTimeout(timeout);
    }
  }

  this.onclick = function() {
    this.style.border = '2px solid #777';

    if (timeout) {
      clearTimeout(timeout);
    }
  }


  document.body.addEventListener('click', function() {

    var isClickFromGui = gui.domElement.contains(event.target),
      isClickFromSource = dom.parentElement.contains(event.target);

    if (!(isClickFromGui || isClickFromSource)) {

      gui.domElement.classList.add('fade-out');

    }

  });
}



/***************************************
 * dat.GUI :: addCloseButton()
 * function: add close button for the gui --top-right of container
 ***************************************/

dat.GUI.prototype.addCloseButton = function() {

  let closeButton = document.createElement('button');

  closeButton.style.position = 'fixed';
  closeButton.style.zIndex = 9999;

  closeButton.style.marginTop = '3px';
  closeButton.style.marginLeft = '172px';

  closeButton.style.padding = '5px';
  closeButton.style.paddingTop = '3px';
  closeButton.style.paddingBottom = '2px';
  closeButton.style.fontSize = this.getExtSetting('closeButtonFontSize', '12px');
  closeButton.style.background = '#111';
  closeButton.style.color = this.getExtSetting('closeButtonColor', '#bd6d1a');
  closeButton.style.border = '1px solid #555';

  closeButton.innerText = 'X';

  let $dgui = this;

  closeButton.onclick = function() {
    $dgui.domElement.remove();
  }

  this.domElement.querySelectorAll('ul')[0].prepend(closeButton);

};
