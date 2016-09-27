import AudioPlayerComponent from './component/audio.js'
import AudioListComponent   from './component/audio.list.js'

angular
  .module('audio.player', [])
  .component('audioPlayer', AudioPlayerComponent)
  .component('audioList', AudioListComponent)
