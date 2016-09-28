export default `
audio-player {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}
audio-player fieldset {
  width: 205px;
  padding: 4px 9px 12px 10px;
  background-color: #f5f5f5;
  border: 2px solid #ccc;
}
audio-player legend {
  padding: 0 6px;
}
audio-player canvas {
  width: 200px;
  height: 100px;
  background-color: #eaeaea;
  border: 2px solid #ccc;
}
audio-player #controls {
  margin-top: 6px;
}
audio-player #controls button {
  margin: 0 0 4px;
  padding: 4px 0;
  width: 48px;
  font-size: 12px;
  background-color: #fff;
  border: 2px solid #ccc;
}
audio-player #controls #time,
audio-player #controls #options label {
  cursor: pointer;
}
audio-player #controls #options {
  width: 202px;
}
audio-player #controls #time span:last-child,
audio-player #controls #options label:last-child {
  text-align: right;
  float: right;
}
audio-player #controls progress {
  width: 202px;
  margin: 5px 0;
}
audio-player #controls #volume {
  margin: 4px 0;
  width: 20px;
  float: right;
  text-align: right;
}
audio-player #controls input[type="range"] {
  margin: 2px 0;
  width: 180px;
}
audio-player #current {
  margin: 0 0 2px 0;
  padding: 4px 0;
  border-bottom: 2px solid #ccc;
}
audio-player #current input[type="text"] {
  width: 202px;
  background-color: transparent;
  border: 0;
}`