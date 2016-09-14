let AudioPlayerComponent = {
  restrict: 'E',
  bindings: {
    options: '=',
    musics: '='
  },
  template: `
    <fieldset>
      <legend>{{$ctrl.options.title}}</legend>
      <canvas id="analyser"></canvas>
      <div id="controls">
        <button type="button" ng-click="$ctrl.play()">Play</button>
        <button type="button" ng-click="$ctrl.pause()">Pause</button>
        <button type="button" ng-click="$ctrl.prev()">Anterior</button>
        <button type="button" ng-click="$ctrl.next()">Próxima</button>
        <input type="range" ng-change="$ctrl.changeVolume()" ng-model="$ctrl.volume" min="0.0" max="1" step="0.1" ng-value="$ctrl.volume">
        <span id="volume">{{$ctrl.volume}}</span>
        <div id="options">
          <label>
            <input type="checkbox" name="loop" ng-model="$ctrl.options.loop" ng-checked="$ctrl.options.loop" ng-change="$ctrl.changeLoop()"> Repetir
          <label>
          <label>
            <input type="checkbox" name="random" ng-model="$ctrl.options.random" ng-checked="$ctrl.options.random"> Aleatório
          <label>
        </div>
      </div>
      <div id="current">
        <span>{{$ctrl.song}}</span>
      </div>
      <ul id="list">
        <li ng-repeat="m in $ctrl.musics" ng-click="$ctrl.setMusic($index)">
          <a>{{m.artist}} - {{m.title}}</a>
        </li>
      </ul>
    </fieldset>
  `,
  controller: function($scope, $element, $attrs, $timeout) {
    let ctrl = this

    let createAudio = () => {
      ctrl.audio = new Audio()
      ctrl.audio.loop = ctrl.options.loop
      ctrl.audio.autoplay = ctrl.options.autoplay
      ctrl.audio.crossOrigin = ctrl.options.origin || 'anonymous'
      ctrl.audio.addEventListener('ended', ctrl.next)
    }

    let getRandom = () => {
      return Math.floor(Math.random() * ctrl.musics.length)
    }

    ctrl.setCurrent = current => {
      ctrl.current = (current >= ctrl.musics.length) ? 0 : current
    }
    let song
    ctrl.setSong = () => {
      song = ctrl.musics[ctrl.current]
      ctrl.song = `${song.artist} - ${song.title}`
      ctrl.audio.src = song.value
    }
    ctrl.setMusic = index => {
      ctrl.setCurrent(index)
      ctrl.setSong()
      ctrl.play()
    }
    ctrl.changeVolume = () => {
      ctrl.audio.volume = ctrl.volume
    }
    ctrl.play = () => {
      ctrl.audio.play()
    }
    ctrl.pause = () => {
      ctrl.audio.pause()
    }
    ctrl.next = () => {
      if (ctrl.options.random) {
        ctrl.setMusic(getRandom())
        return
      }
      ctrl.setMusic(ctrl.current + 1)
    }
    ctrl.prev = () => {
      if (ctrl.options.random) {
        ctrl.setMusic(getRandom())
        return
      }
      ctrl.setMusic(ctrl.current - 1)
    }
    ctrl.changeLoop = () => {
      ctrl.audio.loop = ctrl.options.loop
    }
    ctrl.changeRandom = () => {
      ctrl.audio.loop = ctrl.options.loop
    }

    let audioContext, analyser, source, fbc_array
    let createAudioContext = () => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)
      source = audioContext.createMediaElementSource(ctrl.audio)
      analyser = audioContext.createAnalyser()
      fbc_array = new Uint8Array(analyser.frequencyBinCount)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
    }

    let canvas, canvasCtx
    let createCanvas = () => {
      canvas = document.getElementById('analyser')
      canvasCtx = canvas.getContext('2d')
    }
    let defineSizesCanvas = () => {
      canvas.width = 200
      canvas.height = 300
    }
    let bars, bar_x, bar_width, bar_height
    let frameLooper = () => {
      window.requestAnimationFrame(frameLooper)
      analyser.getByteFrequencyData(fbc_array)
      render()
    }

    let render = () => {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasCtx.fillStyle = 'orange'
      bars = 200
      for (let i = 0; i < bars; i++) {
        bar_width = canvas.width / bars
        bar_x = i * (bar_width + 2)
        bar_height = -(fbc_array[i])
        canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height)
      }
    }

    ctrl.$onInit = () => {
      ctrl.current = 0
      ctrl.volume = 1
      createAudio()
      createAudioContext()
      createCanvas()
      defineSizesCanvas()
      frameLooper()
      ctrl.setSong()
    };
  }
}

export default AudioPlayerComponent