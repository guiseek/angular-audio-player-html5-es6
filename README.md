# angular-api-transparencia-brasil
Angular Audio Component Player - HTML5/ES6

## Demo

[View demo](http://guiseek.js.org/angular-audio-player-html5-es6/)

### Creating html
```html
<html data-ng-app="app">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Angular Audio Player Component - HTML5/ES6</title>
  <link rel="stylesheet" href="src/component/style.css">
</head>
<body data-ng-controller="AppController as ctrl">
  <!-- Component Audio Player -->
  <audio-player musics="ctrl.player.list" autoplay="ctrl.player.autoplay"></audio-player>
  <!-- /Component Audio Player -->
  <script src="node_modules/angular/angular.min.js"></script>
  <script src="dist/bundle.js"></script>
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
    ctrl.player = {
      autoplay: true,
      list: [
        {
          artist: 'Raimundos',
          title: 'Baily Funk',
          album: 'Lapadas do povo',
          value: 'src/musics/Raimundos-Baily_Funk.mp3'
        },
        {
          artist: 'Sepultura',
          title: 'Refuse/Resist',
          album: 'Chaos A.D.',
          value: 'src/musics/Sepultura-Refuse_Resist.mp3'
        }
      ]
    }
  }])
```

---

## Changelog

Version | Description
--- | ---
1.0.0 | Upping Angular Audio Player Component

## Developer

### npm scripts

Command | Description
--- | ---
npm run build | Concat, Babelify and Minify 