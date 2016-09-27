import template from './audio.list.template.js'

let AudioListComponent = {
  restrict: 'E',
  bindings: {
    musics: '<',
    onSetMusic: '&'
  },
  template: template,
  controller: function($scope, $element, $attrs) {
    let ctrl = this
    ctrl.setMusic = index => {
      ctrl.onSetMusic({index: index})
    }
    ctrl.toggle = () => {
      ctrl.show = !ctrl.show
    }
    ctrl.$onInit = () => {
      ctrl.show = true
    }
  }
}

export default AudioListComponent