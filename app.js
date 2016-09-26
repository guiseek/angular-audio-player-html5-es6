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
