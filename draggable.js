import AFRAME from "https://aframe.io/releases/1.2.0/aframe.min.js"

AFRAME.registerComponent('cursorDraggable', {
  init: function(){
    var isDragging = false;
    this.el.addEventListener('click', function (evt){
      isDragging = !isDragging;
    })
  }
})