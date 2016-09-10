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
