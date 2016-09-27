(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _audioTemplate = require('./audio.template.js');

var _audioTemplate2 = _interopRequireDefault(_audioTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioPlayerComponent = {
  restrict: 'E',
  bindings: {
    title: '@',
    options: '=',
    musics: '<',
    onSetMusic: '&'
  },
  template: _audioTemplate2.default,
  controller: function controller($scope, $element, $attrs, $interval) {
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
    var getSvgFill = function getSvgFill(bool) {
      return bool ? '#000000' : '#999999';
    };
    var setLoopFill = function setLoopFill() {
      loop.style.fill = getSvgFill(ctrl.options.loop);
    };
    ctrl.changeLoop = function () {
      ctrl.audio.loop = ctrl.options.loop = !ctrl.options.loop;
      setLoopFill();
    };
    var setRandomFill = function setRandomFill() {
      random.style.fill = getSvgFill(ctrl.options.random);
    };
    ctrl.changeRandom = function () {
      ctrl.options.random = !ctrl.options.random;
      setRandomFill();
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

    var loop = void 0,
        random = void 0;
    ctrl.$postLink = function () {
      loop = $element[0].querySelector('#loop');
      setLoopFill();
      random = $element[0].querySelector('#random');
      setRandomFill();
    };
  }
};

exports.default = AudioPlayerComponent;

},{"./audio.template.js":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _audioListTemplate = require('./audio.list.template.js');

var _audioListTemplate2 = _interopRequireDefault(_audioListTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioListComponent = {
  restrict: 'E',
  bindings: {
    musics: '<',
    onSetMusic: '&'
  },
  template: _audioListTemplate2.default,
  controller: function controller($scope, $element, $attrs) {
    var ctrl = this;
    ctrl.setMusic = function (index) {
      ctrl.onSetMusic({ index: index });
    };
    ctrl.toggle = function () {
      ctrl.show = !ctrl.show;
    };
    ctrl.$onInit = function () {
      ctrl.show = true;
    };
  }
};

exports.default = AudioListComponent;

},{"./audio.list.template.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\naudio-player audio-list {\n  display: block;\n  position: relative;\n}\naudio-player audio-list button {\n  position: absolute;\n  left: 82px;\n  bottom: -38px;\n  cursor: pointer;\n  background-color: transparent;\n  border: 0;\n}\naudio-player audio-list #list {\n  padding: 0;\n  width: 202px;\n  max-height: 120px;\n  overflow-y: scroll;\n  list-style: none;\n  -webkit-transition: all 1s ease;\n  -moz-transition: all 1s ease;\n  -ms-transition: all 1s ease;\n  -o-transition: all 1s ease;\n  transition: all 1s ease;\n}\naudio-player audio-list #list.hide {\n  max-height: 0;\n}\naudio-player audio-list #list li {\n  margin: 3px 0;\n  padding: 3px 0;\n  cursor: pointer;\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  border-bottom: 1px solid #ccc;\n}\naudio-player audio-list #list li:last-child {\n  border-bottom: 0;\n}";

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _audioListStyle = require('./audio.list.style.js');

var _audioListStyle2 = _interopRequireDefault(_audioListStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = '\n<style>' + _audioListStyle2.default + '</style>\n<button type="button" data-ng-click="$ctrl.toggle()">\n  <svg data-ng-show="!$ctrl.show" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z" /></svg>\n  <svg data-ng-show="$ctrl.show" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" /></svg>\n</button>\n<ul id="list" data-ng-class="{hide: !$ctrl.show}">\n  <li ng-repeat="music in $ctrl.musics" ng-click="$ctrl.setMusic($index)">\n    <a>{{music.artist}} - {{music.title}}</a>\n  </li>\n</ul>';

},{"./audio.list.style.js":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\naudio-player {\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 13px;\n}\naudio-player fieldset {\n  width: 205px;\n  padding: 4px 9px 12px 10px;\n  background-color: #f5f5f5;\n  border: 2px solid #ccc;\n}\naudio-player legend {\n  padding: 0 6px;\n}\naudio-player canvas {\n  width: 200px;\n  height: 100px;\n  background-color: #eaeaea;\n  border: 2px solid #ccc;\n}\naudio-player #controls {\n  margin-top: 6px;\n}\naudio-player #controls button {\n  margin: 0 0 4px;\n  padding: 4px 0;\n  width: 48px;\n  font-size: 12px;\n  background-color: #fff;\n  border: 2px solid #ccc;\n}\naudio-player #controls #time,\naudio-player #controls #options label {\n  cursor: pointer;\n}\naudio-player #controls #options {\n  width: 202px;\n}\naudio-player #controls #time span:last-child,\naudio-player #controls #options label:last-child {\n  text-align: right;\n  float: right;\n}\naudio-player #controls progress {\n  width: 202px;\n  margin: 5px 0;\n}\naudio-player #controls #volume {\n  margin: 4px 0;\n  width: 20px;\n  float: right;\n  text-align: right;\n}\naudio-player #controls input[type=\"range\"] {\n  margin: 2px 0;\n  width: 180px;\n}\naudio-player #current {\n  margin: 0 0 2px 0;\n  padding: 4px 0;\n  border-bottom: 2px solid #ccc;\n}\naudio-player #current input[type=\"text\"] {\n  width: 202px;\n  background-color: transparent;\n  border: 0;\n}\n";

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _audioStyle = require('./audio.style.js');

var _audioStyle2 = _interopRequireDefault(_audioStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = '\n<style>' + _audioStyle2.default + '</style>\n<fieldset>\n  <legend>{{$ctrl.title}}</legend>\n  <canvas id="analyser"></canvas>\n  <div id="controls">\n    <button type="button" ng-click="$ctrl.play()">\n      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>\n    </button>\n    <button type="button" ng-click="$ctrl.pause()">\n      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>\n    </button>\n    <button type="button" ng-click="$ctrl.prev()">\n      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" /></svg>\n    </button>\n    <button type="button" ng-click="$ctrl.next()">\n      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" /></svg>\n    </button>\n    <progress value="{{$ctrl.percentage}}" max="100">{{$ctrl.percentage}} %</progress>\n    <div id="time">\n      <span ng-bind="$ctrl.time"></span>\n      <span ng-bind="$ctrl.timeLeft"></span>\n    </div>\n    <div id="options">\n      <label data-ng-click="$ctrl.changeLoop()">\n        <svg id="loop" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>\n          <path d="M0 0h24v24H0z" fill="none"/>\n        </svg>\n      </label>\n      <label data-ng-click="$ctrl.changeRandom()">\n        <svg id="random" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n          <path d="M0 0h24v24H0z" fill="none"/>\n          <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>\n        </svg>\n      </label>\n    </div>\n    <input type="range" ng-change="$ctrl.changeVolume()" ng-model="$ctrl.volume" min="0.0" max="1" step="0.1" ng-value="$ctrl.volume">\n    <span id="volume">{{$ctrl.volume}}</span>\n  </div>\n  <div id="current">\n    <marquee scrolldelay="200">{{$ctrl.song}}</marquee>\n  </div>\n  <audio-list musics="$ctrl.musics" on-set-music="$ctrl.setMusic(index)"></audio-list>\n</fieldset>';

},{"./audio.style.js":5}],7:[function(require,module,exports){
'use strict';

var _audio = require('./component/audio.js');

var _audio2 = _interopRequireDefault(_audio);

var _audioList = require('./component/audio.list.js');

var _audioList2 = _interopRequireDefault(_audioList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('audio.player', []).component('audioPlayer', _audio2.default).component('audioList', _audioList2.default);

},{"./component/audio.js":1,"./component/audio.list.js":2}]},{},[7]);
