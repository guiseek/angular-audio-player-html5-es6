import style from './audio.list.style.js'

export default `
<style>${style}</style>
<button type="button" data-ng-click="$ctrl.toggle()">
  <svg data-ng-show="!$ctrl.show" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z" /></svg>
  <svg data-ng-show="$ctrl.show" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" /></svg>
</button>
<ul id="list" data-ng-class="{hide: !$ctrl.show}">
  <li ng-repeat="music in $ctrl.musics" ng-click="$ctrl.setMusic($index)">
    <a>{{music.artist}} - {{music.title}}</a>
  </li>
</ul>`