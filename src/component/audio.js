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
        <progress value="{{$ctrl.percentage}}" max="100">{{$ctrl.percentage}} %</progress>
        <div id="time">
          <span ng-bind="$ctrl.time"></span>
          <span ng-bind="$ctrl.timeLeft"></span>
        </div>
        <div id="options">
          <label>
            Repetir
            <input type="checkbox" name="loop" ng-model="$ctrl.options.loop" ng-checked="$ctrl.options.loop" ng-change="$ctrl.changeLoop()">
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
      <ul id="list">
        <li ng-repeat="m in $ctrl.musics" ng-click="$ctrl.setMusic($index)">
          <a>{{m.artist}} - {{m.title}}</a>
        </li>
      </ul>
    </fieldset>
  `,
  controller: function($scope, $element, $attrs, $interval, $filter) {
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
    let h, m, s
    let secToTime = (seconds) => {
      h = Math.floor((seconds % 86400) / 3600)
      m = Math.floor(((seconds % 86400) % 3600) / 60)
      s = ((seconds % 86400) % 3600) % 60
      return `${('00'+h).slice(-2)}:${('00'+m).slice(-2)}:${('00'+s).slice(-2)}`
    }
    let duration, currentTime
    $interval(() => {
      duration = Math.floor(ctrl.audio.duration)
      currentTime = Math.floor(ctrl.audio.currentTime)
      ctrl.time = secToTime(currentTime)
      ctrl.timeLeft = secToTime(duration - currentTime)
      ctrl.percentage = Math.floor((100 / ctrl.audio.duration) * ctrl.audio.currentTime)
    }, 100)

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
      ctrl.time = 0
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