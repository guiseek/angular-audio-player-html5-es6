(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AudioPlayerComponent = {
  restrict: 'E',
  bindings: {
    musics: '=',
    loop: '=',
    autoplay: '=',
    origin: '='
  },
  template: '\n    <fieldset>\n      <legend>Audio Player</legend>\n      <canvas id="analyser"></canvas>\n      <div id="controls">\n        <button type="button" data-control="play">Play</button>\n        <button type="button" data-control="pause">Pause</button>\n        <input type="range" name="volume" min="0.0" max="1" step="0.1" value="1">\n        <input type="text" name="volval">\n      </div>\n      <div id="list">\n        <select multiple name="list"></select>\n      </div>\n    </fieldset>\n  ',
  controller: function controller($scope, $element, $attrs, $timeout) {
    var ctrl = this;
    // Define audio information and load
    var audio = void 0;
    var createAudio = function createAudio() {
      audio = new Audio();
      audio.loop = ctrl.options.loop;
      audio.autoplay = ctrl.options.autoplay;
      audio.crossOrigin = ctrl.options.origin;
    };

    // Define variables for analyser
    var audioContext = void 0,
        analyser = void 0,
        source = void 0,
        fbc_array = void 0;
    // Define Audio Analyser Helpers
    var createAudioContext = function createAudioContext() {
      // Creating the context and pluging the stream to api node
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      source = audioContext.createMediaElementSource(audio);

      // Creating the analyser and defining the frequency array
      analyser = audioContext.createAnalyser();
      fbc_array = new Uint8Array(analyser.frequencyBinCount);

      // Connect the output of the source to the input of the analyser
      source.connect(analyser);

      // Connect the output of the analyser to the destination
      analyser.connect(audioContext.destination);
    };

    // Define controls handler
    var volume = void 0,
        volval = void 0,
        value = void 0,
        controls = void 0;
    var handlerControls = function handlerControls() {
      // Select vol controls
      volume = element.querySelector('input[name="volume"]');
      volval = element.querySelector('input[name="volval"]');
      // Display first volume value
      volval.value = volume.value;
      // Listening volume change
      volume.addEventListener('change', function (e) {
        value = e.target.value;
        volval.value = value;
        audio.volume = value;
      }, false);
      // Select action controls
      controls = element.querySelectorAll('button[data-control]');
      // Finding right action
      controls.forEach(function (control) {
        // Listening action click
        control.addEventListener('click', function () {
          audio[control.getAttribute('data-control')]();
        }, false);
      });
    };

    // Create sounds list
    var list = void 0,
        option = void 0;
    var createList = function createList() {
      list = element.querySelector('select[name="list"]');
      // Populate songs list
      ctrl.options.musics.forEach(function (m) {
        option = document.createElement('option');
        option.value = m.value;
        option.innerHTML = m.artist + ' - ' + m.title + ' (' + m.album + ')';
        list.appendChild(option);
      });
      // Listening double click
      list.addEventListener('dblclick', function (e) {
        setMusic(e.target.value);
      }, false);
    };
    // Set music to play
    var setMusic = function setMusic(music) {
      audio.src = music;
    };
    // Check autoplay for play first sound
    var checkAutoplay = function checkAutoplay() {
      if (ctrl.options.autoplay && ctrl.options.musics.length > 0) {
        setMusic(ctrl.options.musics[0].value);
      }
    };

    // Define main variables for canvas start
    var canvas = void 0,
        canvasCtx = void 0;
    // Define Canvas helpers
    var createCanvas = function createCanvas() {
      canvas = document.getElementById('analyser');
      canvasCtx = canvas.getContext('2d');
    };
    // Define sizes canvas (self explanatory)
    var defineSizesCanvas = function defineSizesCanvas() {
      canvas.width = 200;
      canvas.height = 300;
    };

    // Define variables to draw
    var bars = void 0,
        bar_x = void 0,
        bar_width = void 0,
        bar_height = void 0;
    // Create the animation
    var frameLooper = function frameLooper() {
      // Recursive to create our animation
      window.requestAnimationFrame(frameLooper);
      // Get the new frequency data
      analyser.getByteFrequencyData(fbc_array);
      // Udpate the visualization
      render();
    };

    // Draw analyser
    var render = function render() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = 'red';
      bars = 200;
      for (var i = 0; i < bars; i++) {
        bar_width = canvas.width / bars;
        bar_x = i * (bar_width + 2);
        bar_height = -fbc_array[i];
        canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    };

    // Get options player
    var element = void 0;
    ctrl.getOptions = function () {
      element = $element[0];
      ctrl.options = {
        loop: ctrl.loop || true,
        autoplay: ctrl.autoplay || false,
        origin: $attrs.origin || 'anonymous',
        musics: ctrl.musics
      };
    };

    // Init player
    ctrl.$onInit = function () {
      ctrl.getOptions();
      createList();
      createAudio();
      handlerControls();
      createAudioContext();
      createCanvas();
      defineSizesCanvas();
      frameLooper();
      checkAutoplay();
    };
  }
};

exports.default = AudioPlayerComponent;

},{}],2:[function(require,module,exports){
'use strict';

var _audio = require('./component/audio.js');

var _audio2 = _interopRequireDefault(_audio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('audio.player', []).component('audioPlayer', _audio2.default);

},{"./component/audio.js":1}]},{},[2]);
