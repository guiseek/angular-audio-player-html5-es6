export default `
audio-player audio-list {
  display: block;
  position: relative;
}
audio-player audio-list button {
  position: absolute;
  left: 82px;
  bottom: -38px;
  cursor: pointer;
  background-color: transparent;
  border: 0;
}
audio-player audio-list #list {
  padding: 0;
  width: 202px;
  max-height: 120px;
  overflow-y: scroll;
  list-style: none;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
audio-player audio-list #list.hide {
  max-height: 0;
}
audio-player audio-list #list li {
  margin: 3px 0;
  padding: 3px 0;
  cursor: pointer;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #ccc;
}
audio-player audio-list #list li:last-child {
  border-bottom: 0;
}`