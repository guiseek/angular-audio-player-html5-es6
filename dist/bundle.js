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
  template: '\n    <fieldset>\n      <legend>{{$ctrl.options.title}}</legend>\n      <canvas id="analyser"></canvas>\n      <div id="controls">\n        <button type="button" ng-click="$ctrl.play()">Play</button>\n        <button type="button" ng-click="$ctrl.pause()">Pause</button>\n        <button type="button" ng-click="$ctrl.prev()">Anterior</button>\n        <button type="button" ng-click="$ctrl.next()">Próxima</button>\n        <progress value="{{$ctrl.percentage}}" max="100">{{$ctrl.percentage}} %</progress>\n        <div id="time">\n          <span ng-bind="$ctrl.time"></span>\n          <span ng-bind="$ctrl.timeLeft"></span>\n        </div>\n        <div id="options">\n          <label>\n            Repetir\n            <input type="checkbox" name="loop" ng-model="$ctrl.options.loop" ng-checked="$ctrl.options.loop" ng-change="$ctrl.changeLoop()">\n          </label>\n          <label>\n            <input type="checkbox" name="random" ng-model="$ctrl.options.random" ng-checked="$ctrl.options.random">\n            Aleatório\n          </label>\n        </div>\n        <input type="range" ng-change="$ctrl.changeVolume()" ng-model="$ctrl.volume" min="0.0" max="1" step="0.1" ng-value="$ctrl.volume">\n        <span id="volume">{{$ctrl.volume}}</span>\n      </div>\n      <div id="current">\n        <marquee scrolldelay="200">{{$ctrl.song}}</marquee>\n      </div>\n      <ul id="list">\n        <li ng-repeat="m in $ctrl.musics" ng-click="$ctrl.setMusic($index)">\n          <a>{{m.artist}} - {{m.title}}</a>\n        </li>\n      </ul>\n    </fieldset>\n  ',
  controller: function controller($scope, $element, $attrs, $interval, $filter) {
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
    var h = void 0,
        m = void 0,
        s = void 0;
    var secToTime = function secToTime(seconds) {
      h = Math.floor(seconds % 86400 / 3600);
      m = Math.floor(seconds % 86400 % 3600 / 60);
      s = seconds % 86400 % 3600 % 60;
      return ('00' + h).slice(-2) + ':' + ('00' + m).slice(-2) + ':' + ('00' + s).slice(-2);
    };
    var duration = void 0,
        currentTime = void 0;
    $interval(function () {
      duration = Math.floor(ctrl.audio.duration);
      currentTime = Math.floor(ctrl.audio.currentTime);
      ctrl.time = secToTime(currentTime);
      ctrl.timeLeft = secToTime(duration - currentTime);
      ctrl.percentage = Math.floor(100 / ctrl.audio.duration * ctrl.audio.currentTime);
    }, 100);

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
      ctrl.time = 0;
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
