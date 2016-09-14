(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AudioPlayerComponent = {
  restrict: 'E',
  bindings: {
    options: '=',
    musics: '='
  },
  template: '\n    <fieldset>\n      <legend>{{$ctrl.options.title}}</legend>\n      <canvas id="analyser"></canvas>\n      <div id="controls">\n        <button type="button" ng-click="$ctrl.play()">Play</button>\n        <button type="button" ng-click="$ctrl.pause()">Pause</button>\n        <button type="button" ng-click="$ctrl.prev()">Anterior</button>\n        <button type="button" ng-click="$ctrl.next()">Próxima</button>\n        <input type="range" ng-change="$ctrl.changeVolume()" ng-model="$ctrl.volume" min="0.0" max="1" step="0.1" ng-value="$ctrl.volume">\n        <span id="volume">{{$ctrl.volume}}</span>\n        <div id="options">\n          <label>\n            <input type="checkbox" name="loop" ng-model="$ctrl.options.loop" ng-checked="$ctrl.options.loop" ng-change="$ctrl.changeLoop()"> Repetir\n          <label>\n          <label>\n            <input type="checkbox" name="random" ng-model="$ctrl.options.random" ng-checked="$ctrl.options.random"> Aleatório\n          <label>\n        </div>\n      </div>\n      <div id="current">\n        <span>{{$ctrl.song}}</span>\n      </div>\n      <ul id="list">\n        <li ng-repeat="m in $ctrl.musics" ng-click="$ctrl.setMusic($index)">\n          <a>{{m.artist}} - {{m.title}}</a>\n        </li>\n      </ul>\n    </fieldset>\n  ',
  controller: function controller($scope, $element, $attrs, $timeout) {
    var ctrl = this;

    var createAudio = function createAudio() {
      ctrl.audio = new Audio();
      ctrl.audio.loop = ctrl.options.loop;
      ctrl.audio.autoplay = ctrl.options.autoplay;
      ctrl.audio.crossOrigin = ctrl.options.origin || 'anonymous';
      ctrl.audio.addEventListener('ended', ctrl.next);
    };

    var getRandom = function getRandom() {
      return Math.floor(Math.random() * ctrl.musics.length);
    };

    ctrl.setCurrent = function (current) {
      ctrl.current = current >= ctrl.musics.length ? 0 : current;
    };
    var song = void 0;
    ctrl.setSong = function () {
      song = ctrl.musics[ctrl.current];
      ctrl.song = song.artist + ' - ' + song.title;
      ctrl.audio.src = song.value;
    };
    ctrl.setMusic = function (index) {
      ctrl.setCurrent(index);
      ctrl.setSong();
      ctrl.play();
    };
    ctrl.changeVolume = function () {
      ctrl.audio.volume = ctrl.volume;
    };
    ctrl.play = function () {
      ctrl.audio.play();
    };
    ctrl.pause = function () {
      ctrl.audio.pause();
    };
    ctrl.next = function () {
      if (ctrl.options.random) {
        ctrl.setMusic(getRandom());
        return;
      }
      ctrl.setMusic(ctrl.current + 1);
    };
    ctrl.prev = function () {
      if (ctrl.options.random) {
        ctrl.setMusic(getRandom());
        return;
      }
      ctrl.setMusic(ctrl.current - 1);
    };
    ctrl.changeLoop = function () {
      ctrl.audio.loop = ctrl.options.loop;
    };
    ctrl.changeRandom = function () {
      ctrl.audio.loop = ctrl.options.loop;
    };

    var audioContext = void 0,
        analyser = void 0,
        source = void 0,
        fbc_array = void 0;
    var createAudioContext = function createAudioContext() {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      source = audioContext.createMediaElementSource(ctrl.audio);
      analyser = audioContext.createAnalyser();
      fbc_array = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    };

    var canvas = void 0,
        canvasCtx = void 0;
    var createCanvas = function createCanvas() {
      canvas = document.getElementById('analyser');
      canvasCtx = canvas.getContext('2d');
    };
    var defineSizesCanvas = function defineSizesCanvas() {
      canvas.width = 200;
      canvas.height = 300;
    };
    var bars = void 0,
        bar_x = void 0,
        bar_width = void 0,
        bar_height = void 0;
    var frameLooper = function frameLooper() {
      window.requestAnimationFrame(frameLooper);
      analyser.getByteFrequencyData(fbc_array);
      render();
    };

    var render = function render() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = 'orange';
      bars = 200;
      for (var i = 0; i < bars; i++) {
        bar_width = canvas.width / bars;
        bar_x = i * (bar_width + 2);
        bar_height = -fbc_array[i];
        canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    };

    ctrl.$onInit = function () {
      ctrl.current = 0;
      ctrl.volume = 1;
      createAudio();
      createAudioContext();
      createCanvas();
      defineSizesCanvas();
      frameLooper();
      ctrl.setSong();
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
