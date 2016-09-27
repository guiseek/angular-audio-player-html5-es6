# angular-audio-player-html5-es6
Angular Audio Component Player - HTML5/ES6

## Demo

[View demo](http://guiseek.js.org/angular-audio-player-html5-es6/)

## Print Screen

![angular audio component player](https://raw.githubusercontent.com/guiseek/angular-audio-player-html5-es6/gh-pages/printscreen.png)

### Download
```
npm i angular-audio-player-html5-es6
```

### Creating html
```html
<html data-ng-app="app">
<head>
  <meta charset="utf-8">
  <title>Angular Audio Player Component - HTML5/ES6</title>
</head>
<body data-ng-controller="AppController as ctrl">
  <!-- Component Audio Player -->
  <audio-player title="Audio Player" options="ctrl.options" musics="ctrl.list"></audio-player>
  <!-- /Component Audio Player -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="dist/bundle.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

### Creating controller
```javascript
angular
  .module('app', ['audio.player'])
  .controller('AppController', ['$scope', function ($scope) {
    var ctrl = this;
    ctrl.options = {
      autoplay: true,
      loop: false,
      random: true,
      origin: 'anonymous' // Optional, anonymous is default
    }
    ctrl.list = [
      {
        artist: 'Chasing Ghosts',
        title: 'Fallen From Grace',
        album: 'Chasing Ghosts',
        value: 'musics/Chasing_Ghosts-Fallen_From_Grace.mp3'
      },
      {
        artist: 'Sepultura',
        title: 'Refuse/Resist',
        album: 'Chaos A.D.',
        value: 'musics/Sepultura-Refuse_Resist.mp3'
      },
      {
        artist: 'Raimundos',
        title: 'Baily Funk',
        album: 'Lapadas do povo',
        value: 'musics/Raimundos-Baily_Funk.mp3'
      }
    ]
  }])

```
---

Este repositório surgiu da palestra do [Willian Justen](https://github.com/willianjusten) no BrazilJS 2016, que mostrou por onde começar os estudos sobre audio api. Thanks Willian ;)

---

## Changelog

Version | Description
--- | ---
1.0.0 | Upping Angular Audio Player Component
2.0.0 | Config changed in component and code improvements
2.1.0 | Added elapsed and remaining time
2.2.0 | Config changed and imports HTML, CSS files
2.2.1 | Create sub-component audio-list and apply audio-list toggle animation
2.2.2 | Adding SVG icons to loop, random and also changed the npm tasks

## Developer

### npm scripts

Command | Description
--- | ---
npm start | Start live server, concat, babelify and watchify changes 
npm run build | Concat, Babelify and Minify 