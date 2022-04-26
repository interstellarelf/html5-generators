/**
 * Created by Jordan on 03/06/2022.
 */

/*****************************************************************************
 * server.js
 * -Serves static assets
 * -provides file info for what files are in RESOURCE folder
 * -requires nodejs javascript
 * -GET and POST with express: app.get() and app.post()
 ****************************************************************************/

/*****************************************************************************
 * #Server-Main
 ****************************************************************************/

 function jstr(object){
    return JSON.stringify(object, null, 2);
 };

/* global module:false */
const kill = require('kill-port');
const app_uriPrefix = '';
const glob = require('glob');

kill(process.env.PORT || 4200)
  .then(console.log('Killed processes on ' + process.env.PORT || 4200));

const path = require('path');
const url = require('url');


class Formation {


  constructor(name) {

    this.name = name;

    this.animations = [];

    this.scripts = [];

  }

  setScripts(scripts) {

    this.scripts = scripts;

    return this;

  }

  addAnimation(anime) {

    this.animations.push(anime);

    return this;

  }

}


var AppData = {

  formations: {}

};

module.exports = function(openNow) {

  console.log('module.exports() function');
  var fs = require('fs');
  const express = require('express');
  console.log("Initializing...");
  const bodyParser = require('body-parser');
  const app = express();
  // set view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, './' + app_uriPrefix + '/client/views/'));
  app.port = process.env.PORT || 4200;
  app.use(bodyParser.json({
    limit: '50mb'
  }));
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  var cors = require('cors');
  app.use(cors({
    origin: '*',
    withCredentials: false
  }));

  /*****************************************************************************
   * #Server-Main, #Security, #Access-Control
   ****************************************************************************/

  // Settings for CORS
  app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });


  //Main index request '/'
  app.get('/*', function(req, res, next) {
    if (req.url.indexOf('/cache/') >= 0) {
      console.log('Got cache request:');
      console.log('Sending:' + process.cwd() + '/' + req.url);
      res.sendFile(process.cwd() + '/' + req.url);
      next();
    } else if (req.url.indexOf('/module-tools') >= 0) {
      console.log('Got module-tools request:');
      next();
    } else if (req.url.indexOf('/dist/') >= 0) {
      console.log('Got url:' + req.url);
      var p = path.join(__dirname, '/dist/' + req.url.replace('/dist', ''));
      console.log('Sending file from:' + p);
      //res.end('send response from dist folder');
      res.sendFile(p);
    } else
    if (req.url.indexOf('/Resources/') >= 0) {
      console.log('Got url:' + req.url);
      var p = path.join(__dirname, '/Resources/' + req.url.replace('/Resources', ''));
      while (p.indexOf('%20') >= 0) {
        p = p.replace('%20', ' ');
      }
      console.log('Sending file from:' + p);
      //res.end('send response from dist folder');
      res.sendFile(p);
    } else if (req.url.indexOf('/api/') >= 0) {
      next();
    }
    else {
      next();
    }
  });

  app.use(express.static(__dirname));


  function onFormationsByName(name, applyCallback) {

    glob('./res/formations/' + name + '/**/*.formation.js', {}, function(err, files) {

      applyCallback(files, name);

    });


  }

  function onAnimationsByName(name, applyCallback) {

    glob('./res/formations/' + name + '/**/*.animation.js', {}, function(err, files) {

      for(var x = 0; x < files.length; x++)
      {

        applyCallback(files, name);

      }

    });


  }



    glob('./res/formations/*', {}, function(err, files) {

      for(var x = 0; x < files.length; x++)
      {

        var name = files[x].split('/formations/')[1];

        console.log('applying formation on:' + name);

        AppData.formations[name] = new Formation(name);

        onFormationsByName(name, function(files, name){

          console.log('applying formation scripts');

          AppData.formations[name].setScripts(files);

            console.log(jstr(AppData));

        });

        onAnimationsByName(name, function(files, name){

          for(var x = 0; x < files.length; x++)
          {
              AppData.formations[name].addAnimation(files[x]);

          }

        });



      }

    });



  /*****************************************************************************
   * #Server-Main, #Desktop
   ****************************************************************************/

  function LaunchApplication() {
    var url = 'http://localhost:' + app.port + '/' + 'index.html';
    console.log('Opening Application at:' + url);
    var exec = require('child_process').exec,
      child;

    child = exec('nw client/',
      function(error, stdout, stderr) {
        if (stdout !== '') {
          console.log('---------stdout: ---------\n' + stdout);
        }
        if (stderr !== '') {
          console.log('---------stderr: ---------\n' + stderr);
        }
        if (error !== null) {
          console.log('---------exec error: ---------\n[' + error + ']');
        }
      });
  };


  /*****************************************************************************
  *
  * App / Get
  *
  *****************************************************************************/

  app.get('/create-particle/:name', function(req, res){

      console.log('Create-Particle');

      res.send('--req-incomplete');

  });

  app.get('/api/app-data', function(req, res){

      var name = req.query.name;

      res.send(jstr(AppData));

  });



  /*****************************************************************************
   * #Server-Main, #Data
   ****************************************************************************/

  var Resources = {
    scripts: [],
    load: function() {
      var glob = require('glob');
      glob('./Resources/scripts/**/*.js', {}, function(err, files) {
        console.info('GOT FILES:' + files.length);
        Resources.scripts = files;
      });
    }
  };


  try {

    console.log('STARTING SOCKET.IO...');
    this.server = require('http').createServer(app);

    console.log('app.port::' + app.port);
    app.listen(app.port, '0.0.0.0');

    if (process.argv[2] !== 'web') {
      console.log('Launching NW Application');
      LaunchApplication();
    }

  } catch (e) {
    console.log(e);
  }
};



//run module.exports as function
module.exports(true);
