AFRAME.registerComponent('cursor-draggable', {
  init: function () { 
    console.log("draggable");
    var isDragging = false;
    this.el.addEventListener('click', function (evt) {
      isDragging = !isDragging;
      console.log(evt.detail.intersection.point);
    });
  }
});