let AudioPlayerComponent = {
  restrict: 'E',
  bindings: {
    musics: '=',
    loop: '=',
    autoplay: '=',
    origin: '='
  },
  template: `
    <fieldset>
      <legend>Audio Player</legend>
      <canvas id="analyser"></canvas>
      <div id="controls">
        <button type="button" data-control="play">Play</button>
        <button type="button" data-control="pause">Pause</button>
        <input type="range" name="volume" min="0.0" max="1" step="0.1" value="1">
        <input type="text" name="volval">
      </div>
      <div id="list">
        <select multiple name="list"></select>
      </div>
    </fieldset>
  `,
  controller: function($scope, $element, $attrs, $timeout) {
    let ctrl = this
    // Define audio information and load
    let audio
    let createAudio = function() {
      audio = new Audio()
      audio.id = 'audio'
      audio.loop = ctrl.options.loop
      audio.autoplay = ctrl.options.autoplay
      audio.crossOrigin = ctrl.options.origin
      audio.addEventListener('ended', function() {
        console.log(ctrl.options.musics[current + 1].value)
      })
    }

    // Define variables for analyser
    let audioContext, analyser, source, fbc_array
    // Define Audio Analyser Helpers
    let createAudioContext = function() {
      // Creating the context and pluging the stream to api node
      audioContext = new (window.AudioContext || window.webkitAudioContext)
      source = audioContext.createMediaElementSource(audio)

      // Creating the analyser and defining the frequency array
      analyser = audioContext.createAnalyser()
      fbc_array = new Uint8Array(analyser.frequencyBinCount)

      // Connect the output of the source to the input of the analyser
      source.connect(analyser)

      // Connect the output of the analyser to the destination
      analyser.connect(audioContext.destination)
    }

    // Define controls handler
    let volume, volval, value, controls
    let handlerControls = function() {
      // Select vol controls
      volume = element.querySelector('input[name="volume"]')
      volval = element.querySelector('input[name="volval"]')
      // Display first volume value
      volval.value = volume.value
      // Listening volume change
      volume.addEventListener('change', function(e) {
        value = e.target.value
        volval.value = value
        audio.volume = value
      }, false)
      // Select action controls
      controls = element.querySelectorAll('button[data-control]')
      // Finding right action
      controls.forEach(function(control) {
        // Listening action click
        control.addEventListener('click', function() {
          audio[control.getAttribute('data-control')]()
        }, false)
      })
    }

    // Create sounds list
    let list, option
    let createList = function() {
      list = element.querySelector('select[name="list"]')
      // Populate songs list
      ctrl.options.musics.forEach(function(m) {
        option = document.createElement('option')
        option.value = m.value
        option.innerHTML = `${m.artist} - ${m.title} (${m.album})`
        list.appendChild(option)
      })
      // Listening double click
      list.addEventListener('dblclick', function(e) {
        setMusic(e.target.value)
      }, false)
    }
    // Set music to play
    let setMusic = function(music) {
      audio.src = music
    }
    // Check autoplay for play first sound
    let checkAutoplay = function() {
      if (ctrl.options.autoplay && ctrl.options.musics.length > 0) {
        setMusic(ctrl.options.musics[current].value)
      }
    }

    // Define main variables for canvas start
    let canvas, canvasCtx
    // Define Canvas helpers
    let createCanvas = function() {
      canvas = document.getElementById('analyser')
      canvasCtx = canvas.getContext('2d')
    }
    // Define sizes canvas (self explanatory)
    let defineSizesCanvas = function() {
      canvas.width = 200
      canvas.height = 300
    }
    
    // Define variables to draw
    let bars, bar_x, bar_width, bar_height
    // Create the animation
    let frameLooper = function() {
      // Recursive to create our animation
      window.requestAnimationFrame(frameLooper)
      // Get the new frequency data
      analyser.getByteFrequencyData(fbc_array)
      // Udpate the visualization
      render()
    }

    // Draw analyser
    let render = function() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasCtx.fillStyle = 'red'
      bars = 200
      for (let i = 0; i < bars; i++) {
        bar_width = canvas.width / bars
        bar_x = i * (bar_width + 2)
        bar_height = -(fbc_array[i])
        canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height)
      }
    }

    // Get options player
    let element, current = 0
    ctrl.getOptions = function() {
      element = $element[0]
      ctrl.options = {
        loop: ctrl.loop || true,
        autoplay: ctrl.autoplay || false,
        origin: $attrs.origin || 'anonymous',
        musics: ctrl.musics
      }
    }

    // Init player
    ctrl.$onInit = () => {
      ctrl.getOptions()
      createList()
      createAudio()
      handlerControls()
      createAudioContext()
      createCanvas()
      defineSizesCanvas()
      frameLooper()
      checkAutoplay()
    };
  }
}

export default AudioPlayerComponent