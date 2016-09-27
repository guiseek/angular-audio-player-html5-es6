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
      <label data-ng-click="$ctrl.changeLoop()">
        <svg id="loop" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </label>
      <label data-ng-click="$ctrl.changeRandom()">
        <svg id="random" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
        </svg>
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