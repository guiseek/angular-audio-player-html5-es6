import style from './style.js'

export default `
<style>${style}</style>
<fieldset>
  <legend>{{$ctrl.title}}</legend>
  <canvas id="analyser"></canvas>
  <div id="controls">
    <button type="button" ng-click="$ctrl.play()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
    </button>
    <button type="button" ng-click="$ctrl.pause()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>
    </button>
    <button type="button" ng-click="$ctrl.prev()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" /></svg>
    </button>
    <button type="button" ng-click="$ctrl.next()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" /></svg>
    </button>
    <progress value="{{$ctrl.percentage}}" max="100">{{$ctrl.percentage}} %</progress>
    <div id="time">
      <span ng-bind="$ctrl.time"></span>
      <span ng-bind="$ctrl.timeLeft"></span>
    </div>
    <div id="options">
      <label>
        Repetir
        <input type="checkbox" name="loop" ng-model="$ctrl.options.loop" ng-checked="$ctrl.options.loop" ng-change="$ctrl.changeLoop()">
      </label>
      <label>
        <input type="checkbox" name="random" ng-model="$ctrl.options.random" ng-checked="$ctrl.options.random">
        Aleatório
      </label>
    </div>
    <input type="range" ng-change="$ctrl.changeVolume()" ng-model="$ctrl.volume" min="0.0" max="1" step="0.1" ng-value="$ctrl.volume">
    <span id="volume">{{$ctrl.volume}}</span>
  </div>
  <div id="current">
    <marquee scrolldelay="200">{{$ctrl.song}}</marquee>
  </div>
  <ul id="list">
    <li ng-repeat="m in $ctrl.musics" ng-click="$ctrl.setMusic($index)">
      <a>{{m.artist}} - {{m.title}}</a>
    </li>
  </ul>
</fieldset>`