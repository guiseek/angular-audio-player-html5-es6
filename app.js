angular
  .module('app', ['audio.player'])
  .controller('AppController', ['$scope', function ($scope) {
    var ctrl = this;
    ctrl.options = {
      title: 'Audio Component',
      autoplay: true,
      loop: false,
      random: true,
      origin: 'anonymous' // Optional, anonymous is default
    }
    ctrl.list = [
      {
        artist: 'Suissa',
        title: 'Opinião',
        album: 'BRJS',
        value: 'src/musics/Suissa-Opiniao.mp3'
      },
      {
        artist: 'Suissa',
        title: 'Opinião',
        album: 'BRJS',
        value: 'src/musics/Suissa-Opiniao.mp3'
      },
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
  }])
