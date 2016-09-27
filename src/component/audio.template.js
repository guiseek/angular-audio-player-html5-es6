import style from './audio.style.js'

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
      <pre>{{$ctrl.options.loop | json}}</pre>
      <label data-ng-click="$ctrl.options.loop = !$ctrl.options.loop">
        <svg data-ng-show="$ctrl.options.loop" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z" /></svg>
        <svg data-ng-show="!$ctrl.options.loop" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z" /></svg>
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
  <audio-list musics="$ctrl.musics" on-set-music="$ctrl.setMusic(index)"></audio-list>
</fieldset>`